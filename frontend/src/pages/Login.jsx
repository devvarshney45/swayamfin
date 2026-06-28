import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://swayamfin.onrender.com' : 'http://localhost:5001');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorDetails, setErrorDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      const { token, user } = response.data;
      setAuth(user, token);
      
      const role = response.data.user.role;
      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'bsm') navigate('/bsm/dashboard');
      else navigate('/agent/dashboard');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Access Denied. Node link fractured.');
      setErrorDetails(err.response?.data?.details || '');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] flex flex-col items-center justify-center py-16 md:py-24 px-4 relative overflow-hidden font-plus-jakarta-sans">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0EA5E9]/5 blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#1E293B]/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-100 w-full max-w-lg rounded-[48px] p-10 md:p-14 shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 rounded-full -mr-16 -mt-16" />
        
        <div className="text-center mb-12">
           <h1 className="text-4xl md:text-5xl font-black text-[#1E293B] uppercase tracking-tighter leading-none mb-4">
              Partner <span className="text-[#0EA5E9] italic">Login.</span>
           </h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="p-5 bg-rose-50 text-rose-600 border border-rose-100 rounded-[28px] text-[10px] font-black uppercase tracking-widest text-center shadow-inner"
              >
                <div>{error}</div>
                {errorDetails && <div className="mt-2 opacity-60 font-medium normal-case text-[8px] tracking-normal">{errorDetails}</div>}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1">Email</label>
              <input 
                type="email" autoComplete="email" required
                className="input-standard w-full h-16 rounded-[28px] px-8 text-sm"
                placeholder="name@swayamfin.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between px-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Password</label>
                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-[9px] font-black text-[#0EA5E9] uppercase tracking-widest">
                    {showPassword ? 'Hide Password' : 'Show Password'}
                 </button>
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} autoComplete="current-password" required
                className="input-standard w-full h-16 rounded-[28px] px-8 text-sm"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full h-20 bg-[#1E293B] hover:bg-[#0EA5E9] text-white rounded-[32px] font-black uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-4 text-xs"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

      </motion.div>
    </div>
  );
};

export default Login;
