import React from 'react'
import NetworkCards from '../../components/dashboard/network/NetworkCards'
import SideBar from '../../components/dashboard/network/Sidebar'

function Network() {
  return (
    <div>
      <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
                <div className='col-span-12 md:col-span-4 lg:col-span-3'>
                  <div className="sticky top-20">
                    <SideBar />
                  </div>
                </div>
                <div className='col-span-12 md:col-span-8 lg:col-span-9'>
                    <NetworkCards />
                </div>
            </div>
    </div>
  )
}

export default Network