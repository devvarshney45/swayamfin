import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Shield, Award, Sparkles, Activity, ShieldCheck, Globe, Zap, Cpu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  
  return (
    <div className={`${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} min-h-screen font-dmsans transition-colors duration-500 overflow-hidden`}>
      
      {/* Institutional Narrative Hero */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute top-0 right-0 w-2/3 h-2/3 ${isDark ? 'bg-blue-600/5' : 'bg-blue-500/5'} blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2`} />
          <div className={`absolute bottom-0 left-0 w-1/2 h-1/2 ${isDark ? 'bg-primary-gold/5' : 'bg-primary-gold/3'} blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2`} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10 text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full ${isDark ? 'bg-white/5 border-white/5 shadow-inner' : 'bg-blue-600/10 border-blue-500/20 shadow-sm'} text-primary-gold text-[10px] font-black uppercase tracking-[0.4em] border`}
          >
            <Activity className="w-4 h-4" /> Global Mission Protocol
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-[0.9] tracking-tighter`}
          >
            The Execution <br /> <span className="text-blue-600 italic">Philosophy</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-lg md:text-2xl max-w-4xl mx-auto font-medium italic leading-relaxed`}
          >
            "Swayamfin serves as an architectural catalyst in the credit ecosystem, bridging systemic gaps for MSMEs and retail navigators through institutional-grade financial orchestration."
          </motion.p>
        </div>
      </section>

      {/* Strategic Blueprint */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 -mt-8 md:-mt-24 pb-16 md:pb-24 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tight`}>
               Bridging the <br /> <span className="text-blue-600 italic">Credit Variance.</span>
            </h2>
            <div className="space-y-8">
               <p className={`text-[11px] md:text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} font-black uppercase tracking-[0.4em] leading-relaxed italic border-l-4 border-blue-600 pl-8`}>
                  Operating under Green Miles Mobility Pvt. Ltd., Swayamfin was born out of a vision to simplify complex lending landscapes. We understand that every business has a unique story, and standard banking doesn't always listen.
               </p>
               <p className={`text-[11px] md:text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'} font-black uppercase tracking-[0.3em] leading-relaxed opacity-60`}>
                  We partner with India's most trusted NBFCs and HFCs to provide customized working capital, LAP, and housing solutions with a focus on speed, transparency, and institutional rigor.
               </p>
            </div>
            
            <div className="flex gap-4 pt-4">
               {[1,2,3].map(i => <div key={i} className="w-12 h-1 bg-blue-600 rounded-full" style={{ opacity: i * 0.2 }} />)}
            </div>
          </motion.div>

          <div className="relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`aspect-[4/3] ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white shadow-22xl shadow-slate-200/50'} rounded-[64px] md:rounded-[80px] overflow-hidden p-3 border`}
            >
              <div className="w-full h-full rounded-[50px] md:rounded-[70px] overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-tr from-[#020617] to-transparent z-10 opacity-40 group-hover:opacity-0 transition-opacity duration-1000`} />
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Institutional Presence" 
                  className={`w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000 ${isDark ? 'grayscale opacity-60' : 'grayscale transition-all duration-1000 group-hover:grayscale-0'}`} 
                />
              </div>
            </motion.div>
            
            {/* Experience Protocol Badge */}
            <div className={`absolute -bottom-8 -left-8 ${isDark ? 'bg-[#0F172A] border-white/5 shadow-black' : 'bg-white border-slate-100 shadow-22xl shadow-slate-200/50'} p-10 rounded-[48px] border z-30 transition-transform group-hover:scale-105 duration-500`}>
               <div className="flex items-center gap-4 mb-4">
                  <ShieldCheck className="w-6 h-6 text-primary-gold" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Certified Integrity</span>
               </div>
               <div className={`text-6xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} font-playfair tracking-tighter mb-1`}>25<span className="text-blue-600 italic">Y+</span></div>
               <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] italic">Cumulative Market Domain Expertise</div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Architecture */}
      <section className={`${isDark ? 'bg-white/2' : 'bg-[#020617]/5'} py-16 md:py-28 border-y ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group order-2 lg:order-1"
            >
               <div className={`aspect-square rounded-3xl md:rounded-[60px] overflow-hidden p-3 border ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white shadow-xl shadow-slate-200/50'}`}>
                  <div className="w-full h-full rounded-2xl md:rounded-[50px] overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&q=80&w=1200" 
                      alt="Operations Hub" 
                      className={`w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-110 ${isDark ? 'grayscale opacity-40' : 'grayscale group-hover:grayscale-0'}`} 
                    />
                    <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                  </div>
               </div>
               <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-600/5 blur-[100px] pointer-events-none" />
            </motion.div>

            <div className="order-1 lg:order-2 space-y-12">
               <div className="flex items-center gap-4">
                  <Cpu className="w-8 h-8 text-blue-600" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">System Architecture</span>
               </div>
               <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'} font-playfair leading-tight tracking-tight uppercase`}>
                  A Culture of <br /><span className="text-blue-600 italic">Advanced Trust</span>
               </h2>
               <p className={`text-lg md:text-xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-medium italic leading-relaxed max-w-xl`}>
                  "At Swayamfin, our infrastructure transcends physical borders. We engineer a culture where every protocol is designed to simplify complex financial velocity."
               </p>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                 {[
                   { label: 'Environment', val: 'Collaborative-X', icon: Globe },
                   { label: 'Intelligence', val: 'Digital-First', icon: Zap },
                   { label: 'Performance', val: 'Delta-Scale', icon: Target },
                   { label: 'Governance', val: 'Core-Pillar', icon: Shield }
                 ].map((item, i) => (
                    <div key={i} className={`${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-slate-100 shadow-md'} p-5 md:p-6 rounded-2xl border group/tile hover:bg-blue-600 transition-all duration-500`}>
                      <div className="flex justify-between items-start mb-6">
                         <p className={`text-[10px] font-black text-slate-500 uppercase tracking-widest italic group-hover/tile:text-white/60 transition-colors`}>{item.label}</p>
                         <item.icon className="w-5 h-5 text-blue-600 group-hover/tile:text-white transition-colors" />
                      </div>
                      <p className={`${isDark ? 'text-white' : 'text-[#020617]'} font-black text-xl uppercase tracking-tighter group-hover/tile:text-white transition-colors`}>{item.val}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Showcase */}
      <section className="py-16 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex flex-col items-center text-center space-y-6 mb-24 md:mb-40">
             <div className="w-16 h-16 bg-blue-600/10 text-blue-600 rounded-3xl flex items-center justify-center">
                <Users className="w-8 h-8" />
             </div>
             <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black ${isDark ? 'text-white' : 'text-slate-900'} font-playfair tracking-tight uppercase leading-none`}>Leadership <span className="text-blue-600 italic">Council</span></h2>
             <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[10px] italic">Strategic minds behind the Swayamfin deployment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {[
              { 
                name: 'Vikkrant Prasad', 
                role: 'Chief Executive Officer', 
                bio: 'Former investment banker, architect of Swayamfin.',
                img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' 
              },
              { 
                name: 'Nupur Prasad', 
                role: 'Admin & HR Governance', 
                bio: '10+ years in microfinance, LAP, and supply chain control.',
                img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' 
              },
              { 
                name: 'Sudhanshu Shekhar', 
                role: 'Exp. Governance Officer', 
                bio: 'Former CFO at Humana Financial, Domain Expert.',
                img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' 
              },
              { 
                name: 'Madhu Priya Prasad', 
                role: 'Head of Alliances', 
                bio: '10+ years in investment banking and strategic protocol.',
                img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' 
              },
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group"
              >
                <div className={`relative aspect-[3/4] rounded-[50px] overflow-hidden mb-8 border ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white shadow-22xl shadow-slate-200/50'} p-3`}>
                   <div className="w-full h-full rounded-[40px] overflow-hidden relative">
                      <img src={member.img} alt={member.name} className={`w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-1000`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
                      
                      <div className="absolute bottom-10 left-10 right-10">
                         <h4 className={`font-playfair font-black text-white text-2xl mb-1 uppercase tracking-tight`}>{member.name}</h4>
                         <p className="text-primary-gold text-[9px] font-black uppercase tracking-[0.3em] italic mb-4">{member.role}</p>
                         <div className="w-full h-[1px] bg-white/20 group-hover:bg-blue-600 transition-colors" />
                      </div>
                   </div>
                </div>
                <p className={`${isDark ? 'text-slate-500' : 'text-slate-500'} text-[11px] leading-relaxed font-bold italic px-4 text-center group-hover:text-blue-600 transition-colors`}>"{member.bio}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Architecture Strip */}
      <section className={`py-14 md:py-20 ${isDark ? 'bg-[#0F172A]' : 'bg-[#020617]'} relative overflow-hidden`}>
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0%,transparent_70%)]" />
         <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left space-y-4">
               <h3 className="text-white text-3xl md:text-5xl font-black font-playfair tracking-tighter uppercase leading-none">Global Partnership <br /> <span className="text-blue-600">Protocol</span></h3>
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] italic leading-relaxed">Secured with India's Tier-1 Financial Anchors</p>
            </div>
            <div className="flex flex-wrap justify-center gap-12 opacity-20 hover:opacity-100 transition-opacity duration-1000">
               {[1,2,3,4].map(idx => (
                 <div key={idx} className="w-32 h-12 bg-white/10 rounded-xl" />
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
