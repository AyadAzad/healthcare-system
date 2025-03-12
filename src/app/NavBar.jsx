import Image from "next/image";
import React from "react";

const NavBar = () =>{
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-20 p-2 flex items-center justify-between bg-blue-900">
                {/* Logo */}
                <div className="flex items-center">
                    <Image alt="logo" src="/logo.png" width={40} height={40}/>
                    <span className="ml-3 text-2xl font-bold text-white">HealthCareIQ</span>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-8">
                    <a href="/" className="text-white hover:text-blue-400 transition duration-300">
                        Home
                    </a>
                    <a href="/services" className="text-white hover:text-blue-400 transition duration-300">
                        Services
                    </a>
                    <a href="/aboutus   " className="text-white hover:text-blue-400 transition duration-300">
                        AboutUs
                    </a>
                    <a href="/hospitals" className="text-white hover:text-blue-400 transition duration-300">
                        Hospitals
                    </a>
                    <a href="/contact" className="text-white hover:text-blue-400 transition duration-300">
                        Contact
                    </a>
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
    )
}
export default NavBar