import React, { useState } from 'react'
import { Select, TextInput } from "flowbite-react";
import { Email, Google, Linkedin, Password } from '../../icons/icon';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, User, Mail, Lock } from "lucide-react"

export default function Login() {
  const [isConnected, setIsConnected] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt with:", { email, password })

    // For testing, just navigate to home page
    navigate("/home")
  }

  return (
    <div className='md:h-[87vh] overflow-hidden'>
      <div className='grid grid-cols-12 pb-8 md:pb-0'>
        {/* left */}
        <div className='col-span-12 lg:col-span-7 hidden md:block'>
          <div className="relative h-[85%] w-full overflow-hidden">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center z-0 aspect-[7.8/6] -mt-16 ml-[-16%]"
              style={{
                backgroundImage:
                  "url('/images/auth-img.png')",
              }}
            />

            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 z-10"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(102, 102, 102, 0) 0%, rgba(102, 102, 102, 0) 45%, rgba(72, 58, 86, 0.6) 60%, #280B45 85%)",
              }}
            />

            {/* Content Container */}
            <div className="relative z-20 h-full flex flex-col justify-end pb-12 px-16">
              {/* Connection Status */}
              <div className="mb-1">
                <div className="inline-flex items-center bg-opacity-20 bg-gray-800 rounded-lg px-3 py-2 border border-white">
                  <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} mr-2`}></div>
                  <span className="text-white text-sm">One connection at a time</span>
                </div>
              </div>

              {/* Main Heading */}
              <h1 className="text-white text-lg md:text-lg lg:text-xl font-bold mb-2 leading-tight">
                Welcome to your Professional Practical Training Workshop, Career Contents and Global Networking Community!
              </h1>

              {/* Subheading */}
              <p className="text-white text-xs md:text-sm opacity-90 max-w-3xl" style={{fontSize: '0.9rem'}}>
                Your gateway to skill enhancement and collaborative solutions to workforce applications...
              </p>
            </div>
          </div>
        </div>
        {/* right */}
        <div className='col-span-12 lg:col-span-5 md:p-4 p-0  mb-0'>
          <div className="flex flex-col items-center justify-center min-h-screen bg-white px-12">
            <div className="w-full max-w-md">
              <h1 className="md:text-2xl font-bold text-center mb-8 text-[#3a1c64] mt-0 md:-mt-28">Welcome Back</h1>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white"
                  />
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white"
                  />
                </div>

                <div className='flex gap-2 items-center'>
                  <input type="checkbox" className='rounded border border-green-300' />
                  <label className='text-sm font-thin'> Remember me</label>
                  <Link to={'#'} className='ml-auto text-sm font-thin text-[#5b9a68]'> Forgot Password</Link>
                </div>
                {/* Sign Up Button */}
                <button type='submit' className="w-full bg-[#5b9a68] hover:bg-[#4e8559] text-white font-medium py-2 px-4 rounded-md transition-colors">
                  Login
                </button>

                {/* Or continue with */}
                <div className="flex items-center justify-center mt-6 mb-4">
                  <span className="text-sm text-gray-500">Or continue with</span>
                </div>

                {/* Social Login Options */}
                <div className='md:flex gap-2'>
                  <button className="w-full flex items-center justify-center border border-gray-200 rounded-md py-2 px-4 mb-3 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <Google className="h-5 w-5" />
                      <span className="ml-2">Google</span>
                    </div>
                  </button>

                  <button className="w-full h-10 flex items-center justify-center border border-gray-200 rounded-lg px-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <Linkedin className="h-5 w-5" />
                      <span className="ml-2">LinkedIn</span>
                    </div>
                  </button>
                </div>
              </form>

              {/* Login Link */}
              <div className="text-center mt-2">
                <p className="text-sm text-gray-500">
                  Don't have an account?
                  <Link to={"/"} className="text-[#5b9a68] ml-1 hover:underline">
                    Signup
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
