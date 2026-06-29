import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import AdminTabs from '../../components/admin/AdminTabs';
import { Mail, Clock, CheckCircle, MessageSquare, RefreshCw, Filter } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://swayamfin-5uzv.onrender.com' : 'http://localhost:5001');

const STATUS_CONFIG = {
  new:     { label: 'New',     color: 'bg-sky-50 text-sky-600 border-sky-200',      dot: 'bg-sky-500',     icon: MessageSquare },
  read:    { label: 'Read',    color: 'bg-amber-50 text-amber-600 border-amber-200', dot: 'bg-amber-400',   icon: Clock },
  replied: { label: 'Replied', color: 'bg-emerald-50 text-emerald-600 border-emerald-200', dot: 'bg-emerald-500', icon: CheckCircle },
};

const AdminQuestions = () => {
  const [questions, setQuestions]     = useState([]);
  const [loading, setLoading]         = useState(true);
  const [filter, setFilter]           = useState('all');
  const [selected, setSelected]       = useState(null);
  const [updating, setUpdating]       = useState(null);
  const [search, setSearch]           = useState('');

  useEffect(() => { fetchQuestions(); }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/questions`);
      setQuestions(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch questions:', err.message);
    } finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      await axios.patch(`${API_URL}/api/questions/${id}/status`, { status });
      setQuestions(prev => prev.map(q => q._id === id ? { ...q, status } : q));
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
    } catch (err) {
      console.error('Failed to update status:', err.message);
    } finally { setUpdating(null); }
  };

  const filtered = questions.filter(q => {
    const matchStatus = filter === 'all' || q.status === filter;
    const matchSearch = q.email.toLowerCase().includes(search.toLowerCase()) ||
                        q.question.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = {
    all: questions.length,
    new: questions.filter(q => q.status === 'new').length,
    read: questions.filter(q => q.status === 'read').length,
    replied: questions.filter(q => q.status === 'replied').length,
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-[#0EA5E9] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Loading Inquiries...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-32">
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <AdminTabs />

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
          <div>
            <h1 className="text-5xl font-black text-[#1E293B] uppercase tracking-tighter leading-none">
              Website <span className="text-[#0EA5E9] italic">Inquiries</span>
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3">
              Footer Form Submissions
            </p>
          </div>
          <button
            onClick={fetchQuestions}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
          >
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { key: 'all',     label: 'Total',    color: 'text-slate-800',   bg: 'bg-white',                  border: 'border-slate-100' },
            { key: 'new',     label: 'New',      color: 'text-sky-600',     bg: 'bg-sky-50',                 border: 'border-sky-100' },
            { key: 'read',    label: 'Read',     color: 'text-amber-600',   bg: 'bg-amber-50',               border: 'border-amber-100' },
            { key: 'replied', label: 'Replied',  color: 'text-emerald-600', bg: 'bg-emerald-50',             border: 'border-emerald-100' },
          ].map(s => (
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              className={`p-6 rounded-3xl border-2 text-left transition-all ${s.bg} ${s.border} ${filter === s.key ? 'shadow-lg scale-[1.02]' : 'opacity-70 hover:opacity-100'}`}
            >
              <p className="text-4xl font-black text-[#1E293B]">{counts[s.key]}</p>
              <p className={`text-[9px] font-black uppercase tracking-[0.3em] mt-1 ${s.color}`}>{s.label}</p>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by email or question..."
            className="w-full sm:w-96 h-12 bg-white border border-slate-100 rounded-2xl px-6 text-sm outline-none focus:border-[#0EA5E9] transition-all shadow-sm font-medium"
          />
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-[32px] border border-slate-100 p-20 text-center">
              <MessageSquare className="w-10 h-10 text-slate-200 mx-auto mb-4" />
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">No Inquiries Found</p>
            </div>
          ) : (
            filtered.map((q, i) => {
              const cfg = STATUS_CONFIG[q.status] || STATUS_CONFIG.new;
              return (
                <motion.div
                  key={q._id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => { setSelected(q); updateStatus(q._id, q.status === 'new' ? 'read' : q.status); }}
                  className="bg-white border border-slate-100 rounded-[24px] p-6 flex flex-col sm:flex-row sm:items-center gap-4 cursor-pointer hover:shadow-md hover:border-slate-200 transition-all group"
                >
                  {/* Status dot */}
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${cfg.dot} ${q.status === 'new' ? 'animate-pulse' : ''}`} />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                      <span className="flex items-center gap-1.5 text-[11px] font-black text-[#0EA5E9]">
                        <Mail className="w-3 h-3" /> {q.email}
                      </span>
                      <span className="text-slate-300 hidden sm:inline">•</span>
                      <span className="text-[9px] font-bold text-slate-400">
                        {new Date(q.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-700 truncate group-hover:text-[#1E293B]">{q.question}</p>
                  </div>

                  {/* Status badge */}
                  <span className={`shrink-0 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[130] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              className="w-full max-w-xl bg-white rounded-[40px] p-10 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-8 pb-6 border-b border-slate-100">
                <div>
                  <h3 className="text-2xl font-black text-[#1E293B] uppercase tracking-tighter">Inquiry Detail</h3>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">
                    {new Date(selected.createdAt).toLocaleString('en-IN', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <button onClick={() => setSelected(null)} className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all text-lg">✕</button>
              </div>

              {/* From */}
              <div className="mb-6 p-4 bg-sky-50 rounded-2xl flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#0EA5E9] shrink-0" />
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">From</p>
                  <a href={`mailto:${selected.email}`} className="text-sm font-black text-[#0EA5E9] hover:underline">{selected.email}</a>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8 p-6 bg-slate-50 rounded-2xl border-l-4 border-[#0EA5E9]">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Question</p>
                <p className="text-base font-medium text-[#1E293B] leading-relaxed">{selected.question}</p>
              </div>

              {/* Status Actions */}
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Update Status</p>
                <div className="flex gap-3 flex-wrap">
                  {['new', 'read', 'replied'].map(s => {
                    const cfg = STATUS_CONFIG[s];
                    const isActive = selected.status === s;
                    return (
                      <button
                        key={s}
                        disabled={updating === selected._id}
                        onClick={() => updateStatus(selected._id, s)}
                        className={`flex-1 py-3 px-4 rounded-2xl text-[9px] font-black uppercase tracking-widest border-2 transition-all ${
                          isActive
                            ? `${cfg.color} border-current shadow-sm`
                            : 'border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600'
                        }`}
                      >
                        {updating === selected._id && isActive ? '...' : cfg.label}
                      </button>
                    );
                  })}
                </div>

                <a
                  href={`mailto:${selected.email}?subject=Re: Your Inquiry - Swayamfin`}
                  className="mt-4 flex items-center justify-center gap-2 w-full h-14 bg-[#1E293B] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#0EA5E9] transition-all"
                  onClick={() => updateStatus(selected._id, 'replied')}
                >
                  <Mail className="w-4 h-4" /> Reply via Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminQuestions;
