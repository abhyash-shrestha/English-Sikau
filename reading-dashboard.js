/* Reading redesign: native controls and their event listeners are preserved. */
(function(){
'use strict';
const url=new URL('./reading-dashboard.css?v=20261015-2',document.baseURI).href;
const mk=(d,t,c,s)=>{const x=d.createElement(t);if(c)x.className=c;if(s!=null)x.textContent=s;return x;};
window.enhanceReadingDashboard=function(d){
 const rd=d?.getElementById('rd'),content=rd?.querySelector(':scope > .content'),mode=d?.getElementById('readModeSeg'),box=d?.getElementById('rbox');
 if(!rd||!content||!mode||!box)return;
 if(!d.getElementById('sikauReadStyle')){const link=mk(d,'link');link.id='sikauReadStyle';link.rel='stylesheet';link.href=url;d.head.append(link);}
 rd.classList.add('sikau-read-v2');
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
   if(!reader||reader.dataset.readV2==='yes')return;
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
 }
 const observer=new d.defaultView.MutationObserver(()=>{organize();});
 observer.observe(box,{childList:true,subtree:false});
 organize();
};
})();