/* English Sikau: compact mobile lesson header while scrolling.
 * The learning iframe scrolls independently from the parent top bar.
 * UI-only: student access, payments, trials, XP and private lessons untouched. */
(function(){
'use strict';
const STYLE_ID='sikau-mobile-header-autohide-style';
const HIDDEN='sikau-mobile-header-hidden';
const MOBILE_MAX=650;
const HIDE_AFTER=140;
const TOP_REVEAL=35;
const DISTANCE=24;
const listeners=new WeakSet();

function addStyle(){
 if(document.getElementById(STYLE_ID))return;
 const style=document.createElement('style');
 style.id=STYLE_ID;
 style.textContent='@media(max-width:650px){#protected.'+HIDDEN+
    ' #bar.student-topbar{display:none!important}}';
 document.head.appendChild(style);
}
function root(){return document.getElementById('protected');}
function showHeader(){root()?.classList.remove(HIDDEN);}
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
window.sikauResetMobileHeader=function(){showHeader();};
window.sikauInstallMobileHeader=function(doc){
 if(!doc?.defaultView||!doc.documentElement||listeners.has(doc)||!root())return;
 addStyle();
 listeners.add(doc);
 let lastTarget=null,lastY=0,down=0,up=0,lastChange=0;
 function reset(){lastTarget=null;lastY=0;down=0;up=0;showHeader();}
 function onScroll(event){
   if(!isMobile()){reset();return;}
   if(!root()||root().classList.contains('hide'))return;
   if(expanded()){showHeader();return;}
   const position=readPosition(event,doc);
   if(!position)return;
   const {scrollTarget,y}=position;
   // Hiding the outer header enlarges the iframe and can adjust scrollTop.
   // Ignore these synthetic layout scroll events to prevent flickering.
   if(Date.now()-lastChange<320){
     lastTarget=scrollTarget;lastY=y;down=0;up=0;return;
   }
   if(y<=TOP_REVEAL){reset();return;}
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
       if(!header?.contains(document.activeElement))
         if(!root()?.classList.contains(HIDDEN)){
           root()?.classList.add(HIDDEN);
           lastChange=Date.now();
         }
       down=0;
     }
   }else{
     up-=delta;down=0;
     if(up>=DISTANCE){
       if(root()?.classList.contains(HIDDEN)){
         showHeader();lastChange=Date.now();
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
 window.addEventListener('resize',function(){if(!isMobile())reset();},{passive:true});
 reset();
};
})();