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
import BsmDashboard from './pages/bsm/BsmDashboard';
import AdLandingPage from './pages/AdLandingPage';
import BranchDetails from './pages/BranchDetails';
import ServiceDetails from './pages/ServiceDetails';
import LeadDetails from './pages/agent/LeadDetails';
import NewLead from './pages/agent/NewLead';
import Blog from './pages/Blog';
import ScrollToTop from './components/common/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname.startsWith('/lp/');

  return (
    <div className="flex flex-col min-h-screen font-inter">
      <ScrollToTop />
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
              <ProtectedRoute allowedRoles={['sales_person']}>
                <AgentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/agent/lead/new" 
            element={
              <ProtectedRoute allowedRoles={['sales_person', 'admin']}>
                <NewLead />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/agent/lead/:id" 
            element={
              <ProtectedRoute allowedRoles={['sales_person', 'bsm', 'admin']}>
                <LeadDetails />
              </ProtectedRoute>
            } 
          />
          
          {/* BSM PORTAL */}
          <Route 
            path="/bsm/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['bsm']}>
                <BsmDashboard />
              </ProtectedRoute>
            } 
          />

          {/* ADMIN PORTAL */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/leads" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLeads />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/agents" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
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

import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
