import React from 'react';
import { recentAllocations } from '../data/mockData';
import { Building2, Landmark, GraduationCap, Cross, MapPin } from 'lucide-react';

const ExecutiveOverview = () => {
  return (
    <div className="fade-in">
      <h1 className="section-title" style={{ color: 'var(--accent-navy)' }}>The Executive Overview</h1>
      <p className="section-subtitle">Data-driven equity in resource distribution across the National grid.</p>

      {/* Live Metrics Ticker */}
      <div className="ticker-wrap" style={{ marginBottom: '32px' }}>
        <div className="ticker-content">
          <span style={{ marginRight: '64px' }}><span className="metric-positive">▲</span> GDP Growth: 6.8% (Est)</span>
          <span style={{ marginRight: '64px' }}>Real-time Sectoral Spend: ₹ 1.2 Lakh Cr.</span>
          <span style={{ marginRight: '64px' }}><span className="metric-positive">▲</span> Fiscal Efficiency Index: +12 Points</span>
          <span style={{ marginRight: '64px' }}>Current Deficit Target: On Track</span>
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ marginBottom: '40px' }}>
        <div className="card" style={{ borderTop: '4px solid #b91c1c' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="stat-label">Central Tier</h3>
            <Landmark size={24} color="#b91c1c" />
          </div>
          <div className="stat-value">₹ 4.5L Cr</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '12px' }}>
            Sovereign allocations & federal defense frameworks.
          </div>
        </div>

        <div className="card" style={{ borderTop: '4px solid var(--accent-navy)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="stat-label">State Tier</h3>
            <Building2 size={24} color="var(--accent-navy)" />
          </div>
          <div className="stat-value">₹ 2.8L Cr</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '12px' }}>
            Regional development, higher education, infra.
          </div>
        </div>

        <div className="card" style={{ borderTop: '4px solid var(--accent-gold)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="stat-label">District Tier</h3>
            <MapPin size={24} color="var(--accent-gold)" />
          </div>
          <div className="stat-value">₹ 84K Cr</div>
          <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '12px' }}>
            Hyper-local interventions, primary healthcare.
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '24px', fontSize: '24px' }}>Citizen Transparency Feed</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '14px' }}>
          Real-time ledger of the last ₹100 Crores distributed.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {recentAllocations.map(alloc => (
            <div key={alloc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--bg-color)' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                {alloc.sector === 'Healthcare' ? <Cross size={20} color="#dc2626" /> : alloc.sector === 'Education' ? <GraduationCap size={20} color="#2563eb" /> : <Building2 size={20} color="#4b5563" />}
                <div>
                  <div style={{ fontWeight: '600' }}>{alloc.district} • {alloc.sector}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{alloc.purpose}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '700', color: 'var(--accent-navy)' }}>{alloc.amount}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{alloc.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveOverview;
