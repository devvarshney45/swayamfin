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
  Target,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
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
    <div className={(isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-900') + ' min-h-screen pb-32 font-dmsans transition-colors duration-300'}>
      {/* Mobile-First Header */}
      <div className={(isDark ? 'bg-white/2 border-white/5 shadow-22xl shadow-black/50' : 'bg-white/90 border-slate-200 shadow-xl shadow-slate-200/50') + ' border-b sticky top-0 z-40 backdrop-blur-2xl transition-all'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:py-6">
            <div className="flex items-center gap-3 md:gap-5">
              <Link to="/" className="relative group">
                <div className="absolute inset-0 bg-blue-600 blur-lg opacity-20 scale-125 rounded-full" />
                <div className={(isDark ? 'bg-white/10 border-white/20' : 'bg-blue-600 border-blue-700') + ' w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center border shadow-xl relative z-10 transition-transform group-hover:rotate-3'}>
                  <UserSquare2 className={"w-5 h-5 md:w-7 md:h-7 " + (isDark ? 'text-blue-400' : 'text-white')} />
                </div>
              </Link>
              <div>
                <h1 className={(isDark ? 'text-white' : 'text-slate-900') + " text-lg md:text-2xl font-black tracking-tight leading-none mb-1 md:mb-2"}>
                   Agent Portal
                </h1>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <p className={(isDark ? 'text-slate-500' : 'text-slate-500') + " text-[9px] md:text-[11px] font-black uppercase tracking-widest truncate max-w-[120px] md:max-w-none"}>
                     {user?.full_name || 'Active Partner'}
                   </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4">
               <button 
                 onClick={handleLogout}
                 className={(isDark ? 'bg-white/5 border-white/10 text-slate-400 hover:text-rose-400' : 'bg-white border-slate-200 text-slate-500 hover:text-rose-600') + ' w-10 h-10 md:w-auto md:px-5 md:py-3 rounded-xl md:rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all border shadow-sm active:scale-95'}
               >
                 <LogOut className="w-4 h-4" /> <span className="hidden md:inline">Sign Out</span>
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24 lg:mt-32">
        {/* Responsive KPI Grid: 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <StatCard title="Total Leads" value={leads.length} icon={<LayoutDashboard />} color="blue" delay={0} isDark={isDark} />
          <StatCard title="Pipeline" value={"₹" + (pipelineValue/100000).toFixed(0) + "L"} icon={<TrendingUp />} color="indigo" delay={0.1} isDark={isDark} />
          <StatCard title="Disbursed" value={"₹" + (actualDisbursed/100000).toFixed(0) + "L"} icon={<CheckCircle />} color="emerald" delay={0.2} isDark={isDark} />
          <StatCard title="Success" value={(leads.length > 0 ? Math.round((wonLeadsCount/leads.length)*100) : 0) + "%"} icon={<ArrowUpRight />} color="rose" delay={0.3} isDark={isDark} />
        </div>

        {/* Target & Controls Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
           {/* Mobile-Optimized Target Progress */}
           <div className={(isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl') + " lg:col-span-1 p-6 md:p-8 rounded-[32px] md:rounded-[40px] border flex flex-col justify-between relative overflow-hidden group"}>
              <div className={"absolute top-0 right-0 w-32 h-32 " + (isDark ? 'bg-blue-600/10' : 'bg-blue-600/5') + " blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"} />
              <div>
                <div className="flex justify-between items-center mb-5 md:mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 shrink-0">
                      <Target className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className={(isDark ? 'text-slate-400' : 'text-slate-600') + " text-[9px] md:text-[10px] font-black uppercase tracking-widest"}>Monthly Goal</span>
                  </div>
                  <span className="text-lg md:text-xl font-black text-blue-600">{targetProgress.toFixed(0)}%</span>
                </div>
                <div className={(isDark ? 'bg-white/5' : 'bg-slate-100') + " w-full h-2.5 rounded-full overflow-hidden mb-5 md:mb-6 shadow-inner"}>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: targetProgress + "%" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full"
                  />
                </div>
                <p className={(isDark ? 'text-slate-500' : 'text-slate-500') + " text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-center md:text-left"}>
                   ₹{(actualDisbursed/100000).toFixed(1)}L / ₹1.0Cr Target
                </p>
              </div>
           </div>

           {/* Mobile-Friendly Search & Action */}
           <div className="lg:col-span-2 flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 group w-full">
                <Search className={"absolute left-5 top-1/2 -translate-y-1/2 " + (isDark ? 'text-slate-500 group-focus-within:text-blue-500' : 'text-slate-400 group-focus-within:text-blue-600') + " w-5 h-5 transition-colors"} />
                <input 
                  type="text" 
                  placeholder="Case search..."
                  className={(isDark ? 'bg-white/5 border-white/10 text-white placeholder-slate-700' : 'bg-white border-slate-200 text-slate-900 shadow-sm') + " w-full pl-12 pr-6 py-4 md:py-5 rounded-2xl md:rounded-[28px] focus:outline-none border-2 focus:border-blue-500 transition-all font-black text-xs md:text-sm shadow-inner"}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                onClick={() => navigate('/agent/lead/new')}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-[28px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 shrink-0"
              >
                <Plus className="w-5 h-5" /> New Case
              </button>
           </div>
        </div>

        {/* Lead Repository Header */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 px-2 md:px-4">
           <h2 className={(isDark ? 'text-white' : 'text-slate-900') + " text-lg md:text-xl font-black flex items-center w-full"}>
              <LayoutDashboard className="w-5 h-5 md:w-6 md:h-6 mr-3 text-blue-500" /> Repository <span className="ml-2 text-[10px] text-slate-500 font-bold opacity-60">({filteredLeads.length})</span>
           </h2>
           <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <select 
                 className={(isDark ? 'bg-[#111827] text-slate-300 border-white/5' : 'bg-white text-slate-700 shadow-sm border-slate-200') + " px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer border shadow-sm transition-all"}
                 value={filterStatus}
                 onChange={(e) => setFilterStatus(e.target.value)}
              >
                 <option value="All">All Categories</option>
                 <option value="New">New Entries</option>
                 <option value="In Progress">Active</option>
                 <option value="Disbursed">Disbursed</option>
                 <option value="Dead Lead">Dead</option>
              </select>
           </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 md:py-32">
            <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence>
              {filteredLeads.map((lead, idx) => (
                <motion.div 
                  key={lead._id}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={(isDark ? 'bg-white/5 border-white/5 hover:border-blue-500 shadow-22xl shadow-black/40' : 'bg-white border-slate-200 hover:border-blue-400 shadow-lg shadow-slate-200/40') + " group rounded-[32px] md:rounded-[40px] p-6 md:p-8 border transition-all cursor-pointer relative overflow-hidden active:scale-[0.98]"}
                  onClick={() => navigate(`/agent/lead/${lead._id}`)}
                >
                  <div className={(isDark ? 'bg-blue-500/5' : 'bg-blue-50/50') + " absolute top-0 right-0 w-24 h-24 blur-2xl rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"} />
                  
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="space-y-2 md:space-y-3">
                       <span className={(isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-500') + " text-[8px] md:text-[9px] font-black uppercase tracking-widest px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg border " + (isDark ? 'border-white/5' : 'border-slate-200')}>
                         {lead.lead_number}
                       </span>
                       <h3 className={(isDark ? 'text-white' : 'text-slate-900') + " font-black text-lg md:text-xl leading-tight group-hover:text-blue-500 transition-colors truncate max-w-[150px] md:max-w-none"}>
                         {lead.applicant_name}
                       </h3>
                    </div>
                    <div className={(getStatusColor(lead.status)) + " px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest border shadow-sm"}>
                      {lead.status}
                    </div>
                  </div>

                  <div className={(isDark ? 'border-white/5' : 'border-slate-100') + " grid grid-cols-2 gap-4 md:gap-6 pt-5 md:pt-6 border-t relative z-10"}>
                    <div>
                      <p className="text-slate-500 text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-1 md:mb-1.5 opacity-60">Asset</p>
                      <p className={(isDark ? 'text-white' : 'text-slate-800') + " font-black text-[10px] md:text-sm truncate uppercase tracking-tight"}>{lead.loan_type?.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-1 md:mb-1.5 opacity-60">Amount</p>
                      <p className="text-blue-500 font-black text-[10px] md:text-sm italic">₹{(lead.loan_amount_required/100000).toFixed(1)}L</p>
                    </div>
                    <div className="mt-1">
                      <p className="text-slate-500 text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-1 md:mb-1.5 opacity-60">Mobile</p>
                      <p className={(isDark ? 'text-slate-300' : 'text-slate-700') + " font-bold text-[10px] md:text-sm tracking-tighter"}>{lead.mobile}</p>
                    </div>
                    <div className="mt-1">
                      <p className="text-slate-500 text-[8px] md:text-[9px] font-black uppercase tracking-widest mb-1 md:mb-1.5 opacity-60">Branch</p>
                      <p className={(isDark ? 'text-slate-300' : 'text-slate-700') + " font-bold text-[10px] md:text-sm flex items-center gap-1.5"}>
                         {lead.location_city}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredLeads.length === 0 && !loading && (
              <div className={(isDark ? 'bg-white/2 border-white/5' : 'bg-slate-100/50 border-slate-200') + " col-span-full py-20 md:py-32 text-center flex flex-col items-center justify-center rounded-[32px] md:rounded-[40px] border border-dashed"}>
                <div className={(isDark ? 'bg-white/5' : 'bg-white shadow-sm') + " w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-6"}>
                  <Search className="w-8 h-8 md:w-10 md:h-10 text-slate-400" />
                </div>
                <h3 className={(isDark ? 'text-white' : 'text-slate-900') + " text-xl md:text-2xl font-black mb-2"}>No matching entries</h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Adjust filters or search keywords</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color, delay, isDark }) => {
  const containerClasses = isDark ? 'bg-white/5 border-white/5 shadow-22xl shadow-black/40' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/30';
  const accentClasses = isDark ? "bg-" + color + "-500/10" : "bg-" + color + "-50";
  const iconClasses = isDark ? "bg-" + color + "-500/10 border-" + color + "-500/20 text-" + color + "-400" : "bg-" + color + "-50 border-" + color + "-100 text-" + color + "-600";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay }}
      className={containerClasses + " p-4 md:p-8 rounded-2xl md:rounded-[40px] border relative overflow-hidden group active:scale-95 transition-all"}
    >
      <div className={"absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 " + accentClasses + " blur-2xl md:blur-3xl rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"} />
      <div className="flex justify-between items-start mb-3 md:mb-6 relative z-10">
        <div className={iconClasses + " p-2.5 md:p-4 rounded-xl md:rounded-2xl border shadow-sm"}>
          {React.cloneElement(icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
        </div>
      </div>
      <div className="relative z-10 text-center md:text-left">
        <p className="text-slate-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2 italic">{title}</p>
        <h3 className={(isDark ? 'text-white' : 'text-slate-900') + " text-lg sm:text-2xl md:text-4xl font-black tracking-tighter leading-none"}>{value}</h3>
      </div>
    </motion.div>
  );
};

export default AgentDashboard;
