import React, { useEffect } from 'react'
import 'aos/dist/aos.css'
import Aos from 'aos'

const Educationgap = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            delay: 50
        });
    }, [])
    return (
        <div>
            <div className='bg-zinc-50 p-10 mt-[-5rem]'>
                <h1 className='text-wrap text-3xl text-center mt-8'>The gap between education and employment is wider than ever,<br /> Career
                    Nexus was built to help address this gap</h1>
                <div className='grid grid-cols-12 gap-5 mx-5 my-16'>
                    <div className='bg-white text-center shadow-lg p-6 rounded-md lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12' data-aos="zoom-in">
                        <div className='flex justify-center '>
                            <h1 className='border-4 border-green-400 rounded-full w-16 py-4 my-6 bg-blue-950 text-green-400'>10%</h1>
                        </div>
                        <p>of working age population in Western world are unemployed or underemployed</p>
                    </div>
                    <div className='bg-white text-center shadow-lg p-6 rounded-md lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12' data-aos="zoom-in">
                        <div className='flex justify-center'>
                            <h1 className='border-4 border-green-400 rounded-full w-16 py-4 my-6 bg-blue-950 text-green-400'>87%</h1>
                        </div>
                        <p>of companies report a skills gap, with a lack of qualified candidates for available roles</p>
                    </div>
                    <div className='bg-white text-center shadow-lg p-6 rounded-md lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12' data-aos="zoom-in">
                        <div className='mt-[-25px] md:mt-0'>
                            <div className='flex justify-center'>
                                <h1 className='border-4 border-green-400 rounded-full w-16 py-4 my-6 bg-blue-950 text-green-400'>40%</h1>
                            </div>
                            <p className='mt-[-20px] md:mt-[-10px]'>of workers will require reskilling within 5 years, yet many lack access to affordable and flexible learning solutions</p>
                        </div>
                    </div>
                    <div className='bg-white text-center shadow-lg p-6 rounded-md lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12' data-aos="zoom-in">
                        <div className='flex justify-center'>
                            <h1 className='border-4 border-green-400 rounded-full w-16 py-4 my-6 bg-blue-950 text-green-400'>83%</h1>
                        </div>
                        <p>of professionals feel their education did not adequately prepare them for their carrers</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Educationgap