import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const key = new TextEncoder().encode(JWT_SECRET);

async function isAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');
    if (!token) return false;
    try {
        await jwtVerify(token.value, key);
        return true;
    } catch {
        return false;
    }
}

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM settings');
        // Convert to object { key: value }
        const settings = (rows as any[]).reduce((acc, row) => {
            acc[row.key_name] = row.value;
            return acc;
        }, {});
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

// Update multiple settings at once
export async function PUT(request: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json(); // Expecting { key: value, key2: value2 }

        // Loop through keys and upsert
        const queries = Object.keys(body).map(key => {
            return pool.query(
                'INSERT INTO settings (key_name, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?',
                [key, body[key], body[key]]
            );
        });

        await Promise.all(queries);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}
