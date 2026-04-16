import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Plus, 
  Trash2, 
  UserPlus, 
  Building2, 
  Mail, 
  Shield, 
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const AdminAgents = () => {
  const [agents, setAgents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', branch: '', role: 'Agent' });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('swayamfin_token');
      const headers = { Authorization: `Bearer ${token}` };
      const [agentsRes, branchesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/users`, { headers }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/branches`, { headers })
      ]);
      setAgents(agentsRes.data.data);
      setBranches(branchesRes.data.data);
    } catch (err) {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('swayamfin_token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotification({ type: 'success', message: 'Agent added successfully!' });
      setShowModal(false);
      setFormData({ name: '', email: '', password: '', branch: '', role: 'Agent' });
      fetchData();
    } catch (err) {
      setNotification({ type: 'error', message: err.response?.data?.message || 'Failed to add agent' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this agent?')) return;
    try {
      const token = localStorage.getItem('swayamfin_token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotification({ type: 'success', message: 'Agent removed' });
      fetchData();
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to delete' });
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1 flex items-center gap-3">
              <Users className="text-primary-blue w-8 h-8" />
              Agent Network
            </h1>
            <p className="text-slate-500 font-medium italic">Manage your team and branch assignments.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-primary-blue text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-primary-blue/20 hover:scale-105 transition-all"
          >
            <Plus className="w-5 h-5" /> Add New Agent
          </button>
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-8 p-4 rounded-xl flex items-center gap-3 font-bold text-sm ${notification.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}
            >
              {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {notification.message}
              <button className="ml-auto" onClick={() => setNotification(null)}><X className="w-4 h-4" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agents.map((agent, i) => (
            <motion.div
              key={agent._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-[32px] p-8 shadow-fintech border border-slate-100 group relative hover:border-primary-blue transition-all"
            >
              <button 
                onClick={() => handleDelete(agent._id)}
                className="absolute top-6 right-6 p-2 text-slate-300 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all active:scale-95"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6 group-hover:bg-primary-blue group-hover:text-white transition-all">
                <Shield className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-1">{agent.name}</h3>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-bold mb-6 italic">
                <Building2 className="w-4 h-4" />
                {agent.branch?.name || 'No Branch'}
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3 text-slate-500 font-medium">
                  <Mail className="w-4 h-4 text-slate-300" />
                  <span className="text-xs truncate">{agent.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 font-medium">
                  <UserPlus className="w-4 h-4 text-slate-300" />
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded ${agent.role === 'Admin' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                    {agent.role}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
                onClick={() => setShowModal(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[40px] shadow-2xl z-[101] p-10 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-blue/5 rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <h2 className="text-2xl font-extrabold text-slate-900 mb-8">Add New Personnel</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5 relative">
                  <div>
                    <label className="text-xs font-extra-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Full Name</label>
                    <input 
                      required
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:shadow-lg focus:bg-white rounded-2xl transition-all outline-none font-bold"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="E.g. Vikrant Prasad"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-extra-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
                    <input 
                      required
                      type="email"
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:shadow-lg focus:bg-white rounded-2xl transition-all outline-none font-bold"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="it@swayamfin.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-extra-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Password</label>
                    <input 
                      required
                      type="password"
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:shadow-lg focus:bg-white rounded-2xl transition-all outline-none font-bold"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-extra-bold text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Assign Branch</label>
                    <select 
                      required
                      className="w-full px-5 py-4 bg-slate-50 border-2 border-transparent focus:border-primary-blue focus:shadow-lg focus:bg-white rounded-2xl transition-all outline-none font-bold appearance-none"
                      value={formData.branch}
                      onChange={e => setFormData({...formData, branch: e.target.value})}
                    >
                      <option value="">Select a Branch</option>
                      {branches.map(b => (
                        <option key={b._id} value={b._id}>{b.name} - {b.city}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="pt-4 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-50 rounded-2xl transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-4 bg-primary-blue text-white font-extrabold rounded-2xl shadow-xl shadow-primary-blue/20 hover:scale-105 transition-all"
                    >
                      Confirm Add
                    </button>
                  </div>
                </form>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AdminAgents;
