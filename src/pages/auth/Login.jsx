"use client"

import { useEffect, useState } from "react"
import { Google, Linkedin, LoadingIcon } from "../../icons/icon"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock } from "lucide-react"
import { authService } from "../../api/ApiServiceThree"
import { checkCookiePermissions, debugCookies } from "../../utils/CookieUtils"

export default function Login() {
  const [isConnected, setIsConnected] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [cookiesEnabled, setCookiesEnabled] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // Check if cookies are enabled on component mount
  useEffect(() => {
    const cookiePermissions = checkCookiePermissions()
    setCookiesEnabled(cookiePermissions)

    if (!cookiePermissions) {
      setErrors({
        general: "Cookies are disabled in your browser. Please enable cookies to use this application.",
      })
    }

    // Debug existing cookies
    debugCookies()

    // Check for saved email in localStorage if remember me was previously used
    const savedEmail = localStorage.getItem("rememberedEmail")
    if (savedEmail) {
      setFormData((prev) => ({ ...prev, email: savedEmail, rememberMe: true }))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleCheckboxChange = (e) => {
    const { checked } = e.target
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    if (!cookiesEnabled) {
      setErrors({
        general: "Cookies are disabled in your browser. Please enable cookies to use this application.",
      })
      return
    }

    setLoading(true)
    try {
      const response = await authService.login({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe, // Send remember me preference to backend
      })

      // Handle remember me functionality
      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email)
      } else {
        localStorage.removeItem("rememberedEmail")
      }

      setIsConnected(true)
      console.log("Login successful:", response)

      // Debug cookies after login
      const cookies = debugCookies()
      if (response.access) {
        navigate("/home")
      }
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors)
      } else {
        setErrors({ general: error.message || "Invalid email or password" })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="md:h-[87vh] overflow-hidden">
      <div className="grid grid-cols-12 pb-8 md:pb-0">
        {/* left */}
        <div className="col-span-12 lg:col-span-7 hidden md:block">
          <div className="relative h-[85%] w-full overflow-hidden">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center z-0 aspect-[7.8/6] -mt-16 ml-[-16%]"
              style={{
                backgroundImage: "url('/images/auth-img.png')",
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
                Welcome to your Professional Practical Training Workshop, Career Contents and Global Networking
                Community!
              </h1>

              {/* Subheading */}
              <p className="text-white text-xs md:text-sm opacity-90 max-w-3xl" style={{ fontSize: "0.9rem" }}>
                Your gateway to skill enhancement and collaborative solutions to workforce applications...
              </p>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="col-span-12 lg:col-span-5 md:p-4 p-0  mb-0">
          <div className="flex flex-col items-center justify-center min-h-screen bg-white px-12">
            <div className="w-full max-w-md">
              <h1 className="md:text-2xl font-bold text-center mb-8 text-[#3a1c64] mt-0 md:-mt-28">Welcome Back</h1>

              {errors.general && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                  <span className="block sm:inline">{errors.general}</span>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Password Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-md bg-white"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line x1="2" x2="22" y1="2" y2="22"></line>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    )}
                  </button>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>

                <div className="flex gap-2 items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleCheckboxChange}
                    className="rounded border border-green-300"
                  />
                  <label htmlFor="rememberMe" className="text-sm font-thin">
                    Remember me
                  </label>
                  <Link to={"/forgot-password"} className="ml-auto text-sm font-thin text-[#5b9a68]">
                    Forgot Password
                  </Link>
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#5b9a68] hover:bg-[#4e8559] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <LoadingIcon />
                        Signing in...
                      </span>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>

                {/* Or continue with */}
                <div className="flex items-center justify-center mt-6 mb-4">
                  <span className="text-sm text-gray-500">Or continue with</span>
                </div>

                {/* Social Login Options */}
                <div className="md:flex gap-2">
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
                  <Link to={"/signup"} className="text-[#5b9a68] ml-1 hover:underline">
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