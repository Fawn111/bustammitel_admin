import { Link, useLocation } from "react-router-dom";
import {
  MdDashboard,
  MdProductionQuantityLimits,
} from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaUsers, FaUserSecret } from "react-icons/fa";
import { FaIdeal } from "react-icons/fa";
import { BiSolidCoupon } from "react-icons/bi";
import { HiReceiptTax } from "react-icons/hi";


const Sidebar = ({ setAuthenticated }) => {
  const location = useLocation();

  // Helper to check if the current path is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-56 h-screen bg-gradient-to-br from-orange-800 via-orange-700 to-orange-800 text-white flex flex-col shadow-2xl">
      <div className="px-6 py-6 text-3xl font-extrabold tracking-wide font-secondary border-b">
        Admin Panel
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 font-semibold text-lg">
        <Link
          to="/admin/dashboard"
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
            isActive("/admin/dashboard")
              ? "bg-white text-rose-600 shadow-lg font-bold"
              : "hover:bg-orange-500 hover:text-white"
          }`}
        >
          <MdDashboard size={22} />
          Dashboard
        </Link>

        <Link
          to="/admin/orders"
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
            isActive("/admin/orders")
                ? "bg-white text-rose-700 shadow-lg font-bold"
              : "hover:bg-orange-500 hover:text-white"
          }`}
        >
          <IoNewspaperOutline size={22} />
          Orders
        </Link>


        <Link
          to="/admin/coupon"
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
            isActive("/admin/coupon")
             ? "bg-white text-rose-600 shadow-lg font-bold"
              : "hover:bg-orange-500 hover:text-white"
          }`}
        >
          <BiSolidCoupon size={22} />
          Coupon
        </Link>

        <Link
          to="/admin/users"
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition ${
            isActive("/admin/users")
              ? "bg-white text-rose-600 shadow-lg font-bold"
              : "hover:bg-orange-500 hover:text-white"
          }`}
        >
          <FaUserSecret size={22} />
          Users
        </Link>
      
      </nav>

      <div className="px-6 py-5 border-t">
        <button
          onClick={() => setAuthenticated(false)}
          className="w-full flex items-center justify-center gap-3 bg-white text-indigo-900 font-bold py-3 rounded-xl hover:bg-gray-200 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
