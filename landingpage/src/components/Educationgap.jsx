import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Educationgap = () => {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };
    return (
        <div className='md:py-10 mx-5'>
            <div className=''>
                <Slider {...settings} >
                    <div className='p-4'>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0 mb-5'>
                                <h1 className='font-semibold'>1. The Problem:</h1>
                                <h1 className='font-semibold text-2xl'>The Gap Between Education and Employment is Wider Than Ever.</h1>
                                <p className='text-xl my-5 text-black-50'>67% of employers say graduates lack the skills needed for entry-level roles.</p>
                                <p className='text-xl'>83% of professionals feel their education didn't prepare them for their careers.</p>
                            </div>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0 mb-5'>
                                <img src="/images/statistic.jpg" alt="Education gap" className='w-full h-[300px] rounded-lg' />
                            </div>
                        </div>
                    </div>
                    <div className='p-4'>
                        <div className='grid grid-cols-12 '>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0  mb-5'>
                                <h1>2. ------This is a hug problem------</h1>
                                <h1 className='font-semibold text-2xl'>Employment Readiness:</h1>
                                <p className='text-xl my-5 text-black-50'>65% of children in primary school today will work in a new job type - World Economic Forum; </p>
                                <p className='text-xl'>Underemployment, Employer Expectations, Workforce Evolution, High Cost of Education-what we bring solution to in career-nexus</p>
                            </div>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0  mb-5'>
                                <img src="/images/job-seeker.jpg" alt="Education gap" className='w-full h-[300px] rounded-lg' />
                            </div>
                        </div>
                    </div>
                    <div className='p-4'>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0  mb-5'>
                                <h1 className='font-semibold'></h1>3. -------Guess what we found-----
                                <h1 className='font-semibold text-9xl'> ?</h1>
                            </div>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0  mb-5'>
                                <img src="/images/viewroom.jpg" alt="Education gap" className='w-full h-[300px] rounded-lg' />
                            </div>
                        </div>
                    </div>
                    <div className='p-4'>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0  mb-5'>
                                <h1 className='font-semibold'>4. ----The solution:</h1>
                                <h1 className='font-semibold text-2xl'>CAREER-NEXUS.COM</h1>
                                <p className='text-xl my-5 text-black-50'>Revolutionizing the world of skill acquisition and career development;</p>
                                <p className='text-xl'>An indispensable solution platform for career success!</p>
                            </div>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0  mb-5'>
                                <img src="/images/globe.jpg" alt="Education gap" className='w-full h-[300px] rounded-lg' />
                            </div>
                        </div>
                    </div>
                    <div className='p-4'>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0  mb-5'>
                                <h1 className='font-semibold'>5. ----At the heat of career-nexus.com---</h1>
                                <h1 className='font-semibold text-2xl'>The Gap Between Education and Employment is Wider Than Ever.</h1>
                                <p className='text-xl my-5 text-black-50'>Discover your potential with a cutting-edge platform.</p>
                                <p className='text-xl'>Designed to empower dynamic millennials and generation Z!!</p>
                            </div>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0  mb-5'>
                                <img src="/images/Banner.png" alt="Education gap" className='w-full h-[300px] rounded-lg' />
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default Educationgap