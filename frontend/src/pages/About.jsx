import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Shield, Award, Sparkles, Activity, ShieldCheck, Globe, Zap, Cpu, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  
  return (
    <div className={`${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} min-h-screen font-plus transition-colors duration-500 overflow-hidden`}>
      
      {/* Institutional Narrative Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className={`absolute top-0 right-0 w-2/3 h-2/3 ${isDark ? 'bg-primary/5' : 'bg-primary/5'} blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2`} />
          <div className={`absolute bottom-0 left-0 w-1/2 h-1/2 ${isDark ? 'bg-primary/5' : 'bg-primary/3'} blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2`} />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`inline-flex items-center gap-3 px-6 py-2.5 rounded-full ${isDark ? 'bg-white/5 border-white/10' : 'bg-primary/10 border-primary/20'} text-primary text-[10px] font-black uppercase tracking-[0.4em] border`}
          >
            <Activity className="w-4 h-4" /> Strategic Protocol
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className={`text-5xl md:text-8xl font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-[0.9] tracking-tighter uppercase`}
          >
            Evolution of <br /> <span className="text-primary italic">Credit.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-lg md:text-2xl max-w-4xl mx-auto font-medium italic leading-relaxed`}
          >
            "Swayamfin serves as an architectural catalyst in the credit ecosystem, bridging systemic gaps for MSMEs and retail navigators through institutional-grade financial orchestration."
          </motion.p>
        </div>
      </section>

      {/* Strategic Blueprint */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 -mt-12 md:-mt-20 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} className="space-y-12"
          >
            <h2 className={`text-4xl md:text-6xl font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tighter uppercase`}>
               Bridging the <br /> <span className="text-primary italic text-3xl md:text-5xl">Credit Variance.</span>
            </h2>
            <div className="space-y-8">
               <p className={`text-[11px] md:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} font-black uppercase tracking-[0.4em] leading-relaxed italic border-l-4 border-primary pl-8`}>
                  Operating under Green Miles Mobility Pvt. Ltd., Swayamfin was born out of a vision to simplify complex lending landscapes. We understand that every business has a unique story, and standard banking doesn't always listen.
               </p>
               <p className={`text-[11px] md:text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'} font-black uppercase tracking-[0.3em] leading-relaxed opacity-70`}>
                  We partner with India's most trusted NBFCs and HFCs to provide customized working capital, LAP, and housing solutions with a focus on speed, transparency, and institutional rigor.
               </p>
            </div>
            
            <div className="flex gap-2">
               {[1,2,3,4,5].map(i => <div key={i} className="w-12 h-1.5 bg-primary rounded-full" style={{ opacity: i * 0.2 }} />)}
            </div>
          </motion.div>

          <div className="relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`aspect-[4/3] ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white shadow-22xl shadow-slate-200/40'} rounded-[48px] md:rounded-[64px] overflow-hidden p-3 border`}
            >
              <div className="w-full h-full rounded-[40px] md:rounded-[56px] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] to-transparent z-10 opacity-30 group-hover:opacity-0 transition-opacity duration-1000" />
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                  alt="Institutional Presence" 
                  className={`w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-1000 ${isDark ? 'grayscale opacity-60' : 'grayscale transition-all duration-1000 group-hover:grayscale-0'}`} 
                />
              </div>
            </motion.div>
            
            <div className={`absolute -bottom-10 -left-10 ${isDark ? 'bg-[#0F172A] border-white/5 shadow-black' : 'bg-white border-slate-100 shadow-22xl shadow-slate-200/40'} p-8 rounded-[40px] border z-30 transition-transform group-hover:scale-105 duration-500`}>
               <div className="flex items-center gap-4 mb-4">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Certified Integrity</span>
               </div>
               <div className={`text-6xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tighter mb-1`}>25<span className="text-primary italic">Y+</span></div>
               <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] italic">Collective Domain Expertise</div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Architecture */}
      <section className={`${isDark ? 'bg-white/2' : 'bg-slate-900/5'} py-20 md:py-32 border-y ${isDark ? 'border-white/5' : 'border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} className="relative group order-2 lg:order-1"
            >
               <div className={`aspect-square rounded-[48px] md:rounded-[64px] overflow-hidden p-3 border ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white shadow-xl shadow-slate-200/40'}`}>
                  <div className="w-full h-full rounded-[40px] md:rounded-[56px] overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&q=80&w=1200" 
                      alt="Operations Hub" 
                      className={`w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-110 ${isDark ? 'grayscale opacity-40' : 'grayscale group-hover:grayscale-0'}`} 
                    />
                    <div className="absolute inset-0 bg-primary/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                  </div>
               </div>
            </motion.div>

            <div className="order-1 lg:order-2 space-y-12">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">System Architecture</span>
               </div>
               <h2 className={`text-4xl md:text-6xl font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tighter uppercase`}>
                  A Culture of <br /><span className="text-primary italic text-3xl md:text-5xl">Advanced Trust.</span>
               </h2>
               <p className={`text-lg md:text-xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-semibold italic leading-relaxed max-w-xl opacity-90`}>
                  "At Swayamfin, our infrastructure transcends physical borders. We engineer a culture where every protocol is designed to simplify complex financial velocity."
               </p>
               
               <div className="grid grid-cols-2 gap-4">
                 {[
                   { label: 'Environment', val: 'Collaborative-X', icon: Globe },
                   { label: 'Intelligence', val: 'Digital-First', icon: Zap },
                   { label: 'Performance', val: 'Delta-Scale', icon: Target },
                   { label: 'Governance', val: 'Core-Pillar', icon: Shield }
                 ].map((item, i) => (
                    <div key={i} className={`${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-slate-100 shadow-md'} p-6 rounded-3xl border group/tile hover:bg-primary transition-all duration-500`}>
                      <div className="flex justify-between items-start mb-6">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover/tile:bg-white" />
                         <item.icon className="w-5 h-5 text-primary group-hover/tile:text-white transition-colors" />
                      </div>
                      <p className={`text-[9px] font-black text-slate-500 uppercase tracking-widest italic group-hover/tile:text-white/60 mb-1`}>{item.label}</p>
                      <p className={`${isDark ? 'text-white' : 'text-slate-900'} font-black text-lg uppercase tracking-tighter group-hover/tile:text-white transition-colors`}>{item.val}</p>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Showcase */}
      <section className="py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col items-center text-center space-y-8 mb-24 md:mb-32">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="w-20 h-20 bg-primary/10 text-primary rounded-[32px] flex items-center justify-center shadow-xl"
             >
                <Users className="w-10 h-10" />
             </motion.div>
             <h2 className={`text-5xl md:text-8xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter uppercase leading-none`}>Leadership <span className="text-primary italic">Council.</span></h2>
             <p className="text-slate-500 font-black uppercase tracking-[0.5em] text-[10px] italic">Strategic minds behind the Swayamfin deployment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {[
              { 
                name: 'Vikkrant Prasad', role: 'Chief Executive Officer', 
                bio: 'Former investment banker, architect of Swayamfin.',
                img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' 
              },
              { 
                name: 'Nupur Prasad', role: 'Admin & HR Governance', 
                bio: '10+ years in microfinance, LAP, and supply chain control.',
                img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' 
              },
              { 
                name: 'Sudhanshu Shekhar', role: 'Exp. Governance Officer', 
                bio: 'Former CFO at Humana Financial, Domain Expert.',
                img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' 
              },
              { 
                name: 'Madhu Priya Prasad', role: 'Head of Alliances', 
                bio: '10+ years in investment banking and strategic protocol.',
                img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' 
              },
            ].map((member, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <div className={`relative aspect-[4/5] rounded-[48px] overflow-hidden mb-10 border ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white shadow-22xl shadow-slate-200/30'} p-3 transform transition-transform duration-700 group-hover:scale-95`}>
                   <div className="w-full h-full rounded-[40px] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                      <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110 group-hover:scale-100">
                         <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                            <ArrowRight className="w-6 h-6 text-white" />
                         </div>
                      </div>
                   </div>
                </div>
                <div className="space-y-4 px-4">
                   <h4 className={`font-black ${isDark ? 'text-white' : 'text-slate-900'} text-2xl uppercase tracking-tighter leading-none`}>{member.name}</h4>
                   <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">{member.role}</p>
                   <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'} text-[11px] leading-relaxed font-bold italic opacity-60 group-hover:opacity-100 transition-opacity`}>"{member.bio}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Architecture Strip */}
      <section className={`py-16 md:py-24 ${isDark ? 'bg-slate-900 border-t border-white/5' : 'bg-slate-900'} relative overflow-hidden`}>
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,theme(colors.primary.DEFAULT)_0%,transparent_70%)]" />
         <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left space-y-4">
               <h3 className="text-white text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Partnership <br /> <span className="text-primary">Protocol.</span></h3>
               <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.5em] italic leading-relaxed">Secured with India's Tier-1 Financial Anchors</p>
            </div>
            <div className="flex flex-wrap justify-center gap-12 grayscale brightness-200 opacity-20 hover:opacity-100 transition-all duration-700">
               {[1,2,3,4].map(idx => (
                 <div key={idx} className="w-28 h-6 bg-white/20 rounded-lg animate-pulse" style={{ animationDelay: `${idx * 0.2}s` }} />
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default About;
