import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LeadCaptureModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    loanType: 'home_loan',
    amount: '',
    city: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, duplicate, error
  const [mobileError, setMobileError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMobileError('');
    if (formData.mobile.length !== 10) {
      setMobileError('Please enter a valid 10-digit mobile number.');
      return;
    }
    
    setStatus('submitting');
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicant_name: formData.fullName,
          mobile: formData.mobile,
          email: formData.email,
          loan_type: formData.loanType,
          loan_amount_required: Number(formData.amount),
          location_city: formData.city,
          source: 'website'
        })
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          setStatus('idle');
          setFormData({ fullName: '', mobile: '', email: '', loanType: 'home_loan', amount: '', city: '' });
          onClose();
        }, 2000);
      } else if (response.status === 409) {
        setStatus('duplicate');
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[16px] shadow-2xl p-8 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-xl"
            >
              ✕
            </button>

            {status === 'success' ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Success!</h3>
                <p className="text-slate-600">Our expert will call you within 30 minutes!</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 uppercase tracking-tight">Start Application</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                      <input 
                        required
                        type="text"
                        className="input-standard h-10 px-4 rounded-lg"
                        placeholder="Legal Name"
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mobile Number</label>
                      <input 
                        required
                        type="tel"
                        className="input-standard h-10 px-4 rounded-lg"
                        placeholder="10 digit mobile"
                        maxLength="10"
                        value={formData.mobile}
                        onChange={e => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '')})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email"
                      className="input-standard h-10 px-4 rounded-lg"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Loan Type</label>
                      <select 
                        className="input-standard h-10 px-4 rounded-lg appearance-none cursor-pointer"
                        value={formData.loanType}
                        onChange={e => setFormData({...formData, loanType: e.target.value})}
                      >
                        <option value="home_loan">Home Loan</option>
                        <option value="lap">LAP</option>
                        <option value="msme_structured">MSME Loan</option>
                        <option value="supply_chain">Supply Chain</option>
                        <option value="micro_lap">Micro LAP</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Amount (₹)</label>
                      <input 
                        required
                        type="number"
                        className="input-standard h-10 px-4 rounded-lg"
                        placeholder="e.g. 500000"
                        value={formData.amount}
                        onChange={e => setFormData({...formData, amount: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Branch Hub (City)</label>
                    <select 
                      required
                      className="input-standard h-10 px-4 rounded-lg appearance-none cursor-pointer"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                    >
                      <option value="">Select Your City</option>
                      <option value="Agra">Agra</option>
                      <option value="Mathura">Mathura</option>
                      <option value="Hathras">Hathras</option>
                      <option value="Kosi">Kosi</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full btn-primary h-12 mt-4 uppercase tracking-[0.2em] text-[10px]"
                  >
                    {status === 'submitting' ? 'Processing...' : 'Initialize Application'}
                  </button>

                  {status === 'duplicate' && <p className="text-[10px] text-amber-600 text-center font-bold">Duplicate entry detected.</p>}
                  {status === 'error' && <p className="text-[10px] text-red-600 text-center font-bold">Transmission failed. Try again.</p>}
                  {mobileError && <p className="text-[10px] text-red-600 text-center font-bold">{mobileError}</p>}
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadCaptureModal;
