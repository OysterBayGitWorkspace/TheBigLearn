// UPDATED TERM_SORTER_SETS — now 5 terms per category (was 3)
// This enables the random split logic in TermSorterScreen to pick
// uneven distributions like 4/3, 5/2, 3/4, etc.
//
// INSTRUCTIONS: Replace ONLY the TERM_SORTER_SETS export in
// src/data/gameModes.js with this version. Keep all other exports
// (MATCH_PAIRS_SETS, TRUE_FALSE_STATEMENTS) unchanged.

export const TERM_SORTER_SETS = [
  {
    id: "ts001", tier: 1, title: "Investor Protection vs Founder Protection",
    categories: ["Investor Protection", "Founder Protection"],
    terms: [
      { term: "Liquidation Preference", category: "Investor Protection" },
      { term: "Anti-Dilution Clause", category: "Investor Protection" },
      { term: "Protective Provisions", category: "Investor Protection" },
      { term: "Participating Preferred", category: "Investor Protection" },
      { term: "Board Veto Rights", category: "Investor Protection" },
      { term: "Broad-Based Weighted Average", category: "Founder Protection" },
      { term: "Non-Participating Preferred", category: "Founder Protection" },
      { term: "Double-Trigger Acceleration", category: "Founder Protection" },
      { term: "Pay-to-Play Clause", category: "Founder Protection" },
      { term: "Pro-Rata Cap", category: "Founder Protection" },
    ],
  },
  {
    id: "ts002", tier: 1, title: "Equity Instrument vs Debt Instrument",
    categories: ["Equity", "Debt"],
    terms: [
      { term: "Common Shares", category: "Equity" },
      { term: "Preferred Shares", category: "Equity" },
      { term: "Stock Options", category: "Equity" },
      { term: "Restricted Stock Units", category: "Equity" },
      { term: "SAFE", category: "Equity" },
      { term: "Convertible Note", category: "Debt" },
      { term: "Venture Debt", category: "Debt" },
      { term: "Bridge Loan", category: "Debt" },
      { term: "Revenue-Based Financing", category: "Debt" },
      { term: "Mezzanine Debt", category: "Debt" },
    ],
  },
  {
    id: "ts003", tier: 1, title: "Pre-Exit Right vs Exit Mechanism",
    categories: ["Pre-Exit Right", "Exit Mechanism"],
    terms: [
      { term: "Pro-Rata Right", category: "Pre-Exit Right" },
      { term: "Information Rights", category: "Pre-Exit Right" },
      { term: "Board Seat", category: "Pre-Exit Right" },
      { term: "ROFR", category: "Pre-Exit Right" },
      { term: "Pre-Emption Right", category: "Pre-Exit Right" },
      { term: "Drag-Along", category: "Exit Mechanism" },
      { term: "IPO", category: "Exit Mechanism" },
      { term: "Redemption Right", category: "Exit Mechanism" },
      { term: "Tag-Along", category: "Exit Mechanism" },
      { term: "Trade Sale", category: "Exit Mechanism" },
    ],
  },
  {
    id: "ts004", tier: 1, title: "GP Term vs LP Term",
    categories: ["GP (Fund Manager)", "LP (Fund Investor)"],
    terms: [
      { term: "Carried Interest", category: "GP (Fund Manager)" },
      { term: "Management Fee", category: "GP (Fund Manager)" },
      { term: "Investment Thesis", category: "GP (Fund Manager)" },
      { term: "Deal Flow", category: "GP (Fund Manager)" },
      { term: "Fund Vintage", category: "GP (Fund Manager)" },
      { term: "Capital Call", category: "LP (Fund Investor)" },
      { term: "Committed Capital", category: "LP (Fund Investor)" },
      { term: "DPI", category: "LP (Fund Investor)" },
      { term: "Distribution Waterfall", category: "LP (Fund Investor)" },
      { term: "TVPI", category: "LP (Fund Investor)" },
    ],
  },
  {
    id: "ts005", tier: 1, title: "Investor-Friendly vs Founder-Friendly Term",
    categories: ["Investor-Friendly", "Founder-Friendly"],
    terms: [
      { term: "Full Ratchet Anti-Dilution", category: "Investor-Friendly" },
      { term: "Participating Preferred", category: "Investor-Friendly" },
      { term: "2x Liquidation Preference", category: "Investor-Friendly" },
      { term: "Super Voting Rights", category: "Investor-Friendly" },
      { term: "Mandatory Redemption", category: "Investor-Friendly" },
      { term: "Non-Participating Preferred", category: "Founder-Friendly" },
      { term: "1x Liquidation Preference", category: "Founder-Friendly" },
      { term: "Pay-to-Play Clause", category: "Founder-Friendly" },
      { term: "Single-Trigger Acceleration", category: "Founder-Friendly" },
      { term: "Broad-Based Weighted Average", category: "Founder-Friendly" },
    ],
  },
];
