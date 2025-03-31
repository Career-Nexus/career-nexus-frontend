import React from 'react'
import MainProfile from '../../components/dashboard/home/profile/MainProfile'
import EventsHome from '../../components/dashboard/home/EventsHome'

const ProfilePage = () => {
  return (
    <div className='grid grid-cols-12 md:gap-8 md:px-20 px-5 py-8'>
      <div className='col-span-12 md:col-span-9'>
        <MainProfile/>
      </div>
      <div className='col-span-3'>
        <EventsHome/>
      </div>
    </div>
  )
}

export default ProfilePage