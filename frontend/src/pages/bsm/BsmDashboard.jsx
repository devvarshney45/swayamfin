import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const BsmDashboard = () => {
  const { user: authUser, logout } = useAuth();
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

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

      setLeads(leadsRes.data.data || []);
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

  const getSpStats = (spId) => {
    const spLeads = leads.filter(l => l.assigned_to?._id === spId);
    return {
      total: spLeads.length,
      active: spLeads.filter(l => ['New', 'Contacted', 'In Progress', 'Document Submitted'].includes(l.status)).length,
      won: spLeads.filter(l => l.status === 'Closed - Won' || l.status === 'Disbursed').length
    };
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
       <div className="w-12 h-12 border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9] rounded-full animate-spin" />
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Syncing Hub Command...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center space-y-6">
       <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-2xl">!</div>
       <div className="space-y-2">
         <h2 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Access Link Fractured</h2>
         <p className="text-slate-500 text-sm font-medium italic max-w-md">{error}</p>
       </div>
       <button onClick={fetchData} className="btn-primary py-3 px-8 text-xs">Reconnect Hub</button>
    </div>
  );

  const totalLeads = leads.length;
  const activePipelineValue = leads
    .filter(l => ['New', 'Contacted', 'In Progress', 'Document Submitted'].includes(l.status))
    .reduce((sum, l) => sum + (Number(l.loan_amount_required) || 0), 0);
  const disbursedValue = leads
    .filter(l => l.status === 'Disbursed' || l.status === 'Closed - Won')
    .reduce((sum, l) => sum + (Number(l.loan_amount_required) || 0), 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-24 pb-20 relative">
      {/* Header Banner */}
      <div className="bg-white border-b border-slate-100 pt-16 pb-20 relative z-10 rounded-b-[60px] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="flex items-center gap-4 md:gap-6 w-full sm:w-auto">
               <div className="w-16 h-16 bg-[#0EA5E9] rounded-[24px] flex items-center justify-center text-white font-black text-2xl shadow-xl">
                  {authUser?.branch?.name?.charAt(0) || 'H'}
               </div>
               <div>
                  <div className="bg-[#1E293B] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-[0.2em] text-[#0EA5E9] mb-2 inline-block">
                    {authUser?.branch?.name || 'Regional Hub'}
                  </div>
                  <h1 className="text-3xl font-black text-[#1E293B] uppercase tracking-tighter leading-none">Branch <span className="text-[#0EA5E9] italic">Manager.</span></h1>
               </div>
            </div>
            <button 
              onClick={() => { logout(); navigate('/agent/login'); }}
              className="self-end sm:self-auto px-4 py-2 rounded-xl bg-white border border-slate-200 text-[9px] font-black text-slate-500 uppercase tracking-widest hover:text-rose-500 hover:bg-rose-50 transition-colors"
            >
              Exit Portal
            </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Hub Leads" value={totalLeads} sub="Cumulative" />
          <StatCard title="Pipeline" value={`₹${(activePipelineValue/100000).toFixed(1)}L`} sub="In Progress" color="blue" />
          <StatCard title="MTD Disbursed" value={`₹${(disbursedValue/100000).toFixed(1)}L`} sub="Approved" color="emerald" />
          <StatCard title="Active Team" value={users.length} sub="Agents" color="rose" />
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-100 rounded-[40px] md:rounded-[48px] shadow-xl overflow-hidden mb-12">
          <div className="p-6 md:p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <h2 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Personnel <span className="text-[#0EA5E9] italic">Roster.</span></h2>
             <input 
               type="text" 
               placeholder="Search by name..."
               className="bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl text-xs font-bold outline-none focus:border-[#0EA5E9] transition-all w-64"
               value={searchTerm}
               onChange={e => setSearchTerm(e.target.value)}
             />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Partner Identity</th>
                  <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Total</th>
                  <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Active</th>
                  <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Disbursed</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Yield</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.filter(u => u.full_name?.toLowerCase().includes(searchTerm.toLowerCase())).map((sp, idx) => {
                  const stats = getSpStats(sp._id);
                  const convRate = stats.total > 0 ? Math.round((stats.won / stats.total) * 100) : 0;
                  return (
                    <tr key={sp._id} className="hover:bg-slate-50 transition-all group cursor-pointer" onClick={() => navigate(`/admin/agents/${sp._id}`)}>
                      <td className="px-10 py-6 flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 text-[#1E293B] rounded-xl flex items-center justify-center font-black text-sm group-hover:bg-[#0EA5E9] group-hover:text-white transition-all">
                           {sp.full_name?.charAt(0)}
                        </div>
                        <div>
                          <p className="text-base font-black text-[#1E293B] uppercase tracking-tight">{sp.full_name}</p>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{sp.employee_code || (2000 + idx)}</p>
                        </div>
                      </td>
                      <td className="px-6 py-6 font-black text-[#1E293B] text-lg">{stats.total}</td>
                      <td className="px-6 py-6 font-black text-[#0EA5E9] text-lg">{stats.active}</td>
                      <td className="px-6 py-6 font-black text-emerald-500 text-lg uppercase">{stats.won}</td>
                      <td className="px-10 py-6 text-right">
                        <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border ${convRate > 20 ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                          {convRate}% Win
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pipeline Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PipelineCol title="New Entries" status="New" leads={leads} navigate={navigate} />
          <PipelineCol title="In Diligence" status={['Contacted', 'In Progress', 'Document Submitted']} leads={leads} navigate={navigate} />
          <PipelineCol title="Deployment" status={['Sanctioned', 'Disbursed', 'Closed - Won']} leads={leads} navigate={navigate} />
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ title, value, sub, color }) => (
  <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-sm hover:shadow-xl transition-all group">
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{title}</p>
    <h3 className="text-3xl font-black text-[#1E293B] tracking-tighter leading-none mb-1">{value}</h3>
    <p className={`text-[9px] font-black uppercase tracking-widest ${color === 'emerald' ? 'text-emerald-500' : color==='blue' ? 'text-blue-500' : color==='rose' ? 'text-rose-500' : 'text-slate-400'}`}>{sub}</p>
  </div>
);

const PipelineCol = ({ title, status, leads, navigate }) => {
  const filtered = leads.filter(l => Array.isArray(status) ? status.includes(l.status) : l.status === status);
  return (
    <div className="bg-white border border-slate-100 rounded-[32px] md:rounded-[48px] p-6 md:p-8 shadow-sm h-[600px] overflow-y-auto no-scrollbar">
      <h3 className="font-black text-[#1E293B] text-[10px] uppercase tracking-widest mb-8 flex justify-between items-center group sticky top-0 bg-white pb-4 z-10">
        {title} <span className="bg-[#0EA5E9] text-white px-3 py-1 rounded-full">{filtered.length}</span>
      </h3>
      <div className="space-y-4">
        {filtered.map(l => (
          <div key={l._id} onClick={() => navigate(`/agent/lead/${l._id}`)} className="p-6 bg-slate-50 border border-slate-100 rounded-[32px] cursor-pointer hover:border-[#0EA5E9] hover:bg-white transition-all group">
            <p className="text-[9px] font-black text-[#0EA5E9] mb-2 uppercase">{l.lead_number}</p>
            <p className="text-sm font-black text-[#1E293B] group-hover:text-[#0EA5E9] transition-all uppercase tracking-tight">{l.applicant_name}</p>
            <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center text-[9px] font-bold text-slate-400">
               <span>{l.assigned_to?.full_name?.split(' ')[0] || 'Available'}</span>
               <span className="text-[#1E293B]">₹{(l.loan_amount_required/100000).toFixed(1)}L</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BsmDashboard;
