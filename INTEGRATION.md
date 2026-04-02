# Streak Fire v3 — Integration Guide

## 3 steps:

### Step 1: Replace `src/components/StreakFire.jsx`
Drop in the new `StreakFire.jsx`. Same API: `<StreakFire count={number} />`

### Step 2: Replace CSS in `src/App.jsx`
In the CSS template literal, find the old streak-fire block:
```
.streak-fire{ ... }
.fire-glow{ ... }
@keyframes fGlow{ ... }
.fire-icon{ ... }
...through...
@keyframes fRise{ ... }
```
Delete it and paste the contents of `streak-fire-css.css`.

### Step 3: Update HomeScreen.jsx
In `src/screens/HomeScreen.jsx`:
1. Delete the inline `function StreakFire({ count })` definition
2. Add this import:
```js
import StreakFire from '../components/StreakFire';
```

---

## The 5 tiers

| Streak | Name    | Flame                          | Vibe                                    |
|--------|---------|--------------------------------|-----------------------------------------|
| 1–4    | Ember   | Small red teardrop             | Gentle sway, soft glow                  |
| 5–9    | On fire | Taller orange with inner core  | Faster flicker, brighter sparks         |
| 10–19  | Inferno | Wild gold/orange, side tongues | Rapid organic shape, gold inner layers  |
| 20–29  | Void    | Purple with black core         | Slow dominant pulse, ominous breathing  |
| 30+    | King    | Blue boss flame + electricity  | Crackling bolts, intense erratic glow   |

## Key effects
- **Inferno (10+)**: Flame shape becomes organic with side tongue elements that animate independently. Gold/orange color mix.
- **Void (20+)**: Entire container pulses slowly. Dark core inside purple flame breathes. Movement is calm but dominant.
- **King (30+)**: Electric lightning bolts regenerate every 180ms around the flame. Erratic glow pulse. Blue with white-hot center.
- **Milestones**: Burst ring + floating label at 5 (IGNITE), 10 (INFERNO), 20 (VOID FLAME), 30 (THE KING).
- **Progressive**: Flame size, spark count, glow radius all scale continuously within each tier.
