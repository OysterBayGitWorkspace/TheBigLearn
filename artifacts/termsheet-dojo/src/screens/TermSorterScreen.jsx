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
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function TermSorterScreen({ go }) {
  const { state, dispatch } = useGame();
  const [set] = useState(() => TERM_SORTER_SETS[Math.floor(Math.random() * TERM_SORTER_SETS.length)]);
  const [terms] = useState(() => shuffle(set.terms));
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [sorted, setSorted] = useState([]);
  const [shaking, setShaking] = useState(null);
  const [flashing, setFlashing] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [buckets, setBuckets] = useState({ 0: [], 1: [] });
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (done) return;
    timerRef.current = setInterval(() => setElapsed(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [done]);

  // Check completion
  useEffect(() => {
    if (sorted.length === 6 && !done) {
      clearInterval(timerRef.current);
      setDone(true);
    }
  }, [sorted.length]);

  const handleTermTap = (termIdx) => {
    if (done || sorted.includes(termIdx)) return;
    if (flashing !== null || shaking !== null) return;
    setSelectedTerm(selectedTerm === termIdx ? null : termIdx);
  };

  const handleCategoryTap = (catIdx) => {
    if (done || selectedTerm === null) return;
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
      // Wrong sort
      playWrongSound();
      setShaking(selectedTerm);
      setTimeout(() => {
        setShaking(null);
        setSelectedTerm(null);
      }, 600);
    }
  };

  const xpEarned = correctCount * 10 + (elapsed < 30 && sorted.length === 6 ? 20 : 0);

  // Award XP on completion
  useEffect(() => {
    if (done && xpEarned > 0) {
      dispatch({
        type: 'LOAD_STATE',
        payload: { xp: state.xp + xpEarned },
      });
    }
  }, [done]);

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
            width: `${(sorted.length / 6) * 100}%`, transition: 'width .3s ease',
          }}/>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 100,
          background: 'var(--sand-soft)', border: '1.5px solid #D8B050',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="13" r="8" stroke="#D8B050" strokeWidth="2"/>
            <path d="M12 9v4l2.5 2.5" stroke="#D8B050" strokeWidth="2" strokeLinecap="round"/>
            <path d="M9 2h6" stroke="#D8B050" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#C5A43E', fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(elapsed)}
          </span>
        </div>
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

      {!done ? (
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
              Terms to Sort ({6 - sorted.length} remaining)
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
                      border: `2.5px solid ${isFlashing ? '#5BB5A2' : isSelected ? 'var(--teal)' : 'var(--border)'}`,
                      background: isFlashing ? 'rgba(91,181,162,0.2)' : isSelected ? 'var(--teal-soft)' : 'var(--white)',
                      fontSize: 13,
                      fontWeight: 700,
                      color: isSelected ? 'var(--teal)' : 'var(--text)',
                      cursor: 'pointer',
                      transition: 'all .2s ease',
                      animation: isShaking ? 'shake .5s ease' : isFlashing ? 'pulse-green .5s ease' : 'none',
                      boxShadow: isSelected ? '0 2px 8px rgba(91,181,162,.2)' : '0 2px 8px rgba(0,0,0,.03)',
                    }}
                  >
                    {t.term}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        /* Results */
        <div className="explain" style={{ width: '100%', maxWidth: 480 }}>
          <div className="rb rb-ok">
            {Icons.check("#5BB5A2", 28)}
            <div>
              <div className="rl">All Sorted!</div>
              <div className="rc">Time: {formatTime(elapsed)}</div>
            </div>
          </div>

          <div className="exp-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-light)' }}>Terms Sorted</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--teal)' }}>6/6</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-light)' }}>Time</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#C5A43E' }}>{formatTime(elapsed)}</span>
            </div>
            {elapsed < 30 && (
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
                  {set.terms.filter(t => t.category === cat).map((t, i) => (
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
      `}</style>
    </div>
  );
}
