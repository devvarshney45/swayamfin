import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://swayamfin.onrender.com' : 'http://localhost:5001');

const AgentDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [editLead, setEditLead] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError]   = useState('');
  const [documents, setDocuments] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [actionNote, setActionNote] = useState(null);

  const LOAN_TYPE_OPTIONS = [
    { v: 'lap', l: 'LAP' },
    { v: 'home_loan', l: 'House loan' },
    { v: 'unsecured', l: 'Unsecure Business Loan' },
    { v: 'supply_chain', l: 'Supply Chain Finance' },
    { v: 'unsecured_export_finance', l: 'Unsecure Export Finance' },
    { v: 'machinery_loan', l: 'Machinery Finance' },
  ];

  const STATUS_OPTIONS = [
    'Under login stage',
    'Under PD',
    'Under Technical',
    'Under Legal',
    'Under Credit',
    'Under Sanction',
    'Under Disbursement',
    'Disbursed',
  ];

  const getDocumentUrl = (fileUrl) => {
    if (!fileUrl) return '#';
    if (/^https?:\/\//i.test(fileUrl)) return fileUrl;
    return `${API_URL}${encodeURI(fileUrl)}`;
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('swayamfin_token');
      if (!token) throw new Error('Session Expired.');

      const response = await axios.get(`${API_URL}/api/leads`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setLeads(response.data.data || []);
    } catch (err) {
      console.error('Fetch Leads Error:', err);
      setError(err.response?.data?.message || err.message || 'Transmission Error.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/agent/login');
  };

  const openEdit = (lead) => {
    setEditError('');
    setEditLead(lead);
    setEditForm({
      applicant_name: lead.applicant_name || '',
      mobile: lead.mobile || '',
      email: lead.email || '',
      location_city: lead.location_city || '',
      loan_type: lead.loan_type || 'home_loan',
      loan_amount_required: String(lead.loan_amount_required || ''),
      status: lead.status || 'Under login stage',
      rm_name: lead.rm_name || '',
      login_date: lead.login_date || '',
      tat: lead.tat || '',
      partner_login: lead.partner_login || '',
      external_loan_id: lead.external_loan_id || '',
      case_under_company: lead.case_under_company || '',
      fees: String(lead.fees || ''),
      sanction_amount: String(lead.sanction_amount || ''),
      pd_report: !!lead.pd_report,
      technical_report: !!lead.technical_report,
      legal_report: !!lead.legal_report,
      cpv_report: !!lead.cpv_report,
      sanction: !!lead.sanction,
      disbursement: !!lead.disbursement,
      remarks: lead.remarks || '',
    });
    fetchDocuments(lead._id);
  };

  const fetchDocuments = async (leadId) => {
    try {
      const token = localStorage.getItem('swayamfin_token');
      const res = await axios.get(`${API_URL}/api/leads/${leadId}/documents`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDocuments(res.data.data || []);
    } catch (err) { console.error('Fetch docs error:', err); }
  };

  const handleDocUpload = async (e, docType) => {
    const file = e.target.files[0];
    if (!file || !editLead) return;
    setUploadLoading(true);
    try {
      const token = localStorage.getItem('swayamfin_token');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('doc_type', docType);
      await axios.post(`${API_URL}/api/leads/${editLead._id}/documents`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchDocuments(editLead._id);
    } catch (err) {
      alert(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploadLoading(false);
      e.target.value = '';
    }
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    if (!editLead) return;
    setEditSaving(true);
    try {
      const token = localStorage.getItem('swayamfin_token');
      await axios.put(`${API_URL}/api/leads/${editLead._id}`, {
        ...editForm,
        loan_amount_required: Number(editForm.loan_amount_required),
        fees: editForm.fees ? Number(editForm.fees) : 0,
        sanction_amount: editForm.sanction_amount ? Number(editForm.sanction_amount) : 0,
      }, { headers: { Authorization: `Bearer ${token}` } });
      setEditLead(null);
      setActionNote({ type: 'success', message: 'Node Synced.' });
      fetchLeads();
      setTimeout(() => setActionNote(null), 3000);
    } catch (err) {
      setEditError(err.response?.data?.message || 'Sync failed.');
    } finally { setEditSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('swayamfin_token');
      await axios.delete(`${API_URL}/api/leads/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setLeads(prev => prev.filter(l => l._id !== id));
      setDeleteConfirm(null);
      setActionNote({ type: 'success', message: 'Lead purged.' });
      setTimeout(() => setActionNote(null), 3000);
    } catch (err) {
      setActionNote({ type: 'error', message: err.response?.data?.message || 'Purge failed.' });
      setDeleteConfirm(null);
      setTimeout(() => setActionNote(null), 3000);
    }
  };

  const getDocByType = (type) => documents.find(d => d.doc_type === type);

  const actualDisbursed = leads
    .filter(l => l.status === 'Disbursed')
    .reduce((sum, l) => sum + (Number(l.disbursed_amount) || Number(l.loan_amount_required) || 0), 0);

  const monthlyTarget = 10000000; // 1 Crore target
  const targetProgress = Math.min((actualDisbursed / monthlyTarget) * 100, 100);

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.applicant_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.lead_number?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || l.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Under login stage': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Under PD': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'Under Technical': return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'Under Legal': return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'Under Credit': return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'Under Sanction': return 'bg-cyan-50 text-cyan-600 border-cyan-200';
      case 'Under Disbursement': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Disbursed': return 'bg-green-50 text-green-600 border-green-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center space-y-4">
       <div className="w-12 h-12 border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9] rounded-full animate-spin" />
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Propelling Case Hub...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-[#1E293B] pb-32">
      {/* Header Overlay - RM Blueprint Style */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between md:items-end gap-6">
            <div className="space-y-1">
               <h1 className="text-4xl font-black tracking-tighter uppercase leading-none text-[#1E293B]">
                  {user?.full_name} <span className="text-[#0EA5E9] italic opacity-50">.</span>
               </h1>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Relationship Manager</p>
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{user?.branch?.name || 'Central Office'}</span>
               </div>
            </div>
            <div className="flex gap-4">
              <Link to="/agent/lead/new" className="px-8 h-12 flex items-center justify-center bg-[#0EA5E9] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-600 transition-all">
                New Application
              </Link>
              <button onClick={handleLogout} className="px-8 h-12 bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                Exit Node
              </button>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16">
        {/* Mission Status - KPI Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
           {/* Total Leads Box */}
           <div className="bg-[#1E293B] p-10 rounded-[48px] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-white/10 transition-all" />
              <div className="relative z-10">
                 <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-8 italic">Total Leads Segmented</h3>
                 <div className="flex items-baseline gap-4">
                    <span className="text-7xl font-black text-white ml-[-4px] tracking-tighter">{leads.length}</span>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Active Records</span>
                 </div>
              </div>
           </div>

           {/* Monthly Target Progress */}
           <div className="bg-white border border-slate-100 p-10 rounded-[48px] shadow-sm flex flex-col justify-center">
              <div className="flex justify-between items-end mb-8">
                 <div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 italic">Monthly Target Engine</h3>
                    <p className="text-2xl font-black text-[#1E293B] tracking-tighter">₹{(actualDisbursed/100000).toFixed(1)}L <span className="text-slate-300 font-medium">/ 1.0Cr</span></p>
                 </div>
                 <span className="text-4xl font-black text-[#0EA5E9] tracking-tighter italic">{Math.round(targetProgress)}%</span>
              </div>
              <div className="w-full h-4 bg-slate-50 rounded-full overflow-hidden p-1 border border-slate-100">
                 <motion.div 
                   initial={{ width: 0 }} 
                   animate={{ width: `${targetProgress}%` }} 
                   className="h-full bg-[#1E293B] rounded-full relative"
                 >
                    <div className="absolute top-0 right-0 h-full w-2 bg-[#0EA5E9] rounded-full" />
                 </motion.div>
              </div>
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em] mt-6 leading-none">Milestone status: {targetProgress >= 100 ? 'Achieved' : 'In Propulsion'}</p>
           </div>
        </div>

        {/* Client List Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-slate-100 pb-10">
           <div>
              <h2 className="text-3xl font-black text-[#1E293B] uppercase tracking-tighter">Clients <span className="text-[#0EA5E9] italic opacity-50">.</span></h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Portfolio Directory ({leads.length} Cases)</p>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input 
                type="text" 
                placeholder="Find client..."
                className="h-14 px-8 rounded-2xl bg-white border border-slate-100 text-sm outline-none focus:border-[#0EA5E9]/30 transition-all sm:w-64"
                value={searchTerm}
                onChange={v => setSearchTerm(v.target.value)}
              />
              <select 
                className="h-14 px-8 rounded-2xl bg-white border border-slate-100 text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#0EA5E9]/30 transition-all appearance-none pr-12 cursor-pointer"
                value={filterStatus}
                onChange={v => setFilterStatus(v.target.value)}
              >
                 <option value="All">All States</option>
                 {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
           </div>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <AnimatePresence>
             {filteredLeads.map((lead, i) => (
               <motion.div
                 key={lead._id}
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.05 }}
                 className="bg-white border border-slate-100 p-6 md:p-8 rounded-[32px] md:rounded-[40px] hover:shadow-2xl hover:border-[#0EA5E9]/30 transition-all cursor-pointer group flex flex-col justify-between"
                 onClick={() => openEdit(lead)}
               >
                  <div className="space-y-6">
                     <div className="flex justify-between items-start">
                        <span className="text-[9px] font-black text-[#0EA5E9] uppercase tracking-widest">{lead.lead_number}</span>
                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${getStatusColor(lead.status)} text-center`}>{lead.status}</span>
                     </div>
                     <h3 className="text-xl font-black text-[#1E293B] group-hover:text-[#0EA5E9] transition-all uppercase tracking-tight truncate">{lead.applicant_name}</h3>
                  </div>
                  
                  <div className="pt-8 mt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
                     <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Asset</p>
                        <p className="text-[10px] font-bold text-[#1E293B] uppercase truncate">{lead.loan_type?.replace('-', ' ')}</p>
                     </div>
                     <div>
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 text-right">Amount</p>
                        <p className="text-[10px] font-black text-[#0EA5E9] text-right">₹{(lead.loan_amount_required/100000).toFixed(1)}L</p>
                     </div>
                  </div>
               </motion.div>
             ))}
           </AnimatePresence>
        </div>
        {filteredLeads.length === 0 && (
           <div className="py-32 text-center bg-white border border-slate-100 rounded-[40px] border-dashed">
              <p className="text-slate-400 text-xs font-black uppercase tracking-widest">No case data detected.</p>
           </div>
        )}

      <AnimatePresence>
        {editLead && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setEditLead(null)}>
            <motion.form initial={{ y: 20 }} animate={{ y: 0 }} className="w-full max-w-2xl bg-white rounded-[40px] p-10 max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()} onSubmit={saveEdit}>
              <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-6">
                <div>
                  <h3 className="text-3xl font-black text-[#1E293B] leading-none uppercase tracking-tighter">Edit Case File</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{editLead.lead_number} • {editLead.applicant_name}</p>
                </div>
                <div className="flex gap-2">
                   {deleteConfirm === editLead._id ? (
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => handleDelete(editLead._id)} className="bg-rose-500 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest">Confirm Purge</button>
                        <button type="button" onClick={() => setDeleteConfirm(null)} className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black">✕</button>
                      </div>
                   ) : (
                      <button type="button" onClick={() => setDeleteConfirm(editLead._id)} className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all">
                         <Trash2 className="w-5 h-5" />
                      </button>
                   )}
                   <button type="button" onClick={() => setEditLead(null)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all font-black text-lg">✕</button>
                </div>
              </div>

              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <InputNode label="Client Name" value={editForm.applicant_name} onChange={v => setEditForm({...editForm, applicant_name: v})} />
                  <InputNode label="Loan ID (External)" value={editForm.external_loan_id} onChange={v => setEditForm({...editForm, external_loan_id: v})} />
                  <SelectNode label="Product Type" value={editForm.loan_type} options={LOAN_TYPE_OPTIONS} onChange={v => setEditForm({...editForm, loan_type: v})} />
                  <InputNode label="Asking Amount (₹)" type="number" value={editForm.loan_amount_required} onChange={v => setEditForm({...editForm, loan_amount_required: v})} />
                  <InputNode label="Sanction Amount (₹)" type="number" value={editForm.sanction_amount} onChange={v => setEditForm({...editForm, sanction_amount: v})} />
                  <InputNode label="Fees (₹)" type="number" value={editForm.fees} onChange={v => setEditForm({...editForm, fees: v})} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-50">
                  <InputNode label="Login Date" value={editForm.login_date} onChange={v => setEditForm({...editForm, login_date: v})} />
                  <InputNode label="Partner" value={editForm.partner_login} onChange={v => setEditForm({...editForm, partner_login: v})} />
                  <SelectNode 
                    label="Case Under(Company)" 
                    value={editForm.case_under_company} 
                    options={[{v: '', l: 'Select Company'}, {v: 'DMI', l: 'DMI'}, {v: 'Credifin', l: 'Credifin'}]} 
                    onChange={v => setEditForm({...editForm, case_under_company: v})} 
                  />
                   <SelectNode label="Current Status" value={editForm.status} options={STATUS_OPTIONS.map(s => ({v:s, l:s}))} onChange={v => setEditForm({...editForm, status: v})} />
                </div>

                <div className="space-y-6 pt-8 border-t border-slate-50">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliance Checkboxes</h4>
                   <div className="grid grid-cols-2 gap-4">
                      <CheckboxNode label="PD Report" checked={editForm.pd_report} onChange={v => setEditForm({...editForm, pd_report: v})} />
                      <CheckboxNode label="Technical Report" checked={editForm.technical_report} onChange={v => setEditForm({...editForm, technical_report: v})} />
                      <CheckboxNode label="Legal Report" checked={editForm.legal_report} onChange={v => setEditForm({...editForm, legal_report: v})} />
                      <CheckboxNode label="CPV Report" checked={editForm.cpv_report} onChange={v => setEditForm({...editForm, cpv_report: v})} />
                      <CheckboxNode label="Sanction" checked={editForm.sanction} onChange={v => setEditForm({...editForm, sanction: v})} />
                      <CheckboxNode label="Disbursement" checked={editForm.disbursement} onChange={v => setEditForm({...editForm, disbursement: v})} />
                   </div>
                </div>

                <div className="space-y-6 pt-8 border-t border-slate-100">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identity Documents</h4>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        {v: 'aadhaar_card', l: 'Aadhar'},
                        {v: 'pan_card', l: 'PAN'},
                        {v: 'voter_id', l: 'Voter ID'},
                        {v: 'bank_statement', l: 'Bankstmt'},
                      ].map(doc => {
                        const uploaded = getDocByType(doc.v);
                        return (
                          <div key={doc.v} className="space-y-2">
                             <label className="text-[8px] font-bold text-slate-400 uppercase tracking-widest ml-1">{doc.l}</label>
                             {uploaded ? (
                               <a 
                                 href={getDocumentUrl(uploaded.file_url)} 
                                 target="_blank" rel="noreferrer"
                                 className="w-full h-12 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-[9px] font-black text-emerald-600 uppercase tracking-widest hover:bg-emerald-100 transition-all"
                               >View {doc.l}</a>
                             ) : (
                               <label className="w-full h-12 bg-slate-50 border border-slate-100 border-dashed rounded-xl flex items-center justify-center text-[9px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-white hover:border-blue-300 transition-all">
                                  {uploadLoading ? '...' : `Upload ${doc.l}`}
                                  <input type="file" className="hidden" disabled={uploadLoading} onChange={(e) => handleDocUpload(e, doc.v)} />
                               </label>
                             )}
                          </div>
                        );
                      })}
                   </div>
                </div>

                <div className="pt-8 border-t border-slate-50">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block ml-1">Case Remarks</label>
                   <textarea className="w-full h-32 bg-slate-50 rounded-2xl p-6 text-sm outline-none focus:bg-white transition-all border border-transparent focus:border-slate-100" value={editForm.remarks} onChange={e => setEditForm({...editForm, remarks: e.target.value})} />
                </div>
              </div>

              <div className="flex gap-4 mt-12 bg-white sticky bottom-0 pt-6">
                <button type="submit" disabled={editSaving} className="flex-[2] h-16 bg-[#0EA5E9] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-blue-600 transition-all">{editSaving ? 'Syncing...' : 'Update Case Record'}</button>
              </div>
              {editError && <p className="text-rose-500 text-[10px] font-black uppercase mt-4 text-center">{editError}</p>}
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {actionNote && (
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] px-8 py-4 rounded-2xl shadow-2xl font-black text-[10px] uppercase tracking-widest ${actionNote.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
              {actionNote.message}
           </motion.div>
        )}
      </AnimatePresence>

      </div>
    </div>
  );
};

const InputNode = ({ label, value, onChange, type="text" }) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input type={type} className="w-full h-14 bg-slate-50 rounded-2xl px-6 text-sm outline-none focus:bg-white transition-all border border-transparent focus:border-slate-100" value={value} onChange={e => onChange(e.target.value)} />
  </div>
);

const SelectNode = ({ label, value, options, onChange }) => (
  <div className="space-y-2">
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <select className="w-full h-14 bg-slate-50 rounded-2xl px-6 text-sm outline-none focus:bg-white transition-all border border-transparent focus:border-slate-100 appearance-none" value={value} onChange={e => onChange(e.target.value)}>
      {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </div>
);

const CheckboxNode = ({ label, checked, onChange }) => (
  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all" onClick={() => onChange(!checked)}>
    <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${checked ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 bg-white'}`}>
       {checked && <span className="font-black text-[10px]">✓</span>}
    </div>
    <span className="text-[10px] font-black text-[#1E293B] uppercase tracking-tight">{label}</span>
  </div>
);

export default AgentDashboard;
