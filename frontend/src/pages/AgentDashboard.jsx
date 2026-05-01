import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const AgentDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('swayamfin_token');
      if (!token) throw new Error('Session Expired.');

      const response = await axios.get(`${API_URL}/api/leads`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setLeads(response.data.data || []);
    } catch (err) {
      console.error('Fetch Leads Error:', err);
      setError(err.response?.data?.message || err.message || 'Transmission Error.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/agent/login');
  };

  const activeLeadsCount = leads.filter(l => ['New', 'Contacted', 'In Progress', 'Document Submitted'].includes(l.status)).length;
  const actualDisbursed = leads
    .filter(l => l.status === 'Disbursed' || l.status === 'Closed - Won')
    .reduce((sum, l) => sum + (Number(l.loan_amount_required) || 0), 0);

  const monthlyTarget = 10000000; // 1 Crore target
  const targetProgress = Math.min((actualDisbursed / monthlyTarget) * 100, 100);

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.applicant_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.lead_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || l.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Contacted': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'In Progress': return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'Document Submitted': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'Sanctioned': 
      case 'Disbursed': 
      case 'Closed - Won': return 'bg-green-50 text-green-600 border-green-200';
      case 'Dead Lead': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
       <div className="w-12 h-12 border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9] rounded-full animate-spin" />
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Syncing Partner Node...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center space-y-6">
       <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-2xl">!</div>
       <div className="space-y-4">
         <h2 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Access Restricted</h2>
         <p className="text-slate-500 text-sm font-medium italic max-w-md">{error}</p>
       </div>
       <div className="flex gap-4">
          <button onClick={fetchLeads} className="btn-primary py-3 px-8 text-[10px] uppercase">Retry</button>
          <button onClick={handleLogout} className="bg-slate-100 py-3 px-8 text-[10px] uppercase font-black text-slate-500 rounded-lg">Sign Out</button>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 relative">
      {/* Header Overlay */}
      <div className="bg-white/90 border-b border-slate-100 fixed top-0 left-0 right-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
            <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
               <div className="w-12 h-12 bg-[#0EA5E9] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
                  {user?.full_name?.charAt(0) || 'A'}
               </div>
               <div>
                  <h1 className="text-xl font-black text-[#1E293B] uppercase tracking-tighter leading-none">Partner <span className="text-[#0EA5E9] italic">Hub.</span></h1>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">{user?.full_name}</p>
               </div>
            </div>
            <button onClick={handleLogout} className="self-end sm:self-auto px-4 py-2 rounded-xl bg-white border border-slate-200 text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-rose-500 hover:bg-rose-50 transition-colors">Exit Portal</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32">
        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
           <StatCard title="Total Leads" value={leads.length} sub="Cumulative" />
           <StatCard title="Active PPL" value={activeLeadsCount} sub="In Pipeline" color="blue" />
           <StatCard title="Disbursed" value={`₹${(actualDisbursed/100000).toFixed(1)}L`} sub="Approved" color="emerald" />
           <StatCard title="Success" value={(leads.length > 0 ? Math.round((leads.filter(l=>['Disbursed','Closed - Won'].includes(l.status)).length/leads.length)*100) : 0) + "%"} sub="Win Rate" color="rose" />
        </div>

        {/* Action Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
           <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-center mb-6">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Monthly Target</span>
                 <span className="text-xl font-black text-[#0EA5E9]">{targetProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                 <motion.div initial={{ width: 0 }} animate={{ width: `${targetProgress}%` }} className="h-full bg-[#0EA5E9]" />
              </div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-4 italic">₹{(actualDisbursed/100000).toFixed(1)}L / ₹1.0Cr Milestone</p>
           </div>

           <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Search cases by ID or Name..."
                className="input-standard flex-1 h-20 rounded-[28px] px-8 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={handleLogout}
                className="h-20 px-8 rounded-[28px] bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 font-black text-[10px] uppercase tracking-widest transition-all"
              >
                Exit Portal
              </button>
              <Link to="/agent/lead/new" className="btn-primary h-20 px-12 rounded-[28px] flex items-center justify-center text-[10px] uppercase tracking-widest shadow-2xl">
                 Generate New Case
              </Link>
           </div>
        </div>

        {/* List Header */}
        <div className="flex justify-between items-center mb-8 px-2">
           <h2 className="text-xl font-black text-[#1E293B] uppercase tracking-tighter">Node <span className="text-[#0EA5E9] italic text-sm">Repository</span> ({filteredLeads.length})</h2>
           <select 
             className="input-standard w-40 h-10 rounded-xl text-[10px] uppercase tracking-widest font-black appearance-none"
             value={filterStatus}
             onChange={(e) => setFilterStatus(e.target.value)}
           >
              <option value="All">All States</option>
              <option value="New">New</option>
              <option value="In Progress">Active</option>
              <option value="Disbursed">Disbursed</option>
              <option value="Dead Lead">Dead</option>
           </select>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <AnimatePresence>
             {filteredLeads.map((lead, i) => (
               <motion.div
                 key={lead._id}
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.05 }}
                 className="bg-white border border-slate-100 p-6 md:p-8 rounded-[32px] md:rounded-[40px] hover:shadow-2xl hover:border-[#0EA5E9]/30 transition-all cursor-pointer group flex flex-col justify-between"
                 onClick={() => navigate(`/agent/lead/${lead._id}`)}
               >
                  <div className="space-y-6">
                     <div className="flex justify-between items-start">
                        <span className="text-[9px] font-black text-[#0EA5E9] uppercase tracking-widest">{lead.lead_number}</span>
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${getStatusColor(lead.status)} text-center`}>{lead.status}</span>
                     </div>
                     <h3 className="text-xl font-black text-[#1E293B] group-hover:text-[#0EA5E9] transition-all uppercase tracking-tight truncate">{lead.applicant_name}</h3>
                  </div>
                  
                  <div className="pt-8 mt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Asset</p>
                        <p className="text-[10px] font-bold text-[#1E293B] uppercase truncate">{lead.loan_type?.replace('-', ' ')}</p>
                     </div>
                     <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 text-right">Amount</p>
                        <p className="text-[10px] font-black text-[#0EA5E9] text-right">₹{(lead.loan_amount_required/100000).toFixed(1)}L</p>
                     </div>
                  </div>
               </motion.div>
             ))}
           </AnimatePresence>
        </div>
        {filteredLeads.length === 0 && (
           <div className="py-32 text-center bg-white border border-slate-100 rounded-[40px] border-dashed">
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">No node data detected.</p>
           </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, sub, color }) => (
  <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-sm group hover:shadow-xl transition-all">
     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{title}</p>
     <h3 className="text-3xl font-black text-[#1E293B] tracking-tighter leading-none mb-1">{value}</h3>
     <p className={`text-[9px] font-black uppercase tracking-widest ${color === 'emerald' ? 'text-emerald-500' : color==='blue' ? 'text-blue-500' : color==='rose' ? 'text-rose-500' : 'text-slate-400'}`}>{sub}</p>
  </div>
);

export default AgentDashboard;
