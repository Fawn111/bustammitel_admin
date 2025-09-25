import { Link } from "react-router-dom";
import { Globe, CreditCard } from "lucide-react";
import logo from "../../assets/Logo/logo.png";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#faf4ef] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 py-1">
        {/* Left - Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo}
            alt="eSIM Logo"
            className="h-32 w-32" 
          />
       {/* <span className="text-4xl font-extrabold tracking-tight text-gray-700">
  Bustammitel
</span> */}

        </Link>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-200 rounded-full">
            <Globe className="h-5 w-5 text-black" />
          </button>

          <button className="p-2 hover:bg-gray-200 rounded-full">
            <CreditCard className="h-5 w-5 text-black" />
          </button>

          <div className="h-8 w-px bg-gray-300"></div>

          <Link
            to="/login"
            className="px-5 py-2 border border-gray-300 rounded-full text-lg font-medium text-black hover:bg-gray-100"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2 bg-orange-500 text-white rounded-full text-lg font-medium hover:bg-orange-600"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
