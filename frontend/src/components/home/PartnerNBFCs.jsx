import React from 'react';
import { motion } from 'framer-motion';

const PartnerNBFCs = () => {
  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden font-dmsans">
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h2 className="text-3xl font-playfair font-black text-white mb-4">Strategic NBFC Partnerships</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Empowered by India's leading financial institutions</p>
      </div>
        
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center px-4 max-w-7xl mx-auto">
         {[
           'DMI Housing Finance',
           'Aditya Birla Capital',
           'Tata Capital',
           'Bajaj Finserv',
           'L&T Finance',
           'Mahindra Finance'
         ].map((partner, idx) => (
           <motion.div
             key={idx}
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             whileHover={{ scale: 1.05, opacity: 1 }}
             transition={{ delay: idx * 0.05 }}
             className="flex items-center justify-center p-6 bg-white/5 rounded-3xl border border-transparent hover:border-white/10 font-playfair font-black text-slate-500 hover:text-white text-center text-sm transition-all duration-300 cursor-default opacity-50 hover:opacity-100 shadow-sm hover:shadow-lg"
           >
             {partner}
           </motion.div>
         ))}
      </div>
    </section>
  );
};

export default PartnerNBFCs;
