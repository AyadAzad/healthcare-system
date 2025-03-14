import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { id } = await request.json();
        const doctor = await prisma.doctor.update({
            where: { id },
            data: { status: "rejected" },
        });
        return NextResponse.json(doctor, { status: 200 });
    } catch (error) {
        console.error("Error rejecting doctor:", error);
        return NextResponse.json({ error: "Failed to reject doctor" }, { status: 500 });
    }
}