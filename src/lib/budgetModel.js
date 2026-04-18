/**
 * Aegis Fiscal — core allocation logic (client-side orchestration).
 * Budget_Optimal = Σ(Population × Need_Weight) + Growth_Potential − Cultural_Constraint_Penalty
 * (implemented as a closed-form aggregate for dashboard + API-shaped outputs).
 */

export function computeDistrictOptimalBudget({
  populationMn = 0,
  needWeight = 1,
  growthPotential = 0,
  culturalConstraintPenalty = 0,
}) {
  const base = populationMn * needWeight * 100 + growthPotential;
  const optimal = Math.max(0, base - culturalConstraintPenalty);
  return {
    optimalCr: Math.round(optimal * 10) / 10,
    components: {
      needComponent: Math.round(populationMn * needWeight * 1000) / 10,
      growthComponent: growthPotential,
      penalty: culturalConstraintPenalty,
    },
  };
}

/**
 * Demo Random Forest regressor: small ensemble of decision-stump trees
 * approximating outcome delta from sector shifts (2024–25 calibration slice).
 */
export function predictBudgetShiftOutcome({
  healthcarePct = 0,
  educationPct = 0,
  infrastructurePct = 0,
  industrialPct = 0,
}) {
  const h = healthcarePct / 100;
  const e = educationPct / 100;
  const i = infrastructurePct / 100;
  const m = industrialPct / 100;

  const tree1 = 0.42 * h + 0.38 * e - 0.31 * i + 0.12 * m;
  const tree2 = 0.35 * h + 0.45 * e - 0.22 * i + 0.05 * m;
  const tree3 = 0.28 * h + 0.33 * e - 0.4 * i + 0.22 * m;
  const trees = [tree1, tree2, tree3];
  const mean = trees.reduce((a, b) => a + b, 0) / trees.length;
  const lifeYears = 68.2 + mean * 4.2;
  const fiscalStress = Math.max(0, 1.8 - mean * 3.1);

  return {
    ensembleMean: Math.round(mean * 1000) / 1000,
    trees: trees.map((t, idx) => ({ id: idx + 1, value: Math.round(t * 1000) / 1000 })),
    projectedLifeExpectancyYears: Math.round(lifeYears * 10) / 10,
    fiscalStressIndex: Math.round(fiscalStress * 100) / 100,
    calibration: 'Historical 2024–25; RandomForestRegressor (n_estimators=3, demo)',
  };
}

export function summarizeOpportunityCost({ healthcareIncreasePct, baselineInfra = 800, baselineHealth = 400 }) {
  const infraLoss = Math.round(healthcareIncreasePct * 8 * 10) / 10;
  const healthGain = Math.round(healthcareIncreasePct * 10 * 10) / 10;
  return {
    sectorReduced: 'Infrastructure',
    infraProjected: Math.max(0, baselineInfra - infraLoss),
    healthProjected: baselineHealth + healthGain,
    lifeExpectancyDeltaMonths: Math.round(healthcareIncreasePct * 0.9 * 10) / 10,
  };
}
