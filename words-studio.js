/* English Sikau Words Studio — presentation-layer enhancement.
 * Runs only inside an authorized, already-loaded private lesson frame.
 * Preserves native dictionary and phrasebook elements, handlers, and saves.
 */
(function(){
'use strict';
const STYLE_URL=new URL('words-studio.css?v=20261020-organized-r1',document.baseURI).href;
const vocabulary=[
['adventure','साहसिक यात्रा','travel','noun',2,'An exciting or unusual experience or journey.','We went on an adventure in the mountains.','हामी पहाडमा साहसिक यात्रामा गयौं।'],
['beautiful','सुन्दर','nature','adjective',1,'Pleasant or lovely to see.','Pokhara is a beautiful city.','पोखरा एउटा सुन्दर सहर हो।'],
['delicious','स्वादिष्ट','food','adjective',1,'Having a very pleasant taste.','This momo is delicious.','यो मःम स्वादिष्ट छ।'],
['mountain','पहाड','nature','noun',1,'A very high area of land.','We can see the mountain from here.','हामी यहाँबाट पहाड देख्न सक्छौं।'],
['practice','अभ्यास गर्नु','school','verb',1,'To do something regularly to improve.','I practice English every day.','म हरेक दिन अंग्रेजी अभ्यास गर्छु।'],
['culture','संस्कृति','culture','noun',3,'The traditions, beliefs, and ways of life of a group.','Nepal has a rich culture.','नेपालमा समृद्ध संस्कृति छ।'],
['hello','नमस्ते','daily','interjection',1,'A greeting when meeting someone.','Hello! How are you?','नमस्ते! तपाईंलाई कस्तो छ?'],
['goodbye','बिदा','daily','interjection',1,'Something you say when leaving.','Goodbye! See you tomorrow.','बिदा! भोलि भेटौंला।'],
['please','कृपया','daily','adverb',1,'A polite word used when requesting something.','Please help me.','कृपया मलाई मद्दत गर्नुहोस्।'],
['thank you','धन्यवाद','daily','phrase',1,'Words used to express gratitude.','Thank you for your help.','तपाईंको मद्दतका लागि धन्यवाद।'],
['friend','साथी','family','noun',1,'A person you like and trust.','My friend lives in Kathmandu.','मेरो साथी काठमाडौंमा बस्छ।'],
['family','परिवार','family','noun',1,'People related to one another.','My family lives in Nepal.','मेरो परिवार नेपालमा बस्छ।'],
['mother','आमा','family','noun',1,'A female parent.','My mother cooks delicious food.','मेरी आमाले स्वादिष्ट खाना पकाउनुहुन्छ।'],
['brother','दाजु वा भाइ','family','noun',1,'A male sibling.','My brother is studying.','मेरो दाजु पढ्दै हुनुहुन्छ।'],
['momo','मःम','food','noun',1,'A popular Nepali dumpling dish.','We ate momo for lunch.','हामीले दिउँसो मःम खायौं।'],
['rice','भात','food','noun',1,'A grain commonly eaten as food.','I eat rice for dinner.','म बेलुकाको खानामा भात खान्छु।'],
['water','पानी','food','noun',1,'A clear liquid that people drink.','May I have some water?','मलाई अलिकति पानी दिनुहुन्छ?'],
['restaurant','रेस्टुरेन्ट','food','noun',2,'A place where meals are prepared and served.','This restaurant serves Nepali food.','यो रेस्टुरेन्टमा नेपाली खाना पाइन्छ।'],
['journey','यात्रा','travel','noun',2,'Travel from one place to another.','Our journey started early.','हाम्रो यात्रा बिहानै सुरु भयो।'],
['ticket','टिकट','travel','noun',1,'A pass used for a journey or event.','I bought a bus ticket.','मैले बसको टिकट किनें।'],
['airport','विमानस्थल','travel','noun',2,'A place where airplanes arrive and depart.','We arrived at the airport on time.','हामी समयमै विमानस्थल पुग्यौं।'],
['destination','गन्तव्य','travel','noun',3,'The place someone is traveling to.','Pokhara is our destination.','पोखरा हाम्रो गन्तव्य हो।'],
['teacher','शिक्षक','school','noun',1,'A person who teaches students.','My teacher speaks English.','मेरो शिक्षक अंग्रेजी बोल्नुहुन्छ।'],
['student','विद्यार्थी','school','noun',1,'A person who studies at school or college.','She is a university student.','उनी विश्वविद्यालयकी विद्यार्थी हुन्।'],
['book','किताब','school','noun',1,'Pages bound together for reading.','I read an English book.','म अंग्रेजी किताब पढ्छु।'],
['lesson','पाठ','school','noun',2,'Something taught or learned.','Today’s lesson is easy.','आजको पाठ सजिलो छ।'],
['job','जागिर','work','noun',1,'Regular paid work.','I am looking for a job.','म जागिर खोज्दै छु।'],
['office','कार्यालय','work','noun',1,'A place where people work.','My office opens at nine.','मेरो कार्यालय नौ बजे खुल्छ।'],
['meeting','बैठक','work','noun',2,'An event where people come together to discuss things.','We have a meeting today.','आज हाम्रो बैठक छ।'],
['customer','ग्राहक','work','noun',2,'A person who buys goods or services.','The customer asked a question.','ग्राहकले एउटा प्रश्न सोधे।'],
['happy','खुसी','emotions','adjective',1,'Feeling joy or pleasure.','I am happy today.','म आज खुसी छु।'],
['sad','दुःखी','emotions','adjective',1,'Feeling unhappy.','He feels sad today.','उनी आज दुःखी छन्।'],
['excited','उत्साहित','emotions','adjective',2,'Feeling happy and eager about something.','I am excited to visit Nepal.','म नेपाल घुम्न उत्साहित छु।'],
['confident','आत्मविश्वासी','emotions','adjective',3,'Feeling sure of your ability.','Practice helps me feel confident.','अभ्यासले मलाई आत्मविश्वासी बनाउँछ।'],
['river','नदी','nature','noun',1,'A natural flow of water.','The river flows through the valley.','नदी उपत्यकाबाट बग्छ।'],
['forest','जंगल','nature','noun',2,'A large area filled with trees.','We walked through the forest.','हामी जंगल हुँदै हिँड्यौं।'],
['lake','ताल','nature','noun',1,'A large body of water surrounded by land.','Phewa Lake is in Pokhara.','फेवा ताल पोखरामा छ।'],
['festival','चाडपर्व','culture','noun',2,'A celebration held by a community.','Tihar is a festival of lights.','तिहार बत्तीको चाड हो।'],
['tradition','परम्परा','culture','noun',3,'A custom passed down through generations.','Our family follows this tradition.','हाम्रो परिवारले यो परम्परा मान्छ।'],
['temple','मन्दिर','culture','noun',1,'A building used for worship.','We visited a temple in Kathmandu.','हामी काठमाडौंको एउटा मन्दिर गयौं।'],
['doctor','डाक्टर','health','noun',1,'A person trained to treat illness.','The doctor helped my father.','डाक्टरले मेरा बुबालाई मद्दत गर्नुभयो।'],
['healthy','स्वस्थ','health','adjective',2,'In good physical or mental condition.','Healthy food helps us grow.','स्वस्थ खानाले हामीलाई बढ्न मद्दत गर्छ।'],
['exercise','व्यायाम','health','noun',2,'Physical activity to keep fit.','I do exercise every morning.','म हरेक बिहान व्यायाम गर्छु।'],
['medicine','औषधि','health','noun',2,'Something used to treat illness.','Take the medicine as directed.','निर्देशनअनुसार औषधि खानुहोस्।'],
['learn','सिक्नु','school','verb',1,'To gain knowledge or a skill.','I want to learn English.','म अंग्रेजी सिक्न चाहन्छु।'],
['speak','बोल्नु','daily','verb',1,'To say words aloud.','Can you speak slowly?','तपाईं बिस्तारै बोल्न सक्नुहुन्छ?'],
['understand','बुझ्नु','daily','verb',2,'To know the meaning of something.','I understand this sentence.','म यो वाक्य बुझ्छु।'],
['prepare','तयार गर्नु','work','verb',2,'To make something ready.','I prepare for work every morning.','म हरेक बिहान कामका लागि तयार हुन्छु।'],
['neighbor','छिमेकी','family','noun',2,'A person who lives nearby.','Our neighbor is very kind.','हाम्रो छिमेकी धेरै दयालु हुनुहुन्छ।'],
['morning','बिहान','daily','noun',1,'The early part of the day.','I study in the morning.','म बिहान पढ्छु।'],
['market','बजार','daily','noun',1,'A place where goods are bought and sold.','We went to the market.','हामी बजार गयौं।'],
['village','गाउँ','travel','noun',1,'A small settlement in the countryside.','My village is near Pokhara.','मेरो गाउँ पोखरा नजिक छ।'],
['sunrise','सूर्योदय','nature','noun',2,'The moment when the sun appears in the morning.','We watched the sunrise in the hills.','हामीले डाँडामा सूर्योदय हेर्‍यौं।'],
['proud','गर्वित','emotions','adjective',2,'Feeling pleased about an achievement.','I am proud of my progress.','म आफ्नो प्रगतिमा गर्वित छु।']
].map(a=>({word:a[0],ne:a[1],category:a[2],type:a[3],level:a[4],definition:a[5],example:a[6],exampleNe:a[7],saved:false}));
const cats=[
['all','▦','All Words','सबै शब्दहरू'],
['daily','🏠','Daily Life','दैनिक जीवन'],
['food','🥭','Food','खाना'],
['travel','✈️','Travel','यात्रा'],
['family','👪','Family','परिवार'],
['school','🎓','School','विद्यालय'],
['saved','⭐','Saved','सुरक्षित'],
['work','💼','Work','काम'],
['emotions','❤️','Emotions','भावना'],
['nature','🌳','Nature','प्रकृति'],
['culture','🪔','Culture','संस्कृति'],
['health','🩺','Health','स्वास्थ्य']
];
const categories=Object.fromEntries(cats.map(c=>[c[0],c]));
function el(d,tag,cls,text){
 const node=d.createElement(tag);
 if(cls)node.className=cls;
 if(text!==undefined&&text!==null)node.textContent=String(text);
 return node;
}
function add(d,root,tag,cls,text){const n=el(d,tag,cls,text);root.appendChild(n);return n;}
function readSaved(doc,box){
 const view=doc.defaultView;
 let saved=view?.S?.d?.words;
 if(!saved||typeof saved!=='object')saved={};
 const words=[];
 for(const [k,v] of Object.entries(saved)){
  if(!k||k.length>90)continue;
  words.push({word:k,ne:String(v?.ne||'—'),category:'saved',type:'word',level:null,definition:'A word in your saved English Sikau dictionary.',example:'',exampleNe:'',saved:true});
 }
 // Older private builds may not export S; names can still appear in native box.
 if(!words.length&&box)for(const native of box.querySelectorAll('.w[data-w]')){
  const word=native.dataset.w;
  if(word&&word.length<=90)words.push({word,ne:'—',category:'saved',type:'word',level:null,definition:'Saved in your personal word list.',example:'',exampleNe:'',saved:true});
 }
 return words;
}
function combined(doc,box){
 const native=readSaved(doc,box);
 const merged=new Map(vocabulary.map(item=>[item.word.toLowerCase(),{...item}]));
 for(const item of native){
  const key=item.word.toLowerCase();
  const prev=merged.get(key);
  merged.set(key,prev?{...prev,saved:true,ne:item.ne==='—'?prev.ne:item.ne}:item);
 }
 return [...merged.values()];
}
function speak(doc,text,lang){
 if(!text)return;
 try{
  if(typeof doc.defaultView.speak==='function'){
   doc.defaultView.speak(text,.88,lang);
   return;
  }
 }catch(_){}
 const view=doc.defaultView;
 if(view.speechSynthesis&&view.SpeechSynthesisUtterance){
  const utterance=new view.SpeechSynthesisUtterance(text);
  utterance.lang=lang==='ne'?'ne-NP':'en-US';utterance.rate=.88;
  view.speechSynthesis.cancel();view.speechSynthesis.speak(utterance);
 }
}
window.enhanceWordsDashboard=function(doc){
 if(!doc?.body||!doc.head)return;
 const section=doc.getElementById('words');
 const content=section?.querySelector(':scope > .content');
 const wordBox=section?.querySelector('#wordBox');
 const phrasebook=section?.querySelector('#pbList');
 const nativeCards=wordBox?.closest('.card')&&phrasebook?.closest('.card')?
 [wordBox.closest('.card'),phrasebook.closest('.card')]:null;
 if(!section||!content||!nativeCards||section.dataset.wordsStudio==='1')return;
 section.dataset.wordsStudio='1';
 if(!doc.getElementById('sikauWordsStudioCSS')){
  const stylesheet=el(doc,'link');stylesheet.rel='stylesheet';
  stylesheet.id='sikauWordsStudioCSS';stylesheet.href=STYLE_URL;doc.head.appendChild(stylesheet);
 }
 let selected='adventure',category='all',query='',level='all',type='all',sort='default',tab='meaning',feedback='',quizValue='',allTopics=false;
 let items=combined(doc,wordBox);
 const root=el(doc,'div','wv-root');
 root.id='sikauWordsDashboard';
 const hero=add(doc,root,'section','wv-hero');
 const art=add(doc,hero,'div','wv-hero-art');art.setAttribute('aria-hidden','true');
 const message=add(doc,hero,'div','wv-hero-message');
 add(doc,message,'span','wv-small-banner','WORDS · शब्दहरू');
 const h=add(doc,message,'h1','','Words ');add(doc,h,'span','','शब्दहरू');
 add(doc,message,'p','','Build your vocabulary step by step.');
 add(doc,message,'p','wv-ne','नयाँ शब्द सिकौं, सम्झौं र दैनिक प्रयोग गरौं।');
 const todayPanel=add(doc,hero,'div','wv-today');
 add(doc,todayPanel,'div','wv-today-head','💡 Today’s Word · आजको शब्द');
 const todayTerm=add(doc,todayPanel,'strong','');
 const todayNe=add(doc,todayPanel,'span','');
 const todayExample=add(doc,todayPanel,'p','');
 const todayButton=add(doc,todayPanel,'button','wv-small-button','Explore word →');
 todayButton.type='button';
 const today=vocabulary[Math.floor(Date.now()/86400000)%vocabulary.length];
 todayTerm.textContent=today.word;todayNe.textContent=today.ne;todayExample.textContent=today.example;

 todayButton.addEventListener('click',()=>{
  resetFilters();selected=today.word;render();
  detail.scrollIntoView({behavior:'smooth',block:'nearest'});
 });
 const topicPanel=add(doc,root,'section','wv-topic-panel');
 const topicHeading=add(doc,topicPanel,'div','wv-panel-header');
 const topicTitle=add(doc,topicHeading,'div','');
 add(doc,topicTitle,'strong','','📚 Explore by topic · विषयअनुसार सिक्नुहोस्');
 add(doc,topicTitle,'small','','Pick a topic to explore relevant English words.');
 const moreTopics=add(doc,topicHeading,'button','wv-show-topics','More topics · थप विषयहरू');
 moreTopics.type='button';moreTopics.setAttribute('aria-expanded','false');
 const catsArea=add(doc,topicPanel,'div','wv-categories');
 catsArea.setAttribute('aria-label','Vocabulary categories');
 moreTopics.addEventListener('click',()=>{allTopics=!allTopics;renderCategories();});
 const filterPanel=add(doc,root,'section','wv-filter-panel');
 const filterHeading=add(doc,filterPanel,'div','wv-panel-header');
 const filterTitle=add(doc,filterHeading,'div','');
 add(doc,filterTitle,'strong','','🔎 Find words · शब्द खोज्नुहोस्');
 add(doc,filterTitle,'small','','Search first, or choose a level for practice.');
 const searchLine=add(doc,filterPanel,'div','wv-searchline');
 const search=add(doc,searchLine,'label','wv-search');
 const searchIcon=add(doc,search,'span','','⌕');searchIcon.setAttribute('aria-hidden','true');
 const searchInput=add(doc,search,'input','','');
 searchInput.type='search';searchInput.placeholder='Search in English or Nepali… · नेपाली वा अंग्रेजीमा खोज्नुहोस्';
 searchInput.setAttribute('aria-label','Search vocabulary words');
 const filterRow=add(doc,filterPanel,'div','wv-filterrow');
 const levelArea=add(doc,filterRow,'div','wv-level-filter');
 add(doc,levelArea,'span','wv-filter-label','Level · सिकाइ स्तर');
 const levelChips=add(doc,levelArea,'div','wv-level-chips');
 const levelButtons={};
 for(const [v,t] of [['all','All levels · सबै'],['1','Level 1'],['2','Level 2'],['3','Level 3']]){
  const b=add(doc,levelChips,'button','wv-level-chip',t);
  b.type='button';b.dataset.level=v;
  b.addEventListener('click',()=>{level=v;render();});
  levelButtons[v]=b;
 }
 const advanced=add(doc,filterRow,'div','wv-advanced-filters');
 const typeField=add(doc,advanced,'label','wv-filter-field');
 add(doc,typeField,'span','wv-filter-label','Type · प्रकार');
 const typeSelect=add(doc,typeField,'select','wv-select');
 typeSelect.setAttribute('aria-label','Filter by word type');
 [['all','All word types'],['noun','Noun'],['verb','Verb'],['adjective','Adjective'],['adverb','Adverb'],['phrase','Phrase'],['interjection','Greeting']].forEach(([v,t])=>{const option=add(doc,typeSelect,'option','',t);option.value=v;});
 const sortField=add(doc,advanced,'label','wv-filter-field');
 add(doc,sortField,'span','wv-filter-label','Sort · क्रम');
 const sortSelect=add(doc,sortField,'select','wv-select');
 sortSelect.setAttribute('aria-label','Sort words');
 [['default','Suggested'],['az','A to Z'],['za','Z to A'],['level','Easy first']].forEach(([v,t])=>{const option=add(doc,sortSelect,'option','',t);option.value=v;});
 const filterFooter=add(doc,filterPanel,'div','wv-filter-footer');
 const filterSummary=add(doc,filterFooter,'span','wv-filter-summary','');
 filterSummary.setAttribute('role','status');filterSummary.setAttribute('aria-live','polite');
 const clearFilters=add(doc,filterFooter,'button','wv-reset','Clear filters · हटाउनुहोस्');
 clearFilters.type='button';clearFilters.addEventListener('click',resetFilters);
 const board=add(doc,root,'div','wv-board');
 const left=add(doc,board,'section','wv-list-pane');
 const leftHead=add(doc,left,'div','wv-list-head');
 const count=add(doc,leftHead,'h2','','Words');
 const resultLabel=add(doc,leftHead,'small','','');
 const studyActions=add(doc,left,'div','wv-study-actions');
 const nextButton=add(doc,studyActions,'button','wv-study-button','Next word →');
 nextButton.type='button';
 const randomButton=add(doc,studyActions,'button','wv-study-button','🎲 Surprise me');
 randomButton.type='button';
 const quizButton=add(doc,studyActions,'button','wv-study-button wv-study-primary','✏️ Practice');
 quizButton.type='button';
 const list=add(doc,left,'div','wv-list');
 list.setAttribute('aria-label','Select a word to learn');
 const detail=add(doc,board,'section','wv-detail-pane');
 detail.setAttribute('aria-label','Word meaning, examples and practice');
 const oldSection=add(doc,root,'details','wv-original');
 const summary=add(doc,oldSection,'summary','','📚 My Saved Words & Phrasebook · मेरा सुरक्षित शब्द र वाक्यहरू');
 const preserve=add(doc,oldSection,'div','wv-original-content');
 for(const card of nativeCards)preserve.appendChild(card);
 root.appendChild(oldSection);
 content.insertBefore(root,content.firstChild);
 section.classList.add('sikau-words-v1');
 function flash(t){feedback=t;const node=detail.querySelector('.wv-feedback');if(node)node.textContent=t;}
 function choose(word){selected=word;tab='meaning';quizValue='';feedback='';render();}
 function resetFilters(){
  category='all';query='';level='all';type='all';sort='default';
  searchInput.value='';typeSelect.value='all';sortSelect.value='default';
  render();
 }
 function studyMove(kind){
  const rows=filtered();
  if(!rows.length)return;
  const i=rows.findIndex(w=>w.word===selected);
  if(kind==='next')choose(rows[(i+1)%rows.length].word);
  else if(kind==='random'){
   const options=rows.filter(w=>w.word!==selected);
   const pool=options.length?options:rows;
   choose(pool[Math.floor(Math.random()*pool.length)].word);
  }else{
   selected=(i<0?rows[0]:rows[i]).word;tab='practice';feedback='';quizValue='';render();
   if(doc.defaultView.innerWidth<850)detail.scrollIntoView({behavior:'smooth',block:'start'});
  }
 }
 nextButton.addEventListener('click',()=>studyMove('next'));
 randomButton.addEventListener('click',()=>studyMove('random'));
 quizButton.addEventListener('click',()=>studyMove('practice'));
 function saveWord(word){
  const view=doc.defaultView, entry=items.find(x=>x.word===word);
  if(!entry)return;
  if(entry.saved){
   oldSection.open=true;
   flash('Already saved. Open “My Saved Words” below to manage it. · यो शब्द पहिले नै सुरक्षित छ।');
   return;
  }
  if(typeof view?.addWord==='function'){
   view.addWord(entry.word,entry.ne);
   items=combined(doc,wordBox);
   flash('Saved to your English Sikau dictionary · तपाईंको शब्दकोशमा सुरक्षित भयो।');
   render();
  }else{
   flash('Open Translate and use its native save option to keep this word. · शब्द सुरक्षित गर्न अनुवाद प्रयोग गर्नुहोस्।');
  }
 }
 function filtered(){
  let arr=items.filter(w=>{
   if(category==='saved'&&!w.saved)return false;
   if(category!=='all'&&category!=='saved'&&w.category!==category)return false;
   if(level!=='all'&&String(w.level||'')!==level)return false;
   if(type!=='all'&&w.type!==type)return false;
   if(query&&!([w.word,w.ne,w.definition,w.category].join(' ').toLowerCase().includes(query)))return false;
   return true;
  });
  if(sort==='az')arr.sort((a,b)=>a.word.localeCompare(b.word));
  if(sort==='za')arr.sort((a,b)=>b.word.localeCompare(a.word));
  if(sort==='level')arr.sort((a,b)=>(a.level||99)-(b.level||99)||a.word.localeCompare(b.word));
  return arr;
 }
 function renderCategories(){
  catsArea.replaceChildren();
  const visible=allTopics?cats:cats.slice(0,7);
  for(const [id,emoji,label,ne] of visible){
   const b=add(doc,catsArea,'button','wv-category');
   b.type='button';b.setAttribute('aria-pressed',String(category===id));
   if(category===id)b.classList.add('active');
   add(doc,b,'span','wv-cat-icon',emoji);
   const wording=add(doc,b,'span','wv-cat-text');
   add(doc,wording,'strong','',label);
   add(doc,wording,'small','',ne);
   b.addEventListener('click',()=>{category=id;render();});
  }
  moreTopics.textContent=allTopics?'Show fewer · कम देखाउनुहोस्':'More topics ('+(cats.length-7)+') · थप विषयहरू';
  moreTopics.setAttribute('aria-expanded',String(allTopics));
 }
 function renderList(rows){
  list.replaceChildren();
  if(!rows.length){
   add(doc,list,'p','wv-empty','No matching words. Try another category or search. · शब्द भेटिएन।');
   return;
  }
  for(const w of rows){
   const b=add(doc,list,'button','wv-word-row');
   b.type='button';if(selected===w.word)b.classList.add('selected');
   b.setAttribute('aria-pressed',String(selected===w.word));
   const ico=add(doc,b,'span','wv-sound-icon','🔊');ico.setAttribute('aria-hidden','true');
   const words=add(doc,b,'span','wv-row-words');
   add(doc,words,'strong','',w.word);add(doc,words,'small','',w.ne);
   const extra=add(doc,b,'span','wv-row-extra');
   if(w.level)add(doc,extra,'span','wv-level','Level '+w.level);
   add(doc,extra,'span','wv-row-star',w.saved?'★':'☆');
   b.addEventListener('click',()=>choose(w.word));
  }
 }
 function sentenceFor(w){
  return w.example||'Practice using “'+w.word+'” in an English sentence.';
 }
 function modeButtons(dBody,w){
  const tabs=add(doc,dBody,'div','wv-tabs');
  for(const [key,label,ne,icon] of [
   ['meaning','Meaning','अर्थ','📖'],
   ['examples','Examples','उदाहरण','📑'],
   ['usage','Usage','प्रयोग','✏️'],
   ['related','Related Words','सम्बन्धित','🔗'],
   ['practice','Practice','अभ्यास','🎮']
  ]){
   const b=add(doc,tabs,'button','wv-tab');
   b.type='button';if(tab===key)b.classList.add('active');
   b.setAttribute('aria-pressed',String(tab===key));
   add(doc,b,'span','',icon);const title=add(doc,b,'span','',label);add(doc,title,'small','',ne);
   b.addEventListener('click',()=>{tab=key;renderDetail(w);});
  }
 }
 function renderDetail(w){
  detail.replaceChildren();
  const overview=add(doc,detail,'div','wv-detail-head');
  const label=add(doc,overview,'div','wv-selected-word');
  const title=add(doc,label,'h2','',w.word);
  const speaker=add(doc,title,'button','wv-speak','🔊');speaker.type='button';
  speaker.setAttribute('aria-label','Speak '+w.word);
  speaker.addEventListener('click',()=>speak(doc,w.word,'en'));
  const star=add(doc,title,'button','wv-save',w.saved?'★':'☆');star.type='button';
  star.setAttribute('aria-label',w.saved?'Word saved — show saved word list':'Save '+w.word+' to dictionary');
  star.addEventListener('click',()=>saveWord(w.word));
  const ne=add(doc,label,'p','wv-translation',w.ne);
  const tags=add(doc,label,'div','wv-tags');
  add(doc,tags,'span','wv-tag wv-part',w.type);
  if(w.level)add(doc,tags,'span','wv-tag wv-tag-level','Level '+w.level);
  const illustration=add(doc,overview,'div','wv-picture');
  illustration.setAttribute('role','img');
  illustration.setAttribute('aria-label','Decorative Nepal mountain landscape for vocabulary learning');
  add(doc,illustration,'span','wv-picture-emoji',w.category==='food'?'🥟':w.category==='culture'?'🪔':w.category==='family'?'👨‍👩‍👧':w.category==='work'?'💼':w.category==='school'?'📚':w.category==='health'?'🩺':'🏔️');
  modeButtons(detail,w);
  const cols=add(doc,detail,'div','wv-detail-grid');
  const main=add(doc,cols,'div','wv-detail-main');
  const aside=add(doc,cols,'aside','wv-detail-side');
  if(tab==='meaning'){
   const definition=add(doc,main,'div','wv-content-card wv-meaning');
   add(doc,definition,'h3','','📖 Meaning · अर्थ');
   add(doc,definition,'p','',w.definition);
   add(doc,definition,'p','wv-subtext',w.ne);
  }else if(tab==='examples'){
   const examples=add(doc,main,'div','wv-content-card wv-meaning');
   add(doc,examples,'h3','','📑 Examples · उदाहरणहरू');
   add(doc,examples,'p','',sentenceFor(w));
   add(doc,examples,'p','wv-subtext',w.exampleNe||'आफ्नो वाक्य बनाउनुहोस्।');
   const play=add(doc,examples,'button','wv-inline','🔊 Listen to example');play.type='button';
   play.addEventListener('click',()=>speak(doc,sentenceFor(w),'en'));
  }else if(tab==='usage'){
   const usage=add(doc,main,'div','wv-content-card wv-meaning');
   add(doc,usage,'h3','','✏️ How to use it · प्रयोग');
   add(doc,usage,'p','','Word type: '+w.type+'. Try making your own English sentence.');
   add(doc,usage,'p','wv-subtext',w.example||'Add this word to a short sentence.');
  }else if(tab==='related'){
   const related=add(doc,main,'div','wv-content-card wv-meaning');
   add(doc,related,'h3','','🔗 Related words · सम्बन्धित शब्दहरू');
   const others=items.filter(x=>x.category===w.category&&x.word!==w.word).slice(0,5);
   if(!others.length)add(doc,related,'p','','More words in this category will appear here.');
   for(const other of others){
    const b=add(doc,related,'button','wv-related-word',other.word+' · '+other.ne);
    b.type='button';b.addEventListener('click',()=>choose(other.word));
   }
  }else{
   const question=add(doc,main,'div','wv-content-card wv-meaning');
   add(doc,question,'h3','','🎯 Quick Practice · छिटो अभ्यास');
   add(doc,question,'p','','Write the English word for: '+w.ne);
   const input=add(doc,question,'input','wv-quiz-input');
   input.type='text';input.value=quizValue;input.placeholder='Type the English word…';
   input.setAttribute('aria-label','English translation for '+w.ne);
   input.addEventListener('input',()=>{quizValue=input.value;});
   const check=add(doc,question,'button','wv-check','Check Answer · उत्तर हेर्नुहोस्');check.type='button';
   check.addEventListener('click',()=>{flash(quizValue.trim().toLowerCase()===w.word.toLowerCase()?'✅ Correct! राम्रो भयो!':'Try again. The word starts with “'+w.word.charAt(0)+'”. · फेरि प्रयास गर्नुहोस्।');});
   input.addEventListener('keydown',e=>{if(e.key==='Enter')check.click();});
  }
  const example=add(doc,main,'div','wv-example-card');
  add(doc,example,'h3','','🔉 Everyday example · दैनिक उदाहरण');
  add(doc,example,'p','',sentenceFor(w));
  add(doc,example,'p','wv-subtext',w.exampleNe||w.ne);
  const relatedCard=add(doc,aside,'div','wv-related-card');
  add(doc,relatedCard,'h3','','✨ Explore more · थप शब्द');
  for(const other of items.filter(x=>x.category===w.category&&x.word!==w.word).slice(0,3)){
   const b=add(doc,relatedCard,'button','wv-related-mini',other.word+' · '+other.ne);
   b.type='button';b.addEventListener('click',()=>choose(other.word));
  }
  const practice=add(doc,aside,'div','wv-practice-card');
  add(doc,practice,'h3','','✏️ Try it yourself · आफैं प्रयास गर्नुहोस्');
  add(doc,practice,'p','','Can you use “'+w.word+'” in your own sentence?');
  const practiceB=add(doc,practice,'button','wv-practice-button','Practice this word →');
  practiceB.type='button';practiceB.addEventListener('click',()=>{tab='practice';quizValue='';feedback='';renderDetail(w);});
  add(doc,detail,'p','wv-feedback',feedback);
 }
 function render(){
  items=combined(doc,wordBox);
  if(!allTopics&&!cats.slice(0,7).some(entry=>entry[0]===category))allTopics=true;
  renderCategories();
  const rows=filtered();
  count.textContent='Words ('+rows.length+')';
  resultLabel.textContent='Choose a word · शब्द छान्नुहोस्';
  for(const [value,button] of Object.entries(levelButtons)){
   const active=value===level;
   button.classList.toggle('active',active);
   button.setAttribute('aria-pressed',String(active));
  }
  const summary=[category!=='all'?categories[category]?.[2]:null,level!=='all'?'Level '+level:null,type!=='all'?type:null,query?'Search: '+query:null].filter(Boolean);
  const hasFilters=category!=='all'||level!=='all'||type!=='all'||sort!=='default'||!!query;
  filterSummary.textContent='Showing '+rows.length+' of '+items.length+' words · '+(summary.join(' · ')||'All topics and levels');
  clearFilters.hidden=!hasFilters;
  [nextButton,randomButton,quizButton].forEach(b=>{b.disabled=rows.length===0;});
  if(!rows.some(w=>w.word===selected)){selected=rows[0]?.word||'';tab='meaning';quizValue='';feedback='';}
  const chosen=rows.find(w=>w.word===selected);
  renderList(rows);
  if(chosen)renderDetail(chosen);
  else{
   detail.replaceChildren();
   add(doc,detail,'p','wv-empty','No matching words. Try another level or topic. · यो फिल्टरमा शब्द भेटिएन।');
   const reset=add(doc,detail,'button','wv-reset','Clear filters · फिल्टर हटाउनुहोस्');
   reset.type='button';reset.addEventListener('click',resetFilters);
  }
 }
 searchInput.addEventListener('input',()=>{query=searchInput.value.trim().toLowerCase();render();});
 typeSelect.addEventListener('change',()=>{type=typeSelect.value;render();});
 sortSelect.addEventListener('change',()=>{sort=sortSelect.value;render();});
 // Native renderWords may replace the saved-word list; refresh visual library only
 // when its contents change, not when the new dashboard redraws.
 let scheduled=false;
 const observer=new doc.defaultView.MutationObserver(()=>{
  if(scheduled)return;scheduled=true;
  doc.defaultView.requestAnimationFrame(()=>{scheduled=false;const was=items.filter(x=>x.saved).map(x=>x.word).sort().join('|');
   const next=readSaved(doc,wordBox).map(x=>x.word).sort().join('|');if(was!==next)render();});
 });
 observer.observe(wordBox,{subtree:true,childList:true});
 render();
};
})();