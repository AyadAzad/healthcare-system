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

        // Fetch quick advice for the doctor
        const quickAdvice = await prisma.quickAdvice.findMany({
            include: {
                patient: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" }, // Sort by date
        });

        return NextResponse.json(quickAdvice, { status: 200 });
    } catch (error) {
        console.error("Error fetching quick advice:", error);
        return NextResponse.json(
            { error: "Failed to fetch quick advice" },
            { status: 500 }
        );
    }
}