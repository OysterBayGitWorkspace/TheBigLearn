import { useState, useEffect, useRef } from 'react';
import { useGame } from '../context/GameContext';
import { Icons } from '../icons/icons';
import { playCorrectSound, playWrongSound } from '../sounds';
import { MATCH_PAIRS_SETS } from '../data/gameModes';

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

export default function MatchPairsScreen({ go }) {
  const { state, dispatch } = useGame();
  const [set] = useState(() => MATCH_PAIRS_SETS[Math.floor(Math.random() * MATCH_PAIRS_SETS.length)]);
  const [terms] = useState(() => shuffle(set.pairs.map((p, i) => ({ ...p, idx: i, type: 'term' }))));
  const [defs] = useState(() => shuffle(set.pairs.map((p, i) => ({ ...p, idx: i, type: 'def' }))));
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDef, setSelectedDef] = useState(null);
  const [matched, setMatched] = useState([]);
  const [shaking, setShaking] = useState(null);
  const [flashing, setFlashing] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const timerRef = useRef(null);

  // Timer
  useEffect(() => {
    if (done) return;
    timerRef.current = setInterval(() => setElapsed(t => t + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [done]);

  // Check for match when both selected
  useEffect(() => {
    if (selectedTerm === null || selectedDef === null) return;

    const termItem = terms[selectedTerm];
    const defItem = defs[selectedDef];

    if (termItem.idx === defItem.idx) {
      // Correct match
      playCorrectSound();
      setFlashing(termItem.idx);
      setTimeout(() => {
        setMatched(prev => [...prev, termItem.idx]);
        setFlashing(null);
        setSelectedTerm(null);
        setSelectedDef(null);
        setCorrectCount(c => c + 1);
      }, 500);
    } else {
      // Wrong match
      playWrongSound();
      setShaking({ term: selectedTerm, def: selectedDef });
      setTimeout(() => {
        setShaking(null);
        setSelectedTerm(null);
        setSelectedDef(null);
      }, 600);
    }
  }, [selectedTerm, selectedDef]);

  // Check completion
  useEffect(() => {
    if (matched.length === 6 && !done) {
      clearInterval(timerRef.current);
      setDone(true);
    }
  }, [matched.length]);

  const handleTermTap = (i) => {
    if (done || matched.includes(terms[i].idx)) return;
    if (flashing !== null || shaking !== null) return;
    setSelectedTerm(i);
  };

  const handleDefTap = (i) => {
    if (done || matched.includes(defs[i].idx)) return;
    if (flashing !== null || shaking !== null) return;
    if (selectedTerm === null) return;
    setSelectedDef(i);
  };

  const xpEarned = correctCount * 10 + (elapsed < 30 && matched.length === 6 ? 20 : 0);

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
            width: `${(matched.length / 6) * 100}%`, transition: 'width .3s ease',
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
        <span className="qb qb-cat">{set.category}</span>
        <span className="qb" style={{ background: 'var(--teal-soft)', color: 'var(--teal)' }}>Match Pairs</span>
      </div>

      <div style={{ width: '100%', maxWidth: 480, marginBottom: 8 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-light)', textAlign: 'center', marginBottom: 12 }}>
          Tap a term, then tap its matching definition
        </p>
      </div>

      {!done ? (
        <>
          {/* Terms */}
          <div style={{ width: '100%', maxWidth: 480, marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Terms</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {terms.map((t, i) => {
                const isMatched = matched.includes(t.idx);
                const isSelected = selectedTerm === i;
                const isShaking = shaking && shaking.term === i;
                const isFlashing = flashing === t.idx;
                return (
                  <button
                    key={`t-${i}`}
                    onClick={() => handleTermTap(i)}
                    disabled={isMatched}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 12,
                      border: `2.5px solid ${isFlashing ? '#5BB5A2' : isSelected ? 'var(--teal)' : isMatched ? 'transparent' : 'var(--border)'}`,
                      background: isFlashing ? 'rgba(91,181,162,0.2)' : isSelected ? 'var(--teal-soft)' : isMatched ? 'var(--border-light)' : 'var(--white)',
                      fontSize: 13,
                      fontWeight: 700,
                      color: isMatched ? 'var(--text-faint)' : isSelected ? 'var(--teal)' : 'var(--text)',
                      cursor: isMatched ? 'default' : 'pointer',
                      transition: 'all .2s ease',
                      opacity: isMatched ? 0.4 : 1,
                      textDecoration: isMatched ? 'line-through' : 'none',
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

          {/* Definitions */}
          <div style={{ width: '100%', maxWidth: 480 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>Definitions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {defs.map((d, i) => {
                const isMatched = matched.includes(d.idx);
                const isSelected = selectedDef === i;
                const isShaking = shaking && shaking.def === i;
                const isFlashing = flashing === d.idx;
                return (
                  <button
                    key={`d-${i}`}
                    onClick={() => handleDefTap(i)}
                    disabled={isMatched || selectedTerm === null}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 14,
                      border: `2.5px solid ${isFlashing ? '#5BB5A2' : isMatched ? 'transparent' : selectedTerm !== null && !isMatched ? 'var(--border)' : 'var(--border-light)'}`,
                      background: isFlashing ? 'rgba(91,181,162,0.2)' : isMatched ? 'var(--border-light)' : 'var(--white)',
                      fontSize: 13,
                      fontWeight: 600,
                      color: isMatched ? 'var(--text-faint)' : 'var(--text)',
                      cursor: isMatched || selectedTerm === null ? 'default' : 'pointer',
                      transition: 'all .2s ease',
                      textAlign: 'left',
                      opacity: isMatched ? 0.4 : selectedTerm === null ? 0.6 : 1,
                      animation: isShaking ? 'shake .5s ease' : isFlashing ? 'pulse-green .5s ease' : 'none',
                      boxShadow: '0 2px 8px rgba(0,0,0,.03)',
                    }}
                  >
                    {d.definition}
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
              <div className="rl">All Matched!</div>
              <div className="rc">Time: {formatTime(elapsed)}</div>
            </div>
          </div>

          <div className="exp-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-light)' }}>Pairs Matched</span>
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

          <button className="btn-next" onClick={() => go("home")}>
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
