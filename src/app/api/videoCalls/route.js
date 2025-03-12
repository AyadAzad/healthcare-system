// app/api/videoCalls/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { patient_id, doctor_id, call_date, call_time } = await request.json();

        // Create a new video call
        const videoCall = await prisma.videoCall.create({
            data: {
                patientId: patient_id,
                doctorId: doctor_id,
                callDate: new Date(call_date),
                callTime: call_time,
            },
        });

        return NextResponse.json(videoCall, { status: 201 });
    } catch (error) {
        console.error("Error scheduling video call:", error);
        return NextResponse.json(
            { error: "Failed to schedule video call" },
            { status: 500 }
        );
    }
}