import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Landmark, 
  LayoutDashboard, 
  Map, 
  FlaskConical, 
  Compass, 
  Siren, 
  MessageSquareText 
} from 'lucide-react';

const Navigation = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="brand-title">
          <Landmark size={28} />
          Aegis Fiscal
        </div>
        <div className="brand-subtitle">Statecraft & Governance Suite</div>
      </div>
      
      <nav className="nav-menu">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <LayoutDashboard size={20} />
          Executive Overview
        </NavLink>
        
        <NavLink to="/macro-allocation" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <Map size={20} />
          Macro-Allocation Center
        </NavLink>
        
        <NavLink to="/scenario-sandbox" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <FlaskConical size={20} />
          Scenario Sandbox
        </NavLink>

        <NavLink to="/cultural-constraints" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <Compass size={20} />
          Cultural Constraints
        </NavLink>

        <NavLink to="/crisis-mode" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <Siren size={20} />
          Crisis Response
        </NavLink>

        <NavLink to="/ai-advisor" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <MessageSquareText size={20} />
          AI Policy Advisor
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
