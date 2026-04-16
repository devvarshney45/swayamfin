import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AgentDashboard from './pages/AgentDashboard';
import MSMELoans from './pages/MSMELoans';
import SupplyChain from './pages/SupplyChain';
import LAP from './pages/LAP';
import Housing from './pages/Housing';
import Login from './pages/Login';
import About from './pages/About';
import Team from './pages/Team';
import Process from './pages/Process';
import Contact from './pages/Contact';
import Partner from './pages/Partner';
import Branches from './pages/Branches';
import Compliance from './pages/Compliance';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Grievance from './pages/Grievance';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLeads from './pages/admin/AdminLeads';
import AdminAgents from './pages/admin/AdminAgents';
import AdLandingPage from './pages/AdLandingPage';
import BranchDetails from './pages/BranchDetails';
import ServiceDetails from './pages/ServiceDetails';
import LeadDetails from './pages/agent/LeadDetails';
import Blog from './pages/Blog';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname.startsWith('/lp/');

  return (
    <div className="flex flex-col min-h-screen font-inter">
      {!isLandingPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/process" element={<Process />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/become-a-partner" element={<Partner />} />
          
          {/* Services Hub & Individual Pages */}
          <Route path="/services" element={<MSMELoans />} /> {/* Temporary hub redirect */}
          <Route path="/services/:slug" element={<ServiceDetails />} />
          <Route path="/msme-loans" element={<ServiceDetails />} /> {/* Legacy support */}
          <Route path="/lap" element={<ServiceDetails />} />
          <Route path="/housing" element={<ServiceDetails />} />
          <Route path="/supply-chain" element={<ServiceDetails />} />

          {/* Branches Listing & City Pages */}
          <Route path="/branches" element={<Branches />} />
          <Route path="/branches/:slug" element={<BranchDetails />} />
          <Route path="/blog" element={<Blog />} />

          <Route path="/compliance" element={<Compliance />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/grievance" element={<Grievance />} />
          <Route path="/agent/login" element={<Login />} />
          <Route path="/lp/:slug" element={<AdLandingPage />} />
          <Route 
            path="/agent/dashboard" 
            element={
              <ProtectedRoute>
                <AgentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/agent/lead/:id" 
            element={
              <ProtectedRoute>
                <LeadDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/leads" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminLeads />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/agents" 
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminAgents />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      {!isLandingPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
