import {useEffect} from "react";
import {
  Cpu,
  Headphones,
  RefreshCcw,
  Settings,
  Globe,
Smartphone,
  Database,
  Phone,
  PhoneOutgoing,
} from "lucide-react";


const ServicesPage = () => {
      useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const services = [
    {
      title: "Next-Gen Upgrades",
      description:
        "Empowering networks with the latest technologies for faster, smarter, and more reliable performance. Future-ready upgrades designed to keep you ahead in the digital era.",
      icon: <Cpu className="h-8 w-8 text-orange-500" />,
    },
    {
      title: "Continuous Support",
      description:
        "Always here, always connected—expert support whenever you need it. Enjoy seamless communication with 24/7 dedicated care.",
      icon: <Headphones className="h-8 w-8 text-orange-500" />,
    },
    {
      title: "Network Renewal",
      description:
        "Revitalizing telecom networks with cutting-edge upgrades and optimizations. Delivering stronger, faster, and more resilient connectivity for the future.",
      icon: <RefreshCcw className="h-8 w-8 text-orange-500" />,
    },
    {
      title: "Service Revamp",
      description:
        "Transforming outdated telecom services into modern, efficient solutions. Upgrading performance to deliver faster, smarter, and more reliable connectivity.",
      icon: <Settings className="h-8 w-8 text-orange-500" />,
    },
    {
      title: "Telecom Evolution",
      description:
        "Driving the transformation of telecom with innovative technologies and smarter solutions. Shaping seamless, scalable, and future-ready connectivity for a digital world.",
      icon: <Globe className="h-8 w-8 text-orange-500" />,
    },
    {
      title: "eSIM Solutions",
      description:
        "Activate and manage your eSIM instantly with just a few taps—no physical SIM required. Stay connected worldwide with our secure and flexible eSIM technology for smartphones, tablets, and IoT devices.",
      icon: <Smartphone className="h-8 w-8 text-orange-500" />,
    },
    {
      title: "Data & Voice Plans",
      description:
        "Affordable and reliable solutions tailored to your needs. High-speed global data for uninterrupted connectivity. Crystal-clear voice services for seamless communication.",
      icon: <Database className="h-8 w-8 text-orange-500" />,
    },
    {
      title: "DID Numbers",
      description:
        "Get virtual phone numbers from across the globe. Expand your business reach to new markets. Stay accessible to customers anytime, anywhere.",
      icon: <Phone className="h-8 w-8 text-orange-5000" />,
    },
    {
      title: "VoIP Services",
      description:
        "Stay connected anytime with reliable internet calling. Perfect for personal and business use alike. Smart features, clear calls, and seamless communication.",
      icon: <PhoneOutgoing className="h-8 w-8 text-orange-500" />,
    },
  ];

  return (
   <div className="bg-[#faf4ef]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          Our Services
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg sm:text-xl">
          We offer an integrated portfolio of advanced telecommunication solutions,
          tailored to meet the evolving needs of individuals, businesses, and
          enterprises, with a strong emphasis on reliability, innovation, and
          performance.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-orange-50 via-white to-orange-50 rounded-3xl p-6 shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:from-indigo-100 hover:to-indigo-50"
          >
            <div className="flex items-center mb-4">
              <div className="mr-4">{service.icon}</div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {service.title}
              </h2>
            </div>
            <p className="text-gray-600 text-sm sm:text-base">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ServicesPage;
