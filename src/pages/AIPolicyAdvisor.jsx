import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Trophy } from 'lucide-react';

const AIPolicyAdvisor = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Welcome, Honorable Minister. How may I assist your policy formulation today?' }
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  const handleSend = () => {
    if(!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'Analyzing historical dataset and cultural constraints... \n\nTo improve Chhattisgarh’s GDP without displacing tribal communities, I recommend a 5-step roadmap:\n1. Re-route 15% of infrastructure to Agro-Processing.\n2. Establish Ecotourism in the Southern Belt.\n3. Deploy decentralized solar grids instead of large plants.\n4. Invest in local skill-development for non-timber forest produce.\n5. Guarantee Minimum Support Price for minor forest products.' }]);
    }, 1500);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h1 className="section-title">The AI Policy Advisor</h1>
        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} /> Generate Cabinet Gazette PDF
        </button>
      </div>
      <p className="section-subtitle">Dignitary-toned LLM interface with Inter-Region Competition dynamics.</p>

      <div className="grid grid-cols-2-1" style={{ height: 'calc(100vh - 200px)' }}>
        
        {/* Chat UI */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '0' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(15, 43, 91, 0.02)' }}>
            <h3 style={{ fontWeight: '600' }}>Policy Formulation Chat</h3>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role === 'ai' ? 'chat-ai' : 'chat-user'}`}>
                {m.text.split('\n').map((line, idx) => (
                  <p key={idx} style={{ marginBottom: '4px' }}>{line}</p>
                ))}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="e.g. How do I improve Chhattisgarh’s GDP without displacing tribal communities?"
              style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
            />
            <button className="btn btn-primary" onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Trophy size={24} color="var(--accent-gold)" />
            <h3 style={{ fontWeight: '600' }}>Inter-Region Leaderboard</h3>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Ranked on "Budget Utilization Efficiency". Top performers earn "Performance Bonuses".
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', padding: '12px', border: '1px solid var(--accent-gold)', borderRadius: '8px', backgroundColor: '#fefce8' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent-gold)', width: '32px' }}>1</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600' }}>Indore</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Efficiency Base: 94/100</div>
              </div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#16a34a' }}>+15% Bonus</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-secondary)', width: '32px' }}>2</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600' }}>Surat</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Efficiency Base: 91/100</div>
              </div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#16a34a' }}>+10% Bonus</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-secondary)', width: '32px' }}>3</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600' }}>Pune</div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Efficiency Base: 88/100</div>
              </div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#16a34a' }}>+5% Bonus</div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AIPolicyAdvisor;
