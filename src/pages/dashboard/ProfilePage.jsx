import React from 'react'
import MainProfile from '../../components/dashboard/home/profile/MainProfile'
import EventsHome from '../../components/dashboard/home/EventsHome'
import { ProfileProvider } from '../../context/ProfileContext'

const ProfilePage = () => {
  return (
    <div className='grid grid-cols-12 md:gap-8 lg:px-20 px-5 py-8'>
      <div className='col-span-12 md:col-span-9'>
        <ProfileProvider>
          <MainProfile/>
        </ProfileProvider>
      </div>
      <div className='col-span-3'>
        <div className="sticky top-20">
          <EventsHome/>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage