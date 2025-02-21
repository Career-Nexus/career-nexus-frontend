import React, { useEffect } from 'react'
import { Brain, Cardboard, Globe, Shield } from '../icon/icon'
import 'aos/dist/aos.css'
import Aos from 'aos'

const Card = () => {
    useEffect(()=>{
        Aos.init({
            duration:1000,
            delay:50
        });
    },[])
    return (
        <div className='bg-zinc-50 p-10'>
            <h1 className='text-3xl text-center'>Career-Nexus: The Ultimate Solution for Career Success.</h1>
             <div className='grid grid-cols-12 gap-5 mx-5 my-16'>
                <div className='bg-white shadow-lg p-6 rounded-md lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12' data-aos="zoom-in">
                    <div className='flex justify-center items-center'>
                        <Brain className="mx-auto" />
                    </div>
                    <h1 className='text-2xl text-center my-3'>AI-Powered Learning Paths</h1>
                    <p>Personalized recommendations based on industry demand and tailored to your career goals.</p>
                </div>
                <div className='bg-white shadow-lg p-6 rounded-md lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12' data-aos="zoom-in">
                    <div className='flex justify-center items-center'>
                        <Shield className="mx-auto" />
                    </div>
                    <h1 className='text-2xl text-center my-3'>Blockchain-Backed Certifications</h1>
                    <p>Secure, verifiable credentials trusted by employers.</p>
                </div>
                <div className='bg-white shadow-lg p-6 rounded-md lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12' data-aos="zoom-in">
                    <div className='flex justify-center items-center'>
                        <Cardboard className="mx-auto" />
                    </div>
                    <h1 className='text-2xl text-center my-3'>Immersive VR Job Simulations</h1>
                    <p>Gain real-world experience in a risk-free environment.</p>
                </div>
                <div className='bg-white shadow-lg p-6 rounded-md lg:col-span-3 md:col-span-6 sm:col-span-12 col-span-12' data-aos="zoom-in">
                    <div className='flex justify-center items-center'>
                        <Globe className="mx-auto" />
                    </div>
                    <h1 className='text-2xl text-center my-3'>Global Networking and Mentorship</h1>
                    <p>Connect with industry leaders and peers worldwide.</p>
                </div>
            </div>
        </div>
    )
}

export default Card
