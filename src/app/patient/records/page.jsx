"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Modal from "@/app/patient/Modal";
import NavBar from "@/app/NavBar";
import SideBar from "@/app/patient/SideBar";

const Records = () => {
    const searchParams = useSearchParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const patientId = searchParams.get("patientId");
    const [testResults, setTestResults] = useState([]);

    const openModal = (message) => {
        setModalMessage(message);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchTestResults = async () => {
            try {
                const response = await fetch(`/api/test-results?patientId=${patientId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch test results");
                }
                const data = await response.json();
                setTestResults(data);
            } catch (error) {
                console.error("Error fetching test results:", error);
                openModal("Failed to fetch test results. Please try again later.");
            }
        };

        fetchTestResults();
    }, [patientId]);

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex">
                <SideBar />
                <div className="flex-1 p-8">
                    {/* Header */}
                    <div className="mt-20">
                        <h1 className="text-4xl font-bold text-blue-900">Medical Records</h1>
                        <p className="text-gray-600 mt-2">View and manage your test results.</p>
                    </div>

                    {/* Test Results Section */}
                    <div className="bg-white rounded-xl shadow-2xl p-8">
                        <h2 className="text-2xl font-bold text-blue-900 mb-6">Test Results</h2>
                        {testResults.length > 0 ? (
                            <div className="space-y-6">
                                {testResults.map((result) => (
                                    <div
                                        key={result.id}
                                        className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xl font-semibold text-blue-900">{result.testName}</h3>
                                            <span className="text-sm text-gray-500">
                                                {new Date(result.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 mt-2">
                                            <span className="font-medium">Result:</span> {result.result}
                                        </p>
                                        <div className="mt-4 flex space-x-4">
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                                                View Details
                                            </button>
                                            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-300">
                                                Download Report
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-gray-600 text-lg">No test results available.</p>
                                <p className="text-gray-500 mt-2">Please check back later or contact your doctor.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <p className="text-gray-800">{modalMessage}</p>
            </Modal>
        </>
    );
};

export default Records;