"use client";

import React, { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

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
                        className="px-4 py-2 rounded-lg bg-red-600"
                    >
                        Logout
                    </button>
                    <button
                        onClick={() => setActiveTab("doctors")}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === "doctors"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-blue-600"
                        }`}
                    >
                        Manage Doctors
                    </button>
                    <button
                        onClick={() => setActiveTab("hospitals")}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === "hospitals"
                                ? "bg-blue-600 text-white"
                                : "bg-white text-blue-600"
                        }`}
                    >
                        Manage Hospitals
                    </button>
                </div>
                {activeTab === "doctors" && <AddDoctorForm/>}
                {activeTab === "hospitals" && <AddHospitalForm/>}
            </div>
        </div>
    );
}

function AddDoctorForm() {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("/api/add-doctors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        if (response.ok) {
            alert("Doctor added successfully!");
            setFormData({
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
        } else {
            alert("Failed to add doctor.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-xl font-bold text-blue-900">Add New Doctor</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Specialty</label>
                    <input
                        type="text"
                        value={formData.specialty}
                        onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Phone</label>
                    <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Experience (years)</label>
                    <input
                        type="number"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Available Time</label>
                    <input
                        type="text"
                        value={formData.availableTime}
                        onChange={(e) => setFormData({ ...formData, availableTime: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Fee</label>
                    <input
                        type="number"
                        value={formData.fee}
                        onChange={(e) => setFormData({ ...formData, fee: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-700">Hospital ID</label>
                    <input
                        type="number"
                        value={formData.hospitalId}
                        onChange={(e) => setFormData({ ...formData, hospitalId: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Add Doctor
            </button>
        </form>
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