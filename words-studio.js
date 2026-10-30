/* English Sikau Words Studio — presentation-layer enhancement.
 * Runs only inside an authorized, already-loaded private lesson frame.
 * Preserves native dictionary and phrasebook elements, handlers, and saves.
 */
(function(){
'use strict';
const STYLE_URL=new URL('words-studio.css?v=20261020-shuffle-220-r1',document.baseURI).href;
const vocabulary=[
['adventure','साहसिक यात्रा','travel','noun',2,'An exciting or unusual experience or journey.','We went on an adventure in the mountains.','हामी पहाडमा साहसिक यात्रामा गयौं।'],
['beautiful','सुन्दर','nature','adjective',1,'Pleasant or lovely to see.','Pokhara is a beautiful city.','पोखरा एउटा सुन्दर सहर हो।'],
['delicious','स्वादिष्ट','food','adjective',1,'Having a very pleasant taste.','This momo is delicious.','यो मःम स्वादिष्ट छ।'],
['mountain','पहाड','nature','noun',1,'A very high area of land.','We can see the mountain from here.','हामी यहाँबाट पहाड देख्न सक्छौं।'],
['practice','अभ्यास गर्नु','school','verb',1,'To do something regularly to improve.','I practice English every day.','म हरेक दिन अंग्रेजी अभ्यास गर्छु।'],
['culture','संस्कृति','culture','noun',3,'The traditions, beliefs, and ways of life of a group.','Nepal has a rich culture.','नेपालमा समृद्ध संस्कृति छ।'],
['hello','नमस्ते','daily','interjection',1,'A greeting when meeting someone.','Hello! How are you?','नमस्ते! तपाईंलाई कस्तो छ?'],
['goodbye','बिदा','daily','interjection',1,'Something you say when leaving.','Goodbye! See you tomorrow.','बिदा! भोलि भेटौंला।'],
['please','कृपया','daily','adverb',1,'A polite word used when requesting something.','Please help me.','कृपया मलाई मद्दत गर्नुहोस्।'],
['thank you','धन्यवाद','daily','phrase',1,'Words used to express gratitude.','Thank you for your help.','तपाईंको मद्दतका लागि धन्यवाद।'],
['friend','साथी','family','noun',1,'A person you like and trust.','My friend lives in Kathmandu.','मेरो साथी काठमाडौंमा बस्छ।'],
['family','परिवार','family','noun',1,'People related to one another.','My family lives in Nepal.','मेरो परिवार नेपालमा बस्छ।'],
['mother','आमा','family','noun',1,'A female parent.','My mother cooks delicious food.','मेरी आमाले स्वादिष्ट खाना पकाउनुहुन्छ।'],
['brother','दाजु वा भाइ','family','noun',1,'A male sibling.','My brother is studying.','मेरो दाजु पढ्दै हुनुहुन्छ।'],
['momo','मःम','food','noun',1,'A popular Nepali dumpling dish.','We ate momo for lunch.','हामीले दिउँसो मःम खायौं।'],
['rice','भात','food','noun',1,'A grain commonly eaten as food.','I eat rice for dinner.','म बेलुकाको खानामा भात खान्छु।'],
['water','पानी','food','noun',1,'A clear liquid that people drink.','May I have some water?','मलाई अलिकति पानी दिनुहुन्छ?'],
['restaurant','रेस्टुरेन्ट','food','noun',2,'A place where meals are prepared and served.','This restaurant serves Nepali food.','यो रेस्टुरेन्टमा नेपाली खाना पाइन्छ।'],
['journey','यात्रा','travel','noun',2,'Travel from one place to another.','Our journey started early.','हाम्रो यात्रा बिहानै सुरु भयो।'],
['ticket','टिकट','travel','noun',1,'A pass used for a journey or event.','I bought a bus ticket.','मैले बसको टिकट किनें।'],
['airport','विमानस्थल','travel','noun',2,'A place where airplanes arrive and depart.','We arrived at the airport on time.','हामी समयमै विमानस्थल पुग्यौं।'],
['destination','गन्तव्य','travel','noun',3,'The place someone is traveling to.','Pokhara is our destination.','पोखरा हाम्रो गन्तव्य हो।'],
['teacher','शिक्षक','school','noun',1,'A person who teaches students.','My teacher speaks English.','मेरो शिक्षक अंग्रेजी बोल्नुहुन्छ।'],
['student','विद्यार्थी','school','noun',1,'A person who studies at school or college.','She is a university student.','उनी विश्वविद्यालयकी विद्यार्थी हुन्।'],
['book','किताब','school','noun',1,'Pages bound together for reading.','I read an English book.','म अंग्रेजी किताब पढ्छु।'],
['lesson','पाठ','school','noun',2,'Something taught or learned.','Today’s lesson is easy.','आजको पाठ सजिलो छ।'],
['job','जागिर','work','noun',1,'Regular paid work.','I am looking for a job.','म जागिर खोज्दै छु।'],
['office','कार्यालय','work','noun',1,'A place where people work.','My office opens at nine.','मेरो कार्यालय नौ बजे खुल्छ।'],
['meeting','बैठक','work','noun',2,'An event where people come together to discuss things.','We have a meeting today.','आज हाम्रो बैठक छ।'],
['customer','ग्राहक','work','noun',2,'A person who buys goods or services.','The customer asked a question.','ग्राहकले एउटा प्रश्न सोधे।'],
['happy','खुसी','emotions','adjective',1,'Feeling joy or pleasure.','I am happy today.','म आज खुसी छु।'],
['sad','दुःखी','emotions','adjective',1,'Feeling unhappy.','He feels sad today.','उनी आज दुःखी छन्।'],
['excited','उत्साहित','emotions','adjective',2,'Feeling happy and eager about something.','I am excited to visit Nepal.','म नेपाल घुम्न उत्साहित छु।'],
['confident','आत्मविश्वासी','emotions','adjective',3,'Feeling sure of your ability.','Practice helps me feel confident.','अभ्यासले मलाई आत्मविश्वासी बनाउँछ।'],
['river','नदी','nature','noun',1,'A natural flow of water.','The river flows through the valley.','नदी उपत्यकाबाट बग्छ।'],
['forest','जंगल','nature','noun',2,'A large area filled with trees.','We walked through the forest.','हामी जंगल हुँदै हिँड्यौं।'],
['lake','ताल','nature','noun',1,'A large body of water surrounded by land.','Phewa Lake is in Pokhara.','फेवा ताल पोखरामा छ।'],
['festival','चाडपर्व','culture','noun',2,'A celebration held by a community.','Tihar is a festival of lights.','तिहार बत्तीको चाड हो।'],
['tradition','परम्परा','culture','noun',3,'A custom passed down through generations.','Our family follows this tradition.','हाम्रो परिवारले यो परम्परा मान्छ।'],
['temple','मन्दिर','culture','noun',1,'A building used for worship.','We visited a temple in Kathmandu.','हामी काठमाडौंको एउटा मन्दिर गयौं।'],
['doctor','डाक्टर','health','noun',1,'A person trained to treat illness.','The doctor helped my father.','डाक्टरले मेरा बुबालाई मद्दत गर्नुभयो।'],
['healthy','स्वस्थ','health','adjective',2,'In good physical or mental condition.','Healthy food helps us grow.','स्वस्थ खानाले हामीलाई बढ्न मद्दत गर्छ।'],
['exercise','व्यायाम','health','noun',2,'Physical activity to keep fit.','I do exercise every morning.','म हरेक बिहान व्यायाम गर्छु।'],
['medicine','औषधि','health','noun',2,'Something used to treat illness.','Take the medicine as directed.','निर्देशनअनुसार औषधि खानुहोस्।'],
['learn','सिक्नु','school','verb',1,'To gain knowledge or a skill.','I want to learn English.','म अंग्रेजी सिक्न चाहन्छु।'],
['speak','बोल्नु','daily','verb',1,'To say words aloud.','Can you speak slowly?','तपाईं बिस्तारै बोल्न सक्नुहुन्छ?'],
['understand','बुझ्नु','daily','verb',2,'To know the meaning of something.','I understand this sentence.','म यो वाक्य बुझ्छु।'],
['prepare','तयार गर्नु','work','verb',2,'To make something ready.','I prepare for work every morning.','म हरेक बिहान कामका लागि तयार हुन्छु।'],
['neighbor','छिमेकी','family','noun',2,'A person who lives nearby.','Our neighbor is very kind.','हाम्रो छिमेकी धेरै दयालु हुनुहुन्छ।'],
['morning','बिहान','daily','noun',1,'The early part of the day.','I study in the morning.','म बिहान पढ्छु।'],
['market','बजार','daily','noun',1,'A place where goods are bought and sold.','We went to the market.','हामी बजार गयौं।'],
['village','गाउँ','travel','noun',1,'A small settlement in the countryside.','My village is near Pokhara.','मेरो गाउँ पोखरा नजिक छ।'],
['sunrise','सूर्योदय','nature','noun',2,'The moment when the sun appears in the morning.','We watched the sunrise in the hills.','हामीले डाँडामा सूर्योदय हेर्‍यौं।'],
['proud','गर्वित','emotions','adjective',2,'Feeling pleased about an achievement.','I am proud of my progress.','म आफ्नो प्रगतिमा गर्वित छु।']
].map(a=>({word:a[0],ne:a[1],category:a[2],type:a[3],level:a[4],definition:a[5],example:a[6],exampleNe:a[7],saved:false}));

// Additional bilingual study vocabulary. No changes to verified student progress.
vocabulary.push(...[["apple","स्याउ","fruits","noun",1,"A kind of fruit people eat.","I eat an apple after lunch.","म दिउँसोको खानापछि स्याउ खान्छु।"],["banana","केरा","fruits","noun",1,"A kind of fruit people eat.","She eats a banana for breakfast.","उनी बिहान केरा खान्छिन्।"],["orange","सुन्तला","fruits","noun",1,"A kind of fruit people eat.","This orange is sweet.","यो सुन्तला गुलियो छ।"],["mango","आँप","fruits","noun",1,"A kind of fruit people eat.","I like ripe mangoes.","मलाई पाकेका आँप मन पर्छन्।"],["grape","अंगुर","fruits","noun",1,"A kind of fruit people eat.","We bought green grapes.","हामीले हरिया अंगुर किन्यौं।"],["watermelon","तरबुजा","fruits","noun",1,"A kind of fruit people eat.","Watermelon tastes refreshing.","तरबुजा खाँदा ताजगी मिल्छ।"],["papaya","मेवा","fruits","noun",2,"A kind of fruit people eat.","My father cut a papaya.","मेरा बुबाले मेवा काट्नुभयो।"],["pineapple","भुइँकटहर","fruits","noun",2,"A kind of fruit people eat.","Pineapple juice is delicious.","भुइँकटहरको रस मिठो छ।"],["strawberry","स्ट्रबेरी","fruits","noun",2,"A kind of fruit people eat.","I put strawberries in a bowl.","मैले कचौरामा स्ट्रबेरी राखें।"],["pomegranate","अनार","fruits","noun",2,"A kind of fruit people eat.","The pomegranate has many seeds.","अनारमा धेरै दाना हुन्छन्।"],["guava","अम्बा","fruits","noun",1,"A kind of fruit people eat.","A guava grew in our garden.","हाम्रो बगैंचामा अम्बा फल्यो।"],["pear","नासपाती","fruits","noun",2,"A kind of fruit people eat.","I packed a pear in my bag.","मैले झोलामा नासपाती राखें।"],["peach","आरु","fruits","noun",2,"A kind of fruit people eat.","This peach is ripe.","यो आरु पाकेको छ।"],["lemon","कागती","fruits","noun",1,"A kind of fruit people eat.","Please add lemon to my tea.","कृपया मेरो चियामा कागती हाल्नुहोस्।"],["coconut","नरिवल","fruits","noun",2,"A kind of fruit people eat.","We drank coconut water.","हामीले नरिवलको पानी पियौं।"],["cherry","चेरी","fruits","noun",2,"A kind of fruit people eat.","The cake has a cherry on top.","केकमाथि चेरी छ।"],["kiwi","किवी","fruits","noun",3,"A kind of fruit people eat.","I ate a kiwi yesterday.","मैले हिजो किवी खाएँ।"],["plum","आलुबखडा","fruits","noun",2,"A kind of fruit people eat.","This plum is sour.","यो आलुबखडा अमिलो छ।"],["lychee","लिची","fruits","noun",2,"A kind of fruit people eat.","We shared a bowl of lychees.","हामीले एक कचौरा लिची बाँडेर खायौं।"],["fig","अञ्जिर","fruits","noun",3,"A kind of fruit people eat.","I tasted a dried fig.","मैले सुकेको अञ्जिर चाखें।"],["potato","आलु","vegetables","noun",1,"A vegetable or ingredient used in cooking.","We cooked potatoes for dinner.","हामीले बेलुकाको खानामा आलु पकायौं।"],["tomato","गोलभेंडा","vegetables","noun",1,"A vegetable or ingredient used in cooking.","Please cut the tomato.","कृपया गोलभेंडा काट्नुहोस्।"],["onion","प्याज","vegetables","noun",1,"A vegetable or ingredient used in cooking.","Add the onion to the pan.","कराहीमा प्याज हाल्नुहोस्।"],["carrot","गाजर","vegetables","noun",1,"A vegetable or ingredient used in cooking.","The rabbit is eating a carrot.","खरायोले गाजर खाँदै छ।"],["cabbage","बन्दाकोबी","vegetables","noun",1,"A vegetable or ingredient used in cooking.","We cooked cabbage today.","हामीले आज बन्दाकोबी पकायौं।"],["cauliflower","काउली","vegetables","noun",1,"A vegetable or ingredient used in cooking.","I bought fresh cauliflower.","मैले ताजा काउली किनें।"],["spinach","पालुंगो","vegetables","noun",1,"A vegetable or ingredient used in cooking.","Spinach is a leafy vegetable.","पालुंगो सागपात हो।"],["cucumber","काँक्रो","vegetables","noun",1,"A vegetable or ingredient used in cooking.","I sliced a cucumber for salad.","मैले सलादका लागि काँक्रो काटें।"],["pumpkin","फर्सी","vegetables","noun",1,"A vegetable or ingredient used in cooking.","We made pumpkin soup.","हामीले फर्सीको सुप बनायौं।"],["radish","मूला","vegetables","noun",1,"A vegetable or ingredient used in cooking.","My family grows radishes.","मेरो परिवारले मूला उमार्छ।"],["eggplant","भन्टा","vegetables","noun",2,"A vegetable or ingredient used in cooking.","Eggplant is delicious when roasted.","पोलेको भन्टा मिठो हुन्छ।"],["okra","भिन्डी","vegetables","noun",2,"A vegetable or ingredient used in cooking.","We eat okra with rice.","हामी भातसँग भिन्डी खान्छौं।"],["garlic","लसुन","vegetables","noun",1,"A vegetable or ingredient used in cooking.","Please crush the garlic.","कृपया लसुन कुट्नुहोस्।"],["ginger","अदुवा","vegetables","noun",1,"A vegetable or ingredient used in cooking.","I put ginger in the tea.","मैले चियामा अदुवा हालें।"],["peas","केराउ","vegetables","noun",1,"A vegetable or ingredient used in cooking.","My sister likes green peas.","मेरी बहिनीलाई हरियो केराउ मन पर्छ।"],["broccoli","ब्रोकाउली","vegetables","noun",2,"A vegetable or ingredient used in cooking.","Steam the broccoli.","ब्रोकाउली बाफमा पकाउनुहोस्।"],["bell pepper","भेडे खुर्सानी","vegetables","noun",2,"A vegetable or ingredient used in cooking.","We added bell pepper to the noodles.","हामीले चाउचाउमा भेडे खुर्सानी हाल्यौं।"],["bitter gourd","करेला","vegetables","noun",2,"A vegetable or ingredient used in cooking.","My mother cooked bitter gourd.","मेरी आमाले करेला पकाउनुभयो।"],["bottle gourd","लौका","vegetables","noun",2,"A vegetable or ingredient used in cooking.","Bottle gourd curry is mild.","लौकाको तरकारी हल्का स्वादको हुन्छ।"],["green beans","सिमी","vegetables","noun",1,"A vegetable or ingredient used in cooking.","We picked green beans from the garden.","हामीले बगैंचाबाट सिमी टिप्यौं।"],["mushroom","च्याउ","vegetables","noun",2,"A vegetable or ingredient used in cooking.","I bought mushrooms for soup.","मैले सुपका लागि च्याउ किनें।"],["corn","मकै","vegetables","noun",1,"A vegetable or ingredient used in cooking.","We roasted corn by the fire.","हामीले आगोमा मकै पोल्यौं।"],["lettuce","सलाद पात","vegetables","noun",2,"A vegetable or ingredient used in cooking.","Put lettuce in the sandwich.","स्यान्डविचमा सलाद पात राख्नुहोस्।"],["beetroot","चुकन्दर","vegetables","noun",3,"A vegetable or ingredient used in cooking.","Beetroot makes this salad colorful.","चुकन्दरले यो सलाद रङ्गीन बनाउँछ।"],["bread","पाउरोटी","food","noun",1,"A food or drink used in everyday meals.","I eat bread in the morning.","म बिहान पाउरोटी खान्छु।"],["milk","दूध","food","noun",1,"A food or drink used in everyday meals.","The child drinks milk.","बालकले दूध पिउँछ।"],["egg","अण्डा","food","noun",1,"A food or drink used in everyday meals.","She boiled an egg.","उनले अण्डा उसिनिन्।"],["tea","चिया","food","noun",1,"A food or drink used in everyday meals.","Would you like some tea?","के तपाईं चिया पिउन चाहनुहुन्छ?"],["coffee","कफी","food","noun",1,"A food or drink used in everyday meals.","My uncle drinks coffee at work.","मेरा काकाले काममा कफी पिउनुहुन्छ।"],["salt","नुन","food","noun",1,"A food or drink used in everyday meals.","This soup needs salt.","यो सुपमा नुन चाहिन्छ।"],["sugar","चिनी","food","noun",1,"A food or drink used in everyday meals.","Please add less sugar.","कृपया कम चिनी हाल्नुहोस्।"],["butter","मक्खन","food","noun",1,"A food or drink used in everyday meals.","I spread butter on bread.","मैले पाउरोटीमा मक्खन लगाएँ।"],["cheese","चिज","food","noun",2,"A food or drink used in everyday meals.","The sandwich has cheese.","स्यान्डविचमा चिज छ।"],["yogurt","दही","food","noun",1,"A food or drink used in everyday meals.","We eat yogurt with fruit.","हामी फलफूलसँग दही खान्छौं।"],["soup","सुप","food","noun",1,"A food or drink used in everyday meals.","The soup is still hot.","सुप अझै तातो छ।"],["noodles","चाउचाउ","food","noun",1,"A food or drink used in everyday meals.","I cooked noodles for lunch.","मैले दिउँसो चाउचाउ पकाएँ।"],["breakfast","बिहानको खाना","food","noun",1,"A food or drink used in everyday meals.","Breakfast is ready.","बिहानको खाना तयार छ।"],["lunch","दिउँसोको खाना","food","noun",1,"A food or drink used in everyday meals.","I packed my lunch.","मैले दिउँसोको खाना प्याक गरें।"],["dinner","बेलुकाको खाना","food","noun",1,"A food or drink used in everyday meals.","We ate dinner together.","हामीले सँगै बेलुकाको खाना खायौं।"],["house","घर","daily","noun",1,"A common English word used in everyday life.","Our house has a garden.","हाम्रो घरमा बगैंचा छ।"],["door","ढोका","daily","noun",1,"A common English word used in everyday life.","Please close the door.","कृपया ढोका बन्द गर्नुहोस्।"],["window","झ्याल","daily","noun",1,"A common English word used in everyday life.","Open the window, please.","कृपया झ्याल खोल्नुहोस्।"],["chair","कुर्सी","daily","noun",1,"A common English word used in everyday life.","Sit on the chair.","कुर्सीमा बस्नुहोस्।"],["table","टेबल","daily","noun",1,"A common English word used in everyday life.","The book is on the table.","किताब टेबलमा छ।"],["phone","फोन","daily","noun",1,"A common English word used in everyday life.","My phone is charging.","मेरो फोन चार्ज हुँदै छ।"],["key","साँचो","daily","noun",1,"A common English word used in everyday life.","I cannot find my key.","मैले आफ्नो साँचो भेटिनँ।"],["bag","झोला","daily","noun",1,"A common English word used in everyday life.","Put the apples in the bag.","स्याउहरू झोलामा राख्नुहोस्।"],["clothes","लुगा","daily","noun",1,"A common English word used in everyday life.","My clothes are clean.","मेरा लुगा सफा छन्।"],["shoes","जुत्ता","daily","noun",1,"A common English word used in everyday life.","Take off your shoes.","आफ्ना जुत्ता खोल्नुहोस्।"],["clock","घडी","daily","noun",1,"A common English word used in everyday life.","Look at the clock.","घडी हेर्नुहोस्।"],["umbrella","छाता","daily","noun",1,"A common English word used in everyday life.","Take an umbrella today.","आज छाता लिएर जानुहोस्।"],["money","पैसा","daily","noun",1,"A common English word used in everyday life.","I saved some money.","मैले केही पैसा बचत गरें।"],["bus","बस","daily","noun",1,"A common English word used in everyday life.","The bus is late.","बस ढिलो आएको छ।"],["street","सडक","daily","noun",1,"A common English word used in everyday life.","This street is busy.","यो सडक व्यस्त छ।"],["open","खोल्नु","daily","verb",1,"A common English word used in everyday life.","Please open the door.","कृपया ढोका खोल्नुहोस्।"],["close","बन्द गर्नु","daily","verb",1,"A common English word used in everyday life.","Close the window.","झ्याल बन्द गर्नुहोस्।"],["wash","धुनु","daily","verb",1,"A common English word used in everyday life.","Wash your hands.","आफ्ना हात धुनुहोस्।"],["carry","बोक्नु","daily","verb",2,"A common English word used in everyday life.","Can you carry this bag?","के तपाईं यो झोला बोक्न सक्नुहुन्छ?"],["borrow","सापटी लिनु","daily","verb",2,"A common English word used in everyday life.","May I borrow your pen?","के म तपाईंको कलम सापटी लिन सक्छु?"],["remember","सम्झनु","daily","verb",2,"A common English word used in everyday life.","Remember this new word.","यो नयाँ शब्द सम्झनुहोस्।"],["forget","बिर्सनु","daily","verb",2,"A common English word used in everyday life.","Do not forget your homework.","आफ्नो गृहकार्य नबिर्सनुहोस्।"],["choose","छान्नु","daily","verb",2,"A common English word used in everyday life.","Choose your favorite fruit.","आफूलाई मन पर्ने फल छान्नुहोस्।"],["pen","कलम","school","noun",1,"A useful English word for school and learning.","I need a blue pen.","मलाई नीलो कलम चाहिन्छ।"],["pencil","सिसाकलम","school","noun",1,"A useful English word for school and learning.","The pencil is sharp.","सिसाकलम तिखो छ।"],["notebook","कापी","school","noun",1,"A useful English word for school and learning.","Write in your notebook.","आफ्नो कापीमा लेख्नुहोस्।"],["classroom","कक्षाकोठा","school","noun",1,"A useful English word for school and learning.","Our classroom is bright.","हाम्रो कक्षाकोठा उज्यालो छ।"],["homework","गृहकार्य","school","noun",1,"A useful English word for school and learning.","I finished my homework.","मैले गृहकार्य सकाएँ।"],["question","प्रश्न","school","noun",1,"A useful English word for school and learning.","I have a question.","मसँग एउटा प्रश्न छ।"],["answer","उत्तर","school","noun",1,"A useful English word for school and learning.","Your answer is correct.","तपाईंको उत्तर सही छ।"],["dictionary","शब्दकोश","school","noun",2,"A useful English word for school and learning.","Use a dictionary.","शब्दकोश प्रयोग गर्नुहोस्।"],["library","पुस्तकालय","school","noun",2,"A useful English word for school and learning.","We went to the library.","हामी पुस्तकालय गयौं।"],["exam","परीक्षा","school","noun",2,"A useful English word for school and learning.","My exam is on Friday.","मेरो परीक्षा शुक्रबार छ।"],["grammar","व्याकरण","school","noun",2,"A useful English word for school and learning.","We are learning grammar.","हामी व्याकरण सिक्दै छौं।"],["pronunciation","उच्चारण","school","noun",3,"A useful English word for school and learning.","Practice your pronunciation.","आफ्नो उच्चारण अभ्यास गर्नुहोस्।"],["read","पढ्नु","school","verb",1,"A useful English word for school and learning.","I read every day.","म हरेक दिन पढ्छु।"],["write","लेख्नु","school","verb",1,"A useful English word for school and learning.","Please write your name.","कृपया आफ्नो नाम लेख्नुहोस्।"],["listen","सुन्नु","school","verb",1,"A useful English word for school and learning.","Listen to the teacher.","शिक्षकको कुरा सुन्नुहोस्।"],["repeat","दोहोर्‍याउनु","school","verb",1,"A useful English word for school and learning.","Please repeat the sentence.","कृपया वाक्य दोहोर्‍याउनुहोस्।"],["explain","बुझाउनु","school","verb",2,"A useful English word for school and learning.","Can you explain this lesson?","के तपाईं यो पाठ बुझाउन सक्नुहुन्छ?"],["improve","सुधार गर्नु","school","verb",2,"A useful English word for school and learning.","I want to improve my English.","म आफ्नो अंग्रेजी सुधार्न चाहन्छु।"],["salary","तलब","work","noun",2,"A common English word used at work or while shopping.","Her salary arrives every month.","उनको तलब हरेक महिना आउँछ।"],["coworker","सहकर्मी","work","noun",2,"A common English word used at work or while shopping.","My coworker helped me.","मेरो सहकर्मीले मलाई मद्दत गर्नुभयो।"],["manager","प्रबन्धक","work","noun",2,"A common English word used at work or while shopping.","The manager is in a meeting.","प्रबन्धक बैठकमा हुनुहुन्छ।"],["schedule","समयतालिका","work","noun",2,"A common English word used at work or while shopping.","Check your work schedule.","आफ्नो कामको समयतालिका हेर्नुहोस्।"],["interview","अन्तर्वार्ता","work","noun",2,"A common English word used at work or while shopping.","I have an interview tomorrow.","मेरो भोलि अन्तर्वार्ता छ।"],["receipt","रसिद","work","noun",1,"A common English word used at work or while shopping.","Keep your receipt.","आफ्नो रसिद सुरक्षित राख्नुहोस्।"],["cash","नगद","work","noun",1,"A common English word used at work or while shopping.","Do you accept cash?","के तपाईं नगद लिनुहुन्छ?"],["change","फिर्ता पैसा","work","noun",2,"A common English word used at work or while shopping.","Here is your change.","यहाँ तपाईंको फिर्ता पैसा छ।"],["inventory","मौज्दात","work","noun",3,"A common English word used at work or while shopping.","We counted the store inventory.","हामीले पसलको मौज्दात गन्यौं।"],["delivery","सामान पुर्‍याउने काम","work","noun",2,"A common English word used at work or while shopping.","The delivery arrived early.","सामान बिहानै आइपुग्यो।"],["computer","कम्प्युटर","work","noun",1,"A common English word used at work or while shopping.","I use a computer at work.","म काममा कम्प्युटर प्रयोग गर्छु।"],["email","इमेल","work","noun",1,"A common English word used at work or while shopping.","Please check your email.","कृपया आफ्नो इमेल हेर्नुहोस्।"],["passport","राहदानी","travel","noun",2,"A useful word for places, transport, and travel.","Do not forget your passport.","आफ्नो राहदानी नबिर्सनुहोस्।"],["hotel","होटल","travel","noun",1,"A useful word for places, transport, and travel.","We stayed in a small hotel.","हामी सानो होटलमा बस्यौं।"],["taxi","ट्याक्सी","travel","noun",1,"A useful word for places, transport, and travel.","I took a taxi to the station.","म ट्याक्सी चढेर स्टेसन गएँ।"],["station","स्टेसन","travel","noun",1,"A useful word for places, transport, and travel.","The bus station is nearby.","बस स्टेसन नजिकै छ।"],["map","नक्सा","travel","noun",1,"A useful word for places, transport, and travel.","Look at the map.","नक्सा हेर्नुहोस्।"],["bridge","पुल","travel","noun",2,"A useful word for places, transport, and travel.","We crossed the bridge.","हामी पुल तरेर गयौं।"],["flight","हवाई उडान","travel","noun",2,"A useful word for places, transport, and travel.","Our flight leaves at noon.","हाम्रो हवाई उडान दिउँसो छ।"],["luggage","सामान","travel","noun",2,"A useful word for places, transport, and travel.","Our luggage is heavy.","हाम्रो सामान गह्रौं छ।"],["direction","दिशा","travel","noun",2,"A useful word for places, transport, and travel.","Please give me directions.","कृपया मलाई बाटो बताइदिनुहोस्।"],["bicycle","साइकल","travel","noun",1,"A useful word for places, transport, and travel.","My sister rides a bicycle.","मेरी बहिनी साइकल चलाउँछिन्।"],["father","बुबा","family","noun",1,"A word for relatives and family relationships.","My father likes gardening.","मेरो बुबालाई बगैंचाको काम मन पर्छ।"],["sister","दिदी वा बहिनी","family","noun",1,"A word for relatives and family relationships.","My sister loves music.","मेरी दिदीलाई सङ्गीत मन पर्छ।"],["daughter","छोरी","family","noun",1,"A word for relatives and family relationships.","Their daughter is at school.","उनीहरूको छोरी विद्यालयमा छिन्।"],["son","छोरा","family","noun",1,"A word for relatives and family relationships.","Our son is learning English.","हाम्रो छोरा अंग्रेजी सिक्दै छ।"],["grandmother","हजुरआमा","family","noun",1,"A word for relatives and family relationships.","My grandmother tells stories.","मेरी हजुरआमाले कथा सुनाउनुहुन्छ।"],["grandfather","हजुरबुबा","family","noun",1,"A word for relatives and family relationships.","My grandfather lives in the village.","मेरा हजुरबुबा गाउँमा बस्नुहुन्छ।"],["uncle","काका वा मामा","family","noun",2,"A word for relatives and family relationships.","My uncle is visiting us.","मेरा काका हामीलाई भेट्न आउँदै हुनुहुन्छ।"],["aunt","काकी वा माइजू","family","noun",2,"A word for relatives and family relationships.","My aunt made tea.","मेरी काकीले चिया बनाउनुभयो।"],["cousin","काका वा मामाका छोराछोरी","family","noun",2,"A word for relatives and family relationships.","My cousin studies in Pokhara.","मेरो काकाको छोरा पोखरामा पढ्छ।"],["baby","शिशु","family","noun",1,"A word for relatives and family relationships.","The baby is sleeping.","शिशु सुतिरहेको छ।"],["angry","रिसाएको","emotions","adjective",1,"A word that describes a feeling or personal quality.","He is angry about the mistake.","उनी गल्तीका कारण रिसाएका छन्।"],["tired","थकित","emotions","adjective",1,"A word that describes a feeling or personal quality.","I feel tired after work.","म कामपछि थकित महसुस गर्छु।"],["worried","चिन्तित","emotions","adjective",2,"A word that describes a feeling or personal quality.","She is worried about the exam.","उनी परीक्षाबारे चिन्तित छिन्।"],["surprised","अचम्मित","emotions","adjective",2,"A word that describes a feeling or personal quality.","I was surprised by the gift.","उपहार देखेर म अचम्मित भएँ।"],["calm","शान्त","emotions","adjective",2,"A word that describes a feeling or personal quality.","Please stay calm.","कृपया शान्त रहनुहोस्।"],["nervous","आत्तिएको","emotions","adjective",2,"A word that describes a feeling or personal quality.","I feel nervous before interviews.","म अन्तर्वार्ताअघि आत्तिन्छु।"],["brave","साहसी","emotions","adjective",2,"A word that describes a feeling or personal quality.","The brave child asked a question.","साहसी बालकले प्रश्न सोध्यो।"],["kind","दयालु","emotions","adjective",1,"A word that describes a feeling or personal quality.","Our teacher is kind.","हाम्रा शिक्षक दयालु हुनुहुन्छ।"],["tree","रुख","nature","noun",1,"A word for something in the natural world.","We planted a tree.","हामीले एउटा रुख रोप्यौं।"],["flower","फूल","nature","noun",1,"A word for something in the natural world.","This flower smells sweet.","यो फूलको सुगन्ध मिठो छ।"],["sun","सूर्य","nature","noun",1,"A word for something in the natural world.","The sun is shining.","सूर्य चम्किरहेको छ।"],["moon","चन्द्रमा","nature","noun",1,"A word for something in the natural world.","The moon is bright tonight.","आज राति चन्द्रमा उज्यालो छ।"],["rain","वर्षा","nature","noun",1,"A word for something in the natural world.","The rain has stopped.","वर्षा रोकिएको छ।"],["snow","हिउँ","nature","noun",1,"A word for something in the natural world.","Snow covers the mountains.","हिमालहरू हिउँले ढाकिएका छन्।"],["wind","हावा","nature","noun",1,"A word for something in the natural world.","The wind is strong today.","आज हावा जोडले चलिरहेको छ।"],["bird","चरा","nature","noun",1,"A word for something in the natural world.","A bird is singing outside.","बाहिर चरा चिर्बिराइरहेको छ।"],["animal","जनावर","nature","noun",1,"A word for something in the natural world.","This animal lives in the forest.","यो जनावर जंगलमा बस्छ।"],["sky","आकाश","nature","noun",1,"A word for something in the natural world.","The sky looks blue today.","आज आकाश नीलो देखिन्छ।"],["hospital","अस्पताल","health","noun",1,"A word commonly used when discussing health and care.","The hospital is nearby.","अस्पताल नजिकै छ।"],["nurse","नर्स","health","noun",1,"A word commonly used when discussing health and care.","The nurse checked my temperature.","नर्सले मेरो तापक्रम जाँच्नुभयो।"],["fever","ज्वरो","health","noun",1,"A word commonly used when discussing health and care.","He has a fever today.","आज उनलाई ज्वरो आएको छ।"],["headache","टाउको दुखाइ","health","noun",2,"A word commonly used when discussing health and care.","I have a headache.","मलाई टाउको दुखेको छ।"],["pain","दुखाइ","health","noun",1,"A word commonly used when discussing health and care.","Tell the doctor about the pain.","डाक्टरलाई दुखाइबारे भन्नुहोस्।"],["appointment","भेट्ने समय","health","noun",2,"A word commonly used when discussing health and care.","My appointment is at ten.","मेरो भेट्ने समय दस बजे छ।"],["sleep","निद्रा","health","noun",1,"A word commonly used when discussing health and care.","Good sleep is important.","राम्रो निद्रा महत्त्वपूर्ण हुन्छ।"],["rest","आराम","health","noun",1,"A word commonly used when discussing health and care.","You should get some rest.","तपाईंले अलि आराम गर्नुपर्छ।"],["dashain","दशैं","culture","noun",1,"A word used when discussing Nepali traditions and celebrations.","We visit family during Dashain.","हामी दशैंमा परिवारलाई भेट्छौं।"],["tihar","तिहार","culture","noun",1,"A word used when discussing Nepali traditions and celebrations.","We light lamps during Tihar.","हामी तिहारमा दियो बाल्छौं।"],["holi","होली","culture","noun",1,"A word used when discussing Nepali traditions and celebrations.","Children play with colors at Holi.","बालबालिकाहरू होलीमा रङ खेल्छन्।"],["sel roti","सेलरोटी","culture","noun",2,"A word used when discussing Nepali traditions and celebrations.","My grandmother makes sel roti.","मेरी हजुरआमाले सेलरोटी बनाउनुहुन्छ।"],["tika","टीका","culture","noun",1,"A word used when discussing Nepali traditions and celebrations.","We received tika at Dashain.","हामीले दशैंमा टीका लगायौं।"],["blessing","आशीर्वाद","culture","noun",2,"A word used when discussing Nepali traditions and celebrations.","My parents gave me their blessing.","मेरा आमाबुबाले मलाई आशीर्वाद दिनुभयो।"],["wedding","विवाह","culture","noun",1,"A word used when discussing Nepali traditions and celebrations.","We attended a wedding.","हामी विवाह समारोहमा गयौं।"],["music","सङ्गीत","culture","noun",1,"A word used when discussing Nepali traditions and celebrations.","I enjoy Nepali music.","मलाई नेपाली सङ्गीत मन पर्छ।"]].map(a=>({
 word:a[0],ne:a[1],category:a[2],type:a[3],level:a[4],
 definition:a[5],example:a[6],exampleNe:a[7],saved:false
})));
const fruitAndVegetableMeanings={"apple":"A crisp, often red or green fruit that grows on trees.","banana":"A long curved fruit with a yellow peel and soft flesh.","orange":"A round citrus fruit with juicy orange segments.","mango":"A sweet tropical fruit with yellow or orange flesh.","grape":"A small juicy fruit that grows in bunches.","watermelon":"A large fruit with a green rind and juicy red or pink flesh.","papaya":"A tropical fruit with soft orange flesh and black seeds.","pineapple":"A tropical fruit with a rough skin and sweet yellow flesh.","strawberry":"A small red fruit with tiny seeds on its surface.","pomegranate":"A fruit containing many juicy edible seeds.","guava":"A fragrant tropical fruit with sweet or slightly tart flesh.","pear":"A juicy fruit that is often narrower at the top.","peach":"A soft juicy fruit with fuzzy skin and a large stone.","lemon":"A sour yellow citrus fruit, often used to flavor drinks.","coconut":"A large fruit with a hard shell, white flesh, and liquid.","cherry":"A small round fruit with a stone in the middle.","kiwi":"A small brown fruit with fuzzy skin and green flesh.","plum":"A smooth-skinned fruit with a stone and sweet or tart flesh.","lychee":"A small tropical fruit with a rough red skin and sweet white flesh.","fig":"A soft sweet fruit with many tiny seeds inside.","potato":"A starchy underground tuber used in many cooked dishes.","tomato":"A juicy fruit commonly prepared and eaten as a vegetable.","onion":"A layered bulb vegetable with a strong taste and smell.","carrot":"A crunchy root vegetable that is usually orange.","cabbage":"A leafy vegetable that forms a firm round head.","cauliflower":"A vegetable with a white head made of many flower buds.","spinach":"A green leafy vegetable often cooked or eaten fresh.","cucumber":"A long green vegetable usually eaten raw or in salads.","pumpkin":"A large squash with thick skin and orange flesh.","radish":"A crisp root vegetable with a peppery taste.","eggplant":"A vegetable, often purple, with soft flesh when cooked.","okra":"A green seed pod vegetable, sometimes called lady's finger.","garlic":"A strongly flavored bulb used to season food.","ginger":"A spicy aromatic root used in food and tea.","peas":"Small round green seeds eaten as vegetables.","broccoli":"A green vegetable with branching stems and flower buds.","bell pepper":"A mild sweet pepper with thick colorful flesh.","bitter gourd":"A bumpy green vegetable known for its bitter taste.","bottle gourd":"A pale-green gourd with mild-tasting flesh.","green beans":"Long slender green pods eaten as vegetables.","mushroom":"An edible fungus commonly used in cooking.","corn":"A cereal plant that produces ears of yellow or other colored kernels.","lettuce":"A green leafy vegetable commonly used in salads.","beetroot":"A deep red root vegetable with an earthy, slightly sweet taste."};
for(const item of vocabulary){if(fruitAndVegetableMeanings[item.word])item.definition=fruitAndVegetableMeanings[item.word];}
const cats=[
['all','▦','All Words','सबै शब्दहरू'],
['daily','🏠','Daily Life','दैनिक जीवन'],
['food','🍲','Food','खाना'],
['fruits','🍎','Fruits','फलफूल'],
['vegetables','🥕','Vegetables','तरकारी'],
['travel','✈️','Travel','यात्रा'],
['family','👪','Family','परिवार'],
['school','🎓','School','विद्यालय'],
['saved','⭐','Saved','सुरक्षित'],
['work','💼','Work','काम'],
['emotions','❤️','Emotions','भावना'],
['nature','🌳','Nature','प्रकृति'],
['culture','🪔','Culture','संस्कृति'],
['health','🩺','Health','स्वास्थ्य']
];
const categories=Object.fromEntries(cats.map(c=>[c[0],c]));
function el(d,tag,cls,text){
 const node=d.createElement(tag);
 if(cls)node.className=cls;
 if(text!==undefined&&text!==null)node.textContent=String(text);
 return node;
}
function add(d,root,tag,cls,text){const n=el(d,tag,cls,text);root.appendChild(n);return n;}
function readSaved(doc,box){
 const view=doc.defaultView;
 let saved=view?.S?.d?.words;
 if(!saved||typeof saved!=='object')saved={};
 const words=[];
 for(const [k,v] of Object.entries(saved)){
  if(!k||k.length>90)continue;
  words.push({word:k,ne:String(v?.ne||'—'),category:'saved',type:'word',level:null,definition:'A word in your saved English Sikau dictionary.',example:'',exampleNe:'',saved:true});
 }
 // Older private builds may not export S; names can still appear in native box.
 if(!words.length&&box)for(const native of box.querySelectorAll('.w[data-w]')){
  const word=native.dataset.w;
  if(word&&word.length<=90)words.push({word,ne:'—',category:'saved',type:'word',level:null,definition:'Saved in your personal word list.',example:'',exampleNe:'',saved:true});
 }
 return words;
}
function combined(doc,box){
 const native=readSaved(doc,box);
 const merged=new Map(vocabulary.map(item=>[item.word.toLowerCase(),{...item}]));
 for(const item of native){
  const key=item.word.toLowerCase();
  const prev=merged.get(key);
  merged.set(key,prev?{...prev,saved:true,ne:item.ne==='—'?prev.ne:item.ne}:item);
 }
 return [...merged.values()];
}
function speak(doc,text,lang){
 if(!text)return;
 const view=doc.defaultView,locale=lang==='ne'?'ne-NP':'en-US';
 // Words and sample sentences use the same US/Nepali player as Translate.
 try{window.enhanceUnifiedSpeech?.(doc);}catch(_){}
 if(view.__sikauNepaliVoice?.speakText){
  view.__sikauNepaliVoice.speakText(text,locale,'words');
  return;
 }
 // No unverified locale or device-default fallback: missing speech is
 // explained by the shared player after it is loaded.
}
window.enhanceWordsDashboard=function(doc){
 if(!doc?.body||!doc.head)return;
 const section=doc.getElementById('words');
 const content=section?.querySelector(':scope > .content');
 const wordBox=section?.querySelector('#wordBox');
 const phrasebook=section?.querySelector('#pbList');
 const nativeCards=wordBox?.closest('.card')&&phrasebook?.closest('.card')?
 [wordBox.closest('.card'),phrasebook.closest('.card')]:null;
 if(!section||!content||!nativeCards||section.dataset.wordsStudio==='1')return;
 section.dataset.wordsStudio='1';
 if(!doc.getElementById('sikauWordsStudioCSS')){
  const stylesheet=el(doc,'link');stylesheet.rel='stylesheet';
  stylesheet.id='sikauWordsStudioCSS';stylesheet.href=STYLE_URL;doc.head.appendChild(stylesheet);
 }
 let selected='adventure',category='all',query='',level='all',type='all',sort='default',tab='meaning',feedback='',quizValue='',allTopics=false;
 let practiceOrder=[],practiceIndex=0,practiceSignature='';
 let items=combined(doc,wordBox);
 const root=el(doc,'div','wv-root');
 root.id='sikauWordsDashboard';
 const hero=add(doc,root,'section','wv-hero');
 const art=add(doc,hero,'div','wv-hero-art');art.setAttribute('aria-hidden','true');
 const message=add(doc,hero,'div','wv-hero-message');
 add(doc,message,'span','wv-small-banner','WORDS · शब्दहरू');
 const h=add(doc,message,'h1','','Words ');add(doc,h,'span','','शब्दहरू');
 add(doc,message,'p','','Build your vocabulary step by step.');
 add(doc,message,'p','wv-ne','नयाँ शब्द सिकौं, सम्झौं र दैनिक प्रयोग गरौं।');
 const todayPanel=add(doc,hero,'div','wv-today');
 add(doc,todayPanel,'div','wv-today-head','💡 Today’s Word · आजको शब्द');
 const todayTerm=add(doc,todayPanel,'strong','');
 const todayNe=add(doc,todayPanel,'span','');
 const todayExample=add(doc,todayPanel,'p','');
 const todayButton=add(doc,todayPanel,'button','wv-small-button','Explore word →');
 todayButton.type='button';
 const today=vocabulary[Math.floor(Date.now()/86400000)%vocabulary.length];
 todayTerm.textContent=today.word;todayNe.textContent=today.ne;todayExample.textContent=today.example;

 todayButton.addEventListener('click',()=>{
  resetFilters();selected=today.word;render();
  detail.scrollIntoView({behavior:'smooth',block:'nearest'});
 });
 const topicPanel=add(doc,root,'section','wv-topic-panel');
 const topicHeading=add(doc,topicPanel,'div','wv-panel-header');
 const topicTitle=add(doc,topicHeading,'div','');
 add(doc,topicTitle,'strong','','📚 Explore by topic · विषयअनुसार सिक्नुहोस्');
 add(doc,topicTitle,'small','','Pick a topic to explore relevant English words.');
 const moreTopics=add(doc,topicHeading,'button','wv-show-topics','More topics · थप विषयहरू');
 moreTopics.type='button';moreTopics.setAttribute('aria-expanded','false');
 const catsArea=add(doc,topicPanel,'div','wv-categories');
 catsArea.setAttribute('aria-label','Vocabulary categories');
 moreTopics.addEventListener('click',()=>{allTopics=!allTopics;if(!allTopics&&!cats.slice(0,7).some(c=>c[0]===category))category='all';render();});
 const filterPanel=add(doc,root,'section','wv-filter-panel');
 const filterHeading=add(doc,filterPanel,'div','wv-panel-header');
 const filterTitle=add(doc,filterHeading,'div','');
 add(doc,filterTitle,'strong','','🔎 Find words · शब्द खोज्नुहोस्');
 add(doc,filterTitle,'small','','Search first, or choose a level for practice.');
 const searchLine=add(doc,filterPanel,'div','wv-searchline');
 const search=add(doc,searchLine,'label','wv-search');
 const searchIcon=add(doc,search,'span','','⌕');searchIcon.setAttribute('aria-hidden','true');
 const searchInput=add(doc,search,'input','','');
 searchInput.type='search';searchInput.placeholder='Search in English or Nepali… · नेपाली वा अंग्रेजीमा खोज्नुहोस्';
 searchInput.setAttribute('aria-label','Search vocabulary words');
 const filterRow=add(doc,filterPanel,'div','wv-filterrow');
 const levelArea=add(doc,filterRow,'div','wv-level-filter');
 add(doc,levelArea,'span','wv-filter-label','Level · सिकाइ स्तर');
 const levelChips=add(doc,levelArea,'div','wv-level-chips');
 const levelButtons={};
 for(const [v,t] of [['all','All levels · सबै'],['1','Level 1'],['2','Level 2'],['3','Level 3']]){
  const b=add(doc,levelChips,'button','wv-level-chip',t);
  b.type='button';b.dataset.level=v;
  b.addEventListener('click',()=>{level=v;render();});
  levelButtons[v]=b;
 }
 const advanced=add(doc,filterRow,'div','wv-advanced-filters');
 const typeField=add(doc,advanced,'label','wv-filter-field');
 add(doc,typeField,'span','wv-filter-label','Type · प्रकार');
 const typeSelect=add(doc,typeField,'select','wv-select');
 typeSelect.setAttribute('aria-label','Filter by word type');
 [['all','All word types'],['noun','Noun'],['verb','Verb'],['adjective','Adjective'],['adverb','Adverb'],['phrase','Phrase'],['interjection','Greeting']].forEach(([v,t])=>{const option=add(doc,typeSelect,'option','',t);option.value=v;});
 const sortField=add(doc,advanced,'label','wv-filter-field');
 add(doc,sortField,'span','wv-filter-label','Sort · क्रम');
 const sortSelect=add(doc,sortField,'select','wv-select');
 sortSelect.setAttribute('aria-label','Sort words');
 [['default','Suggested'],['az','A to Z'],['za','Z to A'],['level','Easy first']].forEach(([v,t])=>{const option=add(doc,sortSelect,'option','',t);option.value=v;});
 const filterFooter=add(doc,filterPanel,'div','wv-filter-footer');
 const filterSummary=add(doc,filterFooter,'span','wv-filter-summary','');
 filterSummary.setAttribute('role','status');filterSummary.setAttribute('aria-live','polite');
 const clearFilters=add(doc,filterFooter,'button','wv-reset','Clear filters · हटाउनुहोस्');
 clearFilters.type='button';clearFilters.addEventListener('click',resetFilters);
 const board=add(doc,root,'div','wv-board');
 const left=add(doc,board,'section','wv-list-pane');
 const leftHead=add(doc,left,'div','wv-list-head');
 const count=add(doc,leftHead,'h2','','Words');
 const resultLabel=add(doc,leftHead,'small','','');
 const studyActions=add(doc,left,'div','wv-study-actions');
 const nextButton=add(doc,studyActions,'button','wv-study-button','Next word →');
 nextButton.type='button';
 const randomButton=add(doc,studyActions,'button','wv-study-button','🎲 Surprise me');
 randomButton.type='button';
 const quizButton=add(doc,studyActions,'button','wv-study-button wv-study-primary','✏️ Practice');
 quizButton.type='button';
 const list=add(doc,left,'div','wv-list');
 list.setAttribute('aria-label','Select a word to learn');
 const detail=add(doc,board,'section','wv-detail-pane');
 detail.setAttribute('aria-label','Word meaning, examples and practice');
 const oldSection=add(doc,root,'details','wv-original');
 const summary=add(doc,oldSection,'summary','','📚 My Saved Words & Phrasebook · मेरा सुरक्षित शब्द र वाक्यहरू');
 const preserve=add(doc,oldSection,'div','wv-original-content');
 for(const card of nativeCards)preserve.appendChild(card);
 root.appendChild(oldSection);
 content.insertBefore(root,content.firstChild);
 section.classList.add('sikau-words-v1');
 function practiceFeedbackKind(t){
  return t.startsWith('Try again')?'error':
   t.startsWith('⏭️')||t.startsWith('Only one')?'info':'success';
 }
 function flash(t){
  feedback=t;
  for(const selector of ['.wv-feedback','.wv-practice-status']){
   const node=detail.querySelector(selector);
   if(node){
    node.textContent=t;
    if(selector==='.wv-practice-status'){node.dataset.kind=practiceFeedbackKind(t);node.hidden=!t;}
   }
  }
 }

 // Practice has its own shuffled deck, independent of the visible word list.
 function shufflePractice(words,avoid=''){
  const order=words.map(w=>w.word);
  for(let i=order.length-1;i>0;i--){
   const j=Math.floor(Math.random()*(i+1));
   [order[i],order[j]]=[order[j],order[i]];
  }
  if(order.length>1&&order[0]===avoid)[order[0],order[1]]=[order[1],order[0]];
  if(order.length>2&&order.every((word,i)=>word===words[i].word))[order[0],order[1]]=[order[1],order[0]];
  return order;
 }
 function ensurePractice(rows,force=false){
  const signature=rows.map(w=>w.word).join('\u001f');
  if(!rows.length){practiceOrder=[];practiceIndex=0;practiceSignature='';return;}
  if(!force&&practiceSignature===signature&&practiceOrder.length===rows.length)return;
  practiceOrder=shufflePractice(rows,selected);
  practiceIndex=0;practiceSignature=signature;selected=practiceOrder[0];quizValue='';
 }
 function startPractice(){
  const rows=filtered();if(!rows.length)return;
  tab='practice';feedback='';quizValue='';
  ensurePractice(rows,true);oldSection.open=false;render();
  const field=detail.querySelector('.wv-quiz-input');
  if(field?.focus)field.focus({preventScroll:true});
  if(doc.defaultView.innerWidth<850)detail.scrollIntoView({behavior:'smooth',block:'start'});
 }
 function movePractice(currentWord,correct){
  if(tab!=='practice'||selected!==currentWord)return;
  const rows=filtered();ensurePractice(rows);
  if(!practiceOrder.length)return;
  if(practiceOrder.length===1){
   feedback=correct
    ?'🏆 Correct! You finished this set. Choose another topic or level for more practice. · सही उत्तर! थप अभ्यासका लागि अर्को विषय वा स्तर छान्नुहोस्।'
    :'Only one word matches. Choose another topic or level to continue. · यो समूहमा एउटा मात्र शब्द छ। अर्को स्तर वा विषय छान्नुहोस्।';
  }else{
   if(practiceIndex===practiceOrder.length-1){
    practiceOrder=shufflePractice(rows,selected);practiceIndex=0;
    feedback=correct
     ?'🏆 Set complete! Starting a new shuffled round. · सबै शब्द सकिए! नयाँ क्रमबाट फेरि सुरु गरौं।'
     :'⏭️ New shuffled round · नयाँ क्रमबाट अभ्यास सुरु गरौं।';
   }else{
    practiceIndex++;
    feedback=correct
     ?'✅ Correct! On to the next challenge. · सही उत्तर! अब अर्को अभ्यास।'
     :'⏭️ Skipped. Try this word next. · अर्को शब्द अभ्यास गर्नुहोस्।';
   }
   selected=practiceOrder[practiceIndex];
  }
  quizValue='';render();
  const field=detail.querySelector('.wv-quiz-input');
  if(field?.focus)field.focus({preventScroll:true});
 }
 function advancePractice(correctWord){movePractice(correctWord,true);}
 function skipPractice(currentWord){movePractice(currentWord,false);}
 function choose(word){selected=word;tab='meaning';quizValue='';feedback='';render();}
 function resetFilters(){
  category='all';query='';level='all';type='all';sort='default';
  searchInput.value='';typeSelect.value='all';sortSelect.value='default';
  render();
 }
 function studyMove(kind){
  const rows=filtered();
  if(!rows.length)return;
  const i=rows.findIndex(w=>w.word===selected);
  if(kind==='next')choose(rows[(i+1)%rows.length].word);
  else if(kind==='random'){
   const options=rows.filter(w=>w.word!==selected);
   const pool=options.length?options:rows;
   choose(pool[Math.floor(Math.random()*pool.length)].word);
  }else{startPractice();}
 }
 nextButton.addEventListener('click',()=>studyMove('next'));
 randomButton.addEventListener('click',()=>studyMove('random'));
 quizButton.addEventListener('click',()=>studyMove('practice'));
 function saveWord(word){
  const view=doc.defaultView, entry=items.find(x=>x.word===word);
  if(!entry)return;
  if(entry.saved){
   oldSection.open=true;
   flash('Already saved. Open “My Saved Words” below to manage it. · यो शब्द पहिले नै सुरक्षित छ।');
   return;
  }
  if(typeof view?.addWord==='function'){
   view.addWord(entry.word,entry.ne);
   items=combined(doc,wordBox);
   flash('Saved to your English Sikau dictionary · तपाईंको शब्दकोशमा सुरक्षित भयो।');
   render();
  }else{
   flash('Open Translate and use its native save option to keep this word. · शब्द सुरक्षित गर्न अनुवाद प्रयोग गर्नुहोस्।');
  }
 }
 function filtered(){
  let arr=items.filter(w=>{
   if(category==='saved'&&!w.saved)return false;
   if(category!=='all'&&category!=='saved'&&w.category!==category)return false;
   if(level!=='all'&&String(w.level||'')!==level)return false;
   if(type!=='all'&&w.type!==type)return false;
   if(query&&!([w.word,w.ne,w.definition,w.category].join(' ').toLowerCase().includes(query)))return false;
   return true;
  });
  if(sort==='az')arr.sort((a,b)=>a.word.localeCompare(b.word));
  if(sort==='za')arr.sort((a,b)=>b.word.localeCompare(a.word));
  if(sort==='level')arr.sort((a,b)=>(a.level||99)-(b.level||99)||a.word.localeCompare(b.word));
  return arr;
 }
 function renderCategories(){
  catsArea.replaceChildren();
  const visible=allTopics?cats:cats.slice(0,7);
  for(const [id,emoji,label,ne] of visible){
   const b=add(doc,catsArea,'button','wv-category');
   b.type='button';b.setAttribute('aria-pressed',String(category===id));
   if(category===id)b.classList.add('active');
   add(doc,b,'span','wv-cat-icon',emoji);
   const wording=add(doc,b,'span','wv-cat-text');
   add(doc,wording,'strong','',label);
   add(doc,wording,'small','',ne);
   b.addEventListener('click',()=>{category=id;render();});
  }
  moreTopics.textContent=allTopics?'Show fewer · कम देखाउनुहोस्':'More topics ('+(cats.length-7)+') · थप विषयहरू';
  moreTopics.setAttribute('aria-expanded',String(allTopics));
 }
 function renderList(rows){
  list.replaceChildren();
  if(tab==='practice'&&rows.length){
   const note=add(doc,list,'div','wv-quiz-list-hidden');
   add(doc,note,'strong','','🔒 Quiz in progress · अभ्यास जारी छ');
   add(doc,note,'p','','The English word list is hidden during practice so you can test your memory. · आफैं सम्झेर लेख्न अंग्रेजी शब्दसूची लुकाइएको छ।');
   add(doc,note,'p','','Use Show Answer if you get stuck. · गाह्रो भए उत्तर हेर्नुहोस् थिच्नुहोस्।');
   return;
  }
  if(!rows.length){
   add(doc,list,'p','wv-empty','No matching words. Try another category or search. · शब्द भेटिएन।');
   return;
  }
  for(const w of rows){
   const b=add(doc,list,'button','wv-word-row');
   b.type='button';if(selected===w.word)b.classList.add('selected');
   b.setAttribute('aria-pressed',String(selected===w.word));
   const ico=add(doc,b,'span','wv-sound-icon','🔊');ico.setAttribute('aria-hidden','true');
   const words=add(doc,b,'span','wv-row-words');
   add(doc,words,'strong','',w.word);add(doc,words,'small','',w.ne);
   const extra=add(doc,b,'span','wv-row-extra');
   if(w.level)add(doc,extra,'span','wv-level','Level '+w.level);
   add(doc,extra,'span','wv-row-star',w.saved?'★':'☆');
   b.addEventListener('click',()=>choose(w.word));
  }
 }
 function sentenceFor(w){
  return w.example||'Practice using “'+w.word+'” in an English sentence.';
 }
 function modeButtons(dBody,w){
  const tabs=add(doc,dBody,'div','wv-tabs');
  for(const [key,label,ne,icon] of [
   ['meaning','Meaning','अर्थ','📖'],
   ['examples','Examples','उदाहरण','📑'],
   ['usage','Usage','प्रयोग','✏️'],
   ['related','Related Words','सम्बन्धित','🔗'],
   ['practice','Practice','अभ्यास','🎮']
  ]){
   const b=add(doc,tabs,'button','wv-tab');
   b.type='button';if(tab===key)b.classList.add('active');
   b.setAttribute('aria-pressed',String(tab===key));
   add(doc,b,'span','',icon);const title=add(doc,b,'span','',label);add(doc,title,'small','',ne);
   b.addEventListener('click',()=>{
    if(key==='practice')startPractice();
    else{tab=key;feedback='';quizValue='';render();}
   });
  }
 }
 function renderDetail(w){
  detail.replaceChildren();
  const overview=add(doc,detail,'div','wv-detail-head');
  const label=add(doc,overview,'div','wv-selected-word');
  const title=add(doc,label,'h2','',tab==='practice'?'🧠 Recall the English word':w.word);
  if(tab!=='practice'){
   const speaker=add(doc,title,'button','wv-speak','🔊');speaker.type='button';
   speaker.setAttribute('aria-label','Speak '+w.word);
   speaker.addEventListener('click',()=>speak(doc,w.word,'en'));
   const star=add(doc,title,'button','wv-save',w.saved?'★':'☆');star.type='button';
   star.setAttribute('aria-label',w.saved?'Word saved — show saved word list':'Save '+w.word+' to dictionary');
   star.addEventListener('click',()=>saveWord(w.word));
  }
  const ne=add(doc,label,'p','wv-translation',w.ne);
  const tags=add(doc,label,'div','wv-tags');
  add(doc,tags,'span','wv-tag wv-part',w.type);
  if(w.level)add(doc,tags,'span','wv-tag wv-tag-level','Level '+w.level);
  const illustration=add(doc,overview,'div','wv-picture');
  illustration.setAttribute('role','img');
  illustration.setAttribute('aria-label','Decorative Nepal mountain landscape for vocabulary learning');
  add(doc,illustration,'span','wv-picture-emoji',w.category==='food'?'🥟':w.category==='culture'?'🪔':w.category==='family'?'👨‍👩‍👧':w.category==='work'?'💼':w.category==='school'?'📚':w.category==='health'?'🩺':'🏔️');
  if(tab==='practice'){
   const bar=add(doc,detail,'div','wv-quiz-topbar');
   add(doc,bar,'span','','🎯 Memory challenge · स्मरण अभ्यास');
   const exit=add(doc,bar,'button','wv-exit-quiz','← Back to learning · सिकाइमा फर्कनुहोस्');
   exit.type='button';
   exit.addEventListener('click',()=>{tab='meaning';feedback='';quizValue='';render();});
  }else modeButtons(detail,w);
  const cols=add(doc,detail,'div','wv-detail-grid');
  const main=add(doc,cols,'div','wv-detail-main');
  const aside=add(doc,cols,'aside','wv-detail-side');
  if(tab==='meaning'){
   const definition=add(doc,main,'div','wv-content-card wv-meaning');
   add(doc,definition,'h3','','📖 Meaning · अर्थ');
   add(doc,definition,'p','',w.definition);
   add(doc,definition,'p','wv-subtext',w.ne);
  }else if(tab==='examples'){
   const examples=add(doc,main,'div','wv-content-card wv-meaning');
   add(doc,examples,'h3','','📑 Examples · उदाहरणहरू');
   add(doc,examples,'p','',sentenceFor(w));
   add(doc,examples,'p','wv-subtext',w.exampleNe||'आफ्नो वाक्य बनाउनुहोस्।');
   const play=add(doc,examples,'button','wv-inline','🔊 Listen to example');play.type='button';
   play.addEventListener('click',()=>speak(doc,sentenceFor(w),'en'));
  }else if(tab==='usage'){
   const usage=add(doc,main,'div','wv-content-card wv-meaning');
   add(doc,usage,'h3','','✏️ How to use it · प्रयोग');
   add(doc,usage,'p','','Word type: '+w.type+'. Try making your own English sentence.');
   add(doc,usage,'p','wv-subtext',w.example||'Add this word to a short sentence.');
  }else if(tab==='related'){
   const related=add(doc,main,'div','wv-content-card wv-meaning');
   add(doc,related,'h3','','🔗 Related words · सम्बन्धित शब्दहरू');
   const others=items.filter(x=>x.category===w.category&&x.word!==w.word).slice(0,5);
   if(!others.length)add(doc,related,'p','','More words in this category will appear here.');
   for(const other of others){
    const b=add(doc,related,'button','wv-related-word',other.word+' · '+other.ne);
    b.type='button';b.addEventListener('click',()=>choose(other.word));
   }
  }else{
   const question=add(doc,main,'div','wv-content-card wv-meaning');
   add(doc,question,'h3','','🎯 Quick Practice · छिटो अभ्यास');
   add(doc,question,'p','wv-quiz-count','Challenge '+(practiceIndex+1)+' of '+practiceOrder.length+' · अभ्यास क्रम');
   const status=add(doc,question,'p','wv-practice-status',feedback);
   status.dataset.kind=practiceFeedbackKind(feedback);
   status.setAttribute('role','status');
   status.setAttribute('aria-live','polite');
   status.hidden=!feedback;
   add(doc,question,'p','','Write the English word for: '+w.ne);
   const input=add(doc,question,'input','wv-quiz-input');
   input.type='text';input.value=quizValue;input.placeholder='Type the English word…';
   input.setAttribute('aria-label','English translation for '+w.ne);
   input.addEventListener('input',()=>{quizValue=input.value;});
   const actions=add(doc,question,'div','wv-quiz-actions');
   const check=add(doc,actions,'button','wv-check','✓ Check Answer · उत्तर जाँच्नुहोस्');check.type='button';
   const reveal=add(doc,actions,'button','wv-show-answer','👁 Show Answer · उत्तर हेर्नुहोस्');
   reveal.type='button';
   reveal.setAttribute('aria-expanded','false');
   const next=add(doc,actions,'button','wv-next-word','Next Word → · अर्को शब्द');
   next.type='button';
   const answerPanel=add(doc,question,'div','wv-revealed-answer');
   answerPanel.hidden=true;
   answerPanel.setAttribute('role','region');
   answerPanel.setAttribute('aria-label','Practice answer and pronunciation');
   add(doc,answerPanel,'p','wv-answer-caption','Study the answer, then type it yourself · उत्तर हेरेर फेरि आफैं लेख्नुहोस्');
   const answerRow=add(doc,answerPanel,'div','wv-answer-row');
   const answerWord=add(doc,answerRow,'strong','wv-answer-text','');
   const hear=add(doc,answerRow,'button','wv-answer-listen','🔊 Listen · सुन्नुहोस्');
   hear.type='button';
   hear.setAttribute('aria-label','Listen to revealed word');
   hear.addEventListener('click',()=>speak(doc,w.word,'en'));
   add(doc,answerPanel,'p','wv-answer-ne',w.ne);
   reveal.addEventListener('click',()=>{
    answerWord.textContent=w.word;
    hear.setAttribute('aria-label','Listen to '+w.word);
    answerPanel.hidden=false;
    reveal.setAttribute('aria-expanded','true');
    reveal.textContent='👁 Answer shown · उत्तर देखियो';
    input.focus({preventScroll:true});
   });
   next.addEventListener('click',()=>skipPractice(w.word));
   check.addEventListener('click',()=>{
    const answer=input.value.trim().replace(/\s+/g,' ').toLocaleLowerCase();
    const expected=w.word.trim().replace(/\s+/g,' ').toLocaleLowerCase();
    if(answer===expected)advancePractice(w.word);
    else{
     flash('Try again. The word starts with “'+w.word.charAt(0)+'”. · फेरि प्रयास गर्नुहोस्।');
    }
   });
   input.addEventListener('keydown',e=>{if(e.key==='Enter')check.click();});
  }
  if(tab!=='practice'){
  const example=add(doc,main,'div','wv-example-card');
  add(doc,example,'h3','','🔉 Everyday example · दैनिक उदाहरण');
  add(doc,example,'p','',sentenceFor(w));
  add(doc,example,'p','wv-subtext',w.exampleNe||w.ne);
  const relatedCard=add(doc,aside,'div','wv-related-card');
  add(doc,relatedCard,'h3','','✨ Explore more · थप शब्द');
  for(const other of items.filter(x=>x.category===w.category&&x.word!==w.word).slice(0,3)){
   const b=add(doc,relatedCard,'button','wv-related-mini',other.word+' · '+other.ne);
   b.type='button';b.addEventListener('click',()=>choose(other.word));
  }
  const practice=add(doc,aside,'div','wv-practice-card');
  add(doc,practice,'h3','','✏️ Try it yourself · आफैं प्रयास गर्नुहोस्');
  add(doc,practice,'p','','Can you use “'+w.word+'” in your own sentence?');
  const practiceB=add(doc,practice,'button','wv-practice-button','Practice this word →');
  practiceB.type='button';practiceB.addEventListener('click',startPractice);
  }
  add(doc,detail,'p','wv-feedback',feedback);
 }
 function render(){
  items=combined(doc,wordBox);
  root.classList.toggle('wv-quiz-mode',tab==='practice');
  if(!allTopics&&!cats.slice(0,7).some(entry=>entry[0]===category))allTopics=true;
  renderCategories();
  const rows=filtered();
  if(tab==='practice'&&rows.length)ensurePractice(rows);
  count.textContent='Words ('+rows.length+')';
  resultLabel.textContent=tab==='practice'?'Answers hidden · उत्तर लुकाइएको':'Choose a word · शब्द छान्नुहोस्';
  for(const [value,button] of Object.entries(levelButtons)){
   const active=value===level;
   button.classList.toggle('active',active);
   button.setAttribute('aria-pressed',String(active));
  }
  const summary=[category!=='all'?categories[category]?.[2]:null,level!=='all'?'Level '+level:null,type!=='all'?type:null,query?'Search: '+query:null].filter(Boolean);
  const hasFilters=category!=='all'||level!=='all'||type!=='all'||sort!=='default'||!!query;
  filterSummary.textContent='Showing '+rows.length+' of '+items.length+' words · '+(summary.join(' · ')||'All topics and levels');
  clearFilters.hidden=!hasFilters;
  [nextButton,randomButton,quizButton].forEach(b=>{b.disabled=rows.length===0;});
  if(!rows.some(w=>w.word===selected)){
   selected=rows[0]?.word||'';quizValue='';feedback='';
   if(!rows.length)tab='meaning';
  }
  const chosen=rows.find(w=>w.word===selected);
  renderList(rows);
  if(chosen)renderDetail(chosen);
  else{
   detail.replaceChildren();
   add(doc,detail,'p','wv-empty','No matching words. Try another level or topic. · यो फिल्टरमा शब्द भेटिएन।');
   const reset=add(doc,detail,'button','wv-reset','Clear filters · फिल्टर हटाउनुहोस्');
   reset.type='button';reset.addEventListener('click',resetFilters);
  }
 }
 searchInput.addEventListener('input',()=>{query=searchInput.value.trim().toLowerCase();render();});
 typeSelect.addEventListener('change',()=>{type=typeSelect.value;render();});
 sortSelect.addEventListener('change',()=>{sort=sortSelect.value;render();});
 // Native renderWords may replace the saved-word list; refresh visual library only
 // when its contents change, not when the new dashboard redraws.
 let scheduled=false;
 const observer=new doc.defaultView.MutationObserver(()=>{
  if(scheduled)return;scheduled=true;
  doc.defaultView.requestAnimationFrame(()=>{scheduled=false;const was=items.filter(x=>x.saved).map(x=>x.word).sort().join('|');
   const next=readSaved(doc,wordBox).map(x=>x.word).sort().join('|');if(was!==next)render();});
 });
 observer.observe(wordBox,{subtree:true,childList:true});
 render();
};
})();