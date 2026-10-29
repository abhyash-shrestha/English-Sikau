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
 'html.sikau-v4-in-lesson .sikau-v4-local{display:block;max-width:100%;margin-top:5px;font-size:clamp(11px,.9em,14px);font-weight:600;line-height:1.5;color:var(--muted);white-space:normal;overflow-wrap:anywhere;min-width:0}',
 'html.sikau-v4-in-lesson .sikau-v4-local>span{display:block;overflow-wrap:anywhere}',
 'html.sikau-v4-in-lesson .answer-button .sikau-v4-local{font-size:12px;text-align:left}',
 'html.sikau-v4-in-lesson .bubble .sikau-v4-local{font-size:12px}',
 'html.sikau-v4-in-lesson .chat-header .sikau-v4-local{color:#f6dbea}',
 'html.sikau-v4-in-lesson .topic-card .sikau-v4-local{font-size:11px}',
 'html.sikau-v4-in-lesson .sikau-v4-local [lang="ne-Latn"]{font-style:italic}',
 '@media(max-width:620px){html.sikau-v4-in-lesson #root{padding:0 1px 10px!important} html.sikau-v4-in-lesson .chat-header{border-radius:15px 15px 0 0} html.sikau-v4-in-lesson .panel{padding:11px}}'
 ].join('\n');
 document.head.appendChild(style);
 let mode='en-ne',titles=Object.create(null),queued=false,lastHeight=0;
 const modes=new Set(['en','en-ne','en-roman','all']);
 // The V4 page is a same-origin iframe nested inside the verified lesson
 // srcdoc. Read the SAME selector as the rest of English Sikau; message
 // delivery is an enhancement, not a prerequisite for language display.
 function readLessonMode(){
  try{
   const parentDoc=window.parent.document;
   const control=parentDoc.getElementById('langPref');
   if(control&&modes.has(control.value))return control.value;
   const fromRoot=parentDoc.documentElement?.dataset?.sikauDisplayLanguage;
   if(modes.has(fromRoot))return fromRoot;
  }catch(_){}
  try{
   const saved=localStorage.getItem('sikau_lang_pref');
   if(modes.has(saved))return saved;
  }catch(_){}
  return 'en-ne';
 }
 function syncLessonMode(){
  const selected=readLessonMode();
  if(mode===selected)return false;
  mode=selected;
  return true;
 }
 mode=readLessonMode();
 try{
  const localTitles=window.parent.__sikauCoachV4Translations;
  if(localTitles&&typeof localTitles==='object')titles=localTitles;
 }catch(_){}
 function subtitle(t){
  if(!t||mode==='en')return '';
  if(mode==='en-ne')return t.ne||'';
  if(mode==='en-roman')return t.roman||'';
  return (t.ne||'')+(t.roman?' · '+t.roman:'');
 }

 const staticNe=new Map([
  ['All situations','सबै परिस्थितिहरू'],
  ['Undo answer','पछिल्लो उत्तर हटाउनुहोस्'],
  ['Change my request','मेरो अनुरोध बदल्नुहोस्'],
  ['Restart','फेरि सुरु गर्नुहोस्'],
  ['Choose a situation','एउटा परिस्थिति छान्नुहोस्'],
  ['Explore Page 1 or switch category to find any topic.','पहिलो पृष्ठ हेर्नुहोस् वा विषयवर्ग छानेर खोज्नुहोस्।'],
  ['What would you like to say?','तपाईं के भन्न चाहनुहुन्छ?'],
  ['Choose what you would naturally say next','अब तपाईं स्वाभाविक रूपमा के भन्नुहुन्छ?'],
  ['Choose how you want this conversation to begin','कुराकानी कसरी सुरु गर्ने छान्नुहोस्'],
  ['Choose your starting situation','सुरुको परिस्थिति छान्नुहोस्'],
  ['Conversation completed','कुराकानी पूरा भयो'],
  ['Conversation','कुराकानी'],
  ['Real-life details','वास्तविक जीवनका विवरण'],
  ['Deciding next steps','अर्को कदम तय गर्दै'],
  ['You · Learner','तपाईं · विद्यार्थी'],
  ['Interactive conversation practice','अन्तरक्रियात्मक कुराकानी अभ्यास'],
  ['Choices change the conversation','तपाईंको उत्तरले कुराकानी बदल्छ'],
  ['No topics match. Try a different keyword or category.','कुनै विषय भेटिएन। अर्को शब्द वा वर्ग प्रयोग गर्नुहोस्।'],
  ['Return clothing','लुगा फिर्ता'],
  ['Buy clothes','लुगा किन्नु'],
  ['Buy a phone','फोन किन्नु'],
  ['Order at a café','क्याफेमा अर्डर गर्नु'],
  ['Returns associate','सामान फिर्ता लिने कर्मचारी'],
  ['Phone salesperson','फोन पसलका विक्रेता'],
  ['Sales assistant','बिक्री सहायक'],
  ['Barista','कफी बनाउने कर्मचारी'],
  ['Shopping','किनमेल'],
  ['Food & Drink','खाना र पेय पदार्थ'],
  ['Food & Dining','खाना र भोजन'],
  ['All','सबै'],
  ['Hello! Welcome to the store. How can I help you today?','नमस्कार! पसलमा स्वागत छ। आज म तपाईंलाई कसरी मद्दत गर्न सक्छु?'],
  ["I'd like a refund for a jacket.",'म यो ज्याकेटको पैसा फिर्ता पाउन चाहन्छु।'],
  ["I can help check that. Let us start with your purchase details.",'म त्यसबारे जाँच गर्न सक्छु। पहिले तपाईंले किनेको विवरण हेरौँ।'],
  ['Do you have the purchase receipt?','तपाईंसँग सामान किनेको रसिद छ?'],
  ['Yes, I have the receipt here.','छ, रसिद मसँग यहीँ छ।'],
  ['Thank you. That will help me locate the transaction.','धन्यवाद। यसले खरिद विवरण खोज्न मद्दत गर्छ।'],
  ['No, but I paid with my debit card.','छैन, तर मैले डेबिट कार्डबाट भुक्तानी गरेको थिएँ।'],
  ['We can try to locate the purchase using an authorized transaction lookup.','आधिकारिक लेनदेन विवरणबाट खरिद खोज्न प्रयास गर्न सक्छौँ।'],
  ['When did you buy the jacket?','तपाईंले ज्याकेट कहिले किन्नुभएको थियो?'],
  ['Last week.','गत हप्ता।'],
  ['That sounds recent. I will verify the actual purchase date.','भर्खरै किन्नुभएको जस्तो छ। म खरिद मिति जाँच गर्छु।'],
  ['A few months ago.','केही महिनाअघि।'],
  ['We will need to check whether it is within the permitted return period.','फिर्ता गर्ने समयसीमाभित्र पर्छ कि पर्दैन जाँच गर्नुपर्छ।'],
  ['Is the item still in the condition you received it?','सामान किन्दाको जस्तै अवस्थामा छ?'],
  ['Yes, I only tried it on at home.','हो, मैले घरमा लगाएर मात्र हेरेको थिएँ।'],
  ['Thanks. I will check the policy for an unworn item.','धन्यवाद। प्रयोग नगरिएको सामान फिर्ता गर्ने नियम हेर्छु।'],
  ['No, I noticed a problem after using it.','होइन, प्रयोग गरेपछि समस्या देखेँ।'],
  ['Thanks for explaining. We should check the defect or warranty terms instead of assuming a normal return.','बुझाइदिनुभएकोमा धन्यवाद। सामान्य फिर्ताभन्दा सामानको खराबी वा वारेन्टीको नियम जाँचौँ।'],
  ['I need to exchange a shirt that doesn’t fit.','नमिल्ने सर्ट साट्न चाहन्छु।'],
  ["I need to exchange a shirt that doesn't fit.",'नमिल्ने सर्ट साट्न चाहन्छु।'],
  ['Certainly. We can check the size and exchange conditions.','अवश्य। हामी साइज र साट्न मिल्ने सर्तहरू जाँच्न सक्छौँ।'],
  ['What is the problem with the dress?','यो ड्रेसमा के समस्या छ?'],
  ['The zipper broke the first time I wore it.','पहिलो पटक लगाउँदा नै जिप बिग्रियो।'],
  ['There is a tear in the fabric.','कपडा च्यातिएको छ।'],
  ['Hello! Welcome to our phone shop. What are you looking for today?','नमस्कार! हाम्रो मोबाइल पसलमा स्वागत छ। आज तपाईं कस्तो फोन खोज्दै हुनुहुन्छ?'],
  ['A great camera is my top priority.','मेरो पहिलो प्राथमिकता राम्रो क्यामेरा हो।'],
  ['Excellent. Let us find out what kind of camera use matters most.','राम्रो कुरा! तपाईंलाई कस्तो क्यामेरा चाहिन्छ बुझौँ।'],
  ['Do you take mostly photos or videos?','तपाईं बढी फोटो खिच्नुहुन्छ कि भिडियो बनाउनुहुन्छ?'],
  ['Portraits and family photos.','पोर्ट्रेट र परिवारका फोटोहरू।'],
  ['Then we should compare portrait examples and low-light pictures.','त्यसो भए पोर्ट्रेट र कम उज्यालोमा खिचिएका फोटो तुलना गरौँ।'],
  ['Mostly videos and social media clips.','मुख्यतः भिडियो र सामाजिक सञ्जालका क्लिप।'],
  ['Let us compare stabilization, sound, and video storage needs.','भिडियोको स्थिरता, आवाज र स्टोरेज तुलना गरौँ।'],
  ['My budget is around NPR 50,000.','मेरो बजेट करिब ५० हजार नेपाली रुपैयाँ हो।'],
  ['Understood. Let us find the best fit within your price range.','बुझेँ। तपाईंको बजेटभित्र मिल्ने फोन हेरौँ।'],
  ['What do you use your phone for most?','फोन सबैभन्दा बढी केका लागि प्रयोग गर्नुहुन्छ?'],
  ['Photos, messages, and video calls.','फोटो, सन्देश र भिडियो कलका लागि।'],
  ['Gaming and a lot of apps.','गेम खेल्न र धेरै एप चलाउन।'],
  ['I only want to compare phones today.','आज म फोनहरू तुलना मात्र गर्न चाहन्छु।'],
  ['No problem! You do not need to buy anything.','कुनै समस्या छैन! अहिले नै किन्नु पर्दैन।'],
  ['Good morning. Welcome to our café. How can I help?','शुभ प्रभात! हाम्रो क्याफेमा स्वागत छ। तपाईंलाई के चाहियो?'],
  ['A small hot latte, please.','एउटा सानो तातो लाटे दिनुहोस्।'],
  ['A medium iced coffee, please.','एउटा मध्यम आकारको आइस्ड कफी दिनुहोस्।'],
  ['What kinds of coffee do you have?','तपाईंसँग कस्ता कफी छन्?'],
  ['Regular milk and no extra sugar, please.','साधारण दूध र थप चिनी नहालिदिनुहोस्।'],
  ['Oat milk, please. Is there an extra charge?','ओट मिल्क दिनुहोस्। थप शुल्क लाग्छ?'],
  ['To go, please.','प्याक गरेर लैजान्छु।'],
  ["I'll have it here, please.",'यहीँ बसेर पिउँछु।'],
  ["No thanks, that's everything. What is my total?",'होइन धन्यवाद, यत्ति हो। जम्मा कति भयो?'],
  ['Could I add a croissant?','एउटा क्रोसाँ पनि थप्न मिल्छ?'],
  ['Actually, I do not want to order anymore.','वास्तवमा, अब म अर्डर गर्न चाहन्नँ।'],
  ['I have the receipt here.','रसिद मसँग यहीँ छ।'],
  ['Could I speak with the manager?','म्यानेजरसँग कुरा गर्न पाउँछु?'],
  ['Thank you. Goodbye!','धन्यवाद। फेरि भेटौँला!']
 ]);
 const romanWords={'नमस्ते':'Namaste','अभ्यास':'Abhyash','मेरो':'mero','नेपाली':'Nepali','कृपया':'kripaya','धन्यवाद':'dhanyabad','तपाईं':'tapai','तपाईंको':'tapaiko','तपाईंलाई':'tapailai','हो':'ho','छ':'chha','छैन':'chhaina','फेरि':'pheri','कुराकानी':'kurakani'};
 const cons={'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ng','च':'ch','छ':'chh','ज':'j','झ':'jh','ञ':'ny','ट':'t','ठ':'th','ड':'d','ढ':'dh','ण':'n','त':'t','थ':'th','द':'d','ध':'dh','न':'n','प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'w','श':'sh','ष':'sh','स':'s','ह':'h'};
 const vowel={'अ':'a','आ':'aa','इ':'i','ई':'ee','उ':'u','ऊ':'oo','ऋ':'ri','ए':'e','ऐ':'ai','ओ':'o','औ':'au'};
 const matra={'ा':'a','ि':'i','ी':'ee','ु':'u','ू':'oo','ृ':'ri','े':'e','ै':'ai','ो':'o','ौ':'au'};
 function romanize(input){
  return String(input).replace(/[\u0900-\u097f]+/g,word=>{
   if(romanWords[word])return romanWords[word];
   const letters=Array.from(word);let out='';
   for(let i=0;i<letters.length;i++){
    const a=letters[i],b=letters[i+1];
    if(a==='क'&&b==='्'&&letters[i+2]==='ष'){out+='ksh';i+=2;continue;}
    if(a==='ज'&&b==='्'&&letters[i+2]==='ञ'){out+='gy';i+=2;continue;}
    if(Object.hasOwn(cons,a)){
     out+=cons[a];
     if(Object.hasOwn(matra,b)){out+=matra[b];i++;}
     else if(b==='्'){i++;}
     else if(b&&/[\u0900-\u097f]/.test(b)&&b!=='ं'&&b!=='ँ'&&b!=='ः')out+='a';
     else if(!b)out+='a';
    }else if(Object.hasOwn(vowel,a))out+=vowel[a];
    else if(a==='ं'||a==='ँ')out+='n';
    else if(a==='ः')out+='h';
    else if(a>='०'&&a<='९')out+=String(a.charCodeAt(0)-2406);
    else if(Object.hasOwn(matra,a))out+=matra[a];
    else if(a==='।')out+='.';
    else if(a!=='्'&&a!=='़')out+=a;
   }
   return out;
  });
 }
 const storageKey='sikau-v4-ne-dialogue-cache-v1';
 let cacheEntries=[];
 try{cacheEntries=JSON.parse(localStorage.getItem(storageKey)||'[]');}catch(_){}
 const translated=new Map(Array.isArray(cacheEntries)?cacheEntries.filter(x=>Array.isArray(x)&&x.length===2):[]);
 const pending=new Set(),jobs=[];let processing=0,failures=0,saveTimer=0;
 function persist(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{
   try{localStorage.setItem(storageKey,JSON.stringify(Array.from(translated).slice(-450)))}catch(_){}
  },900);
 }
 async function remoteNe(english){
  // Only public, prewritten practice script sentences are translated.
  // Never send account identifiers, typed learner content, or lesson progress.
  const url='https://translate.googleapis.com/translate_a/single?'+new URLSearchParams({
   client:'gtx',sl:'en',tl:'ne',dt:'t',q:english
  }).toString();
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),7500);
  try{
   const result=await fetch(url,{signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});
   if(!result.ok)throw Error('Translation unavailable');
   const data=await result.json();
   const value=Array.isArray(data?.[0])?data[0].map(part=>String(part?.[0]||'')).join('').trim():'';
   if(!/[\u0900-\u097f]/.test(value))throw Error('No Nepali translation');
   return value;
  }finally{clearTimeout(timer);}
 }
 function workQueue(){
  while(processing<3&&jobs.length&&failures<4){
   const source=jobs.shift();processing++;
   remoteNe(source).then(ne=>{
    translated.set(source,ne);persist();schedule();
   }).catch(()=>{failures++;schedule();}).finally(()=>{
    pending.delete(source);processing--;workQueue();
   });
  }
  if(failures>=4){jobs.length=0;pending.clear();}
 }
 function neFor(source){
  if(staticNe.has(source))return staticNe.get(source);
  if(translated.has(source))return translated.get(source);
  if(failures>=4||source.length<2||source.length>650)return '';
  if(!pending.has(source)){
   pending.add(source);jobs.push(source);workQueue();
  }
  return '';
 }
 function originalText(el){
  if(!el)return '';
  return Array.from(el.childNodes).filter(n=>n.nodeType===Node.TEXT_NODE).map(n=>n.textContent).join('').trim();
 }
 function display(el,english,override){
  if(!el)return;
  let node=Array.from(el.children).find(x=>x.classList?.contains('sikau-v4-local'));
  if(mode==='en'||!english){node?.remove();return;}
  const ne=override?.ne||neFor(english);
  if(!ne){node?.remove();return;}
  const roman=override?.roman||romanize(ne);
  const parts=mode==='en-ne'?[['ne',ne]]:mode==='en-roman'?[['ne-Latn',roman]]:[['ne',ne],['ne-Latn',roman]];
  if(!node){node=document.createElement('span');node.className='sikau-v4-local';el.appendChild(node);}
  const html=parts.map(pair=>'<span lang="'+pair[0]+'">'+escapeHtml(pair[1])+'</span>').join('');
  if(node.innerHTML!==html)node.innerHTML=html;
 }
 function escapeHtml(s){
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
 }
 function localizedLabel(selector,sourceGetter){
  for(const el of document.querySelectorAll(selector)){
   if(el.closest('.sikau-v4-local'))continue;
   const source=sourceGetter?sourceGetter(el):originalText(el);
   if(source)display(el,source);
  }
 }
 function decorate(){
  document.documentElement.dataset.sikauV4Mode=mode;
  for(const card of document.querySelectorAll('#topic-grid .topic-card')){
   const title=card.querySelector('strong');
   if(title){
    const text=originalText(title);
    const entry=titles[text];
    display(title,text,entry);
   }
   localizedCardLabel(card,'.card-category');
   localizedCardLabel(card,'small');
  }
  const header=document.getElementById('chat-title');
  if(header){
   const text=originalText(header).replace(/^[^\p{L}\p{N}]+/u,'').trim();
   const entry=titles[text];
   display(header,text,entry);
  }
  localizedLabel('#chat-role,#chat-counter,#chat-step,#chat-goal,#choice-title,#total-counter,#page-summary,#topic-browser .sectiontitle,#topic-browser .sectionhint,#chat-view .kicker');
  localizedLabel('#back-topics,#undo,#switch-goal,#restart,#restart-bottom',el=>originalText(el).replace(/^[^\p{L}\p{N}]+/u,'').trim());
  localizedLabel('#category-filters .category-chip',el=>originalText(el));
  localizedLabel('#chat-transcript .speaker');
  for(const bubble of document.querySelectorAll('#chat-transcript .bubble')){
   const text=originalText(bubble);
   if(text)display(bubble,text);
  }
  for(const answer of document.querySelectorAll('#chat-choices .answer-button')){
   const label=answer.querySelector('span:first-child');
   if(label)display(label,originalText(label));
  }
  const search=document.getElementById('search-topics');
  if(search){
   const next=mode==='en'?'Search: lost card, pizza, job, Nepal…':
    mode==='en-roman'?'Search · Khojnuhos…':'Search · खोज्नुहोस्…';
   if(search.placeholder!==next)search.placeholder=next;
  }
  let note=document.getElementById('sikauV4ModeNote');
  if(!note){
   note=document.createElement('p');note.id='sikauV4ModeNote';note.className='sikau-v4-mode-note';
   document.querySelector('#topic-browser .filterbar')?.insertAdjacentElement('afterend',note);
  }
  const message=mode==='en'?'':failures>=4?
   'Live Nepali translation is temporarily unavailable. Your English conversation and saved choices still work.':
   mode==='en-ne'?'English + नेपाली: English is preserved; Nepali appears below each line. Some translations are automatic.':
   mode==='en-roman'?'English + Roman Nepali: Roman Nepali appears below each line. Some translations are automatic.':
   'English + नेपाली + Roman: all three versions appear together. Some translations are automatic.';
  if(note.textContent!==message)note.textContent=message;
  note.hidden=mode==='en';
 }
 function localizedCardLabel(card,selector){
  const el=card.querySelector(selector);
  if(el)display(el,originalText(el));
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
  syncLessonMode();
  if(queued)return;
  queued=true;
  requestAnimationFrame(()=>{queued=false;syncLessonMode();decorate();measure();});
 }
 window.addEventListener('message',event=>{
  if(event.source!==window.parent||event.data?.type!=='sikau-v4-config')return;
  const next=event.data;
  // Parent's actual selector wins over an older queued postMessage.
  // If the selector is not available, use the validated message value.
  mode=readLessonMode();
  if(!modes.has(mode)&&modes.has(next.mode))mode=next.mode;
  if(next.titles&&typeof next.titles==='object'&&Object.keys(next.titles).length)titles=next.titles;
  // V4 owns an internal dark-mode state. Toggle its own control when the
  // parent theme changes so the next V4 render cannot reset the selection.
  const desired=next.theme==='dark'?'dark':'light';
  if(document.documentElement.dataset.theme!==desired){
   document.getElementById('theme-toggle')?.click();
  }
  schedule();
 });
 // Listen directly to the language selector in the real lesson frame.
 // This also works if the configuration postMessage fired before V4 loaded.
 try{
  const parentDoc=window.parent.document;
  parentDoc.getElementById('langPref')?.addEventListener('change',schedule);
  parentDoc.getElementById('langPref')?.addEventListener('input',schedule);
  new MutationObserver(()=>{if(syncLessonMode())schedule();})
   .observe(parentDoc.documentElement,{
    attributes:true,attributeFilter:['data-sikau-display-language']
   });
 }catch(_){}
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
