import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminTabs from '../../components/admin/AdminTabs';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://swayamfin.onrender.com' : 'http://localhost:5001');

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalDisbursed: 0,
    activeAgents: 0,
    conversionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('swayamfin_token');
      if (!token) throw new Error('Session expired. Please login again.');

      const [leadsRes, usersRes] = await Promise.all([
        axios.get(`${API_URL}/api/leads`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/api/users`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      const leads = leadsRes.data.data || [];
      const users = usersRes.data.data || [];

      const disbursed = leads
        .filter(l => l.status === 'Disbursed' || l.status === 'Closed - Won')
        .reduce((sum, l) => sum + (Number(l.loan_amount_required) || 0), 0);

      const wonCount = leads.filter(l => l.status === 'Closed - Won' || l.status === 'Disbursed').length;

      setStats({
        totalLeads: leads.length,
        totalDisbursed: disbursed,
        activeAgents: users.filter(u => u.role === 'sales_person' || u.role === 'agent').length,
        conversionRate: leads.length > 0 ? Math.round((wonCount / leads.length) * 100) : 0
      });
    } catch (err) {
      console.error('Fetch Stats Error:', err);
      setError(err.response?.data?.message || err.message || 'Node connection error. Please verify backend status.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
       <div className="w-12 h-12 border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9] rounded-full animate-spin" />
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Initializing Core...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center space-y-6">
       <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-2xl">!</div>
       <div className="space-y-2">
         <h2 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">System Outage</h2>
         <p className="text-slate-500 text-sm font-medium italic max-w-md">{error}</p>
       </div>
       <button onClick={fetchStats} className="btn-primary py-3 px-8 text-xs">Reconnect Node</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 px-4 md:px-8 lg:px-12 pt-24 md:pt-32 pb-32">
      <div className="max-w-7xl mx-auto">
        <AdminTabs />
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 px-2">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
                 <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Swayamfin Intelligence Node</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-[#1E293B] tracking-tighter uppercase leading-none">
                 Revenue <span className="text-[#0EA5E9] italic">Command.</span>
              </h1>
           </div>
          <div className="flex flex-wrap gap-3">
             <Link to="/admin/agents" className="bg-white border border-slate-200 px-4 py-3 rounded-xl hover:bg-slate-50 transition-all text-[10px] font-black uppercase tracking-widest text-[#0EA5E9]">
               Manage Team
             </Link>
              <button onClick={fetchStats} className="bg-white border border-slate-200 p-4 rounded-xl hover:bg-slate-50 transition-all text-xs font-bold uppercase tracking-widest text-slate-400">Sync Data</button>
           </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Link to="/admin/leads" className="contents">
            <KPICard title="Total Portfolio" value={stats.totalLeads} sub="Live Leads" />
          </Link>
          <KPICard title="Disbursement" value={`₹${(stats.totalDisbursed/10000000).toFixed(2)}Cr`} sub="Cumulative" color="emerald" />
          <Link to="/admin/agents" className="contents">
            <KPICard title="Team Members" value={stats.activeAgents} sub="Active Agents" />
          </Link>
          <KPICard title="Yield (Win%)" value={`${stats.conversionRate}%`} sub="Target 25%" color="rose" />
        </div>

        {/* Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 bg-white border border-slate-100 p-6 md:p-10 rounded-[40px] md:rounded-[48px] shadow-sm relative overflow-hidden group">
              <div className="flex justify-between items-center mb-12">
                 <div>
                    <h3 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Growth Velocity</h3>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Disbursement Volume Spectrum</p>
                 </div>
                 <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0EA5E9] font-bold">V</div>
              </div>
              <div className="h-64 flex items-end gap-3 justify-between">
                 {[40, 60, 45, 80, 55, 90, 70, 85, 50, 95].map((h, i) => (
                   <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full">
                     <div className="flex-1 w-full flex items-end">
                       <motion.div 
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        className="w-full bg-[#0EA5E9]/10 group-hover:bg-[#0EA5E9] rounded-t-xl transition-all duration-700"
                       />
                     </div>
                     <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Node {i+1}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-[#1E293B] p-6 md:p-10 rounded-[40px] md:rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#0EA5E9]/10 blur-3xl rounded-full -mr-20 -mt-20" />
              <div>
                 <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Regional Hubs</h3>
                 <div className="space-y-6">
                    {['Agra', 'Mathura', 'Hathras', 'Kosi'].map((city, i) => (
                       <Link to={`/branches/${city.toLowerCase()}`} key={i} className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-4">
                          <span className="font-black text-sm uppercase tracking-widest text-white">{city} Hub</span>
                          <span className="text-slate-500 group-hover:text-[#0EA5E9] transition-all">→</span>
                       </Link>
                    ))}
                 </div>
              </div>
              <button className="w-full py-5 bg-white text-[#1E293B] rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] mt-12 hover:bg-[#0EA5E9] hover:text-white transition-all">
                 Network Audit
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, sub, color }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="bg-white border border-slate-100 p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
  >
    <div className="absolute top-0 right-10 w-24 h-24 bg-slate-50 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-[#0EA5E9]/10 transition-all" />
    <div className="relative z-10">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 italic">{title}</p>
      <h3 className="text-3xl font-black text-[#1E293B] tracking-tighter leading-none mb-2">{value}</h3>
      <p className={`text-[10px] font-black uppercase tracking-widest ${color === 'rose' ? 'text-rose-500' : color === 'emerald' ? 'text-emerald-500' : 'text-[#0EA5E9]'}`}>{sub}</p>
    </div>
  </motion.div>
);

export default AdminDashboard;
