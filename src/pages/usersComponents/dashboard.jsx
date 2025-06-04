// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  FiUsers,
  FiMessageSquare,
  FiRepeat,
  FiFileText,
  FiSettings,
  FiBarChart2,
  FiBriefcase,
  FiLogOut,
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import CompanySocials from '../../components/companySocials';

const Dashboard = () => {
  const navigate = useNavigate();

  /* ---------- state ---------- */
  const [user, setUser] = useState(null);           // user info w/ avatarUrl
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  /* ---------- helpers ---------- */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');                // clear cached user
    navigate('/');
  };

  /* ---------- load user on mount ---------- */
  useEffect(() => {
    // 1) see if user JSON already cached
    const cached = localStorage.getItem('user');
    if (cached) {
      setUser(JSON.parse(cached));
      return;
    }

    // 2) otherwise, fetch from backend using token
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:4000/profile', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data)); // cache for later
      })
      .catch(console.error);
  }, []);

  /* ---------- render ---------- */
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 text-gray-800">
      {/* ───────── Sidebar ───────── */}
      <aside className="w-64 bg-gradient-to-br from-purple-700 to-indigo-800 text-white shadow-xl p-6 hidden md:block">
        <h2 className="text-2xl font-bold text-yellow-400 mb-10">Bondly</h2>
        <nav className="space-y-6 text-sm font-semibold">
          <Link to="/leads" className="flex items-center gap-3 hover:text-yellow-300 transition">
            <FiUsers className="text-lg" /> Leads
          </Link>
          <Link to="/conversations" className="flex items-center gap-3 hover:text-yellow-300 transition">
            <FiMessageSquare className="text-lg" /> Conversations
          </Link>
          <Link to="/followUp" className="flex items-center gap-3 hover:text-yellow-300 transition">
            <FiRepeat className="text-lg" /> Follow-Ups
          </Link>
          <Link to="/deals" className="flex items-center gap-3 hover:text-yellow-300 transition">
            <FiBriefcase className="text-lg" /> Deals
          </Link>
          <Link to="/invoice" className="flex items-center gap-3 hover:text-yellow-300 transition">
            <FiFileText className="text-lg" /> Invoices
          </Link>
          <Link to="/analytics" className="flex items-center gap-3 hover:text-yellow-300 transition">
            <FiBarChart2 className="text-lg" /> Analytics
          </Link>
          <Link to="/settings" className="flex items-center gap-3 hover:text-yellow-300 transition">
            <FiSettings className="text-lg" /> Settings
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 mt-6 hover:text-yellow-300 transition"
          >
            <FiLogOut className="text-lg" /> Logout
          </button>
        </nav>
      </aside>

      {/* ───────── Main Content ───────── */}
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

            {/* Avatar + dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="w-8 h-8 rounded-full overflow-hidden bg-purple-700 flex items-center justify-center text-sm font-bold text-white"
              >
                {user?.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name ?? 'avatar'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  /* fallback: first character of name or 'A' */
                  (user?.name?.[0] ?? 'A')
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-100 hover:text-red-600"
                  >
                    <div className="flex items-center gap-2">
                      <FiLogOut /> Logout
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-xl transition">
            <h2 className="text-sm text-gray-500">Total Leads</h2>
            <p className="text-2xl font-bold text-purple-800 mt-1">1,240</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500 hover:shadow-xl transition">
            <h2 className="text-sm text-gray-500">Total Conversations</h2>
            <p className="text-2xl font-bold text-indigo-800 mt-1">320</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-400 hover:shadow-xl transition">
            <h2 className="text-sm text-gray-500">Follow-Ups</h2>
            <p className="text-2xl font-bold text-yellow-600 mt-1">122</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-400 hover:shadow-xl transition">
            <h2 className="text-sm text-gray-500">Invoices</h2>
            <p className="text-2xl font-bold text-purple-600 mt-1">$12,450</p>
          </div>
        </section>

        {/* Placeholder / future content */}
        <section>
          <div className="bg-white p-10 rounded-xl shadow-md text-center text-gray-400 border border-dashed border-purple-300">
            📊 Upcoming: Graphs, AI summaries, latest interactions...
          </div>
        </section>
      </main>

      {/* Floating social icons */}
      <CompanySocials />
    </div>
  );
};

export default Dashboard;
