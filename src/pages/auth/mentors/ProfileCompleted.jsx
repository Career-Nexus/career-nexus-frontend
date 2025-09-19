import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CnLogo } from '../../../assets/images'
import { authService } from '../../../api/ApiServiceThree'
import Cookies from 'js-cookie';

function ProfileCompleted() {
  const navigate = useNavigate();

  const handleComplete = () => {
    authService.isAuthenticated(true);
    authService.setAuthCookies(Cookies.get('access_token'));
    // Cookies.remove('access_token');
    navigate('/home');
  };

  return (
    <div>
      <div className="bg-white rounded-lg w-full max-w-3xl ml-28">
        <img src={CnLogo} alt="Logo" className="w-24" />
        <div className="items-center justify-center flex flex-col gap-4 p-6">
          <h2 className="text-2xl font-bold text-[#2A0D47] mb-6">
            Application Under Review
          </h2>
          <img src="/images/settings.png" alt="settings" className="w-40 h-40" />
          <p className="text-center text-wrap ml-20">
            Thank you for your application! We'll review your information and
            get back to you within 2-3 business days. You'll receive an email
            once approved to start mentoring.
          </p>
          <button
            onClick={handleComplete}
            className="text-white bg-[#6DA05D] px-4 py-2 rounded-lg mt-5"
          >
            Complete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileCompleted;
