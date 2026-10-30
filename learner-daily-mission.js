/* English Sikau: guided daily learning using existing authorized tabs.
 * This is self-reported, local-to-device practice; it never edits quiz scores,
 * paid entitlement, accounts, or Appwrite progress.
 */
(function(){
'use strict';
const TASKS=[
 {tab:'words',icon:'📚',en:'Practice useful words',ne:'उपयोगी शब्दहरू अभ्यास गर्नुहोस्',roman:'Upayogi shabdaharu abhyas garnuhos',duration:'3 min'},
 {tab:'rd',icon:'🎧',en:'Read and listen',ne:'पढ्नुहोस् र सुन्नुहोस्',roman:'Padhnuhos ra sunnuhos',duration:'4 min'},
 {tab:'coach',icon:'💬',en:'Try a conversation',ne:'कुराकानीको अभ्यास गर्नुहोस्',roman:'Kurakaniko abhyas garnuhos',duration:'5 min'}
];
const FOCUS=[
 {en:'Build confidence in everyday English',ne:'दैनिक अंग्रेजीमा आत्मविश्वास बढाउनुहोस्',roman:'Dainik angrejima atmabishwas badhaunuhos'},
 {en:'Practice clear English sentences',ne:'प्रस्ट अंग्रेजी वाक्य अभ्यास गर्नुहोस्',roman:'Prasta angreji wakya abhyas garnuhos'},
 {en:'Learn, listen, and speak English',ne:'अंग्रेजी सिक्नुहोस्, सुन्नुहोस् र बोल्नुहोस्',roman:'Angreji siknuhos, sunnuhos ra bolnuhos'}
];
function today(now=new Date()){
 return new Intl.DateTimeFormat('en-CA',{year:'numeric',month:'2-digit',day:'2-digit',
  timeZone:'Asia/Kathmandu'}).format(now);
}
const safeId=value=>String(value||'').replace(/[^a-zA-Z0-9_-]/g,'').slice(0,80);
const node=(d,tag,cls,text)=>{
 const n=d.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;
};
const add=(d,parent,tag,cls,text)=>{
 const n=node(d,tag,cls,text);parent.appendChild(n);return n;
};
const localized=(d,parent,ne,roman)=>{
 add(d,parent,'span','sikau-mission-ne',ne).lang='ne';
 add(d,parent,'span','sikau-mission-roman',roman).lang='ne-Latn';
};
const load=(v,key)=>{
 try{
  const old=JSON.parse(v.localStorage.getItem(key));
  if(Array.isArray(old)&&old.length===3)return old.map(Boolean);
 }catch(_){}
 return [false,false,false];
};
const save=(v,key,values)=>{try{v.localStorage.setItem(key,JSON.stringify(values));}catch(_){}};
const switchTo=(d,tab)=>{
 const nav=d.querySelector('#mobileModes.nav')||d.querySelector('.nav');
 const b=Array.from(nav?.querySelectorAll('button[data-t]')||[]).find(x=>
  String(x.dataset?.t||'').toLowerCase()===tab);
 if(!b)return false;
 b.click();return true;
};
function install(doc,account){
 const home=doc?.getElementById('sikauHomeScreen'),uid=safeId(account);
 if(!home||!doc.head||!doc.defaultView||!uid)return false;
 const date=today();
 const old=home.querySelector('#sikauDailyMission');
 if(old?.dataset.date===date&&old.dataset.account===uid)return true;
 old?.remove();
 if(!doc.getElementById('sikauDailyMissionStyle')){
  const style=node(doc,'link');style.id='sikauDailyMissionStyle';
  style.rel='stylesheet';
  style.href=new URL('learner-daily-mission.css?v=20261030-r1',document.baseURI).href;
  doc.head.appendChild(style);
 }
 const view=doc.defaultView,key='sikau-daily-mission-v1:'+uid+':'+date,checks=load(view,key);
 const root=node(doc,'section','sikau-daily-mission');
 root.id='sikauDailyMission';root.dataset.date=date;root.dataset.account=uid;
 root.setAttribute('aria-label',"Today's English mission");
 const head=add(doc,root,'div','mission-head');
 const title=add(doc,head,'div');
 add(doc,title,'h2','',"Today's English Mission");
 localized(doc,title,'आजको अंग्रेजी अभ्यास','Aajako angreji abhyas');
 add(doc,head,'span','mission-date',date+' · ~12 min');
 const focus=FOCUS[Math.floor(new Date(date+'T00:00:00Z').getTime()/86400000)%FOCUS.length];
 const desc=add(doc,root,'div','mission-focus',focus.en);
 localized(doc,desc,focus.ne,focus.roman);
 const bar=add(doc,root,'div','mission-bar');
 bar.setAttribute('role','progressbar');bar.setAttribute('aria-valuemin','0');bar.setAttribute('aria-valuemax','3');
 const fill=add(doc,bar,'div','mission-fill');
 const count=add(doc,root,'p','mission-count');
 const doneButtons=[];
 const update=()=>{
  const n=checks.filter(Boolean).length;
  fill.style.width=n/3*100+'%';bar.setAttribute('aria-valuenow',String(n));
  count.textContent=n+' of 3 practiced today';
  doneButtons.forEach((button,i)=>{
   button.textContent=checks[i]?'✓ Practiced':'Mark practiced';
   button.setAttribute('aria-pressed',String(checks[i]));
  });
 };
 const note=add(doc,root,'p','mission-note','Check off lessons after practicing. Saved on this device only; not a test score.');
 TASKS.forEach((t,i)=>{
  const row=add(doc,root,'div','mission-row');
  const copy=add(doc,row,'div');
  add(doc,copy,'div','mission-title',t.icon+' '+t.en);
  localized(doc,copy,t.ne,t.roman);
  add(doc,copy,'div','mission-time',t.duration);
  const actions=add(doc,row,'div','mission-actions');
  const open=add(doc,actions,'button','mission-open','Open lesson');
  open.type='button';
  open.addEventListener('click',()=>{
   if(!switchTo(doc,t.tab))note.textContent='Lesson unavailable. Use the navigation above. · माथिको ट्याब प्रयोग गर्नुहोस्।';
  });
  const done=add(doc,actions,'button','mission-done','Mark practiced');
  done.type='button';
  done.addEventListener('click',()=>{checks[i]=!checks[i];save(view,key,checks);update();});
  doneButtons.push(done);
 });
 const festival=home.querySelector('.sfd');
 if(festival)home.insertBefore(root,festival);
 else home.insertBefore(root,home.firstChild);
 update();return true;
}
window.enhanceDailyEnglishMission=install;
})();