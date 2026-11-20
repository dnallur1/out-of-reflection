// These rooms use the same drawing coordinates and target keys as the earlier rooms.
import {extraKeys} from './extra-rooms.js';
const layouts = {
 garage:[
  [75,65,80,90,1],[210,65,125,70,1],[70,180,110,100,1],
  [710,85,115,115,1],[560,65,90,90,1],[95,315,140,170,1],
  [210,170,70,100,1],[420,320,350,190,1.7],[650,230,100,80,1],
  [730,360,105,170,1.4],[100,465,140,100,1.2],[410,470,210,80,1.5],
  [600,470,110,90,1]
 ],
 music:[
  [315,147,80,100,1],[445,138,120,110,1.2],[65,100,100,100,1.1],
  [590,100,100,100,1.1],[720,110,110,110,1.1],[100,310,140,190,1.7],
  [230,340,90,160,1.5],[455,300,230,120,1.8],[610,205,120,70,1.2],
  [730,320,110,180,1.5],[100,465,130,100,1.1],[400,450,140,100,1.5],
  [650,465,150,100,1.3]
 ],
 workshop:[
  [80,100,90,100,1],[220,105,120,120,1.2],[400,125,120,90,1.2],
  [570,105,110,90,1],[720,100,90,100,1],[100,286,110,150,1.3],
  [240,260,90,150,1.4],[400,290,160,120,1.4],[560,260,80,150,1.3],
  [710,290,110,150,1.3],[140,450,160,110,1.4],[400,450,160,110,1.4],
  [660,450,160,110,1.4]
 ],
 observatory:[
  [70,100,90,110,1],[220,110,120,120,1.2],[390,140,120,100,1.1],
  [560,90,110,130,1.1],[720,100,90,100,1],[130,322,170,180,1.8],
  [285,330,100,160,1.4],[460,290,180,140,1.4],[610,280,100,110,1.1],
  [725,315,110,160,1.4],[140,465,160,100,1.4],[420,465,190,100,1.6],
  [670,465,130,100,1.2]
 ]
};
const rooms = {
 garage: {
  title:'Garage',wall:'#e2e8e5',floor:'#b8c0bd',
  names:['garage clock','registration plate','oil cans','hose reel','warning sign','tool cabinet','jack handle','parked car','car battery','hanging overalls','spare tyre','mechanic’s creeper','fuel can'],
  props:[
   '<circle r="32" fill="#fff9e9"/><path d="M0 -22V0L18 10M-26 0H-22M26 0H22M0 22V26" fill="none"/>',
   '<path d="M-53 -22Q-59 -22 -59 -15V19Q-59 25 -51 25H51Q59 25 59 17V-15Q59 -22 51 -22Z" fill="#e7bd78"/><path d="M-46 -12H46V14H-46Z" fill="none"/><path d="M-33 -5V8M-24 -5H-13V8H-24M-4 -5H7L-4 8H7M18 -5H30V8H18M38 -5V8" fill="none" stroke-width="2"/>',
   '<path d="M-39 -22H-8V37H-39ZM3 -36H36V37H3Z" fill="#c78b89"/><path d="M-32 -30H-16V-22H-32ZM10 -44H28V-36H10Z" fill="#e7bd78"/><path d="M-35 0H-12V20H-35ZM7 -10H32V17H7Z" fill="#fff9e9"/><path d="M-27 12L-22 3L-17 12M15 8L20 -2L25 8" fill="none" stroke-width="1.4"/>',
   '<path d="M-34 -33H34V34H-34Z" fill="#bc9972"/><circle r="27" fill="#84b49b"/><circle r="18" fill="none"/><circle r="9" fill="none"/><path d="M15 21Q42 44 31 51L23 46M-4 -6H4V6H-4Z" fill="none"/>',
   '<path d="M0 -33L33 26H-33Z" fill="#e7bd78"/><path d="M0 -14V5" fill="none" stroke-width="5"/><circle cy="15" r="3" fill="#956e54" stroke="none"/>',
   '<path d="M-60 -67Q0 -74 60 -67V70H-60Z" fill="#9ebdc0"/><path d="M-51 -53H51V-22H-51ZM-51 -15H51V17H-51ZM-51 25H51V56H-51Z" fill="#c5d9d5" stroke-width="2"/><path d="M-15 -39H15M-15 1H15M-15 40H15M-50 70V80M50 70V80" fill="none"/><circle cx="-49" cy="80" r="6" fill="#8b9290"/><circle cx="49" cy="80" r="6" fill="#8b9290"/>',
   '<path d="M-7 -43H7V38Q0 48 -7 38Z" fill="#c78b89"/><path d="M-8 -29H8M-8 -22H8M-2 -16V29" fill="none" stroke-width="1.5"/>',
   '<path d="M-91 14L-78 -4L-51 -15L-27 -46Q-21 -52 -10 -52H41Q51 -52 58 -41L74 -15L91 -7Q100 -3 99 9V29Q97 36 87 36H-80Q-94 36 -96 26Z" fill="#88b7c2"/><path d="M-47 -14L-25 -42Q-21 -46 -12 -46H7V-14ZM15 -46H40Q47 -46 52 -38L65 -14Z" fill="#c5d9d5"/><path d="M-84 7Q-64 0 -41 2M-34 4H66M72 -5L87 -2V8H72Z" fill="none" stroke-width="1.4"/><path d="M-91 15H-79V23H-92M92 15H99" fill="none" stroke-width="4"/><circle cx="-59" cy="33" r="20" fill="#8b9290"/><circle cx="65" cy="33" r="20" fill="#8b9290"/><circle cx="-59" cy="33" r="11" fill="#fff9e9"/><circle cx="65" cy="33" r="11" fill="#fff9e9"/><path d="M-59 26V40M-66 33H-52M65 26V40M58 33H72" fill="none" stroke-width="1.3"/><path d="M-10 -6H2M44 -6H56M10 -14V28" fill="none" stroke-width="1.7"/>',
   '<path d="M-40 -25H40V32H-40Z" fill="#9b8bbc"/><path d="M-29 -33H-16V-25H-29ZM17 -33H29V-25H17Z" fill="#e7bd78"/><path d="M-23 -14H-11M-17 -20V-8M15 -14H27" fill="none" stroke="#fff9e9"/><path d="M-16 2L3 -4L-5 11L13 7L-9 25L-4 13H-16Z" fill="#e7bd78" stroke-width="1.3"/>',
   '<path d="M-24 -39L-9 -43L0 -29L9 -43L24 -39L32 -17L22 -9L18 5L25 41H7L0 13L-7 41H-25L-18 5L-22 -9L-32 -17Z" fill="#88a3b5"/><path d="M-12 -30H12V-7H-12ZM-17 1H17M-18 10L-11 33M18 10L11 33" fill="none" stroke-width="1.4"/>',
   '<ellipse rx="49" ry="38" fill="#8b9290"/><ellipse rx="34" ry="25" fill="#dfbf94"/><ellipse rx="20" ry="14" fill="#fff9e9"/><path d="M-37 -21L-29 -16M-13 -35L-10 -26M14 -35L11 -26M38 -21L30 -16M-40 18L-31 13M-13 35L-10 26M14 35L11 26M39 18L30 13" fill="none" stroke-width="2"/>',
   '<path d="M-57 -18Q0 -25 57 -18V19H-57Z" fill="#bc9972"/><path d="M-50 -12H49V12H-50Z" fill="#c78b89"/><path d="M-25 -12V12M0 -12V12M25 -12V12" fill="none" stroke-width="1.3"/><circle cx="-41" cy="24" r="7" fill="#8b9290"/><circle cx="41" cy="24" r="7" fill="#8b9290"/>',
   '<path d="M-32 -22L-18 -36H19L32 -22V39H-32Z" fill="#e7bd78"/><path d="M-11 -28H12V-18H-11ZM-32 -21L-43 -28L-39 -36L-20 -29M-23 -8L22 28M22 -8L-23 28" fill="none"/><path d="M-25 34H25" fill="none" stroke-width="1.3"/>'
  ]
 },
 music: {
  title:'Music room',wall:'#eee1ea',floor:'#dfbf94',
  names:['metronome','music score','tambourine','wall record','headphones','guitar','microphone','piano keys','trumpet','violin','amplifier','drum','record case'],
  props:[
   '<path d="M-27 37L-14 -38H14L27 37Z" fill="#bc9972"/><path d="M-14 27L14 -22M-20 37H20"/><rect x="-17" y="-7" width="11" height="15" fill="#e7bd78"/>',
   '<path d="M-37 -37H37V38H-37Z" fill="#fff9e9"/><path d="M-29 -20H29M-29 -8H29M-29 4H29M-29 16H29M-5 -25V12L12 -30V8"/><ellipse cx="-12" cy="15" rx="8" ry="5"/><ellipse cx="5" cy="11" rx="8" ry="5"/>',
   '<circle r="32" fill="#e7bd78"/><circle r="23" fill="#fff9e9"/><path d="M-27 -13L-22 -23M22 23L27 13M-27 14L-21 24M21 -24L27 -14"/>',
   '<circle r="37" fill="#52575a"/><circle r="24" fill="none" stroke="#b2d2d7"/><circle r="10" fill="#df94b9"/>',
   '<path d="M-29 17V-9Q-29 -40 0 -40Q29 -40 29 -9V17" fill="none" stroke-width="7"/><rect x="-37" y="-4" width="16" height="36" rx="6" fill="#9b8bbc"/><rect x="21" y="-4" width="16" height="36" rx="6" fill="#9b8bbc"/>',
   '<path d="M-8 -43H8V-1Q35 5 27 23Q43 48 0 49Q-43 48 -27 23Q-35 5 -8 -1Z" fill="#e7bd78"/><circle cy="20" r="10" fill="#956e54"/><path d="M0 -42V39M-10 37H10"/>',
   '<ellipse cy="-23" rx="15" ry="24" fill="#9ebdc0"/><path d="M0 2V43M-25 44H25M-10 -39L10 -7M-14 -27H14"/>',
   '<rect x="-57" y="-27" width="114" height="58" rx="5" fill="#fff9e9"/><path d="M-38 -25V30M-19 -25V30M0 -25V30M19 -25V30M38 -25V30"/><path d="M-39 -26V4M-20 -26V4M18 -26V4M37 -26V4" stroke-width="9"/>',
   '<path d="M-40 8H24V-8L43 -24V29L24 15H-39Z" fill="#e7bd78"/><path d="M-21 8V-15H7V8M-17 28H10V14M-15 -23V-10M-1 -23V-10M13 -23V-10"/>',
   '<path d="M-5 -43H5V-10Q34 -14 20 6Q9 10 23 24Q30 44 0 44Q-30 44 -23 24Q-9 10 -20 6Q-34 -14 -5 -10Z" fill="#c78b89"/><path d="M0 -42V35M-15 30H15M-12 3V19M12 3V19"/>',
   '<rect x="-44" y="-35" width="88" height="70" rx="6" fill="#8b9290"/><circle cy="7" r="23" fill="#52575a"/><circle cy="7" r="13" fill="none"/><path d="M-30 -23H30"/>',
   '<ellipse cy="-23" rx="39" ry="14" fill="#fff9e9"/><path d="M-39 -23V23Q0 42 39 23V-23" fill="#c78b89"/><path d="M-30 -15V26M-10 -10V31M10 -10V31M30 -15V26"/>',
   '<path d="M-48 -27H48V32H-48Z" fill="#bc9972"/><path d="M-33 -26V-41H-7V-26M-2 -26V-45H28V-26M-33 5H33"/>'
  ]
 }
};
rooms.workshop={title:'Workshop',wall:'#ede5d6',floor:'#c8b18e',
 names:['tool clock','work plan','paint tins','safety goggles','measuring gauge','hand drill','adjustable wrench','workbench vise','paint brush','clamps','toolbox','wooden crate','work boots'],
 props:[
 '<circle r="33" fill="#dfbf94"/><path d="M0 -24V0L20 8M-23 0H-18M23 0H18"/>',
 '<path d="M-42 -38Q0 -44 42 -38V38H-42Z" fill="#fff9e9"/><path d="M-28 20V-10H8V20ZM-18 -10V-24H-5V-10M8 5H28V20H8" fill="none" stroke="#7fa6aa"/><path d="M-31 29H29M18 -27H30M18 -19H30" fill="none" stroke-width="1.4"/>',
 '<path d="M-43 -21H-7V29H-43ZM4 -33H40V29H4Z" fill="#9b8bbc"/><ellipse cx="-25" cy="-21" rx="18" ry="7" fill="#df94b9"/><ellipse cx="22" cy="-33" rx="18" ry="7" fill="#e7bd78"/><path d="M-40 -8Q-25 -23 -9 -8M7 -18Q22 -33 37 -18" fill="none"/><path d="M-36 15H-14M11 15H33" stroke="#fff9e9"/>',
 '<path d="M-40 -14H-7L0 -8L7 -14H40V15H7L0 8L-7 15H-40Z" fill="#b2d2d7"/><path d="M-28 -7H-15M17 -7H30"/>',
 '<circle r="30" fill="#fff9e9"/><path d="M0 0L17 -20M-19 -12L-15 -9M19 12L15 9"/>',
 '<path d="M-34 -21Q-34 -29 -25 -28H15Q23 -28 22 -20V-6H-8L-10 35Q-10 42 -17 42H-21Q-28 42 -26 34V-7H-34Z" fill="#84b49b"/><path d="M22 -21H43M-22 30H-12"/>',
 '<path d="M-9 40V-8Q-34 -15 -25 -40L-9 -25L8 -40Q27 -19 9 -8V40Z" fill="#9ebdc0"/>',
 '<path d="M-52 22H52V36H-52ZM-28 -31H-10V8H-28ZM15 -31H34V8H15ZM-35 -17H42V0H-35Z" fill="#8b9290"/><path d="M0 8V22M-40 8H45M43 -8V19"/>',
 '<path d="M-17 -40H17V-4H-17Z" fill="#e7bd78"/><path d="M-12 -4H12V39Q0 49 -12 39Z" fill="#bc9972"/><path d="M-10 -32V-8M0 -32V-8M10 -32V-8"/>',
 '<path d="M-32 -35H25V-18H-16V25H25V41H-32ZM8 -25V31M-3 30H19" fill="#c78b89"/>',
 '<path d="M-48 -23Q0 -30 48 -23V31Q0 38 -48 31Z" fill="#c78b89"/><path d="M-49 -14H49M-18 -27V-42H18V-27" fill="none"/><path d="M-9 -7H9V9H-9Z" fill="#e7bd78"/>',
 '<path d="M-45 -31L45 -26V32L-45 37Z" fill="#dfbf94"/><path d="M-45 -9L45 -5M-45 13L45 16M-34 -30V35M34 -26V33M-43 -25L40 28" fill="none" stroke-width="2"/>',
 '<path d="M-40 -33Q-29 -37 -17 -33V4Q-1 10 -4 30H-48V18Q-47 10 -40 5ZM15 -33Q26 -37 38 -33V4Q53 11 49 30H6V18Q6 10 15 5Z" fill="#bc9972"/><path d="M-37 -20H-21M-37 -11H-21M18 -20H34M18 -11H34M-47 23H-5M7 23H48" fill="none" stroke-width="2"/>'
]};
rooms.observatory={title:'Observatory',wall:'#e5e2f0',floor:'#bac4d4',
 names:['moon chart','star map','lunar samples','hanging planet','orbital clock','telescope','tripod lever','solar system model','logbook','planet globe','instrument case','control panel','compass'],
 props:[
 '<circle r="35" fill="#fff9e9"/><path d="M0 -27A29 29 0 1 0 0 27Z" fill="#9b8bbc"/><circle cx="-13" cy="-9" r="5" fill="#b2d2d7"/>',
 '<rect x="-41" y="-40" width="82" height="80" rx="6" fill="#9b8bbc"/><path d="M-24 18L-9 -20L14 8L30 -22" fill="none" stroke="#fff9e9"/><g fill="#fff9e9" stroke="none"><circle cx="-24" cy="18" r="3"/><circle cx="-9" cy="-20" r="3"/><circle cx="14" cy="8" r="3"/><circle cx="30" cy="-22" r="3"/><circle cx="-27" cy="-25" r="1.8"/><circle cx="20" cy="28" r="1.8"/></g>',
 '<path d="M-50 25H50V34H-50Z" fill="#bc9972"/><path d="M-43 24L-39 -7L-27 -18L-15 -9L-11 24ZM-2 24L3 -20L20 -26L34 -12L42 24Z" fill="#b2d2d7"/><path d="M-36 0L-24 12M10 -10L26 12M-5 30H7" fill="none"/>',
 '<path d="M0 -46V-28"/><circle r="27" fill="#e7bd78"/><ellipse rx="45" ry="9" fill="none" transform="rotate(-20)"/>',
 rooms.workshop.props[4],
 '<path d="M-38 -25L19 -43L31 -9L-26 10Z" fill="#b2d2d7"/><path d="M-40 -29L-27 14M18 -45L33 -6M0 0V40M0 13L-28 44M0 13L28 44"/>',
 '<path d="M0 -30V37M-25 39H25M0 -14L27 -28" fill="none"/><circle cx="29" cy="-30" r="9" fill="#e7bd78"/>',
 '<ellipse rx="57" ry="20" fill="none"/><circle r="19" fill="#e7bd78"/><circle cx="-47" cy="-10" r="9" fill="#b2d2d7"/><circle cx="41" cy="13" r="12" fill="#c78b89"/>',
 '<path d="M-37 -33Q-9 -40 0 -28Q20 -40 37 -32V37Q17 29 0 41Q-18 29 -37 36Z" fill="#fff9e9"/><path d="M0 -28V40M-27 -13H-9M9 -13H27M-27 -2H-9M9 -2H27M-27 10H-9M9 10H27" fill="none" stroke-width="1.6"/>',
 '<circle r="33" fill="#9b8bbc"/><ellipse rx="14" ry="33" fill="none"/><path d="M-32 0H32M0 33V43M-22 44H22"/>',
 '<path d="M-49 -28Q0 -34 49 -28V31H-49Z" fill="#9ebdc0"/><path d="M-49 -16H49M-24 -27V30M24 -27V30M-15 -30V-40H15V-30" fill="none"/><path d="M-32 -6H-18V9H-32ZM18 -6H32V9H18Z" fill="#e7bd78"/>',
 '<rect x="-52" y="-29" width="104" height="60" rx="7" fill="#9ebdc0"/><circle cx="-28" r="12" fill="#fff9e9"/><circle cx="4" r="12" fill="#e7bd78"/><path d="M30 -15V17M40 -15V17"/>',
 '<circle r="33" fill="#e7bd78"/><path d="M0 -26L14 0L0 26L-14 0Z" fill="#9b8bbc"/>'
]};

const propDetails = {
 garage:[
  '<path d="M0 -27V-23M-27 0H-23M23 0H27" fill="none" stroke-width="1.2"/>',
  '<circle cx="-52" cy="-16" r="1.5"/><circle cx="52" cy="-16" r="1.5"/>',
  '<path d="M-34 29H-13M8 29H31" fill="none" stroke-width="1.1"/>',
  '<path d="M-28 28L-20 28M20 -28H28" fill="none" stroke-width="1.2"/>',
  '<path d="M-23 19L0 -23L23 19" fill="none" stroke-width="1"/>',
  '<path d="M-45 -48H44M-45 -10H44M-45 30H44" fill="none" stroke-width="1.1"/>',
  '<path d="M-3 -13V30" fill="none" stroke="#fff9e9" stroke-width="1.2"/>',
  '<path d="M-25 -35L-5 -42M27 -38L45 -41M-39 -18L-18 -38M18 -19L39 -40M-40 26H42" fill="none" stroke="#fff9e9" stroke-width="1.2"/>',
  '<path d="M-33 25H33M-35 5V19M35 5V19" fill="none" stroke-width="1.2"/>',
  '<path d="M-10 -25H10V-11H-10ZM-19 32H-8M8 32H19" fill="none" stroke-width="1.1"/>',
  '<ellipse rx="44" ry="33" fill="none" stroke-width="1"/>',
  '<path d="M-48 16H48" fill="none" stroke-width="1"/>',
  '<path d="M-28 13V29M26 -10V17" fill="none" stroke="#fff9e9" stroke-width="1.4"/>'
 ],
 music:[
  '<path d="M-21 31L-10 -31H10M-8 24H12M-8 16H10M-8 8H8" fill="none" stroke-width="1.2"/>',
  '<path d="M-31 -33H31V31M-26 25H25" fill="none" stroke-width="1"/>',
  '<circle r="27" fill="none" stroke-width="1"/><path d="M-9 -32H9M-9 32H9" stroke-width="3"/>',
  '<circle r="30" fill="none" stroke-width="1"/><circle r="17" fill="none" stroke-width="1"/><circle r="3" fill="#fff9e9" stroke="none"/>',
  '<path d="M-23 -22Q0 -43 23 -22M-31 4V22M31 4V22" fill="none" stroke="#fff9e9" stroke-width="1.5"/>',
  '<path d="M-3 -38V36M3 -38V36M-7 -30H7M-7 -19H7M-7 -8H7M-22 16Q-31 35 -13 41" fill="none" stroke-width="1"/>',
  '<path d="M-8 -36V-9M-13 -20H13M-10 -29H10M0 9L4 36" fill="none" stroke-width="1"/>',
  '<path d="M-51 21H50M-51 27H50" fill="none" stroke-width="1"/>',
  '<path d="M30 -12V20M-32 12H17M-13 -18V7M1 -18V7" fill="none" stroke="#fff9e9" stroke-width="1.2"/>',
  '<path d="M-3 -36V34M3 -36V34M-13 0Q-19 7 -11 15M13 0Q19 7 11 15" fill="none" stroke-width="1"/>',
  '<path d="M-34 -13H34V28H-34ZM-30 -28H-26M-16 -28H-12M-2 -28H2M12 -28H16M26 -28H30" fill="none" stroke-width="1.4"/><path d="M-28 -8L27 24M-28 5L7 26M-7 -10L28 10" fill="none" stroke-width="1" opacity=".4"/>',
  '<path d="M-30 -19Q0 -29 30 -19M-30 -13L-12 25L10 -8L30 22" fill="none" stroke-width="1.4"/>',
  '<path d="M-40 -18V24M-32 23H32M-26 -35H-13M4 -38H23" fill="none" stroke-width="1.3"/>'
 ]
};
propDetails.workshop = [
 propDetails.garage[0], '<path d="M-37 -30H-26M-37 -25H-30M-37 -20H-26" fill="none" stroke-width="1"/>',
 '<path d="M-35 22H-15M12 22H32M-37 -16Q-29 -21 -16 -16M10 -27Q20 -32 33 -27" fill="none" stroke-width="1.2"/>',
 '<path d="M-32 -7H-16M16 -7H32M-38 9H-12M12 9H38" fill="none" stroke="#fff9e9" stroke-width="1.3"/>',
 '<path d="M0 -24V-21M-24 0H-21M24 0H21M-17 -17L-15 -15M17 -17L15 -15" fill="none" stroke-width="1.2"/>',
 '<path d="M-28 -22H13M-20 2H-12M-20 11H-12M-20 20H-12M28 -21L31 -26M34 -21L37 -26" fill="none" stroke-width="1.3"/>',
 '<path d="M-3 30V-6M-17 -27L-12 -19" fill="none" stroke="#fff9e9" stroke-width="1.4"/>',
 '<path d="M-48 27H46M-30 -25H-10M17 -25H33M-24 -12H-16M21 -12H28" fill="none" stroke="#fff9e9" stroke-width="1.1"/>',
 '<path d="M-10 -34V-8M0 -34V-8M10 -34V-8M-6 5V31M5 5V31" fill="none" stroke-width="1.1"/>',
 '<path d="M-26 -28V33M-26 34H18M8 -18V24" fill="none" stroke="#fff9e9" stroke-width="1.2"/>',
 '<path d="M-38 -5V24M38 -5V24M-31 22H-14M15 22H31" fill="none" stroke-width="1.3"/>',
 '<path d="M-25 -24L-9 -22M3 -21L25 -19M-26 5L-4 6M10 27L25 28M-26 29L-14 30" fill="none" stroke-width="1.1"/>',
 '<path d="M-41 -17V1M19 -17V1M-35 6H-22M22 6H35" fill="none" stroke-width="1.3"/>'
];
propDetails.observatory = [
 '<circle cx="-16" cy="14" r="6" fill="none" stroke-width="1.3"/><circle cx="-6" cy="-23" r="3" fill="none" stroke-width="1"/>',
 '<path d="M-31 -30L-24 -28M-9 -20H-5M12 8H17M28 -22H33M-30 26H-7" stroke="#fff9e9" stroke-width="1.4"/>',
 '<path d="M-31 -5L-23 7L-27 20M13 -18L18 0L31 14M-41 29H-22M16 29H35" fill="none" stroke-width="1.1"/>',
 '<path d="M-18 -19Q-5 -11 11 -17M-23 -6Q-3 2 22 -7M-17 17Q0 22 17 14" fill="none" stroke-width="1"/>',
 propDetails.workshop[4],
 '<path d="M-29 -23L17 -38M-24 2L22 -12M-33 -22L-26 -3M23 -34L29 -16" fill="none" stroke="#fff9e9" stroke-width="1.3"/>',
 '<path d="M3 16L6 32M-15 39H15" fill="none" stroke-width="1.1"/>',
 '<ellipse rx="45" ry="13" fill="none" stroke-width="1"/><path d="M-9 -12Q-3 -17 4 -15M34 12H44" fill="none" stroke="#fff9e9" stroke-width="1.3"/>',
 '<path d="M-30 29L-12 26M12 27L28 30" fill="none" stroke-width="1"/>',
 '<ellipse rx="25" ry="33" fill="none" stroke-width="1"/><path d="M-26 -16H26M-27 15H27" fill="none" stroke-width="1"/>',
 propDetails.workshop[10],
 '<path d="M-43 -21H44V23H-43ZM-27 -7V1M4 -7L10 -2M29 21H43" fill="none" stroke-width="1.2"/>',
 '<circle r="27" fill="none" stroke-width="1"/><path d="M0 -29V-25M-29 0H-25M29 0H25M0 25V29M0 -19V19" fill="none" stroke-width="1.4"/>'
];

function scenery(scene){
 if(scene==='garage')return `
  <path d="M255 23Q430 13 606 23V263H255Z" fill="#c5d9d5"/>
  <path d="M247 20H616V269H247M263 30H600V256H263" fill="none" stroke="#7fa6aa" stroke-width="6"/>
  <g fill="none" stroke="#7fa6aa" stroke-width="1.7">${Array.from({length:8},(_,i)=>`<path d="M264 ${47+i*27}H599"/>`).join('')}</g>
  <path d="M395 239H451V248H395Z" fill="#9ebdc0"/>
  <path d="M12 221H132V234H12ZM27 235V250L42 235M117 235V250L102 235" fill="#bc9972"/>
  <path d="M592 264H707V278H592ZM607 279V300M693 279V300" fill="#bc9972"/>
  <path d="M711 301H748V310H711ZM730 310V321Q730 327 737 324" fill="#bc9972"/>
  <path d="M195 121H226V130H195ZM210 130V136" fill="#bc9972"/>
  <path d="M704 20H716V39H704ZM59 26L75 17L91 26M199 42L210 32L221 42" fill="none" stroke-width="1.6"/>
  <path d="M35 405Q421 384 766 405V512H35Z" fill="#c4c6c5"/>
  <path d="M47 414Q420 395 753 414M47 501H751" fill="none" stroke-width="1.2" stroke-dasharray="4 5"/>
  <path d="M17 388H183M642 388H787" fill="none" stroke="#956e54" stroke-width="3"/>
  <g fill="#365650" stroke="none" opacity=".12"><ellipse cx="420" cy="413" rx="165" ry="14"/><ellipse cx="100" cy="511" rx="62" ry="7"/><ellipse cx="600" cy="511" rx="40" ry="6"/></g>
 `;
 if(scene==='music')return `
  <path d="M0 188Q400 180 800 188V397H0Z" fill="#ded4e7"/>
  <path d="M14 192V393M785 192V393M16 389H783" fill="none" stroke="#9b8bbc" stroke-width="4"/>
  <g transform="translate(35 0)">
  <path d="M253 312V197Q253 180 270 181Q410 170 546 181Q563 180 563 197V312Z" fill="#bc9972"/>
  <path d="M268 265V207Q268 193 282 193Q410 184 535 193Q549 193 549 207V265Z" fill="#dfbf94"/>
  <path d="M272 207Q410 199 544 207M272 215Q410 207 544 215" fill="none" stroke-width="1.3"/>
  <path d="M264 351H553V374H264ZM278 375L268 420M539 375L550 420" fill="#956e54"/>
  <path d="M320 391Q411 380 499 391V410H320ZM336 409V430M485 409V430" fill="#9b8bbc"/>
  <path d="M244 320H568V333H244ZM266 334V353M548 334V353" fill="#dfbf94"/>
  </g>
  <path d="M24 24Q66 5 112 24L104 162Q65 152 27 166ZM664 22Q722 5 778 24L770 179Q726 158 674 179Z" fill="#c78b89"/>
  <g fill="none" stroke-width="1.3"><path d="M35 32L39 155M52 27L55 155M90 29L89 150M682 32L690 161M701 28L710 156M754 28L750 164M278 361H536M277 229H538M277 242H538M295 337V348M526 337V348M339 396Q411 388 482 396M355 404H470"/></g>

  <path d="M553 241H666V251H553ZM563 251V264L577 251M654 251V264L640 251" fill="#bc9972"/>
  <path d="M675 137Q720 127 768 137V148H675ZM690 149V159M753 149V159" fill="#bc9972"/>
  <path d="M718 146V153Q718 161 725 159" fill="none" stroke="#956e54" stroke-width="3"/>
  <path d="M49 89L65 78L81 89M578 51L590 39L602 51" fill="none" stroke-width="1.4"/>
  <path transform="translate(35 0)" d="M270 330V407M546 330V407" fill="none" stroke="#956e54" stroke-width="7"/>
  <path d="M54 398Q410 370 764 402L744 493Q410 514 46 490Z" fill="#e7bd78"/>
  <path d="M62 407Q412 382 750 410L733 482Q409 502 58 480Z" fill="none" stroke-width="1.3" stroke-dasharray="3 5"/>
  <path d="M84 387Q100 400 117 387M100 399V424M79 426L100 420L122 426M715 382Q730 399 745 382M730 397V425M710 429L730 421L751 429" fill="none" stroke="#956e54" stroke-width="4"/>
 `;
 if(scene==='workshop')return `
  <path d="M26 25Q398 12 774 25V205Q399 213 26 205Z" fill="#dfbf94"/>
  <g fill="#956e54" stroke="none">${Array.from({length:10},(_,row)=>Array.from({length:27},(_,column)=>`<circle cx="${41+column*27}" cy="${34+row*18}" r="1.1"/>`).join('')).join('')}</g>
  <path d="M321 175H468V188H321ZM332 190V210M458 190V210" fill="#bc9972"/>
  <path d="M37 339Q400 326 765 339Q777 350 765 364Q400 353 37 364Q26 351 37 339Z" fill="#bc9972"/>
  <path d="M56 364L49 452H70L83 365M717 364L730 452H751L743 364" fill="#956e54"/>
  <path d="M281 366H511V410H281Z" fill="#dfbf94"/>
  <path d="M290 374H502V400H290ZM379 386H414" fill="none" stroke-width="1.8"/>
  <path d="M83 410H279M518 410H721" fill="none" stroke="#bc9972" stroke-width="12"/>
  <g fill="none" stroke-width="1.3"><path d="M50 347Q280 337 391 345Q565 336 748 347M67 375L60 436M735 376L741 437M321 182H458M114 350l51 -2M554 348l91 -1M95 344q11 -6 23 0q-9 7 -17 2M659 348q14 -6 23 -1q-13 5 -23 1M295 392l35 -2M470 379l20 1"/></g>
  <path d="M570 88V67Q570 59 578 63M240 222V198Q240 188 248 193M560 209V187Q560 179 568 183M710 251V229Q710 219 718 224" fill="none" stroke="#956e54" stroke-width="3"/>
  <circle cx="80" cy="62" r="4" fill="#956e54"/>
  <path d="M212 53L220 44L229 53" fill="none" stroke-width="1.4"/>
  <path d="M665 145H775V156H665ZM678 157V171L692 157M762 157V171L748 157" fill="#bc9972"/>
  <path d="M708 128L696 145H744L732 128" fill="none"/><path d="M690 144H750V152H690Z" fill="#bc9972"/>
  <path d="M390 341V354M409 341V354" fill="none" stroke-width="2"/>
 `;
 return `
  <path d="M0 141Q18 6 400 2Q782 6 800 141V385H0Z" fill="#ded4ee"/>
  <path d="M0 141Q18 6 400 2Q782 6 800 141M25 143Q45 23 400 18Q755 23 775 143" fill="none" stroke="#9b8bbc" stroke-width="5"/>
  <path d="M280 20Q400 0 510 21V191H280Z" fill="#737caa"/>
  <path d="M286 28Q400 8 504 28V183H286ZM394 17V182M282 84H508" fill="none" stroke="#fff9e9" stroke-width="2"/>
  <g fill="#fff9e9" stroke="none"><circle cx="305" cy="58" r="2"/><circle cx="361" cy="45" r="3"/><circle cx="425" cy="66" r="2"/><circle cx="470" cy="42" r="2"/><circle cx="449" cy="111" r="3"/><circle cx="328" cy="126" r="2"/><circle cx="488" cy="154" r="2"/></g>
  <path d="M318 197H461V209H318ZM334 210V223M450 210V223" fill="#bc9972"/>
  <path d="M355 345Q555 327 781 345V366H355Z" fill="#9ebdc0"/>
  <path d="M375 366V410H394V366M742 366V410H761V366" fill="#7fa6aa"/>
  <path d="M627 386H707V404H627ZM637 404L629 443M698 404L706 443" fill="#9b8bbc"/>
  <path d="M53 432Q400 402 753 432L733 509H68Z" fill="#b2d2d7"/>
  <path d="M71 442Q398 417 736 441M84 499Q400 478 721 497" fill="none" stroke-width="1.3"/>
  <path d="M38 406L220 401M347 355Q551 338 768 354M638 394H697" fill="none" stroke-width="1.5"/>
  <path d="M535 25L560 40M560 10V40" fill="none" stroke="#956e54" stroke-width="2"/>
  <path d="M686 145H754V154H686ZM701 154L710 166H730L739 154" fill="#bc9972"/>
  <path d="M559 325Q610 315 662 325V336H559ZM570 337V400M651 337V400" fill="#bc9972"/>
  <path d="M447 319V335M475 319V335M433 335H489" fill="none" stroke="#956e54" stroke-width="4"/>
  <path d="M707 375H743V387H707ZM719 387V399M734 387V399" fill="#bc9972"/>
  <path d="M269 382H301V399H269ZM276 400V413M294 400V413" fill="#7fa6aa"/>
  <path d="M60 56L70 44L80 56M210 62L220 51L230 62" fill="none" stroke-width="1.4"/>
 `;
}
// Baselines keep each changed prop in contact with its shelf, stand or floor.
const supportAnchors = {
 garage:[null,null,37,null,null,86,-43,53,32,-43,38,31,39],
 music:[37,38,null,null,null,49,44,31,29,44,35,32,32],
 workshop:[null,null,29,null,null,42,null,36,null,41,35,37,30],
 observatory:[null,null,34,null,null,44,39,null,41,44,31,31,null]
};
function variantTransform(scene,index,changed){
 if(!changed)return '';
 if(scene==='garage')return '';
 const anchor=supportAnchors[scene][index];
 if(index%3===0)return 'translate(7 0)';
 if(index%3===1)return anchor===null?'scale(.77)':`translate(0 ${anchor}) scale(.77) translate(0 ${-anchor})`;
 return anchor===null?'rotate(15)':`rotate(15 0 ${anchor})`;
}
// Garage discoveries change the object itself, with no transform-only answers.
function garageVariant(index,art){
 const additions=[
  '',
  '<path d="M-46 -12H46V14H-46Z" fill="#e7bd78" stroke="none"/><text x="0" y="10" text-anchor="middle" font-family="Arial,sans-serif" font-size="27" font-weight="bold" fill="#365650" stroke="none">702</text>',
  '<path d="M-35 0H-12V20H-35ZM7 -10H32V17H7Z" fill="#fff9e9"/><circle cx="-23" cy="10" r="8" fill="#365650"/><circle cx="20" cy="4" r="9" fill="#365650"/>',
  '<path d="M-24 -24L24 24M24 -24L-24 24" stroke="#e7bd78" stroke-width="8"/>',
  '<path d="M-15 -15H15V20H-15Z" fill="#e7bd78" stroke="none"/><path d="M-14 -3H14M-14 9H14" stroke-width="5"/>',
  '<path d="M-51 -53H51V17H-51Z" fill="#c5d9d5"/><path d="M0 -53V17M-13 -32V-6M13 -32V-6" fill="none" stroke-width="4"/>',
  '<path d="M-22 -16H22V11H-22Z" fill="#e7bd78"/><circle r="6" fill="#fff9e9"/>',
  '<path d="M-20 -45H-4V27H-20Z" fill="#fff9e9" stroke="none"/><path d="M26 -44H41V27H26Z" fill="#fff9e9" stroke="none"/>',
  '<path d="M-27 -21H27V28H-27Z" fill="#9b8bbc" stroke="none"/><circle cy="4" r="19" fill="#e7bd78"/><path d="M-10 4H10M0 -6V14" stroke-width="4"/>',
  '<path d="M-12 -30H12V-7H-12Z" fill="#88a3b5" stroke="none"/><path d="M-21 -14H21M-21 -3H21M-17 8H17" fill="none" stroke-width="5"/>',
  '<ellipse rx="34" ry="25" fill="#8b9290"/><circle r="8" fill="#fff9e9"/>',
  '<path d="M-50 -12H49V12H-50Z" fill="#c78b89"/><circle cx="-30" r="9" fill="#fff9e9"/><circle r="9" fill="#fff9e9"/><circle cx="30" r="9" fill="#fff9e9"/>',
  '<path d="M-26 -11H26V31H-26Z" fill="#e7bd78" stroke="none"/><circle cy="10" r="20" fill="#fff9e9"/><path d="M0 -4Q-19 14 0 24Q19 14 0 -4Z" fill="#365650" stroke="none"/>'
 ];
 if(index===0)return '<rect x="-35" y="-27" width="70" height="54" rx="9" fill="#dfbf94"/><rect x="-28" y="-19" width="56" height="33" rx="3" fill="#fff9e9" stroke-width="2"/><text x="0" y="5" text-anchor="middle" font-family="monospace" font-size="20" font-weight="bold" fill="#365650" stroke="none">8:30</text><circle cx="-10" cy="21" r="2"/><circle cx="10" cy="21" r="2"/>';
 return art+additions[index];
}
export function finalRoomObjects(scene){
 return Object.fromEntries(extraKeys.map((key,i)=>{
  const [x,y,w,h]=layouts[scene][i];
  return [key,{name:rooms[scene].names[i],x,y,w,h}];
 }));
}
export function finalRoom(s){
 const room=rooms[s.scene];
 const props=room.props.map((art,i)=>{
  const [x,y,,,scale]=layouts[s.scene][i];
  const changed=s[extraKeys[i]];
  const transform=variantTransform(s.scene,i,changed);
  const detail=s.scene==='garage'&&changed&&i===0?'':propDetails[s.scene][i];
  const variant=s.scene==='garage'&&changed?garageVariant(i,art):art;
  return `<g transform="translate(${x} ${y}) scale(${scale})"><g transform="${transform}">${variant}<g fill="none" stroke-width="1.3">${detail}</g></g></g>`;
 }).join('');
 return `<svg class="room-art" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustrated ${room.title}">
 <rect width="800" height="520" fill="${room.wall}"/>
 <path d="M0 396Q400 384 800 396V520H0Z" fill="${room.floor}"/>
 <g fill="none" stroke="#956e54" stroke-width="1.3"><path d="M0 440H800M0 499H800M100 396L65 520M300 392L280 520M500 392L520 520M700 396L735 520"/></g>
 <g fill="none" stroke="#365650" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
 ${scenery(s.scene)}
 <g fill="#365650" opacity=".10" stroke="none">${[150,400,650].map(x=>`<ellipse cx="${x}" cy="491" rx="64" ry="9"/>`).join('')}</g>
 ${props}
 </g></svg>`;
}
