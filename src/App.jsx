import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import ExecutiveOverview from './pages/ExecutiveOverview';
import MacroAllocation from './pages/MacroAllocation';
import ScenarioSandbox from './pages/ScenarioSandbox';
import CulturalConstraints from './pages/CulturalConstraints';
import CrisisMode from './pages/CrisisMode';
import AIPolicyAdvisor from './pages/AIPolicyAdvisor';

function App() {
  const location = useLocation();

  const themeClass =
    location.pathname === '/scenario-sandbox'
      ? 'theme-dark'
      : location.pathname === '/crisis-mode'
        ? 'theme-emergency'
        : '';

  React.useEffect(() => {
    document.body.className = themeClass;
  }, [themeClass]);

  return (
    <div className={`app-container ${themeClass}`}>
      <ScrollToTop />
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
