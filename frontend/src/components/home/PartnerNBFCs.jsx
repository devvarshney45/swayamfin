import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { ShieldCheck, Sparkles, Award, Globe, Building2, Zap } from 'lucide-react';

const PartnerNBFCs = () => {
  const { isDark } = useTheme();

  const partners = [
    { name: 'DMI Housing Finance', code: 'DMI', desc: 'Strategic HFC Partner' },
    { name: 'Aditya Birla Capital', code: 'ABC', desc: 'Conglomerate Lending' },
    { name: 'Tata Capital', code: 'TCL', desc: 'Institutional Credit' },
    { name: 'Bajaj Finserv', code: 'BFL', desc: 'Retail & MSME' },
    { name: 'L&T Finance', code: 'LTF', desc: 'Infrastructure & Retail' },
    { name: 'Mahindra Finance', code: 'MMF', desc: 'Rural & Semi-urban' },
    { name: 'Kotak Mahindra Bank', code: 'KMB', desc: 'Banking Partner' },
    { name: 'HDFC Bank', code: 'HDFC', desc: 'Mortgage & Business' },
    { name: 'Piramal Finance', code: 'PFL', desc: 'Diversified Credit' },
    { name: 'Chola MS', code: 'CMS', desc: 'General Insurance' },
    { name: 'Vivriti Capital', code: 'VC', desc: 'Mid-market Specialist' },
    { name: 'Northern Arc', code: 'NAC', desc: 'Debt Facilitation' }
  ];

  return (
    <section className={`py-24 md:py-32 ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} relative overflow-hidden transition-colors duration-300`}>
      {/* Dynamic Background Elements */}
      <div className={`absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[100px] md:blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2`} />
      <div className={`absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] ${isDark ? 'bg-primary-gold/5' : 'bg-primary-gold/5'} blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2`} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'} border text-primary-gold text-[10px] font-black uppercase tracking-[0.3em] mb-8`}
           >
             <ShieldCheck className="w-4 h-4" /> Global Lenders Integration
           </motion.div>
           
           <h2 className={`text-4xl md:text-7xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter mb-8 leading-[1.1]`}>
             Strategic <span className="text-blue-600 italic">Lending</span> <br className="hidden md:block" /> Ecosystem
           </h2>
           
           <p className={`text-[10px] md:text-xs font-black uppercase tracking-[0.4em] ${isDark ? 'text-slate-500' : 'text-slate-500'} opacity-80 max-w-2xl mx-auto leading-relaxed`}>
             Swayamfin facilitates credit through India's premier RBI-registered financial institutions
           </p>
        </div>
          
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
           {partners.map((partner, idx) => (
             <motion.div
               key={idx}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.03 }}
               whileHover={{ y: -8 }}
               className={`group relative p-8 md:p-10 rounded-[40px] border transition-all duration-500 ${
                 isDark 
                   ? 'bg-white/2 border-white/5 hover:bg-white/5 hover:border-blue-500/30 shadow-2xl shadow-black/40' 
                   : 'bg-white border-slate-100 shadow-xl shadow-slate-200/40 hover:border-blue-300'
               }`}
             >
               {/* Decorative Gradient Background */}
               <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[40px]" />
               
               <div className="relative z-10 flex flex-col h-full items-center text-center space-y-6">
                 <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6 ${
                   isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-50 text-slate-500'
                 }`}>
                   {idx % 4 === 0 ? <Building2 className="w-8 h-8 group-hover:text-primary-gold" /> : 
                    idx % 4 === 1 ? <Globe className="w-8 h-8 group-hover:text-blue-500" /> :
                    idx % 4 === 2 ? <Zap className="w-8 h-8 group-hover:text-emerald-500" /> :
                    <Award className="w-8 h-8 group-hover:text-violet-500" />}
                 </div>
                 
                 <div>
                   <h4 className={`text-sm md:text-base font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight mb-2 group-hover:text-blue-500 transition-colors`}>
                     {partner.name}
                   </h4>
                   <div className={`h-px w-8 mx-auto my-3 transition-all duration-500 group-hover:w-16 ${isDark ? 'bg-white/10' : 'bg-slate-200'} group-hover:bg-primary-gold`} />
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest opacity-60 italic">
                     {partner.desc}
                   </p>
                 </div>
               </div>

               {/* Absolute Status Indicator */}
               <div className="absolute top-6 right-6 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Active Partner</span>
               </div>
             </motion.div>
           ))}
        </div>

        {/* Footer Trust Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
          <p className={`text-[10px] font-bold ${isDark ? 'text-slate-600' : 'text-slate-400'} uppercase tracking-[0.5em]`}>
            Verified RBI Complaint Ecosystem • ISO 9001:2015
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerNBFCs;
