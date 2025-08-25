import React from 'react'
import Settings from '../../components/Activity/Settings'
import Profile from '../../components/dashboard/home/Profile'
import SettingSidebar from '../../components/Activity/SettingSidebar'

function Setting() {
    return (
        <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
            <div className='md:col-span-4 lg:col-span-3'>
                <SettingSidebar />
            </div>
            <div className='col-span-12 md:col-span-8 lg:col-span-9'>
                <Settings />
            </div>
        </div>
    )
}

export default Setting