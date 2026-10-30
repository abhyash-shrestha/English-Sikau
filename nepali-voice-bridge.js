/* English Sikau · Unified bilingual listening (one voice per language).
 * English is STRICTLY American en-US. Nepali is STRICTLY Nepal ne-NP.
 * No gender UI, pitch-based gender tricks, Hindi accents, user recordings,
 * external credentials, or hidden fallback to unrelated language voices.
 * Device voices work locally; optional authenticated natural audio uses the
 * same recorded waveform on every platform when the owner enables it.
 */
(function(){
'use strict';
const voiceCatalog=synth=>{
 try{return Array.from(synth?.getVoices?.()||[]);}
 catch(_){return [];}
};
const language=code=>{
 const s=String(code||'').trim().toLowerCase().replace('_','-');
 if(/^en(?:-|$)/.test(s))return 'en-US'; // Force all English requests to US accent.
 if(/^(ne-np|ne)(?:-|$)/.test(s))return 'ne-NP';
 return null;
};
const infer=(text,lang)=>{
 const code=String(lang||'').trim().toLowerCase().replace('_','-');
 // Respect an explicitly declared non-Nepali language: Hindi must never
 // be silently reclassified from its shared Devanagari script.
 if(/^(hi|mr|sa)(?:-|$)/.test(code))return null;
 const normalized=language(lang);
 if(normalized)return normalized;
 if(!code&&/[\u0900-\u097f]/.test(String(text||'')))return 'ne-NP';
 return null;
};
const candidates=(synth,locale)=>voiceCatalog(synth).filter(v=>{
 const code=String(v?.lang||'').toLowerCase().replace('_','-');
 const name=String(v?.name||'')+' '+String(v?.voiceURI||'');
 if(locale==='en-US')return code==='en-us'&&!/\b(?:british|uk|indian|hindi)\b/i.test(name);
 return (code==='ne-np'||code==='ne')&&!/\b(?:hindi|hi-in|india)\b/i.test(name);
});
const quality=(v,locale)=>{
 const name=String(v?.name||'')+' '+String(v?.voiceURI||'');
 let score=0;
 if(/\b(?:natural|neural|premium|enhanced|online)\b/i.test(name))score+=95;
 if(/\b(?:compact|novelty|robot|espeak|synthesizer)\b/i.test(name))score-=75;
 if(locale==='en-US'){
  // High-quality US voices known on common Windows, macOS and Android.
  if(/\b(?:ava|jenny|aria|samantha|allison|google us english|zoe|karen)\b/i.test(name))score+=25;
 }else{
  if(/\b(?:hemkala|sagar)\b/i.test(name))score+=30;
  if(/(?:नेपाली|nepali)/i.test(name))score+=20;
 }
 if(v?.default)score+=5;
 return score;
};
const choose=(synth,locale)=>{
 const available=candidates(synth,locale);
 return available.sort((a,b)=>quality(b,locale)-quality(a,locale))[0]||null;
};
const short=(value)=>String(value||'').replace(/\s+/g,' ').trim().slice(0,140);
// Legacy protected lesson toolbar offers 👨 / 👩 voice buttons alongside
// the language selector. Those are removed by exact purpose, not by scanning
// every paragraph or hiding possible "Male/Female" quiz answers.
const genderLabel=value=>{
 const text=String(value||'').trim().replace(/[\uFE0E\uFE0F\u200D]/g,'');
 const normalized=text.replace(/\s+/g,' ');
 if(!normalized||normalized.length>55)return false;
 if(/^[👨👩](?:🏻|🏼|🏽|🏾|🏿)?$/u.test(normalized))return true;
 return /^(?:male|female|पुरुष|पुरूष|महिला)(?:\s+(?:voice|आवाज))?$|^(?:voice|आवाज)\s+(?:male|female|पुरुष|पुरूष|महिला)$/i.test(normalized);
};
const controlIsRetiredVoice=(control,toolbar=false)=>{
 if(!control||!/^(?:BUTTON|LABEL|SELECT|INPUT)$/i.test(String(control.tagName||'')))return false;
 const label=String(control.textContent||control.value||'').trim();
 const aria=String(control.getAttribute?.('aria-label')||'');
 const title=String(control.getAttribute?.('title')||'');
 if(toolbar&&(genderLabel(label)||genderLabel(aria)||genderLabel(title)))return true;
 // Elsewhere require unmistakable evidence the control is for speech.
 const id=String(control.id||''),name=String(control.name||'');
 const marker=String(control.getAttribute?.('data-voice-gender')||
  control.getAttribute?.('data-gender')||'');
 const inVoiceGroup=!!control.closest?.('.voice-options,.voice-controls,.voice-select,'+
  '.voice-gender,.sikau-voice-gender,[data-voice-selector]');
 const voiceMetadata=/(?:voice|speech|speaker|tts)/i.test([id,name,aria,title].join(' '));
 if(!inVoiceGroup&&!voiceMetadata&&!marker)return false;
 if(control.tagName==='SELECT'){
  const entries=Array.from(control.options||[])
   .map(o=>String(o.value||o.textContent||'').trim())
   .filter(x=>x&&!/^(?:choose|select)\s+voice$/i.test(x));
  return entries.length>0&&entries.every(genderLabel);
 }
 return genderLabel(label)||genderLabel(aria)||genderLabel(title)||
  /^(?:male|female)$/i.test(marker);
};
function install(doc){
 const view=doc?.defaultView,synth=view?.speechSynthesis;
 if(!doc?.body||!view)return false;
 if(view.__sikauSimpleVoiceInstalled){
  // Re-run narrow cleanup after the private lesson rebuilds its header.
  view.__sikauNepaliVoice?.removeGenderControls?.();
  return true;
 }
 const originalSpeak=synth?.speak,originalCancel=synth?.cancel;
 const nativeAvailable=!!(originalSpeak&&view.SpeechSynthesisUtterance);
 const scopes={tr:doc.getElementById('tr'),rd:doc.getElementById('rd'),
  words:doc.getElementById('words'),sp:doc.getElementById('sp')};
 let active='tr';
 const status=(scope,message)=>{
  const root=doc.getElementById(scope)||scopes[scope]||doc.body;
  let label=root.querySelector?.('.sikau-simple-voice-status');
  if(!label){
   label=doc.createElement('p');
   label.className='sikau-simple-voice-status';
   label.setAttribute('role','status');
   label.style.cssText='font:600 12px/1.5 system-ui,sans-serif;margin:7px 0;color:inherit;max-width:100%;';
   const target=root.querySelector?.('.ttx-result-actions,.story-actions,.read-v2-sentences,.voice-controls')||
    root.querySelector?.('.content')||root;
   target.appendChild(label);
  }
  label.textContent=message;
 };
 const naturalService=()=>{
  try{
   const owner=view.parent||view;
   return owner.sikauNaturalSpeechAvailable?.()===true?owner:null;
  }catch(_){return null;}
 };
 const missing=(scope,locale)=>{
  const reason=locale==='en-US'?
   'US-English voice is unavailable. Check your device speech languages.':
   'Nepali (Nepal) voice is unavailable in this browser. Hindi is not substituted. You can continue reading. · यो ब्राउजरमा नेपाली आवाज उपलब्ध छैन। पढेर अभ्यास गर्न सक्नुहुन्छ।';
  status(scope,reason);
 };
 let epoch=0,current=null,queue=[],voiceTimer=null,audio=null;
 const timers=new Set();
 const later=(fn,ms)=>{
  const id=view.setTimeout(()=>{timers.delete(id);fn();},ms);timers.add(id);return id;
 };
 const clearTimer=id=>{if(id!=null){view.clearTimeout?.(id);timers.delete(id);}};
 const clearStatus=scope=>{
  const root=doc.getElementById(scope)||scopes[scope];
  const node=root?.querySelector?.('.sikau-simple-voice-status');
  if(node)node.textContent='';
 };
 const retry=(scope,message,action)=>{
  status(scope,message);
  const root=doc.getElementById(scope)||scopes[scope]||doc.body;
  const node=root.querySelector?.('.sikau-simple-voice-status');
  if(!node)return;
  const button=doc.createElement('button');button.type='button';
  button.textContent='▶ Play audio · सुन्नुहोस्';button.className='sikau-audio-resume';
  button.style.cssText='font:inherit;margin:6px;min-height:44px;padding:8px 14px;border-radius:10px;cursor:pointer;';
  button.addEventListener('click',action);node.appendChild(button);
 };
 const split=value=>{
  let rest=String(value||'').replace(/\s+/g,' ').trim();const parts=[];
  while(rest.length>260){
   const sample=rest.slice(0,261);
   const stops=[...sample.matchAll(/[.!?।](?:\s|$)/gu)];
   let at=stops.length?stops.at(-1).index+1:sample.lastIndexOf(' ');
   if(at<65)at=sample.lastIndexOf(' ');
   if(at<1)at=260;
   parts.push(rest.slice(0,at).trim());rest=rest.slice(at).trim();
  }
  if(rest)parts.push(rest);return parts;
 };
 const stop=()=>{
  epoch++;queue=[];current=null;voiceTimer=null;
  for(const timer of timers)view.clearTimeout?.(timer);timers.clear();
  if(audio){audio.onended=null;audio.onerror=null;try{audio.pause();audio.removeAttribute?.('src');}catch(_){}}
  try{originalCancel?.call(synth);}catch(_){}
 };
 const live=job=>current===job&&job.epoch===epoch;
 const finish=(job,error,event)=>{
  if(!live(job))return;
  clearTimer(job.startTimer);clearTimer(job.endTimer);
  current=null;
  const handler=error?job.handlers.error:job.handlers.end;
  if(typeof handler==='function'){
   try{handler.call(job.utterance,event||{type:error?'error':'end',error});}catch(_){}
  }
  pump();
 };
 const fail=(job,error)=>{
  if(!live(job))return;
  status(job.scope,'Audio could not play ('+short(error||'unknown')+'). Tap Listen to try again. · फेरि सुन्न थिच्नुहोस्।');
  finish(job,error||'audio-busy');
 };
 const next=job=>{
  if(!live(job))return;
  clearTimer(job.startTimer);clearTimer(job.endTimer);
  job.index++;
  if(job.index>=job.parts.length)finish(job,null,{type:'end'});
  else run(job);
 };
 const started=job=>{
  if(!live(job))return;
  clearTimer(job.startTimer);clearStatus(job.scope);
  if(!job.started){
   job.started=true;
   if(typeof job.handlers.start==='function')job.handlers.start.call(job.utterance,{type:'start'});
  }
 };
 function nativePlay(job){
  if(!live(job))return;
  const voice=choose(synth,job.locale);
  if(!voice){
   if(nativeAvailable&&voiceCatalog(synth).length===0){
    // Android often populates getVoices only after the first interaction.
    // Retain this exact request; voiceschanged resumes it without a reload.
    status(job.scope,'Loading voices… · आवाज लोड हुँदैछ…');
    clearTimer(voiceTimer);
    voiceTimer=later(()=>{
     if(!live(job))return;
     if(choose(synth,job.locale))nativePlay(job);
     else{missing(job.scope,job.locale);finish(job,'language-unavailable');}
    },2500);
   }else{missing(job.scope,job.locale);finish(job,'language-unavailable');}
   return;
  }
  clearTimer(voiceTimer);voiceTimer=null;
  const segment=++job.segment;
  const activeSegment=()=>live(job)&&job.segment===segment;
  const utterance=new view.SpeechSynthesisUtterance(job.parts[job.index]);
  utterance.lang=job.locale;utterance.voice=voice;utterance.pitch=1;
  utterance.rate=job.rate;job.utterance.lang=job.locale;job.utterance.voice=voice;
  job.segmentStarted=false;
  utterance.onstart=()=>{if(activeSegment()){job.segmentStarted=true;started(job);}};
  utterance.onend=()=>{if(activeSegment())next(job);};
  utterance.onerror=event=>{
   if(!activeSegment())return;
   if(event?.error==='not-allowed'){
    clearTimer(job.startTimer);clearTimer(job.endTimer);
    retry(job.scope,'Audio is ready. Tap Play to allow sound. · आवाज सुरु गर्न थिच्नुहोस्।',()=>{
     if(!activeSegment())return;nativePlay(job);
    });
   }else fail(job,event?.error||'synthesis-failed');
  };
  if(job.handlers.boundary)utterance.onboundary=event=>job.handlers.boundary.call(job.utterance,event);
  try{
   // Keep speak synchronous with the user's click when voices are ready.
   if(synth.paused)synth.resume?.();
   originalSpeak.call(synth,utterance);
   job.startTimer=later(()=>{
    if(!activeSegment()||job.segmentStarted)return;
    retry(job.scope,'Tap Play if you cannot hear audio. · आवाज नसुनिएमा थिच्नुहोस्।',()=>{
     if(!activeSegment())return;
     const scope=job.scope,text=job.parts.slice(job.index).join(' '),lang=job.locale,rate=job.rate;
     stop();speakText(text,lang,scope,{rate});
    });
   },2500);
   job.endTimer=later(()=>{
    if(activeSegment()){try{originalCancel?.call(synth);}catch(_){}fail(job,'timeout');}
   },45000);
  }catch(_){fail(job,'synthesis-failed');}
 }
 function cloudPlay(job,owner){
  const segment=++job.segment;
  const activeSegment=()=>live(job)&&job.segment===segment;
  status(job.scope,'Preparing audio… · आवाज तयार हुँदैछ…');
  Promise.resolve().then(()=>owner.sikauNaturalSpeech({text:job.parts[job.index],lang:job.locale})).then(result=>{
   if(!activeSegment())return;
   if(!['audio/mpeg','audio/wav'].includes(result?.mime)||
      typeof result.audioBase64!=='string'||result.audioBase64.length>1900000)
    throw Error('Invalid audio');
   if(!audio)audio=new view.Audio();
   audio.onended=()=>{if(activeSegment())next(job);};
   audio.onerror=()=>{if(activeSegment())fail(job,'playback-failed');};
   audio.src='data:'+result.mime+';base64,'+result.audioBase64;
   audio.playbackRate=job.rate;
   const start=()=>{
    if(!activeSegment())return;
    Promise.resolve(audio.play()).then(()=>started(job)).catch(error=>{
     if(!activeSegment())return;
     if(error?.name==='NotAllowedError')
      retry(job.scope,'Audio is ready. Tap Play to allow sound. · आवाज सुरु गर्न थिच्नुहोस्।',start);
     else fail(job,'playback-failed');
    });
   };
   start();
  }).catch(()=>{
   if(!activeSegment())return;
   // Use only the same requested locale if the optional service is offline.
   job.useNative=true;nativePlay(job);
  });
 }
 function run(job){
  if(!live(job))return;
  const owner=!job.useNative&&naturalService();
  if(owner&&typeof view.Audio==='function')cloudPlay(job,owner);
  else nativePlay(job);
 }
 function pump(){
  if(current||!queue.length)return;
  current=queue.shift();run(current);
 }
 const play=(utterance,scope='tr',replace=false)=>{
  if(!utterance)return false;
  const locale=infer(utterance.text,utterance.lang);
  if(!locale)return originalSpeak?.call(synth,utterance);
  if(replace)stop();
  if(!naturalService()&&(!nativeAvailable||
      (voiceCatalog(synth).length>0&&!choose(synth,locale)))){missing(scope,locale);return false;}
  const parts=split(utterance.text);if(!parts.length)return false;
  queue.push({utterance,scope,locale,parts,index:0,epoch,segment:0,
   rate:Math.min(1.2,Math.max(0.65,Number(utterance.rate)||1)),
   handlers:{start:utterance.onstart,end:utterance.onend,error:utterance.onerror,boundary:utterance.onboundary}});
  pump();return true;
 };
 const speakText=(text,lang='en-US',scope='tr',options={})=>{
  const locale=infer(text,lang);
  if(!text||!locale)return false;
  active=scope;
  const utterance=nativeAvailable?new view.SpeechSynthesisUtterance(String(text)):{text:String(text)};
  utterance.lang=locale;utterance.rate=options.rate||1;
  return play(utterance,scope,true);
 };
 // Prime the catalog at installation and resume a pending request once only.
 voiceCatalog(synth);
 synth?.addEventListener?.('voiceschanged',()=>{
  if(current&&voiceTimer!=null&&choose(synth,current.locale))nativePlay(current);
 });
 // Keep old native speech calls in Reading, Speaking, Coach and games
 // routed through the same voice service when the property is writable.
 let patched=false;
 try{if(nativeAvailable){
  synth.speak=function(utterance){return play(utterance,active);};
  patched=synth.speak!==originalSpeak;
 }}catch(_){}
 if(!patched&&nativeAvailable){
  try{
   const proto=Object.getPrototypeOf(synth),desc=Object.getOwnPropertyDescriptor(proto,'speak');
   if(desc?.configurable&&typeof desc.value==='function'){
    Object.defineProperty(proto,'speak',{...desc,value:function(utterance){
     return this===synth?play(utterance,active):desc.value.call(this,utterance);
    }});
    patched=true;
   }
  }catch(_){}
 }
 // Native lessons commonly call global speak(text,rate,lang). Wrap that
 // call too: Safari can refuse patching speechSynthesis.speak itself.
 const previousNative=view.speak;
 if(typeof previousNative==='function'&&!previousNative.__sikauSimpleVoice){
  const wrapper=function(text,rate,lang){
   const locale=infer(text,lang);
   if(!locale)return previousNative.apply(this,arguments);
   return speakText(text,locale,active,{rate});
  };
  wrapper.__sikauSimpleVoice=true;
  try{view.speak=wrapper;}catch(_){}
 }
 // Retire the two legacy voice buttons at their actual origin:
 // .app-header .header-btns. Do not search lesson cards or all DIV/SPAN
 // elements. A MutationObserver watches only the tiny native header area.
 let observedHeader=null,headerObserver=null;
 const retireLegacyVoiceUi=()=>{
  const header=doc.querySelector?.('.app-header');
  // The entire header may be replaced by native lesson rerenders. Bind to
  // the new header instead of leaving the observer on a detached old one.
  if(header!==observedHeader){
   headerObserver?.disconnect?.();
   observedHeader=header||null;
   if(header&&typeof view.MutationObserver==='function'){
    headerObserver=new view.MutationObserver(records=>{
     if(records.some(record=>record.type==='childList'&&record.addedNodes?.length))
      retireLegacyVoiceUi();
    });
    headerObserver.observe(header,{childList:true,subtree:true});
   }
  }
  if(!header)return;
  const toolbar=header.querySelector?.('.header-btns');
  const obsolete=[];
  if(toolbar){
   for(const control of toolbar.querySelectorAll('button,label,select,input')){
    if(controlIsRetiredVoice(control,true))obsolete.push(control);
   }
  }
  // Other genuine dedicated voice selectors may appear in Reading or
  // Translate, but ordinary learner choices elsewhere are untouched.
  for(const group of doc.querySelectorAll('.voice-options,.voice-gender,'+
     '.sikau-voice-gender,[data-voice-selector]')){
   for(const control of group.querySelectorAll('button,label,select,input')){
    if(controlIsRetiredVoice(control,false))obsolete.push(control);
   }
  }
  for(const control of new Set(obsolete)){
   control.hidden=true;
   control.setAttribute?.('aria-hidden','true');
   control.remove?.();
  }
 };
 retireLegacyVoiceUi();
 // Remember tab only to place an error message alongside the right player.
 doc.addEventListener('click',event=>{
  const root=event.target?.closest?.('#tr,#rd,#words,#sp,#game,#hw,#learn');
  if(root)active=root.id==='learn'?'rd':root.id;
 },true);
 // Cancel pending device voices and cloud audio together. A Stop click or
 // navigation can never cause delayed audio to start after the learner leaves.
 try{if(synth)synth.cancel=stop;}catch(_){}
 doc.addEventListener('click',event=>{
  if(event.target?.closest?.('button[data-t],.sikau-visa-nav'))stop();
 },true);
 view.addEventListener?.('pagehide',stop);
 doc.addEventListener('visibilitychange',()=>{if(doc.hidden)stop();});
 view.__sikauSimpleVoiceInstalled=true;
 view.__sikauNepaliVoiceInstalled=true;
 view.__sikauNepaliVoice={
  speakText,speakNepali:(text,scope='tr')=>speakText(text,'ne-NP',scope),
  chooseEnglish:()=>choose(synth,'en-US'),chooseNepali:()=>choose(synth,'ne-NP'),
  voices:()=>({english:candidates(synth,'en-US').map(v=>v.name),
    nepali:candidates(synth,'ne-NP').map(v=>v.name)}),
  removeGenderControls:retireLegacyVoiceUi,patched,stop,
  naturalSpeechAvailable:()=>!!naturalService()
 };
 view.__sikauSpeech=speakText;
 return true;
}
window.enhanceNepaliSpeechVoices=install;
window.enhanceUnifiedSpeech=install;
})();
