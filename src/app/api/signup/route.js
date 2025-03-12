// app/api/signup/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    const { firstName, lastName, email, password, phone, city } = await request.json();

    try {
        const patient = await prisma.patient.create({
            data: { firstName, lastName, email, password, phone, city },
        });
        return NextResponse.json(patient, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Signup failed" }, { status: 400 });
    }
}