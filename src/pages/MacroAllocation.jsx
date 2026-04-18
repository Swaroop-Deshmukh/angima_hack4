import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';

const data = [
  { region: 'Bastar', spend: 80, outcome: 12, fill: '#dc2626' }, // High spend, low outcome (Red Zone)
  { region: 'Pune', spend: 90, outcome: 85, fill: '#16a34a' },
  { region: 'Gondia', spend: 30, outcome: 60, fill: '#2563eb' }, // Low spend, high impact (Blue Zone)
  { region: 'Korba', spend: 85, outcome: 30, fill: '#ea580c' },
];

const MacroAllocation = () => {
  return (
    <div>
      <h1 className="section-title">Macro-Allocation Command Center</h1>
      <p className="section-subtitle">Resource orchestration & mapping from National to District scales.</p>

      <div className="grid grid-cols-1-2" style={{ marginBottom: '24px' }}>
        <div className="card">
          <h3 style={{ marginBottom: '16px', fontWeight: '600' }}>Multi-Dataset Integration</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" defaultChecked /> Population Density
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" /> Literacy Rates
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" defaultChecked /> Infrastructure Gap
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" /> GDP Contribution
            </label>
            <hr style={{ borderColor: 'var(--border-color)', margin: '12px 0' }} />
            <div style={{ padding: '12px', backgroundColor: '#fff3cd', borderLeft: '4px solid #f59e0b', borderRadius: '4px' }}>
              <strong style={{ fontSize: '14px', color: '#854d0e' }}>Resource vs. GDP Paradox:</strong>
              <p style={{ fontSize: '12px', marginTop: '4px', color: '#a16207' }}>
                Regions like Chhattisgarh (High Minerals) show uncorrelated local GDP. 'Reinvestment Strategy' recommended.
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '16px', fontWeight: '600' }}>Development vs. Investment Quadrant</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Identifying Red Zones (High Spend/Low Outcome) and Blue Zones (Low Spend/High Impact).
          </p>
          <div style={{ height: '300px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="spend" name="Investment (Spend)" unit="%" />
                <YAxis type="number" dataKey="outcome" name="Outcome (Impact)" unit="%" />
                <ZAxis type="number" range={[100, 400]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Regions" data={data} fill="#8884d8">
                  {
                    data.map((entry, index) => (
                      <cell key={`cell-${index}`} fill={entry.fill} />
                    ))
                  }
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: '16px', fontWeight: '600' }}>3D Interactive Geographic Engine</h3>
        <div className="map-container" style={{ position: 'relative' }}>
          {/* Placeholder for real Map. We will put an image or basic Leaflet if asked, but a styled div is okay for now. */}
          <div style={{ width: '100%', height: '100%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center', color: '#64748b' }}>
              <h4 style={{ fontSize: '20px', marginBottom: '8px' }}>Map Component Initializing</h4>
              <p style={{ maxWidth: '400px' }}>National to District drill-down enabled. Highlighting High-Yield & Paradox zones.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroAllocation;
