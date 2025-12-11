import React from 'react'

export default function GetStarted() {
  return (
    <div className='w-full md:mx-20 relative insert-0 flex mb-10'>
        <div className='mx-2 md:mx-0 w-full relative'>
          <img src="/images/landing/landing8.png" alt="landing9" className='w-[100%] md:w-[89%] max-w-full h-72 relative'/>
        </div>
        <div className='absolute text-white top-0 lg:left-40 items-center justify-center flex flex-col mt-[2rem]  md:p-5 px-4'>
            <h1 className='text-3xl font-bold mb-4'>Get Started Today</h1>
            <p className='p-3'>Built organically with a commitment to excellence, and earned a reputation for delivering measurable results.</p>
            <button className='text-[#5DA05D] bg-white py-2 px-10 md:mt-6 mt-2 rounded-lg' onClick={() => window.location.href='#get-started'}>Get Started</button>
        </div>
    </div>
  )
}
