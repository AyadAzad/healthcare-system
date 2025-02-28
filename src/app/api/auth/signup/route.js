// app/api/auth/signup/route.js
import db from '/database/db';

export async function POST(request) {
    const { first_name, last_name, email, password, phone, city } = await request.json();

    try {
        await db.run(
            'INSERT INTO patients (first_name, last_name, email, password, phone, city) VALUES (?, ?, ?, ?, ?, ?)',
            [first_name, last_name, email, password, phone, city]
        );

        return new Response(JSON.stringify({ message: 'User created successfully' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT' && error.message.includes('UNIQUE')) {
            return new Response(JSON.stringify({ error: 'Email already exists' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ error: 'Failed to create user' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }
}