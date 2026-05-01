import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LeadCaptureModal from '../common/LeadCaptureModal';

const ServicesSection = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    { name: t('home_loan'), slug: 'housing-loans', tag: 'Mortgage' },
    { name: t('lap'), slug: 'lap', tag: 'Asset' },
    { name: t('msme_loan'), slug: 'msme-loans', tag: 'Enterprise' },
    { name: t('supply_chain'), slug: 'supply-chain', tag: 'Supply' },
    { name: t('micro_lap'), slug: 'micro-lap', tag: 'Regional' },
    { name: t('hybrid_msme'), slug: 'hybrid-msme', tag: 'Hybrid' },
    { name: t('unsecured_msme'), slug: 'unsecured-msme', tag: 'Unsecured' },
    { name: t('machinery_loan'), slug: 'machinery-loan', tag: 'Machinery' },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 rounded-full"
          >
            <span className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-[0.4em]">Credit Portfolio</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-[#1E293B] tracking-tight uppercase"
          >
            Our <span className="text-[#0EA5E9] italic">Services</span>
          </motion.h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            Engineered for high-velocity liquidity across diversified financial verticals.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link to={`/services/${service.slug}`} className="group block h-full">
                <div className="bg-white border border-slate-100 p-8 rounded-[24px] h-full shadow-sm hover:shadow-xl hover:border-[#0EA5E9]/30 transition-all duration-500 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-[#0EA5E9] uppercase tracking-widest mb-4 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" /> {service.tag}
                    </div>
                    <h3 className="text-xl font-black text-[#1E293B] uppercase tracking-tight mb-4 group-hover:text-[#0EA5E9] transition-colors">
                      {service.name}
                    </h3>
                  </div>
                  <div className="pt-4 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-[#0EA5E9] transition-colors">
                    Learn More <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-20 p-10 md:p-16 bg-[#1E293B] rounded-[40px] relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0EA5E9]/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <p className="text-[#0EA5E9] text-[10px] font-black uppercase tracking-[0.4em]">Calculate Your Eligibility</p>
              <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                See How It <span className="text-[#0EA5E9] italic">Works</span>
              </h3>
              <p className="text-slate-400 text-sm max-w-md font-medium">Use our smart tools to estimate your loan eligibility in minutes.</p>
            </div>
            <button 
               onClick={() => setIsModalOpen(true)}
               className="btn-primary py-5 px-10 text-[10px] uppercase tracking-[0.2em] shadow-xl"
            >
              Start Application
            </button>
          </div>
        </motion.div>
      </div>

      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default ServicesSection;
