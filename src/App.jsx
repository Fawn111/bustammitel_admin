import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SubNavbar from "./components/Navbar-links/Navbar-links";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import AiraloFeatureSection from "./components/AiraloFeature/AiraloFeature";
import FaqSupportSection from "./components/Supportcard/SupportCard";
import Video from "./components/VideoSection/Video";
import Homeplan from "./components/Home-plans/Homeplans";
import CountryPackages from "./components/PackagesPage/Packagespage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SubNavbar />

      <main className="flex-grow">
        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <div id="estore">
        <Homeplan />
      </div>
                <AiraloFeatureSection />
                <Video />
                <FaqSupportSection />
              </>
            }
          />

          {/* Country packages page */}
          <Route path="/:countrySlug" element={<CountryPackages />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
