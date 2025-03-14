import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"; // Replace with a secure secret key

export async function POST(request) {
    try {
        const { email, password } = await request.json();
        console.log("Login attempt:", { email, password }); // Debugging

        // Check if the user is a patient
        const patient = await prisma.patient.findUnique({ where: { email } });
        if (patient && patient.password === password) {
            console.log("Patient login successful"); // Debugging
            const token = jwt.sign(
                { id: patient.id, role: "patient", firstName: patient.firstName },
                JWT_SECRET,
                { expiresIn: "1h" } // Token expires in 1 hour
            );
            return NextResponse.json(
                { role: "patient", firstName: patient.firstName, id: patient.id, token },
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
                    const token = jwt.sign(
                        { id: doctor.id, role: "doctor", firstName: doctor.firstName },
                        JWT_SECRET,
                        { expiresIn: "1h" } // Token expires in 1 hour
                    );
                    return NextResponse.json(
                        { role: "doctor", firstName: doctor.firstName, id: doctor.id, token },
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