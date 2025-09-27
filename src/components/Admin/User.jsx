import React, { useEffect, useState } from "react";
import { FaUserEdit, FaTrash, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch users
  useEffect(() => {
    fetch(`${API_URL}/auth/`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await fetch(`${API_URL}/auth/${id}`, { method: "DELETE" });
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setFormData({ name: user.name, email: user.email, password: "" });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/${editingUser}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const updatedUser = await res.json();
      setUsers(users.map((u) => (u._id === updatedUser._id ? updatedUser : u)));
      setEditingUser(null);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading users...</p>;

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">👥 User Management</h1>

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-3 max-w-md">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-400 outline-none shadow-sm"
        />
      </div>

      <div className="space-y-4">
        {filteredUsers.length === 0 && (
          <p className="text-gray-500 text-center py-6">No users found.</p>
        )}

        {filteredUsers.map((user, idx) => (
          <motion.div
            key={user._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between p-4 md:p-6 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 transition-all"
          >
            {editingUser === user._id ? (
              <>
                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="border px-3 py-2 rounded-lg w-full md:w-48 focus:ring-2 focus:ring-orange-400 outline-none"
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border px-3 py-2 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-orange-400 outline-none"
                    placeholder="Email"
                  />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="border px-3 py-2 rounded-lg w-full md:w-48 focus:ring-2 focus:ring-orange-400 outline-none"
                    placeholder="New Password"
                  />
                </div>
                <div className="flex gap-3 mt-3 md:mt-0">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingUser(null)}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 shadow-md transition"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
                  <p className="text-gray-800 font-semibold md:w-48">{user.name}</p>
                  <p className="text-gray-600 md:w-64">{user.email}</p>
                  <p className="text-gray-400 italic md:w-48">•••••••</p>
                </div>
                <div className="flex gap-4 mt-3 md:mt-0 justify-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md transition"
                  >
                    <FaUserEdit /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md transition"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default User;
