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

export function buildLearnSession(tierId, cardStates, questionProgress = {}, maxSize = 10) {
  const tierQuestions = getQuestionsForTier(tierId);
  const inProgress = [];   // correctCount > 0 but < 2 (got some right, not yet mastered)
  const unseen = [];       // never answered
  const mastered = [];     // already mastered (correctCount >= 2)

  for (const q of tierQuestions) {
    const qp = questionProgress[q.id];
    if (!qp || qp.correctCount === 0) {
      // Check if they have a card state but no questionProgress entry (legacy)
      const card = cardStates[q.id];
      if (card && card.lapses > 0) {
        inProgress.push(q); // previously wrong in FSRS = treat as in-progress
      } else {
        unseen.push(q);
      }
    } else if (qp.isMastered) {
      mastered.push(q);
    } else {
      // correctCount > 0 but not yet mastered
      inProgress.push(q);
    }
  }

  // Priority: 1) in-progress, 2) unseen, 3) mastered (fill remaining)
  const selected = [];
  selected.push(...shuffleArray(inProgress));
  selected.push(...shuffleArray(unseen));
  selected.push(...shuffleArray(mastered));

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
