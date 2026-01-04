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
        const [cars] = await pool.query('SELECT * FROM car_models ORDER BY created_at DESC');
        const [variants] = await pool.query('SELECT * FROM car_variants');

        const carsWithVariants = (cars as any[]).map(car => ({
            ...car,
            variants: (variants as any[]).filter(v => v.car_model_id === car.id)
        }));

        return NextResponse.json(carsWithVariants);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, slug, description, base_price, status, main_image_url, variants } = body;

        const [result] = await pool.query(
            'INSERT INTO car_models (name, slug, description, base_price, status, main_image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [name, slug, description, base_price, status || 'active', main_image_url]
        );

        const carId = (result as any).insertId;

        // Insert variants if any
        if (variants && Array.isArray(variants) && variants.length > 0) {
            const variantValues = variants.map((v: any) => [carId, v.name, v.price]);
            await pool.query(
                'INSERT INTO car_variants (car_model_id, name, price) VALUES ?',
                [variantValues]
            );
        }

        return NextResponse.json({ success: true, id: carId });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create car model' }, { status: 500 });
    }
}
