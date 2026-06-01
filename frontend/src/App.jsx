import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AgentDashboard from './pages/AgentDashboard';
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
import AdminAgentDetails from './pages/admin/AdminAgentDetails';
import BsmDashboard from './pages/bsm/BsmDashboard';
import AdLandingPage from './pages/AdLandingPage';
import EmployeePortal from './pages/EmployeePortal';
import BranchDetails from './pages/BranchDetails';
import ServiceDetails from './pages/ServiceDetails';
import LeadDetails from './pages/agent/LeadDetails';
import NewLead from './pages/agent/NewLead';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import BlogAdmin from './pages/BlogAdmin';
import AdminBlogs from './pages/AdminBlogs';
import ScrollToTop from './components/common/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';
import Chatbot from './components/common/Chatbot';

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname.startsWith('/lp/') || location.pathname === '/emp-portal';

  return (
    <div className="flex flex-col min-h-screen">
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
          
          <Route path="/services" element={<ServiceDetails />} />
          <Route path="/services/:slug" element={<ServiceDetails />} />
          <Route path="/msme-loans" element={<ServiceDetails />} />
          <Route path="/lap" element={<ServiceDetails />} />
          <Route path="/housing" element={<ServiceDetails />} />
          <Route path="/supply-chain" element={<ServiceDetails />} />

          <Route path="/branches" element={<Branches />} />
          <Route path="/branches/:slug" element={<BranchDetails />} />
          
          {/* Legacy Google Sitelink Redirects */}
          <Route path="/blog-financo" element={<Blog />} />
          <Route path="/blog/financo" element={<Blog />} />
          <Route path="/financo/blog.html" element={<Blog />} />
          
          {/* Service Specific Legacy Redirects */}
          <Route path="/financo" element={<ServiceDetails />} />
          <Route path="/financo/index.html" element={<ServiceDetails />} />
          <Route path="/financo/:any" element={<ServiceDetails />} />

          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/blog-admin" element={<BlogAdmin />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />

          <Route path="/compliance" element={<Compliance />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/grievance" element={<Grievance />} />
          <Route path="/agent/login" element={<Login />} />
          <Route path="/lp/:slug" element={<AdLandingPage />} />
          <Route path="/emp-portal" element={<EmployeePortal />} />
          
          {/* Protected Portal Routes inside ErrorBoundary */}
          <Route 
            path="/agent/dashboard" 
            element={
              <ErrorBoundary>
                <ProtectedRoute allowedRoles={['sales_person']}>
                  <AgentDashboard />
                </ProtectedRoute>
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/agent/lead/new" 
            element={
              <ErrorBoundary>
                <ProtectedRoute allowedRoles={['sales_person', 'admin']}>
                  <NewLead />
                </ProtectedRoute>
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/agent/lead/:id" 
            element={
              <ErrorBoundary>
                <ProtectedRoute allowedRoles={['sales_person', 'bsm', 'admin']}>
                  <LeadDetails />
                </ProtectedRoute>
              </ErrorBoundary>
            } 
          />
          
          <Route 
            path="/bsm/dashboard" 
            element={
              <ErrorBoundary>
                <ProtectedRoute allowedRoles={['bsm']}>
                  <BsmDashboard />
                </ProtectedRoute>
              </ErrorBoundary>
            } 
          />

          <Route 
            path="/admin/dashboard" 
            element={
              <ErrorBoundary>
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/admin/leads" 
            element={
              <ErrorBoundary>
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLeads />
                </ProtectedRoute>
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/admin/agents" 
            element={
              <ErrorBoundary>
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminAgents />
                </ProtectedRoute>
              </ErrorBoundary>
            } 
          />
          <Route 
            path="/admin/agents/:id" 
            element={
              <ErrorBoundary>
                <ProtectedRoute allowedRoles={['admin', 'bsm']}>
                  <AdminAgentDetails />
                </ProtectedRoute>
              </ErrorBoundary>
            } 
          />

          {/* Catch-all route */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-[60vh] p-10">
              <h1 className="text-6xl font-black text-slate-900 mb-4">404</h1>
              <p className="text-slate-500 mb-8 font-bold uppercase tracking-widest">Page Deployment Failed</p>
              <Link to="/" className="btn-primary">Return Foundation</Link>
            </div>
          } />
        </Routes>
      </main>
      {!isLandingPage && <Footer />}
      <Chatbot />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
