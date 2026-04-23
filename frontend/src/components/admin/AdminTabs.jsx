import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Database } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AdminTabs = () => {
  const location = useLocation();
  const { isDark } = useTheme();
  
  const tabs = [
    { name: 'Analytics', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Repository', path: '/admin/leads', icon: Database },
    { name: 'Core Team', path: '/admin/agents', icon: Users },
  ];

  return (
    <div className={`flex gap-2 md:gap-4 border-b ${isDark ? 'border-white/5' : 'border-slate-100'} mb-8 md:mb-10 overflow-x-auto no-scrollbar pb-1 px-1`}>
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex items-center gap-2.5 px-6 py-4 text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap rounded-t-xl group ${
              isActive 
                ? `${isDark ? 'text-blue-500 border-blue-500 bg-blue-500/10' : 'text-blue-600 border-blue-600 bg-blue-50/50'}` 
                : `${isDark ? 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-white/5' : 'text-slate-500 border-transparent hover:text-slate-900 hover:bg-slate-100'}`
            }`}
          >
            <tab.icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-500' : 'text-slate-500'}`} />
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
};

export default AdminTabs;
