import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBitcoin, FaUniversity, FaCreditCard } from "react-icons/fa";

const OrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { package: pkg, operator, country } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("binance");
  const [coupon, setCoupon] = useState("");
  const [showPopup, setShowPopup] = useState(false); // popup state

  if (!pkg || !operator || !country) {
    return <div className="text-center mt-10 text-gray-600">No order details found</div>;
  }

  const applyCoupon = () => {
    alert(`Coupon "${coupon}" applied!`);
  };

  const API_URL = import.meta.env.VITE_API_URL;

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch(`${API_URL}/api/orders/`, { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          package: pkg,
          operator: {
            title: operator.title,
            image: operator.image?.url
          },
          country: { title: country.title },
          paymentMethod,
          coupon,
        }),
      });

      if (!response.ok) throw new Error("Failed to place order");

      const data = await response.json();
      console.log("Order placed:", data);

      // Show confirmation popup
      setShowPopup(true);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  const paymentOptions = [
    { id: "binance", name: "Binance Pay", icon: <FaBitcoin size={24} />, description: "Pay instantly using Binance Pay." },
    { id: "bank", name: "Bank Transfer", icon: <FaUniversity size={24} />, description: "Transfer the amount from your bank account." },
    { id: "card", name: "Credit/Debit Card", icon: <FaCreditCard size={24} />, description: "Pay using your card securely." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8 relative">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-6">
        Secure Checkout
      </h1>

      {/* Package Summary */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg space-y-4 border border-gray-200 flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 w-full md:w-48 h-48 md:h-auto">
          <img
            src={operator.image?.url || "https://via.placeholder.com/150"}
            alt={pkg.title}
            className="w-full h-full object-cover rounded-xl shadow-md"
          />
        </div>
        <div className="flex-1 space-y-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">{pkg.title}</h2>
          <p className="text-gray-700">{pkg.short_info || pkg.description}</p>
          <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
            <span className="bg-gray-100 text-gray-800 px-2 md:px-3 py-1 rounded-full font-semibold text-xs md:text-sm">
              Coverage: {country.title}
            </span>
            <span className="bg-gray-100 text-gray-800 px-2 md:px-3 py-1 rounded-full font-semibold text-xs md:text-sm">
              Data: {pkg.data} GB
            </span>
            <span className="bg-gray-100 text-gray-800 px-2 md:px-3 py-1 rounded-full font-semibold text-xs md:text-sm">
              Validity: {pkg.day} {pkg.day > 1 ? "Days" : "Day"}
            </span>
            <span className="bg-gray-100 text-gray-800 px-2 md:px-3 py-1 rounded-full font-semibold text-xs md:text-sm">
              Type: {pkg.type.toUpperCase()}
            </span>
          </div>
          <div className="mt-3 flex justify-between items-center">
            <p className="text-lg font-semibold">Price:</p>
            <p className="text-xl font-bold">${pkg.price} USD</p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Choose Payment Method</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              className={`border rounded-2xl p-4 cursor-pointer flex flex-col items-center transition hover:shadow-lg ${
                paymentMethod === option.id ? "border-orange-500 bg-red-50" : "border-gray-300"
              }`}
              onClick={() => setPaymentMethod(option.id)}
            >
              <div className="text-orange-500 mb-2">{option.icon}</div>
              <h3 className="font-semibold text-gray-900">{option.name}</h3>
              {paymentMethod === option.id && (
                <p className="text-gray-700 text-sm mt-2 text-center">{option.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Coupon */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-lg space-y-3 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Apply Code</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
          />
          <button
            onClick={applyCoupon}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition font-semibold"
          >
            Apply
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div className="bg-gray-50 p-4 md:p-6 rounded-2xl shadow-lg flex justify-between items-center border border-gray-200 text-lg font-semibold">
        <span>TOTAL PRICE</span>
        <span>${pkg.price} USD</span>
      </div>

      <p className="text-sm text-gray-500">
        Before completing this order, please confirm your device is eSIM compatible and network-unlocked. <span className="underline cursor-pointer">Learn More</span>
      </p>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-gradient-to-r py-2 font-bold cursor-pointer from-orange-500 to-orange-400 text-white font-boldpy-4 rounded-2xl hover:from-orange-600 hover:to-orange-500 transition text-lg"
      >
        COMPLETE ORDER
      </button>

      {/* Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Order Placed!</h2>
            <p className="text-gray-700">Your order has been successfully placed.</p>
            <button
              onClick={() => navigate("/")}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
