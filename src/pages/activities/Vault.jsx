import React from 'react'
import Profile from '../../components/dashboard/home/Profile'
import NexusVault from '../../components/Activity/NexusVault'

function Vault() {
  return (
    <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
            <div className='col-span-12 md:col-span-4 lg:col-span-3 hidden md:block mb-5'>
                <div className='sticky top-20'>
                  <Profile />
                </div>
            </div>
            <div className='col-span-12 md:col-span-8 lg:col-span-9 mb-12'>
                <NexusVault />
            </div>
        </div>
  )
}

export default Vault