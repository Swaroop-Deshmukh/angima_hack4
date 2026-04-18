import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { recentAllocations, transparencyTotalCr } from '../data/mockData';
import { Building2, Landmark, GraduationCap, Cross, MapPin, ChevronRight } from 'lucide-react';
import NationalGrowthClock from '../components/NationalGrowthClock';

const TICKER_ITEMS = [
  { k: 'gdp', text: 'GDP Growth (est.): 6.78%', pos: true },
  { k: 'sector', text: 'Sectoral Spend (live ledger): ₹ 1.24 Lakh Cr' },
  { k: 'fei', text: 'Fiscal Efficiency Index: +12 pts vs. FY24–25 baseline', pos: true },
  { k: 'deficit', text: 'Consolidated deficit trajectory: within sovereign corridor' },
  { k: 'wb', text: 'World Bank elasticity priors: synchronized' },
  { k: 'obi', text: 'OpenBudgetsIndia reconciliation: scheduled T+6h' },
];

export default function ExecutiveOverview() {
  const tickerDup = useMemo(() => [...TICKER_ITEMS, ...TICKER_ITEMS], []);

  return (
    <div className="executive-landing fade-in">
      <section className="executive-hero">
        <div className="executive-hero-copy">
          <p className="executive-eyebrow">Aegis Fiscal · Statecraft & Governance Suite</p>
          <h1 className="executive-hero-title">The Executive Overview</h1>
          <p className="executive-hero-lead">
            Sovereign resource allocation guided by evidence, equity, and fiscal discipline. This command surface
            unifies central planning with district-level accountability—without sacrificing the dignity of public
            stewardship.
          </p>
          <div className="executive-hero-actions">
            <Link to="/macro-allocation" className="btn btn-primary">
              Enter Macro Command Center <ChevronRight size={18} />
            </Link>
            <Link to="/scenario-sandbox" className="btn btn-outline executive-hero-outline">
              Open Scenario Sandbox
            </Link>
          </div>
        </div>
        <NationalGrowthClock />
      </section>

      <p className="section-subtitle executive-vision">
        <strong>The Vision.</strong> Data-driven equity in resource distribution: every rupee traceable, every trade-off
        explicit, every district visible on the same national canvas—subject to cultural and ecological constraints
        codified in the Gondia Protocol.
      </p>

      <div className="ticker-wrap executive-ticker" aria-label="Live fiscal metrics ticker">
        <div className="ticker-track">
          {tickerDup.map((item, i) => (
            <span key={`${item.k}-${i}`} className="ticker-item">
              {item.pos ? <span className="metric-positive">▲ </span> : null}
              {item.text}
            </span>
          ))}
        </div>
      </div>

      <h2 className="section-title executive-section-heading">Three-Tier Entry</h2>
      <p className="section-subtitle">Select a level of oversight. Each route preserves audit trails to district wallets.</p>

      <div className="grid grid-cols-3 executive-tier-grid">
        <Link to="/macro-allocation?tier=central" className="card executive-tier-card executive-tier-central">
          <div className="executive-tier-head">
            <h3 className="stat-label">Central Tier</h3>
            <Landmark size={24} className="executive-tier-icon" aria-hidden />
          </div>
          <div className="stat-value">₹ 4.5L Cr</div>
          <p className="executive-tier-desc">Defence, inter-state transfers, national corridors, and sovereign buffers.</p>
          <span className="executive-tier-cta">Drill down <ChevronRight size={16} /></span>
        </Link>

        <Link to="/macro-allocation?tier=state" className="card executive-tier-card executive-tier-state">
          <div className="executive-tier-head">
            <h3 className="stat-label">State Tier</h3>
            <Building2 size={24} className="executive-tier-icon" aria-hidden />
          </div>
          <div className="stat-value">₹ 2.8L Cr</div>
          <p className="executive-tier-desc">Regional competitiveness, higher education, trunk infrastructure, and welfare co-design.</p>
          <span className="executive-tier-cta">Drill down <ChevronRight size={16} /></span>
        </Link>

        <Link to="/macro-allocation?tier=district" className="card executive-tier-card executive-tier-district">
          <div className="executive-tier-head">
            <h3 className="stat-label">District Tier</h3>
            <MapPin size={24} className="executive-tier-icon" aria-hidden />
          </div>
          <div className="stat-value">₹ 84K Cr</div>
          <p className="executive-tier-desc">Hyper-local delivery, primary care, schools, and last-mile digital wallets.</p>
          <span className="executive-tier-cta">Drill down <ChevronRight size={16} /></span>
        </Link>
      </div>

      <div className="card executive-transparency">
        <div className="executive-transparency-head">
          <h2 className="executive-transparency-title">Citizen Transparency Feed</h2>
          <span className="badge badge-gold">Last ₹{transparencyTotalCr.toFixed(1)} Cr</span>
        </div>
        <p className="executive-transparency-sub">
          Major categories per citizen charter: Healthcare and Education allocations are surfaced first; full ledger
          reconciles with OpenBudgetsIndia staging.
        </p>

        <div className="executive-feed">
          {recentAllocations.map((alloc) => (
            <div key={alloc.id} className="executive-feed-row">
              <div className="executive-feed-left">
                {alloc.sector === 'Healthcare' ? (
                  <Cross size={20} className="executive-feed-icon healthcare" aria-hidden />
                ) : alloc.sector === 'Education' ? (
                  <GraduationCap size={20} className="executive-feed-icon education" aria-hidden />
                ) : (
                  <Building2 size={20} className="executive-feed-icon" aria-hidden />
                )}
                <div>
                  <div className="executive-feed-title">
                    {alloc.district} · {alloc.sector}
                  </div>
                  <div className="executive-feed-purpose">{alloc.purpose}</div>
                </div>
              </div>
              <div className="executive-feed-right">
                <div className="executive-feed-amount">{alloc.amountLabel}</div>
                <div className="executive-feed-time">{alloc.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
