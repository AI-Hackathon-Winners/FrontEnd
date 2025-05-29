import React, { useState } from 'react';
import { FiSearch, FiUser, FiEdit2, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const sampleUsers = [
  {
    id: 1,
    name: 'Agnes Dansowaa',
    email: 'agnes@example.com',
    role: 'admin',
    status: 'Active',
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    status: 'Inactive',
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'Active',
  },
];

const AdminUsers = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState(sampleUsers);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: '', status: '' });

  const handleEditClick = (user) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status });
  };

  const handleDeleteClick = (user) => {
    setDeletingUser(user);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser.id ? { ...u, ...editForm } : u))
    );
    setEditingUser(null);
    toast.success('User updated successfully!');
  };

  const handleDeleteConfirm = () => {
    setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
    setDeletingUser(null);
    toast.info('User deleted.');
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6 md:p-10">
      
      {/* 🔙 Back + Search (Same Row) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
        <button
          onClick={() => navigate('/adminDashboard')}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-4 py-2 rounded-full border shadow-sm text-sm w-full max-w-xs bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
      </div>

      {/* 📛 Title on Separate Line */}
      <h1 className="text-3xl font-bold text-purple-800 mb-6 mt-12"> Manage Users</h1>

      {/* User Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((user, i) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 text-purple-800 p-3 rounded-full">
                  <FiUser className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full font-semibold ${
                  user.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-600'
                }`}
              >
                {user.status}
              </span>
            </div>

            <div className="mt-4 flex justify-between text-sm text-gray-500">
              <span>
                <strong className="text-purple-700">Role:</strong> {user.role}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEditClick(user)}
                  className="text-indigo-600 hover:text-indigo-800 transition"
                  title="Edit User"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => handleDeleteClick(user)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Delete User"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {filtered.length === 0 && (
        <p className="mt-10 text-center text-gray-500">No users match your search.</p>
      )}

      {/* ✏️ Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold text-purple-800 mb-4">Edit User</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Full Name"
              />
              <input
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
                placeholder="Email"
              />
              <select
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <select
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                className="w-full px-4 py-2 border rounded-md"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-full border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ❗ Delete Modal */}
      {deletingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete <strong>{deletingUser.name}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeletingUser(null)}
                className="px-4 py-2 border rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
