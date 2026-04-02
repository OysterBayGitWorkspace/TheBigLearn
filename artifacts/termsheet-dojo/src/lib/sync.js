import { supabase } from './supabase';
import { deriveDisplayName } from './displayName';

let syncTimer = null;
let isDirty = false;

// Fetch game state from Supabase for the authenticated user
export async function fetchCloudState(userId) {
  const { data, error } = await supabase
    .from('user_progress')
    .select('game_state, updated_at')
    .eq('user_id', userId)
    .single();

  if (error && error.code === 'PGRST116') {
    // No row exists yet , new user
    return null;
  }
  if (error) {
    console.warn('Failed to fetch cloud state:', error.message);
    return null;
  }
  return data;
}

// Write game state to Supabase (upsert)
export async function pushToCloud(userId, gameState, userEmail) {
  const displayName = userEmail ? deriveDisplayName(userEmail) : null;
  const row = {
    user_id: userId,
    game_state: gameState,
    updated_at: new Date().toISOString(),
  };
  if (displayName) row.display_name = displayName;

  const { error } = await supabase
    .from('user_progress')
    .upsert(row, { onConflict: 'user_id' });

  if (error) {
    console.warn('Failed to push to cloud:', error.message);
    return false;
  }
  isDirty = false;
  return true;
}

// Debounced cloud sync (trailing edge, 2s)
export function scheduleSyncToCloud(userId, gameState, userEmail) {
  isDirty = true;
  if (syncTimer) clearTimeout(syncTimer);
  syncTimer = setTimeout(() => {
    pushToCloud(userId, gameState, userEmail);
  }, 2000);
}

// Merge local and cloud state , last-write-wins based on timestamps
export function mergeStates(localState, cloudData) {
  if (!cloudData || !cloudData.game_state) return localState;
  if (!localState) return cloudData.game_state;

  const localUpdated = localState.lastActiveDate || '1970-01-01';
  const cloudUpdated = cloudData.updated_at || '1970-01-01';

  // Compare: cloud updated_at is a full ISO timestamp, local lastActiveDate is YYYY-MM-DD
  // Use cloud updated_at as the authoritative timestamp
  const cloudTime = new Date(cloudUpdated).getTime();
  const localTime = localState._lastSyncedAt
    ? new Date(localState._lastSyncedAt).getTime()
    : 0;

  if (cloudTime > localTime) {
    // Cloud is newer , use cloud state but preserve _lastSyncedAt
    return { ...cloudData.game_state, _lastSyncedAt: new Date().toISOString() };
  }

  // Local is newer , keep local
  return { ...localState, _lastSyncedAt: new Date().toISOString() };
}

// Sync on reconnect
export function setupOnlineSync(getUserId, getState) {
  if (typeof window === 'undefined') return;

  window.addEventListener('online', async () => {
    const userId = getUserId();
    if (!userId || !isDirty) return;

    try {
      // Try to refresh session first
      await supabase.auth.refreshSession();
      await pushToCloud(userId, getState());
    } catch (e) {
      console.warn('Online sync failed:', e);
    }
  });
}

// Flush pending sync on page unload
export function setupUnloadSync(getUserId, getState) {
  if (typeof window === 'undefined') return;

  window.addEventListener('beforeunload', () => {
    if (syncTimer) clearTimeout(syncTimer);
    const userId = getUserId();
    if (userId && isDirty) {
      // Best-effort sync using sendBeacon
      const payload = JSON.stringify({
        user_id: userId,
        game_state: getState(),
        updated_at: new Date().toISOString(),
      });
      // sendBeacon can't do upserts directly, so we just try localStorage save
      try {
        localStorage.setItem('termy_v3', JSON.stringify(getState()));
      } catch (e) { /* best effort */ }
    }
  });
}
