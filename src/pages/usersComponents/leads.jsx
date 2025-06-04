import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiArrowLeft,
} from "react-icons/fi";

const Leads = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    note: "",
    source: "",
  });

  // Temporal (demo) leads
  const demoLeads = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "0554758965",
      status: "New",
      note: "Interested in our services",
      source: "WhatsApp",
      created: "2025-06-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@demo.com",
      phone: "0539975648",
      status: "Contacted",
      note: "Follow up next week",
      source: "Email",
      created: "2025-06-02",
    },
  ];

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get("http://localhost:4000/leads");
        const data = res.data;
        if (data.length === 0) {
          setLeads(demoLeads); // use temporal leads if empty
        } else {
          setLeads(data);
        }
      } catch (err) {
        console.error("Failed to fetch leads, using demo leads", err);
        setLeads(demoLeads); // fallback to demo leads if API fails
      }
    };
    fetchLeads();
  }, []);

  useEffect(() => {
    const filtered = leads.filter((lead) => {
      const matchesQuery =
        query === "" ||
        Object.values(lead).some((val) =>
          String(val).toLowerCase().includes(query.toLowerCase())
        );
      const matchesStatus = statusFilter === "" || lead.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
    setFilteredLeads(filtered);
  }, [leads, query, statusFilter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLead({ ...newLead, [name]: value });
  };

  const handleAddLead = async (e) => {
    e.preventDefault();
    const created = new Date().toISOString().split("T")[0];
    try {
      const res = await axios.post("http://localhost:4000/leads", {
        ...newLead,
        created,
      });
      setLeads((prev) => [...prev, res.data]);
      setShowModal(false);
      setNewLead({
        name: "",
        email: "",
        phone: "",
        status: "",
        note: "",
        source: "",
      });
    } catch (err) {
      console.error("Failed to add lead", err);
    }
  };

  const handleDeleteLead = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/leads/${id}`);
      setLeads(leads.filter((lead) => lead.id !== id));
    } catch (err) {
      console.error("Failed to delete lead", err);
    }
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
        >
          <FiArrowLeft /> Back to Dashboard
        </button>

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

      {/* Page Heading */}
      <h1 className="text-2xl font-bold text-purple-800 mb-2">Leads</h1>
      <p className="text-sm text-gray-600 mb-6">
        Track early interest across investors, users, or partners and never let a warm lead go cold.
      </p>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center w-full md:max-w-sm border border-purple-300 rounded-full bg-white px-4 py-2 shadow-sm">
          <FiSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search leads naturally…"
            className="w-full outline-none text-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-full px-4 py-2 border text-sm shadow-sm"
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="overflow-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-sm">
          <thead className="bg-purple-100 text-purple-800 text-left">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
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
                <td className="p-4">{lead.phone}</td>
                <td className="p-4">{lead.status}</td>
                <td className="p-4">{lead.note}</td>
                <td className="p-4">{lead.source}</td>
                <td className="p-4">{lead.created}</td>
                <td className="p-4 flex justify-end gap-2">
                 
                  <button className="text-indigo-700 hover:underline" title="Edit">
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteLead(lead.id)}
                    className="text-red-500 hover:underline"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
            <h2 className="text-lg font-bold mb-4 text-purple-800">Add New Prospect</h2>
            <form onSubmit={handleAddLead} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Investor, Customer, or Partner Name"
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
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={newLead.phone}
                onChange={handleInputChange}
                required
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              />
              <select
                name="status"
                value={newLead.status}
                onChange={handleInputChange}
                required
                className="w-full rounded-full border px-4 py-2 bg-gray-100"
              >
                <option value="" disabled>Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
              </select>
              <textarea
                name="note"
                placeholder="What did they say? Next steps?"
                value={newLead.note}
                onChange={handleInputChange}
                className="w-full rounded-lg border px-4 py-2 bg-gray-100 resize-none"
                rows={3}
              />
              <input
                type="text"
                name="source"
                placeholder="Where did they come from? (e.g. LinkedIn, demo)"
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
