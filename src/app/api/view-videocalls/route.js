import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const patientId = searchParams.get("patientId");

        if (!patientId) {
            return NextResponse.json(
                { error: "Patient ID is required" },
                { status: 400 }
            );
        }

        const patientIDInt = parseInt(patientId);
        if (isNaN(patientIDInt)) {
            return NextResponse.json(
                { error: "Invalid Patient ID" },
                { status: 400 }
            );
        }

        // Fetch video calls for the patient
        const videoCalls = await prisma.videoCall.findMany({
            where: { patientId: patientIDInt },
            orderBy: { callDate: "desc" }, // Sort by date in descending order
            include: {
                doctor: {
                    select: {
                        firstName: true,
                        lastName: true,
                        specialty: true,
                    },
                },
            },
        });

        return NextResponse.json(videoCalls, { status: 200 });
    } catch (error) {
        console.error("Error fetching video calls:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch video calls" },
            { status: 500 }
        );
    }
}