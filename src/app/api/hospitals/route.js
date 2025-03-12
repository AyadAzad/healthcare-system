// app/api/hospitals/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        // Fetch hospitals with their associated doctors
        const hospitals = await prisma.hospital.findMany({
            include: {
                doctors: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        specialty: true,
                        phone: true,
                        experience: true,
                    },
                },
            },
        });

        // Transform the data to match the desired structure
        const groupedHospitals = hospitals.map((hospital) => ({
            id: hospital.id,
            name: hospital.name,
            city: hospital.city,
            services: hospital.services,
            address: hospital.address,
            doctors: hospital.doctors.map((doctor) => ({
                id: doctor.id,
                name: `${doctor.firstName} ${doctor.lastName}`,
                specialty: doctor.specialty,
                phone: doctor.phone,
                experience: doctor.experience,
            })),
        }));

        console.log("Grouped hospitals:", groupedHospitals); // Log the final grouped data
        return NextResponse.json(groupedHospitals);
    } catch (error) {
        console.error("Error in GET /api/hospitals:", error.message); // Log the error
        return NextResponse.json({ error: "Failed to fetch hospitals" }, { status: 500 });
    }
}