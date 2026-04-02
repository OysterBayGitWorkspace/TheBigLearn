export function calculateXP({ difficulty, isCorrect, timeTakenSeconds, combo, isNewCard, currentStreak }) {
  if (!isCorrect) return 0;

  const base = isNewCard ? 20 : 10;
  const difficultyBonus = isNewCard ? difficulty * 10 : difficulty * 5;
  const speedBonus = timeTakenSeconds < 5 ? 10 : 0;
  const streakBonus = Math.min(combo * 5, 50);

  let baseTotal = base + difficultyBonus;

  // Combo multiplier applied to base only
  if (combo >= 10) baseTotal *= 2;
  else if (combo >= 5) baseTotal *= 1.5;

  let xp = Math.round(baseTotal + speedBonus + streakBonus);

  // Automatic streak-based multiplier
  if (currentStreak >= 100) xp *= 3;
  else if (currentStreak >= 40) xp = Math.round(xp * 2.5);
  else if (currentStreak >= 20) xp *= 2;

  return xp;
}

export function getStreakMultiplier(currentStreak) {
  if (currentStreak >= 100) return 3;
  if (currentStreak >= 40) return 2.5;
  if (currentStreak >= 20) return 2;
  return 1;
}
