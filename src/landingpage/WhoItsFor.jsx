import React from 'react'

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
                <WhyTrustUs/>
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

const WhyTrustUs=() => {
    return (
        <div className='bg-white w-full mb-20 mt-10' id='about'>
            <div>
                <h1 className='font-sans md:text-2xl mb-3 text-center font-bold'>Why you can trust <span className='text-[#5DA05D]'>US</span></h1>
                <p className='text-center text-lg'>We are building carefully, transparently, and responsibly.</p>
            </div>
            <div className='mt-10 flex flex-col items-center space-y-3 font-bold text-base md:text-lg font-roboto md:w-3/4 mx-auto'>
                <p className='text-center border border-[#CCCCCC] rounded-full px-5 py-1'>🇬🇧 UK-registered company</p>
                <p className='text-center border border-[#CCCCCC] rounded-full px-5 py-1'>Global focus (UK, US, Canada, Australia, Africa)</p>
                <p className='text-center border border-[#CCCCCC] rounded-full px-5 py-1'>Industry-led mentorship</p>
                <p className='text-center border border-[#CCCCCC] rounded-full px-5 py-1'>Data privacy & platform integrity conscious </p>
                <p className='text-center border border-[#CCCCCC] rounded-full px-5 py-1'>Built with advisors, mentors, and professionals</p>
            </div>
        </div>
    )
}