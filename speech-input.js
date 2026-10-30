/* English Sikau microphone adapter. Installed before private lesson scripts.
 * A recognition session delivers one final transcript, never accumulated interim
 * callbacks. No recordings leave the browser unless the owner enables the
 * authenticated transcription service and the learner starts the microphone.
 */
(function(){
'use strict';
const clean=value=>String(value||'').replace(/\s+/g,' ').trim();
const key=value=>clean(value).normalize('NFC').toLocaleLowerCase().replace(/[.!?।,]+$/u,'');
const appleMobile=view=>/iP(?:hone|ad|od)/.test(view.navigator?.userAgent||'')||
 (view.navigator?.platform==='MacIntel'&&view.navigator?.maxTouchPoints>1);
function transcript(results,mobile){
 let answer='';
 for(const result of Array.from(results||[])){
  const part=clean(result?.[0]?.transcript);
  if(!part||!result.isFinal)continue;
  const previous=key(answer),next=key(part);
  // Some Android engines return cumulative final hypotheses in new slots.
  // Compare whole result slots; do not remove repeated words inside speech
  // ("very very good", "that that happened", Nepali emphasis, etc.).
  if(mobile&&previous&&(previous===next||previous.startsWith(next+' ')))continue;
  if(mobile&&previous&&next.startsWith(previous+' ')){answer=part;continue;}
  answer=answer?answer+' '+part:part;
 }
 return answer;
}
function install(doc){
 const view=doc?.defaultView;
 if(!view||typeof view.EventTarget!=='function'||typeof view.Event!=='function')return false;
 if(view.__sikauSpeechInput)return true;
 const Native=view.SpeechRecognition||view.webkitSpeechRecognition;
 const mobile=appleMobile(view)||/Android/i.test(view.navigator?.userAgent||'');
 const unsupported=new Set();
 let current=null,activeScope='sp';
 const service=()=>{
  try{
   const owner=view.parent||view;
   return owner.sikauTranscriptionAvailable?.()===true?owner:null;
  }catch(_){return null;}
 };
 const notice=message=>{
  if(!doc.body)return;
  let root=doc.getElementById(activeScope);
  if(!root||root.hidden||root.style?.display==='none')root=doc.getElementById('tr');
  if(!root)return;
  let node=root.querySelector('.sikau-microphone-status');
  if(!node){
   node=doc.createElement('p');node.className='sikau-microphone-status';
   node.setAttribute('role','status');node.setAttribute('aria-live','polite');
   node.style.cssText='font:600 13px/1.6 system-ui;margin:10px 0;overflow-wrap:anywhere;';
   (root.querySelector(':scope > .content')||root).appendChild(node);
  }
  node.textContent=message;
 };
 const message=(error,lang)=>{
  if(error==='language-not-supported'||error==='service-not-allowed'){
   if(/^ne(?:-|$)/i.test(lang))return service()?
    'Nepali recognition is unavailable here. Tap the microphone again to record. · फेरि माइक्रोफोन थिच्नुहोस्।':
    'This browser does not support Nepali speech input. You can type Nepali instead. · यो ब्राउजरमा नेपाली बोलेर लेख्ने सुविधा उपलब्ध छैन। नेपाली टाइप गर्न सक्नुहुन्छ।';
   return 'Speech input is unavailable in this browser. You can type instead. · बोलेर लेख्न मिलेन। टाइप गर्नुहोस्।';
  }
  if(error==='not-allowed')return 'Microphone permission is off. Allow the microphone for this site in your browser settings, then try again. · यो साइटलाई माइक्रोफोनको अनुमति दिनुहोस्।';
  if(error==='audio-capture')return 'No microphone is available. Close other apps using it and try again. · माइक्रोफोन जाँच्नुहोस्।';
  if(error==='no-speech')return 'No speech was heard. Tap the microphone and try a short sentence. · आवाज सुनिएन। छोटो वाक्य बोल्नुहोस्।';
  if(error==='network')return 'Speech recognition could not connect. Check your connection and try again. · इन्टरनेट जाँचेर फेरि प्रयास गर्नुहोस्।';
  return 'Speech input stopped. Tap the microphone to try again. · फेरि प्रयास गर्नुहोस्।';
 };
 class Recognition extends view.EventTarget{
  constructor(){
   super();
   this.lang='en-US';this.continuous=false;this.interimResults=false;this.maxAlternatives=1;
   this.grammars=null;this._state='idle';this._native=null;this._results=[];
   this._epoch=0;this._aborted=false;this._recorder=null;this._stream=null;
   this._timer=null;this._stopTimer=null;this._cloud=false;this._failed=false;
  }
  _emit(type,fields={}){
   const event=new view.Event(type);
   for(const [name,value] of Object.entries(fields))Object.defineProperty(event,name,{value});
   this.dispatchEvent(event);
   const handler=this['on'+type];
   if(typeof handler==='function')try{handler.call(this,event);}catch(error){view.reportError?.(error);}
  }
  _release(){
   view.clearTimeout(this._timer);view.clearTimeout(this._stopTimer);
   this._timer=null;this._stopTimer=null;
   for(const track of this._stream?.getTracks?.()||[])track.stop();
   this._stream=null;
  }
  _finish(epoch){
   if(epoch!==this._epoch||this._state==='idle')return;
   this._release();
   const text=!this._aborted&&!this._failed?transcript(this._results,mobile):'';
   this._state='idle';this._native=null;this._recorder=null;
   if(current===this)current=null;
   if(text){
    const result=[{transcript:text,confidence:0}];result.isFinal=true;
    result.item=index=>result[index]||null;
    const results=[result];results.item=index=>results[index]||null;
    notice('Speech captured. Review your words before continuing. · शब्द जाँचेर अगाडि बढ्नुहोस्।');
    this._emit('result',{resultIndex:0,results});
   }else if(!this._aborted&&!this._failed){
    notice(message('no-speech',this.lang));this._emit('error',{error:'no-speech'});
   }
   this._emit('end');
  }
  _error(error,epoch){
   if(epoch!==this._epoch||this._state==='idle'||this._failed||this._aborted)return;
   this._failed=true;
   if(error==='language-not-supported'||error==='service-not-allowed')unsupported.add(this.lang);
   notice(message(error,this.lang));this._emit('error',{error});
   // Browsers do not consistently send onend after permission/service errors.
   // Finish immediately and ignore a later native end event.
   try{this._native?.abort();}catch(_){}
   this._finish(epoch);
  }
  start(){
   if(this._state!=='idle')throw new view.DOMException('Microphone is already running','InvalidStateError');
   current?.abort();current=this;
   this._state='starting';this._aborted=false;this._failed=false;this._results=[];
   const epoch=++this._epoch;
   // Stop lesson playback before listening so the microphone cannot capture it.
   try{view.__sikauNepaliVoice?.stop?.();view.speechSynthesis?.cancel();}catch(_){}
   const owner=service();
   this._cloud=!!owner&&(!Native||unsupported.has(this.lang)||
    (appleMobile(view)&&/^ne(?:-|$)/i.test(this.lang)));
   if(this._cloud){void this._record(owner,epoch);return;}
   if(!Native){this._error('service-not-allowed',epoch);this._finish(epoch);return;}
   try{
    const native=this._native=new Native();
    native.lang=/^ne(?:-|$)/i.test(this.lang)?'ne-NP':'en-US';
    // Short, explicit sessions are reliable on Android and iOS. Never restart
    // automatically from onend (which used to replay or duplicate text).
    native.continuous=mobile?false:this.continuous;
    native.interimResults=false;native.maxAlternatives=1;
    native.onstart=()=>{
     if(epoch!==this._epoch||this._aborted)return;
     this._state='listening';notice('Listening… · सुन्दैछ…');this._emit('start');
    };
    native.onresult=event=>{
     if(epoch!==this._epoch||this._aborted||this._state==='idle')return;
     // event.results is the current session snapshot, not a text delta.
     this._results=Array.from(event.results||[]).map(result=>{
      const row=[{transcript:String(result?.[0]?.transcript||'')}];
      row.isFinal=!!result.isFinal;return row;
     });
     if(appleMobile(view)&&/^ne(?:-|$)/i.test(this.lang)&&
        transcript(this._results,mobile)&&!/[\u0900-\u097f]/.test(transcript(this._results,mobile)))
      this._error('language-not-supported',epoch);
    };
    native.onerror=event=>this._error(event.error||'network',epoch);
    native.onend=()=>this._finish(epoch);
    for(const type of ['audiostart','audioend','soundstart','soundend','speechstart','speechend'])
     native['on'+type]=()=>{if(epoch===this._epoch&&!this._aborted)this._emit(type);};
    native.start();
    // A missing end event must not leave a permanently disabled microphone.
    if(epoch===this._epoch&&this._state!=='idle')
     this._timer=view.setTimeout(()=>{if(epoch===this._epoch)this.stop();},30000);
   }catch(error){
    this._error(error?.name==='NotAllowedError'?'not-allowed':'audio-capture',epoch);
    this._finish(epoch);
   }
  }
  async _record(owner,epoch){
   try{
    if(!view.navigator?.mediaDevices?.getUserMedia||!view.MediaRecorder)throw Error('unsupported');
    notice('Recording… Tap the microphone to finish. Audio is sent for transcription. · सकिएपछि फेरि माइक्रोफोन थिच्नुहोस्।');
    const stream=await view.navigator.mediaDevices.getUserMedia({audio:true});
    if(epoch!==this._epoch||this._aborted||this._state==='idle'){
     stream.getTracks().forEach(track=>track.stop());return;
    }
    this._stream=stream;
    const mime=['audio/mp4','audio/webm;codecs=opus','audio/webm','audio/ogg;codecs=opus']
     .find(value=>view.MediaRecorder.isTypeSupported?.(value));
    const recorder=this._recorder=new view.MediaRecorder(stream,mime?{mimeType:mime}:undefined);
    const chunks=[];let bytes=0;
    recorder.ondataavailable=event=>{
     if(epoch!==this._epoch||this._aborted||this._state==='idle')return;
     if(event.data?.size){bytes+=event.data.size;chunks.push(event.data);}
     if(bytes>1200000)this.abort();
    };
    recorder.onerror=()=>{
     if(epoch===this._epoch&&!this._aborted)this._error('audio-capture',epoch);
    };
    recorder.onstop=async()=>{
     // An old recorder's delayed stop must never release a new session's stream.
     if(this._aborted||this._failed||epoch!==this._epoch||this._state==='idle')return;
     this._release();
     this._state='transcribing';notice('Turning speech into words… · बोलेको कुरा लेख्दैछ…');
     try{
      if(!bytes||bytes>1200000)throw Error('empty');
      const blob=new view.Blob(chunks,{type:recorder.mimeType||mime||'audio/mp4'});
      const data=new Uint8Array(await blob.arrayBuffer());
      let binary='';
      for(let i=0;i<data.length;i+=8192)binary+=String.fromCharCode(...data.subarray(i,i+8192));
      const response=await owner.sikauTranscribeSpeech({
       audioBase64:view.btoa(binary),mime:blob.type,
       lang:/^ne(?:-|$)/i.test(this.lang)?'ne-NP':'en-US'
      });
      if(epoch!==this._epoch||this._aborted||this._state==='idle')return;
      const row=[{transcript:clean(response?.text)}];row.isFinal=true;this._results=[row];
     }catch(_){this._error('network',epoch);}
     this._finish(epoch);
    };
    recorder.start();this._state='listening';this._emit('start');
    this._timer=view.setTimeout(()=>this.stop(),20000);
   }catch(error){
    this._error(error?.name==='NotAllowedError'?'not-allowed':'audio-capture',epoch);
    this._finish(epoch);
   }
  }
  stop(){
   if(this._state==='idle'||this._state==='transcribing'||this._state==='stopping')return;
   this._state='stopping';
   if(this._cloud){
    if(this._recorder?.state==='recording')this._recorder.stop();
    else this.abort();
   }else{
    try{this._native?.stop();}catch(_){}
    const epoch=this._epoch;
    this._stopTimer=view.setTimeout(()=>this._finish(epoch),2000);
   }
  }
  abort(){
   if(this._state==='idle')return;
   this._aborted=true;
   try{this._native?.abort();}catch(_){}
   try{if(this._recorder?.state==='recording')this._recorder.stop();}catch(_){}
   this._finish(this._epoch);
  }
 }
 view.SpeechRecognition=Recognition;
 if(Native)view.webkitSpeechRecognition=Recognition;
 view.__sikauSpeechInput={cancel:()=>current?.abort(),nativeAvailable:!!Native,
  transcriptionAvailable:()=>!!service()};
 view.addEventListener('pagehide',()=>current?.abort());
 doc.addEventListener('visibilitychange',()=>{if(doc.hidden)current?.abort();});
 doc.addEventListener('click',event=>{
  const scope=event.target?.closest?.('#tr,#sp');
  if(scope?.id)activeScope=scope.id;
  if(event.target?.closest?.('button[data-t],.sikau-visa-nav'))current?.abort();
 },true);
 return true;
}
window.enhanceSpeechInput=install;
// In srcdoc HEAD, this runs before native scripts capture their constructor.
if(window.parent!==window)install(window.document);
})();
