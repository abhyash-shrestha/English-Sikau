/* English Sikau — native Coach adapter for reviewed V4 conversation logic.
 * Retains existing page design, account authorization, membership and XP.
 * V4 runs as pure conversation state; no preview DOM or separate login.
 */
(function(){
'use strict';
const data=window.sikauV4Data;
if(!data||data.topics.length!==175)throw Error('Missing V4 conversation catalog');
const topicsAll=data.topics,topicDecisions=data.topicDecisions,routeDecisions=data.routeDecisions;
let activeIndex=null;
const state={route:-1,stage:0,ended:false,messages:[],facts:[],extraCount:0,outcome:'',mode:'',cafe:{}};
const noop=()=>{};
const save=noop,render=noop,snapshot=noop;
function add(role,text){state.messages.push({role,text:String(text)});}
function current(){return activeIndex===null?null:topicsAll[activeIndex]}
function route(){return current()?.routes[state.route]}
function changeGoal(){snapshot();add('you','Actually, I would like to change my request.');add('npc','Of course. We can change direction. Which of these situations would you like to discuss instead?');state.route=-1;state.stage=0;state.ended=false;state.facts=[];state.extraCount=0;state.outcome='';save();render();}
function secondStep(){
 const r=route();
 if(!r?.generated)return r?.steps?.[1];
 const title=current().title;
 if(title==='Ask about food allergies')return {q:'Has the kitchen already checked the ingredients and preparation method?',choices:[
  ['No. I need them to verify both before I decide.','Absolutely. We will ask and wait for reliable information before suggesting a dish.'],
  ['I asked once, but I am still concerned about cross-contact.','Then we should ask the kitchen again or avoid the dish, rather than promise it is safe.']]};
 if(title==='Report a noise problem')return {q:'Have you already tried to report the noise or discuss it calmly?',choices:[
  ['Not yet. I want to choose a respectful first step.','We can consider a calm request or a factual report through the appropriate channel.'],
  ['Yes. The problem has continued, so I need another approach.','Document the dates and earlier contacts, then ask management or the appropriate service for help.']]};
 if(title==='Join a video call')return {q:'Would you like to test the affected feature or check the app settings?',choices:[
  ['Let us test the problem in a safe practice call.','Good. We will test only the feature that is failing, then note the result.'],
  ['Please explain the relevant permissions first.','We can review permissions for the affected audio, camera, or sharing feature without exposing private information.']]};
 if(title==='Report a suspicious message')return {q:'Have you reported the message or secured your account yet?',choices:[
  ['Not yet. Please explain the official reporting method.','Use the provider’s verified report or abuse process rather than replying to the sender.'],
  ['I am concerned my account may be compromised.','Use the official security and recovery channel promptly, and review recent account activity.']]};
 const first=state.facts.find(f=>f.kind==='detail0');
 if(!first)return r.steps[1];
 const a=r.steps[0].choices[0][0]===first.answer;
 const make=(q,x,xr,y,yr)=>({q,choices:[[x,xr],[y,yr]]});
 const g=r.group;
 if(g==='checkout')return a?make('Would you like to check the items or finalize the correct total?',
  'Can we review the quantity and any discount?','Certainly. We can check each item and applicable promotion before confirming the amount.',
  'Can you explain the subtotal and taxes?','Yes. I can review the itemized bill before you approve payment.'):
  make('Which payment detail should we clarify?',
  'Could I use two payment methods?','We can check whether split payments are supported, then confirm each amount.',
  'What should I do if the transaction cannot be completed?','Please ask the cashier to check the payment status before retrying.');
 if(g==='money')return a?make('Would you rather confirm the amount now or compare the terms?',
  'Could I have a clear breakdown of the amounts and charges?','Yes. We can check each amount and charge through the provider\'s official records.',
  'What are the limits or deadlines I should know about?','We should verify the applicable limits, due dates, and approval rules before you act.'):
  make('Which secure next step do you need help with?',
  'How do I contact the official security or support team?','Use the verified bank app, official website, or phone number to reach authorized support.',
  'Can you explain what evidence or identification is needed?','Certainly. We can describe the official verification requirements without collecting secrets here.');
 if(g==='returns')return a?make('Before we resolve this, what should we check in the purchase record?',
  'Could you check the purchase date and product condition?','Yes, both determine which return or warranty rules apply.',
  'What if the item qualifies for more than one solution?','We can compare the eligible refund, replacement, or repair options with you.'):
  make('Without the receipt, what would be most useful?',
  'Could you look for a transaction or order number?','We can try the authorized purchase lookup without assuming it will succeed.',
  'What if you cannot verify the original purchase?','We should explain the policy and alternative support options, not promise a refund.');
 if(g==='food')return a?make('What should the kitchen clarify before any order is placed?',
  'Please verify ingredients and how this is prepared.','I will ask the kitchen about the exact ingredients and preparation requirements.',
  'What if the kitchen cannot meet my dietary request?','Then we should not place an unsuitable order. We can discuss other dishes or stop.'):
  make('Would you prefer a different portion or a full total first?',
  'Can you compare the available portion sizes?','We can explain the sizes and what is included before you choose.',
  'Please calculate the total including any extras.','I will review each selected item and any additional charge before you approve the order.');
 if(g==='booking')return a?make('How should we choose a suitable time?',
  'Please check the next available matching slot.','We can review available slots in the practice schedule without inventing a confirmed booking.',
  'Can I compare more than one possible date?','Of course. We can keep the options open until you select one.'):
  make('What would you like to know about the appointment conditions?',
  'Could you explain how to change or cancel later?','We can check the policy before you commit to a date.',
  'Which forms, fees, or deposits are required?','I will outline the applicable requirements before any reservation is made.');
 if(g==='health')return a?make('What information would help you prepare for the visit?',
  'Could you explain where to check in and whom to speak with?','Reception can explain the check-in process and help you locate the correct department.',
  'Is there a way to ask a qualified clinician my questions?','Certainly. A clinician should handle symptoms, medication, or treatment questions.'):
  make('Which preparation detail is most important?',
  'Could you explain the necessary forms and documents?','We can review the clinic\'s official forms and verification steps.',
  'How can I verify my insurance or coverage?','The clinic and insurer can confirm network and benefits through their secure channels.');
 if(g==='tech')return a?make('Which safe check would you like to try next?',
  'Can we confirm the issue without changing my personal data?','Yes. We can test the affected feature using reversible steps and protect your files.',
  'What should I record if this keeps happening?','Save the exact error message, timing, and device details without sharing passwords.'):
  make('What would help you understand the technical next step?',
  'Could you give me safe instructions in order?','Certainly. We can follow trusted instructions one step at a time.',
  'Who should I contact if the problem is not resolved?','Official product support or a qualified technician can assist with further checks.');
 if(g==='work')return a?make('What workplace detail should we verify?',
  'Can we review the policy that applies?','Yes. The relevant policy and approvals should be clear before changing a work arrangement.',
  'Who is responsible for the next step?','Let us identify the supervisor or teammate who needs to respond.'):
  make('What outcome would be most useful to the team?',
  'Could we agree on one concrete next action?','Yes. We can document the action, owner, and timing.',
  'Can we discuss another solution if this is not approved?','Certainly. We can review alternatives and the normal escalation route.');
 if(g==='shop')return a?make('What would you like to compare before choosing?',
  'Can I check the size, material, or main features?','Of course. We can compare the details that matter for this particular item.',
  'Is there an alternative that might suit me better?','Let us check another item without assuming it is available.'):
  make('What would make the price clear enough to decide?',
  'Please tell me the final total including applicable charges.','We can review the complete price before checkout.',
  'Is there a less expensive choice with similar features?','We can compare a lower-priced option and explain the differences.');
 if(g==='social'||g==='family')return a?make('How should we make the conversation comfortable for everyone?',
  'Could you tell me what you would prefer?','I appreciate you asking. We can talk about preferences before agreeing on a plan.',
  'Could we decide on one small next step together?','Sure. Let us choose something that feels realistic for both of us.'):
  make('Would you rather decide now or leave the plan open?',
  'Let us keep the details flexible for now.','Absolutely. There is no pressure to decide today.',
  'Could we consider another idea?','Of course. I am happy to hear an alternative.');
 if(g==='repair'||g==='home')return a?make('What needs inspection before we arrange anything?',
  'Could you check the problem and tell me what you find?','We can schedule a suitable inspection and report what it shows, without assuming the cause.',
  'What can I do safely while waiting?','Please avoid unsafe work; we can discuss appropriate precautions and official guidance.'):
  make('Which service condition should be confirmed?',
  'Can I have the estimate in writing?','We can outline parts, labor, and relevant charges before you authorize work.',
  'Could we choose another date or a less costly approach?','Of course. Let us review realistic alternatives first.');
 return r.steps[1];
}
function contextStep(){
 const r=route();if(!r)return '';
 const responses=state.facts.map(f=>f.answer.toLowerCase()).join(' ');
 if(/card.*missing|lost my debit card|suspicious|dispute a bank charge/i.test(current().title+' '+r.say)&&/stole|compromised|cannot identify|security/.test(responses))
  return 'Since you may be dealing with unauthorized card use, the priority is to contact verified bank security and protect your account. No card has been frozen here.';
 if(/allerg|cross.contact/.test(current().title.toLowerCase()+' '+r.say.toLowerCase())&&/cannot|not|allerg|cross/.test(responses))
  return 'Because ingredient or cross-contact safety is uncertain, we must ask qualified kitchen staff; we should not assume the dish is suitable or submit the order.';
 if(/cancel/.test(responses)&&/appointment|booking|reservation|table|rental/i.test(current().title+' '+r.say))
  return 'You asked about canceling. We should check the original booking and the cancellation terms before making any change.';
 if(/lower.price|budget|too expensive|cost/.test(responses)&&/shop|food|money/.test(r.group||''))
  return 'Price matters to you, so we can compare the complete cost and a suitable alternative instead of rushing to checkout.';
 return r.next;
}
/* Natural, contextual conversation flow. Each of the 175 topics contains a
 * separate authored decision, two reactions, and three different initial goals.
 * No real-world transactions are performed by this local preview.
 */
function authored(){return routeDecisions[current()?.title]?.[state.route]||topicDecisions[activeIndex]}
function familyLike(){return ['Everyday','Family'].includes(current()?.category)}
const auditedKinds={"Ask for directions":["travel","travel","travel"],"Check in at a hospital":["hospitalCheckin","hospitalCheckin","hospitalCheckin"],"Order at a restaurant":["dining","foodOrder","issue"],"Grocery shopping":["shopping","pricing","shopping"],"Check in at a hotel":["hotelCheckin","hotelCheckin","issue"],"At the airport":["airport","airport","airport"],"Ask a teacher":["education","education","education"],"Rent an apartment":["housing","housing","housing"],"Meet a teacher":["education","education","education"],"Change a work shift":["work","work","work"],"At the car mechanic":["service","service","service"],"At the public library":["library","library","library"],"Compare prices in shops":["information","pricing","information"],"Use self-checkout":["checkout","pricing","checkout"],"Pick up a store order":["pickup","pickup","issue"],"Order pizza":["foodOrder","foodOrder","foodOrder"],"Order fast food":["foodOrder","foodOrder","foodOrder"],"Buy from a bakery":["foodOrder","foodOrder","foodOrder"],"Split a restaurant bill":["bill","bill","bill"],"Fix a wrong food order":["issue","issue","issue"],"Ask for a restaurant table":["restaurantBooking","restaurantBooking","restaurantBooking"],"Order food delivery":["foodOrder","information","service"],"Check food freshness":["information","issue","issue"],"Order Nepali food":["foodOrder","foodOrder","foodOrder"],"Find a budget meal":["information","information","information"],"Miss a bus":["travel","travel","travel"],"Report missing luggage":["baggage","baggage","baggage"],"Ask about airport security":["screening","screening","screening"],"Ask about a flight delay":["travel","travel","travel"],"Report a hotel room issue":["issue","issue","issue"],"Check out of a hotel":["hotelCheckout","issue","hotelCheckout"],"At a gas station":["gasStation","pricing","gasStation"],"Call roadside assistance":["service","service","service"],"Call health insurance":["insurance","insurance","insurance"],"Request medical records":["records","records","records"],"Visit a laboratory":["lab","lab","lab"],"Apply for a job":["work","work","work"],"Ask for job training":["work","work","work"],"Report a mistake at work":["work","work","work"],"Call out sick from work":["work","work","work"],"Request vacation time":["work","work","work"],"Ask a coworker for help":["work","work","work"],"Handle a customer complaint":["issue","issue","issue"],"Speak in a team meeting":["work","work","work"],"Discuss career growth":["work","work","work"],"Call a home repair service":["service","service","service"],"Get a haircut":["booking","booking","booking"],"Use a laundry service":["service","service","service"],"Send a package abroad":["service","service","service"],"Ask about notarizing documents":["service","service","service"],"Ask about an ID card":["service","service","service"],"Renew a driving license":["service","service","service"],"Question an internet bill":["issue","issue","issue"],"Change a mobile phone plan":["service","service","service"],"Ask for a locksmith":["service","service","service"],"Find a lost item":["issue","issue","issue"],"Ask about a room for rent":["housing","housing","housing"],"Plan a house move":["home","home","home"],"Call a plumber":["service","service","service"],"Report a heating problem":["service","service","service"],"Report an air-conditioner problem":["service","service","service"],"Receive a home delivery":["service","service","issue"],"Ask a landlord for repairs":["issue","issue","issue"],"Set up utilities when moving":["service","service","service"],"Ask about school enrollment":["education","education","education"],"Apply to a college":["education","education","education"],"Join an English class":["education","education","education"],"Hire a tutor":["education","education","education"],"Ask for homework feedback":["education","education","education"],"Organize a group project":["education","education","education"],"Ask about an exam":["education","education","education"],"Join an online course":["education","education","education"],"Move files between devices":["service","service","service"],"Ask how to use an AI assistant":["education","education","education"],"Send an email attachment":["service","service","service"],"Sign up to volunteer":["community","community","community"],"Ask about a gym membership":["community","community","community"],"Join a sports club":["community","community","community"],"Get a library card":["library","library","library"],"Ask about a public park":["community","community","community"],"Ask at town hall":["community","community","community"],"Find local support services":["community","community","community"],"Shop for family necessities":["shopping","information","shopping"],"Ask about customs rules":["customs","customs","customs"],"Pay at the checkout":["checkout","checkout","pricing"],"Book a taxi":["taxiBooking","taxiBooking","taxiBooking"],"At a bank":["bankDeposit","finance","security"],"Deposit money at a bank":["bankDeposit","bankDeposit","bankDeposit"]};
/* Editorial repairs for generic or unrelated secondary questions.
 * The three entries align with the three starting situations for each topic.
 */
const reviewedDetailQuestions={
 'Shop for glasses':[
  ['What type of frames would feel comfortable for daily use?',
   ['I prefer lightweight frames.','Let us compare the weight and fit of the frames that suit your prescription.'],
   ['I want something durable for everyday use.','We can look at the frame material, hinges and warranty conditions.']],
  ['Do you need single-vision lenses, or are you comparing lens coatings?',
   ['I want to understand anti-reflective coatings.','We can explain what the coatings do and whether the added price works for you.'],
   ['I need help understanding the lenses in my prescription.','The optician can explain your prescribed lens type and appropriate options.']],
  ['Would you like the full glasses price broken down?',
   ['Yes, please separate the frame and lens prices.','Certainly. We can itemize the frame, lenses, coatings, and applicable fees.'],
   ['Could I compare a less expensive frame?','Of course. We can check another frame that fits your prescription and budget.']]
 ],
 'Buy furniture':[
  ['What size sofa would fit your living room?',
   ['I have room for a small two-seat sofa.','Let us check the dimensions and measure the available space.'],
   ['I need a larger sofa, but my doorway is narrow.','We should compare the assembled dimensions and delivery access before ordering.']],
  ['Do you have the table and doorway measurements?',
   ['Yes, I measured both. Could we compare them?','Great. We can check the table packaging and any removable parts against the doorway.'],
   ['Not yet. What should I measure?','Measure the narrowest entryway, hallway turns, and the table dimensions before buying.']],
  ['Would you need delivery only, or assembly as well?',
   ['I need someone to assemble the furniture.','Let us check assembly availability, scheduling, and the total cost.'],
   ['I could assemble it myself if delivery is cheaper.','We can compare delivery-only fees and what tools or instructions are included.']]
 ],
 'Buy a home appliance':[
  ['What size refrigerator and installation space do you have?',
   ['I need a compact refrigerator for a small kitchen.','We should compare width, depth, door clearance, and capacity.'],
   ['I need a larger model for my family.','Let us check capacity, dimensions, and energy usage before choosing.']],
  ['Would you like to compare yearly energy usage or storage space?',
   ['Energy cost matters most to me.','We can compare the energy labels and estimated annual consumption.'],
   ['I need more space for frozen food.','Then we should compare freezer layout and usable capacity.']],
  ['Does your delivery address have stairs or installation restrictions?',
   ['There are stairs and a narrow entrance.','We should check the delivery dimensions and any stair-carry fee before scheduling.'],
   ['The delivery is easy, but I need the old appliance removed.','We can ask whether haul-away is offered and what it costs.']]
 ],
 'Choose a birthday gift':[
  ['Who is the gift for, and what do they enjoy?',
   ['My friend enjoys books and quiet hobbies.','We can compare a book or a gift related to that interest and your budget.'],
   ['They like practical gifts.','Let us look at useful items they might appreciate.']],
  ['What would you like to personalize?',
   ['Could you put their name on the gift?','We can check whether engraving or printing is available and review the spelling first.'],
   ['I want to add a short birthday message.','We can check the message length, proofread the wording, and confirm the price.']],
  ['Is the gift being collected here or delivered to the recipient?',
   ['I would like it wrapped for pickup.','Let us compare wrapping choices and the pickup time.'],
   ['Please send it directly to my friend.','We should confirm the delivery details, timing, and whether a gift receipt is available.']]
 ],
 'Shop for jewelry':[
  ['What style and budget do you have in mind for the necklace?',
   ['I prefer a simple necklace for everyday wear.','We can compare chain lengths and materials within your budget.'],
   ['I would like something suitable as a gift.','Let us check the recipient’s preferred style and the gift-exchange rules.']],
  ['Do you want to verify the metal content or the markings?',
   ['Can you show me the silver hallmark?','We can inspect the marking and the seller’s documentation before making any claim about purity.'],
   ['Could you explain how to care for this metal?','We can discuss appropriate cleaning and storage for the listed material.']],
  ['Is the concern ring sizing or the return policy?',
   ['I am unsure of the correct ring size.','We can measure the size and explain which resizing options are available.'],
   ['Can I exchange it if it does not fit?','Let us review the written exchange conditions before you purchase.']]
 ],
 'Shop for cosmetics':[
  ['Are you shopping for a moisturizer based on skin feel or particular ingredients?',
   ['My skin feels dry, and I want a gentle formula.','We can compare product labels and suggest asking a qualified professional about allergies or reactions.'],
   ['I want to avoid fragrance.','Let us check the ingredient lists and patch-test guidance on the products.']],
  ['Would you like to compare shades in different lighting?',
   ['I want a shade that matches my skin tone.','We can compare available shades in good light without assuming a match.'],
   ['I prefer something lightweight for daily use.','We can compare finishes, coverage, and the product descriptions.']],
  ['Which ingredient or product claim would you like checked?',
   ['Please show me the full ingredient list.','Of course. We can read the product label together.'],
   ['I have reacted to another product before.','The label may help identify differences, but a qualified professional should advise on allergy concerns.']]
 ],
 'Ask about a discount':[
  ['Are you asking about the items currently on sale?',
   ['Yes. Which of these items has a posted discount?','We can check the marked sale labels and valid dates.'],
   ['Do any exclusions apply?','Let us review which brands or items the promotion excludes.']],
  ['Do you have identification or a membership number for that offer?',
   ['I am eligible for a student discount.','We can explain the accepted proof and which items qualify.'],
   ['I am a member but do not know the current offer.','We can check the published member benefits without promising an unlisted discount.']],
  ['Is the promotional code showing an error or a different price?',
   ['It says the code has expired.','We should check its expiry date and any valid alternatives before applying it.'],
   ['The discount did not appear at checkout.','Let us verify the eligible items and the code terms before adjusting the total.']]
 ],
 'Report missing luggage':[
  ['Where did you last see your suitcase?',
   ['I checked it in at the departure airport.','Let us confirm the baggage tag, flight, and arrival details for the tracing report.'],
   ['I saw it at a connecting airport.','That will help. We should note the connection and baggage tag number.']],
  ['Do you have the baggage claim tag or airline confirmation?',
   ['Yes, I have the tag and flight details.','We can start a baggage trace using those records.'],
   ['I lost the tag. What else can I provide?','The baggage desk can explain accepted verification such as booking and flight information.']],
  ['What does the airline say about the missing bag?',
   ['The status says it is being traced.','We can ask about the reference number and the next update without promising a delivery date.'],
   ['I have not received a reference number.','Please ask the official baggage service desk to create or locate the claim.']]
 ],
 'Ask about airport security':[
  ['Which carry-on item are you unsure about?',
   ['I have liquids and toiletries.','Liquids rules depend on the airport and jurisdiction. Check the official screening limits before packing.'],
   ['I need to bring a laptop and charger.','We can check the current screening and airline battery rules for electronics.']],
  ['Are you asking about identification or the boarding pass?',
   ['I want to know which ID is accepted.','Check the current official identification requirements for your departure airport and journey.'],
   ['What should I have ready at the checkpoint?','Keep the required travel documents and boarding pass accessible, following staff instructions.']],
  ['What happened when your bag was flagged?',
   ['An officer wants to inspect an item.','Follow the officer’s directions and ask politely what information they need.'],
   ['I want to know if an item is prohibited.','Ask security staff and consult the official prohibited-items list rather than guessing.']]
 ],
 'Ask about a flight delay':[
  ['What does the airline currently show for your departure?',
   ['It has posted a new departure time.','Let us verify the updated time and any gate change through the airline’s official channels.'],
   ['There is no estimate yet.','We can check when the next update is expected and the airline’s assistance policy.']],
  ['How much time do you have between your connecting flights?',
   ['The connection will probably be missed.','Please speak with airline staff about available rebooking and onward-travel options.'],
   ['The connection may still work, but I am worried.','We can verify the connection rules and latest arrival estimate before making changes.']],
  ['Would you like to review the airline’s rebooking and assistance rules?',
   ['Please explain how to request another flight.','We can check official options and any fare or ticket conditions before choosing.'],
   ['I want to know if meals or accommodation are provided.','Entitlements depend on the airline, reason for delay, and applicable rules. Ask the airline to confirm.']]
 ],
 'Ask at a visitor center':[
  ['What kind of place would you most like to visit?',
   ['I would love a scenic place for photographs.','We can discuss nearby viewpoints and current access information.'],
   ['I want to visit a museum or historical attraction.','Let us check the official opening hours and ticket requirements.']],
  ['Are you looking for a walking route or transportation options?',
   ['A short walking route would be ideal.','We can compare marked routes and accessibility information.'],
   ['I am traveling with a family member who cannot walk far.','Let us check accessible transport and shorter routes.']],
  ['What would you like to know about local visitor services?',
   ['Where can I find public restrooms and drinking water?','We can check the visitor map and available facilities.'],
   ['Are there guided tours or visitor discounts?','Let us check the organizer’s current tour schedule and conditions.']]
 ],
 'Ask about customs rules':[
  ['Which food items are you planning to carry?',
   ['I have packaged snacks.','Please check the destination country’s current rules and declare anything required.'],
   ['I am bringing homemade food.','Food restrictions can vary. Check the official customs and agriculture rules before traveling.']],
  ['Are you asking about gifts, personal items or the value limit?',
   ['I am carrying gifts for family.','We can review the current declaration and value thresholds at the destination.'],
   ['I am bringing personal electronics.','Let us check the relevant personal-use and declaration guidance.']],
  ['Do you need help understanding a customs declaration?',
   ['I am unsure whether an item needs declaring.','You can ask an officer and answer truthfully using the current official instructions.'],
   ['I do not understand a question on the form.','Ask the customs officer for clarification before submitting an inaccurate answer.']]
 ]
};
for(const [title,routes] of Object.entries(reviewedDetailQuestions)){
 const topic=topicsAll.find(t=>t.title===title);
 if(!topic)throw Error('Missing curated topic '+title);
 for(let i=0;i<routes.length;i++){
  const [q,...pairs]=routes[i];topic.routes[i].steps[0]={q,choices:pairs};
 }
}

function scenarioKind(){
 const t=current(),title=t.title.toLowerCase(),r=route(),request=(r?.say||'').toLowerCase();
 if(auditedKinds[t.title])return auditedKinds[t.title][state.route]||'information';
 const problem=/wrong|missing|lost|stolen|damaged|broken|defective|charged|dispute|refund|complaint|doesn.t|didn.t|not working|cannot|can't|issue|problem|delay|late|slow|error|failed|cancel|reschedul|cracked|stopped|accident|unavailable|noise|mismatch|expired|suspicious|return|exchange|haven.t arrived/.test(request);
 if(/food allerg|cross.contact/.test(title+' '+request))return 'foodSafety';
 if(/security|suspicious|lost debit|unknown charge|fraud|account accessed|password|unauthorized/.test(title+' '+request)&&/bank|card|password|account|security|message/.test(title+' '+request))return 'security';
 if(['Meet someone new','Make small talk','Talk about hobbies','Discuss a child\'s school day','Call family back home','Share good news'].includes(t.title))return 'chat';
 if(familyLike()&&!/shop|purchase|buy |pay|rent|medical/.test(title))return 'social';
 if(/medicine|pharmacy|urgent care|dentist|medical|vaccin|counsel|telehealth|health|clinical|toothache/.test(title)&&!/check in at a hospital/.test(title))return 'clinical';
 if(/bank|withdraw|deposit money|exchange money|credit card|loan|send money|financial aid|monthly budget|paying rent/.test(title))return 'finance';
 if(problem&&/return|warranty|complaint|missing|lost|issue|order|receipt|delivery|damaged|incorrect|charge|noise|delay|room|flight|bus|transaction|product/.test(title+' '+request))return 'issue';
 if(/job interview|ask a teacher|meet a teacher|at work|work shift|salary|training|mistake at work|resign/.test(title))return 'work';
 if(/computer|printer|wi.fi|internet|phone repair|repair a phone|software|tech|account|video call|electricity|water service|car mechanic|locksmith|heating|air.condition/.test(title))return 'service';
 if(/appointment|schedule|book |reserve|rent a car|tutor|cleaning service|enroll|register|application|study room/.test(title+' '+request)&&!/how much|cost|price|requirements|fees|how do/.test(request))return 'booking';
 if(/directions|public transport|airport|bus|train|taxi|rideshare|visitor center|customs|travel|luggage/.test(title))return 'travel';
 if(/order at a café/.test(title))return 'cafe';
 if(/order|buy |shop|grocery|at the checkout|self.checkout|birthday gift|jewelry|cosmetics|pizza|food delivery|budget meal/.test(title)&&!/not buying|comparing|just checking|only want|what is|how much|can you explain|do you have|price|cost|discount|quality|fees/.test(request))return 'shopping';
 if(problem)return 'issue';
 if(/book|reserve|appointment|schedule|rent/.test(title+' '+request))return 'booking';
 return 'information';
}
const continuationPrompts={
 Shopping:'Would you like to compare an option or check the complete cost before deciding?',
 Healthcare:'Would you like to go through the appointment or verification steps, or ask about another concern?',
 'Food & Drink':'Would you like to confirm the order and any requirements, or consider another menu choice?',
 Travel:'Should we verify the timing and route, or check what you can do if plans change?',
 Work:'Should we agree on the next action and who is responsible, or discuss another approach?',
 Services:'Would you like to review the next service step or consider another option?',
 Everyday:'Would you like to share another thought or make a relaxed plan together?',
 Home:'Shall we discuss the next practical step or another arrangement?',
 Education:'Would you like to try a practical step or ask a follow-up question?',
 Technology:'Shall we try a safe next check or consider what to do if the issue continues?',
 Money:'Would you like to review the secure procedure or check an outstanding condition?',
 Community:'Would you like to find out how to participate or ask one more question?',
 Family:'Should we make a plan together or talk through another possibility?'
};
const alternatives={
 Shopping:'We can compare a different item or price without buying anything. Which alternative would work better for your needs?',
 Healthcare:'We can discuss a different appointment type or ask qualified staff about the next appropriate step; we will not assume availability or medical suitability.',
 'Food & Drink':'We can ask what alternatives are actually available. If an allergy cannot be safely accommodated, we should not place that order.',
 Travel:'We can look for another departure or route after checking the operator’s actual schedule and any restrictions.',
 Work:'We can suggest a different arrangement, but a supervisor must confirm any schedule or policy change.',
 Services:'If that service is unsuitable, we can discuss different timing or another approved solution.',
 Everyday:'That sounds fine. We can keep talking or leave the plan open; there is no pressure to decide.',
 Home:'We can request another estimate or appointment, but we should avoid any unsafe temporary repair.',
 Education:'We can try a different learning method, explanation, or time that better suits you.',
 Technology:'If the first check does not solve it, we can record the symptoms and contact official support without risking your data.',
 Money:'We should pause until the bank or provider verifies the terms, amounts, and any disputed activity securely.',
 Community:'We can compare another event or session, provided the organizer confirms the details.',
 Family:'We can choose another plan that respects everyone’s needs and availability.'
};
function detailedQuestion(){
 const pack=authored(),first=state.facts.find(x=>x.kind==='detail0');
 return pack.q;
}
function remember(question,answer,kind,reply){
 state.facts.push({question,answer,kind,reply});add('you',answer);add('npc',reply);
}
function chooseRoute(i){
 snapshot();state.route=i;state.stage=1;state.ended=false;state.outcome='';
 add('you',route().say);
 add('npc',route().reply+' '+(current().generated?authored().q:route().steps[0].q));
 save();render();
}
function chooseGeneratedStart(i){
 snapshot();const pack=authored(),choice=pack.choices[i];
 state.facts.push({question:pack.q,answer:choice[0],reply:choice[1],kind:'checkpoint',index:i});
 add('you',choice[0]);
 add('npc',choice[1]+' '+route().steps[0].q);
 state.stage=2;save();render();
}
function chooseDetail(index,choice){
 snapshot();const r=route(),step=index===0?r.steps[0]:secondStep(),pair=step.choices[choice];
 state.facts.push({question:step.q,answer:pair[0],kind:'detail'+index,reply:pair[1]});
 add('you',pair[0]);
 if(current().generated){
  state.stage=4;
  add('npc',pair[1]+' '+groundedAction().prompt);
 }else{
  state.stage=index===0?2:3;
  add('npc',pair[1]+' '+(index===0?secondStep().q:detailedQuestion()));
 }
 save();render();
}
function chooseCheckpoint(i){
 snapshot();const pack=authored(),choice=pack.choices[i];
 state.facts.push({question:pack.q,answer:choice[0],reply:choice[1],kind:'checkpoint',index:i});
 add('you',choice[0]);
 add('npc',choice[1]+' '+groundedAction().prompt);
 state.stage=4;save();render();
}
function conversationContext(){
 const t=current(),r=route(),facts=state.facts;
 const last=facts.filter(f=>f.kind?.startsWith('detail')).at(-1);
 const main=facts.find(f=>f.kind==='detail0');
 return {t,r,kind:scenarioKind(),main:main?.answer||'',last:last?.answer||'',decision:facts.find(f=>f.kind==='checkpoint')?.answer||''};
}
function groundedAction(){
 const {t,r,kind,main,decision}=conversationContext();
 const rawLabel=r.focus||t.title.toLowerCase();const label=/^(?:I |I'm |I'd |My |We |What |How |Could |Can )/i.test(rawLabel)?t.title.toLowerCase():rawLabel;
 if(kind==='screening')return {prompt:'Which screening rule or carry-on item would you like confirmed before you travel?',positive:'Please explain where I can verify the rule for that item.',negative:'I will check with airport screening staff before packing it.',positiveReply:`For ${label}, use the departure airport and security agency's current prohibited-items and screening instructions. Rules for liquids, batteries, and electronics can differ; do not assume an item is permitted without checking.`,negativeReply:'That is sensible. Airport screening staff can clarify the current rule. Keep restricted items out of the bag until you have reliable information.',result:'Security-screening information checked'};
 if(kind==='customs')return {prompt:'Would you like to review the declaration requirement for your item or ask a customs officer for clarification?',positive:'Please explain the official declaration process.',negative:'I will ask the customs officer before submitting the form.',positiveReply:`For ${label}, review the destination country's current customs and agriculture declaration rules and answer every required question truthfully.`,negativeReply:'Of course. Asking the officer is better than guessing about whether an item is eligible or must be declared.',result:'Customs declaration guidance'};
 if(kind==='baggage')return {prompt:'Do you want to open or check the airline baggage tracing report?',positive:'Please explain the tracing report and reference number.',negative:'I want to gather my baggage tag and flight details first.',positiveReply:'We can help record the flight details, baggage tag, bag description, and contact instructions. The airline will trace it and provide a claim reference; recovery or delivery is not guaranteed yet.',negativeReply:'Keep your baggage tag and flight confirmation, and contact the airline baggage service desk as soon as practical.',result:'Baggage tracing process explained'};
 if(kind==='hospitalCheckin')return {prompt:'Do you need to find your appointment or visitor desk, or check the required ID and forms?',positive:'Could you verify the department and direct me to the correct waiting area?',negative:'I have questions about the check-in requirements first.',positiveReply:'Reception can check the existing visit information and direct you to the proper desk or waiting area after verification. Interpreter support can also be requested when needed.',negativeReply:'Certainly. We can check identification, appointment details, accessibility and interpreter needs before proceeding.',result:'Hospital check-in guidance'};
 if(kind==='hotelCheckin')return {prompt:'Do you want to locate the existing reservation and complete check-in, or clarify the room details first?',positive:'Please check the reservation and tell me the check-in requirements.',negative:'I would like to clarify the room type and check-in conditions.',positiveReply:'The front desk can verify the booking and identification, then explain when the room and key are available. Nothing has been charged or issued yet.',negativeReply:'We can check room type, early-arrival options, luggage storage and any fees before confirming changes.',result:'Hotel check-in reviewed'};
 if(kind==='hotelCheckout')return {prompt:'Would you like to review the final room bill or confirm key return and checkout time?',positive:'Please show the itemized charges before I settle the bill.',negative:'I want to confirm the checkout and luggage-storage rules.',positiveReply:'Reception can review the room charges and authorized extras before taking final payment. Any disputed charge should be checked first.',negativeReply:'Certainly. We can explain when to return the keys, whether late checkout costs extra, and available luggage storage.',result:'Hotel checkout requirements reviewed'};
 if(kind==='airport')return {prompt:'Would you like to verify the check-in documents, latest gate, or current flight status?',positive:'Please help me check the official flight information and next step.',negative:'I want to ask an airline representative about the available options.',positiveReply:'Use the airline counter or official flight status screens to confirm check-in, baggage requirements, gate and departure changes for your flight.',negativeReply:'That is reasonable. Airline staff can check the booking and any rebooking requirements before making changes.',result:'Flight details reviewed'};
 if(kind==='pricing')return {prompt:'Would you like staff to verify the shelf price, scanned total, or promotion before payment?',positive:'Please compare the correct label and transaction details.',negative:'I will not pay until the difference is explained.',positiveReply:'We can compare the exact barcode, size, label and applicable promotion with the scanned amount. Any correction should be documented before payment.',negativeReply:'Understood. We will pause checkout and ask the responsible staff member to review the difference.',result:'Price discrepancy reviewed'};
 if(kind==='checkout')return {prompt:'Before payment, should we confirm the scanned items and total or resolve a machine issue?',positive:'Please review the total and available payment method.',negative:'I would rather pause while you check the checkout issue.',positiveReply:'The cashier can check the itemized total and payment options. We will only finish payment after you confirm the amount and method.',negativeReply:'Of course. Checkout remains pending until the scan or payment problem is resolved.',result:'Checkout details reviewed'};
 if(kind==='gasStation')return {prompt:'Do you need help with the pump, the correct fuel, or an itemized payment total?',positive:'Could you check the fuel grade and payment instructions?',negative:'I want an employee to check the pump before proceeding.',positiveReply:'Staff can confirm the appropriate posted fuel options, pump instructions and price before you authorize fueling.',negativeReply:'That is fine. Avoid using a malfunctioning pump until qualified staff check it.',result:'Fueling guidance reviewed'};
 if(kind==='lab')return {prompt:'Would you like to check the lab order and appointment instructions or when results will be available?',positive:'Please explain the order and preparation requirements.',negative:'How can I check where and when results will be sent?',positiveReply:'Lab staff can verify the prescribed test, identity and any preparation instructions from the ordering clinician.',negativeReply:'The lab can explain its secure results process. A qualified clinician should interpret medical findings.',result:'Laboratory process explained'};
 if(kind==='records')return {prompt:'Would you like a copy of the records or to check the identity and authorization requirements?',positive:'Please explain how to submit an authorized medical-records request.',negative:'I want to know the processing and secure delivery options first.',positiveReply:'The medical-records department can verify identity, authorization, requested dates, and the secure release method before processing.',negativeReply:'Certainly. Ask the provider about its current form, turnaround time, and safe delivery methods.',result:'Medical-records procedure explained'};
 if(kind==='taxiBooking')return {prompt:'Where should the driver collect you, and when do you need the ride?',positive:'Please confirm the pickup, destination, luggage needs and fare estimate.',negative:'I want to compare pickup times or cancel before requesting a driver.',positiveReply:'The dispatcher can check the requested pickup, vehicle availability and estimate. The ride is not booked until the provider confirms it.',negativeReply:'No problem. We can compare options without dispatching a driver or charging you.',result:'Taxi request reviewed'};
 if(kind==='restaurantBooking')return {prompt:'How many people need a table, and what day and time would suit the group?',positive:'Please check the appropriate table and any reservation conditions.',negative:'I need to change the party size or preferred time first.',positiveReply:'The host can check actual seating for the group and confirm any deposit or arrival policy. A table is not guaranteed until the host confirms it.',negativeReply:'Of course. We can update the requested party size or time before checking availability again.',result:'Restaurant table request reviewed'};
 if(kind==='bankDeposit')return {prompt:'Should we confirm the deposit details and count the funds, or review availability and receipt options first?',positive:'Please verify the account and amount and give me a deposit receipt.',negative:'I would like to understand funds availability before depositing.',positiveReply:'The teller can verify the account securely, count the cash or validate the check, confirm the amount and produce a receipt once the deposit is accepted.',negativeReply:'Certainly. The bank can explain any holds and availability rules before you proceed. No deposit has been processed yet.',result:'Deposit procedure reviewed'};
 if(kind==='checkin')return {prompt:'Let us verify the existing reservation, check-in record, or visitor access—not create a new booking. What would you like to confirm?',positive:'Could you check the existing reservation or registration details?',negative:'I need to clarify the requirements before checking in.',positiveReply:`We can check the correct record, identity requirements and assigned desk for ${label}. Any room key, visitor badge or registration will only be issued after the usual verification.`,negativeReply:'Of course. We can explain what documents and permissions the desk needs before you continue.',result:'Check-in details reviewed'};
 if(kind==='dining')return {prompt:'Would you like to see the menu and place an order, or decide after comparing the choices?',positive:'Could we see the menu and choose our food first?',negative:'We need a little more time before ordering.',positiveReply:`Certainly. For ${label}, I can show the food and drink options, confirm any dietary requests, and take the order only after you choose the items. We have not sent anything to the kitchen yet.`,negativeReply:'No rush. Take your time with the menu and let me know when you are ready.',result:'Menu reviewed; order not yet placed'};
 if(kind==='foodOrder')return {prompt:'Before sending an order to the kitchen, which items, portions, and changes would you like to confirm?',positive:'Please review my chosen food, portions, and any special requests.',negative:'I have not finalized the order. Could I compare other dishes?',positiveReply:`Let's confirm the precise items and preferences you discussed for ${label}, along with the displayed total. We will not submit an order until you approve those details.`,negativeReply:'Of course. We can compare dishes or prices without placing anything in the kitchen queue.',result:'Food order details reviewed'};
 if(kind==='bill')return {prompt:'Would you like to check the itemized bill or agree how to divide it?',positive:'Please show the items and how the total would be split.',negative:'I think we should check a particular charge first.',positiveReply:`For ${label}, we can calculate each person's share only from the actual items and agreed splitting method. No payment has been taken.`,negativeReply:'Absolutely. Let us verify any questionable charge with the original order before splitting the bill.',result:'Bill reviewed; no payment taken'};
 if(kind==='housing')return {prompt:'Would you like to confirm the property details and lease terms, or compare other options?',positive:'Please explain the rent, deposit, and application requirements.',negative:'I would rather see the property or compare another option first.',positiveReply:`We can review the written lease conditions, applicable fees, and the viewing or application steps for ${label}. No application or lease has been submitted.`,negativeReply:'That is sensible. You can review the property and terms before applying or paying anything.',result:'Rental terms reviewed'};
 if(kind==='library')return {prompt:'Would you like to check library access and available services or the registration requirements?',positive:'Could you explain the library service I asked about?',negative:'Please explain what I would need to register or use the facility.',positiveReply:`For ${label}, staff can check the relevant book, facility, room or digital resource and its current availability.`,negativeReply:'We can review the library card, reservation, identity and borrowing rules without assuming anything is checked out.',result:'Library service explained'};
 if(kind==='education')return {prompt:'Would an example or clarification help, or would you rather agree on a manageable next step?',positive:'Could you give me an example directly related to my question?',negative:'Could we review the requirements and what I should do first?',positiveReply:`For ${label}, let's use a relevant example and then give you a chance to try it in your own words.`,negativeReply:'Certainly. We can identify the instructions, deadline and suitable next exercise before moving on.',result:'Learning or application guidance provided'};
 if(kind==='pickup')return {prompt:'Should we verify your pickup confirmation and the items, or ask staff to locate the order?',positive:'Please confirm the pickup record and the items included.',negative:'I need help finding the counter or checking an order discrepancy.',positiveReply:`For ${label}, staff can verify the order record and accepted pickup identification before releasing any item.`,negativeReply:'We can identify the correct service desk or review the discrepancy without assuming the order was collected.',result:'Pickup requirements reviewed'};
 if(kind==='insurance')return {prompt:'Would you like to verify your plan benefits or the official claims and customer-service process?',positive:'How can I verify coverage and any expected cost?',negative:'Could you tell me how to contact the appropriate insurance department?',positiveReply:`For ${label}, your insurer can verify network, benefits and cost-sharing through its secure member channel. No coverage is guaranteed here.`,negativeReply:'We can identify the appropriate member-services or claims department and the information they need.',result:'Insurance information explained'};
 if(kind==='home')return {prompt:'What part of the home plan should we organize first—timing, services, or costs?',positive:'Could we make a practical checklist for the move?',negative:'Can we compare another arrangement before committing?',positiveReply:`For ${label}, list your dates, household needs, available help, and costs, then confirm each arrangement with the provider.`,negativeReply:'Of course. Compare the alternatives and decide when the details work for you.',result:'Home arrangements discussed'};
 if(kind==='community')return {prompt:'Would you like to check the event or community-service details, or the participation requirements?',positive:'Please explain when, where and how I can take part.',negative:'Can we check the fees, accessibility or registration rules?',positiveReply:`We can confirm the organizer's current information for ${label} before treating participation as confirmed.`,negativeReply:'Certainly. Check the official participation rules and any available accommodations before deciding.',result:'Community information provided'};
 if(kind==='foodSafety')return {prompt:'Would you like the kitchen to check the exact ingredients and cross-contact risks, or would you rather avoid the meal?',positive:'Please check with the kitchen before I decide.',negative:'I will not order unless the kitchen can confirm it is suitable.',positiveReply:'I will pass the precise allergy or preference information to kitchen staff. Until we receive a reliable answer, the order stays unplaced.',negativeReply:'I understand. We will not place the order. It is better to avoid a dish when important ingredient or cross-contact information cannot be verified.',result:'Ingredient check requested'};
 if(kind==='security')return {prompt:'The next step is to protect the account through the official security channel. What would you prefer?',positive:'Please explain how to reach the verified security team.',negative:'I want to protect my account first and come back later.',positiveReply:'Use the official bank or service app, known telephone number, or verified website to report the concern. Do not disclose passwords or verification codes here; we have not changed or secured the account here.',negativeReply:'That is sensible. Contact the verified security team promptly, especially if a card or password may be compromised. No action was made here.',result:'Security next steps explained'};
 if(kind==='issue')return {prompt:'We can document what happened and check the applicable remedy. Would you like to proceed with a review, or gather more information first?',positive:'Please record the problem and explain the review process.',negative:'I would rather gather the evidence before submitting a request.',positiveReply:`I have noted your concern about ${label}. We will check the relevant receipt, record, or policy before a replacement, refund, or other remedy can be approved. Nothing has been refunded or replaced yet.`,negativeReply:`That is fine. Keep the useful records relating to ${label}, and ask for a review when you have the details. No remedy has been approved.`,result:'Issue submitted for review'};
 if(kind==='booking')return {prompt:'Before we treat this as a booking, we need the exact date, time and applicable conditions. What would you prefer?',positive:'Please explain how to confirm an available time.',negative:'I am not ready to confirm a time yet.',positiveReply:`We can check the provider's actual calendar and requirements for ${label}. The request remains pending until a specific slot is confirmed.`,negativeReply:'No problem. You can check your schedule and contact us when you know which time suits you. No booking has been made.',result:'Booking details requested'};
 if(kind==='shopping')return {prompt:'Would you like to verify the exact item and total before choosing whether to buy?',positive:'Yes. Please confirm the item, available options, and final price.',negative:'I prefer not to buy anything right now.',positiveReply:`We can review the selection you described: ${label}. We must confirm availability, configuration and total before payment. Nothing has been purchased.`,negativeReply:'Of course. You can compare more options and decide later. Nothing has been purchased.',result:'Selection reviewed; no charge'};
 if(kind==='cafe')return {prompt:'Would you like to confirm the café request or keep your options open?',positive:'Please confirm the drink or seating details before proceeding.',negative:'I will decide later, thanks.',positiveReply:'We can confirm the exact drink, size, milk, and whether it is for here or to go before any order or charge.',negativeReply:'Certainly. Take your time; nothing has been ordered or charged.',result:'Café request discussed'};
 if(kind==='clinical')return {prompt:'Would you like to speak with qualified staff or clarify the administrative process first?',positive:'Could you explain how to reach the appropriate professional?',negative:'I would rather check my documents and options first.',positiveReply:`For ${label}, a qualified clinician or pharmacist must handle medical suitability, treatment and symptoms. We can explain the contact or appointment process without assuming any medical outcome.`,negativeReply:'That is okay. Confirm the applicable clinic instructions and coverage when you are ready. No appointment or treatment has been arranged.',result:'Professional guidance route explained'};
 if(kind==='finance')return {prompt:'Would you like to prepare for the official financial process or check the terms before deciding?',positive:'Please tell me which details I should verify through the official provider.',negative:'I want to review the fees and conditions first.',positiveReply:`For ${label}, use the official provider channel to verify amounts, fees and identity requirements. No money has been moved or charged here.`,negativeReply:'That is a good idea. Read the written terms and compare the full costs before authorizing any transaction.',result:'Financial information explained'};
 if(kind==='travel')return {prompt:'Would you like to verify the route or timing, or check a different travel option?',positive:'Please help me confirm the next travel step.',negative:'I would like to check another route or schedule.',positiveReply:`We can check the current map, timetable or transport instructions for ${label}. We should not assume an unverified departure or direction.`,negativeReply:'Certainly. Compare the available alternatives and any restrictions before choosing. No travel booking has been made.',result:'Travel options explained'};
 if((kind==='social'||kind==='chat')&&t.title==='Plan a family visit to Nepal')return {prompt:'Would you like to check dates with our relatives or start planning the travel budget?',positive:'Let us ask our family which dates work before we book tickets.',negative:'Let us compare the travel costs and talk again when we have a budget.',positiveReply:'That sounds good. I will ask which days everyone is free, and we can decide how long to stay after we hear back.',negativeReply:'Agreed. We can compare possible flights and costs before making promises. I am glad we talked.',result:'Family visit planning'};
 if((kind==='social'||kind==='chat')&&t.title==='Talk in a long-distance relationship')return {prompt:'How can we make it easier to talk despite our different schedules?',positive:'Let us agree on a time for a relaxed video call.',negative:'We can send short voice messages when we are busy.',positiveReply:'I would really like that. Let us compare our schedules and choose a time when neither of us feels rushed.',negativeReply:'That works for me. We can leave each other messages without expecting instant replies. I miss you too.',result:'Plan to stay connected'};
 if((kind==='social'||kind==='chat')&&t.title==='Discuss a child\'s school day')return {prompt:'Would you like to tell me more about the best part or the difficult part of school?',positive:'Let us talk about the good part first.',negative:'I would like help with the difficult part.',positiveReply:'I am listening. Tell me what made you smile today, and then we can look at your homework if you want.',negativeReply:'Of course. We can work through it together without rushing. Tell me which part felt hard.',result:'Supportive family conversation'};
 if((kind==='social'||kind==='chat')&&t.title==='Resolve a disagreement')return {prompt:'Would you like to share what you understood or agree on a way forward?',positive:'I want to make sure I understood how you felt.',negative:'Could we talk about what to do differently next time?',positiveReply:'Thank you for listening. Let me explain how I felt, and please tell me if I misunderstood your side too.',negativeReply:'Yes. We can each suggest one change and agree on what feels fair without blaming each other.',result:'Disagreement discussed respectfully'};
 if((kind==='social'||kind==='chat')&&t.title==='Plan a birthday party')return {prompt:'Should we start with the guest list and date or choose the food and cake?',positive:'Let us check the date and invitees first.',negative:'Could we compare cake and food options within our budget?',positiveReply:'Good idea. I will ask the family about the date and list the guests before we send invitations.',negativeReply:'Absolutely. We can compare sizes, dietary preferences and prices before ordering anything.',result:'Birthday planning discussed'};
 if(kind==='social'||kind==='chat')return {prompt:'Would you like to keep talking, or wrap up for now?',positive:'I would like to hear your thoughts on what we discussed.',negative:'Thank you. We can pick this up another time.',positiveReply:`I appreciate you bringing this up. We can share what we each think about ${label}, without pressure to agree or make a plan.`,negativeReply:'Of course. It was nice talking with you. We can chat another time.',result:'Friendly conversation'};
 if(kind==='work')return {prompt:'Should we clarify responsibility and timing, or discuss another way to handle this?',positive:'Could we agree on one practical next step?',negative:'Could we review another option before making a decision?',positiveReply:`For ${label}, let's confirm what needs doing, who is responsible and which workplace approval is required. Nothing is approved until the responsible person agrees.`,negativeReply:'Absolutely. We can discuss alternatives and check the applicable workplace policy.',result:'Workplace next step discussed'};
 if(kind==='service')return {prompt:'Would you like to try a safe next step or obtain an estimate or official guidance first?',positive:'Please explain the next safe check.',negative:'I want the estimate or service conditions before proceeding.',positiveReply:`For ${label}, we can check the relevant symptoms or requirements using safe, reversible steps. We will not assume a repair was successful before verifying the result.`,negativeReply:'That makes sense. Review any written estimate, data risks, and terms before agreeing to paid work.',result:'Safe service steps explained'};
 return {prompt:'Would you like the relevant next step or more information before deciding?',positive:'Please explain what I should do next.',negative:'I would rather review the conditions first.',positiveReply:`For ${label}, we can check the exact instructions, responsible person and requirements before any action is confirmed.`,negativeReply:'Of course. Review the details first and come back with questions when you are ready.',result:'Information provided'};
}
function nextStepMessage(mode){
 const t=current(),r=route(),plan=groundedAction();
 if(mode==='alternative')return `I understand that ${r.focus} may not be suitable as discussed. We can consider a different option without assuming one is available. ${plan.prompt}`;
 if(mode==='conditions')return `${r.terms} ${plan.prompt}`;
 if(scenarioKind()==='chat'||scenarioKind()==='social')return `That makes sense. ${plan.prompt}`;
 return `Thank you for clarifying your situation. ${plan.prompt}`;
}
function chooseDirection(mode){
 snapshot();
 const say=mode==='continue'?'That helps. What would be the appropriate next step?':mode==='alternative'?'What if that option does not work for me?':'Could we check the relevant conditions before I decide?';
 add('you',say);add('npc',nextStepMessage(mode));state.mode=mode;state.stage=5;save();render();
}
function confirmDirection(choice){
 snapshot();
 if(choice==='another'){
  add('you','Could we try a different option for my original request?');
  add('npc',`Certainly. Let's keep your original request in mind: ${route().focus}. ${groundedAction().prompt}`);
  state.stage=4;save();render();return;
 }
 add('you','Could we go through the next step without assuming anything has been approved?');
 add('npc',groundedAction().prompt);state.stage=6;save();render();
}
function beginResolution(){
 snapshot();const plan=groundedAction();
 add('you','Yes, please explain the available next steps for my situation.');
 add('npc',plan.prompt);state.stage=8;save();render();
}
function resolutionOptions(){
 const plan=groundedAction();
 return [[plan.positive,'proceed'],[plan.negative,'alternative'],['Thank you. I prefer to stop here without taking action.','decline']];
}
function finishWithOutcome(outcome){
 snapshot();const plan=groundedAction();const [say]=resolutionOptions().find(x=>x[1]===outcome)||[];
 if(!say)return;
 add('you',say);
 const reply=outcome==='proceed'?plan.positiveReply:outcome==='alternative'?plan.negativeReply:
  (familyLike()?'Of course. It was nice talking. We can continue another time.':'Of course. We will not proceed without your decision. Thank you for speaking with us.');
 add('npc',reply);
 state.outcome=outcome==='proceed'?plan.result:outcome==='alternative'?'Alternative or further review': 'No commitment made';
 state.stage=9;save();render();
}
function extraFollowup(){
 snapshot();state.extraCount++;
 add('you','Before I go, what should I check or remember about this request?');
 const {r}=conversationContext();
 add('npc',`${r.terms} ${groundedAction().result}. You can ask a specific question or contact the appropriate person for confirmation.`);
 state.stage=9;save();render();
}
function choosePhoneModel(model){
 snapshot();state.phoneModel=model==='samsung'?'Samsung Galaxy S24':'iPhone 17 Pro Max';
 add('you',model==='samsung'?'Could I see the Samsung Galaxy S24?':'Could I see the iPhone 17 Pro Max?');
 add('npc',`Of course. Here's the ${state.phoneModel}. You can compare the camera and screen before choosing the configuration. Would you prefer 128 GB in black or 256 GB in blue?`);
 state.stage=11;save();render();
}
function choosePhoneVariant(variant){
 snapshot();state.phoneVariant=variant==='black'?'128 GB · black':'256 GB · blue';
 add('you',`I would like the ${state.phoneVariant} version.`);
 add('npc',`Great. We have selected the ${state.phoneModel} (${state.phoneVariant}). Let's confirm the displayed total and the manufacturer's warranty. Would you like to pay by cash, card, or decide later?`);
 state.stage=12;save();render();
}
function finishPhonePayment(method){
 snapshot();add('you',method==='card'?'I will pay by card, please.':'I will pay in cash, please.');
 add('npc',`Thank you. The ${state.phoneModel} (${state.phoneVariant}) has been paid for by ${method}, and here's your receipt and warranty information. Enjoy your new phone!`);
 state.outcome='Phone purchased';state.stage=9;save();render();
}
function finishEnd(){
 snapshot();add('you',familyLike()?'It was really nice talking with you. See you soon!':'Thank you for explaining everything. Have a nice day!');
 add('npc',familyLike()?'You too! I am glad we had time to talk. Take care!':
 'You are very welcome. I am glad I could help. Have a good day!');
 state.ended=true;state.stage=10;save();render();
}
function endWithoutAction(){
 snapshot();add('you',familyLike()?'I need to go now, but it was nice talking.':'Thank you. I would rather not proceed at the moment.');
 add('npc',familyLike()?'Of course! Thanks for chatting. We can continue another time.':'Of course. No further action has been taken. Thank you for checking with us and have a good day.');
 state.outcome='No commitment made';state.ended=true;state.stage=10;save();render();
}
/* Café conversation: a real order, seating enquiry and mistaken-drink complaint
   must never collapse into the same checkout or closing sequence. */
function cafeOptions(){
 if(current()?.title!=='Order at a café'||state.ended)return null;
 const c=(label,fn)=>({label,fn});
 const option=(label,next,npc,fields={})=>c(label,()=>{
  snapshot();add('you',label);add('npc',npc);state.cafe={...(state.cafe||{}),...fields};
  state.stage=next;if(next===40){state.ended=true;state.outcome=d.canceled?'No order placed':(d.remedy||d.payment?'Café request completed':'Café conversation finished');}save();render();
 });
 if(state.route===-1)return null;
 const r=state.route, d=state.cafe||{};
 if(r===0){
  if(state.stage===30)return [
   option('A small hot latte, please.',31,'Sure. Would you like regular milk or a different kind?',{drink:'small hot latte'}),
   option('A medium iced coffee, please.',31,'Of course. What milk and sweetness would you prefer?',{drink:'medium iced coffee'}),
   option('What kinds of coffee do you have?',30,'We offer espresso, cappuccino, lattes and iced coffee. Would you like something hot or iced?')];
  if(state.stage===31)return [
   option('Regular milk and no extra sugar, please.',32,`Got it: ${d.drink||'coffee'} with regular milk and no extra sugar. Is that for here or to go?`,{milk:'regular milk',sweet:'no added sugar'}),
   option('Oat milk, please. Is there an extra charge?',32,`I can check the oat milk option and its price. Your ${d.drink||'coffee'} will be made with oat milk if you confirm. For here or to go?`,{milk:'oat milk',sweet:'unspecified'}),
   option('Actually, I need to change my drink.',30,'No problem. We have not started the order yet. What would you like instead?',{drink:null,milk:null})];
  if(state.stage===32)return [
   option('To go, please.',33,`Perfect. I'll prepare your ${d.drink||'coffee'} with ${d.milk||'the selected milk'} for takeaway. Would you like anything else?`,{takeout:true}),
   option("I'll have it here, please.",33,`Of course. We can serve your ${d.drink||'coffee'} here. Would you like anything else?`,{takeout:false})];
  if(state.stage===33)return [
   option("No thanks, that's everything. What is my total?",34,`Your order is one ${d.drink||'coffee'} with ${d.milk||'your selected milk'}. We'll confirm the displayed total, including any milk surcharge, before payment. Is the order correct?`,{food:'none'}),
   option('Could I add a croissant?',34,`Certainly. I'll add a croissant and confirm the combined total with your ${d.drink||'coffee'}. Is that everything?`,{food:'croissant'}),
   option('Actually, I do not want to order anymore.',39,'No problem. Nothing has been prepared or charged.',{canceled:true})];
  if(state.stage===34)return [
   option('Yes, that is my order. I will pay by card.',38,`Thank you. Your card payment for the ${d.drink||'coffee'}${d.food==='croissant'?' and croissant':''} is approved. Here is your receipt. ${d.takeout?'Your takeaway order will be ready at the counter.':'We will bring the order to your table.'}`,{payment:'card'}),
   option('Yes, that is correct. I will pay cash.',38,`Thank you. Your cash payment for the ${d.drink||'coffee'}${d.food==='croissant'?' and croissant':''} is complete. Here's your receipt.`,{payment:'cash'}),
   option('Wait, I need to change my drink.',30,'Of course. We have not charged you. Which drink would you prefer?',{drink:null,milk:null}),
   option("I won't order after all.",39,"That's completely fine. Nothing has been charged.",{canceled:true})];
 }
 if(r===1){
  if(state.stage===30)return [
   option('Could I sit somewhere quiet, away from the entrance?',31,'Let me check. A quieter table is available. Would you like to sit there?',{seating:'quiet corner'}),
   option('Is a window seat available?',31,'A window seat is available right now. Would you like it?',{seating:'window'}),
   option("It seems busy. I'll take something to go.",35,'No problem. What would you like to take away?',{seating:'takeaway'})];
  if(state.stage===31)return [
   option('Yes, I would like that table.',32,`Of course. The ${d.seating||'requested'} table is yours for this visit. Would you like to order something?`),
   option('Actually, I will not sit today.',39,'No problem. We have not reserved a table or charged you.',{canceled:true})];
  if(state.stage===32)return [
   option('A cup of hot tea, please.',36,'Certainly. I can offer black tea or milk tea. Which would you prefer?',{drink:'hot tea'}),
   option("I'd like a coffee to drink here.",36,'Of course. We have a latte or regular coffee. Which do you prefer?',{drink:'coffee'}),
   option('I only wanted to ask about the seating.',39,'That is perfectly fine. You are welcome to return another time.',{canceled:true})];
  if(state.stage===35)return [
   option('A small latte to go, please.',36,'Certainly. Would you like regular milk or oat milk?',{drink:'small latte to go'}),
   option('I have decided not to buy anything.',39,'No problem at all. Have a good day.',{canceled:true})];
  if(state.stage===36)return [
   option('The regular option is fine. What is the total?',37,`Great. We'll confirm the price for your ${d.drink||'drink'} before taking payment.`),
   option('Do you have a dairy-free option?',37,`We can check the available alternatives for your ${d.drink||'drink'} and confirm any price difference.`),
   option('I will decide later.',39,'Of course. No order has been placed.',{canceled:true})];
  if(state.stage===37)return [
   option('That works. I will pay by card.',38,`Thank you. Your card payment went through. Your ${d.drink||'drink'} order is confirmed. Enjoy your visit.`,{payment:'card'}),
   option('I will pay cash, please.',38,`Thank you. Your cash payment for the ${d.drink||'drink'} is complete.`,{payment:'cash'}),
   option('I will not order anything today.',39,'No problem. Nothing has been charged.',{canceled:true})];
 }
 if(r===2){
  if(state.stage===30)return [
   option('I asked for oat milk, but this tastes like regular milk.',31,'I am sorry. Since you requested oat milk, we should check the original ticket and remake the drink correctly. Is this because of an allergy?',{problem:'wrong milk'}),
   option('I ordered an iced coffee, but I got a hot one.',32,'Sorry about that. We need to check the original order and prepare the iced version you requested.',{problem:'wrong temperature'}),
   option('This is a large drink, but I paid for a small.',32,'Thank you for pointing that out. Let me compare the size and receipt so we can correct it.',{problem:'wrong size'})];
  if(state.stage===31)return [
   option('Yes. I have a dairy allergy.',32,'Thank you for explaining. I will flag the allergy and check whether staff can prepare the drink safely, including cross-contact procedures. I cannot promise safety without confirmation.',{allergy:true}),
   option('No allergy. It is a preference.',32,'Understood. We should still make the drink exactly as ordered.',{allergy:false})];
  if(state.stage===32)return [
   option('I have the receipt here.',33,'Thank you. I can compare the receipt with the drink and the order ticket.',{proof:'receipt'}),
   option("I don't have the receipt, but I just ordered here.",33,'That is okay. We can try to find the recent order in the café system.',{proof:'lookup'})];
  if(state.stage===33)return [
   option('Could you remake the drink correctly?',38,d.allergy?'I understand. We must first check with staff whether the allergy can be safely accommodated; if not, we should not prepare another drink. I am sorry for the mistake.':'Certainly. We have verified the original request and can prepare a corrected replacement. Sorry for the mistake.',{remedy:'remake'}),
   option('I would prefer a refund instead.',38,'I understand. The manager will check the original transaction and the applicable refund policy before confirming any adjustment. We will not assume a refund has already been issued.',{remedy:'refund review'}),
   option('Could I speak with the manager?',38,'Of course. The manager can review the original order and explain the available options. I apologize for the inconvenience.',{remedy:'manager review'}),
   option('I do not want to continue with this request.',39,'I understand. I am sorry about the mistake. No further action has been taken.',{canceled:true})];
 }
 if(state.stage===38||state.stage===39)return [option('Thank you. Goodbye!',40,'You are welcome. Thank you for speaking with us. Take care.')];
 return [];
}
function cafeStart(index){
 snapshot();state.route=index;state.stage=30;state.cafe={};
 add('you',route().say);
 add('npc',index===0?'Of course. Do you prefer a hot coffee or something iced?':index===1?'I can help find a seat. Do you prefer a quiet corner or a window seat?':"I'm sorry your drink was wrong. Tell me what happened so we can fix it.");save();render();
}

function stageOptions(){
 const t=current(),r=route();if(!t||state.ended)return [];
 const c=(label,fn)=>({label,fn});
 if(state.route===-1)return t.routes.map((x,i)=>c(x.say,()=>t.title==='Order at a café'?cafeStart(i):chooseRoute(i)));
 if(t.title==='Order at a café'){if(state.stage===40)return [];return cafeOptions()||[];}
 if(state.stage===1)return current().generated?
  authored().choices.map((x,i)=>c(x[0],()=>chooseGeneratedStart(i))):
  r.steps[0].choices.map((x,i)=>c(x[0],()=>chooseDetail(0,i)));
 if(state.stage===2)return current().generated?
  r.steps[0].choices.map((x,i)=>c(x[0],()=>chooseDetail(0,i))):
  secondStep().choices.map((x,i)=>c(x[0],()=>chooseDetail(1,i)));
 if(state.stage===3)return current().generated?[]:
  authored().choices.map((x,i)=>c(x[0],()=>chooseCheckpoint(i)));
 if(state.stage===4)return [
  ...resolutionOptions().map(x=>c(x[0],()=>finishWithOutcome(x[1]))),
  c('Could you explain one more relevant detail before I decide?',()=>chooseDirection('conditions')),
  c('What if that option does not work for me?',()=>chooseDirection('alternative')),
  c('Actually, I want to change my original request.',changeGoal)];
 if(state.stage===5)return [
  ...resolutionOptions().map(x=>c(x[0],()=>finishWithOutcome(x[1]))),
  c('Actually, I want to change my original request.',changeGoal)];
 if(state.stage===6)return [
  c(familyLike()?'Yes, please tell me more.':'Yes, please continue with the next steps.',beginResolution),
  c('I would rather stop here for now.',endWithoutAction),
  c('Could we discuss another option before going ahead?',()=>confirmDirection('another'))];
 if(state.stage===8)return resolutionOptions().map(x=>c(x[0],()=>finishWithOutcome(x[1])));
 if(state.stage===11)return [c('128 GB in black would work for me.',()=>choosePhoneVariant('black')),c('I would prefer 256 GB in blue.',()=>choosePhoneVariant('blue')),c('Actually I am not ready to buy.',endWithoutAction)];
 if(state.stage===12)return [c('I would like to pay by card.',()=>finishPhonePayment('card')),c('Cash works better for me.',()=>finishPhonePayment('cash')),c('I want to think about it first.',endWithoutAction)];
 if(state.stage===9)return [
  c(familyLike()?'Thanks for talking with me. See you soon!':'Thanks for your help. Have a good day!',finishEnd),
  ...(state.extraCount<1?[c('Before I go, may I ask one more question?',extraFollowup)]:[]),
  c('Actually, I would like to discuss another possibility.',changeGoal)];
 return [];
}


function restore(active){
 activeIndex=topicsAll.findIndex(t=>t.title===active.title);
 if(activeIndex<0)throw Error('Unknown V4 topic: '+active.title);
 for(const key of Object.keys(state))delete state[key];
 Object.assign(state,JSON.parse(JSON.stringify(active.v4State)));
}
function store(active){active.v4State=JSON.parse(JSON.stringify(state));}
function isTerminal(){return !!state.ended||state.stage===40;}
function plainNe(){return '';}
function nativeStep(node){
 const opts=stageOptions();
 const last=state.messages.slice().reverse().find(m=>m.role==='npc');
 const message=last?.text||current().hello;
 const list=opts.map((o,i)=>({value:o.label,ne:'',next:'v4-choice',index:i,patch:{},correct:true}));
 if(!list.length)list.push({value:'Thank you. Goodbye!',ne:'धन्यवाद। बिदा!',next:'v4-close',index:-1,patch:{},correct:true});
 return {nodeId:node,npc:message,npcNe:plainNe(),speaker:current().role,
  storeOptions:list,answer:list[0].value,answerNe:list[0].ne,
  goal:'Choose the response that matches your situation.'};
}
function start(scene){
 const i=topicsAll.findIndex(t=>t.title===scene.title);
 if(i<0)return null;
 activeIndex=i;
 for(const key of Object.keys(state))delete state[key];
 Object.assign(state,{route:-1,stage:0,ended:false,messages:[],facts:[],extraCount:0,outcome:'',mode:'',cafe:{}});
 add('npc',current().hello);
 const original=scene.coachOriginal||scene;
 const active={...original,coachOriginal:original,isBranchingV4:true,v4State:null,
  v4Completed:false,coachStyle:'Real-life conversation · वास्तविक कुराकानी',
  steps:[nativeStep('v4-opening')]};
 store(active);return active;
}
function choose(active,item,index){
 if(!active?.isBranchingV4||active.v4Completed||index!==active.steps.length-1)throw Error('V4 turn out of sync');
 restore(active);
 if(item.next==='v4-close'){active.v4Completed=true;store(active);return {finished:true};}
 const choices=stageOptions(),selected=choices[item.index];
 if(!selected||selected.label!==item.value)throw Error('V4 selected answer changed');
 selected.fn();
 // Preserve the full branch state, including cancellation, changed requests and cafe specifics.
 store(active);
 if(active.steps.length>=48){active.v4Completed=true;return {finished:true};}
 active.steps.push(nativeStep('v4-'+active.steps.length));
 active.steps[index].after=active.steps[index+1].npc;
 return {finished:false};
}
function options(step){return {multi:true,branching:true,options:step.storeOptions.map(x=>({...x}))};}
function reconcile(active,index,pending){
 if(!active?.isBranchingV4)return false;
 // Do not silently replace old dialogue on refresh. Stored native turns and the
 // exact V4 state survive as one per-account draft.
 return !!active.steps[index]?.nodeId?.startsWith('v4-');
}
window.sikauV4Story=Object.freeze({start,choose,options,reconcile,topics:topicsAll.map(t=>t.title)});
})();
