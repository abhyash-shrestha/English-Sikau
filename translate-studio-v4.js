/* English Sikau Translate Studio v4.
   Only changes authenticated lesson presentation. Existing Appwrite access,
   translation providers, OCR, scoring, and native event handlers remain intact. */
(function(){
'use strict';
const CSS_URL=new URL('./translate-studio-v4.css?v=20261020-two-directions-r1',document.baseURI).href;
const samples=[
 ['👋','Hello!','नमस्ते!','ttx-rose'],
 ['📍','I am going to Pokhara.','म पोखरा जाँदै छु।','ttx-blue'],
 ['💬','What is your name?','तपाईंको नाम के हो?','ttx-purple'],
 ['📚','I like learning English.','मलाई अंग्रेजी सिक्न मन पर्छ।','ttx-green'],
 ['☀️','The weather is nice today.','आज मौसम राम्रो छ।','ttx-amber'],
 ['🙏','Thank you for helping me.','मलाई मद्दत गर्नुभएकोमा धन्यवाद।','ttx-rose'],
 ['🍲','I would like to eat momo.','म मःम खान चाहन्छु।','ttx-amber'],
 ['👨‍👩‍👧','This is my family.','यो मेरो परिवार हो।','ttx-green']
];
const topics=[
 {icon:'🥟',title:'Food & Cooking',ne:'खाना र पकाउने',kind:'food',pair:['Momo is delicious.','मःम मिठो छ।']},
 {icon:'🏔️',title:'Places & Travel',ne:'ठाउँहरू र यात्रा',kind:'travel',pair:['We are visiting Phewa Lake in Pokhara.','हामी पोखराको फेवा ताल घुम्न जाँदै छौं।']},
 {icon:'🪔',title:'Festivals & Culture',ne:'पर्व र संस्कृति',kind:'festival',pair:['We celebrate Tihar with lights.','हामी तिहारमा बत्ती बालेर उत्सव मनाउँछौं।']},
 {icon:'🗣️',title:'Daily Conversation',ne:'दैनिक कुराकानी',kind:'conversation',pair:['How are you today?','आज तपाईंलाई कस्तो छ?']},
 {icon:'🛍️',title:'Shopping',ne:'किनमेल',kind:'shopping',pair:['How much is this shirt?','यो कमिजको मूल्य कति हो?']},
 {icon:'👨‍👩‍👧',title:'Family & Relationships',ne:'परिवार र सम्बन्ध',kind:'family',pair:['I love spending time with my family.','मलाई परिवारसँग समय बिताउन मन पर्छ।']},
 {icon:'💼',title:'Work & Job',ne:'काम र रोजगारी',kind:'work',pair:['I am looking for a new job.','म नयाँ काम खोज्दै छु।']},
 {icon:'📚',title:'School & Education',ne:'विद्यालय र शिक्षा',kind:'school',pair:['I study English every day.','म हरेक दिन अंग्रेजी पढ्छु।']}
];

// Public bilingual practice only. Protected lesson, authorization and XP remain unchanged.
const practiceTopics={"food":[["Momo","मःम"],["Rice","भात"],["Tea","चिया"],["Vegetables","तरकारी"],["Spicy","पिरो"],["I am hungry.","मलाई भोक लागेको छ।"],["I am thirsty.","मलाई तिर्खा लागेको छ।"],["Please give me some water.","कृपया मलाई अलिकति पानी दिनुहोस्।"],["I would like a cup of tea.","मलाई एक कप चिया चाहिन्छ।"],["This food is delicious.","यो खाना मिठो छ।"],["What are we cooking today?","आज हामी के पकाउँदै छौं?"],["I am learning to cook dal bhat.","म दालभात पकाउन सिक्दै छु।"],["Please add a little salt.","कृपया अलिकति नुन थप्नुहोस्।"],["Is this food spicy?","के यो खाना पिरो छ?"],["We are eating dinner together.","हामी सँगै बेलुकाको खाना खाँदै छौं।"],["My mother makes delicious sel roti.","मेरी आमाले मिठो सेलरोटी बनाउनुहुन्छ।"],["I bought fresh vegetables at the market.","मैले बजारबाट ताजा तरकारी किनेँ।"],["Can I have some more rice?","के म अलिकति थप भात लिन सक्छु?"],["Wash your hands before eating.","खानुअघि हात धुनुहोस्।"],["I prefer tea without sugar.","मलाई चिनीबिनाको चिया मन पर्छ।"]],"travel":[["Pokhara","पोखरा"],["Phewa Lake","फेवा ताल"],["Bus station","बस स्टेसन"],["Mountain","हिमाल"],["Travel ticket","यात्राको टिकट"],["Where is the bus station?","बस स्टेसन कहाँ छ?"],["How much is the bus ticket?","बसको टिकट कति पर्छ?"],["I want to visit Pokhara.","म पोखरा घुम्न चाहन्छु।"],["We are boating on Phewa Lake.","हामी फेवा तालमा डुङ्गा चढ्दै छौं।"],["Please show me the way.","कृपया मलाई बाटो देखाइदिनुहोस्।"],["How long does the journey take?","यात्रामा कति समय लाग्छ?"],["I have booked a hotel room.","मैले होटलको कोठा बुक गरेको छु।"],["The mountains look beautiful today.","आज हिमालहरू सुन्दर देखिएका छन्।"],["Can you take a photo of us?","के तपाईं हाम्रो फोटो खिचिदिन सक्नुहुन्छ?"],["I forgot my travel bag.","मैले आफ्नो यात्राको झोला बिर्सेँ।"],["Turn left at the next road.","अर्को बाटोमा बायाँ मोड्नुहोस्।"],["Is there a taxi nearby?","यहाँ नजिकै ट्याक्सी पाइन्छ?"],["We will leave early tomorrow.","हामी भोलि बिहानै निस्कनेछौं।"],["I want to explore Kathmandu.","म काठमाडौं घुम्न चाहन्छु।"],["The road is busy today.","आज बाटोमा धेरै सवारीसाधन छन्।"]],"festival":[["Dashain","दशैं"],["Tihar","तिहार"],["Deusi and Bhailo","देउसी र भैलो"],["Blessings","आशीर्वाद"],["Tradition","परम्परा"],["We celebrate Dashain with our family.","हामी परिवारसँग दशैं मनाउँछौं।"],["People light lamps during Tihar.","तिहारमा मानिसहरू दियो बाल्छन्।"],["I received tika and blessings.","मैले टीका र आशीर्वाद पाएँ।"],["We are preparing sel roti for the festival.","हामी चाडपर्वका लागि सेलरोटी बनाउँदै छौं।"],["What is your favorite Nepali festival?","तपाईंलाई सबैभन्दा मन पर्ने नेपाली चाड कुन हो?"],["My family sings Deusi and Bhailo.","मेरो परिवारले देउसी र भैलो गाउँछ।"],["We visit our relatives during Dashain.","हामी दशैंमा आफन्तहरूलाई भेट्न जान्छौं।"],["We are decorating our home with flowers.","हामी घरलाई फूलले सजाउँदै छौं।"],["Many people celebrate Holi with colors.","धेरै मानिसहरू होलीमा रङ खेल्छन्।"],["We respect different cultures and traditions.","हामी विभिन्न संस्कृति र परम्पराको सम्मान गर्छौं।"],["My grandmother tells us festival stories.","मेरी हजुरआमाले हामीलाई चाडपर्वका कथा सुनाउनुहुन्छ।"],["We are buying gifts for our family.","हामी परिवारका लागि उपहार किन्दै छौं।"],["Children enjoy playing on swings during Dashain.","बालबालिकाहरू दशैंमा पिङ खेल्न रमाउँछन्।"],["Our family is making a special meal.","हाम्रो परिवारले विशेष खाना बनाउँदै छ।"],["I want to learn more about Nepali traditions.","म नेपाली परम्पराबारे अझ धेरै जान्न चाहन्छु।"]],"conversation":[["Hello!","नमस्ते!"],["Good morning!","शुभ प्रभात!"],["Good night!","शुभ रात्रि!"],["How are you?","तपाईंलाई कस्तो छ?"],["I am fine, thank you.","मलाई ठीक छ, धन्यवाद।"],["What is your name?","तपाईंको नाम के हो?"],["My name is Sita.","मेरो नाम सीता हो।"],["Where are you from?","तपाईं कहाँबाट हुनुहुन्छ?"],["I am from Nepal.","म नेपालबाट हुँ।"],["What do you do?","तपाईं के काम गर्नुहुन्छ?"],["I am learning English.","म अंग्रेजी सिक्दै छु।"],["Can you speak slowly?","के तपाईं बिस्तारै बोल्न सक्नुहुन्छ?"],["Could you repeat that?","के तपाईं त्यो फेरि भन्न सक्नुहुन्छ?"],["I do not understand.","मैले बुझिनँ।"],["Can you help me, please?","के तपाईं मलाई मद्दत गर्न सक्नुहुन्छ?"],["Nice to meet you!","तपाईंलाई भेटेर खुशी लाग्यो!"],["How was your day?","तपाईंको दिन कस्तो बित्यो?"],["See you tomorrow!","भोलि भेटौंला!"],["Excuse me, where is the restroom?","माफ गर्नुहोस्, शौचालय कहाँ छ?"],["Have a wonderful day!","तपाईंको दिन शुभ रहोस्!"]],"shopping":[["Price","मूल्य"],["Discount","छुट"],["Receipt","रसिद"],["Cash","नगद"],["Change","फिर्ता पैसा"],["How much does this cost?","यसको मूल्य कति हो?"],["Do you have a smaller size?","के तपाईंसँग योभन्दा सानो साइज छ?"],["Can I pay by card?","के म कार्डबाट पैसा तिर्न सक्छु?"],["Please give me a receipt.","कृपया मलाई रसिद दिनुहोस्।"],["I am just looking, thank you.","म अहिले सामान हेर्दै मात्र छु, धन्यवाद।"],["Is there any discount?","के कुनै छुट छ?"],["This shirt is too expensive.","यो कमिज धेरै महँगो छ।"],["I would like to buy two notebooks.","म दुईवटा कापी किन्न चाहन्छु।"],["Where can I find fresh fruit?","ताजा फलफूल कहाँ पाउन सक्छु?"],["Do you accept cash?","के तपाईं नगद लिनुहुन्छ?"],["Can I return this item?","के म यो सामान फिर्ता गर्न सक्छु?"],["I need a shopping bag.","मलाई किनमेल गर्ने झोला चाहिन्छ।"],["Please check the price again.","कृपया मूल्य फेरि जाँच गर्नुहोस्।"],["The store closes at nine.","पसल नौ बजे बन्द हुन्छ।"],["Thank you for your help.","तपाईंको सहयोगका लागि धन्यवाद।"]],"family":[["Mother","आमा"],["Father","बुबा"],["Grandmother","हजुरआमा"],["Grandfather","हजुरबुबा"],["Relatives","आफन्तहरू"],["This is my family.","यो मेरो परिवार हो।"],["I have one younger brother.","मेरो एउटा भाइ छ।"],["My sister lives in Kathmandu.","मेरी दिदी काठमाडौंमा बस्नुहुन्छ।"],["We eat dinner together.","हामी सँगै बेलुकाको खाना खान्छौं।"],["I called my parents yesterday.","मैले हिजो मेरा आमाबुबालाई फोन गरेँ।"],["My grandparents tell wonderful stories.","मेरा हजुरबुबा र हजुरआमाले रमाइला कथा सुनाउनुहुन्छ।"],["I miss my family in Nepal.","मलाई नेपालमा भएको मेरो परिवारको याद आउँछ।"],["We help each other at home.","हामी घरमा एकअर्कालाई मद्दत गर्छौं।"],["My uncle is visiting us tomorrow.","मेरा काका भोलि हामीलाई भेट्न आउँदै हुनुहुन्छ।"],["Our family celebrates birthdays together.","हाम्रो परिवारले सँगै जन्मदिन मनाउँछ।"],["How many people are in your family?","तपाईंको परिवारमा कति जना हुनुहुन्छ?"],["I am proud of my parents.","म मेरा आमाबुबाप्रति गर्व गर्छु।"],["My daughter is going to school.","मेरी छोरी विद्यालय जाँदै छिन्।"],["We are planning a family picnic.","हामी पारिवारिक वनभोजको योजना बनाउँदै छौं।"],["I love spending time with my family.","मलाई परिवारसँग समय बिताउन मन पर्छ।"]],"work":[["Job","जागिर"],["Interview","अन्तर्वार्ता"],["Schedule","समयतालिका"],["Coworker","सहकर्मी"],["Salary","तलब"],["I am looking for a job.","म जागिर खोज्दै छु।"],["I have an interview tomorrow.","मेरो भोलि अन्तर्वार्ता छ।"],["What time does your shift start?","तपाईंको काम गर्ने पालो कति बजे सुरु हुन्छ?"],["I work five days a week.","म हप्तामा पाँच दिन काम गर्छु।"],["Please send me the schedule.","कृपया मलाई समयतालिका पठाउनुहोस्।"],["I need help with this task.","मलाई यो काममा मद्दत चाहिन्छ।"],["I finished my work early.","मैले आफ्नो काम चाँडै सकेँ।"],["My coworker is very helpful.","मेरो सहकर्मी धेरै सहयोगी हुनुहुन्छ।"],["Could you explain the instructions?","के तपाईं निर्देशनहरू बुझाइदिन सक्नुहुन्छ?"],["I am learning a new skill.","म नयाँ सीप सिक्दै छु।"],["I will arrive on time.","म समयमा आइपुग्नेछु।"],["Where should I put these boxes?","मैले यी बाकसहरू कहाँ राख्ने?"],["We have a meeting this afternoon.","आज दिउँसो हाम्रो बैठक छ।"],["I would like to request a day off.","म एक दिन बिदा माग्न चाहन्छु।"],["Thank you for the opportunity.","यो अवसरका लागि धन्यवाद।"]],"school":[["Teacher","शिक्षक"],["Student","विद्यार्थी"],["Homework","गृहकार्य"],["Classroom","कक्षाकोठा"],["Library","पुस्तकालय"],["I study English every day.","म हरेक दिन अंग्रेजी पढ्छु।"],["Please explain this word.","कृपया यो शब्दको अर्थ बुझाइदिनुहोस्।"],["I have finished my homework.","मैले आफ्नो गृहकार्य सकाएँ।"],["Can you check my answer?","के तपाईं मेरो उत्तर जाँचिदिन सक्नुहुन्छ?"],["I want to improve my pronunciation.","म आफ्नो उच्चारण सुधार्न चाहन्छु।"],["Our teacher is very kind.","हाम्रा शिक्षक धेरै दयालु हुनुहुन्छ।"],["I am reading an English story.","म अंग्रेजी कथा पढ्दै छु।"],["Please write the sentence again.","कृपया वाक्य फेरि लेख्नुहोस्।"],["What does this sentence mean?","यो वाक्यको अर्थ के हो?"],["I am practicing speaking English.","म अंग्रेजी बोल्ने अभ्यास गर्दै छु।"],["The exam starts at ten.","परीक्षा दस बजे सुरु हुन्छ।"],["I borrowed a book from the library.","मैले पुस्तकालयबाट एउटा किताब लिएँ।"],["We learn something new every day.","हामी हरेक दिन केही नयाँ सिक्छौं।"],["I made a mistake, but I will try again.","मैले गल्ती गरेँ, तर फेरि प्रयास गर्नेछु।"],["Can we practice together?","के हामी सँगै अभ्यास गर्न सक्छौं?"]]};
const dailyPhrasePool=[["How are you feeling today?","आज तपाईंलाई कस्तो महसुस भइरहेको छ?"],["I hope you have a great day.","तपाईंको दिन राम्रो बितोस् भन्ने आशा गर्छु।"],["Can you speak a little slower?","के तपाईं अलि बिस्तारै बोल्न सक्नुहुन्छ?"],["I am trying my best.","म सक्दो प्रयास गर्दै छु।"],["Every day is a new opportunity.","हरेक दिन नयाँ अवसर हो।"],["I need a little more time.","मलाई अलिकति थप समय चाहिन्छ।"],["Please let me know.","कृपया मलाई खबर गर्नुहोस्।"],["I will call you later.","म तपाईंलाई पछि फोन गर्नेछु।"],["That sounds like a good idea.","त्यो राम्रो विचार जस्तो लाग्छ।"],["I am on my way.","म बाटोमा छु।"],["Could you wait a moment?","के तपाईं एकछिन पर्खन सक्नुहुन्छ?"],["Let's practice English together.","हामी सँगै अंग्रेजी अभ्यास गरौं।"],["I have a question.","मसँग एउटा प्रश्न छ।"],["Please correct my mistakes.","कृपया मेरा गल्तीहरू सच्याइदिनुहोस्।"],["I am happy to see you.","तपाईंलाई देखेर मलाई खुशी लाग्यो।"],["Let's meet after lunch.","हामी दिउँसोको खाना खाएपछि भेटौं।"],["I am busy right now.","म अहिले व्यस्त छु।"],["I will be there soon.","म छिट्टै त्यहाँ पुग्नेछु।"],["What would you like to eat?","तपाईं के खान चाहनुहुन्छ?"],["I forgot to bring my notebook.","मैले आफ्नो कापी ल्याउन बिर्सेँ।"],["It is raining outside.","बाहिर पानी परिरहेको छ।"],["Please take care of yourself.","कृपया आफ्नो ख्याल राख्नुहोस्।"],["I need directions to the station.","मलाई स्टेसन जाने बाटो चाहिएको छ।"],["Thank you for being patient.","धैर्य गर्नुभएकोमा धन्यवाद।"],["Can we start again?","के हामी फेरि सुरु गर्न सक्छौं?"],["I am proud of my progress.","म आफ्नो प्रगतिप्रति गर्व गर्छु।"],["I don't know the answer yet.","मलाई अहिलेसम्म उत्तर थाहा छैन।"],["I would like to learn more.","म अझ धेरै सिक्न चाहन्छु।"],["Let's try something different.","हामी केही फरक प्रयास गरौं।"],["Please send me a message.","कृपया मलाई सन्देश पठाउनुहोस्।"],["I am excited for tomorrow.","म भोलिका लागि उत्साहित छु।"],["Practice makes us better.","अभ्यासले हामीलाई अझ राम्रो बनाउँछ।"]];
const conversationPool=[["What is your name?","तपाईंको नाम के हो?"],["Where do you live?","तपाईं कहाँ बस्नुहुन्छ?"],["How long have you lived here?","तपाईं यहाँ बसेको कति समय भयो?"],["Where are you going?","तपाईं कहाँ जाँदै हुनुहुन्छ?"],["What did you do yesterday?","तपाईंले हिजो के गर्नुभयो?"],["Do you like Nepali food?","के तपाईंलाई नेपाली खाना मन पर्छ?"],["Can we speak in English?","के हामी अंग्रेजीमा कुरा गर्न सक्छौं?"],["What do you like to do for fun?","तपाईंलाई रमाइलोका लागि के गर्न मन पर्छ?"],["How was your weekend?","तपाईंको सप्ताहन्त कस्तो बित्यो?"],["What time should we meet?","हामी कति बजे भेट्ने?"],["Would you like some tea?","के तपाईं चिया पिउन चाहनुहुन्छ?"],["Can you teach me this word?","के तपाईं मलाई यो शब्द सिकाउन सक्नुहुन्छ?"],["What is your favorite place in Nepal?","नेपालमा तपाईंलाई मन पर्ने ठाउँ कुन हो?"],["Have you visited Pokhara?","के तपाईं पोखरा जानुभएको छ?"],["What are you learning today?","आज तपाईं के सिक्दै हुनुहुन्छ?"],["Could you say that again?","के तपाईं त्यो फेरि भन्न सक्नुहुन्छ?"],["How do you pronounce this word?","यो शब्दको उच्चारण कसरी गर्ने?"],["Where did you buy that bag?","तपाईंले त्यो झोला कहाँ किन्नुभयो?"],["Are you free this afternoon?","के तपाईं आज दिउँसो फुर्सदमा हुनुहुन्छ?"],["Would you like to join us?","के तपाईं हामीसँग आउन चाहनुहुन्छ?"],["When does the class begin?","कक्षा कहिले सुरु हुन्छ?"],["How can I get to the library?","म पुस्तकालय कसरी पुग्न सक्छु?"],["May I ask you a question?","के म तपाईंलाई एउटा प्रश्न सोध्न सक्छु?"],["What is your favorite festival?","तपाईंलाई मन पर्ने चाड कुन हो?"],["Could you help me find a job?","के तपाईं मलाई जागिर खोज्न मद्दत गर्न सक्नुहुन्छ?"],["Do you have any recommendations?","के तपाईंसँग कुनै सुझाव छ?"],["What does this sign mean?","यो सङ्केतको अर्थ के हो?"],["How much time do we have?","हामीसँग कति समय छ?"],["Would you mind opening the window?","के तपाईं झ्याल खोलिदिनुहुन्छ?"],["What should we practice next?","अब हामीले के अभ्यास गर्ने?"]];
const wordPool=[["Apple","स्याउ"],["Banana","केरा"],["Orange","सुन्तला"],["Water","पानी"],["Milk","दूध"],["Bread","रोटी"],["Rice","भात"],["Tea","चिया"],["Home","घर"],["Door","ढोका"],["Window","झ्याल"],["Chair","कुर्सी"],["Table","टेबल"],["Book","किताब"],["Pen","कलम"],["School","विद्यालय"],["Teacher","शिक्षक"],["Student","विद्यार्थी"],["Friend","साथी"],["Family","परिवार"],["Mother","आमा"],["Father","बुबा"],["Sister","दिदीबहिनी"],["Brother","दाजुभाइ"],["Mountain","हिमाल"],["River","नदी"],["Lake","ताल"],["Village","गाउँ"],["City","सहर"],["Market","बजार"],["Bus","बस"],["Train","रेल"],["Airport","विमानस्थल"],["Hospital","अस्पताल"],["Doctor","डाक्टर"],["Medicine","औषधि"],["Morning","बिहान"],["Evening","साँझ"],["Tomorrow","भोलि"],["Yesterday","हिजो"],["Happy","खुशी"],["Beautiful","सुन्दर"],["Important","महत्त्वपूर्ण"],["Practice","अभ्यास"],["Listen","सुन्नु"],["Speak","बोल्नु"],["Learn","सिक्नु"],["Write","लेख्नु"],["Read","पढ्नु"],["Help","मद्दत"],["Thank you","धन्यवाद"],["Excuse me","माफ गर्नुहोस्"]];
const diceKinds=['word','phrase','question','sentence'];
const diceQuestions=conversationPool.filter(p=>p[0].includes('?'));
const diceSentences=Object.values(practiceTopics).flat().filter(p=>p[0].split(/\s+/).length>=5);
const dicePhrases=dailyPhrasePool.filter(p=>p[0].split(/\s+/).length<=6);
function makePracticePicker(){
 const decks=new Map();
 return function next(key,pool){
  if(!pool.length)return null;
  let deck=decks.get(key);
  if(!deck||deck.size!==pool.length||!deck.remaining.length){
   const remaining=Array.from({length:pool.length},(_,i)=>i);
   for(let i=remaining.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [remaining[i],remaining[j]]=[remaining[j],remaining[i]];
   }
   if(deck&&remaining.length>1&&remaining[remaining.length-1]===deck.last){
    [remaining[0],remaining[remaining.length-1]]=[remaining[remaining.length-1],remaining[0]];
   }
   deck={size:pool.length,last:deck?.last??-1,remaining};
   decks.set(key,deck);
  }
  const index=deck.remaining.pop();
  deck.last=index;
  return pool[index];
 };
}
const nextPractice=makePracticePicker();
const mk=(d,tag,cls,txt)=>{const e=d.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e};
const put=(d,parent,tag,cls,txt)=>{const e=mk(d,tag,cls,txt);parent.appendChild(e);return e};
function safeInput(d,input,value){
 const descriptor=Object.getOwnPropertyDescriptor(d.defaultView.HTMLTextAreaElement.prototype,'value');
 if(descriptor?.set)descriptor.set.call(input,value);else input.value=value;
 input.dispatchEvent(new d.defaultView.Event('input',{bubbles:true}));
}
function nativeDirection(section){return section.querySelector('#dirSel button.on')?.dataset.d||'ne'}
function nativeSwitch(section,want){
 const b=section.querySelector('#dirSel button[data-d="'+want+'"]');
 if(!b||nativeDirection(section)===want)return;
 b.click(); // original native translation-direction handler
}
function nativeMode(section,want){
 const b=section.querySelector('#trModeSel button[data-tm="'+want+'"]');
 if(b)b.click(); // retain original camera/OCR mode logic
}
function nativeTab(d,name){
 const n=d.querySelector('#mobileModes.nav')||d.querySelector('.nav');
 const b=n?.querySelector('button[data-t="'+name+'"]');
 if(b)b.click();return !!b;
}
window.enhanceTranslationDashboard=function(d){
 if(!d?.body||!d?.head)return;
 const sec=d.querySelector('#tr'),root=sec?.querySelector(':scope > .content');
 const input=sec?.querySelector('#inp'),output=sec?.querySelector('#out');
 const dir=sec?.querySelector('#dirSel'),modes=sec?.querySelector('#trModeSel');
 const go=sec?.querySelector('#bt'),clear=sec?.querySelector('#clr'),dice=sec?.querySelector('#ex');
 const privateCard=dir?.closest('.card'),tip=sec?.querySelector('#tipCard');
 if(!root||!input||!output||!dir||!modes||!go||!privateCard)return;
 if(sec.dataset.sikauStudio==='4')return;
 // Only one code path for this protected page: don't invoke stale v3 wrappers.
 const link=mk(d,'link');link.id='sikauTranslateStudioV4';link.rel='stylesheet';link.href=CSS_URL;
 if(!d.getElementById(link.id))d.head.appendChild(link);
 const hero=put(d,root,'section','ttx-hero');
 hero.setAttribute('aria-label','English Sikau translation');
 const backdrop=put(d,hero,'div','ttx-hero-scene');backdrop.setAttribute('aria-hidden','true');
 const heroText=put(d,hero,'div','ttx-hero-copy');
 const cap=put(d,heroText,'div','ttx-hero-eyebrow','🇳🇵 ENGLISH SIKAU · अनुवाद');
 const title=put(d,heroText,'h1','', 'Translate');
 put(d,title,'span','',' · अनुवाद सिकौं');
 put(d,heroText,'p','','Translate words, sentences, and full text easily.');
 put(d,heroText,'p','ttx-ne','शब्द, वाक्य र पूरा लेख सजिलै अनुवाद गर्नुहोस्।');
 const heroVisual=put(d,hero,'div','ttx-hero-visual');
 heroVisual.setAttribute('aria-hidden','true');
 put(d,heroVisual,'span','ttx-glyph ttx-en-glyph','A');
 put(d,heroVisual,'span','ttx-glyph ttx-ne-glyph','अ');
 const heroHint=put(d,hero,'div','ttx-hero-hint');
 put(d,heroHint,'strong','','Real words. Real situations.');
 put(d,heroHint,'small','','Write or speak in Nepali or English. · नेपाली वा अंग्रेजी लेख्नुहोस्।');

 const workspace=put(d,root,'div','ttx-workspace');
 const entry=put(d,workspace,'section','ttx-panel ttx-entry');
 const result=put(d,workspace,'section','ttx-panel ttx-result');
 const toolPanel=put(d,workspace,'aside','ttx-panel ttx-side');
 entry.setAttribute('aria-label','Translate text');
 result.setAttribute('aria-label','Translation result');
 toolPanel.setAttribute('aria-label','Translation quick tools');

 const selectors=put(d,entry,'div','ttx-directions');
 const btns={};
 [['ne','🇳🇵 Nepali → English','नेपाली → अंग्रेजी'],
  ['en','🇬🇧 English → Nepali','अंग्रेजी → नेपाली']].forEach(([v,label,ne])=>{
  const b=put(d,selectors,'button','ttx-dir-button');
  b.type='button';b.dataset.direction=v;
  put(d,b,'strong','',label);put(d,b,'small','',ne);btns[v]=b;
 });
 privateCard.classList.add('ttx-native');
 entry.appendChild(privateCard);
 const tools=put(d,entry,'div','ttx-input-tools');
 const notice=put(d,entry,'div','ttx-notice','');
 notice.setAttribute('role','status');
 const resultHeader=put(d,result,'div','ttx-panel-head');
 const resultHeading=put(d,resultHeader,'div','');
 put(d,resultHeading,'strong','','✨ Translation Result');
 put(d,resultHeading,'small','','अनुवाद परिणाम');
 const target=put(d,resultHeader,'span','ttx-output-language','English');
 const resultCard=put(d,result,'div','ttx-result-content');
 const emptyIcon=put(d,resultCard,'div','ttx-empty-art','🅰️ ⇄ अ');
 emptyIcon.setAttribute('aria-hidden','true');
 resultCard.appendChild(output); // native output and translation rendering remain untouched
 const placeholder=put(d,resultCard,'p','ttx-result-placeholder','Your translation will appear here. · तपाईंको अनुवाद यहाँ देखिनेछ।');
 const outputTools=put(d,result,'div','ttx-result-actions');
 const copy=put(d,outputTools,'button','','▢ Copy · प्रतिलिपि');
 const speakOut=put(d,outputTools,'button','','🔊 Listen · सुन्नुहोस्');
 const save=put(d,outputTools,'button','','☆ Save · सेभ');
 [copy,speakOut,save].forEach(b=>b.type='button');
 const quickHead=put(d,toolPanel,'div','ttx-panel-head');
 const q=put(d,quickHead,'div','');put(d,q,'strong','','✨ Quick Tools');put(d,q,'small','','छिटो उपकरणहरू');
 const quickGrid=put(d,toolPanel,'div','ttx-quick-grid');
 const quick=[
  ['🎲','Random Word','नयाँ शब्द','ttx-q-orange','word'],
  ['💬','Daily Phrase','दैनिक वाक्य','ttx-q-purple','phrase'],
  ['👥','Conversation','संवाद अभ्यास','ttx-q-green','conversation'],
  ['📷','Photo Translate','तस्बिर अनुवाद','ttx-q-blue','photo']
 ];
 const quickButtons={};
 for(const [emoji,name,ne,color,key] of quick){
  const b=put(d,quickGrid,'button','ttx-quick '+color);
  b.type='button';b.dataset.tool=key;
  put(d,b,'span','ttx-quick-icon',emoji);
  put(d,b,'strong','',name);put(d,b,'small','',ne);
  put(d,b,'span','ttx-quick-footer',key==='photo'?'Upload an image · फोटो': 'Click for a new example · नयाँ अभ्यास');
  quickButtons[key]=b;
 }
 const topicSection=put(d,root,'section','ttx-topic-section');
 const topicHeading=put(d,topicSection,'div','ttx-section-head');
 put(d,topicHeading,'h2','','🏵️ Popular Topics · लोकप्रिय विषयहरू');
 put(d,topicHeading,'span','','Choose one to try a translation · विषय छान्नुहोस्');
 const topicGrid=put(d,topicSection,'div','ttx-topic-grid');
 for(const topic of topics){
  const b=put(d,topicGrid,'button','ttx-topic ttx-topic-'+topic.kind);b.type='button';
  const media=put(d,b,'div','ttx-topic-image ttx-image-'+topic.kind);
  put(d,media,'span','',topic.icon);
  put(d,b,'strong','',topic.title);
  put(d,b,'small','',topic.ne);
  b.title='Click again for another example · अर्को अभ्यासका लागि फेरि थिच्नुहोस्';
  b.addEventListener('click',()=>choosePractice('topic-'+topic.kind,[topic.pair,...practiceTopics[topic.kind]]));
 }
 const exampleSection=put(d,root,'section','ttx-examples');
 const exampleHead=put(d,exampleSection,'div','ttx-section-head');
 put(d,exampleHead,'h2','','🔠 Example Translations · उदाहरण अनुवादहरू');
 const more=put(d,exampleHead,'button','ttx-more','More examples →');
 more.type='button';
 const exampleGrid=put(d,exampleSection,'div','ttx-examples-grid');

 let examplesOpen=false;
 const saving=new Set();
 function directionUI(){
  const current=nativeDirection(sec);
  Object.entries(btns).forEach(([key,button])=>{
    const active=key===current;button.classList.toggle('active',active);
    button.setAttribute('aria-pressed',String(active));
  });
  target.textContent=nativeDirection(sec)==='ne'?'English':'नेपाली';
  input.placeholder=nativeDirection(sec)==='ne'?
   'Type or paste Nepali text here…\nनेपालीमा लेख्नुहोस् वा टाँस्नुहोस्…':
   'Type or paste English text here…\nयहाँ अंग्रेजी लेख्नुहोस्…';
 }
 Object.entries(btns).forEach(([key,b])=>b.addEventListener('click',()=>{
  nativeSwitch(sec,key);
  directionUI();
 }));
 function ensureTyping(){
  const type=sec.querySelector('#trTypeMode');
  if(type?.hidden)nativeMode(sec,'type');
  const nativeArea=sec.querySelector('#trTypeMode');
  if(nativeArea)nativeArea.hidden=false;
 }
 function choosePair(pair){
  ensureTyping();
  const value=nativeDirection(sec)==='ne'?pair[1]:pair[0];
  safeInput(d,input,value);
  notice.textContent='Ready. Press Translate to see the result. · अनुवाद थिच्नुहोस्।';
  input.focus({preventScroll:true});
  entry.scrollIntoView({behavior:'smooth',block:'nearest'});
 }
 function choosePractice(key,pool){
  if(!pool||!pool.length)return;
  let pair=nextPractice(key,pool);
  const current=()=>nativeDirection(sec)==='ne'?pair[1]:pair[0];
  for(let retry=0;retry<Math.min(4,pool.length-1)&&current()===input.value;retry++){
   pair=nextPractice(key,pool);
  }
  choosePair(pair);
  notice.textContent='New practice! Click again for another · नयाँ अभ्यास! अर्कोका लागि फेरि थिच्नुहोस्।';
 }
 function examplesRender(){
  exampleGrid.replaceChildren();
  (examplesOpen?samples:samples.slice(0,5)).forEach(([emoji,en,ne,tint])=>{
    const b=put(d,exampleGrid,'button','ttx-example '+tint);b.type='button';
    put(d,b,'span','ttx-example-icon',emoji);
    const info=put(d,b,'span','ttx-example-text');
    put(d,info,'strong','',ne);put(d,info,'small','',en);
    b.addEventListener('click',()=>choosePair([en,ne]));
  });
  more.textContent=examplesOpen?'Show fewer ↑':'More examples →';
 }
 more.addEventListener('click',()=>{examplesOpen=!examplesOpen;examplesRender();});
 examplesRender();
 function updateCounter(){
  const c=sec.querySelector('.ttx-character-count');
  if(c)c.textContent=input.value.length+' / 500';
 }
 // Reuse the native field and native action row; do not replace submit handler.
 const actionRow=sec.querySelector('#trTypeMode>.row');
 if(actionRow)actionRow.classList.add('ttx-native-actions');
 const originalQuick=sec.querySelector('#quick');if(originalQuick)originalQuick.classList.add('ttx-native-quick');
 const nativeCount=put(d,tools,'span','ttx-character-count','0 / 500');
 const speech=put(d,tools,'button','ttx-mini ttx-mic','🎙️ Speak');
 const camera=put(d,tools,'button','ttx-mini ttx-camera','📸 Camera');
 const upload=put(d,tools,'button','ttx-mini ttx-upload','⬆ Upload');
 const writing=put(d,tools,'button','ttx-mini ttx-writing','✏️ Write');
 [speech,camera,upload,writing].forEach(b=>b.type='button');
 function showCamera(openUpload){
  nativeMode(sec,'cam');
  const cam=sec.querySelector('#trCamMode'); if(cam)cam.hidden=false;
  if(openUpload){
   const nativeUpload=sec.querySelector('#camUpload');
   if(nativeUpload)nativeUpload.click();
  }
 }
 camera.addEventListener('click',()=>showCamera(false));
 upload.addEventListener('click',()=>showCamera(true));
 writing.addEventListener('click',()=>{if(!nativeTab(d,'hw'))notice.textContent='Select Write from the navigation · लेखन खोल्नुहोस्।';});
 quickButtons.photo.addEventListener('click',()=>showCamera(true));
 // Mix words, phrases, questions and longer sentences on successive dice rolls.
 quickButtons.word.querySelector('strong').textContent='Random Mix';
 quickButtons.word.querySelector('small').textContent='शब्द र वाक्य';
 quickButtons.word.addEventListener('click',()=>{
  const kind=nextPractice('dice-kind',diceKinds);
  const pool=kind==='word'?wordPool:
    kind==='phrase'?dicePhrases:
    kind==='question'?diceQuestions:diceSentences;
  choosePractice('dice-'+kind,pool);
 });
 quickButtons.phrase.addEventListener('click',()=>choosePractice('daily-phrase',dailyPhrasePool));
 quickButtons.conversation.addEventListener('click',()=>choosePractice('conversation',conversationPool));
 let recognition=null;
 speech.addEventListener('click',()=>{
  const API=d.defaultView.SpeechRecognition||d.defaultView.webkitSpeechRecognition;
  if(!API){notice.textContent='Speech input is unavailable here. Try typing or uploading an image. · माइक्रोफोन उपलब्ध छैन।';return}
  if(recognition){recognition.stop();return}
  try{
   recognition=new API();recognition.lang=nativeDirection(sec)==='ne'?'ne-NP':'en-US';
   recognition.interimResults=false;
   recognition.onresult=e=>{const phrase=e.results?.[0]?.[0]?.transcript;
    if(phrase){ensureTyping();safeInput(d,input,phrase);notice.textContent='Speech captured. Press Translate · अनुवाद थिच्नुहोस्।';}};
   recognition.onerror=()=>{notice.textContent='Microphone unavailable or permission denied · माइक्रोफोनको अनुमति छैन।';};
   recognition.onend=()=>{recognition=null;};
   recognition.start();notice.textContent='Listening… · सुन्दैछ…';
  }catch(_){recognition=null;notice.textContent='Unable to start the microphone · माइक्रोफोन सुरु भएन।';}
 });
 function resultText(){
  return (output.innerText||output.textContent||'').trim();
 }
 copy.addEventListener('click',async()=>{
  const txt=resultText();
  if(!txt){notice.textContent='Translate first · पहिले अनुवाद गर्नुहोस्।';return}
  try{await d.defaultView.navigator.clipboard.writeText(txt);notice.textContent='Copied! · प्रतिलिपि भयो।';}
  catch(_){notice.textContent='Copy permission unavailable; select the result manually. · आफैं कपी गर्नुहोस्।';}
 });
 speakOut.addEventListener('click',()=>{
  const txt=resultText(),v=d.defaultView;
  if(!txt){notice.textContent='Translate first · पहिले अनुवाद गर्नुहोस्।';return}
  if(!v.speechSynthesis||!v.SpeechSynthesisUtterance){notice.textContent='Audio is unavailable in this browser. · आवाज उपलब्ध छैन।';return}
  v.speechSynthesis.cancel();
  const utterance=new v.SpeechSynthesisUtterance(txt);
  utterance.lang=nativeDirection(sec)==='ne'?'en-US':'ne-NP';
  v.speechSynthesis.speak(utterance);
 });
 save.addEventListener('click',()=>{
  const txt=resultText();
  if(!txt){notice.textContent='Translate first · पहिले अनुवाद गर्नुहोस्।';return}
  if(saving.has(txt)){saving.delete(txt);save.textContent='☆ Save · सेभ';notice.textContent='Removed from session bookmarks.';}
  else{saving.add(txt);save.textContent='★ Saved';notice.textContent='Saved for this open session only · यो सत्रमा मात्र सेभ भयो।';}
 });
 // Observe native result updates to suppress redundant empty placeholder.
 const observer=new d.defaultView.MutationObserver(()=>{
  const filled=!!output.textContent.trim();
  placeholder.hidden=filled;emptyIcon.hidden=filled;
 });
 observer.observe(output,{subtree:true,childList:true,characterData:true});
 const clearResult=()=>{placeholder.hidden=!!output.textContent.trim();emptyIcon.hidden=!!output.textContent.trim();};
 dir.addEventListener('click',()=>{d.defaultView.setTimeout(directionUI,0)});
 input.addEventListener('input',updateCounter);
 clear?.addEventListener('click',()=>{d.defaultView.setTimeout(()=>{updateCounter();clearResult();},0)});
 // When the private camera is open, native controls should remain visible.
 const originalTip=tip;
 if(originalTip){
  const details=put(d,root,'details','ttx-native-tips');
  put(d,details,'summary','','Additional translation tips · थप सुझाव');
  details.appendChild(originalTip);
 }
 const festival=sec.querySelector('#festivalBox');
 if(festival)festival.classList.add('ttx-hidden-native-festival');
 // Put the meaningful sections in the screenshot order.
 root.insertBefore(hero,root.firstChild);
 hero.insertAdjacentElement('afterend',workspace);
 workspace.insertAdjacentElement('afterend',topicSection);
 topicSection.insertAdjacentElement('afterend',exampleSection);
 sec.dataset.sikauStudio='4';
 sec.classList.add('sikau-studio-v4');
 directionUI();updateCounter();clearResult();
};
})();