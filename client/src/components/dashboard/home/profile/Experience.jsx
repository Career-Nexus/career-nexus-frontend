import { Button } from "@chakra-ui/react"
import { MapPin, Building, Calendar, ChevronDown, ChevronUp, Plus, ComputerIcon, Computer } from "lucide-react"
// import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Company1, Company2, Edit, Like } from "../../../../icons/icon";
import ProjectFormModal from "./FormModal";
import ReusableModal from "./ModalDesign";

export default function ExperienceSection({ }) {
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
    const Experience = ({ edit, status1, logo, title, company, duration, address, desc }) => {
        return (
            <div className="border rounded-lg mb-4 p-4 relative">
                <div className="absolute right-4 top-4">
                    <button size="icon" className="h-8 w-8 border border-[#5DA05D] rounded-lg flex items-center justify-center">
                        <Edit className="h-4 w-4" />
                        {/* <p className="h-4 w-4">{edit}</p> */}
                    </button>
                </div>

                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
                            {logo}
                        </div>
                    </div>

                    <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <h3 className="font-semibold text-base">{title}</h3>
                            <div className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs border-2 border-dashed">
                                <span className="text-xs"><Like /> </span>
                                <span className="text-xs">{status1}</span>
                            </div>
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

                        <ul className="list-disc ml-5 mt-3 text-sm">
                            <li>
                                {desc}
                            </li>
                            <li>
                                Enhanced project comprehension with use case scenarios and diagrams
                                {!expandedItems.walmart && "..."}
                                <button
                                    onClick={() => toggleExpand("walmart")}
                                    className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
                                >
                                    {expandedItems.walmart ? (
                                        <>
                                            Hide <ChevronUp className="h-3 w-3 ml-0.5" />
                                        </>
                                    ) : (
                                        <>
                                            Show More <ChevronDown className="h-3 w-3 ml-0.5" />
                                        </>
                                    )}
                                </button>
                            </li>
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
                    </div>
                </div>
            </div>
        )
    }
    const status = true;
    const status2 = status ? "RECOMMENDED" : "REQUEST RECOMMENDATION";
    const status3 = status ? "REQUEST RECOMMENDATION" : "RECOMMENDED";
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }


    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
    })

    const [errors, setErrors] = useState({
        title: false,
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        // Clear error when user types in required field
        if (name === "title" && value.trim() !== "") {
            setErrors({
                ...errors,
                title: false,
            })
        }
    }

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validate required fields
        if (formData.title.trim() === "") {
            setErrors({
                ...errors,
                title: true,
            })
            return
        }

    }
    const ExperienceModal = ({ ModalComponent, isOpen, onClose }) => {
        return (
            <ModalComponent isOpen={isOpen} onClose={onClose} title="Add Experience">
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    <div className="space-y-1">
                        <label className="block text-sm font-medium">
                            Title<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter project title"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                        {errors.title && <p className="text-red-500 text-xs">This field is required</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium">
                            Description<span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter project Description"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                            rows={1}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium">Upload Image</label>
                        <div className="flex items-center space-x-2 border rounded-md p-2">
                            <label className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm cursor-pointer hover:bg-green-200">
                                Choose File
                                <input type="file" name="image" onChange={handleFileChange} className="hidden" accept="image/*" />
                            </label>
                            <span className="text-gray-500 text-sm">{formData.image ? formData.image.name : "No file chosen"}</span>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-[#5b9a68] hover:bg-green-700 text-white font-medium rounded-md transition duration-200 mt-4"
                    >
                        Save
                    </button>
                </form>
            </ModalComponent>
        )
    }
    return (
        <div className="w-full max-w-3xl mx-auto mt-5">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Experience</h2>
                <button onClick={() => setOpenModal(true)} className="bg-[#5DA05D] hover:bg-green-600 text-white rounded-lg px-2 py-1 flex items-center">
                    <Plus className="h-3 w-3 mr-1" />
                    <span className="text-xs">Add Experience</span>
                    {/* <ProjectFormModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} /> */}
                    <ExperienceModal ModalComponent={ReusableModal} isOpen={openModal} onClose={() => setOpenModal(false)} />
                </button>
            </div>

            {/* Walmart Experience */}
            <Experience
                edit={true}
                logo={<Company1 />}
                title={"Software Engineer"}
                status1={status2}
                // status={"RECOMMENDED"}
                company={"Walmart"}
                duration={"Aug 2018 - Dec 2019"}
                address={"Dallas, Texas, United States - On-site"}
                desc={"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript."}
            />
            {/* Apple Experience */}
            <Experience
                edit={true}
                logo={<Company2 />}
                title={"Software Engineer"}
                status1={status3}
                company={"Apple"}
                duration={"Aug 2018 - Dec 2019"}
                address={"Dallas, Texas, United States - On-site"}
                desc={"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript."}
            />

            <div className="border rounded-lg mb-4 p-4 relative">
                <div className="absolute right-4 top-4">
                    <button size="icon" className="h-8 w-8 border border-[#5DA05D] rounded-lg flex items-center justify-center">
                        <Edit className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex gap-4">
                    <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                            <Company2 />
                        </div>
                    </div>

                    <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <h3 className="font-semibold text-base">Software Engineer</h3>
                            <button className="text-[#5DA05D] hover:text-green-700 text-xs">
                                REQUEST RECOMMENDATION
                            </button>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Building className="h-4 w-4 mr-1 text-[#5DA05D]" />
                            <span>Apple</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mt-1">
                            <Calendar className="h-4 w-4 mr-1 text-[#5DA05D]" />
                            <span>Aug 2018 - Dec 2019</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mt-1">
                            <MapPin className="h-4 w-4 mr-1 text-[#5DA05D]" />
                            <span>Dallas, Texas, United States - On-site</span>
                        </div>

                        <ul className="list-disc ml-5 mt-3 text-sm">
                            <li>
                                Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and
                                JavaScript.
                            </li>
                            <li>
                                Enhanced project comprehension with use case scenarios and diagrams
                                {!expandedItems.apple && "..."}
                                <button
                                    onClick={() => toggleExpand("apple")}
                                    className="text-[#5DA05D] hover:text-blue-700 ml-1 text-sm font-medium inline-flex items-center"
                                >
                                    {expandedItems.apple ? (
                                        <>
                                            Hide <ChevronUp className="h-3 w-3 ml-0.5" />
                                        </>
                                    ) : (
                                        <>
                                            Show More <ChevronDown className="h-3 w-3 ml-0.5" />
                                        </>
                                    )}
                                </button>
                            </li>
                            {expandedItems.apple && (
                                <>
                                    <li className="mt-2">
                                        Developed and maintained iOS applications using Swift and Objective-C, ensuring compatibility with
                                        the latest iOS versions.
                                    </li>
                                    <li className="mt-2">
                                        Optimized application performance by implementing efficient algorithms and data structures.
                                    </li>
                                    <li className="mt-2">
                                        Integrated third-party APIs and services to enhance application functionality and user experience.
                                    </li>
                                    <li className="mt-2">
                                        Conducted thorough testing and debugging to identify and resolve software defects before release.
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Education</h2>
                    <button onClick={handleOpenModal} className="bg-[#5DA05D] hover:bg-green-600 text-white rounded-lg px-2 py-1 flex items-center">
                        <Plus className="h-3 w-3 mr-1" />
                        <span className="text-xs">Add Education</span>
                    </button>
                </div>
                <Experience
                    edit={true}
                    logo={<Company2 />}
                    title={"Computer Science"}
                    status1={status3}
                    company={"Apple"}
                    duration={"Aug 2018 - Dec 2019"}
                    address={"Dallas, Texas, United States - On-site"}
                    desc={"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript."}
                />
            </div>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">Licenses & Certifications</h2>
                    <button onClick={handleOpenModal} className="bg-[#5DA05D] hover:bg-green-600 text-white rounded-lg px-2 py-1 flex items-center">
                        <Plus className="h-3 w-3 mr-1" />
                        <span className="text-xs">Add Certifications</span>
                    </button>
                </div>
                <Experience
                    edit={true}
                    logo={<Company2 />}
                    title={"Beginner Python"}
                    status1={status2}
                    company={"Apple"}
                    duration={"Aug 2018 - Dec 2019"}
                    address={"Dallas, Texas, United States - On-site"}
                    desc={"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript."}
                />
                <Experience
                    edit={true}
                    logo={<Company2 />}
                    title={"Python Intermediate"}
                    status1={status3}
                    company={"Apple"}
                    duration={"Aug 2018 - Dec 2019"}
                    address={"Dallas, Texas, United States - On-site"}
                    desc={"Designed and implemented user-friendly interfaces for e-commerce websites using HTML, CSS, and JavaScript."}
                />
            </div>
        </div>
    )
}

