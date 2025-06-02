import React, { useState } from 'react';
import { FiArrowLeft, FiSearch, FiEye, FiDownload, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const sampleInvoices = [
  {
    id: 'INV001',
    company: 'Bondly Inc.',
    amount: 1240,
    status: 'Paid',
    date: '2025-05-18',
    description: 'Monthly CRM subscription for Bondly platform.',
  },
  {
    id: 'INV002',
    company: 'Visionary AI',
    amount: 980,
    status: 'Pending',
    date: '2025-05-20',
    description: 'AI assistant integration for lead scoring feature.',
  },
  {
    id: 'INV003',
    company: 'InnovateX',
    amount: 1530,
    status: 'Overdue',
    date: '2025-05-12',
    description: 'Annual support and maintenance package.',
  },
];

const AdminCompanyInvoices = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [viewInvoice, setViewInvoice] = useState(null);

  const filteredInvoices = sampleInvoices.filter(
    (inv) =>
      (inv.company.toLowerCase().includes(query.toLowerCase()) ||
        inv.id.toLowerCase().includes(query.toLowerCase())) &&
      (filterStatus === '' || inv.status === filterStatus)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Overdue':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleDownload = (invoice) => {
    const content = `
      Invoice ID: ${invoice.id}
      Company: ${invoice.company}
      Amount: $${invoice.amount}
      Status: ${invoice.status}
      Date: ${invoice.date}
      Description: ${invoice.description}
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${invoice.id}-${invoice.company}.txt`;
    link.click();
  };

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-purple-50 to-indigo-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/adminDashboard')}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
          >
            <FiArrowLeft /> Back to Dashboard
          </button>
         
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center bg-white border rounded-full px-4 py-2 shadow-sm">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by ID or Company"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none text-sm w-40 md:w-60"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-full px-4 py-2 border text-sm bg-white"
          >
            <option value="">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

       <h1 className="text-2xl font-bold text-purple-800 mb-6 mt-12">Company Invoices</h1>

      {/* Table */}
      <div className="overflow-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-sm">
          <thead className="bg-purple-100 text-purple-800 text-left">
            <tr>
              <th className="p-4">Invoice ID</th>
              <th className="p-4">Company</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((invoice, i) => (
                <motion.tr
                  key={invoice.id}
                  className="border-t hover:bg-gray-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <td className="p-4 font-medium">{invoice.id}</td>
                  <td className="p-4">{invoice.company}</td>
                  <td className="p-4">${invoice.amount.toFixed(2)}</td>
                  <td className="p-4">{invoice.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-3">
                    <button
                      title="View"
                      onClick={() => setViewInvoice(invoice)}
                      className="text-purple-600 hover:text-purple-800 transition"
                    >
                      <FiEye />
                    </button>
                    <button
                      title="Download"
                      onClick={() => handleDownload(invoice)}
                      className="text-indigo-600 hover:text-indigo-800 transition"
                    >
                      <FiDownload />
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No invoices found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 👁️ View Invoice Modal */}
      {viewInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
            <button
              onClick={() => setViewInvoice(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
            <h2 className="text-xl font-bold text-purple-800 mb-4">Invoice Details</h2>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>ID:</strong> {viewInvoice.id}</p>
              <p><strong>Company:</strong> {viewInvoice.company}</p>
              <p><strong>Amount:</strong> ${viewInvoice.amount.toFixed(2)}</p>
              <p><strong>Date:</strong> {viewInvoice.date}</p>
              <p><strong>Status:</strong> {viewInvoice.status}</p>
              <p><strong>Description:</strong> {viewInvoice.description}</p>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setViewInvoice(null)}
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

export default AdminCompanyInvoices;
