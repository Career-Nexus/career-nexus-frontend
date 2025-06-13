import React, { useContext, useState } from 'react'
import SocialMediaToolbar from './LiveStream'
import TabInterface from './TabInterface'
import { UserContext } from '../../../context/UserContext'
import { ArrowRight, Edit, GraduationCap, Image, NotepadText, Pencil, UserCircle2, VideoIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PostService } from '../../../api/PostService'


const MainSection = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [ModalOpen, setModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

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
      <div className="mt-4">
        {/* <h2 className="text-lg font-bold">Posts:</h2> */}
        {posts.map((post, index) => (
          <div key={index} className="border p-2 my-2 rounded">
            <p>{post.content}</p>
            <p className="text-sm text-gray-500">Visibility: {post.visibility}</p>
          </div>
        ))}
      </div>
      {/* <div className='border border-gray-300 rounded-lg p-4 hidden md:block'>
                <div className='gap-2 mt-3 w-full'>
                    <SocialMediaToolbar />
                </div>
            </div>*/}
      {/* <div className=''>
        <input type='text' name="update" id="update" placeholder='Share an update' className='block md:hidden w-full rounded-lg border-gray-300 bg-gray-50' />
      </div> */}
      <TabInterface />
    </div>
  )
}

const WelcomeModal = ({ onClose }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="inset-0 flex items-center justify-center z-50 mb-2">
      {/* <div className="bg-gradient-to-r from-[#131927E5] to-[#5DA05D] text-white p-6 rounded-lg shadow-lg max-w-3xl w-full"> */}
      <div className="bg-gradient-to-r from-[#5DA05D] to-[#5DA05D] text-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
        <button onClick={onClose} className="float-right text-white hover:text-gray-300">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex items-center mb-4">
          👏
          <h2 className="text-xl font-bold">WELCOME TO CAREER-NEXUS, {user.first_name?.toUpperCase()}</h2>
        </div>
        <div className='flex items-center justify-between'>
          <p className="text-sm">
          Let's get you started on your professional journey. Complete your profile to unlock the full potential of our platform.
        </p>
        <button className='bg-white p-2 rounded-lg text-[#5DA05D] w-56 hover:bg-[#2b5b2b] hover:text-white'>Complete now</button>
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
                <span className={item.completed ? 'text-green-500' : 'text-gray-400'}>
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
const ModalComponent = ({ isOpen, onClose }) => {
  const { user } = useContext(UserContext);
  const [postContent, setPostContent] = useState('');
  const [visibility, setVisibility] = useState('Everyone');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEmojiModalOpen, setIsEmojiModalOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
  const [error, setError] = useState(''); // Added for error handling

  if (!isOpen) return null;

  const handlePost = async () => {
    if (!postContent.trim() && selectedImages.length === 0 && selectedVideos.length === 0) {
      setError('Please add content or media to post.');
      return;
    }

    try {
      const postData = {
        body: postContent + selectedEmoji,
        profile: user?.profile_id || user?.id || '', // Adjust based on your user object
        count: 1, // Default value, adjust if needed
        media: selectedImages.length > 0 ? selectedImages[0].file : selectedVideos.length > 0 ? selectedVideos[0].file : null, // Send first file
      };

      await PostService.createPost(postData);
      
      // Clear form and close modal on success
      setPostContent('');
      setSelectedEmoji('');
      setSelectedImages([]);
      setSelectedVideos([]);
      setError('');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create post. Please try again.');
      console.error('Post Error:', err);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleVisibilityChange = (value) => {
    setVisibility(value);
    setIsDropdownOpen(false);
  };

  const toggleEmojiModal = () => {
    setIsEmojiModalOpen(!isEmojiModalOpen);
  };

  const handleEmojiSelect = (emoji) => {
    setPostContent(postContent + emoji);
    setSelectedEmoji(emoji);
    setIsEmojiModalOpen(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      cropped: false,
    }));
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    const newVideos = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      trimmed: false,
    }));
    setSelectedVideos((prevVideos) => [...prevVideos, ...newVideos]);
  };

  const openEditModal = (index, type) => {
    setCurrentMediaIndex(index);
    setMediaType(type);
    setIsEditModalOpen(true);
  };

  const saveEditedMedia = () => {
    if (mediaType === 'video') {
      setSelectedVideos((prevVideos) =>
        prevVideos.map((vid, i) => (i === currentMediaIndex ? { ...vid, trimmed: true } : vid))
      );
    } else if (mediaType === 'image') {
      setSelectedImages((prevImages) =>
        prevImages.map((img, i) => (i === currentMediaIndex ? { ...img, cropped: true } : img))
      );
    }
    setIsEditModalOpen(false);
  };

  const removeMedia = (index, type) => {
    if (type === 'video') {
      setSelectedVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
    } else if (type === 'image') {
      setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl p-6 relative">
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center mb-4">
          <img src={user.profile_photo} alt="User" className="w-10 h-10 rounded-full mr-2" />
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="border border-green-600 rounded-lg px-2 py-2 bg-white text-sm flex items-center w-52 text-green-500"
            >
              {visibility}
              <svg className="ml-auto w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                    checked={visibility === 'Everyone'}
                    onChange={(e) => handleVisibilityChange(e.target.value)}
                    className="form-radio text-green-500 mr-2 p-3"
                  />
                  Everyone
                </label>
                <label className="flex items-center px-4 py-3 hover:bg-gray-100">
                  <input
                    type="radio"
                    name="visibility"
                    value="Followers only"
                    checked={visibility === 'Followers only'}
                    onChange={(e) => handleVisibilityChange(e.target.value)}
                    className="form-radio text-green-500 mr-2 p-3"
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
        ></textarea>
        {(selectedImages.length > 0 || selectedVideos.length > 0) && (
          <div className="mb-4 flex flex-wrap gap-4">
            {selectedImages.map((img, index) => (
              <div key={index} className="relative">
                <img src={img.url} alt="Selected" className="w-32 h-32 object-cover rounded" />
                <button
                  onClick={() => removeMedia(index, 'image')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
                <button
                  onClick={() => openEditModal(index, 'image')}
                  className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  Edit
                </button>
              </div>
            ))}
            {selectedVideos.map((vid, index) => (
              <div key={index} className="relative">
                <video src={vid.url} controls className="w-32 h-32 object-cover rounded" />
                <button
                  onClick={() => removeMedia(index, 'video')}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
                <button
                  onClick={() => openEditModal(index, 'video')}
                  className="absolute bottom-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e)}
                multiple
              />
              <Image />
            </label>
            <label className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <input
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => handleVideoChange(e)}
                multiple
              />
              <VideoIcon />
            </label>
            <label
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={toggleEmojiModal}
            >
              <span>😊</span>
            </label>
          </div>
          <button
            disabled={!postContent.trim() && selectedImages.length === 0 && selectedVideos.length === 0}
            onClick={handlePost}
            className={`px-6 py-2 rounded-lg ${
              !postContent.trim() && selectedImages.length === 0 && selectedVideos.length === 0
                ? 'bg-gray-200 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-600 text-white'
            }`}
          >
            Post
          </button>
        </div>
      </div>

      {isEmojiModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-80 p-6 relative">
            <button
              onClick={toggleEmojiModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold mb-4">Select an Emoji</h3>
            <div className="grid grid-cols-5 gap-2">
              {['😀', '😂', '😍', '😢', '👍', '❤️', '😴', '😎', '👀', '🎉',
                '🥰', '🥱', '🤤', '😛', '🤑', '😤', '😭', '🤧', '🫢', '🐕', '🙇‍♀️', '🙆‍♂️',
                '🚶', '👆', '👊', '🤛', '👏', '✍️', '🤝', '🎈', '🏅', '🖋️', '🍔', '🎂',
                '🚗', '🌎', '❤️', '💙', '💞', '🚷', '💯', '✅', '❎'
              ].map((emoji) => (
                <button
                  key={emoji}
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

      {isEditModalOpen && currentMediaIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 relative">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h3 className="text-lg font-semibold mb-4">Edit {mediaType === 'video' ? 'Video' : 'Image'}</h3>
            {mediaType === 'video' && selectedVideos[currentMediaIndex] && (
              <video src={selectedVideos[currentMediaIndex].url} controls className="w-full h-64 object-cover mb-4" />
            )}
            {mediaType === 'image' && selectedImages[currentMediaIndex] && (
              <img src={selectedImages[currentMediaIndex].url} alt="Edit" className="w-full h-64 object-cover mb-4" />
            )}
            <div className="flex justify-end">
              <button
                onClick={saveEditedMedia}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {mediaType === 'video' ? 'Save Trim' : 'Save Crop'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
