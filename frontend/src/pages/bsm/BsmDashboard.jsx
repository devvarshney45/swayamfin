import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, DollarSign, XCircle, Clock, ChevronRight, CheckCircle, Building2, LogOut } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const BsmDashboard = () => {
  const { user: authUser } = useAuth();
  const [leads, setLeads] = useState([]);
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
      const [leadsRes, usersRes] = await Promise.all([
        axios.get(`${API_URL}/api/leads`, { headers }),
        axios.get(`${API_URL}/api/users/branch`, { headers }) // Note: need this endpoint
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

  if (loading) return <div className="min-h-screen bg-[#F8FAFC] text-blue-600 flex justify-center items-center">Loading...</div>;

  const totalLeads = leads.length;
  const activePipeline = leads.filter(l => ['New', 'Contacted', 'In Progress', 'Document Submitted'].includes(l.status)).length;
  const disbursed = leads.filter(l => l.status === 'Disbursed' || l.status === 'Closed - Won').length;
  const deadLeads = leads.filter(l => l.status === 'Dead Lead').length;

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 font-inter text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 pt-8 pb-4 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center mb-1">
             <div className="flex items-center gap-2">
                <div className="bg-blue-600 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest text-white shadow-sm border border-blue-700">
                  {authUser?.branch?.name || 'Main Branch'}
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Branch Manager Portal</h1>
             </div>
             <button 
               onClick={() => { localStorage.removeItem('swayamfin_token'); window.location.href = '/agent/login'; }}
               className="w-10 h-10 rounded-xl bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 flex justify-center items-center transition-all border border-slate-200 shadow-sm"
               title="Logout"
             >
               <LogOut className="w-4 h-4" />
             </button>
          </div>
          <p className="text-slate-500 text-sm font-medium">Overview of your branch's performance</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <KPICard title="Total Branch Leads" value={totalLeads} icon={<Users className="w-5 h-5 text-blue-600"/>} color="blue" />
          <KPICard title="Active Pipeline" value={activePipeline} icon={<TrendingUp className="w-5 h-5 text-indigo-600"/>} color="indigo" />
          <KPICard title="MTD Disbursed" value={disbursed} icon={<DollarSign className="w-5 h-5 text-emerald-600"/>} color="emerald" />
          <KPICard title="Dead Leads" value={deadLeads} icon={<XCircle className="w-5 h-5 text-rose-600"/>} color="rose" />
        </div>

        {/* Team Performance Table */}
        <h2 className="text-lg font-black text-slate-900 mb-4">Team Performance</h2>
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-8 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Sales Person</th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Total Leads</th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Active</th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Disbursed</th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Dead</th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Conv. Rate</th>
                </tr>
              </thead>
              <tbody>
                {users.map(sp => {
                  const stats = getSpStats(sp._id);
                  const convRate = stats.total > 0 ? Math.round((stats.won / stats.total) * 100) : 0;
                  return (
                    <tr key={sp._id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 text-xs font-black">{sp.full_name?.charAt(0)}</div>
                        <div>
                          {sp.full_name}
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                             <Building2 className="w-3 h-3" />
                             <span className="bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded text-blue-600">
                               {sp.branch?.code || 'H.O.'}
                             </span> Branch
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">{stats.total}</td>
                      <td className="px-6 py-4 font-bold text-indigo-600">{stats.active}</td>
                      <td className="px-6 py-4 font-bold text-emerald-600">{stats.won}</td>
                      <td className="px-6 py-4 font-bold text-rose-600">{stats.dead}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded text-xs font-black uppercase tracking-widest ${convRate > 20 ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                          {convRate}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {users.length === 0 && (
                  <tr><td colSpan="6" className="text-center py-8 text-slate-500 font-medium">No active sales persons in this branch.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Very Simple Pipeline Kanban-style display */}
        <h2 className="text-lg font-black text-slate-900 mb-4">Pipeline Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <PipelineCol title="New" status="New" leads={leads} navigate={navigate} />
          <PipelineCol title="In Progress" status={['Contacted', 'In Progress']} leads={leads} navigate={navigate} />
          <PipelineCol title="Docs Submitted" status="Document Submitted" leads={leads} navigate={navigate} />
          <PipelineCol title="Sanctioned" status="Sanctioned" leads={leads} navigate={navigate} />
        </div>

      </div>
    </div>
  );
};

const KPICard = ({ title, value, icon, color }) => (
  <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="bg-white rounded-3xl p-6 border border-slate-200 relative overflow-hidden shadow-sm">
    <div className={`absolute top-0 right-0 w-20 h-20 bg-${color}-50 rounded-full blur-2xl -mr-8 -mt-8`}></div>
    <div className="flex justify-between items-start mb-3">
      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{title}</p>
      {icon}
    </div>
    <h3 className="text-3xl font-black text-slate-900">{value}</h3>
  </motion.div>
);

const PipelineCol = ({ title, status, leads, navigate }) => {
  const filtered = leads.filter(l => Array.isArray(status) ? status.includes(l.status) : l.status === status);
  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-200 h-[500px] overflow-y-auto no-scrollbar shadow-sm">
      <h3 className="font-bold text-slate-600 text-xs uppercase tracking-widest mb-4 flex justify-between items-center">
        {title} <span className="bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full text-[10px] font-black">{filtered.length}</span>
      </h3>
      <div className="space-y-3">
        {filtered.map(l => (
          <div key={l._id} onClick={() => navigate(`/agent/lead/${l._id}`)} className="bg-slate-50 hover:bg-white p-4 rounded-2xl cursor-pointer border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2 bg-blue-50 inline-block px-2 py-0.5 rounded-md border border-blue-100">{l.lead_number}</p>
            <p className="font-bold text-slate-900 text-sm mb-2">{l.applicant_name}</p>
            <p className="text-xs text-slate-500 flex items-center justify-between font-medium">
              <span>{l.assigned_to?.full_name?.split(' ')[0] || 'Unassigned'}</span>
              <span className="font-bold text-slate-700">₹{(l.loan_amount_required/100000).toFixed(1)}L</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BsmDashboard;
