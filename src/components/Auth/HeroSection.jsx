
import React from 'react'

function HeroSection() {
  return (
    
    // <div className='min-h-screen bg-white relative'>
    //   <div className=" h-[85%] w-[80%] overflow-hidden top-0 left-0">
    //     <img src="/images/hero.png" alt="hero" className='w-[200%] h-[60%]'object-cover />
    //   </div>
    // </div>

    <div className='min-h-screen overflow-hidden'>
      <div className="absolute h-[85%] w-[58%] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0 aspect-[7.8/6] -mt-16 ml-[-16%] rounded-lg"
          style={{
            backgroundImage: "url('/images/auth-img.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "0.5rem",
          }}
        />
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(102, 102, 102, 0) 0%, rgba(102, 102, 102, 0) 45%, rgba(72, 58, 86, 0.6) 60%, #280B45 85%)",
          }}
        />
        {/* Content Container */}
        <div className="relative z-20 h-full flex flex-col justify-end pb-8 px-16">
          <div className="mb-1">
            <div className="inline-flex items-center bg-opacity-20 bg-gray-800 rounded-lg px-3 py-2 border border-white">
              <div className={`w-3 h-3 rounded-full bg-green-500 mr-2`}></div>
              <span className="text-white text-sm">One connection at a time</span>
            </div>
          </div>
          <h1 className="text-white text-lg md:text-lg lg:text-xl font-bold mb-2 leading-tight">
            Welcome to your Professional Practical Training Workshop, Career Contents and Global Networking Community!
          </h1>
          <p className="text-white md:text-sm opacity-90 max-w-3xl" style={{ fontSize: "0.9rem" }}>
            Your gateway to skill enhancement and collaborative solutions to workforce applications...
          </p>
        </div>
      </div>
    </div>
  )
}

export default HeroSection