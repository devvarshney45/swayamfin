import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Database } from 'lucide-react';

const AdminTabs = () => {
  const location = useLocation();
  
  const tabs = [
    { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Leads Repository', path: '/admin/leads', icon: Database },
    { name: 'Team Management', path: '/admin/agents', icon: Users },
  ];

  return (
    <div className="flex gap-1 border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex items-center gap-2 px-5 py-3.5 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
              isActive 
                ? 'text-blue-600 border-blue-600 bg-blue-50' 
                : 'text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
};

export default AdminTabs;
