export const newLocations={
 autoVillage:{name:'Auto stand · Chandanpur',x:19,z:16,stop:true},
 autoTown:{name:'Auto stand · Rampur town',x:310,z:16,stop:true},
 autoDepot:{name:'Auto stand · North depot',x:310,z:-160,stop:true},
 autoShelter:{name:'Auto stand · Neem hamlet',x:-280,z:-160,stop:true},
 autoFair:{name:'Auto stand · Riverside fair',x:250,z:240,stop:true},
 autoOrchard:{name:'Auto stand · Mango orchards',x:-260,z:240,stop:true},
 townClinic:{name:'Rampur health centre',x:275,z:4},townMarket:{name:'Rampur grain mandi',x:330,z:4},townPost:{name:'Rampur post office',x:355,z:4},
 warehouse:{name:'North supply warehouse',x:330,z:-168},engineer:{name:'Irrigation workshop',x:286,z:-170},
 shelter:{name:'Neem community shelter',x:-255,z:-170},shelterNurse:{name:'Shelter help desk',x:-249,z:-170},well:{name:'Neem water tank',x:-305,z:-180},
 orchard:{name:'Mango grove · आम बाग',x:-305,z:200},orchardEast:{name:'East harvest basket',x:-290,z:190},orchardWest:{name:'West harvest basket',x:-325,z:202},packing:{name:'Orchard packing shed',x:-285,z:230},
 fair:{name:'Riverside mela · मेला',x:220,z:218},stage:{name:'Community stage',x:280,z:230},fairGame:{name:'Mela memory game',x:205,z:228}
};
const s=(at,action,text,extra={})=>({at,action,text,...extra});
const ride=(from,to,text)=>s(from,'board',text,{key:'f',route:'auto',to,cost:15,speaker:'Iqbal · auto driver',dialogue:'बैठो बेटा। किराया ₹15 है। We will follow the road and stop beside the stand.'});
const m=(title,summary,steps)=>({title,summary,steps});
export const extraDays=[
 {title:'When the rain came',weather:'Rain',missions:[
  m('Rain on the tin roof','The festival lights are gone. Rain drums on the courtyard roof; the village needs a different kind of help.',[
   s('home','wake','Wake up to the monsoon',{speaker:'Mother',dialogue:'रात भर बारिश हुई है। The footbridge is closed until the engineer checks it. Stay on the marked roads.',outfit:'home'}),
   s('wash','brush','Wash and prepare for the day',{activity:'A rainy morning',duration:4,time:390}),
   s('kitchen','eat','Have breakfast and hear Maa’s message',{speaker:'Mother',dialogue:'The panchayat is arranging supplies for Neem hamlet. Listen first; the adults will handle the damaged bridge.',activity:'Breakfast while the rain falls',duration:5}),
   s('dadi','collect','Collect Dadi’s torch',{give:'Torch',speaker:'Dadi',dialogue:'इसे साथ रखो। Helping means knowing when to ask someone experienced.'})]),
  m('The closed crossing','Collect a bank-side observation and a farmer’s account before the panchayat makes a relief plan.',[
   s('panchayat','talk','Meet Sarpanch at the panchayat',{speaker:'Sarpanch',dialogue:'Neem families are already in the community shelter. Please bring us an observation from this bank; do not cross the barricade.'}),
   s('bridge','inspect','Inspect the closed bridge from the marked bank',{speaker:'Aarav',dialogue:'A loose railing, muddy approach and a closed barrier. I will write that down instead of crossing.',give:'Bridge survey',note:'Bridge survey: loose railing; muddy approach. East road bridge remains open.',activity:'Record observations from the bank',duration:6}),
   s('farm','talk','Ask the farmer about the north road',{speaker:'Farmer',dialogue:'The north road to Neem is open. Their store-room roof leaked; bedding and dry grain are needed.'}),
   s('panchayat','plan','Choose the relief route',{speaker:'Sarpanch',dialogue:'Where should our first supply journey go?',choices:['Town clinic, depot, then Neem shelter','Across the closed footbridge'],correct:'Town clinic, depot, then Neem shelter',hint:'The bridge is closed. The town and north road are open.',flags:{reliefPlan:true},give:'Dispatch slip',note:'Relief plan: collect sealed supplies in Rampur, tarpaulins at North depot, deliver to Neem.'})]),
  m('The first auto journey','Leave the village for Rampur, collect the clinic parcel and buy dry grain for the shelter.',[
   ride('autoVillage','autoTown','F · Take the auto to Rampur town · ₹15'),
   s('townClinic','collect','Collect the sealed clinic parcel',{speaker:'Nurse Asha',dialogue:'This parcel is for the shelter nurse. Keep it sealed and hand it to her directly.',give:'Sealed shelter parcel'}),
   s('townMarket','buy','Buy a dry grain sack · ₹35',{cost:35,give:'Dry grain sack',speaker:'Mandi trader',dialogue:'I have double-wrapped the sack. The shelter kitchen can use it today.'}),
   s('townPost','talk','Confirm the depot dispatch code',{speaker:'Postmaster',dialogue:'Show the dispatch slip at the warehouse. Blue stacks are tarpaulins; green stacks are rope.',note:'Depot colors: BLUE = tarpaulins; GREEN = rope; WHITE = lamps.'})]),
  m('The blue stack','Use the dispatch note to choose the right load, rather than carrying the first crate you see.',[
   ride('autoTown','autoDepot','F · Ride north to the supply depot · ₹15'),
   s('warehouse','deliver','Hand over the dispatch slip',{require:'Dispatch slip',take:'Dispatch slip',speaker:'Depot keeper',dialogue:'We have several loads. Read the labels and choose what will cover a leaking roof.'}),
   s('warehouse','inspect','Read the marked supply stacks',{activity:'Check labels and the dispatch ledger',duration:6,note:'Neem request: waterproof roof sheets. Choose the BLUE stack.'}),
   s('warehouse','sort','Select the shelter load',{choices:['Blue tarpaulin bundle','Green rope bundle','White lamp box'],correct:'Blue tarpaulin bundle',hint:'Your journal says BLUE holds the waterproof roof sheets.',give:'Tarpaulin bundle',speaker:'Depot keeper',dialogue:'Which bundle belongs to the Neem request?'})]),
  m('A roof for the night','Visit the northern hamlet and complete three separate handovers before checking the shelter plan.',[
   ride('autoDepot','autoShelter','F · Travel along the north road to Neem · ₹15'),
   s('shelter','deliver','Deliver the tarpaulins to the shelter team',{require:'Tarpaulin bundle',take:'Tarpaulin bundle',speaker:'Sarpanch Leela',dialogue:'The roof crew will fit these. Please leave the grain by the kitchen desk.'}),
   s('shelter','deliver','Hand over the dry grain sack',{require:'Dry grain sack',take:'Dry grain sack',activity:'Log the kitchen delivery',duration:5}),
   s('shelterNurse','deliver','Give the sealed parcel to the shelter nurse',{require:'Sealed shelter parcel',take:'Sealed shelter parcel',speaker:'Shelter nurse',dialogue:'Thank you. I will take it from here.'}),
   s('well','inspect','Check the notice beside the water tank',{note:'Neem notice: families are gathering in the raised community hall.',activity:'Read the shelter notice',duration:4}),
   s('shelter','plan','Confirm the family meeting point',{choices:['Raised community hall','Low ground beside the canal'],correct:'Raised community hall',hint:'The water-tank notice names the raised community hall.',flags:{shelterSupplied:true},speaker:'Sarpanch Leela',dialogue:'Where shall we reunite the families tonight?',time:900})]),
  m('The engineer’s promise','Bring the written survey to the engineer, then return to see the work completed by the adult crew.',[
   ride('autoShelter','autoDepot','F · Return to the irrigation workshop · ₹15'),
   s('engineer','deliver','Give Engineer Nandu the bridge survey',{require:'Bridge survey',take:'Bridge survey',speaker:'Engineer Nandu',dialogue:'That was me on the forest road yesterday, checking the channels. You were right to find a trusted adult when unsure. My crew will inspect the bridge.',note:'Nandu is the irrigation engineer seen on the forest road. Uncle has confirmed his identity.'}),
   s('engineer','talk','Wait for the crew’s radio update',{activity:'The engineer coordinates the repair crew',duration:8,flags:{repairAuthorized:true},speaker:'Engineer Nandu',dialogue:'The crew is replacing the loose railing. Return to the marked bank; keep the crossing closed until they finish.'}),
   ride('autoDepot','autoVillage','F · Ride back to Chandanpur · ₹15'),
   s('bridge','inspect','Watch the crew’s completed repair from the bank',{activity:'Later · the engineer opens the repaired footbridge',duration:10,flags:{bridgeCleared:true},weather:'Cloudy',speaker:'Engineer Nandu',dialogue:'The inspection is complete. The footbridge is open again.',time:1080})]),
  m('A village keeps its word','Close the relief log and learn how tomorrow’s fair will help the families recover.',[
   s('panchayat','report','Report all shelter deliveries',{speaker:'Sarpanch',dialogue:'The grain, sheets and clinic parcel arrived. Tomorrow’s mela will collect books and help the orchard families.'}),
   s('grocery','collect','Collect the community’s thank-you envelope',{speaker:'Gupta ji',dialogue:'This ₹60 covers the errands you did for everyone. Keep a little for tomorrow’s rides.',rewardCash:60}),
   s('dadi','story','Tell Dadi about Neem',{choices:['Tell her about the families working together','Tell her how the route plan helped'],speaker:'Dadi',dialogue:'बारिश में एक-दूसरे का सहारा ही सबसे बड़ी रोशनी है।',note:'Tomorrow: help at the mango orchards, then join the riverside fair.'})]),
  m('After the rain','A quiet meal closes the relief chapter and opens a longer journey beyond Chandanpur.',[
   s('kitchen','eat','Share dinner and the day’s news',{speaker:'Mother',dialogue:'You listened, asked for help and finished what you promised. कल मेले में सब मिलेंगे।',activity:'Dinner after the rain',duration:6,time:1230}),
   s('home','sleep','Rest for the fair journey',{activity:'DAY 3 COMPLETED · AFTER THE RAIN',endDay:true})])
 ]},
 {title:'Roads that bring us home',weather:'Clear',missions:[
  m('An invitation at breakfast','A village fair, a school-book parcel and an orchard harvest connect the whole district.',[
   s('home','wake','Wake up for the fair journey',{speaker:'Mother',dialogue:'आज रास्ते साफ हैं। The orchard needs a hand before the mela opens.',outfit:'home'}),
   s('wash','brush','Get ready at the hand pump',{activity:'A clear morning',duration:4}),
   s('kitchen','eat','Hear the plan over breakfast',{speaker:'Mother',dialogue:'Meet the grower at the south orchard. Take the road-bridge auto route, then deliver the fruit to the fair.',give:'Fair invitation',activity:'Plan the day with Maa',duration:5,time:420}),
   s('dadi','uniform','Put on your festival kurta',{outfit:'festival',speaker:'Dadi',dialogue:'जाओ बेटा, आज नए दोस्त भी बनाना।'})]),
  m('Beyond the east bridge','Ride beyond the old map and gather the harvest from two different orchard rows.',[
   ride('autoVillage','autoOrchard','F · Take the long orchard auto route · ₹15'),
   s('orchard','talk','Meet grower Kesar in the grove',{speaker:'Kesar',dialogue:'The fallen fruit goes to compost. Collect only the baskets already picked by our workers.'}),
   s('orchardEast','collect','Collect the east-row basket',{give:'East mango basket',activity:'Lift the prepared harvest basket',duration:4}),
   s('orchardWest','collect','Collect the west-row basket',{give:'West mango basket',activity:'Collect the second labeled basket',duration:4}),
   s('packing','deliver','Bring the east basket to the packing shed',{require:'East mango basket',take:'East mango basket',speaker:'Kesar',dialogue:'Good. Now put the second basket beside it.'}),
   s('packing','deliver','Pack the west basket for the fair',{require:'West mango basket',take:'West mango basket',give:'Fair fruit crate',activity:'Pack and tie the fruit crate',duration:7,time:600})]),
  m('The empty book table','Deliver the harvest, then discover why the school’s display cannot open yet.',[
   ride('autoOrchard','autoFair','F · Ride to the riverside mela · ₹15'),
   s('stage','deliver','Deliver the fruit crate to the fair team',{require:'Fair fruit crate',take:'Fair fruit crate',speaker:'Organiser Meena',dialogue:'The fruit stall is ready! But the school-book parcel has not arrived.'}),
   s('fair','talk','Ask Meena about the missing parcel',{speaker:'Organiser Meena',dialogue:'The post office receipt says C17. Could you trace it while we set up?',give:'Parcel receipt C17',note:'Missing parcel: school books, receipt C17. Start at Rampur post office.'}),
   s('fairGame','inspect','Read the fair’s signboard symbols',{note:'Mela memory trail: MANGO → BOOK → LAMP.',activity:'Remember the three symbols for the evening game',duration:5})]),
  m('Three clues in Rampur','Trace the parcel using a receipt, a witness and the dispatch ledger. Your journal keeps each clue.',[
   ride('autoFair','autoTown','F · Return to Rampur to trace the parcel · ₹15'),
   s('townPost','inspect','Show receipt C17 to the postmaster',{require:'Parcel receipt C17',speaker:'Postmaster',dialogue:'C17 left in the green delivery van, not the red town van.',note:'C17 clue 1: GREEN delivery van.'}),
   s('townMarket','talk','Ask the mandi trader about the green van',{speaker:'Mandi trader',dialogue:'I saw it turn north toward the supply depot after the rain.',note:'C17 clue 2: the green van turned NORTH.'}),
   s('townClinic','talk','Confirm the delivery diversion with Nurse Asha',{speaker:'Nurse Asha',dialogue:'Yesterday’s parcels were kept dry in the north warehouse. Ask for the school shelf.',note:'C17 clue 3: NORTH WAREHOUSE, SCHOOL SHELF.'}),
   s('townPost','solve','Choose where to look next',{choices:['North depot school shelf','Village grocery store','Riverside fruit stall'],correct:'North depot school shelf',hint:'The green van went NORTH; Asha named the warehouse school shelf.',give:'Parcel collection permit',speaker:'Postmaster',dialogue:'Which destination matches all three clues?'})]),
  m('A familiar face at the depot','Meet Nandu again and match the correct receipt before accepting the school’s parcel.',[
   ride('autoTown','autoDepot','F · Follow the clues to North depot · ₹15'),
   s('engineer','talk','Ask Nandu about the diverted van',{speaker:'Engineer Nandu',dialogue:'The driver sheltered here yesterday. I helped move the book boxes inside. They are safe.'}),
   s('warehouse','inspect','Read the warehouse shelf labels',{note:'School shelf labels: C17 = BOOKS; C71 = TOOLS; B17 = SEEDS.',activity:'Compare shelf labels with your receipt',duration:5}),
   s('warehouse','claim','Match the school parcel code',{require:'Parcel collection permit',take:'Parcel collection permit',choices:['C17 · books','C71 · tools','B17 · seeds'],correct:'C17 · books',hint:'Your receipt is C17, for school books.',give:'School book parcel',speaker:'Depot keeper',dialogue:'Tell me the exact label before I sign the handover.'})]),
  m('Books before the celebration','Return the parcel to the teacher and collect the school’s banner for the fair.',[
   ride('autoDepot','autoVillage','F · Ride home with the school parcel · ₹15'),
   s('school','deliver','Deliver the books to the teacher',{require:'School book parcel',take:'School book parcel',speaker:'Teacher',dialogue:'You followed the evidence instead of guessing. Our reading corner can open now.',rewardCash:50}),
   s('school','collect','Collect the school banner',{give:'School banner',activity:'Help prepare the reading-corner banner',duration:6}),
   s('square','talk','Tell the tea seller the parcel was found',{speaker:'Tea seller',dialogue:'Everyone is heading to the mela. The auto is waiting at the stand.',time:1020})]),
  m('A village full of stories','Finish the reading corner, play the memory game and choose the message you share on stage.',[
   ride('autoVillage','autoFair','F · Join the evening mela · ₹15'),
   s('stage','deliver','Hang the school banner',{require:'School banner',take:'School banner',activity:'Open the community reading corner',duration:7,speaker:'Organiser Meena',dialogue:'The fruit and the books are here. This fair belongs to everyone who helped.'}),
   s('fairGame','play','Recall the three signboard symbols',{choices:['Mango → Book → Lamp','Lamp → Mango → Book','Book → Lamp → Mango'],correct:'Mango → Book → Lamp',hint:'Look in your journal: MANGO → BOOK → LAMP.',give:'Mela ribbon',rewardCash:25,speaker:'Game host',dialogue:'Which order was on the morning signboard?'}),
   s('stage','speech','Choose your message for the village',{choices:['Thank the neighbours who helped in the rain','Invite everyone to the new reading corner'],flags:{fairLights:true},speaker:'Aarav',dialogue:'This journey taught me that every road leads to someone with a story.',activity:'The village lights the mela lamps',time:1140})]),
  m('The road home','Travel home under the evening sky and share the ending of the parcel story with your family.',[
   ride('autoFair','autoVillage','F · Take the final auto home · ₹15'),
   s('kitchen','eat','Tell Maa about the books and the mela',{speaker:'Mother',dialogue:'You brought back more than a ribbon: new friends, a story, and promises kept.',activity:'A late family dinner',duration:7,time:1260}),
   s('dadi','story','Listen to Dadi’s final story',{speaker:'Dadi',dialogue:'रास्ते गाँव को जोड़ते हैं, और भरोसा लोगों को। Roads join places; trust joins people.',note:'Day 4 complete: the book parcel reached school, and the mela reading corner opened.'}),
   s('home','sleep','Rest after four days of village life',{activity:'DAY 4 COMPLETED · ROADS THAT BRING US HOME',endDay:true})])
 ]}
];
