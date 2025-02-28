"use client";


import React, { useEffect, useState } from 'react';
import {useSession, signOut} from "next-auth/react";
import {useRouter} from "next/navigation";
const PatientDashboard = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [question, setQuestion] = useState('');
    const [name, setName] = useState('');

    const {data: session, status} = useSession()
    const router = useRouter()

    if (status === 'loading'){
        return <p>loading</p>
    }
    if (!session){
        router.push('/signin')
        return null
    }

    // Fetch doctors data
    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await fetch('/api/doctors');
            const data = await response.json();
            setDoctors(data);
        };

        fetchDoctors();
    }, []);

    // Book Appointment
    const handleBookAppointment = async (doctorId, appointmentTime) => {
        const appointmentData = {
            patient_id: 1, // Replace with actual patient ID
            doctor_id: doctorId,
            appointment_date: selectedDate.toISOString().split('T')[0],
            appointment_time: appointmentTime,
        };

        const response = await fetch('/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(appointmentData),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Appointment booked successfully!');
        } else {
            alert('Failed to book appointment: ' + result.error);
        }
    };

    // Schedule Video Call
    const handleScheduleVideoCall = async () => {
        const videoCallData = {
            patient_id: 1, // Replace with actual patient ID
            doctor_id: selectedDoctor,
            call_date: selectedDate.toISOString().split('T')[0],
            call_time: selectedTime,
        };

        const response = await fetch('/api/videoCalls', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(videoCallData),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Video call scheduled successfully!');
        } else {
            alert('Failed to schedule video call: ' + result.error);
        }
    };

    // Request Quick Advice
    const handleRequestAdvice = async () => {
        const adviceData = {
            patient_id: 1, // Replace with actual patient ID
            question: question,
        };

        const response = await fetch('/api/quickAdvice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(adviceData),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Quick advice requested successfully!');
        } else {
            alert('Failed to request advice: ' + result.error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-blue-900 text-white p-6">
                <h2 className="text-2xl font-bold mb-8">MediCare</h2>
                <nav>
                    <a href="#" className="block py-2.5 px-4 rounded hover:bg-blue-800 transition duration-200">
                        Dashboard
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded hover:bg-blue-800 transition duration-200">
                        Appointments
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded hover:bg-blue-800 transition duration-200">
                        Video Calls
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded hover:bg-blue-800 transition duration-200">
                        Quick Advice
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded hover:bg-blue-800 transition duration-200">
                        Medical Records
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded hover:bg-blue-800 transition duration-200">
                        Settings
                    </a>
                    <button onClick={() => signOut()}>
                        LogOut
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-blue-900">Welcome Back, Patient!</h1>
                    <p className="text-gray-600">Manage your healthcare needs efficiently.</p>
                </div>

                {/* Grid Layout for Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Book a Doctor Appointment */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">Book an Appointment</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Select Date:</label>
                            <input
                                type="date"
                                value={selectedDate.toISOString().split('T')[0]}
                                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-4">Available Doctors</h3>
                            {doctors.map((doctor) => (
                                <div key={doctor.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                                    <h4 className="text-lg font-bold text-gray-800">{doctor.name}</h4>
                                    <p className="text-gray-600">{doctor.specialty}</p>
                                    <p className="text-gray-600">Fee: {doctor.fee} IQD</p>
                                    <div className="mt-2">
                                        <label className="block text-gray-700 mb-2">Select Time:</label>
                                        <select
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                            onChange={(e) => setSelectedTime(e.target.value)}
                                        >
                                            {doctor.available_time.split(' - ').map((time, index) => (
                                                <option key={index} value={time}>
                                                    {time}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                        onClick={() => handleBookAppointment(doctor.id, selectedTime)}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Video Call Appointment */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">Video Call Appointment</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Select Doctor:</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                            >
                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.name} - {doctor.specialty}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Select Date:</label>
                            <input
                                type="date"
                                value={selectedDate.toISOString().split('T')[0]}
                                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Select Time:</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setSelectedTime(e.target.value)}
                            >
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="02:00 PM">02:00 PM</option>
                            </select>
                        </div>
                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                            onClick={handleScheduleVideoCall}
                        >
                            Schedule Video Call
                        </button>
                    </div>

                    {/* Quick Advice Request */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">Quick Advice</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Your Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Your Question:</label>
                                <textarea
                                    placeholder="Describe your issue or question"
                                    rows="4"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                ></textarea>
                            </div>
                            <button
                                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                onClick={handleRequestAdvice}
                            >
                                Request Advice
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;