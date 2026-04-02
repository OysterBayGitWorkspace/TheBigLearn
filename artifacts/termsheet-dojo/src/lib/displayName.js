export function deriveDisplayName(email) {
  if (!email) return 'Player';
  const local = email.split('@')[0];
  // Split on dots, hyphens, underscores
  const parts = local.split(/[.\-_]+/).filter(Boolean);
  if (parts.length === 0) return 'Player';
  const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  if (parts.length === 1) {
    return capitalize(parts[0]);
  }
  // "max.kramer" -> "Max K."
  return capitalize(parts[0]) + ' ' + parts[1].charAt(0).toUpperCase() + '.';
}
