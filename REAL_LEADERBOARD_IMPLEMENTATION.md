# Real Leaderboard Implementation — VC DOJO

## Overview
Replace fake hardcoded `LEADERBOARD` array and `TAUNTS` with real player data from Supabase `user_progress` table.

---

## Step 1: Run SQL Migration in Supabase Dashboard

Go to **Supabase → SQL Editor** and run:

```sql
-- Add display_name column to user_progress
ALTER TABLE user_progress ADD COLUMN IF NOT EXISTS display_name TEXT;

-- Allow any authenticated user to read all rows (for leaderboard)
-- Adjust this if you already have RLS policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can read leaderboard data'
  ) THEN
    CREATE POLICY "Anyone can read leaderboard data"
      ON user_progress FOR SELECT USING (true);
  END IF;
END
$$;

-- Index for faster leaderboard queries
CREATE INDEX IF NOT EXISTS idx_user_progress_xp
  ON user_progress (((game_state->>'xp')::int) DESC NULLS LAST);
```

---

## Step 2: Add New Files

### `src/lib/leaderboard.js` (NEW FILE)

```javascript
import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';
import { getLevel } from '../data/ranks';

export async function fetchLeaderboard(limit = 20) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('user_id, game_state, display_name, updated_at')
    .not('game_state', 'is', null)
    .order('updated_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.warn('Failed to fetch leaderboard:', error.message);
    return [];
  }

  if (!data || data.length === 0) return [];

  return data
    .map((row, idx) => {
      const gs = row.game_state;
      if (!gs || typeof gs.xp !== 'number') return null;
      const level = getLevel(gs.xp);
      return {
        userId: row.user_id,
        name: row.display_name || `Player ${idx + 1}`,
        xp: gs.xp || 0,
        streak: gs.bestStreak || 0,
        avatar: level.name,
        isUser: false,
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.xp - a.xp);
}

export function useLeaderboard(currentUser) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchLeaderboard();
      setEntries(data);
    } catch (e) {
      console.warn('Leaderboard fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  const merged = buildMergedLeaderboard(entries, currentUser);
  return { ...merged, loading, refetch };
}

export function buildMergedLeaderboard(entries, currentUser) {
  if (!currentUser) {
    const list = entries.map((e, i) => ({ ...e, rank: i + 1 }));
    return { leaderboard: list, userRank: null, above: null, gap: 0 };
  }

  const others = entries.filter(e => e.userId !== currentUser.userId);
  const userEntry = {
    userId: currentUser.userId,
    name: 'You',
    xp: currentUser.xp || 0,
    streak: currentUser.streak || 0,
    avatar: currentUser.avatar || 'Intern',
    isUser: true,
  };

  const all = [...others, userEntry].sort((a, b) => b.xp - a.xp);
  all.forEach((e, i) => (e.rank = i + 1));

  const userRank = all.find(e => e.isUser)?.rank || all.length;
  const above = userRank > 1 ? all[userRank - 2] : null;
  const gap = above && !above.isUser ? above.xp - userEntry.xp : 0;

  return { leaderboard: all, userRank, above, gap };
}

export function generateTaunts(leaderboard, userRank) {
  const taunts = [];
  if (!leaderboard || leaderboard.length <= 1) {
    return [
      'Be the first on the leaderboard!',
      'Start training to earn XP',
      'Your streak freezes if you skip today',
    ];
  }

  const top = leaderboard.find(e => !e.isUser && e.rank === 1);
  if (top) taunts.push(`${top.name} leads with ${top.xp.toLocaleString()} XP...`);

  const streakLeader = [...leaderboard].filter(e => !e.isUser).sort((a, b) => b.streak - a.streak)[0];
  if (streakLeader?.streak > 0) taunts.push(`${streakLeader.name} is on a ${streakLeader.streak}-day streak!`);

  if (userRank > 1) {
    const aboveUser = leaderboard[userRank - 2];
    const userXp = leaderboard.find(e => e.isUser)?.xp || 0;
    if (aboveUser && !aboveUser.isUser) {
      const g = aboveUser.xp - userXp;
      if (g > 0 && g <= 200) taunts.push(`Only ${g} XP to overtake ${aboveUser.name}!`);
      else if (g > 0) taunts.push(`${aboveUser.name} is ${g} XP ahead of you`);
    }
  }

  taunts.push('Your streak freezes if you skip today');
  const others = leaderboard.filter(e => !e.isUser).length;
  if (others > 0) taunts.push(`${others} player${others > 1 ? 's are' : ' is'} competing this week`);

  return taunts;
}

export async function updateDisplayName(userId, displayName) {
  const { error } = await supabase
    .from('user_progress')
    .update({ display_name: displayName })
    .eq('user_id', userId);
  if (error) console.warn('Failed to update display name:', error.message);
  return !error;
}
```

### `src/lib/displayName.js` (NEW FILE)

```javascript
/**
 * Derive a display name from email.
 * "max.kramer@gmail.com" → "Max K."
 */
export function deriveDisplayName(email) {
  if (!email) return null;
  const local = email.split('@')[0];
  const parts = local.split(/[._\-+]/).filter(Boolean);
  if (parts.length === 0) return local;
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  if (parts.length === 1) return cap(parts[0]);
  return `${cap(parts[0])} ${parts[parts.length - 1].charAt(0).toUpperCase()}.`;
}
```

---

## Step 3: Update Existing Files

### `src/screens/LeaderboardScreen.jsx` — FULL REPLACEMENT

```jsx
import { useGame } from '../context/GameContext';
import { useAuth } from '../context/AuthContext';
import { getLevel, RANKS } from '../data/ranks';
import { useLeaderboard } from '../lib/leaderboard';
import { Icons } from '../icons/icons';

const RANK_ICONS = Object.fromEntries(RANKS.map(r => [r.name, r.component]));

export default function LeaderboardScreen({ go }) {
  const { state } = useGame();
  const { user } = useAuth();
  const lv = getLevel(state.xp);

  const currentUser = {
    userId: user?.id || '__local__',
    xp: state.xp,
    streak: state.bestStreak,
    avatar: lv.name,
  };

  const { leaderboard: lb, gap, above, loading } = useLeaderboard(currentUser);
  const BabyOyster = RANKS[0].component;

  return (
    <div className="container">
      <button className="back" onClick={() => go("home")}>{Icons.arrowLeft()} Back</button>
      <h2 className="pg-title">{Icons.trophy("#F4D06F", 26)} Gold League</h2>
      <p className="pg-desc">Top 3 promote, 4 days left</p>

      {loading ? (
        <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-faint)', fontSize: 14 }}>
          Loading leaderboard...
        </div>
      ) : (
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
      )}

      {gap > 0 && <div className="lb-nudge">{Icons.lightning("#FF7B54", 16)} {gap} XP to pass {above?.name}!</div>}
    </div>
  );
}
```

### `src/screens/ResultsScreen.jsx` — CHANGES

Replace the LEADERBOARD import and usage:

```diff
- import { LEADERBOARD } from '../data/constants';
+ import { useAuth } from '../context/AuthContext';
+ import { useLeaderboard } from '../lib/leaderboard';

  export default function ResultsScreen({ go }) {
    const { state } = useGame();
+   const { user } = useAuth();
    const session = state.session;
    const lv = getLevel(state.xp);

-   const lb = [...LEADERBOARD, { name: "You", xp: state.xp, ... }].sort(...);
-   lb.forEach((e, i) => e.rank = i + 1);
-   const uRank = lb.find(e => e.isUser)?.rank || 8;
-   const above = lb[Math.max(0, uRank - 2)];
-   const gap = above && !above.isUser ? above.xp - state.xp : 0;
+   const currentUser = {
+     userId: user?.id || '__local__',
+     xp: state.xp,
+     streak: state.bestStreak,
+     avatar: lv.name,
+   };
+   const { gap, above } = useLeaderboard(currentUser);
```

### `src/screens/HomeScreen.jsx` — CHANGES

```diff
- import { DAILY_QUESTS, TAUNTS } from '../data/constants';
+ import { DAILY_QUESTS } from '../data/constants';
+ import { useLeaderboard, generateTaunts } from '../lib/leaderboard';

  export default function HomeScreen({ go }) {
    const { state, dispatch } = useGame();
+   const { user } = useAuth();
    const [tauntIdx, setTauntIdx] = useState(0);

+   const lv = getLevel(state.xp);
+   const currentUser = {
+     userId: user?.id || '__local__',
+     xp: state.xp,
+     streak: state.bestStreak,
+     avatar: lv.name,
+   };
+   const { leaderboard, userRank } = useLeaderboard(currentUser);
+   const dynamicTaunts = generateTaunts(leaderboard, userRank);

    useEffect(() => {
-     const t = setInterval(() => setTauntIdx(i => (i + 1) % TAUNTS.length), 4500);
+     const t = setInterval(() => setTauntIdx(i => (i + 1) % (dynamicTaunts.length || 1)), 4500);
      return () => clearInterval(t);
-   }, []);
+   }, [dynamicTaunts.length]);

    // ... later in JSX, the taunt display:
-   <span>{TAUNTS[tauntIdx]}</span>
+   <span>{dynamicTaunts[tauntIdx % dynamicTaunts.length] || ''}</span>
```

### `src/lib/sync.js` — CHANGES

Update `pushToCloud` and `scheduleSyncToCloud` to include `display_name`:

```diff
- export async function pushToCloud(userId, gameState) {
+ export async function pushToCloud(userId, gameState, displayName) {
-   const { error } = await supabase
-     .from('user_progress')
-     .upsert({
-       user_id: userId,
-       game_state: gameState,
-       updated_at: new Date().toISOString(),
-     }, { onConflict: 'user_id' });
+   const payload = {
+     user_id: userId,
+     game_state: gameState,
+     updated_at: new Date().toISOString(),
+   };
+   if (displayName) payload.display_name = displayName;
+   const { error } = await supabase
+     .from('user_progress')
+     .upsert(payload, { onConflict: 'user_id' });

- export function scheduleSyncToCloud(userId, gameState) {
+ export function scheduleSyncToCloud(userId, gameState, displayName) {
    isDirty = true;
    if (syncTimer) clearTimeout(syncTimer);
    syncTimer = setTimeout(() => {
-     pushToCloud(userId, gameState);
+     pushToCloud(userId, gameState, displayName);
    }, 2000);
  }
```

### `src/context/GameContext.jsx` — CHANGES

In the effect that syncs to cloud, pass display name:

```diff
+ import { deriveDisplayName } from '../lib/displayName';

  // In the persist effect:
  useEffect(() => {
    const { session, _lastAnswer, _newAchievements, _perfectRound, _chestXP, activeBoost, ...persistent } = state;
    persistState(persistent);
    if (userId) {
-     scheduleSyncToCloud(userId, persistent);
+     // Derive display name from auth email
+     const email = supabase.auth.getUser?.()?.data?.user?.email;
+     const displayName = deriveDisplayName(email);
+     scheduleSyncToCloud(userId, persistent, displayName);
    }
  }, [state, userId]);
```

### `src/data/constants.js` — CLEANUP

You can remove `LEADERBOARD` and `TAUNTS` exports since they're no longer used:

```diff
- export const LEADERBOARD = [
-   { name: "Maximilian K.", xp: 4280, ... },
-   ...
- ];

- export const TAUNTS = ["Maximilian just earned 45 XP...", ...];
```

---

## Summary of Changes

| File | Action |
|------|--------|
| Supabase SQL | Add `display_name` column + RLS policy + index |
| `src/lib/leaderboard.js` | **NEW** — fetch real data, `useLeaderboard` hook, `generateTaunts` |
| `src/lib/displayName.js` | **NEW** — derive display name from email |
| `src/screens/LeaderboardScreen.jsx` | Replace fake data with `useLeaderboard` hook |
| `src/screens/ResultsScreen.jsx` | Replace fake data with `useLeaderboard` hook |
| `src/screens/HomeScreen.jsx` | Replace `TAUNTS` with `generateTaunts` from real data |
| `src/lib/sync.js` | Pass `display_name` through to Supabase |
| `src/context/GameContext.jsx` | Derive + sync display name on save |
| `src/data/constants.js` | Remove `LEADERBOARD` and `TAUNTS` exports |
