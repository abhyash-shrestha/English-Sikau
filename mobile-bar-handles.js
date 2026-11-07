/* Adapt the classroom around the existing lesson buttons and account bar. */
(function(){
 'use strict';
 const TOP_KEY='sikau-mobile-top-hidden-v1';
 const BOTTOM_KEY='sikau-mobile-bottom-hidden-v1';
 const SHEET_URL=new URL('./mobile-bar-handles.css?v=20261106-adaptive-r2',document.baseURI).href;
 const QUICK='.sikau-home-nav,.sikau-visa-nav,[data-t="coach"],[data-t="rd"]';
 const controllers=new WeakMap();

 function saved(key){
  try{return localStorage.getItem(key)==='1';}catch(_){return false;}
 }
 function persist(key,hidden){
  try{localStorage.setItem(key,hidden?'1':'0');}catch(_){}
 }
 function button(doc,id,label,icon){
  const control=doc.createElement('button');
  control.type='button';control.id=id;
  control.innerHTML=icon+'<span></span>';
  control.lastElementChild.textContent=label;
  return control;
 }

 function installTop(root){
  const area=document.getElementById('protected');
  const actions=area?.querySelector('.student-top-actions');
  if(!actions)return;
  let control=document.getElementById('sikauMobileTopHandle');
  if(!control){
   control=button(document,'sikauMobileTopHandle','',
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 15 6-6 6 6"/></svg>');
   control.setAttribute('aria-controls','bar');
   const render=()=>{
    const hidden=area.classList.contains('sikau-mobile-top-hidden');
    control.setAttribute('aria-expanded',String(!hidden));
    control.setAttribute('aria-label',hidden?'Show header · माथिको बार देखाउनुहोस्':'Hide header · माथिको बार लुकाउनुहोस्');
    control.title=hidden?'Show header':'Hide header';
    rootForCurrentLesson()?.classList.toggle('sikau-mobile-top-hidden',hidden);
   };
   area.classList.toggle('sikau-mobile-top-hidden',saved(TOP_KEY));
   control.addEventListener('click',()=>{
    persist(TOP_KEY,area.classList.toggle('sikau-mobile-top-hidden'));
    render();
   });
   actions.append(control);
   render();
  }
  area.classList.add('sikau-classroom-ready');
  root.classList.toggle('sikau-mobile-top-hidden',area.classList.contains('sikau-mobile-top-hidden'));
 }
 function rootForCurrentLesson(){
  return document.getElementById('lessonFrame')?.contentDocument?.documentElement;
 }

 function install(doc){
  const nav=doc?.getElementById('mobileModes');
  const win=doc?.defaultView;
  if(!nav?.classList.contains('nav')||nav.dataset.sikauUnifiedSort!=='1'||!win)return;
  const root=doc.documentElement;
  installTop(root);
  const previous=controllers.get(doc);
  if(previous?.nav===nav){previous.render();return;}
  previous?.dispose();
  if(!doc.getElementById('sikauMobileBarHandleStyle')){
   const css=doc.createElement('link');
   css.id='sikauMobileBarHandleStyle';css.rel='stylesheet';css.href=SHEET_URL;
   doc.head.append(css);
  }
  root.classList.add('sikau-classroom');
  nav.setAttribute('aria-label','Learning tabs · सिकाइका ट्याबहरू');
  if(nav.tagName!=='NAV')nav.setAttribute('role','navigation');
  const title=doc.createElement('span');
  title.className='sikau-current-lesson';
  const more=button(doc,'sikauDockMore','All tabs',
   '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>');
  const hide=button(doc,'sikauDockHide','Hide tabs',
   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>');
  const show=button(doc,'sikauMobileBottomHandle','Show tabs',
   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 15 6-6 6 6"/></svg>');
  more.setAttribute('aria-controls',nav.id);
  hide.setAttribute('aria-label','Hide tabs · ट्याबहरू लुकाउनुहोस्');
  show.setAttribute('aria-controls',nav.id);
  show.setAttribute('aria-label','Show tabs · ट्याबहरू देखाउनुहोस्');
  doc.body.append(show);
  const phone=win.matchMedia('(max-width:767px)');
  const tabs=()=>Array.from(nav.querySelectorAll(':scope > button.sikau-nav-unified'));
  let open=false;

  function render(){
   // A native refresh can replace the toolbar or the children of the tab strip.
   const toolbar=doc.querySelector('.app-header .app-header-top');
   if(toolbar&&title.parentElement!==toolbar)toolbar.prepend(title);
   if(more.parentElement!==nav||hide.parentElement!==nav)nav.append(more,hide);
   const active=tabs().find(tab=>tab.getAttribute('aria-current')==='page')||
    tabs().find(tab=>tab.classList.contains('on'));
   const label=active?.querySelector('strong')?.textContent?.trim()||'';
   if(title.textContent!==label)title.textContent=label;
   const secondary=!!active&&!active.matches(QUICK);
   more.classList.toggle('sikau-dock-current',secondary);
   const accessible=open?'Close tabs · ट्याबहरू बन्द गर्नुहोस्':'All tabs · सबै ट्याबहरू';
   more.setAttribute('aria-label',!open&&secondary&&label?accessible+' · '+label:accessible);
  }
  function setOpen(next){
   open=next;
   nav.dataset.sikauDockOpen=String(open);
   more.setAttribute('aria-expanded',String(open));
   const label=open?'Close tabs':'All tabs';
   if(more.lastElementChild.textContent!==label)more.lastElementChild.textContent=label;
   render();
  }
  function setHidden(hidden){
   root.classList.toggle('sikau-mobile-bottom-hidden',hidden);
   show.setAttribute('aria-expanded',String(!hidden));
   setOpen(false);
  }

  more.addEventListener('click',()=>{
   setOpen(!open);
   if(open)(tabs().find(tab=>!tab.matches(QUICK))||tabs()[0])?.focus({preventScroll:true});
   else more.focus({preventScroll:true});
  });
  hide.addEventListener('click',()=>{
   setHidden(true);persist(BOTTOM_KEY,true);show.focus({preventScroll:true});
  });
  show.addEventListener('click',()=>{
   setHidden(false);persist(BOTTOM_KEY,false);more.focus({preventScroll:true});
  });
  function choose(event){
   const tab=event.target.closest?.('button.sikau-nav-unified');
   if(!open||!tab||tab.parentElement!==nav)return;
   // Festival and Visa can stop bubbling. Wait for their original handlers.
   win.requestAnimationFrame(()=>{
    setOpen(false);
    if(doc.activeElement===tab&&!tab.matches(QUICK))more.focus({preventScroll:true});
   });
  }
  function escape(event){
   if(!open||event.key!=='Escape')return;
   event.preventDefault();setOpen(false);more.focus({preventScroll:true});
  }
  function resize(){
   if(!phone.matches&&open)setOpen(false);
  }

  nav.addEventListener('click',choose,true);
  doc.addEventListener('keydown',escape);
  phone.addEventListener('change',resize);
  setHidden(saved(BOTTOM_KEY));
  const observer=new win.MutationObserver(records=>{
   if(records.some(record=>record.target===nav||
    record.target.closest?.('button.sikau-nav-unified')))render();
  });
  observer.observe(nav,{subtree:true,childList:true,attributes:true,attributeFilter:['aria-current','class']});
  controllers.set(doc,{nav,render,dispose(){
   observer.disconnect();phone.removeEventListener('change',resize);
   nav.removeEventListener('click',choose,true);doc.removeEventListener('keydown',escape);
   title.remove();more.remove();hide.remove();show.remove();
  }});
 }
 window.sikauMobileBarHandles=Object.freeze({install});
})();
