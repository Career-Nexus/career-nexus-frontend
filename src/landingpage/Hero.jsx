import React from 'react'
import { PGreen } from '../icons'

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
                        <h1 className='text-4xl font-bold mb-2'>Bringing Dreams to Reality,</h1>
                        {/* <div className='flex w-full justify-center items-center gap-4 mb-4'>
                            <img src={PGreen} alt="heart" className='w-60 h-60' />
                            <h1 className='text-4xl font-bold'>One Connection at a Time.</h1>
                        </div> */}
                        <h1 className='text-4xl font-bold'>One Connection at a Time.</h1>
                        <p className='max-w-xl mb-6 text-lg'>
                            Transition seamlessly from education to employment with real-world skills.
                        </p>
                    </div>
                    <button onClick={() => window.location.href = '#get-started'} className='bg-[#5DA05D] px-6 py-3 rounded-lg text-white hover:bg-[#4b8b4b] transition'>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    )
}
