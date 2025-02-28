import React from 'react';
import AppointmentsSection from "@/app/doctor/AppointmentSection";
const DoctorDashboard = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="bg-blue-900 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
                <div className="text-white flex items-center space-x-2 px-4">
                    <span className="text-2xl font-extrabold">HealthCareIQ</span>
                </div>
                <nav>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800">
                        Dashboard
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800">
                        Patients
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800">
                        Reports
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-800">
                        Settings
                    </a>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <header className="flex justify-between items-center py-4 px-6 bg-white border-b-4 border-blue-900">
                    <div className="flex items-center">
                        <h1 className="text-gray-800 text-xl font-bold">Doctor Dashboard</h1>
                    </div>
                    <div className="flex items-center">
                        <div className="relative">
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    <div className="container mx-auto px-6 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Patient Overview Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
                                <h2 className="dark:text-white text-xl font-bold mb-4">Patient Overview</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span>Total Patients</span>
                                        <span className="font-bold">1,234</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>New Patients</span>
                                        <span className="font-bold">56</span>
                                    </div>
                                </div>
                            </div>

                            {/* Appointments Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
                                <h2 className="text-xl font-bold mb-4">Appointments</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span>Today's Appointments</span>
                                        <span className="font-bold">12</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Upcoming Appointments</span>
                                        <span className="font-bold">34</span>
                                    </div>
                                </div>
                            </div>

                            {/* Statistics Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6">
                                <h2 className="text-xl font-bold mb-4">Statistics</h2>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span>Consultations</span>
                                        <span className="font-bold">789</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span>Prescriptions</span>
                                        <span className="font-bold">456</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <AppointmentsSection/>
            </div>
        </div>
    );
};

export default DoctorDashboard;