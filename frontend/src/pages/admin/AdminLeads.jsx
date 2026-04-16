import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  ChevronLeft, 
  ChevronRight,
  Phone,
  Clock,
  User,
  MapPin,
  ExternalLink,
  Mail
} from 'lucide-react';
import { downloadLeadsAsCSV } from '../../utils/exportUtils';

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('swayamfin_token');
      const url = `${import.meta.env.VITE_API_URL}/api/leads/all${statusFilter !== 'all' ? `?status=${statusFilter}` : ''}`;
      const res = await axios.get(url, {
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
    switch (status) {
      case 'new': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'qualified': return 'bg-green-50 text-green-600 border-green-100';
      case 'unconverted': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const filteredLeads = leads.filter(l => 
    l.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.mobile.includes(searchTerm) ||
    l.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">Lead Management</h1>
            <p className="text-slate-500 font-medium italic">Master database of all incoming loan enquiries.</p>
          </div>
          <button 
            onClick={() => downloadLeadsAsCSV(leads)}
            className="bg-primary-darkBlue text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
          >
             <Download className="w-5 h-5" /> Export All Data
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-[24px] shadow-fintech border border-slate-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-blue transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:bg-white rounded-2xl transition-all outline-none font-medium text-slate-900"
                placeholder="Search by name, mobile, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Filter className="w-4 h-4" />
              </div>
              <select 
                className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:bg-white rounded-2xl transition-all outline-none font-bold text-slate-700 appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="new">New Leads</option>
                <option value="qualified">Qualified</option>
                <option value="contacted">Contacted</option>
                <option value="unconverted">Unconverted</option>
              </select>
            </div>

            <div className="flex items-center justify-center text-slate-400 text-sm font-bold">
               Found {filteredLeads.length} leads
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-[32px] shadow-fintech border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                  <th className="px-8 py-5 text-xs font-extra-bold text-slate-400 uppercase tracking-widest">Customer / Mobile</th>
                  <th className="px-6 py-5 text-xs font-extra-bold text-slate-400 uppercase tracking-widest">Loan & Amount</th>
                  <th className="px-6 py-5 text-xs font-extra-bold text-slate-400 uppercase tracking-widest">Location</th>
                  <th className="px-6 py-5 text-xs font-extra-bold text-slate-400 uppercase tracking-widest">Assigned Agent</th>
                  <th className="px-6 py-5 text-xs font-extra-bold text-slate-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-xs font-extra-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredLeads.map((lead, i) => (
                    <motion.tr 
                      key={lead._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="group border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3 text-slate-900 font-bold mb-0.5">
                          {lead.fullName}
                          <ExternalLink className="w-3 h-3 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 font-bold text-xs">
                          <Phone className="w-3 h-3" /> {lead.mobile}
                        </div>
                        {lead.email && (
                          <div className="flex items-center gap-1.5 text-primary-blue/60 font-medium text-[10px] mt-0.5 lowercase">
                            <Mail className="w-2.5 h-2.5" /> {lead.email}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-slate-900 font-bold text-[13px] capitalize">{lead.loanType.replace('-', ' ')}</div>
                        <div className="text-primary-blue font-extrabold text-xs tracking-tighter italic">
                          ₹{lead.amount} Required
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2 text-slate-700 font-bold">
                           <MapPin className="w-4 h-4 text-slate-300" />
                           <span className="capitalize">{lead.city}</span>
                        </div>
                        <div className="text-[10px] text-slate-300 font-medium flex items-center gap-1 mt-1">
                           <Clock className="w-3 h-3" />
                           {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                           <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                             <User className="w-4 h-4" />
                           </div>
                           <div className="text-sm font-bold text-slate-700">
                             {lead.assignedAgent?.name || <span className="text-slate-300 italic">Unassigned</span>}
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-4 py-1.5 rounded-full text-[11px] font-extrabold border italic tracking-wider ${getStatusColor(lead.status)}`}>
                          {lead.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="px-8 py-6 bg-slate-50/30 flex items-center justify-between border-t border-slate-100">
             <span className="text-sm text-slate-400 font-bold italic">Showing {filteredLeads.length} of {leads.length} leads</span>
             <div className="flex gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-900 transition-all shadow-sm">
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
