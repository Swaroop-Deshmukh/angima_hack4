import React from 'react';
import { TreePine, Sprout, AlertTriangle, LandPlot } from 'lucide-react';

const CulturalConstraints = () => {
  return (
    <div>
      <h1 className="section-title">Cultural & Geographic Constraints</h1>
      <p className="section-subtitle"> The "Gondia" Protocol: Respecting heritage and social fabric in development.</p>

      <div className="grid grid-cols-2" style={{ marginBottom: '24px' }}>
        <div className="card" style={{ position: 'relative' }}>
          <h3 style={{ marginBottom: '16px', fontWeight: '600' }}>Social Fabric Mapping</h3>
          <div className="map-container" style={{ height: '300px', backgroundColor: '#e2e8f0', backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
            <div style={{ position: 'absolute', top: '40%', left: '30%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div style={{ padding: '8px', backgroundColor: 'rgba(239, 68, 68, 0.9)', color: 'white', borderRadius: '4px', fontSize: '12px' }}>
                <AlertTriangle size={16} style={{ display: 'inline', marginRight: '4px' }} />
                High Resistance Index (Tribal Land)
              </div>
            </div>
          </div>
          <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Map overlays highlight tribal lands, forests, and heritage zones. Industrial zoning is automatically blocked in red areas.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="card" style={{ borderLeft: '4px solid #16a34a' }}>
            <h3 style={{ marginBottom: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sprout size={20} color="#16a34a" /> Addressed: "Correct-Path Development"
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Instead of an industrial factory, AI suggests tailored sustainable growth paths.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ padding: '12px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', flex: 1 }}>
                <strong>Sustainable Ecotourism</strong>
                <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '4px' }}>Budget: 15.2 Cr (Recommended)</div>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', flex: 1 }}>
                <strong>Agro-Processing</strong>
                <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '4px' }}>Budget: 12.0 Cr (Recommended)</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <LandPlot size={20} color="var(--accent-gold)" /> Natural Resource Overlay
            </h3>
            <ul style={{ fontSize: '14px', color: 'var(--text-secondary)', listStyleType: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><TreePine size={16} /> Forest Cover Protection</span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>100% Intact</span>
              </li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ display: 'inline-block', width: '16px', height: '16px', backgroundColor: '#3b82f6', borderRadius: '50%' }}></span> Water Bodies</span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>No Conflict</span>
              </li>
              <li style={{ padding: '8px 0', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span style={{ display: 'inline-block', width: '16px', height: '16px', backgroundColor: '#374151', borderRadius: '2px' }}></span> Coal Mines Buffer</span>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Active Checks Passed</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CulturalConstraints;
