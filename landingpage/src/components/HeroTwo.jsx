import React, { useState } from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import { JoinWaitList } from '../api/apiService';
import { Button, Modal } from 'flowbite-react';
import Swal from 'sweetalert2';
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
        <div className="relative mb-10 pb-10" id="waitlist">
            {/* Logo and Countdown Section */}
            <div className="relative z-20 grid grid-cols-12 h-10 md:h-auto opacity-90">
                <img
                    src="images/c-n2.jpg"
                    alt="Career-nexus-logo"
                    className="col-span-4 h-16 md:w-28 md:h-28 rounded-full p-3"
                />
                <div className="col-span-8 md:ml-auto md:mr-4">
                    <h1 className="md:font-bold md:text-xl text-green-950">Countdown to launch</h1>
                    <CounterTop targetDate={launchDate} />
                </div>
            </div>

            {/* Video Background */}
            <video autoPlay loop playsInline muted className="absolute top-0 left-0 w-full h-[95%] object-cover z-0">
                <source src="/images/herovideo4.mp4" type="video/mp4" />
            </video>

            {/* Content Overlay */}
            <div className="relative z-10 w-full flex flex-col justify-center items-center text-white px-3 text-center">
                <h1 className="mt-20 ml-10 font-bold text-lg md:hidden">Welcome to Career-nexus Ltd</h1>
                <h1 className="md:text-2xl lg:text-4xl font-bold md:py-2 md:mt-14">
                    Bringing Dreams to Reality,{' '}
                    <span className="md:text-lime-600 font-bold">{text}</span>
                    <span className="text-red-600">
                        <Cursor />
                    </span>
                </h1>

                <h2 className="text-lg font-bold my-5 hidden md:block">Bridging Education with Real-World Expertise</h2>
                <p className="font-bold text-gray-700 bg-stone-100 mb-3 p-2 rounded hidden lg:block">
                    Career-Nexus empowers individuals to transition seamlessly <br />from education to employment with real-world skills.
                </p>

                {/* Waitlist Form */}
                <form onSubmit={handleSubmit} className="rounded-lg mx-2 mb-2 mt-10 md:mt-0 pb-1 bg-opacity-90 p-4">
                    <div className="flex flex-wrap -mx-3 mb-4 md:mb-6">
                        <div className="w-full md:w-1/2 px-3">
                            <input
                                name="name"
                                type="text"
                                required
                                className="appearance-none block w-full bg-gray-300 dark:bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-3 leading-tight focus:outline-none focus:bg-white"
                                placeholder="Name"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <input
                                name="email"
                                type="email"
                                required
                                className="appearance-none block w-full bg-gray-300 dark:bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 mt-3 leading-tight focus:outline-none focus:bg-white"
                                placeholder="Email"
                            />
                        </div>
                    </div>

                    <div className="w-full mb-4">
                        <select
                            name="industry"
                            className="block appearance-none w-full bg-gray-300 dark:bg-gray-300 border border-gray-200 text-gray-700 py-3 pr-5 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        >
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

                    {/* Buttons */}
                    <div className="flex flex-wrap -mx-3 my-2 md:my-5">
                        <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                            <button type="submit" className="bg-green-900 hover:bg-green-700 w-full px-3 py-3 rounded-md text-white">
                                Join the Waitlist
                            </button>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <button
                                onClick={() => setOpenModal(true)}
                                className="border-2 border-white w-full text-white bg-green-900 md:bg-inherit px-12 py-3 rounded-md md:hover:bg-white md:hover:text-black"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Modal */}
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header className="font-bold">Welcome to Career-Nexus—we're thrilled to have you here!</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <LearnMore />
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