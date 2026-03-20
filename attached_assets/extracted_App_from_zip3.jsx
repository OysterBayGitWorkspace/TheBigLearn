import { useState, useEffect, useCallback, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// TERMY — The Addictive VC Terms Training Game
// German / DACH Venture Capital Market
// Visual: Warm Hand-drawn SVG · Duolingo-level Addiction
// ═══════════════════════════════════════════════════════════════

const Icons = {
  lightning: (color = "#FF7B54", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M18 4L7 18h7l-2 10 11-14h-7l2-10z" fill={color} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  book: (color = "#5BB5A2", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M5 6c0-1 .8-2 2-2h5c2 0 4 1.5 4 3v18c0-1-1.5-2-3-2H7c-1.2 0-2-1-2-2V6z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M27 6c0-1-.8-2-2-2h-5c-2 0-4 1.5-4 3v18c0-1 1.5-2 3-2h5c1.2 0 2-1 2-2V6z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>),
  trophy: (color = "#F4D06F", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M10 6h12v8c0 4-2.5 7-6 7s-6-3-6-7V6z" fill={color} opacity="0.25" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M10 9H7c0 3 1.5 5 3 5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M22 9h3c0 3-1.5 5-3 5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M13 25h6M16 21v4" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>),
  target: (color = "#FF7B54", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="10" stroke={color} strokeWidth="1.8" opacity="0.3"/><circle cx="16" cy="16" r="6" stroke={color} strokeWidth="1.8" opacity="0.5"/><circle cx="16" cy="16" r="2.5" fill={color}/></svg>),
  fire: (color = "#FF7B54", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M16 4c0 4-5 7-5 13a7 7 0 0014 0c0-3-2-5-3-7-1 2-2 3-3 3s-2-2-2-4c0-1.5-.5-3.5-1-5z" fill={color} opacity="0.25" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  sparkle: (color = "#B8A0D2", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M16 4l2.5 8.5L27 16l-8.5 2.5L16 28l-2.5-9.5L5 16l8.5-3.5L16 4z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/></svg>),
  dice: (color = "#B8A0D2", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><rect x="5" y="5" width="22" height="22" rx="4" fill={color} opacity="0.2" stroke={color} strokeWidth="1.8"/><circle cx="11" cy="11" r="1.8" fill={color}/><circle cx="21" cy="11" r="1.8" fill={color}/><circle cx="16" cy="16" r="1.8" fill={color}/><circle cx="11" cy="21" r="1.8" fill={color}/><circle cx="21" cy="21" r="1.8" fill={color}/></svg>),
  sword: (color = "#FF7B54", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M22 4l-12 12M10 16l-3 3 2 2 3-3M22 4l2 6-4 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 18l-2 2" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></svg>),
  check: (color = "#5BB5A2", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" fill={color} opacity="0.15"/><path d="M10 16.5l4 4 8-8.5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  cross: (color = "#E8626C", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="12" fill={color} opacity="0.15"/><path d="M11 11l10 10M21 11l-10 10" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></svg>),
  arrowLeft: (color = "#8C8C8C", size = 22) => (<svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  crown: (color = "#F4D06F", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M5 22l3-12 4 5 4-8 4 8 4-5 3 12H5z" fill={color} opacity="0.3" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/></svg>),
  flag: (color = "#5BB5A2", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M8 4v24" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M8 6c4-2 8 2 12 0 2-1 4 0 4 0v12c0 0-2-1-4 0-4 2-8-2-12 0V6z" fill={color} opacity="0.25" stroke={color} strokeWidth="1.5"/></svg>),
  money: (color = "#FF7B54", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="11" fill={color} opacity="0.15" stroke={color} strokeWidth="1.8"/><path d="M16 9v14M12 13c0-1.5 1.5-2.5 4-2.5s4 1 4 2.5-1.5 2.5-4 3-4 1.5-4 3 1.5 2.5 4 2.5 4-1 4-2.5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>),
  shield: (color = "#5BB5A2", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M16 4l10 4v8c0 6-4 10-10 12-6-2-10-6-10-12V8l10-4z" fill={color} opacity="0.15" stroke={color} strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 16l3 3 5-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  people: (color = "#B8A0D2", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><circle cx="12" cy="10" r="4" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5"/><circle cx="22" cy="10" r="3" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5"/><path d="M4 26c0-4 3.5-7 8-7s8 3 8 7" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M21 19c3 0 6 2 6 5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>),
  door: (color = "#E8626C", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><rect x="8" y="4" width="14" height="24" rx="2" fill={color} opacity="0.12" stroke={color} strokeWidth="1.8"/><circle cx="19" cy="16" r="1.5" fill={color}/><path d="M8 28h16" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>),
  loop: (color = "#5BB5A2", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M22 12a7 7 0 11-2-4" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M22 6v6h-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
  scale: (color = "#F4D06F", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M16 4v22M6 10l10-2 10 2" stroke={color} strokeWidth="2" strokeLinecap="round"/><path d="M3 16c0 3 1.5 5 3 5s3-2 3-5l-3-6-3 6zM23 16c0 3 1.5 5 3 5s3-2 3-5l-3-6-3 6z" fill={color} opacity="0.2" stroke={color} strokeWidth="1.5"/></svg>),
  chart: (color = "#FF7B54", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M4 26h24M8 20v4M14 14v10M20 10v14M26 6v18" stroke={color} strokeWidth="2.5" strokeLinecap="round"/></svg>),
  brain: (color = "#B8A0D2", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><path d="M16 28V16" stroke={color} strokeWidth="1.8" strokeLinecap="round"/><path d="M11 8c-3 0-5 2-5 5 0 2 1 3 2 4-1 1-1.5 3-.5 5 1 2 3 2 4.5 1.5" fill={color} opacity="0.12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 8c3 0 5 2 5 5 0 2-1 3-2 4 1 1 1.5 3 .5 5-1 2-3 2-4.5 1.5" fill={color} opacity="0.12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 6a4 4 0 018 0" stroke={color} strokeWidth="1.5" strokeLinecap="round"/></svg>),
  pie: (color = "#5BB5A2", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="10" fill={color} opacity="0.12" stroke={color} strokeWidth="1.8"/><path d="M16 6v10l8.66 5" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>),
  deFlag: (size = 20) => (<svg width={size} height={size * 0.7} viewBox="0 0 30 21"><rect y="0" width="30" height="7" rx="1" fill="#2D2D2D"/><rect y="7" width="30" height="7" fill="#E8626C"/><rect y="14" width="30" height="7" rx="1" fill="#F4D06F"/></svg>),
  chest: (color = "#F4D06F", size = 28) => (<svg width={size} height={size} viewBox="0 0 32 32" fill="none"><rect x="5" y="14" width="22" height="12" rx="2" fill={color} opacity="0.3" stroke={color} strokeWidth="1.5"/><path d="M5 14c0-1 0-8 11-8s11 7 11 8" stroke={color} strokeWidth="1.5" fill={color} opacity="0.15"/><rect x="13" y="12" width="6" height="6" rx="3" fill={color} stroke={color} strokeWidth="1"/><path d="M16 15v2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>),
};

const BabyOyster = ({ size = 40 }) => (<svg width={size} height={size} viewBox="0 0 140 140"><circle cx="70" cy="70" r="58" fill="#EDE8F5" stroke="#C4B8DE" strokeWidth="1"/><path d="M36 72 C36 92, 52 104, 70 104 C88 104, 104 92, 104 72Z" fill="#C8B8A0" stroke="#A09078" strokeWidth="1.2"/><path d="M38 72 C38 52, 52 40, 70 38 C88 40, 102 52, 102 72Z" fill="#D8CEB8" stroke="#A09078" strokeWidth="1.2" transform="rotate(-8,70,72)"/><circle cx="60" cy="68" r="5" fill="#fff"/><circle cx="80" cy="68" r="5" fill="#fff"/><circle cx="62" cy="69" r="2.5" fill="#3D3530"/><circle cx="82" cy="69" r="2.5" fill="#3D3530"/><circle cx="63" cy="68" r="1" fill="#fff"/><circle cx="83" cy="68" r="1" fill="#fff"/><circle cx="70" cy="82" r="4" fill="#F0EAE0" stroke="#D8D0C0" strokeWidth="0.8"/></svg>);
const SeaTurtle = ({ size = 40 }) => (<svg width={size} height={size} viewBox="0 0 140 140"><circle cx="70" cy="70" r="58" fill="#E0F2EC" stroke="#80C8A8" strokeWidth="1"/><ellipse cx="70" cy="74" rx="30" ry="22" fill="#6DB890" stroke="#4A9870" strokeWidth="1.2"/><ellipse cx="70" cy="68" rx="26" ry="20" fill="#88CCA8" stroke="#4A9870" strokeWidth="1.2"/><path d="M70 52 L80 58 L80 68 L70 74 L60 68 L60 58Z" fill="#A0DCC0" stroke="#6DB890" strokeWidth="0.8"/><ellipse cx="104" cy="72" rx="12" ry="9" fill="#7CC4A0" stroke="#4A9870" strokeWidth="1"/><circle cx="110" cy="70" r="3" fill="#fff"/><circle cx="111" cy="70" r="1.8" fill="#2D4A38"/><path d="M44 66 C36 58, 30 60, 32 68 C34 72, 40 72, 44 70" fill="#6DB890" stroke="#4A9870" strokeWidth="1"/></svg>);
const SeahorseKnight = ({ size = 40 }) => (<svg width={size} height={size} viewBox="0 0 140 140"><circle cx="70" cy="70" r="58" fill="#E8ECFA" stroke="#8898D4" strokeWidth="1"/><path d="M58 96 C54 88, 52 76, 54 64 C56 52, 62 44, 70 40 C78 44, 84 52, 84 64 C84 76, 80 88, 76 96Z" fill="#8898D4" stroke="#6878B8" strokeWidth="1.2"/><path d="M70 40 C72 36, 78 32, 86 30 C88 30, 88 34, 86 36" fill="#7888C8" stroke="#6878B8" strokeWidth="1"/><circle cx="72" cy="46" r="4" fill="#fff"/><circle cx="73" cy="46" r="2.2" fill="#2D304A"/><path d="M78 56 C86 52, 90 58, 86 64 C90 62, 92 68, 88 74" fill="#A0ACD8" stroke="#7888C8" strokeWidth="0.8"/></svg>);
const Griffin = ({ size = 40 }) => (<svg width={size} height={size} viewBox="0 0 140 140"><circle cx="70" cy="70" r="58" fill="#FFF4E4" stroke="#D4A860" strokeWidth="1"/><path d="M40 80 C36 76, 34 70, 38 66 C42 62, 54 60, 62 62 L82 62 C88 60, 96 62, 98 68 C100 74, 96 80, 90 84 L46 84Z" fill="#E0C080" stroke="#C4A060" strokeWidth="1.2"/><path d="M58 62 C52 48, 42 36, 32 30 C28 28, 26 32, 30 36 L44 58" fill="#F0DCA8" stroke="#D4A860" strokeWidth="1"/><path d="M78 62 C82 48, 90 36, 100 32 C104 30, 106 34, 102 38 L90 58" fill="#F0DCA8" stroke="#D4A860" strokeWidth="1"/><circle cx="70" cy="52" r="14" fill="#E8D098" stroke="#C4A060" strokeWidth="1.2"/><path d="M66 52 L58 54 L66 56Z" fill="#E89040"/><circle cx="76" cy="48" r="2" fill="#4A3820"/></svg>);
const Phoenix = ({ size = 40 }) => (<svg width={size} height={size} viewBox="0 0 140 140"><circle cx="70" cy="70" r="58" fill="#FDE8E8" stroke="#D86050" strokeWidth="1"/><path d="M44 86 C40 78, 42 66, 50 58 C58 50, 68 48, 76 52 C86 58, 90 70, 88 80 C86 88, 78 92, 70 92Z" fill="#E85848" stroke="#C83838" strokeWidth="1.2"/><path d="M56 86 C54 80, 54 72, 58 64 C62 58, 68 56, 72 58 C78 62, 80 70, 78 78Z" fill="#F4A040"/><path d="M50 62 C42 52, 30 42, 20 38 C16 37, 16 42, 20 44 L40 58" fill="#F08048" stroke="#D86040" strokeWidth="0.8"/><path d="M82 62 C88 52, 98 44, 108 40 C112 39, 114 44, 110 46 L92 58" fill="#F08048" stroke="#D86040" strokeWidth="0.8"/><circle cx="70" cy="48" r="12" fill="#E85040" stroke="#C83838" strokeWidth="1"/><circle cx="74" cy="46" r="3.5" fill="#fff"/><circle cx="75" cy="46" r="2" fill="#4A1810"/></svg>);
const Dragon = ({ size = 40 }) => (<svg width={size} height={size} viewBox="0 0 140 140" style={{ filter: 'drop-shadow(0 0 6px #F4A63A) drop-shadow(0 0 14px #E8593C)', animation: 'dragonGlow 2.5s ease-in-out infinite' }}><circle cx="70" cy="70" r="58" fill="#2A1A30" stroke="#8840A0" strokeWidth="1.5"/><path d="M50 88 C42 82, 40 72, 44 62 C48 52, 58 46, 70 44 C82 46, 92 52, 96 62 C100 72, 98 82, 90 88Z" fill="#5028A0" stroke="#7840C8" strokeWidth="1.2"/><path d="M54 48 C50 40, 50 32, 56 28 C62 24, 78 24, 84 28 C90 32, 90 40, 86 48Z" fill="#5828A8" stroke="#7840C8" strokeWidth="1.2"/><path d="M58 30 C54 22, 50 14, 48 10" stroke="#C8A040" strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M82 30 C86 22, 90 14, 92 10" stroke="#C8A040" strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M60 38 L68 34 L68 42Z" fill="#F9D054"/><circle cx="66" cy="38" r="2.2" fill="#E85040"/><path d="M80 38 L72 34 L72 42Z" fill="#F9D054"/><circle cx="74" cy="38" r="2.2" fill="#E85040"/><path d="M56 46 C48 42, 38 44, 30 50 C26 54, 28 58, 34 56" fill="#F4A040" stroke="#E88030" strokeWidth="0.6" opacity="0.85"/><path d="M90 88 C100 92, 108 88, 112 82 C116 76, 118 72, 122 74" fill="none" stroke="#5028A0" strokeWidth="3" strokeLinecap="round"/><path d="M122 74 L126 68 L120 72 L126 78Z" fill="#E85040"/></svg>);
const RANK_ICONS = { 'Intern': BabyOyster, 'Analyst': SeaTurtle, 'Associate': SeahorseKnight, 'Vice President': Griffin, 'Partner': Phoenix, 'Managing Partner': Dragon };

const StickerFirstWin = ({ size = 80 }) => (<svg width={size} height={size} viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#E8F5E0" stroke="#7CB868" strokeWidth="1.5"/><path d="M50 75 L50 45" stroke="#5D8C4A" strokeWidth="3.5" strokeLinecap="round"/><path d="M50 55 C40 45, 28 38, 22 28" stroke="#7CB868" strokeWidth="2.5" strokeLinecap="round" fill="none"/><ellipse cx="18" cy="24" rx="10" ry="14" fill="#A8D88E" transform="rotate(-25,18,24)"/><path d="M50 48 C58 40, 68 35, 76 26" stroke="#7CB868" strokeWidth="2.5" strokeLinecap="round" fill="none"/><ellipse cx="80" cy="22" rx="10" ry="14" fill="#C5E8A8" transform="rotate(20,80,22)"/></svg>);
const StickerOnFire = ({ size = 80 }) => (<svg width={size} height={size} viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#FFF0E5" stroke="#E8875C" strokeWidth="1.5"/><path d="M50 82 C30 72, 22 55, 26 40 C28 32, 34 28, 36 34 C36 24, 42 14, 50 10 C58 14, 64 24, 64 34 C66 28, 72 32, 74 40 C78 55, 70 72, 50 82Z" fill="#F4A63A"/><path d="M50 82 C36 74, 32 60, 36 48 C38 42, 42 40, 44 44 C44 36, 48 28, 50 24 C52 28, 56 36, 56 44 C58 40, 62 42, 64 48 C68 60, 64 74, 50 82Z" fill="#E8723A"/><path d="M50 82 C40 76, 38 66, 40 56 C42 50, 46 48, 48 52 C48 46, 50 40, 50 38 C50 40, 52 46, 52 52 C54 48, 58 50, 60 56 C62 66, 60 76, 50 82Z" fill="#F9CB5C"/></svg>);
const StickerUnstoppable = ({ size = 80 }) => (<svg width={size} height={size} viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#EDE8FE" stroke="#8B7ACC" strokeWidth="1.5"/><path d="M50 16 C50 16, 34 34, 34 58 L42 62 L50 66 L58 62 L66 58 C66 34, 50 16, 50 16Z" fill="#F0F0F0" stroke="#8B7ACC" strokeWidth="1.2"/><circle cx="50" cy="42" r="6" fill="#C5B8E8"/><path d="M42 62 C44 70, 48 78, 50 82 C52 78, 56 70, 58 62" fill="#F4A63A"/></svg>);
const StickerLegendary = ({ size = 80 }) => (<svg width={size} height={size} viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#FFF8E0" stroke="#D4A840" strokeWidth="1.5"/><path d="M50 14 L58 36 L82 36 L62 50 L70 74 L50 60 L30 74 L38 50 L18 36 L42 36Z" fill="#F9D054" stroke="#D4A840" strokeWidth="1"/><circle cx="42" cy="42" r="2.5" fill="#6B5A28"/><circle cx="58" cy="42" r="2.5" fill="#6B5A28"/><path d="M44 52 C46 56, 54 56, 56 52" stroke="#6B5A28" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>);
const StickerLiquidationLord = ({ size = 80 }) => (<svg width={size} height={size} viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#E6F5EE" stroke="#4AA87C" strokeWidth="1.5"/><path d="M30 50 C30 34, 38 26, 50 24 C62 26, 70 34, 70 50 C70 68, 62 78, 50 80Z" fill="#7CC8A0" stroke="#4AA87C" strokeWidth="1.2"/><text x="50" y="57" textAnchor="middle" fontFamily="inherit" fontSize="22" fontWeight="500" fill="#2D6E50">$</text></svg>);
const StickerDilutionShield = ({ size = 80 }) => (<svg width={size} height={size} viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#E6EFFA" stroke="#5A8EC4" strokeWidth="1.5"/><path d="M50 14 L74 26 L74 50 C74 68, 62 80, 50 86 C38 80, 26 68, 26 50 L26 26Z" fill="#7BAEE0" stroke="#5A8EC4" strokeWidth="1.5"/><path d="M44 48 L48 54 L58 40" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>);
const StickerVSOPVirtuoso = ({ size = 80 }) => (<svg width={size} height={size} viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#F5EEFA" stroke="#9B7CC4" strokeWidth="1.5"/><rect x="32" y="22" width="36" height="56" rx="3" fill="#F0E8F8" stroke="#9B7CC4" strokeWidth="1.2"/><line x1="38" y1="34" x2="62" y2="34" stroke="#C4B0DE" strokeWidth="1.5" strokeLinecap="round"/><line x1="38" y1="42" x2="58" y2="42" stroke="#C4B0DE" strokeWidth="1.5" strokeLinecap="round"/><line x1="38" y1="50" x2="56" y2="50" stroke="#C4B0DE" strokeWidth="1.5" strokeLinecap="round"/></svg>);
const StickerExitArtist = ({ size = 80 }) => (<svg width={size} height={size} viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#FFF0E8" stroke="#D08050" strokeWidth="1.5"/><rect x="32" y="24" width="30" height="54" rx="3" fill="#F4DCC8" stroke="#D08050" strokeWidth="1.2"/><circle cx="54" cy="52" r="2" fill="#D08050"/><path d="M62 24 L72 34 L72 78 L62 78Z" fill="#DEB898" stroke="#D08050" strokeWidth="1"/><path d="M66 40 L74 32" stroke="#F9D054" strokeWidth="1.5" strokeLinecap="round"/></svg>);
const StickerSpeedDemon = ({ size = 80 }) => (<svg width={size} height={size} viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#FFF8E0" stroke="#D4A840" strokeWidth="1.5"/><path d="M56 12 L32 46 L46 46 L42 88 L70 48 L54 48Z" fill="#F9D054" stroke="#D4A840" strokeWidth="1.2" strokeLinejoin="round"/></svg>);
const StickerScholar = ({ size = 80 }) => (<svg width={size} height={size} viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#F0EAE0" stroke="#A08868" strokeWidth="1.5"/><path d="M50 32 C40 28, 22 30, 20 34 L20 72 C22 68, 40 66, 50 70" fill="#F4E8D4" stroke="#A08868" strokeWidth="1.2"/><path d="M50 32 C60 28, 78 30, 80 34 L80 72 C78 68, 60 66, 50 70" fill="#EDE0CC" stroke="#A08868" strokeWidth="1.2"/><line x1="50" y1="32" x2="50" y2="70" stroke="#A08868" strokeWidth="1"/></svg>);
const StickerCenturion = ({ size = 80 }) => (<svg width={size} height={size} viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#FCEAEA" stroke="#D05858" strokeWidth="1.5"/><circle cx="50" cy="48" r="28" fill="#F0A0A0" stroke="#D05858" strokeWidth="1.5"/><circle cx="50" cy="48" r="22" fill="#F4C0C0"/><text x="50" y="54" textAnchor="middle" dominantBaseline="central" fontFamily="inherit" fontSize="18" fontWeight="500" fill="#8B2020">100</text></svg>);
const StickerPerfectionist = ({ size = 80 }) => (<svg width={size} height={size} viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="#E8F5F0" stroke="#50A888" strokeWidth="1.5"/><circle cx="50" cy="46" r="28" fill="#C0E8D8" stroke="#50A888" strokeWidth="1"/><circle cx="50" cy="46" r="20" fill="#E0F4EC" stroke="#50A888" strokeWidth="1"/><circle cx="50" cy="46" r="12" fill="#A0D8C0" stroke="#50A888" strokeWidth="1"/><circle cx="50" cy="46" r="4" fill="#50A888"/></svg>);

const ACHIEVEMENT_STICKERS = { first_blood: StickerFirstWin, streak_5: StickerOnFire, streak_10: StickerUnstoppable, streak_20: StickerLegendary, cat_master_lp: StickerLiquidationLord, cat_master_ad: StickerDilutionShield, cat_master_vsop: StickerVSOPVirtuoso, cat_master_exit: StickerExitArtist, speed_demon: StickerSpeedDemon, scholar: StickerScholar, centurion: StickerCenturion, perfectionist: StickerPerfectionist };
const CATEGORY_ICONS = { "Liquidation Preferences": Icons.money, "Anti-Dilution": Icons.shield, "ESOP & VSOP": Icons.people, "Exit & Transfer Rights": Icons.door, "Convertible Instruments": Icons.loop, "Governance & Control": Icons.scale, "Valuation & Economics": Icons.chart, "Pre-emption & Pro-rata": Icons.pie, "Advanced Scenarios": Icons.brain };

function StreakFire({ count }) {
  if (count <= 0) return <div style={{display:'flex',alignItems:'center',gap:4,opacity:.4}}>{Icons.fire("#B2BEC3", 32)}<span style={{fontFamily:"'Baloo 2',cursive",fontSize:20,color:'#B2BEC3'}}>0</span></div>;
  return (<div className="streak-fire"><div className="fire-glow"/><div className="fire-particles">{Array.from({ length: Math.min(count, 8) }).map((_, i) => <div key={i} className="fire-particle" style={{ animationDelay: `${i * 0.15}s`, left: `${5 + Math.random() * 20}px` }}/>)}</div><div className="fire-icon">{Icons.fire("#FF7B54", 36 + Math.min(count, 20))}</div><div className="fire-count">{count}</div></div>);
}

function ConfettiBurst({ active }) {
  const canvasRef = useRef(null); const particles = useRef([]); const animRef = useRef(null);
  useEffect(() => { if (!active || !canvasRef.current) return; const canvas = canvasRef.current; const ctx = canvas.getContext("2d"); canvas.width = window.innerWidth; canvas.height = window.innerHeight; const colors = ["#FF7B54","#5BB5A2","#F4D06F","#B8A0D2","#E8626C","#7EC8B8"]; particles.current = Array.from({ length: 80 }, () => ({ x: canvas.width/2+(Math.random()-.5)*200, y: canvas.height/2, vx:(Math.random()-.5)*16, vy:-Math.random()*18-4, size:Math.random()*8+4, color:colors[Math.floor(Math.random()*colors.length)], rotation:Math.random()*360, rotSpeed:(Math.random()-.5)*12, life:1, shape:Math.random()>.5?"circle":"rect" })); const animate = () => { ctx.clearRect(0,0,canvas.width,canvas.height); let alive=false; for(const p of particles.current){if(p.life<=0)continue;alive=true;p.x+=p.vx;p.y+=p.vy;p.vy+=.4;p.vx*=.99;p.rotation+=p.rotSpeed;p.life-=.012;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rotation*Math.PI/180);ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;if(p.shape==="circle"){ctx.beginPath();ctx.arc(0,0,p.size/2,0,Math.PI*2);ctx.fill();}else{ctx.fillRect(-p.size/2,-p.size/4,p.size,p.size/2);}ctx.restore();}if(alive)animRef.current=requestAnimationFrame(animate);}; animRef.current=requestAnimationFrame(animate); return()=>{if(animRef.current)cancelAnimationFrame(animRef.current);}; }, [active]); if(!active)return null; return <canvas ref={canvasRef} style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:9999}}/>;
}

const RESOURCE_LIBRARY = [
  { category: "VC Foundations", items: [{ title: "Venture Deals", author: "Feld & Mendelson", year: 2019, type: "Book", relevance: "The gold standard. Start here.", rating: 5 },{ title: "Secrets of Sand Hill Road", author: "Kupor (a16z)", year: 2019, type: "Book", relevance: "Inside a16z. Fund mechanics.", rating: 5 },{ title: "The Power Law", author: "Mallaby", year: 2022, type: "Book", relevance: "History of venture capital.", rating: 5 }]},
  { category: "German / DACH", items: [{ title: "Praxishandbuch VC", author: "Weitnauer", year: 2022, type: "Book", relevance: "THE German VC legal reference.", rating: 5 },{ title: "GESSI / BAND Templates", author: "German Startups Assoc.", year: 2023, type: "Template", relevance: "Standard German term sheets.", rating: 5 }]},
  { category: "Legal", items: [{ title: "GmbH-Gesetz", author: "Legislature", year: "Current", type: "Law", relevance: "§§53-58 on capital changes.", rating: 5 },{ title: "NVCA Model Docs", author: "NVCA", year: 2023, type: "Template", relevance: "US gold standard.", rating: 4 }]},
];

const LEVELS = [
  { name: "Intern", threshold: 0, color: "#8C8C8C", bg: "#F0EDEA", subtitle: "Fresh off the bench" },
  { name: "Analyst", threshold: 200, color: "#5BB5A2", bg: "#E8F5F1", subtitle: "Term sheets don't scare you" },
  { name: "Associate", threshold: 600, color: "#8898D4", bg: "#E8ECFA", subtitle: "Founders CC you" },
  { name: "Vice President", threshold: 1400, color: "#D4A860", bg: "#FFF4E4", subtitle: "Redlining for breakfast" },
  { name: "Partner", threshold: 2800, color: "#E85848", bg: "#FDE8E8", subtitle: "The carry is real" },
  { name: "Managing Partner", threshold: 5000, color: "#8840A0", bg: "#2A1A30", subtitle: "You ARE the term sheet" },
];

const ACHIEVEMENTS = [
  { id: "first_blood", name: "First Win", desc: "Answer correctly", bgColor: "#E8F5F1", borderColor: "#5BB5A2", condition: s => s.totalCorrect >= 1 },
  { id: "streak_5", name: "On Fire", desc: "5 in a row", bgColor: "#FFF0EB", borderColor: "#FF7B54", condition: s => s.bestStreak >= 5 },
  { id: "streak_10", name: "Unstoppable", desc: "10 in a row", bgColor: "#F0EBF5", borderColor: "#B8A0D2", condition: s => s.bestStreak >= 10 },
  { id: "streak_20", name: "Legendary", desc: "20 in a row", bgColor: "#FFF8E7", borderColor: "#F4D06F", condition: s => s.bestStreak >= 20 },
  { id: "cat_master_lp", name: "Liquidation Lord", desc: "Master LP", bgColor: "#FFF0EB", borderColor: "#FF7B54", condition: s => (s.categoryMastery?.["Liquidation Preferences"]||0) >= 8 },
  { id: "cat_master_ad", name: "Dilution Shield", desc: "Master AD", bgColor: "#E8F5F1", borderColor: "#5BB5A2", condition: s => (s.categoryMastery?.["Anti-Dilution"]||0) >= 8 },
  { id: "cat_master_vsop", name: "VSOP Virtuoso", desc: "Master VSOP", bgColor: "#F0EBF5", borderColor: "#B8A0D2", condition: s => (s.categoryMastery?.["ESOP & VSOP"]||0) >= 8 },
  { id: "cat_master_exit", name: "Exit Artist", desc: "Master Exit", bgColor: "#FDECEE", borderColor: "#E8626C", condition: s => (s.categoryMastery?.["Exit & Transfer Rights"]||0) >= 8 },
  { id: "speed_demon", name: "Speed Demon", desc: "5 fast answers", bgColor: "#FFF8E7", borderColor: "#F4D06F", condition: s => s.fastAnswers >= 5 },
  { id: "scholar", name: "Scholar", desc: "Visit library", bgColor: "#E8F5F1", borderColor: "#5BB5A2", condition: s => s.libraryViewed },
  { id: "centurion", name: "Centurion", desc: "100 answers", bgColor: "#FFF0EB", borderColor: "#FF7B54", condition: s => s.totalAnswered >= 100 },
  { id: "perfectionist", name: "Perfectionist", desc: "Perfect round", bgColor: "#F0EBF5", borderColor: "#B8A0D2", condition: s => s.perfectRounds >= 1 },
];

const QUESTIONS = [
  { category: "Liquidation Preferences", difficulty: 1, type: "multiple_choice", question: "1x non-participating preference, €2M invested, 20% equity, €20M exit. Investor chooses?", options: ["Take €2M preference", "Convert to €4M (20% of €20M)", "€2M + €4M participation", "Automatic — no choice"], correct: 1, explanation: "Non-participating = choose higher: €2M OR 20% = €4M. They convert.", germanContext: "BAND/GESSI default: 1x non-participating." },
  { category: "Liquidation Preferences", difficulty: 2, type: "multiple_choice", question: "1x participating preferred, €2M, 20%, €20M exit. Investor gets?", options: ["€4M (20%)", "€2M preference only", "€5.6M (€2M + 20% of €18M)", "€6M"], correct: 2, explanation: "Double dip: €2M first + 20%×€18M = €3.6M. Total: €5.6M.", germanContext: "'Erlösvorzug MIT Beteiligung'. Less common in DACH seed." },
  { category: "Liquidation Preferences", difficulty: 3, type: "scenario", question: "A: €3M @ €12M pre, 1x participating\nB: €3M @ €10M pre, 1x non-participating\n\n€30M exit. Better for founders?", options: ["A — higher valuation", "B — non-participating always wins", "A — math works out", "B — founders keep €23.08M vs €21.6M"], correct: 3, explanation: "A: 20% participating = €8.4M investor. B: 23.08% converts = €6.92M. Lower val + non-participating wins!", germanContext: "Preference structure > headline valuation." },
  { category: "Anti-Dilution", difficulty: 2, type: "multiple_choice", question: "Full ratchet: €5M at €10/share. Series B at €6/share?", options: ["Price adjusted to €6 retroactively", "40% refund", "Nothing below 50%", "Adjusts to €8 weighted avg"], correct: 0, explanation: "Full ratchet reprices entire round to new price. Most aggressive.", germanContext: "'Vollverwässerungsschutz' — rare in DACH." },
  { category: "Anti-Dilution", difficulty: 1, type: "multiple_choice", question: "Anti-dilution clauses exist to?", options: ["Guarantee returns", "Protect against overpaying if value drops", "Prevent share issuance", "Ensure board control"], correct: 1, explanation: "Price protection when future rounds are lower.", germanContext: "Under 'Verwässerungsschutz'." },
  { category: "ESOP & VSOP", difficulty: 1, type: "multiple_choice", question: "Why VSOP over ESOP in Germany?", options: ["Tax advantages", "GmbH transfers need notarization — expensive", "Law prohibits real equity", "Required by labor law"], correct: 1, explanation: "§15 GmbHG: every share transfer needs notary. €500-2000+ each.", germanContext: "Nearly every DACH startup uses VSOP." },
  { category: "ESOP & VSOP", difficulty: 2, type: "multiple_choice", question: "Bad Leaver vs Good Leaver in German VSOP?", options: ["Both keep vested", "Bad forfeits ALL; Good keeps vested", "Bad keeps 50%", "Bad converts to common"], correct: 1, explanation: "Bad = forfeit everything. Good = keep vested, lose unvested.", germanContext: "'Guter/schlechter Abgang'. §307 BGB scrutiny." },
  { category: "Exit & Transfer Rights", difficulty: 2, type: "multiple_choice", question: "Drag-Along allows?", options: ["Any shareholder forces sale", "Qualified majority forces ALL to sell", "Founders drag to more funding", "Board forces IPO"], correct: 1, explanation: "Prevents minority holdouts blocking acquisition.", germanContext: "'Mitveräußerungspflicht'. 75% threshold." },
  { category: "Exit & Transfer Rights", difficulty: 3, type: "scenario", question: "€40M offer. 75% drag needed. Founder 40%, A 30%, B 20%, Angels 10%. Founder+B want to sell?", options: ["Yes — 60% enough", "No — 60% < 75%", "Founder always can", "Depends on blocking right"], correct: 1, explanation: "60% < 75%. Cannot trigger drag.", germanContext: "§53 GmbHG requires 75%." },
  { category: "Convertible Instruments", difficulty: 1, type: "multiple_choice", question: "What is a Wandeldarlehen?", options: ["Subsidy", "Convertible loan → equity at next round", "Preferred share type", "Cash bridge loan"], correct: 1, explanation: "German convertible note. Actual debt that converts.", germanContext: "Unlike SAFEs, Wandeldarlehen accrue interest." },
  { category: "Convertible Instruments", difficulty: 2, type: "multiple_choice", question: "€5M cap, 20% discount, Series A at €8M. Conversion?", options: ["€8M", "€6.4M (discount)", "€5M (cap wins)", "€4M (stacked)"], correct: 2, explanation: "Lower of: discount €6.4M vs cap €5M. Cap wins.", germanContext: "'Bewertungsobergrenze' + 'Abschlag'." },
  { category: "Governance & Control", difficulty: 1, type: "multiple_choice", question: "Ultimate authority in a German GmbH?", options: ["CEO", "Aufsichtsrat", "Gesellschafterversammlung", "Largest investor"], correct: 2, explanation: "Unlike US where board is supreme, GV is highest body.", germanContext: "VCs use protective provisions + Beirat." },
  { category: "Valuation & Economics", difficulty: 1, type: "multiple_choice", question: "€3M at €9M pre-money. Post-money & ownership?", options: ["€12M, 25%", "€9M, 33%", "€12M, 33%", "€9M, 25%"], correct: 0, explanation: "Post = €9+€3 = €12M. VC = €3/€12 = 25%.", germanContext: "Watch for option pool shuffle." },
  { category: "Valuation & Economics", difficulty: 2, type: "scenario", question: "'€4M at €12M pre, 15% ESOP from pre-money.' Effective pre?", options: ["€12M", "€10.2M", "€8M", "€13.6M"], correct: 1, explanation: "Pool shuffle: 15% dilutes founders. €12M×0.85 = €10.2M.", germanContext: "Negotiate pool to actual hiring needs." },
  { category: "Advanced Scenarios", difficulty: 2, type: "multiple_choice", question: "Reverse Vesting in German VC?", options: ["Investors vest", "Founders own shares but subject to repurchase if they leave", "VSOP reverses", "Claw back investor shares"], correct: 1, explanation: "Own day 1, repurchase expires over 4 years.", germanContext: "'Rückübertragungspflicht'. Every VC requires this." },
];

const LEADERBOARD = [
  { name: "Maximilian K.", xp: 4280, streak: 34, avatar: "Griffin" },
  { name: "Sarah M.", xp: 3610, streak: 21, avatar: "Phoenix" },
  { name: "Jonas P.", xp: 2950, streak: 28, avatar: "SeahorseKnight" },
  { name: "Lena W.", xp: 1920, streak: 15, avatar: "SeaTurtle" },
  { name: "Felix R.", xp: 1800, streak: 12, avatar: "SeaTurtle" },
  { name: "Clara S.", xp: 1150, streak: 8, avatar: "Intern" },
  { name: "David H.", xp: 980, streak: 4, avatar: "Intern" },
];

const DAILY_QUESTS = [
  { id: "dq1", title: "Answer 5 questions", target: 5, xpReward: 30, icon: "sword" },
  { id: "dq2", title: "3 correct in a row", target: 3, xpReward: 50, icon: "fire" },
  { id: "dq3", title: "Try 2 categories", target: 2, xpReward: 35, icon: "book" },
];

const TAUNTS = ["Maximilian just earned 45 XP...","Sarah is on a 21-day streak!","3 players passed you this week","Jonas is 2 questions from ranking up","Your streak freezes if you skip today","Lena just unlocked Dilution Shield"];

const CATEGORIES = [...new Set(QUESTIONS.map(q => q.category))];
const getLevel = xp => { let c = LEVELS[0]; for (const l of LEVELS) { if (xp >= l.threshold) c = l; else break; } return c; };
const getNextLevel = xp => { for (const l of LEVELS) { if (xp < l.threshold) return l; } return null; };
const shuffleArray = arr => { const s = [...arr]; for (let i = s.length-1; i > 0; i--) { const j = Math.floor(Math.random()*(i+1)); [s[i],s[j]]=[s[j],s[i]]; } return s; };

export default function App() {
  const [screen, setScreen] = useState("home");
  const [gs, setGs] = useState({ xp:0, totalCorrect:0, totalAnswered:0, bestStreak:0, currentStreak:0, fastAnswers:0, libraryViewed:false, perfectRounds:0, categoryMastery:{}, achievements:[], hearts:5, questProgress:{dq1:0,dq2:0,dq3:0}, catsToday:[], todayAnswered:0 });
  const [rs, setRs] = useState({ questions:[], currentIndex:0, answers:[], selectedAnswer:null, showExplanation:false, roundCategory:null, roundCorrect:0, roundTotal:0, questionStartTime:null, combo:0 });
  const [activeBoost, setActiveBoost] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [newAch, setNewAch] = useState([]);
  const [showAchPopup, setShowAchPopup] = useState(false);
  const [libTab, setLibTab] = useState(0);
  const [shakeWrong, setShakeWrong] = useState(false);
  const [trans, setTrans] = useState(false);
  const [toast, setToast] = useState(null);
  const [xpFloat, setXpFloat] = useState({ val:0, show:false, key:0 });
  const [tauntIdx, setTauntIdx] = useState(0);
  const [showChest, setShowChest] = useState(false);
  const [chestXP, setChestXP] = useState(0);
  const prevLvl = useRef(getLevel(gs.xp).name);

  const go = s => { setTrans(true); setTimeout(() => { setScreen(s); setTrans(false); }, 180); };
  const notify = (msg, type="info") => { setToast({ msg, type }); setTimeout(() => setToast(null), 2800); };

  useEffect(() => { const t = setInterval(() => setTauntIdx(i => (i+1) % TAUNTS.length), 4500); return () => clearInterval(t); }, []);
  useEffect(() => { try { const s = localStorage.getItem("termy_v1"); if (s) setGs(JSON.parse(s)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem("termy_v1", JSON.stringify(gs)); } catch {} }, [gs]);

  const checkAch = useCallback(state => {
    const n = []; for (const a of ACHIEVEMENTS) { if (!state.achievements.includes(a.id) && a.condition(state)) n.push(a); }
    if (n.length) { setNewAch(n); setShowAchPopup(true); setTimeout(() => setShowAchPopup(false), 3500); return [...state.achievements, ...n.map(a => a.id)]; }
    return state.achievements;
  }, []);

  useEffect(() => { const cl = getLevel(gs.xp).name; if (cl !== prevLvl.current) { setShowLevelUp(true); setShowConfetti(true); setTimeout(() => { setShowLevelUp(false); setShowConfetti(false); }, 4000); prevLvl.current = cl; } }, [gs.xp]);

  const startRound = (cat=null) => { if (gs.hearts<=0) { notify("No hearts! Wait for recharge.","danger"); return; } let pool = cat ? QUESTIONS.filter(q=>q.category===cat) : [...QUESTIONS]; pool = shuffleArray(pool).slice(0, Math.min(10, pool.length)); setRs({ questions:pool, currentIndex:0, answers:[], selectedAnswer:null, showExplanation:false, roundCategory:cat, roundCorrect:0, roundTotal:0, questionStartTime:Date.now(), combo:0 }); go("game"); };

  const answer = idx => {
    if (rs.showExplanation) return;
    const q = rs.questions[rs.currentIndex]; const ok = idx===q.correct;
    const t = (Date.now()-rs.questionStartTime)/1000; const fast = t<5;
    if (!ok) { setShakeWrong(true); setTimeout(() => setShakeWrong(false), 500); }
    let xp = ok ? 20+q.difficulty*10+(fast?10:0)+Math.min(rs.combo*5,50) : 0;
    if (ok && activeBoost==="double") xp*=2;
    const ns = ok ? gs.currentStreak+1 : 0;
    if (ok && xp) { setXpFloat({ val:xp, show:true, key:Date.now() }); setTimeout(() => setXpFloat(p=>({...p,show:false})), 1200); }
    const u = { ...gs, xp:gs.xp+xp, totalCorrect:gs.totalCorrect+(ok?1:0), totalAnswered:gs.totalAnswered+1, bestStreak:Math.max(gs.bestStreak,ns), currentStreak:ns, fastAnswers:gs.fastAnswers+((fast&&ok)?1:0), categoryMastery:{...gs.categoryMastery,[q.category]:(gs.categoryMastery[q.category]||0)+(ok?1:0)}, todayAnswered:gs.todayAnswered+1 };
    if (!ok) { u.hearts=Math.max(0,gs.hearts-1); if(u.hearts===0) notify("Out of hearts!","danger"); }
    const qp={...gs.questProgress}; qp.dq1=Math.min(u.todayAnswered,5); if(ok&&ns>=3) qp.dq2=3;
    const cats=[...(gs.catsToday||[])]; if(!cats.includes(q.category)) cats.push(q.category); qp.dq3=Math.min(cats.length,2);
    u.questProgress=qp; u.catsToday=cats;
    for(const dq of DAILY_QUESTS){if((gs.questProgress[dq.id]||0)<dq.target&&(qp[dq.id]||0)>=dq.target){u.xp+=dq.xpReward;notify(`Quest done! +${dq.xpReward} XP`,"success");}}
    u.achievements=checkAch(u); setGs(u);
    setRs(p=>({...p,selectedAnswer:idx,showExplanation:true,roundCorrect:p.roundCorrect+(ok?1:0),roundTotal:p.roundTotal+1,combo:ok?p.combo+1:0,answers:[...p.answers,{questionIndex:p.currentIndex,selected:idx,correct:q.correct,isCorrect:ok,xpGain:xp,timeTaken:t}]}));
    if(activeBoost==="double") setActiveBoost(null);
  };

  const nextQ = () => {
    if(gs.hearts<=0){go("results");return;}
    if(rs.currentIndex+1>=rs.questions.length){
      if(rs.roundCorrect===rs.roundTotal&&rs.roundTotal>=5){setGs(p=>{const u={...p,perfectRounds:p.perfectRounds+1};u.achievements=checkAch(u);return u;});setShowConfetti(true);setTimeout(()=>setShowConfetti(false),3000);}
      if(Math.random()>.4){const b=[10,15,20,25,30,50][Math.floor(Math.random()*6)];setChestXP(b);setShowChest(true);setGs(p=>({...p,xp:p.xp+b}));}
      go("results");return;
    }
    setRs(p=>({...p,currentIndex:p.currentIndex+1,selectedAnswer:null,showExplanation:false,questionStartTime:Date.now()}));
  };

  const lv = getLevel(gs.xp); const nlv = getNextLevel(gs.xp);
  const pct = nlv ? ((gs.xp-lv.threshold)/(nlv.threshold-lv.threshold))*100 : 100;
  const RIcon = RANK_ICONS[lv.name]||BabyOyster;
  const lb = [...LEADERBOARD,{name:"You",xp:gs.xp,streak:gs.bestStreak,avatar:lv.name,isUser:true}].sort((a,b)=>b.xp-a.xp);
  lb.forEach((e,i)=>e.rank=i+1);
  const uRank = lb.find(e=>e.isUser)?.rank||8;
  const above = lb[Math.max(0,uRank-2)];
  const gap = above&&!above.isUser ? above.xp-gs.xp : 0;

  return (
    <div className="app-root"><style>{CSS}</style><ConfettiBurst active={showConfetti}/>
      {toast&&<div className={`toast toast-${toast.type}`}>{toast.type==="success"?Icons.check("#5BB5A2",20):toast.type==="danger"?Icons.cross("#E8626C",20):Icons.sparkle("#B8A0D2",20)}<span>{toast.msg}</span></div>}
      {showLevelUp&&<div className="overlay"><div className="level-up-card" style={{background:lv.name==="Managing Partner"?"#1a1028":lv.bg}}><div className="lu-icon"><RIcon size={80}/></div><div className="lu-label">RANK UP!</div><div className="lu-name" style={{color:lv.color}}>{lv.name}</div><div className="lu-sub">{lv.subtitle}</div></div></div>}
      {showAchPopup&&newAch.length>0&&<div className="ach-popup">{newAch.map(a=>{const S=ACHIEVEMENT_STICKERS[a.id];return<div key={a.id} className="ach-toast" style={{background:a.bgColor,borderColor:a.borderColor}}><span style={{display:'flex'}}>{S?<S size={36}/>:null}</span><div><div className="ach-label">Sticker Unlocked!</div><div className="ach-name">{a.name}</div></div></div>;})}</div>}
      {showChest&&<div className="overlay" onClick={()=>setShowChest(false)}><div className="chest-card"><div className="chest-anim">{Icons.chest("#F4D06F",64)}</div><div className="chest-title">Bonus Reward!</div><div className="chest-xp">+{chestXP} XP</div><div className="chest-tap">Tap to continue</div></div></div>}
      {xpFloat.show&&<div className="xp-float" key={xpFloat.key}>+{xpFloat.val} XP</div>}

      <div className={`screen-wrap ${trans?"screen-exit":""}`}>

      {screen==="home"&&<div className="container">
        <div className="hero"><div className="hero-blob b1"/><div className="hero-blob b2"/><div className="hero-icon">{Icons.lightning("#FF7B54",44)}</div><h1 className="hero-title">Termy</h1><p className="hero-sub">Master German VC Deal Terms</p></div>
        <div className="vitals-bar"><StreakFire count={gs.bestStreak}/><div className="hearts-row">{Array.from({length:5}).map((_,i)=><span key={i} className={`hrt ${i<gs.hearts?"hrt-on":"hrt-off"}`}><svg width="22" height="22" viewBox="0 0 32 32"><path d="M16 28C12 24 4 18 4 12a6 6 0 0112 0 6 6 0 0112 0c0 6-8 12-12 16z" fill={i<gs.hearts?"#E8626C":"#E0D8D0"} stroke={i<gs.hearts?"#D0464E":"#C8C0B8"} strokeWidth="1.5"/></svg></span>)}{gs.hearts<5&&<span className="hrt-timer">+1 in 30m</span>}</div></div>
        <div className="rank-card"><div className="rank-ava"><RIcon size={52}/></div><div className="rank-info"><div className="rank-name" style={{color:lv.color}}>{lv.name}</div><div className="rank-xp">{gs.xp.toLocaleString()} XP</div>{nlv&&<><div className="rank-bar"><div className="rank-fill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${lv.color},${nlv.color})`}}/></div><div className="rank-next">{nlv.threshold-gs.xp} XP to {nlv.name}</div></>}</div></div>
        <div className="taunt"><div className="taunt-dot"/><span>{TAUNTS[tauntIdx]}</span></div>
        <button className="cta" onClick={()=>{if(gs.hearts>0)go("categorySelect");else notify("No hearts!","danger");}} disabled={gs.hearts<=0}><div className="cta-shine"/>{Icons.sword("#fff",28)}<span>Start Training</span></button>
        <div className="action-row"><button className="act-btn" onClick={()=>{if(gs.hearts>0)startRound();else notify("No hearts!","danger");}}>{Icons.dice("#B8A0D2",24)}<span>Random</span></button><button className="act-btn" onClick={()=>{go("library");setGs(p=>({...p,libraryViewed:true}));}}>{Icons.book("#5BB5A2",24)}<span>Library</span></button><button className="act-btn" onClick={()=>go("leaderboard")}>{Icons.trophy("#F4D06F",24)}<span>League</span></button></div>
        <div className="sec-head"><span className="sec-title">Daily Quests</span><span className="sec-timer">Resets in 6h</span></div>
        {DAILY_QUESTS.map(dq=>{const p=gs.questProgress[dq.id]||0;const d=p>=dq.target;return<div key={dq.id} className={`quest ${d?"quest-done":""}`}><div className="q-left">{dq.icon==="fire"?Icons.fire(d?"#5BB5A2":"#FF7B54",22):dq.icon==="sword"?Icons.sword(d?"#5BB5A2":"#FF7B54",22):Icons.book(d?"#5BB5A2":"#5BB5A2",22)}</div><div className="q-mid"><div className="q-title">{dq.title}{d&&Icons.check("#5BB5A2",16)}</div><div className="q-bar"><div className="q-fill" style={{width:`${Math.min(p/dq.target*100,100)}%`,background:d?"var(--teal)":"var(--coral)"}}/></div></div><div className="q-right"><div className={`q-reward ${d?"q-reward-d":""}`}>+{dq.xpReward}</div><div className="q-count">{p}/{dq.target}</div></div></div>;})}
        <div className="fomo"><div className="fomo-shine"/>{Icons.lightning("#B8A0D2",18)}<div className="fomo-text"><strong>Anti-Dilution Sprint</strong> — 2x XP this weekend<br/><span className="fomo-sub">247 players · Ends Sunday</span></div></div>
        <div className="sec-head"><span className="sec-title">Stickers</span><span className="sec-count">{gs.achievements.length}/{ACHIEVEMENTS.length}</span></div>
        <div className="stk-grid">{ACHIEVEMENTS.map(a=>{const u=gs.achievements.includes(a.id);const S=ACHIEVEMENT_STICKERS[a.id];return<div key={a.id} className={`stk ${u?"stk-on":"stk-off"}`} style={u?{background:a.bgColor,borderColor:a.borderColor}:{}}><span className="stk-icon">{S?<S size={42}/>:null}</span><span className="stk-name">{a.name}</span></div>;})}</div>
      </div>}

      {screen==="categorySelect"&&<div className="container">
        <button className="back" onClick={()=>go("home")}>{Icons.arrowLeft()} Back</button>
        <h2 className="pg-title">Pick a Topic</h2><p className="pg-desc">Up to 10 questions</p>
        <div className="cat-grid">{CATEGORIES.map(cat=>{const m=gs.categoryMastery[cat]||0;const fn=CATEGORY_ICONS[cat]||Icons.flag;return<button key={cat} className="cat-card" onClick={()=>startRound(cat)}><div className="ci">{fn(undefined,32)}</div><span className="cn">{cat}</span><div className="cat-pips">{[...Array(10)].map((_,i)=><div key={i} className={`cp ${i<m?"cpf":""}`}/>)}</div><span className="cc">{m}/10</span></button>;})}</div>
      </div>}

      {screen==="game"&&rs.questions.length>0&&(()=>{const q=rs.questions[rs.currentIndex];const done=rs.showExplanation;const ok=rs.selectedAnswer===q.correct;return<div className="container">
        <div className="game-top"><button className="close-btn" onClick={()=>go("home")}>{"\u2715"}</button><div className="dots">{rs.questions.map((_,i)=><div key={i} className={`dot ${i<rs.currentIndex?(rs.answers[i]?.isCorrect?"dot-ok":"dot-no"):i===rs.currentIndex?"dot-now":""}`}/>)}</div><div className="hearts-mini">{Array.from({length:5}).map((_,i)=><span key={i} style={{opacity:i<gs.hearts?1:.2}}><svg width="14" height="14" viewBox="0 0 32 32"><path d="M16 28C12 24 4 18 4 12a6 6 0 0112 0 6 6 0 0112 0c0 6-8 12-12 16z" fill={i<gs.hearts?"#E8626C":"#ddd"}/></svg></span>)}</div>{rs.combo>1&&<div className="combo">{Icons.fire("#FF7B54",14)} {rs.combo}x</div>}</div>
        <div className="q-badges"><span className={`qb diff-${q.difficulty}`}>{"●".repeat(q.difficulty)} {["","Basics","Intermediate","Expert"][q.difficulty]}</span><span className="qb qb-cat">{q.category}</span>{q.type==="scenario"&&<span className="qb qb-sc">Scenario</span>}</div>
        <div className={`q-card ${shakeWrong?"shake":""}`}><p className="q-text">{q.question}</p></div>
        {!done&&gs.currentStreak>0&&<div className="streak-ind">{Icons.fire("#FF7B54",14)} {gs.currentStreak} in a row!</div>}
        <div className="opts">{q.options.map((opt,i)=>{let c="opt";if(done){if(i===q.correct)c+=" opt-ok";else if(i===rs.selectedAnswer)c+=" opt-no";else c+=" opt-dim";}return<button key={i} className={c} onClick={()=>answer(i)} disabled={done}><span className="ol">{String.fromCharCode(65+i)}</span><span className="ot">{opt}</span>{done&&i===q.correct&&<span className="or">{Icons.check("#5BB5A2",20)}</span>}{done&&i===rs.selectedAnswer&&i!==q.correct&&<span className="or">{Icons.cross("#E8626C",20)}</span>}</button>;})}</div>
        {done&&<div className="explain"><div className={`rb ${ok?"rb-ok":"rb-no"}`}>{ok?Icons.check("#5BB5A2",28):Icons.cross("#E8626C",28)}<div><div className="rl">{ok?`+${rs.answers[rs.answers.length-1]?.xpGain||0} XP`:"Not quite!"}</div>{ok&&rs.combo>1&&<div className="rc">Combo x{rs.combo}!</div>}{!ok&&<div className="heart-loss">{Icons.fire("#E8626C",14)} -1 Heart</div>}</div></div><div className="exp-card"><div className="el">Why?</div><p className="et">{q.explanation}</p></div>{q.germanContext&&<div className="de-card"><div className="gl">{Icons.deFlag()} German Context</div><p className="et">{q.germanContext}</p></div>}<button className="btn-next" onClick={nextQ}>{gs.hearts<=0?"Out of Hearts!":rs.currentIndex+1>=rs.questions.length?"See Results":"Next Question"} →</button></div>}
        {!done&&gs.currentStreak>=3&&!activeBoost&&<button className="boost" onClick={()=>setActiveBoost("double")}>{Icons.lightning("#B8A0D2",18)} 2× XP Boost!</button>}
      </div>;})()}

      {screen==="results"&&<div className="container">
        <div className="results-card"><div className="ri">{rs.roundCorrect===rs.roundTotal?Icons.trophy("#F4D06F",52):rs.roundCorrect>=rs.roundTotal*.7?Icons.sparkle("#B8A0D2",52):Icons.book("#5BB5A2",52)}</div><h2 className="rt">{rs.roundCorrect===rs.roundTotal?"PERFECT!":rs.roundCorrect>=rs.roundTotal*.7?"Nice work!":"Keep going!"}</h2><div className="rnums"><div className="rn"><span className="rb2" style={{color:"#5BB5A2"}}>{rs.roundCorrect}</span><span className="rlab">Correct</span></div><div className="rdiv"/><div className="rn"><span className="rb2" style={{color:"#FF7B54"}}>{rs.answers.reduce((s,a)=>s+a.xpGain,0)}</span><span className="rlab">XP</span></div></div>
          <div className="rlist">{rs.answers.map((a,i)=><div key={i} className="rrow">{a.isCorrect?Icons.check("#5BB5A2",16):Icons.cross("#E8626C",16)}<span className="rrc">Q{i+1}</span><span className={`rrx ${a.isCorrect?"xp-pos":"xp-neg"}`}>{a.isCorrect?`+${a.xpGain}`:"0"}</span></div>)}</div>
          {gap>0&&<div className="r-nudge">{Icons.fire("#FF7B54",16)} {gap} XP to pass {above?.name}!</div>}
        </div>
        <div className="ra"><button className="cta cta-sm" onClick={()=>go("categorySelect")}>{Icons.sword("#fff",20)}<span>Again</span></button><button className="act-btn" onClick={()=>go("home")}>{Icons.arrowLeft("#636E72",18)}<span>Home</span></button></div>
      </div>}

      {screen==="leaderboard"&&<div className="container">
        <button className="back" onClick={()=>go("home")}>{Icons.arrowLeft()} Back</button>
        <h2 className="pg-title">{Icons.trophy("#F4D06F",26)} Gold League</h2><p className="pg-desc">Top 3 promote — 4 days left</p>
        <div className="lb-list">{lb.slice(0,8).map(p=><div key={p.rank} className={`lb-row ${p.isUser?"lb-user":""}`}><span className="lb-rank">{p.rank<=3?[Icons.crown("#F4D06F",16),Icons.crown("#B2BEC3",16),Icons.crown("#D4A860",16)][p.rank-1]:p.rank}</span><span className="lb-ava">{(RANK_ICONS[p.avatar]||BabyOyster)({size:28})}</span><div className="lb-info"><span className="lb-name">{p.name}</span><span className="lb-streak">{Icons.fire("#FF7B54",11)} {p.streak}</span></div><div className="lb-xp">{p.xp.toLocaleString()}</div></div>)}</div>
        {gap>0&&<div className="lb-nudge">{Icons.lightning("#FF7B54",16)} {gap} XP to pass {above?.name}!</div>}
      </div>}

      {screen==="library"&&<div className="container">
        <button className="back" onClick={()=>go("home")}>{Icons.arrowLeft()} Back</button>
        <h2 className="pg-title">Resource Library</h2>
        <div className="lib-tabs">{RESOURCE_LIBRARY.map((s,i)=><button key={i} className={`lib-tab ${libTab===i?"lib-tab-on":""}`} onClick={()=>setLibTab(i)}>{s.category}</button>)}</div>
        <div className="lib-list">{RESOURCE_LIBRARY[libTab].items.map((item,i)=><div key={i} className="lib-card"><div className="lct"><div><div className="lt">{item.title}</div><div className="la">{item.author} · {item.year}</div></div><span className={`ltype ltype-${item.type.toLowerCase()}`}>{item.type}</span></div><p className="lr">{item.relevance}</p><div className="lstars">{[...Array(5)].map((_,j)=><span key={j} className={`ls ${j<item.rating?"lsf":""}`}>{"\u2605"}</span>)}</div></div>)}</div>
      </div>}

      </div>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Baloo+2:wght@500;600;700;800&display=swap');
:root{--cream:#FFF8F0;--white:#FFFFFF;--coral:#FF7B54;--coral-soft:#FFF0EB;--teal:#5BB5A2;--teal-soft:#E8F5F1;--lavender:#B8A0D2;--lavender-soft:#F0EBF5;--sand:#F4D06F;--sand-soft:#FFF8E7;--rose:#E8626C;--rose-soft:#FDECEE;--text:#2D3436;--text-light:#636E72;--text-faint:#B2BEC3;--border:#E8E0D8;--border-light:#F0EDEA;--r:16px;--rs:12px;--rx:8px}
*{box-sizing:border-box;margin:0;padding:0}button{cursor:pointer;border:none;outline:none;font-family:'Nunito',sans-serif}
.app-root{min-height:100vh;background:var(--cream);background-image:radial-gradient(circle at 1px 1px,#E8E0D833 1px,transparent 0);background-size:28px 28px;font-family:'Nunito',sans-serif;color:var(--text);overflow-x:hidden}
.container{max-width:660px;margin:0 auto;padding:20px 16px 40px;display:flex;flex-direction:column;align-items:center}
.screen-wrap{animation:slideIn .25s ease-out}.screen-exit{opacity:0;transform:translateY(8px);transition:all .18s}
@keyframes slideIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes dragonGlow{0%,100%{filter:drop-shadow(0 0 6px #F4A63A) drop-shadow(0 0 14px #E8593C)}50%{filter:drop-shadow(0 0 12px #F9D054) drop-shadow(0 0 22px #E8723A)}}
.overlay{position:fixed;inset:0;background:rgba(45,52,54,.5);backdrop-filter:blur(8px);z-index:1000;display:flex;align-items:center;justify-content:center;animation:fadeIn .3s}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.level-up-card{text-align:center;padding:40px 48px;border-radius:28px;border:3px solid var(--border);box-shadow:0 20px 60px rgba(0,0,0,.15);animation:popIn .5s cubic-bezier(.34,1.56,.64,1)}
@keyframes popIn{0%{transform:scale(.5);opacity:0}100%{transform:scale(1);opacity:1}}
.lu-icon{margin-bottom:12px}.lu-label{font-family:'Baloo 2',cursive;font-size:14px;letter-spacing:4px;color:var(--text-light);font-weight:700}.lu-name{font-family:'Baloo 2',cursive;font-size:38px;font-weight:800;line-height:1.1}.lu-sub{font-size:15px;color:var(--text-light);margin-top:6px;font-style:italic}
.toast{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:1001;display:flex;align-items:center;gap:8px;padding:12px 20px;border-radius:var(--r);box-shadow:0 8px 24px rgba(0,0,0,.12);animation:toastIn .4s cubic-bezier(.34,1.56,.64,1);font-size:14px;font-weight:700;max-width:90vw}
.toast-success{background:var(--teal-soft);border:2px solid var(--teal);color:var(--teal)}.toast-danger{background:var(--rose-soft);border:2px solid var(--rose);color:var(--rose)}.toast-info{background:var(--lavender-soft);border:2px solid var(--lavender);color:var(--lavender)}
@keyframes toastIn{0%{transform:translateX(-50%) translateY(-20px) scale(.8);opacity:0}100%{transform:translateX(-50%) translateY(0) scale(1);opacity:1}}
.ach-popup{position:fixed;top:16px;right:16px;z-index:1001;display:flex;flex-direction:column;gap:8px}
.ach-toast{display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:var(--r);border:2px solid;box-shadow:0 8px 24px rgba(0,0,0,.1);animation:toastIn .4s cubic-bezier(.34,1.56,.64,1)}
.ach-label{font-size:10px;font-weight:800;letter-spacing:1px;color:var(--text-light);text-transform:uppercase}.ach-name{font-size:15px;font-weight:700}
.chest-card{text-align:center;padding:40px;border-radius:28px;background:linear-gradient(135deg,var(--sand-soft),#FFF0EB);border:3px solid var(--sand);box-shadow:0 20px 60px rgba(244,208,111,.3);animation:popIn .6s cubic-bezier(.34,1.56,.64,1)}
.chest-anim{animation:chestBob 1s ease infinite;margin-bottom:12px}
@keyframes chestBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.chest-title{font-family:'Baloo 2',cursive;font-size:16px;color:var(--text-light)}.chest-xp{font-family:'Baloo 2',cursive;font-size:42px;font-weight:800;color:var(--coral)}.chest-tap{font-size:12px;color:var(--text-faint);margin-top:8px}
.xp-float{position:fixed;top:38%;left:50%;transform:translateX(-50%);z-index:1000;font-family:'Baloo 2',cursive;font-size:34px;font-weight:800;color:var(--coral);text-shadow:0 2px 8px rgba(255,123,84,.4);animation:xpRise 1.2s ease-out forwards;pointer-events:none}
@keyframes xpRise{0%{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}50%{opacity:1;transform:translateX(-50%) translateY(-40px) scale(1.3)}100%{opacity:0;transform:translateX(-50%) translateY(-80px) scale(.8)}}
.hero{text-align:center;padding:32px 20px 16px;position:relative;width:100%}.hero-blob{position:absolute;border-radius:50%;filter:blur(60px);opacity:.35}.b1{width:200px;height:200px;background:var(--coral);top:-40px;left:10%}.b2{width:160px;height:160px;background:var(--lavender);top:0;right:5%}
.hero-icon{position:relative;z-index:1;margin-bottom:4px}
.hero-title{font-family:'Baloo 2',cursive;font-size:56px;font-weight:800;line-height:1;position:relative;z-index:1;background:linear-gradient(135deg,var(--text) 40%,var(--coral));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-sub{font-size:14px;color:var(--text-light);position:relative;z-index:1;font-weight:600}
.vitals-bar{display:flex;align-items:center;justify-content:space-between;width:100%;max-width:480px;padding:10px 16px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--r);margin:12px 0;box-shadow:0 2px 12px rgba(0,0,0,.04)}
.hearts-row{display:flex;align-items:center;gap:2px}
.hrt{display:flex;transition:all .3s}.hrt-on{animation:hrtPump 2s ease-in-out infinite}.hrt-off{opacity:.25;filter:grayscale(1)}
@keyframes hrtPump{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
.hrt-timer{font-size:10px;color:var(--rose);font-weight:700;margin-left:4px}
.streak-fire{position:relative;display:flex;align-items:center;gap:4px}
.fire-glow{position:absolute;width:50px;height:50px;border-radius:50%;background:radial-gradient(circle,rgba(255,123,84,.3),transparent 70%);left:-8px;top:-8px;animation:fGlow 1.5s ease-in-out infinite}
@keyframes fGlow{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}
.fire-icon{position:relative;z-index:1;animation:fWig .4s ease-in-out infinite alternate}
@keyframes fWig{0%{transform:rotate(-3deg) scale(1)}100%{transform:rotate(3deg) scale(1.05)}}
.fire-count{font-family:'Baloo 2',cursive;font-size:22px;font-weight:800;color:var(--coral);z-index:1;text-shadow:0 1px 4px rgba(255,123,84,.3)}
.fire-particles{position:absolute;top:0;left:8px;width:30px;height:30px;pointer-events:none}
.fire-particle{position:absolute;width:4px;height:4px;border-radius:50%;background:var(--coral);opacity:.7;animation:fRise .8s ease-out infinite}
@keyframes fRise{0%{transform:translateY(0);opacity:.8}100%{transform:translateY(-18px) translateX(var(--x,4px));opacity:0}}
.rank-card{display:flex;align-items:center;gap:14px;width:100%;max-width:480px;padding:14px 18px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--r);margin-bottom:10px;box-shadow:0 2px 12px rgba(0,0,0,.04)}
.rank-ava{flex-shrink:0}.rank-info{flex:1}.rank-name{font-family:'Baloo 2',cursive;font-size:20px;font-weight:800}.rank-xp{font-size:13px;color:var(--text-faint);font-weight:700}
.rank-bar{height:10px;background:var(--border-light);border-radius:100px;overflow:hidden;margin-top:6px;border:1.5px solid var(--border)}
.rank-fill{height:100%;border-radius:100px;transition:width .8s cubic-bezier(.34,1.56,.64,1);position:relative}.rank-fill::after{content:'';position:absolute;top:1px;left:4px;right:4px;height:3px;background:rgba(255,255,255,.5);border-radius:100px}
.rank-next{font-size:11px;color:var(--text-faint);font-weight:700;margin-top:3px}
.taunt{display:flex;align-items:center;gap:8px;width:100%;max-width:480px;padding:10px 14px;background:linear-gradient(90deg,var(--coral-soft),var(--sand-soft));border:1.5px solid var(--border);border-radius:var(--rx);margin-bottom:12px;font-size:12px;font-weight:700;color:var(--text-light);animation:tauntFade .5s ease}
@keyframes tauntFade{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
.taunt-dot{width:8px;height:8px;border-radius:50%;background:var(--coral);animation:tPulse 1.5s infinite;flex-shrink:0}
@keyframes tPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.6)}}
.cta{position:relative;display:flex;align-items:center;justify-content:center;gap:10px;width:100%;max-width:480px;padding:18px;background:var(--coral);color:white;border-radius:var(--r);font-size:18px;font-weight:800;letter-spacing:.5px;margin-bottom:10px;box-shadow:0 6px 24px rgba(255,123,84,.35);transition:all .2s;overflow:hidden}
.cta:hover{transform:translateY(-3px);box-shadow:0 10px 32px rgba(255,123,84,.45)}.cta:active{transform:scale(.97)}.cta:disabled{background:var(--border);box-shadow:none}
.cta-shine{position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent 30%,rgba(255,255,255,.15) 50%,transparent 70%);animation:shine 3s infinite}
@keyframes shine{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
.cta-sm{padding:14px;font-size:15px;flex:1}
.action-row{display:flex;gap:8px;width:100%;max-width:480px;margin-bottom:16px}
.act-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:14px 8px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--rs);font-size:12px;font-weight:800;color:var(--text-light);transition:all .2s;box-shadow:0 2px 8px rgba(0,0,0,.03)}
.act-btn:hover{transform:translateY(-3px);box-shadow:0 6px 16px rgba(0,0,0,.08);border-color:var(--coral)}
.sec-head{display:flex;justify-content:space-between;align-items:center;width:100%;max-width:480px;margin-bottom:8px;margin-top:4px}
.sec-title{font-family:'Baloo 2',cursive;font-size:18px;font-weight:700;color:var(--text)}.sec-count{font-size:13px;font-weight:700;color:var(--text-faint)}
.sec-timer{font-size:12px;font-weight:700;color:var(--rose);animation:tPulse 2s infinite}
.quest{display:flex;align-items:center;gap:10px;width:100%;max-width:480px;padding:12px 14px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--rs);margin-bottom:6px;transition:all .3s;box-shadow:0 2px 8px rgba(0,0,0,.03)}
.quest-done{background:var(--teal-soft);border-color:var(--teal)}
.q-left{flex-shrink:0}.q-mid{flex:1;min-width:0}.q-title{font-size:13px;font-weight:800;display:flex;align-items:center;gap:4px}
.q-bar{height:5px;background:var(--border-light);border-radius:100px;overflow:hidden;margin-top:4px}.q-fill{height:100%;border-radius:100px;transition:width .5s}
.q-right{text-align:right;flex-shrink:0}.q-reward{font-size:14px;font-weight:900;color:var(--coral);animation:rPulse 2s infinite}
.q-reward-d{color:var(--teal);animation:none}
@keyframes rPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
.q-count{font-size:10px;color:var(--text-faint);font-weight:700}
.fomo{display:flex;align-items:center;gap:10px;width:100%;max-width:480px;padding:12px 16px;background:linear-gradient(135deg,var(--lavender-soft),var(--sand-soft));border:2px solid var(--lavender);border-radius:var(--rs);margin-bottom:16px;position:relative;overflow:hidden}
.fomo-shine{position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(184,160,210,.1),transparent);animation:shine 3s infinite}
.fomo-text{font-size:12px;color:var(--text-light);line-height:1.4;font-weight:600;z-index:1}.fomo-text strong{color:var(--lavender)}.fomo-sub{font-size:11px;color:var(--lavender);font-weight:700}
.stk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:8px;width:100%;max-width:480px}
.stk{display:flex;flex-direction:column;align-items:center;padding:12px 4px;border-radius:var(--rs);transition:all .25s cubic-bezier(.34,1.56,.64,1);border:2px solid transparent}
.stk-off{background:var(--border-light);opacity:.4;filter:grayscale(1)}.stk-on{box-shadow:0 3px 10px rgba(0,0,0,.06)}.stk-on:hover{transform:scale(1.12) rotate(-3deg)}
.stk-icon{margin-bottom:4px;display:flex}.stk-name{font-size:10px;font-weight:800;text-align:center;line-height:1.2;color:var(--text-light)}
.back{align-self:flex-start;display:flex;align-items:center;gap:4px;background:none;font-size:14px;color:var(--text-light);font-weight:700;padding:6px 0;margin-bottom:8px}.back:hover{color:var(--coral)}
.pg-title{font-family:'Baloo 2',cursive;font-size:28px;font-weight:800;text-align:center;margin-bottom:4px;display:flex;align-items:center;gap:8px;justify-content:center}.pg-desc{font-size:14px;color:var(--text-light);text-align:center;margin-bottom:16px;font-weight:600}
.cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;width:100%}
.cat-card{display:flex;flex-direction:column;align-items:center;padding:18px 12px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--r);transition:all .25s cubic-bezier(.34,1.56,.64,1);box-shadow:0 2px 8px rgba(0,0,0,.04)}.cat-card:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 8px 20px rgba(0,0,0,.08);border-color:var(--coral)}.cat-card:active{transform:scale(.97)}
.ci{margin-bottom:6px}.cn{font-size:12px;font-weight:800;text-align:center;margin-bottom:6px}
.cat-pips{display:flex;gap:3px}.cp{width:8px;height:8px;border-radius:3px;background:var(--border-light);transition:background .3s}.cpf{background:var(--sand)}
.cc{font-size:11px;color:var(--text-faint);font-weight:700;margin-top:4px}
.game-top{display:flex;align-items:center;gap:8px;width:100%;margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid var(--border-light)}
.close-btn{width:32px;height:32px;border-radius:50%;background:var(--border-light);color:var(--text-light);font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center}.close-btn:hover{background:var(--rose-soft);color:var(--rose)}
.dots{display:flex;gap:3px;flex:1;flex-wrap:wrap}.dot{width:20px;height:5px;border-radius:100px;background:var(--border-light);transition:all .3s}
.dot-now{background:var(--coral);transform:scaleY(1.4);box-shadow:0 0 6px rgba(255,123,84,.4)}.dot-ok{background:var(--teal)}.dot-no{background:var(--rose)}
.hearts-mini{display:flex;gap:1px}
.combo{display:flex;align-items:center;gap:3px;padding:3px 8px;background:var(--coral-soft);border-radius:100px;font-size:12px;font-weight:800;color:var(--coral);animation:cPulse .6s ease}
@keyframes cPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}
.streak-ind{display:flex;align-items:center;justify-content:center;gap:4px;padding:4px 12px;background:var(--coral-soft);border-radius:100px;font-size:12px;font-weight:800;color:var(--coral);margin-bottom:8px;animation:cPulse .8s ease;width:fit-content;align-self:center}
.q-badges{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;width:100%}
.qb{font-size:11px;font-weight:800;padding:4px 10px;border-radius:100px;letter-spacing:.3px}
.diff-1{background:var(--teal-soft);color:var(--teal)}.diff-2{background:var(--sand-soft);color:#C5A43E}.diff-3{background:var(--rose-soft);color:var(--rose)}
.qb-cat{background:var(--border-light);color:var(--text-light)}.qb-sc{background:var(--lavender-soft);color:var(--lavender)}
.q-card{width:100%;padding:22px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--r);margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.q-text{font-size:15px;line-height:1.7;white-space:pre-line;font-weight:600}
.shake{animation:shake .4s ease}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
.opts{display:flex;flex-direction:column;gap:7px;width:100%;margin-bottom:12px}
.opt{display:flex;align-items:flex-start;gap:10px;padding:13px 14px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--rs);text-align:left;transition:all .2s;width:100%}
.opt:not(:disabled):hover{border-color:var(--coral);transform:translateX(4px);box-shadow:0 4px 12px rgba(255,123,84,.1)}.opt:not(:disabled):active{transform:scale(.98)}
.opt-ok{background:var(--teal-soft)!important;border-color:var(--teal)!important;animation:popOk .3s ease}
@keyframes popOk{0%{transform:scale(1)}50%{transform:scale(1.02)}100%{transform:scale(1)}}
.opt-no{background:var(--rose-soft)!important;border-color:var(--rose)!important;animation:shake .4s ease}.opt-dim{opacity:.4}
.ol{font-size:12px;font-weight:800;color:var(--text-light);min-width:26px;height:26px;display:flex;align-items:center;justify-content:center;background:var(--border-light);border-radius:var(--rx);flex-shrink:0}
.ot{font-size:13px;line-height:1.5;font-weight:600;flex:1}.or{flex-shrink:0;margin-left:auto}
.explain{width:100%;animation:slideIn .3s ease-out}
.rb{display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:var(--rs);margin-bottom:8px}.rb-ok{background:var(--teal-soft)}.rb-no{background:var(--rose-soft)}
.rl{font-size:16px;font-weight:800}.rb-ok .rl{color:var(--teal)}.rb-no .rl{color:var(--rose)}.rc{font-size:12px;font-weight:700;color:var(--coral)}
.heart-loss{font-size:12px;color:var(--rose);font-weight:700;display:flex;align-items:center;gap:4px}
.exp-card{padding:14px 18px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--rs);margin-bottom:8px}
.el{font-family:'Baloo 2',cursive;font-size:14px;font-weight:700;color:var(--coral);margin-bottom:4px}.et{font-size:13px;color:var(--text-light);line-height:1.6;font-weight:600}
.de-card{padding:14px 18px;background:var(--sand-soft);border:2px solid #E8DCC0;border-radius:var(--rs);margin-bottom:12px}
.gl{display:flex;align-items:center;gap:8px;font-family:'Baloo 2',cursive;font-size:13px;font-weight:700;color:#8B7A3E;margin-bottom:4px}
.btn-next{width:100%;padding:14px;background:var(--coral);color:white;border-radius:var(--rs);font-size:15px;font-weight:800;transition:all .2s;box-shadow:0 4px 12px rgba(255,123,84,.25)}.btn-next:hover{transform:translateY(-2px)}.btn-next:active{transform:scale(.98)}
.boost{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:12px;margin-top:6px;background:var(--lavender-soft);border:2px solid var(--lavender);border-radius:var(--rs);color:var(--lavender);font-size:13px;font-weight:800;animation:bPulse 2s infinite ease-in-out}
@keyframes bPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.02);box-shadow:0 0 20px rgba(184,160,210,.3)}}
.results-card{display:flex;flex-direction:column;align-items:center;padding:28px 24px;background:var(--white);border:2px solid var(--border-light);border-radius:24px;width:100%;margin-top:20px;box-shadow:0 4px 16px rgba(0,0,0,.06)}
.ri{margin-bottom:10px}.rt{font-family:'Baloo 2',cursive;font-size:28px;font-weight:800}
.rnums{display:flex;gap:24px;align-items:center;margin:14px 0}
.rn{text-align:center}.rb2{font-family:'Baloo 2',cursive;font-size:34px;font-weight:800;display:block;line-height:1}.rlab{font-size:11px;font-weight:700;color:var(--text-faint);text-transform:uppercase;letter-spacing:.5px}.rdiv{width:2px;height:36px;background:var(--border-light);border-radius:1px}
.rlist{width:100%;margin-top:10px}.rrow{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border-light);font-size:13px}
.rrc{flex:1;color:var(--text-light);font-weight:600}.rrx{font-weight:800}.xp-pos{color:var(--teal)}.xp-neg{color:var(--text-faint)}
.r-nudge{display:flex;align-items:center;gap:6px;margin-top:12px;font-size:12px;font-weight:700;color:var(--coral);padding:8px 12px;background:var(--coral-soft);border-radius:var(--rx);animation:rPulse 2s infinite}
.ra{display:flex;gap:10px;margin-top:16px;width:100%}
.lb-list{width:100%}.lb-row{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--white);border:1.5px solid var(--border-light);border-radius:var(--rs);margin-bottom:5px;transition:all .2s}
.lb-user{background:var(--coral-soft);border-color:var(--coral);box-shadow:0 4px 16px rgba(255,123,84,.12)}
.lb-rank{width:24px;font-weight:800;font-size:13px;color:var(--text-faint);display:flex;justify-content:center}.lb-ava{flex-shrink:0;display:flex}
.lb-info{flex:1}.lb-name{font-size:13px;font-weight:700;display:block}.lb-user .lb-name{color:var(--coral)}
.lb-streak{font-size:11px;color:var(--text-faint);font-weight:600;display:flex;align-items:center;gap:2px}
.lb-xp{font-weight:800;font-size:14px}
.lb-nudge{display:flex;align-items:center;gap:6px;justify-content:center;font-size:13px;font-weight:700;color:var(--coral);margin-top:12px;padding:10px;background:var(--coral-soft);border-radius:var(--rs);animation:rPulse 2s infinite}
.lib-tabs{display:flex;gap:6px;width:100%;overflow-x:auto;padding-bottom:10px;margin-bottom:14px;flex-wrap:wrap}
.lib-tab{font-size:13px;font-weight:700;padding:8px 14px;border-radius:100px;background:var(--white);border:2px solid var(--border-light);color:var(--text-light);white-space:nowrap;transition:all .2s}.lib-tab:hover{border-color:var(--coral)}.lib-tab-on{background:var(--coral-soft);border-color:var(--coral);color:var(--coral)}
.lib-list{display:flex;flex-direction:column;gap:10px;width:100%}
.lib-card{padding:14px 18px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--r);box-shadow:0 2px 8px rgba(0,0,0,.04);transition:all .2s}.lib-card:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.08)}
.lct{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;gap:10px}
.lt{font-size:14px;font-weight:800}.la{font-size:12px;color:var(--text-faint);font-weight:600;margin-top:2px}
.ltype{font-size:11px;font-weight:800;padding:3px 10px;border-radius:100px;flex-shrink:0}
.ltype-book{background:var(--lavender-soft);color:var(--lavender)}.ltype-template{background:var(--teal-soft);color:var(--teal)}.ltype-law{background:var(--rose-soft);color:var(--rose)}.ltype-blog{background:var(--teal-soft);color:var(--teal)}
.lr{font-size:12px;color:var(--text-light);line-height:1.5;font-weight:600}
.lstars{display:flex;gap:2px;margin-top:6px}.ls{font-size:14px;color:var(--border)}.lsf{color:var(--sand)}
@media(max-width:500px){.hero-title{font-size:42px}.cat-grid{grid-template-columns:repeat(2,1fr)}.stk-grid{grid-template-columns:repeat(4,1fr)}}
`;
