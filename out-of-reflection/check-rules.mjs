import {clues} from './hints.mjs';
import assert from 'node:assert/strict';
import {drawRoom,roomObjects} from './room.js';
import {roomBaselines,initialState,reflected,stages,remaining,stageIndex,stageProgress,select,TOTAL,STAGE_COUNTS,advance,retryRoom} from './game-state.mjs';
assert.deepEqual(STAGE_COUNTS,[3,5,7]);assert.equal(TOTAL,15);
const seen=new Set();
for(const [index,stage] of stages.entries()){
 const baseline=roomBaselines[index],areas=roomObjects(baseline.scene);
 for(const [key,value] of Object.entries(stage)){
  assert(!seen.has(key));seen.add(key);assert(clues[key],`${key} has a text clue`);
  for(const colour of [0,.5,1])assert.notEqual(drawRoom(baseline,colour),drawRoom({...baseline,[key]:value},colour),`${key} changes artwork`);
  const a=areas[key];assert(a,`${key} has hit area`);
  assert(a.x-a.w/2>=0&&a.x+a.w/2<=800&&a.y-a.h/2>=0&&a.y+a.h/2<=520);
 }
}
// Every reachable subset and outgoing selection is checked. These cover every
// ordering without traversing equivalent states millions of times.
const visited=new Set();let edges=0;
function walk(state){
 const signature=JSON.stringify([state.stage,state.found,[...state.stageFound].sort()]);
 if(visited.has(signature))return;visited.add(signature);
 assert.equal(state.score,state.found*100);
 assert.equal(state.room.scene,roomBaselines[stageIndex(state)].scene);
 assert.equal(select(state,'invalid').correct,false);
 if(state.found===TOTAL){assert.equal(state.score,1500);assert.deepEqual(reflected(state),state.room);assert.equal(state.stageFound.length,7);return;}
 const index=stageIndex(state);
 if(state.stageFound.length===STAGE_COUNTS[index]){
  assert.deepEqual(reflected(state),state.room);assert.equal(remaining(state).length,0);
  const next=advance(state);assert.equal(next.stage,index+1);assert.equal(next.found,state.found);
  assert.equal(stageProgress(next),0);assert.deepEqual(next.room,roomBaselines[index+1]);walk(next);return;
 }
 assert.equal(advance(state),state,'Cannot skip unfinished room');
 const valid=remaining(state);
 assert.equal(valid.length,STAGE_COUNTS[index]-stageProgress(state));
 for(const key of valid){
  const {state:next,correct}=select(state,key);edges++;assert(correct);
  assert.equal(next.found,state.found+1);assert.equal(select(next,key).correct,false);
  assert.equal(stageIndex(next),index,'Completion stays in current room until Continue');
  assert.equal(reflected(next)[key],next.room[key]);assert.equal(next.stageFound.length,state.stageFound.length+1);
  if(index===0){
   const after=remaining(next);
   assert(valid.every(item=>!after.includes(item)),'Every old mismatch changes after a correct find');
   assert(valid.every(item=>reflected(next)[item]===next.room[item]),'Previous mismatches disappear');
  }
  walk(next);
 }
}
assert.equal(select(initialState(),'flower').correct,false);
walk({...initialState(),started:true});
assert.deepEqual(initialState().stageFound,[]);
console.log(`PASS: shifting level-1 mismatches, 3/5/7 targets and explicit Continue gates; ${visited.size} reachable states and ${edges} transitions covering all 3,628,800 discovery orders; distinct artwork and valid hit areas; duplicate prevention; 15 finds, score 1500, matching final room.`);

// Each room permits two mistakes, then locks until that room is retried.
for(let stage=0;stage<3;stage++){
 let state={...initialState(),started:true};
 while(state.stage<stage){while(remaining(state).length)state=select(state,remaining(state)[0]).state;state=advance(state);}
 const savedFound=state.found,savedChoices=[...state.choices];
 state=select(state,remaining(state)[0]).state;
 const progress=state.found;
 for(let mistake=1;mistake<=3;mistake++){
  const result=select(state,null);assert(result.penalty);state=result.state;
  assert.equal(state.mistakes,mistake);assert.equal(state.failed,mistake===3);
  assert.equal(state.found,progress);assert.equal(state.score,progress*100);
 }
 assert.equal(select(state,remaining(state)[0]).state,state,'Failed room cannot score');
 assert.equal(advance(state),state,'Failed room cannot advance');
 state=retryRoom(state);
 assert.equal(state.stage,stage);assert.equal(state.found,savedFound);assert.equal(state.score,savedFound*100);
 assert.deepEqual(state.choices,savedChoices);assert.equal(state.mistakes,0);assert.equal(state.failed,false);
 assert.deepEqual(state.room,roomBaselines[stage]);
 state=select(state,null).state;
 while(remaining(state).length)state=select(state,remaining(state)[0]).state;
 if(stage<2){state=advance(state);assert.equal(state.mistakes,0);assert.equal(state.failed,false);}
}
console.log('PASS: two extra mistakes in every room; third mistake locks; retry preserves completed rooms and resets current-room colour, score, differences and chances; next room restores chances.');
