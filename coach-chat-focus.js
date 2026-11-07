/* English Sikau · Coach mobile conversation focus.
   UI only: retains the complete conversation and original answer handlers.
   On phones, keep the newest exchange beside the reply actions while letting
   learners expand the full history at any time. */
(function(){
 'use strict';
 if(!new URLSearchParams(location.hash.slice(1)).has('uid'))return;

 const view=document.getElementById('chat-view');
 const thread=document.getElementById('chat-transcript');
 const answers=document.getElementById('chat-choices');
 if(!view||!thread||!answers)return;

 const mobile=window.matchMedia('(max-width:620px)');
 const toggle=document.createElement('button');
 toggle.type='button';
 toggle.id='sikauChatHistoryToggle';
 toggle.className='sikau-chat-history-toggle';
 toggle.setAttribute('aria-controls','chat-transcript');
 toggle.setAttribute('aria-expanded','false');
 thread.insertAdjacentElement('beforebegin',toggle);

 let expanded=false;
 let previousLast=null;
 let previousCount=-1;
 let focusNextReply=false;
 let queued=false;

 function recentRows(){
  return Array.from(thread.children).filter(el=>el.classList.contains('message-row'));
 }
 function showLatest(){
  if(!mobile.matches||view.hidden||expanded)return;
  // The parent lesson and Coach are same-origin. This also scrolls the
  // parent page in mobile Safari, instead of scrolling only inside the frame.
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  try{
   thread.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start',inline:'nearest'});
  }catch(_){
   thread.scrollIntoView();
  }
 }
 function refresh(){
  const rows=recentRows();
  const last=rows.length?rows[rows.length-1]:null;
  const isNewTurn=last!==previousLast||rows.length!==previousCount;
  if(isNewTurn){
   expanded=false;
   previousLast=last;
   previousCount=rows.length;
  }

  const olderCount=Math.max(0,rows.length-2);
  rows.forEach((row,index)=>{
   row.classList.toggle('sikau-chat-older',index<olderCount);
  });
  thread.classList.toggle('sikau-chat-recent',!expanded&&olderCount>0);

  const showToggle=olderCount>0&&!view.hidden;
  if(toggle.hidden===showToggle)toggle.hidden=!showToggle;
  const label=expanded
   ?'⌄ Show recent conversation · पछिल्लो कुराकानी हेर्नुहोस्'
   :'↑ Show '+olderCount+' earlier message'+(olderCount===1?'':'s')+
    ' · अघिल्ला '+olderCount.toLocaleString('ne-NP')+' सन्देश हेर्नुहोस्';
  if(toggle.textContent!==label)toggle.textContent=label;
  toggle.setAttribute('aria-expanded',String(expanded));

  if(isNewTurn&&focusNextReply){
   focusNextReply=false;
   // The bilingual bridge may enlarge the latest bubbles in a later frame.
   requestAnimationFrame(()=>requestAnimationFrame(showLatest));
  }
 }
 function schedule(){
  if(queued)return;
  queued=true;
  requestAnimationFrame(()=>{queued=false;refresh();});
 }
 toggle.addEventListener('click',()=>{
  expanded=!expanded;
  refresh();
  if(expanded){
   requestAnimationFrame(()=>{thread.scrollTop=0;});
  }else{
   requestAnimationFrame(showLatest);
  }
 });
 // Only scroll on a deliberate answer, not when translating, reviewing
 // earlier messages, reloading or changing the site's language setting.
 document.addEventListener('click',event=>{
  if(event.target?.closest?.('#chat-choices .answer-button')&&mobile.matches){
   focusNextReply=true;
  }
 },true);
 new MutationObserver(schedule).observe(thread,{childList:true,subtree:true});
 new MutationObserver(schedule).observe(view,{attributes:true,attributeFilter:['hidden']});
 window.addEventListener('resize',schedule);
 schedule();
})();
