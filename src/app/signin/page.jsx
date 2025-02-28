"use client";

import React, { useEffect, useState } from 'react';
import { FaLock, FaEnvelope} from 'react-icons/fa';
import NavBar from "@/app/NavBar";
import { useRouter } from 'next/navigation';

export default function SignIn() {
    const [isClient, setIsClient] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        setIsClient(true); // Ensure this runs only on the client side
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.user.role === "doctor"){
                    router.push('/doctor');
                }
                else if(data.user.role === "patient"){
                    router.push('/patient');
                }
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    if (!isClient) {
        return null; // Return null during SSR
    }

    return (
        <>
            <NavBar />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-700">
                <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-blue-800">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to access your account</p>
                    </div>

                    {/* Sign-In Form */}
                    <form onSubmit={handleSubmit}>
                        {/* Username Input */}
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your Email Address"
                                    name="email"
                                    className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
                                    className="w-full px-4 py-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 text-gray-700">Remember me</label>
                            </div>
                            <a href="#" className="text-blue-600 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        {/* Sign-In Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            Sign In
                        </button>

                        {/* Error Message */}
                        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                    </form>

                    {/* Sign-Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-700">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-blue-600 hover:underline">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}