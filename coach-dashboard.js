/* English Sikau Real-Life Conversation Coach.
 * Presentation-layer guided practice in an authorized, loaded lesson frame.
 * No new login, trial, payment, storage or verified XP operations.
 * The user's existing Ask Coach service remains the optional open-ended tool.
 */
(function(){
'use strict';
const STYLE_URL=new URL('coach-dashboard.css?v=20261029-pagination25-r1',document.baseURI).href;
const scenarios=[{"id":"return-shirt","emoji":"👕","title":"Return clothing","ne":"लुगा फिर्ता","category":"Shopping","place":"Clothing store · कपडा पसल","partner":"Store assistant","level":"Easy","steps":[{"npc":"Hello! How can I help you today?","npcNe":"नमस्ते! म तपाईंलाई कसरी मद्दत गर्न सक्छु?","goal":"यो कमिज फिर्ता गर्न चाहन्छु भन्नुहोस्।","answer":"I'd like to return this shirt, please.","answerNe":"म यो कमिज फिर्ता गर्न चाहन्छु।","bad1":"I was walking here yesterday.","bad2":"The shirt is blue and the sky is blue.","accept":["return shirt","return this","bring shirt back"],"hint":"Use “I'd like to return…” to be polite.","after":"Of course. Do you have your receipt?"},{"npc":"Do you have your receipt?","npcNe":"के तपाईंसँग रसिद छ?","goal":"रसिद छ भन्नुहोस्।","answer":"Yes, I have the receipt right here.","answerNe":"हो, रसिद यहीँ छ।","bad1":"Please give me another sandwich.","bad2":"My receipt likes the weather.","accept":["have receipt","here receipt","receipt right here"],"hint":"“Here is my receipt” is also natural.","after":"Thanks. Is there a problem with the shirt?"},{"npc":"What is wrong with the shirt?","npcNe":"कमिजमा के समस्या छ?","goal":"साइज सानो छ भन्नुहोस्।","answer":"It's too small for me.","answerNe":"यो मलाई धेरै सानो भयो।","bad1":"I want to buy a larger television.","bad2":"I'm from Kathmandu, thank you.","accept":["too small","size small","doesn't fit","does not fit"],"hint":"You can say “It doesn't fit.”","after":"Would you like a refund or an exchange?"},{"npc":"Would you like a refund or an exchange?","npcNe":"पैसा फिर्ता चाहिन्छ कि साट्न चाहनुहुन्छ?","goal":"पैसा फिर्ता चाहिन्छ भन्नुहोस्।","answer":"I'd prefer a refund, please.","answerNe":"म पैसा फिर्ता लिन चाहन्छु।","bad1":"My refund is at school.","bad2":"No, I want a bus ticket.","accept":["refund","money back","return my money"],"hint":"“I'd prefer…” is softer than “I want…”.","after":"Absolutely. I'll process the refund. Thank you!"}]},{"id":"buy-phone","emoji":"📱","title":"Buy a phone","ne":"फोन किन्नु","category":"Shopping","place":"Phone shop · मोबाइल पसल","partner":"Salesperson","level":"Easy","steps":[{"npc":"Welcome! What are you looking for?","npcNe":"स्वागत छ! तपाईं के खोज्दै हुनुहुन्छ?","goal":"नयाँ फोन चाहिन्छ भन्नुहोस्।","answer":"I'm looking for a new phone.","answerNe":"म नयाँ फोन खोज्दै छु।","bad1":"I'd like to book a hotel.","bad2":"I saw a movie yesterday.","accept":["new phone","buy phone","looking phone"],"hint":"get used to “I'm looking for…”","after":"We have many models. What is your budget?"},{"npc":"What is your budget?","npcNe":"तपाईंको बजेट कति छ?","goal":"पाँच सय डलरभन्दा कम भन्नुहोस्।","answer":"My budget is under five hundred dollars.","answerNe":"मेरो बजेट पाँच सय डलरभन्दा कम छ।","bad1":"I would like a bag of rice.","bad2":"I am going to school tomorrow.","accept":["under five hundred","under 500","less than 500","budget 500"],"hint":"Use “under” or “less than” for a maximum price.","after":"I can show you a few phones in that range."},{"npc":"Would you like to compare these two phones?","npcNe":"यी दुई फोन तुलना गर्न चाहनुहुन्छ?","goal":"क्यामेरा र ब्याट्रीबारे सोध्नुहोस्।","answer":"Which phone has a better camera and battery?","answerNe":"कुन फोनको क्यामेरा र ब्याट्री राम्रो छ?","bad1":"What time is the restaurant open?","bad2":"I need a new shirt.","accept":["camera battery","better camera","better battery"],"hint":"“Which phone has…?” asks about features.","after":"This one has a stronger battery."},{"npc":"Would you like to buy it today?","npcNe":"आज नै किन्न चाहनुहुन्छ?","goal":"वारेन्टी छ कि छैन सोध्नुहोस्।","answer":"Does it come with a warranty?","answerNe":"के यसमा वारेन्टी छ?","bad1":"Is there a train to the airport?","bad2":"I like watermelon juice.","accept":["warranty","guarantee"],"hint":"Ask “Does it come with…?” to check what is included.","after":"Yes, it has a one-year warranty."}]},{"id":"directions","emoji":"🗺️","title":"Ask for directions","ne":"बाटो सोध्नु","category":"Travel","place":"City street · सहरको सडक","partner":"Local resident","level":"Easy","steps":[{"npc":"Excuse me, can I help you?","npcNe":"माफ गर्नुहोस्, म मद्दत गर्न सक्छु?","goal":"अस्पताल कहाँ छ भनेर सोध्नुहोस्।","answer":"Could you tell me where the hospital is?","answerNe":"अस्पताल कहाँ छ भनेर बताइदिनुहुन्छ?","bad1":"I would like to buy a shirt.","bad2":"I ate rice today.","accept":["where hospital","hospital direction","find hospital","get hospital"],"hint":"“Could you tell me where…?” sounds polite.","after":"The hospital is near the main road."},{"npc":"Are you walking or driving?","npcNe":"तपाईं हिँडेर जाँदै हुनुहुन्छ कि गाडीमा?","goal":"हिँडेर जाँदै छु भन्नुहोस्।","answer":"I'm walking there.","answerNe":"म हिँडेर जाँदै छु।","bad1":"My car is a yellow banana.","bad2":"I need a small shirt.","accept":["walking","on foot","walk there"],"hint":"“I'm going on foot” means walking.","after":"Great! Go straight for two blocks."},{"npc":"Do I turn left at the lights?","npcNe":"बत्ती भएको ठाउँमा बायाँ मोड्ने हो?","goal":"बायाँ मोड्नुपर्ने हो भनेर पुष्टि गर्नुहोस्।","answer":"Should I turn left at the traffic lights?","answerNe":"ट्राफिक बत्तीमा बायाँ मोड्नुपर्छ?","bad1":"My favorite food is momo.","bad2":"Where is my homework?","accept":["turn left","left at lights","left traffic"],"hint":"Use “Should I…?” to confirm directions.","after":"Yes, then the hospital will be on your right."},{"npc":"Anything else?","npcNe":"अरू केही चाहिन्छ?","goal":"धन्यवाद भन्नुहोस्।","answer":"Thank you so much for your help!","answerNe":"तपाईंको मद्दतका लागि धेरै धन्यवाद!","bad1":"Can I return this phone?","bad2":"The weather is green.","accept":["thank you","thanks"],"hint":"“Thank you so much” is friendly and natural.","after":"You're very welcome. Have a good day!"}]},{"id":"call-hospital","emoji":"☎️","title":"Call for an appointment","ne":"फोनबाट अपोइन्टमेन्ट","category":"Healthcare","place":"Phone call · टेलिफोन","partner":"Hospital receptionist","level":"Medium","steps":[{"npc":"Good morning, Valley Clinic. How may I help you?","npcNe":"शुभ प्रभात, भ्याली क्लिनिक। कसरी मद्दत गर्न सक्छु?","goal":"डाक्टरसँग भेट्ने समय मिलाउन चाहन्छु भन्नुहोस्।","answer":"I'd like to make an appointment with a doctor.","answerNe":"म डाक्टरसँग भेट्ने समय मिलाउन चाहन्छु।","bad1":"Can I order a pizza, please?","bad2":"Where can I buy a jacket?","accept":["make appointment","book appointment","see doctor","schedule visit"],"hint":"“Make an appointment” is a standard expression.","after":"Certainly. Is this for a routine visit?"},{"npc":"What is the reason for your appointment?","npcNe":"अपोइन्टमेन्टको कारण के हो?","goal":"सामान्य स्वास्थ्य जाँचका लागि हो भन्नुहोस्।","answer":"It's for a routine checkup.","answerNe":"यो सामान्य स्वास्थ्य जाँचका लागि हो।","bad1":"I need directions to the museum.","bad2":"I lost my bus ticket.","accept":["routine checkup","regular checkup","annual physical","general checkup","checkup"],"hint":"“Routine checkup” means a regular health visit.","after":"We have an opening on Thursday."},{"npc":"Would Thursday at ten work for you?","npcNe":"बिहीबार दस बजे ठीक हुन्छ?","goal":"त्यो समय ठीक छ भन्नुहोस्।","answer":"Yes, Thursday at ten works for me.","answerNe":"हो, बिहीबार दस बजे ठीक छ।","bad1":"I want a refund for my shoes.","bad2":"My phone has a nice camera.","accept":["thursday ten","thursday 10","time works","that works","yes please"],"hint":"“That works for me” means the time is convenient.","after":"Great. Please arrive fifteen minutes early."},{"npc":"Do you have any questions?","npcNe":"के तपाईंको कुनै प्रश्न छ?","goal":"के ल्याउनुपर्ने हो भनेर सोध्नुहोस्।","answer":"What should I bring to my appointment?","answerNe":"मैले अपोइन्टमेन्टमा के ल्याउनुपर्छ?","bad1":"Can I get a large coffee?","bad2":"The sky is cloudy.","accept":["what bring","need bring","bring appointment","bring insurance"],"hint":"A useful question to ask during a phone booking.","after":"Please bring your ID and insurance card, if you have one."}]},{"id":"hospital-checkin","emoji":"🏥","title":"Check in at a hospital","ne":"अस्पतालमा दर्ता","category":"Healthcare","place":"Hospital desk · अस्पताल काउन्टर","partner":"Receptionist","level":"Easy","steps":[{"npc":"Hello! How can I help you?","npcNe":"नमस्ते! म कसरी मद्दत गर्न सक्छु?","goal":"अपोइन्टमेन्ट छ भनेर भन्नुहोस्।","answer":"I have an appointment at eleven.","answerNe":"मेरो एघार बजे अपोइन्टमेन्ट छ।","bad1":"I'd like to buy apples.","bad2":"I need to return a shirt.","accept":["have appointment","appointment eleven","appointment 11"],"hint":"Start with “I have an appointment.”","after":"May I have your name, please?"},{"npc":"Can you confirm your date of birth?","npcNe":"जन्ममिति पुष्टि गर्न सक्नुहुन्छ?","goal":"जन्ममिति दिन तयार छु भन्नुहोस्, वास्तविक जानकारी आवश्यक छैन।","answer":"Yes, I can confirm my date of birth.","answerNe":"हो, म मेरो जन्ममिति पुष्टि गर्न सक्छु।","bad1":"The bus is near the lake.","bad2":"This is my shopping receipt.","accept":["confirm birth","date of birth","yes i can"],"hint":"Avoid entering real personal details in practice.","after":"Thank you. Do you have your insurance card?"},{"npc":"Do you have your insurance card?","npcNe":"बीमाको कार्ड छ?","goal":"कार्ड छ भन्नुहोस्।","answer":"Yes, I have my insurance card.","answerNe":"हो, मसँग बीमाको कार्ड छ।","bad1":"I'd like some hot tea.","bad2":"Can you repair my phone?","accept":["insurance card","have insurance","here my card"],"hint":"“Here is my insurance card” also works.","after":"Thanks. Please take a seat."},{"npc":"Do you know where to wait?","npcNe":"कहाँ पर्खने थाहा छ?","goal":"कहाँ बस्ने भनेर सोध्नुहोस्।","answer":"Where should I wait, please?","answerNe":"म कहाँ पर्खनुपर्छ?","bad1":"How expensive is this phone?","bad2":"I want a refund.","accept":["where wait","where sit","waiting area"],"hint":"Use “Where should I…?” for directions.","after":"Please wait in the seating area over there."}]},{"id":"restaurant","emoji":"🍽️","title":"Order at a restaurant","ne":"रेस्टुरेन्टमा खाना","category":"Food & Drink","place":"Restaurant · रेस्टुरेन्ट","partner":"Server","level":"Easy","steps":[{"npc":"Welcome! How many people are dining?","npcNe":"स्वागत छ! कति जना खाना खानुहुन्छ?","goal":"दुई जनाका लागि टेबल माग्नुहोस्।","answer":"A table for two, please.","answerNe":"कृपया दुई जनाका लागि टेबल।","bad1":"I need to buy a phone.","bad2":"I want to catch a bus.","accept":["table two","two people","two please"],"hint":"“A table for two” is a useful restaurant phrase.","after":"Right this way. Here are your menus."},{"npc":"Are you ready to order?","npcNe":"अर्डर दिन तयार हुनुहुन्छ?","goal":"मोमो र पानी माग्नुहोस्।","answer":"I'd like momo and a glass of water, please.","answerNe":"म मोमो र एक गिलास पानी चाहन्छु।","bad1":"I need a refund for my shirt.","bad2":"Where is the train station?","accept":["momo water","momo glass","order momo"],"hint":"“I'd like…” is more polite than “Give me…”.","after":"Sure! Would you like anything else?"},{"npc":"Would you like your food spicy?","npcNe":"खाना पिरो चाहिन्छ?","goal":"अलि कम पिरो बनाउन अनुरोध गर्नुहोस्।","answer":"Could you make it less spicy, please?","answerNe":"कृपया अलि कम पिरो बनाइदिनुहुन्छ?","bad1":"Can I borrow your notebook?","bad2":"I like new phones.","accept":["less spicy","not too spicy","mild please","not spicy"],"hint":"Use “Could you…?” for a polite request.","after":"Of course. I'll ask the kitchen."},{"npc":"How was your meal?","npcNe":"खाना कस्तो लाग्यो?","goal":"खाना मिठो थियो र बिल चाहिन्छ भन्नुहोस्।","answer":"It was delicious. Could we have the bill, please?","answerNe":"खाना मिठो थियो। बिल दिनुहुन्छ?","bad1":"Can you show me the hospital?","bad2":"I forgot my homework.","accept":["delicious bill","bill please","check please","food good bill"],"hint":"“The bill” or “the check” is natural.","after":"Thank you! I'll bring the bill now."}]},{"id":"groceries","emoji":"🛒","title":"Grocery shopping","ne":"किराना किनमेल","category":"Shopping","place":"Grocery store · किराना पसल","partner":"Store worker","level":"Easy","steps":[{"npc":"Hi! Are you looking for something?","npcNe":"नमस्ते! तपाईं केही खोज्दै हुनुहुन्छ?","goal":"स्याउ कहाँ छ भनेर सोध्नुहोस्।","answer":"Where can I find the apples?","answerNe":"स्याउ कहाँ पाउँछु?","bad1":"I need a doctor.","bad2":"Where is the hotel?","accept":["find apples","where apples","apples aisle"],"hint":"“Where can I find…?” helps in stores.","after":"The apples are in the produce section."},{"npc":"Do you need anything else?","npcNe":"अरू केही चाहिन्छ?","goal":"ताजा सागसब्जी पनि चाहिन्छ भन्नुहोस्।","answer":"Yes, I'm looking for fresh vegetables too.","answerNe":"हो, मलाई ताजा तरकारी पनि चाहिन्छ।","bad1":"My train is leaving soon.","bad2":"I'd like a room with a view.","accept":["fresh vegetables","looking vegetables","need vegetables"],"hint":"“Fresh produce” includes fruits and vegetables.","after":"They are beside the fruit."},{"npc":"Would you like a bag?","npcNe":"झोला चाहिन्छ?","goal":"पुनःप्रयोग गर्न मिल्ने झोला छ भन्नुहोस्।","answer":"No, thank you. I brought my own bag.","answerNe":"पर्दैन, धन्यवाद। मैले आफ्नै झोला ल्याएको छु।","bad1":"Please book my flight.","bad2":"I need to return my car.","accept":["own bag","brought bag","have bag","no bag"],"hint":"You can politely decline with “No, thank you.”","after":"Great! Have a good day."}]},{"id":"pharmacy","emoji":"💊","title":"At the pharmacy","ne":"औषधि पसलमा","category":"Healthcare","place":"Pharmacy · औषधि पसल","partner":"Pharmacist","level":"Medium","steps":[{"npc":"Hello, what can I help you find?","npcNe":"नमस्ते, के खोज्न मद्दत गरौं?","goal":"सामान्य दुखाइका लागि औषधिबारे सोध्न चाहन्छु भन्नुहोस्।","answer":"Could I ask about medicine for a headache?","answerNe":"टाउको दुखाइका लागि औषधिबारे सोध्न मिल्छ?","bad1":"I want to buy a winter coat.","bad2":"Can you show me your phones?","accept":["medicine headache","headache medicine","headache relief"],"hint":"This is language practice, not medication advice.","after":"Of course. Are you taking any other medicines?"},{"npc":"Do you have any allergies?","npcNe":"के तपाईंलाई कुनै एलर्जी छ?","goal":"थाहा छैन, डाक्टर वा फार्मासिस्टसँग जाँच्न चाहन्छु भन्नुहोस्।","answer":"I'm not sure. Could you help me check?","answerNe":"मलाई निश्चित छैन। जाँच्न मद्दत गर्नुहुन्छ?","bad1":"I would like a restaurant table.","bad2":"My shirt is too small.","accept":["not sure check","help check","ask doctor","check allergies"],"hint":"It's okay to say when you do not know something.","after":"Of course. We can talk through the information."},{"npc":"Do you have any other questions?","npcNe":"अरू कुनै प्रश्न छ?","goal":"औषधिको निर्देशन कहाँ पढ्ने भनेर सोध्नुहोस्।","answer":"Where can I read the instructions?","answerNe":"म निर्देशन कहाँ पढ्न सक्छु?","bad1":"Where is the airport gate?","bad2":"Can I get more rice?","accept":["read instructions","medicine directions","instructions label"],"hint":"Always ask a qualified professional about medicines.","after":"The instructions are on the label. Please ask us if anything is unclear."}]},{"id":"coffee","emoji":"☕","title":"Order at a café","ne":"क्याफेमा अर्डर","category":"Food & Drink","place":"Café · क्याफे","partner":"Barista","level":"Easy","steps":[{"npc":"Hi! What can I get for you?","npcNe":"नमस्ते! तपाईंलाई के चाहिन्छ?","goal":"एउटा सानो चिया माग्नुहोस्।","answer":"Could I have a small tea, please?","answerNe":"मलाई एउटा सानो चिया दिनुहुन्छ?","bad1":"Can you fix my bicycle?","bad2":"I need to find a doctor.","accept":["small tea","tea please","cup tea"],"hint":"“Could I have…?” is polite in cafés.","after":"Sure. Would you like sugar?"},{"npc":"Would you like sugar?","npcNe":"चिनी हाल्ने?","goal":"चिनी नहाल्ने भन्नुहोस्।","answer":"No sugar, please.","answerNe":"कृपया चिनी नहाल्नुहोस्।","bad1":"I need a new jacket.","bad2":"I am going to Pokhara.","accept":["no sugar","without sugar","skip sugar"],"hint":"“Without sugar” is another way to say this.","after":"No problem. Anything else?"},{"npc":"Is that for here or to go?","npcNe":"यहीँ खाने कि लैजाने?","goal":"लैजाने भन्नुहोस्।","answer":"To go, please.","answerNe":"लैजान्छु, कृपया।","bad1":"I need an appointment.","bad2":"The phone is broken.","accept":["to go","take away","takeout"],"hint":"“To go” is common in American English.","after":"Okay! Your tea will be ready soon."}]},{"id":"interview","emoji":"💼","title":"Job interview","ne":"जागिर अन्तर्वार्ता","category":"Work","place":"Office interview · कार्यालय","partner":"Interviewer","level":"Medium","steps":[{"npc":"Welcome. Can you introduce yourself?","npcNe":"स्वागत छ। आफ्नो परिचय दिन सक्नुहुन्छ?","goal":"आफ्नो परिचय दिनुहोस्, नाम काल्पनिक राख्न सकिन्छ।","answer":"My name is Sita, and I'm happy to be here.","answerNe":"मेरो नाम सीता हो। यहाँ आउन पाउँदा खुशी छु।","bad1":"Where can I buy tomatoes?","bad2":"I would like two coffees.","accept":["my name","happy here","glad here","thank you opportunity"],"hint":"Start with a confident, simple greeting.","after":"Nice to meet you, Sita."},{"npc":"Why are you interested in this job?","npcNe":"यो जागिरमा तपाईंको रुचि किन छ?","goal":"सिक्न र ग्राहकलाई मद्दत गर्न मन पर्छ भन्नुहोस्।","answer":"I enjoy helping customers and learning new skills.","answerNe":"मलाई ग्राहकलाई मद्दत गर्न र नयाँ सीप सिक्न मन पर्छ।","bad1":"I need a refund for my shoes.","bad2":"My friend lives by a lake.","accept":["help customers","learn skills","like job","interested work"],"hint":"Show how your interests match the position.","after":"That's great."},{"npc":"What is one of your strengths?","npcNe":"तपाईंको एउटा राम्रो पक्ष के हो?","goal":"समयमा पुग्छु र जिम्मेवारीपूर्वक काम गर्छु भन्नुहोस्।","answer":"I'm reliable and I arrive on time.","answerNe":"म भरपर्दो छु र समयमा आइपुग्छु।","bad1":"I would like spicy momo.","bad2":"Where is the bathroom?","accept":["reliable","on time","punctual","responsible"],"hint":"Use an example when you describe a strength.","after":"Thank you."},{"npc":"Do you have any questions for us?","npcNe":"हामीलाई सोध्नुपर्ने केही प्रश्न छ?","goal":"तालिमबारे सोध्नुहोस्।","answer":"What training will I receive?","answerNe":"मैले कस्तो तालिम पाउँछु?","bad1":"Can you give me a taxi?","bad2":"I'd like a large orange juice.","accept":["training","learn role","onboarding"],"hint":"Asking questions shows interest.","after":"Good question. Let me explain our training process."}]},{"id":"work-shift","emoji":"🧰","title":"At work","ne":"काममा कुराकानी","category":"Work","place":"Workplace · कार्यस्थल","partner":"Supervisor","level":"Easy","steps":[{"npc":"Good morning! Are you ready for your shift?","npcNe":"शुभ प्रभात! कामका लागि तयार हुनुहुन्छ?","goal":"काम सुरु गर्न तयार छु भन्नुहोस्।","answer":"Yes, I'm ready to start my shift.","answerNe":"हो, म काम सुरु गर्न तयार छु।","bad1":"I need a plane ticket.","bad2":"I like that blue mountain.","accept":["ready shift","ready start","ready work"],"hint":"“I'm ready to start” is a useful work phrase.","after":"Great. Please check the deliveries first."},{"npc":"Can you check the inventory?","npcNe":"सामानको मौज्दात जाँच्न सक्नुहुन्छ?","goal":"अवश्य, अहिले जाँच गर्छु भन्नुहोस्।","answer":"Sure, I'll check the inventory now.","answerNe":"अवश्य, म अहिले मौज्दात जाँच्छु।","bad1":"Please bring my restaurant bill.","bad2":"This shirt is too small.","accept":["check inventory","count stock","check stock"],"hint":"“I'll…” is short for “I will…”.","after":"Thanks. Let me know when you're finished."},{"npc":"Have you finished counting?","npcNe":"गन्ने काम सक्नुभयो?","goal":"काम सकें र सामान थप्नुपर्छ भन्नुहोस्।","answer":"Yes, I've finished, but we need more supplies.","answerNe":"हो, मैले सकेँ तर थप सामान चाहिन्छ।","bad1":"I need an apple for my lunch.","bad2":"I am visiting the hospital.","accept":["finished supplies","done need more","finished stock"],"hint":"“I've finished” uses present perfect.","after":"Thanks for the update. We'll order more."}]},{"id":"take-bus","emoji":"🚌","title":"Take public transport","ne":"बस यात्रा","category":"Travel","place":"Bus stop · बस स्टप","partner":"Driver","level":"Easy","steps":[{"npc":"Hello! Where are you going?","npcNe":"नमस्ते! तपाईं कहाँ जाँदै हुनुहुन्छ?","goal":"सहरको केन्द्र जान चाहन्छु भन्नुहोस्।","answer":"I'd like to go downtown, please.","answerNe":"म सहरको केन्द्र जान चाहन्छु।","bad1":"Can I make a doctor appointment?","bad2":"I bought a new shirt.","accept":["go downtown","to downtown","city center"],"hint":"“Downtown” is common in US cities.","after":"Sure. This bus goes downtown."},{"npc":"How many tickets do you need?","npcNe":"कति टिकट चाहिन्छ?","goal":"एउटा टिकट चाहिन्छ भन्नुहोस्।","answer":"One ticket, please.","answerNe":"एउटा टिकट दिनुहोस्।","bad1":"I need three tomatoes.","bad2":"My phone is charging.","accept":["one ticket","single ticket","just one"],"hint":"Keep ticket requests simple.","after":"Here you go."},{"npc":"Do you want to know where to get off?","npcNe":"कहाँ ओर्लिने जान्न चाहनुहुन्छ?","goal":"सहर केन्द्रमा पुगेपछि बताइदिन भन्नुहोस्।","answer":"Could you tell me when we reach downtown?","answerNe":"सहरको केन्द्र पुगेपछि बताइदिनुहुन्छ?","bad1":"Can I exchange these shoes?","bad2":"Is the food very spicy?","accept":["tell downtown","reach downtown","when get off","stop downtown"],"hint":"“Tell me when…” is helpful on public transport.","after":"Of course. I'll let you know."}]},{"id":"hotel","emoji":"🏨","title":"Check in at a hotel","ne":"होटलमा चेकइन","category":"Travel","place":"Hotel desk · होटल काउन्टर","partner":"Receptionist","level":"Easy","steps":[{"npc":"Welcome! Do you have a reservation?","npcNe":"स्वागत छ! कोठा बुक गर्नुभएको छ?","goal":"बुक गरेको छु भन्नुहोस्।","answer":"Yes, I have a reservation.","answerNe":"हो, मैले कोठा बुक गरेको छु।","bad1":"I need a doctor's appointment.","bad2":"I would like to order momo.","accept":["have reservation","booked room","booking"],"hint":"“Reservation” and “booking” are both used.","after":"Wonderful. May I have your name?"},{"npc":"Would you prefer one bed or two?","npcNe":"एउटा बेड कि दुई वटा?","goal":"एउटा ठूलो बेड चाहिन्छ भन्नुहोस्।","answer":"One large bed, please.","answerNe":"एउटा ठूलो बेड चाहिन्छ।","bad1":"I bought two phones.","bad2":"Please give me two sandwiches.","accept":["one large bed","one bed","single large bed"],"hint":"“I'd prefer one large bed” also works.","after":"No problem."},{"npc":"Do you need help with your luggage?","npcNe":"सामानसँग मद्दत चाहिन्छ?","goal":"सामान कोठासम्म लैजान मद्दत माग्नुहोस्।","answer":"Could someone help me carry my luggage?","answerNe":"कसैले मेरो सामान बोक्न मद्दत गर्नुहुन्छ?","bad1":"Where can I return a shirt?","bad2":"Can I order more tea?","accept":["help luggage","carry luggage","help bags","carry bags"],"hint":"“Could someone help…?” is a polite request.","after":"Of course. Someone will help you."}]},{"id":"airport","emoji":"✈️","title":"At the airport","ne":"विमानस्थलमा","category":"Travel","place":"Airport · विमानस्थल","partner":"Airline agent","level":"Medium","steps":[{"npc":"Good afternoon! Where are you flying today?","npcNe":"शुभ दिउँसो! आज कहाँ उड्दै हुनुहुन्छ?","goal":"पोखरा जाँदै छु भन्नुहोस्।","answer":"I'm flying to Pokhara today.","answerNe":"म आज पोखरा उड्दै छु।","bad1":"I need a new phone.","bad2":"I'd like some vegetables.","accept":["flying pokhara","going pokhara","flight pokhara"],"hint":"“I'm flying to…” names your destination.","after":"May I see your travel document?"},{"npc":"Are you checking a bag?","npcNe":"सामान चेकइन गर्दै हुनुहुन्छ?","goal":"एउटा झोला चेकइन गर्न चाहन्छु भन्नुहोस्।","answer":"Yes, I'd like to check one bag.","answerNe":"हो, म एउटा झोला चेकइन गर्न चाहन्छु।","bad1":"Can you exchange my shirt?","bad2":"I need a cup of tea.","accept":["check one bag","one checked bag","check bag"],"hint":"“Check a bag” means putting it in the aircraft hold.","after":"Thank you. Here is your boarding pass."},{"npc":"Do you know where your gate is?","npcNe":"गेट कहाँ छ थाहा छ?","goal":"गेट कहाँ छ भनेर सोध्नुहोस्।","answer":"Could you tell me where my gate is?","answerNe":"मेरो गेट कहाँ छ बताइदिनुहुन्छ?","bad1":"Can you book my hospital visit?","bad2":"Where is the nearest shoe store?","accept":["where gate","find gate","which gate"],"hint":"“Gate” means the boarding area.","after":"It's Gate 6, straight ahead."}]},{"id":"bank","emoji":"🏦","title":"At a bank","ne":"बैंकमा कुराकानी","category":"Services","place":"Bank counter · बैंक काउन्टर","partner":"Teller","level":"Medium","steps":[{"npc":"Hello! How may I help you?","npcNe":"नमस्ते! कसरी मद्दत गर्न सक्छु?","goal":"खाता बारे प्रश्न छ भन्नुहोस्।","answer":"I have a question about my account.","answerNe":"मलाई मेरो खाताबारे प्रश्न छ।","bad1":"I'd like a table for three.","bad2":"Where is the bus station?","accept":["question account","help account","about account"],"hint":"You do not need to give private account information in practice.","after":"Certainly. What would you like to know?"},{"npc":"Do you need a statement?","npcNe":"स्टेटमेन्ट चाहिन्छ?","goal":"गत महिनाको स्टेटमेन्ट चाहिन्छ भन्नुहोस्।","answer":"Yes, I'd like last month's statement.","answerNe":"हो, मलाई गत महिनाको स्टेटमेन्ट चाहिन्छ।","bad1":"I'd like a bowl of soup.","bad2":"Can you wash my clothes?","accept":["last month statement","bank statement","monthly statement"],"hint":"“I'd like…” is a courteous request.","after":"I can help with that."},{"npc":"Anything else today?","npcNe":"आज अरू केही चाहिन्छ?","goal":"काम सकियो धन्यवाद भन्नुहोस्।","answer":"That's all, thank you for your help.","answerNe":"यति नै हो, मद्दतका लागि धन्यवाद।","bad1":"I'd like to travel to Pokhara.","bad2":"I need to make a hotel reservation.","accept":["that's all","thank you","thanks","no more"],"hint":"“That's all” is useful when you are done.","after":"You're welcome! Have a nice day."}]},{"id":"phone-repair","emoji":"🛠️","title":"Repair a phone","ne":"फोन मर्मत","category":"Shopping","place":"Repair shop · मर्मत पसल","partner":"Technician","level":"Easy","steps":[{"npc":"Hi there! What's wrong with your phone?","npcNe":"नमस्ते! फोनमा के समस्या छ?","goal":"फोनको स्क्रिन फुटेको छ भन्नुहोस्।","answer":"My phone screen is cracked.","answerNe":"मेरो फोनको स्क्रिन फुटेको छ।","bad1":"I need a hotel reservation.","bad2":"Can I buy some potatoes?","accept":["screen cracked","cracked screen","screen broken","broken screen"],"hint":"“Cracked” means there are lines or breaks in glass.","after":"I see. When did that happen?"},{"npc":"Does the phone still turn on?","npcNe":"फोन अझै चल्छ?","goal":"फोन चल्छ तर टचले काम गर्दैन भन्नुहोस्।","answer":"It turns on, but the touch screen doesn't work.","answerNe":"फोन खुल्छ तर टच स्क्रिनले काम गर्दैन।","bad1":"The soup is delicious.","bad2":"My school is nearby.","accept":["turns on touch","touch not work","screen not respond","touch broken"],"hint":"“It turns on” means the device powers up.","after":"Let me examine it."},{"npc":"Would you like a repair estimate?","npcNe":"मर्मत खर्चको अनुमान चाहिन्छ?","goal":"मर्मत कति खर्च पर्छ भनेर सोध्नुहोस्।","answer":"How much will the repair cost?","answerNe":"मर्मत कति खर्च लाग्छ?","bad1":"Where can I get a bus ticket?","bad2":"I'd like coffee with milk.","accept":["repair cost","how much fix","price repair","estimate cost"],"hint":"Always ask for an estimate before approving work.","after":"I'll check and give you an estimate."}]},{"id":"new-friend","emoji":"🤝","title":"Meet someone new","ne":"नयाँ साथी भेट्ने","category":"Everyday","place":"Community event · भेटघाट","partner":"New friend","level":"Easy","steps":[{"npc":"Hi! I don't think we've met. What's your name?","npcNe":"नमस्ते! हामी पहिले भेटेका छैनौं होला। नाम के हो?","goal":"आफ्नो नाम काल्पनिक राखेर परिचय दिनुहोस्।","answer":"Hi, I'm Sita. Nice to meet you!","answerNe":"नमस्ते, म सीता हुँ। भेटेर खुशी लाग्यो।","bad1":"Can I get my money back?","bad2":"Where is the supermarket?","accept":["i'm sita","my name","nice meet","im sita"],"hint":"Introduce yourself and say “Nice to meet you.”","after":"Nice to meet you too, Sita!"},{"npc":"Where are you from?","npcNe":"तपाईं कहाँबाट हुनुहुन्छ?","goal":"नेपालबाट आएको भन्नुहोस्।","answer":"I'm originally from Nepal.","answerNe":"म मूलतः नेपालबाट हुँ।","bad1":"I would like one bus ticket.","bad2":"My phone screen is cracked.","accept":["from nepal","originally nepal","nepal"],"hint":"“Originally from” describes where you are from.","after":"That's wonderful!"},{"npc":"What do you like doing in your free time?","npcNe":"फुर्सदमा के गर्न मन पर्छ?","goal":"घुम्न र किताब पढ्न मन पर्छ भन्नुहोस्।","answer":"I enjoy traveling and reading books.","answerNe":"मलाई घुम्न र किताब पढ्न मन पर्छ।","bad1":"I need a receipt for a shirt.","bad2":"My doctor is in the hospital.","accept":["travel reading","read books","enjoy reading","like travel"],"hint":"“I enjoy…” is a natural way to describe hobbies.","after":"Me too! It was nice talking with you."}]},{"id":"school-help","emoji":"📚","title":"Ask a teacher","ne":"शिक्षकसँग कुराकानी","category":"Everyday","place":"Classroom · कक्षाकोठा","partner":"Teacher","level":"Easy","steps":[{"npc":"Good morning! Do you have a question?","npcNe":"शुभ प्रभात! कुनै प्रश्न छ?","goal":"एउटा शब्दको अर्थ बुझिनँ भन्नुहोस्।","answer":"I don't understand this word.","answerNe":"म यो शब्द बुझ्दिनँ।","bad1":"I want to buy a new phone.","bad2":"Where can I return my shirt?","accept":["don't understand word","meaning word","what means"],"hint":"“I don't understand…” is okay to say in class.","after":"No problem. Let's look at it together."},{"npc":"Would you like another example?","npcNe":"अर्को उदाहरण चाहिन्छ?","goal":"अर्को उदाहरण दिनुहोस् भन्नुहोस्।","answer":"Could you give me another example?","answerNe":"अर्को उदाहरण दिनुहुन्छ?","bad1":"How much is this shirt?","bad2":"Please give me a hospital appointment.","accept":["another example","more examples","example please"],"hint":"“Could you…” is polite when asking a teacher.","after":"Of course! Here's another example."},{"npc":"Does that make sense now?","npcNe":"अहिले बुझ्नुभयो?","goal":"अहिले बुझेँ, धन्यवाद भन्नुहोस्।","answer":"Yes, I understand now. Thank you!","answerNe":"हो, अहिले बुझें। धन्यवाद।","bad1":"I need a taxi to the airport.","bad2":"I like my new shoes.","accept":["understand now","got it thank","yes thank"],"hint":"“I understand now” shows progress.","after":"Excellent! Keep practicing."}]}];
const topics=['All','Shopping','Healthcare','Food & Drink','Travel','Work','Services','Everyday'];

/* Expanded bilingual everyday situations, authored as complete alternating dialogs. */
const coachAdditionalSpecs=[{"id":"rent-home","emoji":"🏠","title":"Rent an apartment","ne":"घर भाडामा लिनु","category":"Services","place":"Apartment · अपार्टमेन्ट","partner":"Leasing agent","level":"Medium","rounds":[[["Are you here to view the apartment?","अपार्टमेन्ट हेर्न आउनुभएको हो?","घर हेर्न चाहेको बताउनुहोस्।","Yes, I'd like to see the apartment.","हो, म घर हेर्न चाहन्छु।","see apartment;like see apartment"],["Do you have any questions?","केही प्रश्न छन्?","भाडा र धरौटी सोध्नुहोस्।","How much are the rent and deposit?","भाडा र धरौटी कति हुन्?","rent deposit;how much rent"]],[["What kind of home do you need?","तपाईंलाई कस्तो घर चाहिन्छ?","दुई कोठा चाहिन्छ भन्नुहोस्।","I'm looking for a two-bedroom apartment.","म दुई बेडरुम भएको अपार्टमेन्ट खोज्दै छु।","two bedroom;two-bedroom"],["Would you like to apply?","आवेदन दिन चाहनुहुन्छ?","कुन कागजात चाहिन्छ सोध्नुहोस्।","What documents do I need to apply?","आवेदन दिन कुन कागजात चाहिन्छ?","documents apply;need apply"]],[["When would you like to move in?","कहिलेदेखि बस्न चाहनुहुन्छ?","अर्को महिना भन्नुहोस्।","I would like to move in next month.","म अर्को महिनादेखि बस्न चाहन्छु।","move next month;next month"],["Do you have a parking question?","पार्किङबारे प्रश्न छ?","पार्किङको शुल्क सोध्नुहोस्।","Is parking included in the rent?","पार्किङ भाडामा समावेश छ?","parking included;included rent"]]]},{"id":"home-internet","emoji":"📶","title":"Set up home internet","ne":"इन्टरनेट जोड्नु","category":"Services","place":"Internet provider · सेवा केन्द्र","partner":"Support agent","level":"Easy","rounds":[[["How can I help you?","कसरी सहयोग गर्न सक्छु?","नयाँ इन्टरनेट चाहिन्छ भन्नुहोस्।","I'd like to set up home internet.","म घरमा इन्टरनेट जोड्न चाहन्छु।","home internet;set up internet"],["Which speed would you prefer?","कति स्पिड चाहिन्छ?","भिडियो कलका लागि योजना सोध्नुहोस्।","Which plan is best for video calls?","भिडियो कलका लागि कुन योजना राम्रो छ?","plan video calls;best video calls"]],[["Do you want us to provide a router?","राउटर हामीले दिऊँ?","राउटरको भाडा सोध्नुहोस्।","Is there a monthly charge for the router?","राउटरको मासिक शुल्क लाग्छ?","monthly charge router;router charge"],["When should we install it?","कहिले जोडिदिऊँ?","शनिबार समय छ कि सोध्नुहोस्।","Do you have an opening on Saturday?","शनिबार समय खाली छ?","opening Saturday;on Saturday"]],[["What is the problem with your internet?","इन्टरनेटमा के समस्या छ?","बारम्बार बन्द हुने भन्नुहोस्।","My internet keeps disconnecting.","मेरो इन्टरनेट बारम्बार बन्द हुन्छ।","internet disconnecting;keeps disconnecting"],["Have you restarted the router?","राउटर फेरि सुरु गर्नुभयो?","गरे पनि समस्या छ भन्नुहोस्।","Yes, but the problem is still happening.","हो, तर समस्या अझै छ।","problem still;still happening"]]]},{"id":"delivery-help","emoji":"📦","title":"Missing online delivery","ne":"अनलाइन सामान नआउनु","category":"Shopping","place":"Delivery support · डेलिभरी सहायता","partner":"Support agent","level":"Easy","rounds":[[["How can I help with your order?","अर्डरमा के सहयोग चाहिन्छ?","पार्सल नआएको भन्नुहोस्।","My package has not arrived.","मेरो पार्सल आइपुगेको छैन।","package not arrived;not arrived"],["Do you have the order number?","अर्डर नम्बर छ?","नम्बर दिन तयार भएको भन्नुहोस्।","Yes, I can provide my order number.","हो, म अर्डर नम्बर दिन सक्छु।","order number;provide number"]],[["The tracking says delivered.","ट्र्याकिङमा बुझाएको देखिन्छ।","नपाएको भन्नुहोस्।","It says delivered, but I didn't receive it.","बुझाएको देखिन्छ, तर मैले पाएको छैन।","didn't receive;not received"],["Should we investigate?","हामीले जाँच गरौँ?","जाँच गर्न भन्नुहोस्।","Yes, please check the delivery details.","हो, डेलिभरीको विवरण जाँचिदिनुहोस्।","check delivery;delivery details"]],[["Would you like a replacement?","नयाँ सामान चाहिन्छ?","नयाँ सामान चाहिएको भन्नुहोस्।","Yes, I'd prefer a replacement.","हो, मलाई नयाँ सामान चाहिन्छ।","prefer replacement;replacement"],["When would you need it?","कहिलेसम्म चाहिन्छ?","कहिले आउँछ सोध्नुहोस्।","When will the replacement arrive?","नयाँ सामान कहिले आउँछ?","replacement arrive;when replacement"]]]},{"id":"dental-office","emoji":"🦷","title":"At the dentist","ne":"दाँतको डाक्टरकहाँ","category":"Healthcare","place":"Dental office · दन्त क्लिनिक","partner":"Receptionist","level":"Medium","rounds":[[["Do you have an appointment?","अपोइन्टमेन्ट छ?","जाँचका लागि समय छ भन्नुहोस्।","Yes, I have an appointment for a checkup.","हो, मेरो दाँत जाँचको समय छ।","appointment checkup;have appointment"],["What is the problem?","के समस्या छ?","दाँत दुखेको भन्नुहोस्।","I have a painful tooth.","मेरो एउटा दाँत दुखेको छ।","painful tooth;tooth hurts"]],[["Are you here for a cleaning?","दाँत सफाइका लागि आउनुभएको हो?","सफाइ गराउन चाहेको भन्नुहोस्।","Yes, I'd like a dental cleaning.","हो, म दाँत सफाइ गराउन चाहन्छु।","dental cleaning;like cleaning"],["Do you have insurance?","बीमा छ?","बीमाले समेट्छ कि सोध्नुहोस्।","Does my plan cover this visit?","मेरो बीमाले यो जाँच समेट्छ?","plan cover;cover visit"]],[["Do cold drinks cause pain?","चिसो पिउँदा दुख्छ?","दुखाइ बढ्छ भन्नुहोस्।","Yes, the pain gets worse with cold drinks.","हो, चिसो पिउँदा दुखाइ बढ्छ।","cold drinks;pain worse"],["Do you need an earlier visit?","छिटो समय चाहिन्छ?","सबैभन्दा छिटो समय सोध्नुहोस्।","What is your earliest available appointment?","सबैभन्दा छिटो उपलब्ध समय कुन हो?","earliest appointment;available appointment"]]]},{"id":"parent-meeting","emoji":"👩‍🏫","title":"Meet a teacher","ne":"शिक्षकसँग भेटघाट","category":"Everyday","place":"School · विद्यालय","partner":"Teacher","level":"Easy","rounds":[[["How is your child doing at home?","घरमा बच्चाको पढाइ कस्तो छ?","दैनिक पढ्ने बताउनुहोस्।","My child reads at home every day.","मेरो बच्चाले घरमा दैनिक पढ्छ।","reads home;every day"],["Do you have concerns?","केही चिन्ता छ?","पढाइमा मद्दत सोध्नुहोस्।","How can I help my child with reading?","पढाइमा बच्चालाई कसरी मद्दत गर्ने?","help child reading;help reading"]],[["What would you like to know?","के जान्न चाहनुहुन्छ?","कक्षामा प्रगति सोध्नुहोस्।","How is my child doing in class?","मेरो बच्चाको कक्षामा प्रगति कस्तो छ?","doing class;child class"],["Would extra practice help?","थप अभ्यास गर्न चाहनुहुन्छ?","घरमा गर्ने अभ्यास सोध्नुहोस्।","What should we practice at home?","घरमा के अभ्यास गर्ने?","practice home;what practice"]],[["Have you received the school schedule?","विद्यालयको तालिका पाउनुभयो?","कहाँ हेर्ने सोध्नुहोस्।","Where can I see the school schedule?","विद्यालयको तालिका कहाँ हेर्न मिल्छ?","school schedule;see schedule"],["Would you like an email update?","इमेलबाट जानकारी चाहिन्छ?","इमेलमा पठाइदिनुहोस् भन्नुहोस्।","Please send me the updates by email.","कृपया इमेलबाट जानकारी पठाउनुहोस्।","send updates;updates email"]]]},{"id":"shift-request","emoji":"📅","title":"Change a work shift","ne":"कामको सिफ्ट बदल्नु","category":"Work","place":"Workplace · कार्यस्थल","partner":"Supervisor","level":"Medium","rounds":[[["Can we discuss your schedule?","कामको तालिकाबारे कुरा गरौँ?","शुक्रबार बिदा चाहिन्छ भन्नुहोस्।","Could I take next Friday off?","अर्को शुक्रबार बिदा लिन मिल्छ?","Friday off;take Friday"],["Who can cover the shift?","सिफ्ट कसले सम्हाल्न सक्छ?","साथीसँग सोध्ने भन्नुहोस्।","I can ask a coworker to cover my shift.","म सहकर्मीसँग सिफ्ट सम्हाल्न अनुरोध गर्छु।","coworker cover;cover shift"]],[["Can you work on Saturday?","शनिबार काम गर्न सक्नुहुन्छ?","समय नमिल्ने भन्नुहोस्।","I'm sorry, I can't work on Saturday.","माफ गर्नुहोस्, शनिबार काम गर्न सक्दिनँ।","can't work Saturday;cannot Saturday"],["Would you like to swap shifts?","सिफ्ट साट्न चाहनुहुन्छ?","साट्न तयार भएको बताउनुहोस्।","Yes, I'd like to swap shifts.","हो, म सिफ्ट साट्न चाहन्छु।","swap shifts;switch shifts"]],[["Could you stay late today?","आज ढिलोसम्म बस्न सक्नुहुन्छ?","सक्दिन भन्नुहोस्।","I'm not available to stay late today.","आज ढिलो बस्न मिल्दैन।","not available;stay late"],["When can you start tomorrow?","भोलि कहिले सुरु गर्न सक्नुहुन्छ?","बिहान ९ बजे भन्नुहोस्।","I can start at nine in the morning.","म बिहान ९ बजे सुरु गर्न सक्छु।","start nine;nine morning"]]]},{"id":"card-lost","emoji":"💳","title":"Lost debit card","ne":"डेबिट कार्ड हराउनु","category":"Services","place":"Bank · बैंक","partner":"Bank representative","level":"Medium","rounds":[[["How may I help you?","कसरी सहयोग गरौँ?","कार्ड हरायो भन्नुहोस्।","I've lost my debit card.","मेरो डेबिट कार्ड हराएको छ।","lost debit card;debit card"],["Would you like it blocked?","कार्ड बन्द गरिदिऊँ?","कार्ड तुरुन्त बन्द गर भन्नुहोस्।","Please block the card immediately.","कृपया कार्ड तुरुन्त बन्द गरिदिनुहोस्।","block card;block immediately"]],[["Have you checked recent transactions?","हालका कारोबार हेर्नुभयो?","कारोबार जाँच्न चाहिन्छ भन्नुहोस्।","I'd like to review my recent transactions.","म पछिल्ला कारोबार जाँच्न चाहन्छु।","review transactions;recent transactions"],["Do you need help verifying your identity?","पहिचान पुष्टि गर्न मद्दत चाहिन्छ?","सुरक्षित तरिका सोध्नुहोस्।","How can I verify my identity securely?","पहिचान सुरक्षित रूपमा कसरी पुष्टि गर्ने?","verify identity;identity securely"]],[["Would you like a replacement card?","नयाँ कार्ड चाहिन्छ?","नयाँ कार्ड माग्नुहोस्।","Yes, I need a replacement card.","हो, मलाई नयाँ कार्ड चाहिन्छ।","replacement card;need replacement"],["Where should it be sent?","कहाँ पठाउने?","ठेगाना कसरी पुष्टि गर्ने सोध्नुहोस्।","How can I confirm my mailing address?","पत्र पठाउने ठेगाना कसरी पुष्टि गर्ने?","confirm address;mailing address"]]]},{"id":"send-mail","emoji":"📮","title":"At the post office","ne":"हुलाक कार्यालयमा","category":"Services","place":"Post office · हुलाक कार्यालय","partner":"Postal worker","level":"Easy","rounds":[[["What would you like to mail?","के पठाउन चाहनुहुन्छ?","पार्सल पठाउन चाहन्छु भन्नुहोस्।","I'd like to mail this package.","म यो पार्सल पठाउन चाहन्छु।","mail package;send package"],["How fast should it arrive?","कति छिटो पुग्नुपर्छ?","छिटो सेवाको शुल्क सोध्नुहोस्।","How much does express shipping cost?","छिटो पठाउने शुल्क कति हो?","express shipping;shipping cost"]],[["Does the package contain fragile items?","पार्सलमा फुट्ने सामान छ?","हो सावधानीपूर्वक भन्नुहोस्।","Yes, please handle it carefully.","हो, कृपया सावधानीपूर्वक राखिदिनुहोस्।","handle carefully;please handle"],["Would you like a tracking number?","ट्र्याकिङ नम्बर चाहिन्छ?","नम्बर माग्नुहोस्।","Yes, please give me a tracking number.","हो, कृपया ट्र्याकिङ नम्बर दिनुहोस्।","tracking number;give tracking"]],[["Is this an international shipment?","विदेश पठाउने हो?","विदेश पठाउने भन्नुहोस्।","Yes, I'm sending this package abroad.","हो, म यो पार्सल विदेश पठाउँदै छु।","package abroad;sending abroad"],["Do you have a customs form?","भन्सार फाराम छ?","कसरी भर्ने सोध्नुहोस्।","Could you help me complete the customs form?","भन्सार फाराम भर्न सहयोग गर्नुहुन्छ?","customs form;complete customs"]]]},{"id":"car-repair","emoji":"🔧","title":"At the car mechanic","ne":"गाडी मर्मत गराउनु","category":"Services","place":"Garage · ग्यारेज","partner":"Mechanic","level":"Medium","rounds":[[["What seems to be wrong with the car?","गाडीमा के समस्या छ?","आवाज आउने भन्नुहोस्।","My car is making a strange noise.","मेरो गाडीबाट अनौठो आवाज आउँछ।","strange noise;car noise"],["When do you hear it?","कहिले आवाज आउँछ?","ब्रेक लगाउँदा भन्नुहोस्।","I hear it when I press the brakes.","ब्रेक लगाउँदा सुन्छु।","press brakes;when brakes"]],[["Is the check engine light on?","इन्जिनको बत्ती बलेको छ?","हो भन्नुहोस्।","Yes, the check engine light is on.","हो, इन्जिनको बत्ती बलेको छ।","check engine light;engine light"],["Do you need a repair estimate?","मर्मतको खर्च अनुमान चाहिन्छ?","पहिले अनुमान चाहिन्छ भन्नुहोस्।","Could you give me an estimate first?","पहिले अनुमानित खर्च बताउनुहुन्छ?","estimate first;give estimate"]],[["Have you changed the oil recently?","हालै तेल फेर्नुभएको छ?","याद छैन भन्नुहोस्।","I'm not sure when the oil was changed.","तेल कहिले फेरेको याद छैन।","not sure oil;oil changed"],["Can you leave the car here?","गाडी यहाँ छोड्नुहुन्छ?","कति समय लाग्छ सोध्नुहोस्।","How long will the inspection take?","जाँच गर्न कति समय लाग्छ?","inspection take;how long"]]]},{"id":"library","emoji":"📖","title":"At the public library","ne":"सार्वजनिक पुस्तकालयमा","category":"Everyday","place":"Library · पुस्तकालय","partner":"Librarian","level":"Easy","rounds":[[["Welcome! Can I help you?","स्वागत छ! सहयोग चाहिन्छ?","सदस्यता कार्ड माग्नुहोस्।","I'd like to get a library card.","म पुस्तकालय कार्ड बनाउन चाहन्छु।","library card;get card"],["Do you have any questions?","केही प्रश्न छन्?","कति किताब लिन मिल्छ सोध्नुहोस्।","How many books can I borrow?","कति किताब सापटी लिन मिल्छ?","how many books;books borrow"]],[["Are you looking for a book?","किताब खोज्दै हुनुहुन्छ?","अंग्रेजी सिक्ने पुस्तक माग्नुहोस्।","Where can I find books for learning English?","अंग्रेजी सिक्ने पुस्तक कहाँ छन्?","books English;learning English"],["Would you like to use a computer?","कम्प्युटर चलाउन चाहनुहुन्छ?","कम्प्युटर कसरी प्रयोग गर्ने सोध्नुहोस्।","How can I use the public computers?","सार्वजनिक कम्प्युटर कसरी चलाउने?","use computers;public computers"]],[["Would you like to join a class?","कक्षामा सहभागी हुन चाहनुहुन्छ?","नि:शुल्क अंग्रेजी कक्षा छ सोध्नुहोस्।","Do you offer any free English classes?","यहाँ नि:शुल्क अंग्रेजी कक्षा हुन्छ?","English classes;free classes"],["What time would work for you?","कुन समय मिल्छ?","साँझको समय सोध्नुहोस्।","Are there any classes in the evening?","साँझको कक्षा छ?","classes evening;evening classes"]]]}];
const coachDistractors=["I would like a cup of tea.","Where is the closest supermarket?","My friend works in a hotel.","I bought a new pair of shoes.","The sky looks cloudy today.","Can I have a train ticket?","My favorite food is momo.","I need to book a flight.","I want to visit a museum.","I am studying English at home.","Could you bring me a glass of water?","I'd like to order a pizza.","The bus comes at six.","I need to return my jacket.","Can you help me find a taxi?","I have a meeting next week."];
function coachBuildSteps(rows,seed){
 return rows.map((row,j)=>{
  const [npc,npcNe,goal,answer,answerNe,accept]=row;
  const i=(seed*7+j*3)%coachDistractors.length;
  return {npc,npcNe,goal,answer,answerNe,
   accept:accept.split(';').filter(Boolean),
   bad1:coachDistractors[i],bad2:coachDistractors[(i+6)%coachDistractors.length],
   hint:'Try a short, polite response that matches the question.',
   after:rows[j+1]?.[0]||'Thank you. That is helpful!'};
 });
}
const coachOriginalSceneRounds={"return-shirt":[[["Is the shirt damaged or the wrong size?","कमिज बिग्रेको हो कि साइज नमिलेको?","साइज नमिलेको भन्नुहोस्।","The size doesn't fit me.","यो साइज मलाई मिल्दैन।","size fit;doesn't fit"],["Would you prefer another size?","अर्को साइज चाहिन्छ?","सट्टा ठूलो साइज माग्नुहोस्।","Could I exchange it for a larger size?","यसलाई ठूलो साइजसँग साट्न मिल्छ?","exchange larger;larger size"]],[["Do you still have the receipt?","रसिद अझै छ?","रसिद हराएको भन्नुहोस्।","I lost the receipt. Can I still return it?","रसिद हरायो। तैपनि फिर्ता गर्न मिल्छ?","lost receipt;still return"],["Did you buy it online?","अनलाइन किन्नुभएको थियो?","अनलाइन किनेको बताउनुहोस्।","Yes, I ordered it online last week.","हो, मैले गएको हप्ता अनलाइन अर्डर गरेको थिएँ।","ordered online;online last week"]]],"buy-phone":[[["What do you mainly use your phone for?","फोन मुख्यतया केमा चलाउनुहुन्छ?","भिडियो कल गर्नुपर्छ भन्नुहोस्।","I need a phone for video calls and photos.","मलाई भिडियो कल र फोटोका लागि फोन चाहिन्छ।","video calls;photos"],["Do you prefer more storage?","बढी स्टोरेज चाहिन्छ?","स्टोरेजको मूल्य सोध्नुहोस्।","How much is the model with more storage?","बढी स्टोरेज भएको मोडेल कति पर्छ?","more storage;model storage"]],[["Would you like to try this phone?","यो फोन चलाएर हेर्न चाहनुहुन्छ?","क्यामेरा जाँच्न चाहन्छु भन्नुहोस्।","Can I test the camera first?","पहिले क्यामेरा जाँच्न मिल्छ?","test camera;camera first"],["Do you want a payment plan?","किस्तामा किन्न चाहनुहुन्छ?","ब्याज लाग्छ कि सोध्नुहोस्।","Does the payment plan charge interest?","किस्तामा ब्याज लाग्छ?","payment interest;charge interest"]]],"directions":[[["Are you trying to find the train station?","रेल स्टेसन खोज्दै हुनुहुन्छ?","हो, कता जाने सोध्नुहोस्।","Yes, which way is the train station?","हो, रेल स्टेसन कुनतिर छ?","train station;which way"],["Would you like the walking route?","हिँड्ने बाटो चाहिन्छ?","हिँडेर कति समय लाग्छ सोध्नुहोस्।","How long will it take to walk there?","त्यहाँ हिँडेर पुग्न कति समय लाग्छ?","long walk;take walk"]],[["Excuse me, are you lost?","माफ गर्नुहोस्, बाटो बिराउनुभयो?","बस स्टप खोजिरहेको भन्नुहोस्।","I'm looking for the nearest bus stop.","म नजिकको बस स्टप खोजिरहेको छु।","nearest bus stop;looking bus"],["Is the stop across the street?","स्टप सडकपारि छ?","सडक पार गर्ने ठाउँ सोध्नुहोस्।","Where is the nearest crosswalk?","नजिकै सडक पार गर्ने ठाउँ कहाँ छ?","nearest crosswalk;where crosswalk"]]],"call-hospital":[[["Are you calling to reschedule?","अपोइन्टमेन्ट सार्न फोन गर्नुभएको हो?","समय सार्न चाहेको भन्नुहोस्।","Yes, I need to reschedule my appointment.","हो, मलाई अपोइन्टमेन्ट सार्नुपर्छ।","reschedule appointment;need reschedule"],["Which day would work for you?","कुन दिन ठीक हुन्छ?","सोमबार समय छ सोध्नुहोस्।","Do you have an opening on Monday?","सोमबार समय खाली छ?","opening Monday;on Monday"]],[["Do you need a specialist appointment?","विशेषज्ञसँग अपोइन्टमेन्ट चाहिन्छ?","रेफरल चाहिन्छ कि सोध्नुहोस्।","Do I need a referral to see the specialist?","विशेषज्ञ भेट्न रेफरल चाहिन्छ?","need referral;see specialist"],["Can I take your contact details?","सम्पर्क विवरण लिन मिल्छ?","कुन नम्बरमा फोन गर्ने सोध्नुहोस्।","What number should I call to confirm?","पुष्टि गर्न कुन नम्बरमा फोन गर्ने?","number call;call confirm"]]],"hospital-checkin":[[["What time is your appointment?","अपोइन्टमेन्ट कति बजे छ?","दिउँसो दुई बजे भन्नुहोस्।","My appointment is at two this afternoon.","मेरो अपोइन्टमेन्ट आज दिउँसो दुई बजे छ।","appointment two;two afternoon"],["Would you like an interpreter?","दोभासे चाहिन्छ?","नेपाली दोभासे छ कि सोध्नुहोस्।","Is a Nepali interpreter available?","नेपाली दोभासे उपलब्ध छ?","Nepali interpreter;interpreter available"]],[["Have you filled out the patient form?","बिरामीको फाराम भर्नुभयो?","फाराममा मद्दत चाहिएको भन्नुहोस्।","Could someone help me complete this form?","यो फाराम भर्न सहयोग मिल्छ?","help form;complete form"],["Do you have any allergies listed?","एलर्जीको विवरण छ?","डाक्टरसँग पुष्टि गर्न चाहेको भन्नुहोस्।","I'd like to confirm the details with the nurse.","म नर्ससँग विवरण पुष्टि गर्न चाहन्छु।","confirm nurse;details nurse"]]],"restaurant":[[["Would you like to order now?","अहिले अर्डर दिनुहुन्छ?","मेनु हेर्न समय माग्नुहोस्।","Could we have a few more minutes, please?","हामीलाई केही मिनेट दिनुहुन्छ?","few more minutes;more minutes"],["Would you like something to drink?","के पिउन चाहनुहुन्छ?","तातो चिया माग्नुहोस्।","Could I have a cup of hot tea?","मलाई एक कप तातो चिया दिनुहुन्छ?","hot tea;cup tea"]],[["How spicy would you like the food?","खाना कति पिरो बनाउने?","मध्यम पिरो भन्नुहोस्।","Medium spicy, please.","मध्यम पिरो बनाइदिनुहोस्।","medium spicy;medium"],["Do you need anything else?","अरू केही चाहिन्छ?","थप पानी माग्नुहोस्।","May we have some more water?","अझै पानी दिन मिल्छ?","more water;have water"]]],"groceries":[[["Do you need help finding rice?","चामल खोज्न सहयोग चाहिन्छ?","चामल कहाँ छ सोध्नुहोस्।","Which aisle has the rice?","चामल कुन पंक्तिमा छ?","aisle rice;where rice"],["Would you like a larger bag?","ठूलो बोरा चाहिन्छ?","सानो प्याकेट चाहिएको भन्नुहोस्।","I just need a small bag, please.","मलाई सानो प्याकेट मात्र चाहिन्छ।","small bag;need small"]],[["Are you ready to check out?","पैसा तिर्न तयार हुनुहुन्छ?","मूल्य गलत देखिएको बताउनुहोस्।","I think the price on this item is incorrect.","यो सामानको मूल्य गलत जस्तो लाग्यो।","price incorrect;wrong price"],["Would you like a receipt?","रसिद चाहिन्छ?","रसिद माग्नुहोस्।","Yes, please give me the receipt.","हो, कृपया रसिद दिनुहोस्।","give receipt;receipt please"]]],"pharmacy":[[["Do you have a prescription?","डाक्टरको पर्चा छ?","पर्चा छ भन्नुहोस्।","Yes, I have a prescription from my doctor.","हो, मसँग डाक्टरको पर्चा छ।","have prescription;doctor prescription"],["Do you have questions about the medication?","औषधिबारे प्रश्न छन्?","निर्देशन बुझाउन भन्नुहोस्।","Could you explain the instructions, please?","निर्देशन बुझाइदिनुहुन्छ?","explain instructions;instructions please"]],[["Would you like to pick up your refill?","फेरि औषधि लिन आउनुभएको हो?","रिफिल तयार छ सोध्नुहोस्।","Is my prescription refill ready?","मेरो औषधिको रिफिल तयार छ?","refill ready;prescription refill"],["Do you want to speak to the pharmacist?","फार्मासिस्टसँग कुरा गर्नुहुन्छ?","फार्मासिस्टसँग बोल्न चाहन्छु भन्नुहोस्।","Yes, I'd like to speak with the pharmacist.","हो, म फार्मासिस्टसँग कुरा गर्न चाहन्छु।","speak pharmacist;talk pharmacist"]]],"coffee":[[["What size drink would you like?","कति ठूलो पेय चाहिन्छ?","सानो कफी माग्नुहोस्।","A small coffee, please.","सानो कफी दिनुहोस्।","small coffee;coffee please"],["Would you like milk?","दूध चाहिन्छ?","दूध नचाहिने बताउनुहोस्।","No milk, thank you.","दूध पर्दैन, धन्यवाद।","no milk;without milk"]],[["Is this order for here or to go?","यहीँ खाने कि लैजाने?","लैजाने हो भन्नुहोस्।","To go, please.","लैजाने हो, कृपया।","to go;take away"],["Anything else with your coffee?","कफीसँग अरू केही चाहिन्छ?","स्यान्डविच माग्नुहोस्।","I'd also like a sandwich.","मलाई एउटा स्यान्डविच पनि चाहिन्छ।","like sandwich;also sandwich"]]],"interview":[[["Can you tell me about your strengths?","तपाईंको खुबीबारे बताउनुहोस्।","टोलीमा काम गर्न सक्षम भएको भन्नुहोस्।","I'm reliable and work well with a team.","म भरपर्दो छु र टोलीसँग राम्रो काम गर्छु।","reliable team;work team"],["Why are you interested in this job?","यो काममा किन रुचि छ?","सीप मिल्छ भन्नुहोस्।","This position matches my skills and interests.","यो पद मेरो सीप र रुचिसँग मिल्छ।","matches skills;skills interests"]],[["When could you start working?","कहिलेदेखि काम सुरु गर्न सक्नुहुन्छ?","दुई हप्तापछि भन्नुहोस्।","I could start in two weeks.","म दुई हप्तापछि सुरु गर्न सक्छु।","start two weeks;two weeks"],["Do you have any questions for us?","हामीलाई केही सोध्नुहुन्छ?","कामको तालिम सोध्नुहोस्।","What training will new employees receive?","नयाँ कर्मचारीलाई कस्तो तालिम हुन्छ?","training employees;new employees"]]],"work-shift":[[["Could you restock this shelf?","यो सेल्फमा सामान राखिदिनुहुन्छ?","पहिले सामान जाँच्ने भन्नुहोस्।","Sure, I'll check the inventory first.","अवश्य, पहिले स्टक जाँच गर्छु।","check inventory;inventory first"],["Did you receive today's delivery?","आजको सामान आइपुग्यो?","सामान गनेको बताउनुहोस्।","Yes, I counted the items in the delivery.","हो, मैले आएको सामान गनेँ।","counted items;items delivery"]],[["Can you help a customer?","ग्राहकलाई सहयोग गर्न सक्नुहुन्छ?","सहयोग गर्न तयार छु भन्नुहोस्।","Of course. I'll help the customer now.","अवश्य, अहिले ग्राहकलाई सहयोग गर्छु।","help customer;customer now"],["Do you need anything before your shift ends?","सिफ्ट सकिनुअघि केही चाहिन्छ?","रिपोर्ट बुझाउन चाहेको भन्नुहोस्।","I'd like to finish the report before leaving.","जानुअघि रिपोर्ट पूरा गर्न चाहन्छु।","finish report;before leaving"]]],"take-bus":[[["Is this the bus to the city center?","यो बस सहरको केन्द्र जाने हो?","मार्ग पुष्टि गर्न सोध्नुहोस्।","Does this bus go downtown?","यो बस सहरको केन्द्र जान्छ?","bus downtown;go downtown"],["Do you have a transit card?","यातायात कार्ड छ?","कार्ड किन्ने ठाउँ सोध्नुहोस्।","Where can I buy a transit card?","यातायात कार्ड कहाँ किन्न पाइन्छ?","transit card;buy card"]],[["Where would you like to get off?","कहाँ ओर्लन चाहनुहुन्छ?","अस्पतालनजिक ओर्लने बताउनुहोस्।","I'd like to get off near the hospital.","म अस्पतालनजिक ओर्लन चाहन्छु।","near hospital;get off"],["Would you like an announcement?","स्टपको सूचना चाहिन्छ?","स्टपमा जानकारी गराउन भन्नुहोस्।","Please let me know when we reach the stop.","स्टप पुगेपछि भनिदिनुहोस्।","reach stop;let me know"]]],"hotel":[[["May I have your booking name?","बुकिङको नाम बताउनुहुन्छ?","नाम दिन तयार छु भन्नुहोस्।","Yes, the booking is under my name.","हो, बुकिङ मेरो नाममा छ।","booking name;under my name"],["Do you need help with your bags?","झोलामा सहयोग चाहिन्छ?","झोलामा सहयोग चाहिएको भन्नुहोस्।","Yes, could someone help with my bags?","हो, झोलामा सहयोग गरिदिनुहुन्छ?","help bags;my bags"]],[["Would you like a late checkout?","ढिलो चेकआउट चाहिन्छ?","ढिलो शुल्क सोध्नुहोस्।","Is there an extra fee for late checkout?","ढिलो चेकआउटको थप शुल्क छ?","extra fee;late checkout"],["Do you need a wake-up call?","बिहान उठाउने फोन चाहिन्छ?","सात बजे फोन माग्नुहोस्।","Could I have a wake-up call at seven?","सात बजे उठाउने फोन मिल्छ?","wake up call;call seven"]]],"airport":[[["Can I see your boarding pass?","बोर्डिङ पास देखाउनुहुन्छ?","पास देखाउने भन्नुहोस्।","Yes, here is my boarding pass.","हो, यो मेरो बोर्डिङ पास हो।","boarding pass;here pass"],["Do you have any checked baggage?","चेकइन गर्ने झोला छ?","एउटा झोला छ भन्नुहोस्।","Yes, I have one suitcase to check.","हो, एउटा सुटकेस चेकइन गर्नुपर्छ।","one suitcase;suitcase check"]],[["What is your final destination?","तपाईंको अन्तिम गन्तव्य कहाँ हो?","गन्तव्य बताउनुहोस्।","My final destination is Boston.","मेरो अन्तिम गन्तव्य बोस्टन हो।","destination Boston;Boston"],["Do you know your departure gate?","उडानको गेट थाहा छ?","गेट सोध्नुहोस्।","Could you tell me which gate I need?","म कुन गेटमा जानुपर्ने हो?","which gate;gate need"]]],"bank":[[["Are you here to deposit cash?","नगद जम्मा गर्न आउनुभएको हो?","पैसा जम्मा गर्न चाहन्छु भन्नुहोस्।","Yes, I'd like to deposit some cash.","हो, म केही नगद जम्मा गर्न चाहन्छु।","deposit cash;cash deposit"],["Do you have any other questions?","अरू प्रश्न छन्?","जम्मा रकम कहिले उपलब्ध हुन्छ सोध्नुहोस्।","When will the deposit be available?","जम्मा रकम कहिले उपलब्ध हुन्छ?","deposit available;when available"]],[["Would you like to open a savings account?","बचत खाता खोल्न चाहनुहुन्छ?","न्यूनतम रकम सोध्नुहोस्।","What is the minimum opening deposit?","खाता खोल्न न्यूनतम कति जम्मा चाहिन्छ?","minimum deposit;opening deposit"],["Do you need online banking?","अनलाइन बैंकिङ चाहिन्छ?","कसरी सुरु गर्ने सोध्नुहोस्।","How do I set up online banking?","अनलाइन बैंकिङ कसरी सुरु गर्ने?","set online banking;online banking"]]],"phone-repair":[[["What's wrong with the screen?","स्क्रिनमा के समस्या छ?","स्क्रिन फुटेको बताउनुहोस्।","My phone screen is cracked.","मेरो फोनको स्क्रिन फुटेको छ।","screen cracked;cracked screen"],["Do you need a repair quote?","मर्मत मूल्य चाहिन्छ?","मर्मतको शुल्क सोध्नुहोस्।","How much would a screen replacement cost?","स्क्रिन फेर्न कति खर्च हुन्छ?","screen replacement;replacement cost"]],[["Is your phone charging normally?","फोन सामान्य रूपमा चार्ज हुन्छ?","चार्ज नहुने बताउनुहोस्।","No, my phone isn't charging properly.","होइन, मेरो फोन ठीकसँग चार्ज हुँदैन।","phone charging;isn't charging"],["Would you like us to test the port?","चार्जिङ पोर्ट जाँच गरौँ?","जाँच गर्न अनुरोध गर्नुहोस्।","Yes, please check the charging port.","हो, चार्जिङ पोर्ट जाँचिदिनुहोस्।","charging port;check port"]]],"new-friend":[[["Have you lived in this city long?","तपाईं यस सहरमा लामो समयदेखि बस्नुहुन्छ?","नयाँ आएको बताउनुहोस्।","No, I moved here recently.","होइन, म हालै यहाँ सरेको हुँ।","moved recently;recently moved"],["What do you enjoy doing?","के गर्न मन पर्छ?","हिँड्न मन पर्ने बताउनुहोस्।","I enjoy walking and exploring new places.","मलाई हिँड्न र नयाँ ठाउँ घुम्न मन पर्छ।","enjoy walking;exploring places"]],[["Would you like to join us for tea?","हामीसँग चिया खान आउनुहुन्छ?","खुसीसाथ स्वीकार गर्नुहोस्।","That sounds nice. Thank you for inviting me!","रमाइलो हुन्छ। बोलाउनुभएकोमा धन्यवाद!","sounds nice;thank inviting"],["Do you have a favorite restaurant?","मन पर्ने रेस्टुरेन्ट छ?","नेपाली खाना मन पर्ने बताउनुहोस्।","I enjoy Nepali food, especially momo.","मलाई नेपाली खाना, विशेष गरी मोमो मन पर्छ।","Nepali food;momo"]]],"school-help":[[["Are you finding the homework difficult?","गृहकार्य गाह्रो भइरहेको छ?","थोरै गाह्रो भएको भन्नुहोस्।","Yes, I need help with this question.","हो, यो प्रश्नमा मद्दत चाहिन्छ।","need help question;help question"],["Which part is confusing?","कुन भाग बुझ्न गाह्रो छ?","उदाहरण माग्नुहोस्।","Could you show me another example?","अर्को उदाहरण देखाइदिनुहुन्छ?","another example;show example"]],[["Are you ready for the next lesson?","अर्को पाठका लागि तयार हुनुहुन्छ?","अझै अभ्यास गर्न चाहन्छु भन्नुहोस्।","I'd like a little more practice first.","म पहिले अझै अलि अभ्यास गर्न चाहन्छु।","more practice;practice first"],["Can you answer in a complete sentence?","पूरा वाक्यमा जवाफ दिन सक्नुहुन्छ?","प्रयास गर्ने भन्नुहोस्।","I'll try to answer in a complete sentence.","म पूरा वाक्यमा जवाफ दिने प्रयास गर्छु।","complete sentence;try answer"]]]};
const coachRoundsById=Object.create(null);
for(let i=0;i<coachAdditionalSpecs.length;i++){
 const item=coachAdditionalSpecs[i];
 const built=item.rounds.map((rows,j)=>coachBuildSteps(rows,i*3+j));
 const [first,...alternate]=built;
 scenarios.push({id:item.id,emoji:item.emoji,title:item.title,ne:item.ne,
  category:item.category,place:item.place,partner:item.partner,level:item.level,
  steps:first});
 coachRoundsById[item.id]=alternate;
}

// The expanded catalog supplements the 28 existing stories. These stubs
// provide topic browser metadata and safe fallback lesson lines. Actual
// adaptive reply choices are supplied by sikauAdaptiveStory on start.
for(const entry of (Array.isArray(window.sikauMoreTopics)?window.sikauMoreTopics:[])){
 if(scenarios.some(s=>s.id===entry.id))throw Error('Duplicate Coach catalog ID '+entry.id);
 const first=entry.config?.[1]?.[0];
 const scene={id:entry.id,emoji:entry.emoji,title:entry.title,ne:entry.ne,
  category:entry.category,place:entry.place,partner:entry.partner,
  level:entry.level||'Easy',keywords:entry.config[1].flatMap(x=>[x[0],x[1]]).join(' '),
  steps:[{npc:entry.config[0][0],npcNe:entry.config[0][1],
   answer:first[0],answerNe:first[1],
   goal:'Choose what matches your needs · आफ्नो आवश्यकता अनुसार छान्नुहोस्',
   hint:'Every response can start a different conversation.'}]};
 // Keep Buy Clothes beside Return Clothing so buying and returns
 // are clearly separate everyday situations.
 if(entry.id==='buy-clothes')scenarios.splice(1,0,scene);
 else scenarios.push(scene);
 if(!topics.includes(entry.category))topics.push(entry.category);
}

for(const [key,rounds] of Object.entries(coachOriginalSceneRounds)){
 coachRoundsById[key]=rounds.map((rows,j)=>coachBuildSteps(rows,100+j*50+Object.keys(coachOriginalSceneRounds).indexOf(key)));
}


/* Bilingual Coach extensions; practice-only, not stored as verified progress. */
const coachDepthPairs={"return-shirt":[["Can I see the original payment card?","पहिले तिरेको कार्ड देखाउनुहुन्छ?","Yes, here is my debit card.","हो, यो मेरो डेबिट कार्ड हो।"],["Do you need an email receipt?","इमेल रसिद चाहिन्छ?","Yes, please send me an email receipt.","हो, इमेल रसिद पठाइदिनुहोस्।"],["Would you like to try a different size?","अर्को साइज लगाएर हेर्ने?","Yes, may I try a larger size?","हो, ठूलो साइज लगाएर हेर्न सक्छु?"],["Should I check if it's in stock?","स्टकमा छ कि जाँच गरूँ?","Yes, please check the stock.","हो, स्टक जाँचिदिनुहोस्।"],["When did you buy this item?","यो सामान कहिले किन्नुभयो?","I bought it last week.","मैले गएको हप्ता किनेको थिएँ।"],["Would store credit work for you?","पसलको क्रेडिटले हुन्छ?","I'd prefer a refund if possible.","सम्भव भए पैसा फिर्ता चाहन्छु।"]],"buy-phone":[["What do you use your phone for?","फोन केका लागि प्रयोग गर्नुहुन्छ?","Mostly for work and video calls.","धेरैजसो काम र भिडियो कलका लागि।"],["Is battery life important to you?","ब्याट्री टिक्ने समय महत्त्वपूर्ण छ?","Yes, I need all-day battery life.","हो, दिनभर टिक्ने ब्याट्री चाहिन्छ।"],["Would you like more storage?","थप स्टोरेज चाहिन्छ?","Yes, please show me larger storage options.","हो, बढी स्टोरेजका विकल्प देखाउनुहोस्।"],["Would you like to compare the screens?","स्क्रिन तुलना गर्न चाहनुहुन्छ?","Yes, show them side by side.","हो, दुवै सँगै देखाउनुहोस्।"],["Do you need help transferring data?","डाटा सार्न मद्दत चाहिन्छ?","Yes, I need to move my photos.","हो, फोटो सार्न मद्दत चाहिन्छ।"],["Would you like to review the return policy?","फिर्ता गर्ने नियम बुझ्ने?","Please explain the return period.","फिर्ता गर्ने समयसीमा बताउनुहोस्।"]],"directions":[["Are you looking for a landmark?","कुनै चिनिने ठाउँ खोज्दै हुनुहुन्छ?","Yes, the library is nearby.","हो, पुस्तकालय नजिक छ।"],["Would you prefer the shortest route?","छोटो बाटो चाहनुहुन्छ?","Yes, I'd prefer the shortest walking route.","हो, हिँड्ने छोटो बाटो चाहन्छु।"],["Are you carrying luggage?","सामान बोकेर जानुभएको छ?","Yes, I need a route with fewer stairs.","हो, कम सिँढी भएको बाटो चाहिन्छ।"],["Do you need to know the return route?","फर्कने बाटो पनि चाहिन्छ?","Yes, how can I get back here?","हो, यहाँ कसरी फर्कने?"],["Do you need a safe place to cross?","सुरक्षित बाटोबाट पार गर्न चाहनुहुन्छ?","Yes, where is the nearest crosswalk?","हो, नजिकको जेब्रा क्रसिङ कहाँ छ?"],["Would a phone map help?","फोनको नक्साले मद्दत गर्छ?","Could you show it on a map?","नक्सामा देखाइदिनुहुन्छ?"]],"call-hospital":[["Would you prefer morning or afternoon?","बिहान कि दिउँसो चाहिन्छ?","An afternoon visit works better.","दिउँसोको समय राम्रो मिल्छ।"],["Should we send an appointment reminder?","भेटको सम्झना पठाऊँ?","Yes, please send a text reminder.","हो, सन्देशबाट सम्झाइदिनुहोस्।"],["Is Friday convenient for you?","शुक्रबार मिल्छ?","Yes, Friday afternoon works for me.","हो, शुक्रबार दिउँसो मिल्छ।"],["Would you like an earlier opening?","चाँडो खाली समय चाहिन्छ?","Yes, please call if something opens.","हो, समय खाली भए फोन गर्नुहोस्।"],["Do you have a doctor's referral?","डाक्टरको रेफरल छ?","I'll ask my doctor to send it.","म डाक्टरलाई पठाउन भन्छु।"],["Do you need directions to the clinic?","क्लिनिक पुग्ने बाटो चाहिन्छ?","Where is the main entrance?","मुख्य प्रवेशद्वार कहाँ छ?"]],"hospital-checkin":[["Do you need help finding the floor?","तल्ला खोज्न मद्दत चाहिन्छ?","Yes, which floor should I go to?","हो, कुन तल्लामा जानुपर्छ?"],["Would you like an interpreter?","अनुवादक चाहिन्छ?","A Nepali interpreter would help.","नेपाली अनुवादक भए सजिलो हुन्छ।"],["Have you completed this form?","यो फाराम भरिसक्नुभयो?","I need help with one section.","एउटा भागमा मद्दत चाहिन्छ।"],["Would you like to confirm the time?","समय पुष्टि गर्ने?","Yes, please confirm my appointment time.","हो, भेटको समय पुष्टि गरिदिनुहोस्।"],["Do you need written instructions?","लिखित निर्देशन चाहिन्छ?","Yes, please give me a printed copy.","हो, छापिएको प्रति दिनुहोस्।"],["Have you found the waiting room?","पर्खने कोठा भेट्नुभयो?","Not yet. Could you show me?","अहिले छैन। देखाइदिनुहुन्छ?"]],"restaurant":[["Would you like to hear today's special?","आजको विशेष खाना सुन्ने?","Yes, what do you recommend?","हो, के सिफारिस गर्नुहुन्छ?"],["Do you have any allergies?","कुनै खानेकुराको एलर्जी छ?","Could you tell me the ingredients?","यसका सामग्री बताइदिनुहुन्छ?"],["Would you like an appetizer?","सुरुमा हल्का खाना चाहिन्छ?","Yes, let's share an appetizer.","हो, हल्का खाना बाँडेर खाऔँ।"],["Would you like dessert?","मिठाई चाहिन्छ?","Yes, can we share one dessert?","हो, एउटै मिठाई बाँडेर खान सक्छौँ?"],["Is the spice level okay?","पिरो ठीक छ?","It's a little too spicy for me.","मलाई अलि बढी पिरो भयो।"],["Would you like separate checks?","बिल छुट्टाछुट्टै चाहिन्छ?","Yes, could we pay separately?","हो, अलग-अलग तिर्न सक्छौँ?"]],"groceries":[["Would you like to see today's deals?","आजको छुट हेर्न चाहनुहुन्छ?","Are these vegetables on sale?","यी तरकारीमा छुट छ?"],["Do you need help at checkout?","बिल तिर्न मद्दत चाहिन्छ?","Where is the self-checkout counter?","आफैं बिल तिर्ने काउन्टर कहाँ छ?"],["Would you like a larger package?","ठूलो प्याकेट चाहिन्छ?","No, a small package is enough.","होइन, सानो प्याकेट पुग्छ।"],["Are you looking for frozen food?","जमेको खानेकुरा खोज्दै हुनुहुन्छ?","Yes, where are the frozen vegetables?","हो, जमेको तरकारी कहाँ छ?"],["Do you have a loyalty card?","सदस्यता कार्ड छ?","Yes, I'd like to use my rewards.","हो, रिवार्ड प्रयोग गर्न चाहन्छु।"],["Should I check the price?","मूल्य जाँच गरूँ?","Yes, please confirm the shelf price.","हो, र्‍याकको मूल्य पुष्टि गर्नुहोस्।"]],"pharmacy":[["Do you have a question about the label?","लेबलबारे प्रश्न छ?","Could you explain the instructions?","निर्देशन बुझाइदिनुहुन्छ?"],["Would you prefer to speak privately?","एकान्तमा कुरा गर्ने?","Yes, I'd like to speak privately.","हो, एकान्तमा कुरा गर्न चाहन्छु।"],["Would you like to check the refill date?","फेरि औषधि लिने मिति जाँच्ने?","Yes, please check my refill date.","हो, मिति जाँचिदिनुहोस्।"],["Do you need written directions?","लिखित निर्देशन चाहिन्छ?","Yes, please print the instructions.","हो, निर्देशन छापिदिनुहोस्।"],["Should we contact your doctor?","डाक्टरलाई सम्पर्क गरौँ?","Yes, please ask for clarification.","हो, थप स्पष्ट पार्न सोध्नुहोस्।"],["Do you have another question?","अर्को प्रश्न छ?","Can I speak with the pharmacist?","फार्मासिस्टसँग कुरा गर्न सक्छु?"]],"coffee":[["Would you like a bigger cup?","ठूलो कप चाहिन्छ?","No, the small size is perfect.","होइन, सानो आकार ठीक छ।"],["Would you like a snack?","खाजा चाहिन्छ?","Do you have any fresh pastries?","ताजा पेस्ट्री छन्?"],["Would you like your drink iced?","चिसो पेय चाहिन्छ?","No, I'd like it hot.","होइन, तातो चाहन्छु।"],["Do you prefer another kind of milk?","अर्को प्रकारको दूध चाहिन्छ?","Could I have oat milk instead?","सट्टामा ओट मिल्क दिनुहुन्छ?"],["Would you like to sit inside?","भित्र बसेर खाने?","Is there a table by the window?","झ्यालनजिक टेबल छ?"],["Do you need your receipt?","रसिद चाहिन्छ?","Yes, please put it in the bag.","हो, झोलामा राखिदिनुहोस्।"]],"interview":[["Can you describe a challenge at work?","कामको चुनौतीबारे बताउनुहुन्छ?","I stayed calm and solved the problem.","म शान्त रहेँ र समस्या समाधान गरेँ।"],["How do you learn a new task?","नयाँ काम कसरी सिक्नुहुन्छ?","I ask questions and take notes.","म प्रश्न सोध्छु र नोट लेख्छु।"],["How do you support your coworkers?","सहकर्मीलाई कसरी सहयोग गर्नुहुन्छ?","I listen and help when they need me.","म सुन्छु र चाहिँदा मद्दत गर्छु।"],["What happens when you make a mistake?","गल्ती भयो भने के गर्नुहुन्छ?","I report it and correct it quickly.","म जानकारी दिन्छु र छिटो सच्याउँछु।"],["How do you handle a busy day?","व्यस्त दिनमा कसरी काम गर्नुहुन्छ?","I prioritize tasks and stay organized.","म कामलाई प्राथमिकता दिएर व्यवस्थित रहन्छु।"],["Do you have questions about the schedule?","तालिकाबारे प्रश्न छ?","What is the usual weekly schedule?","सामान्य साप्ताहिक तालिका कस्तो छ?"]],"work-shift":[["Can you organize the storeroom?","भण्डार कोठा मिलाइदिनुहुन्छ?","Yes, I'll sort the boxes by category.","हो, बाकसहरू प्रकारअनुसार मिलाउँछु।"],["Have you checked expiration dates?","म्याद जाँच्नुभयो?","I'll check them before restocking.","सामान थप्नुअघि जाँच्छु।"],["Can you update our inventory?","सामान सूची अद्यावधिक गर्नुहुन्छ?","Yes, I'll update it after counting.","हो, गनेपछि अद्यावधिक गर्छु।"],["Did anything arrive missing?","केही सामान कम आयो?","Yes, two items are missing.","हो, दुईवटा सामान कम छन्।"],["Could you finish the closing checklist?","बन्द गर्ने सूची पूरा गर्नुहुन्छ?","Yes, I'll finish it before leaving.","हो, जानुअघि पूरा गर्छु।"],["Would you like help with the report?","रिपोर्टमा मद्दत चाहिन्छ?","Could you review the numbers with me?","अंकहरू मसँग जाँचिदिनुहुन्छ?"]],"take-bus":[["Would you like us to announce your stop?","तपाईंको बिसौनीमा भनिदिऊँ?","Yes, please tell me when we reach the library.","हो, पुस्तकालय पुगेपछि भनिदिनुहोस्।"],["Do you need to know the fare?","भाडा कति हो जान्ने?","How much is a one-way ticket?","एकतर्फी टिकट कति हो?"],["Will you transfer to another bus?","अर्को बस फेर्नुहुन्छ?","Yes, where do I transfer?","हो, कहाँ बस फेर्ने?"],["Would you like an earlier bus?","चाँडो छुट्ने बस चाहिन्छ?","Is there a bus before nine?","नौ बजेअघि बस छ?"],["Do you know the platform?","प्लेटफर्म थाहा छ?","Which platform should I use?","म कुन प्लेटफर्ममा जाने?"],["Do you need the last bus time?","अन्तिम बसको समय चाहिन्छ?","When does the last bus leave?","अन्तिम बस कहिले छुट्छ?"]],"hotel":[["Would you like breakfast included?","बिहानको खाना समावेश चाहिन्छ?","Is breakfast included in this rate?","यो मूल्यमा बिहानको खाना समावेश छ?"],["Would you prefer a quiet room?","शान्त कोठा चाहिन्छ?","I'd prefer a room away from the elevator.","लिफ्टबाट टाढाको कोठा चाहन्छु।"],["Do you know your room number?","कोठा नम्बर थाहा छ?","Could you tell me my room number?","मेरो कोठा नम्बर बताइदिनुहुन्छ?"],["Would you like extra towels?","थप तौलिया चाहिन्छ?","Could you send two extra towels?","दुईवटा थप तौलिया पठाउनुहुन्छ?"],["Do you need luggage storage?","झोला राख्ने सुविधा चाहिन्छ?","Could you keep my bags after checkout?","चेकआउटपछि झोला राखिदिनुहुन्छ?"],["Would you like a taxi booked?","ट्याक्सी बोलाइदिऊँ?","Please book a taxi for eight.","आठ बजे ट्याक्सी बुक गरिदिनुहोस्।"]],"airport":[["Do you know the baggage weight limit?","झोलाको तौल सीमा थाहा छ?","What is the weight limit?","तौल सीमा कति हो?"],["Are there fragile items in your bag?","झोलामा फुट्ने सामान छ?","Yes, please mark it as fragile.","हो, फुट्ने सामान भनेर चिन्ह लगाउनुहोस्।"],["Would you like to check boarding time?","बोर्डिङ समय जाँच्ने?","When does boarding begin?","बोर्डिङ कहिले सुरु हुन्छ?"],["Would you like to confirm the gate?","गेट पुष्टि गर्ने?","Yes, please confirm my gate.","हो, गेट पुष्टि गर्नुहोस्।"],["Do you have a connecting flight?","अर्को उडान समात्नुहुन्छ?","How much time do I have to transfer?","उडान फेर्न कति समय छ?"],["Do you need help finding security?","सुरक्षा जाँचको बाटो चाहिन्छ?","Where is the security checkpoint?","सुरक्षा जाँच कहाँ छ?"]],"bank":[["Do you need an account summary?","खाताको सारांश चाहिन्छ?","Could I get a printed summary?","छापिएको सारांश पाउँछु?"],["Would you like to check recent activity?","हालका कारोबार जाँच्ने?","Please show me my last transactions.","पछिल्ला कारोबार देखाउनुहोस्।"],["Would you like a deposit receipt?","जम्माको रसिद चाहिन्छ?","Yes, please print the deposit receipt.","हो, जम्माको रसिद छापिदिनुहोस्।"],["Do you need to make a transfer?","पैसा ट्रान्सफर गर्नुपर्छ?","Could you explain the transfer options?","ट्रान्सफरका विकल्प बुझाइदिनुहुन्छ?"],["Would you like to request a debit card?","डेबिट कार्ड माग्नुहुन्छ?","How can I apply for a debit card?","डेबिट कार्डका लागि कसरी आवेदन दिने?"],["Do you want to know the account fees?","खाताको शुल्क जान्न चाहनुहुन्छ?","Please explain the monthly fee.","मासिक शुल्क बुझाउनुहोस्।"]],"phone-repair":[["Has your phone fallen recently?","फोन हालै खसेको हो?","Yes, it fell yesterday.","हो, हिजो खसेको थियो।"],["Would you like an estimate first?","पहिले खर्च अनुमान चाहिन्छ?","Yes, please give me an estimate.","हो, खर्च अनुमान दिनुहोस्।"],["Have you backed up your photos?","फोटो ब्याकअप गर्नुभयो?","Not yet. May I back them up first?","अहिले छैन। पहिले ब्याकअप गर्न सक्छु?"],["Should we test the battery?","ब्याट्री जाँच गर्ने?","Yes, please check the battery health.","हो, ब्याट्री जाँच्नुहोस्।"],["When did charging stop working?","चार्ज कहिलेदेखि बन्द भयो?","It started two days ago.","दुई दिनअघि सुरु भयो।"],["Would you like to know the repair time?","मर्मतको समय जान्ने?","Approximately how long will it take?","लगभग कति समय लाग्छ?"]],"new-friend":[["What do you like about this city?","यो सहरमा के मन पर्छ?","I like the parks and quiet streets.","मलाई पार्क र शान्त सडक मन पर्छ।"],["Would you like to explore this weekend?","यस सप्ताहन्त घुम्न जाने?","Yes, that sounds fun.","हो, त्यो रमाइलो हुन्छ।"],["What do you do in your free time?","फुर्सदमा के गर्नुहुन्छ?","I enjoy cooking and photography.","मलाई खाना पकाउन र फोटो खिच्न मन पर्छ।"],["Would you like to meet for tea?","चिया खान भेट्ने?","Saturday afternoon works for me.","शनिबार दिउँसो मिल्छ।"],["Do you know a good restaurant?","राम्रो रेस्टुरेन्ट थाहा छ?","I know a nice place for momo.","मोमो पाउने राम्रो ठाउँ थाहा छ।"],["Do you call your family in Nepal?","नेपालमा परिवारलाई फोन गर्नुहुन्छ?","Yes, we often talk on video calls.","हो, हामी प्रायः भिडियो कल गर्छौँ।"]],"school-help":[["Would you like me to repeat the instruction?","निर्देशन फेरि भनिदिऊँ?","Could you say it more slowly?","अलि बिस्तारै भनिदिनुहुन्छ?"],["Would another example help?","अर्को उदाहरणले मद्दत गर्छ?","Yes, another example would help.","हो, अर्को उदाहरणले मद्दत गर्छ।"],["Would you like to work with a partner?","साथीसँग अभ्यास गर्ने?","Yes, I'd like to work with a partner.","हो, साथीसँग अभ्यास गर्न चाहन्छु।"],["Do you understand the first sentence?","पहिलो वाक्य बुझ्नुभयो?","Yes, but the second sentence is difficult.","हो, तर दोस्रो वाक्य गाह्रो छ।"],["Do you want feedback on your answer?","उत्तरमा सुझाव चाहिन्छ?","Please tell me how to improve it.","कसरी सुधार्ने बताउनुहोस्।"],["Can you explain it in your own words?","आफ्नै शब्दमा बुझाउन सक्नुहुन्छ?","I'll try. Please correct my mistakes.","प्रयास गर्छु। गल्ती सच्याइदिनुहोस्।"]],"rent-home":[["Are utilities included?","पानी-बिजुलीको शुल्क समावेश छ?","Does rent include water and heat?","भाडामा पानी र तताउने शुल्क समावेश छ?"],["Would you like to see the laundry area?","लुगा धुने ठाउँ हेर्ने?","Is laundry available in this building?","यो भवनमा लुगा धुने सुविधा छ?"],["How long of a lease do you want?","कति अवधिको सम्झौता चाहिन्छ?","I'd prefer a one-year lease.","म एक वर्षको सम्झौता चाहन्छु।"],["Do you have a question about pets?","पाल्तु जनावरबारे प्रश्न छ?","Could you explain the pet policy?","पाल्तु जनावरको नियम बताउनुहुन्छ?"],["Would you like another viewing?","फेरि घर हेर्ने?","Could I visit again on Sunday?","आइतबार फेरि आउन सक्छु?"],["Do you need parking details?","पार्किङको विवरण चाहिन्छ?","Is there an extra parking fee?","पार्किङको थप शुल्क छ?"]],"home-internet":[["How many devices do you use?","कतिवटा उपकरण चलाउनुहुन्छ?","About four devices at home.","घरमा लगभग चार उपकरण।"],["Do you need fast video calls?","छिटो भिडियो कल चाहिन्छ?","Yes, I need reliable video calls.","हो, भरपर्दो भिडियो कल चाहिन्छ।"],["Where should we install the router?","राउटर कहाँ राख्ने?","Please put it in the living room.","बैठक कोठामा राखिदिनुहोस्।"],["Do you need a technician to visit?","प्राविधिक घर आउनुपर्छ?","Could someone visit after work?","कामपछि कोही आउन सक्छ?"],["Does the problem affect all devices?","सबै उपकरणमा समस्या छ?","Yes, my phone and laptop both disconnect.","हो, फोन र ल्यापटप दुवै छुट्छन्।"],["Have you tried restarting the router?","राउटर फेरि सुरु गर्नुभयो?","Yes, I've restarted it twice.","हो, दुईपटक सुरु गरेँ।"]],"delivery-help":[["Have you checked tracking?","ट्र्याकिङ हेर्नुभयो?","Yes, it hasn't updated since Monday.","हो, सोमबारदेखि अपडेट छैन।"],["Should we investigate the delivery?","डेलिभरीको जाँच गरौँ?","Yes, please check the missing package.","हो, हराएको प्याकेज जाँच्नुहोस्।"],["Did reception receive the package?","रिसेप्सनले प्याकेज पायो?","No, they haven't received anything.","होइन, केही पाएका छैनन्।"],["Should we contact the courier?","कुरियरलाई सम्पर्क गर्ने?","Yes, please ask where it was left.","हो, कहाँ राखियो भनेर सोध्नुहोस्।"],["Would you prefer a refund?","पैसा फिर्ता चाहिन्छ?","Yes, I'd like a refund to my card.","हो, कार्डमा पैसा फिर्ता चाहिन्छ।"],["Do you need a new delivery date?","नयाँ डेलिभरी मिति चाहिन्छ?","Please confirm the expected date.","अनुमानित मिति पुष्टि गर्नुहोस्।"]],"dental-office":[["Have you felt this pain before?","पहिले पनि यस्तो दुखेको थियो?","No, the pain started this morning.","होइन, आज बिहानदेखि सुरु भयो।"],["Would you like an explanation of the procedure?","उपचारको प्रक्रिया बुझ्ने?","Yes, please explain the next step.","हो, अर्को चरण बुझाउनुहोस्।"],["Do you brush every day?","दिनहुँ ब्रस गर्नुहुन्छ?","Yes, I brush twice a day.","हो, दिनमा दुईपटक ब्रस गर्छु।"],["Would you like another cleaning appointment?","फेरि सफाइको समय राख्ने?","Yes, please book me for next month.","हो, अर्को महिनाका लागि बुक गर्नुहोस्।"],["Does the pain keep you awake?","दुखाइले निद्रा बिगार्छ?","Yes, it's difficult to sleep.","हो, सुत्न गाह्रो हुन्छ।"],["Would you like a cost estimate?","खर्च अनुमान चाहिन्छ?","Please give me an estimate first.","पहिले खर्च अनुमान दिनुहोस्।"]],"parent-meeting":[["What books does your child like?","बच्चालाई कस्ता किताब मन पर्छ?","My child likes picture books.","मेरो बच्चालाई चित्र भएका किताब मन पर्छ।"],["Would you like book suggestions?","किताबको सुझाव चाहिन्छ?","Please suggest reading practice books.","पढाइ अभ्यासका किताब सुझाउनुहोस्।"],["Does your child participate in class?","बच्चा कक्षामा सहभागी हुन्छ?","Is my child comfortable speaking in class?","कक्षामा बोल्न सहज छ?"],["Would weekly updates help?","साप्ताहिक जानकारीले मद्दत गर्छ?","Yes, a short update would help.","हो, छोटो जानकारी उपयोगी हुन्छ।"],["Would you like the school calendar?","विद्यालयको पात्रो चाहिन्छ?","Please share the upcoming dates.","आउँदा मिति पठाउनुहोस्।"],["Do you prefer email or phone?","इमेल कि फोन मन पर्छ?","Email is easier for me.","मलाई इमेल सजिलो हुन्छ।"]],"shift-request":[["Have you asked a coworker?","सहकर्मीलाई सोध्नुभयो?","Yes, someone may cover my shift.","हो, कसैले मेरो सिफ्ट सम्हाल्न सक्छ।"],["Would a morning shift work?","बिहानको सिफ्ट मिल्छ?","Yes, I can work in the morning.","हो, बिहान काम गर्न सक्छु।"],["Can you give more notice next time?","अर्कोपटक चाँडो खबर गर्नुहुन्छ?","Yes, I'll give advance notice.","हो, अगाडि नै खबर गर्छु।"],["Can you confirm your availability?","उपलब्धता पुष्टि गर्नुहुन्छ?","I'm available Sunday afternoon.","आइतबार दिउँसो खाली छु।"],["Would Tuesday work better?","मंगलबार बढी मिल्छ?","Yes, please move my shift to Tuesday.","हो, सिफ्ट मंगलबार सारिदिनुहोस्।"],["Will you update the scheduling app?","तालिका एप अपडेट गर्नुहुन्छ?","Yes, I'll update it today.","हो, आजै अपडेट गर्छु।"]],"card-lost":[["When did you last use the card?","कार्ड कहिले प्रयोग गर्नुभयो?","I used it yesterday afternoon.","हिजो दिउँसो प्रयोग गरेको थिएँ।"],["Did you see an unfamiliar charge?","नचिनेको कारोबार देख्नुभयो?","Yes, I need to dispute a transaction.","हो, कारोबारमा विवाद गर्नुपर्छ।"],["Would you like transaction alerts?","कारोबारका सूचना चाहिन्छ?","Yes, please turn on alerts.","हो, सूचना खोलिदिनुहोस्।"],["Should we review the next steps?","अर्को प्रक्रिया बुझ्ने?","What should I do if another charge appears?","अर्को खर्च देखियो भने के गर्ने?"],["Do you need it mailed to you?","हुलाकबाट पठाउनुपर्छ?","Yes, send it to my verified address.","हो, पुष्टि भएको ठेगानामा पठाउनुहोस्।"],["Do you want a delivery estimate?","पुग्ने समयको अनुमान चाहिन्छ?","How many business days will it take?","कति कामकाजी दिन लाग्छ?"]],"send-mail":[["Is anything fragile inside?","भित्र फुट्ने सामान छ?","Yes, please mark this as fragile.","हो, फुट्ने भनेर चिन्ह लगाउनुहोस्।"],["Do you want shipping insurance?","पठाउने बीमा चाहिन्छ?","How much would insurance cost?","बीमाको खर्च कति हुन्छ?"],["Would you like tracking?","ट्र्याकिङ चाहिन्छ?","Yes, please give me a tracking number.","हो, ट्र्याकिङ नम्बर दिनुहोस्।"],["Should the recipient sign for it?","पाउने व्यक्तिले हस्ताक्षर गर्नुपर्छ?","Yes, I'd like signature confirmation.","हो, हस्ताक्षर पुष्टि चाहिन्छ।"],["Do you need help with customs?","भन्सारमा मद्दत चाहिन्छ?","How should I describe these gifts?","यी उपहार कसरी लेख्ने?"],["Would you like to compare shipping options?","पठाउने विकल्प तुलना गर्ने?","Which option is affordable and trackable?","कुन विकल्प सस्तो र ट्र्याक गर्न मिल्छ?"]],"car-repair":[["Does the noise happen while turning?","मोड्दा आवाज आउँछ?","No, mostly when I brake.","होइन, ब्रेक लगाउँदा बढी।"],["Should we do a road test?","सडकमा चलाएर जाँच्ने?","Yes, please test it first.","हो, पहिले परीक्षण गर्नुहोस्।"],["Do you have the service records?","मर्मतको रेकर्ड छ?","I can bring my last receipt.","पछिल्लो रसिद ल्याउन सक्छु।"],["Should we call before extra repairs?","थप मर्मतअघि फोन गर्ने?","Yes, please call me before extra work.","हो, थप कामअघि फोन गर्नुहोस्।"],["Does the warning light stay on?","चेतावनी बत्ती बलिरहन्छ?","Yes, even when I'm driving.","हो, चलाउँदा पनि बल्छ।"],["Do you need the car back today?","आजै गाडी चाहिन्छ?","When will the car be ready?","गाडी कहिले तयार हुन्छ?"]],"library":[["Would you like help finding a book?","किताब खोज्न मद्दत चाहिन्छ?","I'd like an easy English storybook.","सजिलो अंग्रेजी कथाको किताब चाहिन्छ।"],["Do you know the borrowing period?","लैजाने अवधि थाहा छ?","How many weeks can I keep it?","कति हप्ता राख्न सक्छु?"],["Do you already have a library card?","पुस्तकालय कार्ड छ?","Not yet. Can I apply today?","अहिले छैन। आज बनाउन सक्छु?"],["Would you like intermediate books?","मध्यम स्तरका किताब चाहिन्छ?","Yes, I'd like to practice reading.","हो, पढ्ने अभ्यास गर्न चाहन्छु।"],["Do you want to reserve a computer?","कम्प्युटर बुक गर्ने?","Could I reserve one for an hour?","एक घण्टा बुक गर्न सक्छु?"],["Are you interested in speaking classes?","बोल्ने कक्षामा रुचि छ?","Yes, I'd like to join a conversation group.","हो, कुराकानी समूहमा सहभागी हुन चाहन्छु।"]]};

/* Authored, situation-specific exchanges. These remain within the same real-life
 * topic instead of inserting unrelated generic questions. */
const coachNaturalDialogues={"return-shirt":[["May I check whether this is within our return policy?","यो सामान फिर्ताको नियमभित्र पर्छ कि जाँच गरूँ?","Yes, I want to make sure I'm still within the return period.","हो, म समयसीमाभित्र छु कि पक्का गर्न चाहन्छु।"],["Is the shirt still unworn?","यो कमिज लगाइएको छैन?","Yes, I only tried it on at home.","हो, घरमा लगाएर मात्र हेरेको थिएँ।"],["Did you pay by cash or by card?","नगद कि कार्डले तिर्नुभयो?","I paid with my debit card.","मैले डेबिट कार्डले तिरेको थिएँ।"],["Do you still have the original tags?","पुराना ट्यागहरू अझै छन्?","Yes, the tags are still attached to the shirt.","हो, कमिजमा पुरानै ट्याग छन्।"],["Would you like to review our return policy?","फिर्ता गर्ने नियम हेर्न चाहनुहुन्छ?","Yes, please explain the conditions briefly.","हो, कृपया सर्तहरू छोटकरीमा बुझाउनुहोस्।"],["Is there anything else about the return?","फिर्तासम्बन्धी अरू प्रश्न छ?","About how long does the process usually take?","सामान्यतया प्रक्रिया कति समय लाग्छ?"]],"buy-phone":[["Would you like to hold the phone?","फोन समाएर हेर्न चाहनुहुन्छ?","Yes, I'd like to see how it feels in my hand.","हो, हातमा कस्तो लाग्छ हेर्न चाहन्छु।"],["Do you usually take many pictures?","धेरै फोटो खिच्नुहुन्छ?","Yes, I take photos when I travel.","हो, घुम्दा फोटो खिच्छु।"],["Do you want a phone that charges quickly?","छिटो चार्ज हुने फोन चाहिन्छ?","Yes, fast charging would be useful.","हो, छिटो चार्ज हुनु उपयोगी हुन्छ।"],["Would you like me to explain the warranty?","वारेन्टी बुझाइदिऊँ?","Yes, please explain what the warranty covers.","हो, वारेन्टीले के समेट्छ बताउनुहोस्।"],["Do you need a protective case?","फोनको कभर चाहिन्छ?","Maybe. How much does a protective case cost?","हुन सक्छ। कभरको मूल्य कति हो?"],["Would you like a copy of the quotation?","मूल्य विवरणको प्रति चाहिन्छ?","Yes, so I can compare the options at home.","हो, घरमा विकल्प तुलना गर्न चाहन्छु।"]],"directions":[["Which entrance are you looking for?","कुन प्रवेशद्वार खोज्दै हुनुहुन्छ?","I'm looking for the main entrance.","म मुख्य प्रवेशद्वार खोज्दै छु।"],["Do you recognize the large supermarket?","ठूलो सुपरमार्केट चिन्नुहुन्छ?","Yes, I passed it a few minutes ago.","हो, केही मिनेटअघि त्यहाँबाट आएको हुँ।"],["Can you see the traffic light ahead?","अगाडिको ट्राफिक बत्ती देख्नुभयो?","Yes, I can see it on the corner.","हो, कुनामा देखिरहेको छु।"],["Do you need to cross that road?","त्यो सडक पार गर्नुपर्छ?","Yes, where is the safest crossing?","हो, सुरक्षित रूपमा कहाँ पार गर्ने?"],["Do you have enough time to walk?","हिँडेर जान समय पुग्छ?","I have time, but I'd prefer a direct route.","समय छ तर सीधा बाटो मन पर्छ।"],["Would you like me to repeat the directions?","बाटो फेरि बताइदिऊँ?","Yes, please repeat the final turn.","हो, अन्तिम मोड फेरि बताइदिनुहोस्।"]],"call-hospital":[["Are you an existing patient?","पहिल्यै यस क्लिनिकमा आउनुभएको छ?","Yes, I visited the clinic last year.","हो, गएको वर्ष आएको थिएँ।"],["Are weekdays usually convenient?","साताका कामकाजी दिन मिल्छ?","Afternoons are easier because I work mornings.","म बिहान काम गर्छु, दिउँसो सजिलो हुन्छ।"],["Would you like to see the same doctor?","पहिलेकै डाक्टरसँग भेट्ने?","Yes, if that doctor is available.","हो, उहाँ उपलब्ध भए।"],["Would you prefer an in-person visit?","आफैं आएर भेट्न चाहनुहुन्छ?","Yes, I'd prefer to visit the clinic.","हो, म क्लिनिकमै आउन चाहन्छु।"],["Should I confirm your appointment?","तपाईंको भेटको समय पक्का गरूँ?","Yes, please confirm the day and time.","हो, दिन र समय पुष्टि गर्नुहोस्।"],["Can I answer any questions before we hang up?","फोन राख्नुअघि केही प्रश्न छ?","Yes, how early should I arrive?","हो, कति चाँडो पुग्नुपर्छ?"]],"hospital-checkin":[["Did you find the correct reception desk?","सही रिसेप्सन भेट्नुभयो?","I think so. Could you confirm this is the right desk?","जस्तो लाग्छ। यो सही काउन्टर हो?"],["Are you here for your scheduled visit?","निर्धारित भेटका लागि आउनुभएको हो?","Yes, my appointment is this morning.","हो, आज बिहान मेरो भेट छ।"],["Do you need help reading this form?","फाराम पढ्न मद्दत चाहिन्छ?","Yes, could you explain this section?","हो, यो भाग बुझाइदिनुहुन्छ?"],["Is your contact information up to date?","सम्पर्क जानकारी अद्यावधिक छ?","I need to update my phone number.","मलाई फोन नम्बर बदल्नुपर्छ।"],["Would you like to know the expected wait?","कति पर्खनुपर्छ जान्ने?","Yes, approximately how long will I wait?","हो, लगभग कति पर्खनुपर्छ?"],["Will you need directions after your appointment?","भेटपछि बाटो खोज्न मद्दत चाहिन्छ?","Yes, where can I find the exit?","हो, बाहिर निस्कने बाटो कहाँ छ?"]],"restaurant":[["Would you like a table by the window?","झ्यालनजिकको टेबल चाहिन्छ?","Yes, a table by the window would be lovely.","हो, झ्यालनजिकको टेबल राम्रो हुन्छ।"],["Can I bring you something to drink first?","पहिले केही पिउन ल्याऊँ?","Could we have two glasses of water?","दुई गिलास पानी दिनुहुन्छ?"],["Would you like something to start with?","सुरुमा केही हल्का खानेकुरा चाहिन्छ?","Yes, could we share a small appetizer?","हो, सानो एपेटाइजर बाँडेर खान सक्छौँ?"],["Is everything tasting okay?","खानाको स्वाद ठीक छ?","Yes, it's delicious. Thank you for checking.","हो, मिठो छ। सोध्नुभएकोमा धन्यवाद।"],["Would you like to pack your leftovers?","बाँकी खाना प्याक गरिदिऊँ?","Yes, could you pack this to take home?","हो, घर लैजान प्याक गरिदिनुहुन्छ?"],["Will you be paying together?","एकैपटक बिल तिर्नुहुन्छ?","Yes, I'll pay for the whole table.","हो, सबैको बिल म तिर्छु।"]],"groceries":[["Do you have a shopping list today?","आज सामानको सूची छ?","Yes, I need vegetables, rice, and some fruit.","हो, तरकारी, चामल र फलफूल चाहिन्छ।"],["Would you like help with the produce section?","तरकारी-फलफूलको भागमा मद्दत चाहिन्छ?","Yes, I'm looking for fresh tomatoes.","हो, ताजा गोलभेडा खोज्दै छु।"],["Are you looking for a particular brand?","कुनै खास ब्रान्ड चाहिन्छ?","Not really. I'd like the best value.","खास छैन। उचित मूल्यको चाहिन्छ।"],["Would you like to know the price per kilogram?","प्रतिकिलो मूल्य जान्न चाहनुहुन्छ?","Yes, how much are these potatoes per kilogram?","हो, यी आलुको प्रतिकिलो कति हो?"],["Have you found everything you need?","चाहिएका सबै सामान भेट्नुभयो?","Almost. I still need some cooking oil.","प्रायः भेटेँ। तेल अझै चाहिन्छ।"],["Do you need help carrying the bags?","झोला बोक्न मद्दत चाहिन्छ?","Thanks, but I can carry these myself.","धन्यवाद, तर यी आफैं बोक्न सक्छु।"]],"pharmacy":[["Are you picking up a prescription today?","आज डाक्टरले लेखेको औषधि लिन आउनुभयो?","Yes, I'm here to collect my prescription.","हो, औषधि लिन आएको हुँ।"],["May I check the prescription details?","औषधिको विवरण जाँच्न सक्छु?","Yes, please confirm it matches my prescription.","हो, डाक्टरले लेखेकै हो कि पुष्टि गर्नुहोस्।"],["Would you like me to explain the label?","लेबल बुझाइदिऊँ?","Yes, I want to understand the instructions.","हो, निर्देशन बुझ्न चाहन्छु।"],["Do you have any other questions for the pharmacist?","फार्मासिस्टलाई अरू प्रश्न छ?","Yes, can I ask about possible side effects?","हो, सम्भावित असरबारे सोध्न सक्छु?"],["Would you prefer a written explanation?","लिखित रूपमा बुझाइदिऊँ?","Yes, a written explanation would be helpful.","हो, लिखित जानकारी उपयोगी हुन्छ।"],["Would you like us to contact your doctor?","हामीले डाक्टरलाई सम्पर्क गरौँ?","Yes, please clarify the prescription with the doctor.","हो, डाक्टरसँग औषधिको विवरण स्पष्ट गर्नुहोस्।"]],"coffee":[["Are you ordering for yourself?","आफ्नै लागि अर्डर गर्दै हुनुहुन्छ?","Yes, it's just for me today.","हो, आज मेरै लागि मात्र हो।"],["Would you prefer your drink strong or mild?","पेय कडा कि हल्का चाहिन्छ?","A mild drink would be perfect.","हल्का पेय ठीक हुन्छ।"],["Would you like to add any flavor?","कुनै स्वाद थप्न चाहनुहुन्छ?","No, I'd like to keep it simple.","होइन, सामान्य नै चाहन्छु।"],["Do you have any dietary preferences?","खानेकुरामा कुनै विशेष चाहना छ?","Do you have anything without dairy?","दूध नभएको केही छ?"],["Should we call your name when it's ready?","तयार भएपछि नाम बोलाऊँ?","Yes, I'll wait near the counter.","हो, म काउन्टरनजिक पर्खन्छु।"],["Would you like a napkin with your order?","अर्डरसँग रुमाल चाहिन्छ?","Yes, one napkin would be great.","हो, एउटा रुमाल दिनुहोस्।"]],"interview":[["What interested you in this position?","यो जागिरमा किन रुचि भयो?","I enjoy solving problems and helping customers.","मलाई समस्या समाधान गर्न र ग्राहकलाई सहयोग गर्न मन पर्छ।"],["Could you describe your previous experience?","पहिलेको अनुभव बताउनुहुन्छ?","I have experience working with customers and inventory.","मसँग ग्राहक र सामान व्यवस्थापनको अनुभव छ।"],["How do you respond when a customer is unhappy?","ग्राहक असन्तुष्ट भए के गर्नुहुन्छ?","I listen carefully and look for a fair solution.","म ध्यान दिएर सुन्छु र उचित समाधान खोज्छु।"],["How do you manage several tasks at once?","एकैपटक धेरै काम कसरी सम्हाल्नुहुन्छ?","I prioritize urgent tasks and stay organized.","म जरुरी कामलाई प्राथमिकता दिएर व्यवस्थित रहन्छु।"],["What skill would you like to improve?","कुन सीप सुधार्न चाहनुहुन्छ?","I'd like to improve my communication skills.","म सञ्चार सीप सुधार्न चाहन्छु।"],["Do you have any questions about our team?","हाम्रो टोलीबारे कुनै प्रश्न छ?","Yes, how do team members support each other?","हो, टोलीका सदस्यले कसरी सहयोग गर्छन्?"]],"work-shift":[["Could you check the delivery list?","आएको सामानको सूची जाँचिदिनुहुन्छ?","Yes, I'll compare it with the boxes.","हो, बाकससँग सूची मिलाएर जाँच्छु।"],["Did every item arrive?","सबै सामान आइपुग्यो?","Not quite. Two items appear to be missing.","पूरै छैन। दुई सामान कम जस्तो छ।"],["Can you record the missing items?","नपुगेका सामानको विवरण राख्नुहुन्छ?","Yes, I'll note the quantities and report them.","हो, संख्या लेखेर जानकारी दिन्छु।"],["Could you help a customer at the counter?","काउन्टरमा ग्राहकलाई सहयोग गर्नुहुन्छ?","Sure, I'll help them right away.","पक्कै, अहिले नै सहयोग गर्छु।"],["Have you finished stocking the shelves?","र्‍याकमा सामान राखिसक्नुभयो?","Almost. I have one section left.","लगभग। एउटा भाग बाँकी छ।"],["Can you give me a shift handover update?","सिफ्ट सकिँदा के काम बाँकी छ बताउनुहुन्छ?","Yes, I'll explain what's done and what's pending.","हो, सकिएको र बाँकी काम बताउँछु।"]],"take-bus":[["Are you waiting for the downtown bus?","शहर जाने बस पर्खिरहनुभएको छ?","Yes, I need to get downtown today.","हो, आज शहर जानुपर्छ।"],["Would you like to know the next arrival time?","अर्को बस आउने समय चाहिन्छ?","Yes, how many minutes until the next bus?","हो, अर्को बस आउन कति मिनेट छ?"],["Are you paying with a ticket or transit card?","टिकट कि यात्रा कार्डले तिर्नुहुन्छ?","I'll use my transit card.","म यात्रा कार्ड प्रयोग गर्छु।"],["Do you need a transfer after this bus?","यसपछि अर्को बस फेर्नुपर्छ?","Yes, I need to change buses near the station.","हो, स्टेसननजिक बस फेर्नुपर्छ।"],["Do you know your stop?","आफ्नो बिसौनी थाहा छ?","I think so, but could you remind me?","जस्तो लाग्छ, तर सम्झाइदिनुहुन्छ?"],["Did you find your destination?","आफ्नो गन्तव्य भेट्नुभयो?","Yes, thanks for helping me get here.","हो, यहाँ पुग्न मद्दत गर्नुभएकोमा धन्यवाद।"]],"hotel":[["How many nights will you stay?","कति रात बस्नुहुन्छ?","I'll stay for three nights.","म तीन रात बस्छु।"],["Do you need help with your bags?","सामान बोक्न मद्दत चाहिन्छ?","Yes, could someone bring my suitcase upstairs?","हो, मेरो सुटकेस माथि लैजान मद्दत गर्नुहुन्छ?"],["Would you like to know breakfast hours?","बिहानको खाना खाने समय चाहिन्छ?","Yes, what time does breakfast start?","हो, बिहानको खाना कहिले सुरु हुन्छ?"],["Is the temperature in your room comfortable?","कोठाको तापक्रम ठीक छ?","It's a little cold. Could someone check the heating?","अलि चिसो छ। तताउने व्यवस्था जाँचिदिनुहुन्छ?"],["Would you like a late checkout?","ढिलो चेकआउट चाहिन्छ?","What time is the latest checkout?","सबैभन्दा ढिलो कति बजे निस्कन पाइन्छ?"],["How was your stay overall?","यहाँ बसाइ कस्तो भयो?","It was comfortable. Thank you for your help.","आरामदायी भयो। सहयोगका लागि धन्यवाद।"]],"airport":[["Are you checking in for your flight?","उडानको चेकइन गर्दै हुनुहुन्छ?","Yes, I'm here to check in for my flight.","हो, मेरो उडानको चेकइन गर्न आएको हुँ।"],["Do you have your travel documents ready?","यात्रा कागजात तयार छन्?","Yes, I have my passport and booking details.","हो, पासपोर्ट र बुकिङ विवरण छ।"],["Is this your only suitcase?","यही एउटा मात्र सुटकेस हो?","Yes, I have one checked suitcase.","हो, चेकइन गर्ने एउटा सुटकेस छ।"],["Would you like an aisle or window seat?","गल्लीपट्टि कि झ्यालपट्टि सिट?","A window seat would be nice if available.","उपलब्ध भए झ्यालपट्टि सिट राम्रो हुन्छ।"],["Do you know where to go through security?","सुरक्षा जाँच गर्ने ठाउँ थाहा छ?","Not yet. Could you point me in the right direction?","अहिले छैन। बाटो देखाउनुहुन्छ?"],["Would you like me to confirm boarding time?","बोर्डिङ समय पुष्टि गरिदिऊँ?","Yes, I don't want to miss the announcement.","हो, सूचना छुटाउन चाहन्न।"]],"bank":[["What brings you to the branch today?","आज बैंकमा किन आउनुभयो?","I need to ask about a transaction.","एउटा कारोबारबारे सोध्न आएको हुँ।"],["Would you like me to review your account activity?","खाताका कारोबार जाँचिदिऊँ?","Yes, I'd like to understand this payment.","हो, यो भुक्तानीबारे बुझ्न चाहन्छु।"],["Did you notice the charge recently?","यो खर्च हालै देख्नुभयो?","Yes, I noticed it this morning.","हो, आज बिहान देखेँ।"],["Would you like an explanation of the fee?","शुल्कको कारण बुझ्न चाहनुहुन्छ?","Yes, could you explain why this fee was charged?","हो, यो शुल्क किन लाग्यो बताउनुहुन्छ?"],["Do you need a receipt for your records?","रेकर्डका लागि रसिद चाहिन्छ?","Yes, please print a copy for me.","हो, कृपया एउटा प्रति छापिदिनुहोस्।"],["Is there anything else about your account?","खाताबारे अरू केही प्रश्न छ?","Yes, how can I avoid this fee next time?","हो, अर्को पटक यो शुल्क कसरी बचाउने?"]],"phone-repair":[["When did you first notice the problem?","समस्या कहिलेदेखि देख्नुभयो?","It started after I dropped the phone.","फोन खसेपछि सुरु भयो।"],["Does the screen still respond to touch?","स्क्रिन छोएपछि काम गर्छ?","Only sometimes. It often stops responding.","कहिलेकाहीँ मात्र। प्रायः काम गर्दैन।"],["Have you already tried restarting it?","फोन फेरि सुरु गर्नुभयो?","Yes, but the problem is still there.","हो, तर समस्या उस्तै छ।"],["Is the screen protector damaged as well?","स्क्रिन प्रोटेक्टर पनि बिग्रेको छ?","Yes, but the screen underneath is cracked too.","हो, तर तलको स्क्रिन पनि फुटेको छ।"],["Would you prefer repair or replacement?","मर्मत कि नयाँ फोन चाहनुहुन्छ?","I'd like to repair it if that's reasonable.","उचित खर्च भए मर्मत गर्न चाहन्छु।"],["Would you like to know when it will be ready?","कहिले तयार हुन्छ जान्ने?","Yes, could you give me an estimated pickup time?","हो, कहिले लिन आउने अनुमान दिनुहुन्छ?"]],"new-friend":[["Is this your first time at this event?","यो कार्यक्रममा पहिलो पटक आउनुभएको हो?","Yes, it's my first time here.","हो, यहाँ पहिलोपटक आएको हुँ।"],["How long have you been living nearby?","यहाँ नजिक बसेको कति भयो?","I moved to this neighborhood recently.","म हालै यो छिमेकमा सरेको हुँ।"],["What do you enjoy on the weekends?","सप्ताहन्तमा के गर्न मन पर्छ?","I enjoy walking and visiting new places.","मलाई हिँड्न र नयाँ ठाउँ घुम्न मन पर्छ।"],["Have you found any good local cafés?","नजिक राम्रो क्याफे भेट्नुभयो?","Not yet. Do you have a recommendation?","अहिलेसम्म छैन। केही सुझाव छ?"],["Would you like to meet up sometime?","कुनै दिन भेट्ने?","Sure, it would be nice to keep in touch.","पक्कै, सम्पर्कमा रहन राम्रो हुन्छ।"],["How can we plan another meeting?","अर्को भेट कसरी मिलाउने?","We could meet at the park next Saturday.","अर्को शनिबार पार्कमा भेट्न सक्छौँ।"]],"school-help":[["What part of the lesson is difficult?","पाठको कुन भाग गाह्रो छ?","I understand the words, but not the whole sentence.","शब्द बुझ्छु तर पूरा वाक्य बुझ्दिनँ।"],["Would you like to try the first example together?","पहिलो उदाहरण सँगै गर्ने?","Yes, please show me how to start.","हो, कसरी सुरु गर्ने देखाउनुहोस्।"],["Can you explain why you chose that answer?","किन त्यो उत्तर छान्नुभयो भन्नुहुन्छ?","I chose it because of the past tense.","मैले भूतकाल भएकाले छानेँ।"],["Would you like to practice another sentence?","अर्को वाक्य अभ्यास गर्ने?","Yes, I'd like one that's a little harder.","हो, अलि गाह्रो वाक्य चाहन्छु।"],["Do you want me to check your writing?","लेखाइ जाँचिदिऊँ?","Yes, please correct any grammar mistakes.","हो, व्याकरणका गल्ती सच्याइदिनुहोस्।"],["What will you practice at home?","घरमा के अभ्यास गर्नुहुन्छ?","I'll practice making complete sentences.","पूरा वाक्य बनाउन अभ्यास गर्छु।"]],"rent-home":[["What is your preferred move-in date?","कहिलेदेखि बस्न चाहनुहुन्छ?","I'd like to move in next month.","म अर्को महिनादेखि बस्न चाहन्छु।"],["How many people would live here?","यहाँ कति जना बस्नुहुन्छ?","Two people would live in the apartment.","अपार्टमेन्टमा दुई जना बस्छौँ।"],["Would you like to see the kitchen?","भान्सा हेर्न चाहनुहुन्छ?","Yes, I'd like to check the storage space.","हो, सामान राख्ने ठाउँ जाँच्न चाहन्छु।"],["Do you have questions about utilities?","पानी-बिजुलीबारे प्रश्न छ?","Yes, which utilities are included in the rent?","हो, भाडामा कुन उपयोगिता समावेश छन्?"],["Would you like to review the lease terms?","सम्झौताका सर्तहरू बुझ्ने?","Yes, I'd like to understand the deposit conditions.","हो, धरौटीका सर्त बुझ्न चाहन्छु।"],["Do you want to arrange another visit?","अर्को पटक हेर्ने समय राख्ने?","Yes, could I come back with a family member?","हो, परिवारको सदस्यसँग फेरि आउन सक्छु?"]],"home-internet":[["How many people use the internet at home?","घरमा कति जनाले इन्टरनेट चलाउँछन्?","Two people use it for work and study.","दुई जनाले काम र पढाइका लागि चलाउँछन्।"],["Are video calls important to you?","भिडियो कल महत्त्वपूर्ण छ?","Yes, we call family abroad regularly.","हो, विदेशमा परिवारसँग नियमित कुरा गर्छौँ।"],["Would you like a speed estimate?","गतिको अनुमान चाहिन्छ?","Yes, what speed is available at my address?","हो, मेरो ठेगानामा कति गति उपलब्ध छ?"],["Would you need installation at home?","घरमै जडान गर्नुपर्छ?","Yes, I'd like a technician to install it.","हो, प्राविधिकले जडान गरिदिए राम्रो।"],["Would you like to know the monthly cost?","मासिक खर्च जान्न चाहनुहुन्छ?","Yes, please explain all the monthly charges.","हो, सबै मासिक शुल्क बुझाउनुहोस्।"],["Do you have any questions about cancellation?","सेवा बन्द गर्ने नियमबारे प्रश्न छ?","Yes, is there a cancellation fee?","हो, रद्द गर्दा शुल्क लाग्छ?"]],"delivery-help":[["What item are you waiting for?","कुन सामान पर्खिरहनुभएको छ?","I'm waiting for a pair of shoes.","म जुत्ताको जोडी पर्खिरहेको छु।"],["Was the delivery supposed to arrive today?","आज सामान आइपुग्ने थियो?","Yes, it was expected this morning.","हो, आज बिहान आउने भनिएको थियो।"],["Have you checked the tracking number?","ट्र्याकिङ नम्बर जाँच्नुभयो?","Yes, it says the package was delivered.","हो, सामान पुगिसकेको भनेर देखाउँछ।"],["Did anyone else receive it?","अरू कसैले लिएको हो?","No, I asked everyone in the building.","होइन, भवनका सबैलाई सोधेँ।"],["Would you like us to investigate?","हामीले जाँच गरौँ?","Yes, could you contact the delivery driver?","हो, सामान ल्याउने व्यक्तिलाई सम्पर्क गर्नुहुन्छ?"],["If we cannot locate it, what would you prefer?","फेला परेन भने के चाहनुहुन्छ?","I'd prefer a replacement, if possible.","सम्भव भए अर्को सामान चाहन्छु।"]],"dental-office":[["Is this your first visit to our office?","यो क्लिनिकमा पहिलो पटक हो?","Yes, it's my first appointment here.","हो, यहाँ पहिलो भेट हो।"],["Which tooth is bothering you?","कुन दाँत दुखिरहेको छ?","The tooth on my lower left side hurts.","मेरो तल बायाँपट्टिको दाँत दुख्छ।"],["Does it hurt when you eat?","खाँदा दुख्छ?","Yes, especially when I eat cold food.","हो, विशेष गरी चिसो खाँदा।"],["Would you like the dentist to take a look?","डाक्टरले जाँच गरून्?","Yes, I'd like to know what's causing it.","हो, के कारणले दुख्यो जान्न चाहन्छु।"],["Would you like to discuss treatment choices?","उपचारका विकल्प बुझ्ने?","Yes, please explain the options and costs.","हो, विकल्प र खर्च बुझाउनुहोस्।"],["Do you need a follow-up appointment?","फेरि भेट्ने समय चाहिन्छ?","Yes, please tell me when I should return.","हो, कहिले फेरि आउनुपर्छ बताउनुहोस्।"]],"parent-meeting":[["How has your child been doing at home?","घरमा बच्चाको पढाइ कस्तो छ?","My child enjoys reading but needs help writing.","पढ्न मन पर्छ तर लेख्न सहयोग चाहिन्छ।"],["Have you noticed any homework challenges?","गृहकार्यमा कुनै समस्या देख्नुभयो?","Yes, spelling can be difficult sometimes.","हो, कहिलेकाहीँ हिज्जे गाह्रो हुन्छ।"],["Would you like to hear about class progress?","कक्षाको प्रगति सुन्ने?","Yes, how is my child doing compared with last term?","हो, अघिल्लो सत्रभन्दा कस्तो प्रगति छ?"],["What would help with reading practice?","पढ्ने अभ्यासका लागि के उपयोगी हुन्छ?","Could you recommend some short stories?","छोटो कथाका किताब सुझाउनुहुन्छ?"],["Would you like updates about assignments?","गृहकार्यबारे जानकारी चाहिन्छ?","Yes, email updates would help me.","हो, इमेलको जानकारी उपयोगी हुन्छ।"],["When should we check progress again?","अर्को पटक प्रगति कहिले जाँच्ने?","Could we discuss progress next month?","अर्को महिना प्रगतिबारे कुरा गर्न सक्छौँ?"]],"shift-request":[["Which day do you need off?","कुन दिन बिदा चाहिन्छ?","I need next Friday off for an appointment.","मलाई अर्को शुक्रबार भेटका लागि बिदा चाहिन्छ।"],["Have you checked the work schedule?","कामको तालिका हेर्नुभयो?","Yes, I'm scheduled for the afternoon shift.","हो, दिउँसोको सिफ्टमा छु।"],["Could you arrange someone to cover it?","सिफ्ट सम्हाल्ने कोही मिलाउन सक्नुहुन्छ?","I can ask a coworker to switch with me.","सहकर्मीसँग सिफ्ट साट्न सोध्न सक्छु।"],["Would you be available on a different day?","अर्को दिन काम गर्न मिल्छ?","Yes, I can work on Monday instead.","हो, सट्टामा सोमबार काम गर्न सक्छु।"],["Would you like me to review your request?","अनुरोध जाँचिदिऊँ?","Yes, please let me know if the change is approved.","हो, स्वीकृत भए जानकारी दिनुहोस्।"],["Can you confirm the updated schedule?","परिवर्तित तालिका पुष्टि गर्नुहुन्छ?","Yes, I'll check the schedule tonight.","हो, आज बेलुका तालिका हेर्छु।"]],"card-lost":[["When did you notice your card was missing?","कार्ड हराएको कहिले थाहा भयो?","I noticed it this morning.","आज बिहान थाहा भयो।"],["Have you checked your wallet and bag?","पर्स र झोला जाँच्नुभयो?","Yes, I checked both carefully.","हो, दुवै ध्यान दिएर हेरेँ।"],["Should we lock the card immediately?","कार्ड तुरुन्त रोकौँ?","Yes, please lock it to prevent misuse.","हो, दुरुपयोग रोक्न कार्ड बन्द गर्नुहोस्।"],["Have you noticed any unfamiliar purchases?","अपरिचित खर्च देख्नुभयो?","I saw one transaction I don't recognize.","मैले नचिनेको एउटा कारोबार देखेँ।"],["Would you like to discuss a replacement?","नयाँ कार्डबारे कुरा गर्ने?","Yes, how soon can a replacement arrive?","हो, नयाँ कार्ड कति चाँडो आउँछ?"],["Do you need help accessing your account?","खाता खोल्न मद्दत चाहिन्छ?","Yes, how can I check my balance safely?","हो, सुरक्षित रूपमा ब्यालेन्स कसरी हेर्ने?"]],"send-mail":[["Where are you sending this package?","यो प्याकेज कहाँ पठाउनुहुन्छ?","I'm sending it to my family in Nepal.","नेपालमा परिवारलाई पठाउँदै छु।"],["What kind of items are inside?","भित्र कस्ता सामान छन्?","There are clothes and some gifts.","भित्र कपडा र केही उपहार छन्।"],["Would you like to compare delivery prices?","पठाउने मूल्य तुलना गर्ने?","Yes, which option is more affordable?","हो, कुन विकल्प सस्तो छ?"],["Do you need the package to arrive quickly?","छिटो पुर्‍याउनुपर्छ?","It isn't urgent, but I'd like tracking.","हतार छैन, तर ट्र्याकिङ चाहिन्छ।"],["Would you like to check the address?","ठेगाना जाँच गर्ने?","Yes, could you confirm the postal code?","हो, हुलाक कोड पुष्टि गर्नुहुन्छ?"],["Would you like the receipt printed?","रसिद छाप्ने?","Yes, please print it with the tracking number.","हो, ट्र्याकिङ नम्बरसहित छाप्नुहोस्।"]],"car-repair":[["What seems to be wrong with your car?","गाडीमा के समस्या छ?","It makes a noise when I use the brakes.","ब्रेक लगाउँदा आवाज आउँछ।"],["When did the noise first start?","आवाज कहिलेदेखि आउन थाल्यो?","It started about a week ago.","एक हप्ताअघि सुरु भयो।"],["Does the noise happen every time?","हरेक पटक आवाज आउँछ?","Not always. It's worse when driving downhill.","सधैं होइन। ओरालोमा बढी हुन्छ।"],["Would you like us to inspect the brakes?","ब्रेक जाँच गरौँ?","Yes, safety is my main concern.","हो, सुरक्षा मेरो मुख्य चिन्ता हो।"],["Should we call you with a cost estimate?","खर्च अनुमान बताउन फोन गरौँ?","Yes, please call before replacing any parts.","हो, पार्ट फेर्नुअघि फोन गर्नुहोस्।"],["Do you need a pickup time estimate?","कहिले लिन आउने जान्ने?","Yes, I need to plan my ride home.","हो, घर फर्कने सवारी मिलाउनुपर्छ।"]],"library":[["Are you looking for fiction or nonfiction?","कथा कि गैरकथा किताब चाहिन्छ?","I'd like a short English story.","मलाई छोटो अंग्रेजी कथा चाहिन्छ।"],["What reading level suits you?","कुन स्तरमा पढ्न सहज हुन्छ?","I'm comfortable with simple paragraphs.","म सजिला अनुच्छेद पढ्न सक्छु।"],["Would you like books with audio?","अडियो भएका किताब चाहिन्छ?","Yes, listening would help my pronunciation.","हो, सुनेर उच्चारण सुधार्न मद्दत हुन्छ।"],["Would you like to borrow more than one book?","एकभन्दा बढी किताब लैजान चाहनुहुन्छ?","Yes, may I borrow two books today?","हो, आज दुई किताब लैजान सक्छु?"],["Do you know how renewals work?","म्याद थप्ने तरिका थाहा छ?","Could you explain how to renew online?","अनलाइन म्याद कसरी थप्ने बुझाउनुहुन्छ?"],["Would you like to join a speaking group?","बोल्ने समूहमा सहभागी हुन चाहनुहुन्छ?","Yes, I'd like to practice English with others.","हो, अरूसँग अंग्रेजी अभ्यास गर्न चाहन्छु।"]]};
const coachSceneConclusions={"return-shirt":[["Would you like to know when the refund will arrive?","रकम कहिले फिर्ता आउँछ जान्न चाहनुहुन्छ?","Yes, about how many business days does it take?","हो, लगभग कति कामकाजी दिन लाग्छ?"],["Should I send you the return confirmation?","फिर्ताको पुष्टि पठाइदिऊँ?","Yes, an email confirmation would be helpful.","हो, इमेलबाट पुष्टि पठाउनुभयो भने राम्रो।"]],"buy-phone":[["Would you like the total price including tax?","करसहित कुल मूल्य जान्ने?","Yes, please tell me the final price.","हो, कृपया अन्तिम मूल्य बताउनुहोस्।"],["Do you need time to think about it?","सोच्न केही समय चाहिन्छ?","Yes, I'd like to compare my options before buying.","हो, किन्नुअघि विकल्प तुलना गर्न चाहन्छु।"]],"directions":[["Would you like me to point out the building?","भवन देखाइदिऊँ?","Yes, could you point it out from here?","हो, यहीँबाट देखाइदिनुहुन्छ?"],["Do you think you can find it now?","अब ठाउँ भेट्न सक्नुहुन्छ?","Yes, your directions were very clear. Thank you!","हो, तपाईंले बाटो स्पष्ट बताउनुभयो। धन्यवाद!"]],"call-hospital":[["Would you like me to repeat your booking details?","तपाईंको बुकिङ विवरण दोहोर्‍याऊँ?","Yes, please confirm the date, time and doctor.","हो, मिति, समय र डाक्टर पुष्टि गर्नुहोस्।"],["Do you have any final questions for the clinic?","क्लिनिकका लागि अन्तिम प्रश्न छ?","Yes, where should I check in when I arrive?","हो, पुगेपछि कहाँ दर्ता गर्ने?"]],"hospital-checkin":[["Would you like an estimate of the wait?","कति समय पर्खनुपर्छ जान्ने?","Yes, how long is the wait today?","हो, आज कति समय पर्खनुपर्छ?"],["Is there anything else before you take a seat?","बस्नुअघि अरू केही चाहिन्छ?","No, thank you. I'll wait in the seating area.","होइन, धन्यवाद। म पर्खने ठाउँमा बस्छु।"]],"restaurant":[["Would you like to add a tip to your payment?","बिलसँग टिप थप्न चाहनुहुन्छ?","Yes, I'll add the tip when I pay.","हो, तिर्दा टिप थप्छु।"],["Would you like us to keep a table for next time?","अर्को पटक टेबल राखिदिऊँ?","Not today, thank you. We enjoyed the meal.","आज पर्दैन, धन्यवाद। खाना रमाइलो लाग्यो।"]],"groceries":[["Would you like your heavier items packed separately?","भारी सामान अलग राखिदिऊँ?","Yes, please put the rice in a separate bag.","हो, चामल अलग झोलामा राखिदिनुहोस्।"],["Are you ready to check out?","पैसा तिर्न तयार हुनुहुन्छ?","Yes, that's everything I need today.","हो, आजलाई चाहिने सबै यही हो।"]],"pharmacy":[["Would you like to confirm the pickup instructions?","औषधि कसरी लिने भन्ने जानकारी पुष्टि गर्ने?","Yes, please show me the instructions on the label.","हो, लेबलका निर्देशन देखाइदिनुहोस्।"],["Is there anything else you need from us?","हामीबाट अरू केही चाहिन्छ?","No, thank you. I'll follow up if I have a question.","होइन, धन्यवाद। प्रश्न भए फेरि सम्पर्क गर्छु।"]],"coffee":[["Would you like me to repeat your order?","अर्डर दोहोर्‍याऊँ?","Yes, one small hot drink and a pastry, please.","हो, एउटा सानो तातो पेय र पेस्ट्री।"],["Would you like to pay by cash or card?","नगद कि कार्डले तिर्नुहुन्छ?","I'll pay by card, thank you.","म कार्डबाट तिर्छु, धन्यवाद।"]],"interview":[["Would you like to ask about the next steps?","अर्को प्रक्रियाबारे सोध्न चाहनुहुन्छ?","Yes, when can I expect to hear back?","हो, जवाफ कहिलेसम्म आउने अपेक्षा गर्ने?"],["Is there anything else you want us to know?","हामीलाई अरू केही बताउन चाहनुहुन्छ?","I'm excited about the opportunity. Thank you for your time.","यो अवसरमा उत्साहित छु। समय दिनुभएकोमा धन्यवाद।"]],"work-shift":[["Is the remaining work documented?","बाँकी कामको विवरण लेखिएको छ?","Yes, I updated the handover notes.","हो, मैले सिफ्ट हस्तान्तरण नोट अपडेट गरेँ।"],["Can you let the next shift know?","अर्को सिफ्टलाई जानकारी दिनुहुन्छ?","Yes, I'll explain what still needs to be done.","हो, बाँकी कामबारे बताउँछु।"]],"take-bus":[["Is the next stop the one you need?","अर्को बिसौनीमा ओर्लनुपर्छ?","Yes, I think this is where I should get off.","हो, मलाई यहाँ ओर्लनुपर्छ जस्तो लाग्छ।"],["Would you like me to open the rear door?","पछाडिको ढोका खोलिदिऊँ?","Yes, thank you. Have a good day!","हो, धन्यवाद। तपाईंको दिन राम्रो होस्।"]],"hotel":[["Did you receive your room key?","कोठाको साँचो पाउनुभयो?","Yes, thank you. Could you remind me of the floor?","हो, धन्यवाद। तल्ला फेरि बताउनुहुन्छ?"],["Do you need anything else during your stay?","बसाइका बेला अरू केही चाहिन्छ?","Not right now. I'll call the front desk if needed.","अहिले चाहिँदैन। आवश्यक परे रिसेप्सनमा फोन गर्छु।"]],"airport":[["Would you like to confirm your departure gate?","उडानको गेट पुष्टि गर्ने?","Yes, could you check whether it has changed?","हो, फेरिएको छ कि जाँचिदिनुहुन्छ?"],["Do you need any more help before boarding?","बोर्डिङअघि अरू मद्दत चाहिन्छ?","No, thank you. I'll go through security now.","होइन, धन्यवाद। अब सुरक्षा जाँचमा जान्छु।"]],"bank":[["Would you like to know how to follow up?","फेरि सम्पर्क गर्ने तरिका जान्ने?","Yes, could I have a reference number?","हो, सन्दर्भ नम्बर पाउन सक्छु?"],["Is there anything else to review today?","आज अरू केही जाँच्ने?","No, thank you. That answers my questions.","होइन, धन्यवाद। मेरा प्रश्नको उत्तर पाएँ।"]],"phone-repair":[["Should we call you before starting the repair?","मर्मत सुरु गर्नुअघि फोन गर्ने?","Yes, I'd like to approve the price first.","हो, पहिले मूल्य स्वीकृत गर्न चाहन्छु।"],["Would you like a pickup notification?","फोन तयार भएपछि सूचना चाहिन्छ?","Yes, please message me when it's ready.","हो, तयार भए सन्देश पठाइदिनुहोस्।"]],"new-friend":[["Would you like to exchange contact details?","सम्पर्क विवरण साट्ने?","Yes, we could exchange numbers if you're comfortable.","तपाईंलाई ठीक लागे नम्बर साट्न सक्छौँ।"],["Should we plan something for next weekend?","अर्को सप्ताहन्त केही योजना बनाउने?","Sure, we could meet for a walk in the park.","पक्कै, पार्कमा हिँड्न भेट्न सक्छौँ।"]],"school-help":[["Do you feel more confident about this topic now?","अब यो विषयमा आत्मविश्वास बढ्यो?","Yes, I understand it better after practicing.","हो, अभ्यासपछि राम्ररी बुझेँ।"],["Would you like homework to practice?","अभ्यासका लागि गृहकार्य चाहिन्छ?","Yes, please give me a few sentences to write.","हो, लेख्न केही वाक्य दिनुहोस्।"]],"rent-home":[["Would you like to receive the application by email?","आवेदन इमेलमा चाहिन्छ?","Yes, please send me the application form.","हो, आवेदन फाराम इमेल गरिदिनुहोस्।"],["Do you have any other questions about the lease?","भाडाको सम्झौताबारे अरू प्रश्न छ?","Yes, when would I need to pay the deposit?","हो, धरौटी कहिले तिर्नुपर्छ?"]],"home-internet":[["Would you like to confirm an installation date?","जडान गर्ने मिति पुष्टि गर्ने?","Yes, next Saturday would be convenient.","हो, अर्को शनिबार मिल्छ।"],["Do you need a summary of the plan?","योजनाको सारांश चाहिन्छ?","Yes, please email the speed and price details.","हो, गति र मूल्यको विवरण इमेल गर्नुहोस्।"]],"delivery-help":[["Would you like a case reference number?","उजुरीको सन्दर्भ नम्बर चाहिन्छ?","Yes, please give me the reference number.","हो, सन्दर्भ नम्बर दिनुहोस्।"],["Would you like us to contact you with updates?","नयाँ जानकारी दिऊँ?","Yes, please update me when the issue is resolved.","हो, समस्या समाधान भएपछि जानकारी दिनुहोस्।"]],"dental-office":[["Would you like written aftercare instructions?","उपचारपछिका लिखित निर्देशन चाहिन्छ?","Yes, please explain what I should do at home.","हो, घरमा के गर्ने बुझाउनुहोस्।"],["Should we schedule a follow-up?","फेरि भेट्ने समय मिलाऊँ?","Yes, could we arrange a follow-up next week?","हो, अर्को हप्ताका लागि समय मिलाउन सक्छौँ?"]],"parent-meeting":[["Would you like a simple reading plan for home?","घरमा पढ्ने सरल योजना चाहिन्छ?","Yes, a short daily plan would help.","हो, दैनिक छोटो योजनाले मद्दत गर्छ।"],["Shall we check progress again next month?","अर्को महिना फेरि प्रगति जाँच्ने?","Yes, I'd like to see how the practice helps.","हो, अभ्यासले कति मद्दत गर्छ हेर्न चाहन्छु।"]],"shift-request":[["Would you like written confirmation of the change?","परिवर्तनको लिखित पुष्टि चाहिन्छ?","Yes, please send the updated schedule.","हो, नयाँ तालिका पठाइदिनुहोस्।"],["Can I count on you for the replacement shift?","सट्टाको सिफ्टमा आउनुहुन्छ?","Yes, I'll be there on time.","हो, म समयमा आउँछु।"]],"card-lost":[["Would you like a reference number for this report?","यो उजुरीको सन्दर्भ नम्बर चाहिन्छ?","Yes, please provide a case reference.","हो, उजुरीको सन्दर्भ नम्बर दिनुहोस्।"],["Should we notify you when the replacement ships?","नयाँ कार्ड पठाउँदा सूचना दिऊँ?","Yes, a shipping notification would help.","हो, पठाएको सूचना उपयोगी हुन्छ।"]],"send-mail":[["Would you like a tracking receipt?","ट्र्याकिङ रसिद चाहिन्छ?","Yes, please include the tracking number.","हो, ट्र्याकिङ नम्बर समावेश गर्नुहोस्।"],["Is there anything else about this shipment?","यो सामान पठाउनेबारे अरू प्रश्न छ?","Yes, how can I check delivery progress online?","हो, अनलाइन डेलिभरी प्रगति कसरी हेर्ने?"]],"car-repair":[["Would you like a written repair estimate?","मर्मत खर्चको लिखित अनुमान चाहिन्छ?","Yes, please send the estimate before starting.","हो, काम सुरु गर्नुअघि अनुमान पठाउनुहोस्।"],["Should we contact you when the car is ready?","गाडी तयार भएपछि सम्पर्क गर्ने?","Yes, please call me before I come to collect it.","हो, लिन आउनुअघि फोन गर्नुहोस्।"]],"library":[["Would you like me to show you how renewals work?","किताब नवीकरण गर्ने तरिका देखाऊँ?","Yes, could you show me how to renew online?","हो, अनलाइन नवीकरण कसरी गर्ने देखाउनुहुन्छ?"],["Do you need any other book recommendations?","अरू किताबको सुझाव चाहिन्छ?","Not today, thanks. I'll start with these two.","आज पर्दैन, धन्यवाद। यी दुईबाट सुरु गर्छु।"]]};
const coachPracticeSkills=[
 [
 ["Could you explain that a little more?","अलि थप बुझाइदिनुहुन्छ?","Of course. Let me explain more clearly.","अवश्य, अझ स्पष्ट रूपमा बुझाउँछु।"],
 ["Could you repeat the last part?","अन्तिम कुरा फेरि भन्नुहुन्छ?","Certainly. I'll repeat it more slowly.","पक्कै, अझ बिस्तारै दोहोर्‍याउँछु।"],
 ["Can you put that another way?","अर्को तरिकाले भन्नुहुन्छ?","Yes, let me say it differently.","हो, अर्को तरिकाले भन्छु।"],
 ["Can you clarify what you meant?","तपाईंको अर्थ स्पष्ट पार्नुहुन्छ?","Sure, I'll explain the main point again.","हुन्छ, मुख्य कुरा फेरि बुझाउँछु।"],
 ["Would it help to take this step by step?","चरणबद्ध बुझ्दा सजिलो हुन्छ?","Yes, step by step would be helpful.","हो, चरणबद्ध भए सजिलो हुन्छ।"],
 ["Do you need another example?","अर्को उदाहरण चाहिन्छ?","Yes, one more example would help.","हो, अर्को उदाहरणले मद्दत गर्छ।"],
 ["Can I give you a moment to think?","सोच्न केही समय दिऊँ?","Yes, please give me a moment.","हो, अलिकति समय दिनुहोस्।"]
 ],
 [
 ["Would you like to ask another question?","अर्को प्रश्न सोध्नुहुन्छ?","Yes, what happens next?","हो, अब के हुन्छ?"],
 ["Do you want to know more before deciding?","निर्णयअघि थप जान्ने?","Yes, I'd like to understand the options.","हो, विकल्प बुझ्न चाहन्छु।"],
 ["Is there anything you'd like me to explain?","केही बुझाइदिऊँ?","Could you explain the main detail?","मुख्य विवरण बुझाइदिनुहुन्छ?"],
 ["Would you like to see an example?","उदाहरण हेर्ने?","Yes, could you show me one?","हो, एउटा देखाइदिनुहुन्छ?"],
 ["Do you want to know the next step?","अर्को चरण जान्ने?","Yes, what should I do after this?","हो, यसपछि के गर्नुपर्छ?"],
 ["Do you have another question?","अरू प्रश्न छ?","Yes, when should I follow up?","हो, कहिले फेरि सम्पर्क गर्ने?"],
 ["Would written details be useful?","लिखित विवरण उपयोगी हुन्छ?","Yes, a short written summary would help.","हो, छोटो लिखित सारांशले मद्दत गर्छ।"]
 ],
 [
 ["Does that sound right to you?","त्यो ठीक लाग्यो?","Yes, that matches what I understood.","हो, मैले बुझेकोसँग मिल्छ।"],
 ["Should we confirm the details?","विवरण पुष्टि गर्ने?","Yes, let's check once more.","हो, फेरि एकपटक जाँचौँ।"],
 ["Are you happy with that plan?","त्यो योजना ठीक छ?","Yes, that plan works for me.","हो, त्यो योजना मलाई मिल्छ।"],
 ["Would you like to change anything?","केही परिवर्तन गर्ने?","I'd like to make one small change.","म एउटा सानो परिवर्तन गर्न चाहन्छु।"],
 ["Should I write that down?","त्यो लेखेर राखूँ?","Yes, please write down the details.","हो, विवरण लेखिदिनुहोस्।"],
 ["Are we on the same page now?","अब हामीले एउटै कुरा बुझेका छौँ?","Yes, I think we understand each other.","हो, एकअर्कालाई बुझेका छौँ।"],
 ["Should I double-check this?","फेरि जाँच गरूँ?","Yes, I'd appreciate a quick check.","हो, छिटो जाँचिदिनुभयो भने राम्रो हुन्छ।"]
 ],
 [
 ["Can I help you with anything else?","अरू मद्दत चाहिन्छ?","No, thank you. You've been helpful.","होइन, धन्यवाद। तपाईंले मद्दत गर्नुभयो।"],
 ["Would you like to follow up tomorrow?","भोलि फेरि सम्पर्क गर्ने?","Yes, tomorrow would be convenient.","हो, भोलि सजिलो हुन्छ।"],
 ["Do you have everything you need?","चाहिने सबै पाउनुभयो?","Yes, I have what I need. Thanks!","हो, चाहिएको पाएँ। धन्यवाद।"],
 ["Would an email update help?","इमेलमा जानकारी उपयोगी हुन्छ?","Yes, an email update would be great.","हो, इमेलमा जानकारी पाए राम्रो हुन्छ।"],
 ["When should I contact you again?","फेरि कहिले सम्पर्क गर्ने?","Tomorrow afternoon would be best.","भोलि दिउँसो उत्तम हुन्छ।"],
 ["Do you need to confirm anything else?","अरू केही पुष्टि गर्नुपर्छ?","No, I know what to do next.","होइन, अब के गर्ने थाहा छ।"],
 ["Any final questions before we finish?","अन्तिम प्रश्न छ?","No more questions. Have a good day!","अब प्रश्न छैन। तपाईंको दिन राम्रो होस्।"]
 ]
];
function coachDepthStep(row,seed){
 const [npc,npcNe,answer,answerNe]=row;
 const words=answer.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/)
  .filter(w=>w.length>=4&&!['would','could','please','have','that','this','with','your','from','what','when','want','like','them','more','first','very'].includes(w));
 const keyword=words.slice(0,2).join(' ');
 const k=seed%coachDistractors.length;
 return {npc,npcNe,goal:'प्रश्न सुनेर अंग्रेजीमा आफ्नै उत्तर दिनुहोस्।',
  answer,answerNe,accept:[answer,...(keyword?[keyword]:[])],
  bad1:coachDistractors[k],bad2:coachDistractors[(k+7)%coachDistractors.length],
  hint:'Respond with a complete, natural sentence. A polite follow-up is useful.',
  after:'Thank you for explaining.'};
}
function coachExtendedSteps(scene,round,practiceNumber){
 const rounds=[scene.steps,...(coachRoundsById[scene.id]||[])];
 const scripted=rounds[round].map(x=>({...x}));
 const natural=coachNaturalDialogues[scene.id]||[];
 const related=(coachDepthPairs[scene.id]||[]).slice(round*2,round*2+2);
 const ending=coachSceneConclusions[scene.id]||[];
 let salt=0;for(const ch of scene.id)salt=(salt*31+ch.charCodeAt(0))%9973;
 const asSteps=(rows,offset=0)=>rows.map((row,i)=>coachDepthStep(row,salt+round*20+offset+i));
 const early=asSteps(natural.slice(0,2)),mid=asSteps(natural.slice(2,4),10),
  late=asSteps(natural.slice(4,6),20),detail=asSteps(related,30),
  finish=asSteps(ending,40);
 // Keep story chronology. Begin with the scene's original opening, then
 // establish the situation, resolve the details, and finish the transaction.
 // Short alternate scripts sometimes start mid-transaction: provide context
 // first in customer-facing shopping / hospitality situations.
 const contextFirst=round!==0&&['restaurant','coffee','hotel','groceries','rent-home','send-mail'].includes(scene.id);
 let all=[];
 if(scene.id==='restaurant'){
  // Seat -> drink -> special -> order -> meal -> bill -> payment.
  if(round===0){
   all=[scripted[0],early[0],early[1],detail[0],mid[0],
    scripted[1],scripted[2],detail[1],mid[1],late[0],scripted[3],late[1],...finish];
  }else{
   all=[early[0],early[1],detail[0],mid[0],scripted[0],scripted[1],
    detail[1],mid[1],late[0],late[1],...finish];
  }
 }else if(scene.id==='return-shirt'){
  // Refund vs exchange vs no receipt are DIFFERENT paths; don't switch
  // outcomes halfway through a return conversation.
  if(round===0)all=[scripted[0],early[0],early[1],scripted[1],
   scripted[2],scripted[3],mid[0],detail[0],mid[1],detail[1],
   late[0],late[1],...finish];
  else if(round===1){
   const exchangeFinish=asSteps([
    ['Would you like me to reserve the larger size?','ठूलो साइज छुट्याएर राखिदिऊँ?','Yes, please hold it while I try it on.','हो, लगाएर नहेर्दासम्म राखिदिनुहोस्।'],
    ['Would you like a receipt for the exchange?','साटेको रसिद चाहिन्छ?','Yes, please give me a copy. Thank you!','हो, एउटा प्रति दिनुहोस्। धन्यवाद!']
   ],50);
   all=[scripted[0],early[1],scripted[1],detail[0],detail[1],
     mid[1],early[0],mid[0],late[0],late[1],...exchangeFinish];
  }else all=[scripted[0],scripted[1],early[1],early[0],detail[0],
    detail[1],mid[0],mid[1],late[0],late[1],...finish];
 }else if(scene.id==='phone-repair'&&round===0){
  all=[scripted[0],early[0],early[1],scripted[1],mid[0],
   detail[0],mid[1],scripted[2],detail[1],late[0],late[1],...finish];
 }else if(scene.id==='bank'&&round===0){
  all=[scripted[0],early[0],early[1],detail[0],scripted[1],mid[0],
   mid[1],detail[1],late[0],late[1],finish[0],scripted[2]];
 }else {
 if(contextFirst)all.push(...early);
 if(scripted[0])all.push(scripted[0]);
 if(!contextFirst)all.push(...early);
 all.push(detail[0]);
 if(scripted.length>2)all.push(...scripted.slice(1,-1));
 all.push(...mid,detail[1],...late);
 if(scripted.length>1)all.push(scripted[scripted.length-1]);
 all.push(...finish);
 }
 // Ensure enough practice to be a real two-sided exchange, without generic
 // unrelated filler. A long scene is usually 12-14 learner turns.
 for(let i=0;i<all.length-1;i++)all[i].after=all[i+1].npc;
 if(all.length)all[all.length-1].after='Thank you! Have a wonderful day.';
 return all.filter(Boolean);
}

// U.S. Visa Interview Study Hub · English Sikau
// Guided English practice only. No eligibility predictions, legal advice or verified XP.
// Government URLs below link to the live official pages rather than claiming to auto-sync policy.
const visaCategories=[{"id":"dv","icon":"🎟️","title":"DV Lottery","ne":"डीभी लटरी","code":"DV","desc":"Eligibility, finances and life plans","source":"https://travel.state.gov/content/travel/en/us-visas/immigrate/diversity-visa-program-entry/diversity-visa-interview/diversity-visa-applicant-interview.html"},{"id":"student","icon":"🎓","title":"Student Visa","ne":"विद्यार्थी भिसा","code":"F-1 / M-1","desc":"Study plan, tuition and intent","source":"https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html"},{"id":"tourist","icon":"🧳","title":"Tourist Visa","ne":"पर्यटक भिसा","code":"B-1 / B-2","desc":"Trip purpose, finances and return","source":"https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html"},{"id":"spouse","icon":"💍","title":"Spouse Visa","ne":"पति-पत्नी भिसा","code":"IR1 / CR1","desc":"Marriage, timeline and support","source":"https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration/immigrant-visa-for-a-spouse-or-fiance-of-a-us-citizen.html"},{"id":"fiance","icon":"💗","title":"Fiancé(e) Visa","ne":"मंगेतर भिसा","code":"K-1","desc":"Engagement, intent to marry and plans","source":"https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration/nonimmigrant-visa-for-a-fiance-k-1.html"},{"id":"hard","icon":"🛡️","title":"Difficult Questions","ne":"गाह्रा प्रश्नहरू","code":"Public charge + gaps","desc":"Financial support, uncertainty and refusals","source":"https://travel.state.gov/en/newsroom/visas/2026/preventing-public-benefits-reliance.html"}];
const visaQuestions={"dv":[{"id":"dv-1","q":"Why do you want to immigrate to the United States?","ne":"तपाईं अमेरिका किन बसाइँ सर्न चाहनुहुन्छ?","coach":"Explain your genuine plans for life and work, without promising a particular job.","sample":"I hope to build a stable life in the United States. My plan is to [your true plan], and I understand I must be prepared for living expenses.","caution":"No visa can be guaranteed by a polished answer."},{"id":"dv-2","q":"How did you qualify for the Diversity Visa program?","ne":"तपाईं डीभी कार्यक्रमका लागि कसरी योग्य हुनुभयो?","coach":"Explain your actual qualifying education or work experience; the principal applicant must meet DV criteria.","sample":"I qualify through [my actual qualifying education or work experience]. I can provide the supporting documents.","caution":"Do not say that any job qualifies; official DV work criteria are specific."},{"id":"dv-3","q":"What is your highest level of education?","ne":"तपाईंको उच्चतम शिक्षा के हो?","coach":"Give the true degree or grade completed, dates if known and documents.","sample":"My highest completed education is [accurate qualification] from [school], completed in [year].","caution":"Do not claim a degree that is still in progress as completed."},{"id":"dv-4","q":"What have you done for work in Nepal?","ne":"नेपालमा तपाईंले के काम गर्नुभएको छ?","coach":"Describe paid, unpaid, informal, or no work honestly, and explain the dates.","sample":"In Nepal, I [describe genuine work or state that I was not employed] during [accurate period].","caution":"A truthful employment gap is preferable to invented work."},{"id":"dv-5","q":"How do you plan to support yourself initially?","ne":"अमेरिकामा सुरुमा खर्च कसरी चलाउनुहुन्छ?","coach":"Name actual verified savings, family arrangements or practical resources.","sample":"For my initial expenses, I plan to rely on [real savings or documented support]. My estimated budget is [truthful amount if known].","caution":"Only mention support that really exists."},{"id":"dv-6","q":"Where will you stay when you first arrive?","ne":"अमेरिका पुग्दा सुरुमा कहाँ बस्नुहुन्छ?","coach":"Describe the actual lodging plan, or acknowledge uncertainty and the plan to confirm it.","sample":"I plan to stay at [actual address or type of accommodation] initially. I will confirm the final arrangements before traveling.","caution":"Never invent a host or address."},{"id":"dv-7","q":"Do you have relatives or friends in the United States?","ne":"अमेरिकामा तपाईंका आफन्त वा साथी छन्?","coach":"Answer yes or no honestly and describe relationships if relevant.","sample":"[Yes, I have a relative/friend in the United States, or No, I do not.] [Give accurate detail if needed].","caution":"Do not conceal relatives or invent relationships."},{"id":"dv-8","q":"What kind of work might you seek after arriving?","ne":"पुगेपछि कस्तो काम खोज्न सक्नुहुन्छ?","coach":"Describe realistic skills and employment plans without a guaranteed job claim.","sample":"Once I am permitted to work, I would like to seek work in [field matching my actual skills]. I understand finding work may take time.","caution":"An immigrant's work plans do not replace evidence of resources."},{"id":"dv-9","q":"What savings or confirmed assistance will cover your expenses while you look for work?","ne":"काम खोजिरहँदा खर्च धान्न कति बचत वा निश्चित सहयोग छ?","coach":"Describe actual available funds, their sources and realistic living costs.","sample":"For my initial expenses I have [actual savings or genuine support] while I explore legal job opportunities.","caution":"Give the accurate facts in your DS-260 and original DV entry. Refer only to authentic documents."},{"id":"dv-10","q":"Which U.S. city or state do you plan to settle in, and why?","ne":"अमेरिकाको कुन सहर वा राज्यमा बस्ने योजना छ र किन?","coach":"Give the actual destination and reasons; do not make up an address.","sample":"My initial plan is to settle in [real city/state] because [true reasons].","caution":"Give the accurate facts in your DS-260 and original DV entry. Refer only to authentic documents."},{"id":"dv-11","q":"Have you ever applied for a U.S. visa before?","ne":"पहिले अमेरिकी भिसा आवेदन गर्नुभएको छ?","coach":"Give accurate prior applications and outcomes, including refusals if asked.","sample":"[Yes/No.] [If yes, explain the correct year, visa category, and outcome.]","caution":"Do not hide a prior refusal."},{"id":"dv-12","q":"Is the information in your DS-260 accurate?","ne":"तपाईंको DS-260 मा भएका जानकारी सही छन्?","coach":"State whether it is accurate; explain errors openly and how to correct them.","sample":"To the best of my knowledge, the information is accurate. I would like to clarify [any actual error, if applicable].","caution":"Never falsely certify inaccurate information."},{"id":"dv-13","q":"What schools did you attend, and when did you complete the qualifying education?","ne":"तपाईंले कुन विद्यालय पढ्नुभयो र आवश्यक शिक्षा कहिले पूरा गर्नुभयो?","coach":"Explain actual school names, graduation dates and records supporting DV qualification.","sample":"I attended [real school] and completed [genuine course or qualification] in [year].","caution":"Give the accurate facts in your DS-260 and original DV entry. Refer only to authentic documents."},{"id":"dv-14","q":"What marital status and children did you list on your original DV entry?","ne":"सुरुको डीभी फाराममा वैवाहिक अवस्था र सन्तानको विवरण के लेख्नुभयो?","coach":"Describe what was actually disclosed at the time of original DV entry. Spouse/child omission can be serious.","sample":"On my original entry, I listed [the accurate marital status and eligible children].","caution":"Give the accurate facts in your DS-260 and original DV entry. Refer only to authentic documents."},{"id":"dv-15","q":"How will you afford housing and food during your first months?","ne":"पहिलो केही महिनाको घरभाडा र खानाको खर्च कसरी चलाउनुहुन्छ?","coach":"Discuss actual housing arrangements and documented available resources.","sample":"I expect to budget [genuine estimate] for housing and food and use [real available funds or confirmed support].","caution":"Do not list family property as your asset unless you actually own or control it."},{"id":"dv-16","q":"What original education or qualifying-work documents can you present?","ne":"योग्य शिक्षा वा कामको अनुभव प्रमाणित गर्ने कुन सक्कली कागजात छन्?","coach":"Know the authentic certificates or evidence of qualifying work; do not present unsupported equivalents.","sample":"I can provide [actual certificate/transcripts or qualifying employment records].","caution":"Give the accurate facts in your DS-260 and original DV entry. Refer only to authentic documents."},{"id":"dv-17","q":"Has your marital status or family information changed since your DV entry?","ne":"डीभी फाराम भरेपछि विवाह वा पारिवारिक विवरण परिवर्तन भएको छ?","coach":"Explain actual marriage, birth, divorce or other changes with real dates and documents.","sample":"Since the entry, [there has been no change / accurately describe the change and supporting records].","caution":"Give the accurate facts in your DS-260 and original DV entry. Refer only to authentic documents."},{"id":"dv-18","q":"Have you ever lived in or visited the United States before?","ne":"के तपाईं पहिले अमेरिका बस्नुभएको वा भ्रमण गर्नुभएको थियो?","coach":"Describe accurate travel, immigration and visa history.","sample":"[Yes/No.] [If yes, give accurate travel and visa information].","caution":"Give the accurate facts in your DS-260 and original DV entry. Refer only to authentic documents."},{"id":"dv-19","q":"What U.S. address or city do you expect to live in after arriving?","ne":"अमेरिका पुगेपछि कुन ठेगाना वा सहरमा बस्ने योजना छ?","coach":"Give the actual address if secured; otherwise identify your real planned area.","sample":"I expect to live in [actual address or area], based on [real housing arrangements].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"housing"},{"id":"dv-20","q":"If you do not yet have housing, how will you find a suitable home?","ne":"घर तय नभएको भए तपाईं कसरी बस्ने ठाउँ खोज्नुहुन्छ?","coach":"Discuss verified budget, rental searches and any real temporary accommodation.","sample":"I plan to [actual housing search steps] using [real budget or arrangements].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"housing"},{"id":"dv-21","q":"Who will live in your household when you arrive in the United States?","ne":"अमेरिका पुगेपछि तपाईंको घरमा को-को बस्नुहुन्छ?","coach":"State genuine household members and whether costs will actually be shared.","sample":"I expect to live with [actual household members], and [truthful cost arrangement].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"housing"},{"id":"dv-22","q":"What type of work do you hope to pursue after immigrating?","ne":"बसाइँ सरेपछि कस्तो काम गर्ने योजना छ?","coach":"Describe a realistic field based on skills, not a promised job.","sample":"I hope to pursue [realistic field] based on [my actual experience].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"employment"},{"id":"dv-23","q":"What education, training or employment experience prepares you for that work?","ne":"त्यो कामका लागि तपाईंको शिक्षा, तालिम वा अनुभव के छ?","coach":"Refer to genuine completed education, certificates and prior jobs.","sample":"My background includes [real education, training or experience].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"employment"},{"id":"dv-24","q":"Will that work require any U.S. license, certificate or additional training?","ne":"त्यो काम गर्न अमेरिकामा थप इजाजत, प्रमाणपत्र वा तालिम चाहिन्छ?","coach":"Say what you have verified and how costs are covered during training.","sample":"I have researched [actual requirements]; during any training I would rely on [genuine resources].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"employment"},{"id":"dv-25","q":"Have you started researching or applying for jobs in the United States?","ne":"अमेरिकामा काम खोज्ने अनुसन्धान वा आवेदन सुरु गर्नुभएको छ?","coach":"Describe real online research, contacts or applications without inventing offers.","sample":"So far I have [real job-search activities, or I have not started].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"employment"},{"id":"dv-26","q":"What is a realistic estimate of earnings in your first year of employment?","ne":"पहिलो वर्ष काम गर्दा अनुमानित तलब कति हुन सक्छ?","coach":"If unknown, make clear it is an estimate based on researched jobs, not guaranteed income.","sample":"Based on [actual research], my estimate is [reasonable amount], but no job is guaranteed.","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"employment"},{"id":"dv-27","q":"Will any existing health insurance cover you or your family after arrival?","ne":"अमेरिका पुगेपछि अहिलेको कुनै स्वास्थ्य बीमाले तपाईं वा परिवारलाई समेट्छ?","coach":"Verify the coverage area, start date, eligibility and actual household members.","sample":"[Yes/No/Not yet confirmed.] The available coverage is [verified details].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"insurance"},{"id":"dv-28","q":"Could you be added to a family member's U.S. health insurance plan?","ne":"परिवारको सदस्यको अमेरिकी स्वास्थ्य बीमामा तपाईंलाई थप्न मिल्छ?","coach":"State whether the plan administrator confirmed eligibility, not just an assumption.","sample":"We have [confirmed or not yet confirmed] whether [actual plan] would cover me.","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"insurance"},{"id":"dv-29","q":"If you must buy health insurance, what coverage and monthly premium have you researched?","ne":"आफैं बीमा लिनुपरेमा कस्तो योजना र मासिक शुल्क खोज्नुभएको छ?","coach":"Distinguish a verified quote from a rough estimate; do not invent a policy.","sample":"I have researched [real insurance options], with an estimated premium of [genuine quote if available].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"insurance"},{"id":"dv-30","q":"What resources will pay for living and medical expenses while you get settled?","ne":"सुरुमा बसाइँ र स्वास्थ्य खर्च कुन वास्तविक स्रोतबाट तिर्नुहुन्छ?","coach":"Explain available funds and support without treating a future salary as current money.","sample":"Initial costs would be covered by [real savings or verified available support].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"insurance"}],"student":[{"id":"student-1","q":"Why did you choose this U.S. university?","ne":"तपाईंले यो अमेरिकी विश्वविद्यालय किन रोज्नुभयो?","coach":"Connect the actual program to academic goals and specific verified university features.","sample":"I chose [actual school] for its [accurate program feature], which aligns with my goal to study [subject].","caution":"Do not invent rankings or research projects."},{"id":"student-2","q":"Why do you want to study this subject?","ne":"यो विषय किन पढ्न चाहनुहुन्छ?","coach":"Describe authentic academic interest and what you will learn.","sample":"I want to study [actual major] because [real reason], and I hope to develop skills in [relevant field].","caution":"Use facts consistent with your I-20 and application."},{"id":"student-3","q":"Who will pay for your education?","ne":"तपाईंको पढाइको खर्च कसले बेहोर्छ?","coach":"Identify real funding and ensure the plan matches actual financial records.","sample":"My tuition and living expenses will be covered by [true funding source], as supported by [relevant documentation].","caution":"Do not invent family income or scholarships."},{"id":"student-4","q":"How much will your education and living costs be?","ne":"पढाइ र बसाइको कति खर्च लाग्छ?","coach":"Know figures shown by the institution and your actual budget.","sample":"According to my documents, the estimated annual cost is [accurate amount]. My funding plan covers [details].","caution":"Verify numbers in your current I-20 and supporting papers."},{"id":"student-5","q":"Why are you studying in the United States rather than Nepal?","ne":"नेपालभन्दा अमेरिका किन पढ्न चाहनुहुन्छ?","coach":"Make a truthful academic comparison without disparaging Nepal.","sample":"This U.S. program offers [specific authentic academic feature] that fits my learning goals.","caution":"Avoid claiming a program is unavailable in Nepal without evidence."},{"id":"student-6","q":"When does your program start, and what degree or course will you pursue?","ne":"तपाईंको पढाइ कहिले सुरु हुन्छ र कुन डिग्री वा कोर्स पढ्नुहुन्छ?","coach":"Check program name, campus and start date on the current I-20.","sample":"My I-20 lists [actual program], at [actual school], beginning [true start date].","caution":"Use the actual I-20, school records and truthful academic and financial plans."},{"id":"student-7","q":"What will you do after completing your studies?","ne":"पढाइ सकेपछि के गर्ने योजना छ?","coach":"Describe genuine plans and comply with the conditions of your status.","sample":"After graduation, I plan to [truthful plan]. I understand I must follow the terms of my student status and any authorized options.","caution":"Do not claim that F-1 permits unrestricted U.S. work."},{"id":"student-8","q":"Do you have family in the United States?","ne":"अमेरिकामा तपाईंको परिवार छ?","coach":"Answer based on your real relationships, accurately and completely.","sample":"[Yes/No.] [If applicable, explain the genuine relationship and location.]","caution":"Family in the United States should not be falsely concealed."},{"id":"student-9","q":"Which subjects or courses will you study during your first year?","ne":"पहिलो वर्ष कुन विषय वा पाठ्यक्रम पढ्ने योजना छ?","coach":"Know the actual curriculum of the program that accepted you.","sample":"My program includes [genuine courses listed by my school], which connect to [real study goal].","caution":"Use the actual I-20, school records and truthful academic and financial plans."},{"id":"student-10","q":"What have you done since your last degree?","ne":"पछिल्लो पढाइपछि के गरिरहनुभएको छ?","coach":"Account for actual studies, work, family duties or time away without fake experience.","sample":"Since [date], I have [truthfully describe activities], which helped me prepare for [goal].","caution":"A gap is not a reason to fabricate employment."},{"id":"student-11","q":"Which school issued your Form I-20, and what program is shown on it?","ne":"तपाईंको I-20 कुन विद्यालयले जारी गरेको हो र त्यसमा कुन कार्यक्रम छ?","coach":"Use the issued I-20 rather than a memorized definition of the form.","sample":"My Form I-20 was issued by [school] for [program].","caution":"Use the actual I-20, school records and truthful academic and financial plans."},{"id":"student-12","q":"How is your new program connected to your previous education or work?","ne":"नयाँ कोर्स तपाईंको अघिल्लो पढाइ वा कामसँग कसरी सम्बन्धित छ?","coach":"Explain the real academic progression, even if changing fields.","sample":"My previous [study/work] involved [real background], and this program will help me learn [real skills].","caution":"Use the actual I-20, school records and truthful academic and financial plans."},{"id":"student-13","q":"How will you finance the full length of your study program?","ne":"पूरै पढाइ अवधिको शुल्क र खर्च कसरी धान्नुहुन्छ?","coach":"Explain verified multi-year tuition, living costs, scholarship and family resources.","sample":"My plan for [true course duration] is based on [genuine financial resources and documented support].","caution":"Use the actual I-20, school records and truthful academic and financial plans."},{"id":"student-14","q":"Why does your academic record show a break or low grades?","ne":"तपाईंको पढाइमा अन्तर वा कम अंक किन छन्?","coach":"Acknowledge the real reasons and describe improvement if supported by facts.","sample":"My academic record reflects [accurate explanation]. I have since prepared by [true steps].","caution":"Do not falsify transcripts or invent certificates."},{"id":"student-15","q":"How have you prepared for classes taught in English?","ne":"अंग्रेजीमा पढाइ हुने कक्षाका लागि कसरी तयारी गर्नुभएको छ?","coach":"Mention real English study, test scores and university support if applicable.","sample":"I have prepared through [real English practice or accepted test], and I will use [actual school resources].","caution":"Use the actual I-20, school records and truthful academic and financial plans."},{"id":"student-16","q":"Why did you change your intended major?","ne":"तपाईंले पढ्ने विषय किन परिवर्तन गर्नुभयो?","coach":"Explain an authentic change of interest backed by your application.","sample":"I changed from [actual previous field] to [current program] because [genuine academic reason].","caution":"Your explanation should match your submitted records."},{"id":"student-17","q":"What do your parents or sponsors do for a living?","ne":"तपाईंको खर्च गर्ने आमाबुबा वा सहयोगकर्ताले के काम गर्नुहुन्छ?","coach":"Give accurate occupations and financially relevant records.","sample":"My [actual sponsor relationship] works as [accurate role], and the financial documents reflect [actual information].","caution":"Do not create businesses or employment to satisfy an interviewer."},{"id":"student-18","q":"What are your plans in Nepal after completing the program?","ne":"पढाइ सकेपछि नेपालमा के गर्ने योजना छ?","coach":"Explain genuine plans and relevant ties, respecting student-visa conditions.","sample":"After my studies I plan to [true education/career/family plans], following the rules of my visa.","caution":"Use the actual I-20, school records and truthful academic and financial plans."},{"id":"student-19","q":"What is the exact start date and expected end date of your program?","ne":"तपाईंको कोर्स सुरु र सकिने मिति कहिले हो?","coach":"Use your genuine current I-20 and degree timetable.","sample":"My program begins on [actual date] and is expected to end [documented date].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"student-20","q":"How did you meet the admissions requirements for this program?","ne":"तपाईंले यो कोर्समा भर्नाका शर्त कसरी पूरा गर्नुभयो?","coach":"Discuss real academic records, English requirements and application details.","sample":"I qualified through [real grades, prerequisites and test results].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"student-21","q":"Did you apply to other colleges, and why did you select this offer?","ne":"अरू कलेजमा आवेदन दिनुभयो? यो कलेज किन रोज्नुभयो?","coach":"Mention only applications actually submitted and genuine reasons for this choice.","sample":"I applied to [truthful schools if any] and selected [school] because [real reasons].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"student-22","q":"What scholarship or financial aid have you actually been awarded?","ne":"तपाईंले वास्तवमै कस्तो छात्रवृत्ति वा आर्थिक सहयोग पाउनुभएको छ?","coach":"Distinguish awarded funding from applications and expectations.","sample":"I have been awarded [verified scholarship], or I currently have no scholarship.","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"student-23","q":"What is the source of the money shown in your sponsor's bank account?","ne":"प्रायोजकको खाताको रकम कहाँबाट आएको हो?","coach":"Know factual salary, business income or documented savings sources.","sample":"Those funds come from [true verifiable sources] and belong to [real owner].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"student-24","q":"How much have you already paid toward tuition or university fees?","ne":"पढाइको शुल्कमध्ये अहिलेसम्म कति तिरिसक्नुभएको छ?","coach":"Check authentic receipts and do not confuse deposits with full tuition.","sample":"I have paid [real amount], as shown by [actual receipt if any].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"student-25","q":"Where will you live during your first semester?","ne":"पहिलो सेमेस्टरमा तपाईं कहाँ बस्नुहुन्छ?","coach":"Describe confirmed dormitory, rental or temporary arrangements and budget.","sample":"I plan to stay [actual housing option], with [accurate cost if known].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"student-26","q":"Who is your financial sponsor, and how are you related?","ne":"तपाईंको आर्थिक प्रायोजक को हुन् र तपाईंको के नाता हो?","coach":"Explain true relationship and available lawful resources.","sample":"My sponsor is [real person] who is my [actual relationship].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"student-27","q":"How many semesters or years will your program take?","ne":"तपाईंको कोर्स कति सेमेस्टर वा वर्षको हुन्छ?","coach":"Know credit or course length from school documents.","sample":"The program normally lasts [actual number] semesters or years.","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"student-28","q":"What research, laboratory work or practical training does your course include?","ne":"तपाईंको कोर्समा कुन अनुसन्धान वा प्रयोगात्मक अभ्यास पर्छ?","coach":"Mention verified curriculum only, not invented internships or research.","sample":"The published program includes [actual courses or projects].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"student-29","q":"How does this U.S. qualification fit your career opportunities in Nepal?","ne":"अमेरिकाको पढाइ नेपालमा तपाईंको भविष्यको कामसँग कसरी मिल्छ?","coach":"Connect real Nepali employment or education plans with the degree.","sample":"I hope to apply these skills in [actual career direction] in Nepal.","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"student-30","q":"What will you do if your school's tuition or living costs increase?","ne":"कलेज शुल्क वा खर्च बढेमा के गर्नुहुन्छ?","coach":"Describe genuinely available reserves and contact with the international student office.","sample":"My funding plan includes [actual resources], and I would discuss changes with [real school contact].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."}],"tourist":[{"id":"tourist-1","q":"What is the purpose of your trip?","ne":"तपाईंको अमेरिका भ्रमणको उद्देश्य के हो?","coach":"Give the actual temporary purpose, such as tourism or visiting family.","sample":"I am planning a temporary visit to [real place] for [genuine purpose].","caution":"A visitor visa is not for taking U.S. employment."},{"id":"tourist-2","q":"How long do you intend to stay?","ne":"कति समय बस्ने योजना छ?","coach":"Give realistic dates and length consistent with your plans.","sample":"I intend to stay for about [truthful duration] and return on [planned date if known].","caution":"Do not provide invented tickets or dates."},{"id":"tourist-3","q":"Where will you stay in the United States?","ne":"अमेरिकामा कहाँ बस्नुहुन्छ?","coach":"Describe genuine accommodations or relative's home if confirmed.","sample":"I expect to stay at [actual hotel or host arrangement] in [city].","caution":"Do not invent an address."},{"id":"tourist-4","q":"Who will pay for your visit?","ne":"भ्रमण खर्च कसले बेहोर्छ?","coach":"Explain your actual savings, income or genuine third-party payment.","sample":"I will pay with [real source of funds], and my estimated expenses are [true estimate].","caution":"Visitor applications may require evidence of ability to cover trip costs."},{"id":"tourist-5","q":"What do you do in Nepal?","ne":"नेपालमा तपाईं के गर्नुहुन्छ?","coach":"Describe actual work, study, caregiving or circumstances.","sample":"In Nepal, I [accurate occupation, education or family role].","caution":"Never claim a job you do not have."},{"id":"tourist-6","q":"Why will you return to Nepal?","ne":"तपाईं नेपाल किन फर्किनुहुन्छ?","coach":"Describe genuine responsibilities and plans, not invented property or employment.","sample":"I plan to return because [truthful commitments and plans in Nepal].","caution":"Do not promise evidence of ties that does not exist."},{"id":"tourist-7","q":"Do you have relatives in the United States?","ne":"अमेरिकामा आफन्त छन्?","coach":"Answer honestly with the exact relationship if relevant.","sample":"[Yes/No.] [If yes, explain your real relationship and visit plans.]","caution":"Avoid concealing U.S. relatives."},{"id":"tourist-8","q":"Have you traveled outside Nepal before?","ne":"पहिले नेपालबाहिर जानुभएको छ?","coach":"State your actual travel history.","sample":"[Yes/No.] [If yes, mention accurate destinations and dates.]","caution":"No international travel history should not be falsely presented as extensive travel."},{"id":"tourist-9","q":"Will you work while visiting the United States?","ne":"भ्रमणको क्रममा अमेरिका काम गर्नुहुन्छ?","coach":"Visitor visas do not generally authorize U.S. employment; answer your genuine intent.","sample":"My purpose is a temporary visit, and I do not plan to work in the United States.","caution":"Never use a tourist visa to conceal intended employment."},{"id":"tourist-10","q":"What is your estimated budget for this visit?","ne":"यस भ्रमणको अनुमानित कुल बजेट कति हो?","coach":"Know the real cost of flights, lodging, travel, meals and funding.","sample":"I estimate [actual budget] for [true duration], covered by [genuine resources].","caution":"Give a concise truthful answer based on your temporary itinerary, available funds and actual ties to Nepal."},{"id":"tourist-11","q":"What tourist places would you like to visit?","ne":"कुन पर्यटकीय ठाउँ हेर्न चाहनुहुन्छ?","coach":"Mention places you genuinely intend to see.","sample":"I hope to visit [places on my real itinerary], subject to my budget and schedule.","caution":"Avoid memorizing destinations you know nothing about."},{"id":"tourist-12","q":"Have you ever overstayed a visa?","ne":"तपाईंले पहिले भिसाको समयभन्दा बढी बस्नुभएको छ?","coach":"Answer truthfully about all prior stays.","sample":"[Answer accurately, and explain dates and circumstances if applicable.]","caution":"Never conceal a prior overstay."},{"id":"tourist-13","q":"What job, studies or family commitments will you return to after the trip?","ne":"भ्रमणपछि कुन काम, पढाइ वा पारिवारिक जिम्मेवारीमा फर्कनुहुन्छ?","coach":"Explain actual ongoing ties; do not assume everyone has a full-time job.","sample":"After my visit I will return to [real work, study or other ongoing responsibilities in Nepal].","caution":"Give a concise truthful answer based on your temporary itinerary, available funds and actual ties to Nepal."},{"id":"tourist-14","q":"Who are you planning to visit in the United States, if anyone?","ne":"अमेरिकामा कसलाई भेट्ने योजना छ, यदि कसैलाई भेट्दै हुनुहुन्छ भने?","coach":"Identify a real host or say it is tourism without an inviter.","sample":"I plan to visit [actual relative/friend], or I am traveling for tourism without a host.","caution":"Give a concise truthful answer based on your temporary itinerary, available funds and actual ties to Nepal."},{"id":"tourist-15","q":"Why are you visiting now instead of later?","ne":"तपाईं अहिले नै किन भ्रमण गर्न चाहनुहुन्छ?","coach":"Explain actual timing such as a vacation period or event.","sample":"I chose this time because [actual vacation, event or family circumstance].","caution":"Do not invent an event to support your trip."},{"id":"tourist-16","q":"What is your planned itinerary during your stay?","ne":"अमेरिकामा बस्दा कुन–कुन ठाउँ जाने योजना छ?","coach":"Describe realistic cities, activities and timing that fit the budget.","sample":"During [true number of days], I plan to visit [actual destinations/activities].","caution":"Give a concise truthful answer based on your temporary itinerary, available funds and actual ties to Nepal."},{"id":"tourist-17","q":"Do you have enough savings for the whole visit?","ne":"पूरै यात्राको लागि पर्याप्त बचत छ?","coach":"Discuss your actual budget, resources, and any documented contribution.","sample":"My travel budget is based on [real funds] and a planned duration of [genuine period].","caution":"Do not invent bank balances."},{"id":"tourist-18","q":"Do you intend to leave the United States at the end of your planned visit?","ne":"योजना गरेको भ्रमण सकिएपछि अमेरिका छोड्ने विचार छ?","coach":"Clarify the genuinely temporary plan and intended return date.","sample":"Yes, I plan to depart at the end of [real trip dates] and return to [genuine commitments].","caution":"Give a concise truthful answer based on your temporary itinerary, available funds and actual ties to Nepal."},{"id":"tourist-19","q":"Which exact dates do you hope to arrive in and depart from the United States?","ne":"अमेरिकामा आउने र फर्कने तपाईंका योजना गरिएका मिति कुन हुन्?","coach":"Give tentative truthful dates without inventing paid tickets.","sample":"I plan to visit from [real planned date] to [real planned date].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"tourist-20","q":"Will you travel alone or with someone else?","ne":"तपाईं एक्लै जानुहुन्छ कि अरूसँग?","coach":"Identify actual travelers and their relationships only.","sample":"I will travel [alone / with actual relatives or companions].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"tourist-21","q":"What is your job title, employer and main responsibility in Nepal?","ne":"नेपालमा तपाईंको पद, रोजगारदाता र मुख्य जिम्मेवारी के हो?","coach":"If employed, give true details; if not, explain accurate current activity.","sample":"I currently [real job or current occupation] at [true organization if any].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"tourist-22","q":"Has your employer approved vacation leave for the planned trip?","ne":"यो भ्रमणका लागि रोजगारदाताले बिदा स्वीकृत गर्नुभएको छ?","coach":"Mention approval only if actually granted; otherwise describe the status.","sample":"My leave [has been approved / is pending] for [truthful dates].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"tourist-23","q":"Who will take care of your responsibilities in Nepal while you are away?","ne":"विदेश हुँदा नेपालका काम वा जिम्मेवारी कसले सम्हाल्छ?","coach":"Explain real personal, work or family arrangements without claiming obligations that do not exist.","sample":"During my visit, [actual person/arrangement] will manage [true responsibilities].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"tourist-24","q":"What are the estimated costs of flights, lodging and local transport?","ne":"हवाई टिकट, होटल र स्थानीय यातायातको अनुमानित खर्च कति छ?","coach":"Calculate a plausible itemized budget from actual prices researched.","sample":"I estimate [real amount] for flights, [amount] for accommodation and [amount] for transport.","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"tourist-25","q":"Where did the savings for this trip come from?","ne":"यो यात्राका लागि बचत रकम कहाँबाट आयो?","coach":"Name genuine income, savings and gift sources if applicable.","sample":"The travel funds come from [real income or savings].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"tourist-26","q":"How do you know the person you plan to visit, if applicable?","ne":"भेट्न जाने व्यक्ति छ भने उहाँसँग कसरी चिनजान भयो?","coach":"Explain real relationships and never invent an invitation.","sample":"[If applicable] We know each other through [true relationship or history].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"tourist-27","q":"Have you ever been refused a visa for the United States or another country?","ne":"अमेरिका वा अरू देशको भिसा पहिले अस्वीकृत भएको छ?","coach":"State correct prior visa outcomes when asked.","sample":"[Yes/No.] [If yes, truthful country, approximate date and outcome].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"tourist-28","q":"What places and activities are on your planned visit itinerary?","ne":"तपाईंको भ्रमण तालिकामा कुन ठाउँ र गतिविधि छन्?","coach":"Choose a coherent temporary itinerary within your time and budget.","sample":"I intend to visit [real locations] and do [real planned activities].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"tourist-29","q":"When must you return to Nepal for work, school or other commitments?","ne":"काम, पढाइ वा अन्य जिम्मेवारीका लागि नेपाल कहिलेसम्म फर्कनुपर्छ?","coach":"Identify actual return dates or obligations; no invented tickets or letters.","sample":"I intend to return by [actual date] for [real commitment].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"tourist-30","q":"How does the length of your visit fit your available money and responsibilities at home?","ne":"भ्रमणको अवधि खर्च र नेपालको जिम्मेवारीसँग कसरी मिल्छ?","coach":"Show realistic temporary travel duration and funds.","sample":"My planned [true duration] fits [real time available] and [actual budget].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."}],"spouse":[{"id":"spouse-1","q":"How did you and your spouse first meet?","ne":"तपाईं र तपाईंका जीवनसाथी पहिलोपटक कसरी भेट्नुभयो?","coach":"Describe the real first meeting, approximate time and place.","sample":"We first met in [truthful month/year or approximate period] at [actual place/context].","caution":"Your account should match genuine relationship history."},{"id":"spouse-2","q":"When did you first meet your spouse in person, and when did you start dating?","ne":"जीवनसाथीलाई प्रत्यक्ष पहिलोपटक कहिले भेट्नुभयो र सम्बन्ध कहिले सुरु भयो?","coach":"Keep a genuine timeline of in-person meetings and relationship milestones.","sample":"We first met in person [real date or approximate period] at [real place], and our relationship began [true timeline].","caution":"Use the genuine relationship timeline, documents and details of your U.S. petitioner."},{"id":"spouse-3","q":"When and where did you get married?","ne":"तपाईंहरूको विवाह कहिले र कहाँ भयो?","coach":"Give true marriage details consistent with your certificate.","sample":"We married on [actual date] in [actual location].","caution":"Do not invent ceremony details."},{"id":"spouse-4","q":"Where does your U.S. spouse live, and what do they do for work?","ne":"अमेरिकामा तपाईंका जीवनसाथी कहाँ बस्नुहुन्छ र के काम गर्नुहुन्छ?","coach":"Know your spouse's actual city, living situation and current occupation.","sample":"My spouse lives in [real city/state] and works [actual job or truthful current situation].","caution":"Use the genuine relationship timeline, documents and details of your U.S. petitioner."},{"id":"spouse-5","q":"How often do you communicate?","ne":"तपाईंहरू कति पटक कुरा गर्नुहुन्छ?","coach":"Describe actual calls, messages and visits without exaggerating.","sample":"We usually communicate [truthful frequency] through [real methods].","caution":"Do not invent daily calls that did not happen."},{"id":"spouse-6","q":"When did you last see each other?","ne":"तपाईंहरू पछिल्लो पटक कहिले भेट्नुभयो?","coach":"Give accurate date or honest approximate period and location.","sample":"We last met around [accurate date] in [actual place].","caution":"If you cannot remember a precise date, say so."},{"id":"spouse-7","q":"What is your plan for living together after your immigrant visa is issued?","ne":"आप्रवासी भिसा पाएपछि सँगै बस्ने योजना के छ?","coach":"Describe real housing arrangements and a realistic reunification plan.","sample":"If my visa is issued, we plan to live together in [real address or city/plan].","caution":"Use the genuine relationship timeline, documents and details of your U.S. petitioner."},{"id":"spouse-8","q":"How will you and your spouse pay your living expenses when you reunite?","ne":"सँगै बस्न थालेपछि दैनिक खर्च कसरी धान्नुहुन्छ?","coach":"Explain actual current income, I-864 sponsorship and assets without inventing additional sponsors.","sample":"Our living expenses will be covered by [documented income and actual savings/assets, if applicable].","caution":"Use the genuine relationship timeline, documents and details of your U.S. petitioner."},{"id":"spouse-9","q":"Who filed your immigrant petition, and what is your petitioner's U.S. immigration status?","ne":"तपाईंका लागि आप्रवासी निवेदन कसले दियो र उहाँको अमेरिकी कानुनी हैसियत के हो?","coach":"Identify the actual petitioner and whether they are a U.S. citizen or lawful permanent resident, as appropriate.","sample":"My [spouse/petitioner] filed [actual petition] and is [their true U.S. immigration status].","caution":"Use the genuine relationship timeline, documents and details of your U.S. petitioner."},{"id":"spouse-10","q":"What did you and your spouse do together during your most recent visit?","ne":"अन्तिम पटक भेट्दा तपाईंहरू सँगै के–के गर्नुभयो?","coach":"Recall genuine shared experiences, where you stayed and time spent together.","sample":"On our most recent visit, we [real activities] in [real place] during [accurate period].","caution":"Use the genuine relationship timeline, documents and details of your U.S. petitioner."},{"id":"spouse-11","q":"How did your families learn about your relationship and wedding?","ne":"तपाईंहरूको सम्बन्ध र विवाहबारे परिवारले कसरी थाहा पाए?","coach":"Explain the actual family involvement; not every wedding follows the same tradition.","sample":"Our families learned about us [truthful explanation], and [accurate details of their involvement].","caution":"Use the genuine relationship timeline, documents and details of your U.S. petitioner."},{"id":"spouse-12","q":"Has either of you been married before?","ne":"तपाईंहरू मध्ये कसैको पहिले विवाह भएको थियो?","coach":"Answer accurately and explain required legal records where relevant.","sample":"[Yes/No.] [If applicable, give the true history and relevant legal documents.]","caution":"Do not conceal a previous marriage or divorce."},{"id":"spouse-13","q":"Who attended your wedding, and what kind of ceremony did you have?","ne":"विवाहमा को–को उपस्थित थिए र कस्तो विवाह समारोह भयो?","coach":"Discuss the authentic legal, civil, religious or family ceremony; do not invent attendees.","sample":"We married at [actual venue] with [real attendees and actual type of ceremony].","caution":"Use the genuine relationship timeline, documents and details of your U.S. petitioner."},{"id":"spouse-14","q":"What do you know about your spouse's home and daily life in the United States?","ne":"अमेरिकामा तपाईंका जीवनसाथीको घर र दैनिक जीवनबारे के थाहा छ?","coach":"Share truthful details about their housing, typical schedule and routines.","sample":"My spouse lives [accurate situation] and usually [real daily routine].","caution":"Use the genuine relationship timeline, documents and details of your U.S. petitioner."},{"id":"spouse-15","q":"How often have you visited each other since your relationship began?","ne":"सम्बन्ध सुरु भएदेखि एक–अर्कालाई कति पटक भेट्नुभएको छ?","coach":"Explain actual visits, places and dates without assuming travel was possible.","sample":"We have met in person [true number/times] including [recent actual visits].","caution":"Use the genuine relationship timeline, documents and details of your U.S. petitioner."},{"id":"spouse-16","q":"What documents or records show that your marriage is genuine?","ne":"तपाईंहरूको विवाह वास्तविक हो भन्ने कुन प्रमाण छन्?","coach":"Mention authentic marriage certificate, shared visits, communication, photos and shared arrangements that exist.","sample":"We have [actual marriage and relationship records], which reflect our real history together.","caution":"Use the genuine relationship timeline, documents and details of your U.S. petitioner."},{"id":"spouse-17","q":"Do either of you have children, including from earlier relationships?","ne":"तपाईंहरू कसैका सन्तान छन्, अघिल्लो सम्बन्धबाट समेत?","coach":"Give accurate family details only if applicable and consistent with filed forms.","sample":"[Yes/No.] [If yes, give the correct details relevant to our case].","caution":"Use the genuine relationship timeline, documents and details of your U.S. petitioner."},{"id":"spouse-18","q":"How have you maintained your relationship while living apart during processing?","ne":"भिसा प्रक्रिया चल्दा छुट्टाछुट्टै बस्नुपरेको समयमा सम्बन्ध कसरी कायम राख्नुभएको छ?","coach":"Describe genuine calls, messages, visits and shared plans, not why a visa has not yet been issued.","sample":"We stay in touch through [real communication methods] and [true visits or joint plans].","caution":"Use the genuine relationship timeline, documents and details of your U.S. petitioner."},{"id":"spouse-19","q":"What is the specific U.S. address where you and your spouse plan to live?","ne":"तपाईं र जीवनसाथी अमेरिकामा कुन ठेगानामा बस्ने योजना छ?","coach":"Give the correct address if fixed or say honestly that it is being arranged.","sample":"We plan to live at [actual address], or we are arranging housing in [real city].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"housing"},{"id":"spouse-20","q":"If a permanent home is not arranged, what is your temporary housing plan?","ne":"स्थायी घर तय नभए सुरुवाती बसाइँको योजना के छ?","coach":"Explain real short-term lodging, search steps and affordability.","sample":"At first we plan to [actual temporary arrangement] while looking for [suitable housing].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"housing"},{"id":"spouse-21","q":"Who else, if anyone, will live with you and your spouse in that home?","ne":"त्यो घरमा तपाईंहरू बाहेक अरू कोही बस्नुहुन्छ?","coach":"Count actual household members, not assumed financial contributors.","sample":"Our household will include [true residents], and [accurate arrangements].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"housing"},{"id":"spouse-22","q":"Does your U.S. spouse rent, own or share their current home?","ne":"अमेरिकामा तपाईंका जीवनसाथी अहिले भाडामा, आफ्नै वा साझा घरमा बस्नुहुन्छ?","coach":"Describe your petitioner's real current housing situation.","sample":"My spouse currently [rents/owns/shares] a home in [real location].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"housing"},{"id":"spouse-23","q":"Do you plan to work after becoming an immigrant, and in what field?","ne":"आप्रवासी बनेपछि काम गर्ने योजना छ? भए कुन क्षेत्रमा?","coach":"Describe genuine intentions without suggesting a guaranteed U.S. job.","sample":"After immigrating, I hope to work in [realistic field], if that is my actual plan.","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"employment"},{"id":"spouse-24","q":"What education or past work experience prepares you for that occupation?","ne":"त्यस कामका लागि तपाईंको पढाइ वा अघिल्लो अनुभव के छ?","coach":"Mention genuine education, skills and work, including gaps if relevant.","sample":"I have [true schooling, training or prior work] related to [field].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"employment"},{"id":"spouse-25","q":"Will you need additional training or a license, and how will expenses be covered meanwhile?","ne":"थप तालिम वा लाइसेन्स चाहिन्छ? त्यतिबेला खर्च कसरी चल्छ?","coach":"Research real licensing rules and explain documented household resources.","sample":"If training is required, we will rely on [actual income/savings] while I [real plan].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"employment"},{"id":"spouse-26","q":"Have you looked for U.S. employment opportunities yet?","ne":"अमेरिकामा रोजगारीका अवसरहरू खोज्नुभएको छ?","coach":"Describe true job research, networks or applications, not fabricated offers.","sample":"I have [actual search activities] or have not begun a search yet.","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"employment"},{"id":"spouse-27","q":"If you find suitable work, what first-year salary might be realistic?","ne":"उपयुक्त काम पाए पहिलो वर्ष अनुमानित तलब कति हुन सक्छ?","coach":"Clearly distinguish estimated pay from money already earned or guaranteed.","sample":"A realistic estimate could be [researched figure], though employment is not assured.","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"employment"},{"id":"spouse-28","q":"Does your spouse have health insurance that could cover you after immigration?","ne":"जीवनसाथीको स्वास्थ्य बीमाले तपाईंलाई पनि समेट्न सक्छ?","coach":"Check actual plan eligibility and any special enrollment arrangements.","sample":"We have [checked/not confirmed] whether my spouse's plan can include me.","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"insurance"},{"id":"spouse-29","q":"If you cannot join an existing health plan, what insurance will you consider and at what monthly cost?","ne":"अहिलेको बीमामा नसमेटिए कुन बीमा र कति मासिक शुल्क विचार गर्नुभएको छ?","coach":"Share actual options and researched premiums; do not claim enrollment before it occurs.","sample":"We are considering [actual options]; [actual premium quote] if available.","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"insurance"},{"id":"spouse-30","q":"How will your household cover rent, food and health care before you have any employment income?","ne":"तपाईंको आफ्नै काम सुरु नहुँदासम्म भाडा, खाना र उपचार खर्च कसरी तिर्नुहुन्छ?","coach":"Show real current petitioner income and available savings, separate from hoped-for wages.","sample":"Our starting expenses are planned around [verified spouse income and actual funds].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"insurance"}],"fiance":[{"id":"fiance-1","q":"How did you meet your fiancé(e)?","ne":"तपाईंले आफ्नो मगनी भएको व्यक्तिलाई कसरी भेट्नुभयो?","coach":"Explain the real history of meeting and relationship.","sample":"We first met in [actual place/context] around [accurate time].","caution":"Never invent meetings or conversations."},{"id":"fiance-2","q":"When and where did you last meet your U.S. fiancé(e) in person?","ne":"अमेरिकामा बस्ने मंगेतरसँग अन्तिमपटक प्रत्यक्ष कहाँ र कहिले भेट्नुभयो?","coach":"State the actual meeting dates and locations.","sample":"We last met in [real place] on or around [actual date].","caution":"Explain the real relationship and comply with K-1 requirements; never invent a meeting or wedding plan."},{"id":"fiance-3","q":"When did you become engaged?","ne":"तपाईंहरूको इन्गेजमेन्ट कहिले भयो?","coach":"Give the actual engagement details.","sample":"We became engaged on [actual date or period] after [truthful relationship history].","caution":"Do not make up a proposal story."},{"id":"fiance-4","q":"Why do you want to marry this person?","ne":"तपाईं किन उहाँसँग विवाह गर्न चाहनुहुन्छ?","coach":"Describe the genuine relationship without rehearsed unrealistic phrases.","sample":"We have built a genuine relationship through [actual shared experiences], and we plan to marry.","caution":"The content matters more than elaborate English."},{"id":"fiance-5","q":"What is your fiancé(e)'s occupation?","ne":"तपाईंका मंगेतर/मंगेतरी के काम गर्नुहुन्छ?","coach":"State the person's actual occupation or honest current situation.","sample":"My fiancé(e) currently [works/studies/is not employed—choose what is true].","caution":"Do not fabricate employment."},{"id":"fiance-6","q":"Where will you live after marriage?","ne":"विवाहपछि कहाँ बस्नुहुन्छ?","coach":"Describe real U.S. housing plans.","sample":"We plan to live in [actual location or confirmed plan].","caution":"Unconfirmed plans can be described as plans, not facts."},{"id":"fiance-7","q":"Where and when do you plan to marry within 90 days of your arrival?","ne":"अमेरिका पुगेको ९० दिनभित्र कहाँ र कहिले विवाह गर्ने योजना छ?","coach":"Show the real intention to marry the petitioning U.S. citizen within 90 days.","sample":"We plan to marry in [real U.S. location] within 90 days of arrival, with [genuine plans].","caution":"Explain the real relationship and comply with K-1 requirements; never invent a meeting or wedding plan."},{"id":"fiance-8","q":"How will you financially support yourself after arriving?","ne":"अमेरिका पुगेपछि खर्च कसरी चलाउनुहुन्छ?","coach":"Explain actual finances and your fiancé(e)'s support, and remember K-1 work requires authorization.","sample":"We have planned for initial expenses using [real resources or partner support]. I understand I must follow work authorization rules.","caution":"Do not assume immediate unrestricted work on arrival with K-1."},{"id":"fiance-9","q":"Do your families know about the engagement?","ne":"परिवारलाई इन्गेजमेन्टबारे थाहा छ?","coach":"Give an accurate answer; cultures and families differ.","sample":"[Yes/No.] [Explain your actual family situation if asked.]","caution":"Do not falsely claim parental approval."},{"id":"fiance-10","q":"Have either of you been married before?","ne":"तपाईंहरू मध्ये कसैको पहिले विवाह भएको थियो?","coach":"Explain actual history and legal dissolution documents when relevant.","sample":"[Yes/No.] [If applicable, explain truthfully and provide required records.]","caution":"Do not conceal prior marriages."},{"id":"fiance-11","q":"What do you and your fiancé(e) like doing together?","ne":"तपाईंहरू सँगै के गर्न मन पराउनुहुन्छ?","coach":"Describe true activities from visits or communication.","sample":"We enjoy [true shared activities] and often talk about [real interests].","caution":"Specific true details are more persuasive than memorized stories."},{"id":"fiance-12","q":"What preparations have you and your fiancé(e) made for the wedding?","ne":"तपाईं र मंगेतरले विवाहका लागि के–कस्ता तयारी गर्नुभएको छ?","coach":"Describe genuinely discussed dates, venues and family plans, even if tentative.","sample":"We have discussed [true preparations], and will finalize the plans after [accurate condition].","caution":"Explain the real relationship and comply with K-1 requirements; never invent a meeting or wedding plan."},{"id":"fiance-13","q":"What evidence shows that you and your fiancé(e) have met in person?","ne":"मंगेतरसँग प्रत्यक्ष भेट भएको कुन प्रमाण छ?","coach":"Know actual visits, photographs, travel records; in-person meeting requirement generally applies.","sample":"We have [real photos, travel records or other records] from [actual meetings].","caution":"Explain the real relationship and comply with K-1 requirements; never invent a meeting or wedding plan."},{"id":"fiance-14","q":"What do you know about your fiancé(e)'s daily life?","ne":"मंगेतरको दैनिक जीवनबारे के थाहा छ?","coach":"Mention authentic information you actually know about work, interests and routine.","sample":"My fiancé(e) typically [truthful details], and we regularly talk about [real subjects].","caution":"Do not memorize an invented biography."},{"id":"fiance-15","q":"Who will pay for your first months in the United States?","ne":"अमेरिकामा सुरुका महिनाको खर्च कसले बेहोर्छ?","coach":"Explain real financial resources and arrangements while recognizing work authorization limitations.","sample":"Our initial expenses are planned around [actual savings and verified support].","caution":"A K-1 does not automatically grant unrestricted employment on arrival."},{"id":"fiance-16","q":"Are you and your fiancé(e) both legally free to marry?","ne":"तपाईं र मंगेतर दुवै कानुनी रूपमा विवाह गर्न स्वतन्त्र हुनुहुन्छ?","coach":"Confirm genuine unmarried/divorced/widowed status with relevant termination documents if required.","sample":"[Yes.] [If previously married, the relevant marriage ended legally on actual date].","caution":"Explain the real relationship and comply with K-1 requirements; never invent a meeting or wedding plan."},{"id":"fiance-17","q":"How are you planning the wedding?","ne":"तपाईंहरूले विवाहको योजना कसरी बनाउनुभएको छ?","coach":"Describe actual discussions or bookings, while distinguishing tentative plans.","sample":"We have discussed [true wedding plans], and we intend to comply with the required timeline.","caution":"Do not invent wedding venues, bookings or dates."},{"id":"fiance-18","q":"Have you or your fiancé(e) had a previous marriage, and how did it legally end?","ne":"तपाईं वा मंगेतरको पहिले विवाह भएको थियो? भए कानुनी रूपमा कसरी अन्त्य भयो?","coach":"Explain truthful prior marriages and legal termination records; no need to invent a past relationship.","sample":"[Yes/No.] [If yes, explain the true prior marriage and divorce/death certificate].","caution":"Explain the real relationship and comply with K-1 requirements; never invent a meeting or wedding plan."},{"id":"fiance-19","q":"Is your petitioner a U.S. citizen, and where do they live?","ne":"तपाईंका निवेदक अमेरिकी नागरिक हुनुहुन्छ? उहाँ कहाँ बस्नुहुन्छ?","coach":"Know the petitioner's actual citizenship and place of residence.","sample":"My fiancé(e) is [actual status] and lives in [real city/state].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"fiance-20","q":"How often do you communicate, and which methods do you use?","ne":"तपाईंहरू कति पटक र कुन माध्यमबाट सम्पर्क गर्नुहुन्छ?","coach":"Describe actual calls, messages, languages and schedule.","sample":"We talk [real frequency] using [actual tools].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"fiance-21","q":"When did you first meet each other in person?","ne":"तपाईंहरूले पहिलोपटक प्रत्यक्ष कहिले भेट्नुभयो?","coach":"Know truthful dates and locations relevant to the K-1 meeting requirement.","sample":"We first met in person in [real month/year] at [actual location].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"fiance-22","q":"When and where was your engagement, if you had a ceremony?","ne":"सगाइ वा इन्गेजमेन्ट कहिले र कहाँ भयो?","coach":"Explain real engagement plans or ceremony; ceremony is not universally required.","sample":"We became engaged [actual time and context] in [real place].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"fiance-23","q":"How have your families met or communicated about the relationship?","ne":"परिवारहरूले तपाईंहरूको सम्बन्धबारे कसरी भेटघाट वा कुरा गरेका छन्?","coach":"Describe genuine family communication; family participation varies.","sample":"Our families [accurate history of meeting or talking].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"fiance-24","q":"Do either of you have children, and what arrangements have you discussed?","ne":"तपाईंहरूका सन्तान छन्? भए कस्तो योजना बनाउनुभएको छ?","coach":"Share correct children and practical plans only if applicable.","sample":"[Yes/No.] [If yes, real family and care arrangements].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"fiance-25","q":"What is your fiancé(e)'s current living arrangement in the United States?","ne":"अमेरिकामा मंगेतर अहिले कस्तो बसोबासमा हुनुहुन्छ?","coach":"Know actual home, household members and intended post-wedding housing.","sample":"My fiancé(e) currently lives [real housing description].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"fiance-26","q":"What wedding arrangements have already been confirmed, and what is tentative?","ne":"विवाहको कुन तयारी पक्का छ र कुन बाँकी छ?","coach":"Differentiate actual bookings from intentions.","sample":"We have confirmed [real arrangements], while [honest details] remain tentative.","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"fiance-27","q":"How will you follow the K-1 requirement to marry your petitioner within 90 days of entry?","ne":"K-1 मा अमेरिका पुगेको ९० दिनभित्र निवेदकसँग कसरी विवाह गर्ने योजना छ?","coach":"Focus on actual intention to marry the U.S. citizen petitioner within the statutory period.","sample":"We intend to marry [real plan] within 90 days of entry.","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"fiance-28","q":"Who will pay your initial living expenses after you arrive?","ne":"अमेरिका पुगेपछि सुरुवाती खर्च कसले तिर्नुहुन्छ?","coach":"Give real financial arrangements; do not assume employment permission immediately.","sample":"Our initial expenses will be covered by [real resources and agreements].","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"fiance-29","q":"What do you understand about working before you receive employment authorization?","ne":"काम गर्ने अनुमति आउनुअघि काम गर्ने नियमबारे के बुझ्नुभएको छ?","coach":"Understand K-1 entry does not automatically grant unrestricted work authorization.","sample":"I will not work unless I have the authorization required for my status.","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."},{"id":"fiance-30","q":"What is your plan to apply for adjustment of status after your marriage?","ne":"विवाहपछि स्थायी बसोबासको स्थिति मिलाउन कस्तो प्रक्रिया गर्ने योजना छ?","coach":"Describe truthful knowledge of the post-marriage process without predicting approval.","sample":"After marriage we plan to review the applicable USCIS steps and file the required forms.","caution":"Practice answering naturally using only true details and verifiable records. Official requirements depend on your visa category."}],"hard":[{"id":"hard-1","q":"There is a date discrepancy between your application and a document. Can you clarify it?","ne":"आवेदन र कागजातमा मिति फरक देखिन्छ। स्पष्ट पार्न सक्नुहुन्छ?","coach":"If a real discrepancy exists, correct it openly with reliable records.","sample":"I would like to clarify [actual discrepancy]. The correct information is [true facts supported by records].","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-2","q":"Can you explain the gap in your employment history?","ne":"तपाईंको रोजगारी इतिहासमा रहेको अन्तराल स्पष्ट पार्न सक्नुहुन्छ?","coach":"Only applicable if a gap exists. Explain what you actually did and when.","sample":"From [actual dates] I was [genuine activities], and my work history accurately shows the gap.","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-3","q":"How do you plan to cover living expenses and health-related costs in the United States?","ne":"अमेरिकामा बसाइँ र स्वास्थ्यसम्बन्धी खर्च कसरी धान्ने योजना छ?","coach":"Use genuine funding, health coverage plans and applicable required support evidence.","sample":"Our plan is based on [documented current income/savings] and [real health coverage arrangement if known].","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-4","q":"If your financial sponsor's situation changes, what resources would be available?","ne":"आर्थिक प्रायोजकको अवस्था फेरिए कुन स्रोत उपलब्ध हुन्छन्?","coach":"Conditional follow-up. Use actual resources; do not invent a joint sponsor.","sample":"If circumstances changed, [genuine savings or other confirmed resources] would be available.","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-5","q":"Why is the income on your sponsor's tax return different from current earnings?","ne":"प्रायोजकको कर विवरणको आय र अहिलेको कमाइ किन फरक छ?","coach":"Only if amounts actually differ. Explain real employment changes and genuine supporting pay evidence.","sample":"The amounts differ because [true reason], and [actual current records] explain the change.","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-6","q":"Have your employment, education or address details changed since your application?","ne":"आवेदनपछि रोजगारी, पढाइ वा ठेगाना परिवर्तन भएको छ?","coach":"Explain changes since filing and provide accurate updates, if any.","sample":"[Yes/No.] [If applicable, I changed [true detail] on [date]].","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-7","q":"What records support your eligibility for the visa category you applied for?","ne":"तपाईंले माग्नुभएको भिसा वर्गका लागि योग्य भएको कुन प्रमाण छन्?","coach":"Refer to the actual applicable requirements, not persuasive claims of deserving approval.","sample":"My supporting documents include [the truthful records required for my category].","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-8","q":"What financial support is available to you after arriving in the United States?","ne":"अमेरिका पुगेपछि तपाईंलाई कुन वास्तविक आर्थिक सहयोग उपलब्ध हुन्छ?","coach":"Give actual financial details. Public-charge assessments depend on applicable rules and case facts.","sample":"The resources available to me are [genuine income, savings or qualifying support as applicable].","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-9","q":"Have you previously been refused a U.S. visa or had an immigration problem?","ne":"के तपाईंलाई पहिले अमेरिकी भिसा अस्वीकार भएको वा अध्यागमनसम्बन्धी समस्या भएको छ?","coach":"Only if applicable. Give the true visa type, date and outcome; a refusal is not automatically disqualifying for every visa.","sample":"[Yes/No.] [If yes, accurately explain the refusal or issue and any instructions].","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-10","q":"Could you explain your last answer more clearly?","ne":"अघिल्लो उत्तर अझ स्पष्ट रूपमा बताउन सक्नुहुन्छ?","coach":"Use calm, simple English and repeat the factual details without guessing.","sample":"Certainly. What I mean is [truthful clarification of my earlier answer].","caution":"A discrepancy or uncertain detail should be addressed truthfully, with records if available."},{"id":"hard-11","q":"A detail in your application does not match what you just said. Which information is correct?","ne":"आवेदन र तपाईंको अहिलेको उत्तरमा फरक विवरण छ। सही जानकारी कुन हो?","coach":"Acknowledge an actual mistake without fabricating a reason or hiding relevant information.","sample":"I would like to correct or clarify [true discrepancy]. The accurate information is [verifiable fact].","caution":"A discrepancy or uncertain detail should be addressed truthfully, with records if available."},{"id":"hard-12","q":"What will you do if unexpected expenses arise after you arrive?","ne":"अमेरिका पुगेपछि अनपेक्षित खर्च आए के गर्नुहुन्छ?","coach":"Explain real available funds and contingency options, without impossible promises.","sample":"We have planned for [real contingency funds or resources, if any].","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-13","q":"Who is supporting your application financially, and what is their relationship to you?","ne":"आर्थिक रूपमा कसले सहयोग गर्दैछ र उहाँसँग तपाईंको सम्बन्ध के हो?","coach":"Distinguish I-864 for family immigrants, I-134 as potentially requested for K-1, and nonimmigrant self-funded plans.","sample":"[Actual person or self] is financing [applicable costs], and the relevant documents are [real evidence].","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-14","q":"How can you prove a real marriage or engagement?","ne":"सम्बन्ध वास्तविक छ भनेर कसरी प्रमाणित गर्नुहुन्छ?","coach":"Describe truthful timeline, communication and relationship evidence.","sample":"Our relationship is genuine, and the supporting evidence includes [actual visits, communications, photos or documents we possess].","caution":"Never stage evidence or pretend an event occurred."},{"id":"hard-15","q":"Will you work in the United States without authorization?","ne":"अमेरिकामा अनुमति बिना काम गर्नुहुन्छ?","coach":"State genuine intent to comply with the rules of your specific visa.","sample":"I intend to follow the employment rules for my visa and work only when legally authorized.","caution":"Student, visitor, fiancé(e) and immigrant visas have different work permissions."},{"id":"hard-16","q":"Why do you have a long gap in your education?","ne":"पढाइमा लामो अन्तर किन आयो?","coach":"Explain the real reasons and what changed before applying.","sample":"My education was interrupted because [honest explanation]. During that time I [true activities], and I am now prepared to [actual study plan].","caution":"There is no need to invent certificates or jobs."},{"id":"hard-17","q":"Whose name is on the property or financial asset being offered as evidence?","ne":"प्रमाणको रूपमा पेस गरिएको सम्पत्ति वा आर्थिक स्रोत कसको नाममा छ?","coach":"Only if assets are submitted. Distinguish ownership, legal control and availability; relatives' assets are not automatically yours.","sample":"The asset legally belongs to [actual owner], and [true documentation] shows what funds are available.","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-18","q":"Can you show records supporting the income or employment reported in your application?","ne":"आवेदनमा लेखेको आय वा रोजगारीको सक्कली प्रमाण देखाउन सक्नुहुन्छ?","coach":"Know authentic employer letters, tax documents or other permitted evidence.","sample":"I have [real records], which show [accurate employment or income information].","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-19","q":"Who owns the funds shown in these bank statements?","ne":"यी बैंक स्टेटमेन्टमा देखिएको रकम कसको स्वामित्वमा छ?","coach":"Distinguish your funds from a sponsor's or a relative's; ownership is case-specific.","sample":"The funds are held by [actual owner] and are available for [true purpose if documented].","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-20","q":"What is the source of the money in your savings account?","ne":"तपाईंको बचत खातामा रहेको पैसाको स्रोत के हो?","coach":"Explain verified salary, business proceeds, gifts or other real funding, if relevant.","sample":"Those funds came from [genuine documented sources] during [true period].","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-21","q":"Has your petitioner's employment or income changed since the financial forms were submitted?","ne":"आर्थिक फाराम बुझाएपछि निवेदकको रोजगारी वा आय परिवर्तन भएको छ?","coach":"Only for relevant sponsorship-based applications. Know genuine updated income records.","sample":"Since we submitted the forms, [true description of employment or income changes, if any].","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-22","q":"Have you received a request for additional documents or processing after a previous interview?","ne":"पहिलेको अन्तर्वार्तापछि थप कागजात वा प्रक्रिया सम्बन्धी सूचना आएको छ?","coach":"Conditional, only when there was a prior interview or embassy request.","sample":"[Yes/No.] [If yes, state accurately what instructions were received and what has been submitted].","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-23","q":"The relationship timeline differs between your forms and supporting records. Can you explain?","ne":"फाराम र सम्बन्धको प्रमाणमा समयरेखा फरक छ। स्पष्ट पार्न सक्नुहुन्छ?","coach":"Only if there is a real discrepancy. Correct it truthfully rather than rehearsing matching stories.","sample":"The accurate timeline is [true dates], and I can explain the difference using [actual records].","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-24","q":"What is your sponsor's current annual income?","ne":"तपाईंको आर्थिक प्रायोजकको अहिलेको वार्षिक आम्दानी कति छ?","coach":"Refer only to current reliable documentation and do not invent an exact figure.","sample":"According to our current records, the annual income is [real documented figure]. If needed, may I check the filed documents?","caution":"A discrepancy or uncertain detail should be addressed truthfully, with records if available."},{"id":"hard-25","q":"How would you cover initial living costs if you cannot begin work right away?","ne":"तुरुन्तै काम सुरु गर्न नसके सुरुवाती खर्च कसरी धान्नुहुन्छ?","coach":"Match plans to visa-specific work permissions and documented available support.","sample":"We would initially rely on [real financial resources], and I would only work when legally authorized.","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-26","q":"Did anyone help complete your application, and did you review its answers?","ne":"आवेदन भर्न कसैले मद्दत गरेको थियो? तपाईंले सबै उत्तर जाँच्नुभएको थियो?","coach":"Answer openly about interpreters, preparers and whether you checked the forms.","sample":"[Yes/No, truthful explanation.] I reviewed [actual forms] and can clarify any errors.","caution":"Practice this only when relevant to your actual situation. Never invent dates, finances or documents."},{"id":"hard-27","q":"If you have not secured housing in the United States, what is your realistic housing plan?","ne":"अमेरिकामा घर तय नभए कसरी उपयुक्त घर खोज्नुहुन्छ?","coach":"Use actual intended location, housing research and confirmed ability to pay.","sample":"I plan to search in [real city], with a budget supported by [available funds].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"housing"},{"id":"hard-28","q":"If you need an employment license or training, who will cover your expenses until you can work?","ne":"काम गर्न तालिम वा लाइसेन्स चाहियो भने त्यस अवधिमा खर्च कसले तिर्छ?","coach":"Distinguish real available income/savings from hoped-for future employment.","sample":"During that period, [actual household resources] would cover necessary expenses.","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"employment"},{"id":"hard-29","q":"If no health insurance currently covers you, what plan could you purchase and what would it cost monthly?","ne":"अहिले बीमा नभए कस्तो बीमा लिन सक्नुहुन्छ र मासिक खर्च कति होला?","coach":"Give an actual researched policy and premium, or clearly say research is pending.","sample":"I have investigated [real options]; the monthly premium is [confirmed quote if available].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"insurance"},{"id":"hard-30","q":"Who else will be living with you, and who will actually pay the household expenses?","ne":"तपाईंसँग अरू को बस्नुहुन्छ र घरखर्च वास्तवमा कसले तिर्नुहुन्छ?","coach":"Separate living arrangements from legally documented sponsorship and available funds.","sample":"I will live with [actual people]. Expenses will be paid through [real financial plan].","caution":"Shared reinterview-questionnaire theme. This is practice, not an authenticated embassy script. Do not invent addresses, jobs, coverage, premiums or financial arrangements.","reinterview":true,"theme":"housing"}]};
const visaOfficialSources=[["Visa news and updates","https://travel.state.gov/content/travel/en/News/visas-news.html","Check new consular announcements and changing court-related policies"],["75-country immigrant visa pause update","https://travel.state.gov/en/newsroom/visas/2026/immigrant-visa-processing-updates-for-nationalities-at-high-risk-of-public-benefits-usage.html","Published August 28, 2026; may change after court action"],["Diversity visa issuance guidance","https://travel.state.gov/content/travel/en/News/visas-news/diversity-visa-issuance-updated-guidance.html","Published August 31, 2026; verify newest developments"],["Public charge guidance","https://travel.state.gov/en/newsroom/visas/2026/preventing-public-benefits-reliance.html","Department of State guidance on financial circumstances"],["Public charge bonds","https://travel.state.gov/content/travel/en/News/visas-news/public-charge-bonds-for-immigrant-visa-applicants.html","Department of State public-charge-bond guidance"],["Spousal financial sponsorship (I-864)","https://travel.state.gov/content/travel/en/us-visas/immigrate/i-864-affidavit-faqs.html","Required evidence and public-charge considerations"],["U.S. Embassy Kathmandu instructions","https://travel.state.gov/content/travel/en/us-visas/Supplements/Supplements_by_Post/KDU-Kathmandu.html","Country-specific instructions for immigrant visa interviews"],["Student visa requirements","https://travel.state.gov/content/travel/en/us-visas/study/student-visa.html","Academic preparation, intention to depart and funding"],["Visitor visa requirements","https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html","Temporary trip purpose, funding and intent to depart"],["Fiancé(e) visa requirements","https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration/nonimmigrant-visa-for-a-fiance-k-1.html","Relationship evidence, legal freedom to marry and 90-day timeline"]];
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
 add(doc,heading,'small','','Practice high-value questions based on official visa requirements. These are examples, not an official Embassy Kathmandu question list.');
 const numbers=add(doc,head,'div','sikau-visa-stats');
 add(doc,numbers,'strong','',String(Object.values(visaQuestions).reduce((n,p)=>n+p.length,0)));
 add(doc,numbers,'span','','Interview questions · प्रश्नहरू');
 const disclaimer=add(doc,main,'div','sikau-visa-caution');
 add(doc,disclaimer,'strong','','Your real story is your strongest answer · साँचो कुरा नै राम्रो उत्तर हो');
 add(doc,disclaimer,'p','','Practice questions are illustrative; U.S. Embassy Kathmandu does not publish a guaranteed interview script. Categories have different eligibility rules and officers may ask follow-ups. Answer from your true experience and authentic records; never invent jobs, income, sponsors, documents or relationships. Example replies are language templates, not legal advice or an approval prediction.');
 const reinterview=add(doc,main,'aside','sikau-visa-reinterview-notice');
 const reinterviewCopy=add(doc,reinterview,'div','sikau-visa-reinterview-copy');
 add(doc,reinterviewCopy,'strong','','🏠 Housing · 💼 Employment · 🏥 Health insurance — Reinterview preparation');
 add(doc,reinterviewCopy,'p','','A questionnaire image shared by a learner was reportedly used during an immigrant-visa reinterview. Its origin has not been independently verified. Practice housing arrangements and household members, work skills and licensing, realistic income, health insurance eligibility, and monthly premiums. These are examples, not guaranteed U.S. Embassy questions. · पुनःअन्तर्वार्ताका लागि आवास, रोजगार र स्वास्थ्य बीमाको अभ्यास।');
 const focusButton=add(doc,reinterview,'button','sikau-visa-reinterview-button','Practice reported reinterview topics · पुनःअन्तर्वार्ता अभ्यास');
 focusButton.type='button';
 focusButton.setAttribute('aria-pressed','false');
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
 const inputs=new Map();
 let kind='dv',deck=[],cursor=0,revealed=false,done=false,answerText='',last='',typed='',notes='';
 let showAllQuestions=false,reinterviewOnly=false;
 const pick=()=>{
  const items=visaQuestions[kind]||[];
  return reinterviewOnly?items.filter(item=>item.reinterview):items;
 };
 function updateReinterviewControls(){
  reinterview.hidden=!['dv','spouse','hard'].includes(kind);
  focusButton.setAttribute('aria-pressed',String(reinterviewOnly));
  focusButton.textContent=reinterviewOnly?
   '✓ Reinterview focus · Show all 30 questions · सबै ३० प्रश्न':
   'Practice reported reinterview topics · पुनःअन्तर्वार्ता अभ्यास';
 }
 focusButton.addEventListener('click',()=>{
  reinterviewOnly=!reinterviewOnly;
  showAllQuestions=false;
  searchInput.value='';
  newDeck();
  updateReinterviewControls();
  renderQuestionBrowser();
  renderQuestion();
 });
 function shuffled(pool,avoid=''){
  const out=[...pool];
  for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]];}
  if(out.length>1&&out[0].id===avoid)[out[0],out[1]]=[out[1],out[0]];
  return out;
 }
 function newDeck(){const avoid=deck[cursor]?.id||last;deck=shuffled(pick(),avoid);cursor=0;done=false;revealed=false;answerText='';typed='';notes='';}
 function chooseCategory(next){
  kind=next;reinterviewOnly=false;last='';newDeck();showAllQuestions=false;searchInput.value='';
  updateReinterviewControls();renderCategories();renderQuestionBrowser();renderQuestion();
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
  browserCount.textContent=results.length+' questions · प्रश्न'+(reinterviewOnly?' · reinterview':'');
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
   if(question.reinterview){
    const topic=question.theme==='housing'?'🏠 Housing · आवास':
      question.theme==='employment'?'💼 Employment · रोजगार':'🏥 Insurance · बीमा';
    add(doc,copy,'em','sikau-visa-reinterview-tag',topic+' · reported reinterview topic');
   }
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
  add(doc,prompt,'span','sikau-visa-officer','🎤 Interview practice question · अन्तर्वार्ता अभ्यास प्रश्न');
  if(q.reinterview){
   add(doc,prompt,'small','sikau-visa-reinterview-tag','Reported reinterview theme: '+(q.theme==='housing'?'housing':q.theme==='employment'?'employment':'health insurance')+' · साझा गरिएको प्रश्नावलीबाट अभ्यास');
  }
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
  // Keep the private legacy adventure picker out of both Coach and Visa.
  hideRedundantCoachAdventurePanel(doc);
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

/* Coach's authored questions are examples, not exact-answer tests.
 * When the private AI backend has not been configured, these *limited*
 * offline prompts keep basic yes/no replies moving without claiming to
 * understand all grammar or meanings.
 */
function coachOfflineStep(npc,npcNe,answer,answerNe){
 const i=normalize(npc).length%coachDistractors.length;
 return {npc,npcNe,goal:'आफ्नै अंग्रेजी शब्द प्रयोग गरेर स्वाभाविक उत्तर दिनुहोस्।',
  answer,answerNe,accept:[answer],hint:'Use your own words to answer the question.',
  bad1:coachDistractors[i],bad2:coachDistractors[(i+4)%coachDistractors.length],
  after:'Thank you for explaining.'};
}
function coachNoReceiptPath(){
 const pairs=[
 ["That's okay. Do you have an email confirmation or an order number?","ठीक छ। इमेल पुष्टि वा अर्डर नम्बर छ?","I can look for the confirmation email on my phone.","म फोनमा पुष्टि इमेल खोज्न सक्छु।"],
 ["Take your time. When did you purchase this shirt?","हतार छैन। यो कमिज कहिले किन्नुभयो?","I bought it last weekend.","मैले गएको सप्ताहन्त किनेको थिएँ।"],
 ["Was it bought online or in our store?","अनलाइन किन्नुभयो कि यहीँ पसलमा?","I bought it in this store.","मैले यही पसलमा किनेको हुँ।"],
 ["May I check the tag on the shirt?","कमिजको ट्याग हेर्न सक्छु?","Sure, here is the tag.","अवश्य, यो ट्याग हो।"],
 ["What seems to be the problem with the shirt?","कमिजमा के समस्या छ?","It's too small for me.","यो मलाई सानो भयो।"],
 ["Would you prefer another size or store credit?","अर्को साइज चाहिन्छ कि स्टोर क्रेडिट?","I'd like to exchange it for a larger size.","म ठूलो साइजसँग साट्न चाहन्छु।"],
 ["Let me check whether we have the larger size.","ठूलो साइज छ कि जाँच गर्छु।","Thank you. I appreciate your help.","धन्यवाद। तपाईंको मद्दतको कदर गर्छु।"],
 ["Good news. We have a larger size. Would you like to try it on?","खुसीको खबर। ठूलो साइज छ। लगाएर हेर्नुहुन्छ?","Yes, could you show me the fitting room?","हो, कपडा लगाएर हेर्ने कोठा देखाउनुहुन्छ?"],
 ["How does the new size feel?","नयाँ साइज कस्तो छ?","It fits much better, thank you.","यो धेरै राम्रोसँग मिल्यो, धन्यवाद।"],
 ["I can request an exchange, subject to our return policy. Is that okay?","फिर्ता नियमअनुसार साट्ने अनुरोध गर्न सक्छु। ठीक छ?","Yes, please tell me if anything else is required.","हुन्छ, अरू केही चाहिन्छ भने भन्नुहोस्।"],
 ["Would you like a copy of the exchange details?","साटेको विवरणको प्रति चाहिन्छ?","Yes, an email copy would be helpful.","हो, इमेलमा प्रति भए सजिलो हुन्छ।"],
 ["Is there anything else I can help you with?","अरू केही मद्दत चाहिन्छ?","No, that's everything. Thank you for helping me.","होइन, यति नै हो। मद्दत गर्नुभएकोमा धन्यवाद।"]
 ];
 return pairs.map(([a,b,c,d])=>coachOfflineStep(a,b,c,d));
}
function coachOfflineReview(reply,step,scene){
 const original=String(reply||'').trim();
 const lower=normalize(original),question=normalize(step.npc);
 const negative=/^(no|nope|nah|not really|i do not|i dont|i havent|i have not)\b/.test(lower);
 const affirmative=/^(yes|yeah|yep|sure|of course|i do|i have)\b/.test(lower);
 const isShortAnswer=negative||affirmative;
 const receiptQuestion=scene?.id==='return-shirt'&&/\breceipt\b/.test(question);
 const words=lower.split(' ').filter(Boolean);
 if(words.length<2&&!isShortAnswer)return {accepted:false,corrected:original,why_ne:'पूरा उत्तर लेख्नुहोस्।'};
 let corrected=original.replace(/\s+/g,' ').trim();
 let tip='This is an offline practice suggestion, not an AI grammar check.';
 if(negative&&/^(no|nope|nah)(?:[, ]+i)?(?:[, ]+(?:dont|do not))?$/i.test(lower)){
  corrected=receiptQuestion?"No, I don't have the receipt.":"No, I don't.";
  tip=receiptQuestion?'A complete sentence makes your meaning clearer.':'Add a comma after “No” and a full stop.';
 }else if(/^yes\s+i\s+(?:do|have)$/i.test(lower)){
  corrected=receiptQuestion?'Yes, I have the receipt.':"Yes, I do.";
 }else if(/^i no have (?:the )?receipt\.?$/i.test(lower)){
  corrected="I don't have the receipt.";
  tip='Use “don’t have” instead of “no have.”';
 }else{
  corrected=corrected.replace(/^i\b/,'I');
  if(!/[.!?]$/.test(corrected))corrected+='.';
  if(/^(yes|no)\s+/i.test(corrected))corrected=corrected.replace(/^(Yes|No)\s+/,'$1, ');
 }
 // Do not reject a meaningful self-written answer merely because it
 // disagrees with the authored sample; continue as unverified practice.
 return {accepted:true,corrected,why_ne:tip,
  learner_ne:receiptQuestion&&negative?'होइन, मसँग रसिद छैन।':'',
  mode:'offline',receiptNo:receiptQuestion&&(negative||/\b(?:dont|do not|no|havent|have not)\s+(?:have\s+)?(?:the\s+)?receipt\b/.test(lower))};
}
function coachSafeAIReply(raw){
 if(!raw||typeof raw!=='object')throw Error('AI response is missing');
 const feedback=raw.feedback,follow=raw.next;
 if(!feedback||typeof feedback.accepted!=='boolean'||typeof feedback.corrected!=='string')
  throw Error('Invalid AI feedback');
 const take=(x,n)=>typeof x==='string'?x.slice(0,n).trim():'';
 const next=follow&&typeof follow==='object'?{
  npc:take(follow.npc,280),npcNe:take(follow.npc_ne,350),
  goal:take(follow.goal_ne,300),answer:take(follow.example_en,350),
  answerNe:take(follow.example_ne,350),
  hint:'Respond naturally to the new question in your own words.',
  bad1:'I want to buy a yellow bus.',bad2:'The floor is a funny sandwich.',
  accept:[],after:''
 }:null;
 return {accepted:feedback.accepted,corrected:take(feedback.corrected,450),
  improved:take(feedback.improved,450),why_ne:take(feedback.why_ne,450),
  learner_ne:take(feedback.learner_ne,300),mode:'ai',
  next:next?.npc&&next?.answer&&next?.npcNe?next:null};
}


/* Only authored, context-aware alternatives are marked correct. Opposite
 * truthful answers can be valid but may require a DIFFERENT story path.
 * Do not infer grammar or correctness from a string or keyword match.
 */
function coachBranchDialogue(kind){
 const paths={
  worn:[
   ["Thank you for being honest. Did you wear it outside?","साँचो भन्नुभएकोमा धन्यवाद। बाहिर लगाउनुभएको थियो?","Yes, I wore it outside once.","हो, मैले बाहिर एकपटक लगाएको थिएँ।"],
   ["Do you still have the receipt or an order confirmation?","रसिद वा अर्डर पुष्टि अझै छ?","I can check for the order confirmation.","म अर्डर पुष्टि खोज्न सक्छु।"],
   ["Our policy may not allow returns on used items. Would you like me to explain it?","लगाइसकेको सामान फिर्ता नहुन सक्छ। नियम बुझाइदिऊँ?","Yes, please explain the return policy.","हो, फिर्ता नियम बुझाइदिनुहोस्।"],
   ["I can check if an exchange or store credit is possible. Would that help?","साट्न वा स्टोर क्रेडिट मिल्छ कि जाँच गर्न सक्छु। ठीक छ?","Yes, that would be helpful.","हो, त्यसले मद्दत गर्छ।"],
   ["May I look at the shirt and its tags?","कमिज र ट्याग हेर्न सक्छु?","Of course. Here is the shirt.","अवश्य, यो कमिज हो।"],
   ["I cannot promise a refund, but I can ask my manager. Would you like me to?","पैसा फिर्ता हुने ग्यारेन्टी छैन, तर व्यवस्थापकलाई सोध्न सक्छु। सोधूँ?","Yes, I would appreciate that.","हो, मलाई राम्रो लाग्नेछ।"],
   ["The manager needs to review the condition of the shirt. Do you have time to wait?","व्यवस्थापकले कमिज जाँच्नुपर्छ। पर्खन सक्नुहुन्छ?","Yes, I can wait a few minutes.","हो, केही मिनेट पर्खन सक्छु।"],
   ["We have explained the available options under our policy. Is anything unclear?","नियमअनुसार विकल्पहरू बतायौँ। केही अस्पष्ट छ?","No, I understand the options now.","होइन, अब विकल्पहरू बुझेँ।"],
   ["Is there anything else you would like to ask?","अरू केही सोध्न चाहनुहुन्छ?","No, thank you for explaining everything.","होइन, सबै बुझाउनुभएकोमा धन्यवाद।"]
  ],
  damaged:[
   ["I'm sorry about that. What part of the shirt is damaged?","त्यसका लागि माफ गर्नुहोस्। कमिजको कुन भाग बिग्रेको छ?","The stitching on one sleeve is coming apart.","एउटा बाहुलाको सिलाइ फुस्किरहेको छ।"],
   ["Was it like that when you opened the package?","प्याकेट खोलेदेखि नै त्यस्तै थियो?","Yes, I noticed it when I opened it.","हो, खोलेपछि मैले देखेको थिएँ।"],
   ["Do you have a receipt or order confirmation?","रसिद वा अर्डर पुष्टि छ?","Yes, I can show you my order email.","हो, अर्डर इमेल देखाउन सक्छु।"],
   ["Would you prefer us to inspect it first?","पहिले सामान जाँच गरौँ?","Yes, please check the damaged sleeve.","हो, बिग्रेको बाहुला जाँच्नुहोस्।"],
   ["Would you like to ask about an exchange or a refund?","साट्ने वा पैसा फिर्ताबारे सोध्न चाहनुहुन्छ?","Could you explain both options, please?","कृपया दुवै विकल्प बुझाइदिनुहुन्छ?"],
   ["Availability and returns depend on our policy. Would you like me to check?","सामान र फिर्ता पसलको नियममा भर पर्छ। जाँच गरूँ?","Yes, please check what is possible.","हो, के सम्भव छ जाँचिदिनुहोस्।"],
   ["Is there anything else I can help with today?","आज अरू केही मद्दत गरूँ?","No, thank you for your help.","होइन, मद्दतका लागि धन्यवाद।"]
  ],
  exchange:[
   ["What size would you like instead?","सट्टामा कति साइज चाहिन्छ?","I'd like one size larger, please.","म एक साइज ठूलो चाहन्छु।"],
   ["Would you like to try the larger size?","ठूलो साइज लगाएर हेर्ने?","Yes, may I use the fitting room?","हो, फिटिङ कोठा प्रयोग गर्न सक्छु?"],
   ["Does the larger size fit better?","ठूलो साइज राम्रो मिल्यो?","Yes, this one fits much better.","हो, यो धेरै राम्रो मिल्यो।"],
   ["May I check the receipt and the exchange policy?","रसिद र साट्ने नियम जाँच गरूँ?","Sure. Please let me know what is required.","पक्कै, के चाहिन्छ बताइदिनुहोस्।"],
   ["Would you like a copy of the exchange information?","साटेको विवरणको प्रति चाहिन्छ?","Yes, please send it to my email.","हो, कृपया इमेलमा पठाइदिनुहोस्।"],
   ["Anything else I can help you with?","अरू केही मद्दत गरूँ?","No, that is all. Thank you!","होइन, यति नै हो। धन्यवाद!"]
  ]
 };
 return (paths[kind]||[]).map(([npc,npcNe,answer,answerNe])=>coachOfflineStep(npc,npcNe,answer,answerNe));
}
function coachShuffleOptions(items){
 const copy=items.map(x=>({...x}));
 for(let i=copy.length-1;i>0;i--){
  const j=Math.floor(Math.random()*(i+1));[copy[i],copy[j]]=[copy[j],copy[i]];
 }
 return copy;
}


/* At least one genuine alternate storyline in each of the 28 subjects.
 * Each branch has its own translated follow-up; scripted practice only.
 * All other turns provide equivalent natural phrasings (not fake wrong answers).
 */
const coachSceneAlternateChoices={"buy-phone":{"trigger":"Would you like to hold the phone?","alternatives":[{"value":"Not yet. Could you tell me how heavy it is?","ne":"अहिले होइन। कति भारी छ बताउनुहुन्छ?","followup":["Of course. Would you also like to compare its size with another model?","अवश्य। अर्को मोडलसँग आकार पनि तुलना गर्न चाहनुहुन्छ?","Yes, please show me the smaller model.","हो, सानो मोडल पनि देखाउनुहोस्।"]}]},"directions":{"trigger":"Which entrance are you looking for?","alternatives":[{"value":"I need the accessible side entrance.","ne":"मलाई सजिलै छिर्न मिल्ने छेउको प्रवेशद्वार चाहिन्छ।","followup":["The side entrance is nearby. Would you like step-free directions?","छेउको प्रवेशद्वार नजिकै छ। सिँढी नभएको बाटो बताऊँ?","Yes, a step-free route would be helpful.","हो, सिँढी नभएको बाटो उपयोगी हुन्छ।"]}]},"call-hospital":{"trigger":"Are you an existing patient?","alternatives":[{"value":"No, this would be my first visit.","ne":"होइन, यो मेरो पहिलो भेट हुनेछ।","followup":["Welcome. Would you like me to explain the new-patient registration process?","स्वागत छ। नयाँ बिरामीको दर्ता प्रक्रिया बुझाऊँ?","Yes, please explain the first steps.","हो, सुरुको प्रक्रिया बुझाउनुहोस्।"]}]},"hospital-checkin":{"trigger":"Did you find the correct reception desk?","alternatives":[{"value":"No, I am not sure this is the right desk.","ne":"होइन, यही सही काउन्टर हो कि थाहा छैन।","followup":["No problem. Would you like me to check which department you need?","चिन्ता नगर्नुहोस्। कुन विभाग चाहिन्छ जाँच गरूँ?","Yes, please help me find the right department.","हो, सही विभाग भेट्टाउन मद्दत गर्नुहोस्।"]}]},"restaurant":{"trigger":"Would you like a table by the window?","alternatives":[{"value":"Could we have a quiet table away from the door instead?","ne":"सट्टामा ढोकाबाट टाढाको शान्त टेबल दिनुहुन्छ?","followup":["Certainly. Would a table toward the back work for you?","अवश्य। पछाडितिरको टेबल ठीक हुन्छ?","Yes, that would be lovely. Thank you.","हो, त्यो राम्रो हुन्छ। धन्यवाद।"]}]},"groceries":{"trigger":"Do you have a shopping list today?","alternatives":[{"value":"No, I am just looking for ingredients for dinner.","ne":"होइन, म बेलुकीको खानाका सामग्री हेर्दै छु।","followup":["I can help. Are you looking for vegetables or something else first?","म मद्दत गर्न सक्छु। पहिले तरकारी चाहिएको हो कि अरू केही?","Could you show me the vegetable section?","तरकारी भएको ठाउँ देखाउनुहुन्छ?"]}]},"pharmacy":{"trigger":"Are you picking up a prescription today?","alternatives":[{"value":"Yes, I am here to collect a refill.","ne":"हो, म औषधि फेरि लिन आएको हुँ।","followup":["Of course. Would you like us to check if the refill is ready?","अवश्य। औषधि तयार छ कि जाँच गरौँ?","Yes, please check whether it is ready.","हो, तयार छ कि जाँच गर्नुहोस्।"]}]},"coffee":{"trigger":"Are you ordering for yourself?","alternatives":[{"value":"No, I am ordering drinks for two people.","ne":"होइन, म दुई जनाका लागि पेय अर्डर गर्दै छु।","followup":["Thanks for letting me know. Would you like both drinks in the same size?","जानकारीका लागि धन्यवाद। दुवै पेय एउटै साइजमा चाहिन्छ?","Yes, the same size would be great.","हो, एउटै साइज ठीक हुन्छ।"]}]},"interview":{"trigger":"What interested you in this position?","alternatives":[{"value":"I enjoy learning how technology works and helping people.","ne":"मलाई प्रविधि सिक्न र मानिसलाई मद्दत गर्न मन पर्छ।","followup":["That is useful. Could you share an example of helping someone?","त्यो उपयोगी छ। कसैलाई मद्दत गरेको उदाहरण दिनुहुन्छ?","Yes, I helped a customer solve a phone problem.","हो, मैले ग्राहकको फोनको समस्या समाधान गर्न मद्दत गरेँ।"]}]},"work-shift":{"trigger":"Could you check the delivery list?","alternatives":[{"value":"Yes, but may I count the boxes before I confirm it?","ne":"हो, तर पुष्टि गर्नुअघि बाकस गन्न सक्छु?","followup":["Good idea. Can you tell me if the quantities match afterward?","राम्रो विचार। त्यसपछि संख्या मिल्यो कि बताउनुहुन्छ?","Yes, I will report any missing items.","हो, कम सामान भए जानकारी दिन्छु।"]}]},"take-bus":{"trigger":"Are you waiting for the downtown bus?","alternatives":[{"value":"No, I am waiting for the bus to the airport.","ne":"होइन, म विमानस्थल जाने बस पर्खिरहेको छु।","followup":["This stop serves different routes. Would you like help checking the airport bus?","यहाँ विभिन्न रुटका बस आउँछन्। विमानस्थल जाने बस जाँचौँ?","Yes, please help me check the route.","हो, रुट जाँच्न मद्दत गर्नुहोस्।"]}]},"hotel":{"trigger":"How many nights will you stay?","alternatives":[{"value":"I will be staying for just one night.","ne":"म एक रात मात्र बस्नेछु।","followup":["Thank you. Would you like to know tomorrow's checkout time?","धन्यवाद। भोलिको चेकआउट समय जान्न चाहनुहुन्छ?","Yes, what time should I check out?","हो, कति बजे चेकआउट गर्नुपर्छ?"]}]},"airport":{"trigger":"Are you checking in for your flight?","alternatives":[{"value":"I need to check in, but I cannot find the counter.","ne":"मलाई चेकइन गर्नुछ, तर काउन्टर भेटेको छैन।","followup":["I can help. Would you like directions to the airline counter?","म मद्दत गर्छु। एयरलाइन्स काउन्टरको बाटो चाहिन्छ?","Yes, please tell me where it is.","हो, त्यो कहाँ छ बताउनुहोस्।"]}]},"bank":{"trigger":"What brings you to the branch today?","alternatives":[{"value":"I have a question about the monthly account fee.","ne":"मलाई खाताको मासिक शुल्कबारे प्रश्न छ।","followup":["I can explain the fees. Would you like us to review the recent charge first?","म शुल्क बुझाउन सक्छु। पहिले हालको शुल्क जाँचौँ?","Yes, please explain that charge.","हो, त्यो शुल्क बुझाउनुहोस्।"]}]},"phone-repair":{"trigger":"When did you first notice the problem?","alternatives":[{"value":"The screen started freezing after the phone fell.","ne":"फोन खसेपछि स्क्रिन अड्किन थाल्यो।","followup":["I see. Does it freeze in every app or just one?","बुझेँ। सबै एपमा अड्किन्छ कि एउटामा मात्र?","It happens in several apps.","धेरै एपमा यस्तो हुन्छ।"]}]},"new-friend":{"trigger":"Is this your first time at this event?","alternatives":[{"value":"No, I came here once last year.","ne":"होइन, गत वर्ष पनि एकपटक आएको थिएँ।","followup":["Welcome back! Did you enjoy the event last year?","फेरि स्वागत छ! गत वर्षको कार्यक्रम रमाइलो लागेको थियो?","Yes, I met some friendly people.","हो, केही मिलनसार मानिस भेटेको थिएँ।"]}]},"school-help":{"trigger":"What part of the lesson is difficult?","alternatives":[{"value":"I understand the sentences, but I am confused about verb tenses.","ne":"म वाक्य बुझ्छु, तर क्रियाको कालमा अलमल हुन्छ।","followup":["Let's work on that. Would you like to compare past and present tense?","त्यसैमा अभ्यास गरौँ। भूत र वर्तमान काल तुलना गर्ने?","Yes, an example would help.","हो, उदाहरणले मद्दत गर्छ।"]}]},"rent-home":{"trigger":"What is your preferred move-in date?","alternatives":[{"value":"I can move in as soon as the apartment is available.","ne":"घर खाली हुनासाथ सर्न सक्छु।","followup":["Understood. Would you like to discuss the earliest possible move-in date?","बुझेँ। सबैभन्दा चाँडो सर्न सकिने मितिबारे कुरा गर्ने?","Yes, please tell me the earliest date.","हो, सबैभन्दा चाँडो मिति बताउनुहोस्।"]}]},"home-internet":{"trigger":"How many people use the internet at home?","alternatives":[{"value":"Four people use it for work and school.","ne":"घरमा चार जनाले काम र पढाइका लागि इन्टरनेट चलाउँछन्।","followup":["Thanks. Do several people make video calls at the same time?","धन्यवाद। धेरै जनाले एकै समयमा भिडियो कल गर्छन्?","Yes, that happens often in our home.","हो, हाम्रो घरमा त्यो प्रायः हुन्छ।"]}]},"delivery-help":{"trigger":"What item are you waiting for?","alternatives":[{"value":"I am waiting for a winter jacket.","ne":"म जाडोको ज्याकेट पर्खिरहेको छु।","followup":["Thanks. Was the jacket part of one order or several packages?","धन्यवाद। त्यो ज्याकेट एउटै अर्डरको हो कि धेरै प्याकेजको?","It was part of one order.","त्यो एउटै अर्डरको भाग थियो।"]}]},"dental-office":{"trigger":"Is this your first visit to our office?","alternatives":[{"value":"No, I visited this dental office last year.","ne":"होइन, म गत वर्ष यो दन्त क्लिनिक आएको थिएँ।","followup":["Welcome back. Would you like us to check your previous appointment information?","फेरि स्वागत छ। अघिल्लो भेटको विवरण जाँचौँ?","Yes, please check the previous record.","हो, अघिल्लो विवरण जाँच्नुहोस्।"]}]},"parent-meeting":{"trigger":"How has your child been doing at home?","alternatives":[{"value":"My child enjoys math but needs extra help with reading.","ne":"मेरो बच्चालाई गणित मन पर्छ, तर पढाइमा थप मद्दत चाहिन्छ।","followup":["Thank you. Would you like some easy reading practice ideas for home?","धन्यवाद। घरमा पढ्ने सजिला अभ्यासका सुझाव चाहिन्छ?","Yes, please recommend some activities.","हो, केही अभ्यास सुझाउनुहोस्।"]}]},"shift-request":{"trigger":"Which day do you need off?","alternatives":[{"value":"Could I take next Monday off instead of Friday?","ne":"शुक्रबारको सट्टा अर्को सोमबार बिदा लिन सक्छु?","followup":["I can review Monday. Is this for a personal appointment?","सोमबारको कुरा जाँच्न सक्छु। के व्यक्तिगत भेटका लागि हो?","Yes, I have an appointment that day.","हो, त्यो दिन मेरो भेट छ।"]}]},"card-lost":{"trigger":"When did you notice your card was missing?","alternatives":[{"value":"I realized it was gone last night.","ne":"हिजो राति कार्ड हराएको थाहा पाएँ।","followup":["Thank you. Have you noticed any account activity since last night?","धन्यवाद। हिजो रातिदेखि खातामा कुनै कारोबार देख्नुभयो?","I have not checked yet. I will review it.","अहिलेसम्म जाँचेको छैन। अब जाँच्छु।"]}]},"send-mail":{"trigger":"Where are you sending this package?","alternatives":[{"value":"I am sending it to my friend in India.","ne":"म यो प्याकेज भारतमा साथीलाई पठाउँदै छु।","followup":["Thanks. Would you like to compare the available international shipping services?","धन्यवाद। अन्तर्राष्ट्रिय ढुवानी विकल्प तुलना गर्ने?","Yes, please show me the available options.","हो, उपलब्ध विकल्प देखाउनुहोस्।"]}]},"car-repair":{"trigger":"What seems to be wrong with your car?","alternatives":[{"value":"The brakes squeal when I slow down.","ne":"गति घटाउँदा ब्रेकबाट चर्को आवाज आउँछ।","followup":["Thank you. Is the sound worse when the brakes are cold?","धन्यवाद। ब्रेक चिसो हुँदा आवाज बढी आउँछ?","Yes, I notice it early in the morning.","हो, बिहान त्यो बढी सुनिन्छ।"]}]},"library":{"trigger":"Are you looking for fiction or nonfiction?","alternatives":[{"value":"I would prefer a short nonfiction book about nature.","ne":"मलाई प्रकृतिबारे छोटो गैरकाल्पनिक किताब चाहिन्छ।","followup":["Nice choice. Would you like a book with pictures or mostly text?","राम्रो छनोट। चित्रसहितको किताब चाहिन्छ कि लेख मात्रै भएको?","A book with pictures would help me understand.","चित्रसहितको किताब भए बुझ्न सजिलो हुन्छ।"]}]}};
function coachFollowUpStep(details){
 if(!Array.isArray(details)||details.length!==4)return null;
 return coachOfflineStep(...details);
}
function coachReplyVariations(value){
 const a=String(value||'').trim();
 if(!a)return [];
 const forms=new Set([a]);
 const add=next=>{if(next&&normalize(next)!==normalize(a))forms.add(next);};
 if(/^thank you[.!]?$/i.test(a)||/^thanks[.!]?$/i.test(a)){
  add('Thanks a lot.');add('Thank you very much.');
  return Array.from(forms);
 }
 if(/^no,?\s*thank you[.!]?$/i.test(a)){
  add("No thanks, I'm all set.");add("I'm okay, thank you.");
  return Array.from(forms);
 }
 if(/^yes[,.!?]?\s*/i.test(a)){
  const rest=a.replace(/^yes[,.!?]?\s*/i,'');
  if(rest){add('Yes, of course. '+rest.charAt(0).toUpperCase()+rest.slice(1));
   add('Absolutely. '+rest.charAt(0).toUpperCase()+rest.slice(1));}
  else {add('Yes, certainly.');add('Yes, absolutely.');}
  return Array.from(forms);
 }
 if(/^no[,.!?]?\s*/i.test(a)){
  const rest=a.replace(/^no[,.!?]?\s*/i,'');
  if(rest){add('Actually, no. '+rest.charAt(0).toUpperCase()+rest.slice(1));
   add("I'm afraid not. "+rest.charAt(0).toUpperCase()+rest.slice(1));}
  else{add('No, thank you.');add('Not this time, thank you.');}
  return Array.from(forms);
 }
 const replacements=[
  [/^I'd like /i,'I would like '],[/^I would like /i,"I'd like "],
  [/^I'd prefer /i,'I would prefer '],[/^I would prefer /i,"I'd prefer "],
  [/^Could you /i,'Can you '],[/^Can you /i,'Could you '],
  [/^Could I /i,'May I '],[/^May I /i,'Could I '],
  [/^I'm /i,'I am '],[/^I've /i,'I have '],[/^I'll /i,'I will '],
  [/^I don't /i,'I do not '],[/^I can't /i,'I cannot '],
  [/^It's /i,'It is '],[/^That's /i,'That is '],
  [/^Thanks,/i,'Thank you,'],[/^Thank you,/i,'Thanks,'],
  [/^I want to /i,"I'd like to "],[/^I'd like to /i,'I would like to ']
 ];
 for(const [pattern,replacement] of replacements)if(pattern.test(a))add(a.replace(pattern,replacement));
 if(/^I(?:\s|')/i.test(a)&&a.length>=12)
  add('Well, '+a);
 if(/^Could you |^Can you /i.test(a))
  add(a.replace(/^(?:Could|Can) you /i,'Would you please '));
 if(/^I'd like |^I would like |^I want /i.test(a))
  add('If possible, '+a);
 if(!/^well,|^thank|^thanks|^sure/i.test(a)&&a.length>=18)
  add('To clarify, '+a);
 // For rare short phrases there may not be a direct grammatical rewrite.
 // Distinct, polite context does not change the learner's underlying fact.
 if(forms.size<3)add('Well, '+a);
 if(forms.size<3)add('To be clear, '+a);
 return Array.from(forms).slice(0,3);
}
function coachEquivalentReply(sentence){
 const value=String(sentence||'').trim();
 const changes=[
  [/^I'd like to /i,'I would like to '],
  [/^I'd like /i,'I would like '],
  [/^Could you /i,'Can you '],
  [/^Could I /i,'May I '],
  [/^I'm /i,'I am '],
  [/^It's /i,'It is '],
  [/^I've /i,'I have '],
  [/^I don't /i,'I do not '],
  [/^I can't /i,'I cannot '],
  [/^I want to /i,"I'd like to "],
  [/^Thank you /i,'Thanks ']
 ];
 for(const [pattern,replacement] of changes){
  if(pattern.test(value))return value.replace(pattern,replacement);
 }
 return '';
}

function coachReplyOptions(step,scene){
 if(scene?.isBranchingV4&&window.sikauV4Story)return window.sikauV4Story.options(step);
 if(scene?.isBranchingStore&&window.sikauStoreStory)return window.sikauStoreStory.options(step);
 if(scene?.isBranchingStory&&window.sikauAdaptiveStory)return window.sikauAdaptiveStory.options(step);
 const line=normalize(step.npc),sceneId=scene?.id;
 const choice=(value,ne,branch=null,followup=null)=>({
  value,ne,correct:true,branch,followup
 });
 // These situations really do have different possible outcomes: model the
 // consequences instead of pretending one predetermined answer is correct.
 if(sceneId==='return-shirt'){
  if(/\bshirt\b/.test(line)&&/\bunworn\b/.test(line))
   return {multi:true,branching:true,options:coachShuffleOptions([
    choice("Yes, I only tried it on at home.","हो, मैले घरमा लगाएर मात्र हेरेको थिएँ।"),
    choice("Yes, it is still unworn and the tags are attached.","हो, यो अझै नलगाइएको छ र ट्याग पनि छ।"),
    choice("No, I wore it outside once.","होइन, मैले बाहिर एकपटक लगाइसकेको छु।","worn")
   ])};
  if(/\breceipt\b/.test(line)&&/\b(?:have|still|bring)\b/.test(line))
   return {multi:true,branching:true,options:coachShuffleOptions([
    choice("Yes, I have the receipt right here.","हो, रसिद यहीँ छ।"),
    choice("I have a digital receipt on my phone.","फोनमा डिजिटल रसिद छ।"),
    choice("No, I don't have the receipt anymore.","होइन, मसँग अब रसिद छैन।","receipt_missing")
   ])};
  if(/\b(?:damaged|wrong size)\b/.test(line))
   return {multi:true,branching:true,options:coachShuffleOptions([
    choice("The size doesn't fit me.","यो साइज मलाई मिल्दैन।"),
    choice("The stitching is damaged.","यसको सिलाइ बिग्रेको छ।","damaged"),
    choice("I received the wrong color.","मैले फरक रङ पाएँ।",null,
      ["I'm sorry. Would you like to check the color you originally ordered?","माफ गर्नुहोस्। सुरुमा मागेको रङ जाँच्ने?",
       "Yes, I ordered a blue shirt.","हो, मैले नीलो कमिज मागेको थिएँ।"])
   ])};
  if(/\brefund\b/.test(line)&&/\bexchange\b/.test(line))
   return {multi:true,branching:true,options:coachShuffleOptions([
    choice("I'd prefer a refund, please.","म पैसा फिर्ता चाहन्छु।"),
    choice("I'd like to exchange it for a larger size.","म ठूलो साइजसँग साट्न चाहन्छु।","exchange"),
    choice("Could you explain both options before I decide?","निर्णय गर्नुअघि दुवै विकल्प बुझाइदिनुहुन्छ?",null,
     ["Of course. Would you like me to start with the exchange policy?","अवश्य। पहिले साट्ने नियम बताऊँ?",
      "Yes, please explain the exchange policy first.","हो, कृपया पहिले साट्ने नियम बुझाउनुहोस्।"])
   ])};
  if(/\bwas it bought online or in our store\b/.test(line))
   return {multi:true,branching:true,options:coachShuffleOptions([
    choice("I bought it in this store.","मैले यही पसलमा किनेको हुँ।",null,
      ["Thanks. Do you remember which branch you visited?","धन्यवाद। कुन शाखामा किन्नुभएको थियो थाहा छ?",
       "I bought it at the downtown branch.","मैले सहरको मुख्य शाखामा किनेको थिएँ।"]),
    choice("I ordered it online.","मैले अनलाइन अर्डर गरेको थिएँ।",null,
      ["I understand. Can you find your order confirmation email?","बुझेँ। अर्डर पुष्टि इमेल भेट्टाउन सक्नुहुन्छ?",
       "Yes, let me check my inbox.","हो, इमेलको इनबक्स हेर्छु।"]),
    choice("It was a gift, so I am not sure where it was bought.","यो उपहार थियो, कहाँ किनिएको हो थाहा छैन।",null,
      ["No problem. Can you ask the person who gave it to you for a gift receipt?","ठीक छ। उपहार दिने व्यक्तिसँग रसिद माग्न सक्नुहुन्छ?",
       "Yes, I can ask them about the receipt.","हो, रसिदबारे उहाँलाई सोध्न सक्छु।"])
   ])};
  if(/\bwhen did you purchase this shirt\b/.test(line))
   return {multi:true,branching:false,options:coachShuffleOptions([
    choice("I bought it last weekend.","मैले गएको सप्ताहन्त किनेको हुँ।"),
    choice("I bought it yesterday.","मैले हिजो किनेको हुँ।"),
    choice("I purchased it two weeks ago.","मैले दुई हप्ताअघि किनेको हुँ।")
   ])};
 }
 const special=coachSceneAlternateChoices[sceneId];
 const trigger=special&&normalize(special.trigger);
 if(trigger&&line.includes(trigger)){
  const base=choice(step.answer,step.answerNe);
  const alternatives=special.alternatives.map(v=>choice(v.value,v.ne,null,v.followup));
  const equivalent=coachReplyVariations(step.answer)
   .find(v=>normalize(v)!==normalize(step.answer));
  if(equivalent)alternatives.push(choice(equivalent,step.answerNe));
  return {multi:true,branching:true,options:coachShuffleOptions([base,...alternatives].slice(0,3))};
 }
 // Default: three *real*, meaning-preserving ways of saying the same thing.
 // Never invent a false statement or a nonsensical distractor. The next
 // question stays scripted because the underlying meaning did not change.
 const variants=coachReplyVariations(step.answer);
 const options=variants.slice(0,3).map(v=>choice(v,step.answerNe));
 return {multi:true,branching:false,options:coachShuffleOptions(options)};
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
/* Hide only the retired native Coach adventure picker shown beneath the
 * real-life practice section. Original scoring, conversations, and other
 * lessons remain untouched. This is repeated safely after native rerenders. */
function hideRedundantCoachAdventurePanel(doc){
 if(!doc?.body)return 0;
 // The legacy picker can appear outside #coach in some protected builds,
 // including while the separate Visa Interview destination is selected.
 // Search the rendered document rather than assuming a particular page root.
 const labels=doc.querySelectorAll('h1,h2,h3,h4,h5,h6,strong,b,[role="heading"],.section-title,.card-title');
 let hidden=0;
 for(const heading of labels){
  if(!/Choose your learning adventure/i.test((heading.textContent||'').trim())||
     heading.closest('[data-sikau-retired-adventure-hidden="true"]'))continue;
  let panel=heading.parentElement, depth=0;
  while(panel&&panel!==doc.body&&depth++<10){
   const copy=panel.textContent||'';
   if(copy.includes('Mistake Garden')&&copy.includes('Your English Life')){
    // Only remove the small legacy adventure section. Never hide the native
    // Coach page, the Visa question hub, or the replacement conversation UI.
    if(copy.length>4000||panel.id==='coach'||panel.id==='coachRoot'||
       panel.matches('.page,[data-page],.sikau-convo,.sikau-visa-main')||
       panel.querySelector('#sikauCoachConversations,.sikau-visa-main'))break;
    panel.hidden=true;
    panel.style.setProperty('display','none','important');
    panel.setAttribute('aria-hidden','true');
    panel.setAttribute('data-sikau-retired-adventure-hidden','true');
    hidden++;
    break;
   }
   panel=panel.parentElement;
  }
 }
 return hidden;
}
window.enhanceCoachDashboard=function(doc,_firstName,verifiedStudentId){
 if(!doc?.body||!doc.head)return;
 hideRedundantCoachCultureLab(doc);
 hideRedundantCoachAdventurePanel(doc);
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

 // The parent app supplies the first name from its verified signed-in user.
 // Never mutate the global scenarios: another learner might sign in later.
 const signedInFirstName=typeof _firstName==='string'?
  _firstName.trim().split(/\s+/u)[0].replace(/[<>\u0000-\u001f]/g,'').slice(0,32):'';
 const coachLearnerName=signedInFirstName||'Learner';
 const introText=text=>{
  if(typeof text!=='string')return text;
  return text.replace(/\bSita\b/gi,coachLearnerName)
   .replace(/सीता/g,coachLearnerName)
   .replace(/नाम काल्पनिक राख्न सकिन्छ।/g,'आफ्नै नाम प्रयोग गर्नुहोस्।')
   .replace(/आफ्नो नाम काल्पनिक राखेर परिचय दिनुहोस्।/g,'आफ्नै नाम प्रयोग गरेर परिचय दिनुहोस्।');
 };
 const personalizeCoachStep=step=>{
  if(!step||typeof step!=='object')return step;
  const updated={...step};
  for(const key of ['npc','npcNe','answer','answerNe','after','goal','hint'])
   if(typeof updated[key]==='string')updated[key]=introText(updated[key]);
  // A name requested in a hotel or café should also use this learner's
  // signed-in first name, not a generic 'under my name' placeholder.
  if(/may i have your booking name\?/i.test(updated.npc||'')){
   updated.answer='The booking is under '+coachLearnerName+'.';
   updated.answerNe='बुकिङ '+coachLearnerName+' को नाममा छ।';
  }
  if(/should we call your name when it.s ready\?/i.test(updated.npc||'')){
   updated.answer='Yes, please call '+coachLearnerName+' when it is ready.';
   updated.answerNe='हो, तयार भएपछि '+coachLearnerName+' भनेर बोलाउनुहोस्।';
  }
  if(Array.isArray(step.accept))updated.accept=step.accept.map(introText);
  if(Array.isArray(step.storeOptions))
   updated.storeOptions=step.storeOptions.map(item=>({
    ...item,value:introText(item.value),ne:introText(item.ne)
   }));
  return updated;
 };
 let dialogueHistory=[];
 let pendingChoice=null;
 let active=null,index=0,category='All',search='',mode='choose',showNepali=true,attempts=0,successful=0,finished=false,choices=[],choiceError='',typedError='',reveal=false;

 // Saved locally in THIS browser and scoped to the parent-verified Appwrite
 // account. Never store account credentials, paid labels, trial times or XP.
 const coachDrafts=window.sikauCoachDrafts?.make(verifiedStudentId,scenarios)||null;
 function saveDraft(){
  if(!active||finished)return;
  coachDrafts?.save({active,index,history:dialogueHistory,attempts,successful,pendingChoice});
 }
 function restoreDraft(saved){
  const scene=scenarios.find(x=>x.id===saved.sceneId);
  if(!scene)return;
  // An untouched draft from the previous scripted version should get the
  // new context-first dialogue. Never discard a conversation with replies.
  const untouched=saved.index===0&&!saved.pendingChoice&&
   !saved.history?.some(entry=>entry&&entry.reply);
  const oldClothing=saved.sceneId==='return-shirt'&&
   /how can i help you with this shirt today/i.test(saved.steps?.[0]?.npc||'');
  const oldFixedTopic=saved.sceneId!=='return-shirt'&&!saved.isBranchingStory&&!saved.isBranchingV4;
  if(untouched&&(oldClothing||oldFixedTopic)){
   coachDrafts?.remove();start(scene);return;
  }
  const state=Object.assign(Object.create(null),saved.storeState||{});
  active={...scene,coachOriginal:scene,steps:saved.steps.map(personalizeCoachStep),
   coachPracticeNumber:Number.isSafeInteger(saved.practiceNumber)?saved.practiceNumber:1,
   coachRound:Number.isSafeInteger(saved.coachRound)?saved.coachRound:0,
   coachStyle:typeof saved.coachStyle==='string'?saved.coachStyle.slice(0,100):'Conversation',
   isBranchingStore:!!saved.isBranchingStore,storeState:state,
   isBranchingV4:!!saved.isBranchingV4,v4State:saved.v4State||null,
   v4Completed:!!saved.v4Completed,v4FinalReply:saved.v4FinalReply||'',
   storeCompleted:!!saved.storeCompleted,
   isBranchingStory:!!saved.isBranchingStory,storyState:saved.storyState||{scene:scene.id,path:0,detail:null},
   storyCompleted:!!saved.storyCompleted};
  index=saved.index;dialogueHistory=saved.history.map(entry=>entry&&({
   ...entry,reply:introText(entry.reply),learnerNe:introText(entry.learnerNe),
   answerNe:introText(entry.answerNe)
  }));
  attempts=Number.isSafeInteger(saved.attempts)?saved.attempts:0;
  successful=Number.isSafeInteger(saved.successful)?saved.successful:0;
  pendingChoice=saved.pendingChoice&&typeof saved.pendingChoice.value==='string'?
   {value:introText(saved.pendingChoice.value),ne:introText(String(saved.pendingChoice.ne||''))}:null;
  finished=false;choices=[];reveal=false;choiceError='';typedError='';
  // Refresh the current prompt after dialogue updates, never erase past chat.
  // A previously selected answer stays unchanged on resume.
  const upgraded=active.isBranchingStore?
   window.sikauStoreStory?.reconcile?.(active,index,pendingChoice):
   active.isBranchingStory?
   window.sikauAdaptiveStory?.reconcile?.(active,index,pendingChoice):false;
  if(upgraded)saveDraft();
  browser.hidden=true;stage.hidden=false;
  shell.classList.add('sikau-convo-learning');
  renderStage();
  stage.scrollIntoView?.({behavior:'smooth',block:'start'});
 }
 function showSavedConversation(){
  resumeHost.replaceChildren();
  const saved=coachDrafts?.read();
  if(!saved){resumeHost.hidden=true;return}
  resumeHost.hidden=false;
  const scene=scenarios.find(x=>x.id===saved.sceneId);
  const row=add(doc,resumeHost,'div','sikau-convo-resume-card');
  const copy=add(doc,row,'div','sikau-convo-resume-copy');
  add(doc,copy,'strong','','💾 Saved conversation · अघिल्लो कुराकानी');
  add(doc,copy,'p','',scene.emoji+' '+scene.title+' · Turn '+(saved.index+1)+
   ' · Your conversation and choices are saved in this browser.');
  add(doc,copy,'small','','पहिलेको संवाद जारी राख्नुहोस् वा सुरुदेखि नयाँ सुरु गर्नुहोस्।');
  const actions=add(doc,row,'div','sikau-convo-resume-actions');
  const resume=add(doc,actions,'button','sikau-convo-primary','▶ Resume · जारी राख्नुहोस्');
  resume.type='button';resume.addEventListener('click',()=>{
   const latest=coachDrafts?.read();
   if(latest)restoreDraft(latest);else showSavedConversation();
  });
  const restart=add(doc,actions,'button','sikau-convo-secondary','↻ Start over · फेरि सुरु');
  restart.type='button';restart.addEventListener('click',()=>{
   coachDrafts?.remove();start(scene);
  });
 }


 let lastId=null;

 // Per-topic practice counters; no answers, login, payments or progress stored.
 const coachRoundStorage='english-sikau-coach-round-v1';
 const topicHistoryStorage='english-sikau-coach-topic-history-v2';
 let coachRoundMemory=Object.create(null),recentTopics=[];
 try{
  const fromStorage=JSON.parse(doc.defaultView.localStorage.getItem(coachRoundStorage)||'{}');
  if(fromStorage&&typeof fromStorage==='object'&&!Array.isArray(fromStorage)){
   for(const [id,n] of Object.entries(fromStorage))
    if(Number.isSafeInteger(n)&&n>=0&&n<1000000)coachRoundMemory[id]=n;
  }
  const history=JSON.parse(doc.defaultView.localStorage.getItem(topicHistoryStorage)||'[]');
  if(Array.isArray(history))recentTopics=history.filter(id=>typeof id==='string'&&scenarios.some(s=>s.id===id)).slice(-8);
 }catch(_){/* Guided practice works without storage. */}
 function coachNextConversation(scene){
  const original=scene.coachOriginal||scene;
  const rounds=[original.steps,...(coachRoundsById[original.id]||[])];
  const prior=coachRoundMemory[original.id];
  const practiceNumber=Number.isSafeInteger(prior)?prior+1:0;
  const round=practiceNumber%rounds.length;
  coachRoundMemory[original.id]=practiceNumber;
  try{doc.defaultView.localStorage.setItem(coachRoundStorage,JSON.stringify(coachRoundMemory))}catch(_){}
  // Reviewed V4 dialogue is currently enabled in English-only mode.
  // Keep the established bilingual engine for the other three modes until
  // the reviewed V4 lines have accurate Nepali translations.
  // The actual preference control inside the lesson frame is authoritative;
  // the HTML data attribute may not have been populated on first Coach open.
  const selectMode=doc.getElementById('langPref')?.value;
  const languageMode=['en','en-ne','en-roman','all'].includes(selectMode)?
   selectMode:(doc.defaultView?.__sikauLanguageDisplay?.getMode?.()||
    doc.documentElement?.getAttribute('data-sikau-display-language')||'en-ne');
  if(languageMode==='en'&&window.sikauV4Story){
   const story=window.sikauV4Story.start(original);
   if(story){story.coachPracticeNumber=practiceNumber+1;return story;}
  }
  if(original.id==='return-shirt'&&window.sikauStoreStory){
   const story=window.sikauStoreStory.start(original);
   story.coachPracticeNumber=practiceNumber+1;
   return story;
  }
  if(window.sikauAdaptiveStory){
   const story=window.sikauAdaptiveStory.start(original);
   if(story){
    story.coachPracticeNumber=practiceNumber+1;
    return story;
   }
  }
  const styles=['Everyday speaking','Ask more questions','Solve it politely'];
  return {...original,coachOriginal:original,coachRound:round,
   coachPracticeNumber:practiceNumber+1,coachStyle:styles[round],coachTotalRounds:rounds.length,
   steps:coachExtendedSteps(original,round,practiceNumber)};
 }


 const top=add(doc,shell,'header','sikau-convo-hero');
 const copy=add(doc,top,'div','sikau-convo-hero-copy');
 add(doc,copy,'div','sikau-convo-kicker','ENGLISH SIKAU · REAL-LIFE PRACTICE');
 add(doc,copy,'h2','','Speak English for real life');
 add(doc,copy,'p','','अंग्रेजीमा वास्तविक जीवनका कुराकानी सिकौं');
 add(doc,copy,'small','','Practice a full English conversation. Read earlier dialogue, reply naturally and continue the story.');
 const actions=add(doc,top,'div','sikau-convo-hero-actions');
 const surprise=add(doc,actions,'button','sikau-convo-surprise','🎲 Surprise scenario · नयाँ परिस्थिति');
 surprise.type='button';
 const ai=add(doc,actions,'button','sikau-convo-ai','✨ Ask AI Coach · प्रश्न सोध्नुहोस्');
 ai.type='button';
 const banner=add(doc,shell,'div','sikau-convo-intro');
 add(doc,banner,'strong','','Pick a place, then start talking · ठाउँ छानेर कुराकानी सुरु गर्नुहोस्');
 // Nepali translations remain visible by default, without a separate Coach toggle.
 const browser=add(doc,shell,'section','sikau-convo-browser');
 const filters=add(doc,browser,'div','sikau-convo-filters');
 const topicsRow=add(doc,filters,'div','sikau-convo-topics');
 const searchBox=add(doc,filters,'label','sikau-convo-search');
 add(doc,searchBox,'span','','🔎');
 const searchInput=add(doc,searchBox,'input','','');searchInput.type='search';searchInput.placeholder='Search: hospital, restaurant, directions…';
 searchInput.setAttribute('aria-label','Search real life situations');
 add(doc,filters,'p','sikau-convo-variety-hint',scenarios.length+' real-life topics · Choose a category or search · English + नेपाली · Conversations follow your choices.');
 const resumeHost=add(doc,browser,'div','sikau-convo-resume-host');resumeHost.hidden=true;
 const cards=add(doc,browser,'div','sikau-convo-cards');
 const pagination=add(doc,browser,'nav','sikau-convo-pagination');
 pagination.setAttribute('aria-label','Real-life situation pages · विषयका पृष्ठहरू');
 const pageSummary=add(doc,pagination,'p','sikau-convo-page-summary','');
 pageSummary.setAttribute('role','status');
 pageSummary.setAttribute('aria-live','polite');
 const pageControls=add(doc,pagination,'div','sikau-convo-page-controls');
 const prevPage=add(doc,pageControls,'button','sikau-convo-page-nav','← Previous');
 prevPage.type='button';prevPage.setAttribute('aria-label','Previous page');
 const pageNumbers=add(doc,pageControls,'div','sikau-convo-page-numbers');
 const nextPage=add(doc,pageControls,'button','sikau-convo-page-nav','Next →');
 nextPage.type='button';nextPage.setAttribute('aria-label','Next page');
 let currentPage=1;
 function changePage(to){
  const next=window.sikauCoachPagination.paginate(filtered(),to).page;
  if(next===currentPage)return;
  currentPage=next;drawCards();
  cards.scrollIntoView?.({behavior:'smooth',block:'start'});
 }
 prevPage.addEventListener('click',()=>changePage(currentPage-1));
 nextPage.addEventListener('click',()=>changePage(currentPage+1));
 const footer=add(doc,browser,'p','sikau-convo-list-note','All answer options are meaningful English responses. Different choices can lead to different real-life follow-ups. · हरेक विकल्प सही सन्दर्भमा प्रयोग गर्न सकिन्छ।');
 const stage=add(doc,shell,'section','sikau-convo-stage');stage.hidden=true;
 const notice=add(doc,shell,'p','sikau-convo-global-status','');notice.setAttribute('role','status');
 function filtered(){
  return scenarios.filter(s=>(category==='All'||s.category===category)&&
   (!search||normalize([s.title,s.ne,s.place,s.category,s.partner,s.keywords||''].join(' ')).includes(normalize(search))||
   [s.title,s.ne,s.place,s.partner].join(' ').toLowerCase().includes(search.toLowerCase())));
 }
 function drawTopics(){
  topicsRow.replaceChildren();
  for(const item of topics){
   const b=add(doc,topicsRow,'button','sikau-convo-topic'+(category===item?' active':''),item);
   b.type='button';b.setAttribute('aria-pressed',String(category===item));
   b.addEventListener('click',()=>{category=item;currentPage=1;drawTopics();drawCards();});
  }
 }
 function drawCards(){
  cards.replaceChildren();
  const view=window.sikauCoachPagination.paginate(filtered(),currentPage);
  currentPage=view.page;
  pageNumbers.replaceChildren();
  pagination.hidden=view.pages<=1||view.total===0;
  if(!view.total){
   add(doc,cards,'p','sikau-convo-empty','No matching situation. Try a different topic. · अर्को विषय खोज्नुहोस्।');
   return;
  }
  for(const s of view.items){
   const b=add(doc,cards,'button','sikau-convo-situation');b.type='button';
   b.setAttribute('aria-label',s.title+' · '+s.ne);
   add(doc,b,'span','sikau-convo-situation-icon',s.emoji);
   const body=add(doc,b,'span','sikau-convo-situation-main');
   add(doc,body,'strong','',s.title);
   add(doc,body,'small','',s.ne);
   add(doc,b,'span','sikau-convo-situation-meta',s.level+' · Your choices guide the conversation');
   b.addEventListener('click',()=>start(s));
  }
  pageSummary.textContent='Showing '+(view.start+1)+'–'+view.end+' of '+view.total+
   ' topics · Page '+view.page+' of '+view.pages+' · पृष्ठ '+view.page;
  prevPage.disabled=view.page===1;
  nextPage.disabled=view.page===view.pages;
  for(let number=1;number<=view.pages;number++){
   const b=add(doc,pageNumbers,'button','sikau-convo-page-number',String(number));
   b.type='button';
   b.setAttribute('aria-label','Go to page '+number+' of '+view.pages);
   if(number===view.page){
    b.setAttribute('aria-current','page');
    b.setAttribute('aria-label','Current page '+number+' of '+view.pages);
   }
   b.addEventListener('click',()=>changePage(number));
  }
  // Center the active page in the compact, horizontally scrollable mobile pager.
  const selected=pageNumbers.querySelector('[aria-current="page"]');
  if(selected)pageNumbers.scrollLeft=Math.max(0,selected.offsetLeft-pageNumbers.offsetLeft-
   (pageNumbers.clientWidth-selected.clientWidth)/2);
 }
 function resetStage(){
  dialogueHistory=[];
  index=0;attempts=0;successful=0;finished=false;pendingChoice=null;choices=[];choiceError='';typedError='';reveal=false;
 }
 function start(scene){
  lastId=scene.id;
  recentTopics=recentTopics.filter(id=>id!==scene.id).concat(scene.id).slice(-8);
  try{doc.defaultView.localStorage.setItem(topicHistoryStorage,JSON.stringify(recentTopics))}catch(_){}
  active=coachNextConversation(scene);
  active.steps=active.steps.map(personalizeCoachStep);
  resetStage();
  browser.hidden=true;stage.hidden=false;
  shell.classList.add('sikau-convo-learning');
  saveDraft();renderStage();stage.scrollIntoView?.({behavior:'smooth',block:'start'});
 }
 function back(){
  active=null;stage.hidden=true;browser.hidden=false;shell.classList.remove('sikau-convo-learning');
  drawCards();showSavedConversation();
 }
 function goNext(){
  if(!active)return;
  if(!dialogueHistory[index])dialogueHistory[index]={reply:active.steps[index].answer,kind:'example'};
  if((active.isBranchingV4&&active.v4Completed)||(active.isBranchingStore&&active.storeCompleted)||(active.isBranchingStory&&active.storyCompleted)){finished=true;}else if(index>=active.steps.length-1){finished=true;}else{index++;choices=[];choiceError='';typedError='';reveal=false;}
  pendingChoice=null;
  if(finished)coachDrafts?.remove();else saveDraft();
  renderStage();
 }
 function renderStage(){
  stage.replaceChildren();
  if(!active)return;
  const head=add(doc,stage,'div','sikau-convo-stage-head');
  const backBtn=add(doc,head,'button','sikau-convo-back','← All situations · सबै विषय');backBtn.type='button';backBtn.addEventListener('click',back);
  const restartButton=add(doc,head,'button','sikau-convo-secondary sikau-convo-restart','↻ Restart · सुरुदेखि');
  restartButton.type='button';restartButton.addEventListener('click',()=>{
   if(doc.defaultView?.confirm?.('Start this conversation over? Your previous messages in this story will be replaced.')){
    const scene=active.coachOriginal||active;coachDrafts?.remove();start(scene);
   }
  });
  const meta=add(doc,head,'div','sikau-convo-stage-meta');
  add(doc,meta,'strong','',active.emoji+' '+active.title);
  if(showNepali)add(doc,meta,'small','',active.ne+' · '+active.place);
  add(doc,meta,'small','sikau-convo-round-label','Practice #'+active.coachPracticeNumber+' · '+active.coachStyle+((active.isBranchingV4||active.isBranchingStore||active.isBranchingStory)?' · Choices shape the conversation':' · Flexible practice'));
  if(finished){
   const done=add(doc,stage,'div','sikau-convo-complete');
   add(doc,done,'div','sikau-convo-complete-icon','🏆');
   add(doc,done,'h3','','You finished the conversation!');
   if(active.isBranchingV4&&active.v4FinalReply)
    add(doc,done,'p','sikau-convo-final-reply',(active.partner||'Conversation partner')+': '+active.v4FinalReply);
   add(doc,done,'p','','तपाईंले वास्तविक जीवनको कुराकानी अभ्यास पूरा गर्नुभयो।');
   add(doc,done,'p','',active.steps.length+' turns practiced · '+successful+' guided responses completed');
   if(active.isBranchingV4||active.isBranchingStore||active.isBranchingStory)add(doc,done,'p','','Your choices shaped this conversation. · तपाईंको उत्तरले यो कथा परिवर्तन गर्‍यो।');
   add(doc,done,'small','','This is practice-only feedback; official learning XP and progress are unchanged.');
   const buttons=add(doc,done,'div','sikau-convo-finish-actions');
   const retry=add(doc,buttons,'button','sikau-convo-primary','↻ New questions · नयाँ प्रश्न');retry.type='button';retry.addEventListener('click',()=>start(active.coachOriginal||active));
   const readAll=add(doc,buttons,'button','sikau-convo-secondary','📖 Read full conversation · पूरा संवाद');readAll.type='button';
   readAll.addEventListener('click',()=>{const transcript=add(doc,done,'div','sikau-convo-full-dialogue');transcript.replaceChildren();for(const [turn,line] of active.steps.entries()){const pair=add(doc,transcript,'div','sikau-convo-full-pair'),student=dialogueHistory[turn];add(doc,pair,'strong','',(line.speaker||active.partner)+': '+line.npc);add(doc,pair,'p','',coachLearnerName+': '+(student?.reply||line.answer));if(student?.corrected&&normalize(student.corrected)!==normalize(student.reply))add(doc,pair,'small','','Suggested: '+student.corrected);if(showNepali)add(doc,pair,'small','',line.npcNe+(student?.learnerNe?' / '+student.learnerNe:student?'':' / '+line.answerNe));}readAll.disabled=true;transcript.scrollIntoView?.({behavior:'smooth',block:'nearest'});});
   const another=add(doc,buttons,'button','sikau-convo-secondary','Explore more situations · थप विषय');another.type='button';another.addEventListener('click',back);
   return;
  }
  const step=active.steps[index];
  const fullPreview=add(doc,stage,'details','sikau-convo-dialogue-preview');
  if(active.isBranchingStore||active.isBranchingStory)fullPreview.hidden=true;
  add(doc,fullPreview,'summary','','📖 Read the full example conversation · पूरा संवाद पढ्नुहोस्');
  const previewBody=add(doc,fullPreview,'div','sikau-convo-preview-body');
  for(const line of active.steps){
   const sample=add(doc,previewBody,'div','sikau-convo-full-pair');
   add(doc,sample,'strong','',active.partner+': '+line.npc);
   if(showNepali)add(doc,sample,'small','',line.npcNe);
   add(doc,sample,'p','','You: '+line.answer);
   if(showNepali)add(doc,sample,'small','',line.answerNe);
  }
  if(active.isBranchingStore){
   const state=active.storeState||{};
   const tags=[];
   const addFact=(value,label)=>{if(value)tags.push(label)};
   addFact(state.intent==='refund','💵 Refund requested');
   addFact(state.intent==='exchange','🔁 Exchange requested');
   addFact(state.intent==='keep','🛍️ Decided to finish');
   addFact(state.item,'🧥 '+({shirt:'Shirt',pants:'Pants',shoes:'Shoes',jacket:'Jacket',dress:'Dress',multiple:'Multiple items'}[state.item]||'Clothing'));
   addFact(state.receipt==='missing',state.source==='gift'?'🎁 No gift receipt':'🧾 No receipt');
   addFact(state.receipt==='gift','🧾 Gift receipt');
   addFact(state.receipt==='paper','🧾 Paper receipt');
   addFact(state.receipt==='digital','📱 Digital receipt');
   addFact(state.condition==='worn','👕 Worn outside');
   addFact(state.condition==='no-tags','🏷️ Tags removed');
   addFact(state.source==='online','🌐 Online order');
   addFact(state.source==='gift','🎁 Gift');
   addFact(state.source==='unknown','❔ Origin unknown');
   addFact(state.timing==='unknown','📅 Purchase date unknown');
   addFact(state.timing==='older','📅 Possibly past return period');
   addFact(state.managerRequested===true,'👩‍💼 Manager review');
   if(tags.length){
    const info=add(doc,stage,'div','sikau-store-facts');
    info.setAttribute('aria-label','Details remembered in this role-play');
    for(const tag of tags)add(doc,info,'span','sikau-store-fact',tag);
   }
  }
  const progress=add(doc,stage,'div','sikau-convo-progress');
  add(doc,progress,'span','',(active.isBranchingStore||active.isBranchingStory)?'Turn '+(index+1)+' · Your choices shape the conversation':'Turn '+(index+1)+' · संवाद');
  const track=add(doc,progress,'div','sikau-convo-track');
  const fill=add(doc,track,'div','sikau-convo-track-fill');fill.style.width=((active.isBranchingStore||active.isBranchingStory)?Math.min(94,(index+1)*9):((index+1)/active.steps.length*100))+'%';

  // One chat window, with scrollable prior turns and the current message.
  // This is practice-only; the transcript stays local to this lesson session.
  const chatLayout=add(doc,stage,'div','sikau-convo-chat-layout');
  const transcript=add(doc,chatLayout,'section','sikau-convo-transcript sikau-convo-chat-thread');
  transcript.setAttribute('role','region');
  transcript.setAttribute('aria-label','Current and previous conversation messages');
  const chatHead=add(doc,transcript,'div','sikau-chat-top');
  add(doc,chatHead,'div','sikau-chat-top-scene',active.emoji+' '+active.place);
  add(doc,chatHead,'span','sikau-chat-top-pill','🙋 '+coachLearnerName+' · तपाईं');
  function bubble(who,english,ne,speaker,emoji){
   const wrapper=add(doc,transcript,'div','sikau-chat-message '+who);
   const avatar=add(doc,wrapper,'span','sikau-chat-avatar',who.startsWith('other')?(emoji||active.emoji):'🙋');
   avatar.setAttribute('aria-hidden','true');
   const body=add(doc,wrapper,'div','sikau-chat-message-body');
   add(doc,body,'strong','',speaker);
   add(doc,body,'p','',english);
   if(showNepali&&ne)add(doc,body,'small','',ne);
   return body;
  }
  if(index===0)add(doc,transcript,'p','sikau-chat-start','🌟 You are '+coachLearnerName+' in this conversation. Pick a reply to begin! · आफ्नो नामबाट अभ्यास सुरु गर्नुहोस्।');
  for(let i=0;i<index;i++){
   const prior=active.steps[i],history=dialogueHistory[i]||{};
   bubble('other',prior.npc,prior.npcNe,prior.speaker||active.partner,prior.speakerEmoji);
   const translated=history.learnerNe||((history.kind==='guided'||history.kind==='example')?history.answerNe||prior.answerNe:'');
   bubble('learner',history.reply||prior.answer,translated,'You · '+coachLearnerName+' · तपाईं');
  }
  const latest=bubble('other current',step.npc,step.npcNe,(step.speaker||active.partner)+' · Now',step.speakerEmoji);
  const hear=add(doc,latest,'button','sikau-convo-hear','🔊 Listen · सुन्नुहोस्');
  hear.type='button';hear.addEventListener('click',()=>speak(doc,step.npc));
  const feedback=add(doc,chatLayout,'section','sikau-convo-reply sikau-convo-chat-choices');
  const choiceHead=add(doc,feedback,'div','sikau-chat-choice-header');
  add(doc,choiceHead,'strong','','🎯 Your turn · तपाईंको पालो');
  add(doc,choiceHead,'small','','Every choice is a possible response. · सबै विकल्प मिल्ने उत्तर हुन्।');
  const replyPlan=coachReplyOptions(step,active);
  add(doc,feedback,'p','sikau-chat-multi-hint',replyPlan.branching?
   '✨ All choices are possible replies. Pick the one you would actually say—your story may change. · सबै उत्तर मिल्छन्। तपाईंको अवस्था छान्नुहोस्।':
   '✨ All three are valid ways to reply. Pick the wording you like and say it aloud. · तीनै उत्तर मिल्छन्। मन परेको छान्नुहोस्।');
  const result=add(doc,feedback,'div','sikau-convo-feedback');
  result.setAttribute('role','status');result.setAttribute('aria-live','polite');

  function showResult(item){
   result.replaceChildren();
   result.className='sikau-convo-feedback success';
   add(doc,result,'strong','','💬 Good choice! · राम्रो छनोट');
   add(doc,result,'p','','You chose: '+item.value);
   if(showNepali)add(doc,result,'small','',item.ne);
   if(active.isBranchingV4&&active.v4Completed&&active.v4FinalReply)
    add(doc,result,'p','sikau-convo-final-reply',(active.partner||'Conversation partner')+': '+active.v4FinalReply);
   if(item.branch||item.followup)add(doc,result,'small','','Your next chat message will reflect this choice. · अबको कुराकानी यसैअनुसार अघि बढ्नेछ।');
   const next=add(doc,result,'button','sikau-convo-primary',
    ((active.isBranchingV4&&active.v4Completed)||(active.isBranchingStore&&active.storeCompleted)||(active.isBranchingStory&&active.storyCompleted)||(!active.isBranchingV4&&!active.isBranchingStore&&!active.isBranchingStory&&index===active.steps.length-1))?'Finish story 🎉':'Continue the chat → · अर्को कुरा');
   next.type='button';next.addEventListener('click',goNext);
  }
  const options=add(doc,feedback,'div','sikau-convo-options');
  for(const item of replyPlan.options){
   const b=add(doc,options,'button','sikau-convo-option sikau-chat-option');
   b.type='button';
   add(doc,b,'span','sikau-chat-option-radio','◯');
   const copy=add(doc,b,'span','sikau-chat-option-copy');
   add(doc,copy,'span','',item.value);
   if(showNepali)add(doc,copy,'small','',item.ne);
   b.addEventListener('click',()=>{
    if(b.disabled)return;
    attempts++;
    successful++;
    dialogueHistory[index]={reply:item.value,answerNe:item.ne,
      learnerNe:item.ne,kind:'guided'};
    pendingChoice={value:item.value,ne:item.ne};
    b.classList.add('is-selected');
    b.querySelector('.sikau-chat-option-radio').textContent='✓';
    options.querySelectorAll('button').forEach(x=>x.disabled=true);
    if(active.isBranchingV4&&window.sikauV4Story){
     window.sikauV4Story.choose(active,item,index);
    }else if(active.isBranchingStore&&window.sikauStoreStory){
     window.sikauStoreStory.choose(active,item,index);
    }else if(active.isBranchingStory&&window.sikauAdaptiveStory){
     window.sikauAdaptiveStory.choose(active,item,index);
    }else if(item.branch){
     const alternate=item.branch==='receipt_missing'?coachNoReceiptPath():coachBranchDialogue(item.branch);
     if(alternate.length){
      active.steps.splice(index+1,active.steps.length-index-1,...alternate);
      active.steps[index].after=alternate[0].npc;
     }
    }else if(item.followup){
     const extra=coachFollowUpStep(item.followup);
     if(extra){
      // Insert one natural consequence before returning to the original
      // conversation; retain every previous selected response.
      active.steps.splice(index+1,0,extra);
      active.steps[index].after=extra.npc;
      extra.after=active.steps[index+2]?.npc||'Thank you for sharing that.';
     }
    }
    saveDraft();showResult(item);
   });
  }
  feedback.appendChild(result);
  // Restore a selected response without choosing again or changing branches.
  if(pendingChoice){
   const buttons=Array.from(options.querySelectorAll('button'));
   buttons.forEach(b=>b.disabled=true);
   const selected=buttons.find(b=>b.querySelector('.sikau-chat-option-copy span')?.textContent===pendingChoice.value);
   if(selected){
    selected.classList.add('is-selected');
    const indicator=selected.querySelector('.sikau-chat-option-radio');
    if(indicator)indicator.textContent='✓';
   }
   showResult(pendingChoice);
  }
  const skip=add(doc,feedback,'button','sikau-convo-skip','Skip this turn · अर्को चरण →');
  skip.type='button';if(active.isBranchingV4||active.isBranchingStore||active.isBranchingStory)skip.hidden=true;else skip.addEventListener('click',goNext);
  const note=add(doc,feedback,'div','sikau-convo-tip');
  add(doc,note,'strong','','💡 Quick English tip · उपयोगी सल्लाह');
  add(doc,note,'p','',active.isBranchingStore?'The store needs to review its policy before promising a refund or exchange. You can finish whenever you have enough information. · नियम जाँचेपछि मात्र निर्णय हुन्छ।':active.isBranchingStory?'Choose what is true for you. Each answer changes the next question, and you can finish naturally. · आफूलाई मिल्ने उत्तर छान्नुहोस्।':'Every option is a valid reply. Practice saying your choice aloud. · आफ्नो उत्तर ठूलो स्वरमा बोल्ने अभ्यास गर्नुहोस्।');
  // Show the newest question without requiring learners to scroll through all
  // earlier chat messages. Keep every previous bubble available above.
  stage.appendChild(fullPreview);
  doc.defaultView?.requestAnimationFrame?.(()=>{
   if(!transcript.isConnected)return;
    const mobile=doc.defaultView?.matchMedia?.('(max-width: 767px)')?.matches;
    if(mobile){
     // On phones the whole page scrolls: show the newest question near the top,
     // without trapping previous messages in a nested scrolling panel.
     const current=transcript.querySelector('.sikau-chat-message.current');
     current?.scrollIntoView?.({block:'start',behavior:'instant'});
    }else transcript.scrollTop=transcript.scrollHeight;
  });

 }
 searchInput.addEventListener('input',()=>{search=searchInput.value;currentPage=1;drawCards();});

 surprise.addEventListener('click',()=>{
  const options=scenarios.filter(s=>s.id!==lastId&&!recentTopics.includes(s.id));
  const list=options.length?options:scenarios;
  start(list[Math.floor(Math.random()*list.length)]);
 });
 ai.addEventListener('click',()=>{
  host.classList.toggle('sikau-convo-ai-open');
  if(host.classList.contains('sikau-convo-ai-open'))ask.scrollIntoView?.({behavior:'smooth',block:'center'});
 });
 drawTopics();drawCards();showSavedConversation();
 // Dedicated, independently hideable section for daily-life conversations.
 // Do not hide/recreate the original native Coach backend.
 const everydayContainer=add(doc,shell,'div','sikau-convo-everyday');
 everydayContainer.id='sikauCoachEveryday';
 [top,banner,browser,stage,notice].forEach(node=>everydayContainer.appendChild(node));
 const visaController=enhanceVisaInterviewCoach(doc,shell,ask);
 installVisaSidebar(doc,shell,visaController);
 hideRedundantCoachCultureLab(doc);
 hideRedundantCoachAdventurePanel(doc);
};
})();