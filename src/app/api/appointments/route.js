// app/api/appointments/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const formData = await request.formData();
        const patient_id = formData.get("patient_id");
        const doctor_id = formData.get("doctor_id");
        const appointment_date = formData.get("appointment_date");
        const appointment_time = formData.get("appointment_time");
        const note = formData.get("note");
        const image = formData.get("image");

        const patientId = parseInt(patient_id, 10);
        const doctorId = parseInt(doctor_id, 10);

        // Validate that the IDs are valid integers
        if (isNaN(patientId)) {
            throw new Error("Invalid patient ID");
        }
        if (isNaN(doctorId)) {
            throw new Error("Invalid doctor ID");
        }

        let imageUrl = null;
        if (image) {
            const uploadDir = path.join(process.cwd(), "public/uploads");
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            const filePath = path.join(uploadDir, image.name);
            const buffer = await image.arrayBuffer();
            fs.writeFileSync(filePath, Buffer.from(buffer));
            imageUrl = `/uploads/${image.name}`;
        }

        // Create a new appointment
        const appointment = await prisma.appointment.create({
            data: {
                patientId: patientId,
                doctorId: doctorId,
                appointmentDate: new Date(appointment_date),
                appointmentTime: appointment_time,
                note: note,
                imageUrl: imageUrl,
            },
        });

        return NextResponse.json(appointment, { status: 201 });
    } catch (error) {
        console.error("Error creating appointment:", error);
        return NextResponse.json(
            { error: "Failed to book appointment" },
            { status: 500 }
        );
    }
}