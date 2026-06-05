import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, ChevronRight, Info } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      type: 'bot', 
      text: "Swayamfin ke Digital Node mein aapka swagat hai! Main aapka Strategic Financial AI assistant hoon. Aaj main aapko humare financial products mein kaise madad kar sakta hoon?" 
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Knowledge Base for Swayamfin
  const knowledgeBase = {
    services: [
      { keywords: ['hl', 'home loan', 'house'], response: "Home Loan (HL): We give you the money to buy a house for you to live in." },
      { keywords: ['lap', 'property', 'building'], response: "Loan Against Property (LAP): If you already own a building, we will lend you cash—and you still get to keep the building!" },
      { keywords: ['ubl', 'business loan', 'unsecured'], response: "Unsecured Business Loan (UBL): We give your business money to grow, and you don't have to promise to give us any of your stuff if things go wrong." },
      { keywords: ['scf', 'supply chain', 'vendor'], response: "Supply Chain Finance (SCF): We help pay the people who deliver your boxes, so your shop never runs out of things to sell." },
      { keywords: ['uef', 'export', 'international'], response: "Unsecured Export Finance (UEF): We give you money to help you pack up and sell your stuff to people far away in other countries." },
      { keywords: ['mf', 'machinery', 'equipment'], response: "Machinery Finance (MF): We give you the money to buy big, heavy machines so you can build things much faster." }
    ],
    general: [
      { keywords: ['apply', 'how', 'process'], response: "To apply, click the 'Start Application' button. You'll need to verify your email, submit your details, and then our team will contact you within 30 minutes." },
      { keywords: ['contact', 'call', 'number', 'whatsapp'], response: "You can call or WhatsApp us at +91 95607 23332. Our branches are located in Agra, Mathura, Hathras, and Kosi. We are available 24/7!" },
      { keywords: ['who', 'about', 'company'], response: "Swayamfin is a leading digital financial platform. We work with reliable NBFC and HFC partners to help you achieve your financial goals!" }
    ]
  };

  const getBotResponse = (input) => {
    const text = input.toLowerCase();
    
    // Check Knowledge Base
    const allKnowledge = [...knowledgeBase.services, ...knowledgeBase.general];
    for (const item of allKnowledge) {
      if (item.keywords.some(k => text.includes(k))) {
        return item.response;
      }
    }

    return "Your query has been registered. Our team will contact you shortly. Is there anything else I can help you with?";
  };

  const handleSend = async (text = inputText) => {
    if (!text.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI Processing
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg = { id: Date.now() + 1, type: 'bot', text: response };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  const quickQueries = [
    "How to apply?",
    "Available services",
    "Contact info",
    "Is it secure?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-plus-jakarta-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="mb-4 w-[380px] h-[550px] bg-white rounded-[40px] shadow-22xl border border-slate-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1E293B] p-6 text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0EA5E9]/20 blur-[60px] rounded-full -mr-16 -mt-16" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20">
                  <Bot className="w-6 h-6 text-[#0EA5E9]" />
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-tighter text-lg leading-none">Swayam AI</h3>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Secure Uplink Active</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-3xl text-xs font-medium leading-relaxed ${
                    msg.type === 'user' 
                      ? 'bg-[#1E293B] text-white rounded-tr-sm' 
                      : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex gap-1">
                    <div className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                    <div className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full animate-bounce" style={{ animationDelay: '400ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Queries */}
            <div className="px-6 py-4 bg-white border-t border-slate-50 flex gap-2 overflow-x-auto no-scrollbar">
              {quickQueries.map((q) => (
                <button 
                  key={q}
                  onClick={() => handleSend(q)}
                  className="whitespace-nowrap px-4 py-2 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-full text-[10px] font-bold uppercase tracking-widest transition-all"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white flex gap-3">
              <input 
                type="text" 
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl px-6 text-xs focus:ring-2 focus:ring-[#0EA5E9] outline-none transition-all"
              />
              <button 
                onClick={() => handleSend()}
                className="w-12 h-12 bg-[#1E293B] hover:bg-[#0EA5E9] text-white rounded-2xl flex items-center justify-center transition-all shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[22px] shadow-22xl flex items-center justify-center transition-all duration-500 ${
          isOpen ? 'bg-[#1E293B] text-white' : 'bg-white text-[#1E293B] hover:bg-[#0EA5E9] hover:text-white border border-slate-100'
        }`}
      >
        {isOpen ? <X className="w-7 h-7" /> : <MessageSquare className="w-7 h-7" />}
        {!isOpen && (
           <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white animate-pulse" />
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
