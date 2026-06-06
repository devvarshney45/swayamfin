import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LeadCaptureModal from '../common/LeadCaptureModal';

const ServicesSection = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    { id: 'hl', name: t('hl_title'), desc: t('hl_desc'), slug: 'housing-loans' },
    { id: 'lap', name: t('lap_title'), desc: t('lap_desc'), slug: 'lap' },
    { id: 'ubl', name: t('ubl_title'), desc: t('ubl_desc'), slug: 'unsecured-business-loan' },
    { id: 'scf', name: t('scf_title'), desc: t('scf_desc'), slug: 'supply-chain' },
    { id: 'uef', name: t('uef_title'), desc: t('uef_desc'), slug: 'unsecured-export-finance' },
    { id: 'mf', name: t('mf_title'), desc: t('mf_desc'), slug: 'machinery-loan' },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-[#1E293B] tracking-tight uppercase"
          >
            Our <span className="text-[#0EA5E9] italic">Services</span>
          </motion.h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
            Helping businesses access fast, reliable funding through a trusted and streamlined process.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link to={`/services/${service.slug}`} className="group block h-full">
                <div className="bg-white border-2 border-slate-100 p-8 rounded-[32px] h-full shadow-sm hover:shadow-2xl hover:border-[#0EA5E9]/30 transition-all duration-500 flex flex-col gap-6">
                  
                  <div className="space-y-3">
                    <h3 className="text-xl font-black text-[#1E293B] uppercase tracking-tight group-hover:text-[#0EA5E9] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed italic border-l-2 border-slate-100 pl-4">
                      {service.desc}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-[#0EA5E9] transition-colors">
                    Learn More <span>→</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>


      </div>

      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default ServicesSection;
