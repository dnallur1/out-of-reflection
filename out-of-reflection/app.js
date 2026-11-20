import {clues} from './hints.mjs?v=seven-levels-1';
import {initialState,reflected,select,remaining,TOTAL,stageIndex,stageProgress,STAGE_COUNTS,advance,WRONG_ALLOWANCE,retryRoom} from './game-state.mjs?v=seven-levels-1';
import {drawRoom,roomObjects} from './room.js?v=compost-on-floor-1';
const $=id=>document.getElementById(id);
const localPreview=['127.0.0.1','localhost','[::1]'].includes(location.hostname);
const reviewMode=localPreview&&new URLSearchParams(location.search).get('review')==='1';
let state=initialState(),busy=false,soundOn=true,audio,feedbackTimer,completionTimer;
let completionPending=false;
let reviewDifferences=true;
let reviewMonochrome=new URLSearchParams(location.search).get('monochrome')==='1';
const roomNames=['Living room','Kitchen','Bedroom','Study','Greenhouse','Attic','Garage'];
// Timed rooms scale blur with the scene so small details survive on narrow screens.
const openingBlur = [
 'min(1px, .18cqw)','min(1.1px, .19cqw)','min(1.5px, .25cqw)',
 'min(1.75px, .3cqw)','min(2px, .35cqw)','min(2.25px, .39cqw)',
 'min(2.5px, .43cqw)'
];
const timeLimits=[0,0,180,150,120,90,60];
let timeLeft=0,timerLast=performance.now();
function resetTimer(){timeLeft=timeLimits[state.stage];timerLast=performance.now();updateTimer();}
function updateTimer(){const seconds=Math.max(0,Math.ceil(timeLeft));$('timer-metric').hidden=reviewMode||!timeLimits[state.stage];$('timer').textContent=`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;$('timer-metric').classList.toggle('is-low',seconds<=30);}
function timedOut(){clearTimeout(feedbackTimer);busy=false;state={...state,failed:true};render();$('retry-copy').textContent='Time ran out. Try this room again with a fresh countdown. Your completed rooms are safe.';$('mistake-alert').textContent='Time’s up. Retry this room to continue.';$('mistake-alert').hidden=false;cue('wrong');$('retry-room').focus({preventScroll:true});}
setInterval(()=>{const now=performance.now(),elapsed=(now-timerLast)/1000;timerLast=now;if(reviewMode||!state.started||state.failed||roomComplete()||busy||document.hidden||$('help-dialog').open||!timeLimits[state.stage])return;timeLeft=Math.max(0,timeLeft-elapsed);updateTimer();if(timeLeft===0)timedOut();},100);
document.addEventListener('visibilitychange',()=>{timerLast=performance.now();});
const roomComplete=()=>stageProgress(state)===STAGE_COUNTS[stageIndex(state)];
const phaseNames = ['Notice', 'Explore', 'Reconsider'];
const stageCopy = [
 ['What belongs here?', 'Compare silhouettes. Look for shapes or objects that appear in only one view.'],
 ['Look at the outlines', 'Compare the shapes of familiar kitchen objects, from their outlines to their smallest parts.'],
 ['Check the alignment', 'Use nearby objects as landmarks to spot finer position changes. Your first countdown gives you three minutes.'],
 ['Look for what shifted', 'Compare where small details sit on larger objects. You have two and a half minutes.'],
 ['Judge the size', 'Judge scale using nearby edges. Finds resize details in the room itself. You have two minutes.'],
 ['Trust your proportions', 'Compare small details and proportions in the hazier mirror. You have ninety seconds.'],
 ['One minute. Look closer.', 'Compare the markings, patterns and details of the garage objects. You have one minute.'],
];
const mirrorPrompt = $('mirror-prompt');
document.querySelector('.journey').innerHTML=STAGE_COUNTS.map((_,i)=>`<li data-stage="${i}">Level ${i+1}</li>`).join('');
function cue(kind,delay=0){if(!soundOn)return;try{audio??=new(window.AudioContext||window.webkitAudioContext)();audio.resume();const t=audio.currentTime+delay;const notes=kind==='success'?[[784,.2,.035,0],[988,.22,.03,.11],[1175,.32,.025,.22]]:kind==='wrong'?[[260,.22,.055],[196,.3,.035]]:kind==='end'?[[523,.25,.035,0],[659,.25,.035,.14],[784,.28,.035,.28],[1047,.7,.04,.44],[784,.7,.018,.44]]:[[660,.35,.05],[667,.5,.02]];for(const [freq,duration,volume,offset=0] of notes){const start=t+offset,o=audio.createOscillator(),g=audio.createGain();o.frequency.value=freq;if(kind==='success'||kind==='end'){g.gain.setValueAtTime(0,start);g.gain.linearRampToValueAtTime(volume,start+.012);}else g.gain.setValueAtTime(volume,start);g.gain.exponentialRampToValueAtTime(.001,start+duration);o.connect(g).connect(audio.destination);o.start(start);o.stop(start+duration);}}catch{soundOn=false;$('sound').textContent='Sound unavailable';}}
function render(){
 const objects=roomObjects(state.room.scene);
 const level=stageIndex(state)+1,roomName=roomNames[level-1];
 const colour=reviewMode?(reviewMonochrome?0:1):stageProgress(state)/STAGE_COUNTS[stageIndex(state)],step=1/STAGE_COUNTS[stageIndex(state)];
 document.querySelector('.scene-panel h2').innerHTML=`The room · Level ${level} <span>${reviewMode?'visual review':'compare & select'}</span>`;
 $('room').innerHTML=drawRoom(state.room,colour,step);$('mirror').innerHTML=drawRoom(reviewMode&&!reviewDifferences?state.room:reflected(state),colour,step);
 $('board').style.setProperty('--blur', reviewMode ? '0px' : `calc(${openingBlur[state.stage]} * ${1-colour})`);
 if(!reviewMode)for(const view of ['room','mirror'])for(const [key,o] of Object.entries(objects)){
 const b=document.createElement('button');b.className='target';b.dataset.object=key;b.style.zIndex=remaining(state).includes(key)?'2':'1';b.setAttribute('aria-label',`Inspect ${view==='mirror'?'reflected':'room'} ${o.name}`);b.style.left=`${view==='mirror'?100-o.x/8:o.x/8}%`;b.style.top=`${o.y/5.2}%`;b.style.setProperty('--width',`${o.w/8}%`);b.style.setProperty('--height',`${o.h/5.2}%`);b.disabled=!state.started||roomComplete()||state.failed||busy||state.stageFound.includes(key);if(state.stageFound.includes(key)){
 b.classList.add('resolved');
 if(!roomComplete()){
  const mark=document.createElement('span');
  mark.className='found-pin';
  mark.textContent='✓';
  mark.setAttribute('aria-hidden','true');
  b.append(mark);
 }
}
 b.addEventListener('click',()=>clickObject(key,view));$(view).append(b);
 }
 for(const item of document.querySelectorAll('.journey li')){
 const index=Number(item.dataset.stage),current=index===stageIndex(state);
 item.classList.toggle('is-current',current);item.classList.toggle('is-done',index<stageIndex(state)||state.found===TOTAL);
 if(current)item.setAttribute('aria-current','step');else item.removeAttribute('aria-current');
 }
 $('score').textContent=state.score;
 updateMistakeUI();
 const within=stageProgress(state),target=STAGE_COUNTS[level-1];
 $('level').innerHTML=`${level} <small>/ ${STAGE_COUNTS.length}</small>`;$('progress-label').textContent=`${within} / ${target}`;$('progress').max=target;$('progress').value=within;
 $('discovery-marks').innerHTML=Array.from({length:target},(_,index)=>{
  const key=state.stageFound[index];
  const found=index<within;
  const label=found?`Found ${index+1}: ${objects[key].name}`:`Discovery ${index+1} remaining`;
  return `<li class="${found?'is-found':''}" aria-label="${label}">${found?'✓':index+1}</li>`;
 }).join('');
 const [title,copy]=stageCopy[level-1];
 $('stage-number').textContent=`Level ${level} · ${phaseNames[Math.min(2,Math.floor((level-1)/2))]}`;
 $('stage-title').textContent=title;
 $('stage-copy').textContent=copy;
 mirrorPrompt.textContent=reviewMode?(reviewDifferences?'Differences shown':'Matching view'):'Look closely';
 mirrorPrompt.classList.remove('reflection-changed');
 $('hint').disabled=!state.started||roomComplete()||state.failed||busy;
 $('stage-complete').hidden=completionPending||!roomComplete()||state.found===TOTAL;
 $('status').hidden=roomComplete();
 if(roomComplete()&&state.found<TOTAL){
  $('complete-title').textContent=`${roomName} complete!`;
  $('complete-copy').textContent=`All differences found. Full colour has returned. Continue to the ${roomNames[level].toLowerCase()} when you’re ready.`;
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
 $('retry-copy').textContent='You used your two extra chances. Your completed rooms are safe.';
}
function clearWarning(){$('mistake-alert').hidden=true;$('mistake-alert').textContent='';}
// Count clicks on matching details and empty scene space, but never on the
// interface, decorative feedback, or an already found (disabled) target.
for(const view of ['room','mirror'])$(view).addEventListener('click',event=>{
 if(!event.target.closest('.target'))clickObject(null,view);
});
function clickObject(key,view){
 if(reviewMode||busy||!state.started||state.failed||roomComplete())return;
 const result=select(state,key),button=key?$(view).querySelector(`[data-object="${key}"]`):null;
 if(result.correct||result.penalty){
  mirrorPrompt.textContent='Look closely';
  mirrorPrompt.classList.remove('reflection-changed');
 }
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
 $('status').textContent='Difference found.';
 feedbackTimer=setTimeout(()=>{state=result.state;busy=false;completionPending=roomComplete();render();celebrateDiscovery(key);cue('success');$('hint-text').textContent='Need a nudge? Ask for a short clue.';
 if(roomComplete()){
  $('status').textContent='';cue('end',.55);
  const completedState=state;
  completionTimer=setTimeout(()=>{
   if(state!==completedState)return;
   completionPending=false;
   if(state.found===TOTAL){$('ending-details').textContent=`You made ${TOTAL} discoveries across ${roomNames.length} rooms.`;$('ending').hidden=false;$('inspect').focus();}
   else {$('stage-complete').hidden=false;$('continue').focus({preventScroll:true});$('stage-complete').scrollIntoView({block:'nearest',behavior:'instant'});}
  },3000);
 }
 else {
  mirrorPrompt.textContent='Compare again';
  mirrorPrompt.classList.add('reflection-changed');
  $('status').textContent='The reflection shifted. Compare both scenes again.';
  $('mirror').querySelector('button:not(:disabled)')?.focus({preventScroll:true});
 }
 },650);
}
$('continue').addEventListener('click',()=>{
 const next=advance(state);if(next===state)return;state=next;clearWarning();resetTimer();render();
 $('status').textContent=`Welcome to the ${roomNames[stageIndex(state)].toLowerCase()}. Look for differences to restore its colour.`;
 $('hint-text').textContent='Need a nudge? Ask for a short clue.';
 $('mirror').querySelector('button:not(:disabled)')?.focus({preventScroll:true});
});
function showOpening(show){
 $('splash').hidden=!show;
 $('game-page').hidden=show;

}
$('begin').addEventListener('click',()=>{
 state.started=true;
 showOpening(false);
 $('status').textContent='Find all three differences in the living room. You can select either view.';
 render();
 $('game-title').focus();
});
function restart(){ $('outcome').hidden=true; $('outcome-rooms').replaceChildren(); clearTimeout(feedbackTimer);clearTimeout(completionTimer);completionPending=false;busy=false;state=initialState();resetTimer();clearWarning();showOpening(true);$('ending').hidden=true;$('final-note').hidden=true;$('status').textContent='Begin when you’re ready. The first rooms have no timer.';$('hint-text').textContent='Need a nudge? Ask for a short clue.';render();$('begin').focus();}
$('retry-room').addEventListener('click',()=>{
 clearTimeout(feedbackTimer);busy=false;state=retryRoom(state);resetTimer();clearWarning();render();
 $('hint-text').textContent='Need a nudge? Ask for a short clue.';
 $('status').textContent=`A fresh start in the ${roomNames[state.stage].toLowerCase()}. Two extra chances restored.`;
 $('mirror').querySelector('button:not(:disabled)')?.focus({preventScroll:true});
});
$('restart').addEventListener('click',restart);$('replay').addEventListener('click',restart);
$('inspect').addEventListener('click',()=>{
 $('ending').hidden=true;
 $('game-page').hidden=true;
 $('outcome').hidden=false;
 $('outcome-summary').textContent=`Your ${TOTAL} discoveries shaped these ${roomNames.length} rooms. Each image preserves the room you completed.`;
 $('outcome-rooms').innerHTML=state.completedRooms.map((entry,index)=>{
  const names=roomObjects(entry.room.scene);
  const discoveries=entry.choices.map(key=>names[key].name).join(', ');
  // Namespace pattern IDs so each thumbnail owns its illustration resources.
  const art=drawRoom(entry.room,1).replace(/id="([^"]+)"/g, `id="outcome-${index}-$1"`).replace(/url\(#/g,`url(#outcome-${index}-`);
  return `<figure><div class="outcome-art">${art}</div><figcaption><h2>Level ${index+1} · ${roomNames[index]}</h2><details><summary>Your discoveries</summary><p>${discoveries}</p></details></figcaption></figure>`;
 }).join('');
 $('outcome-title').focus();
});
$('outcome-replay').addEventListener('click',restart);
$('hint').addEventListener('click',()=>{if(!state.started||busy||state.failed||roomComplete())return;const key=remaining(state)[0];$('hint-text').textContent=state.stage>=6
 ? `Compare the markings and details of the ${roomObjects(state.room.scene)[key].name}.`
 : clues[`${state.room.scene}_${key}`]??clues[key];});
$('help-open').addEventListener('click',()=>{$('help-dialog').showModal();});
$('sound').addEventListener('click',()=>{soundOn=!soundOn;$('sound').textContent=soundOn?'Sound on':'Sound off';$('sound').setAttribute('aria-pressed',String(soundOn));if(soundOn)cue('correct');});
// Local preview links can start at a chosen stage without changing the public game.
const previewStage=Number(new URLSearchParams(location.search).get('stage')??(reviewMode?1:0));
if(localPreview&&Number.isInteger(previewStage)&&previewStage>=1&&previewStage<=STAGE_COUNTS.length){
 state.started=true;
 while(state.stage<previewStage-1){
  while(!roomComplete())state=select(state,remaining(state)[0]).state;
  state=advance(state);
 }
 $('status').textContent=`Local test: ${roomNames[state.stage]}. Select a difference in either view.`;
}
if(reviewMode){
 document.body.classList.add('visual-review');
 const nav=document.createElement('nav');nav.className='review-toolbar';nav.id='review-toolbar';nav.setAttribute('aria-label','Visual review controls');
 nav.innerHTML=`<div><strong>Visual review</strong><p>Browse each level manually. Clear mirror · timer and gameplay paused.</p></div><div class="review-controls"><button id="review-prev" class="quiet" ${state.stage===0?'disabled':''}>← Previous room</button><label for="review-room">Room</label><select id="review-room">${roomNames.map((name,i)=>`<option value="${i+1}" ${i===state.stage?'selected':''}>${i+1}. ${name}</option>`).join('')}</select><label class="review-toggle"><input id="review-differences" type="checkbox" checked> Show differences</label><label class="review-toggle"><input id="review-monochrome" type="checkbox" ${reviewMonochrome?'checked':''}> Black and white</label><button id="review-next" class="quiet" ${state.stage===roomNames.length-1?'disabled':''}>Next room →</button><a class="quiet" href="?stage=${state.stage+1}">Play this room</a></div>`;
 document.querySelector('.masthead').after(nav);
 const visit=stage=>{location.href=`?review=1&stage=${stage}&monochrome=${reviewMonochrome?1:0}`;};
 $('review-prev').addEventListener('click',()=>visit(state.stage));
 $('review-next').addEventListener('click',()=>visit(state.stage+2));
 $('review-room').addEventListener('change',event=>visit(event.target.value));
 $('review-differences').addEventListener('change',event=>{reviewDifferences=event.target.checked;render();});
 $('review-monochrome').addEventListener('change',event=>{reviewMonochrome=event.target.checked;render();});
}
showOpening(!state.started&&!reviewMode);
resetTimer();render();
if(localPreview&&new URLSearchParams(location.search).get('completed')==='1'){
 state.started=true;
 while(state.found<TOTAL){
  while(!roomComplete())state=select(state,remaining(state)[0]).state;
  if(state.found<TOTAL)state=advance(state);
 }
 showOpening(false);
 render();
 $('inspect').click();
}

// Fit the wide comparison board to the remaining viewport height.
function fitBoard(){
 const board=$('board'),area=document.querySelector('.play-area');
 if(window.matchMedia('(max-width: 600px)').matches){
  document.documentElement.style.setProperty('--board-size',`${area.clientWidth}px`);
  return;
 }
 const viewportHeight=window.visualViewport?.height||window.innerHeight;
 const boardTop=board.getBoundingClientRect().top+window.scrollY;
 const statusReserve=Math.max(42,$('status').getBoundingClientRect().height+20);
 const headerHeight=document.querySelector('.scene-panel>h2').getBoundingClientRect().height+2;
 const minimumWidth=Math.min(area.clientWidth,480);
 const side=Math.floor(Math.min(area.clientWidth,Math.max(minimumWidth,(viewportHeight-boardTop-statusReserve-headerHeight)*(1600/520))));
 document.documentElement.style.setProperty('--board-size',`${side}px`);
}
let fitFrame;
function scheduleFit(){cancelAnimationFrame(fitFrame);fitFrame=requestAnimationFrame(fitBoard);}
const fitObserver=new ResizeObserver(scheduleFit);
for(const selector of ['.masthead','.instructions','.dashboard','#stage-complete','#mistake-alert','#status'])fitObserver.observe(document.querySelector(selector));
if($('review-toolbar'))fitObserver.observe($('review-toolbar'));
window.addEventListener('resize',scheduleFit);
window.visualViewport?.addEventListener('resize',scheduleFit);
scheduleFit();
