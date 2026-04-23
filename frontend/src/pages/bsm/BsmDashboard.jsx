import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, XCircle, Clock, ChevronRight, CheckCircle, Building2, LogOut } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const BsmDashboard = () => {
  const { user: authUser } = useAuth();
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('swayamfin_token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [leadsRes, usersRes] = await Promise.all([
        axios.get(`${API_URL}/api/leads`, { headers }),
        axios.get(`${API_URL}/api/users/branch`, { headers })
      ]);
      setLeads(leadsRes.data.data);
      if (usersRes.data.success) {
        setUsers(usersRes.data.data.filter(u => u.role === 'sales_person'));
      }
      setLoading(false);
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  };

  const getSpStats = (spId) => {
    const spLeads = leads.filter(l => l.assigned_to?._id === spId);
    return {
      total: spLeads.length,
      active: spLeads.filter(l => ['New', 'Contacted', 'In Progress', 'Document Submitted'].includes(l.status)).length,
      won: spLeads.filter(l => l.status === 'Closed - Won' || l.status === 'Disbursed').length,
      dead: spLeads.filter(l => l.status === 'Dead Lead').length,
    };
  };

  if (loading) return (
    <div className={`min-h-screen ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} flex items-center justify-center`}>
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    </div>
  );

  const totalLeads = leads.length;
  const activePipeline = leads.filter(l => ['New', 'Contacted', 'In Progress', 'Document Submitted'].includes(l.status)).length;
  const disbursed = leads.filter(l => l.status === 'Disbursed' || l.status === 'Closed - Won').length;
  const deadLeads = leads.filter(l => l.status === 'Dead Lead').length;

  return (
    <div className={`${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-900'} min-h-screen pb-20 font-inter transition-colors duration-300`}>
      {/* Header */}
      <div className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-sm'} border-b pt-8 pb-4 sticky top-0 z-20 backdrop-blur-xl transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-1">
             <div className="flex items-center gap-2">
                <div className="bg-blue-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest text-white shadow-sm border border-blue-700">
                  {authUser?.branch?.name || 'Main Branch'}
                </div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Branch Manager Portal</h1>
             </div>
             <button 
               onClick={() => { localStorage.removeItem('swayamfin_token'); window.location.href = '/agent/login'; }}
               className={`${isDark ? 'bg-white/5 border-white/10 text-slate-400 hover:text-rose-400' : 'bg-white border-slate-200 text-slate-500 hover:text-rose-600'} w-10 h-10 rounded-xl flex justify-center items-center transition-all border shadow-sm`}
               title="Logout"
             >
               <LogOut className="w-4 h-4" />
             </button>
          </div>
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-sm font-medium italic`}>Overview of your branch's performance</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KPICard title="Total Branch Leads" value={totalLeads} icon={<Users className="w-5 h-5 text-blue-500"/>} color="blue" isDark={isDark} />
          <KPICard title="Active Pipeline" value={activePipeline} icon={<TrendingUp className="w-5 h-5 text-indigo-500"/>} color="indigo" isDark={isDark} />
          <KPICard title="MTD Disbursed" value={disbursed} icon={<DollarSign className="w-5 h-5 text-emerald-500"/>} color="emerald" isDark={isDark} />
          <KPICard title="Dead Leads" value={deadLeads} icon={<XCircle className="w-5 h-5 text-rose-500"/>} color="rose" isDark={isDark} />
        </div>

        {/* Team Performance Table */}
        <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-6 uppercase tracking-widest flex items-center gap-2`}>
           <TrendingUp className="w-5 h-5 text-blue-500" /> Team Performance
        </h2>
        <div className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-sm'} rounded-[32px] border overflow-hidden mb-12 transition-all`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
              <thead className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} border-b`}>
                <tr>
                  <th className="px-8 py-5 font-black text-slate-500 uppercase tracking-widest text-[10px]">Sales Person</th>
                  <th className="px-6 py-5 font-black text-slate-500 uppercase tracking-widest text-[10px]">Total Leads</th>
                  <th className="px-6 py-5 font-black text-slate-500 uppercase tracking-widest text-[10px]">Active</th>
                  <th className="px-6 py-5 font-black text-slate-500 uppercase tracking-widest text-[10px]">Disbursed</th>
                  <th className="px-6 py-5 font-black text-slate-500 uppercase tracking-widest text-[10px]">Dead</th>
                  <th className="px-6 py-5 font-black text-slate-500 uppercase tracking-widest text-[10px]">Conv. Rate</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
                {users.map((sp, idx) => {
                  const stats = getSpStats(sp._id);
                  const convRate = stats.total > 0 ? Math.round((stats.won / stats.total) * 100) : 0;
                  return (
                    <tr key={sp._id} className={`transition-all ${isDark ? 'hover:bg-white/5' : 'hover:bg-blue-50/20'} cursor-pointer`}>
                      <td className="px-8 py-5 font-bold flex items-center gap-3">
                        <div className={`${isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-100'} w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black border`}>
                           {sp.full_name?.charAt(0)}
                        </div>
                        <div>
                          <p className={`${isDark ? 'text-white' : 'text-slate-900'} font-bold`}>{sp.full_name}</p>
                          <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-1.5 mt-1 opacity-70">
                             <Building2 className="w-3 h-3 text-slate-500" />
                             <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                               {sp.branch?.code || 'H.O.'}
                             </span> Branch
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-5 font-black ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{stats.total}</td>
                      <td className="px-6 py-5 font-black text-indigo-500">{stats.active}</td>
                      <td className="px-6 py-5 font-black text-emerald-500">{stats.won}</td>
                      <td className="px-6 py-5 font-black text-rose-500">{stats.dead}</td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${convRate > 20 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20'}`}>
                          {convRate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {users.length === 0 && (
                  <tr><td colSpan="6" className="text-center py-20 text-slate-500 font-bold uppercase tracking-widest text-xs italic">No active personnel in this branch.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pipeline Kanban */}
        <h2 className={`text-lg font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-6 uppercase tracking-widest`}>Live Pipeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <PipelineCol title="New" status="New" leads={leads} navigate={navigate} isDark={isDark} />
          <PipelineCol title="In Progress" status={['Contacted', 'In Progress']} leads={leads} navigate={navigate} isDark={isDark} />
          <PipelineCol title="Docs Submitted" status="Document Submitted" leads={leads} navigate={navigate} isDark={isDark} />
          <PipelineCol title="Sanctioned" status="Sanctioned" leads={leads} navigate={navigate} isDark={isDark} />
        </div>

      </div>
    </div>
  );
};

const KPICard = ({ title, value, icon, color, isDark }) => (
  <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-sm'} border rounded-[32px] p-6 transition-all relative overflow-hidden group hover:shadow-lg`}>
    <div className={`absolute top-0 right-0 w-24 h-24 ${isDark ? `bg-${color}-500/5` : `bg-${color}-50`} rounded-full blur-2xl -mr-10 -mt-10 transition-all`}></div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{title}</p>
      {icon}
    </div>
    <h3 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} relative z-10`}>{value}</h3>
  </motion.div>
);

const PipelineCol = ({ title, status, leads, navigate, isDark }) => {
  const filtered = leads.filter(l => Array.isArray(status) ? status.includes(l.status) : l.status === status);
  return (
    <div className={`${isDark ? 'bg-white/2 border-white/5' : 'bg-slate-50 border-slate-200'} rounded-[32px] p-6 border h-[600px] overflow-y-auto no-scrollbar shadow-inner transition-all`}>
      <h3 className={`font-black ${isDark ? 'text-slate-400' : 'text-slate-600'} text-xs uppercase tracking-widest mb-6 flex justify-between items-center px-2`}>
        {title} <span className={`${isDark ? 'bg-white/10 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'} border px-3 py-1 rounded-full text-[10px] font-black`}>{filtered.length}</span>
      </h3>
      <div className="space-y-4">
        {filtered.map(l => (
          <div key={l._id} onClick={() => navigate(`/agent/lead/${l._id}`)} className={`${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md'} p-5 rounded-[24px] cursor-pointer border transition-all active:scale-[0.98]`}>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-3 block">{l.lead_number}</p>
            <p className={`${isDark ? 'text-white' : 'text-slate-900'} font-bold text-base mb-3 leading-tight`}>{l.applicant_name}</p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-bold max-w-[100px] truncate">{l.assigned_to?.full_name?.split(' ')[0] || 'Unassigned'}</span>
              <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'} font-black`}>₹{(l.loan_amount_required/100000).toFixed(1)}L</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
           <div className="h-full flex flex-col items-center justify-center opacity-30 pt-20">
              <Clock className="w-8 h-8 mb-2" />
              <p className="text-[10px] font-black uppercase tracking-widest">No Cases</p>
           </div>
        )}
      </div>
    </div>
  )
}

export default BsmDashboard;
