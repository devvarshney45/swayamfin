import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { ShieldCheck, Building2, Shield, Activity, Cpu } from 'lucide-react';

const partners = [
  { name: 'DMI Housing Finance', code: 'HFC-01' },
  { name: 'Aditya Birla Capital', code: 'CON-02' },
  { name: 'Tata Capital', code: 'INS-03' },
  { name: 'Bajaj Finserv', code: 'RT-04' },
  { name: 'L&T Finance', code: 'INF-05' },
  { name: 'Mahindra Finance', code: 'RR-06' },
  { name: 'Kotak Mahindra Bank', code: 'BNK-07' },
  { name: 'HDFC Bank', code: 'MORT-08' },
  { name: 'Piramal Finance', code: 'DIV-09' },
  { name: 'Chola MS', code: 'INS-10' },
  { name: 'Vivriti Capital', code: 'MID-11' },
  { name: 'Northern Arc', code: 'DEBT-12' },
];

const ICONS = [Building2, Shield, Activity];

const PartnerNBFCs = () => {
  const { isDark } = useTheme();

  return (
    <section className={`py-16 md:py-24 lg:py-32 ${isDark ? 'bg-[#020617]' : 'bg-white'} relative overflow-hidden transition-colors duration-700`}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/3'} blur-[140px] rounded-full translate-x-1/3 -translate-y-1/2`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10 md:mb-14">
          <div className="space-y-3">
            <div className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-blue-600/10 border-blue-500/20'} border text-blue-600 text-[10px] font-black uppercase tracking-[0.4em]`}>
              <Cpu className="w-3.5 h-3.5 text-primary-gold" /> Lender Network
            </div>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tight font-playfair leading-tight`}>
              Strategic <span className="text-blue-600 italic">Financial</span> Partners
            </h2>
          </div>
          <p className={`text-xs md:text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'} font-bold uppercase tracking-widest max-w-xs text-right`}>
            Validated RBI-Compliant Ecosystem
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {partners.map((partner, idx) => {
            const Icon = ICONS[idx % 3];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className={`group ${isDark ? 'bg-[#0B1221]/60 border-white/10 hover:border-blue-600/30' : 'bg-slate-50 border-slate-100 hover:border-blue-300 hover:bg-white hover:shadow-md'} rounded-2xl p-5 md:p-6 border transition-all duration-400 relative overflow-hidden`}
              >
                <div className={`w-10 h-10 ${isDark ? 'bg-white/5 text-slate-400' : 'bg-white text-slate-400 shadow-sm'} rounded-xl flex items-center justify-center mb-4 border border-white/5 group-hover:text-blue-600 transition-colors`}>
                  <Icon className="w-5 h-5" />
                </div>

                <h4 className={`text-xs md:text-sm font-black ${isDark ? 'text-white' : 'text-[#020617]'} uppercase tracking-tight leading-tight mb-2 group-hover:text-blue-600 transition-colors`}>
                  {partner.name}
                </h4>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{partner.code}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Disclosure bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`mt-10 p-5 md:p-6 rounded-2xl ${isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'} border flex flex-col sm:flex-row items-center gap-4`}
        >
          <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-center sm:text-left">
            <h5 className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-white' : 'text-[#020617]'}`}>Regulatory Compliance</h5>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-60 mt-0.5">Verified RBI Compliant Ecosystem • ISO 9001:2015 Standards</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerNBFCs;
