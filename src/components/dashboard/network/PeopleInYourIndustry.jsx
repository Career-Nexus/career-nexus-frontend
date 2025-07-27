import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { NetworkService } from '../../../api/NetworkService';
import { toast } from "react-toastify";
import ConnectionInUserIndustry from './ConnectionInUserIndustry';
import { Link } from 'react-router-dom';

function PeopleInYourIndustry() {
    const [byindustry, setByindustry] = useState([]);
    const [pendingConnections, setPendingConnections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [connections, setConnections] = useState([]);

    const getConnectionByIndustry = async () => {
        setLoading(true);
        try {
            const { success, data } = await NetworkService.recommendbyindustry();
            const isArray = Array.isArray(data?.results) ? data.results : [];
            setByindustry(isArray);
            setError(null);
        } catch (error) {
            console.log("failed to fetch", error);
            setError("Error occurred while fetching industry connections");
        } finally {
            setLoading(false);
        }
    };
    const createConnection = async (userId) => {
        setPendingConnections((prev) => [...prev, userId]);
        try {
            const response = await NetworkService.createConnection({ connection: userId });
            if (response) {
                console.log("Connection created successfully:", response);
                setConnections((prev) => [...prev, response]);
                toast.success("Connection request sent successfully");
            }
        } catch (error) {
            console.error("Error creating connection:", error);
            setError("Failed to create connection");
            toast.error("Failed to create connection");
        }
    };
    useEffect(() => {
        getConnectionByIndustry();
    }, []);

    return (
        <div>
            <div className="mb-12 border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">People in your Industry</h2>
                    <Link to="/industry" className="text-[#5DA05D] hover:text-[#5DA05D] font-medium text-sm">See all</Link>
                </div>

                {byindustry.length === 0 ? (
                    <Box textAlign="center" py={10}>
                        <p className="text-gray-500 text-lg">
                            Recommended people in your industry will be displayed here!
                        </p>
                    </Box>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {byindustry.slice(0, 4).map((suggestion) => (
                            // <ProfileCard key={suggestion.id} person={suggestion} type="suggestion" />
                            <div key={suggestion.id} className="bg-white rounded-xl border border-gray-200 p-2 flex flex-col items-center text-center space-y-4 transition-shadow duration-200">

                                <div className="relative">
                                    <img
                                        src={suggestion.profile_photo || "/placeholder.svg"}
                                        alt={suggestion.name}
                                        className="w-20 h-20 rounded-full object-cover"
                                    />
                                </div>

                                <div className="space-y-1 border-b border-gray-300 pb-3">
                                    <h3 className="font-semibold text-gray-900 text-lg">{suggestion.name}</h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">{suggestion.qualification}</p>
                                    <p className="text-xs text-gray-500">Recommended match</p>
                                </div>
                                <button
                                    onClick={() => createConnection(suggestion.id)}
                                    disabled={pendingConnections.includes(suggestion.id)}
                                    className={`w-full py-2 px-4 border ${pendingConnections.includes(suggestion.id)
                                        ? "bg-green-50 text-gray-400 cursor-not-allowed border-gray-300"
                                        : "border-[#5DA05D] text-[#5DA05D] hover:bg-green-50"
                                        } rounded-lg transition-colors duration-200 font-medium text-sm`}
                                >
                                    {pendingConnections.includes(suggestion.id) ? "Pending..." : "Connect"}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PeopleInYourIndustry