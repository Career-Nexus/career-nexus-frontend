import React, { useState } from 'react'
import { Camera, Clock, Edit, Info, Video, VideoIcon, Videow } from '../../../../icons/icon'
//import SocialMediaToolbar from '../LiveStream'
import ProfileTabs from './ProfileTab'
import { Button } from '@chakra-ui/react'
import ReusableModal from './ModalDesign'
import { useForm } from 'react-hook-form';
import { BriefcaseBusiness, GraduationCap, MapPin } from 'lucide-react'

const MainProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log('Form submitted:', data);
    };



    const EditComponent = ({ ModalComponent, isOpen, onClose }) => {

        return (
            <ModalComponent isOpen={isOpen} onClose={onClose} title="Edit Profile Details">

                <div className="max-w-4xl mx-auto bg-white rounded-lg">

                    {/* Video Intro */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Video Intro</label>
                        <div className="flex items-center gap-4">
                            <div className="w-48 h-32 bg-gray-200 flex items-center justify-center rounded-md">
                                <button className="text-gray-600 text-2xl">&#9658;</button>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="bg-green-100 text-green-700 border border-green-500 px-4 py-1 rounded hover:bg-green-200">
                                    📹 Record
                                </button>
                                <button className="bg-red-100 text-red-700 border border-red-500 px-4 py-1 rounded hover:bg-red-200">
                                    🗑️ Remove
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Enter full name"
                                {...register("firstName", { required: "First name is required" })}
                                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-green-200"
                            />
                            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue="Lagos"
                                {...register("location", { required: "Location is required" })}
                                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-green-200"
                            />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                defaultValue="Smith"
                                {...register("lastName", { required: "Last name is required" })}
                                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-green-200"
                            />
                            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                        </div>

                        {/* Education */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                            <input
                                type="text"
                                defaultValue="Bsc in computer science"
                                className="w-full border bg-gray-100 rounded-md px-4 py-2"
                            />
                        </div>

                        {/* Middle Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Middle name <span className="text-gray-400">(optional)</span>
                            </label>
                            <input
                                type="text"
                                {...register("middleName")}
                                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-green-200"
                            />
                        </div>

                        {/* Current Position */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Position</label>
                            <input
                                type="text"
                                defaultValue="Manager"
                                className="w-full border bg-gray-100 rounded-md px-4 py-2"
                            />
                        </div>

                        {/* Bio */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                            <textarea
                                defaultValue={`Experienced in Full Stack Development, Product & Project Management, and Agile Implementation, with strong expertise in Scrum, Business Analysis, Process Improvement, Database Administration, and Data Analysis.`}
                                {...register("bio")}
                                className="w-full border rounded-md px-4 py-2 min-h-[100px] resize-none"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="md:col-span-2 flex justify-end gap-4">
                            <button
                                onClick={onClose}
                                type="button"
                                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#5DA05D] text-white rounded-md hover:bg-[#5DA05D]"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
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
                <hr className='my-3' />
                <div className='mt-6 flex items-center gap-32'>
                    <div>
                        <h1 className='text-xl font-bold'>
                            John Smith
                        </h1>
                        <p className='text-xs md:text-sm my-3'>
                            Skilled in Full Stack Development, Agile Project Management, and Data Analysis.
                        </p>
                        <p className='text-slate-500 font-thin flex items-center gap-2'>
                            <MapPin className='w-4 h-4'/> USA <BriefcaseBusiness className='w-4 h-4'/> Software Engineer at TechCorp
                        </p>
                        <p className='text-slate-500 font-thin flex items-center gap-2'>
                            <GraduationCap className='w-4 h-4'/> B.Sc in Computer Science
                        </p>
                        <p className='my-3'>
                            <span className='text-[#5DA05D] mr-2'>500</span> Following
                            <span className='text-[#5DA05D] mx-2'>6,476</span> Followers
                        </p>
                    </div>
                    <div>
                        {/* <div className='flex justify-between'>
                            <p className='text-lg font-semibold'>
                                Video Intro
                            </p>
                            <div className='flex items-center gap-2'>
                                <Info /><span className='text-[#5DA05D]'>See Guide</span>
                            </div>
                        </div> */}
                        <img src="/images/video1.png" alt="video stream" />
                        {/* <VideoIcon /> */}
                        {/* <button className='flex items-center gap-2 text-white bg-[#5DA05D] p-2 rounded-lg mt-2'>
                            <div className='text-white bg-[#5DA05D]'> <Videow /></div>
                            <p>Start Recording</p>
                        </button> */}
                    </div>
                </div>


            </div>
            <ProfileTabs />
        </div>
    )
}
export default MainProfile