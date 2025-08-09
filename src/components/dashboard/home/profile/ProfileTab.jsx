import { useState, useRef, useContext, useEffect } from "react"
import {
    BarChart3,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    User,
    FileText,
    Image,
    Briefcase,
    PieChart,
    Badge,
    ChevronUp,
    ChevronDown,
    Search,
    Plus,
} from "lucide-react"
import { Card, CardBody, Progress, Textarea, Button, Box } from "@chakra-ui/react"
import { Clock, Delete, Download, Edit, Editall, View } from "../../../../icons/icon"
import ExperienceSection from "./Experience"
import { ProductGalery } from "./ProductVirtualGalary"
import { AddProjectModal } from "./AllModal"
import ReusableModal from "./ModalDesign"
import { UserContext } from "../../../../context/UserContext"
import { PostService } from "../../../../api/PostService"
import { formatTimeAgo } from "../TabInterface"
import SocialBar from "../SocialBar"
import PostsTemplate from "./OwnPosts"
import { Link } from "react-router-dom"


export default function ProfileTabs() {
    const [activeTab, setActiveTab] = useState("professional")
    const tabsRef = useRef(null)

    // Scroll tabs horizontally on smaller screens
    const scrollTabs = (direction) => {
        if (tabsRef.current) {
            const scrollAmount = 200
            if (direction === "left") {
                tabsRef.current.scrollLeft -= scrollAmount
            } else {
                tabsRef.current.scrollLeft += scrollAmount
            }
        }
    }

    return (
        <div className="w-full max-w-6xl mx-auto pt-4">
            {/* Tabs navigation with scroll buttons for mobile */}
            <div className="relative">
                <button
                    onClick={() => scrollTabs("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md border md:hidden z-10"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                <div ref={tabsRef} className="my-3 gap-3 flex overflow-x-auto scrollbar-hide px-6 md:px-0 md:overflow-visible">

                    <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "professional" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("professional")}
                    >
                        <User className="h-3.5 w-3.5" />
                        Professional Portfolio
                    </button>
                    {/* <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "gallery" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("gallery")}
                    >
                        <Image className="h-3.5 w-3.5" />
                        Virtual Gallery
                    </button> */}
                    <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "projects" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("projects")}
                    >
                        <Briefcase className="h-3.5 w-3.5" />
                        Project Catalog
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "analytics" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("analytics")}
                    >
                        <PieChart className="h-3.5 w-3.5" />
                        Analytics Dashboard
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "posts" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("posts")}
                    >
                        <FileText className="h-3.5 w-3.5" />
                        Posts
                    </button>
                </div>

                <button
                    onClick={() => scrollTabs("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md border md:hidden z-10"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            {/* Tab content */}
            <div className="mt-6">
                <span>{activeTab === "professional" && <ProfessionalSummaryTemplate />}</span>
                <span>{activeTab === "gallery" && <PortfolioGalleryTemplate />}</span>
                <span>{activeTab === "projects" && <ProjectCatalogTemplate />}</span>
                <span>{activeTab === "analytics" && <AnalyticsDashboardTemplate />}</span>
                <span>{activeTab === "posts" && <PostsTemplate />}</span>
            </div>
        </div>
    )
}


function ProfessionalSummaryTemplate() {
    const [summary, setSummary] = useState("");
    const [isEditing, setIsEditing] = useState(true);
    const { user, updateUser } = useContext(UserContext);

    // Calculate word count based on user.summary
    const wordCount = user.summary?.trim() === "" ? 0 : user.summary?.trim().split(/\s+/).length || 0;

    const handleSave = (e) => {
        e.preventDefault();
        try {
            updateUser({ summary });
        } catch (error) {
            console.error("Error updating summary:", error);
        }
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
        // Optionally, sync the local state with user.summary when editing starts
        setSummary(user.summary || "");
    };

    return (
        <div className="w-full max-w-3xl">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Professional Summary</h2>
                <span className="text-sm text-gray-500">{wordCount}/1000 words</span>
            </div>

            <div className="relative">
                {isEditing ? (
                    <Textarea
                        rows={2}
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Write a brief summary about your skills, experience, and career goals..."
                        className="w-full rounded-lg border-gray-300 resize-none p-4"
                    />
                ) : (
                    <div className="min-h-[60px] w-full rounded-lg border border-gray-300 p-4">
                        {user.summary || "Write a brief summary about your skills, experience, and career goals..."}
                    </div>
                )}

                <div className="flex justify-end absolute bottom-4 right-2">
                    {!isEditing && (
                        <button
                            onClick={handleEdit}
                            className="text-[#5DA05D] hover:text-green-700 text-sm font-semibold mr-4"
                        >
                            Edit
                        </button>
                    )}
                    {isEditing && (
                        <button
                            type="submit"
                            onClick={handleSave}
                            className="bg-[#5DA05D] hover:bg-green-700 text-white rounded-lg px-4 py-1 text-sm"
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
            {/* <Link to={`/person-profile/${user.id}`}>View now</Link> */}
            {/* <p>{user.summary}</p> */}
            <ExperienceSection />
        </div>
    );
}

function PortfolioGalleryTemplate() {
    return (
        <div>
            <ProductGalery />
        </div>
    )
}

function ProjectCatalogTemplate() {
    const [openModal, setOpenModal] = useState()
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#5DA05D]" />
                Project Catalog
            </h2>
            <div className="flex gap-4">
                <label htmlFor="search" className="flex items-center border border-gray-300 rounded-lg w-full">
                    <Search className="ml-2" />
                    <input type="text" id="search" className="w-full py-2 border-0 focus:outline-none focus:ring-0 rounded-lg outline-none" placeholder="Search Projects....." />
                </label>
                <div className="border border-gray-300 rounded-lg w-full">
                    <select name="date" id="date" className="w-full border-0 border-gray-300 rounded-lg outline-none focus:outline-none focus:ring-0">
                        <option value="">Sort By Date</option>
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                        <option value="popular">Popular</option>
                        <option value="recentlyUpdated">Recently Updated</option>
                    </select>
                </div>
                <button onClick={() => setOpenModal(true)} className="h-10 w-[50%] bg-[#5DA05D] text-white rounded-lg flex items-center px-2">
                    <Plus className="h-5 w-5 mr-2" />
                    Add project
                    <AddProjectModal ModalComponent={ReusableModal} isOpen={openModal} onClose={() => setOpenModal(false)} />
                </button>
            </div>

            <div className="grid gap-6">
                {[1, 2, 3].map((item) => (
                    <Card key={item} className="overflow-hidden">
                        <CardBody className="p-0">
                            <div className="md:flex">
                                <div className="md:w-1/4 bg-gray-100 md:h-auto h-40 relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                        <img src="/images/gallery.png" alt="Gallery" />
                                    </div>
                                </div>
                                <div className="p-5 md:w-3/4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">E-Commerce Platform Redesign</h3>
                                    </div>

                                    <p className="text-sm text-gray-700 mb-4">
                                        A complete redesign of an e-commerce platform focusing on improved user experience, mobile
                                        responsiveness, and conversion optimization.
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="text-xs text-gray-500">
                                            {item === 1 ? "Due in 2 weeks" : "Completed on May 15, 2023"}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <View />
                                            <Download />
                                            <Editall />
                                            <Delete />
                                        </div>
                                        {/* <button className="bg-[#5DA05D] text-white px-3 py-1 rounded text-xs">View Details</button> */}
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    )
}

 function AnalyticsDashboardTemplate() {
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async () => {
    try {
      const data = await PostService.getAnalytics();
      console.log("Fetched analytics:", data);
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // metrics config with keys
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

      {analytics ? (
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

      <div className="mt-5">
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
      </div>

      <div>
        <RecentActivities />
      </div>
    </div>
  );
}
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