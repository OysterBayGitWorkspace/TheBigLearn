import {
  BabyOyster,
  Pufferfish,
  Octopus,
  Shark,
  Wolf,
  Eagle,
  Lion,
  WarElephant,
  GriffinRank,
  Kraken,
  PhoenixRank,
  Hydra,
  Wyvern,
  IceDragon,
  ShadowDragon,
  BloodDragon,
} from "../icons/creatures";

export const RANKS = [
  { name: 'Intern', creature: 'Baby Oyster', xp: 0, tier: 'Origin', component: BabyOyster, color: '#8C8C8C', bg: '#F0EDEA', subtitle: 'Fresh off the bench' },
  { name: 'Trainee', creature: 'Pufferfish', xp: 100, tier: 'Origin', component: Pufferfish, color: '#D8B050', bg: '#FFF0E0', subtitle: 'Learning the lingo' },
  { name: 'Junior Analyst', creature: 'Octopus', xp: 250, tier: 'Origin', component: Octopus, color: '#9878C0', bg: '#EAE0F8', subtitle: 'Reading term sheets at night' },
  { name: 'Analyst', creature: 'Shark', xp: 500, tier: 'Origin', component: Shark, color: '#5090C8', bg: '#E0ECF8', subtitle: 'Term sheets don\'t scare you' },
  { name: 'Senior Analyst', creature: 'Wolf', xp: 800, tier: 'Predator', component: Wolf, color: '#808890', bg: '#EAEAEA', subtitle: 'Running in packs' },
  { name: 'Associate', creature: 'Eagle', xp: 1200, tier: 'Predator', component: Eagle, color: '#D8A840', bg: '#FFF4DC', subtitle: 'Founders CC you' },
  { name: 'Senior Associate', creature: 'Lion', xp: 1800, tier: 'Predator', component: Lion, color: '#D8A040', bg: '#FAE8D4', subtitle: 'King of the jungle' },
  { name: 'Vice President', creature: 'War Elephant', xp: 2500, tier: 'Predator', component: WarElephant, color: '#989088', bg: '#EAE4DA', subtitle: 'Redlining for breakfast' },
  { name: 'Senior VP', creature: 'Griffin', xp: 3500, tier: 'Mythical', component: GriffinRank, color: '#E0C080', bg: '#FAF0DC', subtitle: 'Half eagle, half lion, all deal' },
  { name: 'Director', creature: 'Kraken', xp: 5000, tier: 'Mythical', component: Kraken, color: '#3080A8', bg: '#E0EEF4', subtitle: 'Tentacles in every deal' },
  { name: 'Principal', creature: 'Phoenix', xp: 7000, tier: 'Mythical', component: PhoenixRank, color: '#D83828', bg: '#FCE0DA', subtitle: 'Rising from the ashes' },
  { name: 'Partner', creature: 'Hydra', xp: 10000, tier: 'Legendary', component: Hydra, color: '#F0D060', bg: '#2A2010', subtitle: 'Cut one head, two grow back', border: '#806020' },
  { name: 'Senior Partner', creature: 'Wyvern', xp: 15000, tier: 'Legendary', component: Wyvern, color: '#C080F0', bg: '#1A1020', subtitle: 'Wings of vengeance', border: '#6030A0' },
  { name: 'Managing Partner', creature: 'Ice Dragon', xp: 20000, tier: 'Legendary', component: IceDragon, color: '#60B0F0', bg: '#0A1020', subtitle: 'Frozen markets tremble', border: '#3060C0' },
  { name: 'General Partner', creature: 'Shadow Dragon', xp: 30000, tier: 'Legendary', component: ShadowDragon, color: '#A060E0', bg: '#10081A', subtitle: 'Darkness descends on deals', border: '#5020A0' },
  { name: 'Founding Partner', creature: 'Blood Dragon', xp: 50000, tier: 'Legendary', component: BloodDragon, color: '#F02020', bg: '#1A0808', subtitle: 'You ARE the term sheet', border: '#C01020' },
];

export const getLevel = xp => { for (let i = RANKS.length - 1; i >= 0; i--) { if (xp >= RANKS[i].xp) return RANKS[i]; } return RANKS[0]; };
export const getNextLevel = xp => { for (const r of RANKS) { if (xp < r.xp) return r; } return null; };
