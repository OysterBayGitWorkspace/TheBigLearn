import { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { Icons } from '../icons/icons';
import { playCorrectSound, playWrongSound } from '../sounds';

export default function GameScreen({ go }) {
  const { state, dispatch } = useGame();
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);
  const [pulseCorrect, setPulseCorrect] = useState(false);
  const [xpFloat, setXpFloat] = useState(null);
  const [timer, setTimer] = useState(null);
  const timerRef = useRef(null);

  const session = state.session;
  const hasQuestions = session && session.questions && session.questions.length > 0;

  // Check if session just ended
  useEffect(() => {
    if (session && session._ended) {
      go("results");
    }
  }, [session?._ended]);

  // Reset selection state when question changes
  useEffect(() => {
    setSelectedIdx(null);
    setConfirmed(false);
    setShakeWrong(false);
    setPulseCorrect(false);
    setXpFloat(null);
  }, [session?.currentIndex]);

  // Timer for advanced (difficulty 3) questions
  useEffect(() => {
    if (!hasQuestions) return;
    const q = session.questions[session.currentIndex];
    if (q && q.difficulty === 3 && !session.showExplanation) {
      setTimer(30);
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            // Auto-submit wrong if no answer selected
            if (!confirmed) {
              handleConfirm(true);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timerRef.current);
    } else {
      setTimer(null);
    }
  }, [session?.currentIndex, hasQuestions]);

  // Clear timer when answer is confirmed
  useEffect(() => {
    if (confirmed && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [confirmed]);

  if (!hasQuestions) {
    return (
      <div className="container">
        <p>No questions loaded.</p>
        <button className="cta" onClick={() => go("home")}>Go Home</button>
      </div>
    );
  }

  const q = session.questions[session.currentIndex];
  const done = session.showExplanation;
  const ok = session.selectedAnswer === q.correct;
  const lastAnswer = state._lastAnswer;

  const handleSelect = (idx) => {
    if (done || confirmed) return;
    setSelectedIdx(idx);
  };

  const handleConfirm = (timedOut = false) => {
    if (done) return;
    const answerIdx = timedOut && selectedIdx === null ? -1 : selectedIdx;
    if (answerIdx === null) return;

    const isCorrect = answerIdx === q.correct;
    setConfirmed(true);

    if (isCorrect) {
      playCorrectSound();
      setPulseCorrect(true);
    } else {
      playWrongSound();
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 600);
    }

    dispatch({ type: 'ANSWER_QUESTION', payload: { answerIndex: answerIdx } });
  };

  const handleNext = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  // Calculate progress dots, capping display at original session size
  const totalDots = session.questions.length;
  const sessionStreak = session.combo || 0;

  return (
    <div className="container">
      <div className="game-top">
        <button className="close-btn" onClick={() => go("home")}>{"\u2715"}</button>
        <div style={{
          flex: 1,
          height: 8,
          borderRadius: 4,
          background: 'var(--border-light)',
          overflow: 'hidden',
          margin: '0 12px',
        }}>
          <div style={{
            height: '100%',
            borderRadius: 4,
            background: 'var(--teal)',
            width: `${((session.currentIndex) / totalDots) * 100}%`,
            transition: 'width .3s ease',
          }}/>
        </div>
        {sessionStreak > 1 && (
          <div className="combo" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontWeight: 800,
            fontSize: 14,
            color: '#FF7B54',
          }}>
            {Icons.fire("#FF7B54", 18)} {sessionStreak}
          </div>
        )}
      </div>

      {/* Timer for Tier 3 questions */}
      {timer !== null && !done && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          marginBottom: 8,
          padding: '6px 14px',
          borderRadius: 100,
          background: timer <= 10 ? 'var(--rose-soft)' : 'var(--sand-soft)',
          border: `1.5px solid ${timer <= 10 ? 'var(--rose)' : '#D8B050'}`,
          alignSelf: 'center',
          transition: 'all .3s ease',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="13" r="8" stroke={timer <= 10 ? 'var(--rose)' : '#D8B050'} strokeWidth="2"/>
            <path d="M12 9v4l2.5 2.5" stroke={timer <= 10 ? 'var(--rose)' : '#D8B050'} strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 2h6" stroke={timer <= 10 ? 'var(--rose)' : '#D8B050'} strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={{
            fontSize: 14,
            fontWeight: 800,
            color: timer <= 10 ? 'var(--rose)' : '#C5A43E',
            fontVariantNumeric: 'tabular-nums',
          }}>{timer}s</span>
        </div>
      )}

      <div className="q-badges">
        <span className={`qb diff-${q.difficulty}`}>{"●".repeat(q.difficulty)} {["", "Foundations", "Intermediate", "Advanced"][q.difficulty]}</span>
        <span className="qb qb-cat">{q.category}</span>
        {q.type === "scenario" && <span className="qb qb-sc">Scenario</span>}
        {q._isRetry && <span className="qb" style={{background:'var(--coral-soft)',color:'var(--coral)'}}>Retry</span>}
        {session.mode && <span className="qb" style={{background:'var(--lavender-soft)',color:'var(--lavender)'}}>{session.mode === 'review' ? 'Review' : 'Learn'}</span>}
      </div>

      <div className="q-card">
        <p className="q-text">{q.question}</p>
      </div>

      {/* Streak indicator */}
      {!done && state.currentStreak > 0 && (
        <div className="streak-ind">{Icons.fire("#FF7B54", 14)} {state.currentStreak} in a row!</div>
      )}

      {/* Tap-to-select option cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        width: '100%',
        maxWidth: 480,
      }}>
        {q.options.map((opt, i) => {
          const isSelected = selectedIdx === i;
          const isCorrectAnswer = i === q.correct;
          const isWrongAnswer = done && i === session.selectedAnswer && !ok;

          let borderColor = 'var(--border)';
          let bgColor = 'var(--white)';
          let labelColor = 'var(--text-light)';
          let textColor = 'var(--text)';
          let extraStyle = {};

          if (!done && isSelected) {
            borderColor = 'var(--teal)';
            bgColor = 'var(--teal-soft)';
            labelColor = 'var(--teal)';
          } else if (done) {
            if (isCorrectAnswer) {
              borderColor = '#5BB5A2';
              bgColor = 'rgba(91,181,162,0.1)';
              labelColor = '#5BB5A2';
              if (pulseCorrect && isSelected) {
                extraStyle.animation = 'pulse-green .5s ease';
              }
            } else if (isWrongAnswer) {
              borderColor = '#E8626C';
              bgColor = 'rgba(232,98,108,0.08)';
              labelColor = '#E8626C';
              textColor = '#E8626C';
              if (shakeWrong) {
                extraStyle.animation = 'shake .5s ease';
              }
            } else {
              borderColor = 'var(--border-light)';
              bgColor = 'var(--border-light)';
              textColor = 'var(--text-faint)';
              labelColor = 'var(--text-faint)';
            }
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={done}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                padding: '14px 16px',
                background: bgColor,
                border: `2.5px solid ${borderColor}`,
                borderRadius: 14,
                cursor: done ? 'default' : 'pointer',
                transition: 'all .2s ease',
                textAlign: 'left',
                position: 'relative',
                ...extraStyle,
              }}
            >
              <span style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: isSelected && !done ? 'var(--teal)' : done && isCorrectAnswer ? '#5BB5A2' : done && isWrongAnswer ? '#E8626C' : 'var(--border-light)',
                color: (isSelected && !done) || (done && (isCorrectAnswer || isWrongAnswer)) ? '#fff' : 'var(--text-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                fontWeight: 800,
                flexShrink: 0,
                transition: 'all .2s ease',
              }}>{String.fromCharCode(65 + i)}</span>
              <span style={{
                fontSize: 14,
                fontWeight: 600,
                color: textColor,
                lineHeight: 1.4,
                flex: 1,
              }}>{opt}</span>
              {done && isCorrectAnswer && (
                <span style={{ flexShrink: 0, alignSelf: 'center' }}>{Icons.check("#5BB5A2", 22)}</span>
              )}
              {done && isWrongAnswer && (
                <span style={{ flexShrink: 0, alignSelf: 'center' }}>{Icons.cross("#E8626C", 22)}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* XP float animation */}
      {done && ok && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          marginTop: 8,
          animation: 'float-up .8s ease-out',
          fontSize: 18,
          fontWeight: 800,
          color: '#5BB5A2',
        }}>
          +{session.lastXpGain || lastAnswer?.xpGain || 0} XP
        </div>
      )}

      {/* Check button (before answer is confirmed) */}
      {!done && (
        <button
          onClick={() => handleConfirm(false)}
          disabled={selectedIdx === null}
          style={{
            width: '100%',
            maxWidth: 480,
            padding: '16px 24px',
            marginTop: 16,
            borderRadius: 14,
            border: 'none',
            background: selectedIdx !== null ? 'var(--teal)' : 'var(--border-light)',
            color: selectedIdx !== null ? '#fff' : 'var(--text-faint)',
            fontSize: 16,
            fontWeight: 800,
            cursor: selectedIdx !== null ? 'pointer' : 'not-allowed',
            transition: 'all .2s ease',
            boxShadow: selectedIdx !== null ? '0 4px 16px rgba(91,181,162,.3)' : 'none',
          }}
        >
          Check
        </button>
      )}

      {/* Explanation and Next */}
      {done && (
        <div className="explain">
          <div className={`rb ${ok ? "rb-ok" : "rb-no"}`}>
            {ok ? Icons.check("#5BB5A2", 28) : Icons.cross("#E8626C", 28)}
            <div>
              <div className="rl">{ok ? `+${session.lastXpGain || lastAnswer?.xpGain || 0} XP` : "Not quite!"}</div>
              {ok && session.combo > 1 && <div className="rc">Combo x{session.combo}!</div>}
            </div>
          </div>
          <div className="exp-card">
            <div className="el">Why?</div>
            <p className="et">{q.explanation}</p>
          </div>
          {q.germanContext && (
            <div className="de-card">
              <div className="gl">{Icons.deFlag()} German Context</div>
              <p className="et">{q.germanContext}</p>
            </div>
          )}
          <button className="btn-next" onClick={handleNext}>
            {session.currentIndex + 1 >= session.questions.length ? "See Results" : "Next Question"} {"\u2192"}
          </button>
        </div>
      )}

      {!done && state.currentStreak >= 3 && !state.activeBoost && (
        <button className="boost" onClick={() => dispatch({ type: 'ACTIVATE_BOOST', payload: 'double' })}>
          {Icons.lightning("#B8A0D2", 18)} 2x XP Boost!
        </button>
      )}

      {/* Inline keyframe animations */}
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
