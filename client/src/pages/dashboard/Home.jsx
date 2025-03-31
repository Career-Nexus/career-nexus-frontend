import React from 'react'
import Profile from '../../components/dashboard/home/Profile'
import MainSection from '../../components/dashboard/home/MainSection'
import EventsHome from '../../components/dashboard/home/EventsHome'

const Home = () => {
    return (
        <div className='grid grid-cols-12 md:gap-8 p-4  md:px-12 md:py-8'>
            <div className='md:col-span-3'>
                <Profile />
            </div>
            <div className='col-span-12 md:col-span-6'>
                <MainSection />
            </div>
            <div className='md:col-span-3'>
                <EventsHome />
            </div>
        </div>
    )
}

export default Home