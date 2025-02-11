import React from 'react'

const Educationgap = () => {
    return (
        <div className='py-10 ml-5'>
            <div className='grid grid-cols-12 gap-5 mx-5 my-16'>
                <div className='lg:col-span-6 md:col-span-12 col-span-12 sm:col-span-12 p-4'>
                    <h1 className='font-semibold text-3xl'>The Gap Between Education and Employment is Wider Than Ever.</h1>
                    <p className='text-xl my-5 text-black-50'>67% of employers say graduates lack the skills needed for entry-level roles.</p>
                    <p className='text-xl'>83% of professionals feel their education didn't prepare them for their careers.</p>
                </div>
                <div className='lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12 w-full'>
                    <img src="/images/Banner.png" alt="Education gap" className='hover:scale-x-105 w-full'/>
                </div>
            </div>
        </div>
    )
}

export default Educationgap