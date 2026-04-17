import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Zap, CheckCircle2 } from 'lucide-react';

const TrustBar = () => {
  const partners = [
    { name: 'CRIF High Mark', type: 'Credit Partner' },
    { name: 'CIBIL', type: 'Score Verification' },
    { name: 'ISO 9001:2015', type: 'Quality Certified' },
    { name: 'RBI Registered', type: 'NBFC Partner' }
  ];

  return (
    <div className="bg-white border-y border-slate-100 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {partners.map((partner, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3"
            >
              <div className="text-primary-navy font-playfair font-black text-xl tracking-tighter">
                {partner.name}
              </div>
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="text-[10px] font-black uppercase tracking-widest text-primary-gold">
                {partner.type}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustBar;
