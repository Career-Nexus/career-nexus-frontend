import React from 'react'
import Settings from '../../components/Activity/Settings'
import Profile from '../../components/dashboard/home/Profile'
import SettingSidebar from '../../components/Activity/SettingSidebar'

function Setting() {
    return (
         <div className="grid grid-cols-12 md:gap-8 p-4 md:px-5 lg:px-12 md:py-8">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-4 lg:col-span-3 mb-5">
                <div className="sticky top-20">
                    <SettingSidebar />
                </div>
            </div>

            {/* Main content */}
            <div className="col-span-12 md:col-span-8 lg:col-span-9 mb-12">
                <Settings />
            </div>
        </div>
    )
}

export default Setting