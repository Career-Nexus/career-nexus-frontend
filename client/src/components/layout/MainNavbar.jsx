import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import {Business, Email, Help, Home, Jobs, Mentorship, Network, Notification, RightArrow, Search, Toggle, User } from '../../icons/icon';
import MobileFooterNav from './FooterNavbar';


const MainNavbar = () => {
    return (
        <nav className='sticky top-0 z-50'>
            <div className='bg-white shadow w-full'>
                <div className='flex items-center justify-between md:mx-5 lg:mx-20 p-1 md:p-0'>
                    {/* Logo for small and medium screens */}
                    <div className='block md:hidden'>
                        <img src="/images/c-nicon2.png" alt="Career-nexus icon" className='h-12 w-auto' />
                    </div>
                    <div className='hidden md:block'>
                        <img src="images/cnlogonew.png" alt="Career-Nexus logo" className="h-16 w-auto" />
                    </div>

                    {/* Search Box */}
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden flex-grow mx-4 lg:mx-10">
                        <div className="flex items-center pl-3">
                            <Search />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for Jobs, Skills, people....."
                            className="flex-grow py-2 px-1 border-0 focus:outline-none focus:ring-0 w-full"
                        />
                    </div>
                    {/* Navigation Links for Medium Screens and Up */}
                    <div className='hidden md:flex items-center justify-center lg:space-x-6 md:space-x-3'>
                        <Link to={'/home'} className='flex flex-col items-center'>
                            <Home className='mx-auto' />
                            <h1 className='text-xs'>Home</h1>
                        </Link>
                        <div className='flex flex-col items-center'>
                            <Mentorship className='mx-auto' />
                            <h1 className='text-xs'>Mentorship</h1>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Network className='mx-auto' />
                            <h1 className='text-xs'>Network</h1>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Jobs className='mx-auto' />
                            <h1 className='text-xs'>Jobs</h1>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Email className='mx-auto' />
                            <h1 className='text-xs'>Mail</h1>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Notification className='mx-auto' />
                            <h1 className='text-xs'>Notification</h1>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Business className='mx-auto' />
                            <h1 className='text-xs'>Business</h1>
                        </div>
                    </div>
                    <p className='md:ml-5 ml-0 mr-2 md:mr-0'>|</p>
                    {/* Profile Picture */}
                    <div className='flex items-center md:ml-4 lg:ml-10 ml-0'>
                        <img src="/images/profile.png" alt="Profile picture" className="h-10 w-auto rounded-full" />
                    </div>
                </div>
            </div>
            {/* Sidebar for small screens */}
            <MobileFooterNav />
            <Outlet />
        </nav>
    )
}

export default MainNavbar
