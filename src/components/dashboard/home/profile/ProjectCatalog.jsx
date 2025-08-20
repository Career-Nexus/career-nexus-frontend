import { Briefcase, Plus, Search} from "lucide-react"
import { AddProjectModal } from "./AllModal"
import { Card, CardBody } from "@chakra-ui/react"
import { Delete, Download, Editall, View } from "../../../../icons/icon"
import { useEffect, useState } from "react"
import ReusableModal from "./ModalDesign"
import { ExperienceService } from "../../../../api/ExperienceService"
import { toast } from "react-toastify"

function ProjectCatalog() {
    const [openModal, setOpenModal] = useState()
    const [projects, setProjects] = useState([])
    
    const fetchProjects = async () => {
        try {
            const response = await ExperienceService.getProjects();
            const isArray = Array.isArray(response.data);
            if (isArray) {
                setProjects(response.data);
            } else {
                console.error("Unexpected response format:", response.data);
            }
        } catch (error) {
            console.error("Error fetching projects:", error)
        }
    }
    const deleteProject = async (projectId) => {
        try {
            await ExperienceService.deleteProject(projectId);
            
            setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
            toast.success("Project deleted successfully");
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Failed to delete project");
        }
    };
    useEffect(() => {
        fetchProjects();
    }, []);

    // console.log("Projects:", projects);
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
            {projects.length ===0?(
                <div className="text-center pt-14">No project in the catalog.</div>
            ):(
            <div className="grid gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                        <CardBody className="p-0">
                            <div className="md:flex">
                                <div className="md:w-1/4 bg-gray-100 md:h-auto h-40 relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                        <img src={project.image || "/images/gallery.png"} alt="Gallery" />
                                    </div>
                                </div>
                                <div className="p-5 md:w-3/4">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold">{project.title}</h3>
                                    </div>

                                    <p className="text-sm text-gray-700 mb-4">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="text-xs text-gray-500">
                                            {project.dueDate ? `Due in ${project.dueDate} weeks` : `Completed on ${project.completedDate}`}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <View />
                                            <Download />
                                            <button onClick={() => setOpenModal(true)}>
                                                <Editall />
                                            </button>
                                            <button onClick={() => deleteProject(project.id)} >
                                                <Delete />
                                            </button>
                                        </div>
                                        {/* <button className="bg-[#5DA05D] text-white px-3 py-1 rounded text-xs">View Details</button> */}
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
            )}
        </div>
    )
}
export default ProjectCatalog