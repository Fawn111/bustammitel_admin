import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PackagesPage = () => {
  const { slug, type } = useParams(); // slug = france-esims
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const url = `http://localhost:4001/packages?slug=${slug}`;
        const res = await axios.get(url);

        // Backend should return array directly
        setPackages(res.data.packages || res.data); 
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Available {type || "Local"} eSIMs for {slug?.split("-")[0]?.toUpperCase()}
      </h1>

      {loading ? (
        <div className="text-center text-gray-500 font-medium">Loading...</div>
      ) : packages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.slug || pkg.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              {pkg.imageUrl && (
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  className="w-full h-28 object-cover rounded-md mb-2"
                />
              )}
              <div className="text-lg font-semibold">{pkg.title}</div>
              {pkg.operators?.[0]?.price && (
                <div className="text-green-600 font-medium">
                  {pkg.operators[0].price} €
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 font-medium">No packages available</div>
      )}
    </div>
  );
};

export default PackagesPage;
