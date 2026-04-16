import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, ShieldCheck, CreditCard, CheckCircle2, Headphones } from 'lucide-react';

const Process = () => {
  const steps = [
    {
      title: "Enquiry & callback",
      desc: "Fill the online form or call us. Our expert relationship manager calls you back within 30 minutes.",
      time: "Same Day",
      icon: Search,
      color: "blue"
    },
    {
      title: "Profile Assessment",
      desc: "We assess your requirement, business longevity, and cash flow to find the best lending match.",
      time: "24 Hours",
      icon: ShieldCheck,
      color: "green"
    },
    {
      title: "Document Collection",
      desc: "Minimal KYC and financial documents collected digitally or at your doorstep for convenience.",
      time: "Next Day",
      icon: FileText,
      color: "orange"
    },
    {
      title: "Sanction & Terms",
      desc: "Our partner NBFC/HFC sanctions the loan. All terms, rates, and fees are discussed transparently.",
      time: "2-3 Days",
      icon: CreditCard,
      color: "blue"
    },
    {
      title: "Disbursement",
      desc: "Funds are directly disbursed into your bank account. Growth starts immediately.",
      time: "Instant",
      icon: CheckCircle2,
      color: "green"
    },
    {
      title: "Active Support",
      desc: "Dedicated RM assigned for all post-loan queries, statements, and future top-ups.",
      time: "Forever",
      icon: Headphones,
      color: "blue"
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6"
          >
            Our Simple <span className="text-primary-blue">6-Step Workflow</span>
          </motion.h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            We've eliminated the red tape. Experience a lending process designed for speed and clarity.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line for desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 hidden md:block" />

          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-4 uppercase tracking-widest
                    ${step.color === 'blue' ? 'bg-blue-50 text-primary-blue' : 
                      step.color === 'green' ? 'bg-green-50 text-success-green' : 'bg-orange-50 text-orange-600'}`}
                  >
                    Step {index + 1} • {step.time}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg italic pr-4">"{step.desc}"</p>
                </div>

                {/* Icon Hub */}
                <div className="relative z-10">
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl ring-8 ring-white
                    ${step.color === 'blue' ? 'bg-primary-blue text-white' : 
                      step.color === 'green' ? 'bg-success-green text-white' : 'bg-orange-500 text-white'}`}
                  >
                    <step.icon className="w-10 h-10" />
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-32 text-center bg-blue-50/50 rounded-[48px] p-12 md:p-20 border border-blue-100">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to experience the Swayamfin speed?</h2>
          <p className="text-slate-500 mb-10 text-lg">Your application takes less than 5 minutes to complete.</p>
          <a href="/" className="inline-block bg-primary-blue text-white font-extrabold px-12 py-5 rounded-2xl shadow-xl hover:bg-primary-darkBlue hover:-translate-y-1 transition-all text-lg">
            Start Your Journey Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Process;
