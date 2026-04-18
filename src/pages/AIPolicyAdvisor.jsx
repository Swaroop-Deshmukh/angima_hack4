import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send, FileText, Trophy } from 'lucide-react';
import { leaderboardRegions } from '../data/mockData';
import { buildGazetteDocument, downloadGazetteHtml } from '../lib/gazette';

function synthesizeReply(question) {
  const q = question.toLowerCase();
  if (q.includes('chhattisgarh') || q.includes('tribal')) {
    return `Honorable Minister, the synthesis across mineral-rich, high-resistance districts suggests a five-move portfolio:\n\n1. Re-route 15% of trunk infrastructure to agro-processing and NTFP cold chains.\n2. Stand up ecotourism concessions with mandatory tribal revenue participation.\n3. Deploy decentralised solar and micro-grids instead of greenfield thermal adjacency.\n4. Expand skills for forest-produce valorisation with MSP-style floors.\n5. Pair any industrial anchor with a legally attested rehabilitation and consent ledger.\n\nEach step is scored against the fiscal formula with cultural penalty terms active.`;
  }
  if (q.includes('deficit') || q.includes('fiscal')) {
    return `The consolidated path keeps the deficit inside the sovereign corridor by phasing welfare shocks across two half-years, swapping ceremonial capex for outcome-tied grants, and using performance bonuses from high-efficiency districts as first-loss absorbers.`;
  }
  if (q.includes('flood') || q.includes('monsoon')) {
    return `Seasonal buffers should front-load before June dispersion peaks. Recommend automatic wallet pushes to taluks exceeding hydrological risk thresholds, with luxury freezes mirrored in Crisis Mode to preserve fungibility.`;
  }
  if (q.includes('education') || q.includes('health')) {
    return `Human-capital envelopes dominate marginal welfare in youth-heavy districts. Prioritise primary completion and maternal health with digital attendance proofs; industrial incentives remain secondary until literacy gradients cross the agreed tripwire.`;
  }
  return `With the data at hand, I advise anchoring reallocations to the optimal budget law—population-weighted need, growth potential, minus cultural penalties—then stress-testing with the Random Forest ensemble calibrated on FY24–25. Please specify a state or district for a tighter roadmap.`;
}

export default function AIPolicyAdvisor() {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: 'Welcome, Honourable Official. I am the Aegis Fiscal policy advisor. Ask how to lift growth under constraint, manage deficit trade-offs, or route crisis buffers.',
    },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'ai', text: synthesizeReply(trimmed) }]);
    }, 900);
  }, [input]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleGazette = () => {
    const html = buildGazetteDocument({
      advisorMessages: messages,
      leaderboard: leaderboardRegions.map((r) => ({ name: r.name, score: r.score, bonus: r.bonus })),
      scenario: { healthcarePct: 12, educationPct: 6, infrastructurePct: -9, industrialPct: -2 },
    });
    downloadGazetteHtml(html);
  };

  return (
    <div className="advisor-page">
      <div className="advisor-header">
        <div>
          <h1 className="section-title">AI Policy Advisor & Inter-Region Competition</h1>
          <p className="section-subtitle">Dignitary-toned counsel with efficiency leaderboards and cabinet-grade exports.</p>
        </div>
        <button type="button" className="btn btn-outline advisor-gazette-btn" onClick={handleGazette}>
          <FileText size={18} aria-hidden /> Generate Gazette
        </button>
      </div>

      <div className="grid grid-cols-2-1 advisor-grid">
        <div className="card advisor-chat">
          <div className="advisor-chat-head">
            <h3 className="advisor-chat-title">Policy formulation channel</h3>
            <span className="badge badge-gold">Formal register</span>
          </div>
          <div className="advisor-chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role === 'ai' ? 'chat-ai' : 'chat-user'}`}>
                {m.text.split('\n').map((line, idx) => (
                  <p key={idx} className="advisor-chat-line">
                    {line}
                  </p>
                ))}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="advisor-chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="e.g. How do I improve Chhattisgarh’s GDP without displacing tribal communities?"
              className="advisor-input"
            />
            <button type="button" className="btn btn-primary" onClick={handleSend} aria-label="Send">
              <Send size={18} />
            </button>
          </div>
        </div>

        <div className="card advisor-board">
          <div className="advisor-board-head">
            <Trophy size={24} color="var(--accent-gold)" aria-hidden />
            <h3 className="advisor-board-title">Inter-Region Leaderboard</h3>
          </div>
          <p className="advisor-board-hint">
            Ranked on budget utilisation efficiency. Top performers earn performance bonuses in the next fiscal cycle.
          </p>
          <div className="advisor-leader-list">
            {leaderboardRegions.map((r) => (
              <div key={r.rank} className={`advisor-leader-row ${r.rank === 1 ? 'top' : ''}`}>
                <div className="advisor-rank">{r.rank}</div>
                <div className="advisor-region">
                  <div className="advisor-region-name">{r.name}</div>
                  <div className="advisor-region-meta">Efficiency {r.score}/100</div>
                </div>
                <div className="advisor-bonus">{r.bonus}</div>
              </div>
            ))}
          </div>
          <p className="advisor-export-note">
            <FileText size={14} aria-hidden /> Export Bureau: Gazette bundles AI justifications, simulations, and leaderboard
            excerpts into a printable HTML brief (save as PDF from your browser).
          </p>
        </div>
      </div>
    </div>
  );
}
