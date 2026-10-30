/* English Sikau · Nepal Explorer · Keep the full 77 district journey.
 * Completing an English game can reveal a district map puzzle piece.
 * Saved district dates are preserved; the old Explorer points ledger is retired.
 * No quiz grading, authentication, membership or lesson state is changed.
 */
(function(){
"use strict";
const DATA_URL=new URL("./assets/nepal-districts-lite.json?v=20261021-r1",document.baseURI).href;
const CSS_URL=new URL("./nepal-explorer.css?v=20261021-r1",document.baseURI).href;
const STORE="english-sikau-nepal-explorer-v1:";
const PROVINCES={1:"Koshi",2:"Madhesh",3:"Bagmati",4:"Gandaki",5:"Lumbini",6:"Karnali",7:"Sudurpashchim"};
const ROUTE=[3,4,5,6,7,1,2];
const CLAIM_STAMPS=3;
const place=(d,t,cl,content)=>{const n=d.createElement(t);if(cl)n.className=cl;if(content!=null)n.textContent=String(content);return n;};
let datasetPromise=null;
function getDataset(win){
 if(!datasetPromise){
  datasetPromise=win.fetch(DATA_URL,{cache:"force-cache"}).then(r=>{
   if(!r.ok)throw Error("Map unavailable");
   return r.json();
  }).then(j=>{
   if(!Array.isArray(j.districts)||j.districts.length!==77||new Set(j.districts.map(x=>x.id)).size!==77)throw Error("Map verification failed");
   return j.districts;
  }).catch(()=>{datasetPromise=null;return null;});
 }
 return datasetPromise;
}
function routeOf(districts){
 const out=[];
 for(const province of ROUTE){
  const group=districts.filter(x=>x.province===province)
    .sort((a,b)=>a.en.localeCompare(b.en,"en"));
  if(province===3){
   const ktm=group.find(x=>x.id==="KATHMANDU");
   if(ktm){group.splice(group.indexOf(ktm),1);group.unshift(ktm);}
  }
  out.push(...group);
 }
 return out;
}
function nepalDate(now=new Date()){
 const parts=new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kathmandu",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(now);
 const part=t=>parts.find(p=>p.type===t)?.value||"";
 return part("year")+"-"+part("month")+"-"+part("day");
}
function normalize(raw){
 const source=raw&&typeof raw==="object"?raw:{};
 const days={};
 for(const [key,value] of Object.entries(source.days||{})){
  if(typeof key!=="string"||!Array.isArray(value))continue;
  days[key]=[...new Set(value.filter(d=>typeof d==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(d)))].sort().slice(0,CLAIM_STAMPS);
 }
 // Legacy saved points are deliberately ignored, without deleting district stamps.
 return {days,lastDay:typeof source.lastDay==="string"?source.lastDay:""};
}
function completed(state,district){return (state.days[district.id]||[]).length>=CLAIM_STAMPS;}
function currentDistrict(route,state){return route.find(d=>!completed(state,d))||null;}
function earnedTotal(route,state){return route.filter(d=>completed(state,d)).length;}
function award(route,state,date,score){
 const next=currentDistrict(route,state);
 if(!next)return {ok:false,reason:"finished"};
 if(!Number.isFinite(score)||score<80)return {ok:false,reason:"score"};
 if(state.lastDay===date)return {ok:false,reason:"daily"};
 const list=state.days[next.id]||[];
 if(list.includes(date))return {ok:false,reason:"daily"};
 const fresh={days:{...state.days,[next.id]:[...list,date].sort().slice(0,CLAIM_STAMPS)},lastDay:date};
 return {ok:true,district:next,unlocked:completed(fresh,next),state:fresh};
}
function missionScore(gameRoot){
 if(!gameRoot)return null;
 const content=(gameRoot.innerText||gameRoot.textContent||"").replace(/\s+/g," ");
 // Only native finished quest results qualify, not arbitrary progress banners.
 if(!/Mission accomplished|Mission complete|Mission cleared|Quest complete/i.test(content))return null;
 const match=content.match(/(\d{1,2})\s*\/\s*(\d{1,2})\s*correct/i);
 if(!match)return null;
 const correct=Number(match[1]),total=Number(match[2]);
 if(total<3||correct>total)return null;
 const percentage=Math.round(100*correct/total);
 return percentage>=80?percentage:null;
}
function drawMap(doc,container,districts,route,state,selectedId,onSelect){
 const svg=doc.createElementNS("http://www.w3.org/2000/svg","svg");
 svg.setAttribute("viewBox","0 0 960 450");
 svg.setAttribute("role","img");
 svg.setAttribute("aria-label","Map of Nepal and its 77 districts. Gold means collected; pink is the current district.");
 svg.classList.add("ne-map");
 const all=districts.flatMap(x=>x.rings.flat());
 const lon=all.map(x=>x[0]),lat=all.map(x=>x[1]);
 const xmin=Math.min(...lon),xmax=Math.max(...lon),ymin=Math.min(...lat),ymax=Math.max(...lat);
 const pad=15,rangeX=xmax-xmin,rangeY=ymax-ymin;
 const scale=Math.min((960-2*pad)/rangeX,(450-2*pad)/rangeY);
 const projected=([x,y])=>[(pad+(x-xmin)*scale).toFixed(1),(450-pad-(y-ymin)*scale).toFixed(1)];
 const next=currentDistrict(route,state);
 for(const district of districts){
  const path=doc.createElementNS("http://www.w3.org/2000/svg","path");
  path.setAttribute("d",district.rings.map(ring=>ring.map((p,i)=>{
   const [x,y]=projected(p);
   return (i?"L":"M")+x+" "+y;
  }).join(" ")+" Z").join(" "));
  path.setAttribute("class","ne-district"+(completed(state,district)?" collected":next?.id===district.id?" current":"")+
   (district.id===selectedId?" selected":""));
  path.setAttribute("data-district",district.id);
  path.setAttribute("tabindex","0");
  path.setAttribute("role","button");
  const full=district.en+" · "+district.ne+" · "+PROVINCES[district.province]+" Province";
  path.setAttribute("aria-label",full);
  const title=doc.createElementNS("http://www.w3.org/2000/svg","title");title.textContent=full;path.append(title);
  const choose=()=>onSelect(district.id);
  path.addEventListener("click",choose);
  path.addEventListener("keydown",e=>{
   if(e.key==="Enter"||e.key===" "){e.preventDefault();choose();}
  });
  svg.appendChild(path);
 }
 container.replaceChildren(svg);
}
function snapshot(root){
 const match=missionScore(root);
 return match===null?"":String(match)+"|"+(root.querySelector(".game-banner")?.textContent||"").slice(0,180);
}
window.enhanceNepalJourney=function(doc,accountId){
 const sec=doc?.getElementById("game"),content=sec?.querySelector(":scope > .content"),host=sec?.querySelector("#gameRoot");
 if(!doc?.defaultView||!content||!host||!accountId)return;
 if(sec.dataset.nepalExplorer==="1")return;
 sec.dataset.nepalExplorer="1";
 const win=doc.defaultView;
 if(!doc.getElementById("nepalExplorerStyle")){
  const link=place(doc,"link");link.id="nepalExplorerStyle";link.rel="stylesheet";link.href=CSS_URL;doc.head.appendChild(link);
 }
 const key=STORE+String(accountId).replace(/[^a-zA-Z0-9_-]/g,"").slice(0,80);
 const read=()=>{
  try{return normalize(JSON.parse(window.localStorage.getItem(key)||"{}"));}catch(_){return normalize(null);}
 };
 let state=read(),districts=null,route=null,selectedId="KATHMANDU",lastScore=null;
 const panel=place(doc,"section","ne-journey");
 panel.setAttribute("aria-label","Nepal Explorer · नेपाल यात्रा");
 const header=place(doc,"div","ne-head");
 const copy=place(doc,"div");copy.append(place(doc,"span","ne-kicker","🗺️ NEPAL EXPLORER · नेपाल यात्रा"),place(doc,"h2",null,"Build your Nepal map · आफ्नो नेपाल बनाऔं"),place(doc,"p",null,"Play English missions and reveal the 77 districts of Nepal, one puzzle piece at a time."));
 const counter=place(doc,"div","ne-count");
 header.append(copy,counter);panel.append(header);
 const stats=place(doc,"div","ne-stats");panel.append(stats);
 const wrap=place(doc,"div","ne-layout");
 const map=place(doc,"div","ne-map-panel"),side=place(doc,"div","ne-guide");
 const mapTitle=place(doc,"p","ne-map-caption","Tap a district on the map to learn its name · नक्सामा जिल्ला छुनुहोस्।");
 map.append(mapTitle);
 const mapRoot=place(doc,"div","ne-map-view");
 const legend=place(doc,"div","ne-legend","🟨 Collected · 🌸 Current · ◻️ Still to discover");
 map.append(mapRoot,legend);
 wrap.append(map,side);panel.append(wrap);
 const footer=place(doc,"p","ne-note","Your Nepal map is saved in this browser for this account. Sign in on the same browser to continue · नेपालको नक्सा यही ब्राउजरमा सुरक्षित हुन्छ।");
 panel.append(footer);
 content.insertBefore(panel,host);
 let note="";
 const show=()=>{
  if(!route||!districts){side.textContent="Loading Nepal's 77 districts…";return;}
  const next=currentDistrict(route,state),complete=earnedTotal(route,state);
  const cur=next||route[route.length-1];
  const progress=next?(state.days[next.id]||[]).length:CLAIM_STAMPS;
  counter.textContent=complete+" / 77 districts";
  stats.replaceChildren();
  for(const [icon,value,label] of [
   ["🗺️",complete+" / 77","Districts discovered · जिल्ला"],
   ["🧩",progress+" / "+CLAIM_STAMPS,"Pieces for next district · अर्को जिल्लाका टुक्रा"],
  ]){
   const item=place(doc,"div","ne-stat");item.append(place(doc,"strong",null,icon+" "+value),place(doc,"small",null,label));stats.append(item);
  }
  drawMap(doc,mapRoot,districts,route,state,selectedId,id=>{selectedId=id;show();});
  side.replaceChildren();
  const selected=districts.find(x=>x.id===selectedId)||cur;
  const info=place(doc,"div","ne-district-info");
  info.append(place(doc,"span","ne-eyebrow","DISTRICT EXPLORER · जिल्ला खोज"),
   place(doc,"h3",null,selected.en+" · "+selected.ne),
   place(doc,"p",null,PROVINCES[selected.province]+" Province · HQ: "+selected.hq));
  if(completed(state,selected))info.append(place(doc,"span","ne-earned","✓ District map piece collected · जिल्ला पूरा भयो"));
  else if(selected.id===next?.id)info.append(place(doc,"span","ne-next","🌸 Current district puzzle · अहिलेको जिल्ला"));
  else info.append(place(doc,"span","ne-locked","🔒 Discover after earlier districts · अर्को जिल्लापछि"));
  side.append(info);
  const journey=place(doc,"div","ne-build");
  journey.append(place(doc,"strong",null,"🏡 Build your district · जिल्ला बनाऔं"));
  const tiles=place(doc,"div","ne-build-tiles");
  const selectedProgress=Math.min(CLAIM_STAMPS,(state.days[selected.id]||[]).length);
  const steps=["🏠","🌳","🏯"];
  for(let i=0;i<3;i++){
   const tile=place(doc,"span",i<selectedProgress?"earned":"locked",steps[i]);
   tile.title=i<selectedProgress?"Puzzle piece added":"Complete an English mission on another day to add this piece";
   tile.setAttribute("aria-label",i<progress?"Puzzle piece collected":"Puzzle piece locked");
   tiles.append(tile);
  }
  journey.append(tiles,place(doc,"small",null,"Practice on three different Nepal calendar days to complete this district."));
  side.append(journey);
  if(complete<77){
   const reward=place(doc,"div","ne-claim");
   const today=nepalDate(),used=state.lastDay===today,score=missionScore(host);
   reward.append(place(doc,"strong",null,used?"✓ Today's map piece added · आजको टुक्रा थपियो":score!==null?"🎉 Mission complete — continue building your Nepal map!":"🎮 Finish an English mission with at least 80% correct to add a map piece."));
   if(!used&&score!==null){
    const button=place(doc,"button","ne-claim-button","🧩 Add today's Nepal map piece");
    button.type="button";
    button.addEventListener("click",()=>{
     // Check the native game result again at claim time.
     const currentScore=missionScore(host);
     if(currentScore===null)return;
     state=read();
     const action=award(route,state,nepalDate(),currentScore);
     if(!action.ok){note="Today's map piece is already added.";show();return;}
     state=action.state;
     try{window.localStorage.setItem(key,JSON.stringify(state));}
     catch(_){note="Browser storage unavailable. Explorer progress might not survive refresh.";}
     selectedId=action.unlocked?(currentDistrict(route,state)?.id||action.district.id):action.district.id;
     note=action.unlocked?"🎊 "+action.district.en+" unlocked! Explore the next district tomorrow.":"✅ Map piece saved! Continue exploring on another day.";
     show();
    });
    reward.append(button);
   }
   if(used)reward.append(place(doc,"small",null,"Continue your Nepal map tomorrow (Nepal time). You can still play English games today."));
   if(note)reward.append(place(doc,"p","ne-claim-status",note));
   side.append(reward);
  }else side.append(place(doc,"p","ne-victory","🏆 All 77 districts discovered! Well done!"));
 };
 getDataset(win).then(data=>{
  if(!data){side.textContent="Nepal map couldn't load. Other English games are still available.";return;}
  districts=data;route=routeOf(data);show();
 });
 let scheduled=false;
 const watch=()=>{
  if(scheduled||!route)return;
  scheduled=true;
  win.requestAnimationFrame(()=>{
   scheduled=false;
   const current=missionScore(host);
   if(current!==lastScore){lastScore=current;show();}
  });
 };
 const observer=new win.MutationObserver(watch);
 observer.observe(host,{childList:true,subtree:true,characterData:true});
 const onReturn=()=>{
  // A new Nepal day or a different signed-in session should be reflected.
  const updated=read();
  if(updated.lastDay!==state.lastDay||JSON.stringify(updated.days)!==JSON.stringify(state.days)){state=updated;show();}
 };
 doc.addEventListener("visibilitychange",()=>{if(!doc.hidden)onReturn();});
};
})();
