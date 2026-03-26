import { useState } from 'react';
import { useGame } from '../context/GameContext';
import { RESOURCE_LIBRARY } from '../data/constants';
import { Icons } from '../icons/icons';

export default function LibraryScreen({ go }) {
  const { dispatch } = useGame();
  const [libTab, setLibTab] = useState(0);

  return (
    <div className="container">
      <button className="back" onClick={() => go("home")}>{Icons.arrowLeft()} Back</button>
      <h2 className="pg-title">Resource Library</h2>
      <div className="lib-tabs">
        {RESOURCE_LIBRARY.map((s, i) => (
          <button key={i} className={`lib-tab ${libTab === i ? "lib-tab-on" : ""}`} onClick={() => setLibTab(i)}>
            {s.category}
          </button>
        ))}
      </div>
      <div className="lib-list">
        {RESOURCE_LIBRARY[libTab].items.map((item, i) => (
          <div key={i} className="lib-card">
            <div className="lct">
              <div>
                <div className="lt">{item.title}</div>
                <div className="la">{item.author} · {item.year}</div>
              </div>
              <span className={`ltype ltype-${item.type.toLowerCase()}`}>{item.type}</span>
            </div>
            <p className="lr">{item.relevance}</p>
            <div className="lstars">
              {[...Array(5)].map((_, j) => (
                <span key={j} className={`ls ${j < item.rating ? "lsf" : ""}`}>{"\u2605"}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
