import { Link, useNavigate } from "react-router-dom";
import { Globe, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../../assets/Logo/logo.png";

export default function Navbar() {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  // ✅ Load user name from localStorage when navbar mounts
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);

    // 🔹 Listen for changes in localStorage (like login/logout)
    const handleStorage = () => {
      setUserName(localStorage.getItem("userName"));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUserName(null);

    navigate("/"); // go back to home
  };

  return (
    <nav className="w-full bg-[#faf4ef] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-1">
        {/* Left - Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="eSIM Logo" className="h-32 w-32" />
        </Link>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <Globe className="h-5 w-5 text-black" />
          </button>

          <button className="p-2 hover:bg-gray-200 rounded-full">
            <CreditCard className="h-5 w-5 text-black" />
          </button>

          <div className="h-8 w-px bg-gray-300"></div>

          {userName ? (
            // ✅ Logged-in state
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-gray-800">
                Hi, {userName}
              </span>

              {/* 🔹 Show My eSIMs only when logged in */}
              <Link
                to="/my-esims"
                className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition"
              >
                My eSIMs
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            // ❌ Not logged-in state
            <>
              <Link
                to="/login"
                className="px-5 py-2 border border-gray-300 rounded-full text-lg font-medium text-black hover:bg-gray-100"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-orange-500 text-white rounded-full text-lg font-medium hover:bg-orange-600"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
