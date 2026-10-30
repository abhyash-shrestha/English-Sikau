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
    String(voice?.gender||'').toLowerCase()==='male';
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
 // The Web Speech API has no reliable cross-browser gender field. Only
 // accept named voices with a known identity or explicitly labeled gender.
 // In particular, "female" must never be counted as "male".
 const englishGender=voice=>{
  const explicit=String(voice?.gender||'').toLowerCase();
  if(explicit==='male'||explicit==='female')return explicit;
  const name=String(voice?.name||'');
  if(/\bfemale\b|\bwoman\b|\bgirl\b|\bava\b|\bjenny\b|\baria\b|\bemma\b|\bsonia\b|\blibby\b|\bsamantha\b|\bserena\b|\bkaren\b|\ballison\b|\bmoira\b|\bzira\b|\bvictoria\b|\bjoanna\b|\bsusan\b/i.test(name))return 'female';
  if(/\bmale\b|\bman\b|\bboy\b|\bandrew\b|\bguy\b|\bbrian\b|\bchristopher\b|\bryan\b|\bdaniel\b|\balex\b|\boliver\b|\bsteffan\b|\bdavid\b|\bjames\b/i.test(name))return 'male';
  return null;
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
 function bestEnglish(synth,utterance,selectedGender=null){
  const available=englishVoices(synth);
  // An explicit Male/Female click is a strict requirement, not a hint.
  const voices=selectedGender?
   available.filter(v=>englishGender(v)===selectedGender):available;
  if(!voices.length)return null;
  const requested=String(utterance?.lang||'en-US').toLowerCase().replace('_','-');
  const locale=requested.match(/^en(?:-[a-z]{2})?/)?.[0]||'en-us';
  const rank=v=>voiceQuality(v)+
   (String(v.lang||'').toLowerCase().replace('_','-')===locale?18:0);
  const preferred=voices.slice().sort((a,b)=>rank(b)-rank(a))[0];
  // Without explicit gender, never force a novelty-only browser voice.
  if(!selectedGender&&voiceQuality(preferred)<0)return null;
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
  return {english:en?.name||null,
   englishMale:bestEnglish(synth,{lang:'en-US'},'male')?.name||null,
   englishFemale:bestEnglish(synth,{lang:'en-US'},'female')?.name||null,
   nepaliFemale:nep?.name||null,nepaliMale:firstMale(synth)?.name||null};
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
  // If Android exposes a real ne-NP voice but no gender metadata, let a
  // learner explicitly opt into that Nepali voice. NEVER auto-substitute it
  // for a requested male/female voice or use a Hindi-language voice.
  const allowUnspecifiedNepali={tr:false,rd:false};
  // Android Chrome may have a working ne-NP engine even when getVoices()
  // reports no Nepali entries. NEVER use it without an audible user test.
  const allowNativeNepali={tr:false,rd:false};
  const pendingNepali={tr:null,rd:null};
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
  function splitSpeechText(raw,max=400){
   const text=String(raw||'').trim();
   const result=[];
   let remaining=text;
   while(remaining){
    if(remaining.length<=max){result.push(remaining);break;}
    const head=remaining.slice(0,max+1);
    // Prefer Nepali danda, English sentence punctuation, then whitespace.
    let cut=-1;
    for(let i=0;i<head.length-1;i++){
     const c=head[i];
     if('.!?।॥'.includes(c)&&/\s/.test(head[i+1])&&i>max*0.42)cut=i+1;
    }
    if(cut<1){
     for(let i=1;i<head.length;i++)if(/\s/.test(head[i]))cut=i;
    }
    if(cut<max*0.35)cut=max;
    const chunk=remaining.slice(0,cut).trim();
    if(chunk)result.push(chunk);
    remaining=remaining.slice(cut).trim();
   }
   return result;
  }
  async function playNeural(utterance,scope){
   const ticket=++neuralSerial;
   const lang=isNepali(utterance)?'ne-NP':'en-US';
   const gender=currentGender(scope)==='male'?'male':'female';
   const phrase=String(utterance?.text||'').trim();
   const chunks=splitSpeechText(phrase);
   if(!phrase||phrase.length>2800||chunks.length>8){
    status(scope,'This passage is too long for one listening session. Try a shorter paragraph.');
    return;
   }
   try{
    // Request the next segment while the current segment is playing to
    // avoid long unnatural gaps between full Reading paragraphs.
    const fetchChunk=async chunk=>{
     try{return {ok:true,result:await view.parent.sikauNeuralSpeech({text:chunk,lang,gender})};}
     catch(error){return {ok:false,error};}
    };
    let next=fetchChunk(chunks[0]);
    for(let i=0;i<chunks.length;i++){
     const response=await next;
     if(ticket!==neuralSerial)return;
     if(!response.ok)throw response.error;
     const result=response.result;
     if(i+1<chunks.length)next=fetchChunk(chunks[i+1]);
     if(!neuralContext)throw Error('Audio playback needs a user gesture');
     const binary=view.atob(result.audioBase64);
     const bytes=new Uint8Array(binary.length);
     for(let j=0;j<binary.length;j++)bytes[j]=binary.charCodeAt(j);
     const buffer=await neuralContext.decodeAudioData(bytes.buffer);
     if(ticket!==neuralSerial)return;
     if(neuralContext.state!=='running')await neuralContext.resume();
     if(ticket!==neuralSerial)return;
     await new Promise((resolve,reject)=>{
      const source=neuralContext.createBufferSource();
      neuralSource=source;
      source.buffer=buffer;
      source.connect(neuralContext.destination);
      source.onended=resolve;
      try{source.start(0)}catch(error){reject(error)}
     });
     if(ticket!==neuralSerial)return;
     neuralSource=null;
    }
    status(scope,'');
   }catch(_){
    if(ticket===neuralSerial)
     status(scope,'Natural audio unavailable. Retry once the speech service is connected. · प्राकृतिक आवाज उपलब्ध छैन।');
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
  function sayUnavailable(scope,lang='ne-NP',gender='male'){
   const language=lang==='en-US'?'English':'Nepali';
   const who=gender==='female'?'female':gender==='male'?'male':'';
   const candidates=lang==='en-US'?englishVoices(synth):nepaliVoices(synth);
   const names=candidates.slice(0,3).map(v=>v.name).join(', ');
   const hasNepali=lang==='ne-NP'&&candidates.length>0;
   status(scope,'No '+(who?who+' ':'')+language+' voice is available in this browser. '+
    (names?'Detected '+language+' voices: '+names+'. ':'No '+language+' voices were reported. ')+
    (hasNepali?'This device reports Nepali, but not the requested gender. ':
     'On Android: Settings → Accessibility → Text-to-speech output → Install voice data → Nepali (Nepal), if offered. ')+
    'Hindi is never used as a Nepali fallback. '+
    '· यहाँ छानिएको आवाज उपलब्ध छैन।');
   // Android sometimes advertises "Google नेपाली" or "Nepali" without
   // specifying the speaker gender. The user can still hear that voice by
   // explicitly choosing this button, with truthful gender disclosure.
   if(!pendingNepali[scope])return;
   const root=d.getElementById(scope==='rd'?'rd':'tr');
   const label=root?.querySelector?.('.sikau-nepali-voice-status')||notice;
   if(!label||typeof view.SpeechSynthesisUtterance!=='function')return;
   if(!hasNepali){
    const test=d.createElement('button');
    test.type='button';
    test.className='sikau-nepali-voice-try-native';
    test.textContent='▶ Test this phone’s Nepali speech (no voice listed)';
    test.style.cssText='display:block;margin:7px 0 0;padding:8px 10px;border-radius:9px;'+
     'border:1px solid currentColor;background:transparent;color:inherit;font:inherit;cursor:pointer;';
    test.onclick=()=>{
     active=scope;
     const phrase='नमस्ते। तपाईंलाई कस्तो छ?';
     const u=new view.SpeechSynthesisUtterance(phrase);
     u.lang='ne-NP';
     u.rate=0.94;
     // Intentionally leave u.voice unset. Android's TTS engine gets one
     // opportunity to resolve ne-NP even if the Web Speech list is empty.
     // This is a test only, NOT permission for future silent fallback.
     let started=false,finished=false;
     u.onstart=()=>{started=true;status(scope,
      'Testing phone speech. If this actually sounded like Nepali, you can approve it after playback.');};
     u.onerror=e=>{
      finished=true;
      status(scope,'Android Nepali speech failed ('+
       String(e?.error||'unavailable').replace(/[^a-z-]/ig,'').slice(0,35)+
       '). Install Nepali (Nepal) voice data in Settings → General management → Text-to-speech.');
     };
     u.onend=()=>{
      if(finished)return;
      finished=true;
      if(!started){
       status(scope,'No playable Nepali voice confirmed. Check your phone’s Text-to-speech settings.');
       return;
      }
      status(scope,'Did you hear clear Nepali (not Hindi)? Only enable it if pronunciation was correct.');
      const container=root?.querySelector?.('.sikau-nepali-voice-status')||notice;
      if(!container)return;
      const accept=d.createElement('button');
      accept.type='button';accept.className='sikau-nepali-native-confirm';
      accept.textContent='Yes, use this phone voice (gender unverified)';
      accept.style.cssText='display:block;margin:8px 0 0;padding:8px 10px;'+
       'border:1px solid currentColor;border-radius:9px;background:transparent;color:inherit;font:inherit;';
      accept.onclick=()=>{
       allowNativeNepali[scope]=true;
       const original=pendingNepali[scope];pendingNepali[scope]=null;
       status(scope,'Phone speech enabled for this tab only. Accent and gender are not verified.');
       if(original){
        active=scope;
        const next=new view.SpeechSynthesisUtterance(original);
        next.lang='ne-NP';next.rate=0.96;
        routedSpeak(next);
       }
      };
      container.appendChild?.(accept);
     };
     try{synth.cancel();speakOriginal(u)}
     catch(_){status(scope,'Android speech engine could not start the Nepali test.');}
    };
    label.appendChild?.(test);
    return;
   }
   const btn=d.createElement('button');
   btn.type='button';
   btn.className='sikau-nepali-voice-use-device';
   btn.textContent='▶ Play available Nepali voice (gender not verified)';
   btn.style.cssText='display:block;margin:7px 0 0;padding:7px 10px;border-radius:9px;'+
    'border:1px solid currentColor;background:transparent;color:inherit;font:inherit;cursor:pointer;';
   btn.onclick=()=>{
    const phrase=pendingNepali[scope];
    if(!phrase)return;
    allowUnspecifiedNepali[scope]=true;
    pendingNepali[scope]=null;
    active=scope;
    const u=new view.SpeechSynthesisUtterance(phrase);
    u.lang='ne-NP';
    try{synth.cancel()}catch(_){}
    routedSpeak(u);
   };
   label.appendChild?.(btn);
  }
  function chooseGender(scope,gender){
   if(!scope||!gender)return;
   active=scope;genders[scope]=gender;
   allowUnspecifiedNepali[scope]=false;
   allowNativeNepali[scope]=false;
   pendingNepali[scope]=null;
   // Always stop the previous person's voice when switching female ↔ male.
   // Switching while a sentence plays must never finish in the old voice.
   try{synth.cancel()}catch(_){};
   stopNeural();
   if(hasNeural()){prepareNeural();status(scope,'Natural neural voice selected · प्राकृतिक आवाज छानियो।');return;}
   const nep=gender==='male'?firstMale(synth):bestNepaliFemale(synth);
   const eng=bestEnglish(synth,{lang:'en-US'},gender);
   status(scope,'Selected '+(gender==='male'?'Male':'Female')+
    '. Nepali: '+(nep?.name||'not installed')+
    ' · English: '+(eng?.name||'not installed')+
    '. Unavailable voices will not silently switch gender or language.');
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
   const scope=active,gender=currentGender(scope);
   if(!isNepali(utterance)){
    if(/^en(?:-|$)/.test(lang)){
     const chosen=bestEnglish(synth,utterance,gender);
     if(!chosen&&gender){
      try{synth.cancel()}catch(_){}
      sayUnavailable(scope,'en-US',gender);
      return false;
     }
     if(chosen){utterance.voice=chosen;utterance.lang=chosen.lang||utterance.lang;}
    }
    return speakOriginal(utterance);
   }
   // Refuse Hindi or unrelated-language fallback even when a Devanagari
   // phrase is entered. This is why a device lacking ne-NP cannot be made
   // to sound like a Nepal-born speaker merely through browser settings.
   const nepali=nepaliVoices(synth);
   const matched=gender==='male'?firstMale(synth):
    gender==='female'?bestNepaliFemale(synth):
    (bestNepaliFemale(synth)||nepali.slice().sort((a,b)=>voiceQuality(b)-voiceQuality(a))[0]);
   const offered=allowUnspecifiedNepali[scope]?
    nepali.slice().sort((a,b)=>voiceQuality(b)-voiceQuality(a))[0]:null;
   const voice=matched||offered;
   if(!voice&&allowNativeNepali[scope]&&!nepali.length){
    // User explicitly verified the phone's output in this tab.
    // A gender-verified ne-NP voice is still preferable if it appears later.
    utterance.lang='ne-NP';
    utterance.rate=0.96;
    utterance.pitch=1;
    utterance.onerror=e=>status(scope,
     'Phone Nepali speech failed: '+String(e?.error||'unknown').slice(0,35)+
     '. Open Android Text-to-speech settings to install Nepali voice data.');
    status(scope,'Using manually approved phone voice (gender/accent unverified).');
    return speakOriginal(utterance);
   }
   if(!voice){
    try{synth.cancel()}catch(_){}
    pendingNepali[scope]=String(utterance.text||'').trim().slice(0,2800);
    sayUnavailable(scope,'ne-NP',gender);
    return false;
   }
   utterance.voice=voice;
   utterance.lang='ne-NP';
   utterance.pitch=1;
   utterance.rate=1;
   status(scope,matched?'':('Using available Nepali voice: '+voice.name+
    ' (gender not verified). · नेपाली आवाज प्रयोग हुँदैछ।'));
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
   firstMale:()=>firstMale(synth),bestNepaliFemale:()=>bestNepaliFemale(synth),
   englishGender,selectedGender:scope=>currentGender(scope),
   select:chooseGender,available:()=>!!firstMale(synth),
   availableNepali:()=>nepaliVoices(synth).map(v=>({name:v.name,lang:v.lang})),
   useUnspecifiedNepali:scope=>allowUnspecifiedNepali[scope]===true,
   useNativeNepali:scope=>allowNativeNepali[scope]===true,
   // Explicit route bypasses the non-writable speechSynthesis.speak monkey
   // patch on some Safari builds. Only the iPhone Translate player calls
   // this new method; the working Windows playback stays unchanged.
   speakText:(text,lang='ne-NP',scope='tr')=>{
    if(scope==='tr'||scope==='rd')active=scope;
    if(!text||!view.SpeechSynthesisUtterance||!['en-US','ne-NP'].includes(lang))return false;
    if(!hasNeural()){
     const chosen=currentGender(active);
     if(lang==='ne-NP'&&!((chosen==='male'?firstMale(synth):
       chosen==='female'?bestNepaliFemale(synth):nepaliVoices(synth)[0]))&&
       !(allowUnspecifiedNepali[active]&&nepaliVoices(synth).length)&&
       !allowNativeNepali[active]){
      pendingNepali[active]=String(text).trim().slice(0,2800);
      sayUnavailable(active,'ne-NP',chosen);return false;
     }
     if(lang==='en-US'&&chosen&&!bestEnglish(synth,{lang},chosen)){
      sayUnavailable(active,'en-US',chosen);return false;
     }
    }
    const utterance=new view.SpeechSynthesisUtterance(String(text));
    utterance.lang=lang;
    synth.cancel();
    stopNeural();
    routedSpeak(utterance);
    return true;
   },
   speakNepali:(text,scope='tr')=>{
    if(scope==='tr'||scope==='rd')active=scope;
    if(!text||!view.SpeechSynthesisUtterance)return false;
    const utterance=new view.SpeechSynthesisUtterance(String(text));
    utterance.lang='ne-NP';
    if(!hasNeural()){
     const selected=currentGender(active);
     const available=selected==='male'?firstMale(synth):
       selected==='female'?bestNepaliFemale(synth):nepaliVoices(synth)[0];
     if(!available&&!(allowUnspecifiedNepali[active]&&nepaliVoices(synth).length)&&
       !allowNativeNepali[active]){
      pendingNepali[active]=String(text).trim().slice(0,2800);
      sayUnavailable(active,'ne-NP',selected);return false;
     }
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