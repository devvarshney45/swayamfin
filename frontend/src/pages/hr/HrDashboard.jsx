import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, LogOut, Phone, Mail, Hash, Building2, LayoutDashboard } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const HrDashboard = () => {
  const { user: authUser } = useAuth();
  const { isDark } = useTheme();
  const { t } = useTranslation();
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
      const usersRes = await axios.get(`${API_URL}/api/users/branch`, { headers });
      if (usersRes.data.success) {
        setUsers(usersRes.data.data.filter(u => u.role !== 'admin'));
      }
      setLoading(false);
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('swayamfin_token');
    localStorage.removeItem('swayamfin_user');
    window.location.href = '/login';
  };

  if (loading) return (
    <div className={`min-h-screen ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} flex items-center justify-center`}>
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-900'} font-inter flex transition-colors duration-300`}>
      {/* Sidebar - Desktop */}
      <div className={`hidden lg:flex flex-col w-64 ${isDark ? 'bg-[#0B0F19]' : 'bg-white border-r border-slate-200'} text-slate-300 shadow-xl fixed h-full z-20 transition-all`}>
        <div className={`px-8 py-10 ${isDark ? 'bg-[#020617]' : 'bg-blue-600'} relative overflow-hidden`}>
           <div className={`absolute top-0 right-0 w-32 h-32 ${isDark ? 'bg-blue-500/10' : 'bg-white/10'} blur-[40px] rounded-full`} />
           <div className={`w-8 h-8 ${isDark ? 'bg-blue-500' : 'bg-white'} rounded-lg mb-4 flex items-center justify-center relative z-10`}>
              <Building2 className={`w-5 h-5 ${isDark ? 'text-[#020617]' : 'text-blue-600'}`} />
           </div>
           <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-white'} relative z-10`}>Swayamfin</h2>
           <p className={`text-[10px] ${isDark ? 'text-blue-400' : 'text-blue-100'} font-black uppercase tracking-widest mt-1 relative z-10`}>HR Portal</p>
        </div>
        
        <div className="flex-1 px-4 py-8 space-y-2">
           <button className={`flex items-center gap-3 w-full px-4 py-3 ${isDark ? 'bg-white/10 text-white' : 'bg-blue-50 text-blue-600'} rounded-xl font-bold text-sm transition-all`}>
             <Users className="w-4 h-4" /> Personnel
           </button>
        </div>

        <div className="p-4 border-t border-white/5">
           <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-rose-500 hover:bg-rose-500/10 rounded-xl font-bold text-sm transition-all">
             <LogOut className="w-4 h-4" /> Logout
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 relative">
        {/* Header */}
        <div className={`${isDark ? 'bg-[#0B0F19]' : 'bg-white border-b border-slate-200 shadow-sm'} px-6 lg:px-12 pt-12 pb-24 rounded-b-[48px] relative overflow-hidden transition-all`}>
          <div className={`absolute top-0 right-0 w-96 h-96 ${isDark ? 'bg-blue-500/5' : 'bg-blue-50/50'} blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3`} />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <p className={`${isDark ? 'text-white/60' : 'text-slate-500'} font-black tracking-widest text-[10px] uppercase mb-2`}>Branch HR Management</p>
              <h1 className={`text-4xl lg:text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Personnel <span className="text-blue-600 italic">Directory</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className={`text-sm font-bold ${isDark ? 'text-white/90' : 'text-slate-900'}`}>{authUser?.full_name}</p>
                <p className="text-[10px] text-blue-500 uppercase tracking-widest font-black">HR Manager</p>
              </div>
              <div className={`${isDark ? 'bg-white/10 text-blue-400 border-white/20' : 'bg-blue-50 text-blue-600 border-blue-100'} w-12 h-12 rounded-2xl flex items-center justify-center border backdrop-blur-sm font-bold text-xl`}>
                {authUser?.full_name?.charAt(0)}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 lg:px-12 -mt-12 relative z-10 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { title: "Total Branch Personnel", value: users.length, icon: Users, color: isDark ? "text-blue-400" : "text-blue-600", bg: isDark ? "bg-blue-500/10" : "bg-white shadow-sm" },
              { title: "Active Staff", value: users.filter(u => u.is_active).length, icon: UserPlus, color: "text-emerald-500", bg: isDark ? "bg-emerald-500/10" : "bg-white shadow-sm" },
            ].map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className={`${stat.bg} p-8 rounded-[32px] border ${isDark ? 'border-white/5' : 'border-slate-200'} flex items-center gap-6 shadow-xl`}>
                <div className={`w-14 h-14 ${isDark ? 'bg-white/5' : 'bg-slate-50'} rounded-2xl flex items-center justify-center shrink-0 border ${isDark ? 'border-white/10' : 'border-slate-100'}`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.title}</p>
                  <h3 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={`${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200'} rounded-[40px] border shadow-2xl overflow-hidden transition-all`}>
            <div className={`p-10 border-b ${isDark ? 'border-white/5 bg-white/2' : 'border-slate-100 bg-slate-50'} flex justify-between items-center`}>
              <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-800'}`}>Employee Records</h2>
              <div className={`${isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-100'} px-4 py-2 border rounded-full text-xs font-black uppercase tracking-widest`}>
                 {authUser?.branch?.name}
              </div>
            </div>
            <div className="p-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {users.map(u => {
                return (
                  <div key={u._id} className={`${isDark ? 'bg-white/5 border-white/5 hover:border-blue-500/50' : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm'} p-6 rounded-[32px] transition-all border group`}>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`${isDark ? 'bg-white/10 text-white' : 'bg-slate-100 text-slate-800'} w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl border ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                           {u.full_name?.charAt(0)}
                        </div>
                        <div>
                          <h4 className={`font-black text-lg ${isDark ? 'text-white' : 'text-slate-900'} mb-1 flex items-center gap-2 group-hover:text-blue-500 transition-colors`}>
                            {u.full_name}
                            {u.is_active && <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"></span>}
                          </h4>
                          <div className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded inline-block ${
                              u.role === 'bsm' ? (isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600') : 
                              u.role === 'hr' ? (isDark ? 'bg-pink-500/20 text-pink-400' : 'bg-pink-50 text-pink-600') :
                              (isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-600')
                          }`}>
                            {u.role.replace('_', ' ')}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`space-y-4 pt-6 border-t ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
                      <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                         <Mail className="w-4 h-4 text-slate-400 shrink-0" /> <span className="truncate">{u.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                         <Phone className="w-4 h-4 text-slate-400 shrink-0" /> {u.phone}
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-sm font-bold">
                         <Hash className="w-4 h-4 text-slate-400 shrink-0" /> {u.employee_code || 'N/A'}
                      </div>
                    </div>
                  </div>
                );
              })}
              {users.length === 0 && <p className="col-span-full py-20 text-center text-slate-500 font-bold uppercase tracking-widest italic">No personnel records found.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
