import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  Building2, 
  Briefcase, 
  Truck, 
  Globe, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadCaptureModal from '../common/LeadCaptureModal';

const ServicesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const services = [
    { 
        id: 'HL', 
        name: 'Home Loan', 
        desc: 'We give you the money to buy a house for you to live in.', 
        icon: Home,
        path: '/housing'
    },
    { 
        id: 'LAP', 
        name: 'Loan Against Property', 
        desc: 'If you already own a building, we will lend you cash—and you still get to keep the building!', 
        icon: Building2,
        path: '/lap'
    },
    { 
        id: 'UBL', 
        name: 'Unsecured Business Loan', 
        desc: 'We give your business money to grow, and you don\'t have to promise to give us any of your stuff if things go wrong.', 
        icon: Briefcase,
        path: '/msme-loans'
    },
    { 
        id: 'SCF', 
        name: 'Supply Chain Finance', 
        desc: 'We help pay the people who deliver your boxes, so your shop never runs out of things to sell.', 
        icon: Truck,
        path: '/supply-chain'
    },
    { 
        id: 'UEF', 
        name: 'Unsecured Export Finance', 
        desc: 'We give you money to help you pack up and sell your stuff to people far away in other countries.', 
        icon: Globe,
        path: '/services/uef'
    },
    { 
        id: 'MF', 
        name: 'Machinery Finance', 
        desc: 'We give you the money to buy big, heavy machines so you can build things much faster.', 
        icon: Activity,
        path: '/services/machinery-loan'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#F8FAFC] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 space-y-6">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black text-[#1E293B] leading-tight tracking-tighter uppercase"
            >
              Our <span className="text-blue-600 italic">Services.</span>
            </motion.h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
              <Link to={service.path} className="group block h-full">
                <div className="bg-white border-2 border-slate-100 rounded-[48px] p-10 h-full shadow-sm hover:shadow-2xl hover:border-blue-500/30 transition-all duration-500 cursor-pointer flex flex-col relative overflow-hidden">
                  
                  {/* Header Icon */}
                  <div className="mb-8 flex items-center justify-between">
                     <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100/50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                        <service.icon className="w-8 h-8" />
                     </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 mb-8">
                     <h3 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight group-hover:text-blue-600 transition-colors">
                        {service.name}
                     </h3>
                     <p className="text-slate-500 text-sm font-medium leading-relaxed italic border-l-4 border-blue-600/10 pl-6">
                        {service.desc}
                     </p>
                  </div>

                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-50">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Learn More</span>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
          ))}
        </div>

      </div>
      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default ServicesSection;
