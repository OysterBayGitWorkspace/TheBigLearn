import { useState, useEffect, useRef, useMemo } from 'react';

// ─── Tier definitions ───
const FIRE_TIERS = [
  { min:1,  max:4,  name:'Ember',   color:'#D4503A', glow:'rgba(212,80,58,0.3)' },
  { min:5,  max:9,  name:'On fire', color:'#E8751A', glow:'rgba(232,117,26,0.35)' },
  { min:10, max:19, name:'Inferno', color:'#E8A020', glow:'rgba(232,160,32,0.4)' },
  { min:20, max:29, name:'Void',    color:'#7B2FBE', glow:'rgba(123,47,190,0.45)' },
  { min:30, max:999, name:'King',   color:'#2878E0', glow:'rgba(40,120,224,0.5)' },
];
const MILESTONES = { 5:'IGNITE', 10:'INFERNO', 20:'VOID FLAME', 30:'THE KING' };

function getTierIndex(count) {
  if (count >= 30) return 4;
  if (count >= 20) return 3;
  if (count >= 10) return 2;
  if (count >= 5) return 1;
  return 0;
}

// ─── Tier 1: Ember — small red gentle flame ───
function EmberFlame({ count }) {
  const h = 28 + count * 3;
  const y0 = 70 - h;
  return (
    <svg className="sf3-flame" viewBox="4 0 52 80" style={{ width: 40 + count * 2, height: 52 + count * 2 }}>
      <path fill="#D4503A" opacity=".9">
        <animate attributeName="d" dur="0.7s" repeatCount="indefinite" values={
          `M30 ${y0}C26 ${y0+10},18 ${y0+h/2},20 70C20 70,30 72,30 72C30 72,40 70,40 70C42 ${y0+h/2},34 ${y0+10},30 ${y0}Z;` +
          `M30 ${y0+2}C27 ${y0+12},17 ${y0+h/2+2},21 70C21 70,30 72,30 72C30 72,39 70,39 70C43 ${y0+h/2+2},33 ${y0+12},30 ${y0+2}Z;` +
          `M30 ${y0}C26 ${y0+10},18 ${y0+h/2},20 70C20 70,30 72,30 72C30 72,40 70,40 70C42 ${y0+h/2},34 ${y0+10},30 ${y0}Z`
        }/>
      </path>
      <ellipse cx="30" cy={70 - h * 0.3} rx={4 + count} ry={h * 0.25} fill="#F4C06A" opacity=".5"/>
    </svg>
  );
}

// ─── Tier 2: On Fire — taller orange with inner glow ───
function OnFireFlame({ count }) {
  const h = 36 + (count - 5) * 3;
  const y0 = 70 - h;
  return (
    <svg className="sf3-flame" viewBox="4 0 52 80" style={{ width: 46 + (count - 5) * 2, height: 58 + (count - 5) * 2 }}>
      <path fill="#E8751A" opacity=".9">
        <animate attributeName="d" dur="0.5s" repeatCount="indefinite" values={
          `M30 ${y0}C24 ${y0+14},14 ${y0+h/2},18 70C18 70,30 73,30 73C30 73,42 70,42 70C46 ${y0+h/2},36 ${y0+14},30 ${y0}Z;` +
          `M30 ${y0+3}C25 ${y0+16},13 ${y0+h/2+3},19 70C19 70,30 73,30 73C30 73,41 70,41 70C47 ${y0+h/2+3},35 ${y0+16},30 ${y0+3}Z;` +
          `M30 ${y0}C24 ${y0+14},14 ${y0+h/2},18 70C18 70,30 73,30 73C30 73,42 70,42 70C46 ${y0+h/2},36 ${y0+14},30 ${y0}Z`
        }/>
      </path>
      <path d={`M30 ${y0+8}C27 ${y0+16},20 ${y0+h/2+6},22 69L30 71L38 69C40 ${y0+h/2+6},33 ${y0+16},30 ${y0+8}Z`} fill="#F0A030" opacity=".7"/>
      <ellipse cx="30" cy={70 - h * 0.25} rx={3 + count - 5} ry={h * 0.18} fill="#FFE4A0" opacity=".45"/>
    </svg>
  );
}

// ─── Tier 3: Inferno — wild gold/orange, organic tongues ───
function InfernoFlame({ count }) {
  const h = 48 + Math.min(count - 10, 9) * 2;
  const p = Math.min(count - 10, 9) / 9;
  const y0 = 70 - h;
  return (
    <svg className="sf3-flame" viewBox="0 0 60 80" style={{ width: 54 + p * 10, height: 68 + p * 8 }}>
      <path fill="#E8A020" opacity=".9">
        <animate attributeName="d" dur="0.35s" repeatCount="indefinite" values={
          `M30 ${y0}C22 ${y0+12},8 ${y0+h/2-4},16 68L30 74L44 68C52 ${y0+h/2-4},38 ${y0+12},30 ${y0}Z;` +
          `M28 ${y0+4}C20 ${y0+18},6 ${y0+h/2},17 68L30 74L43 68C54 ${y0+h/2},40 ${y0+18},32 ${y0+4}Z;` +
          `M30 ${y0}C22 ${y0+12},8 ${y0+h/2-4},16 68L30 74L44 68C52 ${y0+h/2-4},38 ${y0+12},30 ${y0}Z`
        }/>
      </path>
      <path d={`M24 ${y0+18}C20 ${y0+28},10 56,18 68L30 72L42 68C50 56,40 ${y0+28},36 ${y0+18}Z`} fill="#E87520" opacity=".65"/>
      <path d={`M30 ${y0+10}C27 ${y0+20},18 ${y0+h/2+10},22 67L30 70L38 67C42 ${y0+h/2+10},33 ${y0+20},30 ${y0+10}Z`} fill="#F4D060" opacity=".6"/>
      <ellipse cx="30" cy={70 - h * 0.2} rx={5 + p * 4} ry={h * 0.14} fill="#FFF0C0" opacity=".4"/>
      {/* Side flame tongues */}
      <ellipse cx={22 - p * 4} cy={70 - h * 0.55} rx="3" ry={6 + p * 6} fill="#E87520" opacity={0.3 + p * 0.4}>
        <animate attributeName="ry" dur="0.4s" repeatCount="indefinite" values={`${6+p*6};${8+p*6};${6+p*6}`}/>
      </ellipse>
      <ellipse cx={38 + p * 4} cy={70 - h * 0.5} rx="3" ry={5 + p * 5} fill="#E8A020" opacity={0.3 + p * 0.35}>
        <animate attributeName="ry" dur="0.45s" repeatCount="indefinite" values={`${5+p*5};${7+p*5};${5+p*5}`}/>
      </ellipse>
    </svg>
  );
}

// ─── Tier 4: Void — slow dominant purple/black pulsating ───
function VoidFlame({ count }) {
  const h = 56 + Math.min(count - 20, 9) * 1.5;
  const p = Math.min(count - 20, 9) / 9;
  const y0 = 70 - h;
  return (
    <svg className="sf3-flame sf3-void-pulse" viewBox="0 0 60 80" style={{ width: 58 + p * 8, height: 72 + p * 6 }}>
      <path fill="#7B2FBE" opacity=".85">
        <animate attributeName="d" dur="2s" repeatCount="indefinite" values={
          `M30 ${y0}C24 ${y0+16},10 ${y0+h/2},16 68L30 74L44 68C50 ${y0+h/2},36 ${y0+16},30 ${y0}Z;` +
          `M30 ${y0-3}C23 ${y0+14},9 ${y0+h/2-2},15 68L30 74L45 68C51 ${y0+h/2-2},37 ${y0+14},30 ${y0-3}Z;` +
          `M30 ${y0}C24 ${y0+16},10 ${y0+h/2},16 68L30 74L44 68C50 ${y0+h/2},36 ${y0+16},30 ${y0}Z`
        }/>
      </path>
      {/* Dark core */}
      <path d={`M30 ${y0+14}C26 ${y0+24},16 ${y0+h/2+10},20 67L30 71L40 67C44 ${y0+h/2+10},34 ${y0+24},30 ${y0+14}Z`} fill="#2A1048" opacity=".7">
        <animate attributeName="opacity" dur="2.2s" repeatCount="indefinite" values=".7;.9;.7"/>
      </path>
      <ellipse cx="30" cy={70 - h * 0.35} rx={6 + p * 3} ry={h * 0.15} fill="#1A0830" opacity=".6">
        <animate attributeName="rx" dur="2s" repeatCount="indefinite" values={`${6+p*3};${8+p*3};${6+p*3}`}/>
      </ellipse>
      <ellipse cx="30" cy={70 - h * 0.18} rx="3" ry={h * 0.08} fill="#C080FF" opacity=".3"/>
    </svg>
  );
}

// ─── Tier 5: King — blue boss flame ───
function KingFlame({ count }) {
  const h = 64 + Math.min(count - 30, 10) * 1.2;
  const p = Math.min(count - 30, 10) / 10;
  const y0 = 70 - h;
  return (
    <svg className="sf3-flame" viewBox="0 0 60 80" style={{ width: 62 + p * 10, height: 76 + p * 8 }}>
      <path fill="#2878E0" opacity=".9">
        <animate attributeName="d" dur="0.8s" repeatCount="indefinite" values={
          `M30 ${y0}C22 ${y0+14},6 ${y0+h/2-6},14 67L30 75L46 67C54 ${y0+h/2-6},38 ${y0+14},30 ${y0}Z;` +
          `M30 ${y0+3}C21 ${y0+18},5 ${y0+h/2-3},15 67L30 75L45 67C55 ${y0+h/2-3},39 ${y0+18},30 ${y0+3}Z;` +
          `M30 ${y0}C22 ${y0+14},6 ${y0+h/2-6},14 67L30 75L46 67C54 ${y0+h/2-6},38 ${y0+14},30 ${y0}Z`
        }/>
      </path>
      <path d={`M30 ${y0+10}C25 ${y0+22},14 ${y0+h/2+4},20 66L30 72L40 66C46 ${y0+h/2+4},35 ${y0+22},30 ${y0+10}Z`} fill="#60B0FF" opacity=".55"/>
      <ellipse cx="30" cy={70 - h * 0.3} rx={5 + p * 4} ry={h * 0.16} fill="#C0E4FF" opacity=".4"/>
      <ellipse cx="30" cy={70 - h * 0.15} rx="3" ry={h * 0.06} fill="#FFFFFF" opacity=".35"/>
    </svg>
  );
}

// ─── Lightning bolts (King only) ───
function LightningBolts({ count }) {
  const [key, setKey] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setKey(k => k + 1), 180);
    return () => clearInterval(iv);
  }, []);

  const p = Math.min(count - 30, 10) / 10;
  const n = 3 + Math.floor(p * 5);

  const bolts = useMemo(() => {
    const arr = [];
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const r1 = 18 + Math.random() * 10;
      const r2 = r1 + 8 + Math.random() * 12;
      const cx = 40, cy = 40;
      const x1 = cx + Math.cos(a) * r1, y1 = cy + Math.sin(a) * r1;
      const x2 = cx + Math.cos(a) * r2, y2 = cy + Math.sin(a) * r2;
      const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * 10;
      const my = (y1 + y2) / 2 + (Math.random() - 0.5) * 10;
      const op = 0.4 + Math.random() * 0.5;
      arr.push({ x1, y1, mx, my, x2, y2, op, w1: 1 + Math.random(), w2: 0.5 + Math.random() * 0.8 });
    }
    return arr;
  }, [key, n]);

  return (
    <svg width="80" height="80" viewBox="0 0 80 80" className="sf3-bolts">
      {bolts.map((b, i) => (
        <g key={i}>
          <line x1={b.x1} y1={b.y1} x2={b.mx} y2={b.my} stroke="#80C8FF" strokeWidth={b.w1} opacity={b.op}/>
          <line x1={b.mx} y1={b.my} x2={b.x2} y2={b.y2} stroke="#B0DFFF" strokeWidth={b.w2} opacity={b.op * 0.7}/>
        </g>
      ))}
    </svg>
  );
}

// ─── Sparks ───
function Sparks({ count, color }) {
  const pc = Math.min(2 + Math.floor(count / 3), 12);
  return (
    <div className="sf3-sparks">
      {Array.from({ length: pc }).map((_, i) => (
        <div key={i} className="sf3-spark" style={{
          width: 2 + Math.random() * 3, height: 2 + Math.random() * 3,
          background: color, left: 8 + Math.random() * 40, top: 16,
          '--sx': `${(Math.random() * 14 - 7).toFixed(1)}px`,
          '--sy': `${(-12 - Math.random() * 20).toFixed(1)}px`,
          animationDelay: `${(i * 0.1).toFixed(2)}s`,
          animationDuration: `${(0.5 + Math.random() * 0.4).toFixed(2)}s`,
        }}/>
      ))}
    </div>
  );
}

// ─── Main ───
export default function StreakFire({ count }) {
  const prevCount = useRef(count);
  const [burst, setBurst] = useState(null);

  useEffect(() => {
    const prev = prevCount.current;
    prevCount.current = count;
    if (prev === count) return;
    const ms = MILESTONES[count];
    if (ms && prev < count) {
      const t = FIRE_TIERS[getTierIndex(count)];
      setBurst({ text: ms, color: t.color });
      const tm = setTimeout(() => setBurst(null), 1400);
      return () => clearTimeout(tm);
    }
  }, [count]);

  if (count <= 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, opacity: 0.3 }}>
        <svg width="32" height="40" viewBox="10 30 40 45">
          <path d="M30 45C28 50,24 55,25 70C25 70,30 72,30 72C30 72,35 70,35 70C36 55,32 50,30 45Z" fill="#888"/>
        </svg>
        <span style={{ fontFamily: "'Baloo 2',cursive", fontSize: 20, color: '#B2BEC3' }}>0</span>
      </div>
    );
  }

  const ti = getTierIndex(count);
  const tier = FIRE_TIERS[ti];
  const gs = 55 + Math.min(count, 30) * 2.5;
  const glowClass = ti >= 4 ? 'sf3-glow-king' : ti >= 3 ? 'sf3-glow-void' : ti >= 2 ? 'sf3-glow-inferno' : 'sf3-glow-base';
  const countSz = 22 + Math.min(count, 20) * 0.35;

  return (
    <div className="sf3-wrap">
      <div className="sf3-flame-area">
        <div className={glowClass} style={{
          background: `radial-gradient(circle, ${tier.glow}, transparent 70%)`,
        }}/>
        <Sparks count={count} color={tier.color}/>
        <div className={ti === 3 ? 'sf3-void-pulse' : undefined}>
          {ti === 0 && <EmberFlame count={count}/>}
          {ti === 1 && <OnFireFlame count={count}/>}
          {ti === 2 && <InfernoFlame count={count}/>}
          {ti === 3 && <VoidFlame count={count}/>}
          {ti === 4 && <><KingFlame count={count}/><LightningBolts count={count}/></>}
        </div>
        {burst && (
          <div className="sf3-burst">
            <div className="sf3-burst-ring" style={{ borderColor: burst.color }}/>
            <div className="sf3-burst-text" style={{ color: burst.color }}>{burst.text}</div>
          </div>
        )}
      </div>
      <div className="sf3-count" style={{
        fontSize: countSz, color: tier.color,
        textShadow: `0 2px 8px ${tier.glow}`,
        animation: burst ? 'sf3CountPop 0.5s ease-out' : 'none',
      }}>{count}</div>
    </div>
  );
}
