import React, { useState } from 'react';
import { FiPlus, FiEye, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Deals = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const navigate = useNavigate();

  const [deals, setDeals] = useState([
    {
      id: 1,
      name: 'Ayo Ventures',
      type: 'Investor',
      status: 'In Conversation',
      summary: 'Interested in follow-up, asked for updated pitch deck.',
      sentiment: 'Positive',
      lastActivity: '2025-05-29',
    },
    {
      id: 2,
      name: 'TechSpark Inc.',
      type: 'Customer',
      status: 'Committed',
      summary: 'Pilot signed off. Awaiting onboarding.',
      sentiment: 'Excited',
      lastActivity: '2025-05-27',
    },
  ]);

  const [newDeal, setNewDeal] = useState({
    name: '',
    type: '',
    status: '',
    summary: '',
    sentiment: '',
    lastActivity: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (e) => {
    setNewDeal({ ...newDeal, [e.target.name]: e.target.value });
  };

  const handleAddDeal = (e) => {
    e.preventDefault();
    const newEntry = { ...newDeal, id: deals.length + 1 };
    setDeals((prev) => [...prev, newEntry]);
    setNewDeal({
      name: '',
      type: '',
      status: '',
      summary: '',
      sentiment: '',
      lastActivity: new Date().toISOString().split('T')[0],
    });
    setShowModal(false);
  };

  const openDetailModal = (deal) => {
    setSelectedDeal(deal);
    setShowDetailModal(true);
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
        >
          <FiPlus /> Add Deal
        </button>
      </div>

      <h1 className="text-2xl font-bold text-purple-800 mt-6 mb-12">Deals Tracker</h1>

      {/* Deals Table */}
      <div className="overflow-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-sm">
          <thead className="bg-purple-100 text-purple-800 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Status</th>
              <th className="p-4">Summary</th>
              <th className="p-4">Sentiment</th>
              <th className="p-4">Last Activity</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{deal.name}</td>
                <td className="p-4">{deal.type}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-semibold">
                    {deal.status}
                  </span>
                </td>
                <td className="p-4">{deal.summary}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      deal.sentiment === 'Positive'
                        ? 'bg-green-100 text-green-700'
                        : deal.sentiment === 'Excited'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {deal.sentiment}
                  </span>
                </td>
                <td className="p-4">{deal.lastActivity}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button
                    onClick={() => openDetailModal(deal)}
                    className="text-purple-700 hover:underline"
                    title="View Details"
                  >
                    <FiEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Deal Modal */}
      {showModal && (
        <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center p-6">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold text-purple-800 mb-4">Add New Deal</h2>
            <form onSubmit={handleAddDeal} className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="Deal Name (e.g., Kofi Ventures)"
                value={newDeal.name}
                onChange={handleInputChange}
                required
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              />
              <select
                name="type"
                value={newDeal.type}
                onChange={handleInputChange}
                required
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              >
                <option value="" disabled>Select Type</option>
                <option value="Investor">Investor</option>
                <option value="Customer">Customer</option>
                <option value="Partner">Partner</option>
              </select>
              <select
                name="status"
                value={newDeal.status}
                onChange={handleInputChange}
                required
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              >
                <option value="" disabled>Select Status</option>
                <option value="Interested">Interested</option>
                <option value="In Conversation">In Conversation</option>
                <option value="Committed">Committed</option>
                <option value="Lost">Lost</option>
                <option value="Closed">Closed</option>
              </select>
              <input
                name="summary"
                type="text"
                placeholder="Short summary of interaction"
                value={newDeal.summary}
                onChange={handleInputChange}
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              />
              <select
                name="sentiment"
                value={newDeal.sentiment}
                onChange={handleInputChange}
                required
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              >
                <option value="" disabled>Sentiment</option>
                <option value="Positive">Positive</option>
                <option value="Excited">Excited</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-full border text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition"
                >
                  Save Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailModal && selectedDeal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center p-6">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold text-purple-800 mb-4">Deal Details</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Name:</strong> {selectedDeal.name}</li>
              <li><strong>Type:</strong> {selectedDeal.type}</li>
              <li><strong>Status:</strong> {selectedDeal.status}</li>
              <li><strong>Summary:</strong> {selectedDeal.summary}</li>
              <li><strong>Sentiment:</strong> {selectedDeal.sentiment}</li>
              <li><strong>Last Activity:</strong> {selectedDeal.lastActivity}</li>
            </ul>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
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

export default Deals;
