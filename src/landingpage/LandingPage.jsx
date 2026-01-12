import React from 'react'
import Hero from './Hero'
import Reviews from './ReviewFile'
import GetStarted from './GetStarted'
import WhatsLiveAndComing from './WhatsLiveAndComing'
import MentorCard from './MentorCard'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HowItWorks from './Howitworks'
import WhoItsFor from './Whoitsfor'
import { Solution } from './Solution'


export default function LandingPage() {
  return (
    <div className='overflow-y-scroll no-scrollbar'>
        {/* <Nav/> */}
          <Hero />
          <Solution />
          <HowItWorks />
          <WhoItsFor />
        {/* <WhyNexus/> */}
        {/* <Consultation/> */}
        <Reviews/>
        {/* <ConsultingPackage/> */}
        <GetStarted/>
        <WhatsLiveAndComing/>
        <MentorCard/>
        {/* <Footer/> */}
    </div>
  )
}
