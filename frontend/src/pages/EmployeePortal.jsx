import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PORTAL_KEY = import.meta.env.VITE_EMPLOYEE_PORTAL_KEY || 'swayam@emp2025';
const SESSION_KEY = 'emp_portal_unlocked';

// ─── Loan type display map ────────────────────────────────────────────────────
const LOAN_TYPES = [
  { value: 'home_loan',       label: 'Home Loan' },
  { value: 'lap',             label: 'Loan Against Property (LAP)' },
  { value: 'msme_structured', label: 'MSME / Business Loan' },
  { value: 'supply_chain',    label: 'Supply Chain Finance' },
  { value: 'micro_lap',       label: 'Micro LAP' },
];

const CITIES = ['Agra', 'Mathura', 'Hathras', 'Kosi'];

// ─── Lock Screen ──────────────────────────────────────────────────────────────
const LockScreen = ({ onUnlock }) => {
  const [key, setKey]       = useState('');
  const [error, setError]   = useState('');
  const [shake, setShake]   = useState(false);
  const inputRef            = useRef(null);

  useEffect(() => inputRef.current?.focus(), []);

  const attempt = (e) => {
    e.preventDefault();
    if (key === PORTAL_KEY) {
      sessionStorage.setItem(SESSION_KEY, '1');
      onUnlock();
    } else {
      setError('Access denied. Verify the portal key with your manager.');
      setShake(true);
      setKey('');
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0EA5E9]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <motion.div
          animate={shake ? { x: [0, -12, 12, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0EA5E9] to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#0EA5E9]/30">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Employee Portal</h1>
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mt-1">Swayamfin — Internal Access</p>
          </div>

          {/* Key form */}
          <form onSubmit={attempt} className="space-y-5">
            <div>
              <label className="text-[10px] font-black text-white/50 uppercase tracking-[0.3em] block mb-2">Portal Access Key</label>
              <input
                ref={inputRef}
                type="password"
                value={key}
                onChange={e => { setKey(e.target.value); setError(''); }}
                placeholder="Enter your access key"
                className="w-full bg-white/10 border border-white/15 rounded-xl px-5 py-4 text-white placeholder-white/25 text-sm font-medium focus:outline-none focus:border-[#0EA5E9] focus:bg-white/15 transition-all"
                autoComplete="off"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-rose-400 text-xs font-bold text-center"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-[#0EA5E9] to-indigo-600 hover:from-[#0284c7] hover:to-indigo-700 text-white rounded-xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-[#0EA5E9]/25 transition-all active:scale-[0.98]"
            >
              Unlock Portal
            </button>
          </form>

          <p className="text-center text-white/20 text-[10px] uppercase tracking-widest font-bold mt-8">
            Authorised Personnel Only
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

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

// ─── Lead Form ────────────────────────────────────────────────────────────────
const emptyForm = () => ({
  fullName: '',
  mobile: '',
  alternativeMobile: '',
  loanType: 'msme_structured',
  amount: '',
  city: '',
  pincode: '',
  employeeName: '',
});

const LeadForm = () => {
  const [form, setForm]           = useState(emptyForm());
  const [status, setStatus]       = useState('idle'); // idle | submitting
  const [toast, setToast]         = useState(null);
  const [submissions, setSubmissions] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('emp_submissions') || '[]'); } catch { return []; }
  });

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicant_name: form.fullName.trim(),
          mobile: form.mobile,
          alternate_mobile: form.alternativeMobile || undefined,
          loan_type: form.loanType,
          loan_amount_required: Number(form.amount),
          location_city: form.city,
          pincode: form.pincode || undefined,
          source: 'employee_portal',
          submitted_by: form.employeeName.trim() || 'Employee',
        }),
      });

      if (res.status === 409) {
        setStatus('idle');
        return showToast('Duplicate: This mobile was already submitted within 24 hours.', 'duplicate');
      }
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setStatus('idle');
        return showToast(err.message || 'Server error. Please try again.', 'error');
      }

      const data = await res.json();
      const record = {
        id: Date.now(),
        name: form.fullName,
        mobile: form.mobile,
        city: form.city,
        loanType: form.loanType,
        leadNumber: data.data?.lead_number || '—',
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      };

      const updated = [record, ...submissions].slice(0, 20);
      setSubmissions(updated);
      sessionStorage.setItem('emp_submissions', JSON.stringify(updated));

      // Keep employee name, reset rest
      const empName = form.employeeName;
      setForm({ ...emptyForm(), employeeName: empName });
      setStatus('idle');
      showToast(`Lead submitted! Ref: ${record.leadNumber}`, 'success');
    } catch (err) {
      setStatus('idle');
      showToast('Network error. Check your connection.', 'error');
    }
  };

  const loanLabel = (val) => LOAN_TYPES.find(l => l.value === val)?.label || val;

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#0EA5E9] to-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-sm">S</div>
            <div>
              <p className="font-black text-slate-800 text-sm leading-none">Swayamfin</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold leading-none mt-0.5">Employee Lead Portal</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-4 py-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 text-[10px] font-black uppercase tracking-widest">Internal Access Active</span>
          </div>
          <button
            onClick={() => { sessionStorage.clear(); window.location.reload(); }}
            className="text-xs text-slate-400 hover:text-rose-500 font-bold uppercase tracking-widest transition-colors"
          >
            Lock
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* ── Form Panel ─────────────────────────────────────────── */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Form header */}
            <div className="bg-gradient-to-r from-[#0f172a] to-[#1e3a5f] px-8 py-6">
              <h2 className="text-xl font-black text-white tracking-tight">Submit New Lead</h2>
              <p className="text-white/50 text-xs font-semibold mt-1">No OTP required — for local clients without email</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Employee name */}
              <div className="bg-[#0EA5E9]/5 border border-[#0EA5E9]/20 rounded-2xl p-4">
                <Label>Your Name (Employee)</Label>
                <Input
                  placeholder="e.g. Ravi Kumar"
                  value={form.employeeName}
                  onChange={v => set('employeeName', v)}
                  required
                />
              </div>

              <div className="h-px bg-slate-100" />

              {/* Client details */}
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Client Details</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label>Full Name *</Label>
                  <Input placeholder="Client's full name" value={form.fullName} onChange={v => set('fullName', v)} required />
                </div>
                <div>
                  <Label>Mobile Number *</Label>
                  <input
                    type="tel"
                    required
                    maxLength="10"
                    placeholder="10-digit mobile"
                    value={form.mobile}
                    onChange={e => set('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className={`w-full border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#0EA5E9] transition-all ${
                      form.mobile && form.mobile.length !== 10
                        ? 'border-rose-300 bg-rose-50'
                        : 'border-slate-200 bg-white'
                    }`}
                  />
                  {form.mobile && form.mobile.length !== 10 && (
                    <p className="text-rose-500 text-[10px] font-bold mt-1">Must be 10 digits</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label>Alternative Mobile</Label>
                  <input
                    type="tel"
                    maxLength="10"
                    placeholder="Optional"
                    value={form.alternativeMobile}
                    onChange={e => set('alternativeMobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#0EA5E9] transition-all"
                  />
                </div>
                <div>
                  <Label>Pincode</Label>
                  <input
                    type="text"
                    maxLength="6"
                    placeholder="Optional"
                    value={form.pincode}
                    onChange={e => set('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#0EA5E9] transition-all"
                  />
                </div>
              </div>

              <div className="h-px bg-slate-100" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Loan Details</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <Label>Loan Type *</Label>
                  <select
                    required
                    value={form.loanType}
                    onChange={e => set('loanType', e.target.value)}
                    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#0EA5E9] transition-all appearance-none cursor-pointer"
                  >
                    {LOAN_TYPES.map(lt => (
                      <option key={lt.value} value={lt.value}>{lt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Loan Amount (₹) *</Label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 500000"
                    value={form.amount}
                    onChange={e => set('amount', e.target.value)}
                    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#0EA5E9] transition-all"
                  />
                  {form.amount && Number(form.amount) > 0 && (
                    <p className="text-slate-400 text-[10px] font-semibold mt-1 ml-1">
                      ₹{Number(form.amount).toLocaleString('en-IN')}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label>Branch City *</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CITIES.map(city => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => set('city', city)}
                      className={`py-3 rounded-xl text-sm font-black uppercase tracking-widest border-2 transition-all ${
                        form.city === city
                          ? 'border-[#0EA5E9] bg-[#0EA5E9]/10 text-[#0EA5E9]'
                          : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
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
                className="w-full h-14 bg-gradient-to-r from-[#0EA5E9] to-indigo-600 hover:from-[#0284c7] hover:to-indigo-700 disabled:opacity-60 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-lg shadow-[#0EA5E9]/25 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {status === 'submitting' ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Submitting Lead...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    Submit Lead
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ── Recent Submissions ──────────────────────────────────── */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-black text-slate-800 text-sm">Today's Submissions</h3>
              <span className="bg-[#0EA5E9]/10 text-[#0EA5E9] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {submissions.length} leads
              </span>
            </div>

            <div className="divide-y divide-slate-50 max-h-[calc(100vh-220px)] overflow-y-auto">
              {submissions.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">No submissions yet</p>
                  <p className="text-slate-300 text-[10px] mt-1">Submit your first lead</p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {submissions.map((s) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="px-6 py-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-black text-slate-800 text-sm truncate">{s.name}</p>
                          <p className="text-slate-400 text-xs font-semibold">{s.mobile}</p>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className="bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                              {s.city}
                            </span>
                            <span className="bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                              {LOAN_TYPES.find(l => l.value === s.loanType)?.label.split(' ')[0] || s.loanType}
                            </span>
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-[10px] font-black text-[#0EA5E9] bg-[#0EA5E9]/10 px-2 py-1 rounded-lg whitespace-nowrap">{s.leadNumber}</p>
                          <p className="text-slate-300 text-[9px] font-semibold mt-1">{s.time}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {submissions.length > 0 && (
              <div className="px-6 py-4 border-t border-slate-50">
                <button
                  onClick={() => {
                    setSubmissions([]);
                    sessionStorage.removeItem('emp_submissions');
                  }}
                  className="w-full text-[10px] text-slate-400 hover:text-rose-500 font-black uppercase tracking-widest transition-colors"
                >
                  Clear Session History
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
  <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-2">{children}</p>
);

const Input = ({ placeholder, value, onChange, required }) => (
  <input
    type="text"
    required={required}
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#0EA5E9] transition-all"
  />
);

// ─── Root: Gate + Portal ──────────────────────────────────────────────────────
const EmployeePortal = () => {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === '1'
  );

  return unlocked ? <LeadForm /> : <LockScreen onUnlock={() => setUnlocked(true)} />;
};

export default EmployeePortal;
