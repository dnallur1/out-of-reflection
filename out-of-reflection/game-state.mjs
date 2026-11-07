export const baseline = { scene:'living', flower:false, lamp:true, plant:true, clock:3, picture:'sun', cushion:'plain', mug:'cream', shelfBooks:3, upholstery:'plain', carpet:'woven', lowerPicture:'mountains', curtains:'straight' };
export const roomBaselines=[baseline,
 {scene:'kitchen',kettle:true,fruit:'apples',towel:'plain',cabinet:'solid',shelfJar:false},
 {scene:'bedroom',pillow:'plain',blanket:'stripes',nightBook:1,stars:'single',botanical:'leaves',bedLamp:true,wardrobe:'bars'}
];
export const stages = [
 {flower:true,lamp:false,plant:false,clock:8,picture:'moon',cushion:'stripe'},
 {kettle:false,fruit:'pears',towel:'striped',cabinet:'glass',shelfJar:true},
 {pillow:'striped',blanket:'diamonds',nightBook:2,stars:'extra',botanical:'flower',bedLamp:false,wardrobe:'round'}
];
export const LIVING_ROUNDS=[['flower','lamp','plant'],['clock','picture'],['cushion']];
export const STAGE_COUNTS=stages.map((stage,index)=>index===0?LIVING_ROUNDS.length:Object.keys(stage).length);
export const STAGE_STARTS=STAGE_COUNTS.map((_,index)=>STAGE_COUNTS.slice(0,index).reduce((a,b)=>a+b,0));
export const TOTAL=STAGE_COUNTS.reduce((a,b)=>a+b,0);
export function stageProgress(state){return state.found-STAGE_STARTS[stageIndex(state)];}
export function initialState(){return {started:false,stage:0,found:0,score:0,room:{...baseline},choices:[],stageFound:[]};}
export function stageIndex(state){return state.stage;}
export function remaining(state){
 if(state.found===TOTAL)return [];
 if(stageIndex(state)===0)return [...(LIVING_ROUNDS[state.stageFound.length]||[])];
 return Object.keys(stages[stageIndex(state)]).filter(key=>!state.stageFound.includes(key));
}
export function reflected(state){const image={...state.room};for(const key of remaining(state))image[key]=stages[stageIndex(state)][key];return image;}
export function select(state,key){
 if(!state.started||!remaining(state).includes(key))return {state,correct:false};
 const next={...state,room:{...state.room},choices:[...state.choices,key],stageFound:[...state.stageFound,key],found:state.found+1,score:state.score+100};
 if(stageIndex(state)===2)next.room[key]=stages[2][key];
 return {state:next,correct:true};
}

export function advance(state){
 if(!state.started||state.stage===stages.length-1||state.stageFound.length!==STAGE_COUNTS[state.stage])return state;
 const stage=state.stage+1;
 return {...state,stage,stageFound:[],room:{...roomBaselines[stage]}};
}
