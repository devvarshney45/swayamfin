import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/auth/login`, {
        email,
        password
      });
      
      login(response.data.user, response.data.token);
      
      // Redirect based on role
      const role = response.data.user.role;
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'bsm') navigate('/bsm/dashboard');
      else if (role === 'hr') navigate('/hr/dashboard');
      else navigate('/agent/dashboard');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-800'} flex items-center justify-center font-inter p-4 transition-colors duration-300`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${isDark ? 'bg-blue-600/10' : 'bg-blue-600/5'} blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] ${isDark ? 'bg-indigo-600/10' : 'bg-indigo-600/5'} blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2`} />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-2xl'} w-full max-w-xl rounded-[48px] border p-8 md:p-12 relative backdrop-blur-xl transition-all shadow-xl`}
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] border border-blue-500/20 mb-4">
             <ShieldCheck className="w-3 h-3" /> Secure Access
          </div>
          <h1 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>Portal <span className="text-blue-600">Login</span></h1>
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-xs font-bold uppercase tracking-widest mt-2`}>Enter your professional credentials</p>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-4 rounded-2xl mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-widest"
            >
              <AlertCircle className="w-4 h-4" /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Work Email</label>
            <div className="relative group">
              <Mail className={`absolute left-4 top-4 w-5 h-5 ${isDark ? 'text-slate-500 group-focus-within:text-blue-500' : 'text-slate-400 group-focus-within:text-blue-600'} transition-colors`} />
              <input 
                type="email" 
                required
                placeholder="name@swayamfin.com"
                className={`w-full ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} pl-12 pr-6 py-4 rounded-2xl outline-none border focus:border-blue-500 transition-all font-bold text-sm`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
            <div className="relative group">
              <Lock className={`absolute left-4 top-4 w-5 h-5 ${isDark ? 'text-slate-500 group-focus-within:text-blue-500' : 'text-slate-400 group-focus-within:text-blue-600'} transition-colors`} />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className={`w-full ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'} pl-12 pr-6 py-4 rounded-2xl outline-none border focus:border-blue-500 transition-all font-bold text-sm`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-blue-500/30 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Sign In to Dashboard <ArrowRight className="w-4 h-4" /></>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
           <p className={`text-[10px] ${isDark ? 'text-slate-500' : 'text-slate-400'} font-black uppercase tracking-widest mb-6`}>Secure Infrastructure Provided By</p>
           <div className="flex justify-center items-center gap-6 opacity-30 grayscale hover:grayscale-0 transition-all cursor-default">
              <span className="font-playfair font-black text-lg">Swayamfin</span>
              <span className="font-black text-sm uppercase">Enterprises</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
