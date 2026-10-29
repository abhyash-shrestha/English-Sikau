/* English Sikau Coach — per-account local browser draft storage.
 * Stores practice dialogue only, never access rights, payment status or XP.
 * The verified parent page must supply the Appwrite user ID. Without it,
 * draft storage is disabled to prevent cross-account disclosure.
 */
(function(){
 'use strict';
 const VERSION=1, PREFIX='english-sikau-coach-draft-v1:';
 const allowStates=new Set(['intent','item','reason','condition','receipt','evidence','source','onlineProof','giftProof','timing','managerRequested','verification','outcome']);
 function make(userId,scenarios){
  if(typeof userId!=='string'||!(/^[a-zA-Z0-9_-]{6,128}$/.test(userId)))return null;
  let store=null;
  try{store=window.localStorage;}catch(_){}
  if(!store)return null;
  const key=PREFIX+userId;
  const validStep=x=>x&&typeof x==='object'&&
   typeof x.npc==='string'&&x.npc.length>0&&x.npc.length<=700&&
   typeof x.npcNe==='string'&&x.npcNe.length<=900&&
   typeof x.answer==='string'&&x.answer.length>0&&x.answer.length<=700&&
   typeof x.answerNe==='string'&&x.answerNe.length<=900;
  const cleanState=state=>{
   const data=Object.create(null);
   if(state&&typeof state==='object'){
    for(const [k,v] of Object.entries(state))
     if(allowStates.has(k)&&(typeof v==='boolean'||typeof v==='string'&&v.length<150))data[k]=v;
   }
   return data;
  };
  const remove=()=>{try{store.removeItem(key)}catch(_){}};
  function read(){
   let raw;try{raw=store.getItem(key)}catch(_){return null}
   if(!raw)return null;
   if(raw.length>220000){remove();return null;}
   try{
    const d=JSON.parse(raw);
    if(d.version!==VERSION||!scenarios.some(x=>x.id===d.sceneId)||
     !Array.isArray(d.steps)||d.steps.length<1||d.steps.length>50||
     !d.steps.every(validStep)||!Array.isArray(d.history)||d.history.length>50||
     !d.history.every(h=>!h||(typeof h.reply==='string'&&h.reply.length<=1000))||
     !Number.isInteger(d.index)||d.index<0||d.index>=d.steps.length||
     (d.isBranchingStore&&d.sceneId!=='return-shirt')||
     (d.pendingChoice&&typeof d.pendingChoice.value!=='string'))throw Error('Invalid Coach draft');
    d.storeState=cleanState(d.storeState);
    if(d.isBranchingV4){
     const state=d.v4State;
     if(!state||typeof state!=='object'||!Number.isInteger(state.route)||
       state.route< -1||state.route>2||!Number.isInteger(state.stage)||
       state.stage<0||state.stage>40||!Array.isArray(state.messages)||
       state.messages.length>120||!state.messages.every(x=>
        x&&['npc','you'].includes(x.role)&&typeof x.text==='string'&&x.text.length<=5000)||
       !Array.isArray(state.facts)||state.facts.length>100||
       (state.cafe&&typeof state.cafe!=='object'))throw Error('Invalid V4 state');
     // Drafts contain conversation text only. Reject prototypes or unexpected
     // nested data before retaining the snapshot.
     if(JSON.stringify(state).length>70000)throw Error('Oversized V4 state');
    }
    if(d.isBranchingStory){
     if(d.sceneId==='return-shirt')throw Error('Incorrect Coach story type');
     const state=d.storyState;
     if(!state||state.scene!==d.sceneId||!Number.isInteger(state.path)||
        state.path<0||state.path>2||
        !(state.detail===null||Number.isInteger(state.detail)&&state.detail>=0&&state.detail<=2))
      throw Error('Invalid Coach story state');
     const extras=Object.create(null);
     for(const key of ['priority','offer','payment','variant','accessories','decision','storage','color','need'])
      if(typeof state[key]==='string'&&state[key].length<=60)extras[key]=state[key];
     if(typeof state.paymentConfirmed==='boolean')extras.paymentConfirmed=state.paymentConfirmed;
     // Old versions did not store capacity/color in the story state.
     // Recover them from the learner's already-saved phone quote, without
     // altering any prior chosen responses or price history.
     if(d.sceneId==='buy-phone'&&!extras.storage){
      const past=d.steps.filter(step=>['phone-quote','phone-checkout','phone-finish','phone-receipt'].includes(step.nodeId));
      for(let i=past.length-1;i>=0;i--){
       const match=past[i].npc.match(/\((128 GB|256 GB|512 GB|1 TB)\)/);
       if(match){
        extras.storage=match[1];
        const color=past[i].npc.match(/\), (Black|Blue|Silver)\b/);
        if(color&&!extras.color)extras.color=color[1];
        break;
       }
      }
     }
     d.storyState={scene:d.sceneId,path:state.path,detail:state.detail,...extras};
    }
    return d;
   }catch(_){remove();return null}
  }
  function save(data){
   if(!data?.active||!Array.isArray(data.active.steps)||data.active.steps.length>50)return false;
   const a=data.active;
   const d={version:VERSION,sceneId:a.id,steps:a.steps,savedAt:Date.now(),
    index:data.index,history:data.history,
    successful:data.successful,attempts:data.attempts,
    coachRound:a.coachRound,practiceNumber:a.coachPracticeNumber,
    coachStyle:a.coachStyle,isBranchingStore:!!a.isBranchingStore,
    storeCompleted:!!a.storeCompleted,storeState:cleanState(a.storeState),
    isBranchingStory:!!a.isBranchingStory,
    storyCompleted:!!a.storyCompleted,
    isBranchingV4:!!a.isBranchingV4,
    v4Completed:!!a.v4Completed,
    v4State:a.isBranchingV4?a.v4State:null,
    storyState:a.isBranchingStory?{
     scene:a.id,path:a.storyState?.path,detail:a.storyState?.detail,
     ...Object.fromEntries(['priority','offer','payment','variant','accessories','decision','storage','color','need']
      .filter(k=>typeof a.storyState?.[k]==='string'&&a.storyState[k].length<=60)
      .map(k=>[k,a.storyState[k]])),
     ...(typeof a.storyState?.paymentConfirmed==='boolean'?{paymentConfirmed:a.storyState.paymentConfirmed}:{})
    }:null,
    pendingChoice:data.pendingChoice?{
     value:String(data.pendingChoice.value||'').slice(0,700),
     ne:String(data.pendingChoice.ne||'').slice(0,900)}:null};
   try{const raw=JSON.stringify(d);
    if(raw.length>180000)return false;
    store.setItem(key,raw);return true;
   }catch(_){return false}
  }
  return {read,save,remove};
 }
 window.sikauCoachDrafts=Object.freeze({make});
})();
