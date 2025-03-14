import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const doctors = await prisma.doctor.findMany({
            where: { status: "pending" },
        });
        return NextResponse.json(doctors, { status: 200 });
    } catch (error) {
        console.error("Error fetching pending doctors:", error);
        return NextResponse.json({ error: "Failed to fetch pending doctors" }, { status: 500 });
    }
}