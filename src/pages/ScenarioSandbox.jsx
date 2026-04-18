import React, { useMemo, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Zap } from 'lucide-react';
import { predictBudgetShiftOutcome, summarizeOpportunityCost } from '../lib/budgetModel';

export default function ScenarioSandbox() {
  const [healthVal, setHealthVal] = useState(10);
  const [welfareCost, setWelfareCost] = useState(500);

  const chartData = useMemo(() => {
    const base = summarizeOpportunityCost({ healthcareIncreasePct: Number(healthVal) });
    return [
      { year: '2024', health: 400, infra: 800, lifeExp: 68.2 },
      { year: '2025', health: base.healthProjected, infra: base.infraProjected, lifeExp: 68.2 + healthVal * 0.09 },
      { year: '2026', health: base.healthProjected + healthVal * 6, infra: Math.max(200, base.infraProjected - healthVal * 5), lifeExp: 68.2 + healthVal * 0.14 },
      { year: '2027', health: base.healthProjected + healthVal * 11, infra: Math.max(160, base.infraProjected - healthVal * 9), lifeExp: 68.2 + healthVal * 0.19 },
    ];
  }, [healthVal]);

  const rf = useMemo(
    () =>
      predictBudgetShiftOutcome({
        healthcarePct: Number(healthVal),
        educationPct: 6,
        infrastructurePct: -Math.min(40, Number(healthVal) * 0.85),
        industrialPct: -2,
      }),
    [healthVal]
  );

  const opp = summarizeOpportunityCost({ healthcareIncreasePct: Number(healthVal) });

  const xaiBrief = useMemo(() => {
    const h = Number(healthVal);
    const district = h >= 25 ? 'Bastar' : h >= 15 ? 'Gondia' : 'Korba';
    return `Increasing the Education budget in District ${district} is prioritized over heavy industrialization due to a ${38 + Math.min(12, Math.floor(h / 3))}% youth demographic (synthetic census slice), elevated cultural resistance to land acquisition, and a higher marginal return on human-capital formation versus smokestack capex under the Gondia Protocol. Opportunity cost is concentrated in ${opp.sectorReduced}, releasing ₹${(h * 8).toFixed(0)} Cr (modelled) over the outer years while life expectancy uplift is projected at +${opp.lifeExpectancyDeltaMonths} months in the national health index.`;
  }, [healthVal, opp.lifeExpectancyDeltaMonths, opp.sectorReduced]);

  const welfare = useMemo(() => {
    const w = Number(welfareCost) || 0;
    const deficitDelta = Math.min(8.5, w * 0.014);
    const satisfaction = Math.min(99, 42 + w * 0.07);
    return { deficitDelta, satisfaction };
  }, [welfareCost]);

  return (
    <div className="scenario-page">
      <h1 className="section-title" style={{ color: 'var(--text-primary)' }}>
        Scenario Sandbox
      </h1>
      <p className="section-subtitle">The &ldquo;What-If&rdquo; engine: opportunity costs, welfare shocks, and formal XAI briefs.</p>

      <div className="grid grid-cols-2-1 scenario-grid">
        <div className="card scenario-panel">
          <div className="scenario-panel-head">
            <h3 className="scenario-panel-title">Budget Reallocation Slider</h3>
            <span className="badge badge-blue">Real-time recalculation</span>
          </div>

          <div className="scenario-slider-block">
            <label className="scenario-slider-label">
              <span>Increase Healthcare Budget (%)</span>
              <span className="scenario-slider-value">+{healthVal}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={healthVal}
              onChange={(e) => setHealthVal(Number(e.target.value))}
              className="slider-input"
            />
            <p className="scenario-opp">
              <strong>Opportunity cost:</strong> {opp.sectorReduced} loses ~₹{(Number(healthVal) * 8).toFixed(0)} Cr (outer-year model);
              projected life expectancy movement: <strong>+{opp.lifeExpectancyDeltaMonths} months</strong> (synthetic index).
            </p>
          </div>

          <div className="scenario-rf-grid">
            <div className="scenario-rf-card">
              <div className="scenario-rf-label">Random Forest uplift (ensemble)</div>
              <div className="scenario-rf-value">{rf.ensembleMean}</div>
              <div className="scenario-rf-meta">{rf.calibration}</div>
            </div>
            <div className="scenario-rf-card">
              <div className="scenario-rf-label">Projected life expectancy</div>
              <div className="scenario-rf-value">{rf.projectedLifeExpectancyYears} yrs</div>
              <div className="scenario-rf-meta">Fiscal stress index: {rf.fiscalStressIndex}</div>
            </div>
          </div>

          <div className="scenario-chart-wrap">
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-neon-green)" stopOpacity={0.85} />
                    <stop offset="95%" stopColor="var(--accent-neon-green)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorInfra" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.85} />
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
                <XAxis dataKey="year" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)' }} />
                <Legend />
                <Area type="monotone" dataKey="health" stroke="var(--accent-neon-green)" fillOpacity={1} fill="url(#colorHealth)" name="Health outcome" />
                <Area type="monotone" dataKey="infra" stroke="#ef4444" fillOpacity={1} fill="url(#colorInfra)" name="Infrastructure capability" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="scenario-side">
          <div className="card scenario-freebie">
            <h3 className="scenario-side-title">Freebie Impact Analyzer</h3>
            <p className="scenario-side-hint">Simulate welfare schemes: fiscal deficit path vs. citizen satisfaction.</p>
            <label className="scenario-field-label">
              Subsidy cost (₹ Cr)
              <input
                type="number"
                min="0"
                value={welfareCost}
                onChange={(e) => setWelfareCost(Number(e.target.value))}
                className="scenario-input"
              />
            </label>
            <div className="scenario-freebie-metrics">
              <div className="scenario-metric deficit">
                <span className="scenario-metric-label">Long-run fiscal deficit pressure</span>
                <span className="scenario-metric-value">+{welfare.deficitDelta.toFixed(2)} pts</span>
              </div>
              <div className="scenario-metric sat">
                <span className="scenario-metric-label">Citizen satisfaction (synthetic)</span>
                <span className="scenario-metric-value">{welfare.satisfaction.toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="card scenario-xai">
            <h3 className="scenario-side-title scenario-xai-title">
              <Zap size={18} color="var(--accent-neon-green)" aria-hidden />
              Explainable Recommendations (XAI)
            </h3>
            <div className="scenario-xai-body">{xaiBrief}</div>
            <div className="scenario-xai-foot">
              Trees: {rf.trees.map((t) => `T${t.id}=${t.value}`).join(' · ')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
