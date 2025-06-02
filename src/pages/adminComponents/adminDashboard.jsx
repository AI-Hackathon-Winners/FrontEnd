import React from 'react';
import {
  FiUsers,
  FiBarChart2,
  FiSettings,
  FiGrid,
  FiZap,
  FiFileText,
  FiRepeat,
  FiMail,
} from "react-icons/fi";
import { motion } from "framer-motion";
import CompanySocials from '../../components/companySocials';

const cards = [
  {
    title: "Total Users",
    count: 128,
    icon: <FiUsers className="text-purple-600 text-2xl" />,
    border: "border-purple-600",
  },
  {
    title: "Total Leads",
    count: 460,
    icon: <FiGrid className="text-indigo-600 text-2xl" />,
    border: "border-indigo-600",
  },
  {
    title: "AI Summaries Today",
    count: 34,
    icon: <FiZap className="text-yellow-600 text-2xl" />,
    border: "border-yellow-400",
  },
  {
    title: "Invoices",
    count: 120,
    icon: <FiFileText className="text-pink-600 text-2xl" />,
    border: "border-pink-400",
  },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 to-purple-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-6 shadow-xl hidden md:block">
        <h2 className="text-2xl font-bold text-yellow-400 mb-10">Bondly </h2>
        <nav className="space-y-6 text-sm font-semibold">
         
          <a href="/adminUsers" className="hover:text-yellow-300 flex items-center gap-3 transition">
            <FiUsers /> Manage Users
          </a>
          <a href="/adminLeads" className="hover:text-yellow-300 flex items-center gap-3 transition">
            <FiGrid /> Lead Overview
          </a>
          <a href="/adminCommunication" className="hover:text-yellow-300 flex items-center gap-3 transition">
            <FiMail /> Communication Monitoring
          </a>
          <a href="/adminAiConfig" className="hover:text-yellow-300 flex items-center gap-3 transition">
            <FiRepeat /> AI Config & Follow-ups
          </a>
          <a href="/adminCompanyInvoices" className="hover:text-yellow-300 flex items-center gap-3 transition">
            <FiFileText /> Company Invoices
          </a>
          <a href="/adminAnalytics" className="hover:text-yellow-300 flex items-center gap-3 transition">
            <FiBarChart2 /> Analytics
          </a>
          <a href="/adminSettings" className="hover:text-yellow-300 flex items-center gap-3 transition">
            <FiSettings /> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Header */}
        <div className="mb-10 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-800">Admin Dashboard</h1>
          <div className="rounded-full w-9 h-9 bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
            A
          </div>
        </div>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${card.border} hover:shadow-xl transition`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm text-gray-500">{card.title}</h2>
                  <p className="text-2xl font-bold text-purple-800">{card.count}</p>
                </div>
                {card.icon}
              </div>
            </motion.div>
          ))}
        </section>

        {/* Placeholder */}
        <div className="bg-white p-10 rounded-xl shadow-md text-center text-gray-400 border border-dashed border-purple-300">
          📊 System charts, user trends, summaries will appear here soon...
        </div>
      </main>
      {/* Floating Social Icons */}
      <CompanySocials/>
    </div>
  );
};

export default AdminDashboard;
