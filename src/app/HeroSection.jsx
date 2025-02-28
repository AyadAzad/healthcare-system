"use client";

import React from 'react';
import NavBar from "@/app/NavBar";
import Link from "next/link";

export default function HeroSection() {
    return (
        <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROY3p9drsIMKS-tkU9Sw3unJj5DVde0JPgkl93Xpl0PGeYgJ5zI4IDpkCqd-oT1GbAXwg&usqp=CAU')`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-blue-900/40"></div>
            </div>

            {/* Navigation Bar */}
            <NavBar />

            {/* Hero Content */}
            <div className="relative z-10 text-center px-4">
                {/* Headline */}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
                    Your Health, <span className="text-blue-400">Our Priority</span>
                </h1>

                {/* Subheading */}
                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
                    We provide world-class healthcare services tailored to your needs. From
                    routine checkups to advanced treatments, we are here for you every step
                    of the way.
                </p>

                {/* Call-to-Action Buttons */}
                <div className="space-x-4">
                    <Link href="/signin">
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
                        Book an Appointment
                    </button>
                    </Link>
                    <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300">
                        Learn More
                    </button>
                </div>
            </div>

            {/* Footer Teaser */}
            <div className="absolute bottom-8 left-0 right-0 text-center text-gray-300">
                <p className="text-sm">
                    Trusted by over <span className="font-bold text-blue-400">1 Million</span> patients
                    in Iraq.
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                <div className="animate-bounce w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <svg
                        className="w-4 h-4 text-blue-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}