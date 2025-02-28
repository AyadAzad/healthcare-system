import db from '/database/db';
import { NextResponse } from 'next/server';

// Fetch all doctors
export async function GET() {
    return new Promise((resolve, reject) => {
        const query = `
      SELECT id, first_name, last_name, specialty, phone, address, experience, available_time, fee
      FROM doctors
    `;

        db.all(query, [], (err, rows) => {
            if (err) {
                resolve(NextResponse.json({ error: err.message }, { status: 500 }));
            } else {
                resolve(NextResponse.json(rows, { status: 200 }));
            }
        });
    });
}