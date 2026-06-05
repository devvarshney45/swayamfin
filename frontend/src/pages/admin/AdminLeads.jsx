import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AdminTabs from '../../components/admin/AdminTabs';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://swayamfin.onrender.com' : 'http://localhost:5001');

const LOAN_TYPE_OPTIONS = [
  { v: 'home_loan', l: 'Housing' },
  { v: 'micro_lap', l: 'Micro LAP' },
  { v: 'supply_chain', l: 'Supply chain' },
  { v: 'msme_structured', l: 'MSME structured' },
  { v: 'lap', l: 'LAP' },
  { v: 'hybrid', l: 'Hybrid' },
  { v: 'microfinance', l: 'Microfinance' },
  { v: 'structured', l: 'Structured' },
  { v: 'secured', l: 'Secured' },
  { v: 'unsecured', l: 'Unsecured' },
  { v: 'machinery_loan', l: 'Machinery loan' },
];

const STATUS_OPTIONS = [
  'New', 'Contacted', 'In Progress', 'Document Submitted',
  'Sanctioned', 'Disbursed', 'Closed - Won', 'Dead Lead', 'On Hold',
];

const getDocumentUrl = (fileUrl) => {
  if (!fileUrl) return '#';
  if (/^https?:\/\//i.test(fileUrl)) return fileUrl;
  return `${API_URL}${encodeURI(fileUrl)}`;
};

const AdminLeads = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [docLead, setDocLead] = useState(null);
  const [docLoading, setDocLoading] = useState(false);
  const [docError, setDocError] = useState('');
  const [leadDocs, setLeadDocs] = useState([]);
  const [editLead, setEditLead] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState('');
  const [actionNote, setActionNote] = useState(null);

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

  const openEdit = (lead, e) => {
    e.stopPropagation();
    setEditError('');
    setEditLead(lead);
    setEditForm({
      applicant_name: lead.applicant_name || '',
      mobile: lead.mobile || '',
      email: lead.email || '',
      location_city: lead.location_city || '',
      loan_type: lead.loan_type || 'home_loan',
      loan_amount_required: lead.loan_amount_required != null ? String(lead.loan_amount_required) : '',
      status: lead.status || 'New',
      
      // New Ops Fields
      rm_name: lead.rm_name || '',
      login_date: lead.login_date || '',
      tat: lead.tat || '',
      partner_login: lead.partner_login || '',
      external_loan_id: lead.external_loan_id || '',
      case_under_company: lead.case_under_company || '',

      fees: lead.fees != null ? String(lead.fees) : '',
      sanction_amount: lead.sanction_amount != null ? String(lead.sanction_amount) : '',
      pd_report: lead.pd_report || '',
      technical_report: lead.technical_report || '',
      legal_report: lead.legal_report || '',
      cpv_report: lead.cpv_report || '',
      sanction: lead.sanction || '',
      disbursement: lead.disbursement || '',
      remarks: lead.remarks || '',
    });
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (!editLead) return;
    setEditSaving(true);
    setEditError('');
    try {
      const token = localStorage.getItem('swayamfin_token');
      await axios.put(
        `${API_URL}/api/leads/${editLead._id}`,
        {
          ...editForm,
          loan_amount_required: Number(editForm.loan_amount_required),
          fees: editForm.fees ? Number(editForm.fees) : undefined,
          sanction_amount: editForm.sanction_amount ? Number(editForm.sanction_amount) : undefined,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditLead(null);
      setActionNote({ type: 'success', message: 'Case File Synchronized.' });
      fetchLeads();
      setTimeout(() => setActionNote(null), 3000);
    } catch (err) {
      setEditError(err.response?.data?.message || 'Transaction failed.');
    } finally {
      setEditSaving(false);
    }
  };

  const deleteLead = async (lead, e) => {
    e.stopPropagation();
    if (!window.confirm(`Permanently delete lead ${lead.lead_number} for ${lead.applicant_name}?`)) return;
    try {
      const token = localStorage.getItem('swayamfin_token');
      await axios.delete(`${API_URL}/api/leads/${lead._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setActionNote({ type: 'success', message: 'Lead removed.' });
      fetchLeads();
      setTimeout(() => setActionNote(null), 3000);
    } catch (err) {
      setActionNote({ type: 'error', message: err.response?.data?.message || 'Delete failed.' });
      setTimeout(() => setActionNote(null), 5000);
    }
  };

  const openDocuments = async (lead, e) => {
    e.stopPropagation();
    setDocLead(lead);
    setDocLoading(true);
    setDocError('');
    setLeadDocs([]);
    try {
      const token = localStorage.getItem('swayamfin_token');
      const res = await axios.get(`${API_URL}/api/leads/${lead._id}/documents`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeadDocs(res.data.data || []);
    } catch (err) {
      setDocError('Unable to load documents for this lead.');
    } finally {
      setDocLoading(false);
    }
  };

  const handleExport = () => {
    if (filteredLeads.length === 0) return;
    
    // Complete headers spanning entire sheet
    const headers = [
      'Serial No.',
      'RM Name',
      'Login Date',
      'TAT',
      'Branch',
      'Partner (Login In)',
      'Loan ID',
      'Case Under (Company)',
      'Product Type', 
      'Client Name', 
      'Fees', 
      'Asking Amount', 
      'Sanction Amount', 
      'PD Report', 
      'Technical Report', 
      'Legal Report', 
      'CPV Report', 
      'Sanction', 
      'Disbursement', 
      'Current Status', 
      'Remarks'
    ];
    
    const rows = filteredLeads.map((lead, index) => [
      index + 1,
      lead.rm_name || '',
      lead.login_date || '',
      lead.tat || '',
      lead.location_city || '',
      lead.partner_login || '',
      lead.external_loan_id || lead.lead_number || '', // Uses ext ID or internal ID
      lead.case_under_company || 'Swayamfin',
      lead.loan_type?.replace('_', ' ')?.toUpperCase() || '',
      lead.applicant_name || '',
      lead.fees || '',
      lead.loan_amount_required || 0,
      lead.sanction_amount || '',
      lead.pd_report || '',
      lead.technical_report || '',
      lead.legal_report || '',
      lead.cpv_report || '',
      lead.sanction || '',
      lead.disbursement || '',
      lead.status || '',
      lead.remarks || ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `swayamfin_full_repo_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
       <div className="w-12 h-12 border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9] rounded-full animate-spin" />
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Querying Repository...</p>
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
           <button 
             type="button" 
             onClick={handleExport}
             className="bg-white border border-slate-200 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#1E293B] hover:bg-slate-50 transition-all shadow-sm"
           >
              Export {filteredLeads.length} node data
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
           <select className="input-standard w-full h-14 rounded-2xl" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All States</option>
              {STATUS_OPTIONS.map(s => ( <option key={s} value={s}>{s}</option> ))}
           </select>
           <select className="input-standard w-full h-14 rounded-2xl" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
              <option value="all">All Product Classes</option>
              {LOAN_TYPE_OPTIONS.map(o => ( <option key={o.v} value={o.v}>{o.l}</option> ))}
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
                    {filteredLeads.map((lead) => (
                      <tr 
                         key={lead._id}
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
                            <div className="flex flex-wrap items-center justify-end gap-2">
                              <button type="button" onClick={(e) => openEdit(lead, e)} className="px-3 py-2 rounded-lg border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">Edit</button>
                              <button type="button" onClick={(e) => deleteLead(lead, e)} className="px-3 py-2 rounded-lg border border-rose-200 text-[9px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 transition-all">Delete</button>
                              <button type="button" onClick={(e) => openDocuments(lead, e)} className="px-3 py-2 rounded-lg border border-[#0EA5E9]/30 text-[9px] font-black uppercase tracking-widest text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition-all">View Docs</button>
                            </div>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {editLead && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setEditLead(null)}
          >
            <motion.form
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              className="w-full max-w-2xl bg-white rounded-[28px] border border-slate-100 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
              onClick={(ev) => ev.stopPropagation()}
              onSubmit={saveEdit}
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                 <div>
                    <h3 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Edit Case File</h3>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">{editLead.lead_number} • {editLead.applicant_name}</p>
                 </div>
                 <button type="button" onClick={() => setEditLead(null)} className="w-10 h-10 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 hover:text-rose-500 transition-all">✕</button>
              </div>

              <div className="space-y-12">
                
                {/* Ops Pre-processing */}
                <div className="space-y-6">
                   <div className="flex items-center gap-3">
                      <div className="w-1 h-3 bg-[#0EA5E9] rounded-full" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Pre-Processing Node</h4>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">RM Name</label>
                        <input className="input-standard w-full h-12 rounded-xl" value={editForm.rm_name} onChange={(ev) => setEditForm({ ...editForm, rm_name: ev.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Login Date</label>
                        <input className="input-standard w-full h-12 rounded-xl" placeholder="DD/MM/YYYY" value={editForm.login_date} onChange={(ev) => setEditForm({ ...editForm, login_date: ev.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">TAT Days</label>
                        <input className="input-standard w-full h-12 rounded-xl" value={editForm.tat} onChange={(ev) => setEditForm({ ...editForm, tat: ev.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Partner (Login In)</label>
                        <input className="input-standard w-full h-12 rounded-xl" value={editForm.partner_login} onChange={(ev) => setEditForm({ ...editForm, partner_login: ev.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">External Loan ID</label>
                        <input className="input-standard w-full h-12 rounded-xl" value={editForm.external_loan_id} onChange={(ev) => setEditForm({ ...editForm, external_loan_id: ev.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Case Under (Company)</label>
                        <input className="input-standard w-full h-12 rounded-xl" value={editForm.case_under_company} onChange={(ev) => setEditForm({ ...editForm, case_under_company: ev.target.value })} />
                      </div>
                   </div>
                </div>

                {/* Identity & Loan */}
                <div className="space-y-6">
                   <div className="flex items-center gap-3">
                      <div className="w-1 h-3 bg-[#0EA5E9] rounded-full" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Identity & Matrix</h4>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Client Name</label>
                        <input required className="input-standard w-full h-12 rounded-xl" value={editForm.applicant_name} onChange={(ev) => setEditForm({ ...editForm, applicant_name: ev.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Product Type</label>
                        <select className="input-standard w-full h-12 rounded-xl" value={editForm.loan_type} onChange={(ev) => setEditForm({ ...editForm, loan_type: ev.target.value })}>
                          {LOAN_TYPE_OPTIONS.map((o) => ( <option key={o.v} value={o.v}>{o.l}</option> ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Asking Amount (₹)</label>
                        <input required type="number" className="input-standard w-full h-12 rounded-xl" value={editForm.loan_amount_required} onChange={(ev) => setEditForm({ ...editForm, loan_amount_required: ev.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Sanction Amount (₹)</label>
                        <input type="number" className="input-standard w-full h-12 rounded-xl" value={editForm.sanction_amount} onChange={(ev) => setEditForm({ ...editForm, sanction_amount: ev.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Fees (₹)</label>
                        <input type="number" className="input-standard w-full h-12 rounded-xl" value={editForm.fees} onChange={(ev) => setEditForm({ ...editForm, fees: ev.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Status</label>
                        <select className="input-standard w-full h-12 rounded-xl" value={editForm.status} onChange={(ev) => setEditForm({ ...editForm, status: ev.target.value })}>
                          {STATUS_OPTIONS.map((s) => ( <option key={s} value={s}>{s}</option> ))}
                        </select>
                      </div>
                   </div>
                </div>

                {/* Reports & Remarks */}
                <div className="space-y-6">
                   <div className="flex items-center gap-3">
                      <div className="w-1 h-3 bg-[#0EA5E9] rounded-full" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Technical Reports & Logs</h4>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">PD Report</label>
                        <input className="input-standard w-full h-12 rounded-xl" value={editForm.pd_report} onChange={(ev) => setEditForm({ ...editForm, pd_report: ev.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Legal Report</label>
                        <input className="input-standard w-full h-12 rounded-xl" value={editForm.legal_report} onChange={(ev) => setEditForm({ ...editForm, legal_report: ev.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Sanction Protocol</label>
                        <input className="input-standard w-full h-12 rounded-xl" value={editForm.sanction} onChange={(ev) => setEditForm({ ...editForm, sanction: ev.target.value })} />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Disbursement</label>
                        <input className="input-standard w-full h-12 rounded-xl" value={editForm.disbursement} onChange={(ev) => setEditForm({ ...editForm, disbursement: ev.target.value })} />
                      </div>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Remarks</label>
                      <textarea className="input-standard w-full h-24 rounded-xl p-4 text-sm" value={editForm.remarks} onChange={(ev) => setEditForm({ ...editForm, remarks: ev.target.value })} />
                   </div>
                </div>

              </div>

              <div className="flex gap-4 mt-12 pt-8 border-t border-slate-50">
                <button type="button" onClick={() => setEditLead(null)} className="flex-1 h-16 rounded-2xl bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest">Cancel</button>
                <button type="submit" disabled={editSaving} className="flex-[2] h-16 rounded-2xl btn-primary text-[10px] font-black uppercase tracking-widest shadow-xl">{editSaving ? 'Committing…' : 'Sync Changes'}</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLeads;
