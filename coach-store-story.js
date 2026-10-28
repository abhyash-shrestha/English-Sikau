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
// Branch outcomes are examples of a fictional store's policy, not a claim
// about any real retailer. Confirm a transaction or a store-specific item
// label before a manager can decide on a courtesy exception.
function assess(state){
 const receipt=["paper","digital","gift"].includes(state.receipt)||
  state.giftProof==="receipt"||state.evidence==="gift-receipt";
 const verified=state.verification==="receipt-check" && receipt &&
  ["store","online","gift"].includes(state.source);
 const label=state.verification==="label-match";
 if(!verified&&!label)return "unverified";
 if(state.condition==="worn")return state.reason==="defect"?"quality-review":"used-denied";
 if(state.timing==="older")return "late-denied";
 if(!verified){
  if(["tried","no-tags"].includes(state.condition)&&label)
   return "courtesy-credit";
  return "unverified";
 }
 if(state.condition==="no-tags")return "courtesy-credit";
 if(state.source==="gift")return "gift-credit";
 if(state.intent==="exchange")return "exchange-approved";
 if(state.intent==="store-credit")return "standard-credit";
 return "refund-approved";
}
function policyDecision(state){
 const outcome=assess(state);
 if(outcome==="courtesy-credit"&&state.verification==="receipt-check"){
  return {outcome,
   en:"I verified the receipt, but the clothing doesn't meet our usual return conditions because its tags were removed. As a one-time courtesy, I can offer store credit instead of a cash refund.",
   ne:"रसिद पुष्टि भयो, तर ट्याग हटेकाले सामान सामान्य फिर्ता नियममा पर्दैन। एकपटकको सौजन्यस्वरूप नगद फिर्ताको सट्टा स्टोर क्रेडिट दिन सक्छु।"};
 }
 const lines={
 "unverified":[
  "I'm sorry. I couldn't verify a purchase from this store, so I can't approve a refund, exchange, or store credit today. An item that looks like ours alone isn't enough. If you find a gift receipt, order confirmation, or other proof, we can review it again.",
  "माफ गर्नुहोस्। यो सामान यही पसलबाट किनिएको पुष्टि भएन। त्यसैले आज पैसा फिर्ता, साट्ने वा स्टोर क्रेडिट स्वीकृत गर्न सक्दिनँ। रसिद वा खरिद प्रमाण भेटे फेरि जाँच गर्न सकिन्छ।"],
 "used-denied":[
  "After checking the item and our return policy, I'm sorry—we can't accept this worn or used item as a normal return. I can't offer a refund or courtesy credit in this case.",
  "सामान र हाम्रो पसलको नियम जाँच्दा, प्रयोग भएको सामान सामान्य फिर्ता लिन मिल्दैन। त्यसैले पैसा फिर्ता वा सौजन्य स्टोर क्रेडिट दिन सकिँदैन।"],
 "late-denied":[
  "The purchase appears to be outside our return period. I'm sorry, so I can't approve a normal refund or exchange. We can explain how to request a separate review, but it isn't guaranteed.",
  "किनमेलको समय यो अभ्यास पसलको फिर्ता अवधि बाहिर परेको देखिन्छ। त्यसैले सामान्य पैसा फिर्ता वा साट्न स्वीकृति दिन मिल्दैन। थप जाँच माग्न सक्नुहुन्छ, तर ग्यारेन्टी छैन।"],
 "quality-review":[
  "This may be a defective item rather than a standard return. I can't approve a refund yet, but I can explain how we document the fault and request a quality or warranty review.",
  "यो सामान्य फिर्ताभन्दा सामानको त्रुटि हुन सक्छ। अहिले पैसा फिर्ता स्वीकृत गर्न सक्दिनँ, तर त्रुटि प्रमाणित गरी गुणस्तर वा वारेन्टी जाँच गर्न सकिन्छ।"],
 "courtesy-credit":[
  "I checked the label on this item. It matches merchandise we carry, but we still cannot verify the original transaction. As the manager, I'm willing to make a one-time courtesy exception: store credit, not a cash or card refund. This is a one-time exception, and it isn't part of our usual returns policy.",
  "सामानको विशेष लेबल जाँच्दा हामीले बेच्ने सामानसँग मिल्यो, तर मूल खरिद पुष्टि भएन। व्यवस्थापकको एकपटकको सौजन्य अपवादमा नगद फिर्ता होइन, स्टोर क्रेडिट दिन सक्छु। सबै पसलमा यस्तो सुविधा हुँदैन।"],
 "gift-credit":[
  "I've checked the gift receipt and the item. We can offer an exchange or store credit to the gift recipient, but not a cash refund to you. Would you like to use the credit?",
  "उपहार रसिद र सामान जाँचेँ। उपहार पाउनेलाई साट्ने वा स्टोर क्रेडिट दिन सकिन्छ, तर तपाईंलाई नगद फिर्ता होइन। स्टोर क्रेडिट लिनुहुन्छ?"],
 "exchange-approved":[
  "I checked the receipt and the clothing condition. It meets our exchange rules. We can exchange it for an available item; any price difference would need to be settled.",
  "यो अभ्यासमा रसिद र सामानको अवस्था जाँच्दा साट्ने नियम पूरा भएको छ। उपलब्ध सामानसँग साट्न सकिन्छ। मूल्य फरक भए हिसाब मिलाउनुपर्छ।"],
 "standard-credit":[
  "I checked the purchase and condition. The item qualifies under our return policy, and I can issue store credit instead of a refund. The credit can be used for future eligible purchases here.",
  "यस अभ्यासमा खरिद र सामानको अवस्था जाँच्दा योग्य छ। पैसा फिर्ताको सट्टा स्टोर क्रेडिट दिन सक्छु। पछि यही पसलमा सामान किन्न प्रयोग हुन्छ।"],
 "refund-approved":[
  "I've verified the purchase details and item condition. The return is eligible, so we can issue a refund to the original payment method, subject to its processing time.",
  "खरिद विवरण र सामानको अवस्था पुष्टि भयो। हाम्रो नियमअनुसार मूल भुक्तानी माध्यममा पैसा फिर्ता गर्न मिल्छ। रकम आउन केही समय लाग्न सक्छ।"]
 };
 return {outcome, en:lines[outcome][0],ne:lines[outcome][1]};
}
function outcomeOptions(state){
 const outcome=assess(state);
 const opts=(arr)=>arr.map(v=>opt(...v));
 if(["courtesy-credit","gift-credit","standard-credit"].includes(outcome)){
  const choices=[
   ["Could you explain how the store credit works?","स्टोर क्रेडिट कसरी चल्छ बुझाइदिनुहुन्छ?","creditExplain"],
   ["Yes, I'll accept the store credit.","हुन्छ, स्टोर क्रेडिट लिन्छु।","close",{outcome:"credit-accepted"}],
   ["I'd rather keep the item for now.","अहिले सामान आफूसँग राख्छु।","close",{outcome:"credit-declined"}]
  ];
  if(outcome==="gift-credit")
   choices.splice(2,0,["I'd prefer to exchange the gift instead.","बरु उपहारको सामान साट्न चाहन्छु।","close",{outcome:"exchange-requested"}]);
  return opts(choices);
 }
 if(outcome==="refund-approved")return opts([
  ["Yes, please refund the original payment method.","हुन्छ, पहिले तिरेको माध्यममै पैसा फिर्ता गर्नुहोस्।","close",{outcome:"refund-processed"}],
  ["How long can the refund take?","पैसा फिर्ता आउन कति समय लाग्छ?","refundExplain"],
  ["I prefer an exchange instead.","बरु सामान साट्न चाहन्छु।","close",{outcome:"exchange-requested"}]
 ]);
 if(outcome==="exchange-approved")return opts([
  ["Thank you. I'd like to exchange it.","धन्यवाद। सामान साट्न चाहन्छु।","close",{outcome:"exchange-requested"}],
  ["Could you explain how price differences work?","मूल्य फरक भए के हुन्छ?","exchangeExplain"],
  ["I'll think about it and return later.","यसमा सोचेर पछि आउँछु।","close",{outcome:"decide-later"}]
 ]);
 if(outcome==="quality-review")return opts([
  ["How can I request a quality inspection?","गुणस्तर जाँच कसरी माग्ने?","qualityExplain"],
  ["I'll bring photos or other evidence.","फोटो वा अरू प्रमाण ल्याउँछु।","close",{outcome:"return-with-proof"}],
  ["I understand. I'll decide later.","बुझेँ। पछि निर्णय गर्छु।","close",{outcome:"decide-later"}]
 ]);
 return opts([
  ["Could you explain why the return was declined?","फिर्ता किन अस्वीकार भयो बुझाइदिनुहुन्छ?","denialExplain"],
  ["I'll look for proof or ask about another review.","प्रमाण खोज्छु वा फेरि जाँच गराउँछु।","close",{outcome:"return-with-proof"}],
  ["I understand. I'll keep the item for now.","बुझेँ। अहिलेलाई सामान राख्छु।","close",{outcome:"declined"}]
 ]);
}
function step(id,state){
 const row=(npc,npcNe,options,speaker="Store assistant",emoji="🛍️")=>{
  if(options.length<2)throw Error("Each Coach story step needs responses");
  if(!['opening','item','intent','close'].includes(id)){
   options=[...options,opt("Thanks, I have enough information. I'll decide later.",
     "धन्यवाद, मलाई अहिलेको लागि जानकारी पुग्यो। पछि निर्णय गर्छु।","close",{outcome:"decide-later"})];
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
  opt("I need some help with clothing.","लुगाबारे मद्दत चाहिएको छ।","item"),
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
  opt("I'd like a refund if possible.","सम्भव भए पैसा फिर्ता चाहन्छु।","purchase",{intent:"refund"}),
  opt("I'd like to exchange it if possible.","सम्भव भए साट्न चाहन्छु।","purchase",{intent:"exchange"}),
  opt("I'm not sure yet. Could you explain my options?","अहिलेसम्म निश्चित छैन। विकल्पहरू बुझाइदिनुहुन्छ?","policy",{intent:"information"}),
  opt("I was only checking the policy. Thanks!","म नियम बुझ्न मात्र आएको थिएँ। धन्यवाद!","end",{intent:"keep"})]);
 case "policy":return row("Of course. Eligibility depends on the purchase date, proof of purchase and item condition. What would you like to do?",
  "अवश्य। फिर्ता मिल्ने कुरा मिति, प्रमाण र सामानको अवस्थामा भर पर्छ। तपाईं के गर्न चाहनुहुन्छ?",[
  opt("I'd like to see whether I can get my money back.","पैसा फिर्ता पाइन्छ कि बुझ्न चाहन्छु।",state.item?"purchase":"item",{intent:"refund"}),
  opt("Could we discuss exchange options?","साट्ने विकल्पबारे कुरा गर्न सक्छौँ?",state.item?"purchase":"item",{intent:"exchange"}),
  opt("Thanks. I'll decide later.","धन्यवाद। पछि निर्णय गर्छु।","end",{intent:"keep"})]);
 case "reason":{
  const gift=state.source==="gift";
  return row(gift?"I understand this was a gift. Why are you considering returning or exchanging it?":
    "Could you tell me why you'd like to return or exchange the clothing?",
    gift?"यो उपहार रहेछ। किन फिर्ता वा साट्ने सोच्नुभएको हो?":
    "यो लुगा किन फिर्ता वा साट्न चाहनुहुन्छ?",[
   opt("The size doesn't fit me.","साइज मलाई मिल्दैन।","condition",{reason:"size"}),
   opt("The clothing seems defective.","लुगा बिग्रिएको जस्तो छ।","condition",{reason:"defect"}),
   opt(gift?"It's not quite my style.":"I've changed my mind about keeping it.",
    gift?"यो मेरो शैलीसँग मेल खाँदैन।":"यो राख्ने मेरो मन बदलेँ।","condition",{reason:"mind"})
  ]);
 }
 case "condition":return row("Thanks. What condition is the clothing in?",
  "धन्यवाद। लुगाको अवस्था कस्तो छ?",[
  opt("I only tried it on at home, and the tags are attached.","घरमा लगाएर मात्र हेरेको हुँ, ट्याग अझै छन्।","receipt",{condition:"tried"}),
  opt("It has been worn or used outside.","बाहिर लगाएको वा प्रयोग गरेको छ।","receipt",{condition:"worn"}),
  opt("It hasn't been worn outside, but I removed the tags.","बाहिर लगाएको छैन, तर ट्याग हटाएँ।","receipt",{condition:"no-tags"})]);
 case "receipt":{
  if(state.source==="gift")return row("Because this was a gift, do you have a gift receipt or any purchase information?",
   "यो उपहार भएकोले उपहार रसिद वा खरिदको विवरण केही छ?",[
   opt("Yes, I have a gift receipt.","हो, मसँग उपहार रसिद छ।","timing",{receipt:"gift",giftProof:"receipt",evidence:"gift-receipt"}),
   opt("I could ask the person who gave it to me.","म उपहार दिने व्यक्तिलाई सोध्न सक्छु।","timing",{receipt:"missing",giftProof:"ask",evidence:"none"}),
   opt("No, I don't have proof, and I'd rather not contact them.","होइन, प्रमाण छैन र सम्पर्क पनि गर्न चाहन्नँ।","timing",{receipt:"missing",giftProof:"none",evidence:"none"})]);
  if(state.source==="unknown")return row("Do you have anything that might help identify where these clothes came from?",
   "यी लुगाहरू कहाँबाट आएका हुन् भन्ने पत्ता लगाउने कुनै विवरण छ?",[
   opt("I have a receipt, but I don't recognize the store.","रसिद छ, तर पसल चिन्न सकिनँ।","timing",{receipt:"paper"}),
   opt("I only have the tags or labels.","ट्याग वा लेबल मात्र छन्।","timing",{receipt:"missing",evidence:"labels"}),
   opt("No, I don't have any purchase information.","होइन, मसँग खरिद विवरण छैन।","timing",{receipt:"missing",evidence:"none"})]);
  if(state.source==="online")return row("Do you have an order number or confirmation for the online purchase?",
   "अनलाइन खरिदको अर्डर नम्बर वा पुष्टि छ?",[
   opt("Yes, I have an order number.","हो, अर्डर नम्बर छ।","timing",{receipt:"digital",onlineProof:"number"}),
   opt("I have the confirmation email.","पुष्टि इमेल छ।","timing",{receipt:"digital",onlineProof:"email"}),
   opt("No, I can't access the order details.","होइन, अर्डर विवरण खोल्न सक्दिनँ।","timing",{receipt:"missing",evidence:"none",onlineProof:"unavailable"})]);
  return row("Do you have a receipt or another proof of purchase?",
   "रसिद वा खरिद प्रमाण छ?",[
   opt("Yes, I have the paper receipt.","हो, कागजी रसिद छ।","timing",{receipt:"paper"}),
   opt("I have a digital receipt on my phone.","फोनमा डिजिटल रसिद छ।","timing",{receipt:"digital"}),
   opt("No, I can't find my receipt.","होइन, रसिद भेट्टाएको छैन।","evidence",{receipt:"missing"})]);
 }
 case "evidence":return row("If you don't have a receipt, we might need alternative evidence. Is anything available?",
  "रसिद छैन भने अर्को प्रमाण चाहिन सक्छ। केही उपलब्ध छ?",[
  opt("I can check my bank or card transactions.","बैंक वा कार्डको कारोबार जाँच्न सक्छु।",state.source?"timing":"purchase",{evidence:"bank"}),
  opt("I might have an order confirmation email.","अर्डर पुष्टि इमेल हुन सक्छ।",state.source?"timing":"purchase",{evidence:"email"}),
  opt("I don't have any proof right now.","अहिले कुनै प्रमाण छैन।",state.source?"timing":"purchase",{evidence:"none"})]);
 case "purchase":return row("Do you know how the clothing was obtained?",
  "लुगा कसरी प्राप्त भएको थियो थाहा छ?",[
  opt("I bought it at this store.","मैले यही पसलमा किनेको हुँ।","reason",{source:"store"}),
  opt("I ordered it online.","मैले अनलाइन अर्डर गरेको हुँ।","reason",{source:"online"}),
  opt("Someone gave it to me as a gift.","कसैले मलाई उपहार दिएको हो।","reason",{source:"gift"}),
  opt("I'm not sure where it originally came from.","यो कहाँबाट आएको हो थाहा छैन।","reason",{source:"unknown"})]);
 case "online":return row("For an online order, can you access the order confirmation?",
 "अनलाइन अर्डरको पुष्टि विवरण भेटाउन सक्नुहुन्छ?",[
 opt("Yes, I have an order number.","हो, अर्डर नम्बर छ।","timing",{onlineProof:"number",receipt:"digital"}),
 opt("I have an order confirmation email.","अर्डर पुष्टि इमेल छ।","timing",{onlineProof:"email",receipt:"digital"}),
 opt("No, I can't access the details.","होइन, विवरण खोल्न सक्दिनँ।","timing",{onlineProof:"unavailable"})]);
 case "gift":return row("Since this was a gift, do you have a gift receipt or any details from the person who gave it to you?",
 "यो उपहार भएकाले उपहार रसिद वा दिने व्यक्तिबाट केही विवरण छ?",[
 opt(state.evidence==="none"?"I found a gift receipt since we last spoke.":"Yes, I have a gift receipt.",
 state.evidence==="none"?"पछि उपहार रसिद भेट्टाएँ।":"हो, उपहार रसिद छ।","timing",
 {giftProof:"receipt",receipt:"gift",evidence:"gift-receipt"}),
 opt("I could ask the gift giver for more information.","उपहार दिने व्यक्तिलाई थप जानकारी सोध्न सक्छु।","timing",{giftProof:"ask"}),
 opt("I don't have details, and I don't want to contact them.","विवरण छैन र सम्पर्क पनि गर्न चाहन्नँ।","timing",{giftProof:"none",evidence:"none"})]);
 case "timing":{
 if(state.source==="gift")return row("Do you know when you received the gift? It's okay not to know when it was originally purchased.",
  "उपहार कहिले पाउनुभयो थाहा छ? सुरुमा कहिले किनिएको हो थाहा नभए पनि हुन्छ।",[
  opt("I received it yesterday, but I don't know when it was bought.","हिजो पाएको हुँ, तर कहिले किनिएको थाहा छैन।","review",{timing:"gift-yesterday"}),
  opt("I received it two weeks ago, but I don't know the purchase date.","दुई हप्ताअघि पाएको हुँ, तर किनिएको मिति थाहा छैन।","review",{timing:"gift-weeks"}),
  opt("I'm not sure when the gift was originally purchased.","उपहार कहिले किनिएको थियो थाहा छैन।","review",{timing:"unknown"})]);
 if(state.source==="online")return row("About when did you place the online order?",
 "अनलाइन अर्डर करिब कहिले गर्नुभएको थियो?",[
  opt("I placed the order yesterday.","हिजो अर्डर गरेँ।","review",{timing:"yesterday"}),
  opt("I placed it about two weeks ago.","करिब दुई हप्ताअघि अर्डर गरेँ।","review",{timing:"two-weeks"}),
  opt("I don't remember the order date.","अर्डर गरेको मिति याद छैन।","review",{timing:"unknown"})]);
 if(state.source==="unknown")return row("Do you have any idea when the clothing was originally obtained?",
 "लुगा सुरुमा कहिले ल्याइएको थियो केही थाहा छ?",[
  opt("It may have been obtained recently, but I'm not sure.","हालै प्राप्त भएको हुन सक्छ, तर पक्का छैन।","review",{timing:"unknown"}),
  opt("I received it a few weeks ago.","केही हप्ताअघि पाएको हुँ।","review",{timing:"two-weeks"}),
  opt("I don't know the date at all.","मिति पटक्कै थाहा छैन।","review",{timing:"unknown"})]);
 return row("About when did you buy the clothing? The date may affect the options.",
 "लुगा करिब कहिले किन्नुभएको थियो? मितिले उपलब्ध विकल्पमा असर पर्छ।",[
  opt("I bought it yesterday.","हिजो किनेको हुँ।","review",{timing:"yesterday"}),
  opt("I bought it about two weeks ago.","करिब दुई हप्ताअघि किनेको हुँ।","review",{timing:"two-weeks"}),
  opt("I bought it a few months ago.","केही महिनाअघि किनेको हुँ।","review",{timing:"older"}),
  opt("I don't remember exactly when I bought it.","किनेको ठ्याक्कै याद छैन।","review",{timing:"unknown"})]);
 }
 case "review":{
  const flags=[];
  const hasProof=["paper","digital","gift"].includes(state.receipt)||
    state.giftProof==="receipt"||state.evidence==="gift-receipt";
  if(!hasProof)flags.push("proof of purchase has not yet been confirmed");
  if(state.evidence==="bank"||state.evidence==="email")
    flags.push("you may be able to locate additional evidence");
  if(state.condition==="worn")flags.push("the clothing has been worn or used");
  if(state.condition==="no-tags")flags.push("the tags were removed");
  if(state.timing==="older")flags.push("the return period may have passed");
  if(state.source==="gift"){
   flags.push("this was a gift");
   if(state.giftProof==="none")flags.push("you prefer not to contact the giver");
   if(["unknown","gift-yesterday","gift-weeks"].includes(state.timing))
    flags.push("the original purchase date is unknown");
  }else if(state.timing==="unknown")flags.push("the purchase date is unknown");
  const summary=flags.length?"From what you've told me, "+flags.join("; ")+". ":"Thanks for the details. ";
  return row(summary+"We must review the store's policy before promising a refund, exchange, or store credit. Would you like a manager to check?",
   "तपाईंको अवस्थाअनुसार पसलको नियम जाँच्नुपर्छ। पैसा फिर्ता वा साट्ने पक्का छैन। व्यवस्थापकसँग जाँच गराउने?",[
   opt("Yes, please ask a manager to review this.","हो, व्यवस्थापकलाई जाँच्न भन्नुहोस्।","manager",{managerRequested:true}),
   opt("Could you explain any other options first?","पहिले अन्य विकल्प बुझाइदिनुहुन्छ?","alternatives"),
   opt("Could I see the return policy in writing?","फिर्ताको नियम लिखित रूपमा देखाउनुहुन्छ?","written")]);
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
 if(state.receipt==="missing"&&state.evidence!=="gift-receipt")
   flags.push("no confirmed proof of purchase yet");
 if(state.condition==="worn")flags.push("worn or used clothing");
 if(state.condition==="no-tags")flags.push("removed tags");
 if(state.timing==="older")flags.push("an older purchase");
 if(state.source==="gift")flags.push("an item received as a gift");
 const description=flags.length?" I understand this involves "+flags.join(", ")+".":" I understand you'd like a return reviewed.";
 return row("Hello, I'm the store manager."+description+" I can review the policy, but I can't promise an exception. What would you like me to check?",
 "नमस्ते, म पसलको व्यवस्थापक हुँ। नियम जाँच्न सक्छु, तर अपवाद पक्का छैन। के जाँच गरौँ?",[
 opt("Could you check whether a refund is possible?","पैसा फिर्ता हुन सक्छ कि जाँच गर्नुहुन्छ?","managerReview",{intent:"refund"}),
 opt("Could you check whether an exchange is possible?","साट्न मिल्छ कि जाँच गर्नुहुन्छ?","managerReview",{intent:"exchange"}),
 opt("Could store credit be an option?","स्टोर क्रेडिट सम्भव छ कि?","managerReview",{intent:"store-credit"})
 ],"Store manager","👩‍💼");
 }
 case "managerReview":{
  const hasReceipt=["paper","digital","gift"].includes(state.receipt)||state.giftProof==="receipt";
  if(hasReceipt)return row("Let's check the receipt and look at the item's condition. May I check the details?",
    "हाम्रो पसलको नियमअनुसार रसिद र सामानको अवस्था जाँचौँ। विवरण जाँच गर्न दिनुहुन्छ?",[
    opt("Yes, please check the receipt and the clothing.","हुन्छ, रसिद र लुगा जाँचिदिनुहोस्।","decision",{verification:"receipt-check"}),
    opt("I'd like to bring more information before a decision.","निर्णयअघि थप विवरण ल्याउन चाहन्छु।","decision",{verification:"no-confirmation"}),
    opt("I'd rather keep the item and decide later.","अहिले सामान राखेर पछि निर्णय गर्छु।","close",{outcome:"decide-later"})
   ],"Store manager","👩‍💼");
  return row("I haven't been able to verify a purchase from this store. I can check an internal store-specific product label, if there is one, but a matching style alone does not prove a purchase. Can I examine the label?",
   "यो पसलबाट किनेको प्रमाण भेटिएन। पसलको विशेष उत्पादन लेबल भए जाँच्न सक्छु। मिल्दोजुल्दो सामान मात्र देखेर खरिद पुष्टि हुँदैन। लेबल हेर्न सक्छु?",[
   opt("Yes, this has your store's identifying barcode. Please check it.","हुन्छ, तपाईंको पसलको विशेष बारकोड छ। जाँच्नुहोस्।","decision",{verification:"label-match"}),
   opt("It has a label from another store, not yours.","यसमा तपाईंको होइन, अर्को पसलको लेबल छ।","decision",{verification:"no-match"}),
   opt("I can't provide a receipt or a store-identifying label.","रसिद वा पसल चिनिने लेबल केही पनि दिन सक्दिनँ।","decision",{verification:"no-proof"}),
   opt("I'd rather look for purchase information and come back.","खरिद विवरण खोजेर पछि आउँछु।","close",{outcome:"return-with-proof"})
  ],"Store manager","👩‍💼");
 }
 case "decision":{
  const result=policyDecision(state);
  return row(result.en,result.ne,outcomeOptions(state),"Store manager","👩‍💼");
 }
 case "creditExplain":return row("Store credit is value we put on a store card for future eligible purchases here; it is not a cash refund. You can usually use it until the balance is spent. Expiry dates, restrictions and lost-card rules depend on the specific store, so I'd show you the written terms before issuing it. Would you like to accept this offer?",
  "स्टोर क्रेडिट भनेको पछि यही पसलमा सामान किन्न प्रयोग हुने कार्डको रकम हो, नगद फिर्ता होइन। बाँकी रकम पुनः प्रयोग गर्न सकिन्छ। म्याद, सर्त र कार्ड हराएमा लाग्ने नियम लिखित रूपमा बुझ्नुपर्छ। लिन चाहनुहुन्छ?",[
  opt("Yes, I'll take the store credit. Thank you.","हुन्छ, स्टोर क्रेडिट लिन्छु। धन्यवाद।","close",{outcome:"credit-accepted"}),
  opt("No, I don't want store credit.","होइन, स्टोर क्रेडिट चाहिँदैन।","close",{outcome:"credit-declined"}),
  opt("Could I see the written store-credit terms first?","पहिले स्टोर क्रेडिटका लिखित सर्त हेर्न सक्छु?","close",{outcome:"credit-terms"})
 ],"Store manager","👩‍💼");
 case "refundExplain":return row("Approved refunds go back to the original payment method. The bank or card provider controls how long it takes to appear, and we cannot promise a specific number of days. Would you like to proceed?",
  "स्वीकृत रकम पहिले तिरेको माध्यममै फर्किन्छ। बैंक वा कार्ड कम्पनीअनुसार समय लाग्छ, ठ्याक्कै कति दिन भन्ने वाचा गर्न सकिँदैन। अघि बढ्ने?",[
  opt("Yes, please proceed with the refund.","हुन्छ, पैसा फिर्ता अघि बढाउनुहोस्।","close",{outcome:"refund-processed"}),
  opt("I'd like an exchange instead.","बरु सामान साट्न चाहन्छु।","close",{outcome:"exchange-requested"}),
  opt("I'll decide later. Thank you.","पछि निर्णय गर्छु। धन्यवाद।","close",{outcome:"decide-later"})
 ],"Store manager","👩‍💼");
 case "exchangeExplain":return row("For an exchange, we would inspect the item and check stock. If the replacement costs more, you may need to pay the difference; if it costs less, any balance depends on the store's written policy. Would you like to continue?",
  "साट्दा सामान जाँचेर अर्को सामान उपलब्ध छ कि हेर्छौँ। नयाँ सामान महँगो भए फरक पैसा तिर्नुपर्ने हुन सक्छ; सस्तो भए बाँकी रकमबारे पसलको लिखित नियम लाग्छ। अघि बढ्ने?",[
  opt("Yes, I'd like to exchange it.","हुन्छ, सामान साट्न चाहन्छु।","close",{outcome:"exchange-requested"}),
  opt("I'll check the options and decide later.","विकल्प हेरेर पछि निर्णय गर्छु।","close",{outcome:"decide-later"})
 ],"Store manager","👩‍💼");
 case "qualityExplain":return row("For a possible defect, we would document the problem, check any warranty or consumer-rights process and explain the review steps. That is separate from a standard change-of-mind return, and no refund is guaranteed. Would you like to request that review?",
 "सम्भावित त्रुटिका लागि समस्या टिपेर वारेन्टी वा उपभोक्ता अधिकारअनुसार जाँच गर्छौँ। यो सामान्य मन बदलिएको फिर्ताभन्दा फरक प्रक्रिया हो, पैसा फिर्ताको ग्यारेन्टी छैन। जाँच माग्ने?",[
  opt("Yes, please tell me how to submit the item for inspection.","जाँचका लागि सामान कसरी बुझाउने बताइदिनुहोस्।","close",{outcome:"quality-request"}),
  opt("I'll gather pictures and purchase information first.","पहिले फोटो र खरिद विवरण जुटाउँछु।","close",{outcome:"return-with-proof"})
 ],"Store manager","👩‍💼");
 case "denialExplain":{
   const result=policyDecision(state);
   return row(result.en+" If you locate new evidence, we can reconsider what our return policy permits. I can also explain the written return rules.",
    result.ne+" नयाँ प्रमाण भेटिए हाम्रो नियमअनुसार फेरि जाँच्न सकिन्छ। लिखित फिर्ता नियम पनि बुझाउन सक्छु।",[
    opt("I understand. I'll look for proof and return if I find it.","बुझेँ। प्रमाण भेटे फेरि आउँछु।","close",{outcome:"return-with-proof"}),
    opt("Could I get the policy in writing?","नियम लिखित रूपमा पाउँछु?","close",{outcome:"written"}),
    opt("Thanks. I'll keep the clothing for now.","धन्यवाद। अहिलेलाई लुगा राख्छु।","close",{outcome:"declined"})
   ],"Store manager","👩‍💼");
 }
 case "close":{
  const decision=policyDecision(state),status=decision.outcome,action=state.outcome;
  let en,ne;
  if(action==="credit-accepted"&&["courtesy-credit","gift-credit","standard-credit"].includes(status)){
   en="We've agreed on store credit instead of a cash refund. We'd issue it on a store card for future eligible purchases at this store. Keep the card safe and check the written balance, expiry and use rules. Thank you for working through the options with me.";
   ne="नगदको सट्टा स्टोर क्रेडिटमा सहमति भयो। यही पसलमा पछि सामान किन्न कार्ड दिन्छौँ। कार्ड सुरक्षित राख्नुहोस् र बाँकी रकम, म्याद तथा प्रयोगका नियम जाँच्नुहोस्। धन्यवाद।";
  }else if(action==="refund-processed"&&status==="refund-approved"){
   en="Your return meets our store's return policy. We can start the refund back to the original payment method; the actual bank posting time may vary. Here's your return confirmation. Thank you for coming in.";
   ne="हाम्रो पसलको नियमअनुसार फिर्ता मिल्छ। सुरुमा तिरेको माध्यममा पैसा फिर्ताको प्रक्रिया सुरु गर्न सकिन्छ; बैंकमा देखिन समय फरक हुन सक्छ। यो तपाईंको फिर्ताको पुष्टि हो। धन्यवाद।";
  }else if(action==="exchange-requested"&&["exchange-approved","refund-approved","gift-credit"].includes(status)){
   en="Your item qualifies for an exchange under our policy. We'll check stock and settle any price difference before completing it. If the replacement isn't available, we'd discuss the next allowed option. Thanks for coming in.";
   ne="हाम्रो नियमअनुसार साट्न मिल्छ। अर्को सामान छ कि जाँचेर मूल्य फरक भए हिसाब मिलाउँछौँ। नभए अर्को मिल्ने विकल्पबारे छलफल गर्छौँ। धन्यवाद।";
  }else if(action==="credit-declined"||action==="credit-terms"){
   en=action==="credit-terms"?"Of course. Please read the written store-credit conditions before accepting anything. We have not issued a credit yet; you can decide after reviewing the terms.":"I understand. You don't have to accept the courtesy credit. We haven't processed any refund or credit; you can keep the item and decide later.";
   ne=action==="credit-terms"?"अवश्य। स्टोर क्रेडिट लिनुअघि लिखित सर्त पढ्नुहोस्। अहिले कुनै क्रेडिट जारी भएको छैन। पढेर निर्णय गर्न सक्नुहुन्छ।":"बुझेँ। सौजन्य क्रेडिट लिनैपर्छ भन्ने छैन। कुनै रकम वा क्रेडिट प्रक्रिया गरिएको छैन। पछि निर्णय गर्न सक्नुहुन्छ।";
  }else if(action==="quality-request"&&status==="quality-review"){
   en="We haven't approved a refund. The next step is a documented defect inspection, with any decision made under the relevant warranty or consumer-rights process. Please bring the item and whatever supporting details you have.";
   ne="अहिले पैसा फिर्ता स्वीकृत भएको छैन। अर्को कदम त्रुटिको जाँच हो। वारेन्टी वा उपभोक्ता अधिकारको नियमअनुसार निर्णय हुनेछ। सामान र भएका प्रमाण ल्याउनुहोस्।";
  }else if(action==="return-with-proof"||action==="written"){
   en=decision.en+" We haven't approved any refund or credit today. You're welcome to bring purchase evidence or ask for a copy of the relevant policy, and we can review the request again.";
   ne=decision.ne+" आज कुनै पैसा फिर्ता वा क्रेडिट स्वीकृत भएको छैन। खरिद प्रमाण ल्याउन वा लिखित नियम माग्न सक्नुहुन्छ। फेरि जाँच गर्नेछौँ।";
  }else if(action==="decide-later"){
   en="Understood. We haven't processed a return or issued credit. Keep the item and any receipt or labels safe while you decide, and remember that time limits may apply.";
   ne="बुझेँ। कुनै सामान फिर्ता वा क्रेडिट जारी गरिएको छैन। निर्णय नगर्दासम्म सामान, रसिद वा लेबल सुरक्षित राख्नुहोस्। समयसीमा हुन सक्छ।";
  }else if(["courtesy-credit","gift-credit","standard-credit"].includes(status)){
   en="We discussed a possible store-credit option, but nothing has been issued yet. You can review the terms and decide whether to accept. Thank you for visiting.";
   ne="स्टोर क्रेडिटको विकल्पबारे कुरा भयो, तर अहिले केही जारी गरिएको छैन। लिखित सर्त पढेर स्वीकार गर्ने कि नगर्ने निर्णय गर्न सक्नुहुन्छ। धन्यवाद।";
  }else if(["refund-approved","exchange-approved"].includes(status)){
   en="The item appears eligible under our policy, but we haven't processed a refund or exchange yet. You can return to complete it after deciding. Thank you.";
   ne="हाम्रो नियमअनुसार सामान योग्य देखिन्छ, तर अहिले पैसा फिर्ता वा साट्ने प्रक्रिया गरिएको छैन। निर्णय गरेपछि फेरि आउन सक्नुहुन्छ। धन्यवाद।";
  }else{
   en=decision.en+" I'm sorry we couldn't resolve the return the way you hoped today. If new proof becomes available, the store can review it again. Thank you for visiting.";
   ne=decision.ne+" आज चाहेजस्तो समाधान नहुँदा माफ गर्नुहोस्। नयाँ प्रमाण भेटिए फेरि जाँच गर्न सकिन्छ। आउनुभएकोमा धन्यवाद।";
  }
  return row(en,ne,[
   opt("I understand. Thank you for explaining.","बुझेँ। स्पष्ट बुझाइदिनुभएकोमा धन्यवाद।","end"),
   opt("Thanks. I'll follow up if I need to.","धन्यवाद। आवश्यक भए फेरि सम्पर्क गर्नेछु।","end"),
   opt("Have a good day. Goodbye!","तपाईंको दिन राम्रो होस्। बिदा!","end")
  ],"Store manager","👩‍💼");
 }
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
 const patch=item.patch||{};
 if(patch.source&&active.storeState.source!==patch.source){
  for(const key of ["receipt","evidence","giftProof","onlineProof","timing"])
   delete active.storeState[key];
 }
 if(patch.receipt&&patch.receipt!=="missing"&&patch.evidence===undefined)
  delete active.storeState.evidence;
 Object.assign(active.storeState,patch);
 active.storeCompleted=item.next==="end";
 if(!active.storeCompleted){
  const next=step(item.next,active.storeState);
  active.steps.push(next);
  active.steps[index].after=next.npc;
 }
 return {finished:active.storeCompleted,turns:active.steps.length};
}
function reconcile(active,index,pendingChoice){
 if(!active?.isBranchingStore||!Array.isArray(active.steps))return false;
 const old=active.steps[index];
 if(!old?.nodeId)return false;
 try{
   const updated=step(old.nodeId,active.storeState||{});
   // For an already selected reply, fix the manager's wording without
   // replacing the options tied to the student's saved selection.
   active.steps[index]=pendingChoice?{...old,npc:updated.npc,npcNe:updated.npcNe,
    speaker:updated.speaker,speakerEmoji:updated.speakerEmoji}:{...old,...updated};
   return true;
 }catch(_){return false}
}
function options(stepObj){
 if(!stepObj?.storeOptions)return null;
 return {multi:true,branching:true,options:stepObj.storeOptions.map(v=>({...v}))};
}
const api=Object.freeze({start,choose,options,step,reconcile});
if(typeof window!=="undefined")window.sikauStoreStory=api;
})();
