/* English Sikau · storybook reading view.
 * This is a reading-only presentation over the already-authorized lesson.
 * Original sentences, audio buttons, Nepali controls, quizzes, scores,
 * chapter navigation, and Appwrite permission checks are unchanged.
 */
(function(){
'use strict';
const stylesheet=new URL('./storybook-reading.css?v=20261030-book-r1',document.baseURI).href;
const clean=text=>String(text||'').replace(/\s+/g,' ').trim();
function sentenceTexts(lines){
 if(!lines)return [];
 return Array.from(lines.querySelectorAll('.story-line')).map(line=>{
  const english=line.querySelector('.rs,.story-line-english,.story-line-text');
  return clean(english?.textContent||'');
 }).filter(Boolean);
}
function makeParagraphs(sentences,size=4){
 const result=[];
 for(let i=0;i<sentences.length;i+=size)result.push(sentences.slice(i,i+size).join(' '));
 return result;
}
function chapterIdentity(reader){
 const book=reader.querySelector('[data-storybook].on')?.getAttribute('data-storybook')||'';
 const level=reader.querySelector('[data-storylevel].on')?.getAttribute('data-storylevel')||'';
 const title=clean(reader.querySelector('#storyCurrentChapterTitle')?.textContent);
 const match=title.match(/\bChapter\s*(\d+)\b/i);
 return {book,level,number:match?Number(match[1]):0,title,key:book&&level?book+'|'+level:''};
}
function install(doc,reader){
 if(!doc?.head||!doc?.defaultView||!reader)return false;
 if(reader.dataset.sikauBookReady==='1')return true;
 const host=reader.querySelector('.read-v2-sentences');
 if(!host)return false;
 reader.dataset.sikauBookReady='1';
 const link=doc.createElement('link');
 link.rel='stylesheet';link.id='sikauStorybookStyle';link.href=stylesheet;
 if(!doc.getElementById(link.id))doc.head.append(link);

 let lastKey='',lastLines=null,lastSignature='',scheduled=false;
 const remembered=new Map(); // No protected lesson text is persisted on disk.
 const sync=()=>{
  const target=reader.querySelector('.read-v2-sentences');
  const lines=target?.querySelector('.story-lines');
  if(!target||!lines)return;
  const sentences=sentenceTexts(lines);
  const identity=chapterIdentity(reader);
  if(!sentences.length||!identity.key||!identity.number)return;
  const signature=identity.key+'|'+identity.number+'|'+sentences.join('\u241e');
  if(signature===lastSignature&&lines===lastLines&&target.querySelector('.storybook-page'))return;
  lastSignature=signature;lastLines=lines;
  const old=target.querySelector('.storybook-page');
  if(old)old.remove();

  const page=doc.createElement('article');page.className='storybook-page';
  page.setAttribute('aria-label','Story chapter — continuous reading');
  const intro=doc.createElement('div');intro.className='storybook-page-top';
  const eyebrow=doc.createElement('span');eyebrow.className='storybook-kicker';
  eyebrow.textContent='READ THE STORY · कथा पढ्नुहोस्';
  const count=doc.createElement('span');count.className='storybook-count';
  count.textContent='Chapter '+identity.number;
  intro.append(eyebrow,count);page.append(intro);

  const previously=remembered.get(identity.key);
  if(previously&&previously.number===identity.number-1&&previously.sentences.length){
   const recap=doc.createElement('aside');recap.className='storybook-recap';
   const label=doc.createElement('strong');label.textContent='Previously · अघिल्लो अध्यायमा';
   const info=doc.createElement('p');
   info.textContent=previously.sentences.slice(-2).join(' ');
   recap.append(label,info);page.append(recap);
  }

  const narrative=doc.createElement('div');narrative.className='storybook-prose';
  narrative.lang='en';
  const paragraphs=makeParagraphs(sentences);
  for(let i=0;i<paragraphs.length;i++){
   const p=doc.createElement('p');p.textContent=paragraphs[i];
   if(i===0)p.className='storybook-opening';
   narrative.append(p);
  }
  page.append(narrative);
  const end=doc.createElement('div');end.className='storybook-end';
  end.setAttribute('aria-hidden','true');end.textContent='✦  ✦  ✦';
  page.append(end);
  target.insertBefore(page,lines);

  let toggle=target.querySelector('.storybook-tools-toggle');
  if(!toggle){
   toggle=doc.createElement('button');toggle.type='button';
   toggle.className='storybook-tools-toggle';
   toggle.setAttribute('aria-controls','storybook-original-lines');
   toggle.addEventListener('click',()=>{
    const opened=target.dataset.storyToolsOpen==='true';
    target.dataset.storyToolsOpen=String(!opened);
    toggle.setAttribute('aria-expanded',String(!opened));
    toggle.textContent=!opened?
     'Hide sentence tools · बन्द गर्नुहोस्':
     '🔊 Listen & see Nepali · सुन्नुहोस् / नेपाली हेर्नुहोस्';
   });
  }
  lines.id='storybook-original-lines';
  target.dataset.storyToolsOpen='false';
  toggle.textContent='🔊 Listen & see Nepali · सुन्नुहोस् / नेपाली हेर्नुहोस्';
  toggle.setAttribute('aria-expanded','false');
  target.insertBefore(toggle,lines);

  remembered.set(identity.key,{number:identity.number,sentences:sentences.slice()});
 };
 const schedule=()=>{
  if(scheduled)return;scheduled=true;
  const raf=doc.defaultView.requestAnimationFrame;
  const run=()=>{scheduled=false;sync();};
  if(typeof raf==='function')raf.call(doc.defaultView,run);
  else doc.defaultView.setTimeout(run,0);
 };
 const observer=new doc.defaultView.MutationObserver(records=>{
  // Ignore our own presentation updates; native lesson changes still refresh.
  if(records.every(r=>
   r.target?.closest?.('.storybook-page')||
   r.target?.classList?.contains('storybook-tools-toggle')||
   r.target?.classList?.contains('storybook-recap')))return;
  schedule();
 });
 observer.observe(reader,{subtree:true,childList:true,characterData:true});
 sync();return true;
}
window.enhanceStorybookReading=install;
window.__sikauStorybookText={sentenceTexts,makeParagraphs,chapterIdentity};
})();