import { useGame } from '../context/GameContext';
import { getLevel, RANKS } from '../data/ranks';
import { LEADERBOARD } from '../data/constants';
import { Icons } from '../icons/icons';

// Build rank icon lookup from RANKS
const RANK_ICONS = Object.fromEntries(RANKS.map(r => [r.name, r.component]));

export default function LeaderboardScreen({ go }) {
  const { state } = useGame();
  const lv = getLevel(state.xp);

  const lb = [...LEADERBOARD, { name: "You", xp: state.xp, streak: state.bestStreak, avatar: lv.name, isUser: true }].sort((a, b) => b.xp - a.xp);
  lb.forEach((e, i) => e.rank = i + 1);
  const uRank = lb.find(e => e.isUser)?.rank || 8;
  const above = lb[Math.max(0, uRank - 2)];
  const gap = above && !above.isUser ? above.xp - state.xp : 0;

  const BabyOyster = RANKS[0].component;

  return (
    <div className="container">
      <button className="back" onClick={() => go("home")}>{Icons.arrowLeft()} Back</button>
      <h2 className="pg-title">{Icons.trophy("#F4D06F", 26)} Gold League</h2>
      <p className="pg-desc">Top 3 promote — 4 days left</p>
      <div className="lb-list">
        {lb.slice(0, 8).map(p => (
          <div key={p.rank} className={`lb-row ${p.isUser ? "lb-user" : ""}`}>
            <span className="lb-rank">
              {p.rank <= 3 ? [Icons.crown("#F4D06F", 16), Icons.crown("#B2BEC3", 16), Icons.crown("#D4A860", 16)][p.rank - 1] : p.rank}
            </span>
            <span className="lb-ava">
              {(() => { const A = RANK_ICONS[p.avatar] || BabyOyster; return <A size={28}/>; })()}
            </span>
            <div className="lb-info">
              <span className="lb-name">{p.name}</span>
              <span className="lb-streak">{Icons.fire("#FF7B54", 11)} {p.streak}</span>
            </div>
            <div className="lb-xp">{p.xp.toLocaleString()}</div>
          </div>
        ))}
      </div>
      {gap > 0 && <div className="lb-nudge">{Icons.lightning("#FF7B54", 16)} {gap} XP to pass {above?.name}!</div>}
    </div>
  );
}
