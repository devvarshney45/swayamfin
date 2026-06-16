import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminTabs from '../../components/admin/AdminTabs';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://swayamfin.onrender.com' : 'http://localhost:5001');

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

const AdminLeads = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [editLead, setEditLead] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError]   = useState('');
  const [actionNote, setActionNote] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => { fetchLeads(); }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('swayamfin_token');
      if (!token) throw new Error('Session expired.');
      const res = await axios.get(`${API_URL}/api/leads`, { headers: { Authorization: `Bearer ${token}` } });
      setLeads(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Node link error.');
    } finally { setLoading(false); }
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
      loan_amount_required: String(lead.loan_amount_required || ''),
      status: lead.status || 'New',
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

  const getDocByType = (type) => documents.find(d => d.doc_type === type);

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
      setActionNote({ type: 'success', message: 'Case Balanced.' });
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
      setActionNote({ type: 'success', message: 'Lead deleted.' });
      setTimeout(() => setActionNote(null), 3000);
    } catch (err) {
      setActionNote({ type: 'error', message: err.response?.data?.message || 'Delete failed.' });
      setDeleteConfirm(null);
      setTimeout(() => setActionNote(null), 3000);
    }
  };

  const formatLoanType = (type) => {
    const map = {
      lap: 'LAP',
      home_loan: 'House loan',
      unsecured: 'Unsecure Business Loan',
      supply_chain: 'Supply Chain Finance',
      unsecured_export_finance: 'Unsecure Export Finance',
      machinery_loan: 'Machinery Finance',
    };
    return map[type] || (type ? type.replace(/_/g, ' ') : '');
  };

  const handleExport = () => {
    const headers = [
      'Serial No.',
      'RM Name',
      'Login Date',
      'TAT',
      'Branch',
      'Partner',
      'Loan ID',
      'Case Under(Company)',
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
    const rows = filteredLeads.map((l, i) => [
      i + 1, l.rm_name || '', l.login_date || '', l.tat || '', l.location_city || '', l.partner_login || '', l.external_loan_id || l.lead_number || '', l.case_under_company || '',
      formatLoanType(l.loan_type), l.applicant_name || '', l.fees || 0, l.loan_amount_required || 0, l.sanction_amount || 0,
      l.pd_report ? 'YES' : 'NO', l.technical_report ? 'YES' : 'NO', l.legal_report ? 'YES' : 'NO', l.cpv_report ? 'YES' : 'NO', l.sanction ? 'YES' : 'NO', l.disbursement ? 'YES' : 'NO',
      l.status || '', l.remarks || ''
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${String(c).replace(/"/g,'""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `swayamfin_global_report_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  if (loading) return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-black text-slate-400">CONNECTING TO REPOSITORY...</div>;

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <AdminTabs />
        <div className="flex justify-between items-center mb-12">
           <h1 className="text-5xl font-black text-[#1E293B] uppercase tracking-tighter">Global <span className="text-blue-600 italic">Repository</span></h1>
           <button onClick={handleExport} className="bg-white border-2 border-slate-100 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">Export Master Sheet</button>
        </div>

        <div className="bg-white border rounded-[40px] shadow-sm overflow-hidden">
           <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Name</th>
                  <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Class</th>
                  <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol State</th>
                  <th className="px-10 py-6 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map(l => (
                  <tr key={l._id} className="hover:bg-slate-50 transition-all cursor-pointer group">
                    <td className="px-10 py-6 font-black text-[#1E293B] group-hover:text-blue-600">{l.applicant_name} <span className="text-[9px] bg-slate-100 px-2 py-0.5 rounded ml-2">ID: {l.lead_number}</span></td>
                    <td className="px-6 py-6 font-bold text-slate-600 text-xs uppercase">{l.loan_type?.replace('_',' ')} <div className="text-blue-600 font-black mt-1">₹{l.loan_amount_required.toLocaleString()}</div></td>
                    <td className="px-6 py-6"><span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(l.status)}`}>{l.status}</span></td>
                    <td className="px-10 py-6 text-right">
                       <div className="flex items-center justify-end gap-2">
                         <button onClick={(e) => openEdit(l, e)} className="px-4 py-2 border rounded-xl text-[9px] font-black uppercase tracking-widest text-[#1E293B] hover:bg-white shadow transition-all">Edit Node</button>
                         {deleteConfirm === l._id ? (
                           <>
                             <button
                               onClick={(e) => { e.stopPropagation(); handleDelete(l._id); }}
                               className="px-4 py-2 bg-red-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-red-600 transition-all"
                             >Confirm</button>
                             <button
                               onClick={(e) => { e.stopPropagation(); setDeleteConfirm(null); }}
                               className="px-3 py-2 border rounded-xl text-[9px] font-black text-slate-400 hover:text-slate-700 transition-all"
                             >✕</button>
                           </>
                         ) : (
                           <button
                             onClick={(e) => { e.stopPropagation(); setDeleteConfirm(l._id); }}
                             className="p-2 border border-red-100 text-red-400 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
                           >
                             <Trash2 className="w-3.5 h-3.5" />
                           </button>
                         )}
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>
      </div>

      <AnimatePresence>
        {editLead && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setEditLead(null)}>
            <motion.form initial={{ y: 20 }} animate={{ y: 0 }} className="w-full max-w-2xl bg-white rounded-[40px] p-10 max-h-[90vh] overflow-y-auto shadow-2xl relative" onClick={e => e.stopPropagation()} onSubmit={saveEdit}>
              <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-6">
                <div>
                  <h3 className="text-3xl font-black text-[#1E293B] leading-none uppercase tracking-tighter">Edit Case File</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                    {editLead.lead_number} • {editLead.applicant_name} 
                    {editLead.rm_name ? ` • RM: ${editLead.rm_name}` : ''}
                  </p>
                </div>
                <button type="button" onClick={() => setEditLead(null)} className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all">✕</button>
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

                <div className="space-y-6 pt-8 border-t border-slate-50">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identity Documents - Task 19.4</h4>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        {v: 'aadhaar_card', l: 'Aadhar'},
                        {v: 'pan_card', l: 'PAN'},
                        {v: 'voter_id', l: 'Voter ID'},
                        {v: 'bank_statement', l: 'Bank Statement'},
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
                <button type="submit" disabled={editSaving} className="flex-[2] h-16 bg-[#1E293B] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-blue-600 transition-all">{editSaving ? 'Syncing...' : 'Update Case Record'}</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
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

export default AdminLeads;
