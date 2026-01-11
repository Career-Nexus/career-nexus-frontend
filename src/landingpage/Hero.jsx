import React, { useState } from 'react'
import { PGreen, PPink, VGreen } from '../icons'

export default function Hero() {
    return (
        <div className=''>
            <div className='w-full bg-[#EAFFEA] pb-32 md:pb-20 lg:pb-52 relative' id='home'>
                {/* Hero Section */}
                <div className='w-full min-h-auto md:min-h-[28rem] flex flex-col md:gap-6 lg:gap-10 md:flex-row justify-between items-center px-4 md:px-12 lg:px-20 pt-8 md:pt-16 lg:pt-20 space-y-8 md:space-y-0'>
                    <div className='lg:w-2/3 lg:mr-10 flex flex-col gap-2 w-full'>
                        <p className="font-sans font-normal text-xs md:text-base lg:text-[20px] leading-tight md:leading-snug lg:leading-none tracking-normal uppercase align-middle">
                            Built by professionals. Designed for real careers.
                        </p>
                        <h1 className="font-roboto font-bold text-2xl md:text-4xl lg:text-[52px] leading-tight md:leading-snug lg:leading-none tracking-normal align-middle">
                            Build clarity. Gain guidance. Grow your career.
                        </h1>
                        <p className="font-sans font-normal text-xs md:text-sm lg:text-[16px] leading-snug md:leading-relaxed lg:leading-none tracking-normal align-middle mt-3 w-full md:w-[95%] lg:w-[90%]">
                            Career-Nexus.Com helps students, graduates, and early professionals bridge the gap between education and real-world careers through mentorship, guidance, and global opportunities.
                        </p>
                        <div className='flex flex-col md:flex-row gap-3 md:gap-5 lg:gap-7 mt-4 md:mt-5 lg:mt-6'>
                            <button className='bg-[#5DA05D] text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base whitespace-nowrap'>Join Early Access</button>
                            <button className='border border-[#5DA05D] text-[#5DA05D] px-3 md:px-4 py-2 rounded-lg text-sm md:text-base whitespace-nowrap'>Become A Mentor</button>
                        </div>
                    </div>
                    <div className='flex flex-col lg:px-4 w-full md:w-1/2 lg:w-1/3'>
                        <img src="/images/landing/landing-hero.png" alt="hero" className='w-full max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg' />
                    </div>
                </div>
            </div>
            <TheProblem />
        </div>
    )
}


const TheProblem = () => {
    const items = [
        { id: 1, text: "Lack of career clarity" },
        { id: 2, text: "No access to experienced mentors" },
        { id: 3, text: "Limited real-world exposure" },
        { id: 4, text: "Unclear pathways into competitive industries" },
    ];
    const [activeId, setActiveId] = useState(1);
    return (
        <div className='bg-white w-full' id='about'>
            <div className='bg-white p-4 md:p-6 lg:p-10 shadow-lg mx-4 md:mx-8 lg:mx-20 rounded-2xl relative mt-[-4rem] lg:mt-[-9rem]'>
                <h1 className='font-sans text-sm md:text-base lg:text-lg mb-3'>THE PROBLEM</h1>
                <div className='flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-20'>
                    <p className='w-full md:w-1/2 font-roboto font-bold text-xl md:text-2xl lg:text-4xl leading-tight'>
                        Education prepares you for exams not careers
                    </p>
                    <div className='text-base md:text-lg lg:text-xl w-full md:w-1/2 flex justify-center items-center'>
                        Career decisions are too important <br /> to be made alone.
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6 mt-6 md:mt-10 lg:mt-16">
                    {items.map((item) => {
                        const isActive = item.id === activeId;

                        return (
                            <div
                                key={item.id}
                                onClick={() => setActiveId(item.id)}
                                className={`
                            flex items-center gap-3 md:gap-4 p-2 md:p-3 lg:p-4 rounded-2xl cursor-pointer
                            border transition-all duration-200
                            ${isActive
                                        ? "border-green-500 shadow-sm"
                                        : "border-gray-200"}
                          `}
                            >
                                {/* Number circle */}
                                <div
                                    className={`
                                w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full text-xs md:text-sm font-semibold flex-shrink-0
                                ${isActive
                                            ? "border border-green-500 text-green-600 bg-green-50 shadow-lg"
                                            : "border border-gray-200 text-gray-400"}
                        `}
                                >
                                    {item.id}
                                </div>

                                {/* Text */}
                                <p className="text-sm md:text-base font-bold text-gray-900">
                                    {item.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    )
}