"use client"

import React from 'react';
import { FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import {FaLocationDot} from "react-icons/fa6";
import NavBar from "@/app/NavBar";

export default function SignUp() {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: formData.get('first_name'),
                last_name: formData.get('last_name'),
                email: formData.get('email'),
                password: formData.get('password'),
                phone: formData.get('phone'),
                city: formData.get('city')
            }),
        });
        const data = await response.json();
        alert(data.message || data.error);
    };
    return (
        <>
            <NavBar/>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700 pt-24  ">
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
                                className=" text-gray-800 w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className=" text-gray-800 w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                className="text-gray-800 w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>
                    {/*city field */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">City</label>
                        <div className="relative">
                            <input
                                type="text"
                                name="city"
                                placeholder="Enter your City"
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