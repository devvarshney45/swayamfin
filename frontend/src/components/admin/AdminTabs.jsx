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
    { name: 'Team Members', path: '/admin/agents' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/agent/login');
  };

  return (
    <div className="border-b border-slate-100 mb-10 pb-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-2 sm:gap-4 min-w-max">
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
        </div>

        <div className="flex sm:block">
          <button 
            onClick={handleLogout}
            className="w-full sm:w-auto shrink-0 px-4 sm:px-8 py-3 sm:py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-rose-500 border border-rose-100 hover:bg-rose-50 rounded-lg transition-all"
          >
            Exit Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminTabs;
