import React, { useState } from "react";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="h-16 bg-gradient-to-br from-orange-700 via-orange-700 to-orange-800 shadow-md px-8 py-2 flex items-center justify-between">
      <h1 className="text-white text-xl lg:text-xl font-extrabold tracking-wide font-secondary">
        Admin Dashboard
      </h1>

      <div className="relative flex items-center gap-3 text-white cursor-pointer select-none">
        <div
          className="flex items-center gap-2 group"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <FaUserCircle size={28} />
          <span className="font-semibold hover:underline">Admin</span>
          <motion.div
            animate={{ rotate: dropdownOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <FaChevronDown size={14} className="mt-1" />
          </motion.div>
        </div>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-12 w-40 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50"
            >
              <li className="px-4 py-2 hover:bg-orange-100 cursor-pointer transition">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-orange-100 cursor-pointer transition">
                Settings
              </li>
              <li className="px-4 py-2 hover:bg-orange-100 cursor-pointer transition">
                Logout
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Topbar;
