import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// GET - ดึงข้อมูล Activities ทั้งหมด
export async function GET() {
    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM activities WHERE is_active = 1 ORDER BY display_order ASC, created_at DESC'
        );
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching activities:', error);
        return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
    }
}

// POST - สร้าง Activity ใหม่
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { url, platform, description, thumbnail_url, display_order, is_active } = body;

        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO activities (url, platform, description, thumbnail_url, display_order, is_active) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [url, platform || 'tiktok', description || '', thumbnail_url || '', display_order || 0, is_active ?? 1]
        );

        return NextResponse.json({
            success: true,
            id: result.insertId,
            message: 'Activity created successfully'
        });
    } catch (error) {
        console.error('Error creating activity:', error);
        return NextResponse.json({ error: 'Failed to create activity' }, { status: 500 });
    }
}
