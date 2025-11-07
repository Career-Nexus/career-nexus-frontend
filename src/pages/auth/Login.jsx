"use client"
import { useEffect, useState } from "react"
import { Google, Linkedin, LoadingIcon } from "../../icons/icon"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock } from "lucide-react"
import api, { authService } from "../../api/ApiServiceThree"
import { checkCookiePermissions, debugCookies } from "../../utils/CookieUtils"
import HeroSection from "../../components/Auth/HeroSection"
import { EyeClose, EyeOpen } from "../../icons"
import {toast} from 'react-toastify'

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
  const [googleLoading, setGoogleLoading] = useState(false)
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
      validateEmail(savedEmail)
    }
  }, [])

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) {
      return "Email is required"
    } else if (!emailRegex.test(email)) {
      return "Email is invalid"
    }
    return ""
  }

  // Password validation function
  const validatePassword = (password) => {
    if (!password) {
      return "Password is required"
    } else if (password.length < 8) {
      return "Password must be at least 8 characters"
    } else if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      return "Password must include at least one uppercase letter and one number"
    }
    return ""
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }))
    } else if (name === "password") {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }))
    }

    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }))
    }
  }

  const handleCheckboxChange = (e) => {
    const { checked } = e.target
    setFormData((prev) => ({ ...prev, rememberMe: checked }))
  }

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    }
    setErrors(newErrors)
    return !newErrors.email && !newErrors.password
  }

  // Normal login submit
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
        rememberMe: formData.rememberMe,
      })

      if (formData.rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email)
      } else {
        localStorage.removeItem("rememberedEmail")
      }

      setIsConnected(true)
      console.log("Login successful:", response)
      debugCookies()

      if (response.access) {
        navigate("/home")
      }
    } catch (error) {
      setErrors({ general: error.message || "Invalid email or password" })
    } finally {
      setLoading(false)
    }
  }

  // Google Signin flow
  const handleGoogleSignin = () => {
    const googleClientId = "186321207697-u97pq79ijbig0b4095eabijjjej9hm22.apps.googleusercontent.com"
    // const redirectUri = "http://127.0.0.1:5173/login/"
    // const redirectUri = "https://master.dnoqikexgmm2j.amplifyapp.com/login/"
    const redirectUri = "https://www.career-nexus.com/login/"
    const scope = "openid email profile"
    const responseType = "code"
    const accessType = "offline"
    const prompt = "consent"
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=${responseType}&scope=${encodeURIComponent(
      scope
    )}&access_type=${accessType}&prompt=${prompt}`

    window.location.href = googleAuthUrl
  }


useEffect(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get("code")

  if (code) {
    setGoogleLoading(true)

    const handleGoogleAuth = async () => {
      try {
        const response = await authService.googleSignin(code)
        if (response.access) {
          authService.isAuthenticated(true)
          navigate("/home", { replace: true })
          toast.success("Google sign-in is successful")
        } else {
          setErrors({ general: "Google sign-in failed. No token received." })
        }
      } catch (err) {
        console.error("Google Signin Error:", err)
        setErrors({ general: "Google sign-in failed. Please try again." })
      } finally {
        setGoogleLoading(false)
      }
    }

    handleGoogleAuth()
  }
}, [navigate])
  // Render
  if (googleLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Signing you in with Google...</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-12 pb-8 md:pb-0 md:max-h-[70vh] min-h-screen">
      <div className="col-span-12 lg:col-span-7 hidden md:block ml-5">
        <HeroSection />
      </div>
      <div className="col-span-12 lg:col-span-5 md:px-8 p-0 mb-0 md:max-h-[70vh]">
        
        <div className="flex flex-col items-center justify-center min-h-screen bg-white px-12">
          
          <div className="w-full max-w-md mb-8">
            <h1 className="md:text-2xl font-bold text-center text-[#3a1c64] mt-0 mb-5" style={{ marginTop: "-2rem" }}>
              Welcome Back
            </h1>

            {errors.general && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-3 left-0 pl-3 pointer-events-none">
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
                  className={`w-full pl-10 pr-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#5b9a68] focus:border-[#5b9a68] ${
                    errors.email ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-3 left-0 pl-3 pointer-events-none">
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
                  className={`w-full pl-10 pr-10 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#5b9a68] focus:border-[#5b9a68] ${
                    errors.password ? "border-red-500" : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  className="inset-y-0 right-0 pr-3 flex items-center ml-auto mt-[-2rem]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <img src={EyeOpen} className="h-5 w-5 text-gray-400" alt="Show password" />
                  ) : (
                    <img src={EyeClose} className="h-5 w-5 text-gray-400" alt="Hide password" />
                  )}
                </button>
                {errors.password && <p className="text-red-500 text-xs mt-4">{errors.password}</p>}
              </div>

              <div className="flex gap-2 items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleCheckboxChange}
                  className="rounded border text-[#5DA05D] border-[#5b9a68] focus:accent-[#5b9a68] focus:ring-[#5b9a68] h-4 w-4 accent-[#5b9a68]"
                />
                <label htmlFor="rememberMe" className="text-sm font-thin">
                  Remember me
                </label>
                <Link to={"/send-email"} className="ml-auto text-sm font-thin text-[#5b9a68]">
                  Forgot Password
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading || errors.email || errors.password || !formData.email.trim() || !formData.password.trim()}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
                    ${
                      loading
                        ? "bg-[#5b9a68] text-white"
                        : errors.email || errors.password || !formData.email.trim() || !formData.password.trim()
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-[#5b9a68] hover:bg-[#4e8559] text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5b9a68]"
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
            </form>

            {/* Or continue with */}
            <div className="flex items-center justify-center mt-6 mb-4">
              <span className="text-sm text-gray-500">Signin with</span>
            </div>

            {/* Social Login Options */}
            <div className="md:flex md:flex-col gap-2">
              <button
                onClick={handleGoogleSignin}
                className="w-full flex items-center justify-center border border-gray-200 rounded-md py-2 px-4 mb-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <Google className="h-5 w-5" />
                  <span className="ml-2">Google</span>
                </div>
              </button>

              {/*<button className="w-full h-10 flex items-center justify-center border border-gray-200 rounded-lg px-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <Linkedin className="h-5 w-5" />
                  <span className="ml-2">LinkedIn</span>
                </div>
              </button>*/}
            </div>

            {/* Signup Link */}
            <div className="text-center mt-2">
              <p className="text-sm text-gray-500">
                Don't have an account?
                <Link to={"/signup"} className="text-[#5b9a68] ml-1 hover:underline">
                  Signup
                </Link>
              </p>
            </div>
          </div>

          <Link to="/landing" className=" bg-[#E6FFEB] py-2 px-3 rounded-lg mt-10 w-full text-center font-bold text-[#0A0B0A]">
            Book a Consultation
          </Link>
        </div>
      </div>
    </div>
  )
}
