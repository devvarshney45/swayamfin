import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LeadCaptureModal from '../common/LeadCaptureModal';

const ServicesSection = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    { name: 'Lending Process', desc: 'Complete roadmap of our digital credit transformation.', path: '/process' },
    { name: 'About Us', desc: 'The institutional vision driving financial excellence.', path: '/about' },
    { name: 'Blog', desc: 'Professional insights on India\'s MSME lending sector.', path: '/blog' },
    { name: 'Contact Us', desc: 'Expert consultation for your capital requirements.', path: '/contact' },
    { name: 'Loan Against Property', desc: 'Institutional grade funding backed by your assets.', path: '/services/lap' },
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
            Swayamfin <span className="text-[#0EA5E9] italic">Direct</span>
          </motion.h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-medium">
             Central operational node for our institutional resources and primary lending protocols.
          </p>
        </div>

        {/* Grid */}
        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm"
            >
              <Link to={service.path} className="group block h-full">
                <div className="bg-white border-2 border-slate-100 p-10 rounded-[32px] h-full shadow-sm hover:shadow-2xl hover:border-[#0EA5E9]/30 transition-all duration-500 flex flex-col gap-8 relative overflow-hidden">
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight group-hover:text-[#0EA5E9] transition-colors leading-tight">
                      {service.name}
                    </h3>
                    <p className="text-slate-600 text-[13px] font-medium leading-relaxed italic border-l-4 border-[#0EA5E9]/20 pl-6">
                      {service.desc}
                    </p>
                  </div>
                  
                  <div className="mt-auto pt-4 flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-widest group-hover:text-[#0EA5E9] transition-colors">
                    Access Resource <span>→</span>
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
