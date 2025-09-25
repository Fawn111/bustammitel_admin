import Navbar from "./components/Navbar/Navbar";
import SubNavbar from "./components/Navbar-links/Navbar-links";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Hero from "./components/Hero/Hero";
import AiraloFeatureSection from "./components/AiraloFeature/AiraloFeature";
import FaqSupportSection from "./components/Supportcard/SupportCard";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SubNavbar />

      <main className="flex-grow">
        <Hero />
        <AiraloFeatureSection />
        <FaqSupportSection />
      </main>

      <Footer />
    </div>
  );
}