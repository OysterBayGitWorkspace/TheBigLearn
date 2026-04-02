import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { getLevel, RANKS } from '../data/ranks';
import { useLeaderboard } from '../lib/leaderboard';
import { Icons } from '../icons/icons';

const RANK_ICONS = Object.fromEntries(RANKS.map(r => [r.name, r.component]));

function BadgeIcons({ badges }) {
  if (!badges || badges.length === 0) return null;
  return (
    <span style={{ display: 'inline-flex', gap: 3, marginLeft: 4, verticalAlign: 'middle' }}>
      {badges.includes('streak_master') && (
        <span title="Streak Master (20+)" style={{ display: 'inline-flex' }}>{Icons.fire('#FF7B54', 12)}</span>
      )}
      {badges.includes('elite') && (
        <span title="Elite (40+)" style={{ display: 'inline-flex' }}>{Icons.lightning('#B8A0D2', 12)}</span>
      )}
      {badges.includes('dragon_king') && (
        <span title="Dragon King (100+)" className="dragon-king-badge" style={{ display: 'inline-flex' }}>
          {Icons.crown('#F4D06F', 13)}
        </span>
      )}
    </span>
  );
}

export default function LeaderboardScreen({ go }) {
  const { state } = useGame();
  const { user } = useAuth();
  const { leaderboard: lb, userRank, above, gap, loading } = useLeaderboard(user, state);
  const lv = getLevel(state.xp);

  const BabyOyster = RANKS[0].component;

  return (
    <div className="container">
      <button className="back" onClick={() => go("home")}>{Icons.arrowLeft()} Back</button>
      <h2 className="pg-title">{Icons.trophy("#F4D06F", 26)} Leaderboard</h2>
      <p className="pg-desc">{lb.length} {lb.length === 1 ? 'player' : 'players'} competing</p>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-faint)', fontWeight: 700 }}>Loading...</div>
      ) : (
        <div className="lb-list">
          {lb.slice(0, 10).map(p => (
            <div key={p.rank} className={`lb-row ${p.isUser ? "lb-user" : ""}`}>
              <span className="lb-rank">
                {p.rank <= 3 ? [Icons.crown("#F4D06F", 16), Icons.crown("#B2BEC3", 16), Icons.crown("#D4A860", 16)][p.rank - 1] : p.rank}
              </span>
              <span className="lb-ava">
                {(() => { const A = RANK_ICONS[p.avatar] || BabyOyster; return <A size={28}/>; })()}
              </span>
              <div className="lb-info">
                <span className="lb-name">{p.name}<BadgeIcons badges={p.badges}/></span>
                <span className="lb-streak">{Icons.fire("#FF7B54", 11)} {p.streak} best</span>
              </div>
              <div className="lb-xp">{p.xp.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}

      {gap > 0 && <div className="lb-nudge">{Icons.lightning("#FF7B54", 16)} {gap} XP to pass {above?.name}!</div>}

      <style>{`
        .dragon-king-badge {
          animation: dragonKingGlow 2s ease-in-out infinite;
        }
        @keyframes dragonKingGlow {
          0%, 100% { filter: drop-shadow(0 0 2px #F4D06F); opacity: 1; }
          50% { filter: drop-shadow(0 0 8px #F4D06F) drop-shadow(0 0 14px #E8A020); opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}
