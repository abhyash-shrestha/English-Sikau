/* English Sikau — V4 approved conversation adapter.
 * Uses the approved V4 decision engine inside an isolated hidden document,
 * but renders every student-visible message using the EXISTING Coach classes.
 * No payments, membership, backend writes, or verified XP changes.
 */
(function(){
 'use strict';
 const VERSION=4;
 const PREFIX='english-sikau-coach-v4-draft:';
 const SOURCE=new URL('coach-v4-approved-lab.html?v=20261029-approved-v4-r1',document.baseURI).href;
 const validUser=id=>typeof id==='string'&&/^[a-zA-Z0-9_-]{6,128}$/.test(id);
 let iframe=null,frameDocument=null,loadPromise=null,owner=0;
 const text=(doc,parent,tag,classes,value)=>{
  const node=doc.createElement(tag);
  if(classes)node.className=classes;
  node.textContent=String(value==null?'':value);
  parent.appendChild(node);return node;
 };
 function frameFor(doc){
  if(iframe&&iframe.ownerDocument===doc)return loadPromise;
  if(iframe)iframe.remove();
  frameDocument=doc;
  iframe=doc.createElement('iframe');
  iframe.src=SOURCE;
  iframe.title='English Sikau private Coach conversation engine';
  iframe.setAttribute('aria-hidden','true');
  iframe.tabIndex=-1;
  iframe.style.cssText='position:absolute!important;width:1px!important;height:1px!important;opacity:0!important;pointer-events:none!important;border:0!important;left:-9999px!important';
  loadPromise=new Promise((resolve,reject)=>{
   iframe.addEventListener('load',()=>{
    try{
     const engine=iframe.contentWindow?.SikauPreview;
     if(!engine||!Array.isArray(engine.topics)||engine.topics.length!==175||
        typeof engine.selectTopic!=='function'||typeof engine.getChoices!=='function')
      throw Error('V4 conversation engine unavailable');
     resolve(engine);
    }catch(error){reject(error)}
   },{once:true});
   iframe.addEventListener('error',()=>{
    iframe=null;loadPromise=null;
    reject(Error('V4 conversation document failed to load'));
   },{once:true});
  });
  doc.body.appendChild(iframe);
  return loadPromise;
 }
 function storage(doc){
  try{return doc.defaultView.localStorage}catch(_){return null}
 }
 function key(userId){return PREFIX+userId}
 function readSaved(doc,userId){
  if(!validUser(userId))return null;
  try{
   const raw=storage(doc)?.getItem(key(userId));
   if(!raw||raw.length>15000)return null;
   const saved=JSON.parse(raw);
   if(saved?.version!==VERSION||typeof saved.sceneId!=='string'||
      typeof saved.title!=='string'||saved.title.length>120||
      !Array.isArray(saved.moves)||saved.moves.length>75||
      saved.moves.some(x=>!(Number.isInteger(x)&&x>=0&&x<=15||x==='goal')))
    return null;
   return saved;
  }catch(_){return null}
 }
 function forget(doc,userId){
  try{if(validUser(userId))storage(doc)?.removeItem(key(userId))}catch(_){}
 }
 function saveMoves(doc,userId,scene,moves){
  if(!validUser(userId))return;
  try{storage(doc)?.setItem(key(userId),JSON.stringify({
   version:VERSION,sceneId:scene.id,title:scene.title,
   moves:moves.slice(0,75),savedAt:Date.now()
  }))}catch(_){}
 }
 function getMode(doc){
  let x='en-ne';
  try{
   const w=doc.defaultView;
   x=w?.__sikauLanguageDisplay?.getMode?.()||
    doc.documentElement?.dataset?.sikauDisplayLanguage||
    w?.localStorage?.getItem('sikau_lang_pref')||'en-ne';
  }catch(_){}
  return ['en','en-ne','en-roman','all'].includes(x)?x:'en-ne';
 }
 const labels={
  en:{back:'← All situations',restart:'↻ Restart',undo:'↶ Undo last answer',
   change:'Change my request',listen:'🔊 Listen',guide:'Choose what you would actually say',
   finish:'Conversation completed',complete:'You can restart or select another topic.',
   you:'You',loading:'Opening your conversation…',error:'The conversation could not be loaded. Please try again.',
   empty:'No further replies are available.'},
  ne:{back:'← सबै विषय',restart:'↻ फेरि सुरु',undo:'↶ पछिल्लो उत्तर हटाउनुहोस्',
   change:'अनुरोध परिवर्तन',listen:'🔊 सुन्नुहोस्',guide:'आफ्नो अवस्थाअनुसार उत्तर छान्नुहोस्',
   finish:'कुराकानी पूरा भयो',complete:'फेरि सुरु गर्नुहोस् वा अर्को विषय छान्नुहोस्।',
   you:'तपाईं',loading:'कुराकानी खोल्दै…',error:'कुराकानी खोल्न सकिएन। फेरि प्रयास गर्नुहोस्।',
   empty:'अब थप उत्तर उपलब्ध छैन।'},
  roman:{back:'← Sabai bishaya',restart:'↻ Feri suru',undo:'↶ Pachhillo uttar hataunuhos',
   change:'Anurodh pariwartan',listen:'🔊 Sunnuhos',guide:'Aafno awastha anusar uttar channuhos',
   finish:'Kurakani pura bhayo',complete:'Feri suru garnuhos wa arko bishaya channuhos.',
   you:'Tapai',loading:'Kurakani kholdai…',error:'Kurakani kholna sakiena. Feri prayas garnuhos.',
   empty:'Aba thap uttar uplabdha chhaina.'}
 };
 function mount({doc,stage,scene,userId,firstName,onBack,resume=false}){
  const instance=++owner;
  let disposed=false,api=null,moves=[],chosenIndex=-1,languageObserver=null;
  const topicId=String(scene.title||'').toLocaleLowerCase('en-US').replace(/[’']/g,"'").trim();
  let mode=getMode(doc),parent=stage;
  function isCurrent(){return !disposed&&owner===instance}
  function local(en,ne,roman){
   const e=String(en||'');
   const n=String(ne||'');
   const r=String(roman||'');
   if(mode==='en')return e;
   if(mode==='en-ne')return n?e+' · '+n:e;
   if(mode==='en-roman')return r?e+' · '+r:e;
   return n?e+' · '+n+(r?' ('+r+')':''):e;
  }
  function label(name){const en=labels.en[name],ne=labels.ne[name],roman=labels.roman[name];
   return local(en,ne,roman)}
  function addLine(container,en,ne){
   const block=text(doc,container,'p','sikau-v4-line',en);
   if(ne&&mode!=='en'){
    const roman=doc.defaultView?.__sikauLanguageDisplay?.romanize?.(ne)||'';
    if(mode==='en-ne'||mode==='all'){
     const original=text(doc,container,'small','sikau-v4-ne',ne);
     original.setAttribute('data-norz','true');
    }
    if((mode==='en-roman'||mode==='all')&&roman){
     const latin=text(doc,container,'small','sikau-v4-roman',roman);
     latin.setAttribute('data-norz','true');
    }
   }
   return block;
  }
  function translate(message){
   const pairs=window.sikauCoachV4Translations||{};
   if(Object.prototype.hasOwnProperty.call(pairs,message))return pairs[message];
   // Expanded Coach topic catalog already includes bilingual counterparts.
   // A first-turn paraphrase is used ONLY when it shares key topic words;
   // unrelated translations are never applied to later V4 responses.
   const approved=api?.topics?.[chosenIndex];
   const original=(window.sikauMoreTopics||[]).find(x=>x.id===scene.id);
   const config=original?.config;
   if(!approved||!config)return '';
   if(message===approved.hello)return config[0]?.[1]||'';
   function words(value){
    const stop=new Set(['i','a','an','the','me','my','you','your','would','like',
     'could','please','help','with','about','have','need','want','am','is','are',
     'this','that','do','can','to','for','in','of','on','and','today','looking']);
    return [...new Set(String(value).toLowerCase().match(/[a-z]+/g)||[])]
     .filter(w=>w.length>2&&!stop.has(w)).map(w=>w.endsWith('s')?w.slice(0,-1):w);
   }
   for(let i=0;i<3;i++){
    const candidate=approved.routes?.[i]?.say;
    if(message!==candidate)continue;
    const old=config[1]?.[i];
    if(!old?.[1])return '';
    const left=words(message),right=words(old[0]);
    if(!left.length||!right.length)return '';
    const intersection=left.filter(w=>right.includes(w)).length;
    return intersection>=1&&intersection/Math.min(left.length,right.length)>=.3?old[1]:'';
   }
   return '';
  }
  function render(){
   if(!isCurrent())return;
   mode=getMode(doc);stage.replaceChildren();
   const head=text(doc,stage,'div','sikau-convo-stage-head sikau-v4-head','');
   const back=text(doc,head,'button','sikau-convo-back',label('back'));
   back.type='button';back.addEventListener('click',onBack);
   const restart=text(doc,head,'button','sikau-convo-secondary sikau-convo-restart',label('restart'));
   restart.type='button';restart.addEventListener('click',()=>{
    if(!api)return;
    const accept=doc.defaultView?.confirm?.('Restart this conversation from the beginning?');
    if(accept===false)return;
    api.selectTopic(chosenIndex);moves=[];saveMoves(doc,userId,scene,moves);render()
   });
   const meta=text(doc,head,'div','sikau-convo-stage-meta','');
   text(doc,meta,'strong','',scene.emoji+' '+scene.title);
   if(mode!=='en'){
    const latin=doc.defaultView?.__sikauLanguageDisplay?.romanize?.(scene.ne)||'';
    const localName=mode==='en-ne'?scene.ne:mode==='en-roman'?(latin||scene.ne):
     scene.ne+(latin?' · '+latin:'');
    const titleNe=text(doc,meta,'small','',localName);
    titleNe.setAttribute('data-norz','true');
   }
   const speech=api?.view?.()?.state;
   if(!api||!speech){
    text(doc,stage,'p','sikau-convo-list-note',label('loading'));return;
   }
   const completed=!!speech.ended;
   const previous=speech.messages||[];
   const wrapper=text(doc,stage,'div','sikau-convo-chat-layout sikau-v4-chat','');
   const transcript=text(doc,wrapper,'section','sikau-convo-transcript sikau-convo-chat-thread','');
   transcript.setAttribute('role','region');
   transcript.setAttribute('aria-label','Conversation history');
   const top=text(doc,transcript,'div','sikau-chat-top','');
   const placeBits=String(scene.place||'').split(' · ');
   const placeEn=placeBits[0]||'';
   const placeNe=placeBits.slice(1).join(' · ');
   const placeRoman=placeNe?doc.defaultView?.__sikauLanguageDisplay?.romanize?.(placeNe)||'':'';
   const displayPlace=mode==='en'?placeEn:
    mode==='en-roman'?placeEn+(placeRoman?' · '+placeRoman:''):
    mode==='all'?placeEn+(placeNe?' · '+placeNe:'')+(placeRoman?' ('+placeRoman+')':''):
    placeEn+(placeNe?' · '+placeNe:'');
   const placeNode=text(doc,top,'div','sikau-chat-top-scene',scene.emoji+' '+displayPlace);
   placeNode.setAttribute('data-norz','true');
   text(doc,top,'span','sikau-chat-top-pill',firstName||labels.en.you);
   previous.forEach((message,i)=>{
    if(!message||typeof message.text!=='string')return;
    const isLearner=message.role==='you';
    const row=text(doc,transcript,'div','sikau-chat-message '+(isLearner?'learner':'other')+(i===previous.length-1?' current':''),'');
    const avatar=text(doc,row,'span','sikau-chat-avatar',isLearner?'🙋':scene.emoji);
    avatar.setAttribute('aria-hidden','true');
    const bubble=text(doc,row,'div','sikau-chat-message-body','');
    text(doc,bubble,'strong','',isLearner?(firstName||'Learner'):scene.partner);
    addLine(bubble,message.text,translate(message.text));
    if(!isLearner&&i===previous.length-1){
     const hear=text(doc,bubble,'button','sikau-convo-hear',label('listen'));
     hear.type='button';hear.addEventListener('click',()=>{
      const voice=doc.defaultView?.speechSynthesis;
      const Utterance=doc.defaultView?.SpeechSynthesisUtterance;
      if(!voice||!Utterance)return;
      try{voice.cancel();const utterance=new Utterance(message.text);utterance.lang='en-US';utterance.rate=.9;voice.speak(utterance)}catch(_){}
     });
    }
   });
   const side=text(doc,wrapper,'section','sikau-convo-reply sikau-convo-chat-choices','');
   if(completed){
    text(doc,side,'strong','sikau-v4-finished',label('finish'));
    text(doc,side,'p','sikau-convo-list-note',label('complete'));
    if(speech.outcome)text(doc,side,'p','sikau-convo-list-note',speech.outcome);
    forget(doc,userId);
   }else{
    text(doc,side,'strong','sikau-chat-choice-header',label('guide'));
    const choices=api.getChoices();
    for(let i=0;i<choices.length;i++){
     const wording=choices[i];
     const b=text(doc,side,'button','sikau-convo-option sikau-chat-option','');
     b.type='button';
     text(doc,b,'span','sikau-chat-option-radio','◯');
     const copy=text(doc,b,'span','sikau-chat-option-copy','');
     addLine(copy,wording,translate(wording));
     b.addEventListener('click',()=>{
      if(!isCurrent()||!api)return;
      api.choose(i);moves.push(i);saveMoves(doc,userId,scene,moves);render();
     });
    }
    if(!choices.length)text(doc,side,'p','sikau-convo-list-note',label('empty'));
   }
   const actions=text(doc,side,'div','sikau-v4-actions','');
   const undo=text(doc,actions,'button','sikau-convo-secondary',label('undo'));
   undo.type='button';undo.disabled=!moves.length;
   undo.addEventListener('click',()=>{
    if(!moves.length||!api)return;
    if(moves.at(-1)==='goal'){
     moves.pop();
     api.selectTopic(chosenIndex);
     for(const m of moves){if(m==='goal')api.changeGoal();else api.choose(m)}
    }else{api.undo();moves.pop()}
    saveMoves(doc,userId,scene,moves);render()
   });
   if(!completed){
    const change=text(doc,actions,'button','sikau-convo-secondary',label('change'));
    change.type='button';change.addEventListener('click',()=>{
     if(!api)return;
     api.changeGoal();moves.push('goal');saveMoves(doc,userId,scene,moves);render();
    });
   }
   doc.defaultView?.requestAnimationFrame?.(()=>{
    if(isCurrent()&&transcript.isConnected)transcript.scrollTop=transcript.scrollHeight;
   });
  }
  frameFor(doc).then(engine=>{
   if(!isCurrent())return;
   const index=engine.topics.findIndex(t=>
    String(t?.title||'').toLocaleLowerCase('en-US').replace(/[’']/g,"'").trim()===topicId);
   if(index<0)throw Error('Approved V4 topic not found: '+scene.title);
   chosenIndex=index;api=engine;engine.selectTopic(index);
   const saved=resume?readSaved(doc,userId):null;
   if(saved&&saved.sceneId===scene.id&&saved.title===scene.title){
    for(const move of saved.moves){
     try{
      if(move==='goal')engine.changeGoal();
      else if(move<engine.getChoices().length)engine.choose(move);
      else break;
      moves.push(move);
     }catch(_){break}
    }
   }
   saveMoves(doc,userId,scene,moves);
   render();
  }).catch(error=>{
   if(!isCurrent())return;
   stage.replaceChildren();
   text(doc,stage,'p','sikau-convo-list-note',label('error'));
   const retry=text(doc,stage,'button','sikau-convo-secondary',label('back'));
   retry.type='button';retry.addEventListener('click',onBack);
   console.warn('English Sikau V4 Coach unavailable:',error?.message||'Error');
  });
  const selector=doc.getElementById('sikauDisplayLanguage');
  const change=()=>{const selected=getMode(doc);if(selected!==mode)render()};
  selector?.addEventListener('change',change);
  if(typeof doc.defaultView?.MutationObserver==='function'){
   languageObserver=new doc.defaultView.MutationObserver(change);
   languageObserver.observe(doc.documentElement,{attributes:true,attributeFilter:['data-sikau-display-language']});
  }
  render();
  return {destroy(){
   disposed=true;selector?.removeEventListener('change',change);languageObserver?.disconnect();
  }};
 }
 window.sikauCoachV4=Object.freeze({mount,readSaved,forget,ready:frameFor});
})();
