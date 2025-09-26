import { FaFacebook, FaInstagram, FaTwitter, FaTiktok, FaLinkedin, FaYoutube } from "react-icons/fa";
import footerImg from '../../assets/brand.png';

export default function Footer() {
  return (
    <footer className="bg-[#faf4ef] text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Column 1 */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Our eSIMs</h3>
          <ul className="space-y-2 text-sm">
            <li>eSIM Store</li>
            <li>Unlimited data</li>
            <li>Global eSIMs</li>
            <li>Regional eSIMs</li>
            <li>Local eSIMs</li>
            <li>Refer and earn</li>
            <li>Loyalty program</li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold text-lg mb-3">About eSIMs</h3>
          <ul className="space-y-2 text-sm">
            <li>What is an eSIM?</li>
            <li>How Airalo works</li>
            <li>Device compatibility</li>
          </ul>
          <h3 className="font-semibold text-lg mt-6 mb-3">Get help</h3>
          <ul className="space-y-2 text-sm">
            <li>Help center</li>
            <li>Chat to support</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Magazine</h3>
          <ul className="space-y-2 text-sm">
            <li>Latest posts</li>
          </ul>
          <h3 className="font-semibold text-lg mt-6 mb-3">Airalo</h3>
          <ul className="space-y-2 text-sm">
            <li>About Airalo</li>
            <li>Impact</li>
            <li>Our values</li>
            <li>Media center</li>
            <li>Newsroom</li>
            <li>Job vacancies</li>
            <li>Working at Airalo</li>
          </ul>
        </div>

        {/* Column 4 - Social */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Follow us</h3>
          <div className="flex flex-wrap gap-4 text-2xl">
            <a href="#" className="hover:text-blue-600"><FaFacebook /></a>
            <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="#" className="hover:text-black"><FaTiktok /></a>
            <a href="#" className="hover:text-blue-700"><FaLinkedin /></a>
            <a href="#" className="hover:text-red-600"><FaYoutube /></a>
          </div>
        </div>
      </div>

      {/* Footer brand image */}
      <div className="flex justify-center my-6">
        <img src={footerImg} alt="Brand Logo" className="h-12 sm:h-42 object-contain" />
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-300 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Bustammitel. All rights reserved.
      </div>
    </footer>
  );
}
