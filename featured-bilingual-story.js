/* English Sikau: a complete, bilingual chapter book. Renders only inside the
 * authenticated Reading tab; never accesses private lessons, XP or entitlements.
 * The original Reading library and quizzes remain intact. */
(function(){
'use strict';
const BOOK={
 id:'old-bookshop',title:'The Secret of the Old Bookshop',neTitle:'पुरानो पुस्तक पसलको रहस्य',
 level:'A2–B1',category:'Mystery',description:'Maya finds a mysterious photograph and helps revive a forgotten dream.',neDescription:'मायाले रहस्यमय तस्बिर भेट्छिन् र बिर्सिएको सपना पूरा गर्न सहयोग गर्छिन्।',cover:'./assets/read-topics/mystery.svg',
 chapters:[
  {title:'A Rainy Afternoon',neTitle:'पानी परेको दिउँसो',paragraphs:[
   ['It was a rainy afternoon in Bhaktapur. Maya was walking home from school when heavy rain suddenly began. She ran into a small, old bookshop to stay dry.','भक्तपुरमा पानी परिरहेको दिउँसो थियो। माया विद्यालयबाट घर फर्किँदै गर्दा अचानक ठूलो पानी पर्न थाल्यो। पानीबाट बच्न उनी एउटा सानो, पुरानो पुस्तक पसलभित्र पसिन्।'],
   ['The shop was quiet, and hundreds of books covered the wooden shelves. While looking around, Maya noticed a strange blue notebook. When she opened it, a small photograph fell onto the floor.','पसल सुनसान थियो र काठका दराजहरूमा सयौँ किताबहरू राखिएका थिए। वरिपरि हेर्दै गर्दा मायाले एउटा अनौठो निलो कापी देखिन्। उनले कापी खोल्दा एउटा सानो तस्बिर भुइँमा खस्यो।'],
   ['The photograph showed three children standing in front of an old house. On the back, someone had written, "Find this house, and you will discover something special." Maya looked again. She had seen that house somewhere before.','तस्बिरमा तीन जना बालबालिका एउटा पुरानो घरको अगाडि उभिएका थिए। पछाडि कसैले लेखेको थियो, "यो घर पत्ता लगाऊ, अनि तिमीले एउटा विशेष कुरा थाहा पाउनेछौ।" मायाले फेरि हेरिन्। उनले त्यो घर पहिले कतै देखेकी थिइन्।']
  ],questions:[
   {en:'Where did Maya hide from the rain?',ne:'माया पानीबाट बच्न कहाँ पसिन्?',choices:[['A bookshop','पुस्तक पसल'],['A restaurant','रेस्टुरेन्ट'],['A school','विद्यालय']],answer:0},
   {en:'What fell out of the blue notebook?',ne:'निलो कापीबाट के खस्यो?',choices:[['A photograph','एउटा तस्बिर'],['A key','एउटा साँचो'],['A letter from Rohan','रोहनको चिठी']],answer:0}
  ]},
  {title:'The House on the Hill',neTitle:'डाँडामाथिको घर',paragraphs:[
   ['The next morning, Maya showed the photograph to her best friend, Rohan. "I think this house is near the old temple," he said. They agreed to look for it together.','भोलिपल्ट बिहान मायाले त्यो तस्बिर आफ्नो मिल्ने साथी रोहनलाई देखाइन्। "मलाई लाग्छ, यो घर पुरानो मन्दिर नजिकै छ," उसले भन्यो। उनीहरूले सँगै त्यो घर खोज्ने निर्णय गरे।'],
   ['They walked through narrow streets until they reached a small hill. At the top stood the very same house. Its front gate was locked, but an elderly woman was watering flowers in the garden.','उनीहरू साँघुरा गल्लीहरू हुँदै एउटा सानो डाँडामा पुगे। डाँडाको टुप्पोमा तस्बिरमा देखिएको त्यही घर थियो। मूल ढोकामा ताला लागेको थियो, तर एउटी वृद्ध महिला बगैँचामा फूलहरूमा पानी हाल्दै थिइन्।'],
   ['"Why are you looking at this house?" the woman asked. Maya showed her the photograph. The woman stared at it, and her hands began to shake. "Where did you find this?" she whispered.','"तिमीहरू यो घर किन हेरिरहेका छौ?" महिलाले सोधिन्। मायाले उनलाई तस्बिर देखाइन्। महिला तस्बिर हेरेर टोलाइन् र उनका हात काँप्न थाले। "तिमीहरूले यो कहाँ भेट्यौ?" उनले बिस्तारै सोधिन्।']
  ],questions:[
   {en:'Who helped Maya search for the house?',ne:'घर खोज्न मायालाई कसले सहयोग गर्‍यो?',choices:[['Her teacher','उनकी शिक्षक'],['Rohan','रोहन'],['Her sister','उनकी बहिनी']],answer:1},
   {en:'What was the woman doing when they arrived?',ne:'उनीहरू पुग्दा महिलाले के गर्दै थिइन्?',choices:[['Reading a book','किताब पढ्दै'],['Cooking lunch','खाना पकाउँदै'],['Watering flowers','फूलहरूमा पानी हाल्दै']],answer:2}
  ]},
  {title:'A Forgotten Promise',neTitle:'बिर्सिएको वाचा',paragraphs:[
   ['The elderly woman invited them inside. Her name was Kamala. She studied the photograph for a long time before speaking. "Those were my childhood friends," she explained.','वृद्ध महिलाले उनीहरूलाई घरभित्र बोलाइन्। उनको नाम कमला थियो। उनी केही बेरसम्म तस्बिर हेरिरहिन् अनि बोल्न थालिन्। "ती मेरा बाल्यकालका साथीहरू थिए," उनले भनिन्।'],
   ['"We dreamed of opening a library where children could read without paying." Maya asked whether the library had ever opened. Kamala shook her head. One friend had moved abroad, another had become seriously ill, and the plan slowly disappeared.','"हामीले एउटा पुस्तकालय खोल्ने सपना देखेका थियौँ, जहाँ बालबालिकाले पैसा नतिरी किताब पढ्न पाऊन्।" मायाले पुस्तकालय खुलेको थियो कि भनेर सोधिन्। कमलाले टाउको हल्लाइन्। एक जना साथी विदेश गएका थिए, अर्को गम्भीर बिरामी परेका थिए र योजना बिस्तारै हराएको थियो।'],
   ['Maya noticed tears in Kamala’s eyes. "But why was the photograph hidden in a notebook?" Rohan asked. Kamala smiled sadly. "Because someone never forgot our promise."','मायाले कमलाका आँखामा आँसु देखिन्। "तर यो तस्बिर कापीभित्र किन लुकाइएको थियो?" रोहनले सोध्यो। कमला दुःखी हुँदै मुस्कुराइन्। "किनभने कसैले हाम्रो वाचा कहिल्यै बिर्सेको थिएन।"']
  ],questions:[
   {en:'What had Kamala and her friends promised to build?',ne:'कमला र उनका साथीहरूले के बनाउने वाचा गरेका थिए?',choices:[['A shop','एउटा पसल'],['A free children’s library','बालबालिकाका लागि निःशुल्क पुस्तकालय'],['A hospital','अस्पताल']],answer:1},
   {en:'Why did their dream stop?',ne:'उनीहरूको सपना किन रोकियो?',choices:[['They lost interest immediately','उनीहरूलाई चासो रहेन'],['The books were stolen','किताबहरू चोरी भए'],['Friends moved away and one became ill','साथीहरू टाढा गए र एक जना बिरामी परे']],answer:2}
  ]},
  {title:'The Hidden Room',neTitle:'लुकेको कोठा',paragraphs:[
   ['Kamala took the children upstairs and opened a dusty wooden door. Inside, boxes filled the room. Hundreds of books were packed carefully inside them. "They have been waiting here for twenty years," she said.','कमलाले बालबालिकालाई माथिल्लो तलामा लगिन् र धुलो लागेको काठको ढोका खोलिन्। भित्र कोठाभरि बाकसहरू थिए। तिनमा सयौँ किताबहरू मिलाएर राखिएका थिए। "यी किताबहरू बीस वर्षदेखि यहाँ छन्," उनले भनिन्।'],
   ['Maya picked up a book and gently wiped away the dust. "Why don’t we open the library now?" she asked. Kamala laughed softly. "I’m too old to manage it alone."','मायाले एउटा किताब उठाइन् र बिस्तारै धुलो पुछिन्। "हामी अहिले पुस्तकालय किन नखोल्ने?" उनले सोधिन्। कमला हल्का हाँसिन्। "म एक्लैले चलाउन सक्ने उमेरमा छैन।"'],
   ['"You won’t be alone," Rohan replied. "We can ask our school and our neighbors to help." Maya offered to organize the books. For the first time in years, Kamala believed her dream might come true.','"तपाईं एक्लै हुनुहुन्न," रोहनले भन्यो। "हामी विद्यालय र छिमेकीहरूसँग सहयोग माग्न सक्छौँ।" मायाले किताबहरू मिलाउने जिम्मा लिने बताइन्। धेरै वर्षपछि पहिलो पटक कमलालाई आफ्नो सपना पूरा हुन सक्छ भन्ने विश्वास भयो।']
  ],questions:[
   {en:'What did they discover upstairs?',ne:'उनीहरूले माथिल्लो तलामा के भेटे?',choices:[['Boxes of books','किताबहरूले भरिएका बाकस'],['A new television','नयाँ टेलिभिजन'],['A bag of gold','सुनको झोला']],answer:0},
   {en:'Who did Rohan suggest asking for help?',ne:'रोहनले कससँग सहयोग माग्ने सुझाव दियो?',choices:[['Only tourists','पर्यटकहरूसँग मात्र'],['School and neighbors','विद्यालय र छिमेकीहरू'],['Nobody','कसैसँग पनि होइन']],answer:1}
  ]},
  {title:'A New Beginning',neTitle:'नयाँ सुरुवात',paragraphs:[
   ['Three weeks later, the old house looked completely different. Students had cleaned the rooms, teachers had donated books, and neighbors had repaired the furniture. On Saturday morning, the library finally opened.','तीन हप्तापछि पुरानो घर पूर्ण रूपमा बदलिएको थियो। विद्यार्थीहरूले कोठाहरू सफा गरेका थिए, शिक्षकहरूले किताबहरू दिएका थिए र छिमेकीहरूले फर्निचर मर्मत गरेका थिए। शनिबार बिहान अन्ततः पुस्तकालय खुल्यो।'],
   ['Children hurried inside, excited to choose their first books. Kamala stood by the door with happy tears in her eyes. "You have given my dream a second life," she told Maya and Rohan. "Everyone helped," Maya replied.','बालबालिकाहरू खुसी हुँदै आफ्नो पहिलो किताब छान्न भित्र पसे। कमला ढोकामा उभिएकी थिइन् र उनका आँखामा खुसीका आँसु थिए। "तिमीहरूले मेरो सपनालाई नयाँ जीवन दियौ," उनले माया र रोहनलाई भनिन्। "सबैले सहयोग गरेका हुन्," मायाले जवाफ दिइन्।'],
   ['That evening, Maya returned the blue notebook to the bookshop. On its final page, she wrote, "Sometimes the greatest treasure is not gold or money. It is a dream we help someone achieve."','त्यो साँझ मायाले निलो कापी पुस्तक पसलमा फिर्ता राखिन्। अन्तिम पानामा उनले लेखिन्, "कहिलेकाहीँ सबैभन्दा ठूलो धन सुन वा पैसा होइन। कसैको सपना पूरा गर्न मद्दत गर्नु नै सबैभन्दा ठूलो धन हो।"']
  ],questions:[
   {en:'How long did it take to open the library?',ne:'पुस्तकालय खोल्न कति समय लाग्यो?',choices:[['Three weeks','तीन हप्ता'],['Ten years','दस वर्ष'],['One afternoon','एक दिउँसो']],answer:0},
   {en:'What is the main message of the story?',ne:'कथाको मुख्य सन्देश के हो?',choices:[['Money is the only treasure','पैसा मात्र धन हो'],['Always keep secrets','सधैँ रहस्य लुकाउनुपर्छ'],['Helping fulfill a dream is precious','कसैको सपना पूरा गर्न सहयोग गर्नु मूल्यवान् छ']],answer:2}
  ]}
 ]
};
/* Curated books are public text, not the private native lesson generator. */
const LIBRARY=[BOOK,...(Array.isArray(window.__sikauExtraStoryBooks)?window.__sikauExtraStoryBooks:[])];
const make=(doc,tag,className,text)=>{
 const el=doc.createElement(tag);if(className)el.className=className;
 if(text!==undefined)el.textContent=String(text);
 return el;
};
const readSaved=(view,key)=>{
 try{const value=JSON.parse(view.localStorage.getItem(key)||'null');
  return Array.isArray(value)?value.filter(x=>Number.isInteger(x)&&x>=0&&x<BOOK.chapters.length):[];
 }catch(_){return [];}
};
const readProgress=(view,key)=>{
 try{
  const raw=JSON.parse(view.localStorage.getItem(key)||'{}');
  if(!raw||typeof raw!=='object'||Array.isArray(raw))return {};
  const result={};
  for(const book of LIBRARY){
   const item=raw[book.id];if(!item||typeof item!=='object')continue;
   const passed=Array.isArray(item.passed)?
    item.passed.filter(i=>Number.isInteger(i)&&i>=0&&i<book.chapters.length):[];
   result[book.id]={passed:[...new Set(passed)],
    current:Number.isInteger(item.current)&&item.current>=0&&item.current<book.chapters.length?item.current:0};
  }
  return result;
 }catch(_){return {};}
};
function install(doc,reader,accountId){
 if(!doc?.head||!doc?.defaultView||!reader)return false;
 if(reader.dataset.sikauFeaturedReady==='2')return true;
 const layout=reader.querySelector('.read-v2-layout');
 if(!layout||!LIBRARY.length)return false;
 const view=doc.defaultView;
 const key='english-sikau-short-books-v2:'+encodeURIComponent(accountId||'session');
 const state=readProgress(view,key);
 // Migrate completed Old Bookshop chapters without discarding existing progress.
 const previousKey='english-sikau-feature-book-v1:'+encodeURIComponent(accountId||'session');
 if(!state[BOOK.id]){
  const saved=readSaved(view,previousKey);
  if(saved.length)state[BOOK.id]={passed:saved,current:Math.min(saved.length,BOOK.chapters.length-1)};
 }
 const persist=()=>{try{view.localStorage.setItem(key,JSON.stringify(state))}catch(_){}};
 const selected=(book)=>state[book.id]||(state[book.id]={passed:[],current:0});
 const styleId='sikauFeaturedBookStyle';
 if(!doc.getElementById(styleId)){
  const link=make(doc,'link');link.id=styleId;link.rel='stylesheet';
  link.href=new URL('./featured-bilingual-story.css?v=20261030-library-r3',document.baseURI).href;
  doc.head.append(link);
 }
 const root=make(doc,'section','sikau-featured-book sikau-library-v2');
 root.setAttribute('aria-label','English and Nepali short story library');
 const header=make(doc,'header','sikau-library-header');
 const headerCopy=make(doc,'div','sikau-library-copy');
 headerCopy.append(make(doc,'span','sikau-featured-eyebrow','STORY MODE · कथा संग्रह'),
  make(doc,'h2','','Short Story Library · छोटा कथाहरू'),
  make(doc,'p','','Choose a complete chapter book. Read English and Nepali together, listen, and unlock the next chapter with your quiz.'));
 header.append(headerCopy);
 const count=make(doc,'div','sikau-library-total',LIBRARY.length+' books · '+LIBRARY.length+' किताब');
 header.append(count);root.append(header);
 const shelf=make(doc,'section','sikau-story-shelf');
 shelf.setAttribute('aria-label','Choose a book · किताब छान्नुहोस्');
 const categories=['All','Quick Reads','Adventure','Mystery','Culture','Everyday Life'];
 const filters=make(doc,'nav','sikau-library-filters');
 filters.setAttribute('aria-label','Book categories');
 const grid=make(doc,'div','sikau-library-grid');
 shelf.append(filters,grid);root.append(shelf);
 const reading=make(doc,'div','sikau-featured-reading');
 reading.hidden=true;
 const top=make(doc,'div','sikau-featured-top');
 const cover=make(doc,'img','sikau-featured-cover');
 cover.alt='Book cover';cover.loading='lazy';
 const intro=make(doc,'div','sikau-featured-intro');
 const back=make(doc,'button','sikau-featured-switch','← All books · सबै किताब');
 back.type='button';
 top.append(cover,intro,back);
 const storyArea=make(doc,'div','sikau-featured-story-area');
 const nav=make(doc,'nav','sikau-featured-chapters');
 nav.setAttribute('aria-label','Chapters · अध्यायहरू');
 const section=make(doc,'article','sikau-featured-chapter');
 const feedback=make(doc,'p','sikau-featured-feedback');
 feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
 const quiz=make(doc,'section','sikau-featured-quiz');
 quiz.setAttribute('aria-label','Chapter quiz');
 const footer=make(doc,'div','sikau-featured-footer');
 storyArea.append(nav,section,quiz,feedback,footer);
 reading.append(top,storyArea);root.append(reading);
 reader.insertBefore(root,layout);
 // Hide *only* the obsolete native Story-mode generator. Practice mode is separate.
 layout.style.setProperty('display','none','important');
 layout.setAttribute('aria-hidden','true');
 reader.dataset.sikauFeaturedReady='2';
 let currentBook=BOOK,active=0,completed=new Set(),category='All';
 const quizAnswers=new Map();
 const firstLocked=()=>{let i=0;while(i<currentBook.chapters.length&&completed.has(i))i++;return i;};
 const stop=()=>{
  if(view.__sikauNepaliVoice?.stop)view.__sikauNepaliVoice.stop();
  else view.speechSynthesis?.cancel?.();
 };
 const speak=(text,locale)=>{
  if(typeof view.__sikauSpeech==='function')view.__sikauSpeech(text,locale,'rd',{rate:0.94});
  else if(typeof view.__sikauNepaliVoice?.speakText==='function')view.__sikauNepaliVoice.speakText(text,locale,'rd',{rate:0.94});
  else feedback.textContent='Audio is loading · अडियो लोड हुँदैछ।';
 };
 const playButton=(label,text,locale)=>{
  const b=make(doc,'button','sikau-featured-play',label);b.type='button';
  b.setAttribute('aria-label',locale==='ne-NP'?'Listen to Nepali audio':'Listen to English audio');
  b.addEventListener('click',()=>speak(text,locale));return b;
 };
 const renderShelf=()=>{
  filters.replaceChildren();grid.replaceChildren();
  for(const value of categories){
   const tab=make(doc,'button','sikau-library-filter'+(category===value?' on':''),value==='All'?'All books · सबै':value);
   tab.type='button';tab.setAttribute('aria-pressed',String(category===value));
   tab.addEventListener('click',()=>{category=value;renderShelf();});
   filters.append(tab);
  }
  for(const book of LIBRARY){
   if(category==='Quick Reads'?book.chapters.length>3:category!=='All'&&book.category!==category)continue;
   const progress=selected(book);
   const passed=progress.passed.length;
   const card=make(doc,'article','sikau-library-card');
   const image=make(doc,'img','sikau-library-cover');
   image.src=new URL(book.cover,document.baseURI).href;
   image.alt='Illustration for '+book.title;image.loading='lazy';
   const copy=make(doc,'div','sikau-library-card-copy');
   copy.append(make(doc,'span','sikau-library-category',book.category||'Mystery'),
    make(doc,'h3','',book.title),
    make(doc,'p','sikau-library-ne-title',book.neTitle),
    make(doc,'p','sikau-library-description',book.description||'A connected English and Nepali chapter story.'),
    make(doc,'p','sikau-library-ne-description',book.neDescription||''),
    make(doc,'p','sikau-library-progress',(book.chapters.length<=3?'⚡ Quick read · ':'')+book.chapters.length+' chapters · '+passed+'/'+book.chapters.length+' completed · '+book.level));
   const button=make(doc,'button','sikau-library-open',passed?'Continue reading · पढाइ जारी':'Read this book · किताब पढ्नुहोस्');
   button.type='button';button.addEventListener('click',()=>openBook(book));
   copy.append(button);card.append(image,copy);grid.append(card);
  }
 };
 const openBook=book=>{
  stop();
  currentBook=book;
  const progress=selected(book);
  completed=new Set(progress.passed);
  const highest=Math.min(firstLocked(),book.chapters.length-1);
  active=Number.isInteger(progress.current)?Math.min(progress.current,highest):highest;
  // Keep the learner on the last chapter they reached, even after refreshing.
  cover.src=new URL(book.cover,document.baseURI).href;
  cover.alt='Illustration for '+book.title;
  intro.replaceChildren();
  intro.append(make(doc,'span','sikau-featured-eyebrow','CHAPTER BOOK · अध्यायबद्ध कथा'),
   make(doc,'h2','',book.title),make(doc,'p','sikau-featured-ntitle',book.neTitle),
   make(doc,'p','sikau-featured-level',book.chapters.length+' connected chapters · '+book.level));
  shelf.hidden=true;reading.hidden=false;
  render();
  root.scrollIntoView?.({block:'start',behavior:'smooth'});
 };
 const showShelf=()=>{
  stop();reading.hidden=true;shelf.hidden=false;renderShelf();
  root.scrollIntoView?.({block:'start',behavior:'smooth'});
 };
 back.addEventListener('click',showShelf);
 function render(){
  const c=currentBook.chapters[active];
  selected(currentBook).current=active;persist();
  feedback.textContent='';
  nav.replaceChildren();section.replaceChildren();quiz.replaceChildren();footer.replaceChildren();
  currentBook.chapters.forEach((chapter,i)=>{
   const unlocked=i<=firstLocked()||completed.has(i);
   const button=make(doc,'button','sikau-featured-tab'+(i===active?' on':''),
    (unlocked?'':'🔒 ')+'Chapter '+(i+1)+' · '+chapter.neTitle);
   button.type='button';button.disabled=!unlocked;
   button.title=chapter.title+' · '+chapter.neTitle;
   button.setAttribute('aria-current',i===active?'step':'false');
   button.addEventListener('click',()=>{stop();active=i;render();});nav.append(button);
  });
  section.append(make(doc,'p','sikau-featured-chapter-count','CHAPTER '+(active+1)+' OF '+currentBook.chapters.length),
   make(doc,'h3','',c.title),make(doc,'p','sikau-featured-subtitle',c.neTitle));
  const listen=make(doc,'div','sikau-featured-listen');
  const allEn=c.paragraphs.map(p=>p[0]).join(' '),allNe=c.paragraphs.map(p=>p[1]).join(' ');
  listen.append(playButton('🔊 Listen in English',allEn,'en-US'),
   playButton('🔊 नेपालीमा सुन्नुहोस्',allNe,'ne-NP'));
  const stopButton=make(doc,'button','sikau-featured-stop','■ Stop · रोक्नुहोस्');
  stopButton.type='button';stopButton.addEventListener('click',stop);
  listen.append(stopButton);section.append(listen);
  for(const [en,ne] of c.paragraphs){
   const pair=make(doc,'div','sikau-featured-pair');
   const english=make(doc,'div','sikau-featured-lang'),nepali=make(doc,'div','sikau-featured-lang');
   nepali.lang='ne-NP';english.lang='en-US';
   const enHead=make(doc,'div','sikau-featured-lang-head');
   enHead.append(make(doc,'strong','','English'),playButton('🔊',en,'en-US'));
   const neHead=make(doc,'div','sikau-featured-lang-head');
   neHead.append(make(doc,'strong','','नेपाली'),playButton('🔊',ne,'ne-NP'));
   english.append(enHead,make(doc,'p','',en));nepali.append(neHead,make(doc,'p','',ne));
   pair.append(english,nepali);section.append(pair);
  }
  quiz.append(make(doc,'h4','','Check your understanding · कथा कति बुझ्नुभयो?'));
  quiz.append(make(doc,'p','sikau-featured-help',
   'Tap ONE answer for each question, then check your answers. · प्रत्येक प्रश्नमा एउटा उत्तर छान्नुहोस्, त्यसपछि जाँच्नुहोस्।'));
  const answerKey=currentBook.id+'|'+active;
  const saved=quizAnswers.get(answerKey)||[];
  const answerCount=make(doc,'p','sikau-featured-answer-count');
  answerCount.setAttribute('role','status');
  answerCount.setAttribute('aria-live','polite');
  const updateAnswerCount=()=>{
   const answers=quizAnswers.get(answerKey)||[];
   const filled=c.questions.reduce((sum,_q,i)=>sum+(Number.isInteger(answers[i])?1:0),0);
   answerCount.textContent=filled+' of '+c.questions.length+' selected · '+filled+'/'+c.questions.length+' उत्तर छानियो';
  };
  quiz.append(answerCount);updateAnswerCount();
  c.questions.forEach((question,i)=>{
   const field=make(doc,'fieldset','sikau-featured-question');
   field.append(make(doc,'legend','',String(i+1)+'. '+question.en+' · '+question.ne));
   question.choices.forEach(([en,ne],j)=>{
    const line=make(doc,'label','sikau-featured-option');
    const input=make(doc,'input');input.type='radio';
    input.className='sikau-featured-radio';
    input.name='sikau-book-'+currentBook.id+'-'+active+'-'+i;
    input.value=String(j);input.checked=saved[i]===j;
    input.addEventListener('change',()=>{
     const answers=quizAnswers.get(answerKey)||[];answers[i]=j;quizAnswers.set(answerKey,answers);
     feedback.textContent='';updateAnswerCount();
    });
    const marker=make(doc,'span','sikau-featured-choice-marker','ABC'[j]);
    marker.setAttribute('aria-hidden','true');
    const choice=make(doc,'span','sikau-featured-choice-text',en+' · '+ne);
    const chosen=make(doc,'span','sikau-featured-choice-state','✓ Selected · छानियो');
    chosen.setAttribute('aria-hidden','true');
    line.append(input,marker,choice,chosen);field.append(line);
   });
   quiz.append(field);
  });
  const check=make(doc,'button','sikau-featured-check',completed.has(active)?
   '✓ Passed · उत्तीर्ण':'Check answers · उत्तर जाँच्नुहोस्');
  check.type='button';
  check.addEventListener('click',()=>{
   const answers=quizAnswers.get(answerKey)||[];
   const score=c.questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0);
   if(c.questions.some((_q,i)=>!Number.isInteger(answers[i]))){
    feedback.textContent='Answer all questions · सबै प्रश्नको उत्तर दिनुहोस्।';return;
   }
   if(score!==c.questions.length){
    feedback.textContent='Score: '+Math.round(100*score/c.questions.length)+'%. Try again for 100% · फेरि प्रयास गर्नुहोस्।';return;
   }
   completed.add(active);
   selected(currentBook).passed=[...completed].sort((a,b)=>a-b);
   persist();render();
   feedback.textContent='100% — Wonderful! Next chapter unlocked · उत्कृष्ट! अर्को अध्याय खुल्यो।';
  });
  quiz.append(check);
  const previous=make(doc,'button','sikau-featured-nav','← Previous chapter · अघिल्लो अध्याय');
  previous.type='button';previous.disabled=active===0;
  previous.addEventListener('click',()=>{stop();active--;render();});
  footer.append(previous);
  if(active<currentBook.chapters.length-1){
   const next=make(doc,'button','sikau-featured-nav sikau-featured-next','Next chapter · अर्को अध्याय →');
   next.type='button';next.disabled=!completed.has(active);
   next.addEventListener('click',()=>{stop();active++;render();});
   footer.append(next);
  }else if(completed.has(active))footer.append(make(doc,'p','sikau-featured-end','✦ The End · समाप्त ✦'));
 }
 renderShelf();
 return true;
}
window.enhanceFeaturedBilingualStory=install;
window.__sikauFeaturedStoryData=BOOK;
window.__sikauBookLibrary=LIBRARY;
})();