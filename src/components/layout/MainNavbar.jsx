
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Business, Email, Home, Jobs, Mentorship, Network, Notification, Search, } from '../../icons/icon';
import MobileFooterNav from './FooterNavbar';
import { UserContext } from '../../context/UserContext';
import { ChevronDown, Ellipsis, HelpCircle, LoaderIcon, LogOut, Settings, UserCircle } from 'lucide-react';
import { MentorServices } from '../../api/MentorServices';
import Profile from '../dashboard/home/Profile';


const MainNavbar = () => {
    const [searchUser, setSearchUser] = useState([])
    const [searchTriggered, setSearchTriggered] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [loading, setLoading] = useState(false);

    const location = useLocation()
    const navigate = useNavigate()
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const menuRef = useRef(null);

    const { user, logout } = useContext(UserContext);

    const handleLogout = () => {
        logout();
        navigate("/login")
    }

    // Auto-trigger search with debounce
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchUser([]);
            return;
        }

        const delayDebounce = setTimeout(() => {
            searchUsers();
        }, 500); // 0.5s delay

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    const searchUsers = async () => {
        try {
            setLoading(true);
            const { success, data } = await MentorServices.searchuser({
                keyword: searchQuery.trim(),
            });
            setSearchUser(success ? data : []);
        } catch (error) {
            console.error("Search failed", error);
            setSearchUser([]);
        } finally {
            setLoading(false);
        }
    };
    const isActive = (path) => {
        return location.pathname === path;
    }

    // const clearSearch = () => {
    //     setSearchQuery("")
    //     setSearchTriggered(false)
    //     setSearchUser([])
    // }


    // 🔒 Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };

        if (isProfileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isProfileMenuOpen]);

    const navItemClass = "flex flex-col items-center";
    const activeClass = "border-b-2 border-green-500 text-[#5DA05D]";
    const activebg = "text-[#5DA05D]"

    return (
        <nav className='sticky top-0 z-50'>
            <div className='bg-white shadow w-full'>
                <div className='flex items-center justify-between md:mx-5 lg:mx-12 p-1 md:p-0'>
                    {/* Hamburger only on mobile */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsProfileOpen(true)}
                    >
                        {/* SVG Hamburger */}
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>

                    </button>

                    {/* Logo for small and medium screens */}
                    <div className='block md:hidden h-12 w-auto'>
                        <img src="/images/c-nicon2.png" alt="Career-nexus icon" className='h-10 w-auto' />
                    </div>
                    <div className='hidden md:block h-16 w-16 md:h-20 md:w-20 object-center item-center '>
                        <div className='hidden md:block bg-cover items-center mt-2' style={{ backgroundImage: "url('/images/cnlogonew.png')", height: "60px", width: "80px" }}>
                        </div>
                    </div>
                    {/* Navigation Links for Medium Screens and Up */}
                    {
                        user.user_type === "learner" ? (
                            <div className='hidden md:flex items-center justify-center lg:space-x-10 md:space-x-4 lg:ml-[14rem] md:ml-[11rem]'>
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
                            <div className='hidden md:flex items-center justify-center lg:space-x-10 md:space-x-4 lg:ml-[14rem] md:ml-[11rem]'>
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
                    <div className="flex items-center border border-gray-300 rounded-lg flex-grow mx-1 lg:mx-4">
                        <div className="flex items-center pl-3">
                            <Search />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for Jobs, Skills, people..."
                            className="flex-grow py-2 px-1 border-0 focus:outline-none focus:ring-0 w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {loading && <LoaderIcon className="animate-spin w-4 h-4 mr-3 text-gray-500" />}
                    </div>
                    {/* Search Results Dropdown */}
                    {searchUser.length > 0 && (
                        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-md w-80 max-h-60 overflow-y-auto z-50">
                            {searchUser.map((u) => (
                                <Link
                                    key={u.id}
                                    to={`/person-profile/${u.id}`}
                                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                                    onClick={() => setSearchQuery("")}
                                >
                                    <img src={u.profile_photo} alt={u.name} className="w-8 h-8 rounded-full" />
                                    <div>
                                        <p className="font-medium">{u.name}</p>
                                        <p className="text-xs text-gray-500">{u.qualification}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                    <Link
                        to='/notifications'
                        className={`${navItemClass} ${isActive('/notifications') ? activeClass : ''}`}
                    >
                        <Notification className={`${isActive('/notifications') ? activebg : ''} mx-auto relative`} />
                        <div className='h-3 w-3 rounded-full bg-red-600 absolute top-4 ml-3 p-1'></div>
                        <span className='absolute font-bold top-[14px] ml-3 text-white' style={{ fontSize: "9px" }}>2</span>
                    </Link>

                    {/* User Name and Dropdown Menu */}
                    <div className=" ml-1 md:ml-0  flex items-center">
                        <div className="relative flex gap-2 items-center">
                            <div>
                                <button>
                                    <span className="sr-only">Open user menu</span>
                                    <Link to={'/profilepage'} className="mx-2 h-8 w-8 md:h-10 md:w-10 flex items-center justify-center text-indigo-800 font-semibold">
                                        <img src={user.profile_photo} alt={user?.name?.charAt(0) || 'U'} className='h-8 w-8 md:h-10 md:w-10 rounded-full bg-cover' />
                                    </Link>
                                </button>
                            </div>

                            <div className="relative" ref={menuRef}>
                                {/* Toggle button */}
                                <button
                                    type="button"
                                    className="bg-white rounded-full flex text-sm"
                                    id="user-menu-button"
                                    aria-expanded={isProfileMenuOpen}
                                    aria-haspopup="true"
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                >
                                    <Ellipsis className="w-6 h-6 cursor-pointer" />
                                </button>

                                {/* Dropdown menu */}
                                {isProfileMenuOpen && (
                                    <div
                                        className="origin-top-right top-8 absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu"
                                        aria-orientation="vertical"
                                        aria-labelledby="user-menu-button"
                                        tabIndex="-1"
                                    >
                                        <Link
                                            to="/help"
                                            className="flex gap-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                        >
                                            <HelpCircle /> Help
                                        </Link>
                                        <Link
                                            to="/profilepage"
                                            className="flex gap-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                            onClick={() => setIsProfileMenuOpen(false)}
                                        >
                                            <UserCircle /> Your Profile
                                        </Link>
                                        <Link
                                            to="/settings"
                                            className="flex gap-4 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            role="menuitem"
                                            onClick={() => setIsProfileMenuOpen(false)}
                                        >
                                            <Settings /> Setting
                                        </Link>
                                        <button
                                            className="flex gap-4 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            role="menuitem"
                                            onClick={handleLogout}
                                        >
                                            <LogOut /> Sign out
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Hamburger Menu for Small Screens */}
                </div>
            </div>
            {/* Sidebar for small screens */}
            <MobileFooterNav />
            <Outlet />

            {/* 🔥 Sidebar Drawer for Profile */}
            {isProfileOpen && (
                <div className="fixed inset-0 z-50 flex">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50"
                        onClick={() => setIsProfileOpen(false)}
                    ></div>

                    {/* Sidebar content */}
                    <div className="relative bg-white w-52 max-w-full h-full shadow-lg p-4 overflow-y-auto">
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4"
                            onClick={() => setIsProfileOpen(false)}
                        >
                            <svg
                                className="w-6 h-6 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Profile Component here */}
                        <div className='mt-8'>
                            <Profile />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default MainNavbar

