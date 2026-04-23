import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  XCircle, 
  Clock, 
  ChevronRight, 
  CheckCircle, 
  Building2, 
  LogOut,
  Target,
  ArrowUpRight,
  UserCheck,
  Search,
  Filter,
  BarChart3
} from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const BsmDashboard = () => {
  const { user: authUser, logout } = useAuth();
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
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
      <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );

  const totalLeads = leads.length;
  const activePipelineValue = leads
    .filter(l => ['New', 'Contacted', 'In Progress', 'Document Submitted'].includes(l.status))
    .reduce((sum, l) => sum + (Number(l.loan_amount_required) || 0), 0);
  const disbursedValue = leads
    .filter(l => l.status === 'Disbursed' || l.status === 'Closed - Won')
    .reduce((sum, l) => sum + (Number(l.loan_amount_required) || 0), 0);
  const deadLeads = leads.filter(l => l.status === 'Dead Lead').length;

  return (
    <div className={`${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-900'} min-h-screen pt-24 md:pt-28 pb-20 font-inter transition-colors duration-300 relative`}>
      {/* Premium Header - Optimized for Navbar Alignment */}
      <div className={`${isDark ? 'bg-white/2 border-white/5' : 'bg-white/80 border-slate-200 shadow-xl shadow-slate-200/50'} border-b pt-12 md:pt-20 pb-20 relative z-10 transition-all rounded-b-[60px]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-8">
             <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-30 scale-125 rounded-full" />
                  <div className={`${isDark ? 'bg-white/10' : 'bg-blue-600 shadow-xl shadow-blue-600/30'} w-16 h-16 rounded-[24px] flex items-center justify-center border ${isDark ? 'border-white/20' : 'border-blue-700'} relative z-10 transition-transform hover:scale-105`}>
                     <Building2 className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-white'}`} />
                  </div>
                </div>
                <div>
                   <div className="bg-blue-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-lg border border-blue-700 mb-2 inline-block">
                     {authUser?.branch?.name || 'Agra Hub'}
                   </div>
                   <h1 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter`}>Branch Manager Portal</h1>
                </div>
             </div>
             <button 
               onClick={() => { logout(); navigate('/agent/login'); }}
               className={`${isDark ? 'bg-white/5 border-white/10 text-slate-400' : 'bg-white border-slate-200 text-slate-500 shadow-sm'} px-6 py-4 rounded-2xl flex items-center gap-3 font-black text-[10px] uppercase tracking-widest transition-all border hover:text-rose-500`}
             >
               <LogOut className="w-4 h-4" /> Sign Out
             </button>
          </div>
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-sm font-bold opacity-80 pl-2`}>Real-time performance analytics for your branch hub.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard title="Global Hub Leads" value={totalLeads} icon={<Users />} color="blue" isDark={isDark} />
          <StatCard title="Active Pipeline" value={`₹${(activePipelineValue/100000).toFixed(1)}L`} icon={<BarChart3 />} color="indigo" isDark={isDark} />
          <StatCard title="MTD Disbursed" value={`₹${(disbursedValue/100000).toFixed(1)}L`} icon={<DollarSign />} color="emerald" isDark={isDark} />
          <StatCard title="Disposal (Dead)" value={deadLeads} icon={<XCircle />} color="rose" isDark={isDark} />
        </div>

        {/* Team Performance Section */}
        <div className="flex items-center justify-between mb-8 px-4">
           <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight flex items-center gap-3`}>
              <UserCheck className="w-8 h-8 text-blue-600" /> Personnel Roster
           </h2>
           <div className="hidden md:flex gap-4">
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                 <input 
                   type="text" 
                   placeholder="Search personnel..."
                   className={`${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'} pl-12 pr-6 py-3 rounded-2xl border text-xs font-bold outline-none focus:border-blue-500 transition-all`}
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                 />
              </div>
           </div>
        </div>

        <div className={`${isDark ? 'bg-white/2 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} rounded-[48px] border overflow-hidden mb-12 transition-all`}>
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-sm whitespace-nowrap border-collapse">
              <thead className={`${isDark ? 'bg-white/5' : 'bg-slate-50'} border-b ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                <tr>
                  <th className="px-10 py-6 font-black text-slate-500 uppercase tracking-widest text-[10px]">Strategic Sales Person</th>
                  <th className="px-6 py-6 font-black text-slate-500 uppercase tracking-widest text-[10px]">Case Count</th>
                  <th className="px-6 py-6 font-black text-slate-500 uppercase tracking-widest text-[10px]">In Funnel</th>
                  <th className="px-6 py-6 font-black text-slate-500 uppercase tracking-widest text-[10px]">Won (Disbursed)</th>
                  <th className="px-6 py-6 font-black text-slate-500 uppercase tracking-widest text-[10px]">Conv. Yield</th>
                  <th className="px-10 py-6 font-black text-slate-500 uppercase tracking-widest text-[10px]">Action</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
                {users.filter(u => u.full_name.toLowerCase().includes(searchTerm.toLowerCase())).map((sp, idx) => {
                  const stats = getSpStats(sp._id);
                  const convRate = stats.total > 0 ? Math.round((stats.won / stats.total) * 100) : 0;
                  return (
                    <tr key={sp._id} className={`transition-all ${isDark ? 'hover:bg-white/5' : 'hover:bg-blue-50/20'} group`}>
                      <td className="px-10 py-6 flex items-center gap-4">
                        <div className={`${isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-600 text-white'} w-12 h-12 rounded-[18px] flex items-center justify-center text-sm font-black border ${isDark ? 'border-white/10' : 'border-blue-700'} shadow-lg group-hover:scale-110 transition-transform`}>
                           {sp.full_name?.charAt(0)}
                        </div>
                        <div>
                          <p className={`${isDark ? 'text-white' : 'text-slate-900'} font-black text-base`}>{sp.full_name}</p>
                          <div className={`text-[10px] ${isDark ? 'text-blue-400' : 'text-blue-600'} font-black uppercase tracking-widest mt-1 opacity-70`}>
                             ID: {sp.employee_code || (1000 + idx)}
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-6 font-black ${isDark ? 'text-slate-300' : 'text-slate-700'} text-lg`}>{stats.total}</td>
                      <td className="px-6 py-6 font-black text-indigo-500 text-lg">{stats.active}</td>
                      <td className="px-6 py-6 font-black text-emerald-500 text-lg font-playfair italic underline decoration-blue-500/30 underline-offset-8 decoration-4">{stats.won}</td>
                      <td className="px-6 py-6">
                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${convRate > 20 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20'} shadow-inner`}>
                          {convRate}% Yield
                        </span>
                      </td>
                      <td className="px-10 py-6">
                         <button className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'} p-3 rounded-xl border opacity-0 group-hover:opacity-100 transition-all hover:bg-blue-600 hover:text-white`}>
                            <ArrowUpRight className="w-5 h-5" />
                         </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pipeline Summary Cards */}
        <div className="flex items-center gap-3 mb-8 px-4">
           <BarChart3 className="w-6 h-6 text-indigo-500" />
           <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>Funnel Analytics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <PipelineCol title="New Inquiries" status="New" leads={leads} navigate={navigate} isDark={isDark} />
          <PipelineCol title="Active Diligence" status={['Contacted', 'In Progress']} leads={leads} navigate={navigate} isDark={isDark} />
          <PipelineCol title="Asset Sanctioned" status="Sanctioned" leads={leads} navigate={navigate} isDark={isDark} />
          <PipelineCol title="Closed/Disbursed" status={['Closed - Won', 'Disbursed']} leads={leads} navigate={navigate} isDark={isDark} />
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, isDark }) => (
  <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl shadow-black/50' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} border rounded-[40px] p-8 transition-all relative overflow-hidden group hover:scale-[1.02]`}>
    <div className={`absolute top-0 right-0 w-32 h-32 ${isDark ? `bg-${color}-500/10` : `bg-${color}-50`} rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700`}></div>
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className={`p-4 ${isDark ? `bg-${color}-500/10 border-${color}-500/30 text-${color}-400` : `bg-${color}-50 border-${color}-100 text-${color}-600`} rounded-2xl border shadow-sm`}>
        {React.cloneElement(icon, { className: "w-6 h-6" })}
      </div>
    </div>
    <div className="relative z-10">
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 opacity-70">{title}</p>
      <h3 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter`}>{value}</h3>
    </div>
  </motion.div>
);

const PipelineCol = ({ title, status, leads, navigate, isDark }) => {
  const filtered = leads.filter(l => Array.isArray(status) ? status.includes(l.status) : l.status === status);
  return (
    <div className={`${isDark ? 'bg-white/2 border-white/5' : 'bg-white border-slate-200 shadow-inner'} rounded-[48px] p-8 border h-[600px] overflow-y-auto no-scrollbar shadow-2xl transition-all`}>
      <h3 className={`font-black ${isDark ? 'text-slate-400' : 'text-slate-800'} text-xs uppercase tracking-widest mb-8 flex justify-between items-center group`}>
        {title} <span className={`${isDark ? 'bg-white/10 text-slate-300' : 'bg-blue-600 text-white shadow-xl shadow-blue-500/20'} border border-transparent px-3 py-1.5 rounded-full text-[10px] font-black group-hover:scale-110 transition-transform`}>{filtered.length}</span>
      </h3>
      <div className="space-y-5">
        {filtered.map(l => (
          <div key={l._id} onClick={() => navigate(`/agent/lead/${l._id}`)} className={`${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-200 hover:border-blue-400 shadow-xl shadow-slate-200/50'} p-6 rounded-[32px] cursor-pointer border transition-all active:scale-[0.98] group relative`}>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-500 mb-4">{l.lead_number}</p>
            <p className={`${isDark ? 'text-white' : 'text-slate-900'} font-black text-lg mb-4 leading-tight group-hover:text-blue-500 transition-colors`}>{l.applicant_name}</p>
            <div className={`pt-4 border-t ${isDark ? 'border-white/5' : 'border-slate-100'} flex items-center justify-between`}>
              <span className="text-slate-500 font-black text-[10px] uppercase tracking-widest truncate max-w-[100px] opacity-70">{l.assigned_to?.full_name?.split(' ')[0] || 'Unassigned'}</span>
              <span className={`${isDark ? 'text-blue-400' : 'text-blue-600'} font-black text-xs italic`}>₹{(l.loan_amount_required/100000).toFixed(1)}L</span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
           <div className="h-full flex flex-col items-center justify-center opacity-20 pt-32">
              <Clock className="w-10 h-10 mb-4" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em]">No Activity</p>
           </div>
        )}
      </div>
    </div>
  )
}

export default BsmDashboard;
