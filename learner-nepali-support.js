/* Presentation-only Nepali help for legacy lesson controls. English answers,
 * grading, stored progress and native click handlers are left intact. */
(function(){
'use strict';
const copy=new Map(Object.entries({
 'Translate':'अनुवाद गर्नुहोस्','Speak':'बोल्नुहोस्','Camera':'क्यामेरा','Write':'लेख्नुहोस्',
 'Change topic':'विषय बदल्नुहोस्','Upload':'फोटो अपलोड गर्नुहोस्','Translating…':'अनुवाद हुँदैछ…',
 'Loading voices…':'आवाज लोड हुँदैछ…','Next word':'अर्को शब्द','Surprise me':'नयाँ शब्द छान्नुहोस्',
 'Practice this word →':'यो शब्दको अभ्यास गर्नुहोस्','Search first, or choose a level for practice.':'पहिले खोज्नुहोस् वा अभ्यासको स्तर छान्नुहोस्।',
 'Read lesson, then practice':'पाठ पढेर अभ्यास गर्नुहोस्','Read the lesson, then practice.':'पाठ पढेर अभ्यास गर्नुहोस्।',
 'All chapters':'सबै अध्याय','ENGLISH EXAMPLE':'अंग्रेजी उदाहरण','Common mistake':'सामान्य गल्ती',
 'Better sentence':'सुधारिएको वाक्य','FILL IN THE BLANK':'खाली ठाउँ भर्नुहोस्',
 'Correct! Great work.':'सही उत्तर! राम्रो गर्नुभयो।','Correct answer':'सही उत्तर','Next exercise':'अर्को अभ्यास',
 'Start 6 exercises':'६ वटा अभ्यास सुरु गर्नुहोस्','Start practice':'अभ्यास सुरु गर्नुहोस्',
 'Type answer':'उत्तर टाइप गर्नुहोस्','Photo answer':'फोटोबाट उत्तर दिनुहोस्','Check writing':'लेखाइ जाँच्नुहोस्',
 'Word count':'शब्द संख्या','Goal':'लक्ष्य','Writing Checklist':'लेखन जाँचसूची',
 'Map':'नक्सा','Lightning round':'द्रुत अभ्यास','Choose the correct negative sentence.':'सही नकारात्मक वाक्य छान्नुहोस्।',
 'The clock pauses while you review answers.':'उत्तर हेर्दा समय रोकिन्छ।',
 'Collected':'सङ्कलन भयो','Current':'अहिलेको स्थान','Locked':'अझै खुलेको छैन','Province':'प्रदेश','Headquarters':'सदरमुकाम',
 'Next':'अर्को','Try again':'फेरि प्रयास गर्नुहोस्','Pause':'रोक्नुहोस्','Resume':'जारी राख्नुहोस्',
 'Choose a specific question or start shuffled interview.':'कुनै प्रश्न छान्नुहोस् वा फरक क्रमको अन्तर्वार्ता सुरु गर्नुहोस्।',
 'Listen to question':'प्रश्न सुन्नुहोस्','Practice feedback':'अभ्यासको सुझाव','See answer guide':'उत्तरको सुझाव हेर्नुहोस्',
 'Next question →':'अर्को प्रश्न','Official category information:':'सम्बन्धित आधिकारिक जानकारी:',
 '01 BEHIND THE STORY':'चाडपर्वको कथा','CULTURAL MOMENTS':'सांस्कृतिक झलक','ENGLISH WORDS':'अंग्रेजी शब्दहरू',
 'SAY IT IN ENGLISH':'अंग्रेजीमा भन्नुहोस्','QUICK PRACTICE':'छिटो अभ्यास',
 'Real words. Real situations.':'दैनिक जीवनका शब्द र परिस्थिति।',
 'Better Writing':'राम्रो लेखन','Brighter Opportunities':'उज्यालो सम्भावना',
 'More words in this category will appear here.':'यस विषयका थप शब्दहरू यहाँ देखिनेछन्।'
}));
const clean=s=>String(s||'').replace(/^[\s\p{S}\p{N}✓✔✏️]+/u,'').replace(/\s+/g,' ').trim();
function helpFor(text){
 const t=String(text||'').replace(/\s+/g,' ').trim();
 if(/[\u0900-\u097f]/.test(t))return '';
 const exact=copy.get(t)||copy.get(clean(t));if(exact)return exact;
 let m=t.match(/^Write the English word for:\s*(.*)$/);
 if(m)return 'यसको अंग्रेजी शब्द लेख्नुहोस्';
 if(/^Can you use [“"].+[”"] in your own sentence\?$/.test(t))return 'यो शब्द प्रयोग गरेर आफ्नै वाक्य बनाउन सक्नुहुन्छ?';
 if(/^Word type: .+Try making your own English sentence\.$/.test(t))return 'यो शब्द प्रयोग गरेर आफ्नै अंग्रेजी वाक्य बनाउनुहोस्।';
 if(/^Level [123]$/.test(t))return 'स्तर '+t.slice(-1);
 if(/^Start \d+ exercises$/.test(t))return t.match(/\d+/)[0]+' वटा अभ्यास सुरु गर्नुहोस्';
 if(/^\d+\s*words?$/i.test(t))return 'शब्द संख्या';
 return '';
}
window.enhanceNepaliLearnerSupport=function(doc){
 if(!doc?.body||doc.getElementById('sikauNepaliHelpStyle'))return;
 const style=doc.createElement('style');style.id='sikauNepaliHelpStyle';
 style.textContent=`
 [data-sikau-ne-help]::after{content:attr(data-sikau-ne-help)!important;display:block!important;position:static!important;inset:auto!important;transform:none!important;font:600 .85em/1.5 system-ui,sans-serif!important;letter-spacing:normal!important;margin:3px 0 0!important;white-space:normal!important;color:inherit!important;opacity:.85}
 html[data-sikau-display-language="en"] [data-sikau-ne-help]::after{display:none!important;content:none!important}
 html[data-sikau-display-language="en-roman"] [data-sikau-ne-help]::after{content:attr(data-sikau-roman-help)!important}
 html[data-sikau-display-language="all"] [data-sikau-ne-help]::after{content:attr(data-sikau-ne-help) " · " attr(data-sikau-roman-help)!important}
 .sikau-speech-help{padding:12px 15px;border:1px solid #d5b9c9;border-radius:12px;line-height:1.6;margin:12px 0;overflow-wrap:anywhere}
 .sikau-speech-help button{padding:10px;margin:4px;border-radius:10px;white-space:normal}
 `;
 doc.head.append(style);
 const romanize=text=>doc.defaultView.__sikauLanguageDisplay?.romanize?.(text)||text;
 const optionCopy={'All word types':'सबै शब्द प्रकार',Noun:'नाम',Verb:'क्रिया',Adjective:'विशेषण',Adverb:'क्रियाविशेषण',Phrase:'वाक्यांश',Greeting:'अभिवादन',Suggested:'सुझाइएको क्रम','A to Z':'A देखि Z','Z to A':'Z देखि A','Easy first':'सजिलो पहिले'};
 const syncOptions=()=>{
  const mode=doc.getElementById('langPref')?.value||'en-ne';
  for(const option of doc.querySelectorAll('.wv-select option')){
   const en=option.dataset.sikauOptionEn||option.textContent;
   const ne=optionCopy[en];if(!ne)continue;
   option.dataset.sikauOptionEn=en;
   option.textContent=mode==='en'?en:mode==='en-roman'?en+' · '+romanize(ne):mode==='all'?en+' · '+ne+' · '+romanize(ne):en+' · '+ne;
  }
 };
 const annotate=root=>{
  const nodes=[];
  if(root.nodeType===1)nodes.push(root);
  if(root.querySelectorAll)nodes.push(...root.querySelectorAll('button,p,small,strong,h2,h3,h4,label,span'));
  for(const el of nodes){
   if(el.children.length||el.closest('script,style,textarea,select,[contenteditable],.sikau-lang-token,.sikau-lang-roman'))continue;
   const ne=helpFor(el.textContent);
   if(ne){
    if(el.dataset.sikauNeHelp!==ne)el.dataset.sikauNeHelp=ne;
    const roman=romanize(ne);if(el.dataset.sikauRomanHelp!==roman)el.dataset.sikauRomanHelp=roman;
   }else if(el.dataset.sikauNeHelp){delete el.dataset.sikauNeHelp;delete el.dataset.sikauRomanHelp;}
  }
 };
 // Repair direction controls explicitly; flags on these buttons select an
 // input language, rather than revealing a sentence's translation.
 for(const button of doc.querySelectorAll('#speakDirSeg button,#convoDirSeg button,#spMode button')){
  button.classList.remove('sikau-beginner-action','sikau-translate-action');
  button.removeAttribute('data-sikau-cue');
  const dir=button.dataset.sd||button.dataset.cd;
  const caption=button.closest('#convoDirSeg')?
   (dir==='en2ne'?'🇺🇸 English → Nepali · अंग्रेजी → नेपाली':'🇳🇵 Nepali → English · नेपाली → अंग्रेजी'):
   dir?(dir==='en2ne'?'🇺🇸 English · अंग्रेजी':'🇳🇵 Nepali · नेपाली'):
   ({auto:'🎙️ Translate speech · बोलेको अनुवाद',en2fix:'✏️ Fix English · अंग्रेजी सुधार',convo:'💬 Conversation · कुराकानी'}[button.dataset.m]);
  if(caption){button.textContent=caption;button.setAttribute('aria-label',caption);button.title=caption;}
 }
 const readingLabels={nr:'New reading · नयाँ पाठ',udone:'Take quiz · परीक्षा सुरु गर्नुहोस्'};
 for(const [id,text] of Object.entries(readingLabels)){const el=doc.getElementById(id);if(el)el.textContent=text;}
 const sp=doc.getElementById('sp');
 if(sp){
  const help=doc.createElement('div');help.className='sikau-speech-help';
  const p=doc.createElement('p');p.textContent='Choose a language, then tap the microphone to start and stop. · भाषा छानेर सुरु र बन्द गर्न माइक्रोफोन थिच्नुहोस्।';help.append(p);
  const note=doc.createElement('p');note.textContent='If this device cannot recognize Nepali, type in Translate or practice with Coach. · यस उपकरणले नेपाली नबुझे अनुवादमा टाइप गर्नुहोस् वा कोचमा अभ्यास गर्नुहोस्।';help.append(note);
  for(const [tab,label] of [['tr','Type in Translate · अनुवादमा टाइप गर्नुहोस्'],['coach','Practice with Coach · कोचमा अभ्यास गर्नुहोस्']]){
   const b=doc.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',()=>doc.querySelector('.nav button[data-t="'+tab+'"]')?.click());help.append(b);
  }
  (sp.querySelector(':scope > .content')||sp).prepend(help);
 }
 annotate(doc.body);
 syncOptions();
 const dirty=new Set();let pending=false;
 const observer=new doc.defaultView.MutationObserver(records=>{
  for(const r of records){
   if(r.type==='characterData')dirty.add(r.target.parentElement);
   for(const n of r.addedNodes||[])if(n.nodeType===1)dirty.add(n);else if(n.parentElement)dirty.add(n.parentElement);
  }
  if(pending||!dirty.size)return;pending=true;
  doc.defaultView.requestAnimationFrame(()=>{pending=false;for(const root of dirty)if(root?.isConnected)annotate(root);dirty.clear();});
 });
 observer.observe(doc.body,{childList:true,subtree:true,characterData:true});
 // Refine Roman captions after the native display-language bridge loads.
 doc.getElementById('langPref')?.addEventListener('change',()=>{annotate(doc.body);syncOptions();});
};
})();
