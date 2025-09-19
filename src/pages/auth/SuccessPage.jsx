import React from 'react'
import HeroSection from '../../components/Auth/HeroSection'
import { SuccessIcon, SuccessIconBase } from '../../icons'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../api/ApiServiceThree';
import Cookies from 'js-cookie';

function SuccessPage() {
    const navigate = useNavigate();
    
    const handleSuccess = () => {
        authService.isAuthenticated(true);
        authService.setAuthCookies(Cookies.get('access_token'));
        // Cookies.remove('access_token');
        navigate('/profile-setup');
      };
  return (
    <div>
        <div className="grid grid-cols-12 min-h-screen">
            <div className='md:col-span-7 hidden md:block ml-5'>
                <HeroSection />
            </div>
            <div className='col-span-12 md:col-span-5 px-4 bg-white'>
                <div className='mx-5 px-12'>
                    <div className='flex flex-col items-center justify-center bg-white min-h-[calc(100vh-200px)]'>
                        <div className='absolute w-28 h-28 rounded-full flex items-center justify-center'>
                            <img src={SuccessIconBase} alt="success" className='absolute inset-0 w-full h-full object-cover' />
                            <img src={SuccessIcon} alt="success" className='absolute left-7 inset-y-7 inset-0 w-[40%] h-[40%] object-cover' />
                        </div>
                        <div className='mt-52'>
                            <h1 className='text-2xl font-bold text-center text-[#3a1c64]'>Verified</h1>
                        <p className='text-gray-700 '>You are all set! Your email has been verified</p>
                        </div>
                    </div>
                </div>
                <button onClick={handleSuccess} className='flex items-center justify-center mt-10 md:mt-[-1rem] w-full'>
                    <div className='w-[50%] px-4 py-2 bg-[#5DA05D] text-white text-center rounded-md mx-auto border-0'>Setup Your Profile</div>
                </button>
            </div>
            
        </div>
    </div>
  )
}

export default SuccessPage