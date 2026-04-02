import { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { Icons } from '../icons/icons';
import { playCorrectSound, playWrongSound } from '../sounds';
import { TERM_SORTER_SETS } from '../data/gameModes';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.max(0, seconds);
  const mm = Math.floor(s / 60);
  const ss = s % 60;
  return `${mm}:${ss.toString().padStart(2, '0')}`;
}

// Pick a random subset of terms with a non-even split
function pickRandomTerms(set) {
  const cat0Terms = set.terms.filter(t => t.category === set.categories[0]);
  const cat1Terms = set.terms.filter(t => t.category === set.categories[1]);

  // Decide total terms (6, 7, or 8)
  const totalOptions = [6, 7, 8].filter(n => n <= cat0Terms.length + cat1Terms.length);
  const total = totalOptions[Math.floor(Math.random() * totalOptions.length)] || 6;

  // Generate possible splits that are NOT even (avoid 3/3, 4/4)
  const possibleSplits = [];
  for (let a = 2; a <= Math.min(cat0Terms.length, total - 2); a++) {
    const b = total - a;
    if (b >= 2 && b <= cat1Terms.length) {
      // Allow even splits only 20% of the time
      if (a !== b || Math.random() < 0.2) {
        possibleSplits.push([a, b]);
      }
    }
  }

  // Fallback to any valid split if we filtered all out
  if (possibleSplits.length === 0) {
    for (let a = 2; a <= Math.min(cat0Terms.length, total - 2); a++) {
      const b = total - a;
      if (b >= 2 && b <= cat1Terms.length) {
        possibleSplits.push([a, b]);
      }
    }
  }

  const [countA, countB] = possibleSplits[Math.floor(Math.random() * possibleSplits.length)] || [3, 3];

  const pickedA = shuffle(cat0Terms).slice(0, countA);
  const pickedB = shuffle(cat1Terms).slice(0, countB);

  return shuffle([...pickedA, ...pickedB]);
}

const TIMER_SECONDS = 40;

export default function TermSorterScreen({ go }) {
  const { state, dispatch } = useGame();
  const [set] = useState(() => TERM_SORTER_SETS[Math.floor(Math.random() * TERM_SORTER_SETS.length)]);
  const [terms] = useState(() => pickRandomTerms(set));
  const totalTerms = terms.length;
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [sorted, setSorted] = useState([]);
  const [shaking, setShaking] = useState(null);
  const [flashing, setFlashing] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [done, setDone] = useState(false);
  const [lost, setLost] = useState(false); // YOU LOSE state
  const [loseReason, setLoseReason] = useState(''); // reason for losing
  const [correctCount, setCorrectCount] = useState(0);
  const [buckets, setBuckets] = useState({ 0: [], 1: [] });
  const timerRef = useRef(null);

  // Countdown timer
  useEffect(() => {
    if (done || lost) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setLost(true);
          setLoseReason('Time\'s up!');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [done, lost]);

  // Check completion
  useEffect(() => {
    if (sorted.length === totalTerms && !done && !lost) {
      clearInterval(timerRef.current);
      setDone(true);
    }
  }, [sorted.length, totalTerms]);

  // Apply XP penalty on lose
  useEffect(() => {
    if (lost) {
      clearInterval(timerRef.current);
      playWrongSound();
      dispatch({
        type: 'LOAD_STATE',
        payload: { xp: Math.max(0, state.xp - 25) },
      });
    }
  }, [lost]);

  const handleTermTap = (termIdx) => {
    if (done || lost || sorted.includes(termIdx)) return;
    if (flashing !== null || shaking !== null) return;
    setSelectedTerm(selectedTerm === termIdx ? null : termIdx);
  };

  const handleCategoryTap = (catIdx) => {
    if (done || lost || selectedTerm === null) return;
    if (flashing !== null || shaking !== null) return;

    const term = terms[selectedTerm];
    const correctCategory = set.categories.indexOf(term.category);

    if (catIdx === correctCategory) {
      // Correct sort
      playCorrectSound();
      setFlashing(selectedTerm);
      setCorrectCount(c => c + 1);

      setTimeout(() => {
        setSorted(prev => [...prev, selectedTerm]);
        setBuckets(prev => ({
          ...prev,
          [catIdx]: [...prev[catIdx], term.term],
        }));
        setFlashing(null);
        setSelectedTerm(null);
      }, 500);
    } else {
      // Wrong sort → YOU LOSE
      playWrongSound();
      setShaking(selectedTerm);
      setTimeout(() => {
        setShaking(null);
        setSelectedTerm(null);
        setLost(true);
        setLoseReason('Wrong category!');
      }, 600);
    }
  };

  const xpEarned = done ? correctCount * 10 + (timeLeft > 10 ? 20 : 0) : 0;

  // Award XP on completion
  useEffect(() => {
    if (done && xpEarned > 0) {
      dispatch({
        type: 'LOAD_STATE',
        payload: { xp: state.xp + xpEarned },
      });
    }
  }, [done]);

  const timerPct = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor = timeLeft <= 5 ? 'var(--rose)' : timeLeft <= 15 ? '#D8B050' : 'var(--teal)';

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
            width: `${(sorted.length / totalTerms) * 100}%`, transition: 'width .3s ease',
          }}/>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 100,
          background: timeLeft <= 5 ? 'var(--rose-soft)' : 'var(--sand-soft)',
          border: `1.5px solid ${timeLeft <= 5 ? 'var(--rose)' : '#D8B050'}`,
          transition: 'all .3s ease',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="13" r="8" stroke={timeLeft <= 5 ? '#E8626C' : '#D8B050'} strokeWidth="2"/>
            <path d="M12 9v4l2.5 2.5" stroke={timeLeft <= 5 ? '#E8626C' : '#D8B050'} strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 2h6" stroke={timeLeft <= 5 ? '#E8626C' : '#D8B050'} strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={{
            fontSize: 14, fontWeight: 800,
            color: timeLeft <= 5 ? '#E8626C' : '#C5A43E',
            fontVariantNumeric: 'tabular-nums',
            animation: timeLeft <= 5 ? 'timerPulse 1s infinite' : 'none',
          }}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* Timer bar */}
      <div style={{
        width: '100%', maxWidth: 480, height: 6, borderRadius: 3,
        background: 'var(--border-light)', overflow: 'hidden', marginBottom: 8,
      }}>
        <div style={{
          height: '100%', borderRadius: 3,
          background: timerColor,
          width: `${timerPct}%`,
          transition: 'width 1s linear, background .3s ease',
        }}/>
      </div>

      <div className="q-badges">
        <span className="qb" style={{ background: 'var(--sand-soft)', color: '#C5A43E' }}>Term Sorter</span>
      </div>

      <div style={{ textAlign: 'center', marginBottom: 12, width: '100%', maxWidth: 480 }}>
        <p style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', lineHeight: 1.4 }}>{set.title}</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-light)', marginTop: 4 }}>
          Tap a term, then tap the correct category
        </p>
      </div>

      {/* YOU LOSE overlay */}
      {lost && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,.6)',
          animation: 'fadeIn .3s ease',
        }}>
          <div style={{
            background: 'var(--white)', borderRadius: 24, padding: '36px 32px',
            textAlign: 'center', maxWidth: 340, width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,.3)',
            animation: 'popIn .4s cubic-bezier(.175,.885,.32,1.275)',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'var(--rose-soft)', border: '3px solid var(--rose)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              {Icons.cross("#E8626C", 32)}
            </div>
            <h2 style={{
              fontFamily: "'Baloo 2', cursive", fontSize: 28, fontWeight: 800,
              color: 'var(--rose)', marginBottom: 4,
            }}>
              YOU LOSE
            </h2>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-light)', marginBottom: 16 }}>
              {loseReason}
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 12,
              background: 'var(--rose-soft)', border: '1.5px solid var(--rose)',
              marginBottom: 20,
            }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--rose)' }}>-25 XP</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-light)', fontWeight: 600, marginBottom: 20 }}>
              You sorted {sorted.length}/{totalTerms} terms correctly
            </div>

            {/* Show the correct sorting */}
            <div style={{ width: '100%', marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-light)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Correct answers:</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {set.categories.map((cat, catIdx) => (
                  <div key={catIdx} style={{
                    flex: 1, padding: 8, borderRadius: 10,
                    background: catIdx === 0 ? 'var(--teal-soft)' : 'var(--coral-soft)',
                    border: `1px solid ${catIdx === 0 ? 'var(--teal)' : 'var(--coral)'}`,
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 800, color: catIdx === 0 ? 'var(--teal)' : 'var(--coral)', marginBottom: 4, textTransform: 'uppercase' }}>{cat}</div>
                    {terms.filter(t => t.category === cat).map((t, i) => (
                      <div key={i} style={{ fontSize: 10, fontWeight: 600, color: 'var(--text)', marginBottom: 1 }}>{t.term}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => go("home")}
              style={{
                width: '100%', padding: 14, background: 'var(--coral)',
                color: 'white', borderRadius: 12, fontSize: 15, fontWeight: 800,
                boxShadow: '0 4px 12px rgba(255,123,84,.25)',
                transition: 'all .2s',
              }}
            >
              Back to Home {"\u2192"}
            </button>
          </div>
        </div>
      )}

      {!done && !lost ? (
        <>
          {/* Category buckets */}
          <div style={{ display: 'flex', gap: 10, width: '100%', maxWidth: 480, marginBottom: 16 }}>
            {set.categories.map((cat, catIdx) => (
              <button
                key={catIdx}
                onClick={() => handleCategoryTap(catIdx)}
                style={{
                  flex: 1,
                  padding: '14px 12px',
                  borderRadius: 14,
                  border: `2.5px solid ${selectedTerm !== null ? (catIdx === 0 ? 'var(--teal)' : 'var(--coral)') : 'var(--border)'}`,
                  background: selectedTerm !== null
                    ? (catIdx === 0 ? 'var(--teal-soft)' : 'var(--coral-soft)')
                    : 'var(--white)',
                  cursor: selectedTerm !== null ? 'pointer' : 'default',
                  transition: 'all .2s ease',
                  opacity: selectedTerm !== null ? 1 : 0.7,
                  boxShadow: selectedTerm !== null ? '0 4px 12px rgba(0,0,0,.06)' : '0 2px 8px rgba(0,0,0,.03)',
                  minHeight: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span style={{
                  fontSize: 12, fontWeight: 800,
                  color: catIdx === 0 ? 'var(--teal)' : 'var(--coral)',
                  textTransform: 'uppercase', letterSpacing: 0.5,
                }}>
                  {cat}
                </span>
                {buckets[catIdx].map((term, i) => (
                  <span key={i} style={{
                    fontSize: 11, fontWeight: 600, color: 'var(--text-light)',
                    background: 'var(--border-light)', borderRadius: 6,
                    padding: '3px 8px', width: '100%', textAlign: 'center',
                  }}>
                    {term}
                  </span>
                ))}
              </button>
            ))}
          </div>

          {/* Term cards */}
          <div style={{ width: '100%', maxWidth: 480 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
              Terms to Sort ({totalTerms - sorted.length} remaining)
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {terms.map((t, i) => {
                const isSorted = sorted.includes(i);
                const isSelected = selectedTerm === i;
                const isShaking = shaking === i;
                const isFlashing = flashing === i;

                if (isSorted) return null;

                return (
                  <button
                    key={i}
                    onClick={() => handleTermTap(i)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 12,
                      border: `2.5px solid ${isFlashing ? '#5BB5A2' : isSelected ? '#78818A' : 'var(--border)'}`,
                      background: isFlashing ? 'rgba(91,181,162,0.2)' : isSelected ? '#E8EAED' : 'var(--white)',
                      fontSize: 13,
                      fontWeight: 700,
                      color: isSelected ? '#4A5260' : 'var(--text)',
                      cursor: 'pointer',
                      transition: 'all .2s ease',
                      animation: isShaking ? 'shake .5s ease' : isFlashing ? 'pulse-green .5s ease' : 'none',
                      boxShadow: isSelected ? '0 2px 8px rgba(120,129,138,.25)' : '0 2px 8px rgba(0,0,0,.03)',
                    }}
                  >
                    {t.term}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : done ? (
        /* Results - Win */
        <div className="explain" style={{ width: '100%', maxWidth: 480 }}>
          <div className="rb rb-ok">
            {Icons.check("#5BB5A2", 28)}
            <div>
              <div className="rl">All Sorted!</div>
              <div className="rc">Time remaining: {formatTime(timeLeft)}</div>
            </div>
          </div>

          <div className="exp-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-light)' }}>Terms Sorted</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--teal)' }}>{totalTerms}/{totalTerms}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-light)' }}>Time Left</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#C5A43E' }}>{formatTime(timeLeft)}</span>
            </div>
            {timeLeft > 10 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-light)' }}>Speed Bonus</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--coral)' }}>+20 XP</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1.5px solid var(--border-light)' }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>Total XP</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--teal)' }}>+{xpEarned}</span>
            </div>
          </div>

          {/* Show the correct sorting */}
          <div style={{ width: '100%', marginTop: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-light)', marginBottom: 8 }}>Correct Sorting:</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {set.categories.map((cat, catIdx) => (
                <div key={catIdx} style={{
                  flex: 1, padding: 10, borderRadius: 12,
                  background: catIdx === 0 ? 'var(--teal-soft)' : 'var(--coral-soft)',
                  border: `1.5px solid ${catIdx === 0 ? 'var(--teal)' : 'var(--coral)'}`,
                }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: catIdx === 0 ? 'var(--teal)' : 'var(--coral)', marginBottom: 6, textTransform: 'uppercase' }}>{cat}</div>
                  {terms.filter(t => t.category === cat).map((t, i) => (
                    <div key={i} style={{ fontSize: 11, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{t.term}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button className="btn-next" onClick={() => go("home")} style={{ marginTop: 16 }}>
            Back to Home {"\u2192"}
          </button>
        </div>
      ) : null}

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
        @keyframes timerPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
