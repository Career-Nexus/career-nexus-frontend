import React, { useEffect } from 'react'
import { Check, Check2 } from '../icon/icon'
import 'aos/dist/aos.css'
import Aos from 'aos'

const WhyNexus = () => {
    useEffect(()=>{
        Aos.init({
            duration:1000,
            delay:50
        });
    },[])
    return (
        <div>
            <div className='p-10'>
                <h1 className='text-3xl text-center'>Why Choose Career Nexus?</h1>
                <div className='grid grid-cols-12 gap-5 mx-5 my-16'>
                    <div className='lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 p-4'  data-aos="fade-right">
                        <div className='flex justify-center items-center'><Check className='mx-auto' /></div>
                        Live sessions for upskilling professional.
                    </div>
                    <div className='lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 p-4'  data-aos="fade-right">
                        <div className='flex justify-center items-center'><Check className='mx-auto' /></div>
                        Affordable, accessible, and high-quality professional development.
                    </div>
                    <div className='lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 p-4'  data-aos="fade-left">
                        <div className='flex justify-center items-center'><Check className='mx-auto' /></div>
                        Seamless transition from education to employment.
                    </div>
                    <div className='lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 p-4'  data-aos="fade-down">
                        <div className='flex justify-center items-center'><Check className='mx-auto' /></div>
                        Real-world skills and expert mentorship.
                    </div>
                    <div className='lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 p-4'  data-aos="fade-right">
                        <div className='flex justify-center items-center'><Check className='mx-auto' /></div>
                        Trusted by leading universities and corporations.
                    </div>
                </div>
            </div>
            <div className='px-10 py-20 opacity-90' style={{ backgroundColor: '#bfdebf' }}>
                <div className='text-center'>
                    <h1 className='text-3xl'>Ready to Transform Your Career?</h1>
                    <p className='my-8'>Join the waitlist today and be the first to experience CareerNexus.</p>
                </div>
                <div className='flex justify-center items-center gap-5 mt-5'>
                    <button className='bg-green-900 text-white px-12 py-3 rounded-md hover:bg-green-800'>Join Waitlist</button>
                    <button className='border-2 border-white px-12 py-3 rounded-md hover:bg-white hover:text-black'>Contact Us</button>
                </div>
            </div>
        </div>
    )
}

export default WhyNexus
