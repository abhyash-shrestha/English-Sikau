/* English Sikau Translate dashboard: authenticated visual layer over existing #tr.
   Existing translation, camera OCR, access, XP and direction handlers are retained. */
(function(){
'use strict';
const CSS_URL=new URL('translate-dashboard.css',document.baseURI).href;
function make(d,t,c,txt){const e=d.createElement(t);if(c)e.className=c;if(txt!==undefined)e.textContent=txt;return e;}
function add(d,p,t,c,txt){const e=make(d,t,c,txt);p.append(e);return e;}
function nativeDirection(section){return section.querySelector('#dirSel button.on')?.dataset.d||'ne';}
function directionSelect(section,toNepali){
 const v=toNepali?'en':'ne';
 const b=section.querySelector('#dirSel button[data-d="'+v+'"]');
 b?.click();
}
function fillInput(section,phrase){
 const input=section.querySelector('#inp');if(!input)return;
 const v=section.ownerDocument.defaultView;
 const setter=Object.getOwnPropertyDescriptor(v.HTMLTextAreaElement.prototype,'value')?.set;
 if(setter)setter.call(input,phrase);else input.value=phrase;
 input.dispatchEvent(new v.Event('input',{bubbles:true}));
 input.focus({preventScroll:true});
}
function mode(section,modeName){
 const b=section.querySelector('#trModeSel [data-tm="'+modeName+'"]');if(b)b.click();
}
function addTheme(d){
 if(d.getElementById('sikauTranslateTheme'))return;
 const l=make(d,'link');l.rel='stylesheet';l.href=CSS_URL;l.id='sikauTranslateTheme';d.head.append(l);
}
const examples=[
 ['👋','Hello','नमस्ते','tt-blush'],
 ['💬','How are you?','तपाईंलाई कस्तो छ?','tt-blue'],
 ['❤️','I love Nepal.','म नेपाललाई माया गर्छु।','tt-mint'],
 ['📍','Where is Pokhara?','पोखरा कहाँ छ?','tt-lavender'],
 ['🙏','Thank you.','धन्यवाद।','tt-cream'],
 ['☀️','Good morning.','शुभ प्रभात।','tt-sky'],
 ['🍲','I like momo.','मलाई मःम मन पर्छ।','tt-blush'],
 ['🎓','I am learning English.','म अंग्रेजी सिक्दै छु।','tt-mint'],
 ['✈️','I want to travel to Nepal.','म नेपाल यात्रा गर्न चाहन्छु।','tt-blue'],
 ['👨‍👩‍👧','This is my family.','यो मेरो परिवार हो।','tt-cream']
];
const topics=[
 ['👥','Daily Conversation','दैनिक कुराकानी','How are you?','तपाईंलाई कस्तो छ?','tt-blue'],
 ['🍴','Food & Cooking','खाना','I would like to eat momo.','म मःम खान चाहन्छु।','tt-blush'],
 ['✈️','Travel','यात्रा','Where is the bus station?','बसपार्क कहाँ छ?','tt-mint'],
 ['🎓','School & Study','पढाइ','I am studying English.','म अंग्रेजी पढ्दै छु।','tt-lavender'],
 ['🏠','Family & Friends','परिवार र साथीहरू','This is my best friend.','यो मेरो मिल्ने साथी हो।','tt-cream'],
 ['🛍️','Shopping','किनमेल','How much does this cost?','यसको मूल्य कति हो?','tt-blush'],
 ['🩺','Health','स्वास्थ्य','I need to see a doctor.','मलाई डाक्टरलाई भेट्नुपर्छ।','tt-sky']
];
window.enhanceTranslationDashboard=function(d){
 if(!d?.body||!d?.head)return;
 const section=d.getElementById('tr');
 if(!section||section.classList.contains('sikau-translated'))return;
 const content=section.querySelector('.content');
 const input=section.querySelector('#inp'),out=section.querySelector('#out'),direction=section.querySelector('#dirSel'),nativeModes=section.querySelector('#trModeSel');
 const button=section.querySelector('#bt'),nativeCard=direction?.closest('.card'),camera=section.querySelector('#trCamMode');
 if(!content||!input||!out||!direction||!nativeModes||!button||!nativeCard||!camera)return;
 addTheme(d);
 const hero=make(d,'section','tt-hero');
 const copy=add(d,hero,'div','tt-hero-copy');
 add(d,copy,'span','tt-pill','🌺 Translate · अनुवाद');
 const heading=add(d,copy,'h2');
 heading.append(d.createTextNode('Translate between '));
 add(d,heading,'em','','English');
 heading.append(d.createTextNode(' and Nepali'));
 add(d,copy,'p','','Type, speak, use camera, or try a quick example.');
 add(d,copy,'p','','टाइप गर्नुहोस्, बोल्नुहोस्, फोटो खिच्नुहोस् वा उदाहरण प्रयोग गर्नुहोस्।');
 add(d,hero,'div','tt-hero-scene').setAttribute('aria-hidden','true');
 const glyphs=add(d,hero,'div','tt-glyphs');
 glyphs.setAttribute('aria-hidden','true');
 add(d,glyphs,'span','tt-glyph a','A');add(d,glyphs,'span','tt-glyph ne','अ');
 const panel=make(d,'section','tt-panel');
 const workspace=add(d,panel,'div','tt-work');
 const left=add(d,workspace,'div','tt-work-left');
 const right=add(d,workspace,'div','tt-work-right');
 const controls=add(d,left,'div','tt-row');
 const lang=add(d,controls,'button','tt-lang');lang.type='button';
 const modes=add(d,controls,'div','tt-modes');
 const actions=[
  ['type','⌨️ Type'],['speak','🎤 Speak'],['cam','📷 Camera']
 ].map(([type,label])=>{
  const b=add(d,modes,'button','',label);b.type='button';
  b.addEventListener('click',()=>{
    if(type==='speak'){listen();return;}
    mode(section,type);
    updateMode(type);
    if(type==='type')input.focus();
  });
  return {type,button:b};
 });
 const source=add(d,left,'div','tt-source');
 // Move the original protected translator as a unit. Its handlers stay attached.
 nativeCard.classList.add('tt-native-translator');
 source.append(nativeCard);
 const count=add(d,source,'div','tt-count','0 / 500');
 const toolRow=add(d,left,'div','tt-tools');
 const originalRow=section.querySelector('#trTypeMode>.row');
 if(originalRow){originalRow.style.setProperty('display','flex','important');toolRow.append(originalRow);}
 const feedback=add(d,left,'div','tt-feedback');
 const camArea=add(d,left,'div','tt-camera');
 camArea.hidden=true;
 camArea.append(camera);
 const middle=add(d,workspace,'div','tt-middle');
 const swap=add(d,middle,'button','tt-swap','⇄');swap.type='button';
 const rightControls=add(d,right,'div','tt-row');
 const to=add(d,rightControls,'button','tt-lang');to.type='button';
 const copyButton=add(d,rightControls,'button','tt-lang','⧉ Copy');copyButton.type='button';
 const outputCard=add(d,right,'div','tt-output');outputCard.append(out);
 // Keep result rendering on original node, retaining the native result handlers.
 const examplesSection=make(d,'section','tt-section');
 const examplesHeading=add(d,examplesSection,'div','tt-section-top');
 const eh=add(d,examplesHeading,'h3','','⚡ Quick Examples');add(d,eh,'small','','छिटो उदाहरणहरू');
 const more=add(d,examplesHeading,'button','','See more →');more.type='button';
 const choices=add(d,examplesSection,'div','tt-examples');
 const topicsSection=make(d,'section','tt-section');
 const topicsHeading=add(d,topicsSection,'div','tt-section-top');
 const th=add(d,topicsHeading,'h3','','▦ Common Topics');add(d,th,'small','','लोकप्रिय विषयहरू');
 const all=add(d,topicsHeading,'button','','See all topics →');all.type='button';
 const topicGrid=add(d,topicsSection,'div','tt-topics');
 const formerTip=section.querySelector('#tipCard');
 const details=make(d,'details','tt-native-tip');
 if(formerTip){add(d,details,'summary','','More translation tips · थप सुझाव');details.append(formerTip);}
 function syncDirection(){
  const toNepali=nativeDirection(section)==='en';
  lang.textContent=(toNepali?'🇬🇧 English':'🇳🇵 Nepali')+' ▾';
  to.textContent=(toNepali?'🇳🇵 Nepali':'🇬🇧 English')+' ▾';
 }
 function updateMode(m){
  actions.forEach(x=>x.button.classList.toggle('on',x.type===m));
  camArea.hidden=m!=='cam';
  source.hidden=m==='cam';
  toolRow.hidden=m==='cam';
 }
 function selectExample(en,ne){
  const toNepali=nativeDirection(section)==='en';
  mode(section,'type');updateMode('type');
  fillInput(section,toNepali?en:ne);
  feedback.textContent='Example ready. Press Translate for the result. · अनुवाद थिच्नुहोस्।';
 }
 function renderExamples(extended){
  choices.replaceChildren();
  (extended?examples:examples.slice(0,6)).forEach(x=>{
   const b=add(d,choices,'button','tt-example '+x[3]);
   b.type='button';
   add(d,b,'span','',x[0]);const info=add(d,b,'div','',x[1]);add(d,info,'small','',x[2]);
   b.addEventListener('click',()=>selectExample(x[1],x[2]));
  });
  more.textContent=extended?'See less ↑':'See more →';
 }
 let moreShown=false;
 more.addEventListener('click',()=>{moreShown=!moreShown;renderExamples(moreShown);});
 renderExamples(false);
 function renderTopics(extended){
  topicGrid.replaceChildren();
  (extended?topics:topics.slice(0,7)).forEach(x=>{
   const b=add(d,topicGrid,'button','tt-topic '+x[5]);b.type='button';
   add(d,b,'span','tt-symbol',x[0]);add(d,b,'strong','',x[1]);add(d,b,'small','',x[2]);
   b.addEventListener('click',()=>selectExample(x[3],x[4]));
  });
  all.textContent=extended?'Show fewer ↑':'See all topics →';
 }
 let showTopics=false;
 all.addEventListener('click',()=>{showTopics=!showTopics;renderTopics(showTopics);});
 renderTopics(false);
 lang.addEventListener('click',()=>{directionSelect(section,nativeDirection(section)!=='en');syncDirection();});
 to.addEventListener('click',()=>{directionSelect(section,nativeDirection(section)!=='en');syncDirection();});
 swap.addEventListener('click',()=>{directionSelect(section,nativeDirection(section)!=='en');syncDirection();});
 direction.addEventListener('click',()=>{d.defaultView.setTimeout(syncDirection,0);});
 copyButton.addEventListener('click',async()=>{
  const content=(out.innerText||out.textContent||'').trim();
  if(!content){feedback.textContent='Translate first · पहिले अनुवाद गर्नुहोस्।';return;}
  try{await d.defaultView.navigator.clipboard.writeText(content);feedback.textContent='Copied · कपी भयो';}
  catch(_){feedback.textContent='Select the result and copy manually · नतिजा छानेर कपी गर्नुहोस्।';}
 });
 input.addEventListener('input',()=>{count.textContent=String(input.value.length)+' / 500';});
 let recognizer=null;
 function listen(){
  const Recognition=d.defaultView.SpeechRecognition||d.defaultView.webkitSpeechRecognition;
  if(!Recognition){feedback.textContent='Speech recognition is not available in this browser. Use Type or Camera. · यो ब्राउजरमा माइक्रोफोन उपलब्ध छैन।';return;}
  if(recognizer){try{recognizer.stop();}catch(_){}return;}
  try{
   recognizer=new Recognition();
   recognizer.lang=nativeDirection(section)==='en'?'en-US':'ne-NP';
   recognizer.interimResults=false;
   recognizer.onresult=e=>{
    const transcript=e.results?.[0]?.[0]?.transcript;
    if(transcript){mode(section,'type');updateMode('type');fillInput(section,transcript);feedback.textContent='Speech captured. Press Translate. · अनुवाद थिच्नुहोस्।';}
   };
   recognizer.onerror=()=>{feedback.textContent='Microphone unavailable or permission denied · माइक्रोफोन प्रयोग गर्न सकिएन।';};
   recognizer.onend=()=>{recognizer=null;};
   recognizer.start();feedback.textContent='Listening… · सुन्दैछ…';
  }catch(_){recognizer=null;feedback.textContent='Unable to start microphone · माइक्रोफोन सुरु भएन।';}
 }
 // Native mode listeners may redraw their own content. Keep presentation synchronized.
 nativeModes.addEventListener('click',e=>{
  const b=e.target.closest('[data-tm]');
  if(b){const m=b.dataset.tm;d.defaultView.setTimeout(()=>updateMode(m),0);}
 });
 content.insertBefore(hero,content.firstChild);
 hero.insertAdjacentElement('afterend',panel);
 panel.insertAdjacentElement('afterend',examplesSection);
 examplesSection.insertAdjacentElement('afterend',topicsSection);
 if(formerTip)topicsSection.insertAdjacentElement('afterend',details);
 section.classList.add('sikau-translated');
 syncDirection();
 updateMode(section.querySelector('#trModeSel button.on')?.dataset.tm||'type');
 count.textContent=String(input.value.length)+' / 500';
};
})();