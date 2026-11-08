export const baseline = { scene:'living', flower:false, lamp:true, plant:true, clock:3, picture:'sun', cushion:'plain', mug:'cream', shelfBooks:3, upholstery:'plain', carpet:'woven', lowerPicture:'mountains', curtains:'straight' };
export const roomBaselines=[baseline,
 {scene:'kitchen',kettle:true,fruit:'apples',towel:'plain',cabinet:'solid',shelfJar:false,kitchenSky:'sun',utensil:'spoon',cupHandles:1,stoveDial:'round'},
 {scene:'bedroom',pillow:'plain',blanket:'stripes',nightBook:1,stars:'single',botanical:'leaves',bedLamp:true,wardrobe:'bars',rightBotanical:'leaves',windowStars:false,drapeDots:false,headboard:'plain',rugSpots:false,wardrobeBadge:false}
];
export const stages = [
 {flower:true,lamp:false,plant:false,clock:8,picture:'moon',cushion:'stripe'},
 {kettle:false,fruit:'pears',towel:'striped',cabinet:'glass',shelfJar:true,kitchenSky:'moon',utensil:'fork',cupHandles:2,stoveDial:'square'},
 {pillow:'striped',blanket:'diamonds',nightBook:2,stars:'extra',botanical:'flower',bedLamp:false,wardrobe:'round',rightBotanical:'cactus',windowStars:true,drapeDots:true,headboard:'tufted',rugSpots:true,wardrobeBadge:true}
];
export const LIVING_ROUNDS=[['flower','lamp','plant'],['clock','picture'],['cushion']];
export const STAGE_COUNTS=[LIVING_ROUNDS.length,5,7];
export const STAGE_STARTS=STAGE_COUNTS.map((_,index)=>STAGE_COUNTS.slice(0,index).reduce((a,b)=>a+b,0));
export const WRONG_ALLOWANCE=2;
export const TOTAL=STAGE_COUNTS.reduce((a,b)=>a+b,0);
export function stageProgress(state){return state.found-STAGE_STARTS[stageIndex(state)];}
export function initialState(){return {started:false,mistakes:0,failed:false,stage:0,found:0,score:0,room:{...baseline},choices:[],stageFound:[],active:[]};}
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
 if(stageIndex(state)===2)next.room[key]=stages[2][key];
 if(state.stage>0){
  // A large enough pool lets every unfound mismatch change location at once.
  // Found objects stay resolved and never score again in this room.
  const excluded=new Set([...remaining(state),...next.stageFound]);
  const needed=STAGE_COUNTS[state.stage]-next.stageFound.length;
  next.active=Object.keys(stages[state.stage]).filter(item=>!excluded.has(item)).slice(0,needed);
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
 return {...state,found,score:found*100,choices:state.choices.slice(0,found),stageFound:[],active:state.stage===0?[]:Object.keys(stages[state.stage]).slice(0,STAGE_COUNTS[state.stage]),mistakes:0,failed:false,room:{...roomBaselines[state.stage]}};
}
