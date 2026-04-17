import React from 'react';
import { motion } from 'framer-motion';

const PartnerNBFCs = () => {
  const partners = [
    { name: 'Aditya Birla Capital', logo: 'ABC' },
    { name: 'Tata Capital', logo: 'TC' },
    { name: 'L&T Finance', logo: 'LT' },
    { name: 'Mahindra Finance', logo: 'MF' },
    { name: 'Bajaj Finserv', logo: 'BF' },
    { name: 'HDFC Bank', logo: 'HDFC' }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden font-dmsans">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-[0.3em] mb-4 border border-slate-100"
          >
            Strategic Banking Alliances
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-playfair font-black text-primary-navy opacity-80"
          >
            Partnering with India's <span className="text-primary-gold">Financial Giants</span>
          </motion.h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 items-center">
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
               className="flex items-center justify-center p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-slate-100 font-playfair font-black text-primary-navy/40 hover:text-primary-navy text-center text-sm transition-all duration-300 cursor-default grayscale hover:grayscale-0 shadow-sm hover:shadow-lg"
             >
               {partner}
             </motion.div>
           ))}
        </div>
      </div>
    </section>

  );
};

export default PartnerNBFCs;
