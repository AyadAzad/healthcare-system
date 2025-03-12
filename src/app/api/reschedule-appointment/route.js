import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request) {
    try {
        const { appointmentId, newDate, newTime } = await request.json();

        if (!appointmentId || !newDate || !newTime) {
            return NextResponse.json(
                { error: "Appointment ID, new date, and new time are required" },
                { status: 400 }
            );
        }

        // Update the appointment
        const updatedAppointment = await prisma.appointment.update({
            where: { id: parseInt(appointmentId) },
            data: {
                appointmentDate: new Date(newDate),
                appointmentTime: newTime,
            },
        });

        return NextResponse.json(updatedAppointment, { status: 200 });
    } catch (error) {
        console.error("Error rescheduling appointment:", error);
        return NextResponse.json(
            { error: error.message || "Failed to reschedule appointment" },
            { status: 500 }
        );
    }
}