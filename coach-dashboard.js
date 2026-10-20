/* English Sikau Real-Life Conversation Coach.
 * Presentation-layer guided practice in an authorized, loaded lesson frame.
 * No new login, trial, payment, storage or verified XP operations.
 * The user's existing Ask Coach service remains the optional open-ended tool.
 */
(function(){
'use strict';
const STYLE_URL=new URL('coach-dashboard.css?v=20261020-conversations-r1',document.baseURI).href;
const scenarios=[{"id":"return-shirt","emoji":"👕","title":"Return clothing","ne":"लुगा फिर्ता","category":"Shopping","place":"Clothing store · कपडा पसल","partner":"Store assistant","level":"Easy","steps":[{"npc":"Hello! How can I help you today?","npcNe":"नमस्ते! म तपाईंलाई कसरी मद्दत गर्न सक्छु?","goal":"यो कमिज फिर्ता गर्न चाहन्छु भन्नुहोस्।","answer":"I'd like to return this shirt, please.","answerNe":"म यो कमिज फिर्ता गर्न चाहन्छु।","bad1":"I was walking here yesterday.","bad2":"The shirt is blue and the sky is blue.","accept":["return shirt","return this","bring shirt back"],"hint":"Use “I'd like to return…” to be polite.","after":"Of course. Do you have your receipt?"},{"npc":"Do you have your receipt?","npcNe":"के तपाईंसँग रसिद छ?","goal":"रसिद छ भन्नुहोस्।","answer":"Yes, I have the receipt right here.","answerNe":"हो, रसिद यहीँ छ।","bad1":"Please give me another sandwich.","bad2":"My receipt likes the weather.","accept":["have receipt","here receipt","receipt right here"],"hint":"“Here is my receipt” is also natural.","after":"Thanks. Is there a problem with the shirt?"},{"npc":"What is wrong with the shirt?","npcNe":"कमिजमा के समस्या छ?","goal":"साइज सानो छ भन्नुहोस्।","answer":"It's too small for me.","answerNe":"यो मलाई धेरै सानो भयो।","bad1":"I want to buy a larger television.","bad2":"I'm from Kathmandu, thank you.","accept":["too small","size small","doesn't fit","does not fit"],"hint":"You can say “It doesn't fit.”","after":"Would you like a refund or an exchange?"},{"npc":"Would you like a refund or an exchange?","npcNe":"पैसा फिर्ता चाहिन्छ कि साट्न चाहनुहुन्छ?","goal":"पैसा फिर्ता चाहिन्छ भन्नुहोस्।","answer":"I'd prefer a refund, please.","answerNe":"म पैसा फिर्ता लिन चाहन्छु।","bad1":"My refund is at school.","bad2":"No, I want a bus ticket.","accept":["refund","money back","return my money"],"hint":"“I'd prefer…” is softer than “I want…”.","after":"Absolutely. I'll process the refund. Thank you!"}]},{"id":"buy-phone","emoji":"📱","title":"Buy a phone","ne":"फोन किन्नु","category":"Shopping","place":"Phone shop · मोबाइल पसल","partner":"Salesperson","level":"Easy","steps":[{"npc":"Welcome! What are you looking for?","npcNe":"स्वागत छ! तपाईं के खोज्दै हुनुहुन्छ?","goal":"नयाँ फोन चाहिन्छ भन्नुहोस्।","answer":"I'm looking for a new phone.","answerNe":"म नयाँ फोन खोज्दै छु।","bad1":"I'd like to book a hotel.","bad2":"I saw a movie yesterday.","accept":["new phone","buy phone","looking phone"],"hint":"get used to “I'm looking for…”","after":"We have many models. What is your budget?"},{"npc":"What is your budget?","npcNe":"तपाईंको बजेट कति छ?","goal":"पाँच सय डलरभन्दा कम भन्नुहोस्।","answer":"My budget is under five hundred dollars.","answerNe":"मेरो बजेट पाँच सय डलरभन्दा कम छ।","bad1":"I would like a bag of rice.","bad2":"I am going to school tomorrow.","accept":["under five hundred","under 500","less than 500","budget 500"],"hint":"Use “under” or “less than” for a maximum price.","after":"I can show you a few phones in that range."},{"npc":"Would you like to compare these two phones?","npcNe":"यी दुई फोन तुलना गर्न चाहनुहुन्छ?","goal":"क्यामेरा र ब्याट्रीबारे सोध्नुहोस्।","answer":"Which phone has a better camera and battery?","answerNe":"कुन फोनको क्यामेरा र ब्याट्री राम्रो छ?","bad1":"What time is the restaurant open?","bad2":"I need a new shirt.","accept":["camera battery","better camera","better battery"],"hint":"“Which phone has…?” asks about features.","after":"This one has a stronger battery."},{"npc":"Would you like to buy it today?","npcNe":"आज नै किन्न चाहनुहुन्छ?","goal":"वारेन्टी छ कि छैन सोध्नुहोस्।","answer":"Does it come with a warranty?","answerNe":"के यसमा वारेन्टी छ?","bad1":"Is there a train to the airport?","bad2":"I like watermelon juice.","accept":["warranty","guarantee"],"hint":"Ask “Does it come with…?” to check what is included.","after":"Yes, it has a one-year warranty."}]},{"id":"directions","emoji":"🗺️","title":"Ask for directions","ne":"बाटो सोध्नु","category":"Travel","place":"City street · सहरको सडक","partner":"Local resident","level":"Easy","steps":[{"npc":"Excuse me, can I help you?","npcNe":"माफ गर्नुहोस्, म मद्दत गर्न सक्छु?","goal":"अस्पताल कहाँ छ भनेर सोध्नुहोस्।","answer":"Could you tell me where the hospital is?","answerNe":"अस्पताल कहाँ छ भनेर बताइदिनुहुन्छ?","bad1":"I would like to buy a shirt.","bad2":"I ate rice today.","accept":["where hospital","hospital direction","find hospital","get hospital"],"hint":"“Could you tell me where…?” sounds polite.","after":"The hospital is near the main road."},{"npc":"Are you walking or driving?","npcNe":"तपाईं हिँडेर जाँदै हुनुहुन्छ कि गाडीमा?","goal":"हिँडेर जाँदै छु भन्नुहोस्।","answer":"I'm walking there.","answerNe":"म हिँडेर जाँदै छु।","bad1":"My car is a yellow banana.","bad2":"I need a small shirt.","accept":["walking","on foot","walk there"],"hint":"“I'm going on foot” means walking.","after":"Great! Go straight for two blocks."},{"npc":"Do I turn left at the lights?","npcNe":"बत्ती भएको ठाउँमा बायाँ मोड्ने हो?","goal":"बायाँ मोड्नुपर्ने हो भनेर पुष्टि गर्नुहोस्।","answer":"Should I turn left at the traffic lights?","answerNe":"ट्राफिक बत्तीमा बायाँ मोड्नुपर्छ?","bad1":"My favorite food is momo.","bad2":"Where is my homework?","accept":["turn left","left at lights","left traffic"],"hint":"Use “Should I…?” to confirm directions.","after":"Yes, then the hospital will be on your right."},{"npc":"Anything else?","npcNe":"अरू केही चाहिन्छ?","goal":"धन्यवाद भन्नुहोस्।","answer":"Thank you so much for your help!","answerNe":"तपाईंको मद्दतका लागि धेरै धन्यवाद!","bad1":"Can I return this phone?","bad2":"The weather is green.","accept":["thank you","thanks"],"hint":"“Thank you so much” is friendly and natural.","after":"You're very welcome. Have a good day!"}]},{"id":"call-hospital","emoji":"☎️","title":"Call for an appointment","ne":"फोनबाट अपोइन्टमेन्ट","category":"Healthcare","place":"Phone call · टेलिफोन","partner":"Hospital receptionist","level":"Medium","steps":[{"npc":"Good morning, Valley Clinic. How may I help you?","npcNe":"शुभ प्रभात, भ्याली क्लिनिक। कसरी मद्दत गर्न सक्छु?","goal":"डाक्टरसँग भेट्ने समय मिलाउन चाहन्छु भन्नुहोस्।","answer":"I'd like to make an appointment with a doctor.","answerNe":"म डाक्टरसँग भेट्ने समय मिलाउन चाहन्छु।","bad1":"Can I order a pizza, please?","bad2":"Where can I buy a jacket?","accept":["make appointment","book appointment","see doctor","schedule visit"],"hint":"“Make an appointment” is a standard expression.","after":"Certainly. Is this for a routine visit?"},{"npc":"What is the reason for your appointment?","npcNe":"अपोइन्टमेन्टको कारण के हो?","goal":"सामान्य स्वास्थ्य जाँचका लागि हो भन्नुहोस्।","answer":"It's for a routine checkup.","answerNe":"यो सामान्य स्वास्थ्य जाँचका लागि हो।","bad1":"I need directions to the museum.","bad2":"I lost my bus ticket.","accept":["routine checkup","regular checkup","annual physical","general checkup","checkup"],"hint":"“Routine checkup” means a regular health visit.","after":"We have an opening on Thursday."},{"npc":"Would Thursday at ten work for you?","npcNe":"बिहीबार दस बजे ठीक हुन्छ?","goal":"त्यो समय ठीक छ भन्नुहोस्।","answer":"Yes, Thursday at ten works for me.","answerNe":"हो, बिहीबार दस बजे ठीक छ।","bad1":"I want a refund for my shoes.","bad2":"My phone has a nice camera.","accept":["thursday ten","thursday 10","time works","that works","yes please"],"hint":"“That works for me” means the time is convenient.","after":"Great. Please arrive fifteen minutes early."},{"npc":"Do you have any questions?","npcNe":"के तपाईंको कुनै प्रश्न छ?","goal":"के ल्याउनुपर्ने हो भनेर सोध्नुहोस्।","answer":"What should I bring to my appointment?","answerNe":"मैले अपोइन्टमेन्टमा के ल्याउनुपर्छ?","bad1":"Can I get a large coffee?","bad2":"The sky is cloudy.","accept":["what bring","need bring","bring appointment","bring insurance"],"hint":"A useful question to ask during a phone booking.","after":"Please bring your ID and insurance card, if you have one."}]},{"id":"hospital-checkin","emoji":"🏥","title":"Check in at a hospital","ne":"अस्पतालमा दर्ता","category":"Healthcare","place":"Hospital desk · अस्पताल काउन्टर","partner":"Receptionist","level":"Easy","steps":[{"npc":"Hello! How can I help you?","npcNe":"नमस्ते! म कसरी मद्दत गर्न सक्छु?","goal":"अपोइन्टमेन्ट छ भनेर भन्नुहोस्।","answer":"I have an appointment at eleven.","answerNe":"मेरो एघार बजे अपोइन्टमेन्ट छ।","bad1":"I'd like to buy apples.","bad2":"I need to return a shirt.","accept":["have appointment","appointment eleven","appointment 11"],"hint":"Start with “I have an appointment.”","after":"May I have your name, please?"},{"npc":"Can you confirm your date of birth?","npcNe":"जन्ममिति पुष्टि गर्न सक्नुहुन्छ?","goal":"जन्ममिति दिन तयार छु भन्नुहोस्, वास्तविक जानकारी आवश्यक छैन।","answer":"Yes, I can confirm my date of birth.","answerNe":"हो, म मेरो जन्ममिति पुष्टि गर्न सक्छु।","bad1":"The bus is near the lake.","bad2":"This is my shopping receipt.","accept":["confirm birth","date of birth","yes i can"],"hint":"Avoid entering real personal details in practice.","after":"Thank you. Do you have your insurance card?"},{"npc":"Do you have your insurance card?","npcNe":"बीमाको कार्ड छ?","goal":"कार्ड छ भन्नुहोस्।","answer":"Yes, I have my insurance card.","answerNe":"हो, मसँग बीमाको कार्ड छ।","bad1":"I'd like some hot tea.","bad2":"Can you repair my phone?","accept":["insurance card","have insurance","here my card"],"hint":"“Here is my insurance card” also works.","after":"Thanks. Please take a seat."},{"npc":"Do you know where to wait?","npcNe":"कहाँ पर्खने थाहा छ?","goal":"कहाँ बस्ने भनेर सोध्नुहोस्।","answer":"Where should I wait, please?","answerNe":"म कहाँ पर्खनुपर्छ?","bad1":"How expensive is this phone?","bad2":"I want a refund.","accept":["where wait","where sit","waiting area"],"hint":"Use “Where should I…?” for directions.","after":"Please wait in the seating area over there."}]},{"id":"restaurant","emoji":"🍽️","title":"Order at a restaurant","ne":"रेस्टुरेन्टमा खाना","category":"Food & Drink","place":"Restaurant · रेस्टुरेन्ट","partner":"Server","level":"Easy","steps":[{"npc":"Welcome! How many people are dining?","npcNe":"स्वागत छ! कति जना खाना खानुहुन्छ?","goal":"दुई जनाका लागि टेबल माग्नुहोस्।","answer":"A table for two, please.","answerNe":"कृपया दुई जनाका लागि टेबल।","bad1":"I need to buy a phone.","bad2":"I want to catch a bus.","accept":["table two","two people","two please"],"hint":"“A table for two” is a useful restaurant phrase.","after":"Right this way. Here are your menus."},{"npc":"Are you ready to order?","npcNe":"अर्डर दिन तयार हुनुहुन्छ?","goal":"मोमो र पानी माग्नुहोस्।","answer":"I'd like momo and a glass of water, please.","answerNe":"म मोमो र एक गिलास पानी चाहन्छु।","bad1":"I need a refund for my shirt.","bad2":"Where is the train station?","accept":["momo water","momo glass","order momo"],"hint":"“I'd like…” is more polite than “Give me…”.","after":"Sure! Would you like anything else?"},{"npc":"Would you like your food spicy?","npcNe":"खाना पिरो चाहिन्छ?","goal":"अलि कम पिरो बनाउन अनुरोध गर्नुहोस्।","answer":"Could you make it less spicy, please?","answerNe":"कृपया अलि कम पिरो बनाइदिनुहुन्छ?","bad1":"Can I borrow your notebook?","bad2":"I like new phones.","accept":["less spicy","not too spicy","mild please","not spicy"],"hint":"Use “Could you…?” for a polite request.","after":"Of course. I'll ask the kitchen."},{"npc":"How was your meal?","npcNe":"खाना कस्तो लाग्यो?","goal":"खाना मिठो थियो र बिल चाहिन्छ भन्नुहोस्।","answer":"It was delicious. Could we have the bill, please?","answerNe":"खाना मिठो थियो। बिल दिनुहुन्छ?","bad1":"Can you show me the hospital?","bad2":"I forgot my homework.","accept":["delicious bill","bill please","check please","food good bill"],"hint":"“The bill” or “the check” is natural.","after":"Thank you! I'll bring the bill now."}]},{"id":"groceries","emoji":"🛒","title":"Grocery shopping","ne":"किराना किनमेल","category":"Shopping","place":"Grocery store · किराना पसल","partner":"Store worker","level":"Easy","steps":[{"npc":"Hi! Are you looking for something?","npcNe":"नमस्ते! तपाईं केही खोज्दै हुनुहुन्छ?","goal":"स्याउ कहाँ छ भनेर सोध्नुहोस्।","answer":"Where can I find the apples?","answerNe":"स्याउ कहाँ पाउँछु?","bad1":"I need a doctor.","bad2":"Where is the hotel?","accept":["find apples","where apples","apples aisle"],"hint":"“Where can I find…?” helps in stores.","after":"The apples are in the produce section."},{"npc":"Do you need anything else?","npcNe":"अरू केही चाहिन्छ?","goal":"ताजा सागसब्जी पनि चाहिन्छ भन्नुहोस्।","answer":"Yes, I'm looking for fresh vegetables too.","answerNe":"हो, मलाई ताजा तरकारी पनि चाहिन्छ।","bad1":"My train is leaving soon.","bad2":"I'd like a room with a view.","accept":["fresh vegetables","looking vegetables","need vegetables"],"hint":"“Fresh produce” includes fruits and vegetables.","after":"They are beside the fruit."},{"npc":"Would you like a bag?","npcNe":"झोला चाहिन्छ?","goal":"पुनःप्रयोग गर्न मिल्ने झोला छ भन्नुहोस्।","answer":"No, thank you. I brought my own bag.","answerNe":"पर्दैन, धन्यवाद। मैले आफ्नै झोला ल्याएको छु।","bad1":"Please book my flight.","bad2":"I need to return my car.","accept":["own bag","brought bag","have bag","no bag"],"hint":"You can politely decline with “No, thank you.”","after":"Great! Have a good day."}]},{"id":"pharmacy","emoji":"💊","title":"At the pharmacy","ne":"औषधि पसलमा","category":"Healthcare","place":"Pharmacy · औषधि पसल","partner":"Pharmacist","level":"Medium","steps":[{"npc":"Hello, what can I help you find?","npcNe":"नमस्ते, के खोज्न मद्दत गरौं?","goal":"सामान्य दुखाइका लागि औषधिबारे सोध्न चाहन्छु भन्नुहोस्।","answer":"Could I ask about medicine for a headache?","answerNe":"टाउको दुखाइका लागि औषधिबारे सोध्न मिल्छ?","bad1":"I want to buy a winter coat.","bad2":"Can you show me your phones?","accept":["medicine headache","headache medicine","headache relief"],"hint":"This is language practice, not medication advice.","after":"Of course. Are you taking any other medicines?"},{"npc":"Do you have any allergies?","npcNe":"के तपाईंलाई कुनै एलर्जी छ?","goal":"थाहा छैन, डाक्टर वा फार्मासिस्टसँग जाँच्न चाहन्छु भन्नुहोस्।","answer":"I'm not sure. Could you help me check?","answerNe":"मलाई निश्चित छैन। जाँच्न मद्दत गर्नुहुन्छ?","bad1":"I would like a restaurant table.","bad2":"My shirt is too small.","accept":["not sure check","help check","ask doctor","check allergies"],"hint":"It's okay to say when you do not know something.","after":"Of course. We can talk through the information."},{"npc":"Do you have any other questions?","npcNe":"अरू कुनै प्रश्न छ?","goal":"औषधिको निर्देशन कहाँ पढ्ने भनेर सोध्नुहोस्।","answer":"Where can I read the instructions?","answerNe":"म निर्देशन कहाँ पढ्न सक्छु?","bad1":"Where is the airport gate?","bad2":"Can I get more rice?","accept":["read instructions","medicine directions","instructions label"],"hint":"Always ask a qualified professional about medicines.","after":"The instructions are on the label. Please ask us if anything is unclear."}]},{"id":"coffee","emoji":"☕","title":"Order at a café","ne":"क्याफेमा अर्डर","category":"Food & Drink","place":"Café · क्याफे","partner":"Barista","level":"Easy","steps":[{"npc":"Hi! What can I get for you?","npcNe":"नमस्ते! तपाईंलाई के चाहिन्छ?","goal":"एउटा सानो चिया माग्नुहोस्।","answer":"Could I have a small tea, please?","answerNe":"मलाई एउटा सानो चिया दिनुहुन्छ?","bad1":"Can you fix my bicycle?","bad2":"I need to find a doctor.","accept":["small tea","tea please","cup tea"],"hint":"“Could I have…?” is polite in cafés.","after":"Sure. Would you like sugar?"},{"npc":"Would you like sugar?","npcNe":"चिनी हाल्ने?","goal":"चिनी नहाल्ने भन्नुहोस्।","answer":"No sugar, please.","answerNe":"कृपया चिनी नहाल्नुहोस्।","bad1":"I need a new jacket.","bad2":"I am going to Pokhara.","accept":["no sugar","without sugar","skip sugar"],"hint":"“Without sugar” is another way to say this.","after":"No problem. Anything else?"},{"npc":"Is that for here or to go?","npcNe":"यहीँ खाने कि लैजाने?","goal":"लैजाने भन्नुहोस्।","answer":"To go, please.","answerNe":"लैजान्छु, कृपया।","bad1":"I need an appointment.","bad2":"The phone is broken.","accept":["to go","take away","takeout"],"hint":"“To go” is common in American English.","after":"Okay! Your tea will be ready soon."}]},{"id":"interview","emoji":"💼","title":"Job interview","ne":"जागिर अन्तर्वार्ता","category":"Work","place":"Office interview · कार्यालय","partner":"Interviewer","level":"Medium","steps":[{"npc":"Welcome. Can you introduce yourself?","npcNe":"स्वागत छ। आफ्नो परिचय दिन सक्नुहुन्छ?","goal":"आफ्नो परिचय दिनुहोस्, नाम काल्पनिक राख्न सकिन्छ।","answer":"My name is Sita, and I'm happy to be here.","answerNe":"मेरो नाम सीता हो। यहाँ आउन पाउँदा खुशी छु।","bad1":"Where can I buy tomatoes?","bad2":"I would like two coffees.","accept":["my name","happy here","glad here","thank you opportunity"],"hint":"Start with a confident, simple greeting.","after":"Nice to meet you, Sita."},{"npc":"Why are you interested in this job?","npcNe":"यो जागिरमा तपाईंको रुचि किन छ?","goal":"सिक्न र ग्राहकलाई मद्दत गर्न मन पर्छ भन्नुहोस्।","answer":"I enjoy helping customers and learning new skills.","answerNe":"मलाई ग्राहकलाई मद्दत गर्न र नयाँ सीप सिक्न मन पर्छ।","bad1":"I need a refund for my shoes.","bad2":"My friend lives by a lake.","accept":["help customers","learn skills","like job","interested work"],"hint":"Show how your interests match the position.","after":"That's great."},{"npc":"What is one of your strengths?","npcNe":"तपाईंको एउटा राम्रो पक्ष के हो?","goal":"समयमा पुग्छु र जिम्मेवारीपूर्वक काम गर्छु भन्नुहोस्।","answer":"I'm reliable and I arrive on time.","answerNe":"म भरपर्दो छु र समयमा आइपुग्छु।","bad1":"I would like spicy momo.","bad2":"Where is the bathroom?","accept":["reliable","on time","punctual","responsible"],"hint":"Use an example when you describe a strength.","after":"Thank you."},{"npc":"Do you have any questions for us?","npcNe":"हामीलाई सोध्नुपर्ने केही प्रश्न छ?","goal":"तालिमबारे सोध्नुहोस्।","answer":"What training will I receive?","answerNe":"मैले कस्तो तालिम पाउँछु?","bad1":"Can you give me a taxi?","bad2":"I'd like a large orange juice.","accept":["training","learn role","onboarding"],"hint":"Asking questions shows interest.","after":"Good question. Let me explain our training process."}]},{"id":"work-shift","emoji":"🧰","title":"At work","ne":"काममा कुराकानी","category":"Work","place":"Workplace · कार्यस्थल","partner":"Supervisor","level":"Easy","steps":[{"npc":"Good morning! Are you ready for your shift?","npcNe":"शुभ प्रभात! कामका लागि तयार हुनुहुन्छ?","goal":"काम सुरु गर्न तयार छु भन्नुहोस्।","answer":"Yes, I'm ready to start my shift.","answerNe":"हो, म काम सुरु गर्न तयार छु।","bad1":"I need a plane ticket.","bad2":"I like that blue mountain.","accept":["ready shift","ready start","ready work"],"hint":"“I'm ready to start” is a useful work phrase.","after":"Great. Please check the deliveries first."},{"npc":"Can you check the inventory?","npcNe":"सामानको मौज्दात जाँच्न सक्नुहुन्छ?","goal":"अवश्य, अहिले जाँच गर्छु भन्नुहोस्।","answer":"Sure, I'll check the inventory now.","answerNe":"अवश्य, म अहिले मौज्दात जाँच्छु।","bad1":"Please bring my restaurant bill.","bad2":"This shirt is too small.","accept":["check inventory","count stock","check stock"],"hint":"“I'll…” is short for “I will…”.","after":"Thanks. Let me know when you're finished."},{"npc":"Have you finished counting?","npcNe":"गन्ने काम सक्नुभयो?","goal":"काम सकें र सामान थप्नुपर्छ भन्नुहोस्।","answer":"Yes, I've finished, but we need more supplies.","answerNe":"हो, मैले सकेँ तर थप सामान चाहिन्छ।","bad1":"I need an apple for my lunch.","bad2":"I am visiting the hospital.","accept":["finished supplies","done need more","finished stock"],"hint":"“I've finished” uses present perfect.","after":"Thanks for the update. We'll order more."}]},{"id":"take-bus","emoji":"🚌","title":"Take public transport","ne":"बस यात्रा","category":"Travel","place":"Bus stop · बस स्टप","partner":"Driver","level":"Easy","steps":[{"npc":"Hello! Where are you going?","npcNe":"नमस्ते! तपाईं कहाँ जाँदै हुनुहुन्छ?","goal":"सहरको केन्द्र जान चाहन्छु भन्नुहोस्।","answer":"I'd like to go downtown, please.","answerNe":"म सहरको केन्द्र जान चाहन्छु।","bad1":"Can I make a doctor appointment?","bad2":"I bought a new shirt.","accept":["go downtown","to downtown","city center"],"hint":"“Downtown” is common in US cities.","after":"Sure. This bus goes downtown."},{"npc":"How many tickets do you need?","npcNe":"कति टिकट चाहिन्छ?","goal":"एउटा टिकट चाहिन्छ भन्नुहोस्।","answer":"One ticket, please.","answerNe":"एउटा टिकट दिनुहोस्।","bad1":"I need three tomatoes.","bad2":"My phone is charging.","accept":["one ticket","single ticket","just one"],"hint":"Keep ticket requests simple.","after":"Here you go."},{"npc":"Do you want to know where to get off?","npcNe":"कहाँ ओर्लिने जान्न चाहनुहुन्छ?","goal":"सहर केन्द्रमा पुगेपछि बताइदिन भन्नुहोस्।","answer":"Could you tell me when we reach downtown?","answerNe":"सहरको केन्द्र पुगेपछि बताइदिनुहुन्छ?","bad1":"Can I exchange these shoes?","bad2":"Is the food very spicy?","accept":["tell downtown","reach downtown","when get off","stop downtown"],"hint":"“Tell me when…” is helpful on public transport.","after":"Of course. I'll let you know."}]},{"id":"hotel","emoji":"🏨","title":"Check in at a hotel","ne":"होटलमा चेकइन","category":"Travel","place":"Hotel desk · होटल काउन्टर","partner":"Receptionist","level":"Easy","steps":[{"npc":"Welcome! Do you have a reservation?","npcNe":"स्वागत छ! कोठा बुक गर्नुभएको छ?","goal":"बुक गरेको छु भन्नुहोस्।","answer":"Yes, I have a reservation.","answerNe":"हो, मैले कोठा बुक गरेको छु।","bad1":"I need a doctor's appointment.","bad2":"I would like to order momo.","accept":["have reservation","booked room","booking"],"hint":"“Reservation” and “booking” are both used.","after":"Wonderful. May I have your name?"},{"npc":"Would you prefer one bed or two?","npcNe":"एउटा बेड कि दुई वटा?","goal":"एउटा ठूलो बेड चाहिन्छ भन्नुहोस्।","answer":"One large bed, please.","answerNe":"एउटा ठूलो बेड चाहिन्छ।","bad1":"I bought two phones.","bad2":"Please give me two sandwiches.","accept":["one large bed","one bed","single large bed"],"hint":"“I'd prefer one large bed” also works.","after":"No problem."},{"npc":"Do you need help with your luggage?","npcNe":"सामानसँग मद्दत चाहिन्छ?","goal":"सामान कोठासम्म लैजान मद्दत माग्नुहोस्।","answer":"Could someone help me carry my luggage?","answerNe":"कसैले मेरो सामान बोक्न मद्दत गर्नुहुन्छ?","bad1":"Where can I return a shirt?","bad2":"Can I order more tea?","accept":["help luggage","carry luggage","help bags","carry bags"],"hint":"“Could someone help…?” is a polite request.","after":"Of course. Someone will help you."}]},{"id":"airport","emoji":"✈️","title":"At the airport","ne":"विमानस्थलमा","category":"Travel","place":"Airport · विमानस्थल","partner":"Airline agent","level":"Medium","steps":[{"npc":"Good afternoon! Where are you flying today?","npcNe":"शुभ दिउँसो! आज कहाँ उड्दै हुनुहुन्छ?","goal":"पोखरा जाँदै छु भन्नुहोस्।","answer":"I'm flying to Pokhara today.","answerNe":"म आज पोखरा उड्दै छु।","bad1":"I need a new phone.","bad2":"I'd like some vegetables.","accept":["flying pokhara","going pokhara","flight pokhara"],"hint":"“I'm flying to…” names your destination.","after":"May I see your travel document?"},{"npc":"Are you checking a bag?","npcNe":"सामान चेकइन गर्दै हुनुहुन्छ?","goal":"एउटा झोला चेकइन गर्न चाहन्छु भन्नुहोस्।","answer":"Yes, I'd like to check one bag.","answerNe":"हो, म एउटा झोला चेकइन गर्न चाहन्छु।","bad1":"Can you exchange my shirt?","bad2":"I need a cup of tea.","accept":["check one bag","one checked bag","check bag"],"hint":"“Check a bag” means putting it in the aircraft hold.","after":"Thank you. Here is your boarding pass."},{"npc":"Do you know where your gate is?","npcNe":"गेट कहाँ छ थाहा छ?","goal":"गेट कहाँ छ भनेर सोध्नुहोस्।","answer":"Could you tell me where my gate is?","answerNe":"मेरो गेट कहाँ छ बताइदिनुहुन्छ?","bad1":"Can you book my hospital visit?","bad2":"Where is the nearest shoe store?","accept":["where gate","find gate","which gate"],"hint":"“Gate” means the boarding area.","after":"It's Gate 6, straight ahead."}]},{"id":"bank","emoji":"🏦","title":"At a bank","ne":"बैंकमा कुराकानी","category":"Services","place":"Bank counter · बैंक काउन्टर","partner":"Teller","level":"Medium","steps":[{"npc":"Hello! How may I help you?","npcNe":"नमस्ते! कसरी मद्दत गर्न सक्छु?","goal":"खाता बारे प्रश्न छ भन्नुहोस्।","answer":"I have a question about my account.","answerNe":"मलाई मेरो खाताबारे प्रश्न छ।","bad1":"I'd like a table for three.","bad2":"Where is the bus station?","accept":["question account","help account","about account"],"hint":"You do not need to give private account information in practice.","after":"Certainly. What would you like to know?"},{"npc":"Do you need a statement?","npcNe":"स्टेटमेन्ट चाहिन्छ?","goal":"गत महिनाको स्टेटमेन्ट चाहिन्छ भन्नुहोस्।","answer":"Yes, I'd like last month's statement.","answerNe":"हो, मलाई गत महिनाको स्टेटमेन्ट चाहिन्छ।","bad1":"I'd like a bowl of soup.","bad2":"Can you wash my clothes?","accept":["last month statement","bank statement","monthly statement"],"hint":"“I'd like…” is a courteous request.","after":"I can help with that."},{"npc":"Anything else today?","npcNe":"आज अरू केही चाहिन्छ?","goal":"काम सकियो धन्यवाद भन्नुहोस्।","answer":"That's all, thank you for your help.","answerNe":"यति नै हो, मद्दतका लागि धन्यवाद।","bad1":"I'd like to travel to Pokhara.","bad2":"I need to make a hotel reservation.","accept":["that's all","thank you","thanks","no more"],"hint":"“That's all” is useful when you are done.","after":"You're welcome! Have a nice day."}]},{"id":"phone-repair","emoji":"🛠️","title":"Repair a phone","ne":"फोन मर्मत","category":"Shopping","place":"Repair shop · मर्मत पसल","partner":"Technician","level":"Easy","steps":[{"npc":"Hi there! What's wrong with your phone?","npcNe":"नमस्ते! फोनमा के समस्या छ?","goal":"फोनको स्क्रिन फुटेको छ भन्नुहोस्।","answer":"My phone screen is cracked.","answerNe":"मेरो फोनको स्क्रिन फुटेको छ।","bad1":"I need a hotel reservation.","bad2":"Can I buy some potatoes?","accept":["screen cracked","cracked screen","screen broken","broken screen"],"hint":"“Cracked” means there are lines or breaks in glass.","after":"I see. When did that happen?"},{"npc":"Does the phone still turn on?","npcNe":"फोन अझै चल्छ?","goal":"फोन चल्छ तर टचले काम गर्दैन भन्नुहोस्।","answer":"It turns on, but the touch screen doesn't work.","answerNe":"फोन खुल्छ तर टच स्क्रिनले काम गर्दैन।","bad1":"The soup is delicious.","bad2":"My school is nearby.","accept":["turns on touch","touch not work","screen not respond","touch broken"],"hint":"“It turns on” means the device powers up.","after":"Let me examine it."},{"npc":"Would you like a repair estimate?","npcNe":"मर्मत खर्चको अनुमान चाहिन्छ?","goal":"मर्मत कति खर्च पर्छ भनेर सोध्नुहोस्।","answer":"How much will the repair cost?","answerNe":"मर्मत कति खर्च लाग्छ?","bad1":"Where can I get a bus ticket?","bad2":"I'd like coffee with milk.","accept":["repair cost","how much fix","price repair","estimate cost"],"hint":"Always ask for an estimate before approving work.","after":"I'll check and give you an estimate."}]},{"id":"new-friend","emoji":"🤝","title":"Meet someone new","ne":"नयाँ साथी भेट्ने","category":"Everyday","place":"Community event · भेटघाट","partner":"New friend","level":"Easy","steps":[{"npc":"Hi! I don't think we've met. What's your name?","npcNe":"नमस्ते! हामी पहिले भेटेका छैनौं होला। नाम के हो?","goal":"आफ्नो नाम काल्पनिक राखेर परिचय दिनुहोस्।","answer":"Hi, I'm Sita. Nice to meet you!","answerNe":"नमस्ते, म सीता हुँ। भेटेर खुशी लाग्यो।","bad1":"Can I get my money back?","bad2":"Where is the supermarket?","accept":["i'm sita","my name","nice meet","im sita"],"hint":"Introduce yourself and say “Nice to meet you.”","after":"Nice to meet you too, Sita!"},{"npc":"Where are you from?","npcNe":"तपाईं कहाँबाट हुनुहुन्छ?","goal":"नेपालबाट आएको भन्नुहोस्।","answer":"I'm originally from Nepal.","answerNe":"म मूलतः नेपालबाट हुँ।","bad1":"I would like one bus ticket.","bad2":"My phone screen is cracked.","accept":["from nepal","originally nepal","nepal"],"hint":"“Originally from” describes where you are from.","after":"That's wonderful!"},{"npc":"What do you like doing in your free time?","npcNe":"फुर्सदमा के गर्न मन पर्छ?","goal":"घुम्न र किताब पढ्न मन पर्छ भन्नुहोस्।","answer":"I enjoy traveling and reading books.","answerNe":"मलाई घुम्न र किताब पढ्न मन पर्छ।","bad1":"I need a receipt for a shirt.","bad2":"My doctor is in the hospital.","accept":["travel reading","read books","enjoy reading","like travel"],"hint":"“I enjoy…” is a natural way to describe hobbies.","after":"Me too! It was nice talking with you."}]},{"id":"school-help","emoji":"📚","title":"Ask a teacher","ne":"शिक्षकसँग कुराकानी","category":"Everyday","place":"Classroom · कक्षाकोठा","partner":"Teacher","level":"Easy","steps":[{"npc":"Good morning! Do you have a question?","npcNe":"शुभ प्रभात! कुनै प्रश्न छ?","goal":"एउटा शब्दको अर्थ बुझिनँ भन्नुहोस्।","answer":"I don't understand this word.","answerNe":"म यो शब्द बुझ्दिनँ।","bad1":"I want to buy a new phone.","bad2":"Where can I return my shirt?","accept":["don't understand word","meaning word","what means"],"hint":"“I don't understand…” is okay to say in class.","after":"No problem. Let's look at it together."},{"npc":"Would you like another example?","npcNe":"अर्को उदाहरण चाहिन्छ?","goal":"अर्को उदाहरण दिनुहोस् भन्नुहोस्।","answer":"Could you give me another example?","answerNe":"अर्को उदाहरण दिनुहुन्छ?","bad1":"How much is this shirt?","bad2":"Please give me a hospital appointment.","accept":["another example","more examples","example please"],"hint":"“Could you…” is polite when asking a teacher.","after":"Of course! Here's another example."},{"npc":"Does that make sense now?","npcNe":"अहिले बुझ्नुभयो?","goal":"अहिले बुझेँ, धन्यवाद भन्नुहोस्।","answer":"Yes, I understand now. Thank you!","answerNe":"हो, अहिले बुझें। धन्यवाद।","bad1":"I need a taxi to the airport.","bad2":"I like my new shoes.","accept":["understand now","got it thank","yes thank"],"hint":"“I understand now” shows progress.","after":"Excellent! Keep practicing."}]}];
const topics=['All','Shopping','Healthcare','Food & Drink','Travel','Work','Services','Everyday'];
function el(d,tag,cls,text){const n=d.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=String(text);return n;}
function add(d,p,tag,cls,text){const n=el(d,tag,cls,text);p.appendChild(n);return n;}
function normalize(s){return String(s||'').toLowerCase().normalize('NFKC').replace(/[’']/g,'').replace(/[^a-z0-9\u0900-\u097f ]/g,' ').replace(/\s+/g,' ').trim();}
function validTyped(typed,step){
 const value=normalize(typed),model=normalize(step.answer);
 if(!value||value.length<4)return false;
 if(value===model||value.includes(model))return true;
 return step.accept.some(choice=>{
  const terms=normalize(choice).split(' ').filter(Boolean);
  return terms.length&&terms.every(t=>value.split(' ').some(w=>w===t||w.startsWith(t)&&(t.length>=5)));
 });
}
function shuffledChoices(step){
 const values=[{value:step.answer,correct:true},{value:step.bad1,correct:false},{value:step.bad2,correct:false}];
 for(let i=values.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[values[i],values[j]]=[values[j],values[i]];}
 return values;
}
function speak(d,value){
 const v=d.defaultView;
 try{if(typeof v.speak==='function'){v.speak(value,.88,'en');return;}
 if(v.speechSynthesis&&v.SpeechSynthesisUtterance){
  v.speechSynthesis.cancel();const u=new v.SpeechSynthesisUtterance(value);
  u.lang='en-US';u.rate=.88;v.speechSynthesis.speak(u);
 }}catch(_){}
}
function nativeInput(d,box){
 const field=box.querySelector('textarea')||box.querySelector('input[type="text"]');
 return field;
}
function sendToNative(d,ask,prompt){
 const field=nativeInput(d,ask);if(!field)return false;
 const view=d.defaultView,constructor=field.tagName==='TEXTAREA'?view.HTMLTextAreaElement:view.HTMLInputElement;
 const setter=constructor&&Object.getOwnPropertyDescriptor(constructor.prototype,'value')?.set;
 if(setter)setter.call(field,prompt);else field.value=prompt;
 field.dispatchEvent(new view.Event('input',{bubbles:true}));
 field.focus({preventScroll:true});return true;
}
window.enhanceCoachDashboard=function(doc){
 if(!doc?.body||!doc.head)return;
 const oldHero=doc.querySelector('.coach-top'),ask=doc.querySelector('.coach-ask');
 if(!oldHero||!ask||!oldHero.parentElement)return;
 if(doc.getElementById('sikauCoachConversations')?.isConnected)return;
 const previous=doc.getElementById('sikauCoachConversations');if(previous)previous.remove();
 if(!doc.getElementById('sikauCoachDesignStyles')){
  const sheet=el(doc,'link');sheet.id='sikauCoachDesignStyles';sheet.rel='stylesheet';sheet.href=STYLE_URL;doc.head.appendChild(sheet);
 }else{
  const sheet=doc.getElementById('sikauCoachDesignStyles');
  if(sheet.href!==STYLE_URL)sheet.href=STYLE_URL;
 }
 const host=oldHero.parentElement;host.classList.add('sikau-convo-board');
 oldHero.classList.add('sikau-coach-native-hero');
 // Clean up retired presentation widgets without touching native lessons.
 doc.getElementById('sikauCoachBanner')?.remove();
 doc.getElementById('sikauCoachExtras')?.remove();
 doc.getElementById('sikauCoachSide')?.remove();
 const shell=el(doc,'section','sikau-convo');shell.id='sikauCoachConversations';
 oldHero.parentElement.insertBefore(shell,oldHero);
 let active=null,index=0,category='All',search='',mode='choose',showNepali=true,attempts=0,successful=0,finished=false,choices=[],choiceError='',typedError='',reveal=false;
 let lastId=null;
 const top=add(doc,shell,'header','sikau-convo-hero');
 const copy=add(doc,top,'div','sikau-convo-hero-copy');
 add(doc,copy,'div','sikau-convo-kicker','ENGLISH SIKAU · REAL-LIFE PRACTICE');
 add(doc,copy,'h2','','Speak English for real life');
 add(doc,copy,'p','','अंग्रेजीमा वास्तविक जीवनका कुराकानी सिकौं');
 add(doc,copy,'small','','Choose a situation. Respond to real conversations. Learn step by step.');
 const actions=add(doc,top,'div','sikau-convo-hero-actions');
 const surprise=add(doc,actions,'button','sikau-convo-surprise','🎲 Surprise scenario · नयाँ परिस्थिति');
 surprise.type='button';
 const ai=add(doc,actions,'button','sikau-convo-ai','✨ Ask AI Coach · प्रश्न सोध्नुहोस्');
 ai.type='button';
 const banner=add(doc,shell,'div','sikau-convo-intro');
 add(doc,banner,'strong','','Pick a place, then start talking · ठाउँ छानेर कुराकानी सुरु गर्नुहोस्');
 const toggleNe=add(doc,banner,'button','sikau-convo-language','🇳🇵 Nepali help: On');toggleNe.type='button';
 const browser=add(doc,shell,'section','sikau-convo-browser');
 const filters=add(doc,browser,'div','sikau-convo-filters');
 const topicsRow=add(doc,filters,'div','sikau-convo-topics');
 const searchBox=add(doc,filters,'label','sikau-convo-search');
 add(doc,searchBox,'span','','🔎');
 const searchInput=add(doc,searchBox,'input','','');searchInput.type='search';searchInput.placeholder='Search: hospital, restaurant, directions…';
 searchInput.setAttribute('aria-label','Search real life situations');
 const cards=add(doc,browser,'div','sikau-convo-cards');
 const footer=add(doc,browser,'p','sikau-convo-list-note','Each situation has a guided conversation and Nepali support · हरेक परिस्थितिमा अंग्रेजी र नेपाली सहायता');
 const stage=add(doc,shell,'section','sikau-convo-stage');stage.hidden=true;
 const notice=add(doc,shell,'p','sikau-convo-global-status','');notice.setAttribute('role','status');
 function filtered(){
  return scenarios.filter(s=>(category==='All'||s.category===category)&&
   (!search||normalize([s.title,s.ne,s.place,s.category,s.partner].join(' ')).includes(normalize(search))||
   [s.title,s.ne,s.place,s.partner].join(' ').toLowerCase().includes(search.toLowerCase())));
 }
 function drawTopics(){
  topicsRow.replaceChildren();
  for(const item of topics){
   const b=add(doc,topicsRow,'button','sikau-convo-topic'+(category===item?' active':''),item);
   b.type='button';b.setAttribute('aria-pressed',String(category===item));
   b.addEventListener('click',()=>{category=item;drawTopics();drawCards();});
  }
 }
 function drawCards(){
  cards.replaceChildren();
  const shown=filtered();
  if(!shown.length){add(doc,cards,'p','sikau-convo-empty','No matching situation. Try a different topic. · अर्को विषय खोज्नुहोस्।');return;}
  for(const s of shown){
   const b=add(doc,cards,'button','sikau-convo-situation');b.type='button';
   b.setAttribute('aria-label',s.title+' · '+s.ne);
   add(doc,b,'span','sikau-convo-situation-icon',s.emoji);
   const body=add(doc,b,'span','sikau-convo-situation-main');
   add(doc,body,'strong','',s.title);
   add(doc,body,'small','',s.ne);
   add(doc,b,'span','sikau-convo-situation-meta',s.level+' · '+s.steps.length+' turns');
   b.addEventListener('click',()=>start(s));
  }
 }
 function resetStage(){
  index=0;attempts=0;successful=0;finished=false;choices=[];choiceError='';typedError='';reveal=false;
 }
 function start(scene){
  lastId=scene.id;active=scene;resetStage();
  browser.hidden=true;stage.hidden=false;
  shell.classList.add('sikau-convo-learning');
  renderStage();stage.scrollIntoView?.({behavior:'smooth',block:'start'});
 }
 function back(){
  active=null;stage.hidden=true;browser.hidden=false;shell.classList.remove('sikau-convo-learning');
  drawCards();
 }
 function goNext(){
  if(!active)return;
  if(index>=active.steps.length-1){finished=true;}else{index++;choices=[];choiceError='';typedError='';reveal=false;}
  renderStage();
 }
 function setMode(value){mode=value;choiceError='';typedError='';reveal=false;choices=[];renderStage();}
 function renderStage(){
  stage.replaceChildren();
  if(!active)return;
  const head=add(doc,stage,'div','sikau-convo-stage-head');
  const backBtn=add(doc,head,'button','sikau-convo-back','← All situations · सबै विषय');backBtn.type='button';backBtn.addEventListener('click',back);
  const meta=add(doc,head,'div','sikau-convo-stage-meta');
  add(doc,meta,'strong','',active.emoji+' '+active.title);
  if(showNepali)add(doc,meta,'small','',active.ne+' · '+active.place);
  if(finished){
   const done=add(doc,stage,'div','sikau-convo-complete');
   add(doc,done,'div','sikau-convo-complete-icon','🏆');
   add(doc,done,'h3','','You finished the conversation!');
   add(doc,done,'p','','तपाईंले वास्तविक जीवनको कुराकानी अभ्यास पूरा गर्नुभयो।');
   add(doc,done,'p','',active.steps.length+' turns practiced · '+successful+' guided responses completed');
   add(doc,done,'small','','This is practice-only feedback; official learning XP and progress are unchanged.');
   const buttons=add(doc,done,'div','sikau-convo-finish-actions');
   const retry=add(doc,buttons,'button','sikau-convo-primary','↻ Try again · फेरि अभ्यास');retry.type='button';retry.addEventListener('click',()=>start(active));
   const another=add(doc,buttons,'button','sikau-convo-secondary','Explore more situations · थप विषय');another.type='button';another.addEventListener('click',back);
   return;
  }
  const step=active.steps[index];
  const progress=add(doc,stage,'div','sikau-convo-progress');
  add(doc,progress,'span','','Conversation '+(index+1)+' of '+active.steps.length+' · चरण');
  const track=add(doc,progress,'div','sikau-convo-track');
  const fill=add(doc,track,'div','sikau-convo-track-fill');fill.style.width=((index+1)/active.steps.length*100)+'%';
  const cols=add(doc,stage,'div','sikau-convo-session');
  const situ=add(doc,cols,'div','sikau-convo-dialogue');
  const setting=add(doc,situ,'div','sikau-convo-setting',active.emoji+' '+active.place);
  const utter=add(doc,situ,'div','sikau-convo-utterance');
  add(doc,utter,'span','sikau-convo-speaker',active.partner+' says · भन्नुहुन्छ');
  add(doc,utter,'p','sikau-convo-npc',step.npc);
  if(showNepali)add(doc,utter,'p','sikau-convo-npc-ne',step.npcNe);
  const hear=add(doc,utter,'button','sikau-convo-hear','🔊 Listen · सुन्नुहोस्');
  hear.type='button';hear.addEventListener('click',()=>speak(doc,step.npc));
  add(doc,situ,'div','sikau-convo-your-turn','💬 Your turn · अब तपाईंको पालो');
  add(doc,situ,'p','sikau-convo-goal',step.goal);
  const smallHelp=add(doc,situ,'p','sikau-convo-guide','You can choose a reply or write your own. · उत्तर छान्नुहोस् वा आफैं लेख्नुहोस्।');
  const feedback=add(doc,cols,'div','sikau-convo-reply');
  const selector=add(doc,feedback,'div','sikau-convo-modes');
  for(const [key,english,ne] of [['choose','👆 Tap a reply','उत्तर छान्नुहोस्'],['write','✍️ Write my reply','आफैं लेख्नुहोस्']]){
   const m=add(doc,selector,'button','sikau-convo-mode'+(mode===key?' active':''),english);
   m.type='button';m.setAttribute('aria-pressed',String(mode===key));m.title=ne;
   m.addEventListener('click',()=>setMode(key));
  }
  const result=add(doc,feedback,'div','sikau-convo-feedback');
  result.setAttribute('role','status');result.setAttribute('aria-live','polite');
  let resolved=false;
  function showResult(success,model,custom){
   result.replaceChildren();result.className='sikau-convo-feedback '+(success?'success':'warning');
   const header=add(doc,result,'strong','',success?'✅ Good response! · राम्रो उत्तर':'💡 Try again · फेरि प्रयास');
   add(doc,result,'p','',success?step.answer:'Choose a reply that fits the situation, or try different words.');
   if(showNepali)add(doc,result,'small','',success?step.answerNe:step.goal);
   if(success){
    add(doc,result,'p','sikau-convo-next-line','💬 '+active.partner+': '+step.after);
    const next=add(doc,result,'button','sikau-convo-primary',index===active.steps.length-1?'Finish conversation →':'Next turn → · अर्को चरण');
    next.type='button';next.addEventListener('click',goNext);
   }
  }
  if(mode==='choose'){
   choices=shuffledChoices(step);
   const options=add(doc,feedback,'div','sikau-convo-options');
   for(const item of choices){
    const b=add(doc,options,'button','sikau-convo-option',item.value);b.type='button';
    b.addEventListener('click',()=>{
     attempts++;
     if(item.correct){successful++;options.querySelectorAll('button').forEach(x=>x.disabled=true);showResult(true);}
     else{showResult(false);}
    });
   }
  }else{
   add(doc,feedback,'label','sikau-convo-label','Write what you would say · आफूले भन्ने अंग्रेजी लेख्नुहोस्');
   const input=add(doc,feedback,'textarea','sikau-convo-input');
   input.rows=3;input.maxLength=500;input.placeholder='Example: I would like to…';
   input.setAttribute('aria-label','Type your English response');
   const controls=add(doc,feedback,'div','sikau-convo-write-controls');
   const check=add(doc,controls,'button','sikau-convo-primary','Check reply · उत्तर जाँच्नुहोस्');check.type='button';
   const hint=add(doc,controls,'button','sikau-convo-secondary','💡 Hint · संकेत');hint.type='button';
   const revealBtn=add(doc,controls,'button','sikau-convo-secondary','👁 Model reply · नमुना');revealBtn.type='button';
   function evaluate(){
    const value=input.value.trim();if(!value){result.className='sikau-convo-feedback warning';result.textContent='Write a sentence to practice. · कृपया वाक्य लेख्नुहोस्।';return;}
    attempts++;
    if(validTyped(value,step)){
      successful++;check.disabled=true;showResult(true);
    }else{
      result.className='sikau-convo-feedback warning';
      result.replaceChildren();
      add(doc,result,'strong','','Try another phrase · अर्को तरिका प्रयोग गर्नुहोस्');
      add(doc,result,'p','','This guided checker looks for key phrases, not full AI grammar. A different correct expression may not match.');
      add(doc,result,'small','','अर्थ मिल्ने शब्द प्रयोग गर्नुहोस्। चाहेमा नमुना उत्तर हेर्नुहोस्।');
    }
   }
   check.addEventListener('click',evaluate);
   input.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();evaluate();}});
   hint.addEventListener('click',()=>{result.className='sikau-convo-feedback info';result.textContent='💡 '+step.hint;});
   revealBtn.addEventListener('click',()=>{
    result.className='sikau-convo-feedback info';result.replaceChildren();
    add(doc,result,'strong','','Model reply · नमुना उत्तर');
    add(doc,result,'p','',step.answer);
    if(showNepali)add(doc,result,'small','',step.answerNe);
    const copy=add(doc,result,'button','sikau-convo-secondary','🔊 Hear example · सुन्नुहोस्');copy.type='button';copy.addEventListener('click',()=>speak(doc,step.answer));
   });
  }
  const skip=add(doc,feedback,'button','sikau-convo-skip','Skip this turn · अर्को चरणमा जानुहोस् →');
  skip.type='button';skip.addEventListener('click',goNext);
  const note=add(doc,feedback,'div','sikau-convo-tip');
  add(doc,note,'strong','','🌱 Useful language');
  add(doc,note,'p','',step.hint);
  const realCoach=add(doc,feedback,'button','sikau-convo-native-link','✨ Ask AI Coach to correct my own reply →');
  realCoach.type='button';
  realCoach.addEventListener('click',()=>{
   host.classList.add('sikau-convo-ai-open');
   const input=feedback.querySelector('textarea');
   const own=(input?.value||'').trim();
   const prompt='Act as my friendly English conversation tutor. Situation: '+active.title+'. The other person said: '+step.npc+'. I want to say (Nepali): '+step.goal+'. My English reply: '+(own||'[I need help forming my answer]')+'. Check meaning and grammar, give a polished natural English reply, a Nepali explanation, and a sample follow-up question. Do not claim I completed a verified lesson.';
   if(sendToNative(doc,ask,prompt)){
    ask.scrollIntoView?.({behavior:'smooth',block:'center'});
    notice.textContent='AI Coach question prepared. Press the existing Ask Coach button. · प्रश्न तयार छ, Ask Coach थिच्नुहोस्।';
   }else{notice.textContent='Open the Coach form below to write your question. · तलको कोच फारममा प्रश्न लेख्नुहोस्।';}
  });
 }
 searchInput.addEventListener('input',()=>{search=searchInput.value;drawCards();});
 toggleNe.addEventListener('click',()=>{
  showNepali=!showNepali;
  toggleNe.textContent='🇳🇵 Nepali help: '+(showNepali?'On':'Off');
  if(active)renderStage();else drawCards();
 });
 surprise.addEventListener('click',()=>{
  const options=scenarios.filter(s=>s.id!==lastId);
  const list=options.length?options:scenarios;
  start(list[Math.floor(Math.random()*list.length)]);
 });
 ai.addEventListener('click',()=>{
  host.classList.toggle('sikau-convo-ai-open');
  if(host.classList.contains('sikau-convo-ai-open'))ask.scrollIntoView?.({behavior:'smooth',block:'center'});
 });
 drawTopics();drawCards();
};
})();