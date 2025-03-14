import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        console.log("Login attempt:", { email, password }); // Debugging

        // Check if the user is a patient
        const patient = await prisma.patient.findUnique({ where: { email } });
        if (patient && patient.password === password) {
            console.log("Patient login successful"); // Debugging
            return NextResponse.json(
                { role: "patient", firstName: patient.firstName, id: patient.id },
                { status: 200 }
            );
        }

        // Check if the user is a doctor
        const doctor = await prisma.doctor.findUnique({ where: { email } });
        if (doctor) {
            if (doctor.password === password) {
                if (doctor.status === "rejected") {
                    console.log("Doctor account rejected"); // Debugging
                    return NextResponse.json(
                        { error: "Your account has been rejected. Please contact support." },
                        { status: 403 }
                    );
                } else if (doctor.status === "pending") {
                    console.log("Doctor account pending approval"); // Debugging
                    return NextResponse.json(
                        { error: "Your account is pending approval. Please wait for admin approval." },
                        { status: 403 }
                    );
                } else if (doctor.status === "approved") {
                    console.log("Doctor login successful"); // Debugging
                    return NextResponse.json(
                        { role: "doctor", firstName: doctor.firstName, id: doctor.id },
                        { status: 200 }
                    );
                }
            } else {
                console.log("Invalid doctor password"); // Debugging
                return NextResponse.json(
                    { error: "Invalid email or password" },
                    { status: 401 }
                );
            }
        }

        // Check if the user is the admin
        if (email === "admin@admin.com" && password === "admin") {
            console.log("Admin login successful"); // Debugging
            return NextResponse.json(
                { role: "admin" },
                { status: 200 }
            );
        }

        // If no match is found
        console.log("Invalid credentials"); // Debugging
        return NextResponse.json(
            { error: "Invalid email or password" },
            { status: 401 }
        );
    } catch (error) {
        console.error("Error during login:", error); // Debugging
        return NextResponse.json(
            { error: "An error occurred. Please try again." },
            { status: 500 }
        );
    }
}