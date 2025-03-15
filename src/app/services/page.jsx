"use client"

import React from 'react';
import NavBar from '@/app/NavBar';
import Link from "next/link";
import Footer from "@/app/Footer";

function ServicesSection() {
    return (
        <>
            <NavBar />
            <section className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500">
                <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-12 animate-fade-in">
                    Our <span className="text-blue-500 dark:text-purple-400">Services</span>
                </h1>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                    {[
                        { title: 'Consultation', description: 'Expert advice on health matters.', icon: '💡' },
                        { title: 'Treatment', description: 'Advanced treatment options available.', icon: '⚕️' },
                        { title: 'Prevention', description: 'Preventive care for better health.', icon: '🛡️' },
                        { title: 'Diagnostics', description: 'State-of-the-art diagnostic services.', icon: '🔍' },
                        { title: 'Wellness Programs', description: 'Customized wellness plans for individuals.', icon: '🌿' },
                        { title: 'Emergency Care', description: '24/7 emergency medical services.', icon: '🚨' },
                    ].map((service, index) => (
                        <div
                            key={service.title}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2"
                        >
                            <div className="text-4xl mb-4">{service.icon}</div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                {service.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
                        </div>
                    ))}
                </div>

                {/* Animated Button */}
                <Link href="/aboutus">
                <button
                    className="mt-12 bg-blue-500 dark:bg-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 dark:hover:bg-purple-600 transition-all duration-300 ease-in-out animate-bounce"
                >
                    Learn More
                </button>
                </Link>

                {/* Testimonials Section */}
                <div className="mt-20 w-full bg-gray-100 dark:bg-gray-800 py-12">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
                            What Our Clients Say
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { name: 'Rawa Ghalib', testimonial: 'The consultation was thorough and the staff was very friendly. Highly recommend!', avatar: '👤' },
                                { name: 'Shan Sirwan', testimonial: 'The treatment I received was top-notch. I felt well taken care of.', avatar: '👩' },
                                { name: 'Kareem Dawood', testimonial: 'The wellness programs have really improved my quality of life. Thank you!', avatar: '👩‍⚕️' },
                            ].map((testimonial, index) => (
                                <div
                                    key={testimonial.name}
                                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 ease-in-out"
                                >
                                    <div className="text-4xl mb-4">{testimonial.avatar}</div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300">{testimonial.testimonial}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
            </section>
                <Footer/>
        </>
    );
}

export default ServicesSection;