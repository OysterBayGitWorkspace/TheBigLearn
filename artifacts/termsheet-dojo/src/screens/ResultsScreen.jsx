import { useGame } from '../context/GameContext';
import { getLevel } from '../data/ranks';
import { LEADERBOARD } from '../data/constants';
import { Icons } from '../icons/icons';

export default function ResultsScreen({ go }) {
  const { state } = useGame();
  const session = state.session;

  const lv = getLevel(state.xp);
  const lb = [...LEADERBOARD, { name: "You", xp: state.xp, streak: state.bestStreak, avatar: lv.name, isUser: true }].sort((a, b) => b.xp - a.xp);
  lb.forEach((e, i) => e.rank = i + 1);
  const uRank = lb.find(e => e.isUser)?.rank || 8;
  const above = lb[Math.max(0, uRank - 2)];
  const gap = above && !above.isUser ? above.xp - state.xp : 0;

  if (!session || !session.answers) {
    return <div className="container"><p>No results.</p><button className="cta" onClick={() => go("home")}>Go Home</button></div>;
  }

  const totalXP = session.answers.reduce((s, a) => s + a.xpGain, 0);
  const correctCount = session.roundCorrect;
  const totalCount = session.roundTotal;
  const correctPercent = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
  const wrongCount = totalCount - correctCount;

  // Longest streak in session
  let longestStreak = 0;
  let currentStreak = 0;
  for (const a of session.answers) {
    if (a.isCorrect) {
      currentStreak++;
      if (currentStreak > longestStreak) longestStreak = currentStreak;
    } else {
      currentStreak = 0;
    }
  }

  const isPerfect = correctCount === totalCount && totalCount > 0;
  const isGood = correctPercent >= 70;

  return (
    <div className="container">
      <div className="results-card">
        {/* Hero icon */}
        <div className="ri">
          {isPerfect ? Icons.trophy("#F4D06F", 52) :
           isGood ? Icons.sparkle("#B8A0D2", 52) :
           Icons.book("#5BB5A2", 52)}
        </div>
        <h2 className="rt">
          {isPerfect ? "PERFECT!" :
           isGood ? "Nice work!" :
           "Keep going!"}
        </h2>

        {/* Score summary */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          marginTop: 12,
          marginBottom: 16,
          flexWrap: 'wrap',
        }}>
          {/* Correct percentage */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#5BB5A2' }}>
              {correctCount}/{totalCount}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-faint)' }}>
              Correct ({correctPercent}%)
            </div>
          </div>

          <div style={{ width: 1, background: 'var(--border)', alignSelf: 'stretch' }}/>

          {/* XP earned */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#FF7B54' }}>
              {totalXP}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-faint)' }}>
              XP Earned
            </div>
          </div>

          <div style={{ width: 1, background: 'var(--border)', alignSelf: 'stretch' }}/>

          {/* Session streak */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              {Icons.fire("#FF7B54", 22)}
              <span style={{ fontSize: 28, fontWeight: 800, color: '#FF7B54' }}>{longestStreak}</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-faint)' }}>
              Best Streak
            </div>
          </div>
        </div>

        {/* Wrong answers notice */}
        {wrongCount > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            background: 'var(--coral-soft)',
            border: '1.5px solid var(--coral)',
            borderRadius: 10,
            marginBottom: 12,
          }}>
            {Icons.loop('#E8626C', 18)}
            <span style={{ fontSize: 13, fontWeight: 700, color: '#E8626C' }}>
              {wrongCount} {wrongCount === 1 ? 'question' : 'questions'} added to your review queue
            </span>
          </div>
        )}

        {/* Question breakdown */}
        <div className="rlist">
          {session.answers.map((a, i) => (
            <div key={i} className="rrow">
              {a.isCorrect ? Icons.check("#5BB5A2", 16) : Icons.cross("#E8626C", 16)}
              <span className="rrc">Q{i + 1}</span>
              <span className={`rrx ${a.isCorrect ? "xp-pos" : "xp-neg"}`}>{a.isCorrect ? `+${a.xpGain}` : "0"}</span>
            </div>
          ))}
        </div>

        {gap > 0 && <div className="r-nudge">{Icons.fire("#FF7B54", 16)} {gap} XP to pass {above?.name}!</div>}
      </div>

      <div className="ra">
        <button className="cta cta-sm" onClick={() => go("skillTree")}>
          {Icons.sword("#fff", 20)}<span>Continue</span>
        </button>
        <button className="act-btn" onClick={() => go("home")}>
          {Icons.arrowLeft("#636E72", 18)}<span>Home</span>
        </button>
      </div>
    </div>
  );
}
