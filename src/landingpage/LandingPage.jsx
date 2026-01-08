import React from 'react'
import Nav from './Nav'
import Hero from './Hero'
import {CareerPath} from './CareerPath'
import Consultation from './Consultation'
import ConsultingPackage from './ConsultingPackage'
import GetStarted from './GetStarted'
import Footer from './Footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HowItWorks from './Howitworks'
import WhoItsFor from './Whoitsfor'


export default function LandingPage() {
  return (
    <div className='overflow-y-scroll no-scrollbar'>
        {/* <Nav/> */}
        <Hero/>
        <CareerPath/>
        <HowItWorks/>
        <WhoItsFor/>
        {/* <Consultation/> */}
        {/* <ConsultingPackage/> */}
        {/* <GetStarted/> */}
        {/* <Footer/> */}
    </div>
  )
}
