import React, { useEffect, useState } from 'react'
import { PostService } from '../../../../../api/PostService';
import { useParams } from "react-router-dom";

function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false); 
  const { id: userId } = useParams();

  const fetchAnalytics = async () => {
    try {
      const data = await PostService.analyticsOfOtherUser(userId);
      console.log("Fetched analytics:", data);

      if (data?.analytics === "Analytics is private for this user") {
        setIsPrivate(true);
        setAnalytics(null);
      } else {
        setIsPrivate(false);
        setAnalytics(data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAnalytics();
    }
  }, [userId]);


  const metrics = [
    {
      key: "total_posts",
      icon: (
        <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      label: "Total Posts",
    },
    {
      key: "total_connections",
      icon: (
        <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      label: "Connections",
    },
    {
      key: "total_views",
      icon: (
        <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Profile Views",
    },
  ];

  // static analytics cards (optional)
  const analyticsData = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      value: "11",
      label: "Profile Views",
      subText: "Discover who's viewed your profile.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      ),
      value: "0",
      label: "Post Impressions (Past 7 days)",
      subText: "Boost engagement",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      value: "14",
      label: "Search Appearances",
      subText: "See how often you appear in search results",
    },
  ];

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
      {isPrivate ? (
        <p className="text-red-500 italic">
          Analytics is private for this user.
        </p>
      ) : analytics ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((item, index) => (
            <div key={index} className="bg-white p-4 flex flex-col rounded-lg shadow-md">
              <div className="flex ml-auto mb-5">{item.icon}</div>
              <p className="text-2xl font-bold">{analytics[item.key]}</p>
              <p className="text-sm text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Loading analytics...</p>
      )}

      {/* <div className="mt-5">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics (Private to you)</h2>
        {analyticsData.map((item, index) => (
          <AnalyticsCard
            key={index}
            icon={item.icon}
            value={item.value}
            label={item.label}
            subText={item.subText}
          />
        ))}
      </div> */}
      <div className="mt-5">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics (Private to you)</h2>

  {analytics ? (
    <>
      <AnalyticsCard
        icon={(
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        )}
        value={analytics.total_views}
        label="Profile Views"
        subText="Discover who's viewed your profile."
      />

      {/* <AnalyticsCard
        icon={(
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
        value="0" // (replace with API key if backend provides impressions)
        label="Post Impressions (Past 7 days)"
        subText="Boost engagement"
      />

      <AnalyticsCard
        icon={(
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
        value="14" // (replace with API key if backend provides search appearances)
        label="Search Appearances"
        subText="See how often you appear in search results"
      /> */}
    </>
  ) : (
    <p className="text-gray-500">Loading analytics...</p>
  )}
</div>

      {/* <div>
        <RecentActivities />
      </div> */}
    </div>
  );
}
export default AnalyticsDashboard;

const AnalyticsCard = ({ icon, value, label, subText }) => {
    return (
        <div className="bg-white rounded-lg p-2 mb-4 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="text-green-500">{icon}</div>
                    <div className="flex gap-3 items-center">
                        <p className="text-lg font-medium">{value}</p>
                        <p className="text-sm text-gray-600">{label}</p>
                    </div>
                </div>
                <button className="text-green-500 hover:text-green-700 mt-5">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <p className="text-sm text-gray-500">{subText}</p>
        </div>
    );
};

const RecentActivities = () => {
    return (
        <div className="">
            <div className="mb-4">
                <button className="text-green-500 ml-auto mr-4 hover:text-green-700 flex items-center text-sm font-medium">
                    Show all analytics
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                <div className="flex items-center justify-between mt-8">
                    <h2 className="text-xl font-semibold text-gray-800">Recent Activities</h2>
                    <button className="flex items-center text-green-500 border border-green-500 rounded-lg px-4 py-1 hover:bg-green-50 transition-colors duration-200">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Create New post
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-lg">
                <div className="py-4 border-b border-gray-200">
                    <p className="text-sm text-gray-700">You posted "Dashboard Tips" on Dec 2, 2024</p>
                </div>
                <div className="py-4 border-b border-gray-200">
                    <p className="text-sm text-gray-700">You posted "How to build a great portfolio" on Dec 1, 2024</p>
                </div>
                <div className="py-4 border-b border-gray-200">
                    <p className="text-sm text-gray-700">You Completed the project "Career Nexus UI Redesign" on Nov 30, 2024</p>
                </div>
                <div className="py-4">
                    <p className="text-sm text-gray-700">You added a new connection: John Doe</p>
                </div>
            </div>
        </div>
    );
};