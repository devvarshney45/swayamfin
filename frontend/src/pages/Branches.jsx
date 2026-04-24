import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const branches = [
  { city: 'Agra', slug: 'agra', code: 'AGR-HUB-01', manager: 'Nupur Prasad', tagline: 'Strategic Regional Command Center' },
  { city: 'Mathura', slug: 'mathura', code: 'MTH-HUB-02', manager: 'Sudhanshu Shekhar', tagline: 'Holy Gate Operational Node' },
  { city: 'Hathras', slug: 'hathras', code: 'HTH-HUB-03', manager: 'Madhu Priya Prasad', tagline: 'Main Market Credit Matrix' },
  { city: 'Kosi', slug: 'kosi', code: 'KSI-HUB-04', manager: 'Vikkrant Prasad', tagline: 'G.T. Road Distribution Hub' }
];

const Branches = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24 space-y-4">
           <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 rounded-full">
              <span className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-[0.4em]">Regional Distribution Network</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-black text-[#1E293B] uppercase tracking-tighter leading-none">
              Strategic <span className="text-[#0EA5E9] italic">Nodes.</span>
           </h1>
           <p className="text-slate-500 font-medium italic max-w-2xl mx-auto">
              "Hyper-localized financial infrastructure across North Indian credit corridors."
           </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           {branches.map((branch, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
             >
               <Link to={`/branches/${branch.slug}`} className="group block">
                 <div className="bg-[#F8FAFC] border border-slate-100 p-12 rounded-[48px] hover:bg-white hover:shadow-2xl hover:border-[#0EA5E9]/30 transition-all duration-700 relative overflow-hidden h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform" />
                    
                    <div className="space-y-10 relative z-10">
                       <div className="flex justify-between items-start">
                          <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center text-[#0EA5E9] font-black group-hover:bg-[#0EA5E9] group-hover:text-white transition-all duration-500">
                             {i + 1}
                          </div>
                          <div className="text-right">
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{branch.code}</p>
                             <p className="text-[10px] font-black text-[#0EA5E9] uppercase tracking-widest mt-1">Live Node</p>
                          </div>
                       </div>

                       <div className="space-y-4">
                          <h3 className="text-4xl font-black text-[#1E293B] uppercase tracking-tight group-hover:translate-x-2 transition-transform">
                             {branch.city} <span className="text-[#0EA5E9] italic opacity-40">Hub</span>
                          </h3>
                          <p className="text-slate-500 font-medium italic border-l-2 border-[#0EA5E9]/20 pl-4">{branch.tagline}</p>
                       </div>

                       <div className="pt-10 border-t border-slate-200 flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                          <div className="space-y-1">
                             <p className="text-slate-400">Node Hub Manager</p>
                             <p className="text-[#1E293B]">{branch.manager}</p>
                          </div>
                          <div className="text-[#0EA5E9] group-hover:translate-x-2 transition-transform">
                             Access Hub →
                          </div>
                       </div>
                    </div>
                 </div>
               </Link>
             </motion.div>
           ))}
        </div>

        {/* Global Stats Footer */}
        <div className="mt-24 p-12 bg-[#1E293B] rounded-[40px] text-center space-y-8 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[#0EA5E9]/5 pointer-events-none" />
           <p className="text-slate-400 font-black uppercase tracking-[0.6em] text-[8px]">Network Intelligence Dashboard</p>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { l: 'Total Hubs', v: '04' },
                { l: 'Uptime', v: '99.9%' },
                { l: 'Encryption', v: 'AES-256' },
                { l: 'Topology', v: 'Mesh' }
              ].map((s, i) => (
                <div key={i} className="space-y-2">
                   <p className="text-white text-3xl font-black tracking-tighter">{s.v}</p>
                   <p className="text-[#0EA5E9] text-[9px] font-black uppercase tracking-[0.4em] opacity-80">{s.l}</p>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default Branches;
