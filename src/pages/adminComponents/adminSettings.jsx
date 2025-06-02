import React from 'react'
import  { useState } from 'react';
import { FiSettings, FiMail, FiPhone, FiMapPin, FiToggleLeft, FiToggleRight, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdminSettings = () => {
   const [company, setCompany] = useState({
    name: 'Bondly Technologies',
    address: 'Accra, Ghana',
    email: 'admin@bondly.com',
    phone: '+233 555 123 456',
  });

  const [preferences, setPreferences] = useState({
    maintenanceMode: false,
    allowUserRegistration: true,
    enableNotifications: true,
  });

  const navigate = useNavigate();

  const handleCompanyChange = (e) =>
    setCompany({ ...company, [e.target.name]: e.target.value });

  const togglePreference = (key) =>
    setPreferences({ ...preferences, [key]: !preferences[key] });

  const handleSave = () => {
    toast.success(' Admin settings saved successfully!');
    console.log({ company, preferences });
  };

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      <button
        onClick={() => navigate('/adminDashboard')}
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
      >
          <FiArrowLeft/> Back to Dashboard
      </button>
      <h1 className="text-3xl font-bold text-purple-800 mb-6 mt-12 "> Admin Settings</h1>

      {/* Company Info */}
      <motion.div
        className="bg-white rounded-2xl shadow-md p-6 mb-10"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
          <FiSettings /> Company Information
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={company.name}
            onChange={handleCompanyChange}
            placeholder="Company Name"
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="address"
            value={company.address}
            onChange={handleCompanyChange}
            placeholder="Address"
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            value={company.email}
            onChange={handleCompanyChange}
            placeholder="Email"
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            name="phone"
            value={company.phone}
            onChange={handleCompanyChange}
            placeholder="Phone Number"
            className="px-4 py-2 border rounded-md"
          />
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        className="bg-white rounded-2xl shadow-md p-6 mb-10"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
          <FiSettings /> Admin Preferences
        </h2>
        <div className="space-y-6">
          {/* Maintenance Mode */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Enable Maintenance Mode</span>
            <button
              onClick={() => togglePreference('maintenanceMode')}
              className="text-2xl"
            >
              {preferences.maintenanceMode ? (
                <FiToggleRight className="text-purple-600" />
              ) : (
                <FiToggleLeft className="text-gray-400" />
              )}
            </button>
          </div>

          {/* Allow User Registration */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Allow New User Registrations</span>
            <button
              onClick={() => togglePreference('allowUserRegistration')}
              className="text-2xl"
            >
              {preferences.allowUserRegistration ? (
                <FiToggleRight className="text-purple-600" />
              ) : (
                <FiToggleLeft className="text-gray-400" />
              )}
            </button>
          </div>

          {/* Enable Notifications */}
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Enable System Notifications</span>
            <button
              onClick={() => togglePreference('enableNotifications')}
              className="text-2xl"
            >
              {preferences.enableNotifications ? (
                <FiToggleRight className="text-purple-600" />
              ) : (
                <FiToggleLeft className="text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}

export default AdminSettings