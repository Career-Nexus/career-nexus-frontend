import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeroSection from '../../components/Auth/HeroSection';
import { Mail } from 'lucide-react';
import { authService } from '../../api/ApiServiceThree';
import ResetPasswordOtp from './ResetPasswordOtp';
import { LoadingIcon } from '../../icons/icon';

const ResetPasswordEmail = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(''); // State for email validation error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // General error (e.g., API errors)
  const navigate = useNavigate();

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Real-time validation
    if (!newEmail.trim()) {
      setEmailError('Please enter your email address');
    } else if (!validateEmail(newEmail)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }

    // Clear general error if user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Final validation before submission
    if (!email.trim()) {
      setEmailError('Please enter your email address');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.requestResetOtp({ email });
      console.log('Request OTP Response:', response);
      if (response.status === 'Reset Password OTP sent.') {
        setSubmitted(true);
        navigate('/reset-password-otp', { state: { email } });
      } else {
        setError(response.message || 'Failed to send OTP. Please try again.');
      }
    } catch (err) {
      console.log('Request OTP Error:', err);
      setError(
        err.email?.[0] || err.message || 'Failed to send OTP. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <ResetPasswordOtp email={email} />;
  }

  return (
    <div className="grid grid-cols-12 min-h-[70vh]">
      <div className="col-span-12 lg:col-span-7 hidden md:block mx-5">
        <HeroSection />
      </div>
      <div className="min-h-[70vh] flex items-center justify-center col-span-12 md:col-span-5 px-4 bg-white">
        <div className="w-full max-w-md p-6">
          <h1 className="text-2xl font-bold text-[#3a1c64] mb-4 text-center">
            Reset Password
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            Enter your email address, and we'll send you a code to reset your
            password
          </p>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
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
                className={`w-full pl-10 pr-4 py-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#5b9a68] focus:border-[#5b9a68] ${
                  emailError ? 'border-red-500' : 'border-gray-200'
                }`}
                autoComplete="email"
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading || !!emailError || !email.trim()}
              className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md ${
                loading 
                  ? "bg-[#5b9a68] text-white"
                  :!!emailError || !email.trim()
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#5b9a68] hover:bg-[#4e8559] text-white'
              }`}
            >
              {loading ? (
                <LoadingIcon/>
              ) : (
                'Send Reset Code'
              )}
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
// import React, { useState } from 'react';
// import { Link, Navigate, useNavigate } from 'react-router-dom';
// import HeroSection from '../../components/Auth/HeroSection';
// import { Mail } from 'lucide-react';
// import { authService } from '../../api/ApiServiceThree';
// import ResetPasswordOtp from './ResetPasswordOtp';

// const ResetPasswordEmail = () => {
//   const [isConnected, setIsConnected] = useState(true)
//   const [submitted, setSubmitted] = useState(false);
//   const [email, setEmail] = useState('');
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!email) {
//       setError("Please enter your email address")
//       return
//     }

//     setLoading(true)
//     try {
//       const response = await authService.requestResetOtp({ email })
//       console.log("Request OTP Response:", response)
//       if (response.status === "Reset Password OTP sent.") {
//         setSubmitted(true);
//         navigate("/reset-password-otp", { state: { email } })
//       } else {
//         setError(response.message || "Failed to send OTP. Please try again.")
//       }
//     } catch (err) {
//       console.log("Request OTP Error:", err)
//       setError(err.email?.[0] || err.message || "Failed to send OTP. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }
//   if (submitted) {
//     return <ResetPasswordOtp email={email} />;
//   }
//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   return (
//     <div className="grid grid-cols-12 min-h-[70%]">
//       <div className="col-span-12 lg:col-span-7 hidden md:block mx-5">
//         <HeroSection />
//       </div>
//       <div className="min-h-[70vh] flex items-center justify-center col-span-12 md:col-span-5 px-4 bg-white">
//         <div className="w-full max-w-md p-6">
//           <h1 className="text-2xl font-bold text-[#3a1c64] mb-4 text-center">Reset Password</h1>
//           <p className="text-gray-600 mb-6 text-center">
//             Enter your email address, and we'll send you a code to reset your password
//           </p>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="relative">
//               <div className="absolute inset-y-3 left-0 pl-3 pointer-events-none">
//                 <Mail className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Email Address"
//                 value={email}
//                 onChange={handleEmailChange}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#5b9a68] focus:border-[#5b9a68]"
//                 autoComplete="email"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={!email.trim()}
//               className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md 
//                                 ${!email.trim() ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-[#5b9a68] hover:bg-[#4e8559] text-white '
//                 }`}
//             >
//               Send Reset Code
//             </button>
//           </form>
//           <div className="text-center mt-4">
//             <p className="text-sm text-gray-600">
//               Remember your password?{' '}
//               <Link to="/login" className="text-[#5b9a68] hover:underline">
//                 Log in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPasswordEmail;