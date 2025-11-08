import React from 'react'
import UserJobs from '../../components/dashboard/jobs/UsersJob'
import JobAnalysis from '../../components/dashboard/jobs/JobAnalysis'


function MyJobs() {
  return (
    <div>
        <div>
            <div className='md:grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
                <div className='col-span-4 md:col-span-4 lg:col-span-3'>
                    <div className="sticky top-20">
                        <JobAnalysis />
                    </div>
                </div>
                <div className='col-span-8 md:col-span-8 lg:col-span-9'>
                    <UserJobs />
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyJobs