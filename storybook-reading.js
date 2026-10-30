/* English Sikau · bilingual short-book Reading layout.
 * Read-only view of the authenticated story DOM: no changes to source lessons,
 * quiz answers, entitlement, progress, or chapter unlock decisions.
 */
(function(){
'use strict';
const stylesheet=new URL('./storybook-reading.css?v=20261030-bilingual-r2',document.baseURI).href;
const clean=value=>String(value||'').replace(/\s+/g,' ').trim();
const unwanted=/[\u{1F50A}-\u{1F50A}\u{1F507}-\u{1F509}]\s*(?:NP)?\s*|(?:🔊|🔉|🔈)\s*NP\s*/gu;
function englishText(line){
 const source=line?.querySelector?.('.rs,.story-line-english,.story-line-text');
 if(!source)return '';
 let value='';
 if(typeof source.cloneNode==='function'){
  const copy=source.cloneNode(true);
  copy.querySelectorAll?.('button,[role="button"],svg,.speaker,.sikau-see-nepali,.nepali,[lang^="ne"],.story-line-number')
   .forEach(node=>node.remove());
  value=copy.textContent||'';
 }else value=source.textContent||'';
 return clean(value.replace(unwanted,'').replace(/(?:🔊|🔉|🔈)\s*(?:NP)?/gu,'').replace(/\bNP\s*$/i,''));
}
const translationSelectors=[
 '.story-line-nepali','.story-nepali','.nepali-translation','.nepali-text',
 '.story-translation','.translation-ne','.story-line .np-text',
 '[data-story-nepali]','[lang="ne"]','[lang="ne-NP"]'
].join(',');
function nepaliText(line){
 if(!line)return '';
 const named=line.querySelectorAll?.(translationSelectors)||[];
 for(const item of named){
  if(/^(BUTTON|INPUT|LABEL)$/i.test(item.tagName||''))continue;
  const data=item.getAttribute?.('data-story-nepali')||'';
  const text=clean(data||item.textContent||'');
  if(/[\u0900-\u097f]/u.test(text))return text;
 }
 for(const key of ['data-nepali','data-ne','data-translation']){
  const value=clean(line.getAttribute?.(key)||'');
  if(/[\u0900-\u097f]/u.test(value))return value;
 }
 // Lesson versions differ in translation markup. Detect a real Devanagari
 // leaf instead of guessing the class name or displaying the NP button text.
 const leaves=line.querySelectorAll?.('span,p,div,small')||[];
 for(const item of leaves){
  if(item.querySelector?.('button,[role="button"]'))continue;
  const value=clean(item.textContent||'');
  if(value.length>=9&&value.length<=1000&&/[\u0900-\u097f]/u.test(value)&&
     !/^(?:नेपाली|नेपाली हेर्नुहोस्|सुन्नुहोस्|कथा पढ्नुहोस्)$/u.test(value))return value;
 }
 return '';
}
function sentenceTexts(lines){
 return Array.from(lines?.querySelectorAll?.('.story-line')||[]).map(englishText).filter(Boolean);
}
function makeParagraphs(sentences,size=3){
 const groups=[];for(let i=0;i<sentences.length;i+=size)groups.push(sentences.slice(i,i+size).join(' '));
 return groups;
}
function chapterIdentity(reader){
 const book=reader.querySelector('[data-storybook].on')?.getAttribute('data-storybook')||'';
 const level=reader.querySelector('[data-storylevel].on')?.getAttribute('data-storylevel')||'';
 const title=clean(reader.querySelector('#storyCurrentChapterTitle')?.textContent||'');
 const match=title.match(/\bChapter\s*(\d+)\b/i);
 return {book,level,number:match?Number(match[1]):0,title,key:book&&level?book+'|'+level:''};
}
function nativeAction(line,kind){
 const controls=Array.from(line.querySelectorAll?.('button,[role="button"],input[type="button"]')||[]);
 return controls.find(button=>{
  const value=clean([button.textContent,button.getAttribute?.('aria-label'),
   button.getAttribute?.('title')].filter(Boolean).join(' '));
  const klass=String(button.className||'');
  if(kind==='nepali')return /(?:^|\s)(?:🇳🇵|NP|nepali|नेपाली)|sikau-see-nepali/i.test(value+' '+klass);
  return /(?:🔊|🔈|🔉|\blisten\b|\bspeak\b)/iu.test(value+' '+klass);
 })||null;
}
function make(doc,tag,cls,text){
 const node=doc.createElement(tag);if(cls)node.className=cls;if(text!==undefined)node.textContent=text;
 return node;
}
function install(doc,reader){
 if(!doc?.head||!doc?.defaultView||!reader)return false;
 const host=reader.querySelector('.read-v2-sentences');
 if(!host)return false;
 if(reader.dataset.sikauBookReady==='2')return true;
 reader.dataset.sikauBookReady='2';
 if(!doc.getElementById('sikauStorybookStyle')){
  const link=make(doc,'link');link.id='sikauStorybookStyle';
  link.rel='stylesheet';link.href=stylesheet;doc.head.append(link);
 }
 const translated=new WeakSet(),remembered=new Map();
 let signature='',lastLines=null,chapter='',pageIndex=0,scheduled=false,drawing=false;
 const render=()=>{
  const target=reader.querySelector('.read-v2-sentences');
  const lines=target?.querySelector('.story-lines');
  if(!target||!lines)return;
  const story=chapterIdentity(reader);
  const original=Array.from(lines.querySelectorAll('.story-line'));
  if(!story.key||!story.number||!original.length)return;
  const entries=original.map(line=>({line,english:englishText(line),nepali:nepaliText(line)}))
   .filter(entry=>entry.english);
  if(!entries.length)return;
  const signatureNow=story.key+'|'+story.number+'|'+entries.map(e=>e.english+'~'+e.nepali).join('\u241e');
  if(signatureNow===signature&&lastLines===lines&&target.querySelector('.storybook-page'))return;
  drawing=true;
  try{
   if(chapter!==story.key+'|'+story.number){pageIndex=0;chapter=story.key+'|'+story.number;}
   signature=signatureNow;lastLines=lines;
   target.querySelector('.storybook-page')?.remove();
   target.querySelector('.storybook-tools-toggle')?.remove();
   const page=make(doc,'article','storybook-page');
   page.setAttribute('aria-label','English and Nepali storybook chapter');
   const header=make(doc,'div','storybook-page-top');
   header.append(
    make(doc,'span','storybook-kicker','READ THE STORY · कथा पढ्नुहोस्'),
    make(doc,'span','storybook-count','Chapter '+story.number+' · Level '+story.level)
   );
   page.append(header);
   const previous=remembered.get(story.key);
   if(previous&&previous.number===story.number-1&&previous.sentences.length){
    const recap=make(doc,'aside','storybook-recap');
    recap.append(make(doc,'strong','','Previously · अघिल्लो अध्यायमा'),
     make(doc,'p','',previous.sentences.slice(-2).join(' ')));
    page.append(recap);
   }
   const pageSize=3,count=Math.ceil(entries.length/pageSize);
   pageIndex=Math.min(pageIndex,count-1);
   const pageEntries=entries.slice(pageIndex*pageSize,(pageIndex+1)*pageSize);
   const body=make(doc,'div','storybook-bilingual');
   body.setAttribute('aria-label','English and Nepali passages');
   for(const entry of pageEntries){
    const row=make(doc,'section','storybook-pair');
    const en=make(doc,'div','storybook-english');
    const top=make(doc,'div','storybook-line-head');
    top.append(make(doc,'span','storybook-locale','ENGLISH'));
    const speaker=nativeAction(entry.line,'listen');
    if(speaker){
     const play=make(doc,'button','storybook-play','🔊 Listen');
     play.type='button';play.setAttribute('aria-label','Listen to this English sentence');
     play.addEventListener('click',()=>speaker.click());
     top.append(play);
    }
    en.append(top,make(doc,'p','storybook-sentence',entry.english));
    const ne=make(doc,'div','storybook-nepali');
    ne.lang='ne';
    ne.append(make(doc,'span','storybook-locale','नेपाली'));
    if(entry.nepali)ne.append(make(doc,'p','storybook-nepali-text',entry.nepali));
    else{
     // Do not invent a translation. Offer this row's native action if needed.
     const native=nativeAction(entry.line,'nepali');
     if(native){
      const reveal=make(doc,'button','storybook-native-nepali','नेपाली अनुवाद हेर्नुहोस्');
      reveal.type='button';reveal.addEventListener('click',()=>{native.click();schedule();});
      ne.append(reveal);
     }else ne.append(make(doc,'p','storybook-translation-missing','नेपाली अनुवाद उपलब्ध छैन।'));
    }
    row.append(en,ne);body.append(row);
   }
   page.append(body);
   if(count>1){
    const controls=make(doc,'nav','storybook-pagination');
    controls.setAttribute('aria-label','Pages within this chapter');
    const prev=make(doc,'button','','← Previous page');prev.type='button';
    prev.disabled=pageIndex===0;
    prev.addEventListener('click',()=>{pageIndex--;signature='';render();});
    const label=make(doc,'span','','Page '+(pageIndex+1)+' of '+count);
    const next=make(doc,'button','','Next page →');next.type='button';
    next.disabled=pageIndex===count-1;
    next.addEventListener('click',()=>{pageIndex++;signature='';render();});
    controls.append(prev,label,next);page.append(controls);
   }
   page.append(make(doc,'div','storybook-end','✦  ✦  ✦'));
   target.insertBefore(page,lines);
   target.dataset.storyToolsOpen='false';
   remembered.set(story.key,{number:story.number,sentences:entries.map(e=>e.english)});

   // Ask original protected lesson controls to reveal translations exactly once
   // per sentence. This retains the native translation data and logic.
   for(const entry of original){
    if(translated.has(entry)||nepaliText(entry))continue;
    const button=nativeAction(entry,'nepali');
    if(button){
     translated.add(entry);
     try{button.click();}catch(_){}
    }
   }
  }finally{drawing=false;}
 };
 function schedule(){
  if(scheduled)return;scheduled=true;
  const raf=doc.defaultView.requestAnimationFrame;
  const run=()=>{scheduled=false;render();};
  if(typeof raf==='function')raf.call(doc.defaultView,run);
  else doc.defaultView.setTimeout(run,0);
 }
 const observer=new doc.defaultView.MutationObserver(records=>{
  if(drawing||records.every(record=>
    record.target?.closest?.('.storybook-page')||
    record.target?.classList?.contains('storybook-page')))return;
  schedule();
 });
 observer.observe(reader,{childList:true,subtree:true,characterData:true});
 render();
 return true;
}
window.enhanceStorybookReading=install;
window.__sikauStorybookText={englishText,nepaliText,sentenceTexts,makeParagraphs,chapterIdentity,nativeAction};
})();