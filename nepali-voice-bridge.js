/* English Sikau · Unified bilingual listening (one voice per language).
 * English is STRICTLY American en-US. Nepali is STRICTLY Nepal ne-NP.
 * No gender UI, pitch-based gender tricks, Hindi accents, user recordings,
 * external credentials, or hidden fallback to unrelated language voices.
 * The browser's installed speech engine owns acoustic quality.
 */
(function(){
'use strict';
const LOCALE={en:'en-US',ne:'ne-NP'};
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
const isGender=(control)=>{
 if(!control)return false;
 const raw=String(control?.matches?.('input')?control.value:control.textContent||'').trim();
 const clean=raw.replace(/[👨👩♂♀️🔊🔉]/gu,'').trim();
 const hint=[control.getAttribute?.('aria-label'),control.getAttribute?.('title'),
  control.getAttribute?.('class'),control.getAttribute?.('id')].join(' ');
 const selector=control.closest?.('.voice-options,.voice-controls,.voice-select,'+
  '.voice-gender,.sikau-voice-gender,.story-actions,.ttx-result-actions,'+
  '[data-voice-selector]');
 const hasVoiceContext=!!selector||/\b(?:voice|speaker|speech|tts)\b/i.test(hint)||
   !!control.getAttribute?.('data-voice-gender');
 // Do not remove answers in a story or quiz just because they say Male/Female.
 if(!hasVoiceContext)return false;
 if(control.tagName==='SELECT'&&control.options?.length){
  const vals=Array.from(control.options)
   .map(o=>String(o.value||o.textContent||'').trim().toLowerCase())
   .filter(s=>s&&s!=='choose voice'&&s!=='select voice');
  return vals.length>0&&vals.every(v=>/^(male|female|पुरुष|महिला|पुरूष)$/.test(v));
 }
 return /^(?:male|female|पुरुष|महिला|पुरूष)(?:\s+(?:voice|आवाज))?$/i.test(clean)||
  /^(?:male|female)$/i.test(String(control?.value||''))||
  /\b(?:male|female)\s+voice\b/i.test(hint)||
  /^(?:male|female)$/i.test(String(control?.getAttribute?.('data-gender')||''));
};
function install(doc){
 const view=doc?.defaultView,synth=view?.speechSynthesis;
 if(!doc?.body||!synth||typeof view?.SpeechSynthesisUtterance!=='function')return false;
 if(view.__sikauSimpleVoiceInstalled)return true;
 const originalSpeak=synth.speak;
 const scopes={tr:doc.getElementById('tr'),rd:doc.getElementById('rd'),
  words:doc.getElementById('words'),sp:doc.getElementById('sp')};
 let previous=null,active='tr';
 const status=(scope,message)=>{
  const root=scopes[scope]||doc.getElementById(scope)||doc.body;
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
 const missing=(scope,locale)=>{
  const reason=locale==='en-US'?
   'US-English voice is unavailable. Check your device speech languages.':
   'Nepali (Nepal) voice is unavailable in this browser. Install a Nepali voice in your device text-to-speech settings, then reopen the app. Hindi is not substituted. · नेपाली आवाज उपलब्ध छैन।';
  status(scope,reason);
 };
 const cancel=()=>{try{synth.cancel();}catch(_){};previous=null;};
 const play=(utterance,scope='tr')=>{
  if(!utterance)return false;
  const locale=infer(utterance.text,utterance.lang);
  if(!locale)return originalSpeak.call(synth,utterance);
  const voice=choose(synth,locale);
  if(!voice){missing(scope,locale);return false;}
  try{
   cancel();
   utterance.lang=locale;
   utterance.voice=voice;
   utterance.pitch=1;
   utterance.rate=locale==='ne-NP'?0.96:0.98;
   // Do not substitute a different voice on errors or timeouts.
   const priorError=utterance.onerror;
   utterance.onerror=e=>{
    status(scope,'Audio could not play ('+short(e?.error||'unknown')+'). Check your device speech settings.');
    if(typeof priorError==='function')priorError.call(utterance,e);
   };
   const result=originalSpeak.call(synth,utterance);
   previous=utterance;
   return result===false?false:true;
  }catch(_){status(scope,'Audio could not start on this device. Try again after refreshing.');return false;}
 };
 const speakText=(text,lang='en-US',scope='tr')=>{
  const locale=infer(text,lang);
  if(!text||!locale)return false;
  active=scope;
  const utterance=new view.SpeechSynthesisUtterance(String(text).slice(0,2800));
  utterance.lang=locale;
  return play(utterance,scope);
 };
 // Keep old native speech calls in Reading, Speaking, Coach and games
 // routed through the same voice service when the property is writable.
 let patched=false;
 try{
  synth.speak=function(utterance){return play(utterance,active);};
  patched=synth.speak!==originalSpeak;
 }catch(_){}
 if(!patched){
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
   return speakText(text,locale,active);
  };
  wrapper.__sikauSimpleVoice=true;
  try{view.speak=wrapper;}catch(_){}
 }
 // Remove only controls whose entire purpose is choosing voice gender.
 // Never hide quiz choices, pronunciation buttons or listening controls.
 const hideGender=()=>{
  for(const root of [scopes.tr,scopes.rd,doc.getElementById('learn'),
      doc.getElementById('words'),doc.getElementById('sp')]){
   if(!root)continue;
   for(const control of root.querySelectorAll('button,input[type="radio"],label,[role="radio"],select')){
    if(isGender(control)){
     control.hidden=true;
     control.style.display='none';
     control.setAttribute('aria-hidden','true');
     if(control.matches('input[type="radio"]')){
      const parent=control.closest('label');
      if(parent&&isGender(parent)){parent.hidden=true;parent.style.display='none';}
     }
    }
   }
   for(const group of root.querySelectorAll('.voice-options,.voice-gender,.voice-select,.sikau-voice-gender')){
    const options=Array.from(group.querySelectorAll('button,label,input,[role="radio"]'));
    if(options.length&&options.every(isGender)){group.hidden=true;group.style.display='none';}
   }
  }
 };
 hideGender();
 let scheduled=false;
 if(typeof view.MutationObserver==='function'){
  const obs=new view.MutationObserver(()=>{
   if(scheduled)return;
   scheduled=true;
   (view.requestAnimationFrame||view.setTimeout)(()=>{scheduled=false;hideGender();});
  });
  obs.observe(doc.body,{childList:true,subtree:true});
 }
 // Remember tab only to place an error message alongside the right player.
 doc.addEventListener('click',event=>{
  const root=event.target?.closest?.('#tr,#rd,#words,#sp,#game,#hw,#learn');
  if(root)active=root.id==='learn'?'rd':root.id;
 },true);
 try{synth.addEventListener?.('voiceschanged',()=>{});}catch(_){}
 view.__sikauSimpleVoiceInstalled=true;
 view.__sikauNepaliVoiceInstalled=true;
 view.__sikauNepaliVoice={
  speakText,speakNepali:(text,scope='tr')=>speakText(text,'ne-NP',scope),
  chooseEnglish:()=>choose(synth,'en-US'),chooseNepali:()=>choose(synth,'ne-NP'),
  voices:()=>({english:candidates(synth,'en-US').map(v=>v.name),
    nepali:candidates(synth,'ne-NP').map(v=>v.name)}),
  removeGenderControls:hideGender,patched,naturalSpeechAvailable:()=>false
 };
 view.__sikauSpeech=speakText;
 return true;
}
window.enhanceNepaliSpeechVoices=install;
window.enhanceUnifiedSpeech=install;
})();