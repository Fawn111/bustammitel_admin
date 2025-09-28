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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    try {
      await fetch(`${API_URL}/coupons/${id}`, { method: "DELETE" });
      setCoupons(coupons.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting coupon:", err);
    }
  };

  const handleEdit = (coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      expiryDate: coupon.expiryDate.split("T")[0],
    });
    setIsModalOpen(true);
  };

  const filteredCoupons = coupons.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="p-6 text-gray-600">Loading coupons...</p>;

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
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
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by code or type..."
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Coupon Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoupons.map((c) => (
          <div
            key={c._id}
            className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between border border-gray-200 hover:shadow-2xl transition"
          >
            <div>
              <h3 className="font-bold text-xl text-gray-800 mb-2">{c.code}</h3>
              <p className="text-gray-600 mb-1">
                Type: <span className="font-semibold">{c.type}</span>
              </p>
              <p className="text-gray-700 mb-1">
                Discount:{" "}
                <span className="font-semibold">
                  {c.type === "percentage" ? `${c.value}%` : `$${c.value}`}
                </span>
              </p>
              <p className="text-gray-600 mb-2">
                Expiry: <span className="font-semibold">{new Date(c.expiryDate).toLocaleDateString()}</span>
              </p>
            </div>
            <div className="flex gap-3 mt-4 justify-end">
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
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
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

                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
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
