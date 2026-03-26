export function calculateXP({ difficulty, isCorrect, timeTakenSeconds, combo, isNewCard, activeBoost }) {
  if (!isCorrect) return 0;

  // Base XP differs for new vs review
  const base = isNewCard ? 20 : 10;
  const difficultyBonus = isNewCard ? difficulty * 10 : difficulty * 5;
  const speedBonus = timeTakenSeconds < 5 ? 10 : 0;
  const streakBonus = Math.min(combo * 5, 50);

  let baseTotal = base + difficultyBonus;

  // Combo multiplier applied to base only
  if (combo >= 10) baseTotal *= 2;
  else if (combo >= 5) baseTotal *= 1.5;

  let xp = Math.round(baseTotal + speedBonus + streakBonus);

  if (activeBoost === 'double') xp *= 2;

  return xp;
}
