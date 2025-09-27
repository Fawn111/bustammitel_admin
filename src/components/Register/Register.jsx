import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Registered successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("❌ " + data.error);
      }
    } catch (err) {
      setMessage("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-100 via-white to-orange-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-4 sm:mb-6 text-gray-800">
          Create Account ✨
        </h2>
        <p className="text-center text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base">
          Fill in your details to get started
        </p>

        {/* Full Name */}
<div className="mb-4">
  <label className="block text-gray-700 font-medium mb-1 sm:mb-2">
    Full Name
  </label>
  <input
    type="text"
    name="name"
    placeholder="Enter your full name"
    className="w-full p-3 sm:p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
    onChange={handleChange}
    required
  />
</div>

{/* Email */}
<div className="mb-4">
  <label className="block text-gray-700 font-medium mb-1 sm:mb-2">
    Email Address
  </label>
  <input
    type="email"
    name="email"
    placeholder="Enter your email"
    className="w-full p-3 sm:p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
    onChange={handleChange}
    required
  />
</div>

{/* Password */}
<div className="mb-6">
  <label className="block text-gray-700 font-medium mb-1 sm:mb-2">
    Password
  </label>
  <input
    type="password"
    name="password"
    placeholder="••••••••"
    className="w-full p-3 sm:p-3.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition"
    onChange={handleChange}
    required
  />
</div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white cursor-pointer py-3 sm:py-3.5 rounded-lg hover:bg-orange-600 transition duration-200 font-semibold text-lg"
        >
          Register
        </button>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-600 text-sm sm:text-base">
          Already registered?{" "}
          <Link
            to="/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
