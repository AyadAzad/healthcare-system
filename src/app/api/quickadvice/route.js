// app/api/quickAdvice/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(request) {
    try {
        const { patient_id, question } = await request.json();
        const patientIdInt = parseInt(patient_id, 10)

        // Create a new quick advice request
        const quickAdvice = await prisma.quickAdvice.create({
            data: {
                patientId: patientIdInt,
                question: question,
            },
        });

        return NextResponse.json(quickAdvice, { status: 201 });
    } catch (error) {
        console.error("Error requesting quick advice:", error);
        return NextResponse.json(
            { error: "Failed to request quick advice" },
            { status: 500 }
        );
    }
}