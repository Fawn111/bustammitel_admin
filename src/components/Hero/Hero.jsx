import React from "react";
import { Link } from "react-router-dom";
import Heroimg from "../../assets/hero.avif";

function Hero() {
  return (
    <div className="overflow-hidden bg-[#faf4ef]">
      <div className="w-full bg-primary min-h-[650px] md:min-h-[900px] lg:min-h-[650px]">
        <div className="flex flex-col lg:flex-row justify-around items-center h-full px-6 lg:px-16 gap-10 py-12 lg:py-0">
          
          {/* Left: Text section */}
          <div className="flex flex-col max-w-xl text-center lg:text-left">
            <h2 className="w-full sm:w-[557px] sm:text-[60px] text-[32px] text-black font-extrabold font-deal sm:leading-[70px] leading-[40px] tracking-tight">
              Welcome to Bustammitel (Pvt) Ltd
            </h2>
            <p className="w-full sm:w-[545px] text-[16px] mt-4 text-gray-500 font-deal font-extralight">
              Bustammitel delivers innovative and reliable telecom solutions worldwide, from eSIM to VoIP and DID numbers, connecting people and businesses since 2013.
            </p>
            <Link to="/newarrivals">
              <button className="px-6 py-3 mt-8 bg-orange-500 text-white rounded-full text-lg font-medium hover:bg-orange-600 transition">
                Shop Now
              </button>
            </Link>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="sm:border-r-2 border-gray-200">
                <h2 className="text-[36px] sm:text-[40px] text-black font-bold">200+</h2>
                <p className="text-gray-500 text-sm sm:text-base">International Sims</p>
              </div>
              <div className="sm:border-r-2 border-gray-200">
                <h2 className="text-[36px] sm:text-[40px] text-black font-bold">200+</h2>
                <p className="text-gray-500 text-sm sm:text-base">Countries</p>
              </div>
              <div>
                <h2 className="text-[36px] sm:text-[40px] text-black font-bold">30,000+</h2>
                <p className="text-gray-500 text-sm sm:text-base">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Right: Image section */}
          <div className="flex justify-center items-center w-full lg:w-auto">
            <img
              src={Heroimg}
              alt="Hero"
              className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
