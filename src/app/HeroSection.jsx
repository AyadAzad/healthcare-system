"use client";

import React, { useState } from 'react';
import NavBar from "@/app/NavBar";
import Link from "next/link";

export default function HeroSection() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        // Simulate a subscription request
        console.log("Subscribed with email:", email);
        setSubscribed(true);
        setEmail(""); // Clear the input field
    };

    return (
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
                    <Link href="/aboutus">
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

                {/* Newsletter Form */}
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-md mx-auto mb-12">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        Subscribe to Our Newsletter
                    </h2>
                    {subscribed ? (
                        <p className="text-green-400 font-semibold">
                            Thank you for subscribing!
                        </p>
                    ) : (
                        <form onSubmit={handleSubscribe} className="flex flex-col space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Social Media Follow Buttons (Fixed to Bottom) */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm p-4 rounded-t-lg shadow-lg">
                <div className="flex space-x-6 justify-center">
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-blue-400 transition duration-300 transform hover:scale-110"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-10 h-10"
                        >
                            <path
                                d="M22.46 5.63c-.8.36-1.66.6-2.56.71.92-.55 1.63-1.42 1.96-2.46-.86.51-1.82.88-2.84 1.08-.81-.86-1.97-1.4-3.25-1.4-2.46 0-4.45 2-4.45 4.46 0 .35.04.69.12 1.01-3.7-.19-6.98-1.96-9.18-4.66-.38.66-.6 1.43-.6 2.25 0 1.55.79 2.92 1.99 3.72-.73-.02-1.42-.22-2.02-.55v.06c0 2.16 1.54 3.96 3.58 4.37-.37.1-.77.15-1.18.15-.29 0-.57-.03-.85-.08.57 1.8 2.24 3.11 4.22 3.15-1.55 1.22-3.5 1.95-5.62 1.95-.37 0-.73-.02-1.09-.06 2.01 1.29 4.4 2.04 6.97 2.04 8.36 0 12.93-6.93 12.93-12.93 0-.2 0-.39-.01-.59.89-.65 1.66-1.47 2.27-2.4z"/>
                        </svg>
                    </a>
                    <a
                        href="https://youtube.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-red-600 transition duration-300 transform hover:scale-110"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-10 h-10"
                        >
                            <path
                                d="M21.58 7.19c-.23-.86-.91-1.54-1.77-1.77C18.25 5 12 5 12 5s-6.25 0-7.81.42c-.86.23-1.54.91-1.77 1.77C2 8.75 2 12 2 12s0 3.25.42 4.81c.23.86.91 1.54 1.77 1.77C5.75 19 12 19 12 19s6.25 0 7.81-.42c.86-.23 1.54-.91 1.77-1.77C22 15.25 22 12 22 12s0-3.25-.42-4.81zM10 15V9l6 3-6 3z"/>
                        </svg>
                    </a>
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-blue-600 transition duration-300 transform hover:scale-110"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-10 h-10"
                        >
                            <path
                                d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                        </svg>
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-pink-600 transition duration-300 transform hover:scale-110"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-10 h-10"
                        >
                            <path
                                d="M12 2.16c3.2 0 3.58 0 4.85.07 1.17.06 1.8.28 2.22.46.56.23 1.03.54 1.5.99.45.47.76.94.99 1.5.18.42.4 1.05.46 2.22.07 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.06 1.17-.28 1.8-.46 2.22-.23.56-.54 1.03-.99 1.5-.47.45-.94.76-1.5.99-.42.18-1.05.4-2.22.46-1.27.07-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.06-1.8-.28-2.22-.46-.56-.23-1.03-.54-1.5-.99-.45-.47-.76-.94-.99-1.5-.18-.42-.4-1.05-.46-2.22-.07-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85c.06-1.17.28-1.8.46-2.22.23-.56.54-1.03.99-1.5.47-.45.94-.76 1.5-.99.42-.18 1.05-.4 2.22-.46 1.27-.07 1.65-.07 4.85-.07zm0-2.16c-3.27 0-3.69.01-4.98.07-1.29.06-2.17.29-2.94.62-.8.34-1.48.8-2.16 1.48-.68.68-1.14 1.36-1.48 2.16-.33.77-.56 1.65-.62 2.94-.06 1.29-.07 1.71-.07 4.98s.01 3.69.07 4.98c.06 1.29.29 2.17.62 2.94.34.8.8 1.48 1.48 2.16.68.68 1.36 1.14 2.16 1.48.77.33 1.65.56 2.94.62 1.29.06 1.71.07 4.98.07s3.69-.01 4.98-.07c1.29-.06 2.17-.29 2.94-.62.8-.34 1.48-.8 2.16-1.48.68-.68 1.14-1.36 1.48-2.16.33-.77.56-1.65.62-2.94.06-1.29.07-1.71.07-4.98s-.01-3.69-.07-4.98c-.06-1.29-.29-2.17-.62-2.94-.34-.8-.8-1.48-1.48-2.16-.68-.68-1.36-1.14-2.16-1.48-.77-.33-1.65-.56-2.94-.62-1.29-.06-1.71-.07-4.98-.07zm0 5.34c-2.62 0-4.74 2.12-4.74 4.74s2.12 4.74 4.74 4.74 4.74-2.12 4.74-4.74-2.12-4.74-4.74-4.74zm0 7.82c-1.7 0-3.08-1.38-3.08-3.08s1.38-3.08 3.08-3.08 3.08 1.38 3.08 3.08-1.38 3.08-3.08 3.08zm6.24-7.82c0 .61-.5 1.11-1.11 1.11s-1.11-.5-1.11-1.11.5-1.11 1.11-1.11 1.11.5 1.11 1.11z"/>
                        </svg>
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-blue-700 transition duration-300 transform hover:scale-110"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-10 h-10"
                        >
                            <path
                                d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0 5-5zM8 19H5V8h3v11zM6.5 6.73c-.97 0-1.75-.79-1.75-1.75s.79-1.75 1.75-1.75 1.75.79 1.75 1.75-.79 1.75-1.75 1.75zM20 19h-3v-5.6c0-1.36-.02-3.11-1.9-3.11-1.9 0-2.19 1.48-2.19 3.01V19h-3V8h2.86v1.62h.04c.56-.96 1.94-1.97 4-1.97 4.28 0 5.07 2.82 5.07 6.49V19z"/>
                        </svg>
                    </a>
                </div>
                <p className="text-sm pt-2 text-gray-300 text-center">
                    Developed by <span className="font-semibold">Rawaz Darya</span>,{" "}
                    <span className="font-semibold">Mohammed Najat</span>, and{" "}
                    <span className="font-semibold">Soma Dler</span>
                </p>
            </div>
        </div>
    );
}