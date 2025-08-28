
import { Premium } from '../../components/dashboard/home/EventsHome'
import Profile from '../../components/dashboard/home/Profile'
import Saved from '../../components/dashboard/home/Saved'

function AllSaved() {
    return (
        <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
            <div className='md:col-span-4 lg:col-span-3 hidden md:block'>
                <div className="sticky top-20">
                    <Profile />
                </div>
            </div>
            <div className='col-span-12 md:col-span-8 lg:col-span-9'>
                <Saved />
            </div>
        </div>
    )
}

export default AllSaved