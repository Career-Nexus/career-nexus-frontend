import React from 'react'
//import Profile from '../../components/dashboard/home/Profile'
import MentorMain from '../../components/dashboard/mentorship/MentorMain'
import Profile from '../../components/dashboard/mentorship/Profile'

const MentorshipHome = () => {
  return (
    <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
      <div className='col-span-4 md:col-span-4 lg:col-span-3'>
        <Profile />
      </div>
      <div className='col-span-8 md:col-span-8 lg:col-span-9'>
        <MentorMain />
      </div>
    </div>
  )
}

export default MentorshipHome