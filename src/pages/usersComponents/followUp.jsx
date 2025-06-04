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
    participant: 'Michael Owusu',
    channel: 'Email',
    summary: 'The sender expresses strong interest and requests more details to explore potential support.',
    relationship: 'Investor',
  };

  const generateFollowUps = () => {
    setLoading(true);
    setTimeout(() => {
      setFollowUps([
        {
          day: 'Today',
          tone: 'Polite Reminder',
          message: `Thank you again for the insightful conversation earlier. I’ve attached our pitch deck and a brief data-room overview, including team bios, financial model, and go-to-market milestones. Please let me know if any other detail would be helpful. I look forward to your thoughts!`,
        },
        {
          day: 'In 2 Days',
          tone: 'Gentle Nudge',
          message: `Just following up to see if you had a chance to skim the deck. I’m happy to hop on a short call or send additional context on our traction, product roadmap, or unit economics.
          Thanks for your time,.`,
        },
        {
          day: 'In 5 Days',
          tone: 'Final Ping',
          message: `I know your schedule is packed, so I wanted to circle back one last time this week. If Bondly isn’t a fit right now, no worries—just let me know. Otherwise, I’d love to arrange a 20-minute deep dive whenever convenient.
          Appreciate your consideration,.`,
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <button
                onClick={() => navigate('/conversations')}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
              >
                <FiArrowLeft/> Back to Conversations
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
          <FiUser /> {lead.participant}
        </h2>
        <p className="text-sm text-gray-600 flex items-center gap-2">
          <FiMail className="text-gray-500" /> {lead.channel}
        </p>
        <p className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-md border">
          <strong>Summary:</strong> “{lead.summary}”
        </p>
        <p className="mt-2 text-xs text-gray-500">Type: {lead.relationship}</p>
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
          <h3 className="text-xl font-semibold text-purple-800 mb-6"> Suggested Follow-Up Timeline</h3>
          <ol className="relative border-l border-purple-400">
            {followUps.map((item, idx) => (
              <li key={idx} className="mb-10 ml-4">
                <div className="absolute w-3 h-3 bg-purple-600 rounded-full -left-1.5 border border-white"></div>
                <h4 className="text-sm font-semibold text-purple-700 mb-1">{item.day} — {item.tone}</h4>
                <p className="text-sm text-gray-700 bg-gray-50 border px-4 py-2 rounded-md">
                  {item.message}
                </p>
                
              </li>
            ))}
          </ol>
        </motion.div>
      )}
    </div>
  );
};

export default FollowUp;
