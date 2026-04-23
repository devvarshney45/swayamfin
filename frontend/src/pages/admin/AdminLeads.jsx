import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Download, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  User,
  MapPin,
  Mail,
  FileText,
  Building2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import AdminTabs from '../../components/admin/AdminTabs';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const AdminLeads = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('swayamfin_token');
      const res = await axios.get(`${API_URL}/api/leads`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeads(res.data.data);
    } catch (err) {
      console.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Contacted': return isDark ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'In Progress': return isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'Document Submitted': return isDark ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-50 text-purple-600 border-purple-200';
      case 'Sanctioned': 
      case 'Disbursed': 
      case 'Closed - Won': return isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Dead Lead': return isDark ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-rose-50 text-rose-600 border-rose-200';
      default: return isDark ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 'bg-slate-50 text-slate-600 border-slate-200';
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

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-800'} px-4 md:px-8 pt-28 md:pt-36 font-inter transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <AdminTabs />
        
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
             <div className={`${isDark ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'} rounded-xl p-3 shadow-sm border`}>
                <FileText className="text-blue-500 w-6 h-6" />
             </div>
             <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Global Lead Repository</h1>
                <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-sm font-medium italic`}>All incoming inquiries across all branches.</p>
             </div>
          </div>
          <button className={`${isDark ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'} px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-sm border`}>
             <Download className="w-5 h-5" /> Export {filteredLeads.length} Leads
          </button>
        </div>

        {/* Filters and Search */}
        <div className={`${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200'} p-6 rounded-[32px] border mb-8 shadow-sm`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group lg:col-span-1">
              <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                className={`w-full pl-12 pr-4 py-3.5 ${isDark ? 'bg-white/5 border-white/10 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'} focus:border-blue-500 focus:bg-transparent rounded-2xl transition-all outline-none font-medium focus:ring-2 focus:ring-blue-500/10`}
                placeholder="Search name, mobile, lead ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <select 
                className={`w-full px-5 py-3.5 ${isDark ? 'bg-[#111827] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'} focus:border-blue-500 rounded-2xl transition-all outline-none font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500/10`}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="In Progress">In Progress</option>
                <option value="Document Submitted">Docs Submitted</option>
                <option value="Sanctioned">Sanctioned</option>
                <option value="Disbursed">Disbursed</option>
                <option value="Dead Lead">Dead Lead</option>
              </select>
            </div>

            <div>
              <select 
                className={`w-full px-5 py-3.5 ${isDark ? 'bg-[#111827] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-700'} focus:border-blue-500 rounded-2xl transition-all outline-none font-bold appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500/10`}
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Loan Types</option>
                <option value="msme_structured">MSME Structured Product</option>
                <option value="lap">Loan Against Property (LAP)</option>
                <option value="micro_lap">Micro LAP</option>
                <option value="home_loan">Housing Loan</option>
                <option value="supply_chain">Supply Chain Finance</option>
                <option value="hybrid">Hybrid Product</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] px-2">
            <span>Displaying {filteredLeads.length} records</span>
            <button onClick={() => { setSearchTerm(''); setStatusFilter('all'); setTypeFilter('all'); }} className="text-blue-500 hover:text-blue-700 transition-colors">Reset Global Filters</button>
          </div>
        </div>

        {/* Leads Table */}
        <div className={`${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200'} rounded-[40px] border overflow-hidden shadow-sm`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200'} border-b`}>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Applicant / Contact</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Loan & Amount</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Location & Branch</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Assigned Personnel</th>
                  <th className="px-6 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-[0.15em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
                {loading ? (
                  <tr><td colSpan="6" className="p-20 text-center text-slate-500 font-bold"><div className="animate-pulse">Loading records...</div></td></tr>
                ) : (
                  <AnimatePresence>
                    {filteredLeads.map((lead) => (
                      <motion.tr 
                        key={lead._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`group ${isDark ? 'hover:bg-white/5' : 'hover:bg-blue-50/30'} transition-all cursor-pointer`}
                        onClick={() => navigate(`/agent/lead/${lead._id}`)}
                      >
                        <td className="px-8 py-5">
                          <div className={`flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'} font-bold group-hover:text-blue-500 transition-colors`}>
                            {lead.applicant_name}
                            <span className={`${isDark ? 'bg-white/10 text-slate-400' : 'bg-slate-100 text-slate-500'} text-[10px] font-black border ${isDark ? 'border-white/10' : 'border-slate-200'} px-2 py-0.5 rounded uppercase tracking-wider`}>{lead.lead_number}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                             <div className="flex items-center gap-1.5 text-slate-500 font-medium text-xs">
                               <Phone className="w-3 h-3" /> {lead.mobile}
                             </div>
                             {lead.email && (
                               <div className={`${isDark ? 'text-slate-500' : 'text-slate-400'} flex items-center gap-1.5 font-medium text-xs`}>
                                 <Mail className="w-3 h-3" /> {lead.email}
                               </div>
                             )}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className={`${isDark ? 'text-slate-300' : 'text-slate-800'} font-bold text-sm capitalize mb-1`}>{lead.loan_type?.replace('_', ' ')}</div>
                          <div className="text-blue-500 font-black text-xs tracking-wide">
                            ₹{(lead.loan_amount_required/100000).toFixed(2)}L
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className={`flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-slate-700'} font-bold text-xs uppercase tracking-wider mb-1.5`}>
                             <MapPin className="w-3.5 h-3.5 text-slate-500" />
                             {lead.location_city}
                          </div>
                          <div className="text-[10px] text-slate-500 font-bold flex items-center gap-1.5">
                             <Building2 className="w-3 h-3" />
                             <span className={`${isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-100 text-blue-600'} px-1.5 py-0.5 rounded text-[9px] font-black border`}>
                               {lead.branch_id?.code || 'H.O.'}
                             </span> Branch
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2">
                             <div className={`${isDark ? 'bg-white/5 border-white/10 text-slate-500 group-hover:text-blue-400' : 'bg-slate-100 border-slate-200 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'} w-9 h-9 rounded-xl flex items-center justify-center transition-all border`}>
                               <User className="w-4 h-4" />
                             </div>
                             <div>
                               <div className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                                 {lead.assigned_to?.full_name || <span className="text-slate-500 italic">Available</span>}
                               </div>
                               <div className="text-[10px] text-slate-500 font-medium">Sales Executive</div>
                             </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] border ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className={`p-2.5 ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-700'} hover:bg-white/5 rounded-xl transition-all`}>
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
                {!loading && filteredLeads.length === 0 && (
                   <tr><td colSpan="6" className="p-20 text-center text-slate-500 font-bold">No records found matching current criteria.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className={`px-8 py-5 ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} flex items-center justify-between border-t transition-colors`}>
             <span className="text-xs text-slate-500 font-bold uppercase tracking-[0.15em]">Showing {filteredLeads.length} of {leads.length} entries</span>
             <div className="flex gap-3">
                <button className={`w-10 h-10 flex items-center justify-center rounded-xl ${isDark ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900'} transition-all shadow-sm border`}>
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className={`w-10 h-10 flex items-center justify-center rounded-xl ${isDark ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900'} transition-all shadow-sm border`}>
                  <ChevronRight className="w-5 h-5" />
                </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminLeads;
