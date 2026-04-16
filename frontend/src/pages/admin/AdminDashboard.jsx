import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  MapPin, 
  Filter, 
  PieChart as PieIcon, 
  BarChart as BarIcon,
  ChevronRight,
  ArrowUpRight,
  TrendingDown,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('swayamfin_token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/leads/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data.data);
    } catch (err) {
      console.error('Failed to fetch stats', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
    </div>
  );

  const cards = [
    { title: 'Total Leads', value: stats?.totalLeads || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%', up: true },
    { title: 'Conversion Rate', value: '3.2%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', trend: '+0.5%', up: true },
    { title: 'Active Agents', value: '12', icon: Filter, color: 'text-purple-600', bg: 'bg-purple-50', trend: 'Stable', up: true },
    { title: 'Lost Leads', value: '45', icon: TrendingDown, color: 'text-red-600', bg: 'bg-red-50', trend: '-2%', up: false },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1 flex items-center gap-3">
              <LayoutDashboard className="text-primary-blue w-8 h-8" />
              Global Command Center
            </h1>
            <p className="text-slate-500 font-medium italic">Welcome back, Super Admin {user?.name}</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="px-5 py-2.5 bg-primary-blue text-white rounded-xl font-bold shadow-lg shadow-primary-blue/20 hover:bg-primary-darkBlue transition-all flex items-center gap-2">
               Download CSV
            </button>
          </div>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((card, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[24px] shadow-fintech border border-slate-100 group hover:border-primary-blue transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-4 ${card.bg} ${card.color} rounded-2xl`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${card.up ? 'text-green-600' : 'text-red-600'} bg-white px-2 py-1 rounded-full shadow-sm`}>
                  {card.trend}
                  <ArrowUpRight className={`w-3 h-3 ${card.up ? '' : 'rotate-90'}`} />
                </div>
              </div>
              <h3 className="text-slate-400 font-bold text-sm uppercase mb-1">{card.title}</h3>
              <div className="text-3xl font-extrabold text-slate-900">{card.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions & Hotspots */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Status Breakdown */}
          <div className="lg:col-span-2 bg-white rounded-[32px] shadow-fintech border border-slate-100 p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                 <BarIcon className="text-primary-blue w-5 h-5" />
                 Leads by Status
              </h3>
              <select className="bg-slate-50 border-none rounded-lg text-sm font-bold text-slate-500 px-3 py-1 outline-none">
                <option>Last 30 Days</option>
                <option>All Time</option>
              </select>
            </div>
            
            <div className="space-y-6">
              {stats?.statusStats?.map((s, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm font-bold text-slate-700">
                    <span className="capitalize">{s._id || 'New'}</span>
                    <span>{s.count} Leads</span>
                  </div>
                  <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(s.count / stats.totalLeads) * 100}%` }}
                      className="h-full bg-primary-blue"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions sidebar-style */}
          <div className="space-y-6">
            <div className="bg-white rounded-[32px] shadow-fintech border border-slate-100 p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Zap className="text-amber-500 w-5 h-5" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={() => window.location.href = '/admin/agents'}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-primary-blue hover:text-white rounded-2xl transition-all group"
                >
                  <span className="font-bold text-sm">Add New Agent</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </button>
                <button 
                  onClick={() => window.location.href = '/admin/leads'}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-primary-blue hover:text-white rounded-2xl transition-all group"
                >
                  <span className="font-bold text-sm">View All Leads</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </button>
              </div>
            </div>

            {/* Top Cities */}
            <div className="bg-primary-darkBlue rounded-[32px] shadow-2xl p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
               <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                  <MapPin className="text-primary-lightBlue w-5 h-5" />
                  Hotspots
               </h3>
               <ul className="space-y-6">
                  {stats?.cityStats?.map((city, i) => (
                    <li key={i} className="flex justify-between items-center group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-xl transition-all">
                      <div>
                        <div className="font-bold text-white capitalize">{city._id}</div>
                        <div className="text-xs text-blue-300">Active Market</div>
                      </div>
                      <div className="flex items-center gap-3">
                         <span className="font-extrabold text-primary-lightBlue">{city.count}</span>
                         <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-colors" />
                      </div>
                    </li>
                  ))}
               </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
