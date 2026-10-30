/* English Sikau: a complete, bilingual chapter book. Renders only inside the
 * authenticated Reading tab; never accesses private lessons, XP or entitlements.
 * The original Reading library and quizzes remain intact. */
(function(){
'use strict';
const BOOK={
 id:'old-bookshop',title:'The Secret of the Old Bookshop',neTitle:'पुरानो पुस्तक पसलको रहस्य',
 level:'A2–B1',cover:'./assets/read-topics/mystery.svg',
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
function install(doc,reader,accountId){
 if(!doc?.head||!doc?.defaultView||!reader)return false;
 if(reader.dataset.sikauFeaturedReady==='1')return true;
 const layout=reader.querySelector('.read-v2-layout');
 if(!layout)return false;
 reader.dataset.sikauFeaturedReady='1';
 const view=doc.defaultView;
 const key='english-sikau-feature-book-v1:'+encodeURIComponent(accountId||'session');
 const completed=new Set(readSaved(view,key));
 const firstLocked=()=>{let n=0;while(n<BOOK.chapters.length&&completed.has(n))n++;return n;};
 let active=Math.min(firstLocked(),BOOK.chapters.length-1),showFeatured=true;
 const styleId='sikauFeaturedBookStyle';
 if(!doc.getElementById(styleId)){
  const link=make(doc,'link');link.id=styleId;link.rel='stylesheet';
  link.href=new URL('./featured-bilingual-story.css?v=20261030-chapters-r1',document.baseURI).href;
  doc.head.append(link);
 }
 const root=make(doc,'section','sikau-featured-book');
 root.setAttribute('aria-label','The Secret of the Old Bookshop, a bilingual chapter story');
 const top=make(doc,'div','sikau-featured-top');
 const cover=make(doc,'img','sikau-featured-cover');cover.src=new URL(BOOK.cover,document.baseURI).href;
 cover.alt='Mystery story illustration';cover.loading='lazy';
 const intro=make(doc,'div','sikau-featured-intro');
 intro.append(make(doc,'span','sikau-featured-eyebrow','FEATURED SHORT BOOK · विशेष कथा'),
  make(doc,'h2','',BOOK.title),make(doc,'p','sikau-featured-ntitle',BOOK.neTitle),
  make(doc,'p','sikau-featured-level','5 connected chapters · ५ जोडिएका अध्याय · '+BOOK.level));
 const other=make(doc,'button','sikau-featured-switch','Other stories · अन्य कथाहरू');
 other.type='button';
 top.append(cover,intro,other);root.append(top);
 const storyArea=make(doc,'div','sikau-featured-reading');
 const nav=make(doc,'nav','sikau-featured-chapters');
 nav.setAttribute('aria-label','Chapters · अध्यायहरू');
 const section=make(doc,'article','sikau-featured-chapter');
 const feedback=make(doc,'p','sikau-featured-feedback');
 feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
 const quiz=make(doc,'section','sikau-featured-quiz');
 quiz.setAttribute('aria-label','Chapter quiz');
 const footer=make(doc,'div','sikau-featured-footer');
 storyArea.append(nav,section,quiz,feedback,footer);root.append(storyArea);
 reader.insertBefore(root,layout);
 const persist=()=>{try{view.localStorage.setItem(key,JSON.stringify([...completed].sort((a,b)=>a-b))}catch(_){}};
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
 const setView=show=>{
  showFeatured=show;
  layout.style.setProperty('display',show?'none':'','important');
  if(!show)layout.style.removeProperty('display');
  storyArea.hidden=!show;
  root.classList.toggle('sikau-featured-collapsed',!show);
  other.textContent=show?'Other stories · अन्य कथाहरू':'Read featured story · विशेष कथा पढ्नुहोस्';
  if(show)render();
 };
 other.addEventListener('click',()=>setView(!showFeatured));
 const quizAnswers=new Map();
 function render(){
  const c=BOOK.chapters[active];
  feedback.textContent='';
  nav.replaceChildren();section.replaceChildren();quiz.replaceChildren();footer.replaceChildren();
  BOOK.chapters.forEach((chapter,i)=>{
   const unlocked=i<=firstLocked()||completed.has(i);
   const button=make(doc,'button','sikau-featured-tab'+(i===active?' on':''),
    (unlocked?'':'🔒 ')+'Chapter '+(i+1));
   button.type='button';button.disabled=!unlocked;
   button.title=chapter.title+' · '+chapter.neTitle;
   button.setAttribute('aria-current',i===active?'step':'false');
   button.addEventListener('click',()=>{active=i;render();});nav.append(button);
  });
  section.append(make(doc,'p','sikau-featured-chapter-count','CHAPTER '+(active+1)+' OF '+BOOK.chapters.length),
   make(doc,'h3','',c.title),make(doc,'p','sikau-featured-subtitle',c.neTitle));
  const listen=make(doc,'div','sikau-featured-listen');
  const allEn=c.paragraphs.map(p=>p[0]).join(' '),allNe=c.paragraphs.map(p=>p[1]).join(' ');
  listen.append(playButton('🔊 Listen in English',allEn,'en-US'),
   playButton('🔊 नेपालीमा सुन्नुहोस्',allNe,'ne-NP'));
  const stop=make(doc,'button','sikau-featured-stop','■ Stop · रोक्नुहोस्');stop.type='button';
  stop.addEventListener('click',()=>{
   if(view.__sikauNepaliVoice?.stop)view.__sikauNepaliVoice.stop();
   else view.speechSynthesis?.cancel?.();
  });
  listen.append(stop);section.append(listen);
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
   'Answer both questions correctly to unlock the next chapter · अर्को अध्याय खोल्न दुवै प्रश्न मिलाउनुहोस्।'));
  const saved=quizAnswers.get(active)||[];
  c.questions.forEach((question,i)=>{
   const field=make(doc,'fieldset','sikau-featured-question');
   field.append(make(doc,'legend','',String(i+1)+'. '+question.en+' · '+question.ne));
   question.choices.forEach(([en,ne],j)=>{
    const line=make(doc,'label','sikau-featured-option');
    const input=make(doc,'input');input.type='radio';
    input.name='sikau-book-'+active+'-'+i;input.value=String(j);
    input.checked=saved[i]===j;
    input.addEventListener('change',()=>{
     const answers=quizAnswers.get(active)||[];answers[i]=j;quizAnswers.set(active,answers);
     feedback.textContent='';
    });
    line.append(input,make(doc,'span','',en+' · '+ne));field.append(line);
   });
   quiz.append(field);
  });
  const check=make(doc,'button','sikau-featured-check',completed.has(active)?
   '✓ Passed · उत्तीर्ण':'Check answers · उत्तर जाँच्नुहोस्');
  check.type='button';
  check.addEventListener('click',()=>{
   const answers=quizAnswers.get(active)||[];
   const score=c.questions.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0);
   if(answers.length<c.questions.length||answers.some(x=>!Number.isInteger(x))){
    feedback.textContent='Choose an answer for each question · सबै प्रश्नको उत्तर छान्नुहोस्।';return;
   }
   if(score!==c.questions.length){
    feedback.textContent='Score: '+Math.round(100*score/c.questions.length)+'%. Try again for 100% · फेरि प्रयास गर्नुहोस्।';return;
   }
   completed.add(active);persist();
   feedback.textContent='100% — Wonderful! Next chapter unlocked · उत्कृष्ट! अर्को अध्याय खुल्यो।';
   render();
   feedback.textContent='100% — Wonderful! Next chapter unlocked · उत्कृष्ट! अर्को अध्याय खुल्यो।';
  });
  quiz.append(check);
  const previous=make(doc,'button','sikau-featured-nav','← Previous chapter · अघिल्लो अध्याय');
  previous.type='button';previous.disabled=active===0;
  previous.addEventListener('click',()=>{active--;render();});
  footer.append(previous);
  if(active<BOOK.chapters.length-1){
   const next=make(doc,'button','sikau-featured-nav sikau-featured-next','Next chapter · अर्को अध्याय →');
   next.type='button';next.disabled=!completed.has(active);
   next.addEventListener('click',()=>{active++;render();});
   footer.append(next);
  }else if(completed.has(active))footer.append(make(doc,'p','sikau-featured-end','✦ The End · समाप्त ✦'));
 }
 setView(true);
 return true;
}
window.enhanceFeaturedBilingualStory=install;
window.__sikauFeaturedStoryData=BOOK;
})();