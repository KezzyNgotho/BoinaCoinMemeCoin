import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingScreen from './pages/LandingPage';
import AboutSection from './pages/AboutSection';
import TokenomicsSection from './pages/TokenomicsSection';
import HowToBuySection from './pages/HowToBuySection';
import Roadmap from './pages/RoadMapSection';
import Whitepaper from './pages/WhitePaperScreen';
import WhitepaperScreen from './pages/WhitePaperScreen';


export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="About" element={<AboutSection />} />
          <Route path="Tokenomics" element={<TokenomicsSection />} />
          <Route path="Buy" element={<HowToBuySection />} />
          <Route path="Roadmap" element={<Roadmap />} />
          <Route path="whitepaper" element={<WhitepaperScreen />} />
        </Routes>
      </div>
    </Router>
  );
}
