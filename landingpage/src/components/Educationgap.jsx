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
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    
    };
    return (
        <div className='md:py-10 bg-zinc-50'>
            <h1 className='text-wrap text-3xl text-center p-6'>The gap between education and employment is wider than ever,<br /> Career
                Nexus was built to help address this gap</h1>
            <div className='bg-zinc-50 mx-8 px-6'>
                <Slider {...settings}>
                    <div className='p-3'>
                        <div className='text-center  bg-white p-4 h-64 rounded pb-3 shadow-lg' data-aos="zoom-in">
                            <div className='flex justify-center '>
                                <h1 className='border-4 border-green-400 rounded-full w-16 py-4 my-6 bg-blue-950 text-green-400'>10%</h1>
                            </div>
                            <p>of working age population in Western world are unemployed or underemployed</p>
                        </div>
                    </div>
                    <div className='p-3'>
                        <div className='text-center bg-white p-4 h-64 rounded pb-3 shadow-lg' data-aos="zoom-in">
                            <div className='flex justify-center'>
                                <h1 className='border-4 border-green-400 rounded-full w-16 py-4 my-6 bg-blue-950 text-green-400'>87%</h1>
                            </div>
                            <p>of companies report a skills gap, with a lack of qualified candidates for available roles</p>
                        </div>
                    </div>
                    <div className='p-3'>
                        <div className='text-center bg-white p-4 h-64 rounded pb-3 shadow-lg' data-aos="zoom-in">
                            <div className='mt-[-25px] md:mt-0'>
                                <div className='flex justify-center'>
                                    <h1 className='border-4 border-green-400 rounded-full w-16 py-4 my-6 bg-blue-950 text-green-400'>40%</h1>
                                </div>
                                <p className='mt-[-20px] md:mt-[-10px]'>of workers will require reskilling within 5 years, yet many lack access to affordable and flexible learning solutions</p>
                            </div>
                        </div>
                    </div>
                    <div className='p-3'>
                        <div className='text-center  bg-white p-4 h-64 rounded pb-3 shadow-lg' data-aos="zoom-in">
                            <div className='flex justify-center'>
                                <h1 className='border-4 border-green-400 rounded-full w-16 py-4 my-6 bg-blue-950 text-green-400'>83%</h1>
                            </div>
                            <p>of professionals feel their education did not adequately prepare them for their carrers</p>
                        </div>
                    </div>
                </Slider>
            </div>
        </div>
    )
}

export default Educationgap