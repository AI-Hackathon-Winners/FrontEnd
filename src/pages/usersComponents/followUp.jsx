import React from 'react'
import  { useState } from 'react';
import { FiSend, FiUser, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

const FollowUp = () => {
    const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(false);

  const lead = {
    name: 'John Doe',
    email: 'john@example.com',
    lastMessage: 'Hi, I am still reviewing the proposal. Will get back soon.',
  };

  const generateFollowUps = async () => {
    setLoading(true);
    setTimeout(() => {
      setFollowUps([
        {
          day: 'Day 1',
          message: 'Hi John, just checking if you had a chance to look over the proposal.',
        },
        {
          day: 'Day 3',
          message: 'Hope your week is going well. I would love to hear your thoughts on the proposal.',
        },
        {
          day: 'Day 7',
          message: 'Just following up again. Let me know if you have any questions or would like to hop on a call.',
        },
      ]);
      setLoading(false);
    }, 1500);
  };
   const handleSendNow = async (msg) => {
    // Simulated send function (replace with real API)
    alert(`Sent to ${lead.email}: "${msg}"`);
  };
  return (
     <div className="p-6 md:p-10 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-800 mb-8">📨 Smart Follow-Up Assistant</h1>

      {/* Lead Info Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
        className="bg-white p-6 rounded-2xl shadow-md mb-8 border-l-4 border-purple-600"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 text-purple-800 mb-2">
          <FiUser /> Lead: {lead.name}
        </h2>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <FiMail className="text-gray-500" /> {lead.email}
        </p>
        <p className="mt-4 text-sm text-gray-700 bg-gray-50 p-3 rounded-md border">
          <span className="font-semibold text-gray-800">Last Message:</span><br />
          “{lead.lastMessage}”
        </p>
      </motion.div>

      {/* Generate Button */}
      <div className="mb-10">
        <button
          onClick={generateFollowUps}
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-indigo-800 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-200"
        >
          <FiSend /> {loading ? 'Generating...' : 'Generate Smart Follow-Up'}
        </button>
      </div>

      {/* Follow-up Timeline */}
      {followUps.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-white p-6 rounded-2xl shadow-md"
        >
          <h3 className="text-xl font-semibold text-purple-800 mb-6">📆 Follow-Up Sequence</h3>
          <ol className="relative border-l border-purple-400">
            {followUps.map((item, idx) => (
              <li key={idx} className="mb-10 ml-4">
                <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-1.5 border border-white"></div>
                <h4 className="text-sm font-semibold text-purple-700 mb-1">{item.day}</h4>
                <p className="text-sm text-gray-700 bg-gray-50 border px-4 py-2 rounded-md">
                  {item.message}
                </p>
                <button
                  onClick={() => handleSendNow(item.message)}
                  className="mt-2 inline-flex items-center gap-2 text-sm bg-purple-600 text-white px-4 py-1.5 rounded-full hover:bg-purple-700 transition"
                >
                  <FiSend className="text-sm" /> Send Now
                </button>
              </li>
            ))}
          </ol>
        </motion.div>
      )}
    </div>
  )
}

export default FollowUp