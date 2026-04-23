import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Mail, Lock, ArrowRight, AlertCircle, Building2, UserCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDark } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_URL}/api/users/login`, { email, password });
      
      const { token, user } = response.data;
      login(user, token);
      
      const role = response.data.user.role;
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'bsm') navigate('/bsm/dashboard');
      else navigate('/agent/dashboard');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Authorization failed. Check your keys.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} min-h-screen flex items-center justify-center p-6 pt-32 relative overflow-hidden transition-colors duration-300 font-inter`}>
      {/* Dynamic Background Elements */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 animate-pulse`} />
      <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] ${isDark ? 'bg-indigo-600/5' : 'bg-indigo-500/5'} blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2`} />

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className={`${isDark ? 'bg-white/2 border-white/5 shadow-22xl shadow-black/80' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'} w-full max-w-xl rounded-[60px] border p-10 md:p-16 relative z-10 overflow-hidden backdrop-blur-xl group transition-all`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
        
        {/* Brand/Identity */}
        <div className="flex flex-col items-center text-center mb-16 relative z-10">
          <div className="relative mb-8">
             <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-30 scale-125" />
             <div className="bg-blue-600 w-20 h-20 rounded-[32px] flex items-center justify-center shadow-2xl shadow-blue-600/30 border border-blue-500/20 relative z-10 hover:rotate-6 transition-transform cursor-pointer">
                <ShieldCheck className="w-10 h-10 text-white" />
             </div>
          </div>
          <h1 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter uppercase mb-2`}>
             Swayamfin <span className="text-blue-600">Access</span>
          </h1>
          <p className={`${isDark ? 'text-slate-500' : 'text-slate-500'} text-[10px] font-black uppercase tracking-[0.4em] italic`}>Unified Multi-Portal Protocol</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8 relative z-10">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="p-5 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-[28px] text-[11px] font-black uppercase tracking-widest flex items-center gap-3 shadow-inner"
              >
                <AlertCircle className="w-5 h-5" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-6">
            <div className="group relative">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Officer Intelligence Email</label>
              <div className="relative">
                <Mail className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500 group-focus-within:text-blue-500' : 'text-slate-400 group-focus-within:text-blue-600'} transition-colors`} />
                <input 
                  type="email" 
                  autoComplete="email"
                  className={`w-full pl-16 pr-6 py-5 rounded-[28px] ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-900 shadow-inner'} border-2 outline-none focus:border-blue-600 transition-all font-bold text-sm`}
                  placeholder="Enter email key..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="group relative">
               <div className="flex justify-between items-center mb-2 px-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Secret Credential</label>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest cursor-pointer hover:underline">Forgot?</span>
               </div>
              <div className="relative">
                <Lock className={`absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-slate-500 group-focus-within:text-blue-500' : 'text-slate-400 group-focus-within:text-blue-600'} transition-colors`} />
                <input 
                  type="password" 
                  autoComplete="current-password"
                  className={`w-full pl-16 pr-6 py-5 rounded-[28px] ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-slate-50 border-slate-100 text-slate-900 shadow-inner'} border-2 outline-none focus:border-blue-600 transition-all font-bold text-sm`}
                  placeholder="Enter secret pass..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group w-full py-6 bg-blue-600 hover:bg-blue-500 text-white rounded-[32px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-blue-600/30 transition-all active:scale-[0.98] transform flex items-center justify-center gap-4 text-xs italic"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Initialize Session <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-all" />
              </>
            )}
          </button>
        </form>

        <div className="mt-12 pt-10 border-t border-white/5 flex items-center justify-between opacity-50 relative z-10 px-4">
           <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-gold" />
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Secure Protocol v3.0</span>
           </div>
           <Building2 className="w-5 h-5 text-slate-500" />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
