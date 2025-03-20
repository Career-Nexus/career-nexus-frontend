import React from 'react'
import { Avatar } from "flowbite-react";
import { Message } from '../../../icons/icon';

const EventsHome = () => {
    const items1 = [
        { title: 'Upcoming Sessions', event1: 'Resume Review', date1: 'Today, 2:00PM', event2: 'Portfolio Feedback', date2: 'Tomorrow, 10:00AM' }
    ]
    const items2 = [
        {
            title: 'Recommended Jobs', header1: 'Ux Designer', comp1: 'TechCorp Inc.', skill1: 'Matching skill: 4/5',
            header2: "Product Manager", comp2: "Innovate Solutions", skip2: "Matching skill: 3/5"
        }
    ]
    const items3 = [
        { title: 'Discover New Career Opportunities', desc: 'Explore premium services tailored to your career growth.', img1: <Message /> }
    ]
    return (
        <div className='hidden md:block'>
            <div className="w-full max-w-md overflow-hidden border-gray-300 p-2 rounded border shadow-sm">
                <div className="relative">
                    {/* Background image */}
                    <div className="relative aspect-[4/5.5] w-full">
                        <img
                            src="/images/image3.png" alt="Events" className="rounded object-cover w-full h-full" 
                           //className="w-full h-full object-cover"
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple-900/90" />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 p-2 text-white">
                            <h2 className="text-xs leading-tight">
                                Unlock Exclusive Access - Subscribe to Premium Now!
                            </h2>

                            <button className='text-white bg-[#1F1AB0] p-1 rounded-lg' style={{ fontSize: "10px", position: "relative" }}>Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='border border-gray-300 p-2 rounded relative'>
                <div className=''>
                    <img src="images/image3.png" alt="Events" className='rounded' />
                </div>
                <div className='w-full h-auto relative -mt-2 p-2'>
                    <div className='absolute inset-0 bg-gradient-to-t from-purple-500 to-purple-800 opacity-75 rounded'></div>
                    <p style={{ fontSize: "10px", color: "white", position: "relative" }}>Unlock Exclusive Access - Subscribe to Premium Now!</p>
                    <button className='text-white bg-[#1F1AB0] p-1 rounded-lg' style={{ fontSize: "10px", position: "relative" }}>Subscribe</button>
                </div>
            </div> */}
            <div className='border border-gray-300 rounded-lg p-2 my-2'>
                {/* background: linear-gradient(357.2deg, #280B45 19.9%, rgba(72, 58, 86, 0.481928) 72.17%, rgba(102, 102, 102, 0) 101%); */}
                {items1.map(item => (
                    <div key={item.title} className='p-2'>
                        <h3 className='text-xs font-semibold mb-2'>{item.title}</h3>
                        <p className='text-xs font-semibold mb-1'>{item.event1}</p>
                        <p className='text-xs'>{item.date1}</p>
                        <p className='text-xs font-semibold my-1'>{item.event2}</p>
                        <p className='text-xs'>{item.date2}</p>
                    </div>
                ))}
            </div>
            <div className='border border-gray-300 rounded-lg p-2 my-2'>
                {items2.map(item => (
                    <div key={item.title} className='p-2'>
                        <h3 className='text-xs font-semibold mb-2'>{item.title}</h3>
                        <p className='text-xs font-semibold mb-1'>{item.header1}</p>
                        <p className='text-xs'>{item.comp1}</p>
                        <p className='text-xs mb-1'>{item.skill1}</p>
                        <p className='text-xs font-semibold mb-1'>{item.header2}</p>
                        <p className='text-xs'>{item.comp2}</p>
                        <p className='text-xs mb-1'>{item.skip2}</p>
                        <a href="#" className='text-[#5DA05D] text-xs font-semibold'>View all Jobs</a>
                    </div>
                ))}
            </div>
            <div className='border border-gray-300 rounded-lg p-2 my-2'>
                {items3.map(item => (
                    <div key={item.title} className='p-2'>
                        <h3 className='text-xs font-semibold mb-2'>{item.title}</h3>
                        <p className='text-xs'>{item.desc}</p>
                        <a href="#" className='text-[#5DA05D] text-xs font-semibold'>Learn more</a>
                    </div>
                ))}

            </div>
            <div className='flex items-center justify-center mt-[-5rem]'>
                <div className="relative inline-block">
                    <button
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5DA05D] text-white shadow-md hover:bg-[#5DA05D] transition-colors"
                        aria-label="Messages"
                    >
                        <Message className="w-6 h-6" />
                        {/* <MessageSquare className="w-6 h-6" /> */}
                    </button>
                    <div className="absolute top-0 right-0 flex items-center justify-center w-3 h-3 bg-red-500 text-white text-xs rounded-full">
                        2
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventsHome