import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiPlus, FiEdit, FiTrash2, FiEye } from "react-icons/fi";

const Leads = () => {
  const navigate = useNavigate();

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "New",
      note: 'I will get back to you',
      source: "Website",
      created: "2025-05-10",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Contacted",
      note: 'Lets move on with the deal',
      source: "LinkedIn",
      created: "2025-05-12",
    },
  ]);

  const [query, setQuery] = useState("");
  const [filteredLeads, setFilteredLeads] = useState(leads);
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    status: "",
    note: '',
    source: "",
    
  });

  useEffect(() => {
    const q = query.toLowerCase();
    const results = leads.filter((lead) => {
      return (
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.status.toLowerCase().includes(q) ||
        lead.note.toLowerCase().includes(q) ||
        lead.source.toLowerCase().includes(q) ||
        lead.created.includes(q)
      );
    });
    setFilteredLeads(results);
  }, [query, leads]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead({ ...newLead, [name]: value });
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    const created = new Date().toISOString().split("T")[0];
    setLeads([...leads, { ...newLead, id: leads.length + 1, created }]);
    setNewLead({ name: "", email: "", status: "", note: '', source: "" });
    setShowModal(false);
  };

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-purple-800">Leads</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-yellow-400 text-purple-900 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
          >
            <FiPlus /> New Lead
          </button>
           <button
            onClick={() => navigate("/leadScoring")}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-purple-700 transition"
          >
            View Lead Scoring
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center w-full md:max-w-sm border border-purple-300 rounded-full bg-white px-4 py-2 shadow-sm">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search leads naturally… (e.g. contacted from LinkedIn)"
            className="w-full outline-none text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="rounded-full px-4 py-2 border text-sm shadow-sm focus:ring-purple-500 focus:outline-none">
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Closed">Closed</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-sm">
          <thead className="bg-purple-100 text-purple-800 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Note</th>
              <th className="p-4">Source</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="border-t hover:bg-gray-50">
                <td className="p-4 font-medium">{lead.name}</td>
                <td className="p-4">{lead.email}</td>
                <td className="p-4">{lead.status}</td>
                 <td className="p-4">{lead.note}</td>
                <td className="p-4">{lead.source}</td>
                <td className="p-4">{lead.created}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button className="text-purple-700 hover:underline" title="View">
                    <FiEye />
                  </button>
                  <button className="text-indigo-700 hover:underline" title="Edit">
                    <FiEdit />
                  </button>
                  <button className="text-red-500 hover:underline" title="Delete">
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No leads match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add New Lead Modal */}
      {showModal && (
        <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold mb-4 text-purple-800">Add New Lead</h2>
            <form onSubmit={handleAddLead} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={newLead.name}
                onChange={handleInputChange}
                required
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={newLead.email}
                onChange={handleInputChange}
                required
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              />
             <select
                name="status"
                value={newLead.status}
                onChange={handleInputChange}
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
             >
             <option value="" disabled selected>
                Status
             </option>
             <option value="New">New</option>
             <option value="Contacted">Contacted</option>
             <option value="Closed">Closed</option>
             </select>
              <textarea
                 name="note"
                 placeholder="Add a note about the lead..."
                 value={newLead.note}
                 onChange={handleInputChange}
                 className="w-full rounded-lg border px-4 py-2 bg-gray-100 resize-none"
                 rows={4}
                />
              <input
                type="text"
                name="source"
                placeholder="Lead Source (e.g. Website, LinkedIn)"
                value={newLead.source}
                onChange={handleInputChange}
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              />
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
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leads;
