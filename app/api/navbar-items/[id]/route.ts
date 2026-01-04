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

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const [rows] = await pool.query('SELECT * FROM navbar_items WHERE id = ?', [id]);
        const data = rows as any[];

        if (data.length === 0) {
            return NextResponse.json({ error: 'Item not found' }, { status: 404 });
        }

        return NextResponse.json(data[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await request.json();
        const { label, href, sort_order, is_visible } = body;

        await pool.query(
            'UPDATE navbar_items SET label=?, href=?, sort_order=?, is_visible=? WHERE id=?',
            [label, href, sort_order, is_visible, id]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        await pool.query('DELETE FROM navbar_items WHERE id = ?', [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
