import {extraKeys} from './extra-rooms.js?v=seven-levels-1';
export const baseline = { scene:'living', flower:false, lamp:true, plant:true, clock:3, picture:'sun', cushion:'plain', mug:'cream', shelfBooks:3, upholstery:'plain', carpet:'woven', lowerPicture:'mountains', curtains:'straight' };
export const roomBaselines=[baseline,
 {scene:'kitchen',kettle:true,fruit:'apples',towel:'plain',cabinet:'solid',shelfJar:false,kitchenFan:'horizontal',utensil:'spoon',cupHandles:1,stoveDial:'round'},
 {scene:'bedroom',pillow:'plain',blanket:'stripes',nightBook:1,stars:'single',botanical:'aligned',bedLamp:true,wardrobe:'bars',rightBotanical:'leaves',windowStars:false,drapeDots:false,headboard:'plain',rugSpots:false,wardrobeBadge:false}
];
export const stages = [
 {flower:true,lamp:false,plant:false,clock:8,picture:'moon',cushion:'stitched'},
 {kettle:false,fruit:'pears',towel:'striped',cabinet:'glass',shelfJar:true,kitchenFan:'vertical',utensil:'fork',cupHandles:2,stoveDial:'square'},
 {pillow:'striped',blanket:'diamonds',nightBook:2,stars:'extra',botanical:'lowered',bedLamp:false,wardrobe:'round',rightBotanical:'cactus',windowStars:true,drapeDots:true,headboard:'tufted',rugSpots:true,wardrobeBadge:true}
];
for(const [i,scene] of ['study','greenhouse','attic','garage'].entries()){
 roomBaselines.push({scene,...Object.fromEntries(extraKeys.map(key=>[key,false]))});
 const order=[...extraKeys.slice((i*4)%extraKeys.length),...extraKeys.slice(0,(i*4)%extraKeys.length)];
 stages.push(Object.fromEntries(order.map(key=>[key,true])));
}
// Local playtest: later rooms start with detail comparisons rather than large silhouettes.
for(const [stage,order] of [
 [5,['extraNote','extraHandles','extraBox','extraMobile','extraRug','extraClock','extraCushion']],
 [6,['extraPicture','extraBooks','extraCup','extraNote','extraCushion','extraBox','extraMobile']]
])stages[stage]=Object.fromEntries([...order,...extraKeys.filter(key=>!order.includes(key))].map(key=>[key,true]));
export const LIVING_ROUNDS=[['flower','lamp','plant'],['clock','picture'],['cushion']];
export const STAGE_COUNTS=[LIVING_ROUNDS.length,5,7,7,7,7,7];
// Each list starts with the smallest details and ends with easier fallbacks.
const detailPriority = [
 [],
 ['stoveDial','kitchenFan','cupHandles','utensil','towel','shelfJar'],
 ['drapeDots','wardrobe','windowStars','headboard','nightBook','wardrobeBadge','rugSpots','rightBotanical'],
 ['extraLamp','extraCup','extraNote','extraMobile','extraBox','extraPicture','extraPlant','extraCushion'],
 ['extraLamp','extraClock','extraBox','extraCushion','extraNote','extraRug','extraHandles','extraMobile'],
 ['extraNote','extraHandles','extraBox','extraMobile','extraRug','extraClock','extraCushion','extraLamp'],
];
detailPriority.push([...extraKeys].reverse());
export const STAGE_STARTS=STAGE_COUNTS.map((_,index)=>STAGE_COUNTS.slice(0,index).reduce((a,b)=>a+b,0));
export const WRONG_ALLOWANCE=2;
export const TOTAL=STAGE_COUNTS.reduce((a,b)=>a+b,0);
export function stageProgress(state){return state.found-STAGE_STARTS[stageIndex(state)];}
export function initialState(){return {started:false,mistakes:0,failed:false,stage:0,found:0,score:0,room:{...baseline},choices:[],completedRooms:[],stageFound:[],active:[]};}
export function stageIndex(state){return state.stage;}
export function remaining(state){
 if(state.found===TOTAL)return [];
 if(stageIndex(state)===0)return [...(LIVING_ROUNDS[state.stageFound.length]||[])];
 return [...state.active];
}
export function reflected(state){const image={...state.room};for(const key of remaining(state))image[key]=stages[stageIndex(state)][key];return image;}
export function select(state,key){
 if(!state.started||state.failed||stageProgress(state)===STAGE_COUNTS[state.stage]||state.stageFound.includes(key))return {state,correct:false,penalty:false};
 if(!remaining(state).includes(key)){
  const mistakes=state.mistakes+1;
  return {state:{...state,mistakes,failed:mistakes>WRONG_ALLOWANCE},correct:false,penalty:true};
 }
 const next={...state,room:{...state.room},choices:[...state.choices,key],stageFound:[...state.stageFound,key],found:state.found+1,score:state.score+100};
 if(stageIndex(state)>=2)next.room[key]=stages[state.stage][key];
 if(state.stage>0){
  // A large enough pool lets every unfound mismatch change location at once.
  // Found objects stay resolved and never score again in this room.
  const excluded=new Set([...remaining(state),...next.stageFound]);
  const target=STAGE_COUNTS[state.stage];
  const needed=target-next.stageFound.length;
  const available=Object.keys(stages[state.stage]).filter(item=>!excluded.has(item));
  const detailShare=next.stageFound.length/(target-1);
  const detailCount=Math.round(needed*(state.stage>=5?.55+.45*detailShare:detailShare));
  const fineDetails=detailPriority[state.stage].filter(item=>available.includes(item)).slice(0,detailCount);
  const otherDetails=available.filter(item=>!fineDetails.includes(item)).slice(0,needed-fineDetails.length);
  next.active=[...otherDetails,...fineDetails];
 }
 if(next.stageFound.length===STAGE_COUNTS[state.stage]){
  next.completedRooms=[...(state.completedRooms||[]),{room:{...next.room},choices:[...next.stageFound]}];
 }
 return {state:next,correct:true};
}

export function advance(state){
 if(!state.started||state.failed||state.stage===stages.length-1||state.stageFound.length!==STAGE_COUNTS[state.stage])return state;
 const stage=state.stage+1;
 return {...state,stage,mistakes:0,failed:false,stageFound:[],active:Object.keys(stages[stage]).slice(0,STAGE_COUNTS[stage]),room:{...roomBaselines[stage]}};
}

export function retryRoom(state){
 if(!state.started)return state;
 const found=STAGE_STARTS[state.stage];
 return {...state,found,score:found*100,choices:state.choices.slice(0,found),stageFound:[],active:state.stage===0?[]:Object.keys(stages[state.stage]).slice(0,STAGE_COUNTS[state.stage]),mistakes:0,failed:false,completedRooms:(state.completedRooms||[]).slice(0,state.stage),room:{...roomBaselines[state.stage]}};
}
