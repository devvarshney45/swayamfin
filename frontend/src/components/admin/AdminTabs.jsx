import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const tabs = [
    { name: 'Analytics', path: '/admin/dashboard' },
    { name: 'Repository', path: '/admin/leads' },
    { name: 'Core Team', path: '/admin/agents' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/agent/login');
  };

  return (
    <div className="flex items-center justify-between border-b border-slate-100 mb-10 overflow-x-auto no-scrollbar pb-1 gap-3">
      <div className="flex gap-2 sm:gap-4">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`px-4 sm:px-8 py-4 sm:py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] transition-all border-b-2 whitespace-nowrap ${
                isActive 
                  ? 'text-[#0EA5E9] border-[#0EA5E9]' 
                  : 'text-slate-400 border-transparent hover:text-slate-900 hover:border-slate-200'
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>

      <button 
        onClick={handleLogout}
        className="shrink-0 px-4 sm:px-8 py-3 sm:py-5 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
      >
        Exit Portal
      </button>
    </div>
  );
};

export default AdminTabs;
