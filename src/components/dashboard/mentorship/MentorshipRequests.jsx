const MentorshipRequests = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Search and Tabs */}
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search mentorship requests"
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button className="ml-4 px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Search</button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button className="border-b-2 border-gray-800 pb-2 font-semibold">BOOKING REQUESTS (4)</button>
        <button className="text-gray-500">UPCOMING SESSION (2)</button>
        <button className="text-gray-500">COMPLETED SESSION (12)</button>
      </div>

      {/* Request Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* TechCorp Solutions */}
        <div className="bg-white p-5 rounded-xl shadow">
          <div className="flex justify-between items-center mb-2">
            <div className="font-bold text-lg">TechCorp Solutions</div>
            <span className="text-yellow-600 font-medium">Pending</span>
          </div>
          <div className="mb-3">
            <span className="text-sm text-gray-500">3 attendees</span>
            <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Group Session</span>
          </div>

          <div className="mb-3">
            <button className="w-full text-left bg-green-50 hover:bg-green-100 p-2 rounded text-sm text-green-700 flex justify-between items-center">
              Attendees (3)
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-2">
            <CalendarIcon />
            <span className="ml-2">2025-07-15</span>
            <ClockIcon className="ml-4" />
            <span className="ml-2">2:00 PM (1.5 hours)</span>
          </div>

          <div className="text-xs text-purple-700 bg-purple-100 px-2 py-1 w-max rounded mb-2">
            Team Development Workshop
          </div>

          <p className="text-sm text-gray-700 mb-4">
            Hi! We're looking for a group mentoring session for our development team. We want to discuss best practices for transitioning from frontend to full-stack development and...
          </p>

          <div className="flex space-x-3">
            <button className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700">Accept</button>
            <button className="flex-1 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50">Cancel</button>
          </div>
        </div>

        {/* Michael Chen */}
        <div className="bg-white p-5 rounded-xl shadow relative">
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="font-bold text-lg">Michael Chen</div>
              <div className="text-sm text-gray-500">Recent Graduate</div>
            </div>
            <span className="text-yellow-600 font-medium">Pending</span>
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-2">
            <CalendarIcon />
            <span className="ml-2">2025-07-18</span>
            <ClockIcon className="ml-4" />
            <span className="ml-2">10:00 AM (45 minutes)</span>
          </div>

          <div className="text-xs text-indigo-700 bg-indigo-100 px-2 py-1 w-max rounded mb-2">
            Resume Review
          </div>

          <p className="text-sm text-gray-700 mb-4">
            I'm a recent CS graduate looking for feedback on my resume and interview preparation tips. Your background in tech leadership would be incredibly valuable.
          </p>

          <div className="flex space-x-3">
            <button className="flex-1 py-2 bg-green-600 text-white rounded hover:bg-green-700">Accept</button>
            <button className="flex-1 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50">Cancel</button>
          </div>

          <div className="bottom-6 right-6 bg-green-100 rounded-full p-2 relative">
            <ChatIcon />
            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5">2</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SVG ICONS
const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3M16 7V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2m4-2a8 8 0 11-16 0 8 8 0 0116 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h5m-1 8l-5-5H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v7a2 2 0 01-2 2h-3l-5 5z" />
  </svg>
);

export default MentorshipRequests;