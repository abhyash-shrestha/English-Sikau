/* English Sikau · complete simulated service conversations.
 * Prices and inventory are invented for language practice, not real quotes.
 * No payment, reservation, medical action, or account changes occur.
 */
(function(){'use strict';
const opt=(value,ne,next,patch={})=>({value,ne,next,patch,correct:true});
const r=(node,npc,npcNe,options)=>({
 nodeId:node,npc,npcNe,storeOptions:options,answer:options[0].value,
 answerNe:options[0].ne,speaker:null,
 goal:"Practice a realistic conversation · वास्तविक कुराकानीको अभ्यास",
 hint:"Choose what you'd actually say. · आफूले भन्ने उत्तर छान्नुहोस्।"
});
const option=(en,ne,node,patch)=>opt(en,ne,node,patch);
const purchase={
 "buy-clothes":["winter jacket",8500,4200],
 "buy-shoes":["walking shoes",7500,3500],
 "buy-glasses":["eyeglass frames",9500,4500],
 "buy-furniture":["sofa",75000,32000],
 "buy-appliance":["refrigerator",90000,48000],
 "buy-gift":["gift",4500,1800],
 "buy-jewelry":["necklace",35000,12000],
 "buy-makeup":["skin-care product",6500,2600],
 "buy-phone":["smartphone",100000,50000],
 "order-pizza":["pizza",2400,1200],
 "order-fast-food":["meal",1250,650],
 "order-bakery":["bakery item",2200,950],
 "nepali-food-order":["Nepali meal",1100,650],
 "eat-out-budget":["meal",900,450]
};
const categories={
 Shopping:{
  intro:["We can compare the choices before deciding. What matters most to you?","निर्णयअघि विकल्प तुलना गरौँ। तपाईंलाई के महत्त्वपूर्ण छ?"],
  priorities:[["A lower price is important to me.","कम मूल्य महत्त्वपूर्ण छ।","budget"],
   ["Quality and durability matter more.","गुणस्तर र टिकाउपन महत्त्वपूर्ण छ।","quality"],
   ["I want something suitable for my needs.","मलाई आवश्यकताअनुसार मिल्ने चाहिन्छ।","fit"]],
  proposal:["I'd recommend comparing these options side by side. Would you like to see the prices and available sizes?",
   "तपाईंलाई मिल्ने सामानहरू तुलना गरौँ। मूल्य र उपलब्ध साइज देखाऊँ?"],
  alternative:["Let's consider another option that better fits your needs. Would you like to compare it?","तपाईंको आवश्यकतामा मिल्ने अर्को विकल्प हेरौँ। तुलना गर्ने?"],
  requirement:["Check the actual price, stock, size or model, and return policy before paying.","तिर्नुअघि वास्तविक मूल्य, स्टक, साइज वा मोडेल र फिर्ता नियम जाँच्नुहोस्।"],
  ready:["That looks like a good choice. Would you like to pay now?","यो तपाईंलाई मिल्ने देखियो। अब पैसा तिर्न चाहनुहुन्छ?"],
  done:["All set! Here's your receipt. Thank you for shopping with us, and have a lovely day!",
   "सबै भयो! यो तपाईंको रसिद। किनमेल गर्नुभएकोमा धन्यवाद। शुभ दिन!"]
 },
 "Food & Drink":{
  intro:["Thanks! What matters most when you order?","धन्यवाद! खाना अर्डर गर्दा के महत्त्वपूर्ण छ?"],
  priorities:[["I'd like to keep the meal affordable.","सस्तो खाना चाहिन्छ।","budget"],
   ["Please check my dietary preferences.","मेरो खानाको रोजाइ जाँच्नुहोस्।","quality"],
   ["I'd like it prepared as soon as possible.","सकेसम्म छिटो तयार चाहिन्छ।","quick"]],
  proposal:["I'll review the menu item you asked about. Before confirming any order, we need to check ingredients, preparation time and the total.",
   "सोध्नुभएको खाना हेरौँ। अर्डरअघि सामग्री, तयार हुने समय र कुल मूल्य पुष्टि गर्नुपर्छ।"],
  alternative:["We could choose a different dish or portion that better matches your needs.","तपाईंलाई मिल्ने अर्को खाना वा परिमाण छान्न सक्छौँ।"],
  requirement:["Confirm the ingredients, any food allergies with staff, the price and expected preparation time.","कर्मचारीसँग सामग्री, एलर्जी, मूल्य र तयार हुने समय पुष्टि गर्नुहोस्।"],
  ready:["Let's confirm your order. Would you like to pay at the counter?","अर्डर पुष्टि गरौँ। काउन्टरमा पैसा तिर्न चाहनुहुन्छ?"],
  done:["Thank you! Your order is confirmed. Enjoy your meal!",
   "धन्यवाद! तपाईंको अर्डर पुष्टि भयो। शुभ भोजन!"]
 },
 Travel:{
  intro:["Let's plan around the journey you described. What is most important?","तपाईंले बताएको यात्राअनुसार योजना गरौँ। के महत्त्वपूर्ण छ?"],
  priorities:[["I'd like the least expensive option.","सकेसम्म सस्तो विकल्प चाहिन्छ।","budget"],
   ["A convenient time matters more.","सुविधाजनक समय महत्त्वपूर्ण छ।","time"],
   ["I need to know the requirements first.","पहिले यात्रा सर्त जान्नुपर्छ।","requirements"]],
  proposal:["We can compare routes, travel times and fares for your destination. Actual availability must be checked with the provider.",
   "गन्तव्यका बाटो, समय र भाडा तुलना गरौँ। वास्तविक उपलब्धता सेवा प्रदायकसँग जाँच्नुपर्छ।"],
  alternative:["Another route or departure could be more suitable. Let's compare instead of assuming it's available.","अर्को बाटो वा प्रस्थान समय उपयुक्त हुन सक्छ। उपलब्धता अनुमान नगरी तुलना गरौँ।"],
  requirement:["Confirm the route, date, actual fare, required documents and cancellation rules with the operator.","बाटो, मिति, वास्तविक भाडा, कागजात र रद्द गर्ने नियम सेवा प्रदायकसँग पुष्टि गर्नुहोस्।"],
  ready:["I'd be happy to help you with the booking details. Which date and time would you prefer?","बुकिङको विवरणमा मद्दत गर्छु। कुन मिति र समय चाहनुहुन्छ?"],
  done:["Thanks for checking the travel details with me. Have a safe journey!",
   "यात्राको विवरण बुझ्नुभएकोमा धन्यवाद। शुभ यात्रा!"]
 },
 Healthcare:{
  intro:["I understand. What would help you most at the clinic?","बुझेँ। क्लिनिकमा कुन मद्दत उपयोगी हुन्छ?"],
  priorities:[["I'd like the earliest appropriate appointment.","उपयुक्त सबैभन्दा छिटो समय चाहिन्छ।","time"],
   ["Could you explain what documents I need?","कुन कागजात चाहिन्छ बताउनुहुन्छ?","requirements"],
   ["I'd like to speak with a qualified professional.","योग्य स्वास्थ्यकर्मीसँग कुरा गर्न चाहन्छु।","professional"]],
  proposal:["I can explain the administrative process. For symptoms, medicines or treatment decisions, a qualified clinician must advise you.",
   "प्रशासनिक प्रक्रिया बुझाउन सक्छु। लक्षण, औषधि वा उपचारबारे योग्य स्वास्थ्यकर्मीले सल्लाह दिनुपर्छ।"],
  alternative:["We can ask whether another appointment type or department is appropriate; the clinic needs to confirm it.","अर्को अपोइन्टमेन्ट वा विभाग मिल्छ कि सोध्न सक्छौँ; क्लिनिकले पुष्टि गर्नुपर्छ।"],
  requirement:["Check the appointment type, available dates, required paperwork and insurance details with the clinic.","अपोइन्टमेन्टको प्रकार, खाली समय, कागजात र बीमाको विवरण क्लिनिकसँग जाँच्नुहोस्।"],
  ready:["Would you like to practice requesting an appointment or ask a clinician your medical question?","अपोइन्टमेन्ट माग्ने अभ्यास गर्ने कि चिकित्सकलाई स्वास्थ्य प्रश्न सोध्ने?"],
  done:["You're welcome. Please bring your documents, and speak with the clinician about any medical concerns. Take care!",
   "स्वागत छ। कागजात ल्याउनुहोस् र स्वास्थ्य समस्या भए चिकित्सकलाई भन्नुहोस्। स्वस्थ रहनुहोस्!"]
 },
 Work:{
  intro:["Thanks for explaining. Which outcome are you hoping for at work?","बुझाउनुभएकोमा धन्यवाद। काममा के चाहनुहुन्छ?"],
  priorities:[["I'd like a clear schedule or instructions.","स्पष्ट तालिका वा निर्देशन चाहिन्छ।","requirements"],
   ["I'd like to find a better way to do it.","यसलाई राम्रो तरिकाले गर्ने उपाय चाहिन्छ।","quality"],
   ["Could I ask a supervisor to review this?","व्यवस्थापकलाई जाँच्न भन्न सक्छु?","review"]],
  proposal:["Let's check the work schedule and policy together. I can tell you what options are available.",
   "कामको तालिका र नियम सँगै हेरौँ। उपलब्ध विकल्प बताउँछु।"],
  alternative:["We can suggest a different schedule, approach or responsible person and ask what is possible.","अर्को तालिका, तरिका वा जिम्मेवार व्यक्तिलाई अनुरोध गर्न सक्छौँ।"],
  requirement:["Explain the situation and your preferred solution, then check the actual workplace policy and approval process.","अवस्था र चाहेको समाधान बताएर वास्तविक नियम र स्वीकृतिको प्रक्रिया जाँच्नुहोस्।"],
  ready:["I understand. I'll check with the supervisor and explain what we can do.","बुझेँ। व्यवस्थापकसँग जाँचेर के गर्न मिल्छ बताउँछु।"],
  done:["Thanks for explaining your work situation. Please confirm the next step with your supervisor. Have a good day!",
   "कामको अवस्था बताउनुभएकोमा धन्यवाद। अर्को कदम व्यवस्थापकसँग पुष्टि गर्नुहोस्। शुभ दिन!"]
 },
 Services:{
  intro:["Thanks for describing your request. What matters most?","अनुरोध बताउनुभएकोमा धन्यवाद। के महत्त्वपूर्ण छ?"],
  priorities:[["I'd like an estimate of the cost.","खर्चको अनुमान चाहिन्छ।","budget"],
   ["I'd like the soonest available service.","सकेसम्म छिटो सेवा चाहिन्छ।","time"],
   ["Please explain the service conditions.","सेवाका सर्त बुझाउनुहोस्।","requirements"]],
  proposal:["Let's check what's required for this service, including the charges and whether an appointment is needed.",
   "यो सेवाका कागजात, शुल्क र अपोइन्टमेन्ट आवश्यक छ कि जाँचौँ।"],
  alternative:["If that isn't suitable, we can discuss a different appointment or available service level.","यो मिलेन भने अर्को समय वा सेवाको स्तरबारे सोधौँ।"],
  requirement:["Ask for the official instructions, written estimate and any cancellation conditions before agreeing.","सहमति दिनुअघि आधिकारिक निर्देशन, लिखित खर्च र रद्द गर्ने नियम माग्नुहोस्।"],
  ready:["I can explain the next steps and help you find the right person to handle your request.","अर्को प्रक्रिया बुझाएर सही कर्मचारीकहाँ पठाउन सक्छु।"],
  done:["Thanks for explaining what you need. Let us know if you have any more questions. Goodbye!",
   "आवश्यकता बताउनुभएकोमा धन्यवाद। अरू प्रश्न भए भन्नुहोस्। बिदा!"]
 },
 Home:{
  intro:["Thanks. What is the main concern with your home?","धन्यवाद। घरमा मुख्य चिन्ता के हो?"],
  priorities:[["I need an affordable solution.","सस्तो समाधान चाहिन्छ।","budget"],
   ["I'd like the problem checked soon.","समस्या चाँडै जाँच्न चाहन्छु।","time"],
   ["I want to understand the repair process.","मर्मतको प्रक्रिया बुझ्न चाहन्छु।","requirements"]],
  proposal:["We should understand the issue before discussing a possible repair, estimated cost or visit.",
   "मर्मत, खर्च वा समयअघि समस्या स्पष्ट बुझ्नुपर्छ।"],
  alternative:["We can ask about a different repair option or appointment, depending on the actual problem.","समस्या अनुसार अर्को मर्मत उपाय वा अपोइन्टमेन्टबारे सोध्न सक्छौँ।"],
  requirement:["Describe the problem and ask for a written estimate and authorization process before any work.","मर्मतअघि समस्या बताएर लिखित खर्च र स्वीकृति प्रक्रिया माग्नुहोस्।"],
  ready:["Let's look at the available appointment times for someone to inspect the problem.","समस्या जाँच्न आउने कर्मचारीको उपलब्ध समय हेरौँ।"],
  done:["Thanks for reporting the issue. Please confirm the repair arrangement with the provider. Goodbye!",
   "समस्या बताउनुभएकोमा धन्यवाद। मर्मत व्यवस्था सेवा प्रदायकसँग पुष्टि गर्नुहोस्। बिदा!"]
 },
 Technology:{
  intro:["Let's narrow down the technology problem. What would you prefer?","प्रविधिको समस्या स्पष्ट गरौँ। के चाहनुहुन्छ?"],
  priorities:[["I'd like a simple fix first.","पहिले सजिलो समाधान चाहिन्छ।","quick"],
   ["I want to protect my files and account.","फाइल र खाता सुरक्षित राख्न चाहन्छु।","security"],
   ["Could a technician diagnose this?","प्राविधिकले जाँच्न सक्छन्?","professional"]],
  proposal:["We can start with safe troubleshooting. Don't share passwords or codes, and back up important data before risky changes.",
   "सुरक्षित जाँचबाट सुरु गरौँ। पासवर्ड वा कोड नदिनुहोस्; जोखिमपूर्ण परिवर्तनअघि डाटा सुरक्षित राख्नुहोस्।"],
  alternative:["We could try a different safe diagnostic step or consult the device maker's official support.","अर्को सुरक्षित जाँच वा निर्माताको आधिकारिक सहायता लिन सक्छौँ।"],
  requirement:["Check the exact model, symptoms, official instructions and data-backup status before repair.","मर्मतअघि मोडेल, समस्या, आधिकारिक निर्देशन र ब्याकअप जाँच्नुहोस्।"],
  ready:["Tell me what happened, and we'll go through a few safe checks together.","के भयो बताउनुहोस्, अनि केही सुरक्षित जाँच सँगै गरौँ।"],
  done:["I hope that helped. Keep your data safe, and contact official support if the problem continues. Goodbye!",
   "मद्दत भएको आशा छ। डाटा सुरक्षित राख्नुहोस् र समस्या जारी रहे आधिकारिक सहायता लिनुहोस्। बिदा!"]
 },
 Money:{
  intro:["I can explain the procedure. What's most important before proceeding?","प्रक्रिया बुझाउन सक्छु। अघि बढ्नुअघि के महत्त्वपूर्ण छ?"],
  priorities:[["I'd like to understand the fees.","शुल्क बुझ्न चाहन्छु।","budget"],
   ["I need to know the required steps.","चाहिने चरणहरू जान्नुपर्छ।","requirements"],
   ["I'd like to verify everything securely.","सबै कुरा सुरक्षित रूपमा पुष्टि गर्न चाहन्छु।","security"]],
  proposal:["Please use the official bank or provider process. We can discuss general fees and instructions, but never share a PIN, password or OTP here.",
   "आधिकारिक बैंक वा सेवा प्रक्रिया अपनाउनुहोस्। शुल्क र निर्देशन बुझौँ, तर यहाँ पिन, पासवर्ड वा ओटीपी नदिनुहोस्।"],
  alternative:["We could discuss another supported service or transfer method after checking the official fees and rules.","आधिकारिक शुल्क र नियम जाँचेर अर्को उपलब्ध सेवा वा तरिकाबारे कुरा गरौँ।"],
  requirement:["Verify identification requirements, account details and any limits through the institution's secure channels.","पहिचान, खाता विवरण र सीमा संस्थाको सुरक्षित माध्यमबाट पुष्टि गर्नुहोस्।"],
  ready:["Certainly. I'll explain the steps and what identification we'll need.","अवश्य। प्रक्रिया र चाहिने परिचयपत्र बताउँछु।"],
  done:["Thanks for checking the details. Please complete any real transaction only through official secure channels.",
   "विवरण जाँच्नुभएकोमा धन्यवाद। वास्तविक कारोबार आधिकारिक सुरक्षित माध्यमबाट मात्र गर्नुहोस्।"]
 },
 Education:{
  intro:["Let's make your learning request specific. How would you like to work on it?","सिक्ने अनुरोध स्पष्ट गरौँ। कसरी अभ्यास गर्ने?"],
  priorities:[["Could we try a simple example?","सजिलो उदाहरणबाट सुरु गर्ने?","quick"],
   ["I'd like a more detailed explanation.","विस्तृत व्याख्या चाहिन्छ।","quality"],
   ["Could you explain the requirements or deadline?","आवश्यकता वा अन्तिम मिति बुझाउनुहुन्छ?","requirements"]],
  proposal:["We can review the instructions, use one clear example and then practice a similar task together.",
   "निर्देशन हेरेर एउटा उदाहरण र त्यससँग मिल्ने अभ्यास गरौँ।"],
  alternative:["We can try an easier exercise, or break the problem into smaller steps.","सजिलो अभ्यास गर्न वा समस्यालाई साना चरणमा बाँड्न सक्छौँ।"],
  requirement:["Check your specific assignment or admission requirements; don't assume a deadline or result.","आफ्नो गृहकार्य वा भर्नाको नियम जाँच्नुहोस्; मिति वा नतिजा अनुमान नगर्नुहोस्।"],
  ready:["Let's decide which example to practice and how to check the answer.","कुन उदाहरण अभ्यास गर्ने र उत्तर कसरी जाँच्ने तय गरौँ।"],
  done:["Good work asking questions! Keep practicing, and ask your teacher when you need more help. See you!",
   "राम्रो प्रश्न सोध्नुभयो! अभ्यास गर्नुहोस् र आवश्यक भए शिक्षकलाई सोध्नुहोस्। फेरि भेटौँ!"]
 },
 Everyday:{
  intro:["That's interesting. How would you like this conversation to continue?","रमाइलो कुरा! कुराकानी कसरी अघि बढाउने?"],
  priorities:[["I'd like to hear your opinion.","तपाईंको विचार सुन्न चाहन्छु।","listen"],
   ["Can I tell you more about myself?","आफूबारे थप भन्न सक्छु?","share"],
   ["Could we make a plan together?","सँगै योजना बनाउने?","plan"]],
  proposal:["I'd enjoy hearing more. We can share our views and ask each other questions instead of rushing to a conclusion.",
   "थप सुन्न रमाइलो लाग्छ। तुरुन्त निष्कर्ष निकाल्नुभन्दा विचार बाँडेर प्रश्न सोधौँ।"],
  alternative:["We can talk about a different interest if you prefer. What sounds fun to you?","चाहनुहुन्छ भने अर्को रुचिबारे कुरा गरौँ। के मन पर्छ?"],
  requirement:["Listen to what the other person says and ask a polite follow-up question that relates to it.","अर्काको कुरा सुनेर सम्बन्धित सभ्य प्रश्न सोध्नुहोस्।"],
  ready:["That sounds nice. Let's agree on what we both want, without assuming the other person's answer.","राम्रो लाग्यो। अर्काको उत्तर अनुमान नगरी दुवैको चाहना बुझौँ।"],
  done:["It was lovely talking with you. Thanks for sharing! See you again soon!",
   "तपाईंसँग कुरा गर्न रमाइलो लाग्यो। विचार बाँड्नुभएकोमा धन्यवाद! फेरि भेटौँला!"]
 },
 Family:{
  intro:["I see. What would you like your family to understand or decide together?","बुझेँ। परिवारसँग के बुझ्न वा तय गर्न चाहनुहुन्छ?"],
  priorities:[["I'd like to hear everyone's ideas.","सबैको विचार सुन्न चाहन्छु।","listen"],
   ["I'd like to explain my preference.","आफ्नो रोजाइ बताउन चाहन्छु।","share"],
   ["Can we find a convenient time?","सबैलाई मिल्ने समय खोजौँ?","plan"]],
  proposal:["Let's listen to everyone's preferences and find a plan that works for the people involved.",
   "सबैको रुचि सुनेर सम्बन्धितलाई मिल्ने योजना बनाऔँ।"],
  alternative:["We can find another date or arrangement that works better for everyone.","सबैलाई मिल्ने अर्को मिति वा व्यवस्था खोज्न सक्छौँ।"],
  requirement:["Ask the people involved for their availability and responsibilities before making commitments.","वाचा गर्नुअघि सम्बन्धितलाई समय र जिम्मेवारी सोध्नुहोस्।"],
  ready:["We can make a tentative plan, then ask the others to confirm before treating it as final.","अस्थायी योजना बनाएर अन्तिम गर्नुअघि अरूलाई पुष्टि गर्न भनौँ।"],
  done:["Thanks for talking this through. I hope your family finds a plan that works. Talk again soon!",
   "कुराकानीका लागि धन्यवाद। सबैलाई मिल्ने योजना बनोस्। फेरि कुरा गरौँला!"]
 },
 Community:{
  intro:["Thanks for your interest. What matters most about joining or visiting?","रुचिका लागि धन्यवाद। सहभागी हुन के महत्त्वपूर्ण छ?"],
  priorities:[["I'd like to know the time and location.","समय र ठाउँ जान्न चाहन्छु।","time"],
   ["Are there fees or requirements?","शुल्क वा सर्त छन्?","requirements"],
   ["What activities are available?","के गतिविधि उपलब्ध छन्?","quality"]],
  proposal:["We can ask the organizer for current times, registration details and accessibility rather than assume availability.",
   "समय, दर्ता र पहुँच आयोजकसँग सोधौँ; उपलब्धता अनुमान नगरौँ।"],
  alternative:["We could check another activity or session if this one doesn't work for you.","यो नमिले अर्को गतिविधि वा सत्र जाँच्न सक्छौँ।"],
  requirement:["Check official event information, registration rules and current hours before attending.","जानुअघि आधिकारिक सूचना, दर्ता नियम र हालको समय जाँच्नुहोस्।"],
  ready:["I can show you how to sign up and explain the next steps.","दर्ता कसरी गर्ने र अर्को कदम बुझाउन सक्छु।"],
  done:["Thanks for your interest! Please check the event details before visiting. Hope to see you there!",
   "रुचिका लागि धन्यवाद! जानुअघि कार्यक्रमको विवरण जाँच्नुहोस्। त्यहाँ भेटौँला!"]
 }
};
const shoppingHelp=new Set([
 "compare-prices","ask-discount","checkout-payment","self-checkout",
 "return-electronics","warranty-question","pick-up-order","custom-tailoring"
]);
const foodHelp=new Set([
 "ask-menu-allergy","split-restaurant-bill","wrong-food-order","grocery-expiry"
]);
const travelHelp=new Set([
 "rideshare-pickup","missed-bus","airport-baggage","airport-security",
 "flight-delay","hotel-room-problem","hotel-checkout","car-gas-station",
 "roadside-assistance","tourist-information","border-customs"
]);
const alternateService={
 shopping:{
  intro:["Thanks for explaining the store question. What would you like help resolving first?",
   "पसलको प्रश्न बताउनुभएकोमा धन्यवाद। पहिले के समाधान चाहिन्छ?"],
  priorities:[["Please help me check the receipt, price or order details.","रसिद, मूल्य वा अर्डर विवरण जाँच्न मद्दत गर्नुहोस्।","requirements"],
   ["I'd like to understand the store policy.","पसलको नियम बुझ्न चाहन्छु।","quality"],
   ["Could someone help resolve this issue?","समस्या समाधान गर्न कसैले मद्दत गर्नुहुन्छ?","review"]],
  proposal:["Let's check the relevant order, item or store policy instead of assuming a purchase or refund is already approved.",
   "पहिले अर्डर, सामान वा नियम जाँचौँ; खरिद वा पैसा फिर्ता स्वीकृत भएको अनुमान नगरौँ।"],
  alternative:["A supervisor or a different service option may help. We can ask without promising an exception.",
   "व्यवस्थापक वा अर्को सेवाको विकल्प उपयोगी हुन सक्छ। अपवादको ग्यारेन्टी छैन।"],
  requirement:["Verify the receipt or order, relevant dates, item condition and the store's written terms.",
   "रसिद वा अर्डर, मिति, सामानको अवस्था र पसलका लिखित नियम जाँच्नुहोस्।"],
  ready:["Let's look at the details and see what options the store can offer.",
   "विवरण जाँचेर पसलले के विकल्प दिन सक्छ हेरौँ।"],
  done:["Thank you for explaining the issue. We'll need the actual store's decision before promising any result. Goodbye!",
   "समस्या बताउनुभएकोमा धन्यवाद। नतिजाको वाचाअघि वास्तविक पसलको निर्णय चाहिन्छ। बिदा!"]
 },
 food:{
  intro:["I understand your concern about the meal or service. What should we check first?",
   "खाना वा सेवाको चिन्ता बुझेँ। पहिले के जाँच्ने?"],
  priorities:[["Could you check the order or bill details?","अर्डर वा बिलको विवरण जाँच्नुहुन्छ?","requirements"],
   ["I'd like staff to check the ingredients or issue.","कर्मचारीले सामग्री वा समस्या जाँचून्।","quality"],
   ["Could a manager help if needed?","आवश्यक भए व्यवस्थापकले मद्दत गर्नुहुन्छ?","review"]],
  proposal:["Let's review the actual order, bill or ingredients with staff before deciding on a correction. We shouldn't claim anything is safe without verification.",
   "सुधारको निर्णयअघि कर्मचारीसँग अर्डर, बिल वा सामग्री जाँचौँ। पुष्टि नगरी खाना सुरक्षित छ भन्न मिल्दैन।"],
  alternative:["We can ask about a corrected order, another menu option or a manager review depending on the issue.",
   "समस्याअनुसार अर्डर सच्याउने, अर्को खाना वा व्यवस्थापकसँग जाँच्ने सोधौँ।"],
  requirement:["Ask staff to confirm the exact order, itemized bill or ingredients and the restaurant's applicable rules.",
   "कर्मचारीसँग अर्डर, विस्तृत बिल वा सामग्री र सम्बन्धित नियम पुष्टि गर्नुहोस्।"],
  ready:["We can rehearse how to explain the problem politely. No meal, refund or change has actually been processed.",
   "सभ्य तरिकाले समस्या बताउने अभ्यास गरौँ। वास्तविक खाना, पैसा फिर्ता वा परिवर्तन गरिएको छैन।"],
  done:["Thanks for explaining your concern. The restaurant staff would need to verify and resolve the real issue. Take care!",
   "चिन्ता बताउनुभएकोमा धन्यवाद। वास्तविक समस्या कर्मचारीले जाँचेर समाधान गर्नुपर्छ। शुभ दिन!"]
 },
 travel:{
  intro:["Thanks for describing the travel issue. What's the most important concern?",
   "यात्राको समस्या बताउनुभएकोमा धन्यवाद। मुख्य चिन्ता के हो?"],
  priorities:[["I need help finding the correct desk or process.","सही काउन्टर वा प्रक्रिया खोज्न चाहिन्छ।","requirements"],
   ["I'd like an update or alternative solution.","अवस्था वा अर्को समाधान चाहिन्छ।","quality"],
   ["Can staff check this urgently?","कर्मचारीले छिटो जाँच्न सक्छन्?","time"]],
  proposal:["Let's check the actual ticket, booking, baggage record or service policy relevant to the issue. A solution cannot be guaranteed until the provider reviews it.",
   "समस्यासँग सम्बन्धित टिकट, बुकिङ, सामान रेकर्ड वा सेवा नियम जाँचौँ। प्रदायकको निर्णयअघि समाधान पक्का छैन।"],
  alternative:["We can ask about a different route, counter, report or service option depending on the problem.",
   "समस्याअनुसार अर्को बाटो, काउन्टर, रिपोर्ट वा सेवा विकल्पबारे सोध्न सक्छौँ।"],
  requirement:["Confirm the reference number if available, travel date, official policy and correct provider contact. Do not share sensitive details in public.",
   "उपलब्ध भए रिफरेन्स नम्बर, यात्रा मिति, आधिकारिक नियम र सही सम्पर्क पुष्टि गर्नुहोस्। निजी विवरण सार्वजनिक नगर्नुहोस्।"],
  ready:["I'll help you find the right desk and explain the next steps.",
   "सही कर्मचारीसँग अवस्था वा समाधान सोध्ने अभ्यास गरौँ; टिकट, क्षतिपूर्ति वा पुनःबुकिङ स्वीकृत भएको छैन।"],
  done:["Thank you for explaining. Please follow up with the actual operator to confirm the next step. Safe travels!",
   "समस्या बताउनुभएकोमा धन्यवाद। अर्को कदम वास्तविक सेवा प्रदायकसँग पुष्टि गर्नुहोस्। शुभ यात्रा!"]
 }
};
const reservationHelp={
 intro:["Of course. Are you hoping to reserve a table or just find out what's available?",
  "अवश्य। टेबल बुक गर्न चाहनुहुन्छ कि उपलब्धता मात्र सोध्ने?"],
 priorities:[["Could you check a table for my group?","मेरो समूहका लागि टेबल जाँच्नुहुन्छ?","requirements"],
  ["Could we look at another time?","अर्को समय हेर्ने?","time"],
  ["I'd like to know the reservation policy.","बुकिङको नियम बुझ्न चाहन्छु।","quality"]],
 proposal:["We'll need the party size, date and preferred time before the host can check the restaurant's actual availability. A table has not been reserved.",
  "रेस्टुरेन्टमा उपलब्धता जाँच्न मानिसको संख्या, मिति र समय चाहिन्छ। टेबल बुक भएको छैन।"],
 alternative:["We can ask about another time or seating arrangement, but the host must verify availability first.",
  "अर्को समय वा बस्ने ठाउँ सोध्न सक्छौँ, तर कर्मचारीले उपलब्धता पुष्टि गर्नुपर्छ।"],
 requirement:["Confirm the number of guests, local date, preferred time, seating and any cancellation rules with the restaurant.",
  "रेस्टुरेन्टसँग मानिसको संख्या, मिति, समय, बस्ने ठाउँ र रद्द गर्ने नियम पुष्टि गर्नुहोस्।"],
 ready:["Let's practice asking the host for a table. We can't promise a real booking here.",
  "होस्टसँग टेबल माग्ने अभ्यास गरौँ। यहाँ वास्तविक बुकिङको वाचा गर्न सकिँदैन।"],
 done:["Thank you for asking. The restaurant must confirm a table before you rely on a reservation. Have a lovely meal!",
  "सोध्नुभएकोमा धन्यवाद। रेस्टुरेन्टले पुष्टि नगरेसम्म बुकिङ पक्का मान्नु हुँदैन। शुभ भोजन!"]
};
const interviewHelp={
 intro:["Thanks for sharing your background. What would help you prepare for the interview?",
  "अनुभव बताउनुभएकोमा धन्यवाद। अन्तर्वार्ताका लागि कुन मद्दत चाहिन्छ?"],
 priorities:[["I'd like to practice answering honestly.","साँचो उत्तर दिने अभ्यास चाहिन्छ।","quality"],
  ["Could you explain the role or training?","काम वा तालिमबारे बुझाउनुहुन्छ?","requirements"],
  ["What happens after the interview?","अन्तर्वार्तापछि के हुन्छ?","time"]],
 proposal:["We can discuss relevant experience and prepare clear examples. Any job offer or hiring decision belongs to the employer.",
  "सम्बन्धित अनुभव र स्पष्ट उदाहरण तयार गरौँ। जागिर दिने निर्णय रोजगारदाताको हुन्छ।"],
 alternative:["Let's try a different interview question, or ask the recruiter about the role and next steps.",
  "अर्को अन्तर्वार्ता प्रश्न अभ्यास गरौँ वा भर्तीकर्तासँग कामबारे सोधौँ।"],
 requirement:["Review the job description, interview instructions and your real experience before answering.",
  "उत्तरअघि जागिरको विवरण, अन्तर्वार्ता निर्देशन र आफ्नो वास्तविक अनुभव जाँच्नुहोस्।"],
 ready:["That's a helpful answer. Could you give me a specific example from your experience?",
  "राम्रो उत्तर। आफ्नो अनुभवबाट ठोस उदाहरण दिनुहुन्छ?"],
 done:["Thank you for coming in. We'll be in touch about the next steps. Have a good day!",
  "आउनुभएकोमा धन्यवाद। अर्को चरणबारे खबर गर्छौँ। शुभ दिन!"]
};
const buyable=new Set(Object.keys(purchase));
const categoryOf=(scene)=>window.sikauMoreTopics?.find(t=>t.id===scene)?.category||
  window.sikauCoachGuidance?.old?.[scene]||"Everyday";
const cashCats=new Set(["Shopping","Food & Drink"]);
const noMoney=new Set(["Healthcare","Work","Technology","Money","Education","Everyday","Family","Community"]);
function phone(node,state,config){
  const path=config[1][state.path]||config[1][0],detail=path[4][state.detail||0]||path[4][0];
  if(state.path===2)return null; // Existing-phone support stays in the service journey.
  const offers={
   premium:{model:"iPhone 17 Pro Max",base:100000,sizes:[["256 GB",0],["512 GB",20000],["1 TB",45000]]},
   budget:{model:"Samsung Galaxy S24",base:50000,sizes:[["128 GB",0],["256 GB",7000],["512 GB",14000]]},
   basic:{model:"an entry-level smartphone",base:35000,sizes:[["128 GB",0],["256 GB",5000]]}
  };
  const offer=state.offer==="budget"?"budget":state.offer==="basic"?"basic":"premium";
  const selected=offers[offer],model=selected.model;
  const storage=selected.sizes.find(s=>s[0]===state.storage)||selected.sizes[0];
  const storageExtra=storage[1],caseFee=state.accessories==="case"||state.accessories==="both"?1500:0;
  const chargerFee=state.accessories==="charger"||state.accessories==="both"?2000:0;
  const total=selected.base+storageExtra+caseFee+chargerFee;
  const money=n=>"NPR "+n.toLocaleString("en-US");
  const rupees=n=>"रु. "+n.toLocaleString("en-US");
  const description=model+" ("+storage[0]+")"+(state.color?", "+state.color:"");
  const resetOffer=next=>({offer:next,storage:null,color:null,accessories:null,variant:null,payment:null});
  const accessoryText=state.accessories==="both"?"a case and charger":state.accessories==="case"?"a case":state.accessories==="charger"?"a charger":"no extras";
  const accessoryNe=state.accessories==="both"?"कभर र चार्जर":state.accessories==="case"?"कभर":state.accessories==="charger"?"चार्जर":"थप सामान छैन";
  if(node==="review")return r(node,
   "I see that "+detail[0].replace(/[.?!]+$/,"").toLowerCase()+" matters to you. What about battery life and your budget? Shall I show you a premium phone or an affordable one?",
   "तपाईंलाई "+detail[1]+" महत्त्वपूर्ण रहेछ। ब्याट्री र बजेट कस्तो छ? महँगो कि सस्तो फोन देखाऊँ?",[
    option("I care about the camera and battery. Show me a premium phone.","क्यामेरा र ब्याट्री राम्रो चाहिन्छ। राम्रो फोन देखाउनुहोस्।","phone-pitch",resetOffer("premium")),
    option("My budget is about NPR 50,000.","मेरो बजेट करिब रु. ५०,००० छ।","phone-pitch",resetOffer("budget")),
    option("I'd like to compare both prices first.","पहिले दुवैको मूल्य तुलना गर्न चाहन्छु।","phone-pitch",resetOffer("premium")),
    option("I'm only looking today, thank you.","अहिले हेर्न मात्र आएको हुँ, धन्यवाद।","closing",{})
   ]);
  if(node==="phone-pitch"||node==="phone-budget")return r(node,
   "I'd recommend the "+model+". The "+selected.sizes[0][0]+" version is "+money(selected.base)+". Does that suit your budget?",
   "म "+model+" सिफारिस गर्छु। "+selected.sizes[0][0]+" को मूल्य "+rupees(selected.base)+" हो। बजेट मिल्छ?",[
    option(offer==="basic"?"It's still too expensive. I'll come back later.":"That's too expensive. Do you have anything cheaper?",
      offer==="basic"?"अझै महँगो छ। पछि आउँछु।":"अलि महँगो भयो। सस्तो फोन छ?",offer==="basic"?"closing":"phone-pitch",resetOffer(offer==="premium"?"budget":"basic")),
    option("Can I compare the camera and battery first?","पहिले क्यामेरा र ब्याट्री तुलना गर्न सक्छु?","phone-demo",{}),
    option("That price is okay. What storage and colors do you have?","मूल्य ठीक छ। कुन स्टोरेज र रङ छन्?","phone-options",{}),
    option("Thanks, I don't want to buy today.","धन्यवाद, आज किन्न चाहन्नँ।","closing",{})
   ]);
  if(node==="phone-demo")return r(node,
   "Let's compare the camera, battery, storage and warranty. Which would you like to do next?",
   "क्यामेरा, ब्याट्री, स्टोरेज र वारेन्टी तुलना गरौँ। अब के गर्न चाहनुहुन्छ?",[
    option("This model sounds good. Show me the storage options.","यो फोन ठीक लाग्यो। स्टोरेज देखाउनुहोस्।","phone-storage",{}),
    option("Could you show me a more affordable model?","सस्तो फोन पनि देखाउनुहोस्।","phone-pitch",resetOffer("budget")),
    option("What does the warranty cover?","वारेन्टीमा के के पर्छ?","phone-warranty",{}),
    option("I'll think about it. Thank you.","सोचेर निर्णय गर्छु। धन्यवाद।","closing",{})
   ]);
  if(node==="phone-warranty")return r(node,
   "The standard warranty usually covers manufacturing faults, not accidental damage. Would you like to choose storage or compare another phone?",
   "सामान्य वारेन्टीमा प्रायः उत्पादन त्रुटि समेटिन्छ, दुर्घटनाको क्षति होइन। स्टोरेज छान्ने कि अर्को फोन हेर्ने?",[
    option("Let's look at the storage options.","स्टोरेजका विकल्प हेरौँ।","phone-storage",{}),
    option("Show me the cheaper model, please.","सस्तो फोन देखाउनुहोस्।","phone-pitch",resetOffer("budget")),
    option("I'd rather wait for now.","अहिलेलाई पर्खन्छु।","closing",{})
   ]);
  if(node==="phone-options")return r(node,
   "For the "+model+", the "+selected.sizes[0][0]+" version starts at "+money(selected.base)+". More storage costs extra, but changing the color doesn't. What would you prefer?",
   model+" को "+selected.sizes[0][0]+" मूल्य "+rupees(selected.base)+" बाट सुरु हुन्छ। बढी स्टोरेजको थप मूल्य छ, तर रङ बदल्दा छैन। के चाहनुहुन्छ?",[
    option("The standard "+selected.sizes[0][0]+" is enough for me.","सामान्य "+selected.sizes[0][0]+" नै पुग्छ।","phone-quote",{storage:selected.sizes[0][0],variant:null}),
    option("I'd like more storage. How much would it cost?","मलाई बढी स्टोरेज चाहिन्छ। कति पर्छ?","phone-storage",{}),
    option("Could I choose a different color?","अर्को रङ छान्न सक्छु?","phone-color",{}),
    option("Do you have a case or charger?","कभर वा चार्जर छ?","phone-accessory",{}),
    option("Actually, could you show me a cheaper phone?","बरु सस्तो फोन देखाउनुहोस्।","phone-pitch",resetOffer("budget"))
   ]);
  if(node==="phone-storage")return r(node,
   "Of course! The "+model+" comes in these storage options. More storage changes the price. Which one works for you?",
   "अवश्य! "+model+" का यी स्टोरेज विकल्प छन्। बढी स्टोरेजमा मूल्य बढ्छ। कुन चाहनुहुन्छ?",
   [...selected.sizes.map(s=>option(
      "I'd like "+s[0]+" for "+money(selected.base+s[1])+".",
      "मलाई "+s[0]+" चाहिन्छ, मूल्य "+rupees(selected.base+s[1])+"।",
      "phone-quote",{storage:s[0],variant:null})),
    option("That's too much. Can we compare a cheaper phone?","धेरै महँगो भयो। सस्तो फोन तुलना गरौँ।","phone-pitch",resetOffer("budget"))
   ]);
  if(node==="phone-color")return r(node,
   "Sure! You can choose a color without changing the price. Which color do you prefer?",
   "अवश्य! रङ परिवर्तन गर्दा मूल्य उस्तै हुन्छ। कुन रङ मन पर्छ?",[
    option("Black, please.","कालो रङ दिनुहोस्।","phone-quote",{color:"Black"}),
    option("Blue, please.","निलो रङ दिनुहोस्।","phone-quote",{color:"Blue"}),
    option("Silver, please.","चाँदी रङ दिनुहोस्।","phone-quote",{color:"Silver"}),
    option("I'd rather choose the storage first.","बरु पहिले स्टोरेज छान्छु।","phone-storage",{})
   ]);
  if(node==="phone-accessory")return r(node,
   "A case would add "+money(1500)+" and a charger "+money(2000)+". You can also buy just the phone. What would you like?",
   "कभरको थप "+rupees(1500)+" र चार्जरको थप "+rupees(2000)+" पर्छ। फोन मात्र पनि किन्न सक्नुहुन्छ। के चाहनुहुन्छ?",[
    option("Just the phone, please.","फोन मात्र दिनुहोस्।","phone-quote",{accessories:"none"}),
    option("Please add a case.","कभर पनि थप्नुहोस्।","phone-quote",{accessories:"case"}),
    option("Please add a charger.","चार्जर पनि थप्नुहोस्।","phone-quote",{accessories:"charger"}),
    option("I'd like both the case and charger.","कभर र चार्जर दुवै चाहिन्छ।","phone-quote",{accessories:"both"})
   ]);
  if(node==="phone-quote")return r(node,
   "Let's check your choice: "+description+" — phone "+money(selected.base)+
     (storageExtra?", extra storage +"+money(storageExtra):"")+
     (caseFee?", case +"+money(caseFee):"")+
     (chargerFee?", charger +"+money(chargerFee):"")+
     ". Total: "+money(total)+". Is that okay?",
   "तपाईंको छनोट: "+description+" — फोन "+rupees(selected.base)+
     (storageExtra?", बढी स्टोरेज +"+rupees(storageExtra):"")+
     (caseFee?", कभर +"+rupees(caseFee):"")+
     (chargerFee?", चार्जर +"+rupees(chargerFee):"")+
     "। जम्मा "+rupees(total)+"। यो मूल्य ठीक छ?",[
    option("Yes, that works for me. Let's pay.","ठीक छ, अब पैसा तिर्छु।","phone-checkout",{variant:null}),
    option("That's more than I want to spend. Show me the standard storage.","मेरो बजेटभन्दा बढी भयो। सामान्य स्टोरेज देखाउनुहोस्।",storage[0]===selected.sizes[0][0]?"phone-options":"phone-quote",{storage:selected.sizes[0][0],accessories:"none",variant:null}),
    option("Can we change the storage or color?","स्टोरेज वा रङ परिवर्तन गर्न सक्छौँ?","phone-options",{}),
    option("I'll think about it and come back later.","सोचेर पछि आउँछु।","closing",{})
   ]);
  // Old saved conversations may have chosen "different" without specifying
  // storage. Ask for the actual capacity instead of reusing the base price.
  if(node==="phone-checkout"&&state.variant==="different"&&!state.storage)return phone("phone-storage",state,config);
  if(node==="phone-checkout")return r(node,
   "Your "+description+" with "+accessoryText+" comes to "+money(total)+". How would you like to pay — cash, card or QR?",
   "तपाईंको "+description+" र "+accessoryNe+" गरी जम्मा "+rupees(total)+" भयो। नगद, कार्ड वा क्यूआरबाट तिर्नुहुन्छ?",[
    option("I'll pay in cash.","नगद तिर्छु।","phone-payment-info",{payment:"cash",paymentConfirmed:false}),
    option("I'll pay by debit or credit card.","डेबिट वा क्रेडिट कार्डले तिर्छु।","phone-payment-info",{payment:"card",paymentConfirmed:false}),
    option("Can I pay by QR or digital wallet?","क्यूआर वा डिजिटल वालेटबाट तिर्न मिल्छ?","phone-payment-info",{payment:"digital",paymentConfirmed:false}),
    option("Actually, I'm not ready to buy.","अहिले किन्न तयार छैन।","closing",{payment:"none",paymentConfirmed:false,decision:"later"})
   ]);
  if(node==="phone-payment-info"){
   const scripts={
    cash:["Of course, cash is accepted. The total is "+money(total)+". Please hand me the cash whenever you're ready.",
      "अवश्य, नगद तिर्न मिल्छ। जम्मा "+rupees(total)+" हो। तयार भएपछि नगद दिनुहोस्।"],
    card:["Yes, we accept debit and credit cards. The total is "+money(total)+". Please tap or insert your card and wait for approval.",
      "हो, डेबिट र क्रेडिट कार्ड चल्छ। जम्मा "+rupees(total)+" हो। कार्ड ट्याप वा हालेर स्वीकृतिको प्रतीक्षा गर्नुहोस्।"],
    digital:["Yes, you can pay by QR or a supported digital wallet. The total is "+money(total)+". Check the recipient and amount on the shop's QR before paying. Nothing has been charged yet.",
      "हो, क्यूआर वा उपलब्ध डिजिटल वालेटबाट तिर्न मिल्छ। जम्मा "+rupees(total)+" हो। तिर्नुअघि पसलको क्यूआर, प्राप्तकर्ता र रकम जाँच्नुहोस्। अहिलेसम्म पैसा काटिएको छैन।"]
   };
   const script=scripts[state.payment];
   if(!script)return phone("phone-checkout",state,config);
   const paid={
    cash:["Here is "+money(total)+" in cash.","यो "+rupees(total)+" नगद लिनुहोस्।"],
    card:["My card payment was approved. Could you check?","मेरो कार्ड भुक्तानी स्वीकृत भयो। जाँचिदिनुहुन्छ?"],
    digital:["I've sent "+money(total)+" by QR. Could you confirm it?","मैले क्यूआरबाट "+rupees(total)+" पठाएँ। पुष्टि गरिदिनुहुन्छ?"]
   }[state.payment];
   return r(node,script[0],script[1],[
    option(paid[0],paid[1],"phone-finish",{paymentConfirmed:true}),
    option("Could I pay by card instead?","बरु कार्डबाट तिर्न सक्छु?","phone-payment-info",{payment:"card",paymentConfirmed:false}),
    option("Could I pay in cash instead?","बरु नगद तिर्न सक्छु?","phone-payment-info",{payment:"cash",paymentConfirmed:false}),
    option("I'll come back and pay later.","पछि आएर तिर्छु।","closing",{payment:"none",paymentConfirmed:false,decision:"later"})
   ]);
  }
  if(node==="phone-finish"){
   // Older saved lessons also wait for explicit payment instead of assuming it.
   if(!state.paymentConfirmed)return phone(state.payment?"phone-payment-info":"phone-checkout",state,config);
   const method={cash:"cash",card:"card",digital:"QR"}[state.payment]||"";
   const methodNe={cash:"नगद",card:"कार्ड",digital:"क्यूआर"}[state.payment]||"";
   return r(node,
    "Thank you. I've confirmed your "+method+" payment of "+money(total)+" for the "+description+" with "+accessoryText+". Here's your receipt!",
    "धन्यवाद। "+methodNe+" बाट "+rupees(total)+" भुक्तानी पुष्टि भयो। "+description+" र "+accessoryNe+" को रसिद लिनुहोस्!",[
     option("Thank you. Can I keep the receipt?","धन्यवाद। रसिद लिन सक्छु?","phone-receipt",{}),
     option("Thanks for your help. Goodbye!","मद्दतका लागि धन्यवाद। बिदा!","end",{})
    ]);
  }
  if(node==="phone-receipt")return r(node,
   "Of course. Your receipt shows "+description+", "+money(total)+" and the return policy. Have a great day!",
   "अवश्य। रसिदमा "+description+", "+rupees(total)+" र फिर्ताका नियम छन्। शुभ दिन!",[
    option("Thanks! Have a nice day.","धन्यवाद! शुभ दिन।","end",{}),
    option("One more question about the warranty?","वारेन्टीबारे अर्को प्रश्न सोधूँ?","phone-warranty",{})
   ]);
  return null;
}
function build(node,state,config){
 const scene=state.scene,path=config[1][state.path]||config[1][0],detail=path[4][state.detail??0]||path[4][0];
 const specialized=scene==="buy-phone"?phone(node,state,config):null;
 if(specialized)return specialized;
 const cat=categoryOf(scene);
 const isTable=(scene==="restaurant"&&state.path===0)||scene==="reserve-restaurant";
 const isTechHelp=scene==="buy-phone"&&state.path===2;
 const set=isTable?reservationHelp:scene==="interview"?interviewHelp:
  shoppingHelp.has(scene)||isTechHelp?alternateService.shopping:
  foodHelp.has(scene)?alternateService.food:
  travelHelp.has(scene)?alternateService.travel:
  categories[cat]||categories.Everyday;
 const isIssue=shoppingHelp.has(scene)||foodHelp.has(scene)||
  travelHelp.has(scene)||isTable||isTechHelp||scene==="interview";
 const record=window.sikauNewTopicRows?.find(row=>row[0]===scene);
 const focus=record?.[7]?.split(';')?.[state.path]||detail[0].replace(/[.!?]+$/,'');
 const descriptor=focus.replace(/[.!?]+$/,'').toLowerCase();
 const target=record?record[2].toLowerCase():path[0].replace(/[.!?]+$/,'').toLowerCase();
 const prices=purchase[scene],commerce=buyable.has(scene)&&state.path!==2;
 const legacy=window.sikauLegacyFollowups?.[scene]?.[state.path]||null;
 const commercial=cashCats.has(cat)&&!isIssue,participatory=["Everyday","Family"].includes(cat);
 const quote=()=>{
  if(!commerce)return "";
  const high=state.offer!=="budget"&&state.offer!=="basic";
  const value=state.offer==="basic"?Math.round(prices[2]*0.7/100)*100:prices[high?1:2];
  return " The "+prices[0]+" costs NPR "+value.toLocaleString("en-US")+
   ".";
 };
 const quoteNe=()=>!commerce?"":" "+prices[0]+" को मूल्य रु. "+
  (state.offer==="basic"?Math.round(prices[2]*0.7/100)*100:prices[state.offer!=="budget"?1:2]).toLocaleString("en-US")+" हो।";
 if(node==='review'){
  if(legacy)return r(node,
    path[5]+" You said: “"+detail[0]+"” What would you like to check next?",
    path[6]+" तपाईंले “"+detail[1]+"” भन्नुभयो। अब के बुझ्ने?",[
     option(legacy[0],legacy[1],"proposal",{priority:"specific"}),
     option("Could you explain the requirements or conditions?","आवश्यकता वा सर्त बुझाइदिनुहुन्छ?","requirements",{}),
     option("Is there a different option we could discuss?","अर्को विकल्पबारे पनि कुरा गरौँ?","alternative",{offer:"budget"}),
     option("Thanks, that's enough information for now.","धन्यवाद, अहिलेलाई जानकारी पुग्यो।","closing",{})
    ]);
  return r(node,
   "I see. "+set.intro[0],
   "बुझेँ। "+set.intro[1],[
    ...set.priorities.map(p=>option(p[0],p[1],"proposal",{priority:p[2],offer:p[2]==="budget"?"budget":"premium"})),
    option("I'd rather explore a different option.","बरु अर्को विकल्प हेर्न चाहन्छु।","alternative",{offer:state.offer==="budget"?"basic":"budget"}),
    option("I only needed information. Thank you!","जानकारी मात्र चाहिएको थियो। धन्यवाद।","closing",{})
   ]);
 }
 if(node==='proposal'){
  if(legacy&&state.priority==="specific")return r(node,legacy[2],legacy[3],[
    option("That sounds helpful. How would we proceed?","उपयोगी लाग्यो। कसरी अघि बढ्ने?","verify",{}),
    option("Could you explain the requirements first?","पहिले आवश्यकता बुझाइदिनुहुन्छ?","requirements",{}),
    option("What other choices might work?","अरू कुन विकल्प मिल्न सक्छ?","alternative",{}),
    option("I'll think about it. Thank you.","सोचेर निर्णय गर्छु। धन्यवाद।","closing",{})
   ]);
  const name=state.priority==="budget"?"price":state.priority==="quality"?"quality":state.priority||"needs";
  const nameNe={budget:"मूल्य",quality:"गुणस्तर",fit:"आवश्यकता",quick:"समय",time:"समय",requirements:"सर्त",security:"सुरक्षा",professional:"विशेषज्ञ सहायता",review:"जाँच",share:"विचार",listen:"अरूको विचार",plan:"योजना",specific:"विशेष अनुरोध"}[state.priority]||"आवश्यकता";
  return r(node,
   "I see. Your main priority is "+name+". "+set.proposal[0]+quote(),
   "बुझेँ। तपाईंका लागि "+nameNe+" महत्त्वपूर्ण रहेछ। "+set.proposal[1]+quoteNe(),[
    option(commercial?"That sounds good. What should we confirm first?":"That sounds reasonable. What is the next step?",
      commercial?"राम्रो लाग्यो। पहिले के पुष्टि गर्ने?":"ठीक लाग्यो। अर्को कदम के हो?","verify",{}),
    option(commercial?"It's too expensive or doesn't suit me. Is there an alternative?":
      "That option doesn't work for me. What else could we try?",
      commercial?"यो महँगो वा नमिल्ने रहेछ। अर्को विकल्प छ?":"यो विकल्प मिलेन। अर्को उपाय छ?","alternative",{offer:"budget"}),
    option("Could you explain the details or conditions first?","पहिले विवरण वा सर्त बुझाइदिनुहुन्छ?","requirements",{}),
    option("Thanks, I'll decide later.","धन्यवाद, पछि निर्णय गर्छु।","closing",{})
   ]);
 }
 if(node==='alternative')return r(node,
  set.alternative[0]+(commerce?" Here's a more affordable option."+quote():""),
  set.alternative[1]+(commerce?quoteNe():""),[
   option("That alternative sounds better. Let's continue.","त्यो विकल्प राम्रो लाग्यो। अघि बढौँ।","verify",{}),
   option("Could I compare it with the first choice?","पहिलो विकल्पसँग तुलना गर्न सक्छु?","proposal",{offer:"premium"}),
   option("I'd prefer to stop here. Thank you.","अहिलेलाई यति नै। धन्यवाद।","closing",{})
  ]);
 if(node==='requirements')return r(node,
  set.requirement[0],set.requirement[1],[
   option("Thanks. I'd like to continue if everything is suitable.","धन्यवाद। सबै कुरा मिल्यो भने अघि बढ्छु।","verify",{}),
   option("Can we try another option?","अर्को विकल्प हेरौँ?","alternative",{offer:"budget"}),
   option("I need to think about it.","यसमा सोच्न चाहन्छु।","closing",{})
  ]);
 if(node==='verify')return r(node,
  "Before going ahead with "+target+", "+set.requirement[0]+" "+set.ready[0],
  target+" बारे अघि बढ्नुअघि, "+set.requirement[1]+" "+set.ready[1],[
   option(participatory?"Let's discuss a simple plan together.":"Yes, let's go ahead with the next step.",
     participatory?"सँगै सरल योजना बनाऔँ।":"हुन्छ, अर्को कदममा अघि बढौँ।",
     commercial?"checkout":"action",{}),
   option("Could you remind me of the requirements?","आवश्यकता फेरि सम्झाउनुहुन्छ?","requirements",{}),
   option("I want a different option after all.","बरु अर्को विकल्प चाहिन्छ।","alternative",{offer:"budget"}),
   option("Thanks. I won't proceed today.","धन्यवाद। आज अघि बढ्दिनँ।","closing",{})
  ]);
 if(node==='action')return r(node,set.ready[0]+" Would you like me to explain anything else?",
  set.ready[1]+" अरू केही बुझाइदिऊँ?",[
   option("That approach works. Thanks for explaining.","त्यो तरिका मिल्यो। बुझाइदिनुभएकोमा धन्यवाद।","confirmation",{decision:"agreed"}),
   option("Could we try a different approach?","अर्को तरिका हेरौँ?","alternative",{}),
   option("Can we check the requirements again?","आवश्यकता फेरि जाँचौँ?","requirements",{})
  ]);
 if(node==='checkout'){
  if(!commercial)return build("action",state,config);
  return r(node,
   "Let's go over your "+target+" order. Would you prefer to pay with cash, card or QR?",
   "तपाईंको "+target+" को अर्डर हेरौँ। नगद, कार्ड वा क्यूआरमध्ये कसरी तिर्नुहुन्छ?",[
    option("I'd pay with cash.","नगद तिर्छु।","payment-guide",{payment:"cash",paymentConfirmed:false}),
    option("I'd use a debit or credit card.","डेबिट वा क्रेडिट कार्ड प्रयोग गर्छु।","payment-guide",{payment:"card",paymentConfirmed:false}),
    option("Can I use a QR or digital payment?","क्यूआर वा डिजिटल भुक्तानी मिल्छ?","payment-guide",{payment:"digital",paymentConfirmed:false}),
    option("Actually, I don't want to pay or order yet.","बरु अहिले तिर्न वा अर्डर गर्न चाहन्नँ।","closing",{decision:"later",payment:"none",paymentConfirmed:false})
   ]);
 }
 if(node==='payment-guide'){
  if(!commercial)return build("action",state,config);
  const scripts={
   cash:["Yes, cash is fine. Please hand the cashier the bill amount when you're ready.","हो, नगद तिर्न मिल्छ। तयार भएपछि क्यासियरलाई बिलको रकम दिनुहोस्।"],
   card:["Yes, debit and credit cards are accepted. Tap or insert your card and wait for approval.","हो, डेबिट र क्रेडिट कार्ड चल्छ। कार्ड ट्याप वा हालेर स्वीकृतिको प्रतीक्षा गर्नुहोस्।"],
   digital:["Yes, QR and supported digital wallets are accepted here. Check the recipient and bill amount before paying. No payment has been made yet.","हो, यहाँ क्यूआर र उपलब्ध डिजिटल वालेट चल्छ। तिर्नुअघि प्राप्तकर्ता र बिलको रकम जाँच्नुहोस्। अहिलेसम्म भुक्तानी भएको छैन।"]
  };
  const script=scripts[state.payment];
  if(!script)return build('checkout',state,config);
  const paid={
   cash:["I've handed the cashier the cash.","मैले क्यासियरलाई नगद दिएँ।"],
   card:["My card payment was approved.","मेरो कार्ड भुक्तानी स्वीकृत भयो।"],
   digital:["I've sent the QR payment. Can you confirm it?","मैले क्यूआर भुक्तानी पठाएँ। पुष्टि गरिदिनुहुन्छ?"]
  }[state.payment];
  return r(node,script[0],script[1],[
   option(paid[0],paid[1],"confirmation",{paymentConfirmed:true,decision:"agreed"}),
   option("Could I pay by card instead?","बरु कार्डबाट तिर्न मिल्छ?","payment-guide",{payment:"card",paymentConfirmed:false}),
   option("Can I pay cash instead?","बरु नगद तिर्न सक्छु?","payment-guide",{payment:"cash",paymentConfirmed:false}),
   option("I want to wait before paying.","तिर्नुअघि अलि पर्खन्छु।","closing",{decision:"later",payment:"none",paymentConfirmed:false})
  ]);
 }
 if(node==='confirmation'){
  // In-progress lessons from before this fix may have jumped here after a question.
  if(commercial&&state.payment&&!state.paymentConfirmed)return build('payment-guide',state,config);
  const ending=commerce&&state.payment&&state.paymentConfirmed?
   "Thank you. "+({cash:"I've received your cash payment.",card:"Your card payment was approved.",digital:"I've confirmed your QR payment."}[state.payment]||"Payment is complete.")+" Here's your receipt.":set.done[0];
  const endingNe=commerce&&state.payment&&state.paymentConfirmed?
   "तपाईंले "+({cash:"नगद",card:"कार्ड",digital:"क्यूआर"}[state.payment]||"आफ्नो रोजाइको माध्यम")+" बाट तिरेको रकम पुष्टि भयो। यो रसिद लिनुहोस्।":set.done[1];
  return r(node,ending+" Thank you for talking with me!",endingNe+" कुराकानीका लागि धन्यवाद!",[
   option("Thank you. Have a nice day!","धन्यवाद। शुभ दिन!","end",{}),
   option("Could you explain the next steps again?","अर्को कदम फेरि बुझाउनुहुन्छ?","requirements",{})
  ]);
 }
 if(node==='closing')return r(node,
  state.decision==="later"?"No problem. You're welcome to come back whenever you're ready. "+set.done[0]:set.done[0],
  state.decision==="later"?"ठीक छ। तयार भएपछि फेरि आउनुहोस्। "+set.done[1]:set.done[1],[
   option("Thanks. Goodbye!","धन्यवाद। बिदा!","end",{}),
   option("Can we discuss something else?","अर्को कुरा गरौँ?","opening",{priority:"",offer:""})
  ]);
 return null;
}
window.sikauCoachJourneys=Object.freeze({build,phone,categories,purchase,categoryOf});
})();
