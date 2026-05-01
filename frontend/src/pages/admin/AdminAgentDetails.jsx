import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import AdminTabs from '../../components/admin/AdminTabs';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const AdminAgentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgentData();
  }, [id]);

  const fetchAgentData = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('swayamfin_token');
      const headers = { Authorization: `Bearer ${token}` };

      const [userRes, leadsRes] = await Promise.all([
        axios.get(`${API_URL}/api/users/${id}`, { headers }),
        axios.get(`${API_URL}/api/leads`, { headers })
      ]);

      const agentData = userRes.data.data;
      setAgent(agentData);
      
      // Filter leads assigned to this agent (assuming leads have assigned_sales_person or similar)
      // If the backend doesn't store assignment explicitly in lead, we might need a different query.
      // Based on my knowledge, leads have assigned_sales_person (ObjectId)
      const agentLeads = (leadsRes.data.data || []).filter(l => 
        l.assigned_to === id || l.assigned_to?._id === id
      );
      setLeads(agentLeads);

    } catch (err) {
      console.error(err);
      setError('Personnel file retrieval failed.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
       <div className="w-12 h-12 border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9] rounded-full animate-spin" />
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Intercepting Personnel Record...</p>
    </div>
  );

  if (error || !agent) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center space-y-6">
       <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-2xl">!</div>
       <div className="space-y-2">
         <h2 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Record Lost</h2>
         <p className="text-slate-500 text-sm font-medium italic max-w-md">{error || 'Personnel not found.'}</p>
       </div>
       <button onClick={() => navigate(-1)} className="btn-primary py-3 px-8 text-xs">Return to Directory</button>
    </div>
  );

  const stats = {
    total: leads.length,
    converted: leads.filter(l => l.status === 'Disbursed' || l.status === 'Closed - Won').length,
    active: leads.filter(l => !['Sanctioned', 'Disbursed', 'Dead Lead', 'Closed - Won'].includes(l.status)).length
  };

  const conversionRate = stats.total > 0 ? Math.round((stats.converted / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 px-4 md:px-12 pt-24 md:pt-32 pb-32">
      <div className="max-w-7xl mx-auto">
        <AdminTabs />
        
        {/* Navigation / Actions */}
        <div className="mb-12 flex justify-between items-center px-4">
           <button onClick={() => navigate(-1)} className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:text-[#0EA5E9] transition-all">
              ← Return
           </button>
           <button className="bg-white border border-slate-200 px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
              Export Personnel Audit
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
           
           {/* Profile Side */}
           <div className="lg:col-span-4 space-y-8">
              <div className="bg-white border border-slate-100 p-12 rounded-[56px] shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 blur-3xl rounded-full -mr-16 -mt-16" />
                 
                 <div className="relative z-10 space-y-10">
                    <div className="w-24 h-24 bg-[#1E293B] rounded-[32px] flex items-center justify-center font-black text-white text-4xl italic shadow-2xl">
                       {agent.full_name?.charAt(0)}
                    </div>
                    
                    <div className="space-y-2">
                       <h1 className="text-3xl font-black text-[#1E293B] uppercase tracking-tighter leading-tight">{agent.full_name}</h1>
                       <p className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-[0.4em] italic">{agent.role === 'sales_person' ? 'Strategic Partner' : agent.role.toUpperCase()}</p>
                    </div>

                    <div className="space-y-6 pt-10 border-t border-slate-50">
                       <InfoBlock label="Employee Code" value={agent.employee_code || '---'} />
                       <InfoBlock label="Email Terminal" value={agent.email} />
                       <InfoBlock label="Phone Link" value={agent.phone || '---'} />
                       <InfoBlock label="Assigned Hub" value={agent.branch_id?.name || 'Central Command'} />
                    </div>
                 </div>
              </div>

              {/* Performance Summary */}
              <div className="bg-[#1E293B] p-12 rounded-[56px] shadow-2xl relative overflow-hidden text-white">
                 <div className="absolute top-0 right-0 w-48 h-48 bg-[#0EA5E9]/10 blur-3xl rounded-full -mr-24 -mt-24" />
                 <div className="relative z-10 space-y-10">
                    <h3 className="text-xl font-black uppercase tracking-tight">Performance Matrix</h3>
                    <div className="grid grid-cols-2 gap-8">
                       <div>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Conversion</p>
                          <p className="text-4xl font-black text-[#0EA5E9] tracking-tighter">{conversionRate}%</p>
                       </div>
                       <div>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Live Nodes</p>
                          <p className="text-4xl font-black text-white tracking-tighter">{stats.active}</p>
                       </div>
                    </div>
                    <div className="pt-8 border-t border-white/5">
                       <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] italic leading-relaxed">
                          "Currently maintaining an optimization level of {conversionRate > 20 ? 'Optimal' : 'Standard'} in regional lead conversion."
                       </p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Content Main */}
           <div className="lg:col-span-8 space-y-12">
              <div className="flex justify-between items-center px-2">
                 <h2 className="text-2xl font-black text-[#1E293B] uppercase tracking-tighter">Assigned <span className="text-[#0EA5E9] italic">Leads.</span></h2>
                 <span className="bg-slate-100 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">{leads.length} Records Found</span>
              </div>

              <div className="bg-white border border-slate-100 rounded-[56px] shadow-sm overflow-hidden">
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                             <th className="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Client Node</th>
                             <th className="px-6 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">Product</th>
                             <th className="px-6 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em]">State</th>
                             <th className="px-10 py-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Details</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {leads.map(lead => (
                            <tr key={lead._id} className="hover:bg-slate-50 transition-all group cursor-pointer" onClick={() => navigate(`/agent/lead/${lead._id}`)}>
                               <td className="px-10 py-6">
                                  <div className="font-black text-[#1E293B] group-hover:text-[#0EA5E9] transition-all">{lead.applicant_name}</div>
                                  <div className="text-[10px] text-slate-400 font-bold mt-1">ID: {lead.lead_number}</div>
                               </td>
                               <td className="px-6 py-6">
                                  <div className="text-xs font-black text-slate-600 uppercase tracking-widest">{lead.loan_type?.replace('-', ' ')}</div>
                                  <div className="text-[10px] text-[#0EA5E9] font-black mt-1">₹{(lead.loan_amount_required/100000).toFixed(2)}L</div>
                               </td>
                               <td className="px-6 py-6 font-bold text-[9px] uppercase tracking-widest text-slate-500">
                                  {lead.status}
                               </td>
                               <td className="px-10 py-6 text-right">
                                  <span className="text-[9px] font-black text-slate-300 group-hover:text-[#0EA5E9] transition-all">Intercept Node →</span>
                               </td>
                            </tr>
                          ))}
                          {leads.length === 0 && (
                            <tr>
                               <td colSpan="4" className="px-10 py-20 text-center text-slate-400 text-xs font-bold uppercase tracking-widest italic">
                                  No client nodes currently synchronized with this personnel.
                               </td>
                            </tr>
                          )}
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

const InfoBlock = ({ label, value }) => (
  <div>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 italic">{label}</p>
    <p className="text-sm font-black text-[#1E293B] uppercase tracking-tight">{value}</p>
  </div>
);

export default AdminAgentDetails;
