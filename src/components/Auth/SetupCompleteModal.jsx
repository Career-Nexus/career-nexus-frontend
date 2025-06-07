import { useEffect, useState } from "react";

export const ProfileSetupModal = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Switch to complete state after 2 seconds
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center w-64 h-48 border border-gray-300">
                {isLoading ? (
                    <>
                        <svg
                            className="animate-spin h-12 w-12 text-green-500"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>
                        <p className="mt-4 text-lg font-semibold text-purple-700">Setting up Profile...</p>
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <svg
                                className="h-8 w-8 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <p className="mt-4 text-lg font-semibold text-purple-700">Setup Complete!</p>
                    </>
                )}
            </div>
        </div>
    );
};
