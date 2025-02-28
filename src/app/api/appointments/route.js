import db from '/database/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { patient_id, doctor_id, appointment_date, appointment_time } = await request.json();

    return new Promise((resolve, reject) => {
        const query = `
      INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time)
      VALUES (?, ?, ?, ?)
    `;

        db.run(query, [patient_id, doctor_id, appointment_date, appointment_time], function (err) {
            if (err) {
                resolve(NextResponse.json({ error: err.message }, { status: 500 }));
            } else {
                resolve(NextResponse.json({ id: this.lastID }, { status: 201 }));
            }
        });
    });
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const patient_id = searchParams.get('patient_id');

    return new Promise((resolve, reject) => {
        const query = `
      SELECT a.id, d.username AS doctor_name, a.appointment_date, a.appointment_time, a.status
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.patient_id = ?
    `;

        db.all(query, [patient_id], (err, rows) => {
            if (err) {
                resolve(NextResponse.json({ error: err.message }, { status: 500 }));
            } else {
                resolve(NextResponse.json(rows, { status: 200 }));
            }
        });
    });
}