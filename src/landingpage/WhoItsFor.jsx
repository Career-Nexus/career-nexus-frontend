import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // or any icon library


export default function WhoItsFor() {
  return (
    <div className='md:px-4 mx-6 md:mx-16'>
      <div className='text-center'>
        <h3 className='text-2xl lg:text-4xl font-bold font-roboto'>Who it's for</h3>
        <p className='text-lg lg:text-xl'>Designed for people to build real careers</p>
      </div>
      <div>
        <WhoCard />
      </div>
      <div>
        <WhyTrustUs />
      </div>
    </div>
  )
}

const leftItems = [
  "Final-year students & recent graduates",
  "Career switchers seeking direction",
  "Young professionals looking for mentorship",
  "Institutions supporting talent development",
];

const rightItems = [
  "Career clarity",
  "Practical, real-world guidance",
  "Exposure to global professionals",
  "Confidence in your next move",
];

function WhoCard() {
  return (
    <section className="w-full py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card */}
        <div className="bg-[#5DA05D] rounded-2xl p-6">
          <h2 className="text-white text-xl font-semibold mb-4">
            Career-Nexus is for:
          </h2>

          <div className="bg-white rounded-xl divide-y divide-[#B4D4B4]">
            {leftItems.map((item, index) => (
              <p
                key={index}
                className="px-5 py-4 text-gray-800 text-sm md:text-base"
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-[#2A0D47] rounded-2xl p-6">
          <h2 className="text-white text-xl font-semibold mb-4">
            What you gain:
          </h2>
          <div className="bg-white rounded-xl divide-y divide-[#B4D4B4]">
            {rightItems.map((item, index) => (
              <p
                key={index}
                className="px-5 py-4 text-gray-800 text-sm md:text-base"
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const WhyTrustUs = () => {
  return (
    <div className='bg-white w-full mt-10' id='about'>
      {/* <div>
                <h1 className='font-sans md:text-2xl mb-3 text-center font-bold'>Why you can trust <span className='text-[#5DA05D]'>US</span></h1>
                <p className='text-center text-lg'>We are building carefully, transparently, and responsibly.</p>
            </div>
            <div className='mt-10 flex flex-col items-center space-y-3 font-bold text-base md:text-lg font-roboto md:w-3/4 mx-auto'>
                <p className='text-center border border-[#CCCCCC] rounded-full px-5 py-1'>🇬🇧 UK-registered company</p>
                <p className='text-center border border-[#CCCCCC] rounded-full px-5 py-1'>Global focus (UK, US, Canada, Australia, Africa)</p>
                <p className='text-center border border-[#CCCCCC] rounded-full px-5 py-1'>Industry-led mentorship</p>
                <p className='text-center border border-[#CCCCCC] rounded-full px-5 py-1'>Data privacy & platform integrity conscious </p>
                <p className='text-center border border-[#CCCCCC] rounded-full px-5 py-1'>Built with advisors, mentors, and professionals</p>
            </div> */}
      {/* <ComplianceCarousel /> */}
      <ComplianceMarqueeCarousel />
    </div>
  )
}


const badges = [
  {id: 1, text: "GDPR Complaint", icon: "/images/landing/Ca.png"},
  { id: 2, text: "SOC 2-Aligned Security Controls", icon: "/images/landing/C1.png" },
  { id: 3, text: "CCPA-Aligned Data Practices", icon: "/images/landing/C2.png" },
  { id: 4, text: "PCI Certified", icon: "/images/landing/C3.png" },
  { id: 5, text: "ISO-aligned", icon: "/images/landing/C4.png" },
  // Feel free to add more — they will loop nicely
];

export function ComplianceMarqueeCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  // Duplicate items for seamless infinite loop
  const doubledBadges = [...badges, ...badges];

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let animationFrame;
    let currentTranslate = 0;

    const animate = () => {
      if (isPaused) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      currentTranslate -= 0.6; // adjust speed (higher = faster)

      // Reset when first set is fully scrolled out
      if (Math.abs(currentTranslate) >= (container.scrollWidth / 2)) {
        currentTranslate = 0;
      }

      container.style.transform = `translateX(${currentTranslate}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  return (
    <div className="w-full overflow-hidden py-6 md:py-8 flex flex-col items-center justify-center">
      <div className="mb-6 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
        <h1 className="font-sans text-xl md:text-4xl mb-3 font-bold">
          Why you can trust <span className="text-[#5DA05D]">US</span>
        </h1>
        <p className="text-base md:text-lg lg:text-2xl text-gray-700">
          We are building carefully, transparently, and responsibly.
        </p>
      </div>

      <div
        className="flex items-center gap-4 md:gap-6 whitespace-nowrap"
        ref={containerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {doubledBadges.map((badge, idx) => (
          <div
            key={`${badge.id}-${idx}`}
            className="
              inline-flex items-center gap-2.5 px-5 py-2.5 md:px-6 md:py-3
              bg-[#E5EFF3] backdrop-blur-sm 
              border border-[#5DA05D] 
              rounded-xl font-medium text-sm md:text-base
              shadow-sm hover:shadow-md
              transition-all duration-300 flex-shrink-0
            "
          >
            {/* <span className="text-lg md:text-xl">{badge.icon}</span> */}
            <img src={badge.icon} alt={badge.text} className="w-6 h-6 md:w-8 md:h-8" />
            <span>{badge.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}