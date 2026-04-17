import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Briefcase, 
  Home, 
  Truck, 
  ShieldCheck, 
  Globe,
  AreaChart,
  ArrowRight
} from 'lucide-react';

const ServicesSection = () => {
  const services = [
    { 
      name: 'Home Loan', 
      slug: 'housing-loans', 
      icon: Home, 
      desc: 'Affordable housing solutions for your dream home.',
      tags: ['Competitive Rates', 'Flexible Tenure']
    },
    { 
      name: 'Loan Against Property', 
      slug: 'lap', 
      icon: Building2, 
      desc: 'Leverage your residential or commercial property value.',
      tags: ['High LTV', 'Low Interest']
    },
    { 
      name: 'MSME Structured Loans', 
      slug: 'msme-loans', 
      icon: Briefcase, 
      desc: 'Customized credit facilities for small & medium enterprises.',
      tags: ['Zero Collateral', 'Fast Payout']
    },
    { 
      name: 'Micro LAP', 
      slug: 'micro-lap', 
      icon: MapPin, 
      desc: 'Small ticket property loans for micro-businesses.',
      tags: ['Quick Docs', 'Doorstep Service']
    },
    { 
      name: 'Hybrid MSME Products', 
      slug: 'hybrid-msme', 
      icon: Globe, 
      desc: 'Innovative lending combining secured & unsecured credit.',
      tags: ['Flexible Repayment', 'Growth Capital']
    },
    { 
      name: 'Supply Chain Financing', 
      slug: 'supply-chain', 
      icon: Truck, 
      desc: 'Funding for your inventory and purchase orders.',
      tags: ['Working Capital', 'Vendor Finance']
    },
    { 
      name: 'Unsecured MSME Loans', 
      slug: 'unsecured-msme', 
      icon: ShieldCheck, 
      desc: 'Business expansion loans without any collateral.',
      tags: ['Instant Approval', 'No Asset Lock']
    },
    { 
      name: 'Machinery Loans', 
      slug: 'machinery-loan', 
      icon: AreaChart, 
      desc: 'Upgrade your business with new equipment and machinery.',
      tags: ['Asset Backed', 'Simple Process']
    },
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-gold rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary-navy rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 bg-primary-gold/10 text-primary-gold text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-4"
          >
            Financial Portfolio
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-playfair font-black text-primary-navy mb-6"
          >
            Tailored Solutions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gold to-amber-600">Every Financial Goal</span>
          </motion.h2>
          <p className="text-lg text-slate-500 font-medium">
            From fueling your business growth to securing your family's future, our diverse range of products is designed to empower your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -12 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group bg-white p-8 md:p-10 rounded-[48px] border border-slate-100/60 hover:border-primary-gold/50 hover:shadow-[0_40px_80px_-15px_rgba(2,17,46,0.1)] transition-all duration-500 flex flex-col h-full relative overflow-hidden"
            >
              {/* Card Accent Gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-500" />
              
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center text-primary-navy mb-10 group-hover:bg-primary-navy group-hover:text-primary-gold transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary-navy/10"
              >
                <service.icon className="w-10 h-10" />
              </motion.div>
              
              <h3 className="text-2xl font-playfair font-black text-primary-navy mb-4 group-hover:text-primary-gold transition-colors leading-tight">
                {service.name}
              </h3>
              
              <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed flex-grow opacity-80 group-hover:opacity-100 transition-opacity">
                {service.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {service.tags.map(tag => (
                  <span key={tag} className="text-[9px] font-black tracking-widest uppercase px-3 py-1.5 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-primary-gold/10 group-hover:text-primary-navy transition-all">
                    {tag}
                  </span>
                ))}
              </div>

              <Link 
                to={`/services/${service.slug}`}
                className="flex items-center justify-between w-full py-4 px-6 bg-slate-50 rounded-2xl text-[10px] font-black text-primary-navy uppercase tracking-[0.2em] group-hover:bg-primary-navy group-hover:text-white transition-all duration-500"
              >
                Explore Details
                <ArrowRight className="w-4 h-4 text-primary-gold group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
