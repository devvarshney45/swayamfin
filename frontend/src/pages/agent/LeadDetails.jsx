import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, User, FileText, Activity, Layers, Phone, Mail, MapPin, 
  Save, SwitchCamera, UploadCloud, Download, CheckCircle, Clock,
  History, Shield, Briefcase, Calendar, Trash2, Edit3, Fingerprint,
  FileSearch, MessageSquare
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { t } = useTranslation();
  
  const [activeTab, setActiveTab] = useState('Personal Details');
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSaving, setActiveSaving] = useState(false);

  // Tabs Data
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

      setDocuments(docRes.data.data);
      setRemarks(remarkRes.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSavePersonalDetails = async () => {
    setActiveSaving(true);
    try {
      await axios.put(`${API_URL}/api/leads/${id}`, personalDetails, { headers });
      fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setActiveSaving(false);
    }
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
    } catch(err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      await axios.patch(`${API_URL}/api/leads/${id}/status`, {
        status: leadStatus,
        stage: leadStage
      }, { headers });
      fetchData();
    } catch(err) {
      console.error(err);
    }
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
    } catch(err) {
      console.error(err);
    }
  };

  if (loading) return (
    <div className={`min-h-screen ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} flex items-center justify-center`}>
      <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );

  const tabs = ['Personal Details', 'Documents', 'Remarks & Activity Log', 'Status'];

  return (
    <div className={`${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-900'} min-h-screen pt-24 md:pt-28 pb-20 font-inter transition-colors duration-300 relative`}>
      
      {/* Premium Glass Header */}
      <div className={`${isDark ? 'bg-white/2 border-white/5 shadow-2xl shadow-black/50' : 'bg-white/80 border-slate-200 shadow-xl shadow-slate-200/50'} border-b sticky top-0 z-30 backdrop-blur-2xl transition-all`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8">
            <button onClick={() => navigate(-1)} className={`${isDark ? 'text-slate-400' : 'text-slate-500'} flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] mb-8 hover:text-blue-500 transition-colors`}>
              <ArrowLeft className="w-4 h-4" /> Portfolio Management
            </button>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
              <div className="flex items-center gap-8">
                <div className="relative">
                   <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 scale-125" />
                   <div className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-blue-600 border-blue-700 shadow-xl shadow-blue-600/30'} w-20 h-20 rounded-[32px] flex items-center justify-center border relative z-10 hover:rotate-3 transition-transform`}>
                      <Fingerprint className={`w-10 h-10 ${isDark ? 'text-blue-400' : 'text-white'}`} />
                   </div>
                </div>
                <div>
                   <div className="flex items-center gap-3 mb-3 flex-wrap">
                      <h1 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter`}>{lead.applicant_name}</h1>
                      <div className="px-4 py-1.5 rounded-full bg-blue-600/10 text-blue-500 border border-blue-500/20 text-[10px] font-black uppercase tracking-widest shadow-inner">
                        {lead.lead_number}
                      </div>
                   </div>
                   <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">
                      <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-blue-500" /> {lead.mobile}</span>
                      <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-blue-500" /> {lead.location_city}</span>
                      <span className="flex items-center gap-2 text-blue-600 font-black italic underline decoration-blue-500/20 underline-offset-4">
                        ₹{(lead.loan_amount_required/100000).toFixed(2)}L • {lead.loan_type?.replace('_', ' ')}
                      </span>
                   </div>
                </div>
              </div>

              <div className="flex gap-2 p-1.5 rounded-[24px] overflow-x-auto no-scrollbar ${isDark ? 'bg-white/5 border-white/5' : 'bg-slate-100 border-slate-200'} border">
                {tabs.map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap px-6 py-3 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab 
                        ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30' 
                        : `${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pb-20">
        
        {/* Tab 1: Personal Details */}
        {activeTab === 'Personal Details' && (
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} border rounded-[48px] p-10 relative overflow-hidden group`}>
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 blur-3xl rounded-full -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-700" />
                <div className="flex items-center gap-3 mb-10 relative z-10">
                   <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                   <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>Demographic Profile</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                  <InputGroup label="Father's/Spouse Name" value={personalDetails.father_or_spouse_name} onChange={v => setPersonalDetails({...personalDetails, father_or_spouse_name: v})} icon={<User />} isDark={isDark} />
                  <InputGroup label="Date of Birth" value={personalDetails.date_of_birth} onChange={v => setPersonalDetails({...personalDetails, date_of_birth: v})} icon={<Calendar />} type="date" isDark={isDark} />
                  
                  <SelectGroup label="Gender" value={personalDetails.gender} onChange={v => setPersonalDetails({...personalDetails, gender: v})} options={['Male', 'Female', 'Other']} isDark={isDark} />
                  <SelectGroup label="Marital Status" value={personalDetails.marital_status} onChange={v => setPersonalDetails({...personalDetails, marital_status: v})} options={['Single', 'Married', 'Divorced', 'Widowed']} isDark={isDark} />
                </div>
              </div>

              <div className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} border rounded-[48px] p-10 relative overflow-hidden group`}>
                <div className="flex items-center gap-3 mb-10 relative z-10">
                   <div className="w-1.5 h-8 bg-indigo-600 rounded-full" />
                   <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>Economic Status</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                   <SelectGroup label="Occupation Context" value={personalDetails.occupation_type} onChange={v => setPersonalDetails({...personalDetails, occupation_type: v})} options={['Salaried', 'Self-Employed', 'Business Owner', 'Farmer', 'Other']} isDark={isDark} />
                   
                   {['Salaried'].includes(personalDetails.occupation_type) && (
                     <InputGroup label="Net Monthly Yield" value={personalDetails.monthly_income} onChange={v => setPersonalDetails({...personalDetails, monthly_income: v})} icon={<Briefcase />} type="number" isDark={isDark} />
                   )}
                   
                   {['Business Owner', 'Self-Employed'].includes(personalDetails.occupation_type) && (
                     <>
                       <InputGroup label="Enterprise Identity" value={personalDetails.business_name} onChange={v => setPersonalDetails({...personalDetails, business_name: v})} icon={<Shield />} isDark={isDark} />
                       <InputGroup label="Annual Fiscal Velocity" value={personalDetails.annual_turnover} onChange={v => setPersonalDetails({...personalDetails, annual_turnover: v})} icon={<Activity />} type="number" isDark={isDark} />
                     </>
                   )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
               <div className={`${isDark ? 'bg-blue-600/10 border-blue-500/20' : 'bg-blue-600 border-blue-700 shadow-2xl shadow-blue-600/30'} border rounded-[48px] p-10 h-fit sticky top-48`}>
                  <h4 className="text-white font-black text-lg uppercase tracking-tight mb-4">Integrity Check</h4>
                  <p className={`${isDark ? 'text-blue-200' : 'text-blue-50'} text-xs font-bold leading-relaxed opacity-70 mb-10`}>Ensure all economic and demographic data points are verified against physical documentation before freezing the asset profile.</p>
                  <button 
                    onClick={handleSavePersonalDetails}
                    disabled={activeSaving}
                    className={`w-full py-5 ${isDark ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-black/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3`}
                  >
                    {activeSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
                    Lock Asset Profile
                  </button>
               </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Documents */}
        {activeTab === 'Documents' && (
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {id: 'pan_card', label: 'Tax Identification (PAN)', required: true, icon: <FileText />},
              {id: 'aadhaar_front', label: 'Sovereign Identity (Front)', required: true, icon: <Fingerprint />},
              {id: 'aadhaar_back', label: 'Sovereign Identity (Back)', required: true, icon: <Fingerprint />},
              {id: 'bank_statement', label: 'Fiscal History (6 Mos)', required: false, icon: <Activity />},
            ].map((docConfig, idx) => {
              const uploadedDoc = documents.find(d => d.doc_type === docConfig.id);
              return (
                <div key={docConfig.id} className={`${isDark ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-blue-400'} border rounded-[40px] p-8 transition-all group flex flex-col justify-between h-[280px]`}>
                   <div className="flex justify-between items-start mb-6">
                      <div className={`p-4 ${isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-100 shadow-inner'} rounded-2xl border`}>
                         {docConfig.icon}
                      </div>
                      {docConfig.required && !uploadedDoc && <span className="bg-rose-500/10 text-rose-500 text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border border-rose-500/20 shadow-inner animate-pulse">Critical Requirement</span>}
                      {uploadedDoc && <CheckCircle className="w-6 h-6 text-emerald-500" />}
                   </div>
                   
                   <div>
                      <h4 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight mb-2`}>{docConfig.label}</h4>
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest opacity-70">
                         {uploadedDoc ? `Audit Log: ${uploadedDoc.file_name}` : 'Verification Pending: Awaiting Upload'}
                      </p>
                   </div>

                   <div className="mt-8">
                      {uploadedDoc ? (
                         <a href={`${API_URL}${uploadedDoc.file_url}`} target="_blank" rel="noreferrer" className={`w-full py-4 ${isDark ? 'bg-white/10 text-white border-white/10 hover:bg-white/20' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'} rounded-2xl border text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all`}>
                            <Download className="w-4 h-4" /> Retrieve Document
                         </a>
                      ) : (
                         <label className="cursor-pointer">
                            <div className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all">
                               <UploadCloud className="w-4 h-4" /> Initialize Upload
                            </div>
                            <input type="file" className="hidden" onChange={(e) => handleDocUpload(e, docConfig.id)} />
                         </label>
                      )}
                   </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Tab 3: Remarks */}
        {activeTab === 'Remarks & Activity Log' && (
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50'} border rounded-[48px] p-10 h-fit sticky top-48`}>
               <div className="flex items-center gap-3 mb-10">
                  <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                  <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>Intelligence Log</h3>
               </div>
               
               <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 mb-2 block">Event Taxonomy</label>
                    <select value={newRemarkType} onChange={e=>setNewRemarkType(e.target.value)} className={`w-full ${isDark ? 'bg-[#111827] border-white/10 text-white' : 'bg-slate-50 border-slate-100 text-slate-900'} rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-blue-500 appearance-none border-2`}>
                       <option value="call_log">Voice Communication</option>
                       <option value="follow_up">Scheduled Engagement</option>
                       <option value="note">Field Intelligence</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 mb-2 block">Audit Narrative</label>
                    <textarea rows="5" value={newRemarkText} onChange={e=>setNewRemarkText(e.target.value)} className={`w-full ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-100 text-slate-900 shadow-inner'} rounded-[24px] px-6 py-4 text-sm font-medium outline-none focus:border-blue-500 resize-none border-2`} placeholder="Capture incident details..."></textarea>
                  </div>

                  {newRemarkType === 'follow_up' && (
                    <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}}>
                       <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 mb-2 block">Next Execution Date</label>
                       <input type="date" value={newRemarkDate} onChange={e=>setNewRemarkDate(e.target.value)} className={`w-full ${isDark ? 'bg-[#111827] border-white/10 text-white [color-scheme:dark]' : 'bg-slate-50 border-slate-100 text-slate-900'} rounded-2xl px-6 py-4 text-sm font-bold outline-none focus:border-blue-500 border-2`}/>
                    </motion.div>
                  )}

                  <button 
                    onClick={handleAddRemark}
                    className="w-full py-5 bg-blue-600 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    Commit to Ledger
                  </button>
               </div>
            </div>

            <div className="space-y-6">
               <div className="flex items-center justify-between mb-8 px-4">
                  <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight flex items-center gap-3`}>
                    <History className="w-6 h-6 text-indigo-500" /> Chronicled Events
                  </h3>
                  <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl border border-white/10">
                     Total Records: {remarks.length}
                  </div>
               </div>

               <div className="space-y-4">
                 {remarks.map((rm, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.05 }}
                     className={`${isDark ? 'bg-white/2 border-white/5' : 'bg-white border-slate-200 shadow-lg shadow-slate-200/50'} relative p-8 rounded-[40px] border group overflow-hidden`}
                   >
                     <div className={`absolute top-0 right-0 w-24 h-24 ${rm.remark_type === 'system' ? 'bg-indigo-500/5' : 'bg-blue-500/5'} blur-2xl rounded-full -mr-12 -mt-12`} />
                     
                     <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border shadow-inner ${
                          rm.remark_type === 'system' ? (isDark ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' : 'bg-indigo-600 text-white') : 
                          rm.remark_type === 'follow_up' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                          rm.remark_type === 'call_log' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                          (isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-100')
                        }`}>
                           {rm.remark_type?.replace('_', ' ')}
                        </div>
                        <span className="text-[9px] text-slate-500 font-black uppercase tracking-tighter tabular-nums opacity-60">
                           {new Date(rm.createdAt).toLocaleString()}
                        </span>
                     </div>

                     <p className={`${isDark ? 'text-slate-200' : 'text-slate-800'} font-medium text-base leading-relaxed mb-6 italic relative z-10`}>
                        "{rm.remark_text}"
                     </p>

                     {rm.remark_type !== 'system' && (
                        <div className="flex items-center gap-3 pt-6 border-t border-white/5 relative z-10">
                           <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">
                              {rm.user_id?.full_name?.charAt(0)}
                           </div>
                           <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest opacity-80">
                              Logged by {rm.user_id?.full_name}
                           </span>
                        </div>
                     )}
                   </motion.div>
                 ))}
                 {remarks.length === 0 && (
                   <div className="py-24 text-center opacity-30 flex flex-col items-center">
                      <MessageSquare className="w-20 h-20 mb-4" />
                      <p className="text-[10px] font-black uppercase tracking-[0.4em]">Empty Ledger</p>
                   </div>
                 )}
               </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: Status */}
        {activeTab === 'Status' && (
          <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="flex justify-center">
            <div className={`${isDark ? 'bg-white/2 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'} border rounded-[60px] p-16 max-w-2xl w-full relative overflow-hidden group`}>
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:scale-150 transition-transform duration-700" />
               
               <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-12">
                     <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                        <Layers className="w-8 h-8 text-emerald-500" />
                     </div>
                     <div>
                        <h3 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tighter`}>Lifecycle Governance</h3>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest opacity-70">Current Strategic Stage: <span className="text-blue-500">{lead.stage}</span></p>
                     </div>
                  </div>

                  <div className="space-y-10">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 mb-4 block">Transition To New State</label>
                      <div className="grid grid-cols-2 gap-4">
                         {['New', 'Contacted', 'In Progress', 'Document Submitted', 'Sanctioned', 'Disbursed', 'Closed - Won', 'Dead Lead', 'On Hold'].map(status => {
                           const isRestricted = ['Sanctioned', 'Disbursed', 'Closed - Won'].includes(status) && user?.role === 'sales_person';
                           if (isRestricted) return null;
                           return (
                             <button 
                               key={status}
                               onClick={() => setLeadStatus(status)}
                               className={`px-6 py-4 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                                 leadStatus === status 
                                   ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/30' 
                                   : `${isDark ? 'bg-white/5 border-white/5 text-slate-500' : 'bg-slate-50 border-slate-100 text-slate-500'} hover:bg-blue-500/10 hover:border-blue-500/30`
                               }`}
                             >
                               {status}
                             </button>
                           );
                         })}
                      </div>
                    </div>

                    <AnimatePresence>
                      {leadStatus === 'Dead Lead' && (
                        <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="space-y-4">
                           <label className="text-[10px] text-rose-500 font-black uppercase tracking-[0.3em] ml-1 block">Termination Rationale</label>
                           <textarea 
                             rows="4" 
                             className={`w-full ${isDark ? 'bg-rose-500/5 border-rose-500/20 text-white' : 'bg-rose-50 border-rose-100 text-rose-900'} rounded-[24px] px-6 py-4 text-sm font-medium outline-none focus:border-rose-500 resize-none border-2`} 
                             placeholder="Audit requirement for dead leads..."
                             value={lead.dead_reason || ''}
                             onChange={e => setLead({...lead, dead_reason: e.target.value})}
                           ></textarea>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button onClick={handleUpdateStatus} className="w-full py-6 bg-blue-600 text-white rounded-[24px] font-black uppercase tracking-[0.3em] text-xs shadow-2xl shadow-blue-600/40 hover:scale-[1.02] active:scale-95 transition-all">
                       Execute Strategic Transition
                    </button>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

const InputGroup = ({ label, value, onChange, icon, type = 'text', isDark }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
      {React.cloneElement(icon, { className: "w-3 h-3 text-blue-500" })} {label}
    </label>
    <input 
      type={type} 
      value={value} 
      onChange={e => onChange(e.target.value)} 
      className={`w-full ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-900 shadow-inner'} rounded-[20px] px-6 py-4 text-sm font-bold outline-none focus:border-blue-500 transition-all border-2 [color-scheme:dark]`}
    />
  </div>
);

const SelectGroup = ({ label, value, onChange, options, isDark }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
       <BarChart3 className="w-3 h-3 text-blue-500" /> {label}
    </label>
    <div className="relative">
      <select 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        className={`w-full ${isDark ? 'bg-[#111827] border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-900 shadow-inner'} rounded-[20px] px-6 py-4 text-sm font-bold outline-none focus:border-blue-500 transition-all border-2 appearance-none cursor-pointer`}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
         <Clock className="w-4 h-4 rotate-90" />
      </div>
    </div>
  </div>
);

export default LeadDetails;
