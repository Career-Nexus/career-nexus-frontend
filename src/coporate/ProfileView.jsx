import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit } from "../icons/icon";
import { Camera, Trash2, LoaderCircle } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { useParams } from "react-router-dom";
import CompanyModal from "./components/CompanyModal";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import PostSection from "./components/PostSection";
import OrganizationMembers from "./components/OrganizationalMembers";
import { CoverPhotoUserModal, ProfilePhotoUserModal } from "../components/dashboard/home/profile/ImagePreviewModal";


const ProfileCoverUI = ({ profile }) => {
  const [heroImage, setHeroImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const [coverModalImage, setCoverModalImage] = useState(null);
  const [profileModalImage, setProfileModalImage] = useState(null);
  const { updateUser } = useContext(UserContext);

  // Sync with profile data

  useEffect(() => {
    if (profile?.cover_photo) setHeroImage(profile.cover_photo);
    if (profile?.logo) setProfileImage(profile.logo);
  }, [profile]);

  const handleDirectUpload = async (file, type) => {
    if (!file) return;

    const preview = URL.createObjectURL(file);

    if (type === "hero") {
      setHeroImage(preview);
      setCoverModalImage(preview);
    } else {
      setProfileImage(preview);
      setProfileModalImage(preview);
    }

    try {
      const payload = type === "hero"
        ? { cover_photo: file }
        : { logo: file };

      await updateUser(payload);

      toast.success(
        `${type === "hero" ? "Cover photo" : "Profile photo"} updated successfully!`,
        { position: "top-center" }
      );
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err.message || "Error uploading image");
    }
  };
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    handleDirectUpload(file, type);
  };

  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="relative w-full h-48 overflow-hidden rounded-tl-lg rounded-tr-lg">
        <img
          src={heroImage || "/src/assets/images/banner-pics.png"}
          alt="cover photo"
          className="w-full h-full object-cover object-center cursor-pointer"
          onClick={() => setCoverModalImage(heroImage || "/src/assets/images/banner-pics.png")}
        />

        {/* small hover upload button (does NOT cover the whole image) */}
        <div
          className="absolute top-3 right-3 opacity-0 hover:opacity-100 transition-opacity"
          // prevent the parent image onClick from firing when clicking this button
          onClick={(e) => e.stopPropagation()}
        >
          <label htmlFor="hero-upload" className="flex items-center gap-2 cursor-pointer bg-black/50 p-2 rounded">
            <Camera className="text-white w-5 h-5" />
            <span className="text-white text-xs hidden sm:inline">Change</span>
          </label>
        </div>

        <input
          id="hero-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, "hero")}
        />
      </div>

      {/* PROFILE PHOTO (recommended) */}
      <div className="relative w-32 h-32">
        <div className="absolute mt-[-3.7rem] ml-3 w-32 h-32">
          <div className="w-full h-full clip-hexagon bg-white p-[4px] shadow-lg">
            <div className="w-full h-full clip-hexagon overflow-hidden">
              <img
                src={profileImage || "/images/profile2.png"}
                alt="profile"
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setProfileModalImage(profileImage || "/images/profile2.png")}
              />
            </div>
          </div>
        </div>

        {/* small overlay upload button for profile */}
        <div
          className="absolute mt-[-3.5rem] ml-3 top-0 right-0 opacity-0 hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <label htmlFor="profile-upload" className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 cursor-pointer">
            <Camera className="text-white w-4 h-4" />
          </label>
        </div>

        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e, "profile")}
        />
      </div>
      <CoverPhotoUserModal
        open={!!coverModalImage}
        image={coverModalImage}
        onClose={() => setCoverModalImage(null)}
        onUpload={(file) => handleDirectUpload(file, "hero")}
      />

      <ProfilePhotoUserModal
        open={!!profileModalImage}
        image={profileModalImage}
        onClose={() => setProfileModalImage(null)}
        onUpload={(file) => handleDirectUpload(file, "profile")}
      />
    </div>
  );
};


/* === MAIN PROFILE PAGE === */
export default function ProfileView() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [analyticsTab, setAnalyticsTab] = useState("Overview");
  const { user, error, updateUser, getUserById, userwithid } = useContext(UserContext);
  const [editModal, setEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accountMembers, setAccountMembers] = useState(user?.members || []);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getUserById(id); // fetch and store in context
    }
  }, [id]);

  useEffect(() => {
    if (user?.members) setAccountMembers(user.members);
  }, [user]);

  const profileData = id ? userwithid : user;



  const handleEditProfile = () => {
    // Logic to open edit profile modal or navigate to edit page
    setEditModal(true);
  };

  const handleUpdateCompany = (updatedData) => {
    // Logic to update company data
    setLoading(true);
    console.log("Updated Company Data:", updatedData);
    updateUser(updatedData);
    setEditModal(false);
    setLoading(false);
  };


  const tabs = [
    "Overview",
    "Organization Members",
    // "Analytics Dashboard",
    "Posts",
  ];

  const renderContent = () => {

    switch (activeTab) {
      /** ---------------- OVERVIEW ---------------- **/
      case "Overview":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Overview</h3>
            <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-1">
                  Company Description
                </h4>
                <p>
                  {profileData?.tagline || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Company</h4>
                  <p>{profileData?.company_name || "Company Name"}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Industry</h4>
                  <p>{profileData?.industry || "Technology"}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Total Employees</h4>
                  <p className="text-[#5DA05D]">{profileData?.company_size || "5–10 employees"}</p>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button className="border border-[#5DA05D] text-[#5DA05D] text-sm px-3 py-1 rounded-md hover:bg-green-50 shadow-sm transition">
                  Edit
                </button>
              </div>
            </div>
          </div>
        );

      /** ---------------- ORGANIZATION MEMBERS ---------------- **/
      case "Organization Members":
        return <OrganizationMembers />;


      /** ---------------- ANALYTICS DASHBOARD ---------------- **/
      case "Analytics Dashboard":
        const analyticsTabs = [
          "Overview",
          "Content",
          "Visitors",
          "Followers",
          "Search Appearances",
        ];

        const analyticsData = [
          { month: "Jan", impressions: 30, clicks: 10, engagement: 80 },
          { month: "Feb", impressions: 45, clicks: 20, engagement: 60 },
          { month: "Mar", impressions: 24, clicks: 12, engagement: 125 },
          { month: "Apr", impressions: 50, clicks: 25, engagement: 70 },
          { month: "May", impressions: 55, clicks: 30, engagement: 90 },
        ];

        const renderAnalyticsContent = () => {
          switch (analyticsTab) {
            case "Overview":
              return (
                <div className="space-y-6">

                  <div className="bg-white border rounded-lg p-6 shadow-sm">
                    <h4 className="text-lg font-semibold text-gray-700 mb-4">
                      Performance Overview
                    </h4>
                    <div className="w-full h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f3f3f3" />
                          <XAxis dataKey="month" stroke="#999" />
                          <YAxis stroke="#999" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "white",
                              border: "1px solid #ddd",
                              borderRadius: "8px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="impressions"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="clicks"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                          <Line
                            type="monotone"
                            dataKey="engagement"
                            stroke="#f59e0b"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              );

            case "Content":
              return (
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">Top Performing Posts</h4>
                  <table className="w-full text-sm text-left">
                    <thead className="text-gray-500 border-b">
                      <tr>
                        <th className="py-2">Post</th>
                        <th className="py-2">Impressions</th>
                        <th className="py-2">Clicks</th>
                        <th className="py-2">Engagement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Product Launch", 2045, 312, "7.5%"],
                        ["Tech Event Recap", 1768, 284, "8.9%"],
                        ["Hiring Update", 920, 120, "5.4%"],
                      ].map(([title, imp, click, eng], i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="py-2 font-medium">{title}</td>
                          <td>{imp}</td>
                          <td>{click}</td>
                          <td>{eng}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );

            case "Visitors":
              return (
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">Visitor Demographics</h4>
                  <div className="w-full flex flex-col md:flex-row gap-6 items-center">
                    <div className="w-full md:w-1/2 h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: "Mobile", value: 30 },
                              { name: "Desktop", value: 60 },
                              { name: "Tablet", value: 10 },
                            ]}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={50}
                            outerRadius={80}
                            label
                          >
                            {/* Assigning different colors to each slice */}
                            <Cell key="Mobile" fill="#5DA05D" />   {/* green */}
                            <Cell key="Desktop" fill="#4E61F6" />  {/* blue */}
                            <Cell key="Tablet" fill="#FFAA00" />   {/* amber */}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="flex flex-col gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#4E61F6]"></span>
                        <p>Desktop Users — 60%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#22c55e]"></span>
                        <p>Mobile Users — 30%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#f59e0b]"></span>
                        <p>Tablet Users — 10%</p>
                      </div>
                    </div>
                  </div>
                </div>
              );


            case "Followers":
              return (
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">Follower Growth</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>March</span>
                      <span>+150</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full">
                      <div className="h-2 bg-green-500 w-[70%] rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>April</span>
                      <span>+230</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full">
                      <div className="h-2 bg-green-500 w-[85%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              );

            case "Search Appearances":
              return (
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-800 mb-3">Search Appearances</h4>
                  <table className="w-full text-sm text-left">
                    <thead className="text-gray-500 border-b">
                      <tr>
                        <th className="py-2">Keyword</th>
                        <th className="py-2">Appearances</th>
                        <th className="py-2">CTR</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Fintech", 120, "5.6%"],
                        ["Career Nexus", 98, "8.2%"],
                        ["Digital Africa", 76, "4.3%"],
                      ].map(([keyword, count, ctr], i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="py-2 font-medium">{keyword}</td>
                          <td>{count}</td>
                          <td>{ctr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );

            default:
              return null;
          }
        };

        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white border rounded-lg p-4 text-center shadow-sm">
                <h4 className="text-2xl font-bold text-gray-800">103.5K</h4>
                <p className="text-gray-500 text-sm">Total Impressions</p>
              </div>
              <div className="bg-white border rounded-lg p-4 text-center shadow-sm">
                <h4 className="text-2xl font-bold text-gray-800">7.5K</h4>
                <p className="text-gray-500 text-sm">Total Clicks</p>
              </div>
              <div className="bg-white border rounded-lg p-4 text-center shadow-sm">
                <h4 className="text-2xl font-bold text-gray-800">6.8%</h4>
                <p className="text-gray-500 text-sm">Engagement Rate</p>
              </div>
              <div className="bg-white border rounded-lg p-4 text-center shadow-sm">
                <h4 className="text-2xl font-bold text-gray-800">2.1K</h4>
                <p className="text-gray-500 text-sm">New Followers</p>
              </div>
            </div>

            {/* === Analytics Tabs === */}
            <div className="flex gap-3 justify-between border-b overflow-x-auto">
              {analyticsTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setAnalyticsTab(tab)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${analyticsTab === tab
                    ? "border-[#5DA05D] text-[#5DA05D]"
                    : "border-transparent text-gray-600 hover:[#5DA05D]"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* === Active Tab Content === */}
            <AnimatePresence mode="wait">
              <motion.div
                key={analyticsTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderAnalyticsContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        );


      /** ---------------- POSTS ---------------- **/
      case "Posts":
        return <PostSection />;

      /** ---------------- DEFAULT ---------------- **/
      default:
        return (
          <div className="text-gray-700 bg-gray-50 border rounded-lg p-4 text-sm">
            <p>Content for "{activeTab}" goes here.</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-5xl flex flex-col gap-4 mb-5 bg-white overflow-hidden">
      {/* ===== Header Section ===== */}
      <div className="relative border border-gray-100">
        <div className="flex flex-col">
          <div className="relative">
            <ProfileCoverUI profile={id ? userwithid : user} />

            {/* Edit Button */}
            <button
              onClick={handleEditProfile}
              className="absolute top-[12.75rem] right-3 flex items-center gap-2 rounded-md border border-[#5DA05D] text-[#5DA05D] font-medium bg-white/80 backdrop-blur-sm hover:bg-green-50 shadow-md px-3 py-1.5 text-sm transition-all"
            >
              <Edit className="h-4 w-4" />
              Edit Page
            </button>
          </div>

          {/* Company Info */}
          <div className="flex mx-3 flex-col justify-self-start">
            <h2 className="text-4xl font-bold text-gray-800">
              {profileData?.company_name || "Company Name"}
            </h2>
            <p className="text-gray-500 text-sm">
              {profileData?.location || "London, England"} ·{" "}
              <a
                href={`http://${profileData?.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5DA05D] hover:underline"
              >
                {profileData?.website}
              </a>
            </p>
            <p className="text-gray-600 text-sm mt-1">
              {profileData?.industry || "Industry"}
            </p>
            {/* <p className="text-[#5DA05D] font-semibold mt-2">6,476 Followers</p> */}
          </div>
        </div>
      </div>

      {/* ===== Tabs ===== */}
      <div className="flex justify-between overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-3 mx-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${activeTab === tab
              ? "border border-[#5DA05D] text-[#5DA05D]"
              : "border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ===== Tab Content ===== */}
      <div className="min-h-[250px] my-4 bg-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Edit Profile Modal */}
      {editModal && (
        <CompanyModal
          isOpen={editModal}
          onClose={() => setEditModal(false)}
          onSubmit={handleUpdateCompany}
          loading={loading}
        />
      )}
    </div>
  );
}
