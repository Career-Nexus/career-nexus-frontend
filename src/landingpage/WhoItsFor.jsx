import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // or any icon library


export default function WhoItsFor() {
  return (
    <div className='md:px-4 mx-6 md:mx-16'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold font-roboto'>Who it's for</h3>
        <p className='text-lg'>Designed for people to build real careers</p>
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


const complianceItems = [
  { id: 1, label: "SOC 2-Aligned Security Controls", icon: "🔒" },
  { id: 2, label: "CCPA-Aligned Data Practices", icon: "🛡️" },
  { id: 3, label: "PCI Certified", icon: "💳" },
  { id: 4, label: "ISO-aligned", icon: "✓" },
  // You can easily add more
];

function ComplianceCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % complianceItems.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? complianceItems.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % complianceItems.length);
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto py-8 px-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-slate-800 shadow-2xl">
        {/* Main content */}
        <div className="relative h-28 sm:h-32 md:h-36 flex items-center justify-center px-6 md:px-12 transition-all duration-700 ease-out">
          {complianceItems.map((item, index) => (
            <div
              key={item.id}
              className={`
                absolute w-full text-center transition-all duration-700 ease-in-out
                ${index === currentIndex
                  ? 'opacity-100 translate-x-0 scale-100'
                  : index === (currentIndex + 1) % complianceItems.length
                    ? 'opacity-0 translate-x-24 scale-95'
                    : index === (currentIndex - 1 + complianceItems.length) % complianceItems.length
                      ? 'opacity-0 -translate-x-24 scale-95'
                      : 'opacity-0 scale-90'
                }
              `}
            >
              <div className="
                inline-flex items-center gap-3 sm:gap-4 
                px-6 py-3.5 sm:px-8 sm:py-4 
                bg-gradient-to-r from-blue-900/40 to-indigo-900/40 
                backdrop-blur-sm 
                border border-slate-700/60 rounded-full
                text-white font-medium tracking-wide
                shadow-lg shadow-black/40
                hover:scale-105 transition-transform duration-300
              ">
                <span className="text-2xl sm:text-3xl">{item.icon}</span>
                <span className="text-base sm:text-lg md:text-xl">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 
                   p-2 rounded-full bg-black/40 backdrop-blur-sm 
                   text-white/70 hover:text-white hover:bg-black/60 
                   transition-all duration-300"
          aria-label="Previous certification"
        >
          <ChevronLeft size={28} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 
                   p-2 rounded-full bg-black/40 backdrop-blur-sm 
                   text-white/70 hover:text-white hover:bg-black/60 
                   transition-all duration-300"
          aria-label="Next certification"
        >
          <ChevronRight size={28} />
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2.5">
          {complianceItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`
                w-2.5 h-2.5 rounded-full transition-all duration-400
                ${idx === currentIndex
                  ? 'bg-blue-500 w-6'
                  : 'bg-slate-600 hover:bg-slate-400'
                }
              `}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}



const badges = [
  { id: 1, text: "SOC 2-Aligned Security Controls", icon: "/images/landing/C1.png" },
  { id: 2, text: "CCPA-Aligned Data Practices", icon: "/images/landing/C2.png" },
  { id: 3, text: "PCI Certified", icon: "/images/landing/C3.png" },
  { id: 4, text: "ISO-aligned", icon: "/images/landing/C4.png" },
  // Feel free to add more — they will loop nicely
];

function ComplianceMarqueeCarousel() {
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
        <h1 className="font-sans text-xl md:text-2xl mb-3 font-bold">
          Why you can trust <span className="text-[#5DA05D]">US</span>
        </h1>
        <p className="text-base md:text-lg text-gray-700">
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