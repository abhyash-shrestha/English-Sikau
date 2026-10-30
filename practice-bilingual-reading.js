/* English Sikau Reading > Practice: render native lesson sentences as
 * English/Nepali pairs with two speech buttons. All original lesson data,
 * authentication, selection controls, quizzes and progress remain native. */
(function(){
'use strict';
const clean=x=>String(x||'').replace(/\s+/g,' ').trim();
const nep=/[\u0900-\u097f]/u;
const translationSelectors=[
 '.nd','.nepali-translation','.nepali-text','.nepali','.np-text',
 '.reading-nepali','.practice-nepali','.translation-ne','.r-nepali',
 '[lang="ne"]','[lang="ne-NP"]','[data-nepali]','[data-translation]',
 '[data-ne]','.rnp','.np','.rn','.ne','.ne-text','.rtranslation'
].join(',');
const mk=(doc,tag,cls,value)=>{
 const el=doc.createElement(tag);if(cls)el.className=cls;
 if(value!==undefined)el.textContent=value;
 return el;
};
const visible=el=>!el?.closest?.('.sikau-practice-bilingual,.sikau-practice-navigation');
const isNepaliControl=b=>{
 const value=clean([b?.textContent,b?.value,b?.getAttribute?.('aria-label'),b?.getAttribute?.('title')].join(' '));
 return /sikau-see-nepali/.test(String(b?.className||''))||
  /(?:see nepali|नेपाली हेर्नुहोस्|नेपालीमा|click garnus|^NP$|🇳🇵)/iu.test(value);
};
const isAudioControl=b=>/speaker|🔊|🔉|🔈|listen|play audio|speak/iu.test(
 String(b?.className||'')+' '+clean(b?.textContent||'')+' '+clean(b?.getAttribute?.('aria-label')||'')
);
function textFromSource(source){
 const copy=source.cloneNode?.(true);
 if(!copy)return clean(source.textContent||'');
 copy.querySelectorAll?.('button,input,[role="button"],.speaker,.sikau-see-nepali,'+
  translationSelectors+',svg').forEach(x=>x.remove());
 const value=clean(copy.textContent||'');
 return nep.test(value)&&!/[A-Za-z]{2}/.test(value)?'':value;
}
function readingLine(source,scope){
 const selector='.practice-line,.reading-line,.reader-line,.read-line,.rl,.rline,.r-row,.reading-row,.sentence-line,li';
 const found=source.closest?.(selector);
 if(found&&scope.contains(found)&&found.querySelectorAll('.rs').length===1)return found;
 let candidate=source.parentElement||source;
 let parent=candidate,depth=0;
 while(parent&&parent!==scope&&depth++<4){
  if(parent.querySelectorAll('.rs').length!==1)break;
  const buttons=Array.from(parent.querySelectorAll('button,input[type="button"],[role="button"]'));
  if(buttons.some(isNepaliControl))return parent;
  if(parent.querySelector('h2,h3,h4,form,[id*="quiz" i]'))break;
  candidate=parent;parent=parent.parentElement;
 }
 return candidate;
}
function candidatesIn(rd){
 const raw=Array.from(rd.querySelectorAll('.rs'))
  .filter(node=>visible(node)&&!node.closest('#storyReader,.story-line,#storyQuizBox,.read-v2-layout'));
 // Prefer known private passage containers, but never require one specific ID.
 const container=rd.querySelector('#rtext')||
  raw[0]?.closest('#readingText,#readingBody,.reading-text,.reading-body,.rbody,.reading-passage,.card')||rd;
 const elements=raw.filter(x=>container.contains(x));
 const seen=new Set(),results=[];
 for(const source of elements){
  const row=readingLine(source,container);
  if(!row||seen.has(row)||row.querySelectorAll('.rs').length>1)continue;
  seen.add(row);results.push({source,row});
 }
 return results.slice(0,80);
}
function translationFrom(entry){
 const row=entry.row;
 const extract=node=>{
  if(!node||node.matches?.('button,input,label,a,[role="button"]'))return '';
  if(node.closest?.('button,label,[role="button"],.sikau-practice-bilingual'))return '';
  if(node.querySelector?.('button,input[type="button"],[role="button"]'))return '';
  const data=node.getAttribute?.('data-nepali')||
   node.getAttribute?.('data-translation')||node.getAttribute?.('data-ne');
  const value=clean(data||node.textContent);
  if(!nep.test(value)||value.length>500||value===entry.english||
   /(?:see nepali|नेपाली हेर्नुहोस्|अनुवाद हेर्नुहोस्)/iu.test(value))return '';
  return value;
 };
 for(const el of row.querySelectorAll?.(translationSelectors)||[]){
  const txt=extract(el);if(txt)return txt;
 }
 for(const el of row.querySelectorAll?.('span,p,small,div')||[]){
  if(el.querySelector?.('span,p,small,div'))continue;
  const txt=extract(el);if(txt)return txt;
 }
 const sourceNow=clean(entry.source.textContent);
 if(nep.test(sourceNow)&&sourceNow!==entry.english&&sourceNow.length<500)return sourceNow;
 const sibling=row.nextElementSibling;
 if(sibling?.matches?.(translationSelectors)){const txt=extract(sibling);if(txt)return txt;}
 return '';
}
function install(doc){
 const rd=doc?.getElementById?.('rd'),mode=doc?.getElementById?.('readModeSeg');
 if(!rd||!mode||!doc.defaultView)return false;
 if(rd.dataset.sikauPracticeBilingual==='2')return true;
 rd.dataset.sikauPracticeBilingual='2';
 const win=doc.defaultView;
 if(!doc.getElementById('sikauPracticeBilingualCSS')){
  const link=mk(doc,'link');link.id='sikauPracticeBilingualCSS';link.rel='stylesheet';
  link.href=new URL('./practice-bilingual-reading.css?v=20261030-native-pairs-r2',document.baseURI).href;
  doc.head.append(link);
 }
 const priorEnglish=new WeakMap(),revealed=new WeakSet();
 let panel=null,previousRows=[],signature='',busy=false,pending=false;
 let nav=null;
 const inPractice=()=>!!mode.querySelector('button[data-rm="practice"].on');
 const unhideRows=()=>{for(const row of previousRows)row.classList.remove('sikau-practice-source-hidden');previousRows=[];};
 const speak=(text,lang)=>{
  if(typeof win.__sikauSpeech==='function')win.__sikauSpeech(text,lang,'rd',{rate:0.94});
  else if(typeof win.__sikauNepaliVoice?.speakText==='function')
   win.__sikauNepaliVoice.speakText(text,lang,'rd',{rate:0.94});
  else if(typeof win.speechSynthesis?.speak==='function'&&typeof win.SpeechSynthesisUtterance==='function'){
   const msg=new win.SpeechSynthesisUtterance(text);msg.lang=lang;msg.rate=0.94;
   win.speechSynthesis.cancel();win.speechSynthesis.speak(msg);
  }
 };
 const speakerButton=(label,lang,entry)=>{
  const b=mk(doc,'button','sikau-practice-listen',label);
  b.type='button';b.setAttribute('aria-label',lang==='ne-NP'?'Listen in Nepali':'Listen in English');
  b.addEventListener('click',()=>{
   if(lang==='en-US'&&entry.audio){entry.audio.click();return;}
   speak(lang==='ne-NP'?entry.nepali:entry.english,lang);
  });
  return b;
 };
 const nativeNav=()=>{
  const all=Array.from(rd.querySelectorAll('button'))
   .filter(b=>visible(b)&&!b.closest('.sikau-practice-navigation'));
  const text=b=>clean([b.textContent,b.getAttribute('aria-label')].join(' '));
  return [
   {key:'topic',label:'🔀 Change topic · विषय बदल्नुहोस्',
    help:'Choose something new · नयाँ विषय छान्नुहोस्',
    button:all.find(b=>/change topic|विषय बदल/i.test(text(b)))},
   {key:'down',label:'↓ Easier level · सजिलो तह',
    help:'Level down · स्तर घटाउनुहोस्',
    button:all.find(b=>/level down|स्तर घट|level lower/i.test(text(b)))},
   {key:'up',label:'↑ Harder level · गाह्रो तह',
    help:'Level up · स्तर बढाउनुहोस्',
    button:all.find(b=>/level up|स्तर बढ|level higher/i.test(text(b)))}
  ];
 };
 const renderNav=()=>{
  if(!inPractice()){if(nav)nav.hidden=true;return;}
  const actions=nativeNav();
  if(actions.every(a=>!a.button)){if(nav)nav.hidden=true;return;}
  if(!nav){
   nav=mk(doc,'section','sikau-practice-navigation');
   nav.setAttribute('aria-label','Practice level and topic controls');
   const intro=mk(doc,'div','sikau-practice-nav-intro');
   intro.append(mk(doc,'h3','','Choose your next practice · अर्को अभ्यास छान्नुहोस्'),
    mk(doc,'p','','Tap a button to change the topic or difficulty · विषय वा कठिनाइ बदल्न तलको बटन थिच्नुहोस्।'));
   nav.append(intro);
   const buttons=mk(doc,'div','sikau-practice-nav-buttons');
   nav.append(buttons);
   mode.parentElement.insertBefore(nav,mode.nextSibling);
  }
  nav.hidden=false;
  const target=nav.querySelector('.sikau-practice-nav-buttons');
  const current=actions.map(a=>a.key+':'+(a.button?'1':'0')).join('|');
  if(target.dataset.keys===current)return;
  target.dataset.keys=current;target.replaceChildren();
  for(const action of actions){
   if(!action.button)continue;
   const button=mk(doc,'button','sikau-practice-nav-action');
   button.type='button';
   button.append(mk(doc,'strong','',action.label),mk(doc,'span','',action.help));
   button.addEventListener('click',()=>{action.button.click();schedule();});
   target.append(button);
  }
 };
 const render=()=>{
  renderNav();
  if(!inPractice()){
   if(panel)panel.hidden=true;
   unhideRows();signature='';
   return;
  }
  const raw=candidatesIn(rd);
  if(!raw.length){if(panel)panel.hidden=true;unhideRows();signature='';return;}
  const entries=raw.map(({source,row})=>{
   let english=textFromSource(source);
   if(english&&/[A-Za-z]{2}/.test(english))priorEnglish.set(source,english);
   else english=priorEnglish.get(source)||'';
   const controls=Array.from(row.querySelectorAll('button,input[type="button"],[role="button"]'));
   const nativeNe=controls.find(isNepaliControl)||null;
   const audio=controls.find(b=>b!==nativeNe&&isAudioControl(b))||null;
   return {source,row,english,nativeNe,audio,nepali:''};
  }).filter(e=>e.english&&/[A-Za-z]{2}/.test(e.english));
  if(!entries.length){if(panel)panel.hidden=true;unhideRows();signature='';return;}
  for(const e of entries)e.nepali=translationFrom(e);
  // Always attempt native translation automatically. Never fabricate answers.
  for(const e of entries){
   if(e.nepali||!e.nativeNe||revealed.has(e.nativeNe))continue;
   revealed.add(e.nativeNe);
   try{e.nativeNe.click();}catch(_){}
  }
  for(const e of entries)if(!e.nepali)e.nepali=translationFrom(e);
  const nextSignature=entries.map(e=>e.english+'\u241f'+e.nepali).join('\u241e');
  const sameRows=entries.length===previousRows.length&&entries.every((e,i)=>e.row===previousRows[i]);
  if(panel&&!panel.hidden&&nextSignature===signature&&sameRows)return;
  busy=true;
  try{
   if(!panel){
    panel=mk(doc,'section','sikau-practice-bilingual');
    panel.setAttribute('aria-label','English and Nepali reading practice');
   }
   // Insert immediately before the first *real* sentence, whether or not the
   // protected lesson exposes a #rtext container.
   const first=entries[0].row;
   if(first.parentElement){
    if(panel.parentElement!==first.parentElement||panel.nextSibling!==first)
     first.parentElement.insertBefore(panel,first);
   }else return;
   panel.replaceChildren();
   const head=mk(doc,'div','sikau-practice-bilingual-heading');
   head.append(mk(doc,'h3','','English + Nepali · अंग्रेजी + नेपाली'),
    mk(doc,'p','','Listen in both languages · दुवै भाषामा सुन्नुहोस्'));
   panel.append(head);
   const pairs=mk(doc,'div','sikau-practice-bilingual-pairs');
   for(const e of entries){
    const pair=mk(doc,'article','sikau-practice-pair');
    const en=mk(doc,'div','sikau-practice-english');
    const ne=mk(doc,'div','sikau-practice-nepali');
    en.lang='en-US';ne.lang='ne-NP';
    const enHead=mk(doc,'div','sikau-practice-language-heading');
    enHead.append(mk(doc,'strong','','English'),speakerButton('🔊 Listen','en-US',e));
    en.append(enHead,mk(doc,'p','sikau-practice-sentence',e.english));
    const neHead=mk(doc,'div','sikau-practice-language-heading');
    neHead.append(mk(doc,'strong','','नेपाली'));
    if(e.nepali)neHead.append(speakerButton('🔊 सुन्नुहोस्','ne-NP',e));
    ne.append(neHead);
    if(e.nepali)ne.append(mk(doc,'p','sikau-practice-translation',e.nepali));
    else if(e.nativeNe){
     const reveal=mk(doc,'button','sikau-practice-translation-fallback','नेपाली अनुवाद देखाउनुहोस्');
     reveal.type='button';
     reveal.addEventListener('click',()=>{e.nativeNe.click();signature='';schedule();});
     ne.append(reveal);
    }else ne.append(mk(doc,'p','sikau-practice-translation-missing','नेपाली अनुवाद उपलब्ध छैन।'));
    pair.append(en,ne);pairs.append(pair);
   }
   panel.append(pairs);panel.hidden=false;
   unhideRows();
   previousRows=entries.map(e=>e.row);
   for(const row of previousRows)row.classList.add('sikau-practice-source-hidden');
   signature=nextSignature;
  }finally{busy=false;}
 };
 function schedule(){
  if(pending)return;
  pending=true;
  const done=()=>{pending=false;render();};
  if(typeof win.requestAnimationFrame==='function')win.requestAnimationFrame(done);
  else if(typeof win.setTimeout==='function')win.setTimeout(done,0);
  else done();
 }
 if(typeof win.MutationObserver==='function'){
  const observer=new win.MutationObserver(records=>{
   if(busy)return;
   if(records.every(r=>r.target?.closest?.('.sikau-practice-bilingual,.sikau-practice-navigation')))return;
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
window.__sikauPracticeBilingualInternals={candidatesIn,readingLine,translationFrom};
})();