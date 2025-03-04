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
                                {/* <img src="/images/viewroom.jpg" alt="Education gap" className='w-full h-[300px] rounded-lg' /> */}
                                <div className='bg-gray-50 p-3 rounded'>
                                    <h1 className='text-green-400 text-wrap'>The gap between education and employment is wider than ever and Career-Nexus was built to healp address this gap</h1>
                                    <div className='flex gap-4 '>
                                        <div className='text-center'>
                                            <div className='flex justify-center'>
                                                <h1 className='border-2 border-green-400 rounded-full w-16 py-4 my-6'>10%</h1>
                                            </div>
                                            <p>of working age population in Western world are unemployed or underemployed</p>
                                        </div>
                                        <div className='text-center'>
                                            <div className='flex justify-center'>
                                                <h1 className='border-2 border-green-400 rounded-full w-16 py-4 my-6'>87%</h1>
                                            </div>
                                            <p>of companies report a skills gap, with a lack of qualified candidates for available roles</p>
                                        </div>
                                        <div className='text-center'>
                                            <div className='flex justify-center'>
                                                <h1 className='border-2 border-green-400 rounded-full w-16 py-4 my-6'>40%</h1>
                                            </div>
                                            <p>of workers will requie reskilling within 5 years, yet many lack access to affordable and flexible learning solutions</p>
                                        </div>
                                        <div className='text-center'>
                                            <div className='flex justify-center'>
                                                <h1 className='border-2 border-green-400 rounded-full w-16 py-4 my-6'>83%</h1>
                                            </div>
                                            <p>of professionals feel their education did not adequately prepare them for their carrers</p>
                                        </div>
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