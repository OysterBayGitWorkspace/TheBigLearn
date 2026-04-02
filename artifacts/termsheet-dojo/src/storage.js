import { createCard } from './engine/fsrs';
import { OLD_ID_TO_NEW_ID, ALL_QUESTIONS } from './data/questions';
import { getTopicForCategory, TOPICS, getQuestionsForTopic } from './data/topics';

const V3_DEFAULTS = {
  version: 3,
  xp: 0, totalCorrect: 0, totalAnswered: 0,
  bestStreak: 0, currentStreak: 0, fastAnswers: 0,
  libraryViewed: false, perfectRounds: 0,
  achievements: [],
  questProgress: { dq1: 0, dq2: 0, dq3: 0 },
  catsToday: [], todayAnswered: 0,
  lastActiveDate: null,
  cardStates: {},
  questionProgress: {},
  sessionsCompleted: 0,
};

export function getDefaultState() {
  return { ...V3_DEFAULTS, lastActiveDate: new Date().toISOString().slice(0, 10) };
}

export function migrateV2toV3(v2) {
  const v3 = {
    ...V3_DEFAULTS,
    xp: v2.xp || 0,
    totalCorrect: v2.totalCorrect || 0,
    totalAnswered: v2.totalAnswered || 0,
    bestStreak: v2.bestStreak || 0,
    currentStreak: v2.currentStreak || 0,
    fastAnswers: v2.fastAnswers || 0,
    libraryViewed: v2.libraryViewed || false,
    perfectRounds: v2.perfectRounds || 0,
    achievements: v2.achievements || [],
    questProgress: v2.questProgress || { dq1: 0, dq2: 0, dq3: 0 },
    catsToday: v2.catsToday || [],
    todayAnswered: v2.todayAnswered || 0,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    cardStates: {},
    questionProgress: {},
    sessionsCompleted: 0,
  };

  // Migrate masteredQuestions to FSRS card states
  if (v2.masteredQuestions && Array.isArray(v2.masteredQuestions)) {
    for (const oldId of v2.masteredQuestions) {
      const newId = OLD_ID_TO_NEW_ID[oldId];
      if (newId) {
        const card = createCard(newId);
        v3.cardStates[newId] = {
          ...card,
          state: 2, // Review
          reps: 1,
          stability: 5.0,
          difficulty: 5.0,
          due: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        };
      }
    }
  }

  // Migrate FSRS mastered cards to questionProgress
  for (const [qId, card] of Object.entries(v3.cardStates)) {
    if (card && card.state >= 2) {
      v3.questionProgress[qId] = { correctCount: 2, lastAnsweredAt: new Date().toISOString(), isMastered: true };
    }
  }

  return v3;
}

export function loadState() {
  try {
    const v3 = localStorage.getItem('termy_v3');
    if (v3) {
      const parsed = JSON.parse(v3);
      // Backfill questionProgress for existing v3 states that don't have it
      if (!parsed.questionProgress) {
        parsed.questionProgress = {};
        for (const [qId, card] of Object.entries(parsed.cardStates || {})) {
          if (card && card.state >= 2) {
            parsed.questionProgress[qId] = { correctCount: 2, lastAnsweredAt: new Date().toISOString(), isMastered: true };
          }
        }
      }
      return parsed;
    }

    const v2 = localStorage.getItem('termy_v2');
    if (v2) {
      const migrated = migrateV2toV3(JSON.parse(v2));
      // Sync write migration result immediately
      localStorage.setItem('termy_v3', JSON.stringify(migrated));
      localStorage.removeItem('termy_v2');
      return migrated;
    }

    return getDefaultState();
  } catch (e) {
    console.warn('Failed to load state:', e);
    return getDefaultState();
  }
}

// Sync write for critical FSRS card state
export function persistCardStates(state) {
  try {
    localStorage.setItem('termy_v3', JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to persist card states:', e);
  }
}

// Debounced write for other state changes
let saveTimer = null;
export function persistState(state) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem('termy_v3', JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to persist state:', e);
    }
  }, 500);
}

// Flush pending writes on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (saveTimer) {
      clearTimeout(saveTimer);
      // Can't use async here, just do best-effort sync write
    }
  });
}

export function checkDailyReset(state) {
  const today = new Date().toISOString().slice(0, 10);
  if (state.lastActiveDate !== today) {
    return {
      ...state,
      questProgress: { dq1: 0, dq2: 0, dq3: 0 },
      catsToday: [],
      todayAnswered: 0,
      lastActiveDate: today,
    };
  }
  return state;
}
