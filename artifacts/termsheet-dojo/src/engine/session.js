import { getQuestionsForTopic, isTopicUnlocked, TOPICS } from '../data/topics';
import { ALL_QUESTIONS } from '../data/questions';

function shuffleArray(arr) {
  const s = [...arr];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

export function buildLearnSession(topicId, cardStates, maxSize = 10) {
  const topicQuestions = getQuestionsForTopic(topicId);
  const now = new Date();
  const dueCards = [];
  const newCards = [];

  for (const q of topicQuestions) {
    const card = cardStates[q.id];
    if (!card || card.state === 0) {
      newCards.push(q);
    } else {
      const due = card.due instanceof Date ? card.due : new Date(card.due);
      if (due <= now) dueCards.push(q);
    }
  }

  dueCards.sort((a, b) => new Date(cardStates[a.id].due) - new Date(cardStates[b.id].due));

  const reviewSlots = Math.min(3, dueCards.length);
  const selected = [...dueCards.slice(0, reviewSlots)];
  const newSlots = maxSize - selected.length;
  selected.push(...shuffleArray(newCards).slice(0, newSlots));

  if (selected.length < maxSize) {
    selected.push(...dueCards.slice(reviewSlots, reviewSlots + (maxSize - selected.length)));
  }

  return shuffleArray(selected.slice(0, maxSize));
}

export function buildReviewSession(cardStates, maxSize = 10) {
  const now = new Date();
  const unlockedTopicIds = TOPICS.filter(t => isTopicUnlocked(t.id, cardStates)).map(t => t.id);

  const dueQuestions = ALL_QUESTIONS.filter(q => {
    const card = cardStates[q.id];
    if (!card || card.state === 0) return false;
    const due = card.due instanceof Date ? card.due : new Date(card.due);
    return due <= now;
  });

  dueQuestions.sort((a, b) => new Date(cardStates[a.id].due) - new Date(cardStates[b.id].due));
  return dueQuestions.slice(0, maxSize);
}

export function getReviewCount(cardStates) {
  const now = new Date();
  return ALL_QUESTIONS.filter(q => {
    const card = cardStates[q.id];
    if (!card || card.state === 0) return false;
    const due = card.due instanceof Date ? card.due : new Date(card.due);
    return due <= now;
  }).length;
}

export { shuffleArray };
