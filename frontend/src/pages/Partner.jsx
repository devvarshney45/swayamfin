import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, TrendingUp, Cpu, Support, FileCheck, CheckCircle2 } from 'lucide-react';

const Partner = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <div className="bg-primary-darkBlue text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/20 to-transparent skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight"
          >
            Become a <span className="text-primary-lightBlue">Swayamfin Partner</span>
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto font-medium opacity-90">
            Join India's fastest growing LSP network. Earn attractive commissions while helping MSMEs access growth capital.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Why Partner With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: TrendingUp, title: 'High Commission', desc: 'Industry-leading payouts on converted disbursements.' },
                { icon: Cpu, title: 'Tech Dashboard', desc: 'Real-time tracking of your leads and commission status.' },
                { icon: Support, title: 'Dedicated RM', desc: 'A dedicated manager to help close your complex cases.' },
                { icon: FileCheck, title: 'Fast Pay-outs', desc: 'Monthly commission cycles with zero delays.' }
              ].map((benefit, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-primary-blue rounded-xl flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">{benefit.title}</h4>
                    <p className="text-slate-500 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-slate-50 p-8 rounded-[32px] border border-slate-100">
               <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                 <Handshake className="text-primary-blue" />
                 Who can join?
               </h3>
               <ul className="space-y-3">
                 {['Individual DSAs', 'Financial Consultants & CAs', 'Real Estate Agents', 'NBFC/MFI Partners'].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                     <CheckCircle2 className="w-5 h-5 text-success-green" />
                     {item}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[48px] shadow-2xl border border-slate-100 relative"
          >
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-success-green text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
              Registration Open
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Register as Partner</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
                <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:bg-white rounded-2xl transition-all outline-none font-medium" placeholder="E.g. Vikram Singh" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Mobile</label>
                  <input type="tel" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:bg-white rounded-2xl transition-all outline-none font-medium" placeholder="+91..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">City</label>
                  <input type="text" className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:bg-white rounded-2xl transition-all outline-none font-medium" placeholder="Your City" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Profession</label>
                <select className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:bg-white rounded-2xl transition-all outline-none font-medium appearance-none">
                  <option>Individual DSA</option>
                  <option>Financial Advisor</option>
                  <option>Chartered Accountant</option>
                  <option>Other</option>
                </select>
              </div>
              <button className="w-full bg-primary-blue hover:bg-primary-darkBlue text-white font-extrabold py-5 rounded-2xl shadow-xl transition-all duration-300">
                Submit Application
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Partner;
