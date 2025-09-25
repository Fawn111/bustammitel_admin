import React from "react";
import { Link } from "react-router-dom";
import Heroimg from "../../assets/hero.avif";

function Hero() {
  return (
    <div className="overflow-hidden bg-[#faf4ef]">
      <div className="w-full bg-primary h-[900px] md:h-[1200px] lg:h-[650px]">
        <div className="flex flex-col lg:flex-row md:flex-col justify-around items-center h-full px-6 lg:px-16 gap-10">
          
          {/* Left: Text section */}
          <div className="flex flex-col max-w-xl text-center lg:text-left">
            <h2 className="sm:w-[557px] w-full sm:text-[60px] text-[39px] text-black font-extrabold font-deal sm:leading-[70px] leading-[45px] tracking-tighter">
              Welcome to Bustammitel(Pvt)Ltd
            </h2>
            <p className="sm:w-[545px] w-full text-[16px] mt-4 text-gray-500 font-deal font-extralight">
              Bustammitel delivers innovative and reliable telecom solutions
              worldwide, from eSIM to VoIP and DID numbers, connecting people
              and businesses since 2013.
            </p>
            <Link to="/newarrivals">
              <button className="px-6 py-3 mt-8 bg-orange-500 text-white rounded-full text-lg font-medium hover:bg-orange-600 transition">
                Shop Now
              </button>
            </Link>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 grid-cols-2 grid gap-2 mt-10 text-center">
              <div className="border-r-2 border-gray-200">
                <h2 className="text-[40px] text-black font-bold">200+</h2>
                <p className="text-gray-500">International Sims</p>
              </div>
              <div className="border-r-2 border-gray-200">
                <h2 className="text-[40px] text-black font-bold">200+</h2>
                <p className="text-gray-500">Countries</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h2 className="text-[40px] text-black font-bold">30,000+</h2>
                <p className="text-gray-500">Happy Customers</p>
              </div>
            </div>
          </div>

          {/* Right: Image section */}
          <div className="flex justify-center items-center">
            <img
              src={Heroimg}
              alt="Hero"
              className="max-w-md lg:max-w-lg w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
