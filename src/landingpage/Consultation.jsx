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
    <div className='py-4'>
      <div className='mx-4 md:mx-20 md:flex md:justify-between md:items-center'>
        <div className='w-full object-cover'>
          <h1 className='text-3xl font-bold mb-10 md:mb-20 md:mt-6'>Our Expertise, Your Growth</h1>
          <div>
            <div className='md:flex gap-5'>
              <div data-aos="zoom-in" className='border-2 border-[#C4DAC4] p-3 h-56 w-72 rounded-tl-2xl mb-5'>
                <h1 className='font-bold text-xl'>Human Resource Solutions:</h1>
                <p>Recruitment support, onboarding frameworks, and employee engagement strategies.</p>
              </div>
              <div data-aos="zoom-out" className='border-2 border-[#C4DAC4] p-3 h-56 w-72 rounded-bl-2xl mb-5'>
                <h1 className='font-bold text-xl'>Corporate Training Programs:</h1>
                <p>Tailored workshops in leadership, communication, technology, and compliance.</p>
              </div>
            </div>
            <div className='md:flex gap-5 mt-5'>
              <div data-aos="fade-up" className='border-2 border-[#C4DAC4] p-3 h-56 w-72 rounded-br-2xl mb-5'>
                <h1 className='font-bold text-xl'>Learning & Development (L&D):</h1>
                <p>Skills-gap assessments, career development pathways, and performance improvement strategies.</p>
              </div>
              <div data-aos="fade-down" className='border-2 border-[#C4DAC4] p-3 h-56 w-72 rounded-tr-2xl mb-5'>
                <h1 className='font-bold text-xl'>Organizational Development:</h1>
                <p>Change management, culture transformation, and succession planning.</p>
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





