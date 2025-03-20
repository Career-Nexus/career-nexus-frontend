import React from 'react'
import MainProfile from '../../components/dashboard/home/profile/MainProfile'
import EventsHome from '../../components/dashboard/home/EventsHome'

const ProfilePage = () => {
  return (
    <div className='grid grid-cols-12 gap-8 px-20 py-8'>
      <div className='col-span-9'>
        <MainProfile/>
      </div>
      <div className='col-span-3'>
        <EventsHome/>
      </div>
    </div>
  )
}

export default ProfilePage