import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AdminTabs from '../../components/admin/AdminTabs';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const AdminLeads = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('swayamfin_token');
      if (!token) throw new Error('Session expired.');

      const res = await axios.get(`${API_URL}/api/leads`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeads(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch leads');
      setError(err.response?.data?.message || err.message || 'Node link error.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Contacted': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'In Progress': return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'Document Submitted': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'Sanctioned': 
      case 'Disbursed': 
      case 'Closed - Won': return 'bg-green-50 text-green-600 border-green-200';
      case 'Dead Lead': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.applicant_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.mobile?.includes(searchTerm) ||
      lead.lead_number?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesType = typeFilter === 'all' || lead.loan_type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
       <div className="w-12 h-12 border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9] rounded-full animate-spin" />
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Querying Repository...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center space-y-6">
       <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-2xl">!</div>
       <div className="space-y-2">
         <h2 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Repository Fail</h2>
         <p className="text-slate-500 text-sm font-medium italic max-w-md">{error}</p>
       </div>
       <button onClick={fetchLeads} className="btn-primary py-3 px-8 text-xs">Reconnect Node</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 px-4 md:px-8 pt-24 md:pt-32 pb-32">
      <div className="max-w-7xl mx-auto">
        <AdminTabs />
        
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-2 h-2 rounded-full bg-[#0EA5E9]" />
                 <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Core Financial Node</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-[#1E293B] uppercase tracking-tighter leading-none">
                 Global <span className="text-[#0EA5E9] italic">Repository.</span>
              </h1>
           </div>
           <button className="bg-white border border-slate-200 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#1E293B] hover:bg-slate-50 transition-all shadow-sm">
              Export {filteredLeads.length} Node Data
           </button>
        </div>

        {/* Filters */}
        <div className="bg-white border border-slate-100 p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-sm mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="relative">
              <input
                type="text"
                className="input-standard w-full h-14 pl-12 rounded-2xl"
                placeholder="Search Identity / Mobile / ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-xs font-black">S</span>
           </div>
           <select 
             className="input-standard w-full h-14 rounded-2xl appearance-none"
             value={statusFilter}
             onChange={(e) => setStatusFilter(e.target.value)}
           >
              <option value="all">All States</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Document Submitted">Docs Submitted</option>
              <option value="Sanctioned">Sanctioned</option>
              <option value="Disbursed">Disbursed</option>
              <option value="Dead Lead">Dead Lead</option>
           </select>
           <select 
             className="input-standard w-full h-14 rounded-2xl appearance-none"
             value={typeFilter}
             onChange={(e) => setTypeFilter(e.target.value)}
           >
              <option value="all">All Product Classes</option>
              <option value="msme-loans">MSME Product</option>
              <option value="lap">LAP Asset</option>
              <option value="housing-loans">Housing Loan</option>
              <option value="supply-chain">Supply Chain</option>
           </select>
        </div>

        {/* List */}
        <div className="bg-white border border-slate-100 rounded-[40px] shadow-sm overflow-hidden">
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                       <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Applicant Identity</th>
                       <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Class</th>
                       <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Node Location</th>
                       <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol State</th>
                       <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Details</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100">
                    <AnimatePresence>
                       {filteredLeads.map((lead) => (
                         <motion.tr 
                            key={lead._id}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="hover:bg-slate-50 transition-all cursor-pointer group"
                            onClick={() => navigate(`/agent/lead/${lead._id}`)}
                         >
                            <td className="px-10 py-6">
                               <div className="font-black text-[#1E293B] group-hover:text-[#0EA5E9] transition-all flex items-center gap-3">
                                  {lead.applicant_name}
                                  <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded border border-slate-200">ID: {lead.lead_number}</span>
                               </div>
                               <div className="text-xs text-slate-400 font-bold mt-1 ">+91 {lead.mobile}</div>
                            </td>
                            <td className="px-6 py-6 font-bold text-[#1E293B] text-xs">
                               <div className="uppercase tracking-widest opacity-60 mb-1">{lead.loan_type?.replace('-', ' ')}</div>
                               <div className="text-[#0EA5E9] font-black">₹{(lead.loan_amount_required/100000).toFixed(2)}L</div>
                            </td>
                            <td className="px-6 py-6">
                               <div className="text-xs font-black text-slate-600 uppercase tracking-widest mb-1">{lead.location_city} Hub</div>
                               <div className="text-[9px] font-bold text-slate-400">Hub Code: {lead.branch_id?.code || 'H.O.'}</div>
                            </td>
                            <td className="px-6 py-6">
                               <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(lead.status)}`}>
                                  {lead.status}
                               </span>
                            </td>
                            <td className="px-10 py-6 text-right">
                               <span className="text-[10px] font-black text-[#0EA5E9] uppercase tracking-widest">Intercept →</span>
                            </td>
                         </motion.tr>
                       ))}
                    </AnimatePresence>
                    {!loading && filteredLeads.length === 0 && (
                      <tr><td colSpan="5" className="px-10 py-20 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">Zero Node Data Matches Search Protocol</td></tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLeads;
