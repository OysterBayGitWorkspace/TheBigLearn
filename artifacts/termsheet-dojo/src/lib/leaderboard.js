import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { getLevel } from '../data/ranks';
import { deriveDisplayName } from './displayName';

export function useLeaderboard(currentUser, currentState) {
  const [data, setData] = useState({ leaderboard: [], userRank: 0, above: null, gap: 0, loading: true });

  useEffect(() => {
    let cancelled = false;

    async function fetchLeaderboard() {
      const { data: rows, error } = await supabase
        .from('user_progress')
        .select('user_id, display_name, game_state');

      if (cancelled) return;

      if (error) {
        console.warn('Failed to fetch leaderboard:', error.message);
        // Fall back to just the current user
        const lb = buildLeaderboard([], currentUser, currentState);
        setData({ ...lb, loading: false });
        return;
      }

      const lb = buildLeaderboard(rows || [], currentUser, currentState);
      setData({ ...lb, loading: false });
    }

    fetchLeaderboard();
    // Refresh every 30 seconds while mounted
    const interval = setInterval(fetchLeaderboard, 30000);

    return () => { cancelled = true; clearInterval(interval); };
  }, [currentUser?.id, currentState?.xp]);

  return data;
}

function buildLeaderboard(rows, currentUser, currentState) {
  const entries = [];
  let currentUserFound = false;

  for (const row of rows) {
    const gs = row.game_state || {};
    const xp = gs.xp || 0;
    const streak = gs.bestStreak || 0;
    const name = row.display_name || 'Player';
    const lv = getLevel(xp);
    const isUser = currentUser && row.user_id === currentUser.id;

    if (isUser) {
      currentUserFound = true;
      entries.push({
        name: 'You',
        xp: currentState?.xp || xp,
        streak: currentState?.bestStreak || streak,
        avatar: getLevel(currentState?.xp || xp).name,
        isUser: true,
      });
    } else {
      entries.push({ name, xp, streak, avatar: lv.name, isUser: false });
    }
  }

  // If current user wasn't in the DB rows (guest or new), add them
  if (!currentUserFound && currentState) {
    const lv = getLevel(currentState.xp || 0);
    entries.push({
      name: 'You',
      xp: currentState.xp || 0,
      streak: currentState.bestStreak || 0,
      avatar: lv.name,
      isUser: true,
    });
  }

  // Sort by XP descending
  entries.sort((a, b) => b.xp - a.xp);
  entries.forEach((e, i) => {
    e.rank = i + 1;
    // Compute badges from bestStreak
    e.badges = [];
    if (e.streak >= 20) e.badges.push('streak_master');
    if (e.streak >= 40) e.badges.push('elite');
    if (e.streak >= 100) e.badges.push('dragon_king');
  });

  const userRank = entries.find(e => e.isUser)?.rank || entries.length;
  const above = userRank > 1 ? entries[userRank - 2] : null;
  const gap = above && !above.isUser ? above.xp - (currentState?.xp || 0) : 0;

  return { leaderboard: entries, userRank, above, gap };
}

export function generateTaunts(leaderboard, userRank) {
  const taunts = [];
  const others = leaderboard.filter(e => !e.isUser);

  if (others.length === 0) {
    return [
      'Be the first on the leaderboard!',
      'Invite a friend to compete with',
      'Keep training to climb the ranks',
      'Your streak freezes if you skip today',
    ];
  }

  // Dynamic taunts from real player data
  const top = others[0];
  if (top) taunts.push(`${top.name} is leading with ${top.xp.toLocaleString()} XP`);

  const streaker = [...others].sort((a, b) => b.streak - a.streak)[0];
  if (streaker && streaker.streak > 0) {
    taunts.push(`${streaker.name} is on a ${streaker.streak}-day streak!`);
  }

  const above = userRank > 1 ? leaderboard[userRank - 2] : null;
  if (above && !above.isUser) {
    const gap = above.xp - (leaderboard.find(e => e.isUser)?.xp || 0);
    if (gap > 0) taunts.push(`${gap} XP to pass ${above.name}`);
  }

  const playersAbove = userRank - 1;
  if (playersAbove > 0) {
    taunts.push(`${playersAbove} ${playersAbove === 1 ? 'player' : 'players'} ahead of you`);
  }

  taunts.push('Your streak freezes if you skip today');

  const totalPlayers = leaderboard.length;
  if (totalPlayers > 1) {
    taunts.push(`${totalPlayers} players competing`);
  }

  return taunts;
}
