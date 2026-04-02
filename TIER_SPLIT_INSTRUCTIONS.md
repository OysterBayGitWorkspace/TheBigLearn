# TIER SPLIT + SHUFFLE FIX — Instructions for Claude Code

## Overview
Two structural changes:
1. Split Tier 1 into "Basics" (pure definitions) and "Foundations" (applied knowledge)
2. Fix question repetition across sessions

## FILES ALREADY UPDATED (in repo root, copy to correct paths):
- `topics.js` → replace `artifacts/termsheet-dojo/src/data/topics.js`
- `session.js` → replace `artifacts/termsheet-dojo/src/engine/session.js`

## STEP 1: Reclassify existing questions

In `artifacts/termsheet-dojo/src/data/questions.js`, scan ALL questions with `difficulty: 1`.

Change `difficulty` from `1` to `0` for questions that are PURE DEFINITIONS — specifically:
- Questions starting with "What is..." that ask for a simple definition
- Questions asking "What does X mean?"
- Questions asking for the definition of a single term
- Questions like "What is a cap table?", "What is a SAFE?", "What is dilution?"

Keep `difficulty: 1` for questions that:
- Compare two things ("How does X differ from Y?")
- Ask about consequences or implications
- Require understanding relationships between concepts
- Ask "when" or "why" something happens
- Involve any calculation or scenario

Example reclassifications:
- "What is a cap table?" → difficulty: 0 (pure definition)
- "What is a ROFR?" → difficulty: 0 (pure definition)
- "How does ROFO differ from ROFR?" → stays difficulty: 1 (comparison)
- "What happens when anti-dilution is triggered?" → stays difficulty: 1 (applied)
- "What is a board seat right?" → difficulty: 0 (pure definition)

After reclassifying, the `tier` field should also be updated:
- difficulty 0 → tier: 0
- difficulty 1 → tier: 1
- difficulty 2 → tier: 2
- difficulty 3 → tier: 3

## STEP 2: Generate additional Basics questions

The Basics tier should have at least 60 questions. If reclassification gives fewer than 60 from existing questions, generate additional pure "What is X?" questions covering these VC terms:

Core terms that MUST have a basics question:
- Share, Common Share, Preferred Share, Ordinary Share
- Cap Table, Fully Diluted Cap Table
- ESOP, Stock Option, Vesting, Cliff, Exercise Price
- Valuation, Pre-Money, Post-Money
- Dilution, Anti-Dilution
- SAFE, Convertible Note, Valuation Cap, Discount Rate
- Liquidation Preference, Participating Preferred, Non-Participating Preferred
- Pro-Rata Right, ROFR, ROFO, Tag-Along, Drag-Along
- Term Sheet, Due Diligence, NDA
- Board of Directors, Board Seat, Board Observer
- Carried Interest, Management Fee, GP, LP
- IPO, Trade Sale, Secondary Sale
- Bridge Round, Down Round, Flat Round, Up Round
- Burn Rate, Runway, Revenue
- Hurdle Rate, Waterfall, DPI, TVPI, IRR
- Venture Debt, Mezzanine, Revenue-Based Financing
- Patent, IP Assignment, Non-Compete

Format: same as existing questions in questions.js. Use id format "qb001", "qb002", etc.
All 4 options must be similar length and equally plausible.
Each question explanation should be 1-2 sentences max.

## STEP 3: Update GameContext mastery logic

In `artifacts/termsheet-dojo/src/context/GameContext.jsx`:

1. Add import: `import { getMasteryThreshold } from '../data/topics';`

2. In the ANSWER_QUESTION handler, find where `isMastered` is computed:
```js
isMastered: newCorrectCount >= 2,
```
Replace with:
```js
isMastered: newCorrectCount >= getMasteryThreshold(
  state.session?.topicId || 'foundations'
),
```

## STEP 4: Update SkillTreeScreen

In `artifacts/termsheet-dojo/src/screens/SkillTreeScreen.jsx`:

Add the new icon to TIER_ICONS:
```js
const TIER_ICONS = {
  book: Icons.book,
  brain: Icons.brain,
  fire: Icons.fire,
};
```
(No change needed since "basics" also uses "book" icon.)

Update the unlock message for "basics" — since it requires 100% mastery (3 correct each), the lock message for Foundations should say:
"Master ALL Basics questions (3 correct each) to unlock"

Find the lock message section and make it dynamic:
```js
{!unlocked && req && (
  <div style={{...}}>
    {Icons.flag('var(--text-faint)', 12)} {
      req.percent === 100
        ? `Master ALL ${TIERS.find(t => t.id === req.tierId)?.name || req.tierId} questions to unlock`
        : `Complete ${req.percent}% of ${TIERS.find(t => t.id === req.tierId)?.name || req.tierId} to unlock`
    }
  </div>
)}
```

## STEP 5: Update HomeScreen mastery progress bar

In `src/screens/HomeScreen.jsx`, the mastery progress should now account for the variable thresholds. Update the `totalMastered` calculation:

```js
import { getMasteryThreshold, TIERS, getQuestionsForTier } from '../data/topics';

// Replace the simple totalMastered count with tier-aware mastery:
const totalMastered = ALL_QUESTIONS.filter(q => {
  const qp = (state.questionProgress || {})[q.id];
  if (!qp) return false;
  // Find which tier this question belongs to
  const diffToTier = { 0: 'basics', 1: 'foundations', 2: 'intermediate', 3: 'advanced' };
  const tierId = diffToTier[q.difficulty] || 'foundations';
  const threshold = getMasteryThreshold(tierId);
  return qp.correctCount >= threshold;
}).length;
```

## STEP 6: Delete staging files from repo root

After integrating:
```bash
rm topics.js session.js
```

## STEP 7: Commit

```
git add -A && git commit -m "Split Tier 1 into Basics + Foundations, 3-correct mastery for Basics, anti-repeat shuffle"
```

## DO NOT:
- Change any visual design, colors, fonts, or layout
- Change the SkillTreeScreen card layout or styling
- Modify any game mode screens (TermSorter, MatchPairs, etc.)
- Change the XP calculation logic
- Remove or rename any existing exports that other files depend on
