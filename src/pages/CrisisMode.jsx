import React, { useState } from 'react';
import { ShieldAlert, CloudRain, Truck, PowerOff, Wallet } from 'lucide-react';

const CrisisMode = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <h1 className="section-title" style={{ margin: 0 }}>Crisis Mode & Real-Time Response</h1>
        <button 
          onClick={() => setIsActive(!isActive)}
          className={`btn ${isActive ? 'pulsing-alert' : ''}`}
          style={{ 
            backgroundColor: isActive ? 'transparent' : '#b91c1c', 
            color: isActive ? '#ef4444' : 'white',
            border: isActive ? '2px solid #ef4444' : 'none',
            fontSize: '16px',
            padding: '12px 24px'
          }}
        >
          <ShieldAlert size={20} />
          {isActive ? 'DEACTIVATE CRISIS MODE' : 'ENGAGE CRISIS MODE'}
        </button>
      </div>
      <p className="section-subtitle"> The "Bhopal-Level" Readiness Protocol.</p>

      {isActive && (
        <div style={{ padding: '16px', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', marginBottom: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
          <AlertTriangle color="#ef4444" size={32} />
          <div>
            <h4 style={{ color: '#ef4444', fontWeight: '700', fontSize: '18px' }}>PANDEMIC / FLOOD ALERT ACTIVE</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Luxury infrastructure budgets are currently frozen. Sovereign Buffers engaged.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3" style={{ marginBottom: '24px' }}>
        <div className="card" style={{ borderColor: isActive ? '#ef4444' : 'var(--border-color)' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <PowerOff size={20} color={isActive ? '#ef4444' : "var(--text-secondary)"} /> 
            Dynamic Re-prioritization
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
            <span>Highway Phase 4</span>
            <span style={{ color: isActive ? '#ef4444' : '#16a34a', fontWeight: '600' }}>{isActive ? 'FROZEN' : 'ACTIVE'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
            <span>Stadium Complex</span>
            <span style={{ color: isActive ? '#ef4444' : '#16a34a', fontWeight: '600' }}>{isActive ? 'FROZEN' : 'ACTIVE'}</span>
          </div>
          {isActive && (
            <div style={{ marginTop: '16px', padding: '8px', backgroundColor: '#16a34a', color: 'white', borderRadius: '4px', fontSize: '12px', textAlign: 'center', fontWeight: '600' }}>
              ₹ 450 Cr Diverted to Emergency Relief
            </div>
          )}
        </div>

        <div className="card">
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <CloudRain size={20} color="#3b82f6" /> 
            Seasonal Predictor
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
            Based on June rainfall data, flood risks analyzed.
          </p>
          <div style={{ padding: '12px', backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '4px' }}>
            <strong style={{ display: 'block', fontSize: '14px', color: '#1d4ed8' }}>Assam Region Buffer</strong>
            <span style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>₹ 120 Cr</span>
            <span style={{ fontSize: '12px', marginLeft: '8px', color: '#16a34a' }}>Pre-allocated</span>
          </div>
        </div>

        <div className="card" style={{ gridRow: 'span 2' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Truck size={20} /> 
            Logistics Tracker
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ borderLeft: '2px solid #16a34a', paddingLeft: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>10:45 AM</div>
              <div style={{ fontWeight: '600' }}>Funds Disbursed</div>
              <div style={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}><Wallet size={14}/> District Digital Wallet: +₹ 50Cr</div>
            </div>
            <div style={{ borderLeft: '2px solid #3b82f6', paddingLeft: '12px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>11:30 AM</div>
              <div style={{ fontWeight: '600' }}>Medical Supply Dispatch</div>
              <div style={{ fontSize: '14px' }}>40 Trucks En Route to Zone A</div>
            </div>
            <div style={{ borderLeft: '2px dashed var(--border-color)', paddingLeft: '12px', opacity: 0.6 }}>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Pending</div>
              <div style={{ fontWeight: '600' }}>Local Distribution Confirmation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick shim for AlertTriangle since we use it inside the component scope without explicit outer import for it if not already there
import { AlertTriangle } from 'lucide-react';
export default CrisisMode;
