import React from 'react'
import NewsLetters from '../../components/Activity/NewsLetters'
import Profile from '../../components/dashboard/home/Profile'

function NewsLetter() {
    return (
        <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
            <div className='md:col-span-4 lg:col-span-3'>
                <Profile />
            </div>
            <div className='col-span-12 md:col-span-8 lg:col-span-9'>
                <NewsLetters />
            </div>
        </div>
    )
}

export default NewsLetter