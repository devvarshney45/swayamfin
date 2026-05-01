import React from 'react';
import { motion } from 'framer-motion';

const USPsSection = () => {
  const usps = [
    { title: 'Quick Disbursement', desc: 'Accelerated funding cycles to keep your business moving at full speed.' },
    { title: 'Fast Processing', desc: 'Digital verification protocols for rapid decisions and minimal turnaround.' },
    { title: 'Full Transparency', desc: 'Clear terms, fixed schedules, and absolutely no hidden charges.' },
    { title: 'Expert Advisory', desc: 'Seasoned financial specialists to guide your institutional credit journey.' }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-12 text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 rounded-full">
              <span className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-[0.4em]">Why Partner With Us</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1E293B] uppercase tracking-tight">
              Institutional <span className="text-[#0EA5E9] italic">Rigor</span>
            </h2>
          </div>

          <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {usps.map((usp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-[#F8FAFC] border border-slate-100 rounded-[32px] hover:shadow-2xl hover:border-[#0EA5E9]/30 transition-all duration-500 flex flex-col items-center text-center space-y-6 group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-50 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                  <span className="text-[#0EA5E9] font-black">{i + 1}</span>
                </div>
                <h3 className="text-xl font-black text-[#1E293B] uppercase tracking-tight group-hover:text-[#0EA5E9] transition-colors">{usp.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed italic">{usp.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default USPsSection;
