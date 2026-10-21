/* English Sikau Game visual enhancement. Leaves original game engine and handlers intact. */
(function(){
'use strict';
const file=new URL('game-adventure.css?v=20261021-big-answer-verdict-hotfix-r2',document.baseURI).href;

/* Lightning timing. The protected engine owns gameplay and awards.
 * This presentation-layer adapter updates the actual round state:
 * every new Lightning round starts at 60 seconds and each freshly accepted
 * correct answer adds exactly 5 seconds. No bonus on wrong/repeat answers.
 */
function installLightningTiming(d){
 const view=d?.defaultView;
 if(view?.__sikauLightningTimingV3)return true;
 if(!view||!('GAME_RUNNING' in view)||
    typeof view.gameStartRush!=='function'||
    typeof view.gameRushAnswer!=='function')return false;

 // The old v1 answer wrapper may remain in an already loaded lesson frame.
 // Unwrap it so its +10-second reward cannot stack with the new +5.
 const prior=view.gameRushAnswer;
 if(!prior.__sikauLightningTimingV2){
  const answerHandler=prior.__sikauCorrectTimeBonusV1&&prior.__sikauOriginalAnswer
   ?prior.__sikauOriginalAnswer:prior;
  function answerWithFiveSecondBonus(answer){
   const round=view.GAME_RUNNING;
   const eligible=!!(round&&round.mode==='rush'&&!round.done&&!round.answered&&
     Number.isFinite(round.seconds)&&round.seconds>0);
   const before=eligible?round.correct:null;
   const beforeTime=eligible?round.seconds:null;
   const result=answerHandler.apply(this,arguments);
   if(eligible&&view.GAME_RUNNING===round&&round.mode==='rush'&&!round.done&&
      round.answered&&round.paused&&round.correct===before+1&&
      round.seconds<=beforeTime){
    round.seconds+=5;
    const clock=d.getElementById('gameSeconds');
    if(clock)clock.textContent=String(round.seconds);
    const bar=d.getElementById('gameTimeBar');
    if(bar)bar.style.width=Math.min(100,round.seconds/60*100)+'%';
    const feedback=d.getElementById('gameFeedback');
    if(feedback&&!feedback.querySelector('.sikau-lightning-bonus')){
     const bonus=d.createElement('div');
     bonus.className='sikau-lightning-bonus';
     bonus.setAttribute('role','status');
     bonus.textContent='⚡ +5 seconds! · सही उत्तरमा थप ५ सेकेन्ड';
     feedback.appendChild(bonus);
    }
   }
   return result;
  }
  answerWithFiveSecondBonus.__sikauLightningTimingV2=true;
  answerWithFiveSecondBonus.__sikauOriginalAnswer=answerHandler;
  view.gameRushAnswer=answerWithFiveSecondBonus;
 }
 // The protected game starts with 45s internally. Set the live state to 60
 // immediately after its own start handler draws the first question.
 const originalStart=view.gameStartRush;
 if(!originalStart.__sikauLightningStart60V2){
  const startHandler=originalStart.__sikauOriginalStart||originalStart;
  function startWithSixtySeconds(){
   const result=startHandler.apply(this,arguments);
   const round=view.GAME_RUNNING;
   if(round?.mode==='rush'&&!round.done&&round.i===0&&round.correct===0){
    round.seconds=60;
    const clock=d.getElementById('gameSeconds');
    if(clock)clock.textContent='60';
    const bar=d.getElementById('gameTimeBar');
    if(bar)bar.style.width='100%';
   }
   return result;
  }
  startWithSixtySeconds.__sikauLightningStart60V2=true;
  startWithSixtySeconds.__sikauOriginalStart=startHandler;
  view.gameStartRush=startWithSixtySeconds;
 }
 return true;
}

/* Large, easy-to-read feedback for Expedition, Matching and Lightning.
 * Detect what the protected game itself says; do not re-grade answers.
 * Never changes question state, timers, points, XP or click handlers. */
function sikauAnswerVerdict(text,className=''){
 const content=String(text||'').replace(/\s+/g,' ').trim();
 if(!content)return null;
 const classes=String(className||'');
 // An explicit mistake notice outranks text explaining the correct option.
 if(/learn from this mistake|learn from (?:your|the) mistake|wrong answer(?!s\b)|incorrect answer(?!s\b)|not quite|not a match|not the right pair|wrong pair|doesn.t match|do not match|don.t match|no match|try another pair|that.s not right|try again|गलत उत्तर|गल्तीबाट सिक्नुहोस्|मिलेन/i.test(content)
    ||/(?:^|\s)(?:wrong|incorrect|is-wrong|is-incorrect|error)(?:\s|$)/i.test(classes))
   return 'wrong';
 if(/(?:^|[!.\s])(?:correct!|well done!|great job!|nice work!|excellent!|perfect!|right answer!|you got it!|that.s right!|सही उत्तर)/i.test(content)
    ||/(?:^|\s)(?:is-correct|answer-correct|correct-choice)(?:\s|$)/i.test(classes))
   return 'correct';
 return null;
}
function installAnswerVerdicts(d,host){
 if(!d?.defaultView?.MutationObserver||!host||host.dataset.sikauAnswerVerdict==='1')return;
 host.dataset.sikauAnswerVerdict='1';
 const view=d.defaultView;
 const feedbackSelector='#gameFeedback,.game-feedback,.game-answer-feedback,.game-review,.game-explanation,.game-response,.game-status,.game-result-feedback,.game-match-feedback,.game-rush-feedback,.game-quest-feedback,.game-learn,.game-lesson,.game-hint-box';
 const scoreClassSelector='.game-option.wrong,.game-choice.wrong,.game-answer.wrong,.game-tile.wrong,.game-match-card.wrong,.game-match-card.incorrect,.game-match-tile.wrong,.game-card.wrong,.game-card.incorrect,.game-answer.incorrect,.game-choice.incorrect,.game-option.incorrect,.game-pick.wrong,.game-pick.incorrect,.game-pair.wrong,.game-chip.wrong,[data-game-answer].incorrect';
 const markerPattern=/learn from this mistake|learn from (?:your|the) mistake|wrong answer|incorrect answer|not quite|not a match|not the right pair|wrong pair|doesn.t match|do not match|don.t match|no match|try another pair|that.s not right|गलत उत्तर|गल्तीबाट सिक्नुहोस्|सही उत्तर|correct!|well done!|great job!|nice work!|excellent!|perfect!/i;
 const isVisible=el=>{
  if(!el?.isConnected||el.hidden||el.closest('[hidden],[aria-hidden="true"]'))return false;
  const style=view.getComputedStyle?.(el);
  if(style?.display==='none'||style?.visibility==='hidden')return false;
  // getClientRects also rejects CSS-hidden ancestors.
  return typeof el.getClientRects!=='function'||el.getClientRects().length>0;
 };
 function findResult(){
  // Game hub, map, and mission picker are NOT an active question.
  // Its explanation text contains "Wrong answers explain the rule" and must
  // never trigger a wrong-answer sign before the student has played.
  const hubMap=host.querySelector('.game-map');
  if(hubMap&&isVisible(hubMap))return null;
  const explicit=[...host.querySelectorAll(feedbackSelector)].filter(isVisible);
  for(const box of explicit){
   if(box.closest('.sikau-answer-verdict'))continue;
   const text=[...box.childNodes].filter(n=>!(n.nodeType===1&&n.classList?.contains('sikau-answer-verdict'))).map(n=>n.textContent||'').join(' ').slice(0,1100);
   const result=sikauAnswerVerdict(text,box.className);
   if(result)return {result,anchor:box};
  }
  // Older private lessons render "Learn from this mistake" in an unlabelled
  // feedback box. Locate the smallest visible text element and its card.
  const leaves=[...host.querySelectorAll('strong,b,span,p,h3,h4,h5,div,small')]
    .filter(el=>isVisible(el)&&!el.closest('.sikau-answer-verdict')&&
      (el.textContent||'').length<=250&&markerPattern.test(el.textContent||'')&&
      ![...el.children].some(child=>markerPattern.test(child.textContent||'')));
  for(const leaf of leaves){
   const result=sikauAnswerVerdict(leaf.textContent||'',leaf.className);
   if(!result)continue;
   let anchor=leaf;
   for(let n=leaf,depth=0;n&&n!==host&&depth<5;n=n.parentElement,depth++){
    if(n.matches?.(feedbackSelector)){anchor=n;break;}
    if(n.parentElement===host)break;
    if(/feedback|explain|learn|review|result|hint|message|notice|answer-state/i.test(String(n.className||''))){
      anchor=n;break;
    }
    const text=(n.textContent||'').trim();
    if(n!==leaf&&text.length>=35&&text.length<=1200){
      anchor=n;break;
    }
    if(n.parentElement?.matches?.('.game-shell')&&text.length<1100){anchor=n;break;}
   }
   return {result,anchor};
  }
  // Some matching games color a selected wrong card instead of writing prose.
  const incorrect=host.querySelector(scoreClassSelector);
  if(incorrect&&isVisible(incorrect)){
   const shell=incorrect.closest('.game-shell')||host;
   const anchor=shell.querySelector('#gameFeedback,.game-feedback')||shell;
   return {result:'wrong',anchor};
  }
  return null;
 }
 let scheduled=false,lastAnchor=null,lastResult=null;
 function update(){
  scheduled=false;
  const signal=findResult();
  const previous=[...host.querySelectorAll('.sikau-answer-verdict')];
  if(!signal){
   previous.forEach(el=>el.remove());lastAnchor=null;lastResult=null;
   return;
  }
  const {result,anchor}=signal;
  if(!anchor?.isConnected)return;
  if(lastAnchor===anchor&&lastResult===result&&previous.length===1&&previous[0].parentElement===anchor)return;
  previous.forEach(el=>el.remove());
  const banner=d.createElement('div');
  banner.className='sikau-answer-verdict sikau-answer-'+result;
  banner.setAttribute('role','status');
  banner.setAttribute('aria-live','polite');
  const symbol=d.createElement('span');
  symbol.className='sikau-answer-symbol';
  symbol.setAttribute('aria-hidden','true');
  symbol.textContent=result==='wrong'?'❌':'✅';
  const copy=d.createElement('span');
  copy.className='sikau-answer-message';
  const title=d.createElement('strong');
  title.textContent=result==='wrong'?'WRONG ANSWER':'CORRECT!';
  const nepali=d.createElement('small');
  nepali.textContent=result==='wrong'?'गलत उत्तर · सही उत्तर सिक्नुहोस्':'सही उत्तर · राम्रो गर्नुभयो!';
  copy.append(title,nepali);banner.append(symbol,copy);
  anchor.prepend(banner);
  lastAnchor=anchor;lastResult=result;
 }
 const schedule=()=>{
  if(scheduled)return;scheduled=true;
  view.requestAnimationFrame(update);
 };
 const observer=new view.MutationObserver(records=>{
  // Our own prepend/remove causes a childList mutation. Ignoring only
  // these banner changes prevents the renderer triggering itself forever.
  const ownChanges=records.length>0&&records.every(record=>{
   if(record.type!=='childList')return false;
   const nodes=[...record.addedNodes,...record.removedNodes];
   return nodes.length>0&&nodes.every(node=>node.nodeType===1&&
     node.classList?.contains('sikau-answer-verdict'));
  });
  if(!ownChanges)schedule();
 });
 observer.observe(host,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class','hidden','aria-hidden']});
 schedule();
}
const destinations={ktm:['Kathmandu','काठमाडौं'],bkt:['Bhaktapur','भक्तपुर'],pkr:['Pokhara','पोखरा'],ctn:['Chitwan','चितवन'],nch:['Namche','नाम्चे'],evt:['Everest','सगरमाथा']};
const make=(d,t,c,v)=>{const e=d.createElement(t);if(c)e.className=c;if(v!=null)e.textContent=v;return e;};
window.enhanceGameDashboard=function(d){
 const sec=d?.getElementById('game'),content=sec?.querySelector(':scope > .content'),host=sec?.querySelector('#gameRoot');
 if(!sec||!content||!host)return;
 // Install even when the adventure screen is already mounted.
 installLightningTiming(d);
 installAnswerVerdicts(d,host);
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
   if(go&&/sprint|lightning/i.test(go.textContent)){
    const hint=Array.from(shell.querySelectorAll('.course-small'))
      .find(p=>/Fast choices across Nepal/i.test(p.textContent||''));
    if(hint)hint.textContent='⚡ Start with 60 seconds. Every correct answer adds 5 seconds! · सुरुमा ६० सेकेन्ड। हरेक सही उत्तरमा थप ५ सेकेन्ड। The clock pauses while you review answers.';
   }
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