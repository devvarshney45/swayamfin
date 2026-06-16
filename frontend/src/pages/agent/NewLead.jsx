import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://swayamfin.onrender.com' : 'http://localhost:5001');

// ─── Constants ───────────────────────────────────────────────────────────────
const LOAN_TYPES = [
  { value: 'lap',                       label: 'LAP' },
  { value: 'home_loan',                 label: 'House loan' },
  { value: 'unsecured',                 label: 'Unsecure Business Loan' },
  { value: 'supply_chain',              label: 'Supply Chain Finance' },
  { value: 'unsecured_export_finance',  label: 'Unsecure Export Finance' },
  { value: 'machinery_loan',            label: 'Machinery Finance' },
];

const CITIES = ['Agra', 'Mathura', 'Hathras', 'Kosi'];

// ─── Success Toast ────────────────────────────────────────────────────────────
const Toast = ({ message, type = 'success', onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -60, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -60, scale: 0.9 }}
    className={`fixed top-6 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-bold text-sm ${
      type === 'success'
        ? 'bg-emerald-500 text-white'
        : type === 'duplicate'
        ? 'bg-amber-500 text-white'
        : 'bg-rose-500 text-white'
    }`}
  >
    <span className="text-lg">{type === 'success' ? '✓' : type === 'duplicate' ? '⚠' : '✕'}</span>
    <span>{message}</span>
    <button onClick={onClose} className="ml-4 opacity-70 hover:opacity-100 text-lg leading-none">×</button>
  </motion.div>
);

// ─── Main Component ──────────────────────────────────────────────────────────────
const NewLead = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    alternativeMobile: '',
    loanType: 'lap',
    amount: '',
    city: '',
    pincode: '',
    employeeName: user?.full_name || '',
  });

  const [status, setStatus] = useState('idle');
  const [toast, setToast] = useState(null);
  const [submissions, setSubmissions] = useState(() => {
    try { return JSON.parse(localStorage.getItem('agent_recent_leads') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    if (user && !form.employeeName) {
      setForm(prev => ({ ...prev, employeeName: user.full_name }));
    }
  }, [user]);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.mobile.length !== 10) return showToast('Mobile number must be exactly 10 digits.', 'error');
    if (!form.city) return showToast('Please select a branch city.', 'error');
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) return showToast('Please enter a valid loan amount.', 'error');

    setStatus('submitting');
    try {
      const token = localStorage.getItem('swayamfin_token');
      const response = await axios.post(`${API_URL}/api/leads`, {
        applicant_name: form.fullName.trim(),
        mobile: form.mobile,
        alternate_mobile: form.alternativeMobile || undefined,
        loan_type: form.loanType,
        loan_amount_required: Number(form.amount),
        location_city: form.city,
        pincode: form.pincode || undefined,
        source: 'agent_portal',
        submitted_by: form.employeeName.trim() || user?.full_name || 'Agent',
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = response.data;
      const record = {
        _id: data.data?._id,
        applicant_name: form.fullName,
        mobile: form.mobile,
        city: form.city,
        loan_type: form.loanType,
        lead_number: data.data?.lead_number || '—',
        amount: Number(form.amount),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };

      const updated = [record, ...submissions].slice(0, 20);
      setSubmissions(updated);
      localStorage.setItem('agent_recent_leads', JSON.stringify(updated));

      // Reset form but keep agent name
      setForm({
        fullName: '',
        mobile: '',
        alternativeMobile: '',
        loanType: 'lap',
        amount: '',
        city: '',
        pincode: '',
        employeeName: user?.full_name || form.employeeName,
      });
      setStatus('idle');
      showToast(`Lead generated! Ref: ${record.lead_number}`, 'success');
    } catch (err) {
      console.error(err);
      setStatus('idle');
      if (err.response?.status === 409) {
        showToast('Duplicate: This mobile was already submitted within 24 hours.', 'duplicate');
      } else {
        showToast(err.response?.data?.message || 'Network error. Please try again.', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans pt-20">
      {/* Top bar Overlay */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 fixed top-0 left-0 right-0 z-[60] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-xl transition-all mr-2">
                <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
             </button>
             <div className="w-10 h-10 bg-gradient-to-br from-[#0EA5E9] to-indigo-600 rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-200">S</div>
             <div>
               <p className="font-black text-slate-800 text-sm leading-none uppercase tracking-tighter">Swayamfin</p>
               <p className="text-[10px] text-[#0EA5E9] uppercase tracking-widest font-black leading-none mt-1">Generate Case</p>
             </div>
          </div>
          <button
            onClick={() => { logout(); navigate('/agent/login'); }}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-[10px] font-black text-rose-500 uppercase tracking-widest hover:bg-rose-50 transition-all"
          >
            Exit Portal
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10 pt-16 grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* ── Form Panel ─────────────────────────────────────────── */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
            {/* Form header */}
            <div className="bg-gradient-to-r from-[#0f172a] to-[#1e3a5f] px-8 py-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase relative z-10">Strategic <span className="text-[#0EA5E9] italic">Onboarding.</span></h2>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2 relative z-10 opacity-70">Case Initiation Repository</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
              {/* Agent name */}
              <div className="bg-[#0EA5E9]/5 border border-[#0EA5E9]/20 rounded-2xl p-6">
                <Label>Agent / Relationship Manager</Label>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-black text-white">{form.employeeName?.charAt(0)}</div>
                   <input
                    type="text"
                    disabled
                    value={form.employeeName}
                    className="flex-1 bg-transparent border-none text-sm font-black text-slate-700 focus:outline-none"
                   />
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Client details */}
              <p className="text-[11px] font-black text-slate-800 uppercase tracking-[0.3em] flex items-center gap-2">
                 <span className="w-2 h-2 bg-[#0EA5E9] rounded-full" />
                 Client Demographic
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label>Full Legal Name *</Label>
                  <Input placeholder="Applicant Name" value={form.fullName} onChange={v => set('fullName', v)} required />
                </div>
                <div>
                  <Label>Mobile Node *</Label>
                  <input
                    type="tel"
                    required
                    maxLength="10"
                    placeholder="10-digit primary"
                    value={form.mobile}
                    onChange={e => set('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className={`w-full h-14 border rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-[#0EA5E9] transition-all ${
                      form.mobile && form.mobile.length !== 10
                        ? 'border-rose-300 bg-rose-50'
                        : 'border-slate-100 bg-slate-50 focus:bg-white'
                    }`}
                  />
                  {form.mobile && form.mobile.length !== 10 && (
                    <p className="text-rose-500 text-[10px] font-black mt-1 ml-2">MUST BE 10 DIGITS</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label>Alternative Mobile</Label>
                  <input
                    type="tel"
                    maxLength="10"
                    placeholder="Secondary Link"
                    value={form.alternativeMobile}
                    onChange={e => set('alternativeMobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full h-14 border border-slate-100 bg-slate-50 rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <Label>Local Pincode</Label>
                  <input
                    type="text"
                    maxLength="6"
                    placeholder="Area Code"
                    value={form.pincode}
                    onChange={e => set('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full h-14 border border-slate-100 bg-slate-50 rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="h-px bg-slate-100" />
              <p className="text-[11px] font-black text-slate-800 uppercase tracking-[0.3em] flex items-center gap-2">
                 <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                 Asset Definition
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label>Asset Classification *</Label>
                  <div className="relative">
                    <select
                      required
                      value={form.loanType}
                      onChange={e => set('loanType', e.target.value)}
                      className="w-full h-14 border border-slate-100 bg-slate-50 rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-all appearance-none cursor-pointer"
                    >
                      {LOAN_TYPES.map(lt => (
                        <option key={lt.value} value={lt.value}>{lt.label}</option>
                      ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Required Liquidity (₹) *</Label>
                  <div className="relative">
                     <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                     <input
                        type="number"
                        required
                        min="1"
                        placeholder="e.g. 500000"
                        value={form.amount}
                        onChange={e => set('amount', e.target.value)}
                        className="w-full h-14 border border-slate-100 bg-slate-50 rounded-2xl pl-12 pr-6 text-sm font-black focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-all"
                      />
                  </div>
                  {form.amount && Number(form.amount) > 0 && (
                    <p className="text-[#0EA5E9] text-[10px] font-black mt-1 ml-1 uppercase tracking-widest">
                      ₹{Number(form.amount).toLocaleString('en-IN')}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label>Deployment City Hub *</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {CITIES.map(city => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => set('city', city)}
                      className={`py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border-2 transition-all ${
                        form.city === city
                          ? 'border-[#0EA5E9] bg-[#0EA5E9] text-white shadow-lg shadow-blue-100'
                          : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full h-18 bg-[#1E293B] hover:bg-[#0EA5E9] disabled:opacity-60 text-white rounded-3xl font-black uppercase tracking-[0.4em] text-[11px] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-4 group mt-10"
              >
                {status === 'submitting' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Transmitting Node...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    Initialize Asset Case
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ── Recent Submissions ──────────────────────────────────── */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden sticky top-28">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-white">
              <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest">Recent Activity</h3>
              <span className="bg-blue-50 text-[#0EA5E9] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-blue-100">
                {submissions.length} Leads
              </span>
            </div>

            <div className="divide-y divide-slate-50 max-h-[calc(100vh-280px)] overflow-y-auto custom-scrollbar">
              {submissions.length === 0 ? (
                <div className="py-20 text-center px-8">
                  <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-6 border border-slate-100">
                    <svg className="w-8 h-8 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">No active nodes</p>
                  <p className="text-slate-300 text-[9px] font-bold mt-2 uppercase tracking-tighter">Initialize your first lead transmission</p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {submissions.map((s) => (
                    <motion.div
                      key={s._id || s.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="px-8 py-6 bg-white hover:bg-slate-50 transition-colors cursor-pointer group border-l-4 border-transparent hover:border-[#0EA5E9]"
                      onClick={() => s._id && navigate(`/agent/lead/${s._id}`)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="font-black text-slate-800 text-xs uppercase truncate group-hover:text-[#0EA5E9] transition-colors">{s.applicant_name || s.name}</p>
                          <p className="text-slate-400 text-[10px] font-bold mt-0.5">{s.mobile}</p>
                          <div className="flex items-center gap-2 mt-3 flex-wrap">
                            <span className="bg-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg">
                              {s.city}
                            </span>
                            <span className="bg-blue-50 text-blue-600 text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border border-blue-50">
                              {LOAN_TYPES.find(l => l.value === (s.loan_type || s.loanType))?.label || (s.loan_type || s.loanType)}
                            </span>
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-xs font-black text-[#1E293B]">₹{(s.amount/100000).toFixed(1)}L</p>
                          <p className="text-[10px] font-black text-[#0EA5E9] mt-1.5 uppercase tracking-tighter">{s.lead_number || s.leadNumber}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {submissions.length > 0 && (
              <div className="px-8 py-6 border-t border-slate-50 bg-slate-50/50">
                <button
                  onClick={() => {
                    setSubmissions([]);
                    localStorage.removeItem('agent_recent_leads');
                  }}
                  className="w-full text-[10px] text-slate-400 hover:text-rose-500 font-black uppercase tracking-[0.3em] transition-colors"
                >
                  Clear Node History
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Small reusable components ────────────────────────────────────────────────
const Label = ({ children }) => (
  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2 ml-1">{children}</p>
);

const Input = ({ placeholder, value, onChange, required }) => (
  <input
    type="text"
    required={required}
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
    className="w-full h-14 border border-slate-100 bg-slate-50 rounded-2xl px-6 text-sm font-black focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-all shadow-inner shadow-slate-200/20"
  />
);

export default NewLead;
