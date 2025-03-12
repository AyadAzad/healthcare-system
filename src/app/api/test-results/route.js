// app/api/test-results/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const patientId = searchParams.get("patientId");

        if (!patientId) {
            throw new Error("Patient ID is required");
        }
        const patientIDInt = parseInt(patientId);
        // Fetch test results for the patient
        const testResults = await prisma.testResult.findMany({
        });

        return NextResponse.json(testResults, { status: 200 });
    } catch (error) {
        console.error("Error fetching test results:", error);
        return NextResponse.json(
            { error: error.message || "Failed to fetch test results" },
            { status: 500 }
        );
    }
}