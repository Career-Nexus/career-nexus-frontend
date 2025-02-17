import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Educationgap = () => {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        //speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    return (
        <div className='md:py-10 -mt-[4rem] ml-5'>
            <div className='grid grid-cols-12 gap-5 mx-5 my-1 md:my-16'>
                <div className='lg:col-span-6 md:col-span-12 col-span-12 sm:col-span-12 md:p-4 p-0'>
                    <h1 className='font-semibold text-3xl'>The Gap Between Education and Employment is Wider Than Ever.</h1>
                    <p className='text-xl my-5 text-black-50'>67% of employers say graduates lack the skills needed for entry-level roles.</p>
                    <p className='text-xl'>83% of professionals feel their education didn't prepare them for their careers.</p>
                </div>
                <div className='lg:col-span-6 md:col-span-12 sm:col-span-12 col-span-12 w-full slider-container'>
                    <Slider {...settings} >
                        <div>
                            <img src="/images/Banner.png" alt="Education gap" className='w-full h-[300px]' />
                        </div>
                        <div>
                            <img src="/images/animate1.png" alt="Education gap" className='w-full h-[300px]' />
                        </div>
                        <div>
                            <img src="/images/job-hirer.jpg" alt="Education gap" className='w-full h-[300px]' />
                        </div>
                        <div>
                            <img src="/images/job-seeker.jpg" alt="Education gap" className='w-full h-[300px]' />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    )
}

export default Educationgap