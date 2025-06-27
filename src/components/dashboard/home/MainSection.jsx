import React, { useContext, useRef, useState } from 'react'
// import SocialMediaToolbar from './LiveStream'
import TabInterface from './TabInterface'
import { UserContext } from '../../../context/UserContext'
import { ArrowRight, Edit, GraduationCap, Image, ImageIcon, NotepadText, Pencil, Smile, UserCircle2, VideoIcon, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PostService } from '../../../api/PostService'
// import { Button, InputGroup, RadioGroup, Textarea } from '@chakra-ui/react'


const MainSection = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [ModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  // const handleFileChange = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     setSelectedFile(e.target.files[0])
  //   }
  // }

  const handlePost = (postData) => {
    setPosts([...posts, postData]); // Add new post to the list
    console.log('New Post:', postData); // For debugging
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div>{isModalOpen && <WelcomeModal onClose={handleClose} />}</div>
      <div>
        <ProfileProgressDropdown />
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
  )
}

const WelcomeModal = ({ onClose }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="inset-0 flex items-center justify-center z-50 mb-2">
      {/* <div className="bg-gradient-to-r from-[#131927E5] to-[#5DA05D] text-white p-6 rounded-lg shadow-lg max-w-3xl w-full"> */}
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
        <button className='bg-white px-2 py-[6px] rounded-lg text-[#5DA05D] w-56 hover:bg-[#2b5b2b] hover:text-white'>Complete now</button>
        </div>
      </div>
    </div>
  );
};

const ProfileProgressDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const totalItems = 6;
  const completedItems = 1; // Example: 3 items completed
  const progress = (completedItems / totalItems) * 100;

  const profileItems = [
    { id: 1, icon: <UserCircle2 className="w-5 h-5 mr-2" />, text: 'Upload Profile Picture', completed: true, linkto:<Link to={'/profilepage'}><ArrowRight/></Link> },
    { id: 2, icon: <Pencil className="w-5 h-5 mr-2" />, text: 'Add a Bio Description', completed: false, linkto:<Link to={'/profilepage'}><ArrowRight/></Link> },
    { id: 3, icon: <NotepadText className="w-5 h-5 mr-2" />, text: 'Add Work Experience', completed: false, linkto:<Link to={'/profilepage'}><ArrowRight/></Link> },
    { id: 4, icon: <GraduationCap className="w-5 h-5 mr-2" />, text: 'Add Educational Background', completed: false, linkto:<Link to={'/profilepage'}><ArrowRight/></Link> },
    { id: 5, icon: <VideoIcon className="w-5 h-5 mr-2" />, text: 'Upload Video Introduction', completed: false, linkto:<Link to={'/profilepage'}><ArrowRight/></Link> },
    { id: 6, icon: <NotepadText className="w-5 h-5 mr-2" />, text: 'Add Certifications', completed: false, linkto:<Link to={'/profilepage'}><ArrowRight/></Link> },
  ];

  return (
    <div className="relative w-full max-w-3xl my-3">
      <div
        className="flex items-center justify-between p-4 bg-white border rounded-lg shadow cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>COMPLETE YOUR PROFILE ({progress}%)</span>
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
                <span className={item.completed ? 'text-[#5DA05D]' : 'text-gray-400'}>
                  {item.icon}
                </span>
                <span>{item.text}</span>
                <span className='ml-auto mr-4 text-gray-400'>{item.linkto}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default MainSection


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
    // In a real implementation, you would use a library like ffmpeg.wasm
    // For now, we'll just return the trim parameters
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
      }

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
    }

    const newImages = filesToAdd.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      edited: false,
    }))

    setSelectedImages((prev) => [...prev, ...newImages])
  }

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (selectedVideo) {
      setError("You can only add one video per post.")
      return
    }

    setSelectedVideo({
      file,
      url: URL.createObjectURL(file),
      edited: false,
    })
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

  const emojis = [
    "😀",
    "😂",
    "😍",
    "😢",
    "👍",
    "❤️",
    "😴",
    "😎",
    "👀",
    "🎉",
    "🥰",
    "🥱",
    "🤤",
    "😛",
    "🤑",
    "😤",
    "😭",
    "🤧",
    "🫢",
    "🐕",
    "🙇‍♀️",
    "🙆‍♂️",
    "🚶",
    "👆",
    "👊",
    "🤛",
    "👏",
    "✍️",
    "🤝",
    "🎈",
    "🏅",
    "🖋️",
    "🍔",
    "🎂",
    "🚗",
    "🌎",
    "❤️",
    "💙",
    "💞",
    "🚷",
    "💯",
    "✅",
    "❎",
  ]

  const hasContent = postContent.trim() || selectedImages.length > 0 || selectedVideo

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative">
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

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
              <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg">
                <label className="flex items-center px-4 py-3 hover:bg-gray-100">
                  <input
                    type="radio"
                    name="visibility"
                    value="Everyone"
                    checked={visibility === "Everyone"}
                    onChange={(e) => handleVisibilityChange(e.target.value)}
                    className="form-radio text-[#5DA05D] p-2 mr-2"
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
                    className="form-radio text-[#5DA05D] mr-2 p-2"
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
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-gray-600 text-white rounded-lg w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
                <button
                  onClick={() => openEditModal(index, "image")}
                  className="absolute top-1 left-1 bg-gray-600 hover:bg-[#5DA05D] text-white px-2 py-1 rounded text-sm"
                >
                  {img.edited ? "Edited" : "Edit"}
                </button>
              </div>
            ))}
            {selectedVideo && (
              <div className="relative">
                <video src={selectedVideo.url} controls className="w-32 h-32 object-cover rounded" />
                <button
                  onClick={removeVideo}
                  className="absolute top-1 right-1 bg-gray-600 text-white rounded-lg w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
                <button
                  onClick={() => openEditModal(0, "video")}
                  className="absolute top-1 left-1 bg-gray-600 hover:bg-[#5DA05D] text-white px-2 py-1 rounded text-sm"
                >
                  {selectedVideo.edited ? "Edited" : "Edit"}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
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
            <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
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
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setIsEmojiModalOpen(true)}
            >
              <Smile />
            </button>
          </div>
          <button
            disabled={!hasContent || isLoading}
            onClick={handlePost}
            className={`px-6 py-2 rounded-lg ${
              !hasContent || isLoading ? "bg-gray-200 cursor-not-allowed" : "bg-[#5DA05D] hover:bg-[#5DA05D] text-white"
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
// const ModalComponent = ({ isOpen, onClose }) => {
//   const { user } = useContext(UserContext);
//   const [postContent, setPostContent] = useState('');
//   const [visibility, setVisibility] = useState('Everyone');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
//   const [selectedEmoji, setSelectedEmoji] = useState('');
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [selectedVideos, setSelectedVideos] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [currentMediaIndex, setCurrentMediaIndex] = useState(null);
//   const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
//   const [error, setError] = useState(''); // Added for error handling

//   if (!isOpen) return null;

//   const handlePost = async () => {
//     if (!postContent.trim() && selectedImages.length === 0 && selectedVideos.length === 0) {
//       setError('Please add content or media to post.');
//       return;
//     }

//     try {
//       const postData = {
//         body: postContent + selectedEmoji,
//         profile: user?.profile_id || user?.id || '', // Adjust based on your user object
//         count: 1, // Default value, adjust if needed
//         media: selectedImages.length > 0 ? selectedImages[0].file : selectedVideos.length > 0 ? selectedVideos[0].file : null, // Send first file
//       };

//       await PostService.createPost(postData);
      
//       // Clear form and close modal on success
//       setPostContent('');
//       setSelectedEmoji('');
//       setSelectedImages([]);
//       setSelectedVideos([]);
//       setError('');
//       onClose();
//     } catch (err) {
//       setError(err.message || 'Failed to create post. Please try again.');
//       console.error('Post Error:', err);
//     }
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleVisibilityChange = (value) => {
//     setVisibility(value);
//     setIsDropdownOpen(false);
//   };

//   const toggleEmojiModal = () => {
//     setIsEmojiModalOpen(!isEmojiModalOpen);
//   };

//   const handleEmojiSelect = (emoji) => {
//     setPostContent(postContent + emoji);
//     setSelectedEmoji(emoji);
//     setIsEmojiModalOpen(false);
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//       cropped: false,
//     }));
//     setSelectedImages((prevImages) => [...prevImages, ...newImages]);
//   };

//   const handleVideoChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newVideos = files.map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//       trimmed: false,
//     }));
//     setSelectedVideos((prevVideos) => [...prevVideos, ...newVideos]);
//   };

//   const openEditModal = (index, type) => {
//     setCurrentMediaIndex(index);
//     setMediaType(type);
//     setIsEditModalOpen(true);
//   };

//   const saveEditedMedia = () => {
//     if (mediaType === 'video') {
//       setSelectedVideos((prevVideos) =>
//         prevVideos.map((vid, i) => (i === currentMediaIndex ? { ...vid, trimmed: true } : vid))
//       );
//     } else if (mediaType === 'image') {
//       setSelectedImages((prevImages) =>
//         prevImages.map((img, i) => (i === currentMediaIndex ? { ...img, cropped: true } : img))
//       );
//     }
//     setIsEditModalOpen(false);
//   };

//   const removeMedia = (index, type) => {
//     if (type === 'video') {
//       setSelectedVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
//     } else if (type === 'image') {
//       setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative">
//         {error && (
//           <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
//             {error}
//           </div>
//         )}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//         >
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </button>
//         <div className="flex items-center mb-4">
//           <img src={user.profile_photo} alt="User" className="w-10 h-10 rounded-full mr-2" />
//           <div className="relative">
//             <button
//               onClick={toggleDropdown}
//               className="border border-[#5DA05D]rounded-lg px-2 py-2 bg-white text-sm flex items-center w-52 text-[#5DA05D]"
//             >
//               {visibility}
//               <svg className="ml-auto w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//               </svg>
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg">
//                 <label className="flex items-center px-4 py-3 hover:bg-gray-100">
//                   <input
//                     type="radio"
//                     name="visibility"
//                     value="Everyone"
//                     checked={visibility === 'Everyone'}
//                     onChange={(e) => handleVisibilityChange(e.target.value)}
//                     className="form-radio text-[#5DA05D] p-2 mr-2"
//                     // className="form-radio accent-green-700 mr-2 p-2"
//                   />
//                   Everyone
//                 </label>
//                 <label className="flex items-center px-4 py-3 hover:bg-gray-100">
//                   <input
//                     type="radio"
//                     name="visibility"
//                     value="Followers only"
//                     checked={visibility === 'Followers only'}
//                     onChange={(e) => handleVisibilityChange(e.target.value)}
//                     className="form-radio text-[#5DA05D] mr-2 p-2"
//                   />
//                   Followers only
//                 </label>
//               </div>
//             )}
//           </div>
//         </div>
//         <textarea
//           className="w-full h-52 p-2 border-0 border-b border-gray-200 resize-none mb-4 outline-none focus:outline-none focus:ring-0 focus:border-b focus:border-gray-200"
//           placeholder="Share an update..."
//           value={postContent}
//           onChange={(e) => setPostContent(e.target.value)}
//         ></textarea>
//         {(selectedImages.length > 0 || selectedVideos.length > 0) && (
//           <div className="mb-4 flex flex-wrap gap-4">
//             {selectedImages.map((img, index) => (
//               <div key={index} className="relative">
//                 <img src={img.url} alt="Selected" className="w-32 h-32 object-cover rounded" />
//                 <button
//                   onClick={() => removeMedia(index, 'image')}
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//                 >
//                   ×
//                 </button>
//                 <button
//                   onClick={() => openEditModal(index, 'image')}
//                   className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
//                 >
//                   Edit
//                 </button>
//               </div>
//             ))}
//             {selectedVideos.map((vid, index) => (
//               <div key={index} className="relative">
//                 <video src={vid.url} controls className="w-32 h-32 object-cover rounded" />
//                 <button
//                   onClick={() => removeMedia(index, 'video')}
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//                 >
//                   ×
//                 </button>
//                 <button
//                   onClick={() => openEditModal(index, 'video')}
//                   className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
//                 >
//                   Edit
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="flex justify-between items-center">
//           <div className="flex space-x-4 items-center">
//             <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => handleImageChange(e)}
//                 multiple
//               />
//               <Image />
//             </label>
//             <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
//               <input
//                 type="file"
//                 accept="video/*"
//                 className="hidden"
//                 onChange={(e) => handleVideoChange(e)}
//                 multiple
//               />
//               <VideoIcon />
//             </label>
//             <label
//               className="text-gray-500 hover:text-gray-700 cursor-pointer"
//               onClick={toggleEmojiModal}
//             >
//               <span>
//                 <Smile className="w-5 h-5" />
//               </span>
//             </label>
//           </div>
//           <button
//             disabled={!postContent.trim() && selectedImages.length === 0 && selectedVideos.length === 0}
//             onClick={handlePost}
//             className={`px-6 py-2 rounded-lg ${
//               !postContent.trim() && selectedImages.length === 0 && selectedVideos.length === 0
//                 ? 'bg-gray-200 cursor-not-allowed'
//                 : 'bg-green-600 hover:bg-green-600 text-white'
//             }`}
//           >
//             Post
//           </button>
//         </div>
//       </div>

//       {isEmojiModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-80 p-6 relative">
//             <button
//               onClick={toggleEmojiModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//             >
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </button>
//             <h3 className="text-lg font-semibold mb-4">Select an Emoji</h3>
//             <div className="grid grid-cols-5 gap-2">
//               {['😀', '😂', '😍', '😢', '👍', '❤️', '😴', '😎', '👀', '🎉',
//                 '🥰', '🥱', '🤤', '😛', '🤑', '😤', '😭', '🤧', '🫢', '🐕', '🙇‍♀️', '🙆‍♂️',
//                 '🚶', '👆', '👊', '🤛', '👏', '✍️', '🤝', '🎈', '🏅', '🖋️', '🍔', '🎂',
//                 '🚗', '🌎', '❤️', '💙', '💞', '🚷', '💯', '✅', '❎'
//               ].map((emoji) => (
//                 <button
//                   key={emoji}
//                   onClick={() => handleEmojiSelect(emoji)}
//                   className="text-2xl hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {isEditModalOpen && currentMediaIndex !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-96 p-6 relative">
//             <button
//               onClick={() => setIsEditModalOpen(false)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//             >
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </button>
//             <h3 className="text-lg font-semibold mb-4">Edit {mediaType === 'video' ? 'Video' : 'Image'}</h3>
//             {mediaType === 'video' && selectedVideos[currentMediaIndex] && (
//               <video src={selectedVideos[currentMediaIndex].url} controls className="w-full h-64 object-cover mb-4" />
//             )}
//             {mediaType === 'image' && selectedImages[currentMediaIndex] && (
//               <img src={selectedImages[currentMediaIndex].url} alt="Edit" className="w-full h-64 object-cover mb-4" />
//             )}
//             <div className="flex justify-end">
//               <button
//                 onClick={saveEditedMedia}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 {mediaType === 'video' ? 'Save Trim' : 'Save Crop'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



//go to the end of the file




// import React, { useContext, useState } from 'react'
// import SocialMediaToolbar from './LiveStream'
// import TabInterface from './TabInterface'
// import { UserContext } from '../../../context/UserContext'
// import { ArrowRight, Edit, GraduationCap, Image, NotepadText, Pencil, Smile, UserCircle2, VideoIcon } from 'lucide-react'
// import { Link } from 'react-router-dom'
// import { PostService } from '../../../api/PostService'

// const MainSection = () => {
//   const { user } = useContext(UserContext);
//   const [isModalOpen, setIsModalOpen] = useState(user.isNewUser || false); // Show modal only for new users
//   const [ModalOpen, setModalOpen] = useState(false);
//   const [posts, setPosts] = useState([]);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0])
//     }
//   }

//   const handlePost = (postData) => {
//     setPosts([...posts, postData]); // Add new post to the list
//     console.log('New Post:', postData); // For debugging
//   };

//   const handleClose = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div>
//       {user.isNewUser && (
//         <>
//           <div>{isModalOpen && <WelcomeModal onClose={handleClose} />}</div>
//           <div>
//             <ProfileProgressDropdown />
//           </div>
//         </>
//       )}
//       <div className='border border-gray-200 p-2 rounded-lg flex gap-3'>
//         <img src={user.profile_photo} alt="profile" className='h-12 w-12 rounded-full' />
//         <button onClick={() => setModalOpen(true)} className='w-full rounded-lg border border-gray-200 flex items-center justify-between px-3'>
//           Share an update...
//           <span><Edit className='text-[#5DA05D]'/></span>
//         </button>
//       </div>
//       <ModalComponent
//         isOpen={ModalOpen}
//         onClose={() => setModalOpen(false)}
//         onPost={handlePost}
//       />
//       <TabInterface />
//     </div>
//   )
// }

// const WelcomeModal = ({ onClose }) => {
//   const { user } = useContext(UserContext);
//   return (
//     <div className="inset-0 flex items-center justify-center z-50 mb-2">
//       <div className="bg-gradient-to-r from-[#5DA05D] to-[#5DA05D] text-white px-4 py-2 rounded-lg shadow-lg max-w-3xl w-full">
//         <button onClick={onClose} className="float-right text-white hover:text-gray-300">
//           <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//         <div className="flex items-center mb-2">
//           👏
//           <h2 className="text-lg font-bold">WELCOME TO CAREER-NEXUS, {user.first_name?.toUpperCase()}</h2>
//         </div>
//         <div className='flex items-center justify-between gap-5'>
//           <p className="text-xs">
//             Let's get you started on your professional journey. Complete your profile to unlock the full potential of our platform.
//           </p>
//           <button className='bg-white px-2 py-[6px] rounded-lg text-[#5DA05D] w-56 hover:bg-[#2b5b2b] hover:text-white'>Complete now</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProfileProgressDropdown = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const totalItems = 6;
//   const completedItems = 1; // Example: 1 item completed
//   const progress = (completedItems / totalItems) * 100;

//   const profileItems = [
//     { id: 1, icon: <UserCircle2 className="w-5 h-5 mr-2" />, text: 'Upload Profile Picture', completed: true, linkto: <Link to={'/profilepage'}><ArrowRight/></Link> },
//     { id: 2, icon: <Pencil className="w-5 h-5 mr-2" />, text: 'Add a Bio Description', completed: false, linkto: <Link to={'/profilepage'}><ArrowRight/></Link> },
//     { id: 3, icon: <NotepadText className="w-5 h-5 mr-2" />, text: 'Add Work Experience', completed: false, linkto: <Link to={'/profilepage'}><ArrowRight/></Link> },
//     { id: 4, icon: <GraduationCap className="w-5 h-5 mr-2" />, text: 'Add Educational Background', completed: false, linkto: <Link to={'/profilepage'}><ArrowRight/></Link> },
//     { id: 5, icon: <VideoIcon className="w-5 h-5 mr-2" />, text: 'Upload Video Introduction', completed: false, linkto: <Link to={'/profilepage'}><ArrowRight/></Link> },
//     { id: 6, icon: <NotepadText className="w-5 h-5 mr-2" />, text: 'Add Certifications', completed: false, linkto: <Link to={'/profilepage'}><ArrowRight/></Link> },
//   ];

//   return (
//     <div className="relative w-full max-w-3xl my-3">
//       <div
//         className="flex items-center justify-between p-4 bg-white border rounded-lg shadow cursor-pointer"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span>COMPLETE YOUR PROFILE ({progress}%)</span>
//         <svg
//           className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//         </svg>
//       </div>
//       {isOpen && (
//         <div className="w-full mt-1 bg-white border rounded-lg shadow-lg">
//           <ul className="py-2">
//             {profileItems.map((item) => (
//               <li
//                 key={item.id}
//                 className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
//               >
//                 <span className={item.completed ? 'text-green-500' : 'text-gray-400'}>
//                   {item.icon}
//                 </span>
//                 <span>{item.text}</span>
//                 <span className='ml-auto mr-4 text-gray-400'>{item.linkto}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// const ModalComponent = ({ isOpen, onClose }) => {
//   const { user } = useContext(UserContext);
//   const [postContent, setPostContent] = useState('');
//   const [visibility, setVisibility] = useState('Everyone');
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
//   const [selectedEmoji, setSelectedEmoji] = useState('');
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [selectedVideos, setSelectedVideos] = useState([]);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [currentMediaIndex, setCurrentMediaIndex] = useState(null);
//   const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
//   const [error, setError] = useState(''); // Added for error handling

//   if (!isOpen) return null;

//   const handlePost = async () => {
//     if (!postContent.trim() && selectedImages.length === 0 && selectedVideos.length === 0) {
//       setError('Please add content or media to post.');
//       return;
//     }

//     try {
//       const postData = {
//         body: postContent + selectedEmoji,
//         profile: user?.profile_id || user?.id || '', // Adjust based on your user object
//         count: 1, // Default value, adjust if needed
//         media: selectedImages.length > 0 ? selectedImages[0].file : selectedVideos.length > 0 ? selectedVideos[0].file : null, // Send first file
//       };

//       await PostService.createPost(postData);
      
//       // Clear form and close modal on success
//       setPostContent('');
//       setSelectedEmoji('');
//       setSelectedImages([]);
//       setSelectedVideos([]);
//       setError('');
//       onClose();
//     } catch (err) {
//       setError(err.message || 'Failed to create post. Please try again.');
//       console.error('Post Error:', err);
//     }
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleVisibilityChange = (value) => {
//     setVisibility(value);
//     setIsDropdownOpen(false);
//   };

//   const toggleEmojiModal = () => {
//     setIsEmojiModalOpen(!isEmojiModalOpen);
//   };

//   const handleEmojiSelect = (emoji) => {
//     setPostContent(postContent + emoji);
//     setSelectedEmoji(emoji);
//     setIsEmojiModalOpen(false);
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//       cropped: false,
//     }));
//     setSelectedImages((prevImages) => [...prevImages, ...newImages]);
//   };

//   const handleVideoChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newVideos = files.map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//       trimmed: false,
//     }));
//     setSelectedVideos((prevVideos) => [...prevVideos, ...newVideos]);
//   };

//   const openEditModal = (index, type) => {
//     setCurrentMediaIndex(index);
//     setMediaType(type);
//     setIsEditModalOpen(true);
//   };

//   const saveEditedMedia = () => {
//     if (mediaType === 'video') {
//       setSelectedVideos((prevVideos) =>
//         prevVideos.map((vid, i) => (i === currentMediaIndex ? { ...vid, trimmed: true } : vid))
//       );
//     } else if (mediaType === 'image') {
//       setSelectedImages((prevImages) =>
//         prevImages.map((img, i) => (i === currentMediaIndex ? { ...img, cropped: true } : img))
//       );
//     }
//     setIsEditModalOpen(false);
//   };

//   const removeMedia = (index, type) => {
//     if (type === 'video') {
//       setSelectedVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
//     } else if (type === 'image') {
//       setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative">
//         {error && (
//           <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
//             {error}
//           </div>
//         )}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//         >
//           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//           </svg>
//         </button>
//         <div className="flex items-center mb-4">
//           <img src={user.profile_photo} alt="User" className="w-10 h-10 rounded-full mr-2" />
//           <div className="relative">
//             <button
//               onClick={toggleDropdown}
//               className="border border-green-600 rounded-lg px-2 py-2 bg-white text-sm flex items-center w-52 text-green-500"
//             >
//               {visibility}
//               <svg className="ml-auto w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//               </svg>
//             </button>
//             {isDropdownOpen && (
//               <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-lg">
//                 <label className="flex items-center px-4 py-3 hover:bg-gray-100">
//                   <input
//                     type="radio"
//                     name="visibility"
//                     value="Everyone"
//                     checked={visibility === 'Everyone'}
//                     onChange={(e) => handleVisibilityChange(e.target.value)}
//                     className="form-radio text-green-500 mr-2 p-3"
//                   />
//                   Everyone
//                 </label>
//                 <label className="flex items-center px-4 py-3 hover:bg-gray-100">
//                   <input
//                     type="radio"
//                     name="visibility"
//                     value="Followers only"
//                     checked={visibility === 'Followers only'}
//                     onChange={(e) => handleVisibilityChange(e.target.value)}
//                     className="form-radio text-green-500 mr-2 p-3"
//                   />
//                   Followers only
//                 </label>
//               </div>
//             )}
//           </div>
//         </div>
//         <textarea
//           className="w-full h-52 p-2 border-0 border-b border-gray-200 resize-none mb-4 outline-none focus:outline-none focus:ring-0 focus:border-b focus:border-gray-200"
//           placeholder="Share an update..."
//           value={postContent}
//           onChange={(e) => setPostContent(e.target.value)}
//         ></textarea>
//         {(selectedImages.length > 0 || selectedVideos.length > 0) && (
//           <div className="mb-4 flex flex-wrap gap-4">
//             {selectedImages.map((img, index) => (
//               <div key={index} className="relative">
//                 <img src={img.url} alt="Selected" className="w-32 h-32 object-cover rounded" />
//                 <button
//                   onClick={() => removeMedia(index, 'image')}
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//                 >
//                   ×
//                 </button>
//                 <button
//                   onClick={() => openEditModal(index, 'image')}
//                   className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
//                 >
//                   Edit
//                 </button>
//               </div>
//             ))}
//             {selectedVideos.map((vid, index) => (
//               <div key={index} className="relative">
//                 <video src={vid.url} controls className="w-32 h-32 object-cover rounded" />
//                 <button
//                   onClick={() => removeMedia(index, 'video')}
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//                 >
//                   ×
//                 </button>
//                 <button
//                   onClick={() => openEditModal(index, 'video')}
//                   className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
//                 >
//                   Edit
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="flex justify-between items-center">
//           <div className="flex space-x-4 items-center">
//             <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={(e) => handleImageChange(e)}
//                 multiple
//               />
//               <Image />
//             </label>
//             <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
//               <input
//                 type="file"
//                 accept="video/*"
//                 className="hidden"
//                 onChange={(e) => handleVideoChange(e)}
//                 multiple
//               />
//               <VideoIcon />
//             </label>
//             <label
//               className="text-gray-500 hover:text-gray-700 cursor-pointer"
//               onClick={toggleEmojiModal}
//             >
//               <span>
//                 <Smile className="w-5 h-5" />
//               </span>
//             </label>
//           </div>
//           <button
//             disabled={!postContent.trim() && selectedImages.length === 0 && selectedVideos.length === 0}
//             onClick={handlePost}
//             className={`px-6 py-2 rounded-lg ${
//               !postContent.trim() && selectedImages.length === 0 && selectedVideos.length === 0
//                 ? 'bg-gray-200 cursor-not-allowed'
//                 : 'bg-green-600 hover:bg-green-600 text-white'
//             }`}
//           >
//             Post
//           </button>
//         </div>
//       </div>

//       {isEmojiModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-80 p-6 relative">
//             <button
//               onClick={toggleEmojiModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//             >
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </button>
//             <h3 className="text-lg font-semibold mb-4">Select an Emoji</h3>
//             <div className="grid grid-cols-5 gap-2">
//               {['😀', '😂', '😍', '😢', '👍', '❤️', '😴', '😎', '👀', '🎉',
//                 '🥰', '🥱', '🤤', '😛', '🤑', '😤', '😭', '🤧', '🫢', '🐕', '🙇‍♀️', '🙆‍♂️',
//                 '🚶', '👆', '👊', '🤛', '👏', '✍️', '🤝', '🎈', '🏅', '🖋️', '🍔', '🎂',
//                 '🚗', '🌎', '❤️', '💙', '💞', '🚷', '💯', '✅', '❎'
//               ].map((emoji) => (
//                 <button
//                   key={emoji}
//                   onClick={() => handleEmojiSelect(emoji)}
//                   className="text-2xl hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center"
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {isEditModalOpen && currentMediaIndex !== null && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-96 p-6 relative">
//             <button
//               onClick={() => setIsEditModalOpen(false)}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
//             >
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//               </svg>
//             </button>
//             <h3 className="text-lg font-semibold mb-4">Edit {mediaType === 'video' ? 'Video' : 'Image'}</h3>
//             {mediaType === 'video' && selectedVideos[currentMediaIndex] && (
//               <video src={selectedVideos[currentMediaIndex].url} controls className="w-full h-64 object-cover mb-4" />
//             )}
//             {mediaType === 'image' && selectedImages[currentMediaIndex] && (
//               <img src={selectedImages[currentMediaIndex].url} alt="Edit" className="w-full h-64 object-cover mb-4" />
//             )}
//             <div className="flex justify-end">
//               <button
//                 onClick={saveEditedMedia}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 {mediaType === 'video' ? 'Save Trim' : 'Save Crop'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MainSection