import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { getUTMParams } from '../utils/helpers';

// A simple CountUp hook to animate numbers
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return count;
};

const Hero = () => {
  const headlines = [
    { main: "Empowering You for", highlight: "Financial Success", sub: "Fast Loans for Growing Businesses" },
    { main: "Working Capital When", highlight: "You Need It Most", sub: "Apply in 5 Minutes" },
    { main: "Your Dream Home is", highlight: "Closer Than You Think", sub: "Affordable Housing Loans" }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const totalDisbursements = useCountUp(125); // ₹125 Cr+
  const clientsCount = useCountUp(750);
  const loansCount = useCountUp(350);

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    loanType: 'MSME',
    amount: '',
    city: ''
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    try {
      const utms = getUTMParams();
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ...utms })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ fullName: '', mobile: '', loanType: 'MSME', amount: '', city: '' });
      } else if (response.status === 409) {
        setSubmitStatus('duplicate');
      } else {
        console.error('Server error:', data.message);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="relative bg-primary-lightBlue min-h-screen flex items-center justify-center overflow-hidden py-16">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-primary-darkBlue rounded-l-[100px] transform skew-x-12 translate-x-32" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text Side */}
          <motion.div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-primary-darkBlue text-xs font-black uppercase tracking-widest mb-6 shadow-sm ring-1 ring-slate-100">
              <ShieldCheck className="w-4 h-4 text-success-green" />
              RBI Compliant LSP Platform
            </div>
            
            <div className="h-[220px] md:h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIdx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.1]">
                    {headlines[currentIdx].main} <br />
                    <span className="text-primary-blue">{headlines[currentIdx].highlight}</span>.
                  </h1>
                  <p className="text-xl text-gray-600 font-medium">
                    {headlines[currentIdx].sub}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Statistics Bar */}
            <div className="flex gap-8 mt-12 bg-white/50 backdrop-blur-sm p-6 rounded-[32px] inline-flex border border-white/50">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary-darkBlue">₹{totalDisbursements}Cr+</span>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">Disbursed</span>
              </div>
              <div className="w-px bg-slate-200 h-10 self-center"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary-darkBlue">{clientsCount}+</span>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">Happy Clients</span>
              </div>
              <div className="w-px bg-slate-200 h-10 self-center"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-black text-primary-darkBlue">NBFC</span>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">Partners</span>
              </div>
            </div>
          </motion.div>

          {/* Right Form Side */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
             <div className="bg-white p-8 rounded-fintech shadow-fintech w-full max-w-md border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Check Eligibility in Secs</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                    <input 
                      type="tel" 
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="+91"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition"
                      pattern="\d{10}"
                      title="10 digit mobile number"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Loan Type</label>
                      <select 
                        name="loanType"
                        value={formData.loanType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition bg-white"
                      >
                        <option value="MSME">MSME</option>
                        <option value="LAP">LAP</option>
                        <option value="Housing">Housing</option>
                        <option value="Supply Chain Finance">Supply Chain</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                      <input 
                        type="number" 
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="5,00,000"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="e.g. Mumbai"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition"
                      required
                    />
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-3 mb-3 bg-green-50 text-success-green border border-green-200 rounded-lg text-sm text-center font-semibold">
                      Your application was received successfully!
                    </div>
                  )}
                  {submitStatus === 'duplicate' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-700">
                      <AlertCircle className="w-5 h-5" />
                      <p className="text-xs font-bold leading-tight">You've already submitted a request. Our team is already processing it!</p>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-700">
                      <AlertCircle className="w-5 h-5" />
                      <p className="text-xs font-bold">Something went wrong. Please call us directly.</p>
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={submitStatus === 'submitting'}
                    className={`w-full py-3 px-4 text-white font-bold rounded-lg shadow-md transition duration-200 mt-2 ${submitStatus === 'submitting' ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary-blue hover:bg-primary-darkBlue'}`}
                  >
                    {submitStatus === 'submitting' ? 'Applying...' : 'Apply Now'}
                  </motion.button>
                </form>
                <p className="text-xs text-center text-gray-500 mt-4">By applying, you agree to our Terms and Policies.</p>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
