import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SubNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🔹 Scroll helper
  const handleScrollToStore = (e) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/");
      // wait for navigation
      setTimeout(() => {
        const element = document.getElementById("estore");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      const element = document.getElementById("estore");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "eSIM Store", path: "/store", scroll: true }, // 🔹 scroll flag
    { name: "How Bustammitel Works", path: "/how-it-works" },
    { name: "Compatibility", path: "/compatibility" },
    { name: "Our Services", path: "/services" },
    { name: "About Bustammitel", path: "/about" },
  ];

  return (
    <nav className="w-full bg-[#faf4ef] border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-8 px-6 py-3">
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
    </nav>
  );
}
