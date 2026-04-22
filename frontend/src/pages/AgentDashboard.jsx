import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Search, ChevronRight, LogOut, MapPin, UserSquare2, TrendingUp, CheckCircle, XCircle, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AgentDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('swayamfin_token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001';
      const response = await fetch(`${apiUrl}/api/leads`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const result = await response.json();
      if (result.success) {
        setLeads(result.data);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/agent/login');
  };

  const activeLeadsCount = leads.filter(l => ['New', 'Contacted', 'In Progress', 'Document Submitted'].includes(l.status)).length;
  const deadLeadsCount = leads.filter(l => l.status === 'Dead Lead').length;
  const wonLeadsCount = leads.filter(l => l.status === 'Closed - Won' || l.status === 'Disbursed' || l.status === 'Sanctioned').length;

  const pipelineValue = leads
    .filter(l => ['New', 'Contacted', 'In Progress', 'Document Submitted'].includes(l.status))
    .reduce((sum, l) => sum + (l.loan_amount_required || 0), 0);

  const actualDisbursed = leads
    .filter(l => l.status === 'Disbursed' || l.status === 'Closed - Won')
    .reduce((sum, l) => sum + (l.loan_amount_required || 0), 0);

  const monthlyTarget = 10000000; // 1 Crore target
  const targetProgress = Math.min((actualDisbursed / monthlyTarget) * 100, 100);

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Contacted': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'In Progress': return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'Document Submitted': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'Sanctioned': 
      case 'Disbursed': 
      case 'Closed - Won': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Dead Lead': return 'bg-rose-50 text-rose-600 border-rose-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 font-inter text-slate-900">
      {/* Header section */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center p-0.5 border border-blue-100">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-sm">
                  <UserSquare2 className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Sales Portal
                </h1>
                <p className="text-slate-500 text-sm font-medium">{user?.full_name || 'Agent'}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-10 h-10 rounded-xl bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 flex justify-center items-center font-bold transition-all border border-slate-200 shadow-sm"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-96 shadow-sm rounded-2xl">
            <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search leads by name or number..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
            />
          </div>
          <button 
            onClick={() => navigate('/agent/lead/new')}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] transition-all"
          >
            <Plus className="w-5 h-5" />
            Generate New Case
          </button>
        </div>

        {/* Dashboard Cards Top Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-white rounded-3xl p-6 border border-slate-200 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wide mb-1">Total Leads</p>
            <h3 className="text-3xl font-black text-slate-900">{leads.length}</h3>
          </motion.div>

          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.1}} className="bg-white rounded-3xl p-6 border border-slate-200 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wide mb-1">Pipeline Value</p>
            <h3 className="text-3xl font-black text-indigo-600">₹{(pipelineValue/100000).toFixed(1)}L</h3>
          </motion.div>

          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="bg-white rounded-3xl p-6 border border-slate-200 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wide mb-1">Actual Disbursed</p>
            <h3 className="text-3xl font-black text-emerald-600">₹{(actualDisbursed/100000).toFixed(1)}L</h3>
          </motion.div>

          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.3}} className="bg-white rounded-3xl p-6 border border-slate-200 relative overflow-hidden shadow-sm">
             <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wide mb-1">Active / Dead</p>
            <h3 className="text-2xl font-black text-slate-900">{activeLeadsCount} <span className="text-rose-500 text-sm italic">/ {deadLeadsCount}</span></h3>
          </motion.div>
        </div>

        {/* Target Progress Bar */}
        <div className="mb-8 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
           <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-black text-slate-600 uppercase tracking-widest">Monthly Disbursement Target</span>
              <span className="text-sm font-black text-blue-600">{targetProgress.toFixed(1)}%</span>
           </div>
           <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${targetProgress}%` }}
                className="h-full bg-blue-600 rounded-full"
              />
           </div>
           <div className="flex justify-between mt-3">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">₹{(actualDisbursed/100000).toFixed(1)}L Achieved</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Goal: ₹1.0 Cr</span>
           </div>
        </div>

        {/* Lead List */}
        <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center">
          <TrendingUp className="w-5 h-5 mr-3 text-blue-600" />
          Recent Assignments
        </h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <AnimatePresence>
              {leads.map((lead, idx) => (
                <motion.div 
                  key={lead._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group bg-white hover:bg-[#F8FAFC] rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => navigate(`/agent/lead/${lead._id}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">{lead.lead_number}</span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{lead.applicant_name}</h3>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 group-hover:text-blue-600 text-slate-400 transition-all font-bold">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm mt-6 pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1 mt-0">Loan Type</p>
                      <p className="font-bold text-slate-700 capitalize">{lead.loan_type?.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1 mt-0">Amount Req.</p>
                      <p className="font-bold text-slate-700">₹{(lead.loan_amount_required/100000).toFixed(2)}L</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1 mt-0">Mobile</p>
                      <p className="font-bold text-slate-700">{lead.mobile}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1 mt-0">Location</p>
                      <p className="font-bold text-slate-700 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {lead.location_city}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {leads.length === 0 && (
              <div className="col-span-2 py-20 text-center flex flex-col items-center bg-white rounded-3xl border border-slate-200">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                  <CheckCircle className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No active leads</h3>
                <p className="text-slate-500 font-medium">You're all caught up for today!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;
