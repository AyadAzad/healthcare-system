"use client";

import React, { useState, useEffect } from "react";
import NavBar from "@/app/NavBar";
import Link from "next/link";
import Footer from "@/app/Footer";
import WhyChooseUs from "@/app/WhyChooseUs";

export default function HeroSection() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const [topDoctors, setTopDoctors] = useState([]);
    const [topHospitals, setTopHospitals] = useState([]);

    // Fetch top doctors and hospitals from the database
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch top doctors
                const doctorsResponse = await fetch("/api/doctors/approved");
                const doctorsData = await doctorsResponse.json();
                setTopDoctors(doctorsData);

                // Fetch top hospitals
                const hospitalsResponse = await fetch("/api/hospitals");
                const hospitalsData = await hospitalsResponse.json();
                setTopHospitals(hospitalsData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Simulate a subscription request
        console.log("Subscribed with email:", email);
        setSubscribed(true);
        setEmail(""); // Clear the input field
    };

    return (
        <>
        <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div
                className="fixed inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROY3p9drsIMKS-tkU9Sw3unJj5DVde0JPgkl93Xpl0PGeYgJ5zI4IDpkCqd-oT1GbAXwg&usqp=CAU')`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/70 to-blue-900/40"></div>
            </div>

            {/* Navigation Bar */}
            <NavBar />

            {/* Hero Content */}
            <div className="relative z-10 text-center px-4 py-24 w-full">
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
                <div className="space-x-4 mb-8">
                    <Link href="/login">
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
                            Book an Appointment
                        </button>
                    </Link>
                    <Link href="/services">
                        <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300">
                            Learn More
                        </button>
                    </Link>
                </div>

                {/* Emergency Contact Button */}
                <div className="mb-8">
                    <a
                        href="tel:+1234567890"
                        className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
                    >
                        🚨 Emergency Contact: +123 456 7890
                    </a>
                </div>

                {/* Top Doctors Section */}
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-6">Top Doctors</h2>
                    {topDoctors.length === 0 ? (
                        <p className="text-gray-300">No doctors available.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {topDoctors.slice(0,4).map((doctor) => (
                                <div key={doctor.id} className="bg-white/20 rounded-lg p-4 text-center">
                                    <h3 className="text-xl font-semibold text-white">
                                       Dr. {doctor.firstName} {doctor.lastName}
                                    </h3>
                                    <p className="text-gray-300">{doctor.specialty}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Top Hospitals Section */}
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-12">
                    <h2 className="text-2xl font-semibold text-white mb-6">Top Hospitals</h2>
                    {topHospitals.length === 0 ? (
                        <p className="text-gray-300">No hospitals available.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {topHospitals.slice(0,4).map((hospital) => (
                                <div key={hospital.id} className="bg-white/20 rounded-lg p-4 text-center">
                                    <h3 className="text-xl font-semibold text-white">{hospital.name}</h3>
                                    <p className="text-gray-300">{hospital.city}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                <WhyChooseUs/>
            </div>
        </div>
            <Footer/>
        </>
    );
}