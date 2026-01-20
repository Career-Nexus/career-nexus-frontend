import React, { useState } from 'react'
import { ComplianceMarqueeCarousel } from './Whoitsfor';
import ConsultingPackage from './ConsultingPackage';
import PartnerWIthUsModal from './PartnerWIthUsModal';
import ConsultantDropdown from './ConsultantDropdown';
import { consultants } from './GetStarted';


// const CALENDAR_LINK = "https://calendar.app.google/6QrJpg7HmC5aCgLT7";

// const openCalendar = () => {
//   window.open(CALENDAR_LINK, "_blank", "noopener,noreferrer");
// };


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
    <div>
      <div className="w-full bg-[#E8D0FF] pb-24 lg:pb-40 relative" id="about">
        {/* Hero Section */}
        <div className="w-full min-h-[32rem] flex flex-col lg:flex-row justify-between items-center px-4 sm:px-6 lg:px-12 xl:px-20 pt-10 lg:pt-14 gap-10 lg:gap-6">

          {/* Text Content */}
          <div className="w-full lg:w-[560px] xl:w-[641px] lg:mr-4 xl:mr-10 flex flex-col gap-4 text-center lg:text-left">
            <p className="font-sans hidden lg:block font-normal text-[14px] lg:text-[16px] xl:text-[20px] uppercase">
              CONSULTING SERVICES
            </p>

            <h1 className="font-roboto font-bold text-[24px] sm:text-[28px] lg:text-[30px] xl:text-[34px] leading-snug">
              Strategic career and workforce guidance for a changing world
            </h1>

            <p className="font-sans font-normal text-[14px] sm:text-[16px] lg:text-[18px] xl:text-[24px] mt-1 lg:mt-2">
              Career-Nexus delivers diagnostic, strategic, outcome-driven consulting
              that helps individuals and organizations make future-ready decisions in
              a complex global workforce.
            </p>

            <div className="flex justify-center lg:justify-start mt-5 lg:mt-6">
              <ConsultantDropdown
                buttonLabel="Request A Consultation"
                consultants={consultants}
                // buttonClassName="text-white bg-[#5DA05D] border-2 py-2 px-10 rounded-lg"
                buttonClassName="bg-[#2E1065] text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition"
                dropdownWidth="md:w-96"
              />
            </div>
          </div>

          {/* Image */}
          <div className="relative lg:absolute lg:top-10 xl:top-0 lg:right-6 xl:right-0 flex justify-center w-full lg:w-auto">
            <img
              src="/images/landing/handshake.png"
              alt="hero"
              className="w-[85%] sm:w-[70%] lg:w-[320px] xl:w-full max-w-sm lg:max-w-md xl:max-w-lg"
            />
          </div>
        </div>
      </div>

      <TheProblem />
    </div>
  );
}


const TheProblem = () => {
  return (
    <div
      className="bg-white mt-10 lg:mt-0 w-full flex justify-center"
      id="about"
    >
      <div className="bg-white p-6 lg:p-4 shadow-lg lg:mx-20 rounded-2xl lg:absolute lg:mt-[-9rem]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Card 1 */}
          <div className="bg-white rounded-xl border p-3 lg:p-10">
            <h3 className="font-semibold text-xl lg:text-3xl mb-4">
              For Individuals & Professionals
            </h3>
            <p className="lg:text-xl font-semibold text-gray-600 mb-4">
              We help professionals gain clarity on:
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 py-[10px] lg:text-[20px] bg-[#E8D0FF80] rounded-sm">
                <span className="w-1.5 h-6 bg-[#2A0D47] rounded-sm" />
                Career positioning in competitive markets
              </li>
              <li className="flex items-start py-[10px] lg:text-[20px] bg-[#E8D0FF80] gap-3">
                <span className="w-1.5 h-6 bg-[#2A0D47] rounded-sm" />
                Skills relevance and capability gaps
              </li>
              <li className="flex items-start py-[10px] lg:text-[20px] bg-[#E8D0FF80] gap-3">
                <span className="w-1.5 h-6 bg-[#2A0D47] rounded-sm" />
                Transition strategies across roles, industries, or geographies
              </li>
            </ul>
            <p className="lg:text-[20px] text-[#131927] mt-4">
              The focus is on direction, not guesswork.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl border p-3 lg:p-10">
            <h3 className="font-semibold text-xl lg:text-3xl mb-4">
              Talent & Skills Development Support
            </h3>
            <p className="lg:text-xl font-semibold text-gray-600 mb-4">
              Career-Nexus helps organisations:
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 bg-[#DEFEDE80] py-[10px] lg:text-[20px]">
                <span className="w-1.5 h-6 bg-[#5DA05D] rounded-sm" />
                Identify critical skill needs
              </li>
              <li className="flex items-start gap-3 bg-[#DEFEDE80] py-[10px] lg:text-[20px]">
                <span className="w-1.5 h-6 bg-[#5DA05D] rounded-sm" />
                Support employee development and retention
              </li>
              <li className="flex items-start gap-3 bg-[#DEFEDE80] py-[10px] lg:text-[20px]">
                <span className="w-1.5 h-6 bg-[#5DA05D] rounded-sm" />
                Prepare teams for evolving market realities
              </li>
            </ul>
            <p className="lg:text-[20px] text-[#131927] mt-4">
              This contributes to reduced attrition and stronger workforce resilience.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl border p-3 lg:p-10">
            <h3 className="font-semibold text-xl lg:text-3xl mb-4">
              Professional Growth & Market Alignment
            </h3>
            <p className="lg:text-xl font-semibold text-gray-600 mb-4">
              Our consulting supports:
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 bg-[#DEFEDE80] py-[10px] lg:text-[20px]">
                <span className="w-1.5 h-6 bg-[#5DA05D] rounded-sm" />
                Skills alignment with real market demand
              </li>
              <li className="flex items-start gap-3 bg-[#DEFEDE80] py-[10px] lg:text-[20px]">
                <span className="w-1.5 h-6 bg-[#5DA05D] rounded-sm" />
                Career progression planning
              </li>
              <li className="flex items-start gap-3 bg-[#DEFEDE80] py-[10px] lg:text-[20px]">
                <span className="w-1.5 h-6 bg-[#5DA05D] rounded-sm" />
                Long-term relevance beyond job titles
              </li>
            </ul>
            <p className="lg:text-[20px] text-[#131927] mt-4">
              Designed for professionals navigating non-linear career paths.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl border p-3 lg:p-10">
            <h3 className="font-semibold text-xl lg:text-3xl mb-4">
              For Organizations Workforce & Capability Advisory
            </h3>
            <p className="lg:text-xl font-semibold text-gray-600 mb-4">
              We work with organisations to:
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 bg-[#E8D0FF80] py-[10px] lg:text-[20px]">
                <span className="w-1.5 h-6 bg-[#2A0D47] rounded-sm" />
                Assess workforce capability gaps
              </li>
              <li className="flex items-start gap-3 bg-[#E8D0FF80] py-[10px] lg:text-[20px]">
                <span className="w-1.5 h-6 bg-[#2A0D47] rounded-sm" />
                Align talent development with business strategy
              </li>
              <li className="flex items-start gap-3 bg-[#E8D0FF80] py-[10px] lg:text-[20px]">
                <span className="w-1.5 h-6 bg-[#2A0D47] rounded-sm" />
                Build future-ready teams for growth and scale
              </li>
            </ul>
            <p className="lg:text-[20px] text-[#131927] mt-4">
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
    <section className="bg-[#E6FFE7] mt-[4rem] lg:mt-[55rem] py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl my-5 mx-auto grid lg:grid-cols-2 gap-16 items-center">
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
        <div className="flex justify-center lg:justify-end">
          <img
            src="/images/landing/landing-hero.png"
            alt="Green gradient circle"
            className="w-64 h-64 md:w-96 md:h-96 object-contain"
          />
        </div>
      </div>
    </section>
  );
}



function EngagementOptions() {
  return (
    <section className="w-full bg-[#E8D0FF] py-16 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
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
          <ConsultantDropdown
            buttonLabel="Request A Consultation"
            consultants={consultants}
            // buttonClassName="text-white bg-[#5DA05D] border-2 py-2 px-10 rounded-lg"
            buttonClassName="bg-[#2A0D47] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-purple-800 transition"
            dropdownWidth="md:w-96"
          />
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
    <section className="w-full max-w-7xl mx-auto bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        {/* Title */}
        <h2 className="mb-12 text-center text-2xl md:text-[40px] font-bold text-gray-900">
          Who we work with
          <span className="block text-semibold text-xs">Designed for people to build real careers</span>
        </h2>


        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Live Now */}
          <div className="rounded-2xl bg-[#5DA05D] p-6">
            <div className="mb-4 flex items-center gap-2 text-white">
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
    <section className='md:px-4 mx-6 md:mx-12 lg:mx-20'>

      <ComplianceMarqueeCarousel />
      <div id='consulting'>
        <ConsultingPackage />
      </div>
    </section>
  );
};

function PurpleCard() {
  return (
    <div className="w-full flex justify-center mb-20">
      {/* Image wrapper */}
      <div className="relative w-full max-w-6xl mx-2 md:mx-12 lg:mx-20">
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
            {/* <button
              className="text-[#2A0D47] bg-white py-2 px-10 rounded-lg"
              onClick={() => setIsOpen(true)}
            >
              Request a Consultation
            </button> */}

            <ConsultantDropdown
            buttonLabel="Request A Consultation"
            consultants={consultants}
            buttonClassName="text-[#2A0D47] bg-white py-2 px-10 rounded-lg"
            dropdownWidth="md:w-96"
          />
          </div>
        </div>
      </div>
    </div>
  );
}
