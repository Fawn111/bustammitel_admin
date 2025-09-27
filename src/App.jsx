import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/Admin/AdminLayout";
import Dashboard from "./components/Admin/Dashboard";
import AdminOrders from "./components/Admin/Orders";
import AdminCoupon from "./components/Admin/Coupon";
import User from "./components/Admin/User";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          {/* Redirect "/" to /admin/dashboard */}
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="coupon" element={<AdminCoupon />} />
            <Route path="users" element={<User />} />
          </Route>

          {/* 404 fallback */}
          <Route path="*" element={<h1 className="text-center mt-20 text-2xl">Page Not Found</h1>} />
        </Routes>
      </main>
    </div>
  );
}
