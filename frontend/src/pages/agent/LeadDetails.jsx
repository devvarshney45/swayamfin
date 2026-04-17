import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  AlertCircle
} from 'lucide-react';
import axios from 'axios';

const LeadDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchLead();
  }, [id]);

  const fetchLead = async () => {
    try {
      const token = localStorage.getItem('swayamfin_token');
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/leads/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLead(res.data);
      setStatus(res.data.status);
      setNotes(res.data.notes || '');
      setLoading(false);
    } catch (err) {
      console.error('Error fetching lead');
    }
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('swayamfin_token');
      await axios.put(`${import.meta.env.VITE_API_URL}/api/leads/${id}/status`, 
        { status, agentNotes: notes }, // Standardized key to agentNotes
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsSaving(false);
      fetchLead(); // Refresh timeline
    } catch (err) {
      console.error('Error updating lead');
      setIsSaving(false);
    }
  };

  if (loading) return <div className="p-20 text-center animate-pulse font-bold text-slate-400">Loading lead profile...</div>;

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-primary-blue transition">
          <ArrowLeft className="w-4 h-4" /> Back to List
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                   <h1 className="text-3xl font-black text-slate-900">{lead.fullName}</h1>
                   <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Lead ID: {lead._id.slice(-6)}</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                  lead.status === 'converted' ? 'bg-green-100 text-green-700' : 
                  lead.status === 'lost' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {lead.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase">Mobile</p>
                    <a href={`tel:${lead.mobile}`} className="text-slate-900 font-bold hover:text-primary-blue">{lead.mobile}</a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase">City</p>
                    <p className="text-slate-900 font-bold">{lead.city}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase">Loan Type</p>
                    <p className="text-slate-900 font-bold">{lead.loanType}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase">Created</p>
                    <p className="text-slate-900 font-bold">{new Date(lead.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50 flex gap-3">
                 <a href={`tel:${lead.mobile}`} className="flex-1 bg-primary-blue text-white py-4 rounded-2xl font-black shadow-lg shadow-primary-blue/20 flex items-center justify-center gap-2 hover:bg-primary-darkBlue transition">
                    <Phone className="w-5 h-5 fill-current" /> CLICK TO CALL
                 </a>
                 <a href={`https://wa.me/91${lead.mobile}`} className="flex-1 bg-success-green text-white py-4 rounded-2xl font-black shadow-lg shadow-success-green/20 flex items-center justify-center gap-2 hover:opacity-90 transition">
                    <MessageSquare className="w-5 h-5 fill-current" /> WHATSAPP
                 </a>
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
              <h3 className="text-xl font-black text-slate-900 mb-8">Activity History</h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-100 before:z-0">
                <div className="relative pl-10 z-10">
                  <div className="absolute left-2 top-1 w-4 h-4 bg-primary-blue rounded-full border-4 border-white shadow-sm ring-1 ring-primary-blue/20" />
                  <p className="text-xs font-black text-slate-400 uppercase">{new Date().toLocaleString()}</p>
                  <p className="text-slate-700 font-bold mt-1">Lead currently in <span className="text-primary-blue underline decoration-2">{lead.status}</span> stage.</p>
                </div>
                <div className="relative pl-10 z-10 opacity-50">
                  <div className="absolute left-2 top-1 w-4 h-4 bg-slate-200 rounded-full border-4 border-white" />
                  <p className="text-xs font-black text-slate-400 uppercase">{new Date(lead.createdAt).toLocaleString()}</p>
                  <p className="text-slate-600 font-medium mt-1 uppercase italic text-[10px]">Lead Ingested from {lead.utm_source || 'Direct Website'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[32px] shadow-xl border border-slate-50 sticky top-24">
               <h3 className="text-lg font-black text-slate-900 mb-6">Update Lead</h3>
               
               <div className="space-y-6">
                 <div>
                   <label className="text-xs font-black text-slate-400 uppercase ml-1">Current Status</label>
                    <select 
                       value={status} 
                       onChange={(e) => setStatus(e.target.value)}
                       className="w-full mt-2 px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-bold text-slate-700 appearance-none"
                    >
                      <option value="Fresh">New Lead</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Converted">Converted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                 </div>

                 <div>
                    <label className="text-xs font-black text-slate-400 uppercase ml-1">Private Notes</label>
                    <textarea 
                      rows="4" 
                      value={notes} 
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add details about your conversation..."
                      className="w-full mt-2 px-4 py-3 bg-slate-50 border-2 border-transparent focus:border-primary-blue rounded-xl outline-none font-bold text-slate-700 text-sm resize-none"
                    />
                 </div>

                 <button 
                  onClick={handleUpdate}
                  disabled={isSaving}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-black shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 hover:bg-black transition-all"
                 >
                   {isSaving ? 'Saving...' : <><Save className="w-5 h-5" /> SAVE PROGRESS</>}
                 </button>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
