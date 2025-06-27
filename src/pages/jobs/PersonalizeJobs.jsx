import React from 'react'
import Sidebar from '../../components/dashboard/jobs/Sidebar'
import PersonalizeJob from '../../components/dashboard/jobs/PersonalizeJob'


function PersonalizedJob() {
  return (
    <div>
      <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
        <div className='col-span-4 md:col-span-4 lg:col-span-3'>
          <Sidebar />
        </div>
        <div className='col-span-8 md:col-span-8 lg:col-span-9'>
          <PersonalizeJob />
        </div>
      </div>
    </div>
  )
}

export default PersonalizedJob