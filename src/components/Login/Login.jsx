import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
       method: "POST",
        credentials: "include", // ⚠ important
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ store only non-sensitive info
        localStorage.setItem("userName", data.user?.name || "");
        setMessage("✅ Login successful!");
        navigate("/");
        window.location.reload();
      } else {
        setMessage(data.error || "Invalid credentials.");
      }
    } catch (err) {
      setMessage("⚠️ Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-orange-100 via-white to-orange-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-xl w-96 border border-gray-200"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Log in to continue to your account
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-orange-500 text-white cursor-pointer py-3 rounded-lg hover:bg-orange-600 transition duration-200 font-semibold text-lg"
        >
          Log In
        </button>

        {/* Error / Success Message */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.startsWith("✅")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Link */}
        <p className="mt-6 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
