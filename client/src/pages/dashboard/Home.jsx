import React from 'react'
import Profile from '../../components/dashboard/home/Profile'
import MainSection from '../../components/dashboard/home/MainSection'
import EventsHome from '../../components/dashboard/home/EventsHome'

const Home = () => {
    return (
        <div className='grid grid-cols-12 gap-8 px-20 py-8'>
            <div className='md:col-span-3'>
                <Profile />
            </div>
            <div className='col-span-12 md:col-span-7'>
                <MainSection />
            </div>
            <div className='md:col-span-2'>
                <EventsHome />
            </div>
        </div>
    )
}

export default Home