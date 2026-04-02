# VC DOJO — Update Instructions for Claude Code

## Overview
Three major changes to the VC DOJO (TheBigLearn) app. **DO NOT change any design/styling/UI.** Only add content, logic, and new game modes that fit within the existing design system.

---

## CHANGE 1: Mastery Tracking — "2 Correct = Mastered"

### Current behavior (broken):
- Answering a question correctly ONCE marks it as "mastered"
- Questions appear in predictable order
- Displaying "3/61 mastered (5%)" is misleading because 1 correct ≠ understanding

### New behavior:
- Each question requires **2 correct answers** (on separate attempts) before counting as "mastered"
- Track `correct_count` per question per user in the database
- Questions are **randomly shuffled** each training session — never the same order twice
- The mastery progress display should reflect the new 2-correct threshold
- **This applies to ALL THREE TIERS, not just Foundations**

### Database changes needed:

```sql
-- Add correct_count tracking to user progress (create table if needed)
CREATE TABLE IF NOT EXISTS user_question_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  question_id TEXT NOT NULL,
  correct_count INTEGER DEFAULT 0,
  last_answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_mastered BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, question_id)
);

-- A question is "mastered" only when correct_count >= 2
-- Update mastery check logic everywhere:
-- OLD: Any single correct answer = mastered
-- NEW: correct_count >= 2 = mastered
```

### Logic changes:

```javascript
// When a user answers correctly:
async function recordCorrectAnswer(userId, questionId) {
  const { data } = await supabase
    .from('user_question_progress')
    .upsert({
      user_id: userId,
      question_id: questionId,
      correct_count: supabase.raw('COALESCE(correct_count, 0) + 1'),
      last_answered_at: new Date().toISOString(),
    }, { onConflict: 'user_id,question_id' })
    .select();
  
  // Mark as mastered if correct_count >= 2
  if (data && data[0]?.correct_count >= 2) {
    await supabase
      .from('user_question_progress')
      .update({ is_mastered: true })
      .eq('user_id', userId)
      .eq('question_id', questionId);
  }
}

// Mastery count query:
// SELECT COUNT(*) FROM user_question_progress 
// WHERE user_id = ? AND correct_count >= 2

// Fisher-Yates shuffle for question ordering:
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// When fetching questions for a session:
// 1. Get all questions for the tier
// 2. Shuffle randomly
// 3. Prioritize unmastered questions (correct_count < 2) but include some mastered ones
```

---

## CHANGE 2: Expanded Question Bank

Import ALL questions from `questions_database.json` into the Supabase `questions` table.

### Quality rules (already applied, verify on any new additions):
- No answer option uses double dashes ("--")
- No correct answer stands out by being longer, more detailed, or more specific
- All 4 answer options are plausible and roughly the same length/complexity
- Questions test understanding, not just keyword recognition

### Structure per question:
```json
{
  "id": "q0001",
  "tier": 1,
  "category": "Equity & Cap Table",
  "question": "What is a cap table?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct_answer": 1,
  "explanation": "Brief explanation shown after answering.",
  "difficulty": 1
}
```

### Current counts (in questions_database.json):
- Tier 1 (Foundations): 179 questions
- Tier 2 (Applied Knowledge): 58 questions
- Tier 3 (Expert Scenarios): 27 questions
- **Total: 264 questions**

### EXPANDING THE DATABASE (important!):
The user wants 300+ questions for Foundations alone. To expand:
1. Study the existing format, categories, and quality rules
2. Generate additional questions in the EXACT same JSON structure
3. Target: 300+ for Tier 1, 120+ for Tier 2, 70+ for Tier 3
4. Tier 1 categories: "Equity & Cap Table", "Investor Rights", "Valuation", "Dilution & Anti-Dilution", "ESOP & Employee Equity", "Liquidation & Exit", "Governance & Board", "Legal Basics", "Fund Structure", "Key Concepts", "Debt & Convertibles"
5. Tier 2 focuses on: calculations, applied scenarios, due diligence, negotiation strategy
6. Tier 3 focuses on: complex multi-concept scenarios, German-specific terms, edge cases
7. Deduplicate to avoid repeat questions
8. Quality check: all 4 options plausible and similar length. No standout correct answers.

---

## CHANGE 3: Fun Game Modes (Duolingo-style)

Add a "Fun Games" section alongside existing "Start Training" (multiple choice). These test the SAME knowledge through different game mechanics. Use the `game_modes_data.json` file for pre-built content.

### Game Mode 1: "Match Pairs"
- Display 6 terms on the left, 6 definitions on the right (shuffled)
- User taps a term, then taps its matching definition
- Correct matches disappear with a satisfying animation
- Timer counts up (faster = more XP)
- Wrong match: shake animation, try again
- Pull data from `game_modes_data.json` → `match_pairs_sets`
- 10 pre-built sets across all Tier 1 categories

### Game Mode 2: "True or False — Speed Round"
- Show a statement about a VC term
- User taps TRUE or FALSE (or swipe right/left)
- 20 statements per round, 10 seconds each
- Some statements are correct, some deliberately wrong
- XP based on speed + accuracy
- Pull from `game_modes_data.json` → `true_false_statements` (30 pre-built)

### Game Mode 3: "Fill in the Blank"
- Show a definition with the key term blanked out
- User picks from 4 term options
- Generated dynamically from the questions database:
  - Pick a question → use its explanation as the "blank" prompt
  - The correct answer is the term itself
  - 3 wrong options are other terms from the same category
- Example: "The right that allows existing shareholders to maintain their ownership percentage by investing in new rounds is called ___"
- Options: "Pro-rata right", "Tag-along right", "ROFR", "Drag-along right"

### Game Mode 4: "Term Sorter"
- Show 6 terms that belong to 2 different categories
- User drags each term into the correct category bucket
- Pull from `game_modes_data.json` → `term_sorter_sets` (5 pre-built)
- Categories like: "Investor Protection" vs "Founder Protection", "Equity" vs "Debt"

### Implementation notes:
- Each game mode awards XP (same as regular training)
- Each correct answer in a game mode counts toward the question's `correct_count` for mastery tracking
- Game modes pull from the SAME question database + the game_modes_data.json
- Keep the existing design language — same colors, fonts, border-radius, shadows
- Add a "Fun Games" button/section on the main screen, below or alongside "Start Training"
- Each game mode should have its own card/button with an icon and brief description

---

## File Manifest
1. `INSTRUCTIONS.md` — This file (start here)
2. `questions_database.json` — 264 questions across 3 tiers
3. `game_modes_data.json` — Pre-built content for Match Pairs (10 sets), True/False (30 statements), Term Sorter (5 sets)

## Priority Order
1. **First:** Mastery tracking changes (database schema + logic + display)
2. **Second:** Import new questions from questions_database.json
3. **Third:** Add game modes using game_modes_data.json
4. **Fourth:** Expand question database to 300+ Tier 1, 120+ Tier 2, 70+ Tier 3

## CRITICAL Quality Fix: Answer Option Length Equalization

**⚠️ The current questions_database.json has a known issue: correct answers tend to be longer and more detailed than wrong answers. This makes the correct answer guessable without knowing the content.**

Before importing questions, Claude Code MUST run a quality pass:

1. For each question, compare the character length of all 4 options
2. If the correct answer is more than 1.5x the length of the longest wrong answer, the wrong answers need to be REWRITTEN to be similarly detailed and plausible
3. Wrong answers should sound equally "real" and "professional" — not obviously silly or short
4. Example of BAD options (correct stands out by being detailed):
   - "Shares available at a discount" (28 chars)  
   - "Shares with special rights ranking above common shares in certain situations" (75 chars) ← CORRECT, obviously right because it's longer
   - "Shares reserved for the board" (29 chars)
   - "Shares that cannot be transferred" (33 chars)
5. Example of GOOD options (all similar detail):
   - "Shares that provide the holder with a discounted purchase price on future rounds" (80 chars)
   - "Shares with special rights that rank above common shares in certain situations" (77 chars) ← CORRECT
   - "Shares allocated exclusively to board members for governance participation" (73 chars)
   - "Shares that carry restrictions preventing transfer to any external party" (71 chars)

This is ESSENTIAL to the learning experience. The user specifically called this out: "no simple finding the right answer because it stands out."

## Critical Reminders
- DO NOT change the existing visual design (colors, fonts, layout, animations)
- Mastery = 2 correct answers, applies to ALL tiers
- Questions shuffle randomly every session
- Game modes count toward mastery tracking
- All 4 answer options must be plausible and similar length (no standout correct answers)
- Equalize answer option lengths BEFORE importing to database
