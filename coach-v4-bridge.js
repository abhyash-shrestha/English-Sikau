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
 'html.sikau-v4-in-lesson .answer-button > span:first-child{display:block;min-width:0;flex:1 1 auto;font-size:13px!important;color:var(--ink)!important;font-weight:400;line-height:1.45}',
 'html.sikau-v4-in-lesson .answer-button > span:last-child{flex:0 0 auto;font-size:23px;color:var(--pink)}',
 'html.sikau-v4-in-lesson .answer-button .sikau-v4-local{display:block;font-size:12px!important;color:var(--muted)!important;font-weight:600!important;line-height:1.48!important;text-align:left;margin-top:6px}',
 'html.sikau-v4-in-lesson .answer-button .sikau-v4-local>span{display:block;font-size:inherit!important;font-weight:inherit!important;line-height:inherit!important;color:inherit!important;letter-spacing:normal!important}',
 'html.sikau-v4-in-lesson .pager-controls{display:grid!important;grid-template-columns:minmax(76px,auto) minmax(0,1fr) minmax(76px,auto);align-items:stretch;gap:8px;width:min(100%,575px);max-width:100%;margin-inline:auto}',
 'html.sikau-v4-in-lesson .pager-controls .page-numbers{display:flex!important;min-width:0;width:100%;max-width:100%;align-items:center;justify-content:safe center;gap:6px;overflow-x:auto;overflow-y:hidden;scrollbar-width:thin;scroll-behavior:smooth;padding:3px 1px}',
 'html.sikau-v4-in-lesson .pager-controls .page-number{flex:0 0 auto;align-self:center}',
 'html.sikau-v4-in-lesson .pager-controls .page-nav{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;width:100%;min-width:0;min-height:54px;height:auto!important;padding:7px 8px;white-space:nowrap;text-align:center;line-height:1.25}',
 'html.sikau-v4-in-lesson .pager-controls .page-nav .sikau-v4-local{font-size:10px!important;font-weight:650!important;line-height:1.3!important;margin:2px 0 0;white-space:normal;max-width:100%;color:var(--muted)}',
 'html.sikau-v4-in-lesson .pager-controls .page-nav:disabled .sikau-v4-local{opacity:.85}',
 '@media(max-width:440px){html.sikau-v4-in-lesson .pager-controls{grid-template-columns:minmax(70px,auto) minmax(0,1fr) minmax(70px,auto);gap:4px}html.sikau-v4-in-lesson .pager-controls .page-nav{font-size:11px;padding:6px 4px;min-height:52px}html.sikau-v4-in-lesson .pager-controls .page-numbers{gap:4px}}',
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
 // The authenticated app's dark/light preference is authoritative.
 // The standalone V4 preview's saved theme must never override it.
 function readCoachTheme(){
  try{
   const topRoot=window.top.document.documentElement;
   if(topRoot?.dataset?.sikauTheme==='dark'||topRoot?.dataset?.sikauTheme==='light')
    return topRoot.dataset.sikauTheme;
   if(topRoot?.dataset?.theme==='dark'||topRoot?.dataset?.theme==='light')
    return topRoot.dataset.theme;
  }catch(_){}
  try{
   const root=window.parent.document.documentElement;
   if(root?.dataset?.sikauTheme==='dark'||root?.dataset?.sikauTheme==='light')
    return root.dataset.sikauTheme;
   if(root?.dataset?.theme==='dark'||root?.dataset?.theme==='light')
    return root.dataset.theme;
  }catch(_){}
  try{
   const pref=localStorage.getItem('english-sikau-theme-v1');
   if(pref==='dark'||pref==='light')return pref;
  }catch(_){}
  return 'light';
 }
 function applyCoachTheme(){
  const selected=readCoachTheme();
  // Update the V4 engine's internal state, not CSS alone: a normal render()
  // would otherwise immediately repaint Coach with its stale theme.
  if(typeof window.SikauPreview?.setTheme==='function')
   window.SikauPreview.setTheme(selected);
  else document.documentElement.dataset.theme=selected;
  document.documentElement.dataset.sikauTheme=selected;
  document.documentElement.style.colorScheme=selected;
 }
 applyCoachTheme();
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

 // Reviewed, offline Nepali topic titles for every one of the 175 scenarios.
 // English titles are stable keys: changes to topic order will not swap labels.
 const topicTitleNe={
 "Return clothing": "लुगा फिर्ता गर्नु",
 "Buy clothes": "लुगा किन्नु",
 "Buy a phone": "मोबाइल फोन किन्नु",
 "Ask for directions": "बाटो सोध्नु",
 "Call for an appointment": "अपोइन्टमेन्ट लिन फोन गर्नु",
 "Check in at a hospital": "अस्पतालमा दर्ता गर्नु",
 "Order at a restaurant": "रेस्टुरेन्टमा खाना अर्डर गर्नु",
 "Grocery shopping": "किराना किनमेल गर्नु",
 "At the pharmacy": "औषधि पसलमा",
 "Order at a café": "क्याफेमा अर्डर गर्नु",
 "Job interview": "जागिरको अन्तर्वार्ता",
 "At work": "काममा कुराकानी",
 "Take public transport": "सार्वजनिक यातायात प्रयोग गर्नु",
 "Check in at a hotel": "होटलमा चेकइन गर्नु",
 "At the airport": "विमानस्थलमा",
 "At a bank": "बैंकमा",
 "Repair a phone": "फोन मर्मत गराउनु",
 "Meet someone new": "नयाँ व्यक्तिलाई भेट्नु",
 "Ask a teacher": "शिक्षकसँग सोध्नु",
 "Rent an apartment": "अपार्टमेन्ट भाडामा लिनु",
 "Set up home internet": "घरमा इन्टरनेट जडान गर्नु",
 "Missing online delivery": "अनलाइन अर्डर नआउँदा",
 "At the dentist": "दन्त चिकित्सककहाँ",
 "Meet a teacher": "शिक्षकसँग भेट्नु",
 "Change a work shift": "कामको सिफ्ट बदल्नु",
 "Lost debit card": "डेबिट कार्ड हराउनु",
 "At the post office": "हुलाक कार्यालयमा",
 "At the car mechanic": "गाडी मर्मत केन्द्रमा",
 "At the public library": "सार्वजनिक पुस्तकालयमा",
 "Buy shoes": "जुत्ता किन्नु",
 "Shop for glasses": "चस्मा किन्नु",
 "Buy furniture": "फर्निचर किन्नु",
 "Buy a home appliance": "घरायसी विद्युतीय उपकरण किन्नु",
 "Choose a birthday gift": "जन्मदिनको उपहार छान्नु",
 "Shop for jewelry": "गहना किन्नु",
 "Shop for cosmetics": "सौन्दर्य सामग्री किन्नु",
 "Compare prices in shops": "पसलमा मूल्य तुलना गर्नु",
 "Ask about a discount": "छुटबारे सोध्नु",
 "Pay at the checkout": "काउन्टरमा पैसा तिर्नु",
 "Use self-checkout": "सेल्फ-चेकआउट प्रयोग गर्नु",
 "Return an electronic item": "विद्युतीय सामान फिर्ता गर्नु",
 "Ask about a warranty": "वारेन्टीबारे सोध्नु",
 "Pick up a store order": "पसलबाट अर्डर लिनु",
 "Get clothes altered": "लुगा मिलाउन सिलाइ गर्नु",
 "Order pizza": "पिज्जा अर्डर गर्नु",
 "Order fast food": "फास्ट फुड अर्डर गर्नु",
 "Buy from a bakery": "बेकरीबाट किन्नु",
 "Ask about food allergies": "खानाको एलर्जीबारे सोध्नु",
 "Split a restaurant bill": "रेस्टुरेन्टको बिल बाँड्नु",
 "Fix a wrong food order": "गलत खाना अर्डर सच्याउनु",
 "Ask for a restaurant table": "रेस्टुरेन्टमा टेबल माग्नु",
 "Order food delivery": "खाना डेलिभरी अर्डर गर्नु",
 "Check food freshness": "खाना ताजा छ कि छैन जाँच्नु",
 "Order Nepali food": "नेपाली खाना अर्डर गर्नु",
 "Find a budget meal": "सस्तो खाना खोज्नु",
 "Book a taxi": "ट्याक्सी बुक गर्नु",
 "Meet a rideshare driver": "राइडसेयर चालकलाई भेट्नु",
 "Buy a train ticket": "रेलको टिकट किन्नु",
 "Miss a bus": "बस छुट्नु",
 "Report missing luggage": "हराएको सामान रिपोर्ट गर्नु",
 "Ask about airport security": "विमानस्थल सुरक्षाबारे सोध्नु",
 "Ask about a flight delay": "उडान ढिलाइबारे सोध्नु",
 "Report a hotel room issue": "होटलको कोठामा समस्या रिपोर्ट गर्नु",
 "Check out of a hotel": "होटलबाट चेकआउट गर्नु",
 "Rent a car": "गाडी भाडामा लिनु",
 "At a gas station": "पेट्रोल पम्पमा",
 "Call roadside assistance": "सडकमा गाडी बिग्रिँदा सहायता माग्नु",
 "Ask at a visitor center": "पर्यटक सूचना केन्द्रमा सोध्नु",
 "Ask about customs rules": "भन्सार नियमबारे सोध्नु",
 "Schedule a checkup": "स्वास्थ्य जाँचको समय लिनु",
 "Join a telehealth visit": "अनलाइन स्वास्थ्य परामर्शमा सहभागी हुनु",
 "Visit urgent care": "तत्काल उपचार केन्द्रमा जानु",
 "Call health insurance": "स्वास्थ्य बीमा कम्पनीलाई फोन गर्नु",
 "Request a medicine refill": "औषधि पुनः लिन अनुरोध गर्नु",
 "Book an eye exam": "आँखा जाँचको समय लिनु",
 "Schedule teeth cleaning": "दाँत सफा गराउने समय लिनु",
 "Ask about a vaccination visit": "खोप लगाउने समयबारे सोध्नु",
 "Request medical records": "स्वास्थ्य अभिलेख माग्नु",
 "Visit a laboratory": "प्रयोगशालामा जाँच गराउनु",
 "Ask about counseling": "परामर्श सेवाबारे सोध्नु",
 "Apply for a job": "जागिरको आवेदन दिनु",
 "Discuss salary and pay": "तलब र पारिश्रमिकबारे कुरा गर्नु",
 "Ask for job training": "जागिरको तालिम माग्नु",
 "Report a mistake at work": "काममा भएको गल्तीबारे बताउनु",
 "Call out sick from work": "बिरामी हुँदा काममा बिदा माग्नु",
 "Request vacation time": "छुट्टीको समय माग्नु",
 "Ask a coworker for help": "सहकर्मीसँग सहयोग माग्नु",
 "Handle a customer complaint": "ग्राहकको गुनासो समाधान गर्नु",
 "Speak in a team meeting": "टोलीको बैठकमा बोल्नु",
 "Discuss career growth": "करिअर प्रगतिबारे कुरा गर्नु",
 "Resign professionally": "व्यावसायिक रूपमा राजीनामा दिनु",
 "Call a home repair service": "घर मर्मत सेवा बोलाउनु",
 "Get a haircut": "कपाल काट्नु",
 "Use a laundry service": "लुगा धुने सेवा प्रयोग गर्नु",
 "Send a package abroad": "विदेशमा पार्सल पठाउनु",
 "Ask about notarizing documents": "कागजात नोटरी गराउनेबारे सोध्नु",
 "Ask about an ID card": "परिचयपत्रबारे सोध्नु",
 "Renew a driving license": "सवारी चालक अनुमतिपत्र नवीकरण गर्नु",
 "Ask about an electricity bill": "बिजुलीको बिलबारे सोध्नु",
 "Ask about water service": "खानेपानी सेवाबारे सोध्नु",
 "Question an internet bill": "इन्टरनेट बिलबारे प्रश्न गर्नु",
 "Change a mobile phone plan": "मोबाइलको प्लान बदल्नु",
 "Ask for a locksmith": "तालाचाबी बनाउने व्यक्ति बोलाउनु",
 "Report a noise problem": "हल्लाको समस्याबारे जानकारी दिनु",
 "Meet a new neighbor": "नयाँ छिमेकीलाई भेट्नु",
 "Borrow something politely": "नम्रतापूर्वक सामान सापटी माग्नु",
 "Invite a friend to an event": "साथीलाई कार्यक्रममा बोलाउनु",
 "Politely decline an invitation": "नम्रतापूर्वक निमन्त्रणा अस्वीकार गर्नु",
 "Apologize for a mistake": "गल्तीका लागि माफी माग्नु",
 "Make small talk": "सामान्य कुराकानी गर्नु",
 "Plan a weekend": "सप्ताहन्तको योजना बनाउनु",
 "Ask someone for a favor": "कसैसँग सहयोग माग्नु",
 "Find a lost item": "हराएको सामान खोज्नु",
 "Talk about hobbies": "रुचि र सोखबारे कुरा गर्नु",
 "Ask about a room for rent": "भाडाको कोठाबारे सोध्नु",
 "Plan a house move": "घर सर्ने योजना बनाउनु",
 "Call a plumber": "प्लम्बर बोलाउनु",
 "Report a heating problem": "घरको हीटरमा समस्या बताउनु",
 "Report an air-conditioner problem": "एयर कन्डिसनरको समस्या बताउनु",
 "Book a cleaning service": "सरसफाइ सेवा बुक गर्नु",
 "Receive a home delivery": "घरमा डेलिभरी लिनु",
 "Ask a landlord for repairs": "घरधनीसँग मर्मत माग्नु",
 "Discuss household supplies": "घरायसी सामग्रीबारे छलफल गर्नु",
 "Set up utilities when moving": "घर सर्दा पानीबिजुली सेवा जोड्नु",
 "Ask about school enrollment": "विद्यालय भर्नाबारे सोध्नु",
 "Apply to a college": "कलेजमा आवेदन दिनु",
 "Ask about student financial aid": "विद्यार्थी आर्थिक सहायताबारे सोध्नु",
 "Join an English class": "अंग्रेजी कक्षामा भर्ना हुनु",
 "Hire a tutor": "निजी शिक्षक राख्नु",
 "Ask for homework feedback": "गृहकार्यबारे सुझाव माग्नु",
 "Organize a group project": "समूह परियोजना मिलाउनु",
 "Reserve a study room": "पढ्ने कोठा बुक गर्नु",
 "Ask about an exam": "परीक्षाबारे सोध्नु",
 "Join an online course": "अनलाइन कोर्समा सहभागी हुनु",
 "Fix phone Wi-Fi": "फोनको वाइफाइ ठीक गर्नु",
 "Ask about a slow computer": "ढिलो चल्ने कम्प्युटरबारे सोध्नु",
 "Fix a printer problem": "प्रिन्टरको समस्या समाधान गर्नु",
 "Reset an account password": "खाताको पासवर्ड रिसेट गर्नु",
 "Join a video call": "भिडियो कलमा सहभागी हुनु",
 "Report a suspicious message": "शंकास्पद सन्देश रिपोर्ट गर्नु",
 "Ask about a software update": "सफ्टवेयर अपडेटबारे सोध्नु",
 "Move files between devices": "एउटा उपकरणबाट अर्कोमा फाइल सार्नु",
 "Buy a mobile data package": "मोबाइल डाटा प्याकेज किन्नु",
 "Ask how to use an AI assistant": "एआई सहायक कसरी चलाउने सोध्नु",
 "Send an email attachment": "इमेलमा फाइल संलग्न गरी पठाउनु",
 "Deposit money at a bank": "बैंकमा पैसा जम्मा गर्नु",
 "Withdraw cash": "नगद निकाल्नु",
 "Open a bank account": "बैंक खाता खोल्नु",
 "Dispute a bank charge": "बैंक शुल्कमा आपत्ति जनाउनु",
 "Exchange money": "मुद्रा साट्नु",
 "Send money to Nepal": "नेपालमा पैसा पठाउनु",
 "Pay a credit card bill": "क्रेडिट कार्डको बिल तिर्नु",
 "Ask about a personal loan": "व्यक्तिगत ऋणबारे सोध्नु",
 "Plan a monthly budget": "मासिक बजेट बनाउनु",
 "Discuss paying rent": "घरभाडा तिर्नेबारे कुरा गर्नु",
 "Ask about a community event": "सामुदायिक कार्यक्रमबारे सोध्नु",
 "Sign up to volunteer": "स्वयंसेवक बन्न नाम लेखाउनु",
 "Ask about a gym membership": "जिमको सदस्यताबारे सोध्नु",
 "Join a sports club": "खेलकुद क्लबमा सहभागी हुनु",
 "Get a library card": "पुस्तकालयको कार्ड बनाउनु",
 "Ask about a public park": "सार्वजनिक पार्कबारे सोध्नु",
 "Ask at town hall": "नगर कार्यालयमा सोध्नु",
 "Ask about a missing pet": "हराएको घरपालुवा जनावरबारे सोध्नु",
 "Invite friends to a festival": "साथीहरूलाई चाडपर्वमा बोलाउनु",
 "Find local support services": "स्थानीय सहयोग सेवा खोज्नु",
 "Plan a family meal": "परिवारको खानाको योजना बनाउनु",
 "Call family back home": "घरमा रहेका परिवारलाई फोन गर्नु",
 "Plan a birthday party": "जन्मदिनको पार्टीको योजना बनाउनु",
 "Arrange family caregiving": "परिवारका सदस्यको हेरचाह मिलाउनु",
 "Discuss a child's school day": "बच्चाको विद्यालयको दिनबारे कुरा गर्नु",
 "Share good news": "खुसीको खबर सुनाउनु",
 "Resolve a disagreement": "असहमति समाधान गर्नु",
 "Plan a family visit to Nepal": "नेपालमा पारिवारिक भ्रमणको योजना बनाउनु",
 "Talk in a long-distance relationship": "टाढा बस्ने प्रेम सम्बन्धमा कुरा गर्नु",
 "Shop for family necessities": "परिवारका आवश्यक सामान किन्नु"
};
 for(const [english,ne] of Object.entries(topicTitleNe))staticNe.set(english,ne);
 const romanWords={'नमस्ते':'Namaste','अभ्यास':'Abhyash','मेरो':'mero','नेपाली':'Nepali','कृपया':'kripaya','धन्यवाद':'dhanyabad','तपाईं':'tapai','तपाईंको':'tapaiko','तपाईंलाई':'tapailai','हो':'ho','छ':'chha','छैन':'chhaina','फेरि':'pheri','कुराकानी':'kurakani'};
 const cons={'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ng','च':'ch','छ':'chh','ज':'j','झ':'jh','ञ':'ny','ट':'t','ठ':'th','ड':'d','ढ':'dh','ण':'n','त':'t','थ':'th','द':'d','ध':'dh','न':'n','प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'w','श':'sh','ष':'sh','स':'s','ह':'h'};
 const vowel={'अ':'a','आ':'aa','इ':'i','ई':'ee','उ':'u','ऊ':'oo','ऋ':'ri','ए':'e','ऐ':'ai','ओ':'o','औ':'au'};
 const matra={'ा':'a','ि':'i','ी':'ee','ु':'u','ू':'oo','ृ':'ri','े':'e','ै':'ai','ो':'o','ौ':'au'};
 function romanize(input){
  const transliterated=String(input).replace(/[\u0900-\u097f]+/g,word=>{
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
  return capitalizeRomanSentences(transliterated);
 }
 function capitalizeRomanSentences(value){
  // Capitalize the first word and the first word after sentence-ending punctuation.
  // Do not change names such as Abhyash or already-capitalized Nepali terms.
  return String(value||'').replace(/(^[^A-Za-z]*|[.!?।॥]+[ \t]*|[\r\n]+[ \t]*)([a-z])/g,
    (_,boundary,letter)=>boundary+letter.toUpperCase());
 }

 const sectionNames={
  'All':'सबै','Shopping':'किनमेल','Healthcare':'स्वास्थ्य सेवा',
  'Food & Drink':'खाना र पेय पदार्थ','Travel':'यात्रा','Work':'काम',
  'Services':'सेवाहरू','Everyday':'दैनिक जीवन','Home':'घर',
  'Education':'शिक्षा','Technology':'प्रविधि','Money':'पैसा',
  'Community':'समुदाय','Family':'परिवार',
  'Returns associate':'सामान फिर्ता लिने कर्मचारी',
  'Phone salesperson':'मोबाइल विक्रेता','Sales assistant':'बिक्री सहायक',
  'Barista':'कफी बनाउने कर्मचारी','Store assistant':'पसल कर्मचारी',
  'Customer service agent':'ग्राहक सेवा प्रतिनिधि',
  'You · Learner':'तपाईं · विद्यार्थी',
  'Conversation completed':'कुराकानी पूरा भयो',
  'Conversation':'कुराकानी',
  'Choose your starting situation':'सुरु गर्ने परिस्थिति छान्नुहोस्',
  'Real-life details':'वास्तविक जीवनका विवरण',
  'Deciding next steps':'अर्को कदम तय गर्दै',
  'Choose what you\'d actually say':'तपाईं वास्तवमै के भन्न चाहनुहुन्छ?',
  'Choose a card to start talking':'कुराकानी सुरु गर्न एउटा कार्ड छान्नुहोस्',
  'Your request:':'तपाईंको अनुरोध:',
  'Previous':'अघिल्लो',
  'Next':'अर्को',
  'Try another path':'अर्को तरिकाले अभ्यास गर्नुहोस्',
  '✓ This conversation has reached an ending.':'यो कुराकानी यहाँ समाप्त भयो।',
  'This conversation has reached an ending.':'यो कुराकानी यहाँ समाप्त भयो।',
  'Try a different answer to see how the story changes, or choose another situation.':'अर्को उत्तर छानेर कुराकानी कसरी बदलिन्छ हेर्नुहोस् वा नयाँ परिस्थिति छान्नुहोस्।',
  'Practice preview only · No purchases, medical appointments, account changes, or real reservations occur.':'यो अभ्यास मात्र हो। वास्तविक खरिद, भेटघाट, खाता परिवर्तन वा बुकिङ हुँदैन।',
  '175 real-life situations':'१७५ वास्तविक जीवनका परिस्थितिहरू'
 };
 for(const [english,ne] of Object.entries(sectionNames))staticNe.set(english,ne);
 const storageKey='sikau-v4-ne-dialogue-cache-v2';
 let cacheEntries=[];
 try{cacheEntries=JSON.parse(localStorage.getItem(storageKey)||localStorage.getItem('sikau-v4-ne-dialogue-cache-v1')||'[]');}catch(_){}
 // Only prewritten scenario text may enter this cache. It contains no user
 // account data. Keep enough entries for 175 scenarios instead of 450 lines.
 const translated=new Map(Array.isArray(cacheEntries)?
  cacheEntries.filter(x=>Array.isArray(x)&&x.length===2&&
   typeof x[0]==='string'&&typeof x[1]==='string'&&/[\u0900-\u097f]/.test(x[1])):[]);
 const pending=new Set(),retryAfter=new Map(),jobs=[];
 let processing=0,failures=0,saveTimer=0,retryTimer=0;
 let coolUntil=0;
 function persist(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{
   try{
    const items=Array.from(translated).slice(-5500);
    const payload=JSON.stringify(items);
    if(payload.length<3200000)localStorage.setItem(storageKey,payload);
    else localStorage.setItem(storageKey,JSON.stringify(items.slice(-2000)));
   }catch(_){}
  },900);
 }
 function localNe(english){
  const direct=staticNe.get(english);
  if(direct)return direct;
  // Dynamic UI values should not consume machine translation requests.
  let match=/^Topic (\d+) of 175$/.exec(english);
  if(match)return '१७५ मध्ये विषय '+match[1];
  match=/^Turn (\d+) · (.*)$/.exec(english);
  if(match)return 'पालो '+match[1]+' · '+(staticNe.get(match[2])||match[2]);
  match=/^(\d+) topic-specific conversations$/.exec(english);
  if(match)return match[1]+' विषयअनुसारका कुराकानीहरू';
  match=/^(\d+) matching situations$/.exec(english);
  if(match)return match[1]+' मिल्दो परिस्थितिहरू';
  match=/^Showing (\d+)–(\d+) of (\d+) · Page (\d+) of (\d+)$/.exec(english);
  if(match)return match[1]+' देखि '+match[2]+' सम्म, कुल '+match[3]+' · पृष्ठ '+match[4]+'/'+match[5];
  match=/^(.+?) · (Shopping|Healthcare|Food & Drink|Travel|Work|Services|Everyday|Home|Education|Technology|Money|Community|Family)$/.exec(english);
  if(match&&staticNe.has(match[1]))return staticNe.get(match[1])+' · '+staticNe.get(match[2]);
  if(english==='No matching situations')return 'मिल्दो परिस्थिति भेटिएन';
  return '';
 }
 function validTranslation(value){
  return typeof value==='string'&&/[\u0900-\u097f]/.test(value)&&
   !/MYMEMORY WARNING|QUOTA EXCEEDED|TRANSLATION FAILED/i.test(value);
 }
 async function translateWithGoogle(english){
  const url='https://translate.googleapis.com/translate_a/single?'+new URLSearchParams({
   client:'gtx',sl:'en',tl:'ne',dt:'t',q:english
  });
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),4500);
  try{
   const response=await fetch(url,{signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});
   if(!response.ok)throw Error('Google translation HTTP '+response.status);
   const json=await response.json();
   const result=Array.isArray(json?.[0])?json[0].map(x=>String(x?.[0]||'')).join('').trim():'';
   if(!validTranslation(result))throw Error('No usable Nepali response');
   return result;
  }finally{clearTimeout(timer);}
 }
 async function translateWithMyMemory(english){
  // Public, keyless fallback has a small shared daily quota and a strict
  // 500-byte input limit. Do not send arbitrary learner-written messages.
  if(new TextEncoder().encode(english).length>480)throw Error('Too long for fallback');
  const url='https://api.mymemory.translated.net/get?'+new URLSearchParams({
   q:english,langpair:'en|ne'
  });
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),6000);
  try{
   const response=await fetch(url,{signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});
   if(!response.ok)throw Error('MyMemory HTTP '+response.status);
   const json=await response.json();
   const result=String(json?.responseData?.translatedText||'').trim();
   if(Number(json?.responseStatus)!==200||!validTranslation(result))throw Error('Fallback unavailable');
   return result;
  }finally{clearTimeout(timer);}
 }
 async function remoteNe(english){
  // The script provides these public practice phrases, not learner input.
  // Try the default free endpoint, then an independent free fallback.
  try{return await translateWithGoogle(english)}
  catch(_){return await translateWithMyMemory(english)}
 }
 function workQueue(){
  if(Date.now()<coolUntil){
   if(!retryTimer)retryTimer=setTimeout(()=>{retryTimer=0;workQueue()},Math.max(300,coolUntil-Date.now()));
   return;
  }
  while(processing<2&&jobs.length){
   const english=jobs.shift();
   processing++;
   remoteNe(english).then(ne=>{
    failures=0;retryAfter.delete(english);
    translated.set(english,ne);
    persist();
    schedule();
   }).catch(()=>{
    failures=Math.min(failures+1,8);
    const backoff=Math.min(90000,6000*Math.pow(2,Math.min(failures-1,4)));
    coolUntil=Date.now()+backoff;
    // Revisit a failed line later, not forever and not in a retry loop.
    const revisit=Math.max(60000,backoff);
    retryAfter.set(english,Date.now()+revisit);
    // A topic left open can recover without forcing the learner to restart.
    setTimeout(()=>{if(mode!=='en')schedule();},revisit+100);
    schedule();
   }).finally(()=>{
    pending.delete(english);processing--;
    workQueue();
   });
  }
 }
 function neFor(english){
  const fixed=localNe(english);
  if(fixed)return fixed;
  if(translated.has(english))return translated.get(english);
  if(english.length<2||english.length>650)return '';
  if(!pending.has(english)&&Date.now()>=(retryAfter.get(english)||0)){
   pending.add(english);
   jobs.push(english);
   workQueue();
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
  const roman=capitalizeRomanSentences(override?.roman||romanize(ne));
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
  localizedLabel('#chat-role,#chat-counter,#chat-step,#chat-goal,#choice-title,#total-counter,#page-summary,#topic-browser .sectiontitle,#topic-browser .sectionhint,#chat-view .kicker,#topic-browser .resultline span,#topic-browser .footnote,#chat-view .progressline span,#goal-status > span,#complete-actions strong,#complete-actions p');
  localizedLabel('#back-topics,#undo,#switch-goal,#restart,#restart-bottom,#pager-prev,#pager-next',el=>originalText(el).replace(/^[^\p{L}\p{N}]+/u,'').replace(/[^\p{L}\p{N}]+$/u,'').trim());
  localizedLabel('#category-filters .category-chip',el=>originalText(el));
  localizedLabel('#topic-grid .no-results');
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
  const message=mode==='en'?'':(failures>0&&Date.now()<coolUntil)?
   'Translation service is temporarily limited. All 175 topics remain available in English; Nepali and Roman Nepali lines will reappear when translation is available.':
   mode==='en-ne'?'English + नेपाली · All 175 topics · English with Nepali help; dialogue may use automatic translation.':
   mode==='en-roman'?'English + Roman Nepali · All 175 topics · English with Roman Nepali help.':
   'English + नेपाली + Roman · All 175 topics · English, Nepali and Roman Nepali together.';
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
  requestAnimationFrame(()=>{queued=false;syncLessonMode();applyCoachTheme();decorate();measure();});
 }
 window.addEventListener('message',event=>{
  if(event.source!==window.parent||event.data?.type!=='sikau-v4-config')return;
  const next=event.data;
  // Parent's actual selector wins over an older queued postMessage.
  // If the selector is not available, use the validated message value.
  mode=readLessonMode();
  if(!modes.has(mode)&&modes.has(next.mode))mode=next.mode;
  if(next.titles&&typeof next.titles==='object'&&Object.keys(next.titles).length)titles=next.titles;
  // Do not toggle V4's private theme on every configuration message.
  // The main authenticated English Sikau theme wins, including after refresh.
  applyCoachTheme();
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
 // Observe both the verified wrapper and lesson root: changing the moon
 // toggle in either header immediately updates Coach without a reload.
 try{
  new MutationObserver(schedule).observe(window.top.document.documentElement,{
   attributes:true,attributeFilter:['data-sikau-theme','data-theme']
  });
 }catch(_){}
 try{
  new MutationObserver(schedule).observe(window.parent.document.documentElement,{
   attributes:true,attributeFilter:['data-sikau-theme','data-theme']
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
