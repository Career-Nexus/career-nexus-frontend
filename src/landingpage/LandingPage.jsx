import React from 'react'
import Nav from './Nav'
import Hero from './Hero'
import {CareerPath} from './CareerPath'
import WhyNexus from './WhyNexus'
import Consultation from './Consultation'
import ConsultingPackage from './ConsultingPackage'
import Reviews from './ReviewFile'
import GetStarted from './GetStarted'
import WhatsLiveAndComing from './WhatsLiveAndComing'
import MentorCard from './MentorCard'
import Footer from './Footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LandingPage() {
  return (
    <div className='overflow-y-scroll no-scrollbar'>
        <Nav/>
        <Hero/>
        <CareerPath/>
        <WhyNexus/>
        <Consultation/>
        <Reviews/>
        {/* <ConsultingPackage/> */}
        <GetStarted/>
        <WhatsLiveAndComing/>
        <MentorCard/>
        <Footer/>
    </div>
  )
}
