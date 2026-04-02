import { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { Icons } from '../icons/icons';
import { playCorrectSound, playWrongSound } from '../sounds';
import { TRUE_FALSE_STATEMENTS } from '../data/gameModes';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function TrueFalseScreen({ go }) {
  const { state, dispatch } = useGame();
  const [statements] = useState(() => shuffle(TRUE_FALSE_STATEMENTS).slice(0, 20));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timer, setTimer] = useState(10);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(null);
  const [shakeWrong, setShakeWrong] = useState(false);
  const [pulseCorrect, setPulseCorrect] = useState(false);
  const [xpFloat, setXpFloat] = useState(null);
  const [results, setResults] = useState({ correct: 0, total: 0, xp: 0, bestStreak: 0 });
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const timerRef = useRef(null);
  const answerTimeRef = useRef(null);

  const current = statements[currentIdx];

  // Timer countdown
  useEffect(() => {
    if (done || answered) return;
    answerTimeRef.current = Date.now();
    setTimer(10);
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIdx, done]);

  const handleTimeout = () => {
    if (answered) return;
    playWrongSound();
    setAnswered(true);
    setLastCorrect(false);
    setShakeWrong(true);
    setShowExplanation(true);
    setStreak(0);
    setResults(r => ({
      ...r,
      total: r.total + 1,
      bestStreak: Math.max(r.bestStreak, streak),
    }));
    setTimeout(() => setShakeWrong(false), 600);
  };

  const handleAnswer = (answer) => {
    if (answered || done) return;
    clearInterval(timerRef.current);

    const timeTaken = (Date.now() - answerTimeRef.current) / 1000;
    const isCorrect = answer === current.correct;

    setAnswered(true);
    setLastCorrect(isCorrect);

    if (isCorrect) {
      playCorrectSound();
      setPulseCorrect(true);
      const speedBonus = timeTaken < 3 ? 5 : 0;
      const xpGain = 15 + speedBonus;
      setXpFloat(xpGain);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setResults(r => ({
        correct: r.correct + 1,
        total: r.total + 1,
        xp: r.xp + xpGain,
        bestStreak: Math.max(r.bestStreak, newStreak),
      }));
      setTimeout(() => {
        setPulseCorrect(false);
        setXpFloat(null);
      }, 800);
    } else {
      playWrongSound();
      setShakeWrong(true);
      setStreak(0);
      setResults(r => ({
        ...r,
        total: r.total + 1,
        bestStreak: Math.max(r.bestStreak, streak),
      }));
      setTimeout(() => setShakeWrong(false), 600);
    }

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx + 1 >= statements.length) {
      setDone(true);
      // Award XP
      const totalXp = results.xp;
      if (totalXp > 0) {
        dispatch({
          type: 'LOAD_STATE',
          payload: { xp: state.xp + totalXp },
        });
      }
      return;
    }
    setAnswered(false);
    setLastCorrect(null);
    setShakeWrong(false);
    setPulseCorrect(false);
    setXpFloat(null);
    setShowExplanation(false);
    setCurrentIdx(i => i + 1);
  };

  const timerPct = (timer / 10) * 100;

  if (done) {
    const accuracy = results.total > 0 ? Math.round((results.correct / results.total) * 100) : 0;
    return (
      <div className="container">
        <div className="game-top">
          <button className="close-btn" onClick={() => go("home")}>{"\u2715"}</button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          {Icons.target("#FF7B54", 48)}
          <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>Speed Round Complete!</h2>
        </div>

        <div className="explain" style={{ width: '100%', maxWidth: 480 }}>
          <div className={`rb ${accuracy >= 70 ? 'rb-ok' : 'rb-no'}`}>
            {accuracy >= 70 ? Icons.check("#5BB5A2", 28) : Icons.cross("#E8626C", 28)}
            <div>
              <div className="rl">{accuracy >= 90 ? 'Outstanding!' : accuracy >= 70 ? 'Well Done!' : 'Keep Practicing!'}</div>
            </div>
          </div>

          <div className="exp-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-light)' }}>Correct</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--teal)' }}>{results.correct}/{results.total}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-light)' }}>Accuracy</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: accuracy >= 70 ? 'var(--teal)' : 'var(--rose)' }}>{accuracy}%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-light)' }}>Best Streak</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--coral)' }}>{Icons.fire("#FF7B54", 18)} {results.bestStreak}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1.5px solid var(--border-light)' }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>Total XP</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--teal)' }}>+{results.xp}</span>
            </div>
          </div>

          <button className="btn-next" onClick={() => go("home")}>
            Back to Home {"\u2192"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="game-top">
        <button className="close-btn" onClick={() => go("home")}>{"\u2715"}</button>
        <div style={{
          flex: 1, height: 8, borderRadius: 4, background: 'var(--border-light)',
          overflow: 'hidden', margin: '0 12px',
        }}>
          <div style={{
            height: '100%', borderRadius: 4, background: 'var(--teal)',
            width: `${((currentIdx) / statements.length) * 100}%`,
            transition: 'width .3s ease',
          }}/>
        </div>
        {streak > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 800, fontSize: 14, color: '#FF7B54' }}>
            {Icons.fire("#FF7B54", 18)} {streak}
          </div>
        )}
      </div>

      {/* Timer bar */}
      {!answered && (
        <div style={{
          width: '100%', maxWidth: 480, height: 6, borderRadius: 3,
          background: 'var(--border-light)', overflow: 'hidden', marginBottom: 12,
        }}>
          <div style={{
            height: '100%', borderRadius: 3,
            background: timer <= 3 ? 'var(--rose)' : timer <= 6 ? '#D8B050' : 'var(--teal)',
            width: `${timerPct}%`,
            transition: 'width 1s linear, background .3s ease',
          }}/>
        </div>
      )}

      {!answered && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          marginBottom: 8, padding: '6px 14px', borderRadius: 100,
          background: timer <= 3 ? 'var(--rose-soft)' : 'var(--sand-soft)',
          border: `1.5px solid ${timer <= 3 ? 'var(--rose)' : '#D8B050'}`,
          transition: 'all .3s ease',
        }}>
          <span style={{
            fontSize: 14, fontWeight: 800,
            color: timer <= 3 ? 'var(--rose)' : '#C5A43E',
            fontVariantNumeric: 'tabular-nums',
          }}>{timer}s</span>
        </div>
      )}

      <div className="q-badges">
        <span className="qb" style={{ background: 'var(--coral-soft)', color: 'var(--coral)' }}>True or False</span>
        <span className="qb qb-cat">{currentIdx + 1} of {statements.length}</span>
      </div>

      <div className="q-card" style={{
        animation: shakeWrong ? 'shake .5s ease' : pulseCorrect ? 'pulse-green .5s ease' : 'none',
      }}>
        <p className="q-text">{current.statement}</p>
      </div>

      {/* XP float */}
      {xpFloat && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
          marginTop: 8, animation: 'float-up .8s ease-out',
          fontSize: 18, fontWeight: 800, color: '#5BB5A2',
        }}>
          +{xpFloat} XP
        </div>
      )}

      {/* True / False buttons */}
      {!answered && (
        <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: 480, marginTop: 16 }}>
          <button
            onClick={() => handleAnswer(true)}
            style={{
              flex: 1, padding: '18px 24px', borderRadius: 14, border: 'none',
              background: 'var(--teal)', color: '#fff', fontSize: 18, fontWeight: 800,
              cursor: 'pointer', transition: 'all .2s ease',
              boxShadow: '0 4px 16px rgba(91,181,162,.3)',
            }}
          >
            {Icons.check("#fff", 22)} TRUE
          </button>
          <button
            onClick={() => handleAnswer(false)}
            style={{
              flex: 1, padding: '18px 24px', borderRadius: 14, border: 'none',
              background: 'var(--rose)', color: '#fff', fontSize: 18, fontWeight: 800,
              cursor: 'pointer', transition: 'all .2s ease',
              boxShadow: '0 4px 16px rgba(232,98,108,.3)',
            }}
          >
            {Icons.cross("#fff", 22)} FALSE
          </button>
        </div>
      )}

      {/* Explanation */}
      {showExplanation && (
        <div className="explain">
          <div className={`rb ${lastCorrect ? 'rb-ok' : 'rb-no'}`}>
            {lastCorrect ? Icons.check("#5BB5A2", 28) : Icons.cross("#E8626C", 28)}
            <div>
              <div className="rl">
                {lastCorrect ? `+${xpFloat || 0} XP` : `Answer: ${current.correct ? 'TRUE' : 'FALSE'}`}
              </div>
            </div>
          </div>
          <div className="exp-card">
            <div className="el">Why?</div>
            <p className="et">{current.explanation}</p>
          </div>
          <button className="btn-next" onClick={handleNext}>
            {currentIdx + 1 >= statements.length ? "See Results" : "Next"} {"\u2192"}
          </button>
        </div>
      )}

      <style>{`
        @keyframes pulse-green {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); box-shadow: 0 0 20px rgba(91,181,162,.3); }
          100% { transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        @keyframes float-up {
          0% { opacity: 0; transform: translateY(10px); }
          50% { opacity: 1; }
          100% { opacity: 1; transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}
