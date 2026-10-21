/* Isolated festival dashboard concept.
   Only enhances the already-authorized lesson iframe. No entitlement, XP,
   trial, score, payment or Appwrite functionality is modified here. */
(function(){
'use strict';
var stylesheetUrl = new URL('festival-dashboard-preview.css', document.baseURI).href;
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
  if(s.includes('lhosar'))return 'lhosar';
  if(s.includes('prithvi'))return 'prithvi';
  if(s.includes('maghe')||s.includes('maghi'))return 'maghe';
  return 'other';
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

  var events=Array.isArray(festivalRows)?festivalRows.filter(function(x){
    return x && typeof x.date==='string' && (x.end||x.date)>=today;
  }).sort(function(a,b){return a.date.localeCompare(b.date);}):[];
  /* Only show already-published date rows supplied by the existing app. */
  function makeCard(festival){
    var key=kindFor(festival.name), d=details[key];
    var card=el(doc,'article','sfd-card');
    var visual=add(doc,card,'div','sfd-visual sfd-'+d.scene);
    add(doc,visual,'span','sfd-visual-note',d.hint);
    var date=formatDate(festival.date);
    if(festival.end)date+=' – '+formatDate(festival.end);
    add(doc,visual,'span','sfd-date','▣  '+date);
    add(doc,visual,'span','sfd-visual-emoji',festival.icon||d.emoji);
    var name=add(doc,card,'div','sfd-card-title',festival.name);
    if(festival.ne)add(doc,name,'span','',' / '+festival.ne);
    add(doc,card,'p','sfd-desc',d.english+' '+(festival.bs||''));
    var btn=add(doc,card,'button','sfd-learn','Learn Festival English · अंग्रेजी सिक्नुहोस्  →');
    btn.type='button';
    btn.setAttribute('aria-label','Learn English about '+festival.name);
    btn.addEventListener('click',function(){
      study.replaceChildren();
      add(doc,study,'h4','','English through '+festival.name+' · '+(festival.ne||''));
      add(doc,study,'p','',d.english);
      add(doc,study,'p','',d.nepali);
      var chips=add(doc,study,'div','sfd-chips');
      (festival.words||[]).slice(0,6).forEach(function(w){
        if(Array.isArray(w)&&w.length>=2)add(doc,chips,'span','',w[0]+' — '+w[1]);
      });
      add(doc,study,'p','','Example · उदाहरण: '+d.sentence);
      var close=add(doc,study,'button','sfd-learn','Close lesson · बन्द गर्नुहोस्');
      close.type='button';
      close.addEventListener('click',function(){study.removeAttribute('data-open');btn.focus();});
      study.dataset.open='true';study.scrollIntoView({block:'nearest',behavior:'smooth'});
    });
    return card;
  }
  function render(){
    var query=input.value.toLocaleLowerCase().trim();
    var filtered=events.filter(function(f){
      return !query || [f.name,f.ne,f.bs].join(' ').toLocaleLowerCase().includes(query);
    });
    cards.replaceChildren();
    if(filtered.length){
      filtered.slice(0,12).forEach(function(f){cards.appendChild(makeCard(f));});
    }else{
      add(doc,cards,'div','sfd-empty',query?
        'No matching upcoming festival · मिल्ने चाडपर्व भेटिएन':
        'No upcoming published dates yet · आगामी चाडपर्वको मिति प्रकाशन भएपछि देखिनेछ।');
    }
  }
  input.addEventListener('input',render);
  render();
};
})();