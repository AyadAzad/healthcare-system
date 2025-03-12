"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const VideoCalls = () => {
    const [videoCalls, setVideoCalls] = useState([]);
    const searchParams = useSearchParams();
    const firstName = searchParams.get("firstName");
    const doctorId = searchParams.get("doctorId");
    const router = useRouter();

    useEffect(() => {
        const fetchVideoCalls = async () => {
            try {
                const response = await fetch(`/api/doctor-video-calls?doctorId=${doctorId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch video calls");
                }
                const data = await response.json();
                setVideoCalls(data);
            } catch (error) {
                console.error("Error fetching video calls:", error);
            }
        };

        fetchVideoCalls();
    }, [doctorId]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
            <button
                onClick={() => router.push(`/doctor?firstName=${firstName}&doctorId=${doctorId}`)}
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                    />
                </svg>
                Back
            </button>
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Video Calls</h2>
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    {videoCalls.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-blue-500 to-purple-600">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Patient
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Time
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {videoCalls.map((call) => (
                                <tr key={call.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {call.patient.firstName} {call.patient.lastName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {new Date(call.callDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {call.callTime}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-8 text-center">
                            <p className="text-gray-600 text-lg">No video calls found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoCalls;