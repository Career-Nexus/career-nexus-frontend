import React, { useEffect, useState } from 'react'
import { Check, Education, HighQuality, Live, Mentorship, } from '../icon/icon'
import 'aos/dist/aos.css'
import Aos from 'aos'
import { Button, Modal } from "flowbite-react";
import ReusableModal from './Modal';

const WhyNexus = () => {
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        Aos.init({
            duration: 1000,
            delay: 50
        });
    }, [])

    const ChildComponent = ({ ModalComponent, isOpen, onClose }) => {
        return (
            <ModalComponent isOpen={isOpen} onClose={onClose} title="Career-Nexus Contact means">
                <div className="space-y-6">
                    <div className='font-semibold'>Address: Paul Street, London, England, EC2A 4NE</div>
                    <div className='font-semibold'>WhatsApp: +1 (312) 539-4512</div>
                    <div className='font-semibold'>Email: info@career-nexus.com</div>
                    <div className='font-semibold'>Help: support@career-nexus.com </div>
                </div>
            </ModalComponent>
        );
    };
    return (
        <div>
            <div className='p-10'>
                <h1 className='text-3xl text-center'>Why Choose Career-Nexus?</h1>
                <div className='grid grid-cols-12 gap-5 mx-5 my-16'>
                    <div className='lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 p-4 text-center' data-aos="fade-right">
                        <div className='flex justify-center items-center'><Live className='mx-auto' /></div>
                        <div className='mt-4'>Live sessions for upskilling professional.</div>
                    </div>
                    <div className='lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 p-4 text-center' data-aos="fade-right">
                        <div className='flex justify-center items-center'><HighQuality className='mx-auto' /></div>
                        <div className='mt-4'>Affordable, accessible, and high-quality professional development.</div>
                    </div>
                    <div className='lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 p-4 text-center' data-aos="fade-left">
                        <div className='flex justify-center items-center'><Education className='mx-auto' /></div>
                        <div className='mt-4'>Seamless transition from education to employment. Trusted by leading universities and corporations.</div>
                    </div>
                    <div className='lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12 p-4 text-center' data-aos="fade-down">
                        <div className='flex justify-center items-center'><Mentorship className='mx-auto' /></div>
                        <div className='mt-4'>Expert Mentorship, Talent Acquisition & Freelancing</div>
                    </div>
                </div>
            </div>
            <div className='px-10 py-20' style={{ backgroundColor: '#bfdebf' }}>
                <div className='px-5'>
                    <div className='text-center'>
                        <h1 className='text-3xl'>Ready to Transform Your Career?</h1>
                        <p className='my-8'>Join the waitlist today and be the first to experience Career-Nexus.</p>
                    </div>
                    <div className='flex justify-center items-center gap-5 mt-5 flex-col md:flex-row'>
                        <a href="#waitlist"><button className='bg-green-900 scroll-smooth text-white px-12 py-3 rounded-md hover:bg-green-800'>Join Waitlist</button></a>
                        {/* <button onClick={(e) =>  setOpenModal(true)} className='border-2 border-white px-12 py-3 rounded-md hover:bg-white hover:text-black'>Contact Us</button> */}
                        <button className="border-2 border-white px-12 py-3 rounded-md hover:bg-white hover:text-black" onClick={() => setOpenModal(true)}>Contact Us</button>
                        <ChildComponent ModalComponent={ReusableModal} isOpen={openModal} onClose={() => setOpenModal(false)} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyNexus
