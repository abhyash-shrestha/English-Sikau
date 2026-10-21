/* English Sikau language display bridge; runs only in an authorized lesson iframe.
 * Presentation only: student answers, forms, scoring, and access are unchanged. */
(function(){
 'use strict';
 const d=document,s=d.getElementById('langPref'),h=d.documentElement;
 if(!s||h.dataset.sikauLangBridge==='1')return;
 h.dataset.sikauLangBridge='1';
 const modes=new Set(['en-ne','en-roman','all','en']);
 const names={'en-ne':'English + नेपाली','en-roman':'English + Roman Nepali',all:'English + नेपाली + Roman',en:'English only'};
 const C={क:'k',ख:'kh',ग:'g',घ:'gh',ङ:'ng',च:'ch',छ:'chh',ज:'j',झ:'jh',ञ:'n',ट:'t',ठ:'th',ड:'d',ढ:'dh',ण:'n',त:'t',थ:'th',द:'d',ध:'dh',न:'n',प:'p',फ:'f',ब:'b',भ:'bh',म:'m',य:'y',र:'r',ल:'l',व:'w',श:'sh',ष:'sh',स:'s',ह:'h'};
 const V={अ:'a',आ:'aa',इ:'i',ई:'i',उ:'u',ऊ:'u',ऋ:'ri',ए:'e',ऐ:'ai',ओ:'o',औ:'au'};
 const M={'ा':'a','ि':'i','ी':'i','ु':'u','ू':'u','े':'e','ै':'ai','ो':'o','ौ':'au','ृ':'ri'};
 const words={'मेरो':'mero','कक्षा':'kaksha','अभ्यास':'abhyash','कोच':'coach','नेपाली':'nepali','अंग्रेजी':'angreji','शब्दहरू':'shabdaharu','अनुवाद':'anuwad','लेखन':'lekhan','खेल':'khel','प्रगति':'pragati','बोल्ने':'bolne','अमेरिकी':'ameriki','भिसा':'visa','अन्तर्वार्ता':'antarbarta','हेर्नुहोस्':'hernuhos','पढ्न':'padhna'};
 function romanize(txt){return String(txt).replace(/[\u0900-\u097f]+/g,word=>{
  if(words[word])return words[word];
  let out='',chars=Array.from(word);
  for(let i=0;i<chars.length;i++){
   const c=chars[i],next=chars[i+1];
   if(C[c]){out+=C[c];if(Object.prototype.hasOwnProperty.call(M,next)){out+=M[next];i++;}
    else if(next==='्'){i++;}else if(next&&/[\u0900-\u097f]/.test(next))out+='a';}
   else if(V[c])out+=V[c];else if(c==='ं'||c==='ँ')out+='n';
   else if(c==='ः')out+='h';else if(c==='।')out+='.';
   else if(c>='०'&&c<='९')out+=String(c.charCodeAt(0)-2406);
   else if(!/[\u093c\u200c\u200d]/.test(c))out+=c;
  }return out;
 });}
 const css=d.createElement('style');css.id='sikau-lang-bridge-style';
 css.textContent=[
 'html[data-sikau-display-language="en"] .i18n-sub,html[data-sikau-display-language="en"] .sikau-lang-ne[data-en="yes"],html[data-sikau-display-language="en"] .sikau-lang-roman{display:none!important}',
 'html[data-sikau-display-language="en-roman"] .sikau-lang-ne{display:none!important}',
 'html[data-sikau-display-language="en-roman"] .i18n-sub>span:not(.roman){display:none!important}',
 'html[data-sikau-display-language="en-ne"] .i18n-sub .roman{display:none!important}',
 'html[data-sikau-display-language="en-ne"] .sikau-lang-roman{display:none!important}',
 'html[data-sikau-display-language="en"] .sikau-lang-ne:not([data-en="yes"]){display:inline!important}',
 'html[data-sikau-display-language="all"] .sikau-lang-ne,html[data-sikau-display-language="all"] .sikau-lang-roman{display:inline!important}',
 'html[data-sikau-display-language="en-roman"] .sikau-lang-roman{display:inline!important}',
 'html[data-sikau-display-language="en-ne"] .sikau-lang-ne{display:inline!important}',
 'html[data-sikau-display-language="en"] .rm,html[data-sikau-display-language="en-ne"] .rm,html[data-sikau-display-language="en-roman"] .rm,html[data-sikau-display-language="all"] .rm{display:none!important}',
 '.sikau-lang-roman{font-size:.94em;font-style:italic;color:inherit;opacity:.9}',
 'html[data-sikau-display-language="all"] .sikau-lang-roman:before{content:" ("}',
 'html[data-sikau-display-language="all"] .sikau-lang-roman:after{content:")"}'
 ].join('\n');
 d.head.appendChild(css);
 const exclude='script,style,noscript,input,textarea,select,option,[contenteditable],[data-norz],.sikau-lang-ne,.sikau-lang-roman,.rm,.roman,.i18n-sub,.wd,.course-options,#courseQuiz,#qz,#storyQuizBox,.sikau-quiz-option';
 const validRegion='.app-header,.nav,.content,#tr,#rd,#learn,#words,#hw,#sp,#game,#pg,#coach,.sikau-convo,.sikau-visa-main,.sikau-home-nav,.sikau-visa-nav';
 let observer=null,busy=false,pending=false;
 function decorate(){
  const walker=d.createTreeWalker(d.body,NodeFilter.SHOW_TEXT),nodes=[];let n;
  while((n=walker.nextNode())&&nodes.length<1100){
   if(!/[\u0900-\u097f]/.test(n.nodeValue||''))continue;
   const p=n.parentElement;
   if(!p||p.closest(exclude)||!p.closest(validRegion))continue;
   const btn=p.closest('button,[role="button"],a[href]');
   if(btn&&!p.matches('small'))continue;
   const t=n.nodeValue||'';if(t.length>450||!t.trim())continue;
   nodes.push(n);
  }
  for(const n of nodes){
   if(!n.parentElement)continue;
   const p=n.parentElement;
   const hasEn=/[A-Za-z]/.test(p.textContent||'')||
    !!p.closest('.sikau-nav-word,.sikau-home-nav-label,.sikau-visa-nav-word');
   const parts=(n.nodeValue||'').split(/([\u0900-\u097f][\u0900-\u097f\s।,!?‍‌-]*)/g);
   if(parts.length<2)continue;
   const frag=d.createDocumentFragment();
   for(const part of parts){
    if(!part)continue;
    if(!/[\u0900-\u097f]/.test(part)){frag.appendChild(d.createTextNode(part));continue;}
    const ne=d.createElement('span'),roman=d.createElement('span');
    ne.className='sikau-lang-ne';ne.dataset.en=hasEn?'yes':'no';ne.textContent=part;
    ne.setAttribute('data-norz','');
    roman.className='sikau-lang-roman';roman.textContent=romanize(part);roman.lang='ne-Latn';
    roman.setAttribute('data-norz','');roman.setAttribute('aria-hidden','true');
    frag.append(ne,roman);
   }n.replaceWith(frag);
  }
 }
 function paint(){
  if(busy)return;busy=true;observer?.disconnect();
  try{
   const mode=modes.has(s.value)?s.value:'en-ne';
   h.dataset.sikauDisplayLanguage=mode;
   try{window.localStorage.setItem('sikau_lang_pref',mode)}catch(_){}
   // In Roman-only mode the Roman text, not the hidden Devanagari copy,
   // must remain accessible to assistive technology.
   for(const node of d.querySelectorAll('.sikau-lang-roman'))
    node.setAttribute('aria-hidden',mode==='en-roman'?'false':'true');
   s.title='Display language · '+names[mode];
   s.setAttribute('aria-label','Display language: '+names[mode]);
   decorate();
   for(const node of d.querySelectorAll('.sikau-lang-roman'))
    node.setAttribute('aria-hidden',mode==='en-roman'?'false':'true');
  }finally{
   busy=false;observer?.observe(d.body,{subtree:true,childList:true,characterData:true});
  }
 }
 function schedule(){
  if(pending)return;pending=true;
  requestAnimationFrame(()=>{pending=false;paint()});
 }
 s.addEventListener('change',schedule);
 d.addEventListener('click',event=>{
  if(event.target?.closest?.('.nav button,.sikau-home-nav,.sikau-visa-nav'))schedule();
 },true);
 observer=new MutationObserver(schedule);
 paint();
 window.__sikauLanguageDisplay={apply:schedule,getMode:()=>s.value};
})();