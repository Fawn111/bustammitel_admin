import React from "react";
import { FaUsers, FaBoxOpen, FaMoneyBillWave, FaTicketAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Dashboard = () => {
  const stats = [
    { title: "Total Orders", value: "1,245", icon: <FaBoxOpen size={28} /> },
    { title: "Total Users", value: "523", icon: <FaUsers size={28} /> },
    { title: "Revenue", value: "$12,340", icon: <FaMoneyBillWave size={28} /> },
    { title: "Active Coupons", value: "32", icon: <FaTicketAlt size={28} /> },
  ];

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 mt-2">Welcome back, Admin 👋</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg cursor-pointer"
          >
            <div className="bg-white/20  p-4 rounded-full">{stat.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Placeholder for Charts */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-orange-600 mb-4">Analytics</h2>
        <div className="h-48 flex items-center justify-center text-gray-400 border-2 border-dashed border-orange-300 rounded-xl">
          📊 Chart will go here
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
