"use client"

import React from 'react';
import NavBar from "@/app/NavBar";

const PrivacyPolicyPage = () => {
    return (
        <>
            <NavBar />
            <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
                {/* Hero Section */}
                <div className="container mx-auto px-6 py-24 text-center">
                    <h1 className="text-5xl font-bold text-blue-900 dark:text-white mb-4 animate-fade-in">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-up">
                        Your privacy is important to us. Learn how we collect, use, and protect your information.
                    </p>
                </div>

                {/* Content Section */}
                <div className="container mx-auto px-6 pb-20">
                    <div className="max-w-3xl mx-auto">
                        {[
                            {
                                title: "Introduction",
                                content: "We are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information.",
                            },
                            {
                                title: "Information We Collect",
                                content: "We may collect personal information such as your name, email address, phone number, and payment details when you use our services.",
                            },
                            {
                                title: "How We Use Your Information",
                                content: "Your information is used to provide and improve our services, process transactions, and communicate with you.",
                            },
                            {
                                title: "Data Security",
                                content: "We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure.",
                            },
                            {
                                title: "Third-Party Services",
                                content: "We may use third-party services to process payments or analyze data. These services have their own privacy policies.",
                            },
                            {
                                title: "Your Rights",
                                content: "You have the right to access, update, or delete your personal information at any time.",
                            },
                            {
                                title: "Changes to This Policy",
                                content: "We may update this policy from time to time. Any changes will be posted on this page.",
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
                <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8 transition-colors duration-500">
                    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                        <div className="text-center md:text-left mb-4 md:mb-0">
                            <h3 className="text-2xl font-bold">HealthCareIQ</h3>
                            <p className="text-gray-400">Your health, our priority.</p>
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                Terms of Service
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default PrivacyPolicyPage;