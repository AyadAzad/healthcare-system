// app/api/admin/add-doctor/route.js
import db from '@/database/db';
import bcrypt from 'bcrypt';

export async function POST(request) {
    const { username, password, name, specialty } = await request.json();

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    return new Promise((resolve, reject) => {
        db.run(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            [username, hashedPassword, 'doctor'],
            function (err) {
                if (err) {
                    resolve(new Response(JSON.stringify({ error: 'Username already exists' }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json' },
                    }));
                } else {
                    const userId = this.lastID;
                    db.run(
                        'INSERT INTO doctors (user_id, name, specialty) VALUES (?, ?, ?)',
                        [userId, name, specialty],
                        function (err) {
                            if (err) {
                                resolve(new Response(JSON.stringify({ error: 'Failed to add doctor' }), {
                                    status: 500,
                                    headers: { 'Content-Type': 'application/json' },
                                }));
                            } else {
                                resolve(new Response(JSON.stringify({ message: 'Doctor added successfully' }), {
                                    status: 201,
                                    headers: { 'Content-Type': 'application/json' },
                                }));
                            }
                        }
                    );
                }
            }
        );
    });
}