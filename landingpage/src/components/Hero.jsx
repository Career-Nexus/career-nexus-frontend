import React from 'react'
import Heroimage from '/images/job-seeker.jpg'
import { useTypewriter, Cursor } from 'react-simple-typewriter'

const Hero = () => {
    const [text] = useTypewriter({
        words: [' to transition seamlessly', ' from education', ' to employment',' with real-world skills,',' expert mentorship,','  and a global network.'],
        loop: {},
        typeSpeed: 120
    })
    return (
        <div>
            <div className='relative w-full h-[560px] overflow-scroll'>
                <img src={Heroimage} alt="Hero Image" className='w-full h-[560px]' />
                {/* <div className="bg-[url(/images/job-seeker.jpg)] bg-cover bg-center"></div> */}
                <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 flex flex-col justify-center items-center'>
                    <div className='mt-[10rem]'>
                        <h1 className='text-4xl text-center font-bold text-white'>Bridging Dreams to Reality, One Connection at a Time</h1>
                        <h2 className='text-center text-white text-lg font-bold my-5'>Bridging Education with Real-World Expertise</h2>
                        {/* <p className='text-white font-bold'>CareerNexus empowers individuals to transition seamlessly from education to employment with real-world skills, expert mentorship, and a global network.</p> */}
                        <p className='text-white font-bold text-center'>CareerNexus empowers individuals
                            <span style={{ fontWeight: "bold", color: "#87A922" }}>
                                {text}
                            </span>
                            <span style={{ color: 'red' }}>
                                <Cursor />
                            </span> 
                        </p>
                    </div>
                    <form className="w-full max-w-lg mt-8">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Name" />
                                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="email" placeholder="Email" />
                                {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-full px-3 mb-8 md:mb-0">
                            <div className="relative">
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-5 -ml-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option>Industry</option>
                                    <option>Career Nexus</option>
                                    <option>NNPC</option>
                                    <option>Tesla</option>
                                    <option>Cway</option>
                                    <option>Linkedin</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 mt-9">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <button className='bg-green-900 hover:bg-green-700 w-full px-3 py-3 rounded-md text-white'>Join the Waitlist</button>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <button className='border-2 border-white w-full text-white bg-green-900 lg:bg-inherit sm:bg-green-900 md:bg-inherit px-12 py-3 rounded-md hover:bg-white hover:text-black'>Learn More</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Hero