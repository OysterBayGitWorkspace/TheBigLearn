export const DAILY_QUESTS = [
  { id: "dq1", title: "Answer 5 questions", target: 5, xpReward: 30, icon: "sword" },
  { id: "dq2", title: "3 correct in a row", target: 3, xpReward: 50, icon: "fire" },
  { id: "dq3", title: "Try 2 categories", target: 2, xpReward: 35, icon: "book" },
];


export const RESOURCE_LIBRARY = [
  { category: "Foundational VC Knowledge", items: [
    { title: "Venture Deals", author: "Brad Feld & Jason Mendelson", year: 2019, type: "Book", relevance: "The gold standard. Breaks down every term sheet clause with clarity. Start here.", rating: 5 },
    { title: "Secrets of Sand Hill Road", author: "Scott Kupor (a16z)", year: 2019, type: "Book", relevance: "Inside view from one of the biggest VC firms. Great on fund mechanics & GP/LP dynamics.", rating: 5 },
    { title: "The Business of Venture Capital", author: "Mahendra Ramsinghani", year: 2014, type: "Book", relevance: "Deep dive into fund structure, carry, management fees, and the business model of VC.", rating: 4 },
    { title: "Term Sheets & Valuations", author: "Alex Wilmerding", year: 2006, type: "Book", relevance: "Practical line-by-line term sheet analysis. Dated but structurally still excellent.", rating: 4 },
    { title: "Mastering the VC Game", author: "Jeffrey Bussgang", year: 2010, type: "Book", relevance: "Both sides of the table perspective \u2014 founder turned VC.", rating: 4 },
    { title: "The Power Law", author: "Sebastian Mallaby", year: 2022, type: "Book", relevance: "The definitive history of venture capital. Essential context for why terms evolved the way they did.", rating: 5 },
  ]},
  { category: "German / DACH Market", items: [
    { title: "Praxishandbuch Venture Capital", author: "Weitnauer (Ed.)", year: 2022, type: "Book", relevance: "THE German VC legal reference. Covers GmbH structures, notarization, VSOP, and German-specific clauses.", rating: 5 },
    { title: "Beteiligungsvertr\u00E4ge bei VC-Investitionen", author: "M\u00F6ller & Weinheimer", year: 2021, type: "Book", relevance: "Deep legal analysis of German participation agreements and investor rights.", rating: 4 },
    { title: "GESSI / BAND Model Documents", author: "German Startups Association / BAND", year: 2023, type: "Template", relevance: "Standardized German term sheet templates. Know these inside out \u2014 they're widely used.", rating: 5 },
    { title: "BVDS Muster-Beteiligungsvertrag", author: "Bundesverband Deutsche Startups", year: 2022, type: "Template", relevance: "Industry-standard German investment agreement template with commentary.", rating: 5 },
    { title: "KfW Capital & HTGF Term Practices", author: "Various", year: 2023, type: "Reference", relevance: "Understanding how German public co-investors (HTGF, KfW, IBB) shape deal terms.", rating: 4 },
    { title: "Startup Recht", author: "Jan Schnedler", year: 2020, type: "Book", relevance: "Accessible German-language guide to startup legal structures, vesting, and financing rounds.", rating: 4 },
  ]},
  { category: "Legal Deep Dives", items: [
    { title: "GmbH-Gesetz (GmbHG)", author: "German Legislature", year: "Current", type: "Law", relevance: "The actual law governing German limited companies. \u00A7\u00A7 53-58 on capital changes are critical.", rating: 5 },
    { title: "Noack/Servatius/Haas: GmbHG Kommentar", author: "Various", year: 2023, type: "Commentary", relevance: "Standard legal commentary on GmbH law. The reference lawyers actually use.", rating: 4 },
    { title: "NVCA Model Legal Documents", author: "NVCA", year: 2023, type: "Template", relevance: "US gold standard \u2014 useful to understand where German terms deviate and why.", rating: 4 },
    { title: "Convertible Note / SAFE Mechanics", author: "Y Combinator / Various", year: 2023, type: "Reference", relevance: "Compare US SAFE structure with German Wandeldarlehen to understand key differences.", rating: 4 },
  ]},
  { category: "Online Resources", items: [
    { title: "Deutsche Startups / Gr\u00FCnderszene", author: "Various", year: "Ongoing", type: "Media", relevance: "Stay current on German deals, valuations, and market trends.", rating: 4 },
    { title: "Christoph Gerlinger's VC Blog", author: "Gerlinger", year: "Ongoing", type: "Blog", relevance: "Practical insights on German VC structuring from a seasoned operator.", rating: 3 },
    { title: "HTGF Blog & Investment Criteria", author: "High-Tech Gr\u00FCnderfonds", year: "Ongoing", type: "Blog", relevance: "Understand Germany's most active seed investor's terms and approach.", rating: 4 },
    { title: "Feld Thoughts (Brad Feld's Blog)", author: "Brad Feld", year: "Ongoing", type: "Blog", relevance: "Decades of practical term sheet wisdom. Many posts directly applicable.", rating: 5 },
  ]},
];
