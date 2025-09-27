import React, { useEffect, useState } from "react";
import { FaTicketAlt, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const Coupon = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage",
    value: "",
    expiryDate: "",
  });
  const [search, setSearch] = useState("");

  // Fetch all coupons
  const fetchCoupons = async () => {
    try {
      const res = await fetch(`${API_URL}/coupons`);
      const data = await res.json();
      setCoupons(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching coupons:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Handle add/edit coupon
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const method = editingCoupon ? "PUT" : "POST";
      const url = editingCoupon
        ? `${API_URL}/coupons/${editingCoupon._id}`
        : `${API_URL}/coupons`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const savedCoupon = await res.json();
      if (editingCoupon) {
        setCoupons(
          coupons.map((c) => (c._id === savedCoupon._id ? savedCoupon : c))
        );
      } else {
        setCoupons([savedCoupon, ...coupons]);
      }

      setEditingCoupon(null);
      setIsModalOpen(false);
      setFormData({ code: "", type: "percentage", value: "", expiryDate: "" });
    } catch (err) {
      console.error("Error saving coupon:", err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await fetch(`${API_URL}/coupon/${id}`, { method: "DELETE" });
      setCoupons(coupons.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting coupon:", err);
    }
  };

  // Handle edit
  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      expiryDate: coupon.expiryDate.split("T")[0], // format for input[type=date]
    });
    setIsModalOpen(true);
  };

  // Filtered coupons by search
  const filteredCoupons = coupons.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="p-6 text-gray-600">Loading coupons...</p>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaTicketAlt className="text-orange-500" /> Coupons
        </h1>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditingCoupon(null);
            setFormData({ code: "", type: "percentage", value: "", expiryDate: "" });
          }}
          className="px-5 py-2 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition shadow-md"
        >
          + Add Coupon
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by code or type..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Coupon Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-2xl border border-gray-200">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-orange-100 text-gray-800">
              <th className="px-6 py-4 font-semibold">Code</th>
              <th className="px-6 py-4 font-semibold">Type</th>
              <th className="px-6 py-4 font-semibold">Discount</th>
              <th className="px-6 py-4 font-semibold">Expiry</th>
              <th className="px-6 py-4 font-semibold text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoupons.map((c, idx) => (
              <tr
                key={c._id}
                className={`border-b ${idx % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-orange-50 transition`}
              >
                <td className="px-6 py-3 font-medium text-gray-800">{c.code}</td>
                <td className="px-6 py-3 text-gray-600">{c.type}</td>
                <td className="px-6 py-3 text-gray-700">
                  {c.type === "percentage" ? `${c.value}%` : `$${c.value}`}
                </td>
                <td className="px-6 py-3 text-gray-600">
                  {new Date(c.expiryDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3 flex gap-4 justify-center">
                  <button
                    onClick={() => handleEdit(c)}
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-gradient-to-br from-orange-500 to-orange-600 p-1 rounded-2xl shadow-2xl w-full max-w-md"
          >
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingCoupon ? "Edit Coupon" : "Add New Coupon"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleSave}>
                <div>
                  <label className="block text-sm font-semibold text-gray-600">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600">
                    Discount Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600">
                    Discount Value
                  </label>
                  <input
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-600">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 transition shadow-md"
                  >
                    {editingCoupon ? "Update Coupon" : "Save Coupon"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Coupon;
