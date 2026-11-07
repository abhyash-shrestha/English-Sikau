/* Make the first action in each classroom tool explicit. The protected lesson
   continues to own navigation, exercises, recording, and learner state. */
(function(){
 'use strict';
 const styleURL=new URL('./lesson-interface.css?v=20261107-classroom-r1',document.baseURI).href;
 const tools={
  tr:{
   icon:'⇄',title:'Translate',ne:'अनुवाद',
   guide:['Choose the direction, enter text, then press Translate.','दिशा छान्नुहोस्, लेख्नुहोस् र अनुवाद थिच्नुहोस्।'],
   groups:[['.ttx-directions','Translation direction','अनुवादको दिशा']]
  },
  words:{
   icon:'Aa',title:'Learn new words',ne:'नयाँ शब्द सिक्नुहोस्',
   guide:['Search or choose a word to see its meaning. Choose Practice to test yourself.','शब्द खोज्नुहोस् वा छानेर अर्थ हेर्नुहोस्। आफैँ जाँच्न अभ्यास छान्नुहोस्।'],
   groups:[['.wv-list','Choose a word','शब्द छान्नुहोस्']]
  },
  hw:{
   icon:'✎',title:'Writing practice',ne:'लेखन अभ्यास',
   guide:['Read the topic, write your answer, then press Check writing.','विषय पढ्नुहोस्, उत्तर लेख्नुहोस् र लेखाइ जाँच्नुहोस् थिच्नुहोस्।']
  },
  rd:{
   icon:'▤',title:'Read and listen',ne:'पढ्नुहोस् र सुन्नुहोस्',
   guide:['Choose a short practice passage or open a chapter book. Use the audio buttons to listen.','छोटो अभ्यास वा अध्याय भएको किताब छान्नुहोस्। सुन्न अडियो बटन थिच्नुहोस्।'],
   groups:[['#readModeSeg','Choose how to read','पढ्ने तरिका छान्नुहोस्']]
  },
  learn:{
   icon:'▥',title:'Step-by-step lessons',ne:'चरणबद्ध पाठ',
   guide:['Choose a level and open a chapter. Read the examples, then try the exercises.','स्तर र अध्याय छान्नुहोस्। उदाहरण पढेर अभ्यास गर्नुहोस्।']
  },
  game:{
   icon:'⚡',title:'English games',ne:'अंग्रेजी खेल',
   guide:['Choose a game, then press Start. Read each question and pick an answer.','खेल छानेर सुरु गर्नुहोस्। प्रश्न पढ्नुहोस् र उत्तर छान्नुहोस्।'],
   groups:[['.game-modes','Choose a game','खेल छान्नुहोस्']]
  },
  sp:{
   icon:'🎙',title:'Speaking practice',ne:'बोल्ने अभ्यास',
   guide:['Choose a language. Press the microphone to start, speak a short sentence, then press it again to stop.','भाषा छान्नुहोस्। माइक्रोफोन थिचेर छोटो वाक्य बोल्नुहोस् र रोक्न फेरि थिच्नुहोस्।'],
   groups:[['#speakDirSeg','Language you will speak','बोल्ने भाषा छान्नुहोस्']]
  },
  pg:{
   icon:'◈',title:'My progress',ne:'मेरो प्रगति',
   guide:['Review what you have practiced, then choose an activity to continue.','आफ्नो अभ्यास हेर्नुहोस् र जारी राख्न गतिविधि छान्नुहोस्।']
  }
 };
 const micObservers=new WeakSet();
 const create=(doc,tag,cls,text)=>{
  const element=doc.createElement(tag);
  if(cls)element.className=cls;
  if(text)element.textContent=text;
  return element;
 };
 function bilingual(doc,el,en,ne){
  const english=create(doc,'span','sx-en',en);
  const nepali=create(doc,'span','sx-ne',ne);
  nepali.lang='ne';
  el.append(english,nepali);
 }
 function heading(doc,content,tool,key){
  if(content.querySelector(':scope > .sx-heading'))return;
  const header=create(doc,'header','sx-heading');
  header.dataset.tool=key;
  const badge=create(doc,'span','sx-heading-icon',tool.icon);
  badge.setAttribute('aria-hidden','true');
  const copy=create(doc,'div','sx-heading-copy');
  const title=create(doc,'h1','sx-title');
  bilingual(doc,title,tool.title,tool.ne);
  const guide=create(doc,'p','sx-guide');
  bilingual(doc,guide,...tool.guide);
  copy.append(title,guide);
  header.append(badge,copy);
  content.prepend(header);
  content.classList.add('sx-content');
 }
 function caption(doc,group,en,ne){
  if(!group||group.previousElementSibling?.dataset.sxCaption===en)return;
  const label=create(doc,'div','sx-caption');
  label.dataset.sxCaption=en;
  bilingual(doc,label,en,ne);
  group.before(label);
  if(!group.hasAttribute('aria-label')){
   if(!group.hasAttribute('role'))group.setAttribute('role','group');
   group.setAttribute('aria-label',en+' · '+ne);
  }
 }
 function arrangeWords(doc){
  const root=doc.getElementById('sikauWordsDashboard');
  if(!root||root.dataset.sxArranged)return;
  const hero=root.querySelector(':scope > .wv-hero');
  const filters=root.querySelector(':scope > .wv-filter-panel');
  const topics=root.querySelector(':scope > .wv-topic-panel');
  if(!hero||!filters||!topics)return;
  // Search and topic filters precede the list. Today's word is still a real
  // shortcut and sits alongside search on wide screens.
  const start=create(doc,'div','sx-words-start');
  hero.before(start);
  start.append(filters,hero);
  start.after(topics);
  root.dataset.sxArranged='true';
 }
 function arrangeWriting(doc){
  const dashboard=doc.querySelector('#hw .wc-dashboard');
  const editor=dashboard?.querySelector('.wc-editor-panel');
  if(!editor)return;
  // Results appear directly under Check writing, ahead of optional tips.
  for(const feedback of dashboard.querySelectorAll(':scope > .wc-real-feedback, :scope > .wc-native-feedback')){
   editor.append(feedback);
  }
 }
 function arrangeVisa(doc){
  const main=doc.querySelector('#coach .sikau-visa-main');
  if(!main||main.dataset.sxArranged)return;
  const category=main.querySelector('.sikau-visa-categories');
  const learner=main.querySelector('.sikau-visa-learner');
  const browser=main.querySelector('.sikau-visa-browser');
  const notice=main.querySelector('.sikau-visa-reinterview-notice');
  const note=main.querySelector('.sikau-visa-caution');
  if(!category||!learner||!browser||!notice||!note)return;
  // DOM and visual order agree: pick a category, try a question, then browse.
  main.append(category,learner,browser,notice,note);
  caption(doc,category,'Choose a visa category','भिसाको प्रकार छान्नुहोस्');
  main.dataset.sxArranged='true';
 }
 function arrangeGames(doc){
  const game=doc.getElementById('game');
  const games=game?.querySelector('#gameRoot');
  const explorer=game?.querySelector('.ne-journey');
  const heading=game?.querySelector('.sx-heading');
  if(!games||!explorer||!heading||heading.querySelector('.sx-map-jump'))return;
  games.after(explorer);
  const jump=create(doc,'button','sx-map-jump','View Nepal map · नेपालको नक्सा');
  jump.type='button';
  jump.addEventListener('click',()=>{
   const target=explorer.querySelector('h2')||explorer;
   target.tabIndex=-1;
   target.focus({preventScroll:true});
   explorer.scrollIntoView({block:'start'});
  });
  heading.querySelector('.sx-heading-copy').append(jump);
 }
 function annotateMic(doc){
  const help=doc.querySelector('#sp .sikau-speech-help');
  if(help?.nextElementSibling)help.parentElement.append(help);
  const mic=doc.querySelector('#sp button#micBig');
  if(!mic||micObservers.has(mic))return;
  micObservers.add(mic);
  const sync=()=>{
   const iconOnly=!/[\p{L}\p{N}]/u.test(mic.textContent||'');
   mic.toggleAttribute('data-sx-icon-mic',iconOnly);
   if(iconOnly&&!mic.getAttribute('aria-label'))mic.setAttribute('aria-label','Microphone · माइक्रोफोन');
  };
  sync();
  const Observer=doc.defaultView?.MutationObserver;
  if(Observer)new Observer(sync).observe(mic,{childList:true,characterData:true,subtree:true});
 }
 window.enhanceLessonInterface=function(doc){
  if(!doc?.head||!doc.body)return;
  if(!doc.getElementById('sikauLessonInterfaceStyle')){
   const style=create(doc,'link');
   style.id='sikauLessonInterfaceStyle';
   style.rel='stylesheet';style.href=styleURL;
   doc.head.append(style);
  }
  doc.documentElement.classList.add('sikau-lesson-interface');
  for(const [key,tool] of Object.entries(tools)){
   const content=doc.getElementById(key)?.querySelector(':scope > .content');
   if(!content)continue;
   heading(doc,content,tool,key);
   for(const [selector,en,ne] of tool.groups||[])caption(doc,content.querySelector(selector),en,ne);
  }
  arrangeWords(doc);
  arrangeWriting(doc);
  arrangeVisa(doc);
  arrangeGames(doc);
  annotateMic(doc);
 };
})();
