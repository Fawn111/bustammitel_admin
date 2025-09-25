import React from "react";


const LearnVideoSection = () => {
  return (
    <section className="bg-[#faf4ef] py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <h2 className="text-2xl lg:text-3xl font-bold text-black mb-6 border-b-2 border-black pb-2">
          How it works
        </h2>

        {/* YouTube Video Embed */}
        <div className="relative w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            className="w-full aspect-video rounded-2xl"
            src="https://www.youtube.com/embed/VECQbXmTNvk"
            title="What is an eSIM video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Optional Description */}
        <h3 className="text-xl font-semibold text-black mt-6">
          What is an eSIM?
        </h3>
      </div>
    </section>
  );
};

export default LearnVideoSection;