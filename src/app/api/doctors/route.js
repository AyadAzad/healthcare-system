// app/api/doctors/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch all doctors
export async function GET() {
    try {
        // Fetch all doctors from the database using Prisma
        const doctors = await prisma.doctor.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                specialty: true,
                phone: true,
                address: true,
                experience: true,
                availableTime: true,
                fee: true,
            },
        });

        // Return the doctors as a JSON response
        return NextResponse.json(doctors, { status: 200 });
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return NextResponse.json(
            { error: "An error occurred while fetching doctors" },
            { status: 500 }
        );
    }
}