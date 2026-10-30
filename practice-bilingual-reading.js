/* English Sikau · automatic English/Nepali side-by-side in Reading > Practice.
 * Enhances only the authenticated lesson DOM. Keeps native passage, translation
 * buttons, speech and quiz handlers as the source of truth. Never invents text.
 */
(function(){
'use strict';
const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
const neScript=/[\u0900-\u097f]/u;
const translationSelector=[
 '.nd','.nepali-translation','.nepali-text','.nepali','.np-text',
 '.reading-nepali','.practice-nepali','.translation-ne','.r-nepali',
 '[lang="ne"]','[lang="ne-NP"]','[data-nepali]','[data-translation]',
 '[data-ne]','.rnp','.np'
].join(',');
const isControl=el=>el?.matches?.('button,input,[role="button"],label,a');
function isNepaliButton(b){
 const words=clean([b?.textContent,b?.value,b?.getAttribute?.('aria-label'),b?.getAttribute?.('title')].join(' '));
 return /sikau-see-nepali/.test(String(b?.className||''))||
  /(?:see nepali|नेपाली हेर्नुहोस्|नेपालीमा|click garnus|^NP$|🇳🇵)/iu.test(words);
}
function visibleTranslation(row,english){
 const extract=el=>{
  if(!el||isControl(el)||el.querySelector?.('button,input[type="button"],[role="button"]'))return '';
  const data=el.getAttribute?.('data-nepali')||el.getAttribute?.('data-ne')||el.getAttribute?.('data-translation')||'';
  const text=clean(data||el.textContent||'');
  if(!neScript.test(text)||/^(?:नेपाली|नेपाली हेर्नुहोस्|नेपालीमा)$/u.test(text)||/see nepali|नेपाली हेर्नुहोस्/i.test(text))return '';
  if(text.length>600||text===english)return '';
  return text;
 };
 for(const node of row.querySelectorAll?.(translationSelector)||[]){
  if(node.closest?.('button,[role="button"],label'))continue;
  const value=extract(node);if(value)return value;
 }
 for(const sibling of [row.nextElementSibling,row.previousElementSibling]){
  const value=sibling?.matches?.(translationSelector)?extract(sibling):'';
  if(value)return value;
 }
 // Some native versions replace the source sentence with its translation when
 // the flag is pressed. A previously remembered English sentence protects it.
 const rs=row.querySelector?.('.rs');
 if(rs){const value=clean(rs.textContent||'');if(neScript.test(value)&&value!==english&&value.length<600)return value;}
 // Unknown private lesson versions may use a plain paragraph instead of a
 // named Nepali span. Read only short Devanagari leaf elements, never buttons.
 for(const node of row.querySelectorAll?.('p,span,small,div')||[]){
  if(node.closest?.('button,[role="button"],label'))continue;
  if(node.querySelector?.('button,[role="button"]'))continue;
  if(node.querySelector?.('p,span,small,div'))continue;
  const value=extract(node);
  if(value)return value;
 }
 return '';
}
function englishFrom(source){
 const copy=source.cloneNode?.(true);
 if(!copy)return clean(source.textContent||'');
 copy.querySelectorAll?.('button,input,[role="button"],.speaker,.sikau-see-nepali,'+
  translationSelector+',svg').forEach(el=>el.remove());
 const text=clean(copy.textContent||'');
 return neScript.test(text)&&!/[\x41-\x5a\x61-\x7a]/.test(text)?'':text;
}
function sourceRow(source,host){
 // The older private lessons often use an inline .rs within a plain paragraph;
 // newer ones provide .practice-line or .reading-line wrappers.
 const line=source.closest?.('.practice-line,.reading-line,.reader-line,.read-line,.rl,.sentence-line,li');
 if(line&&host.contains(line))return line;
 let parent=source.parentElement,chosen=source;
 while(parent&&parent!==host){
  if((parent.querySelectorAll?.('.rs')?.length||0)>1)break;
  chosen=parent;
  // Include the English sound and the separate "See Nepali" action even
  // when they are in sibling spans under the same sentence wrapper.
  if(Array.from(parent.querySelectorAll?.('button,input[type="button"],[role="button"]')||[])
      .some(isNepaliButton))break;
  parent=parent.parentElement;
 }
 return chosen;
}
function sourceRows(host){
 let sources=Array.from(host.querySelectorAll('.rs'));
 if(!sources.length){
  sources=Array.from(host.querySelectorAll('p,li,.practice-line,.reading-line'))
    .filter(x=>!x.querySelector('.rs')&&x.querySelector('button')&&
      /[A-Za-z]{3}/.test(x.textContent||''));
 }
 const rows=[];const used=new Set();
 for(const source of sources){
  const row=sourceRow(source,host);
  if(used.has(row))continue;used.add(row);
  rows.push({source,row});
 }
 return rows.slice(0,80);
}
const mk=(d,t,c,txt)=>{
 const e=d.createElement(t);if(c)e.className=c;if(txt!==undefined)e.textContent=txt;return e;
};
function install(d){
 const rd=d?.getElementById?.('rd'),mode=d?.getElementById?.('readModeSeg');
 if(!rd||!mode||!d.defaultView)return false;
 if(rd.dataset.sikauPracticeBilingual==='1')return true;
 rd.dataset.sikauPracticeBilingual='1';
 const view=d.defaultView;
 if(!d.getElementById('sikauPracticeBilingualCSS')){
  const link=mk(d,'link');link.id='sikauPracticeBilingualCSS';link.rel='stylesheet';
  link.href=new URL('./practice-bilingual-reading.css?v=20261030-practice-r1',document.baseURI).href;
  d.head.append(link);
 }
 const seenButtons=new WeakSet(),englishCache=new WeakMap(),attempts=new Map();
 let holder=null,currentHost=null,lastSignature='',scheduled=false,drawing=false;
 const active=()=>!!mode.querySelector('button[data-rm="practice"].on');
 const render=()=>{
  const host=d.getElementById('rtext');
  if(!active()||!host){
   if(holder)holder.hidden=true;
   if(currentHost)currentHost.classList.remove('sikau-practice-original-hidden');
   return;
  }
  if(host!==currentHost){
   if(currentHost)currentHost.classList.remove('sikau-practice-original-hidden');
   currentHost=host;holder=null;lastSignature='';attempts.clear();
  }
  const candidates=sourceRows(host);
  if(!candidates.length){
   if(holder)holder.hidden=true;
   host.classList.remove('sikau-practice-original-hidden');
   return;
  }
  const entries=candidates.map(({source,row},i)=>{
   let english=englishFrom(source)||englishCache.get(source)||'';
   if(english&&!neScript.test(english))englishCache.set(source,english);
   if(neScript.test(english))english=englishCache.get(source)||'';
   const controls=Array.from(row.querySelectorAll?.('button,input[type="button"],[role="button"]')||[]);
   const button=controls.find(isNepaliButton)||null;
   const speaker=controls.find(b=>b!==button&&
    /(?:speaker|🔊|🔉|🔈|listen|play audio|speak)/iu.test(
      String(b.className||'')+' '+clean(b.textContent||'')+' '+clean(b.getAttribute?.('aria-label')||'')))||null;
   return {row,source,english,nepali:visibleTranslation(row,english),button,speaker,i};
  }).filter(e=>e.english&&/[A-Za-z]{2}/.test(e.english));
  if(!entries.length){
   host.classList.remove('sikau-practice-original-hidden');return;
  }
  // Use the private lesson's existing Nepali controls once per source row.
  // Let the native handler fill its own translation, then render that exact text.
  const key=clean(host.closest('.card')?.querySelector('h3,h4,b,strong')?.textContent||'')+'|'+entries.map(e=>e.english).join('|');
  const toReveal=entries.filter(e=>!e.nepali&&e.button&&!seenButtons.has(e.button));
  for(const entry of toReveal){
   const token=key+'#'+entry.i;
   const n=attempts.get(token)||0;
   if(n>=2)continue;
   attempts.set(token,n+1);seenButtons.add(entry.button);
   try{entry.button.click();}catch(_){}
  }
  // A native handler may fill the translation synchronously.
  for(const e of entries)if(!e.nepali)e.nepali=visibleTranslation(e.row,e.english);
  const signature=entries.map(e=>e.english+'\u241f'+e.nepali).join('\u241e');
  if(holder&&lastSignature===signature&&!holder.hidden)return;
  drawing=true;
  try{
   if(!holder){
    holder=mk(d,'section','sikau-practice-bilingual');
    holder.setAttribute('aria-label','Practice reading in English and Nepali');
    host.parentElement.insertBefore(holder,host);
   }
   holder.replaceChildren();
   const header=mk(d,'div','sikau-practice-bilingual-heading');
   header.append(mk(d,'h3','','Read in English & Nepali · अंग्रेजी र नेपालीमा पढ्नुहोस्'),
    mk(d,'p','','Both languages together · दुवै भाषा सँगसँगै'));
   holder.append(header);
   const pairs=mk(d,'div','sikau-practice-bilingual-pairs');
   for(const e of entries){
    const pair=mk(d,'section','sikau-practice-pair');
    const left=mk(d,'div','sikau-practice-english'),right=mk(d,'div','sikau-practice-nepali');
    right.lang='ne-NP';left.lang='en-US';
    const head=mk(d,'div','sikau-practice-language-heading');
    head.append(mk(d,'strong','','English'));
    if(e.speaker){
     const listen=mk(d,'button','sikau-practice-listen','🔊 Listen');
     listen.type='button';listen.setAttribute('aria-label','Listen to English sentence');
     listen.addEventListener('click',()=>e.speaker.click());head.append(listen);
    }
    left.append(head,mk(d,'p','sikau-practice-sentence',e.english));
    const neHead=mk(d,'div','sikau-practice-language-heading');
    neHead.append(mk(d,'strong','sikau-practice-nepali-label','नेपाली'));
    if(e.nepali&&typeof view.__sikauSpeech==='function'){
     const playNe=mk(d,'button','sikau-practice-listen','🔊 सुन्नुहोस्');
     playNe.type='button';playNe.setAttribute('aria-label','Listen to Nepali sentence');
     playNe.addEventListener('click',()=>view.__sikauSpeech(e.nepali,'ne-NP','rd',{rate:0.94}));
     neHead.append(playNe);
    }
    right.append(neHead);
    if(e.nepali)right.append(mk(d,'p','sikau-practice-translation',e.nepali));
    else if(e.button){
     // Fallback only when a private lesson has not supplied the translation.
     const reveal=mk(d,'button','sikau-practice-translation-fallback','नेपाली अनुवाद हेर्नुहोस्');
     reveal.type='button';
     reveal.addEventListener('click',()=>{e.button.click();lastSignature='';schedule();});
     right.append(reveal);
    }else right.append(mk(d,'p','sikau-practice-translation-missing','अनुवाद उपलब्ध छैन।'));
    pair.append(left,right);pairs.append(pair);
   }
   holder.append(pairs);
   holder.hidden=false;
   host.classList.add('sikau-practice-original-hidden');
   lastSignature=signature;
  }finally{drawing=false;}
 };
 function schedule(){
  if(scheduled)return;
  scheduled=true;
  const fn=()=>{scheduled=false;render();};
  if(typeof view.requestAnimationFrame==='function')view.requestAnimationFrame(fn);
  else if(typeof view.setTimeout==='function')view.setTimeout(fn,0);
  else fn();
 }
 if(typeof view.MutationObserver==='function'){
  const observer=new view.MutationObserver(records=>{
   if(drawing)return;
   if(records.every(r=>r.target?.closest?.('.sikau-practice-bilingual')))return;
   schedule();
  });
  observer.observe(rd,{subtree:true,childList:true,characterData:true,
   attributes:true,attributeFilter:['class','hidden']});
 }
 mode.addEventListener('click',schedule);
 render();
 return true;
}
window.enhancePracticeBilingualReading=install;
})();