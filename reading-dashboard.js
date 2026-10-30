/* Reading redesign: native controls and their event listeners are preserved. */
(function(){
'use strict';
const url=new URL('./reading-dashboard.css?v=20261030-balanced-practice-r9',document.baseURI).href;
// The shared audio bridge is loaded once by the authenticated wrapper.
 // No per-tab script injections, duplicate speech handlers, or race conditions.

const mk=(d,t,c,s)=>{const x=d.createElement(t);if(c)x.className=c;if(s!=null)x.textContent=s;return x;};

/* English Sikau bilingual translation controls.
   Native Nepali flags show as a flag on Apple but can render as "NP" on Windows.
   Preserve the native button, its original text and its original click handler. */
const enhancedTranslationDocs=new WeakSet();
function installClearNepaliActions(d){
 if(!d?.body||enhancedTranslationDocs.has(d))return;
 enhancedTranslationDocs.add(d);
 const accessible='See Nepali · नेपाली हेर्नुहोस्';
 const priorLabels=new WeakMap();
 function nativeLabel(control){
   return String(control.matches('input')?control.value:(control.textContent||''))
     .replace(/[\u200B-\u200D\uFE0E\uFE0F]/g,'').replace(/\s+/g,' ').trim();
 }
 function isNepaliControl(control){
   const label=nativeLabel(control);
   // Do not replace English/audio actions or a sentence's own text.
   if(/^(?:NP|🇳🇵|नेपाली|Nepali|Click Garnus नेपालीमा)$/i.test(label))return true;
   if(control.matches('input')&&label===accessible)return true;
   const hint=(control.getAttribute('aria-label')||'')+' '+(control.getAttribute('title')||'');
   return !label && /(?:nepali|नेपाली)/i.test(hint) &&
     !!control.closest('.story-line,.reader-line,.reading-line,.practice-line');
 }
 function update(){
   for(const root of [d.getElementById('rd'),d.getElementById('learn')]){
     if(!root)continue;
     for(const control of root.querySelectorAll('button,[role="button"],input[type="button"],input[type="submit"],a[onclick]')){
       const native=isNepaliControl(control);
       if(native){
         if(!priorLabels.has(control))priorLabels.set(control,{
           aria:control.getAttribute('aria-label'),title:control.getAttribute('title')
         });
         if(!control.classList.contains('sikau-see-nepali'))control.classList.add('sikau-see-nepali');
         if(control.getAttribute('aria-label')!==accessible)control.setAttribute('aria-label',accessible);
         if(control.getAttribute('title')!==accessible)control.setAttribute('title',accessible);
         // Generated CSS text does not render on replaced input elements.
         if(control.matches('input')&&control.value!==accessible)control.value=accessible;
       }else if(control.classList.contains('sikau-see-nepali')){
         control.classList.remove('sikau-see-nepali');
         const prior=priorLabels.get(control);
         if(prior){
           if(prior.aria==null)control.removeAttribute('aria-label');
           else control.setAttribute('aria-label',prior.aria);
           if(prior.title==null)control.removeAttribute('title');
           else control.setAttribute('title',prior.title);
         }
       }
     }
     // Clear only the obsolete translation tips injected by earlier UI versions.
     // The bilingual "See Nepali" button now explains its own purpose.
     root.querySelectorAll('.sikau-translation-hint,.sikau-nepali-help').forEach(hint=>hint.remove());
     for(const hint of root.querySelectorAll('p,small,.course-small')){
       const text=(hint.textContent||'').trim();
       if(text.length<220&&(
          /^(?:🇳🇵\s*)?Tap the flag next to a sentence to see Nepali/i.test(text)||
          /^Tap [“"]See Nepali[”"] (?:beside a sentence|to read the Nepali meaning)/i.test(text)
       ))hint.remove();
     }
   }
 }
 let pending=false;
 const schedule=()=>{
   if(pending)return;
   pending=true;
   const view=d.defaultView;
   const render=()=>{pending=false;update();};
   if(typeof view?.requestAnimationFrame==='function')view.requestAnimationFrame(render);
   else render();
 };
 if(typeof d.defaultView?.MutationObserver==='function'){
   const observer=new d.defaultView.MutationObserver(schedule);
   observer.observe(d.body,{childList:true,subtree:true,characterData:true});
 }
 update();
}

function storyIdentity(box){
 const book=box.querySelector('[data-storybook].on')?.getAttribute('data-storybook');
 const level=box.querySelector('[data-storylevel].on')?.getAttribute('data-storylevel');
 const chapter=box.querySelector('#storyCurrentChapterTitle')?.textContent?.match(/Chapter\s+(\d+)/i)?.[1];
 return book&&level&&chapter?[book,level,chapter].join('|'):'';
}
function passedStoryResult(text){return /^\s*100\s*%/.test(String(text||''));}
function installReadingRepairs(d,box,accountId){
 if(box.dataset.sikauReadingRepairs)return;
 box.dataset.sikauReadingRepairs='1';
 const storageKey='sikau-story-passes-v1:'+encodeURIComponent(accountId||'session');
 let passes=new Set();
 try{const saved=JSON.parse(d.defaultView.localStorage.getItem(storageKey)||'[]');if(Array.isArray(saved))passes=new Set(saved.filter(x=>typeof x==='string').slice(-1000));}catch(_){}
 let quizKey='',checking='';
 const update=()=>{
  if(checking){
   const result=box.querySelector('#storyQuizResult');
   if(result&&passedStoryResult(result.textContent)&&checking===storyIdentity(box)){
    passes.add(checking);
    try{d.defaultView.localStorage.setItem(storageKey,JSON.stringify([...passes].slice(-1000)));}catch(_){}
   }
   checking='';
  }
  const key=storyIdentity(box),next=box.querySelector('#storyNext');
  if(next&&key){
   next.setAttribute('aria-describedby','sikauStoryGate');
   let note=box.querySelector('#sikauStoryGate');
   if(!note){note=mk(d,'p','story-mini');note.id='sikauStoryGate';next.parentElement.append(note);}
   const text=passes.has(key)?'✓ Chapter quiz passed · अध्यायको परीक्षा उत्तीर्ण भयो।':'Get 100% on this chapter’s quiz to continue · अर्को अध्यायका लागि यो परीक्षामा १००% ल्याउनुहोस्।';
   if(note.textContent!==text)note.textContent=text;
  }
  // Correct a generated question only when the passage explicitly says lives.
  const reading=box.querySelector('#rtext')||box;
  const passage=reading.textContent||'';
  for(const el of box.querySelectorAll('label,h3,h4,strong,p')){
   if(el.children.length)continue;
   const match=(el.textContent||'').trim().match(/^Where did ([A-Za-z]+) go\?$/);
   if(match&&new RegExp('\\b'+match[1]+' lives in [A-Za-z]+[.]').test(passage))el.textContent='Where does '+match[1]+' live?';
  }
 };
 box.addEventListener('click',event=>{
  const button=event.target.closest?.('button');if(!button)return;
  const key=storyIdentity(box);
  if(button.id==='storyQuiz')quizKey=key;
  if(button.id==='storyCheckQuiz'){
   if(quizKey&&quizKey===key)checking=key;
   (d.defaultView.requestAnimationFrame||d.defaultView.setTimeout)(update);
  }
  if((button.id==='storyNext'||button.id==='storyQuizContinue')&&key&&!passes.has(key)){
   event.preventDefault();event.stopImmediatePropagation();
   quizKey=key;box.querySelector('#storyQuiz')?.click();update();
   box.querySelector('#storyQuizForm')?.scrollIntoView?.({block:'nearest',behavior:'smooth'});
  }
 },true);
 let pending=false;
 const observer=new d.defaultView.MutationObserver(()=>{
  if(pending)return;pending=true;
  (d.defaultView.requestAnimationFrame||d.defaultView.setTimeout)(()=>{pending=false;update();});
 });
 observer.observe(box,{childList:true,subtree:true,characterData:true});update();
}
/* Remove the obsolete Nepal English Corner accordion only from the Read tab.
   Its content duplicates the bilingual lessons and distracts from Practice/Story. */
function installReadCornerCleanup(d){
 const rd=d?.getElementById?.('rd');
 if(!rd||rd.dataset.sikauCornerRemoved==='1')return;
 rd.dataset.sikauCornerRemoved='1';
 const obsolete=/Nepal\s*English\s*Corner|नेपालसँग\s*जोडिएको\s*अंग्रेजी/iu;
 const cleanup=()=>{
  for(const summary of rd.querySelectorAll('details > summary,summary')){
   if(!obsolete.test(summary.textContent||''))continue;
   const details=summary.closest('details');
   if(details&&rd.contains(details))details.remove();
  }
 };
 cleanup();
 if(typeof d.defaultView?.MutationObserver==='function'){
  const observer=new d.defaultView.MutationObserver(records=>{
   if(records.some(r=>r.addedNodes?.length))cleanup();
  });
  observer.observe(rd,{childList:true,subtree:true});
 }
}
window.enhanceReadingDashboard=function(d,accountId){
 if(d?.body)window.enhanceUnifiedSpeech?.(d);
 installClearNepaliActions(d);
 window.enhancePracticeBilingualReading?.(d);
 const rd=d?.getElementById('rd'),content=rd?.querySelector(':scope > .content'),mode=d?.getElementById('readModeSeg'),box=d?.getElementById('rbox');
 installReadCornerCleanup(d);
 if(!rd||!content||!mode||!box)return;
 installReadingRepairs(d,box,accountId);
 if(!d.getElementById('sikauReadStyle')){const link=mk(d,'link');link.id='sikauReadStyle';link.rel='stylesheet';link.href=url;d.head.append(link);}
 rd.classList.add('sikau-read-v2','sikau-read-exact');
 // Balance the original New reading / topic / easier / harder controls.
 window.enhanceReadActionRow?.(d);
 if(!content.querySelector('.read-v2-hero')){
   const hero=mk(d,'section','read-v2-hero');
   const copy=mk(d,'div','read-v2-copy');
   copy.append(mk(d,'h1','', 'Read & Learn'),mk(d,'h2','','पढौं र सिकौं'),mk(d,'p','','Read stories and answer questions to improve your English.'),mk(d,'p','','कथाहरू पढेर प्रश्नहरूको उत्तर दिँदै आफ्नो अंग्रेजी सुधार्नुहोस्।'));
   hero.append(copy);
   content.insertBefore(hero,content.firstChild);
   mode.classList.add('read-v2-mode');
   // Decorate the *existing* private-lesson buttons: do not replace buttons
   // or their click handlers, which select the lesson's real reading mode.
   mode.setAttribute('aria-label','Choose how to read · पढ्ने तरिका छान्नुहोस्');
   for(const b of mode.querySelectorAll('button[data-rm]')){
     const story=b.dataset.rm==='story';
     const title=story?'Story mode · कथा पढौं':'Practice mode · अभ्यास';
     const detail=story?'Chapter books & quizzes · अध्यायबद्ध कथा र प्रश्नोत्तर':
       'Short passages & quick questions · छोटो पाठ र अभ्यास प्रश्न';
     const icon=mk(d,'span','read-mode-card-icon',story?'📖':'📝');
     icon.setAttribute('aria-hidden','true');
     const copy=mk(d,'span','read-mode-card-copy');
     copy.append(mk(d,'strong','read-mode-card-title',title),
       mk(d,'span','read-mode-card-description',detail));
     const arrow=mk(d,'span','read-mode-card-arrow','›');
     arrow.setAttribute('aria-hidden','true');
     b.replaceChildren(icon,copy,arrow);
     b.classList.add('read-mode-card');
     b.setAttribute('aria-label',title+'. '+detail);
     b.setAttribute('title',detail);
   }
   const syncModeState=()=>{
     for(const b of mode.querySelectorAll('button[data-rm]'))
       b.setAttribute('aria-pressed',String(b.classList.contains('on')));
   };
   syncModeState();
   if(typeof d.defaultView?.MutationObserver==='function'){
     const modeObserver=new d.defaultView.MutationObserver(syncModeState);
     for(const b of mode.querySelectorAll('button[data-rm]'))
       modeObserver.observe(b,{attributes:true,attributeFilter:['class']});
   }
 }

 function organize(){
   const reader=box.querySelector('#storyReader');
   if(!reader)return;
   if(reader.dataset.readV2==='yes')return;
   const topic=reader.querySelector('.story-topic-list'),levels=reader.querySelector('.story-level-list'),books=reader.querySelector('.story-book-list'),img=reader.querySelector('.story-hero'),lines=reader.querySelector('.story-lines'),actions=reader.querySelector('.story-actions');
   if(!topic||!levels||!books||!img||!lines||!actions)return;
   reader.dataset.readV2='yes';
   const topicHeading=topic.previousElementSibling;
   const firstLib=reader.querySelector('.story-library-head'),secondLib=books.previousElementSibling;
   const now=reader.querySelector('.story-mini:not(:first-child)');
   const chapterTitle=reader.querySelector('#storyCurrentChapterTitle');
   const word=reader.querySelector('#storyWordMeaning');
   const dots=reader.querySelector('.story-dots');
   const divider=reader.querySelector('.story-divider');
   const layout=mk(d,'div','read-v2-layout');
   const filters=mk(d,'section','read-v2-filters');
   const selection=mk(d,'section','read-v2-selection');
   const view=mk(d,'section','read-v2-reading');
   const storyInfo=mk(d,'div','read-v2-storyinfo');
   const picture=mk(d,'div','read-v2-picture');
   const sentences=mk(d,'div','read-v2-sentences');
   const topicLabel=mk(d,'h3','','Choose a story topic · कथा विषय छान्नुहोस्');
   filters.append(topicLabel,topic);
   filters.append(mk(d,'h3','','Select level · स्तर छान्नुहोस्'));
   if(firstLib)filters.append(firstLib);
   filters.append(levels);
   selection.append(mk(d,'h3','','Choose a story · कथा छान्नुहोस्'));
   if(secondLib)selection.append(secondLib);
   selection.append(books);
   const nearImg=img.previousElementSibling;
   picture.append(img);
   if(nearImg&&nearImg!==divider&&nearImg!==dots&&nearImg!==chapterTitle)storyInfo.append(nearImg);
   if(dots)picture.append(dots);
   if(chapterTitle)storyInfo.append(chapterTitle);
   sentences.append(lines);
   if(word)sentences.append(word);
   view.append(picture,storyInfo,sentences,actions);
   layout.append(filters,selection,view);
   reader.append(layout);


   const selectedTopic=reader.querySelector('[data-storytopic].on')?.getAttribute('data-storytopic')||'adventure';
   const allowed=['adventure','mystery','friendship','school','family','animals','travel','food','science','fantasy','culture','kindness'];
   const themeId=allowed.includes(selectedTopic)?selectedTopic:'adventure';
   const pictureURL=new URL('./assets/read-topics/'+themeId+'.svg',document.baseURI).href;
   for(const button of reader.querySelectorAll('[data-storytopic]')){
     const id=button.getAttribute('data-storytopic');
     if(!allowed.includes(id))continue;
     button.classList.add('read-art-topic');
     button.style.setProperty('--read-topic-image','url("'+new URL('./assets/read-topics/'+id+'.svg',document.baseURI).href+'")');
   }
   const cover=reader.querySelector('.read-v2-picture img.story-hero');
   if(cover){
     const title=reader.querySelector('.story-book.on .story-book-text b')?.textContent||'';
     cover.src=themeId==='culture'&&/tihar/i.test(title)?new URL('./assets/tihar-story-cover.svg',document.baseURI).href:pictureURL;
     cover.alt='Illustration for '+(title||themeId)+' story';
   }
   for(const button of reader.querySelectorAll('.story-book')){
     const icon=button.querySelector('.story-book-ico');
     if(!icon)continue;
     const bookID=button.dataset.storybook||'';
     const sceneID=Number(bookID.split('-').pop())||0;
     icon.classList.add('read-exact-thumb','read-topic-cover');
     icon.style.setProperty('--read-cover','url("'+(themeId==='culture'&&/tihar/i.test(button.textContent)?new URL('./assets/tihar-story-cover.svg',document.baseURI).href:pictureURL)+'")');
     icon.style.setProperty('--read-position',(15+(sceneID*11)%70)+'%');
   }
   reader.querySelector('.read-v2-storyinfo h2')?.classList.add('read-exact-current-title');
   // Preserve the native story/quiz UI; show connected prose in a separate book page.
   window.enhanceStorybookReading?.(d,reader);
   // Open a complete, authored book alongside the native story library.
   window.enhanceFeaturedBilingualStory?.(d,reader,accountId);

 }
 const observer=new d.defaultView.MutationObserver(()=>{organize();});
 observer.observe(box,{childList:true,subtree:false});
 organize();
};
})();
