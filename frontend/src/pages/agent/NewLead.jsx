import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://swayamfin.onrender.com' : 'http://localhost:5001');

const NewLead = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    applicant_name: '',
    mobile: '',
    location_city: '',
    loan_type: 'home_loan',
    loan_amount_required: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (formData.mobile.length !== 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('swayamfin_token');
      const res = await axios.post(`${API_URL}/api/leads`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        navigate(`/agent/lead/${res.data.data._id}`);
      }
    } catch (err) {
      console.error(err);
      setFormError(err.response?.data?.message || 'Transaction failed. Verify node status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-40">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12 flex items-center justify-between gap-4">
          <button onClick={() => navigate(-1)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#0EA5E9] flex items-center gap-2 transition-all">
             ← Dashboard Repository
          </button>
          <button
            onClick={() => { logout(); navigate('/agent/login'); }}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-[9px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 transition-all"
          >
            Exit Portal
          </button>
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
           className="bg-white border border-slate-100 p-6 md:p-14 rounded-[40px] md:rounded-[48px] shadow-2xl relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#0EA5E9]/5 blur-3xl rounded-full -mr-32 -mt-32" />
           
           <div className="relative z-10 space-y-10">
              <div className="space-y-2">
                 <h1 className="text-3xl font-black text-[#1E293B] uppercase tracking-tighter leading-none">Generate <span className="text-[#0EA5E9] italic">Case.</span></h1>
                 <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest italic opacity-70">Strategic Onboarding Interface</p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="md:col-span-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 mb-2 block">Applicant Identity</label>
                    <input 
                      required type="text"
                      className="input-standard w-full h-16 rounded-2xl px-8 text-sm"
                      placeholder="Full Legal Name"
                      value={formData.applicant_name}
                      onChange={e => setFormData({...formData, applicant_name: e.target.value})}
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 mb-2 block">Mobile Node</label>
                    <input 
                      required type="tel" maxLength="10"
                      className="input-standard w-full h-16 rounded-2xl px-8 text-sm"
                      placeholder="10-digit link"
                      value={formData.mobile}
                      onChange={e => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '')})}
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 mb-2 block">Deployment City</label>
                    <input 
                      required type="text"
                      className="input-standard w-full h-16 rounded-2xl px-8 text-sm"
                      placeholder="E.g. Agra Hub"
                      value={formData.location_city}
                      onChange={e => setFormData({...formData, location_city: e.target.value})}
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 mb-2 block">Asset Classification</label>
                    <select 
                      className="input-standard w-full h-16 rounded-2xl px-8 text-sm appearance-none cursor-pointer"
                      value={formData.loan_type}
                      onChange={e => setFormData({...formData, loan_type: e.target.value})}
                    >
                      <option value="home_loan">Housing Optimization</option>
                      <option value="micro_lap">Micro LAP Assets</option>
                      <option value="supply_chain">Supply Chain Velocity</option>
                      <option value="msme_structured">MSME Growth Credit</option>
                      <option value="lap">Liquidity Against Property</option>
                    </select>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-1 mb-2 block">Required Liquidity</label>
                    <div className="relative">
                       <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                       <input 
                        required type="number"
                        className="input-standard w-full h-16 rounded-2xl pl-12 pr-8 text-sm"
                        placeholder="1,000,000"
                        value={formData.loan_amount_required}
                        onChange={e => setFormData({...formData, loan_amount_required: e.target.value})}
                       />
                    </div>
                 </div>

                 <div className="md:col-span-2 pt-6">
                    <button 
                      disabled={loading}
                      className="w-full btn-primary h-16 rounded-2xl text-[10px] uppercase tracking-[0.4em] shadow-2xl flex items-center justify-center gap-3"
                    >
                       {loading ? 'Transmitting Node...' : 'Initialize Asset Case'}
                    </button>
                    {formError && <p className="text-center text-[10px] font-black text-red-600 uppercase tracking-widest mt-4">{formError}</p>}
                    <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-6 italic">Secure transmission via institutional API</p>
                 </div>
              </form>
           </div>
        </motion.div>

      </div>
    </div>
  );
};

export default NewLead;
