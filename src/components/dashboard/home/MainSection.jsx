import React, { useContext, useEffect, useRef, useState } from 'react'
// import SocialMediaToolbar from './LiveStream'
import TabInterface from './TabInterface'
import { UserContext } from '../../../context/UserContext'
import { ArrowRight, Check, Edit, GraduationCap, Image, ImageIcon, NotepadText, Pencil, Smile, UserCircle2, VideoIcon, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { PostService } from '../../../api/PostService'
import { emojis } from './Emoji'
// import { Button, InputGroup, RadioGroup, Textarea } from '@chakra-ui/react'


const MainSection = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [ModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(0);

  const handlePost = (postData) => {
    setPosts([...posts, postData]); // Add new post to the list
    console.log('New Post:', postData); // For debugging
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleCompletionChange = (completion) => {
    setProfileCompletion(completion);
    if (completion === 100) {
      setIsModalOpen(false); // Hide WelcomeModal when completion is 100%
    }
  };

  return (
    <div>
      <div>{isModalOpen && profileCompletion < 100 && <WelcomeModal onClose={handleClose} />}</div>
      <div>
        {profileCompletion < 100 && <ProfileProgressDropdown onCompletionChange={handleCompletionChange} />}
      </div>
      <div className='border border-gray-200 p-2 rounded-lg flex gap-3'>
        <img src={user.profile_photo} alt="profile" className='h-12 w-12 rounded-full' />
        <button onClick={() => setModalOpen(true)} className='w-full rounded-lg border border-gray-200 flex items-center justify-between px-3'>
          Share an update...
          <span><Edit className='text-[#5DA05D]'/></span>
        </button>
      </div>
      <ModalComponent
        isOpen={ModalOpen}
        onClose={() => setModalOpen(false)}
        onPost={handlePost}
      />
      <TabInterface />
    </div>
  );
};

const WelcomeModal = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="inset-0 flex items-center justify-center z-50 mb-2">
      <div className="bg-gradient-to-r from-[#5DA05D] to-[#5DA05D] text-white px-4 py-2 rounded-lg shadow-lg max-w-3xl w-full">
        <button onClick={onClose} className="float-right text-white hover:text-gray-300">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex items-center mb-2">
          👏
          <h2 className="text-lg font-bold">WELCOME TO CAREER-NEXUS, {user.first_name?.toUpperCase()}</h2>
        </div>
        <div className='flex items-center justify-between gap-5'>
          <p className="text-xs">
            Let's get you started on your professional journey. Complete your profile to unlock the full potential of our platform.
          </p>
          <button
            onClick={() => navigate('/profilepage')}
            className='bg-white px-2 py-[6px] rounded-lg text-[#5DA05D] w-56'
          >
            Complete now
          </button>
        </div>
      </div>
    </div>
  );
};

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
export default MainSection

// File size constants
const MAX_IMAGE_SIZE = 1 * 1024 * 1024 // 1MB in bytes
const MAX_VIDEO_SIZE = 5 * 1024 * 1024 // 5MB in bytes

// Utility function to format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// Utility function to validate file size
const validateFileSize = (file, maxSize, fileType) => {
  if (file.size > maxSize) {
    const maxSizeFormatted = formatFileSize(maxSize)
    const fileSizeFormatted = formatFileSize(file.size)
    return `${fileType} file "${file.name}" (${fileSizeFormatted}) exceeds the maximum size limit of ${maxSizeFormatted}.`
  }
  return null
}

// Image cropper component
const ImageCropper = ({ imageSrc, onCrop, onCancel }) => {
  const canvasRef = useRef(null)
  const [cropArea, setCropArea] = useState({ x: 0, y: 0, width: 200, height: 200 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (x >= cropArea.x && x <= cropArea.x + cropArea.width && y >= cropArea.y && y <= cropArea.y + cropArea.height) {
      setIsDragging(true)
      setDragStart({ x: x - cropArea.x, y: y - cropArea.y })
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - dragStart.x
    const y = e.clientY - rect.top - dragStart.y

    setCropArea((prev) => ({
      ...prev,
      x: Math.max(0, Math.min(x, 400 - prev.width)),
      y: Math.max(0, Math.min(y, 300 - prev.height)),
    }))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleCrop = () => {
    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        console.error("Could not get canvas context")
        return
      }

      const img = new window.Image()

      img.onload = () => {
        try {
          canvas.width = cropArea.width
          canvas.height = cropArea.height

          const scaleX = img.naturalWidth / 400
          const scaleY = img.naturalHeight / 300

          ctx.drawImage(
            img,
            cropArea.x * scaleX,
            cropArea.y * scaleY,
            cropArea.width * scaleX,
            cropArea.height * scaleY,
            0,
            0,
            cropArea.width,
            cropArea.height,
          )

          canvas.toBlob(
            (blob) => {
              if (blob) {
                onCrop(blob)
              } else {
                console.error("Failed to create blob from canvas")
              }
            },
            "image/jpeg",
            0.9,
          )
        } catch (error) {
          console.error("Error during image processing:", error)
        }
      }

      img.onerror = () => {
        console.error("Failed to load image for cropping")
      }

      img.crossOrigin = "anonymous"
      img.src = imageSrc
    } catch (error) {
      console.error("Error in handleCrop:", error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <img src={imageSrc || "/placeholder.svg"} alt="Crop" className="w-full h-64 object-cover" />
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="absolute inset-0 w-full h-full cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{
            background: `linear-gradient(to right, 
              transparent ${cropArea.x}px, 
              rgba(0,0,0,0.5) ${cropArea.x}px, 
              rgba(0,0,0,0.5) ${cropArea.x + cropArea.width}px, 
              transparent ${cropArea.x + cropArea.width}px),
            linear-gradient(to bottom, 
              transparent ${cropArea.y}px, 
              rgba(0,0,0,0.5) ${cropArea.y}px, 
              rgba(0,0,0,0.5) ${cropArea.y + cropArea.height}px, 
              transparent ${cropArea.y + cropArea.height}px)`,
          }}
        />
        <div
          className="absolute border-2 border-white border-dashed"
          style={{
            left: `${(cropArea.x / 400) * 100}%`,
            top: `${(cropArea.y / 300) * 100}%`,
            width: `${(cropArea.width / 400) * 100}%`,
            height: `${(cropArea.height / 300) * 100}%`,
          }}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Width:</label>
          <input
            type="range"
            min="50"
            max="300"
            value={cropArea.width}
            onChange={(e) => setCropArea((prev) => ({ ...prev, width: Number.parseInt(e.target.value) }))}
            className="flex-1"
          />
          <span className="text-sm w-12">{cropArea.width}px</span>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Height:</label>
          <input
            type="range"
            min="50"
            max="200"
            value={cropArea.height}
            onChange={(e) => setCropArea((prev) => ({ ...prev, height: Number.parseInt(e.target.value) }))}
            className="flex-1"
          />
          <span className="text-sm w-12">{cropArea.height}px</span>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
          Cancel
        </button>
        <button onClick={handleCrop} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Apply Crop
        </button>
      </div>
    </div>
  )
}

// Video trimmer component
const VideoTrimmer = ({ videoSrc, onTrim, onCancel }) => {
  const videoRef = useRef(null)
  const [duration, setDuration] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const handleLoadedMetadata = () => {
    const videoDuration = videoRef.current.duration
    setDuration(videoDuration)
    setEndTime(videoDuration)
  }

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime)
  }

  const handleTrim = () => {
    onTrim({
      startTime,
      endTime,
      duration: endTime - startTime,
    })
  }

  const seekTo = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }

  return (
    <div className="space-y-4">
      <video
        ref={videoRef}
        src={videoSrc}
        controls
        className="w-full h-64 object-cover rounded"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">Start:</label>
          <input
            type="range"
            min="0"
            max={duration}
            step="0.1"
            value={startTime}
            onChange={(e) => {
              const value = Number.parseFloat(e.target.value)
              setStartTime(value)
              seekTo(value)
            }}
            className="flex-1"
          />
          <span className="text-sm w-16">{startTime.toFixed(1)}s</span>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium">End:</label>
          <input
            type="range"
            min={startTime}
            max={duration}
            step="0.1"
            value={endTime}
            onChange={(e) => {
              const value = Number.parseFloat(e.target.value)
              setEndTime(value)
              seekTo(value)
            }}
            className="flex-1"
          />
          <span className="text-sm w-16">{endTime.toFixed(1)}s</span>
        </div>

        <div className="text-sm text-gray-600">Trim duration: {(endTime - startTime).toFixed(1)}s</div>
      </div>

      <div className="flex justify-end space-x-2">
        <button onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
          Cancel
        </button>
        <button onClick={handleTrim} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Apply Trim
        </button>
      </div>
    </div>
  )
}

const ModalComponent = ({ isOpen, onClose }) => {
  const { user } = useContext(UserContext)
  const [postContent, setPostContent] = useState("")
  const [visibility, setVisibility] = useState("Everyone")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(null)
  const [mediaType, setMediaType] = useState(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handlePost = async () => {
    if (!postContent.trim() && selectedImages.length === 0 && !selectedVideo) {
      setError("Please add content or media to post.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const postData = {
        body: postContent,
        pic1: selectedImages[0]?.file || "N/A",
        pic2: selectedImages[1]?.file || "N/A",
        pic3: selectedImages[2]?.file || "N/A",
        video: selectedVideo?.file || "N/A",
        article: "N/A",
        count: 1,
        profile: user?.profile_id || user?.id || "",
      }

      // Debug: Log what we're sending
      console.log("Sending post data:", {
        body: postData.body,
        count: postData.count,
        profile: postData.profile,
        pic1: postData.pic1 !== "N/A" ? `File: ${postData.pic1.name} (${formatFileSize(postData.pic1.size)})` : "N/A",
        pic2: postData.pic2 !== "N/A" ? `File: ${postData.pic2.name} (${formatFileSize(postData.pic2.size)})` : "N/A",
        pic3: postData.pic3 !== "N/A" ? `File: ${postData.pic3.name} (${formatFileSize(postData.pic3.size)})` : "N/A",
        video:
          postData.video !== "N/A" ? `File: ${postData.video.name} (${formatFileSize(postData.video.size)})` : "N/A",
      })

      await PostService.createPost(postData)

      resetForm()
      onClose()
    } catch (err) {
      setError(err.message || "Failed to create post. Please try again.")
      console.error("Post Error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setPostContent("")
    setSelectedImages([])
    setSelectedVideo(null)
    setError("")
    setVisibility("Everyone")
  }

  const handleVisibilityChange = (value) => {
    setVisibility(value)
    setIsDropdownOpen(false)
  }

  const handleEmojiSelect = (emoji) => {
    setPostContent((prev) => prev + emoji)
    setIsEmojiModalOpen(false)
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || [])
    const remainingSlots = 3 - selectedImages.length
    const filesToAdd = files.slice(0, remainingSlots)

    if (files.length > remainingSlots) {
      setError(`You can only add ${remainingSlots} more image(s). Maximum 3 images allowed.`)
      return
    }

    // Validate file sizes
    const validFiles = []
    const errors = []

    for (const file of filesToAdd) {
      const sizeError = validateFileSize(file, MAX_IMAGE_SIZE, "Image")
      if (sizeError) {
        errors.push(sizeError)
      } else {
        validFiles.push(file)
      }
    }

    if (errors.length > 0) {
      setError(errors.join(" "))
      return
    }

    const newImages = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      edited: false,
    }))

    setSelectedImages((prev) => [...prev, ...newImages])
    setError("") // Clear any previous errors
  }

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (selectedVideo) {
      setError("You can only add one video per post.")
      return
    }

    // Validate video file size
    const sizeError = validateFileSize(file, MAX_VIDEO_SIZE, "Video")
    if (sizeError) {
      setError(sizeError)
      return
    }

    setSelectedVideo({
      file,
      url: URL.createObjectURL(file),
      edited: false,
    })

    setError("") // Clear any previous errors
  }

  const openEditModal = (index, type) => {
    setCurrentMediaIndex(index)
    setMediaType(type)
    setIsEditModalOpen(true)
  }

  const handleCropComplete = (croppedBlob) => {
    if (currentMediaIndex !== null) {
      const croppedFile = new File([croppedBlob], `cropped_image_${Date.now()}.jpg`, {
        type: "image/jpeg",
      })

      // Validate cropped file size
      const sizeError = validateFileSize(croppedFile, MAX_IMAGE_SIZE, "Cropped image")
      if (sizeError) {
        setError(sizeError)
        setIsEditModalOpen(false)
        return
      }

      setSelectedImages((prev) =>
        prev.map((img, i) =>
          i === currentMediaIndex
            ? {
                ...img,
                file: croppedFile,
                url: URL.createObjectURL(croppedFile),
                edited: true,
              }
            : img,
        ),
      )
    }
    setIsEditModalOpen(false)
  }

  const handleTrimComplete = (trimData) => {
    if (selectedVideo) {
      setSelectedVideo((prev) => ({
        ...prev,
        edited: true,
        trimData,
      }))
    }
    setIsEditModalOpen(false)
  }

  const removeImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index))
    if (selectedImages[index]) {
      URL.revokeObjectURL(selectedImages[index].url)
    }
  }

  const removeVideo = () => {
    if (selectedVideo) {
      URL.revokeObjectURL(selectedVideo.url)
    }
    setSelectedVideo(null)
  }


  const hasContent = postContent.trim() || selectedImages.length > 0 || selectedVideo

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">{error}</div>
        )}

        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          <X />
        </button>

        <div className="flex items-center mb-4">
          <img
            src={user?.profile_photo || "/placeholder.svg?height=40&width=40"}
            alt="User"
            className="w-10 h-10 rounded-full mr-2"
          />
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="border border-[#5DA05D] rounded-lg px-2 py-2 bg-white text-sm flex items-center w-52 text-[#5DA05D]"
            >
              {visibility}
              <svg className="ml-auto w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
                <label className="flex items-center px-4 py-3 hover:bg-gray-100">
                  <input
                    type="radio"
                    name="visibility"
                    value="Everyone"
                    checked={visibility === "Everyone"}
                    onChange={(e) => handleVisibilityChange(e.target.value)}
                    className="form-radio text-[#5DA05D] p-2 mr-2 accent-[#5DA05D] focus:ring-[#5b9a68]"
                  />
                  Everyone
                </label>
                <label className="flex items-center px-4 py-3 hover:bg-gray-100">
                  <input
                    type="radio"
                    name="visibility"
                    value="Followers only"
                    checked={visibility === "Followers only"}
                    onChange={(e) => handleVisibilityChange(e.target.value)}
                    className="form-radio text-[#5DA05D] mr-2 p-2 accent-[#5DA05D] focus:ring-[#5b9a68]"
                  />
                  Followers only
                </label>
              </div>
            )}
          </div>
        </div>

        <textarea
          className="w-full h-52 p-2 border-0 border-b border-gray-200 resize-none mb-4 outline-none focus:outline-none focus:ring-0 focus:border-b focus:border-gray-200"
          placeholder="Share an update..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />

        {(selectedImages.length > 0 || selectedVideo) && (
          <div className="mb-4 flex flex-wrap gap-4">
            {selectedImages.map((img, index) => (
              <div key={index} className="relative">
                <img src={img.url || "/placeholder.svg"} alt="Selected" className="w-32 h-32 object-cover rounded" />
                <div className="absolute top-1 right-1 text-xs bg-black bg-opacity-50 text-white px-1 rounded">
                  {formatFileSize(img.file.size)}
                </div>
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-gray-600 text-white rounded-lg w-6 h-6 flex items-center justify-center hover:bg-[#5DA05D] transition-colors"
                >
                  ×
                </button>
                <button
                  onClick={() => openEditModal(index, "image")}
                  className="absolute top-1 left-1 bg-gray-600 hover:bg-[#5DA05D] text-white px-2 py-1 rounded-lg text-xs transition-colors"
                >
                  {img.edited ? "Edited" : "Edit"}
                </button>
              </div>
            ))}
            {selectedVideo && (
              <div className="relative">
                <video src={selectedVideo.url} className="w-32 h-32 object-cover rounded" />
                <div className="absolute top-1 left-1 text-xs bg-black bg-opacity-50 text-white px-1 rounded">
                  {formatFileSize(selectedVideo.file.size)}
                </div>
                <button
                  onClick={removeVideo}
                  className="absolute top-1 right-1 bg-gray-600 text-white rounded-lg w-6 h-6 flex items-center justify-center hover:bg-[#5DA05D] transition-colors"
                >
                  ×
                </button>
                <button
                  onClick={() => openEditModal(0, "video")}
                  className="absolute top-1 left-1 bg-gray-600 hover:bg-[#5DA05D] text-white px-2 py-1 rounded-lg text-xs transition-colors"
                >
                  {selectedVideo.edited ? "Edited" : "Edit"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* File size info */}
        <div className="mb-4 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Images: Max 1MB each ({selectedImages.length}/3)</span>
            <span>Video: Max 5MB ({selectedVideo ? "1/1" : "0/1"})</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <label
              className={`cursor-pointer transition-colors ${selectedImages.length >= 3 ? "text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
                multiple
                disabled={selectedImages.length >= 3}
              />
              <ImageIcon />
            </label>
            <label
              className={`cursor-pointer transition-colors ${selectedVideo ? "text-gray-300" : "text-gray-500 hover:text-gray-700"}`}
            >
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoChange}
                disabled={!!selectedVideo}
              />
              <VideoIcon />
            </label>
            <button
              className="text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
              onClick={() => setIsEmojiModalOpen(true)}
            >
              <Smile />
            </button>
          </div>
          <button
            disabled={!hasContent || isLoading}
            onClick={handlePost}
            className={`px-6 py-2 rounded-lg transition-colors ${
              !hasContent || isLoading ? "bg-gray-200 cursor-not-allowed" : "bg-[#5DA05D] hover:bg-green-700 text-white"
            }`}
          >
            {isLoading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>

      {/* Emoji Modal */}
      {isEmojiModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-80 p-6 relative">
            <button
              onClick={() => setIsEmojiModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X />
            </button>
            <h3 className="text-lg font-semibold mb-4">Select an Emoji</h3>
            <div className="grid grid-cols-5 gap-2">
              {emojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="text-2xl hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && currentMediaIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
            >
              <X />
            </button>
            <h3 className="text-lg font-semibold mb-4">{mediaType === "video" ? "Trim Video" : "Crop Image"}</h3>

            {mediaType === "video" && selectedVideo && (
              <VideoTrimmer
                videoSrc={selectedVideo.url}
                onTrim={handleTrimComplete}
                onCancel={() => setIsEditModalOpen(false)}
              />
            )}

            {mediaType === "image" && selectedImages[currentMediaIndex] && (
              <ImageCropper
                imageSrc={selectedImages[currentMediaIndex].url}
                onCrop={handleCropComplete}
                onCancel={() => setIsEditModalOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}