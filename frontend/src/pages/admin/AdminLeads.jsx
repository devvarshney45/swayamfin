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
  Clock,
  User,
  MapPin,
  ExternalLink,
  Mail
} from 'lucide-react';

const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
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
    switch (status?.toLowerCase()) {
      case 'fresh': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'contacted': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'qualified': return 'bg-green-50 text-green-600 border-green-100';
      case 'converted': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.mobile.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesCity = !cityFilter || (lead.city && lead.city.toLowerCase().includes(cityFilter.toLowerCase()));
    const matchesType = typeFilter === 'all' || lead.loanType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesCity && matchesType;
  });

  const downloadCSV = () => {
    const headers = ["Date", "Name", "Mobile", "Email", "City", "Loan Type", "Amount", "Status", "Notes"];
    const csvData = filteredLeads.map(lead => [
      new Date(lead.createdAt).toLocaleDateString(),
      `"${lead.fullName}"`,
      `"${lead.mobile}"`,
      `"${lead.email || ''}"`,
      `"${lead.city || ''}"`,
      `"${lead.loanType}"`,
      lead.amount,
      lead.status,
      `"${(lead.agentNotes || lead.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `swayamfin_leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-dmsans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1 font-playfair">Lead Management</h1>
            <p className="text-slate-500 font-medium italic">Master database of all incoming loan enquiries.</p>
          </div>
          <button 
            onClick={downloadCSV}
            className="bg-primary-navy text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary-navy/20"
          >
             <Download className="w-5 h-5" /> Export {filteredLeads.length} Leads
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-blue transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:bg-white rounded-2xl transition-all outline-none font-medium text-slate-900"
                placeholder="Search name, mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative">
              <input 
                type="text"
                placeholder="Filter by City"
                className="w-full px-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:bg-white rounded-2xl transition-all outline-none font-bold text-slate-700"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <select 
                className="w-full px-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:bg-white rounded-2xl transition-all outline-none font-bold text-slate-700 appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Every Status</option>
                <option value="Fresh">Fresh</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Converted">Converted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div className="relative">
              <select 
                className="w-full px-4 py-3.5 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:bg-white rounded-2xl transition-all outline-none font-bold text-slate-700 appearance-none"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">Every Product</option>
                <option value="Home Loan">Home Loan</option>
                <option value="Loan Against Property">Loan Against Property</option>
                <option value="MSME Structured Loans">MSME Structured Loans</option>
                <option value="Supply Chain Financing">Supply Chain Financing</option>
                <option value="Micro LAP">Micro LAP</option>
                <option value="Hybrid MSME Products">Hybrid MSME Products</option>
                <option value="Unsecured MSME Loans">Unsecured MSME Loans</option>
                <option value="Machinery Loans">Machinery Loans</option>
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-widest px-2">
            <span>Showing {filteredLeads.length} leads</span>
            <button onClick={() => { setSearchTerm(''); setCityFilter(''); setStatusFilter('all'); setTypeFilter('all'); }} className="text-primary-blue hover:underline">Clear All Filters</button>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
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
                {loading ? (
                  <tr><td colSpan="6" className="p-20 text-center animate-pulse text-slate-400 font-bold">Loading records...</td></tr>
                ) : (
                  <AnimatePresence>
                    {filteredLeads.map((lead) => (
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
                            <div className="flex items-center gap-1.5 text-primary-gold/80 font-medium text-[10px] mt-0.5 lowercase">
                              <Mail className="w-2.5 h-2.5" /> {lead.email}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-slate-900 font-bold text-[13px] capitalize">{lead.loanType}</div>
                          <div className="text-primary-navy font-extrabold text-xs tracking-tighter italic">
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
                )}
              </tbody>
            </table>
          </div>
          
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
