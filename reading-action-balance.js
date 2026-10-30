/* English Sikau | balance the native Reading Practice action row.
 * No buttons or handlers are replaced, cloned or moved. */
(function(){
'use strict';
function install(doc){
 const rd=doc?.getElementById?.('rd');
 if(!rd||!doc.defaultView)return false;
 if(rd.dataset.sikauBalancedActions==='1')return true;
 rd.dataset.sikauBalancedActions='1';
 const win=doc.defaultView;
 const mode=doc.getElementById('readModeSeg');
 let pending=false;
 const text=el=>String([
  el?.textContent||'',el?.getAttribute?.('aria-label')||'',
  el?.getAttribute?.('title')||'',el?.getAttribute?.('data-sikau-short')||''
 ].join(' ')).replace(/\s+/g,' ').toLowerCase();
 const isPractice=()=>!mode||!!mode.querySelector('button[data-rm="practice"].on');
 const directChild=(parent,child)=>{
  let current=child;
  while(current&&current.parentElement!==parent)current=current.parentElement;
  return current;
 };
 function update(){
  if(!isPractice())return;
  const buttons=Array.from(rd.querySelectorAll('button'))
   .filter(b=>!b.closest?.('#readModeSeg,#storyReader,.sikau-practice-bilingual'));
  const find=(pattern)=>buttons.find(b=>pattern.test(text(b)));
  const main=find(/(?:new\s*reading|नयाँ\s*reading|नयाँ\s*पाठ)/iu);
  const topic=buttons.find(b=>b.classList.contains('sikau-topic-action')||
   /(?:change topic|new topic|विषय बदल)/iu.test(text(b)));
  const down=buttons.find(b=>(b.classList.contains('sikau-level-action')&&
    b.getAttribute('data-sikau-short')==='Level down')||
   /(?:level down|easier|स्तर घट)/iu.test(text(b)));
  const up=buttons.find(b=>(b.classList.contains('sikau-level-action')&&
    b.getAttribute('data-sikau-short')==='Level up')||
   /(?:level up|harder|स्तर बढ)/iu.test(text(b)));
  if(!main||!topic||!down||!up)return;
  // Look for the smallest native action-only row. Never turn the whole
  // Reading card (with topic chips and labels) into a layout grid.
  let row=null;
  for(let node=main.parentElement;node&&node!==rd;node=node.parentElement){
   if(![topic,down,up].every(b=>node.contains(b)))continue;
   if(node.querySelectorAll('button').length>5)break;
   if(node.querySelector('h1,h2,h3,h4,fieldset,#storyReader,#readModeSeg'))break;
   row=node;break;
  }
  if(!row)return;
  const mainChild=directChild(row,main);
  const otherChildren=[topic,down,up].map(b=>directChild(row,b));
  const unique=[...new Set([mainChild,...otherChildren])];
  if(unique.length!==2&&unique.length!==4)return;
  if(mainChild===otherChildren[0])return;
  const variant=unique.length===2?'grouped':'individual';
  if(row.dataset.sikauBalance!==variant)row.dataset.sikauBalance=variant;
  row.classList.add('sikau-practice-balanced-row');
  mainChild.classList.add('sikau-practice-newreading-slot');
  for(const b of [topic,down,up])b.classList.add('sikau-practice-large-action');
  if(variant==='grouped'){
   const group=otherChildren[0];
   if(!otherChildren.every(child=>child===group))return;
   group.classList.add('sikau-practice-actions-slot');
  }
 }
 function schedule(){
  if(pending)return;pending=true;
  const work=()=>{pending=false;update();};
  if(typeof win.requestAnimationFrame==='function')win.requestAnimationFrame(work);
  else if(typeof win.setTimeout==='function')win.setTimeout(work,0);
  else work();
 }
 update();
 if(typeof win.MutationObserver==='function'){
  const obs=new win.MutationObserver(records=>{
   if(records.some(r=>r.type==='childList'&&r.addedNodes?.length)||
      records.some(r=>r.type==='attributes'&&
       (r.attributeName==='data-sikau-short'||r.attributeName==='aria-label')))
    schedule();
  });
  obs.observe(rd,{subtree:true,childList:true,attributes:true,
   attributeFilter:['data-sikau-short','aria-label']});
 }
 mode?.addEventListener('click',schedule);
 return true;
}
window.enhanceReadActionRow=install;
})();