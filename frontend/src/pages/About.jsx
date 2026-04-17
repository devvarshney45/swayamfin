import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Shield, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-primary-darkBlue text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-blue opacity-10 transform skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            Empowering Your <span className="text-primary-lightBlue">Financial Journey</span>
          </motion.h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Swayamfin is a leading Loan Service Provider (LSP) dedicated to bridging the credit gap for MSMEs and retail borrowers across India.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6 italic border-l-4 border-primary-blue pl-6">
              "To become one of India's top investment facilitators while empowering emerging markets with transparent finance."
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Operating under Green Miles Mobility Pvt. Ltd., Swayamfin was born out of a vision to simplify complex lending landscapes. We understand that every business has a unique story, and standard banking doesn't always listen.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              We partner with India's most trusted NBFCs and HFCs to provide customized working capital, LAP, and housing solutions with a focus on speed, transparency, and empathy.
            </p>
          </motion.div>
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/3] bg-slate-100 rounded-[40px] overflow-hidden shadow-2xl ring-1 ring-slate-200"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-darkBlue/30 to-transparent z-10"></div>
              <img 
                src="/Users/store/.gemini/antigravity/brain/db71988b-a180-4f56-bd8b-74a51ba29089/modern_fintech_office_india_1776392502681.png" 
                alt="Swayamfin Corporate Office" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" 
              />
            </motion.div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-50 hidden md:block z-20">
              <div className="text-primary-navy font-black text-4xl mb-1">25+</div>
              <div className="text-slate-400 text-xs font-black uppercase tracking-widest">Years of Expertise</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-square rounded-[64px] overflow-hidden shadow-2xl relative">
                <img 
                  src="/Users/store/.gemini/antigravity/brain/db71988b-a180-4f56-bd8b-74a51ba29089/modern_fintech_office_india_1776392502681.png" 
                  alt="Modern Office" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-primary-navy/20 mix-blend-multiply"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border-[24px] border-white/20 rounded-[64px] pointer-events-none scale-110"></div>
            </motion.div>

            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-playfair leading-tight">
                A Culture of <span className="text-primary-blue underline decoration-primary-gold/30">Innovation & Trust</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed font-medium">
                At Swayamfin, our workspace isn't just about glass walls and sleek furniture. It's about a culture where every team member is empowered to simplify the financial journey for our clients.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  { label: 'Work Environment', val: 'Collaborative' },
                  { label: 'Digital First', val: 'Assessment' },
                  { label: 'Client Success', val: 'Priority' },
                  { label: 'Transparency', val: 'Core Pillar' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-primary-navy font-black text-base">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 font-playfair">Our Core Values</h2>
            <div className="w-20 h-1.5 bg-primary-gold mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Integrity', desc: 'Open, honest and ethical in every transaction.' },
              { icon: Target, title: 'Speed', desc: 'Fast processing because growth can\'t wait.' },
              { icon: Users, title: 'Client-First', desc: 'Your financial goals drive our product design.' },
              { icon: Award, title: 'Transparency', desc: 'No hidden charges, no surprises. Ever.' }
            ].map((v, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 text-center hover:bg-white transition-colors duration-500 shadow-sm hover:shadow-xl"
              >
                <div className="w-16 h-16 bg-white text-primary-navy rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm ring-1 ring-slate-100">
                  <v.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 uppercase tracking-tight">{v.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
