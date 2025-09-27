import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CountriesTabs = () => {
  const [activeTab, setActiveTab] = useState("local");
  const [countries, setCountries] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const url =
        activeTab === "local"
          ? `${API_URL}/countries/local?limit=1000&page=1`
          : `${API_URL}/countries/global?limit=1000&page=1`;

      const token = localStorage.getItem("token");

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);

      const data = await response.json();
      const newCountries = activeTab === "local" ? data.countries : data.regions;

      setCountries(newCountries || []);
    } catch (err) {
      console.error("❌ Error fetching countries:", err.message);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
    setShowAll(false);
  }, [activeTab]);

  const displayedCountries = showAll ? countries : countries.slice(0, 10);

  const handleCountryClick = (country) => {
    const slug = country.slug || country.country_code.toLowerCase();
    navigate(`/${slug}-esims?type=${activeTab}`);
  };

  // Skeleton loader
  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, idx) => (
      <div
        key={idx}
        className="flex flex-col items-center justify-center gap-2 bg-white p-4 rounded-2xl shadow-lg animate-pulse"
      >
        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-16 bg-gray-300 rounded mt-2"></div>
      </div>
    ));
  };

  return (
    <div className="bg-[#faf4ef] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-10 text-center text-gray-900">
          Explore eSIMs
        </h1>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-10">
          {["local", "global"].map((tab) => (
            <button
              key={tab}
              className={`text-lg font-semibold pb-2 transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? "border-b-4 border-orange-500 text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "local" ? "Local eSIMs" : "Global eSIMs"}
            </button>
          ))}
        </div>

        {/* Countries Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {renderSkeletons()}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayedCountries.map((country) => (
                <div
                  key={country.country_code || country.slug}
                  className="flex flex-col items-center justify-center gap-2 bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition cursor-pointer"
                  onClick={() => handleCountryClick(country)}
                >
                  {country.imageUrl ? (
                    <img
                      src={country.imageUrl}
                      alt={country.title}
                      className="w-20 h-20 object-cover rounded-full border-2 border-orange-400 shadow-md"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-500 font-bold text-xl">{country.title[0]}</span>
                    </div>
                  )}
                  <div className="text-center font-semibold text-gray-900 text-sm sm:text-base mt-2">
                    {country.title}
                  </div>
                </div>
              ))}
            </div>

            {!showAll && countries.length > 10 && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setShowAll(true)}
                  className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 shadow-lg transition font-semibold"
                >
                  Show All Countries
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CountriesTabs;
