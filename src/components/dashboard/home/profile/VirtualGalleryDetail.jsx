import React from 'react'
import { Link, useParams } from "react-router-dom";
import { projects } from './ProductVirtualGalary';
import EventsHome from '../EventsHome';

function VirtualGalleryDetail() {
    const { item } = useParams();
    const decodedItem = decodeURIComponent(item);

    const project = projects.find((p) => p.name === decodedItem);

    if (!project) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold">Project not found</h1>
                <Link to="/profilepage" className="text-blue-500 underline">Go back to gallery</Link>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-12 gap-4 p-6 mx-10'>
            <div className="col-span-8 rounded-lg shadow-sm">
                <img src={project.image} alt={project.name} className="rounded-lg mb-6 w-full h-96 object-cover" />
                <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
                <p className="text-gray-600 italic mb-4">{project.category}</p>
                <p className="text-gray-800 mb-4">{project.description}</p>
                <h2 className="text-xl font-semibold mb-2">Tools Used:</h2>
                <ul className="list-disc list-inside text-gray-700">
                    {project.tools.map((tool) => (
                        <li key={tool}>{tool}</li>
                    ))}
                </ul>
                <Link to="/profilepage" className="mt-6 inline-block text-green-600 underline">← Back to gallery</Link>
            </div>
            <div className='col-span-4 hidden md:block'>
                <EventsHome />
            </div>
        </div>
    );
};

export default VirtualGalleryDetail