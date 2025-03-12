"use client";
import Modal from "@/app/patient/Modal";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import NavBar from "@/app/NavBar";
import SideBar from "@/app/patient/SideBar";

const Appointments = () => {
    const searchParams = useSearchParams();
    const patientId = searchParams.get("patientId");
    const [appointments, setAppointments] = useState([]);

    const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [newDate, setNewDate] = useState("");
    const [newTime, setNewTime] = useState("");

    // Open modal with a message
    // const openModal = (message) => {
    //     setModalMessage(message);
    //     setIsModalOpen(true);
    // };


    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`/api/view-appointments?patientId=${patientId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch appointments");
                }
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };

        fetchAppointments();
    }, [patientId]);

    const handleCancelAppointment = async (appointmentId) => {
        try {
            const response = await fetch("/api/cancel-appointment", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ appointmentId }),
            });

            if (!response.ok) {
                throw new Error("Failed to cancel appointment");
            }

            // Refresh the appointments list
            const updatedAppointments = appointments.filter(
                (appointment) => appointment.id !== appointmentId
            );
            setAppointments(updatedAppointments);
            openModal("Appointment canceled successfully!")
        } catch (error) {
            console.error("Error canceling appointment:", error);
            openModal(error.message);
        }
    };

    const handleRescheduleSubmit = async () => {
        if (!newDate || !newTime) {
            alert("Please provide both a new date and time.");
            return;
        }

        try {
            const response = await fetch("/api/reschedule-appointment", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ appointmentId: selectedAppointmentId, newDate, newTime }),
            });

            if (!response.ok) {
                throw new Error("Failed to reschedule appointment");
            }

            // Refresh the appointments list
            const updatedAppointments = appointments.map((appointment) =>
                appointment.id === selectedAppointmentId
                    ? { ...appointment, appointmentDate: newDate, appointmentTime: newTime }
                    : appointment
            );
            setAppointments(updatedAppointments);

            // Close the modal
            setIsRescheduleModalOpen(false);
            alert("Appointment rescheduled successfully!");
        } catch (error) {
            console.error("Error rescheduling appointment:", error);
            alert(error.message);
        }
    };

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex">
                <SideBar />
                <div className="flex-1 p-8">
                    <h1 className="text-4xl font-bold text-blue-900 mb-8">Booked Appointments</h1>
                    {appointments.length > 0 ? (
                        <div className="space-y-6">
                            {appointments.map((appointment) => (
                                <div key={appointment.id} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-xl font-semibold text-blue-900">
                                        {appointment.doctor.firstName} {appointment.doctor.lastName}
                                    </h3>
                                    <h4 className="text-gray-600 font-semibold">Specialty: {appointment.doctor.specialty}</h4>
                                    <p className="text-gray-600 mt-2">
                                        <span className="font-medium">Date:</span> {new Date(appointment.appointmentDate).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600">
                                        <span className="font-medium">Time:</span> {appointment.appointmentTime}
                                    </p>
                                    <div className="mt-4 flex space-x-4">
                                        <button
                                            onClick={() => {
                                                setSelectedAppointmentId(appointment.id);
                                                setIsRescheduleModalOpen(true);
                                            }}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                                        >
                                            Reschedule
                                        </button>
                                        <button
                                            onClick={() => handleCancelAppointment(appointment.id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600">No appointments booked.</p>
                    )}
                </div>
            </div>
            <Modal isOpen={isRescheduleModalOpen} onClose={() => setIsRescheduleModalOpen(false)}>
                <h2 className="text-xl font-bold text-blue-900 mb-4">Reschedule Appointment</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">New Date:</label>
                        <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">New Time:</label>
                        <input
                            type="time"
                            value={newTime}
                            onChange={(e) => setNewTime(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                        />
                    </div>
                    <button
                        onClick={handleRescheduleSubmit}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Reschedule
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Appointments;