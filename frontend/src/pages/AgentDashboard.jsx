import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, CheckCircle, Clock, Search, ChevronRight, LogOut, Mail, MapPin, CheckCircle2 } from 'lucide-react';

const AgentDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch leads from backend
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem('swayamfin_token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/leads/today`, {
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });
        const result = await response.json();
        if (result.success) {
          setLeads(result.data);
        }
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('swayamfin_token');
    localStorage.removeItem('swayamfin_user');
    window.location.href = '/agent/login';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Fresh': return 'bg-blue-100 text-primary-darkBlue';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Qualified': return 'bg-green-100 text-success-green';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('swayamfin_token');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/leads/${id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setLeads(leads.map(l => l._id === id ? { ...l, status: newStatus } : l));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-0">
      {/* Mobile-First Header */}
      <div className="bg-primary-darkBlue text-white pt-10 pb-6 px-4 rounded-b-[24px] shadow-md sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">Agent Portal</h1>
            <p className="text-primary-lightBlue text-sm">Welcome back, Agent</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-10 h-10 rounded-full bg-red-500/20 text-white flex justify-center items-center font-bold shadow-inner hover:bg-red-500 transition-colors"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="relative mt-2">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search leads by name or number..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-blue"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-primary-blue" />
          Today's Leads ({leads.length})
        </h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-blue"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead, idx) => (
              <motion.div 
                key={lead._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-fintech p-4 shadow-fintech border border-gray-100 flex flex-col gap-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-900">{lead.fullName}</h3>
                    <div className="flex flex-col gap-1 mt-1">
                      <p className="text-sm text-gray-500 font-medium">{lead.loanType} • ₹{(lead.amount/100000).toFixed(1)}L</p>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
                        <MapPin className="w-3 h-3" /> {lead.city}
                        {lead.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3 ml-1" /> {lead.email}</span>}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>

                <div className="flex justify-between border-t border-gray-100 pt-3 mt-1 items-center">
                  <div className="flex gap-2">
                    <a href={`tel:${lead.mobile}`} className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg transition">
                      <Phone className="w-4 h-4 mr-1"/> Call
                    </a>
                    <button 
                      onClick={() => updateStatus(lead._id, 'Qualified')}
                      disabled={lead.status === 'Qualified'}
                      className={`flex items-center justify-center px-3 py-2 rounded-lg transition ${
                        lead.status === 'Qualified' 
                          ? 'bg-green-100 text-success-green cursor-default' 
                          : 'bg-green-50 hover:bg-green-100 text-success-green'
                      }`}
                    >
                      {lead.status === 'Qualified' ? <CheckCircle2 className="w-4 h-4 mr-1"/> : <CheckCircle className="w-4 h-4 mr-1"/>}
                      {lead.status === 'Qualified' ? 'Qualified' : 'Qualify'}
                    </button>
                  </div>
                  <button className="text-gray-400 hover:text-primary-blue transition">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
};

export default AgentDashboard;
