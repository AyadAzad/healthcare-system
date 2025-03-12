"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NavBar from "@/app/NavBar";
import SideBar from "@/app/patient/SideBar";

const QuickAdvice = () => {
    const searchParams = useSearchParams();
    const patientId = searchParams.get("patientId");
    const [quickAdvice, setQuickAdvice] = useState([]);

    useEffect(() => {
        const fetchQuickAdvice = async () => {
            try {
                const response = await fetch(`/api/view-quickadvices?patientId=${patientId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch quick advice");
                }
                const data = await response.json();
                setQuickAdvice(data);
            } catch (error) {
                console.error("Error fetching quick advice:", error);
            }
        };

        fetchQuickAdvice();
    }, [patientId]);

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex">
                <SideBar />
                <div className="flex-1 p-8">
                    <h1 className="text-4xl font-bold text-blue-900 mb-8">Quick Advice</h1>
                    {quickAdvice.length > 0 ? (
                        <div className="space-y-6">
                            {quickAdvice.map((advice) => (
                                <div key={advice.id} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <p className="text-gray-700">{advice.question}</p>
                                    <p className="text-gray-600 mt-2">
                                        <span className="font-medium">Date:</span> {new Date(advice.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No quick advice requests.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default QuickAdvice;