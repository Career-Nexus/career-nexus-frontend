import React, { useContext, useState } from 'react'
import { Edit } from '../../../../icons/icon'
import ProfileTabs from './ProfileTab'
import { Button } from '@chakra-ui/react'
import ReusableModal from './ModalDesign'
import { BriefcaseBusiness, GraduationCap, MapPin, Camera, Video } from 'lucide-react'
import { EditComponent } from './AllModal'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../../context/UserContext'
import { useForm } from 'react-hook-form'
const ProfileCover = () => {
    const { user, updateUser, loading } = useContext(UserContext);
    const navigate = useNavigate();
    const [isCoverHovered, setIsCoverHovered] = useState(false);
    const [isProfileHovered, setIsProfileHovered] = useState(false);
    // const [success, setSuccess] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const profilePhoto = watch("profile_photo");
    const coverPhoto = watch("cover_photo");

    const onSubmit = async (data) => {
        try {
            const profileFile = data.profile_photo?.[0];
            const coverFile = data.cover_photo?.[0];
            console.log("Submitting files:", { profileFile, coverFile }); // Debug log

            const formData = new FormData();
            if (profileFile instanceof File) {
                formData.append("profile_photo", profileFile);
            }
            if (coverFile instanceof File) {
                formData.append("cover_photo", coverFile);
            }

            // Log FormData contents
            for (const [key, value] of formData.entries()) {
                console.log(`FormData entry: ${key}=${value.name || value}`);
            }

            await updateUser({}, formData);
            // setSuccess("Image updated successfully");
            setErrorMessage(null);
            reset({ profile_photo: null, cover_photo: null }); // Reset only file inputs
            setTimeout(() => navigate("/profilepage"), 2000);
        } catch (err) {
            console.error("Submission error:", err); // Debug log
            setSuccess(null);
            setErrorMessage(err.message || "Error updating image");
        }
    };

    return (
        <div className="relative">
            <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
                className="relative w-full h-48"
                onMouseEnter={() => setIsCoverHovered(true)}
                onMouseLeave={() => setIsCoverHovered(false)}
            >
                <img
                    src={user.cover_photo || "/images/bg-profile.png"}
                    alt="cover photo"
                    className="w-full h-48 object-cover rounded-tl-lg rounded-tr-lg"
                    onError={(e) => (e.target.src = "/images/bg-profile.png")} // Fallback on error
                />
                {isCoverHovered && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center transition-opacity duration-200 rounded-tl-lg rounded-tr-lg">
                        <Camera className="text-white w-10 h-10 mb-2" />
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg"
                            {...register("cover_photo", {
                                validate: {
                                    validType: (files) =>
                                        !files[0] ||
                                        ["image/jpeg", "image/png", "image/jpg"].includes(files[0].type)
                                            ? true
                                            : "Please select a valid image file (jpeg, png, jpg)",
                                    validSize: (files) =>
                                        !files[0] || files[0].size <= 1024 * 1024 * 5
                                            ? true
                                            : "File size exceeds 5MB limit",
                                },
                            })}
                            className="text-white text-sm mb-2 cursor-pointer"
                        />
                        {errors.cover_photo && (
                            <p className="text-red-500 text-sm mb-2">{errors.cover_photo.message}</p>
                        )}
                        {coverPhoto && (
                            <button
                                type="submit"
                                disabled={loading}
                                className={`px-3 py-1 rounded-md text-white font-normal transition-colors duration-200 ${
                                    loading
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-[#5DA05D] hover:bg-[#4D8A4D]"
                                }`}
                            >
                                {loading ? "Uploading..." : "Submit"}
                            </button>
                        )}
                    </div>
                )}
                <div
                    className="relative w-32 h-32"
                    onMouseEnter={() => setIsProfileHovered(true)}
                    onMouseLeave={() => setIsProfileHovered(false)}
                >
                    <img
                        src={user.profile_photo || "/images/profile.png"}
                        alt="profile picture"
                        className="rounded-full w-32 h-32 mt-[-3.7rem] ml-3 object-cover"
                        onError={(e) => (e.target.src = "/images/profile.png")} // Fallback on error
                    />
                    {isProfileHovered && (
                        <div className="absolute inset-0 rounded-full w-32 h-32 ml-3 bg-black/70 flex flex-col items-center justify-center transition-opacity duration-200">
                            <Camera className="text-white w-8 h-8 mb-2" />
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg"
                                {...register("profile_photo", {
                                    validate: {
                                        validType: (files) =>
                                            !files[0] ||
                                            ["image/jpeg", "image/png", "image/jpg"].includes(files[0].type)
                                                ? true
                                                : "Please select a valid image file (jpeg, png, jpg)",
                                        validSize: (files) =>
                                            !files[0] || files[0].size <= 1024 * 1024 * 5
                                                ? true
                                                : "File size exceeds 5MB limit",
                                    },
                                })}
                                className="text-white text-xs rounded-lg mb-2 cursor-pointer w-24 h-8"
                            />
                            {errors.profile_photo && (
                                <p className="text-red-500 text-sm mb-2">{errors.profile_photo.message}</p>
                            )}
                            {profilePhoto && (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`px-2 py-1 rounded-md text-white text-xs transition-colors duration-200 ${
                                        loading
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-[#5DA05D] hover:bg-[#4D8A4D]"
                                    }`}
                                >
                                    {loading ? "Uploading..." : "Submit"}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </form>
            {/* {success && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md">
                    {success}
                </div>
            )} */}
            {errorMessage && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-md">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

const MainProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const { user, loading, error } = useContext(UserContext);

    return (
        <div>
            <div className="bg-white p-1 border border-gray-300 rounded-lg">
                <ProfileCover />
                <div className="flex justify-between items-start px-3">
                    <div />
                    <Button
                        onClick={() => setOpenModal(true)}
                        className="rounded-lg border border-[#5DA05D] md:px-4 px-2 mt-2 flex items-center gap-1 md:h-10 h-7"
                    >
                        <Edit className="text-[#5DA05D] h-4 w-4" />
                        <p className="text-[#5DA05D] md:text-sm text-xs">Edit Profile</p>
                    </Button>
                </div>
                <hr className="my-3" />
                <div className="mt-6 flex items-center gap-32 px-3">
                    <div>
                        <h1 className="text-xl font-bold">{user.name}</h1>
                        <p className="text-xs md:text-sm my-3">{user.bio}</p>
                        <p className="text-slate-500 font-thin flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {user.location} <BriefcaseBusiness className="w-4 h-4" /> {user.position}
                        </p>
                        <p className="text-slate-500 font-thin flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" /> {user.qualification}
                        </p>
                        <p className="my-3">
                            <span className="text-[#5DA05D] mr-2">{user.followings}</span> Following
                            <span className="text-[#5DA05D] mx-2">{user.followers}</span> Followers
                        </p>
                    </div>
                    <div>
                        <img src="/images/video1.png" alt="video stream" />
                        {/* <img src={user.intro_video} alt="video stream" /> */}
                    </div>
                </div>
            </div>
            <Link to={"/person-profile"}>Person Profile</Link>
            <ProfileTabs />
            <EditComponent
                ModalComponent={ReusableModal}
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
            />
        </div>
    );
};

export default MainProfile;
