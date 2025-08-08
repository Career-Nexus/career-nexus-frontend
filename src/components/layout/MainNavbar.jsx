
import React, { useContext, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Business, Email, Home, Jobs, Mentorship, Network, Notification, Search, } from '../../icons/icon';
import MobileFooterNav from './FooterNavbar';
import { UserContext } from '../../context/UserContext';
import { ChevronDown, HelpCircle, LogOut, Settings, UserCircle } from 'lucide-react';


const MainNavbar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

    const { user, logout } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        navigate("/login")
    }

    const isActive = (path) => {
        return location.pathname === path;
    }

    const navItemClass = "flex flex-col items-center";
    const activeClass = "border-b-2 border-green-500 text-[#5DA05D]";
    const activebg = "text-[#5DA05D]"

    return (
        <nav className='sticky top-0 z-50'>
            <div className='bg-white shadow w-full'>
                <div className='flex items-center justify-between md:mx-5 lg:mx-12 p-1 md:p-0'>
                    {/* Logo for small and medium screens */}
                    <div className='block md:hidden'>
                        <img src="/images/c-nicon2.png" alt="Career-nexus icon" className='h-12 w-auto' />
                    </div>
                    <div className='hidden md:block'>
                        <img src="/images/cnlogonew.png" alt="Career-Nexus logo" className="h-16 w-auto" />
                    </div>


                    {/* Navigation Links for Medium Screens and Up */}
                    {
                        user.user_type === "learner" ? (
                            <div className='hidden md:flex items-center justify-center lg:space-x-10 md:space-x-6 ml-[15rem]'>
                                <Link
                                    to='/home'
                                    className={`${navItemClass} ${isActive('/home') ? activeClass : ''}`}
                                >
                                    <Home className={`${isActive('/home') ? activebg : ''} mx-auto`} />
                                    <h1 className='text-xs'>Home</h1>
                                </Link>
                                <Link
                                    to='/mentorship'
                                    className={`${navItemClass} ${isActive('/mentorship') ? activeClass : ''}`}
                                >
                                    <Mentorship className={`${isActive('/mentorship') ? activebg : ''} mx-auto`} />
                                    <h1 className='text-xs'>Mentorship</h1>
                                </Link>
                                <Link
                                    to='/network'
                                    className={`${navItemClass} ${isActive('/network') ? activeClass : ''}`}
                                >
                                    <Network className={`${isActive('/network') ? activebg : ''} mx-auto`} />
                                    <h1 className='text-xs'>Network</h1>
                                </Link>
                                <Link
                                    to='/jobs'
                                    className={`${navItemClass} ${isActive('/jobs') ? activeClass : ''}`}
                                >
                                    <Jobs className={`${isActive('/jobs') ? activebg : ''} mx-auto`} />
                                    <h1 className='text-xs'>Jobs</h1>
                                </Link>
                                {/* <Link
                                    to='/mail'
                                    className={`${navItemClass} ${isActive('/mail') ? activeClass : ''}`}
                                >
                                    <Email className={`${isActive('/mail') ? activebg : ''} mx-auto`} />
                                    <h1 className='text-xs'>Mail</h1>
                                </Link>

                                <Link
                                    to='/business'
                                    className={`${navItemClass} ${isActive('/business') ? activeClass : ''}`}
                                >
                                    <Business className={`${isActive('/business') ? activebg : ''} mx-auto`} />
                                    <h1 className='text-xs'>Business</h1>
                                </Link> */}
                            </div>
                        ) : (
                            <div className='hidden md:flex items-center justify-center lg:space-x-10 md:space-x-6 ml-[15rem]'>
                                <Link
                                    to='/home'
                                    className={`${navItemClass} ${isActive('/home') ? activeClass : ''}`}
                                >
                                    <Home className={`${isActive('/home') ? activebg : ''} mx-auto`} />
                                    <h1 className='text-xs'>Home</h1>
                                </Link>
                                <Link
                                    to='/mentorship'
                                    className={`${navItemClass} ${isActive('/mentorship') ? activeClass : ''}`}
                                >
                                    <Mentorship className={`${isActive('/mentorship') ? activebg : ''} mx-auto`} />
                                    <h1 className='text-xs'>Mentorship</h1>
                                </Link>
                                <Link
                                    to='/network'
                                    className={`${navItemClass} ${isActive('/network') ? activeClass : ''}`}
                                >
                                    <Network className={`${isActive('/network') ? activebg : ''} mx-auto`} />
                                    <h1 className='text-xs'>Network</h1>
                                </Link>
                                {/* <Link
                                    to='/jobs'
                                    className={`${navItemClass} ${isActive('/jobs') ? activeClass : ''}`}
                                >
                                    <Jobs className={`${isActive('/jobs') ? activebg : ''} mx-auto`} />
                                    <h1 className='text-xs'>Jobs</h1>
                                </Link>
                                <Link
                                    to='/mail'
                                    className={`${navItemClass} ${isActive('/mail') ? activeClass : ''}`}
                                >
                                    <Email className={`${isActive('/mail') ? activebg : ''} mx-auto`} />
                                    <h1 className='text-xs'>Mail</h1>
                                </Link>

                                <Link
                                    to='/business'
                                    className={`${navItemClass} ${isActive('/business') ? activeClass : ''}`}
                                >
                                    <Business className={`${isActive('/business') ? activebg : ''} mx-auto`} />
                                    <h1 className='text-xs'>Business</h1>
                                </Link> */}
                            </div>
                        )
                    }
                    {/* Search Box */}
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden flex-grow mx-4 md:mx-10">
                        <div className="flex items-center pl-3">
                            <Search />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for Jobs, Skills, people....."
                            className="flex-grow py-2 px-1 border-0 focus:outline-none focus:ring-0 w-full"
                        />
                    </div>
                    <Link
                        to='/notifications'
                        className={`${navItemClass} ${isActive('/notifications') ? activeClass : ''}`}
                    >
                        <Notification className={`${isActive('/notifications') ? activebg : ''} mx-auto relative`} />
                        <div className='h-3 w-3 rounded-full bg-red-600 absolute top-4 ml-3 p-1'></div>
                        <span className='absolute font-bold top-[14px] ml-3 text-white' style={{ fontSize: "9px" }}>2</span>
                    </Link>

                    {/* User Name and Dropdown Menu */}
                    <div className=" ml-4 md:ml-0  flex items-center">
                        <div className="relative">
                            <div>
                                <button
                                    type="button"
                                    className="bg-white rounded-full flex text-sm "
                                    id="user-menu-button"
                                    aria-expanded={isProfileMenuOpen}
                                    aria-haspopup="true"
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <div className="mx-2 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-semibold">
                                        <img src={user.profile_photo} alt={user?.name?.charAt(0) || 'U'} className='h-10 w-10 rounded-full' />
                                    </div>
                                </button>
                            </div>

                            {isProfileMenuOpen && (
                                <div
                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabIndex="-1"
                                >
                                    <Link
                                        to={'/help'}
                                        className="flex gap-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-0"
                                    >
                                        <span><HelpCircle /></span>Help
                                    </Link>
                                    <Link
                                        to="/profilepage"
                                        className="flex gap-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-0"
                                        onClick={() => setIsProfileMenuOpen(false)}
                                    >
                                        <span><UserCircle /></span>Your Profile
                                    </Link>
                                    <Link
                                        to="/profilepage"
                                        className="flex gap-4 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-0"
                                        onClick={() => setIsProfileMenuOpen(false)}
                                    >
                                        <span><Settings /></span>Setting
                                    </Link>
                                    <button
                                        className="flex gap-4 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id="user-menu-item-2"
                                        onClick={handleLogout}
                                    >
                                        <span><LogOut /></span>Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hamburger Menu for Small Screens */}
                </div>
            </div>
            {/* Sidebar for small screens */}
            <MobileFooterNav />
            <Outlet />
        </nav>
    )
}

export default MainNavbar

