import React from 'react'
import HeroSection from '../../components/Auth/HeroSection'
import { SuccessIcon, SuccessIconBase } from '../../icons'
import { Link, Navigate } from 'react-router-dom'

function SuccessPage() {
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
                            <img src={SuccessIcon} alt="success" className='absolute left-6 inset-y-5 inset-0 w-[40%] h-[40%] object-cover' />
                        </div>
                        <div className='mt-48'>
                            <h1 className='text-2xl font-bold text-center text-[#3a1c64]'>Verified</h1>
                        <p className='text-gray-700 '>You are all set! Your email has been verified</p>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center mt-10 md:mt-[-3rem] '>
                    <Link to="/profile-setup" className='w-[50%] px-4 py-2 bg-[#4e8559] text-white text-center rounded-md mx-auto border border-[#4e8559]'>Done</Link>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default SuccessPage