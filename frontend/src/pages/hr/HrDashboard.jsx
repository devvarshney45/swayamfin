import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, LogOut, Phone, Mail, Hash, Building2 } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const HrDashboard = () => {
  const { user: authUser } = useAuth();
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
        // HR sees everyone in the branch except admin
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

  if (loading) return <div className="min-h-screen bg-[#F8FAFC] text-blue-600 flex justify-center items-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-dmsans flex">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex flex-col w-64 bg-[#0B0F19] text-slate-300 shadow-xl fixed h-full z-20">
        <div className="px-8 py-10 bg-[#020617] relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/10 blur-[40px] rounded-full" />
           <div className="w-8 h-8 bg-primary-gold rounded-lg mb-4 flex items-center justify-center relative z-10">
              <Building2 className="w-5 h-5 text-[#020617]" />
           </div>
           <h2 className="text-xl font-playfair font-black text-white relative z-10">Swayamfin</h2>
           <p className="text-[10px] text-primary-gold font-black uppercase tracking-widest mt-1 relative z-10">HR Portal</p>
        </div>
        
        <div className="flex-1 px-4 py-8 space-y-2">
           <button className="flex items-center gap-3 w-full px-4 py-3 bg-white/10 text-white rounded-xl font-bold text-sm">
             <Users className="w-4 h-4 text-primary-gold" /> Personnel
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 relative">
        {/* Header */}
        <div className="bg-[#0B0F19] px-6 lg:px-12 pt-12 pb-24 rounded-b-[48px] shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-gold/5 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div>
              <p className="text-white/60 font-medium tracking-widest text-sm uppercase mb-2">Branch HR Portal</p>
              <h1 className="text-4xl lg:text-5xl font-playfair font-black text-white">
                HR Management <span className="text-primary-gold italic">Hub</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white/90">{authUser?.full_name}</p>
                <p className="text-xs text-primary-gold capitalize tracking-widest">HR Manager</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-sm text-primary-gold font-bold text-xl">
                {authUser?.full_name?.charAt(0)}
              </div>
              <button 
                onClick={handleLogout}
                className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-2xl transition-colors shrink-0"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 lg:px-12 -mt-10 relative z-10 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { title: "Total Branch Personnel", value: users.length, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
              { title: "Active Staff", value: users.filter(u => u.is_active).length, icon: UserPlus, color: "text-emerald-600", bg: "bg-emerald-100" },
            ].map((stat, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
                <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center shrink-0`}>
                  <stat.icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-2xl font-black font-playfair text-slate-800">Branch Personnel Directory</h2>
            </div>
            <div className="p-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {users.map(u => {
                return (
                  <div key={u._id} className="p-6 bg-white border border-slate-200 rounded-[24px] hover:border-primary-gold/50 transition-all shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-playfair font-black text-lg text-slate-800 mb-1 flex items-center gap-2">
                          {u.full_name}
                          {u.is_active && <span className="w-2 h-2 rounded-full bg-success-green shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>}
                        </h4>
                        <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded inline-block ${
                            u.role === 'bsm' ? 'bg-indigo-50 text-indigo-700' : 
                            u.role === 'hr' ? 'bg-pink-50 text-pink-700' :
                            'bg-slate-100 text-slate-500'
                        }`}>
                          {u.role.replace('_', ' ')}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                         <Mail className="w-4 h-4 text-slate-400 shrink-0" /> <span className="truncate">{u.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                         <Phone className="w-4 h-4 text-slate-400 shrink-0" /> {u.phone}
                      </div>
                      <div className="flex items-center gap-3 text-slate-500 text-sm font-medium">
                         <Hash className="w-4 h-4 text-slate-400 shrink-0" /> {u.employee_code || 'N/A'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HrDashboard;
