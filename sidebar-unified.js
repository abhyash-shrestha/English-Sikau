/* One consistent sidebar interaction for EVERY English Sikau tab.
 * UI-only: never changes lesson authorization, routing, or student progress.
 * Reuses original tab buttons/click handlers; never clones them.
 */
(function(){
 'use strict';
 const STORAGE='english-sikau-unified-tab-order-v1';
 const OLD_VISA='english-sikau-visa-placement-v2';
 const STYLE=new URL('./sidebar-unified.css?v=20261021-sidebar-parity-r1',document.baseURI).href;
 const SELECTOR='button[data-t],button.sikau-home-nav,button.sikau-visa-nav';
 const id=button=>button?.classList.contains('sikau-home-nav')?'nepali-festivals':
   button?.classList.contains('sikau-visa-nav')?'us-visa-interview':
   String(button?.dataset?.t||'').trim();
 function isTab(button,nav){
   return !!(button&&button.parentElement===nav&&button.matches(SELECTOR)&&
     id(button)&&id(button)!=='more'&&!button.matches('.nav-more'));
 }
 function tabs(nav){return Array.from(nav.children).filter(b=>isTab(b,nav));}
 function safeRead(win,key){
   try{return JSON.parse(win.localStorage.getItem(key)||'null');}catch(_){return null;}
 }
 function safeWrite(win,key,value){
   try{win.localStorage.setItem(key,JSON.stringify(value));}catch(_){}
 }
 function safeRemove(win,key){try{win.localStorage.removeItem(key);}catch(_){}}
 function restore(nav,ids){
   if(!Array.isArray(ids)||!ids.length)return;
   const all=tabs(nav),known=new Map(all.map(b=>[id(b),b]));
   const wanted=[...new Set(ids)].map(k=>known.get(k)).filter(Boolean);
   for(const b of all)if(!wanted.includes(b))wanted.push(b);
   // Move real nodes only; no innerHTML, no cloning and no listener loss.
   for(let i=0;i<wanted.length;i++){
     const current=tabs(nav)[i];
     if(current&&current!==wanted[i])nav.insertBefore(wanted[i],current);
   }
 }
 function move(nav,moving,target,before){
   if(!isTab(moving,nav)||!isTab(target,nav)||moving===target)return false;
   const list=tabs(nav),from=list.indexOf(moving),to=list.indexOf(target);
   const desired=list.filter(b=>b!==moving);
   const pos=desired.indexOf(target)+(before?0:1);
   desired.splice(pos,0,moving);
   if(desired.every((b,i)=>b===list[i]))return false;
   restore(nav,desired.map(id));
   return true;
 }
 window.enhanceUnifiedSidebar=function(doc){
   const nav=doc?.querySelector('#mobileModes.nav')||doc?.querySelector('.nav');
   const win=doc?.defaultView;
   if(!nav||!win||!doc.head)return;
   if(!doc.getElementById('sikauUnifiedSidebarStyles')){
     const css=doc.createElement('link');css.id='sikauUnifiedSidebarStyles';
     css.rel='stylesheet';css.href=STYLE;doc.head.appendChild(css);
   }
   if(nav.dataset.sikauUnifiedSort==='1')return;
   nav.dataset.sikauUnifiedSort='1';
   nav.classList.add('sikau-unified-sidebar');
   let saved=safeRead(win,STORAGE);
   let useLegacy=!Array.isArray(saved);
   let suppressClick=false,drag=null,touchDrag=null,drop=null,frame=0,longPress=0;
   const update=()=>{
     for(const b of tabs(nav)){
       b.classList.add('sikau-nav-unified');
       b.draggable=false;b.removeAttribute('draggable');
       b.setAttribute('aria-keyshortcuts','Alt+ArrowUp Alt+ArrowDown Alt+ArrowLeft Alt+ArrowRight');
       if(!b.hasAttribute('type'))b.type='button';
     }
   };
   const persist=()=>{
     saved=tabs(nav).map(id);
     safeWrite(win,STORAGE,saved);
     safeRemove(win,OLD_VISA);
     useLegacy=false;
   };
   const legacy=()=>{
     if(!useLegacy)return;
     useLegacy=false;
     const info=safeRead(win,OLD_VISA);
     if(!info||!info.anchor)return;
     const visa=nav.querySelector(':scope > button.sikau-visa-nav');
     const target=tabs(nav).find(b=>id(b)===info.anchor);
     if(visa&&target&&visa!==target&&move(nav,visa,target,!!info.before))persist();
   };
   const refresh=()=>{
     update();
     if(Array.isArray(saved)&&saved.length)restore(nav,saved);
     else legacy();
   };
   refresh();
   const lookup=e=>{
     const b=e.target?.closest?.(SELECTOR);
     return isTab(b,nav)?b:null;
   };
   const point=(x,y)=>{
     const el=doc.elementFromPoint?.(x,y);
     const button=el?.closest?.(SELECTOR);
     return isTab(button,nav)?button:null;
   };
   const clear=()=>{
     if(longPress)win.clearTimeout(longPress);
     longPress=0;
     drop?.classList.remove('sikau-nav-drop-target');drop=null;
     drag?.button?.classList.remove('sikau-nav-dragging');
     touchDrag?.button?.classList.remove('sikau-nav-dragging');
     drag=null;touchDrag=null;
   };
   const highlight=(moving,x,y)=>{
     moving.classList.add('sikau-nav-dragging');
     const target=point(x,y);
     if(drop!==target){
       drop?.classList.remove('sikau-nav-drop-target');
       drop=target===moving?null:target;
       drop?.classList.add('sikau-nav-drop-target');
     }
   };
   const applyDrop=(moving,x,y)=>{
     const target=point(x,y);
     if(target&&target!==moving){
       const box=target.getBoundingClientRect();
       const mobile=win.matchMedia?.('(max-width:767px)')?.matches;
       const before=mobile?x<box.left+box.width/2:y<box.top+box.height/2;
       if(move(nav,moving,target,before))persist();
     }
     suppressClick=true;
     win.setTimeout(()=>{suppressClick=false;},450);
   };
   const start=e=>{
     const button=lookup(e);
     if(!button||e.button>0)return;
     e.stopImmediatePropagation();
     if(e.pointerType==='touch')return; // Touch uses a deliberate long-press.
     clear();
     drag={button,pointer:e.pointerId,x:e.clientX,y:e.clientY,moved:false};
   };
   const dragMove=e=>{
     if(!drag||drag.pointer!==e.pointerId)return;
     if(!drag.moved&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<9)return;
     drag.moved=true;
     highlight(drag.button,e.clientX,e.clientY);
     if(e.cancelable)e.preventDefault();
   };
   const dragEnd=e=>{
     if(!drag||drag.pointer!==e.pointerId)return;
     if(drag.moved)applyDrop(drag.button,e.clientX,e.clientY);
     clear();
   };
   // Touch: a quick tap opens the tab, a swipe scrolls, a hold then move reorders.
   const touchStart=e=>{
     const button=lookup(e);
     if(!button)return;
     e.stopImmediatePropagation();
     clear();
     const t=e.changedTouches?.[0];
     if(!t)return;
     touchDrag={button,id:t.identifier,x:t.clientX,y:t.clientY,active:false,moved:false};
     longPress=win.setTimeout(()=>{
       if(!touchDrag||touchDrag.id!==t.identifier)return;
       touchDrag.active=true;
     },320);
   };
   const touchMove=e=>{
     if(!touchDrag)return;
     const t=Array.from(e.touches||[]).find(p=>p.identifier===touchDrag.id);
     if(!t)return;
     const distance=Math.hypot(t.clientX-touchDrag.x,t.clientY-touchDrag.y);
     if(!touchDrag.active){
       if(distance>9)clear();
       return;
     }
     if(distance<9&&!touchDrag.moved)return;
     touchDrag.moved=true;
     if(e.cancelable)e.preventDefault();
     highlight(touchDrag.button,t.clientX,t.clientY);
   };
   const touchEnd=e=>{
     if(!touchDrag)return;
     const t=Array.from(e.changedTouches||[]).find(p=>p.identifier===touchDrag.id);
     if(!t)return;
     if(touchDrag.moved){
       if(e.cancelable)e.preventDefault();
       applyDrop(touchDrag.button,t.clientX,t.clientY);
     }
     clear();
   };
   // Legacy sorter uses mouse/touch down; intercept only those for tab items.
   nav.addEventListener('pointerdown',start,true);
   nav.addEventListener('mousedown',e=>{if(lookup(e))e.stopImmediatePropagation();},true);
   nav.addEventListener('touchstart',touchStart,{capture:true,passive:true});
   doc.addEventListener('pointermove',dragMove,{capture:true,passive:false});
   doc.addEventListener('pointerup',dragEnd,true);
   doc.addEventListener('pointercancel',()=>{drag?.button?.classList.remove('sikau-nav-dragging');drag=null;},true);
   doc.addEventListener('touchmove',touchMove,{capture:true,passive:false});
   doc.addEventListener('touchend',touchEnd,true);
   doc.addEventListener('touchcancel',clear,true);
   nav.addEventListener('dragstart',e=>{
     if(lookup(e)){e.preventDefault();e.stopImmediatePropagation();}
   },true);
   nav.addEventListener('click',e=>{
     if(!suppressClick||!lookup(e))return;
     e.preventDefault();e.stopImmediatePropagation();
     suppressClick=false;
   },true);
   nav.addEventListener('keydown',e=>{
     const button=lookup(e);
     if(!button||!e.altKey||!/^Arrow(?:Up|Down|Left|Right)$/.test(e.key))return;
     const list=tabs(nav),delta=/Up|Left/.test(e.key)?-1:1;
     const target=list[list.indexOf(button)+delta];
     if(!target)return;
     e.preventDefault();e.stopImmediatePropagation();
     if(move(nav,button,target,delta<0))persist();
     button.focus({preventScroll:true});
   },true);
   // Preserve existing Reset order button semantics and reset our preference too.
   doc.addEventListener('click',e=>{
     const control=e.target?.closest?.('button,a,[role="button"]');
     if(!control||!/^Reset order\b/i.test((control.textContent||'').trim()))return;
     safeRemove(win,STORAGE);safeRemove(win,OLD_VISA);
     saved=null;useLegacy=false;
     win.setTimeout(()=>{
       const list=tabs(nav),home=list.find(b=>b.classList.contains('sikau-home-nav'));
       const visa=list.find(b=>b.classList.contains('sikau-visa-nav'));
       const first=list.find(b=>b!==home&&b!==visa);
       const coach=list.find(b=>b.dataset.t==='coach');
       if(home&&first)move(nav,home,first,true);
       if(visa&&coach)move(nav,visa,coach,false);
       update();
     },120);
   },true);
   // Private lesson UI may rebuild native buttons after changing tabs.
   // Re-attach visual styles and saved order without cloning event handlers.
   const observer=new win.MutationObserver(()=>{
     if(frame)return;
     frame=win.requestAnimationFrame(()=>{
       frame=0;
       refresh();
     });
   });
   observer.observe(nav,{childList:true});
 };
})();
