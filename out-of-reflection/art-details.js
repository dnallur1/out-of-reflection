// Hand-drawn detail layers share the existing coordinates and puzzle silhouettes.
const ink='#365650';
const lines=(body,width=1.3)=>`<g fill="none" stroke="${ink}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round">${body}</g>`;
const living=lines(`
<!-- Soft upholstery folds, piping, and a shaped sofa plinth. -->
<path d="M249 287Q248 258 270 250M593 250Q605 264 604 288M266 345Q278 350 286 348M573 348Q587 351 597 345M284 371Q425 377 574 371M287 377Q426 383 573 377"/>
<path d="M298 294l6 9M353 306l-5 10M512 295l5 10M544 299l-4 12M269 360l7 5M592 357l-6 7" opacity=".65"/>
<!-- Turned table edge, woodgrain, and concentric rug binding. -->
<path d="M313 432Q410 466 511 433M317 437Q412 470 507 438M340 447l-8 17M487 447l7 15M314 477l-3 11M508 478l3 11"/>
<path d="M66 374l-3 22M171 375l5 20M79 361q16 -4 30 0M136 363q20 -4 34 0"/>
<!-- Subtle glazing and double curtain stitching. -->
<path d="M42 53Q118 46 196 53M41 263Q119 270 198 265M128 52V151M130 167V266" opacity=".5"/>
`);
const kitchen=lines(`
<!-- Shaker cabinetry: inset panels, bevels, kickboards and drawer runners. -->
<path d="M49 381Q96 376 146 381L145 422Q98 429 48 422ZM180 381Q226 376 276 381L274 423Q224 430 178 423ZM495 381Q546 376 599 381L599 424Q546 430 494 423ZM634 381Q684 376 738 381L737 422Q686 430 633 422Z"/>
<path d="M48 328Q96 324 147 328M178 328Q226 324 276 328M495 328Q546 324 600 328M634 328Q684 324 738 328M48 441Q160 449 280 441M491 441Q616 449 741 441" opacity=".6"/>
<!-- Routed counter edge and worn timber grain. -->
<path d="M30 308H295M475 308H758M44 302l53 0M216 302h64M492 302h35M710 302h36M51 346h54M179 349h62" opacity=".55"/>
<!-- Cooker hardware and double oven glazing. -->
<path d="M309 318Q308 305 323 304Q384 299 448 304Q463 305 462 320L460 428Q460 439 446 440H324Q309 438 310 425ZM317 347H454M326 416H445M329 405H444M329 398H444M331 382l14 -5M338 386l23 -8"/>
<path d="M321 337H448" stroke-width="5"/>
<path d="M325 338H444" stroke="#ffffff" stroke-width="1"/>
<path d="M322 322l3 -2M352 322l3 -2M411 322l3 -2M440 322l3 -2" stroke="#ffffff"/>
<!-- Shelf brackets and small ceramic decorations. -->
<path d="M53 88V101L67 88M239 88V101L253 88M64 152V164L76 152M233 152V164L245 152M61 56H78M61 62H78M100 49H115M100 57H115M141 55H155M142 63H155M76 124H98M146 117H167"/>
<path d="M64 54v14M103 44v24M143 52v16M194 57v11" stroke="#ffffff" stroke-width="2"/>
<!-- Window recess and cabinet joinery. -->
<path d="M303 211V77Q303 44 337 43Q395 37 456 44Q488 46 488 78V211M316 202V79Q316 56 340 55Q395 49 452 56Q475 58 475 80V202M402 62V124M403 140V203M315 215H481M553 201V81Q552 59 576 57L622 57M650 58H708Q730 60 730 82V201"/>
<path d="M319 67l29 -4M320 75l15 -3M433 147l36 -12M445 151l24 -8" stroke="#ffffff" stroke-width="2"/>
<!-- Sink rim and curved draining grooves. -->
<path d="M598 301Q654 310 713 301M603 299Q655 304 706 299M721 290l25 0M721 285l25 0M722 280l24 0M680 266V291"/>
<!-- Woven runner binding and fringe. -->
<path d="M236 479Q401 450 563 479M243 489Q400 475 556 489M247 473v16M267 469v20M287 466v22M307 463v23M327 461v23M347 460v23M367 459v23M387 458v24M407 458v24M427 459v23M447 460v23M467 462v23M487 464v23M507 467v21M527 470v19M547 474v15" opacity=".55"/>
`);
const bedroom=lines(`
<!-- Arched wardrobe moulding, side bevel and inset door panels. -->
<path d="M45 218Q42 181 80 180Q130 167 181 180Q216 183 216 219M56 415Q79 426 111 423M149 423Q179 427 204 416M52 445Q132 462 209 445M57 452v7M204 452v7"/>
<path d="M63 226q13 -4 28 0M72 234l13 -1M157 385q15 -4 32 0M168 393l13 -1" opacity=".45"/>
<!-- Deep upholstered headboard with piping and small folds. -->
<path d="M268 282Q260 253 269 234Q276 208 310 206Q399 187 495 206Q528 210 536 235Q544 258 536 284M283 237Q285 219 303 217M508 219q14 8 14 23M284 278l9 7M512 278l-8 7"/>
<!-- Pillow welts and quilt stitching retain the puzzle's original patterns. -->
<path d="M298 251Q338 242 377 251L371 288Q334 281 294 289Z" stroke-dasharray="2 4"/>
<path d="M267 314Q403 302 535 314M258 408Q405 423 553 408" stroke-dasharray="3 4"/>
<path d="M270 318l-13 80M534 318l14 80M279 419l-7 12M523 419l8 12M265 448Q404 462 539 448M267 454l-3 10M537 454l3 10"/>
<!-- Bedside table joinery, lower shelf and turned leg details. -->
<path d="M611 355H726M625 371Q667 367 711 371L708 397Q668 406 626 397ZM646 378H690M620 410H715M624 414V435M711 414V435M650 382h36M657 388h23"/>
<!-- Fine frame borders, picture wires and botanical veins. -->
<path d="M299 56H355Q363 56 363 65V139Q363 148 354 148H300Q291 148 291 139V65Q291 56 299 56ZM441 56H497Q505 56 505 65V139Q505 148 496 148H442Q433 148 433 139V65Q433 56 441 56ZM294 49L327 30L359 49M436 49L469 30L501 49M307 96l18 9M348 82l-18 8M449 103l18 10M488 82l-16 8"/>
<!-- Drapery stitching and timber sill, with light glancing off the panes. -->
<path d="M582 51Q591 100 579 135M590 52Q602 102 586 135M738 51Q726 102 740 135M730 52Q716 103 732 135M577 154V189M743 154V189M583 189H737V199H583M613 55h95M615 59l20 -4M674 127l30 -7M681 133l23 -7"/>
<!-- Braided bedside rug. -->
<path d="M174 490Q401 455 628 490M184 500Q403 477 618 500M199 485l-4 13M220 481l-3 16M242 478l-3 17M264 476l-2 17M286 473l-1 18M309 471v19M332 470v19M355 469v20M378 468v21M401 468v21M424 468v21M447 469v20M470 470v20M493 472v19M516 474l1 19M539 476l2 18M562 479l3 17M585 483l3 15M606 487l4 12" opacity=".55"/>
`);
function shadows(scene){
const shapes=scene==='kitchen'?'<ellipse cx="163" cy="448" rx="139" ry="11"/><ellipse cx="618" cy="448" rx="145" ry="11"/>':scene==='bedroom'?'<ellipse cx="401" cy="462" rx="184" ry="17"/><ellipse cx="131" cy="452" rx="104" ry="12"/><ellipse cx="669" cy="444" rx="77" ry="9"/>':'<ellipse cx="426" cy="405" rx="202" ry="17"/><ellipse cx="119" cy="405" rx="83" ry="10"/><ellipse cx="698" cy="445" rx="40" ry="7"/>';
return `<g fill="${ink}" opacity=".10" stroke="none">${shapes}</g>`;
}
export function polishRoom(svg,s){
const scene=s.scene||'living';
// Place contact shadows underneath the furniture, not over the target details.
const anchor=scene==='living'?'<!-- Small wall marks':'<g stroke="#365650" stroke-width="4"';
svg=svg.replace(anchor,shadows(scene)+anchor);
let detail=scene==='kitchen'?kitchen:scene==='bedroom'?bedroom:living;
// Conditional details vanish with the puzzle objects they belong to.
if(scene==='living'){
 if(s.lamp)detail+=lines('<path d="M677 185q20 -7 45 0M669 218q29 7 64 1M695 247v179"/>');
 if(s.plant)detail+=lines('<path d="M116 239l8 10M145 255l-12 16M101 272l13 8"/>');
 if(s.flower)detail+=lines('<path d="M412 314l4 1M422 305v5M429 315l-4 1"/>');
}
if(scene==='kitchen'){
 if(s.kettle)detail+=lines('<path d="M140 249Q134 269 143 277M150 242H176M193 253q16 -11 15 8M146 278H178"/>');
 if(s.shelfJar)detail+=lines('<path d="M224 110v14M225 131h21"/>');
 detail+=lines(s.fruit==='pears'?'<path d="M571 278q-4 6 3 8M607 274q-4 6 1 9M577 255l4 -5M610 257l4 -5"/>':'<path d="M559 270l3 4M585 265l3 4M608 272l3 3M555 281q-2 4 2 6M581 278q-2 5 2 7"/>');
 detail+=lines('<path d="M545 295q34 17 72 0M343 357v43M404 357v43M343 422h61"/>');
}
if(scene==='bedroom'){
 if(s.bedLamp)detail+=lines('<path d="M635 272Q662 280 689 272M646 234Q660 231 678 234M658 280v17M644 302h34"/>');
 detail+=lines('<path d="M627 332h58M630 335h51"/>');
 if(s.nightBook===2)detail+=lines('<path d="M634 316h58M636 319h49"/>');
}
return svg.replace('</svg>',detail+'</svg>');
}
