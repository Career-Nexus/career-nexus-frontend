import React, { useContext, useEffect, useState, useRef } from 'react'
import { Edit } from '../../../../icons/icon'
import ProfileTabs from './ProfileTab'
import ReusableModal from './ModalDesign'
import { BriefcaseBusiness, GraduationCap, MapPin, Camera, Check, UserCircle2, ArrowRight, Pencil, NotepadText, VideoIcon, Ellipsis, Info, CloudUpload, Loader2 } from 'lucide-react'
import { EditComponent } from './AllModal'
import { UserContext } from '../../../../context/UserContext'
import { useForm } from 'react-hook-form'
import { toast } from "react-toastify";
import { Link } from 'react-router-dom'
import { ProfileContext } from '../../../../context/ProfileContext'
import IntroVideoModal from './IntroVideo'
import { CoverPhotoPreviewModal, ProfilePhotoPreviewModal } from './ImagePreviewModal'

const ProfileCover = () => {
  const { user, updateUser } = useContext(UserContext);
  const [isCoverHovered, setIsCoverHovered] = useState(false);
  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [previewCover, setPreviewCover] = useState(null);
  const [previewProfile, setPreviewProfile] = useState(null);
  //preview image state
  const [coverPreviewImage, setCoverPreviewImage] = useState(null);
  const [profilePreviewImage, setProfilePreviewImage] = useState(null);

  const { register, reset } = useForm();
  const handleFileChange = async (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show local preview
    if (field === "cover") {
      setPreviewCover(URL.createObjectURL(file));
    } else {
      setPreviewProfile(URL.createObjectURL(file));
    }

    try {
      await updateUser({
        [field === "cover" ? "cover_photo" : "profile_photo"]: file,
      });

      toast.success(`${field === "cover" ? "Cover" : "Profile"} photo updated!`, {
        position: "top-center",
      });

      reset();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error updating image", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="relative">
      {/* Cover */}
      {/* <div
        className="relative w-full h-48 overflow-hidden rounded-tl-lg rounded-tr-lg"
        onMouseEnter={() => setIsCoverHovered(true)}
        onMouseLeave={() => setIsCoverHovered(false)}
      >
        
        <img
          src={previewCover || user.cover_photo || "/images/bg-profile.png"}
          alt="cover photo"
          className="w-full h-full object-cover object-center cursor-pointer"
          onClick={() =>
            setPreviewImage(previewCover || user.cover_photo || "/images/bg-profile.png")
          }
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
      </div> */}
      <div
        className="relative w-full h-48 overflow-hidden rounded-tl-lg rounded-tr-lg"
        onMouseEnter={() => setIsCoverHovered(true)}
        onMouseLeave={() => setIsCoverHovered(false)}
        onClick={() =>
          setCoverPreviewImage(previewCover || user.cover_photo || "/images/bg-profile.png")
        }
      >
        <img
          src={previewCover || user.cover_photo || "/images/bg-profile.png"}
          alt="cover photo"
          className="w-full h-full object-cover object-center cursor-pointer"
          onError={(e) => (e.target.src = "/images/bg-profile.png")}
        />

        {isCoverHovered && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
            <label
              htmlFor="coverInput"
              className="cursor-pointer"
              onClick={(e) => e.stopPropagation()} // ⛔ stops triggering preview
            >
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
      {/* <div
        className="relative w-32 h-32"
        onMouseEnter={() => setIsProfileHovered(true)}
        onMouseLeave={() => setIsProfileHovered(false)}
      >
        
        <img
          src={previewProfile || user.profile_photo || "/images/profile.png"}
          alt="profile"
          className="rounded-full w-32 h-32 mt-[-3.7rem] ml-3 object-cover cursor-pointer"
          onClick={() =>
            setPreviewImage(previewProfile || user.profile_photo || "/images/profile.png")
          }
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
      </div> */}
      <div
        className="relative w-32 h-32"
        onMouseEnter={() => setIsProfileHovered(true)}
        onMouseLeave={() => setIsProfileHovered(false)}
        onClick={() =>
          setProfilePreviewImage(previewProfile || user.profile_photo || "/images/profile.png")
        }
      >
        <img
          src={previewProfile || user.profile_photo || "/images/profile.png"}
          alt="profile"
          className="rounded-full w-32 h-32 mt-[-3.7rem] ml-3 object-cover cursor-pointer"
          onError={(e) => (e.target.src = "/images/profile.png")}
        />

        {isProfileHovered && (
          <div className="absolute inset-0 rounded-full w-32 h-32 ml-3 bg-black/70 flex flex-col items-center justify-center">
            <label
              htmlFor="profileInput"
              className="cursor-pointer"
              onClick={(e) => e.stopPropagation()} // ⛔ prevents preview click
            >
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

      <CoverPhotoPreviewModal
        open={!!coverPreviewImage}
        onClose={() => setCoverPreviewImage(null)}
        image={coverPreviewImage}
      //isProfile={coverPreviewImage === userwithid?.profile_photo}
      />
      <ProfilePhotoPreviewModal
        open={!!profilePreviewImage}
        onClose={() => setProfilePreviewImage(null)}
        image={profilePreviewImage}
      />

    </div>
  );
};



const MainProfile = () => {
  const [openModal, setOpenModal] = useState(false);
  const { user, loading, updateUser } = useContext(UserContext);
  const { profileCompletion, setProfileCompletion } = useContext(ProfileContext);
  const [openIntroVideo, setOpenIntroVideo] = useState(false);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleCompletionChange = (completion) => {
    setProfileCompletion(completion); // shared state
  };

  const handleResumeUpload = async () => {
    if (!file) return;

    try {
      const payload = {
        resume: file,   // 👈 Your provider already handles FormData
      };

      await updateUser(payload);
      toast.success("Resume uploaded successfully!");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload resume");
    }
  };

  return (
    <div className='mb-20'>
      <div className="bg-white p-1 border border-gray-300 rounded-lg">
        <div><ProfileCover /></div>
        <div className='flex justify-end gap-4'>
          <div className="flex flex-col md:flex-row mt-4 gap-3 px-3">
            {/* Intuitive upload input */}
            <div>
              <label className="w-full cursor-pointer">
                <div className="flex items-center justify-between gap-3 border border-dashed border-gray-400 rounded-lg px-2 py-3 hover:bg-gray-50 transition">
                  <div className="flex items-center gap-3">
                    <CloudUpload className="h-5 w-5 text-gray-500" />
                    <span className="text-[12px] text-gray-600">
                      {file ? file.name : "Choose a resume file (PDF, DOC, DOCX)"}
                    </span>
                  </div>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-700">
                    Browse
                  </span>
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  ref={fileInputRef}
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            {/* Upload button */}
            <div className="flex md:justify-end">
              <button
                onClick={handleResumeUpload}
                disabled={loading || !file}
                className="flex items-center gap-2 text-xs rounded-lg border-2 text-[#5DA05D] border-[#5DA05D] hover:bg-green-100 px-3 py-2 md:px-4 md:py-2 md:h-10 h-9 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Uploading...
                  </>
                ) : (
                  <>
                    <CloudUpload className="h-5 w-5" />
                    Upload Resume
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end px-3 mt-4">
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 rounded-lg border-2 border-[#5DA05D] hover:bg-green-100 px-3 py-2 md:px-4 md:py-2 md:h-10 h-9 cursor-pointer transition"
            >
              <Edit className="text-[#5DA05D] h-5 w-5" />
              <span className="text-[#5DA05D] md:text-sm text-xs">Edit Profile</span>
            </button>
          </div>
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
            <p className='text-slate-500 font-thin mt-1'>Your industry is {user?.industry}</p>
            <p className="my-3">
              <span className="text-[#5DA05D] mr-2">{user?.followings}</span> Following
              <span className="text-[#5DA05D] mx-2">{user?.followers}</span> Followers
            </p>
            {/* session rate */}
            {
              user.user_type === "mentor" ? (
                <SessionRate />
              ) : ("")
            }
          </div>

          <div className='flex flex-col'>

            <div className='md:flex justify-end mb-2 ml-auto'>
              {user?.intro_video ? (
                <video
                  src={user.intro_video}
                  controls
                  className="rounded-lg max-w-xs w-[90%]"
                />
              ) : (
                <div>
                  <div className='md:flex justify-end mb-2'>
                    <Info onClick={() => setOpenIntroVideo(true)} className='w-5 h-5 cursor-pointer text-[#5DA05D]' />
                  </div>
                  <img
                    src="/images/video1.png"
                    alt="video stream"
                    className="rounded-lg max-w-xs w-[90%]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <EditComponent
        ModalComponent={ReusableModal}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />

      <IntroVideoModal open={openIntroVideo} onClose={() => setOpenIntroVideo(false)} />

      {profileCompletion && (
        <ProfileProgressDropdown onCompletionChange={handleCompletionChange} />
      )}

      <ProfileTabs />
    </div>
  );
};
function SessionRate() {
  const { user, updateUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [tempRate, setTempRate] = useState("");

  // ✅ Keep tempRate in sync with user.session_rate
  useEffect(() => {
    if (user?.session_rate !== undefined && user?.session_rate !== null) {
      setTempRate(user.session_rate);
    }
  }, [user?.session_rate]);

  const handleSave = async () => {
    try {
      await updateUser({ session_rate: Number(tempRate) });
      setIsOpen(false);
      toast.success("Session rate updated successfully");
    } catch (err) {
      console.error("Failed to update session rate:", err);
      toast.error("Failed to update session rate");
    }
  };

  return (
    <div>
      {/* Display row */}
      <div className="flex gap-5 border-b border-[#5DA05D] pb-2">
        <p>
          Session rate:{" "}
          <span className="font-semibold">
            {user?.session_rate ? `${user.session_rate}` : "Not set"}
          </span>
        </p>
        <span
          className="ml-auto cursor-pointer"
          onClick={() => {
            setTempRate(user?.session_rate || ""); // pre-fill input safely
            setIsOpen(true);
          }}
        >
          <Edit />
        </span>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Session Rate</h2>

            <input
              type="number"
              value={tempRate ?? ""}
              onChange={(e) => setTempRate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-[#5DA05D]"
              placeholder="Change your rate here"
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-[#5DA05D] text-white hover:bg-[#4A874A]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default MainProfile;

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

export const ProfileProgressDropdown = () => {
  const { profileCompletion, completionData } = useContext(ProfileContext);
  const [isOpen, setIsOpen] = useState(false);

  const headerText =
    profileCompletion === 100
      ? "PROFILE COMPLETED 🎉"
      : `COMPLETE YOUR PROFILE (${profileCompletion}%)`;

  return (
    <div className="relative w-full max-w-4xl my-3">
      <div
        className="flex items-center justify-between p-4 bg-white border rounded-lg shadow cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={profileCompletion === 100 ? "text-[#5DA05D] font-bold" : ""}>
          {headerText}
        </span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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