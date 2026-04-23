import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { ShieldCheck, Sparkles, Award, Globe, Building2, Zap, Cpu, Activity, Shield } from 'lucide-react';

const PartnerNBFCs = () => {
  const { isDark } = useTheme();

  const partners = [
    { name: 'DMI Housing Finance', code: 'PRT-HFC-01', desc: 'Strategic HFC Protocol' },
    { name: 'Aditya Birla Capital', code: 'PRT-CON-02', desc: 'Conglomerate Liquidity' },
    { name: 'Tata Capital', code: 'PRT-INS-03', desc: 'Institutional Framework' },
    { name: 'Bajaj Finserv', code: 'PRT-RT-04', desc: 'Retail Scaling Hub' },
    { name: 'L&T Finance', code: 'PRT-INF-05', desc: 'Infrastructure Capital' },
    { name: 'Mahindra Finance', code: 'PRT-RR-06', desc: 'Regional Expansion' },
    { name: 'Kotak Mahindra Bank', code: 'PRT-BNK-07', desc: 'Core Banking Uplink' },
    { name: 'HDFC Bank', code: 'PRT-MORT-08', desc: 'Global Mortgage Core' },
    { name: 'Piramal Finance', code: 'PRT-DIV-09', desc: 'Diversified Assets' },
    { name: 'Chola MS', code: 'PRT-INS-10', desc: 'Risk Mitigation V1' },
    { name: 'Vivriti Capital', code: 'PRT-MID-11', desc: 'Enterprise Catalyst' },
    { name: 'Northern Arc', code: 'PRT-DEBT-12', desc: 'Market Entry Point' }
  ];

  return (
    <section className={`py-32 md:py-48 ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} relative overflow-hidden transition-colors duration-700`}>
      {/* Institutional Background Architecture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-[800px] h-[800px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/3'} blur-[150px] rounded-full translate-x-1/3 -translate-y-1/2`} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] ${isDark ? 'bg-primary-gold/5' : 'bg-primary-gold/2'} blur-[120px] rounded-full -translate-x-1/3 translate-y-1/2`} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-24 md:mb-32">
          <div className="max-w-3xl space-y-10 text-center md:text-left">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border text-blue-600 text-[10px] font-black uppercase tracking-[0.4em]`}
             >
               <Cpu className="w-4 h-4 text-primary-gold" /> Lender Network Protocol
             </motion.div>
             
             <h2 className={`text-5xl md:text-8xl font-playfair font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tighter leading-[0.9]`}>
               Strategic <br /> <span className="text-blue-600 italic">Financial</span> Infrastructure
             </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center md:items-end gap-5 italic"
          >
             <div className="flex gap-2">
                {[1,2,3,4].map(i => <div key={i} className="w-10 h-1.5 bg-blue-600 rounded-full" style={{ opacity: i * 0.2 }} />)}
             </div>
             <p className={`text-[10px] md:text-xs font-black uppercase tracking-[0.4em] ${isDark ? 'text-slate-500' : 'text-slate-400'} text-center md:text-right max-w-xs leading-relaxed`}>
               Validated RBI-Compliant Partnership Ecosystem
             </p>
          </motion.div>
        </div>
          
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
           {partners.map((partner, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.05, duration: 0.8 }}
               whileHover={{ y: -12 }}
               className={`group relative p-10 md:p-14 rounded-[56px] border transition-all duration-700 ${
                 isDark 
                   ? 'bg-[#0B1221]/40 border-white/5 hover:bg-[#0B1221]/80 hover:border-blue-600/30' 
                   : 'bg-white border-slate-100 shadow-22xl shadow-slate-200/30 hover:border-blue-400'
               }`}
             >
               {/* High-Contrast Interactive Depth */}
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[56px]" />
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-1000" />
               
               <div className="relative z-10 flex flex-col items-start space-y-10">
                 <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[22px] flex items-center justify-center transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-12 ${
                   isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-50 text-slate-500'
                 } border border-white/5`}>
                    {idx % 3 === 0 ? <Building2 className="w-6 h-6 md:w-7 md:h-7 group-hover:text-blue-600" /> : 
                     idx % 3 === 1 ? <Shield className="w-6 h-6 md:w-7 md:h-7 group-hover:text-primary-gold" /> :
                     <Activity className="w-6 h-6 md:w-7 md:h-7 group-hover:text-emerald-500" />}
                 </div>
                 
                 <div className="space-y-4">
                    <h4 className={`text-base md:text-xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} uppercase tracking-tight leading-tight group-hover:text-blue-600 transition-colors duration-500`}>
                      {partner.name}
                    </h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.3em] opacity-60 leading-relaxed italic pr-4">
                      {partner.desc}
                    </p>
                 </div>

                 <div className="pt-8 border-t border-white/5 w-full flex items-center justify-between">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{partner.code}</span>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" />
                       <span className="text-[7px] font-black text-emerald-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500">Live</span>
                    </div>
                 </div>
               </div>
             </motion.div>
           ))}
        </div>

        {/* Institutional Regulatory Protocol Disclosure */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className={`mt-32 p-10 md:p-14 rounded-[48px] ${isDark ? 'bg-white/2 border-white/5' : 'bg-slate-100 border-slate-200'} border flex flex-col md:flex-row items-center justify-between gap-10`}
        >
           <div className="flex items-center gap-8 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center shrink-0 mx-auto md:mx-0">
                 <ShieldCheck className="w-8 h-8 text-blue-600" />
              </div>
              <div className="space-y-1">
                 <h5 className={`text-sm font-black uppercase tracking-[0.3em] ${isDark ? 'text-white' : 'text-[#020617]'}`}>Strategic Governance</h5>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] opacity-60">Verified RBI Complaint Ecosystem • ISO 9001:2015 Standards</p>
              </div>
           </div>
           <div className="flex gap-1">
              {[1,2,3,4,5,6].map(i => <div key={i} className={`w-8 h-8 rounded-lg ${isDark ? 'bg-white/5' : 'bg-white shadow-sm'} border border-white/5`} />)}
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerNBFCs;
