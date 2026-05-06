import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AdminTabs from '../../components/admin/AdminTabs';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

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
          applicant_name: editForm.applicant_name,
          mobile: editForm.mobile,
          email: editForm.email || undefined,
          location_city: editForm.location_city,
          loan_type: editForm.loan_type,
          loan_amount_required: Number(editForm.loan_amount_required),
          status: editForm.status,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditLead(null);
      setActionNote({ type: 'success', message: 'Lead updated.' });
      fetchLeads();
      setTimeout(() => setActionNote(null), 3000);
    } catch (err) {
      setEditError(err.response?.data?.message || 'Update failed.');
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
           <button type="button" className="bg-white border border-slate-200 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#1E293B] hover:bg-slate-50 transition-all shadow-sm">
              Export {filteredLeads.length} Node Data
           </button>
        </div>

        <AnimatePresence>
          {actionNote && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mb-8 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border ${
                actionNote.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  : 'bg-rose-50 text-rose-600 border-rose-100'
              }`}
            >
              {actionNote.message}
            </motion.div>
          )}
        </AnimatePresence>

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
                               <div className="flex flex-wrap items-center justify-end gap-2">
                                 <button
                                   type="button"
                                   onClick={(e) => openEdit(lead, e)}
                                   className="px-3 py-2 rounded-lg border border-slate-200 text-[9px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all"
                                 >
                                   Edit
                                 </button>
                                 <button
                                   type="button"
                                   onClick={(e) => deleteLead(lead, e)}
                                   className="px-3 py-2 rounded-lg border border-rose-200 text-[9px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-50 transition-all"
                                 >
                                   Delete
                                 </button>
                                 <button
                                   type="button"
                                   onClick={(e) => openDocuments(lead, e)}
                                   className="px-3 py-2 rounded-lg border border-[#0EA5E9]/30 text-[9px] font-black uppercase tracking-widest text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition-all"
                                 >
                                   View Docs
                                 </button>
                                 <span className="text-[10px] font-black text-[#0EA5E9] uppercase tracking-widest hidden sm:inline">Intercept →</span>
                               </div>
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

      <AnimatePresence>
        {editLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setEditLead(null)}
          >
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="w-full max-w-lg bg-white rounded-[28px] border border-slate-100 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
              onClick={(ev) => ev.stopPropagation()}
              onSubmit={saveEdit}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-[#1E293B] uppercase tracking-tight">Edit lead</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                    {editLead.lead_number}
                  </p>
                </div>
                <button type="button" onClick={() => setEditLead(null)} className="text-slate-400 hover:text-slate-600 font-black">
                  ✕
                </button>
              </div>

              {editError && <p className="text-sm text-red-600 mb-4">{editError}</p>}

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</label>
                  <input
                    required
                    className="input-standard w-full h-12 rounded-xl px-4 mt-1 text-sm"
                    value={editForm.applicant_name}
                    onChange={(ev) => setEditForm({ ...editForm, applicant_name: ev.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile</label>
                  <input
                    required
                    maxLength={10}
                    className="input-standard w-full h-12 rounded-xl px-4 mt-1 text-sm"
                    value={editForm.mobile}
                    onChange={(ev) => setEditForm({ ...editForm, mobile: ev.target.value.replace(/\D/g, '') })}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email</label>
                  <input
                    type="email"
                    className="input-standard w-full h-12 rounded-xl px-4 mt-1 text-sm"
                    value={editForm.email}
                    onChange={(ev) => setEditForm({ ...editForm, email: ev.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">City</label>
                  <input
                    required
                    className="input-standard w-full h-12 rounded-xl px-4 mt-1 text-sm"
                    value={editForm.location_city}
                    onChange={(ev) => setEditForm({ ...editForm, location_city: ev.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loan type</label>
                  <select
                    className="input-standard w-full h-12 rounded-xl px-4 mt-1 text-sm"
                    value={editForm.loan_type}
                    onChange={(ev) => setEditForm({ ...editForm, loan_type: ev.target.value })}
                  >
                    {LOAN_TYPE_OPTIONS.map((o) => (
                      <option key={o.v} value={o.v}>{o.l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount (₹)</label>
                  <input
                    required
                    type="number"
                    min="0"
                    className="input-standard w-full h-12 rounded-xl px-4 mt-1 text-sm"
                    value={editForm.loan_amount_required}
                    onChange={(ev) => setEditForm({ ...editForm, loan_amount_required: ev.target.value })}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</label>
                  <select
                    className="input-standard w-full h-12 rounded-xl px-4 mt-1 text-sm"
                    value={editForm.status}
                    onChange={(ev) => setEditForm({ ...editForm, status: ev.target.value })}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setEditLead(null)}
                  className="flex-1 py-3 rounded-xl bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSaving}
                  className="flex-[2] py-3 rounded-xl btn-primary text-[10px] font-black uppercase tracking-widest disabled:opacity-50"
                >
                  {editSaving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {docLead && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[140] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setDocLead(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="w-full max-w-2xl bg-white rounded-[28px] border border-slate-100 shadow-2xl p-6 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-[#1E293B] uppercase tracking-tight">Lead Documents</h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                    {docLead.applicant_name} • {docLead.lead_number}
                  </p>
                </div>
                <button onClick={() => setDocLead(null)} className="text-slate-400 hover:text-slate-600 font-black">✕</button>
              </div>

              {docLoading && <p className="text-sm text-slate-500">Loading documents...</p>}
              {docError && <p className="text-sm text-red-600">{docError}</p>}
              {!docLoading && !docError && leadDocs.length === 0 && (
                <p className="text-sm text-slate-500">No documents uploaded yet.</p>
              )}

              {!docLoading && leadDocs.length > 0 && (
                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                  {leadDocs.map((doc) => (
                    <div key={doc._id} className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                      <div>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{doc.doc_type?.replace(/_/g, ' ')}</p>
                        <p className="text-sm font-semibold text-slate-700">{doc.file_name}</p>
                      </div>
                      <a
                        href={getDocumentUrl(doc.file_url)}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-lg bg-[#1E293B] text-white text-[9px] font-black uppercase tracking-widest hover:bg-[#0EA5E9] transition-all"
                      >
                        Watch
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLeads;
