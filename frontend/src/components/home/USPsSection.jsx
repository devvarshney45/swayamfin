import React from 'react';
import { motion } from 'framer-motion';
import { 
  History, 
  ShieldCheck, 
  Users2, 
  Clock, 
  CheckCircle2,
  Gem
} from 'lucide-react';

const USPsSection = () => {
  const highlights = [
    {
      title: 'Decade of Trust',
      desc: '10+ years of empowering MSMEs with ethical and transparent financial solutions.',
      icon: History,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'RBI Compliance',
      desc: 'Partnered with RBI-regulated NBFCs to ensure the highest standards of safety.',
      icon: ShieldCheck,
      color: 'bg-green-50 text-green-600'
    },
    {
      title: 'Expert Advisory',
      desc: 'Hands-on support from seasoned financial experts for your business journey.',
      icon: Users2,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'Express Processing',
      desc: 'Digital-first approach for faster approvals and seamless disbursements.',
      icon: Clock,
      color: 'bg-purple-50 text-purple-600'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden font-dmsans">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-gold/10 text-primary-gold text-[10px] font-black uppercase tracking-widest">
              <Gem className="w-4 h-4" /> Why Swayamfin?
            </div>
            
            <h2 className="text-4xl md:text-5xl font-playfair font-black text-primary-navy leading-tight">
              Moving Beyond Traditional <span className="text-primary-gold">Banking Hurdles</span>
            </h2>
            
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              We understand that every business is unique. Our lending approach focuses on your potential, not just your balance sheet. With presence in 4 major hubs, we are local enough to care and big enough to deliver.
            </p>

            <div className="space-y-4 pt-4">
              {[
                'Presence in Agra, Delhi, Noida & Gurgaon',
                'Customized Loan Products for MSMEs',
                'Transparent No-Hidden-Charge Policy'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-primary-navy font-bold">
                  <CheckCircle2 className="w-5 h-5 text-primary-gold" />
                  {item}
                </div>
              ))}
            </div>

            <div className="pt-6">
              <button className="px-8 py-4 bg-primary-navy text-white font-black rounded-2xl hover:bg-primary-gold hover:text-primary-navy transition-all duration-300 uppercase tracking-widest text-xs shadow-xl shadow-primary-navy/20">
                Explore Our Heritage
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-10 rounded-[48px] bg-slate-50/50 backdrop-blur-sm border border-slate-100/80 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(2,17,46,0.1)] transition-all duration-500 group relative overflow-hidden"
              >
                {/* Decorative Background Accent */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`w-16 h-16 ${item.color} rounded-[24px] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm group-hover:shadow-md`}>
                  <item.icon className="w-8 h-8" />
                </div>
                
                <h4 className="text-xl font-black text-primary-navy mb-4 group-hover:text-primary-navy transition-colors">{item.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
};

export default USPsSection;
