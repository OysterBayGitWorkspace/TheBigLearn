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

  return (
    <div className="container">
      <div className="results-card">
        <div className="ri">
          {session.roundCorrect === session.roundTotal ? Icons.trophy("#F4D06F", 52) :
           session.roundCorrect >= session.roundTotal * .7 ? Icons.sparkle("#B8A0D2", 52) :
           Icons.book("#5BB5A2", 52)}
        </div>
        <h2 className="rt">
          {session.roundCorrect === session.roundTotal ? "PERFECT!" :
           session.roundCorrect >= session.roundTotal * .7 ? "Nice work!" :
           "Keep going!"}
        </h2>
        <div className="rnums">
          <div className="rn"><span className="rb2" style={{ color: "#5BB5A2" }}>{session.roundCorrect}</span><span className="rlab">Correct</span></div>
          <div className="rdiv"/>
          <div className="rn"><span className="rb2" style={{ color: "#FF7B54" }}>{session.answers.reduce((s, a) => s + a.xpGain, 0)}</span><span className="rlab">XP</span></div>
        </div>
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
        <button className="cta cta-sm" onClick={() => go("skillTree")}>{Icons.sword("#fff", 20)}<span>Again</span></button>
        <button className="act-btn" onClick={() => go("home")}>{Icons.arrowLeft("#636E72", 18)}<span>Home</span></button>
      </div>
    </div>
  );
}
