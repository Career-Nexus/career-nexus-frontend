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
        navigate("/success")
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
// "use client"

// import { useState, useEffect, useRef } from "react"
// import { useLocation, useNavigate } from "react-router-dom"
// import { LoadingIcon } from "../../icons/icon"
// import { authService } from "../../api/ApiServiceThree"

// const OtpVerification = () => {
//   const { state } = useLocation()
//   const email = state?.email || ""
//   const userData = state?.userData || {} // Get userData from location state
//   const navigate = useNavigate()
//   const [otp, setOtp] = useState(["", "", "", "", "", ""])
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [resendDisabled, setResendDisabled] = useState(true)
//   const [countdown, setCountdown] = useState(300) // 5 minutes in seconds
//   const inputRefs = useRef([])
//   const [isConnected, setIsConnected] = useState(true)

//   // Set up countdown for resend button
//   useEffect(() => {
//     let timer
//     if (resendDisabled && countdown > 0) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000)
//     } else if (countdown === 0) {
//       setResendDisabled(false)
//     }
//     return () => clearTimeout(timer)
//   }, [resendDisabled, countdown])

//   // Check if all OTP fields are filled
//   const isOtpComplete = otp.every((digit) => digit !== "")

//   // Handle input change for OTP fields
//   const handleChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return

//     const newOtp = [...otp]
//     newOtp[index] = value
//     setOtp(newOtp)

//     if (error) setError("")

//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus()
//     }
//   }

//   // Handle key press for backspace
//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus()
//     }
//   }

//   // Handle paste event
//   const handlePaste = (e) => {
//     e.preventDefault()
//     const pastedData = e.clipboardData.getData("text/plain").trim()
//     if (/^\d{6}$/.test(pastedData)) {
//       const digits = pastedData.split("")
//       setOtp(digits)
//       inputRefs.current[5].focus()
//     }
//   }

//   // Handle OTP verification
//   const handleVerify = async () => {
//     const otpValue = otp.join("")
//     if (otpValue.length !== 6) {
//       setError("Please enter all 6 digits of the OTP")
//       return
//     }

//     setLoading(true)
//     try {
//       // Send userData and OTP to backend
//       const response = await authService.verifyOtp({ ...userData, otp: otpValue })
//       console.log("OTP Verification Response:", response)
//       if (response.success || response.status === "verified") {
//         navigate("/success")
//       } else {
//         setError(response.message || "Invalid OTP. Please try again.")
//       }
//     } catch (err) {
//       console.log("OTP Verification Error:", err)
//       setError(err.response?.data?.message || "Invalid OTP. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Handle OTP resend
//   const handleResend = async () => {
//     setLoading(true)
//     try {
//       const response = await authService.resendOtp({ email })
//       console.log("Resend OTP Response:", response)
//       setResendDisabled(true)
//       setCountdown(300)
//       setError("OTP resent successfully")
//       setOtp(["", "", "", "", "", ""])
//     } catch (err) {
//       console.log("Resend OTP Error:", err)
//       setError(err.response?.data?.message || "Failed to resend OTP. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="grid grid-cols-12 min-h-screen">
//       <div className="col-span-12 lg:col-span-7 hidden md:block">
//         <div className="relative h-full w-full overflow-hidden">
//           <div
//             className="absolute inset-0 bg-cover bg-center z-0 aspect-[7.8/6] -mt-16 ml-[-16%]"
//             style={{ backgroundImage: "url('/images/auth-img.png')" }}
//           />
//           <div
//             className="absolute inset-0 z-10"
//             style={{
//               background:
//                 "linear-gradient(to bottom, rgba(102, 102, 102, 0) 0%, rgba(102, 102, 102, 0) 45%, rgba(72, 58, 86, 0.6) 60%, #280B45 85%)",
//             }}
//           />
//           <div className="relative z-20 h-full flex flex-col justify-end pb-8 px-16">
//             <div className="mb-1">
//               <div className="inline-flex items-center bg-opacity-20 bg-gray-800 rounded-lg px-3 py-2 border border-white">
//                 <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} mr-2`}></div>
//                 <span className="text-white text-sm">One connection at a time</span>
//               </div>
//             </div>
//             <h1 className="text-white text-lg md:text-lg lg:text-xl font-bold mb-2 leading-tight">
//               Welcome to your Professional Practical Training Workshop, Career Contents and Global Networking Community!
//             </h1>
//             <p className="text-white md:text-sm opacity-90 max-w-3xl" style={{ fontSize: "0.9rem" }}>
//               Your gateway to skill enhancement and collaborative solutions to workforce applications...
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="col-span-12 lg:col-span-5 flex items-center justify-center py-8">
//         <div className="bg-white rounded-lg p-8 max-w-md w-full">
//           <div className="text-center mb-6">
//             <h3 className="text-xl font-bold text-gray-900">Verification</h3>
//             <p className="text-gray-600 mt-2">
//               Enter the 6-digit OTP sent to: <br />
//               <span className="font-medium text-lime-700">{email}</span>
//             </p>
//           </div>
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}
//           <div className="flex justify-center space-x-2 mb-6">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el) => (inputRefs.current[index] = el)}
//                 type="text"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//                 onPaste={index === 0 ? handlePaste : undefined}
//                 className={`w-12 h-12 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
//                   digit ? "border-green-500" : "border-gray-300"
//                 }`}
//               />
//             ))}
//           </div>
//           <div className="flex flex-col space-y-4">
//             <div className="text-center">
//               <p className="text-sm text-gray-600">
//                 Didn't receive the code?{" "}
//                 <button
//                   onClick={handleResend}
//                   disabled={resendDisabled || loading}
//                   className={`text-indigo-600 hover:text-indigo-500 font-medium ${
//                     resendDisabled || loading ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 >
//                   {resendDisabled
//                     ? `Resend in ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, "0")}`
//                     : "Resend OTP"}
//                 </button>
//               </p>
//             </div>
//             <button
//               onClick={handleVerify}
//               disabled={loading || !isOtpComplete}
//               className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium flex items-center justify-center 
//                 ${loading || !isOtpComplete ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#5b9a68] hover:bg-[#4e8559] text-white"} 
//                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <LoadingIcon className="mr-2" />
//                   Verifying...
//                 </span>
//               ) : (
//                 "Verify OTP"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OtpVerification
// import { useState, useEffect, useRef } from "react"
// import { authService } from "../../api/ApiServiceThree"
// import { LoadingIcon } from "../../icons/icon"

// const OtpVerification = ({ email, userData, onSuccess}) => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""])
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [resendDisabled, setResendDisabled] = useState(true)
//   const [countdown, setCountdown] = useState(300) // 5 minutes in seconds
//   const inputRefs = useRef([])
//   const [isConnected, setIsConnected] = useState(true)

//   // Set up countdown for resend button
//   useEffect(() => {
//     let timer
//     if (resendDisabled && countdown > 0) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000)
//     } else if (countdown === 0) {
//       setResendDisabled(false)
//     }

//     return () => clearTimeout(timer)
//   }, [resendDisabled, countdown])

//   // Check if all OTP fields are filled
//   const isOtpComplete = otp.every(digit => digit !== "")

//   // Handle input change for OTP fields
//   const handleChange = (index, value) => {
//     // Only allow numbers
//     if (!/^\d*$/.test(value)) return

//     // Update OTP array
//     const newOtp = [...otp]
//     newOtp[index] = value
//     setOtp(newOtp)

//     // Clear error when user types
//     if (error) setError("")

//     // Auto-focus next input
//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus()
//     }
//   }

//   // Handle key press for backspace
//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       // Focus previous input on backspace if current input is empty
//       inputRefs.current[index - 1].focus()
//     }
//   }

//   // Handle paste event
//   const handlePaste = (e) => {
//     e.preventDefault()
//     const pastedData = e.clipboardData.getData("text/plain").trim()

//     // Check if pasted content is a 6-digit number
//     if (/^\d{6}$/.test(pastedData)) {
//       const digits = pastedData.split("")
//       setOtp(digits)

//       // Focus last input
//       inputRefs.current[5].focus()
//     }
//   }

//   // Update the handleVerify function to send both user data and OTP
//   const handleVerify = async () => {
//     const otpValue = otp.join("")

//     if (otpValue.length !== 6) {
//       setError("Please enter all 6 digits of the OTP")
//       return
//     }

//     setLoading(true)
//     try {
//       // Send both user data and OTP to the backend
//       await authService.verifyOtp(userData, otpValue)
//       onSuccess()
//       navigate("/success")
//     } catch (err) {
//       setError(err.message || "Invalid OTP. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Update the handleResend function to reset the countdown to 5 minutes
//   const handleResend = async () => {
//     setLoading(true)
//     try {
//       await authService.resendOtp(email)
//       setResendDisabled(true)
//       setCountdown(300) // Reset to 5 minutes
//       setError("")
//       setOtp(["", "", "", "", "", ""])
//     } catch (err) {
//       setError(err.message || "Failed to resend OTP. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="grid grid-cols-12 min-h-screen">
//       {/* Left Column */}
//       <div className="col-span-12 lg:col-span-7 hidden md:block">
//         <div className="relative h-full w-full overflow-hidden">
//           {/* Background Image */}
//           <div
//             className="absolute inset-0 bg-cover bg-center z-0 aspect-[7.8/6] -mt-16 ml-[-16%]"
//             style={{
//               backgroundImage: "url('/images/auth-img.png')",
//             }}
//           />

//           {/* Gradient Overlay */}
//           <div
//             className="absolute inset-0 z-10"
//             style={{
//               background:
//                 "linear-gradient(to bottom, rgba(102, 102, 102, 0) 0%, rgba(102, 102, 102, 0) 45%, rgba(72, 58, 86, 0.6) 60%, #280B45 85%)",
//             }}
//           />

//           {/* Content Container */}
//           <div className="relative z-20 h-full flex flex-col justify-end pb-8 px-16">
//             {/* Connection Status */}
//             <div className="mb-1">
//               <div className="inline-flex items-center bg-opacity-20 bg-gray-800 rounded-lg px-3 py-2 border border-white">
//                 <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} mr-2`}></div>
//                 <span className="text-white text-sm">One connection at a time</span>
//               </div>
//             </div>

//             {/* Main Heading */}
//             <h1 className="text-white text-lg md:text-lg lg:text-xl font-bold mb-2 leading-tight">
//               Welcome to your Professional Practical Training Workshop, Career Contents and Global Networking
//               Community!
//             </h1>

//             {/* Subheading */}
//             <p className="text-white md:text-sm opacity-90 max-w-3xl" style={{ fontSize: "0.9rem" }}>
//               Your gateway to skill enhancement and collaborative solutions to workforce applications...
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right Column - OTP Form */}
//       <div className="col-span-12 lg:col-span-5 flex items-center justify-center py-8">
//         <div className="bg-white rounded-lg p-8 max-w-md w-full">
//           <div className="text-center mb-6">
//             <h3 className="text-xl font-bold text-gray-900">Verification</h3>
//             <p className="text-gray-600 mt-2">
//               Enter the 6-digit OTP sent to: <br />
//               <span className="font-medium text-lime-700">{email}</span>
//             </p>
//           </div>

//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//               <span className="block sm:inline">{error}</span>
//             </div>
//           )}

//           <div className="flex justify-center space-x-2 mb-6">
//             {otp.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el) => (inputRefs.current[index] = el)}
//                 type="text"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(index, e)}
//                 onPaste={index === 0 ? handlePaste : undefined}
//                 className={`w-12 h-12 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${digit ? 'border-green-500' : 'border-gray-300'}`}
//               />
//             ))}
//           </div>

//           <div className="flex flex-col space-y-4">
            
//             <div className="text-center">
//               <p className="text-sm text-gray-600">
//                 Didn't receive the code?{" "}
//                 <button
//                   onClick={handleResend}
//                   disabled={resendDisabled || loading}
//                   className={`text-indigo-600 hover:text-indigo-500 font-medium ${resendDisabled || loading ? "opacity-50 cursor-not-allowed" : ""}`}
//                 >
//                   {resendDisabled
//                     ? `Resend in ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, "0")}`
//                     : "Resend OTP"}
//                 </button>
//               </p>
//             </div>
//             <button
//               onClick={handleVerify}
//               disabled={loading || !isOtpComplete}
//               className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium flex items-center justify-center 
//                 ${loading || isOtpComplete ? 'bg-[#5b9a68] hover:bg-[#4e8559] text-white' : 
//                   'bg-gray-100 text-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <LoadingIcon className="mr-2" />
//                   Verifying...
//                 </span>
//               ) : (
//                 'Verify OTP'
//               )}
//             </button>
           
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default OtpVerification


// // export default OtpVerification
// // import { useState, useEffect, useRef } from "react"
// // import { authService } from "../../api/ApiServiceThree"
// // // import { authService } from "../services/apiServices"

// // const OtpVerification = ({ email, userData, onSuccess, onClose }) => {
// //   const [otp, setOtp] = useState(["", "", "", "", "", ""])
// //   const [error, setError] = useState("")
// //   const [loading, setLoading] = useState(false)
// //   const [resendDisabled, setResendDisabled] = useState(true)
// //   const [countdown, setCountdown] = useState(300) // 5 minutes in seconds
// //   const inputRefs = useRef([])
// //   const [isConnected, setIsConnected] = useState(true)

// //   // Set up countdown for resend button
// //   useEffect(() => {
// //     let timer
// //     if (resendDisabled && countdown > 0) {
// //       timer = setTimeout(() => setCountdown(countdown - 1), 1000)
// //     } else if (countdown === 0) {
// //       setResendDisabled(false)
// //     }

// //     return () => clearTimeout(timer)
// //   }, [resendDisabled, countdown])

// //   // Handle input change for OTP fields
// //   const handleChange = (index, value) => {
// //     // Only allow numbers
// //     if (!/^\d*$/.test(value)) return

// //     // Update OTP array
// //     const newOtp = [...otp]
// //     newOtp[index] = value
// //     setOtp(newOtp)

// //     // Clear error when user types
// //     if (error) setError("")

// //     // Auto-focus next input
// //     if (value && index < 5) {
// //       inputRefs.current[index + 1].focus()
// //     }
// //   }

// //   // Handle key press for backspace
// //   const handleKeyDown = (index, e) => {
// //     if (e.key === "Backspace" && !otp[index] && index > 0) {
// //       // Focus previous input on backspace if current input is empty
// //       inputRefs.current[index - 1].focus()
// //     }
// //   }

// //   // Handle paste event
// //   const handlePaste = (e) => {
// //     e.preventDefault()
// //     const pastedData = e.clipboardData.getData("text/plain").trim()

// //     // Check if pasted content is a 6-digit number
// //     if (/^\d{6}$/.test(pastedData)) {
// //       const digits = pastedData.split("")
// //       setOtp(digits)

// //       // Focus last input
// //       inputRefs.current[5].focus()
// //     }
// //   }

// //   // Update the handleVerify function to send both user data and OTP
// //   const handleVerify = async () => {
// //     const otpValue = otp.join("")

// //     if (otpValue.length !== 6) {
// //       setError("Please enter all 6 digits of the OTP")
// //       return
// //     }

// //     setLoading(true)
// //     try {
// //       // Send both user data and OTP to the backend
// //       await authService.verifyOtp(userData, otpValue)
// //       onSuccess()
// //     } catch (err) {
// //       setError(err.message || "Invalid OTP. Please try again.")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // Update the handleResend function to reset the countdown to 5 minutes
// //   const handleResend = async () => {
// //     setLoading(true)
// //     try {
// //       await authService.resendOtp(email)
// //       setResendDisabled(true)
// //       setCountdown(300) // Reset to 5 minutes
// //       setError("")
// //       setOtp(["", "", "", "", "", ""])
// //     } catch (err) {
// //       setError(err.message || "Failed to resend OTP. Please try again.")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="grid grid-cols-12 pb-0 md:pb-0">
// //       {/* left */}
// //       <div className="col-span-12 lg:col-span-7 hidden md:block">
// //           <div className="relative h-[100%] w-full overflow-hidden">
// //             {/* Background Image */}
// //             <div
// //               className="absolute inset-0 bg-cover bg-center z-0 aspect-[7.8/6] -mt-16 ml-[-16%]"
// //               style={{
// //                 backgroundImage: "url('/images/auth-img.png')",
// //               }}
// //             />

// //             {/* Gradient Overlay */}
// //             <div
// //               className="absolute inset-0 z-10"
// //               style={{
// //                 background:
// //                   "linear-gradient(to bottom, rgba(102, 102, 102, 0) 0%, rgba(102, 102, 102, 0) 45%, rgba(72, 58, 86, 0.6) 60%, #280B45 85%)",
// //               }}
// //             />

// //             {/* Content Container */}
// //             <div className="relative z-20 h-full flex flex-col justify-end pb-8 px-16">
// //               {/* Connection Status */}
// //               <div className="mb-1">
// //                 <div className="inline-flex items-center bg-opacity-20 bg-gray-800 rounded-lg px-3 py-2 border border-white">
// //                   <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} mr-2`}></div>
// //                   <span className="text-white text-sm">One connection at a time</span>
// //                 </div>
// //               </div>

// //               {/* Main Heading */}
// //               <h1 className="text-white text-lg md:text-lg lg:text-xl font-bold mb-2 leading-tight">
// //                 Welcome to your Professional Practical Training Workshop, Career Contents and Global Networking
// //                 Community!
// //               </h1>

// //               {/* Subheading */}
// //               <p className="text-white md:text-sm opacity-90 max-w-3xl" style={{ fontSize: "0.9rem" }}>
// //                 Your gateway to skill enhancement and collaborative solutions to workforce applications...
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       {/* right */}
// //       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
// //         <div className="bg-white rounded-lg p-8 max-w-md w-full">
// //           <div className="text-center mb-6">
// //             <h3 className="text-xl font-bold text-gray-900">Verify Your Email</h3>
// //             <p className="text-gray-600 mt-2">
// //               We've sent a 6-digit verification code to <span className="font-medium">{email}</span>
// //             </p>
// //           </div>

// //           {error && (
// //             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
// //               <span className="block sm:inline">{error}</span>
// //             </div>
// //           )}

// //           <div className="flex justify-center space-x-2 mb-6">
// //             {otp.map((digit, index) => (
// //               <input
// //                 key={index}
// //                 ref={(el) => (inputRefs.current[index] = el)}
// //                 type="text"
// //                 maxLength={1}
// //                 value={digit}
// //                 onChange={(e) => handleChange(index, e.target.value)}
// //                 onKeyDown={(e) => handleKeyDown(index, e)}
// //                 onPaste={index === 0 ? handlePaste : undefined}
// //                 className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
// //               />
// //             ))}
// //           </div>

// //           <div className="flex flex-col space-y-4">
// //             <button
// //               onClick={handleVerify}
// //               disabled={loading}
// //               className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#5b9a68] hover:bg-[#4e8559] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? "opacity-70 cursor-not-allowed" : ""
// //                 }`}
// //             >
// //               {loading ? "Verifying..." : "Verify OTP"}
// //             </button>

// //             <div className="text-center">
// //               <p className="text-sm text-gray-600">
// //                 Didn't receive the code?{" "}
// //                 <button
// //                   onClick={handleResend}
// //                   disabled={resendDisabled || loading}
// //                   className={`text-indigo-600 hover:text-indigo-500 font-medium ${resendDisabled || loading ? "opacity-50 cursor-not-allowed" : ""
// //                     }`}
// //                 >
// //                   {resendDisabled
// //                     ? `Resend in ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, "0")}`
// //                     : "Resend OTP"}
// //                 </button>
// //               </p>
// //             </div>

// //             <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700 text-center">
// //               Cancel
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default OtpVerification
