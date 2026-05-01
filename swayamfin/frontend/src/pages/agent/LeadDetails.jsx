import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const getDocumentUrl = (fileUrl) => {
  if (!fileUrl) return '#';
  if (/^https?:\/\//i.test(fileUrl)) return fileUrl;
  return `${API_URL}${encodeURI(fileUrl)}`;
};

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('Personal Details');
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSaving, setActiveSaving] = useState(false);

  const [personalDetails, setPersonalDetails] = useState({});
  const [documents, setDocuments] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [newRemarkText, setNewRemarkText] = useState('');
  const [newRemarkType, setNewRemarkType] = useState('note');
  const [newRemarkDate, setNewRemarkDate] = useState('');

  const [leadStatus, setLeadStatus] = useState('');
  const [leadStage, setLeadStage] = useState('');

  const token = localStorage.getItem('swayamfin_token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [leadRes, docRes, remarkRes] = await Promise.all([
        axios.get(`${API_URL}/api/leads/${id}`, { headers }),
        axios.get(`${API_URL}/api/leads/${id}/documents`, { headers }),
        axios.get(`${API_URL}/api/leads/${id}/remarks`, { headers })
      ]);

      setLead(leadRes.data);
      setLeadStatus(leadRes.data.status);
      setLeadStage(leadRes.data.stage);
      setPersonalDetails({
        father_or_spouse_name: leadRes.data.father_or_spouse_name || '',
        date_of_birth: leadRes.data.date_of_birth ? leadRes.data.date_of_birth.substring(0,10) : '',
        gender: leadRes.data.gender || 'Male',
        marital_status: leadRes.data.marital_status || 'Single',
        current_address: leadRes.data.current_address || '',
        permanent_address: leadRes.data.permanent_address || '',
        occupation_type: leadRes.data.occupation_type || 'Salaried',
        monthly_income: leadRes.data.monthly_income || '',
        annual_turnover: leadRes.data.annual_turnover || '',
        business_name: leadRes.data.business_name || '',
        business_vintage_years: leadRes.data.business_vintage_years || '',
        gst_registered: leadRes.data.gst_registered || false,
        cibil_score: leadRes.data.cibil_score || ''
      });

      setDocuments(docRes.data.data || []);
      setRemarks(remarkRes.data.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to pull lead asset from node.');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePersonalDetails = async () => {
    setActiveSaving(true);
    try {
      await axios.put(`${API_URL}/api/leads/${id}`, personalDetails, { headers });
      fetchData();
    } catch (err) { console.error(err); }
    finally { setActiveSaving(false); }
  };

  const handleAddRemark = async () => {
    if (!newRemarkText.trim()) return;
    try {
      await axios.post(`${API_URL}/api/leads/${id}/remarks`, {
        remark_text: newRemarkText,
        remark_type: newRemarkType,
        follow_up_date: newRemarkDate || null
      }, { headers });
      setNewRemarkText('');
      setNewRemarkDate('');
      setNewRemarkType('note');
      fetchData();
    } catch(err) { console.error(err); }
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.patch(`${API_URL}/api/leads/${id}/status`, {
        status: leadStatus,
        stage: leadStage
      }, { headers });
      fetchData();
    } catch(err) { console.error(err); }
  };

  const handleDocUpload = async (e, docType) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('doc_type', docType);

    try {
      await axios.post(`${API_URL}/api/leads/${id}/documents`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchData();
    } catch(err) { console.error(err); }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
       <div className="w-12 h-12 border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9] rounded-full animate-spin" />
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Querying Asset Link...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center space-y-6">
       <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-2xl">!</div>
       <div className="space-y-2">
         <h2 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Node Unlink</h2>
         <p className="text-slate-500 text-sm font-medium italic max-w-md">{error}</p>
       </div>
       <button onClick={() => navigate(-1)} className="btn-primary py-3 px-8 text-xs">Return to Portfolio</button>
    </div>
  );

  const tabs = ['Personal Details', 'Documents', 'Remarks & Activity Log', 'Status'];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-40">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Bridge */}
        <div className="bg-white border border-slate-100 p-6 md:p-14 rounded-[40px] md:rounded-[48px] shadow-sm mb-12 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0EA5E9]/5 blur-[80px] rounded-full translate-x-1/4 -translate-y-1/4" />
           <div className="relative z-10">
              <button onClick={() => navigate(-1)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#0EA5E9] mb-8 flex items-center gap-2 transition-all">
                 ← Portfolio Repository
              </button>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 flex-wrap">
                       <h1 className="text-4xl md:text-5xl font-black text-[#1E293B] tracking-tighter uppercase">{lead.applicant_name}</h1>
                       <span className="bg-[#1E293B] text-[#0EA5E9] text-[10px] font-black px-4 py-2 rounded-full shadow-lg">{lead.lead_number}</span>
                    </div>
                    <div className="flex flex-wrap gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
                       <span>{lead.mobile}</span>
                       <span>{lead.location_city} Hub</span>
                       <span className="text-[#0EA5E9] font-black italic underline underline-offset-4 decoration-[#0EA5E9]/20">
                          ₹{(lead.loan_amount_required/100000).toFixed(2)}L • {lead.loan_type?.replace('-', ' ')}
                       </span>
                    </div>
                 </div>
                 <div className="flex bg-slate-50 border border-slate-100 p-1.5 rounded-[24px] overflow-x-auto no-scrollbar">
                    {tabs.map(tab => (
                      <button 
                         key={tab}
                         onClick={() => setActiveTab(tab)}
                         className={`px-6 py-3 rounded-[18px] text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#0EA5E9] text-white shadow-xl' : 'text-slate-400 hover:text-[#1E293B]'}`}
                      >
                         {tab}
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Content Node */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
           
           <div className="lg:col-span-8 space-y-10">
              {activeTab === 'Personal Details' && (
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-10">
                   <div className="bg-white border border-slate-100 p-6 md:p-14 rounded-[32px] md:rounded-[48px] shadow-sm space-y-10 relative overflow-hidden">
                      <div className="flex items-center gap-3 mb-6">
                         <div className="w-1 h-8 bg-[#0EA5E9] rounded-full" />
                         <h3 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Demographic Profile</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <InputGroup label="Father's/Spouse Name" value={personalDetails.father_or_spouse_name} onChange={v => setPersonalDetails({...personalDetails, father_or_spouse_name: v})} />
                         <InputGroup label="Date of Birth" value={personalDetails.date_of_birth} onChange={v => setPersonalDetails({...personalDetails, date_of_birth: v})} type="date" />
                         <SelectGroup label="Gender" value={personalDetails.gender} onChange={v => setPersonalDetails({...personalDetails, gender: v})} options={['Male', 'Female', 'Other']} />
                         <SelectGroup label="Marital Status" value={personalDetails.marital_status} onChange={v => setPersonalDetails({...personalDetails, marital_status: v})} options={['Single', 'Married', 'Divorced', 'Widowed']} />
                      </div>
                   </div>

                   <div className="bg-white border border-slate-100 p-6 md:p-14 rounded-[32px] md:rounded-[48px] shadow-sm space-y-10">
                      <div className="flex items-center gap-3 mb-6">
                         <div className="w-1 h-8 bg-[#1E293B] rounded-full" />
                         <h3 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">Economic Velocity</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <SelectGroup label="Occupation Context" value={personalDetails.occupation_type} onChange={v => setPersonalDetails({...personalDetails, occupation_type: v})} options={['Salaried', 'Self-Employed', 'Business Owner', 'Farmer', 'Other']} />
                         <InputGroup label="Monthly/Annual Yield" value={personalDetails.monthly_income || personalDetails.annual_turnover} onChange={v => setPersonalDetails({...personalDetails, monthly_income: v})} type="number" />
                         <InputGroup label="Enterprise Identity" value={personalDetails.business_name} onChange={v => setPersonalDetails({...personalDetails, business_name: v})} />
                         <InputGroup label="CIBIL Simulation" value={personalDetails.cibil_score} onChange={v => setPersonalDetails({...personalDetails, cibil_score: v})} type="number" />
                      </div>
                   </div>
                </motion.div>
              )}

              {activeTab === 'Documents' && (
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   {[
                     {id: 'pan_card', label: 'Tax Identification (PAN)', required: true},
                     {id: 'aadhaar_front', label: 'Sovereign Identity (Front)', required: true},
                     {id: 'aadhaar_back', label: 'Sovereign Identity (Back)', required: true},
                     {id: 'bank_statement', label: 'Fiscal History (6 Mos)', required: false},
                   ].map((docConfig) => {
                     const uploadedDoc = documents.find(d => d.doc_type === docConfig.id);
                     return (
                       <div key={docConfig.id} className="bg-white border border-slate-100 p-6 md:p-10 rounded-[32px] md:rounded-[48px] shadow-sm flex flex-col justify-between h-[320px] group transition-all hover:shadow-2xl">
                          <div>
                             <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center font-black text-[#0EA5E9]">D</div>
                                {docConfig.required && !uploadedDoc && <span className="bg-rose-50 text-rose-500 text-[8px] font-black uppercase px-2 py-1 rounded border border-rose-100 animate-pulse">Critical</span>}
                                {uploadedDoc && <span className="text-emerald-500 font-black">✓</span>}
                             </div>
                             <h4 className="text-lg font-black text-[#1E293B] uppercase tracking-tight">{docConfig.label}</h4>
                             <p className="text-[9px] text-slate-400 font-black uppercase mt-2">{uploadedDoc ? uploadedDoc.file_name : 'Pending Verification'}</p>
                          </div>
                          <div className="mt-8">
                             {uploadedDoc ? (
                               <a href={getDocumentUrl(uploadedDoc.file_url)} target="_blank" rel="noreferrer" className="w-full btn-secondary py-4 text-[9px] uppercase tracking-widest flex items-center justify-center">Watch Document</a>
                             ) : (
                               <label className="cursor-pointer block">
                                  <div className="w-full btn-primary py-4 text-[9px] uppercase tracking-widest flex items-center justify-center">Initialize Transmission</div>
                                  <input type="file" className="hidden" onChange={(e) => handleDocUpload(e, docConfig.id)} />
                               </label>
                             )}
                          </div>
                       </div>
                     );
                   })}
                </motion.div>
              )}

              {activeTab === 'Remarks & Activity Log' && (
                <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                   <div className="lg:col-span-5 bg-white border border-slate-100 p-6 md:p-10 rounded-[32px] md:rounded-[48px] shadow-sm h-fit">
                      <h3 className="text-xl font-black text-[#1E293B] uppercase tracking-tight mb-8">Intelligence Log</h3>
                      <div className="space-y-6">
                        <SelectGroup label="Event Taxonomy" value={newRemarkType} onChange={v => setNewRemarkType(v)} options={['note', 'call_log', 'follow_up']} />
                        <textarea value={newRemarkText} onChange={e=>setNewRemarkText(e.target.value)} rows="5" className="input-standard w-full rounded-2xl p-6 text-sm resize-none" placeholder="Narrative entry..."></textarea>
                        <button onClick={handleAddRemark} className="w-full btn-primary py-5 text-[9px] uppercase tracking-widest">Commit Entry</button>
                      </div>
                   </div>
                   <div className="lg:col-span-7 space-y-6">
                      {remarks.map((rm, i) => (
                        <div key={i} className="bg-white border border-slate-100 p-8 rounded-[40px] shadow-sm">
                           <div className="flex justify-between items-center mb-4">
                              <span className="text-[10px] font-black text-[#0EA5E9] uppercase tracking-widest">{rm.remark_type}</span>
                              <span className="text-[9px] text-slate-400 font-bold">{new Date(rm.createdAt).toLocaleDateString()}</span>
                           </div>
                           <p className="text-sm text-slate-600 font-medium italic italic">"{rm.remark_text}"</p>
                        </div>
                      ))}
                   </div>
                </motion.div>
              )}

              {activeTab === 'Status' && (
                 <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} className="flex justify-center">
                    <div className="bg-white border border-slate-100 p-8 md:p-14 rounded-[40px] md:rounded-[60px] shadow-2xl max-w-xl w-full text-center space-y-10">
                       <h3 className="text-3xl font-black text-[#1E293B] uppercase tracking-tighter">Governance Node</h3>
                       <div className="grid grid-cols-2 gap-4">
                         {['New', 'Contacted', 'In Progress', 'Document Submitted', 'Sanctioned', 'Disbursed', 'Closed - Won', 'Dead Lead'].map(s => (
                           <button 
                             key={s} 
                             onClick={() => setLeadStatus(s)}
                             className={`px-4 py-4 rounded-2xl border-2 text-[9px] font-black uppercase tracking-widest transition-all ${leadStatus === s ? 'bg-[#1E293B] border-[#1E293B] text-white' : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-[#0EA5E9]'}`}
                           >
                              {s}
                           </button>
                         ))}
                       </div>
                       <button onClick={handleUpdateStatus} className="w-full btn-primary py-6 text-[10px] uppercase tracking-widest shadow-2xl">Execute Transition</button>
                    </div>
                 </motion.div>
              )}
           </div>

           <div className="lg:col-span-4 lg:sticky top-12 space-y-8">
              <div className="bg-[#1E293B] p-6 md:p-10 rounded-[32px] md:rounded-[48px] shadow-2xl text-center space-y-8 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-[#0EA5E9]/5" />
                 <div className="relative z-10">
                    <h4 className="text-white font-black text-lg uppercase tracking-tight mb-4">Core Integrity</h4>
                    <p className="text-slate-400 text-xs font-medium italic leading-relaxed mb-10">Ensure all node parameters are verified against physical documentation before freezing the asset profile.</p>
                    <button 
                       onClick={handleSavePersonalDetails}
                       disabled={activeSaving}
                       className="w-full py-5 bg-white text-[#1E293B] rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-[#0EA5E9] hover:text-white transition-all shadow-2xl"
                    >
                       {activeSaving ? 'Locking Node...' : 'Lock Asset Profile'}
                    </button>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange, type = 'text' }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <input 
      type={type} value={value} onChange={e => onChange(e.target.value)} 
      className="input-standard w-full h-14 rounded-2xl px-6 text-sm"
    />
  </div>
);

const SelectGroup = ({ label, value, onChange, options }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
    <select 
      value={value} onChange={e => onChange(e.target.value)} 
      className="input-standard w-full h-14 rounded-2xl appearance-none px-6 text-sm"
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

export default LeadDetails;
