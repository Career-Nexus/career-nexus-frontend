import React from 'react'
import { PGreen, PPink, VGreen } from '../icons'

export default function Hero() {
    return (
        <div className='w-full relative'>
            {/* Hero Section */}
            <div className='relative w-full h-[32rem]'>
                <img
                    src="/images/landing/landing1.png"
                    alt="landing1"
                    className='w-full h-full object-cover'
                />

                {/* Centered text overlay */}
                <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4'>
                    <div>
                        <h1 className='text-2xl md:text-5xl font-bold mb-2 flex'>Bringing Dreams to <span className='text-[#5DA05D] ml-1' style={{fontStyle: 'italic'}}> Reality</span>,<img src={VGreen} alt="heart" className='w-14 md:w-28 mt-7 md:mt-11 ml-[-5rem] md:ml-[-10rem]' /></h1>
                        <h1 className='text-2xl md:text-5xl font-bold'>One Connection at a Time.</h1>
                        <img src="/images/landing/landing-10.png" alt="heart" className='w-9 h-9 md:w-16 md:h-16 md:mt-[-3rem] md:ml-[-4rem] ml-[-0.5rem] mt-[-1rem]' />
                        <img src="/images/landing/landing-11.png" alt="heart" className='w-7 h-7 md:w-16 md:h-14 ml-[2rem] mt-[-1rem]' />
                        <p className='max-w-md mb-6 text-lg text-center md:ml-[4rem]'>
                            Transition seamlessly from education to employment with real-world skills.
                        </p>
                    </div>
                    <button onClick={() => window.location.href = '/signup'} className='bg-[#5DA05D] px-6 py-3 rounded-lg text-white hover:bg-[#4b8b4b] transition'>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}
