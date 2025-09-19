"use client"

import { useState, useEffect, useRef } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { authService } from "../../api/ApiServiceThree"
import { LoadingIcon } from "../../icons/icon"
import HeroSection from "../../components/Auth/HeroSection"

const OtpVerification = () => {
  const { state } = useLocation()
  const email = state?.email || ""
  const userData = state?.userData || {} // { email, password1, password2 }
  const navigate = useNavigate()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(true)
  const [countdown, setCountdown] = useState(120) // 5 minutes in seconds
  const inputRefs = useRef([])
  const [isConnected, setIsConnected] = useState(true)

  // Set up countdown for resend button
  useEffect(() => {
    let timer
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (countdown === 0) {
      setResendDisabled(false)
    }
    return () => clearTimeout(timer)
  }, [resendDisabled, countdown])

  // Check if all OTP fields are filled
  const isOtpComplete = otp.every((digit) => digit !== "")

  // Handle input change for OTP fields
  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (error) setError("")

    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  // Handle key press for backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setOtp(digits)
      inputRefs.current[5].focus()
    }
  }

  // Handle OTP verification
  const handleVerify = async () => {
    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits of the OTP")
      return
    }

    setLoading(true)
    try {
      const payload = { ...userData, otp: otpValue }
      console.log("Sending OTP Verification Payload:", payload)
      const response = await authService.verifyOtp(payload)
      console.log("OTP Verification Response:", response)
      if (response.access || response.status === "verified") {
        authService.isAuthenticated(true);
        navigate("/success")
        // navigate("/profile-setup")
      } else if (response.status === "Otp sent") {
        setError("A new OTP was sent. Please check your email and try again.")
        setOtp(["", "", "", "", "", ""])
        setResendDisabled(true)
        setCountdown(120)
      } else {
        setError(response.message || "Invalid OTP. Please try again.")
      }
    } catch (err) {
      console.log("OTP Verification Error:", err)
      setError(err.message || "Invalid OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  // Handle OTP resend
  const handleResend = async () => {
    setLoading(true)
    try {
      const response = await authService.resendOtp(userData) // Pass full userData
      console.log("Resend OTP Response:", response)
      if (response.status === "Otp sent") {
        setError("OTP resent successfully. Check your email.")
        setResendDisabled(true)
        setCountdown(120)
        setOtp(["", "", "", "", "", ""])
      } else {
        setError(response.message || "Failed to resend OTP. Please try again.")
      }
    } catch (err) {
      console.log("Resend OTP Error:", err)
      setError(
        err.password1?.[0] || err.password2?.[0] || err.message || "Failed to resend OTP. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="col-span-12 lg:col-span-7 hidden md:block ml-5">
        <HeroSection />
      </div>
      <div className="col-span-12 lg:col-span-5 flex items-center justify-center py-8">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Verification</h3>
            <p className="text-gray-600 mt-2">
              Enter the 6-digit OTP sent to: <br />
              <span className="font-medium text-lime-700">{email}</span>
            </p>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="flex justify-center space-x-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-12 h-12 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                  digit ? "border-green-500" : "border-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="flex flex-col space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{" "}
                <button
                  onClick={handleResend}
                  disabled={resendDisabled || loading}
                  className={`text-indigo-600 hover:text-indigo-500 font-medium ${
                    resendDisabled || loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {resendDisabled
                    ? `Resend in ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, "0")}`
                    : "Resend OTP"}
                </button>
              </p>
            </div>
            <button
              onClick={handleVerify}
              disabled={loading || !isOtpComplete}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium flex items-center justify-center 
                ${loading ?
                  "bg-[#5B8F4E] text-white" 
                  :!isOtpComplete ? 
                  "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : "bg-[#5b9a68] hover:bg-[#4e8559] text-white"} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              {loading ? (
                <span className="flex items-center">
                  <LoadingIcon className="mr-2" />
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OtpVerification
