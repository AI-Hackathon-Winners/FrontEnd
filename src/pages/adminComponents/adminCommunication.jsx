import React, { useState } from 'react';
import { FiArrowLeft, FiMessageSquare, FiSearch, FiEye } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const sampleMessages = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    summary: 'The client showed interest but needs more details on pricing and support.',
    date: '2025-05-26',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    summary: 'Follow-up required on the email sent last Friday. No response yet.',
    date: '2025-05-25',
  },
  {
    id: 3,
    name: 'Samuel Green',
    email: 'sam@example.com',
    summary: 'Customer confirmed the proposal looks good and will proceed next week.',
    date: '2025-05-24',
  },
];

const AdminCommunication = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [viewMessage, setViewMessage] = useState(null);

  const filteredMessages = sampleMessages.filter(
    (msg) =>
      msg.name.toLowerCase().includes(query.toLowerCase()) ||
      msg.email.toLowerCase().includes(query.toLowerCase()) ||
      msg.summary.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6 md:p-10">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="flex items-center gap-4 w-full">
          <button
            onClick={() => navigate('/adminDashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
          >
            <FiArrowLeft /> Back to Dashboard
          </button>

          
        </div>

        <div className="flex items-center w-full md:max-w-sm border border-purple-300 rounded-full bg-white px-4 py-2 shadow-sm">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search messages or users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none text-sm bg-transparent"
          />
        </div>
        
      </div>
           <h1 className="text-3xl font-bold text-purple-800 mb-6 mt-12">
             Communication Monitoring
          </h1>

      {/* Messages */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-full text-purple-700">
                    <FiMessageSquare />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{msg.name}</h3>
                    <p className="text-xs text-gray-500">{msg.email}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{msg.date}</span>
              </div>
              <p className="text-sm text-gray-700 line-clamp-3 mb-3">{msg.summary}</p>
              <div className="text-right">
                <button
                  onClick={() => setViewMessage(msg)}
                  className="text-purple-600 text-sm hover:underline flex items-center gap-1 justify-end"
                >
                  <FiEye className="text-base" /> View Summary
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No communication summaries found.</p>
        )}
      </div>

      {/* View Modal */}
      {viewMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setViewMessage(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h2 className="text-xl font-bold text-purple-800 mb-4">Summary</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Name:</strong> {viewMessage.name}</p>
              <p><strong>Email:</strong> {viewMessage.email}</p>
              <p><strong>Date:</strong> {viewMessage.date}</p>
              <p><strong>Summary:</strong> {viewMessage.summary}</p>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setViewMessage(null)}
                className="px-6 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCommunication;
