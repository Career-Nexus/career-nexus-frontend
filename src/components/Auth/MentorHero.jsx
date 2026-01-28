import { FaCircle } from "react-icons/fa";

function MentorHero() {
  return (
    
    <div className='h-full w-full bg-[#F7EFFF] overflow-hidden'>
      <div className="h-full w-full relative font-sans overflow-hidden">
        <img src="/images/mentor-hero-1.png" alt="hero" className="w-[90%] h-full object-cover" />
        <div
          className="
            absolute top-60 right-36
            bg-white rounded-2xl
            w-fit flex gap-1.5 p-2
            shadow-[1px_4px_15.5px_rgba(189,121,255,0.59)]
            backdrop-blur-[1px]"
        >
          <FaCircle className="text-[#2A0D47] mt-1" />
          <p className="text-[16px]">One connection at a time</p>
        </div>
        <div className="max-w-2xl bg-transparent absolute bottom-20 left-28">
          <h1 className="text-2xl text-[#3D403D] font-bold tracking-wide mb-1">Join Our Network of Expert Mentors</h1>
          <p className="text-xl tracking-wide">Share your experience, inspire growth, and support learners through practical guidance and career-building opportunities.</p>
        </div>
      </div>
    </div>
  )
}

export default MentorHero

