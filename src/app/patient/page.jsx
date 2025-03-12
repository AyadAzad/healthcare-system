"use client";

import React, { useEffect, useState } from "react";
import {  useSearchParams } from "next/navigation";
import Modal from "./Modal";
import SideBar from "@/app/patient/SideBar";

import "intro.js/introjs.css"
import {Steps} from "intro.js-react";
const PatientDashboard = () => {
    const searchParams = useSearchParams();
    const firstName = searchParams.get("firstName");
    const patientId = searchParams.get("patientId");
    const [note, setNote] = useState(""); // New state for the note
    const [image, setImage] = useState(null); // New state for the image
    // Redirect if not authorized
    if (!firstName || !patientId) {
        return <div>Unauthorized access</div>;
    }
    // State for guided tour
    const [tourEnabled, setTourEnabled] = useState(false);
    const [tourSteps] = useState([
        {
            element: ".book-appointment",
            intro: "Book an appointment with a doctor. Select a date, time, and doctor to schedule your visit.",
        },
        {
            element: ".video-call",
            intro: "Schedule a video call with your doctor for remote consultations.",
        },
        {
            element: ".quick-advice",
            intro: "Need quick advice? Click here to send a question to your doctor.",
        },
    ]);

    // Start the tour automatically for first-time users
    useEffect(() => {
        setTourEnabled(true); // Start the tour
    }, []);


    // State for doctors and appointment booking
    const [doctors, setDoctors] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const [question, setQuestion] = useState("");
    const [name, setName] = useState("");

    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    // Open modal with a message
    const openModal = (message) => {
        setModalMessage(message);
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Fetch doctors data
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch("/api/doctors");
                if (!response.ok) {
                    throw new Error("Failed to fetch doctors");
                }
                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
                openModal("Failed to fetch doctors. Please try again later.");
            }
        };

        fetchDoctors();
    }, []);


    // Book Appointment
    const handleBookAppointment = async (doctorId) => {
        try {
            const formData = new FormData();
            formData.append("patient_id", patientId);
            formData.append("doctor_id", doctorId);
            formData.append("appointment_date", selectedDate.toISOString().split("T")[0]);
            formData.append("appointment_time", selectedTime);
            formData.append("note", note);
            if (image) {
                formData.append("image", image);
            }

            const response = await fetch("/api/appointments", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to book appointment");
            }

            openModal("Appointment booked successfully!");
        } catch (error) {
            console.error("Error booking appointment:", error);
            openModal(error.message);
        }
    };
    // Schedule Video Call
    const handleScheduleVideoCall = async () => {
        if (!selectedDoctor || !selectedTime) {
            openModal("Please select a doctor and a time.");
            return;
        }

        try {
            const videoCallData = {
                patient_id: parseInt(patientId),
                doctor_id: parseInt(selectedDoctor),
                call_date: selectedDate.toISOString().split("T")[0],
                call_time: selectedTime,
            };

            console.log("Video Call Data:", videoCallData); // Debugging

            const response = await fetch("/api/videoCalls", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(videoCallData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to schedule video call");
            }

            openModal("Video call scheduled successfully!");
        } catch (error) {
            console.error("Error scheduling video call:", error);
            openModal(error.message);
        }
    };

    // Request Quick Advice
    const handleRequestAdvice = async (e) => {
        e.preventDefault()
        try {
            const adviceData = {
                patient_id: parseInt(patientId),
                question: question,
            };

            const response = await fetch("/api/quickadvice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(adviceData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to request advice");
            }

            openModal("Quick advice requested successfully!");
        } catch (error) {
            console.error("Error requesting advice:", error);
            openModal(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Steps
                initialStep={0}
                steps={tourSteps}
                onExit={() => setTourEnabled(false)}
                enabled={tourEnabled}

            />
            {/* Sidebar */}
            <SideBar/>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-blue-900">Welcome Back, {firstName}</h1>
                    <p className="text-gray-600">Manage your healthcare needs efficiently.</p>
                </div>

                {/* Grid Layout for Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Book a Doctor Appointment */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="book-appointment text-2xl font-bold text-blue-900 mb-4">Book an Appointment</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Select Date:</label>
                            <input
                                type="date"
                                value={selectedDate.toISOString().split("T")[0]}
                                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                className="w-full text-gray-600 p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-blue-900 mb-4">Available Doctors</h3>
                            {doctors.map((doctor) => (
                                <div key={doctor.id} className="mb-4 p-4 border border-gray-200 rounded-lg">
                                    <h4 className="text-lg font-bold text-gray-800">{doctor.firstName} {doctor.lastName}</h4>
                                    <p className="text-gray-600">{doctor.specialty}</p>
                                    <p className="text-gray-600">Fee: {doctor.fee} IQD</p>
                                    <div className="mt-2">
                                        <label className="block text-gray-700 mb-2">Select Time:</label>
                                        <select
                                            className="w-full text-gray-600 p-2 border border-gray-300 rounded-lg"
                                            onChange={(e) => setSelectedTime(e.target.value)}
                                        >
                                            <option value="10:00 AM">10:00 AM</option>
                                            <option value="02:00 PM">02:00 PM</option>
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-gray-700 mb-2">Note:</label>
                                        <textarea
                                            className="w-full text-gray-600 p-2 border border-gray-300 rounded-lg"
                                            rows="3"
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-gray-700 mb-2">Attach Image (optional):</label>
                                        <input
                                            type="file"
                                            className="w-full text-gray-600 p-2 border border-gray-300 rounded-lg"
                                            onChange={(e) => setImage(e.target.files[0])}
                                        />
                                    </div>
                                    <button
                                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                                        onClick={() => handleBookAppointment(doctor.id)}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Video Call Appointment */}
                    <div className=" bg-white rounded-lg shadow-lg p-6">
                        <h2 className="video-call text-2xl font-bold text-blue-900 mb-4">Video Call Appointment</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Select Doctor:</label>
                            <select
                                className="w-full text-gray-600 p-2 border border-gray-300 rounded-lg"
                                onChange={(e) => setSelectedDoctor(e.target.value)}
                            >
                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.firstName} {doctor.lastName} - {doctor.specialty}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Select Date:</label>
                            <input
                                type="date"
                                value={selectedDate.toISOString().split("T")[0]}
                                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                                className="w-full text-gray-600 p-2 border border-gray-300 rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Select Time:</label>
                            <select
                                className="w-full text-gray-600 p-2 border border-gray-300 rounded-lg"
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
                    <div className=" bg-white rounded-lg shadow-lg p-6">
                        <h2 className="quick-advice text-2xl font-bold text-blue-900 mb-4">Quick Advice</h2>
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

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <p className="text-gray-600">{modalMessage}</p>
            </Modal>

        </div>
    );
};

export default PatientDashboard;