import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const approvedDoctors = await prisma.doctor.findMany({
            where: { status: "approved" }, // Filter doctors with status "approved"
        });
        return NextResponse.json(approvedDoctors, { status: 200 });
    } catch (error) {
        console.error("Error fetching approved doctors:", error);
        return NextResponse.json(
            { error: "Failed to fetch approved doctors" },
            { status: 500 }
        );
    }
}