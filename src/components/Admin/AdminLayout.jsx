import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AdminLayout = () => {

  return (
    <div className="flex h-screen">
      <Sidebar/>
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
