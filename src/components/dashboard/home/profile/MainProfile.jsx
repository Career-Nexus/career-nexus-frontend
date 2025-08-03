import React, { useContext, useEffect, useState } from 'react'
import { Edit } from '../../../../icons/icon'
import ProfileTabs from './ProfileTab'
import ReusableModal from './ModalDesign'
import { BriefcaseBusiness, GraduationCap, MapPin, Camera, Check, UserCircle2, ArrowRight, Pencil, NotepadText, VideoIcon } from 'lucide-react'
import { EditComponent } from './AllModal'
import { UserContext } from '../../../../context/UserContext'
import { useForm } from 'react-hook-form'
import { toast } from "react-toastify";
import { PostService } from '../../../../api/PostService'
import { Link } from 'react-router-dom'

const ProfileCover = () => {
    const { user, updateUser } = useContext(UserContext);
    const [isCoverHovered, setIsCoverHovered] = useState(false);
    const [isProfileHovered, setIsProfileHovered] = useState(false);
    const [previewCover, setPreviewCover] = useState(null);
    const [previewProfile, setPreviewProfile] = useState(null);

    const { register, reset } = useForm();

    const handleFileChange = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        // Show local preview
        if (field === "cover") {
            setPreviewCover(URL.createObjectURL(file));
        } else if (field === "profile") {
            setPreviewProfile(URL.createObjectURL(file));
        }

        try {
            const formData = new FormData();
            if (field === "cover") {
                formData.append("cover_photo", file);
            } else {
                formData.append("profile_photo", file);
            }

            await updateUser({}, formData);

            toast.success(`${field === "cover" ? "Cover" : "Profile"} photo updated!`, {
                position: "top-center",
                // autoClose: 3000,
            });

            reset();
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Error updating image", {
                position: "top-center",
                //autoClose: 4000,
            });
        }
    };

    return (
        <div className="relative">
            {/* Cover */}
            <div
                className="relative w-full h-48 overflow-hidden rounded-tl-lg rounded-tr-lg"
                onMouseEnter={() => setIsCoverHovered(true)}
                onMouseLeave={() => setIsCoverHovered(false)}
            >
                <img
                    src={previewCover || user.cover_photo || "/images/bg-profile.png"}
                    alt="cover photo"
                    className="w-full h-full object-cover object-center"
                    onError={(e) => (e.target.src = "/images/bg-profile.png")}
                />
                {isCoverHovered && (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
                        <label htmlFor="coverInput" className="cursor-pointer">
                            <Camera className="text-white w-10 h-10 mb-2" />
                        </label>
                        <input
                            id="coverInput"
                            type="file"
                            accept="image/jpeg,image/png,image/jpg"
                            style={{ display: "none" }}
                            {...register("cover_photo")}
                            onChange={(e) => handleFileChange(e, "cover")}
                        />
                    </div>
                )}
            </div>

            {/* Profile */}
            <div
                className="relative w-32 h-32"
                onMouseEnter={() => setIsProfileHovered(true)}
                onMouseLeave={() => setIsProfileHovered(false)}
            >
                <img
                    src={previewProfile || user.profile_photo || "/images/profile.png"}
                    alt="profile"
                    className="rounded-full w-32 h-32 mt-[-3.7rem] ml-3 object-cover"
                    onError={(e) => (e.target.src = "/images/profile.png")}
                />
                {isProfileHovered && (
                    <div className="absolute inset-0 rounded-full w-32 h-32 ml-3 bg-black/70 flex flex-col items-center justify-center">
                        <label htmlFor="profileInput" className="cursor-pointer">
                            <Camera className="text-white w-8 h-8 mb-2" />
                        </label>
                        <input
                            id="profileInput"
                            type="file"
                            accept="image/jpeg,image/png,image/jpg"
                            style={{ display: "none" }}
                            {...register("profile_photo")}
                            onChange={(e) => handleFileChange(e, "profile")}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};



const MainProfile = () => {
    const [openModal, setOpenModal] = useState(false);
    const { user, loading } = useContext(UserContext);
    const [profileCompletion, setProfileCompletion] = useState(0);

    const handleCompletionChange = (completion) => {
        setProfileCompletion(completion);
        if (completion === 100) {
            setIsModalOpen(false); // Hide WelcomeModal when completion is 100%
        }
    };
    //   if (loading) {
    //     return (
    //       <div className="flex items-center justify-center h-48">
    //         <p>Loading profile...</p>
    //       </div>
    //     );
    //   }

    return (
        <div>
            <div className="bg-white p-1 border border-gray-300 rounded-lg">
                <ProfileCover />
                <div className="flex justify-end px-3 mt-[-30px]">
                    <button
                        onClick={() => setOpenModal(true)}
                        className="rounded-lg border-2 border-[#5DA05D] hover:bg-green-100 md:px-4 px-2 mt-2 flex items-center gap-1 md:h-10 h-7"
                    >
                        <Edit className="text-[#5DA05D] h-4 w-4" />
                        <p className="text-[#5DA05D] md:text-sm text-xs">Edit Profile</p>
                    </button>
                </div>

                <hr className="my-3" />

                <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between px-3 gap-6">
                    <div>
                        <h1 className="text-3xl font-bold">
                            {user?.first_name} {user?.last_name}
                        </h1>

                        {user?.bio && (
                            <p className="text-sm md:text-lg my-3">{user.bio}</p>
                        )}

                        <p className="text-slate-500 font-thin flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {user?.location}
                            <BriefcaseBusiness className="w-4 h-4 ml-4" />
                            {user?.position}
                        </p>

                        <p className="text-slate-500 font-thin flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" />
                            {user?.qualification}
                        </p>

                        <p className="my-3">
                            <span className="text-[#5DA05D] mr-2">{user?.followings}</span> Following
                            <span className="text-[#5DA05D] mx-2">{user?.followers}</span> Followers
                        </p>
                    </div>

                    <div className='flex justify-between float-end'>
                        {user?.intro_video ? (
                            <video
                                src={user.intro_video}
                                controls
                                className="rounded-lg max-w-xs"
                            />
                        ) : (
                            <img
                                src="/images/video1.png"
                                alt="video stream"
                                className="rounded-lg max-w-xs"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* <div className="px-3 my-4">
                <Link
                    to={"/person-profile"}
                    className="text-[#5DA05D] underline text-sm"
                >
                    Go to Person Profile
                </Link>
            </div> */}

            {profileCompletion < 100 && <ProfileProgressDropdown onCompletionChange={handleCompletionChange} />}
            
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

const ProfileProgressDropdown = ({ onCompletionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [completionData, setCompletionData] = useState({
    completion: 0,
    complete_items: [],
    incomplete_items: []
  });

  // Define profile items with mapping to API response keys
  const profileItems = [
    {
      id: 1,
      key: 'profile_photo',
      icon: <UserCircle2 className="w-5 h-5 mr-2" />,
      text: 'Upload Profile Picture',
      linkto: <Link to={'/profilepage'}><ArrowRight className="w-5 h-5" /></Link>
    },
    {
      id: 2,
      key: 'bio',
      icon: <Pencil className="w-5 h-5 mr-2" />,
      text: 'Add a Bio Description',
      linkto: <Link to={'/profilepage'}><ArrowRight className="w-5 h-5" /></Link>
    },
    {
      id: 3,
      key: 'experience',
      icon: <NotepadText className="w-5 h-5 mr-2" />,
      text: 'Add Work Experience',
      linkto: <Link to={'/profilepage'}><ArrowRight className="w-5 h-5" /></Link>
    },
    {
      id: 4,
      key: 'education',
      icon: <GraduationCap className="w-5 h-5 mr-2" />,
      text: 'Add Educational Background',
      linkto: <Link to={'/profilepage'}><ArrowRight className="w-5 h-5" /></Link>
    },
    {
      id: 5,
      key: 'intro_video',
      icon: <VideoIcon className="w-5 h-5 mr-2" />,
      text: 'Upload Video Introduction',
      linkto: <Link to={'/profilepage'}><ArrowRight className="w-5 h-5" /></Link>
    },
    {
      id: 6,
      key: 'certification',
      icon: <NotepadText className="w-5 h-5 mr-2" />,
      text: 'Add Certifications',
      linkto: <Link to={'/profilepage'}><ArrowRight className="w-5 h-5" /></Link>
    },
  ];

  useEffect(() => {
    const fetchProfileCompletion = async () => {
      try {
        const result = await PostService.getProfileCompletion();
        console.log("Profile completion response:", result);
        setCompletionData(result);
        onCompletionChange(result.completion); // Notify parent of completion percentage
      } catch (error) {
        console.error("Error fetching profile completion:", error);
        onCompletionChange(0); // Fallback to 0% on error
      }
    };
    fetchProfileCompletion();
  }, [onCompletionChange]);

  // Hide dropdown if completion is 100%
  if (completionData.completion === 100) {
    return null;
  }

  return (
    <div className="relative w-full max-w-3xl my-3">
      <div
        className="flex items-center justify-between p-4 bg-white border rounded-lg shadow cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>COMPLETE YOUR PROFILE ({completionData.completion}%)</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <div className="w-full mt-1 bg-white border rounded-lg shadow-lg">
          <ul className="py-2">
            {profileItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <span className={completionData.complete_items.includes(item.key) ? 'text-[#5DA05D]' : 'text-gray-400'}>
                  {item.icon}
                </span>
                <span>{item.text}</span>
                <span className="ml-auto mr-4 text-gray-400">
                  {completionData.complete_items.includes(item.key) ? (
                    <Check className="w-5 h-5 text-[#5DA05D]" />
                  ) : (
                    item.linkto
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};