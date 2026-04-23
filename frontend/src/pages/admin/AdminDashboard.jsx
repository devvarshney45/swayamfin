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
  LayoutDashboard
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
        activeAgents: users.filter(u => u.role === 'sales_person').length,
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
       <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-800'} p-4 md:p-12 font-inter transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <AdminTabs />
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 px-4">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                    <ShieldCheck className="w-5 h-5 text-blue-500" />
                 </div>
                 <span className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-[10px] font-black uppercase tracking-[0.3em]`}>Intelligence Dashboard</span>
              </div>
              <h1 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter uppercase`}>
                 Revenue <span className="text-blue-600 italic">Command</span>
              </h1>
           </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <KPICard title="Total Portfolio" value={stats.totalLeads} trend="+12% MoM" icon={<TrendingUp />} color="blue" isDark={isDark} />
          <KPICard title="Gross Disbursement" value={`₹${(stats.totalDisbursed/10000000).toFixed(2)}Cr`} trend="+8% targets" icon={<DollarSign />} color="emerald" isDark={isDark} />
          <KPICard title="Strategic Agents" value={stats.activeAgents} trend="Active Now" icon={<Users />} color="indigo" isDark={isDark} />
          <KPICard title="Yield (Win Rate)" value={`${stats.conversionRate}%`} trend="Target 25%" icon={<BarChart3 />} color="rose" isDark={isDark} />
        </div>

        {/* Secondary Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className={`lg:col-span-2 p-10 ${isDark ? 'bg-white/2 border-white/5 shadow-2xl shadow-black/50' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} rounded-[56px] border group relative overflow-hidden`}>
              <div className="flex justify-between items-center mb-10 relative z-10">
                 <div>
                    <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>Growth Velocity</h3>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Daily Disbursement Volume</p>
                 </div>
                 <div className="flex gap-2">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                       <Zap className="w-5 h-5 text-blue-500" />
                    </div>
                 </div>
              </div>
              <div className="h-64 flex items-end gap-3 justify-between relative z-10">
                 {[40, 60, 45, 80, 55, 90, 70, 85, 50, 95].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.1, duration: 1 }}
                      className={`flex-1 ${isDark ? 'bg-blue-600/20 group-hover:bg-blue-600/40' : 'bg-blue-100 group-hover:bg-blue-600'} rounded-t-xl transition-all duration-500`}
                    />
                 ))}
              </div>
           </div>

           <div className={`p-10 ${isDark ? 'bg-white/2 border-white/5 shadow-2xl shadow-black/50' : 'bg-blue-600 shadow-2xl shadow-blue-600/30'} rounded-[56px] border border-transparent relative overflow-hidden flex flex-col justify-between`}>
              <div className={`absolute top-0 right-0 w-48 h-48 ${isDark ? 'bg-blue-600/10' : 'bg-white/10'} blur-3xl rounded-full -mr-20 -mt-20`} />
              <div>
                 <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-white'} uppercase tracking-tight mb-4`}>Regional Hubs</h3>
                 <div className="space-y-6 mt-8">
                    {['Agra Hub', 'Mathura Hub', 'Hathras Hub', 'Kosi Hub'].map((city, i) => (
                       <div key={i} className="flex items-center justify-between group cursor-pointer">
                          <div className="flex items-center gap-4">
                             <Building2 className={`w-4 h-4 ${isDark ? 'text-blue-500' : 'text-blue-100/60'}`} />
                             <span className={`font-black text-sm uppercase tracking-widest ${isDark ? 'text-white' : 'text-white'}`}>{city}</span>
                          </div>
                          <ArrowRight className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-white/40'} group-hover:translate-x-2 transition-transform`} />
                       </div>
                    ))}
                 </div>
              </div>
              <button className={`w-full py-5 ${isDark ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] mt-12 shadow-xl shadow-black/20`}>
                 Network Audit
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, trend, icon, color, isDark }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }}
    className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl shadow-black/50' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} p-8 rounded-[40px] border relative overflow-hidden group hover:scale-[1.02] transition-all`}
  >
    <div className={`absolute top-0 right-0 w-32 h-32 ${isDark ? `bg-${color}-500/10` : `bg-${color}-50`} blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700`} />
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className={`p-4 ${isDark ? `bg-${color}-500/10 border-${color}-500/30 text-${color}-400` : `bg-${color}-50 border-${color}-100 text-${color}-600'} rounded-2xl border`}>
        {React.cloneElement(icon, { className: "w-6 h-6" })}
      </div>
      <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ${color === 'rose' ? 'text-rose-500' : 'text-emerald-500'}`}>
         {trend} <ArrowUpRight className="w-3 h-3" />
      </div>
    </div>
    <div className="relative z-10">
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2 opacity-80">{title}</p>
      <h3 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter`}>{value}</h3>
    </div>
  </motion.div>
);

export default AdminDashboard;
