import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Target, Shield, Award, Activity, ShieldCheck, Globe, Zap, Cpu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const teamMembers = [
  {
    name: 'Vikkrant Prasad',
    role: 'Chief Executive Officer',
    bio: 'Former investment banker, architect of Swayamfin.',
    img: '/team/VikkrantPrasad.png',
    distFallback: '/dist/assets/VikkrantPrasad.png',
    slug: 'vikkrant-prasad'
  },
  {
    name: 'Nupur Prasad',
    role: 'Admin & HR Governance',
    bio: '10+ years in microfinance, LAP, and supply chain control.',
    img: '/team/NupurPrasad.png',
    distFallback: '/dist/assets/Nupur%20Prasad.png',
    slug: 'nupur-prasad'
  },
  {
    name: 'Sudhanshu Shekhar',
    role: 'Exp. Governance Officer',
    bio: 'Former CFO at Humana Financial, Domain Expert.',
    img: '/team/SudhanshuShekhar.png',
    distFallback: '/dist/assets/SudhanshuShekhar.png',
    slug: 'sudhanshu-shekhar'
  },
  {
    name: 'Madhu Priya Prasad',
    role: 'Head of Alliances',
    bio: '10+ years in investment banking and strategic protocol.',
    img: '/team/MadhuPriyaPrasad.png',
    distFallback: '/dist/assets/MadhuPriyaPrasad.png',
    slug: 'madhu-priya-prasad'
  },
];

const About = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  
  return (
    <div className={`${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} min-h-screen font-plus transition-colors duration-500 overflow-hidden`}>
      <Helmet>
        <title>About us | Swayamfin</title>
        <meta name="description" content="Learn more about Swayamfin Financial Services. We are a digital platform connecting you to strategic MSME loans, housing finance, and business capital." />
      </Helmet>
      
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
            WE ARE <br /> <span className="text-primary italic">SWAYAMFIN.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-lg md:text-2xl max-w-4xl mx-auto font-medium italic leading-relaxed`}
          >
            We believe getting the funding you need shouldn't be complicated. Whether you're a growing business or an individual looking for support, we are here to make securing credit simple, fast, and completely transparent.
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
               CONNECTING YOU <br /> <span className="text-primary italic text-3xl md:text-5xl">TO CAPITAL.</span>
            </h2>
            <div className="space-y-8">
               <p className={`text-[11px] md:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} font-black uppercase tracking-[0.4em] leading-relaxed italic border-l-4 border-primary pl-8`}>
                  Swayamfin Financial Services Private Limited was born out of a simple vision: to take the confusion out of borrowing. We understand that every business and individual has a unique story, and standard banking doesn't always listen.
               </p>
               <p className={`text-[11px] md:text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'} font-black uppercase tracking-[0.3em] leading-relaxed opacity-70`}>
                  We partner with India's most trusted NBFCs and HFCs to provide customized working capital, LAP, and housing solutions. Our focus is simple: speed, complete transparency, and reliable service you can count on.
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
               <div className={`text-6xl font-black ${isDark ? 'text-white' : 'text-[#020617]'} tracking-tighter mb-1`}>25<span className="text-primary italic">Y+</span></div>
               <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] italic text-center">25+ Years in Financial Services</div>
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

               <h2 className={`text-4xl md:text-6xl font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-tight tracking-tighter uppercase`}>
                  FINANCE POWERED BY <br /><span className="text-primary italic text-3xl md:text-5xl">TRANSPARENCY.</span>
               </h2>
               <p className={`text-lg md:text-xl ${isDark ? 'text-slate-400' : 'text-slate-500'} font-semibold italic leading-relaxed max-w-xl opacity-90`}>
                  At Swayamfin, we use modern technology to break down traditional banking barriers. Our entire culture is built around one simple goal: taking the complexity out of finance so you can get the credit you need, faster and easier.
               </p>
               
               <div className="grid grid-cols-2 gap-4">
                 {[
                   { val: 'CUSTOMER-FIRST', icon: Globe },
                   { val: 'SEAMLESS PROCESS', icon: Zap },
                   { val: 'RAPID APPROVALS', icon: Target },
                   { val: 'FULLY COMPLIANT', icon: Shield }
                 ].map((item, i) => (
                    <div key={i} className={`${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white border-slate-100 shadow-md'} p-6 rounded-3xl border group/tile hover:bg-primary transition-all duration-500`}>
                      <div className="flex justify-between items-start mb-6">
                         <div className="w-1.5 h-1.5 rounded-full bg-primary group-hover/tile:bg-white" />
                         <item.icon className="w-5 h-5 text-primary group-hover/tile:text-white transition-colors" />
                      </div>
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
             <h2 className={`text-5xl md:text-8xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter uppercase leading-none`}>MEET THE <span className="text-primary italic">OWNERS.</span></h2>
             <p className="text-slate-500 font-black uppercase tracking-[0.5em] text-[10px] italic">The leadership behind Swayamfin Financial Services.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {teamMembers.map((member, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group text-center"
              >
                <Link to={`/team/${member.slug}`}>
                  <div className={`relative aspect-[4/5] rounded-[48px] overflow-hidden mb-10 border ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white shadow-22xl shadow-slate-200/30'} p-3 transform transition-transform duration-700 group-hover:scale-95 cursor-pointer`}>
                    <div className="w-full h-full rounded-[40px] overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          onError={(e) => {
                            if (e.currentTarget.dataset.distFallbackTried) return;
                            e.currentTarget.dataset.distFallbackTried = 'true';
                            e.currentTarget.src = member.distFallback;
                          }}
                        />
                    </div>
                  </div>
                </Link>
                <div className="space-y-4 px-4">
                   <h4 className={`font-black ${isDark ? 'text-white' : 'text-slate-900'} text-2xl uppercase tracking-tighter leading-none`}>
                      <Link to={`/team/${member.slug}`} className="hover:text-primary transition-colors">{member.name}</Link>
                   </h4>
                   <p className="text-primary text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">{member.role}</p>
                   <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'} text-[11px] leading-relaxed font-bold italic opacity-60 group-hover:opacity-100 transition-opacity`}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
};

export default About;
