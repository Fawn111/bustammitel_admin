import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import supportimg from '../../assets/support.avif';

const faqs = [
  "How do I check if my iOS device supports eSIM?",
  "How do I install and set up an eSIM on my iOS device?",
  "When does my eSIM data package expire?",
  "How do I install and set up an eSIM on my Android device?",
  "How can I get an eSIM?",
];

const FaqSupportSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#faf4ef] py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* FAQ Section */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6 text-black">Frequently asked questions</h2>
          <div className="space-y-4">
            {faqs.map((question, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow cursor-pointer transition-all"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center text-black font-medium">
                  <span>{question}</span>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {openIndex === index && (
                  <div className="mt-2 text-gray-600 text-sm">
                    {/* Placeholder answer */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm text-gray-600 mb-2">Support</h3>
            <p className="text-xl font-semibold text-black mb-4">
              Need help? We offer 24/7, multi-language support
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-black font-medium cursor-pointer hover:underline">
                Reach out to support <span className="text-xl">→</span>
              </div>
              <div className="flex items-center justify-between text-black font-medium cursor-pointer hover:underline">
                Chat on WhatsApp <span className="text-xl">→</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
  <img
    src={supportimg}
    alt="Support Agent"
    className="max-w-[180px] w-full rounded-lg object-contain"
  />
</div>

        </div>
      </div>
    </section>
  );
};

export default FaqSupportSection;
