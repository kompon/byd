import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

type Milestone = {
    id: number;
    year: string;
    title: string;
    description: string;
    image_url: string;
    display_order: number;
    is_active: number;
    created_at: string;
    updated_at: string;
};

// GET - ดึงข้อมูล Milestones ทั้งหมด
export async function GET() {
    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM milestones WHERE is_active = 1 ORDER BY display_order ASC, year ASC'
        );
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Error fetching milestones:', error);
        return NextResponse.json({ error: 'Failed to fetch milestones' }, { status: 500 });
    }
}

// POST - สร้าง Milestone ใหม่
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { year, title, description, image_url, display_order, is_active } = body;

        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO milestones (year, title, description, image_url, display_order, is_active) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [year, title, description || '', image_url || '', display_order || 0, is_active ?? 1]
        );

        return NextResponse.json({
            success: true,
            id: result.insertId,
            message: 'Milestone created successfully'
        });
    } catch (error) {
        console.error('Error creating milestone:', error);
        return NextResponse.json({ error: 'Failed to create milestone' }, { status: 500 });
    }
}
