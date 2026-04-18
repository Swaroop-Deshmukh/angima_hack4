import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap } from 'lucide-react';

const ScenarioSandbox = () => {
  const [healthVal, setHealthVal] = useState(10);
  const [welfareCost, setWelfareCost] = useState(500);

  // Generate dynamic chart data based on health slider
  const chartData = [
    { year: '2024', health: 400, infra: 800 },
    { year: '2025', health: 400 + (healthVal * 10), infra: 800 - (healthVal * 8) },
    { year: '2026', health: 400 + (healthVal * 15), infra: 800 - (healthVal * 10) },
    { year: '2027', health: 400 + (healthVal * 20), infra: 800 - (healthVal * 16) },
  ];

  return (
    <div>
      {/* Note: the theme-dark is applied by App.jsx based on route */}
      <h1 className="section-title" style={{ color: 'var(--text-primary)' }}>Scenario Sandbox</h1>
      <p className="section-subtitle"> The "What-If" Engine determining opportunity costs and long-term vitality.</p>

      <div className="grid grid-cols-2-1" style={{ marginBottom: '24px' }}>
        
        {/* Left: Curves & Sliders */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontWeight: '600' }}>Budget Reallocation Slider</h3>
            <span className="badge badge-blue">Real-time Recalculation</span>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Increase Healthcare Budget (%)</span>
              <span style={{ color: 'var(--accent-neon-green)', fontWeight: '700' }}>+{healthVal}%</span>
            </label>
            <input 
              type="range" 
              min="0" max="50" 
              value={healthVal} 
              onChange={(e) => setHealthVal(e.target.value)} 
              className="slider-input" 
            />
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '8px' }}>
              Opportunity Cost Warning: Infrastructure budget will be reduced proportionally.
            </p>
          </div>

          <div style={{ height: '300px', width: '100%', marginTop: 'auto' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorHealth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-neon-green)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--accent-neon-green)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInfra" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" stroke="var(--text-secondary)" />
                <YAxis stroke="var(--text-secondary)" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)' }} />
                <Area type="monotone" dataKey="health" stroke="var(--accent-neon-green)" fillOpacity={1} fill="url(#colorHealth)" name="Health Outcome" />
                <Area type="monotone" dataKey="infra" stroke="#ef4444" fillOpacity={1} fill="url(#colorInfra)" name="Infra Capability" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Freebies & XAI */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="card" style={{ borderColor: 'var(--accent-neon-green)' }}>
            <h3 style={{ fontWeight: '600', marginBottom: '16px' }}>Freebie Impact Analyzer</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Simulate Welfare Schemes.
            </p>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>Subsidy Cost (Cr)</label>
              <input 
                type="number" 
                value={welfareCost}
                onChange={(e) => setWelfareCost(e.target.value)}
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.2)', color: 'white' }}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
              <div style={{ padding: '8px', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '4px', border: '1px solid #ef4444' }}>
                <span style={{ color: '#ef4444', display: 'block', fontSize: '12px' }}>+ Fiscal Deficit</span>
                +{(welfareCost * 0.12).toFixed(1)}%
              </div>
              <div style={{ padding: '8px', backgroundColor: 'rgba(34, 197, 94, 0.1)', borderRadius: '4px', border: '1px solid #22c55e' }}>
                <span style={{ color: '#22c55e', display: 'block', fontSize: '12px' }}>Sat. Score</span>
                +{(welfareCost * 0.05).toFixed(1)} pts
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontWeight: '600', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={18} color="var(--accent-neon-green)" />
              XAI Explanation
            </h3>
            <div style={{ padding: '16px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: '1.6' }}>
              "Increasing Education budget in District X is prioritized over Industrialization due to a 40% youth demographic and cultural resistance to land acquisition."
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ScenarioSandbox;
