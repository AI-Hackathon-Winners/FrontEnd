import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import registerLoginImage from "../assets/images/registerLoginImage.png";
import registerLoginBg from "../assets/images/registerLoginBg.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format.";

    if (!form.password) newErrors.password = "Password is required.";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
     try {
  setLoading(true);
  const res = await axios.post("https://backend-5wa5.onrender.com/users/login", {
    email: form.email,
    password: form.password,
  });

  const { accessToken, role } = res.data;

// Save to localStorage
localStorage.setItem("token", accessToken);
localStorage.setItem("role", role);

// Optionally store the whole res.data if needed
localStorage.setItem("user", JSON.stringify(res.data)); // or skip if not needed

toast.success("Login successful!");

// Redirect based on role
if (role === "admin") {
  navigate("/admin/dashboard");
} else {
  navigate("/dashboard");
}

} catch (error) {
  console.error("Login error:", error);
  if (error.response?.status === 401) {
    toast.error("Invalid credentials. Please try again.");
  } else {
    toast.error("Something went wrong. Try again later.");
  }
  setLoading(false);
}
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${registerLoginBg})` }}>
      <div className="bg-white w-[800px] max-w-5xl rounded-3xl overflow-hidden shadow-xl flex">

        {/* Left side – form */}
        <div className="w-1/2 md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-purple-800 mb-8">Log in</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs text-gray-800 font-thin">Email Address</label>
              <input
                type="text"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded-full px-4 py-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-600 ${errors.email ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <label htmlFor="password" className="text-xs text-gray-800 font-thin">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full rounded-full px-4 py-2 pr-10 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-600 ${errors.password ? "border-red-500" : "border-gray-300"}`}
              />
              <span
                className="absolute right-3 top-8 text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Extras */}
            <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
              <label>
                <input type="checkbox" className="mr-2" /> Remember Me
              </label>
              <span className="cursor-pointer hover:underline">Forgot Password?</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-purple-700 to-indigo-800 text-white font-semibold py-2"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <p className="text-left text-sm text-gray-500">
              or{" "}
              <span className="text-purple-600 cursor-pointer" onClick={() => navigate("/register")}>
                create account
              </span>
            </p>
          </form>
        </div>

        {/* Right side – background image */}
        <div
          className="hidden md:flex w-1/2 relative bg-cover bg-center"
          style={{ backgroundImage: `url(${registerLoginImage})` }}
        />
      </div>
    </div>
  );
};

export default Login;