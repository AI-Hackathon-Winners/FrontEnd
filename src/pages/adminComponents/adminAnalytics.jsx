import React from 'react'
import  { useState } from 'react';
import {
  LineChart, Line, PieChart, Pie, BarChart, Bar,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell,
} from 'recharts';
import { FiCalendar, FiPieChart, FiTrendingUp, FiBarChart2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

const COLORS = ['#6D28D9', '#FACC15', '#6366F1'];


const AdminAnalytics = () => {
    const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Mock data (replace with backend API later)
  const lineData = [
    { date: 'May 20', leads: 5 },
    { date: 'May 21', leads: 12 },
    { date: 'May 22', leads: 8 },
    { date: 'May 23', leads: 15 },
    { date: 'May 24', leads: 10 },
  ];

  const pieData = [
    { name: 'Website', value: 40 },
    { name: 'LinkedIn', value: 30 },
    { name: 'Referral', value: 20 },
    { name: 'Other', value: 10 },
  ];

  const emailData = [
    { name: 'Sent', count: 120 },
    { name: 'Opened', count: 85 },
    { name: 'Failed', count: 8 },
  ];


  return (
     <div className="p-6 md:p-10 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      <h1 className="text-3xl font-bold text-purple-800 mb-8">📊 Admin Analytics Dashboard</h1>

      {/* Filters */}
      <motion.div
        className="bg-white rounded-xl shadow-md p-6 grid md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      >
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-purple-600"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-purple-600"
          />
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 mt-6 md:mt-0">
          <FiCalendar /> Data from {startDate || 'Start'} to {endDate || 'End'}
        </div>
      </motion.div>

      {/* Chart Grid */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Line Chart */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-md"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
            <FiTrendingUp /> Lead Growth Over Time
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="leads" stroke="#6D28D9" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-md"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
            <FiPieChart /> Lead Sources Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((_, i) => (
                  <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Bar Chart */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-md md:col-span-2"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-purple-800 mb-4 flex items-center gap-2">
            <FiBarChart2 /> Email Campaign Performance
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={emailData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#6366F1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminAnalytics