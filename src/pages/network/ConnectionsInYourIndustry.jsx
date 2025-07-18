import ConnectionInUserIndustry from "../../components/dashboard/network/ConnectionInUserIndustry"
import SideBar from "../../components/dashboard/network/Sidebar"

function ConnectionsInYourIndustry() {
  return (
    <div>
      <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
                <div className='col-span-4 md:col-span-4 lg:col-span-3'>
                    <SideBar />
                </div>
                <div className='col-span-8 md:col-span-8 lg:col-span-9'>
                    <ConnectionInUserIndustry />
                </div>
            </div>
    </div>
  )
}

export default ConnectionsInYourIndustry