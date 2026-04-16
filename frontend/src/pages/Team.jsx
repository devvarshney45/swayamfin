import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';

const Team = () => {
  const leaders = [
    {
      name: "Vikkrant Prasad",
      role: "Chief Executive Officer",
      bio: "Former investment banker and co-founder of Swayamfin. Expert in structured finance and MSME growth strategies.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Nupur Prasad",
      role: "Admin & HR Head",
      bio: "10+ years of experience in microfinance operations, LAP processing, and strategic supply chain team management.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Sudhanshu Shekhar",
      role: "Chief Experience Officer (CXO)",
      bio: "Former CFO at Humana Financial. Leads our client experience and digital transformation initiatives.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Madhu Priya Prasad",
      role: "Head of Partnerships",
      bio: "Strategic specialist in investment banking and NBFC tie-ups. Drives our lending ecosystem expansion.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            Meet the Minds <span className="text-primary-blue">Behind Swayamfin</span>
          </motion.h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our leadership team brings together decades of experience from investment banking, microfinance, and digital lending.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {leaders.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-[32px] overflow-hidden shadow-fintech border border-slate-100 flex flex-col items-center p-8 text-center"
            >
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-primary-blue/5 shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary-blue text-white p-2 rounded-xl shadow-lg">
                  <Linkedin className="w-4 h-4" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
              <p className="text-primary-blue font-bold text-sm mb-4 uppercase tracking-wider">{member.role}</p>
              <p className="text-slate-500 text-sm leading-relaxed italic">"{member.bio}"</p>
              
              <div className="mt-6 flex items-center gap-4 text-slate-400 group-hover:text-primary-blue transition-colors">
                 <Mail className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
                 <Linkedin className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 bg-primary-darkBlue rounded-[40px] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-blue opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-2xl md:text-3xl font-bold mb-6 relative z-10">Interested in joining our mission?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto italic relative z-10">
            We are always looking for passionate professionals to join our growing team across India.
          </p>
          <a href="mailto:info@swayamfin.com" className="inline-block bg-white text-primary-darkBlue font-bold px-10 py-4 rounded-2xl shadow-xl hover:bg-primary-lightBlue hover:scale-105 transition-all relative z-10">
            Send Your CV
          </a>
        </div>
      </div>
    </div>
  );
};

export default Team;
