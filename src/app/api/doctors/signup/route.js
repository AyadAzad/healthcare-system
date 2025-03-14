import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const data = await request.json();
        const doctor = await prisma.doctor.create({
            data: {
                ...data,
                status: "pending", // Set status to "pending" by default
            },
        });
        return NextResponse.json(doctor, { status: 201 });
    } catch (error) {
        console.error("Error creating doctor:", error);
        return NextResponse.json({ error: "Failed to create doctor" }, { status: 500 });
    }
}