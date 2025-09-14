import React from 'react'
import { Booked, Bookmark, Bulb, Library, Mentorship, Newsletter, Recomended, Setting, Video } from '../../../icons/icon'
import { Link } from 'react-router-dom'

const ProfileDetail = () => {
    const mentors = [
        { id: 1, image: '/images/profile2.png', name: 'Jerome Bell' },
        { id: 2, image: '/images/profile2.png', name: 'Kristin Watson',dot: <div className='w-2 h-2 bg-red-500 rounded-full'></div> },
        { id: 3, image: '/images/profile2.png', name: 'Robert Fox'},
        { id: 4, image: '/images/profile2.png', name: 'Darlene Robertson' },
        { id: 5, image: '/images/profile2.png', name: 'Eleanor Pena',dot: <div className='w-2 h-2 bg-red-500 rounded-full'></div> },
        { id: 6, image: '/images/profile2.png', name: 'Devon Lane' },
    ]
    const data = [
        { id: 1, icon: <a href='#'><Mentorship /></a>, name: 'My Mentors' },
        { id: 2, icon: <a href='#'><Bookmark /></a>, name: 'Saved Videos' },
        { id: 3, icon: <a href='#'><Booked /></a>, name: 'Booked Sessions' },
        { id: 4, icon: <a href='#'><Recomended /></a>, name: 'Recomended' },
        { id: 6, icon: <a href='#'><Setting /></a>, name: 'Settings' },
    ]
    const category = [
        { id: 1, cat: 'Technology', num: 48 },
        { id: 2, cat: 'Marketing', num: 11 },
        { id: 3, cat: 'Design', num: 1 },
        { id: 4, cat: 'Leadership', num: 43 },
        { id: 6, cat: 'Entrepreneurship', num: 12 },
    ]
    return (
        <div className=''>
            <div className='border border-gray rounded-lg mb-5'>
                <h1 className='p-3 font-semibold'>Activity</h1>
                <div className='flex flex-col gap-4 p-3'>
                    {data.map(item => (
                        <div key={item.id} className='flex items-center gap-4 flex-wrap'>
                            <div className='w-3 h-3'>{item.icon}</div>
                            <div>
                                <h3 className='text-sm md:text-lg'>{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <a href='#' className='text-[#5DA05D] p-3'>See more...</a> */}
            </div>
            {/* <div className='border border-gray rounded-lg my-5'>
                <h1 className='p-3 font-semibold'>Categories</h1>
                <div className='flex flex-col gap-4 p-3'>
                    {category.map(item => (
                        <div key={item.id} className='flex items-center gap-4'>
                            <div className='flex justify-between w-full flex-wrap'>
                                <h3 className='text-sm md:text-lg'>{item.cat}</h3>
                                <p className='text-xs md:text-sm'>({item.num})</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='border border-gray rounded-lg my-5'>
                <h1 className='p-3 font-semibold'>Mentors</h1>
                <div className='flex flex-col gap-4 p-3'>
                    {mentors.map(item => (
                        <div key={item.id} className='flex items-center gap-4 flex-wrap'>
                            <img src={item.image} alt={item.name} className='w-5 md:w-8 h-5 md:h-8 rounded-full' />
                            <div>
                                <h3 className='text-sm md:text-lg'>{item.name}</h3>
                            </div>
                            <div className='ml-auto'>{item.dot}</div>
                        </div>
                    ))}
                </div>
                <a href='#' className='text-[#5DA05D] p-3'>See more...</a>
            </div> */}
        </div>
    )
}

export default ProfileDetail