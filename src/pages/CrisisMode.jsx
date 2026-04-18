import React, { useMemo, useState } from 'react';
import { ShieldAlert, CloudRain, Truck, PowerOff, Wallet, Droplets, Fuel, Activity } from 'lucide-react';
import { crisisFeeds } from '../data/mockData';

const CRISIS_TYPES = [
  { id: 'pandemic', label: 'Pandemic', icon: Activity },
  { id: 'flood', label: 'Flood', icon: Droplets },
  { id: 'fuel', label: 'Fuel Crisis', icon: Fuel },
];

export default function CrisisMode() {
  const [isActive, setIsActive] = useState(false);
  const [crisis, setCrisis] = useState('pandemic');

  const copy = useMemo(() => {
    if (crisis === 'flood')
      return {
        title: 'MONSOON / FLOOD ALERT — ACTIVE CHANNEL',
        detail: 'Sovereign buffers prioritise Assam Valley and coastal Odisha clusters; luxury capex frozen.',
      };
    if (crisis === 'fuel')
      return {
        title: 'FUEL SHOCK — LOGISTICS EMERGENCY',
        detail: 'Strategic petroleum reserve draw authorised (simulation); district diesel subsidies staged via digital wallets.',
      };
    return {
      title: 'PANDEMIC / HEALTH EMERGENCY — ACTIVE CHANNEL',
      detail: 'Luxury infrastructure frozen; field hospitals and oxygen logistics prioritised.',
    };
  }, [crisis]);

  return (
    <div className="crisis-page">
      <div className="crisis-header">
        <div>
          <h1 className="section-title crisis-title">Crisis Mode & Real-Time Response</h1>
          <p className="section-subtitle crisis-sub">The Bhopal-level readiness protocol — dynamic reprioritisation and logistics attestation.</p>
        </div>
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className={`btn crisis-toggle ${isActive ? 'crisis-toggle-on pulsing-alert' : ''}`}
        >
          <ShieldAlert size={20} aria-hidden />
          {isActive ? 'Deactivate Crisis Mode' : 'Engage Crisis Mode'}
        </button>
      </div>

      <div className="crisis-type-bar" role="tablist" aria-label="Crisis scenario">
        {CRISIS_TYPES.map((c) => {
          const Icon = c.icon;
          const active = crisis === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`crisis-type-btn ${active ? 'active' : ''}`}
              onClick={() => setCrisis(c.id)}
            >
              <Icon size={18} aria-hidden />
              {c.label}
            </button>
          );
        })}
      </div>

      {isActive && (
        <div className="crisis-banner pulsing-alert" role="alert">
          <ShieldAlert className="crisis-banner-icon" size={28} aria-hidden />
          <div>
            <h4 className="crisis-banner-title">{copy.title}</h4>
            <p className="crisis-banner-text">{copy.detail}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 crisis-grid">
        <div className={`card crisis-card ${isActive ? 'crisis-card-hot' : ''}`}>
          <h3 className="crisis-card-title">
            <PowerOff size={20} className={isActive ? 'crisis-icon-warn' : ''} aria-hidden />
            Dynamic Re-prioritisation
          </h3>
          <p className="crisis-card-hint">One-click freeze on luxury infrastructure; automatic relief envelopes.</p>
          <div className="crisis-rows">
            <div className="crisis-row">
              <span>Highway Phase IV (aesthetic viaduct)</span>
              <span className={isActive ? 'crisis-frozen' : 'crisis-ok'}>{isActive ? 'Frozen' : 'Active'}</span>
            </div>
            <div className="crisis-row">
              <span>Stadium complex (non-essential)</span>
              <span className={isActive ? 'crisis-frozen' : 'crisis-ok'}>{isActive ? 'Frozen' : 'Active'}</span>
            </div>
            <div className="crisis-row">
              <span>Emergency relief & logistics</span>
              <span className="crisis-ok">{isActive ? 'Surged' : 'Standby'}</span>
            </div>
          </div>
          {isActive && <div className="crisis-divert">₹ 450 Cr diverted to emergency relief & logistics (synthetic run).</div>}
        </div>

        <div className="card crisis-card">
          <h3 className="crisis-card-title">
            <CloudRain size={20} aria-hidden />
            Seasonal Relief Predictor
          </h3>
          <p className="crisis-card-hint">
            June / July rainfall ensembles pre-position sovereign buffers in flood-prone districts before peak discharge.
          </p>
          <div className="crisis-rain-card">
            <strong>Assam — Brahmaputra belt</strong>
            <div className="crisis-rain-row">
              <span className="crisis-rain-amt">₹ 120 Cr</span>
              <span className="crisis-rain-tag">Pre-allocated buffer</span>
            </div>
            <div className="crisis-rain-row subtle">
              <span>Konkan / Western Ghats</span>
              <span>₹ 85 Cr staged</span>
            </div>
          </div>
          <ul className="crisis-feed">
            {crisisFeeds.map((f) => (
              <li key={f.id} className={`crisis-feed-item ${f.severity}`}>
                <span className="crisis-feed-src">{f.source}</span>
                {f.summary}
              </li>
            ))}
          </ul>
        </div>

        <div className="card crisis-card crisis-logistics">
          <h3 className="crisis-card-title">
            <Truck size={20} aria-hidden />
            Real-Time Logistics Tracker
          </h3>
          <p className="crisis-card-hint">Emergency funds flow to district digital wallets with cryptographic attestations.</p>
          <div className="crisis-timeline">
            <div className="crisis-tl-item done">
              <div className="crisis-tl-time">10:45</div>
              <div className="crisis-tl-body">
                <strong>Funds disbursed</strong>
                <div className="crisis-wallet">
                  <Wallet size={14} aria-hidden /> District wallet · +₹ 50 Cr (ACK)
                </div>
              </div>
            </div>
            <div className="crisis-tl-item active">
              <div className="crisis-tl-time">11:30</div>
              <div className="crisis-tl-body">
                <strong>Medical supply dispatch</strong>
                <div>40 refrigerated trucks en route to Zone A</div>
              </div>
            </div>
            <div className="crisis-tl-item pending">
              <div className="crisis-tl-time">—</div>
              <div className="crisis-tl-body">
                <strong>Last-mile distribution confirmation</strong>
                <div>Awaiting taluk nodal officer signatures</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
