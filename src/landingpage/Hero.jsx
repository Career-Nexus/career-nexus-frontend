import React, { useState } from 'react'
import { PGreen, PPink, VGreen } from '../icons'

export default function Hero() {
    return (
        <div className=''>
            <div className='w-full bg-[#EAFFEA] pb-52 relative' id='home'>
                {/* Hero Section */}
                <div className='w-full h-[32rem] flex flex-col md:gap-10 md:flex-row justify-between items-center px-6 md:px-20 pt-10 md:pt-20 space-y-10 md:space-y-0'>
                    <div className='md:w-2/3 md:mr-5 lg:mr-10 flex flex-col gap-2'>
                        <p className="font-sans font-normal text-[12px] md:text-[20px] leading-none tracking-normal uppercase align-middle">
                            Built by professionals. Designed for real careers.
                        </p>
                        <h1 className="font-roboto font-bold text-[35px] md:text-[52px] leading-none tracking-normal align-middle">
                            Build clarity. Gain guidance. Grow your career.
                        </h1>
                        <p className="font-sans font-normal text-[12px] md:text-[16px] leading-none tracking-normal align-middle mt-3 w-[90%]">
                            Career-Nexus.Com helps students, graduates, and early professionals bridge the gap between education and real-world careers through mentorship, guidance, and global opportunities.
                        </p>
                        <div className='flex flex-col md:flex-row gap-7 mt-6'>
                            <button className='bg-[#5DA05D] text-white px-4 py-2 rounded-lg'>Join Early Access</button>
                            <button className='border border-[#5DA05D] text-[#5DA05D] px-4 py-2 rounded-lg'>Become A Mentor</button>
                        </div>
                    </div>
                    <div className='flex flex-col items-center justify-center text-center px-4'>
                        <img src="/images/landing/landing-hero.png" alt="hero" className='w-full max-w-sm md:max-w-md lg:max-w-lg' />
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
            <div className='bg-white p-5 md:p-10 shadow-lg mx-6 md:mx-20 rounded-2xl absolute md:mt-[-9rem]'>
                <h1 className='font-sans md:text-lg mb-3'>THE PROBLEM</h1>
                <div className='flex flex-col md:flex-row gap-3 md:gap-20'>
                    <p className='md:w-1/2 font-roboto font-bold text-2xl md:text-4xl leading-tight'>
                        Education prepares you for exams not careers
                    </p>
                    <div className='text-xl md:w-1/2 flex justify-center'>
                        Career decisions are too important <br /> to be made alone.
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 md:mt-16">
                    {items.map((item) => {
                        const isActive = item.id === activeId;

                        return (
                            <div
                                key={item.id}
                                onClick={() => setActiveId(item.id)}
                                className={`
                            flex items-center gap-4 p-2 md:p-4 rounded-2xl cursor-pointer
                            border transition-all duration-200
                            ${isActive
                                        ? "border-green-500 shadow-sm"
                                        : "border-gray-200"}
                          `}
                            >
                                {/* Number circle */}
                                <div
                                    className={`
                                w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold
                                ${isActive
                                            ? "border border-green-500 text-green-600 bg-green-50 shadow-lg"
                                            : "border border-gray-200 text-gray-400"}
                        `}
                                >
                                    {item.id}
                                </div>

                                {/* Text */}
                                <p className="text-base font-bold text-gray-900">
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