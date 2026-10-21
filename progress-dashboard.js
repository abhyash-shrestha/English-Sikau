/* Progress Dashboard: presentation only, backed by existing learner state.
No synthetic XP, weekly minutes, percentages, or recent events. */
(function(){
'use strict';
const cssURL=new URL('progress-dashboard.css?v=20261021-dark-contrast-r1',document.baseURI).href;
const el=(d,t,c,v)=>{const n=d.createElement(t);if(c)n.className=c;if(v!==undefined)n.textContent=String(v);return n};
const add=(d,p,t,c,v)=>{const n=el(d,t,c,v);p.append(n);return n};
const safe=(x)=>Number.isFinite(+x)?Math.max(0,+x):0;
window.enhanceProgressDashboard=function(doc){
 const section=doc?.getElementById('pg'),content=section?.querySelector(':scope > .content'),native=section?.querySelector('#pgo');
 if(!content||!native)return;
 if(!doc.getElementById('sikauProgressCSS')){const link=el(doc,'link');link.rel='stylesheet';link.id='sikauProgressCSS';link.href=cssURL;doc.head.append(link);}
 section.classList.add('sikau-progress-v1');
 if(section.dataset.sikauProgress==='1')return;
 section.dataset.sikauProgress='1';
 const state=doc.defaultView.S?.d;
 if(!state)return;
 const container=el(doc,'div','pv-root');
 const hero=add(doc,container,'section','pv-hero');
 const lead=add(doc,hero,'div','pv-hero-copy');
 add(doc,lead,'span','pv-overline','ENGLISH SIKAU · अंग्रेजी सिकौं');
 add(doc,lead,'h1','','My Progress');
 add(doc,lead,'h2','','मेरो प्रगति');
 add(doc,lead,'p','','See your learning journey, achievements and keep going!');
 add(doc,lead,'p','','तपाईंको सिकाइको यात्रा, उपलब्धिहरू हेर्नुहोस् र निरन्तर अघि बढ्नुहोस्!');
 const stats=add(doc,container,'div','pv-stats');
 const body=add(doc,container,'div','pv-columns');
 const down=add(doc,container,'div','pv-bottom');
 const details=add(doc,container,'details','pv-original');
 add(doc,details,'summary','','Original progress details & settings · मूल प्रगति र सेटिङ');
 details.append(native);
 content.insertBefore(container,content.firstChild);
 function card(parent,label,ne,icon,value,secondary,kind){
  const c=add(doc,parent,'div','pv-card pv-'+kind);
  const heading=add(doc,c,'div','pv-card-title');
  add(doc,heading,'span','pv-icon',icon);
  const h=add(doc,heading,'div','');
  add(doc,h,'strong','',label);add(doc,h,'small','',ne);
  add(doc,c,'div','pv-card-value',value);
  if(secondary)add(doc,c,'p','pv-secondary',secondary);
  return c;
 }
 function sectionCard(parent,label,ne,icon){
  const node=add(doc,parent,'section','pv-section');
  const h=add(doc,node,'div','pv-section-header');
  add(doc,h,'span','pv-icon',icon);
  const col=add(doc,h,'div');
  add(doc,col,'strong','',label);add(doc,col,'small','',ne);
  return node;
 }
 function line(parent,icon,label,value,max){
  const r=add(doc,parent,'div','pv-line');
  add(doc,r,'span','pv-icon',icon);
  add(doc,r,'strong','',label);
  const bar=add(doc,r,'div','pv-track');
  const fill=add(doc,bar,'i');fill.style.width=Math.min(100,max?value/max*100:0)+'%';
  add(doc,r,'small','',String(value));
 }
 function render(){
  const s=doc.defaultView.S?.d||state;
  const days=s.days&&typeof s.days==='object'?Object.keys(s.days).sort():[];
  const saved=s.words&&typeof s.words==='object'?Object.keys(s.words).length:0;
  const best=s.course?.best||{};
  const courses=Object.values(best).filter(v=>safe(v)>=70).length;
  const level=Math.max(1,Math.min(10,safe(s.L)||1));
  const streak=safe(s.streak),xp=safe(s.xp);
  const mastery=safe(s.mastery);
  const wordTotal=saved,read=safe(s.rd),speak=safe(s.sp),write=safe(s.hwT),translated=safe(s.tr);
  stats.replaceChildren();body.replaceChildren();down.replaceChildren();
  card(stats,'Total XP','कुल अनुभव अंक','🏆',xp.toLocaleString()+' XP','Existing learning XP · वास्तविक XP','xp');
  card(stats,'Day Streak','लगातार दिन','🔥',streak+' days','Current recorded streak · हालको क्रम','streak');
  const ch=card(stats,'Chapters Completed','पूरा गरिएका अध्याय','📖',courses+' / 80','Based on saved chapter results ≥70%','chapters');
  const track=add(doc,ch,'div','pv-track');add(doc,track,'i').style.width=Math.min(100,courses/80*100)+'%';
  card(stats,'Current Level','हालको स्तर','👑','Level '+level,'Selected learning level · रोजिएको स्तर','level');
  const progress=sectionCard(body,'Level Progress','स्तर प्रगति','📊');
  add(doc,progress,'p','pv-label','Mastery points · निपुणता अंक');
  add(doc,progress,'div','pv-large-value',String(mastery));
  add(doc,progress,'p','pv-secondary','Your actual mastery total. No invented percentage or next-level target.');
  const activities=sectionCard(body,'Weekly Activity','साप्ताहिक गतिविधि','🗓️');
  add(doc,activities,'p','pv-secondary','Recorded active days (not study minutes) · सिकाइ भएका दिन');
  const chart=add(doc,activities,'div','pv-bars');chart.setAttribute('aria-label','Activity for the last seven calendar days');
  const today=new Date();for(let i=6;i>=0;i--){
   const date=new Date(today.getFullYear(),today.getMonth(),today.getDate()-i);
   const key=date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
   // Original app uses UTC date keys in some builds; support both formats.
   const utc=date.toISOString().slice(0,10);
   const has=days.includes(key)||days.includes(utc);
   const col=add(doc,chart,'div','pv-day');
   const bar=add(doc,col,'div','pv-bar');bar.style.height=has?'78%':'7%';bar.classList.toggle('active',has);
   add(doc,col,'small','',date.toLocaleDateString('en-US',{weekday:'short'}));
  }
  const goals=sectionCard(down,'Learning Milestones','सिकाइ उपलब्धि','🎯');
  add(doc,goals,'p','pv-secondary','Activity totals — not assigned goals or proficiency scores.');
  [['📚','Words saved',wordTotal,20],['✍️','Writing checks',write,5],['🎙️','Speaking activities',speak,5],['📖','Reading activities',read,5]].forEach(a=>line(goals,a[0],a[1],a[2],a[3]));
  const skills=sectionCard(down,'Learning Activity','सिकाइ गतिविधि','📈');
  [['🔤','Translations',translated],['📚','Saved words',wordTotal],['🎙️','Speaking',speak],['📖','Reading',read],['✍️','Writing',write]].forEach(a=>{
   const row=add(doc,skills,'div','pv-activity-line');
   add(doc,row,'span','',a[0]);add(doc,row,'strong','',a[1]);add(doc,row,'b','',String(a[2]));
  });
  const ach=sectionCard(down,'Achievements','उपलब्धिहरू','🏆');
  const chips=add(doc,ach,'div','pv-achievements');
  [['🔥','Learning streak',streak>0],['⭐','First XP',xp>0],['📖','Chapter learner',courses>0],['📚','Word explorer',wordTotal>0]].forEach(a=>{
   const chip=add(doc,chips,'div','pv-award'+(a[2]?' earned':''));
   add(doc,chip,'span','',a[0]);add(doc,chip,'small','',a[1]);
   add(doc,chip,'b','',a[2]?'Achieved':'Not yet');
  });
  add(doc,ach,'p','pv-secondary','Milestones calculated from stored activity; not separate official badges.');
 }
 render();
 // The native progress view can re-render on visits. Refresh visual cards without
 // mutating saved values, changing levels, or calling any XP/quiz method.
 let pending=false;
 const observer=new doc.defaultView.MutationObserver(()=>{
  if(pending)return;pending=true;
  (doc.defaultView.requestAnimationFrame||doc.defaultView.setTimeout)(()=>{pending=false;render();});
 });
 observer.observe(native,{childList:true});
};
})();