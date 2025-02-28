import db from '/database/db';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const hospitals = await new Promise((resolve, reject) => {
            db.all(`
                SELECT h.id AS hospital_id, h.name AS hospital_name, h.city, h.services, h.address,
                d.id AS doctor_id, d.first_name || ' ' || d.last_name AS doctor_name, d.specialty, d.phone, d.experience
                FROM hospitals h
                LEFT JOIN doctors d ON h.id = d.hospital_id
            `, (err, rows) => {
                if (err) {
                    console.error('Database error:', err.message); // Log the database error
                    reject(err);
                } else {
                    console.log('Database rows:', rows); // Log the rows returned by the query
                    resolve(rows);
                }
            });
        });

        // Group doctors by hospital
        const groupedHospitals = hospitals.reduce((acc, row) => {
            const hospital = {
                id: row.hospital_id,
                name: row.hospital_name,
                city: row.city,
                services: row.services,
                address: row.address,
                doctors: [],
            };

            if (!acc[row.hospital_id]) {
                acc[row.hospital_id] = hospital;
            }

            if (row.doctor_id) {
                acc[row.hospital_id].doctors.push({
                    id: row.doctor_id,
                    name: row.doctor_name,
                    specialty: row.specialty,
                    phone: row.phone,
                    experience: row.experience,
                });
            }

            return acc;
        }, {});

        console.log('Grouped hospitals:', Object.values(groupedHospitals)); // Log the final grouped data
        return NextResponse.json(Object.values(groupedHospitals));
    } catch (error) {
        console.error('Error in GET /api/hospitals:', error.message); // Log the error
        return NextResponse.json({ error: 'Failed to fetch hospitals' }, { status: 500 });
    }
}