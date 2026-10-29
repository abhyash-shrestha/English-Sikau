/* English Sikau — mount the approved V4 experience inside the protected Coach.
 * The original Coach initializer still builds the independent US Visa tab;
 * only its Everyday conversations section is replaced.
 */
(function(){
 'use strict';
 const previous=window.enhanceCoachDashboard;
 if(typeof previous!=='function')return;
 const baseNames={
  'Return clothing':'लुगा फिर्ता','Buy clothes':'लुगा किन्नु','Buy a phone':'फोन किन्नु',
  'Ask for directions':'बाटो सोध्नु','Call for an appointment':'फोनबाट अपोइन्टमेन्ट',
  'Check in at a hospital':'अस्पतालमा दर्ता','Order at a restaurant':'रेस्टुरेन्टमा खाना',
  'Grocery shopping':'किराना किनमेल','At the pharmacy':'औषधि पसलमा',
  'Order at a café':'क्याफेमा अर्डर','Job interview':'जागिर अन्तर्वार्ता',
  'At work':'काममा कुराकानी','Take public transport':'बस यात्रा',
  'Check in at a hotel':'होटलमा चेकइन','At the airport':'विमानस्थलमा',
  'At a bank':'बैंकमा कुराकानी','Repair a phone':'फोन मर्मत',
  'Meet someone new':'नयाँ साथी भेट्ने','Ask a teacher':'शिक्षकसँग कुराकानी',
  'Rent an apartment':'घर भाडामा लिनु','Set up home internet':'इन्टरनेट जोड्नु',
  'Missing online delivery':'अनलाइन सामान नआउनु','At the dentist':'दाँतको डाक्टरकहाँ',
  'Meet a teacher':'शिक्षकसँग भेटघाट','Change a work shift':'कामको सिफ्ट बदल्नु',
  'Lost debit card':'डेबिट कार्ड हराउनु','At the post office':'हुलाक कार्यालयमा',
  'At the car mechanic':'गाडी मर्मत गराउनु','At the public library':'सार्वजनिक पुस्तकालयमा'
 };
 function safeId(id){return typeof id==='string'&&/^[A-Za-z0-9_-]{6,128}$/.test(id);}
 window.enhanceCoachDashboard=function(doc,firstName,verifiedStudentId){
  previous(doc,firstName,verifiedStudentId);
  // Only the parent-verified learner can load the standalone practice
  // document. Access, trial and paid membership remain parent-controlled.
  if(!safeId(verifiedStudentId)||!doc?.body)return;
  const shell=doc.getElementById('sikauCoachConversations');
  const everyday=doc.getElementById('sikauCoachEveryday');
  if(!shell||!everyday)return;
  const already=doc.getElementById('sikauCoachV4Frame');
  if(already&&already.dataset.sikauStudent===verifiedStudentId)return;
  if(!doc.getElementById('sikauCoachV4MountStyle')){
   const style=doc.createElement('style');
   style.id='sikauCoachV4MountStyle';
   style.textContent=[
    '#sikauCoachV4Mount{display:block;width:100%;min-width:0;margin:0;padding:0;background:transparent}',
    '#sikauCoachV4Frame{display:block;width:100%;min-width:0;max-width:100%;border:0;border-radius:16px;background:transparent;overflow:hidden}',
    '.sikau-convo-board:has(#sikauCoachV4Mount) .coach-top{display:none!important}',
    '@media(max-width:620px){#sikauCoachV4Frame{border-radius:11px}#sikauCoachV4Mount{padding:0}}'
   ].join('\n');
   doc.head.appendChild(style);
  }
  everyday.replaceChildren();
  const wrap=doc.createElement('section');
  wrap.id='sikauCoachV4Mount';
  wrap.setAttribute('aria-label','English Sikau interactive real-life conversations');
  const frame=doc.createElement('iframe');
  frame.id='sikauCoachV4Frame';
  frame.dataset.sikauStudent=verifiedStudentId;
  frame.setAttribute('title','English Sikau · 175 real-life conversations');
  frame.setAttribute('loading','eager');
  frame.setAttribute('referrerpolicy','same-origin');
  frame.style.setProperty('height','860px','important');
  frame.style.setProperty('width','100%','important');
  const source=new URL('coach-v4-live.html',window.location.href);
  source.searchParams.set('v','20261029-exact-v4-r1');
  source.hash='uid='+encodeURIComponent(verifiedStudentId);
  frame.src=source.href;
  wrap.appendChild(frame);everyday.appendChild(wrap);

  const buildTitles=()=>{
   const translations=Object.create(null);
   const bridge=doc.defaultView?.__sikauLanguageDisplay;
   const add=(title,ne)=>{
    if(!title||!ne)return;
    let roman='';
    try{roman=bridge?.romanize?.(ne)||'';}catch(_){}
    translations[title]={ne,roman};
   };
   for(const [title,ne] of Object.entries(baseNames))add(title,ne);
   for(const item of window.sikauMoreTopics||[])add(item.title,item.ne);
   return translations;
  };
  const sendConfiguration=()=>{
   if(!frame.contentWindow)return;
   const control=doc.getElementById('langPref')?.value;
   const mode=['en','en-ne','en-roman','all'].includes(control)?control:
     (doc.defaultView?.__sikauLanguageDisplay?.getMode?.()||'en');
   const root=doc.documentElement;
   const theme=root.dataset.sikauTheme==='dark'||root.getAttribute('data-theme')==='dark'?'dark':'light';
   frame.contentWindow.postMessage({
    type:'sikau-v4-config',mode,theme,titles:buildTitles()
   },'*');
  };
  const listener=event=>{
   if(event.source!==frame.contentWindow||!event.data||typeof event.data!=='object')return;
   if(event.data.type==='sikau-v4-ready'){sendConfiguration();return;}
   if(event.data.type==='sikau-v4-height'){
    const value=Number(event.data.height);
    if(!Number.isFinite(value)||value<320||value>80000)return;
    frame.style.setProperty('height',Math.ceil(value)+'px','important');
    return;
   }
   if(event.data.type==='sikau-v4-scroll'){
    wrap.scrollIntoView?.({behavior:'smooth',block:'start'});
   }
  };
  const view=doc.defaultView;
  view?.addEventListener('message',listener);
  frame.addEventListener('load',sendConfiguration);
  const select=doc.getElementById('langPref');
  select?.addEventListener('input',sendConfiguration);
  select?.addEventListener('change',sendConfiguration);
  if(view?.MutationObserver){
   const observer=new view.MutationObserver(sendConfiguration);
   observer.observe(doc.documentElement,{
    attributes:true,attributeFilter:['data-sikau-theme','data-theme','data-sikau-display-language']
   });
  }
 };
})();
