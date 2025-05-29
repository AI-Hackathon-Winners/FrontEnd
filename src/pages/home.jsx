import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import featuresSectionBg from '../assets/images/featuresSectionBg.png';
import homeImage from '../assets/images/homeImage.jpeg';


const Home = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  return (
     <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      {/* Navbar */}
 <header className="flex justify-between items-center px-6 md:px-20 py-6">
  <h1 className="text-3xl font-bold font-mono">Bondly</h1>
    <nav className="space-x-6 text-sm md:text-base">
        <button className="hover:underline" onClick={() => navigate("/")}>Home</button>

       {/* Dropdown Wrapper */}
   <div
  className="inline-block relative"
  onMouseEnter={() => setShowDropdown(true)}
  onMouseLeave={() => setShowDropdown(false)}
>
  <button className="hover:underline focus:outline-none">Features</button>

  {showDropdown && (
    <div className="absolute top-full mt-2 left-0 bg-white text-gray-800 rounded-md shadow-lg w-52 z-50">
      <a href="#features" className="block px-4 py-2 hover:bg-purple-100">Overview</a>
      <a href="#smart-summary" className="block px-4 py-2 hover:bg-purple-100">Smart Summaries</a>
      <a href="#sentiment" className="block px-4 py-2 hover:bg-purple-100">Sentiment Detection</a>
      <a href="#followups" className="block px-4 py-2 hover:bg-purple-100">Follow-Up Generator</a>
    </div>
  )}
</div>

  <button className="hover:underline">Contact</button>

  <button
    onClick={() => navigate("/login")}
    className="border border-yellow-300 text-yellow-300 font-semibold px-4 py-2 rounded-full hover:bg-yellow-300 hover:text-purple-900 transition"
  >
    Log In
  </button>

  <button
    onClick={() => navigate("/register")}
    className="bg-yellow-400 text-purple-900 font-semibold px-4 py-2 rounded-full hover:bg-yellow-300 transition"
  >
    Sign Up
  </button>
 </nav>
</header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-20">
       <div className="max-w-xl">
  <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white">
    Building strong customer bonds <br />
    <span className="text-yellow-300">effortlessly</span>
  </h2>
  <p className="mb-8 text-lg text-gray-200 leading-relaxed">
    <strong>Bondly</strong> is your smart, simple, and AI-powered CRM. 
    Manage leads, automate follow-ups, and understand customer emotions — all without the chaos.
  </p>
  <button
    onClick={() => navigate("/register")}
    className="bg-white text-purple-900 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition shadow-md"
  >
    Try Bondly Free
  </button>
</div>

        {/* Right Side Image or Graphic */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0">
          <div className="w-full h-72 md:h-96 bg-gradient-to-tr from-indigo-500 to-purple-700 rounded-3xl shadow-xl flex items-center justify-center">
            <img src={homeImage} alt="image" className='rounded-3xl' />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
      id='features' 
       className=" text-gray-800 py-16 px-6 md:px-20 "
      style={{ backgroundImage: `url(${featuresSectionBg})` }}>

        <h3 className="text-3xl font-bold text-center mb-10">What Makes Us Smart</h3>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h4 className="text-xl font-semibold mb-2">AI Conversation Summaries</h4>
            <p>Get quick insights from long chats or emails with smart AI-generated summaries.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">Sentiment & Emotion Detection</h4>
            <p>Know how your customers feel and act before it's too late.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-2">Smart Follow-Up Generator</h4>
            <p>Let AI write and schedule thoughtful follow-up sequences for you.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-300 bg-gradient-to-br from-purple-600 to-indigo-600">
        &copy; {new Date().getFullYear()} BONDLY. All rights reserved.
      </footer>
    </div>
  )
}

export default Home