import React from 'react'
import Sidebar from '../../components/dashboard/jobs/Sidebar'
import AllJobs from '../../components/dashboard/jobs/AllJobs'

function Jobs() {
    return (
        <div>
            <AllJobs />
            {/* <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
                
                <div className='col-span-4 md:col-span-4 lg:col-span-3'>
                    <div className="sticky top-20">
                        <Sidebar />
                    </div>
                </div>
                <div className='col-span-8 md:col-span-8 lg:col-span-9'>
                    <AllJobs />
                </div>
            </div> */}
        </div>
    )
}

export default Jobs