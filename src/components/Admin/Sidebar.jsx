import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  MdDashboard,
} from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaUserSecret } from "react-icons/fa";
import { BiSolidCoupon } from "react-icons/bi";
import { motion } from "framer-motion"; 
import logo from "../../assets/Logo/logo.png";

const Sidebar = ({ setAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("adminAuth"); // clear login flag
    setAuthenticated(false);
    navigate("/admin"); // redirect back to login screen
    window.location.reload();
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-orange-900 via-orange-800 to-orange-700 text-white flex flex-col shadow-2xl">
      {/* Admin profile */}
      <div className="flex flex-col items-center justify-center py-8 border-b border-orange-900">
        <img
          src={logo}
          alt="Admin Avatar"
          className="w-26 h-26 rounded-full bg-white/10 shadow-md"
        />
        <h2 className="mt-3 font-bold text-lg">Admin</h2>
        <p className="text-sm text-orange-200">System Manager</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-3 font-semibold text-lg">
        {[
          { path: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard size={22} /> },
          { path: "/admin/orders", label: "Orders", icon: <IoNewspaperOutline size={22} /> },
          { path: "/admin/coupon", label: "Coupon", icon: <BiSolidCoupon size={22} /> },
          { path: "/admin/users", label: "Users", icon: <FaUserSecret size={22} /> },
        ].map((item) => (
          <motion.div whileHover={{ scale: 1.05 }} key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-4 px-5 py-3 rounded-lg transition-all duration-300 ${
                isActive(item.path)
                  ? "bg-white text-orange-700 shadow-lg font-bold"
                  : "hover:bg-orange-600 hover:shadow-md"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-6 py-5 border-t border-orange-700">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90 transition"
        >
          🚪 Logout
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;
