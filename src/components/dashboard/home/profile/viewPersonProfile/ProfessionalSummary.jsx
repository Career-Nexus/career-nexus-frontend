import { useContext, useState } from "react";
import { UserContext } from "../../../../../context/UserContext";
import { Building, Calendar, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { Company1, Company2 } from "../../../../../icons/icon";

export default function ProfessionalSummary() {
    const { userwithid } = useContext(UserContext);

    return (
        <div>
            <div>
                <h2 className='font-bold text-xl mb-3'>Professional Summary</h2>
                <p className='text-sm'>
                    {userwithid.summary}
                </p>
            </div>

            {/* have it */}
            <ExperienceSection />
        </div>
    );
}

function ExperienceSection({ }) {
    const { userwithid } = useContext(UserContext);
    const [expandedItems, setExpandedItems] = useState({})

    const toggleExpand = (id) => {
        setExpandedItems((prev) => {
            // If the item is already expanded, collapse it
            if (prev[id]) {
                return {
                    ...prev,
                    [id]: false,
                }
            }

            // Otherwise, collapse all items and expand only the clicked one
            const resetExpanded = {}
            Object.keys(prev).forEach((key) => {
                resetExpanded[key] = false
            })

            return {
                ...resetExpanded,
                [id]: true,
            }
        })
    }
    const ItemCard = ({ id, itemType, logo, title, company, duration, address, desc }) => {
        const uniqueId = `${itemType}-${id}`;

        return (
            <div className="border rounded-lg mb-4 p-4 relative">
                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-[#5DA05D] rounded-md flex items-center justify-center">
                            {logo}
                        </div>
                    </div>

                    <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <h3 className="font-semibold text-base">{title}</h3>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Building className="h-4 w-4 mr-1 text-[#5DA05D]" />
                            <span>{company}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="h-4 w-4 mr-1 text-[#5DA05D]" />
                            <span>{duration}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="h-4 w-4 mr-1 text-[#5DA05D]" />
                            <span>{address}</span>
                        </div>

                        <ul className="list-disc ml-5 text-sm">
                            {/* {(Array.isArray(desc) ? desc : desc?.split(/[\n*-]/)) // split by newline, * or - */}
                            {(Array.isArray(desc) ? desc : desc?.split(/[\n]/)) // split by newline
                                .filter(Boolean) // remove empty strings
                                .map((point, idx) => (
                                    <li key={idx} className="mt-1">
                                        {point.trim()}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="w-full max-w-3xl mt-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Experience</h2>
            </div>

            {/* Walmart Experience */}
            {userwithid.experience.map(item => (
                <ItemCard
                    key={item.id || index}
                    id={item.id || `experience-${index}`} // Pass unique id
                    itemType="experience"
                    logo={
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5DA05D] text-white font-bold">
                            {item.organization
                                .split(" ")
                                .map(word => word[0]?.toUpperCase())
                                .join("")
                                .slice(0, 2) || "?"}
                        </div>
                    }
                    title={item.title}
                    // status1={status2}
                    // status={"RECOMMENDED"}
                    company={item.organization || "Unknown Company"}
                    duration={`${item.start_date || "Unknown"} - ${item.end_date || "Present"}`}
                    address={item.location || "Unknown Location"}
                    desc={item.detail || "No description provided."}
                />
            ))}

            {/* education modal */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Education</h2>
                </div>
                {userwithid.education &&
                    userwithid.education.map((item, index) => (
                        <ItemCard
                            key={item.id || index}
                            itemType={'education'}
                            id={item.id || `education-${index}`}
                            logo={
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5DA05D] text-white font-bold">
                                    {item.school
                                        .split(" ")
                                        .map(word => word[0]?.toUpperCase())
                                        .join("")
                                        .slice(0, 2) || "?"}
                                </div>}
                            title={item.course}
                            initialStatus={index % 2 === 1} // Alternating for demo purposes
                            company={item.school}
                            duration={`${item.start_date || "Unknown"} - ${item.end_date || "Present"}`}
                            address={item.location}
                            desc={item.detail}
                        />
                    ))}
            </div>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Licenses & Certifications</h2>
                </div>
                {userwithid.certification &&
                    userwithid.certification.map((item, index) => (
                        <ItemCard
                            key={item.id || index}
                            itemType={'certificate'}
                            id={item.id || `certification-${index}`}
                            logo={
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5DA05D] text-white font-bold">
                                    {item.title
                                        .split(" ")
                                        .map(word => word[0]?.toUpperCase())
                                        .join("")
                                        .slice(0, 2) || "?"}
                                </div>
                            }
                            title={item.title}
                            initialStatus={index % 2 === 0} // Alternating for demo purposes
                            company={item.school}
                            duration={item.issue_date}
                            desc={item.skills}
                        />
                    ))}
            </div>
        </div>
    )
}