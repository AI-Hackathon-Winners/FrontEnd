import React, { useState } from 'react';
import { FiArrowLeft, FiSettings, FiEdit2, FiSave } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const initialTemplates = [
  {
    id: 1,
    title: 'Initial Contact',
    message: 'Hi {{name}}, thank you for your interest. Let me know how I can help!',
  },
  {
    id: 2,
    title: 'Follow-Up Reminder',
    message: 'Hi {{name}}, just checking in to see if you had any questions.',
  },
];

const AdminAIConfig = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(initialTemplates);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', message: '' });

  const [aiSettings, setAISettings] = useState({
    autoFollowUps: true,
    frequency: 'Weekly',
  });

  const handleEdit = (template) => {
    setEditingId(template.id);
    setForm({ title: template.title, message: template.message });
  };

  const handleSave = () => {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === editingId ? { ...t, title: form.title, message: form.message } : t
      )
    );
    setEditingId(null);
    setForm({ title: '', message: '' });
  };

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        
          <button
            onClick={() => navigate('/adminDashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
          >
            <FiArrowLeft /> Back to Dashboard
          </button>
         
          
        
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-purple-800 mb-6 mt-12">AI Config & Follow-Ups</h1>

      {/* AI Settings */}
      <section className="bg-white p-6 rounded-xl shadow-md mb-10">
        <h2 className="text-lg font-bold text-purple-700 mb-4">AI Follow-Up Settings</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={aiSettings.autoFollowUps}
              onChange={(e) =>
                setAISettings({ ...aiSettings, autoFollowUps: e.target.checked })
              }
              className="h-4 w-4 text-purple-600"
            />
            Enable Auto Follow-Ups
          </label>
          <div>
            <label className="block text-sm mb-1 font-medium text-gray-700">Frequency</label>
            <select
              value={aiSettings.frequency}
              onChange={(e) =>
                setAISettings({ ...aiSettings, frequency: e.target.value })
              }
              className="w-full border rounded-md px-4 py-2"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Biweekly">Biweekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
        </div>
      </section>

      {/* Templates */}
      <section className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-bold text-purple-700 mb-6">Follow-Up Templates</h2>

        {templates.map((template, i) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="border-b py-4 mb-4"
          >
            {editingId === template.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="Title"
                />
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="Message"
                />
                <button
                  onClick={handleSave}
                  className="mt-2 px-4 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800"
                >
                  <FiSave className="inline mr-2" />
                  Save
                </button>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-gray-800">{template.title}</h3>
                  <button
                    onClick={() => handleEdit(template)}
                    className="text-indigo-600 hover:text-indigo-800"
                    title="Edit"
                  >
                    <FiEdit2 />
                  </button>
                </div>
                <p className="text-sm text-gray-600">{template.message}</p>
              </div>
            )}
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default AdminAIConfig;
