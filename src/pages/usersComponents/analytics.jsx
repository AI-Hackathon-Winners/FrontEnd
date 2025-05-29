import React from 'react'
import  { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FiUsers, FiMail, FiPieChart, FiTrendingUp } from 'react-icons/fi';

const COLORS = ['#6D28D9', '#FACC15', '#6366F1'];

const Analytics = () => {
   const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [leadSource, setLeadSource] = useState('');

  // Example lead data (would normally come from backend)
  const allLeads = [
    { name: 'Hot', value: 18, source: 'LinkedIn', date: '2025-05-10' },
    { name: 'Warm', value: 32, source: 'Website', date: '2025-05-12' },
    { name: 'Cold', value: 50, source: 'WhatsApp', date: '2025-05-14' },
  ];

  const filteredLeads = allLeads.filter((lead) => {
    const date = new Date(lead.date);
    return (
      (!leadSource || lead.source === leadSource) &&
      (!startDate || new Date(startDate) <= date) &&
      (!endDate || new Date(endDate) >= date)
    );
  });

  const emailStats = [
    { name: 'Sent', count: 120 },
    { name: 'Opened', count: 85 },
    { name: 'Failed', count: 5 },
  ];

  const sentimentData = [
    { name: 'Positive', value: 55 },
    { name: 'Neutral', value: 25 },
    { name: 'Negative', value: 20 },
  ];


    return (
        <div className="p-6 md:p-10 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-800 mb-6">📊 CRM Analytics</h1>

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
            <option value="WhatsApp">WhatsApp</option>
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
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 border-l-4 border-yellow-400">
          <FiMail className="text-yellow-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Emails Sent</h3>
            <p className="text-2xl font-bold text-purple-800">120</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 border-l-4 border-indigo-500">
          <FiTrendingUp className="text-indigo-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold text-gray-700">Follow-Ups Sent</h3>
            <p className="text-2xl font-bold text-purple-800">45</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Pie Chart - Lead Engagement */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">Lead Engagement</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={filteredLeads}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {filteredLeads.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Email Stats */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold text-purple-800 mb-4">Email Performance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={emailStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#6D28D9" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sentiment Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md mt-12 max-w-xl mx-auto">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">Conversation Sentiment Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={sentimentData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {sentimentData.map((_, index) => (
                <Cell key={`cell-sentiment-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Analytics