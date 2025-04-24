import React from 'react'
import { Bookmark, Bulb, Library, Newsletter, Setting, Video } from '../../../icons/icon'
import { Link } from 'react-router-dom'

const Profile = () => {
    const items = [
        { id: 1, image: '/images/profile2.png', name: 'Eric Moore', desc: 'Ux Mentor, Google', follow: '121,344 Followers' },
        { id: 2, image: '/images/profile2.png', name: 'Eric Moore', desc: 'Ux Mentor, Google', follow: '121,344 Followers' },
        { id: 3, image: '/images/profile2.png', name: 'Eric Moore', desc: 'Ux Mentor, Google', follow: '121,344 Followers' },
    ]
    const data = [
        { id: 1, icon: <a href='#'><Video /></a>, name: 'Learning' },
        { id: 2, icon: <a href='#'><Bulb /></a>, name: 'Insights' },
        { id: 3, icon: <a href='#'><Bookmark /></a>, name: 'Bookmarks' },
        { id: 4, icon: <a href='#'><Library /></a>, name: 'Library' },
        { id: 5, icon: <a href='#'><Newsletter /></a>, name: 'Newsletter' },
        { id: 6, icon: <a href='#'><Setting /></a>, name: 'Settings' },
    ]
    return (
        <div className='hidden md:block'>
            <div className='border border-gray rounded-lg'>
                <img src="/images/bg-profile.png" alt="background profile" className='w-full h-auto' />
                <Link to={'/profilepage'}>
                    <img src="/images/profile.png" alt="profile picture"
                        className='rounded-full w-32 h-auto md:mt-[-3.7rem] md:ml-3' />
                </Link>
                <img src="/images/active-icon.png" alt="Active" className='ml-28 -mt-8' />
                <div className='p-3 flex flex-col gap-3'>
                    <h1 className='font-bold text-2xl mt-4'>John Smith</h1>
                    <p className='text-sm'>Ui/Ux Designer | Seeking mentorship</p>
                    <hr />
                    <p className='font-semibold'>Profile Views:24</p>
                    <Link to={'/profilepage'} className='text-[#5DA05D] font-semibold'>View full profile</Link>
                </div>
            </div>
            <div className='border border-gray rounded-lg my-5'>
                <h1 className='p-3 font-semibold'>Who to Follow</h1>
                <div>
                    {items.map(item => (
                        <div key={item.id} className='grid grid-cols-12 items-center p-3'>
                            <img src={item.image} alt={item.name} className='w-12 h-12 rounded-full md:col-span-12 lg:col-span-3 md:mb-2' />
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
                <a href='#' className='text-[#5DA05D] p-3'>See more...</a>
            </div>
            <div className='border border-gray rounded-lg my-5'>
                <h1 className='p-3 font-semibold'>Activity</h1>
                <div className='flex flex-col gap-4 p-3'>
                    {data.map(item => (
                        <div key={item.id} className='flex items-center gap-4'>
                            <div>{item.icon}</div>
                            <div>
                                <h3 className='text-lg'>{item.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <a href='#' className='text-[#5DA05D] p-3'>See more...</a> */}
            </div>
        </div>
    )
}

export default Profile