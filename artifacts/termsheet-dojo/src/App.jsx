import { useState, useEffect, useRef } from "react";
import { GameProvider, useGame } from "./context/GameContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { getLevel } from "./data/ranks";
import { ACHIEVEMENTS } from "./data/achievements";
import { Icons } from "./icons/icons";
import { ACHIEVEMENT_STICKERS } from "./icons/stickers";
import { playLevelUpSound, playPerfectRoundSound } from "./sounds";
import HomeScreen from "./screens/HomeScreen";
import SkillTreeScreen from "./screens/SkillTreeScreen";
import GameScreen from "./screens/GameScreen";
import ResultsScreen from "./screens/ResultsScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import LibraryScreen from "./screens/LibraryScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";

function ConfettiBurst({ active }) {
  const canvasRef = useRef(null); const particles = useRef([]); const animRef = useRef(null);
  useEffect(() => { if (!active || !canvasRef.current) return; const canvas = canvasRef.current; const ctx = canvas.getContext("2d"); canvas.width = window.innerWidth; canvas.height = window.innerHeight; const colors = ["#FF7B54","#5BB5A2","#F4D06F","#B8A0D2","#E8626C","#7EC8B8"]; particles.current = Array.from({ length: 80 }, () => ({ x: canvas.width/2+(Math.random()-.5)*200, y: canvas.height/2, vx:(Math.random()-.5)*16, vy:-Math.random()*18-4, size:Math.random()*8+4, color:colors[Math.floor(Math.random()*colors.length)], rotation:Math.random()*360, rotSpeed:(Math.random()-.5)*12, life:1, shape:Math.random()>.5?"circle":"rect" })); const animate = () => { ctx.clearRect(0,0,canvas.width,canvas.height); let alive=false; for(const p of particles.current){if(p.life<=0)continue;alive=true;p.x+=p.vx;p.y+=p.vy;p.vy+=.4;p.vx*=.99;p.rotation+=p.rotSpeed;p.life-=.012;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rotation*Math.PI/180);ctx.globalAlpha=Math.max(0,p.life);ctx.fillStyle=p.color;if(p.shape==="circle"){ctx.beginPath();ctx.arc(0,0,p.size/2,0,Math.PI*2);ctx.fill();}else{ctx.fillRect(-p.size/2,-p.size/4,p.size,p.size/2);}ctx.restore();}if(alive)animRef.current=requestAnimationFrame(animate);}; animRef.current=requestAnimationFrame(animate); return()=>{if(animRef.current)cancelAnimationFrame(animRef.current);}; }, [active]); if(!active)return null; return <canvas ref={canvasRef} style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:9999}}/>;
}

function AppInner() {
  const { state, dispatch } = useGame();
  const [screen, setScreen] = useState("home");
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [flameUp, setFlameUp] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAchPopup, setShowAchPopup] = useState(false);
  const [newAch, setNewAch] = useState([]);
  const [trans, setTrans] = useState(false);
  const [toast, setToast] = useState(null);
  const [xpFloat, setXpFloat] = useState({ val: 0, show: false, key: 0 });
  const [showChest, setShowChest] = useState(false);
  const [chestXP, setChestXP] = useState(0);
  const prevLvl = useRef(getLevel(state.xp).name);

  const go = s => { setTrans(true); setTimeout(() => { setScreen(s); setTrans(false); }, 180); };
  const notify = (msg, type = "info") => { setToast({ msg, type }); setTimeout(() => setToast(null), 2800); };

  // Level up detection
  useEffect(() => {
    const cl = getLevel(state.xp).name;
    if (cl !== prevLvl.current) {
      playLevelUpSound();
      setShowLevelUp(true);
      setShowConfetti(true);
      setTimeout(() => { setShowLevelUp(false); setShowConfetti(false); }, 4000);
      prevLvl.current = cl;
    }
  }, [state.xp]);

  // React to answer effects from context
  useEffect(() => {
    if (!state._lastAnswer) return;
    const la = state._lastAnswer;

    if (la.isCorrect && la.newStreak === 10) {
      setFlameUp(true);
      setTimeout(() => setFlameUp(false), 1200);
    }

    if (la.isCorrect && la.xpGain) {
      setXpFloat({ val: la.xpGain, show: true, key: Date.now() });
      setTimeout(() => setXpFloat(p => ({ ...p, show: false })), 1200);
    }

    if (la.questBonusXP > 0) {
      notify(`Quest done! +${la.questBonusXP} XP`, "success");
    }
  }, [state._lastAnswer]);

  // Achievement popup
  useEffect(() => {
    if (state._newAchievements && state._newAchievements.length > 0) {
      setNewAch(state._newAchievements);
      setShowAchPopup(true);
      setTimeout(() => setShowAchPopup(false), 3500);
    }
  }, [state._newAchievements]);

  // Perfect round and chest detection (on session end via NEXT_QUESTION)
  useEffect(() => {
    if (state._perfectRound) {
      playPerfectRoundSound();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
    if (state._chestXP) {
      setChestXP(state._chestXP);
      setShowChest(true);
    }
  }, [state._perfectRound, state._chestXP]);

  const lv = getLevel(state.xp);
  const RIcon = lv.component;
  const isLegendary = lv.tier === 'Legendary';

  return (
    <div className={`app-root${flameUp ? " flame-burst" : ""}${state.currentStreak >= 10 ? " flame-glow" : ""}`}>
      <style>{CSS}</style>
      <ConfettiBurst active={showConfetti}/>

      {toast && <div className={`toast toast-${toast.type}`}>{toast.type === "success" ? Icons.check("#5BB5A2", 20) : toast.type === "danger" ? Icons.cross("#E8626C", 20) : Icons.sparkle("#B8A0D2", 20)}<span>{toast.msg}</span></div>}

      {showLevelUp && <div className="overlay"><div className="level-up-card" style={{background:lv.bg,...(isLegendary?{border:`3px solid ${lv.border||'#806020'}`}:{})}}><div className="lu-icon"><RIcon size={80}/></div><div className="lu-label" style={isLegendary?{color:'#B8A888'}:{}}>RANK UP!</div><div className="lu-tier" style={{color:isLegendary?lv.color:'var(--text-light)',fontSize:11,letterSpacing:3,fontWeight:700,textTransform:'uppercase',marginBottom:2}}>{lv.tier}</div><div className="lu-name" style={{color:lv.color}}>{lv.name}</div><div className="lu-sub" style={isLegendary?{color:'#A0A0A0'}:{}}>{lv.subtitle}</div></div></div>}

      {showAchPopup && newAch.length > 0 && <div className="ach-popup">{newAch.map(a => { const S = ACHIEVEMENT_STICKERS[a.id]; return <div key={a.id} className="ach-toast" style={{background:a.bgColor,borderColor:a.borderColor}}><span style={{display:'flex'}}>{S ? <S size={36}/> : null}</span><div><div className="ach-label">Sticker Unlocked!</div><div className="ach-name">{a.name}</div></div></div>; })}</div>}

      {showChest && <div className="overlay" onClick={() => setShowChest(false)}><div className="chest-card"><div className="chest-anim">{Icons.chest("#F4D06F", 64)}</div><div className="chest-title">Bonus Reward!</div><div className="chest-xp">+{chestXP} XP</div><div className="chest-tap">Tap to continue</div></div></div>}

      {xpFloat.show && <div className="xp-float" key={xpFloat.key}>+{xpFloat.val} XP</div>}

      <div className={`screen-wrap ${trans ? "screen-exit" : ""}`}>
        {screen === "login" && <LoginScreen go={go}/>}
        {screen === "profile" && <ProfileScreen go={go}/>}
        {screen === "home" && <HomeScreen go={go}/>}
        {screen === "skillTree" && <SkillTreeScreen go={go}/>}
        {screen === "game" && <GameScreen go={go}/>}
        {screen === "results" && <ResultsScreen go={go}/>}
        {screen === "leaderboard" && <LeaderboardScreen go={go}/>}
        {screen === "library" && <LibraryScreen go={go}/>}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppWithAuth/>
    </AuthProvider>
  );
}

function AppWithAuth() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFF8F0', fontFamily: "'Baloo 2', cursive", fontSize: 24, color: '#FF7B54' }}>
        Loading...
      </div>
    );
  }

  return (
    <GameProvider userId={user?.id || null}>
      <AppInner/>
    </GameProvider>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Baloo+2:wght@500;600;700;800&display=swap');
:root{--cream:#FFF8F0;--white:#FFFFFF;--coral:#FF7B54;--coral-soft:#FFF0EB;--teal:#5BB5A2;--teal-soft:#E8F5F1;--lavender:#B8A0D2;--lavender-soft:#F0EBF5;--sand:#F4D06F;--sand-soft:#FFF8E7;--rose:#E8626C;--rose-soft:#FDECEE;--text:#2D3436;--text-light:#636E72;--text-faint:#B2BEC3;--border:#E8E0D8;--border-light:#F0EDEA;--r:16px;--rs:12px;--rx:8px}
*{box-sizing:border-box;margin:0;padding:0}button{cursor:pointer;border:none;outline:none;font-family:'Nunito',sans-serif}
.app-root{min-height:100vh;background:var(--cream);background-image:radial-gradient(circle at 1px 1px,#E8E0D833 1px,transparent 0);background-size:28px 28px;font-family:'Nunito',sans-serif;color:var(--text);overflow-x:hidden}
.container{max-width:660px;margin:0 auto;padding:20px 16px 40px;display:flex;flex-direction:column;align-items:center}
.screen-wrap{animation:slideIn .25s ease-out}.screen-exit{opacity:0;transform:translateY(8px);transition:all .18s}
@keyframes slideIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes dragonGlow{0%,100%{filter:drop-shadow(0 0 6px #F4A63A) drop-shadow(0 0 14px #E8593C)}50%{filter:drop-shadow(0 0 12px #F9D054) drop-shadow(0 0 22px #E8723A)}}
@keyframes glowHydra{0%,100%{filter:drop-shadow(0 0 4px #F4A040)}50%{filter:drop-shadow(0 0 10px #F9D054)}}
@keyframes glowWyvern{0%,100%{filter:drop-shadow(0 0 5px #8040C0)}50%{filter:drop-shadow(0 0 16px #A860E0)}}
@keyframes glowIceDragon{0%,100%{filter:drop-shadow(0 0 8px #4080F0)}50%{filter:drop-shadow(0 0 20px #60A0FF)}}
@keyframes glowShadowDragon{0%,100%{filter:drop-shadow(0 0 6px #7030A0)}50%{filter:drop-shadow(0 0 18px #9050D0)}}
@keyframes glowBloodDragon{0%,100%{filter:drop-shadow(0 0 10px #C01020) drop-shadow(0 0 24px #801010)}50%{filter:drop-shadow(0 0 20px #E03040) drop-shadow(0 0 40px #C01020)}}
@keyframes dragonBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.02)}}
.flame-burst{animation:flameBurst 1.2s ease-out}
@keyframes flameBurst{0%{box-shadow:inset 0 0 0 0 transparent}8%{box-shadow:inset 0 0 120px 60px rgba(255,123,84,.45),inset 0 0 200px 100px rgba(244,166,58,.25)}30%{box-shadow:inset 0 0 80px 30px rgba(255,123,84,.2),inset 0 0 160px 60px rgba(244,166,58,.1)}100%{box-shadow:inset 0 0 0 0 transparent}}
.flame-glow{box-shadow:inset 0 -80px 80px -40px rgba(255,123,84,.08),inset 0 0 60px 20px rgba(244,166,58,.04);transition:box-shadow 1.2s ease}
.overlay{position:fixed;inset:0;background:rgba(45,52,54,.5);backdrop-filter:blur(8px);z-index:1000;display:flex;align-items:center;justify-content:center;animation:fadeIn .3s}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.level-up-card{text-align:center;padding:40px 48px;border-radius:28px;border:3px solid var(--border);box-shadow:0 20px 60px rgba(0,0,0,.15);animation:popIn .5s cubic-bezier(.34,1.56,.64,1)}
@keyframes popIn{0%{transform:scale(.5);opacity:0}100%{transform:scale(1);opacity:1}}
.lu-icon{margin-bottom:12px}.lu-label{font-family:'Baloo 2',cursive;font-size:14px;letter-spacing:4px;color:var(--text-light);font-weight:700}.lu-name{font-family:'Baloo 2',cursive;font-size:38px;font-weight:800;line-height:1.1}.lu-sub{font-size:15px;color:var(--text-light);margin-top:6px;font-style:italic}
.toast{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:1001;display:flex;align-items:center;gap:8px;padding:12px 20px;border-radius:var(--r);box-shadow:0 8px 24px rgba(0,0,0,.12);animation:toastIn .4s cubic-bezier(.34,1.56,.64,1);font-size:14px;font-weight:700;max-width:90vw}
.toast-success{background:var(--teal-soft);border:2px solid var(--teal);color:var(--teal)}.toast-danger{background:var(--rose-soft);border:2px solid var(--rose);color:var(--rose)}.toast-info{background:var(--lavender-soft);border:2px solid var(--lavender);color:var(--lavender)}
@keyframes toastIn{0%{transform:translateX(-50%) translateY(-20px) scale(.8);opacity:0}100%{transform:translateX(-50%) translateY(0) scale(1);opacity:1}}
.ach-popup{position:fixed;top:16px;right:16px;z-index:1001;display:flex;flex-direction:column;gap:8px}
.ach-toast{display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:var(--r);border:2px solid;box-shadow:0 8px 24px rgba(0,0,0,.1);animation:toastIn .4s cubic-bezier(.34,1.56,.64,1)}
.ach-label{font-size:10px;font-weight:800;letter-spacing:1px;color:var(--text-light);text-transform:uppercase}.ach-name{font-size:15px;font-weight:700}
.chest-card{text-align:center;padding:40px;border-radius:28px;background:linear-gradient(135deg,var(--sand-soft),#FFF0EB);border:3px solid var(--sand);box-shadow:0 20px 60px rgba(244,208,111,.3);animation:popIn .6s cubic-bezier(.34,1.56,.64,1)}
.chest-anim{animation:chestBob 1s ease infinite;margin-bottom:12px}
@keyframes chestBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.chest-title{font-family:'Baloo 2',cursive;font-size:16px;color:var(--text-light)}.chest-xp{font-family:'Baloo 2',cursive;font-size:42px;font-weight:800;color:var(--coral)}.chest-tap{font-size:12px;color:var(--text-faint);margin-top:8px}
.xp-float{position:fixed;top:38%;left:50%;transform:translateX(-50%);z-index:1000;font-family:'Baloo 2',cursive;font-size:34px;font-weight:800;color:var(--coral);text-shadow:0 2px 8px rgba(255,123,84,.4);animation:xpRise 1.2s ease-out forwards;pointer-events:none}
@keyframes xpRise{0%{opacity:1;transform:translateX(-50%) translateY(0) scale(1)}50%{opacity:1;transform:translateX(-50%) translateY(-40px) scale(1.3)}100%{opacity:0;transform:translateX(-50%) translateY(-80px) scale(.8)}}
.hero{text-align:center;padding:32px 20px 16px;position:relative;width:100%}.hero-blob{position:absolute;border-radius:50%;filter:blur(60px);opacity:.35}.b1{width:200px;height:200px;background:var(--coral);top:-40px;left:10%}.b2{width:160px;height:160px;background:var(--lavender);top:0;right:5%}
.hero-icon{position:relative;z-index:1;margin-bottom:4px}
.hero-title{font-family:'Baloo 2',cursive;font-size:56px;font-weight:800;line-height:1;position:relative;z-index:1;background:linear-gradient(135deg,var(--text) 40%,var(--coral));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-sub{font-size:14px;color:var(--text-light);position:relative;z-index:1;font-weight:600}
.vitals-bar{display:flex;align-items:center;justify-content:space-between;width:100%;max-width:480px;padding:10px 16px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--r);margin:12px 0;box-shadow:0 2px 12px rgba(0,0,0,.04)}
.streak-fire{position:relative;display:flex;align-items:center;gap:4px}
.fire-glow{position:absolute;width:50px;height:50px;border-radius:50%;background:radial-gradient(circle,rgba(255,123,84,.3),transparent 70%);left:-8px;top:-8px;animation:fGlow 1.5s ease-in-out infinite}
@keyframes fGlow{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.2)}}
.fire-icon{position:relative;z-index:1;animation:fWig .4s ease-in-out infinite alternate}
@keyframes fWig{0%{transform:rotate(-3deg) scale(1)}100%{transform:rotate(3deg) scale(1.05)}}
.fire-count{font-family:'Baloo 2',cursive;font-size:22px;font-weight:800;color:var(--coral);z-index:1;text-shadow:0 1px 4px rgba(255,123,84,.3)}
.fire-particles{position:absolute;top:0;left:8px;width:30px;height:30px;pointer-events:none}
.fire-particle{position:absolute;width:4px;height:4px;border-radius:50%;background:var(--coral);opacity:.7;animation:fRise .8s ease-out infinite}
@keyframes fRise{0%{transform:translateY(0);opacity:.8}100%{transform:translateY(-18px) translateX(var(--x,4px));opacity:0}}
.rank-card{display:flex;align-items:center;gap:14px;width:100%;max-width:480px;padding:14px 18px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--r);margin-bottom:10px;box-shadow:0 2px 12px rgba(0,0,0,.04)}
.rank-ava{flex-shrink:0}.rank-info{flex:1}.rank-name{font-family:'Baloo 2',cursive;font-size:20px;font-weight:800}.rank-xp{font-size:13px;color:var(--text-faint);font-weight:700}
.rank-bar{height:10px;background:var(--border-light);border-radius:100px;overflow:hidden;margin-top:6px;border:1.5px solid var(--border)}
.rank-fill{height:100%;border-radius:100px;transition:width .8s cubic-bezier(.34,1.56,.64,1);position:relative}.rank-fill::after{content:'';position:absolute;top:1px;left:4px;right:4px;height:3px;background:rgba(255,255,255,.5);border-radius:100px}
.rank-next{font-size:11px;color:var(--text-faint);font-weight:700;margin-top:3px}
.taunt{display:flex;align-items:center;gap:8px;width:100%;max-width:480px;padding:10px 14px;background:linear-gradient(90deg,var(--coral-soft),var(--sand-soft));border:1.5px solid var(--border);border-radius:var(--rx);margin-bottom:12px;font-size:12px;font-weight:700;color:var(--text-light);animation:tauntFade .5s ease}
@keyframes tauntFade{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
.taunt-dot{width:8px;height:8px;border-radius:50%;background:var(--coral);animation:tPulse 1.5s infinite;flex-shrink:0}
@keyframes tPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.6)}}
.cta{position:relative;display:flex;align-items:center;justify-content:center;gap:10px;width:100%;max-width:480px;padding:18px;background:var(--coral);color:white;border-radius:var(--r);font-size:18px;font-weight:800;letter-spacing:.5px;margin-bottom:10px;box-shadow:0 6px 24px rgba(255,123,84,.35);transition:all .2s;overflow:hidden}
.cta:hover{transform:translateY(-3px);box-shadow:0 10px 32px rgba(255,123,84,.45)}.cta:active{transform:scale(.97)}.cta:disabled{background:var(--border);box-shadow:none}
.cta-shine{position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent 30%,rgba(255,255,255,.15) 50%,transparent 70%);animation:shine 3s infinite}
@keyframes shine{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
.cta-sm{padding:14px;font-size:15px;flex:1}
.action-row{display:flex;gap:8px;width:100%;max-width:480px;margin-bottom:16px}
.act-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:14px 8px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--rs);font-size:12px;font-weight:800;color:var(--text-light);transition:all .2s;box-shadow:0 2px 8px rgba(0,0,0,.03)}
.act-btn:hover{transform:translateY(-3px);box-shadow:0 6px 16px rgba(0,0,0,.08);border-color:var(--coral)}
.sec-head{display:flex;justify-content:space-between;align-items:center;width:100%;max-width:480px;margin-bottom:8px;margin-top:4px}
.sec-title{font-family:'Baloo 2',cursive;font-size:18px;font-weight:700;color:var(--text)}.sec-count{font-size:13px;font-weight:700;color:var(--text-faint)}
.sec-timer{font-size:12px;font-weight:700;color:var(--rose);animation:tPulse 2s infinite}
.quest{display:flex;align-items:center;gap:10px;width:100%;max-width:480px;padding:12px 14px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--rs);margin-bottom:6px;transition:all .3s;box-shadow:0 2px 8px rgba(0,0,0,.03)}
.quest-done{background:var(--teal-soft);border-color:var(--teal)}
.q-left{flex-shrink:0}.q-mid{flex:1;min-width:0}.q-title{font-size:13px;font-weight:800;display:flex;align-items:center;gap:4px}
.q-bar{height:5px;background:var(--border-light);border-radius:100px;overflow:hidden;margin-top:4px}.q-fill{height:100%;border-radius:100px;transition:width .5s}
.q-right{text-align:right;flex-shrink:0}.q-reward{font-size:14px;font-weight:900;color:var(--coral);animation:rPulse 2s infinite}
.q-reward-d{color:var(--teal);animation:none}
@keyframes rPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
.q-count{font-size:10px;color:var(--text-faint);font-weight:700}
.fomo{display:flex;align-items:center;gap:10px;width:100%;max-width:480px;padding:12px 16px;background:linear-gradient(135deg,var(--lavender-soft),var(--sand-soft));border:2px solid var(--lavender);border-radius:var(--rs);margin-bottom:16px;position:relative;overflow:hidden}
.fomo-shine{position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(184,160,210,.1),transparent);animation:shine 3s infinite}
.fomo-text{font-size:12px;color:var(--text-light);line-height:1.4;font-weight:600;z-index:1}.fomo-text strong{color:var(--lavender)}.fomo-sub{font-size:11px;color:var(--lavender);font-weight:700}
.stk-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:8px;width:100%;max-width:480px}
.stk{display:flex;flex-direction:column;align-items:center;padding:12px 4px;border-radius:var(--rs);transition:all .25s cubic-bezier(.34,1.56,.64,1);border:2px solid transparent}
.stk-off{background:var(--border-light);opacity:.4;filter:grayscale(1)}.stk-on{box-shadow:0 3px 10px rgba(0,0,0,.06)}.stk-on:hover{transform:scale(1.12) rotate(-3deg)}
.stk-icon{margin-bottom:4px;display:flex}.stk-name{font-size:10px;font-weight:800;text-align:center;line-height:1.2;color:var(--text-light)}
.back{align-self:flex-start;display:flex;align-items:center;gap:4px;background:none;font-size:14px;color:var(--text-light);font-weight:700;padding:6px 0;margin-bottom:8px}.back:hover{color:var(--coral)}
.pg-title{font-family:'Baloo 2',cursive;font-size:28px;font-weight:800;text-align:center;margin-bottom:4px;display:flex;align-items:center;gap:8px;justify-content:center}.pg-desc{font-size:14px;color:var(--text-light);text-align:center;margin-bottom:16px;font-weight:600}
.cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;width:100%}
.cat-card{display:flex;flex-direction:column;align-items:center;padding:18px 12px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--r);transition:all .25s cubic-bezier(.34,1.56,.64,1);box-shadow:0 2px 8px rgba(0,0,0,.04)}.cat-card:hover{transform:translateY(-4px) scale(1.02);box-shadow:0 8px 20px rgba(0,0,0,.08);border-color:var(--coral)}.cat-card:active{transform:scale(.97)}
.ci{margin-bottom:6px}.cn{font-size:12px;font-weight:800;text-align:center;margin-bottom:6px}
.cat-prog-bar{width:100%;height:6px;border-radius:3px;background:var(--border-light);overflow:hidden;margin:6px 0 2px}.cat-prog-fill{height:100%;border-radius:3px;background:var(--sand);transition:width .4s ease}
.cc{font-size:11px;color:var(--text-faint);font-weight:700;margin-top:4px}
.game-top{display:flex;align-items:center;gap:8px;width:100%;margin-bottom:14px;padding-bottom:10px;border-bottom:2px solid var(--border-light)}
.close-btn{width:32px;height:32px;border-radius:50%;background:var(--border-light);color:var(--text-light);font-size:14px;font-weight:700;display:flex;align-items:center;justify-content:center}.close-btn:hover{background:var(--rose-soft);color:var(--rose)}
.dots{display:flex;gap:3px;flex:1;flex-wrap:wrap}.dot{width:20px;height:5px;border-radius:100px;background:var(--border-light);transition:all .3s}
.dot-now{background:var(--coral);transform:scaleY(1.4);box-shadow:0 0 6px rgba(255,123,84,.4)}.dot-ok{background:var(--teal)}.dot-no{background:var(--rose)}
.combo{display:flex;align-items:center;gap:3px;padding:3px 8px;background:var(--coral-soft);border-radius:100px;font-size:12px;font-weight:800;color:var(--coral);animation:cPulse .6s ease}
@keyframes cPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.2)}}
.streak-ind{display:flex;align-items:center;justify-content:center;gap:4px;padding:4px 12px;background:var(--coral-soft);border-radius:100px;font-size:12px;font-weight:800;color:var(--coral);margin-bottom:8px;animation:cPulse .8s ease;width:fit-content;align-self:center}
.q-badges{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;width:100%}
.qb{font-size:11px;font-weight:800;padding:4px 10px;border-radius:100px;letter-spacing:.3px}
.diff-1{background:var(--teal-soft);color:var(--teal)}.diff-2{background:var(--sand-soft);color:#C5A43E}.diff-3{background:var(--rose-soft);color:var(--rose)}
.qb-cat{background:var(--border-light);color:var(--text-light)}.qb-sc{background:var(--lavender-soft);color:var(--lavender)}
.q-card{width:100%;padding:22px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--r);margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,.04)}
.q-text{font-size:15px;line-height:1.7;white-space:pre-line;font-weight:600}
.shake{animation:shake .4s ease}
@keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
.opts{display:flex;flex-direction:column;gap:7px;width:100%;margin-bottom:12px}
.opt{display:flex;align-items:flex-start;gap:10px;padding:13px 14px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--rs);text-align:left;transition:all .2s;width:100%}
.opt:not(:disabled):hover{border-color:var(--coral);transform:translateX(4px);box-shadow:0 4px 12px rgba(255,123,84,.1)}.opt:not(:disabled):active{transform:scale(.98)}
.opt-ok{background:var(--teal-soft)!important;border-color:var(--teal)!important;animation:popOk .3s ease}
@keyframes popOk{0%{transform:scale(1)}50%{transform:scale(1.02)}100%{transform:scale(1)}}
.opt-no{background:var(--rose-soft)!important;border-color:var(--rose)!important;animation:shake .4s ease}.opt-dim{opacity:.4}
.ol{font-size:12px;font-weight:800;color:var(--text-light);min-width:26px;height:26px;display:flex;align-items:center;justify-content:center;background:var(--border-light);border-radius:var(--rx);flex-shrink:0}
.ot{font-size:13px;line-height:1.5;font-weight:600;flex:1}.or{flex-shrink:0;margin-left:auto}
.explain{width:100%;animation:slideIn .3s ease-out}
.rb{display:flex;align-items:center;gap:10px;padding:12px 16px;border-radius:var(--rs);margin-bottom:8px}.rb-ok{background:var(--teal-soft)}.rb-no{background:var(--rose-soft)}
.rl{font-size:16px;font-weight:800}.rb-ok .rl{color:var(--teal)}.rb-no .rl{color:var(--rose)}.rc{font-size:12px;font-weight:700;color:var(--coral)}
.exp-card{padding:14px 18px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--rs);margin-bottom:8px}
.el{font-family:'Baloo 2',cursive;font-size:14px;font-weight:700;color:var(--coral);margin-bottom:4px}.et{font-size:13px;color:var(--text-light);line-height:1.6;font-weight:600}
.de-card{padding:14px 18px;background:var(--sand-soft);border:2px solid #E8DCC0;border-radius:var(--rs);margin-bottom:12px}
.gl{display:flex;align-items:center;gap:8px;font-family:'Baloo 2',cursive;font-size:13px;font-weight:700;color:#8B7A3E;margin-bottom:4px}
.btn-next{width:100%;padding:14px;background:var(--coral);color:white;border-radius:var(--rs);font-size:15px;font-weight:800;transition:all .2s;box-shadow:0 4px 12px rgba(255,123,84,.25)}.btn-next:hover{transform:translateY(-2px)}.btn-next:active{transform:scale(.98)}
.boost{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:12px;margin-top:6px;background:var(--lavender-soft);border:2px solid var(--lavender);border-radius:var(--rs);color:var(--lavender);font-size:13px;font-weight:800;animation:bPulse 2s infinite ease-in-out}
@keyframes bPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.02);box-shadow:0 0 20px rgba(184,160,210,.3)}}
.results-card{display:flex;flex-direction:column;align-items:center;padding:28px 24px;background:var(--white);border:2px solid var(--border-light);border-radius:24px;width:100%;margin-top:20px;box-shadow:0 4px 16px rgba(0,0,0,.06)}
.ri{margin-bottom:10px}.rt{font-family:'Baloo 2',cursive;font-size:28px;font-weight:800}
.rnums{display:flex;gap:24px;align-items:center;margin:14px 0}
.rn{text-align:center}.rb2{font-family:'Baloo 2',cursive;font-size:34px;font-weight:800;display:block;line-height:1}.rlab{font-size:11px;font-weight:700;color:var(--text-faint);text-transform:uppercase;letter-spacing:.5px}.rdiv{width:2px;height:36px;background:var(--border-light);border-radius:1px}
.rlist{width:100%;margin-top:10px}.rrow{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border-light);font-size:13px}
.rrc{flex:1;color:var(--text-light);font-weight:600}.rrx{font-weight:800}.xp-pos{color:var(--teal)}.xp-neg{color:var(--text-faint)}
.r-nudge{display:flex;align-items:center;gap:6px;margin-top:12px;font-size:12px;font-weight:700;color:var(--coral);padding:8px 12px;background:var(--coral-soft);border-radius:var(--rx);animation:rPulse 2s infinite}
.ra{display:flex;gap:10px;margin-top:16px;width:100%}
.lb-list{width:100%}.lb-row{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--white);border:1.5px solid var(--border-light);border-radius:var(--rs);margin-bottom:5px;transition:all .2s}
.lb-user{background:var(--coral-soft);border-color:var(--coral);box-shadow:0 4px 16px rgba(255,123,84,.12)}
.lb-rank{width:24px;font-weight:800;font-size:13px;color:var(--text-faint);display:flex;justify-content:center}.lb-ava{flex-shrink:0;display:flex}
.lb-info{flex:1}.lb-name{font-size:13px;font-weight:700;display:block}.lb-user .lb-name{color:var(--coral)}
.lb-streak{font-size:11px;color:var(--text-faint);font-weight:600;display:flex;align-items:center;gap:2px}
.lb-xp{font-weight:800;font-size:14px}
.lb-nudge{display:flex;align-items:center;gap:6px;justify-content:center;font-size:13px;font-weight:700;color:var(--coral);margin-top:12px;padding:10px;background:var(--coral-soft);border-radius:var(--rs);animation:rPulse 2s infinite}
.lib-tabs{display:flex;gap:6px;width:100%;overflow-x:auto;padding-bottom:10px;margin-bottom:14px;flex-wrap:wrap}
.lib-tab{font-size:13px;font-weight:700;padding:8px 14px;border-radius:100px;background:var(--white);border:2px solid var(--border-light);color:var(--text-light);white-space:nowrap;transition:all .2s}.lib-tab:hover{border-color:var(--coral)}.lib-tab-on{background:var(--coral-soft);border-color:var(--coral);color:var(--coral)}
.lib-list{display:flex;flex-direction:column;gap:10px;width:100%}
.lib-card{padding:14px 18px;background:var(--white);border:2px solid var(--border-light);border-radius:var(--r);box-shadow:0 2px 8px rgba(0,0,0,.04);transition:all .2s}.lib-card:hover{transform:translateY(-2px);box-shadow:0 6px 16px rgba(0,0,0,.08)}
.lct{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;gap:10px}
.lt{font-size:14px;font-weight:800}.la{font-size:12px;color:var(--text-faint);font-weight:600;margin-top:2px}
.ltype{font-size:11px;font-weight:800;padding:3px 10px;border-radius:100px;flex-shrink:0}
.ltype-book{background:var(--lavender-soft);color:var(--lavender)}.ltype-template{background:var(--teal-soft);color:var(--teal)}.ltype-law{background:var(--rose-soft);color:var(--rose)}.ltype-blog{background:var(--teal-soft);color:var(--teal)}.ltype-reference{background:var(--sand-soft);color:#C5A43E}.ltype-commentary{background:var(--lavender-soft);color:var(--lavender)}.ltype-media{background:var(--coral-soft);color:var(--coral)}
.lr{font-size:12px;color:var(--text-light);line-height:1.5;font-weight:600}
.lstars{display:flex;gap:2px;margin-top:6px}.ls{font-size:14px;color:var(--border)}.lsf{color:var(--sand)}
.skill-node:not(:disabled):hover{transform:translateY(-4px) scale(1.02);box-shadow:0 8px 20px rgba(0,0,0,.08)!important}
.skill-node:not(:disabled):active{transform:scale(.97)}
@media(max-width:500px){.hero-title{font-size:42px}.cat-grid{grid-template-columns:repeat(2,1fr)}.stk-grid{grid-template-columns:repeat(4,1fr)}}
`;
