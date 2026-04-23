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
  Hash,
  Search,
  Filter,
  UserCheck
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
  const [searchTerm, setSearchTerm] = useState('');
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
        setNotification({ type: 'success', message: 'Credentials updated successfully!' });
      } else {
        await axios.post(`${API_URL}/api/users`, payload, { headers });
        setNotification({ type: 'success', message: 'New member onboarded!' });
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
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({ type: 'error', message: err.response?.data?.message || 'Access violation' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to revoke access?')) return;
    try {
      const token = localStorage.getItem('swayamfin_token');
      await axios.delete(`${API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotification({ type: 'success', message: 'Access revoked' });
      fetchData();
      setTimeout(() => setNotification(null), 3000);
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to delete' });
    }
  };

  const filteredUsers = users.filter(u => 
    u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className={`min-h-screen ${isDark ? 'bg-[#020617]' : 'bg-[#F8FAFC]'} flex items-center justify-center`}>
      <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#020617] text-white' : 'bg-[#F8FAFC] text-slate-800'} p-4 md:p-12 pt-32 md:pt-40 font-inter transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto">
        <AdminTabs />
        
        {/* Header - Premium Styled */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="flex items-center gap-6">
             <div className="relative">
                <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-20 scale-125" />
                <div className={`${isDark ? 'bg-white/5 border-white/10 shadow-2xl shadow-black/50' : 'bg-blue-600 border-blue-700 shadow-xl shadow-blue-600/30'} rounded-[24px] p-5 border relative z-10 hover:scale-105 transition-transform`}>
                   <Users className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-white'}`} />
                </div>
             </div>
             <div>
                <h1 className={`text-4xl font-black ${isDark ? 'text-white' : 'text-slate-900'} tracking-tighter uppercase mb-1`}>Personnel Directory</h1>
                <p className={`${isDark ? 'text-slate-500' : 'text-slate-500'} text-[11px] font-black uppercase tracking-[0.3em]`}>Global Workforce Governance</p>
             </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64 group">
               <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'} group-focus-within:text-blue-500 transition-colors`} />
               <input 
                 type="text" 
                 placeholder="Filter directory..."
                 className={`w-full pl-11 pr-4 py-4 ${isDark ? 'bg-white/5 border-white/5 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'} rounded-2xl border text-xs font-black outline-none focus:border-blue-500 transition-all`}
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
               />
            </div>
            <button 
              onClick={() => {
                setEditMode(false);
                setFormData({ 
                  full_name: '', email: '', password_hash: '', phone: '', employee_code: '', branch_id: '', role: 'sales_person' 
                });
                setShowModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-blue-600/30 active:scale-95 transition-all uppercase tracking-widest text-[11px]"
            >
              <UserPlus className="w-5 h-5" /> Onboard Human Capital
            </button>
          </div>
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`mb-10 p-6 rounded-[32px] flex items-center gap-4 font-black uppercase tracking-widest text-[10px] border shadow-2xl ${notification.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}
            >
              {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {notification.message}
              <button className="ml-auto opacity-50 hover:opacity-100" onClick={() => setNotification(null)}><X className="w-4 h-4" /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* User Intelligence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUsers.map((u, i) => (
            <motion.div
              key={u._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`${isDark ? 'bg-white/2 border-white/5 shadow-2xl shadow-black/50 hover:bg-white/5' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/50 hover:border-blue-400'} rounded-[48px] p-8 border group relative transition-all h-full flex flex-col hover:scale-[1.02]`}
            >
              <div className="absolute top-8 right-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <button 
                  onClick={() => handleEdit(u)}
                  className={`${isDark ? 'bg-white/5 hover:bg-blue-500/20 text-slate-500' : 'bg-slate-50 hover:bg-blue-50 text-slate-400'} p-3 rounded-xl hover:text-blue-500 transition-all border ${isDark ? 'border-white/10' : 'border-slate-100'}`}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(u._id)}
                  className={`${isDark ? 'bg-white/5 hover:bg-rose-500/20 text-slate-500' : 'bg-slate-50 hover:bg-rose-50 text-slate-400'} p-3 rounded-xl hover:text-rose-500 transition-all border ${isDark ? 'border-white/10' : 'border-slate-100'}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className={`${isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-slate-50 text-slate-300 border-slate-100'} w-14 h-14 rounded-[22px] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border`}>
                <Shield className="w-7 h-7" />
              </div>
              
              <h3 className={`text-2xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-2 tracking-tight`}>{u.full_name}</h3>
              <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                <Building2 className="w-4 h-4" />
                {u.branch_id?.name || 'Central Command'}
              </div>

              <div className={`space-y-4 pt-6 border-t ${isDark ? 'border-white/5' : 'border-slate-100'} mt-auto`}>
                <div className="flex items-center gap-3 ${isDark ? 'text-slate-400' : 'text-slate-500'} font-bold">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-[11px] truncate uppercase tracking-tight opacity-70">{u.email}</span>
                </div>
                <div className="flex items-center gap-3 ${isDark ? 'text-slate-400' : 'text-slate-500'} font-bold">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span className="text-[11px] uppercase tracking-tight opacity-70">{u.phone}</span>
                </div>
                <div className="flex items-center gap-3 ${isDark ? 'text-slate-400' : 'text-slate-500'} font-bold">
                  <Hash className="w-4 h-4 text-slate-400" />
                  <span className="text-[11px] uppercase tracking-tight opacity-70">{u.employee_code}</span>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border shadow-sm ${
                    u.role === 'admin' ? (isDark ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-indigo-600 text-white border-indigo-700') : 
                    u.role === 'bsm' ? (isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-amber-100 text-amber-700 border-amber-200') : 
                    (isDark ? 'bg-white/10 text-slate-400 border-white/20' : 'bg-slate-100 text-slate-700 border-slate-200')
                  }`}>
                    {u.role.replace('_', ' ')}
                  </span>
                  {u.is_active && (
                    <span className="text-[9px] font-black bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-4 py-2 rounded-xl uppercase tracking-widest shadow-sm flex items-center gap-1.5">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal - High Contrast Reset */}
        <AnimatePresence>
          {showModal && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#020617]/95 backdrop-blur-xl z-[100]" onClick={() => setShowModal(false)} />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl ${isDark ? 'bg-[#0B0F19] border-white/10' : 'bg-white border-slate-100 shadow-2xl shadow-black/50'} border rounded-[60px] z-[101] p-12 transition-all overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50" />
                
                <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-slate-900'} mb-10 uppercase tracking-tighter`}>
                  {editMode ? 'Modify Clearance' : 'Agent Commissioning'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Full Legal Name</label>
                      <input 
                        required
                        className={`w-full px-6 py-4 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-100 text-slate-900 shadow-inner'} focus:border-blue-500 rounded-2xl transition-all outline-none font-bold text-sm`}
                        value={formData.full_name}
                        onChange={e => setFormData({...formData, full_name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Officer Email</label>
                      <input 
                        required
                        type="email"
                        className={`w-full px-6 py-4 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-100 text-slate-900 shadow-inner'} focus:border-blue-500 rounded-2xl transition-all outline-none font-bold text-sm`}
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Direct Mobile</label>
                      <input 
                        required
                        className={`w-full px-6 py-4 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-100 text-slate-900 shadow-inner'} focus:border-blue-500 rounded-2xl transition-all outline-none font-bold text-sm`}
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Staff Code (Unique)</label>
                      <input 
                        required
                        className={`w-full px-6 py-4 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-100 text-slate-900 shadow-inner'} focus:border-blue-500 rounded-2xl transition-all outline-none font-bold text-sm`}
                        value={formData.employee_code}
                        onChange={e => setFormData({...formData, employee_code: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Access Role</label>
                      <select 
                        required
                        className={`w-full px-6 py-4 ${isDark ? 'bg-[#111827] border-white/10 text-white' : 'bg-slate-50 border-slate-100 text-slate-900 shadow-inner'} focus:border-blue-500 rounded-2xl outline-none font-bold text-sm appearance-none cursor-pointer`}
                        value={formData.role}
                        onChange={e => setFormData({...formData, role: e.target.value})}
                      >
                        <option value="sales_person">Strategic Sales Person</option>
                        <option value="bsm">Branch Sales Manager</option>
                        <option value="admin">Global Administrator</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1 block">Strategic Hub</label>
                      <select 
                        required={formData.role !== 'admin'}
                        disabled={formData.role === 'admin'}
                        className={`w-full px-6 py-4 ${isDark ? 'bg-[#111827] border-white/10 text-white' : 'bg-slate-50 border-slate-100 text-slate-900 shadow-inner'} focus:border-blue-500 rounded-2xl outline-none font-bold text-sm appearance-none disabled:opacity-20 cursor-pointer`}
                        value={formData.branch_id}
                        onChange={e => setFormData({...formData, branch_id: e.target.value})}
                      >
                        <option value="">Select Strategic Hub</option>
                        {branches.map(b => (
                          <option key={b._id} value={b._id}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-1 block">
                       {editMode ? 'Overwrite Security Key (Optional)' : 'Security Key Establishment'}
                     </label>
                     <input 
                       required={!editMode}
                       type="password"
                       className={`w-full px-6 py-4 ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-100 text-slate-900 shadow-inner'} focus:border-blue-500 rounded-2xl transition-all outline-none font-bold text-sm`}
                       value={formData.password_hash}
                       onChange={e => setFormData({...formData, password_hash: e.target.value})}
                     />
                  </div>
                  
                  <div className="pt-8 flex gap-4">
                    <button type="button" onClick={() => setShowModal(false)} className={`flex-1 py-5 ${isDark ? 'text-slate-400 hover:bg-white/5 border-white/10' : 'text-slate-600 hover:bg-slate-50 border-slate-200'} font-black rounded-2xl transition-all border uppercase tracking-widest text-[10px]`}>Dismiss</button>
                    <button type="submit" className="flex-1 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/30 hover:bg-blue-500 transition-all uppercase tracking-widest text-[10px]">Confirm Authorization</button>
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
