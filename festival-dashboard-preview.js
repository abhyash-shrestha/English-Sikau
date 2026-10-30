/* Isolated festival dashboard concept.
   Only enhances the already-authorized lesson iframe. No entitlement, XP,
   trial, score, payment or Appwrite functionality is modified here. */
(function(){
'use strict';
var stylesheetUrl = new URL('festival-dashboard-preview.css?v=20261024-stories-r1', document.baseURI).href;
function el(doc,tag,cls,value){
  var node=doc.createElement(tag);
  if(cls)node.className=cls;
  if(value!==undefined && value!==null)node.textContent=String(value);
  return node;
}
function add(doc,parent,tag,cls,value){
  var child=el(doc,tag,cls,value); parent.appendChild(child); return child;
}
function tab(doc,key){
  var nav=doc.querySelector('.nav');
  if(!nav)return;
  var btn=Array.from(nav.querySelectorAll('button[data-t]')).find(function(b){
    return !b.classList.contains('sikau-home-nav') &&
      (String(b.dataset.t||'').toLowerCase()===key ||
       String(b.dataset.t||'').toLowerCase().includes(key));
  });
  if(btn)btn.click();
}
var details={
  dashain:{scene:'dashain',emoji:'🎋',hint:'FAMILY & BLESSINGS',
    english:'Families come together to celebrate Dashain, receive blessings, and share good wishes.',
    nepali:'दशैंमा परिवार भेला भएर टीका, जमरा र आशीर्वाद लिने परम्परा छ।',
    sentence:'My family celebrates Dashain together.'},
  tihar:{scene:'tihar',emoji:'🪔',hint:'LIGHTS & FLOWERS',
    english:'Tihar celebrates lights, gratitude, animals, and the bond between brothers and sisters.',
    nepali:'तिहारमा बत्ती, फूल, जनावरप्रति सम्मान र दाजुभाइ-दिदीबहिनीको माया मनाइन्छ।',
    sentence:'We decorate our home with lights during Tihar.'},
  chhath:{scene:'chhath',emoji:'🌅',hint:'SUN & DEVOTION',
    english:'Chhath is a festival of gratitude, prayer, and devotion to the Sun.',
    nepali:'छठमा सूर्यदेवप्रति श्रद्धा व्यक्त गर्दै पूजा र अर्घ्य दिइन्छ।',
    sentence:'People offer prayers to the Sun during Chhath.'},
  lhosar:{scene:'lhosar',emoji:'🏔️',hint:'COMMUNITY & TRADITION',
    english:'Tamu Lhosar welcomes the new year in the Gurung community with cultural celebrations.',
    nepali:'तमु ल्होसार गुरुङ समुदायको नयाँ वर्ष मनाउने चाड हो।',
    sentence:'Our community celebrates Tamu Lhosar with joy.'},
  prithvi:{scene:'prithvi',emoji:'🇳🇵',hint:'HISTORY & UNITY',
    english:'Prithvi Jayanti honors Prithvi Narayan Shah and reflects on Nepalese history.',
    nepali:'पृथ्वी जयन्तीमा पृथ्वीनारायण शाहको योगदान र नेपालको इतिहास सम्झिइन्छ।',
    sentence:'We learn about Nepalese history on Prithvi Jayanti.'},
  maghe:{scene:'maghe',emoji:'🍬',hint:'FOOD & SEASONS',
    english:'Maghe Sankranti celebrates seasonal change with traditional foods and family gatherings.',
    nepali:'माघे सङ्क्रान्तिमा तिलको लड्डु, चाकु र तरुल खाने चलन छ।',
    sentence:'We eat traditional food during Maghe Sankranti.'},
  other:{scene:'other',emoji:'🎊',hint:'NEPALI CULTURE',
    english:'Discover the traditions, people, and stories behind this festival.',
    nepali:'यो चाडसँग जोडिएका परम्परा र संस्कृतिबारे जान्नुहोस्।',
    sentence:'We enjoy learning about Nepali festivals.'}
};
function kindFor(name){
  var s=String(name||'').toLowerCase();
  if(s.includes('dashain'))return 'dashain';
  if(s.includes('tihar'))return 'tihar';
  if(s.includes('chhath'))return 'chhath';
  if(s.includes('tamu lhosar'))return 'tamu';
  if(s.includes('sonam lhosar'))return 'sonam';
  if(s.includes('gyalpo lhosar'))return 'gyalpo';
  if(s.includes('lhosar'))return 'tamu';
  if(s.includes('prithvi'))return 'prithvi';
  if(s.includes('maghe')||s.includes('maghi'))return 'maghe';
  if(s.includes('shivaratri'))return 'shivaratri';
  if(s.includes('fagu')||s.includes('holi'))return 'holi';
  if(s.includes('yomari')||s.includes('udhauli')||s.includes('dhanya'))return 'yomari';
  if(s.includes('basanta')||s.includes('saraswati'))return 'basanta';
  if(s.includes('democracy'))return 'democracy';
  if(s.includes('ghode'))return 'ghode';
  if(s.includes('new year')||s.includes('baisakh 1'))return 'newyear';
  return 'other';
}
function visualFor(key){
  if(details[key])return details[key];
  if(key==='tamu'||key==='sonam'||key==='gyalpo')return details.lhosar;
  if(key==='yomari'||key==='basanta')return details.maghe;
  if(key==='holi'||key==='newyear')return details.dashain;
  if(key==='democracy')return details.prithvi;
  return details.other;
}
function formatDate(stamp){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(stamp||''))return '';
  var date=new Date(stamp+'T12:00:00Z');
  return new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(date);
}
function decorateHero(art){
  /* Entirely static decorative SVG. It does not contain user-provided content. */
  art.innerHTML='<svg viewBox="0 0 640 260" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">'
  +'<defs><linearGradient id="sfdsky" x2="0" y2="1"><stop stop-color="#ffe4dc"/><stop offset="1" stop-color="#e3c3ef"/></linearGradient>'
  +'<linearGradient id="sfdsnow" x2=".4" y2="1"><stop stop-color="#fdfaff"/><stop offset="1" stop-color="#acb2df"/></linearGradient></defs>'
  +'<rect width="640" height="260" fill="url(#sfdsky)"/><circle cx="405" cy="62" r="29" fill="#fff3df" opacity=".85"/>'
  +'<path d="M0 185 88 111l30 25 75-83 46 56 62-86 94 106 54-57 191 128V260H0Z" fill="#cbc1e6"/>'
  +'<path d="m105 187 90-122 54 52 53-91 100 118 43-47 160 109v54H105Z" fill="url(#sfdsnow)"/>'
  +'<path d="m195 65 26 29-24-8-14 20Zm106-39 33 43-29-11-22 23Zm144 71 23 26-18-7-17 14Z" fill="#fff"/>'
  +'<path d="M0 214q120-91 254-25t386-11v82H0Z" fill="#8b91b9"/><path d="M0 240q183-48 301-10t339-25v55H0Z" fill="#667e87"/>'
  +'<g transform="translate(274 117)"><rect x="27" y="46" width="96" height="84" fill="#be4b3d"/><rect x="37" y="55" width="75" height="75" fill="#edab70"/>'
  +'<path d="M5 53 72 18l78 35-14 11H17Z" fill="#4c2c54"/><path d="M21 48 72 27l60 21" fill="none" stroke="#f6b96f" stroke-width="5"/>'
  +'<path d="M20 80 72 62l62 18-9 10H26Z" fill="#452b59"/><rect x="64" y="85" width="18" height="45" fill="#713c50"/>'
  +'<path d="M69 7h6v15h-6z" fill="#6b354f"/></g>'
  +'<g transform="translate(465 99)"><path d="M47 6 82 50H12Z" fill="#f4c5ad"/><path d="M44 5h6v112h-6z" fill="#a65166"/>'
  +'<path d="M22 64h49l13 67H9Z" fill="#faf0d8"/><path d="M17 76h59l7 13H10Z" fill="#de7d65"/>'
  +'<path d="m5 63 43-23 42 23-8 5H13Z" fill="#663354"/><rect x="39" y="87" width="16" height="44" fill="#ac6a58"/>'
  +'</g><path d="M360 133q100-30 223-58" stroke="#754874" stroke-width="1.5" fill="none"/>'
  +'<path d="m383 126 9-2-4 11z" fill="#f3c24f"/><path d="m409 121 9-2-4 11z" fill="#ea6682"/>'
  +'<path d="m438 114 9-2-4 11z" fill="#8a69d7"/><path d="m468 108 9-2-4 11z" fill="#40a9bb"/>'
  +'<path d="m500 100 9-2-4 11z" fill="#f3c24f"/><path d="m535 91 9-2-4 11z" fill="#e55f70"/>'
  +'</svg>';
}
window.enhanceFestivalDashboardPreview=function(doc,firstName,festivalRows,today){
  if(!doc || !doc.body || !doc.head)return;
  var home=doc.getElementById('sikauHomeScreen');
  if(!home || home.querySelector('.sfd'))return;
  var oldMount=home.querySelector('#sikauHomeFestivalMount');
  var link=doc.getElementById('sfdDashboardStyles');
  if(!link){
    link=doc.createElement('link');
    link.id='sfdDashboardStyles';
    link.rel='stylesheet';
    link.href=stylesheetUrl;
    doc.head.appendChild(link);
  }
  var root=el(doc,'div','sfd');
  var hero=add(doc,root,'section','sfd-hero');
  hero.setAttribute('aria-label','Nepali festival learning');
  var copy=add(doc,hero,'div','sfd-hero-copy');
  add(doc,copy,'span','sfd-eyebrow','OUR FESTIVALS, OUR STORIES · हाम्रा चाडपर्व');
  var h1=add(doc,copy,'h1','','Nepali Festivals / ');
  add(doc,h1,'span','','नेपाली चाडपर्व');
  add(doc,copy,'p','','Learn English through Nepali festivals, traditions and cultural stories.');
  var ne=add(doc,copy,'p','','नेपाली चाडपर्व र संस्कृतिमार्फत सजिलै अंग्रेजी सिकौं।');ne.lang='ne';
  decorateHero(add(doc,hero,'div','sfd-hero-art'));

  var heading=add(doc,root,'div','sfd-main-head');
  var labels=add(doc,heading,'div','');
  var h3=add(doc,labels,'h3','','Upcoming Nepali Festivals');
  add(doc,h3,'span','','आगामी नेपाली चाडपर्व');
  add(doc,labels,'p','sfd-muted','Explore festivals, learn new words and improve your English step by step.');
  var search=add(doc,heading,'label','sfd-search');
  add(doc,search,'span','','⌕');
  var input=add(doc,search,'input');
  input.type='search';input.placeholder='Search festivals · चाडपर्व खोज्नुहोस्';
  input.setAttribute('aria-label','Search Nepali festivals by English or Nepali name');

  var layout=add(doc,root,'div','sfd-main-grid');
  var main=add(doc,layout,'div','sfd-main-content');
  var cards=add(doc,main,'div','sfd-cards');
  cards.setAttribute('aria-live','polite');
  var study=add(doc,main,'section','sfd-study');
  study.id='sfdStudy';study.setAttribute('aria-label','Festival English practice');
  var side=add(doc,layout,'aside','sfd-side');
  var tip=add(doc,side,'section','sfd-panel sfd-tip');
  var tipTitle=add(doc,tip,'div','sfd-panel-title');
  add(doc,tipTitle,'span','sfd-panel-icon','💡');
  add(doc,tipTitle,'span','','Learning Tip · आजको सुझाव');
  add(doc,tip,'p','','Festivals are a great way to learn words about family, food, culture and traditions.');
  add(doc,tip,'p','','चाडपर्वबाट परिवार, खाना, संस्कृति र परम्परासँग सम्बन्धित नयाँ अंग्रेजी शब्द सिक्न सकिन्छ।');
  var nativeDetails=add(doc,root,'details','sfd-native');
  add(doc,nativeDetails,'summary','','Original festival lessons · पहिलेकै चाडपर्वका पाठ');
  if(oldMount)nativeDetails.appendChild(oldMount);
  home.insertBefore(root,home.firstChild);
  home.classList.add('sfd-ready');


  /* Dated source rows are fixed, but the visible selection is recomputed
     each Nepal day. Expired rows are excluded without mutating source records. */
  var catalog=Array.isArray(festivalRows)?festivalRows.filter(function(f){
    return f&&typeof f.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(f.date);
  }).slice().sort(function(a,b){return a.date.localeCompare(b.date);}):[];
  var shownAll=false,activeFestival=null,returnFocus=null,lastRenderedDay='';
  var stories=window.EnglishSikauFestivalStories||{};
  var win=doc.defaultView;
  function todayInNepal(){
    try{
      var parts=new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Kathmandu',
        year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
      var get=function(k){return parts.find(function(p){return p.type===k;}).value;};
      return get('year')+'-'+get('month')+'-'+get('day');
    }catch(_){return today||'';}
  }
  function futureEvents(){
    var now=todayInNepal();
    return catalog.filter(function(f){return (f.end||f.date)>=now;});
  }
  function fallbackLesson(f){
    return {
      summary:'Learn about this Nepali celebration through easy English.',
      story:'People celebrate '+f.name+' in different ways. Families and communities share traditions and learn from one another. Ask a family member what this occasion means to them.',
      ne:'यस अवसरसँग जोडिएका परम्पराबारे परिवार वा समुदायका सदस्यसँग बुझ्नुहोस्। सबै समुदायको मनाउने तरिका एउटै हुँदैन।',
      moments:[['🎊','Celebration','उत्सव'],['🤝','Community','समुदाय'],['📖','Learn together','सँगै सिकौं']],
      words:[['🎉','Festival','चाड'],['🤝','Community','समुदाय'],['📚','Tradition','परम्परा'],['😊','Celebrate','मनाउनु'],['🌟','Learn','सिक्नु']],
      example:'We learn about Nepali traditions during festivals.',
      fact:'Different families may celebrate the same festival differently.',
      quiz:[['Which word means परम्परा?',['Tradition','Mountain','Calendar'],0,'Tradition means परम्परा।'],
        ['Choose the correct sentence.',['We learn together.','We learns together.','We learning together yesterday.'],0,'Use learn after we.']]
    };
  }
  function speakEnglish(text){
    if(!win?.speechSynthesis||!win?.SpeechSynthesisUtterance)return false;
    try{
      win.speechSynthesis.cancel();
      var utterance=new win.SpeechSynthesisUtterance(text);
      utterance.lang='en-US';utterance.rate=.87;utterance.pitch=1;
      win.speechSynthesis.speak(utterance);
      return true;
    }catch(_){return false;}
  }
  function openLesson(f,trigger){
    activeFestival=f;
    returnFocus=trigger;
    cards.hidden=true;
    shownAll=false;
    root.classList.add('sfd-lesson-open');
    study.replaceChildren();
    study.dataset.open='true';
    study.setAttribute('tabindex','-1');
    var d=visualFor(kindFor(f.name));
    var lesson=stories[kindFor(f.name)]||fallbackLesson(f);

    var back=add(doc,study,'button','sfd-story-back','← Back to festivals · चाडपर्वमा फर्कनुहोस्');
    back.type='button';back.addEventListener('click',closeLesson);
    var banner=add(doc,study,'div','sfd-story-banner sfd-'+d.scene);
    var bannerCopy=add(doc,banner,'div','sfd-story-banner-text');
    add(doc,bannerCopy,'span','sfd-story-kicker','📖 FESTIVAL STORY · चाडपर्वको कथा');
    add(doc,bannerCopy,'h2','',f.name);
    if(f.ne)add(doc,bannerCopy,'p','sfd-story-ne',f.ne);
    add(doc,bannerCopy,'p','sfd-story-summary',lesson.summary);
    if(lesson.summaryNe)add(doc,bannerCopy,'p','sfd-story-ne',lesson.summaryNe);
    var emblem=add(doc,banner,'span','sfd-story-emblem',f.icon||d.emoji);
    emblem.setAttribute('aria-hidden','true');
    var storyGrid=add(doc,study,'div','sfd-story-grid');
    var mainStory=add(doc,storyGrid,'section','sfd-story-card sfd-story-reading');
    add(doc,mainStory,'span','sfd-story-section-label','01 · BEHIND THE STORY · चाडपर्वको कथा');
    add(doc,mainStory,'h3','','Why do people celebrate? · किन मनाइन्छ?');
    add(doc,mainStory,'p','sfd-story-body',lesson.story);
    var controls=add(doc,mainStory,'div','sfd-story-controls');
    if(win?.speechSynthesis&&win?.SpeechSynthesisUtterance){
      var listen=add(doc,controls,'button','sfd-story-voice','🔊 Listen in English · सुन्नुहोस्');
      listen.type='button';
      listen.addEventListener('click',function(){
        if(!speakEnglish(lesson.story))listen.textContent='Audio unavailable · अडियो उपलब्ध छैन';
      });
    }
    var meaning=add(doc,controls,'button','sfd-story-translate','🇳🇵 Show Nepali meaning · नेपाली अर्थ');
    meaning.type='button';meaning.setAttribute('aria-expanded','false');
    var translated=add(doc,mainStory,'p','sfd-story-meaning',lesson.ne);
    translated.lang='ne';translated.hidden=true;
    meaning.addEventListener('click',function(){
      translated.hidden=!translated.hidden;
      meaning.setAttribute('aria-expanded',String(!translated.hidden));
      meaning.textContent=translated.hidden?'🇳🇵 Show Nepali meaning · नेपाली अर्थ':'🇳🇵 Hide Nepali meaning · अर्थ लुकाउनुहोस्';
    });

    var moments=add(doc,storyGrid,'section','sfd-story-card');
    add(doc,moments,'span','sfd-story-section-label','02 · CULTURAL MOMENTS · सांस्कृतिक झलक');
    add(doc,moments,'h3','','See the traditions · परम्परा हेर्नुहोस्');
    var momentGrid=add(doc,moments,'div','sfd-story-moments');
    lesson.moments.slice(0,3).forEach(function(m){
      var tile=add(doc,momentGrid,'div','sfd-story-moment');
      var icon=add(doc,tile,'span','',m[0]);icon.setAttribute('aria-hidden','true');
      add(doc,tile,'strong','',m[1]);
      add(doc,tile,'small','',m[2]);
    });
    var fact=add(doc,moments,'p','sfd-story-fact','💡 Did you know? '+lesson.fact);
    fact.setAttribute('role','note');
    if(lesson.factNe)add(doc,moments,'p','sfd-story-fact',lesson.factNe);

    var vocab=add(doc,study,'section','sfd-story-vocab');
    add(doc,vocab,'span','sfd-story-section-label','03 · ENGLISH WORDS · अंग्रेजी शब्दहरू');
    add(doc,vocab,'h3','','Learn 5 words · पाँच नयाँ शब्द');
    var vocabList=add(doc,vocab,'div','sfd-story-wordgrid');
    lesson.words.slice(0,5).forEach(function(pair){
      var word=add(doc,vocabList,'div','sfd-story-word');
      add(doc,word,'span','sfd-story-wordicon',pair[0]);
      var block=add(doc,word,'div','');
      add(doc,block,'strong','',pair[1]);
      var nepali=add(doc,block,'small','',pair[2]);nepali.lang='ne';
    });
    var sample=add(doc,study,'div','sfd-story-sentence');
    add(doc,sample,'span','','💬 SAY IT IN ENGLISH · अंग्रेजीमा भन्नुहोस्');
    add(doc,sample,'p','',lesson.example);
    if(lesson.exampleNe)add(doc,sample,'p','sfd-story-ne',lesson.exampleNe);
    if(win?.speechSynthesis&&win?.SpeechSynthesisUtterance){
      var play=add(doc,sample,'button','','🔊 Listen');
      play.type='button';play.addEventListener('click',function(){speakEnglish(lesson.example);});
    }

    var quiz=add(doc,study,'section','sfd-story-quiz');
    add(doc,quiz,'span','sfd-story-section-label','04 · QUICK PRACTICE · छिटो अभ्यास');
    add(doc,quiz,'h3','','Check your English · सानो अभ्यास');
    add(doc,quiz,'p','sfd-story-quiz-note','Just for practice — no XP or account changes. · यो अभ्यास मात्र हो।');
    var quizArea=add(doc,quiz,'div','sfd-story-quiz-area');
    var questionIndex=0,correctTotal=0;
    function drawQuestion(){
      quizArea.replaceChildren();
      if(questionIndex>=lesson.quiz.length){
        var trophy=add(doc,quizArea,'div','sfd-quiz-finished');
        add(doc,trophy,'span','','🎉');
        add(doc,trophy,'strong','','Well done! · राम्रो गर्नुभयो!');
        add(doc,trophy,'p','','You answered '+correctTotal+' of '+lesson.quiz.length+' questions correctly.');
        var again=add(doc,trophy,'button','sfd-story-quiz-next','↻ Practice again · फेरि अभ्यास');
        again.type='button';again.addEventListener('click',function(){questionIndex=0;correctTotal=0;drawQuestion();});
        return;
      }
      var q=lesson.quiz[questionIndex];
      add(doc,quizArea,'p','sfd-quiz-count','Question '+(questionIndex+1)+' of '+lesson.quiz.length+' · प्रश्न क्रम');
      add(doc,quizArea,'h4','',q[0]);
      if(lesson.quizNe?.[questionIndex]?.[0])add(doc,quizArea,'p','sfd-story-ne',lesson.quizNe[questionIndex][0]);
      var answers=add(doc,quizArea,'div','sfd-quiz-answers');
      // Rotate the correct button position; do not teach a fixed A pattern.
      var spin=(f.name.length+questionIndex)%q[1].length;
      var options=q[1].map(function(label,i){return {label:label,index:i};});
      options=options.slice(spin).concat(options.slice(0,spin));
      var feedback=add(doc,quizArea,'div','sfd-quiz-feedback');
      feedback.setAttribute('role','status');
      feedback.setAttribute('aria-live','polite');
      feedback.hidden=true;
      options.forEach(function(opt){
        var button=add(doc,answers,'button','sfd-quiz-choice',opt.label);
        button.type='button';
        button.addEventListener('click',function(){
          if(answers.dataset.answered)return;
          answers.dataset.answered='true';
          var right=opt.index===q[2];
          if(right)correctTotal++;
          answers.querySelectorAll('button').forEach(function(x){x.disabled=true;});
          button.classList.add(right?'sfd-quiz-correct':'sfd-quiz-wrong');
          if(!right){
            var correctButton=options.findIndex(function(o){return o.index===q[2];});
            answers.children[correctButton]?.classList.add('sfd-quiz-correct');
          }
          feedback.hidden=false;
          feedback.textContent=(right?'✅ Correct! · सही उत्तर! ':'❌ Not quite · फेरि सिकौं। ')+q[3]+(lesson.quizNe?.[questionIndex]?.[1]?' · '+lesson.quizNe[questionIndex][1]:'');
          feedback.className='sfd-quiz-feedback '+(right?'sfd-feedback-good':'sfd-feedback-review');
          var next=add(doc,quizArea,'button','sfd-story-quiz-next',questionIndex===lesson.quiz.length-1?
            'See results · नतिजा हेर्नुहोस् →':'Next question · अर्को प्रश्न →');
          next.type='button';next.addEventListener('click',function(){questionIndex++;drawQuestion();});
          next.focus();
        });
      });
    }
    drawQuestion();
    var close=add(doc,study,'button','sfd-story-bottom-back','← All upcoming festivals · सबै आगामी चाडपर्व');
    close.type='button';close.addEventListener('click',closeLesson);
    study.scrollIntoView?.({block:'start',behavior:win?.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
    back.focus({preventScroll:true});
  }
  function closeLesson(){
    win?.speechSynthesis?.cancel?.();
    activeFestival=null;
    study.removeAttribute('data-open');
    study.replaceChildren();
    cards.hidden=false;
    root.classList.remove('sfd-lesson-open');
    render();
    if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});
    else input.focus({preventScroll:true});
    returnFocus=null;
  }
  function makeCard(festival){
    var key=kindFor(festival.name),d=visualFor(key);
    var card=el(doc,'article','sfd-card');
    var visual=add(doc,card,'div','sfd-visual sfd-'+d.scene);
    add(doc,visual,'span','sfd-visual-note',d.hint);
    add(doc,visual,'span','sfd-visual-emoji',festival.icon||d.emoji);
    var date=formatDate(festival.date);
    if(festival.end)date+=' – '+formatDate(festival.end);
    add(doc,card,'span','sfd-date','▣  '+date);
    var name=add(doc,card,'div','sfd-card-title',festival.name);
    if(festival.ne)add(doc,name,'span','',' / '+festival.ne);
    var copy=stories[key];
    add(doc,card,'p','sfd-desc',copy?.summary||d.english);
    if(copy?.summaryNe)add(doc,card,'p','sfd-desc',copy.summaryNe);
    if(festival.bs)add(doc,card,'small','sfd-date',festival.bs);
    var btn=add(doc,card,'button','sfd-learn','📖 Learn Festival English · अंग्रेजी सिक्नुहोस् →');
    btn.type='button';btn.setAttribute('aria-label','Learn English about '+festival.name);
    btn.addEventListener('click',function(){openLesson(festival,btn);});
    return card;
  }
  var controls=add(doc,main,'div','sfd-more-controls');
  var more=add(doc,controls,'button','sfd-more-btn');
  more.type='button';
  more.addEventListener('click',function(){shownAll=!shownAll;render();});
  function render(){
    var now=todayInNepal();
    lastRenderedDay=now;
    var upcoming=futureEvents();
    var query=input.value.toLocaleLowerCase().trim();
    var filtered=upcoming.filter(function(f){
      return !query||[f.name,f.ne,f.bs].join(' ').toLocaleLowerCase().includes(query);
    });
    cards.replaceChildren();
    var limit=shownAll?filtered.length:12;
    if(filtered.length)filtered.slice(0,limit).forEach(function(f){cards.appendChild(makeCard(f));});
    else add(doc,cards,'div','sfd-empty',query?
      'No matching upcoming festival · मिल्ने आगामी चाडपर्व भेटिएन':
      'No more published festival dates in this calendar. New dates will appear after the schedule is updated. · नयाँ पात्रो प्रकाशित भएपछि मिति थपिनेछ।');
    more.hidden=filtered.length<=12;
    more.textContent=shownAll?'Show first 12 · पहिलो १२ हेर्नुहोस्':
      'Show '+(filtered.length-12)+' more upcoming · थप चाडपर्व हेर्नुहोस् ↓';
    var countText=upcoming.length+' upcoming festivals · आगामी चाडपर्व · नेपाल समय अनुसार';
    var label=labels.querySelector('.sfd-muted');
    if(label)label.textContent=countText;
  }
  input.addEventListener('input',function(){shownAll=false;if(!activeFestival)render();});
  render();
  // Refresh on Nepal calendar day rollover, returning to tab, or refocus.
  // No API requests, service workers, or client-written festival dates.
  win?.setInterval?.(function(){
    if(doc.hidden)return;
    if(lastRenderedDay!==todayInNepal()){
      if(activeFestival&&(activeFestival.end||activeFestival.date)<todayInNepal())closeLesson();
      else if(!activeFestival)render();
    }
  },60000);
  doc.addEventListener('visibilitychange',function(){
    if(!doc.hidden&&lastRenderedDay!==todayInNepal()){
      if(activeFestival&&(activeFestival.end||activeFestival.date)<todayInNepal())closeLesson();
      else if(!activeFestival)render();
    }
  });
  if(win?.addEventListener)win.addEventListener('focus',function(){
    if(!activeFestival&&lastRenderedDay!==todayInNepal())render();
  });
};
})();

