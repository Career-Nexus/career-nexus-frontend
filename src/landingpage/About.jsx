import React, { useState } from 'react'
import { Handshake, Minus, Users, UserCircle } from "lucide-react";
import { GrGroup } from "react-icons/gr";


export default function Hero() {
    return (
        <div className=''>
          <About />
          <ConsultingDifferenceSection />
          <EngagementOptions />
          <WhoWeWork />
          <TrustSection />
          <PurpleCard />
        </div> 
    )
}


function About() {
  return (
    <div className=''>
      <div className='w-full bg-[#E8D0FF] pb-52 relative' id='about'>
        {/* Hero Section */}
        <div className='w-full h-[32rem] flex flex-col md:gap-10 md:flex-row justify-between items-center px-6 md:px-20 pt-10 md:pt-16 space-y-10 md:space-y-0'>
          <div className='md:w-[641px] md:mr-5 lg:mr-10 flex flex-col gap-2'>
            <p className="font-sans mb-2 font-normal text-[12px] md:text-[20px] leading-none tracking-normal uppercase align-middle">
              CONSULTING SERVICES
            </p>
            <h1 className="font-roboto font-bold text-[3px] md:text-[34px] leading-none tracking-normal">
              Strategic career and workforce guidance for a changing world
            </h1>
            <p className="font-sans font-normal text-[12px] md:text-[24px] mt-3 w-full">
              Career-Nexus delivers diagnostic, strategic, outcome-driven consulting
              that helps individuals and organizations make future-ready decisions in
              a complex global workforce.
            </p>
            <div className='flex flex-col md:flex-row gap-7 mt-6'>
              <button className="bg-[#2E1065] text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition">
                Request A Consultation
              </button>
            </div>
          </div>
          <div className='absolute top-0 right-0 flex flex-col items-center justify-center text-center'>
            <img src="/images/landing/handshake.png" alt="hero" className='w-full max-w-sm md:max-w-md lg:max-w-lg' />
          </div>
        </div>
      </div>
      <TheProblem />
    </div>
  );
}

const TheProblem = () => {
  return (
    <div className="bg-white w-full max-w-7xl mx-auto flex justify-center" id="about">
      <div className="bg-white p-6 md:p-4 shadow-lg mx-6 md:mx-20 rounded-2xl absolute md:mt-[-9rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-18">
          
          {/* Card 1 */}
          <div className="bg-white rounded-xl border p-10">
            <h3 className="font-semibold text-3xl mb-4">
              For Individuals & Professionals
            </h3>
            <p className="text-xl font-semibold text-gray-600 mb-4">
              We help professionals gain clarity on:
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 py-[10px] text-[20px] bg-[#E8D0FF80] rounded-sm">
                <span className="w-1.5 h-6 bg-[#2A0D47] rounded-sm" />
                Career positioning in competitive markets
              </li>
              <li className="flex items-start py-[10px] text-[20px] bg-[#E8D0FF80] gap-3">
                <span className="w-1.5 h-6 bg-[#2A0D47] rounded-sm" />
                Skills relevance and capability gaps
              </li>
              <li className="flex items-start py-[10px] text-[20px] bg-[#E8D0FF80] gap-3">
                <span className="w-1.5 h-6 bg-[#2A0D47] rounded-sm" />
                Transition strategies across roles, industries, or geographies
              </li>
            </ul>
            <p className="text-[20px] text-[#131927] mt-4">
              The focus is on direction, not guesswork.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl border p-10">
            <h3 className="font-semibold text-3xl mb-4">
              Talent & Skills Development Support
            </h3>
            <p className="text-xl font-semibold text-gray-600 mb-4">
              Career-Nexus helps organisations:
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 bg-[#DEFEDE80] py-[10px] text-[20px]">
                <span className="w-1.5 h-6 bg-[#5DA05D] rounded-sm" />
                Identify critical skill needs
              </li>
              <li className="flex items-start gap-3 bg-[#DEFEDE80] py-[10px] text-[20px]">
                <span className="w-1.5 h-6 bg-[#5DA05D] rounded-sm" />
                Support employee development and retention
              </li>
              <li className="flex items-start gap-3 bg-[#DEFEDE80] py-[10px] text-[20px]">
                <span className="w-1.5 h-6 bg-[#5DA05D] rounded-sm" />
                Prepare teams for evolving market realities
              </li>
            </ul>
            <p className="text-[20px] text-[#131927] mt-4">
              This contributes to reduced attrition and stronger workforce resilience.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl border p-10">
            <h3 className="font-semibold text-3xl mb-4">
              Professional Growth & Market Alignment
            </h3>
            <p className="text-xl font-semibold text-gray-600 mb-4">
              Our consulting supports:
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 bg-[#DEFEDE80] py-[10px] text-[20px]">
                <span className="w-1.5 h-6 bg-[#5DA05D] rounded-sm" />
                Skills alignment with real market demand
              </li>
              <li className="flex items-start gap-3 bg-[#DEFEDE80] py-[10px] text-[20px]">
                <span className="w-1.5 h-6 bg-[#5DA05D] rounded-sm" />
                Career progression planning
              </li>
              <li className="flex items-start gap-3 bg-[#DEFEDE80] py-[10px] text-[20px]">
                <span className="w-1.5 h-6 bg-[#5DA05D] rounded-sm" />
                Long-term relevance beyond job titles
              </li>
            </ul>
            <p className="text-[20px] text-[#131927] mt-4">
              Designed for professionals navigating non-linear career paths.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl border p-10">
            <h3 className="font-semibold text-3xl mb-4">
              For Organizations Workforce & Capability Advisory
            </h3>
            <p className="text-xl font-semibold text-gray-600 mb-4">
              We work with organisations to:
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 bg-[#E8D0FF80] py-[10px] text-[20px]">
                <span className="w-1.5 h-6 bg-[#2A0D47] rounded-sm" />
                Assess workforce capability gaps
              </li>
              <li className="flex items-start gap-3 bg-[#E8D0FF80] py-[10px] text-[20px]">
                <span className="w-1.5 h-6 bg-[#2A0D47] rounded-sm" />
                Align talent development with business strategy
              </li>
              <li className="flex items-start gap-3 bg-[#E8D0FF80] py-[10px] text-[20px]">
                <span className="w-1.5 h-6 bg-[#2A0D47] rounded-sm" />
                Build future-ready teams for growth and scale
              </li>
            </ul>
            <p className="text-[20px] text-[#131927] mt-4">
              Our advisory supports sustainable performance, not short-term fixes.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

function ConsultingDifferenceSection() {
  return (
    <section className="bg-[#E6FFE7] mt-[40rem] md:mt-[55rem] py-16 px-6">
      <div className="max-w-5xl my-5 mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-20 font-roboto">
            How Our Consulting Is Different
          </h2>

          <div className="space-y-4">
            {/* Item */}
            <div className="flex items-center gap-4 bg-white border-2 border-[#5DA05D] rounded-xl px-5 py-4 shadow-sm">
              <span className="flex items-center justify-center w-8 h-8 shadow-xl rounded-full border border-[#5DA05D] text-[#5DA05D]">
                ✦
              </span>
              <p className="font-medium text-gray-900">
                Grounded in real market dynamics
              </p>
            </div>

            {/* Item */}
            <div className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-sm">
              <span className="flex items-center justify-center w-8 h-8 shadow-xl rounded-full border border-[#5DA05D] text-[#5DA05D]">
                ✦
              </span>
              <p className="font-medium text-gray-900">
                Focused on capability, not credentials
              </p>
            </div>

            {/* Item */}
            <div className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-sm">
              <span className="flex items-center justify-center w-8 h-8 shadow-xl rounded-full border border-[#5DA05D] text-[#5DA05D]">
                ✦
              </span>
              <p className="font-medium text-gray-900">
                Global perspective with local understanding
              </p>
            </div>

            {/* Item */}
            <div className="flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-sm">
              <span className="flex items-center justify-center w-8 h-8 shadow-xl rounded-full border border-[#5DA05D] text-[#5DA05D]">
                ✦
              </span>
              <p className="font-medium text-gray-900">
                Structured, practical, and outcome-oriented
              </p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/images/landing/oval.png"
            alt="Green gradient circle"
            className="w-64 h-64 md:w-80 md:h-80 object-contain"
          />
        </div>
      </div>
    </section>
  );
}

// function EngagementOptions() {
//   return (
//      <div className='py-4' id='consult'>
//       <div className='mx-4 md:mx-20 md:flex md:justify-between md:items-center'>
//         <div className='w-full object-cover'>
//           <h1 className='text-3xl font-bold mb-10 md:mb-20 md:mt-6'>Our aim is simple:</h1>
//           <div>
//             <div className='md:flex gap-5'>
//               <div data-aos="zoom-in" className='border-2 border-[#C4DAC4] p-3 h-56 w-80 rounded-tl-2xl mb-5'>
//                 <p>To partner with “corporations and institutions” on a clear career and development growth strategy; TRAINING & CONSULTING.</p>
//               </div>
//               <div data-aos="zoom-out" className='border-2 border-[#C4DAC4] p-3 h-56 w-80 rounded-bl-2xl mb-5'>
//                 <p>To partner to transform careers and workplaces with innovative corporate training solutions; I.e learning and development training.</p>
//               </div>
//             </div>
//             <div className='md:flex gap-5 mt-5'>
//               <div data-aos="fade-up" className='border-2 border-[#C4DAC4] p-3 h-56 w-80 rounded-br-2xl mb-5'>
//                 <p>To offer a personalized professional platform as a continuous career development tool; CAREER-NEXUS.COM</p>
//               </div>
//               <div data-aos="fade-down" className='border-2 border-[#C4DAC4] p-3 h-56 w-80 rounded-tr-2xl mb-5'>
//                 <p>We pride ourselves on providing unmatched career development tool, industry-focused training and consulting solutions. Trusted in providing human capacity building solutions; empowering teams, elevating performance, and driving sustainable growth.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className='w-full object-cover md:ml-24 mt-10 md:mt-0'>
//           <img src="/images/landing/landing13.png" alt="Consultation Image" className='rounded-2xl'/>
//         </div>
//       </div>
//     </div>
//   )
// }

function EngagementOptions() {
  return (
    <section className="w-full bg-[#E8D0FF] py-16 px-6">
      <div className="max-w-[884px] mx-auto">
        {/* Title */}
        <h2 className="text-center text-2xl md:text-[40px] font-bold text-gray-900 mb-12">
          Engagement Options
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <OptionCard
            IconSrc="/images/landing/handshake-icon.svg"
            title="One-on-one career consulting"
          />

          <OptionCard
            IconSrc="/images/landing/lines-icon.svg"
            title="Short-term strategic engagements"
          />

          <OptionCard
            IconSrc="/images/landing/group-icon.svg"
            title="Group or organisational advisory"
          />

          <OptionCard
            IconSrc="/images/landing/support-icon.svg"
            title="Ongoing advisory support"
          />
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <button className="bg-[#2A0D47] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-purple-800 transition">
            Request A Consultation
          </button>
        </div>
      </div>
    </section>
  );
}

function OptionCard({ IconSrc, title }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-xl bg-white shadow flex items-center justify-center mb-4">
        <img src={IconSrc} alt="icon" className="w-10 h-10" />
      </div>
      <p className="text-gray-900 font-semibold text-xl">{title}</p>
    </div>
  );
}


function WhoWeWork() {
  return (
    <section className="w-full max-w-5xl mx-auto bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Title */}
        <h2 className="mb-12 text-center text-[40px] font-bold text-gray-900">
          Who we work with
          <span className="block text-semibold text-xs">Designed for people to build real careers</span>
        </h2>
       

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Live Now */}
          <div className="rounded-2xl bg-[#5DA05D] p-6">
            <div className="mb-                                                                                                                            4 flex items-center gap-2 text-white">
              <span className="font-medium">Career Nexus Supports:</span>
            </div>

            <div className="rounded-xl bg-white p-6 min-h-[150px]">
              <ul className="divide-y divide-green-200 text-sm text-gray-700">
                <li className='py-3'>Professionals navigating career transitions</li>
                <li className="py-3">Early and mid-career talent building relevance</li>
                <li className="py-3">Founders and leaders developing teams</li>
                <li className="py-3">Organisations preparing for future workforce needs
                </li>
              </ul>
            </div>
          </div>

          {/* Coming Next */}
          <div className="rounded-2xl bg-[#290E4A] p-6">
            <div className="mb-4 flex items-center gap-2 text-white">
              <span className="font-medium">We prioritise:</span>
            </div>

            <div className="rounded-xl bg-white p-6 min-h-[150px]">
              <ul className="divide-y divide-green-200 text-sm text-gray-700">
                <li className="py-3">Substance over hype</li>
                <li className="py-3">Capability over claims</li>
                <li className="py-3">Direction over promises</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const TrustSection = () => {
  const items = [
    "🇬🇧 UK-registered company",
    "Global focus (UK, US, Canada, Australia, Africa)",
    "Industry-led mentorship",
    "Data privacy & platform integrity conscious",
    "Built with advisors, mentors, and professionals",
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center py-16 px-4 bg-white text-center">
      <h2 className="text-3xl font-semibold mb-2">
        Why you can trust <span className="text-[#5DA05D]">US</span>
      </h2>

      <p className="text-gray-600 mb-10 max-w-xl  text-xl">
        We are building carefully, transparently, and responsibly.
      </p>

      <div className="flex flex-col gap-4 items-center">
        {items.map((item, index) => (
          <div
            key={index}
            className="px-6 py-3 rounded-full font-bold text-[32px] border-2 border-gray-300 text-gray-800 bg-white shadow-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

function PurpleCard() {
  return (
    <div className="w-full flex justify-center mb-20">
      {/* Image wrapper */}
      <div className="relative w-full max-w-5xl mx-2 md:mx-20">
        <img
          src="/images/landing/Background.png"
          alt="landing"
          className="w-full h-72 object-cover rounded-xl"
        />

        {/* Centered overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl font-bold mb-16">
            Start with clarity. Build with direction.
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <button
              className="text-[#2A0D47] bg-white py-2 px-10 rounded-lg"
              onClick={() => (window.location.href = "#get-started")}
            >
              Request a Consultation
            </button>

            
          </div>
        </div>
      </div>
    </div>
);
}