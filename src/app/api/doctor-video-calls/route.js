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

        // Fetch video calls for the doctor
        const videoCalls = await prisma.videoCall.findMany({
            where: { doctorId: parseInt(doctorId) },
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
            orderBy: { callDate: "asc" }, // Sort by date
        });

        return NextResponse.json(videoCalls, { status: 200 });
    } catch (error) {
        console.error("Error fetching video calls:", error);
        return NextResponse.json(
            { error: "Failed to fetch video calls" },
            { status: 500 }
        );
    }
}