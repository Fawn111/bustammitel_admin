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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-8 lg:p-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 sm:p-6 md:p-6 rounded-2xl shadow-lg cursor-pointer"
          >
            {/* Icon */}
            <div className="bg-white/20 p-3 sm:p-4 rounded-full flex items-center justify-center shrink-0">
              {stat.icon}
            </div>

            {/* Text */}
            <div className="flex flex-col flex-1 min-w-0">
              <h3 className="text-xs sm:text-sm md:text-lg font-semibold truncate">
                {stat.title}
              </h3>
              <p className="text-base sm:text-xl md:text-2xl font-bold break-words">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Placeholder for Charts */}
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-600 mb-4">
          Analytics
        </h2>
        <div className="h-48 sm:h-56 md:h-64 lg:h-72 flex items-center justify-center text-gray-400 border-2 border-dashed border-orange-300 rounded-xl">
          📊 Chart will go here
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
