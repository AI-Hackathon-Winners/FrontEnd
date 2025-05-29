import React, { useState } from 'react';
import { FiSearch, FiEye, FiX, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const sampleLeads = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    source: 'Website',
    status: 'New',
    createdAt: '2025-05-20',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    source: 'LinkedIn',
    status: 'Contacted',
    createdAt: '2025-05-21',
  },
  {
    id: 3,
    name: 'Samuel Green',
    email: 'sam@example.com',
    source: 'Referral',
    status: 'Closed',
    createdAt: '2025-05-22',
  },
];

const AdminLeads = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [leads] = useState(sampleLeads);
  const [viewLead, setViewLead] = useState(null);

  const filteredLeads = leads.filter(
    (lead) =>
      [lead.name, lead.email, lead.source, lead.status]
        .some((field) => field.toLowerCase().includes(query.toLowerCase())) &&
      (statusFilter === '' || lead.status === statusFilter)
  );

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      {/* Top Bar: Back + Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <button
          onClick={() => navigate('/adminDashboard')}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center bg-white border rounded-full px-4 py-2 shadow-sm w-full max-w-xs">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search leads..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full outline-none text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-full px-4 py-2 border shadow-sm text-sm bg-white"
          >
            <option value="">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Page Title on a new line */}
      <h1 className="text-3xl font-bold text-purple-800 mb-6 mt-10"> Leads Overview</h1>

      {/* Leads Table */}
      <div className="overflow-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-sm">
          <thead className="bg-purple-100 text-purple-800 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Source</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead, i) => (
                <motion.tr
                  key={lead.id}
                  className="border-t hover:bg-gray-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className="p-4 font-medium">{lead.name}</td>
                  <td className="p-4">{lead.email}</td>
                  <td className="p-4">{lead.source}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        lead.status === 'New'
                          ? 'bg-yellow-100 text-yellow-700'
                          : lead.status === 'Contacted'
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-4">{lead.createdAt}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setViewLead(lead)}
                      className="text-purple-700 hover:underline"
                      title="View Lead"
                    >
                      <FiEye />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 👁️ View Modal */}
      {viewLead && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setViewLead(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
            <h2 className="text-xl font-bold text-purple-800 mb-4">Lead Details</h2>
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Name:</strong> {viewLead.name}</p>
              <p><strong>Email:</strong> {viewLead.email}</p>
              <p><strong>Source:</strong> {viewLead.source}</p>
              <p><strong>Status:</strong> {viewLead.status}</p>
              <p><strong>Created:</strong> {viewLead.createdAt}</p>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setViewLead(null)}
                className="px-6 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
