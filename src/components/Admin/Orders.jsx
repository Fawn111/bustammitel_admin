import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [qrTexts, setQrTexts] = useState({}); // store qr text per order

   const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_URL}/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
      toast.error("Failed to fetch orders!");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (orderId, value) => {
    setQrTexts((prev) => ({ ...prev, [orderId]: value }));
  };

  const handleUpload = async (orderId) => {
  const qrText = qrTexts[orderId];
  if (!qrText || !qrText.trim()) return alert("Please enter text for QR code");

  try {
    await axios.put(`${API_URL}/orders/${orderId}/qr`, {
      qrText, // ✅ just send text
    });
    alert("QR code generated successfully!");
    setQrTexts(prev => ({ ...prev, [orderId]: "" }));
    fetchOrders();
  } catch (err) {
    console.error("Error updating QR code:", err.message);
  }
};

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">
        All Orders
      </h2>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 p-5 flex flex-col justify-between border border-gray-200"
          >
            {/* User Info */}
            <div>
              <h3 className="font-bold text-xl text-gray-800">
                {order.username}
              </h3>
              <p className="text-sm text-gray-500">Order ID: {order._id}</p>
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    order.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {order.status}
                </span>
                <span className="px-2 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  {order.cardType}
                </span>
              </div>
            </div>

            {/* Package Info */}
            <div className="mt-4">
              <h4 className="font-semibold text-gray-700 mb-1">Package:</h4>
              <p className="text-gray-600">
                {order.package?.title || order.package?.name}
              </p>
              <p className="text-gray-500 text-sm">
                Data: {order.package?.data} GB
              </p>
              <p className="text-gray-500 text-sm">
                Validity: {order.package?.day}{" "}
                {order.package?.day > 1 ? "Days" : "Day"}
              </p>
              <p className="text-gray-500 text-sm">
                Type: {order.package?.type?.toUpperCase()}
              </p>
            </div>

            {/* Operator & Country */}
            <div className="mt-4 flex items-center gap-3">
              {order.operator?.image && (
                <img
                  src={order.operator.image}
                  alt={order.operator?.title}
                  className="w-12 h-12 object-contain rounded-full border"
                />
              )}
              <div>
                <p className="text-gray-700 font-semibold">
                  {order.operator?.title}
                </p>
                <p className="text-gray-500 text-sm">
                  {order.country?.title}
                  {order.region ? `, ${order.region?.title}` : ""}
                </p>
              </div>
            </div>

            {/* Payment & Coupon */}
            <div className="mt-4 text-gray-600 text-sm">
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {order.paymentMethod}
              </p>
              {order.coupon && (
                <p>
                  <span className="font-semibold">Coupon:</span> {order.coupon}
                </p>
              )}
            </div>

            {/* QR Code Text Input */}
            {order.status === "Pending" && (
              <div className="mt-4 flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Enter QR code text or URL"
                  value={qrTexts[order._id] || ""}
                  onChange={(e) => handleChange(order._id, e.target.value)}
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
                  onClick={() => handleUpload(order._id)}
                >
                  Submit QR Code
                </button>
              </div>
            )}

            {/* Display QR Code */}
            {order.qrCode && (
              <div className="mt-4 flex justify-center">
                <img
                  src={order.qrCode}
                  alt="QR Code"
                  className="w-32 h-32 border rounded-lg shadow"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
