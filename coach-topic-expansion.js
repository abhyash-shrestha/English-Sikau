/* English Sikau extended real-life situations.
 * 147 bilingual topic definitions supplement 28 existing Coach stories.
 * No account data, payments or verified XP touched.
 */
(function(){
'use strict';
const raw=Array.isArray(window.sikauNewTopicRows)?window.sikauNewTopicRows:[];
const patterns={
"Shopping":{
 q:"What would you like to check first?",
 ne:"पहिले के जाँच्न चाहनुहुन्छ?",
 a:[["Could you show me what's available?","के उपलब्ध छ देखाउनुहुन्छ?"],["Could you explain the price and conditions?","मूल्य र सर्त बुझाइदिनुहुन्छ?"],["Could you compare the different options?","फरक विकल्प तुलना गरिदिनुहुन्छ?"]],
 result:"We can check availability, prices and the store rules before you decide.",
 resultNe:"निर्णय गर्नुअघि उपलब्धता, मूल्य र पसलको नियम जाँच्न सक्छौँ।"
},
"Food & Drink":{
 q:"Which part of the order would you like to discuss first?",
 ne:"अर्डरको कुन कुरा पहिले बुझ्न चाहनुहुन्छ?",
 a:[["What options are available?","कुन विकल्प उपलब्ध छन्?"],["Could you check ingredients or dietary needs?","सामग्री वा खानाको आवश्यकता जाँच्नुहुन्छ?"],["How much will it cost and how long might it take?","मूल्य कति र कति समय लाग्छ?"]],
 result:"We can review the menu and any special requests before placing or changing the order.",
 resultNe:"अर्डर गर्नु वा बदल्नुअघि मेनु र विशेष अनुरोध जाँच्न सक्छौँ।"
},
"Travel":{
 q:"What would be most helpful for planning this journey?",
 ne:"यो यात्राको योजना बनाउन के जानकारी उपयोगी हुन्छ?",
 a:[["Which times or routes are available?","कुन समय वा बाटो उपलब्ध छन्?"],["What should I bring or prepare?","के ल्याउने वा तयारी गर्ने?"],["Can you explain the fare or any restrictions?","भाडा वा सीमाबारे बुझाउनुहुन्छ?"]],
 result:"Let's confirm the relevant route, schedule and requirements instead of guessing.",
 resultNe:"अनुमान नगरी सम्बन्धित बाटो, तालिका र आवश्यकता पुष्टि गरौँ।"
},
"Healthcare":{
 q:"What information do you need from the clinic?",
 ne:"क्लिनिकबाट कुन जानकारी चाहिन्छ?",
 a:[["How can I arrange the right appointment?","सही अपोइन्टमेन्ट कसरी लिने?"],["What records or details should I bring?","के कागजात वा विवरण ल्याउने?"],["Can a qualified staff member explain the next step?","योग्य स्वास्थ्यकर्मीले अर्को कदम बुझाउनुहुन्छ?"]],
 result:"I can explain the administrative steps; medical decisions need qualified clinical staff.",
 resultNe:"प्रशासनिक प्रक्रिया बुझाउन सक्छु। स्वास्थ्यसम्बन्धी निर्णय योग्य स्वास्थ्यकर्मीले गर्नुपर्छ।"
},
"Work":{
 q:"What would you like clarified about the work situation?",
 ne:"कामको कुन कुरा स्पष्ट गर्न चाहनुहुन्छ?",
 a:[["What should I do first?","पहिले के गर्नुपर्छ?"],["Who can explain the instructions?","निर्देशन कसले बुझाउँछ?"],["Could we check the schedule or expectations?","तालिका वा अपेक्षा जाँच्न सक्छौँ?"]],
 result:"We can clarify expectations and agree on a practical next step without assuming approval.",
 resultNe:"स्वीकृति अनुमान नगरी अपेक्षा स्पष्ट गरेर अर्को काम तय गर्न सक्छौँ।"
},
"Services":{
 q:"What would help you move forward with this request?",
 ne:"यो अनुरोध अघि बढाउन के कुराले मद्दत गर्छ?",
 a:[["What information or documents are needed?","कुन जानकारी वा कागजात चाहिन्छ?"],["Are there fees or special conditions?","शुल्क वा विशेष सर्त छन्?"],["What's the next step in the process?","प्रक्रियामा अर्को कदम के हो?"]],
 result:"Let's check the actual requirements and options before we promise a result.",
 resultNe:"नतिजाको वाचा गर्नुअघि वास्तविक आवश्यकता र विकल्प जाँचौँ।"
},
"Everyday":{
 q:"How would you like to continue the conversation?",
 ne:"कुराकानी कसरी अघि बढाउन चाहनुहुन्छ?",
 a:[["Could you explain that a little more?","त्यो अलि थप बुझाउनुहुन्छ?"],["Could we talk about another option?","अर्को विकल्पबारे कुरा गरौँ?"],["What would be a polite way to say it?","यो सभ्य तरिकाले कसरी भन्न सकिन्छ?"]],
 result:"Thanks for explaining. We can find words that match your real situation.",
 resultNe:"बुझाउनुभएकोमा धन्यवाद। तपाईंको वास्तविक अवस्थासँग मिल्ने शब्द छनोट गरौँ।"
},
"Home":{
 q:"Which detail about your home situation should we check?",
 ne:"घरको अवस्थाबारे कुन विवरण जाँच्ने?",
 a:[["What choices are available?","कुन विकल्प उपलब्ध छन्?"],["Could you explain the likely cost?","सम्भावित खर्च बुझाउनुहुन्छ?"],["When could we arrange the next step?","अर्को काम कहिले मिलाउन सकिन्छ?"]],
 result:"We can discuss the practical options and confirm any visits or charges before proceeding.",
 resultNe:"अघि बढ्नुअघि व्यवहारिक विकल्प, भेटघाट र शुल्क पुष्टि गर्न सक्छौँ।"
},
"Education":{
 q:"What would help you learn or understand this better?",
 ne:"यो राम्रोसँग बुझ्न वा सिक्न कुन मद्दत चाहिन्छ?",
 a:[["Could you show me an example?","उदाहरण देखाउनुहुन्छ?"],["Could you explain the requirements?","आवश्यकताहरू बुझाउनुहुन्छ?"],["How can I check my next step?","अबको कदम कसरी जाँच्ने?"]],
 result:"Let's review the relevant instructions and choose a manageable next step.",
 resultNe:"सम्बन्धित निर्देशन जाँचेर गर्न सकिने अर्को कदम छानौँ।"
},
"Technology":{
 q:"What would you like to check about this technology issue?",
 ne:"प्रविधिको यो विषयमा के जाँच्न चाहनुहुन्छ?",
 a:[["What's a safe first step to try?","पहिले सुरक्षित रूपमा के गर्ने?"],["Which settings or details should I check?","कुन सेटिङ वा विवरण जाँच्ने?"],["Is there another way to solve this?","समाधानको अर्को उपाय छ?"]],
 result:"We can try simple troubleshooting first and protect your data before making changes.",
 resultNe:"परिवर्तन गर्नुअघि डाटा सुरक्षित राखेर सामान्य जाँच गर्न सक्छौँ।"
},
"Money":{
 q:"What would you like to verify before going ahead?",
 ne:"अघि बढ्नुअघि के पुष्टि गर्न चाहनुहुन्छ?",
 a:[["How can we verify the transaction details?","कारोबारको विवरण कसरी पुष्टि गर्ने?"],["Are there any fees or limits?","शुल्क वा सीमा छन्?"],["What's the secure next step?","सुरक्षित अर्को कदम के हो?"]],
 result:"We can review the procedure and fees; private account details require secure verification.",
 resultNe:"प्रक्रिया र शुल्क जाँच्न सक्छौँ। निजी खाताका लागि सुरक्षित पहिचान पुष्टि चाहिन्छ।"
},
"Community":{
 q:"What information would help you take part?",
 ne:"सहभागी हुन कुन जानकारी चाहिन्छ?",
 a:[["Where can I find reliable information?","भरपर्दो जानकारी कहाँ पाइन्छ?"],["Are there requirements or opening times?","आवश्यकता वा समय छन्?"],["How do I register or get involved?","दर्ता वा सहभागी कसरी हुने?"]],
 result:"Let's check the available local information and steps before making plans.",
 resultNe:"योजना बनाउनुअघि उपलब्ध स्थानीय जानकारी र प्रक्रिया जाँचौँ।"
},
"Family":{
 q:"What would make this conversation most useful for your family?",
 ne:"परिवारका लागि यो कुराकानी कसरी उपयोगी हुन्छ?",
 a:[["Could we discuss everyone's preferences?","सबैको रोजाइबारे कुरा गरौँ?"],["Can we agree on a convenient time?","सुविधाजनक समय मिलाउन सक्छौँ?"],["Could we make a simple plan together?","सँगै सजिलो योजना बनाउन सक्छौँ?"]],
 result:"We can listen to everyone's needs and decide together, without assuming anyone's answer.",
 resultNe:"कसैको उत्तर अनुमान नगरी सबैको कुरा सुनेर सँगै निर्णय गर्न सक्छौँ।"
}
};
const detailReactions={"Shopping":[["Let's look at what the store actually has available.","पसलमा वास्तवमा के उपलब्ध छ हेरौँ।"],["I'll explain the posted price and conditions; a discount isn't automatic.","देखाइएको मूल्य र सर्त बुझाउँछु। छुट आफैँ हुँदैन।"],["We can compare the alternatives before you decide.","निर्णय गर्नुअघि फरक विकल्प तुलना गरौँ।"]],"Food & Drink":[["I'll check which items are on the menu right now.","अहिले मेनुमा कुन खानेकुरा छ जाँच्नेछु।"],["Let's verify the ingredients with the kitchen rather than assume they're safe.","सुरक्षित छ भनेर अनुमान नगरी भान्सामा सामग्री पुष्टि गरौँ।"],["I'll check the price and preparation time before confirming anything.","अर्डर पुष्टि गर्नुअघि मूल्य र समय जाँच्नेछु।"]],"Travel":[["We'll need an up-to-date timetable to confirm those options.","त्यो पुष्टि गर्न हालको समयतालिका चाहिन्छ।"],["I'll explain what to prepare and where to confirm requirements.","के तयारी गर्ने र आवश्यकता कहाँ पुष्टि गर्ने बुझाउँछु।"],["Let's verify current fares and restrictions before you book.","बुकिङअघि हालको भाडा र नियम पुष्टि गरौँ।"]],"Healthcare":[["Let's check how the scheduling process works.","अपोइन्टमेन्ट लिने प्रक्रिया जाँचौँ।"],["I'll explain the usual paperwork without requesting private details here.","यहाँ निजी विवरण नमागी सामान्य कागजातबारे बुझाउँछु।"],["For individual medical questions, the appropriate clinician should advise you.","व्यक्तिगत स्वास्थ्य प्रश्नमा उपयुक्त चिकित्सकको सल्लाह लिनुपर्छ।"]],"Work":[["Let's identify the first task and how it's normally done.","पहिलो काम र त्यसको सामान्य तरिका पहिचान गरौँ।"],["I'll direct the question to the person responsible for the instructions.","निर्देशन दिने जिम्मेवार व्यक्तिसँग प्रश्न राखौँ।"],["We should check the actual team schedule and expectations.","वास्तविक टोलीको तालिका र अपेक्षा जाँच्नुपर्छ।"]],"Services":[["Let's review which documents or information the service requires.","सेवाका लागि कस्ता कागजात वा विवरण चाहिन्छ जाँचौँ।"],["I'll explain how fees or conditions are checked, without inventing an amount.","रकम अनुमान नगरी शुल्क वा सर्त कसरी जाँच्ने बुझाउँछु।"],["We can identify the next step, but approval isn't automatic.","अर्को प्रक्रिया पत्ता लगाउन सक्छौँ, तर स्वीकृति आफैँ हुँदैन।"]],"Everyday":[["Certainly. I'll put that into simpler words.","पक्कै, अझ सजिलो भाषामा बुझाउँछु।"],["We can explore another possibility without making a decision yet.","अहिले निर्णय नगरी अर्को विकल्प हेर्न सक्छौँ।"],["A polite and clear request is usually a good way to start.","सभ्य र स्पष्ट अनुरोधबाट कुरा सुरु गर्नु राम्रो हुन्छ।"]],"Home":[["Let's check what options are suitable for the home.","घरका लागि उपयुक्त विकल्प जाँचौँ।"],["We'll need the details before estimating any charges.","खर्च अनुमान गर्नुअघि विवरण चाहिन्छ।"],["We can ask for an available appointment rather than promise a time.","समयको वाचा नगरी खाली समय सोध्न सक्छौँ।"]],"Education":[["Let's work through a simple example together.","एउटा सजिलो उदाहरण सँगै हेरौँ।"],["We'll check the official instructions for this course or school.","यो पाठ्यक्रम वा विद्यालयको आधिकारिक निर्देशन जाँचौँ।"],["Let's identify what you should do next and how to confirm it.","अब के गर्ने र कसरी पुष्टि गर्ने पहिचान गरौँ।"]],"Technology":[["Let's start with a low-risk check before changing settings.","सेटिङ बदल्नुअघि कम जोखिम भएको जाँच गरौँ।"],["We can review relevant settings while keeping personal data private.","निजी डाटा सुरक्षित राखेर सम्बन्धित सेटिङ जाँचौँ।"],["We can try another method if the first one doesn't work.","पहिलो उपाय चलेन भने अर्को प्रयास गर्न सक्छौँ।"]],"Money":[["Let's use the provider's secure channel to verify that transaction.","त्यो कारोबार सुरक्षित माध्यमबाट पुष्टि गरौँ।"],["Let's check the stated fees and limits rather than guess.","शुल्क र सीमा अनुमान नगरी जाँचौँ।"],["The next step should protect your account and identity details.","अर्को कदमले खाता र पहिचान सुरक्षित राख्नुपर्छ।"]],"Community":[["We can check the organization's current official information.","संस्थाको हालको आधिकारिक जानकारी जाँचौँ।"],["Let's verify opening times and participation rules.","खुल्ने समय र सहभागी नियम पुष्टि गरौँ।"],["I'll explain how to find the correct signup or contact person.","सही दर्ता वा सम्पर्क व्यक्ति कसरी खोज्ने बुझाउँछु।"]],"Family":[["Let's ask everyone what works for them rather than assume.","अनुमान नगरी सबैको रुचि सोधौँ।"],["We'll look for a time that works for everyone involved.","सबैलाई मिल्ने समय खोजौँ।"],["Let's make a flexible plan that people can agree to.","सबैलाई मिल्न सक्ने लचिलो योजना बनाऔँ।"]]};
const openings={
"Shopping":["Hello! Welcome in. What can I help you find or check today?","नमस्ते! स्वागत छ। आज के खोज्न वा जाँच्न मद्दत गरौँ?"],
"Food & Drink":["Hi! Welcome. How can I help you today?","नमस्ते! स्वागत छ। आज कसरी मद्दत गरौँ?"],
"Travel":["Hello! What travel question can I help with?","नमस्ते! यात्राबारे के मद्दत चाहिन्छ?"],
"Healthcare":["Hello! How can I help you at the front desk?","नमस्ते! काउन्टरमा कसरी मद्दत गरौँ?"],
"Work":["Hi! What would you like to discuss at work?","नमस्ते! कामबारे के कुरा गर्न चाहनुहुन्छ?"],
"Services":["Hello! What service do you need help with today?","नमस्ते! आज कुन सेवामा मद्दत चाहिन्छ?"],
"Everyday":["Hi there! How are you? What would you like to talk about?","नमस्ते! कस्तो हुनुहुन्छ? के कुरा गर्न चाहनुहुन्छ?"],
"Home":["Hello! How can I help with your home question?","नमस्ते! घरबारे के मद्दत गरौँ?"],
"Education":["Hello! What would you like to learn or ask about?","नमस्ते! के सिक्न वा सोध्न चाहनुहुन्छ?"],
"Technology":["Hi! What can I help you with on your device or account?","नमस्ते! उपकरण वा खातामा के मद्दत चाहिन्छ?"],
"Money":["Hello! How can I help with your financial service question?","नमस्ते! वित्तीय सेवाबारे के मद्दत गरौँ?"],
"Community":["Welcome! What would you like to find out?","स्वागत छ! के बुझ्न चाहनुहुन्छ?"],
"Family":["Hello! What would you like to talk about today?","नमस्ते! आज के कुरा गर्न चाहनुहुन्छ?"]
};
function buildRow(row){
 if(!Array.isArray(row)||row.length!==9)throw Error('Invalid Coach topic catalog row');
 const [id,emoji,title,ne,category,place,partner,focusEN,focusNE]=row;
 const focus=focusEN.split(';'),neFocus=focusNE.split(';');
 if(focus.length!==3||neFocus.length!==3||!patterns[category]||!openings[category]||
   !/^[a-z][a-z0-9-]+$/.test(id)||!title||!ne)throw Error('Invalid Coach topic '+id);
 const pattern=patterns[category];
 // Buying clothes deserves its own size, style and price paths, distinct
 // from the dedicated clothing-return/refund scenario.
 if(id==="buy-clothes"){
  const custom=[
   ["I'm looking for a jacket for winter.","म जाडोको ज्याकेट खोज्दै छु।",
    "Of course. What kind of jacket are you looking for?","अवश्य। कस्तो ज्याकेट खोज्दै हुनुहुन्छ?",
    [["Something warm but lightweight.","न्यानो तर हलुका।"],["A waterproof jacket.","पानी नछिर्ने ज्याकेट।"],["I'd like to compare casual styles.","सामान्य शैली तुलना गर्छु।"]],
    "I can show you the available styles and sizes. You're welcome to check the fit before you decide.",
    "उपलब्ध शैली र साइज देखाउन सक्छु। निर्णयअघि लगाएर मिल्छ कि हेर्न सक्नुहुन्छ।"],
   ["Could I try on a few different sizes?","म फरक साइज लगाएर हेर्न सक्छु?",
    "Certainly. What would you like to try first?","पक्कै। पहिले के लगाएर हेर्न चाहनुहुन्छ?",
    [["A jacket in a larger size.","अलि ठूलो ज्याकेट।"],["Jeans in two sizes.","दुई साइजको जिन्स।"],["I'd like to use the fitting room.","मलाई ट्रायल रुम प्रयोग गर्नु छ।"]],
    "Let's find the available sizes and the fitting room. You can compare the fit without having to buy anything.",
    "उपलब्ध साइज र ट्रायल रुम हेरौँ। नकिनी पनि साइज तुलना गर्न सक्नुहुन्छ।"],
   ["Could you explain the prices and offers?","मूल्य र छुटबारे बुझाउनुहुन्छ?",
    "Sure. What would you like to check?","अवश्य। के जाँच्न चाहनुहुन्छ?",
    [["Is there a discount on these clothes?","यी लुगामा छुट छ?"],["Is the price on the tag the final price?","ट्यागको मूल्य नै अन्तिम हो?"],["Can you explain the exchange policy?","साट्ने नियम बुझाउनुहुन्छ?"]],
    "We can check the tag prices, current offers and exchange terms before you pay. Nothing is purchased until you choose to check out.",
    "तिर्नुअघि मूल्य, अहिलेका छुट र साट्ने नियम बुझौँ। तपाईंले बिल नतिरुन्जेल कुनै सामान किनिएको हुँदैन।"]
  ];
  custom[0].push([
   ["Let's check available jacket materials and warmth without assuming stock.","ज्याकेटको सामग्री र न्यानोपन जाँचौँ, स्टक अनुमान नगरौँ।"],
   ["Waterproof options may be available; let's check the product labels.","पानी नछिर्ने विकल्प हुन सक्छन्। लेबल जाँचौँ।"],
   ["We can compare the casual styles and their actual prices.","साधारण शैली र वास्तविक मूल्य तुलना गरौँ।"]
  ]);
  custom[1].push([
   ["Let's find a larger size and see if it is comfortable.","ठूलो साइज खोजेर आरामदायी छ कि हेरौँ।"],
   ["You can try both jeans sizes and compare the fit.","दुवै साइजको जिन्स लगाएर तुलना गर्न सक्नुहुन्छ।"],
   ["I'll show you where the fitting room is, if it's available.","ट्रायल रुम उपलब्ध छ भने कहाँ छ देखाउँछु।"]
  ]);
  custom[2].push([
   ["We should confirm the current discount at the checkout.","काउन्टरमा हालको छुट पुष्टि गर्नुपर्छ।"],
   ["Let's check the price tag and any applicable taxes.","मूल्य ट्याग र लागू कर जाँचौँ।"],
   ["I'll explain the exchange rules before you choose to buy.","किन्ने निर्णयअघि साट्ने नियम बुझाउँछु।"]
  ]);
  return Object.freeze({id,emoji,title,ne,category,place,partner,level:'Easy',
   config:[["Hello! Welcome to the clothing store. What can I help you find today?",
    "नमस्ते! कपडा पसलमा स्वागत छ। आज के खोज्न मद्दत गरूँ?"],custom]});
 }
 const firstEN=[
  item=>"I'd like help with "+item+".",
  item=>"Could we talk about "+item+"?",
  item=>"I have a question about "+item+"."
 ];
 const firstNE=[
  item=>"मलाई "+item+" बारे मद्दत चाहिन्छ।",
  item=>"हामी "+item+" बारे कुरा गर्न सक्छौँ?",
  item=>"मलाई "+item+" बारे प्रश्न छ।"
 ];
 const routes=focus.map((item,i)=>{
  const first=[firstEN[i](item),firstNE[i](neFocus[i])];
  const q="You mentioned "+item+". "+pattern.q;
  const qNe="तपाईंले "+neFocus[i]+" भन्नुभयो। "+pattern.ne;
  const response="Thanks for explaining your interest in "+item+". "+pattern.result;
  const responseNe=neFocus[i]+" बारे बताउनुभएकोमा धन्यवाद। "+pattern.resultNe;
  return [first[0],first[1],q,qNe,pattern.a,response,responseNe,detailReactions[category]];
 });
 return Object.freeze({id,emoji,title,ne,category,place,partner,level:'Easy',
  config:[openings[category],routes]});
}
const ids=new Set();
const topics=raw.map(row=>{
 const item=buildRow(row);
 if(ids.has(item.id))throw Error('Duplicate Coach topic '+item.id);
 ids.add(item.id);
 return item;
});
if(typeof window!=='undefined')window.sikauMoreTopics=Object.freeze(topics);
})();