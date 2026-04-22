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
import AdminTabs from '../../components/admin/AdminTabs';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const AdminAgents = () => {
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
      password_hash: '', // Leave blank for security if not changing
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
      
      // If editing and password is empty, remove it from payload
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
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-4 md:p-8 font-inter">
      <div className="max-w-7xl mx-auto">
        <AdminTabs />
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div className="flex items-center gap-4">
             <div className="bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl p-3">
                <Users className="text-white w-6 h-6" />
             </div>
             <div>
                <h1 className="text-3xl font-bold text-white">User Management</h1>
                <p className="text-slate-400 text-sm">Manage Sales Persons, BSMs, and Administrators</p>
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
            className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black flex items-center gap-2 shadow-[0_4px_14px_rgba(37,99,235,0.39)] hover:bg-blue-700 hover:scale-105 transition-all uppercase tracking-widest text-xs"
          >
            <Plus className="w-5 h-5" /> Create User
          </button>
        </div>

        {/* Notifications */}
        <AnimatePresence>
          {notification && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-8 p-4 rounded-xl flex items-center gap-3 font-bold text-sm ${notification.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}
            >
              {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              {notification.message}
              <button className="ml-auto" onClick={() => setNotification(null)}><X className="w-4 h-4" /></button>
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
              className="bg-white rounded-[32px] p-8 border border-slate-200 group relative hover:shadow-lg transition-all shadow-sm"
            >
              <div className="absolute top-6 right-6 flex items-center gap-2">
                <button 
                  onClick={() => handleEdit(u)}
                  className="p-2 text-slate-500 hover:text-blue-400 transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(u._id)}
                  className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                <Shield className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-1">{u.full_name}</h3>
              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-4 italic">
                <Building2 className="w-4 h-4" />
                {u.branch_id?.name || 'Global Access'}
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-500 font-medium">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-xs truncate">{u.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 font-medium">
                  <Phone className="w-4 h-4 text-slate-500" />
                  <span className="text-xs">{u.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500 font-medium">
                  <Hash className="w-4 h-4 text-slate-500" />
                  <span className="text-xs">{u.employee_code}</span>
                </div>
                <div className="mt-4">
                  <span className={`text-[10px] font-black uppercase tracking-[0.1em] px-3 py-1 rounded-full border ${
                    u.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' : 
                    u.role === 'bsm' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 
                    'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {u.role.replace('_', ' ')}
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
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
                onClick={() => setShowModal(false)}
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white border border-slate-200 rounded-[40px] shadow-2xl z-[101] p-10 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full translate-x-1/2 -translate-y-1/2" />
                
                <h2 className="text-2xl font-bold text-slate-900 mb-8">
                  {editMode ? 'Edit User' : 'Create New User'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-5 relative">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Full Name</label>
                      <input 
                        required
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-2xl transition-all outline-none font-bold text-slate-900 text-sm"
                        value={formData.full_name}
                        onChange={e => setFormData({...formData, full_name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Email</label>
                      <input 
                        required
                        type="email"
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-2xl transition-all outline-none font-bold text-slate-900 text-sm"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Phone</label>
                      <input 
                        required
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-2xl transition-all outline-none font-bold text-slate-900 text-sm"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Employee Code</label>
                      <input 
                        required
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-2xl transition-all outline-none font-bold text-slate-900 text-sm"
                        value={formData.employee_code}
                        onChange={e => setFormData({...formData, employee_code: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Role</label>
                      <select 
                        required
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-2xl outline-none font-bold text-slate-900 text-sm appearance-none"
                        value={formData.role}
                        onChange={e => setFormData({...formData, role: e.target.value})}
                      >
                        <option value="sales_person">Sales Person</option>
                        <option value="bsm">Branch Sales Manager (BSM)</option>
                        <option value="admin">Administrator</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Branch</label>
                      <select 
                        required={formData.role !== 'admin'}
                        disabled={formData.role === 'admin'}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-2xl outline-none font-bold text-slate-900 text-sm appearance-none disabled:opacity-30"
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
                     <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1 mb-2 block">{editMode ? 'New Password (Optional)' : 'Password'}</label>
                     <input 
                       required={!editMode}
                       type="password"
                       className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 rounded-2xl outline-none font-bold text-slate-900 text-sm"
                       value={formData.password_hash}
                       onChange={e => setFormData({...formData, password_hash: e.target.value})}
                     />
                  </div>
                  
                  <div className="pt-6 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 py-4 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-all border border-slate-200"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-500 transition-all uppercase tracking-widest text-sm"
                    >
                      {editMode ? 'Update' : 'Create'}
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
