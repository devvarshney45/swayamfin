import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const EligibilityCalculator = () => {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(60);
  const [tenureType, setTenureType] = useState('Months'); // Months or Years

  const [results, setResults] = useState({
    emi: 0,
    totalInterest: 0,
    totalPayable: 0,
    interestRatio: 0
  });

  const calculateEMI = () => {
    const P = amount;
    const R = rate / 12 / 100;
    const N = tenureType === 'Years' ? tenure * 12 : tenure;
    
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayable = emi * N;
    const totalInterest = totalPayable - P;
    const interestRatio = (totalInterest / totalPayable) * 100;

    setResults({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
      interestRatio: Math.round(interestRatio)
    });
  };

  useEffect(() => {
    calculateEMI();
  }, [amount, rate, tenure, tenureType]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 rounded-full">
            <span className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-[0.4em]">Precision Simulation</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[#1E293B] uppercase tracking-tight">
            EMI & Loan <span className="text-[#0EA5E9] italic">Calculator</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto bg-white border border-slate-100 rounded-[40px] shadow-2xl p-8 md:p-16 grid grid-cols-1 lg:grid-cols-2 gap-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#0EA5E9]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          
          {/* Inputs */}
          <div className="space-y-10 relative z-10">
            {/* Amount */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Loan Amount</label>
                <div className="flex items-end gap-2 border-b-2 border-slate-100 focus-within:border-[#0EA5E9] transition-all">
                  <span className="text-xl font-bold text-slate-400">₹</span>
                  <input 
                    type="number"
                    className="w-32 bg-transparent text-2xl font-black text-[#1E293B] outline-none"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>
              </div>
              <input 
                type="range"
                min="100000"
                max="500000000"
                step="50000"
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0EA5E9]"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>

            {/* Interest */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Interest Rate (% p.a)</label>
                <div className="flex items-end gap-2 border-b-2 border-slate-100 focus-within:border-[#0EA5E9] transition-all">
                  <input 
                    type="number"
                    className="w-16 bg-transparent text-2xl font-black text-[#1E293B] outline-none text-right"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                  />
                   <span className="text-xl font-bold text-slate-400">%</span>
                </div>
              </div>
              <input 
                type="range"
                min="8"
                max="24"
                step="0.1"
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0EA5E9]"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />
            </div>

            {/* Tenure */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Repayment Tenure</label>
                <div className="flex items-center gap-4 bg-slate-50 p-1 rounded-xl border border-slate-200">
                   <button 
                    onClick={() => { setTenureType('Months'); if(tenureType==='Years') setTenure(tenure*12); }}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${tenureType === 'Months' ? 'bg-[#0EA5E9] text-white shadow-lg' : 'text-slate-400'}`}
                   >
                     Months
                   </button>
                   <button 
                    onClick={() => { setTenureType('Years'); if(tenureType==='Months') setTenure(Math.round(tenure/12)); }}
                    className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${tenureType === 'Years' ? 'bg-[#0EA5E9] text-white shadow-lg' : 'text-slate-400'}`}
                   >
                     Years
                   </button>
                </div>
              </div>
              <div className="flex justify-between items-center gap-4">
                 <input 
                  type="range"
                  min={tenureType === 'Years' ? 1 : 6}
                  max={tenureType === 'Years' ? 15 : 180}
                  step="1"
                  className="flex-1 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-[#0EA5E9]"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                />
                <div className="w-16 border-b-2 border-slate-100 text-center text-2xl font-black text-[#1E293B]">
                   {tenure}
                </div>
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="bg-[#F8FAFC] rounded-[32px] p-8 md:p-12 flex flex-col justify-between space-y-12">
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Monthly EMI</p>
               <h3 className="text-5xl md:text-6xl font-black text-[#1E293B] tracking-tighter">{formatCurrency(results.emi)}</h3>
            </div>

            <div className="space-y-8">
              <div className="flex justify-between gap-4">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Interest</p>
                    <p className="text-xl font-bold text-[#1E293B]">{formatCurrency(results.totalInterest)}</p>
                 </div>
                 <div className="space-y-1 text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Payable</p>
                    <p className="text-xl font-bold text-[#1E293B]">{formatCurrency(results.totalPayable)}</p>
                 </div>
              </div>

              {/* Ratio Bar */}
              <div className="space-y-3">
                 <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-400">
                    <span className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-[#0EA5E9]" /> Principal
                    </span>
                    <span className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-slate-300" /> Interest
                    </span>
                 </div>
                 <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                    <div className="h-full bg-[#0EA5E9] shadow-inner" style={{ width: `${100 - results.interestRatio}%` }} />
                    <div className="h-full bg-slate-300" style={{ width: `${results.interestRatio}%` }} />
                 </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
               {/* Disclaimer and submit button removed as per requirements */}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EligibilityCalculator;
