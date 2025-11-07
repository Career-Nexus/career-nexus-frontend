import React from 'react'
import Profile from '../../components/dashboard/home/Profile'
import MainSection from '../../components/dashboard/home/MainSection'
import EventsHome from '../../components/dashboard/home/EventsHome'
import { ProfileProvider } from '../../context/ProfileContext'

const Home = () => {
    return (
        <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
            <div className='col-span-12 md:col-span-4 lg:col-span-3 hidden md:block'>
                <div className="sticky top-20">
                    <Profile />
                </div>
            </div>
            <div className='col-span-12 md:col-span-8 lg:col-span-6'>
                <ProfileProvider>
                    <MainSection />
                </ProfileProvider>
            </div>

            <div className='hidden lg:block lg:col-span-3'>
                <div className="sticky top-20">
                    <EventsHome />
                </div>
            </div>
        </div>
    )
}

export default Home