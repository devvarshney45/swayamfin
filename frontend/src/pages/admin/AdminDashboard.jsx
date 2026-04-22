import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { 
  Users, TrendingUp, DollarSign, XCircle, LayoutDashboard, Building2, Download, LogOut, CheckCircle2 as CheckCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminTabs from '../../components/admin/AdminTabs';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [leads, setLeads] = useState([]);
  const [branches, setBranches] = useState([]);
  const [agentCount, setAgentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Filter
  const [selectedBranch, setSelectedBranch] = useState('ALL');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('swayamfin_token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const [leadsRes, usersRes, branchRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/leads`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/users`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/branches`, { headers })
      ]);
      
      setLeads(leadsRes.data.data);
      setAgentCount(usersRes.data.data.filter(u => u.role === 'sales_person').length);
      setBranches(branchRes.data.data);
    } catch (err) {
      console.error('Failed to fetch', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-blue-600"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>;

  const filteredLeads = selectedBranch === 'ALL' ? leads : leads.filter(l => l.branch_id?._id === selectedBranch);

  const stats = {
    total: filteredLeads.length,
    active: filteredLeads.filter(l => ['New', 'Contacted', 'In Progress', 'Document Submitted'].includes(l.status)).length,
    disbursed: filteredLeads.filter(l => ['Disbursed', 'Closed - Won'].includes(l.status)).length,
    dead: filteredLeads.filter(l => l.status === 'Dead Lead').length,
    pipelineValue: filteredLeads.reduce((acc, curr) => acc + (curr.loan_amount_required || 0), 0)
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 pb-20 font-inter">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center py-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 shadow-sm">
                <LayoutDashboard className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Global Command Center</h1>
                <p className="text-slate-500 text-sm font-medium">Welcome back, Super Admin</p>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto items-center">
              <select 
                value={selectedBranch}
                onChange={e => setSelectedBranch(e.target.value)}
                className="flex-1 md:flex-none border border-slate-200 bg-white text-slate-700 rounded-xl px-4 py-2 font-bold outline-none hover:bg-slate-50 focus:ring-2 focus:ring-blue-500/20 transition shadow-sm"
              >
                <option value="ALL">ALL BRANCHES</option>
                {branches.map(b => (
                  <option key={b._id} value={b._id}>{b.code} - {b.name.toUpperCase()}</option>
                ))}
              </select>
              <button className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-2 font-bold shadow-sm transition items-center gap-2">
                <Download className="w-4 h-4"/> Export
              </button>
              <button 
                onClick={() => { localStorage.removeItem('swayamfin_token'); window.location.href = '/agent/login'; }}
                className="w-10 h-10 rounded-xl bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 flex justify-center items-center transition-all border border-slate-200 shadow-sm"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        <AdminTabs />
        
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <KPICard title="Total Leads" val={stats.total} icon={<Users/>} color="blue" />
          <KPICard title="Active Leads" val={stats.active} icon={<TrendingUp/>} color="indigo" />
          <KPICard title="Disbursed" val={stats.disbursed} icon={<CheckCircle/>} color="emerald" />
          <KPICard title="Dead Leads" val={stats.dead} icon={<XCircle/>} color="rose" />
          <KPICard title="Pipeline Val." val={`₹${(stats.pipelineValue/100000).toFixed(0)}L`} icon={<DollarSign/>} color="amber" />
          <KPICard title="Total SPs" val={agentCount} icon={<Building2/>} color="purple" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Funnel Proxy */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm flex flex-col">
            <h3 className="text-lg font-black text-slate-900 mb-6">Lead Status Funnel</h3>
            <div className="space-y-5 flex-1">
              {[
                { label: 'New', count: filteredLeads.filter(l=>l.stage==='new').length, width: '100%', baseBg: 'bg-blue-50', textColor: 'text-blue-700', border: 'border-blue-200' },
                { label: 'In Progress', count: filteredLeads.filter(l=>l.stage==='in_progress').length, width: '80%', baseBg: 'bg-indigo-50', textColor: 'text-indigo-700', border: 'border-indigo-200' },
                { label: 'Docs Uploaded', count: filteredLeads.filter(l=>l.stage==='docs_submitted').length, width: '60%', baseBg: 'bg-purple-50', textColor: 'text-purple-700', border: 'border-purple-200' },
                { label: 'Sanctioned', count: filteredLeads.filter(l=>l.stage==='sanctioned').length, width: '40%', baseBg: 'bg-emerald-50', textColor: 'text-emerald-700', border: 'border-emerald-200' },
                { label: 'Disbursed', count: filteredLeads.filter(l=>l.stage==='disbursed').length, width: '20%', baseBg: 'bg-green-50', textColor: 'text-green-700', border: 'border-green-200' },
              ].map((f, i) => (
                <div key={f.label} className="relative h-12 w-full flex items-center justify-between">
                  <div className={`absolute top-0 left-0 bottom-0 ${f.baseBg} rounded-r-xl border-y border-r ${f.border}`} style={{width: f.width}}></div>
                  <span className={`font-bold text-sm z-10 pl-5 ${f.textColor}`}>{f.label}</span>
                  <span className={`font-black text-lg z-10 pr-5 ${f.textColor}`}>{f.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
             <h3 className="text-lg font-black text-slate-900 mb-6">Branch Distribution</h3>
             <div className="space-y-6">
               {branches.map(b => {
                 const count = leads.filter(l => l.branch_id?._id === b._id).length;
                 const perc = leads.length > 0 ? (count / leads.length) * 100 : 0;
                 return (
                   <div key={b._id}>
                     <div className="flex justify-between text-sm font-bold mb-2 text-slate-700">
                       <span>{b.name}</span>
                       <span className="text-blue-600">{count} leads</span>
                     </div>
                     <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden shadow-inner">
                       <motion.div initial={{width:0}} animate={{width:`${perc}%`}} className="h-full bg-blue-600 rounded-full" />
                     </div>
                   </div>
                 )
               })}
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const KPICard = ({ title, val, icon, color }) => (
  <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="bg-white p-6 rounded-3xl border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all shadow-sm">
    <div className={`absolute right-0 top-0 w-24 h-24 bg-${color}-50 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-${color}-100`}></div>
    <div className="flex justify-between items-start mb-3 relative z-10">
      <h3 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{title}</h3>
      <div className={`text-${color}-600 w-5 h-5`}>{icon}</div>
    </div>
    <div className="text-2xl font-black text-slate-900 relative z-10">{val}</div>
  </motion.div>
);

export default AdminDashboard;
