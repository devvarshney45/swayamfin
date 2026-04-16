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
            <div className="aspect-video bg-slate-100 rounded-[32px] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-darkBlue/20 to-transparent"></div>
              <img src="https://images.unsplash.com/photo-1600880212340-053459a139ad?auto=format&fit=crop&q=80&w=800" alt="Team working" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl hidden md:block">
              <div className="text-primary-blue font-bold text-4xl mb-1">25+</div>
              <div className="text-slate-500 font-medium italic">Years of Combined Experience</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <div className="w-20 h-1 bg-primary-blue mx-auto"></div>
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
                className="bg-white p-8 rounded-3xl shadow-fintech border border-slate-100 text-center"
              >
                <div className="w-16 h-16 bg-blue-50 text-primary-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <v.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
