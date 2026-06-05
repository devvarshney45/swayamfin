import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Linkedin, Mail, ChevronLeft, Shield, Award, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const teamData = {
  'vikkrant-prasad': {
    name: 'Vikkrant Prasad',
    role: 'Chief Executive Officer',
    bio: 'Former investment banker, architect of Swayamfin. Vikkrant leads the strategic direction of the company, focusing on innovative credit solutions for the underserved segments of India.',
    img: '/team/VikkrantPrasad.png',
    distFallback: '/dist/assets/VikkrantPrasad.png',
    linkedin: 'https://www.linkedin.com/in/vikkrant-prasad-242158a/',
    linkedinId: 'vikkrant-prasad-242158a',
    expertise: ['Investment Banking', 'Strategic Credit', 'Scale Operations'],
    narrative: 'With a background in institutional finance, Vikkrant envisioned a platform that bridges the gap between complex banking protocols and the immediate capital needs of Indian MSMEs.'
  },
  'nupur-prasad': {
    name: 'Nupur Prasad',
    role: 'Admin & HR Governance',
    bio: '10+ years in microfinance, LAP, and supply chain control. Nupur ensures that the organizational structure and human capital are aligned with Swayamfin\'s mission of integrity.',
    img: '/team/NupurPrasad.png',
    distFallback: '/dist/assets/Nupur%20Prasad.png',
    linkedin: '#',
    linkedinId: 'N/A',
    expertise: ['Resource Governance', 'Operations Control', 'Microfinance'],
    narrative: 'Nupur has been instrumental in building a culture of transparency and discipline, ensuring that every internal protocol strengthens our commitment to borrower success.'
  },
  'sudhanshu-shekhar': {
    name: 'Sudhanshu Shekhar',
    role: 'Exp. Governance Officer',
    bio: 'Former CFO at Humana Financial, Domain Expert. Sudhanshu brings decades of financial oversight and risk management expertise to the Swayamfin leadership council.',
    img: '/team/SudhanshuShekhar.png',
    distFallback: '/dist/assets/SudhanshuShekhar.png',
    linkedin: 'https://www.linkedin.com/in/sudhansshu-shekhar-28b1939/',
    linkedinId: 'sudhansshu-shekhar-28b1939',
    expertise: ['Financial Governance', 'Risk Management', 'Capital Structuring'],
    narrative: 'As a veteran in the financial sector, Sudhanshu oversees the compliance and risk frameworks that allow Swayamfin to maintain its institutional rigor while scaling rapidly.'
  },
  'madhu-priya-prasad': {
    name: 'Madhu Priya Prasad',
    role: 'Head of Alliances',
    bio: '10+ years in investment banking and strategic protocol. Madhu specializes in building long-term partnerships with leading NBFCs and HFCs across India.',
    img: '/team/MadhuPriyaPrasad.png',
    distFallback: '/dist/assets/MadhuPriyaPrasad.png',
    linkedin: 'https://www.linkedin.com/in/astrologer-dr-madhu-priya-indian-astrology-centre-820196191/',
    linkedinId: 'madhu-priya-820196191',
    expertise: ['Strategic Alliances', 'Institutional Sales', 'Market Expansion'],
    narrative: 'Madhu\'s ability to forge strategic nodes within the financial ecosystem has been key to Swayamfin\'s ability to offer a diverse range of credit products.'
  }
};

const TeamMemberDetails = () => {
  const { slug } = useParams();
  const { isDark } = useTheme();
  const member = teamData[slug] || teamData['vikkrant-prasad'];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className={`${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} min-h-screen py-32 md:py-48 font-plus transition-colors duration-500 overflow-hidden relative`}>
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/3 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Link to="/about" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-primary mb-16 transition-colors group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Council
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
          
          {/* Member Profile Image */}
          <div className="lg:col-span-5 relative group">
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
               className={`aspect-[4/5] ${isDark ? 'bg-[#0B1221] border-white/5' : 'bg-white shadow-22xl shadow-slate-200/50'} rounded-[56px] md:rounded-[72px] overflow-hidden p-3 border`}
             >
                <div className="w-full h-full rounded-[44px] md:rounded-[60px] overflow-hidden relative shadow-inner">
                   <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110"
                    onError={(e) => {
                       e.currentTarget.src = member.distFallback;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/40 to-transparent" />
                </div>
             </motion.div>
             <div className={`absolute -bottom-8 -right-8 ${isDark ? 'bg-[#0F172A] border-white/5' : 'bg-white border-slate-100 shadow-xl'} p-8 rounded-[40px] border z-20`}>
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                   <Award className="w-6 h-6 text-primary" />
                </div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Core Pillar</p>
             </div>
          </div>

          {/* Member Details Content */}
          <div className="lg:col-span-7 space-y-12">
             <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 text-primary"
                >
                   <Shield className="w-4 h-4" /> 
                   <span className="text-[10px] font-black uppercase tracking-[0.4em]">Active Leadership Node</span>
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className={`text-6xl md:text-8xl font-black ${isDark ? 'text-white' : 'text-slate-900'} leading-[0.9] tracking-tighter uppercase`}
                >
                   {member.name.split(' ')[0]} <br /> <span className="text-primary italic">{member.name.split(' ')[1]}</span>
                </motion.h1>
                <p className="text-slate-500 font-bold uppercase tracking-[0.5em] text-xs italic">{member.role}</p>
             </div>

             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
               className="space-y-8"
             >
                <p className={`text-xl md:text-2xl ${isDark ? 'text-slate-300' : 'text-slate-700'} font-medium italic border-l-4 border-primary pl-8 leading-relaxed`}>
                   "{member.bio}"
                </p>
                <p className={`${isDark ? 'text-slate-500' : 'text-slate-400'} text-sm leading-relaxed font-bold uppercase tracking-widest italic`}>
                   {member.narrative}
                </p>
             </motion.div>

             {/* Expertise Matrix */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {member.expertise.map((skill, i) => (
                  <div key={i} className={`${isDark ? 'bg-white/5' : 'bg-slate-50'} p-6 rounded-3xl border ${isDark ? 'border-white/5' : 'border-slate-100'} text-center`}>
                     <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black mx-auto mb-4 text-[10px]">
                        0{i+1}
                     </div>
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{skill}</p>
                  </div>
                ))}
             </div>

             {/* Social Links */}
             <div className="pt-12 border-t border-slate-100 flex flex-wrap gap-8 items-center">
                {member.linkedin !== '#' && (
                  <a 
                    href={member.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                     <div className="w-14 h-14 bg-[#0A66C2] rounded-[20px] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                        <Linkedin className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connect on LinkedIn</p>
                        <p className={`text-sm font-black ${isDark ? 'text-white' : 'text-slate-900'} group-hover:text-primary transition-colors`}>@{member.linkedinId}</p>
                     </div>
                  </a>
                )}
                
                <div className="flex items-center gap-4 opacity-40 grayscale group cursor-not-allowed">
                   <div className="w-14 h-14 bg-slate-400 rounded-[20px] flex items-center justify-center text-white">
                      <Mail className="w-6 h-6" />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Secure Messaging</p>
                      <p className="text-sm font-black text-slate-400 italic uppercase">Encrypted Point-to-Point</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberDetails;
