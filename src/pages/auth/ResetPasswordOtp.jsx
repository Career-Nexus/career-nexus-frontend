
import { useState, useEffect, useRef } from "react"
import { LoadingIcon } from "../../icons/icon"
import { authService } from "../../api/ApiServiceThree"
import { useLocation, useNavigate } from "react-router-dom";
import HeroSection from "../../components/Auth/HeroSection";
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
      // const payload = { email, otp: otpValue };
      const payload = { otp: otpValue };
      console.log('Sending Reset OTP Verification Payload:', payload);
      const response = await authService.verifyResetOtp(payload);
      console.log('Reset OTP Verification Response:', response);

      if (response.status === 'Verified' || response.success) {
        console.log('OTP verified, navigating to /reset-password with state:', { email, otp: otpValue });
        // toast.success('OTP verified successfully!');
        if (onSuccess) onSuccess(response);
        // navigate('/reset-password', { state: { email, otp: otpValue } });
        navigate('/reset-password', { state: { email } });
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
    <div className="grid grid-cols-12 min-h-[70vh]">
      <div className="col-span-12 lg:col-span-7 hidden md:block ml-5">
        <HeroSection isConnected={isConnected} />
      </div>
      <div className="col-span-12 lg:col-span-5 flex items-center justify-center px-5 min-h-[70vh]">
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
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium flex items-center justify-center 
                ${loading || isOtpComplete ? 'bg-[#5b9a68] hover:bg-[#4e8559] text-white' : 
                  'bg-gray-100 text-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
            >
              {loading ? (
                <span className="flex items-center">
                  <LoadingIcon className="mr-2" />
                  Reset...
                </span>
              ) : (
                'Reset'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordOtp;