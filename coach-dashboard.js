/* English Sikau Real-Life Conversation Coach.
 * Presentation-layer guided practice in an authorized, loaded lesson frame.
 * No new login, trial, payment, storage or verified XP operations.
 * The user's existing Ask Coach service remains the optional open-ended tool.
 */
(function(){
'use strict';
const STYLE_URL=new URL('coach-dashboard.css?v=20261021-nav-r2',document.baseURI).href;
const scenarios=[{"id":"return-shirt","emoji":"👕","title":"Return clothing","ne":"लुगा फिर्ता","category":"Shopping","place":"Clothing store · कपडा पसल","partner":"Store assistant","level":"Easy","steps":[{"npc":"Hello! How can I help you today?","npcNe":"नमस्ते! म तपाईंलाई कसरी मद्दत गर्न सक्छु?","goal":"यो कमिज फिर्ता गर्न चाहन्छु भन्नुहोस्।","answer":"I'd like to return this shirt, please.","answerNe":"म यो कमिज फिर्ता गर्न चाहन्छु।","bad1":"I was walking here yesterday.","bad2":"The shirt is blue and the sky is blue.","accept":["return shirt","return this","bring shirt back"],"hint":"Use “I'd like to return…” to be polite.","after":"Of course. Do you have your receipt?"},{"npc":"Do you have your receipt?","npcNe":"के तपाईंसँग रसिद छ?","goal":"रसिद छ भन्नुहोस्।","answer":"Yes, I have the receipt right here.","answerNe":"हो, रसिद यहीँ छ।","bad1":"Please give me another sandwich.","bad2":"My receipt likes the weather.","accept":["have receipt","here receipt","receipt right here"],"hint":"“Here is my receipt” is also natural.","after":"Thanks. Is there a problem with the shirt?"},{"npc":"What is wrong with the shirt?","npcNe":"कमिजमा के समस्या छ?","goal":"साइज सानो छ भन्नुहोस्।","answer":"It's too small for me.","answerNe":"यो मलाई धेरै सानो भयो।","bad1":"I want to buy a larger television.","bad2":"I'm from Kathmandu, thank you.","accept":["too small","size small","doesn't fit","does not fit"],"hint":"You can say “It doesn't fit.”","after":"Would you like a refund or an exchange?"},{"npc":"Would you like a refund or an exchange?","npcNe":"पैसा फिर्ता चाहिन्छ कि साट्न चाहनुहुन्छ?","goal":"पैसा फिर्ता चाहिन्छ भन्नुहोस्।","answer":"I'd prefer a refund, please.","answerNe":"म पैसा फिर्ता लिन चाहन्छु।","bad1":"My refund is at school.","bad2":"No, I want a bus ticket.","accept":["refund","money back","return my money"],"hint":"“I'd prefer…” is softer than “I want…”.","after":"Absolutely. I'll process the refund. Thank you!"}]},{"id":"buy-phone","emoji":"📱","title":"Buy a phone","ne":"फोन किन्नु","category":"Shopping","place":"Phone shop · मोबाइल पसल","partner":"Salesperson","level":"Easy","steps":[{"npc":"Welcome! What are you looking for?","npcNe":"स्वागत छ! तपाईं के खोज्दै हुनुहुन्छ?","goal":"नयाँ फोन चाहिन्छ भन्नुहोस्।","answer":"I'm looking for a new phone.","answerNe":"म नयाँ फोन खोज्दै छु।","bad1":"I'd like to book a hotel.","bad2":"I saw a movie yesterday.","accept":["new phone","buy phone","looking phone"],"hint":"get used to “I'm looking for…”","after":"We have many models. What is your budget?"},{"npc":"What is your budget?","npcNe":"तपाईंको बजेट कति छ?","goal":"पाँच सय डलरभन्दा कम भन्नुहोस्।","answer":"My budget is under five hundred dollars.","answerNe":"मेरो बजेट पाँच सय डलरभन्दा कम छ।","bad1":"I would like a bag of rice.","bad2":"I am going to school tomorrow.","accept":["under five hundred","under 500","less than 500","budget 500"],"hint":"Use “under” or “less than” for a maximum price.","after":"I can show you a few phones in that range."},{"npc":"Would you like to compare these two phones?","npcNe":"यी दुई फोन तुलना गर्न चाहनुहुन्छ?","goal":"क्यामेरा र ब्याट्रीबारे सोध्नुहोस्।","answer":"Which phone has a better camera and battery?","answerNe":"कुन फोनको क्यामेरा र ब्याट्री राम्रो छ?","bad1":"What time is the restaurant open?","bad2":"I need a new shirt.","accept":["camera battery","better camera","better battery"],"hint":"“Which phone has…?” asks about features.","after":"This one has a stronger battery."},{"npc":"Would you like to buy it today?","npcNe":"आज नै किन्न चाहनुहुन्छ?","goal":"वारेन्टी छ कि छैन सोध्नुहोस्।","answer":"Does it come with a warranty?","answerNe":"के यसमा वारेन्टी छ?","bad1":"Is there a train to the airport?","bad2":"I like watermelon juice.","accept":["warranty","guarantee"],"hint":"Ask “Does it come with…?” to check what is included.","after":"Yes, it has a one-year warranty."}]},{"id":"directions","emoji":"🗺️","title":"Ask for directions","ne":"बाटो सोध्नु","category":"Travel","place":"City street · सहरको सडक","partner":"Local resident","level":"Easy","steps":[{"npc":"Excuse me, can I help you?","npcNe":"माफ गर्नुहोस्, म मद्दत गर्न सक्छु?","goal":"अस्पताल कहाँ छ भनेर सोध्नुहोस्।","answer":"Could you tell me where the hospital is?","answerNe":"अस्पताल कहाँ छ भनेर बताइदिनुहुन्छ?","bad1":"I would like to buy a shirt.","bad2":"I ate rice today.","accept":["where hospital","hospital direction","find hospital","get hospital"],"hint":"“Could you tell me where…?” sounds polite.","after":"The hospital is near the main road."},{"npc":"Are you walking or driving?","npcNe":"तपाईं हिँडेर जाँदै हुनुहुन्छ कि गाडीमा?","goal":"हिँडेर जाँदै छु भन्नुहोस्।","answer":"I'm walking there.","answerNe":"म हिँडेर जाँदै छु।","bad1":"My car is a yellow banana.","bad2":"I need a small shirt.","accept":["walking","on foot","walk there"],"hint":"“I'm going on foot” means walking.","after":"Great! Go straight for two blocks."},{"npc":"Do I turn left at the lights?","npcNe":"बत्ती भएको ठाउँमा बायाँ मोड्ने हो?","goal":"बायाँ मोड्नुपर्ने हो भनेर पुष्टि गर्नुहोस्।","answer":"Should I turn left at the traffic lights?","answerNe":"ट्राफिक बत्तीमा बायाँ मोड्नुपर्छ?","bad1":"My favorite food is momo.","bad2":"Where is my homework?","accept":["turn left","left at lights","left traffic"],"hint":"Use “Should I…?” to confirm directions.","after":"Yes, then the hospital will be on your right."},{"npc":"Anything else?","npcNe":"अरू केही चाहिन्छ?","goal":"धन्यवाद भन्नुहोस्।","answer":"Thank you so much for your help!","answerNe":"तपाईंको मद्दतका लागि धेरै धन्यवाद!","bad1":"Can I return this phone?","bad2":"The weather is green.","accept":["thank you","thanks"],"hint":"“Thank you so much” is friendly and natural.","after":"You're very welcome. Have a good day!"}]},{"id":"call-hospital","emoji":"☎️","title":"Call for an appointment","ne":"फोनबाट अपोइन्टमेन्ट","category":"Healthcare","place":"Phone call · टेलिफोन","partner":"Hospital receptionist","level":"Medium","steps":[{"npc":"Good morning, Valley Clinic. How may I help you?","npcNe":"शुभ प्रभात, भ्याली क्लिनिक। कसरी मद्दत गर्न सक्छु?","goal":"डाक्टरसँग भेट्ने समय मिलाउन चाहन्छु भन्नुहोस्।","answer":"I'd like to make an appointment with a doctor.","answerNe":"म डाक्टरसँग भेट्ने समय मिलाउन चाहन्छु।","bad1":"Can I order a pizza, please?","bad2":"Where can I buy a jacket?","accept":["make appointment","book appointment","see doctor","schedule visit"],"hint":"“Make an appointment” is a standard expression.","after":"Certainly. Is this for a routine visit?"},{"npc":"What is the reason for your appointment?","npcNe":"अपोइन्टमेन्टको कारण के हो?","goal":"सामान्य स्वास्थ्य जाँचका लागि हो भन्नुहोस्।","answer":"It's for a routine checkup.","answerNe":"यो सामान्य स्वास्थ्य जाँचका लागि हो।","bad1":"I need directions to the museum.","bad2":"I lost my bus ticket.","accept":["routine checkup","regular checkup","annual physical","general checkup","checkup"],"hint":"“Routine checkup” means a regular health visit.","after":"We have an opening on Thursday."},{"npc":"Would Thursday at ten work for you?","npcNe":"बिहीबार दस बजे ठीक हुन्छ?","goal":"त्यो समय ठीक छ भन्नुहोस्।","answer":"Yes, Thursday at ten works for me.","answerNe":"हो, बिहीबार दस बजे ठीक छ।","bad1":"I want a refund for my shoes.","bad2":"My phone has a nice camera.","accept":["thursday ten","thursday 10","time works","that works","yes please"],"hint":"“That works for me” means the time is convenient.","after":"Great. Please arrive fifteen minutes early."},{"npc":"Do you have any questions?","npcNe":"के तपाईंको कुनै प्रश्न छ?","goal":"के ल्याउनुपर्ने हो भनेर सोध्नुहोस्।","answer":"What should I bring to my appointment?","answerNe":"मैले अपोइन्टमेन्टमा के ल्याउनुपर्छ?","bad1":"Can I get a large coffee?","bad2":"The sky is cloudy.","accept":["what bring","need bring","bring appointment","bring insurance"],"hint":"A useful question to ask during a phone booking.","after":"Please bring your ID and insurance card, if you have one."}]},{"id":"hospital-checkin","emoji":"🏥","title":"Check in at a hospital","ne":"अस्पतालमा दर्ता","category":"Healthcare","place":"Hospital desk · अस्पताल काउन्टर","partner":"Receptionist","level":"Easy","steps":[{"npc":"Hello! How can I help you?","npcNe":"नमस्ते! म कसरी मद्दत गर्न सक्छु?","goal":"अपोइन्टमेन्ट छ भनेर भन्नुहोस्।","answer":"I have an appointment at eleven.","answerNe":"मेरो एघार बजे अपोइन्टमेन्ट छ।","bad1":"I'd like to buy apples.","bad2":"I need to return a shirt.","accept":["have appointment","appointment eleven","appointment 11"],"hint":"Start with “I have an appointment.”","after":"May I have your name, please?"},{"npc":"Can you confirm your date of birth?","npcNe":"जन्ममिति पुष्टि गर्न सक्नुहुन्छ?","goal":"जन्ममिति दिन तयार छु भन्नुहोस्, वास्तविक जानकारी आवश्यक छैन।","answer":"Yes, I can confirm my date of birth.","answerNe":"हो, म मेरो जन्ममिति पुष्टि गर्न सक्छु।","bad1":"The bus is near the lake.","bad2":"This is my shopping receipt.","accept":["confirm birth","date of birth","yes i can"],"hint":"Avoid entering real personal details in practice.","after":"Thank you. Do you have your insurance card?"},{"npc":"Do you have your insurance card?","npcNe":"बीमाको कार्ड छ?","goal":"कार्ड छ भन्नुहोस्।","answer":"Yes, I have my insurance card.","answerNe":"हो, मसँग बीमाको कार्ड छ।","bad1":"I'd like some hot tea.","bad2":"Can you repair my phone?","accept":["insurance card","have insurance","here my card"],"hint":"“Here is my insurance card” also works.","after":"Thanks. Please take a seat."},{"npc":"Do you know where to wait?","npcNe":"कहाँ पर्खने थाहा छ?","goal":"कहाँ बस्ने भनेर सोध्नुहोस्।","answer":"Where should I wait, please?","answerNe":"म कहाँ पर्खनुपर्छ?","bad1":"How expensive is this phone?","bad2":"I want a refund.","accept":["where wait","where sit","waiting area"],"hint":"Use “Where should I…?” for directions.","after":"Please wait in the seating area over there."}]},{"id":"restaurant","emoji":"🍽️","title":"Order at a restaurant","ne":"रेस्टुरेन्टमा खाना","category":"Food & Drink","place":"Restaurant · रेस्टुरेन्ट","partner":"Server","level":"Easy","steps":[{"npc":"Welcome! How many people are dining?","npcNe":"स्वागत छ! कति जना खाना खानुहुन्छ?","goal":"दुई जनाका लागि टेबल माग्नुहोस्।","answer":"A table for two, please.","answerNe":"कृपया दुई जनाका लागि टेबल।","bad1":"I need to buy a phone.","bad2":"I want to catch a bus.","accept":["table two","two people","two please"],"hint":"“A table for two” is a useful restaurant phrase.","after":"Right this way. Here are your menus."},{"npc":"Are you ready to order?","npcNe":"अर्डर दिन तयार हुनुहुन्छ?","goal":"मोमो र पानी माग्नुहोस्।","answer":"I'd like momo and a glass of water, please.","answerNe":"म मोमो र एक गिलास पानी चाहन्छु।","bad1":"I need a refund for my shirt.","bad2":"Where is the train station?","accept":["momo water","momo glass","order momo"],"hint":"“I'd like…” is more polite than “Give me…”.","after":"Sure! Would you like anything else?"},{"npc":"Would you like your food spicy?","npcNe":"खाना पिरो चाहिन्छ?","goal":"अलि कम पिरो बनाउन अनुरोध गर्नुहोस्।","answer":"Could you make it less spicy, please?","answerNe":"कृपया अलि कम पिरो बनाइदिनुहुन्छ?","bad1":"Can I borrow your notebook?","bad2":"I like new phones.","accept":["less spicy","not too spicy","mild please","not spicy"],"hint":"Use “Could you…?” for a polite request.","after":"Of course. I'll ask the kitchen."},{"npc":"How was your meal?","npcNe":"खाना कस्तो लाग्यो?","goal":"खाना मिठो थियो र बिल चाहिन्छ भन्नुहोस्।","answer":"It was delicious. Could we have the bill, please?","answerNe":"खाना मिठो थियो। बिल दिनुहुन्छ?","bad1":"Can you show me the hospital?","bad2":"I forgot my homework.","accept":["delicious bill","bill please","check please","food good bill"],"hint":"“The bill” or “the check” is natural.","after":"Thank you! I'll bring the bill now."}]},{"id":"groceries","emoji":"🛒","title":"Grocery shopping","ne":"किराना किनमेल","category":"Shopping","place":"Grocery store · किराना पसल","partner":"Store worker","level":"Easy","steps":[{"npc":"Hi! Are you looking for something?","npcNe":"नमस्ते! तपाईं केही खोज्दै हुनुहुन्छ?","goal":"स्याउ कहाँ छ भनेर सोध्नुहोस्।","answer":"Where can I find the apples?","answerNe":"स्याउ कहाँ पाउँछु?","bad1":"I need a doctor.","bad2":"Where is the hotel?","accept":["find apples","where apples","apples aisle"],"hint":"“Where can I find…?” helps in stores.","after":"The apples are in the produce section."},{"npc":"Do you need anything else?","npcNe":"अरू केही चाहिन्छ?","goal":"ताजा सागसब्जी पनि चाहिन्छ भन्नुहोस्।","answer":"Yes, I'm looking for fresh vegetables too.","answerNe":"हो, मलाई ताजा तरकारी पनि चाहिन्छ।","bad1":"My train is leaving soon.","bad2":"I'd like a room with a view.","accept":["fresh vegetables","looking vegetables","need vegetables"],"hint":"“Fresh produce” includes fruits and vegetables.","after":"They are beside the fruit."},{"npc":"Would you like a bag?","npcNe":"झोला चाहिन्छ?","goal":"पुनःप्रयोग गर्न मिल्ने झोला छ भन्नुहोस्।","answer":"No, thank you. I brought my own bag.","answerNe":"पर्दैन, धन्यवाद। मैले आफ्नै झोला ल्याएको छु।","bad1":"Please book my flight.","bad2":"I need to return my car.","accept":["own bag","brought bag","have bag","no bag"],"hint":"You can politely decline with “No, thank you.”","after":"Great! Have a good day."}]},{"id":"pharmacy","emoji":"💊","title":"At the pharmacy","ne":"औषधि पसलमा","category":"Healthcare","place":"Pharmacy · औषधि पसल","partner":"Pharmacist","level":"Medium","steps":[{"npc":"Hello, what can I help you find?","npcNe":"नमस्ते, के खोज्न मद्दत गरौं?","goal":"सामान्य दुखाइका लागि औषधिबारे सोध्न चाहन्छु भन्नुहोस्।","answer":"Could I ask about medicine for a headache?","answerNe":"टाउको दुखाइका लागि औषधिबारे सोध्न मिल्छ?","bad1":"I want to buy a winter coat.","bad2":"Can you show me your phones?","accept":["medicine headache","headache medicine","headache relief"],"hint":"This is language practice, not medication advice.","after":"Of course. Are you taking any other medicines?"},{"npc":"Do you have any allergies?","npcNe":"के तपाईंलाई कुनै एलर्जी छ?","goal":"थाहा छैन, डाक्टर वा फार्मासिस्टसँग जाँच्न चाहन्छु भन्नुहोस्।","answer":"I'm not sure. Could you help me check?","answerNe":"मलाई निश्चित छैन। जाँच्न मद्दत गर्नुहुन्छ?","bad1":"I would like a restaurant table.","bad2":"My shirt is too small.","accept":["not sure check","help check","ask doctor","check allergies"],"hint":"It's okay to say when you do not know something.","after":"Of course. We can talk through the information."},{"npc":"Do you have any other questions?","npcNe":"अरू कुनै प्रश्न छ?","goal":"औषधिको निर्देशन कहाँ पढ्ने भनेर सोध्नुहोस्।","answer":"Where can I read the instructions?","answerNe":"म निर्देशन कहाँ पढ्न सक्छु?","bad1":"Where is the airport gate?","bad2":"Can I get more rice?","accept":["read instructions","medicine directions","instructions label"],"hint":"Always ask a qualified professional about medicines.","after":"The instructions are on the label. Please ask us if anything is unclear."}]},{"id":"coffee","emoji":"☕","title":"Order at a café","ne":"क्याफेमा अर्डर","category":"Food & Drink","place":"Café · क्याफे","partner":"Barista","level":"Easy","steps":[{"npc":"Hi! What can I get for you?","npcNe":"नमस्ते! तपाईंलाई के चाहिन्छ?","goal":"एउटा सानो चिया माग्नुहोस्।","answer":"Could I have a small tea, please?","answerNe":"मलाई एउटा सानो चिया दिनुहुन्छ?","bad1":"Can you fix my bicycle?","bad2":"I need to find a doctor.","accept":["small tea","tea please","cup tea"],"hint":"“Could I have…?” is polite in cafés.","after":"Sure. Would you like sugar?"},{"npc":"Would you like sugar?","npcNe":"चिनी हाल्ने?","goal":"चिनी नहाल्ने भन्नुहोस्।","answer":"No sugar, please.","answerNe":"कृपया चिनी नहाल्नुहोस्।","bad1":"I need a new jacket.","bad2":"I am going to Pokhara.","accept":["no sugar","without sugar","skip sugar"],"hint":"“Without sugar” is another way to say this.","after":"No problem. Anything else?"},{"npc":"Is that for here or to go?","npcNe":"यहीँ खाने कि लैजाने?","goal":"लैजाने भन्नुहोस्।","answer":"To go, please.","answerNe":"लैजान्छु, कृपया।","bad1":"I need an appointment.","bad2":"The phone is broken.","accept":["to go","take away","takeout"],"hint":"“To go” is common in American English.","after":"Okay! Your tea will be ready soon."}]},{"id":"interview","emoji":"💼","title":"Job interview","ne":"जागिर अन्तर्वार्ता","category":"Work","place":"Office interview · कार्यालय","partner":"Interviewer","level":"Medium","steps":[{"npc":"Welcome. Can you introduce yourself?","npcNe":"स्वागत छ। आफ्नो परिचय दिन सक्नुहुन्छ?","goal":"आफ्नो परिचय दिनुहोस्, नाम काल्पनिक राख्न सकिन्छ।","answer":"My name is Sita, and I'm happy to be here.","answerNe":"मेरो नाम सीता हो। यहाँ आउन पाउँदा खुशी छु।","bad1":"Where can I buy tomatoes?","bad2":"I would like two coffees.","accept":["my name","happy here","glad here","thank you opportunity"],"hint":"Start with a confident, simple greeting.","after":"Nice to meet you, Sita."},{"npc":"Why are you interested in this job?","npcNe":"यो जागिरमा तपाईंको रुचि किन छ?","goal":"सिक्न र ग्राहकलाई मद्दत गर्न मन पर्छ भन्नुहोस्।","answer":"I enjoy helping customers and learning new skills.","answerNe":"मलाई ग्राहकलाई मद्दत गर्न र नयाँ सीप सिक्न मन पर्छ।","bad1":"I need a refund for my shoes.","bad2":"My friend lives by a lake.","accept":["help customers","learn skills","like job","interested work"],"hint":"Show how your interests match the position.","after":"That's great."},{"npc":"What is one of your strengths?","npcNe":"तपाईंको एउटा राम्रो पक्ष के हो?","goal":"समयमा पुग्छु र जिम्मेवारीपूर्वक काम गर्छु भन्नुहोस्।","answer":"I'm reliable and I arrive on time.","answerNe":"म भरपर्दो छु र समयमा आइपुग्छु।","bad1":"I would like spicy momo.","bad2":"Where is the bathroom?","accept":["reliable","on time","punctual","responsible"],"hint":"Use an example when you describe a strength.","after":"Thank you."},{"npc":"Do you have any questions for us?","npcNe":"हामीलाई सोध्नुपर्ने केही प्रश्न छ?","goal":"तालिमबारे सोध्नुहोस्।","answer":"What training will I receive?","answerNe":"मैले कस्तो तालिम पाउँछु?","bad1":"Can you give me a taxi?","bad2":"I'd like a large orange juice.","accept":["training","learn role","onboarding"],"hint":"Asking questions shows interest.","after":"Good question. Let me explain our training process."}]},{"id":"work-shift","emoji":"🧰","title":"At work","ne":"काममा कुराकानी","category":"Work","place":"Workplace · कार्यस्थल","partner":"Supervisor","level":"Easy","steps":[{"npc":"Good morning! Are you ready for your shift?","npcNe":"शुभ प्रभात! कामका लागि तयार हुनुहुन्छ?","goal":"काम सुरु गर्न तयार छु भन्नुहोस्।","answer":"Yes, I'm ready to start my shift.","answerNe":"हो, म काम सुरु गर्न तयार छु।","bad1":"I need a plane ticket.","bad2":"I like that blue mountain.","accept":["ready shift","ready start","ready work"],"hint":"“I'm ready to start” is a useful work phrase.","after":"Great. Please check the deliveries first."},{"npc":"Can you check the inventory?","npcNe":"सामानको मौज्दात जाँच्न सक्नुहुन्छ?","goal":"अवश्य, अहिले जाँच गर्छु भन्नुहोस्।","answer":"Sure, I'll check the inventory now.","answerNe":"अवश्य, म अहिले मौज्दात जाँच्छु।","bad1":"Please bring my restaurant bill.","bad2":"This shirt is too small.","accept":["check inventory","count stock","check stock"],"hint":"“I'll…” is short for “I will…”.","after":"Thanks. Let me know when you're finished."},{"npc":"Have you finished counting?","npcNe":"गन्ने काम सक्नुभयो?","goal":"काम सकें र सामान थप्नुपर्छ भन्नुहोस्।","answer":"Yes, I've finished, but we need more supplies.","answerNe":"हो, मैले सकेँ तर थप सामान चाहिन्छ।","bad1":"I need an apple for my lunch.","bad2":"I am visiting the hospital.","accept":["finished supplies","done need more","finished stock"],"hint":"“I've finished” uses present perfect.","after":"Thanks for the update. We'll order more."}]},{"id":"take-bus","emoji":"🚌","title":"Take public transport","ne":"बस यात्रा","category":"Travel","place":"Bus stop · बस स्टप","partner":"Driver","level":"Easy","steps":[{"npc":"Hello! Where are you going?","npcNe":"नमस्ते! तपाईं कहाँ जाँदै हुनुहुन्छ?","goal":"सहरको केन्द्र जान चाहन्छु भन्नुहोस्।","answer":"I'd like to go downtown, please.","answerNe":"म सहरको केन्द्र जान चाहन्छु।","bad1":"Can I make a doctor appointment?","bad2":"I bought a new shirt.","accept":["go downtown","to downtown","city center"],"hint":"“Downtown” is common in US cities.","after":"Sure. This bus goes downtown."},{"npc":"How many tickets do you need?","npcNe":"कति टिकट चाहिन्छ?","goal":"एउटा टिकट चाहिन्छ भन्नुहोस्।","answer":"One ticket, please.","answerNe":"एउटा टिकट दिनुहोस्।","bad1":"I need three tomatoes.","bad2":"My phone is charging.","accept":["one ticket","single ticket","just one"],"hint":"Keep ticket requests simple.","after":"Here you go."},{"npc":"Do you want to know where to get off?","npcNe":"कहाँ ओर्लिने जान्न चाहनुहुन्छ?","goal":"सहर केन्द्रमा पुगेपछि बताइदिन भन्नुहोस्।","answer":"Could you tell me when we reach downtown?","answerNe":"सहरको केन्द्र पुगेपछि बताइदिनुहुन्छ?","bad1":"Can I exchange these shoes?","bad2":"Is the food very spicy?","accept":["tell downtown","reach downtown","when get off","stop downtown"],"hint":"“Tell me when…” is helpful on public transport.","after":"Of course. I'll let you know."}]},{"id":"hotel","emoji":"🏨","title":"Check in at a hotel","ne":"होटलमा चेकइन","category":"Travel","place":"Hotel desk · होटल काउन्टर","partner":"Receptionist","level":"Easy","steps":[{"npc":"Welcome! Do you have a reservation?","npcNe":"स्वागत छ! कोठा बुक गर्नुभएको छ?","goal":"बुक गरेको छु भन्नुहोस्।","answer":"Yes, I have a reservation.","answerNe":"हो, मैले कोठा बुक गरेको छु।","bad1":"I need a doctor's appointment.","bad2":"I would like to order momo.","accept":["have reservation","booked room","booking"],"hint":"“Reservation” and “booking” are both used.","after":"Wonderful. May I have your name?"},{"npc":"Would you prefer one bed or two?","npcNe":"एउटा बेड कि दुई वटा?","goal":"एउटा ठूलो बेड चाहिन्छ भन्नुहोस्।","answer":"One large bed, please.","answerNe":"एउटा ठूलो बेड चाहिन्छ।","bad1":"I bought two phones.","bad2":"Please give me two sandwiches.","accept":["one large bed","one bed","single large bed"],"hint":"“I'd prefer one large bed” also works.","after":"No problem."},{"npc":"Do you need help with your luggage?","npcNe":"सामानसँग मद्दत चाहिन्छ?","goal":"सामान कोठासम्म लैजान मद्दत माग्नुहोस्।","answer":"Could someone help me carry my luggage?","answerNe":"कसैले मेरो सामान बोक्न मद्दत गर्नुहुन्छ?","bad1":"Where can I return a shirt?","bad2":"Can I order more tea?","accept":["help luggage","carry luggage","help bags","carry bags"],"hint":"“Could someone help…?” is a polite request.","after":"Of course. Someone will help you."}]},{"id":"airport","emoji":"✈️","title":"At the airport","ne":"विमानस्थलमा","category":"Travel","place":"Airport · विमानस्थल","partner":"Airline agent","level":"Medium","steps":[{"npc":"Good afternoon! Where are you flying today?","npcNe":"शुभ दिउँसो! आज कहाँ उड्दै हुनुहुन्छ?","goal":"पोखरा जाँदै छु भन्नुहोस्।","answer":"I'm flying to Pokhara today.","answerNe":"म आज पोखरा उड्दै छु।","bad1":"I need a new phone.","bad2":"I'd like some vegetables.","accept":["flying pokhara","going pokhara","flight pokhara"],"hint":"“I'm flying to…” names your destination.","after":"May I see your travel document?"},{"npc":"Are you checking a bag?","npcNe":"सामान चेकइन गर्दै हुनुहुन्छ?","goal":"एउटा झोला चेकइन गर्न चाहन्छु भन्नुहोस्।","answer":"Yes, I'd like to check one bag.","answerNe":"हो, म एउटा झोला चेकइन गर्न चाहन्छु।","bad1":"Can you exchange my shirt?","bad2":"I need a cup of tea.","accept":["check one bag","one checked bag","check bag"],"hint":"“Check a bag” means putting it in the aircraft hold.","after":"Thank you. Here is your boarding pass."},{"npc":"Do you know where your gate is?","npcNe":"गेट कहाँ छ थाहा छ?","goal":"गेट कहाँ छ भनेर सोध्नुहोस्।","answer":"Could you tell me where my gate is?","answerNe":"मेरो गेट कहाँ छ बताइदिनुहुन्छ?","bad1":"Can you book my hospital visit?","bad2":"Where is the nearest shoe store?","accept":["where gate","find gate","which gate"],"hint":"“Gate” means the boarding area.","after":"It's Gate 6, straight ahead."}]},{"id":"bank","emoji":"🏦","title":"At a bank","ne":"बैंकमा कुराकानी","category":"Services","place":"Bank counter · बैंक काउन्टर","partner":"Teller","level":"Medium","steps":[{"npc":"Hello! How may I help you?","npcNe":"नमस्ते! कसरी मद्दत गर्न सक्छु?","goal":"खाता बारे प्रश्न छ भन्नुहोस्।","answer":"I have a question about my account.","answerNe":"मलाई मेरो खाताबारे प्रश्न छ।","bad1":"I'd like a table for three.","bad2":"Where is the bus station?","accept":["question account","help account","about account"],"hint":"You do not need to give private account information in practice.","after":"Certainly. What would you like to know?"},{"npc":"Do you need a statement?","npcNe":"स्टेटमेन्ट चाहिन्छ?","goal":"गत महिनाको स्टेटमेन्ट चाहिन्छ भन्नुहोस्।","answer":"Yes, I'd like last month's statement.","answerNe":"हो, मलाई गत महिनाको स्टेटमेन्ट चाहिन्छ।","bad1":"I'd like a bowl of soup.","bad2":"Can you wash my clothes?","accept":["last month statement","bank statement","monthly statement"],"hint":"“I'd like…” is a courteous request.","after":"I can help with that."},{"npc":"Anything else today?","npcNe":"आज अरू केही चाहिन्छ?","goal":"काम सकियो धन्यवाद भन्नुहोस्।","answer":"That's all, thank you for your help.","answerNe":"यति नै हो, मद्दतका लागि धन्यवाद।","bad1":"I'd like to travel to Pokhara.","bad2":"I need to make a hotel reservation.","accept":["that's all","thank you","thanks","no more"],"hint":"“That's all” is useful when you are done.","after":"You're welcome! Have a nice day."}]},{"id":"phone-repair","emoji":"🛠️","title":"Repair a phone","ne":"फोन मर्मत","category":"Shopping","place":"Repair shop · मर्मत पसल","partner":"Technician","level":"Easy","steps":[{"npc":"Hi there! What's wrong with your phone?","npcNe":"नमस्ते! फोनमा के समस्या छ?","goal":"फोनको स्क्रिन फुटेको छ भन्नुहोस्।","answer":"My phone screen is cracked.","answerNe":"मेरो फोनको स्क्रिन फुटेको छ।","bad1":"I need a hotel reservation.","bad2":"Can I buy some potatoes?","accept":["screen cracked","cracked screen","screen broken","broken screen"],"hint":"“Cracked” means there are lines or breaks in glass.","after":"I see. When did that happen?"},{"npc":"Does the phone still turn on?","npcNe":"फोन अझै चल्छ?","goal":"फोन चल्छ तर टचले काम गर्दैन भन्नुहोस्।","answer":"It turns on, but the touch screen doesn't work.","answerNe":"फोन खुल्छ तर टच स्क्रिनले काम गर्दैन।","bad1":"The soup is delicious.","bad2":"My school is nearby.","accept":["turns on touch","touch not work","screen not respond","touch broken"],"hint":"“It turns on” means the device powers up.","after":"Let me examine it."},{"npc":"Would you like a repair estimate?","npcNe":"मर्मत खर्चको अनुमान चाहिन्छ?","goal":"मर्मत कति खर्च पर्छ भनेर सोध्नुहोस्।","answer":"How much will the repair cost?","answerNe":"मर्मत कति खर्च लाग्छ?","bad1":"Where can I get a bus ticket?","bad2":"I'd like coffee with milk.","accept":["repair cost","how much fix","price repair","estimate cost"],"hint":"Always ask for an estimate before approving work.","after":"I'll check and give you an estimate."}]},{"id":"new-friend","emoji":"🤝","title":"Meet someone new","ne":"नयाँ साथी भेट्ने","category":"Everyday","place":"Community event · भेटघाट","partner":"New friend","level":"Easy","steps":[{"npc":"Hi! I don't think we've met. What's your name?","npcNe":"नमस्ते! हामी पहिले भेटेका छैनौं होला। नाम के हो?","goal":"आफ्नो नाम काल्पनिक राखेर परिचय दिनुहोस्।","answer":"Hi, I'm Sita. Nice to meet you!","answerNe":"नमस्ते, म सीता हुँ। भेटेर खुशी लाग्यो।","bad1":"Can I get my money back?","bad2":"Where is the supermarket?","accept":["i'm sita","my name","nice meet","im sita"],"hint":"Introduce yourself and say “Nice to meet you.”","after":"Nice to meet you too, Sita!"},{"npc":"Where are you from?","npcNe":"तपाईं कहाँबाट हुनुहुन्छ?","goal":"नेपालबाट आएको भन्नुहोस्।","answer":"I'm originally from Nepal.","answerNe":"म मूलतः नेपालबाट हुँ।","bad1":"I would like one bus ticket.","bad2":"My phone screen is cracked.","accept":["from nepal","originally nepal","nepal"],"hint":"“Originally from” describes where you are from.","after":"That's wonderful!"},{"npc":"What do you like doing in your free time?","npcNe":"फुर्सदमा के गर्न मन पर्छ?","goal":"घुम्न र किताब पढ्न मन पर्छ भन्नुहोस्।","answer":"I enjoy traveling and reading books.","answerNe":"मलाई घुम्न र किताब पढ्न मन पर्छ।","bad1":"I need a receipt for a shirt.","bad2":"My doctor is in the hospital.","accept":["travel reading","read books","enjoy reading","like travel"],"hint":"“I enjoy…” is a natural way to describe hobbies.","after":"Me too! It was nice talking with you."}]},{"id":"school-help","emoji":"📚","title":"Ask a teacher","ne":"शिक्षकसँग कुराकानी","category":"Everyday","place":"Classroom · कक्षाकोठा","partner":"Teacher","level":"Easy","steps":[{"npc":"Good morning! Do you have a question?","npcNe":"शुभ प्रभात! कुनै प्रश्न छ?","goal":"एउटा शब्दको अर्थ बुझिनँ भन्नुहोस्।","answer":"I don't understand this word.","answerNe":"म यो शब्द बुझ्दिनँ।","bad1":"I want to buy a new phone.","bad2":"Where can I return my shirt?","accept":["don't understand word","meaning word","what means"],"hint":"“I don't understand…” is okay to say in class.","after":"No problem. Let's look at it together."},{"npc":"Would you like another example?","npcNe":"अर्को उदाहरण चाहिन्छ?","goal":"अर्को उदाहरण दिनुहोस् भन्नुहोस्।","answer":"Could you give me another example?","answerNe":"अर्को उदाहरण दिनुहुन्छ?","bad1":"How much is this shirt?","bad2":"Please give me a hospital appointment.","accept":["another example","more examples","example please"],"hint":"“Could you…” is polite when asking a teacher.","after":"Of course! Here's another example."},{"npc":"Does that make sense now?","npcNe":"अहिले बुझ्नुभयो?","goal":"अहिले बुझेँ, धन्यवाद भन्नुहोस्।","answer":"Yes, I understand now. Thank you!","answerNe":"हो, अहिले बुझें। धन्यवाद।","bad1":"I need a taxi to the airport.","bad2":"I like my new shoes.","accept":["understand now","got it thank","yes thank"],"hint":"“I understand now” shows progress.","after":"Excellent! Keep practicing."}]}];
const topics=['All','Shopping','Healthcare','Food & Drink','Travel','Work','Services','Everyday'];
// U.S. Visa Interview Study Hub · English Sikau
// Guided English practice only. No eligibility predictions, legal advice or verified XP.
// Government URLs below link to the live official pages rather than claiming to auto-sync policy.
const visaCategories=[{"id":"dv","icon":"🎟️","title":"DV Lottery","ne":"डीभी लटरी","code":"DV","desc":"Eligibility, finances and life plans","source":"https://travel.state.gov/content/travel/en/us-visas/immigrate/diversity-visa-program-entry/diversity-visa-interview/diversity-visa-applicant-interview.html"},{"id":"student","icon":"🎓","title":"Student Visa","ne":"विद्यार्थी भिसा","code":"F-1 / M-1","desc":"Study plan, tuition and intent","source":"https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"},{"id":"tourist","icon":"🧳","title":"Tourist Visa","ne":"पर्यटक भिसा","code":"B-1 / B-2","desc":"Trip purpose, finances and return","source":"https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html"},{"id":"spouse","icon":"💍","title":"Spouse Visa","ne":"पति-पत्नी भिसा","code":"IR1 / CR1","desc":"Marriage, timeline and support","source":"https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration/immigrant-visa-for-a-spouse-or-fiance-of-a-us-citizen.html"},{"id":"fiance","icon":"💗","title":"Fiancé(e) Visa","ne":"मंगेतर भिसा","code":"K-1","desc":"Engagement, intent to marry and plans","source":"https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration/nonimmigrant-visa-for-a-fiance-k-1.html"},{"id":"hard","icon":"🛡️","title":"Difficult Questions","ne":"गाह्रा प्रश्नहरू","code":"Public charge + gaps","desc":"Financial support, uncertainty and refusals","source":"https://travel.state.gov/content/travel/en/News/visas-news/preventing-public-benefits-reliance.html"}];
const visaQuestions={"dv":[{"id":"dv-1","q":"Why do you want to immigrate to the United States?","ne":"तपाईं अमेरिका किन बसाइँ सर्न चाहनुहुन्छ?","coach":"Explain your genuine plans for life and work, without promising a particular job.","sample":"I hope to build a stable life in the United States. My plan is to [your true plan], and I understand I must be prepared for living expenses.","caution":"No visa can be guaranteed by a polished answer."},{"id":"dv-2","q":"How did you qualify for the Diversity Visa program?","ne":"तपाईं डीभी कार्यक्रमका लागि कसरी योग्य हुनुभयो?","coach":"Explain your actual qualifying education or work experience; the principal applicant must meet DV criteria.","sample":"I qualify through [my actual qualifying education or work experience]. I can provide the supporting documents.","caution":"Do not say that any job qualifies; official DV work criteria are specific."},{"id":"dv-3","q":"What is your highest level of education?","ne":"तपाईंको उच्चतम शिक्षा के हो?","coach":"Give the true degree or grade completed, dates if known and documents.","sample":"My highest completed education is [accurate qualification] from [school], completed in [year].","caution":"Do not claim a degree that is still in progress as completed."},{"id":"dv-4","q":"What have you done for work in Nepal?","ne":"नेपालमा तपाईंले के काम गर्नुभएको छ?","coach":"Describe paid, unpaid, informal, or no work honestly, and explain the dates.","sample":"In Nepal, I [describe genuine work or state that I was not employed] during [accurate period].","caution":"A truthful employment gap is preferable to invented work."},{"id":"dv-5","q":"How do you plan to support yourself initially?","ne":"अमेरिकामा सुरुमा खर्च कसरी चलाउनुहुन्छ?","coach":"Name actual verified savings, family arrangements or practical resources.","sample":"For my initial expenses, I plan to rely on [real savings or documented support]. My estimated budget is [truthful amount if known].","caution":"Only mention support that really exists."},{"id":"dv-6","q":"Where will you stay when you first arrive?","ne":"अमेरिका पुग्दा सुरुमा कहाँ बस्नुहुन्छ?","coach":"Describe the actual lodging plan, or acknowledge uncertainty and the plan to confirm it.","sample":"I plan to stay at [actual address or type of accommodation] initially. I will confirm the final arrangements before traveling.","caution":"Never invent a host or address."},{"id":"dv-7","q":"Do you have relatives or friends in the United States?","ne":"अमेरिकामा तपाईंका आफन्त वा साथी छन्?","coach":"Answer yes or no honestly and describe relationships if relevant.","sample":"[Yes, I have a relative/friend in the United States, or No, I do not.] [Give accurate detail if needed].","caution":"Do not conceal relatives or invent relationships."},{"id":"dv-8","q":"What kind of work might you seek after arriving?","ne":"पुगेपछि कस्तो काम खोज्न सक्नुहुन्छ?","coach":"Describe realistic skills and employment plans without a guaranteed job claim.","sample":"Once I am permitted to work, I would like to seek work in [field matching my actual skills]. I understand finding work may take time.","caution":"An immigrant's work plans do not replace evidence of resources."},{"id":"dv-9","q":"What if you cannot find work immediately?","ne":"तुरुन्तै काम नपाए के गर्नुहुन्छ?","coach":"Discuss your real financial runway and reasonable job-search plan.","sample":"If I do not find work right away, I will use [genuine savings or confirmed support] while I search for work that matches my skills.","caution":"Do not promise financial support you cannot document."},{"id":"dv-10","q":"What do you know about your intended U.S. destination?","ne":"अमेरिका बस्न जान लागेको ठाउँबारे के थाहा छ?","coach":"Mention researched housing, transportation, living costs and connections.","sample":"I have researched [actual city] including housing, transportation, and estimated living costs.","caution":"You can say you are still comparing locations if true."},{"id":"dv-11","q":"Have you ever applied for a U.S. visa before?","ne":"पहिले अमेरिकी भिसा आवेदन गर्नुभएको छ?","coach":"Give accurate prior applications and outcomes, including refusals if asked.","sample":"[Yes/No.] [If yes, explain the correct year, visa category, and outcome.]","caution":"Do not hide a prior refusal."},{"id":"dv-12","q":"Is the information in your DS-260 accurate?","ne":"तपाईंको DS-260 मा भएका जानकारी सही छन्?","coach":"State whether it is accurate; explain errors openly and how to correct them.","sample":"To the best of my knowledge, the information is accurate. I would like to clarify [any actual error, if applicable].","caution":"Never falsely certify inaccurate information."},{"id":"dv-13","q":"If you have not worked in Nepal, what have you done during that time?","ne":"नेपालमा काम नगर्दा त्यो समयमा के गर्नुहुन्थ्यो?","coach":"Account for your actual activities including caregiving, study, home duties, training or searching for work.","sample":"During [accurate dates], I [truthfully describe what I did]. I did not hold formal employment at that time.","caution":"Do not invent a career or responsibilities to make a gap sound stronger."},{"id":"dv-14","q":"Does receiving a DV selection letter guarantee your visa?","ne":"डीभीमा छनोट भएपछि भिसा पक्का हुन्छ?","coach":"Understand that selection is not a guarantee of issuance; eligibility and available visas matter.","sample":"I understand that selection alone does not guarantee a visa, and I must complete the official process.","caution":"Check current Department of State guidance about DV processing."},{"id":"dv-15","q":"How will you afford housing and food during your first months?","ne":"पहिलो केही महिनाको घरभाडा र खानाको खर्च कसरी चलाउनुहुन्छ?","coach":"Discuss actual housing arrangements and documented available resources.","sample":"I expect to budget [genuine estimate] for housing and food and use [real available funds or confirmed support].","caution":"Do not list family property as your asset unless you actually own or control it."},{"id":"dv-16","q":"Which skills could help you adapt to life in America?","ne":"अमेरिकामा बस्न तपाईंका कुन सीप उपयोगी हुन्छन्?","coach":"Describe real language, education, technical and everyday skills.","sample":"I have experience in [real skills], and I am prepared to keep learning and adapting.","caution":"Future employability does not replace a present financial plan."},{"id":"dv-17","q":"Have you ever given incorrect information in a visa application?","ne":"भिसा आवेदनमा कहिल्यै गलत जानकारी दिनुभएको छ?","coach":"Be transparent about any genuine error; clarify corrections rather than hiding them.","sample":"If there was an error, I would like to explain it accurately and provide the correct information.","caution":"False statements can have serious consequences."},{"id":"dv-18","q":"What will you do if your destination or support plan changes?","ne":"अमेरिका बस्ने वा सहयोगको योजना बदलिए के गर्नुहुन्छ?","coach":"Explain realistic, genuine alternatives if you have them.","sample":"If my arrangements change, I will update the plan based on [real alternatives] and follow any required reporting instructions.","caution":"Never claim an alternative sponsor or home that does not exist."}],"student":[{"id":"student-1","q":"Why did you choose this U.S. university?","ne":"तपाईंले यो अमेरिकी विश्वविद्यालय किन रोज्नुभयो?","coach":"Connect the actual program to academic goals and specific verified university features.","sample":"I chose [actual school] for its [accurate program feature], which aligns with my goal to study [subject].","caution":"Do not invent rankings or research projects."},{"id":"student-2","q":"Why do you want to study this subject?","ne":"यो विषय किन पढ्न चाहनुहुन्छ?","coach":"Describe authentic academic interest and what you will learn.","sample":"I want to study [actual major] because [real reason], and I hope to develop skills in [relevant field].","caution":"Use facts consistent with your I-20 and application."},{"id":"student-3","q":"Who will pay for your education?","ne":"तपाईंको पढाइको खर्च कसले बेहोर्छ?","coach":"Identify real funding and ensure the plan matches actual financial records.","sample":"My tuition and living expenses will be covered by [true funding source], as supported by [relevant documentation].","caution":"Do not invent family income or scholarships."},{"id":"student-4","q":"How much will your education and living costs be?","ne":"पढाइ र बसाइको कति खर्च लाग्छ?","coach":"Know figures shown by the institution and your actual budget.","sample":"According to my documents, the estimated annual cost is [accurate amount]. My funding plan covers [details].","caution":"Verify numbers in your current I-20 and supporting papers."},{"id":"student-5","q":"Why are you studying in the United States rather than Nepal?","ne":"नेपालभन्दा अमेरिका किन पढ्न चाहनुहुन्छ?","coach":"Make a truthful academic comparison without disparaging Nepal.","sample":"This U.S. program offers [specific authentic academic feature] that fits my learning goals.","caution":"Avoid claiming a program is unavailable in Nepal without evidence."},{"id":"student-6","q":"What is your study plan after arrival?","ne":"अमेरिका पुगेपछि पढाइको योजना के छ?","coach":"Describe the real course of study, campus and intended start.","sample":"I plan to enroll in [actual program] at [school] starting [accurate term].","caution":"Know the program details on your I-20."},{"id":"student-7","q":"What will you do after completing your studies?","ne":"पढाइ सकेपछि के गर्ने योजना छ?","coach":"Describe genuine plans and comply with the conditions of your status.","sample":"After graduation, I plan to [truthful plan]. I understand I must follow the terms of my student status and any authorized options.","caution":"Do not claim that F-1 permits unrestricted U.S. work."},{"id":"student-8","q":"Do you have family in the United States?","ne":"अमेरिकामा तपाईंको परिवार छ?","coach":"Answer based on your real relationships, accurately and completely.","sample":"[Yes/No.] [If applicable, explain the genuine relationship and location.]","caution":"Family in the United States should not be falsely concealed."},{"id":"student-9","q":"What if you cannot find a job during your studies?","ne":"पढ्दापढ्दै काम नपाए के गर्नुहुन्छ?","coach":"Education costs should not depend on unauthorized employment; explain actual funding.","sample":"My studies are funded by [real resources]. I will only pursue work if it is permitted by my student status.","caution":"Students have strict employment authorization rules."},{"id":"student-10","q":"What have you done since your last degree?","ne":"पछिल्लो पढाइपछि के गरिरहनुभएको छ?","coach":"Account for actual studies, work, family duties or time away without fake experience.","sample":"Since [date], I have [truthfully describe activities], which helped me prepare for [goal].","caution":"A gap is not a reason to fabricate employment."},{"id":"student-11","q":"What is Form I-20?","ne":"Form I-20 के हो?","coach":"Explain that the school issues it as evidence of eligibility for an F or M student program.","sample":"Form I-20 is issued by my school and contains important details about my student program.","caution":"Consult your school for questions about your specific I-20."},{"id":"student-12","q":"How will you handle academic difficulties in English?","ne":"अंग्रेजीमा पढ्दा गाह्रो भए के गर्नुहुन्छ?","coach":"Discuss practical resources and honest preparation.","sample":"I will attend classes, ask instructors questions, and use academic support services if I need help.","caution":"Do not misrepresent your English skills."},{"id":"student-13","q":"What will you do if you cannot afford a second year of tuition?","ne":"दोस्रो वर्षको शुल्क तिर्न नसके के गर्नुहुन्छ?","coach":"Explain genuine multi-year funding, not an unauthorized-work plan.","sample":"My financial planning is based on [truthful resources available for the program]. I would discuss any changes with my school's international office.","caution":"Never pretend one-year bank balance automatically covers an entire course."},{"id":"student-14","q":"Why does your academic record show a break or low grades?","ne":"तपाईंको पढाइमा अन्तर वा कम अंक किन छन्?","coach":"Acknowledge the real reasons and describe improvement if supported by facts.","sample":"My academic record reflects [accurate explanation]. I have since prepared by [true steps].","caution":"Do not falsify transcripts or invent certificates."},{"id":"student-15","q":"How will you handle your first semester in English?","ne":"पहिलो सेमेस्टर अंग्रेजीमा कसरी पढ्नुहुन्छ?","coach":"Mention your true preparation and the school's actual support.","sample":"I will prepare before classes and use [actual language or academic services] when needed.","caution":"Do not overstate language proficiency."},{"id":"student-16","q":"Why did you change your intended major?","ne":"तपाईंले पढ्ने विषय किन परिवर्तन गर्नुभयो?","coach":"Explain an authentic change of interest backed by your application.","sample":"I changed from [actual previous field] to [current program] because [genuine academic reason].","caution":"Your explanation should match your submitted records."},{"id":"student-17","q":"What do your parents or sponsors do for a living?","ne":"तपाईंको खर्च गर्ने आमाबुबा वा सहयोगकर्ताले के काम गर्नुहुन्छ?","coach":"Give accurate occupations and financially relevant records.","sample":"My [actual sponsor relationship] works as [accurate role], and the financial documents reflect [actual information].","caution":"Do not create businesses or employment to satisfy an interviewer."},{"id":"student-18","q":"What if you are refused a student visa?","ne":"विद्यार्थी भिसा नआए के गर्नुहुन्छ?","coach":"Give a calm, realistic plan rather than demanding an approval.","sample":"I would review the refusal information, evaluate my options and continue planning my education responsibly.","caution":"An English response cannot overcome a legal reason for refusal."}],"tourist":[{"id":"tourist-1","q":"What is the purpose of your trip?","ne":"तपाईंको अमेरिका भ्रमणको उद्देश्य के हो?","coach":"Give the actual temporary purpose, such as tourism or visiting family.","sample":"I am planning a temporary visit to [real place] for [genuine purpose].","caution":"A visitor visa is not for taking U.S. employment."},{"id":"tourist-2","q":"How long do you intend to stay?","ne":"कति समय बस्ने योजना छ?","coach":"Give realistic dates and length consistent with your plans.","sample":"I intend to stay for about [truthful duration] and return on [planned date if known].","caution":"Do not provide invented tickets or dates."},{"id":"tourist-3","q":"Where will you stay in the United States?","ne":"अमेरिकामा कहाँ बस्नुहुन्छ?","coach":"Describe genuine accommodations or relative's home if confirmed.","sample":"I expect to stay at [actual hotel or host arrangement] in [city].","caution":"Do not invent an address."},{"id":"tourist-4","q":"Who will pay for your visit?","ne":"भ्रमण खर्च कसले बेहोर्छ?","coach":"Explain your actual savings, income or genuine third-party payment.","sample":"I will pay with [real source of funds], and my estimated expenses are [true estimate].","caution":"Visitor applications may require evidence of ability to cover trip costs."},{"id":"tourist-5","q":"What do you do in Nepal?","ne":"नेपालमा तपाईं के गर्नुहुन्छ?","coach":"Describe actual work, study, caregiving or circumstances.","sample":"In Nepal, I [accurate occupation, education or family role].","caution":"Never claim a job you do not have."},{"id":"tourist-6","q":"Why will you return to Nepal?","ne":"तपाईं नेपाल किन फर्किनुहुन्छ?","coach":"Describe genuine responsibilities and plans, not invented property or employment.","sample":"I plan to return because [truthful commitments and plans in Nepal].","caution":"Do not promise evidence of ties that does not exist."},{"id":"tourist-7","q":"Do you have relatives in the United States?","ne":"अमेरिकामा आफन्त छन्?","coach":"Answer honestly with the exact relationship if relevant.","sample":"[Yes/No.] [If yes, explain your real relationship and visit plans.]","caution":"Avoid concealing U.S. relatives."},{"id":"tourist-8","q":"Have you traveled outside Nepal before?","ne":"पहिले नेपालबाहिर जानुभएको छ?","coach":"State your actual travel history.","sample":"[Yes/No.] [If yes, mention accurate destinations and dates.]","caution":"No international travel history should not be falsely presented as extensive travel."},{"id":"tourist-9","q":"Will you work while visiting the United States?","ne":"भ्रमणको क्रममा अमेरिका काम गर्नुहुन्छ?","coach":"Visitor visas do not generally authorize U.S. employment; answer your genuine intent.","sample":"My purpose is a temporary visit, and I do not plan to work in the United States.","caution":"Never use a tourist visa to conceal intended employment."},{"id":"tourist-10","q":"What if your trip costs more than expected?","ne":"भ्रमण खर्च अनुमानभन्दा बढी भए के गर्नुहुन्छ?","coach":"Explain actual contingency resources and possible change of plan.","sample":"I have planned [real contingency funds or arrangements], and I can shorten the trip if needed.","caution":"Do not fabricate cash balances."},{"id":"tourist-11","q":"What tourist places would you like to visit?","ne":"कुन पर्यटकीय ठाउँ हेर्न चाहनुहुन्छ?","coach":"Mention places you genuinely intend to see.","sample":"I hope to visit [places on my real itinerary], subject to my budget and schedule.","caution":"Avoid memorizing destinations you know nothing about."},{"id":"tourist-12","q":"Have you ever overstayed a visa?","ne":"तपाईंले पहिले भिसाको समयभन्दा बढी बस्नुभएको छ?","coach":"Answer truthfully about all prior stays.","sample":"[Answer accurately, and explain dates and circumstances if applicable.]","caution":"Never conceal a prior overstay."},{"id":"tourist-13","q":"You do not have a full-time job. Why will you return to Nepal?","ne":"तपाईंको नियमित जागिर छैन। नेपाल किन फर्किनुहुन्छ?","coach":"Explain only true connections, responsibilities and plans; no invented job or property.","sample":"My current situation is [truthful context]. I plan to return because [genuine commitments in Nepal].","caution":"The officer considers the real circumstances; polished language is not proof."},{"id":"tourist-14","q":"Who invited you, and how do you know them?","ne":"कसले बोलाउनुभयो र उहाँलाई कसरी चिन्नुहुन्छ?","coach":"Identify the real inviter and relationship, or say no one invited you.","sample":"[If true] I was invited by [real person], whom I know through [actual relationship].","caution":"An invitation is not a substitute for your own eligibility."},{"id":"tourist-15","q":"Why are you visiting now instead of later?","ne":"तपाईं अहिले नै किन भ्रमण गर्न चाहनुहुन्छ?","coach":"Explain actual timing such as a vacation period or event.","sample":"I chose this time because [actual vacation, event or family circumstance].","caution":"Do not invent an event to support your trip."},{"id":"tourist-16","q":"What will you do if you are offered a job while visiting?","ne":"पर्यटक हुँदा कामको प्रस्ताव आए के गर्नुहुन्छ?","coach":"Know that visitor status generally does not authorize U.S. employment.","sample":"I intend to follow the conditions of my visitor status, which does not authorize me to take a U.S. job.","caution":"Do not use a visitor visa as a plan for unauthorized work."},{"id":"tourist-17","q":"Do you have enough savings for the whole visit?","ne":"पूरै यात्राको लागि पर्याप्त बचत छ?","coach":"Discuss your actual budget, resources, and any documented contribution.","sample":"My travel budget is based on [real funds] and a planned duration of [genuine period].","caution":"Do not invent bank balances."},{"id":"tourist-18","q":"Why did you change your travel dates or plan?","ne":"तपाईंले यात्रा मिति वा योजना किन बदल्नुभयो?","coach":"Explain authentic changes and the revised itinerary.","sample":"My plans changed because [true reason]. I now intend to visit [real destination and duration].","caution":"Keep all forms and oral responses consistent with actual plans."}],"spouse":[{"id":"spouse-1","q":"How did you and your spouse first meet?","ne":"तपाईं र तपाईंका जीवनसाथी पहिलोपटक कसरी भेट्नुभयो?","coach":"Describe the real first meeting, approximate time and place.","sample":"We first met in [truthful month/year or approximate period] at [actual place/context].","caution":"Your account should match genuine relationship history."},{"id":"spouse-2","q":"When did your relationship become serious?","ne":"तपाईंहरूको सम्बन्ध कहिलेदेखि गम्भीर भयो?","coach":"Explain authentic relationship milestones.","sample":"Our relationship developed over time. We became serious around [actual time] because [honest reason].","caution":"Exact dates should be checked rather than guessed confidently."},{"id":"spouse-3","q":"When and where did you get married?","ne":"तपाईंहरूको विवाह कहिले र कहाँ भयो?","coach":"Give true marriage details consistent with your certificate.","sample":"We married on [actual date] in [actual location].","caution":"Do not invent ceremony details."},{"id":"spouse-4","q":"What does your spouse do for work?","ne":"तपाईंका जीवनसाथी के काम गर्नुहुन्छ?","coach":"State the spouse's actual employment or current employment status.","sample":"My spouse [accurate job or situation] in [general location].","caution":"If unsure about exact details, say you can confirm."},{"id":"spouse-5","q":"How often do you communicate?","ne":"तपाईंहरू कति पटक कुरा गर्नुहुन्छ?","coach":"Describe actual calls, messages and visits without exaggerating.","sample":"We usually communicate [truthful frequency] through [real methods].","caution":"Do not invent daily calls that did not happen."},{"id":"spouse-6","q":"When did you last see each other?","ne":"तपाईंहरू पछिल्लो पटक कहिले भेट्नुभयो?","coach":"Give accurate date or honest approximate period and location.","sample":"We last met around [accurate date] in [actual place].","caution":"If you cannot remember a precise date, say so."},{"id":"spouse-7","q":"Where do you plan to live together in the United States?","ne":"अमेरिकामा कहाँ सँगै बस्नुहुन्छ?","coach":"Explain actual housing plans.","sample":"We plan to live together in [real city or known accommodation plan].","caution":"Do not claim an address you do not know."},{"id":"spouse-8","q":"How will your family cover living expenses after you arrive?","ne":"पुगेपछि परिवारको खर्च कसरी चल्छ?","coach":"Use genuine sponsor details, actual I-864 evidence and financial plans.","sample":"Our initial living costs will be covered by [real documented plan]. I understand the financial evidence should match our submitted records.","caution":"An I-864 is important but is not a blanket guarantee of visa approval."},{"id":"spouse-9","q":"Why were you not employed for a long period in Nepal?","ne":"नेपालमा लामो समय काम नगर्नुको कारण के हो?","coach":"Explain the actual reason, whether family responsibilities, study, health, job searching or another reason.","sample":"During [honest period], I was not in formal employment because [actual reason]. I used that time to [truthful activities].","caution":"Do not invent employment, caregiving or a medical condition."},{"id":"spouse-10","q":"If you did not work in Nepal, why would you work in the United States?","ne":"नेपालमा काम नगरेको भए अमेरिकामा किन काम गर्नुहुन्छ?","coach":"Connect truthful circumstances to realistic work plans after obtaining appropriate status.","sample":"My circumstances in Nepal were [truthful explanation]. In the United States, after I am authorized to work, I hope to seek suitable employment while we follow our actual household financial plan.","caution":"A future job possibility is not proof of present financial support."},{"id":"spouse-11","q":"How do you handle disagreements with your spouse?","ne":"जीवनसाथीसँग असहमति हुँदा कसरी समाधान गर्नुहुन्छ?","coach":"Describe your real communication and problem-solving methods.","sample":"When we disagree, we usually [truthfully explain how you communicate and resolve differences].","caution":"There is no single 'perfect' marital answer."},{"id":"spouse-12","q":"Has either of you been married before?","ne":"तपाईंहरू मध्ये कसैको पहिले विवाह भएको थियो?","coach":"Answer accurately and explain required legal records where relevant.","sample":"[Yes/No.] [If applicable, give the true history and relevant legal documents.]","caution":"Do not conceal a previous marriage or divorce."},{"id":"spouse-13","q":"Why are you and your spouse living in different countries?","ne":"तपाईं र जीवनसाथी फरक देशमा किन बस्नुहुन्छ?","coach":"Explain the genuine immigration and family circumstances.","sample":"We are currently living apart because [actual circumstances], and our plan is to live together when permitted.","caution":"Do not invent a shared residence."},{"id":"spouse-14","q":"How do you and your spouse manage household finances?","ne":"तपाईं र जीवनसाथीले घरखर्च कसरी मिलाउनुहुन्छ?","coach":"Describe actual earnings, spending, savings and arrangements.","sample":"We plan our expenses using [real sources of income and savings], and we discuss major costs together.","caution":"Never state a false household income."},{"id":"spouse-15","q":"Why has your spouse not visited for several months?","ne":"जीवनसाथी लामो समय भेट्न किन आउनुभएको छैन?","coach":"Give honest reasons such as work, expenses or travel circumstances only if true.","sample":"We have not met in person recently because [actual reason]. We continue our relationship through [real communication].","caution":"A truthful gap is better than staged proof of visits."},{"id":"spouse-16","q":"Your petitioner is the only financial sponsor. What is the plan?","ne":"तपाईंको निवेदक मात्र आर्थिक स्पोन्सर हुनुहुन्छ। योजना के छ?","coach":"Focus on actual I-864 support documentation and authentic household finances.","sample":"My spouse is the petitioner, and our submitted financial documents show [actual earnings and qualifying resources].","caution":"Do not invent a joint sponsor or assume assets automatically qualify."},{"id":"spouse-17","q":"A relative owns property in Nepal. Is that property yours?","ne":"नेपालमा आफन्तको नाममा सम्पत्ति छ। त्यो तपाईंको हो?","coach":"Clearly distinguish ownership, legal rights and gifts or transfers that have not occurred.","sample":"The property belongs to [the actual owner]. It is not mine unless I have legal ownership or rights that I can document.","caution":"Never report your mother-in-law's or parent's property as your own merely because of the relationship."},{"id":"spouse-18","q":"Your CEAC status says Refused. What does that mean for you?","ne":"CEAC मा Refused देखिएको छ। तपाईंको अवस्थाबारे के बुझ्नुहुन्छ?","coach":"State only what the consulate actually told you and any instructions received.","sample":"My CEAC status shows 'Refused.' The officer told me [exactly what was said], and I am following the written instructions, if any.","caution":"A CEAC status alone does not establish the legal grounds or next steps."}],"fiance":[{"id":"fiance-1","q":"How did you meet your fiancé(e)?","ne":"तपाईंले आफ्नो मगनी भएको व्यक्तिलाई कसरी भेट्नुभयो?","coach":"Explain the real history of meeting and relationship.","sample":"We first met in [actual place/context] around [accurate time].","caution":"Never invent meetings or conversations."},{"id":"fiance-2","q":"When did you last meet in person?","ne":"तपाईंहरू प्रत्यक्ष रूपमा पछिल्लो पटक कहिले भेट्नुभयो?","coach":"State genuine in-person meetings and dates.","sample":"We met in person around [true date] in [actual location].","caution":"Eligibility can involve in-person meeting requirements and exceptions; check official K-1 rules."},{"id":"fiance-3","q":"When did you become engaged?","ne":"तपाईंहरूको इन्गेजमेन्ट कहिले भयो?","coach":"Give the actual engagement details.","sample":"We became engaged on [actual date or period] after [truthful relationship history].","caution":"Do not make up a proposal story."},{"id":"fiance-4","q":"Why do you want to marry this person?","ne":"तपाईं किन उहाँसँग विवाह गर्न चाहनुहुन्छ?","coach":"Describe the genuine relationship without rehearsed unrealistic phrases.","sample":"We have built a genuine relationship through [actual shared experiences], and we plan to marry.","caution":"The content matters more than elaborate English."},{"id":"fiance-5","q":"What is your fiancé(e)'s occupation?","ne":"तपाईंका मंगेतर/मंगेतरी के काम गर्नुहुन्छ?","coach":"State the person's actual occupation or honest current situation.","sample":"My fiancé(e) currently [works/studies/is not employed—choose what is true].","caution":"Do not fabricate employment."},{"id":"fiance-6","q":"Where will you live after marriage?","ne":"विवाहपछि कहाँ बस्नुहुन्छ?","coach":"Describe real U.S. housing plans.","sample":"We plan to live in [actual location or confirmed plan].","caution":"Unconfirmed plans can be described as plans, not facts."},{"id":"fiance-7","q":"When do you plan to marry?","ne":"विवाह कहिले गर्ने योजना छ?","coach":"Explain genuine plans to marry within the K-1 rules.","sample":"We intend to marry within 90 days after I enter the United States on a K-1 visa.","caution":"Do not promise a ceremony date unless it is actually planned."},{"id":"fiance-8","q":"How will you financially support yourself after arriving?","ne":"अमेरिका पुगेपछि खर्च कसरी चलाउनुहुन्छ?","coach":"Explain actual finances and your fiancé(e)'s support, and remember K-1 work requires authorization.","sample":"We have planned for initial expenses using [real resources or partner support]. I understand I must follow work authorization rules.","caution":"Do not assume immediate unrestricted work on arrival with K-1."},{"id":"fiance-9","q":"Do your families know about the engagement?","ne":"परिवारलाई इन्गेजमेन्टबारे थाहा छ?","coach":"Give an accurate answer; cultures and families differ.","sample":"[Yes/No.] [Explain your actual family situation if asked.]","caution":"Do not falsely claim parental approval."},{"id":"fiance-10","q":"Have either of you been married before?","ne":"तपाईंहरू मध्ये कसैको पहिले विवाह भएको थियो?","coach":"Explain actual history and legal dissolution documents when relevant.","sample":"[Yes/No.] [If applicable, explain truthfully and provide required records.]","caution":"Do not conceal prior marriages."},{"id":"fiance-11","q":"What do you and your fiancé(e) like doing together?","ne":"तपाईंहरू सँगै के गर्न मन पराउनुहुन्छ?","coach":"Describe true activities from visits or communication.","sample":"We enjoy [true shared activities] and often talk about [real interests].","caution":"Specific true details are more persuasive than memorized stories."},{"id":"fiance-12","q":"What would you do if your wedding plans change?","ne":"विवाह योजना परिवर्तन भए के गर्नुहुन्छ?","coach":"Answer based on genuine intentions and applicable visa conditions.","sample":"We intend to comply with the K-1 requirements. If our circumstances change, we will seek reliable guidance about the proper next steps.","caution":"Visa rules are not solved by memorized answers."},{"id":"fiance-13","q":"What documents show you met in person?","ne":"तपाईंहरू प्रत्यक्ष भेट भएको के प्रमाण छ?","coach":"Describe actual visits and evidence such as tickets or photos if available.","sample":"We met in person on [accurate date], and I have [genuine evidence that exists].","caution":"Never manufacture travel records or staged photos."},{"id":"fiance-14","q":"What do you know about your fiancé(e)'s daily life?","ne":"मंगेतरको दैनिक जीवनबारे के थाहा छ?","coach":"Mention authentic information you actually know about work, interests and routine.","sample":"My fiancé(e) typically [truthful details], and we regularly talk about [real subjects].","caution":"Do not memorize an invented biography."},{"id":"fiance-15","q":"Who will pay for your first months in the United States?","ne":"अमेरिकामा सुरुका महिनाको खर्च कसले बेहोर्छ?","coach":"Explain real financial resources and arrangements while recognizing work authorization limitations.","sample":"Our initial expenses are planned around [actual savings and verified support].","caution":"A K-1 does not automatically grant unrestricted employment on arrival."},{"id":"fiance-16","q":"What is the difference between your engagement and a marriage?","ne":"इन्गेजमेन्ट र विवाहमा के फरक छ?","coach":"Explain actual current legal marital status and plans.","sample":"We are engaged, not yet married, and plan to marry after my arrival in accordance with K-1 requirements.","caution":"Already married couples generally should not claim K-1 eligibility."},{"id":"fiance-17","q":"How are you planning the wedding?","ne":"तपाईंहरूले विवाहको योजना कसरी बनाउनुभएको छ?","coach":"Describe actual discussions or bookings, while distinguishing tentative plans.","sample":"We have discussed [true wedding plans], and we intend to comply with the required timeline.","caution":"Do not invent wedding venues, bookings or dates."},{"id":"fiance-18","q":"How would you explain a previous engagement or marriage?","ne":"पहिलेको इन्गेजमेन्ट वा विवाहबारे कसरी बताउनुहुन्छ?","coach":"Give truthful status and legally relevant history.","sample":"[If applicable] I was previously [accurate status], and the relevant legal documentation is [actual document].","caution":"Past relationships or divorces should not be concealed."}],"hard":[{"id":"hard-1","q":"I don't know the exact date. What should I say?","ne":"ठ्याक्कै मिति थाहा नभए के भन्नुहोस्?","coach":"Say you do not remember precisely, give an accurate approximate period only if you know it.","sample":"I don't remember the exact date. I believe it was around [true approximate time]. May I check my documents?","caution":"Never guess a fake date to sound confident."},{"id":"hard-2","q":"You were unemployed in Nepal. Why will you work in America?","ne":"नेपालमा बेरोजगार हुनुहुन्थ्यो, अमेरिकामा किन काम गर्नुहुन्छ?","coach":"Give the genuine reason for the gap, your realistic plans and real resources; respect the visa's work rules.","sample":"I was not employed during [actual period] because [real reason]. My circumstances and plans are [truthful explanation]. If my immigration status permits employment, I hope to use my skills to find suitable work. Our initial expenses are covered by [real resources, if any].","caution":"For F-1, B-2 and K-1, do not claim unrestricted employment authorization."},{"id":"hard-3","q":"Why should we believe you will not become a public charge?","ne":"तपाईं सरकारी सहयोगमा निर्भर हुनुहुन्न भन्ने आधार के हो?","coach":"Explain real financial facts, household plan, support documents, assets, education and skills as relevant.","sample":"My financial plan is based on [real savings/income/qualifying sponsorship], and I have [actual documents if available]. I understand I should accurately explain my situation.","caution":"Do not say you will never need services or make promises you cannot substantiate."},{"id":"hard-4","q":"What if your sponsor loses their job?","ne":"स्पोन्सरले जागिर गुमाए के गर्नुहुन्छ?","coach":"Discuss an honest contingency plan, any real alternate savings or sponsor arrangements.","sample":"If that happened, we would review our finances and [actual contingency plan]. I can provide supporting information for any plan that is already in place.","caution":"Do not invent a joint sponsor."},{"id":"hard-5","q":"Your financial documents show low income. Explain.","ne":"तपाईंको आर्थिक कागजातमा आय कम देखिन्छ। किन?","coach":"Address the real numbers and situation transparently.","sample":"The documents reflect [truthful explanation of the reported income]. We can provide [actual additional evidence] if the officer requests it.","caution":"An affidavit alone does not guarantee eligibility."},{"id":"hard-6","q":"Why have you not worked for several years?","ne":"तपाईंले धेरै वर्ष किन काम गर्नुभएन?","coach":"State the actual activities during the period and give dates if possible.","sample":"During that period, I [was studying / caring for family / searching for work / another true activity]. I did not hold a formal job, and I can explain the timeline.","caution":"Choose only an option that is true. Do not invent work history."},{"id":"hard-7","q":"Why should a visa officer approve your application?","ne":"अधिकारीले तपाईंलाई भिसा किन दिनुपर्छ?","coach":"Explain the facts that make you eligible; no one deserves an approval merely from persuasive words.","sample":"I believe I meet the requirements for [my actual visa category] because [true supporting facts]. I am prepared to answer honestly and provide the required documents.","caution":"The officer, not the student or this tool, decides eligibility."},{"id":"hard-8","q":"Did you ever receive public benefits?","ne":"तपाईंले कहिल्यै सरकारी सहायता लिनुभएको छ?","coach":"Answer accurately; different benefits and circumstances may be treated differently.","sample":"[State accurately whether you received any benefits, which program if known, and relevant dates.] I would like to clarify the details if needed.","caution":"Never hide benefits or guess their legal effects."},{"id":"hard-9","q":"What happens if the visa is refused?","ne":"भिसा अस्वीकार भयो भने के गर्नुहुन्छ?","coach":"Stay calm and show understanding; do not promise approval or make untrue claims.","sample":"I would review the reason given and follow the appropriate instructions if any next steps are available.","caution":"A refusal can have different grounds and procedures."},{"id":"hard-10","q":"What if the officer asks something you do not understand?","ne":"अधिकारीको प्रश्न नबुझे के गर्नुहुन्छ?","coach":"Politely request repetition or a simpler explanation.","sample":"I'm sorry, could you please repeat the question more slowly?","caution":"Do not answer a question you did not understand."},{"id":"hard-11","q":"Your answers differ from your application. Why?","ne":"तपाईंको उत्तर र आवेदन किन फरक छ?","coach":"Acknowledge genuine errors and clarify without inventing a cover story.","sample":"I may have made a mistake when completing the form. The accurate information is [truthful correction], and I can explain or provide documentation.","caution":"Material inconsistencies can matter. Do not hide them."},{"id":"hard-12","q":"Can you guarantee that you will never need government help?","ne":"भविष्यमा सरकारी सहयोग कहिल्यै चाहिँदैन भनेर ग्यारेन्टी दिन सक्नुहुन्छ?","coach":"Avoid absolute promises about an unknown future; describe truthful current planning.","sample":"I cannot predict every future event. What I can explain is our actual financial plan, including [genuine resources and arrangements].","caution":"An unrealistic guarantee is not stronger than honest evidence."},{"id":"hard-13","q":"Your U.S. relative says they will sponsor you. Is that enough?","ne":"अमेरिकामा आफन्तले सहयोग गर्ने भन्नु मात्र पुग्छ?","coach":"Different visa types have different required evidence and affidavits; do not conflate them.","sample":"I understand the required documents depend on the visa category. My financial evidence includes [only the actual applicable forms and records].","caution":"IR1/CR1 generally involves I-864; K-1 may require I-134; B visitor visas do not require either to qualify."},{"id":"hard-14","q":"How can you prove a real marriage or engagement?","ne":"सम्बन्ध वास्तविक छ भनेर कसरी प्रमाणित गर्नुहुन्छ?","coach":"Describe truthful timeline, communication and relationship evidence.","sample":"Our relationship is genuine, and the supporting evidence includes [actual visits, communications, photos or documents we possess].","caution":"Never stage evidence or pretend an event occurred."},{"id":"hard-15","q":"Will you work in the United States without authorization?","ne":"अमेरिकामा अनुमति बिना काम गर्नुहुन्छ?","coach":"State genuine intent to comply with the rules of your specific visa.","sample":"I intend to follow the employment rules for my visa and work only when legally authorized.","caution":"Student, visitor, fiancé(e) and immigrant visas have different work permissions."},{"id":"hard-16","q":"Why do you have a long gap in your education?","ne":"पढाइमा लामो अन्तर किन आयो?","coach":"Explain the real reasons and what changed before applying.","sample":"My education was interrupted because [honest explanation]. During that time I [true activities], and I am now prepared to [actual study plan].","caution":"There is no need to invent certificates or jobs."},{"id":"hard-17","q":"Your spouse's mother owns expensive property. Can you count it as your own?","ne":"जीवनसाथीकी आमाको महँगो सम्पत्ति तपाईंको भनेर देखाउन मिल्छ?","coach":"Explain that property ownership and availability must be factually and legally documented.","sample":"That property belongs to my [actual relative]. I would not describe it as mine unless I legally own it or can document any qualifying financial arrangement.","caution":"Do not transfer ownership on paper solely to create misleading evidence."},{"id":"hard-18","q":"You do not have pay stubs for part of your history. What can you explain?","ne":"केही अवधिको तलब पर्ची छैन भने के भन्ने?","coach":"Give truthful facts about employment and only actual available documents.","sample":"For [true period], I [accurate work situation]. I can show [genuine tax records, employer letter or other evidence if available].","caution":"Never forge pay stubs, letters, or tax records."},{"id":"hard-19","q":"The officer asks for bank statements. What should you do?","ne":"अधिकारीले बैंक स्टेटमेन्ट माग्नुभयो भने के गर्ने?","coach":"Provide genuine current evidence and distinguish your accounts from anyone else's.","sample":"I can provide statements for [accounts I actually own or control], with accurate dates and balances.","caution":"A relative's account does not become your own by family relationship."},{"id":"hard-20","q":"What if you have savings but no current income?","ne":"बचत छ तर अहिले आम्दानी छैन भने के भन्ने?","coach":"Explain actual sources, liquidity and expenses without claiming savings always resolves eligibility.","sample":"My current income is [truthful amount or none], and my available savings are [actual amount, if documented].","caution":"Different visa categories evaluate finances differently; the officer decides."},{"id":"hard-21","q":"What if your spouse earns less than you expected?","ne":"जीवनसाथीको आम्दानी अनुमानभन्दा कम रहेछ भने के गर्ने?","coach":"Be accurate about the figure and any real qualifying alternative resources.","sample":"Our verified household income is [true figure]. We will follow the financial documentation requirements for our case.","caution":"Do not claim you have a joint sponsor who has not agreed and qualified."},{"id":"hard-22","q":"What if you are told your case needs administrative processing?","ne":"केस Administrative Processing मा गयो भने के गर्ने?","coach":"Repeat the consular instructions correctly and avoid guessing about timing.","sample":"I understand my case needs further processing. I will follow the consulate's instructions and provide any documents they request.","caution":"Only consular officials can confirm the exact grounds and expected next steps."},{"id":"hard-23","q":"The officer asks why your marriage interview answers differ. What should you say?","ne":"विवाहबारे तपाईंका उत्तर किन फरक परे भनेर सोधे के गर्ने?","coach":"Clarify genuine mistakes, memory limitations and differing perspectives without a prepared cover story.","sample":"I would like to clarify the details. My accurate recollection is [truthful facts], and I can explain what I remember.","caution":"Never coordinate a fabricated story with a partner."},{"id":"hard-24","q":"What if you do not know your sponsor's exact salary?","ne":"स्पोन्सरको सही तलब थाहा छैन भने के भन्नुहुन्छ?","coach":"Avoid stating unsupported amounts; consult genuine records if the officer permits.","sample":"I do not know the exact current figure. May I refer to the financial documents we submitted?","caution":"Inventing an amount is more harmful than admitting uncertainty."},{"id":"hard-25","q":"Why should we believe your future employment plans?","ne":"भविष्यमा काम गर्ने योजना किन विश्वास गर्ने?","coach":"Discuss genuine transferable skills, preparation and lawful ability to work, not a guaranteed job.","sample":"My plans are based on [true experience, education or preparation]. I understand employment depends on authorization and job availability.","caution":"Future job plans are not a substitute for current required financial evidence."},{"id":"hard-26","q":"How would you respond if the officer believes your answers are rehearsed?","ne":"अधिकारीलाई उत्तर रटेको जस्तो लागे के गर्ने?","coach":"Use clear, natural English, give truthful details, and acknowledge uncertainty where appropriate.","sample":"I want to explain my own circumstances clearly. I can answer follow-up questions based on what actually happened.","caution":"The aim is truthful understanding, not a perfect memorized script."}]};
const visaOfficialSources=[["Visa news and updates","https://travel.state.gov/content/travel/en/News/visas-news.html","Check new consular announcements and changing court-related policies"],["75-country immigrant visa pause update","https://travel.state.gov/en/newsroom/visas/2026/immigrant-visa-processing-updates-for-nationalities-at-high-risk-of-public-benefits-usage.html","Published August 28, 2026; may change after court action"],["Diversity visa issuance guidance","https://travel.state.gov/content/travel/en/News/visas-news/diversity-visa-issuance-updated-guidance.html","Published August 31, 2026; verify newest developments"],["Public charge guidance","https://travel.state.gov/content/travel/en/News/visas-news/preventing-public-benefits-reliance.html","Department of State guidance on financial circumstances"],["Public charge bonds","https://travel.state.gov/content/travel/en/News/visas-news/public-charge-bonds-for-immigrant-visa-applicants.html","Department of State public-charge-bond guidance"],["Spousal financial sponsorship (I-864)","https://travel.state.gov/content/travel/en/us-visas/immigrate/i-864-affidavit-faqs.html","Required evidence and public-charge considerations"],["U.S. Embassy Kathmandu instructions","https://travel.state.gov/content/travel/en/us-visas/Supplements/Supplements_by_Post/KDU-Kathmandu.html","Country-specific instructions for immigrant visa interviews"]];
function enhanceVisaInterviewCoach(doc,shell,ask){
 if(shell.querySelector('.sikau-visa-hub'))return;
 const hub=add(doc,shell,'section','sikau-visa-hub');
 shell.insertBefore(hub,shell.firstChild);
 const switcher=add(doc,hub,'div','sikau-visa-switcher');
 const visaTab=add(doc,switcher,'button','sikau-visa-switch active','🇺🇸 U.S. Visa Interview · भिसा अन्तर्वार्ता');
 const everydayTab=add(doc,switcher,'button','sikau-visa-switch','💬 Everyday Conversations · दैनिक कुराकानी');
 visaTab.type=everydayTab.type='button';
 const main=add(doc,hub,'div','sikau-visa-main');
 const head=add(doc,main,'div','sikau-visa-hero');
 const heading=add(doc,head,'div','sikau-visa-hero-copy');
 add(doc,heading,'div','sikau-visa-kicker','🇺🇸 FEATURED STUDY · मुख्य अभ्यास');
 add(doc,heading,'h2','','U.S. Visa Interview Practice');
 add(doc,heading,'p','','डीभी, विद्यार्थी, पर्यटक, पति-पत्नी र मंगेतर भिसाका लागि अंग्रेजी अभ्यास');
 add(doc,heading,'small','','Practice realistic questions. Speak clearly, answer truthfully, and learn how to handle difficult questions.');
 const numbers=add(doc,head,'div','sikau-visa-stats');
 add(doc,numbers,'strong','',String(Object.values(visaQuestions).reduce((n,p)=>n+p.length,0)));
 add(doc,numbers,'span','','Interview questions · प्रश्नहरू');
 const disclaimer=add(doc,main,'div','sikau-visa-caution');
 add(doc,disclaimer,'strong','','Your real story is your strongest answer · साँचो कुरा नै राम्रो उत्तर हो');
 add(doc,disclaimer,'p','','Sample replies are structures—not facts about you. Never invent jobs, income, sponsors, documents, relationships or travel. A well-practiced answer does not guarantee a visa. This tool is for English practice, not legal advice.');
 const categoriesRoot=add(doc,main,'div','sikau-visa-categories');
 const questionBrowser=add(doc,main,'section','sikau-visa-browser');
 const browserHead=add(doc,questionBrowser,'div','sikau-visa-browser-head');
 const browserCopy=add(doc,browserHead,'div','');
 add(doc,browserCopy,'h3','','📚 Browse interview questions · प्रश्न छानेर अभ्यास');
 add(doc,browserCopy,'p','','Choose a specific question or start the shuffled interview.');
 const browserCount=add(doc,browserHead,'span','sikau-visa-browser-count','');
 const searchInput=add(doc,questionBrowser,'input','sikau-visa-browser-search');
 searchInput.type='search';searchInput.placeholder='Search questions: public charge, work gap, finances…';
 searchInput.setAttribute('aria-label','Search visa interview questions in English or Nepali');
 const questionsList=add(doc,questionBrowser,'div','sikau-visa-question-list');
 const browserMore=add(doc,questionBrowser,'button','sikau-visa-browser-more','Show all questions · सबै प्रश्न');
 browserMore.type='button';
 const learner=add(doc,main,'section','sikau-visa-learner');
 const officials=add(doc,main,'section','sikau-visa-official');
 const updatesHead=add(doc,officials,'div','sikau-visa-updates-head');
 add(doc,updatesHead,'h3','','📰 Latest official information · आधिकारिक जानकारी');
 add(doc,updatesHead,'p','','Reference links checked October 20, 2026. This website does not automatically verify legal changes after that date. Open the U.S. government pages before an interview; updates or court orders may change without notice.');
 const sources=add(doc,officials,'div','sikau-visa-sources');
 for(const [label,url,description] of visaOfficialSources){
  const a=add(doc,sources,'a','sikau-visa-source');a.href=url;a.target='_blank';a.rel='noopener noreferrer';
  add(doc,a,'strong','',label+' ↗');add(doc,a,'small','',description);
 }
 const inputs=new Map();
 let kind='dv',deck=[],cursor=0,revealed=false,done=false,answerText='',last='',typed='',notes='';
 let showAllQuestions=false;
 const pick=()=>visaQuestions[kind]||[];
 function shuffled(pool,avoid=''){
  const out=[...pool];
  for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}
  if(out.length>1&&out[0].id===avoid)[out[0],out[1]]=[out[1],out[0]];
  return out;
 }
 function newDeck(){const avoid=deck[cursor]?.id||last;deck=shuffled(pick(),avoid);cursor=0;done=false;revealed=false;answerText='';typed='';notes='';}
 function chooseCategory(next){
  kind=next;last='';newDeck();showAllQuestions=false;searchInput.value='';
  renderCategories();renderQuestionBrowser();renderQuestion();
 }
 function renderCategories(){
  categoriesRoot.replaceChildren();
  for(const category of visaCategories){
   const b=add(doc,categoriesRoot,'button','sikau-visa-category'+(kind===category.id?' active':''));b.type='button';
   b.setAttribute('aria-pressed',String(kind===category.id));
   add(doc,b,'span','sikau-visa-icon',category.icon);
   const info=add(doc,b,'span','sikau-visa-category-copy');
   add(doc,info,'strong','',category.title);
   add(doc,info,'small','',category.ne);
   add(doc,info,'em','',category.code+' · '+visaQuestions[category.id].length+' questions');
   b.addEventListener('click',()=>chooseCategory(category.id));
  }
 }

 function goToQuestion(id){
  const found=deck.findIndex(item=>item.id===id);
  if(found<0)return;
  [deck[0],deck[found]]=[deck[found],deck[0]];
  cursor=0;done=false;revealed=false;typed='';notes='';
  renderQuestionBrowser();renderQuestion();
  learner.scrollIntoView?.({behavior:'smooth',block:'start'});
 }
 function renderQuestionBrowser(){
  const term=normalize(searchInput.value||'');
  const results=pick().filter(item=>!term||
   normalize([item.q,item.ne,item.coach].join(' ')).includes(term));
  questionsList.replaceChildren();
  browserCount.textContent=results.length+' questions · प्रश्न';
  const shown=showAllQuestions?results:results.slice(0,6);
  if(!results.length){
   add(doc,questionsList,'p','sikau-visa-browser-empty','No matching questions in this category. Try another search or category. · अर्को शब्द वा विषय खोज्नुहोस्।');
  }
  for(const question of shown){
   const b=add(doc,questionsList,'button','sikau-visa-question-choice');
   b.type='button';
   b.setAttribute('aria-label','Practice: '+question.q);
   add(doc,b,'span','sikau-visa-choice-bullet','🎤');
   const copy=add(doc,b,'span','sikau-visa-choice-copy');
   add(doc,copy,'strong','',question.q);
   add(doc,copy,'small','',question.ne);
   add(doc,b,'span','sikau-visa-choice-arrow','Practice →');
   b.addEventListener('click',()=>goToQuestion(question.id));
  }
  browserMore.hidden=results.length<=6;
  browserMore.textContent=showAllQuestions?'Show fewer · कम प्रश्न':'Show all '+results.length+' questions · सबै प्रश्न';
 }
 searchInput.addEventListener('input',()=>{showAllQuestions=false;renderQuestionBrowser();});
 browserMore.addEventListener('click',()=>{showAllQuestions=!showAllQuestions;renderQuestionBrowser();});
 function isUncertain(text){
  return /\b(i (do not|don't|cannot|can't) know|i (do not|don't) remember|not sure|not certain|may i check|could you repeat|please repeat)\b/i.test(text);
 }
 function evaluateText(text,question){
  const v=String(text||'').trim();
  if(v.length<8)return {type:'warning',message:'Try a complete sentence. · पूरा वाक्य लेखेर अभ्यास गर्नुहोस्।'};
  if(isUncertain(v))return {type:'info',message:'It is okay to be unsure. State what you genuinely know, ask to clarify or check records, and never guess details. · थाहा नभए स्पष्ट भन्नुहोस्, विवरण नबनाउनुहोस्।'};
  if(v.split(/\s+/).length<5)return {type:'info',message:'Good start. Add a genuine reason, timeline or supporting fact if relevant. · मिल्ने साँचो कारण वा तथ्य थप्नुहोस्।'};
  return {type:'info',message:'Draft ready for review. This basic check cannot tell whether your answer is relevant, accurate, grammatical or legally sufficient. Compare with the answer guide or ask AI Coach for feedback. · उत्तर नमुनासँग मिलाउनुहोस् वा AI Coach बाट सुधार माग्नुहोस्।'};
 }
 function advance(){
  const current=deck[cursor];last=current?.id||'';
  if(cursor===deck.length-1){done=true;}else{cursor++;revealed=false;answerText='';typed='';notes='';}
  renderQuestionBrowser();renderQuestion();
 }
 function repeatOrShuffle(){
  newDeck();renderQuestionBrowser();renderQuestion();
 }
 function sendNative(answer,q){
  const field=ask.querySelector('textarea')||ask.querySelector('input[type="text"]');
  if(!field){notes='Open the AI Coach form to write your question.';renderQuestion();return;}
  const prompt='Act as a careful English tutor for U.S. visa interview practice. This is NOT a legal eligibility assessment. Visa category: '+visaCategories.find(x=>x.id===kind)?.title+'. Interview question: '+q.q+'. My draft answer: '+(answer||'[I need help finding truthful words]')+'. Please: (1) ask me for missing facts instead of inventing them, (2) improve my grammar and natural English while preserving exactly what I claim, (3) explain in Nepali, (4) suggest a short answer, (5) flag any unverifiable claims and advise checking official travel.state.gov sources. Never promise a visa or advise misrepresentation.';
  const view=doc.defaultView;
  try{
   const type=field.tagName==='TEXTAREA'?view.HTMLTextAreaElement:view.HTMLInputElement;
   const setter=type&&Object.getOwnPropertyDescriptor(type.prototype,'value')?.set;
   if(setter)setter.call(field,prompt);else field.value=prompt;
   field.dispatchEvent(new view.Event('input',{bubbles:true}));
  }catch(_){field.value=prompt;}
  shell.parentElement?.classList.add('sikau-convo-ai-open');
  ask.scrollIntoView?.({behavior:'smooth',block:'center'});
  notes='AI Coach draft prepared. Press the existing Ask Coach button; it has not been sent automatically. · प्रश्न तयार छ। Ask Coach थिच्नुहोस्।';
  const status=learner.querySelector('.sikau-visa-ai-notice');if(status)status.textContent=notes;
 }
 function renderQuestion(){
  learner.replaceChildren();
  const section=visaCategories.find(x=>x.id===kind);
  const title=add(doc,learner,'div','sikau-visa-question-head');
  add(doc,title,'strong','',section.icon+' '+section.title+' · '+section.ne);
  const change=add(doc,title,'button','sikau-visa-shuffle','🎲 Shuffle questions · नयाँ प्रश्न');change.type='button';change.addEventListener('click',repeatOrShuffle);
  if(done){
   const complete=add(doc,learner,'div','sikau-visa-done');
   add(doc,complete,'h3','','🏆 Practice round complete!');
   add(doc,complete,'p','','You practiced '+deck.length+' different questions. This is not official visa progress or an approval prediction. · सबै प्रश्न अभ्यास भयो!');
   const again=add(doc,complete,'button','sikau-visa-primary','↻ New shuffled round');again.type='button';again.addEventListener('click',repeatOrShuffle);
   return;
  }
  const q=deck[cursor];if(!q)return;
  const progress=add(doc,learner,'div','sikau-visa-progress');
  add(doc,progress,'span','','Question '+(cursor+1)+' of '+deck.length+' · अभ्यास क्रम');
  const bar=add(doc,progress,'div','sikau-visa-track');const fill=add(doc,bar,'div','sikau-visa-track-fill');fill.style.width=((cursor+1)/deck.length*100)+'%';
  const prompt=add(doc,learner,'div','sikau-visa-prompt');
  add(doc,prompt,'span','sikau-visa-officer','🧑‍💼 Consular officer asks · अधिकारीको प्रश्न');
  add(doc,prompt,'h3','',q.q);
  add(doc,prompt,'p','',q.ne);
  const controls=add(doc,prompt,'div','sikau-visa-control-row');
  const hear=add(doc,controls,'button','sikau-visa-secondary','🔊 Listen to question');hear.type='button';hear.addEventListener('click',()=>{
   const v=doc.defaultView;
   try{if(v.speechSynthesis&&v.SpeechSynthesisUtterance){v.speechSynthesis.cancel();const u=new v.SpeechSynthesisUtterance(q.q);u.lang='en-US';u.rate=.87;v.speechSynthesis.speak(u);}else if(typeof v.speak==='function')v.speak(q.q,.87,'en');}catch(_){}
  });
  const response=add(doc,learner,'div','sikau-visa-response');
  add(doc,response,'label','sikau-visa-label','✍️ Your answer in English · आफ्नो अंग्रेजी उत्तर');
  const input=add(doc,response,'textarea','sikau-visa-input');input.rows=4;input.maxLength=1200;input.value=typed;
  input.placeholder='Speak from your own experience. If unsure, say so honestly…';
  input.setAttribute('aria-label','Your draft interview answer');
  input.addEventListener('input',()=>{typed=input.value;});
  const buttonRow=add(doc,response,'div','sikau-visa-action-row');
  const check=add(doc,buttonRow,'button','sikau-visa-primary','✓ Practice feedback');check.type='button';
  const unsure=add(doc,buttonRow,'button','sikau-visa-secondary','🤔 I don’t know · थाहा छैन');unsure.type='button';
  const show=add(doc,buttonRow,'button','sikau-visa-secondary','👁 See answer guide');show.type='button';
  const next=add(doc,buttonRow,'button','sikau-visa-secondary','Next question →');next.type='button';
  const feedback=add(doc,response,'div','sikau-visa-feedback');feedback.setAttribute('role','status');feedback.setAttribute('aria-live','polite');
  function setFeedback(kind,message){feedback.className='sikau-visa-feedback '+kind;feedback.textContent=message;}
  check.addEventListener('click',()=>{
   const assessment=evaluateText(typed,q);setFeedback(assessment.type,assessment.message);
  });
  unsure.addEventListener('click',()=>setFeedback('info','Say “I don’t remember the exact date,” or “Could you please repeat the question?” if true. Ask to clarify, check actual records, and never guess or invent facts. · थाहा नभए स्पष्ट बताउनुहोस्।'));
  show.addEventListener('click',()=>{revealed=!revealed;renderGuide();});
  next.addEventListener('click',advance);
  const guide=add(doc,response,'div','sikau-visa-guide');
  function renderGuide(){
   guide.replaceChildren();guide.hidden=!revealed;
   if(!revealed)return;
   add(doc,guide,'h4','','🌱 Answer coaching · उत्तर कसरी तयार गर्ने');
   add(doc,guide,'strong','','What matters · के महत्त्वपूर्ण छ');
   add(doc,guide,'p','',q.coach);
   add(doc,guide,'strong','','Example structure (customize truthfully) · नमुना बनावट');
   add(doc,guide,'blockquote','',q.sample);
   add(doc,guide,'strong','','Important caution · सावधानी');
   add(doc,guide,'p','',q.caution);
  }
  renderGuide();
  const ai=add(doc,response,'button','sikau-visa-ai','✨ Improve my English with AI Coach · AI बाट सुधार्नुहोस्');
  ai.type='button';ai.addEventListener('click',()=>sendNative(typed,q));
  const aiNotice=add(doc,response,'p','sikau-visa-ai-notice',notes);aiNotice.setAttribute('role','status');
  const source=add(doc,learner,'p','sikau-visa-category-source');
  add(doc,source,'span','','Official category information: ');
  const link=add(doc,source,'a','',section.title+' · travel.state.gov ↗');link.href=section.source;link.target='_blank';link.rel='noopener noreferrer';
 }
 function switchView(visa){
  // Isolate the two screens at the DOM level, not just by a CSS class.
  const everyday=doc.getElementById('sikauCoachEveryday');
  hub.hidden=!visa;
  main.hidden=!visa;
  // Inline display protection survives a late or cached stylesheet.
  hub.style.setProperty('display',visa?'block':'none','important');
  hub.setAttribute('aria-hidden',String(!visa));
  if('inert' in hub)hub.inert=!visa;
  if(everyday){
   everyday.hidden=visa;
   everyday.style.setProperty('display',visa?'none':'block','important');
   everyday.setAttribute('aria-hidden',String(visa));
   if('inert' in everyday)everyday.inert=visa;
  }
  visaTab.classList.toggle('active',visa);everydayTab.classList.toggle('active',!visa);
  shell.classList.toggle('sikau-visa-focused',visa);
  visaTab.setAttribute('aria-pressed',String(visa));everydayTab.setAttribute('aria-pressed',String(!visa));
 }
 visaTab.addEventListener('click',()=>switchView(true));
 everydayTab.addEventListener('click',()=>switchView(false));
 chooseCategory('dv');switchView(true);
 return {showVisa:()=>switchView(true),showEveryday:()=>switchView(false)};
}

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

/* Give visa preparation its own main navigation destination without creating
 * another lesson document or changing the original authenticated tab router.
 * Clicking the Visa item opens the authorized Coach page using its native
 * navigation button, then displays only the Visa study experience.
 */
function installVisaSidebar(doc,shell,visaController){
 const nav=doc.querySelector('#mobileModes.nav')||doc.querySelector('.nav');
 if(!nav||!visaController)return false;
 const coachButton=Array.from(nav.querySelectorAll('button[data-t]'))
   .find(button=>String(button.dataset.t||'').toLowerCase()==='coach');
 if(!coachButton)return false;
 // The private nav's sorter may briefly clone a custom button. Keep one
 // real Visa destination and its original event handler, never two copies.
 const existingVisa=Array.from(nav.querySelectorAll(':scope > button.sikau-visa-nav'));
 let visaButton=(nav.__sikauVisaOriginal?.parentElement===nav?nav.__sikauVisaOriginal:null)||
   existingVisa.find(button=>button.__sikauVisaBound===true)||
   existingVisa[0]||null;
 if(visaButton){
  for(const extra of existingVisa)if(extra!==visaButton)extra.remove();
  // A DOM clone carries dataset attributes but does NOT carry JS listeners.
  if(visaButton.dataset.sikauVisaClick&&!visaButton.__sikauVisaBound)
   delete visaButton.dataset.sikauVisaClick;
 }

 if(!visaButton){
  visaButton=doc.createElement('button');
  visaButton.type='button';visaButton.className='sikau-visa-nav';
  visaButton.setAttribute('aria-label','U.S. Visa Interview · अमेरिकी भिसा अन्तर्वार्ता');
  const icon=doc.createElement('i');icon.className='sikau-visa-nav-icon';icon.textContent='🏛️';icon.setAttribute('aria-hidden','true');visaButton.appendChild(icon);
  const label=doc.createElement('span');label.className='sikau-nav-word sikau-visa-nav-word';
  const name=doc.createElement('strong');name.textContent='U.S. Visa Interview';
  const ne=doc.createElement('small');ne.lang='ne';ne.textContent='अमेरिकी भिसा अन्तर्वार्ता';
  label.append(name,ne);visaButton.append(label);
  nav.insertBefore(visaButton,coachButton.nextSibling);
 }
 // Consistent navigation icon instead of the retired US badge.
 let visaIcon=visaButton.querySelector('.sikau-visa-nav-icon');
 if(!visaIcon){visaIcon=doc.createElement('i');visaIcon.className='sikau-visa-nav-icon';visaButton.prepend(visaIcon);}
 if(visaIcon.textContent!=='🏛️')visaIcon.textContent='🏛️';
 visaIcon.setAttribute('aria-hidden','true');
 nav.__sikauVisaOriginal=visaButton;
 shell.classList.add('sikau-visa-standalone');
 // The protected lessons may rebuild #coach after navigation. Listeners on the
 // persistent sidebar must always address the CURRENT screen, not the old one.
 nav.__sikauVisaController=visaController;
 nav.__sikauVisaShell=shell;
 const docRoot=doc.documentElement;
 function markVisa(active){
  // Reassert one selected custom tab after the protected view is rebuilt.
  if(active){
   docRoot.classList.remove('sikau-home-active');
   const homeButton=nav.querySelector('.sikau-home-nav');
   homeButton?.classList.remove('on');
   homeButton?.removeAttribute('aria-current');
   const panel=doc.getElementById('sikauHomeScreen');
   if(panel)panel.hidden=true;
  }
  docRoot.classList.toggle('sikau-visa-nav-active',active);
  docRoot.dataset.sikauVisaMode=active?'visa':'everyday';
  visaButton.classList.toggle('on',active);
  if(active)visaButton.setAttribute('aria-current','page');
  else visaButton.removeAttribute('aria-current');
 }
 if(!nav.dataset.sikauVisaListening){
  nav.dataset.sikauVisaListening='1';
  nav.addEventListener('click',event=>{
   // Our own internal Coach navigation must not clear the Visa selection.
   if(nav.__sikauSelectingVisa)return;
   const target=event.target?.closest?.('button[data-t]');
   if(!target){
    if(event.target?.closest?.('.sikau-home-nav')){
     docRoot.classList.remove('sikau-visa-nav-active');
     docRoot.dataset.sikauVisaMode='everyday';
     const current=nav.querySelector('.sikau-visa-nav');
     current?.classList.remove('on');current?.removeAttribute('aria-current');
    }
    return;
   }
   const current=nav.querySelector('.sikau-visa-nav');
   // The hidden native Coach page remains loaded while Visa is selected.
   // Track its route separately from the visible '.on' nav highlight.
   nav.dataset.sikauUnderlyingCoach=String(target.dataset.t||'').toLowerCase()==='coach'?'true':'false';
   docRoot.classList.remove('sikau-visa-nav-active');
   docRoot.dataset.sikauVisaMode='everyday';
   current?.classList.remove('on');current?.removeAttribute('aria-current');
   if(String(target.dataset.t||'').toLowerCase()==='coach')
    nav.__sikauVisaController?.showEveryday();
  },true);
 }
 if(!visaButton.__sikauVisaBound){
  visaButton.__sikauVisaBound=true;
  visaButton.dataset.sikauVisaClick='1';
  visaButton.addEventListener('click',event=>{
   event.preventDefault();event.stopPropagation();event.stopImmediatePropagation();
   const current=nav.querySelector('.sikau-visa-nav');
   // Festivals is a custom navigation destination, not part of the native
   // button[data-t] set. Clear both the visual state and its home panel.
   docRoot.classList.remove('sikau-home-active');
   const festivalButton=nav.querySelector('.sikau-home-nav');
   festivalButton?.classList.remove('on');
   festivalButton?.removeAttribute('aria-current');
   const festivalPage=doc.getElementById('sikauHomeScreen');
   if(festivalPage)festivalPage.hidden=true;
   docRoot.classList.add('sikau-visa-nav-active');
   docRoot.dataset.sikauVisaMode='visa';
   current?.classList.add('on');
   current?.setAttribute('aria-current','page');
   // Use original lesson routing only when Coach is not already active.
   // This avoids unnecessary native tab re-renders in the protected frame.
   if(!coachButton.classList.contains('on')&&nav.dataset.sikauUnderlyingCoach!=='true'){
    nav.__sikauSelectingVisa=true;
    try{coachButton.click();}
    finally{nav.__sikauSelectingVisa=false;}
   }
   nav.dataset.sikauUnderlyingCoach='true';
   nav.__sikauVisaController?.showVisa();
   // Reconcile the visual selection after the private Coach router finishes.
   const sync=doc.defaultView?.sikauScheduleSidebarSync;
   if(typeof sync==='function')sync(doc,'visa');
   else doc.defaultView?.requestAnimationFrame?.(()=>{
    // Public/index personalization code may install the global reconciler later.
    const chosen=nav.querySelector('.sikau-visa-nav');
    for(const b of nav.querySelectorAll('button[data-t],button.sikau-visa-nav')){
     b.classList.toggle('on',b===chosen);
     if(b===chosen)b.setAttribute('aria-current','page');
     else b.removeAttribute('aria-current');
    }
   });
   doc.getElementById('sikauCoachConversations')?.scrollIntoView?.({behavior:'auto',block:'start'});
   // Let native tab redraws finish, then enforce the requested view.
   doc.defaultView?.requestAnimationFrame?.(()=>{
    if(docRoot.dataset.sikauVisaMode==='visa')
     nav.__sikauVisaController?.showVisa();
   });
  });
 }
 // Do NOT unconditionally reset to Everyday: a re-created Coach screen must
 // retain the selected Visa tab even when the original sidebar survives.
 const restoreVisa=docRoot.dataset.sikauVisaMode==='visa'||
  (visaButton.classList.contains('on')&&docRoot.classList.contains('sikau-visa-nav-active'));
 markVisa(restoreVisa);
 if(restoreVisa)nav.__sikauVisaController.showVisa();
 else nav.__sikauVisaController.showEveryday();
 return true;
}
/* The old native Coach includes a second, unrelated "Explore Nepal in English"
 * culture search card below our real-life and Visa screens. Keep it out of
 * BOTH Coach views, without removing festival, translation, or word lessons.
 * Runs again on protected-lesson re-render via personalizeStudentLesson().
 */
function hideRedundantCoachCultureLab(doc){
 if(!doc?.body)return 0;
 const oldHero=doc.querySelector('.coach-top');
 const coachRoot=doc.querySelector('#coach')||doc.querySelector('#coachRoot')||
   oldHero?.closest?.('.page,section[data-page],section[id]')||
   oldHero?.parentElement?.parentElement;
 if(!coachRoot)return 0;
 const nodes=new Set();
 // Match the original native culture component and not every culture label.
 for(const node of doc.querySelectorAll('#cultureLab,.culture-lab')){
  // The legacy culture card may be a sibling below #coachRoot in some builds.
  // Its unique title identifies this exact unwanted panel, not other lessons.
  if(/Explore Nepal in English/i.test(node.textContent||''))nodes.add(node);
 }
 // Older private lesson versions use a generic .card instead of .culture-lab.
 for(const heading of coachRoot.querySelectorAll('h1,h2,h3,h4')){
  if(!/^Explore Nepal in English(?:\s|$)/i.test((heading.textContent||'').trim()))continue;
  let panel=heading.closest('#cultureLab,.culture-lab,.card,section');
  if(!panel||panel===coachRoot||panel.contains(oldHero))continue;
  const copy=(panel.textContent||'');
  if(copy.length>14000||!/Explore Nepal in English/i.test(copy))continue;
  nodes.add(panel);
 }
 for(const node of nodes){
  node.hidden=true;
  node.style?.setProperty?.('display','none','important');
  node.setAttribute('aria-hidden','true');
  node.setAttribute('data-sikau-coach-extra-hidden','true');
 }
 return nodes.size;
}
window.enhanceCoachDashboard=function(doc){
 if(!doc?.body||!doc.head)return;
 hideRedundantCoachCultureLab(doc);
 const oldHero=doc.querySelector('.coach-top'),ask=doc.querySelector('.coach-ask');
 if(!oldHero||!ask||!oldHero.parentElement)return;
 const previous=doc.getElementById('sikauCoachConversations');
 if(previous&&(previous.isConnected||previous.parentElement)){
  // The parent's personalization observer may revisit an already mounted
  // Coach. Reassert the actual sidebar mode without installing new listeners.
  const nav=doc.querySelector('#mobileModes.nav')||doc.querySelector('.nav');
  if(nav?.__sikauVisaShell===previous){
   if(doc.documentElement.dataset.sikauVisaMode==='visa')nav.__sikauVisaController?.showVisa();
   else nav.__sikauVisaController?.showEveryday();
  }
  return;
 }
 if(previous)previous.remove();
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
 const toggleNe=add(doc,banner,'button','sikau-convo-language','🇳🇵 Nepali translations: On');toggleNe.type='button';
 const browser=add(doc,shell,'section','sikau-convo-browser');
 const filters=add(doc,browser,'div','sikau-convo-filters');
 const topicsRow=add(doc,filters,'div','sikau-convo-topics');
 const searchBox=add(doc,filters,'label','sikau-convo-search');
 add(doc,searchBox,'span','','🔎');
 const searchInput=add(doc,searchBox,'input','','');searchInput.type='search';searchInput.placeholder='Search: hospital, restaurant, directions…';
 searchInput.setAttribute('aria-label','Search real life situations');
 const cards=add(doc,browser,'div','sikau-convo-cards');
 const footer=add(doc,browser,'p','sikau-convo-list-note','Guided bilingual conversations. Writing mode checks key phrases; use Ask AI Coach for deeper grammar feedback. · लेख्ने अभ्यासमा मुख्य शब्द जाँचिन्छ। विस्तृत सुधारका लागि AI Coach प्रयोग गर्नुहोस्।');
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
  toggleNe.textContent='🇳🇵 Nepali translations: '+(showNepali?'On':'Off');
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
 // Dedicated, independently hideable section for daily-life conversations.
 // Do not hide/recreate the original native Coach backend.
 const everydayContainer=add(doc,shell,'div','sikau-convo-everyday');
 everydayContainer.id='sikauCoachEveryday';
 [top,banner,browser,stage,notice].forEach(node=>everydayContainer.appendChild(node));
 const visaController=enhanceVisaInterviewCoach(doc,shell,ask);
 installVisaSidebar(doc,shell,visaController);
 hideRedundantCoachCultureLab(doc);
};
})();