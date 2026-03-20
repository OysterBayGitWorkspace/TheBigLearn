# Termsheet Dojo — Icon Upgrade Instructions

## Prompt to paste into your chat / Replit AI:

---

**IMPORTANT: Replace ALL emojis and placeholder icons in the app with the custom SVG React components below. This is a visual overhaul — keep all game logic, questions, and resource library exactly the same.**

Here's what needs to change:

### 1) RANK ICONS — Replace the rank system icons with these mythical creatures

The ranks should evolve from a cute baby oyster to a menacing glowing dragon. Replace whatever icons/emojis are used for ranks with these SVG components. Each takes a `size` prop (default 40).

**The 6 ranks in order:**
- **Intern** → Baby Oyster (cute, peeking out of shell)
- **Analyst** → Sea Turtle (friendly, with bubbles)
- **Associate** → Seahorse Knight (elegant, with crown fins)
- **Vice President** → Griffin (winged lion, fierce)
- **Partner** → Phoenix (fire bird, intense)
- **Managing Partner** → Dragon (menacing, glowing eyes, fire breath, pulsing glow animation)

Here are all 6 rank icon components. Add them to the app and use them wherever rank is displayed:

```jsx
// ═══ RANK ICON COMPONENTS ═══

const BabyOyster = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 140 140">
    <circle cx="70" cy="70" r="58" fill="#EDE8F5" stroke="#C4B8DE" strokeWidth="1"/>
    <path d="M36 72 C36 92, 52 104, 70 104 C88 104, 104 92, 104 72Z" fill="#C8B8A0" stroke="#A09078" strokeWidth="1.2"/>
    <path d="M42 76 C50 88, 60 96, 70 98" stroke="#B0A088" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M98 76 C90 88, 80 96, 70 98" stroke="#B0A088" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M38 72 C38 52, 52 40, 70 38 C88 40, 102 52, 102 72Z" fill="#D8CEB8" stroke="#A09078" strokeWidth="1.2" transform="rotate(-8,70,72)"/>
    <circle cx="60" cy="68" r="5" fill="#fff"/>
    <circle cx="80" cy="68" r="5" fill="#fff"/>
    <circle cx="62" cy="69" r="2.5" fill="#3D3530"/>
    <circle cx="82" cy="69" r="2.5" fill="#3D3530"/>
    <circle cx="63" cy="68" r="1" fill="#fff"/>
    <circle cx="83" cy="68" r="1" fill="#fff"/>
    <circle cx="70" cy="82" r="4" fill="#F0EAE0" stroke="#D8D0C0" strokeWidth="0.8"/>
    <circle cx="68" cy="80" r="1.2" fill="#fff" opacity="0.7"/>
  </svg>
);

const SeaTurtle = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 140 140">
    <circle cx="70" cy="70" r="58" fill="#E0F2EC" stroke="#80C8A8" strokeWidth="1"/>
    <ellipse cx="70" cy="74" rx="30" ry="22" fill="#6DB890" stroke="#4A9870" strokeWidth="1.2"/>
    <ellipse cx="70" cy="68" rx="26" ry="20" fill="#88CCA8" stroke="#4A9870" strokeWidth="1.2"/>
    <path d="M70 52 L80 58 L80 68 L70 74 L60 68 L60 58Z" fill="#A0DCC0" stroke="#6DB890" strokeWidth="0.8"/>
    <path d="M60 58 L54 54 L48 58 L48 66 L54 70 L60 68" fill="none" stroke="#6DB890" strokeWidth="0.6"/>
    <path d="M80 58 L86 54 L92 58 L92 66 L86 70 L80 68" fill="none" stroke="#6DB890" strokeWidth="0.6"/>
    <ellipse cx="104" cy="72" rx="12" ry="9" fill="#7CC4A0" stroke="#4A9870" strokeWidth="1"/>
    <circle cx="110" cy="70" r="3" fill="#fff"/>
    <circle cx="111" cy="70" r="1.8" fill="#2D4A38"/>
    <circle cx="112" cy="69" r="0.7" fill="#fff"/>
    <path d="M108 75 C110 77, 114 77, 116 75" stroke="#3D6850" strokeWidth="1" strokeLinecap="round" fill="none"/>
    <path d="M44 66 C36 58, 30 60, 32 68 C34 72, 40 72, 44 70" fill="#6DB890" stroke="#4A9870" strokeWidth="1"/>
    <path d="M44 78 C36 84, 32 82, 34 76" fill="#6DB890" stroke="#4A9870" strokeWidth="0.8"/>
    <path d="M96 78 C100 84, 104 82, 102 76" fill="#6DB890" stroke="#4A9870" strokeWidth="0.8"/>
  </svg>
);

const SeahorseKnight = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 140 140">
    <circle cx="70" cy="70" r="58" fill="#E8ECFA" stroke="#8898D4" strokeWidth="1"/>
    <path d="M62 100 C56 108, 52 112, 56 116 C60 118, 64 114, 62 108 C60 104, 58 100, 60 96" fill="none" stroke="#6878B8" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M58 96 C54 88, 52 76, 54 64 C56 52, 62 44, 70 40 C78 44, 84 52, 84 64 C84 76, 80 88, 76 96Z" fill="#8898D4" stroke="#6878B8" strokeWidth="1.2"/>
    <path d="M62 90 C60 82, 60 72, 62 62 C64 54, 68 48, 70 46" fill="none" stroke="#A8B4E0" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="62" y1="88" x2="72" y2="88" stroke="#A8B4E0" strokeWidth="0.8"/>
    <line x1="60" y1="82" x2="72" y2="82" stroke="#A8B4E0" strokeWidth="0.8"/>
    <line x1="60" y1="76" x2="72" y2="76" stroke="#A8B4E0" strokeWidth="0.8"/>
    <path d="M70 40 C72 36, 78 32, 86 30 C88 30, 88 34, 86 36 C80 38, 74 40, 70 42" fill="#7888C8" stroke="#6878B8" strokeWidth="1"/>
    <path d="M66 44 C64 38, 60 32, 58 26" stroke="#A8B4E0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M68 42 C68 36, 66 28, 64 22" stroke="#A8B4E0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M70 40 C72 34, 72 26, 70 20" stroke="#A8B4E0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <circle cx="58" cy="24" r="2" fill="#C8D0F0"/>
    <circle cx="64" cy="20" r="2" fill="#C8D0F0"/>
    <circle cx="70" cy="18" r="2.5" fill="#C8D0F0"/>
    <circle cx="72" cy="46" r="4" fill="#fff"/>
    <circle cx="73" cy="46" r="2.2" fill="#2D304A"/>
    <circle cx="74" cy="45" r="0.8" fill="#fff"/>
    <path d="M78 56 C86 52, 90 58, 86 64 C90 62, 92 68, 88 74 C84 76, 82 72, 80 68" fill="#A0ACD8" stroke="#7888C8" strokeWidth="0.8"/>
  </svg>
);

const Griffin = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 140 140">
    <circle cx="70" cy="70" r="58" fill="#FFF4E4" stroke="#D4A860" strokeWidth="1"/>
    <path d="M40 80 C36 76, 34 70, 38 66 C42 62, 54 60, 62 62 L82 62 C88 60, 96 62, 98 68 C100 74, 96 80, 90 84 L46 84 C42 84, 40 82, 40 80Z" fill="#E0C080" stroke="#C4A060" strokeWidth="1.2"/>
    <path d="M48 84 L46 100 L42 100 L44 84" fill="#D8B468" stroke="#C4A060" strokeWidth="0.8"/>
    <path d="M60 84 L58 100 L54 100 L56 84" fill="#D8B468" stroke="#C4A060" strokeWidth="0.8"/>
    <path d="M80 84 L82 100 L78 100 L76 84" fill="#D8B468" stroke="#C4A060" strokeWidth="0.8"/>
    <path d="M42 100 L40 103 M44 100 L42 103 M46 100 L44 103" stroke="#C4A060" strokeWidth="0.8" strokeLinecap="round"/>
    <path d="M58 62 C52 48, 42 36, 32 30 C28 28, 26 32, 30 36 C24 34, 22 38, 26 42 C22 42, 22 46, 28 48 L44 58" fill="#F0DCA8" stroke="#D4A860" strokeWidth="1"/>
    <path d="M78 62 C82 48, 90 36, 100 32 C104 30, 106 34, 102 38 C108 36, 110 40, 106 44 C110 44, 110 48, 104 50 L90 58" fill="#F0DCA8" stroke="#D4A860" strokeWidth="1"/>
    <circle cx="70" cy="52" r="14" fill="#E8D098" stroke="#C4A060" strokeWidth="1.2"/>
    <path d="M66 52 L58 54 L66 56Z" fill="#E89040" stroke="#C87830" strokeWidth="0.8"/>
    <path d="M72 48 L78 46 L78 50Z" fill="#fff"/>
    <circle cx="76" cy="48" r="2" fill="#4A3820"/>
    <path d="M70 47 L79 45" stroke="#C4A060" strokeWidth="1" strokeLinecap="round"/>
    <path d="M74 40 C76 34, 80 32, 82 36" fill="#E0C080" stroke="#C4A060" strokeWidth="0.8"/>
    <path d="M66 40 C64 34, 60 34, 62 38" fill="#E0C080" stroke="#C4A060" strokeWidth="0.8"/>
    <path d="M40 80 C32 78, 26 82, 24 88 C22 92, 26 96, 30 94 C28 96, 30 100, 34 98" fill="#D8B468" stroke="#C4A060" strokeWidth="0.8"/>
  </svg>
);

const Phoenix = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 140 140">
    <circle cx="70" cy="70" r="58" fill="#FDE8E8" stroke="#D86050" strokeWidth="1"/>
    <path d="M40 90 C28 100, 20 108, 18 98 C16 92, 22 88, 28 90" fill="#F4A040" stroke="#D88030" strokeWidth="0.8"/>
    <path d="M36 92 C24 104, 14 110, 14 100 C14 94, 20 90, 26 92" fill="#E88040" stroke="#C06830" strokeWidth="0.8"/>
    <path d="M42 88 C34 96, 28 104, 30 108 C32 110, 36 106, 38 98" fill="#F9C848" stroke="#D4A030" strokeWidth="0.8"/>
    <path d="M44 86 C40 78, 42 66, 50 58 C58 50, 68 48, 76 52 C86 58, 90 70, 88 80 C86 88, 78 92, 70 92 C58 92, 48 90, 44 86Z" fill="#E85848" stroke="#C83838" strokeWidth="1.2"/>
    <path d="M56 86 C54 80, 54 72, 58 64 C62 58, 68 56, 72 58 C78 62, 80 70, 78 78 C76 84, 72 88, 66 88Z" fill="#F4A040"/>
    <path d="M62 84 C60 78, 62 70, 66 64 C68 60, 72 60, 74 64 C76 68, 74 76, 72 82Z" fill="#F9D054" opacity="0.7"/>
    <path d="M50 62 C42 52, 30 42, 20 38 C16 37, 16 42, 20 44 C16 44, 14 48, 20 50 L40 58" fill="#F08048" stroke="#D86040" strokeWidth="0.8"/>
    <path d="M82 62 C88 52, 98 44, 108 40 C112 39, 114 44, 110 46 C114 46, 116 50, 110 52 L92 58" fill="#F08048" stroke="#D86040" strokeWidth="0.8"/>
    <circle cx="70" cy="48" r="12" fill="#E85040" stroke="#C83838" strokeWidth="1"/>
    <path d="M64 38 C62 30, 58 24, 60 20 C62 18, 64 22, 66 28" fill="#F4A040" stroke="#D88030" strokeWidth="0.6"/>
    <path d="M70 36 C70 26, 68 18, 70 14 C72 12, 74 18, 72 26" fill="#F9D054" stroke="#D4A030" strokeWidth="0.6"/>
    <path d="M76 38 C78 30, 82 24, 80 20 C78 18, 76 22, 74 28" fill="#F4A040" stroke="#D88030" strokeWidth="0.6"/>
    <circle cx="74" cy="46" r="3.5" fill="#fff"/>
    <circle cx="75" cy="46" r="2" fill="#4A1810"/>
    <circle cx="76" cy="45" r="0.8" fill="#F9D054"/>
    <path d="M70 42 L79 40" stroke="#A02828" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M64 48 L58 50 L64 52Z" fill="#D88030" stroke="#B86820" strokeWidth="0.6"/>
  </svg>
);

const Dragon = ({ size = 40 }) => {
  const glowStyle = {
    filter: 'drop-shadow(0 0 6px #F4A63A) drop-shadow(0 0 14px #E8593C)',
    animation: 'dragonGlow 2.5s ease-in-out infinite'
  };
  return (
    <svg width={size} height={size} viewBox="0 0 140 140" style={glowStyle}>
      <circle cx="70" cy="70" r="58" fill="#2A1A30" stroke="#8840A0" strokeWidth="1.5"/>
      <path d="M38 58 C28 44, 18 34, 14 28 C12 24, 16 24, 18 28 C14 22, 18 20, 22 26 L38 48" fill="#6030A0" stroke="#8040C0" strokeWidth="0.8" opacity="0.8"/>
      <path d="M102 58 C112 44, 122 34, 126 28 C128 24, 124 24, 122 28 C126 22, 122 20, 118 26 L102 48" fill="#6030A0" stroke="#8040C0" strokeWidth="0.8" opacity="0.8"/>
      <path d="M50 88 C42 82, 40 72, 44 62 C48 52, 58 46, 70 44 C82 46, 92 52, 96 62 C100 72, 98 82, 90 88Z" fill="#5028A0" stroke="#7840C8" strokeWidth="1.2"/>
      <path d="M58 84 C56 78, 58 70, 62 62 C66 56, 70 52, 72 50" fill="none" stroke="#8858D0" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M58 82 L76 82" stroke="#7848C0" strokeWidth="0.6" opacity="0.5"/>
      <path d="M56 76 L78 76" stroke="#7848C0" strokeWidth="0.6" opacity="0.5"/>
      <path d="M58 70 L76 70" stroke="#7848C0" strokeWidth="0.6" opacity="0.5"/>
      <path d="M90 88 C100 92, 108 88, 112 82 C116 76, 118 72, 122 74" fill="none" stroke="#5028A0" strokeWidth="3" strokeLinecap="round"/>
      <path d="M122 74 L126 68 L120 72 L126 78Z" fill="#E85040" stroke="#C03030" strokeWidth="0.5"/>
      <path d="M54 48 C50 40, 50 32, 56 28 C62 24, 78 24, 84 28 C90 32, 90 40, 86 48Z" fill="#5828A8" stroke="#7840C8" strokeWidth="1.2"/>
      <path d="M58 30 C54 22, 50 14, 48 10" stroke="#C8A040" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M82 30 C86 22, 90 14, 92 10" stroke="#C8A040" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M60 38 L68 34 L68 42Z" fill="#F9D054"/>
      <circle cx="66" cy="38" r="2.2" fill="#E85040"/>
      <circle cx="66" cy="38" r="1" fill="#F9D054"/>
      <path d="M80 38 L72 34 L72 42Z" fill="#F9D054"/>
      <circle cx="74" cy="38" r="2.2" fill="#E85040"/>
      <circle cx="74" cy="38" r="1" fill="#F9D054"/>
      <ellipse cx="64" cy="44" rx="2" ry="1.2" fill="#3A1870"/>
      <ellipse cx="76" cy="44" rx="2" ry="1.2" fill="#3A1870"/>
      <path d="M60 48 L62 52 L64 48" fill="#F0E8F0" stroke="#D0C8D0" strokeWidth="0.3"/>
      <path d="M68 48 L70 53 L72 48" fill="#F0E8F0" stroke="#D0C8D0" strokeWidth="0.3"/>
      <path d="M76 48 L78 52 L80 48" fill="#F0E8F0" stroke="#D0C8D0" strokeWidth="0.3"/>
      <path d="M56 46 C48 42, 38 44, 30 50 C26 54, 28 58, 34 56 C28 60, 30 64, 38 62" fill="#F4A040" stroke="#E88030" strokeWidth="0.6" opacity="0.85"/>
      <path d="M56 46 C50 44, 42 46, 36 52 C34 56, 36 58, 38 56" fill="#F9D054" opacity="0.6"/>
      <path d="M66 26 L68 20 L70 26" fill="#8040C0" stroke="#6030A0" strokeWidth="0.5"/>
      <path d="M70 24 L72 18 L74 24" fill="#8040C0" stroke="#6030A0" strokeWidth="0.5"/>
      <path d="M54 88 L50 100 L46 100" stroke="#4820A0" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M86 88 L90 100 L94 100" stroke="#4820A0" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M46 100 L44 104 M48 100 L46 104" stroke="#C8A040" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M94 100 L96 104 M92 100 L94 104" stroke="#C8A040" strokeWidth="0.8" strokeLinecap="round"/>
    </svg>
  );
};

// Map rank names to components
const RANK_ICONS = {
  'Intern': BabyOyster,
  'Analyst': SeaTurtle,
  'Associate': SeahorseKnight,
  'Vice President': Griffin,
  'Partner': Phoenix,
  'Managing Partner': Dragon,
};

// Usage: const RankIcon = RANK_ICONS[currentRank]; return <RankIcon size={48} />;
```

### 2) ACHIEVEMENT STICKER ICONS — Replace all achievement emojis with these SVG components

Each takes a `size` prop (default 80). Replace wherever achievements are rendered.

```jsx
// ═══ ACHIEVEMENT STICKER COMPONENTS ═══

const StickerFirstWin = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#E8F5E0" stroke="#7CB868" strokeWidth="1.5"/>
    <path d="M50 75 L50 45" stroke="#5D8C4A" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
    <path d="M50 55 C40 45, 28 38, 22 28" stroke="#7CB868" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <ellipse cx="18" cy="24" rx="10" ry="14" fill="#A8D88E" transform="rotate(-25,18,24)"/>
    <path d="M50 48 C58 40, 68 35, 76 26" stroke="#7CB868" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <ellipse cx="80" cy="22" rx="10" ry="14" fill="#C5E8A8" transform="rotate(20,80,22)"/>
    <ellipse cx="42" cy="78" rx="18" ry="6" fill="#D4A574" opacity="0.4"/>
  </svg>
);

const StickerOnFire = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#FFF0E5" stroke="#E8875C" strokeWidth="1.5"/>
    <path d="M50 82 C30 72, 22 55, 26 40 C28 32, 34 28, 36 34 C36 24, 42 14, 50 10 C58 14, 64 24, 64 34 C66 28, 72 32, 74 40 C78 55, 70 72, 50 82Z" fill="#F4A63A"/>
    <path d="M50 82 C36 74, 32 60, 36 48 C38 42, 42 40, 44 44 C44 36, 48 28, 50 24 C52 28, 56 36, 56 44 C58 40, 62 42, 64 48 C68 60, 64 74, 50 82Z" fill="#E8723A"/>
    <path d="M50 82 C40 76, 38 66, 40 56 C42 50, 46 48, 48 52 C48 46, 50 40, 50 38 C50 40, 52 46, 52 52 C54 48, 58 50, 60 56 C62 66, 60 76, 50 82Z" fill="#F9CB5C"/>
    <circle cx="42" cy="54" r="3" fill="#fff" opacity="0.8"/>
    <circle cx="56" cy="50" r="2.5" fill="#fff" opacity="0.7"/>
  </svg>
);

const StickerUnstoppable = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#EDE8FE" stroke="#8B7ACC" strokeWidth="1.5"/>
    <path d="M50 16 C50 16, 34 34, 34 58 L42 62 L50 66 L58 62 L66 58 C66 34, 50 16, 50 16Z" fill="#F0F0F0" stroke="#8B7ACC" strokeWidth="1.2"/>
    <circle cx="50" cy="42" r="6" fill="#C5B8E8"/>
    <path d="M34 58 C28 56, 24 62, 28 68 L34 62Z" fill="#E8875C"/>
    <path d="M66 58 C72 56, 76 62, 72 68 L66 62Z" fill="#E8875C"/>
    <path d="M42 62 C44 70, 48 78, 50 82 C52 78, 56 70, 58 62" fill="#F4A63A"/>
    <path d="M46 62 C47 68, 49 74, 50 76 C51 74, 53 68, 54 62" fill="#F9CB5C"/>
  </svg>
);

const StickerLegendary = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#FFF8E0" stroke="#D4A840" strokeWidth="1.5"/>
    <path d="M50 14 L58 36 L82 36 L62 50 L70 74 L50 60 L30 74 L38 50 L18 36 L42 36Z" fill="#F9D054" stroke="#D4A840" strokeWidth="1"/>
    <circle cx="42" cy="42" r="2.5" fill="#6B5A28"/>
    <circle cx="58" cy="42" r="2.5" fill="#6B5A28"/>
    <path d="M44 52 C46 56, 54 56, 56 52" stroke="#6B5A28" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <ellipse cx="36" cy="48" rx="4" ry="2.5" fill="#F4A0A0" opacity="0.5"/>
    <ellipse cx="64" cy="48" rx="4" ry="2.5" fill="#F4A0A0" opacity="0.5"/>
  </svg>
);

const StickerLiquidationLord = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#E6F5EE" stroke="#4AA87C" strokeWidth="1.5"/>
    <path d="M30 50 C30 34, 38 26, 50 24 C62 26, 70 34, 70 50 C70 68, 62 78, 50 80 C38 78, 30 68, 30 50Z" fill="#7CC8A0" stroke="#4AA87C" strokeWidth="1.2"/>
    <path d="M40 24 C42 18, 46 14, 50 16 C54 14, 58 18, 60 24" stroke="#4AA87C" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <circle cx="50" cy="20" r="4" fill="#4AA87C"/>
    <text x="50" y="57" textAnchor="middle" fontFamily="inherit" fontSize="22" fontWeight="500" fill="#2D6E50">$</text>
  </svg>
);

const StickerDilutionShield = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#E6EFFA" stroke="#5A8EC4" strokeWidth="1.5"/>
    <path d="M50 14 L74 26 L74 50 C74 68, 62 80, 50 86 C38 80, 26 68, 26 50 L26 26Z" fill="#7BAEE0" stroke="#5A8EC4" strokeWidth="1.5"/>
    <path d="M50 22 L66 30 L66 50 C66 64, 58 72, 50 76 C42 72, 34 64, 34 50 L34 30Z" fill="#A8CFF0"/>
    <path d="M44 48 L48 54 L58 40" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

const StickerVSOPVirtuoso = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#F5EEFA" stroke="#9B7CC4" strokeWidth="1.5"/>
    <rect x="32" y="22" width="36" height="56" rx="3" fill="#F0E8F8" stroke="#9B7CC4" strokeWidth="1.2"/>
    <path d="M32 22 C32 22, 28 22, 28 26 L28 78 C28 82, 32 82, 32 82" fill="none" stroke="#9B7CC4" strokeWidth="1.2"/>
    <line x1="38" y1="34" x2="62" y2="34" stroke="#C4B0DE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="38" y1="42" x2="58" y2="42" stroke="#C4B0DE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="38" y1="50" x2="56" y2="50" stroke="#C4B0DE" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="38" y1="58" x2="52" y2="58" stroke="#C4B0DE" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M54 56 L64 46 L72 54 L62 64Z" fill="#D4C0F0" stroke="#9B7CC4" strokeWidth="1"/>
    <path d="M64 46 L68 42 L76 50 L72 54Z" fill="#9B7CC4"/>
  </svg>
);

const StickerExitArtist = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#FFF0E8" stroke="#D08050" strokeWidth="1.5"/>
    <rect x="32" y="24" width="30" height="54" rx="3" fill="#F4DCC8" stroke="#D08050" strokeWidth="1.2"/>
    <rect x="36" y="28" width="22" height="46" rx="2" fill="#E8C8A8"/>
    <circle cx="54" cy="52" r="2" fill="#D08050"/>
    <path d="M62 24 L72 34 L72 78 L62 78Z" fill="#DEB898" stroke="#D08050" strokeWidth="1"/>
    <path d="M66 40 L74 32" stroke="#F9D054" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M72 28 L78 24" stroke="#F9D054" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M74 40 L80 38" stroke="#F9D054" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="76" cy="30" r="1.5" fill="#F9D054"/>
    <circle cx="80" cy="42" r="1" fill="#F9D054"/>
  </svg>
);

const StickerSpeedDemon = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#FFF8E0" stroke="#D4A840" strokeWidth="1.5"/>
    <path d="M56 12 L32 46 L46 46 L42 88 L70 48 L54 48Z" fill="#F9D054" stroke="#D4A840" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M52 20 L38 44 L48 44 L46 72" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);

const StickerScholar = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#F0EAE0" stroke="#A08868" strokeWidth="1.5"/>
    <path d="M50 32 C40 28, 22 30, 20 34 L20 72 C22 68, 40 66, 50 70" fill="#F4E8D4" stroke="#A08868" strokeWidth="1.2"/>
    <path d="M50 32 C60 28, 78 30, 80 34 L80 72 C78 68, 60 66, 50 70" fill="#EDE0CC" stroke="#A08868" strokeWidth="1.2"/>
    <line x1="50" y1="32" x2="50" y2="70" stroke="#A08868" strokeWidth="1"/>
    <line x1="28" y1="42" x2="45" y2="44" stroke="#C4B098" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="28" y1="50" x2="45" y2="52" stroke="#C4B098" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="28" y1="58" x2="45" y2="60" stroke="#C4B098" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="55" y1="44" x2="72" y2="42" stroke="#C4B098" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="55" y1="52" x2="72" y2="50" stroke="#C4B098" strokeWidth="1.2" strokeLinecap="round"/>
    <line x1="55" y1="60" x2="72" y2="58" stroke="#C4B098" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const StickerCenturion = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#FCEAEA" stroke="#D05858" strokeWidth="1.5"/>
    <circle cx="50" cy="48" r="28" fill="#F0A0A0" stroke="#D05858" strokeWidth="1.5"/>
    <circle cx="50" cy="48" r="22" fill="#F4C0C0"/>
    <text x="50" y="54" textAnchor="middle" dominantBaseline="central" fontFamily="inherit" fontSize="18" fontWeight="500" fill="#8B2020">100</text>
    <path d="M36 18 L40 10 L44 18" fill="none" stroke="#D05858" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M48 12 L50 4 L52 12" fill="none" stroke="#D05858" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M56 18 L60 10 L64 18" fill="none" stroke="#D05858" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StickerPerfectionist = ({ size = 80 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="48" fill="#E8F5F0" stroke="#50A888" strokeWidth="1.5"/>
    <circle cx="50" cy="46" r="28" fill="#C0E8D8" stroke="#50A888" strokeWidth="1"/>
    <circle cx="50" cy="46" r="20" fill="#E0F4EC" stroke="#50A888" strokeWidth="1"/>
    <circle cx="50" cy="46" r="12" fill="#A0D8C0" stroke="#50A888" strokeWidth="1"/>
    <circle cx="50" cy="46" r="4" fill="#50A888"/>
    <path d="M50 20 L48 10 L52 10Z" fill="#F4A0A0"/>
    <line x1="50" y1="10" x2="50" y2="24" stroke="#D06060" strokeWidth="1.5"/>
  </svg>
);

// Map achievement IDs to sticker components
const ACHIEVEMENT_STICKERS = {
  'first_blood': StickerFirstWin,
  'on_fire': StickerOnFire,
  'unstoppable': StickerUnstoppable,
  'legendary': StickerLegendary,
  'liquidation_lord': StickerLiquidationLord,
  'dilution_shield': StickerDilutionShield,
  'vsop_virtuoso': StickerVSOPVirtuoso,
  'exit_artist': StickerExitArtist,
  'speed_demon': StickerSpeedDemon,
  'scholar': StickerScholar,
  'centurion': StickerCenturion,
  'perfectionist': StickerPerfectionist,
};
```

### 3) UI ICONS — Replace category/navigation emojis with these

```jsx
// ═══ UI ICON COMPONENTS ═══

const IconSwords = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80">
    <path d="M28 56 L52 24" stroke="#E8875C" strokeWidth="3" strokeLinecap="round"/>
    <path d="M46 28 L56 20 L52 24" fill="none" stroke="#E8875C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 52 L28 56 L32 52" fill="none" stroke="#E8875C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M52 56 L28 24" stroke="#D08050" strokeWidth="3" strokeLinecap="round"/>
    <path d="M34 28 L24 20 L28 24" fill="none" stroke="#D08050" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M56 52 L52 56 L48 52" fill="none" stroke="#D08050" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconDice = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80">
    <rect x="14" y="14" width="52" height="52" rx="10" fill="#EDE8FE" stroke="#8B7ACC" strokeWidth="1.5"/>
    <circle cx="28" cy="28" r="4" fill="#6B5AA0"/>
    <circle cx="52" cy="28" r="4" fill="#6B5AA0"/>
    <circle cx="28" cy="52" r="4" fill="#6B5AA0"/>
    <circle cx="52" cy="52" r="4" fill="#6B5AA0"/>
    <circle cx="40" cy="40" r="4" fill="#6B5AA0"/>
  </svg>
);

const IconBooks = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80">
    <rect x="18" y="16" width="12" height="48" rx="2" fill="#7CB868" stroke="#5D8C4A" strokeWidth="1"/>
    <rect x="34" y="10" width="12" height="54" rx="2" fill="#E8875C" stroke="#C06840" strokeWidth="1"/>
    <rect x="50" y="18" width="12" height="46" rx="2" fill="#5A8EC4" stroke="#3D6A98" strokeWidth="1"/>
    <line x1="14" y1="64" x2="66" y2="64" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const IconTrophy = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80">
    <path d="M26 20 L54 20 L50 44 L40 50 L30 44Z" fill="#F9D054" stroke="#D4A840" strokeWidth="1.2"/>
    <path d="M26 20 C18 20, 14 28, 16 36 C18 42, 24 42, 26 38" fill="none" stroke="#D4A840" strokeWidth="1.8"/>
    <path d="M54 20 C62 20, 66 28, 64 36 C62 42, 56 42, 54 38" fill="none" stroke="#D4A840" strokeWidth="1.8"/>
    <rect x="36" y="50" width="8" height="8" rx="1" fill="#D4A840"/>
    <rect x="30" y="58" width="20" height="5" rx="2.5" fill="#D4A840"/>
  </svg>
);
```

### 4) GLOBAL CSS — Add this dragon glow animation to the app

```css
@keyframes dragonGlow {
  0%, 100% { filter: drop-shadow(0 0 6px #F4A63A) drop-shadow(0 0 14px #E8593C); }
  50% { filter: drop-shadow(0 0 12px #F9D054) drop-shadow(0 0 22px #E8723A); }
}
```

### 5) WHAT TO REPLACE (mapping guide)

Wherever the current code renders an emoji or text character for these purposes, swap it:

| Current | Replace with |
|---------|-------------|
| Rank emoji/flag next to "Intern", "Analyst" etc. | `<BabyOyster size={48}/>`, `<SeaTurtle size={48}/>` etc. via `RANK_ICONS` map |
| Achievement emojis in the sticker/achievement grid | The matching `ACHIEVEMENT_STICKERS` component |
| ⚔️ or swords emoji (Start Training) | `<IconSwords size={32}/>` |
| 🎲 or dice emoji (Random Mix) | `<IconDice size={32}/>` |
| 📚 or books emoji (Library) | `<IconBooks size={32}/>` |
| 🏆 or trophy (Rank display) | `<IconTrophy size={32}/>` |
| Category emojis in question cards | Use relevant icons or the `IconSwords` for quiz, `IconBooks` for reference |

### 6) IMPORTANT RULES
- Keep ALL game logic, questions, scoring, XP system, localStorage, and resource library completely unchanged
- Only replace the visual icon layer
- Make locked/unearned achievements render at 40% opacity with a grayscale CSS filter
- The Dragon rank icon should have the glow animation — all others are static
- Render rank icons at size={48} in the stats bar, size={80} in profile/level-up screens
- Render achievement stickers at size={80} in the collection grid, size={40} in toast notifications

---
