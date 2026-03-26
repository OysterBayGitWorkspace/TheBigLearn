import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Icons } from '../icons/icons';
import { playCorrectSound, playWrongSound } from '../sounds';

export default function GameScreen({ go }) {
  const { state, dispatch } = useGame();
  const [shakeWrong, setShakeWrong] = useState(false);
  const session = state.session;
  const hasQuestions = session && session.questions && session.questions.length > 0;

  // Check if session just ended — must be before any early return
  useEffect(() => {
    if (session && session._ended) {
      go("results");
    }
  }, [session?._ended]);

  if (!hasQuestions) {
    return <div className="container"><p>No questions loaded.</p><button className="cta" onClick={() => go("home")}>Go Home</button></div>;
  }

  const q = session.questions[session.currentIndex];
  const done = session.showExplanation;
  const ok = session.selectedAnswer === q.correct;
  const lastAnswer = state._lastAnswer;

  const handleAnswer = (idx) => {
    if (done) return;
    const isCorrect = idx === q.correct;
    if (isCorrect) playCorrectSound();
    if (!isCorrect) { playWrongSound(); setShakeWrong(true); setTimeout(() => setShakeWrong(false), 500); }
    dispatch({ type: 'ANSWER_QUESTION', payload: { answerIndex: idx } });
  };

  const handleNext = () => {
    dispatch({ type: 'NEXT_QUESTION' });
  };

  return (
    <div className="container">
      <div className="game-top">
        <button className="close-btn" onClick={() => go("home")}>{"\u2715"}</button>
        <div className="dots">
          {session.questions.map((_, i) => (
            <div key={i} className={`dot ${i < session.currentIndex ? (session.answers[i]?.isCorrect ? "dot-ok" : "dot-no") : i === session.currentIndex ? "dot-now" : ""}`}/>
          ))}
        </div>
        {session.combo > 1 && <div className="combo">{Icons.fire("#FF7B54", 14)} {session.combo}x</div>}
      </div>

      <div className="q-badges">
        <span className={`qb diff-${q.difficulty}`}>{"●".repeat(q.difficulty)} {["", "Basics", "Intermediate", "Expert"][q.difficulty]}</span>
        <span className="qb qb-cat">{q.category}</span>
        {q.type === "scenario" && <span className="qb qb-sc">Scenario</span>}
        {session.mode && <span className="qb" style={{background:'var(--lavender-soft)',color:'var(--lavender)'}}>{session.mode === 'review' ? 'Review' : 'Learn'}</span>}
      </div>

      <div className={`q-card ${shakeWrong ? "shake" : ""}`}>
        <p className="q-text">{q.question}</p>
      </div>

      {!done && state.currentStreak > 0 && (
        <div className="streak-ind">{Icons.fire("#FF7B54", 14)} {state.currentStreak} in a row!</div>
      )}

      <div className="opts">
        {q.options.map((opt, i) => {
          let c = "opt";
          if (done) {
            if (i === q.correct) c += " opt-ok";
            else if (i === session.selectedAnswer) c += " opt-no";
            else c += " opt-dim";
          }
          return (
            <button key={i} className={c} onClick={() => handleAnswer(i)} disabled={done}>
              <span className="ol">{String.fromCharCode(65 + i)}</span>
              <span className="ot">{opt}</span>
              {done && i === q.correct && <span className="or">{Icons.check("#5BB5A2", 20)}</span>}
              {done && i === session.selectedAnswer && i !== q.correct && <span className="or">{Icons.cross("#E8626C", 20)}</span>}
            </button>
          );
        })}
      </div>

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
            {session.currentIndex + 1 >= session.questions.length ? "See Results" : "Next Question"} →
          </button>
        </div>
      )}

      {!done && state.currentStreak >= 3 && !state.activeBoost && (
        <button className="boost" onClick={() => dispatch({ type: 'ACTIVATE_BOOST', payload: 'double' })}>
          {Icons.lightning("#B8A0D2", 18)} 2× XP Boost!
        </button>
      )}
    </div>
  );
}
