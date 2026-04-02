import { getQuestionsForTier, isTierUnlocked, TIERS, getMasteryThreshold } from '../data/topics';
import { ALL_QUESTIONS } from '../data/questions';

function shuffleArray(arr) {
  const s = [...arr];
  for (let i = s.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [s[i], s[j]] = [s[j], s[i]];
  }
  return s;
}

// Key for storing recently seen question IDs in sessionStorage
const RECENT_KEY = 'termy_recent_questions';

function getRecentlySeenIds() {
  try {
    const raw = sessionStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveRecentlySeenIds(ids) {
  try {
    // Keep only last 40 question IDs to avoid showing same Qs across 2-3 sessions
    sessionStorage.setItem(RECENT_KEY, JSON.stringify(ids.slice(-40)));
  } catch { /* noop */ }
}

export function buildLearnSession(tierId, cardStates, questionProgress = {}, maxSize = 15) {
  const tierQuestions = getQuestionsForTier(tierId);
  const threshold = getMasteryThreshold(tierId);
  const recentIds = new Set(getRecentlySeenIds());

  const inProgress = [];   // correctCount > 0 but < threshold
  const unseen = [];       // never answered
  const mastered = [];     // already mastered

  for (const q of tierQuestions) {
    const qp = questionProgress[q.id];
    if (!qp || qp.correctCount === 0) {
      const card = cardStates[q.id];
      if (card && card.lapses > 0) {
        inProgress.push(q);
      } else {
        unseen.push(q);
      }
    } else if (qp.correctCount >= threshold) {
      mastered.push(q);
    } else {
      inProgress.push(q);
    }
  }

  // Within each bucket, push recently-seen questions to the back
  const sortByRecency = (arr) => {
    const fresh = arr.filter(q => !recentIds.has(q.id));
    const seen = arr.filter(q => recentIds.has(q.id));
    return [...shuffleArray(fresh), ...shuffleArray(seen)];
  };

  // Priority: 1) in-progress (not recently seen), 2) unseen, 3) mastered
  const selected = [];
  selected.push(...sortByRecency(inProgress));
  selected.push(...sortByRecency(unseen));
  selected.push(...sortByRecency(mastered));

  const session = selected.slice(0, maxSize);

  // Final deep shuffle so the priority order isn't obvious during play
  const finalSession = shuffleArray(session);

  // Track what we're about to show
  const newRecentIds = [...getRecentlySeenIds(), ...finalSession.map(q => q.id)];
  saveRecentlySeenIds(newRecentIds);

  return finalSession;
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
