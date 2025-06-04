import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Deals = () => {
  const navigate = useNavigate();

  /* ---------------------- STATE ---------------------- */
  const [deals, setDeals] = useState([
    {
      id: 1,
      name: 'Ayo Ventures',
      relationship: 'Investor',
      status: 'In Conversation',
      summary: 'Interested in follow-up, asked for updated pitch deck.',
      sentiment: 'Positive',
      lastActivity: '2025-05-29',
    },
    {
      id: 2,
      name: 'TechSpark Inc.',
      relationship: 'Customer',
      status: 'Committed',
      summary: 'Pilot signed off. Awaiting onboarding.',
      sentiment: 'Excited',
      lastActivity: '2025-05-27',
    },
  ]);

  /* –– create / edit modal –– */
  const [showFormModal, setShowFormModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formDeal, setFormDeal] = useState({
    id: null,
    name: '',
    relationship: '',
    status: '',
    summary: '',
    sentiment: '',
    lastActivity: new Date().toISOString().split('T')[0],
  });

  /* –– delete modal –– */
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dealToDelete, setDealToDelete] = useState(null);

  /* ------------------ HANDLERS ------------------ */
  const openNewDealModal = () => {
    setIsEditing(false);
    setFormDeal({
      id: null,
      name: '',
      relationship: '',
      status: '',
      summary: '',
      sentiment: '',
      lastActivity: new Date().toISOString().split('T')[0],
    });
    setShowFormModal(true);
  };

  const openEditModal = (deal) => {
    setIsEditing(true);
    setFormDeal(deal);
    setShowFormModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormDeal((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // update existing
      setDeals((prev) =>
        prev.map((d) => (d.id === formDeal.id ? formDeal : d))
      );
    } else {
      // add new
      setDeals((prev) => [
        ...prev,
        { ...formDeal, id: Date.now() },
      ]);
    }
    setShowFormModal(false);
  };

  const openDeleteModal = (deal) => {
    setDealToDelete(deal);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setDeals((prev) => prev.filter((d) => d.id !== dealToDelete.id));
    setShowDeleteModal(false);
  };

  /* -------------- RENDER -------------- */
  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      {/* header */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>
        <button
          onClick={openNewDealModal}
          className="flex items-center gap-2 bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
        >
          <FiPlus /> Add Deal
        </button>
      </div>

      <h1 className="text-2xl font-bold text-purple-800 mt-6 mb-12">
        Deals Tracker
      </h1>

      {/* table */}
      <div className="overflow-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-sm">
          <thead className="bg-purple-100 text-purple-800 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Relationship</th>
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
                <td className="p-4">{deal.relationship}</td>
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
                        : deal.sentiment === 'Neutral'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {deal.sentiment}
                  </span>
                </td>
                <td className="p-4">{deal.lastActivity}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button
                    onClick={() => openEditModal(deal)}
                    className="text-indigo-700 hover:underline"
                    title="Edit Deal"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => openDeleteModal(deal)}
                    className="text-red-500 hover:underline"
                    title="Delete Deal"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- ADD / EDIT MODAL ---------- */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center p-6">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <h2 className="text-xl font-bold text-purple-800 mb-4">
              {isEditing ? 'Edit Deal' : 'Add New Deal'}
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="Deal Name"
                value={formDeal.name}
                onChange={handleFormChange}
                required
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              />
              <select
                name="relationship"
                value={formDeal.relationship}
                onChange={handleFormChange}
                required
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              >
                <option value="" disabled>Select Relationship</option>
                <option value="Investor">Investor</option>
                <option value="Customer">Customer</option>
                <option value="Partner">Partner</option>
              </select>
              <select
                name="status"
                value={formDeal.status}
                onChange={handleFormChange}
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
                placeholder="Short summary"
                value={formDeal.summary}
                onChange={handleFormChange}
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              />
              <select
                name="sentiment"
                value={formDeal.sentiment}
                onChange={handleFormChange}
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
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2 rounded-full border text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-700 text-white rounded-full hover:bg-purple-800 transition"
                >
                  {isEditing ? 'Update Deal' : 'Save Deal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------- DELETE CONFIRMATION MODAL ---------- */}
      {showDeleteModal && dealToDelete && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center p-6">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-xl">
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              Delete Deal
            </h2>
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to delete <strong>{dealToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-full border text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deals;
