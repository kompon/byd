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

// GET One
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const [rows] = await pool.query('SELECT * FROM car_models WHERE id = ?', [id]);
        const cars = rows as any[];

        if (cars.length === 0) {
            return NextResponse.json({ error: 'Car not found' }, { status: 404 });
        }

        return NextResponse.json(cars[0]);
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

// UPDATE
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        const body = await request.json();
        const { name, slug, description, base_price, status, main_image_url } = body;

        await pool.query(
            'UPDATE car_models SET name=?, slug=?, description=?, base_price=?, status=?, main_image_url=? WHERE id=?',
            [name, slug, description, base_price, status, main_image_url, id]
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}

// DELETE
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await params;
        await pool.query('DELETE FROM car_models WHERE id = ?', [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
