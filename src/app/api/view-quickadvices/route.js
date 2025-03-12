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

        // Fetch quick advice requests for the patient
        const quickAdvice = await prisma.quickAdvice.findMany({
            where: { patientId: patientIDInt },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(quickAdvice, { status: 200 });
    } catch (error) {
        console.error("Error fetching quick advice:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch quick advice" },
            { status: 500 }
        );
    }
}