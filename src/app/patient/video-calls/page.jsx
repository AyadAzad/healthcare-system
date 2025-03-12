"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NavBar from "@/app/NavBar";
import SideBar from "@/app/patient/SideBar";

const VideoCalls = () => {
    const searchParams = useSearchParams();
    const patientId = searchParams.get("patientId");
    const [videoCalls, setVideoCalls] = useState([]);

    useEffect(() => {
        const fetchVideoCalls = async () => {
            try {
                const response = await fetch(`/api/view-videocalls?patientId=${patientId}`);
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
    }, [patientId]);

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex">
                <SideBar />
                <div className="flex-1 p-8">
                    <h1 className="text-4xl font-bold text-blue-900 mb-8">Video Calls</h1>
                    {videoCalls.length > 0 ? (
                        <div className="space-y-6">
                            {videoCalls.map((call) => (
                                <div key={call.id}
                                     className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold text-blue-900">
                                        {call.doctor.firstName} {call.doctor.lastName}
                                    </h3>
                                    <h4 className="text-gray-600 font-semibold">specialty
                                        : {call.doctor.specialty}</h4>
                                    <p className="text-gray-600 mt-2">
                                        <span
                                            className="font-medium">Date:</span> {new Date(call.callDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Time:</span> {call.callTime}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No video calls scheduled.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default VideoCalls;