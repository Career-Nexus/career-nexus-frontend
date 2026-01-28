// import React from 'react'

// function HeroSection() {
//   return (
    
//     <div className='h-full w-full bg-[#E6FFE7]'>
//       <div className='h-full w-full relative'>
//         <img src="/images/hero-2.png" alt="hero" className='w-[100%] relative aspect-[7.6/6]' />        
//       </div>
//     </div>
    
//   )
// }

// export default HeroSection

import { FaCircle } from "react-icons/fa";

function HeroSection() {
  return (
    
    <div className='h-full w-full bg-[#E6FFE7] overflow-hidden'>
      <div className="h-full w-full relative font-sans overflow-hidden">
        <img src="/images/green-hero.png" alt="hero" className="w-[90%] h-full object-cover" />
        <div
          className="
            absolute top-60 right-36
            bg-white rounded-2xl
            w-fit flex gap-1.5 p-2 
            shadow-[1px_4px_15.5px_rgba(172,238,172,1)]
            backdrop-blur-[1px]"
        >
          <FaCircle className="text-[#5DA05D] mt-1" />
          <p className="text-[16px]">Bringing Dreams to reality</p>
        </div>
        <div className="max-w-2xl bg-transparent absolute bottom-20 left-28">
          <h1 className="text-2xl text-[#3D403D] font-bold tracking-wide mb-1">Your Gateway to Career Growth and Global Networking</h1>
          <p className="text-xl tracking-wide">Sharpen your skills. Tackle real challenges. Advance your career.</p>
        </div>
      </div>
    </div>
  )
}

export default HeroSection

