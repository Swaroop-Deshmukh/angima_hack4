/** Last ₹100 Cr transparency ledger (major categories per user spec) */
export const recentAllocations = [
  { id: 1, sector: 'Healthcare', amount: 45.5, amountLabel: '₹ 45.5 Cr', district: 'Bastar', purpose: 'Primary care expansion & mobile diagnostics', time: '2 hours ago' },
  { id: 2, sector: 'Education', amount: 22.0, amountLabel: '₹ 22.0 Cr', district: 'Gondia', purpose: 'Tribal residential schools & digital labs', time: '5 hours ago' },
  { id: 3, sector: 'Healthcare', amount: 18.0, amountLabel: '₹ 18.0 Cr', district: 'Raipur', purpose: 'Maternal health sovereign buffer', time: '8 hours ago' },
  { id: 4, sector: 'Education', amount: 14.5, amountLabel: '₹ 14.5 Cr', district: 'Durg', purpose: 'Secondary STEM cohorts', time: '1 day ago' },
];

export const transparencyTotalCr = recentAllocations.reduce((s, a) => s + a.amount, 0);

/** Map engine: national → state markers (CircleMarker-friendly) */
export const macroMapFeatures = [
  { id: 'cg', name: 'Chhattisgarh', level: 'state', lat: 21.2787, lng: 81.8661, paradox: true, resourceIndex: 94, gdpShare: 3.1, popDensity: 48, literacy: 71, infraGap: 62, gdpContrib: 3.1 },
  { id: 'mh', name: 'Maharashtra', level: 'state', lat: 19.7515, lng: 75.7139, paradox: false, resourceIndex: 38, gdpShare: 14.2, popDensity: 365, literacy: 84, infraGap: 28, gdpContrib: 14.2 },
  { id: 'ka', name: 'Karnataka', level: 'state', lat: 15.3173, lng: 75.7139, paradox: false, resourceIndex: 44, gdpShare: 8.1, popDensity: 319, literacy: 77, infraGap: 35, gdpContrib: 8.1 },
  { id: 'up', name: 'Uttar Pradesh', level: 'state', lat: 27.5706, lng: 80.0982, paradox: false, resourceIndex: 22, gdpShare: 9.2, popDensity: 828, literacy: 68, infraGap: 55, gdpContrib: 9.2 },
  { id: 'gondia', name: 'Gondia (District)', level: 'district', lat: 21.4625, lng: 80.192, paradox: false, resourceIndex: 28, gdpShare: 0.2, popDensity: 182, literacy: 67, infraGap: 60, gdpContrib: 0.2 },
  { id: 'bastar', name: 'Bastar (District)', level: 'district', lat: 19.107, lng: 81.9535, paradox: true, resourceIndex: 55, gdpShare: 0.15, popDensity: 43, literacy: 59, infraGap: 72, gdpContrib: 0.15 },
];

/** Resource vs GDP paradox — states / regions */
export const resourceGdpParadox = [
  { name: 'Chhattisgarh', resourceWealth: 94, stateGdpPerCapitaIndex: 38, reinvestmentScore: 88 },
  { name: 'Jharkhand', resourceWealth: 89, stateGdpPerCapitaIndex: 41, reinvestmentScore: 85 },
  { name: 'Odisha', resourceWealth: 76, stateGdpPerCapitaIndex: 52, reinvestmentScore: 72 },
  { name: 'Maharashtra', resourceWealth: 38, stateGdpPerCapitaIndex: 92, reinvestmentScore: 44 },
  { name: 'Gujarat', resourceWealth: 52, stateGdpPerCapitaIndex: 88, reinvestmentScore: 48 },
];

export const quadrantRegions = [
  { region: 'Bastar', spend: 82, outcome: 14, zone: 'red' },
  { region: 'Korba', spend: 86, outcome: 32, zone: 'red' },
  { region: 'Pune', spend: 88, outcome: 86, zone: 'green' },
  { region: 'Gondia', spend: 28, outcome: 62, zone: 'blue' },
  { region: 'Indore', spend: 58, outcome: 81, zone: 'green' },
  { region: 'Raipur', spend: 72, outcome: 48, zone: 'amber' },
];

export const culturalZones = [
  { id: 'gondia-core', name: 'Gondia — Tribal corridor', lat: 21.45, lng: 80.18, resistance: 0.82, heritage: true, forestPct: 68 },
  { id: 'bastar-forest', name: 'Bastar — Forest & PVTG belt', lat: 19.05, lng: 81.95, resistance: 0.91, heritage: true, forestPct: 74 },
  { id: 'korba-mine', name: 'Korba — Coal buffer', lat: 22.35, lng: 82.68, resistance: 0.35, heritage: false, forestPct: 22 },
];

export const crisisFeeds = [
  { id: 1, source: 'IMD — Satellite rainfall assimilation', summary: 'June–July monsoon surge probability elevated for Brahmaputra basin.', severity: 'amber' },
  { id: 2, source: 'News wire — Energy markets', summary: 'Fuel price volatility cluster detected; logistics cost shock +6.2% (synthetic).', severity: 'watch' },
  { id: 3, source: 'Health sentinel network', summary: 'Respiratory syndromic uptick in 3 divisions — scenario only.', severity: 'info' },
];

export const leaderboardRegions = [
  { rank: 1, name: 'Indore', score: 94, bonus: '+15% Performance Bonus' },
  { rank: 2, name: 'Surat', score: 91, bonus: '+10% Performance Bonus' },
  { rank: 3, name: 'Pune', score: 88, bonus: '+5% Performance Bonus' },
  { rank: 4, name: 'Visakhapatnam', score: 86, bonus: '+4% Performance Bonus' },
  { rank: 5, name: 'Coimbatore', score: 84, bonus: '+3% Performance Bonus' },
  { rank: 6, name: 'Gondia', score: 71, bonus: 'Heritage-weighted uplift' },
];

export const districtDetails = [
  { id: 'dist1', name: 'Pune', popDensity: 'High', literacy: '89%', infraGap: '20%', gdpContrib: '12%' },
  { id: 'dist2', name: 'Gondia', popDensity: 'Low', literacy: '67%', infraGap: '60%', gdpContrib: '2%' },
];
