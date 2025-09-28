import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaUserSecret } from "react-icons/fa";
import { BiSolidCoupon } from "react-icons/bi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { motion } from "framer-motion"; 
import logo from "../../assets/Logo/logo.png";

const Sidebar = ({ setAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Automatically collapse on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    handleResize(); // set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    setAuthenticated(false);
    navigate("/admin");
    window.location.reload();
  };

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard size={22} /> },
    { path: "/admin/orders", label: "Orders", icon: <IoNewspaperOutline size={22} /> },
    { path: "/admin/coupon", label: "Coupon", icon: <BiSolidCoupon size={22} /> },
    { path: "/admin/users", label: "Users", icon: <FaUserSecret size={22} /> },
  ];

  const sidebarVariants = {
    expanded: { width: "16rem" },
    collapsed: { width: "4rem" },
  };

  return (
    <motion.div
      variants={sidebarVariants}
      animate={collapsed ? "collapsed" : "expanded"}
      className="h-screen bg-gradient-to-b from-orange-900 via-orange-800 to-orange-700 text-white flex flex-col shadow-2xl transition-all duration-300 relative"
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-4 -right-3 w-7 h-7 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-orange-600 transition"
      >
        <motion.div
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {collapsed ? <HiChevronRight size={20} /> : <HiChevronLeft size={20} />}
        </motion.div>
      </button>

      <div className={`flex flex-col items-center justify-center py-6 border-b border-orange-900 transition-all duration-300 ${collapsed ? "opacity-0 h-0" : "opacity-100"}`}>
        <img
          src={logo}
          alt="Admin Avatar"
          className="w-24 h-24 rounded-full bg-white/10 shadow-md"
        />
        <h2 className="mt-3 font-bold text-lg">Admin</h2>
        <p className="text-sm text-orange-200">System Manager</p>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-3 font-semibold text-lg">
        {navItems.map((item) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={item.path}
            className="overflow-hidden rounded-lg"
          >
            <Link
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive(item.path)
                  ? "bg-white text-orange-700 shadow-lg font-bold"
                  : "hover:bg-orange-600 hover:shadow-md"
              }`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          </motion.div>
        ))}
      </nav>

      <div className={`px-4 py-5 border-t border-orange-700 transition-all duration-300 ${collapsed ? "opacity-0 h-0" : "opacity-100"}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-90 transition"
        >
         Logout
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;
