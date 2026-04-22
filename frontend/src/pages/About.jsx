import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Shield, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDark } = useTheme();
  return (
    <div className={`${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} min-h-screen font-dmsans transition-colors duration-300`}>
      {/* Hero Section */}
      <div className={`${isDark ? 'bg-[#0B0F19]' : 'bg-white border-b border-slate-200'} py-24 px-4 relative overflow-hidden transition-colors duration-300`}>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-gold/5 transform skew-x-12 translate-x-1/2 blur-[80px]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-6xl font-playfair font-black mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            Empowering Your <span className="text-primary-gold italic">Financial Journey</span>
          </motion.h1>
          <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-xl max-w-3xl mx-auto font-medium leading-relaxed italic`}>
            Swayamfin is a leading Loan Service Provider (LSP) dedicated to bridging the credit gap for MSMEs and retail borrowers across India.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-6 italic border-l-4 border-primary-gold pl-6`}>
              "To become one of India's top investment facilitators while empowering emerging markets with transparent finance."
            </h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} font-bold mb-6 leading-relaxed uppercase tracking-widest`}>
              Operating under Green Miles Mobility Pvt. Ltd., Swayamfin was born out of a vision to simplify complex lending landscapes. We understand that every business has a unique story, and standard banking doesn't always listen.
            </p>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'} font-bold leading-relaxed uppercase tracking-widest`}>
              We partner with India's most trusted NBFCs and HFCs to provide customized working capital, LAP, and housing solutions with a focus on speed, transparency, and empathy.
            </p>
          </motion.div>
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`aspect-[4/3] ${isDark ? 'bg-white/5' : 'bg-white shadow-xl'} rounded-[40px] overflow-hidden shadow-2xl ring-1 ${isDark ? 'ring-white/10' : 'ring-slate-100'}`}
            >
              <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-tr from-[#020617]/50 to-transparent' : 'bg-primary-gold/5'} z-10`}></div>
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                alt="Swayamfin Corporate Office" 
                className={`w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ${isDark ? 'opacity-60' : 'opacity-100'}`} 
              />
            </motion.div>
            <div className={`absolute -bottom-6 -left-6 ${isDark ? 'bg-[#0B0F19]' : 'bg-white shadow-2xl'} p-6 md:p-8 rounded-3xl border ${isDark ? 'border-white/10' : 'border-slate-100'} hidden md:block z-20`}>
              <div className="text-primary-gold font-black text-4xl mb-1">25+</div>
              <div className="text-slate-500 text-xs font-black uppercase tracking-widest">Years of Expertise</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${isDark ? 'bg-white/5' : 'bg-slate-50'} py-24 border-y ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className={`aspect-square rounded-[64px] overflow-hidden shadow-2xl relative ${isDark ? '' : 'border border-slate-200'}`}>
                <img 
                  src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&q=80&w=1200" 
                  alt="Modern Office Interior" 
                  className={`w-full h-full object-cover ${isDark ? 'opacity-50' : 'opacity-100'}`} 
                />
                <div className={`absolute inset-0 ${isDark ? 'bg-[#0B0F19]/40 mix-blend-multiply' : 'bg-primary-gold/5'}`}></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[2px] border-primary-gold/10 rounded-[64px] pointer-events-none scale-105"></div>
            </motion.div>

            <div className="order-1 lg:order-2 space-y-8">
              <h2 className={`text-4xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'} font-playfair leading-tight`}>
                A Culture of <br /><span className="text-primary-gold italic">Innovation & Trust</span>
              </h2>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} leading-relaxed font-bold uppercase tracking-widest italic`}>
                At Swayamfin, our workspace isn't just about glass walls and sleek furniture. It's about a culture where every team member is empowered to simplify the financial journey for our clients.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  { label: 'Work Environment', val: 'Collaborative' },
                  { label: 'Digital First', val: 'Assessment' },
                  { label: 'Client Success', val: 'Priority' },
                  { label: 'Transparency', val: 'Core Pillar' }
                ].map((item, i) => (
                  <div key={i} className={`${isDark ? 'bg-[#0B0F19] border-white/5' : 'bg-white border-slate-200 shadow-sm'} p-6 rounded-3xl border hover:border-primary-gold/30 transition-colors`}>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className={`${isDark ? 'text-white' : 'text-slate-900'} font-black text-base`}>{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-4 font-playfair`}>Leadership Team</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Meet the minds behind Swayamfin's mission</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: 'Vikkrant Prasad', 
                role: 'Chief Executive Officer', 
                bio: 'Former investment banker, co-founder of Swayamfin.',
                img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' 
              },
              { 
                name: 'Nupur Prasad', 
                role: 'Admin & HR Head', 
                bio: '10+ years in microfinance, LAP, and supply chain finance.',
                img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400' 
              },
              { 
                name: 'Sudhanshu Shekhar', 
                role: 'Chief Experience Officer', 
                bio: 'Former CFO at Humana Financial.',
                img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' 
              },
              { 
                name: 'Madhu Priya Prasad', 
                role: 'Head of Partnerships', 
                bio: '10+ years in investment banking and strategic partnerships.',
                img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' 
              },
            ].map((member, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`${isDark ? 'bg-[#0B0F19] border-white/5' : 'bg-white border-slate-200 shadow-xl'} rounded-[32px] overflow-hidden border group hover:border-primary-gold/50 transition-all duration-500`}
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <img src={member.img} alt={member.name} className={`w-full h-full object-cover grayscale ${isDark ? 'opacity-60' : 'opacity-100'} group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700`} />
                  {isDark && <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />}
                </div>
                <div className={`p-6 relative z-10 ${isDark ? 'bg-[#0B0F19]' : 'bg-white'}`}>
                  <h4 className={`font-playfair font-black ${isDark ? 'text-white' : 'text-slate-900'} text-lg mb-1`}>{member.name}</h4>
                  <p className="text-primary-gold text-[10px] font-black uppercase tracking-widest mb-3">{member.role}</p>
                  <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} text-xs leading-relaxed font-bold line-clamp-2`}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
