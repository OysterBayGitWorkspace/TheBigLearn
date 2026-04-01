import { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { createCard, gradeCard, answerToRating } from '../engine/fsrs';
import { calculateXP } from '../engine/xp';
import { buildLearnSession, buildReviewSession, getReviewCount } from '../engine/session';
import { loadState, persistState, persistCardStates, checkDailyReset } from '../storage';
import { ACHIEVEMENTS } from '../data/achievements';
import { DAILY_QUESTS } from '../data/constants';
import { getLevel } from '../data/ranks';
import { playCorrectSound, playWrongSound, playPerfectRoundSound } from '../sounds';
import { scheduleSyncToCloud, fetchCloudState, mergeStates, setupOnlineSync } from '../lib/sync';

const GameContext = createContext(null);

const INITIAL_SESSION = {
  questions: [],
  currentIndex: 0,
  answers: [],
  selectedAnswer: null,
  showExplanation: false,
  roundCorrect: 0,
  roundTotal: 0,
  combo: 0,
  mode: null,       // 'learn' | 'review'
  topicId: null,
  questionStartTime: null,
  lastXpGain: 0,
};

function checkNewAchievements(state) {
  const newAch = [];
  for (const a of ACHIEVEMENTS) {
    if (!state.achievements.includes(a.id) && a.condition(state)) {
      newAch.push(a);
    }
  }
  return newAch;
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'ANSWER_QUESTION': {
      const { answerIndex } = action.payload;
      const session = state.session;
      if (session.showExplanation) return state;

      const q = session.questions[session.currentIndex];
      const isCorrect = answerIndex === q.correct;
      const timeTaken = (Date.now() - session.questionStartTime) / 1000;
      const fast = timeTaken < 5;

      // FSRS card grading
      const rating = answerToRating(isCorrect, timeTaken);
      const existingCard = state.cardStates[q.id] || createCard(q.id);
      const updatedCard = gradeCard(existingCard, rating);
      const isNewCard = !state.cardStates[q.id] || state.cardStates[q.id].state === 0;

      // XP calculation
      const xpGain = calculateXP({
        difficulty: q.difficulty,
        isCorrect,
        timeTakenSeconds: timeTaken,
        combo: session.combo,
        isNewCard,
        activeBoost: state.activeBoost,
      });

      // Streak
      const newStreak = isCorrect ? state.currentStreak + 1 : 0;

      // Quest progress
      const qp = { ...state.questProgress };
      const newTodayAnswered = state.todayAnswered + 1;
      qp.dq1 = Math.min(newTodayAnswered, 5);
      if (isCorrect && newStreak >= 3) qp.dq2 = 3;
      const cats = [...(state.catsToday || [])];
      if (!cats.includes(q.category)) cats.push(q.category);
      qp.dq3 = Math.min(cats.length, 2);

      // Quest completion XP
      let questBonusXP = 0;
      for (const dq of DAILY_QUESTS) {
        if ((state.questProgress[dq.id] || 0) < dq.target && (qp[dq.id] || 0) >= dq.target) {
          questBonusXP += dq.xpReward;
        }
      }

      const newState = {
        ...state,
        xp: state.xp + xpGain + questBonusXP,
        totalCorrect: state.totalCorrect + (isCorrect ? 1 : 0),
        totalAnswered: state.totalAnswered + 1,
        bestStreak: Math.max(state.bestStreak, newStreak),
        currentStreak: newStreak,
        fastAnswers: state.fastAnswers + ((fast && isCorrect) ? 1 : 0),
        todayAnswered: newTodayAnswered,
        questProgress: qp,
        catsToday: cats,
        cardStates: {
          ...state.cardStates,
          [q.id]: updatedCard,
        },
        activeBoost: state.activeBoost === 'double' ? null : state.activeBoost,
        session: {
          ...session,
          selectedAnswer: answerIndex,
          showExplanation: true,
          roundCorrect: session.roundCorrect + (isCorrect ? 1 : 0),
          roundTotal: session.roundTotal + 1,
          combo: isCorrect ? session.combo + 1 : 0,
          lastXpGain: xpGain,
          answers: [
            ...session.answers,
            {
              questionIndex: session.currentIndex,
              selected: answerIndex,
              correct: q.correct,
              isCorrect,
              xpGain,
              timeTaken,
            },
          ],
        },
        // Metadata for UI effects
        _lastAnswer: {
          isCorrect,
          xpGain,
          questBonusXP,
          newStreak,
          fast,
          combo: isCorrect ? session.combo + 1 : 0,
        },
      };

      // Check achievements
      const newAch = checkNewAchievements(newState);
      if (newAch.length) {
        newState.achievements = [...newState.achievements, ...newAch.map(a => a.id)];
        newState._newAchievements = newAch;
      }

      return newState;
    }

    case 'START_SESSION': {
      const { questions, mode, topicId } = action.payload;
      return {
        ...state,
        session: {
          ...INITIAL_SESSION,
          questions,
          mode,
          topicId: topicId || null,
          questionStartTime: Date.now(),
        },
        _lastAnswer: null,
        _newAchievements: null,
      };
    }

    case 'NEXT_QUESTION': {
      const session = state.session;
      if (session.currentIndex + 1 >= session.questions.length) {
        // Session ended
        let newState = {
          ...state,
          sessionsCompleted: state.sessionsCompleted + 1,
          session: {
            ...session,
            _ended: true,
          },
        };

        // Perfect round check
        if (session.roundCorrect === session.roundTotal && session.roundTotal >= 5) {
          newState.perfectRounds = state.perfectRounds + 1;
          const newAch = checkNewAchievements(newState);
          if (newAch.length) {
            newState.achievements = [...newState.achievements, ...newAch.map(a => a.id)];
            newState._newAchievements = newAch;
          }
          newState._perfectRound = true;
        }

        // Random bonus chest
        if (Math.random() > 0.4) {
          const bonusXP = [10, 15, 20, 25, 30, 50][Math.floor(Math.random() * 6)];
          newState.xp = newState.xp + bonusXP;
          newState._chestXP = bonusXP;
        }

        return newState;
      }

      return {
        ...state,
        session: {
          ...session,
          currentIndex: session.currentIndex + 1,
          selectedAnswer: null,
          showExplanation: false,
          questionStartTime: Date.now(),
        },
        _lastAnswer: null,
        _newAchievements: null,
      };
    }

    case 'ACTIVATE_BOOST': {
      return { ...state, activeBoost: action.payload };
    }

    case 'RESET_DAILY': {
      return checkDailyReset(state);
    }

    case 'VIEW_LIBRARY': {
      return { ...state, libraryViewed: true };
    }

    case 'LOAD_STATE': {
      // Merge cloud state into current state (preserving session and UI flags)
      return {
        ...state,
        ...action.payload,
        session: state.session,
        activeBoost: state.activeBoost,
        _lastAnswer: null,
        _newAchievements: null,
        _perfectRound: null,
        _chestXP: null,
      };
    }

    case 'CLEAR_UI_FLAGS': {
      return {
        ...state,
        _lastAnswer: null,
        _newAchievements: null,
        _perfectRound: null,
        _chestXP: null,
      };
    }

    default:
      return state;
  }
}

export function GameProvider({ children, userId }) {
  const initialState = loadState();
  const checkedState = checkDailyReset(initialState);

  const [state, dispatch] = useReducer(gameReducer, {
    ...checkedState,
    session: { ...INITIAL_SESSION },
    activeBoost: null,
    _lastAnswer: null,
    _newAchievements: null,
    _perfectRound: null,
    _chestXP: null,
  });

  const stateRef = useRef(state);
  stateRef.current = state;
  const userIdRef = useRef(userId);
  userIdRef.current = userId;

  // On login / mount: merge cloud state with local
  useEffect(() => {
    if (!userId) return;
    let cancelled = false;
    fetchCloudState(userId).then((cloudData) => {
      if (cancelled || !cloudData) return;
      const { session, _lastAnswer, _newAchievements, _perfectRound, _chestXP, activeBoost, ...localPersistent } = stateRef.current;
      const merged = mergeStates(localPersistent, cloudData);
      if (merged !== localPersistent) {
        dispatch({ type: 'LOAD_STATE', payload: merged });
      }
    });
    return () => { cancelled = true; };
  }, [userId]);

  // Setup online reconnect sync
  useEffect(() => {
    setupOnlineSync(
      () => userIdRef.current,
      () => {
        const { session, _lastAnswer, _newAchievements, _perfectRound, _chestXP, activeBoost, ...persistent } = stateRef.current;
        return persistent;
      }
    );
  }, []);

  // Persist state on changes (localStorage + cloud)
  useEffect(() => {
    const { session, _lastAnswer, _newAchievements, _perfectRound, _chestXP, activeBoost, ...persistent } = state;
    persistState(persistent);
    // Cloud sync (debounced)
    if (userId) {
      scheduleSyncToCloud(userId, persistent);
    }
  }, [state, userId]);

  // Sync write after answer (critical for FSRS card state)
  useEffect(() => {
    if (state._lastAnswer) {
      const { session, _lastAnswer, _newAchievements, _perfectRound, _chestXP, activeBoost, ...persistent } = state;
      persistCardStates(persistent);
    }
  }, [state._lastAnswer]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
}

export { getReviewCount };
