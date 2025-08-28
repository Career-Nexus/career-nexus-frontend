import HelpSidebar from "../../components/Activity/HelpSidebar"
import Glossary from "../../components/Activity/Glossary"

function Glossarys() {
    return (
        <div className='grid grid-cols-12 md:gap-8 p-4 md:px-5  lg:px-12 md:py-8'>
            <div className='col-span-12 md:col-span-4 lg:col-span-3 mb-5'>
                <HelpSidebar />
            </div>
            <div className='col-span-12 md:col-span-8 lg:col-span-9 mb-12'>
                <Glossary />
            </div>
        </div>
    )
}

export default Glossarys