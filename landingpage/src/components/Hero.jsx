import React, { useState } from 'react'
import Heroimage from '/images/job-seeker.jpg'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { JoinWaitList } from '../api/apiService';
import { Button, Modal } from "flowbite-react";

const Hero = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [industry, setIndustry] = useState(['']);
    const [error, setError] = useState(null);

    const [openModal, setOpenModal] = useState(true);

    const [text] = useTypewriter({
        // words: [' to transition seamlessly', ' from education', ' to employment', ' with real-world skills,', ' expert mentorship,', '  and a global network.'],
        words: ['One Connection at a Time'],
        loop: {},
        typeSpeed: 120
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        //const form = e.target.value;
        try {
            const data = await JoinWaitList(name, email, industry);
            // Handle success (e.g., save token, redirect)
            if (data) {
                alert('You have successfully joined the waitlist');
                console.log('Registration successful', data);
                //form.reset();
            }
            else {
                alert(`User with this ${email} have already joined the waitlist`);
                console.log('User with this email already exist');
            }
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <div>
            <div className='' id='waitlist'>
                <img src={Heroimage} alt="Hero Image" className='w-full h-[560px] invisible md:visible' />
                {/* <div className="bg-[url(/images/job-seeker.jpg)] bg-cover bg-center"></div> */}
                <div className='absolute top-0 left-0 w-full h-full bg-green-900  md:bg-black  md:bg-opacity-10 flex flex-col justify-center items-center px-5'>
                    <div className='md:mt-[10rem]'>
                        <h1 className='font-bold text-white text-center text-xl visible md:invisible'>Welcome to Career-nexus Limited</h1>
                        <h1 className='md:text-4xl text-center font-bold text-white md:py-2'>Bringing Dreams to Reality, 
                            <span style={{ fontWeight: "bold" }} className='md:text-lime-600'>
                                {text}
                            </span>
                            <span style={{ color: 'red' }} >
                                <Cursor />
                            </span>
                        </h1>
                        {/* <h1 className='text-4xl text-center md:font-bold text-white py-2'>Bridging Dreams to Reality, One Connection at a Time</h1> */}
                        <h2 className='text-center text-white text-lg font-bold my-5 invisible md:visible'>Bridging Education with Real-World Expertise</h2>
                        <p className='text-white font-bold text-wrap'>CareerNexus empowers individuals to transition seamlessly from education to employment with real-world skills, expert mentorship, and a global network.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full max-w-lg mt-[-10rem] md:mt-2 p-1 rounded-lg bg-white md:bg-inherit">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className="flex flex-wrap -mx-3 mb-4 md:mb-6">
                            <div className="w-full md:w-1/2 px-10 md:px-3">
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-3 leading-tight focus:outline-none focus:bg-white" placeholder="Name" />
                                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                            </div>
                            <div className="w-full md:w-1/2 px-10 md:px-3">
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-3 leading-tight focus:outline-none focus:bg-white" placeholder="Email" />
                                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-full px-7 md:px-0 md:mb-0">
                            <div className="relative">
                                <select typeof='select' onChange={(e) => setIndustry(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-5 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option>Industry</option>
                                    <option>Agriculture & Primary Resources</option>
                                    <option>Manufacturing & Construction</option>
                                    <option>Technology & Innovation</option>
                                    <option>Healthcare & Life Sciences</option>
                                    <option>Financial Services</option>
                                    <option>Retail & Consumer Services</option>
                                    <option>Transportation & Logistics</option>
                                    <option>Real Estate & Infrastructure</option>
                                    <option>Hospitality and Tourism</option>
                                    <option>Government & Public Sector</option>
                                    <option>Professional & Business Services</option>
                                    <option>Emerging & Niche Sectors</option>
                                    <option>Others</option>
                                </select>
                                {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div> */}
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2 md:mb-6 mt-2 md:mt-10">
                            <div className="w-full md:w-1/2 px-10 md:px-3 mb-2 md:mb-0">
                                <button type='submit' className='bg-green-900 hover:bg-green-700 w-full px-3 py-3 rounded-md text-white'>Join the Waitlist</button>
                            </div>
                            <div className="w-full md:w-1/2 px-10 md:px-3">
                                <button onClick={(e) => { e.preventDefault(); setOpenModal(true); }} className='border-2 border-white w-full text-white bg-green-900 md:bg-inherit px-12 py-3 rounded-md md:hover:bg-white md:hover:text-black'>Learn More</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Modal */}
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Here Is More About Us</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        CareerNexus empowers individuals to transition seamlessly from education to employment with real-world skills, expert mentorship, and a global network.
                        </p>
                        <div>
                            <h1 className='text-3xl'>Ready to Transform Your Career?</h1>
                            <p className='my-8'>Join the waitlist today and be the first to experience Career-Nexus.</p>
                        </div>
                       
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Hero