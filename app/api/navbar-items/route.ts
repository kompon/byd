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
        const [rows] = await pool.query('SELECT * FROM navbar_items ORDER BY sort_order ASC');
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { label, href, sort_order, is_visible } = body;

        const [result] = await pool.query(
            'INSERT INTO navbar_items (label, href, sort_order, is_visible) VALUES (?, ?, ?, ?)',
            [label, href, sort_order || 0, is_visible ?? 1]
        );

        return NextResponse.json({ success: true, id: (result as any).insertId });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create navbar item' }, { status: 500 });
    }
}
