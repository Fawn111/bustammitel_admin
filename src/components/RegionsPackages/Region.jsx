import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const RegionPackagesPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [regionData, setRegionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [userName, setUserName] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);

    const handleStorage = () => setUserName(localStorage.getItem("userName"));
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [slug]);

  useEffect(() => {
    const fetchRegionPackages = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const apiSlug = slug.replace("-esims", "");
        const response = await fetch(`${API_URL}/regions/${apiSlug}/packages`);
        if (!response.ok) throw new Error("Failed to fetch region packages");
        const data = await response.json();
        setRegionData(data);
      } catch (err) {
        console.error(err);
        setRegionData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRegionPackages();
  }, [slug]);

  const renderSkeletons = () =>
    Array.from({ length: 6 }).map((_, idx) => (
      <div
        key={idx}
        className="flex-shrink-0 w-64 h-64 rounded-2xl p-6 bg-gray-200 animate-pulse"
      ></div>
    ));

  if (loading)
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-wrap gap-6 justify-center">{renderSkeletons()}</div>
      </div>
    );

  if (!regionData)
    return <div className="text-center mt-10 text-gray-600">No data available</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Region Header */}
      <div className="flex flex-col md:flex-row items-center mb-12 gap-6">
        {regionData.image?.url && (
          <img
            src={regionData.image.url}
            alt={regionData.title}
            className="w-full md:w-64 h-48 md:h-42 object-cover rounded-lg border-4 border-gray-200 shadow-lg"
          />
        )}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 text-center md:text-left">
          {regionData.title}
        </h1>
      </div>

      {/* Operators and Packages */}
      {regionData.operators.map((operator) => (
        <div key={operator.id} className="mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-6 gap-6">
            <div className="flex items-center space-x-6 flex-1">
              <img
                src={operator.image?.url}
                alt={operator.title}
                className="w-32 h-32 md:w-44 md:h-44 object-contain rounded-xl"
              />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{operator.title}</h2>
                <p className="text-gray-600 mt-2">
                  Type: {operator.plan_type} | Prepaid: {operator.is_prepaid ? "Yes" : "No"}
                </p>
                <p className="text-gray-600 mt-1">
                  Activation: {operator.activation_policy} | KYC: {operator.is_kyc_verify ? "Required" : "Not Required"}
                </p>
              </div>
            </div>
          </div>

          {/* Packages */}
          <div className="flex space-x-6 overflow-x-auto py-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {operator.packages.map((pkg) => (
              <div
                key={pkg.id}
                className="flex-shrink-0 w-64 rounded-2xl p-6 cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl bg-orange-500 text-white"
                onClick={() => setModalData({ operator, plan: pkg, regionData })}
              >
                <h3 className="text-xl font-bold mb-3">{pkg.title}</h3>
                <div className="inline-block bg-white/20 px-3 py-1 rounded-full mb-2 text-sm font-semibold">
                  {pkg.price} {pkg.prices?.recommended_retail_price?.USD ? "USD" : "€"}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                    {pkg.data} Data
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                    {pkg.day} {pkg.day > 1 ? "days" : "day"}
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                    {pkg.type.toUpperCase()}
                  </span>
                </div>
                {pkg.short_info && (
                  <p className="text-white/80 italic text-sm mb-3">{pkg.short_info}</p>
                )}
                <button className="w-full py-2 rounded-lg font-bold hover:shadow-lg transition bg-orange-600">
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-start z-50 p-4 overflow-auto">
          <div className="bg-white rounded-2xl max-w-5xl w-full p-6 relative shadow-2xl">

            {/* Close */}
            <button
              onClick={() => setModalData(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 cursor-pointer text-2xl font-bold"
            >
              &times;
            </button>

            {/* Operator Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start mb-6 gap-4">
              <img
                src={modalData.operator.image?.url}
                alt={modalData.operator.title}
                className="w-32 h-32 md:w-44 md:h-44 object-contain rounded-lg shadow-md"
              />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{modalData.operator.title}</h2>
                <p className="text-gray-600 mt-2">
                  Type: {modalData.operator.plan_type} | Activation: {modalData.operator.activation_policy} | KYC: {modalData.operator.is_kyc_verify ? "Required" : "Not Required"}
                </p>
              </div>
            </div>

            {/* Horizontal scrollable package cards */}
            <div className="flex space-x-4 overflow-x-auto py-4 mb-6 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
              {modalData.operator.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`flex-shrink-0 w-56 p-4 rounded-xl cursor-pointer transform transition duration-300 hover:scale-105 shadow-lg ${
                    modalData.plan.id === pkg.id ? "border-2 border-orange-600 bg-red-50" : "border border-gray-300 bg-white"
                  }`}
                  onClick={() => setModalData(prev => ({ ...prev, plan: pkg }))}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{pkg.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">Price: {pkg.price} {pkg.prices?.recommended_retail_price?.USD ? "USD" : "€"}</p>
                  <p className="text-sm text-gray-600 mb-1">Data: {pkg.data}</p>
                  <p className="text-sm text-gray-600 mb-1">Validity: {pkg.day} {pkg.day > 1 ? "days" : "day"}</p>
                  <input
                    type="radio"
                    name={`modal-package-${modalData.operator.id}`}
                    checked={modalData.plan.id === pkg.id}
                    onChange={() => setModalData(prev => ({ ...prev, plan: pkg }))}
                    className="accent-orange-500 mt-1"
                  />
                </div>
              ))}
            </div>

            {/* Two-column layout */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">

              {/* Left: Description + Supported Countries + Coverage + Total */}
              <div className="md:w-1/2 bg-gray-50 p-4 rounded-xl shadow-md text-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{modalData.operator.other_info || "No description available."}</p>

                {/* Supported Countries */}
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Supported Countries</h4>
                  <div className="flex flex-wrap gap-2">
                    {modalData.regionData.countries?.map((c) => {
                      const name = c?.title || c?.country_code || "Unknown";
                      return (
                        <div key={c?.country_code || c?.title} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {name}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Coverage Networks */}
                {modalData.operator.coverages?.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Coverage Networks</h4>
                    <ul className="space-y-2 max-h-40 overflow-auto">
                      {modalData.operator.coverages.map((coverage, idx) => (
                        <li key={idx} className="flex flex-wrap gap-2 items-center">
                          {coverage.networks.map((n, i) => (
                            <span
                              key={i}
                              className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium"
                            >
                              {n.name}
                              {n.types.includes("5G") && (
                                <span className="bg-red-600 text-white px-1 rounded text-[10px] font-bold">5G</span>
                              )}
                            </span>
                          ))}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Total Price */}
                <div className="mt-4 flex justify-between items-center bg-gray-200 px-4 py-2 rounded-lg">
                  <span className="font-semibold text-gray-900">Total Price:</span>
                  <span className="text-gray-900 font-bold">{modalData.plan.price} {modalData.plan.prices?.recommended_retail_price?.USD ? "USD" : "€"}</span>
                </div>
              </div>

              {/* Right: Plan Details */}
              <div className="md:w-1/2 p-4 rounded-xl shadow-md text-sm bg-orange-500 text-white">
                <h3 className="font-semibold text-white mb-2">Plan Details</h3>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Plan Type:</span>
                  <span>{modalData.operator.plan_type}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Activation Policy:</span>
                  <span>{modalData.operator.activation_policy}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">KYC:</span>
                  <span>{modalData.operator.is_kyc_verify ? "Required" : "Not Required"}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold">Validity:</span>
                  <span>{modalData.plan.day} {modalData.plan.day > 1 ? "days" : "day"}</span>
                </div>
                {modalData.plan.short_info && (
                  <p className="mt-2 text-sm italic">{modalData.plan.short_info}</p>
                )}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={() => {
                if (!userName) {
                  alert("Please login to confirm your order.");
                  navigate("/login");
                  return;
                }
              navigate("/order-confirmation", {
  state: {
    package: modalData.plan,
    operator: modalData.operator,
    region: modalData.regionData,
    country: modalData.regionData.countries?.[0] || null,
  },
});

              }}
              className={`w-full py-3 font-bold rounded-lg transition ${
                userName ? "bg-orange-600 text-white hover:bg-orange-700 cursor-pointer" : "bg-red-400 text-gray-700 cursor-not-allowed"
              }`}
            >
              {userName ? "Confirm Purchase" : "Login to Confirm"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionPackagesPage;
