import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AgentDashboard from './pages/AgentDashboard';
import MSMELoans from './pages/MSMELoans';
import SupplyChain from './pages/SupplyChain';
import LAP from './pages/LAP';
import Housing from './pages/Housing';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/msme-loans" element={<MSMELoans />} />
            <Route path="/lap" element={<LAP />} />
            <Route path="/housing" element={<Housing />} />
            <Route path="/supply-chain" element={<SupplyChain />} />
            <Route path="/agent/dashboard" element={<AgentDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
