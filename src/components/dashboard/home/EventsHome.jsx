import React from 'react'
import { Message } from '../../../icons/icon';
import FloatingMessageIcon from './FloatingMessage';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

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
    const items = [
        { id: 1, image: '/images/profile2.png', name: 'Eric Moore', desc: 'Ux Mentor, Google', follow: '121,344 Followers' },
        { id: 2, image: '/images/profile2.png', name: 'Eric Moore', desc: 'Ux Mentor, Google', follow: '121,344 Followers' },
        { id: 3, image: '/images/profile2.png', name: 'Eric Moore', desc: 'Ux Mentor, Google', follow: '121,344 Followers' },
    ]
    return (
        <div className='hidden md:block'>
            <div className='border border-gray rounded-lg mb-5 pb-2 flex flex-col px-3'>
                <h1 className='py-3 font-semibold'>WHO TO FOLLOW</h1>
                <div>
                    {items.map(item => (
                        <div key={item.id} className='grid grid-cols-12 items-center'>
                            <img src={item.image} alt={item.name} className='w-10 h-10 rounded-full md:col-span-12 lg:col-span-3 md:mb-2' />
                            <div className='lg:col-span-6 md:col-span-12 md:mb-2'>
                                <h3 className='font-bold'>{item.name}</h3>
                                <p className='text-xs font-thin'>{item.desc}</p>
                                <p className='text-xs font-thin'>{item.follow}</p>
                            </div>
                            <div className='lg:col-span-3 md:col-span-12'>
                                <button className='border border-[#5DA05D] rounded-lg text-[#5DA05D] text-sm px-2'>Follow</button>
                            </div>
                        </div>
                    ))}
                </div>
                <a href='#' className='text-[#5DA05D] text-center p-1 border border-[#5DA05D] w-full rounded-lg'>See more...</a>
            </div>
            <div className='border border-gray-300 rounded-lg p-2 my-2 flex flex-col'>
                {items2.map(item => (
                    <div key={item.title} className='p-2'>
                        <h3 className='text-xs font-semibold mb-2'>{item.title.toUpperCase()}</h3>
                        <p className='text-xs font-semibold mb-1'>{item.header1}</p>
                        <p className='text-xs'>{item.comp1}</p>
                        <p className='text-xs mb-1'>{item.skill1}</p>
                        <p className='text-xs font-semibold mb-1'>{item.header2}</p>
                        <p className='text-xs'>{item.comp2}</p>
                        <p className='text-xs mb-1'>{item.skip2}</p>
                    </div>
                ))}
                <a href='#' className='text-[#5DA05D] text-center p-1 border border-[#5DA05D] w-full rounded-lg'>See more...</a>
            </div>
            <FloatingMessageIcon />
            <div>
                <Premium />
            </div>
        </div>
    )
}

export default EventsHome

export const Premium = () => {
    return (
        <div className="relative inline-block">
            <img src="/images/premium.png" alt="premium" className="w-full rounded-lg" />
            <Link href="#" className="absolute top-3 right-2.5 text-white">
                <ArrowUpRight size={20} />
            </Link>
        </div>
    )
}

// const Premium = () => {
//     return (
//         <div className='bg-[#5DA05D] rounded-lg px-4 py-2 flex flex-col gap-2' >
//             <div className='text-white flex items-center justify-between'>
//                 <h2>PREMIUM</h2>
//                 <Link><ArrowUpRight /></Link>
//             </div>
//             <p className='text-white text-sm'>
//                 Unlock Exclusive Access - Subscribe to Premium Now!
//             </p>
//         </div>
//     )
// }