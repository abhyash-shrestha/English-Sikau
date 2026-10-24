/* English Sikau: compact mobile lesson header while scrolling.
 * The learning iframe scrolls independently from the parent top bar.
 * UI-only: student access, payments, trials, XP and private lessons untouched. */
(function(){
'use strict';
const STYLE_ID='sikau-mobile-header-autohide-style';
const HIDDEN='sikau-mobile-header-hidden';
const COMPACT='sikau-mobile-header-compact';
const MOBILE_MAX=650;
const HIDE_AFTER=140;
const TOP_REVEAL=8;
const DISTANCE=24;
const listeners=new WeakSet();

function addStyle(){
 if(document.getElementById(STYLE_ID))return;
 const style=document.createElement('style');
 style.id=STYLE_ID;
 style.textContent=[
  '@media(max-width:650px){',
  '#protected #bar.student-topbar{',
  'flex-shrink:0;position:relative;z-index:2;',
  'margin-bottom:0!important;transform:translate3d(0,0,0);opacity:1;visibility:visible;',
  'transition:transform 300ms cubic-bezier(.2,.75,.2,1),margin-bottom 300ms cubic-bezier(.2,.75,.2,1),opacity 230ms ease,visibility 0s linear 0s;',
  '}',
  // Collapse the iframe space once, then KEEP it collapsed while the header
  // slides back over the lesson on upward scroll. This avoids resizing the
  // Safari iframe each time the scroll direction changes.
  '#protected.'+COMPACT+' #bar.student-topbar{',
  'margin-bottom:calc(-1 * var(--sikau-mobile-header-height,190px))!important;',
  '}',
  '#protected.'+HIDDEN+' #bar.student-topbar{',
  'transform:translate3d(0,-105%,0);',
  'opacity:0;visibility:hidden;pointer-events:none;',
  'transition:transform 300ms cubic-bezier(.2,.75,.2,1),margin-bottom 300ms cubic-bezier(.2,.75,.2,1),opacity 230ms ease,visibility 0s linear 300ms;',
  '}',
  '}',
  '@media(max-width:650px) and (prefers-reduced-motion:reduce){',
  '#protected #bar.student-topbar,#protected.'+HIDDEN+' #bar.student-topbar{transition:none!important}',
  '}'
 ].join('');
 document.head.appendChild(style);
}
function root(){return document.getElementById('protected');}
function showHeader(){root()?.classList.remove(HIDDEN);}
function restoreLayout(){
 const host=root();
 if(!host)return;
 host.classList.remove(HIDDEN);
 host.classList.remove(COMPACT);
}
function sizeHeader(){
 // The welcome row can wrap on narrow phones or long names. Use its actual
 // current height, not a guessed fixed margin that leaves a blank strip.
 const host=root();
 const header=document.getElementById('bar');
 if(!host||!header||!host.style?.setProperty)return;
 const height=header.getBoundingClientRect?.().height||header.offsetHeight||0;
 if(height>0)host.style.setProperty('--sikau-mobile-header-height',Math.ceil(height)+'px');
}
function isMobile(){
 return window.matchMedia?
   window.matchMedia('(max-width: 650px)').matches:
   window.innerWidth<=MOBILE_MAX;
}
function expanded(){
 return document.getElementById('cloudStoryToggle')?.getAttribute('aria-expanded')==='true';
}
function readPosition(event,doc){
 const target=event?.target;
 if(target?.nodeType===1 && target!==doc.documentElement && target!==doc.body){
   if(target.closest?.('#mobileModes, .nav, .sikau-nav-unified'))return null;
   if(target.scrollHeight-target.clientHeight<70)return null;
   return {scrollTarget:target,y:Math.max(0,target.scrollTop||0)};
 }
 const win=doc.defaultView;
 const scrollEl=doc.scrollingElement||doc.documentElement||doc.body;
 return {scrollTarget:scrollEl||doc,y:Math.max(0,
   scrollEl?.scrollTop||win?.scrollY||doc.body?.scrollTop||0)};
}
window.sikauResetMobileHeader=function(){restoreLayout();};
window.sikauInstallMobileHeader=function(doc){
 if(!doc?.defaultView||!doc.documentElement||listeners.has(doc)||!root())return;
 addStyle();
 listeners.add(doc);
 let lastTarget=null,lastY=0,down=0,up=0,lastChange=0;
 function reset(){lastTarget=null;lastY=0;down=0;up=0;restoreLayout();sizeHeader();}
 function onScroll(event){
   if(!isMobile()){reset();return;}
   if(!root()||root().classList.contains('hide'))return;
   if(expanded()){restoreLayout();return;}
   const position=readPosition(event,doc);
   if(!position)return;
   const {scrollTarget,y}=position;
   // At the actual top always restore the normal page layout, even
   // during iOS bounce/rapid scroll. Ignore synthetic resize events only
   // away from top; these should never trap the header off-screen.
   if(y<=TOP_REVEAL){reset();return;}
   if(Date.now()-lastChange<260){
     lastTarget=scrollTarget;lastY=y;down=0;up=0;return;
   }
   if(lastTarget!==scrollTarget){
     lastTarget=scrollTarget;lastY=y;down=0;up=0;return;
   }
   const delta=y-lastY;
   lastY=y;
   // Ignore fractional movement and layout jumps when the iframe grows.
   if(Math.abs(delta)<1||Math.abs(delta)>140)return;
   if(delta>0){
     down+=delta;up=0;
     if(y>HIDE_AFTER&&down>=DISTANCE){
       const header=document.getElementById('bar');
       if(!header?.contains(document.activeElement)){
         if(!root()?.classList.contains(HIDDEN)){
           if(!root()?.classList.contains(COMPACT))sizeHeader();
           root()?.classList.add(COMPACT);
           root()?.classList.add(HIDDEN);
           lastChange=Date.now();
         }
       }
       down=0;
     }
   }else{
     up-=delta;down=0;
     if(up>=DISTANCE){
       if(root()?.classList.contains(HIDDEN)){
         // Only reveal the overlay; leave iframe height untouched.
         showHeader();
         lastChange=0;
       }
       up=0;
     }
   }
 }
 // Captured scroll events work for document scrolling AND nested containers.
 doc.addEventListener('scroll',onScroll,{capture:true,passive:true});
 doc.defaultView.addEventListener?.('scroll',onScroll,{passive:true});
 doc.addEventListener('click',function(e){
   if(e.target?.closest?.('#mobileModes, .nav, .sikau-home-nav, .sikau-visa-nav'))
     reset();
 },{capture:true});
 document.getElementById('bar')?.addEventListener('focusin',function(){showHeader();});
 window.addEventListener('resize',function(){if(!isMobile())reset();else sizeHeader();},{passive:true});
 reset();
};
})();