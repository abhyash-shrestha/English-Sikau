/* English Sikau · Learning-first Progress dashboard.
 * Shows genuine learning activity, never XP, points, streaks or badges.
 * Native progress state stays intact for lessons, completion and settings.
 */
(function(){
'use strict';
const cssURL=new URL('progress-dashboard.css?v=20261030-learner-audit-r2',document.baseURI).href;
const element=(doc,tag,className,text)=>{
 const node=doc.createElement(tag);
 if(className)node.className=className;
 if(text!==undefined)node.textContent=String(text);
 return node;
};
const add=(doc,parent,tag,className,text)=>{
 const node=element(doc,tag,className,text);
 parent.append(node);
 return node;
};
const safeCount=value=>Number.isFinite(Number(value))?Math.max(0,Math.floor(Number(value))):0;
const pendingProgress=new WeakSet();
// Some lesson builds keep S inside a closure. Read their rendered statistics
// instead of hiding the only available progress view.
function readProgress(native,state){
 if(state){
  const words=state.words&&typeof state.words==='object'?Object.keys(state.words).length:0;
  const scores=state.course?.best||{};
  const passed=Object.values(scores).filter(n=>safeCount(n)>=70).length;
  const reading=safeCount(state.rd);
  return {words,passed,reading,writing:safeCount(state.hwT),speaking:safeCount(state.sp),
   translated:safeCount(state.tr),days:state.days&&typeof state.days==='object'?Object.keys(state.days):null};
 }
 const text=String(native.textContent||'').replace(/[०-९]/g,c=>'०१२३४५६७८९'.indexOf(c));
 const number=icon=>{const m=text.match(new RegExp(icon+'\\s*(\\d+)'));return m?Number(m[1]):null;};
 const data={words:number('📚'),passed:number('📗'),reading:number('📖'),writing:number('✍'),
  speaking:number('🎤'),translated:number('🔤'),days:null,dayCount:number('📅')};
 // Variation selectors can occur between the pen icon and its number.
 data.writing=number('✍[\\uFE0E\\uFE0F]?');
 return Object.values(data).some(v=>typeof v==='number')?data:null;
}
window.enhanceProgressDashboard=function(doc){
 const section=doc?.getElementById('pg');
 const content=section?.querySelector(':scope > .content');
 const native=section?.querySelector('#pgo');
 if(!section||!content||!native||!doc.defaultView)return;
 if(!doc.getElementById('sikauProgressCSS')){
  const link=element(doc,'link');
  link.rel='stylesheet';
  link.id='sikauProgressCSS';
  link.href=cssURL;
  doc.head.append(link);
 }
 if(section.dataset.sikauProgress==='learning-first')return;
 if(!readProgress(native,doc.defaultView.S?.d)){
  if(!pendingProgress.has(native)){
   pendingProgress.add(native);
   const wait=new doc.defaultView.MutationObserver(()=>{
    if(!readProgress(native,doc.defaultView.S?.d))return;
    wait.disconnect();pendingProgress.delete(native);window.enhanceProgressDashboard(doc);
   });
   wait.observe(native,{childList:true,subtree:true,characterData:true});
  }
  return;
 }
 section.dataset.sikauProgress='learning-first';
 const root=add(doc,content,'div','pv-root');
 const hero=add(doc,root,'section','pv-hero');
 const lead=add(doc,hero,'div','pv-hero-copy');
 add(doc,lead,'span','pv-overline','ENGLISH SIKAU · अंग्रेजी सिकौं');
 add(doc,lead,'h1','','My Learning');
 add(doc,lead,'h2','','मेरो सिकाइ');
 add(doc,lead,'p','','See what you have practiced and choose what to learn next.');
 add(doc,lead,'p','','आफूले अभ्यास गरेको कुरा हेर्नुहोस् र अर्को विषय छान्नुहोस्।');
 const stats=add(doc,root,'div','pv-stats');
 const sections=add(doc,root,'div','pv-columns');
 const activities=add(doc,root,'div','pv-bottom');
 // Only hide the legacy points view. Keep its state and listeners for
 // course logic; no student data is changed or cleared.
 const makeCard=(label,ne,icon,value,help,kind)=>{
  const card=add(doc,stats,'div','pv-card pv-'+kind);
  const heading=add(doc,card,'div','pv-card-title');
  add(doc,heading,'span','pv-icon',icon);
  const text=add(doc,heading,'div');
  add(doc,text,'strong','',label);
  add(doc,text,'small','',ne);
  add(doc,card,'div','pv-card-value',value);
  add(doc,card,'p','pv-secondary',help);
  return card;
 };
 const makeSection=(parent,label,ne,icon)=>{
  const card=add(doc,parent,'section','pv-section');
  const heading=add(doc,card,'div','pv-section-header');
  add(doc,heading,'span','pv-icon',icon);
  const text=add(doc,heading,'div');
  add(doc,text,'strong','',label);
  add(doc,text,'small','',ne);
  return card;
 };
 const activityRow=(parent,icon,label,value)=>{
  const row=add(doc,parent,'div','pv-activity-line');
  add(doc,row,'span','',icon);
  add(doc,row,'strong','',label);
  add(doc,row,'b','',String(value));
 };
 const render=()=>{
  const data=readProgress(native,doc.defaultView.S?.d);
  if(!data)return;
  const {words,passed,reading,writing,speaking,translated,days}=data;
  const shown=n=>n===null?'—':n;
  stats.replaceChildren();
  sections.replaceChildren();
  activities.replaceChildren();
  const chapter=makeCard('Chapters Completed','पूरा गरेका अध्याय','📖',
    shown(passed)+' / 80','Passed chapter quizzes · उत्तीर्ण गरेका अध्याय','chapters');
  const bar=add(doc,chapter,'div','pv-track');
  add(doc,bar,'i').style.width=Math.min(100,passed/80*100)+'%';
  makeCard('Words Saved','सेभ गरेका शब्दहरू','📚',shown(words),
    'Your saved vocabulary · सेभ गरिएको शब्दभण्डार','words');
  makeCard('Reading Practice','पढाइ अभ्यास','📗',shown(reading),
    'Completed reading activities · पूरा गरेका पढाइ अभ्यास','reading');
  makeCard('Writing Practice','लेखाइ अभ्यास','✍️',shown(writing),
    'Writing checks completed · जाँचिएका लेखहरू','writing');

  const weekly=makeSection(sections,days?'Practice This Week':'Practice Days',days?'यस हप्ताको अभ्यास':'अभ्यास गरेका दिन','🗓️');
  if(days){
  add(doc,weekly,'p','pv-secondary','Days with recorded practice · अभ्यास भएका दिन');
  const chart=add(doc,weekly,'div','pv-bars');
  chart.setAttribute('aria-label','Days with recorded activity in the last seven days');
  const today=new Date();
  for(let i=6;i>=0;i--){
   const date=new Date(today.getFullYear(),today.getMonth(),today.getDate()-i);
   const key=date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+
    '-'+String(date.getDate()).padStart(2,'0');
   const utc=date.toISOString().slice(0,10);
   const practiced=days.includes(key)||days.includes(utc);
   const col=add(doc,chart,'div','pv-day');
   const dayBar=add(doc,col,'div','pv-bar');
   dayBar.style.height=practiced?'78%':'7%';
   dayBar.classList.toggle('active',practiced);
   add(doc,col,'small','',date.toLocaleDateString('en-US',{weekday:'short'}));
  }
  }else{
   add(doc,weekly,'div','pv-large-value',shown(data.dayCount));
   add(doc,weekly,'p','pv-secondary','Days with saved practice · अभ्यास गरेका दिनहरूको संख्या');
  }
  const summary=makeSection(sections,'Your Learning Activity','तपाईंको अभ्यास','📋');
  for(const [icon,label,value] of [
   ['🔤','Translations · अनुवाद',translated],['📚','Saved words · सेभ गरेका शब्द',words],
   ['📖','Reading · पढाइ',reading],['✍️','Writing · लेखाइ',writing],['🎤','Speaking · बोलाइ',speaking]
  ])activityRow(summary,icon,label,shown(value));

  const courses=makeSection(activities,'Keep Learning','सिकाइ जारी राख्नुहोस्','🌱');
  add(doc,courses,'p','pv-secondary',
   'Try another lesson, read a story, practice speaking, or review the words you saved.');
  add(doc,courses,'p','pv-secondary',
   'अर्को पाठ पढ्नुहोस्, कथा पढ्नुहोस् वा सिकेका शब्द फेरि अभ्यास गर्नुहोस्।');
  const actions=add(doc,courses,'div','pv-actions');
  for(const [tab,label] of [['learn','Continue lessons · पाठ जारी राख्नुहोस्'],['rd','Read a story · कथा पढ्नुहोस्'],['words','Review words · शब्द दोहोर्‍याउनुहोस्']]){
   const button=add(doc,actions,'button','',label);button.type='button';
   button.addEventListener('click',()=>doc.querySelector('.nav button[data-t="'+tab+'"]')?.click());
  }
 };
 render();
 // Only replace a usable native view after the new dashboard is populated.
 section.classList.add('sikau-progress-v1','sikau-learning-first');
 native.hidden=true;
 native.style?.setProperty?.('display','none','important');
 // The original engine remains the source of truth. Do not modify scores,
 // answer validation, saved chapter data or Game district-unlock state.
 let scheduled=false;
 const observe=new doc.defaultView.MutationObserver(()=>{
  if(scheduled)return;
  scheduled=true;
  (doc.defaultView.requestAnimationFrame||doc.defaultView.setTimeout)(()=>{
   scheduled=false;
   render();
  });
 });
 observe.observe(native,{childList:true,subtree:true,characterData:true});
};
})();

