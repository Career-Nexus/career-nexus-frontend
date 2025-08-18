import { Briefcase, Plus, Search} from "lucide-react"
import { AddProjectModal } from "./AllModal"
import { Card, CardBody } from "@chakra-ui/react"
import { Delete, Download, Editall, View } from "../../../../icons/icon"
import { useState } from "react"
import ReusableModal from "./ModalDesign"

function ProjectCatalog() {
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
export default ProjectCatalog