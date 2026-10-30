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
window.__sikauExtraStoryBooks=books;
})();