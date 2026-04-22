import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, User, FileText, Activity, Layers, Phone, Mail, MapPin, 
  Save, SwitchCamera, UploadCloud, Download, CheckCircle, Clock 
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
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

  if (loading) return <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center text-white"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div></div>;

  const tabs = ['Personal Details', 'Documents', 'Remarks & Activity Log', 'Status'];

  return (
    <div className="bg-[#0B0F19] min-h-screen pb-20 font-inter text-slate-200">
      
      {/* Header Profile */}
      <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 pt-8 pb-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-medium mb-4 hover:text-white transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Leads
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{lead.applicant_name}</h1>
                <span className="bg-blue-500/20 text-blue-400 font-mono text-xs px-2 py-1 rounded border border-blue-500/30">
                  {lead.lead_number}
                </span>
                <span className="bg-indigo-500/20 text-indigo-400 font-medium text-xs px-2 py-1 rounded border border-indigo-500/30">
                  {lead.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-400">
                <span className="flex items-center gap-1"><Phone className="w-4 h-4"/> {lead.mobile}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> {lead.location_city}</span>
                <span className="flex items-center gap-1"><Wallet className="w-4 h-4"/> ₹{(lead.loan_amount_required/100000).toFixed(2)}L • {lead.loan_type?.replace('_', ' ')}</span>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-1 overflow-x-auto no-scrollbar mt-6 border-b border-white/10">
            {tabs.map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-4 py-3 text-sm font-semibold transition-all border-b-2 ${
                  activeTab === tab 
                    ? 'text-blue-400 border-blue-400 bg-blue-500/10' 
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* Tab 1: Personal Details */}
        {activeTab === 'Personal Details' && (
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div><label className="text-xs text-slate-400 mb-1 block">Father's/Spouse Name</label>
                  <input type="text" value={personalDetails.father_or_spouse_name} onChange={e => setPersonalDetails({...personalDetails, father_or_spouse_name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"/>
                </div>
                <div><label className="text-xs text-slate-400 mb-1 block">Date of Birth</label>
                  <input type="date" value={personalDetails.date_of_birth} onChange={e => setPersonalDetails({...personalDetails, date_of_birth: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white [color-scheme:dark]"/>
                </div>
                <div><label className="text-xs text-slate-400 mb-1 block">Gender</label>
                  <select value={personalDetails.gender} onChange={e => setPersonalDetails({...personalDetails, gender: e.target.value})} className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white appearance-none">
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
                <div><label className="text-xs text-slate-400 mb-1 block">Marital Status</label>
                  <select value={personalDetails.marital_status} onChange={e => setPersonalDetails({...personalDetails, marital_status: e.target.value})} className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white appearance-none">
                    <option>Single</option><option>Married</option><option>Divorced</option><option>Widowed</option>
                  </select>
                </div>
                <div><label className="text-xs text-slate-400 mb-1 block">Occupation Type</label>
                  <select value={personalDetails.occupation_type} onChange={e => setPersonalDetails({...personalDetails, occupation_type: e.target.value})} className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white appearance-none">
                    <option>Salaried</option><option>Self-Employed</option><option>Business Owner</option><option>Farmer</option><option>Other</option>
                  </select>
                </div>
                {['Salaried'].includes(personalDetails.occupation_type) && (
                  <div><label className="text-xs text-slate-400 mb-1 block">Monthly Income</label>
                    <input type="number" value={personalDetails.monthly_income} onChange={e => setPersonalDetails({...personalDetails, monthly_income: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"/>
                  </div>
                )}
                {['Business Owner', 'Self-Employed'].includes(personalDetails.occupation_type) && (
                  <>
                    <div><label className="text-xs text-slate-400 mb-1 block">Business Name</label>
                      <input type="text" value={personalDetails.business_name} onChange={e => setPersonalDetails({...personalDetails, business_name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"/>
                    </div>
                    <div><label className="text-xs text-slate-400 mb-1 block">Annual Turnover</label>
                      <input type="number" value={personalDetails.annual_turnover} onChange={e => setPersonalDetails({...personalDetails, annual_turnover: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white"/>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={handleSavePersonalDetails} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                  <Save className="w-4 h-4"/> Save Draft
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Documents Upload */}
        {activeTab === 'Documents' && (
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="space-y-4">
            {[
              {id: 'pan_card', label: 'PAN Card', required: true},
              {id: 'aadhaar_front', label: 'Aadhaar Card (Front)', required: true},
              {id: 'aadhaar_back', label: 'Aadhaar Card (Back)', required: true},
              {id: 'bank_statement', label: 'Bank Statement (6 mos)', required: false},
            ].map(docConfig => {
              const uploadedDoc = documents.find(d => d.doc_type === docConfig.id);
              return (
                <div key={docConfig.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div>
                    <h4 className="font-bold text-white flex items-center gap-2">
                      {docConfig.label} 
                      {docConfig.required && <span className="bg-rose-500/20 text-rose-400 text-[10px] px-2 py-0.5 rounded">Required</span>}
                    </h4>
                    {uploadedDoc ? (
                      <p className="text-emerald-400 text-xs mt-1 flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Uploaded • {uploadedDoc.file_name}</p>
                    ) : (
                      <p className="text-slate-500 text-xs mt-1">Pending verification</p>
                    )}
                  </div>
                  <div className="w-full md:w-auto">
                    {uploadedDoc ? (
                      <a href={`${API_URL}${uploadedDoc.file_url}`} target="_blank" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition">
                        <Download className="w-4 h-4"/> View File
                      </a>
                    ) : (
                      <label className="cursor-pointer bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition w-full">
                        <UploadCloud className="w-4 h-4"/> Upload
                        <input type="file" className="hidden" onChange={(e) => handleDocUpload(e, docConfig.id)} />
                      </label>
                    )}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* Tab 3: Remarks & Log */}
        {activeTab === 'Remarks & Activity Log' && (
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
              <h3 className="font-bold text-white mb-4">Add Remark / Log</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Remark Type</label>
                  <select value={newRemarkType} onChange={e=>setNewRemarkType(e.target.value)} className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white appearance-none">
                    <option value="call_log">Call Log</option>
                    <option value="follow_up">Follow Up Set</option>
                    <option value="note">Internal Note</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Remark Text</label>
                  <textarea rows="4" value={newRemarkText} onChange={e=>setNewRemarkText(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white resize-none" placeholder="Enter notes..."></textarea>
                </div>
                {newRemarkType === 'follow_up' && (
                  <div>
                    <label className="text-xs text-slate-400 mb-1 block">Follow Up Date</label>
                    <input type="date" value={newRemarkDate} onChange={e=>setNewRemarkDate(e.target.value)} className="w-full bg-[#111827] border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-white [color-scheme:dark]"/>
                  </div>
                )}
                <button onClick={handleAddRemark} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl text-sm font-bold mt-2">Submit Remark</button>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Activity Log</h3>
              <div className="space-y-4 max-h-[500px] overflow-y-auto no-scrollbar pr-2">
                {remarks.map((rm, i) => (
                  <div key={i} className="border-l-2 border-slate-800 pl-4 py-3 relative group hover:bg-white/5 transition-colors rounded-r-lg">
                    <div className={`absolute w-3 h-3 rounded-full -left-[7px] top-4 border-2 border-[#0B0F19] ${
                      rm.remark_type === 'system' ? 'bg-indigo-500' : 
                      rm.remark_type === 'follow_up' ? 'bg-amber-500' :
                      rm.remark_type === 'call_log' ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex justify-between items-start mb-1">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${
                        rm.remark_type === 'system' ? 'text-indigo-400' : 'text-blue-400'
                      }`}>
                        {rm.remark_type?.replace('_', ' ')}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium">
                        {new Date(rm.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">{rm.remark_text}</p>
                    {rm.remark_type !== 'system' && (
                      <p className="text-[10px] text-slate-500 mt-2 font-bold uppercase tracking-tighter opacity-60">
                        Logged by {rm.user_id?.full_name}
                      </p>
                    )}
                  </div>
                ))}
                {remarks.length === 0 && <p className="text-slate-500 text-sm italic">No remarks found.</p>}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: Status */}
        {activeTab === 'Status' && (
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}}>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-xl">
              <h3 className="text-lg font-bold text-white mb-6">Manage Lead Stage</h3>
              
              <div className="space-y-5">
                <div>
                  <label className="text-sm text-slate-400 mb-2 block font-semibold">Current Pipeline Stage</label>
                  <select disabled className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-white appearance-none opacity-60">
                    <option>{lead.stage}</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-slate-400 mb-2 block font-semibold">Update Status To</label>
                  <select value={leadStatus} onChange={e=>setLeadStatus(e.target.value)} className="w-full bg-[#111827] border border-blue-500/50 rounded-lg px-4 py-3 text-base focus:outline-none focus:border-blue-500 text-white appearance-none mb-4">
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Document Submitted">Document Submitted</option>
                    {(user?.role === 'bsm' || user?.role === 'admin') && (
                      <>
                        <option value="Sanctioned">Sanctioned</option>
                        <option value="Disbursed">Disbursed</option>
                        <option value="Closed - Won">Closed - Won</option>
                      </>
                    )}
                    <option value="Dead Lead">Dead Lead</option>
                    <option value="On Hold">On Hold</option>
                  </select>

                  {leadStatus === 'Dead Lead' && (
                    <motion.div initial={{opacity:0, height:0}} animate={{opacity:1, height:'auto'}} className="mb-4">
                      <label className="text-xs text-rose-400 mb-1 block font-bold uppercase tracking-widest">Reason for Death</label>
                      <textarea 
                        rows="3" 
                        className="w-full bg-rose-500/5 border border-rose-500/20 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-500 text-white resize-none" 
                        placeholder="Why is this lead no longer viable?"
                        value={lead.dead_reason || ''}
                        onChange={e => setLead({...lead, dead_reason: e.target.value})}
                      ></textarea>
                    </motion.div>
                  )}
                </div>

                <button onClick={handleUpdateStatus} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl text-sm font-bold uppercase tracking-wider mt-4 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
                  Confirm Status Update
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default LeadDetails;

function Wallet(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  )
}
