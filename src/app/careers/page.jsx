"use client";

import React from 'react';
import NavBar from "@/app/NavBar";
import Link from "next/link";
import Footer from "@/app/Footer";

const CareersPage = () => {
    const jobOpenings = [
        {
            id: 1,
            title: "Senior Pediatrician",
            department: "Pediatrics",
            location: "Riyadh, Saudi Arabia",
            description: "We are seeking a dedicated Senior Pediatrician to join our team. The ideal candidate will have extensive experience in pediatric care and a passion for children's health.",
            requirements: [
                "MD or equivalent degree",
                "Board certification in Pediatrics",
                "Minimum 5 years of experience",
                "Strong communication and interpersonal skills"
            ]
        },
        {
            id: 2,
            title: "Cardiologist",
            department: "Cardiology",
            location: "Jeddah, Saudi Arabia",
            description: "We are looking for a skilled Cardiologist to diagnose and treat patients with heart conditions. The ideal candidate will have expertise in preventive cardiology and advanced treatment methods.",
            requirements: [
                "MD or equivalent degree",
                "Board certification in Cardiology",
                "Minimum 7 years of experience",
                "Proficiency in advanced cardiac procedures"
            ]
        },
        {
            id: 3,
            title: "Registered Nurse",
            department: "Nursing",
            location: "Dammam, Saudi Arabia",
            description: "We are hiring Registered Nurses to provide high-quality patient care. The ideal candidate will have a strong background in clinical nursing and a commitment to patient well-being.",
            requirements: [
                "Bachelor's degree in Nursing",
                "Valid nursing license",
                "Minimum 2 years of experience",
                "Excellent patient care skills"
            ]
        }
    ];

    const benefits = [
        "Competitive salary and benefits package",
        "Opportunities for professional development",
        "State-of-the-art facilities and technology",
        "Supportive and collaborative work environment",
        "Health and wellness programs"
    ];

    return (
        <>
            <NavBar />
            <div className="bg-white dark:bg-gray-800">
                {/* Hero Section */}
                <div className="container py-36 mx-auto px-6 text-center">
                    <h1 className="text-5xl font-bold text-blue-900 mb-4 dark:text-gray-300">Careers at HealthCareIQ</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                        Join our team of dedicated healthcare professionals and make a difference in the lives of our patients.
                    </p>
                    <Link href="#job-openings">
                        <button className="bg-blue-900 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-200">
                            View Openings
                        </button>
                    </Link>
                </div>

                {/* Benefits Section */}
                <div className="bg-blue-50 py-12 dark:bg-gray-800">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-blue-900 dark:text-gray-300 mb-6">Why Join Us?</h2>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                                At HealthCareIQ, we value our employees and offer a range of benefits to support their professional and personal growth.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 text-center">
                                        <p className="text-lg text-blue-900 dark:text-gray-300">{benefit}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Job Openings Section */}
                <div id="job-openings" className="container mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold text-blue-900 dark:text-gray-300 text-center mb-12">Current Job Openings</h2>
                    <div className="space-y-8">
                        {jobOpenings.map((job) => (
                            <div key={job.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6">
                                <h3 className="text-2xl font-bold text-blue-900 dark:text-gray-300 mb-2">{job.title}</h3>
                                <p className="text-gray-600 dark:text-blue-300 mb-4">{job.department} | {job.location}</p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>
                                <h4 className="text-xl font-bold text-blue-900 dark:text-gray-300 mb-2">Requirements:</h4>
                                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
                                    {job.requirements.map((requirement, index) => (
                                        <li key={index}>{requirement}</li>
                                    ))}
                                </ul>
                                <Link href="/contact">
                                <button className="bg-blue-900 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition duration-200">
                                    Apply Now
                                </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call-to-Action Section */}
                <div className="bg-blue-900 py-12">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold text-white mb-6">Ready to Join Our Team?</h2>
                        <p className="text-lg text-blue-200 mb-8">
                            If you don't see a role that matches your skills, we'd still love to hear from you. Send us your resume!
                        </p>
                        <button className="bg-white text-blue-900 font-bold py-3 px-8 rounded-full hover:bg-blue-100 transition duration-200">
                            Submit Resume
                        </button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default CareersPage;