import React from 'react'
import { Premium } from '../home/EventsHome'

function JobAnalysis() {
    return (
        <div>
            <div className=''>
                <div className='border border-gray rounded-lg'>
                    <h1 className='p-3 font-semibold'>My Jobs</h1>
                    <div className='flex flex-col gap-4 p-3'>
                        <div className='flex items-center justify-between'>
                            <p>Applications Sent</p>
                            <p>9</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p>Saved Jobs</p>
                            <p>5</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p>Interviews Scheduled</p>
                            <p>2</p>
                        </div>
                    </div>
                </div>
                {/* <div className='mt-5'>
                    <Premium />
                </div> */}
            </div>
        </div>
    )
}

export default JobAnalysis