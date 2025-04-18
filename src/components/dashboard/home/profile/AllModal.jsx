import { useForm } from "react-hook-form";
import { Camera } from "../../../../icons/icon";
import { useRef, useState } from "react";

export const EditComponent = ({ ModalComponent, isOpen, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log('Form submitted:', data);
    };

    return (
        <ModalComponent isOpen={isOpen} onClose={onClose} title="Edit Profile Details">

            <div className="max-w-4xl mx-auto bg-white rounded-lg">

                {/* Video Intro */}
                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">Video Intro</label>
                    <div className="flex items-center gap-4">
                        <div>
                            <img src="/images/video1.png" alt="video stream" className="w-60" />
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
                            className="w-full px-3 py-1 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
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
                            className="w-full px-3 py-1 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
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
                            className="w-full px-3 py-1 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
                    </div>

                    {/* Education */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                        <input
                            type="text"
                            defaultValue="Bsc in computer science"
                            className="w-full px-3 py-1 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
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
                            className="w-full px-3 py-1 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                        />
                    </div>

                    {/* Current Position */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Position</label>
                        <input
                            type="text"
                            defaultValue="Manager"
                            className="w-full px-3 py-1 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                        />
                    </div>

                    {/* Bio */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                        <textarea
                            rows={3}
                            defaultValue={`Experienced in Full Stack Development, Product & Project Management, and Agile Implementation, with strong expertise in Scrum, Business Analysis, Process Improvement, Database Administration, and Data Analysis.`}
                            {...register("bio")}
                            className="w-full resize-none px-3 py-1 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
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
export const ExperienceModal = ({ ModalComponent, isOpen, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission logic
    };
    return (
        <ModalComponent isOpen={isOpen} onClose={onClose} title="Add Experience">
            <div className="max-w-xl mx-auto bg-white">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Job Title */}
                    <div>
                        <label className="block font-medium mb-1">
                            Job Title<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("jobTitle", { required: "This field is required" })}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="Enter project title"
                        />
                        {errors.jobTitle && (
                            <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
                        )}
                    </div>

                    {/* Company Name */}
                    <div>
                        <label className="block font-medium mb-1">Company Name</label>
                        <input
                            type="text"
                            {...register("companyName")}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="Enter company’s name e.g Walmart"
                        />
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block font-medium mb-1">Start Date</label>
                        <input
                            type="month"
                            {...register("startDate")}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="e.g Aug 2018"
                        />
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block font-medium mb-1">End Date</label>
                        <input
                            type="month"
                            {...register("endDate")}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="e.g Aug 2018"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block font-medium mb-1">Location</label>
                        <input
                            type="text"
                            {...register("location")}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="e.g Texas"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium mb-1">Description</label>
                        <textarea
                            {...register("description")}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="Describe your role and achievements"
                            rows={1}
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#5DA05D] text-white py-2 rounded hover:bg-[#5DA05D] transition"
                    >
                        Save
                    </button>
                </form>
            </div>
        </ModalComponent>
    )
}
export const EducationModal = ({ ModalComponent, isOpen, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission logic
    };
    return (
        <ModalComponent isOpen={isOpen} onClose={onClose} title="Add Education">
            <div className="max-w-xl mx-auto bg-white">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="block font-medium mb-1">
                            Field of Study<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("fieldOfStudy", { required: "This field is required" })}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="e.g Computer science"
                        />
                        {errors.fieldOfStudy && (
                            <p className="text-red-500 text-sm mt-1">{errors.fieldOfStudy.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">
                            Institution<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("institution", { required: "This field is required" })}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="Enter Provider"
                        />
                        {errors.institution && (
                            <p className="text-red-500 text-sm mt-1">{errors.institution.message}</p>
                        )}
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block font-medium mb-1">
                            Start Date<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="month"
                            {...register("startDate", { required: "This field is required" })}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="e.g Aug 2018"
                        />
                        {errors.startDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>
                        )}
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block font-medium mb-1">
                            End Date<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="month"
                            {...register("endDate", { required: "This field is required" })}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="e.g Aug 2018"
                        />
                        {errors.endDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>
                        )}
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block font-medium mb-1">
                            Location<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("location", { required: "This field is required" })}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="e.g Texas"
                        />
                        {errors.location && (
                            <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium mb-1">Description</label>
                        <textarea
                            {...register("description")}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="Describe your role and achievements"
                            rows={1}
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#5DA05D] text-white py-2 rounded hover:bg-[#5DA05D] transition"
                    >
                        Save
                    </button>
                </form>
            </div>
        </ModalComponent>
    )
}
export const CertificationModal = ({ ModalComponent, isOpen, onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission logic
    };
    return (
        <ModalComponent isOpen={isOpen} onClose={onClose} title="Add Certification">
            <div className="max-w-xl mx-auto bg-white">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="block font-medium mb-1">
                            Certification Title<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("certTitle", { required: "This field is required" })}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="Enter Certification Title"
                        />
                        {errors.certTitle && (
                            <p className="text-red-500 text-sm mt-1">{errors.certTitle.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Provider</label>
                        <input
                            type="text"
                            {...register("provider")}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="Enter Provider"
                        />
                    </div>

                    {/* Date */}
                    <div>
                        <label className="block font-medium mb-1">Issue Date</label>
                        <input
                            type="text"
                            {...register("issueDate")}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="Enter Issue Date"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Credential ID</label>
                        <input
                            type="text"
                            {...register("credentialId")}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="Enter Credential ID"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium mb-1">Associated Skills</label>
                        <textarea
                            {...register("associatedSkills")}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="Enter AssociatedSkills"
                            rows={1}
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#5DA05D] text-white py-2 rounded hover:bg-[#5DA05D] transition"
                    >
                        Save
                    </button>
                </form>
            </div>
        </ModalComponent>
    )
}

export const AddProjectModal = ({ ModalComponent, isOpen, onClose }) => {
    const [fileName, setFileName] = useState("No file chosen")
    const fileInputRef = useRef(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Handle form submission logic
    };


    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        setFileName(file ? file.name : "No file chosen")
    }

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }
    return (
        <ModalComponent isOpen={isOpen} onClose={onClose} title="Add Project">
            <div className="max-w-xl mx-auto bg-white">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    <div>
                        <label className="block font-medium mb-1">
                            Title<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("title", { required: "This field is required" })}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="Enter Project Title"
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium mb-1">
                            Description<span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register("description", { required: "This field is required" })}
                            className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                            placeholder="Enter Project Description"
                            rows={1}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div>
                        <div className="w-full max-w-md">
                            <div className="text-sm mb-2">Upload Image</div>
                            <div className="flex items-center border border-gray-200 rounded-md bg-gray-50 p-1">
                                <button
                                    type="button"
                                    onClick={handleButtonClick}
                                    className="bg-green-100 text-gray-700 px-4 py-1 text-sm rounded hover:bg-green-200 focus:outline-none"
                                >
                                    Choose File
                                </button>
                                <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                <span className="ml-3 text-sm text-gray-500">{fileName}</span>
                            </div>
                        </div>
                    </div>
                    {/* Save Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#5DA05D] text-white py-2 rounded hover:bg-[#5DA05D] transition"
                    >
                        Save
                    </button>
                </form>
            </div>
        </ModalComponent>
    )
}