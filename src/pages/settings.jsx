import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: "Agnes Dansowaa",
    email: "agnes@example.com",
    password: "",
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    language: "en",
  });

  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handlePreferencesChange = (e) => {
    const { name, type, checked, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    alert("✅ Settings saved successfully!");
    console.log({ profile, preferences });
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
       <button
                      onClick={() => navigate("/dashboard")}
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-600 text-purple-700 bg-white hover:bg-purple-50 transition"
                    >
                      <FiArrowLeft/> Back to Dashboard
                    </button>
      <h1 className="text-3xl font-bold text-purple-800 mb-6 mt-12">Settings</h1>

      {/* Profile Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">👤 Profile Settings</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleProfileChange}
            placeholder="Full Name"
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleProfileChange}
            placeholder="Email"
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleProfileChange}
            placeholder="New Password"
            className="px-4 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* Preferences Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">⚙️ Preferences</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="darkMode"
              checked={preferences.darkMode}
              onChange={handlePreferencesChange}
              className="h-4 w-4 text-purple-600"
            />
            Enable Dark Mode
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="notifications"
              checked={preferences.notifications}
              onChange={handlePreferencesChange}
              className="h-4 w-4 text-purple-600"
            />
            Email Notifications
          </label>
          <div className="col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">Language</label>
            <select
              name="language"
              value={preferences.language}
              onChange={handlePreferencesChange}
              className="w-full px-4 py-2 border rounded-md"
            >
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="es">Spanish</option>
              <option value="sw">Swahili</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
