// app/api/videoCalls/route.js
import db from '/database/db';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { patient_id, doctor_id, call_date, call_time } = await request.json();

    return new Promise((resolve, reject) => {
        const query = `
      INSERT INTO video_calls (patient_id, doctor_id, call_date, call_time)
      VALUES (?, ?, ?, ?)
    `;

        db.run(query, [patient_id, doctor_id, call_date, call_time], function (err) {
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
      SELECT v.id, d.name AS doctor_name, v.call_date, v.call_time, v.status
      FROM video_calls v
      JOIN doctors d ON v.doctor_id = d.id
      WHERE v.patient_id = ?
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