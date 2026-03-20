# Termsheet Dojo — 16 Rank System + Icons Upgrade

## Prompt to paste into Replit:

---

**Replace the entire rank system with 16 ranks across 4 tiers. Replace all rank emojis/icons with the custom SVG React components below. Keep all game logic, questions, scoring, achievements, and resource library unchanged — only change the ranks and their icons.**

### New rank structure (replaces old 6-rank system):

| Tier | Rank | Creature | XP Required |
|------|------|----------|-------------|
| Origin | Intern | Baby Oyster | 0 |
| Origin | Trainee | Pufferfish | 100 |
| Origin | Junior Analyst | Octopus | 250 |
| Origin | Analyst | Shark | 500 |
| Predator | Senior Analyst | Wolf | 800 |
| Predator | Associate | Eagle | 1200 |
| Predator | Senior Associate | Lion | 1800 |
| Predator | Vice President | War Elephant | 2500 |
| Mythical | Senior VP | Griffin | 3500 |
| Mythical | Director | Kraken | 5000 |
| Mythical | Principal | Phoenix | 7000 |
| Legendary | Partner | Hydra | 10000 |
| Legendary | Senior Partner | Wyvern | 15000 |
| Legendary | Managing Partner | Ice Dragon | 20000 |
| Legendary | General Partner | Shadow Dragon | 30000 |
| Legendary | Founding Partner | Blood Dragon | 50000 |

### Rules:
- The last 5 ranks (Legendary tier) should have GLOWING animations — each progressively more intense
- The Blood Dragon (final rank) should pulse RED with a breathing/scale animation, menacing Game of Thrones style
- Legendary tier rank cards should have dark backgrounds (#1A0808 for blood dragon, dark purples/blues for others)
- All other tiers have light pastel backgrounds
- Update the XP progress bar to reflect the new 16-level system
- Show tier labels (Origin, Predator, Mythical, Legendary) in the UI where ranks are displayed

### Add this CSS for the legendary glow animations:

```css
@keyframes glowHydra {
  0%, 100% { filter: drop-shadow(0 0 4px #F4A040); }
  50% { filter: drop-shadow(0 0 10px #F9D054); }
}
@keyframes glowWyvern {
  0%, 100% { filter: drop-shadow(0 0 5px #8040C0); }
  50% { filter: drop-shadow(0 0 16px #A860E0); }
}
@keyframes glowIceDragon {
  0%, 100% { filter: drop-shadow(0 0 8px #4080F0); }
  50% { filter: drop-shadow(0 0 20px #60A0FF); }
}
@keyframes glowShadowDragon {
  0%, 100% { filter: drop-shadow(0 0 6px #7030A0); }
  50% { filter: drop-shadow(0 0 18px #9050D0); }
}
@keyframes glowBloodDragon {
  0%, 100% { filter: drop-shadow(0 0 10px #C01020) drop-shadow(0 0 24px #801010); }
  50% { filter: drop-shadow(0 0 20px #E03040) drop-shadow(0 0 40px #C01020); }
}
@keyframes dragonBreathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
@keyframes fireFlicker {
  0%, 100% { opacity: 0.7; transform: scaleY(1); }
  50% { opacity: 1; transform: scaleY(1.1); }
}
```

### SVG React Components for all 16 ranks:

```jsx
// ═══════════════════════════════════════════
// ORIGIN TIER
// ═══════════════════════════════════════════

const BabyOyster = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#EDE4F8" stroke="#D4C4E8" strokeWidth="0.8"/>
    <path d="M28 56 C28 72,38 82,50 82 C62 82,72 72,72 56Z" fill="#C8B8A0" stroke="#A89878" strokeWidth="1.2"/>
    <path d="M34 58 C40 68,44 74,50 78" stroke="#B8A888" strokeWidth="0.8" fill="none"/>
    <path d="M66 58 C60 68,56 74,50 78" stroke="#B8A888" strokeWidth="0.8" fill="none"/>
    <path d="M30 56 C30 40,38 30,50 28 C62 30,70 40,70 56Z" fill="#DDD4C0" stroke="#A89878" strokeWidth="1.2" transform="rotate(-8,50,56)"/>
    <circle cx="42" cy="52" r="4.5" fill="#fff"/><circle cx="58" cy="52" r="4.5" fill="#fff"/>
    <circle cx="43.5" cy="53" r="2.5" fill="#3D3530"/><circle cx="59.5" cy="53" r="2.5" fill="#3D3530"/>
    <circle cx="44.5" cy="51.5" r="1" fill="#fff"/><circle cx="60.5" cy="51.5" r="1" fill="#fff"/>
    <path d="M46 60 C48 62,52 62,54 60" stroke="#8B7860" strokeWidth="1" strokeLinecap="round" fill="none"/>
    <circle cx="50" cy="66" r="3.5" fill="#F0EAE0" stroke="#D8D0C0" strokeWidth="0.6"/>
  </svg>
);

const Pufferfish = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#FFF0E0" stroke="#E8C888" strokeWidth="0.8"/>
    <ellipse cx="50" cy="52" rx="20" ry="16" fill="#F8D878" stroke="#D8B050" strokeWidth="1.2"/>
    <ellipse cx="50" cy="52" rx="14" ry="12" fill="#FCE898"/>
    <path d="M30 52 C26 46,28 38,34 36 C30 42,32 48,36 50" fill="#F8D878" stroke="#D8B050" strokeWidth="0.8"/>
    <path d="M70 52 C74 46,72 38,66 36 C70 42,68 48,64 50" fill="#F8D878" stroke="#D8B050" strokeWidth="0.8"/>
    <path d="M36 64 L32 70 C30 74,34 76,36 72 L38 66" fill="#F8D878" stroke="#D8B050" strokeWidth="0.8"/>
    <path d="M64 64 L68 70 C70 74,66 76,64 72 L62 66" fill="#F8D878" stroke="#D8B050" strokeWidth="0.8"/>
    <circle cx="42" cy="46" r="4" fill="#fff"/><circle cx="58" cy="46" r="4" fill="#fff"/>
    <circle cx="43" cy="47" r="2.2" fill="#2A2010"/><circle cx="59" cy="47" r="2.2" fill="#2A2010"/>
    <path d="M46 56 C48 58,52 58,54 56" stroke="#A08040" strokeWidth="1" strokeLinecap="round" fill="none"/>
  </svg>
);

const Octopus = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#EAE0F8" stroke="#B8A0D8" strokeWidth="0.8"/>
    <ellipse cx="50" cy="55" rx="22" ry="18" fill="#9878C0" stroke="#7858A8" strokeWidth="1.2"/>
    <path d="M28 50 C18 44,14 50,20 56 C16 52,14 58,22 60" fill="#A888D0" stroke="#8068B8" strokeWidth="0.8"/>
    <path d="M72 50 C82 44,86 50,80 56 C84 52,86 58,78 60" fill="#A888D0" stroke="#8068B8" strokeWidth="0.8"/>
    <path d="M34 64 C28 72,24 68,28 62" fill="#A888D0" stroke="#8068B8" strokeWidth="0.8"/>
    <path d="M66 64 C72 72,76 68,72 62" fill="#A888D0" stroke="#8068B8" strokeWidth="0.8"/>
    <path d="M38 68 C34 76,36 78,40 74" fill="#A888D0" stroke="#8068B8" strokeWidth="0.6"/>
    <path d="M62 68 C66 76,64 78,60 74" fill="#A888D0" stroke="#8068B8" strokeWidth="0.6"/>
    <circle cx="40" cy="48" r="5" fill="#fff"/><circle cx="60" cy="48" r="5" fill="#fff"/>
    <circle cx="42" cy="48" r="2.8" fill="#1A1030"/><circle cx="62" cy="48" r="2.8" fill="#1A1030"/>
    <circle cx="43" cy="47" r="1" fill="#C8B0E0"/>
  </svg>
);

const Shark = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#E0ECF8" stroke="#88B0D8" strokeWidth="0.8"/>
    <path d="M18 50 C22 42,34 36,50 34 C66 36,78 42,82 50 C78 58,66 64,50 66 C34 64,22 58,18 50Z" fill="#5090C8" stroke="#3870A8" strokeWidth="1.2"/>
    <path d="M18 50 C22 44,34 40,50 38 C66 40,78 44,82 50" fill="#68A8D8"/>
    <path d="M82 50 L94 44 L94 56Z" fill="#5090C8" stroke="#3870A8" strokeWidth="0.8"/>
    <path d="M24 50 L18 44 L20 56Z" fill="#4080B8"/>
    <circle cx="74" cy="48" r="3.5" fill="#fff"/><circle cx="75" cy="48" r="2" fill="#0A2040"/>
    <path d="M36 52 L28 56 M36 50 L26 50 M36 48 L28 44" stroke="#68A8D8" strokeWidth="0.8" strokeLinecap="round"/>
    <path d="M60 48 L56 42 L64 44" fill="#fff" stroke="#3870A8" strokeWidth="0.6"/>
  </svg>
);

// ═══════════════════════════════════════════
// PREDATOR TIER
// ═══════════════════════════════════════════

const Wolf = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#EAEAEA" stroke="#B0B0B0" strokeWidth="0.8"/>
    <path d="M36 58 C32 52,34 42,40 36 C46 30,54 30,60 36 C66 42,68 52,64 58Z" fill="#808890" stroke="#606870" strokeWidth="1.2"/>
    <path d="M40 58 C38 54,40 46,44 40 C48 36,52 36,56 40 C60 46,62 54,60 58Z" fill="#A0A8B0"/>
    <path d="M36 58 L32 66 L42 62Z" fill="#808890" stroke="#606870" strokeWidth="0.6"/>
    <path d="M64 58 L68 66 L58 62Z" fill="#808890" stroke="#606870" strokeWidth="0.6"/>
    <circle cx="44" cy="42" r="3" fill="#F0E040"/><circle cx="44" cy="42" r="1.5" fill="#1A1A10"/>
    <circle cx="56" cy="42" r="3" fill="#F0E040"/><circle cx="56" cy="42" r="1.5" fill="#1A1A10"/>
    <path d="M46 50 L50 52 L54 50" stroke="#404040" strokeWidth="1" strokeLinecap="round" fill="none"/>
    <path d="M38 28 C40 20,44 18,46 22" stroke="#808890" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M62 28 C60 20,56 18,54 22" stroke="#808890" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M50 66 L50 80" stroke="#808890" strokeWidth="2" strokeLinecap="round"/>
    <path d="M50 80 C46 78,42 80,40 78 C38 76,42 74,44 76" fill="none" stroke="#808890" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const Eagle = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#FFF4DC" stroke="#D8C080" strokeWidth="0.8"/>
    <path d="M30 56 C22 44,26 32,36 28 L50 24 L64 28 C74 32,78 44,70 56Z" fill="#D8A840" stroke="#B88830" strokeWidth="1.2"/>
    <path d="M30 56 L22 60 L36 58" fill="#E8C060" stroke="#B88830" strokeWidth="0.6"/>
    <path d="M70 56 L78 60 L64 58" fill="#E8C060" stroke="#B88830" strokeWidth="0.6"/>
    <path d="M36 54 C38 60,44 64,50 64 C56 64,62 60,64 54" fill="#F0D878"/>
    <circle cx="42" cy="42" r="3.5" fill="#fff"/><circle cx="42" cy="42" r="2" fill="#1A1008"/>
    <circle cx="58" cy="42" r="3.5" fill="#fff"/><circle cx="58" cy="42" r="2" fill="#1A1008"/>
    <path d="M44 36 L38 32" stroke="#A08028" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M56 36 L62 32" stroke="#A08028" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M46 50 L50 48 L54 50" stroke="#8A6820" strokeWidth="1" strokeLinecap="round" fill="none"/>
    <path d="M42 66 L38 74 M50 68 L50 76 M58 66 L62 74" stroke="#D8A840" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const Lion = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#FAE8D4" stroke="#D8A868" strokeWidth="0.8"/>
    <path d="M30 54 C26 44,30 32,40 28 C46 24,54 24,60 28 C70 32,74 44,70 54Z" fill="#D8A040" stroke="#B88030" strokeWidth="1.2"/>
    <path d="M34 54 C36 60,42 64,50 66 C58 64,64 60,66 54" fill="#E8C068"/>
    <path d="M26 38 C22 30,24 24,30 22 C26 28,28 34,32 36" fill="#D8A040" stroke="#B88030" strokeWidth="0.8"/>
    <path d="M74 38 C78 30,76 24,70 22 C74 28,72 34,68 36" fill="#D8A040" stroke="#B88030" strokeWidth="0.8"/>
    <path d="M30 32 C24 26,20 20,22 16 C24 14,28 18,30 24" fill="#E8B850" stroke="#C09838" strokeWidth="0.6"/>
    <path d="M38 28 C36 20,38 14,42 14 C44 16,40 22,40 26" fill="#E8B850" stroke="#C09838" strokeWidth="0.6"/>
    <path d="M62 28 C64 20,62 14,58 14 C56 16,60 22,60 26" fill="#E8B850" stroke="#C09838" strokeWidth="0.6"/>
    <path d="M70 32 C76 26,80 20,78 16 C76 14,72 18,70 24" fill="#E8B850" stroke="#C09838" strokeWidth="0.6"/>
    <circle cx="42" cy="42" r="3.5" fill="#fff"/><circle cx="42" cy="42" r="2" fill="#2A1808"/>
    <circle cx="58" cy="42" r="3.5" fill="#fff"/><circle cx="58" cy="42" r="2" fill="#2A1808"/>
    <path d="M46 52 C48 54,52 54,54 52" stroke="#8A6020" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    <path d="M36 66 L34 76 M50 68 L50 78 M64 66 L66 76" stroke="#C09838" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const WarElephant = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#EAE4DA" stroke="#B8A888" strokeWidth="0.8"/>
    <path d="M30 60 C24 50,28 38,38 32 C44 28,56 28,62 32 C72 38,76 50,70 60Z" fill="#989088" stroke="#706860" strokeWidth="1.2"/>
    <path d="M36 60 C38 66,44 70,50 72 C56 70,62 66,64 60" fill="#A8A098"/>
    <path d="M70 60 L80 56 L80 64Z" fill="#887870"/>
    <path d="M36 32 C28 24,22 24,24 30 C20 26,18 32,24 34 L34 38" fill="#B0A898" stroke="#887870" strokeWidth="0.8"/>
    <path d="M64 32 C72 24,78 24,76 30 C80 26,82 32,76 34 L66 38" fill="#B0A898" stroke="#887870" strokeWidth="0.8"/>
    <rect x="44" y="26" width="12" height="8" rx="2" fill="#C8A040" stroke="#A08030" strokeWidth="0.6"/>
    <circle cx="42" cy="44" r="3" fill="#fff"/><circle cx="42" cy="44" r="1.8" fill="#1A1810"/>
    <circle cx="58" cy="44" r="3" fill="#fff"/><circle cx="58" cy="44" r="1.8" fill="#1A1810"/>
    <path d="M46 54 L44 52 L50 50 L56 52 L54 54" stroke="#706860" strokeWidth="0.8" fill="none"/>
    <path d="M36 72 L34 82 M50 74 L50 84 M64 72 L66 82" stroke="#887870" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// ═══════════════════════════════════════════
// MYTHICAL TIER
// ═══════════════════════════════════════════

const GriffinRank = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#FAF0DC" stroke="#D8B868" strokeWidth="0.8"/>
    <path d="M30 58 C24 48,28 36,38 30 L50 26 L62 30 C72 36,76 48,70 58Z" fill="#E0C080" stroke="#C4A060" strokeWidth="1.2"/>
    <path d="M34 30 C24 20,16 18,18 26 C12 22,10 28,18 32 L30 38" fill="#F0DCA0" stroke="#D8B868" strokeWidth="0.8"/>
    <path d="M66 30 C76 20,84 18,82 26 C88 22,90 28,82 32 L70 38" fill="#F0DCA0" stroke="#D8B868" strokeWidth="0.8"/>
    <path d="M38 58 C40 64,44 68,50 68 C56 68,60 64,62 58" fill="#F0D878"/>
    <circle cx="42" cy="42" r="3.5" fill="#fff"/><circle cx="42" cy="42" r="2" fill="#3A2810"/>
    <circle cx="58" cy="42" r="3.5" fill="#fff"/><circle cx="58" cy="42" r="2" fill="#3A2810"/>
    <path d="M64 40 L60 36" stroke="#C4A060" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M46 52 L44 50 L50 48 L56 50 L54 52" fill="#E08828" stroke="#C07020" strokeWidth="0.8"/>
    <path d="M36 68 L34 80 M50 70 L50 82 M64 68 L66 80" stroke="#C4A060" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const Kraken = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#E0EEF4" stroke="#70A8C8" strokeWidth="0.8"/>
    <ellipse cx="50" cy="46" rx="18" ry="16" fill="#3080A8" stroke="#205878" strokeWidth="1.2"/>
    <circle cx="42" cy="42" r="4" fill="#F0E040"/><circle cx="42" cy="42" r="2" fill="#0A2030"/>
    <circle cx="58" cy="42" r="4" fill="#F0E040"/><circle cx="58" cy="42" r="2" fill="#0A2030"/>
    <path d="M30 58 C22 64,16 56,20 50 C14 54,12 48,18 44" stroke="#4898B8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M70 58 C78 64,84 56,80 50 C86 54,88 48,82 44" stroke="#4898B8" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M36 62 C30 72,24 68,28 62" stroke="#4898B8" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M64 62 C70 72,76 68,72 62" stroke="#4898B8" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <path d="M40 64 C34 76,30 80,34 76" stroke="#4898B8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M60 64 C66 76,70 80,66 76" stroke="#4898B8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M44 64 C42 74,38 82,42 78" stroke="#4898B8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M56 64 C58 74,62 82,58 78" stroke="#4898B8" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
  </svg>
);

const PhoenixRank = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="46" fill="#FCE0DA" stroke="#E06050" strokeWidth="0.8"/>
    <path d="M30 64 C24 74,14 76,14 68 C14 62,20 60,24 64" fill="#F4A040" stroke="#D88030" strokeWidth="0.6"/>
    <path d="M34 66 C28 76,20 80,22 72" fill="#E87030" stroke="#C06020" strokeWidth="0.5"/>
    <path d="M36 60 C32 52,34 40,42 34 C48 28,52 28,58 34 C66 40,68 52,64 60Z" fill="#D83828" stroke="#B01818" strokeWidth="1.2"/>
    <path d="M42 58 C40 52,42 44,48 40 C52 36,58 40,58 46 C60 50,58 56,56 58" fill="#E86828"/>
    <path d="M46 56 C46 50,48 44,52 42 C54 44,54 50,52 56" fill="#F4B040" opacity="0.8"/>
    <path d="M34 38 C28 28,20 20,24 16 C26 14,30 20,30 28" fill="#F4A040" stroke="#D88030" strokeWidth="0.6"/>
    <path d="M42 32 C40 22,42 12,44 10 C46 12,46 22,44 28" fill="#F9D054" stroke="#D4A030" strokeWidth="0.5"/>
    <path d="M58 32 C60 22,58 12,56 10 C54 12,54 22,56 28" fill="#F4A040" stroke="#D88030" strokeWidth="0.6"/>
    <path d="M66 38 C72 28,80 20,76 16 C74 14,70 20,70 28" fill="#F4A040" stroke="#D88030" strokeWidth="0.6"/>
    <circle cx="44" cy="44" r="3.5" fill="#fff"/><circle cx="44" cy="44" r="2" fill="#3A0808"/>
    <circle cx="56" cy="44" r="3.5" fill="#fff"/><circle cx="56" cy="44" r="2" fill="#3A0808"/>
    <circle cx="45" cy="43" r="0.8" fill="#F9D054"/>
    <path d="M42 38 L52 36 M58 38 L48 36" stroke="#801010" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

// ═══════════════════════════════════════════
// LEGENDARY TIER (all glow)
// ═══════════════════════════════════════════

const Hydra = ({ size = 40 }) => {
  const glow = { animation: 'glowHydra 2.5s ease-in-out infinite' };
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={glow}>
      <circle cx="50" cy="50" r="46" fill="#2A2010" stroke="#806020" strokeWidth="1.2"/>
      <path d="M30 54 C26 44,30 32,40 28 C46 24,54 24,60 28 C70 32,74 44,70 54Z" fill="#806020" stroke="#604810" strokeWidth="1"/>
      <path d="M40 28 C36 20,30 14,32 10 C34 8,38 14,38 22" fill="#A08030" stroke="#806020" strokeWidth="0.8"/>
      <path d="M60 28 C64 20,70 14,68 10 C66 8,62 14,62 22" fill="#A08030" stroke="#806020" strokeWidth="0.8"/>
      <path d="M48 28 C48 20,46 12,48 8 C50 6,52 12,50 22" fill="#C0A040" stroke="#806020" strokeWidth="0.6"/>
      <circle cx="42" cy="40" r="3" fill="#F0D060"/><circle cx="42" cy="40" r="1.5" fill="#201008"/>
      <circle cx="58" cy="40" r="3" fill="#F0D060"/><circle cx="58" cy="40" r="1.5" fill="#201008"/>
      <path d="M44 48 L50 52 L56 48" fill="#604010" stroke="#402808" strokeWidth="0.8"/>
      <path d="M70 54 C78 58,84 52,80 46 C86 50,86 58,78 60" fill="#806020" stroke="#604810" strokeWidth="0.6"/>
      <path d="M30 54 C22 58,16 52,20 46 C14 50,14 58,22 60" fill="#806020" stroke="#604810" strokeWidth="0.6"/>
    </svg>
  );
};

const Wyvern = ({ size = 40 }) => {
  const glow = { animation: 'glowWyvern 2s ease-in-out infinite' };
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={glow}>
      <circle cx="50" cy="50" r="46" fill="#1A1020" stroke="#6030A0" strokeWidth="1.2"/>
      <path d="M30 58 C26 46,30 34,40 28 C48 24,52 24,60 28 C70 34,74 46,70 58Z" fill="#4020A0" stroke="#6040C0" strokeWidth="1"/>
      <path d="M36 58 C38 66,44 70,50 72 C56 70,62 66,64 58" fill="#5030B0"/>
      <path d="M30 32 C20 18,14 14,18 24 C12 18,14 28,24 32" fill="#5030B0" stroke="#4020A0" strokeWidth="0.8"/>
      <path d="M70 32 C80 18,86 14,82 24 C88 18,86 28,76 32" fill="#5030B0" stroke="#4020A0" strokeWidth="0.8"/>
      <path d="M42 24 C38 14,36 8,40 6" stroke="#C8A0F0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M58 24 C62 14,64 8,60 6" stroke="#C8A0F0" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="42" cy="40" r="3" fill="#C080F0"/><circle cx="42" cy="40" r="1.5" fill="#F0D0FF"/>
      <circle cx="58" cy="40" r="3" fill="#C080F0"/><circle cx="58" cy="40" r="1.5" fill="#F0D0FF"/>
      <path d="M46 50 L50 54 L54 50" fill="#2A1060" stroke="#4020A0" strokeWidth="0.8"/>
      <path d="M50 72 L50 82 C46 86,42 84,44 80" stroke="#4020A0" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  );
};

const IceDragon = ({ size = 40 }) => {
  const glow = { animation: 'glowIceDragon 2.5s ease-in-out infinite' };
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={glow}>
      <circle cx="50" cy="50" r="46" fill="#0A1020" stroke="#3060C0" strokeWidth="1.2"/>
      <path d="M30 58 C26 46,30 34,40 28 C48 24,52 24,60 28 C70 34,74 46,70 58Z" fill="#1840A0" stroke="#3060C0" strokeWidth="1"/>
      <path d="M30 32 C20 18,14 14,18 24 C12 18,14 28,24 32" fill="#2050B0" stroke="#1840A0" strokeWidth="0.8"/>
      <path d="M70 32 C80 18,86 14,82 24 C88 18,86 28,76 32" fill="#2050B0" stroke="#1840A0" strokeWidth="0.8"/>
      <path d="M42 24 C38 12,34 4,38 2" stroke="#80C0FF" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M58 24 C62 12,66 4,62 2" stroke="#80C0FF" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="42" cy="40" r="3" fill="#60B0F0"/><circle cx="42" cy="40" r="1.5" fill="#E0F0FF"/>
      <circle cx="58" cy="40" r="3" fill="#60B0F0"/><circle cx="58" cy="40" r="1.5" fill="#E0F0FF"/>
      <path d="M36 52 C30 48,22 50,18 56 C16 60,20 62,24 58" fill="#40A0E0" stroke="#2080C0" strokeWidth="0.5" opacity="0.8"/>
      <path d="M36 52 C32 50,26 52,24 56" fill="#80D0FF" opacity="0.4"/>
      <path d="M46 50 L50 54 L54 50" fill="#0A2050" stroke="#1840A0" strokeWidth="0.8"/>
    </svg>
  );
};

const ShadowDragon = ({ size = 40 }) => {
  const glow = { animation: 'glowShadowDragon 2s ease-in-out infinite' };
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={glow}>
      <circle cx="50" cy="50" r="46" fill="#10081A" stroke="#5020A0" strokeWidth="1.2"/>
      <circle cx="50" cy="50" r="42" fill="none" stroke="#6030B0" strokeWidth="0.3" opacity="0.4"/>
      <path d="M30 58 C26 46,30 34,40 28 C48 24,52 24,60 28 C70 34,74 46,70 58Z" fill="#2A1060" stroke="#5030A0" strokeWidth="1"/>
      <path d="M30 32 C20 18,14 14,18 24 C12 18,10 22,14 28 C8 26,10 32,20 34 L28 36" fill="#3818A0" stroke="#5030A0" strokeWidth="0.6"/>
      <path d="M70 32 C80 18,86 14,82 24 C88 18,90 22,86 28 C92 26,90 32,80 34 L72 36" fill="#3818A0" stroke="#5030A0" strokeWidth="0.6"/>
      <path d="M42 24 C38 12,34 4,38 0" stroke="#B080E0" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M58 24 C62 12,66 4,62 0" stroke="#B080E0" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M48 22 C48 14,46 6,48 2" stroke="#D0A0F0" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <circle cx="42" cy="40" r="3.5" fill="#A060E0"/><circle cx="42" cy="40" r="1.5" fill="#E0D0FF"/>
      <circle cx="58" cy="40" r="3.5" fill="#A060E0"/><circle cx="58" cy="40" r="1.5" fill="#E0D0FF"/>
      <path d="M36 52 C28 48,18 52,14 58 C12 64,18 66,24 60 C18 68,22 72,30 68" fill="#8040E0" stroke="#6030C0" strokeWidth="0.5" opacity="0.7"/>
      <path d="M46 50 L50 56 L54 50" fill="#1A0840" stroke="#3018A0" strokeWidth="0.8"/>
    </svg>
  );
};

const BloodDragon = ({ size = 40 }) => {
  const glow = { animation: 'glowBloodDragon 1.8s ease-in-out infinite' };
  const breathe = { animation: 'dragonBreathe 4s ease-in-out infinite' };
  return (
    <div style={{...glow, ...breathe, display: 'inline-block'}}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="46" fill="#1A0808" stroke="#C01020" strokeWidth="1.5"/>
        <circle cx="50" cy="50" r="42" fill="none" stroke="#E03040" strokeWidth="0.4" opacity="0.3"/>
        <circle cx="50" cy="50" r="38" fill="none" stroke="#F04050" strokeWidth="0.2" opacity="0.15"/>
        <path d="M26 58 C20 44,26 28,38 22 C46 18,54 18,62 22 C74 28,80 44,74 58Z" fill="#801018" stroke="#B01820" strokeWidth="1.5"/>
        <path d="M34 58 C36 66,42 72,50 74 C58 72,64 66,66 58" fill="#A01820"/>
        <path d="M38 58 L78 58" stroke="#601018" strokeWidth="0.4" opacity="0.5"/>
        <path d="M40 64 L76 64" stroke="#601018" strokeWidth="0.4" opacity="0.4"/>
        <path d="M42 70 L74 70" stroke="#601018" strokeWidth="0.4" opacity="0.3"/>
        <path d="M26 28 C14 12,6 6,10 18 C4 10,2 18,10 24 C4 22,4 28,12 30 C6 30,8 36,18 34 L26 34" fill="#601018" stroke="#901020" strokeWidth="0.8"/>
        <path d="M74 28 C86 12,94 6,90 18 C96 10,98 18,90 24 C96 22,96 28,88 30 C94 30,92 36,82 34 L74 34" fill="#601018" stroke="#901020" strokeWidth="0.8"/>
        <path d="M40 20 C36 8,30 0,34 -4" stroke="#F08030" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M60 20 C64 8,70 0,66 -4" stroke="#F08030" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M50 18 C50 6,48 -2,50 -6" stroke="#F0D040" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M46 18 L48 10 L50 18" fill="#C01020" stroke="#901018" strokeWidth="0.4"/>
        <path d="M50 16 L52 8 L54 16" fill="#C01020" stroke="#901018" strokeWidth="0.4"/>
        <path d="M56 18 L58 12 L60 18" fill="#C01020" stroke="#901018" strokeWidth="0.4"/>
        <path d="M38 34 L48 26 L48 42Z" fill="#F0D040"/>
        <circle cx="46" cy="34" r="3.5" fill="#F02020"/>
        <circle cx="46" cy="34" r="1.5" fill="#F0D040"/>
        <path d="M62 34 L52 26 L52 42Z" fill="#F0D040"/>
        <circle cx="54" cy="34" r="3.5" fill="#F02020"/>
        <circle cx="54" cy="34" r="1.5" fill="#F0D040"/>
        <ellipse cx="44" cy="46" rx="2.5" ry="1.5" fill="#400808"/>
        <ellipse cx="56" cy="46" rx="2.5" ry="1.5" fill="#400808"/>
        <path d="M40 50 L42 56 L44 50" fill="#F0D8D0"/>
        <path d="M46 51 L48 58 L50 51" fill="#F0D8D0"/>
        <path d="M50 51 L52 58 L54 51" fill="#F0D8D0"/>
        <path d="M56 50 L58 56 L60 50" fill="#F0D8D0"/>
        <path d="M34 50 C26 44,14 46,8 54 C4 60,8 66,16 60 C8 66,12 74,22 68 C16 74,22 78,30 72" fill="#F04030" stroke="#C02020" strokeWidth="0.5" opacity="0.9"/>
        <path d="M34 50 C28 48,18 50,14 56 C12 62,16 64,20 58" fill="#F08030" opacity="0.7"/>
        <path d="M74 58 C84 62,92 56,96 48 C98 42,102 38,108 40" fill="none" stroke="#801018" strokeWidth="3.5" strokeLinecap="round"/>
        <path d="M108 40 L112 32 L106 38 L114 46Z" fill="#F04030" stroke="#C02020" strokeWidth="0.5"/>
        <path d="M36 74 L32 86" stroke="#601018" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M64 74 L68 86" stroke="#601018" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M32 86 L28 92 M34 86 L30 92" stroke="#F08030" strokeWidth="1" strokeLinecap="round"/>
        <path d="M68 86 L72 92 M66 86 L70 92" stroke="#F08030" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    </div>
  );
};

// ═══════════════════════════════════════════
// RANK MAPPING
// ═══════════════════════════════════════════

const RANKS = [
  { name: 'Intern', creature: 'Baby Oyster', xp: 0, tier: 'Origin', component: BabyOyster },
  { name: 'Trainee', creature: 'Pufferfish', xp: 100, tier: 'Origin', component: Pufferfish },
  { name: 'Junior Analyst', creature: 'Octopus', xp: 250, tier: 'Origin', component: Octopus },
  { name: 'Analyst', creature: 'Shark', xp: 500, tier: 'Origin', component: Shark },
  { name: 'Senior Analyst', creature: 'Wolf', xp: 800, tier: 'Predator', component: Wolf },
  { name: 'Associate', creature: 'Eagle', xp: 1200, tier: 'Predator', component: Eagle },
  { name: 'Senior Associate', creature: 'Lion', xp: 1800, tier: 'Predator', component: Lion },
  { name: 'Vice President', creature: 'War Elephant', xp: 2500, tier: 'Predator', component: WarElephant },
  { name: 'Senior VP', creature: 'Griffin', xp: 3500, tier: 'Mythical', component: GriffinRank },
  { name: 'Director', creature: 'Kraken', xp: 5000, tier: 'Mythical', component: Kraken },
  { name: 'Principal', creature: 'Phoenix', xp: 7000, tier: 'Mythical', component: PhoenixRank },
  { name: 'Partner', creature: 'Hydra', xp: 10000, tier: 'Legendary', component: Hydra },
  { name: 'Senior Partner', creature: 'Wyvern', xp: 15000, tier: 'Legendary', component: Wyvern },
  { name: 'Managing Partner', creature: 'Ice Dragon', xp: 20000, tier: 'Legendary', component: IceDragon },
  { name: 'General Partner', creature: 'Shadow Dragon', xp: 30000, tier: 'Legendary', component: ShadowDragon },
  { name: 'Founding Partner', creature: 'Blood Dragon', xp: 50000, tier: 'Legendary', component: BloodDragon },
];

// Helper to get current rank from XP
const getCurrentRank = (xp) => {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].xp) return RANKS[i];
  }
  return RANKS[0];
};

// Helper to get next rank
const getNextRank = (xp) => {
  for (let i = 0; i < RANKS.length; i++) {
    if (xp < RANKS[i].xp) return RANKS[i];
  }
  return null; // max rank
};

// Usage:
// const rank = getCurrentRank(playerXP);
// const RankIcon = rank.component;
// return <RankIcon size={48} />;
```

### Display rules for Legendary tier:
- Legendary rank cards should have dark backgrounds
- Partner (Hydra): background #2A2010, border #806020
- Senior Partner (Wyvern): background #1A1020, border #6030A0
- Managing Partner (Ice Dragon): background #0A1020, border #3060C0
- General Partner (Shadow Dragon): background #10081A, border #5020A0
- Founding Partner (Blood Dragon): background #1A0808, border #C01020
- All Legendary rank text should be light colored to contrast with dark backgrounds

---
