import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  MessageSquare, 
  Save, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  IndianRupee,
  Building2,
  Hash,
  Globe,
  User,
  FileText,
  Plus,
  ChevronDown,
  ChevronUp,
  Loader2,
  Send
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const outcomeOptions = [
  { value: 'Interested', label: 'Interested', color: 'bg-green-100 text-green-700' },
  { value: 'Not Reachable', label: 'Not Reachable', color: 'bg-orange-100 text-orange-700' },
  { value: 'Call Back', label: 'Call Back', color: 'bg-blue-100 text-blue-700' },
  { value: 'Documents Pending', label: 'Docs Pending', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'Rejected', label: 'Rejected', color: 'bg-red-100 text-red-700' },
  { value: 'Converted', label: 'Converted', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'Other', label: 'Other', color: 'bg-slate-100 text-slate-700' },
];

const getOutcomeColor = (outcome) => {
  const found = outcomeOptions.find(o => o.value === outcome);
  return found ? found.color : 'bg-slate-100 text-slate-600';
};

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [showExtraFields, setShowExtraFields] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // Extra client detail fields (editable)
  const [extraDetails, setExtraDetails] = useState({
    employmentType: '',
    monthlyIncome: '',
    businessName: '',
    address: '',
    pincode: '',
    agentNotes: '',
  });

  // Follow-up form state
  const [followUpNote, setFollowUpNote] = useState('');
  const [followUpOutcome, setFollowUpOutcome] = useState('Other');
  const [isAddingFollowUp, setIsAddingFollowUp] = useState(false);

  const token = localStorage.getItem('swayamfin_token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/leads/${id}`, { headers });
      const data = res.data;
      setLead(data);
      setStatus(data.status);
      setExtraDetails({
        employmentType: data.employmentType || '',
        monthlyIncome: data.monthlyIncome || '',
        businessName: data.businessName || '',
        address: data.address || '',
        pincode: data.pincode || '',
        agentNotes: data.agentNotes || '',
      });
      setLoading(false);
    } catch (err) {
      console.error('Error fetching lead:', err);
      setLoading(false);
    }
  };

  const handleSaveDetails = async () => {
    setIsSaving(true);
    setSaveMsg('');
    try {
      await axios.put(`${API_URL}/api/leads/${id}/status`, 
        { 
          status, 
          agentNotes: extraDetails.agentNotes,
          employmentType: extraDetails.employmentType,
          monthlyIncome: extraDetails.monthlyIncome ? Number(extraDetails.monthlyIncome) : null,
          businessName: extraDetails.businessName,
          address: extraDetails.address,
          pincode: extraDetails.pincode,
        }, 
        { headers }
      );
      setSaveMsg('✅ Saved!');
      setTimeout(() => setSaveMsg(''), 2500);
      fetchLead();
    } catch (err) {
      console.error('Error updating lead:', err);
      setSaveMsg('❌ Error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddFollowUp = async () => {
    if (!followUpNote.trim()) return;
    setIsAddingFollowUp(true);
    try {
      const res = await axios.post(`${API_URL}/api/leads/${id}/followup`, 
        { note: followUpNote, outcome: followUpOutcome }, 
        { headers }
      );
      setLead(res.data.data);
      setFollowUpNote('');
      setFollowUpOutcome('Other');
      setStatus(res.data.data.status);
    } catch (err) {
      console.error('Error adding follow-up:', err);
    } finally {
      setIsAddingFollowUp(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-primary-blue animate-spin mx-auto mb-4" />
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Loading Lead Profile...</p>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-slate-600 font-bold text-lg">Lead not found</p>
          <button onClick={() => navigate(-1)} className="mt-4 text-primary-blue font-bold underline">Go Back</button>
        </div>
      </div>
    );
  }

  const statusColor = {
    'Fresh': 'bg-blue-100 text-blue-700 ring-blue-200',
    'Contacted': 'bg-yellow-100 text-yellow-700 ring-yellow-200',
    'Qualified': 'bg-green-100 text-green-700 ring-green-200',
    'Converted': 'bg-emerald-100 text-emerald-700 ring-emerald-200',
    'Rejected': 'bg-red-100 text-red-700 ring-red-200',
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Back button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 font-bold mb-6 hover:text-primary-blue transition text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        {/* --- HEADER CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white p-6 md:p-8 rounded-[28px] shadow-sm border border-slate-100 mb-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl md:text-3xl font-black text-slate-900">{lead.fullName}</h1>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ring-1 ${statusColor[lead.status] || 'bg-slate-100 text-slate-600 ring-slate-200'}`}>
                  {lead.status}
                </span>
              </div>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Lead ID: {lead._id.slice(-8)} • Created {new Date(lead.createdAt).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'})}</p>
            </div>
            
            {/* Quick Action Buttons */}
            <div className="flex gap-2 w-full md:w-auto">
              <a href={`tel:${lead.mobile}`} className="flex-1 md:flex-none bg-primary-blue text-white px-5 py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-primary-blue/20 hover:bg-primary-darkBlue transition uppercase tracking-wider">
                <Phone className="w-4 h-4 fill-current" /> Call
              </a>
              <a href={`https://wa.me/91${lead.mobile}`} target="_blank" rel="noreferrer" className="flex-1 md:flex-none bg-green-500 text-white px-5 py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 hover:bg-green-600 transition uppercase tracking-wider">
                <MessageSquare className="w-4 h-4 fill-current" /> WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ======= LEFT COLUMN (2/3) ======= */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* --- CLIENT INFO CARD --- */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white p-6 md:p-8 rounded-[28px] shadow-sm border border-slate-100">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary-gold" /> Client Information
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                <InfoItem icon={<Phone className="w-4 h-4" />} label="Mobile" value={lead.mobile} isLink={`tel:${lead.mobile}`} />
                <InfoItem icon={<Mail className="w-4 h-4" />} label="Email" value={lead.email || '—'} isLink={lead.email ? `mailto:${lead.email}` : null} />
                <InfoItem icon={<MapPin className="w-4 h-4" />} label="City" value={lead.city} />
                <InfoItem icon={<FileText className="w-4 h-4" />} label="Loan Type" value={lead.loanType} />
                <InfoItem icon={<IndianRupee className="w-4 h-4" />} label="Amount" value={`₹${Number(lead.amount).toLocaleString('en-IN')}`} />
                <InfoItem icon={<Calendar className="w-4 h-4" />} label="Created" value={new Date(lead.createdAt).toLocaleDateString('en-IN')} />
                <InfoItem icon={<Building2 className="w-4 h-4" />} label="Branch" value={lead.assignedBranch?.name || 'Not Assigned'} />
                <InfoItem icon={<User className="w-4 h-4" />} label="Agent" value={lead.assignedAgent?.name || 'Not Assigned'} />
                <InfoItem icon={<Globe className="w-4 h-4" />} label="Source" value={lead.utm_source || 'Direct'} />
              </div>
            </motion.div>

            {/* --- EXTRA DETAILS (Expandable, editable) --- */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-[28px] shadow-sm border border-slate-100 overflow-hidden">
              <button 
                onClick={() => setShowExtraFields(!showExtraFields)} 
                className="w-full flex items-center justify-between p-6 md:p-8 hover:bg-slate-50/50 transition"
              >
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary-gold" /> Additional Details
                </h3>
                {showExtraFields ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
              </button>
              
              <AnimatePresence>
                {showExtraFields && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    transition={{ duration: 0.2 }}
                    className="px-6 md:px-8 pb-6 md:pb-8"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Employment Type</label>
                        <select 
                          value={extraDetails.employmentType} 
                          onChange={e => setExtraDetails({...extraDetails, employmentType: e.target.value})}
                          className="w-full mt-1.5 px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-bold text-slate-700 text-sm appearance-none"
                        >
                          <option value="">Not Set</option>
                          <option value="Salaried">Salaried</option>
                          <option value="Self-Employed">Self-Employed</option>
                          <option value="Business Owner">Business Owner</option>
                          <option value="Professional">Professional</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Monthly Income (₹)</label>
                        <input 
                          type="number" 
                          value={extraDetails.monthlyIncome} 
                          onChange={e => setExtraDetails({...extraDetails, monthlyIncome: e.target.value})}
                          placeholder="e.g. 50000"
                          className="w-full mt-1.5 px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-bold text-slate-700 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Business Name</label>
                        <input 
                          type="text" 
                          value={extraDetails.businessName} 
                          onChange={e => setExtraDetails({...extraDetails, businessName: e.target.value})}
                          placeholder="Business / Company name"
                          className="w-full mt-1.5 px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-bold text-slate-700 text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Pincode</label>
                        <input 
                          type="text" 
                          value={extraDetails.pincode} 
                          onChange={e => setExtraDetails({...extraDetails, pincode: e.target.value})}
                          placeholder="e.g. 110001"
                          className="w-full mt-1.5 px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-bold text-slate-700 text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Full Address</label>
                        <textarea 
                          rows="2" 
                          value={extraDetails.address} 
                          onChange={e => setExtraDetails({...extraDetails, address: e.target.value})}
                          placeholder="Client's full address"
                          className="w-full mt-1.5 px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-bold text-slate-700 text-sm resize-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Private Notes</label>
                        <textarea 
                          rows="3" 
                          value={extraDetails.agentNotes} 
                          onChange={e => setExtraDetails({...extraDetails, agentNotes: e.target.value})}
                          placeholder="Internal notes about this lead..."
                          className="w-full mt-1.5 px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-bold text-slate-700 text-sm resize-none"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* --- DAILY FOLLOW-UP / ACTIVITY LOG --- */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white p-6 md:p-8 rounded-[28px] shadow-sm border border-slate-100">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-gold" /> Daily Follow-Up Log
              </h3>

              {/* Add Follow-Up Form */}
              <div className="bg-slate-50 p-5 rounded-2xl mb-6 border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <Plus className="w-4 h-4 text-primary-blue" />
                  <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Add Today's Update</span>
                </div>
                
                <textarea 
                  rows="3" 
                  value={followUpNote} 
                  onChange={e => setFollowUpNote(e.target.value)}
                  placeholder="What happened today with this client? E.g: Called client, discussed loan terms, asked for income proof documents..."
                  className="w-full px-4 py-3 bg-white border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-medium text-slate-700 text-sm resize-none mb-3"
                />
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <select 
                      value={followUpOutcome} 
                      onChange={e => setFollowUpOutcome(e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-bold text-slate-700 text-sm appearance-none"
                    >
                      {outcomeOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                  <button 
                    onClick={handleAddFollowUp} 
                    disabled={!followUpNote.trim() || isAddingFollowUp}
                    className="bg-primary-blue text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-primary-darkBlue transition disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-primary-blue/20"
                  >
                    {isAddingFollowUp ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isAddingFollowUp ? 'Adding...' : 'Add Entry'}
                  </button>
                </div>
              </div>

              {/* Follow-Up Timeline */}
              {lead.followUps && lead.followUps.length > 0 ? (
                <div className="space-y-0 relative">
                  {/* Timeline line */}
                  <div className="absolute left-[17px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary-blue/30 via-slate-200 to-transparent" />
                  
                  {[...lead.followUps].reverse().map((fu, idx) => (
                    <motion.div 
                      key={fu._id || idx} 
                      initial={{ opacity: 0, x: -10 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      transition={{ delay: idx * 0.05 }}
                      className="relative pl-10 py-4 group"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-2 top-5 w-3.5 h-3.5 rounded-full border-[3px] border-white shadow-sm ring-2 ${idx === 0 ? 'bg-primary-blue ring-primary-blue/30' : 'bg-slate-300 ring-slate-200'}`} />
                      
                      <div className="bg-slate-50/60 group-hover:bg-slate-50 transition p-4 rounded-xl border border-transparent group-hover:border-slate-100">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                            {new Date(fu.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                          <span className="text-[10px] text-slate-300">•</span>
                          <span className="text-[10px] font-bold text-slate-400">
                            {new Date(fu.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${getOutcomeColor(fu.outcome)}`}>
                            {fu.outcome}
                          </span>
                        </div>
                        <p className="text-slate-700 font-medium text-sm leading-relaxed">{fu.note}</p>
                        {fu.addedBy && (
                          <p className="text-[10px] text-slate-300 font-bold mt-2 uppercase">— {fu.addedBy.name || 'Agent'}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Clock className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                  <p className="text-slate-400 font-bold text-sm">No follow-ups yet</p>
                  <p className="text-slate-300 text-xs mt-1">Add your first daily update above</p>
                </div>
              )}
            </motion.div>

          </div>

          {/* ======= RIGHT COLUMN (1/3) — ACTION SIDEBAR ======= */}
          <div className="space-y-6">
            
            {/* Status & Save Card */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-[28px] shadow-xl border border-slate-50 sticky top-24">
              <h3 className="text-base font-black text-slate-900 mb-5 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary-gold" /> Update Status
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Current Status</label>
                  <select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full mt-1.5 px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-bold text-slate-700 text-sm appearance-none"
                  >
                    <option value="Fresh">🔵 Fresh</option>
                    <option value="Contacted">🟡 Contacted</option>
                    <option value="Qualified">🟢 Qualified</option>
                    <option value="Converted">✅ Converted</option>
                    <option value="Rejected">🔴 Rejected</option>
                  </select>
                </div>

                <button 
                  onClick={handleSaveDetails}
                  disabled={isSaving}
                  className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 hover:bg-black transition-all disabled:opacity-60"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSaving ? 'Saving...' : 'Save All Changes'}
                </button>

                <AnimatePresence>
                  {saveMsg && (
                    <motion.p 
                      initial={{ opacity: 0, scale: 0.9 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      exit={{ opacity: 0 }}
                      className="text-center text-xs font-bold text-green-600"
                    >
                      {saveMsg}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Quick Stats Card */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white p-6 rounded-[28px] shadow-sm border border-slate-100">
              <h3 className="text-base font-black text-slate-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-bold uppercase">Total Follow-ups</span>
                  <span className="text-lg font-black text-primary-blue">{lead.followUps?.length || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-bold uppercase">Lead Age</span>
                  <span className="text-lg font-black text-slate-700">
                    {Math.max(1, Math.ceil((Date.now() - new Date(lead.createdAt)) / (1000 * 60 * 60 * 24)))}d
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400 font-bold uppercase">Last Activity</span>
                  <span className="text-xs font-bold text-slate-500">
                    {lead.followUps?.length > 0 
                      ? new Date(lead.followUps[lead.followUps.length - 1].date).toLocaleDateString('en-IN', {day: 'numeric', month: 'short'})
                      : '—'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Lead Source Info */}
            {(lead.utm_source || lead.utm_medium || lead.utm_campaign) && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-[28px] shadow-sm border border-slate-100">
                <h3 className="text-base font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary-gold" /> UTM Source
                </h3>
                <div className="space-y-2 text-xs">
                  {lead.utm_source && <div className="flex justify-between"><span className="text-slate-400 font-bold">Source</span><span className="font-bold text-slate-700">{lead.utm_source}</span></div>}
                  {lead.utm_medium && <div className="flex justify-between"><span className="text-slate-400 font-bold">Medium</span><span className="font-bold text-slate-700">{lead.utm_medium}</span></div>}
                  {lead.utm_campaign && <div className="flex justify-between"><span className="text-slate-400 font-bold">Campaign</span><span className="font-bold text-slate-700">{lead.utm_campaign}</span></div>}
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

/** Reusable info item component */
const InfoItem = ({ icon, label, value, isLink }) => (
  <div className="flex gap-3 items-start">
    <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 flex-shrink-0 mt-0.5">
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{label}</p>
      {isLink ? (
        <a href={isLink} className="text-slate-900 font-bold text-sm hover:text-primary-blue transition truncate block">{value}</a>
      ) : (
        <p className="text-slate-900 font-bold text-sm truncate">{value}</p>
      )}
    </div>
  </div>
);

export default LeadDetails;
