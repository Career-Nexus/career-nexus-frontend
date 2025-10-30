import React from 'react'
import EventsHome from '../../components/dashboard/home/EventsHome'
import { ProfileProvider } from '../../context/ProfileContext'
import ProfileView from '../../coporate/ProfileView'

const CoporateProfile = () => {
  return (
    <div className='grid grid-cols-12 md:gap-8 lg:px-20 px-5 py-8'>
      <div className='col-span-12 md:col-span-9'>
        <ProfileProvider>
          <ProfileView/>
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

export default CoporateProfile