// AiraloFeatureSection.jsx
import { FaGlobeAmericas, FaExchangeAlt, FaMobileAlt, FaQrcode } from 'react-icons/fa';

const features = [
  {
    icon: <FaGlobeAmericas className="text-3xl sm:text-4xl text-black font-extrabold" />,
    title: "Local, regional, and global coverage for 200+ locations",
  },
  {
    icon: <FaExchangeAlt className="text-3xl sm:text-4xl text-black" />,
    title: "Flexible packages, including unlimited data options",
  },
  {
    icon: <FaMobileAlt className="text-3xl sm:text-4xl text-black" />,
    title: "App available in 53 languages, multiple currencies",
  },
  {
    icon: <FaQrcode className="text-3xl sm:text-4xl text-black" />,
    title: "Easy installation and set up to get connected in minutes",
  },
];

const AiraloFeatureSection = () => {
  return (
    <div className='bg-[#faf4ef] py-20 px-4'>
      <section className="bg-[#86cddb] rounded-3xl p-8 md:p-10 mx-auto max-w-7xl">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-black mb-12 px-4">
          Why do over 20 million people choose Bustammitel?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center gap-4 transition-transform transform hover:scale-105">
              <div className="bg-white rounded-full p-5 sm:p-6 shadow-md flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
                {feature.icon}
              </div>
              <p className="text-black text-sm sm:text-base font-bold">{feature.title}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AiraloFeatureSection;
