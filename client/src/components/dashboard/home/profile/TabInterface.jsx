import { Card, CardBody } from "@chakra-ui/react"
import { useState } from "react"
// import { Card, CardContent } from "@/components/ui/card"

export default function TabInterface() {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    {
      title: "Posts",
      content: "This is the Posts section content. Here you can find all your posts and updates.",
    },
    {
      title: "Professional Summary",
      content:
        "Your professional summary goes here. This section highlights your skills, experience, and achievements.",
    },
    {
      title: "Portfolio Virtual Gallery",
      content: "Welcome to your virtual gallery. This space showcases your portfolio items in an interactive format.",
    },
    {
      title: "Project Catalog",
      content:
        "Browse through your project catalog. This section contains all your projects with detailed information.",
    },
    {
      title: "Analytics Dashboard",
      content: "View your analytics dashboard. Here you can track performance metrics and insights.",
    },
  ]

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex flex-wrap gap-4 my-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`border px-2 py-1 rounded-lg text-sm ${
              activeTab === index ? "border-[#5DA05D] text-[#5DA05D]" : "border-gray-300 text-gray-700"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>

      <Card className="mt-6">
        <CardBody className="pt-6">
          <div className="prose">
            <h3 className="text-lg font-medium mb-2">{tabs[activeTab].title}</h3>
            <p>{tabs[activeTab].content}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}