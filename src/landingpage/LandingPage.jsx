import React from 'react'
import Nav from './Nav'
import Hero from './Hero'
import {CareerPath} from './CareerPath'
import WhyNexus from './WhyNexus'
import Consultation from './Consultation'
import ConsultingPackage from './ConsultingPackage'
import GetStarted from './GetStarted'
import Footer from './Footer'

export default function LandingPage() {
  return (
    <div className='overflow-y-scroll no-scrollbar'>
        <Nav/>
        <Hero/>
        <CareerPath/>
        <WhyNexus/>
        <Consultation/>
        <ConsultingPackage/>
        <GetStarted/>
        <Footer/>
    </div>
  )
}
