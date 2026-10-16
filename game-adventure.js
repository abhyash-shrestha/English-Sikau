/* English Sikau Game visual enhancement. Leaves original game engine and handlers intact. */
(function(){
'use strict';
const file=new URL('game-adventure.css?v=20261016-1',document.baseURI).href;
const destinations={ktm:['Kathmandu','काठमाडौं'],bkt:['Bhaktapur','भक्तपुर'],pkr:['Pokhara','पोखरा'],ctn:['Chitwan','चितवन'],nch:['Namche','नाम्चे'],evt:['Everest','सगरमाथा']};
const make=(d,t,c,v)=>{const e=d.createElement(t);if(c)e.className=c;if(v!=null)e.textContent=v;return e;};
window.enhanceGameDashboard=function(d){
 const sec=d?.getElementById('game'),content=sec?.querySelector(':scope > .content'),host=sec?.querySelector('#gameRoot');
 if(!sec||!content||!host)return;
 if(!d.getElementById('sikauGameStyle')){const l=make(d,'link');l.id='sikauGameStyle';l.rel='stylesheet';l.href=file;d.head.append(l);}
 sec.classList.add('sikau-game-adventure');
 if(!content.querySelector('.game-v5-header')){
  const hero=make(d,'section','game-v5-header');
  hero.innerHTML='<div class="game-v5-hero-text"><span class="game-v5-eyebrow">ENGLISH SIKAU · अंग्रेजी सिकौं</span><h1>English Games <span>/ खेल</span></h1><p>Learn English through fun games and real-world adventures.</p><p>खेल खेल्दै अंग्रेजी सिकौं।</p></div>';
  content.insertBefore(hero,content.firstChild);
 }
 let pending=false;
 function decorate(){
  if(pending)return;pending=true;
  d.defaultView.requestAnimationFrame(()=>{
   pending=false;
   const banner=host.querySelector('.game-banner');
   if(!banner||banner.dataset.adventure==='1')return;
   banner.dataset.adventure='1';
   const title=banner.querySelector('h2');
   if(title)title.textContent='Adventure Across Nepal 🇳🇵';
   const subtitle=banner.querySelector('p');
   if(subtitle)subtitle.textContent='Complete missions, collect stars and reach Everest! · मिसन पूरा गरौं, तारा संकलन गरौं।';
   const intro=banner.querySelector('.game-caption');if(intro)intro.textContent='ENGLISH QUEST · अंग्रेजी खोज अभियान';
   const hud=banner.querySelector('.game-hud');
   if(hud){
    for(const part of hud.querySelectorAll('span')){
     if(/coins/i.test(part.textContent))part.title='Actual game coins earned';
    }
   }
   const mission=host.querySelector('.game-mission'),map=host.querySelector('.game-map');
   if(!mission||!map)return; // Game question screen: do not change.
   const shell=map.closest('.game-shell');
   if(!shell)return;
   const heading=shell.querySelector('.game-caption');
   if(heading)heading.textContent='📍 Choose your destination · गन्तव्य छान्नुहोस्';
   for(const button of map.querySelectorAll('[data-game-stop]')){
    const id=button.getAttribute('data-game-stop');
    if(!destinations[id])continue;
    const title=button.querySelector('b');
    if(title)title.textContent=destinations[id][0];
    const icon=button.querySelector('.game-map-symbol');
    if(icon){
     icon.classList.add('game-v5-cover');
     icon.style.backgroundImage='url("'+new URL('./assets/game/'+id+'.svg',document.baseURI).href+'")';
     icon.setAttribute('aria-hidden','true');
    }
    const second=button.querySelector('small');
    if(second)second.textContent=(second.textContent||'')+' · '+destinations[id][1];
   }
   const selected=map.querySelector('.game-map-stop.selected');
   const stage=selected?.getAttribute('data-game-stop')||'ktm';
   const emoji=mission.querySelector('.game-mission-emoji');
   if(emoji){emoji.classList.add('game-v5-mission-cover');emoji.style.backgroundImage='url("'+new URL('./assets/game/'+stage+'.svg',document.baseURI).href+'")';}
   const go=shell.querySelector('#gameStart');
   if(go){
    go.classList.add('game-v5-start');
    go.textContent=/match/i.test(go.textContent)?'▶ Start Matching · शब्द मिलाउनुहोस्':/sprint|lightning/i.test(go.textContent)?'▶ Start Lightning · द्रुत खेल':'▶ Start Mission · मिसन सुरु गरौं';
    mission.appendChild(go); // Keep same original click listener.
   }
   for(const mode of host.querySelectorAll('[data-game-mode]')){
    const m=mode.getAttribute('data-game-mode');
    mode.textContent=m==='quest'?'🧭 Expedition · अभियान':m==='match'?'🧩 Match & Learn · मिलाऔं': '⚡ Lightning · द्रुत अभ्यास';
   }
  });
 }
 const observer=new d.defaultView.MutationObserver(()=>decorate());
 observer.observe(host,{subtree:false,childList:true});
 decorate();
};
})();