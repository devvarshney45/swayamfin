import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminTabs from '../../components/admin/AdminTabs';
import TrendGraph from '../../components/admin/TrendGraph';
import { ChevronRight, ChevronLeft, Calendar } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://swayamfin.onrender.com' : 'http://localhost:5001');

const AdminDashboard = () => {
  const [allLeads, setAllLeads] = useState([]);
  const [stats, setStats] = useState({
    totalActive: 0,
    casesDMI: 0,
    casesCredifin: 0,
    pipelineValue: 0,
    disbursementValue: 0,
    sanctionedValue: 0,
  });
  const [graphs, setGraphs] = useState({
    login: [],
    sanction: [],
    disbursement: []
  });
  const [graphMeta, setGraphMeta] = useState({
    login: { dmi: 0, credifin: 0, unit: 'Fees' },
    sanction: { dmi: 0, credifin: 0, unit: 'Sanctioned' },
    disbursement: { dmi: 0, credifin: 0, unit: 'Disbursed' }
  });
  const [weekOffset, setWeekOffset] = useState(0); 
  const [monthOffset, setMonthOffset] = useState(0); 
  const [activeGraph, setActiveGraph] = useState(null); // 'login', 'sanction', 'disbursement' or null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (allLeads.length > 0) {
      calculateMetrics();
    }
  }, [allLeads, weekOffset, monthOffset]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('swayamfin_token');
      if (!token) throw new Error('Session expired.');

      const res = await axios.get(`${API_URL}/api/leads`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setAllLeads(res.data.data || []);
    } catch (err) {
      setError(err.message || 'Transmission error.');
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = () => {
    // 1. Calculate Monthly KPIs based on monthOffset
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() - monthOffset);
    const targetMonth = targetDate.getMonth();
    const targetYear = targetDate.getFullYear();

    const monthlyLeads = allLeads.filter(l => {
      const d = new Date(l.createdAt);
      return d.getMonth() === targetMonth && d.getFullYear() === targetYear;
    });

    const activeLeads = monthlyLeads.filter(l => !['Disbursed', 'Dead Lead', 'Closed - Won'].includes(l.status));
    const dmiLeads = monthlyLeads.filter(l => l.case_under_company === 'DMI');
    const credifinLeads = monthlyLeads.filter(l => l.case_under_company === 'Credifin');
    
    const pipeline = activeLeads.reduce((sum, l) => sum + (Number(l.loan_amount_required) || 0), 0);
    const disbursed = monthlyLeads.filter(l => l.status === 'Disbursed' || l.disbursement === true).reduce((sum, l) => sum + (Number(l.disbursed_amount) || Number(l.loan_amount_required) || 0), 0);
    const sanctioned = monthlyLeads.filter(l => 
      ['Under Sanction', 'Under Disbursement', 'Disbursed'].includes(l.status) || l.sanction === true
    ).reduce((sum, l) => sum + (Number(l.sanction_amount) || Number(l.loan_amount_required) || 0), 0);

    setStats({
      totalActive: activeLeads.length,
      casesDMI: dmiLeads.length,
      casesCredifin: credifinLeads.length,
      pipelineValue: pipeline,
      disbursementValue: disbursed,
      sanctionedValue: sanctioned,
    });

    // 2. Calculate Graph Data (Last 7 Days from weekOffset) for different metrics
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i) - (weekOffset * 7));
      return d.toISOString().split('T')[0];
    });

    const generateGraphData = (dateField, valueField = null) => {
      return last7Days.map(date => {
        const dayLeads = allLeads.filter(l => l[dateField]?.startsWith(date));
        
        let dmi, credifin;
        if (valueField) {
           dmi = dayLeads.filter(l => l.partner_login === 'DMI').reduce((sum, l) => sum + (Number(l[valueField]) || Number(l.loan_amount_required) || 0), 0);
           credifin = dayLeads.filter(l => l.partner_login === 'Credifin').reduce((sum, l) => sum + (Number(l[valueField]) || Number(l.loan_amount_required) || 0), 0);
        } else {
           dmi = dayLeads.filter(l => l.partner_login === 'DMI').length;
           credifin = dayLeads.filter(l => l.partner_login === 'Credifin').length;
        }

        return {
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          dmi,
          credifin,
          total: dmi + credifin
        };
      });
    };

    setGraphs({
      login: generateGraphData('createdAt'),
      sanction: generateGraphData('sanction_date', 'sanction_amount'),
      disbursement: generateGraphData('disbursement_date', 'disbursed_amount')
    });

    // 3. Calculate Monthly Totals for Partner Cards
    const calcMonthlyTotal = (leads, amountField) => {
      const dmi = leads.filter(l => l.partner_login === 'DMI').reduce((sum, l) => sum + (Number(l[amountField]) || 0), 0);
      const credifin = leads.filter(l => l.partner_login === 'Credifin').reduce((sum, l) => sum + (Number(l[amountField]) || 0), 0);
      return { dmi, credifin };
    };

    setGraphMeta({
      login: { ...calcMonthlyTotal(monthlyLeads, 'fees'), unit: 'Fees' },
      sanction: { ...calcMonthlyTotal(monthlyLeads.filter(l => l.status === 'Disbursed' || l.status === 'Under Sanction' || l.status === 'Under Disbursement'), 'sanction_amount'), unit: 'Sanctioned' },
      disbursement: { ...calcMonthlyTotal(monthlyLeads.filter(l => l.status === 'Disbursed'), 'disbursed_amount'), unit: 'Disbursed' }
    });
  };

  if (loading) return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-4">
       <div className="w-12 h-12 border-4 border-[#0EA5E9]/20 border-t-[#0EA5E9] rounded-full animate-spin" />
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Initializing Core...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center space-y-6">
       <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-2xl">!</div>
       <div className="space-y-2">
         <h2 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">System Outage</h2>
         <p className="text-slate-500 text-sm font-medium italic max-w-md">{error}</p>
       </div>
       <button onClick={fetchStats} className="btn-primary py-3 px-8 text-xs">Reconnect Node</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 px-4 md:px-8 lg:px-12 pt-24 md:pt-32 pb-32">
      <div className="max-w-7xl mx-auto">
        <AdminTabs />
        
        {/* Business Overview Header & Month Filter */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-12 px-2 gap-6">
            <div>
                <h1 className="text-4xl md:text-5xl font-black text-[#1E293B] tracking-tighter uppercase leading-none">
                  Business <span className="text-[#0EA5E9] italic">Overview.</span>
                </h1>
            </div>
            
            <div className="flex items-center gap-4 bg-white border border-slate-100 p-2 rounded-[24px] shadow-sm">
                <button 
                  onClick={() => setMonthOffset(prev => prev + 1)}
                  className="w-10 h-10 rounded-full hover:bg-slate-50 flex items-center justify-center transition-all text-slate-400 hover:text-[#0EA5E9]"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-3 px-4 py-2 bg-[#0EA5E9]/5 rounded-[18px] text-[10px] font-black text-[#0EA5E9] uppercase tracking-[0.2em]">
                  <Calendar size={14} />
                  {new Date(new Date().setMonth(new Date().getMonth() - monthOffset)).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </div>
                <button 
                  onClick={() => setMonthOffset(prev => Math.max(0, prev - 1))}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${monthOffset === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-slate-50 text-slate-400 hover:text-[#0EA5E9]'}`}
                  disabled={monthOffset === 0}
                >
                  <ChevronRight size={20} />
                </button>
            </div>
        </div>

        {/* Business Overview KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           <OverviewCard 
            title="Total Active cases" 
            value={stats.totalActive} 
            footer="View Login velocity"
            onClick={() => setActiveGraph('login')}
           />
           <OverviewCard 
            title="Cases Under DMI" 
            value={stats.casesDMI} 
            footer="View performance"
            onClick={() => setActiveGraph('login')}
           />
           <OverviewCard 
            title="Cases under credifin" 
            value={stats.casesCredifin} 
            footer="View aggregation"
            onClick={() => setActiveGraph('login')}
           />
           
           <OverviewCard title="Pipeline" value={`₹${stats.pipelineValue.toLocaleString('en-IN')}`} isAmount />
           <OverviewCard 
            title="Disbursement" 
            value={`₹${stats.disbursementValue.toLocaleString('en-IN')}`} 
            isAmount 
            footer="View Graph"
            onClick={() => setActiveGraph('disbursement')}
           />
           <OverviewCard 
            title="Sanctioned" 
            value={`₹${stats.sanctionedValue.toLocaleString('en-IN')}`} 
            isAmount 
            footer="View Graph"
            onClick={() => setActiveGraph('sanction')}
           />
        </div>

        <AnimatePresence>
          {activeGraph && (
             <motion.div
               key={activeGraph}
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               exit={{ opacity: 0, height: 0 }}
               className="overflow-hidden"
             >
               <TrendGraph 
                title={activeGraph === 'login' ? 'Login Velocity' : activeGraph === 'sanction' ? 'Sanctioned Trend' : 'Disbursement Volume'}
                subtitle={activeGraph === 'login' ? 'Day-wise performance spectrum' : 'Historical milestone achievement'}
                data={graphs[activeGraph]} 
                dmiTotal={graphMeta[activeGraph].dmi}
                credifinTotal={graphMeta[activeGraph].credifin}
                unit={graphMeta[activeGraph].unit}
                onPrevWeek={() => setWeekOffset(prev => prev + 1)}
                onNextWeek={() => setWeekOffset(prev => Math.max(0, prev - 1))}
                isCurrentWeek={weekOffset === 0}
               />
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const OverviewCard = ({ title, value, isAmount, footer, onClick }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    onClick={onClick}
    className={`bg-white border border-slate-100 p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all group ${onClick ? 'cursor-pointer' : ''}`}
  >
    <div className="space-y-4">
      <p className="text-[12px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
      <h3 className={`font-black text-[#1E293B] tracking-tighter leading-none ${isAmount ? 'text-2xl' : 'text-5xl'}`}>
        {value}
      </h3>
      {footer && (
        <div className="pt-4 mt-4 border-t border-slate-50 flex justify-between items-center">
           <span className="text-[10px] font-black text-[#0EA5E9] uppercase tracking-widest">{footer}</span>
           <ChevronRight size={14} className="text-[#0EA5E9] group-hover:translate-x-1 transition-all" />
        </div>
      )}
    </div>
  </motion.div>
);

export default AdminDashboard;
