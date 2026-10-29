/* English Sikau — context-preserving follow-ups for the 147 expanded topics.
 * A chosen detail stays active until the learner explicitly changes it.
 * All transitions are deterministic; no outside services or payments are called.
 */
(function () {
  'use strict';
  const option=(value,ne,next,patch={})=>({value,ne,next,patch,correct:true});
  const plans={
    Shopping:{
      ask:["Before you decide, what would be most helpful?","निर्णय गर्नुअघि के मद्दत चाहिन्छ?"],
      options:[
        ["Could you check which suitable options are available?","मिल्ने विकल्प उपलब्ध छन् कि हेर्नुहुन्छ?","available",
          "I'll check which options fit your request rather than promise something we don't have.","तपाईंको अनुरोध मिल्ने विकल्प छन् कि जाँच्नेछु; नभएको सामानको वाचा गर्दिनँ।"],
        ["Could you explain the price and any conditions?","मूल्य र सर्त बुझाउनुहुन्छ?","terms",
          "Let's check the price and any applicable conditions before you make a decision.","निर्णय गर्नुअघि मूल्य र लागू हुने सर्त जाँचौँ।"],
        ["Could I compare another suitable choice?","अर्को मिल्ने विकल्पसँग तुलना गर्न सक्छु?","compare",
          "Of course. We'll compare the features and conditions before you choose.","पक्कै। छान्नुअघि विशेषता र सर्त तुलना गरौँ।"]
      ]},
    "Food & Drink":{
      ask:["What would you like to confirm before making a food decision?","खाना छान्नुअघि के पुष्टि गर्न चाहनुहुन्छ?"],
      options:[
        ["What menu items or alternatives are available?","मेनुमा के वा कुन विकल्प उपलब्ध छन्?","available",
          "Let's look at the available dishes before you settle on one.","एउटा छान्नुअघि उपलब्ध खानाहरू हेरौँ।"],
        ["Could you check the ingredients and special requests?","सामग्री र विशेष अनुरोध जाँच्नुहुन्छ?","ingredients",
          "I'll ask about the ingredients and special requests before we confirm an order.","अर्डर पक्का गर्नुअघि सामग्री र विशेष अनुरोध सोध्छु।"],
        ["How much would it cost, and how long would it take?","कति मूल्य र कति समय लाग्छ?","price",
          "Let's confirm the total and preparation time before ordering.","अर्डरअघि जम्मा मूल्य र तयार हुने समय पुष्टि गरौँ।"]
      ]},
    Travel:{
      ask:["Which travel detail should we work out first?","यात्राको कुन विवरण पहिले बुझौँ?"],
      options:[
        ["Could we check the route and departure time?","बाटो र प्रस्थान समय जाँचौँ?","route",
          "We'll compare the available route and schedule for your journey.","तपाईंको यात्राको बाटो र समयतालिका तुलना गरौँ।"],
        ["What fare and travel conditions should I expect?","भाडा र यात्राका सर्त के हुन्?","fare",
          "Let's check the fare, documents and any applicable restrictions.","भाडा, कागजात र लागू हुने सर्त जाँचौँ।"],
        ["Is there another way or time I could travel?","अर्को बाटो वा समयमा यात्रा गर्न सक्छु?","alternative",
          "We can check another route or departure instead of assuming it is available.","उपलब्ध छ भनेर अनुमान नगरी अर्को बाटो वा समय जाँचौँ।"]
      ]},
    Healthcare:{
      ask:["What would you like the clinic to help you with next?","क्लिनिकबाट अब कुन मद्दत चाहनुहुन्छ?"],
      options:[
        ["Can we check the appropriate appointment or department?","उपयुक्त भेट्ने समय वा विभाग जाँचौँ?","appointment",
          "Reception can check the visit type and available appointment options.","रिसेप्सनले भेटको प्रकार र उपलब्ध समय जाँच्न सक्छ।"],
        ["What documents or information do I need?","कुन कागजात वा जानकारी चाहिन्छ?","documents",
          "We can confirm the paperwork and check-in requirements.","कागजात र दर्ताको आवश्यकता पुष्टि गर्न सक्छौँ।"],
        ["Could I speak with a qualified clinician about that?","यसबारे योग्य स्वास्थ्यकर्मीसँग कुरा गर्न सक्छु?","clinician",
          "Of course. A qualified clinician can address personal symptoms and treatment questions.","अवश्य। व्यक्तिगत लक्षण र उपचारका प्रश्न योग्य स्वास्थ्यकर्मीलाई सोध्नुपर्छ।"]
      ]},
    Work:{
      ask:["What would help resolve this workplace situation?","कामको यो अवस्था समाधान गर्न के चाहिन्छ?"],
      options:[
        ["Could we clarify what I'm expected to do?","मबाट के अपेक्षा छ स्पष्ट गर्न सक्छौँ?","instructions",
          "Let's confirm the task and expectations before changing anything.","केही बदल्नुअघि काम र अपेक्षा पुष्टि गरौँ।"],
        ["Can we check the schedule or available support?","तालिका वा उपलब्ध मद्दत जाँचौँ?","schedule",
          "I'll review the schedule or available support with the right person.","सही व्यक्तिसँग तालिका वा मद्दत जाँच्नेछु।"],
        ["Should I discuss this with a supervisor?","यो विषय व्यवस्थापकसँग कुरा गर्नुपर्छ?","supervisor",
          "If approval is needed, we can raise this with your supervisor.","स्वीकृति चाहिन्छ भने व्यवस्थापकसँग कुरा गर्न सक्छौँ।"]
      ]},
    Services:{
      ask:["Which service detail do you want to confirm?","सेवाको कुन विवरण पुष्टि गर्न चाहनुहुन्छ?"],
      options:[
        ["What information do you need from me?","मबाट कुन जानकारी चाहिन्छ?","requirements",
          "I'll explain the information required to handle your request.","अनुरोधका लागि चाहिने जानकारी बुझाउँछु।"],
        ["Could you explain the likely fees and timing?","शुल्क र समय बताउनुहुन्छ?","charges",
          "Let's check the estimate and timing before arranging anything.","केही मिलाउनुअघि खर्च अनुमान र समय जाँचौँ।"],
        ["Is there a different way to handle my request?","अनुरोध पूरा गर्ने अर्को तरिका छ?","alternative",
          "We can discuss another suitable service or arrangement.","अर्को मिल्ने सेवा वा व्यवस्था छलफल गर्न सक्छौँ।"]
      ]},
    Everyday:{
      ask:["How would you like to continue our conversation?","हाम्रो कुरा कसरी अघि बढाऔँ?"],
      options:[
        ["Could you tell me more about your experience?","तपाईंको अनुभवबारे थप बताउनुहुन्छ?","experience",
          "Of course. I can tell you more, and I'd like to hear your thoughts too.","अवश्य। थप बताउँछु, तपाईंको विचार पनि सुन्न चाहन्छु।"],
        ["What do you think would be a good idea?","तपाईंको विचारमा राम्रो उपाय के होला?","ideas",
          "Let's share a few ideas and see which one appeals to us.","केही विचार बाँडेर कुन राम्रो लाग्छ हेरौँ।"],
        ["Would you like to make a plan together?","सँगै योजना बनाउने हो?","plan",
          "That sounds nice. Let's talk about what might work for both of us.","राम्रो लाग्यो। हामी दुवैलाई के मिल्छ कुरा गरौँ।"]
      ]},
    Family:{
      ask:["How should we handle this together?","यो विषय सँगै कसरी मिलाऔँ?"],
      options:[
        ["Can we hear what everyone prefers?","सबैको रुचि बुझ्न सक्छौँ?","preferences",
          "Yes. Let's ask everyone what works for them before deciding.","हुन्छ। निर्णयअघि सबैलाई के मिल्छ सोधौँ।"],
        ["Could we talk about a suitable time or plan?","मिल्ने समय वा योजनाबारे कुरा गरौँ?","timing",
          "Let's compare our schedules and find a practical plan.","हाम्रो समय मिलाएर व्यवहारिक योजना बनाऔँ।"],
        ["What if someone needs a different arrangement?","कसैलाई फरक व्यवस्था चाहिए के गर्ने?","alternative",
          "Then we can discuss an alternative that respects their needs.","त्यसो भए उनीहरूको आवश्यकता मिल्ने अर्को व्यवस्था छलफल गरौँ।"]
      ]},
    Home:{
      ask:["What would you like to sort out about this home issue?","घरको यो विषयमा के मिलाउन चाहनुहुन्छ?"],
      options:[
        ["Could we check what needs to be done first?","पहिले के गर्नुपर्छ जाँचौँ?","problem",
          "Let's establish the exact issue and the safe next step.","समस्या पहिचान गरेर सुरक्षित अर्को कदम तय गरौँ।"],
        ["Can I get an estimate and a possible time?","खर्च अनुमान र सम्भावित समय पाउन सक्छु?","estimate",
          "I'll explain how to request an estimate and arrange a time.","खर्च अनुमान माग्ने र समय मिलाउने तरिका बुझाउँछु।"],
        ["Is there another practical solution?","अर्को व्यवहारिक उपाय छ?","alternative",
          "Let's compare the options before choosing an approach.","तरिका छान्नुअघि विकल्प तुलना गरौँ।"]
      ]},
    Education:{
      ask:["What would help you understand this best?","यो बुझ्न कुन मद्दत चाहिन्छ?"],
      options:[
        ["Could you show me a relevant example?","सम्बन्धित उदाहरण देखाउनुहुन्छ?","example",
          "Let's work through one example related to your question.","तपाईंको प्रश्नसँग मिल्ने एउटा उदाहरण हेरौँ।"],
        ["What are the requirements or instructions?","आवश्यकता वा निर्देशन के हुन्?","instructions",
          "We'll review the instructions and any deadlines carefully.","निर्देशन र म्याद ध्यान दिएर हेरौँ।"],
        ["How should I practice or prepare next?","अब कसरी अभ्यास वा तयारी गर्ने?","practice",
          "We can choose a manageable next exercise or preparation step.","गर्न सकिने अर्को अभ्यास वा तयारी छानौँ।"]
      ]},
    Technology:{
      ask:["What should we check before changing anything?","केही बदल्नुअघि के जाँच्नुपर्छ?"],
      options:[
        ["Can we check the device or connection first?","पहिले उपकरण वा नेटवर्क जाँचौँ?","device",
          "Let's start with a safe device or connection check.","पहिले उपकरण वा नेटवर्क सुरक्षित तरिकाले जाँचौँ।"],
        ["Could you explain what the warning means?","चेतावनीको अर्थ बुझाउनुहुन्छ?","warning",
          "We can review the message and official instructions without sharing private codes.","निजी कोड नदिई सन्देश र आधिकारिक निर्देशन हेरौँ।"],
        ["What if the first solution doesn't work?","पहिलो उपायले काम गरेन भने के गर्ने?","fallback",
          "Then we can try another safe step or contact official support.","त्यसो भए अर्को सुरक्षित उपाय वा आधिकारिक सहयोग लिन सक्छौँ।"]
      ]},
    Money:{
      ask:["What would you like to verify before a financial decision?","वित्तीय निर्णयअघि के पुष्टि गर्न चाहनुहुन्छ?"],
      options:[
        ["Can you explain the fees and amount?","शुल्क र रकम बुझाउनुहुन्छ?","fees",
          "We can review the amount, any fees and applicable limits.","रकम, शुल्क र लागू हुने सीमा जाँचौँ।"],
        ["Which documents or verification do I need?","कुन कागजात वा प्रमाणीकरण चाहिन्छ?","verification",
          "Let's check the official identification and verification process.","आधिकारिक पहिचान र प्रमाणीकरण प्रक्रिया जाँचौँ।"],
        ["Could I review the details before I agree?","सहमत हुनुअघि विवरण जाँच्न सक्छु?","review",
          "Certainly. Check the details carefully before authorizing anything.","अवश्य। स्वीकृति दिनुअघि विवरण ध्यान दिएर जाँच्नुहोस्।"]
      ]},
    Community:{
      ask:["What should we check about this community activity?","यो सामुदायिक कामको के जाँचौँ?"],
      options:[
        ["When and where does it take place?","यो कहिले र कहाँ हुन्छ?","schedule",
          "We can check the organizer's current schedule and location.","आयोजकको हालको समय र ठाउँ जाँच्न सक्छौँ।"],
        ["Are there any registration requirements?","दर्ताका सर्त छन्?","registration",
          "Let's look at the registration rules and who can join.","दर्ता नियम र सहभागी हुन पाउने अवस्था हेरौँ।"],
        ["What activities or alternatives are there?","कस्ता गतिविधि वा विकल्प छन्?","activities",
          "We can ask about the available activities before you decide.","निर्णयअघि उपलब्ध गतिविधिबारे सोधौँ।"]
      ]}
  };
  function build(node,state,config){
    const topic=window.sikauMoreTopics?.find(t=>t.id===state.scene);
    if(!topic||!['review','proposal','alternative','requirements','verify','action','confirmation','closing'].includes(node))return null;
    const path=config[1][state.path]||config[1][0],detailIndex=Number.isInteger(state.detail)?state.detail:0;
    const selected=path[4][detailIndex]||path[4][0];
    const nextIndex=(detailIndex+1)%path[4].length,alternative=path[4][nextIndex];
    const plan=plans[topic.category]||plans.Everyday;
    const guide=window.sikauCoachGuidance?.get(state.scene,config,state.path,detailIndex);
    const rows=window.sikauNewTopicRows?.find(row=>row[0]===state.scene);
    const focus=rows?.[7]?.split(';')?.[state.path]||path[0];
    const focusNe=rows?.[8]?.split(';')?.[state.path]||path[1];
    const chosen=selected[0].replace(/[.!?]+$/,'');
    const q=v=>'"'+v+'"';
    const make=(id,en,ne,choices)=>{
      if(!en||!ne||!Array.isArray(choices)||choices.length<2||
        choices.some(c=>!c.value||!c.ne||!c.next))throw Error('Invalid Coach conversation '+state.scene+':'+id);
      return {nodeId:id,npc:en,npcNe:ne,storeOptions:choices,answer:choices[0].value,
        answerNe:choices[0].ne,speaker:null,
        goal:"Choose a response that fits your situation · अवस्थाअनुसार उत्तर छान्नुहोस्"};
    };
    if(node==='review')return make(node,
      guide.message+" Would you like to ask a follow-up, consider a different option, or continue with your request?",
      guide.messageNe+" थप प्रश्न, अर्को विकल्प वा आफ्नो अनुरोध अघि बढाउन चाहनुहुन्छ?",[
        option("Could you explain that a little more?","त्यो अलि थप बुझाउनुहुन्छ?","proposal",{}),
        option("Could we discuss "+alternative[0].replace(/[.!?]+$/,'').toLowerCase()+" instead?","बरु "+alternative[1]+" बारे कुरा गरौँ?","alternative",{}),
        option("I'd like to work out the next step, please.","अबको कदम बुझ्न चाहन्छु।","verify",{}),
        option("Thanks, that's all I needed for now.","धन्यवाद, अहिलेलाई यति नै चाहिएको थियो।","closing",{})
      ]);
    if(node==='proposal')return make(node,
      (guide.question[2]||path[5])+" Is there anything you would like to check before continuing with "+focus+"?",
      (guide.question[3]||path[6])+" "+focusNe+" बारे अघि बढ्नुअघि अरू केही जाँच्न चाहनुहुन्छ?",[
        option("Yes, are there any important conditions I should know?","हो, जान्नुपर्ने महत्त्वपूर्ण सर्त छन्?","requirements",{}),
        option("What if that doesn't suit my situation?","त्यो मेरो अवस्थामा नमिले के गर्ने?","alternative",{}),
        option("That makes sense. Could we continue?","बुझेँ। अघि बढ्न सक्छौँ?","verify",{}),
        option("Thank you. I'd like to think about it.","धन्यवाद। म यसबारे सोच्न चाहन्छु।","closing",{})
      ]);
    if(node==='alternative')return make(node,
      "Certainly. Another possibility is "+q(alternative[0])+". Would you prefer to explore that or stay with your original request?",
      "अवश्य। अर्को विकल्प "+q(alternative[1])+" हो। यो हेर्ने कि पहिलेको अनुरोधमा रहने?",[
        option("Yes, let's talk about that instead.","हुन्छ, त्यसैबारे कुरा गरौँ।","review",{detail:nextIndex,need:""}),
        option("I'd rather stay with my original request.","बरु पहिलेको अनुरोधमै रहन्छु।","proposal",{}),
        option("Can you explain what we should check first?","पहिले के जाँच्नुपर्छ बताउनुहुन्छ?","requirements",{}),
        option("Neither option suits me right now. Thank you.","अहिले कुनै पनि विकल्प मिलेन। धन्यवाद।","closing",{})
      ]);
    if(node==='requirements')return make(node,
      (guide.guidance?.[2]||guide.question[2])+" Would you like to take a practical next step or explore another choice?",
      (guide.guidance?.[3]||guide.question[3])+" अर्को व्यवहारिक कदम चाल्ने कि अर्को विकल्प हेर्ने?",[
        option("Let's check the next step together.","अर्को कदम सँगै जाँचौँ।","verify",{}),
        option("Can we discuss another possibility?","अर्को सम्भावनाबारे कुरा गरौँ?","alternative",{}),
        option("I'll check those details and come back later.","विवरण जाँचेर पछि आउँछु।","closing",{})
      ]);
    if(node==='verify')return make(node,
      plan.ask[0]+" I'm keeping your request about "+focus+" in mind.",
      plan.ask[1]+" तपाईंको "+focusNe+" सम्बन्धी अनुरोध ध्यानमा राखेको छु।",
      [...plan.options.map(entry=>option(entry[0],entry[1],"action",{need:entry[2]})),
       option("I would rather wait before deciding.","निर्णय गर्नुअघि पर्खन्छु।","closing",{})]);
    if(node==='action'){
      const selectedPlan=plan.options.find(entry=>entry[2]===state.need)||plan.options[0];
      return make(node,selectedPlan[3]+" Does that address your question about "+focus+"?",
        selectedPlan[4]+" "+focusNe+" बारे तपाईंको प्रश्नको उत्तर मिल्यो?",[
          option("Yes, that helps. What happens next?","हो, मद्दत भयो। अब के हुन्छ?","confirmation",{}),
          option("Not quite. Could we look at a different approach?","अझै भएन। अर्को तरिका हेरौँ?","alternative",{}),
          option("Could you go over the conditions again?","सर्त फेरि बुझाउनुहुन्छ?","requirements",{}),
          option("Thanks. I'd like to stop here.","धन्यवाद, अहिले यति नै।","closing",{})
        ]);
    }
    if(node==='confirmation')return make(node,
      "We can follow up on "+focus+" using the details we've just discussed. Is there anything else you'd like to ask?",
      "भर्खर छलफल गरेको विवरणअनुसार "+focusNe+" को अर्को कदम लिन सकिन्छ। अरू केही सोध्न चाहनुहुन्छ?",[
        option("No, thank you. That answers my question.","छैन, धन्यवाद। मेरो प्रश्नको उत्तर पाएँ।","closing",{}),
        option("Actually, could we compare another option?","बरु अर्को विकल्प पनि तुलना गरौँ?","alternative",{}),
        option("I'd like to ask one more practical question.","अर्को व्यवहारिक प्रश्न सोध्न चाहन्छु।","verify",{})
      ]);
    return make('closing',
      "You're welcome. Feel free to ask again if you need more help with "+focus+". Have a good day!",
      "स्वागत छ। "+focusNe+" बारे थप मद्दत चाहिए फेरि सोध्नुहोस्। शुभ दिन!",[
        option("Thank you. Goodbye!","धन्यवाद। बिदा!","end",{}),
        option("One more thing—can we start with a different question?","अर्को एउटा कुरा—फरक प्रश्नबाट सुरु गरौँ?","opening",{})
      ]);
  }
  window.sikauCoachContext=Object.freeze({build});
})();
