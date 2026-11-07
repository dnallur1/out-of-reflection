// Room-specific illustration and hit areas use the same 800 × 520 coordinate system.
export const otherObjects={
 kitchen:{
  kettle:{name:'kettle',x:164,y:253,w:96,h:82},
  fruit:{name:'fruit bowl',x:580,y:287,w:116,h:76},
  towel:{name:'oven towel',x:374,y:395,w:80,h:80},
  shelfJar:{name:'jar on the wall shelf',x:236,y:119,w:44,h:44},
  cabinet:{name:'upper cabinet door',x:690,y:136,w:88,h:156}
 },
 bedroom:{
  pillow:{name:'bed pillow',x:453,y:270,w:120,h:70},
  blanket:{name:'bedspread pattern',x:404,y:365,w:220,h:85},
  nightBook:{name:'bedside books',x:656,y:331,w:100,h:46},
  botanical:{name:'left botanical picture',x:327,y:102,w:94,h:116},
  bedLamp:{name:'bedside lamp',x:662,y:262,w:90,h:90},
  wardrobe:{name:'wardrobe handles',x:130,y:312,w:65,h:40},
  stars:{name:'hanging moon mobile',x:178,y:130,w:116,h:138}
 }
};
export function otherRoom(s){
const kitchen=s.scene==='kitchen';
return `<svg class="room-art" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustrated ${kitchen?'kitchen with cabinets, cooker, sink and breakfast table':'bedroom with bed, moon mobile, wardrobe and bedside table'}">
<rect width="800" height="520" fill="${kitchen?'#fff1cf':'#ece3f3'}"/>
<path d="M0 389H800V520H0Z" fill="#e2bc86"/>
<g stroke="#956e54" stroke-width="1.5" fill="none"><path d="M0 440H800M0 494H800M120 389L80 520M300 389L285 520M500 389L518 520M670 389L730 520"/></g>
<g stroke="#365650" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
${kitchen?`
<!-- Open wall shelving and hanging utensils. -->
<path d="M38 74Q148 69 264 74Q275 80 265 87Q150 92 38 87Q28 81 38 74ZM51 139Q150 135 257 139Q269 145 258 151Q154 156 51 151Q40 145 51 139Z" fill="#c69c78"/>
<g fill="#f7f2df"><path d="M58 51Q70 47 82 51L80 70Q70 74 60 70ZM96 43Q107 39 119 43L117 70Q108 73 98 70ZM136 51Q148 47 160 51L158 70Q148 73 138 70Z"/><path d="M188 52Q206 45 224 52V72H188Z"/><path d="M72 115Q87 111 102 115L100 132Q88 141 74 132ZM141 109Q157 105 172 109L169 132Q155 140 144 132Z"/><path d="M104 118Q124 113 114 131H104M172 111Q191 108 182 127H172" fill="none"/></g>
<path d="M53 176H247M75 176V203M126 176V202M177 176V203M225 176V211" fill="none"/>
<ellipse cx="75" cy="218" rx="10" ry="16" fill="#c5d9d5"/><path d="M116 204H136V229H116ZM166 204H187L182 232H170Z" fill="#c5d9d5"/><circle cx="225" cy="224" r="12" fill="#c5d9d5"/>
${s.shelfJar?'<rect x="220" y="106" width="31" height="31" rx="5" fill="#e39a7d"/><path d="M220 103H251M225 113H246M225 128H246" fill="none" stroke-width="2"/>':''}
<!-- Cooker, tile backsplash and countertop. -->
<path d="M25 241H763V301H25Z" fill="#d3e6df"/>
<g stroke-width="1"><path d="M25 261H763M25 282H763M57 241V301M108 241V301M159 241V301M210 241V301M261 241V301M312 241V301M363 241V301M414 241V301M465 241V301M516 241V301M567 241V301M618 241V301M669 241V301M720 241V301"/></g>
<path d="M32 297Q397 291 757 297Q771 298 765 311Q398 321 30 313Q18 306 32 297Z" fill="#b99070"/>
<path d="M38 316Q158 310 284 316Q293 361 289 426Q286 445 271 445H53Q35 445 34 427Q29 369 38 316ZM485 316Q616 310 748 316Q759 370 752 428Q749 445 732 445H502Q485 445 481 427Q475 369 485 316Z" fill="#9bc7b1"/>
<path d="M163 319Q158 376 163 437M617 319Q612 377 617 437M42 365Q157 372 283 365M489 365Q613 372 746 365" fill="none" stroke-width="2"/>
<path d="M130 338Q138 346 146 338M178 338Q186 346 194 338M583 338Q591 346 599 338M633 338Q641 346 649 338" fill="none"/>
<path d="M318 298Q385 292 451 298Q469 299 470 319L466 428Q466 448 448 450H321Q302 447 302 429L299 320Q299 301 318 298Z" fill="#f9f2df"/>
<rect x="317" y="352" width="136" height="74" rx="20" fill="#88a3b5"/><path d="M328 363L343 359M328 371L367 359" stroke="#fff9e9" stroke-width="2"/>
<path d="M320 342H451" fill="none"/><circle cx="327" cy="325" r="5" fill="#365650"/><circle cx="356" cy="325" r="5" fill="#365650"/><circle cx="414" cy="325" r="5" fill="#365650"/><circle cx="443" cy="325" r="5" fill="#365650"/>
<ellipse cx="340" cy="296" rx="23" ry="5" fill="#365650"/><ellipse cx="429" cy="296" rx="23" ry="5" fill="#365650"/>
<!-- Sink, kitchen window, cabinet. -->
<path d="M309 208V78Q309 49 339 48Q395 42 453 49Q481 51 481 78V208Q395 216 309 208Z" fill="#8ed9e3"/><path d="M395 56V209M310 132H479" fill="none"/><circle cx="440" cy="93" r="20" fill="#ffe27b"/><path d="M320 187Q340 160 358 184Q379 176 386 193H320" fill="#fffef0" stroke-width="1.5"/>
<path d="M303 211Q395 206 487 211Q499 215 488 222Q394 228 303 222Q291 216 303 211Z" fill="#b99070"/>
<path d="M567 51Q640 38 715 51Q737 55 738 77L735 201Q735 222 714 225Q641 231 568 225Q546 222 545 201L543 78Q543 56 567 51Z" fill="#9bc7b1"/>
<path d="M642 53V220" fill="none"/><rect x="559" y="63" width="71" height="146" rx="17" fill="#f7f2df"/>
${s.cabinet==='glass'?'<rect x="654" y="63" width="71" height="146" rx="17" fill="#c5d9d5"/><path d="M662 119H717M662 166H717M674 88H691V115H674M682 143H705V162H682" fill="#fff9e9" stroke-width="2"/>':'<rect x="654" y="63" width="71" height="146" rx="17" fill="#9bc7b1"/>'}
<path d="M620 124V145M663 124V145" fill="none"/>
<ellipse cx="655" cy="304" rx="60" ry="7" fill="#88a3b5"/><path d="M688 295V263Q688 242 667 246Q654 248 654 263" fill="none"/>
${s.kettle?'<path d="M141 284Q121 276 131 251Q136 233 159 234Q184 232 192 251Q203 276 184 284Q163 291 141 284Z" fill="#f1cd75"/><path d="M141 235H182M155 226H171M191 247Q220 233 213 270L192 275M134 251L113 244L131 272" fill="none"/>':''}
<path d="M539 287Q579 298 623 287Q620 317 581 318Q546 317 539 287Z" fill="#d7a0b2"/>
${s.fruit==='pears'?'<path d="M559 279Q557 265 569 264Q571 244 580 251L585 268Q599 285 579 290Q559 294 559 279Z" fill="#a7c778"/><path d="M595 277Q594 264 605 263L611 252L618 270Q630 289 609 290Z" fill="#a7c778"/>':'<circle cx="562" cy="282" r="12" fill="#e39a7d"/><circle cx="588" cy="279" r="14" fill="#e39a7d"/><circle cx="610" cy="283" r="11" fill="#f1cd75"/>'}
<path d="M339 352Q372 347 408 352Q403 383 411 419Q404 430 391 424Q379 430 368 424Q353 429 338 424Q344 388 339 352Z" fill="#fff9e9"/>
${s.towel==='striped'?'<path d="M346 356V420M360 356V420M375 356V420M390 356V420M404 356V420" stroke="#d887a3" stroke-width="6"/>':'<path d="M343 408H404M343 415H404" stroke="#88a3b5" stroke-width="2"/>'}
<path d="M338 424l3 7M348 424l2 7M358 424v7M368 424v7M378 424v7M388 424v7M398 424l-2 7M408 424l-2 7" stroke-width="1"/>
<ellipse cx="400" cy="482" rx="180" ry="22" fill="#f1cd75"/><path d="M238 480Q400 456 562 480M243 487Q400 465 557 487" fill="none" stroke-width="1"/>
`: `
<!-- Bedroom wardrobe and framed botanical prints. -->
<path d="M38 221Q35 177 78 174Q130 160 184 174Q225 179 223 221L219 419Q218 444 194 448Q130 457 66 448Q40 444 40 419Z" fill="#b1c8d9"/><path d="M130 180Q125 310 130 443M51 214Q50 190 76 188L112 186Q119 187 119 205V422Q119 433 104 433L66 430Q51 430 51 415ZM141 205Q140 187 150 186L185 189Q209 192 209 216V415Q209 431 194 431L157 433Q142 433 142 420Z" fill="none" stroke-width="2"/>
${s.wardrobe==='round'?'<circle cx="111" cy="312" r="6" fill="#f1cd75"/><circle cx="149" cy="312" r="6" fill="#f1cd75"/>':'<path d="M111 300V325M149 300V325" fill="none"/>'}<path d="M52 445V457M208 445V457" fill="none"/>
<path d="M43 188Q130 145 217 188" fill="none"/>
<rect x="285" y="50" width="84" height="104" rx="10" fill="#fff9e9"/><rect x="427" y="50" width="84" height="104" rx="10" fill="#fff9e9"/>
<g stroke-width="2"><path d="M327 137V73M327 108Q300 109 303 91Q324 89 327 108M327 92Q350 96 352 77Q332 77 327 92M469 137V73M469 115Q444 115 445 97Q467 97 469 115M469 92Q493 94 493 78Q474 76 469 92" fill="#9bc7b1"/></g>
${s.botanical==='flower'?'<g fill="#d7a0b2" stroke-width="2"><circle cx="327" cy="76" r="10"/><circle cx="314" cy="65" r="10"/><circle cx="340" cy="65" r="10"/><circle cx="327" cy="54" r="10"/><circle cx="327" cy="65" r="7" fill="#f1cd75"/></g>':''}
<!-- Hanging moon mobile. -->
<path d="M178 25V62M129 64H227M135 65V100M178 64V119M220 64V96" fill="none" stroke-width="2"/>
<path d="M143 100A22 22 0 1 0 150 138A22 22 0 0 1 143 100" fill="#f1cd75"/>
<path d="M178 120L183 132L197 133L186 142L190 155L178 148L167 155L170 142L160 133L174 132Z" fill="#f1cd75"/>
${s.stars==='extra'?'<path d="M220 96L225 108L239 109L228 118L232 131L220 124L208 131L212 118L201 109L215 108Z" fill="#f1cd75"/>':'<circle cx="220" cy="112" r="12" fill="#d7a0b2"/>'}
<!-- Bed, pillows, quilt and curved headboard. -->
<path d="M260 308Q254 267 261 235Q267 199 306 197Q400 177 499 197Q538 199 546 235Q553 269 544 309Z" fill="#9bc7b1"/><path d="M277 284V244Q277 208 311 208H494Q528 208 528 244V284" fill="none" stroke-width="2"/>
<path d="M272 292H531L563 431H241Z" fill="#fff9e9"/>
<path d="M293 250Q284 240 307 237Q339 230 372 239Q388 243 382 258L377 287Q377 301 361 295Q331 287 300 298Q282 302 287 286Z" fill="#fff9e9"/>
<path d="M404 250Q392 240 414 237Q454 229 487 239Q503 240 502 256L508 285Q515 301 495 297Q450 287 419 298Q400 303 405 286Z" fill="#d7a0b2"/>
${s.pillow==='striped'?'<path d="M411 249L416 290M430 245L434 288M449 245L452 289M468 245L471 290M487 250L490 292" stroke="#956e54" stroke-width="5"/>':'<path d="M415 253Q449 247 485 253M415 283Q452 279 491 284" fill="none" stroke-width="1"/>'}
<path d="M266 308Q400 293 539 308Q541 350 557 388Q568 411 558 424Q549 436 531 428Q515 441 498 433Q482 445 464 437Q444 447 424 440Q401 450 380 441Q357 449 338 439Q316 446 298 436Q277 443 265 430Q235 442 244 413Q257 366 266 308Z" fill="#b1a5cf"/>
${s.blanket==='diamonds'?'<path d="M295 341L318 323L341 341L318 359ZM372 341L395 323L418 341L395 359ZM449 341L472 323L495 341L472 359ZM330 390L353 372L376 390L353 408ZM410 390L433 372L456 390L433 408ZM490 390L513 372L536 390L513 408Z" fill="#f1cd75" stroke-width="2"/>':'<path d="M273 335Q401 323 532 335M264 366Q403 353 544 366M257 398Q400 384 551 398" fill="none" stroke="#fff9e9" stroke-width="3"/>'}
<path d="M241 428Q398 452 561 428Q574 445 557 452Q400 474 247 452Q232 447 241 428ZM257 454Q249 464 257 472M547 454Q555 464 547 472" fill="#b99070"/>
<!-- Bedside table, books and wall light. -->
<path d="M613 350Q667 343 723 350Q737 353 728 365Q667 372 610 365Q600 357 613 350ZM619 368Q610 405 617 439M716 368Q725 405 718 439M617 406Q667 415 718 406" fill="#b99070"/>
<rect x="621" y="324" width="70" height="13" rx="2" fill="#88a3b5"/><path d="M627 328H686" fill="none" stroke="#fff9e9" stroke-width="2"/>
${s.nightBook===2?'<rect x="628" y="308" width="70" height="13" rx="2" fill="#f1cd75"/><path d="M634 313H692" fill="none" stroke-width="1"/>':''}
${s.bedLamp?`<path d="M662 278V298M641 301Q662 290 681 301M642 231Q662 221 683 231L696 270Q702 280 687 282Q663 288 636 282Q621 280 627 270Z" fill="#d7a0b2"/>
<path d="M646 233L638 270M662 231V271M676 234L685 269" fill="none" stroke-width="1"/>
`:''}
<!-- Bedroom window with draped curtains. -->
<rect x="586" y="48" width="150" height="139" rx="18" fill="#88a3b5"/><path d="M661 49V186M587 118H735" fill="none"/>
<path d="M600 51A20 20 0 1 0 620 82A21 21 0 0 1 600 51" fill="#fff9e9" stroke-width="1"/>
<path d="M574 40H609Q618 103 581 145V199H570ZM745 40H710Q700 103 739 145V199H750Z" fill="#d7a0b2"/>
<path d="M577 145H591M731 145H745" fill="none" stroke-width="2"/>
<ellipse cx="401" cy="492" rx="245" ry="22" fill="#f1cd75"/><ellipse cx="401" cy="492" rx="224" ry="15" fill="none" stroke-width="1"/>
`}
<!-- Ink texture and small floorboard marks. -->
<g stroke-width="1" fill="none"><path d="M25 382H231M571 382H779M60 463l24 -2M69 468l12 -1M700 481l25 2M712 486l13 1M263 29l3 -2M269 29l2 1M774 219l-3 2M770 224l-2 1"/></g>
</g></svg>`;
}
