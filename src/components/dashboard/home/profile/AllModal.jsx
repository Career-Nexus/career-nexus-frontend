import { useForm } from "react-hook-form";
import { useContext, useRef, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import { Trash2, Video } from "lucide-react";
import { ExperienceService } from "../../../../api/ExperienceService";
import { VideoModal } from "./VideoModal";

export const EditComponent = ({ ModalComponent, isOpen, onClose }) => {
  const { user, updateUser, loading, error } = useContext(UserContext);
  const [success, setSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(user.intro_video || null);
  const fileInputRef = useRef(null)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues: {
    //   first_name: user.first_name || "",
    //   last_name: user.last_name || "",
    //   middle_name: user.midle_name || "",
    //   location: user.location || "",
    //   bio: user.bio || "",
    //   position: user.position || "",
    //   qualification: user.qualification || "",
    //   intro_video: user.intro_video || ""
    // },
  });
  useEffect(() => {
    if (user) {
      setValue("first_name", user.first_name || "");
      setValue("last_name", user.last_name || "");
      setValue("middle_name", user.midle_name || "");
      setValue("location", user.location || "");
      setValue("bio", user.bio || "");
      setValue("position", user.position || "");
      setValue("qualification", user.qualification || "");
      setValue("intro_video", user.intro_video || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      const updatedData = {};
      if (data.first_name !== user.first_name) updatedData.first_name = data.first_name;
      if (data.last_name !== user.last_name) updatedData.last_name = data.last_name;
      if (data.middle_name !== user.midle_name) updatedData.middle_name = data.middle_name;
      if (data.location !== user.location) updatedData.location = data.location;
      if (data.bio !== user.bio) updatedData.bio = data.bio;
      if (data.position !== user.position) updatedData.position = data.position;
      if (data.qualification !== user.qualification) updatedData.qualification = data.qualification;

      let formData = null;
      if (videoFile) {
        formData = new FormData();
        formData.append("intro_video", videoFile);
      }

      await updateUser(updatedData, formData);
      setSuccess("Profile updated successfully");
      setTimeout(() => {
        window.location.href = "/profilepage";
      }, 2000);
    } catch (error) {
      setSuccess("Error updating profile");
      console.error("Error submitting form:", error);
    }
  };
  return (
    <ModalComponent isOpen={isOpen} onClose={onClose} title="Edit Profile Details">
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}

      <div className="max-w-4xl mx-auto bg-white rounded-lg">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Video Intro</label>
          <div className="flex items-center gap-4">
            <div onClick={() => fileInputRef.current.click()} className="cursor-pointer">
              {videoPreview ? (
                <video
                  src={videoPreview}
                  controls
                  className="w-60 rounded border"
                />
              ) : (
                <img
                  src="/images/video1.png"
                  alt="Click to upload video"
                  className="w-60 rounded border"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="bg-green-100 flex text-green-700 border border-green-500 px-4 py-1 rounded hover:bg-green-200"
              >
                <Video /> Record
              </button>
              {/* {showModal && <VideoModal />} */}
              {showModal && (
                <VideoModal
                  onSave={(file) => {
                    setVideoFile(file)
                    setVideoPreview(URL.createObjectURL(file))
                    setShowModal(false)
                  }}
                  onClose={() => setShowModal(false)}
                />
              )}
              <button
                className="bg-red-100 flex text-red-700 border border-red-500 px-4 py-1 rounded hover:bg-red-200"
                onClick={() => {
                  setVideoFile(null);
                  setVideoPreview(null);
                }}
              >
                <Trash2 /> Remove
              </button>
              {/* Hidden file input */}
              <input
                type="file"
                accept="video/*"
                ref={fileInputRef}
                onChange={(e) => {
                  const file = e.target.files[0];
                  setVideoFile(file);
                  if (file) {
                    setVideoPreview(URL.createObjectURL(file));
                  }
                }}
                className="hidden"
              />
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
              {...register("first_name", { required: "First name is required" })}
              placeholder="Enter first name"
              className="w-full px-3 py-1 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              placeholder="Enter location"
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
              {...register("last_name", { required: "Last name is required" })}
              placeholder="Enter last name"
              className="w-full px-3 py-1 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
            />
            {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name.message}</p>}
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
            <input
              type="text"
              {...register("qualification")}
              placeholder="Enter qualification"
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
              {...register("middle_name")}
              placeholder="Enter middle name"
              className="w-full px-3 py-1 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              type="text"
              {...register("position")}
              placeholder="Enter position"
              className="w-full px-3 py-1 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
            />
          </div>

          {/* Bio */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              rows={3}
              {...register("bio")}
              placeholder="Enter your bio"
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
              disabled={loading}
              className="px-6 py-2 bg-[#5DA05D] text-white rounded-md hover:bg-[#5DA05D]"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </ModalComponent>
  );
};
export const ExperienceModal = ({ ModalComponent, isOpen, onClose, itemToEdit = null }) => {
  const { user } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm()

  // Pre-populate form when editing an existing experience
  useEffect(() => {
    if (itemToEdit) {
      // Find the experience item in the user's experience array
      const experienceItem = user.experience.find((item) => item.id === itemToEdit)

      if (experienceItem) {
        // Set form values with existing experience data
        setValue("title", experienceItem.title || "")
        setValue("organization", experienceItem.organization || "")
        setValue("start_date", experienceItem.start_date ? experienceItem.start_date.split("T")[0] : "")
        setValue("end_date", experienceItem.end_date ? experienceItem.end_date.split("T")[0] : "")
        setValue("location", experienceItem.location || "")
        setValue("employment_type", experienceItem.employment_type || "")
        setValue("detail", experienceItem.detail || "")
      }
    } else {
      // Clear form when adding new experience
      reset()
    }
  }, [itemToEdit, setValue, reset, user.experience])

  const onSubmit = async (data) => {
    try {
      let response

      if (itemToEdit) {
        // Update existing experience
        console.log("Updating experience with ID:", itemToEdit)
        console.log("Update data:", data)

        response = await ExperienceService.updateExperience(itemToEdit, data)
        alert("Experience updated successfully")
      } else {
        // Add new experience
        response = await ExperienceService.addExperience(data)
        alert("Experience added successfully")
      }

      reset()
      onClose()
    } catch (error) {
      console.error("Experience Modal Error:", error.message, error.response)

      // More detailed error logging
      if (error.response && error.response.data) {
        console.error("Error response data:", error.response.data)
      }

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.non_field_errors?.[0] ||
        error.message ||
        (itemToEdit ? "Failed to update experience" : "Failed to add experience")
      alert(errorMessage)
    }
  }

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose} title={itemToEdit ? "Edit Experience" : "Add Experience"}>
      <div className="max-w-xl mx-auto bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">
              Job Title<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("title", { required: "This field is required" })}
              className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
              placeholder="Enter job title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Company Name</label>
            <input
              type="text"
              {...register("organization")}
              className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
              placeholder="Enter company's name e.g Walmart"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Start Date</label>
            <input
              type="date"
              {...register("start_date")}
              className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
              placeholder="e.g Aug 2018"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">End Date</label>
            <input
              type="date"
              {...register("end_date")}
              className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
              placeholder="e.g Aug 2018"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              {...register("location")}
              className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
              placeholder="e.g Texas"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Employment Type</label>
            <input
              type="text"
              {...register("employment_type")}
              className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
              placeholder="Onsite"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              {...register("detail")}
              className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
              placeholder="Describe your role and achievements"
              rows={4}
            />
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-[#5DA05D] text-white py-2 rounded hover:bg-[#5DA05D] transition"
          >
            {isSubmitting ? "Saving..." : itemToEdit ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </ModalComponent>
  )
}

export const EducationModal = ({ ModalComponent, isOpen, onClose, itemToEdit = null }) => {
  const { user } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm()

  // Pre-populate form when editing an existing education
  useEffect(() => {
    if (itemToEdit) {
      // Find the education item in the user's education array
      const educationItem = user.education.find((item) => item.id === itemToEdit)
      console.log("Found education item:", educationItem)

      if (educationItem) {
        // Set form values with existing education data
        setValue("course", educationItem.course || "")
        setValue("school", educationItem.school || "")
        setValue("start_date", educationItem.start_date ? educationItem.start_date.split("T")[0] : "")
        setValue("end_date", educationItem.end_date ? educationItem.end_date.split("T")[0] : "")
        setValue("location", educationItem.location || "")
        setValue("detail", educationItem.detail || "")
      }
    } else {
      // Clear form when adding new education
      reset()
    }
  }, [itemToEdit, setValue, reset, user.education])

  const onSubmit = async (data) => {
    try {
      let response

      if (itemToEdit) {
        // Update existing education
        console.log("Updating education with ID:", itemToEdit)
        console.log("Update data:", data)

        response = await ExperienceService.updateEducation(itemToEdit, data)
        console.log("Education update response:", response)
        alert("Education updated successfully")
      } else {
        // Add new education
        response = await ExperienceService.addEducation(data)
        alert("Education added successfully")
      }

      reset()
      onClose()
    } catch (error) {
      console.error("Education Modal Error:", error)

      // More detailed error logging
      if (error.response && error.response.data) {
        console.error("Error response data:", error.response.data)
      }

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.non_field_errors?.[0] ||
        error.message ||
        (itemToEdit ? "Failed to update education" : "Failed to add education")
      alert(errorMessage)
    }
  }

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose} title={itemToEdit ? "Edit Education" : "Add Education"}>
      <div className="max-w-xl mx-auto bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">
              Field of Study<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("course", { required: "This field is required" })}
              className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
              placeholder="e.g Computer science"
            />
            {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">
              Institution<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("school", { required: "This field is required" })}
              className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
              placeholder="Enter Provider"
            />
            {errors.school && <p className="text-red-500 text-sm mt-1">{errors.school.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">
              Start Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("start_date", { required: "This field is required" })}
              className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
              placeholder="e.g Aug 2018"
            />
            {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">
              End Date<span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              {...register("end_date", { required: "This field is required" })}
              className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
              placeholder="e.g Aug 2018"
            />
            {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date.message}</p>}
          </div>

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
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              {...register("detail")}
              className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
              placeholder="Describe your role and achievements"
              rows={1}
            />
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full bg-[#5DA05D] text-white py-2 rounded hover:bg-[#5DA05D] transition"
          >
            {isSubmitting ? "Saving..." : itemToEdit ? "Update" : "Save"}
          </button>
        </form>
      </div>
    </ModalComponent>
  )
}

export const CertificationModal = ({ ModalComponent, isOpen, onClose, itemToEdit = null }) => {
  const { user } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm()

  // Pre-populate form when editing an existing certification
  useEffect(() => {
    // Just reset the form when adding new certification
    if (!itemToEdit) {
      reset()
    }
  }, [itemToEdit, reset])

  const onSubmit = async (data) => {
    try {
      // Only add new certifications, no updates
      const response = await ExperienceService.addCertification(data)
      alert("Certification added successfully")

      reset()
      onClose()
    } catch (error) {
      console.error("Certification Modal Error:", error.message, error.response)

      // More detailed error logging
      if (error.response && error.response.data) {
        console.error("Error response data:", error.response.data)
      }

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.non_field_errors?.[0] ||
        error.message ||
        "Failed to add certification"
      alert(errorMessage)
    }
  }

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose} title={itemToEdit ? "Delete Certification" : "Add Certification"}>
      <div className="max-w-xl mx-auto bg-white">
        {itemToEdit ? (
          // If itemToEdit is provided, show message that deletion is handled elsewhere
          <div className="p-4">
            <p className="mb-4">Please use the delete button on the certification card to remove this item.</p>
            <div className="flex justify-end">
              <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Close
              </button>
            </div>
          </div>
        ) : (
          // If no itemToEdit, show the add form
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block font-medium mb-1">
                Certification Title<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("title", { required: "This field is required" })}
                className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                placeholder="Enter Certification Title"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block font-medium mb-1">Provider</label>
              <input
                type="text"
                {...register("school")}
                className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                placeholder="Enter Provider"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Issue Date</label>
              <input
                type="date"
                {...register("issue_date")}
                className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                placeholder="Enter Issue Date"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Credential ID</label>
              <input
                type="text"
                {...register("cert_id")}
                className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                placeholder="Enter Credential ID"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Associated Skills</label>
              <textarea
                {...register("skills")}
                className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
                placeholder="Enter Associated Skills"
                rows={1}
              />
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-[#5DA05D] text-white py-2 rounded hover:bg-[#5DA05D] transition"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </form>
        )}
      </div>
    </ModalComponent>
  )
}

export const AddProjectModal = ({ ModalComponent, isOpen, onClose }) => {
  const [fileName, setFileName] = useState("No file chosen")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true)
      // Add the file to the form data if it exists
      if (fileInputRef.current?.files?.[0]) {
        data.image = fileInputRef.current.files[0]
      }
      const response = await ExperienceService.addProject(data);
      console.log("Project added successfully:", response);
      // Reset the form and close the modal
      reset()
      setFileName("No file chosen")
      onClose();
    } catch (error) {
      console.error("Failed to add project:", error)
      // Handle error (show error message to user)
    } finally {
      setIsSubmitting(false)
    }
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
              // {...register("title", { required: "This field is required" })}
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

          {/* <div>
            <label className="block font-medium mb-1">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("tools", { required: "This field is required" })}
              className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg focus:outline-none focus:ring-0 bg-[#FAFAFA]"
              placeholder="Enter Project Description"
              rows={1}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div> */}

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
            disabled={isSubmitting}
            className="w-full bg-[#5DA05D] text-white py-2 rounded hover:bg-[#4C904C] transition disabled:bg-[#8BC08B] disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </ModalComponent>
  )
}