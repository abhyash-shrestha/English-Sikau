/* English Sikau · consistent learner display language.
 * Works inside the authorized lesson iframe only. Never translates user input,
 * changes answers/scoring, submits data, or touches payment/access state.
 * Devanagari DOM text remains unchanged; Roman is CSS generated content.
 */
(function(){
 'use strict';
 const d=document,h=d.documentElement;
 const select=d.getElementById('langPref');
 if(!select||h.dataset.sikauLangBridge==='2')return;
 h.dataset.sikauLangBridge='2';
 const modes=new Set(['en-ne','en-roman','all','en']);
 const names={
  'en-ne':'English + नेपाली',
  'en-roman':'English + Roman Nepali',
  all:'English + नेपाली + Roman',
  en:'English only'
 };
 const STORE='sikau_lang_pref';
 const consonants={क:'k',ख:'kh',ग:'g',घ:'gh',ङ:'ng',च:'ch',छ:'chh',ज:'j',झ:'jh',ञ:'ny',ट:'t',ठ:'th',ड:'d',ढ:'dh',ण:'n',त:'t',थ:'th',द:'d',ध:'dh',न:'n',प:'p',फ:'ph',ब:'b',भ:'bh',म:'m',य:'y',र:'r',ल:'l',व:'w',श:'sh',ष:'sh',स:'s',ह:'h',क्ष:'ksh',ज्ञ:'gy'};
 const vowels={अ:'a',आ:'aa',इ:'i',ई:'ee',उ:'u',ऊ:'oo',ऋ:'ri',ए:'e',ऐ:'ai',ओ:'o',औ:'au'};
 const marks={'ा':'a','ि':'i','ी':'ee','ु':'u','ू':'oo','ृ':'ri','े':'e','ै':'ai','ो':'o','ौ':'au','ॅ':'e','ॉ':'o'};
 const dictionary={
  'नमस्ते':'namaste','मेरो':'mero','हाम्रो':'hamro','कक्षा':'kaksha','अभ्यास':'Abhyash',
  'अंग्रेजी':'angreji','नेपाली':'nepali','शब्दहरू':'shabdaharu','अनुवाद':'anuwad',
  'लेखन':'lekhan','खेल':'khel','प्रगति':'pragati','बोल्ने':'bolne','बोल्नुहोस्':'bolnuhos',
  'पढ्नुहोस्':'padhnuhos','हेर्नुहोस्':'hernuhos','सिक्नुहोस्':'siknuhos','सिकौं':'sikaun',
  'भाषा':'bhasha','अमेरिकी':'ameriki','भिसा':'visa','अन्तर्वार्ता':'antarbarta',
  'मेरो':'mero','किताब':'kitab','पढ्ने':'padhne','सिकाइ':'sikai','चाडपर्व':'chadparva',
  'महोत्सव':'mahotsav','तिहार':'tihar','छठ':'chhath','दशैं':'dashain','आगामी':'aagami',
  'खोज्नुहोस्':'khojnuhos','आज':'aaja','भोलि':'bholi','तपाईंको':'tapainko','तपाईंलाई':'tapainlai',
  'तपाईंले':'tapainle','तपाईं':'tapain','मलाई':'malai','म':'ma','तपाइँ':'tapain',
  'नयाँ':'naya','वर्ष':'barsha','र':'ra','यो':'yo','के':'ke','छ':'chha','छन्':'chhan',
  'हुन्छ':'hunchha','छैन':'chhaina','ठीक':'thik','धन्यवाद':'dhanyabad','स्वागत':'swagat',
  'गर्नुहोस्':'garnuhos','गर्न':'garna','जानुहोस्':'januhos','सोध्नुहोस्':'sodhnuhos',
  'उत्तर':'uttar','प्रश्न':'prashna','सही':'sahi','गलत':'galat','अर्को':'arko','पछाडि':'pachhadi',
  'अगाडि':'agadi','फेरि':'pheri','सुरु':'suru','समाप्त':'samapta','अभ्यासहरू':'Abhyashharu',
  'साथी':'sathi','परिवार':'pariwar','शुभकामना':'shubhakamana','अधिक':'adhik',
  'बुझ्नुहोस्':'bujhnuhos','थप':'thap','सजिलो':'sajilo','कठिन':'kathin',
  'रकम':'rakam','मूल्य':'mulya','रुपैयाँ':'rupaiyan','कृपया':'kripaya',
  'ट्याब':'tab','ट्याबहरू':'tabharu','विकल्प':'bikalpa','दुवै':'duwai',
  'बोल्नु':'bolnu','अन्य':'anya','पहिलो':'pahilo','समय':'samaya','दिन':'din'
 };
 const hasNe=/[\u0900-\u097f]/;
 const skip='script,style,noscript,template,svg,math,textarea,input,select,option,[contenteditable],[data-norz],.sikau-lang-token,.sikau-lang-roman,.roman,[lang="ne-Latn"]';
 function romanize(part){
  // Roman Nepali is a phonetic rendering of Nepali, not an English translation.
  return String(part).replace(/[\u0900-\u0963\u0966-\u097f]+|[।॥]/g,word=>{
   if(dictionary[word])return dictionary[word];
   let out='';
   const chars=Array.from(word);
   for(let i=0;i<chars.length;i++){
    const ch=chars[i],next=chars[i+1];
    if(ch==='क'&&next==='्'&&chars[i+2]==='ष'){out+='ksh';i+=2;continue;}
    if(ch==='ज'&&next==='्'&&chars[i+2]==='ञ'){out+='gy';i+=2;continue;}
    if(Object.hasOwn(consonants,ch)){
     out+=consonants[ch];
     if(Object.hasOwn(marks,next)){out+=marks[next];i++;}
     else if(next==='्'){i++;}
     else if(next&&hasNe.test(next)&&!/[ंँः]/.test(next))out+='a';
     else if(!next)out+='a';
    }else if(Object.hasOwn(vowels,ch))out+=vowels[ch];
    else if(ch==='ं'||ch==='ँ')out+='n';
    else if(ch==='ः')out+='h';
    else if(ch==='।')out+='.';
    else if(ch==='॥')out+='..';
    else if(ch>='०'&&ch<='९')out+=String(ch.charCodeAt(0)-2406);
    else if(ch==='्'||ch==='़'||ch==='\u200c'||ch==='\u200d'){}
    else if(Object.hasOwn(marks,ch))out+=marks[ch];
    else out+=ch;
   }
   return out;
  });
 }
 const sheet=d.createElement('style');
 sheet.id='sikau-lang-bridge-style';
 sheet.textContent=[
  // Every Devanagari token uses the original textContent in the DOM. Its
  // visible Roman form comes from an attribute/pseudo-element only.
  'html[data-sikau-display-language="en"] .sikau-lang-token{display:none!important}',
  'html[data-sikau-display-language="en-roman"] .sikau-lang-token{font-size:0!important;line-height:0!important;letter-spacing:0!important;white-space:normal!important;vertical-align:baseline!important}',
  'html[data-sikau-display-language="en-roman"] .sikau-lang-token::after{content:attr(data-sikau-roman)!important;display:inline!important;font-size:var(--sikau-roman-size,14px)!important;font-family:inherit!important;letter-spacing:normal!important;line-height:1.45!important;vertical-align:baseline!important;white-space:normal!important;overflow-wrap:anywhere!important}',
  'html[data-sikau-display-language="all"] .sikau-lang-token::after{content:" · " attr(data-sikau-roman)!important;display:inline!important;font-size:clamp(11px,.82em,17px)!important;font-family:inherit!important;line-height:1.4!important;letter-spacing:normal!important;white-space:normal!important;overflow-wrap:anywhere!important;vertical-align:baseline!important}',
  // Roman modes must wrap within mobile cards/buttons rather than overlap.
  'html:is([data-sikau-display-language="en-roman"],[data-sikau-display-language="all"]) :is(.sikau-chat-message-body,.sikau-chat-option-copy,.sikau-convo-situation,.sikau-convo-stage,.sikau-ui-intro-copy,.sikau-home-intro,.sikau-festival-preview,.sikau-future-festival,.sikau-visa-main,.content,.nav,.sikau-convo){min-width:0!important;overflow-wrap:anywhere!important}',
  'html:is([data-sikau-display-language="en-roman"],[data-sikau-display-language="all"]) :is(.sikau-convo-situation,.sikau-chat-option,.sikau-festival-preview,.sikau-ui-intro){height:auto!important}',
  // Compact navigation has fixed-width touch targets. Never squeeze 2–3 labels
  // into one nav button; full language display remains in lesson content.
  '@media(max-width:767px){',
  'html:is([data-sikau-display-language="en-roman"],[data-sikau-display-language="all"]) #mobileModes.nav :is(.sikau-nav-word small,.sikau-home-nav-label small,.sikau-visa-nav-word small,.roman,.sikau-lang-roman,.sikau-lang-ne){display:none!important}',
  'html:is([data-sikau-display-language="en-roman"],[data-sikau-display-language="all"]) #mobileModes.nav .sikau-lang-token{display:none!important}',
  'html:is([data-sikau-display-language="en-roman"],[data-sikau-display-language="all"]) #mobileModes.nav button{min-width:0!important;overflow:hidden!important}',
  'html:is([data-sikau-display-language="en-roman"],[data-sikau-display-language="all"]) #mobileModes.nav :is(.sikau-nav-word,.sikau-home-nav-label,.sikau-visa-nav-word){min-width:0!important;max-width:100%!important;overflow:hidden!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important}',
  'html:is([data-sikau-display-language="en-roman"],[data-sikau-display-language="all"]) #mobileModes.nav :is(.sikau-nav-word strong,.sikau-home-nav-label strong,.sikau-visa-nav-word strong){white-space:normal!important;overflow-wrap:normal!important;text-align:center!important;line-height:1.12!important}',
  // Classroom label cannot hold the original Nepali plus two Roman copies
  // beside language controls. Its full accessible name is preserved separately.
  'html:is([data-sikau-display-language="en-roman"],[data-sikau-display-language="all"]) .sikau-personal-classroom{font-size:0!important;white-space:nowrap!important;min-width:0!important;max-width:100%!important;overflow:hidden!important;line-height:1!important}',
  'html:is([data-sikau-display-language="en-roman"],[data-sikau-display-language="all"]) .sikau-personal-classroom > *{display:none!important}',
  'html:is([data-sikau-display-language="en-roman"],[data-sikau-display-language="all"]) .sikau-personal-classroom::after{content:attr(data-sikau-compact-classroom)!important;display:inline!important;font:800 12px/1.2 system-ui,sans-serif!important;white-space:nowrap!important;letter-spacing:normal!important}',
  '}',
  // Respect native bilingual controls without hiding unrelated English text.
  'html[data-sikau-display-language="en"] .i18n-sub{display:none!important}',
  'html[data-sikau-display-language="en-ne"] .i18n-sub .roman{display:none!important}',
  'html[data-sikau-display-language="en-roman"] .i18n-sub:has(.roman) > span:not(.roman){display:none!important}',
  'html[data-sikau-display-language="all"] .i18n-sub:has(.roman) .sikau-lang-token::after{content:none!important}',
  'html[data-sikau-display-language="en"] .sikau-lang-roman,html[data-sikau-display-language="en-ne"] .sikau-lang-roman{display:none!important}',
  'html[data-sikau-display-language="en-roman"] .sikau-lang-ne{display:none!important}',
  'html[data-sikau-display-language="en"] .sikau-lang-ne{display:none!important}',
  'html[data-sikau-display-language="en-roman"] .sikau-lang-roman,html[data-sikau-display-language="all"] .sikau-lang-roman{display:inline!important}',
  'html[data-sikau-display-language="en-ne"] .i18n-sub .rm,html[data-sikau-display-language="en"] .i18n-sub .rm{display:none!important}',
  // The Reading tab uses CSS-generated text, which a DOM text walker cannot see.
  'html[data-sikau-display-language="en"] #rd .sikau-see-nepali::after,html[data-sikau-display-language="en"] #learn .sikau-see-nepali::after{content:"See Nepali"!important}',
  'html[data-sikau-display-language="en-roman"] #rd .sikau-see-nepali::after,html[data-sikau-display-language="en-roman"] #learn .sikau-see-nepali::after{content:"See Nepali\\A Nepali hernuhos"!important}',
  'html[data-sikau-display-language="all"] #rd .sikau-see-nepali::after,html[data-sikau-display-language="all"] #learn .sikau-see-nepali::after{content:"See Nepali\\A नेपाली हेर्नुहोस् (Nepali hernuhos)"!important}'
 ].join('\n');
 d.head.appendChild(sheet);
 const attributes=['placeholder','title','aria-label','alt'];
 const originalAttributes=new WeakMap();
 function visibleAttribute(original,selected){
  if(!hasNe.test(original)||selected==='en-ne')return original;
  if(selected==='en-roman')return romanize(original);
  if(selected==='all')return original+' ('+romanize(original)+')';
  return original.replace(/[\u0900-\u097f]+/g,'')
   .replace(/\s*[·।|/]\s*(?=$)/g,'').replace(/\s{2,}/g,' ').trim();
 }
 function decorateAttributes(root){
  if(!root)return;
  const elements=[];
  if(root.nodeType===Node.ELEMENT_NODE)elements.push(root);
  if(root.querySelectorAll)elements.push(...root.querySelectorAll('[placeholder],[title],[aria-label],[alt]'));
  for(const el of elements){
   if(el===select||el.closest?.('script,style,template,[contenteditable]'))continue;
   let originals=originalAttributes.get(el);
   if(!originals){originals=new Map();originalAttributes.set(el,originals);}
   for(const name of attributes){
    if(!el.hasAttribute?.(name))continue;
    const current=el.getAttribute(name)||'';
    if(!originals.has(name)){
     if(!hasNe.test(current))continue;
     originals.set(name,current);
    }
    const original=originals.get(name);
    const visible=visibleAttribute(original,mode);
    if(current!==visible)el.setAttribute(name,visible);
   }
  }
 }
 let observer=null,scheduled=false,dirty=new Set(),mode='',lastNotified='';
 function decorate(root){
  if(!root)return;
  const walker=d.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
  if(root.nodeType===Node.TEXT_NODE&&hasNe.test(root.nodeValue||''))nodes.push(root);
  let n;
  while((n=walker.nextNode())){
   if(!hasNe.test(n.nodeValue||''))continue;
   nodes.push(n);
  }
  for(const n of nodes){
   const p=n.parentElement;
   if(!p||p.closest(skip))continue;
   const raw=n.nodeValue||'';
   if(!hasNe.test(raw))continue;
   const parts=raw.split(/([\u0900-\u0963\u0966-\u097f]+(?:[ \t\u00a0]+[\u0900-\u0963\u0966-\u097f]+)*(?:[।॥])?)/g);
   if(parts.length<=1)continue;
   const frag=d.createDocumentFragment();
   let changed=false;
   for(const part of parts){
    if(!part)continue;
    if(!hasNe.test(part)){frag.appendChild(d.createTextNode(part));continue;}
    const token=d.createElement('span');
    token.className='sikau-lang-token';
    token.textContent=part;
    token.dataset.sikauRoman=romanize(part);
    token.lang='ne';
    token.style.setProperty('--sikau-roman-size',
      d.defaultView?.getComputedStyle?.(p)?.fontSize||'14px');
    frag.appendChild(token);changed=true;
   }
   if(changed)n.replaceWith(frag);
  }
 }
 function synchronizeCompactControls(){
  // This badge is a display-only classroom shortcut inserted by the trusted
  // parent. Its original children, click handlers and text are not replaced.
  const classroom=d.querySelector('.sikau-personal-classroom');
  if(!classroom)return;
  let source=classroom.dataset.sikauClassroomSource;
  if(!source){
   source=(classroom.textContent||'').replace(/\s+/g,' ').trim();
   classroom.dataset.sikauClassroomSource=source;
  }
  const leading=source.split(/[·•|]/,1)[0].replace(/^[\s🔐📚]+/u,'').trim();
  const first=(leading||'Learner').slice(0,30);
  const visible=mode==='en-roman'?'🔐 '+first+' · Mero kaksha':
   mode==='all'?'🔐 '+first+' · Class':mode==='en'?'🔐 '+first+' · My class':'';
  if(classroom.dataset.sikauCompactClassroom!==visible)
   classroom.dataset.sikauCompactClassroom=visible;
  // Exact, natural full names are available to VoiceOver on the compact badge.
  if(classroom.dataset.sikauOriginalAriaSaved!=='1'){
   classroom.dataset.sikauOriginalAriaSaved='1';
   classroom.dataset.sikauOriginalAria=classroom.getAttribute('aria-label')||'';
  }
  if(mode==='en-roman'||mode==='all'){
   const label=first+' — My classroom, मेरो कक्षा, Mero kaksha';
   if(classroom.getAttribute('aria-label')!==label)classroom.setAttribute('aria-label',label);
  }else{
   const original=classroom.dataset.sikauOriginalAria||'';
   if(original&&classroom.getAttribute('aria-label')!==original)classroom.setAttribute('aria-label',original);
   else if(!original&&classroom.hasAttribute('aria-label'))classroom.removeAttribute('aria-label');
  }
 }
 function updateAccessibility(){
  const roman=mode==='en-roman',all=mode==='all';
  for(const token of d.querySelectorAll('.sikau-lang-token')){
   if(roman){
    token.setAttribute('role','text');
    token.setAttribute('aria-label',token.dataset.sikauRoman||'');
    token.lang='ne-Latn';
   }else{
    token.removeAttribute('role');token.removeAttribute('aria-label');
    token.lang='ne';
   }
  }
  for(const token of d.querySelectorAll('.sikau-lang-roman')){
   token.setAttribute('aria-hidden',mode==='en-roman'||all?'false':'true');
  }
 }
 function apply(){
  scheduled=false;
  observer?.disconnect();
  const next=modes.has(select.value)?select.value:'en-ne';
  const changed=next!==mode;
  mode=next;
  h.dataset.sikauDisplayLanguage=next;
  select.title='Display language · '+names[next];
  select.setAttribute('aria-label','Display language: '+names[next]);
  if(next!==lastNotified){
   lastNotified=next;
   // Only a display preference (no account/lesson data) crosses the srcdoc boundary.
   try{d.defaultView?.parent?.postMessage?.({type:'sikau-display-language',mode:next},'*')}catch(_){}
  }
  try{
   if(changed||!dirty.size){
    decorate(d.body);
    decorateAttributes(d.body);
   }else for(const root of dirty){
    const target=root?.isConnected?root:root?.parentElement?.isConnected?root.parentElement:null;
    if(!target)continue;
    decorate(target);
    decorateAttributes(target.nodeType===Node.TEXT_NODE?target.parentElement:target);
   }
   synchronizeCompactControls();
   if(changed)updateAccessibility();
   else{
    // Newly inserted tokens must match the current screen-reader language.
    if(next==='en-roman'||next==='all')
     for(const token of d.querySelectorAll('.sikau-lang-token:not([data-sikau-a11y])')){
      if(next==='en-roman'){
       token.setAttribute('role','text');token.setAttribute('aria-label',token.dataset.sikauRoman||'');
       token.lang='ne-Latn';
      }
      token.dataset.sikauA11y='1';
     }
   }
  }finally{
   dirty.clear();
   observer?.observe(d.body,{childList:true,characterData:true,attributes:true,attributeFilter:attributes,subtree:true});
  }
 }
 function queue(root){
  if(root)dirty.add(root);
  if(scheduled)return;
  scheduled=true;
  (d.defaultView?.requestAnimationFrame||((fn)=>setTimeout(fn,0)))(apply);
 }
 // Native lesson handlers run first, then this presentation sync on the frame.
 select.addEventListener('input',()=>queue(d.body));
 select.addEventListener('change',()=>{
  if(modes.has(select.value)){
   try{d.defaultView?.localStorage?.setItem(STORE,select.value)}catch(_){}
  }
  queue(d.body);
 });
 d.addEventListener('click',e=>{
  if(e.target?.closest?.('.nav button,.sikau-home-nav,.sikau-visa-nav'))queue(d.body);
 },true);
 observer=new MutationObserver(records=>{
  for(const record of records){
   if(record.type==='characterData')dirty.add(record.target.parentElement||record.target);
   if(record.type==='attributes'){
    const el=record.target,key=record.attributeName;
    const originals=originalAttributes.get(el);
    if(originals?.has(key))originals.set(key,el.getAttribute(key)||'');
    dirty.add(el);
   }
   for(const n of record.addedNodes||[]){
    if(n.nodeType===Node.TEXT_NODE||n.nodeType===Node.ELEMENT_NODE)dirty.add(n);
   }
  }
  if(dirty.size)queue();
 });
 try{
  const stored=d.defaultView?.localStorage?.getItem(STORE);
  if(modes.has(stored)&&stored!==select.value){
   select.value=stored;
   select.dispatchEvent(new Event('change',{bubbles:true}));
  }
 }catch(_){}
 if(d.readyState==='loading')d.addEventListener('DOMContentLoaded',()=>queue(d.body),{once:true});
 else queue(d.body);
 window.__sikauLanguageDisplay={apply:()=>queue(d.body),getMode:()=>select.value,romanize};
})();
