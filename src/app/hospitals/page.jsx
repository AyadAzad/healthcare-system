"use client";

import { useEffect, useState } from "react";
import NavBar from "@/app/NavBar";
import { FaSearch } from "react-icons/fa";

export default function HospitalsPage() {
    const [hospitals, setHospitals] = useState([]); // All hospitals fetched from the API
    const [filteredHospitals, setFilteredHospitals] = useState([]); // Hospitals filtered based on search
    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch hospitals from the API
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await fetch("/api/hospitals");
                if (!response.ok) {
                    throw new Error("Failed to fetch hospitals");
                }
                const data = await response.json();
                setHospitals(data); // Set all hospitals
                setFilteredHospitals(data); // Initially, display all hospitals
            } catch (error) {
                console.error("Error fetching hospitals:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHospitals();
    }, []);

    // Filter hospitals based on search query
    useEffect(() => {
        if (searchQuery.trim() === "") {
            // If the search query is empty, show all hospitals
            setFilteredHospitals(hospitals);
        } else {
            // Filter hospitals by city or name
            const filtered = hospitals.filter((hospital) => {
                const lowerCaseQuery = searchQuery.toLowerCase();
                return (
                    hospital.name.toLowerCase().includes(lowerCaseQuery) ||
                    hospital.city.toLowerCase().includes(lowerCaseQuery)
                );
            });
            setFilteredHospitals(filtered);
        }
    }, [searchQuery, hospitals]);

    // Display loading state
    if (loading) {
        return (
            <div className="p-28 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex justify-center items-center">
                <p className="text-white text-xl">Loading hospitals...</p>
            </div>
        );
    }

    // Display error state
    if (error) {
        return (
            <div className="p-28 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex justify-center items-center">
                <p className="text-white text-xl">Error: {error}</p>
            </div>
        );
    }

    return (
        <>
            <NavBar />
            <div className="p-28 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
                {/* Search Bar */}
                <div className="mb-8 relative">
                    <input
                        type="text"
                        placeholder="Search by city or hospital name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="text-gray-700 w-full p-3 pl-10 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>

                {/* Hospitals List */}
                <h1 className="text-3xl font-bold mb-8 text-white">Hospitals</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHospitals.length > 0 ? (
                        filteredHospitals.map((hospital) => (
                            <div
                                key={hospital.id}
                                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
                            >
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">{hospital.name}</h2>
                                <p className="text-gray-600 mb-2">
                                    {hospital.address}, {hospital.city}
                                </p>
                                <p className="text-gray-600 mb-4 font-bold">Services: {hospital.services}</p>
                                <h3 className="text-lg font-bold mb-2 text-gray-700">Doctors:</h3>
                                <ul className="space-y-2">
                                    {hospital.doctors.map((doctor) => (
                                        <li key={doctor.id} className="text-gray-700">
                                            <span className="font-mono">{doctor.name}</span> - {doctor.specialty} (
                                            {doctor.experience} years experience)
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-xl col-span-full text-center">
                            No hospitals found matching your search.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}