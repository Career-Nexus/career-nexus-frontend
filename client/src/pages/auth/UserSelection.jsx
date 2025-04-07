
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function UserTypeSelection() {
  const [selectedUserType, setSelectedUserType] = useState("")
  const [selectedIndustries, setSelectedIndustries] = useState(["Technology", "Finance & Banking"])

  const industries = [
    "Technology",
    "Health care",
    "Retail & E-commerce",
    "Manufacturing",
    "Media & Entertainment",
    "Government & Public Sector",
    "Nonprofit & NGO",
    "Energy & Utilities",
    "Legal Services",
    "Construction & Real Estate",
    "Transportation & Logistics",
    "Agriculture",
    "Finance & Banking",
    "Education",
    "Others",
  ]

  const toggleIndustry = (industry) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter((i) => i !== industry))
    } else {
      setSelectedIndustries([...selectedIndustries, industry])
    }
  }

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-purple-900 mb-6">Select User Type</h1>

        <div className="relative w-full max-w-xs mx-auto">
          <select
            className="w-full appearance-none border border-gray-300 rounded-md py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
            value={selectedUserType}
            onChange={(e) => setSelectedUserType(e.target.value)}
          >
            <option value="">Select User Type</option>
            <option value="individual">Individual</option>
            <option value="business">Business</option>
            <option value="enterprise">Enterprise</option>
          </select>
          {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown size={16} />
          </div> */}
        </div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-purple-900 mb-2">Select your preferred industry</h2>
        <p className="text-sm text-gray-600 mb-6">
          This helps us personalize your experience and provide relevant resources.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {industries.map((industry) => (
            <button
              key={industry}
              className={`py-2 px-3 rounded-full text-xs border transition-colors ${
                selectedIndustries.includes(industry)
                  ? "bg-green-100 border-green-200 text-green-800"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => toggleIndustry(industry)}
            >
              {industry}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button type="submit" className="bg-[#5b9a68] hover:bg-green-600 text-white font-medium py-3 px-6 rounded-md w-full max-w-xs transition-colors">
          Done
        </button>
      </div>
    </div>
  )
}