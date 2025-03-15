"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import {FaEnvelope, FaLock, FaPhone, FaUser} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import NavBar from "@/app/NavBar";

const prisma = new PrismaClient();

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, password, phone, city }),
        });

        if (response.ok) {
            router.push("/login");
        } else {
            alert("Signup failed");
        }
    };

    return (
        <>
            <NavBar />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 pt-24">
                <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-blue-800">Create Account</h1>
                        <p className="text-gray-600">Join us to get started</p>
                    </div>

                    {/* Sign-Up Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Full Name Input */}
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Firstname</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="first_name"
                                    placeholder="Enter your first name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="text-gray-800 w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Lastname</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="last_name"
                                    placeholder="Enter your last name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="text-gray-800 w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="text-gray-800 w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Phone Input */}
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Phone</label>
                            <div className="relative">
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="text-gray-800 w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* City Input */}
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">City</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Enter your City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="text-gray-800 w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <FaLocationDot className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="text-gray-800 w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Sign-Up Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Sign-In Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-700">
                            Already have an account?{' '}
                            <a href="/signin" className="text-blue-600 hover:underline">
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>

            </div>
        </>
    );
}