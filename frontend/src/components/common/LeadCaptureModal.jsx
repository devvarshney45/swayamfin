import React, { useState, useEffect } from 'react';
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
  const [formError, setFormError] = useState('');
  const [step, setStep] = useState('form');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpCountdown, setOtpCountdown] = useState(0);

  useEffect(() => {
    if (!otpCountdown) return;
    const timer = setInterval(() => {
      setOtpCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [otpCountdown]);

  const resetForm = () => {
    setFormData({ fullName: '', mobile: '', email: '', loanType: 'home_loan', amount: '', city: '' });
    setStatus('idle');
    setFormError('');
    setOtp('');
    setOtpError('');
    setStep('form');
    setOtpCountdown(0);
  };

  const handleSendOtp = async () => {
    setFormError('');
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormError('Please enter a valid email address.');
      return false;
    }
    if (formData.mobile.length !== 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
      return false;
    }

    setStatus('submitting');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });

      if (response.ok) {
        setStep('otp');
        setStatus('idle');
        setOtpCountdown(120);
        return true;
      }

      const error = await response.json();
      setStatus('error');
      setFormError(error.message || 'Failed to send OTP');
      return false;
    } catch (err) {
      setStatus('error');
      setFormError('Failed to send OTP');
      return false;
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setOtpError('Please enter the 6-digit OTP.');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/leads/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp,
          leadData: {
            applicant_name: formData.fullName,
            mobile: formData.mobile,
            email: formData.email,
            loan_type: formData.loanType,
            loan_amount_required: Number(formData.amount),
            location_city: formData.city,
            source: 'website'
          }
        })
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          resetForm();
          onClose();
        }, 2000);
        return;
      }

      if (response.status === 409) {
        setStatus('duplicate');
        return;
      }

      const error = await response.json();
      setStatus('error');
      setOtpError(error.message || 'Invalid OTP');
    } catch (err) {
      setStatus('error');
      setOtpError('Failed to verify OTP');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setOtpError('');

    if (step === 'form') {
      await handleSendOtp();
      return;
    }

    if (step === 'otp') {
      await handleVerifyOtp();
    }
  };

  const handleResendOtp = async () => {
    if (otpCountdown > 0) return;
    await handleSendOtp();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => { resetForm(); onClose(); }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-[16px] shadow-2xl p-8 overflow-hidden"
          >
            <button 
              onClick={() => { resetForm(); onClose(); }}
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
                <p className="text-slate-600">Your lead is verified and submitted successfully.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-slate-900 mb-8 uppercase tracking-tighter">Submit <span className="text-primary italic">Information.</span></h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {step === 'form' ? (
                    <>
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
                          required
                          type="email"
                          className="input-standard h-10 px-4 rounded-lg"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Requirement Type</label>
                          <select 
                            className="input-standard h-10 px-4 rounded-lg appearance-none cursor-pointer"
                            value={formData.loanType}
                            onChange={e => setFormData({...formData, loanType: e.target.value})}
                          >
                            <option value="Home Loan">Home Loan</option>
                            <option value="Loan Against Property">Loan Against Property</option>
                            <option value="Unsecured Business Loan">Unsecured Business Loan</option>
                            <option value="Supply Chain Finance">Supply Chain Finance</option>
                            <option value="Unsecured Export Finance">Unsecured Export Finance</option>
                            <option value="Machinery Finance">Machinery Finance</option>
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
                        {status === 'submitting' ? 'Submitting...' : 'Submit'}
                      </button>

                      {status === 'duplicate' && <p className="text-[10px] text-amber-600 text-center font-bold">Duplicate entry detected.</p>}
                      {status === 'error' && <p className="text-[10px] text-red-600 text-center font-bold">{formError || 'Transmission failed. Try again.'}</p>}
                      {formError && <p className="text-[10px] text-red-600 text-center font-bold">{formError}</p>}
                    </>
                  ) : (
                    <>
                      <div className="text-center space-y-4">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Verify Your Email</h3>
                        <p className="text-slate-500 text-sm">Enter the 6-digit OTP sent to {formData.email}</p>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">OTP</label>
                        <input
                          required
                          type="text"
                          maxLength="6"
                          className="input-standard h-10 px-4 rounded-lg"
                          placeholder="000000"
                          value={otp}
                          onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <button 
                          type="submit"
                          disabled={status === 'submitting'}
                          className="flex-1 btn-primary h-12 uppercase tracking-[0.2em] text-[10px]"
                        >
                          {status === 'submitting' ? 'Verifying...' : 'Verify & Submit'}
                        </button>
                        <button
                          type="button"
                          disabled={otpCountdown > 0 || status === 'submitting'}
                          onClick={handleResendOtp}
                          className="flex-1 h-12 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold uppercase tracking-[0.2em] text-[10px] transition-all disabled:opacity-50"
                        >
                          {otpCountdown > 0 ? `Resend in ${otpCountdown}s` : 'Resend OTP'}
                        </button>
                      </div>

                      {status === 'duplicate' && <p className="text-[10px] text-amber-600 text-center font-bold">Duplicate entry detected.</p>}
                      {status === 'error' && <p className="text-[10px] text-red-600 text-center font-bold">{otpError || 'Invalid OTP'}</p>}
                      {otpError && <p className="text-[10px] text-red-600 text-center font-bold">{otpError}</p>}

                      <button 
                        type="button"
                        onClick={() => { setStep('form'); setOtp(''); setOtpError(''); setStatus('idle'); setFormError(''); }}
                        className="w-full h-12 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg font-bold uppercase tracking-[0.2em] text-[10px] transition-all"
                      >
                        Back to Form
                      </button>
                    </>
                  )}
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
