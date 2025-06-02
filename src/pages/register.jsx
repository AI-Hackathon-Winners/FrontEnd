import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import registerLoginImage from "../assets/images/registerLoginImage.png";
import registerLoginBg from "../assets/images/registerLoginBg.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";
import { LineWave } from "react-loader-spinner";


const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format.";
    if (!form.password) newErrors.password = "Password is required.";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    if (!form.confirm) newErrors.confirm = "Confirm password is required.";
    else if (form.confirm !== form.password) newErrors.confirm = "Passwords do not match.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        const res = await axios.post("https://backend-5wa5.onrender.com/users/register", {
          fullName: form.name,
          email: form.email,
          password: form.password,
          /*confirmPassword: form.confirm,*/ // Backend will now accept this
        });

        if (res.status === 201 || res.status === 200) {
          toast.success("Account created successfully!");
          navigate("/login");
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error(
          error.response?.data?.message ||
          "Registration failed. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${registerLoginBg})` }}
    >
      <div className="bg-white w-[800px] max-w-5xl rounded-3xl overflow-hidden shadow-xl flex">
        {/* Left Side */}
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold text-purple-800 mb-8">Sign up</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-xs text-gray-800 font-thin">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`w-full rounded-full px-4 py-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-900 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs text-gray-800 font-thin">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full rounded-full px-4 py-2 bg-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-900 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password + Confirm */}
            <div className="flex gap-4">
              {/* Password */}
              <div className="flex flex-col gap-1 w-1/2 relative">
                <label htmlFor="password" className="text-xs text-gray-800 font-thin">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`rounded-full w-full px-4 py-2 bg-gray-100 pr-10 focus:outline-none focus:ring-1 focus:ring-purple-900 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-600 cursor-pointer"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col gap-1 w-1/2 relative">
                <label htmlFor="confirm" className="text-xs text-gray-800 font-thin">
                  Confirm Password
                </label>
                <input
                  type={showConfirm ? "text" : "password"}
                  id="confirm"
                  name="confirm"
                  value={form.confirm}
                  onChange={handleChange}
                  className={`rounded-full w-full px-4 py-2 bg-gray-100 pr-10 focus:outline-none focus:ring-1 focus:ring-purple-900 ${
                    errors.confirm ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-8 text-gray-600 cursor-pointer"
                >
                  {showConfirm ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
                {errors.confirm && <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>}
              </div>
            </div>

           <button
             type="submit"
             disabled={loading}
             className="w-full rounded-full bg-gradient-to-r from-purple-700 to-indigo-800 text-white font-semibold py-2 flex items-center justify-center"
           >
              {loading ? (
                     <LineWave
                       visible={true}
                       height="30"
                       width="100"
                       color="#fff"
                       ariaLabel="line-wave-loading"
                    />
                ) : (
                      "Create Account"
                    )}
            </button>
            <p className="text-left text-sm text-gray-500">
              or{" "}
              <span className="text-purple-600 cursor-pointer" onClick={() => navigate("/login")}>
                log in
              </span>
            </p>
          </form>
        </div>

        {/* Right Image */}
        <div
          className="hidden md:flex w-1/2 relative bg-cover bg-center"
          style={{ backgroundImage: `url(${registerLoginImage})` }}
        />
      </div>
    </div>
  );
};

export default Register;
