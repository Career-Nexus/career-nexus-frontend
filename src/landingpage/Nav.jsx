

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react' // hamburger & close icons

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200">
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
          <Link to="/" className="hover:text-[#5DA05D] transition">Home</Link>
          <Link to="/about" className="hover:text-[#5DA05D] transition">About</Link>
          <Link to="/consult" className="hover:text-[#5DA05D] transition">Consult</Link>
          <Link to="/pricing" className="hover:text-[#5DA05D] transition">Pricing</Link>
          <Link to="/signup" className="bg-[#5DA05D] px-3 py-2 rounded-lg text-white hover:bg-green-700 transition">
            Sign Up
          </Link>
        </div>

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
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-[#5DA05D] border-b border-gray-300 w-full text-center py-2">Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-[#5DA05D] border-b border-gray-300 w-full text-center py-2">About</Link>
          <Link to="/consult" onClick={() => setIsOpen(false)} className="hover:text-[#5DA05D] border-b border-gray-300 w-full text-center py-2">Consult</Link>
          <Link to="/pricing" onClick={() => setIsOpen(false)} className="hover:text-[#5DA05D] border-b border-gray-300 w-full text-center py-2">Pricing</Link>
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
  )
}
