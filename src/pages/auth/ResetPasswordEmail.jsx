
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import HeroSection from '../../components/Auth/HeroSection';
import { Mail } from 'lucide-react';
import { authService } from '../../api/ApiServiceThree';
import ResetPasswordOtp from './ResetPasswordOtp';

const ResetPasswordEmail = () => {
    const [isConnected, setIsConnected] = useState(true)
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      setError("Please enter your email address")
      return
    }

    setLoading(true)
    try {
      const response = await authService.requestResetOtp({ email })
      console.log("Request OTP Response:", response)
      if (response.status === "Reset Password OTP sent.") {
        setSubmitted(true);
        navigate("/reset-password-otp", { state: { email } })
      } else {
        setError(response.message || "Failed to send OTP. Please try again.")
      }
    } catch (err) {
      console.log("Request OTP Error:", err)
      setError(err.email?.[0] || err.message || "Failed to send OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  if (submitted) {
    return <ResetPasswordOtp email={email} />;
  }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="grid grid-cols-12 min-h-screen">
            <div className="col-span-12 lg:col-span-7 hidden md:block">
        <div className="relative h-full w-full overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center z-0 aspect-[7.8/6] -mt-16 ml-[-16%]"
            style={{ backgroundImage: "url('/images/auth-img.png')" }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(102, 102, 102, 0) 0%, rgba(102, 102, 102, 0) 45%, rgba(72, 58, 86, 0.6) 60%, #280B45 85%)",
            }}
          />
          <div className="relative z-20 h-full flex flex-col justify-end pb-8 px-16">
            <div className="mb-1">
              <div className="inline-flex items-center bg-opacity-20 bg-gray-800 rounded-lg px-3 py-2 border border-white">
                <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"} mr-2`}></div>
                <span className="text-white text-sm">One connection at a time</span>
              </div>
            </div>
            <h1 className="text-white text-lg md:text-lg lg:text-xl font-bold mb-2 leading-tight">
              Welcome to your Professional Practical Training Workshop, Career Contents and Global Networking Community!
            </h1>
            <p className="text-white md:text-sm opacity-90 max-w-3xl" style={{ fontSize: "0.9rem" }}>
              Your gateway to skill enhancement and collaborative solutions to workforce applications...
            </p>
          </div>
        </div>
      </div>
            {/* <div className='md:col-span-7 hidden md:block'>
                <HeroSection />
            </div> */}
            <div className="min-h-screen flex items-center justify-center col-span-12 md:col-span-5 px-4 bg-white">
                <div className="w-full max-w-md p-6">
                    <h1 className="text-2xl font-bold text-[#3a1c64] mb-4 text-center">Reset Password</h1>
                    <p className="text-gray-600 mb-6 text-center">
                        Enter your email address, and we'll send you a code to reset your password
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-3 left-0 pl-3 pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={handleEmailChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#5b9a68] focus:border-[#5b9a68]"
                                autoComplete="email"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={!email.trim()}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
                                ${!email.trim() ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#5b9a68] hover:bg-[#4e8559] text-white '
                                }`}
                        >
                            Send Reset Code
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <p className="text-sm text-gray-600">
                            Remember your password?{' '}
                            <Link to="/login" className="text-[#5b9a68] hover:underline">
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordEmail;