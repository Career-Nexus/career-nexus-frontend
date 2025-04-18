
import { useState, useEffect, useRef } from "react"
import { authService } from "../../api/ApiServiceThree"
// import { authService } from "../services/apiServices"

const OtpVerification = ({ email, userData, onSuccess, onClose }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendDisabled, setResendDisabled] = useState(true)
  const [countdown, setCountdown] = useState(300) // 5 minutes in seconds
  const inputRefs = useRef([])

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

  // Handle input change for OTP fields
  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    // Update OTP array
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Clear error when user types
    if (error) setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  // Handle key press for backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace if current input is empty
      inputRefs.current[index - 1].focus()
    }
  }

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a 6-digit number
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setOtp(digits)

      // Focus last input
      inputRefs.current[5].focus()
    }
  }

  // Update the handleVerify function to send both user data and OTP
  const handleVerify = async () => {
    const otpValue = otp.join("")

    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits of the OTP")
      return
    }

    setLoading(true)
    try {
      // Send both user data and OTP to the backend
      await authService.verifyOtp(userData, otpValue)
      onSuccess()
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Update the handleResend function to reset the countdown to 5 minutes
  const handleResend = async () => {
    setLoading(true)
    try {
      await authService.resendOtp(email)
      setResendDisabled(true)
      setCountdown(300) // Reset to 5 minutes
      setError("")
      setOtp(["", "", "", "", "", ""])
    } catch (err) {
      setError(err.message || "Failed to resend OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Verify Your Email</h3>
          <p className="text-gray-600 mt-2">
            We've sent a 6-digit verification code to <span className="font-medium">{email}</span>
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
              className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          ))}
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleVerify}
            disabled={loading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5b9a68] hover:bg-[#4e8559] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

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

          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700 text-center">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default OtpVerification
