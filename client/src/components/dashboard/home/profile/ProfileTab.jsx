import { useState, useRef } from "react"
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
// import { Card, CardBody } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
import { Card, CardBody, Progress, Textarea, Button } from "@chakra-ui/react"
import { SocialInteractionBar } from "../SocialInteractionBar"
import { Clock } from "../../../../icons/icon"
import ExperienceSection from "./Experience"

export default function ProfileTabs() {
    const [activeTab, setActiveTab] = useState("posts")
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
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "posts" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("posts")}
                    >
                        <FileText className="h-3.5 w-3.5" />
                        Posts
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "professional" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("professional")}
                    >
                        <User className="h-3.5 w-3.5" />
                        Professional Portfolio
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg text-xs whitespace-nowrap transition-colors flex items-center gap-1.5 ${activeTab === "gallery" ? "border border-[#5DA05D] text-[#5DA05D]" : "border border-gray-300 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveTab("gallery")}
                    >
                        <Image className="h-3.5 w-3.5" />
                        Virtual Gallery
                    </button>
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
                {activeTab === "posts" && <PostsTemplate />}
                {activeTab === "professional" && <ProfessionalSummaryTemplate />}
                {activeTab === "gallery" && <PortfolioGalleryTemplate />}
                {activeTab === "projects" && <ProjectCatalogTemplate />}
                {activeTab === "analytics" && <AnalyticsDashboardTemplate />}
            </div>
        </div>
    )
}

function PostsTemplate() {
    const [expandedItems, setExpandedItems] = useState({
        walmart: false,
        apple: false
    });

    const toggleExpand = (key) => {
        setExpandedItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };
    const profile = [
        {
            id: 1, image: "/images/profile3.png", name: "Matthew Kunle",
            description: "Ux Mentor, Google certified Ux designer", days: "8d", timeIcon: <Clock />,
            disc2: "If you always stay in your comfort zone, how will you know what you're capable of?Most people don't fail because they lack talent or intelligence............................. ",
            image2: "/images/image1.png"
        },
        {
            id: 2, image: "/images/profile4.png", name: "Cole Kingsman",
            description: "Ceo texile rebound, Strategic Business man", days: "12hrs", timeIcon: <Clock />,
            disc2: "🔍 Why Do So Many Finance Apps Look the Same? Ever noticed how most fintech apps follow the same blue-and-white theme.... ",
            image2: "/images/image2.png"
        }
    ]
    return (
        <div>
            {profile.map(p => (
                <div key={p.id} className='border border-gray-300 rounded-lg p-4 my-5'>
                    <div className='flex gap-3 mb-2 items-center'>
                        <img src={p.image} alt="profile" className='w-12 h-12 rounded-full' />
                        <div className='flex flex-col justify-center'>
                            <h3 className='font-semibold text-sm'>{p.name}</h3>
                            <p className='font-light text-sm'>{p.description}</p>
                            <div className='flex items-center gap-1'>
                                <p>{p.days}</p>
                                <p>{p.timeIcon}</p>
                            </div>
                        </div>
                        <button className='ml-auto px-4 pb-1 rounded-lg font-bold text-2xl'>...</button>
                    </div>
                    <ul className="list-disc ml-5 mt-3 text-sm">

                        <span className=" ">

                            <span className='mb-3'>{p.disc2}</span>
                            {!expandedItems.walmart && "..."}
                            <button
                                onClick={() => toggleExpand("walmart")}
                                className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
                            >
                                {expandedItems.walmart ? (
                                    <>
                                        <span className='text-[#5DA05D]'>Hide</span>
                                        <ChevronUp className="h-3 w-3 ml-0.5" />
                                    </>
                                ) : (
                                    <>
                                        <span className='text-[#5DA05D]'>More</span>
                                        <ChevronDown className="h-3 w-3 ml-0.5" />
                                    </>
                                )}
                            </button>
                        </span>
                        {expandedItems.walmart && (
                            <>
                                <li className="mt-2">
                                    Collaborated with cross-functional teams to deliver high-quality software solutions on time and
                                    within budget.
                                </li>
                                <li className="mt-2">
                                    Implemented responsive design principles to ensure optimal user experience across various devices
                                    and screen sizes.
                                </li>
                                <li className="mt-2">
                                    Participated in code reviews and provided constructive feedback to improve code quality and
                                    maintainability.
                                </li>
                                <li className="mt-2">
                                    Utilized agile methodologies to manage project workflows and ensure continuous delivery of features.
                                </li>
                            </>
                        )}
                    </ul>
                    <div>
                        <img src={p.image2} alt="profile" className='w-full h-[348px]' />
                    </div>
                    <SocialInteractionBar
                        likes={125}
                        comments={25}
                        shares={2}
                        views={true}
                        events={true}
                    />
                </div>

            ))}

        </div>
    )
}

function ProfessionalSummaryTemplate() {
    const [summary, setSummary] = useState("")
    const [isEditing, setIsEditing] = useState(true)

    const wordCount = summary.trim() === "" ? 0 : summary.trim().split(/\s+/).length

    const handleSave = () => {
        setIsEditing(false)
    }

    const handleEdit = () => {
        setIsEditing(true)
    }

    return (
        <div className="w-full max-w-3xl">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold">Professional Summary</h2>
                <span className="text-sm text-gray-500">{wordCount}/1000 words</span>
            </div>

            <div className="relative">
                {isEditing ? (
                    <Textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Write a brief summary about your skills, experience, and career goals..."
                        className="min-h-[40px] w-full rounded-lg border-gray-300 resize-none p-4"
                    />
                ) : (
                    <div className="min-h-[60px] w-full rounded-lg border border-gray-300 p-4">
                        {summary || "Write a brief summary about your skills, experience, and career goals..."}
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
                        <button type="button" onClick={handleSave} className="bg-[#5DA05D] hover:bg-green-700 text-white rounded-lg px-4 py-1 text-sm">
                            Save
                        </button>
                    )}
                </div>
            </div>
            <ExperienceSection />
        </div>
    )
}

function PortfolioGalleryTemplate() {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
                <Image className="h-5 w-5 text-[#5DA05D]" />
                Portfolio Virtual Gallery
            </h2>

            {/* <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                <button className="bg-[#5DA05D] text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap">All Works</button>
                <button className="border border-gray-300 px-3 py-1 rounded-lg text-xs whitespace-nowrap">Web Design</button>
                <button className="border border-gray-300 px-3 py-1 rounded-lg text-xs whitespace-nowrap">Mobile Apps</button>
                <button className="border border-gray-300 px-3 py-1 rounded-lg text-xs whitespace-nowrap">UI/UX Design</button>
                <button className="border border-gray-300 px-3 py-1 rounded-lg text-xs whitespace-nowrap">Branding</button>
            </div> */}
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
                <button className="h-10 w-[50%] bg-[#5DA05D] text-white rounded-lg flex items-center px-2">
                    <Plus className="h-5 w-5 mr-2" />
                    Add project
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="group relative overflow-hidden rounded-lg">
                        <div className="aspect-square bg-gray-200 w-full"></div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="text-center p-4">
                                <h3 className="text-white font-medium mb-1">Project Title {item}</h3>
                                <p className="text-gray-300 text-sm mb-3">Web Design</p>
                                <button className="bg-[#5DA05D] text-white px-3 py-1 rounded text-xs flex items-center gap-1 mx-auto">
                                    View Details <ExternalLink className="h-3 w-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button className="border border-[#5DA05D] text-[#5DA05D] hover:bg-[#5DA05D] hover:text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Load More Works
                </button>
            </div>
        </div>
    )
}

function ProjectCatalogTemplate() {
    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-[#5DA05D]" />
                Project Catalog
            </h2>

            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-3">
                    <button className="bg-[#5DA05D] text-white px-3 py-1 rounded-lg text-xs">All Projects</button>
                    <button className="border border-gray-300 px-3 py-1 rounded-lg text-xs hidden sm:block">In Progress</button>
                    <button className="border border-gray-300 px-3 py-1 rounded-lg text-xs hidden sm:block">Completed</button>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="border border-gray-300 rounded-lg px-3 py-1 text-xs w-32 sm:w-auto"
                    />
                </div>
            </div>

            <div className="grid gap-6">
                {[1, 2, 3].map((item) => (
                    <Card key={item} className="overflow-hidden">
                        <CardBody className="p-0">
                            <div className="md:flex">
                                <div className="md:w-1/4 bg-gray-100 md:h-auto h-40 relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">Project Image</div>
                                </div>
                                <div className="p-5 md:w-3/4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">E-Commerce Platform Redesign</h3>
                                        <Badge
                                            className={
                                                item === 1
                                                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                                                    : "bg-green-100 text-green-800 hover:bg-green-100"
                                            }
                                        >
                                            {item === 1 ? "In Progress" : "Completed"}
                                        </Badge>
                                    </div>

                                    <p className="text-sm text-gray-700 mb-4">
                                        A complete redesign of an e-commerce platform focusing on improved user experience, mobile
                                        responsiveness, and conversion optimization.
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <Badge variant="outline" className="text-xs">
                                            React
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            Next.js
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            Tailwind CSS
                                        </Badge>
                                        <Badge variant="outline" className="text-xs">
                                            E-Commerce
                                        </Badge>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map((avatar) => (
                                                <div key={avatar} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                                            ))}
                                            <div className="w-6 h-6 rounded-full bg-[#5DA05D] border-2 border-white flex items-center justify-center text-white text-xs">
                                                +2
                                            </div>
                                        </div>

                                        <div className="text-xs text-gray-500">
                                            {item === 1 ? "Due in 2 weeks" : "Completed on May 15, 2023"}
                                        </div>

                                        <button className="bg-[#5DA05D] text-white px-3 py-1 rounded text-xs">View Details</button>
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
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#5DA05D]" />
                    Analytics Dashboard
                </h2>

                <div className="flex gap-2">
                    <select className="border border-gray-300 rounded px-2 py-1 text-xs">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>This year</option>
                    </select>
                    <button className="bg-[#5DA05D] text-white px-3 py-1 rounded text-xs">Export</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: "Total Views", value: "24,532", change: "+12.5%" },
                    { title: "Unique Visitors", value: "8,491", change: "+7.2%" },
                    { title: "Engagement Rate", value: "64.8%", change: "+3.1%" },
                    { title: "Avg. Session", value: "3m 42s", change: "-0.8%" },
                ].map((stat, index) => (
                    <Card key={index}>
                        <CardBody className="p-4">
                            <p className="text-sm text-gray-500">{stat.title}</p>
                            <div className="flex justify-between items-end">
                                <p className="text-2xl font-semibold">{stat.value}</p>
                                <p className={`text-xs ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                                    {stat.change}
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardBody className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium">Traffic Overview</h3>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="text-xs">
                                    Views
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                    Visitors
                                </Badge>
                            </div>
                        </div>
                        <div className="h-64 w-full bg-gray-100 rounded flex items-center justify-center">
                            <div className="text-center text-gray-500">
                                <BarChart3 className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                <p>Traffic Chart Visualization</p>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="p-4">
                        <h3 className="font-medium mb-4">Traffic Sources</h3>
                        <div className="space-y-4">
                            {[
                                { source: "Direct", percentage: 35 },
                                { source: "Organic Search", percentage: 28 },
                                { source: "Social Media", percentage: 22 },
                                { source: "Referrals", percentage: 15 },
                            ].map((source, index) => (
                                <div key={index}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>{source.source}</span>
                                        <span>{source.percentage}%</span>
                                    </div>
                                    <Progress value={source.percentage} className="h-1.5" />
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardBody className="p-4">
                        <h3 className="font-medium mb-4">Popular Content</h3>
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="flex gap-3 items-center">
                                    <div className="bg-gray-100 w-12 h-12 rounded flex-shrink-0"></div>
                                    <div className="flex-grow">
                                        <p className="text-sm font-medium truncate">How to Optimize Your React Application</p>
                                        <div className="flex gap-3 text-xs text-gray-500">
                                            <span>3.2k views</span>
                                            <span>124 shares</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>

                <Card>
                    <CardBody className="p-4">
                        <h3 className="font-medium mb-4">Audience Demographics</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-xs text-gray-500 mb-2">Age Groups</h4>
                                <div className="space-y-2">
                                    {[
                                        { group: "18-24", percentage: 15 },
                                        { group: "25-34", percentage: 42 },
                                        { group: "35-44", percentage: 28 },
                                        { group: "45+", percentage: 15 },
                                    ].map((age, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-full max-w-[100px]">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span>{age.group}</span>
                                                    <span>{age.percentage}%</span>
                                                </div>
                                                <Progress value={age.percentage} className="h-1.5" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs text-gray-500 mb-2">Devices</h4>
                                <div className="space-y-2">
                                    {[
                                        { device: "Mobile", percentage: 58 },
                                        { device: "Desktop", percentage: 32 },
                                        { device: "Tablet", percentage: 10 },
                                    ].map((device, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-full max-w-[100px]">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span>{device.device}</span>
                                                    <span>{device.percentage}%</span>
                                                </div>
                                                <Progress value={device.percentage} className="h-1.5" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

