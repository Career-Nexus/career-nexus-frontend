import React from 'react'

export default function GetStarted() {
  return (
    <div className='w-full md:mx-20 relative insert-0 flex mb-10'>
        <div className='mx-2 md:mx-0 w-full'>
          <img src="/images/landing/landing8.png" alt="landing9" className='w-[100%] md:w-[89%] max-w-full h-72'/>
        </div>
        <div className='absolute text-white items-center justify-center flex flex-col mt-[2rem] md:ml-[20rem] md:p-5 px-4'>
            <h1 className='text-3xl font-bold mb-4'>Get Started Today</h1>
            <p className='p-3'>Let’s work together to build a stronger, more efficient team. Request a <br />consultation now and start your journey toward sustained growth.</p>
            <button className='text-[#5DA05D] bg-white py-2 px-10 md:mt-6 mt-2 rounded-lg' onClick={() => window.location.href='#get-started'}>Get Started</button>
        </div>
    </div>
  )
}
