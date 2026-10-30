/* Reading redesign: native controls and their event listeners are preserved. */
(function(){
'use strict';
const url=new URL('./reading-dashboard.css?v=20261021-dark-contrast-r1',document.baseURI).href;
 // Load the shared voice selector once in the authenticated lesson, so
 // both Reading's native player and Translate's Listen button see it.
 const voiceBridge=new URL('./nepali-voice-bridge.js?v=20261030-single-voice-r2',document.baseURI).href;
 let voiceScriptLoading=null;
 function ensureVoiceBridge(d){
  if(typeof window.enhanceNepaliSpeechVoices==='function'){
   window.enhanceNepaliSpeechVoices(d);return;
  }
  if(!voiceScriptLoading){
   voiceScriptLoading=new Promise(resolve=>{
    const tag=document.createElement('script');
    tag.src=voiceBridge;
    tag.async=true;
    tag.onload=()=>resolve(true);
    tag.onerror=()=>resolve(false);
    document.head.appendChild(tag);
   });
  }
  voiceScriptLoading.then(ready=>{
   if(ready)window.enhanceNepaliSpeechVoices?.(d);
  });
 }

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

window.enhanceReadingDashboard=function(d){
 if(d?.body)ensureVoiceBridge(d);
 installClearNepaliActions(d);
 const rd=d?.getElementById('rd'),content=rd?.querySelector(':scope > .content'),mode=d?.getElementById('readModeSeg'),box=d?.getElementById('rbox');
 if(!rd||!content||!mode||!box)return;
 if(!d.getElementById('sikauReadStyle')){const link=mk(d,'link');link.id='sikauReadStyle';link.rel='stylesheet';link.href=url;d.head.append(link);}
 rd.classList.add('sikau-read-v2','sikau-read-exact');
 if(!content.querySelector('.read-v2-hero')){
   const hero=mk(d,'section','read-v2-hero');
   const copy=mk(d,'div','read-v2-copy');
   copy.append(mk(d,'h1','', 'Read & Learn'),mk(d,'h2','','पढौं र सिकौं'),mk(d,'p','','Read stories and answer questions to improve your English.'),mk(d,'p','','कथाहरू पढेर प्रश्नहरूको उत्तर दिँदै आफ्नो अंग्रेजी सुधार्नुहोस्।'));
   hero.append(copy);
   content.insertBefore(hero,content.firstChild);
   mode.classList.add('read-v2-mode');
   const orig=mode.parentElement;
   // Keep mode buttons exactly as the original app created them.
   for(const b of mode.querySelectorAll('button[data-rm]')){
     const story=b.dataset.rm==='story';
     b.textContent=story?'📖 Story mode · कथा पढौं':'📋 Practice mode · अभ्यास';
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

 }
 const observer=new d.defaultView.MutationObserver(()=>{organize();});
 observer.observe(box,{childList:true,subtree:false});
 organize();
};
})();