# VC Dojo — Answer Quality Overhaul

## Problem Summary

Two compounding issues make quiz answers trivially guessable:

1. **Correct answer position bias**: ~75%+ of questions have `correct_answer: 1` (position B). Players learn to default to B.
2. **Weak distractors**: Wrong answers range from "obviously not VC" (basketball references, ping-pong tables) to "too short/vague" compared to the correct answer's detail level.

## Fix 1: Runtime Option Shuffle (Code Change)

### What it does
Every time a question is served in a session, the 4 options are shuffled into a random order and the `correct` index is remapped. This means even if the JSON says `correct_answer: 1`, the player sees the correct answer in a different position every time.

### Where to implement
**File: `src/engine/session.js`** — Add a `shuffleQuestionOptions` function and apply it in `buildLearnSession`.

```javascript
/**
 * Shuffles a question's options and remaps the correct answer index.
 * Returns a new question object (does not mutate the original).
 */
function shuffleQuestionOptions(question) {
  // Build an array of { originalIndex, text } pairs
  const indexed = question.options.map((opt, i) => ({ idx: i, text: opt }));
  
  // Fisher-Yates shuffle
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  
  // Build new options array and find new correct index
  const newOptions = indexed.map(item => item.text);
  const newCorrect = indexed.findIndex(item => item.idx === question.correct);
  
  return {
    ...question,
    options: newOptions,
    correct: newCorrect,
    _originalCorrect: question.correct, // preserve for debugging
  };
}
```

### Integration points

**In `buildLearnSession` (session.js)** — Apply shuffle to every question before returning:

```javascript
// At the end of buildLearnSession, before the return:
return shuffleArray(selected.slice(0, maxSize)).map(shuffleQuestionOptions);
```

**In `buildReviewSession` (session.js)** — Same treatment:

```javascript
// Before returning:
return dueQuestions.slice(0, maxSize).map(shuffleQuestionOptions);
```

**In `FillBlankScreen.jsx`** — Already shuffles options internally via its own `shuffle()` call, so no change needed there.

**In `GameContext.jsx`** — The `START_SESSION` action receives pre-built questions. Since `buildLearnSession` now returns shuffled options, no change needed in the reducer. But verify that `ANSWER_QUESTION` compares against `q.correct` (it does — line references `q.correct`).

### Export
Add `shuffleQuestionOptions` to the module exports in session.js so game modes can use it too:

```javascript
export { shuffleArray, shuffleQuestionOptions };
```

---

## Fix 2: Distractor Quality Rewrite (Claude Code Prompt)

### Audit findings

**Position bias in `questions_database.json`:**
- `correct_answer: 0` → ~12% of questions
- `correct_answer: 1` → ~72% of questions ← PROBLEM
- `correct_answer: 2` → ~12% of questions
- `correct_answer: 3` → ~4% of questions

**Distractor quality categories (worst offenders):**

| Issue | Example Question | Bad Distractor |
|-------|-----------------|----------------|
| Absurdly off-topic | "What is a pivot?" (q0154) | "A basketball move involving rotating on one foot" |
| Joke answers | "Employee offered 0.1% equity. What should they ask?" (q0203) | "How many ping-pong tables the office has" |
| Too vague/short | "What is a board observer right?" (q0043) | "Right to watch meetings via live stream" (vs detailed correct) |
| Wrong domain entirely | "What is product-market fit?" (q0155) | "A physical assessment determining whether products fit on retail shelves" |
| Length mismatch | Many Tier 1 questions | Correct is 70+ chars, distractors are 25-35 chars |

---

## Claude Code Prompt

Copy and paste the following into Claude Code terminal:

---

```
I need you to do TWO things to the VC Dojo question system:

## TASK 1: Runtime Option Shuffle

Add a `shuffleQuestionOptions` function to `src/engine/session.js` that randomizes the order of answer options every time a question is served.

Here's the function:

function shuffleQuestionOptions(question) {
  const indexed = question.options.map((opt, i) => ({ idx: i, text: opt }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  const newOptions = indexed.map(item => item.text);
  const newCorrect = indexed.findIndex(item => item.idx === question.correct);
  return {
    ...question,
    options: newOptions,
    correct: newCorrect,
  };
}

Apply it:
1. In `buildLearnSession` — map every question through `shuffleQuestionOptions` before returning
2. In `buildReviewSession` — same treatment before returning
3. Export `shuffleQuestionOptions` alongside `shuffleArray`
4. Do NOT touch FillBlankScreen.jsx — it already shuffles internally

Test: After this change, running the same session twice should show the same questions but with options in different positions.

## TASK 2: Distractor Quality Overhaul in questions.js

Open `src/data/questions.js` which contains ALL_QUESTIONS. For EVERY question in the array, apply these quality rules:

### Rule 1: No absurd/joke distractors
Every wrong answer must be a PLAUSIBLE VC/finance/legal concept that someone with partial knowledge might confuse with the correct answer. 

BAD distractors to find and replace:
- Anything referencing sports, food, office furniture, physical spaces, or everyday objects
- Anything that a 10-year-old could eliminate without knowing VC
- Anything referencing "ping-pong", "basketball", "football", "retail shelves", "server rooms"

GOOD distractors are RELATED VC concepts that are WRONG for this specific question. For example:
- Q: "What is a pro-rata right?" → Bad distractor: "Right to attend board meetings" → Good distractor: "Right to purchase shares at a discount to fair market value in secondary transactions"
- Q: "What is a pivot?" → Bad distractor: "A basketball move" → Good distractor: "A structured reduction in workforce to extend runway during a cash crisis"

### Rule 2: All 4 options must be similar length (within 20% character count)
For each question:
1. Count characters of all 4 options
2. If any option is more than 20% shorter or longer than the median, rewrite it to match
3. The correct answer should NOT be the longest option

### Rule 3: Distractors must be domain-appropriate
All wrong answers must sound like they COULD be real VC/finance/legal terms or definitions. They should be wrong in a SPECIFIC way — confusing one concept with a related one, not making up nonsense.

Distractor generation strategy by tier:
- **Tier 1**: Use definitions of ADJACENT concepts. If the question is about "anti-dilution", distractors should reference liquidation preferences, pre-emption rights, conversion rights — real things that aren't the answer.
- **Tier 2**: Use plausible but WRONG calculations or scenario outcomes. If the answer is €4.5M, distractors should be other amounts that result from common calculation errors (forgetting to subtract preference, using wrong percentage, etc.)
- **Tier 3**: Use nuanced misapplications of correct concepts. The distractor should be something that sounds right but misapplies a rule.

### Rule 4: Vary correct answer position in the static JSON
While the runtime shuffle handles randomization during play, also redistribute correct_answer positions in the JSON for cleanliness:
- Target: roughly 25% each for positions 0, 1, 2, 3
- Go through all 264 questions and redistribute. When moving the correct answer to a new position, swap it with whatever is currently in that position.

### Execution order:
1. First, implement the runtime shuffle in session.js (Task 1)
2. Then, go through ALL_QUESTIONS in questions.js and apply Rules 1-4 (Task 2)
3. For Task 2, work category by category to maintain consistency
4. Do NOT change: question text, explanations, IDs, tiers, categories, or difficulty levels
5. ONLY change: options array content and correct index

### Quality check after completion:
Run this verification:
- Count correct_answer distribution: should be ~25% per position (±5%)
- Check no option contains "basketball", "football", "soccer", "ping-pong", "retail shelf", "server room", "office space", "interior design"  
- Check no question has a correct answer that is >20% longer than the median of its 4 options
- Log any questions where distractors still seem weak

Do Task 1 first, commit, then do Task 2 category by category, committing after each category.
```

---

## Verification Checklist

After Claude Code runs both tasks:

- [ ] Play a session — options appear in different order each time
- [ ] No question has an obviously longer/more detailed correct answer
- [ ] No absurd/joke distractors remain
- [ ] Correct answer position is roughly evenly distributed in static data
- [ ] FillBlankScreen still works (it shuffles independently)
- [ ] Game modes (Term Sorter, Match Pairs, True/False) unaffected
- [ ] All 264 questions still present, no duplicates, no missing IDs
