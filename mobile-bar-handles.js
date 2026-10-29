/* English Sikau · independent mobile header/nav visibility handles.
 * Preserve the original bars and their handlers. Display-only, no account changes.
 */
(function(){
 'use strict';
 const TOP_KEY='sikau-mobile-top-hidden-v1';
 const BOTTOM_KEY='sikau-mobile-bottom-hidden-v1';
 const SHEET_URL=new URL('./mobile-bar-handles.css?v=20261029-manual-only-r2',document.baseURI).href;
 function saved(key){
  try{return window.localStorage.getItem(key)==='1';}catch(_){return false;}
 }
 function persist(key,hidden){
  try{window.localStorage.setItem(key,hidden?'1':'0');}catch(_){}
 }
 function stylesheet(doc){
  if(!doc?.head||doc.getElementById('sikauMobileBarHandleStyle'))return;
  const link=doc.createElement('link');
  link.id='sikauMobileBarHandleStyle';link.rel='stylesheet';link.href=SHEET_URL;
  doc.head.appendChild(link);
 }
 function syncLessonTop(hidden,doc){
  try{
   const frameDoc=doc||document.getElementById('lessonFrame')?.contentDocument;
   frameDoc?.documentElement?.classList.toggle('sikau-mobile-top-hidden',hidden);
  }catch(_){}
 }
 function installTop(){
  const protectedArea=document.getElementById('protected');
  const bar=document.getElementById('bar');
  if(!protectedArea||!bar)return;
  stylesheet(document);
  let button=document.getElementById('sikauMobileTopHandle');
  if(button)return;
  button=document.createElement('button');
  button.type='button';button.id='sikauMobileTopHandle';
  button.setAttribute('aria-controls','bar');
  protectedArea.insertBefore(button,bar.nextSibling);
  const render=()=>{
   const hidden=protectedArea.classList.contains('sikau-mobile-top-hidden');
   button.textContent=hidden?'⌄':'⌃';
   button.setAttribute('aria-expanded',String(!hidden));
   button.setAttribute('aria-label',hidden?'Show top bar · माथिको बार देखाउनुहोस्':'Hide top bar · माथिको बार लुकाउनुहोस्');
   button.title=hidden?'Show top bar':'Hide top bar';
  };
  protectedArea.classList.toggle('sikau-mobile-top-hidden',saved(TOP_KEY));
  syncLessonTop(protectedArea.classList.contains('sikau-mobile-top-hidden'));
  button.addEventListener('click',()=>{
   const hidden=protectedArea.classList.toggle('sikau-mobile-top-hidden');
   persist(TOP_KEY,hidden);syncLessonTop(hidden);render();
  });
  render();
 }
 function installBottom(doc){
  const nav=doc?.querySelector('#mobileModes.nav');
  const html=doc?.documentElement,win=doc?.defaultView;
  if(!nav||!html||!win||!doc.body)return;
  stylesheet(doc);
  syncLessonTop(document.getElementById('protected')?.classList.contains('sikau-mobile-top-hidden'),doc);
  let rail=doc.getElementById('sikauMobileBottomHandleRail');
  if(rail?.__nav!==nav){rail?.remove();rail=null;}
  if(rail)return;
  // The control has its own opaque 36px row instead of covering the footer
  // or floating above lesson content. Keep the existing nav DOM untouched.
  rail=doc.createElement('div');
  rail.id='sikauMobileBottomHandleRail';
  rail.__nav=nav;
  const button=doc.createElement('button');
  button.type='button';button.id='sikauMobileBottomHandle';
  button.setAttribute('aria-controls','mobileModes');
  rail.appendChild(button);
  doc.body.appendChild(rail);
  const updatePosition=()=>{
   if(html.classList.contains('sikau-mobile-bottom-hidden'))return;
   if(!win.matchMedia?.('(max-width:767px)')?.matches)return;
   const rect=nav.getBoundingClientRect();
   if(!rect.height)return;
   // Bottom of the rail meets the actual top of the tab bar on this phone.
   // This is layout measurement only, never a scroll-hide trigger.
   const offset=Math.max(0,Math.min(win.innerHeight-36,win.innerHeight-rect.top));
   rail.style.setProperty('--sikau-handle-bottom',offset+'px');
  };
  const render=()=>{
   const hidden=html.classList.contains('sikau-mobile-bottom-hidden');
   button.textContent=hidden?'⌃':'⌄';
   button.setAttribute('aria-expanded',String(!hidden));
   button.setAttribute('aria-label',hidden?'Show bottom tabs · तलका ट्याबहरू देखाउनुहोस्':'Hide bottom tabs · तलका ट्याबहरू लुकाउनुहोस्');
   button.title=hidden?'Show bottom tabs':'Hide bottom tabs';
   if(!hidden)win.requestAnimationFrame?.(updatePosition);
  };
  html.classList.toggle('sikau-mobile-bottom-hidden',saved(BOTTOM_KEY));
  button.addEventListener('click',()=>{
   const hidden=html.classList.toggle('sikau-mobile-bottom-hidden');
   persist(BOTTOM_KEY,hidden);render();
  });
  win.addEventListener('resize',updatePosition,{passive:true});
  if(typeof win.ResizeObserver==='function'){
   const observer=new win.ResizeObserver(updatePosition);
   observer.observe(nav);
  }
  doc.getElementById('sikauMobileBarHandleStyle')?.addEventListener('load',updatePosition,{once:true});
  render();
 }
 window.sikauMobileBarHandles=Object.freeze({install(doc){installTop();installBottom(doc);}});
})();
