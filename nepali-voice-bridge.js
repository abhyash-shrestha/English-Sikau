/* English Sikau — truthful Nepali male voice routing for protected Translate and Reading.
 * Female playback is unchanged. Never fake gender by lowering a female pitch,
 * never silently substitute another language, and never send private text to
 * third-party servers. A high-quality Azure Sagar neural voice requires a
 * separately configured server-side credential (not bundled in GitHub).
 */
(function(){
 'use strict';
 const matchesScope=e=>e?.closest?.('#tr')?'tr':e?.closest?.('#rd,#learn')?'rd':null;
 const voiceLabel=e=>{
  const input=e?.matches?.('input')?e.value:'';
  return String((e?.getAttribute?.('aria-label')||'')+' '+(e?.getAttribute?.('title')||'')+
   ' '+(input||e?.textContent||'')).replace(/[\u200B-\u200D\uFE0E\uFE0F]/g,' ').trim();
 };
 const genderOf=raw=>{
  const label=String(raw||'').trim();
  if(label.length>90)return null;
  // Do not match the "male" suffix inside "female".
  if(/(?:\bfemale\b|\bwoman\b|महिला|स्त्री)/i.test(label))return 'female';
  if(/(?:\bmale\b|\bman\b|पुरुष|पुरूष)/i.test(label))return 'male';
  return null;
 };
 // Read the clicked option itself, not a parent whose text may contain
 // both "Female" and "Male" (which previously biased detection to Female).
 const controlGender=control=>{
  if(!control)return null;
  const option=control.tagName==='SELECT'?control.options?.[control.selectedIndex]:null;
  const data=[
   control.getAttribute?.('data-gender'),control.getAttribute?.('data-voice-gender'),
   control.getAttribute?.('data-sex'),control.getAttribute?.('data-voice'),
   control.getAttribute?.('data-speaker'),control.getAttribute?.('value'),
   control.value,control.id,control.name,
   option?.value,option?.textContent
  ].filter(Boolean);
  for(const raw of data){
   const gender=genderOf(raw);
   if(gender)return gender;
  }
  return genderOf(option?String(option.textContent||''):voiceLabel(control));
 };
 const isNepali=(utterance)=>{
  const lang=String(utterance?.lang||'').toLowerCase().replace('_','-');
  return lang==='ne'||lang.startsWith('ne-')||
   /[\u0900-\u097f]/.test(String(utterance?.text||''))&&
   !/^(?:hi|mr|sa)(?:-|$)/.test(lang);
 };
 // Web Speech does not provide a standardized gender property, so use
 // only positively identified male Nepali voices. Do not infer gender from
 // pitch, an arbitrary voice-list position, or an unrelated Hindi voice.
 const nepaliVoices=synth=>{
  try{return Array.from(synth?.getVoices?.()||[]).filter(v=>
   /^(?:ne|ne-np)(?:-|$)/i.test(String(v?.lang||'').replace('_','-')));
  }catch(_){return[];}
 };
 const providerOf=voice=>{
  const name=String(voice?.name||'');
  if(/microsoft|azure|sagar|hemkala/i.test(name))return 'Microsoft';
  if(/google/i.test(name))return 'Google';
  if(/apple|siri|samantha/i.test(name))return 'Apple';
  if(/samsung/i.test(name))return 'Samsung';
  return '';
 };
 const isAuthenticMale=voice=>{
  if(!nepaliVoices({getVoices:()=>[voice]}).length)return false;
  const name=String(voice?.name||'');
  return /(?:^|[^a-z])sagar(?:[^a-z]|$)/i.test(name)||
    /(?:^|[^a-z])male(?:[^a-z]|$)/i.test(name)||
    /पुरुष|पुरूष/.test(name)||
    voice?.gender==='Male';
 };
 const identifiedFemale=voices=>voices.find(v=>
  /(?:^|[^a-z])hemkala(?:[^a-z]|$)|(?:^|[^a-z])female(?:[^a-z]|$)|महिला/i.test(String(v.name||'')));
 function firstMale(synth){
  const voices=nepaliVoices(synth),males=voices.filter(isAuthenticMale);
  const female=identifiedFemale(voices),provider=providerOf(female);
  return males.find(v=>provider&&providerOf(v)===provider)||males[0]||null;
 }
 const voiceReport=synth=>{
  const voices=nepaliVoices(synth);
  return {
   available:voices.map(v=>({name:String(v.name||'Unnamed voice'),lang:String(v.lang||'ne-NP'),
    provider:providerOf(v)||'Browser/device',identifiedMale:isAuthenticMale(v)})),
   identifiedFemale:identifiedFemale(voices)?.name||null,
   male:firstMale(synth)?.name||null
  };
 };
 function install(d){
  if(!d?.body||!d.defaultView)return false;
  const view=d.defaultView,synth=view.speechSynthesis;
  if(!synth||typeof synth.speak!=='function')return false;
  if(view.__sikauNepaliVoiceInstalled)return true;
  const genders={tr:null,rd:null};
  const lastGenderControl={tr:null,rd:null};
  let active='tr',notice=null,noticeScope=null;
  function status(scope,message){
   const root=d.getElementById(scope==='rd'?'rd':'tr');
   if(!root)return;
   let label=root.querySelector('.sikau-nepali-voice-status');
   if(!label){
    label=d.createElement('p');
    label.className='sikau-nepali-voice-status';
    label.setAttribute('role','status');
    label.style.cssText='font:600 12px/1.5 system-ui,sans-serif;color:var(--muted,#687389);'+
     'margin:8px 0;padding:8px 10px;border:1px solid var(--border,#d4d9e4);'+
     'border-radius:9px;background:var(--soft,transparent)';
    // Keep availability feedback beside the voice switch, not at the
    // bottom of a long reading story where the learner cannot see it.
    const control=lastGenderControl[scope];
    const parent=control?.closest?.('.voice-options,.voice-controls,.voice-select,.story-actions,.ttx-result-actions')
     ||control?.parentElement;
    if(parent&&root.contains?.(parent))parent.appendChild(label);
    else{
     const target=root.querySelector('.ttx-result-actions,.story-actions,.read-v2-reading,.content');
     (target||root).appendChild(label);
    }
   }
   label.textContent=message;
   label.hidden=!message;
   notice=label;noticeScope=scope;
  }
  function sayUnavailable(scope){
   const info=voiceReport(synth);
   const names=info.available.slice(0,3).map(v=>v.name).join(', ');
   status(scope,'No male Nepali voice is available in this browser. '+
    (names?'Detected: '+names+'. ':'No Nepali voices reported. ')+
    'The female voice cannot be converted into a native male voice. '+
    'Microsoft Sagar requires a speech provider connection when not installed. '+
    '· नेपाली पुरुष आवाज यस ब्राउजरमा छैन।');
  }
  function chooseGender(scope,gender){
   if(!scope||!gender)return;
   active=scope;genders[scope]=gender;
   // Always stop the previous person's voice when switching female ↔ male.
   // Switching while a sentence plays must never finish in the old voice.
   try{synth.cancel()}catch(_){};
   if(gender==='male'){
    const found=firstMale(synth);
    if(found)status(scope,'Nepali male voice: '+found.name+' · नेपाली पुरुष आवाज उपलब्ध छ।');
    else sayUnavailable(scope);
   }else status(scope,'');
  }
  const selectedGender=scope=>{
   const root=d.getElementById(scope==='rd'?'rd':'tr');
   if(!root)return null;
   const chosen=root.querySelectorAll(
    'button[aria-pressed="true"],button.active,button.on,'+
    '[role="radio"][aria-checked="true"],input[type="radio"]:checked,select');
   for(const control of chosen){
    let label=voiceLabel(control);
    if(control.tagName==='SELECT'){
     const option=control.options?.[control.selectedIndex];
     label=String(option?.textContent||'')+' '+String(option?.value||'');
    }
    const gender=controlGender(control);
    if(gender)return gender;
   }
   return null;
  };
  function currentGender(scope){
   // Prefer an explicit click/change in this session. Read native selected
   // controls as a fallback when the protected lesson restores its UI state.
   return genders[scope]||selectedGender(scope);
  }
  const rawSpeak=synth.speak;
  const speakOriginal=utterance=>rawSpeak.call(synth,utterance);
  function routedSpeak(utterance){
   if(!utterance||!isNepali(utterance))return speakOriginal(utterance);
   const scope=active;
   if(currentGender(scope)!=='male')return speakOriginal(utterance);
   const voice=firstMale(synth);
   if(!voice){try{synth.cancel()}catch(_){}sayUnavailable(scope);return;}
   utterance.voice=voice;
   utterance.lang=voice.lang||'ne-NP';
   // Neutral pitch/rate avoids the robotic low-pitch female workaround.
   utterance.pitch=1;
   utterance.rate=0.98;
   status(scope,'');
   return speakOriginal(utterance);
  }
  let patched=false;
  try{
   synth.speak=routedSpeak;
   patched=synth.speak===routedSpeak;
  }catch(_){}
  if(!patched){
   // Some browsers expose the function on the prototype, not as a
   // writable instance property. Preserve the original as a delegate.
   try{
    const proto=Object.getPrototypeOf(synth);
    const descriptor=Object.getOwnPropertyDescriptor(proto,'speak');
    if(descriptor?.configurable&&typeof descriptor.value==='function'){
     Object.defineProperty(proto,'speak',{...descriptor,value:function(u){
      return this===synth?routedSpeak(u):descriptor.value.call(this,u);
     }});
     patched=true;
    }
   }catch(_){}
  }
  function scan(e){
   const root=e.target?.closest?.('#tr,#rd,#learn');
   const scope=matchesScope(root);
   if(!scope)return;
   active=scope;
   let control=e.target?.closest?.('button,label,input,select,[role="radio"],[role="button"]');
   if(!control)return;
   const gender=controlGender(control);
   if(gender){lastGenderControl[scope]=control;chooseGender(scope,gender);}
   else {
    const current=selectedGender(scope);
    if(current&&current!==genders[scope])chooseGender(scope,current);
   }
  }
  d.addEventListener('click',scan,true);
  d.addEventListener('change',scan,true);
  if(typeof synth.addEventListener==='function')synth.addEventListener('voiceschanged',()=>{
   for(const scope of ['tr','rd'])if(genders[scope]==='male'){
    if(firstMale(synth))status(scope,'Nepali male voice: '+firstMale(synth).name+' · नेपाली पुरुष आवाज उपलब्ध छ।');
    else sayUnavailable(scope);
   }
  });
  view.__sikauNepaliVoiceInstalled=true;
  view.__sikauNepaliVoice={
   isAuthenticMale,genderOf,controlGender,voiceReport:()=>voiceReport(synth),
   firstMale:()=>firstMale(synth),
   select:chooseGender,available:()=>!!firstMale(synth),
   speakNepali:(text,scope='tr')=>{
    if(scope==='tr'||scope==='rd')active=scope;
    if(!text||!view.SpeechSynthesisUtterance)return false;
    const utterance=new view.SpeechSynthesisUtterance(String(text));
    utterance.lang='ne-NP';
    if(currentGender(active)==='male'&&!firstMale(synth)){
     sayUnavailable(active);return false;
    }
    synth.cancel();
    (patched?synth.speak:routedSpeak)(utterance);
    return true;
   },
   maleSelected:scope=>currentGender(scope)==='male',
   patched
  };
  return true;
 }
 window.enhanceNepaliSpeechVoices=install;
})();