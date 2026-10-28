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
  proposal:["Based on that, I'd show you the relevant options and compare their details. This is a practice store, so we'll check any actual price and availability before buying.",
   "त्यसअनुसार मिल्ने सामान र विशेषता तुलना गरौँ। यो अभ्यास पसल हो; किन्नुअघि वास्तविक मूल्य र उपलब्धता पुष्टि गर्नुपर्छ।"],
  alternative:["Let's consider another option that better fits your needs. Would you like to compare it?","तपाईंको आवश्यकतामा मिल्ने अर्को विकल्प हेरौँ। तुलना गर्ने?"],
  requirement:["Check the actual price, stock, size or model, and return policy before paying.","तिर्नुअघि वास्तविक मूल्य, स्टक, साइज वा मोडेल र फिर्ता नियम जाँच्नुहोस्।"],
  ready:["The item looks suitable in this practice story. Would you like to discuss payment?","यो अभ्यासमा सामान मिल्ने देखियो। भुक्तानीबारे कुरा गरौँ?"],
  done:["This is the end of the sample checkout. No real item was purchased or charged. Thank you for shopping with us!",
   "यो अभ्यास खरिदको अन्त्य हो। वास्तविक सामान किनिएको वा पैसा काटिएको छैन। आउनुभएकोमा धन्यवाद!"]
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
  ready:["Let's review the order and discuss how you'd pay at the counter in this fictional scene.","यो काल्पनिक अभ्यासमा अर्डर र काउन्टरमा भुक्तानीबारे कुरा गरौँ।"],
  done:["Your practice order is complete; no food was actually prepared or paid for. Enjoy your meal!",
   "अभ्यास अर्डर पूरा भयो; वास्तविक खाना तयार भएको वा पैसा तिरिएको छैन। शुभ भोजन!"]
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
  ready:["We can explain the booking steps, but we can't confirm a real reservation in this practice chat.","बुकिङको प्रक्रिया बुझाउन सक्छौँ, तर यो अभ्यासमा वास्तविक बुकिङ पुष्टि हुँदैन।"],
  done:["You've practiced how to request and review travel arrangements. No ticket or reservation was issued. Safe travels!",
   "यात्रा सोध्ने र योजना बुझ्ने अभ्यास भयो। वास्तविक टिकट वा बुकिङ भएको छैन। शुभ यात्रा!"]
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
  done:["We have discussed the clinic's process. No real appointment was booked. Please seek professional help for medical concerns.",
   "क्लिनिकको प्रक्रिया बुझ्यौँ। वास्तविक अपोइन्टमेन्ट बुक भएको छैन। स्वास्थ्य समस्या भए चिकित्सकसँग सल्लाह लिनुहोस्।"]
 },
 Work:{
  intro:["Thanks for explaining. Which outcome are you hoping for at work?","बुझाउनुभएकोमा धन्यवाद। काममा के चाहनुहुन्छ?"],
  priorities:[["I'd like a clear schedule or instructions.","स्पष्ट तालिका वा निर्देशन चाहिन्छ।","requirements"],
   ["I'd like to find a better way to do it.","यसलाई राम्रो तरिकाले गर्ने उपाय चाहिन्छ।","quality"],
   ["Could I ask a supervisor to review this?","व्यवस्थापकलाई जाँच्न भन्न सक्छु?","review"]],
  proposal:["Let's identify the relevant workplace rules and who can answer this request. The manager, not the role-play, makes any decision.",
   "सम्बन्धित कार्यस्थल नियम र जिम्मेवार व्यक्ति पहिचान गरौँ। निर्णय व्यवस्थापकले गर्छ, अभ्यासले होइन।"],
  alternative:["We can suggest a different schedule, approach or responsible person and ask what is possible.","अर्को तालिका, तरिका वा जिम्मेवार व्यक्तिलाई अनुरोध गर्न सक्छौँ।"],
  requirement:["Explain the situation and your preferred solution, then check the actual workplace policy and approval process.","अवस्था र चाहेको समाधान बताएर वास्तविक नियम र स्वीकृतिको प्रक्रिया जाँच्नुहोस्।"],
  ready:["We can rehearse a polite request to the supervisor, but nothing has been approved or changed.","व्यवस्थापकलाई सभ्य अनुरोध गर्ने अभ्यास गर्न सक्छौँ; केही स्वीकृत वा परिवर्तन भएको छैन।"],
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
  ready:["We can rehearse the request and the next step; this practice doesn't submit or approve any service.","अनुरोध र अर्को कदमको अभ्यास गरौँ; यसले वास्तविक सेवा दर्ता वा स्वीकृत गर्दैन।"],
  done:["Thank you. You have practiced making a service request. No real service was ordered. Goodbye!",
   "धन्यवाद। सेवा माग्ने अभ्यास भयो। कुनै वास्तविक सेवा अर्डर भएको छैन। बिदा!"]
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
  ready:["We can discuss scheduling a visit, but no real repair or appointment has been confirmed.","भेट्ने समयबारे छलफल गर्न सक्छौँ; वास्तविक मर्मत वा अपोइन्टमेन्ट पुष्टि भएको छैन।"],
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
  ready:["We can rehearse what to tell technical support. No device settings were changed by this practice.","प्राविधिकलाई के भन्ने अभ्यास गरौँ। यस अभ्यासले कुनै सेटिङ परिवर्तन गरेको छैन।"],
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
  ready:["We can rehearse the bank request, but no actual deposit, withdrawal or transfer will occur.","बैंकमा अनुरोध गर्ने अभ्यास गर्न सक्छौँ, तर कुनै वास्तविक जम्मा, निकासा वा ट्रान्सफर हुँदैन।"],
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
  ready:["We can practice contacting the organizer, but no participation has been registered.","आयोजकलाई सम्पर्क गर्ने अभ्यास गरौँ; वास्तविक दर्ता भएको छैन।"],
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
  ready:["We can practice requesting a review or explanation. No actual refund, exchange or account change has been approved.",
   "जाँच वा व्याख्या माग्ने अभ्यास गर्न सक्छौँ। वास्तविक पैसा फिर्ता, साट्ने वा खाता परिवर्तन स्वीकृत भएको छैन।"],
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
  ready:["We can practice asking the correct staff for a status or solution; no ticket, compensation or rebooking has been approved.",
   "सही कर्मचारीसँग अवस्था वा समाधान सोध्ने अभ्यास गरौँ; टिकट, क्षतिपूर्ति वा पुनःबुकिङ स्वीकृत भएको छैन।"],
  done:["Thank you for explaining. Please follow up with the actual operator to confirm the next step. Safe travels!",
   "समस्या बताउनुभएकोमा धन्यवाद। अर्को कदम वास्तविक सेवा प्रदायकसँग पुष्टि गर्नुहोस्। शुभ यात्रा!"]
 }
};
const buyable=new Set(Object.keys(purchase));
const categoryOf=(scene)=>window.sikauMoreTopics?.find(t=>t.id===scene)?.category||
  window.sikauCoachGuidance?.old?.[scene]||"Everyday";
const cashCats=new Set(["Shopping","Food & Drink"]);
const noMoney=new Set(["Healthcare","Work","Technology","Money","Education","Everyday","Family","Community"]);
function phone(node,state,config){
 const path=config[1][state.path]||config[1][0],detail=path[4][state.detail||0]||path[4][0];
 const buying=state.path!==2;
 if(!buying)return null; // pre-owned phone help uses the service-specific engine.
 if(node==='review'){
  return r(node,
   "I see: "+detail[0].replace(/[.?!]+$/,'').toLowerCase()+". How about battery life and your budget? Should I show you a higher-end phone or a more affordable one?",
   "तपाईंलाई "+detail[1]+" महत्त्वपूर्ण रहेछ। ब्याट्री र बजेट कस्तो छ? महँगो वा सस्तो फोन देखाऊँ?",[
    option("A strong camera and long battery life matter. Show me your recommendation.","राम्रो क्यामेरा र लामो ब्याट्री चाहिन्छ। फोन सिफारिस गर्नुहोस्।","phone-pitch",{offer:"premium",priority:"camera-battery"}),
    option("My budget is around NPR 50,000.","मेरो बजेट करिब रु. ५०,००० छ।","phone-pitch",{offer:"budget",priority:"budget"}),
    option("Camera is important, but I'd like to compare both prices.","क्यामेरा महत्त्वपूर्ण छ, तर दुवै मूल्य तुलना गर्छु।","phone-pitch",{offer:"premium",priority:"compare"}),
    option("I only wanted advice. Thanks!","मलाई सुझाव मात्र चाहिएको थियो। धन्यवाद।","closing",{})
   ]);
 }
 const premium=state.offer!=="budget"&&state.offer!=="basic";
 const model=premium?"iPhone 17 Pro Max":state.offer==="basic"?"an entry-level smartphone":"Samsung Galaxy S24";
 const price=premium?100000:state.offer==="basic"?35000:50000;
 const money="NPR "+price.toLocaleString("en-US");
 if(node==='phone-pitch'||node==='phone-budget'){
  return r(node,
   "For this fictional shop conversation, I can show you "+model+" at a SAMPLE price of "+money+". These are invented practice prices, not current Nepal retail quotes. Would you like to compare it, ask about the features, or choose it?",
   "यो काल्पनिक पसलको अभ्यासमा "+model+" को नमुना मूल्य रु. "+price.toLocaleString("en-US")+" हो। यो वास्तविक नेपाली बजारको मूल्य होइन। तुलना गर्ने, विशेषता सोध्ने कि छान्ने?",[
    option(state.offer==="basic"?"This is still above my budget. I'd rather wait.":"That's too expensive. Do you have a cheaper phone?",
    state.offer==="basic"?"यो अझै बजेटभन्दा महँगो छ। पछि आउँछु।":"त्यो धेरै महँगो छ। सस्तो फोन छ?",
    state.offer==="basic"?"closing":"phone-pitch",{offer:premium?"budget":"basic",priority:"budget"}),
    option("Could I compare the camera and battery first?","पहिले क्यामेरा र ब्याट्री तुलना गर्न सक्छु?","phone-demo",{}),
    option("That price works for me. Can we discuss the color and storage?","मूल्य ठीक लाग्यो। रङ र स्टोरेजबारे कुरा गरौँ?","phone-options",{}),
    option("I'm not ready to buy. Thanks.","अहिले किन्न तयार छैन। धन्यवाद।","closing",{})
   ]);
 }
 if(node==='phone-demo')return r(node,
  "Good question. We'd compare sample photos, battery use, storage and warranty terms on the actual models. Demo availability isn't guaranteed. Would you like to continue with this phone or see a cheaper one?",
  "राम्रो प्रश्न। वास्तविक मोडेलमा फोटो, ब्याट्री, स्टोरेज र वारेन्टी तुलना गरौँ। डेमो उपलब्धताको ग्यारेन्टी छैन। यही फोन कि सस्तो विकल्प?",[
   option("I'll choose this phone if the specifications suit me.","विशेषता मिले यही फोन छान्छु।","phone-options",{}),
   option("Please show me the more affordable option.","सस्तो विकल्प देखाइदिनुहोस्।","phone-pitch",{offer:"budget"}),
   option("Does the warranty cover accidental damage?","दुर्घटनाको क्षति वारेन्टीमा पर्छ?","phone-warranty",{}),
   option("I'll think about it and come back later.","सोचेर पछि आउँछु।","closing",{})
  ]);
 if(node==='phone-warranty')return r(node,
  "Manufacturer defects and accidental damage often have different coverage. We'll read the official warranty and optional protection terms before you decide.",
  "उत्पादन त्रुटि र दुर्घटनाले भएको क्षतिमा फरक वारेन्टी नियम हुन सक्छ। निर्णयअघि आधिकारिक सर्त हेरौँ।",[
   option("That makes sense. Let's choose the phone.","बुझेँ। फोन छानौँ।","phone-options",{}),
   option("Could we check a cheaper model instead?","बरु सस्तो मोडेल हेर्ने?","phone-pitch",{offer:"budget"}),
   option("I'd rather wait for now.","अहिलेलाई पर्खन्छु।","closing",{})
  ]);
 if(node==='phone-options')return r(node,
  "Great. We'll verify the chosen "+model+"'s actual storage, color, stock and final price before a purchase. What would you like to do?",
  "राम्रो। किन्नुअघि "+model+" को वास्तविक स्टोरेज, रङ, स्टक र अन्तिम मूल्य पुष्टि गरौँ। के गर्ने?",[
   option("I'd like the standard storage if it's available.","उपलब्ध भए सामान्य स्टोरेज चाहिन्छ।","phone-checkout",{variant:"standard"}),
   option("Could I see a different color or storage size?","अर्को रङ वा स्टोरेज हेर्न सक्छु?","phone-checkout",{variant:"different"}),
   option("Do I need a charger or case too?","चार्जर वा कभर पनि चाहिन्छ?","phone-accessory",{}),
   option("Actually, I want to reconsider the price.","बरु मूल्य फेरि सोच्न चाहन्छु।","phone-pitch",{offer:"budget"})
  ]);
 if(node==='phone-accessory')return r(node,
  "Cases and chargers vary by model. We'd verify compatibility and add-on prices rather than assume accessories are included. Would you like them?",
  "कभर र चार्जर फोनअनुसार फरक हुन्छ। साथमा आउँछ भनेर अनुमान नगरी मिल्छ कि र मूल्य जाँचौँ। चाहनुहुन्छ?",[
   option("Just the phone, please.","फोन मात्र दिनुहोस्।","phone-checkout",{accessories:"none"}),
   option("Please include a compatible case if it's affordable.","सस्तो भए मिल्ने कभर थप्नुहोस्।","phone-checkout",{accessories:"case"}),
   option("I'd rather compare another phone.","अर्को फोन तुलना गर्छु।","phone-pitch",{offer:"budget"})
  ]);
 if(node==='phone-checkout')return r(node,
  "In this role-play, your sample "+model+" quote is "+money+" before any variant, tax or accessory differences. Nothing has been charged. How would you prefer to pay in a real shop?",
  "यस अभ्यासमा "+model+" को नमुना मूल्य रु. "+price.toLocaleString("en-US")+" हो। साइज, कर र सामान अनुसार वास्तविक मूल्य फरक हुन्छ। यहाँ पैसा काटिएको छैन। वास्तविक पसलमा कसरी तिर्न चाहनुहुन्छ?",[
   option("I'll pay with cash.","नगद तिर्छु।","phone-finish",{payment:"cash"}),
   option("Can I pay with a credit or debit card?","क्रेडिट वा डेबिट कार्डले तिर्न मिल्छ?","phone-finish",{payment:"card"}),
   option("Is a QR or digital payment option available?","क्यूआर वा डिजिटल भुक्तानी मिल्छ?","phone-finish",{payment:"digital"}),
   option("I changed my mind. I won't buy it today.","मन बदलेँ। आज किन्दिनँ।","closing",{payment:"none"})
  ]);
 if(node==='phone-finish'){
  const method={cash:"cash",card:"a bank card",digital:"a QR/digital method"}[state.payment]||"your preferred method";
  return r(node,
   "In our practice checkout, you've chosen "+model+" and selected "+method+". We'd confirm the exact total, process payment securely and provide a receipt in a real store. Here, NO purchase or charge was made. Thank you for shopping with us!",
   "यो अभ्यासमा "+model+" र "+method+" रोज्नुभयो। वास्तविक पसलमा अन्तिम रकम जाँचेर सुरक्षित भुक्तानी र रसिद दिइन्छ। यहाँ कुनै सामान खरिद वा पैसा कटौती भएको छैन। धन्यवाद!",[
    option("Thank you. Could I have the receipt?","धन्यवाद। रसिद दिनुहुन्छ?","phone-receipt",{}),
    option("Thanks for your help. Goodbye!","मद्दतका लागि धन्यवाद। बिदा!","end",{})
   ]);
 }
 if(node==='phone-receipt')return r(node,
  "Of course. A real store would issue a receipt after successful payment, showing the model, amount and any return terms. This is only a practice example, so there is no actual receipt. Have a good day!",
  "अवश्य। वास्तविक भुक्तानीपछि फोन, रकम र फिर्ताका नियमसहित रसिद दिइन्छ। यो अभ्यास भएकाले वास्तविक रसिद छैन। शुभ दिन!",[
   option("Thanks! Have a nice day.","धन्यवाद! शुभ दिन।","end",{}),
   option("Can I ask one more question?","अझ एउटा प्रश्न सोध्न सक्छु?","phone-warranty",{})
  ]);
 return null;
}
function build(node,state,config){
 const scene=state.scene,path=config[1][state.path]||config[1][0],detail=path[4][state.detail??0]||path[4][0];
 const specialized=scene==="buy-phone"?phone(node,state,config):null;
 if(specialized)return specialized;
 const cat=categoryOf(scene),set=
  shoppingHelp.has(scene)?alternateService.shopping:
  foodHelp.has(scene)?alternateService.food:
  travelHelp.has(scene)?alternateService.travel:
  categories[cat]||categories.Everyday;
 const isIssue=shoppingHelp.has(scene)||foodHelp.has(scene)||travelHelp.has(scene);
 const descriptor=detail[0].replace(/[.!?]+$/,'').toLowerCase(),target=path[0].replace(/[.!?]+$/,'').toLowerCase();
 const prices=purchase[scene],commerce=buyable.has(scene)&&state.path!==2;
 const commercial=cashCats.has(cat)&&!isIssue,participatory=["Everyday","Family"].includes(cat);
 const quote=()=>{
  if(!commerce)return "";
  const high=state.offer!=="budget"&&state.offer!=="basic";
  const value=state.offer==="basic"?Math.round(prices[2]*0.7/100)*100:prices[high?1:2];
  return " A FICTIONAL example for "+prices[0]+" is NPR "+value.toLocaleString("en-US")+
   ". This is a made-up lesson price, not current stock or a real retail quote.";
 };
 const quoteNe=()=>!commerce?"":" यो अभ्यासमा "+prices[0]+" को काल्पनिक मूल्य रु. "+
  (state.offer==="basic"?Math.round(prices[2]*0.7/100)*100:prices[state.offer!=="budget"?1:2]).toLocaleString("en-US")+" हो, वास्तविक बजार मूल्य होइन।";
 if(node==='review'){
  return r(node,
   "I understand you're interested in "+descriptor+". "+set.intro[0],
   "तपाईंलाई "+detail[1]+" भन्ने बुझेँ। "+set.intro[1],[
    ...set.priorities.map(p=>option(p[0],p[1],"proposal",{priority:p[2],offer:p[2]==="budget"?"budget":"premium"})),
    option("I'd rather explore a different option.","बरु अर्को विकल्प हेर्न चाहन्छु।","alternative",{offer:state.offer==="budget"?"basic":"budget"}),
    option("I only needed information. Thank you!","जानकारी मात्र चाहिएको थियो। धन्यवाद।","closing",{})
   ]);
 }
 if(node==='proposal'){
  const name=state.priority==="budget"?"price":state.priority==="quality"?"quality":state.priority||"needs";
  return r(node,
   "Since you mentioned "+descriptor+" and prioritised "+name+", "+set.proposal[0]+quote(),
   "तपाईंले "+detail[1]+" र आफ्नो प्राथमिकता बताउनुभयो। "+set.proposal[1]+quoteNe(),[
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
  set.alternative[0]+(commerce?" Here's a lower-cost practice example."+quote():""),
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
   option(participatory?"Let's discuss a simple plan together.":"Yes, let's practice the next step.",
     participatory?"सँगै सरल योजना बनाऔँ।":"हो, अर्को कदमको अभ्यास गरौँ।",
     commercial?"checkout":"action",{}),
   option("Could you remind me of the requirements?","आवश्यकता फेरि सम्झाउनुहुन्छ?","requirements",{}),
   option("I want a different option after all.","बरु अर्को विकल्प चाहिन्छ।","alternative",{offer:"budget"}),
   option("Thanks. I won't proceed today.","धन्यवाद। आज अघि बढ्दिनँ।","closing",{})
  ]);
 if(node==='action')return r(node,set.ready[0]+" You can ask a clear question or describe your preferred next step; no real application, booking or change has been made.",
  set.ready[1]+" स्पष्ट प्रश्न वा चाहेको अर्को कदम बताउनुहोस्; कुनै वास्तविक आवेदन, बुकिङ वा परिवर्तन भएको छैन।",[
   option("That approach works. Thanks for explaining.","त्यो तरिका मिल्यो। बुझाइदिनुभएकोमा धन्यवाद।","confirmation",{decision:"agreed"}),
   option("Could we try a different approach?","अर्को तरिका हेरौँ?","alternative",{}),
   option("Can we check the requirements again?","आवश्यकता फेरि जाँचौँ?","requirements",{})
  ]);
 if(node==='checkout'){
  if(!commercial)return build("action",state,config);
  return r(node,
   "Let's review the sample "+target+" request. We'll need the final price and availability confirmed by the actual business. How would you prefer to pay if you decided to go ahead?",
   "यो अभ्यास "+target+" को विवरण हेरौँ। वास्तविक पसलले अन्तिम मूल्य र उपलब्धता पुष्टि गर्नुपर्छ। अघि बढ्दा कसरी तिर्नुहुन्छ?",[
    option("I'd pay with cash.","नगद तिर्छु।","confirmation",{payment:"cash",decision:"agreed"}),
    option("I'd use a debit or credit card.","डेबिट वा क्रेडिट कार्ड प्रयोग गर्छु।","confirmation",{payment:"card",decision:"agreed"}),
    option("Can I use a QR or digital payment?","क्यूआर वा डिजिटल भुक्तानी मिल्छ?","confirmation",{payment:"digital",decision:"agreed"}),
    option("Actually, I don't want to pay or order yet.","बरु अहिले तिर्न वा अर्डर गर्न चाहन्नँ।","closing",{decision:"later"})
   ]);
 }
 if(node==='confirmation'){
  const ending=commerce&&state.payment?
   "In this fictional practice, you chose "+state.payment+" as your payment method. In a real business, staff would confirm the final total and provide a receipt after successful payment. No money has been charged here.":
   set.done[0];
  const endingNe=commerce&&state.payment?
   "यो काल्पनिक अभ्यासमा "+state.payment+" भुक्तानी तरिका रोज्नुभयो। वास्तविक पसलमा अन्तिम रकम पुष्टि गरी भुक्तानीपछि रसिद दिइन्छ। यहाँ पैसा काटिएको छैन।":set.done[1];
  return r(node,ending+" Thank you for talking with me!",endingNe+" कुराकानीका लागि धन्यवाद!",[
   option("Thank you. Have a nice day!","धन्यवाद। शुभ दिन!","end",{}),
   option("Could you explain the next steps again?","अर्को कदम फेरि बुझाउनुहुन्छ?","requirements",{})
  ]);
 }
 if(node==='closing')return r(node,
  state.decision==="later"?"That's fine. You can decide later; nothing has been ordered, paid for or approved. "+set.done[0]:set.done[0],
  state.decision==="later"?"ठीक छ। पछि निर्णय गर्न सक्नुहुन्छ; केही अर्डर, भुक्तानी वा स्वीकृत भएको छैन। "+set.done[1]:set.done[1],[
   option("Thanks. Goodbye!","धन्यवाद। बिदा!","end",{}),
   option("Can we discuss something else?","अर्को कुरा गरौँ?","opening",{priority:"",offer:""})
  ]);
 return null;
}
window.sikauCoachJourneys=Object.freeze({build,phone,categories,purchase,categoryOf});
})();
