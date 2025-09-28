import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const ADMIN_PASSWORD = "supersecret123";

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 overflow-hidden">
        <div className="absolute w-72 h-72 bg-white opacity-20 rounded-full -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full bottom-0 right-0 animate-bounce"></div>
        <div className="absolute w-40 h-40 bg-orange-300 opacity-30 rounded-full top-1/2 left-1/4 animate-spin-slow"></div>

        <div className="relative bg-white shadow-2xl rounded-2xl p-10 w-96 z-10">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
             Admin Login
          </h2>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter Admin Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-5 focus:outline-none focus:ring-4 focus:ring-orange-400"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-300 shadow-md"
          >
            Login
          </button>
          <p className="text-center text-gray-500 mt-4 text-sm">
            Secure access only 
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar setAuthenticated={setIsAuthenticated}/>
      <div className="flex flex-col flex-1 bg-gray-100">
        <Topbar />
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;




