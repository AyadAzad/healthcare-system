"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/app/NavBar"; // Import the NavBar component

export default function DoctorSignup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        specialty: "",
        phone: "",
        address: "",
        experience: 0,
        availableTime: "",
        fee: 0,
        hospitalId: 0,
    });
    const [hospitals, setHospitals] = useState([]); // State to store hospitals
    const [error, setError] = useState("");
    const router = useRouter();

    // Fetch hospitals on component mount
    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                const response = await fetch("/api/hospitals");
                if (!response.ok) {
                    throw new Error("Failed to fetch hospitals");
                }
                const data = await response.json();
                setHospitals(data);
            } catch (error) {
                console.error("Error fetching hospitals:", error);
                setError("Failed to fetch hospitals. Please try again later.");
            }
        };

        fetchHospitals();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/doctors/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                alert("Signup successful! Your account is pending approval.");
                router.push("/login");
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to sign up.");
            }
        } catch (error) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <>
            {/* Include the NavBar */}
            <NavBar />

            {/* Doctor Signup Form */}
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700">
                <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                    <h1 className="text-2xl font-bold text-blue-900 mb-6 pt-20">Doctor Signup</h1>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="block text-gray-700">First Name</label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-gray-700">Last Name</label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-gray-700">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-gray-700">Password</label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-gray-700">Specialty</label>
                            <input
                                type="text"
                                value={formData.specialty}
                                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-gray-700">Phone</label>
                            <input
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-gray-700">Address</label>
                            <input
                                type="text"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-gray-700">Experience (years)</label>
                            <input
                                type="number"
                                value={formData.experience}
                                onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-gray-700">Available Time</label>
                            <input
                                type="text"
                                value={formData.availableTime}
                                onChange={(e) => setFormData({ ...formData, availableTime: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-gray-700">Fee</label>
                            <input
                                type="number"
                                value={formData.fee}
                                onChange={(e) => setFormData({ ...formData, fee: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-gray-700">Hospital</label>
                            <select
                                value={formData.hospitalId}
                                onChange={(e) => setFormData({ ...formData, hospitalId: parseInt(e.target.value) })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value={0}>Select a hospital</option>
                                {hospitals.map((hospital) => (
                                    <option key={hospital.id} value={hospital.id}>
                                        {hospital.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}