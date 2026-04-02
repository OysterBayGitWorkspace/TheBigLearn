import { ALL_QUESTIONS } from './questions';

export const ACHIEVEMENTS = [
  { id: "first_blood", name: "First Win", desc: "Answer correctly", bgColor: "#E8F5F1", borderColor: "#5BB5A2", condition: s => s.totalCorrect >= 1 },
  { id: "streak_5", name: "On Fire", desc: "5 in a row", bgColor: "#FFF0EB", borderColor: "#FF7B54", condition: s => s.bestStreak >= 5 },
  { id: "streak_10", name: "Unstoppable", desc: "10 in a row", bgColor: "#F0EBF5", borderColor: "#B8A0D2", condition: s => s.bestStreak >= 10 },
  { id: "streak_20", name: "Legendary", desc: "20 in a row", bgColor: "#FFF8E7", borderColor: "#F4D06F", condition: s => s.bestStreak >= 20 },
  { id: "cat_master_lp", name: "Liquidation Lord", desc: "Master LP", bgColor: "#FFF0EB", borderColor: "#FF7B54", condition: s => ALL_QUESTIONS.filter(q => q.category==="Liquidation Preferences" && s.questionProgress && s.questionProgress[q.id] && s.questionProgress[q.id].isMastered).length >= 8 },
  { id: "cat_master_ad", name: "Dilution Shield", desc: "Master AD", bgColor: "#E8F5F1", borderColor: "#5BB5A2", condition: s => ALL_QUESTIONS.filter(q => q.category==="Anti-Dilution" && s.questionProgress && s.questionProgress[q.id] && s.questionProgress[q.id].isMastered).length >= 8 },
  { id: "cat_master_vsop", name: "VSOP Virtuoso", desc: "Master VSOP", bgColor: "#F0EBF5", borderColor: "#B8A0D2", condition: s => ALL_QUESTIONS.filter(q => q.category==="ESOP & VSOP" && s.questionProgress && s.questionProgress[q.id] && s.questionProgress[q.id].isMastered).length >= 8 },
  { id: "cat_master_exit", name: "Exit Artist", desc: "Master Exit", bgColor: "#FDECEE", borderColor: "#E8626C", condition: s => ALL_QUESTIONS.filter(q => q.category==="Exit & Transfer Rights" && s.questionProgress && s.questionProgress[q.id] && s.questionProgress[q.id].isMastered).length >= 8 },
  { id: "speed_demon", name: "Speed Demon", desc: "5 fast answers", bgColor: "#FFF8E7", borderColor: "#F4D06F", condition: s => s.fastAnswers >= 5 },
  { id: "scholar", name: "Scholar", desc: "Visit library", bgColor: "#E8F5F1", borderColor: "#5BB5A2", condition: s => s.libraryViewed },
  { id: "centurion", name: "Centurion", desc: "100 answers", bgColor: "#FFF0EB", borderColor: "#FF7B54", condition: s => s.totalAnswered >= 100 },
  { id: "perfectionist", name: "Perfectionist", desc: "Perfect round", bgColor: "#F0EBF5", borderColor: "#B8A0D2", condition: s => s.perfectRounds >= 1 },
];
