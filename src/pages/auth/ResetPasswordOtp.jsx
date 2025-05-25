
import { useState, useEffect, useRef } from "react"
import { LoadingIcon } from "../../icons/icon"
import { authService } from "../../api/ApiServiceThree"
import { useLocation, useNavigate } from "react-router-dom";
const ResetPasswordOtp = ({ email: propEmail, userData, onSuccess }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isConnected] = useState(true);
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(120);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = propEmail || state?.email || '';

  // Countdown for resend button
  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, countdown]);

  const isOtpComplete = otp.every((digit) => digit !== '');

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (error) setError('');
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setOtp(digits);
      inputRefs.current[5].focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter a 6-digit OTP.');
      // toast.error('Please enter a 6-digit OTP.');
      return;
    }
    if (!email) {
      setError('Email is missing. Please start the password reset process again.');
      // toast.error('Email is missing.');
      navigate('/send-email');
      return;
    }
    setLoading(true);
    try {
      const payload = { email, otp: otpValue };
      console.log('Sending Reset OTP Verification Payload:', payload);
      const response = await authService.verifyResetOtp(payload);
      console.log('Reset OTP Verification Response:', response);

      if (response.status === 'Reset Password OTP sent.' || response.success) {
        console.log('OTP verified, navigating to /reset-password with state:', { email, otp: otpValue });
        // toast.success('OTP verified successfully!');
        if (onSuccess) onSuccess(response);
        navigate('/reset-password', { state: { email, otp: otpValue } });
      } else if (response.status === 'Otp sent') {
        setError('A new OTP was sent. Please check your email.');
        // toast.info('A new OTP was sent to your email.');
        setOtp(['', '', '', '', '', '']);
        setResendDisabled(true);
        setCountdown(120);
      } else {
        setError(response.message || 'Invalid OTP. Please try again.');
        // toast.error(response.message || 'Invalid OTP.');
      }
    } catch (err) {
      console.error('Reset OTP Verification Error:', err);
      const errorMessage =
        err.email?.[0] ||
        err.non_field_errors?.[0] ||
        err.message ||
        (err.status === 401
          ? 'Authentication failed: Invalid or missing token.'
          : err.message === 'Network Error'
            ? 'Network error: Unable to reach the server. Please check your connection.'
            : err.message.includes('CORS') || err.message.includes('Access-Control')
              ? 'CORS error: Server is blocking the request. Please contact support.'
              : 'Invalid OTP. Please try again.');
      setError(errorMessage);
      // toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError('Email is missing. Please start the password reset process again.');
      // toast.error('Email is missing.');
      navigate('/send-email');
      return;
    }
    setLoading(true);
    try {
      const response = await authService.requestResetOtp({ email, resend: true });
      console.log('Resend Reset OTP Response:', response);
      if (response.status === 'Reset Password OTP sent.') {
        // toast.success('OTP resent successfully. Check your email.');
        setError('');
        setResendDisabled(true);
        setCountdown(120);
        setOtp(['', '', '', '', '', '']);
      } else {
        setError(response.message || 'Failed to resend OTP. Please try again.');
        // toast.error(response.message || 'Failed to resend OTP.');
      }
    } catch (err) {
      console.error('Resend Reset OTP Error:', err);
      const errorMessage =
        err.email?.[0] ||
        err.non_field_errors?.[0] ||
        err.message ||
        (err.message === 'Network Error'
          ? 'Network error: Unable to reach the server. Please check your connection.'
          : err.message.includes('CORS') || err.message.includes('Access-Control')
            ? 'CORS error: Server is blocking the request. Please contact support.'
            : 'Failed to resend OTP. Please try again.');
      setError(errorMessage);
      // toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
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
                'linear-gradient(to bottom, rgba(102, 102, 102, 0) 0%, rgba(102, 102, 102, 0) 45%, rgba(72, 58, 86, 0.6) 60%, #280B45 85%)',
            }}
          />
          <div className="relative z-20 h-full flex flex-col justify-end pb-8 px-16">
            <div className="mb-1">
              <div className="inline-flex items-center bg-opacity-20 bg-gray-800 rounded-lg px-3 py-2 border border-white">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                <span className="text-white text-sm">Your connection</span>
              </div>
            </div>
            <h1 className="text-white text-lg font-bold mb-2 leading-tight">
              Welcome to your Professional Career Community!
            </h1>
            <p className="text-white text-sm opacity-90">
              Your gateway to skill enhancement and global opportunities...
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-5 flex items-center justify-center py-8">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Verify OTP</h3>
            <p className="text-gray-600 mt-2">
              Enter the 6-digit OTP sent to: <br />
              <span className="font-medium text-[#6DA05D]">{email}</span>
            </p>
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div className="flex justify-center space-x-2 mb-4">
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
                className={`w-12 h-12 text-center text-2xl font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D] ${
                  digit ? 'border-[#6DA05D]' : 'border-gray-300'
                }`}
                disabled={loading}
              />
            ))}
          </div>
          <div className="flex flex-col space-y-3">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button
                  onClick={handleResend}
                  disabled={loading || resendDisabled}
                  className={`text-[#6DA05D] hover:text-[#5B8F4E] font-semibold ${
                    loading || resendDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {resendDisabled
                    ? `Resend (${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')})`
                    : 'Resend OTP'}
                </button>
              </p>
            </div>
            <button
              onClick={handleVerify}
              disabled={loading || !isOtpComplete}
              className={`w-full py-3 px-4 rounded-lg text-sm font-semibold flex items-center justify-center ${
                loading || !isOtpComplete ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#6DA05D] hover:bg-[#5B8F4E] text-white'
              }`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Verify OTP'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordOtp;
// const ResetPasswordOtp = ({ email, userData, onSuccess }) => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [error, setError] = useState('');
//   const [isConnected, setIsConnected] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [resendDisabled, setResendDisabled] = useState(true);
//   const [countdown, setCountdown] = useState(120);
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // if (!email) {
//     //   setError('Email is missing. Please start the password reset process again.');
//     // }
//     let timer;
//     if (resendDisabled && countdown > 0) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     } else if (countdown === 0) {
//       setResendDisabled(false);
//     }
//     return () => clearTimeout(timer);
//   }, [resendDisabled, countdown, email]);

//   const isOtpComplete = otp.every((digit) => digit !== '');

//   const handleChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (error) setError('');
//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text/plain').trim();
//     if (/^\d{6}$/.test(pastedData)) {
//       const digits = pastedData.split('');
//       setOtp(digits);
//       inputRefs.current[5].focus();
//     }
//   };

//   const handleVerify = async () => {
//     const otpValue = otp.join('');
//     if (otpValue.length !== 6) {
//       setError('Please enter all 6 digits of the OTP');
//       return;
//     }
//     if (!email) {
//       setError('Email is missing. Please start the password reset process again.');
//       return;
//     }
//     setLoading(true);
//     try {
//       const payload = { email, otp: otpValue };
//       console.log('Sending Reset OTP Verification Payload:', payload);
//       const response = await authService.verifyResetOtp(payload);
//       console.log('Reset OTP Verification Response:', response);

//       if (response.status === 'verified' || response.success) {
//         console.log('OTP verified, navigating to /reset-password with state:', { email, otp: otpValue });
//         toast.success('OTP verified successfully');
//         if (onSuccess) onSuccess(response);
//         navigate('/reset-password', { state: { email, otp: otpValue } });
//       } else if (response.status === 'Otp sent') {
//         setError('A new OTP was sent. Please check your email and try again.');
//         setOtp(['', '', '', '', '', '']);
//         setResendDisabled(true);
//         setCountdown(120);
//       } else {
//         setError(response.message || 'Invalid OTP. Please try again.');
//       }
//     } catch (err) {
//       console.error('Reset OTP Verification Error:', err);
//       const errorMessage =
//         err.email?.[0] ||
//         err.non_field_errors?.[0] ||
//         err.message ||
//         err.status === 401
//           ? 'Authentication failed: Invalid or missing token.'
//           : err.message === 'Network Error'
//           ? 'Network error: Unable to reach the server. Please check your connection.'
//           : err.message.includes('CORS') || err.message.includes('Access-Control')
//           ? 'CORS error: Server is blocking the request. Please contact support.'
//           : 'Invalid OTP. Please try again.';
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     if (!email) {
//       setError('Email is missing. Please start the password reset process again.');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await authService.requestResetOtp({ email, resend: true });
//       console.log('Resend Reset OTP Response:', response);
//       if (response.status === 'Otp sent') {
//         toast.success('OTP resent successfully. Check your email.');
//         setError('');
//         setResendDisabled(true);
//         setCountdown(120);
//         setOtp(['', '', '', '', '', '']);
//       } else {
//         setError(response.message || 'Failed to resend OTP. Please try again.');
//       }
//     } catch (err) {
//       console.error('Resend Reset OTP Error:', err);
//       const errorMessage =
//         err.email?.[0] ||
//         err.non_field_errors?.[0] ||
//         err.message ||
//         err.message === 'Network Error'
//           ? 'Network error: Unable to reach the server. Please check your connection.'
//           : err.message.includes('CORS') || err.message.includes('Access-Control')
//           ? 'CORS error: Server is blocking the request. Please contact support.'
//           : 'Failed to resend OTP. Please try again.';
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-12 min-h-screen">
//       <div className="col-span-12 lg:col-span-7 hidden md:block">
//         <div className="relative h-full w-full overflow-hidden">
//           <div
//             className="absolute inset-0 bg-cover bg-center z-0 aspect-[7.8/6] -mt-16 ml-[-16%]"
//             style={{
//               backgroundImage: "url('/images/auth-img.png')",
//             }}
//           />
//           <div
//             className="absolute inset-0 z-10"
//             style={{
//               background:
//                 'linear-gradient(to bottom, rgba(102, 102, 102, 0) 0%, rgba(102, 102, 102, 0) 45%, rgba(72, 58, 86, 0.6) 60%, #280B45 85%)',
//             }}
//           />
//           <div className="relative z-20 h-full flex flex-col justify-end pb-8 px-16">
//             <div className="mb-1">
//               <div className="inline-flex items-center bg-opacity-20 bg-gray-800 rounded-lg px-3 py-2 border border-white">
//                 <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
//                 <span className="text-white text-sm">One connection at a time</span>
//               </div>
//             </div>
//             <h1 className="text-white text-lg md:text-lg lg:text-xl font-bold mb-2 leading-tight">
//               Welcome to your Professional Practical Training Workshop, Career Contents and Global Networking Community!
//             </h1>
//             <p className="text-white md:text-sm opacity-90 max-w-3xl" style={{ fontSize: '0.9rem' }}>
//               Your gateway to skill enhancement and collaborative solutions to workforce applications...
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="col-span-12 lg:col-span-5 flex items-center justify-center py-8">
//         <div className="bg-white rounded-lg p-8 max-w-md w-full">
//           <div className="text-center mb-6">
//             <h3 className="text-xl font-bold text-gray-900">Reset Password</h3>
//             <p className="text-gray-600 mt-2">
//               Enter the 6-digit OTP sent to: <br />
//               <span className="font-medium text-[#6DA05D]">{email || 'N/A'}</span>
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
//                 className={`w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D] focus:border-[#6DA05D] ${
//                   digit ? 'border-[#6DA05D]' : 'border-gray-300'
//                 }`}
//               />
//             ))}
//           </div>
//           <div className="flex flex-col space-y-4">
//             <div className="text-center">
//               <p className="text-sm text-gray-600">
//                 Didn't receive the code?{' '}
//                 <button
//                   onClick={handleResend}
//                   disabled={resendDisabled || loading}
//                   className={`text-[#6DA05D] hover:text-[#5B8F4E] font-medium ${
//                     resendDisabled || loading ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {resendDisabled
//                     ? `Resend in ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')}`
//                     : 'Resend OTP'}
//                 </button>
//               </p>
//             </div>
//             <button
//               onClick={handleVerify}
//               disabled={loading || !isOtpComplete || !email}
//               className={`w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium flex items-center justify-center ${
//                 loading || !isOtpComplete || !email
//                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                   : 'bg-[#6DA05D] hover:bg-[#5B8F4E] text-white'
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6DA05D]`}
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                   </svg>
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
//   );
// };

// export default ResetPasswordOtp;
// const ResetPasswordOtp = ({ email, userData, onSuccess }) => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [error, setError] = useState('');
//   const [isConnected, setIsConnected] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [resendDisabled, setResendDisabled] = useState(true);
//   const [countdown, setCountdown] = useState(120); // 2 minutes
//   const inputRefs = useRef([]);
//   const navigate = useNavigate(); // Initialize navigate

//   useEffect(() => {
//     let timer;
//     if (resendDisabled && countdown > 0) {
//       timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//     } else if (countdown === 0) {
//       setResendDisabled(false);
//     }
//     return () => clearTimeout(timer);
//   }, [resendDisabled, countdown]);

//   const isOtpComplete = otp.every((digit) => digit !== '');

//   const handleChange = (index, value) => {
//     if (!/^\d*$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//     if (error) setError('');
//     if (value && index < 5) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   const handleKeyDown = (index, e) => {
//     if (e.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedData = e.clipboardData.getData('text/plain').trim();
//     if (/^\d{6}$/.test(pastedData)) {
//       const digits = pastedData.split('');
//       setOtp(digits);
//       inputRefs.current[5].focus();
//     }
//   };

//   const handleVerify = async () => {
//     const otpValue = otp.join('');
//     if (otpValue.length !== 6) {
//       setError('Please enter all 6 digits of the OTP');
//       return;
//     }
//     setLoading(true);
//     try {
//       const payload = { email, otp: otpValue };
//       console.log('Sending Reset OTP Verification Payload:', payload);
//       const response = await authService.verifyResetOtp(payload);
//       console.log('Reset OTP Verification Response:', response);

//       if (response.status === 'verified' || response.success) { // Handle variations
//         console.log('OTP verified, navigating to /reset-password');
//         toast.success('OTP verified successfully');
//         if (onSuccess) onSuccess(response); // Call onSuccess if provided
//         navigate('/reset-password', { state: { email, otp: otpValue } });
//       } else if (response.status === 'Otp sent') {
//         setError('A new OTP was sent. Please check your email and try again.');
//         setOtp(['', '', '', '', '', '']);
//         setResendDisabled(true);
//         setCountdown(120); // Reset to 2 minutes
//       } else {
//         setError(response.message || 'Invalid OTP. Please try again.');
//       }
//     } catch (err) {
//       console.error('Reset OTP Verification Error:', err);
//       const errorMessage =
//         err.response?.data?.non_field_errors?.[0] ||
//         err.response?.data?.email?.[0] ||
//         err.response?.data?.message ||
//         err.message === 'Network Error'
//           ? 'Network error: Unable to reach the server. Please check your connection.'
//           : err.message.includes('CORS') || err.message.includes('Access-Control')
//           ? 'CORS error: Server is blocking the request. Please contact support.'
//           : 'Invalid OTP. Please try again.';
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     if (!email) {
//       setError('Email is missing. Please start the password reset process again.');
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await authService.requestResetOtp({ email, resend: true });
//       console.log('Resend Reset OTP Response:', response);
//       if (response.status === 'Otp sent') {
//         toast.success('OTP resent successfully. Check your email.');
//         setError('');
//         setResendDisabled(true);
//         setCountdown(120);
//         setOtp(['', '', '', '', '', '']);
//       } else {
//         setError(response.message || 'Failed to resend OTP. Please try again.');
//       }
//     } catch (err) {
//       console.error('Resend Reset OTP Error:', err);
//       const errorMessage =
//         err.response?.data?.non_field_errors?.[0] ||
//         err.response?.data?.email?.[0] ||
//         err.response?.data?.message ||
//         err.message === 'Network Error'
//           ? 'Network error: Unable to reach the server. Please check your connection.'
//           : err.message.includes('CORS') || err.message.includes('Access-Control')
//           ? 'CORS error: Server is blocking the request. Please contact support.'
//           : 'Failed to resend OTP. Please try again.';
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="grid grid-cols-12 min-h-screen">
//       <div className="col-span-12 lg:col-span-7 hidden md:block">
//         <div className="relative h-full w-full overflow-hidden">
//           <div
//             className="absolute inset-0 bg-cover bg-center z-0 aspect-[7.8/6] -mt-16 ml-[-16%]"
//             style={{
//               backgroundImage: "url('/images/auth-img.png')",
//             }}
//           />
//           <div
//             className="absolute inset-0 z-10"
//             style={{
//               background:
//                 'linear-gradient(to bottom, rgba(102, 102, 102, 0) 0%, rgba(102, 102, 102, 0) 45%, rgba(72, 58, 86, 0.6) 60%, #280B45 85%)',
//             }}
//           />
//           <div className="relative z-20 h-full flex flex-col justify-end pb-8 px-16">
//             <div className="mb-1">
//               <div className="inline-flex items-center bg-opacity-20 bg-gray-800 rounded-lg px-3 py-2 border border-white">
//                 <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
//                 <span className="text-white text-sm">One connection at a time</span>
//               </div>
//             </div>
//             <h1 className="text-white text-lg md:text-lg lg:text-xl font-bold mb-2 leading-tight">
//               Welcome to your Professional Practical Training Workshop, Career Contents and Global Networking Community!
//             </h1>
//             <p className="text-white md:text-sm opacity-90 max-w-3xl" style={{ fontSize: '0.9rem' }}>
//               Your gateway to skill enhancement and collaborative solutions to workforce applications...
//             </p>
//           </div>
//         </div>
//       </div>
//       <div className="col-span-12 lg:col-span-5 flex items-center justify-center py-8">
//         <div className="bg-white rounded-lg p-8 max-w-md w-full">
//           <div className="text-center mb-6">
//             <h3 className="text-xl font-bold text-gray-900">Reset Password</h3>
//             <p className="text-gray-600 mt-2">
//               Enter the 6-digit OTP sent to: <br />
//               <span className="font-medium text-[#6DA05D]">{email}</span>
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
//                 className={`w-12 h-12 text-center text-xl font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6DA05D] focus:border-[#6DA05D] ${
//                   digit ? 'border-[#6DA05D]' : 'border-gray-300'
//                 }`}
//               />
//             ))}
//           </div>
//           <div className="flex flex-col space-y-4">
//             <div className="text-center">
//               <p className="text-sm text-gray-600">
//                 Didn't receive the code?{' '}
//                 <button
//                   onClick={handleResend}
//                   disabled={resendDisabled || loading}
//                   className={`text-[#6DA05D] hover:text-[#5B8F4E] font-medium ${
//                     resendDisabled || loading ? 'opacity-50 cursor-not-allowed' : ''
//                   }`}
//                 >
//                   {resendDisabled
//                     ? `Resend in ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, '0')}`
//                     : 'Resend OTP'}
//                 </button>
//               </p>
//             </div>
//             <button
//               onClick={handleVerify}
//               disabled={loading || !isOtpComplete}
//               className={`w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium flex items-center justify-center ${
//                 loading || !isOtpComplete
//                   ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                   : 'bg-[#6DA05D] hover:bg-[#5B8F4E] text-white'
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6DA05D]`}
//             >
//               {loading ? (
//                 <span className="flex items-center">
//                   <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                   </svg>
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
//   );
// };

// export default ResetPasswordOtp;
// const ResetPasswordOtp = ({ email, userData, onSuccess}) => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""])
//   const [error, setError] = useState("")
//   const [isConnected, setIsConnected] = useState(true)
//   const [loading, setLoading] = useState(false)
//   const [resendDisabled, setResendDisabled] = useState(true)
//   const [countdown, setCountdown] = useState(120) // 2 minutes in seconds
//   const inputRefs = useRef([])


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

//   // Verify OTP
//   const handleVerify = async () => {
//     const otpValue = otp.join("")
//     if (otpValue.length !== 6) {
//       setError("Please enter all 6 digits of the OTP")
//       return
//     }
//     setLoading(true)
//     try {
//       const payload = { email, otp: otpValue }
//       console.log("Sending Reset OTP Verification Payload:", payload)
//       const response = await authService.verifyResetOtp(payload)
//       console.log("Reset OTP Verification Response:", response)
//       if (response.status === "verified") {
//         navigate("/reset-password", { state: { email, otp: otpValue } })
//       } else if (response.status === "Otp sent") {
//         setError("A new OTP was sent. Please check your email and try again.")
//         setOtp(["", "", "", "", "", ""])
//         setResendDisabled(true)
//         setCountdown(300)
//       } else {
//         setError(response.message || "Invalid OTP. Please try again.")
//       }
//     } catch (err) {
//       console.log("Reset OTP Verification Error:", err)
//       setError(
//         err.non_field_errors?.[0] ||
//           err.email?.[0] ||
//           err.message ||
//           "Invalid OTP. Please try again."
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Resend OTP
//   const handleResend = async () => {
//     // if (!email) {
//     //   setError("Email is missing. Please start the password reset process again.")
//     //   return
//     // }
//     setLoading(true)
//     try {
//       const response = await authService.requestResetOtp({ email, resend: true })
//       console.log("Resend Reset OTP Response:", response)
//       if (response.status === "Otp sent") {
//         setError("OTP resent successfully. Check your email.")
//         setResendDisabled(true)
//         setCountdown(300)
//         setOtp(["", "", "", "", "", ""])
//       } else {
//         setError(response.message || "Failed to resend OTP. Please try again.")
//       }
//     } catch (err) {
//       console.log("Resend Reset OTP Error:", err)
//       setError(
//         err.non_field_errors?.[0] ||
//           err.email?.[0] ||
//           err.message ||
//           "Failed to resend OTP. Please try again."
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   //   setLoading(true)
//   //   try {
//   //     const payload = { email, otp: otpValue }
//   //     console.log("Sending Reset OTP Verification Payload:", payload)
//   //     const response = await authService.verifyResetOtp(payload)
//   //     console.log("Reset OTP Verification Response:", response)
//   //     if (response.status === "verified") {
//   //       navigate("/reset-password", { state: { email, otp: otpValue } })
//   //     } else if (response.status === "Otp sent") {
//   //       setError("A new OTP was sent. Please check your email and try again.")
//   //       setOtp(["", "", "", "", "", ""])
//   //       setResendDisabled(true)
//   //       setCountdown(300)
//   //     } else {
//   //       setError(response.message || "Invalid OTP. Please try again.")
//   //     }
//   //   } catch (err) {
//   //     console.log("Reset OTP Verification Error:", err)
//   //     setError(err.message || "Invalid OTP. Please try again.")
//   //   } finally {
//   //     setLoading(false)
//   //   }
//   // }

//   // Resend OTP
//   // const handleResend = async () => {
//   //   setLoading(true)
//   //   try {
//   //     const response = await authService.requestResetOtp({ email })
//   //     console.log("Resend Reset OTP Response:", response)
//   //     if (response.status === "Otp sent") {
//   //       setError("OTP resent successfully. Check your email.")
//   //       setResendDisabled(true)
//   //       setCountdown(300)
//   //       setOtp(["", "", "", "", "", ""])
//   //     } else {
//   //       setError(response.message || "Failed to resend OTP. Please try again.")
//   //     }
//   //   } catch (err) {
//   //     console.log("Resend Reset OTP Error:", err)
//   //     setError(err.email?.[0] || err.message || "Failed to resend OTP. Please try again.")
//   //   } finally {
//   //     setLoading(false)
//   //   }
//   // }

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

//       {/* Right Column - OTP Form for password reset */}
//       <div className="col-span-12 lg:col-span-5 flex items-center justify-center py-8">
//         <div className="bg-white rounded-lg p-8 max-w-md w-full">
//           <div className="text-center mb-6">
//             <h3 className="text-xl font-bold text-gray-900">Reset Password</h3>
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
//                   Reset...
//                 </span>
//               ) : (
//                 'Reset'
//               )}
//             </button>
           
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ResetPasswordOtp
