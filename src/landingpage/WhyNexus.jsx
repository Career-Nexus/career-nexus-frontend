import React from 'react'
import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function WhyNexus() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div>
            <div className='pb-16 bg-gray-50 text-center'>
                <h1 className='text-3xl font-bold mb-8'>Career-Nexus: Your Path to Success</h1>
                <div className='mx-4 md:mx-20' >
                    <div className='grid grid-cols-5 gap-6'>
                        <div data-aos="flip-left" data-aos-duration="2000" className='col-span-5 md:col-span-2 shadow rounded-lg w-full object-cover max-h-96 h-96 border-2 border-gray-200'>
                            <img src="/images/landing/landing2.png" alt="landing2" className='max-h-80 h-60 w-full object-cover' />
                            <div className='md:p-4'>
                                <h1 className='font-bold'>Live Sessions for Professional Upskilling </h1>
                                <p>Our interactive live sessions are designed to enhance your skills and equip you with the latest industry knowledge.</p>
                            </div>
                        </div>
                        <div data-aos="zoom-in" data-aos-duration="2000" className='col-span-5 md:col-span-3 shadow rounded-lg w-full object-cover max-h-96 h-96 border-2 border-gray-200'>
                            <div className='flex relative insert-0 md:left-7 left-3 top-5'>
                                <img src="/images/landing/landing3.png" alt="landing3" className='max-h-80 h-32 w-[16] md:h-44 md:w-[27rem] object-cover rounded-lg' />
                                <img src="/images/landing/landing4.png" alt="landing3" className='absolute top-9 md:top-12 left-5 md:left-40 max-h-80 h-32 w-[16] md:h-44 md:w-[27rem] object-cover rounded-lg' />
                            </div>
                            <div className='md:p-4 mt-20'>
                                <h1 className='font-bold'>Affordable, Accessible, High-Quality Professional Development </h1>
                                <p>We believe that professional growth should be within reach for everyone. That’s why our programs are crafted to be affordable, accessible, and high-quality.</p>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-5 gap-6 mt-6'>
                        <div data-aos="fade-up" data-aos-duration="2000" className='col-span-5 md:col-span-3 shadow rounded-lg w-full object-cover max-h-96 h-96 border-2 border-gray-200'>
                            <div className='flex items-center justify-center mt-5 md:mt-20 md:gap-5 gap-2'>
                                <img src="/images/landing/landing5.png" alt="landing4" className='max-h-80 h-20 w-20 md:h-32 md:w-32 object-cover' />
                                <img src="/images/landing/landing6.png" alt="landing5" className='max-h-80 h-20 w-20 md:h-32 md:w-32 object-cover' />
                                <img src="/images/landing/landing7.png" alt="landing6" className='max-h-80 h-20 w-20 md:h-32 md:w-32 object-cover' />
                            </div>
                            <div className='md:p-12 p-8'>
                                <h1 className='font-bold'>Seamless Transition from Education to Employment </h1>
                                <p>Our platform bridges the gap between education and employment by providing career-focused training, job-ready skills, and expert guidance.</p>
                            </div>
                        </div>
                        <div data-aos="flip-right" data-aos-duration="2000" className='col-span-5 md:col-span-2 shadow rounded-lg w-full object-cover max-h-96 h-96 border-2 border-gray-200'>
                            <div className='flex relative insert-0'>
                                <img src="/images/landing/landing9.png" alt="landing2" className='max-h-80 h-52 w-full object-cover' />
                            </div>
                            <div className='p-4 md:mt-6'>
                                <h1 className='font-bold'>Expert Mentorship, Talent Acquisition & Freelancing</h1>
                                <p>Our expert mentors guide you every step of the way, offering personalized advice and career coaching. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
