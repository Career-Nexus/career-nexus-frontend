import React from 'react'
import Hero from '../components/Hero'
import Educationgap from '../components/Educationgap'
import Card from '../components/Card'
import WhyNexus from '../components/WhyNexus'
import Footer from '../components/Footer'
//import Countdown from '../components/Countdown'

const Home = () => {
  return (
    <div>
        <Hero />
        <Educationgap/>
        <Card/>
        <WhyNexus/>
        {/* <Countdown/> */}
        <Footer/>
    </div>
  )
}

export default Home