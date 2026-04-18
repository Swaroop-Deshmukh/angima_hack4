import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import ExecutiveOverview from './pages/ExecutiveOverview';
import MacroAllocation from './pages/MacroAllocation';
import ScenarioSandbox from './pages/ScenarioSandbox';
import CulturalConstraints from './pages/CulturalConstraints';
import CrisisMode from './pages/CrisisMode';
import AIPolicyAdvisor from './pages/AIPolicyAdvisor';

function App() {
  const location = useLocation();

  // Determine current theme based on route
  const getThemeClass = () => {
    if (location.pathname === '/scenario-sandbox') return 'theme-dark';
    if (location.pathname === '/crisis-mode') return 'theme-emergency';
    return '';
  };

  React.useEffect(() => {
    document.body.className = getThemeClass();
  }, [location.pathname]);

  return (
    <div className={`app-container ${getThemeClass()}`}>
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<ExecutiveOverview />} />
          <Route path="/macro-allocation" element={<MacroAllocation />} />
          <Route path="/scenario-sandbox" element={<ScenarioSandbox />} />
          <Route path="/cultural-constraints" element={<CulturalConstraints />} />
          <Route path="/crisis-mode" element={<CrisisMode />} />
          <Route path="/ai-advisor" element={<AIPolicyAdvisor />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
