"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";
import NavBar from "@/app/NavBar";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("API response:", data); // Debugging

            if (response.ok) {
                if (data.role === "patient") {
                    router.push(`/patient?firstName=${data.firstName}&patientId=${data.id}`);
                } else if (data.role === "doctor") {
                    router.push(`/doctor?firstName=${data.firstName}&doctorId=${data.id}`)
                    }
            }
            else if (email === "admin@admin.com" && password === "admin") {
                router.push('/admin/dashboard');
            }
            else {
                setError(data.error || "Login failed");
            }
        } catch (err) {
            console.error("Error during login:", err); // Debugging
            setError("An error occurred. Please try again.");
        }
    };

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
                        {/* Email Input */}
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
                                    placeholder="Enter your password"
                                    name="password"
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