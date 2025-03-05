import React, { useEffect } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import 'aos/dist/aos.css'
import Aos from 'aos'

const Educationgap = () => {
    useEffect(() => {
        Aos.init({
            duration: 1000,
            delay: 50
        });
    }, [])
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
                                <h1 className='font-semibold text-2xl'>The solution</h1>
                                <h1 className='font-semibold text-3xl my-4'>Career-Nexus.com</h1>
                                <p className='text-xl my-5'>Revolutionizing the world of skill acquisition and career development;</p>
                                <p className='text-xl'>An indispensable solution platform for career success!</p>
                                <p className='text-xl my-5'>Discover your potential with a cutting-edge platform.</p>
                                <p className='text-xl'>Designed to empower dynamic millennials and generation Z!!</p>
                            </div>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0  mb-5'>
                                <img src="/images/globe.jpg" alt="Education gap" className='w-full md:h-[300px] h-[500px] rounded-lg' />
                            </div>
                        </div>
                    </div>
                    <div className='p-4 bg-zinc-50'>
                        <h1 className='text-wrap text-3xl text-center'>The gap between education and employment is wider than ever,<br /> Career
                            Nexus was built to help address this gap</h1>
                        <div className='grid grid-cols-12'>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0  mb-5 grid-cols-12'>
                                <div className='gap-4 grid grid-cols-12'>
                                    <div className='text-center md:col-span-6 col-span-12 bg-white p-4 rounded h-56 pb-3 shadow-lg' data-aos="zoom-in">
                                        <div className='flex justify-center '>
                                            <h1 className='border-4 border-green-400 rounded-full w-16 py-4 my-6 bg-blue-950 text-green-400'>10%</h1>
                                        </div>
                                        <p>of working age population in Western world are unemployed or underemployed</p>
                                    </div>
                                    <div className='text-center md:col-span-6 col-span-12 bg-white p-4 rounded h-56 pb-3 shadow-lg' data-aos="zoom-in">
                                        <div className='flex justify-center'>
                                            <h1 className='border-4 border-green-400 rounded-full w-16 py-4 my-6 bg-blue-950 text-green-400'>87%</h1>
                                        </div>
                                        <p>of companies report a skills gap, with a lack of qualified candidates for available roles</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-12 lg:col-span-6 md:p-4 p-0  mb-5'>
                                {/* <img src="/images/edu2.png" alt="Education gap" className='w-full h-[300px] rounded-lg' /> */}
                                <div className='gap-4 grid grid-cols-12'>
                                    <div className='text-center md:col-span-6 col-span-12 bg-white p-4 rounded h-56 pb-3 shadow-lg' data-aos="zoom-in">
                                        <div className=''>
                                            <div className='flex justify-center'>
                                                <h1 className='border-4 border-green-400 rounded-full w-16 py-4 my-6 bg-blue-950 text-green-400'>40%</h1>
                                            </div>
                                            <p className='mt-[-10px]'>of workers will require reskilling within 5 years, yet many lack access to affordable and flexible learning solutions</p>
                                        </div>
                                    </div>
                                    <div className='text-center md:col-span-6 col-span-12 bg-white p-4 rounded h-56 pb-3 shadow-lg' data-aos="zoom-in">
                                        <div className='flex justify-center'>
                                            <h1 className='border-4 border-green-400 rounded-full w-16 py-4 my-6 bg-blue-950 text-green-400'>83%</h1>
                                        </div>
                                        <p>of professionals feel their education did not adequately prepare them for their carrers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default Educationgap