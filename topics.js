import { ALL_QUESTIONS } from './questions.js';

export const TIERS = [
  {
    id: "basics",
    name: "Basics",
    tier: 1,
    description: "Pure definitions — What is X?",
    icon: "book",
    color: { bg: 'var(--lavender-soft)', border: 'var(--lavender)', label: 'var(--lavender)' },
    unlockRequirement: null,
    masteryThreshold: 3, // Must get each question correct 3 times
  },
  {
    id: "foundations",
    name: "Foundations",
    tier: 2,
    description: "Compare, differentiate, recognize patterns",
    icon: "book",
    color: { bg: 'var(--teal-soft)', border: 'var(--teal)', label: 'var(--teal)' },
    unlockRequirement: { tierId: "basics", percent: 100 }, // Must master ALL basics
  },
  {
    id: "intermediate",
    name: "Intermediate",
    tier: 3,
    description: "Apply knowledge, calculations, short scenarios",
    icon: "brain",
    color: { bg: 'var(--sand-soft)', border: '#D8B050', label: '#C5A43E' },
    unlockRequirement: { tierId: "foundations", percent: 70 },
  },
  {
    id: "advanced",
    name: "Advanced",
    tier: 4,
    description: "Complex scenarios, time pressure, edge cases",
    icon: "fire",
    color: { bg: 'var(--rose-soft)', border: 'var(--rose)', label: 'var(--rose)' },
    unlockRequirement: { tierId: "intermediate", percent: 70 },
  },
];

const tierIndex = new Map(TIERS.map(t => [t.id, t]));

// Map difficulty level to tier ID
// difficulty 0 = Basics (pure definitions)
// difficulty 1 = Foundations (applied basics)
// difficulty 2 = Intermediate
// difficulty 3 = Advanced
const difficultyToTierId = {
  0: "basics",
  1: "foundations",
  2: "intermediate",
  3: "advanced",
};

export function getQuestionsForTier(tierId) {
  const tier = tierIndex.get(tierId);
  if (!tier) return [];
  return ALL_QUESTIONS.filter(q => difficultyToTierId[q.difficulty] === tierId);
}

export function getMasteryThreshold(tierId) {
  const tier = tierIndex.get(tierId);
  return tier?.masteryThreshold || 2; // Default 2, Basics requires 3
}

export function isQuestionMastered(questionId, questionProgress, tierId) {
  const threshold = getMasteryThreshold(tierId);
  const qp = questionProgress[questionId];
  return qp && qp.correctCount >= threshold;
}

export function isTierUnlocked(tierId, cardStates, questionProgress = {}) {
  const tier = tierIndex.get(tierId);
  if (!tier) return false;
  if (!tier.unlockRequirement) return true;

  // Migration UX: if user has ANY progress in this tier, keep it unlocked
  const tierQuestions = getQuestionsForTier(tierId);
  const hasExistingProgress = tierQuestions.some(q =>
    (questionProgress[q.id] && questionProgress[q.id].correctCount > 0) ||
    (cardStates[q.id] && cardStates[q.id].state > 0)
  );
  if (hasExistingProgress) return true;

  const { tierId: prereqId, percent: requiredPercent } = tier.unlockRequirement;
  const progress = getTierProgress(prereqId, cardStates, questionProgress);
  return progress.percent >= requiredPercent;
}

export function isTierMastered(tierId, cardStates, questionProgress = {}) {
  const { total, percent } = getTierProgress(tierId, cardStates, questionProgress);
  return total > 0 && percent >= 70;
}

export function getTierProgress(tierId, cardStates, questionProgress = {}) {
  const tierQuestions = getQuestionsForTier(tierId);
  const total = tierQuestions.length;
  const threshold = getMasteryThreshold(tierId);
  const mastered = tierQuestions.filter(q => {
    const qp = questionProgress[q.id];
    return qp && qp.correctCount >= threshold;
  }).length;
  const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;
  return { total, mastered, percent };
}

// Backward compatibility aliases
export const TOPICS = TIERS;
export const getQuestionsForTopic = getQuestionsForTier;
export const isTopicUnlocked = isTierUnlocked;
export const isTopicMastered = isTierMastered;
export const getTopicProgress = getTierProgress;

// Keep getTopicForCategory working for storage.js imports
const categoryToTier = new Map();
for (const q of ALL_QUESTIONS) {
  if (!categoryToTier.has(q.category)) {
    const tierId = difficultyToTierId[q.difficulty];
    categoryToTier.set(q.category, tierIndex.get(tierId));
  }
}

export function getTopicForCategory(category) {
  return categoryToTier.get(category) || null;
}
