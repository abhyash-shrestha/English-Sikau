import {line} from './model';
/** Original public demonstration lessons. Not the paid curriculum. */
export const phrases=[
 line('Good morning.','शुभ प्रभात।','Shubha prabhat.'),
 line('How are you?','तपाईंलाई कस्तो छ?','Tapailai kasto chha?'),
 line('I am learning English.','म अंग्रेजी सिक्दै छु।','Ma angreji sikdai chhu.'),
 line('Could you help me?','के तपाईं मलाई मद्दत गर्न सक्नुहुन्छ?','Ke tapai malai maddat garna saknuhunchha?'),
 line('Thank you very much.','धेरै धन्यवाद।','Dherai dhanyabad.'),
 line('Where is the bus stop?','बस बिसौनी कहाँ छ?','Bus bisauni kaha chha?'),
 line('I would like some tea.','मलाई चिया चाहिन्छ।','Malai chiya chahinchha.')
] as const;
export const reading=[
 {title:'A morning in Pokhara',lines:[
 line('Maya wakes up early and looks at the mountains.','माया बिहानै उठ्छिन् र हिमाल हेर्छिन्।','Maya bihanai uthchhin ra himal herchhin.'),
 line('She walks to the lake with her sister.','उनी आफ्नी बहिनीसँग तालसम्म हिँड्छिन्।','Uni aphni bahinIsanga taalsamma hindchhin.'),
 line('They drink tea and talk about their plans.','उनीहरू चिया पिउँछन् र आफ्ना योजनाबारे कुरा गर्छन्।','Uniharu chiya piunchhan ra aphna yojanabare kura garchhan.')
 ],question:'Where do Maya and her sister walk?',choices:['To the lake','To the airport','To school'],correct:0},
 {title:'At the market',lines:[
 line('Ramesh takes a bag to the market.','रमेश बजारमा झोला लिएर जान्छन्।','Ramesh bajarma jhola liyera janchhan.'),
 line('He buys apples and asks about the price.','उनी स्याउ किन्छन् र मूल्य सोध्छन्।','Uni syau kinchhan ra mulya sodhchhan.')
 ],question:'What does Ramesh buy?',choices:['Shoes','Apples','Books'],correct:1}
] as const;
export const conversations=[
 {title:'At a café',turns:[
 {prompt:line('Hello! What would you like?','नमस्ते! तपाईं के लिन चाहनुहुन्छ?','Namaste! Tapai ke lina chahanuhunchha?'),replies:[line('I would like some tea.','मलाई चिया चाहिन्छ।','Malai chiya chahinchha.'),line('A coffee, please.','कृपया एउटा कफी।','Kripaya euta coffee.')]},
 {prompt:line('Would you like anything else?','तपाईंलाई अरू केही चाहिन्छ?','Tapailai aru kehi chahinchha?'),replies:[line('No, thank you.','पर्दैन, धन्यवाद।','Pardaina, dhanyabad.'),line('A glass of water, please.','कृपया एक गिलास पानी।','Kripaya ek gilas pani.')]}
 ]},
 {title:'Asking for directions',turns:[
 {prompt:line('Hello! Where are you going?','नमस्ते! तपाईं कहाँ जाँदै हुनुहुन्छ?','Namaste! Tapai kaha jandai hunuhunchha?'),replies:[phrases[5]!,line('I am looking for the hospital.','म अस्पताल खोज्दै छु।','Ma aspatal khojdai chhu.')]},
 {prompt:line('It is just down this road.','यो बाटोको अलि पर छ।','Yo batoko ali para chha.'),replies:[phrases[4]!,line('Is it far from here?','के यहाँबाट टाढा छ?','Ke yahabata tadha chha?')]}
 ]}
] as const;
export const vocabulary=[
 line('Water','पानी','Pani'),line('Family','परिवार','Parivar'),line('Mountain','हिमाल','Himal'),
 line('Friend','साथी','Sathi'),line('School','विद्यालय','Vidyalaya'),line('Book','किताब','Kitab')
] as const;
export const festivals=[
 {title:'Dashain · दशैं',icon:'🎋',description:line('Families gather, receive blessings and celebrate together.','परिवार भेला हुन्छन्, आशीर्वाद लिन्छन् र सँगै मनाउँछन्।','Parivar bhela hunchhan, ashirbad linchhan ra sangai manaunchhan.')},
 {title:'Tihar · तिहार',icon:'🪔',description:line('People light lamps and celebrate family bonds.','मानिसहरू दियो बाल्छन् र पारिवारिक सम्बन्ध मनाउँछन्।','Manishharu diyo balchhan ra parivarik sambandha manaunchhan.')},
 {title:'Holi · होली',icon:'🌈',description:line('People celebrate with colors and joyful gatherings.','मानिसहरू रङ र रमाइला भेटघाटसँग होली मनाउँछन्।','Manishharu rang ra ramaila bhetghatsanga Holi manaunchhan.')},
 {title:'Teej · तीज',icon:'🎶',description:line('Many women celebrate through songs, dance and gatherings.','धेरै महिलाहरू गीत, नृत्य र भेटघाटमार्फत तीज मनाउँछन्।','Dherai mahilaharu geet, nritya ra bhetghatmarfat Teej manaunchhan.')}
] as const;
export const visaQuestions=[
 line('What is the purpose of your trip?','तपाईंको यात्राको उद्देश्य के हो?','Tapaiko yatrako uddeshya ke ho?'),
 line('Where do you plan to stay?','तपाईं कहाँ बस्ने योजना छ?','Tapai kaha basne yojana chha?'),
 line('Who will pay for your trip?','तपाईंको यात्राको खर्च कसले तिर्नेछ?','Tapaiko yatrako kharcha kasle tirnechha?')
] as const;
