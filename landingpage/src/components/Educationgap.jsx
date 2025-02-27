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
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0  mb-5'>
                                <h1 className='font-semibold text-2xl'>CAREER-NEXUS.COM</h1>
                                <p className='text-xl my-5 text-black-50'>Is a professional networking and career development platform designed to bridge the gap between academic learning and practicals, real-world skills.
                                    It aim to empower individuals, particularly recent graduates, yound professionals, and freelancers, by providing them with the tools, resourses, and connections needed to suceed in their careers.
                                    The platform leverages cutting-edge technologies like AI, blockchain, and virtual reality (VR) to offer a comprehensive suite of services that cater to both individual and organizations.
                                </p>
                            </div>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0  mb-5'>
                                <img src="/images/edu.png" alt="Education gap" className='w-full h-[300px] rounded-lg' />
                            </div>
                        </div>
                    </div>
                    <div className='p-4'>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0  mb-5'>
                                <h1 className='font-semibold text-2xl'>The solution</h1>
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
                                <h1 className='font-semibold'>At the heat of career-nexus.com</h1>
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