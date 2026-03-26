import { ALL_QUESTIONS } from './questions.js';

export const TOPICS = [
  { id: "val", name: "Valuation & Economics", tier: 1, prerequisites: [], categories: ["Valuation & Economics"] },
  { id: "esop", name: "ESOP & VSOP", tier: 1, prerequisites: [], categories: ["ESOP & VSOP"] },
  { id: "found", name: "Foundational VC Knowledge", tier: 1, prerequisites: [], categories: ["German / DACH Market", "Online Resources", "Legal Deep Dives", "Foundational VC Knowledge"] },
  { id: "lp", name: "Liquidation Preferences", tier: 2, prerequisites: ["val"], categories: ["Liquidation Preferences"] },
  { id: "ad", name: "Anti-Dilution", tier: 2, prerequisites: ["val"], categories: ["Anti-Dilution"] },
  { id: "pre", name: "Pre-emption & Pro-rata", tier: 2, prerequisites: ["val"], categories: ["Pre-emption & Pro-rata"] },
  { id: "gov", name: "Governance & Control", tier: 2, prerequisites: ["esop"], categories: ["Governance & Control"] },
  { id: "fund", name: "Fund Mechanics", tier: 2, prerequisites: ["val"], categories: ["Fund Mechanics"] },
  { id: "neg", name: "Negotiation Tactics", tier: 2, prerequisites: ["val"], categories: ["Negotiation Tactics"] },
  { id: "exit", name: "Exit & Transfer Rights", tier: 3, prerequisites: ["lp", "gov"], categories: ["Exit & Transfer Rights"] },
  { id: "conv", name: "Convertible Instruments", tier: 3, prerequisites: ["ad", "val"], categories: ["Convertible Instruments"] },
  { id: "adv", name: "Advanced Scenarios", tier: 3, prerequisites: ["lp", "ad", "exit"], categories: ["Advanced Scenarios"] },
];

const topicIndex = new Map(TOPICS.map(t => [t.id, t]));

// Build category -> topic lookup
const categoryToTopic = new Map();
for (const topic of TOPICS) {
  for (const cat of topic.categories) {
    categoryToTopic.set(cat, topic);
  }
}

export function getQuestionsForTopic(topicId) {
  const topic = topicIndex.get(topicId);
  if (!topic) return [];
  return ALL_QUESTIONS.filter(q => topic.categories.includes(q.category));
}

export function getTopicForCategory(category) {
  return categoryToTopic.get(category) || null;
}

export function isTopicUnlocked(topicId, cardStates) {
  const topic = topicIndex.get(topicId);
  if (!topic) return false;

  // Tier 1 always unlocked
  if (topic.tier === 1) return true;

  // Migration UX: if user has ANY cards in this topic, keep it unlocked
  const topicQuestions = getQuestionsForTopic(topicId);
  const hasExistingProgress = topicQuestions.some(q => cardStates[q.id] && cardStates[q.id].state > 0);
  if (hasExistingProgress) return true;

  // Check all prerequisites are mastered
  return topic.prerequisites.every(preId => isTopicMastered(preId, cardStates));
}

export function isTopicMastered(topicId, cardStates) {
  const { total, mastered, percent } = getTopicProgress(topicId, cardStates);
  return total > 0 && percent >= 80;
}

export function getTopicProgress(topicId, cardStates) {
  const topicQuestions = getQuestionsForTopic(topicId);
  const total = topicQuestions.length;
  const mastered = topicQuestions.filter(q => {
    const card = cardStates[q.id];
    // state >= 2 means Review or Relearning
    return card && card.state >= 2;
  }).length;
  const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;
  return { total, mastered, percent };
}
