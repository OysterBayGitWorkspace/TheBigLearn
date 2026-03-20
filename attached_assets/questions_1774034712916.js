// ═══════════════════════════════════════════════════════════════
// TERMY — Extended Question Bank (162 NEW questions)
// Drop this into App.jsx, APPENDING to the existing QUESTIONS array
// Combined with existing 36 questions = 198 total
// Categories: Liquidation Preferences, Anti-Dilution, ESOP & VSOP,
//   Exit & Transfer Rights, Convertible Instruments, Governance & Control,
//   Valuation & Economics, Pre-emption & Pro-rata, Advanced Scenarios,
//   Fund Mechanics (NEW), Negotiation Tactics (NEW)
// ═══════════════════════════════════════════════════════════════

export const EXTRA_QUESTIONS = 
[
  {
    "category": "Liquidation Preferences",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is a liquidation preference?",
    "options": [
      "The right to liquidate the company at any time",
      "The right of preferred shareholders to receive their investment back before common shareholders in an exit",
      "A requirement to distribute profits quarterly",
      "The process of dissolving a GmbH"
    ],
    "correct": 1,
    "explanation": "A liquidation preference ensures preferred investors get paid back before common shareholders (typically founders and employees) when the company is sold or liquidated. It's the most fundamental economic protection in venture deals.",
    "germanContext": "In German: 'Erlösvorzug' or 'Liquidationspräferenz'. This is typically the first economic clause negotiated in any Beteiligungsvertrag."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What does '1x' mean in a 1x liquidation preference?",
    "options": [
      "The investor gets 1% of proceeds",
      "The investor gets their original investment amount back once before others",
      "The investor gets 10x their money",
      "The preference expires after one year"
    ],
    "correct": 1,
    "explanation": "'1x' means the investor receives 1 times their original investment back. If they invested €5M, they get €5M before common shareholders receive anything. A 2x preference would mean €10M back first.",
    "germanContext": "1x non-participating is the DACH market standard for early-stage deals. Anything above 1x is considered aggressive in the German market and should be a red flag for founders."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 1,
    "type": "true_false",
    "question": "A liquidation preference only applies when the company is formally dissolved/liquidated.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Liquidation preferences are triggered by 'deemed liquidation events' which include M&A, trade sales, asset sales, and change-of-control transactions — not just formal company dissolution. An IPO typically triggers automatic conversion, not the preference.",
    "germanContext": "In German contracts, look for 'Exit-Ereignis' or 'fingiertes Liquidationsereignis'. The list of triggering events is a critical negotiation point in German Beteiligungsverträge."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is the difference between participating and non-participating preferred?",
    "options": [
      "Participating preferred has voting rights; non-participating doesn't",
      "Participating preferred gets money back AND shares pro-rata in remaining proceeds; non-participating chooses one or the other",
      "Participating means the investor participates in board meetings",
      "Non-participating means the investor can't attend shareholder meetings"
    ],
    "correct": 1,
    "explanation": "Non-participating: investor chooses the HIGHER of preference OR pro-rata share. Participating (double dip): investor gets preference PLUS pro-rata share of what's left. Participating is significantly more investor-friendly.",
    "germanContext": "'Mit Beteiligung' (participating) vs 'ohne Beteiligung' (non-participating). The BAND model documents default to non-participating, which is standard for German seed/early-stage deals."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "In a €15M exit, investor has 1x non-participating preference (€3M invested, 25% equity). What do they get?",
    "options": [
      "€3M (preference)",
      "€3.75M (25% of €15M — they convert)",
      "€6.75M (€3M + 25% of €12M)",
      "€6M (both)"
    ],
    "correct": 1,
    "explanation": "Non-participating: choose higher of €3M preference OR 25% × €15M = €3.75M. They convert because €3.75M > €3M. This is why non-participating is founder-friendly at good outcomes — it behaves like common stock.",
    "germanContext": "This math is exactly what German founders should model before signing. Use an Erlöswasserfall (waterfall) spreadsheet for every deal."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "Same scenario but with participating preference. €3M invested, 25% equity, €15M exit. What does the investor get?",
    "options": [
      "€3.75M",
      "€3M",
      "€6M (€3M + 25% of €12M)",
      "€5.25M"
    ],
    "correct": 2,
    "explanation": "Participating: €3M preference first, THEN 25% of remaining €12M = €3M. Total: €3M + €3M = €6M. Compare with non-participating (€3.75M). The participating preference extracts €2.25M more from the same exit.",
    "germanContext": "This is why the 'mit/ohne Beteiligung' distinction matters enormously in German deals. A €2.25M difference from the same exit!"
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is a 'participation cap' and why do founders negotiate for it?",
    "options": [
      "A cap on the total number of participating investors",
      "A maximum total return the participating preferred investor can receive, after which they convert to common",
      "A limit on how many rounds can have participation rights",
      "A cap on the preference multiple"
    ],
    "correct": 1,
    "explanation": "A participation cap limits the total return from double-dipping. Example: 3x cap means once the investor has received 3x their investment (through preference + participation combined), they convert to common for any remaining proceeds. This limits the downside of participating preferred for founders.",
    "germanContext": "Participation caps are less commonly negotiated in German deals since most are non-participating by default. But if an investor insists on participation, always counter with a cap. Common cap range in DACH: 2-4x."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 2,
    "type": "scenario",
    "question": "Three investors in a company, all 1x non-participating, pari passu:\n\nSeed: €500K invested, 10% equity\nSeries A: €3M invested, 20% equity\nSeries B: €8M invested, 25% equity\n\nCompany sells for €20M. How much does each investor get?",
    "options": [
      "Seed: €2M, A: €4M, B: €5M (all convert)",
      "Seed: €500K, A: €3M, B: €8M (all take preference)",
      "Seed: €2M, A: €4M, B: €8M (Seed & A convert, B takes preference)",
      "Seed: €500K, A: €3M, B: €5M (all take preference)"
    ],
    "correct": 2,
    "explanation": "Each investor independently chooses: Seed: 10% × €20M = €2M > €500K → converts. Series A: 20% × €20M = €4M > €3M → converts. Series B: 25% × €20M = €5M < €8M → takes preference. Each optimizes independently.",
    "germanContext": "This independent choice mechanic is critical in German Erlöswasserfall analysis. Series B choosing preference while A and Seed convert changes the denominator for everyone."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What does 'pari passu' mean in the context of liquidation preferences?",
    "options": [
      "Later investors get paid first",
      "All preferred shareholders rank equally and get paid proportionally from the same pool",
      "Common shareholders rank equally with preferred",
      "The company pays all debts before any equity distribution"
    ],
    "correct": 1,
    "explanation": "Pari passu means all preferred shareholders have equal ranking. In a liquidation, they split proceeds proportionally based on their preference amounts. This contrasts with 'stacked' or 'senior' preferences where later rounds get paid first.",
    "germanContext": "In German: 'gleichrangig'. The BAND/GESSI standard templates default to pari passu. This is generally more founder-friendly than stacked/senior preferences."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 2,
    "type": "true_false",
    "question": "In a senior (stacked) liquidation preference, later-stage investors get paid their preference before earlier-stage investors.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. In a senior/stacked structure (LIFO — Last In, First Out), Series C gets paid before Series B, which gets paid before Series A. This can completely wipe out earlier investors' preferences in a down exit.",
    "germanContext": "In German: 'vorrangig' (senior). Most DACH institutional VCs resist senior stacking because it creates misaligned incentives between investor rounds. The BAND template uses pari passu."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 3,
    "type": "scenario",
    "question": "Company has two investors:\nSeries A: €4M invested, 1x participating, 30% equity\nSeries B: €10M invested, 1.5x non-participating, 25% equity\n\nCompany sells for €30M. Model the waterfall.",
    "options": [
      "A gets €11.8M, B gets €7.5M, Founders get €10.7M",
      "A gets €4M + 30% of €16M = €8.8M, B takes €15M preference, Founders get €6.2M",
      "A gets €4M + 30% of €26M = €11.8M, B converts for €7.5M, Founders get €10.7M",
      "A gets €9M, B gets €10M, Founders get €11M"
    ],
    "correct": 2,
    "explanation": "Series B has 1.5x non-participating: chooses €15M preference OR 25% × €30M = €7.5M. Takes preference (€15M). BUT WAIT — €15M > proceeds after A's preference (€30M - €4M = €26M × 25% = €6.5M vs €15M). B takes €15M preference. A gets €4M + 30% × (€30M - €4M - €15M) = €4M + €3.3M = €7.3M. Founders get the rest. This is a trap question — the waterfall is more complex than it appears.",
    "germanContext": "High preference multiples (1.5x, 2x) combined with participating rights create extremely complex waterfalls. German founders should ALWAYS build a model. Never negotiate without an Excel waterfall."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "What is the 'conversion overhang' problem with non-participating preferred?",
    "options": [
      "Investors can't convert their shares",
      "At certain exit values, the investor is indifferent between preference and conversion, creating a 'zone of indifference'",
      "The conversion ratio changes over time",
      "Converting preferred shares dilutes other shareholders"
    ],
    "correct": 1,
    "explanation": "There's a specific exit value where preference equals pro-rata conversion value. Below that: take preference. Above that: convert. Right at the crossover point, the investor is indifferent. This creates a zone where small changes in exit value have outsized effects on founder proceeds.",
    "germanContext": "Understanding this crossover point is critical in German M&A negotiations. Calculate it: Crossover = Preference Amount / Pro-rata Percentage. Example: €3M preference, 20% equity → crossover at €15M exit."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "Why do VCs want liquidation preferences?",
    "options": [
      "To make more money than founders",
      "To ensure downside protection — getting their investment back even if the company doesn't achieve the projected valuation",
      "To control the company",
      "To prevent the company from being sold"
    ],
    "correct": 1,
    "explanation": "Liquidation preferences are primarily downside protection. VCs invest at a price reflecting future potential. If the company sells for less than expected, the preference ensures the VC at least gets their capital back before anyone else.",
    "germanContext": "German VCs like HTGF, EIF, and KfW Capital require preferences as standard. It's not aggressive — it's basic investor protection that every institutional LP expects."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What happens to liquidation preferences at IPO?",
    "options": [
      "They become more valuable",
      "They typically convert to common shares automatically",
      "They remain in place forever",
      "The company must buy them back"
    ],
    "correct": 1,
    "explanation": "At IPO, preferred shares typically auto-convert to common shares. The preference disappears because the IPO price is generally well above the preference threshold, making conversion more valuable. This is called 'automatic conversion' or 'qualified IPO conversion.'",
    "germanContext": "In German term sheets, the auto-conversion trigger is tied to a 'Qualified IPO' definition — usually requiring a minimum valuation (e.g., 3-5x the last round price) and minimum proceeds. Negotiate these thresholds carefully."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 3,
    "type": "scenario",
    "question": "You're structuring a Series A. The VC wants 1x participating preferred. The founder counters with 1x non-participating. What's a good compromise?",
    "options": [
      "Split the difference with 0.5x participating",
      "1x participating with a 3x cap — limits the double dip while giving the VC some participation upside",
      "1x non-participating with a higher valuation to compensate the VC",
      "Just accept the participating — it doesn't matter much"
    ],
    "correct": 1,
    "explanation": "A participation cap is the classic compromise. The VC gets some participation upside (addresses their concern about modest exits), but the cap prevents unlimited double-dipping at large exits. A 3x cap means once total returns hit 3x invested capital, the investor converts to common. Everyone's interests align at scale.",
    "germanContext": "This compromise is increasingly common in DACH Series A/B deals where international VCs push for participation. German founders should always propose a cap rather than accepting uncapped participation."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 2,
    "type": "true_false",
    "question": "If a company has €5M in debt and sells for €20M, the liquidation preference is calculated on the full €20M.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Debt holders (banks, creditors) get paid BEFORE any equity distribution. The liquidation preference applies to proceeds AFTER debt repayment. So the preference pool is €20M - €5M = €15M. Outstanding debt always has priority over equity preferences.",
    "germanContext": "In German GmbH insolvency, §38 InsO governs creditor priority. Debt holders rank above all equity, including preferred. Venture debt (from providers like the European Investment Bank) can significantly impact waterfall distributions."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "A company raised €2M at a €8M pre-money valuation with 1x non-participating preferred. What is the investor's 'breakeven' exit value where they're indifferent between preference and conversion?",
    "options": [
      "€8M",
      "€10M",
      "€2M",
      "€20M"
    ],
    "correct": 1,
    "explanation": "Investor owns €2M/€10M post-money = 20%. Breakeven: Preference = Conversion → €2M = 20% × X → X = €10M. At exactly €10M exit, both options yield €2M. Below €10M: take preference. Above €10M: convert.",
    "germanContext": "This is the Umschlagpunkt (conversion point) that every German VC and founder should calculate immediately when reviewing term sheets."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "Why might a VC intentionally accept a LOWER liquidation preference (e.g., 0.5x non-participating)?",
    "options": [
      "They don't understand term sheets",
      "To signal founder-friendliness and win competitive deals, accepting more risk for stronger alignment",
      "They expect the company to fail",
      "German law requires it"
    ],
    "correct": 1,
    "explanation": "In competitive markets, some VCs differentiate by offering founder-friendly terms including reduced preferences. A 0.5x preference says 'I believe in the upside so much that I'm willing to take more downside risk.' This can be a strong signal in a hot deal where multiple VCs compete.",
    "germanContext": "Some German VCs like Cherry Ventures and La Famiglia have been known to offer more founder-friendly preference terms to win competitive rounds. This is a sign of a confident, alignment-focused investor."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is a 'carve-out' in the context of liquidation preferences?",
    "options": [
      "Removing certain assets from the company before sale",
      "A pre-preference pool set aside for management/employees, typically 5-15% of exit proceeds",
      "Carving out specific investors from the preference waterfall",
      "Removing intellectual property from the sale"
    ],
    "correct": 1,
    "explanation": "A management carve-out ensures employees/founders receive a guaranteed percentage of exit proceeds BEFORE the preference waterfall kicks in. This protects the team in scenarios where the preference stack would otherwise leave nothing for common shareholders.",
    "germanContext": "Carve-outs are especially relevant in German down-round scenarios where preference stacks can eat all the proceeds. Negotiate for a management carve-out in any deal with multiple preference layers."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What triggers anti-dilution protection?",
    "options": [
      "Any new funding round",
      "A 'down round' — new shares issued at a price lower than the previous round",
      "Employee stock option grants",
      "A stock split"
    ],
    "correct": 1,
    "explanation": "Anti-dilution protection is triggered specifically by down rounds — when new shares are sold at a lower price per share than what the protected investor paid. Up rounds and flat rounds don't trigger it.",
    "germanContext": "In German: triggered when the 'Ausgabepreis' (issue price) of new shares is below the previous round's 'Anteilspreis'. This is specified in the Verwässerungsschutz clause."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What are the two main types of anti-dilution mechanisms?",
    "options": [
      "Pre-money and post-money",
      "Automatic and manual",
      "Full ratchet and weighted average",
      "Broad-based and narrow-based"
    ],
    "correct": 2,
    "explanation": "The two primary mechanisms are full ratchet (reprices entire old round to new round price) and weighted average (adjusts price based on a formula considering the amount of new shares and their price). Weighted average is further divided into broad-based and narrow-based.",
    "germanContext": "German term sheets typically specify 'Vollverwässerungsschutz' (full ratchet) or 'gewichteter Durchschnitt' (weighted average). The DACH standard is broad-based weighted average."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "Why is full ratchet considered the most aggressive anti-dilution mechanism?",
    "options": [
      "It's the most common",
      "It reprices the ENTIRE previous round to the new lower price, regardless of how many new shares are issued — even a tiny down round triggers a massive repricing",
      "It only protects large investors",
      "It applies to all shareholders equally"
    ],
    "correct": 1,
    "explanation": "Full ratchet ignores the size of the down round. Even if only €100K of new shares are issued at a lower price, the ENTIRE previous round gets repriced to that lower amount. This creates massive additional dilution for founders.",
    "germanContext": "Full ratchet is rare in German deals and considered a red flag. If you see 'Vollverwässerungsschutz' in a term sheet, push hard for weighted average instead. Most experienced German VCs won't insist on full ratchet."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 2,
    "type": "scenario",
    "question": "Investor A put in €4M at €10/share (400K shares) with broad-based weighted average anti-dilution. A down round occurs: €2M raised at €6/share. There are 2M shares outstanding (fully diluted). What is the new adjusted conversion price for Investor A?",
    "options": [
      "€6.00 (full ratchet)",
      "€9.27 (weighted average adjustment)",
      "€8.00 (simple average)",
      "€10.00 (no change)"
    ],
    "correct": 1,
    "explanation": "Broad-based weighted average formula: New Price = Old Price × (Old Shares + New Money / Old Price) / (Old Shares + New Shares Actually Issued). = €10 × (2M + 200K) / (2M + 333K) = €10 × 2.2M/2.333M ≈ €9.43. The exact number depends on the formula variant used, but the key insight is it's much milder than full ratchet (€6.00).",
    "germanContext": "The exact formula varies between German term sheets. Always verify the 'Berechnungsformel' clause. Some German lawyers use slightly different formulations that can produce meaningfully different results."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 1,
    "type": "true_false",
    "question": "Anti-dilution protection benefits ALL shareholders equally.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Anti-dilution only protects the investors who have it in their terms. When anti-dilution kicks in, the protected investor gets more shares (or a lower conversion price), which INCREASES dilution for everyone else — primarily founders and employees with common stock or VSOPs.",
    "germanContext": "This is a key asymmetry in German Beteiligungsverträge. Founders bear the dilution cost of anti-dilution adjustments. Always model the impact of a potential down round on founder ownership."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is the difference between broad-based and narrow-based weighted average anti-dilution?",
    "options": [
      "Broad-based is more aggressive for investors",
      "Broad-based includes ALL outstanding equity (common, preferred, options, warrants) in the formula denominator; narrow-based only includes preferred shares",
      "They produce identical results",
      "Broad-based applies to all rounds; narrow-based only to the most recent"
    ],
    "correct": 1,
    "explanation": "The key difference is the denominator. Broad-based includes everything: common shares, preferred, outstanding options, warrants, convertibles. Narrow-based only counts preferred shares. Since broad-based has a larger denominator, the price adjustment is smaller — making it more founder-friendly.",
    "germanContext": "German standard (BAND/GESSI): broad-based ('auf breiter Basis'). Always verify whether the ESOP/VSOP pool is included in the calculation base — this can swing the result."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 3,
    "type": "scenario",
    "question": "A company has had 3 funding rounds. Series A has full ratchet anti-dilution. A bridge round is needed at a 40% lower valuation. The founder owns 45%. What cascading effects should the founder expect?",
    "options": [
      "Only Series A price adjusts, founder stays at 45%",
      "Series A reprices → more A shares issued → founder diluted to ~32%, VSOP pool diluted proportionally, and if Series B has weighted average protection, that might trigger too",
      "Just a small adjustment to Series A shares",
      "The founder's shares also get repriced"
    ],
    "correct": 1,
    "explanation": "Full ratchet in a 40% down round is devastating. Series A's entire round reprices, generating significant new shares. This dilutes everyone else — founder drops from 45% to roughly 32%. If Series B also has anti-dilution (even weighted average), the Series A adjustment might constitute a technical down round relative to B's price, potentially triggering B's protection too. It cascades.",
    "germanContext": "This is the nightmare scenario in German startup finance. Down rounds in German GmbH structures require 75% Gesellschafterversammlung approval AND notarization, giving the investor with anti-dilution significant leverage in the negotiation."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is a 'pay-to-play' provision and how does it interact with anti-dilution?",
    "options": [
      "Investors must pay to attend board meetings",
      "Investors who don't participate pro-rata in a new round lose their anti-dilution protection (and often other preferred rights)",
      "Founders must pay investors a fee to trigger anti-dilution",
      "Investors can pay extra to get stronger anti-dilution terms"
    ],
    "correct": 1,
    "explanation": "Pay-to-play forces investors to put more money in during subsequent rounds to keep their preferred rights. If they don't participate, their preferred shares may convert to common — stripping away anti-dilution, liquidation preferences, and other protections. This prevents 'free rider' investors who enjoy downside protection without continued support.",
    "germanContext": "'Beteiligungspflicht' or 'Pay-to-Play' in German. Increasingly common in German later-stage deals. Good for founders because it ensures continued investor commitment."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 2,
    "type": "true_false",
    "question": "Anti-dilution protection also protects against dilution from employee stock option grants.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Anti-dilution protection typically has a carve-out for shares issued under approved employee equity plans (ESOP/VSOP). New hires getting options doesn't trigger anti-dilution. However, increasing the size of the option pool beyond the originally approved amount might require investor consent.",
    "germanContext": "Standard German Beteiligungsverträge include 'Ausnahmen vom Verwässerungsschutz' listing exemptions including approved VSOP pools. Check the exact wording — some exclude only the original pool size, not expansions."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "Company raised Series A at €20/share with weighted average anti-dilution. Now doing a down round at €12/share. The CEO proposes a 'pull-up' — pricing the new round at €16 with warrants that effectively bring it to €12. Does this avoid triggering anti-dilution?",
    "options": [
      "Yes — the stated price is €16, above the trigger threshold",
      "No — sophisticated anti-dilution clauses look at 'effective price' including warrants, discounts, and other sweeteners",
      "It depends on the specific contract language",
      "Warrants never affect anti-dilution calculations"
    ],
    "correct": 1,
    "explanation": "Well-drafted anti-dilution provisions use the 'effective price' or 'deemed price' of new securities, accounting for warrants, discounts, ratchets, and other deal sweeteners. Simply structuring around the nominal price won't work if the clause includes an 'effective price' definition.",
    "germanContext": "German lawyers call this the 'wirtschaftliche Betrachtungsweise' (economic substance approach). Sophisticated German Beteiligungsverträge define the trigger based on effective per-share price after accounting for all deal economics."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "In a down round, which shareholders bear the cost of anti-dilution adjustments?",
    "options": [
      "The new investors coming in",
      "All shareholders proportionally",
      "Only the founders and common shareholders — the anti-dilution adjustment dilutes them",
      "Only employees"
    ],
    "correct": 2,
    "explanation": "Anti-dilution protects the existing preferred investor at the expense of common shareholders (founders, employees). The protected investor gets additional shares or a lower conversion price, which dilutes everyone WITHOUT anti-dilution protection — primarily founders holding common stock.",
    "germanContext": "This is why German founders must always model anti-dilution scenarios. The dilution burden falls disproportionately on Stammkapital (common shares) holders."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "Which anti-dilution mechanism is most standard in early-stage VC deals globally?",
    "options": [
      "Full ratchet",
      "Narrow-based weighted average",
      "Broad-based weighted average",
      "No anti-dilution"
    ],
    "correct": 2,
    "explanation": "Broad-based weighted average is the global standard for institutional VC deals. It's considered a fair balance between investor protection and founder impact. Full ratchet is rare and aggressive; no anti-dilution is rare because investors consider it basic downside protection.",
    "germanContext": "Confirmed as the DACH standard too. BAND templates, GESSI standards, and most institutional German VCs (Earlybird, HV Capital, Cherry Ventures) use broad-based weighted average."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 3,
    "type": "scenario",
    "question": "Series A investor has anti-dilution. The company needs a bridge round but the founder wants to avoid triggering anti-dilution. What creative structuring options exist?",
    "options": [
      "Issue the bridge as a convertible note (Wandeldarlehen) with a cap at or above the Series A price — since no new shares are issued at a lower price YET, anti-dilution isn't triggered until conversion",
      "There's no way to avoid it",
      "Just issue shares at the Series A price regardless of current valuation",
      "Ask the investor to waive anti-dilution entirely"
    ],
    "correct": 0,
    "explanation": "A Wandeldarlehen (convertible note) at a cap equal to or above the Series A price avoids immediate anti-dilution triggering because no new equity is issued at a discount. Anti-dilution would only trigger later if/when the note converts at a price below Series A. This buys time for the company to recover its valuation.",
    "germanContext": "This is a very common German bridge financing strategy. Wandeldarlehen with a cap at the Series A price is the standard DACH approach to bridge funding without triggering anti-dilution cascades."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What does VSOP stand for in the German startup context?",
    "options": [
      "Very Senior Option Plan",
      "Virtual Stock Option Plan — a contractual right to cash payments that mirror equity value without granting actual shares",
      "Vesting Standard Option Protocol",
      "Variable Share Ownership Plan"
    ],
    "correct": 1,
    "explanation": "A VSOP grants employees a contractual claim to a cash payment equivalent to what they'd receive if they held real shares. They never become actual shareholders (Gesellschafter). It's the dominant employee equity model in Germany.",
    "germanContext": "The VSOP is THE defining feature of German startup compensation. It exists because GmbH share transfers require notarization (§15 GmbHG), making real equity prohibitively expensive."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 1,
    "type": "true_false",
    "question": "In a German VSOP, the employee appears in the Handelsregister as a shareholder.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. VSOP holders are NOT shareholders (Gesellschafter). They don't appear in the commercial register (Handelsregister), have no voting rights, and no statutory information rights. Their rights are purely contractual, governed by the VSOP agreement — not by GmbH law.",
    "germanContext": "This is a fundamental distinction. Real shareholders have rights under GmbHG. VSOP holders only have rights under their contract. Some VSOP agreements grant contractual information rights, but these are weaker than statutory shareholder rights."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is the standard vesting schedule for employee equity in VC-backed startups?",
    "options": [
      "Immediate full vesting",
      "2 years with 6-month cliff",
      "4 years with 1-year cliff — 25% vests at month 12, then monthly/quarterly thereafter",
      "10 years with annual vesting"
    ],
    "correct": 2,
    "explanation": "The global standard is 4-year vesting with a 1-year cliff. After 12 months, 25% vests. The remaining 75% vests monthly or quarterly over the next 36 months. The cliff ensures minimum commitment before any equity is earned.",
    "germanContext": "Same standard in DACH. German VSOPs typically specify the vesting schedule in the 'Unverfallbarkeitsregelung'. Monthly vesting after the cliff is more common than quarterly in German startups."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "An employee has a VSOP with 1% virtual equity. They leave as a Good Leaver after exactly 3 years (4-year vesting, 1-year cliff). What portion of their VSOP is vested?",
    "options": [
      "100% — they passed the cliff",
      "75% — 3 out of 4 years completed",
      "50% — they're a Good Leaver so they lose half",
      "0% — Good Leavers forfeit everything"
    ],
    "correct": 1,
    "explanation": "Good Leaver after 3 years: 3/4 = 75% vested. They keep 0.75% virtual equity (75% of their 1% allocation). The remaining 0.25% (unvested portion) returns to the VSOP pool. Good Leaver status means they keep all vested shares.",
    "germanContext": "In German VSOP contracts, the 'Guter Abgang' clause specifies that vested virtual shares are retained. The unvested portion goes back to the 'Pool' for future hires."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What defines a 'Bad Leaver' in typical German VSOP terms?",
    "options": [
      "Anyone who leaves the company",
      "Termination for cause (wichtiger Grund), voluntary resignation before cliff, criminal activity, or breach of non-compete",
      "Only employees fired for theft",
      "Anyone terminated by the company"
    ],
    "correct": 1,
    "explanation": "Bad Leaver typically includes: termination for cause (wichtiger Grund under §626 BGB), voluntary departure before the cliff period, criminal conviction, material breach of contract, or violation of non-compete/non-solicitation. Bad Leavers forfeit ALL virtual shares — both vested and unvested.",
    "germanContext": "German labor courts (Arbeitsgerichte) scrutinize Bad Leaver clauses under §307 BGB (AGB-Kontrolle). Overly broad Bad Leaver definitions may be deemed unfair and unenforceable. Always include specific, enumerated Bad Leaver triggers."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 2,
    "type": "true_false",
    "question": "In a German VSOP, the payout to the employee comes from company proceeds and sits BEHIND the liquidation preference in the waterfall.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. VSOP payouts are typically calculated on the 'Erlöswasserfall' (proceeds waterfall) AFTER all liquidation preferences have been satisfied. The employee gets the economic equivalent of what a common shareholder with that percentage would receive — which means they're behind all preferred investors.",
    "germanContext": "This is critically important. The VSOP agreement should clearly define the 'Bezugsgröße' (reference amount) for calculating payouts. Check whether it references pre-preference or post-preference proceeds."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 3,
    "type": "scenario",
    "question": "A startup has a 10% VSOP pool. Three employees have allocations: CTO 3%, VP Sales 2%, Lead Dev 1.5%. All fully vested. The company exits for €30M. Series A has a 1x non-participating preference of €5M (20% equity). The Series A investor converts. How is the VSOP paid?",
    "options": [
      "VSOP gets 6.5% of €30M = €1.95M",
      "Since Series A converts, VSOP gets 6.5% of €30M = €1.95M, allocated pro-rata to the three employees",
      "VSOP gets 6.5% of €25M (after preference) = €1.625M",
      "VSOP gets nothing — only real shareholders get paid"
    ],
    "correct": 1,
    "explanation": "Since the Series A investor CONVERTS to common (non-participating), there's no preference deduction. All equity is common. VSOP holders get their 6.5% combined allocation × €30M = €1.95M total. CTO: €900K, VP Sales: €600K, Lead Dev: €450K.",
    "germanContext": "The conversion decision of preferred investors directly impacts VSOP payouts. When investors convert, it's generally better for VSOP holders because there's no preference eating into the pie first."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What changed with §19a EStG regarding employee equity in German startups?",
    "options": [
      "VSOPs became tax-free",
      "Real equity grants became mandatory",
      "Tax on equity participation can now be deferred — solving the 'dry income' (trockenes Einkommen) problem where employees were taxed on paper gains they couldn't sell",
      "All VSOP payouts are now taxed as capital gains"
    ],
    "correct": 2,
    "explanation": "§19a EStG (expanded by Zukunftsfinanzierungsgesetz 2024) allows qualifying startup employees to defer tax on equity/virtual share grants. Previously, receiving shares triggered immediate income tax even though the employee couldn't sell them — 'dry income' taxation.",
    "germanContext": "Important caveat: VSOP payouts at exit are STILL taxed as employment income (up to ~45% Einkommensteuer), NOT as capital gains (~26.375% Abgeltungssteuer). This remains the biggest structural disadvantage vs. US startup employees."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "Why is the ESOP/VSOP pool typically created pre-money rather than post-money?",
    "options": [
      "It's cheaper for the company",
      "Because investors want the pool to come out of the founders' share, not dilute the investor's ownership",
      "German law requires pre-money creation",
      "It doesn't matter when it's created"
    ],
    "correct": 1,
    "explanation": "When the pool is created pre-money, it dilutes only the existing shareholders (founders). The investor's ownership is calculated on the post-money including the pool. This is the 'Option Pool Shuffle' — it effectively lowers the true pre-money valuation for founders.",
    "germanContext": "Very common in German deals. If the term sheet says '€10M pre-money including a 10% VSOP pool', the founders' effective pre-money is only €9M. Always negotiate whether the pool is included in or on top of the pre-money valuation."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "An employee exercises their VSOP at exit and receives €200K. They're in Germany's top tax bracket. Approximately how much do they actually keep after taxes?",
    "options": [
      "€200K — VSOPs are tax-free",
      "~€148K — VSOP payouts are taxed as capital gains at 26.375%",
      "~€110K — VSOP payouts are taxed as employment income at up to ~45% plus Solidaritätszuschlag",
      "~€170K — flat 15% startup tax rate"
    ],
    "correct": 2,
    "explanation": "VSOP payouts are classified as employment income (Arbeitslohn), not capital gains. At the top marginal rate of ~42% plus Solidaritätszuschlag (5.5% of income tax), the effective rate is approximately 44.3%. On €200K, that's roughly €89K in tax, leaving ~€111K. Church tax would increase this further.",
    "germanContext": "This is the critical tax disadvantage of German VSOPs. In the US, exercised stock options held for >1 year qualify for long-term capital gains (~20%). German employees pay more than double the tax rate on the same economic outcome."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is 'acceleration' in the context of vesting?",
    "options": [
      "Making vesting happen faster than scheduled",
      "Immediately vesting some or all unvested shares upon a specific trigger event (like acquisition or termination)",
      "Accelerating the company's growth",
      "Speeding up the cliff period"
    ],
    "correct": 1,
    "explanation": "Acceleration provisions cause unvested shares to vest immediately when triggered. 'Single trigger' = vests on acquisition. 'Double trigger' = vests on acquisition AND termination of the employee. Double trigger is standard because it protects both the employee and the acquirer.",
    "germanContext": "In German: 'Beschleunigungsklausel'. Double trigger ('doppelte Auslösung') is standard in DACH. Single trigger is rare because acquirers don't want all employees fully vested (and potentially leaving) immediately after acquisition."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 2,
    "type": "true_false",
    "question": "Double trigger acceleration requires BOTH a change of control AND termination of the employee within a defined period (usually 12 months).",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. Double trigger requires two events: (1) a change of control (acquisition, merger), AND (2) termination of the employee without cause within a specified window (typically 6-18 months after the change of control). Only when both occur do unvested shares accelerate.",
    "germanContext": "In German VSOPs: 'Kontrollwechsel' (change of control) + 'Kündigung ohne wichtigen Grund' (termination without cause). The time window after change of control is negotiable — 12 months is DACH standard."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What percentage of a startup's equity is typically allocated to the VSOP pool?",
    "options": [
      "1-3%",
      "5-15% (with 10% being most common for early-stage)",
      "25-30%",
      "50%"
    ],
    "correct": 1,
    "explanation": "Standard VSOP pool sizes range from 5-15% of fully diluted equity. 10% is the most common starting point for seed/Series A companies. The pool should be sized to cover 18-24 months of key hires. Later rounds may require pool expansion.",
    "germanContext": "German VCs typically request a 10% pool at seed, potentially expanding to 12-15% at Series A. HTGF standard terms assume a 10% pool. Size it based on your actual hiring plan — don't accept an oversized pool that just dilutes founders unnecessarily."
  },
  {
    "category": "Exit & Transfer Rights",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is a Right of First Refusal (ROFR)?",
    "options": [
      "The right to be first in line for an IPO",
      "The right for existing shareholders to match any third-party offer to buy shares before the sale can proceed",
      "The right to refuse any new investment",
      "The right to sell shares first"
    ],
    "correct": 1,
    "explanation": "ROFR gives existing shareholders the opportunity to purchase shares on the same terms as a third-party buyer. If a founder wants to sell shares to an outsider, existing investors can step in and buy those shares instead, at the same price and terms.",
    "germanContext": "In German: 'Vorkaufsrecht'. Important: German law (§463 BGB) has statutory pre-emption rights, but VC contracts create contractual Vorkaufsrechte that are typically broader and more detailed."
  },
  {
    "category": "Exit & Transfer Rights",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What are Tag-Along rights (Mitverkaufsrecht)?",
    "options": [
      "The right to force others to sell",
      "The right for minority shareholders to JOIN a sale on the same terms when a majority shareholder sells their shares",
      "The right to tag products with the company brand",
      "The right to follow an investor into their next deal"
    ],
    "correct": 1,
    "explanation": "Tag-along protects minority shareholders. If a majority shareholder finds a buyer, minority holders can 'tag along' and sell their shares too, on the same price and terms. This prevents majority holders from getting a sweet deal while leaving minorities stuck.",
    "germanContext": "'Mitverkaufsrecht' or 'Mitveräußerungsrecht'. Standard in every German Beteiligungsvertrag. It protects both investors (minority tag-along on founder sales) and founders (tag-along on investor secondary sales)."
  },
  {
    "category": "Exit & Transfer Rights",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is a lock-up period and when does it typically apply?",
    "options": [
      "A period where the office is locked for renovation",
      "A restriction preventing shareholders from selling shares for a defined period, typically 6-12 months after an IPO",
      "A period where no new investors can join",
      "The time between signing and closing a deal"
    ],
    "correct": 1,
    "explanation": "Lock-up periods prevent insiders (founders, early investors, employees) from selling shares immediately after an IPO. This prevents a flood of selling that could crash the stock price. Typical lock-up: 180 days (6 months) post-IPO.",
    "germanContext": "Lock-up periods also appear in German secondary transactions and M&A deals. In German IPOs on the Frankfurt Stock Exchange, 6-12 month lock-ups are standard for founders and pre-IPO investors."
  },
  {
    "category": "Exit & Transfer Rights",
    "difficulty": 2,
    "type": "true_false",
    "question": "Tag-Along rights are the same as Drag-Along rights.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. They're opposites. Tag-Along: minority CAN join a sale (protective, optional). Drag-Along: majority CAN FORCE minority to sell (coercive, mandatory). Tag-along protects minorities from being left behind. Drag-along prevents minorities from blocking exits.",
    "germanContext": "'Mitverkaufsrecht' (tag-along, voluntary) vs 'Mitveräußerungspflicht' (drag-along, mandatory). Both are standard in German Beteiligungsverträge but serve different purposes."
  },
  {
    "category": "Exit & Transfer Rights",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "Why do investors want Drag-Along rights?",
    "options": [
      "To force founders to work harder",
      "To prevent a small minority from blocking an acquisition that the majority approves",
      "To increase their own share price",
      "To control company strategy"
    ],
    "correct": 1,
    "explanation": "Drag-along ensures that a qualified majority can sell the entire company to a buyer. Without it, a small shareholder could hold out and block an acquisition, even if 80%+ of shareholders agree to sell. Most acquirers want 100% of the company.",
    "germanContext": "Drag-along thresholds in German deals typically require 75% of share capital AND investor majority consent. Some deals have additional requirements like minimum price conditions ('Mindesterlösbedingung')."
  },
  {
    "category": "Exit & Transfer Rights",
    "difficulty": 3,
    "type": "scenario",
    "question": "A €50M acquisition offer arrives. Drag-along threshold is 75%. Shareholders: Founder A (35%), Founder B (15%), Series A (25%), Series B (20%), Angels (5%). Founder A and Series B want to sell. Others don't. What happens?",
    "options": [
      "Deal goes through — 55% is enough",
      "Deal is blocked — 55% < 75%",
      "Founder A can override as largest shareholder",
      "Series A can veto regardless of the percentage"
    ],
    "correct": 1,
    "explanation": "Founder A (35%) + Series B (20%) = 55%. This is below the 75% drag-along threshold. The deal cannot be forced through. They need either Founder B (to get 70%, still not enough) or Series A (to get 80%, which works). This shows why drag-along thresholds are so important.",
    "germanContext": "In German GmbH law, Gesellschaftsvertrag amendments also require 75% (§53 GmbHG). Savvy VCs negotiate additional Zustimmungsvorbehalte (consent rights) that can effectively give them veto power regardless of percentage."
  },
  {
    "category": "Exit & Transfer Rights",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is a 'secondary sale' in the VC context?",
    "options": [
      "The company's second funding round",
      "An existing shareholder selling their shares to a new buyer (not the company issuing new shares)",
      "A backup sales strategy",
      "Selling the company for the second time"
    ],
    "correct": 1,
    "explanation": "A secondary sale involves existing shares changing hands between shareholders/new buyers. Unlike a primary round (company issues new shares for growth capital), secondary transactions don't bring new money into the company — they provide liquidity to existing shareholders.",
    "germanContext": "Secondary sales in German GmbH structures require notarization (§15 GmbHG) and typically need shareholder/investor consent. Secondary markets for German startup shares are growing (e.g., through platforms like Caplight or direct transactions)."
  },
  {
    "category": "Exit & Transfer Rights",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is a 'No-Shop' clause?",
    "options": [
      "A rule preventing the company from opening retail stores",
      "An exclusivity agreement preventing the company from soliciting or negotiating with other potential investors/buyers during a defined period",
      "A ban on online sales",
      "A restriction on employee shopping during work hours"
    ],
    "correct": 1,
    "explanation": "No-shop (exclusivity) gives the lead investor/buyer a window (typically 4-8 weeks) where the company cannot shop the deal to competitors. This protects the investor's time and resources spent on due diligence.",
    "germanContext": "'Exklusivitätsvereinbarung' in German. Standard in German term sheets. Typical exclusivity period: 4-6 weeks for early-stage, up to 8-12 weeks for later-stage or complex deals. Breaching exclusivity can trigger break-up fees."
  },
  {
    "category": "Exit & Transfer Rights",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "What are 'co-sale rights' and how do they differ from ROFR?",
    "options": [
      "They're identical to ROFR",
      "Co-sale lets existing shareholders sell alongside the selling shareholder on the same terms; ROFR lets them buy the shares instead",
      "Co-sale is for companies; ROFR is for individuals",
      "Co-sale requires board approval; ROFR doesn't"
    ],
    "correct": 1,
    "explanation": "ROFR: 'I want to BUY those shares at that price.' Co-sale (tag-along): 'I want to SELL my shares too, on those same terms.' ROFR gives you the right to step into the buyer's shoes. Co-sale gives you the right to join the seller and sell alongside them.",
    "germanContext": "Both mechanisms appear in German Beteiligungsverträge. ROFR is exercised first (Vorkaufsrecht), and if not exercised, co-sale (Mitverkaufsrecht) can be triggered. The sequence matters."
  },
  {
    "category": "Exit & Transfer Rights",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is a 'Deemed Liquidation Event' (DLE)?",
    "options": [
      "When the company runs out of money",
      "Events treated as equivalent to a company liquidation for purposes of triggering liquidation preferences — typically M&A, asset sales, change of control",
      "When the CEO is terminated",
      "An IPO"
    ],
    "correct": 1,
    "explanation": "DLEs expand the scope of liquidation preferences beyond actual company dissolution. They ensure preferred investors get their preference payment in events that economically resemble a sale/liquidation even if the company technically continues to exist.",
    "germanContext": "In German: 'fingiertes Liquidationsereignis' or 'Exit-Ereignis'. The specific list of DLEs is negotiated. Common German additions: Kontrollwechsel (change of control defined at specific thresholds like >50% voting power change), Verschmelzung (merger), wesentliche Vermögensveräußerung (substantial asset sale)."
  },
  {
    "category": "Convertible Instruments",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is the fundamental difference between a SAFE and a Wandeldarlehen?",
    "options": [
      "There is no difference",
      "A Wandeldarlehen is actual DEBT with interest and maturity; a SAFE is NOT debt — it's a contractual right to future equity with no interest or repayment obligation",
      "SAFEs are German; Wandeldarlehen are American",
      "SAFEs convert faster"
    ],
    "correct": 1,
    "explanation": "This is the most important structural distinction. A Wandeldarlehen creates a creditor relationship — the investor is a lender. A SAFE creates an equity-like relationship with no debt characteristics. This matters for insolvency, accounting, and legal treatment.",
    "germanContext": "In German insolvency (Insolvenzverfahren), Wandeldarlehen holders rank as creditors — ahead of all equity holders. This is a significant advantage that SAFEs don't provide. Some German lawyers have begun drafting 'SAFE-like' instruments, but their legal status remains debated."
  },
  {
    "category": "Convertible Instruments",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is a 'valuation cap' on a convertible note/Wandeldarlehen?",
    "options": [
      "The maximum company valuation at which the investor must sell",
      "A maximum valuation at which the convertible converts to equity — protecting the investor by setting a ceiling on conversion price even if the next round is at a higher valuation",
      "The minimum the company must be worth",
      "A cap on total investment amount"
    ],
    "correct": 1,
    "explanation": "The cap sets a maximum effective valuation for conversion. If the next round is at €20M but the cap is €10M, the convertible holder converts at the €10M valuation — getting more shares per euro invested. It rewards early risk-taking.",
    "germanContext": "In German: 'Bewertungsobergrenze'. Standard in German Wandeldarlehen. The cap is THE most important economic term in a convertible. Without a cap, the instrument is essentially just a loan with a discount."
  },
  {
    "category": "Convertible Instruments",
    "difficulty": 2,
    "type": "scenario",
    "question": "An investor gives a €300K Wandeldarlehen with a €4M cap and 20% discount. The Series A prices the company at €8M pre-money. What effective valuation does the investor convert at?",
    "options": [
      "€8M (Series A price)",
      "€6.4M (20% discount on €8M)",
      "€4M (cap applies — it's lower than discounted price)",
      "€3.2M (discount applied to the cap)"
    ],
    "correct": 2,
    "explanation": "The investor gets the BETTER (lower) of: (a) 20% discount on €8M = €6.4M, or (b) the cap = €4M. Since €4M < €6.4M, the cap applies. The investor converts as if the company is worth only €4M, getting significantly more shares. Important: cap and discount don't stack — you take whichever gives the lower price.",
    "germanContext": "Common point of confusion in German deals: some poorly drafted Wandeldarlehen accidentally allow stacking (cap AND discount). Always verify the 'Anwendungsreihenfolge' clause."
  },
  {
    "category": "Convertible Instruments",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What happens when a Wandeldarlehen reaches its maturity date without a qualifying financing event?",
    "options": [
      "It automatically converts at the cap valuation",
      "It expires worthless",
      "The investor has the legal right to demand cash repayment of principal plus accrued interest",
      "The company must immediately do an IPO"
    ],
    "correct": 2,
    "explanation": "Since a Wandeldarlehen is a loan, the investor has a legal right to demand repayment at maturity. In practice, this is rarely enforced — but the legal right creates leverage. Smart founders negotiate automatic conversion at maturity at the cap valuation.",
    "germanContext": "The 'Fälligkeitsdatum' is critical. Best practice: negotiate automatic conversion at maturity at the cap valuation, or a long maturity (24-36 months). Some German Wandeldarlehen include extension options requiring mutual consent."
  },
  {
    "category": "Convertible Instruments",
    "difficulty": 1,
    "type": "true_false",
    "question": "A Wandeldarlehen accrues interest, just like a normal bank loan.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. Since a Wandeldarlehen is legally a loan (Darlehen), it accrues interest. Typical rates: 2-6% per annum. The interest is usually added to the principal and converts to equity along with the original investment. Some agreements specify simple interest; others use compound interest.",
    "germanContext": "German Wandeldarlehen interest rates must be 'marktüblich' (market-standard) to avoid tax issues. Rates below 1% may be challenged by the Finanzamt (tax office). Standard range: 3-5% in current DACH market."
  },
  {
    "category": "Convertible Instruments",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is a 'qualifying financing' that triggers conversion of a Wandeldarlehen?",
    "options": [
      "Any investment of any size",
      "A priced equity round meeting defined minimum criteria — typically a minimum raise amount and/or minimum valuation",
      "Only an IPO",
      "Any event the investor approves"
    ],
    "correct": 1,
    "explanation": "A qualifying financing is a priced equity round that meets contractually defined thresholds. Common criteria: minimum total raise (e.g., €1M+), minimum pre-money valuation, priced round (not another convertible), and minimum number of new investors. Below-threshold rounds don't trigger automatic conversion.",
    "germanContext": "In German: 'Qualifizierte Finanzierungsrunde'. Define this carefully. Setting the threshold too high (e.g., €5M minimum raise) could mean the Wandeldarlehen sits unconverted through smaller rounds, accumulating interest."
  },
  {
    "category": "Convertible Instruments",
    "difficulty": 3,
    "type": "scenario",
    "question": "A founder has two Wandeldarlehen outstanding:\n\nNote A: €200K, €3M cap, 20% discount, 18 months to maturity\nNote B: €500K, €5M cap, 15% discount, 24 months to maturity\n\nSeries A comes in at €7M pre-money. What are the effective conversion valuations for each?",
    "options": [
      "Both convert at €7M",
      "A at €3M (cap), B at €5M (cap)",
      "A at €5.6M (discount), B at €5.95M (discount)",
      "A at €3M (cap wins over €5.6M discount), B at €5M (cap wins over €5.95M discount)"
    ],
    "correct": 3,
    "explanation": "Note A: Discount = €7M × 0.8 = €5.6M. Cap = €3M. Cap wins (lower). Note B: Discount = €7M × 0.85 = €5.95M. Cap = €5M. Cap wins (lower). Both caps apply. Note A gets the best deal because their lower cap gives them significantly more shares per euro.",
    "germanContext": "When a German startup has multiple outstanding Wandeldarlehen at different caps, the cap table impact can be complex. Model all outstanding convertibles together in your Erlöswasserfall before negotiating the equity round."
  },
  {
    "category": "Convertible Instruments",
    "difficulty": 2,
    "type": "true_false",
    "question": "If a startup goes bankrupt with an outstanding Wandeldarlehen, the Wandeldarlehen holder is treated as an equity holder in insolvency proceedings.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Since a Wandeldarlehen is DEBT, the holder is a creditor (Gläubiger) in insolvency, NOT an equity holder. Creditors rank ahead of equity holders in the insolvency waterfall. This is a significant structural advantage of convertible debt over SAFEs.",
    "germanContext": "Under German insolvency law (InsO), the Wandeldarlehen holder files their claim in the Insolvenzverfahren as an unsecured creditor. They rank behind secured creditors and tax claims, but ahead of all shareholders."
  },
  {
    "category": "Convertible Instruments",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is the typical discount on a Wandeldarlehen/convertible note?",
    "options": [
      "50-75%",
      "5-10%",
      "15-25%",
      "No discount is standard"
    ],
    "correct": 2,
    "explanation": "Standard discounts range from 15-25%, with 20% being the most common. The discount rewards the early investor for taking risk before a priced round validates the company's valuation. Higher risk (earlier stage) may justify higher discounts.",
    "germanContext": "DACH market standard: 15-20% discount. HTGF Wandeldarlehen typically include a 20% discount. Higher discounts (25%+) may signal that the company is struggling to raise a priced round."
  },
  {
    "category": "Convertible Instruments",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "What is a 'Most Favored Nation' (MFN) clause in a convertible note?",
    "options": [
      "The company must offer the same terms to investors from all countries",
      "If the company issues ANOTHER convertible with better terms (lower cap, higher discount), the MFN holder automatically gets those better terms too",
      "The investor gets preferential tax treatment",
      "The company must prioritize this investor in future rounds"
    ],
    "correct": 1,
    "explanation": "MFN protects early convertible holders from getting worse terms than later convertible investors. If a subsequent note has a €3M cap and the MFN holder's note has a €5M cap, the MFN clause automatically adjusts their terms to match the better €3M cap.",
    "germanContext": "MFN clauses ('Meistbegünstigungsklausel') are increasingly common in German Wandeldarlehen, especially when multiple convertible rounds are expected. Check whether MFN applies only to cap/discount or to all commercial terms."
  },
  {
    "category": "Governance & Control",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is the Gesellschafterversammlung and why is it important?",
    "options": [
      "It's an annual company party",
      "The shareholder meeting — the highest decision-making body in a German GmbH, ranking above the CEO and any advisory board",
      "A government regulatory body",
      "The employee council"
    ],
    "correct": 1,
    "explanation": "The Gesellschafterversammlung (shareholder meeting) is supreme in a GmbH. Unlike US corporate law where the board of directors is the ultimate authority, in a German GmbH, the shareholders collectively hold the highest power. They can override the CEO (Geschäftsführer) on virtually anything.",
    "germanContext": "This is fundamental to German VC governance and a key difference from US/UK structures. VCs must exercise control through Gesellschafterversammlung voting rights, protective provisions, and sometimes a Beirat."
  },
  {
    "category": "Governance & Control",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is a Beirat in a German startup context?",
    "options": [
      "A government-appointed supervisor",
      "A contractually created advisory board that functions similarly to a US-style board of directors — with defined decision-making powers",
      "A legal requirement for all GmbHs",
      "The same as an Aufsichtsrat"
    ],
    "correct": 1,
    "explanation": "A Beirat is NOT a statutory body — it's created by contract (in the Gesellschaftsvertrag or Beteiligungsvertrag). German VCs use it to replicate US-style board governance within the GmbH framework. The Beirat's powers are defined by the agreement, not by law.",
    "germanContext": "Important distinction: a Beirat is NOT an Aufsichtsrat (supervisory board required for large corporations). A Beirat has only the powers explicitly granted to it in the contract. No contract = no powers."
  },
  {
    "category": "Governance & Control",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What are 'protective provisions' (Zustimmungsvorbehalte)?",
    "options": [
      "Insurance policies for investors",
      "Specific major decisions where investors have VETO power regardless of their equity percentage — the company cannot take these actions without investor consent",
      "General voting rights based on share ownership",
      "Protection against lawsuits"
    ],
    "correct": 1,
    "explanation": "Protective provisions are a list of significant actions that require explicit investor consent. Even if the founders hold 70%+ of equity, they cannot take these actions without the investor's approval. This is the primary mechanism through which minority investors exercise control.",
    "germanContext": "Standard German Zustimmungsvorbehalte include: new share issuance, debt above a threshold, budget approval, hiring/firing C-level, changing the business model, entering new markets, M&A transactions, related-party transactions, and changes to the Gesellschaftsvertrag."
  },
  {
    "category": "Governance & Control",
    "difficulty": 2,
    "type": "scenario",
    "question": "A startup's Beirat has 5 seats: 2 founders, 2 investors, 1 independent. The company wants to hire a CFO at €200K (above the €150K Beirat approval threshold). One founder and both investors support it. One founder and the independent oppose. What happens?",
    "options": [
      "Blocked — requires unanimity",
      "Approved 3-2 — simple majority wins",
      "Goes to the Gesellschafterversammlung",
      "The CEO decides unilaterally"
    ],
    "correct": 1,
    "explanation": "Unless the Beirat rules specify otherwise, decisions are by simple majority. 3 votes for (1 founder + 2 investors) vs 2 votes against (1 founder + 1 independent). The hire is approved. This illustrates why Beirat composition matters — the investors effectively controlled this outcome.",
    "germanContext": "Beirat voting rules are defined in the Geschäftsordnung (rules of procedure). German startups should negotiate the voting mechanism (simple vs. qualified majority), quorum requirements, and chairman's casting vote carefully."
  },
  {
    "category": "Governance & Control",
    "difficulty": 2,
    "type": "true_false",
    "question": "In a German GmbH, the Geschäftsführer (CEO) can be dismissed by a simple majority of the Gesellschafterversammlung.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False by default. Under §38 GmbHG, dismissal of a Geschäftsführer requires a 75% majority vote, not a simple majority. However — and this is critical — the Gesellschaftsvertrag can modify this threshold. Many VC-backed companies include provisions allowing dismissal by simple majority or with investor consent.",
    "germanContext": "This is a heavily negotiated clause in German VC deals. Founders should insist on 'wichtiger Grund' (cause) requirements and negotiated severance packages. Some investors push for dismissal rights requiring only investor majority consent regardless of share percentage."
  },
  {
    "category": "Governance & Control",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is a 'Negativkatalog' in a German Beteiligungsvertrag?",
    "options": [
      "A list of negative company reviews",
      "The list of actions that require investor consent (essentially the protective provisions catalog)",
      "A list of reasons an investor can refuse to fund",
      "A list of prohibited business activities"
    ],
    "correct": 1,
    "explanation": "The Negativkatalog is the German term for the protective provisions list — a catalog of major decisions the company CANNOT take without investor approval. It's called 'negative' because it lists things the company is PROHIBITED from doing unilaterally.",
    "germanContext": "The GESSI standard template includes roughly 15-20 items in the Negativkatalog. Founders should push to keep this list short and thresholds high (e.g., debt approval threshold at €100K+ not €10K)."
  },
  {
    "category": "Governance & Control",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "An investor holds 25% of a GmbH but has negotiated a consent right over all new share issuances. The founder (75%) wants to do a new funding round. The investor refuses consent. What can the founder do?",
    "options": [
      "Issue shares anyway — they have 75% majority",
      "Nothing — the consent right is contractually binding regardless of share percentage",
      "Sue the investor for breach of fiduciary duty",
      "Convert the GmbH to an AG to bypass the restriction"
    ],
    "correct": 1,
    "explanation": "Contractual consent rights (Zustimmungsvorbehalte) are binding regardless of equity percentage. The 25% investor's consent right effectively gives them veto power over new funding. The founder's options are: negotiate with the investor, offer to buy their shares, or in extreme cases, argue the veto is being exercised in bad faith (Treuepflicht).",
    "germanContext": "This is the power of Zustimmungsvorbehalte in German GmbH law. Unlike voting rights (tied to share percentage), consent rights create absolute veto power. German courts generally uphold contractual consent rights unless exercised in clear bad faith."
  },
  {
    "category": "Governance & Control",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is 'information rights' (Informationsrechte) and why do investors negotiate for them?",
    "options": [
      "The right to appear in company press releases",
      "Contractual rights to receive regular financial reports, board materials, cap table updates, and access to key company information — enabling investors to monitor their investment",
      "The right to share company information publicly",
      "The right to access competitor data"
    ],
    "correct": 1,
    "explanation": "Information rights give investors ongoing visibility into company performance. Standard information packages include: monthly/quarterly financials, annual budgets, cap table updates, material litigation, and key business metrics. Without these, investors are blind to how their money is being used.",
    "germanContext": "German GmbH law provides limited statutory information rights for shareholders (§51a GmbHG). VC Beteiligungsverträge expand these significantly with detailed Informationsrechte clauses specifying exact reports, frequency, and format."
  },
  {
    "category": "Governance & Control",
    "difficulty": 3,
    "type": "scenario",
    "question": "Two founders (each 30%) and one VC (40%) in a GmbH. The founders disagree on product strategy. Founder A + VC want to pivot to B2B. Founder B wants to stay B2C. The Gesellschaftsvertrag requires Beirat approval for strategy changes, and the Beirat is split. How does this typically resolve?",
    "options": [
      "The VC casts the deciding vote as largest shareholder",
      "It depends on Beirat composition and voting rules — if the VC has a Beirat seat, they likely break the tie; if not, it goes to the Gesellschafterversammlung where VC + Founder A (70%) outvote Founder B",
      "Founder B's vote counts double as co-founder",
      "The company must dissolve"
    ],
    "correct": 1,
    "explanation": "This illustrates how governance structures determine company outcomes. The Beirat composition matters most for strategy decisions. If deadlocked, the Gesellschafterversammlung (where VC + Founder A have 70%) resolves it. Founder B is outvoted. This is why co-founder agreements and governance structures are critical.",
    "germanContext": "Co-founder disputes ('Gesellschafterstreit') are one of the most common and destructive problems in German startups. Having clear governance rules, deadlock resolution mechanisms, and potentially a mediator clause can prevent company-destroying stalemates."
  },
  {
    "category": "Valuation & Economics",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is 'pre-money valuation'?",
    "options": [
      "The company's value before it earns any revenue",
      "The value of the company BEFORE new investment money comes in",
      "The value of the company minus its debts",
      "The value of the founders' personal assets"
    ],
    "correct": 1,
    "explanation": "Pre-money valuation is what the company is worth immediately before new capital is invested. Post-money = Pre-money + New Investment. The investor's ownership = Investment / Post-money. Example: €8M pre + €2M investment = €10M post, investor owns 20%.",
    "germanContext": "In German: 'Pre-Money-Bewertung' or 'Bewertung vor Finanzierung'. This is the most discussed number in German term sheet negotiations, but it's actually less important than the full set of economic terms (preferences, participation, anti-dilution)."
  },
  {
    "category": "Valuation & Economics",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "Company raises €5M on a €15M pre-money. What is the post-money valuation and investor ownership?",
    "options": [
      "Post: €20M, Investor: 25%",
      "Post: €15M, Investor: 33%",
      "Post: €20M, Investor: 33%",
      "Post: €10M, Investor: 50%"
    ],
    "correct": 0,
    "explanation": "Post-money = Pre-money + Investment = €15M + €5M = €20M. Investor ownership = €5M / €20M = 25%. The existing shareholders (founders) are diluted from 100% to 75%.",
    "germanContext": "This basic calculation is the foundation of all German VC deal economics. Every Beteiligungsvertrag starts with this formula."
  },
  {
    "category": "Valuation & Economics",
    "difficulty": 2,
    "type": "scenario",
    "question": "Term sheet: '€3M at €12M pre-money, with 10% VSOP pool to be created pre-money.' What is the founders' effective pre-money valuation?",
    "options": [
      "€12M",
      "€10.8M — the pool comes from founders' share",
      "€15M",
      "€9M"
    ],
    "correct": 1,
    "explanation": "The option pool shuffle: the 10% VSOP pool is carved from the pre-money, diluting only founders. Effective founder pre-money: €12M × (1 - 0.10) = €10.8M. The investor's €3M buys into a €15M post-money, owning 20%. The pool (10%) + investor (20%) = 30% dilution to founders.",
    "germanContext": "Very common trick in German deals. Counter-strategy: negotiate for the pool to be created from the post-money, or reduce the pool size to match your actual 18-month hiring plan."
  },
  {
    "category": "Valuation & Economics",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is 'fully diluted' capitalization?",
    "options": [
      "The total shares if the company is dissolved",
      "ALL shares that could exist: outstanding shares + all options/warrants/convertibles that could convert into shares, even if not yet exercised or converted",
      "Only the shares currently outstanding",
      "Shares after maximum possible dilution from future rounds"
    ],
    "correct": 1,
    "explanation": "Fully diluted includes everything: issued common shares, preferred shares, outstanding stock options (vested AND unvested), warrants, convertible note shares, and VSOP allocations. This gives the true picture of the ownership pie.",
    "germanContext": "In German cap table management: 'voll verwässerte Kapitalisierung'. Always negotiate based on fully diluted numbers. A '20% stake' on a non-diluted basis might be only 15% fully diluted if there's a 25% option pool."
  },
  {
    "category": "Valuation & Economics",
    "difficulty": 1,
    "type": "true_false",
    "question": "A higher pre-money valuation is always better for founders.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False! A higher valuation with investor-friendly terms (participating preferred, aggressive anti-dilution, large option pool) can be WORSE than a lower valuation with clean terms (non-participating, standard anti-dilution, small pool). Always model exit scenarios, not just headline valuation.",
    "germanContext": "Classic German founder mistake: choosing the highest valuation offer without modeling the full economic impact. A €12M pre with 1x non-participating can be better than €15M pre with 1x participating."
  },
  {
    "category": "Valuation & Economics",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is the '20% ownership guideline' in venture capital?",
    "options": [
      "VCs must own exactly 20% of every company",
      "At Series A, VCs typically target 15-25% ownership (with 20% as a common benchmark), balancing meaningful ownership against leaving enough equity for founders and future rounds",
      "Founders must keep at least 20%",
      "20% is the maximum VC ownership allowed by law"
    ],
    "correct": 1,
    "explanation": "The 20% target is a heuristic. VCs need enough ownership to make their fund economics work if the company succeeds. Too little ownership (5%) won't move the needle even at a huge exit. Too much (40%+) demotivates founders and leaves no room for later investors.",
    "germanContext": "DACH Series A investments typically range from 15-25% ownership. HTGF seed investments are usually 15-20%. At each round, founders should ensure they retain enough equity (ideally 50%+ through Series A) to stay motivated."
  },
  {
    "category": "Valuation & Economics",
    "difficulty": 3,
    "type": "scenario",
    "question": "A company has raised:\n- Seed: €500K at €2M pre (20% dilution)\n- Series A: €3M at €12M pre (20% dilution)\n- Series B: €10M at €40M pre (20% dilution)\n\nAll 1x non-participating, pari passu. No VSOP. Founders owned 100% at start. What do founders own after Series B?",
    "options": [
      "40%",
      "51.2% (80% × 80% × 80%)",
      "60%",
      "45%"
    ],
    "correct": 1,
    "explanation": "Founders start at 100%. After Seed: 100% × 80% = 80%. After Series A: 80% × 80% = 64%. After Series B: 64% × 80% = 51.2%. Each 20% dilution compounds. This is why founders need to plan for multiple rounds of dilution.",
    "germanContext": "In practice, VSOP pools add further dilution. If there's a 10% VSOP pool at each round, founder dilution is even more severe. Model your cap table out to Series B before negotiating Seed terms."
  },
  {
    "category": "Valuation & Economics",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is 'down round protection' and when does it matter most?",
    "options": [
      "Insurance against stock market declines",
      "The combination of anti-dilution + preference terms that protect investors when the company raises at a lower valuation than the previous round",
      "Protection against employees leaving",
      "Protection against competitor lawsuits"
    ],
    "correct": 1,
    "explanation": "Down round protection is the umbrella term for anti-dilution mechanisms and preference structures that activate when a company's valuation drops. It matters most in economic downturns when many startups are forced to raise at lower valuations.",
    "germanContext": "2022-2023 saw significant down rounds in the German startup ecosystem. Companies like Gorillas, Sennder, and others faced painful anti-dilution adjustments. Understanding down round mechanics became critical survival knowledge for German founders."
  },
  {
    "category": "Valuation & Economics",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is dilution?",
    "options": [
      "When the company loses money",
      "The reduction in an existing shareholder's percentage ownership when new shares are issued to new investors",
      "When shares lose value",
      "When employees leave the company"
    ],
    "correct": 1,
    "explanation": "Dilution occurs when new shares are created (for a new funding round, employee options, etc.), reducing each existing shareholder's percentage of the total. If you own 50% of 1M shares and 500K new shares are created, you now own 50% of 1M = 500K shares, but 500K/1.5M = 33.3% of the total.",
    "germanContext": "In German: 'Verwässerung'. Important distinction: percentage dilution (your % goes down) vs. economic dilution (the VALUE of your shares goes down). In an up-round, you're percentage-diluted but economically richer."
  },
  {
    "category": "Valuation & Economics",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "What is the 'J-curve' in venture capital fund economics?",
    "options": [
      "A curved negotiation table used in VC meetings",
      "The typical pattern where a VC fund shows negative returns in early years (as investments are made and fees are paid) before turning positive as exits occur in later years",
      "A method of company valuation",
      "A type of liquidation preference structure"
    ],
    "correct": 1,
    "explanation": "The J-curve describes how fund performance looks over time: negative initially (fees + unrealized investments at cost), then curving upward as portfolio companies mature and generate exits. A typical VC fund takes 7-10 years to fully realize returns.",
    "germanContext": "Understanding the J-curve explains why German VCs sometimes push for exits at specific times — they may be nearing the end of their fund life and need to return capital to their LPs (investors in the VC fund itself)."
  },
  {
    "category": "Pre-emption & Pro-rata",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is a pro-rata right?",
    "options": [
      "The right to a proportional share of profits",
      "The right for existing investors to invest enough in a new round to MAINTAIN their current ownership percentage",
      "The right to vote proportionally to share ownership",
      "The right to proportional board representation"
    ],
    "correct": 1,
    "explanation": "Pro-rata rights let existing investors avoid dilution by investing their proportional share in new rounds. If you own 20% and the company raises €5M, your pro-rata right lets you invest €1M (20% of €5M) to maintain your 20% ownership.",
    "germanContext": "In German: 'Bezugsrecht' or 'Pro-rata-Recht'. Note: German GmbH law doesn't automatically grant Bezugsrechte (unlike §186 AktG for AGs), so they MUST be contractually agreed in the Beteiligungsvertrag."
  },
  {
    "category": "Pre-emption & Pro-rata",
    "difficulty": 1,
    "type": "true_false",
    "question": "If an investor has pro-rata rights but chooses not to exercise them, they will be diluted in the new round.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True. Pro-rata rights are an OPTION, not an obligation. If the investor declines to participate (perhaps because they've run out of fund capital, or they've lost confidence), they will be diluted along with everyone else. Not exercising pro-rata is a signal to other investors about the investor's confidence.",
    "germanContext": "In German VC, not exercising pro-rata is called 'Verzicht auf das Bezugsrecht'. Other investors watch this signal carefully — if a lead investor passes on their pro-rata, it raises questions about their confidence in the company."
  },
  {
    "category": "Pre-emption & Pro-rata",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is 'super pro-rata' and why is it controversial?",
    "options": [
      "Extra voting rights for large shareholders",
      "The right to invest MORE than your current ownership percentage in a new round — potentially increasing your stake at the expense of other shareholders",
      "A super-fast exercise period",
      "Extra dividends for preferred shareholders"
    ],
    "correct": 1,
    "explanation": "Super pro-rata lets an investor oversubscribe relative to their ownership. If they own 15% but exercise super pro-rata to invest 30% of the new round, they increase their stake disproportionately. This can dilute other investors and founders more than expected.",
    "germanContext": "'Überproportionales Bezugsrecht' in German. Relatively rare in standard DACH seed/Series A deals. The BAND template does NOT include super pro-rata as a default. Founders should resist this unless there's a compelling strategic reason."
  },
  {
    "category": "Pre-emption & Pro-rata",
    "difficulty": 2,
    "type": "scenario",
    "question": "Series A investor owns 20% and has pro-rata rights. Series B raises €10M at €40M pre. The investor wants to maintain their 20%. How much must they invest?",
    "options": [
      "€2M (20% of €10M)",
      "€10M",
      "€8M (20% of €40M)",
      "€2.5M"
    ],
    "correct": 0,
    "explanation": "Pro-rata = maintain ownership by investing proportionally in the new round. The investor's pro-rata share of the €10M round is 20% × €10M = €2M. If they invest €2M of the €10M, they maintain their 20% ownership post-round.",
    "germanContext": "In practice, the calculation can be more complex if there are other investors with pro-rata rights, option pool expansions, or convertible conversions happening simultaneously. Always work from the fully diluted cap table."
  },
  {
    "category": "Pre-emption & Pro-rata",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What happens when investors with pro-rata rights want to invest more than the total round size?",
    "options": [
      "The round automatically increases in size",
      "The company decides who gets to invest based on their discretion (within contractual limits)",
      "All pro-rata rights are voided",
      "The investors must negotiate among themselves"
    ],
    "correct": 1,
    "explanation": "This is called 'oversubscription.' When pro-rata demand exceeds the round size, the company typically has the right to allocate. Some contracts specify priority order (lead investor first, then existing investors by seniority). The company may also increase the round size to accommodate demand.",
    "germanContext": "In hot German deals, oversubscription is common. The Beteiligungsvertrag should specify the allocation priority ('Zuteilungsreihenfolge') to avoid disputes. Some include a pro-rata cap or allocation formula."
  },
  {
    "category": "Pre-emption & Pro-rata",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is the difference between pre-emptive rights and pro-rata rights?",
    "options": [
      "They're exactly the same thing",
      "Pre-emptive rights apply to new share ISSUANCES by the company; pro-rata rights specifically apply to new FUNDING ROUNDS and let investors maintain their ownership percentage",
      "Pre-emptive rights are stronger",
      "Pro-rata rights only apply to secondary sales"
    ],
    "correct": 1,
    "explanation": "While often used interchangeably, pre-emptive rights (Bezugsrecht) technically apply to any new share issuance, while pro-rata rights specifically relate to investment rounds. In practice, VC contracts typically bundle both into a comprehensive 'right to participate' clause.",
    "germanContext": "German law distinguishes between the statutory Bezugsrecht (which GmbH doesn't automatically provide, unlike AG) and contractual participation rights. Always ensure both primary (new issuance) and secondary (existing share transfers) rights are covered."
  },
  {
    "category": "Pre-emption & Pro-rata",
    "difficulty": 3,
    "type": "true_false",
    "question": "If a founder wants to sell some of their personal shares on a secondary market, existing investors' pro-rata rights are relevant.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Pro-rata rights apply to PRIMARY issuances (new shares by the company). For secondary sales (existing shares changing hands), the relevant mechanisms are ROFR (Right of First Refusal) and co-sale/tag-along rights — not pro-rata.",
    "germanContext": "Important German distinction: Bezugsrecht (new share issuance) vs Vorkaufsrecht (existing share transfers). Secondary sales of GmbH shares also require notarization (§15 GmbHG) and typically investor consent."
  },
  {
    "category": "Advanced Scenarios",
    "difficulty": 3,
    "type": "scenario",
    "question": "A company is running out of cash. Series A investor offers a bridge at 0.5x the Series A valuation (a massive down round). The founder has 45% ownership. Series A has full ratchet anti-dilution and 1x participating preferred. What is the founder likely facing?",
    "options": [
      "Mild dilution — maybe 5%",
      "Severe dilution: full ratchet reprices Series A → massive new shares → founder drops from 45% to potentially 15-20%, plus the participating preference reduces exit economics further",
      "No change — anti-dilution doesn't affect founders",
      "The company should just shut down"
    ],
    "correct": 1,
    "explanation": "A 50% down round with full ratchet is devastating. The entire Series A reprices to half the original price, effectively doubling the investor's share count. The founder's 45% could drop to 15-20% depending on round sizes. The participating preference further erodes founder economics in any exit.",
    "germanContext": "This nightmare scenario played out in multiple German startups during the 2022-2023 funding winter. Founders should: (1) always negotiate for weighted average over full ratchet, (2) model down-round scenarios before signing, (3) consider pay-to-play provisions."
  },
  {
    "category": "Advanced Scenarios",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is 'Reverse Vesting' and why do German VCs require it?",
    "options": [
      "Investors vest into their shares over time",
      "Founders own all shares from day 1 but agree to a repurchase right — if they leave early, the company/investors can buy back unvested shares at a nominal price",
      "A method of reducing employee compensation",
      "The reverse of an option exercise"
    ],
    "correct": 1,
    "explanation": "Reverse vesting ensures founder commitment. Unlike US-style forward vesting (where you EARN shares over time), reverse vesting means you ALREADY own the shares but they're subject to clawback. This is the standard German approach because founders already hold their GmbH shares from incorporation.",
    "germanContext": "'Rückübertragungspflicht' in German. Standard in virtually every German VC deal. The repurchase price for unvested shares is typically nominal value (Nennwert) or a formula-based price reflecting fair value at the time of departure."
  },
  {
    "category": "Advanced Scenarios",
    "difficulty": 3,
    "type": "scenario",
    "question": "A German startup is being acquired for €25M. The cap table is:\n- Founders: 50% common\n- Series A: €3M invested, 1x non-participating, 25%\n- VSOP pool: 10% (all vested)\n- Wandeldarlehen: €500K with €5M cap, unconverted\n- Angels: 15% common\n\nHow are proceeds likely distributed?",
    "options": [
      "Everyone gets their percentage × €25M",
      "Wandeldarlehen converts first (at €5M cap → ~10% dilution), then preference analysis, then waterfall distribution",
      "Founders get 50% of €25M = €12.5M",
      "Series A gets €3M, rest split by percentage"
    ],
    "correct": 1,
    "explanation": "Step 1: Wandeldarlehen converts at €5M cap → the €500K buys 10% effective equity, diluting everyone. Step 2: Series A chooses preference (€3M) or conversion. At their diluted percentage, conversion is worth more → they convert. Step 3: All converts to common, everyone gets their diluted percentage × €25M. The actual math depends on exact conversion mechanics.",
    "germanContext": "This multi-layered waterfall is typical of German startup exits. You need to model: (1) Wandeldarlehen conversion, (2) cap table recalculation, (3) preference analysis for each preferred class, (4) final distribution. Never do this in your head — use a spreadsheet."
  },
  {
    "category": "Advanced Scenarios",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is a 'recap' or 'recapitalization' in a distressed startup context?",
    "options": [
      "Simply raising more capital",
      "A restructuring of the company's entire capital structure — often wiping out or severely diluting existing shareholders to bring in new investment at a reset valuation",
      "Recalculating the company's revenue",
      "A type of financial audit"
    ],
    "correct": 1,
    "explanation": "A recap fundamentally restructures the cap table. In a distressed scenario, existing preferred investors might convert or reduce their preferences, common shareholders (founders) get heavily diluted, and new investors come in with a clean structure. It's essentially a 'restart' of the equity structure.",
    "germanContext": "Recaps require significant legal work in German GmbH structures: Gesellschafterversammlung with 75% approval, notarized Satzungsänderung, potential Kapitalherabsetzung (capital reduction). They're complex but sometimes the only path to saving a company."
  },
  {
    "category": "Advanced Scenarios",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "Why do some term sheets include 'founder shares' or 'sweet equity' provisions that give founders additional shares upon hitting specific milestones?",
    "options": [
      "To make the cap table more complex",
      "To realign incentives after heavy dilution — if founders have been diluted to <20%, milestone-based share grants can restore motivation by tying additional equity to specific value-creation events",
      "Because German law requires it",
      "To avoid paying founders a salary"
    ],
    "correct": 1,
    "explanation": "When founders are diluted below a motivation threshold (often ~15-20%), they may lose the drive to build a massive company since their upside is limited. Milestone shares (e.g., hitting €10M ARR, achieving profitability) can restore alignment by giving founders a chance to earn back meaningful equity.",
    "germanContext": "In German: 'Verwässerungsausgleich' or 'Milestone-Anteile'. Increasingly common in German Series B+ deals where founding teams have been heavily diluted through multiple rounds. The milestones must be specific, measurable, and time-bound."
  },
  {
    "category": "Advanced Scenarios",
    "difficulty": 2,
    "type": "true_false",
    "question": "In a German GmbH, a shareholder can be forced to sell their shares against their will even without a drag-along provision.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "explanation": "True, in extreme circumstances. German law provides for 'Einziehung' (compulsory redemption of shares under §34 GmbHG) and 'Ausschluss' (exclusion of a shareholder for important cause). Courts can also order share transfers in shareholder disputes. However, these are extraordinary measures requiring strong justification.",
    "germanContext": "§34 GmbHG allows the Gesellschaftsvertrag to include compulsory redemption provisions. The threshold is 'wichtiger Grund' (important cause). Courts have accepted reasons like: fundamental breach of shareholder duties, criminal conviction, and irreconcilable deadlock."
  },
  {
    "category": "Advanced Scenarios",
    "difficulty": 3,
    "type": "scenario",
    "question": "Two co-founders (50/50) have irreconcilable differences. Neither will buy out the other. The VC investor (30%, allocated from pool) is caught in the middle. What resolution mechanisms should have been in the original shareholder agreement?",
    "options": [
      "Nothing — co-founder disputes can't be prevented",
      "A 'Russian Roulette' or 'Texas Shootout' clause — forcing one party to either buy or sell at a stated price; mediation clause; deadlock resolution procedure; potentially a shoot-out with the VC as tiebreaker",
      "A clause automatically giving control to the older founder",
      "An automatic company dissolution clause"
    ],
    "correct": 1,
    "explanation": "Well-drafted shareholder agreements include deadlock resolution: (1) Mandatory mediation/arbitration, (2) Russian Roulette (one founder names a price; the other must buy at that price or sell at that price), (3) Texas Shootout (both submit sealed bids; highest bidder buys), (4) Put/call options. Without these, disputes can destroy companies.",
    "germanContext": "'Russian Roulette-Klausel' or 'Texanische Auktion' in German shareholder agreements. German courts have upheld these mechanisms when properly drafted. The BGH has ruled that shoot-out clauses must be fair and not unconscionable (sittenwidrig)."
  },
  {
    "category": "Advanced Scenarios",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is 'bridge financing' and when is it typically used?",
    "options": [
      "Financing to build physical bridges",
      "Short-term financing to bridge the gap between the current state and the next major round, often structured as convertible notes/Wandeldarlehen to avoid setting a new valuation",
      "A type of government grant",
      "Financing from bridge loan banks"
    ],
    "correct": 1,
    "explanation": "Bridge financing provides runway when a company needs more time to hit milestones for their next priced round. It's typically from existing investors, structured as convertibles to defer the valuation question. Bridge rounds signal the company isn't ready for a full round yet.",
    "germanContext": "Wandeldarlehen from existing investors is the standard German bridge structure. Key terms to watch: the cap (usually at or near the last round), discount, maturity, and whether the bridge converts mandatorily into the next round or at the investor's option."
  },
  {
    "category": "Advanced Scenarios",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "What is a 'side letter' and why should founders be cautious about them?",
    "options": [
      "A letter sent to the side of the main contract",
      "A separate agreement giving specific investors special terms NOT in the main shareholder agreement — potentially creating hidden preferential treatment",
      "A letter of recommendation",
      "A secondary business plan"
    ],
    "correct": 1,
    "explanation": "Side letters are private agreements between the company and a specific investor granting special terms: extra information rights, board observer rights, additional anti-dilution, special consent rights, etc. They're dangerous because other investors may not know about them, creating hidden obligations and preferential treatment.",
    "germanContext": "In German VC: 'Nebenabrede' or 'Side Letter'. German law requires disclosure of all side agreements to the notary during Beurkundung. Hidden side letters can be legally problematic under German GmbH law if they contradict the notarized Gesellschaftsvertrag."
  },
  {
    "category": "Fund Mechanics",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is the typical structure of a VC fund?",
    "options": [
      "A public stock exchange-listed company",
      "A Limited Partnership (LP structure) where LPs (investors) provide capital and a GP (fund manager) makes investment decisions",
      "A non-profit organization",
      "A government agency"
    ],
    "correct": 1,
    "explanation": "Most VC funds are structured as limited partnerships. LPs (pension funds, endowments, family offices, etc.) commit capital. The GP (the VC firm) manages the fund, makes investment decisions, and is personally liable. LPs have limited liability and limited involvement in decisions.",
    "germanContext": "German VC funds are typically structured as GmbH & Co. KG — a limited partnership where the general partner is a GmbH (limiting GP liability). The KG structure provides the tax transparency that LPs require."
  },
  {
    "category": "Fund Mechanics",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is 'carried interest' (carry)?",
    "options": [
      "Interest earned on a savings account",
      "The GP's share of the fund's profits — typically 20% of returns above a hurdle rate, which is the primary financial incentive for VC partners",
      "Interest on bridge loans",
      "The cost of carrying inventory"
    ],
    "correct": 1,
    "explanation": "Carry is how VCs make real money. After returning all invested capital to LPs (often with a hurdle rate of 6-8%), the GP takes 20% of any additional profits. On a €100M fund that returns €300M, the GP's carry would be roughly 20% × (€300M - €100M) = €40M.",
    "germanContext": "In German: 'Gewinnbeteiligung' or 'Carried Interest'. German tax treatment of carry has been debated — it can be taxed as income or capital gains depending on structure. The BMF (Bundesfinanzministerium) has issued specific guidance."
  },
  {
    "category": "Fund Mechanics",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is a '2 and 20' fee structure?",
    "options": [
      "2% of the fund returned after 20 months",
      "2% annual management fee on committed capital + 20% carried interest on profits — the standard VC compensation model",
      "2 meetings per month and 20 hours of support",
      "€2M minimum investment with 20% discount"
    ],
    "correct": 1,
    "explanation": "'2 and 20' means: the GP charges a 2% annual management fee (on committed or invested capital) to cover salaries and operations, PLUS 20% carry on fund profits. A €100M fund generates €2M/year in fees regardless of performance, plus 20% of profits if the fund succeeds.",
    "germanContext": "German VC funds typically follow this structure, though some newer managers offer reduced fees (1.5-2%) or modified carry structures. Public co-investors like HTGF have different economics."
  },
  {
    "category": "Fund Mechanics",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What does it mean when a VC says they're 'raising a new fund'?",
    "options": [
      "They're increasing the size of their current fund",
      "They're creating a new LP structure and securing commitments from LPs to invest in a fresh pool of capital — essentially starting a new investment vehicle from scratch",
      "They're fundraising for one of their portfolio companies",
      "They're increasing management fees"
    ],
    "correct": 1,
    "explanation": "VCs periodically raise new funds (Fund I, Fund II, Fund III, etc.). Each fund has a fixed life (typically 10 years), investment period (years 1-5), and harvest period (years 6-10). Raising a new fund involves pitching LPs, negotiating terms, and securing capital commitments.",
    "germanContext": "Major German VCs like Earlybird, HV Capital, and Project A typically raise new funds every 3-4 years. Fund sizes in the German market range from €50M (seed) to €500M+ (growth). New fund announcements signal the VC's ability to deploy capital."
  },
  {
    "category": "Fund Mechanics",
    "difficulty": 2,
    "type": "true_false",
    "question": "A VC can invest in any company they want, regardless of the fund's stated strategy.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. VC funds have a Limited Partnership Agreement (LPA) that defines the investment mandate: stage (seed, Series A, etc.), sector (tech, biotech, etc.), geography, check size, and concentration limits. Deviating from the mandate requires LP consent or advisory committee approval. LPs invest based on this mandate.",
    "germanContext": "German VC fund mandates are defined in the Gesellschaftsvertrag/LPA of the KG structure. BaFin (German financial regulator) may also impose constraints depending on whether the fund is regulated under KAGB (Kapitalanlagegesetzbuch)."
  },
  {
    "category": "Fund Mechanics",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is a 'capital call' and how does it work?",
    "options": [
      "A phone call asking for money",
      "When the GP requests LPs to transfer a portion of their committed capital — LPs commit to a total amount but only transfer money as the GP identifies investments",
      "A call option on the company's capital",
      "A conference call about company finances"
    ],
    "correct": 1,
    "explanation": "LPs don't transfer all their money upfront. They commit a total amount (e.g., €10M) and the GP draws it down over time through capital calls. The GP sends a notice ('capital call' or 'drawdown notice') when money is needed for a new investment or fees. LPs typically have 10-20 business days to wire funds.",
    "germanContext": "In German: 'Kapitalabruf'. The timing and frequency of capital calls is governed by the LPA. German institutional LPs (insurance companies, pension funds) plan their liquidity around expected capital call schedules."
  },
  {
    "category": "Fund Mechanics",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is 'DPI' and why do LPs care about it?",
    "options": [
      "Dots Per Inch — image resolution",
      "Distributions to Paid-In capital — the ratio of actual cash returned to LPs versus what they invested. A DPI of 1.0x means LPs got their money back; above 1.0x means they're in profit",
      "Daily Performance Indicator",
      "Deal Pipeline Index"
    ],
    "correct": 1,
    "explanation": "DPI is the only metric that measures REAL, REALIZED returns. Unlike TVPI (which includes unrealized gains), DPI only counts actual cash distributions. LPs ultimately care about DPI because paper returns don't pay pensions. A good fund targets 2-3x DPI or higher.",
    "germanContext": "German institutional LPs increasingly focus on DPI over TVPI when evaluating fund managers for re-ups. In the post-2022 environment, DPI became the critical metric as paper valuations (TVPI) proved unreliable."
  },
  {
    "category": "Fund Mechanics",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "Why does the fund lifecycle create pressure for VCs to push for exits at certain times?",
    "options": [
      "VCs get bored after a few years",
      "A standard fund has a 10-year life with possible 1-2 year extensions. If portfolio companies haven't exited by year 8-10, the GP faces pressure to sell or distribute shares to return capital to LPs before the fund closes",
      "There's no time pressure",
      "German law requires exits within 5 years"
    ],
    "correct": 1,
    "explanation": "Fund lifecycle creates real exit pressure. LPs committed capital expecting returns within the fund's lifetime. A GP managing Fund II and trying to raise Fund III needs to show DPI from Fund I. This can lead to suboptimal timing — pushing for exits when the company might benefit from more time.",
    "germanContext": "Understanding fund lifecycle explains a lot of VC behavior in the German market. When an investor pushes for an exit, check when their fund closes. A fund nearing year 9-10 has different motivations than a fresh Fund I investor."
  },
  {
    "category": "Fund Mechanics",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is a 'portfolio company' from the VC's perspective?",
    "options": [
      "A company that makes portfolios",
      "A company in which the VC fund has made an investment — part of the fund's collection ('portfolio') of investments",
      "A company that provides financial services",
      "Any company on the stock market"
    ],
    "correct": 1,
    "explanation": "A portfolio company is any company in which the VC fund holds equity. A typical fund might have 15-30 portfolio companies. The GP's job is to support all portfolio companies while managing the overall portfolio to maximize returns for LPs.",
    "germanContext": "German VCs typically target 15-25 investments per fund (seed funds may do 30-40). Portfolio construction strategy — the mix of stages, sectors, and check sizes — is a key differentiator between German VC firms."
  },
  {
    "category": "Fund Mechanics",
    "difficulty": 3,
    "type": "scenario",
    "question": "A €100M VC fund has invested €80M across 20 companies over 5 years. Three companies have exited, returning €120M. The fund has €20M in remaining portfolio value (unrealized). What are the key fund metrics?",
    "options": [
      "DPI: 1.2x, TVPI: 1.4x, remaining portfolio represents upside potential",
      "DPI: 0.8x, TVPI: 1.0x",
      "DPI: 1.2x, TVPI: 1.2x",
      "The fund is underperforming — 20 companies should have returned more"
    ],
    "correct": 0,
    "explanation": "DPI = €120M distributed / €100M paid in = 1.2x (LPs have gotten their money back plus 20% profit in cash). TVPI = (€120M distributed + €20M unrealized) / €100M = 1.4x (total value including paper gains). The fund has already returned capital and the remaining portfolio is pure upside.",
    "germanContext": "For German VC funds, a 1.2x DPI at the halfway point is considered solid. Top-quartile DACH funds target 2.5-3x+ net TVPI over the full fund life. The GP would now begin earning carry on the profits above the hurdle rate."
  },
  {
    "category": "Negotiation Tactics",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is a 'term sheet' and is it legally binding?",
    "options": [
      "A fully binding legal contract",
      "A document outlining the key terms of a proposed investment — generally NOT legally binding except for specific clauses like exclusivity and confidentiality",
      "A type of financial spreadsheet",
      "A government registration form"
    ],
    "correct": 1,
    "explanation": "A term sheet is a letter of intent outlining the proposed deal terms. Most clauses are non-binding — they set the framework for the definitive legal agreements. However, certain clauses are typically binding: exclusivity/no-shop, confidentiality, and sometimes cost-bearing provisions.",
    "germanContext": "In German: 'Term Sheet' or 'Eckpunktepapier'. Under German law, the non-binding nature must be explicitly stated ('unverbindlich'). Some German courts have interpreted detailed term sheets as binding pre-contractual agreements (Vorvertrag) if they appear sufficiently definitive."
  },
  {
    "category": "Negotiation Tactics",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is 'BATNA' and why is it the most important concept in negotiation?",
    "options": [
      "A type of legal clause",
      "Best Alternative To a Negotiated Agreement — your backup plan if this deal falls through. The stronger your BATNA (e.g., another term sheet), the more leverage you have",
      "A German legal term",
      "A financial modeling technique"
    ],
    "correct": 1,
    "explanation": "BATNA determines your negotiation power. If you have two competing term sheets, each investor knows you can walk away. If you have no alternatives, the investor knows you MUST accept their terms. Always try to run a competitive process to strengthen your BATNA.",
    "germanContext": "In the German market, running a competitive process is harder due to the smaller VC ecosystem. But even having one warm alternative can dramatically improve your negotiating position. German founders should build relationships with multiple VCs before needing capital."
  },
  {
    "category": "Negotiation Tactics",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "An investor says 'this is our standard term sheet — we never change it.' What should the founder do?",
    "options": [
      "Accept it immediately — they must know best",
      "Recognize this as a negotiation tactic and negotiate anyway. Every term sheet is negotiable. 'Standard' terms are a starting position, not a final offer",
      "Walk away from the deal",
      "Hire a lawyer to sue them"
    ],
    "correct": 1,
    "explanation": "'Standard terms' is one of the most common negotiation anchoring tactics. Every VC knows their terms are negotiable. The claim of non-negotiability is designed to prevent you from even trying. Always push back on terms that don't work for you — the worst they can say is no.",
    "germanContext": "German investors (including HTGF, which does have relatively standardized terms) will negotiate on key economics. Even HTGF adjusts valuation, board seats, and certain protective provisions. The only truly non-negotiable items might be regulatory requirements."
  },
  {
    "category": "Negotiation Tactics",
    "difficulty": 1,
    "type": "true_false",
    "question": "Founders should always negotiate for the highest possible valuation.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. An unrealistically high valuation creates a 'valuation trap' — the company must grow into that valuation before the next round, or face a devastating down round. A fair valuation with clean terms and the right investor is almost always better than an inflated valuation with aggressive terms or the wrong partner.",
    "germanContext": "German startup history is full of companies that raised at 2021-era inflated valuations and then faced painful down rounds in 2022-2023. A sustainable valuation ('nachhaltige Bewertung') with room to grow is the wise German founder's approach."
  },
  {
    "category": "Negotiation Tactics",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is an 'exploding term sheet' and how should you handle it?",
    "options": [
      "A term sheet that self-destructs",
      "A term sheet with a very short acceptance deadline (24-48 hours) designed to pressure founders into accepting before they can evaluate alternatives",
      "A term sheet with extremely aggressive terms",
      "A term sheet for a company about to IPO"
    ],
    "correct": 1,
    "explanation": "Exploding term sheets are a pressure tactic. The investor sets a short deadline to prevent you from shopping the deal. Response strategies: (1) Ask for more time (1-2 weeks is reasonable), (2) Acknowledge the deadline but request a brief extension for legal review, (3) If they refuse any extension, consider whether this is the right partner.",
    "germanContext": "Less common in the German market than in the US, but some international VCs investing in DACH startups use this tactic. German founders should insist on at least 1-2 weeks for legal review — rushing the Beurkundung (notarization) process is impractical anyway."
  },
  {
    "category": "Negotiation Tactics",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "When should founders involve a lawyer in the fundraising process?",
    "options": [
      "Only after signing the term sheet",
      "From the very beginning — have a specialized VC lawyer review every term sheet before you respond, and definitely before signing anything. The cost is minimal compared to the economic impact of bad terms",
      "Lawyers are unnecessary for fundraising",
      "Only if there's a lawsuit"
    ],
    "correct": 1,
    "explanation": "A specialized VC lawyer should review term sheets BEFORE you sign. Bad terms can cost millions at exit. A good lawyer will: spot unusual clauses, benchmark terms against market, suggest counter-proposals, and protect your interests in the definitive documents. Budget €10-30K for a round — worth every cent.",
    "germanContext": "In Germany, the Beurkundungspflicht (notarization requirement) for GmbH changes means a Notar is always involved. But the Notar is neutral — founders need their OWN specialized VC lawyer. Leading German VC law firms include LUTZ Abel, Orrick, CMS, and Osborne Clarke."
  },
  {
    "category": "Negotiation Tactics",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is the 'anchor effect' in valuation negotiations?",
    "options": [
      "Dropping an anchor in the sea",
      "The first number mentioned tends to set the range for the entire negotiation. If the VC opens with '€8M pre-money,' subsequent discussion orbits around €8M. If the founder opens with '€15M pre-money,' the orbit shifts upward",
      "A technique for securing boats",
      "A method of calculating company value"
    ],
    "correct": 1,
    "explanation": "The anchor effect is one of the strongest cognitive biases in negotiation. Whoever states a number first sets the anchor. Founders should prepare a well-justified valuation range BEFORE meetings and try to anchor high (but credibly). A good anchor is backed by comparable transactions, metrics, and a clear narrative.",
    "germanContext": "In the German market, valuations are often discussed in terms of revenue multiples, comparable recent DACH deals, or fund-specific frameworks (HTGF has published guidance on valuation expectations at different stages). Use German-market comparables to support your anchor."
  },
  {
    "category": "Negotiation Tactics",
    "difficulty": 3,
    "type": "scenario",
    "question": "You have a term sheet from VC A at €10M pre with aggressive terms (1.5x participating, full ratchet). VC B is interested but hasn't made an offer. How do you play this?",
    "options": [
      "Accept VC A immediately",
      "Tell VC B you have a term sheet and set a clear timeline (1-2 weeks) for them to submit a competing offer. Use the competitive dynamic to improve terms from both parties without disclosing specific terms",
      "Show VC A's term sheet to VC B",
      "Reject VC A and hope VC B comes through"
    ],
    "correct": 1,
    "explanation": "Creating competitive tension is the founder's strongest negotiation tool. Tell VC B you have a term sheet (this is expected and acceptable). Give them a clear deadline. You can share that you have an offer without sharing the exact terms. The existence of competition often transforms aggressive terms into fair ones.",
    "germanContext": "In the smaller German VC market, investors often know each other. Running a competitive process requires discretion. Don't play investors against each other dishonestly — the German VC community is tight-knit and reputation matters enormously."
  },
  {
    "category": "Negotiation Tactics",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What should founders negotiate BESIDES valuation?",
    "options": [
      "Nothing — valuation is the only thing that matters",
      "Board composition, protective provisions, anti-dilution mechanism, liquidation preference structure, VSOP pool size, vesting terms, information rights, and founder protections — these 'non-price terms' can have MORE economic impact than valuation",
      "Just the investment amount",
      "Only the timeline"
    ],
    "correct": 1,
    "explanation": "Experienced founders negotiate the full term sheet, not just the headline number. A higher valuation with aggressive terms (participating preferred, full ratchet, excessive protective provisions) can result in LESS money for founders than a lower valuation with clean terms.",
    "germanContext": "German founders often focus exclusively on Bewertung (valuation) and miss critical terms. Key non-price terms to negotiate in German deals: Erlösvorzug type, Verwässerungsschutz mechanism, Beirat composition, Negativkatalog scope, and VSOP pool size."
  },
  {
    "category": "Negotiation Tactics",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What does 'closing' mean in a VC deal?",
    "options": [
      "Closing the company",
      "The final step where all legal documents are signed, shares are issued, and money is transferred — the deal is officially complete",
      "Closing the negotiation",
      "Closing the term sheet"
    ],
    "correct": 1,
    "explanation": "Closing is when the deal becomes real. In a German GmbH, this involves: signing all definitive agreements, notarizing the Gesellschaftsvertrag amendment and share issuance (Beurkundung), registering changes with the Handelsregister, and wire transfer of investment funds.",
    "germanContext": "German closings are more complex than US closings due to the Beurkundungspflicht. Timeline from signed term sheet to closing: typically 4-8 weeks for early-stage, 8-16 weeks for later-stage. The notarization appointment must be coordinated among all parties — don't underestimate scheduling logistics."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is 'capped participation' and why is it a compromise?",
    "options": [
      "A limit on how many investors can participate in a round",
      "A cap on the total return from participating preferred — once the investor reaches the cap (e.g., 3x), they convert to common, limiting the double-dip",
      "A cap on management salaries",
      "A limit on the number of liquidation events"
    ],
    "correct": 1,
    "explanation": "Capped participation limits the double-dip. The investor gets preference + participation until total returns hit the cap, then converts to common. This addresses VC's concern about modest exits while protecting founders at large exits.",
    "germanContext": "A practical DACH compromise when investors demand participation. Typical cap: 2-4x the investment amount."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 3,
    "type": "scenario",
    "question": "Company sells for €8M. Cap table: Series A invested €5M with 1x participating preferred, owns 40%. Founders own 60%. Calculate founder proceeds.",
    "options": [
      "€3M",
      "€1.8M (€8M - €5M preference - 40% × €3M)",
      "€4.8M",
      "€0 — preference exceeds sale price"
    ],
    "correct": 1,
    "explanation": "Series A gets €5M preference first. Remaining: €8M - €5M = €3M. Series A then participates: 40% × €3M = €1.2M. Total to Series A: €6.2M. Founders get: €8M - €6.2M = €1.8M. Participating preferred devastates founders in modest exits.",
    "germanContext": "This scenario illustrates why German founders should resist participating preferred. In a modest exit, the double-dip can take the majority of proceeds from founders."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is a 'deemed liquidation event' list and why does it matter?",
    "options": [
      "A list of events where the company loses money",
      "The specific events that trigger liquidation preferences — typically M&A, merger, asset sale, and change of control. If an event isn't on the list, preferences don't apply",
      "A government list of failed companies",
      "A list of stock market crashes"
    ],
    "correct": 1,
    "explanation": "The DLE list defines exactly when preferences kick in. Founders should negotiate this carefully — overly broad lists can trigger preferences in operational transactions that aren't truly exits.",
    "germanContext": "Key German additions to the DLE list: 'Kontrollwechsel' threshold definition (>50% vs >75%?), whether asset transfers to subsidiaries count, and whether management buyouts are included."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is a 'preference overhang' and why does it kill deals?",
    "options": [
      "When preferences are too high compared to the likely exit value, making it economically irrational for common shareholders (founders/employees) to support a sale — since they'd get little to nothing",
      "When investors have more shares than founders",
      "When the company has too much debt",
      "When the board has too many members"
    ],
    "correct": 0,
    "explanation": "If total liquidation preferences exceed likely exit values, founders and employees have no incentive to work toward an exit — they'd get nothing. This misalignment can prevent good deals from happening and demotivate the team.",
    "germanContext": "Preference overhang became a serious problem in the German market during the 2022-2023 downturn. Companies with stacked 2x preferences from multiple rounds found that management had no exit incentive. The solution: management carve-outs or preference restructuring."
  },
  {
    "category": "Liquidation Preferences",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "What is the relationship between liquidation preference and 'as-converted' basis?",
    "options": [
      "They're the same thing",
      "'As-converted' means calculating what preferred shares would be worth IF converted to common (ignoring the preference). Investors compare this with their preference amount to decide which is more valuable at exit",
      "As-converted is only relevant for employees",
      "As-converted only applies at IPO"
    ],
    "correct": 1,
    "explanation": "The as-converted calculation is central to non-participating preferred: Preference amount vs (Pro-rata % × Total Proceeds). Whichever is higher wins. For participating preferred, the investor gets BOTH.",
    "germanContext": "In German waterfall analysis: compare the 'Erlösvorzug' (preference) with the 'Wandlungswert' (conversion value). This comparison is done independently by each preferred investor."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is 'weighted average' anti-dilution trying to achieve?",
    "options": [
      "An average of all share prices ever paid",
      "A fair middle ground between full protection and no protection — adjusting the conversion price based on how many new shares are issued at the lower price AND what the lower price is",
      "A weighted voting system",
      "An average of employee salaries"
    ],
    "correct": 1,
    "explanation": "Weighted average considers BOTH the price drop AND the magnitude of the down round. A small down round (few shares at slightly lower price) causes a minor adjustment. A massive down round causes a major adjustment. This is fairer than full ratchet, which ignores magnitude.",
    "germanContext": "The weighted average formula in German Beteiligungsverträge: Neuer Preis = Alter Preis × (Alte Anteile + Neues Geld/Alter Preis) / (Alte Anteile + Neue Anteile). Verify the exact formula in every deal."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 3,
    "type": "true_false",
    "question": "If a company does an up-round after a down-round, the anti-dilution adjustment from the down-round is reversed.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Anti-dilution adjustments are permanent and one-directional. Once triggered, the lower conversion price remains even if the company subsequently raises at a higher valuation. There's no 'snap-back' provision in standard anti-dilution clauses.",
    "germanContext": "Some German founders try to negotiate 'Rückstellungsklauseln' (snap-back clauses) that reverse anti-dilution in subsequent up-rounds. These are extremely rare but worth trying if you accept weighted average anti-dilution."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "A company is about to do a down round. What can founders do to minimize the impact of anti-dilution?",
    "options": [
      "Nothing — anti-dilution is automatic",
      "Negotiate a waiver with the protected investor, offer them additional board seats or pro-rata allocation in exchange for waiving anti-dilution, or structure the round as a convertible to delay triggering",
      "Simply don't do a down round",
      "Ask the government for help"
    ],
    "correct": 1,
    "explanation": "Anti-dilution waivers are negotiable. Investors may waive anti-dilution in exchange for: additional board seats, expanded protective provisions, increased pro-rata rights, or simply to maintain a good relationship. Structuring as a Wandeldarlehen can also delay the trigger.",
    "germanContext": "In the German market, experienced founders negotiate anti-dilution waivers as part of the overall down-round negotiation package. The waiver must be documented in a notarized Gesellschafterbeschluss."
  },
  {
    "category": "Anti-Dilution",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "Does anti-dilution protection apply to common shareholders (founders)?",
    "options": [
      "Yes — all shareholders are protected equally",
      "No — anti-dilution is a preferred share feature. Common shareholders (founders, employees) bear the dilution cost when anti-dilution is triggered",
      "Only if founders specifically negotiate for it",
      "It depends on the company's revenue"
    ],
    "correct": 1,
    "explanation": "Anti-dilution is exclusively a preferred share right. When it triggers, protected investors get more shares (or lower conversion prices), and this ADDITIONAL dilution falls entirely on common shareholders — typically founders and employees.",
    "germanContext": "This asymmetry is critical in German VC deals. VSOP holders are indirectly affected too — since VSOPs are calculated on the cap table, anti-dilution adjustments that dilute founders also dilute VSOP economic value."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is a 'cliff' in vesting?",
    "options": [
      "A dangerous edge on a mountain",
      "A minimum service period before ANY equity vests — typically 12 months. If the employee leaves before the cliff, they get nothing",
      "A type of share class",
      "A performance benchmark"
    ],
    "correct": 1,
    "explanation": "The cliff ensures minimum commitment. In a standard 4-year/1-year cliff schedule: 0 months = 0 vested, 11 months = 0 vested, 12 months = 25% vests immediately (the cliff), 13+ months = vesting continues monthly/quarterly.",
    "germanContext": "In German VSOPs: the 'Sperrfrist' or 'Klippe'. Standard DACH practice: 12-month cliff. Some companies negotiate a 6-month cliff for very senior hires. The cliff protects against short-term hires walking away with equity."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 3,
    "type": "scenario",
    "question": "A startup's VSOP pool is 10%. After two rounds of funding, the cap table is: Founders 55%, Series A 25%, Series B 20%. The VSOP is calculated on fully diluted capital. An employee has 0.5% VSOP, fully vested. Company exits for €40M. Series A and B both have 1x non-participating preferences (€3M and €8M respectively). Both investors convert. What does the employee receive?",
    "options": [
      "€200K (0.5% of €40M)",
      "€145K (0.5% of post-preference amount)",
      "€200K — since both investors convert, VSOP gets full percentage of total",
      "€0 — VSOP holders don't participate in exits"
    ],
    "correct": 2,
    "explanation": "Both investors convert to common (non-participating preferences are lower than conversion value). So all equity is effectively common. The VSOP holder gets 0.5% × €40M = €200K. When investors convert, the VSOP holder benefits because there's no preference deduction.",
    "germanContext": "This outcome depends critically on the VSOP agreement's waterfall reference. Verify whether the VSOP references 'proceeds after preferences' or 'as if converted to common'. The latter is more employee-friendly."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is a 'phantom stock plan' and how does it differ from a VSOP?",
    "options": [
      "They're identical",
      "A phantom stock plan grants units that track share value for cash payout purposes, typically without conversion rights. A VSOP in Germany is functionally similar but specifically structured for the German legal/tax framework",
      "Phantom stock is real equity; VSOP is virtual",
      "Phantom stock is only for US companies"
    ],
    "correct": 1,
    "explanation": "Both are 'virtual' equity mechanisms. 'Phantom stock' is the generic international term. 'VSOP' is the German-specific implementation, designed around GmbH law constraints, German tax rules, and the notarization requirement.",
    "germanContext": "The distinction matters for international companies with German employees. A US-style phantom stock plan may not be optimized for German tax treatment under §19a EStG. Always adapt to the German VSOP structure."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 2,
    "type": "true_false",
    "question": "VSOP holders in Germany can demand to see the company's financial statements.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False by default. Unlike real shareholders who have statutory information rights under §51a GmbHG, VSOP holders have NO statutory rights to company information. They only have rights explicitly granted in their VSOP agreement. Some well-drafted VSOPs include contractual information rights, but many don't.",
    "germanContext": "This is a significant disadvantage of German VSOPs vs real equity. Forward-thinking German startups are beginning to include annual information packages for VSOP holders — including valuation updates, cap table snapshots, and key financial metrics."
  },
  {
    "category": "ESOP & VSOP",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "The founder wants to give a new CTO 2% equity. The VSOP pool is only 1.5% remaining. What options exist?",
    "options": [
      "Give the CTO only 1.5%",
      "Expand the VSOP pool — which requires Gesellschafterversammlung approval and will dilute all existing shareholders, or grant 1.5% VSOP + negotiate 0.5% real equity (requiring notarization)",
      "Just promise the extra 0.5% informally",
      "Issue new shares without shareholder approval"
    ],
    "correct": 1,
    "explanation": "Expanding the pool requires shareholder approval and dilutes everyone. The mix of VSOP + real equity is possible but complex (real equity needs notarization). The founder should also consider whether the investor consent clauses (Zustimmungsvorbehalte) require investor approval for pool expansion.",
    "germanContext": "Pool expansion is a common friction point in German startups. Best practice: size the initial pool for 18-24 months of key hires, then negotiate pool expansion terms in the investment agreement (including who bears the dilution)."
  },
  {
    "category": "Governance & Control",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is a 'Geschäftsordnung' in a German startup?",
    "options": [
      "A business license",
      "Rules of procedure for the Geschäftsführer (CEO) — defining what the CEO can do autonomously vs what requires Beirat/shareholder approval, spending limits, hiring thresholds, and reporting obligations",
      "A type of insurance policy",
      "The company's marketing strategy"
    ],
    "correct": 1,
    "explanation": "The Geschäftsordnung is a critical governance document that sets guardrails for management. It typically specifies: spending authority limits, matters requiring prior approval, reporting frequency, conflict of interest rules, and day-to-day operational boundaries.",
    "germanContext": "In German GmbH law, the Gesellschafterversammlung can issue instructions (Weisungen) to the Geschäftsführer at any time. The Geschäftsordnung formalizes these boundaries so they don't need to be negotiated case-by-case."
  },
  {
    "category": "Governance & Control",
    "difficulty": 1,
    "type": "true_false",
    "question": "In a German GmbH, the CEO (Geschäftsführer) is an employee of the company.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "It's complicated but generally False. A Geschäftsführer has an 'organ relationship' (Organstellung) with the GmbH which is separate from any employment contract. They can be both an organ AND an employee, but the organ role is governed by GmbH law, not labor law. This affects termination rights significantly.",
    "germanContext": "The distinction between Organstellung and Dienstvertrag is critical. A Geschäftsführer can be dismissed as organ by the Gesellschafterversammlung, but their employment contract (Dienstvertrag) may continue, requiring separate termination and potentially severance payments (Abfindung)."
  },
  {
    "category": "Governance & Control",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "What is a 'Prokura' and why do VCs care about it?",
    "options": [
      "A type of preferred share",
      "A special German commercial power of attorney (§48 HGB) that gives the holder extremely broad authority to act on behalf of the company — including signing contracts, hiring, and binding the company legally",
      "A government registration",
      "A type of audit"
    ],
    "correct": 1,
    "explanation": "Prokura is one of the broadest forms of commercial authority under German law. A Prokurist can do almost anything except sell the company or real estate. VCs want control over who receives Prokura because it effectively creates a second CEO in terms of binding authority.",
    "germanContext": "Granting Prokura is almost always in the Negativkatalog (requires investor consent). VCs want to prevent founders from giving broad commercial authority to people outside the agreed management structure. Prokura must be registered in the Handelsregister."
  },
  {
    "category": "Convertible Instruments",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is a 'conversion discount' on a convertible note?",
    "options": [
      "A discount on the company's products",
      "A percentage discount on the next round's share price — rewarding the convertible investor for taking earlier risk. A 20% discount means they convert at 80% of the Series A price",
      "A discount on legal fees",
      "A reduction in interest rate"
    ],
    "correct": 1,
    "explanation": "The discount rewards early risk. If Series A prices shares at €10/share with a 20% discount, the convertible holder converts at €8/share — getting more shares per dollar invested. Combined with a cap, the investor gets whichever produces the lower (better) price.",
    "germanContext": "Standard DACH Wandeldarlehen discount: 15-25%, with 20% being most common. Some investors negotiate 'escalating discounts' that increase over time (e.g., 15% in months 1-12, 20% in months 13-18, 25% after month 18)."
  },
  {
    "category": "Convertible Instruments",
    "difficulty": 3,
    "type": "scenario",
    "question": "A startup has a €500K Wandeldarlehen at 5% annual interest, 24-month maturity, €6M cap, 20% discount. 18 months later, the Series A comes at €10M pre-money. Calculate the conversion.",
    "options": [
      "€500K converts at €10M",
      "€537.5K (principal + interest) converts at €6M cap — getting significantly more shares than Series A investors",
      "€500K converts at €8M (discount)",
      "€537.5K converts at €8M (discount)"
    ],
    "correct": 1,
    "explanation": "After 18 months at 5%: accrued interest = €500K × 5% × 1.5 = €37.5K. Total converting: €537.5K. Cap: €6M. Discount: €10M × 0.8 = €8M. Cap wins (€6M < €8M). The €537.5K converts at the €6M valuation, getting 8.96% of the company, vs 5.375% at Series A price.",
    "germanContext": "This example shows why Wandeldarlehen caps are so powerful. The difference between converting at €6M vs €10M is nearly double the equity. German founders should carefully consider the cap impact on their dilution."
  },
  {
    "category": "Convertible Instruments",
    "difficulty": 2,
    "type": "true_false",
    "question": "A Wandeldarlehen always converts into the same class of shares as the next equity round.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "Not always. The conversion terms specify what the note converts into. Most standard Wandeldarlehen convert into the SAME class as the qualifying round (e.g., Series A preferred). However, some notes specify conversion into common shares, or a separate 'shadow series' with different rights.",
    "germanContext": "In German practice, most Wandeldarlehen convert into the same 'Geschäftsanteile' class as the triggering round. But verify: does the Wandeldarlehen holder get the same liquidation preference, anti-dilution, and pro-rata rights as the Series A investors?"
  },
  {
    "category": "Convertible Instruments",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "Why are Wandeldarlehen popular for pre-seed and seed funding in Germany?",
    "options": [
      "They're required by law",
      "They're fast (no valuation negotiation needed), cheap (less legal work than a priced round), and defer the valuation question to when the company has more data to justify a price",
      "They provide better returns than equity",
      "Banks require them"
    ],
    "correct": 1,
    "explanation": "At the earliest stages, neither founder nor investor has enough data to confidently set a valuation. A Wandeldarlehen says 'let's agree on a discount/cap and let the Series A investors price the company later.' This saves time, legal costs, and avoids premature valuation debates.",
    "germanContext": "German pre-seed ecosystem runs heavily on Wandeldarlehen. Programs like EXIST, HTGF micro-loans, and angel investments frequently use convertible structures. A standard Wandeldarlehen can be executed in 1-2 weeks vs 4-8 weeks for a priced round."
  },
  {
    "category": "Valuation & Economics",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What are the main methods VCs use to value early-stage startups?",
    "options": [
      "Discounted Cash Flow (DCF) analysis",
      "Comparable transactions, comparable company multiples, scorecard method, and VC method (working backwards from target return) — early-stage valuation is more art than science",
      "Net asset value",
      "Replacement cost"
    ],
    "correct": 1,
    "explanation": "DCF rarely works for early startups (no reliable cash flows to discount). Instead, VCs use: (1) comparables (what did similar companies raise at?), (2) VC method (target 10x in 5 years → back-calculate entry valuation), (3) scorecard (benchmark against average deals, adjust for team/market/traction factors).",
    "germanContext": "In the German market, comparable recent DACH deals are the most commonly referenced. Resources: Dealroom.co, Crunchbase, and the annual Deutsche Startups statistics provide German-specific valuation benchmarks by stage and sector."
  },
  {
    "category": "Valuation & Economics",
    "difficulty": 3,
    "type": "scenario",
    "question": "A VC fund needs to return 3x to its LPs. Their ownership target is 20% at entry. They invest in 10 companies expecting 2 to succeed big. For the math to work, each winner needs to return what?",
    "options": [
      "3x the fund",
      "At least 15x the investment — because only 2 of 10 succeed, each winner must return enough to cover all 10 investments plus the 3x fund target",
      "5x the investment",
      "10x the investment"
    ],
    "correct": 1,
    "explanation": "€100M fund, 3x target = €300M in returns needed. €10M per company × 10 = €100M invested. If only 2 succeed: each needs to return €150M on a €10M investment = 15x. At 20% ownership, the company must be worth €750M at exit. This explains why VCs need massive outcomes.",
    "germanContext": "This 'power law' math explains why German VCs focus on large TAM (total addressable market) opportunities. A €50M exit is great for founders but doesn't move the needle for a VC fund targeting 3x returns."
  },
  {
    "category": "Valuation & Economics",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is 'post-money SAFE' and how does it differ from a 'pre-money SAFE'?",
    "options": [
      "Post-money includes the SAFE amount in the cap; pre-money does not — making post-money clearer about the investor's resulting ownership",
      "They're the same",
      "Post-money is more founder-friendly",
      "Pre-money is a German concept"
    ],
    "correct": 0,
    "explanation": "In a post-money SAFE (YC's current standard), the valuation cap INCLUDES the SAFE investment. A €500K SAFE at a €5M post-money cap means the investor gets exactly 10% (€500K/€5M). Pre-money SAFEs are ambiguous about resulting ownership when multiple SAFEs stack.",
    "germanContext": "While SAFEs are less common in Germany (Wandeldarlehen dominate), understanding the pre/post-money distinction matters when evaluating international investor terms or companies with US-based SAFEs converting alongside German Wandeldarlehen."
  },
  {
    "category": "Valuation & Economics",
    "difficulty": 2,
    "type": "true_false",
    "question": "Revenue multiples (e.g., '10x ARR') are the best way to value a pre-revenue startup.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Revenue multiples require revenue! Pre-revenue startups are valued based on: team quality, market size, competitive positioning, IP/technology, comparable deals at similar stages, and the VC's conviction about the opportunity. Revenue multiples become meaningful from Series A onwards when there's actual recurring revenue.",
    "germanContext": "For German pre-seed/seed, common valuation ranges: pre-seed €1-3M pre-money, seed €3-8M pre-money. These vary significantly by sector, team, and market conditions. Deep tech may command higher seed valuations due to IP."
  },
  {
    "category": "Exit & Transfer Rights",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is a 'founder lock-up' or 'founder restriction period'?",
    "options": [
      "Founders are locked in the office",
      "A contractual restriction preventing founders from selling or transferring their shares for a defined period, ensuring they remain committed and aligned with investors",
      "Founders can't start new companies",
      "Founders can't take vacations"
    ],
    "correct": 1,
    "explanation": "Founder lock-ups prevent founders from cashing out early while investors are locked into illiquid equity. Typical lock-up: 2-4 years from the investment date, or until a specific milestone. Some allow limited secondary sales after the lock-up period with investor consent.",
    "germanContext": "Standard in German Beteiligungsverträge: 'Verfügungsbeschränkung'. The lock-up typically aligns with the reverse vesting schedule. German founders should negotiate for partial liquidity windows after 2-3 years in later rounds."
  },
  {
    "category": "Exit & Transfer Rights",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "What is an 'IPO ratchet' and why is it controversial?",
    "options": [
      "A tool for fixing IPO machinery",
      "A provision guaranteeing investors a minimum return at IPO — if the IPO price doesn't deliver the target return, the investor gets additional shares to make up the difference, diluting everyone else",
      "A type of stock exchange fee",
      "An IPO eligibility requirement"
    ],
    "correct": 1,
    "explanation": "IPO ratchets are aggressive investor protections that guarantee minimum returns at IPO. If the IPO price yields only 1.5x and the ratchet guarantees 2x, additional shares are issued to the investor — diluting founders and employees right at the moment they expected to benefit most from going public.",
    "germanContext": "IPO ratchets have been controversial in high-profile European IPOs. German founders should resist them — or at minimum, negotiate a cap on the ratchet and ensure it doesn't apply if the IPO is above a certain price threshold."
  },
  {
    "category": "Exit & Transfer Rights",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is 'Beurkundungspflicht' and how does it affect share transfers in a German GmbH?",
    "options": [
      "A requirement to register the company",
      "Every transfer of GmbH shares MUST be notarized by a German notary (§15 GmbHG), making share transfers more expensive, slower, and more formal than in US/UK jurisdictions",
      "A tax filing requirement",
      "An annual audit requirement"
    ],
    "correct": 1,
    "explanation": "Notarization is mandatory for every GmbH share transfer. The notary verifies identities, ensures legal compliance, reads the agreement aloud, and registers the transfer. This costs €500-2000+ per transaction and requires all parties to be present (or via power of attorney).",
    "germanContext": "This is why VSOPs exist — to avoid per-transfer notarization costs for employee equity. It also means secondary sales, investor exits, and cap table restructurings are more time-consuming and expensive than in common law jurisdictions."
  },
  {
    "category": "Pre-emption & Pro-rata",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What happens when an investor can't afford to exercise their pro-rata?",
    "options": [
      "They're forced to sell their existing shares",
      "They waive their pro-rata for this round and accept dilution. However, sophisticated investors sometimes assign or sell their pro-rata right to another investor",
      "The round is cancelled",
      "The company must reduce the round size"
    ],
    "correct": 1,
    "explanation": "Pro-rata is a right, not an obligation. If an investor passes (often because their fund has been fully deployed or they've lost conviction), they accept dilution. Some agreements allow transfer of pro-rata rights, enabling another investor to step in.",
    "germanContext": "In the German market, VCs unable to exercise pro-rata sometimes introduce co-investors from their network to fill the gap. The Beteiligungsvertrag should specify whether pro-rata rights are transferable ('übertragbar')."
  },
  {
    "category": "Pre-emption & Pro-rata",
    "difficulty": 3,
    "type": "true_false",
    "question": "In a German GmbH, pre-emption rights (Bezugsrechte) are automatically granted to all shareholders by law.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Unlike Aktiengesellschaften (AGs) where §186 AktG grants statutory pre-emption rights, GmbH law does NOT automatically provide Bezugsrechte. They must be explicitly agreed in the Gesellschaftsvertrag or Beteiligungsvertrag.",
    "germanContext": "This is a critical difference between GmbH and AG. Founders incorporating a GmbH should ensure Bezugsrechte are included in the Gesellschaftsvertrag from the start, not just added when a VC comes in."
  },
  {
    "category": "Fund Mechanics",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is 'TVPI' and how does it differ from DPI?",
    "options": [
      "They measure the same thing",
      "TVPI (Total Value to Paid-In) = (Distributions + Remaining Portfolio Value) / Paid-In Capital. It includes UNREALIZED gains. DPI only counts actual cash distributions. TVPI shows potential; DPI shows reality",
      "TVPI is for public markets only",
      "TVPI measures individual deal returns"
    ],
    "correct": 1,
    "explanation": "TVPI includes paper gains from companies still in the portfolio (valued at their last round price). DPI only counts cash actually returned. In bull markets, TVPI can be high while DPI is low. In downturns, TVPI can drop dramatically when paper valuations are marked down.",
    "germanContext": "German institutional LPs increasingly weight DPI over TVPI when making re-up decisions. The 2022-2023 valuation corrections showed that many German VC funds had inflated TVPI numbers based on 2021 peak valuations."
  },
  {
    "category": "Fund Mechanics",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What does 'dry powder' mean in the VC context?",
    "options": [
      "Actual gunpowder kept dry for emergencies",
      "Committed but undeployed capital — money that LPs have committed but the GP hasn't yet invested. High dry powder means there's a lot of capital looking for deals",
      "Savings in a dry climate",
      "Unused marketing budget"
    ],
    "correct": 1,
    "explanation": "Dry powder represents the investment capacity still available in existing funds. When aggregate dry powder is high, competition for deals increases (good for founders). When it's low, capital is scarce (bad for founders). Dry powder levels signal market dynamics.",
    "germanContext": "As of 2024, European VC dry powder levels remain significant but are being deployed more cautiously than in 2021. German founders can track dry powder levels through Invest Europe annual reports and PitchBook data."
  },
  {
    "category": "Fund Mechanics",
    "difficulty": 2,
    "type": "true_false",
    "question": "A VC partner who sits on your board is personally investing their own money in your company.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False (usually). The VC partner is investing the FUND's money, not their personal capital. They represent the fund (LP interests) on your board. Some partners may co-invest personal money alongside the fund, but the primary investment comes from the fund vehicle.",
    "germanContext": "In Germany, some VC partners do invest personal money alongside the fund ('Co-Investment'). This is actually a positive signal — it means they're backing the company with their own wealth, not just their LPs' money."
  },
  {
    "category": "Fund Mechanics",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "What is 'GP commit' and why does it matter?",
    "options": [
      "The GP commits to attending all board meetings",
      "The GP (fund manager) invests their own personal money into the fund — typically 1-5% of fund size. This aligns the GP's interests with LPs because the GP has real skin in the game",
      "A commitment to manage the fund for its full life",
      "A legal obligation to return LP capital"
    ],
    "correct": 1,
    "explanation": "GP commit ensures the fund managers have personal financial risk aligned with their LPs. If the fund loses money, the GP loses their own investment too. A higher GP commit signals stronger conviction and alignment.",
    "germanContext": "Standard GP commit in German VC funds: 1-3% of fund size. For a €100M fund, that's €1-3M of the GP's personal capital. Some LPs (particularly German institutional investors) specifically ask about GP commit during fund due diligence."
  },
  {
    "category": "Negotiation Tactics",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is 'founder-friendly' vs 'investor-friendly' and why is it a spectrum?",
    "options": [
      "Founder-friendly means no investor rights at all",
      "Terms exist on a spectrum: founder-friendly (low preference, no participation, broad-based WA, small pool, few consent rights) vs investor-friendly (high preference, participation, full ratchet, large pool, extensive consent rights). Most deals should be balanced",
      "Founder-friendly is always better",
      "Investor-friendly means the investor controls everything"
    ],
    "correct": 1,
    "explanation": "Neither extreme is healthy. Excessively founder-friendly terms may scare away institutional investors. Excessively investor-friendly terms demotivate founders. The best deals are 'fair' — protecting legitimate investor interests while preserving founder upside and motivation.",
    "germanContext": "The DACH market has generally moved toward more founder-friendly terms since 2019, driven by competition among VCs. Standard DACH terms (non-participating preference, BBWA, 10% pool) are considered balanced."
  },
  {
    "category": "Negotiation Tactics",
    "difficulty": 3,
    "type": "scenario",
    "question": "You're a founder receiving your first term sheet. The valuation is fair but you notice: 2x participating preferred, full ratchet anti-dilution, 20% VSOP pool from pre-money, and broad Negativkatalog. How should you respond?",
    "options": [
      "Accept — any funding is good funding",
      "Reject the entire term sheet",
      "Counter on each term systematically: propose 1x non-participating, broad-based weighted average, 10% VSOP pool, and a narrower Negativkatalog. Use market data to justify each counter-proposal",
      "Only negotiate the valuation higher"
    ],
    "correct": 2,
    "explanation": "Each of these terms is non-market and can be negotiated. 2x participating is aggressive (counter: 1x non-participating). Full ratchet is hostile (counter: BBWA). 20% pool is excessive (counter: 10%). Broad Negativkatalog limits operational freedom (counter: raise thresholds, remove items). Present your counters as 'market standard' using BAND templates and comparable deals.",
    "germanContext": "Reference the BAND/GESSI standard templates as your benchmark: they specify 1x non-participating, broad-based weighted average, and ~10% VSOP. If the investor pushes back, propose a compromise on each point rather than accepting the aggressive terms wholesale."
  },
  {
    "category": "Negotiation Tactics",
    "difficulty": 1,
    "type": "multiple_choice",
    "question": "What is 'due diligence' and when does it happen?",
    "options": [
      "A type of financial audit done annually",
      "The investor's thorough investigation of the company — legal, financial, technical, commercial, and team — that happens AFTER the term sheet is signed but BEFORE closing/funding",
      "It happens before the pitch",
      "It's a government inspection"
    ],
    "correct": 1,
    "explanation": "Due diligence is the investor's homework. After signing a (usually non-binding) term sheet, the investor examines everything: financial records, legal compliance, IP ownership, customer contracts, employee agreements, technical architecture, and more. Material issues found can modify or kill the deal.",
    "germanContext": "German DD has specific focus areas: Handelsregister entries, Gesellschaftsvertrag history, notarized documents, employment law compliance (Arbeitsrecht), data protection (DSGVO), and tax compliance. Allow 3-6 weeks for DD in German deals."
  },
  {
    "category": "Negotiation Tactics",
    "difficulty": 2,
    "type": "true_false",
    "question": "Once a term sheet is signed, the deal is guaranteed to close.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "explanation": "False. Term sheets are mostly non-binding. Many deals fall through during due diligence (material issues discovered), legal documentation (can't agree on definitive terms), or external factors (market changes, other investors dropping out). Signed term sheet to closed deal is typically 60-80% conversion rate.",
    "germanContext": "In the German market, additional risks include: notary scheduling delays, Handelsregister processing time, and the complexity of the Beurkundung process. Never stop running the business based on a term sheet alone — keep your backup options alive until the money is in the bank."
  },
  {
    "category": "Advanced Scenarios",
    "difficulty": 3,
    "type": "multiple_choice",
    "question": "What is a 'cramdown' in the context of a distressed startup?",
    "options": [
      "Physically cramming more employees into the office",
      "A heavily dilutive down-round where existing investors/founders are severely diluted because the company has no negotiating leverage — often resulting in new investors owning a majority of the company",
      "A type of bankruptcy filing",
      "Reducing the company's physical footprint"
    ],
    "correct": 1,
    "explanation": "A cramdown occurs when a company is desperate for capital and must accept extremely dilutive terms. New investors may demand: high preference multiples, participating preferred, full ratchet, board control, and massive new equity — leaving existing shareholders with minimal ownership.",
    "germanContext": "Cramdowns in German GmbHs require 75% Gesellschafterversammlung approval for capital measures. If existing investors hold blocking positions, complex negotiations ensue. German insolvency rules (InsO) may also come into play if the company is insolvent."
  },
  {
    "category": "Advanced Scenarios",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is a 'waterfall analysis' and when should founders use one?",
    "options": [
      "Analysis of waterfalls near the company headquarters",
      "A detailed model showing exactly how exit proceeds are distributed among all shareholders at various exit prices — considering preferences, participation, anti-dilution, and VSOP. Founders should build one BEFORE signing any term sheet",
      "A weather analysis",
      "A cash flow projection"
    ],
    "correct": 1,
    "explanation": "A waterfall model is the only way to truly understand deal economics. It calculates, at every possible exit price: who gets what? Preferences, participation caps, conversion decisions, and VSOP payouts all interact in complex ways. A spreadsheet model is essential — never rely on gut feeling or headline valuation alone.",
    "germanContext": "Every German VC lawyer should provide a waterfall model as part of the transaction. If they don't, demand one. Free templates are available from BAND and various German VC law firms. Model at least 5 exit scenarios: €5M, €20M, €50M, €100M, and €500M."
  },
  {
    "category": "Advanced Scenarios",
    "difficulty": 3,
    "type": "scenario",
    "question": "A company has been offered an acqui-hire at €3M. The cap table has €8M in total liquidation preferences (Series A: €3M, Series B: €5M). Both are 1x non-participating. What happens?",
    "options": [
      "Founders get a small amount",
      "Preferences exceed the purchase price. Series A gets €3M × (3/8) = €1.125M. Series B gets €3M × (5/8) = €1.875M. Founders and employees get ZERO. This is 'preference overhang' in action",
      "Everyone splits equally",
      "The deal can't close"
    ],
    "correct": 1,
    "explanation": "When preferences exceed exit proceeds and all investors take their preference (non-participating), the entire €3M goes to investors pro-rata based on their preference amounts. Nothing flows to common shareholders. This is why preference overhang kills team motivation and can prevent exits.",
    "germanContext": "This scenario is common in German startup wind-downs. Solutions: negotiate a management carve-out (Managementbeteiligung) of 10-20% that pays before preferences, or restructure preferences to enable the deal."
  },
  {
    "category": "Advanced Scenarios",
    "difficulty": 2,
    "type": "multiple_choice",
    "question": "What is the difference between a 'trade sale' and an 'acqui-hire'?",
    "options": [
      "They're the same thing",
      "A trade sale is the acquisition of the company for its business value (product, customers, revenue). An acqui-hire is primarily to acquire the TEAM — the product/business may be shut down, and the price is usually much lower",
      "Trade sale is domestic; acqui-hire is international",
      "Trade sale is public; acqui-hire is private"
    ],
    "correct": 1,
    "explanation": "In a trade sale, the acquirer wants the whole business. In an acqui-hire, they mainly want the engineers/talent. Acqui-hires typically price at €1-3M per key engineer and may not generate enough to cover preferences — creating waterfall issues.",
    "germanContext": "Acqui-hires in Germany are complicated by German labor law (Arbeitsrecht), particularly §613a BGB which governs employee rights in business transfers. The acquiring company may inherit employment obligations, making clean acqui-hires harder than in the US."
  }
]
;

// To use: in App.jsx, import and combine:
// import { EXTRA_QUESTIONS } from "./questions";
// const ALL_QUESTIONS = [...QUESTIONS, ...EXTRA_QUESTIONS];
// Then use ALL_QUESTIONS wherever QUESTIONS was used.

// Total new questions: 162
// Breakdown by category:
//   Advanced Scenarios: 13
//   Anti-Dilution: 17
//   Convertible Instruments: 14
//   ESOP & VSOP: 18
//   Exit & Transfer Rights: 13
//   Fund Mechanics: 14
//   Governance & Control: 12
//   Liquidation Preferences: 24
//   Negotiation Tactics: 14
//   Pre-emption & Pro-rata: 9
//   Valuation & Economics: 14
// Difficulty: Easy=50, Medium=71, Expert=41
// Types: multiple_choice=110, true_false=26, scenario=26