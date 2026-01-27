import React, { useState } from 'react'
import Nav from './Nav'
import { Link } from 'react-router-dom'
import PartnerWIthUsModal from './PartnerWIthUsModal'
import ConsultantDropdown from './ConsultantDropdown'
import { consultants } from './GetStarted'

export default function About() {
    return (
        <div>
            <div className='w-full bg-[#000000] pb-32 md:pb-20 lg:pb-20 relative' id='home'>
                {/* Hero Section */}
                <div className='w-full text-white min-h-auto md:min-h-[28rem] flex flex-col md:gap-6 lg:gap-10 md:flex-row justify-between items-center px-4 md:px-12 lg:px-20 pt-8 md:pt-16 lg:pt-20 space-y-8 md:space-y-0'>
                    <div className='md:w-2/3 md:mr-5 lg:mr-10 flex flex-col gap-2'>
                        <p className="font-sans font-normal text-[12px] md:text-[16px] lg:text-[20px] leading-none tracking-normal uppercase align-middle">
                            LEADERSHIP & FOUNDING VISION
                        </p>
                        <h1 className="font-roboto font-bold text-[35px] md:text-[40px] lg:text-[52px] leading-none tracking-normal align-middle">
                            Built with a global perspective. Driven by real workforce challenges.
                        </h1>
                        <p className="font-sans font-normal text-[12px] lg:text-[16px] leading-none tracking-normal align-middle mt-3 w-[90%]">
                            Career-Nexus was founded to address a growing global problem: careers are evolving faster than the systems designed to support them.
                            As work becomes increasingly non-linear, skills-driven, and location-agnostic, professionals and organisations need clearer pathways, not outdated assumptions.
                        </p>
                    </div>
                    <div className='md:w-2/3 lg:w-1/2 flex flex-col px-4 md:ml-[-3.5rem]'>
                        <img src="/images/landing/LondonBridge2.PNG" alt="hero"
                            className='w-full max-w-sm md:max-w-md lg:max-w-lg' />
                        {/* <video
                            src="/images/landing/landing-hero.mp4"
                            controls
                            muted
                            autoPlay
                            loop
                            className='w-full max-w-sm md:max-w-md lg:max-w-lg rounded-lg shadow-lg'
                            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                        ></video> */}
                    </div>
                </div>
            </div>
            <Founder />
            <OurMission />
            <WhyWeExist />
            <TrustAndCredibility />
            <Leadership />
            <Reviews />
            <JoinUs />
        </div>
    )
}

const Founder = () => {
    return (
        <div className='bg-[#D9FFDB91] px-6 md:px-10 lg:px-20 pt-20 pb-10'>
            <div >
                <h2 className='font-roboto font-bold text-[28px] md:text-[32px] lg:text-[40px] leading-none tracking-normal align-middle'>Meet  the Founder</h2>
                <p className='text-xl mt-3 mb-5'>Built by someone who understands the problem</p>
            </div>
            <div className='w-full flex flex-col md:flex-row gap-10 md:gap-20 lg:gap-24 '>
                <div className='w-full md:w-1/3 flex flex-col items-center justify-center text-center'>
                    <img src="/images/landing/cnl-logo.png" alt="founder" className='w-full max-w-sm md:max-w-md lg:max-w-lg rounded-lg' />
                </div>
                <div className='w-full md:w-2/3 flex flex-col gap-4'>
                    <h2 className="font-roboto font-bold text-[20px] md:text-[25px] lg:text-[35px] leading-none tracking-normal align-middle">
                        Samuel O. Arowojolu
                    </h2>
                    <p className="font-sans font-normal text-[12px] md:text-[16px] lg:text-[20px] md:leading-6 tracking-normal align-middle text-gray-800">
                        <span className="font-semibold">
                            Founder &amp; CEO, Career-Nexus (UK)
                        </span>
                        <br /><br />
                        Samuel is a founder and career strategist building a globally relevant career development and consulting platform from Africa. His work focuses on workforce readiness, capability building, and helping individuals and organisations navigate complexity in modern careers.
                        <br />
                        Career-Nexus was founded on the belief that long-term career success is built on capability, clarity, and alignment with real market demand — not credentials alone.
                    </p>
                    <div className="flex items-start gap-6 mt-6">
                        {/* Vertical accent line */}
                        <div className="w-3 h-20 bg-[#5DA05D]"></div>

                        {/* Quote text */}
                        <p className="text-[#000000] text-base md:text-xl font-bold italic leading-relaxed">
                            “Careers are not built in isolation. They are shaped by guidance,
                            exposure, and the right conversations.”
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const OurMission = () => {
    return (
        <div className='px-6 md:px-10 lg:px-20 py-16'>
            <div className='text-center'>
                <h2 className='font-roboto font-bold text-[28px] md:text-[32px] lg:text-[40px] leading-none tracking-normal align-middle'>Our Mission Statement</h2>
                <p className='text-xl mt-3 mb-12'>We are building carefully, transparently, and responsibly.</p>
            </div>
            <div className='w-full flex flex-col md:flex-row gap-10 md:gap-20 lg:gap-24 '>
                <div className='w-full md:w-2/3 lg:w-1/2 flex flex-col gap-4 justify-center'>
                    <p className="font-sans font-normal text-[12px] md:text-[16px] lg:text-[20px] md:leading-6 tracking-normal align-middle text-gray-800 w-full md:w-4/5">
                        To empower individuals by providing accessible, high-quality professional development resources, ensuring practical skills needed to succeed.
                    </p>
                </div>
                <div className='w-full md:w-1/3 flex flex-col'>
                    <img src="/images/landing/mission.png" alt="mission" className='w-full max-w-sm md:max-w-md lg:max-w-lg' />
                </div>
            </div>
        </div>
    )
}

const WhyWeExist = () => {
    const goals = [
        "Support organisations building future-ready talent",
        "Bridge the gap between education and employability",
        "Redefine career growth for a global, skills-based economy",
        "Help professionals navigate uncertainty with structure and insight",
    ];
    return (
        <div className='bg-white px-6 md:px-10 lg:px-20 pb-16'>
            <div className='text-center mb-10'>
                <h2 className='font-roboto font-bold text-[28px] md:text-[32px] lg:text-[40px] leading-none tracking-normal align-middle'>Why Career-Nexus Exists</h2>
                <p className='text-xl mt-3 mb-5'>We are building carefully, transparently, and responsibly.</p>
            </div>
            <section className="bg-[#E8D0FF] rounded-xl p-6 md:p-10">
                <div className="space-y-4">
                    {goals.map((text, index) => (
                        <div
                            key={index}
                            className="flex items-center lg:mx-16 gap-4 bg-white rounded-2xl p-4 shadow-sm hover:border-2 hover:border-[#C8FFB7] transition-all"
                        >
                            {/* Icon badge */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#C8FFB7] bg-white shadow-md">
                                <span className="text-[#5DA05D] text-lg font-bold">✦</span>
                            </div>

                            {/* Text */}
                            <p className="text-[#000000] font-bold text-sm md:text-lg lg:text-xl">
                                {text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

const TrustAndCredibility = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const guides = [
        "Skills-first, market-aligned approach",
        "Ethical governance and transparency",
        "Global perspective with local execution",
        "Long-term workforce impact",
    ];
    return (
        <div>
            <div className='relative px-6 md:px-10 lg:px-20 pt-20 pb-48 lg:pb-24 bg-[#E6FFE7] w-full flex flex-col md:flex-row lg:gap-24 '>
                <div className='mb-5 md:mb-10 w-full md:w-2/3 flex flex-col gap-4'>
                    <h2 className='font-roboto font-bold text-[28px] md:text-[32px] lg:text-[40px] leading-none tracking-normal align-middle'>Trust & Credibility</h2>
                    <p className='text-xl mt-3 md:mb-5'>Built on clarity, governance, and long-term value</p>
                    <p className='w-full md:w-2/3'>Career-Nexus is committed to building a credible, globally relevant career platform grounded in integrity, structure, and measurable impact.</p>
                </div>
                <div className='w-3/4 md:w-1/3 flex flex-col items-center justify-center text-center'>
                    <img src="/images/landing/ellipse-green.png" alt="trust" className='w-full max-w-xs md:max-w-md lg:max-w-lg rounded-lg' />
                </div>
            </div>
            <div className="mx-6 md:mx-10 lg:mx-20 py-4 absolute mt-[-12rem] md:mt-[-13rem] max-w-md md:max-w-2xl lg:max-w-xl md:w-full bg-white rounded-2xl shadow-md p-6">
                {/* Title */}
                <h3 className="text-lg font-semibold text/compiler-gray-900 mb-5">
                    What Guides Career-Nexus
                </h3>

                {/* List */}
                <div className="space-y-4">
                    {guides.map((item, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <div
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`
                                flex items-center gap-4 p-4 rounded-xl cursor-pointer
                                border transition-all duration-200
                                ${isActive
                                        ? "border-green-500 bg-green-50"
                                        : "border-gray-200 bg-white"
                                    }
              `}
                            >
                                {/* Icon */}
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-green-300 bg-green-50 shadow-sm">
                                    <span className="text-green-600 text-lg font-bold">✦</span>
                                </div>

                                {/* Text */}
                                <p className="text-gray-900 font-medium text-sm md:text-base">
                                    {item}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

const Leadership = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const guides = [
        "Strategic discipline",
        "Responsible decision-making",
        "Sustainable growth",
        "Alignment between mission and execution",
    ];
    return (
        <div>
            <div className='px-6 md:px-10 lg:px-20 pt-[17rem] pb-10 bg-white'>
                <div className='w-full flex flex-col lg:flex-row lg:gap-10'>
                    <div className='w-full lg:w-2/3 lg:flex flex-col items-center justify-center text-center bg-[#E8D0FF] p-6 rounded-lg shadow-md'>
                        <img src="/images/landing/ellipse-pink.png" alt="leader1" className='w-full max-w-sm md:max-w-xs lg:max-w-lg rounded-lg p-5 lg:p-10' />
                        <p className='my-1'>This governance structure supports confidence among professionals, partners, and stakeholders.</p>
                    </div>
                    <div className='w-full flex flex-col items-center justify-center'>
                        <div className="mx-6 lg:mx-20 py-4 w-full bg-white rounded-2xl">
                            {/* Title */}
                            <h3 className="text-2xl font-bold text/compiler-gray-900 mb-5">
                                Leadership & Oversight
                            </h3>
                            <p className='w-2/3 text-lg mb-2'>Career-Nexus operates under active leadership and board oversight, ensuring:</p>
                            {/* List */}
                            <div className="space-y-4">
                                {guides.map((item, index) => {
                                    const isActive = index === activeIndex;

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => setActiveIndex(index)}
                                            className={`
                                            flex items-center gap-4 p-4 rounded-xl cursor-pointer
                                            border transition-all duration-200
                                            ${isActive
                                                    ? "border-[#2A0D47] bg-white"
                                                    : "border-gray-200 bg-white"
                                                }
                                            `}>
                                            {/* Icon */}
                                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#B48EDD] shadow-sm">
                                                <span className="text-[#2A0D47] text-lg font-bold">✦</span>
                                            </div>

                                            {/* Text */}
                                            <p className="text-gray-900 font-medium text-sm md:text-base">
                                                {item}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Reviews = () => {
    const reviews = [
        {
            name: "JEREMAIH OGBONNA",
            role: "Co-founder/Chief Finance Officer, Career-nexus Ltd",
            content: "Career-Nexus recognises that careers today are no longer linear or location-bound. The platform provides the structure, insight, and exposure required to navigate modern work at a global level.",
            comas: "/images/landing/quote.png",
            image: "/images/landing/review1.png"
        },
        {
            name: "Dr. NOSIKE AGOKEI",
            role: "Board Chairman, Career-Nexus Ltd",
            content: "Career-Nexus is addressing one of the most critical challenges facing the global workforce today — the disconnect between education, skills, and real market opportunity.",
            comas: "/images/landing/quote.svg",
            image: "/images/landing/review2.png"
        }
    ];

    return (
        <div className='px-6 md:px-10 lg:px-20 pt-[2rem] bg-white'>
            <p className='text-center font-bold text-3xl'>Reviews from the management</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {reviews.map((review, index) => (
                    <div key={index} className="bg-[#F8FFF8] rounded-xl p-6 mb-4">
                        <img src={review.comas} alt="quote" className='font-bold text-5xl text-[#5DA05D] mb-4' />
                        <p className="text-gray-900 font-medium">{review.content}</p>
                        {/* <div>
                                <img src={review.image} alt="reviewer" />
                            </div> */}
                        <div className="mt-4">
                            <p className="font-bold text-lg">{review.name}</p>
                            <p className="text-gray-600">{review.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


const JoinUs = () => {
    return (
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 relative z-0">
            <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] rounded-2xl">
                {/* Background Image */}
                <img
                    src="/images/landing/rectangle.png"
                    alt="Join early access"
                    className="w-full h-full object-cover rounded-2xl"
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
                    <h2 className="font-roboto font-bold text-[24px] sm:text-[28px] md:text-[32px] lg:text-[40px] leading-tight text-white">
                        Join our early access community
                    </h2>

                    <p className="text-sm sm:text-base md:text-lg mt-3 mb-6 text-white/80 max-w-xl">
                        Be part of a growing ecosystem shaping the future of career development.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pointer-events-auto relative z-10">
                        <Link to="/signup"><button className="bg-white text-[#5DA05D] px-6 py-3 rounded-lg font-medium transition hover:bg-white/90">
                            Join Early Access
                        </button></Link>
                        <ConsultantDropdown
                            buttonLabel="Partner With Career-Nexus"
                            consultants={consultants}
                            // buttonClassName="text-white bg-[#5DA05D] border-2 py-2 px-10 rounded-lg"
                            buttonClassName="border border-white text-white px-6 py-3 rounded-lg font-medium transition hover:bg-white/10"
                            dropdownWidth="md:w-96"
                        />
                    </div>

                    <p className="mt-6 text-xs sm:text-sm text-white/70">
                        No spam. No pressure. Just meaningful progress.
                    </p>
                </div>
            </div>
        </div>

    )
}