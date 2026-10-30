/* English Sikau original bilingual chapter stories.
 * Public learner-facing fictional texts; no hidden lesson data is copied. */
(function(){
'use strict';
const chapter=(title,neTitle,paragraphs,questions)=>({title,neTitle,paragraphs,questions:questions.map(([en,ne,choices,answer])=>({en,ne,choices,answer}))});
const q=(en,ne,choices,answer)=>[en,ne,choices,answer];
const books=[
{
 id:'mountain-trail',title:'The Hidden Mountain Trail',neTitle:'लुकेको पहाडी बाटो',
 category:'Adventure',level:'A2–B1',cover:'./assets/read-topics/adventure.svg',
 description:'Nima and her brother find a safe way home through the hills.',
 neDescription:'निमा र उनका भाइले पहाडमा सुरक्षित बाटो खोज्छन्।',
 chapters:[
 chapter('The Road to Grandma','हजुरआमाको घरतिर',[
 ['Nima and her younger brother, Suman, left their village early on Saturday. They were going to take medicine to their grandmother across the hills. Their mother had asked them to return before sunset.','शनिबार बिहानै निमा र उनका भाइ सुमन गाउँबाट निस्किए। उनीहरू पहाडपारि बस्ने हजुरआमालाई औषधि पुर्‍याउन जाँदै थिए। आमाले घाम अस्ताउनुअघि फर्कन भनेकी थिइन्।'],
 ['The familiar trail ran beside a small stream. Suman carried the food, while Nima kept the medicine dry in her bag. Halfway up the hill, they heard a loud cracking sound ahead.','चिनेको गोरेटो एउटा सानो खोलाको छेउबाट जान्थ्यो। सुमनले खाजा बोकेको थियो र निमाले झोलामा औषधि सुरक्षित राखेकी थिइन्। आधा डाँडा चढेपछि उनीहरूले अगाडिबाट ठूलो आवाज सुने।']
 ],[
 q('Why were Nima and Suman traveling?','निमा र सुमन किन जाँदै थिए?', [['To deliver medicine','औषधि पुर्‍याउन'],['To buy shoes','जुत्ता किन्न'],['To attend a wedding','विवाहमा जान']],0),
 q('When did their mother want them home?','आमाले उनीहरूलाई कहिलेसम्म फर्कन भनेकी थिइन्?', [['At midnight','मध्यरातमा'],['Before sunset','घाम अस्ताउनुअघि'],['Next week','अर्को हप्ता']],1)
 ]),
 chapter('The Broken Path','भत्किएको गोरेटो',[
 ['A large part of the hillside had slipped after the previous night’s rain. Rocks covered the trail, and the wooden bridge below was broken. Suman wanted to jump over the gap, but Nima stopped him.','अघिल्लो रातको वर्षापछि डाँडाको ठूलो भाग भासिएको थियो। बाटोमा ढुङ्गा थुप्रिएका थिए र तलको काठको पुल भाँचिएको थियो। सुमन खाली ठाउँ नाघ्न खोज्यो, तर निमाले उसलाई रोकिन्।'],
 ['“A quick way is not always a safe way,” she said. They moved back to firm ground and called their mother. The phone signal was weak, so Nima decided they should ask someone who knew the nearby paths.','“छिटो बाटो सधैँ सुरक्षित हुँदैन,” उनले भनिन्। उनीहरू सुरक्षित ठाउँमा फर्किए र आमालाई फोन गरे। फोनको सिग्नल कमजोर थियो, त्यसैले निमाले वरपरका बाटो चिनेको मानिस खोज्ने निर्णय गरिन्।']
 ],[
 q('What had blocked the trail?','गोरेटो किन बन्द भएको थियो?', [['A parade','जुलुसले'],['A landslide','पहिरोले'],['A market','बजारले']],1),
 q('What did Nima stop Suman from doing?','निमाले सुमनलाई के गर्नबाट रोकिन्?', [['Jumping across the gap','खाली ठाउँ नाघ्नबाट'],['Drinking water','पानी पिउनबाट'],['Reading a map','नक्सा हेर्नबाट']],0)
 ]),
 chapter('The Guide’s Map','पथप्रदर्शकको नक्सा',[
 ['Near a small tea shelter, they met Dawa, a local guide. After hearing their story, he unfolded a paper map. It showed a longer path through the pine forest that avoided the damaged bridge.','एउटा सानो चिया पसलनजिक उनीहरूले स्थानीय पथप्रदर्शक दावालाई भेटे। उनीहरूको कुरा सुनेपछि दावाले कागजको नक्सा खोले। त्यसमा भाँचिएको पुल छलेर सल्लाको जङ्गल हुँदै जाने अलि लामो बाटो देखाइएको थियो।'],
 ['Dawa called their grandmother to explain the delay. Then he walked with the children until they reached the clear forest trail. Nima checked the landmarks on the map, and Suman followed carefully.','दावाले हजुरआमालाई फोन गरेर ढिलो हुने कुरा बताए। त्यसपछि उनी बालबालिकासँग सुरक्षित जङ्गली गोरेटोसम्म गए। निमाले नक्सामा भएका चिन्हहरू हेर्दै हिँडिन् र सुमन सावधानीपूर्वक पछि लाग्यो।']
 ],[
 q('Who helped the children find another route?','अर्को बाटो खोज्न कसले सहयोग गर्‍यो?', [['Dawa the guide','पथप्रदर्शक दावाले'],['A bus driver','बस चालकले'],['A shopkeeper from the city','सहरका पसलेले']],0),
 q('Where did the safer path go?','सुरक्षित बाटो कहाँबाट जान्थ्यो?', [['Across the broken bridge','भाँचिएको पुलबाट'],['Through the pine forest','सल्लाको जङ्गलबाट'],['Into a tunnel','सुरुङभित्रबाट']],1)
 ]),
 chapter('Home Before Dark','अँध्यारो हुनुअघि घर',[
 ['The new path was longer, but it was stable and easy to follow. They reached their grandmother’s house in the afternoon. She thanked them for the medicine and made warm soup for everyone.','नयाँ बाटो अलि लामो थियो, तर सुरक्षित र सजिलै हिँड्न सकिने थियो। उनीहरू दिउँसै हजुरआमाको घर पुगे। हजुरआमाले औषधिका लागि धन्यवाद दिइन् र सबैलाई तातो सुप बनाइदिइन्।'],
 ['Dawa arranged a safe ride back to their village. When their mother hugged them, Nima told her what had happened. Suman added, “Today I learned that being brave also means knowing when to stop.”','दावाले उनीहरूलाई सुरक्षित रूपमा गाउँ फर्किने गाडीको व्यवस्था गरे। आमाले अँगालो हाल्दा निमाले सबै कुरा सुनाइन्। सुमनले थप्यो, “आज मैले साहसी हुनु भनेको कहिले रोकिनुपर्छ भन्ने जान्नु पनि रहेछ भन्ने सिकेँ।”']
 ],[
 q('Did the children reach their grandmother safely?','के बालबालिका सुरक्षित रूपमा हजुरआमाको घर पुगे?', [['Yes','हो'],['No','होइन'],['Only Suman did','सुमन मात्र पुग्यो']],0),
 q('What did Suman learn?','सुमनले के सिक्यो?', [['To rush ahead','हतारमा अघि बढ्न'],['To ignore warnings','चेतावनी बेवास्ता गर्न'],['To know when to stop','कहिले रोकिनुपर्छ भन्ने जान्न']],2)
 ])
 ]
},
{
 id:'festival-promise',title:'The Festival Promise',neTitle:'चाडपर्वको वाचा',
 category:'Culture',level:'A2–B1',cover:'./assets/read-topics/culture.svg',
 description:'A Tihar celebration brings two neighbors together.',
 neDescription:'तिहारको उत्सवले दुई छिमेकीलाई नजिक ल्याउँछ।',
 chapters:[
 chapter('A House Without Lights','बत्ती नबलेको घर',[
 ['Tihar was only two days away. Sita and her brother were making colorful rangoli outside their house in Lalitpur. Every home on the street was decorated except the small house at the corner.','तिहार आउन दुई दिन मात्र बाँकी थियो। सीता र उनका भाइ ललितपुरको घरबाहिर रङ्गोली बनाउँदै थिए। गल्लीका सबै घर सजिएका थिए, तर कुनाको सानो घर अँध्यारो थियो।'],
 ['An elderly man named Hari lived there alone. His daughter worked far away and could not come home this year. When Sita brought him some flowers, he thanked her, but his smile looked lonely.','त्यहाँ हरि नामका वृद्ध व्यक्ति एक्लै बस्थे। उनकी छोरी टाढा काम गर्थिन् र यो वर्ष घर आउन सक्दिनथिन्। सीताले केही फूल लिएर जाँदा उनले धन्यवाद दिए, तर उनको मुस्कानमा एक्लोपन थियो।']
 ],[
 q('Which festival was approaching?','कुन चाड आउँदै थियो?', [['Holi','होली'],['Tihar','तिहार'],['Teej','तीज']],1),
 q('Why was Hari alone?','हरि किन एक्लै थिए?', [['His daughter was away','उनकी छोरी टाढा थिइन्'],['He disliked visitors','उनी पाहुना मन पराउँदैनथे'],['He had moved yesterday','उनी हिजो सरेका थिए']],0)
 ]),
 chapter('A Small Promise','सानो वाचा',[
 ['Sita told her mother about Hari. “We have plenty of decorations,” she said. “Could we share some with him?” Her mother agreed and invited other neighbors to help.','सीताले आमालाई हरिको कुरा सुनाइन्। “हामीसँग सजावटका सामान धेरै छन्,” उनले भनिन्। “केही उहाँसँग बाँड्न मिल्दैन?” आमाले सहमति जनाइन् र अरू छिमेकीलाई पनि बोलाइन्।'],
 ['Together, they promised to decorate Hari’s doorway before the evening of Laxmi Puja. Hari was surprised when Sita asked his permission. “I thought everyone had forgotten me,” he said quietly.','सबै मिलेर लक्ष्मीपूजाको साँझअघि हरिको ढोका सजाउने वाचा गरे। सीताले अनुमति माग्दा हरि छक्क परे। “मलाई त सबैले बिर्सिएजस्तो लागेको थियो,” उनले बिस्तारै भने।']
 ],[
 q('Who suggested sharing decorations?','सजावटका सामान बाँड्ने सुझाव कसले दिइन्?', [['Sita','सीताले'],['Hari’s daughter','हरिकी छोरीले'],['The shopkeeper','पसलेले']],0),
 q('When would they decorate Hari’s door?','हरिको ढोका कहिले सजाउने योजना थियो?', [['After New Year','नयाँ वर्षपछि'],['Before Laxmi Puja evening','लक्ष्मीपूजाको साँझअघि'],['Next month','अर्को महिना']],1)
 ]),
 chapter('The Sudden Rain','अचानक परेको पानी',[
 ['On Laxmi Puja afternoon, dark clouds filled the sky. Rain washed away the rangoli they had carefully made. Sita felt disappointed, but the neighbors moved the decorations under the covered porch.','लक्ष्मीपूजाको दिउँसो आकाश कालो बादलले ढाकियो। पानीले उनीहरूले बनाएको रङ्गोली बगायो। सीता निराश भइन्, तर छिमेकीहरूले सजावटका सामान छानामुनि सारे।'],
 ['Hari brought out an old brass lamp that had belonged to his wife. He cleaned it while the children made a fresh design on a dry wooden board. “This lamp carries many memories,” he told them.','हरिले आफ्नी श्रीमतीको पुरानो पित्तलको दियो निकाले। बालबालिकाले सुक्खा काठको पाटीमा नयाँ रङ्गोली बनाउँदै गर्दा उनले दियो सफा गरे। “यस दियोसँग धेरै सम्झना जोडिएका छन्,” उनले भने।']
 ],[
 q('What ruined the first rangoli?','पहिलो रङ्गोली के कारण बिग्रियो?', [['Wind only','हावाले मात्र'],['Rain','पानीले'],['A bicycle','साइकलले']],1),
 q('What did Hari bring outside?','हरिले के बाहिर ल्याए?', [['A brass lamp','पित्तलको दियो'],['A radio','रेडियो'],['A suitcase','सुटकेस']],0)
 ]),
 chapter('A Brighter Evening','उज्यालो साँझ',[
 ['By evening, the rain had stopped. The neighbors lit lamps safely along Hari’s porch, shared sel roti, and sang cheerful songs. Hari joined them and told the children stories about the Tihar celebrations of his youth.','साँझसम्म पानी रोकिएको थियो। छिमेकीहरूले हरिको पिँढीमा सुरक्षित रूपमा दियो बाले, सेलरोटी बाँडे र रमाइला गीत गाए। हरि पनि उनीहरूसँग बसे र आफ्नो बाल्यकालको तिहारका कथा सुनाए।'],
 ['Later, Hari’s daughter called on video and saw the smiling crowd. “You made his festival special,” she said. Sita looked at the glowing lamps and realized the best decoration was kindness.','पछि हरिकी छोरीले भिडियो कल गरिन् र हाँसिरहेका छिमेकीहरूलाई देखिन्। “तपाईंहरूले उहाँको चाड विशेष बनाइदिनुभयो,” उनले भनिन्। बलिरहेका दियो हेर्दै सीताले सबैभन्दा राम्रो सजावट दयालु व्यवहार रहेछ भन्ने बुझिन्।']
 ],[
 q('What food did the neighbors share?','छिमेकीहरूले कुन परिकार बाँडे?', [['Sel roti','सेलरोटी'],['Pizza','पिज्जा'],['Pasta','पास्ता']],0),
 q('What made the festival special for Hari?','हरिका लागि चाडलाई विशेष केले बनायो?', [['Being included by neighbors','छिमेकीहरूले साथ दिनुले'],['A new car','नयाँ गाडीले'],['An expensive gift','महँगो उपहारले']],0)
 ])
 ]
},
{
 id:'little-tea-shop',title:'The Little Tea Shop',neTitle:'सानो चिया पसल',
 category:'Everyday Life',level:'A2–B1',cover:'./assets/read-topics/food.svg',
 description:'A family saves a small tea shop through thoughtful changes.',
 neDescription:'परिवारले मिलेर सानो चिया पसल जोगाउँछ।',
 chapters:[
 chapter('An Empty Morning','सुनसान बिहान',[
 ['Every morning, Arjun helped his aunt serve tea beside the bus stop in Pokhara. The shop smelled of ginger and cardamom, but fewer people were coming. A new café had opened across the road.','अर्जुन हरेक बिहान पोखराको बसपार्कनजिक काकीलाई चिया बेच्न सहयोग गर्थ्यो। पसलभरि अदुवा र अलैँचीको बास्ना आउँथ्यो, तर ग्राहक घट्दै गएका थिए। बाटोपारि नयाँ क्याफे खुलेको थियो।'],
 ['His aunt counted the remaining cups and sighed. “If this continues, we may have to close.” Arjun loved the shop because travelers had shared stories there for years. He wanted to find a solution.','काकीले बाँकी कपहरू गनेर लामो सास फेरिन्। “यस्तै भइरह्यो भने पसल बन्द गर्नुपर्ने हुन सक्छ।” यात्रुहरूले वर्षौँदेखि त्यहाँ कथा बाँडेका कारण अर्जुनलाई त्यो पसल मन पर्थ्यो। ऊ समाधान खोज्न चाहन्थ्यो।']
 ],[
 q('Where was the tea shop?','चिया पसल कहाँ थियो?', [['Beside a bus stop','बसपार्कनजिक'],['Inside a school','विद्यालयभित्र'],['On a mountain peak','हिमालको चुचुरोमा']],0),
 q('Why were customers fewer?','ग्राहक किन घटेका थिए?', [['The shop had no tea','पसलमा चिया थिएन'],['A new café opened','नयाँ क्याफे खुलेको थियो'],['The road disappeared','बाटो हराएको थियो']],1)
 ]),
 chapter('Listening to Customers','ग्राहकको कुरा सुन्दै',[
 ['Arjun asked several regular customers what they wanted. A driver wished for quicker service; a student wanted a small breakfast; and an elderly traveler said the menu was hard to read.','अर्जुनले नियमित ग्राहकहरूलाई के चाहिएको छ भनेर सोध्यो। एक चालकलाई छिटो सेवा चाहिएको थियो, एक विद्यार्थीलाई हल्का खाजा, अनि एक वृद्ध यात्रुलाई मेनु पढ्न गाह्रो भएको थियो।'],
 ['Arjun wrote down every suggestion instead of guessing. That evening, he and his aunt made a clear bilingual menu with tea, boiled eggs, and fresh bread. They also prepared a separate counter for travelers in a hurry.','अर्जुनले अनुमान लगाउनुको सट्टा सबै सुझाव लेख्यो। त्यो साँझ उसले र काकीले चिया, उसिनेका अण्डा र ताजा पाउरोटी भएको स्पष्ट द्विभाषिक मेनु बनाए। हतारमा रहेका यात्रुका लागि छुट्टै काउन्टर पनि तयार गरे।']
 ],[
 q('What did Arjun ask customers for?','अर्जुनले ग्राहकहरूसँग के माग्यो?', [['Their suggestions','उनीहरूका सुझाव'],['Their passwords','उनीहरूका पासवर्ड'],['Their bicycles','उनीहरूका साइकल']],0),
 q('What did they add to the shop?','उनीहरूले पसलमा के थपे?', [['A swimming pool','पौडी पोखरी'],['A clear bilingual menu','स्पष्ट द्विभाषिक मेनु'],['A cinema','सिनेमा']],1)
 ]),
 chapter('The Busy Bus','व्यस्त बस',[
 ['The next morning, a bus carrying tourists arrived unexpectedly. Arjun greeted each customer, showed the new menu, and asked whether they preferred milk tea or black tea. His aunt prepared drinks while he delivered breakfast.','अर्को बिहान पर्यटक बोकेको बस अचानक आइपुग्यो। अर्जुनले सबैलाई स्वागत गर्‍यो, नयाँ मेनु देखायो र दूध चिया कि कालो चिया मन पर्छ भनेर सोध्यो। काकीले चिया बनाइन् र उसले खाजा पुर्‍यायो।'],
 ['One visitor accidentally left a wallet on the table. Arjun ran outside and returned it before the bus departed. The grateful visitor told the driver how helpful the shop was.','एक जना यात्रुले गल्तीले टेबुलमा पर्स छोडे। बस छुट्नुअघि अर्जुन दौडेर बाहिर गयो र पर्स फर्काइदियो। खुसी भएका यात्रुले चालकलाई पसलको राम्रो सेवाबारे बताए।']
 ],[
 q('What did tourists order?','पर्यटकहरूले के मगाए?', [['Tea and breakfast','चिया र खाजा'],['Books','किताब'],['Shoes','जुत्ता']],0),
 q('What did Arjun return?','अर्जुनले के फिर्ता गर्‍यो?', [['An umbrella','छाता'],['A wallet','पर्स'],['A map','नक्सा']],1)
 ]),
 chapter('A Shop Full of Stories','कथाले भरिएको पसल',[
 ['Over the following weeks, more passengers stopped for tea. The new menu and faster service helped, but people also returned because they felt welcome. Arjun’s aunt put a small notebook by the counter for travelers to share their stories.','अर्का केही हप्तामा थप यात्रुहरू चिया खान आउन थाले। नयाँ मेनु र छिटो सेवाले सहयोग गरे, तर मानिसहरू आत्मीय व्यवहारका कारण पनि फर्किन्थे। काकीले यात्रुहरूका कथा लेख्न काउन्टरमा एउटा सानो कापी राखिन्।'],
 ['On the first page, Arjun wrote, “A good business begins by listening.” His aunt smiled and poured him a fresh cup of tea. Their little shop had found a new beginning without forgetting its old warmth.','पहिलो पानामा अर्जुनले लेख्यो, “राम्रो व्यवसाय सुन्नबाट सुरु हुन्छ।” काकी मुस्कुराइन् र उसलाई तातो चिया दिइन्। पुरानो आत्मीयता नहराई उनीहरूको सानो पसलले नयाँ सुरुवात पाएको थियो।']
 ],[
 q('Why did customers return?','ग्राहकहरू किन फेरि आउँथे?', [['They felt welcome','उनीहरूले आत्मीयता महसुस गर्थे'],['The road was closed','बाटो बन्द थियो'],['The shop gave away cars','पसलले गाडी बाँड्थ्यो']],0),
 q('What did travelers write in the notebook?','यात्रुहरूले कापीमा के लेख्थे?', [['Their stories','आफ्ना कथाहरू'],['Exam answers','परीक्षाका उत्तरहरू'],['Bus numbers only','बस नम्बर मात्र']],0)
 ])
 ]
},
{
 id:'missing-letter',title:'The Missing Letter',neTitle:'हराएको चिठी',
 category:'Mystery',level:'B1',cover:'./assets/read-topics/mystery.svg',
 description:'Anu follows clues on an old envelope to reunite two friends.',
 neDescription:'अनुले पुरानो खामको सुराक पछ्याएर दुई साथीलाई भेटाउँछिन्।',
 chapters:[
 chapter('The Blue Envelope','निलो खाम',[
 ['While cleaning her family’s cupboard in Kathmandu, Anu discovered a blue envelope between two old books. It was addressed to someone named Mina, but the house number had faded. The stamp showed a date from fifteen years ago.','काठमाडौँमा घरको दराज सफा गर्दा अनुले दुई पुराना किताबबीच निलो खाम भेटिन्। त्यो मिना नामकी महिलालाई लेखिएको थियो, तर घर नम्बर मेटिएको थियो। टिकटमा पन्ध्र वर्षअघिको मिति थियो।'],
 ['Her mother recognized the handwriting immediately. “My friend Sarita wrote that before moving abroad,” she said. The letter had never reached Mina, and no one knew where she lived now.','अनुकी आमाले अक्षर तुरुन्तै चिनिन्। “मेरी साथी सरिताले विदेश जानुअघि लेखेकी थिइन्,” उनले भनिन्। चिठी मिनासम्म पुगेको थिएन र उनी अहिले कहाँ बस्थिन् भन्ने कसैलाई थाहा थिएन।']
 ],[
 q('Where did Anu find the envelope?','अनुले खाम कहाँ भेटिन्?', [['Between two books','दुई किताबबीच'],['At the airport','विमानस्थलमा'],['Inside a shoe','जुत्ताभित्र']],0),
 q('Who had written the letter?','चिठी कसले लेखेकी थिइन्?', [['Mina','मिनाले'],['Sarita','सरिताले'],['Anu','अनुले']],1)
 ]),
 chapter('A Faded Address','मेटिएको ठेगाना',[
 ['Anu did not want to open someone else’s letter. Instead, she examined the outside of the envelope. She could read the name of an old neighborhood and a small post-office mark.','अनु अरूको चिठी खोल्न चाहन्नथिन्। त्यसैले उनले खामको बाहिरी भाग राम्ररी हेरिन्। त्यहाँ पुरानो टोलको नाम र हुलाकको सानो छाप पढ्न सकिन्थ्यो।'],
 ['Her mother remembered a retired postmaster who still lived nearby. They visited him together. He explained that several streets had been renamed and suggested asking at the community library for an old map.','आमालाई नजिकै बस्ने अवकाशप्राप्त हुलाक कर्मचारी सम्झना आयो। उनीहरू सँगै उनलाई भेट्न गए। उनले धेरै गल्लीको नाम फेरिएको बताए र पुरानो नक्साका लागि सामुदायिक पुस्तकालयमा सोध्न सुझाव दिए।']
 ],[
 q('Did Anu open the letter?','के अनुले चिठी खोलिन्?', [['No','होइन'],['Yes','हो'],['She tore it up','उनले च्यातिन्']],0),
 q('Where did the postmaster suggest looking?','हुलाक कर्मचारीले कहाँ हेर्न सुझाव दिए?', [['At the library','पुस्तकालयमा'],['At the zoo','चिडियाखानामा'],['At a restaurant','रेस्टुरेन्टमा']],0)
 ]),
 chapter('The Old Map','पुरानो नक्सा',[
 ['At the library, Anu found a map showing the neighborhood as it had been years ago. The faded house number matched a building that was now a tailor’s shop. The tailor said his mother had once known Mina.','पुस्तकालयमा अनुले धेरै वर्षअघिको टोल देखाउने नक्सा भेटिन्। मेटिएको घर नम्बर अहिले सिलाइ पसल बनेको भवनसँग मिल्यो। दर्जीले आफ्नी आमाले पहिला मिनालाई चिनेको बताए।'],
 ['The tailor’s mother remembered that Mina had moved to Bhaktapur. She gave them the name of a school where Mina had taught. Anu wrote down the information and checked it with her mother before making contact.','दर्जीकी आमालाई मिना भक्तपुर सरेको सम्झना थियो। उनले मिनाले पढाएको विद्यालयको नाम दिइन्। अनुले कुरा टिपिन् र सम्पर्क गर्नुअघि आमासँग पुष्टि गरिन्।']
 ],[
 q('What had the old building become?','पुरानो भवन अहिले के बनेको थियो?', [['A tailor’s shop','सिलाइ पसल'],['A hotel','होटल'],['A stadium','रङ्गशाला']],0),
 q('Where had Mina moved?','मिना कहाँ सरेकी थिइन्?', [['Pokhara','पोखरा'],['Bhaktapur','भक्तपुर'],['Biratnagar','विराटनगर']],1)
 ]),
 chapter('A Letter Delivered','पुर्‍याइएको चिठी',[
 ['With help from the school, Anu’s mother reached Mina by phone. Mina remembered Sarita with delight and agreed to meet them at a café. Anu handed her the unopened blue envelope.','विद्यालयको सहयोगले अनुकी आमाले मिनालाई फोनमा सम्पर्क गरिन्। मिना सरितालाई सम्झेर खुसी भइन् र क्याफेमा भेट्न राजी भइन्। अनुले उनलाई नखोलिएको निलो खाम दिइन्।'],
 ['Mina read the letter slowly and wiped away a tear. It was an invitation to stay in touch, not a goodbye. That evening she called Sarita overseas, and two old friends began talking again. Anu realized that small acts of care can repair long silences.','मिनाले चिठी बिस्तारै पढिन् र आँसु पुछिन्। त्यो बिदाइ होइन, सम्पर्कमा रहिरहन गरिएको आग्रह थियो। त्यही साँझ उनले विदेशमा रहेकी सरितालाई फोन गरिन् र दुई पुराना साथी फेरि बोल्न थाले। अनुले सानो प्रयासले लामो मौनता तोड्न सकिन्छ भन्ने बुझिन्।']
 ],[
 q('Who received the letter in the end?','अन्त्यमा चिठी कसले पाइन्?', [['Sarita','सरिताले'],['Mina','मिनाले'],['The tailor','दर्जीले']],1),
 q('What happened after Mina read it?','मिनाले चिठी पढेपछि के भयो?', [['She called Sarita','उनले सरितालाई फोन गरिन्'],['She threw it away','चिठी फ्याँकिन्'],['She left town','सहर छाडिन्']],0)
 ])
 ]
},
{
 id:'broken-bicycle',title:'The Broken Bicycle',neTitle:'बिग्रिएको साइकल',
 category:'Everyday Life',level:'A2',cover:'./assets/read-topics/friendship.svg',
 description:'Two classmates learn what matters more than winning.',
 neDescription:'दुई सहपाठीले जित्नुभन्दा महत्त्वपूर्ण कुरा सिक्छन्।',
 chapters:[
 chapter('The School Race','विद्यालयको दौड',[
 ['Bikram had practiced cycling every evening for the school’s charity race. His friend Riya helped him draw a route on a map. They planned to finish together and collect donations for new library books.','विक्रमले विद्यालयको सहयोगार्थ साइकल दौडका लागि हरेक साँझ अभ्यास गरेको थियो। उसकी साथी रियाले नक्सामा बाटो कोर्न सहयोग गरेकी थिइन्। उनीहरूले सँगै दौड पूरा गरेर पुस्तकालयका लागि सहयोग रकम जुटाउने योजना बनाएका थिए।'],
 ['On the morning of the race, Bikram noticed that Riya’s bicycle chain was loose. She said she would ride slowly and hope for the best. Bikram thought they should check it before starting.','दौडको बिहान विक्रमले रियाको साइकलको चेन खुकुलो भएको देख्यो। रियाले बिस्तारै चलाएर पुगौँला भनिन्। तर विक्रमले सुरु गर्नुअघि जाँच्नुपर्छ भन्ने सोचेको थियो।']
 ],[
 q('What was the race raising money for?','दौडबाट केका लागि सहयोग रकम जुटाइँदै थियो?', [['Library books','पुस्तकालयका किताब'],['A new car','नयाँ गाडी'],['Concert tickets','सङ्गीत कार्यक्रमका टिकट']],0),
 q('What was wrong with Riya’s bicycle?','रियाको साइकलमा के समस्या थियो?', [['Loose chain','खुकुलो चेन'],['Missing seat','सिट हराएको'],['Broken bell','घण्टी बिग्रिएको']],0)
 ]),
 chapter('A Sudden Stop','अचानक रोकिएको साइकल',[
 ['The school mechanic tightened the chain, and the race began. Halfway through, Riya heard a sharp clicking sound. She stopped beside the road rather than continue on a bicycle that might be unsafe.','विद्यालयका मिस्त्रीले चेन कसे र दौड सुरु भयो। आधा बाटो पुगेपछि रियाले टकटक आवाज सुनिन्। असुरक्षित हुन सक्ने साइकल चलाइरहनुभन्दा उनी बाटोछेउ रोकिइन्।'],
 ['Bikram was already ahead when he noticed she was missing. He returned and found that the chain had slipped again. “We might lose,” Riya said. “We promised to finish together,” Bikram replied.','रिया नदेखेपछि अघि बढिसकेको विक्रम फर्कियो। चेन फेरि उत्रिएको रहेछ। “हामी हार्न सक्छौँ,” रियाले भनिन्। “हामीले सँगै दौड पूरा गर्ने वाचा गरेका थियौँ,” विक्रमले जवाफ दियो।']
 ],[
 q('Why did Riya stop riding?','रियाले साइकल किन रोकिन्?', [['The chain slipped','चेन उत्रियो'],['She was hungry','उनलाई भोक लाग्यो'],['It got dark','अँध्यारो भयो']],0),
 q('What did Bikram do?','विक्रमले के गर्‍यो?', [['Kept racing alone','एक्लै दौडिरह्यो'],['Returned to help','सहयोग गर्न फर्कियो'],['Went home','घर गयो']],1)
 ]),
 chapter('The Repair','मर्मत',[
 ['They walked the bicycles to a volunteer repair station near the next checkpoint. A mechanic found that one small part was bent. He replaced it, checked the brakes, and told them the bicycle was ready.','उनीहरूले साइकल डोर्‍याउँदै अर्को जाँच चौकीनजिकको स्वयंसेवी मर्मत केन्द्र पुगे। मिस्त्रीले एउटा सानो भाग बाङ्गिएको भेटे। उनले त्यो फेरे, ब्रेक जाँचे र साइकल तयार भएको बताए।'],
 ['By then, most racers had passed. Riya felt guilty, but Bikram reminded her that the race supported the library. They thanked the volunteers and set off together at a comfortable pace.','त्यतिन्जेल धेरै प्रतिस्पर्धी अघि गइसकेका थिए। रियालाई नराम्रो लाग्यो, तर विक्रमले दौड पुस्तकालयको सहयोगका लागि भएको सम्झायो। उनीहरूले स्वयंसेवकहरूलाई धन्यवाद दिए र सहज गतिमा सँगै अघि बढे।']
 ],[
 q('Who repaired the bicycle?','साइकल कसले मर्मत गर्‍यो?', [['A volunteer mechanic','स्वयंसेवी मिस्त्रीले'],['A bus driver','बस चालकले'],['The principal','प्रधानाध्यापकले']],0),
 q('What did the mechanic check besides the chain?','मिस्त्रीले चेनबाहेक के जाँचे?', [['The brakes','ब्रेक'],['The school gate','विद्यालयको ढोका'],['A clock','घडी']],0)
 ]),
 chapter('The Finish Line','अन्तिम रेखा',[
 ['Bikram and Riya crossed the finish line long after the fastest riders. Their classmates cheered anyway. The teacher announced that the race had raised enough money to buy a shelf of new books.','विक्रम र रिया छिटो दौडिनेहरूभन्दा धेरै पछि अन्तिम रेखा पार गरे। तैपनि सहपाठीहरूले ताली बजाए। शिक्षकले दौडबाट नयाँ किताबको एउटा दराज भर्न पुग्ने रकम उठेको बताए।'],
 ['Riya smiled at Bikram. “We did not win first place,” she said, “but we kept our promise.” They rode home side by side, proud that they had chosen friendship and safety over speed.','रियाले विक्रमलाई हेरेर मुस्कुराइन्। “हामी पहिलो भएनौँ,” उनले भनिन्, “तर हाम्रो वाचा पूरा भयो।” उनीहरू छेउछाउमा साइकल चलाउँदै घर फर्किए। उनीहरू छिटो पुग्नुभन्दा मित्रता र सुरक्षालाई महत्त्व दिएकोमा गर्व गर्थे।']
 ],[
 q('Did the friends win first place?','के साथीहरू पहिलो भए?', [['No','होइन'],['Yes','हो'],['The race was canceled','दौड रद्द भयो']],0),
 q('What mattered most to them?','उनीहरूका लागि सबैभन्दा महत्त्वपूर्ण के थियो?', [['Friendship and safety','मित्रता र सुरक्षा'],['Riding fastest','सबैभन्दा छिटो दौडिनु'],['Buying prizes','पुरस्कार किन्नु']],0)
 ])
 ]
},
{
 id:'river-bridge',title:'A Rope Across the River',neTitle:'नदीपारिको बाटो',
 category:'Adventure',level:'B1',cover:'./assets/read-topics/travel.svg',
 description:'A village chooses a safer crossing after the monsoon.',
 neDescription:'मनसुनपछि गाउँलेहरूले सुरक्षित नदीपारिको बाटो बनाउँछन्।',
 chapters:[
 chapter('The Rising River','बढ्दो नदी',[
 ['After several days of monsoon rain, the river near Tara’s village ran high and fast. The old footbridge had been closed for safety checks. Children had to take a long road to school on the other side.','धेरै दिनको मनसुनी वर्षापछि ताराको गाउँनजिकको नदी ठूलो र वेगिलो भएको थियो। पुरानो झोलुङ्गे पुल सुरक्षा जाँचका लागि बन्द गरिएको थियो। बालबालिकाले नदीपारिको विद्यालय पुग्न लामो घुमाउरो बाटो हिँड्नुपर्थ्यो।'],
 ['Tara’s little cousin pointed to a rope that someone had tied between two trees. “Could we cross using that?” he asked. Tara shook her head. The water was dangerous, and a rope was not a bridge.','ताराको सानो भाइले दुई रूखमा बाँधिएको डोरी देखायो। “यसबाट पारि जान मिल्दैन?” उसले सोध्यो। ताराले टाउको हल्लाइन्। पानी खतरनाक थियो र डोरी पुल थिएन।']
 ],[
 q('Why was the old footbridge closed?','पुरानो पुल किन बन्द गरिएको थियो?', [['Safety checks','सुरक्षा जाँचका लागि'],['A festival','चाडका लागि'],['A race','दौडका लागि']],0),
 q('Did Tara allow her cousin to cross on a rope?','के ताराले भाइलाई डोरीबाट नदी तर्न दिइन्?', [['Yes','हो'],['No','होइन'],['Only at night','राति मात्र']],1)
 ]),
 chapter('A Village Meeting','गाउँको बैठक',[
 ['At the community meeting, Tara described the difficult journey to school. Parents, teachers, and the local engineer listened carefully. They agreed nobody should attempt to cross the river until a safe route was available.','सामुदायिक बैठकमा ताराले विद्यालय पुग्न भोग्नुपरेको कठिनाइ सुनाइन्। अभिभावक, शिक्षक र स्थानीय इन्जिनियरले ध्यान दिएर सुने। सुरक्षित बाटो नबन्दासम्म कसैले नदी तर्ने प्रयास नगर्ने सहमति भयो।'],
 ['The engineer explained that a temporary road crossing farther upstream could be checked and marked. Volunteers offered to guide families along it, while the municipality planned repairs to the footbridge.','इन्जिनियरले नदीको माथिल्लो भागमा रहेको अस्थायी सडक मार्ग जाँचेर चिन्ह राख्न सकिने बताए। स्वयंसेवकहरूले परिवारलाई त्यो बाटो देखाउने भए र नगरपालिकाले झोलुङ्गे पुल मर्मत गर्ने योजना बनायो।']
 ],[
 q('Who explained the safer temporary route?','सुरक्षित अस्थायी बाटोबारे कसले बताए?', [['The engineer','इन्जिनियरले'],['A singer','गायकले'],['A tourist','पर्यटकले']],0),
 q('Who would guide families?','परिवारलाई बाटो कसले देखाउने भयो?', [['Volunteers','स्वयंसेवकहरूले'],['Strangers online','इन्टरनेटका अपरिचितहरूले'],['Nobody','कसैले होइन']],0)
 ]),
 chapter('The Warning Sign','चेतावनी चिन्ह',[
 ['The following morning, villagers placed clear warning signs near the closed bridge and the loose rope. The engineer inspected the upstream road and confirmed that it could be used only when the water stayed below the marked level.','भोलिपल्ट गाउँलेहरूले बन्द पुल र डोरीनजिक स्पष्ट चेतावनी चिन्ह राखे। इन्जिनियरले माथिल्लो सडकको निरीक्षण गरेर पानी चिन्ह लगाएको तहभन्दा तल हुँदा मात्र त्यो बाटो प्रयोग गर्न मिल्ने पुष्टि गरे।'],
 ['Tara helped younger children read the signs in both Nepali and English. “Closed means closed, even when we are late,” she reminded them. A volunteer walked with the group to school.','ताराले साना बालबालिकालाई नेपाली र अंग्रेजी दुवै भाषामा चिन्ह पढ्न सिकाइन्। “ढिलो भए पनि बन्द भनेको बन्द नै हो,” उनले सम्झाइन्। एक स्वयंसेवक उनीहरूसँगै विद्यालयसम्म हिँडे।']
 ],[
 q('What did the villagers put near the closed bridge?','बन्द पुलनजिक गाउँलेहरूले के राखे?', [['Warning signs','चेतावनी चिन्ह'],['Picnic tables','वनभोजका टेबुल'],['Flags for a race','दौडका झन्डा']],0),
 q('When was the temporary route safe to use?','अस्थायी बाटो कहिले सुरक्षित थियो?', [['At any water level','पानी जति भए पनि'],['Below the marked water level','पानी चिन्हभन्दा तल हुँदा'],['Only in darkness','अँध्यारोमा मात्र']],1)
 ]),
 chapter('A Stronger Connection','बलियो सम्बन्ध',[
 ['A month later, trained workers completed the bridge repairs and the engineer reopened it after inspection. Children could once again reach school without a long detour. Tara was happy, but she remembered the lesson of the rainy weeks.','एक महिनापछि तालिमप्राप्त कामदारहरूले पुल मर्मत गरे र इन्जिनियरको जाँचपछि फेरि खुल्यो। बालबालिकाले अब लामो घुमाउरो बाटो हिँड्नुपरेन। तारा खुसी थिइन्, तर वर्षातका हप्ताहरूको पाठ उनलाई याद थियो।'],
 ['At school, she wrote a short story about the village working together. She called it “A Rope Across the River,” because the unsafe rope had started a useful conversation about building a genuinely safe crossing.','विद्यालयमा उनले गाउँलेहरू मिलेर काम गरेको विषयमा छोटो कथा लेखिन्। उनले यसको नाम “नदीपारिको डोरी” राखिन्, किनकि असुरक्षित डोरीले साँच्चै सुरक्षित बाटो बनाउने कुराकानी सुरु गराएको थियो।']
 ],[
 q('Who inspected the repaired bridge?','मर्मत भएको पुल कसले जाँचे?', [['The engineer','इन्जिनियरले'],['Tara alone','ताराले एक्लै'],['The school cook','विद्यालयका भान्सेले']],0),
 q('What helped solve the problem?','समस्या समाधान गर्न केले सहयोग गर्‍यो?', [['Community cooperation','समुदायको सहकार्यले'],['Ignoring warning signs','चेतावनी बेवास्ता गरेर'],['Using the loose rope','खुकुलो डोरी प्रयोग गरेर']],0)
 ])
 ]
},
{
 id:'village-light',title:'A Light in the Village',neTitle:'गाउँमा बल्ने उज्यालो',
 category:'Everyday Life',level:'B1',cover:'./assets/read-topics/science.svg',
 description:'Rupa works with neighbors to bring safe study lights to homes.',
 neDescription:'रूपाले छिमेकीसँग मिलेर पढाइका लागि सुरक्षित बत्ती ल्याउँछिन्।',
 chapters:[
 chapter('The Dark Evening','अँध्यारो साँझ',[
 ['Rupa loved reading after dinner, but power cuts had become common in her hillside village. Her younger sister often struggled to finish homework before dark. The family had one small torch, and its batteries were running low.','रूपालाई बेलुकाको खाना खाएपछि पढ्न मन पर्थ्यो, तर पहाडी गाउँमा बारम्बार बिजुली जान्थ्यो। उनकी बहिनीलाई अँध्यारो हुनुअघि गृहकार्य सकाउन गाह्रो हुन्थ्यो। घरमा एउटा सानो टर्च थियो र त्यसका ब्याट्री पनि सकिन लागेका थिए।'],
 ['At school, Rupa’s science teacher asked the class to think of a problem they could solve together. Rupa raised her hand. “What if we found safe lights that could charge during the day?”','विद्यालयमा विज्ञान शिक्षकले विद्यार्थीहरूलाई मिलेर समाधान गर्न सकिने समस्या सोच्न भने। रूपाले हात उठाइन्। “दिउँसो चार्ज हुने सुरक्षित बत्तीको व्यवस्था गरे कस्तो होला?” उनले सोधिन्।']
 ],[
 q('What problem did Rupa’s village face?','रूपाको गाउँमा के समस्या थियो?', [['Frequent power cuts','बारम्बार बिजुली जाने'],['Too many buses','धेरै बस हुने'],['No school','विद्यालय नहुने']],0),
 q('Who encouraged the class to solve a problem?','समस्या समाधान गर्न विद्यार्थीलाई कसले प्रेरित गरे?', [['The science teacher','विज्ञान शिक्षकले'],['A football coach','फुटबल प्रशिक्षकले'],['A taxi driver','ट्याक्सी चालकले']],0)
 ]),
 chapter('A Clever Plan','राम्रो योजना',[
 ['The teacher showed the class a small solar reading lamp. It stored energy from sunlight and could light a desk at night. Rupa tested it with her friends and wrote down how many hours it worked.','शिक्षकले कक्षामा सानो सौर्य पढाइ बत्ती देखाए। त्यसले घामको ऊर्जा जम्मा गरेर राति टेबुल उज्यालो बनाउँथ्यो। रूपाले साथीहरूसँग परीक्षण गरेर कति घण्टा बल्यो भनेर लेखिन्।'],
 ['The lamps were useful, but buying enough for every home would cost money. Instead of making promises they could not keep, the students prepared a budget and asked the village committee for support.','बत्ती उपयोगी थिए, तर सबै घरका लागि किन्न पैसा चाहिन्थ्यो। पूरा गर्न नसकिने वाचा गर्नुको सट्टा विद्यार्थीहरूले बजेट बनाए र गाउँ समितिसँग सहयोग मागे।']
 ],[
 q('How did the lamp store energy?','बत्तीले ऊर्जा कसरी जम्मा गर्थ्यो?', [['From sunlight','घामबाट'],['From river water','नदीको पानीबाट'],['From candles','मैनबत्तीबाट']],0),
 q('What did students prepare before asking for support?','सहयोग माग्नुअघि विद्यार्थीहरूले के बनाए?', [['A budget','बजेट'],['A movie poster','चलचित्र पोस्टर'],['A shopping list for toys','खेलौनाको सूची']],0)
 ]),
 chapter('Working Together','सहकार्य',[
 ['The village committee agreed to help with a small pilot program. A local electrician checked the lamps, and families learned how to charge and use them safely. Rupa helped distribute them fairly to homes with schoolchildren.','गाउँ समितिले सानो परीक्षण कार्यक्रमका लागि सहयोग गर्ने भयो। स्थानीय विद्युत् प्राविधिकले बत्ती जाँचे र परिवारहरूले सुरक्षित रूपमा चार्ज र प्रयोग गर्ने तरिका सिके। रूपाले विद्यालय जाने बालबालिका भएका घरमा निष्पक्ष रूपमा बत्ती बाँड्न सहयोग गरिन्।'],
 ['One evening, heavy clouds covered the sky, and several lamps had not charged enough. Rupa recorded the problem instead of hiding it. The teacher suggested keeping a safe backup light and adjusting the charging schedule.','एक साँझ बाक्लो बादलले आकाश ढाक्यो र केही बत्ती पर्याप्त चार्ज भएनन्। रूपाले समस्या लुकाउनुको सट्टा टिपिन्। शिक्षकले सुरक्षित वैकल्पिक बत्ती राख्ने र चार्ज गर्ने समय मिलाउने सुझाव दिए।']
 ],[
 q('Who checked the lamps for safety?','सुरक्षाका लागि बत्ती कसले जाँचे?', [['A local electrician','स्थानीय विद्युत् प्राविधिकले'],['A tourist','पर्यटकले'],['A baker','पाउरोटी बनाउने व्यक्तिले']],0),
 q('What did Rupa do when some lamps did not charge?','केही बत्ती चार्ज नभएपछि रूपाले के गरिन्?', [['Recorded the problem','समस्या टिपिन्'],['Hid the problem','समस्या लुकाइन्'],['Threw every lamp away','सबै बत्ती फालिन्']],0)
 ]),
 chapter('The Reading Circle','पढाइको घेरा',[
 ['After a few weeks, more children could read comfortably in the evenings. Rupa and her friends started a weekly reading circle, where they shared stories under the new lamps. Families also discussed what could be improved.','केही हप्तापछि धेरै बालबालिका साँझमा सजिलै पढ्न सक्ने भए। रूपा र साथीहरूले हप्तामा एक दिन कथा पढ्ने समूह सुरु गरे। नयाँ बत्तीको उज्यालोमा उनीहरू कथा बाँड्थे। परिवारहरूले सुधारका उपाय पनि छलफल गर्थे।'],
 ['The project did not solve every electricity problem, but it made a real difference. Rupa wrote in her notebook, “A small idea becomes brighter when a whole community helps it grow.”','यस योजनाले बिजुलीका सबै समस्या समाधान गरेन, तर वास्तविक परिवर्तन ल्यायो। रूपाले कापीमा लेखिन्, “सानो विचारलाई सबै मिलेर बढाउँदा त्यो अझ उज्यालो हुन्छ।”']
 ],[
 q('What activity did the children start?','बालबालिकाले कुन गतिविधि सुरु गरे?', [['A reading circle','कथा पढ्ने समूह'],['A car race','गाडी दौड'],['A shopping mall','किनमेल केन्द्र']],0),
 q('Did the lamps solve every electricity problem?','के बत्तीले बिजुलीका सबै समस्या समाधान गर्‍यो?', [['No, but they helped','होइन, तर सहयोग भयो'],['Yes, completely','हो, सबै'],['No one used them','कसैले प्रयोग गरेन']],0)
 ])
 ]
},
{
 id:'lost-puppy',title:'The Lost Puppy',neTitle:'हराएको कुकुरको छाउरो',
 category:'Everyday Life',level:'A2',cover:'./assets/read-topics/animals.svg',
 description:'Samir follows gentle clues to find a puppy’s family.',
 neDescription:'समीरले साना सुराक पछ्याएर कुकुरको छाउरोलाई घर पुर्‍याउँछ।',
 chapters:[
 chapter('A Sound Behind the Gate','ढोकापछाडिको आवाज',[
 ['Samir was walking home from school in Bharatpur when he heard a quiet whimper near a closed gate. Under a bush sat a little brown puppy. Its fur was wet, and it looked frightened.','भरतपुरमा विद्यालयबाट घर फर्किँदा समीरले बन्द ढोकानजिक सानो आवाज सुन्यो। झाडीमुनि खैरो रङको कुकुरको छाउरो बसेको थियो। उसको रौँ भिजेको थियो र ऊ डराएको देखिन्थ्यो।'],
 ['Samir stayed a short distance away and called his father for help. Together, they offered the puppy water and checked for a name tag. The tag had a phone number, but part of it was unreadable.','समीर केही टाढै बसेर बुबालाई सहयोगका लागि फोन गर्‍यो। दुवैले छाउरोलाई पानी दिए र नाम लेखिएको ट्याग हेरे। ट्यागमा फोन नम्बर थियो, तर केही अंक पढ्न सकिँदैनथ्यो।']
 ],[
 q('Where was the puppy hiding?','छाउरो कहाँ लुकेको थियो?', [['Under a bush','झाडीमुनि'],['On a roof','छानामा'],['Inside a bus','बसभित्र']],0),
 q('Whom did Samir call?','समीरले कसलाई फोन गर्‍यो?', [['His father','बुबालाई'],['His teacher','शिक्षकलाई'],['A tourist','पर्यटकलाई']],0)
 ]),
 chapter('The Search Begins','खोजी सुरु',[
 ['Samir’s father contacted a local animal-care volunteer for advice. The volunteer checked that the puppy was healthy and suggested sharing a clear photo with nearby neighbors. They made a simple notice with the puppy’s description.','समीरका बुबाले स्थानीय पशु हेरचाह स्वयंसेवकसँग सल्लाह लिए। स्वयंसेवकले छाउरो स्वस्थ भएको जाँचे र नजिकका छिमेकीलाई स्पष्ट तस्बिर देखाउन सुझाव दिए। उनीहरूले छाउरोको विवरण भएको सानो सूचना बनाए।'],
 ['A shopkeeper remembered seeing a girl looking for a lost dog that morning. He did not know her name, but he pointed them toward the public park. Samir hoped the clue would help.','एक पसलेलाई बिहान हराएको कुकुर खोज्दै हिँडेकी केटी सम्झना आयो। उनको नाम थाहा थिएन, तर उनले सार्वजनिक पार्कतिर देखाए। समीरलाई यो सुराक उपयोगी होला भन्ने आशा थियो।']
 ],[
 q('Who gave advice about the puppy?','छाउरोबारे कसले सल्लाह दिए?', [['An animal-care volunteer','पशु हेरचाह स्वयंसेवकले'],['A bus conductor','बस सहचालकले'],['A singer','गायकले']],0),
 q('Where did the shopkeeper direct them?','पसलेले उनीहरूलाई कहाँ जान भने?', [['To the park','पार्कमा'],['To a mountain','पहाडमा'],['To the airport','विमानस्थलमा']],0)
 ]),
 chapter('The Girl at the Park','पार्कमा भेटिएकी केटी',[
 ['At the park, they met a girl named Pooja carrying an empty leash. She said her puppy, Moti, had escaped when a gate was left open. Samir showed her the photograph, and Pooja recognized the brown patch over its eye.','पार्कमा उनीहरूले खाली डोरी बोकेकी पूजा नामकी केटीलाई भेटे। ढोका खुला रहँदा उनको मोती नामको छाउरो भागेको रहेछ। समीरले तस्बिर देखाउँदा पूजाले आँखामाथिको खैरो दाग चिन्नुभयो।'],
 ['Before handing over the puppy, Samir’s father asked Pooja to describe its collar and a small white mark on its chest. Her answers matched perfectly. Everyone felt relieved.','छाउरो फिर्ता दिनुअघि समीरका बुबाले पूजालाई घाँटीको पट्टा र छातीको सानो सेतो दागबारे सोधे। पूजाको वर्णन ठ्याक्कै मिल्यो। सबैले राहत महसुस गरे।']
 ],[
 q('What was the puppy’s name?','छाउरोको नाम के थियो?', [['Moti','मोती'],['Kale','काले'],['Tiger','टाइगर']],0),
 q('How did they confirm the owner?','उनीहरूले मालिकको पुष्टि कसरी गरे?', [['By matching details','चिनारीका विवरण मिलाएर'],['By guessing','अनुमान गरेर'],['By tossing a coin','सिक्का उछालेर']],0)
 ]),
 chapter('A Happy Return','खुसीको पुनर्मिलन',[
 ['Pooja rushed home with Moti and made sure the gate latched securely. She sent Samir a thank-you note with a picture of the puppy sleeping safely on its blanket.','पूजा मोतीलाई लिएर घर फर्किइन् र ढोका राम्रोसँग बन्द हुने बनाइन्। उनले समीरलाई धन्यवादसहित एउटा सन्देश पठाइन्, जसमा मोती आफ्नै ओछ्यानमा सुरक्षित सुतेको तस्बिर थियो।'],
 ['Samir smiled when he saw the photograph. He had wanted to help an animal, but he also learned how important it is to ask adults for help and check facts before returning a lost pet.','तस्बिर देखेर समीर मुस्कुरायो। उसले जनावरलाई सहयोग गर्न चाहेको थियो, तर हराएको पाल्तु जनावर फर्काउँदा ठूलाबडाको सहयोग लिनु र तथ्य जाँच्नु कति महत्त्वपूर्ण रहेछ भन्ने पनि सिक्यो।']
 ],[
 q('What did Pooja secure at home?','पूजाले घरमा के सुरक्षित बनाइन्?', [['The gate','ढोका'],['A boat','डुङ्गा'],['A computer','कम्प्युटर']],0),
 q('What lesson did Samir learn?','समीरले के सिक्यो?', [['Ask adults and check details','ठूलाबडालाई सोध्ने र विवरण जाँच्ने'],['Keep every lost pet','हरेक हराएको जनावर आफैँ राख्ने'],['Ignore lost animals','हराएका जनावरलाई बेवास्ता गर्ने']],0)
 ])
 ]
}
];

/* Quick Reads: four complete, short, three-chapter books.
 * Every chapter has its own connected plot, natural Nepali and comprehension quiz. */
books.push(
{
 id:'last-bus-home',title:'The Last Bus Home',neTitle:'घर फर्किने अन्तिम बस',
 category:'Everyday Life',level:'A2',cover:'./assets/read-topics/travel.svg',
 description:'A missed bus leads to an unexpected act of kindness.',
 neDescription:'बस छुटेपछि भएको एउटा राम्रो घटनाको कथा।',
 chapters:[
 chapter('The Empty Bus Stop','सुनसान बस बिसौनी',[
 ['After an evening class in Kathmandu, Pratik ran toward the bus stop. He was only a minute late, but the last bus had already left. His phone battery was almost empty.','काठमाडौँमा साँझको कक्षा सकेर प्रतीक बस बिसौनीतिर दौडियो। ऊ एक मिनेट मात्र ढिलो भएको थियो, तर अन्तिम बस छुटिसकेको थियो। उसको मोबाइलको ब्याट्री पनि सकिन लागेको थियो।'],
 ['An older woman named Lata stood nearby with a heavy shopping bag. She was waiting for the same bus. Instead of walking into a dark, unfamiliar road, they decided to ask at the staffed transport counter.','लता नामकी एक वृद्ध महिला गह्रौँ झोला बोकेर नजिकै उभिएकी थिइन्। उनी पनि त्यही बस कुर्दै थिइन्। अँध्यारो अपरिचित बाटो हिँड्नुभन्दा उनीहरूले कर्मचारी भएको यातायात काउन्टरमा सोध्ने निर्णय गरे।']
 ],[
 q('Why was Pratik stuck at the bus stop?','प्रतीक बस बिसौनीमा किन अलपत्र पर्‍यो?', [['He missed the last bus','उसको अन्तिम बस छुट्यो'],['He lost his shoes','उसको जुत्ता हरायो'],['His class was canceled','उसको कक्षा रद्द भयो']],0),
 q('Who was waiting beside him?','उसको छेउमा को पर्खिरहेकी थिइन्?', [['His teacher','उसकी शिक्षिका'],['Lata','लता'],['His sister','उसकी बहिनी']],1)
 ]),
 chapter('An Unexpected Ride','अप्रत्याशित सवारी',[
 ['The counter worker checked the timetable and suggested a licensed taxi from the official stand. Pratik called his father from the counter phone and explained the plan. Lata said she lived near his neighborhood.','काउन्टरका कर्मचारीले समयतालिका हेरेर आधिकारिक स्ट्यान्डको अनुमति प्राप्त ट्याक्सी लिन सुझाव दिए। प्रतीकले काउन्टरको फोनबाट बुबालाई योजना सुनायो। लताले पनि आफू उसको टोलनजिकै बस्ने बताइन्।'],
 ['They shared the taxi fare and talked about their day on the way home. Lata had been visiting her grandson at the hospital. Pratik listened carefully while the city lights passed outside the window.','दुवैले ट्याक्सी भाडा बाँडे र घर फर्किँदा दिनभरिका कुरा गरे। लता अस्पतालमा नातिलाई भेटेर आउँदै थिइन्। झ्यालबाहिर सहरका बत्ती देखिँदै गर्दा प्रतीकले उनको कुरा ध्यान दिएर सुन्यो।']
 ],[
 q('Who suggested the official taxi stand?','आधिकारिक ट्याक्सी स्ट्यान्ड कसले सुझाए?', [['The counter worker','काउन्टरका कर्मचारीले'],['A street musician','सडकका सङ्गीतकारले'],['The bus driver','बस चालकले']],0),
 q('Where had Lata been?','लता कहाँ गएर फर्किँदै थिइन्?', [['At a cinema','चलचित्र हेर्न'],['At a hospital','अस्पतालमा'],['At the airport','विमानस्थलमा']],1)
 ]),
 chapter('A Familiar Neighbor','चिनेको छिमेकी',[
 ['When they reached home, Pratik discovered that Lata lived only two houses away. His father came outside to welcome them. Lata thanked Pratik for staying calm and helping her find a safe ride.','घर पुगेपछि प्रतीकले थाहा पायो कि लता दुई घरपारि मात्र बस्दिरहिछन्। उसका बुबा स्वागत गर्न बाहिर आए। लताले शान्त रहेर सुरक्षित सवारी खोज्न सहयोग गरेकोमा प्रतीकलाई धन्यवाद दिइन्।'],
 ['The next morning, Pratik charged his phone and checked the bus schedule before leaving. He also carried Lata’s shopping bag to her gate. Missing the bus had helped him meet a kind neighbor.','भोलिपल्ट बिहान प्रतीकले मोबाइल चार्ज गर्‍यो र बाहिर निस्कनुअघि बसको समय जाँच्यो। उसले लताको सामान पनि ढोकासम्म पुर्‍याइदियो। बस छुट्नुले उसलाई असल छिमेकी चिन्न मद्दत गरेको थियो।']
 ],[
 q('How close did Lata live to Pratik?','लता प्रतीकको घरबाट कति टाढा बस्थिन्?', [['Two houses away','दुई घरपारि'],['In another country','अर्को देशमा'],['Across a river','नदीपारि']],0),
 q('What did Pratik change the next morning?','प्रतीकले भोलिपल्ट बिहान के परिवर्तन गर्‍यो?', [['He stopped attending class','उसले कक्षा छाड्यो'],['He checked the bus time and charged his phone','बसको समय जाँच्यो र फोन चार्ज गर्‍यो'],['He bought a new bus','उसले नयाँ बस किन्यो']],1)
 ])
 ]
},
{
 id:'red-umbrella',title:'The Red Umbrella',neTitle:'रातो छाता',
 category:'Mystery',level:'A2',cover:'./assets/read-topics/mystery.svg',
 description:'A bright umbrella carries a tiny mystery through the rain.',
 neDescription:'पानी पर्दा रातो छातासँग जोडिएको सानो रहस्य।',
 chapters:[
 chapter('An Umbrella Left Behind','छुटेको छाता',[
 ['Rain began just as Aasha closed her small stationery shop in Patan. A red umbrella stood by the door, but no customer was nearby. Around its handle hung a tag with the words “Please return.”','पाटनमा आशाले आफ्नो सानो स्टेसनरी पसल बन्द गर्ने बेलामा पानी पर्न थाल्यो। ढोकानजिक रातो छाता थियो, तर कुनै ग्राहक थिएनन्। त्यसको बिँडमा “कृपया फिर्ता गरिदिनुहोस्” लेखिएको ट्याग झुन्डिएको थियो।'],
 ['Aasha brought the umbrella inside so it would not blow away. On the tag she noticed a tiny drawing of a yellow bird. She remembered seeing the same bird on a nearby music school sign.','हावाले नउडाओस् भनेर आशाले छाता भित्र राखिन्। ट्यागमा सानो पहेँलो चरा कोरिएको थियो। उनलाई नजिकैको सङ्गीत विद्यालयको बोर्डमा त्यस्तै चरा देखेको सम्झना आयो।']
 ],[
 q('Where was the umbrella found?','छाता कहाँ भेटिएको थियो?', [['Outside the stationery shop','स्टेसनरी पसलबाहिर'],['On a bus','बसभित्र'],['Inside a library','पुस्तकालयभित्र']],0),
 q('What picture was on the tag?','ट्यागमा केको चित्र थियो?', [['A blue bicycle','निलो साइकल'],['A yellow bird','पहेँलो चरा'],['A mountain','पहाड']],1)
 ]),
 chapter('The Music School','सङ्गीत विद्यालय',[
 ['The next day, Aasha visited the music school with the umbrella. The receptionist recognized the bird but said it was only the school logo. Then a young violin student saw the umbrella and smiled.','भोलिपल्ट आशा छाता लिएर सङ्गीत विद्यालय पुगिन्। कार्यालयकी कर्मचारीले चराको चित्र चिन्नुभयो, तर त्यो विद्यालयको लोगो मात्र हो भन्नुभयो। त्यत्तिकैमा भायोलिन सिक्ने एक बालिकाले छाता देखेर मुस्कुराइन्।'],
 ['“That belongs to my grandfather!” the girl said. She described a small repair on one side of the handle. Aasha checked it and found the same mark, but asked the girl to bring her grandfather before handing it over.','“यो मेरो हजुरबुबाको हो!” बालिकाले भनिन्। उनले बिँडको एक छेउमा गरिएको सानो मर्मतको चिनो बताइन्। आशाले त्यही चिनो भेटिन्, तर छाता दिनुअघि हजुरबुबालाई लिएर आउन भनिन्।']
 ],[
 q('What did the girl say about the umbrella?','बालिकाले छाताबारे के भनिन्?', [['It was the teacher’s','यो शिक्षकको हो'],['It belonged to her grandfather','यो हजुरबुबाको हो'],['It was brand-new','यो बिल्कुल नयाँ हो']],1),
 q('How did she describe the umbrella?','उनले छाताको चिनारी कसरी दिइन्?', [['A repaired mark on the handle','बिँडमा मर्मतको चिनो'],['A broken wheel','भाँचिएको पाङ्ग्रा'],['A silver bell','चाँदीको घण्टी']],0)
 ]),
 chapter('The Thank-You Note','धन्यवादको चिठी',[
 ['That afternoon, the girl returned with her grandfather. He showed Aasha an old photograph of himself holding the red umbrella beside his wife. It had been her favorite gift to him.','त्यस दिउँसो बालिका हजुरबुबासँग फर्किन्। उनले श्रीमतीसँग रातो छाता समातेर खिचेको पुरानो तस्बिर आशालाई देखाए। त्यो श्रीमतीले उनलाई दिएको मनपर्ने उपहार रहेछ।'],
 ['Aasha returned it, and he thanked her warmly. A week later, a handwritten note appeared at her shop: “Some things are valuable because of their memories.” Aasha pinned it beside the door.','आशाले छाता फिर्ता दिइन् र उनले मनैदेखि धन्यवाद दिए। एक हप्तापछि पसलमा हस्तलिखित चिठी आयो: “केही वस्तु सम्झनाका कारण मूल्यवान् हुन्छन्।” आशाले त्यो चिठी ढोकाछेउ टाँसिन्।']
 ],[
 q('Who gave the umbrella to the grandfather?','हजुरबुबालाई छाता कसले दिएकी थिइन्?', [['His wife','उनकी श्रीमतीले'],['The receptionist','कार्यालयकी कर्मचारीले'],['Aasha','आशाले']],0),
 q('Why was the umbrella special?','छाता किन विशेष थियो?', [['It was made of gold','यो सुनको थियो'],['It held memories','यससँग सम्झना जोडिएको थियो'],['It could fly','यो उड्न सक्थ्यो']],1)
 ])
 ]
},
{
 id:'midnight-bakery',title:'The Midnight Bakery',neTitle:'मध्यरातको बेकरी',
 category:'Everyday Life',level:'A2–B1',cover:'./assets/read-topics/food.svg',
 description:'A surprise order changes a family bakery’s biggest night.',
 neDescription:'एउटा अप्रत्याशित अर्डरले परिवारको बेकरीमा रमाइलो मोड ल्याउँछ।',
 chapters:[
 chapter('A Late Knock','अबेर आएको ग्राहक',[
 ['It was almost closing time at a bakery in Pokhara. Nisha was sweeping the floor when someone knocked on the glass door. A tired nurse stood outside, holding a small piece of paper.','पोखराको एउटा बेकरी बन्द हुने बेला हुन लागेको थियो। निशा भुइँ बढार्दै थिइन्, त्यत्तिकैमा सिसाको ढोकामा कसैले ढकढक्यायो। बाहिर थाकेकी एक नर्स सानो कागज बोकेर उभिएकी थिइन्।'],
 ['“Our hospital team has a birthday tomorrow, but the cake shop canceled our order,” she explained. Nisha checked the kitchen. They had flour, eggs, and fruit, but very little time.','“हाम्रो अस्पतालको टोलीमा भोलि जन्मदिन मनाउने कार्यक्रम छ, तर केक पसलले अर्डर रद्द गर्‍यो,” नर्सले भनिन्। निशाले भान्सा हेरिन्। पिठो, अण्डा र फलफूल थिए, तर समय धेरै थिएन।']
 ],[
 q('Who came to the bakery late?','बेकरीमा अबेर को आइन्?', [['A nurse','नर्स'],['A driver','चालक'],['A farmer','किसान']],0),
 q('What had happened to the original cake order?','पहिलेको केक अर्डर के भएको थियो?', [['It was delivered early','चाँडै आइपुग्यो'],['It was canceled','रद्द भयो'],['It was doubled','दोब्बर भयो']],1)
 ]),
 chapter('The Small Cake Plan','सानो केकको योजना',[
 ['Nisha called her father, who owned the bakery. He suggested making several small cakes instead of one huge cake. Nisha wrote the plan down, checked the ingredients, and told the nurse exactly what they could finish safely.','निशाले बेकरी चलाउने बुबालाई फोन गरिन्। उनले एउटा ठूलो केकको सट्टा केही साना केक बनाउने सुझाव दिए। निशाले योजना लेखिन्, सामग्री जाँचिन् र सुरक्षित रूपमा कति बनाउन सकिन्छ भनेर नर्सलाई स्पष्ट बताइन्।'],
 ['Her brother helped prepare the boxes while Nisha baked. They worked carefully, not quickly enough to make mistakes. By midnight, the cakes were cooling on the counter and smelled wonderful.','निशाले केक पकाउँदा भाइले बाकस तयार गर्‍यो। गल्ती हुने गरी हतार नगरी उनीहरूले ध्यानपूर्वक काम गरे। मध्यरातसम्म केकहरू काउन्टरमा चिसिँदै थिए र मिठो बास्ना आइरहेको थियो।']
 ],[
 q('What did Nisha’s father suggest?','निशाका बुबाले के सुझाव दिए?', [['One enormous cake','एउटा अत्यन्त ठूलो केक'],['Several small cakes','केही साना केक'],['Canceling everything','सबै रद्द गर्ने']],1),
 q('Who helped prepare the boxes?','बाकस तयार गर्न कसले सहयोग गर्‍यो?', [['Her brother','उनको भाइले'],['The nurse','नर्सले'],['A tourist','पर्यटकले']],0)
 ]),
 chapter('A Morning Surprise','बिहानको आश्चर्य',[
 ['The nurse collected the cakes early the next morning. At the hospital, the team shared them with a colleague who was celebrating her birthday after a long night shift. Everyone appreciated the thoughtful surprise.','भोलिपल्ट बिहानै नर्सले केकहरू लगिन्। अस्पतालमा रातभर काम गरेर जन्मदिन मनाइरहेकी सहकर्मीलाई टोलीले ती केक बाँड्यो। सबैले त्यो आत्मीय आश्चर्यको प्रशंसा गरे।'],
 ['That afternoon, Nisha received a photo of the smiling team and a thank-you message. She added a new item to the bakery menu: “Small Celebration Cakes.” Sometimes a difficult request leads to a wonderful idea.','त्यस दिउँसो निशालाई हाँसिरहेको टोलीको तस्बिर र धन्यवाद सन्देश आयो। उनले बेकरीको मेनुमा नयाँ परिकार थपिन्: “साना उत्सव केकहरू।” कहिलेकाहीँ गाह्रो अनुरोधबाट राम्रो विचार जन्मिन्छ।']
 ],[
 q('Where were the cakes delivered?','केकहरू कहाँ पुर्‍याइयो?', [['To the hospital','अस्पतालमा'],['To a school bus','विद्यालयको बसमा'],['To the airport','विमानस्थलमा']],0),
 q('What new item did Nisha add to the menu?','निशाले मेनुमा के नयाँ थपिन्?', [['Small Celebration Cakes','साना उत्सव केकहरू'],['Vegetable soup','तरकारी सुप'],['Ice cream only','आइसक्रिम मात्र']],0)
 ])
 ]
},
{
 id:'the-secret-seed',title:'The Secret Seed',neTitle:'रहस्यमय बीउ',
 category:'Culture',level:'A2',cover:'./assets/read-topics/culture.svg',
 description:'Two cousins plant a mysterious seed and discover its true gift.',
 neDescription:'दुई दाजुभाइले रहस्यमय बीउ रोपेर यसको खास उपहार पत्ता लगाउँछन्।',
 chapters:[
 chapter('Grandmother’s Small Box','हजुरआमाको सानो बाकस',[
 ['When Pema visited her grandmother in Ilam, she found a little wooden box on the shelf. Inside lay one dry brown seed and a note saying, “Plant this with patience.” Grandmother smiled but did not tell her what would grow.','इलाममा हजुरआमालाई भेट्न गएकी पेमाले दराजमा सानो काठको बाकस भेटिन्। त्यसमा एउटा सुक्खा खैरो बीउ र “धैर्य गरेर रोप” लेखिएको चिठी थियो। हजुरआमा मुस्कुराउनुभयो, तर के उम्रन्छ भन्नुभएन।'],
 ['Pema and her cousin Sonam filled a pot with soil. They planted the seed, added a little water, and placed the pot where it received morning sunlight. Then they waited.','पेमा र उनका दाजुभाइ सोनामले गमलामा माटो भरे। उनीहरूले बीउ रोपे, अलिकति पानी हाले र बिहानको घाम आउने ठाउँमा गमला राखे। त्यसपछि पर्खिए।']
 ],[
 q('What did Pema find in the box?','पेमाले बाकसमा के भेटिन्?', [['A brown seed','खैरो बीउ'],['A silver key','चाँदीको साँचो'],['A blue pencil','निलो सिसाकलम']],0),
 q('Where did they put the planted seed?','उनीहरूले रोपेको बीउ कहाँ राखे?', [['In a dark drawer','अँध्यारो दराजमा'],['In morning sunlight','बिहानको घाम आउने ठाउँमा'],['Under a bed','ओछ्यानमुनि']],1)
 ]),
 chapter('The Tiny Green Leaf','सानो हरियो पात',[
 ['Each morning, Sonam wanted to dig up the seed to check it. Pema reminded him that roots need time to grow. After several days, a tiny green leaf appeared above the soil.','हरेक बिहान सोनामलाई बीउ खनेर हेर्न मन लाग्थ्यो। पेमाले जरालाई बढ्न समय चाहिन्छ भनेर सम्झाइन्। केही दिनपछि माटोमाथि सानो हरियो पात देखा पर्‍यो।'],
 ['They rushed to show Grandmother. She asked them to write down how the plant changed every week. Soon the cousins noticed two more leaves and a strong stem. Their notebook filled with drawings.','उनीहरू हतारिँदै हजुरआमालाई देखाउन गए। हजुरआमाले हरेक हप्ता बिरुवामा आउने परिवर्तन लेख्न भन्नुभयो। चाँडै दुईवटा थप पात र बलियो डाँठ देखियो। उनीहरूको कापी चित्रहरूले भरियो।']
 ],[
 q('What first appeared above the soil?','माटोमाथि सुरुमा के देखियो?', [['A green leaf','हरियो पात'],['A yellow flower','पहेँलो फूल'],['A red fruit','रातो फल']],0),
 q('What did Grandmother ask them to do?','हजुरआमाले उनीहरूलाई के गर्न भन्नुभयो?', [['Record the changes','परिवर्तन टिप्न'],['Throw away the pot','गमला फाल्न'],['Dig up the roots','जरा खन्न']],0)
 ]),
 chapter('The Real Surprise','साँचो आश्चर्य',[
 ['A few weeks later, the plant produced beautiful marigold flowers. Grandmother explained that the seed came from the garden she had planted with Pema’s mother many years ago. The flowers were special because they carried a family memory.','केही हप्तापछि बिरुवामा सुन्दर सयपत्री फूल फुले। हजुरआमाले त्यो बीउ धेरै वर्षअघि पेमाकी आमासँग लगाएको बगैँचाबाट आएको बताउनुभयो। ती फूल परिवारको सम्झना भएकाले विशेष थिए।'],
 ['At Tihar, Pema and Sonam used a few flowers to make a small garland for Grandmother. They kept the remaining seeds for next year. Pema finally understood the note: patience had helped a memory bloom again.','तिहारमा पेमा र सोनामले केही फूलबाट हजुरआमाका लागि सानो माला बनाए। बाँकी बीउ अर्को वर्षका लागि राखे। पेमाले चिठीको अर्थ बुझिन्: धैर्यले पुरानो सम्झनालाई फेरि फुल्न सहयोग गरेको थियो।']
 ],[
 q('What flowers grew?','कुन फूल फुले?', [['Marigolds','सयपत्री'],['Roses','गुलाफ'],['Lotuses','कमल']],0),
 q('Why were the flowers special?','फूलहरू किन विशेष थिए?', [['They carried a family memory','परिवारको सम्झना बोकेका थिए'],['They were made of plastic','प्लास्टिकका थिए'],['They glowed at night','राति चम्किन्थे']],0)
 ])
 ]
}
);


/* Two additional original, connected three-chapter short books. */
books.push(
{
 id:'mysterious-house',title:'The Mysterious House',neTitle:'रहस्यमय घर',
 category:'Mystery',level:'A2–B1',cover:'./assets/read-topics/mystery.svg',
 description:'A curious light leads two cousins to an old neighborhood secret.',
 neDescription:'एउटा अनौठो बत्तीले दुई दाजुबहिनीलाई पुरानो रहस्यसम्म पुर्‍याउँछ।',
 chapters:[
 chapter('The Light in the Window','झ्यालमा देखिएको उज्यालो',[
 ['Every evening, a small light appeared in the window of an empty house near Aarav’s home in Bhaktapur. No one had lived there for years. When his cousin Mira visited, she noticed the same light and asked who was inside.','भक्तपुरमा आरवको घरनजिकैको खाली घरको झ्यालमा हरेक साँझ सानो बत्ती बल्थ्यो। वर्षौँदेखि त्यहाँ कोही बसेका थिएनन्। उसकी बहिनी मिरा भेट्न आउँदा उनले पनि त्यो उज्यालो देखिन् र भित्र को होला भनेर सोधिन्।'],
 ['Aarav wanted to climb the wall, but Mira stopped him. “It belongs to someone. We should ask the owner,” she said. Their grandmother knew the family and offered to call them the following morning.','आरव पर्खाल चढ्न चाहन्थ्यो, तर मिराले रोकिन्। “यो कसैको घर हो। हामीले मालिकलाई सोध्नुपर्छ,” उनले भनिन्। उनीहरूकी हजुरआमाले त्यो परिवारलाई चिन्नुहुन्थ्यो र भोलिपल्ट फोन गर्ने बताउनुभयो।']
 ],[
 q('Where did the strange light appear?','अनौठो उज्यालो कहाँ देखिन्थ्यो?', [['In an empty house','खाली घरमा'],['Under a bridge','पुलमुनि'],['Inside a bus','बसभित्र']],0),
 q('Why did Mira stop Aarav from climbing the wall?','मिराले आरवलाई पर्खाल चढ्न किन रोकिन्?', [['The house belonged to someone','घरको मालिक थियो'],['She wanted to race him','उनी दौड गर्न चाहन्थिन्'],['They had no shoes','उनीहरूसँग जुत्ता थिएन']],0)
 ]),
 chapter('The Keeper of the Keys','साँचो राख्ने व्यक्ति',[
 ['The owner explained that a retired clockmaker named Dev had permission to look after the house. He visited in the evenings to repair a collection of old wall clocks. Grandmother arranged for the children to meet him at the front door.','घरका मालिकले देव नामका अवकाशप्राप्त घडी मर्मत गर्ने व्यक्तिलाई घरको हेरचाह गर्न अनुमति दिएको बताए। उनी बेलुका पुराना भित्ते घडीहरू मर्मत गर्न आउँथे। हजुरआमाले बालबालिकालाई मूल ढोकामा उनीसँग भेट्ने व्यवस्था गर्नुभयो।'],
 ['Dev smiled when he heard their question. “The light comes from my worktable,” he said. Inside, dozens of clocks waited on shelves. He showed them a wooden clock that had stopped exactly twenty years earlier.','उनीहरूको प्रश्न सुनेर देव मुस्कुराए। “त्यो बत्ती मेरो काम गर्ने टेबुलको हो,” उनले भने। भित्र दराजहरूमा दर्जनौँ घडी थिए। उनले ठ्याक्कै बीस वर्षअघि रोकिएको काठको घडी देखाए।']
 ],[
 q('Who had permission to visit the house?','घरमा जान कसलाई अनुमति थियो?', [['Dev, the clockmaker','घडी मर्मत गर्ने देवलाई'],['A school driver','विद्यालयको चालकलाई'],['An unknown tourist','अपरिचित पर्यटकलाई']],0),
 q('What was Dev repairing?','देवले के मर्मत गर्दै थिए?', [['Old clocks','पुराना घडीहरू'],['Bicycles','साइकलहरू'],['Televisions','टेलिभिजनहरू']],0)
 ]),
 chapter('The House That Ticked Again','फेरि टिकटक गर्ने घर',[
 ['Dev explained that the clock had belonged to the owner’s grandfather. He had promised to repair it before the family reunion on Saturday. Mira helped sort the clock parts while Aarav carefully read the instructions aloud.','देवले त्यो घडी घरमालिकका हजुरबुबाको भएको बताए। शनिबारको पारिवारिक भेटघाटअघि मर्मत गर्ने उनले वाचा गरेका थिए। मिराले घडीका भागहरू मिलाउन सघाइन् र आरवले निर्देशनहरू ध्यानपूर्वक पढेर सुनायो।'],
 ['At last, the clock began to tick. On Saturday, the family gathered and heard its familiar sound again. Aarav looked at the window and laughed. The mysterious light had not hidden a ghost; it had helped bring a family memory back to life.','अन्ततः घडी टिकटक गर्न थाल्यो। शनिबार परिवार भेला हुँदा सबैले त्यो परिचित आवाज फेरि सुने। आरवले झ्यालतिर हेरेर हाँस्यो। रहस्यमय उज्यालोले कुनै भूत लुकाएको थिएन; त्यसले परिवारको पुरानो सम्झना फेरि जीवित बनाउन सहयोग गरेको थियो।']
 ],[
 q('Whose clock was being repaired?','मर्मत भइरहेको घडी कसको थियो?', [['The owner’s grandfather’s','घरमालिकका हजुरबुबाको'],['Mira’s teacher’s','मिराकी शिक्षिकाको'],['A bus passenger’s','बस यात्रीको']],0),
 q('What was the real reason for the evening light?','बेलुकाको बत्ती बल्नुको वास्तविक कारण के थियो?', [['Dev was working on old clocks','देव पुराना घडी मर्मत गर्दै थिए'],['Someone was hiding treasure','कसैले खजाना लुकाउँदै थियो'],['A ghost was visiting','भूत आइरहेको थियो']],0)
 ])
 ]
},
{
 id:'visit-to-bhaktapur',title:'A Visit to Bhaktapur',neTitle:'भक्तपुरको भ्रमण',
 category:'Culture',level:'A2',cover:'./assets/read-topics/culture.svg',
 description:'A family day trip becomes a lesson in art and helping strangers.',
 neDescription:'परिवारको भक्तपुर भ्रमण कला र सहयोगको रमाइलो पाठ बन्छ।',
 chapters:[
 chapter('The Morning in the Square','दरबार क्षेत्रको बिहान',[
 ['On Saturday morning, Lila visited Bhaktapur Durbar Square with her father and her cousin Ben, who had come from abroad. Ben carried a sketchbook because he wanted to draw the temples and wooden windows.','शनिबार बिहान लिला बुबा र विदेशबाट आएका दाजु बेनसँग भक्तपुर दरबार क्षेत्र गइन्। बेनले मन्दिर र काठका झ्यालको चित्र कोर्न स्केचबुक बोकेका थिए।'],
 ['They walked slowly through the square and listened to a local guide explain the traditional buildings. Lila translated a few unfamiliar English words for her father. Ben stopped beside a beautiful carved window to draw it.','उनीहरू दरबार क्षेत्रमा बिस्तारै हिँडे र स्थानीय पथप्रदर्शकले परम्परागत भवनबारे बताएका कुरा सुने। लिलाले केही अपरिचित अंग्रेजी शब्द बुबालाई नेपालीमा बुझाइन्। बेन एउटा सुन्दर कुँदिएको झ्यालछेउ चित्र कोर्न रोकिए।']
 ],[
 q('Why did Ben bring a sketchbook?','बेनले स्केचबुक किन बोकेका थिए?', [['To draw buildings','भवनहरूको चित्र कोर्न'],['To record bus fares','बस भाडा लेख्न'],['To write a shopping bill','किनमेलको बिल लेख्न']],0),
 q('Who explained the traditional buildings?','परम्परागत भवनबारे कसले बताए?', [['A local guide','स्थानीय पथप्रदर्शकले'],['A bus conductor','बस सहचालकले'],['A chef','भान्सेले']],0)
 ]),
 chapter('A Missing Sketchbook','हराएको स्केचबुक',[
 ['After lunch, Ben reached for his bag and realized the sketchbook was missing. He had left it beside the carved window. The group returned to the square, but it was no longer there. Ben looked disappointed.','खाना खाइसकेपछि बेनले झोला खोल्दा स्केचबुक हराएको थाहा पाए। उनले त्यो कुँदिएको झ्यालछेउ छोडेका रहेछन्। उनीहरू दरबार क्षेत्रमा फर्किए, तर कापी त्यहाँ थिएन। बेन निराश देखिए।'],
 ['Instead of searching carelessly, Lila asked nearby shopkeepers if anyone had found a notebook. A pottery seller remembered that a young student had taken it to the visitor information desk so the owner could collect it.','जथाभावी खोज्नुको सट्टा लिलाले नजिकका पसलेहरूलाई कसैले कापी भेट्यो कि भनेर सोधिन्। एक माटाका भाँडा बेच्ने व्यक्तिले एक विद्यार्थीले मालिकले लिन सकून् भनेर त्यो कापी पर्यटक सूचना केन्द्रमा पुर्‍याएको बताए।']
 ],[
 q('Where did Ben leave his sketchbook?','बेनले स्केचबुक कहाँ छोडेका थिए?', [['Beside a carved window','कुँदिएको झ्यालछेउ'],['Inside a taxi','ट्याक्सीभित्र'],['At their hotel','होटलमा']],0),
 q('Where was the notebook taken?','कापी कहाँ पुर्‍याइएको थियो?', [['To the information desk','सूचना केन्द्रमा'],['To the bus station','बसपार्कमा'],['To a hospital','अस्पतालमा']],0)
 ]),
 chapter('A Memory to Take Home','घर लैजाने सम्झना',[
 ['At the information desk, Ben described his blue cover and the drawing on the first page. The worker checked the details and returned the sketchbook. Ben thanked the student through a note left at the desk.','सूचना केन्द्रमा बेनले निलो कभर र पहिलो पानाको चित्रबारे बताए। कर्मचारीले विवरण मिलाएर स्केचबुक फिर्ता दिए। बेनले विद्यार्थीका लागि धन्यवादको चिठी त्यहीँ छोडे।'],
 ['Before leaving, the family visited Pottery Square and watched an artist shape clay on a wheel. Ben added one final drawing to his book: a potter at work. “I came for buildings,” he said, “but I will remember the helpful people too.”','फर्कनुअघि परिवार माटाका भाँडा बनाउने चोक पुग्यो र एक कलाकारले चाकमा माटोको भाँडा बनाएको हेर्‍यो। बेनले किताबमा अन्तिम चित्र कोरे: काम गरिरहेका कुमाले। “म भवन हेर्न आएको थिएँ,” उनले भने, “तर सहयोगी मानिसहरूलाई पनि सम्झिरहनेछु।”']
 ],[
 q('How did Ben prove the sketchbook was his?','बेनले स्केचबुक आफ्नो भएको कसरी पुष्टि गरे?', [['By describing its cover and drawing','कभर र चित्रबारे बताएर'],['By buying a new notebook','नयाँ कापी किनेर'],['By asking a stranger to guess','अपरिचितलाई अनुमान लगाउन भनेर']],0),
 q('What did Ben draw at Pottery Square?','बेनले माटाका भाँडा बनाउने चोकमा केको चित्र कोरे?', [['A potter at work','काम गरिरहेका कुमालेको'],['A bicycle race','साइकल दौडको'],['A football match','फुटबल खेलको']],0)
 ])
 ]
}
);

window.__sikauExtraStoryBooks=books;
})();