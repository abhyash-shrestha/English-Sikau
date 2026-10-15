/* English Sikau Translate Studio v4.
   Only changes authenticated lesson presentation. Existing Appwrite access,
   translation providers, OCR, scoring, and native event handlers remain intact. */
(function(){
'use strict';
const CSS_URL=new URL('./translate-studio-v4.css?v=20261015-r1',document.baseURI).href;
const samples=[
 ['👋','Hello!','नमस्ते!','ttx-rose'],
 ['📍','I am going to Pokhara.','म पोखरा जाँदै छु।','ttx-blue'],
 ['💬','What is your name?','तपाईंको नाम के हो?','ttx-purple'],
 ['📚','I like learning English.','मलाई अंग्रेजी सिक्न मन पर्छ।','ttx-green'],
 ['☀️','The weather is nice today.','आज मौसम राम्रो छ।','ttx-amber'],
 ['🙏','Thank you for helping me.','मलाई मद्दत गर्नुभएकोमा धन्यवाद।','ttx-rose'],
 ['🍲','I would like to eat momo.','म मःम खान चाहन्छु।','ttx-amber'],
 ['👨‍👩‍👧','This is my family.','यो मेरो परिवार हो।','ttx-green']
];
const topics=[
 {icon:'🥟',title:'Food & Cooking',ne:'खाना र पकाउने',kind:'food',pair:['Momo is delicious.','मःम मिठो छ।']},
 {icon:'🏔️',title:'Places & Travel',ne:'ठाउँहरू र यात्रा',kind:'travel',pair:['We are visiting Phewa Lake in Pokhara.','हामी पोखराको फेवा ताल घुम्न जाँदै छौं।']},
 {icon:'🪔',title:'Festivals & Culture',ne:'पर्व र संस्कृति',kind:'festival',pair:['We celebrate Tihar with lights.','हामी तिहारमा बत्ती बालेर उत्सव मनाउँछौं।']},
 {icon:'🗣️',title:'Daily Conversation',ne:'दैनिक कुराकानी',kind:'conversation',pair:['How are you today?','आज तपाईंलाई कस्तो छ?']},
 {icon:'🛍️',title:'Shopping',ne:'किनमेल',kind:'shopping',pair:['How much is this shirt?','यो कमिजको मूल्य कति हो?']},
 {icon:'👨‍👩‍👧',title:'Family & Relationships',ne:'परिवार र सम्बन्ध',kind:'family',pair:['I love spending time with my family.','मलाई परिवारसँग समय बिताउन मन पर्छ।']},
 {icon:'💼',title:'Work & Job',ne:'काम र रोजगारी',kind:'work',pair:['I am looking for a new job.','म नयाँ काम खोज्दै छु।']},
 {icon:'📚',title:'School & Education',ne:'विद्यालय र शिक्षा',kind:'school',pair:['I study English every day.','म हरेक दिन अंग्रेजी पढ्छु।']}
];
const mk=(d,tag,cls,txt)=>{const e=d.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e};
const put=(d,parent,tag,cls,txt)=>{const e=mk(d,tag,cls,txt);parent.appendChild(e);return e};
function safeInput(d,input,value){
 const descriptor=Object.getOwnPropertyDescriptor(d.defaultView.HTMLTextAreaElement.prototype,'value');
 if(descriptor?.set)descriptor.set.call(input,value);else input.value=value;
 input.dispatchEvent(new d.defaultView.Event('input',{bubbles:true}));
}
function nativeDirection(section){return section.querySelector('#dirSel button.on')?.dataset.d||'ne'}
function nativeSwitch(section,want,input,preserve=false){
 const b=section.querySelector('#dirSel button[data-d="'+want+'"]');
 if(!b)return;
 if(nativeDirection(section)===want)return;
 const text=preserve?input.value:'';
 b.click(); // real private app changes its translation direction and clears output
 if(preserve&&text)safeInput(section.ownerDocument,input,text);
}
function nativeMode(section,want){
 const b=section.querySelector('#trModeSel button[data-tm="'+want+'"]');
 if(b)b.click(); // retain original camera/OCR mode logic
}
function nativeTab(d,name){
 const n=d.querySelector('#mobileModes.nav')||d.querySelector('.nav');
 const b=n?.querySelector('button[data-t="'+name+'"]');
 if(b)b.click();return !!b;
}
window.enhanceTranslationDashboard=function(d){
 if(!d?.body||!d?.head)return;
 const sec=d.querySelector('#tr'),root=sec?.querySelector(':scope > .content');
 const input=sec?.querySelector('#inp'),output=sec?.querySelector('#out');
 const dir=sec?.querySelector('#dirSel'),modes=sec?.querySelector('#trModeSel');
 const go=sec?.querySelector('#bt'),clear=sec?.querySelector('#clr'),dice=sec?.querySelector('#ex');
 const privateCard=dir?.closest('.card'),tip=sec?.querySelector('#tipCard');
 if(!root||!input||!output||!dir||!modes||!go||!privateCard)return;
 if(sec.dataset.sikauStudio==='4')return;
 // Only one code path for this protected page: don't invoke stale v3 wrappers.
 const link=mk(d,'link');link.id='sikauTranslateStudioV4';link.rel='stylesheet';link.href=CSS_URL;
 if(!d.getElementById(link.id))d.head.appendChild(link);
 const hero=put(d,root,'section','ttx-hero');
 hero.setAttribute('aria-label','English Sikau translation');
 const backdrop=put(d,hero,'div','ttx-hero-scene');backdrop.setAttribute('aria-hidden','true');
 const heroText=put(d,hero,'div','ttx-hero-copy');
 const cap=put(d,heroText,'div','ttx-hero-eyebrow','🇳🇵 ENGLISH SIKAU · अनुवाद');
 const title=put(d,heroText,'h1','', 'Translate');
 put(d,title,'span','',' · अनुवाद सिकौं');
 put(d,heroText,'p','','Translate words, sentences, and full text easily.');
 put(d,heroText,'p','ttx-ne','शब्द, वाक्य र पूरा लेख सजिलै अनुवाद गर्नुहोस्।');
 const heroVisual=put(d,hero,'div','ttx-hero-visual');
 heroVisual.setAttribute('aria-hidden','true');
 put(d,heroVisual,'span','ttx-glyph ttx-en-glyph','A');
 put(d,heroVisual,'span','ttx-glyph ttx-ne-glyph','अ');
 const heroHint=put(d,hero,'div','ttx-hero-hint');
 put(d,heroHint,'strong','','Real words. Real situations.');
 put(d,heroHint,'small','','Write or speak in Nepali or English. · नेपाली वा अंग्रेजी लेख्नुहोस्।');

 const workspace=put(d,root,'div','ttx-workspace');
 const entry=put(d,workspace,'section','ttx-panel ttx-entry');
 const result=put(d,workspace,'section','ttx-panel ttx-result');
 const toolPanel=put(d,workspace,'aside','ttx-panel ttx-side');
 entry.setAttribute('aria-label','Translate text');
 result.setAttribute('aria-label','Translation result');
 toolPanel.setAttribute('aria-label','Translation quick tools');

 const selectors=put(d,entry,'div','ttx-directions');
 const btns={};
 [['ne','🇳🇵 Nepali → English','नेपाली → अंग्रेजी'],
  ['en','🇬🇧 English → Nepali','अंग्रेजी → नेपाली'],
  ['auto','⇄ Both Ways','दुवै तरिका']].forEach(([v,label,ne])=>{
  const b=put(d,selectors,'button','ttx-dir-button');
  b.type='button';b.dataset.direction=v;
  put(d,b,'strong','',label);put(d,b,'small','',ne);btns[v]=b;
 });
 privateCard.classList.add('ttx-native');
 entry.appendChild(privateCard);
 const tools=put(d,entry,'div','ttx-input-tools');
 const notice=put(d,entry,'div','ttx-notice','');
 notice.setAttribute('role','status');
 const resultHeader=put(d,result,'div','ttx-panel-head');
 const resultHeading=put(d,resultHeader,'div','');
 put(d,resultHeading,'strong','','✨ Translation Result');
 put(d,resultHeading,'small','','अनुवाद परिणाम');
 const target=put(d,resultHeader,'span','ttx-output-language','English');
 const resultCard=put(d,result,'div','ttx-result-content');
 const emptyIcon=put(d,resultCard,'div','ttx-empty-art','🅰️ ⇄ अ');
 emptyIcon.setAttribute('aria-hidden','true');
 resultCard.appendChild(output); // native output and translation rendering remain untouched
 const placeholder=put(d,resultCard,'p','ttx-result-placeholder','Your translation will appear here. · तपाईंको अनुवाद यहाँ देखिनेछ।');
 const outputTools=put(d,result,'div','ttx-result-actions');
 const copy=put(d,outputTools,'button','','▢ Copy · प्रतिलिपि');
 const speakOut=put(d,outputTools,'button','','🔊 Listen · सुन्नुहोस्');
 const save=put(d,outputTools,'button','','☆ Save · सेभ');
 [copy,speakOut,save].forEach(b=>b.type='button');
 const quickHead=put(d,toolPanel,'div','ttx-panel-head');
 const q=put(d,quickHead,'div','');put(d,q,'strong','','✨ Quick Tools');put(d,q,'small','','छिटो उपकरणहरू');
 const quickGrid=put(d,toolPanel,'div','ttx-quick-grid');
 const quick=[
  ['🎲','Random Word','नयाँ शब्द','ttx-q-orange','word'],
  ['💬','Daily Phrase','दैनिक वाक्य','ttx-q-purple','phrase'],
  ['👥','Conversation','संवाद अभ्यास','ttx-q-green','conversation'],
  ['📷','Photo Translate','तस्बिर अनुवाद','ttx-q-blue','photo']
 ];
 const quickButtons={};
 for(const [emoji,name,ne,color,key] of quick){
  const b=put(d,quickGrid,'button','ttx-quick '+color);
  b.type='button';b.dataset.tool=key;
  put(d,b,'span','ttx-quick-icon',emoji);
  put(d,b,'strong','',name);put(d,b,'small','',ne);
  put(d,b,'span','ttx-quick-footer',key==='photo'?'Upload an image · फोटो': 'Try an example · उदाहरण');
  quickButtons[key]=b;
 }
 const topicSection=put(d,root,'section','ttx-topic-section');
 const topicHeading=put(d,topicSection,'div','ttx-section-head');
 put(d,topicHeading,'h2','','🏵️ Popular Topics · लोकप्रिय विषयहरू');
 put(d,topicHeading,'span','','Choose one to try a translation · विषय छान्नुहोस्');
 const topicGrid=put(d,topicSection,'div','ttx-topic-grid');
 for(const topic of topics){
  const b=put(d,topicGrid,'button','ttx-topic ttx-topic-'+topic.kind);b.type='button';
  const media=put(d,b,'div','ttx-topic-image ttx-image-'+topic.kind);
  put(d,media,'span','',topic.icon);
  put(d,b,'strong','',topic.title);
  put(d,b,'small','',topic.ne);
  b.addEventListener('click',()=>choosePair(topic.pair));
 }
 const exampleSection=put(d,root,'section','ttx-examples');
 const exampleHead=put(d,exampleSection,'div','ttx-section-head');
 put(d,exampleHead,'h2','','🔠 Example Translations · उदाहरण अनुवादहरू');
 const more=put(d,exampleHead,'button','ttx-more','More examples →');
 more.type='button';
 const exampleGrid=put(d,exampleSection,'div','ttx-examples-grid');

 let auto=false,examplesOpen=false,wordIndex=-1;
 const saving=new Set();
 function directionUI(){
  const current=auto?'auto':nativeDirection(sec);
  Object.entries(btns).forEach(([key,button])=>{
    const active=key===current;button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  target.textContent=nativeDirection(sec)==='ne'?'English':'नेपाली';
  input.placeholder=nativeDirection(sec)==='ne'?
   'Type or paste Nepali text here…\nनेपालीमा लेख्नुहोस् वा टाँस्नुहोस्…':
   'Type or paste English text here…\nयहाँ अंग्रेजी लेख्नुहोस्…';
 }
 Object.entries(btns).forEach(([key,b])=>b.addEventListener('click',()=>{
  auto=key==='auto';
  if(!auto)nativeSwitch(sec,key,input,false);
  directionUI();
 }));
 function ensureTyping(){
  const type=sec.querySelector('#trTypeMode');
  if(type?.hidden)nativeMode(sec,'type');
  const nativeArea=sec.querySelector('#trTypeMode');
  if(nativeArea)nativeArea.hidden=false;
 }
 function choosePair(pair){
  ensureTyping();
  const value=nativeDirection(sec)==='ne'?pair[1]:pair[0];
  safeInput(d,input,value);
  notice.textContent='Ready. Press Translate to see the result. · अनुवाद थिच्नुहोस्।';
  input.focus({preventScroll:true});
  entry.scrollIntoView({behavior:'smooth',block:'nearest'});
 }
 function examplesRender(){
  exampleGrid.replaceChildren();
  (examplesOpen?samples:samples.slice(0,5)).forEach(([emoji,en,ne,tint])=>{
    const b=put(d,exampleGrid,'button','ttx-example '+tint);b.type='button';
    put(d,b,'span','ttx-example-icon',emoji);
    const info=put(d,b,'span','ttx-example-text');
    put(d,info,'strong','',ne);put(d,info,'small','',en);
    b.addEventListener('click',()=>choosePair([en,ne]));
  });
  more.textContent=examplesOpen?'Show fewer ↑':'More examples →';
 }
 more.addEventListener('click',()=>{examplesOpen=!examplesOpen;examplesRender();});
 examplesRender();
 function updateCounter(){
  const c=sec.querySelector('.ttx-character-count');
  if(c)c.textContent=input.value.length+' / 500';
 }
 // Reuse the native field and native action row; do not replace submit handler.
 const actionRow=sec.querySelector('#trTypeMode>.row');
 if(actionRow)actionRow.classList.add('ttx-native-actions');
 const originalQuick=sec.querySelector('#quick');if(originalQuick)originalQuick.classList.add('ttx-native-quick');
 const nativeCount=put(d,tools,'span','ttx-character-count','0 / 500');
 const speech=put(d,tools,'button','ttx-mini ttx-mic','🎙️ Speak');
 const camera=put(d,tools,'button','ttx-mini ttx-camera','📸 Camera');
 const upload=put(d,tools,'button','ttx-mini ttx-upload','⬆ Upload');
 const writing=put(d,tools,'button','ttx-mini ttx-writing','✏️ Write');
 [speech,camera,upload,writing].forEach(b=>b.type='button');
 function showCamera(openUpload){
  nativeMode(sec,'cam');
  const cam=sec.querySelector('#trCamMode'); if(cam)cam.hidden=false;
  if(openUpload){
   const nativeUpload=sec.querySelector('#camUpload');
   if(nativeUpload)nativeUpload.click();
  }
 }
 camera.addEventListener('click',()=>showCamera(false));
 upload.addEventListener('click',()=>showCamera(true));
 writing.addEventListener('click',()=>{if(!nativeTab(d,'hw'))notice.textContent='Select Write from the navigation · लेखन खोल्नुहोस्।';});
 quickButtons.photo.addEventListener('click',()=>showCamera(true));
 quickButtons.word.addEventListener('click',()=>{
  const pairs=[['Hello!','नमस्ते!'],['Thank you.','धन्यवाद।'],['Friend','साथी'],['Water','पानी'],['Family','परिवार'],['School','विद्यालय'],['Book','किताब'],['Mountain','हिमाल']];
  wordIndex=(wordIndex+1)%pairs.length;choosePair(pairs[wordIndex]);
 });
 quickButtons.phrase.addEventListener('click',()=>choosePair(samples[new Date().getDate()%samples.length].slice(1,3)));
 quickButtons.conversation.addEventListener('click',()=>choosePair(['Nice to meet you!','तपाईंलाई भेटेर खुशी लाग्यो!']));
 let recognition=null;
 speech.addEventListener('click',()=>{
  const API=d.defaultView.SpeechRecognition||d.defaultView.webkitSpeechRecognition;
  if(!API){notice.textContent='Speech input is unavailable here. Try typing or uploading an image. · माइक्रोफोन उपलब्ध छैन।';return}
  if(recognition){recognition.stop();return}
  try{
   recognition=new API();recognition.lang=nativeDirection(sec)==='ne'?'ne-NP':'en-US';
   recognition.interimResults=false;
   recognition.onresult=e=>{const phrase=e.results?.[0]?.[0]?.transcript;
    if(phrase){ensureTyping();safeInput(d,input,phrase);notice.textContent='Speech captured. Press Translate · अनुवाद थिच्नुहोस्।';}};
   recognition.onerror=()=>{notice.textContent='Microphone unavailable or permission denied · माइक्रोफोनको अनुमति छैन।';};
   recognition.onend=()=>{recognition=null;};
   recognition.start();notice.textContent='Listening… · सुन्दैछ…';
  }catch(_){recognition=null;notice.textContent='Unable to start the microphone · माइक्रोफोन सुरु भएन।';}
 });
 // In Both Ways mode, detect Devanagari only at the point of translation,
 // so the existing native submit runs exactly once and XP is not duplicated.
 go.addEventListener('click',()=>{
  if(auto&&input.value.trim()){
   const written=input.value;
   const detected=/[\u0900-\u097F]/.test(written)?'ne':'en';
   nativeSwitch(sec,detected,input,true);
   directionUI();
  }
 },true);
 function resultText(){
  return (output.innerText||output.textContent||'').trim();
 }
 copy.addEventListener('click',async()=>{
  const txt=resultText();
  if(!txt){notice.textContent='Translate first · पहिले अनुवाद गर्नुहोस्।';return}
  try{await d.defaultView.navigator.clipboard.writeText(txt);notice.textContent='Copied! · प्रतिलिपि भयो।';}
  catch(_){notice.textContent='Copy permission unavailable; select the result manually. · आफैं कपी गर्नुहोस्।';}
 });
 speakOut.addEventListener('click',()=>{
  const txt=resultText(),v=d.defaultView;
  if(!txt){notice.textContent='Translate first · पहिले अनुवाद गर्नुहोस्।';return}
  if(!v.speechSynthesis||!v.SpeechSynthesisUtterance){notice.textContent='Audio is unavailable in this browser. · आवाज उपलब्ध छैन।';return}
  v.speechSynthesis.cancel();
  const utterance=new v.SpeechSynthesisUtterance(txt);
  utterance.lang=nativeDirection(sec)==='ne'?'en-US':'ne-NP';
  v.speechSynthesis.speak(utterance);
 });
 save.addEventListener('click',()=>{
  const txt=resultText();
  if(!txt){notice.textContent='Translate first · पहिले अनुवाद गर्नुहोस्।';return}
  if(saving.has(txt)){saving.delete(txt);save.textContent='☆ Save · सेभ';notice.textContent='Removed from session bookmarks.';}
  else{saving.add(txt);save.textContent='★ Saved';notice.textContent='Saved for this open session only · यो सत्रमा मात्र सेभ भयो।';}
 });
 // Observe native result updates to suppress redundant empty placeholder.
 const observer=new d.defaultView.MutationObserver(()=>{
  const filled=!!output.textContent.trim();
  placeholder.hidden=filled;emptyIcon.hidden=filled;
 });
 observer.observe(output,{subtree:true,childList:true,characterData:true});
 const clearResult=()=>{placeholder.hidden=!!output.textContent.trim();emptyIcon.hidden=!!output.textContent.trim();};
 dir.addEventListener('click',()=>{auto=false;d.defaultView.setTimeout(directionUI,0)});
 input.addEventListener('input',updateCounter);
 clear?.addEventListener('click',()=>{d.defaultView.setTimeout(()=>{updateCounter();clearResult();},0)});
 // When the private camera is open, native controls should remain visible.
 const originalTip=tip;
 if(originalTip){
  const details=put(d,root,'details','ttx-native-tips');
  put(d,details,'summary','','Additional translation tips · थप सुझाव');
  details.appendChild(originalTip);
 }
 const festival=sec.querySelector('#festivalBox');
 if(festival)festival.classList.add('ttx-hidden-native-festival');
 // Put the meaningful sections in the screenshot order.
 root.insertBefore(hero,root.firstChild);
 hero.insertAdjacentElement('afterend',workspace);
 workspace.insertAdjacentElement('afterend',topicSection);
 topicSection.insertAdjacentElement('afterend',exampleSection);
 sec.dataset.sikauStudio='4';
 sec.classList.add('sikau-studio-v4');
 directionUI();updateCounter();clearResult();
};
})();