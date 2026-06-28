import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, ChevronRight, Calendar, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://swayamfin.onrender.com' : 'http://localhost:5001');

const BsmDashboard = () => {
  const { user: authUser, logout } = useAuth();
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [monthOffset, setMonthOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [monthOffset]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('swayamfin_token');
      if (!token) throw new Error('Session terminated.');

      const headers = { Authorization: `Bearer ${token}` };
      const [leadsRes, usersRes] = await Promise.all([
        axios.get(`${API_URL}/api/leads`, { headers }),
        axios.get(`${API_URL}/api/users/branch`, { headers })
      ]);

      if (leadsRes.data.success) {
        setLeads(leadsRes.data.data || []);
      }
      if (usersRes.data.success) {
        setUsers(usersRes.data.data.filter(u => u.role === 'sales_person' || u.role === 'agent'));
      }
    } catch(err) {
      console.error('BSM Fetch Error:', err);
      setError(err.response?.data?.message || err.message || 'Node sync fail.');
    } finally {
      setLoading(false);
    }
  };

  const getTargetMonthLabel = () => {
    const d = new Date();
    d.setMonth(d.getMonth() - monthOffset);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const filterMonthlyLeads = (data) => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() - monthOffset);
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();

    return data.filter(l => {
      const d = new Date(l.createdAt);
      return d.getMonth() === targetMonth && d.getFullYear() === targetYear;
    });
  };

  const monthlyLeads = filterMonthlyLeads(leads);
  const totalLeads = monthlyLeads.length;
  const pipelineValue = monthlyLeads
    .filter(l => !['Disbursed', 'Dead Lead', 'Closed - Won'].includes(l.status))
    .reduce((sum, l) => sum + (Number(l.loan_amount_required) || 0), 0);
  const sanctionedValue = monthlyLeads
    .filter(l => ['Under Sanction', 'Under Disbursement', 'Disbursed'].includes(l.status) || l.sanction === true)
    .reduce((sum, l) => sum + (Number(l.sanction_amount) || Number(l.loan_amount_required) || 0), 0);
  const disbursedValue = monthlyLeads
    .filter(l => l.status === 'Disbursed')
    .reduce((sum, l) => sum + (Number(l.disbursed_amount) || Number(l.loan_amount_required) || 0), 0);

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
       <div className="w-10 h-10 border-4 border-slate-200 border-t-primary rounded-full animate-spin" />
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Loading Dashboard...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20 font-plus">
      {/* Header Overlay */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-start border-b border-slate-100">
          <div>
             <h1 className="text-4xl font-black tracking-tighter uppercase text-slate-900 leading-none">
                {authUser?.branch?.name || 'Central'} <span className="text-primary italic">Branch.</span>
             </h1>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-3">Branch Overview</p>
          </div>
          <div className="text-right">
             <h2 className="text-2xl font-black tracking-tighter uppercase text-slate-900 leading-none">
                {authUser?.full_name} <span className="text-primary italic opacity-50">.</span>
             </h2>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Branch Manager</p>
             <button onClick={() => { logout(); navigate('/agent/login'); }} className="mt-4 text-[11px] font-black text-rose-500 uppercase tracking-widest hover:underline transition-all">Exit Portal</button>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
          {/* KPI Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-16">
              <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Total Leads</p>
                 <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{totalLeads}</h3>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Pipeline Balance</p>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">₹{(pipelineValue/100000).toFixed(1)}L</h3>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Sanctioned</p>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">₹{(sanctionedValue/100000).toFixed(1)}L</h3>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl">
                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">Disbursed</p>
                 <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">₹{(disbursedValue/100000).toFixed(1)}L</h3>
              </div>
              
              {/* Month Selector */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-between shadow-xl">
                  <div className="flex justify-between items-center text-primary">
                     <button onClick={() => setMonthOffset(prev => prev + 1)} className="hover:scale-110 transition-transform"><ChevronLeft size={18} /></button>
                     <Calendar size={14} className="opacity-50" />
                     <button onClick={() => setMonthOffset(prev => Math.max(0, prev - 1))} className={`hover:scale-110 transition-transform ${monthOffset === 0 ? 'opacity-20 pointer-events-none' : ''}`}><ChevronRight size={18} /></button>
                  </div>
                  <p className="text-white text-[10px] font-black uppercase tracking-widest text-center mt-4 italic">{getTargetMonthLabel()}</p>
              </div>
          </div>

          {/* Main Content - RM List & Clients */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
             {/* RM List Column */}
             <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-slate-100 pb-6 mb-4">
                   <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Relationship <span className="text-primary italic">Managers.</span></h2>
                   <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-black">{users.length}</span>
                </div>
                <div className="space-y-1">
                   {users.map((rm, idx) => (
                      <Link 
                        to={`/agent/dashboard/${rm._id}`}
                        key={rm._id} 
                        className="flex items-center gap-6 py-4 border-b border-slate-50 hover:bg-slate-50 transition-all cursor-pointer group block"
                      >
                         <span className="text-[10px] font-black text-slate-300 italic group-hover:text-primary transition-all">0{idx + 1}</span>
                         <span className="text-sm font-bold text-slate-600 uppercase tracking-tighter group-hover:text-slate-900 transition-all">{rm.full_name}</span>
                      </Link>
                   ))}
                </div>
             </div>

             {/* Clients Column */}
             <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-slate-100 pb-6 mb-4">
                   <h2 className="text-2xl font-black uppercase tracking-tighter text-slate-900">Client <span className="text-primary italic">Portfolio.</span></h2>
                   <div className="flex items-center gap-3">
                      <button className="text-slate-400 hover:text-primary transition-all"><Filter size={16} /></button>
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-[10px] font-black">{monthlyLeads.length}</span>
                   </div>
                </div>
                <div className="space-y-1">
                   {monthlyLeads.slice(0, 10).map((lead, idx) => (
                      <div key={lead._id} className="flex items-center justify-between py-4 border-b border-slate-50 hover:bg-slate-50 transition-all cursor-pointer group">
                         <div className="flex items-center gap-6">
                            <span className="text-[10px] font-black text-slate-300 italic group-hover:text-primary transition-all">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                            <span className="text-sm font-bold text-slate-600 uppercase tracking-tighter group-hover:text-slate-900 transition-all truncate max-w-[200px]">{lead.applicant_name}</span>
                         </div>
                         <div className="flex items-center gap-4">
                            <span className="text-[9px] font-black text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded-md">{lead.status}</span>
                            <span className="text-[11px] font-black text-slate-900">₹{(lead.loan_amount_required/100000).toFixed(1)}L</span>
                         </div>
                      </div>
                   ))}
                   {monthlyLeads.length > 10 && (
                      <button className="w-full py-4 text-[9px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-primary transition-all">View All Capacity</button>
                   )}
                   {monthlyLeads.length === 0 && (
                      <p className="py-10 text-center text-slate-400 text-xs italic font-medium uppercase tracking-widest">No node data in this timeframe.</p>
                   )}
                </div>
             </div>
          </div>
      </div>
    </div>
  );
};

export default BsmDashboard;
