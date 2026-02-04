import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        // Hash for '123456'
        const passwordHash = '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

        // 1. Clear table
        await pool.query('TRUNCATE TABLE admins');

        // 2. Insert fresh admin
        await pool.query(
            'INSERT INTO admins (username, password_hash, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
            ['admin', passwordHash]
        );

        return NextResponse.json({
            success: true,
            message: 'Admin reset successful!',
            credentials: {
                username: 'admin',
                password: '123456'
            }
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
