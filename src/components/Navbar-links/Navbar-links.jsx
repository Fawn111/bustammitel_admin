import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function SubNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 🔹 Scroll helper
  const handleScrollToStore = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById("estore");
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      const element = document.getElementById("estore");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
    setDropdownOpen(false);
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "eSIM Store", path: "/store", scroll: true },
    { name: "How Bustammitel Works", path: "/how-it-works" },
    { name: "Compatibility", path: "/compatibility" },
    { name: "Our Services", path: "/services" },
    { name: "About Bustammitel", path: "/about" },
  ];

  return (
    <nav className="w-full bg-[#faf4ef] border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-center px-6 py-3">
        {/* Logo or title */}

        {/* Desktop Links */}
        <div className="hidden md:flex items-center justify-center space-x-8 w-full">
          {links.map((link) =>
            link.scroll ? (
              <button
                key={link.name}
                onClick={handleScrollToStore}
                className="text-sm font-medium text-gray-800 hover:text-black"
              >
                {link.name}
              </button>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? "text-black underline underline-offset-4 font-semibold"
                      : "text-gray-800 hover:text-black"
                  }`
                }
              >
                {link.name}
              </NavLink>
            )
          )}
        </div>

        {/* Mobile Dropdown */}
        <div className="md:hidden relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center px-3 py-2 text-gray-800 font-medium hover:bg-gray-200 rounded-md"
          >
            Menu
            {dropdownOpen ? (
              <ChevronUp className="ml-2 h-5 w-5" />
            ) : (
              <ChevronDown className="ml-2 h-5 w-5" />
            )}
          </button>

          {/* Dropdown Content */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition-all duration-300 ease-out">
              {links.map((link) =>
                link.scroll ? (
                  <button
                    key={link.name}
                    onClick={handleScrollToStore}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    {link.name}
                  </button>
                ) : (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setDropdownOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-left text-gray-800 hover:bg-gray-100 ${
                        isActive ? "font-semibold text-black" : ""
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
