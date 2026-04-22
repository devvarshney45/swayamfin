import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Phone, MapPin, Briefcase, IndianRupee, Save, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const NewLead = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    applicant_name: '',
    mobile: '',
    location_city: '',
    loan_type: 'home_loan',
    loan_amount_required: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      alert(err.response?.data?.message || 'Failed to create lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${isDark ? 'bg-[#0B0F19] text-slate-200' : 'bg-slate-50 text-slate-900'} min-h-screen pb-20 font-inter transition-colors duration-300`}>
      <div className="max-w-3xl mx-auto px-4 pt-10">
        <button onClick={() => navigate(-1)} className={`flex items-center gap-2 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'} font-medium mb-8 transition text-sm`}>
          <ArrowLeft className="w-4 h-4" /> {t('portal_back_dashboard')}
        </button>

        <motion.div 
          initial={{opacity:0, y:20}} 
          animate={{opacity:1, y:0}} 
          className={`${isDark ? 'bg-white/5 border-white/10 shadow-2xl' : 'bg-white border-slate-200 shadow-xl'} backdrop-blur-xl border rounded-[32px] p-8`}
        >
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} mb-2`}>{t('portal_generate_case')}</h1>
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-sm mb-8`}>{t('portal_register_desc')}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('portal_applicant_name')}</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                  <input 
                    required
                    type="text" 
                    placeholder="Full legal name"
                    className={`w-full pl-12 pr-4 py-3.5 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:border-blue-500 rounded-2xl outline-none font-bold text-sm transition-all`}
                    value={formData.applicant_name}
                    onChange={e => setFormData({...formData, applicant_name: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('portal_mobile_number')}</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                  <input 
                    required
                    type="tel" 
                    placeholder="10-digit number"
                    className={`w-full pl-12 pr-4 py-3.5 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:border-blue-500 rounded-2xl outline-none font-bold text-sm transition-all`}
                    value={formData.mobile}
                    onChange={e => setFormData({...formData, mobile: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('portal_city_location')}</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                  <input 
                    required
                    type="text" 
                    placeholder="E.g. Agra"
                    className={`w-full pl-12 pr-4 py-3.5 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:border-blue-500 rounded-2xl outline-none font-bold text-sm transition-all`}
                    value={formData.location_city}
                    onChange={e => setFormData({...formData, location_city: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('portal_loan_type')}</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                  <select 
                    className={`w-full pl-12 pr-4 py-3.5 ${isDark ? 'bg-[#111827] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:border-blue-500 rounded-2xl outline-none font-bold text-sm appearance-none cursor-pointer`}
                    value={formData.loan_type}
                    onChange={e => setFormData({...formData, loan_type: e.target.value})}
                  >
                    <option value="home_loan">Home Loan</option>
                    <option value="micro_lap">Micro LAP</option>
                    <option value="supply_chain">Supply Chain</option>
                    <option value="msme_structured">Structured Loan</option>
                    <option value="lap">Secured (LAP) Loan</option>
                    <option value="unsecured">Unsecured Loan</option>
                    <option value="hybrid">Hybrid Loan</option>
                    <option value="microfinance">Microfinance</option>
                    <option value="machinery_loan">Machinery Loan</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{t('portal_amount_required')}</label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-3.5 w-4 h-4 text-slate-500 home_loan" />
                  <input 
                    required
                    type="number" 
                    placeholder="E.g. 1000000"
                    className={`w-full pl-12 pr-4 py-3.5 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'} focus:border-blue-500 rounded-2xl outline-none font-bold text-sm transition-all`}
                    value={formData.loan_amount_required}
                    onChange={e => setFormData({...formData, loan_amount_required: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 transition-all uppercase tracking-widest text-sm"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {loading ? t('portal_processing') : t('portal_create_assign')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default NewLead;
