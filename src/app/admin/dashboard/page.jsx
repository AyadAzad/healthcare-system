"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("doctors");
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-900 mb-6">Admin Dashboard</h1>
                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => router.push("/")}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-300"
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => setActiveTab("doctors")}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === "doctors"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-blue-600"
                        } hover:bg-blue-700 hover:text-white transition duration-300`}
                    >
                        Manage Doctors
                    </button>
                    <button
                        onClick={() => setActiveTab("hospitals")}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === "hospitals"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-blue-600"
                        } hover:bg-blue-700 hover:text-white transition duration-300`}
                    >
                        Manage Hospitals
                    </button>
                </div>
                {activeTab === "doctors" && (
                    <div className="space-y-6">
                        <PendingDoctors />
                        <ApprovedDoctors />
                    </div>
                )}
                {activeTab === "hospitals" && (
                    <div className="space-y-6">
                        <AddHospitalForm />
                        <AvailableHospitals />
                    </div>
                )}
            </div>
        </div>
    );
}

function PendingDoctors() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchPendingDoctors = async () => {
            const response = await fetch("/api/doctors/pending");
            const data = await response.json();
            setDoctors(data);
        };
        fetchPendingDoctors();
    }, []);

    const handleApprove = async (id) => {
        const response = await fetch("/api/doctors/approve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (response.ok) {
            setDoctors(doctors.filter((doctor) => doctor.id !== id));
        }
    };

    const handleReject = async (id) => {
        const response = await fetch("/api/doctors/reject", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (response.ok) {
            setDoctors(doctors.filter((doctor) => doctor.id !== id));
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-blue-900">Pending Doctors</h2>
            {doctors.length === 0 ? (
                <p className="text-gray-600">No pending doctors found.</p>
            ) : (
                doctors.map((doctor) => (
                    <div key={doctor.id} className="border p-4 rounded-lg">
                        <p className="text-gray-800 font-semibold">
                            {doctor.firstName} {doctor.lastName}
                        </p>
                        <p className="text-gray-600">{doctor.email}</p>
                        <p className="text-gray-600">{doctor.specialty}</p>
                        <div className="flex space-x-4 mt-2">
                            <button
                                onClick={() => handleApprove(doctor.id)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() => handleReject(doctor.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

function ApprovedDoctors() {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchApprovedDoctors = async () => {
            const response = await fetch("/api/doctors/approved");
            const data = await response.json();
            setDoctors(data);
        };
        fetchApprovedDoctors();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-blue-900">Available Doctors</h2>
            {doctors.length === 0 ? (
                <p className="text-gray-600">No approved doctors found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {doctors.map((doctor) => (
                        <div key={doctor.id} className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                            <p className="text-gray-800 font-semibold">
                                {doctor.firstName} {doctor.lastName}
                            </p>
                            <p className="text-gray-600">{doctor.email}</p>
                            <p className="text-gray-600">{doctor.specialty}</p>
                            <p className="text-gray-600">Experience: {doctor.experience} years</p>
                            <p className="text-gray-600">Fee: {doctor.fee} IQD</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function AddHospitalForm() {
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        services: "",
        address: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/add-hospitals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            alert("Hospital added successfully!");
            setFormData({
                name: "",
                city: "",
                services: "",
                address: "",
            });
        } else {
            alert("Failed to add hospital.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-blue-900">Add New Hospital</h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">City</label>
                    <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Services</label>
                    <input
                        type="text"
                        value={formData.services}
                        onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                        required
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Add Hospital
            </button>
        </form>
    );
}

function AvailableHospitals() {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        const fetchHospitals = async () => {
            const response = await fetch("/api/hospitals");
            const data = await response.json();
            setHospitals(data);
        };
        fetchHospitals();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-blue-900">Available Hospitals</h2>
            {hospitals.length === 0 ? (
                <p className="text-gray-600">No hospitals found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hospitals.map((hospital) => (
                        <div key={hospital.id} className="border p-4 rounded-lg hover:shadow-md transition-shadow">
                            <p className="text-gray-800 font-semibold">{hospital.name}</p>
                            <p className="text-gray-600">{hospital.city}</p>
                            <p className="text-gray-600">{hospital.services}</p>
                            <p className="text-gray-600">{hospital.address}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}