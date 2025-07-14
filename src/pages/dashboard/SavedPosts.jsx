
import { Premium } from '../../components/dashboard/home/EventsHome'
import Profile from '../../components/dashboard/home/Profile'
import SavedPost from '../../components/dashboard/home/SavedPost'

function SavedPosts() {
    return (
        <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
            <div className='md:col-span-4 lg:col-span-3'>
                <Profile />
            </div>
            <div className='col-span-12 md:col-span-8 lg:col-span-6'>
                <SavedPost />
            </div>
            <div className='md:hidden lg:block lg:col-span-3'>
                <Premium />
            </div>
        </div>
    )
}

export default SavedPosts