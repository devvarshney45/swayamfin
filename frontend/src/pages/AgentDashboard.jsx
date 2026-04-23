import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Search, 
  ChevronRight, 
  LogOut, 
  MapPin, 
  UserSquare2, 
  TrendingUp, 
  CheckCircle, 
  XCircle, 
  Plus,
  LayoutDashboard,
  Filter,
  ArrowUpRight,
  Target
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const AgentDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDark } = useTheme();

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
    .reduce((sum, l) => sum + (Number(l.loan_amount_required) || 0), 0);

  const actualDisbursed = leads
    .filter(l => l.status === 'Disbursed' || l.status === 'Closed - Won')
    .reduce((sum, l) => sum + (Number(l.loan_amount_required) || 0), 0);

  const monthlyTarget = 10000000; // 1 Crore target
  const targetProgress = Math.min((actualDisbursed / monthlyTarget) * 100, 100);

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.applicant_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.lead_number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || l.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Contacted': return isDark ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'In Progress': return isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'Document Submitted': return isDark ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-50 text-purple-600 border-purple-200';
      case 'Sanctioned': 
      case 'Disbursed': 
      case 'Closed - Won': return isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Dead Lead': return isDark ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-rose-50 text-rose-600 border-rose-200';
      default: return isDark ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className={`${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-900'} min-h-screen pb-20 font-inter transition-colors duration-300`}>
      {/* Premium Glass Header */}
      <div className={`${isDark ? 'bg-white/2 border-white/5 shadow-2xl shadow-black/50' : 'bg-white/80 border-slate-200 shadow-xl shadow-slate-200/50'} border-b sticky top-0 z-20 backdrop-blur-2xl transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600 blur-xl opacity-20 scale-125 rounded-full" />
                <div className={`${isDark ? 'bg-white/10 border-white/20' : 'bg-blue-600 border-blue-700'} w-14 h-14 rounded-2xl flex items-center justify-center border shadow-xl relative z-10 transition-transform hover:rotate-3`}>
                  {isDark ? <UserSquare2 className="w-7 h-7 text-blue-400" /> : <UserSquare2 className="w-7 h-7 text-white" />}
                </div>
              </div>
              <div>
                <h1 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight leading-none mb-2`}>
                   Swayamfin Agent Portal
                </h1>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-[11px] font-black uppercase tracking-widest`}>{user?.full_name || 'Agent Identity Verified'}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <button 
                 onClick={handleLogout}
                 className={`${isDark ? 'bg-white/5 border-white/10 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10' : 'bg-white border-slate-200 text-slate-500 hover:text-rose-600 hover:bg-rose-50'} px-5 py-3 rounded-2xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all border shadow-sm`}
               >
                 <LogOut className="w-4 h-4" /> Sign Out
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* KPI Grid - High Readability & Premium Design */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatCard title="Portfolio Leads" value={leads.length} icon={<LayoutDashboard />} color="blue" delay={0} isDark={isDark} />
          <StatCard title="Pipeline Value" value={`₹${(pipelineValue/100000).toFixed(1)}L`} icon={<TrendingUp />} color="indigo" delay={0.1} isDark={isDark} />
          <StatCard title="Total Disbursed" value={`₹${(actualDisbursed/100000).toFixed(1)}L`} icon={<CheckCircle />} color="emerald" delay={0.2} isDark={isDark} />
          <StatCard title="Conversion" value={`${leads.length > 0 ? Math.round((wonLeadsCount/leads.length)*100) : 0}%`} icon={<ArrowUpRight />} color="rose" delay={0.3} isDark={isDark} />
        </div>

        {/* Target & Controls Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
           {/* Target Progress */}
           <div className={`lg:col-span-1 p-8 ${isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'} rounded-[40px] border flex flex-col justify-between relative overflow-hidden group`}>
              <div className={`absolute top-0 right-0 w-32 h-32 ${isDark ? 'bg-blue-600/10' : 'bg-blue-600/5'} blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                      <Target className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className={`text-[10px] font-black ${isDark ? 'text-slate-400' : 'text-slate-600'} uppercase tracking-widest`}>Monthly Goal</span>
                  </div>
                  <span className="text-xl font-black text-blue-600">{targetProgress.toFixed(1)}%</span>
                </div>
                <div className={`${isDark ? 'bg-white/5' : 'bg-slate-100'} w-full h-3 rounded-full overflow-hidden mb-6 shadow-inner`}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${targetProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
                  />
                </div>
                <p className={`text-[11px] font-bold ${isDark ? 'text-slate-500' : 'text-slate-500'} uppercase tracking-widest`}>
                   ₹{(actualDisbursed/100000).toFixed(1)}L / ₹1.0Cr Target
                </p>
              </div>
           </div>

           {/* Search & Action */}
           <div className="lg:col-span-2 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 group w-full">
                <Search className={`absolute left-5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500 group-focus-within:text-blue-500' : 'text-slate-400 group-focus-within:text-blue-600'} w-5 h-5 transition-colors`} />
                <input 
                  type="text" 
                  placeholder="Search by name or case number..."
                  className={`w-full pl-14 pr-6 py-5 rounded-[28px] ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-slate-600' : 'bg-white border-slate-200 text-slate-900 shadow-sm'} focus:outline-none border-2 focus:border-blue-500 transition-all font-bold text-sm`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                onClick={() => navigate('/agent/lead/new')}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <Plus className="w-5 h-5" /> New Case
              </button>
           </div>
        </div>

        {/* Lead Repository */}
        <div className="flex items-center justify-between mb-8 px-4">
           <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'} flex items-center`}>
              <LayoutDashboard className="w-6 h-6 mr-3 text-blue-500" /> Lead Repository
           </h2>
           <div className="flex items-center gap-3">
              <Filter className="w-4 h-4 text-slate-500" />
              <select 
                 className={`${isDark ? 'bg-white/5 text-slate-300' : 'bg-white text-slate-700 shadow-sm'} px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest outline-none cursor-pointer border ${isDark ? 'border-white/5' : 'border-slate-200'}`}
                 value={filterStatus}
                 onChange={(e) => setFilterStatus(e.target.value)}
              >
                 <option value="All">All Categories</option>
                 <option value="New">New</option>
                 <option value="In Progress">In Progress</option>
                 <option value="Disbursed">Disbursed</option>
                 <option value="Dead Lead">Dead</option>
              </select>
           </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-32">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredLeads.map((lead, idx) => (
                <motion.div 
                  key={lead._id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`${isDark ? 'bg-white/5 border-white/5 hover:border-blue-500/50' : 'bg-white border-slate-200 hover:border-blue-400 shadow-lg shadow-slate-200/50'} group rounded-[40px] p-8 border transition-all cursor-pointer relative overflow-hidden`}
                  onClick={() => navigate(`/agent/lead/${lead._id}`)}
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 ${isDark ? 'bg-blue-500/5' : 'bg-blue-50/50'} blur-2xl rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500`} />
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="space-y-3">
                       <span className={`${isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-500'} text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
                         {lead.lead_number}
                       </span>
                       <h3 className={`font-black text-xl ${isDark ? 'text-white' : 'text-slate-900'} leading-tight group-hover:text-blue-500 transition-colors`}>
                         {lead.applicant_name}
                       </h3>
                    </div>
                    <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </div>
                  </div>

                  <div className={`grid grid-cols-2 gap-6 pt-6 border-t ${isDark ? 'border-white/5' : 'border-slate-100'} relative z-10`}>
                    <div>
                      <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1.5">Asset Type</p>
                      <p className={`${isDark ? 'text-white' : 'text-slate-800'} font-bold text-sm truncate uppercase`}>{lead.loan_type?.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1.5">Req. Amount</p>
                      <p className="text-blue-500 font-black text-sm italic">₹{(lead.loan_amount_required/100000).toFixed(2)}L</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1.5">Mobile</p>
                      <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold text-sm tracking-tighter`}>{lead.mobile}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1.5">Hub</p>
                      <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold text-sm flex items-center gap-1.5`}>
                        <MapPin className="w-3.5 h-3.5 text-blue-500" /> {lead.location_city}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredLeads.length === 0 && !loading && (
              <div className={`col-span-full py-32 text-center flex flex-col items-center justify-center ${isDark ? 'bg-white/2 border-white/5' : 'bg-slate-100/50 border-slate-200'} rounded-[40px] border border-dashed`}>
                <div className={`${isDark ? 'bg-white/5' : 'bg-white shadow-sm'} w-24 h-24 rounded-full flex items-center justify-center mb-6`}>
                  <Search className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-2`}>No matching cases found</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Adjust your filters or try a different keyword</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, delay, isDark }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ delay }}
    className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} p-8 rounded-[40px] border relative overflow-hidden group hover:scale-[1.02] transition-all`}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 ${isDark ? `bg-${color}-500/10` : `bg-${color}-50`} blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className={`p-4 ${isDark ? `bg-${color}-500/10 border-${color}-500/20 text-${color}-400` : `bg-${color}-50 border-${color}-100 text-${color}-600`} rounded-2xl border`}>
        {React.cloneElement(icon, { className: "w-6 h-6" })}
      </div>
    </div>
    <div className="relative z-10">
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">{title}</p>
      <h3 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight`}>{value}</h3>
    </div>
  </motion.div>
);

export default AgentDashboard;
