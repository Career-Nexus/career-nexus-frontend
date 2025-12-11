import React, { useEffect, useState } from 'react'
import { ActivityService } from '../api/ActivityServices'
import { toast } from 'react-toastify'
import AOS from 'aos';
// import 'aos/dist/aos.css';
export default function Consultation() {
  useEffect(() => {
    AOS.init();
}, []);
  return (
    <div className='py-4' id='consult'>
      <div className='mx-4 md:mx-20 md:flex md:justify-between md:items-center'>
        <div className='w-full object-cover'>
          <h1 className='text-3xl font-bold mb-10 md:mb-20 md:mt-6'>Our aim is simple:</h1>
          <div>
            <div className='md:flex gap-5'>
              <div data-aos="zoom-in" className='border-2 border-[#C4DAC4] p-3 h-56 w-80 rounded-tl-2xl mb-5'>
                <p>To partner with “corporations and institutions” on a clear career and development growth strategy; TRAINING & CONSULTING.</p>
              </div>
              <div data-aos="zoom-out" className='border-2 border-[#C4DAC4] p-3 h-56 w-80 rounded-bl-2xl mb-5'>
                <p>To partner to transform careers and workplaces with innovative corporate training solutions; I.e learning and development training.</p>
              </div>
            </div>
            <div className='md:flex gap-5 mt-5'>
              <div data-aos="fade-up" className='border-2 border-[#C4DAC4] p-3 h-56 w-80 rounded-br-2xl mb-5'>
                <p>To offer a personalized professional platform as a continuous career development tool; CAREER-NEXUS.COM</p>
              </div>
              <div data-aos="fade-down" className='border-2 border-[#C4DAC4] p-3 h-56 w-80 rounded-tr-2xl mb-5'>
                <p>We pride ourselves on providing unmatched career development tool, industry-focused training and consulting solutions. Trusted in providing human capacity building solutions; empowering teams, elevating performance, and driving sustainable growth.</p>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full object-cover md:ml-24 mt-10 md:mt-0'>
          <img src="/images/landing/landing13.png" alt="Consultation Image" className='rounded-2xl'/>
        </div>
      </div>
    </div>
  )
}





