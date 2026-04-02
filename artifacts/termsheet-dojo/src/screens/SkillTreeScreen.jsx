import { useGame } from '../context/GameContext';
import { TIERS, isTierUnlocked, isTierMastered, getTierProgress } from '../data/topics';
import { buildLearnSession } from '../engine/session';
import { Icons } from '../icons/icons';

const TIER_ICONS = {
  book: Icons.book,
  brain: Icons.brain,
  fire: Icons.fire,
};

export default function SkillTreeScreen({ go }) {
  const { state, dispatch } = useGame();
  const cardStates = state.cardStates || {};
  const questionProgress = state.questionProgress || {};

  const handleTierClick = (tier) => {
    if (!isTierUnlocked(tier.id, cardStates, questionProgress)) return;
    const questions = buildLearnSession(tier.id, cardStates, questionProgress);
    if (questions.length === 0) return;
    dispatch({ type: 'START_SESSION', payload: { questions, mode: 'learn', topicId: tier.id } });
    go("game");
  };

  return (
    <div className="container">
      <button className="back" onClick={() => go("home")}>{Icons.arrowLeft()} Back</button>
      <h2 className="pg-title">Skill Tree</h2>
      <p className="pg-desc">Complete each tier to unlock the next</p>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        width: '100%',
        maxWidth: 420,
        marginTop: 8,
      }}>
        {TIERS.map((tier, idx) => {
          const unlocked = isTierUnlocked(tier.id, cardStates, questionProgress);
          const mastered = isTierMastered(tier.id, cardStates, questionProgress);
          const { total, mastered: masteredCount, percent } = getTierProgress(tier.id, cardStates, questionProgress);
          const iconFn = TIER_ICONS[tier.icon] || Icons.flag;
          const color = tier.color;
          const req = tier.unlockRequirement;

          return (
            <div key={tier.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              {/* Connector line between tiers */}
              {idx > 0 && (
                <div style={{
                  width: 3,
                  height: 28,
                  borderRadius: 2,
                  background: unlocked ? color.border : 'var(--border)',
                  transition: 'background .3s ease',
                }}/>
              )}

              {/* Tier card */}
              <button
                onClick={() => handleTierClick(tier)}
                disabled={!unlocked}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '20px 22px',
                  background: !unlocked ? 'var(--border-light)' : mastered ? color.bg : 'var(--white)',
                  border: `2.5px solid ${!unlocked ? 'var(--border)' : mastered ? color.border : color.border}`,
                  borderRadius: 'var(--r)',
                  cursor: unlocked ? 'pointer' : 'not-allowed',
                  opacity: unlocked ? 1 : 0.55,
                  filter: unlocked ? 'none' : 'grayscale(0.5)',
                  transition: 'all .25s cubic-bezier(.34,1.56,.64,1)',
                  boxShadow: unlocked ? '0 4px 16px rgba(0,0,0,.06)' : 'none',
                  textAlign: 'left',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                className="skill-node"
              >
                {/* Icon area */}
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: unlocked ? color.bg : 'var(--border-light)',
                  border: `2px solid ${unlocked ? color.border : 'var(--border)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {unlocked ? iconFn(mastered ? color.label : color.label, 30) : (
                    <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                      <rect x="10" y="14" width="12" height="14" rx="2" fill="#B2BEC3" opacity="0.4" stroke="#B2BEC3" strokeWidth="1.5"/>
                      <path d="M12 14V10a4 4 0 018 0v4" stroke="#B2BEC3" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </div>

                {/* Text and progress area */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{
                      fontSize: 10,
                      fontWeight: 800,
                      letterSpacing: 1.5,
                      textTransform: 'uppercase',
                      color: unlocked ? color.label : 'var(--text-faint)',
                    }}>Tier {tier.tier}</span>
                    {mastered && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        {Icons.check(color.label, 14)}
                      </span>
                    )}
                  </div>
                  <div style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: unlocked ? 'var(--text)' : 'var(--text-faint)',
                    marginBottom: 3,
                  }}>{tier.name}</div>
                  <div style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'var(--text-light)',
                    marginBottom: 8,
                    lineHeight: 1.3,
                  }}>{tier.description}</div>

                  {/* Progress bar */}
                  <div style={{
                    width: '100%',
                    height: 8,
                    borderRadius: 4,
                    background: 'var(--border-light)',
                    overflow: 'hidden',
                    marginBottom: 4,
                  }}>
                    <div style={{
                      height: '100%',
                      borderRadius: 4,
                      background: mastered
                        ? `linear-gradient(90deg, ${color.border}, ${color.label})`
                        : color.border,
                      width: `${percent}%`,
                      transition: 'width .4s ease',
                    }}/>
                  </div>
                  <div style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--text-faint)',
                  }}>
                    {masteredCount}/{total} mastered ({percent}%)
                  </div>

                  {/* Lock message */}
                  {!unlocked && req && (
                    <div style={{
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'var(--text-faint)',
                      marginTop: 4,
                      lineHeight: 1.3,
                    }}>
                      {Icons.flag('var(--text-faint)', 12)} Complete 70% of {TIERS.find(t => t.id === req.tierId)?.name || req.tierId} to unlock
                    </div>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
