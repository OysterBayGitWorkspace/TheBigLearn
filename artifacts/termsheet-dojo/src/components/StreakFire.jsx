import React from 'react';
import { Icons } from '../icons/icons';

function StreakFire({ count }) {
  if (count <= 0) return <div style={{display:'flex',alignItems:'center',gap:4,opacity:.4}}>{Icons.fire("#B2BEC3", 32)}<span style={{fontFamily:"'Baloo 2',cursive",fontSize:20,color:'#B2BEC3'}}>0</span></div>;
  return (<div className="streak-fire"><div className="fire-glow"/><div className="fire-particles">{Array.from({ length: Math.min(count, 8) }).map((_, i) => <div key={i} className="fire-particle" style={{ animationDelay: `${i * 0.15}s`, left: `${5 + Math.random() * 20}px` }}/>)}</div><div className="fire-icon">{Icons.fire("#FF7B54", 36 + Math.min(count, 20))}</div><div className="fire-count">{count}</div></div>);
}

export default StreakFire;
