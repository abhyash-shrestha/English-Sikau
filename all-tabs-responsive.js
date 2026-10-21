/* English Sikau unified theme. Presentation-only. Never copies lesson text,
   never fetches private content, never changes Appwrite, scoring, or routes. */
(function(){
'use strict';
const href=new URL('all-tabs-responsive.css',document.baseURI).href;
const pages={
 words:['📚','Words & Dictionary','शब्दहरू · नयाँ शब्द सिकौं','Search words, learn meanings and build vocabulary.'],
 hw:['✍️','Writing Practice','लेखन अभ्यास','Choose a topic, write your answer and learn from feedback.'],
 rd:['📖','Read & Learn','पढौं र सिकौं','Read stories and answer questions to improve your English.'],
 learn:['🌱','Practice Lessons','अध्यायअनुसार अभ्यास','Learn step by step with examples and exercises.'],
 game:['🎮','English Games','खेल्दै अंग्रेजी सिकौं','Play vocabulary and sentence games to practice.'],
 sp:['🎙️','Speak & Improve','बोल्नुहोस् र सुधार गर्नुहोस्','Practice pronunciation, speaking and everyday conversation.'],
 pg:['📊','My Progress','मेरो सिकाइ प्रगति','See your real achievements and learning journey.']
};
function node(d,t,c,txt){const e=d.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;}
window.enhanceUnifiedStudentUI=function(doc){
 if(!doc?.body||!doc.head)return;
 if(!doc.getElementById('sikauUnifiedAllTabsStyle')){
  const link=node(doc,'link');link.rel='stylesheet';link.href=href;link.id='sikauUnifiedAllTabsStyle';doc.head.append(link);
 }
 doc.documentElement.classList.add('sikau-refresh');
 // The private lesson app redraws some panels on navigation. Only insert once
 // per stable native content container, safely repeat when another tab opens.
 for(const [id,details] of Object.entries(pages)){
  const section=doc.getElementById(id);
  const content=section?.querySelector('.content');
  if(!content||content.querySelector(':scope > .sikau-ui-intro'))continue;
  const card=node(doc,'div','sikau-ui-intro');
  card.dataset.icon=details[0];
  card.setAttribute('role','region');
  card.setAttribute('aria-label',details[1]+' · '+details[2]);
  const copy=node(doc,'div','sikau-ui-intro-copy');
  copy.append(node(doc,'span','ui-eyebrow','ENGLISH SIKAU · अंग्रेजी सिकौं'));
  copy.append(node(doc,'h2','',details[1]));
  const ne=node(doc,'p','ui-ne',details[2]);ne.lang='ne';copy.append(ne);
  copy.append(node(doc,'p','ui-detail',details[3]));
  card.append(copy);
  content.insertBefore(card,content.firstChild);
 }
 // Preserve native navigation identity: do not duplicate buttons or intercept clicks.
 const labels={
  coach:['Coach','कोच'],
  tr:['Translate','अनुवाद'],
  words:['Words','शब्दहरू'],
  hw:['Write','लेखन'],
  rd:['Read','पठन'],
  learn:['Practice','अभ्यास'],
  game:['Game','खेल'],
  sp:['Speak','बोल्ने'],
  pg:['Progress','प्रगति']
 };
 const nav=doc.querySelector('#mobileModes.nav')||doc.querySelector('.nav');
 if(nav&&!nav.dataset.sikauUnifiedLabels){
  nav.dataset.sikauUnifiedLabels='1';
  for(const button of nav.querySelectorAll('button[data-t]')){
   const id=button.dataset.t;
   const label=labels[id];
   if(!label||button.classList.contains('sikau-home-nav'))continue;
   const oldIcon=button.querySelector('i');
   if(!oldIcon)continue;
   const icon=oldIcon.textContent||'';
   const word=node(doc,'span','sikau-nav-word');
   const english=node(doc,'strong','',label[0]);
   const nepali=node(doc,'small','',label[1]);
   word.append(english,nepali);
   // Only replace descriptive label, leave original button, dataset and click listener.
   button.replaceChildren(node(doc,'i','',icon),word);
  }
 }
};
})();