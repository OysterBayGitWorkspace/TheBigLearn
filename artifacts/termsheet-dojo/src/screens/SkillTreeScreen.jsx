import { useGame } from '../context/GameContext';
import { TOPICS, isTopicUnlocked, getTopicProgress } from '../data/topics';
import { buildLearnSession } from '../engine/session';
import { Icons, CATEGORY_ICONS } from '../icons/icons';

// Map topic IDs to icon functions
const TOPIC_ICONS = {
  val: Icons.chart,
  esop: Icons.people,
  found: Icons.book,
  lp: Icons.money,
  ad: Icons.shield,
  pre: Icons.pie,
  gov: Icons.scale,
  fund: Icons.money,
  neg: Icons.sword,
  exit: Icons.door,
  conv: Icons.loop,
  adv: Icons.brain,
};

const TIER_COLORS = {
  1: { bg: 'var(--teal-soft)', border: 'var(--teal)', label: 'var(--teal)' },
  2: { bg: 'var(--sand-soft)', border: '#D8B050', label: '#C5A43E' },
  3: { bg: 'var(--rose-soft)', border: 'var(--rose)', label: 'var(--rose)' },
};

export default function SkillTreeScreen({ go }) {
  const { state, dispatch } = useGame();
  const cardStates = state.cardStates || {};

  const tier1 = TOPICS.filter(t => t.tier === 1);
  const tier2 = TOPICS.filter(t => t.tier === 2);
  const tier3 = TOPICS.filter(t => t.tier === 3);

  const handleTopicClick = (topic) => {
    if (!isTopicUnlocked(topic.id, cardStates)) return;
    const questions = buildLearnSession(topic.id, cardStates);
    if (questions.length === 0) return;
    dispatch({ type: 'START_SESSION', payload: { questions, mode: 'learn', topicId: topic.id } });
    go("game");
  };

  const renderTopicNode = (topic) => {
    const unlocked = isTopicUnlocked(topic.id, cardStates);
    const { total, mastered, percent } = getTopicProgress(topic.id, cardStates);
    const isMastered = total > 0 && percent >= 80;
    const iconFn = TOPIC_ICONS[topic.id] || Icons.flag;
    const tierStyle = TIER_COLORS[topic.tier];

    // Find prerequisite names for locked tooltip
    const prereqNames = topic.prerequisites.map(pId => {
      const t = TOPICS.find(tp => tp.id === pId);
      return t ? t.name : pId;
    });

    return (
      <button
        key={topic.id}
        onClick={() => handleTopicClick(topic)}
        disabled={!unlocked}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px 12px',
          background: !unlocked ? 'var(--border-light)' : isMastered ? 'var(--teal-soft)' : 'var(--white)',
          border: `2px solid ${!unlocked ? 'var(--border)' : isMastered ? 'var(--teal)' : tierStyle.border}`,
          borderRadius: 'var(--r)',
          cursor: unlocked ? 'pointer' : 'not-allowed',
          opacity: unlocked ? 1 : 0.5,
          filter: unlocked ? 'none' : 'grayscale(0.6)',
          transition: 'all .25s cubic-bezier(.34,1.56,.64,1)',
          boxShadow: unlocked ? '0 2px 8px rgba(0,0,0,.04)' : 'none',
          minWidth: 0,
          flex: '1 1 0',
          maxWidth: 180,
        }}
        className="skill-node"
      >
        <div style={{ marginBottom: 6 }}>
          {unlocked ? iconFn(isMastered ? '#5BB5A2' : undefined, 32) : (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="10" y="14" width="12" height="14" rx="2" fill="#B2BEC3" opacity="0.4" stroke="#B2BEC3" strokeWidth="1.5"/>
              <path d="M12 14V10a4 4 0 018 0v4" stroke="#B2BEC3" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </div>
        <span style={{
          fontSize: 11,
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: 6,
          color: unlocked ? 'var(--text)' : 'var(--text-faint)',
          lineHeight: 1.2,
        }}>{topic.name}</span>
        <div style={{
          width: '100%',
          height: 6,
          borderRadius: 3,
          background: 'var(--border-light)',
          overflow: 'hidden',
          marginBottom: 2,
        }}>
          <div style={{
            height: '100%',
            borderRadius: 3,
            background: isMastered ? 'var(--teal)' : 'var(--sand)',
            width: `${percent}%`,
            transition: 'width .4s ease',
          }}/>
        </div>
        <span style={{
          fontSize: 10,
          fontWeight: 700,
          color: 'var(--text-faint)',
        }}>{mastered}/{total}</span>
        {!unlocked && prereqNames.length > 0 && (
          <span style={{
            fontSize: 9,
            fontWeight: 600,
            color: 'var(--text-faint)',
            marginTop: 4,
            textAlign: 'center',
            lineHeight: 1.2,
          }}>Requires: {prereqNames.join(', ')}</span>
        )}
        {isMastered && (
          <span style={{
            fontSize: 9,
            fontWeight: 800,
            color: 'var(--teal)',
            marginTop: 2,
            letterSpacing: 0.5,
          }}>{Icons.check('#5BB5A2', 12)} MASTERED</span>
        )}
      </button>
    );
  };

  const tierLabel = (num, label) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 8,
      marginTop: num > 1 ? 16 : 0,
    }}>
      <span style={{
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: TIER_COLORS[num].label,
        background: TIER_COLORS[num].bg,
        padding: '3px 10px',
        borderRadius: 100,
        border: `1.5px solid ${TIER_COLORS[num].border}`,
      }}>Tier {num} — {label}</span>
    </div>
  );

  return (
    <div className="container">
      <button className="back" onClick={() => go("home")}>{Icons.arrowLeft()} Back</button>
      <h2 className="pg-title">Skill Tree</h2>
      <p className="pg-desc">Master topics to unlock the next tier</p>

      {tierLabel(1, 'Foundations')}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${tier1.length}, 1fr)`,
        gap: 10,
        width: '100%',
        maxWidth: 480,
        marginBottom: 8,
      }}>
        {tier1.map(renderTopicNode)}
      </div>

      {/* Connector lines */}
      <div style={{
        width: 2,
        height: 16,
        background: 'var(--border)',
        borderRadius: 1,
        margin: '0 auto',
      }}/>

      {tierLabel(2, 'Intermediate')}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10,
        width: '100%',
        maxWidth: 480,
        marginBottom: 8,
      }}>
        {tier2.map(renderTopicNode)}
      </div>

      <div style={{
        width: 2,
        height: 16,
        background: 'var(--border)',
        borderRadius: 1,
        margin: '0 auto',
      }}/>

      {tierLabel(3, 'Advanced')}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${tier3.length}, 1fr)`,
        gap: 10,
        width: '100%',
        maxWidth: 480,
        marginBottom: 8,
      }}>
        {tier3.map(renderTopicNode)}
      </div>
    </div>
  );
}
