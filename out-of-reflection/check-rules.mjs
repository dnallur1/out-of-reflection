import assert from 'node:assert/strict';
import {drawRoom,roomObjects} from './room.js';
import {roomBaselines,initialState,reflected,stages,remaining,stageIndex,stageProgress,select,TOTAL,STAGE_COUNTS,advance} from './game-state.mjs';
assert.deepEqual(STAGE_COUNTS,[3,5,7]);assert.equal(TOTAL,15);
const seen=new Set();
for(const [index,stage] of stages.entries()){
 const baseline=roomBaselines[index],areas=roomObjects(baseline.scene);
 for(const [key,value] of Object.entries(stage)){
  assert(!seen.has(key));seen.add(key);
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
  walk(next);
 }
}
assert.equal(select(initialState(),'flower').correct,false);
walk({...initialState(),started:true});
assert.deepEqual(initialState().stageFound,[]);
console.log(`PASS: 3/5/7 targets and explicit Continue gates; ${visited.size} reachable states and ${edges} transitions covering all 3,628,800 discovery orders; distinct artwork and valid hit areas; duplicate prevention; 15 finds, score 1500, matching final room.`);
