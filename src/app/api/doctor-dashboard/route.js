import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const doctorId = searchParams.get("doctorId");

        if (!doctorId) {
            return NextResponse.json(
                { error: "Doctor ID is required" },
                { status: 400 }
            );
        }

        // Fetch doctor's data
        const doctor = await prisma.doctor.findUnique({
            where: { id: parseInt(doctorId) },
            include: {
                appointments: true,
                videocalls: true,
            },
        });

        if (!doctor) {
            return NextResponse.json(
                { error: "Doctor not found" },
                { status: 404 }
            );
        }

        // Calculate statistics
        const totalPatients = await prisma.patient.count({
            where: {
                appointments: {
                    some: {
                        doctorId: parseInt(doctorId),
                    },
                },
            },
        });

        const newPatients = await prisma.patient.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().setDate(new Date().getDate() - 7)), // Last 7 days
                },
                appointments: {
                    some: {
                        doctorId: parseInt(doctorId),
                    },
                },
            },
        });

        const todaysAppointments = await prisma.appointment.count({
            where: {
                doctorId: parseInt(doctorId),
                appointmentDate: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0)), // Today
                    lt: new Date(new Date().setHours(23, 59, 59, 999)),
                },
            },
        });

        const upcomingAppointments = await prisma.appointment.count({
            where: {
                doctorId: parseInt(doctorId),
                appointmentDate: {
                    gt: new Date(), // Future appointments
                },
            },
        });

        const totalConsultations = doctor.appointments.length;
        const totalPrescriptions = 0; // Add logic to count prescriptions if available

        // Fetch list of patients
        const patients = await prisma.patient.findMany({
            where: {
                appointments: {
                    some: {
                        doctorId: parseInt(doctorId),
                    },
                },
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                createdAt: true,
            },
        });

        return NextResponse.json(
            {
                totalPatients,
                newPatients,
                todaysAppointments,
                upcomingAppointments,
                totalConsultations,
                totalPrescriptions,
                patients, // Include the list of patients
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching doctor data:", error);
        return NextResponse.json(
            { error: "An error occurred. Please try again." },
            { status: 500 }
        );
    }
}