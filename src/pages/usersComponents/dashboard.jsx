import React from 'react'
import { FiUsers, FiMail, FiRepeat, FiFileText, FiSettings, FiBarChart2 } from "react-icons/fi";
import { Link } from 'react-router-dom';
import CompanySocials from '../../components/companySocials';

const Dashboard = () => {
  return (
      <div className="flex min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 text-gray-800">

      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-purple-700 to-indigo-800 text-white shadow-xl p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-yellow-400 mb-10">Bondly</h2>
        <nav className="space-y-6 text-sm font-semibold">
          <Link to = '/leads' className="flex items-center gap-3 hover:text-yellow-300 transition"> <FiUsers className="text-lg" /> Leads
           </Link>
           
          <Link to = '/email' className="flex items-center gap-3 hover:text-yellow-300 transition"><FiMail className="text-lg" /> Emails</Link>
          
          <Link to = '/followUp' className="flex items-center gap-3 hover:text-yellow-300 transition"> <FiRepeat className="text-lg" /> Follow-Ups</Link>
          
          <Link to = '/invoice' className="flex items-center gap-3 hover:text-yellow-300 transition"><FiFileText className="text-lg" /> Invoices</Link>
         
          <Link to = '/analytics' className="flex items-center gap-3 hover:text-yellow-300 transition"><FiBarChart2 className="text-lg" /> Analytics</Link>
          
          <Link to = '/settings' className="flex items-center gap-3 hover:text-yellow-300 transition"><FiSettings className="text-lg" /> Settings</Link>
         
        </nav>
        
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-purple-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-full border border-purple-300 px-4 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="w-8 h-8 bg-purple-700 text-white flex items-center justify-center rounded-full text-sm font-bold">
              A
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-xl transition duration-300">
            <h2 className="text-sm text-gray-500">Total Leads</h2>
            <p className="text-2xl font-bold text-purple-800 mt-1">1,240</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500 hover:shadow-xl transition duration-300">
            <h2 className="text-sm text-gray-500">Emails Sent</h2>
            <p className="text-2xl font-bold text-indigo-800 mt-1">320</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400 hover:shadow-xl transition duration-300">
            <h2 className="text-sm text-gray-500">Follow-Ups</h2>
            <p className="text-2xl font-bold text-yellow-600 mt-1">122</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-400 hover:shadow-xl transition duration-300">
            <h2 className="text-sm text-gray-500">Invoices</h2>
            <p className="text-2xl font-bold text-purple-600 mt-1">$12,450</p>
          </div>
        </section>

        {/* Placeholder for dynamic content */}
        <section>
          <div className="bg-white p-10 rounded-xl shadow-md text-center text-gray-400 border border-dashed border-purple-300">
            📊 Upcoming: Graphs, AI summaries, latest interactions...
          </div>
        </section>
      </main>

      {/* Floating Social Icons */}
      <CompanySocials />
    </div>
  )
}

export default Dashboard