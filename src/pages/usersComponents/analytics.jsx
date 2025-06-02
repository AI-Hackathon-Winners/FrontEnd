import React, { useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { FiUsers, FiPieChart, FiTrendingUp, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#6D28D9', '#FACC15', '#6366F1', '#10B981'];

const Analytics = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leadSource, setLeadSource] = useState('');
  const navigate = useNavigate();

  // Lead data example - add common startup lead sources
  const allLeads = [
    { name: 'Hot', value: 18, source: 'LinkedIn', date: '2025-05-10' },
    { name: 'Warm', value: 32, source: 'Website', date: '2025-05-12' },
    { name: 'Cold', value: 50, source: 'Email Campaign', date: '2025-05-14' },
    { name: 'Cold', value: 12, source: 'Slack', date: '2025-05-15' },
  ];

  const filteredLeads = allLeads.filter((lead) => {
    const date = new Date(lead.date);
    return (
      (!leadSource || lead.source === leadSource) &&
      (!startDate || new Date(startDate) <= date) &&
      (!endDate || new Date(endDate) >= date)
    );
  });

  // Sentiment data based on conversation feedback or AI sentiment analysis
  const sentimentData = [
    { name: 'Positive', value: 65 },
    { name: 'Neutral', value: 20 },
    { name: 'Negative', value: 15 },
  ];

  // Placeholder deal pipeline data (for startup deal tracking)
  const dealPipeline = [
    { name: 'Prospecting', value: 40 },
    { name: 'Negotiation', value: 25 },
    { name: 'Closed Won', value: 15 },
    { name: 'Closed Lost', value: 10 },
  ];

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
       <button
                      onClick={() => navigate("/dashboard")}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
                    >
                      <FiArrowLeft/> Back to Dashboard
                    </button>
      <h1 className="text-3xl font-bold text-purple-800 mb-6 mt-12">Analytics</h1>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-purple-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-purple-600 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lead Source</label>
          <select
            value={leadSource}
            onChange={(e) => setLeadSource(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-purple-600 focus:outline-none"
          >
            <option value="">All Sources</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Website">Website</option>
            <option value="Email Campaign">Email Campaign</option>
            <option value="Slack">Slack</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 border-l-4 border-purple-600">
          <FiUsers className="text-purple-600 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Total Leads</h3>
            <p className="text-2xl font-bold text-purple-800">{filteredLeads.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 border-l-4 border-indigo-500">
          <FiTrendingUp className="text-indigo-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Follow-Ups Sent</h3>
            <p className="text-2xl font-bold text-purple-800">75</p> {/* Hardcoded example */}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 border-l-4 border-green-500">
          <FiPieChart className="text-green-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Active Deals</h3>
            <p className="text-2xl font-bold text-purple-800">30</p> {/* Hardcoded example */}
          </div>
        </div>
      </div>

       {/* Analytics Charts */}
      <div className="max-w-6xl mx-auto grid gap-12 md:grid-cols-3">
        {/* Lead Engagement */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 hover:scale-[1.03] transition-transform duration-300">
          <h2 className="text-2xl font-bold mb-6 text-purple-700 tracking-wide text-center">
            Lead Engagement by Status
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={filteredLeads}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label={{ fill: '#4B5563', fontWeight: '600' }}
              >
                {filteredLeads.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ fontWeight: 600 }}
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Conversation Sentiment */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 hover:scale-[1.03] transition-transform duration-300">
          <h2 className="text-2xl font-bold mb-6 text-purple-700 tracking-wide text-center">
            Conversation Sentiment Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={sentimentData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label={{ fill: '#4B5563', fontWeight: '600' }}
              >
                {sentimentData.map((_, index) => (
                  <Cell key={`cell-sentiment-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ fontWeight: 600 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Deal Pipeline */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 hover:scale-[1.03] transition-transform duration-300">
          <h2 className="text-2xl font-bold mb-6 text-purple-700 tracking-wide text-center">
            Deal Pipeline Overview
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dealPipeline} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontWeight: 600 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#10B981" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
