import React from 'react';
import { motion } from 'framer-motion';

const Team = () => {
  const leaders = [
    {
      name: "Vikkrant Prasad",
      role: "Chief Executive Officer",
      bio: "Former investment banker and co-founder of Swayamfin. Expert in structured finance and MSME growth strategies.",
    },
    {
      name: "Nupur Prasad",
      role: "Admin & HR Head",
      bio: "10+ years of experience in microfinance operations, LAP processing, and strategic supply chain team management.",
    },
    {
      name: "Sudhanshu Shekhar",
      role: "Chief Experience Officer (CXO)",
      bio: "Former CFO at Humana Financial. Leads our client experience and digital transformation initiatives.",
    },
    {
      name: "Madhu Priya Prasad",
      role: "Head of Partnerships",
      bio: "Strategic specialist in investment banking and NBFC tie-ups. Drives our lending ecosystem expansion.",
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-32 pb-40 font-plus-jakarta-sans overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0EA5E9]/5 blur-[160px] rounded-full translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 space-y-6">
           <motion.div 
             initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 text-[#0EA5E9] text-[10px] font-black uppercase tracking-[0.4em]"
           >
             Institutional Leadership
           </motion.div>

           <motion.h1 
             initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-8xl font-black text-[#1E293B] leading-none tracking-tighter uppercase"
           >
             The Minds <br /> <span className="text-[#0EA5E9] italic">Behind Hub.</span>
           </motion.h1>

           <motion.p 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
             className="text-slate-500 text-lg md:text-2xl max-w-4xl mx-auto font-medium italic leading-relaxed"
           >
             "Our leadership team synchronizes decades of institutional banking intelligence to drive MSME growth through digital transformation."
           </motion.p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {leaders.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[60px] p-12 md:p-16 border border-slate-100 shadow-sm hover:shadow-2xl hover:border-[#0EA5E9]/30 transition-all flex flex-col md:flex-row gap-10 items-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700" />
              
              <div className="w-40 h-40 bg-[#1E293B] rounded-[48px] flex items-center justify-center font-black text-white text-6xl italic group-hover:bg-[#0EA5E9] transition-all rotate-3 group-hover:rotate-0">
                 {member.name.charAt(0)}
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-4 relative z-10">
                 <h3 className="text-3xl font-black text-[#1E293B] uppercase tracking-tighter leading-none">{member.name}</h3>
                 <p className="text-[#0EA5E9] font-black text-[10px] uppercase tracking-[0.3em] italic">{member.role}</p>
                 <p className="text-slate-500 text-[11px] font-black uppercase tracking-widest leading-relaxed mt-4 italic opacity-80">"{member.bio}"</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-32 bg-[#1E293B] rounded-[64px] p-16 md:p-24 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[#0EA5E9]/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
           <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">Join the <span className="text-[#0EA5E9] italic">Mission.</span></h2>
              <p className="text-blue-100/60 text-lg md:text-xl font-medium max-w-2xl mx-auto italic">
                 "We are continuously integrating specialized personnel into our regional hubs across India."
              </p>
              <div className="pt-6">
                 <a href="mailto:info@swayamfin.com" className="inline-block bg-white text-[#1E293B] font-black px-12 py-5 rounded-2xl shadow-2xl hover:bg-[#0EA5E9] hover:text-white transition-all uppercase tracking-[0.3em] text-[10px]">
                    Transmit Curriculum Vitae
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
