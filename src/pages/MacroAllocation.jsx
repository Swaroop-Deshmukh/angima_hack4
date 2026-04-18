import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis,
  ReferenceLine,
  Cell,
  ComposedChart,
  Bar,
  Line,
  Legend,
} from 'recharts';
import { macroMapFeatures, resourceGdpParadox, quadrantRegions } from '../data/mockData';
import { computeDistrictOptimalBudget } from '../lib/budgetModel';
import IndiaMap from '../components/IndiaMap';
import { MapPin } from 'lucide-react';

const LAYER_DEF = [
  { id: 'population', label: 'Population Density' },
  { id: 'literacy', label: 'Literacy Rates' },
  { id: 'infra', label: 'Infrastructure Gap' },
  { id: 'gdp', label: 'GDP Contribution' },
];

const quadrantColors = {
  red: '#dc2626',
  blue: '#2563eb',
  green: '#16a34a',
  amber: '#d97706',
};

export default function MacroAllocation() {
  const [params] = useSearchParams();
  const tier = params.get('tier') || 'national';

  const [layers, setLayers] = useState(() =>
    LAYER_DEF.map((l) => ({ ...l, on: l.id === 'population' || l.id === 'infra' }))
  );

  const [selectedId, setSelectedId] = useState('cg');

  const focus = useMemo(() => {
    if (tier === 'district') return { center: [21.35, 80.35], zoom: 7 };
    if (tier === 'state') return { center: [22.9, 79.5], zoom: 6 };
    return { center: [22.5, 79], zoom: 5 };
  }, [tier]);

  const selected = useMemo(() => macroMapFeatures.find((f) => f.id === selectedId) ?? macroMapFeatures[0], [selectedId]);

  const optimal = computeDistrictOptimalBudget({
    populationMn: selected?.gdpShare ? Math.max(1.2, selected.gdpShare * 2.1) : 2.4,
    needWeight: (selected?.infraGap ?? 50) / 40,
    growthPotential: selected?.paradox ? 42 : 28,
    culturalConstraintPenalty: selected?.paradox ? 18 : 9,
  });

  const scatterData = quadrantRegions.map((d) => ({
    ...d,
    fill: quadrantColors[d.zone] ?? '#64748b',
  }));

  function toggleLayer(id) {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, on: !l.on } : l)));
  }

  return (
    <div className="macro-page">
      <h1 className="section-title">Macro-Allocation Command Center</h1>
      <p className="section-subtitle">
        National → state → district drill-down with multi-dataset overlays, paradox analytics, and development
        quadrants. Tier: <strong>{tier}</strong>.
      </p>

      <div className="grid grid-cols-1-2 macro-top-grid">
        <div className="card macro-card">
          <h3 className="macro-card-title">Multi-Dataset Integration</h3>
          <p className="macro-card-hint">Toggle strata; the map encodes the highest-priority active layer first.</p>
          <div className="macro-toggles">
            {layers.map((l) => (
              <label key={l.id} className="macro-toggle">
                <input type="checkbox" checked={l.on} onChange={() => toggleLayer(l.id)} />
                <span>{l.label}</span>
              </label>
            ))}
          </div>
          <hr className="macro-hr" />
          <div className="macro-paradox-callout">
            <strong>Resource vs. GDP paradox</strong>
            <p>
              Chhattisgarh-class regions exhibit high mineral wealth with suppressed local GDP capture. Recommended:
              sovereign <em>reinvestment strategy</em>—downstream processing, logistics, and human capital rather than
              greenfield smokestack clusters absent social licence.
            </p>
          </div>
          <div className="macro-formula">
            <div className="macro-formula-label">Live optimal budget (illustrative)</div>
            <div className="macro-formula-value">{optimal.optimalCr.toLocaleString()} Cr</div>
            <div className="macro-formula-meta">
              {selected.name}: need {optimal.components.needComponent.toFixed(1)} · growth +{optimal.components.growthComponent} · penalty −
              {optimal.components.penalty}
            </div>
          </div>
          <label className="macro-select-label">
            Focus region
            <select className="macro-select" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
              {macroMapFeatures.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="card macro-card">
          <h3 className="macro-card-title">Resource Wealth vs. GDP Capture</h3>
          <p className="macro-card-hint">Specialized paradox module — reinvestment score (modelled).</p>
          <div className="macro-chart-wrap">
            <ResponsiveContainer width="100%" height="100%" minHeight={280}>
              <ComposedChart data={resourceGdpParadox} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} domain={[0, 100]} />
                <YAxis yAxisId="right" orientation="right" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)' }}
                  labelStyle={{ color: 'var(--text-primary)' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="resourceWealth" name="Resource wealth" fill="#0f2b5b" radius={[4, 4, 0, 0]} />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="stateGdpPerCapitaIndex"
                  name="GDP capture index"
                  stroke="#c39c5b"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="reinvestmentScore"
                  name="Reinvestment priority"
                  stroke="#16a34a"
                  strokeDasharray="4 4"
                  strokeWidth={2}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 macro-middle-grid">
        <div className="card macro-card">
          <h3 className="macro-card-title">Development vs. Investment Quadrant</h3>
          <p className="macro-card-hint">Red zones: high spend / low outcome. Blue zones: low spend / high impact.</p>
          <div className="macro-chart-wrap macro-chart-tall">
            <ResponsiveContainer width="100%" height="100%" minHeight={320}>
              <ScatterChart margin={{ top: 16, right: 16, bottom: 16, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis type="number" dataKey="spend" name="Spend" unit="%" domain={[0, 100]} tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <YAxis type="number" dataKey="outcome" name="Outcome" unit="%" domain={[0, 100]} tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
                <ZAxis type="number" range={[120, 400]} />
                <ReferenceLine x={55} stroke="#94a3b8" strokeDasharray="3 3" />
                <ReferenceLine y={55} stroke="#94a3b8" strokeDasharray="3 3" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)' }}
                />
                <Scatter name="Regions" data={scatterData}>
                  {scatterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="macro-legend-row">
            <span className="badge badge-red">Red zone</span>
            <span className="badge badge-blue">Blue zone</span>
            <span className="badge" style={{ background: '#dcfce7', color: '#166534' }}>
              Efficient
            </span>
          </div>
        </div>

        <div className="card macro-card macro-map-card">
          <h3 className="macro-card-title">
            <MapPin size={18} style={{ verticalAlign: 'text-bottom', marginRight: 6 }} />
            Map-Based Engine (National → District)
          </h3>
          <p className="macro-card-hint">
            Interactive geographic engine with paradox highlighting. 3D presentation is simulated via perspective shell;
            data layers remain analytically rigorous.
          </p>
          <div className="map-container macro-map-shell">
            <IndiaMap features={macroMapFeatures} layers={layers} focus={focus} />
          </div>
        </div>
      </div>
    </div>
  );
}
