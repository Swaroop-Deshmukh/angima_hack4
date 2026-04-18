import React, { useEffect, useState } from 'react';
import { TrendingUp, Landmark, Activity } from 'lucide-react';

function formatInrLakhCr(n) {
  if (n >= 100000) return `₹ ${(n / 100000).toFixed(2)} Lakh Cr`;
  return `₹ ${(n / 1000).toFixed(2)} K Cr`;
}

export default function NationalGrowthClock() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1200);
    return () => clearInterval(id);
  }, []);

  const gdpGrowth = 6.75 + (tick % 7) * 0.01;
  const fiscalEfficiency = 112 + (tick % 5);
  const sovereignFlow = 118420 + tick * 3.1;

  return (
    <div className="growth-clock">
      <div className="growth-clock-header">
        <Landmark size={22} className="growth-clock-icon" aria-hidden />
        <div>
          <div className="growth-clock-title">National Growth Clock</div>
          <div className="growth-clock-sub">Live composite — synthetic sovereign telemetry</div>
        </div>
      </div>
      <div className="growth-clock-grid">
        <div className="growth-clock-metric">
          <div className="growth-clock-label">
            <TrendingUp size={16} /> GDP growth (est.)
          </div>
          <div className="growth-clock-value">{gdpGrowth.toFixed(2)}%</div>
        </div>
        <div className="growth-clock-metric">
          <div className="growth-clock-label">
            <Activity size={16} /> Fiscal efficiency index
          </div>
          <div className="growth-clock-value">+{fiscalEfficiency - 100}</div>
          <div className="growth-clock-hint">vs. baseline FY24–25</div>
        </div>
        <div className="growth-clock-metric growth-clock-metric-wide">
          <div className="growth-clock-label">Sectoral throughput (rolling)</div>
          <div className="growth-clock-value growth-clock-mono">{formatInrLakhCr(sovereignFlow)}</div>
        </div>
      </div>
    </div>
  );
}
