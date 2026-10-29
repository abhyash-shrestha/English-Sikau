/* English Sikau: bridge from approved V4 practice to the protected Coach frame.
 * This script handles presentation and resizing only. It does not touch
 * membership, trials, payment, verification or progress.
 */
(function(){
 'use strict';
 const embedded=new URLSearchParams(location.hash.slice(1)).has('uid');
 if(!embedded)return;
 document.documentElement.classList.add('sikau-v4-in-lesson');
 const style=document.createElement('style');
 style.textContent=[
 'html.sikau-v4-in-lesson,html.sikau-v4-in-lesson body{background:transparent!important;overflow-x:hidden}',
 'html.sikau-v4-in-lesson .brandbar,html.sikau-v4-in-lesson .hero,html.sikau-v4-in-lesson .fineprint{display:none!important}',
 'html.sikau-v4-in-lesson #root{padding:0 2px 14px!important;max-width:none!important}',
 'html.sikau-v4-in-lesson .panel{box-shadow:none}',
 'html.sikau-v4-in-lesson #topic-browser{border-radius:18px}',
 'html.sikau-v4-in-lesson .chat-shell{max-width:1100px}',
 'html.sikau-v4-in-lesson .sikau-v4-card-ne{display:block;margin-top:2px;font-size:11px;line-height:1.4;color:var(--muted);font-weight:600}',
 'html.sikau-v4-in-lesson .sikau-v4-inline-title{display:block;margin:3px 0 0;color:var(--muted);font-weight:650;font-size:11px;white-space:normal}',
 'html.sikau-v4-in-lesson .chat-header .sikau-v4-inline-title{color:#f6dbea}',
 'html.sikau-v4-in-lesson .sikau-v4-mode-note{font-size:11px;color:var(--muted);margin:8px 0 0;line-height:1.45}',
 'html.sikau-v4-in-lesson .sikau-v4-mode-note[hidden]{display:none!important}',
 'html.sikau-v4-in-lesson :is(.topic-card,.bubble,.answer-button){overflow-wrap:anywhere}',
 '@media(max-width:620px){html.sikau-v4-in-lesson #root{padding:0 1px 10px!important} html.sikau-v4-in-lesson .chat-header{border-radius:15px 15px 0 0} html.sikau-v4-in-lesson .panel{padding:11px}}'
 ].join('\n');
 document.head.appendChild(style);
 let mode='en',titles=Object.create(null),queued=false,lastHeight=0;
 const modes=new Set(['en','en-ne','en-roman','all']);
 function subtitle(t){
  if(!t||mode==='en')return '';
  if(mode==='en-ne')return t.ne||'';
  if(mode==='en-roman')return t.roman||'';
  return (t.ne||'')+(t.roman?' · '+t.roman:'');
 }
 function decorate(){
  for(const card of document.querySelectorAll('#topic-grid .topic-card')){
   const label=card.querySelector('strong');
   if(!label)continue;
   const entry=titles[label.firstChild?.textContent?.trim()||label.textContent.trim()];
   const translated=subtitle(entry);
   let node=card.querySelector('.sikau-v4-card-ne');
   if(!translated){node?.remove();continue;}
   if(!node){
    node=document.createElement('span');node.className='sikau-v4-card-ne';
    label.insertAdjacentElement('afterend',node);
   }
   if(node.textContent!==translated)node.textContent=translated;
  }
  const header=document.getElementById('chat-title');
  if(header){
   const original=header.firstChild?.textContent||'';
   const key=Object.keys(titles).find(x=>original===x||original.endsWith(' '+x));
   const translated=subtitle(titles[key]);
   let node=header.querySelector('.sikau-v4-inline-title');
   if(!translated)node?.remove();
   else{
    if(!node){node=document.createElement('span');node.className='sikau-v4-inline-title';header.appendChild(node);}
    if(node.textContent!==translated)node.textContent=translated;
   }
  }
  let note=document.getElementById('sikauV4ModeNote');
  if(!note){
   note=document.createElement('p');note.id='sikauV4ModeNote';note.className='sikau-v4-mode-note';
   document.querySelector('#topic-browser .filterbar')?.insertAdjacentElement('afterend',note);
  }
  note.hidden=mode==='en';
  const message=mode==='en-roman'?
   'Roman Nepali topic names are shown where available. V4 conversation lines are currently in English while the corresponding translations are prepared.':
   'विषयका नेपाली नाम उपलब्ध छन्। कुराकानीका सबै वाक्यको अनुवाद तयार नभएसम्म V4 संवाद अंग्रेजीमै रहनेछ।';
  if(note.textContent!==message)note.textContent=message;
 }
 function measure(){
  const root=document.getElementById('root');
  if(!root)return;
  const height=Math.max(390,Math.ceil(root.getBoundingClientRect().height+12));
  if(Math.abs(height-lastHeight)<2)return;
  lastHeight=height;
  window.parent.postMessage({type:'sikau-v4-height',height},'*');
 }
 function schedule(){
  if(queued)return;
  queued=true;
  requestAnimationFrame(()=>{queued=false;decorate();measure();});
 }
 window.addEventListener('message',event=>{
  if(event.source!==window.parent||event.data?.type!=='sikau-v4-config')return;
  const next=event.data;
  mode=modes.has(next.mode)?next.mode:'en';
  titles=next.titles&&typeof next.titles==='object'?next.titles:Object.create(null);
  document.documentElement.dataset.theme=next.theme==='dark'?'dark':'light';
  schedule();
 });
 new MutationObserver(schedule).observe(document.body,{childList:true,characterData:true,subtree:true});
 if(typeof ResizeObserver==='function')new ResizeObserver(measure).observe(document.getElementById('root')||document.body);
 window.addEventListener('resize',schedule);
 window.addEventListener('load',schedule);
 document.addEventListener('click',event=>{
  if(event.target?.closest?.('.topic-card,#back-topics')){
   window.parent.postMessage({type:'sikau-v4-scroll'},'*');
  }
  schedule();
 },true);
 schedule();
 window.parent.postMessage({type:'sikau-v4-ready'},'*');
})();
