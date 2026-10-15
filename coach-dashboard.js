/* English Sikau Coach dashboard — progressive, authorized UI enhancement.
   Reuses the real private Coach controls; does not create a new lesson service,
   change payment/trial checks, or persist fabricated progress/chat history. */
(function(){
'use strict';
const stylesheetUrl=new URL('coach-dashboard.css',document.baseURI).href;
function el(d,tag,cls,text){
  const node=d.createElement(tag);
  if(cls)node.className=cls;
  if(text!==undefined)node.textContent=String(text);
  return node;
}
function append(d,parent,tag,cls,text){
  const node=el(d,tag,cls,text);parent.appendChild(node);return node;
}
function openTab(d,keyword){
  const nav=d.querySelector('.nav');
  if(!nav)return false;
  const buttons=[...nav.querySelectorAll('button[data-t]')];
  const button=buttons.find(b=>!b.classList.contains('sikau-home-nav')&&
    String(b.dataset.t||'').toLowerCase()===keyword)||
    buttons.find(b=>!b.classList.contains('sikau-home-nav')&&
      new RegExp('\\b'+keyword+'\\b','i').test(String(b.textContent||'')+' '+String(b.getAttribute('aria-label')||'')));
  if(!button)return false;
  button.click();return true;
}
function actualInput(ask){
  return ask.querySelector('textarea')||
    ask.querySelector('input[type="text"],input:not([type]),[contenteditable="true"]');
}
function prepareQuestion(ask,statement,notice){
  const field=actualInput(ask);
  if(!field){
    notice.textContent='Open the Coach input to enter your question. · प्रश्न लेख्ने ठाउँ खोल्नुहोस्।';
    ask.scrollIntoView({block:'center',behavior:'smooth'});
    return;
  }
  if(field.isContentEditable){
    field.textContent=statement;
  }else{
    const view=ask.ownerDocument.defaultView;
    const type=field.tagName==='TEXTAREA'?view.HTMLTextAreaElement:view.HTMLInputElement;
    const setter=Object.getOwnPropertyDescriptor(type.prototype,'value')?.set;
    if(setter)setter.call(field,statement);else field.value=statement;
  }
  const v=ask.ownerDocument.defaultView;
  field.dispatchEvent(new v.Event('input',{bubbles:true}));
  field.dispatchEvent(new v.Event('change',{bubbles:true}));
  field.focus({preventScroll:true});
  ask.scrollIntoView({behavior:'smooth',block:'center'});
  notice.textContent='Question ready. Press the existing Ask Coach button to get an answer. · उत्तरका लागि Ask Coach थिच्नुहोस्।';
}
function makeAction(d,parent,config,onClick){
  const button=append(d,parent,'button','sikau-'+config.color);
  button.type='button';
  button.setAttribute('aria-label',config.title+' · '+config.ne);
  append(d,button,'span','sikau-card-icon',config.icon);
  append(d,button,'strong','',config.title);
  append(d,button,'small','',config.ne);
  append(d,button,'span','sikau-card-caption',config.caption);
  button.addEventListener('click',onClick);
}
window.enhanceCoachDashboard=function(doc,firstName){
  if(!doc?.body||!doc.head)return;
  const oldHero=doc.querySelector('.coach-top');
  const ask=doc.querySelector('.coach-ask');
  if(!oldHero||!ask||!oldHero.parentElement||!ask.parentElement)return;
  const root=doc.querySelector('#coachRoot');
  // Prefer a verified native coach container; fallback keeps the form as-is.
  const grid=(root&&root.contains(ask)&&ask.parentElement===root)?root:
    ask.parentElement.classList.contains('coach-root')?ask.parentElement:null;
  const host=oldHero.parentElement;
  const existing=doc.getElementById('sikauCoachBanner');
  if(existing&&existing.isConnected){
    // Single UI per rendered page. The private app can redraw on navigation.
    if(existing.nextElementSibling===oldHero)return;
    existing.remove();
    doc.getElementById('sikauCoachExtras')?.remove();
    doc.getElementById('sikauCoachSide')?.remove();
  }
  if(!doc.getElementById('sikauCoachDesignStyles')){
    const style=doc.createElement('link');
    style.id='sikauCoachDesignStyles';style.rel='stylesheet';style.href=stylesheetUrl;
    doc.head.appendChild(style);
  }
  host.classList.add('sikau-coach-board');
  oldHero.classList.add('sikau-coach-native-hero');
  ask.classList.add('sikau-coach-restyled');
  const hero=el(doc,'section','sikau-coach-banner');
  hero.id='sikauCoachBanner';hero.setAttribute('aria-label','My English Coach · मेरो अंग्रेजी कोच');
  const art=append(doc,hero,'div','sikau-coach-hero-image');
  art.setAttribute('aria-hidden','true');
  const heroCopy=append(doc,hero,'div','sikau-coach-hero-content');
  append(doc,heroCopy,'p','sikau-coach-eyebrow','MY ENGLISH COACH');
  append(doc,heroCopy,'h2','','मेरो अंग्रेजी कोच');
  append(doc,heroCopy,'p','sikau-coach-en','Learn English step by step');
  append(doc,heroCopy,'p','sikau-coach-ne','बिस्तारै अंग्रेजी सिकौं 🌱');
  append(doc,heroCopy,'p','sikau-coach-tagline','Ask questions, get clear answers, and practice anytime.');
  append(doc,heroCopy,'p','sikau-coach-tagline','आफ्नो प्रश्न सोध्नुहोस्, सजिलो जवाफ पाउनुहोस्, र जहिले पनि अभ्यास गर्नुहोस्।');
  host.insertBefore(hero,oldHero);

  // Place a readable invitation immediately above the real Coach input.
  // The existing submit/AI handler stays on the untouched private form.
  let inputIntro=ask.querySelector('.sikau-coach-input-intro');
  if(!inputIntro){
    inputIntro=el(doc,'div','sikau-coach-input-intro');
    const heading=append(doc,inputIntro,'div','sikau-coach-input-heading');
    append(doc,heading,'span','sikau-coach-input-icon','✏️');
    const wording=append(doc,heading,'div','');
    append(doc,wording,'strong','','Ask your coach or type one sentence');
    append(doc,wording,'small','','आफ्नो प्रश्न वा एउटा वाक्य लेख्नुहोस्');
    const example=append(doc,inputIntro,'button','sikau-coach-example','💡 Not sure? Try an example');
    example.type='button';
    example.addEventListener('click',()=>{
      const notice=doc.getElementById('sikauCoachShortcutNotice');
      prepareQuestion(ask,'I want to visit Kathmandu. Help me write this sentence correctly and explain it in Nepali.',notice||el(doc,'span'));
    });
    ask.insertBefore(inputIntro,ask.firstChild);
  }

  if(grid){
    grid.classList.add('sikau-coach-grid');
    const side=el(doc,'aside','sikau-coach-side');
    side.id='sikauCoachSide';
    const panel=append(doc,side,'section','sikau-coach-side-panel');
    append(doc,panel,'h3','','📊 Your learning progress');
    append(doc,panel,'p','','See your real learning progress in the secure Progress tab.');
    append(doc,panel,'p','','तपाईंको वास्तविक प्रगति Progress मा हेर्नुहोस्।');
    const prog=append(doc,panel,'button','sikau-coach-progress-link','View progress · प्रगति हेर्नुहोस् →');
    prog.type='button';
    prog.addEventListener('click',()=>{if(!openTab(doc,'progress'))prog.textContent='Open Progress from the sidebar · Progress मा जानुहोस्';});
    const help=append(doc,side,'section','sikau-coach-side-panel');
    append(doc,help,'h3','','💬 Try these questions');
    const examples=[
      'How do I introduce myself in English?',
      'Please explain the difference between is and are in Nepali.',
      'Help me talk about my favorite place, Pokhara.'
    ];
    const tipNotice=el(doc,'span');
    examples.forEach(text=>{
      const btn=append(doc,help,'button','',text);btn.type='button';
      btn.addEventListener('click',()=>prepareQuestion(ask,text,doc.getElementById('sikauCoachShortcutNotice')||tipNotice));
    });
    append(doc,help,'p','sikau-coach-note','Choose a question, then press Ask Coach to get real feedback.');
    grid.appendChild(side);
  }

  let extras=doc.getElementById('sikauCoachExtras');
  if(extras)extras.remove();
  extras=el(doc,'section','sikau-coach-extras');
  extras.id='sikauCoachExtras';
  extras.setAttribute('aria-label','Coach shortcuts and learning topics');
  const cards=append(doc,extras,'div','sikau-coach-cards');
  const notice=append(doc,extras,'span','sikau-coach-notice','');
  notice.id='sikauCoachShortcutNotice';
  const actions=[
    {icon:'📕',color:'pink',title:'Explain in Nepali',ne:'नेपालीमा बुझाइदिनुहोस्',caption:'Get simple explanations in Nepali.',
      query:'Please explain the English present tense in simple Nepali with examples.'},
    {icon:'✅',color:'blue',title:'Fix my sentence',ne:'मेरो वाक्य ठीक पारिदिनुहोस्',caption:'Check grammar and make it correct.',
      query:'Please correct my English, provide a polished version, and explain why: I goed to Pokhara yesterday.'},
    {icon:'💡',color:'yellow',title:'Give examples',ne:'उदाहरण दिनुहोस्',caption:'See real-life English examples.',
      query:'Give me five everyday English sentences about shopping, with Nepali translations.'},
    {icon:'🎙️',color:'green',title:'Practice speaking',ne:'बोल्ने अभ्यास गरौं',caption:'Get conversation practice and feedback.',
      mode:'speak'}
  ];
  actions.forEach(action=>makeAction(doc,cards,action,()=>{
    if(action.mode){if(!openTab(doc,action.mode))notice.textContent='Choose Speak from the sidebar to practice speaking. · Speak खोल्नुहोस्।';}
    else prepareQuestion(ask,action.query,notice);
  }));
  const title=append(doc,extras,'h3','sikau-coach-topic-heading','📚 Choose a topic to learn');
  append(doc,title,'small','','सिक्न चाहेको विषय छान्नुहोस्');
  const topics=append(doc,extras,'div','sikau-coach-topics');
  [
    {icon:'🗨️',name:'Daily conversation',ne:'दैनिक कुराकानी',color:'pink',prompt:'Help me practice a simple English conversation with a friend. Explain any mistake in Nepali.'},
    {icon:'✈️',name:'Travel',ne:'यात्रा',color:'blue',prompt:'Teach me useful English phrases for traveling to Pokhara, with Nepali meanings.'},
    {icon:'🥘',name:'Food',ne:'खाना',color:'yellow',prompt:'Teach me how to order momo in English at a restaurant. Give me a short dialogue.'},
    {icon:'👨‍👩‍👧',name:'Family',ne:'परिवार',color:'purple',prompt:'Help me describe my family in English. Start with beginner sentences.'},
    {icon:'💼',name:'Work',ne:'काम',color:'green',prompt:'Help me practice simple English conversations at work with Nepali explanations.'}
  ].forEach(t=>{
    const btn=append(doc,topics,'button','sikau-'+t.color);
    btn.type='button';btn.setAttribute('aria-label',t.name+' · '+t.ne);
    append(doc,btn,'span','sikau-topic-icon',t.icon);
    const words=append(doc,btn,'span','sikau-topic-label',t.name);
    append(doc,words,'small','',t.ne);
    btn.addEventListener('click',()=>prepareQuestion(ask,t.prompt,notice));
  });
  const more=append(doc,extras,'button','sikau-coach-more-button');
  more.type='button';
  more.setAttribute('aria-controls','coachRoot');
  function updateMore(){
    const open=!!grid?.classList.contains('sikau-coach-more-on');
    more.setAttribute('aria-expanded',String(open));
    more.textContent=open?'− Fewer tools · सरल दृश्य':'＋ More Coach tools · थप सिकाइ उपकरण';
  }
  more.addEventListener('click',()=>{
    if(grid)grid.classList.toggle('sikau-coach-more-on');
    doc.body.classList.toggle('sikau-coach-show-more',!!grid?.classList.contains('sikau-coach-more-on'));
    updateMore();
  });
  updateMore();
  const anchor=grid||ask;
  anchor.insertAdjacentElement('afterend',extras);
};
})();