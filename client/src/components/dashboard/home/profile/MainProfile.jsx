import React, { useState } from 'react'
import { Camera, Clock, Edit, Info, Video, VideoIcon, Videow } from '../../../../icons/icon'
//import SocialMediaToolbar from '../LiveStream'
import ProfileTabs from './ProfileTab'
import { Edit2 } from 'lucide-react'
import ProjectFormModal from './FormModal'
import { Button } from '@chakra-ui/react'
import ReusableModal from './ModalDesign'

const MainProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const[error, setError] = useState(null)

    // const [isModalOpen, setIsModalOpen] = useState(false)

    // const handleOpenModal = () => {
    //     setIsModalOpen(true)
    // }

    // const handleCloseModal = () => {
    //     setIsModalOpen(false)
    // }

    const handleSubmit = (data) => {
        console.log("Form submitted with data:", data)
        // Process the form data here
    }



    const EditComponent = ({ ModalComponent, isOpen, onClose }) => {
        return (
            <ModalComponent isOpen={isOpen} onClose={onClose} title="Edit Profile Details">
                <form>
                    <label htmlFor="fname" className='block text-sm font-medium text-gray-700'>First name:</label>
                    <input type="text" id="fname" name="fname" placeholder='First Name' className='block w-full px-3 py-2 mt-1 text-sm text-gray-700 border border-gray-300 rounded-md' />
                    {/* error */}
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                    <label htmlFor="lname" className='block mt-4 text-sm font-medium text-gray-700'>Last name:</label>
                    <input type="text" id="lname" name="lname" placeholder='Last Name' className='block w-full px-3 py-2 mt-1 text-sm text-gray-700 border border-gray-300 rounded-md' />
                    {/* error */}
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                    <label htmlFor="middlename" className='block mt-4 text-sm font-medium text-gray-700'>Middle name:</label>
                    <input type="text" id="middlename" name="middlename" placeholder='Middle Name' className='block w-full px-3 py-2 mt-1 text-sm text-gray-700 border border-gray-300 rounded-md' />
                    {/* error */}
                    {error && <p className='text-red-500 text-sm'>{error}</p>}
                    {/* summary */}
                    <label htmlFor="summary" className='block mt-4 text-sm font-medium text-gray-700'>Summary:</label>
                    <textarea id="summary" name="summary" placeholder='Summary' className='block w-full px-3 py-2 mt-1 text-sm text-gray-700 border border-gray-300 rounded-md' rows="1"></textarea>
                    <button type="submit" className="w-full text-white bg-[#5b9a68] p-2 rounded-lg mt-5">Save</button>
                </form>
            </ModalComponent>
        );
    };
    return (
        <div>
            <div className='bg-white  p-1 border border-gray-300 rounded-lg'>
                <div className='relative'>
                    <div className='absolute top-2 right-2'>
                        <Camera />
                    </div>
                    <img src="/images/bg-profile.png" alt="cover photo" className='w-full md:h-[220px]' />
                </div>
                <div className='flex justify-between'>
                    <div className='z-10'>
                        <img src="/images/profile.png" alt="profile picture"
                            className='rounded-full w-32 h-auto mt-[-3.7rem] ml-3' />
                        <img src="/images/active-icon.png" alt="Active" className='ml-28 -mt-8' />
                    </div>
                    {/* modal here */}
                    <EditComponent ModalComponent={ReusableModal} isOpen={openModal} onClose={() => setOpenModal(false)} />
                    <Button onClick={() => setOpenModal(true)} className='rounded-lg border border-[#5DA05D] md:px-4 px-2 mt-2 flex items-center gap-1 md:h-10 h-7'>
                        <Edit className='text-[#5DA05D] h-4 w-4' /> <p className='text-[#5DA05D] md:text-sm text-xs'>Edit Profile</p>
                    </Button>
                    {/* <ProjectFormModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} /> */}
                </div>
                <div className='mt-6'>
                    <h1 className='text-xl font-bold'>
                        John Smith
                    </h1>
                    <p className='text-xs md:text-lg'>
                        BSc, MSc(UK), MSc(USA), PSM I (in view) | Full Stack Development | Scrum Master | Product Management | Agile Methodology Implementation | Process Improvement | Business Analysis | Project Management | Database Administration | Data Analysis
                    </p>
                    <p className='text-slate-500 font-thin'>
                        New York, USA
                    </p>
                </div>
                <hr className='my-3' />
                <div>
                    <div className='flex justify-between'>
                        <p className='text-lg font-semibold'>
                            Video Intro
                        </p>
                        <div className='flex items-center gap-2'>
                            <Info /><span className='text-[#5DA05D]'>See Guide</span>
                        </div>
                    </div>
                    <img src="/images/video1.png" alt="video stream" />
                    {/* <VideoIcon /> */}
                    <button className='flex items-center gap-2 text-white bg-[#5DA05D] p-2 rounded-lg mt-2'>
                        <div className='text-white bg-[#5DA05D]'> <Videow /></div>
                        <p>Start Recording</p>
                    </button>
                </div>
            </div>
            <ProfileTabs />
        </div>
    )
}
export default MainProfile