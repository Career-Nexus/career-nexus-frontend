import { ExternalLink, Image, Plus, Search } from "lucide-react";
import { AddProjectModal } from "./AllModal";
import { useState } from "react";
import ReusableModal from "./ModalDesign";
import { Link } from "react-router-dom";

export const projects = [
    {
        name: "Ecommerce",
        description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
        category: "Web Design",
        tools: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
        // image: "/images/ecommerce.png",
        image: "/images/gallery.png",
    },
    {
        name: "Staff management system",
        description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
        category: "HR Software",
        tools: ["React", "Express", "MySQL"],
        // image: "/images/staff.png",
        image: "/images/profile-img1.png",
    },
    {
        name: "Portfolio",
        description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
        category: "Portfolio Website",
        tools: ["React", "Tailwind CSS"],
        // image: "/images/portfolio.png",
        image: "/images/profile-img2.png",
    },
    {
        name: "Real Estate",
        description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
        category: "Property Platform",
        tools: ["Next.js", "Firebase"],
        // image: "/images/realestate.png",
        image: "/images/profile-img3.png",
    },
    {
        name: "Sales",
        description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
        category: "Sales Tracker",
        tools: ["Vue", "Laravel"],
        // image: "/images/sales.png",
        image: "/images/profile-img4.png",
    },
    {
        name: "Tutorial Guide",
        description: "This project involved the end-to-end UI/UX design of a responsive e-commerce website tailored for a smooth and engaging online shopping experience. The aim was to combine aesthetics with functionality—making it easy for users to discover products, learn more about them, and complete purchases effortlessly.",
        category: "Learning Platform",
        tools: ["React", "Supabase"],
        // image: "/images/tutorial.png",
        image: "/images/profile-img5.png",
    },
];
export const ProductGalery = () => {
    const [openModal, setOpenModal] = useState(false);
    return (

        <div className="space-y-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
                <Image className="h-5 w-5 text-[#5DA05D]" />
                Portfolio Virtual Gallery
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div key={project.name} className="group relative overflow-hidden rounded-lg">
                        <div className="aspect-square bg-gray-200 w-full">
                            <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="text-center p-4">
                                <h3 className="text-white font-medium mb-1">{project.name}</h3>
                                <p className="text-gray-300 text-sm mb-3">{project.category}</p>
                                <Link to={`/gallerydetail/${encodeURIComponent(project.name)}`} className="bg-[#5DA05D] text-white px-3 py-1 rounded text-xs flex items-center gap-1 mx-auto">
                                    View Details <ExternalLink className="h-3 w-3" />
                                </Link>
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

    // const projects = [
    //     "Ecommerce",
    //     "Staff management system",
    //     "Portfolio",
    //     "Real Estate",
    //     "Sales",
    //     "Tutorial Guide"
    // ];
{/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["Ecommerce", "Staff management system", "Portfolio", "Real Estate", "Sales", "Tutorial Guide"].map((item) => (
                    <div key={item} className="group relative overflow-hidden rounded-lg">
                        <div className="aspect-square bg-gray-200 w-full">
                            <img src="/images/gallery.png" alt="Gallery" />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="text-center p-4">
                                <h3 className="text-white font-medium mb-1">{item}</h3>
                                <p className="text-gray-300 text-sm mb-3">Web Design</p>
                                <Link to={`/galerydetail/${item}`} className="bg-[#5DA05D] text-white px-3 py-1 rounded text-xs flex items-center gap-1 mx-auto">
                                    View Details <ExternalLink className="h-3 w-3" />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div> */}