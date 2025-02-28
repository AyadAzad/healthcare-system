import React from 'react';
import NavBar from '@/app/NavBar';

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
                <button
                    className="mt-12 bg-blue-500 dark:bg-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 dark:hover:bg-purple-600 transition-all duration-300 ease-in-out animate-bounce"
                >
                    Learn More
                </button>
            </section>
        </>
    );
}

export default ServicesSection;