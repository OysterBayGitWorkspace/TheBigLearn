# Adding the Question Bank to Termy

## Quick Option (paste into Replit AI):

---

I'm uploading a `questions.js` file with 162 new questions. Here's what I need:

1. Create a new file `questions.js` in the project root with the uploaded content.

2. In `App.jsx`, add this import at the top:
```js
import { EXTRA_QUESTIONS } from "./questions";
```

3. Find the `QUESTIONS` array in App.jsx. After its closing bracket, add:
```js
const ALL_QUESTIONS = [...QUESTIONS, ...EXTRA_QUESTIONS];
```

4. Find every reference to `QUESTIONS` in the game logic (startRound, CATEGORIES, etc.) and replace with `ALL_QUESTIONS`. There should be about 3-4 references.

5. Update the `CATEGORIES` line to:
```js
const CATEGORIES = [...new Set(ALL_QUESTIONS.map(q => q.category))];
```

6. Add icons for the two new categories. In the `CATEGORY_ICONS` object, add:
```js
"Fund Mechanics": Icons.money,
"Negotiation Tactics": Icons.sword,
```

That's it. No other changes needed.

---

## What's in the question bank:

- 162 new questions (198 total with existing 36)
- 11 categories (9 existing + 2 new: Fund Mechanics, Negotiation Tactics)
- 50 Easy / 71 Medium / 41 Expert difficulty
- 110 multiple choice / 26 true-false / 26 scenario questions
- Every question has a full explanation + German market context
- Covers everything from basic definitions to complex waterfall calculations

## Category breakdown:
- Liquidation Preferences: 24 questions
- Anti-Dilution: 17 questions
- ESOP & VSOP: 18 questions
- Exit & Transfer Rights: 13 questions
- Convertible Instruments: 14 questions
- Governance & Control: 12 questions
- Valuation & Economics: 14 questions
- Pre-emption & Pro-rata: 9 questions
- Advanced Scenarios: 13 questions
- Fund Mechanics (NEW): 14 questions
- Negotiation Tactics (NEW): 14 questions
