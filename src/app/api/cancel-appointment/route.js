import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request) {
    try {
        const { appointmentId } = await request.json();

        if (!appointmentId) {
            return NextResponse.json(
                { error: "Appointment ID is required" },
                { status: 400 }
            );
        }

        // Delete the appointment
        await prisma.appointment.delete({
            where: { id: parseInt(appointmentId) },
        });

        return NextResponse.json(
            { message: "Appointment canceled successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error canceling appointment:", error);
        return NextResponse.json(
            { error: error.message || "Failed to cancel appointment" },
            { status: 500 }
        );
    }
}