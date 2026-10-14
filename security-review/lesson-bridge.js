// Parent-only: this module never sends Appwrite cookies, JWTs, file tokens, or keys.
export const ACTION_FIELDS=Object.freeze({
 uiCatalog:[],catalog:[],courseLesson:['lessonId'],courseQuizStart:['lessonId'],courseQuizAnswer:['session','index','answer'],courseQuizFinish:['session','receipts'],
 phrasePack:['category'],storyChapter:['topicId','bookId','level','chapter','unlockProof'],storyCheckAnswers:['topicId','bookId','level','chapter','unlockProof','answers'],
 practiceNew:['category','level'],practiceCheck:['session','answers'],progressGet:[],progressClaimStory:['topicId','bookId','level','chapter','completionProof'],progressClaimActivity:['completionProof'],
 coachResource:['kind','id'],cultureEntry:['id'],gameRound:['id','mode'],gameAnswer:['session','index','answer'],gameFinish:['session','receipts']
});
export function allowedAction(payload){
 if(!payload||typeof payload!=='object'||Array.isArray(payload)||!Object.hasOwn(ACTION_FIELDS,payload.action))throw Error('Unsupported lesson action');
 const keys=Object.keys(payload),fields=ACTION_FIELDS[payload.action];
 if(keys.some(k=>k!=='action'&&!fields.includes(k))||JSON.stringify(payload).length>32768)throw Error('Invalid lesson request');
 const result={action:payload.action};for(const k of fields)if(Object.hasOwn(payload,k))result[k]=payload[k];return result;
}
const STORES=['sikau','sikau_lang_pref','sikau_gender','sikau_d','sikau_fresh_v3','sikau_pb_topic','sikau_read_mode','sikau_theme','sikau_nav_order_v1'];
export const allowedStoreKey=key=>typeof key==='string'&&(STORES.includes(key)||/^sikau_dice_(en|ne)$/.test(key));
export function accountStorage(storage,userId){
 if(!/^[a-zA-Z0-9][a-zA-Z0-9._-]{0,35}$/.test(userId))throw Error('Invalid verified account');
 const scope='english-sikau-v3:'+userId+':',snapshot={};
 for(const k of [...STORES,'sikau_dice_en','sikau_dice_ne']){const value=storage.getItem(scope+k);if(value!==null)snapshot[k]=value}
 return {snapshot,legacyAvailable:storage.getItem('sikau')!==null,
  put(key,value){if(!allowedStoreKey(key)||typeof value!=='string'||value.length>524288)throw Error('Invalid device progress');storage.setItem(scope+key,value)},
  // Requires an explicit learner choice. Original device records remain unchanged.
  importLegacy(confirmed){if(confirmed!==true)throw Error('Confirm that this device history belongs to you');
   if(storage.getItem(scope+'sikau')!==null)throw Error('This account already has device progress; no replacement was performed');
   const raw=storage.getItem('sikau');if(!raw||raw.length>524288)throw Error('Previous device history is unavailable');
   const value=JSON.parse(raw);if(!value||typeof value!=='object'||Array.isArray(value))throw Error('Previous device history needs review');
   storage.setItem(scope+'sikau',raw);return raw;
  }};
}
export function createLessonBridge({frame,execute,isCurrent,storage,userId,onFault,hostWindow=window}){
 const nonce=hostWindow.crypto.randomUUID(),device=accountStorage(storage,userId);let port,closed=false,inflight=0,recognition,speechTimer;
 const current=()=>!closed&&isCurrent();
 function stopSpeech(){clearTimeout(speechTimer);try{recognition?.abort()}catch{}recognition=null}
 function close(){closed=true;stopSpeech();port?.close();hostWindow.removeEventListener('message',connect)}
 function speechEvent(event,value){if(current())port.postMessage({type:'speechEvent',nonce,event,value})}
 async function handle(event){
  const m=event.data;
  if(!current()||!m||m.nonce!==nonce||typeof m.id!=='string'||m.id.length>80||inflight>=8)return;
  inflight++;
  try{
   let result;
   if(m.type==='api')result=await execute(allowedAction(m.payload));
   else if(m.type==='store'){device.put(m.key,m.value);result={ok:true}}
   else if(m.type==='importLegacy')result={ok:true,value:device.importLegacy(m.confirmed)};
   else if(m.type==='speech'){
    if(m.command==='stop'){try{recognition?.stop()}catch{}result={ok:true}}
    else if(m.command==='start'){
     const Recognition=hostWindow.SpeechRecognition||hostWindow.webkitSpeechRecognition;
     if(!Recognition||!['en-US','ne-NP'].includes(m.lang))throw Error('Voice recognition is unavailable. Please type your text.');
     stopSpeech();recognition=new Recognition();recognition.lang=m.lang;recognition.continuous=false;recognition.interimResults=m.interimResults===true;
     recognition.onstart=()=>speechEvent('start');recognition.onend=()=>speechEvent('end');recognition.onerror=e=>speechEvent('error',{error:String(e.error||'unknown').slice(0,80)});
     recognition.onresult=e=>{const results=[];for(const r of e.results){results.push({isFinal:r.isFinal===true,transcript:String(r[0]?.transcript||'').slice(0,3000)})}speechEvent('result',{resultIndex:e.resultIndex,results})};
     recognition.start();speechTimer=setTimeout(stopSpeech,30000);result={ok:true};
    }else throw Error('Unsupported voice action');
   }
   else throw Error('Unsupported lesson message');
   // A logout, account switch, or frame replacement invalidates late responses.
   if(current())port.postMessage({id:m.id,nonce,ok:true,result});
  }catch(e){if(current())port.postMessage({id:m.id,nonce,ok:false,error:String(e.message||'Unable to complete this request').slice(0,180)});onFault?.(e)}
  finally{inflight--}
 }
 function connect(event){
  if(!current()||event.source!==frame.contentWindow||event.origin!=='null'||event.data?.type!=='sikau-ready'||event.data?.nonce!==nonce||port)return;
  const channel=new hostWindow.MessageChannel();port=channel.port1;port.onmessage=handle;port.start();
  // '*' is necessary for an opaque origin. Only this exact WindowProxy receives
  // the port, and all subsequent traffic uses that port and this frame nonce.
  frame.contentWindow.postMessage({type:'sikau-connect',nonce,storage:device.snapshot,legacyAvailable:device.legacyAvailable,supportsSpeech:!!(hostWindow.SpeechRecognition||hostWindow.webkitSpeechRecognition)},'*',[channel.port2]);
 }
 hostWindow.addEventListener('message',connect);
 return {nonce,close};
}
