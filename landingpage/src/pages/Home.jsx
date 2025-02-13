import React from 'react'
import Hero from '../components/Hero'
import Educationgap from '../components/Educationgap'
import Card from '../components/Card'
import WhyNexus from '../components/WhyNexus'
import Footer from '../components/Footer'
import CountTimer from '../components/CountTimer'


const Home = () => {
    const launchDate = new Date("2025-04-24T00:00:00").getTime();
  return (
    <div>
        <Hero />
        <Educationgap/>
        <Card/>
        <WhyNexus/>
        <CountTimer targetDate={launchDate} />
        <Footer/>
    </div>
  )
}

export default Home