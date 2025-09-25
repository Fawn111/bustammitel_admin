import { NavLink } from "react-router-dom";

export default function SubNavbar() {
  const links = [
    { name: "Home", path: "/" },
    { name: "eSIM Store", path: "/store" },
    { name: "How Bustammitel Works", path: "/how-it-works" },
    { name: "Compatibility", path: "/compatibility" },
     { name: "Our Services", path: "/services" },
      { name: "About Bustammitel", path: "/about" },
  ];

  return (
    <nav className="w-full bg-[#faf4ef] border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-8 px-6 py-3">
        {links.map((link) => (
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
        ))}
      </div>
    </nav>
  );
}
