import {clues} from './hints.mjs?v=chances-1';
import {initialState,reflected,select,remaining,TOTAL,stageIndex,stageProgress,STAGE_COUNTS,STAGE_STARTS,advance,WRONG_ALLOWANCE,retryRoom} from './game-state.mjs?v=chances-1';
import {drawRoom,roomObjects} from './room.js?v=chances-1';
const $=id=>document.getElementById(id);
let state=initialState(),busy=false,soundOn=true,audio,feedbackTimer;
const roomNames=['Living room','Kitchen','Bedroom'];
const roomComplete=()=>stageProgress(state)===STAGE_COUNTS[stageIndex(state)];
const stageCopy=[['01 / LIVING ROOM','Look, then look again.','Find three differences. After each find, the remaining differences shift. Look again as colour returns.'],['02 / KITCHEN','A new room. A closer look.','Find five differences in the kitchen: compare the countertop, cooker and cabinet.'],['03 / BEDROOM','Watch the room transform.','Find seven differences in the bedroom. Each selection changes the real room to match its reflection.']];
function cue(kind){if(!soundOn)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();const t=audio.currentTime;for(const [freq,duration,volume] of kind==='wrong'?[[260,.22,.055],[196,.3,.035]]:kind==='end'?[[523,.8,.05],[659,.8,.03]]:[[660,.35,.05],[667,.5,.02]]){const o=audio.createOscillator(),g=audio.createGain();o.frequency.value=freq;g.gain.setValueAtTime(volume,t);g.gain.exponentialRampToValueAtTime(.001,t+duration);o.connect(g).connect(audio.destination);o.start(t);o.stop(t+duration);}}catch{soundOn=false;$('sound').textContent='Sound unavailable';}}
function render(){
 const objects=roomObjects(state.room.scene);
 const roomName=roomNames[stageIndex(state)];
 const colour=stageProgress(state)/STAGE_COUNTS[stageIndex(state)],step=1/STAGE_COUNTS[stageIndex(state)];
 document.querySelector('.scene-panel h2').innerHTML=`The room · ${roomName} <span>compare & select</span>`;
 $('room').innerHTML=drawRoom(state.room,colour,step);$('mirror').innerHTML=drawRoom(reflected(state),colour,step);
 $('board').style.setProperty('--blur',`${3*(1-colour)}px`);
 for(const view of ['room','mirror'])for(const [key,o] of Object.entries(objects)){
 const b=document.createElement('button');b.className='target';b.dataset.object=key;b.setAttribute('aria-label',`Inspect ${view==='mirror'?'reflected':'room'} ${o.name}`);b.style.left=`${view==='mirror'?100-o.x/8:o.x/8}%`;b.style.top=`${o.y/5.2}%`;b.style.setProperty('--width',`${o.w/8}%`);b.style.setProperty('--height',`${o.h/5.2}%`);b.disabled=!state.started||roomComplete()||state.failed||busy||state.stageFound.includes(key);if(state.stageFound.includes(key))b.classList.add('resolved');b.addEventListener('click',()=>clickObject(key,view));$(view).append(b);
 }
 for(const item of document.querySelectorAll('.journey li')){
 const index=Number(item.dataset.stage),current=index===stageIndex(state);
 item.classList.toggle('is-current',current);item.classList.toggle('is-done',index<stageIndex(state)||state.found===TOTAL);
 if(current)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');
 }
 $('score').textContent=state.score;
 updateMistakeUI();
 const level=stageIndex(state)+1,within=stageProgress(state),target=STAGE_COUNTS[level-1];
 $('level').innerHTML=`${level} <small>/ 3</small>`;$('progress-label').textContent=`${within} / ${target}`;$('progress').max=target;$('progress').value=within;
 const [num,title,copy]=stageCopy[level-1];$('stage-number').textContent=num;$('stage-title').textContent=title;$('stage-copy').textContent=copy;
 $('hint').disabled=!state.started||roomComplete()||state.failed||busy;
 $('stage-complete').hidden=!roomComplete()||state.found===TOTAL;
 if(roomComplete()&&state.found<TOTAL){
  $('complete-title').textContent=`${roomName} complete!`;
  $('complete-copy').textContent=`All ${target} differences found. Full colour has returned. Continue to the ${roomNames[level].toLowerCase()} to find ${STAGE_COUNTS[level]} new differences.`;
  $('continue').textContent=`Continue to ${roomNames[level].toLowerCase()} →`;
 }
}
// Decorative feedback never captures input or changes puzzle state.
function celebrateDiscovery(key){
 if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const o=roomObjects(state.room.scene)[key];
 for(const view of ['room','mirror']){
  const effect=document.createElement('div');effect.className='discovery-effects';effect.setAttribute('aria-hidden','true');
  effect.style.setProperty('--find-x',`${view==='mirror'?100-o.x/8:o.x/8}%`);
  effect.style.setProperty('--find-y',`${o.y/5.2}%`);
  const wash=document.createElement('span');wash.className='colour-wash';effect.append(wash);
  const ring=document.createElement('span');ring.className='discovery-ring';effect.append(ring);
  const tick=document.createElement('span');tick.className='discovery-tick';tick.textContent='✓';effect.append(tick);
  for(let i=0;i<8;i++){
   const spark=document.createElement('span');spark.className='discovery-spark';
   const angle=i*Math.PI/4;spark.style.setProperty('--spark-x',`${Math.cos(angle)*42}px`);spark.style.setProperty('--spark-y',`${Math.sin(angle)*42}px`);
   spark.style.setProperty('--spark-turn',`${i*45}deg`);effect.append(spark);
  }
  effect.addEventListener('animationend',event=>{if(event.target===effect)effect.remove();});
  $(view).append(effect);
 }
}
function updateMistakeUI(){
 const left=Math.max(0,WRONG_ALLOWANCE-state.mistakes);
 $('chances').textContent=`${left} / ${WRONG_ALLOWANCE}`;
 document.querySelector('.mistake-meter').classList.toggle('is-low',left===0);
 $('retry-overlay').hidden=!state.failed;
}
function clearWarning(){$('mistake-alert').hidden=true;$('mistake-alert').textContent='';}
// Count clicks on matching details and empty scene space, but never on the
// interface, decorative feedback, or an already found (disabled) target.
for(const view of ['room','mirror'])$(view).addEventListener('click',event=>{
 if(!event.target.closest('.target'))clickObject(null,view);
});
function clickObject(key,view){
 if(busy||!state.started||state.failed||roomComplete())return;
 const before=state.found,result=select(state,key),button=key?$(view).querySelector(`[data-object="${key}"]`):null;
 if(!result.correct){
  if(!result.penalty)return;
  state=result.state;busy=true;button?.classList.add('wrong');cue('wrong');updateMistakeUI();
  const left=Math.max(0,WRONG_ALLOWANCE-state.mistakes);
  const message=state.failed?'Too many guesses. Retry this room to continue.':left===0?'That is not a difference. No extra chances left—your next wrong click will require a retry.':'That is not a difference. 1 extra chance left. Take a closer look or ask for a hint.';
  $('mistake-alert').textContent=message;$('mistake-alert').hidden=false;$('status').textContent=message;
  for(const target of document.querySelectorAll('.target'))target.disabled=true;
  $('hint').disabled=true;
  if(state.failed)$('retry-room').focus({preventScroll:true});
  feedbackTimer=setTimeout(()=>{busy=false;button?.classList.remove('wrong');
   if(!state.failed){for(const target of document.querySelectorAll('.target'))target.disabled=state.stageFound.includes(target.dataset.object);$('hint').disabled=false;}
  },400);return;
 }
 clearWarning();
 busy=true;button.classList.add('correct');cue('correct');$('hint').disabled=true;
 for(const b of document.querySelectorAll('.target'))b.disabled=true;
 $('status').textContent=before>=STAGE_STARTS[2]?'Your selection changes the room to match the mirror.':(stageIndex(state)===0?'Found. The reflection has shifted—look again for new differences.':'Found. Colour returns to the room. Find the remaining differences in this stage.');
 feedbackTimer=setTimeout(()=>{state=result.state;busy=false;render();celebrateDiscovery(key);$('hint-text').textContent='Need a nudge? Ask for a short clue.';
 if(state.found===TOTAL){$('ending-details').textContent='You found 3 living room differences, 5 kitchen differences and 7 bedroom differences.';$('ending').hidden=false;$('status').textContent='All fifteen differences found. Full colour has returned to the room.';cue('end');$('inspect').focus();}
 else if(roomComplete()){$('status').textContent=`${roomNames[stageIndex(state)]} complete! All differences found. Select Continue when you are ready.`;cue('end');$('continue').focus({preventScroll:true});}
 else{$('mirror').querySelector('button:not(:disabled)')?.focus({preventScroll:true});}
 },650);
}
$('continue').addEventListener('click',()=>{
 const next=advance(state);if(next===state)return;state=next;clearWarning();render();
 $('status').textContent=`Welcome to the ${roomNames[stageIndex(state)].toLowerCase()}. Find ${STAGE_COUNTS[stageIndex(state)]} differences to restore its colour.`;
 $('hint-text').textContent='Need a nudge? Ask for a short clue.';
 $('mirror').querySelector('button:not(:disabled)')?.focus({preventScroll:true});
});
$('begin').addEventListener('click',()=>{state.started=true;$('opening').hidden=true;render();$('status').textContent='Find all three differences in the living room. You can select either view.';$('mirror').querySelector('button:not(:disabled)')?.focus({preventScroll:true});});
function restart(){clearTimeout(feedbackTimer);busy=false;state=initialState();clearWarning();$('opening').hidden=false;$('ending').hidden=true;$('final-note').hidden=true;$('status').textContent='Begin when you’re ready. There is no timer.';$('hint-text').textContent='Need a nudge? Ask for a short clue.';render();$('begin').focus({preventScroll:true});}
$('retry-room').addEventListener('click',()=>{
 clearTimeout(feedbackTimer);busy=false;state=retryRoom(state);clearWarning();render();
 $('hint-text').textContent='Need a nudge? Ask for a short clue.';
 $('status').textContent=`A fresh start in the ${roomNames[state.stage].toLowerCase()}. Two extra chances restored.`;
 $('mirror').querySelector('button:not(:disabled)')?.focus({preventScroll:true});
});
$('restart').addEventListener('click',restart);$('replay').addEventListener('click',restart);
$('inspect').addEventListener('click',()=>{$('ending').hidden=true;$('final-note').hidden=false;$('restart').focus({preventScroll:true});});
$('hint').addEventListener('click',()=>{if(!state.started||busy||state.failed||roomComplete())return;const key=remaining(state)[0];$('hint-text').textContent=clues[key];});
$('help-open').addEventListener('click',()=>{$('help-dialog').showModal();});
$('sound').addEventListener('click',()=>{soundOn=!soundOn;$('sound').textContent=soundOn?'Sound on':'Sound off';$('sound').setAttribute('aria-pressed',String(soundOn));if(soundOn)cue('correct');});
render();

// Fit the wide comparison board to the remaining viewport height.
function fitBoard(){
 const board=$('board'),area=document.querySelector('.play-area');
 const viewportHeight=window.visualViewport?.height||window.innerHeight;
 const boardTop=board.getBoundingClientRect().top+window.scrollY;
 const completionHeight=$('stage-complete').hidden?0:$('stage-complete').getBoundingClientRect().height+20;
 const statusReserve=Math.max(42,$('status').getBoundingClientRect().height+20)+completionHeight;
 const headerHeight=document.querySelector('.scene-panel>h2').getBoundingClientRect().height+2;
 const side=Math.max(0,Math.floor(Math.min(area.clientWidth,(viewportHeight-boardTop-statusReserve-headerHeight)*(1600/520))));
 document.documentElement.style.setProperty('--board-size',`${side}px`);
}
let fitFrame;
function scheduleFit(){cancelAnimationFrame(fitFrame);fitFrame=requestAnimationFrame(fitBoard);}
const fitObserver=new ResizeObserver(scheduleFit);
for(const selector of ['.masthead','.instructions','.dashboard','#stage-complete','#mistake-alert','#status'])fitObserver.observe(document.querySelector(selector));
window.addEventListener('resize',scheduleFit);
window.visualViewport?.addEventListener('resize',scheduleFit);
scheduleFit();
