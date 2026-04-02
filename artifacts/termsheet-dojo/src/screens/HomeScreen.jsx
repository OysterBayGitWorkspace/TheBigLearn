import { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { getReviewCount, buildReviewSession } from '../engine/session';
import { getLevel, getNextLevel, RANKS } from '../data/ranks';
import { ACHIEVEMENTS } from '../data/achievements';
import { DAILY_QUESTS } from '../data/constants';
import { useLeaderboard, generateTaunts } from '../lib/leaderboard';
import { ALL_QUESTIONS } from '../data/questions';
import { TOPICS } from '../data/topics';
import { getTopicProgress } from '../data/topics';
import { Icons } from '../icons/icons';
import { ACHIEVEMENT_STICKERS } from '../icons/stickers';

function StreakFire({ count }) {
  if (count <= 0) return <div style={{display:'flex',alignItems:'center',gap:4,opacity:.4}}>{Icons.fire("#B2BEC3", 32)}<span style={{fontFamily:"'Baloo 2',cursive",fontSize:20,color:'#B2BEC3'}}>0</span></div>;
  return (<div className="streak-fire"><div className="fire-glow"/><div className="fire-particles">{Array.from({ length: Math.min(count, 8) }).map((_, i) => <div key={i} className="fire-particle" style={{ animationDelay: `${i * 0.15}s`, left: `${5 + Math.random() * 20}px` }}/>)}</div><div className="fire-icon">{Icons.fire("#FF7B54", 36 + Math.min(count, 20))}</div><div className="fire-count">{count}</div></div>);
}

export default function HomeScreen({ go }) {
  const { state, dispatch } = useGame();
  const { user } = useAuth();
  const { leaderboard, userRank } = useLeaderboard(user, state);
  const taunts = generateTaunts(leaderboard, userRank);
  const [tauntIdx, setTauntIdx] = useState(0);

  useEffect(() => {
    if (taunts.length === 0) return;
    const t = setInterval(() => setTauntIdx(i => (i + 1) % taunts.length), 4500);
    return () => clearInterval(t);
  }, [taunts.length]);

  const lv = getLevel(state.xp);
  const nlv = getNextLevel(state.xp);
  const pct = nlv ? ((state.xp - lv.xp) / (nlv.xp - lv.xp)) * 100 : 100;
  const RIcon = lv.component;
  const isLegendary = lv.tier === 'Legendary';

  const reviewCount = getReviewCount(state.cardStates || {});

  const totalQuestions = ALL_QUESTIONS.length;
  const totalMastered = Object.values(state.questionProgress || {}).filter(qp => qp && qp.isMastered === true).length;

  return (
    <div className="container">
      {/* Account button */}
      <div style={{width:'100%',maxWidth:480,display:'flex',justifyContent:'flex-end',padding:'8px 0'}}>
        <button onClick={() => go(user ? 'profile' : 'login')} style={{
          background: user ? 'var(--teal-soft)' : 'var(--coral-soft)',
          border: `1.5px solid ${user ? 'var(--teal)' : 'var(--coral)'}`,
          borderRadius: 100, padding: '6px 14px', fontSize: 12, fontWeight: 700,
          color: user ? 'var(--teal)' : 'var(--coral)', cursor: 'pointer',
        }}>
          {user ? (user.email?.split('@')[0] || 'Profile') : 'Log in to save progress'}
        </button>
      </div>
      <div className="hero"><div className="hero-blob b1"/><div className="hero-blob b2"/><img src="/vc-dojo-logo.svg" alt="VC Dojo" style={{position:'relative',zIndex:1,width:'100%',maxWidth:360,height:'auto'}}/></div>
      <div className="vitals-bar"><StreakFire count={state.bestStreak}/></div>
      <div className="rank-card" style={isLegendary?{background:lv.bg,border:`2px solid ${lv.border||'#806020'}`}:{}}><div className="rank-ava"><RIcon size={52}/></div><div className="rank-info"><div className="rank-tier" style={{fontSize:10,letterSpacing:2,fontWeight:700,textTransform:'uppercase',color:isLegendary?lv.color:'var(--text-light)',marginBottom:1}}>{lv.tier}</div><div className="rank-name" style={{color:lv.color}}>{lv.name}</div><div className="rank-xp" style={isLegendary?{color:'#B8B0A8'}:{}}>{state.xp.toLocaleString()} XP</div>{nlv&&<><div className="rank-bar"><div className="rank-fill" style={{width:`${pct}%`,background:`linear-gradient(90deg,${lv.color},${nlv.color})`}}/></div><div className="rank-next" style={isLegendary?{color:'#A0A0A0'}:{}}>{nlv.xp-state.xp} XP to {nlv.name}</div></>}</div></div>

      {/* Fuehrerschein progress bar */}
      <div style={{width:'100%',maxWidth:480,marginBottom:10}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4}}>
          <span style={{fontSize:12,fontWeight:800,color:'var(--text-light)'}}>Mastery Progress</span>
          <span style={{fontSize:11,fontWeight:700,color:'var(--text-faint)'}}>{totalMastered}/{totalQuestions}</span>
        </div>
        <div className="rank-bar"><div className="rank-fill" style={{width:`${totalQuestions > 0 ? (totalMastered/totalQuestions)*100 : 0}%`,background:'linear-gradient(90deg,var(--teal),var(--sand))'}}/></div>
      </div>

      <div className="taunt"><div className="taunt-dot"/><span>{taunts[tauntIdx % taunts.length] || 'Start training to see your stats!'}</span></div>
      <button className="cta" onClick={()=>go("skillTree")}><div className="cta-shine"/>{Icons.sword("#fff",28)}<span>Start Training</span></button>

      {reviewCount > 0 && (
        <button className="cta" onClick={() => {
          const questions = buildReviewSession(state.cardStates || {});
          if (questions.length > 0) {
            dispatch({ type: 'START_SESSION', payload: { questions, mode: 'review' } });
            go("game");
          }
        }} style={{background:'var(--teal)',boxShadow:'0 6px 24px rgba(91,181,162,.35)',marginTop:-2}}>
          <div className="cta-shine"/>{Icons.loop("#fff",28)}<span>{reviewCount} Reviews Due</span>
        </button>
      )}

      <div className="action-row">
        <button className="act-btn" onClick={()=>{dispatch({type:'VIEW_LIBRARY'});go("library");}}>{Icons.book("#5BB5A2",24)}<span>Library</span></button>
        <button className="act-btn" onClick={()=>go("leaderboard")}>{Icons.trophy("#F4D06F",24)}<span>League</span></button>
      </div>

      <div className="sec-head"><span className="sec-title">Fun Games</span><span className="sec-count">4 modes</span></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,width:'100%',maxWidth:480,marginBottom:16}}>
        <button className="act-btn" onClick={()=>go("matchPairs")} style={{padding:'16px 10px',gap:6}}>
          {Icons.dice("#B8A0D2",28)}
          <span style={{fontSize:13,fontWeight:800,color:'var(--text)'}}>Match Pairs</span>
          <span style={{fontSize:10,fontWeight:600,color:'var(--text-faint)',lineHeight:1.3}}>Link terms to definitions</span>
        </button>
        <button className="act-btn" onClick={()=>go("trueFalse")} style={{padding:'16px 10px',gap:6}}>
          {Icons.target("#FF7B54",28)}
          <span style={{fontSize:13,fontWeight:800,color:'var(--text)'}}>True / False</span>
          <span style={{fontSize:10,fontWeight:600,color:'var(--text-faint)',lineHeight:1.3}}>Speed round challenge</span>
        </button>
        <button className="act-btn" onClick={()=>go("fillBlank")} style={{padding:'16px 10px',gap:6}}>
          {Icons.brain("#B8A0D2",28)}
          <span style={{fontSize:13,fontWeight:800,color:'var(--text)'}}>Fill the Blank</span>
          <span style={{fontSize:10,fontWeight:600,color:'var(--text-faint)',lineHeight:1.3}}>Complete the concept</span>
        </button>
        <button className="act-btn" onClick={()=>go("termSorter")} style={{padding:'16px 10px',gap:6}}>
          {Icons.scale("#F4D06F",28)}
          <span style={{fontSize:13,fontWeight:800,color:'var(--text)'}}>Term Sorter</span>
          <span style={{fontSize:10,fontWeight:600,color:'var(--text-faint)',lineHeight:1.3}}>Sort into categories</span>
        </button>
      </div>

      <div className="sec-head"><span className="sec-title">Daily Quests</span><span className="sec-timer">Resets in 6h</span></div>
      {DAILY_QUESTS.map(dq=>{const p=state.questProgress[dq.id]||0;const d=p>=dq.target;return<div key={dq.id} className={`quest ${d?"quest-done":""}`}><div className="q-left">{dq.icon==="fire"?Icons.fire(d?"#5BB5A2":"#FF7B54",22):dq.icon==="sword"?Icons.sword(d?"#5BB5A2":"#FF7B54",22):Icons.book(d?"#5BB5A2":"#5BB5A2",22)}</div><div className="q-mid"><div className="q-title">{dq.title}{d&&Icons.check("#5BB5A2",16)}</div><div className="q-bar"><div className="q-fill" style={{width:`${Math.min(p/dq.target*100,100)}%`,background:d?"var(--teal)":"var(--coral)"}}/></div></div><div className="q-right"><div className={`q-reward ${d?"q-reward-d":""}`}>+{dq.xpReward}</div><div className="q-count">{p}/{dq.target}</div></div></div>;})}

      <div className="fomo"><div className="fomo-shine"/>{Icons.lightning("#B8A0D2",18)}<div className="fomo-text"><strong>Anti-Dilution Sprint</strong> 2x XP this weekend<br/><span className="fomo-sub">247 players · Ends Sunday</span></div></div>

      <div className="sec-head"><span className="sec-title">Stickers</span><span className="sec-count">{state.achievements.length}/{ACHIEVEMENTS.length}</span></div>
      <div className="stk-grid">{ACHIEVEMENTS.map(a=>{const u=state.achievements.includes(a.id);const S=ACHIEVEMENT_STICKERS[a.id];return<div key={a.id} className={`stk ${u?"stk-on":"stk-off"}`} style={u?{background:a.bgColor,borderColor:a.borderColor}:{}}><span className="stk-icon">{S?<S size={42}/>:null}</span><span className="stk-name">{a.name}</span></div>;})}</div>
    </div>
  );
}
