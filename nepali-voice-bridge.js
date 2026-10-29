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
 const isNepali=(utterance)=>{
  const lang=String(utterance?.lang||'').toLowerCase().replace('_','-');
  return lang==='ne'||lang.startsWith('ne-')||
   /[\u0900-\u097f]/.test(String(utterance?.text||''))&&
   !/^(?:hi|mr|sa)(?:-|$)/.test(lang);
 };
 const isAuthenticMale=voice=>{
  const lang=String(voice?.lang||'').toLowerCase().replace('_','-');
  const name=String(voice?.name||'');
  // The platform API has no gender field: only well-identified Nepali
  // male voices qualify. "Sagar" is the native Nepali male neural voice.
  return (lang==='ne'||lang.startsWith('ne-'))&&/(?:^|[^a-z])sagar(?:[^a-z]|$)/i.test(name);
 };
 function firstMale(synth){
  try{return Array.from(synth.getVoices?.()||[]).find(isAuthenticMale)||null;}
  catch(_){return null;}
 }
 function install(d){
  if(!d?.body||!d.defaultView)return false;
  const view=d.defaultView,synth=view.speechSynthesis;
  if(!synth||typeof synth.speak!=='function')return false;
  if(view.__sikauNepaliVoiceInstalled)return true;
  const genders={tr:null,rd:null};
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
    const target=root.querySelector('.ttx-result-actions,.story-actions,.read-v2-reading,.content');
    (target||root).appendChild(label);
   }
   label.textContent=message;
   label.hidden=!message;
   notice=label;noticeScope=scope;
  }
  function sayUnavailable(scope){
   status(scope,'A genuine Nepali male voice is not available in this browser. '+
    'The female voice was not used. A dedicated Nepali male speech service (such as Sagar) is required. '+
    '· वास्तविक नेपाली पुरुष आवाज यहाँ उपलब्ध छैन। महिला आवाज बजाइएको छैन।');
  }
  function chooseGender(scope,gender){
   if(!scope||!gender)return;
   active=scope;genders[scope]=gender;
   if(gender==='male'){
    if(firstMale(synth))status(scope,'Nepali male voice available: Sagar · नेपाली पुरुष आवाज उपलब्ध छ।');
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
     label+=' '+(option?.textContent||'');
    }
    const gender=genderOf(label);
    if(gender)return gender;
   }
   return null;
  };
  function currentGender(scope){
   return genders[scope]||selectedGender(scope);
  }
  const rawSpeak=synth.speak;
  const speakOriginal=utterance=>rawSpeak.call(synth,utterance);
  function routedSpeak(utterance){
   if(!utterance||!isNepali(utterance))return speakOriginal(utterance);
   const scope=active;
   if(currentGender(scope)!=='male')return speakOriginal(utterance);
   const voice=firstMale(synth);
   if(!voice){sayUnavailable(scope);return;}
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
   const gender=genderOf(voiceLabel(control));
   if(gender)chooseGender(scope,gender);
   else {
    const current=selectedGender(scope);
    if(current)genders[scope]=current;
   }
  }
  d.addEventListener('click',scan,true);
  d.addEventListener('change',scan,true);
  if(typeof synth.addEventListener==='function')synth.addEventListener('voiceschanged',()=>{
   for(const scope of ['tr','rd'])if(genders[scope]==='male'){
    if(firstMale(synth))status(scope,'Nepali male voice available: Sagar · नेपाली पुरुष आवाज उपलब्ध छ।');
    else sayUnavailable(scope);
   }
  });
  view.__sikauNepaliVoiceInstalled=true;
  view.__sikauNepaliVoice={
   isAuthenticMale,genderOf,firstMale:()=>firstMale(synth),
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