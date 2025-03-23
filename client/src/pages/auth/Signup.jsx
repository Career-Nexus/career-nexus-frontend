import React, { useState } from 'react'
import { Select, TextInput } from "flowbite-react";
import { Email, Google, Linkedin, Password } from '../../icons/icon';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Mail, Lock, User } from "lucide-react"

export default function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
    const [isConnected, setIsConnected] = useState(true)
    // const [accountType, setAccountType] = useState("Employer")
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Signup attempt with:", { name, email, password })
    
        // For testing, navigate to login page
        navigate("/login")
      }

    return (
        <div className=''>
            <div className='grid grid-cols-12 pb-8 md:pb-0'>
                {/* left*/}
                <div className='col-span-12 lg:col-span-7 hidden md:block'>
                    <div className="relative h-[85%] w-full overflow-hidden">
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
                        <div className="relative z-20 h-full flex flex-col justify-end pb-10 px-8">
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
                            <p className="text-white md:text-lg opacity-90 max-w-3xl" style={{ fontSize: '0.9rem' }}>
                                Your gateway to skill enhancement and collaborative solutions to workforce applications...
                            </p>
                        </div>
                    </div>
                </div>
                {/* right */}
                <div className='col-span-12 lg:col-span-5 md:px-4 p-0 '>
                    {/* <CreateAccountForm/> */}
                    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-12">
                        <div className="w-full max-w-md ">
                            <h1 className="md:text-2xl font-bold text-center mt-0 md:-mt-16 md:mb-8 text-[#3a1c64]">Create Account</h1>

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {/* Account Type Dropdown */}
                                {/* <div className="relative">
                                    <button className="w-full flex items-center justify-between border border-gray-200 rounded-md px-4 py-2 bg-white text-gray-700">
                                        <span>{accountType}</span>
                                        <ChevronDown className="h-5 w-5 text-gray-400" />
                                    </button>
                                </div> */}
                                {/* <div className="max-w-md">
                                    <Select id="countries" required className='border border-green-300 rounded-lg'>
                                        <option>Select your type</option>
                                        <option>Learner</option>
                                        <option>Employer</option>
                                        <option>Mentor</option>
                                    </Select>
                                </div> */}

                                {/* Full Name Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white"
                                    />
                                </div>

                                <div className='md:flex gap-2'>
                                    {/* Password Input */}
                                    <div className="relative mb-3 md:mb-0">
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

                                    {/* Confirm Password Input */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white"
                                        />
                                    </div>
                                </div>

                                {/* Sign Up Button */}
                                <button type='submit' className="w-full bg-[#5b9a68] hover:bg-[#4e8559] text-white font-medium py-2 px-4 rounded-md transition-colors">
                                    Sign up
                                </button>

                                {/* Or continue with */}
                                <div className="flex items-center justify-center mt-6 mb-4">
                                    <span className="text-sm text-gray-500">Or continue with</span>
                                </div>

                                {/* Social Login Options */}
                                <div className='md:flex gap-2'>
                                    <button className="w-full flex items-center justify-center border border-gray-200 rounded-md py-2 px-4 mb-3 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <Google className="h-6 w-6" />
                                            <span className="ml-2">Google</span>
                                        </div>
                                    </button>

                                    <button className="w-full h-10 flex items-center justify-center border border-gray-200 rounded-lg px-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center">
                                            <Linkedin className="h-6 w-6" />
                                            <span className="ml-2">LinkedIn</span>
                                        </div>
                                    </button>
                                </div>
                            </form>

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
