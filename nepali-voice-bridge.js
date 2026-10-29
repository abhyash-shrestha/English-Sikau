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

 // Web Speech voices are operating-system/browser assets. On Apple the
 // list may contain only standard voices, even if an enhanced system
 // voice was downloaded; do not claim the native voice can be installed
 // or that the app can synthesize unavailable neural speech.
 const englishVoices=synth=>{
  try{return Array.from(synth?.getVoices?.()||[]).filter(v=>
   /^en(?:-|$)/i.test(String(v?.lang||'').replace('_','-')));
  }catch(_){return[];}
 };
 const voiceQuality=voice=>{
  const name=String(voice?.name||''),uri=String(voice?.voiceURI||'');
  const full=(name+' '+uri).toLowerCase();
  let score=0;
  if(/natural|neural|premium/.test(full))score+=115;
  if(/enhanced|high.quality|high quality/.test(full))score+=70;
  if(/(?:microsoft|azure)/.test(full))score+=20;
  if(/google/.test(full))score+=12;
  if(/siri/.test(full))score+=26;
  if(/(?:ava|jenny|aria|andrew|emma|guy|christopher|brian|ryan|sonia|libby|steffan|sagar|hemkala)/i.test(name))score+=38;
  if(/(?:samantha|alex|allison|daniel|karen|moira|serena|oliver)/i.test(name))score+=12;
  if(/(?:compact|eloquence|espeak|robot|novelty|bad news|good news|whisper|bells|boing|bubbles|cellos|zarvox|fred)/i.test(name))score-=180;
  // A default should not win over a genuinely better named voice.
  if(voice?.default)score+=5;
  return score;
 };
 function bestEnglish(synth,utterance){
  const voices=englishVoices(synth);
  if(!voices.length)return null;
  const requested=String(utterance?.lang||'en-US').toLowerCase().replace('_','-');
  const locale=requested.match(/^en(?:-[a-z]{2})?/)?.[0]||'en-us';
  const rank=v=>voiceQuality(v)+
   (String(v.lang||'').toLowerCase().replace('_','-')===locale?18:0);
  const sorted=voices.slice().sort((a,b)=>rank(b)-rank(a));
  const preferred=sorted[0];
  // A list containing only known synthetic/novelty voices is not an
  // improvement. Leave the browser's original choice untouched.
  if(voiceQuality(preferred)<0)return null;
  // Do not replace an explicitly chosen good voice from the original
  // lesson with a different accent just because the name looks promising.
  if(utterance?.voice&&voices.includes(utterance.voice)&&
     rank(utterance.voice)>=rank(preferred)-25)return utterance.voice;
  return preferred;
 }
 function bestNepaliFemale(synth){
  const voices=nepaliVoices(synth);
  const clearlyFemale=voices.filter(v=>
   /(?:^|[^a-z])hemkala(?:[^a-z]|$)|(?:^|[^a-z])female(?:[^a-z]|$)|महिला/i.test(String(v.name||'')));
  if(!clearlyFemale.length)return null;
  return clearlyFemale.slice().sort((a,b)=>voiceQuality(b)-voiceQuality(a))[0];
 }
 function voiceChoiceReport(synth){
  const en=bestEnglish(synth,{lang:'en-US'});
  const nep=bestNepaliFemale(synth);
  return {english:en?.name||null,nepaliFemale:nep?.name||null,
   nepaliMale:firstMale(synth)?.name||null};
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

  // Shared neural playback: use the SAME provider audio on Safari,
  // Chrome, Edge, macOS, iOS and Windows when the owner activates it.
  // AudioContext is resumed synchronously from the user's actual click;
  // iOS may reject MP3 playback after an asynchronous network callback
  // unless the audio context has already been unlocked in that gesture.
  let neuralContext=null,neuralSource=null,neuralSerial=0;
  const hasNeural=()=>{
   try{return view.parent?.sikauNeuralSpeechConfigured===true&&
      typeof view.parent?.sikauNeuralSpeech==='function'}
   catch(_){return false}
  };
  function prepareNeural(){
   if(!hasNeural())return;
   try{
    const Constructor=view.AudioContext||view.webkitAudioContext;
    if(!Constructor)return;
    if(!neuralContext)neuralContext=new Constructor();
    if(neuralContext.state!=='running')void neuralContext.resume();
   }catch(_){}
  }
  function stopNeural(){
   neuralSerial++;
   if(neuralSource){try{neuralSource.stop()}catch(_){}neuralSource=null;}
  }
  async function playNeural(utterance,scope){
   const ticket=++neuralSerial;
   const lang=isNepali(utterance)?'ne-NP':'en-US';
   const gender=currentGender(scope)==='male'?'male':'female';
   const text=String(utterance?.text||'').trim();
   if(!text||text.length>550){
    status(scope,'Please select a shorter sentence to listen with natural speech.');
    return;
   }
   try{
    // The parent uses the signed-in Appwrite session and a private
    // authenticated function; no Azure key reaches the learner's browser.
    const result=await view.parent.sikauNeuralSpeech({text,lang,gender});
    if(ticket!==neuralSerial)return;
    if(!neuralContext)throw Error('Audio playback needs a user gesture');
    const binary=view.atob(result.audioBase64);
    const bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++)bytes[i]=binary.charCodeAt(i);
    const buffer=await neuralContext.decodeAudioData(bytes.buffer);
    if(ticket!==neuralSerial)return;
    if(neuralContext.state!=='running')await neuralContext.resume();
    if(ticket!==neuralSerial)return;
    neuralSource=neuralContext.createBufferSource();
    neuralSource.buffer=buffer;
    neuralSource.connect(neuralContext.destination);
    neuralSource.onended=()=>{if(ticket===neuralSerial)neuralSource=null};
    neuralSource.start(0);
    status(scope,'');
   }catch(_){
    if(ticket===neuralSerial)
     status(scope,'Natural voice unavailable. Please retry. Your device voice has not been substituted. · प्राकृतिक आवाज उपलब्ध छैन।');
   }
  }

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
   stopNeural();
   if(hasNeural()){prepareNeural();status(scope,'Natural neural voice selected · प्राकृतिक आवाज छानियो।');return;}
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
   if(!utterance)return speakOriginal(utterance);
   const lang=String(utterance.lang||'').replace('_','-').toLowerCase();
   // Once configured, the function supplies real neural MP3 for every
   // language/gender. Do not queue the robotic browser fallback.
   if(hasNeural()&&(isNepali(utterance)||/^en(?:-|$)/.test(lang))){
    stopNeural();
    prepareNeural();
    void playNeural(utterance,active);
    return;
   }
   if(!isNepali(utterance)){
    if(/^en(?:-|$)/.test(lang)){
     const high=bestEnglish(synth,utterance);
     if(high){utterance.voice=high;utterance.lang=high.lang||utterance.lang;}
    }
    return speakOriginal(utterance);
   }
   const scope=active;
   if(currentGender(scope)!=='male'){
    // If the browser exposes an explicitly named female Nepali neural
    // voice, use it rather than a poor-quality default; otherwise retain
    // existing female playback (especially important for Apple).
    const better=bestNepaliFemale(synth);
    if(better){utterance.voice=better;utterance.lang=better.lang||'ne-NP';}
    return speakOriginal(utterance);
   }
   const voice=firstMale(synth);
   if(!voice){try{synth.cancel()}catch(_){}sayUnavailable(scope);return;}
   utterance.voice=voice;
   utterance.lang=voice.lang||'ne-NP';
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
   // Capture-phase click handler runs during an actual user gesture.
   prepareNeural();
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
   voiceChoiceReport:()=>voiceChoiceReport(synth),voiceQuality,bestEnglish:lang=>bestEnglish(synth,{lang}),
   firstMale:()=>firstMale(synth),
   select:chooseGender,available:()=>!!firstMale(synth),
   speakNepali:(text,scope='tr')=>{
    if(scope==='tr'||scope==='rd')active=scope;
    if(!text||!view.SpeechSynthesisUtterance)return false;
    const utterance=new view.SpeechSynthesisUtterance(String(text));
    utterance.lang='ne-NP';
    if(currentGender(active)==='male'&&!firstMale(synth)&&!hasNeural()){
     sayUnavailable(active);return false;
    }
    synth.cancel();
    (patched?synth.speak:routedSpeak)(utterance);
    return true;
   },
   maleSelected:scope=>currentGender(scope)==='male',
   naturalSpeechAvailable:hasNeural,
   patched
  };
  return true;
 }
 window.enhanceNepaliSpeechVoices=install;
})();