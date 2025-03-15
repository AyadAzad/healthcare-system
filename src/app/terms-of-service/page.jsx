"use client"

import React from 'react';
import NavBar from "@/app/NavBar";
import Footer from "@/app/Footer";

const TermsOfServicePage = () => {
    return (
        <>
            <NavBar />
            <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
                {/* Hero Section */}
                <div className="container mx-auto px-6 py-24 text-center">
                    <h1 className="text-5xl font-bold text-blue-900 dark:text-white mb-4 animate-fade-in">
                        Terms of Service
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up">
                        By using our services, you agree to these terms. Please read them carefully.
                    </p>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-6 pb-20">
                    <div className="max-w-3xl mx-auto">
                        {[
                            {
                                title: "Acceptance of Terms",
                                content: "By accessing or using our services, you agree to be bound by these terms and conditions.",
                            },
                            {
                                title: "Use of Services",
                                content: "You agree to use our services only for lawful purposes and in accordance with these terms.",
                            },
                            {
                                title: "User Accounts",
                                content: "You are responsible for maintaining the confidentiality of your account and password.",
                            },
                            {
                                title: "Intellectual Property",
                                content: "All content and materials on our platform are protected by intellectual property laws.",
                            },
                            {
                                title: "Limitation of Liability",
                                content: "We are not liable for any indirect, incidental, or consequential damages arising from your use of our services.",
                            },
                            {
                                title: "Termination",
                                content: "We reserve the right to terminate or suspend your access to our services at any time, without notice.",
                            },
                            {
                                title: "Governing Law",
                                content: "These terms are governed by the laws of the jurisdiction in which our company is based.",
                            },
                        ].map((section, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8 hover:shadow-2xl transition-all duration-500 ease-in-out animate-fade-in-up"
                            >
                                <h2 className="text-2xl font-bold text-blue-900 dark:text-white mb-4">
                                    {section.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">{section.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <Footer/>
            </div>

        </>
    );
};

export default TermsOfServicePage;