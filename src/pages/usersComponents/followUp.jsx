import React, { useState } from 'react';
import { FiSend, FiUser, FiMail, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const FollowUp = () => {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  // Simulated contact (in reality you'd fetch this from context/state)
  const lead = {
    name: 'John Doe',
    email: 'john@example.com',
    lastMessage: 'Hi, I’m still reviewing the proposal. Will get back soon.',
    relationship: 'Investor',
  };

  const generateFollowUps = () => {
    setLoading(true);
    setTimeout(() => {
      setFollowUps([
        {
          day: 'Today',
          tone: 'Polite Reminder',
          message: `Hi John, just following up on the proposal. Let me know if you'd like to jump on a quick call to clarify anything.`,
        },
        {
          day: 'In 2 Days',
          tone: 'Gentle Nudge',
          message: `Hey John, hope the week’s going well. Curious if you had a chance to review the proposal — happy to answer questions.`,
        },
        {
          day: 'In 5 Days',
          tone: 'Final Ping',
          message: `Hi John — just checking in one last time before I close the loop on this. Let me know if now isn't the right time.`,
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  const handleSendNow = (msg) => {
    // Replace with real API/send logic
    alert(`Sent to ${lead.email}: "${msg}"`);
  };

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
              >
                <FiArrowLeft/> Back to Dashboard
              </button>

      <h1 className="text-3xl font-bold text-purple-800 mb-6 mt-12"> Smart Follow-Up Generator</h1>

      {/* Contact Summary */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
        className="bg-white p-6 rounded-2xl shadow-md mb-8 border-l-4 border-purple-600"
      >
        <h2 className="text-xl font-semibold flex items-center gap-2 text-purple-800 mb-1">
          <FiUser /> {lead.name}
        </h2>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <FiMail className="text-gray-500" /> {lead.email}
        </p>
        <p className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-md border">
          <strong>Last Message:</strong> “{lead.lastMessage}”
        </p>
        <p className="mt-2 text-xs text-gray-500">Relationship: {lead.relationship}</p>
      </motion.div>

      {/* Generate Button */}
      <div className="mb-10">
        <button
          onClick={generateFollowUps}
          disabled={loading}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-700 to-indigo-800 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition transform duration-200"
        >
          <FiSend /> {loading ? 'Generating Follow-Ups...' : 'Generate Follow-Ups'}
        </button>
      </div>

      {/* Follow-Up Timeline */}
      {followUps.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="bg-white p-6 rounded-2xl shadow-md"
        >
          <h3 className="text-xl font-semibold text-purple-800 mb-6">📆 Suggested Follow-Up Timeline</h3>
          <ol className="relative border-l border-purple-400">
            {followUps.map((item, idx) => (
              <li key={idx} className="mb-10 ml-4">
                <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-1.5 border border-white"></div>
                <h4 className="text-sm font-semibold text-purple-700 mb-1">{item.day} — {item.tone}</h4>
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
  );
};

export default FollowUp;
