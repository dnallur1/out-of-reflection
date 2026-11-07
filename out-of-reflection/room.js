import {polishRoom} from './art-details.js?v=rounded-rooms-1';
import {otherRoom,otherObjects} from './other-rooms.js?v=rounded-rooms-1';
export const objects={
 lowerPicture:{name:'lower right picture',x:568,y:211,w:98,h:55},
 curtains:{name:'window curtains',x:218,y:154,w:40,h:268},
 shelfBooks:{name:'books on the top shelf',x:717,y:33,w:100,h:44},
 upholstery:{name:'sofa upholstery',x:477,y:284,w:35,h:40},
 carpet:{name:'carpet pattern',x:411,y:478,w:430,h:42},
 flower:{name:'vase and flower',x:417,y:355,w:90,h:170},
 lamp:{name:'floor lamp',x:700,y:302,w:120,h:305},
 plant:{name:'potted plant',x:125,y:298,w:108,h:160},
 clock:{name:'clock',x:366,y:100,w:100,h:100},
 picture:{name:'upper right picture',x:567,y:105,w:112,h:115},
 cushion:{name:'sofa cushion',x:332,y:300,w:100,h:95},
 mug:{name:'mug',x:186,y:351,w:55,h:55}
};
export function roomObjects(scene){return otherObjects[scene] || Object.fromEntries(['flower','lamp','plant'].map(key=>[key,objects[key]]));}
export function drawRoom(s, colourProgress = 0, colourStep = 1/15){let svg = s.scene && s.scene!=='living' ? otherRoom(s) : `<svg class="room-art" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustrated sitting room: left window and plant table, central cartoon sofa, clock and four pictures, four right shelves, oval rug and coffee table, floor lamp"><defs><pattern id="stripes" width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="#f7d777"/><path d="M0 0V14" stroke="#d887a3" stroke-width="5"/></pattern><pattern id="woven" width="12" height="8" patternUnits="userSpaceOnUse"><path d="M1 4H5M8 1V3M8 6V8" stroke="#365650" stroke-width=".7" fill="none"/></pattern><pattern id="diamonds" width="40" height="24" patternUnits="userSpaceOnUse"><path d="M20 1L38 12L20 23L2 12Z" fill="none" stroke="#365650" stroke-width="1.5"/></pattern></defs>
<rect width="800" height="520" fill="#fff1cf"/><path d="M0 360Q400 350 800 359V520H0Z" fill="#e2bc86"/>
<g fill="none" stroke="#c79569" stroke-width="2"><path d="M0 414H800M0 474H800M113 360L68 520M271 357L256 520M539 358L559 520M691 359L758 520"/></g>
<!-- Small wall marks and baseboard add ink-drawn room texture. -->
<g fill="none" stroke="#365650" stroke-width="1" stroke-linecap="round"><path d="M0 353Q120 349 230 351M633 351H800M13 344H75M730 345H790"/><path d="M440 32l3 -2M447 30l3 2M458 42l3 -2M344 177l4 1M344 183l2 -1M470 194l3 -1M458 196l2 2"/></g>
<!-- Four-pane window and curtains. -->
<g stroke="#365650" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M34 47Q118 38 205 47V271Q116 277 34 270Z" fill="#8ed9e3"/>
<g stroke="none"><circle cx="157" cy="85" r="24" fill="#ffe27b"/><path d="M48 127Q43 111 59 109Q68 84 85 107Q105 100 112 120V133H48Z" fill="#fffef0"/><path d="M87 230Q72 223 82 212Q85 198 104 205Q119 184 133 203Q156 202 159 223L154 232Z" fill="#fffef0"/></g>
<path d="M120 43V274M34 158H205" fill="none"/>${s.curtains==='tied'?'<path d="M20 37H58Q69 120 33 182Q54 235 43 285H20Z" fill="#df9b80"/><path d="M221 37H183Q172 120 208 182Q187 235 198 285H221Z" fill="#df9b80"/><path d="M22 180L42 186M199 186L219 180" stroke="#365650" stroke-width="5"/>':'<path d="M22 37V285M219 37V285" stroke="#df9b80" stroke-width="13"/>'}
</g>
<g fill="none" stroke="#365650" stroke-width="1.5" stroke-linecap="round"><path d="M16 44V278M26 43V278M214 43V279M224 43V279M38 280Q115 286 201 280M42 55L65 51M42 62L54 60"/><path d="M45 63L97 53M45 73L77 66M137 183L192 165M151 187L192 174"/></g>
<!-- Clock and four staggered picture frames. -->
<g stroke="#365650" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><circle cx="366" cy="100" r="36" fill="#fffdf1"/><path d="M366 100L368 77M366 100L${s.clock===8?'346 115':'386 108'}" fill="none"/>
<rect x="254" y="45" width="47" height="64" rx="2" fill="#fff9e9" stroke="#956e54"/><path d="M261 99L276 69L294 99Z" fill="#84b49b" stroke="none"/>
<rect x="274" y="151" width="49" height="64" rx="2" fill="#fff9e9" stroke="#956e54"/><path d="M282 203Q299 170 315 203" fill="#e8b6a6" stroke="none"/>
<path d="M514 50L619 48L620 159L515 162Z" fill="#fff9e9" stroke="#956e54"/>
${s.picture==='sun'?'<path d="M530 147V114Q529 78 564 79Q602 79 603 114V147Z" fill="#83b59a" stroke="none"/><circle cx="568" cy="86" r="21" fill="#ffd16a" stroke="none"/>':'<path d="M530 147V114Q529 78 564 79Q602 79 603 114V147Z" fill="#88a3b5" stroke="none"/><path d="M573 65A24 24 0 1 0 588 105A24 24 0 0 1 573 65" fill="#ffe3a1" stroke="none"/>'}
<rect x="522" y="185" width="93" height="55" rx="2" fill="#fff9e9" stroke="#956e54"/>${s.lowerPicture==='swirl'?'<path d="M538 218Q543 195 570 199Q597 200 598 216Q594 231 570 227Q551 222 560 211Q570 203 581 212Q584 218 574 218" fill="none" stroke="#9dbbaa" stroke-width="4"/>':'<path d="M531 230L548 210L567 226L585 204L607 230" fill="#9dbbaa" stroke="none"/>'}
</g>
<!-- Tick marks, hanging wires and inner frame borders. -->
<g fill="none" stroke="#365650" stroke-linecap="round"><path d="M366 68V73M366 127V132M335 100H340M392 100H397M344 78L348 82M386 121L389 124M344 122L348 118M385 80L389 76" stroke-width="2"/><circle cx="366" cy="100" r="3" fill="#365650"/><path d="M260 44L276 30L294 44M520 49L566 26L612 48M280 150L296 137L317 150M531 184L568 170L608 184" stroke-width="1.5"/><path d="M258 50H296V104H259ZM279 156H318V210H279M520 55L613 54V154L520 155ZM527 190H610V234H527Z" stroke-width="1"/></g>
<!-- Four aligned wall shelves, above the lamp. -->
<g fill="#bc9972" stroke="#365650" stroke-width="3" stroke-linejoin="round"><path d="M664 47H770V57H664Z"/><path d="M664 84H770V94H664Z"/><path d="M664 121H770V131H664Z"/><path d="M664 158H770V168H664Z"/></g>
<g stroke="none"><rect x="681" y="22" width="11" height="25" fill="#86bba1"/><rect x="696" y="28" width="13" height="19" fill="#e7bd78"/><rect x="714" y="19" width="10" height="28" fill="#d59eae"/></g>
${s.shelfBooks===4?'<g fill="#d59eae" stroke="#365650" stroke-width="2"><rect x="736" y="17" width="17" height="30" rx="2"/><path d="M740 23H749M741 39H749" fill="none"/></g>':''}
<!-- Book spines, shelf brackets, a tiny ceramic house and a leaning postcard. -->
<g stroke="#365650" stroke-width="1.8" fill="#fff9e9" stroke-linejoin="round"><path d="M680 46V21H693V46M695 46V27H709V46M712 46V18H724V46M682 26H690M698 33H706M716 24H722"/><path d="M679 84V68L690 59L701 68V84ZM675 69L690 57L705 69M687 83V75H693V83"/><path d="M735 83L729 64L750 60L756 83ZM733 67L748 64M738 72L749 69"/><path d="M684 121V108Q677 99 687 98H697Q707 99 700 108V121Z"/><path d="M716 158L711 140H748L745 158ZM710 140H750"/><path d="M680 58V64H687M752 58V64H759M680 95V101H687M752 95V101H759M680 132V138H687M752 132V138H759M680 169V175H687M752 169V175H759"/></g>
<!-- Oval rug behind sofa and table. -->
<ellipse cx="411" cy="444" rx="277" ry="65" fill="#f8e29d" stroke="#ddc47c" stroke-width="3"/><ellipse cx="411" cy="444" rx="251" ry="50" fill="none" stroke="#e6cb80" stroke-width="3"/>
<ellipse cx="411" cy="444" rx="262" ry="56" fill="url(#${s.carpet==='diamond'?'diamonds':'woven'})"/>
<g fill="none" stroke="#365650" stroke-width="1.5" stroke-linecap="round"><path d="M157 430L142 428M151 440L136 440M152 450L139 452M160 460L148 465M176 473L166 481M198 484L191 491M225 493L221 500M253 498L251 506M284 503V511M317 506V514M352 508V516M388 510V517M425 509V517M462 508L464 516M500 506L504 514M536 501L541 509M573 495L581 503M607 485L617 493M635 474L647 481M655 461L669 466M666 446H681M662 432L677 428"/></g>
<!-- Wide sofa with two cushions. -->
<g stroke="#365650" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M257 388L250 420M597 388L605 420" fill="none" stroke-width="8"/>
<path d="M240 335V270Q240 231 284 231H567Q612 231 612 270V337Z" fill="#79b99b"/>
<path d="M261 330V277Q261 255 285 255H421Q437 255 437 274V331M437 277Q437 255 455 255H565Q590 255 590 277V331" fill="#96d0ad"/>
<path d="M256 331H597V393H256Z" fill="#80c5a2"/><path d="M233 319Q234 302 251 304Q270 303 271 321V384Q272 402 253 400Q234 401 233 384Z" fill="#5da98c"/><path d="M589 320Q588 302 608 304Q628 303 628 321V383Q628 403 608 400Q589 402 589 384Z" fill="#5da98c"/>
<path d="M291 278L345 269L366 321L310 334Z" fill="${s.cushion==='stripe'?'url(#stripes)':'#eaa1b9'}" stroke-width="4"/>
<path d="M500 273Q530 271 555 284L543 333L490 321Z" fill="#ffe08a" stroke-width="4"/>
</g>
${s.upholstery==='tufted'?'<g stroke="#365650" stroke-width="2" fill="#5da98c"><circle cx="390" cy="284" r="5"/><circle cx="477" cy="284" r="5"/><path d="M381 275L386 280M394 288L399 293M381 293L386 288M394 280L399 275M468 275L473 280M481 288L486 293M468 293L473 288M481 280L486 275" fill="none"/></g>':''}
<!-- Upholstery piping, stitched corners and fabric folds. -->
<g fill="none" stroke="#365650" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M249 294V270Q249 242 283 242H568Q600 242 601 270V292M280 338H580M282 385H578M280 380H580"/><path d="M286 259l10 6M418 261l-8 8M448 263l8 6M580 260l-9 6M278 322l10 -5M577 322l-9 -5M243 319V381M617 319V382M247 320v12M613 321v12"/><path d="M298 282L341 276L357 317L314 326ZM506 279Q528 279 548 288L539 325L497 318Z" stroke-dasharray="3 4"/><path d="M306 286l8 3M340 309l9 4M511 284l4 8M533 315l6 -4"/></g>
<!-- Left side table, potted plant and mug. -->
<g stroke="#365650" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M70 374L64 424M173 374L184 424" fill="none" stroke="#90684c" stroke-width="6"/>
<path d="M53 351Q113 345 186 353V375H53Z" fill="#b9966d"/>
<path d="M98 316H151L143 352H108Z" fill="#e7b580"/>
${s.plant?'<path d="M123 316Q121 284 127 263Q110 248 108 230Q108 212 119 216Q139 223 127 263Q144 242 160 246Q179 257 151 275L126 286Q105 286 94 276Q87 257 106 266L126 282" fill="#8dc67f"/>':''}
<path d="M115 337Q123 347 133 337" fill="none" stroke-width="2"/><circle cx="114" cy="330" r="2" fill="#365650" stroke="none"/><circle cx="136" cy="330" r="2" fill="#365650" stroke="none"/>
<path d="M163 333H187V357Q173 364 163 357Z" fill="${s.mug==='blue'?'#83b9c8':'#fff3d6'}" stroke-width="3"/><path d="M187 337Q204 335 200 348Q198 354 187 353" fill="none" stroke-width="3"/></g>
<!-- Hand-drawn grain and pot decoration. -->
<g stroke="#365650" stroke-width="1.3" fill="none" stroke-linecap="round"><path d="M60 358Q94 352 109 357Q136 363 158 358M61 366Q80 361 101 365M127 369Q150 365 177 368M109 320H145M112 347H140"/>
${s.plant?'<path d="M122 311L127 268M126 280L153 256M124 286L99 274M125 257L118 228"/>':''}
<path d="M168 337V352M169 354l4 2" stroke="#fff9e9" stroke-width="2"/></g>
<!-- Oval coffee table and blue vase. -->
<g stroke="#365650" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M337 445L331 472M497 445L504 472" fill="none" stroke="#90684c" stroke-width="8"/><ellipse cx="414" cy="420" rx="115" ry="31" fill="#cc9969"/><ellipse cx="414" cy="418" rx="105" ry="23" fill="none" stroke="#e9bf8d" stroke-width="2"/>
<path d="M401 380H423L423 389Q443 418 413 428Q383 422 399 392Z" fill="#b2d2d7" stroke-width="4"/><ellipse cx="412" cy="380" rx="11" ry="4" fill="#7fa6aa" stroke-width="3"/>
${s.flower?'<path d="M412 376Q411 342 420 317" fill="none" stroke="#668e61" stroke-width="4"/><path d="M412 353Q383 349 391 335Q404 335 413 348M414 342Q443 335 440 326Q420 328 414 342" fill="#91bd7b" stroke="#668e61" stroke-width="2"/><g fill="#e792b0" stroke="#a96280" stroke-width="2"><ellipse cx="419" cy="297" rx="12" ry="16"/><ellipse cx="435" cy="314" rx="16" ry="11"/><ellipse cx="421" cy="329" rx="12" ry="16"/><ellipse cx="404" cy="315" rx="16" ry="11"/><circle cx="419" cy="314" r="10" fill="#ffe080"/></g>':''}</g>
<g stroke="#365650" stroke-width="1.2" fill="none" stroke-linecap="round"><path d="M321 417Q344 403 373 406M326 422Q345 414 360 416M444 405Q479 407 501 419M456 428Q477 426 491 423M345 441Q410 454 481 438"/><path d="M402 398Q395 415 408 419M422 397l3 9M407 385H418" stroke-width="2"/>
<path d="M79 400Q94 397 106 400Q99 403 87 402M584 482Q600 478 618 480M591 487l19 -3M33 461l44 -2M38 466l24 -1M703 389l39 3M717 397l28 1M275 492l28 -2"/></g>
<!-- Pink floor lamp, to the right. -->
${s.lamp?'<g stroke="#365650" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M700 230V440M674 443Q701 430 728 443" fill="none"/><path d="M666 176Q696 164 734 176L754 231Q705 244 648 231Z" fill="#df94b9"/><path d="M660 225Q704 233 742 225" fill="none" stroke="#c978a3" stroke-width="3"/></g>':''}
${s.lamp?'<g stroke="#365650" stroke-width="1.5" fill="none" stroke-linecap="round"><path d="M672 181L660 224M684 178L677 227M699 176V228M714 177L720 227M728 181L739 223M705 245V427M688 440L700 438M714 441l6 1"/><path d="M736 239V270"/><circle cx="736" cy="273" r="3" fill="#365650"/></g>':''}
</svg>`;
svg=polishRoom(svg,s);
// Ink-and-paper palette. Keep differences visible without relying on colour.
const monochrome = svg.replace(/stroke="#[0-9a-fA-F]{6}"/g, 'stroke="#171717"').replace(/stroke="none"/g, 'stroke="#171717" stroke-width="1.5"').replace(/#[0-9a-fA-F]{6}/g, colour => ['#171717','#365650','#90684c','#956e54','#d887a3','#7fa6aa','#ffd16a','#ffe3a1','#83b9c8'].includes(colour)?'#171717':'#ffffff');
const amount = Math.min(1, Math.max(0, colourProgress));
const colouredContent = svg.slice(svg.indexOf('>') + 1, svg.lastIndexOf('</svg>'))
 .replace(/id="([^"]+)"/g, 'id="colour-$1"').replace(/url\(#/g, 'url(#colour-');
const layer = `<g class="colour-layer" opacity="${amount}" style="--previous-colour:${Math.max(0, amount - colourStep)};--current-colour:${amount}" aria-hidden="true">${colouredContent}</g>`;
return monochrome.replace('</svg>', layer + '</svg>');
}
