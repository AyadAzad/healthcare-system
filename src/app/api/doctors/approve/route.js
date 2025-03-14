import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const { id } = await request.json();
        const doctor = await prisma.doctor.update({
            where: { id },
            data: { status: "approved" },
        });
        return NextResponse.json(doctor, { status: 200 });
    } catch (error) {
        console.error("Error approving doctor:", error);
        return NextResponse.json({ error: "Failed to approve doctor" }, { status: 500 });
    }
}