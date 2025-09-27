import React from "react";
import { FaCheckCircle, FaGlobe, FaHeadset, FaBolt, FaUsers, FaCogs } from "react-icons/fa";

const WhyBustammitel = () => {
  const features = [
    {
      icon: <FaCheckCircle className="text-red-600 w-8 h-8" />,
      title: "Proven Experience",
      description: "Delivering trusted telecom solutions since 2013.",
    },
    {
      icon: <FaBolt className="text-red-600 w-8 h-8" />,
      title: "Reliability Guaranteed",
      description: "Seamless, secure, and always-on communication.",
    },
    {
      icon: <FaHeadset className="text-red-600 w-8 h-8" />,
      title: "24/7 Expert Support",
      description: "Dedicated assistance to keep you connected anytime, anywhere.",
    },
    {
      icon: <FaCogs className="text-red-600 w-8 h-8" />,
      title: "Innovation First",
      description: "Bringing the latest technologies like 5G, IoT, and cloud connectivity to our clients.",
    },
    {
      icon: <FaGlobe className="text-red-600 w-8 h-8" />,
      title: "Global Connectivity",
      description: "Reliable services including eSIM, VoIP, and DID numbers to keep you connected worldwide.",
    },
    {
      icon: <FaUsers className="text-red-600 w-8 h-8" />,
      title: "Customer-Centric Approach",
      description: "Tailored solutions designed around your unique needs and flexible payment methods.",
    },
  ];

  return (
    <div className="bg-[#faf4ef] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Why Bustammitel
          </h1>
          <p className="mt-4 text-gray-700 max-w-2xl mx-auto text-lg sm:text-xl">
            At Bustammitel, we don’t just connect people—we empower businesses and communities with future-ready communication.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              <div className="flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                {feature.title}
              </h2>
              <p className="text-gray-600 text-center text-base sm:text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyBustammitel;
