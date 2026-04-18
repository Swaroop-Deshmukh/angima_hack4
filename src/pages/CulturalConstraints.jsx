import React, { useState } from 'react';
import { TreePine, Sprout, AlertTriangle, LandPlot, Shield } from 'lucide-react';
import CulturalFabricMap from '../components/CulturalFabricMap';
import { culturalZones } from '../data/mockData';

export default function CulturalConstraints() {
  const [overlay, setOverlay] = useState({ mines: true, water: true, forest: true });

  return (
    <div className="cultural-page">
      <h1 className="section-title">Cultural & Geographic Constraints</h1>
      <p className="section-subtitle">
        The <strong>Gondia Protocol</strong>: social-fabric mapping, correct-path development, and natural-resource
        overlays to keep budgets ecologically and culturally legitimate.
      </p>

      <div className="grid grid-cols-2 cultural-grid">
        <div className="card cultural-map-card">
          <div className="cultural-map-head">
            <h3 className="cultural-card-title">Social Fabric Mapping</h3>
            <span className="badge" style={{ background: '#ecfccb', color: '#3f6212' }}>
              Organic overlay
            </span>
          </div>
          <p className="cultural-card-hint">
            Soft cartography emphasising tribal lands, forests, and heritage buffers. Resistance indices modulate
            industrial eligibility.
          </p>
          <div className="map-container cultural-map-shell">
            <CulturalFabricMap zones={culturalZones} />
          </div>
          <div className="cultural-callout">
            <AlertTriangle size={18} className="cultural-callout-icon" aria-hidden />
            <div>
              <strong>Gondia corridor</strong> — resistance index elevated. Heavy industrial zoning is withheld; budgets
              default to ecotourism and agro-processing unless cabinet waives with tribal council attestations.
            </div>
          </div>
        </div>

        <div className="cultural-stack">
          <div className="card cultural-path-card">
            <h3 className="cultural-card-title">
              <Sprout size={20} color="#16a34a" aria-hidden /> Correct-Path Development
            </h3>
            <p className="cultural-card-hint">
              Where factories would violate social licence, the engine proposes sustainable alternatives with formal ROI
              envelopes.
            </p>
            <div className="cultural-path-grid">
              <div className="cultural-path-pill">
                <strong>Sustainable ecotourism</strong>
                <span>Recommended budget · ₹ 15.2 Cr</span>
                <small>Heritage interpretation, low water draw, tribal revenue share 18% (modelled).</small>
              </div>
              <div className="cultural-path-pill">
                <strong>Agro-processing</strong>
                <span>Recommended budget · ₹ 12.0 Cr</span>
                <small>Non-timber forest produce cold chains; avoids displacement.</small>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="cultural-card-title">
              <LandPlot size={20} color="var(--accent-gold)" aria-hidden /> Natural Resource Overlay
            </h3>
            <p className="cultural-card-hint">Toggle stewardship layers; conflicts block obligor lines in the ledger.</p>

            <div className="cultural-overlay-toggles">
              <label className="cultural-toggle">
                <input type="checkbox" checked={overlay.forest} onChange={() => setOverlay((o) => ({ ...o, forest: !o.forest }))} />
                <span>
                  <TreePine size={16} aria-hidden /> Forest cover & biosphere buffers
                </span>
              </label>
              <label className="cultural-toggle">
                <input type="checkbox" checked={overlay.water} onChange={() => setOverlay((o) => ({ ...o, water: !o.water }))} />
                <span>Water bodies — riparian setbacks</span>
              </label>
              <label className="cultural-toggle">
                <input type="checkbox" checked={overlay.mines} onChange={() => setOverlay((o) => ({ ...o, mines: !o.mines }))} />
                <span>Coal & mineral corridors — setback rules</span>
              </label>
            </div>

            <ul className="cultural-resource-list">
              <li>
                <span>
                  <TreePine size={16} aria-hidden /> Forest integrity
                </span>
                <span className="cultural-ok">{overlay.forest ? '100% within covenant' : 'Review required'}</span>
              </li>
              <li>
                <span>
                  <span className="dot blue" aria-hidden /> Water stress
                </span>
                <span className="cultural-ok">{overlay.water ? 'No budget conflict' : 'Riparian hold'}</span>
              </li>
              <li>
                <span>
                  <span className="dot coal" aria-hidden /> Coal mine buffer
                </span>
                <span className="cultural-ok">{overlay.mines ? 'Setbacks satisfied' : 'Paused pending survey'}</span>
              </li>
            </ul>

            <div className="cultural-seal">
              <Shield size={18} aria-hidden />
              Environmental sustainability gate: <strong>engaged</strong> — no obligor release if any layer is in
              violation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
