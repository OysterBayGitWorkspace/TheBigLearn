import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { Icons } from '../icons/icons';
import { playCorrectSound, playWrongSound } from '../sounds';
import { ALL_QUESTIONS } from '../data/questions';
import { calculateXP } from '../engine/xp';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildFillBlankQuestions() {
  // Pick 10 random Tier 1 questions
  const tier1 = ALL_QUESTIONS.filter(q => q.tier === 1 && q.difficulty === 1);
  const picked = shuffle(tier1).slice(0, 10);

  return picked.map(q => {
    const correctAnswer = q.options[q.correct];
    // Use the explanation as the prompt with the key concept blanked out
    // Find a good term to blank out from the question or answer
    let prompt = q.explanation;

    // Try to blank out the correct answer term in the explanation
    // If it appears directly, replace it
    const termWords = correctAnswer.toLowerCase().split(/\s+/);
    const firstKeyWord = termWords.find(w => w.length > 3) || termWords[0];

    // Create a blanked version
    if (prompt.toLowerCase().includes(correctAnswer.toLowerCase())) {
      const regex = new RegExp(correctAnswer.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      prompt = prompt.replace(regex, '___');
    } else if (prompt.toLowerCase().includes(firstKeyWord)) {
      // Blank out a key phrase
      prompt = prompt.replace(new RegExp(`\\b\\w*${firstKeyWord}\\w*\\b`, 'i'), '___');
    } else {
      // Fall back: use the question as the prompt with "What is ___?"
      prompt = q.question.replace(/what is |what are |what does /i, '').replace(/\?$/, '');
      prompt = `___ is described as: ${q.explanation}`;
    }

    // Build 4 options: correct + 3 distractors from same category
    const sameCategory = ALL_QUESTIONS.filter(
      oq => oq.category === q.category && oq.id !== q.id
    );
    const distractors = shuffle(sameCategory)
      .slice(0, 3)
      .map(oq => oq.options[oq.correct]);

    // If not enough distractors, fill from other categories
    if (distractors.length < 3) {
      const others = shuffle(ALL_QUESTIONS.filter(oq => oq.id !== q.id))
        .slice(0, 3 - distractors.length)
        .map(oq => oq.options[oq.correct]);
      distractors.push(...others);
    }

    const options = shuffle([correctAnswer, ...distractors]);
    const correctIdx = options.indexOf(correctAnswer);

    return {
      id: q.id,
      prompt,
      options,
      correct: correctIdx,
      explanation: q.explanation,
      category: q.category,
      difficulty: q.difficulty,
      originalQuestion: q,
    };
  });
}

export default function FillBlankScreen({ go }) {
  const { state, dispatch } = useGame();
  const [questions] = useState(() => buildFillBlankQuestions());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [shakeWrong, setShakeWrong] = useState(false);
  const [pulseCorrect, setPulseCorrect] = useState(false);
  const [results, setResults] = useState({ correct: 0, total: 0, xp: 0 });
  const [done, setDone] = useState(false);
  const [questionStart, setQuestionStart] = useState(Date.now());

  const q = questions[currentIdx];

  useEffect(() => {
    setSelectedIdx(null);
    setConfirmed(false);
    setShakeWrong(false);
    setPulseCorrect(false);
    setQuestionStart(Date.now());
  }, [currentIdx]);

  const handleSelect = (idx) => {
    if (confirmed) return;
    setSelectedIdx(idx);
  };

  const handleConfirm = () => {
    if (confirmed || selectedIdx === null) return;
    const isCorrect = selectedIdx === q.correct;
    const timeTaken = (Date.now() - questionStart) / 1000;
    setConfirmed(true);

    const xpGain = calculateXP({
      difficulty: q.difficulty,
      isCorrect,
      timeTakenSeconds: timeTaken,
      combo: 0,
      isNewCard: false,
      activeBoost: state.activeBoost,
    });

    if (isCorrect) {
      playCorrectSound();
      setPulseCorrect(true);

      // Track mastery for the original question
      const prevQP = state.questionProgress || {};
      const prevEntry = prevQP[q.id] || { correctCount: 0, lastAnsweredAt: null, isMastered: false };
      const newCorrectCount = prevEntry.correctCount + 1;
      dispatch({
        type: 'LOAD_STATE',
        payload: {
          questionProgress: {
            ...prevQP,
            [q.id]: {
              correctCount: newCorrectCount,
              lastAnsweredAt: new Date().toISOString(),
              isMastered: newCorrectCount >= 2,
            },
          },
        },
      });
    } else {
      playWrongSound();
      setShakeWrong(true);
      setTimeout(() => setShakeWrong(false), 600);
    }

    setResults(r => ({
      correct: r.correct + (isCorrect ? 1 : 0),
      total: r.total + 1,
      xp: r.xp + xpGain,
    }));
  };

  const handleNext = () => {
    if (currentIdx + 1 >= questions.length) {
      setDone(true);
      if (results.xp > 0) {
        dispatch({
          type: 'LOAD_STATE',
          payload: { xp: state.xp + results.xp },
        });
      }
      return;
    }
    setCurrentIdx(i => i + 1);
  };

  const ok = confirmed && selectedIdx === q.correct;

  if (done) {
    const accuracy = results.total > 0 ? Math.round((results.correct / results.total) * 100) : 0;
    return (
      <div className="container">
        <div className="game-top">
          <button className="close-btn" onClick={() => go("home")}>{"\u2715"}</button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          {Icons.brain("#B8A0D2", 48)}
          <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 28, fontWeight: 800, margin: '8px 0 4px' }}>Fill in the Blank Complete!</h2>
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
            width: `${(currentIdx / questions.length) * 100}%`,
            transition: 'width .3s ease',
          }}/>
        </div>
      </div>

      <div className="q-badges">
        <span className="qb" style={{ background: 'var(--lavender-soft)', color: 'var(--lavender)' }}>Fill in the Blank</span>
        <span className="qb qb-cat">{q.category}</span>
        <span className="qb" style={{ background: 'var(--sand-soft)', color: '#C5A43E' }}>{currentIdx + 1}/{questions.length}</span>
      </div>

      <div className="q-card">
        <p className="q-text" style={{ lineHeight: 1.6 }}>{q.prompt}</p>
      </div>

      {/* Option cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 480 }}>
        {q.options.map((opt, i) => {
          const isSelected = selectedIdx === i;
          const isCorrectAnswer = i === q.correct;
          const isWrongAnswer = confirmed && i === selectedIdx && !ok;

          let borderColor = 'var(--border)';
          let bgColor = 'var(--white)';
          let labelColor = 'var(--text-light)';
          let textColor = 'var(--text)';
          let extraStyle = {};

          if (!confirmed && isSelected) {
            borderColor = 'var(--teal)';
            bgColor = 'var(--teal-soft)';
            labelColor = 'var(--teal)';
          } else if (confirmed) {
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
              disabled={confirmed}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '14px 16px', background: bgColor,
                border: `2.5px solid ${borderColor}`, borderRadius: 14,
                cursor: confirmed ? 'default' : 'pointer',
                transition: 'all .2s ease', textAlign: 'left',
                position: 'relative', ...extraStyle,
              }}
            >
              <span style={{
                width: 28, height: 28, borderRadius: 8,
                background: isSelected && !confirmed ? 'var(--teal)' : confirmed && isCorrectAnswer ? '#5BB5A2' : confirmed && isWrongAnswer ? '#E8626C' : 'var(--border-light)',
                color: (isSelected && !confirmed) || (confirmed && (isCorrectAnswer || isWrongAnswer)) ? '#fff' : 'var(--text-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, flexShrink: 0, transition: 'all .2s ease',
              }}>{String.fromCharCode(65 + i)}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: textColor, lineHeight: 1.4, flex: 1 }}>{opt}</span>
              {confirmed && isCorrectAnswer && (
                <span style={{ flexShrink: 0, alignSelf: 'center' }}>{Icons.check("#5BB5A2", 22)}</span>
              )}
              {confirmed && isWrongAnswer && (
                <span style={{ flexShrink: 0, alignSelf: 'center' }}>{Icons.cross("#E8626C", 22)}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* XP float */}
      {confirmed && ok && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
          marginTop: 8, animation: 'float-up .8s ease-out',
          fontSize: 18, fontWeight: 800, color: '#5BB5A2',
        }}>
          +XP
        </div>
      )}

      {/* Check button */}
      {!confirmed && (
        <button
          onClick={handleConfirm}
          disabled={selectedIdx === null}
          style={{
            width: '100%', maxWidth: 480, padding: '16px 24px', marginTop: 16,
            borderRadius: 14, border: 'none',
            background: selectedIdx !== null ? 'var(--teal)' : 'var(--border-light)',
            color: selectedIdx !== null ? '#fff' : 'var(--text-faint)',
            fontSize: 16, fontWeight: 800,
            cursor: selectedIdx !== null ? 'pointer' : 'not-allowed',
            transition: 'all .2s ease',
            boxShadow: selectedIdx !== null ? '0 4px 16px rgba(91,181,162,.3)' : 'none',
          }}
        >
          Check
        </button>
      )}

      {/* Explanation */}
      {confirmed && (
        <div className="explain">
          <div className={`rb ${ok ? 'rb-ok' : 'rb-no'}`}>
            {ok ? Icons.check("#5BB5A2", 28) : Icons.cross("#E8626C", 28)}
            <div>
              <div className="rl">{ok ? 'Correct!' : 'Not quite!'}</div>
            </div>
          </div>
          <div className="exp-card">
            <div className="el">Why?</div>
            <p className="et">{q.explanation}</p>
          </div>
          <button className="btn-next" onClick={handleNext}>
            {currentIdx + 1 >= questions.length ? "See Results" : "Next"} {"\u2192"}
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
