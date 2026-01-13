

import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react' // hamburger & close icons
import Footer from './Footer'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  return (
    <>
    <nav className="sticky top-0 w-full bg-white shadow-md border-b border-gray-200 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/images/cnlogonew.png"
            alt="nexus logo"
            className="h-14 w-auto"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center">
          <a href='/landing/home' className={`transition ${location.pathname === '/landing/home' || location.pathname === '/landing' ? 'text-[#5DA05D] font-semibold' : 'text-gray-700 hover:text-[#5DA05D]'}`}>Home</a>
          <a href='/landing/about' className={`transition ${location.pathname === '/landing/about' ? 'text-[#5DA05D] font-semibold' : 'text-gray-700 hover:text-[#5DA05D]'}`}>About</a>
          <a href='/landing/consult' className={`transition ${location.pathname === '/landing/consult' ? 'text-[#5DA05D] font-semibold' : 'text-gray-700 hover:text-[#5DA05D]'}`}>Consult</a>
          {/* <a href='/landing/pricing' className={`transition ${location.pathname === '/landing/pricing' ? 'text-[#5DA05D] font-semibold' : 'text-gray-700 hover:text-[#5DA05D]'}`}>Pricing</a> */}
          
        </div>
        <Link to="/signup" className="hidden md:flex bg-[#5DA05D] px-3 py-2 rounded-lg text-white hover:bg-green-700 transition">
            Sign Up
        </Link>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden shadow-md flex flex-col items-center gap-4 py-4 bg-gray-50">
          <a href='/landing/home'><div onClick={() => setIsOpen(false)} className={`border-b border-gray-300 w-full text-center py-2 transition ${location.pathname === '/landing/home' || location.pathname === '/landing' ? 'text-[#5DA05D] font-semibold' : 'text-gray-700 hover:text-[#5DA05D]'}`}>Home</div></a>
          <a href='/landing/about'><div onClick={() => setIsOpen(false)} className={`border-b border-gray-300 w-full text-center py-2 transition ${location.pathname === '/landing/about' ? 'text-[#5DA05D] font-semibold' : 'text-gray-700 hover:text-[#5DA05D]'}`}>About</div></a>
          <a href='/landing/consult'><div onClick={() => setIsOpen(false)} className={`border-b border-gray-300 w-full text-center py-2 transition ${location.pathname === '/landing/consult' ? 'text-[#5DA05D] font-semibold' : 'text-gray-700 hover:text-[#5DA05D]'}`}>Consult</div></a>
          {/* <a href='/landing/pricing'><div onClick={() => setIsOpen(false)} className={`border-b border-gray-300 w-full text-center py-2 transition ${location.pathname === '/landing/pricing' ? 'text-[#5DA05D] font-semibold' : 'text-gray-700 hover:text-[#5DA05D]'}`}>Pricing</div></a> */}
          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="bg-[#5DA05D] px-3 py-2 rounded-lg text-white"
          >
            Sign Up
          </Link>
        </div>
      )}
    </nav>
    <Outlet />
    <Footer />
    </>
  )
}
