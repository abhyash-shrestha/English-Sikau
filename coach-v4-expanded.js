/* Exact reviewed V4 extended topics and their specialized follow-ups. */
(function(){
'use strict';
const catalog = [["💳","Lost debit card","money","Bank support agent","I lost my debit card and need to protect my account.","I see a card transaction I don't recognize.","I'd like to replace my missing card."],["📮","At the post office","service","Postal clerk","I'd like to mail a package to another city.","I need to send an important letter with tracking.","I'm checking why my parcel hasn't arrived."],["🔧","At the car mechanic","repair","Mechanic","My car is making a strange noise.","I'd like an estimate for a routine service.","My car stopped starting this morning."],["📖","At the public library","education","Librarian","I'm trying to borrow a book.","I'd like to use a computer or study space.","I want to learn how to get a library card."],["👟","Buy shoes","shop","Shoe assistant","I need comfortable shoes for walking.","Could I try the same shoes in another size?","I'm comparing these two pairs of shoes."],["👓","Shop for glasses","shop","Optician","I need new frames for my prescription.","Can you explain the difference between these lenses?","I'd like to check the total price of these glasses."],["🛋️","Buy furniture","shop","Furniture salesperson","I'm looking for a sofa for my living room.","Would this table fit through my doorway?","Can you explain the delivery and assembly options?"],["🧊","Buy a home appliance","shop","Appliance specialist","I need a refrigerator for my apartment.","I'd like to compare the energy use of two models.","Can you explain the installation and delivery costs?"],["🎁","Choose a birthday gift","shop","Gift shop assistant","I need a birthday present for a friend.","Could I personalize this gift with a name?","Can you help with gift wrapping and delivery?"],["💍","Shop for jewelry","shop","Jeweler","I'd like to see a simple necklace.","Can you explain whether this jewelry is real silver?","What are the return and sizing policies for rings?"],["💄","Shop for cosmetics","shop","Beauty adviser","I'm looking for a moisturizer for sensitive skin.","Could you help me find the right foundation shade?","I'd like to check the ingredients before buying."],["🏷️","Compare prices in shops","shop","Store assistant","I'm comparing the price of two brands.","The shelf price looks different from the checkout price.","Which of these packages costs less per unit?"],["💸","Ask about a discount","shop","Sales assistant","Is there a sale on these items?","Do you offer a student or membership discount?","Could you explain how this promotional code works?"],["💳","Pay at the checkout","checkout","Cashier","I'd like to pay for these items by card.","Can I split the payment between cash and card?","I think the total on the receipt is wrong."],["🛒","Use self-checkout","checkout","Self-checkout attendant","The scanner won't recognize my item.","The machine shows a different price from the shelf.","I'm ready to pay, but the self-checkout is not working."],["🔌","Return an electronic item","returns","Returns associate","This electronic device stopped working, and I want to return it.","I bought this item online and want an exchange.","I lost the receipt for an unopened electronic item."],["🧾","Ask about a warranty","returns","Warranty adviser","Can you tell me what this product warranty covers?","My device broke, and I'd like to request warranty service.","I'd like to know whether repair or replacement is possible."],["📦","Pick up a store order","service","Pickup associate","I'm here to collect my online order.","I received a pickup notification but cannot find the counter.","An item seems to be missing from my pickup order."],["🪡","Get clothes altered","service","Tailor","Could you shorten these trousers for me?","This jacket needs to be taken in at the waist.","Can you tell me the price and pickup time for alterations?"],["🍕","Order pizza","food","Pizza shop cashier","I'd like to order a vegetarian pizza.","Can I change the toppings on my pizza?","I'm ordering for a group and need two different sizes."],["🍔","Order fast food","food","Fast-food cashier","Can I order a chicken burger combo?","Do you have a vegetarian meal without meat?","I need to change an item in my order."],["🥐","Buy from a bakery","food","Bakery assistant","I'd like some fresh bread, please.","I'm looking for an eggless birthday cake.","Can I order pastries for pickup tomorrow?"],["🥜","Ask about food allergies","food","Restaurant server","I have a nut allergy. Can you check this dish?","Could you tell me whether this meal contains dairy?","I'm concerned about cross-contact in the kitchen."],["🧮","Split a restaurant bill","food","Restaurant server","Could we split our bill equally between three people?","I'd prefer to pay only for what I ordered.","I don't understand a charge on our bill."],["🍽️","Fix a wrong food order","food","Restaurant server","I ordered vegetarian food, but this contains meat.","One item from our order is missing.","My food was prepared differently from my request."],["📅","Ask for a restaurant table","booking","Restaurant host","Do you have a table for two this evening?","I'd like to reserve a table for a large group.","I need to change an existing table request."],["🛵","Order food delivery","food","Delivery restaurant agent","I'd like dinner delivered to my home.","How much is delivery, and how long will it take?","The driver needs extra instructions to find my address."],["🥫","Check food freshness","shop","Grocery employee","Could you help me check the expiration date?","I'd like a fresher replacement for these vegetables.","This food package is damaged and I want to report it."],["🥟","Order Nepali food","food","Restaurant server","I'd like an order of momo.","Could you make the chow mein less spicy?","I'm ordering a Nepali thali for two people."],["🍜","Find a budget meal","food","Food vendor","What's a filling meal I can get on a small budget?","Do you have an affordable vegetarian option?","Could you compare the value of two meal combos?"],["🚕","Book a taxi","transport","Taxi dispatcher","I need a taxi to the airport.","Can you confirm the pickup location for my ride?","Could you give me an estimated fare before I book?"],["🚗","Meet a rideshare driver","transport","Rideshare driver","I'm having trouble finding the pickup location.","Could you help me confirm your vehicle details?","I'm standing at a different entrance from the pickup pin."],["🚆","Buy a train ticket","transport","Station ticket agent","I'd like a one-way ticket for tomorrow.","Can you explain the difference between ticket classes?","I need to change my travel date."],["🚌","Miss a bus","transport","Transit employee","I missed the last bus to my destination.","Can I use my ticket on the next departure?","Could you help me find another route home?"],["🧳","Report missing luggage","travel","Airline baggage agent","My checked suitcase did not arrive.","I received a bag, but it isn't mine.","How can I check the status of a missing-bag report?"],["🛂","Ask about airport security","travel","Airport security information agent","What items may I pack in my carry-on?","I need to know what to do with my laptop at screening.","I have a question about carrying prescribed medicine."],["🛫","Ask about a flight delay","travel","Airline customer service","My flight is delayed, and I have a connection.","Can you tell me the updated departure time?","I'd like to understand my rebooking options."],["🛏️","Report a hotel room issue","service","Hotel receptionist","The air conditioner in my room isn't working.","My room is too noisy to sleep.","I was given a room that doesn't match my booking."],["🧾","Check out of a hotel","service","Hotel receptionist","I'd like to check out now, please.","Could I request a late checkout?","There's a charge on my hotel bill that I don't recognize."],["🚙","Rent a car","booking","Rental car agent","I'd like to rent a compact car for three days.","Could you explain the insurance and deposit?","I need to change my rental pickup time."],["⛽","At a gas station","service","Station attendant","Could you show me how to use this fuel pump?","I think the pump charged the wrong amount.","Do you have an air pump for my tires?"],["🛞","Call roadside assistance","repair","Roadside assistance dispatcher","My tire is flat, and I need help.","My car won't start in a parking lot.","I broke down beside the highway and need a tow."],["🗺️","Ask at a visitor center","travel","Visitor center staff","Could you suggest scenic places to visit today?","Where can I get maps and public transit information?","Are any tours or attractions suitable for families?"],["🛃","Ask about customs rules","travel","Customs information officer","I'm unsure what items I need to declare.","Can I bring gifts or food through customs?","Where can I find the official allowance and duty rules?"],["🩺","Schedule a checkup","health","Clinic receptionist","I'd like to schedule a routine health checkup.","Could you explain what paperwork I need?","Can I change the date of my existing appointment?"],["💻","Join a telehealth visit","health","Telehealth coordinator","I can't join my scheduled video appointment.","I'm checking whether my microphone and camera work.","I'd like to know how to prepare for a virtual visit."],["🏥","Visit urgent care","health","Urgent care receptionist","Could you explain how walk-in visits work?","What documents and insurance details should I bring?","I need to speak with clinical staff about an urgent concern."],["🪪","Call health insurance","health","Insurance customer service","I'd like to check whether a clinic is in my network.","Can you explain a claim or charge on my statement?","I need help understanding the difference between my benefits."],["💊","Request a medicine refill","health","Pharmacy technician","I'd like to check if my refill is ready.","The prescription has no refills left.","I need to change my prescription pickup location."],["👁️","Book an eye exam","health","Optometry receptionist","I'd like to schedule an eye exam.","Can you tell me whether eye exams are covered by my plan?","I need to reschedule my existing eye appointment."],["🦷","Schedule teeth cleaning","health","Dental receptionist","I'd like to book my next dental cleaning.","What should I expect at the first cleaning visit?","I need to change or cancel my cleaning appointment."],["💉","Ask about a vaccination visit","health","Clinic receptionist","I'd like to ask which vaccination appointments are offered.","What should I bring for a vaccination visit?","Could you help me schedule a consultation with a clinician?"],["📋","Request medical records","health","Medical records clerk","I'd like a copy of my medical records.","Can you explain how to send records to another provider?","I want to check the status of my records request."],["🧪","Visit a laboratory","health","Laboratory receptionist","I'm here for a blood test ordered by my doctor.","Do I need an appointment or any preparation instructions?","When and how will I receive my lab results?"],["🌿","Ask about counseling","health","Counseling intake coordinator","I'm interested in booking an initial counseling session.","Could you explain privacy and payment arrangements?","I'd like to find a counselor who speaks my preferred language."],["📄","Apply for a job","work","Recruiter","I'd like to apply for an open position.","Can you explain the qualifications required for this job?","Could you tell me what happens after I submit my application?"],["💼","Discuss salary and pay","work","Human resources representative","Could you explain the hourly pay for this role?","I think there's an error on my paycheck.","I'd like to ask how pay increases are reviewed."],["👩‍🏫","Ask for job training","work","Workplace trainer","I'd like more training on the register system.","Could someone show me how to do this task safely?","I want to learn what training is available for advancement."],["🛠️","Report a mistake at work","work","Supervisor","I made an error while entering a customer order.","I noticed an inventory count that doesn't match.","I made a mistake and want to correct it before it causes problems."],["📞","Call out sick from work","work","Shift supervisor","I'm sick and won't be able to work today.","I may need another day off to recover.","Could you explain the call-out and sick-leave procedure?"],["🏖️","Request vacation time","work","Manager","I'd like to request vacation next month.","Can you explain how much leave I have available?","I need to change the dates of a time-off request."],["🤝","Ask a coworker for help","work","Coworker","Could you help me finish this delivery?","I'm stuck on a task I haven't done before.","Can you cover the counter for a few minutes?"],["🗣️","Handle a customer complaint","work","Customer service supervisor","A customer says they were charged incorrectly.","A customer received an item that isn't working.","A customer is upset and wants to speak with a manager."],["👥","Speak in a team meeting","work","Team lead","I'd like to share an update on my work.","I have an idea to improve our process.","I need to raise a problem affecting the team's schedule."],["📈","Discuss career growth","work","Manager","I'd like to learn about promotion opportunities.","Could you give me feedback on my performance?","What skills should I develop for a different role?"],["✉️","Resign professionally","work","Manager","I'd like to give formal notice that I'm resigning.","Could we discuss my final day and handover?","I want to understand my final pay and benefits."],["🔧","Call a home repair service","home","Home repair coordinator","I need someone to fix a broken door.","Could you provide an estimate for a home repair?","I'd like to schedule a repair visit for next week."],["💇","Get a haircut","booking","Hair salon receptionist","I'd like a haircut appointment today.","Could I explain the style and length I want?","How much would a haircut cost here?"],["🧺","Use a laundry service","service","Laundry attendant","I'd like to drop off clothes for washing.","Can you explain how delicate items are handled?","When can I pick up my laundry, and how much will it cost?"],["📦","Send a package abroad","service","Shipping clerk","I'd like to send this package to Nepal.","Can you explain tracking and delivery options?","I need to check customs forms and shipping costs."],["🖊️","Ask about notarizing documents","service","Notary clerk","I need to have a document notarized.","What identification must I bring for notarization?","Could you tell me the cost and appointment process?"],["🪪","Ask about an ID card","service","Government service clerk","I'd like to apply for a new identification card.","I lost my ID and need a replacement.","What documents are required to update my ID?"],["🚘","Renew a driving license","service","Licensing clerk","I'd like to renew my driving license.","Can I check the required documents and fees?","My license expired. What steps should I follow?"],["💡","Ask about an electricity bill","home","Utility billing agent","My electricity bill seems unusually high.","I want to understand the charges on this bill.","Could you explain payment plans or due dates?"],["🚰","Ask about water service","home","Water utility representative","I need to start water service at a new address.","I'd like to report low water pressure at home.","There's a charge on my water bill I don't understand."],["📶","Question an internet bill","home","Internet billing agent","My internet bill went up unexpectedly.","I'm being charged for equipment I returned.","Could you explain my promotional rate and monthly total?"],["📱","Change a mobile phone plan","tech","Mobile plan representative","I'd like a cheaper phone plan.","I need more mobile data every month.","Could I transfer my number to another plan?"],["🗝️","Ask for a locksmith","repair","Locksmith dispatcher","I'm locked out of my apartment.","I'd like to change the locks after moving.","Can you give me a quote to repair a damaged lock?"],["🔊","Report a noise problem","home","Property manager","There's loud noise from a neighboring apartment.","Construction noise is continuing late at night.","I'd like to know how to make a respectful noise complaint."],["🏘️","Meet a new neighbor","social","Neighbor","Hi, I just moved into the building.","I wanted to introduce myself and say hello.","Could you recommend a nearby grocery store?"],["🤲","Borrow something politely","social","Friend","Could I borrow your umbrella for the afternoon?","May I borrow your book until the weekend?","Could you lend me a phone charger for a few minutes?"],["🎉","Invite a friend to an event","social","Friend","Would you like to come to a concert with me?","I'm planning a small dinner. Are you free?","A local festival is happening. Would you like to join us?"],["🙇","Politely decline an invitation","social","Friend","Thanks for inviting me, but I have another plan.","I appreciate the invitation, but I'm not feeling well.","I can't attend this time. Could we plan something another day?"],["🙏","Apologize for a mistake","social","Friend","I'm sorry I forgot our meeting.","I accidentally damaged something you lent me.","I'm sorry my message sounded rude."],["🌤️","Make small talk","social","Acquaintance","It's a beautiful day, isn't it?","How has your week been so far?","Have you tried the new café nearby?"],["📆","Plan a weekend","social","Friend","Would you like to go hiking this weekend?","I'm thinking about seeing a movie on Saturday.","Do you want to explore a nearby town together?"],["🫶","Ask someone for a favor","social","Friend","Could you give me a ride to the station?","Would you mind helping me carry these boxes?","Could you watch my plants while I'm away?"],["🔎","Find a lost item","service","Lost-and-found attendant","I think I left my bag here yesterday.","I've lost my keys. Has anyone turned them in?","Could you explain how to report a missing item?"],["🎨","Talk about hobbies","social","New friend","I really enjoy photography. What about you?","I've been trying to learn guitar recently.","Do you have a hobby you'd recommend for beginners?"],["🛏️","Ask about a room for rent","home","Landlord","I'm interested in the furnished room you advertised.","What is the monthly rent and security deposit?","Could I arrange a viewing before deciding?"],["🚚","Plan a house move","home","Moving coordinator","I'd like an estimate for moving my furniture.","Could we reserve movers for the first weekend next month?","How will you protect fragile items during the move?"],["🚿","Call a plumber","repair","Plumber","There's a leak under my kitchen sink.","My bathroom drain is blocked.","Could you give me an estimate before repairing the tap?"],["🌡️","Report a heating problem","repair","Maintenance coordinator","My apartment heating isn't working.","The thermostat shows an error message.","When can maintenance inspect a noisy heater?"],["❄️","Report an air-conditioner problem","repair","Maintenance coordinator","The air conditioner is running but not cooling.","My AC makes an unusual rattling noise.","Could someone inspect the air conditioner before I replace it?"],["🧹","Book a cleaning service","booking","Cleaning coordinator","I'd like a one-time deep cleaning for my home.","Do you offer regular weekly cleaning?","What cleaning products do you use around pets?"],["🏡","Receive a home delivery","service","Courier","I'm home, but I can't find the delivery driver.","Could you leave the package at the correct entrance?","The package was delivered to the wrong door."],["🧰","Ask a landlord for repairs","home","Landlord","The kitchen window is broken and needs repair.","I've reported a leak before, but it still hasn't been fixed.","When could we schedule someone to inspect the heating?"],["📋","Discuss household supplies","social","Housemate","We're running low on groceries and cleaning supplies.","Could we split the cost of household supplies fairly?","We need a better way to organize our shared storage."],["💧","Set up utilities when moving","home","Utility agent","I'd like to start electricity service at my new home.","I need to transfer my gas account to another address.","Could you explain when to activate water service?"],["🎒","Ask about school enrollment","education","School administrator","I'd like to ask how to enroll my child.","What documents are needed for school registration?","Could we arrange a school visit before applying?"],["🎓","Apply to a college","education","Admissions adviser","I'd like information about applying to this college.","Could you explain the application deadline and transcripts?","I'm trying to choose between two study programs."],["💰","Ask about student financial aid","education","Financial aid adviser","I'd like to know how to apply for financial aid.","What scholarships might I be eligible to apply for?","Could you explain the cost of tuition and fees?"],["📚","Join an English class","education","Course coordinator","I want to find an English class at my level.","What days and times do your classes meet?","Could you explain the enrollment fees and materials?"],["✏️","Hire a tutor","education","Tutoring coordinator","I'm looking for a tutor to improve my English writing.","Could someone help me with mathematics practice?","How much does tutoring cost, and are sessions online?"],["📝","Ask for homework feedback","education","Teacher","Could you help me correct my paragraph?","I don't understand your feedback on my homework.","How can I make my answer clearer and more detailed?"],["👥","Organize a group project","education","Classmate","Could we divide the project tasks fairly?","When should our group meet to practice?","One group member isn't completing their work."],["🤫","Reserve a study room","booking","Librarian","I'd like to book a quiet study room tomorrow.","How long may I reserve the room?","Is there a group study room available this afternoon?"],["📖","Ask about an exam","education","Teacher","What topics should I prepare for the exam?","Could you recommend practice questions?","What do I need to bring on exam day?"],["🖥️","Join an online course","education","Online course adviser","I'd like to enroll in an online course.","What computer or language skills are required?","Do I get a certificate when I finish?"],["📲","Fix phone Wi-Fi","tech","Technical support specialist","My phone cannot connect to Wi-Fi.","The phone keeps disconnecting from the network.","My phone connects, but websites won't load."],["💻","Ask about a slow computer","tech","Computer technician","My laptop takes a long time to start.","Programs are freezing while I work.","Can we check whether I need an upgrade?"],["🖨️","Fix a printer problem","tech","Printer support specialist","My printer is showing as offline.","The printer keeps jamming paper.","My printed pages are coming out blank."],["🔐","Reset an account password","tech","Account support agent","I forgot my account password.","I'm not receiving the password reset email.","I think someone else accessed my account."],["🎥","Join a video call","tech","Video call support agent","I can't hear the other people in my video call.","My camera isn't turning on.","I need help sharing my screen safely."],["🛡️","Report a suspicious message","tech","Security help desk","I received a text asking for my password.","Someone sent me a suspicious attachment.","I clicked an unfamiliar link. What should I do now?"],["🔄","Ask about a software update","tech","IT support specialist","My computer says an update is available.","The software update failed halfway through.","Can I postpone this update without risking my data?"],["📁","Move files between devices","tech","Device support specialist","I'd like to transfer photos to my new phone.","How can I move documents from my laptop to a tablet?","I don't want to lose files when changing devices."],["📶","Buy a mobile data package","tech","Mobile carrier agent","I need more data for this month.","Which mobile data package is most affordable?","How can I check how much data is left?"],["🤖","Ask how to use an AI assistant","tech","Digital skills coach","How can I use AI to practice my English?","I'd like help drafting a polite email.","How do I check whether an AI answer is accurate?"],["📨","Send an email attachment","tech","Computer instructor","How do I attach a PDF to an email?","My attachment is too large to send.","How can I check that I sent the correct file?"],["🏦","Deposit money at a bank","money","Bank teller","I'd like to deposit cash into my account.","Can I deposit a check using the bank's services?","When will my deposit be available?"],["💵","Withdraw cash","money","Bank teller","I'd like to withdraw some cash from my account.","Is there a daily withdrawal limit?","The ATM didn't give me all the cash I requested."],["🏦","Open a bank account","money","Bank representative","I'd like to open a savings account.","Can you explain account fees and minimum balances?","What identification do I need to open an account?"],["🧾","Dispute a bank charge","money","Bank support agent","I don't recognize this charge on my statement.","I was charged the same amount twice.","Could you explain the formal dispute process?"],["💱","Exchange money","money","Currency exchange clerk","I'd like to exchange dollars for Nepali rupees.","Can you explain today's exchange rate and fees?","I'd like to compare how much cash I would receive."],["🌎","Send money to Nepal","money","Remittance agent","I'd like to send money to my family in Nepal.","Can you explain the exchange rate and transfer fees?","How can my family receive the transfer securely?"],["💳","Pay a credit card bill","money","Bank support agent","I'd like to pay my credit card bill.","What is the difference between minimum payment and full balance?","I made a payment, but it hasn't posted yet."],["📄","Ask about a personal loan","money","Loan officer","Can you explain the requirements for a personal loan?","I'd like to compare interest rates and total borrowing costs.","What happens if I pay off a loan early?"],["📊","Plan a monthly budget","money","Financial educator","I need help tracking my monthly expenses.","How much should I set aside for savings?","Can you help me plan around a changing income?"],["🏠","Discuss paying rent","money","Property manager","Could you explain the accepted rent payment methods?","My rent payment is showing as late, but I paid on time.","I'd like to discuss a payment arrangement before the due date."],["🎪","Ask about a community event","community","Event organizer","What activities are happening at the community event?","Where and when will the event take place?","Do I need tickets or registration to attend?"],["🙌","Sign up to volunteer","community","Volunteer coordinator","I'd like to volunteer at the next community event.","What tasks can new volunteers help with?","Could you explain the volunteer schedule and training?"],["🏋️","Ask about a gym membership","community","Gym representative","How much does a gym membership cost?","Can I try the gym before signing up?","How do I cancel or pause a membership?"],["⚽","Join a sports club","community","Sports coordinator","I'd like to join a recreational soccer team.","When are practice sessions held?","Do I need special equipment or experience?"],["📗","Get a library card","community","Librarian","I'd like to apply for a library card.","What documents do I need for registration?","Can I use the library's e-books and digital services?"],["🌳","Ask about a public park","community","Park information officer","What walking trails are available in this park?","Are there picnic areas and accessible facilities?","What hours and rules should visitors know?"],["🏛️","Ask at town hall","community","Town hall receptionist","I need information about a local permit.","Where can I ask about a municipal service?","Could you explain how to contact the correct department?"],["🐕","Ask about a missing pet","community","Animal shelter volunteer","My dog is missing. Has anyone reported finding it?","I'd like to leave a missing pet report.","What should I do if I find someone else's lost pet?"],["🪔","Invite friends to a festival","social","Friend","Would you like to celebrate Dashain with us?","I'm planning a Tihar gathering this weekend.","Could I invite you to a local cultural festival?"],["🧭","Find local support services","community","Community service navigator","Where can I find language-learning support?","I'd like information about local transportation assistance.","How can I find an official community help center?"],["🥘","Plan a family meal","family","Family member","What should we cook for our family dinner?","Could we make a meal that everyone can enjoy?","How should we split the shopping and cooking?"],["❤️","Call family back home","family","Family member","Hi! I wanted to check how everyone is doing in Nepal.","How are the preparations for the upcoming festival?","Can we plan a regular time for video calls?"],["🎂","Plan a birthday party","family","Family member","I'd like to plan a birthday surprise for our family member.","What food and cake should we arrange?","How can we organize the guests and decorations?"],["👩‍🦳","Arrange family caregiving","family","Family member","We need to organize help for an older relative.","Could we divide caregiving responsibilities fairly?","How can we arrange appointments and transportation?"],["👨‍👩‍👧","Discuss a child's school day","family","Child","How was school today? I'd love to hear about it.","Was there anything difficult about your homework?","What was the most interesting thing you learned today?"],["🎊","Share good news","family","Friend or family member","I have exciting news about my new job!","I passed an important exam today.","We're planning a family celebration soon."],["🕊️","Resolve a disagreement","family","Family member","I think we misunderstood each other yesterday.","I'd like to explain how I felt without arguing.","Can we find a compromise that works for both of us?"],["🇳🇵","Plan a family visit to Nepal","family","Family member","Let's plan when we can visit our relatives in Nepal.","What places should we visit while we're there?","How should we organize the budget and travel details?"],["💌","Talk in a long-distance relationship","family","Partner","I miss talking with you during our busy days.","Could we plan a virtual date this weekend?","I'd like us to discuss how we stay connected every day."],["🛍️","Shop for family necessities","family","Family member","Let's make a list of important household purchases.","Could we compare prices before buying the supplies?","What should we buy first with our limited budget?"]];
const flows={
 shop:{
  first:['Which detail matters most before deciding?',
   ['I want to compare the fit, features, or quality first.','Let us compare the products that match your request, including what you would be giving up with a cheaper option.'],
   ['I need the final price and any conditions before choosing.','That makes sense. We will check the actual marked price, any relevant charges, and the store policy first.']],
  second:['What would you like to look at next?',
   ['Could I see another suitable option?','Of course. We can compare an alternative with the one you first considered.'],
   ['Can you confirm the exact item and whether it is available?','Yes. Let us check the size, color, model, or other relevant details before promising stock.']],
  common:['Before deciding, which concern would you like to settle?',
   ['I want to make sure this is within my budget.','I understand. We can compare the total with your budget and skip anything too expensive.'],
   ['Could you explain the return or exchange terms?','Certainly. I will explain the store conditions before you agree to a purchase.']],
  terms:'Check the exact item, availability, marked total, and exchange terms before payment.',
  next:'If you choose an item, we will confirm the exact details and total before checkout.',
  success:'Let us confirm the chosen item and final amount. Once you approve payment, we can finish checkout and give you the receipt.',
  decline:'No problem. We have not made a purchase, and you can compare other choices whenever you like.'},
 returns:{
  first:['What purchase information do you have?',
   ['I have the receipt or order confirmation.','That will help us find the purchase and check the applicable return or warranty conditions.'],
   ['I cannot find the receipt. Can you check another way?','We can explain the authorized purchase lookup process. A missing receipt may affect the available options.']],
  second:['What outcome would work best for you?',
   ['I would prefer a refund if I am eligible.','I understand. We need to verify the item, time limit, and policy before promising a refund.'],
   ['Could I have a repair or exchange instead?','We can check repair or replacement eligibility and whether the appropriate item or parts are available.']],
  common:['What would you like to clarify?',
   ['Can you explain what proof is required?','I can review the accepted documentation and identification requirements.'],
   ['Can we check the actual policy before I decide?','Absolutely. We should verify the policy rather than assume a refund is guaranteed.']],
  terms:'The item condition, purchase record, return period, and relevant warranty must be checked.',
  next:'After verification, staff can explain the eligible refund, exchange, or service options.',
  success:'I will document the request and explain the eligible resolution. We will not claim an approval before the review is finished.',
  decline:'Of course. No item has been returned or exchanged. You can review the details and come back.'},
 food:{
  first:['What would you like us to check about your food request?',
   ['Could you confirm the item and any ingredients or dietary needs?','Of course. We will review the menu item and ask the kitchen to confirm ingredients when necessary.'],
   ['What portion, price, and preparation time should I expect?','Let us check the portion and total before placing or changing any order.']],
  second:['Would you like to make any changes before we continue?',
   ['Could you adjust the preparation to my preference?','I will check which changes the kitchen can accommodate and confirm the request.'],
   ['Could we check an alternative dish or option?','Certainly. We can compare other available menu choices before you commit.']],
  common:['How would you like the order handled?',
   ['Please confirm what is included and the total.','I will repeat the complete order and price so you can correct anything before payment.'],
   ['I have a question about the order or kitchen.','Please ask. We can check the food details and escalate a concern when appropriate.']],
  terms:'Confirm ingredients, any allergies or preparation requests, item quantities, and the total before ordering.',
  next:'If the kitchen can meet your needs, we can confirm the order and whether it is for here, takeaway, or delivery.',
  success:'We will confirm the final food details and your approval before sending the order to the kitchen.',
  decline:'Certainly. We will not place or charge for an order you do not want.'},
 booking:{
  first:['What appointment or reservation details should we check first?',
   ['I would prefer a morning time if possible.','I will check the available morning times in the example schedule, rather than promise a time that has not been confirmed.'],
   ['An afternoon or weekend would be better.','Understood. We can look at the relevant afternoon or weekend availability.']],
  second:['What needs to be confirmed before reserving anything?',
   ['Could you explain the price and cancellation rules?','Certainly. We can review the fees, deposit, and any changes or cancellation conditions.'],
   ['What information or identification should I prepare?','I can explain what is usually needed and what this provider requires before confirming a booking.']],
  common:['How do you want to handle the reservation?',
   ['Please repeat the date, time, and location.','Of course. We will confirm all three before recording the reservation.'],
   ['What if I need to change the date later?','I will explain the rescheduling policy and the steps for changing a confirmed appointment.']],
  terms:'Verify the specific date, time, location, price, and cancellation policy.',
  next:'Once the exact slot and requirements are confirmed, the booking can be finalized.',
  success:'I can hold the request while we confirm the exact appointment details. Nothing is booked until you explicitly approve them.',
  decline:'No problem. We have not made a reservation. You are welcome to check another time later.'},
 service:{
  first:['Which part of the service would you like to clarify?',
   ['What details or documents do you need from me?','I will explain the information required and how to provide it through the appropriate channel.'],
   ['Can you tell me about timing and any charges?','I will check the estimated timeframe and applicable service fees before we arrange anything.']],
  second:['What would you prefer as the next step?',
   ['Could you explain the process step by step?','Certainly. I will explain the first action, what follows, and when confirmation is required.'],
   ['What are my alternatives if that does not work?','Let us review any alternative service options instead of forcing an unsuitable arrangement.']],
  common:['Is there a detail you would like in writing?',
   ['Could I have a reference or written instructions?','Yes, I can explain how to obtain an official confirmation or reference where the service provides one.'],
   ['Who should I contact if there is a problem?','I will show you how to contact the appropriate service team or supervisor.']],
  terms:'Check the correct process, identification requirements, time, fees, and cancellation or complaint rules.',
  next:'Once you understand the terms, the responsible service team can confirm the request.',
  success:'I will outline the next step and the confirmation needed. Your request is not submitted unless you choose to proceed.',
  decline:'Of course. No service request has been finalized. Thank you for checking first.'},
 checkout:{
  first:['What should we check at the register before you pay?',
   ['Could you confirm that every item was scanned correctly?','Of course. We can review the item list and quantities before payment.'],
   ['Can you explain which payment methods I can use?','We can check the supported payment options and any split-payment rules.']],
  second:['What would you like to verify next?',
   ['Please check the final amount before I approve it.','I will explain the itemized total and any applicable tax or discount.'],
   ['What happens if the payment is declined or the scanner fails?','We can check the error, retry safely when appropriate, or ask an attendant for help.']],
  common:['Would you like to confirm the receipt or make an adjustment?',
   ['I want to review my receipt and the total.','Certainly. We can compare the receipt against what you purchased.'],
   ['I need to remove or correct an item before paying.','That is fine. We will review the item and update the total before checkout.']],
  terms:'Verify items, quantities, discounts, payment method, and total before authorizing checkout.',
  next:'After you approve the correct total and payment method, the simulated checkout can be completed.',
  success:'Let us confirm the corrected total and your payment choice. In this practice example, checkout is complete only after you approve the details.',
  decline:'Certainly. The transaction has not been completed; we can pause or cancel checkout.'},
 money:{
  first:['What would you like us to verify first?',
   ['I want to check the exact amount and any fees.','Absolutely. We should review the amount, fees, and applicable limits before authorizing a financial action.'],
   ['Could you explain the secure identification process?','Yes. We can explain the official verification steps without asking you to reveal passwords or one-time codes in this chat.']],
  second:['What would help you make an informed decision?',
   ['Could I review the written terms or transaction details?','Certainly. We should make sure the terms and amounts are clear before you approve anything.'],
   ['What can I do if the transaction or request has a problem?','I can explain the official support, reporting, or dispute process for this situation.']],
  common:['How would you prefer to continue?',
   ['Please explain the next secure step.','We can explain how to use the verified bank or provider channel. No money has moved during this conversation.'],
   ['I would like to compare my options first.','That is sensible. Compare the fees, policies, and risks before deciding.']],
  terms:'Verify identities securely, exact amounts, fees, limits, and official policies before approving a financial action.',
  next:'Only the official bank or service can perform a transaction after secure authorization.',
  success:'I can explain the approved transaction or request process. No payment or account change has occurred in this preview.',
  decline:'Of course. We have not moved money or changed any account details.'},
 transport:{
  first:['Which travel detail matters most?',
   ['I need to confirm the correct route or pickup place.','Let us identify the route, destination, and pickup point before giving instructions.'],
   ['Could you explain the fare and travel time?','We should check the fare, timetable, and any additional charges rather than guess.']],
  second:['What should we check before making a travel decision?',
   ['Could you confirm the time and departure location?','Certainly. We can review the current timetable or service information for this trip.'],
   ['What if that route or time is not available?','We can compare a different route or departure if the provider offers one.']],
  common:['What would help you travel with confidence?',
   ['Can I confirm the destination and any transfers?','Yes. We should verify the route, transfer points, and correct direction.'],
   ['Are there any restrictions or documents I should know about?','I can explain where to check the provider\'s current requirements before travel.']],
  terms:'Confirm route, destination, pickup or departure point, fare, and applicable travel requirements.',
  next:'You can choose a suitable travel option once the relevant schedule and fare are verified.',
  success:'I will summarize the route or booking steps and what still needs provider confirmation.',
  decline:'No problem. We have not purchased a ticket or booked a journey.'},
 travel:{
  first:['Which travel information should we check?',
   ['Could you check the schedule, gate, or route?','We should use the latest official travel information for your specific trip.'],
   ['Could you explain the applicable rules or documents?','Yes. We can review the relevant official requirements without guessing.']],
  second:['What if your current plan changes?',
   ['What alternatives are available?','We can look at possible alternatives, subject to the actual operator\'s availability.'],
   ['Who can confirm the details officially?','I can direct you to the appropriate airline, transport desk, or official information source.']],
  common:['How would you like to continue?',
   ['Let us verify the latest information before I go.','That is a sensible approach; schedules and policies can change.'],
   ['Could I have a written summary of the steps?','I can help you list the details to check and questions to ask.']],
  terms:'Check the official operator\'s schedule, policy, required documents, and current availability.',
  next:'Travel decisions should follow verified information and your own preferences.',
  success:'I can explain the appropriate next step; the operator must confirm any real travel action.',
  decline:'Of course. No ticket or booking has been changed.'},
 repair:{
  first:['What can you tell me about the problem?',
   ['The problem started recently and seems to be getting worse.','I understand. Let us note when it began and avoid steps that could make it more serious.'],
   ['It happens only sometimes. Can we check it first?','Yes. A careful inspection can help identify the cause before replacing parts.']],
  second:['What do you want to know before authorizing work?',
   ['Could you give me a written estimate first?','Absolutely. We should explain the diagnosis, parts, labor, and estimated time before paid repairs.'],
   ['What happens if the issue cannot be fixed today?','We can discuss safe alternatives, expected follow-up, and when specialist help is needed.']],
  common:['What should we prioritize?',
   ['Please check the safest option first.','Yes. Safety comes before convenience or cost.'],
   ['I would like to compare repair and replacement costs.','We can compare the options before you approve an expense.']],
  terms:'Confirm diagnosis, safe handling, written estimate, parts, warranty, and approval before repairing.',
  next:'The technician should inspect the issue and obtain approval before starting chargeable work.',
  success:'I can arrange an inspection request and explain the estimate. No paid repair has been authorized in this preview.',
  decline:'No problem. No repairs have been started; please take the necessary safety precautions.'},
 health:{
  first:['Which administrative detail would help you most?',
   ['Could you explain the right appointment or department?','I will help identify the appropriate administrative route; a clinician must handle personal diagnosis and treatment.'],
   ['What records, insurance details, or forms are needed?','We can review the forms and secure verification steps before you come in.']],
  second:['What would you like to clarify before continuing?',
   ['How do I confirm availability and timing?','Reception can check the appointment type, provider, and suitable times.'],
   ['Could I ask a qualified clinician about my medical concern?','Certainly. A clinician should assess symptoms, medicines, or treatment questions.']],
  common:['What next step would be most helpful?',
   ['Please explain the check-in or scheduling instructions.','I will outline the administrative steps and any preparation information provided by the clinic.'],
   ['I need to think about the appointment first.','That is okay, but seek prompt professional assessment if the symptoms are urgent or concerning.']],
  terms:'Check clinic procedures, identification and insurance requirements, and any clinician-provided preparation instructions.',
  next:'Only qualified clinicians should give personal medical advice; appointment times require confirmation.',
  success:'I can explain the scheduling or record-request process. No appointment or clinical action has been performed in this preview.',
  decline:'That is fine. No appointment has been made here. Please contact a healthcare professional for medical concerns.'},
 work:{
  first:['What is the main issue you would like to address?',
   ['I would like to understand the policy and expectations.','That is a good place to start. Let us review the relevant workplace instructions and responsibilities.'],
   ['I need help deciding who should handle this.','We can identify the proper supervisor, coworker, or HR contact before proceeding.']],
  second:['Which outcome are you hoping for?',
   ['Could we agree on a practical next step?','Of course. We can make a clear plan and identify who must approve it.'],
   ['What if the first approach does not work?','We can discuss alternatives or the appropriate escalation process.']],
  common:['How can we make sure this is understood?',
   ['Could you confirm the decision or expectations in writing?','A written schedule, policy, or task note can help prevent misunderstandings.'],
   ['Can we check how this affects the team?','Certainly. We should consider staffing, timing, and responsibilities.']],
  terms:'Follow the applicable workplace policy, give accurate information, and obtain approval before changing schedules or responsibilities.',
  next:'Once the supervisor or responsible person confirms the next step, the team can act on it.',
  success:'I will explain the appropriate workplace next step. Any approval must come from the responsible person.',
  decline:'Understood. We have discussed the options without changing your workplace record or schedule.'},
 home:{
  first:['Which home or service detail should we clarify first?',
   ['Could you explain the costs and conditions?','Certainly. We will review the relevant charges, services, and written terms before agreeing.'],
   ['When could someone inspect or arrange this?','Let us check provider availability and any access or scheduling requirements.']],
  second:['What is your biggest concern?',
   ['I need to understand what is included.','We can list what the service or agreement covers and what is excluded.'],
   ['What if the current option does not suit my home?','We can consider an alternative or request a professional assessment.']],
  common:['What would make you comfortable proceeding?',
   ['Could I have a written estimate or instructions?','Of course. Written terms can help you compare costs and responsibilities.'],
   ['Can I ask about cancellation or follow-up?','Yes. We should check the service terms before setting anything up.']],
  terms:'Check actual provider terms, address, cost estimate, scheduling, access, and any approvals.',
  next:'The service provider or responsible person can confirm arrangements after checking the details.',
  success:'I will explain how to confirm the requested home service or arrangement. Nothing has been booked or changed yet.',
  decline:'No problem. No repair, account change, or home service has been arranged here.'},
 education:{
  first:['What would you most like to understand?',
   ['Could you explain the requirements or instructions?','Of course. Let us break down the relevant requirements and why each matters.'],
   ['Could you show me a useful example?','Yes. We can start with an example and then connect it to your actual question.']],
  second:['How would you like to continue learning?',
   ['I would like a practical next step.','Let us identify one manageable action and how you can check your progress.'],
   ['Could you explain the timing and any fees?','We can review dates, deadlines, and costs where they apply.']],
  common:['What would help you feel prepared?',
   ['Could I write down the instructions?','Certainly. Clear written steps can help you follow up independently.'],
   ['What should I do if I have another question later?','I can explain how to contact the teacher, librarian, or admissions staff again.']],
  terms:'Confirm the relevant instructions, deadlines, fees, and official enrollment or library rules.',
  next:'You can practice, prepare, or submit the appropriate request once you understand what is required.',
  success:'We can agree on the next learning or administrative step. No application or enrollment is submitted in this preview.',
  decline:'That is fine. Take your time reviewing the information. You are welcome to ask again.'},
 tech:{
  first:['What have you noticed so far?',
   ['The issue happens every time I try.','That is useful information. Let us check safe first steps before changing settings or risking data.'],
   ['It happens only sometimes.','An intermittent issue may need a few careful observations before we know what is causing it.']],
  second:['What should we prioritize?',
   ['Please help me protect my account and files first.','Absolutely. Do not share passwords or verification codes, and back up important files when appropriate.'],
   ['Can you explain a safe troubleshooting step?','Yes. We can start with official instructions and reversible checks before making major changes.']],
  common:['What would you prefer now?',
   ['Could we check whether the issue is resolved?','We can test the specific action that previously failed and verify the result.'],
   ['If it still fails, who can help?','The official provider or qualified technician can handle the next step.']],
  terms:'Protect passwords, sensitive files, and account access; use official support and reversible troubleshooting.',
  next:'If a safe test does not solve the problem, document the error and request authorized technical support.',
  success:'We can work through the safe troubleshooting plan. No passwords, payments, or account changes happen here.',
  decline:'No problem. We have not changed any settings or data. Keep your account secure.'},
 community:{
  first:['What would you like to know before participating?',
   ['Could you confirm where and when it takes place?','Of course. Let us check the organizer\'s current date, location, and access details.'],
   ['Are there any fees or eligibility requirements?','We can review registration, costs, and who the activity is intended for.']],
  second:['What would make this easier for you?',
   ['Could I get directions or accessibility information?','We can check transportation and accessibility details with the organizer.'],
   ['What should I bring or prepare?','I can explain the event or service instructions so you know what to expect.']],
  common:['Do you want to participate or just find out more?',
   ['I would like to check the registration process.','Let us review the official registration steps before submitting anything.'],
   ['I am gathering information for now.','That is completely fine. You do not need to commit today.']],
  terms:'Verify organizer details, date, location, access, fees, and registration requirements.',
  next:'You can decide whether to attend or register once the details are confirmed.',
  success:'I can explain the participation or registration process. No actual registration has been completed here.',
  decline:'Of course. No commitment has been made. We hope the information was useful.'},
 social:{
  first:['That sounds interesting. What were you thinking?',
   ['I would like to keep it simple and relaxed.','That sounds nice. We can choose something comfortable for both of us.'],
   ['I have some questions before deciding.','Of course. Ask away; there is no pressure to agree.']],
  second:['What would work best for you?',
   ['Could we pick a convenient time or place?','Sure. Let us compare when and where we are both available.'],
   ['Could we do something different instead?','Absolutely. We can suggest another idea and see what suits us.']],
  common:['How do you feel about the plan?',
   ['That sounds good. Can we agree on the details?','Yes. Let us confirm the plan and how to stay in touch.'],
   ['I am still not sure. Could we take our time?','Of course. We can leave the decision open and talk again later.']],
  terms:'Ask respectfully, listen to the other person, and do not assume agreement or availability.',
  next:'A comfortable conversation allows either person to accept, adjust, or politely decline.',
  success:'That sounds like a thoughtful plan. Let us confirm the details together before saying it is settled.',
  decline:'No worries at all. Thanks for talking with me; it was nice catching up.'},
 family:{
  first:['I am glad you brought this up. What matters most to you?',
   ['I would like to hear what everyone thinks.','That is a good start. We should ask the people involved before making decisions for them.'],
   ['I want us to find something practical and fair.','I agree. Let us discuss what each person needs and what is realistic.']],
  second:['How should we work out the details?',
   ['Could we talk about timing and responsibilities?','Of course. Let us compare our schedules and decide who can help.'],
   ['Can we discuss the budget or other limitations?','Yes. We should be comfortable with the costs and avoid promises we cannot keep.']],
  common:['What would help us understand each other?',
   ['Can you tell me how you feel about this?','Thanks for asking. I appreciate that you want to hear my perspective too.'],
   ['Could we agree on one small next step?','Yes. Let us choose a realistic next step together.']],
  terms:'Listen with respect, confirm each person\'s preferences, and agree on responsibilities before finalizing plans.',
  next:'A family plan should reflect agreement rather than assuming anyone\'s answer.',
  success:'That sounds like a plan we can discuss with everyone involved. Let us confirm their availability before treating it as final.',
  decline:'That is okay. We can leave the decision open and continue the conversation another time.'}
};
const specialReply={
 'Lost debit card':'I understand this could be stressful. Protecting your card and account comes first.',
 'At the post office':'Of course. Let us confirm the destination and choose the right mailing service.',
 'At the car mechanic':'Thanks for explaining. We should inspect the vehicle before assuming what is wrong.',
 'At the public library':'Welcome! I can help you find the library service or resource you need.',
 'Pay at the checkout':'Certainly. Let us check your items and total before taking payment.',
 'Use self-checkout':'I can help with that machine. Let us check what is shown on its screen.',
 'Fix a wrong food order':'I am sorry that the order was not what you requested. Let us correct it.',
 'Report missing luggage':'I am sorry your bag has not arrived. Let us open or locate the correct baggage report.',
 'Ask about airport security':'I can explain where to check the airport\'s current screening instructions.',
 'Ask about a flight delay':'I am sorry about the disruption. Let us check your flight and what alternatives apply.',
 'Ask about customs rules':'I can point you to the official declaration and customs information for your journey.',
 'Visit urgent care':'I am here to help with check-in. A clinical team member should assess urgent symptoms.',
 'Request medical records':'Of course. Medical records are private, so let us review the secure authorization steps.',
 'Ask about counseling':'Thank you for contacting us. I can explain appointments, privacy, and how the intake process works.',
 'Report a mistake at work':'Thank you for telling me early. Let us understand what happened and how to correct it.',
 'Call out sick from work':'I am sorry you are unwell. Let us review the notification requirements and any coverage needs.',
 'Handle a customer complaint':'Thanks for raising that. Let us understand the customer\'s concern before deciding on a remedy.',
 'Resign professionally':'Thank you for telling me. I appreciate the notice. Let us discuss the handover and next steps.',
 'Ask for a locksmith':'I can help. First, let us establish the situation and whether anyone is in danger.',
 'Meet a new neighbor':'Hi! Nice to meet you. How are you settling in?',
 'Borrow something politely':'Of course, you can ask. Tell me what you need and when you would return it.',
 'Invite a friend to an event':'That sounds fun! When is the event, and what is the plan?',
 'Politely decline an invitation':'No worries at all. I appreciate you telling me. We can catch up another time.',
 'Apologize for a mistake':'Thank you for saying that. Let us talk about what happened and how we can move forward.',
 'Make small talk':'It is nice to chat! What have you been up to lately?',
 'Plan a weekend':'That sounds nice! Let us find something we would both enjoy.',
 'Ask someone for a favor':'I can listen. What do you need and when?',
 'Talk about hobbies':'I love hearing about hobbies! What got you interested in that?',
 'Discuss household supplies':'Good idea. Let us decide what we need and how to share the costs fairly.',
 'Plan a monthly budget':'I can help you organize the numbers and consider realistic options.',
 'Ask how to use an AI assistant':'I can show you practical examples and how to check AI answers critically.',
 'Report a suspicious message':'That could be risky. Let us avoid sharing sensitive details and check safe next steps.',
 'Plan a family meal':'That sounds delicious. Let us ask everyone what they would enjoy.',
 'Call family back home':'We are doing well! It is so lovely to hear from you. How have you been?',
 'Plan a birthday party':'That is exciting! Let us think about the guests, food, and what they might enjoy.',
 'Arrange family caregiving':'I am glad we are discussing this. Let us find out what support is needed and what each person can do.',
 "Discuss a child's school day":'School was interesting today! I can tell you what happened and what I learned.',
 'Share good news':'That is wonderful news! Congratulations! Tell me more.',
 'Resolve a disagreement':'Thank you for talking about it calmly. I would like to understand your point of view.',
 'Plan a family visit to Nepal':'I would love to see everyone. Let us talk about dates, travel, and the relatives we want to visit.',
 'Talk in a long-distance relationship':'I have missed talking with you too. Let us make time for each other.',
 'Shop for family necessities':'Good idea. Let us start with what is essential and what we can afford.'
};
function routeIntro(group,utterance,title){
 if(specialReply[title])return specialReply[title];
 if(group==='checkout')return 'Certainly. We can check the item list and total before completing checkout.';
 if(group==='social')return 'That sounds interesting. I would love to talk about it.';
 if(group==='family')return 'I am glad you mentioned that. Let us work it out together.';
 if(group==='returns')return 'I understand. Let me check what is possible under the applicable policy.';
 if(group==='repair')return 'I am sorry you are having that problem. Let us work through the details safely.';
 if(group==='health')return 'Of course. I can help with the administrative steps and direct medical questions to qualified staff.';
 if(group==='money')return 'I can explain the process and help you check the relevant details securely.';
 if(group==='education')return 'I would be happy to help you understand that.';
 if(group==='tech')return 'I can help you work through that carefully and protect your information.';
 if(group==='booking')return 'Certainly. We can check what is available and what you need before confirming anything.';
 if(group==='travel'||group==='transport')return 'Of course. Let us check the travel details before making a plan.';
 if(group==='food')return 'Certainly. Let us get the food details right before confirming an order.';
 if(group==='work')return 'Thanks for raising that. Let us talk through the workplace expectations.';
 if(group==='community')return 'Thanks for your interest! I can help you find the right information.';
 if(group==='shop')return 'Of course. You are welcome to compare options before making a purchase.';
 return 'Of course. Let me explain the process and ask a couple of useful questions.';
}
function fabricateTopic(row,index){
 const [emoji,title,group,role,...starts]=row;
 const p=flows[group]||flows.service;
 const common={q:p.common[0],choices:[[p.common[1][0],p.common[1][1]],[p.common[2][0],p.common[2][1]]]};
 const routes=starts.map((say,rIndex)=>{
  const intent=intentQuestion(say,group,title);
  const q=intent?.q||p.first[0],q2=p.second[0];
  const choices1=intent?.choices||[[p.first[1][0],p.first[1][1]],[p.first[2][0],p.first[2][1]]];
  const choices2=[[p.second[1][0],p.second[1][1]],[p.second[2][0],p.second[2][1]]];
  const follow=p.next;
  let success='';let decline='';
  if(group==='social'||group==='family'){
   success='It would be nice to continue with the idea you brought up. '+p.success;
   decline=p.decline;
  }else{
   success=p.success;
   decline=p.decline;
  }
  return {say,reply:routeIntro(group,say,title),focus:say.replace(/[.!?]+$/,'').replace(/^I(?:'d| would| am|\'m| need| want| have) /i,'').slice(0,125),
   terms:p.terms,next:follow,endings:[[
    group==='social'||group==='family'?'Yes, let us make a plan together.':'I would like to continue with the appropriate next step.',success],
    [group==='social'||group==='family'?'Maybe another time. Thank you for talking with me.':'I would rather wait and decide later.',decline]],
   steps:[{q,choices:choices1},{q:q2,choices:choices2}],generated:true,group,routeIndex:rIndex};
 });
 const hello=group==='social'?'Hi! Nice to see you. What is on your mind?':group==='family'?'Hi! It is good to talk. What would you like to discuss?':
  `Hello! This is the ${role.toLowerCase()}. How can I help you today?`;
 return {emoji,title,role,hello,common,routes,group,generated:true,number:26+index};
}
/* Intent-level first questions: preserve the chosen situation instead of
 * giving every request in a category the same three generic questions.
 * Patterns are conservative; the safe domain-specific fallback handles misses.
 */
function socialIntent(title,s){
 const say=(q,a,ar,b,br)=>({q,choices:[[a,ar],[b,br]]});
 switch(title){
 case 'Meet a new neighbor':return say('How are you settling in, and is there anything nearby you would like to know?',
  'I am still learning where everything is.','Welcome! I can tell you where I usually shop and which places are easy to reach.',
  'I have been settling in well. What do you like about the area?','I like the neighborhood parks and the friendly people here.');
 case 'Borrow something politely':return say('When would you need it, and when could you return it?',
  'Just for a short time. I will return it today.','Thanks for letting me know. I can check whether I need it first.',
  'I would need it until the weekend. Is that okay?','I appreciate you asking. Let me think about whether I can spare it that long.');
 case 'Invite a friend to an event':return say('That sounds fun! When is it, and would other friends be joining?',
  'It is this weekend, and a few friends are coming.','That sounds nice. Let me check my schedule before I promise I can attend.',
  'We could choose a day that works for everyone.','I like that idea. Let us compare our schedules and make a plan together.');
 case 'Politely decline an invitation':return say('No worries. Would you like to plan another day, or leave it for now?',
  'Maybe next weekend would work better.','I would love that. Let us check closer to the weekend.',
  'Thank you for understanding. I cannot make a plan right now.','Of course. There is no pressure. I appreciate you being clear with me.');
 case 'Apologize for a mistake':return say('I appreciate the apology. Would you like to explain what happened or hear how I felt?',
  'I would like to explain, and I am ready to take responsibility.','Thank you. I will listen, and then we can talk about how to put things right.',
  'I want to understand how it affected you.','I appreciate that. Let me explain what was difficult for me.');
 case 'Make small talk':return say('What have you been up to lately?',
  'I have been busy with work, but things are going well.','That sounds like a full week! Have you had time to relax?',
  'I have been exploring new places nearby.','That sounds fun! Have you found a place you would recommend?');
 case 'Plan a weekend':return say('What sort of weekend would you enjoy?',
  'Something outdoors would be nice.','Great! We can check the weather and pick an easy place to explore.',
  'I would prefer an inexpensive, relaxed activity.','That works for me. Let us look at a movie, café, or walk that suits our budget.');
 case 'Ask someone for a favor':return say('I may be able to help. When do you need it, and how much time would it take?',
  'It would only take a few minutes.','That sounds manageable. Let me check that I am free then.',
  'I know it is a bigger favor. It is okay if you cannot.','Thanks for giving me the option. Let us see if there is a way I can help.');
 case 'Talk about hobbies':return say('How did you get interested in that hobby?',
  'I started recently and I am still learning.','That is exciting. Everyone starts somewhere. What have you enjoyed so far?',
  'I have practiced for a while, and I want to improve.','Nice! Do you usually practice by yourself or with other people?');
 case 'Invite friends to a festival':return say('That sounds lovely! What are you planning for the celebration?',
  'I am inviting a few friends for food and conversation.','That sounds warm and welcoming. What time are you thinking?',
  'I want to share the traditions with friends who are new to them.','I would enjoy that. We can explain the traditions in a welcoming way.');
 case 'Plan a family meal':return say('Who will be eating, and what food does everyone enjoy?',
  'Let us make something everyone can share.','Good idea. We can ask about dietary preferences and choose a menu together.',
  'I want a simple, affordable meal.','That sounds practical. Let us check what ingredients we have before shopping.');
 case 'Call family back home':return say('We are glad you called. What would you like to hear about first?',
  'Tell me how everyone is doing at home.','We can catch up on everyone. There have been some good moments and a few busy days.',
  'How are the festival preparations coming along?','We have been getting things ready. I would love to tell you what everyone is planning.');
 case 'Plan a birthday party':return say('Who are we celebrating, and what kind of party would they enjoy?',
  'They would prefer something small with close family.','That sounds thoughtful. Let us plan a relaxed gathering that suits them.',
  'They enjoy having friends around.','Then we can talk about invitations, food, and the space we would need.');
 case 'Arrange family caregiving':return say('What kind of help is most needed right now?',
  'We need help with appointments and transportation.','Let us check who is available and how to arrange safe transport.',
  'We need to share daily responsibilities fairly.','I agree. We can divide tasks around each person\'s availability and abilities.');
 case "Discuss a child's school day":return say('Would you like to hear about what I learned or what was difficult today?',
  'Tell me something you enjoyed learning today.','We did an interesting activity in class. I can show you what I made!',
  'Was anything difficult? We can talk about it.','I had trouble understanding part of the homework. Could we look at it together?');
 case 'Share good news':return say('That is wonderful! How would you like to celebrate or share the news?',
  'I would like to tell the family and celebrate together.','They will be so happy for you. We can choose a time to call everyone.',
  'I just wanted to share the moment with you first.','I am glad you told me. You deserve to enjoy this achievement!');
 case 'Resolve a disagreement':return say('Can we understand what happened before deciding how to fix it?',
  'I would like to explain how I saw the situation.','Of course. I will listen without interrupting, then share my perspective.',
  'I would rather hear how you felt first.','Thank you for asking. Let me explain what bothered me so we can avoid repeating it.');
 case 'Plan a family visit to Nepal':return say('What should we decide first: the travel dates or whom we would like to visit?',
  'Let us choose dates that work for the whole family.','Good idea. We can ask everyone about availability before confirming the trip.',
  'I want to make enough time to visit relatives and see Pokhara.','That sounds lovely. We can plan a realistic route without rushing the family visits.');
 case 'Talk in a long-distance relationship':return say('What would help us feel more connected this week?',
  'Could we make time for a longer video call this weekend?','I would love that. Let us find a time when we can talk without rushing.',
  'Even short daily messages would mean a lot to me.','I agree. We can choose a simple routine that works in both time zones.');
 case 'Shop for family necessities':return say('What matters most: buying essentials first or staying within our budget?',
  'Let us buy the things we need urgently.','Good idea. We can make a short priority list before shopping.',
  'I want to compare prices and avoid unnecessary purchases.','I agree. Let us check what we already have and compare the cost of what remains.');
 case 'Discuss household supplies':return say('Should we check what is missing or agree on how to split the cost?',
  'Let us make a list of what we need to buy.','Good idea. We can check the cupboards before shopping.',
  'Could we agree on a fair way to share expenses?','Of course. Let us keep the costs clear and ask what works for each person.');
 }
 return null;
}

function specialistIntent(title,s){
 const set=(q,a,ar,b,br)=>({q,choices:[[a,ar],[b,br]]});
 if(title==='At the post office'||title==='Send a package abroad')return set('What is the destination, and how important are price, speed, and tracking?',
  'Tracking is important, even if the service costs more.','We can compare tracked services, delivery estimates, and the required customs or address details.',
  'I would prefer the most affordable suitable option.','We can review economy services, delivery conditions, and the correct packaging requirements.');
 if(title==='At the public library')return set('Are you looking for a book to borrow or another library service?',
  'I would like help finding the book or catalog.','We can search the catalog, check the lending rules, and see whether the title is available.',
  'I need access to a quiet space or a computer.','I can explain the library facilities and whether reservations or a card are required.');
 if(title==='Get a library card')return set('Do you want to know the identification requirements or how to borrow digital items?',
  'What documents will I need to apply?','Let us check the current library registration policy before you provide any personal information.',
  'Can I use e-books with the library card?','I can explain the digital lending service and how cardholders sign in.');
 if(title==='Join an English class'||title==='Join an online course')return set('Would you like to check the suitable level or the class schedule and fees?',
  'I need to find a class that matches my current skill level.','We can review a placement assessment and choose a suitable starting level.',
  'The dates, price, and learning materials matter most.','We can compare the class schedule, fees, and materials before enrollment.');
 if(title==='Ask about student financial aid')return set('Are you looking for application requirements or an estimate of your education costs?',
  'Could you explain the application forms and deadlines?','We can review the official financial-aid process and documents without assuming eligibility.',
  'I want to understand the tuition, fees, and possible aid.','We can compare the published costs and what different assistance programs may cover.');
 if(title==='Apply for a job')return set('Would you like to check the role requirements or how to submit your application?',
  'Can you explain the skills and experience needed?','Let us look at the posted requirements and how your actual experience relates to them.',
  'What documents should I submit, and what happens next?','We can review the resume and application process, then explain how interviews are scheduled.');
 if(title==='Deposit money at a bank'||title==='Withdraw cash')return set('Are you ready to proceed through secure verification, or would you like to understand the rules first?',
  'Please explain any limits, holds, or fees before I continue.','Of course. We should check the account terms, relevant limits, and timing before any transaction.',
  'I would like to know what identification is needed.','We can explain the secure bank verification process. Never share your PIN or one-time codes here.');
 if(title==='Send money to Nepal')return set('Would you like to compare the exchange rate and fees, or check how the recipient will receive the money?',
  'Please explain how much the recipient would receive after fees.','We can calculate the disclosed rate and total cost using the provider\'s current quote before you authorize anything.',
  'My family needs to receive the money securely.','We can explain available receiving methods and the required recipient information.');
 if(title==='Exchange money')return set('Would you like a written exchange-rate quote, or do you need to know which currencies are available?',
  'Please explain the exchange rate and any commission.','We can check the current displayed rate, service fees, and final cash amount before exchanging.',
  'Could you check whether you have the currency I need?','We can ask about the desired currency and denomination availability before you decide.');
 if(title==='Ask for a locksmith')return set('Are you safely locked out, or do you have a damaged lock that needs inspection?',
  'I am locked out and need to know the earliest safe option.','We should check your location, authorization to enter, and the locksmith\'s availability. For immediate danger, contact emergency services.',
  'The lock is damaged, but I can still enter safely.','We can arrange an authorized inspection and written estimate before replacing hardware.');
 if(title==='Check food freshness')return set('Are you worried about an expiry date, visible spoilage, or damaged packaging?',
  'The date or freshness does not look right.','We should check the original label, storage instructions, and the store\'s replacement policy.',
  'The package is damaged. I do not want to buy it.','That is fine. Do not use the damaged item; we can check an undamaged replacement or report it to staff.');
 if(title==='Ask about a gym membership')return set('Would you rather see the total membership cost or try the facilities first?',
  'Please explain the recurring charges and cancellation terms.','Of course. We can review the written membership agreement before you sign.',
  'Is a trial visit available before joining?','We can check the current trial rules, required identification, and available times.');
 if(title==='Ask about a missing pet')return set('When and where was your pet last seen, and do you have a recent photograph?',
  'I have a photo and know the approximate last location.','We can prepare a clear report with those details and contact the appropriate shelter or animal-control service.',
  'I am not sure where my pet went.','We can note the last known information and check local lost-pet reporting channels rather than guess.');
 if(title==='Discuss a child\'s school day')return null; // handled by family-specific scripted dialogue
 return null;
}

function intentQuestion(text,group,title){
 const s=text.toLowerCase();
 const special=specialistIntent(title,s);if(special)return special;
 if(group==='social'||group==='family'){const tailored=socialIntent(title,s);if(tailored)return tailored;}
 const one=(q,a,ar,b,br)=>({q,choices:[[a,ar],[b,br]]});
 if(/lost my debit card|card is missing|missing card|stole my card/.test(s))return one(
  'Do you believe the card is simply misplaced, or could it have been stolen?',
  'I may have left it at home.','Then I recommend using the official temporary-lock option while you search, if your bank offers it. No card action has been taken here.',
  'I think someone may have stolen it.','That is more urgent. Contact the official bank fraud channel to block the card and review transactions promptly.');
 if(/suspicious|don't recognize|do not recognize|didn't authorize|not authorize|charged.*twice|dispute|fraud|unknown transaction/.test(s)&&group==='money')return one(
  'Have you checked the transaction details, and do you still have control of your card?',
  'I still have my card, but I cannot identify the charge.','We can review the merchant and date through the secure bank channel before opening a dispute.',
  'I think my account or card may be compromised.','Please use the bank\'s official security channel immediately; they can advise on securing the card and reporting the transaction.');
 if(group==='food'&&/wrong food|wrong order|missing.*order|contains meat|prepared differently|different from my request/.test(s))return one(
  'Is the wrong item still at your table, and would you prefer a correction or to discuss a refund?',
  'Please replace it with what I actually ordered.','I am sorry. I will compare the kitchen ticket with the meal and arrange a correction once the kitchen confirms it.',
  'I do not want a replacement. Please explain my refund options.','Of course. We can have the responsible manager review the incorrect order and explain the eligible refund or adjustment.');
 if(group==='checkout'&&/price|wrong|different/.test(s))return one(
  'Can you show me the shelf price, receipt, or promotion you expected?',
  'The shelf label showed a lower amount.','Let us verify the exact product, shelf label, and promotional conditions before adjusting a total.',
  'I think an item was charged twice.','I will check the scanned items and void any duplicate only after verification.');
 if(group==='checkout')return one(
  'Before payment, how would you like the total and payment method handled?',
  'Please confirm the final total and let me use my chosen payment method.','Certainly. We will review the scanned items and available payment methods before completing the sale.',
  'Could I split the payment or ask for a receipt?','Let me check the checkout options, then we can confirm the amounts and a receipt.');
 if(group==='tech'&&/suspicious|password|unfamiliar link|accessed my account/.test(s))return one(
  'Have you opened the suspicious link or shared any sign-in information?',
  'No. I have not opened it or shared anything.','Good. Do not interact with the message. We can report it using the official service channel.',
  'I opened the link or entered information.','Please use a trusted device and the official account recovery or security channel promptly. Do not share codes here.');
 if(group==='tech'&&/ai assistant|ai to practice|ai answer/.test(s))return one(
  'Would you like a practical AI example or a way to check whether its answer is reliable?',
  'Please show me how to ask a useful question.','For example, you can ask an AI assistant to play a shopkeeper and respond to your English in short turns.',
  'I want to check its answer before trusting it.','Good idea. Use trusted sources, check dates and claims, and avoid entering sensitive personal information.');
 if(group==='tech'&&/mobile plan|mobile data|data package|transfer my number/.test(s))return one(
  'Are you comparing the monthly cost, data allowance, or the rules for changing plans?',
  'My main concern is the total cost and fees.','Let us compare monthly rates, any discounts, and potential switching charges.',
  'I need to understand the data and service coverage.','We can check data limits, speed restrictions, and coverage details before switching.');
 if(group==='money'&&/monthly budget|tracking my monthly|set aside for savings|changing income/.test(s))return one(
  'Would you like to begin with your regular expenses or with a savings goal?',
  'Let us list my necessary monthly expenses first.','Good. We can separate fixed bills from flexible spending and check what remains.',
  'I would like a realistic savings goal.','We can compare the available income, upcoming bills, and an amount you can save consistently.');
 if(group==='booking'&&/restaurant|table|group/.test(s))return one(
  'How many people will be dining, and which day and time would you prefer?',
  'It will be a small party, and I prefer an evening table.','Thank you. We can check the appropriate table size and evening availability.',
  'It is a larger group, so I need to ask about special arrangements.','Let us confirm the party size and any group reservation or deposit rules before promising a table.');
 if(/allerg|cross.contact|contains meat|dairy|peanut|nut allergy|ingredient/.test(s)&&group==='food')return one(
  'Is this an allergy or a food preference, and is avoiding cross-contact important?',
  'I have an allergy, so cross-contact matters.','Thank you for being clear. I need the kitchen to check ingredients and preparation methods. We must not promise the dish is safe without confirmation.',
  'It is a preference, but I still want the ingredients checked.','Understood. We can ask the kitchen about ingredients and available modifications before placing an order.');
 if(/flight.*delay|delayed.*flight|connection|missed the last bus|miss a bus/.test(s)&&/transport|travel/.test(group))return one(
  'Are you trying to catch a connection, or do you mainly need a new departure time?',
  'I have a connection and may miss it.','Let us check the operator\'s current update and contact the airline or transit staff about the connecting journey.',
  'I only need the next available departure.','We can verify the revised timetable and explain any applicable rebooking conditions.');
 if(/lost.*luggage|suitcase did not arrive|missing.*parcel|missing.*item|not arrived|not received|misplaced|lost.*keys|lost.*pet/.test(s))return one(
  'When and where did you last see the missing item?',
  'I know the last location and approximate time.','That helps. We can prepare an accurate report with the location, time, and identifying details.',
  'I am not sure where I lost it.','We can retrace the route and check the relevant lost-and-found or tracking channel without inventing a location.');
 if(/damage|broken|not working|won't start|not starting|freez|leak|crack|wrong item|error|not cooling|rattling|noisy|slow|blocked|jammed|offline|charging/.test(s)&&/repair|tech|home|service|returns/.test(group))return one(
  'When did the problem start, and does it happen consistently?',
  'It began recently and happens every time.','That gives us a clear symptom to investigate. We should check safe first steps and document the problem before committing to a repair.',
  'It comes and goes. I have not found a pattern.','Intermittent problems can be harder to diagnose. Let us note when it happens and avoid replacing parts without a proper check.');
 if(/cancel|reschedul|change.*date|different time|move.*appointment|change.*reservation|change.*booking/.test(s))return one(
  'Would you prefer to reschedule, or do you need to cancel the existing arrangement?',
  'I want to reschedule to a more convenient time.','Of course. We would check alternative times and the change policy before modifying the original booking.',
  'I may need to cancel. What are the conditions?','Let us review the cancellation policy and any fees. The original booking stays unchanged until you authorize a cancellation.');
 if(/schedule|appointment|reserve|book |booking|cleaning visit|eye exam|meeting|tour |viewing|rent a car/.test(s)&&/booking|health|service|education|home/.test(group))return one(
  'Do you have a preferred date or time, and should we check the requirements first?',
  'A weekday morning would be convenient for me.','I can check suitable morning times through the provider\'s schedule; no appointment is confirmed yet.',
  'I am flexible, but I need to understand the requirements.','That is fine. We can review what is needed and then compare available times.');
 if(/fee|cost|price|estimate|bill|charge|discount|interest rate|loan|rent|salary|paycheck|allowance/.test(s)&&group!=='social'&&group!=='family')return one(
  'Are you mainly trying to understand the total price, or an unexpected charge?',
  'I want the complete breakdown before agreeing.','Certainly. We can list each component and check the relevant terms instead of relying on a headline price.',
  'Something looks incorrect. Can we verify it?','Yes. We should compare the written statement, receipt, or terms before requesting any correction.');
 if(/compare|choose between|different sizes|which.*better|option|model|glasses|frame|shoes|jewelry|furniture|appliance|cosmetic|foundation/.test(s)&&group==='shop')return one(
  'Would you rather compare how well the options suit you, or their final prices?',
  'I want to check the actual features, size, or suitability first.','Of course. Let us compare the details that matter for this item before deciding.',
  'The total cost is my priority.','Understood. We can compare the full prices and check conditions so there are no surprises at checkout.');
 if(/lost|stolen|replacement|expired/.test(s)&&/service|returns/.test(group))return one(
  'Do you have proof or documentation of the original item, or do you need an alternative?',
  'I have the original paperwork.','That may help us confirm the record and eligibility for a replacement.',
  'I cannot find the paperwork.','We can explain whether another accepted verification method is available.');
 if(/application|apply|enroll|register|qualif|requirements|documents|paperwork|permit|license|notariz|records/.test(s))return one(
  'Would you like to check eligibility and documents, or the application steps and deadline?',
  'Please explain the required documents.','We can review the official documentation requirements before you share personal information.',
  'I would like to understand the process and timing.','Of course. Let us check the steps, deadlines, and how a confirmation is issued.');
 if(/refund|return |exchange |warranty/.test(s)&&group==='returns')return one(
  'Do you have the receipt, and what outcome would you prefer?',
  'I have proof of purchase and would prefer a refund.','Thank you. We can review the return period and condition before confirming refund eligibility.',
  'I need an exchange or repair, but I am unsure of the policy.','We can check service or replacement conditions and the available choices.');
 if(/need.*help|struggling|don.t understand|understand.*feedback|questions|how do i|how can i|explain|show me/.test(s)&&/education|tech/.test(group))return one(
  'Would an example help, or would you rather start with clear step-by-step instructions?',
  'Please show me a simple example first.','Certainly. We can begin with a relevant example and explain each part.',
  'I would rather understand the exact instructions.','Let us identify the requirements and take one manageable step at a time.');
 if(group==='social'||group==='family')return one(
  'What would you enjoy or feel most comfortable with?',
  'I would like us to talk through the details together.','That sounds nice. Let us hear each other\'s preferences and choose something that suits us.',
  'I am not certain yet. Could we keep it flexible?','Absolutely. We do not have to decide immediately, and either of us can suggest another option.');
 return null;
}

const expanded=catalog.map(fabricateTopic);
window.englishSikauExpandedTopics=expanded;
})();
