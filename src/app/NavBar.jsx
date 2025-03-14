import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

const NavBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-blue-900 shadow-lg">
                {/* Logo */}
                <Link href="/">
                    <div className="flex items-center cursor-pointer">
                        <Image alt="logo" src="/logo.png" width={40} height={40} />
                        <span className="ml-3 text-2xl font-bold text-white">HealthCareIQ</span>
                    </div>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-8 items-center">
                    <a href="/" className="text-white hover:text-blue-400 transition duration-300">
                        Home
                    </a>
                    <a href="/services" className="text-white hover:text-blue-400 transition duration-300">
                        Services
                    </a>
                    <a href="/aboutus" className="text-white hover:text-blue-400 transition duration-300">
                        AboutUs
                    </a>
                    <a href="/hospitals" className="text-white hover:text-blue-400 transition duration-300">
                        Hospitals
                    </a>
                    <a href="/contact" className="text-white hover:text-blue-400 transition duration-300">
                        Contact
                    </a>
                    <a href="/contact" className="text-white hover:text-blue-400 transition duration-300">
                        24/7 Support
                    </a>
                </div>

                {/* Signup Dropdown and Login Button */}
                <div className="hidden md:flex space-x-4 items-center">
                    {/* Signup Dropdown */}
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="bg-white text-blue-900 px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-300 flex items-center"
                        >
                            Sign Up
                            <svg
                                className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                                    isDropdownOpen ? "transform rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                                <Link href="/signup">
                                    <div className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-t-lg transition duration-300">
                                        Patient Signup
                                    </div>
                                </Link>
                                <Link href="/doctor/signup">
                                    <div className="block px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-b-lg transition duration-300">
                                        Doctor Signup
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Login Button */}
                    <Link href="/login">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                            Login
                        </button>
                    </Link>
                </div>

                {/* Mobile Menu Button (Optional) */}
                <button className="md:hidden text-white focus:outline-none">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
            </nav>
        </>
    );
};

export default NavBar;