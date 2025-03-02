import React, { useState } from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import { JoinWaitList } from '../api/apiService';
import { Button, Modal } from 'flowbite-react';
import Swal from 'sweetalert2'
import CounterTop from './CounterTop';
import { LearnMore } from './Privacy';

const HeroTwo = () => {
    const launchDate = new Date("2025-04-24T00:00:00").getTime();
    const [error, setError] = useState(null);

    const [openModal, setOpenModal] = useState(false);
    const [text] = useTypewriter({
        words: [' One Connection at a Time'],
        loop: {},
        typeSpeed: 120
    })
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const form = e.target;
            const name = form.name.value;
            const email = form.email.value;
            const industry = form.industry.value;

            const data = await JoinWaitList(name, email, industry);

            if (data) {
                // alert('You have successfully joined the waitlist');
                Swal.fire({
                    title: "Happy to have you on board!",
                    text: "You have successfully joined the waitlist!",
                    icon: "success"
                });
                console.log('Registration successful', data);

                //Clear form after successful submission
                form.reset();
            } else {
                // alert(`User with this ${email} has already joined the waitlist`);
                Swal.fire({
                    icon: "info",
                    text: `User with this email ${email} has already joined the waitlist`
                });
                console.log('User with this email already exists');
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
            console.log(err.message);
            setError(err.message);
        }
    };

    return (
        <div className='mb-10' id='waitlist'>
            <div>
                <div className='grid grid-cols-12 h-10 md:h-auto opacity-90'>
                    <img src='images/c-n2.jpg' alt='Career-nexus-logo' className='col-span-4 h-16 md:w-28 md:h-28 rounded-full p-3' />
                    <div className='col-span-8 ml-auto mr-4 invisible md:visible'>
                        <h1 className='font-bold text-xl invisible md:visible'>Countdown to launch</h1>
                        <CounterTop targetDate={launchDate} />
                    </div>
                </div>
                <video autoPlay loop muted className='-mt-28 w-full col-span-11 h-full ' >
                    <source src="/images/herovideo4.mp4" type="video/mp4" className='' />
                </video>
            </div>
            <div className='md:absolute left-0 top-5 md:-top-24 lg:top-0 w-full flex flex-col justify-center items-center'>
                <div className='pt-4 mt-[-12rem] md:mt-[-10px] md:bg-inherit px-3'>
                    <div className=''>
                        <h1 className='mt-20 ml-10 font-bold text-white text-center text-lg visible md:invisible'>Welcome to Career-nexus Ltd</h1>
                        <h1 className='md:text-2xl lg:text-4xl text-center font-bold text-white md:py-2 md:mt-14'>Bringing Dreams to Reality,
                            <span style={{ fontWeight: "bold" }} className='md:text-lime-600'>
                                {text}
                            </span>
                            <span style={{ color: 'red' }} >
                                <Cursor />
                            </span>
                        </h1>
                    </div>
                    <h2 className='text-center text-white text-lg font-bold my-5 invisible md:visible'> Bridging Education with Real-World Expertise</h2>
                    <p className='text-white text-center font-bold text-wrap invisible lg:visible'>Career-Nexus empowers individuals to transition seamlessly from education to <br /> employment with real-world skills.</p>
                </div>
                <div className=" md:bg-inherit md:p-0 px-2">
                    <form onSubmit={handleSubmit} className='rounded-lg mx-2 -mt-20 md:-mt-5 lg:mt-0 pb-1'>
                        {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}
                        <div className="flex flex-wrap -mx-3 mb-4 md:mb-6">
                            <div className="w-full md:w-1/2 px-10 md:px-3">
                                {/* <input value={name} onChange={(e) => setName(e.target.value)} type="text" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-3 leading-tight focus:outline-none focus:bg-white" placeholder="Name" /> */}
                                <input name="name" type="text" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-3 leading-tight focus:outline-none focus:bg-white" placeholder="Name" />
                            </div>
                            <div className="w-full md:w-1/2 px-10 md:px-3">
                                {/* <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-3 leading-tight focus:outline-none focus:bg-white" placeholder="Email" /> */}
                                <input name="email" type="email" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-3 leading-tight focus:outline-none focus:bg-white" placeholder="Email" />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-full px-7 md:px-0 md:mb-0">
                            <div className="relative">
                                {/* <select typeof='select' onChange={(e) => setIndustry(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-5 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"> */}
                                <select typeof='select' name="industry" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-5 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
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
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-2 md:mb-6 mt-2 md:mt-5">
                            <div className="w-full md:w-1/2 px-10 md:px-3 mb-2 md:mb-0">
                                {/* <button type='submit' className='bg-green-900 hover:bg-green-700 w-full px-3 py-3 rounded-md text-white' disabled={loading}>{loading ? "Joining the waitlist..." : "Join the Waitlist"}</button> */}
                                <button type='submit' className='bg-green-900 hover:bg-green-700 w-full px-3 py-3 rounded-md text-white'>Join the Waitlist</button>
                            </div>
                            <div className="w-full md:w-1/2 px-10 md:px-3">
                                <button onClick={() => setOpenModal(true)} className='border-2 border-white w-full text-white bg-green-900 md:bg-inherit px-12 py-3 rounded-md md:hover:bg-white md:hover:text-black'>Learn More</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* Modal */}
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className='font-bold'>Welcome to Career-Nexus—we're thrilled to have you here!</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <LearnMore/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default HeroTwo