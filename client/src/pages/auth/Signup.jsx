import React, { useState } from 'react'
import { Select, TextInput } from "flowbite-react";
import { Email, Google, Linkedin, Password } from '../../icons/icon';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Mail, Lock, User, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from '@chakra-ui/react';
import { authService } from '../../api/ApiService';
import OtpModalDemo from './OtpModal';
import { registerUser } from '../../api/ApiServiceTwo';

export default function Signup() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState("")
    const [isConnected, setIsConnected] = useState(true)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

  
    const handleSubmit = async (e) => {
        e.preventDefault()
        setApiError("")

        if (!validateForm()) return

        setIsLoading(true)
        try {
            //await authService.signup(formData.name, formData.email, formData.password)
           await registerUser(formData.name, formData.email, formData.password, formData.confirmPassword)
            console.log("Signup successful")
            setIsConnected(true) // Set connection status to online after successful signup
            navigate("/login") // Redirect to home dashboard after successful signup
        } catch (error) {
            console.error("Signup error:", error)
            setApiError(error.response?.data?.message || "An error occurred during signup. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }
    {/* Signup Form */ }
    return (
        <div className='md:h-[87vh] overflow-hidden'>
            <div className='grid grid-cols-12 pb-0 md:pb-0'>
                {/* left*/}
                <div className='col-span-12 lg:col-span-7 hidden md:block'>
                    <div className="relative h-[87%] w-full overflow-hidden">
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
                        <div className="relative z-20 h-full flex flex-col justify-end pb-8 px-16">
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
                            <p className="text-white md:text-sm opacity-90 max-w-3xl" style={{ fontSize: '0.9rem' }}>
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
                                {apiError && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription className='text-red-500'>{apiError}</AlertDescription>
                                    </Alert>
                                )}

                                {/* Full Name Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        id="name" name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white"
                                    />
                                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                                </div>

                                {/* Email Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white"
                                    />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
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
                                            id="password" name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white"
                                        />
                                        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                                    </div>

                                    {/* Confirm Password Input */}
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white"
                                        />
                                        {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                                    </div>
                                </div>

                                {/* Sign Up Button */}
                                <button type='submit' disabled={isLoading} className="w-full bg-[#5b9a68] hover:bg-[#4e8559] text-white font-medium py-2 px-4 rounded-md transition-colors">
                                    {/* Sign up */}
                                    {isLoading ? "Signing up..." : "Sign up"}
                                   
                                </button>
                                <OtpModalDemo/>

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
                            <div className="text-center mt-2">
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
