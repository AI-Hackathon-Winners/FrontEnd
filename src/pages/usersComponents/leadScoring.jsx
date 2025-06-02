import React from 'react';
import { FiUserCheck, FiZap, FiHeart, FiClock, FiArrowLeft } from 'react-icons/fi';
import {  useNavigate } from 'react-router-dom';

const leads = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    source: 'LinkedIn',
    engagement: 85,
    emotion: 'Positive',
    score: 92,
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    source: 'Website',
    engagement: 45,
    emotion: 'Neutral',
    score: 61,
  },
  {
    id: 3,
    name: 'Samuel Green',
    email: 'sam@example.com',
    source: 'WhatsApp',
    engagement: 25,
    emotion: 'Negative',
    score: 39,
  },
];

const getScoreColor = (score) => {
  if (score >= 80) return 'bg-green-100 text-green-700';
  if (score >= 50) return 'bg-yellow-100 text-yellow-700';
  return 'bg-red-100 text-red-700';
};

const getEmotionColor = (emotion) => {
  if (emotion === 'Positive') return 'text-green-600';
  if (emotion === 'Neutral') return 'text-yellow-500';
  if (emotion === 'Negative') return 'text-red-600';
  return 'text-gray-400';
};

const LeadScoring = () => {
  const navigate = useNavigate();
  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
       <button
        onClick={() => navigate('/leads')}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
         >
         <FiArrowLeft/> Back
        </button>
      <h1 className="text-3xl font-bold text-purple-800 mb-6 mt-12"> Lead Scoring</h1>

      <div className="bg-white rounded-xl shadow-md overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-purple-100 text-purple-800 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Source</th>
              <th className="p-4">Engagement</th>
              <th className="p-4">Emotion</th>
              <th className="p-4">Score</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t hover:bg-gray-50">
                 <td className="p-4 font-medium flex items-center gap-2">
                    <FiUserCheck className="text-purple-600" />
                     {lead.name}
                 </td>
                 <td className="p-4">{lead.email}</td>
                 <td className="p-4">{lead.source}</td>
                 <td className="p-4 flex items-center gap-2 text-indigo-700"> <FiZap/> {lead.engagement}% </td>
                 <td className="p-4 font-bold">
                 <span className={`${getEmotionColor(lead.emotion)}`}>{lead.emotion}</span>
               </td>
               <td className="p-4">
                 <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getScoreColor(lead.score)}`}>
                 {lead.score}
                </span>
              </td>
             </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadScoring;
