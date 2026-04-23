import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ArrowUpRight, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  LayoutDashboard,
  Target
} from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';
import AdminTabs from '../../components/admin/AdminTabs';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const AdminDashboard = () => {
  const { isDark } = useTheme();
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalDisbursed: 0,
    activeAgents: 0,
    conversionRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('swayamfin_token');
      const [leadsRes, usersRes] = await Promise.all([
        axios.get(`${API_URL}/api/leads`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/api/users`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      const leads = leadsRes.data.data;
      const users = usersRes.data.data;

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
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) return (
    <div className={`min-h-screen ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} flex items-center justify-center`}>
       <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-800'} p-4 md:p-8 lg:p-12 font-dmsans transition-colors duration-300 pb-32`}>
      <div className="max-w-7xl mx-auto">
        <AdminTabs />
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 md:mb-16 px-2 md:px-4 mt-8 md:mt-0">
           <div className="w-full text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                 <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                 </div>
                 <span className={`${isDark ? 'text-slate-500' : 'text-slate-500'} text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em]`}>Swayamfin Intelligence Hub</span>
              </div>
              <h1 className={`text-3xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter uppercase leading-tight`}>
                 Revenue <span className="text-blue-600 italic">Command</span>
              </h1>
           </div>
        </div>

        {/* Global KPIs: 2 cols on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-16">
          <KPICard title="Portfolio" value={stats.totalLeads} trend="+12%" icon={<TrendingUp />} color="blue" isDark={isDark} />
          <KPICard title="Disbursement" value={`₹${(stats.totalDisbursed/10000000).toFixed(1)}Cr`} trend="+8%" icon={<DollarSign />} color="emerald" isDark={isDark} />
          <KPICard title="Strategic Agents" value={stats.activeAgents} trend="Active" icon={<Users />} color="indigo" isDark={isDark} />
          <KPICard title="Yield (Win%)" value={`${stats.conversionRate}%`} trend="Target 25%" icon={<BarChart3 />} color="rose" isDark={isDark} />
        </div>

        {/* Secondary Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
           <div className={`lg:col-span-2 p-6 md:p-10 ${isDark ? 'bg-white/2 border-white/5 shadow-22xl shadow-black/50' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} rounded-[32px] md:rounded-[56px] border group relative overflow-hidden`}>
              <div className="flex justify-between items-center mb-10 relative z-10">
                 <div>
                    <h3 className={`text-xl md:text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>Growth Velocity</h3>
                    <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1">Disbursement Volume Spectrum</p>
                 </div>
                 <div className="flex gap-2">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                       <Zap className="w-4 md:w-5 h-4 md:h-5 text-blue-500" />
                    </div>
                 </div>
              </div>
              <div className="h-48 md:h-64 flex items-end gap-2 md:gap-3 justify-between relative z-10">
                 {[40, 60, 45, 80, 55, 90, 70, 85, 50, 95].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05, duration: 1 }}
                      className={`flex-1 ${isDark ? 'bg-blue-600/20 group-hover:bg-blue-600/40' : 'bg-blue-100 group-hover:bg-blue-600'} rounded-t-lg md:rounded-t-xl transition-all duration-500`}
                    />
                 ))}
              </div>
           </div>

           <div className={`p-8 md:p-10 ${isDark ? 'bg-white/2 border-white/5 shadow-22xl shadow-black/50' : 'bg-blue-600 shadow-2xl shadow-blue-600/30'} rounded-[32px] md:rounded-[56px] border border-transparent relative overflow-hidden flex flex-col justify-between`}>
              <div className={`absolute top-0 right-0 w-32 md:w-48 h-32 md:h-48 ${isDark ? 'bg-blue-600/10' : 'bg-white/10'} blur-3xl rounded-full -mr-16 -mt-16 md:-mr-20 md:-mt-20`} />
              <div>
                 <h3 className={`text-xl md:text-2xl font-black ${isDark ? 'text-white' : 'text-white'} uppercase tracking-tight mb-4`}>Regional Hubs</h3>
                 <div className="space-y-5 md:space-y-6 mt-6 md:mt-8">
                    {['Agra Hub', 'Mathura Hub', 'Hathras Hub', 'Kosi Hub'].map((city, i) => (
                       <div key={i} className="flex items-center justify-between group cursor-pointer">
                          <div className="flex items-center gap-3 md:gap-4">
                             <Building2 className={`w-3.5 md:w-4 h-3.5 md:h-4 ${isDark ? 'text-blue-500' : 'text-blue-100/60'}`} />
                             <span className={`font-black text-[10px] md:text-sm uppercase tracking-widest text-white`}>{city}</span>
                          </div>
                          <ArrowRight className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-white/40'} group-hover:translate-x-2 transition-transform`} />
                       </div>
                    ))}
                 </div>
              </div>
              <button className={`w-full py-4 md:py-5 ${isDark ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20' : 'bg-white text-blue-600'} rounded-2xl md:rounded-[24px] font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] mt-10 md:mt-12 transition-all active:scale-95`}>
                 Network Audit
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, trend, icon, color, isDark }) => {
  const statusClasses = color === 'rose' ? 'text-rose-500' : 'text-emerald-500';
  const containerClasses = isDark 
    ? 'bg-white/5 border-white/5 shadow-22xl shadow-black/50' 
    : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50';
  const accentClasses = isDark ? `bg-${color}-500/10` : `bg-${color}-50`;
  const iconBoxClasses = isDark 
    ? `bg-${color}-500/10 border-${color}-500/30 text-${color}-400` 
    : `bg-${color}-50 border-${color}-100 text-${color}-600`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      whileInView={{ opacity: 1, scale: 1 }}
      className={containerClasses + " p-4 md:p-8 rounded-2xl md:rounded-[40px] border relative overflow-hidden group hover:scale-[1.02] transition-all"}
    >
      <div className={"absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 " + accentClasses + " blur-2xl md:blur-3xl rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-all duration-700"} />
      <div className="flex justify-between items-start mb-3 md:mb-6 relative z-10">
        <div className={iconBoxClasses + " p-2.5 md:p-4 rounded-xl md:rounded-2xl border shadow-sm"}>
          {React.cloneElement(icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
        </div>
        <div className={"hidden md:flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest " + statusClasses}>
           {trend} <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>
      <div className="relative z-10 text-center md:text-left">
        <p className="text-slate-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2 opacity-80 italic">{title}</p>
        <h3 className={"text-base sm:text-2xl md:text-3xl font-black " + (isDark ? "text-white" : "text-slate-900") + " tracking-tighter leading-none"}>{value}</h3>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
