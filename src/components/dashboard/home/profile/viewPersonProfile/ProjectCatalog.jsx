import { Briefcase, Plus, Search } from "lucide-react"
import { Card, CardBody } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Download, View } from "../../../../../icons/icon"
import { ExperienceService } from "../../../../../api/ExperienceService"
import { useParams } from "react-router-dom";

function ProjectCatalog() {
  const [projects, setProjects] = useState([]);
  const { id: userId } = useParams();

  const fetchProjects = async () => {
    try {
      const response = await ExperienceService.getOthersProjects(userId);
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

  useEffect(() => {
    if (userId) {
      fetchProjects();
    }
  }, [userId]);

  console.log("Projects:", projects);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-[#5DA05D]" />
        Project Catalog
      </h2>
      {/* search + filter */}
      <div className="flex gap-4">
        <label htmlFor="search" className="flex items-center border border-gray-300 rounded-lg w-full">
          <Search className="ml-2" />
          <input
            type="text"
            id="search"
            className="w-full py-2 border-0 focus:outline-none focus:ring-0 rounded-lg outline-none"
            placeholder="Search Projects....."
          />
        </label>
        <div className="border border-gray-300 rounded-lg w-full">
          <select
            name="date"
            id="date"
            className="w-full border-0 border-gray-300 rounded-lg outline-none focus:outline-none focus:ring-0"
          >
            <option value="">Sort By Date</option>
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="popular">Popular</option>
            <option value="recentlyUpdated">Recently Updated</option>
          </select>
        </div>
      </div>

      {/* projects display */}
      {projects.length === 0 ? (
        <div className="text-center pt-14">No project in the catalog.</div>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardBody className="p-0">
                <div className="md:flex">
                  {/* image */}
                  <div className="md:w-1/4 bg-gray-100 md:h-auto h-40 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      <img src={project.image || "/images/gallery.png"} alt="Gallery" />
                    </div>
                  </div>

                  {/* details */}
                  <div className="p-5 md:w-3/4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{project.title}</h3>
                    </div>
                    <p className="text-sm text-gray-700 mb-4">{project.description}</p>

                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500" />
                      <div className="flex items-center gap-2">
                        {project.download_material && (
                          <>
                            <a
                              href={project.download_material}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <View />
                            </a>
                            <a href={project.download_material} download>
                              <Download />
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
export default ProjectCatalog