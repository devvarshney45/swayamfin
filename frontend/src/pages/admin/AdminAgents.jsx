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
  AlertCircle,
  Pencil,
  Phone,
  Hash
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import AdminTabs from '../../components/admin/AdminTabs';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const AdminAgents = () => {
  const { isDark } = useTheme();
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ 
    full_name: '', 
    email: '', 
    password_hash: '', 
    phone: '',
    employee_code: '',
    branch_id: '', 
    role: 'sales_person' 
  });
  const [notification, setNotification] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('swayamfin_token');
      const headers = { Authorization: `Bearer ${token}` };
      const [usersRes, branchesRes] = await Promise.all([
        axios.get(`${API_URL}/api/users`, { headers }),
        axios.get(`${API_URL}/api/branches`, { headers })
      ]);
      setUsers(usersRes.data.data);
      setBranches(branchesRes.data.data);
    } catch (err) {
      console.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setEditMode(true);
    setEditingId(user._id);
    setFormData({
      full_name: user.full_name,
      email: user.email,
      password_hash: '',
      phone: user.phone || '',
      employee_code: user.employee_code || '',
      branch_id: user.branch_id?._id || '',
      role: user.role
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('swayamfin_token');
      const headers = { Authorization: `Bearer ${token}` };
      
      const payload = { ...formData };
      if (editMode && !payload.password_hash) {
        delete payload.password_hash;
      }

      if (editMode) {
        await axios.put(`${API_URL}/api/users/${editingId}`, payload, { headers });
        setNotification({ type: 'success', message: 'User updated successfully!' });
      } else {
        await axios.post(`${API_URL}/api/users`, payload, { headers });
        setNotification({ type: 'success', message: 'User added successfully!' });
      }
      
      setShowModal(false);
      setEditMode(false);
      setEditingId(null);
      setFormData({ 
        full_name: '', 
        email: '', 
        password_hash: '', 
        phone: '',
        employee_code: '',
        branch_id: '', 
        role: 'sales_person' 
      });
      fetchData();
    } catch (err) {
      setNotification({ type: 'error', message: err.response?.data?.message || 'Action failed' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this user?')) return;
    try {
      const token = localStorage.getItem('swayamfin_token');
      await axios.delete(`${API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotification({ type: 'success', message: 'User removed' });
      fetchData();
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to delete' });
    }
  };

  if (loading) return (
    <div className={`min-h-screen ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} flex items-center justify-center`}>
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-800'} p-4 md:p-8 font-inter transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <AdminTabs />
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
             <div className={`${isDark ? 'bg-blue-500/20' : 'bg-gradient-to-tr from-blue-600 to-indigo-500'} rounded-2xl p-4 shadow-xl border ${isDark ? 'border-blue-500/30' : 'border-blue-700/10'}`}>
                <Users className={`w-7 h-7 ${isDark ? 'text-blue-400' : 'text-white'}`} />
             </div>
             <div>
                <h1 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} uppercase tracking-tight`}>User Management</h1>
                <p className={`${isDark ? 'text-slate-500' : 'text-slate-500'} text-xs font-bold uppercase tracking-widest mt-1`}>Manage Sales, BSM, HR & Admins</p>
             </div>
          </div>
          <button 
            onClick={() => {
              setEditMode(false);
              setFormData({ 
                full_name: '', 
                email: '', 
                password_hash: '', 
                phone: '',
                employee_code: '',
                branch_id: '', 
                role: 'sales_person' 
              });
              setShowModal(true);
            }}
            className="group bg-blue-600 text-white px-10 py-4 rounded-[24px] font-black flex items-center gap-3 shadow-2xl shadow-blue-500/20 hover:bg-blue-500 hover:scale-[1.02] active:scale-95 transition-all uppercase tracking-[0.2em] text-[10px]"
          >
            <Plus className="w-5 h-5" /> Create New User
          </button>
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-8 p-5 rounded-3xl flex items-center gap-4 font-black uppercase tracking-widest text-[10px] border shadow-xl ${notification.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}
            >
              {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5 shadow-[0_0_10px_rgba(16,185,129,0.5)]" /> : <AlertCircle className="w-5 h-5 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />}
              {notification.message}
              <button className="ml-auto opacity-50 hover:opacity-100" onClick={() => setNotification(null)}><X className="w-4 h-4" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((u, i) => (
            <motion.div
              key={u._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`${isDark ? 'bg-white/5 border-white/5 shadow-2xl' : 'bg-white border-slate-200 shadow-sm'} rounded-[40px] p-8 border group relative hover:shadow-2xl transition-all h-full flex flex-col`}
            >
              <div className="absolute top-8 right-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => handleEdit(u)}
                  className={`${isDark ? 'bg-white/5 hover:bg-blue-500/20' : 'bg-slate-50 hover:bg-blue-50'} p-3 rounded-2xl text-slate-500 hover:text-blue-500 transition-all border ${isDark ? 'border-white/5' : 'border-slate-100'}`}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(u._id)}
                  className={`${isDark ? 'bg-white/5 hover:bg-rose-500/20' : 'bg-slate-50 hover:bg-rose-50'} p-3 rounded-2xl text-slate-500 hover:text-rose-500 transition-all border ${isDark ? 'border-white/5' : 'border-slate-100'}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className={`${isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-slate-50 text-slate-400 border-slate-100'} w-16 h-16 rounded-[24px] flex items-center justify-center mb-6 group-hover:scale-110 transition-all border`}>
                <Shield className="w-8 h-8" />
              </div>
              
              <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-2`}>{u.full_name}</h3>
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6">
                <Building2 className="w-4 h-4 text-blue-500" />
                {u.branch_id?.name || 'Global Access'}
              </div>

              <div className={`space-y-4 pt-6 border-t ${isDark ? 'border-white/5' : 'border-slate-100'} mt-auto`}>
                <div className="flex items-center gap-3 text-slate-500 font-bold">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-[11px] truncate uppercase tracking-tight">{u.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 font-bold">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-[11px] uppercase tracking-tight">{u.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 font-bold">
                  <Hash className="w-4 h-4 text-slate-400" />
                  <span className="text-[11px] uppercase tracking-tight">{u.employee_code}</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border shadow-sm ${
                    u.role === 'admin' ? (isDark ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-50 text-purple-700 border-purple-200') : 
                    u.role === 'bsm' ? (isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border-indigo-200') : 
                    u.role === 'hr' ? (isDark ? 'bg-pink-500/20 text-pink-400 border-pink-500/20' : 'bg-pink-50 text-pink-700 border-pink-200') :
                    (isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200')
                  }`}>
                    {u.role.replace('_', ' ')}
                  </span>
                  {u.is_active && (
                    <span className="text-[10px] font-black bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">Active</span>
                  )}
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
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100]"
                onClick={() => setShowModal(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg ${isDark ? 'bg-[#0B0F19] border-white/10' : 'bg-white border-slate-200 shadow-2xl'} border rounded-[48px] z-[101] p-10 overflow-hidden shadow-2xl transition-all`}
              >
                <div className={`absolute top-0 right-0 w-48 h-48 ${isDark ? 'bg-blue-600/10' : 'bg-blue-600/5'} rounded-full translate-x-1/2 -translate-y-1/2 blur-2xl`} />
                
                <h2 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-10 uppercase tracking-tight`}>
                  {editMode ? 'Update Credentials' : 'Create New Personnel'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Full Name</label>
                      <input 
                        required
                        className={`w-full px-5 py-4 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-inner'} focus:border-blue-500 rounded-2xl transition-all outline-none font-bold text-sm`}
                        value={formData.full_name}
                        onChange={e => setFormData({...formData, full_name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Email Address</label>
                      <input 
                        required
                        type="email"
                        className={`w-full px-5 py-4 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-inner'} focus:border-blue-500 rounded-2xl transition-all outline-none font-bold text-sm`}
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Mobile Phone</label>
                      <input 
                        required
                        className={`w-full px-5 py-4 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-inner'} focus:border-blue-500 rounded-2xl transition-all outline-none font-bold text-sm`}
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Staff Code</label>
                      <input 
                        required
                        className={`w-full px-5 py-4 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-inner'} focus:border-blue-500 rounded-2xl transition-all outline-none font-bold text-sm`}
                        value={formData.employee_code}
                        onChange={e => setFormData({...formData, employee_code: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Access Role</label>
                      <select 
                        required
                        className={`w-full px-5 py-4 ${isDark ? 'bg-[#111827] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-inner'} focus:border-blue-500 rounded-2xl outline-none font-bold text-sm appearance-none cursor-pointer`}
                        value={formData.role}
                        onChange={e => setFormData({...formData, role: e.target.value})}
                      >
                        <option value="sales_person">Sales Executive</option>
                        <option value="hr">Human Resources</option>
                        <option value="bsm">Branch Manager</option>
                        <option value="admin">Super Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Branch Hub</label>
                      <select 
                        required={formData.role !== 'admin'}
                        disabled={formData.role === 'admin'}
                        className={`w-full px-5 py-4 ${isDark ? 'bg-[#111827] border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-inner'} focus:border-blue-500 rounded-2xl outline-none font-bold text-sm appearance-none disabled:opacity-20 cursor-pointer`}
                        value={formData.branch_id}
                        onChange={e => setFormData({...formData, branch_id: e.target.value})}
                      >
                        <option value="">Select Branch</option>
                        {branches.map(b => (
                          <option key={b._id} value={b._id}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{editMode ? 'Update Security Key (Optional)' : 'Security Key'}</label>
                     <input 
                       required={!editMode}
                       type="password"
                       className={`w-full px-5 py-4 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900 shadow-inner'} focus:border-blue-500 rounded-2xl transition-all outline-none font-bold text-sm`}
                       value={formData.password_hash}
                       onChange={e => setFormData({...formData, password_hash: e.target.value})}
                     />
                  </div>
                  
                  <div className="pt-8 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setShowModal(false)}
                      className={`flex-1 py-4 ${isDark ? 'text-slate-400 hover:bg-white/5 border-white/10' : 'text-slate-600 hover:bg-slate-100 border-slate-200'} font-bold rounded-2xl transition-all border`}
                    >
                      Dismiss
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-500/30 hover:bg-blue-500 transition-all uppercase tracking-widest text-[10px]"
                    >
                      {editMode ? 'Update Profile' : 'Authorize User'}
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
