import { getQuestionsForTier, isTierUnlocked, TIERS } from '../data/topics';
import { ALL_QUESTIONS } from '../data/questions';

function shuffleArray(arr) {
  const s = [...arr];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

export function buildLearnSession(tierId, cardStates, maxSize = 10) {
  const tierQuestions = getQuestionsForTier(tierId);
  const now = new Date();
  const lapsedCards = [];
  const dueCards = [];
  const newCards = [];

  for (const q of tierQuestions) {
    const card = cardStates[q.id];
    if (!card || card.state === 0) {
      newCards.push(q);
    } else if (card.lapses > 0) {
      // Previously wrong questions get priority
      lapsedCards.push(q);
    } else {
      const due = card.due instanceof Date ? card.due : new Date(card.due);
      if (due <= now) dueCards.push(q);
    }
  }

  // Sort due cards by urgency
  dueCards.sort((a, b) => new Date(cardStates[a.id].due) - new Date(cardStates[b.id].due));

  // Priority: lapsed first, then due reviews, then new
  const selected = [];
  const lapsedSlots = Math.min(3, lapsedCards.length);
  selected.push(...shuffleArray(lapsedCards).slice(0, lapsedSlots));

  const reviewSlots = Math.min(3, dueCards.length);
  selected.push(...dueCards.slice(0, reviewSlots));

  const newSlots = maxSize - selected.length;
  selected.push(...shuffleArray(newCards).slice(0, newSlots));

  if (selected.length < maxSize) {
    const remaining = [
      ...lapsedCards.slice(lapsedSlots),
      ...dueCards.slice(reviewSlots),
    ];
    selected.push(...remaining.slice(0, maxSize - selected.length));
  }

  return shuffleArray(selected.slice(0, maxSize));
}

export function addRetryToSession(currentQuestions, currentIndex, wrongQuestionId) {
  const retryPosition = Math.min(
    currentIndex + 3 + Math.floor(Math.random() * 3),
    currentQuestions.length
  );
  const newQuestions = [...currentQuestions];
  const wrongQ = currentQuestions.find(q => q.id === wrongQuestionId);
  if (wrongQ) {
    newQuestions.splice(retryPosition, 0, { ...wrongQ, _isRetry: true });
  }
  return newQuestions;
}

export function buildReviewSession(cardStates, maxSize = 10) {
  const now = new Date();

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
