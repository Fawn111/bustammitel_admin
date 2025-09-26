import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CountriesTabs = () => {
  const [activeTab, setActiveTab] = useState("local");
  const [countries, setCountries] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const url =
        activeTab === "local"
          ? "http://localhost:4001/countries/local?limit=1000&page=1"
          : "http://localhost:4001/countries/global?limit=1000&page=1";

      const res = await axios.get(url);
      const newCountries =
        activeTab === "local" ? res.data.countries : res.data.regions;

      setCountries(newCountries);
    } catch (err) {
      console.error("Error fetching countries:", err);
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
  navigate(`/${slug}`);
};
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Explore eSIMs
      </h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-6 border-b-2 border-gray-300 mb-8">
        {["local", "global"].map((tab) => (
          <button
            key={tab}
            className={`text-sm font-semibold pb-2 transition-all duration-300 cursor-pointer ${
              activeTab === tab
                ? "border-b-4 border-orange-500 text-gray-800"
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
        <div className="text-center text-gray-500 font-medium">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedCountries.map((country) => (
             <div
  key={country.country_code || country.slug}
  className="flex items-center gap-4 bg-white p-2 rounded-xl shadow-md hover:shadow-xl cursor-pointer"
  onClick={() =>
  navigate(`/${country.slug || country.country_code.toLowerCase()}-esims`)
}
>
  {country.imageUrl && (
    <img
      src={country.imageUrl}
      alt={country.title}
      className="w-12 h-10 object-cover rounded-sm border-2 border-white"
    />
  )}
  <div className="font-medium text-gray-800 text-sm">{country.title}</div>
</div>
            ))}
          </div>

          {!showAll && countries.length > 10 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAll(true)}
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:drop-shadow-xl cursor-pointer transition"
              >
                Show All Countries
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CountriesTabs;
