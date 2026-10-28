/* English Sikau: real-life choice-driven clothing store role-play.
 * Client-side guided practice, not free-form generative AI.
 * No access controls, saved accounts, payment or verified progress touched.
 * Never promise refunds, exceptions, or specific store policies.
 */
(function(){
'use strict';
const opt=(en,ne,next,patch={})=>({value:en,ne,next,patch,correct:true});
const garments={
 shirt:['shirt','कमिज',false],pants:['pants','पाइन्ट',true],
 shoes:['shoes','जुत्ता',true],jacket:['jacket','ज्याकेट',false],
 dress:['dress','ड्रेस',false],multiple:['clothing items','लुगाहरू',true]
};
function itemText(s,state,ne=false){
 const g=garments[state.item];
 if(!g||state.item==='shirt'||typeof s!=='string')return s;
 if(ne)return s.replace(/कमिज/g,g[1]);
 const [name,,plural]=g;
 return s.replace(/Was this shirt purchased/g,plural?'Were these '+name+' purchased':'Was this '+name+' purchased')
  .replace(/the shirt has been worn/gi,'the '+name+(plural?' have':' has')+' been worn')
  .replace(/a different shirt/gi,plural?'different '+name:'a different '+name)
  .replace(/this shirt/gi,plural?'these '+name:'this '+name)
  .replace(/the shirt/gi,'the '+name)
  .replace(/shirt/gi,name)
  .replace(/exchange it if possible/gi,plural?'exchange them if possible':'exchange it if possible')
  .replace(/keep it for now/gi,plural?'keep them for now':'keep it for now');
}
function step(id,state){
 const row=(npc,npcNe,options,speaker="Store assistant",emoji="🛍️")=>{
  if(options.length<2)throw Error("Each Coach story step needs responses");
  if(!['opening','item','intent','close'].includes(id)){
   options=[...options,opt("Thanks, I have enough information. I'll decide later.",
     "धन्यवाद, मलाई अहिलेको लागि जानकारी पुग्यो। पछि निर्णय गर्छु।","end",{outcome:"later"})];
  }
  const shown=options.map(o=>({...o,value:itemText(o.value,state),ne:itemText(o.ne,state,true)}));
  return {nodeId:id,npc:itemText(npc,state),npcNe:itemText(npcNe,state,true),speaker,speakerEmoji:emoji,storeOptions:shown,
   answer:shown[0].value,answerNe:shown[0].ne,
   hint:"Every choice is valid. Choose what is true for your situation.",
   goal:"Choose a real-life answer · आफूलाई मिल्ने उत्तर छान्नुहोस्।"};
 };
 switch(id){
 case "opening":return row("Hello! Welcome to the store. How can I help you today?",
  "नमस्ते! पसलमा स्वागत छ। आज कसरी मद्दत गरूँ?",[
  opt("I need some help with clothing I bought.","मैले किनेको लुगाबारे मद्दत चाहिएको छ।","item"),
  opt("I'd like to ask about returning or exchanging something.","केही सामान फिर्ता वा साट्नेबारे सोध्न चाहन्छु।","item"),
  opt("Could you tell me your return policy?","फिर्ता गर्ने नियम बताइदिनुहुन्छ?","policy")]);
 case "item":return row("Sure. What item or items are we talking about?",
  "पक्कै। कुन सामान वा सामानहरूबारे कुरा गर्दैछौँ?",[
  opt("It's a shirt.","यो कमिज हो।","intent",{item:"shirt"}),
  opt("It's a pair of pants.","यो पाइन्ट हो।","intent",{item:"pants"}),
  opt("It's a pair of shoes.","यो जुत्ता हो।","intent",{item:"shoes"}),
  opt("It's a jacket.","यो ज्याकेट हो।","intent",{item:"jacket"}),
  opt("It's a dress.","यो ड्रेस हो।","intent",{item:"dress"}),
  opt("I have several clothing items.","मसँग धेरै लुगाहरू छन्।","intent",{item:"multiple"})]);
 case "intent":return row("Thanks for explaining. What would you like to do?",
  "बुझाइदिनुभएकोमा धन्यवाद। तपाईं के गर्न चाहनुहुन्छ?",[
  opt("I'd like a refund if possible.","सम्भव भए पैसा फिर्ता चाहन्छु।","reason",{intent:"refund"}),
  opt("I'd like to exchange it if possible.","सम्भव भए साट्न चाहन्छु।","reason",{intent:"exchange"}),
  opt("I'm not sure yet. Could you explain my options?","अहिलेसम्म निश्चित छैन। विकल्पहरू बुझाइदिनुहुन्छ?","policy",{intent:"information"}),
  opt("I was only checking the policy. Thanks!","म नियम बुझ्न मात्र आएको थिएँ। धन्यवाद!","end",{intent:"keep"})]);
 case "policy":return row("Of course. Eligibility depends on the purchase date, proof of purchase and item condition. What would you like to do?",
  "अवश्य। फिर्ता मिल्ने कुरा मिति, प्रमाण र सामानको अवस्थामा भर पर्छ। तपाईं के गर्न चाहनुहुन्छ?",[
  opt("I'd like to see whether I can get my money back.","पैसा फिर्ता पाइन्छ कि बुझ्न चाहन्छु।","item",{intent:"refund"}),
  opt("I'd prefer to exchange it for another size.","म अर्को साइजसँग साट्न चाहन्छु।","item",{intent:"exchange"}),
  opt("Thanks. I'll decide later.","धन्यवाद। पछि निर्णय गर्छु।","end",{intent:"keep"})]);
 case "reason":return row(state.intent==="exchange"?
   "I can check exchange options. Why would you like a different shirt?":
   "I can look into your request. Why would you like to bring the shirt back?",
  "तपाईंको अनुरोध जाँच्न सक्छु। कमिज किन फिर्ता गर्न वा साट्न चाहनुहुन्छ?",[
  opt("The size doesn't fit me.","साइज मलाई मिल्दैन।","condition",{reason:"size"}),
  opt("The stitching seems defective.","सिलाइ बिग्रेको जस्तो छ।","condition",{reason:"defect"}),
  opt("I changed my mind after buying it.","किनिसकेपछि मेरो मन फेरियो।","condition",{reason:"mind"})]);
 case "condition":return row("Thanks. Have you worn the shirt, or have you only tried it on?",
  "धन्यवाद। कमिज लगाइसक्नुभयो कि लगाएर मात्र हेर्नुभयो?",[
  opt("I only tried it on at home, and the tags are attached.","घरमा लगाएर मात्र हेरेको हुँ, ट्याग अझै छ।","receipt",{condition:"tried"}),
  opt("Yes, I wore it outside once.","हो, एकपटक बाहिर लगाएको थिएँ।","receipt",{condition:"worn"}),
  opt("I haven't worn it, but I removed the tags.","लगाएको छैन, तर ट्याग हटाएँ।","receipt",{condition:"no-tags"})]);
 case "receipt":return row("Do you have a receipt or another proof of purchase?",
  "रसिद वा किनेको अर्को प्रमाण छ?",[
  opt("Yes, I have the paper receipt.","हो, कागजी रसिद छ।","purchase",{receipt:"paper"}),
  opt("I have a digital receipt on my phone.","फोनमा डिजिटल रसिद छ।","purchase",{receipt:"digital"}),
  opt("No, I can't find my receipt.","होइन, रसिद भेट्टाउन सकिनँ।","evidence",{receipt:"missing"})]);
 case "evidence":return row("I understand. Without a receipt, we might need extra proof or a manager's review. Can you find anything showing the purchase?",
  "बुझेँ। रसिद नभए थप प्रमाण वा व्यवस्थापकको जाँच चाहिन सक्छ। किनिएको कुनै प्रमाण भेटिन्छ?",[
  opt("I can look for the payment in my bank statement.","बैंक स्टेटमेन्टमा भुक्तानी खोज्न सक्छु।","purchase",{evidence:"bank"}),
  opt("I might have an order confirmation email.","अर्डर पुष्टि इमेल हुन सक्छ।","purchase",{evidence:"email"}),
  opt("I don't have any proof at the moment.","अहिले कुनै प्रमाण छैन।","purchase",{evidence:"none"})]);
 case "purchase":return row("Was this shirt purchased here, ordered online, or given to you as a gift?",
  "यो कमिज यहीँ किनिएको हो, अनलाइन अर्डर हो, कि उपहार हो?",[
  opt("I bought it in this store.","मैले यही पसलमा किनेको हुँ।","timing",{source:"store"}),
  opt("I ordered it online.","मैले अनलाइन अर्डर गरेको हुँ।","online",{source:"online"}),
  opt("It was a gift, so I'm not sure where it was bought.","यो उपहार थियो, कहाँ किनिएको हो थाहा छैन।","gift",{source:"gift"})]);
 case "online":return row("Online orders can have separate return steps. Can you access the order details?",
  "अनलाइन अर्डरको फिर्ता प्रक्रिया फरक हुन सक्छ। अर्डरको विवरण खोल्न सक्नुहुन्छ?",[
  opt("Yes, I have the order number.","हो, अर्डर नम्बर छ।","timing",{onlineProof:"number"}),
  opt("I can't access my account right now.","अहिले खातामा जान सक्दिनँ।","timing",{onlineProof:"unavailable"}),
  opt("Someone else placed the order for me.","अरू कसैले मेरो लागि अर्डर गरेका थिए।","timing",{onlineProof:"someone-else"})]);
 case "gift":return row("A gift receipt or purchase details may help us review this. Do you have anything from the person who gave it to you?",
  "उपहार रसिद वा खरिद विवरणले मद्दत गर्न सक्छ। उपहार दिने व्यक्तिबाट केही छ?",[
  opt("Yes, I have a gift receipt.","हो, उपहार रसिद छ।","timing",{giftProof:"receipt"}),
  opt("I can ask them for the order information.","अर्डरको विवरण उहाँसँग सोध्न सक्छु।","timing",{giftProof:"ask"}),
  opt("I'd prefer not to contact the gift giver.","उपहार दिने व्यक्तिलाई सम्पर्क गर्न चाहन्नँ।","timing",{giftProof:"none"})]);
 case "timing":return row("About when was the shirt purchased? The date may affect the available options.",
  "कमिज करिब कहिले किनिएको थियो? मितिले विकल्पमा असर पर्न सक्छ।",[
  opt("I bought it yesterday.","हिजो किनेको हुँ।","review",{timing:"yesterday"}),
  opt("It was purchased about two weeks ago.","करिब दुई हप्ताअघि किनेको थियो।","review",{timing:"two-weeks"}),
  opt("It was a few months ago, so I may be past the return period.","केही महिना भयो, फिर्ता अवधि सकिएको हुन सक्छ।","review",{timing:"older"})]);
 case "review":{
  const flags=[];
  if(state.receipt==="missing"&&state.evidence==="none")flags.push("there is no proof of purchase");
  else if(state.receipt==="missing")flags.push("the receipt is missing");
  if(state.condition==="worn")flags.push("the shirt has been worn");
  if(state.condition==="no-tags")flags.push("the tags were removed");
  if(state.timing==="older")flags.push("the return period may have passed");
  if(state.source==="gift"&&state.giftProof==="none")flags.push("this was a gift without a receipt");
  const reason=flags.length?"I see that "+flags.join(", and ")+". ":"Thank you for the details. ";
  return row(reason+"I must check our policy before I can promise any refund or exchange. Would you like a manager to review this?",
   "विवरण बुझेँ। पैसा फिर्ता वा साट्ने वाचा गर्नुअघि पसलको नियम जाँच्नुपर्छ। व्यवस्थापकबाट जाँच गराउने?",[
   opt("Yes, please ask the manager to review my situation.","हो, व्यवस्थापकलाई मेरो अवस्था जाँच्न भन्नुहोस्।","manager",{managerRequested:true}),
   opt("Could you explain the alternatives first?","पहिले अन्य विकल्प बुझाइदिनुहुन्छ?","alternatives"),
   opt("Could I see the return policy in writing?","फिर्ता नियम लिखित रूपमा हेर्न सक्छु?","written")]);
 }
 case "alternatives":return row("Depending on our policy, a refund, exchange or store credit may be possible. We still need to review the item and purchase. What would you prefer?",
  "नियमअनुसार पैसा फिर्ता, साट्ने वा स्टोर क्रेडिट सम्भव हुन सक्छ। सामान र खरिद जाँच्नुपर्छ। के चाहनुहुन्छ?",[
  opt("I still want a refund if possible.","सम्भव भए अझै पैसा फिर्ता चाहन्छु।","manager",{intent:"refund"}),
  opt("I'd consider an exchange or store credit.","साट्ने वा स्टोर क्रेडिटबारे सोच्न सक्छु।","manager",{intent:"exchange"}),
  opt("I'll keep the shirt and decide later.","कमिज राखेर पछि निर्णय गर्छु।","end",{intent:"keep"})]);
 case "written":return row("I can show you the policy, but I cannot confirm eligibility without reviewing your specific purchase. What would help next?",
  "नियम देखाउन सक्छु, तर खरिद जाँच नगरी स्वीकृति पुष्टि गर्न सक्दिनँ। अब के गरौँ?",[
  opt("Could a manager review a possible exception?","अपवाद मिल्छ कि व्यवस्थापकले जाँच्नुहुन्छ?","manager"),
  opt("Please explain the exchange or store-credit options.","साट्ने वा स्टोर क्रेडिटका विकल्प बुझाउनुहोस्।","alternatives"),
  opt("Thank you. I'll read the policy and decide later.","धन्यवाद। नियम पढेर पछि निर्णय गर्छु।","end")]);
 case "manager":{
  const flags=[];
  if(state.receipt==="missing")flags.push("a missing receipt");
  if(state.condition==="worn")flags.push("a shirt that has been worn");
  if(state.condition==="no-tags")flags.push("removed tags");
  if(state.timing==="older")flags.push("an older purchase");
  if(state.source==="gift")flags.push("a gift purchase");
  const description=flags.length?" I understand this involves "+flags.join(", ")+".":" I understand you would like a return reviewed.";
  return row("Hello, I'm the store manager."+description+" I can review the policy, but I can't promise an exception. What would you like me to check?",
   "नमस्ते, म पसलको व्यवस्थापक हुँ। नियम जाँच्न सक्छु, तर अपवादको ग्यारेन्टी छैन। के जाँच गरूँ?",[
   opt("Could you check whether a refund is possible?","पैसा फिर्ता सम्भव छ कि जाँच गर्नुहुन्छ?","managerReview",{intent:"refund"}),
   opt("Could you check whether an exchange is possible?","साट्न मिल्छ कि जाँच गर्नुहुन्छ?","managerReview",{intent:"exchange"}),
   opt("Could store credit be an option?","स्टोर क्रेडिट विकल्प हुन सक्छ?","managerReview",{intent:"store-credit"})
  ],"Store manager","👩‍💼");
 }
 case "managerReview":{
  const preference=state.intent==="refund"?"a refund":state.intent==="exchange"?"an exchange":"store credit";
  return row("I understand you'd prefer "+preference+". I need to check the item and any purchase evidence. If the request cannot be approved, how would you like to proceed?",
   "तपाईंको चाहना बुझेँ। सामान र खरिद प्रमाण जाँच्नुपर्छ। स्वीकृत नभए कसरी अघि बढ्ने?",[
   opt("Please explain any other options available.","अरू उपलब्ध विकल्प बुझाउनुहोस्।","close",{outcome:"options"}),
   opt("Could I receive the decision in writing?","निर्णय लिखित रूपमा पाउँछु?","close",{outcome:"written"}),
   opt("I understand. I can keep the shirt if nothing is possible.","बुझेँ। केही नमिले कमिज राख्न सक्छु।","close",{outcome:"keep"})
  ],"Store manager","👩‍💼");
 }
 case "close":return row(state.outcome==="written"?
  "We can explain how to request a written review. The final decision depends on the policy and the item's condition. Any last questions?":
  "Thank you for discussing your options. Any approval depends on the policy and review. Is there anything else I can explain?",
  "उपलब्ध विकल्पबारे छलफल गर्नुभएकोमा धन्यवाद। स्वीकृति नियम र जाँचमा भर पर्छ। अरू केही बुझाउनुपर्छ?",[
  opt("No, thanks for explaining everything.","होइन, सबै कुरा बुझाइदिनुभएकोमा धन्यवाद।","end"),
  opt("Thanks. I understand the next steps.","धन्यवाद। अबको प्रक्रिया बुझेँ।","end"),
  opt("I'll bring any additional proof if I find it.","थप प्रमाण भेटे ल्याउनेछु।","end")
 ],"Store manager","👩‍💼");
 default:throw Error("Unknown clothing-store conversation node: "+id);
 }
}
function start(scene){
 const state=Object.create(null);
 const original=scene.coachOriginal||scene;
 return {...original,coachOriginal:original,isBranchingStore:true,storeState:state,
  storeCompleted:false,coachStyle:"Choose your own story · आफ्नो कथा",
  steps:[step("opening",state)]};
}
function choose(active,item,index){
 if(!active?.isBranchingStore||active.storeCompleted||index!==active.steps.length-1)
  throw Error("Clothing-store conversation is out of sync");
 if(!item||!item.next||!item.value||!item.ne)throw Error("Missing dialogue choice");
 Object.assign(active.storeState,item.patch||{});
 active.storeCompleted=item.next==="end";
 if(!active.storeCompleted){
  const next=step(item.next,active.storeState);
  active.steps.push(next);
  active.steps[index].after=next.npc;
 }
 return {finished:active.storeCompleted,turns:active.steps.length};
}
function options(stepObj){
 if(!stepObj?.storeOptions)return null;
 return {multi:true,branching:true,options:stepObj.storeOptions.map(v=>({...v}))};
}
const api=Object.freeze({start,choose,options,step});
if(typeof window!=="undefined")window.sikauStoreStory=api;
})();
