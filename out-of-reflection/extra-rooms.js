import {themeProps,themedNames} from './themed-props.js?v=room-compositions-2';
// Later rooms share a consistent drawing language and independent puzzle states.
export const extraKeys=['extraClock','extraPicture','extraBooks','extraPlant','extraCup','extraLamp','extraRug','extraWindow','extraNote','extraCushion','extraBox','extraMobile','extraHandles'];
const spots=[[390,78,78,78],[565,100,110,120],[97,236,110,64],[707,287,96,110],[484,323,65,60],[268,295,90,115],[400,465,570,100],[150,115,182,182],[388,318,65,52],[137,378,98,70],[644,400,110,75],[697,90,90,105],[394,372,100,40]];
const names=['wall clock','framed picture','shelf books','potted leaves','table cup','desk lamp','rug pattern','window sky','paper note','seat cushion','storage box','hanging ornament','drawer handles'];
const floorProps={
 study:{x:375,y:450,scale:1,height:72},
 greenhouse:{x:76,y:474,scale:1,height:56},
 attic:{x:462,y:488,scale:.68,height:86}
};
const gardenSeatScale=.78;
const atticChairOffset=-12;
function roomSpots(scene){
 const layout=spots.map(spot=>[...spot]);
 const floor=floorProps[scene];
 layout[6]=[floor.x,floor.y,570*floor.scale,floor.height*floor.scale];
 // Leave a small gap between the window and shelf hit areas.
 layout[7]=[150,115,182,176];
 if(scene==='greenhouse'){
  layout[6]=[floor.x,floor.y,62,floor.height];
  layout[3]=[688,287,96,110];
  layout[4]=[484,310,100,80];
  layout[9]=[137*gardenSeatScale,445+(378-445)*gardenSeatScale,98*gardenSeatScale,70*gardenSeatScale];
 }
 if(scene==='study'){
  layout[4]=[484,310,65,82];
  layout[5]=[277,295,90,115];
  layout[6]=[375,485,330,42];
  layout[9]=[399,250,98,72];
 }
 if(scene==='attic'){
  layout[0]=[150,165,78,78];
  layout[1]=[540,205,110,120];
  layout[5]=[288,295,90,115];
  layout[7]=[400,110,130,150];
  layout[9]=[137+atticChairOffset,378,98,70];
  layout[11]=[137+atticChairOffset,327,80,32];
 }
 if(scene==='study')for(const i of [4,5,8,9,12])layout[i][0]-=35;
 if(scene==='greenhouse')for(const i of [4,8,12])layout[i][0]-=15;
 if(scene==='attic')for(const i of [4,8,12])layout[i][0]+=30;
 return layout;
}
export function extraRoomObjects(scene){const layout=roomSpots(scene),labels=themedNames[scene]||names;return Object.fromEntries(extraKeys.map((key,i)=>[key,{name:labels[i],x:layout[i][0],y:layout[i][1],w:layout[i][2],h:layout[i][3]}]));}
export function extraRoom(s){
 const greenhouse=s.scene==='greenhouse',attic=s.scene==='attic',layout=roomSpots(s.scene);
 const floor=floorProps[s.scene];
 const title=greenhouse?'greenhouse with glass walls, plants, gardening tools and a potting bench':attic?'attic with arched window, steamer trunk, gramophone and wooden toy train':'study with maps, globe and an office chair behind the desk';
 const marks=(body)=>`<g fill="none" stroke="#365650" stroke-width="1.5">${body}</g>`;
 const features=[
 `<circle r="30" fill="#fff9e9"/><path d="M0 0V-20M0 0L${s.extraClock?' -18 12':'18 12'}" fill="none"/><path d="M0 -27V-23M27 0H23M0 27V23M-27 0H-23"/>`,
 `<path d="M-43 -48Q0 -51 43 -48V48H-43Z" fill="#fff9e9"/><path d="M-34 37V-38H34V37Z" fill="#b5d7c7"/>${s.extraPicture?'<path d="M-17 -15A20 20 0 1 0 14 12A24 24 0 0 1 -17 -15" fill="#f7d772"/>':'<circle cy="-8" r="20" fill="#f7d772"/><path d="M-28 32L-8 10L8 29L21 14L32 33" fill="#84b49b"/>'}`,
 `<path d="M-52 25H52V34H-52Z" fill="#bc9972"/>${Array.from({length:s.extraBooks?4:3},(_,i)=>`<rect x="${-37+i*22}" y="${-22+(i%2)*8}" width="17" height="${47-(i%2)*8}" rx="2" fill="${i%2?'#df94b9':'#f7d772'}"/><path d="M${-33+i*22} -8h9M${-33+i*22} 15h9"/>`).join('')}`,
 `<path d="M-22 17H22L16 48H-16Z" fill="#df9b80"/><path d="M0 17V-36" fill="none"/><path d="M0 -10Q-43 -15 -29 -41Q-3 -40 0 -10M0 0Q35 -7 31 -33Q5 -32 0 0" fill="#84b49b"/>${s.extraPlant?'<path d="M0 14Q-35 14 -28 -10Q-7 -9 0 14" fill="#84b49b"/>':''}`,
 `<path d="M-18 -18H15V18Q0 26 -18 18Z" fill="#8ed9e3"/><path d="M15 -10Q38 -13 29 9H15" fill="none"/>${s.extraCup?'<path d="M-19 -10Q-42 -13 -33 9H-19" fill="none"/>':''}`,
 `<path d="M0 -5V43M-24 45H25" fill="none"/><path d="M-20 -42Q0 -52 21 -42L34 -4Q0 7 -34 -4Z" fill="#df94b9"/>${s.extraLamp?'<path d="M-19 -34L-27 -9M-7 -38V-6M7 -38V-6M19 -34L27 -9" fill="none"/>':''}`,
 `<ellipse rx="278" ry="45" fill="#f2d58b"/><ellipse rx="265" ry="36" fill="none"/><ellipse rx="252" ry="29" fill="none" stroke-width="1.5"/>${s.extraRug?'<path d="M-130 0l10 -10 10 10 -10 10ZM-60 0l10 -10 10 10 -10 10ZM10 0l10 -10 10 10 -10 10ZM80 0l10 -10 10 10 -10 10Z" fill="none"/>':'<path d="M-210 -12V12M-180 -19V19M-150 -22V22M-120 -24V24M-90 -25V25M-60 -26V26M-30 -26V26M0 -26V26M30 -26V26M60 -26V26M90 -25V25M120 -24V24M150 -22V22M180 -19V19M210 -12V12" fill="none" stroke-dasharray="2 5" stroke-width="1.5"/>'}`,
 `<path d="M-78 -78Q0 -86 78 -78V78Q0 86 -78 78Z" fill="#8ed9e3"/><path d="M-71 -70Q0 -77 71 -70V71H-71Z" fill="none" stroke-width="1.5"/>${s.extraWindow?'<path d="M-6 -29A18 18 0 1 0 10 -1A20 20 0 0 1 -6 -29" fill="#fff1cf"/>':'<circle cx="4" cy="-13" r="18" fill="#f7d772"/>'}<path d="M-78 8H78M0 -81V81" fill="none"/><path d="M-89 -87V88M89 -87V88" stroke="#df9b80" stroke-width="10"/><path d="M-83 91H84" stroke="#956e54" stroke-width="5"/><path d="M-64 -60l26 -7M-64 -49l43 -11M25 45l35 -13M39 50l22 -8" stroke-width="1.3"/><path d="M-62 20Q-66 5 -50 3Q-40 -17 -23 1Q-5 -3 -1 21Z" fill="#fff9e9" stroke="none"/>`,
 `<path d="M-25 -20L23 -16L19 24L-24 18Z" fill="#fff9e9"/>${s.extraNote?'<path d="M-10 -4L8 11M8 -4L-10 11"/>':'<path d="M-14 -6H12M-13 2H10M-12 10H4"/>'}`,
 `<path d="M-40 -25Q0 -34 40 -24L34 27Q0 34 -36 23Z" fill="#df94b9"/>${s.extraCushion?'<path d="M-25 -20L-29 19M-8 -23L-10 23M10 -22L8 25M27 -20L24 22"/>':'<path d="M-27 -16Q0 -23 28 -16L23 17Q0 24 -24 15Z" fill="none" stroke-dasharray="3 4"/>'}`,
 `<path d="M-47 -24Q0 -30 47 -24V28H-47Z" fill="#bc9972"/><path d="M-48 -20H48M-27 -24V28M27 -24V28" fill="none"/>${s.extraBox?'<path d="M-10 -3H10V17H-10Z" fill="#f7d772"/>':'<path d="M-11 5H11"/>'}`,
 `<path d="M0 -47V-17" fill="none"/>${s.extraMobile?'<path d="M0 -20L9 -1L30 1L14 15L19 35L0 24L-19 35L-14 15L-30 1L-9 -1Z" fill="#f7d772"/>':'<path d="M-8 -18A29 29 0 1 0 18 28A32 32 0 0 1 -8 -18" fill="#f7d772"/>'}`,
 s.extraHandles?'<circle cx="-22" r="7" fill="#f7d772"/><circle cx="22" r="7" fill="#f7d772"/>':'<path d="M-34 0H-10M10 0H34" stroke-width="6"/>'
 ];
 if(attic)features[7]=`<path d="M-55 58V-12Q-55 -65 0 -70Q55 -65 55 -12V58Z" fill="#8ed9e3" stroke="#956e54" stroke-width="6"/><path d="M-47 50V-12Q-47 -56 0 -61Q47 -56 47 -12V50Z" fill="none" stroke-width="1.5"/>${s.extraWindow?'<path d="M20 -40A16 16 0 1 0 34 -14A19 19 0 0 1 20 -40" fill="#fff1cf" stroke-width="2"/>':'<circle cx="23" cy="-25" r="14" fill="#f7d772" stroke-width="2"/>'}<path d="M0 -63V55M-51 10H51" fill="none" stroke-width="4"/><path d="M-20 -36l-15 13M17 35l22 -13" fill="none" stroke-width="1.3"/><path d="M-62 61Q0 67 62 61V69H-62Z" fill="#bc9972" stroke-width="3"/>`;
 if(attic){
  features[3]=`<path d="M-31 22Q0 17 31 22V47Q0 52 -31 47Z" fill="#bc9972"/><ellipse cy="21" rx="27" ry="7" fill="#365650"/><ellipse cy="21" rx="19" ry="4" fill="none" stroke="#fff9e9" stroke-width="1.4"/><path d="M-4 16Q0 -3 -17 -15L-39 -31Q-39 -43 -16 -46L10 -11Q3 2 5 16Z" fill="#e7bd78"/><ellipse cx="-28" cy="-38" rx="17" ry="8" transform="rotate(-28 -28 -38)" fill="#f3d78f"/><path d="M-27 -35Q-12 -19 -5 -8M-23 27V43M23 27V43M-26 44H26" fill="none" stroke-width="1.4"/>${s.extraPlant?'<path d="M31 34H42V25" fill="none" stroke-width="3"/><circle cx="42" cy="23" r="3" fill="#956e54"/>':''}`;
  features[11]=`<g fill="#71a890" stroke-width="1.5">${(s.extraMobile?[-22,0,22]:[-22,22]).map(x=>`<circle cx="${x}" r="4"/><path d="M${x-2} 0h4M${x} -2v4"/>`).join('')}</g>`;
 }
 if(greenhouse){
  features[2]=`<path d="M-52 25H52V34H-52Z" fill="#bc9972"/>${(s.extraBooks?[-36,-12,12,36]:[-30,0,30]).map(x=>`<g transform="translate(${x} 0)"><path d="M-9 3H9L6 24H-6Z" fill="#df9b80"/><path d="M0 3V-15M0 -7Q-14 -7 -10 -20Q0 -19 0 -7M0 -4Q14 -8 10 -20Q0 -16 0 -4" fill="#84b49b" stroke-width="2"/></g>`).join('')}`;
  features[4]=`<path d="M-22 -9Q0 -17 22 -9V26Q0 32 -22 26Z" fill="#8ed9e3"/><path d="M-21 0Q-45 -12 -40 13L-22 21" fill="none"/><path d="M22 9L42 -10L47 -6L26 24Z" fill="#8ed9e3"/><ellipse cx="46" cy="-9" rx="5" ry="8" transform="rotate(35 46 -9)" fill="#e7bd78"/><path d="M-14 -12Q-13 -36 11 -26L15 -12" fill="none"/><path d="M-14 7H13M-14 14H13" fill="none" stroke-width="1.4"/>${s.extraCup?'<path d="M-5 -28V-14M1 -29V-14M7 -27V-14" fill="none" stroke-width="2"/>':''}`;
  features[5]=`<path d="M-13 -39Q0 -48 13 -39L16 -12L0 7L-16 -12Z" fill="#9ebdc0"/><path d="M-5 2H5V38Q0 49 -5 38Z" fill="#bc9972"/><path d="M0 -32V-4M0 13V32" fill="none" stroke-width="1.5"/>${s.extraLamp?'<circle cy="23" r="4" fill="#fff9e9"/>':''}`;
  features[6]=`<g transform="translate(0 25)">
  <path d="M0-20Q-29-26-28-41Q-12-43 0-24Q-9-49 1-51Q14-46 5-24Q18-43 28-38Q28-26 4-18Z" fill="#84b49b"/>
  <path d="M-20-20H20L15 0H-15Z" fill="#df9b80"/>
  <path d="M-22-20H22" fill="none"/>
 ${s.extraRug?'<path d="M-14-13l7 7 7-7 7 7 7-7" fill="none" stroke-width="2"/>':''}
 </g>`;
  features[8]=`<path d="M-25 -20L23 -16L19 24L-24 18Z" fill="#fff9e9"/><path d="M-22 -12l42 4" fill="none" stroke-width="1.3"/><path d="M-3 17V-2M-3 8Q-18 4 -13 -5Q-2 -6 -3 8M-3 2Q8 -11 15 -1Q14 10 -3 9" fill="#84b49b" stroke-width="2"/>${s.extraNote?'<circle cx="-3" cy="-4" r="6" fill="#df94b9"/>':''}`;
  features[11]=`<path d="M0 -47L-29 -4M0 -47L29 -4" fill="none" stroke-width="2"/><path d="M-32 -5Q0 -14 32 -5L23 17Q0 30 -23 17Z" fill="#bc9972"/><path d="M-22 -2L-15 15M-6 -5L-3 20M10 -5L7 20M24 -1L17 16" fill="none" stroke-width="1.3"/>${(s.extraMobile?[-18,0,18]:[-18,18]).map(x=>`<path d="M${x} 8q-15 16 0 35q17 -13 3 -26" fill="#84b49b" stroke-width="2"/>`).join('')}`;
  features[12]=`<path d="M-43 -10H43" fill="none" stroke-width="4"/>${(s.extraHandles?[-29,0,29]:[-29,29]).map(x=>`<path d="M${x} -10v18q0 14 11 5" fill="none" stroke-width="3"/>`).join('')}`;
 }
 const details=[
  marks('<circle r="25"/><circle r="2" fill="#365650"/><path d="M-19 -18l3 3M18 -19l-3 3M20 18l-3 -3M-20 18l3 -3"/>'),
  marks('<path d="M-36 -48L0 -65L36 -48M-39 -43H38V43H-39Z"/>'),
  marks(Array.from({length:s.extraBooks?4:3},(_,i)=>`<path d="M${-33+i*22} ${-18+(i%2)*8}v${37-(i%2)*8}M${-30+i*22} 4h6"/>`).join('')+'<path d="M-42 35V40H-34M34 35V40H42"/>'),
  marks('<path d="M-16 25H17M-12 40H12M-25 -35L-4 -14M24 -26L4 -4"/><ellipse cy="19" rx="18" ry="3"/>'),
  marks('<path d="M-12 -12Q0 -8 10 -12M-12 12q11 6 21 0"/>'),
  marks('<path d="M-27 -7Q0 -1 27 -7M4 7V39M-17 42Q0 39 17 42"/>'),
  '',
  '',
  marks('<path d="M-21 -16l38 4M-19 14l12 2"/>'),
  marks('<path d="M-35 -19l3 4M30 -18l-3 4M-30 20l4 -3M28 21l-4 -3"/>'),
  marks('<path d="M-41 -16H40M-42 23H41M-23 -16V22M23 -16V22M-38 -10l10 2M31 16l9 -2"/>'),
  marks('<path d="M2 -44V-21"/>'),
  ''
 ];
 if(attic){details[3]='';details[11]='';}
 if(greenhouse)for(const i of [2,4,5,8,11,12])details[i]='';
 themeProps(features,s);
 for(let i=0;i<details.length;i++)if(!(s.scene==='study'&&i===2)&&!(greenhouse&&i===3))details[i]='';
 return `<svg class="room-art" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustrated ${title}">
 <rect width="800" height="520" fill="${greenhouse?'#e4efdc':attic?'#efe0ce':'#e8e1f0'}"/>
 ${greenhouse?`<g aria-hidden="true">
 <path d="M0 41L400 10L800 41V411H0Z" fill="#cbe9e5"/>
 <path d="M0 252Q80 200 157 248Q246 193 323 248Q404 185 489 239Q581 189 662 238Q744 195 800 220V409H0Z" fill="#8ebb9c" opacity=".46"/>
 <path d="M0 309Q88 264 169 309Q258 258 340 307Q420 269 493 303Q580 260 670 310Q731 263 800 288V409H0Z" fill="#73a788" opacity=".32"/>
 <path d="M91 49L160 43L42 205H0ZM305 26L349 22L217 205H169ZM590 26L630 29L509 205H465ZM769 39L800 41L684 205H654Z" fill="#ffffff" opacity=".32"/>
 <path d="M23 212H777V405H23Z" fill="#e4f4e9" opacity=".28"/>
 </g>`:''}
<path d="M0 412Q400 399 800 412V520H0Z" fill="#e2bc86"/>
 ${marks('<path d="M0 448H800M0 500H800M130 410L95 520M300 405L280 520M520 405L550 520M690 410L750 520"/>')}
 <g stroke="#365650" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
 <g opacity=".12" fill="#365650" stroke="none"><ellipse cx="150" cy="453" rx="110" ry="13"/><ellipse cx="410" cy="452" rx="140" ry="11"/><ellipse cx="676" cy="452" rx="105" ry="10"/></g>
 <g transform="translate(${floor.x} ${floor.y}) scale(${s.scene==='study'?.66:floor.scale} ${floor.scale})">${features[6]}</g>
 ${greenhouse?'<path d="M0 31L400 4L800 31M22 31V403M778 31V403M400 4V205M0 205H800M260 16V205M535 16V205" fill="none" stroke="#7fa6aa" stroke-width="7"/><g fill="none" stroke="#fff9e9" stroke-width="2"><path d="M287 32l-17 61M298 32l-11 42M566 36l-18 60M578 39l-11 40"/></g>':attic?'<path d="M0 175L400 0L800 175M40 166L400 22L760 166" fill="none" stroke="#956e54" stroke-width="13"/><path d="M485 39L510 145M318 38L285 145" stroke="#956e54" stroke-width="8"/><g fill="none" stroke="#956e54" stroke-width="1.5"><path d="M38 145L358 18M440 18L762 147M49 153L328 42M469 41L750 155"/></g>':'<path d="M0 275Q400 268 800 275M0 281H800" fill="none" stroke="#bc9972" stroke-width="4"/><g fill="none" stroke="#bc9972" stroke-width="1.5"><path d="M22 285V404M237 283V405M571 282V405M782 283V404"/></g>'}
 ${greenhouse?`<g transform="translate(0 445) scale(${gardenSeatScale}) translate(0 -445)"><path d="M46 343L38 294Q143 281 244 295L234 343Z" fill="#bc9972"/><path d="M44 309Q143 299 240 309M46 324Q143 316 237 325" fill="none" stroke="#365650" stroke-width="3"/><path d="M40 389Q143 376 245 388V405Q143 417 40 405Z" fill="#c5a07a"/><path d="M48 396Q142 386 237 396M64 341L59 389M221 343L228 387" fill="none"/><path d="M58 407L46 451H59L76 409M217 408L234 451H246L233 405" fill="#956e54"/><path d="M30 362Q13 350 20 378L37 389M251 362Q270 350 263 378L246 389" fill="none" stroke-width="5"/><g fill="none" stroke-width="1.4"><path d="M59 302l42 -3M183 301l41 3M62 399l23 -3M201 397l24 2"/></g></g>`:attic?`<g transform="translate(${atticChairOffset} 0)"><path d="M57 384L48 304Q48 285 68 285H207Q228 285 227 304L218 385" fill="none" stroke="#956e54" stroke-width="9"/><path d="M61 294Q140 282 216 294V310Q139 304 61 310Z" fill="#bc9972"/><path d="M62 316H215V338H62Z" fill="#dfbf94"/><path d="M79 340V377M106 340V377M173 340V377M201 340V377" fill="none" stroke="#bc9972" stroke-width="7"/><path d="M49 386Q140 376 234 386V403Q139 414 49 403Z" fill="#bc9972"/><path d="M40 355Q52 342 78 349M211 349Q239 342 249 356" fill="none" stroke="#956e54" stroke-width="7"/><path d="M49 357V389M236 357V389M73 407L61 454M210 406L226 453" fill="none" stroke="#956e54" stroke-width="7"/><path d="M24 447Q143 484 258 443M35 456Q144 484 247 454" fill="none" stroke="#956e54" stroke-width="6"/><g fill="none" stroke-width="1.3"><path d="M70 299Q139 292 202 299M70 322H200M59 394Q140 387 225 394M78 351V371M202 351V371"/></g></g>`:`
 <rect x="48" y="282" width="154" height="151" rx="10" fill="#a5aabd"/>
 <path d="M59 293H191V332H59ZM59 340H191V380H59ZM59 387H191V421H59Z" fill="#c4c6d4" stroke-width="2"/>
 <path d="M111 305H139M111 352H139M111 399H139" fill="none" stroke-width="4"/>
 <path d="M62 434V444M188 434V444" fill="none" stroke-width="5"/>
 <g transform="translate(-35 0)">
 <path d="M345 305V238Q345 207 374 207H435Q464 207 464 238V305Q464 322 446 326H363Q345 322 345 305Z" fill="#7fa6aa"/>
 <path d="M355 303V240Q355 217 376 217H433Q453 217 453 240V303" fill="none" stroke-width="1.5"/>
 <path d="M349 313Q405 301 461 313V333H349Z" fill="#617f82"/>
 <path d="M336 322V300H350M474 322V300H460M405 337V426M405 424L371 438M405 424L439 438" fill="none" stroke-width="5"/>
 <circle cx="370" cy="440" r="5" fill="#617f82"/><circle cx="440" cy="440" r="5" fill="#617f82"/></g>
 `}
 ${greenhouse?`<g transform="translate(-15 0)"><path d="M247 341Q399 333 556 341V359H247Z" fill="#bc9972"/><path d="M268 359V452H283V359M523 359V452H538V359" fill="#956e54"/><path d="M273 418H533V433H273Z" fill="#bc9972"/><path d="M279 423H528M262 348H543M310 341V354M369 339V354M428 339V354M489 340V354" fill="none" stroke-width="1.5"/><path d="M307 393H335L331 416H312ZM352 394H380L376 416H357ZM399 394H427L423 416H404Z" fill="#df9b80"/><path d="M302 392H340M348 393H384M395 393H431" fill="none" stroke-width="3"/></g>`:attic?`<g transform="translate(30 0)"><path d="M249 345Q399 322 552 345V438Q400 454 249 438Z" fill="#bc9972"/><path d="M249 345Q399 330 552 345V362Q399 375 249 362Z" fill="#dfbf94"/><path d="M275 340V441M521 340V441" stroke="#956e54" stroke-width="10"/><path d="M259 352Q398 338 541 352M260 429Q400 444 541 429" fill="none" stroke-width="1.5"/><path d="M329 403Q394 394 459 403V421H329Z" fill="#956e54"/><path d="M337 408H451" fill="none" stroke="#e7bd78" stroke-width="2"/></g>`:` <g transform="translate(-35 0)"><!-- A broad curved writing desk or potting table anchors the tabletop props. -->
 <path d="M250 343Q393 331 546 341L553 357Q401 368 249 358Z" fill="#c5a07a"/>
 <path d="M275 362L262 449Q268 455 276 449L294 362M513 361L534 449Q540 454 546 447L530 360" fill="#956e54"/>
 <path d="M321 363Q392 359 466 363V398Q392 405 321 398Z" fill="#dfb78b"/>
 <g fill="none" stroke-width="1.4"><path d="M255 349Q399 339 545 348M329 369V393H458V368M288 375L276 436M526 374L539 438M335 348Q362 343 382 347M417 351Q452 345 485 348"/></g></g>
`}
 <!-- Matching side bench, with the keepsake box tucked beneath it. -->
 <path d="M568 337Q676 328 786 337V351Q675 360 568 351Z" fill="#bc9972"/>
 <path d="M586 354L580 447H591L603 354M757 354L774 447H785L774 353" fill="#956e54"/>
 <g fill="none" stroke-width="1.4"><path d="M578 343Q676 335 777 343M611 349q31 -7 59 -2M733 341l27 -1M588 363L584 434M772 367L780 435"/></g>
 ${greenhouse?'<g fill="#84b49b"><path d="M603 312V263Q565 249 567 217Q597 219 603 253Q610 225 635 215Q648 243 603 278Z"/><path d="M763 312V276Q737 265 739 242Q763 244 763 276Q774 251 790 248Q794 276 763 291Z"/></g><path d="M580 310H624L618 335H587ZM747 312H783L778 335H752Z" fill="#df9b80"/><g fill="none" stroke-width="1.3"><path d="M576 228L600 254M630 228L605 263M747 250L761 274M783 259L766 282M588 317H617M754 319H777"/></g>':attic?'<g fill="none" stroke-width="1.2"><path d="M22 226L53 257M22 226V272M22 226L66 231M22 242Q38 242 44 247M22 257Q48 250 54 252M22 269Q57 263 63 261"/></g>':'<path d="M43 271H155V280H43Z" fill="#bc9972"/><path d="M59 280V289M142 280V288" fill="none" stroke-width="2"/>'}
 ${greenhouse?`<g stroke-width="2.5">
 <!-- A shelf of flowering plants stands in front of the glass. -->
 <path d="M374 263Q449 258 523 263V272H374Z" fill="#bc9972"/>
 <path d="M387 273v10l12-10M498 273v10l12-10" fill="none"/>
 <path d="M391 238H429L423 262H397Z" fill="#df9b80"/>
 <path d="M410 238V202M410 230Q384 229 384 212Q401 209 410 230ZM410 224Q433 200 439 216Q435 231 410 230Z" fill="#84b49b"/>
 <path d="M410 205C394 199 392 185 401 186Q406 186 410 194Q414 180 422 186Q431 194 410 205Z" fill="#df94b9"/>
 <path d="M463 234H511L505 261H470Z" fill="#c78b89"/>
 <path d="M486 234Q488 208 474 194M486 234Q487 207 501 190M486 226Q459 224 454 205Q473 203 486 226ZM487 223Q512 201 519 209Q514 230 487 232Z" fill="#84b49b"/>
 <path d="M474 200Q463 199 463 190Q470 189 474 193Q478 183 485 189Q484 197 474 200ZM501 197Q489 192 492 183Q498 184 501 189Q508 180 513 185Q512 194 501 197Z" fill="#f7d772"/>
 <path d="M294 224H353" fill="none"/>
 <path d="M306 224v17M299 241h14M300 241v13M306 241v13M312 241v13" fill="none"/>
 <path d="M336 224v24M329 245l7 8 7 -8" fill="none"/>
 <path d="M713 419Q737 409 761 419L755 446H719Z" fill="#df9b80"/>
 <path d="M718 422Q737 429 756 422M737 418V386" fill="none"/>
 <path d="M737 409Q713 401 716 385Q733 388 737 409M737 400Q741 380 760 383Q760 401 737 405" fill="#84b49b"/>
 <!-- Pots and hand tools sit on the floor in front of the potting bench. -->
 <g transform="translate(231 507)">
  <path d="M0-23V-46M0-26Q-23-27-26-43Q-12-48 0-26ZM0-32Q10-51 25-45Q23-31 0-29Z" fill="#84b49b"/>
  <path d="M-21-24H21L16 0H-16Z" fill="#df9b80"/>
  <path d="M-23-24H23M-15-17H15" fill="none"/>
 </g>
 <g transform="translate(311 502)">
  <path d="M0-20V-42M0-24Q-21-20-22-35Q-12-41 0-24ZM0-26Q10-43 22-36Q20-25 0-23Z" fill="#7cab90"/>
  <path d="M0-41Q-12-44-8-49Q-3-52 0-46Q5-52 10-48Q12-43 0-41Z" fill="#f7d772"/>
  <path d="M-17-21H17L13 0H-13Z" fill="#b7d2bf"/>
  <path d="M-19-21H19" fill="none"/>
 </g>
 <g transform="translate(398 509)">
  <path d="M0-22Q-10-52 1-53Q11-47 5-25Q15-45 25-39Q24-27 7-23Q-15-23-24-39Q-12-48 0-22Z" fill="#9eb780"/>
  <path d="M-22-23H22L16 0H-16Z" fill="#c78b89"/>
  <path d="M-24-23H24M-16-16H16" fill="none"/>
 </g>
 <g transform="translate(463 486) rotate(12)">
  <path d="M-8-9V5H9V-9M0-9V5M0 5V14" fill="none"/>
  <path d="M-3 14H3V31Q0 35-3 31Z" fill="#bc9972"/>
 </g>
 <g transform="translate(548 486) rotate(-20)">
  <path d="M0 0Q-11-5-15-16Q-3-14 3-2M0 0Q10-10 15-12Q13-2 3 3Z" fill="#9ebdc0"/>
  <path d="M1 2L-5 11M2 2L10 11" fill="none"/>
  <ellipse cx="-8" cy="15" rx="5" ry="7" fill="#c78b89"/>
  <ellipse cx="13" cy="15" rx="5" ry="7" fill="#c78b89"/>
  <circle r="2.5" fill="#bc9972"/>
 </g>

 <g transform="translate(137 508)">
  <path d="M0-17Q-20-24-21-36Q-7-35 0-21Q-5-42 5-45Q12-35 4-20Q15-36 23-32Q20-20 5-17Z" fill="#9eb780"/>
  <path d="M-16-18H16L12 0H-12Z" fill="#b7d2bf"/>
  <path d="M-17-18H17" fill="none"/>
 </g>
 <g transform="translate(665 508)">
  <path d="M0-17V-41M0-21Q-25-20-24-35Q-9-39 0-21ZM0-26Q11-43 24-38Q22-25 0-23Z" fill="#84b49b"/>
  <path d="M0-39Q-9-42-7-49Q-2-51 1-46Q6-53 11-48Q12-42 0-39Z" fill="#df94b9"/>
  <path d="M-19-18H19L14 0H-14Z" fill="#bc9972"/>
  <path d="M-20-18H20" fill="none"/>
 </g>
 <g transform="translate(730 500)">
  <path d="M0-20Q-28-20-26-36Q-11-42-1-23Q-12-41 0-50Q12-46 4-23Q14-42 27-36Q28-24 4-19Z" fill="#7cab90"/>
  <path d="M-21-21H21L16 0H-16Z" fill="#c78b89"/>
  <path d="M-22-21H22" fill="none"/>
 </g>
 </g>`:''}
 ${extraKeys.map((key,i)=>i===6?'':`<g transform="translate(${layout[i][0]} ${layout[i][1]})">${greenhouse&&i===9?`<g transform="scale(${gardenSeatScale})">${features[i]}</g>`:features[i]}${details[i]}</g>`).join('')}
 </g>${marks('<path d="M18 389h28M744 375h32M230 72l4 -2M239 79l3 1"/>')}</svg>`;
}
