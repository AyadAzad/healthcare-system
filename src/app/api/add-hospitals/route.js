import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    try {
        const data = await request.json();
        const hospital = await prisma.hospital.create({ data });
        return NextResponse.json(hospital, { status: 201 });
    } catch (error) {
        console.error("Error creating hospital:", error);
        return NextResponse.json({ error: "Failed to create hospital" }, { status: 500 });
    }
}