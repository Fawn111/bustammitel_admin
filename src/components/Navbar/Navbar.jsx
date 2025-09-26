import { Link, useNavigate } from "react-router-dom";
import { Globe, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../../assets/Logo/logo.png";

export default function Navbar() {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  // ✅ Load user name from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);

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
    navigate("/");
  };

  return (
    <nav className="w-full bg-[#faf4ef] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Left - Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="eSIM Logo" className="h-22 w-22" /> {/* smaller logo */}
        </Link>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          <button className="p-1.5 hover:bg-gray-200 rounded-full">
            <Globe className="h-4 w-4 text-black" />
          </button>

          <button className="p-1.5 hover:bg-gray-200 rounded-full">
            <CreditCard className="h-4 w-4 text-black" />
          </button>

          <div className="h-6 w-px bg-gray-300"></div>

          {userName ? (
            <div className="flex items-center space-x-3">
              <span className="font-medium text-gray-800 text-sm">
                Hi, {userName}
              </span>

              <Link
                to="/my-esims"
                className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition"
              >
                My eSIMs
              </Link>

              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-1 border border-gray-300 rounded-full text-sm font-medium text-black hover:bg-gray-100"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-medium hover:bg-orange-600"
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
