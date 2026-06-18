import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TrendGraph = ({ title, subtitle, data, onPrevWeek, onNextWeek, isCurrentWeek }) => {
  return (
    <div className="bg-white border border-slate-100 p-8 rounded-[48px] shadow-sm mb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h2 className="text-2xl font-black text-[#1E293B] uppercase tracking-tight">{title}</h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">{subtitle}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-6">
           <div className="flex items-center gap-4 bg-slate-50/50 p-2 rounded-[20px] order-2 md:order-1">
              <button 
                onClick={onPrevWeek}
                className="w-8 h-8 rounded-full hover:bg-white hover:shadow-sm flex items-center justify-center transition-all text-slate-400 hover:text-[#0EA5E9]"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Cycle Navigation</span>
              <button 
                onClick={onNextWeek}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isCurrentWeek ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white hover:shadow-sm text-slate-400 hover:text-[#0EA5E9]'}`}
                disabled={isCurrentWeek}
              >
                <ChevronRight size={16} />
              </button>
           </div>

           <div className="flex gap-4 order-1 md:order-2">
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0EA5E9]" />
                <span className="text-[10px] font-black text-slate-400 uppercase">Total</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase">DMI</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-black text-slate-400 uppercase">Credifin</span>
             </div>
           </div>
        </div>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 800 }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94A3B8', fontSize: 10, fontWeight: 800 }}
            />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '24px', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                padding: '20px'
              }}
              labelStyle={{ fontWeight: 900, marginBottom: '8px', color: '#1E293B', textTransform: 'uppercase', fontSize: '10px' }}
            />
            <Line 
              type="monotone" 
              dataKey="total" 
              stroke="#0EA5E9" 
              strokeWidth={4}
              dot={{ r: 6, fill: '#0EA5E9', strokeWidth: 2, stroke: '#fff' }}
              activeDot={{ r: 8, strokeWidth: 0 }}
            />
            <Line 
              type="monotone" 
              dataKey="dmi" 
              stroke="#F43F5E" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#F43F5E', strokeWidth: 2, stroke: '#fff' }}
            />
            <Line 
              type="monotone" 
              dataKey="credifin" 
              stroke="#10B981" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendGraph;
