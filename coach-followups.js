/* Coach conversation guidance: practical questions, honest outcomes and a natural farewell. */
(function(){'use strict';
const g={
 Shopping:[
  "Let's compare the actual choices, price, fit and return terms before you commit.",
  "वास्तविक विकल्प, मूल्य, साइज र फिर्ता नियम तुलना गरौँ।",
  "Could you show me the available options and their prices?",
  "उपलब्ध विकल्प र मूल्य देखाइदिनुहुन्छ?",
  "First we'd check available stock, the posted price and any relevant warranty or return conditions. No purchase has been made.",
  "पहिले स्टक, देखाइएको मूल्य र वारेन्टी वा फिर्ताका सर्त जाँचौँ। कुनै खरिद भएको छैन।"],
 "Food & Drink":[
  "We can go through the menu and your preferences, but ingredients and stock must be checked with the restaurant.",
  "मेनु र रोजाइ बुझौँ, तर सामग्री र उपलब्धता रेस्टुरेन्टसँग जाँच्नुपर्छ।",
  "Could you check ingredients, price and preparation time?",
  "सामग्री, मूल्य र तयार हुने समय जाँच्नुहुन्छ?",
  "Let's confirm the dish, dietary requests, total cost and preparation time before an order is placed.",
  "अर्डरअघि खाना, खानाका विशेष अनुरोध, मूल्य र समय पुष्टि गरौँ।"],
 Travel:[
  "Let's compare the relevant routes and schedule; current fares or seats must be confirmed with the operator.",
  "बाटो र तालिका तुलना गरौँ; हालको भाडा वा सिट सेवा प्रदायकसँग पुष्टि गर्नुपर्छ।",
  "Could you explain the schedule and what I need to bring?",
  "समयतालिका र के ल्याउनुपर्छ बताउनुहुन्छ?",
  "We should verify the date, route, fare and travel requirements. No actual ticket has been booked.",
  "मिति, बाटो, भाडा र यात्राका सर्त पुष्टि गरौँ। कुनै वास्तविक टिकट बुक भएको छैन।"],
 Healthcare:[
  "I can explain the clinic process, but a qualified clinician should answer personal medical questions.",
  "क्लिनिकको प्रक्रिया बुझाउन सक्छु, तर व्यक्तिगत स्वास्थ्य प्रश्न योग्य चिकित्सकले दिनुपर्छ।",
  "What documents and appointment information should I prepare?",
  "कुन कागजात र अपोइन्टमेन्ट विवरण तयार राख्ने?",
  "We'll check the clinic's instructions, appointment availability and any required forms. No appointment has been booked.",
  "क्लिनिकका निर्देशन, खाली समय र फाराम जाँचौँ। कुनै अपोइन्टमेन्ट बुक भएको छैन।"],
 Work:[
  "Let's clarify the workplace expectations and ask the appropriate person before making a change.",
  "कामको अपेक्षा स्पष्ट गरेर परिवर्तनअघि जिम्मेवार व्यक्तिलाई सोधौँ।",
  "Who needs to confirm the task, schedule or request?",
  "काम, तालिका वा अनुरोध कसले पुष्टि गर्नुपर्छ?",
  "We can prepare a clear request for the supervisor and check the work policy. No approval has been given.",
  "व्यवस्थापकका लागि स्पष्ट अनुरोध बनाउँछौँ र नियम जाँचौँ। स्वीकृति भएको छैन।"],
 Services:[
  "We can review service options, any charges and the next step without promising approval.",
  "सेवाका विकल्प, शुल्क र अर्को प्रक्रिया बुझौँ। स्वीकृतिको वाचा छैन।",
  "What documents, charges or appointments should I check?",
  "कुन कागजात, शुल्क वा अपोइन्टमेन्ट जाँच्ने?",
  "We should confirm the provider's actual requirements and written estimate before signing or paying.",
  "हस्ताक्षर वा पैसा तिर्नुअघि सेवा प्रदायकका नियम र लिखित खर्च पुष्टि गरौँ।"],
 Everyday:[
  "That makes sense. Let's keep the conversation going based on what you've told me.",
  "ठीक छ। तपाईंले भनेको कुराअनुसार कुराकानी अघि बढाऔँ।",
  "Could you give me another natural way to say that?",
  "त्यो भन्ने अर्को स्वाभाविक तरिका बताउनुहुन्छ?",
  "Use a short, polite sentence and ask one relevant question. Listen to the reply before choosing what to say next.",
  "छोटो र सभ्य वाक्यसँग सम्बन्धित प्रश्न सोध्नुहोस्। अर्को उत्तर सुनेर प्रतिक्रिया दिनुहोस्।"],
 Home:[
  "Let's identify the home requirement and check the actual costs and appointments.",
  "घरको आवश्यकता बुझेर वास्तविक खर्च र समय जाँचौँ।",
  "Could you explain the likely cost and schedule?",
  "सम्भावित खर्च र समय बताउनुहुन्छ?",
  "Describe the specific issue and ask for an estimate or visit time. No repair or service has been arranged.",
  "समस्या स्पष्ट बताई खर्च र समय सोध्नुहोस्। कुनै मर्मत वा सेवा मिलाइएको छैन।"],
 Education:[
  "Let's use a concrete example and review the relevant instructions before going further.",
  "ठोस उदाहरण र सम्बन्धित निर्देशन हेरेर अघि बढौँ।",
  "Could you explain it with an example or the official instructions?",
  "उदाहरण वा आधिकारिक निर्देशनबाट बुझाउनुहुन्छ?",
  "We'll review requirements, examples and any deadline, then decide which exercise to try.",
  "आवश्यकता, उदाहरण र अन्तिम मिति हेरेर अभ्यास छानौँ।"],
 Technology:[
  "Let's isolate the device issue and start with a safe check that won't risk your data.",
  "उपकरणको समस्या छुट्याएर डाटा सुरक्षित हुने जाँचबाट सुरु गरौँ।",
  "What's a safe first check before changing settings?",
  "सेटिङ बदल्नुअघि सुरक्षित पहिलो जाँच के हो?",
  "Check the device and official instructions. Never share passwords or verification codes with a shop or stranger.",
  "उपकरण र आधिकारिक निर्देशन जाँच्नुहोस्। पासवर्ड वा सुरक्षा कोड अरूलाई नदिनुहोस्।"],
 Money:[
  "Let's verify amounts and fees through a secure bank or payment channel before proceeding.",
  "अघि बढ्नुअघि सुरक्षित बैंक वा भुक्तानी माध्यमबाट रकम र शुल्क पुष्टि गरौँ।",
  "Could you explain the fees and secure verification process?",
  "शुल्क र सुरक्षित पुष्टि प्रक्रियाबारे बताउनुहुन्छ?",
  "Use official verification and check amounts, fees and limits. No real transfer or account action has taken place.",
  "आधिकारिक माध्यमबाट रकम, शुल्क र सीमा जाँच्नुहोस्। कुनै वास्तविक कारोबार भएको छैन।"],
 Community:[
  "Let's check the current rules, hours and who to contact for this activity.",
  "कार्यक्रमको हालको नियम, समय र सम्पर्क व्यक्ति जाँचौँ।",
  "How can I check eligibility, registration and opening hours?",
  "योग्यता, दर्ता र खुल्ने समय कसरी जाँच्ने?",
  "Check the organizer's official information and registration steps. Participation hasn't been confirmed.",
  "आयोजकको आधिकारिक सूचना र दर्ता प्रक्रिया जाँच्नुहोस्। सहभागिता पुष्टि भएको छैन।"],
 Family:[
  "Let's understand everyone's preferences before making plans for them.",
  "सबैको रुचि बुझेर मात्र योजना गरौँ।",
  "Could we discuss what works best for everyone?",
  "सबैलाई के मिल्छ छलफल गरौँ?",
  "Ask the people involved what timing or arrangement they prefer before committing to a plan.",
  "योजना पक्का गर्नुअघि सम्बन्धित सबैलाई समय र व्यवस्था के मिल्छ सोध्नुहोस्।"]
};
const old={
 "buy-phone":"Shopping","directions":"Travel","call-hospital":"Healthcare",
 "hospital-checkin":"Healthcare","restaurant":"Food & Drink","groceries":"Shopping",
 "pharmacy":"Healthcare","coffee":"Food & Drink","interview":"Work",
 "work-shift":"Work","take-bus":"Travel","hotel":"Travel","airport":"Travel",
 "bank":"Money","phone-repair":"Technology","new-friend":"Everyday",
 "school-help":"Education","rent-home":"Home","home-internet":"Technology",
 "delivery-help":"Services","dental-office":"Healthcare","parent-meeting":"Education",
 "shift-request":"Work","card-lost":"Money","send-mail":"Services",
 "car-repair":"Services","library":"Community"
};
// Nine custom outcomes for the phone-shop conversation.
const phone=[
 [
  ["Rather than just counting megapixels, I'd compare camera samples in daylight and low light. You can also test portraits or video on a demo unit if available.",
   "मेगापिक्सेल मात्रै होइन, दिन र कम उज्यालोका फोटो तुलना गरौँ। डेमो फोन भए पोर्ट्रेट वा भिडियो पनि परीक्षण गरौँ।",
   ["Could I compare portrait photos?","पोर्ट्रेट फोटो तुलना गर्न सक्छु?","Let's check focus, skin tones and background blur in real samples.","वास्तविक नमुनामा फोकस, छालाको रङ र पृष्ठभूमिको धमिलोपन जाँचौँ।"]],
  ["For battery life, let's compare real use, charging speed and whether it will last through your day.",
   "ब्याट्रीका लागि वास्तविक प्रयोग, चार्जिङ गति र दिनभर टिक्छ कि जाँचौँ।",
   ["Will the battery last a workday?","ब्याट्री कामको दिनभर टिक्छ?","That depends on screen use, calls, maps and mobile data. Let's compare usage examples.","स्क्रिन, कल, नक्सा र डाटामा भर पर्छ। प्रयोगका उदाहरण तुलना गरौँ।"]],
  ["For an affordable phone, let's compare the total price, storage and essential features before choosing the cheapest one.",
   "सस्तो फोनका लागि कुल मूल्य, स्टोरेज र आवश्यक विशेषता तुलना गरौँ।",
   ["Could I compare a lower-priced model?","अलि सस्तो मोडेल तुलना गर्न सक्छु?","Yes. We can check the actual price tags and what features you would give up.","हुन्छ। वास्तविक मूल्य र कुन विशेषता कम हुन्छ जाँचौँ।"]]
 ],
 [
  ["Camera comparison works best with real photos in different lighting, not just specifications.",
   "क्यामेरा तुलना गर्दा अंक मात्र होइन, फरक उज्यालोका फोटो हेर्नु राम्रो हुन्छ।",
   ["Could we compare night photos?","रातिको फोटो तुलना गरौँ?","We can check sample photos for blur, noise and detail.","नमुना फोटोमा धमिलोपन, दाना र विवरण जाँचौँ।"]],
  ["Storage should match how many photos, videos and apps you keep. Let's check your current usage first.",
   "स्टोरेज फोटो, भिडियो र एपको प्रयोगसँग मिल्नुपर्छ। पहिले अहिलेको प्रयोग हेरौँ।",
   ["Would 128 GB be enough for me?","१२८ जीबी पुग्छ होला?","Let's estimate what you use now and how much room you'll need in the future.","अहिलेको प्रयोग र भविष्यमा चाहिने ठाउँ अनुमान गरौँ।"]],
  ["Screen size changes how comfortably you can hold the phone, read or watch videos. Let's compare a few demo models.",
   "स्क्रिनको आकारले समाउन, पढ्न र भिडियो हेर्न फरक पार्छ। केही डेमो फोन तुलना गरौँ।",
   ["Could I hold a smaller phone?","सानो फोन समाएर हेर्न सक्छु?","If a demo is available, compare its width, weight and text size in your hand.","डेमो फोन उपलब्ध भए समाएर चौडाइ, तौल र अक्षरको आकार तुलना गर्नुहोस्।"]]
 ],
 [
  ["Let's check the manufacturer's warranty terms and device model; accidental damage and defects can have different rules.",
   "फोनको मोडेल र निर्माताको वारेन्टी जाँचौँ। दुर्घटनाको क्षति र उत्पादन त्रुटिमा फरक नियम हुन सक्छ।",
   ["How do I check whether the warranty applies?","वारेन्टी लाग्छ कि कसरी जाँच्ने?","Check the manufacturer's official coverage instructions and required proof of purchase.","निर्माताको आधिकारिक निर्देशन र खरिद प्रमाण जाँच्नुहोस्।"]],
  ["For an accessory, the exact phone model matters. A case, cable or screen protector may not fit every phone.",
   "सामानका लागि फोनको सही मोडेल महत्त्वपूर्ण हुन्छ। कभर, केबल वा स्क्रिन प्रोटेक्टर सबैमा मिल्दैन।",
   ["Could you check which accessory fits?","कुन सामान मिल्छ जाँचिदिनुहुन्छ?","We can compare the model identifier with the accessory specifications before buying.","किन्नुअघि मोडेल र सामानको विवरण तुलना गरौँ।"]],
  ["Let's troubleshoot the setup safely. Which step is blocking you? Don't share passwords or verification codes.",
   "सुरक्षित रूपमा सेटअपको समस्या जाँचौँ। कुन चरणमा अड्किनुभयो? पासवर्ड वा कोड नदिनुहोस्।",
   ["Could we check Wi-Fi or account settings first?","पहिले वाइफाइ वा खाता सेटिङ जाँचौँ?","Start by checking the network and official recovery settings; avoid unfamiliar apps or links.","नेटवर्क र आधिकारिक रिकभरी सेटिङ जाँच्नुहोस्। अपरिचित एप वा लिंक नखोल्नुहोस्।"]]
 ]
];
function get(id,config,path,detail){
 const category=window.sikauMoreTopics?.find(s=>s.id===id)?.category||old[id]||"Everyday";
 const guide=g[category]||g.Everyday;
 const current=config[1][path],choice=current[4][detail],alternate=current[4][(detail+1)%3];
 const custom=id==="buy-phone"?phone[path]?.[detail]:null;
 const specific=window.sikauLegacyFollowups?.[id]?.[path];
 const reaction=current[7]?.[detail];
 const prefix=custom?.[0]||specific&&current[5]||reaction?.[0]||current[5];
 const prefixNe=custom?.[1]||specific&&current[6]||reaction?.[1]||current[6];
 return {
  category,
  message:prefix+(custom||specific?"":" "+(reaction?current[5]+" ":"")+guide[0]),
  messageNe:prefixNe+(custom||specific?"":" "+(reaction?current[6]+" ":"")+guide[1]),
  question:custom?.[2]||specific||[guide[2],guide[3],guide[4],guide[5]],
  guidance:specific||[guide[2],guide[3],guide[4],guide[5]],
  proceed:specific?[
   "For your specific request, "+specific[2].charAt(0).toLowerCase()+specific[2].slice(1),
   "तपाईंको अनुरोधका लागि, "+specific[3]
  ]:[guide[4],guide[5]],
  alternate:[alternate[0],alternate[1],(detail+1)%3],
  focus:[choice[0],choice[1]],
  subject:[current[0],current[1]]
 };
}
window.sikauCoachGuidance=Object.freeze({get,old,phone});
})();