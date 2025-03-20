import React, { useState } from 'react'
import { Select, TextInput } from "flowbite-react";
import { Email, Google, Linkedin, Password } from '../../icons/icon';
import { Link } from 'react-router-dom';
import { ChevronDown, Mail, Lock,User } from "lucide-react"

export default function Signup() {
    const [isConnected, setIsConnected] = useState(true)
    // const [accountType, setAccountType] = useState("Employer")
    return (
        <div className='h-screen'>
            <div className='grid grid-cols-12 pb-8'>
                {/* left*/}
                <div className='col-span-12 lg:col-span-7'>
                    <div className="relative h-screen w-full overflow-hidden">
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center z-0"
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
                        <div className="relative z-20 h-full flex flex-col justify-end pb-16 px-8">
                            {/* Connection Status */}
                            <div className="mb-2">
                                <div className="inline-flex items-center bg-opacity-20 bg-gray-800 rounded-lg px-3 py-2 border border-white">
                                    <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} mr-2`}></div>
                                    <span className="text-white text-sm">One connection at a time</span>
                                </div>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-white text-lg md:text-xl lg:text-2xl font-bold mb-4 leading-tight">
                                Welcome to your Professional Practical Training Workshop, Career Contents and Global Networking Community!
                            </h1>

                            {/* Subheading */}
                            <p className="text-white text-sm md:text-lg opacity-90 max-w-3xl">
                                Your gateway to skill enhancement and collaborative solutions to workforce applications...
                            </p>
                        </div>
                    </div>
                </div>
                {/* right */}
                <div className='col-span-12 lg:col-span-5 md:px-4 p-0'>
                    {/* <CreateAccountForm/> */}
                    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-12">
                        <div className="w-full max-w-md">
                            <h1 className="text-2xl font-bold text-center mb-8 text-[#3a1c64]">Create Account</h1>

                            <div className="space-y-4">
                                {/* Account Type Dropdown */}
                                {/* <div className="relative">
                                    <button className="w-full flex items-center justify-between border border-gray-200 rounded-md px-4 py-2 bg-white text-gray-700">
                                        <span>{accountType}</span>
                                        <ChevronDown className="h-5 w-5 text-gray-400" />
                                    </button>
                                </div> */}
                                <div className="max-w-md">
                                    <Select id="countries" required className='border border-green-300 rounded-lg'>
                                        <option>Select your type</option>
                                        <option>Learner</option>
                                        <option>Employer</option>
                                        <option>Mentor</option>
                                    </Select>
                                </div>

                                {/* Full Name Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white"
                                    />
                                </div>

                                <div className='flex gap-2'>
                                    {/* Password Input */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white"
                                        />
                                    </div>

                                    {/* Confirm Password Input */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white"
                                        />
                                    </div>
                                </div>

                                {/* Sign Up Button */}
                                <button className="w-full bg-[#5b9a68] hover:bg-[#4e8559] text-white font-medium py-2 px-4 rounded-md transition-colors">
                                    Sign up
                                </button>

                                {/* Or continue with */}
                                <div className="flex items-center justify-center mt-6 mb-4">
                                    <span className="text-sm text-gray-500">Or continue with</span>
                                </div>

                                {/* Social Login Options */}
                                <div className='flex gap-2'>
                                    <button className="w-full flex items-center justify-center border border-gray-200 rounded-md py-2 px-4 mb-3 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                                                    <path
                                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                        fill="#4285F4"
                                                    />
                                                    <path
                                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                        fill="#34A853"
                                                    />
                                                    <path
                                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                                        fill="#FBBC05"
                                                    />
                                                    <path
                                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                        fill="#EA4335"
                                                    />
                                                </g>
                                            </svg>
                                            <span className="ml-2">Google</span>
                                        </div>
                                    </button>

                                    <button className="w-full h-10 flex items-center justify-center border border-gray-200 rounded-lg px-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#0077B5">
                                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                                            </svg>
                                            <span className="ml-2">LinkedIn</span>
                                        </div>
                                    </button>
                                </div>
                            </div>

                            {/* Login Link */}
                            <div className="text-center mt-6">
                                <p className="text-sm text-gray-500">
                                    Already have an account?
                                    <Link to={'/login'} className="text-[#5b9a68] ml-1 hover:underline">
                                        Log in
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            {/* <button className='w-full bg-gray-50 dark:bg-gray-700 py-2 rounded-lg border'>hi</button> */}
        </div>
    )
}
