import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

type RouteParams = {
    params: Promise<{ id: string }>;
};

// GET - ดึงข้อมูล Activity ตาม ID
export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM activities WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Activity not found' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error('Error fetching activity:', error);
        return NextResponse.json({ error: 'Failed to fetch activity' }, { status: 500 });
    }
}

// PUT - อัพเดท Activity
export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { url, platform, description, thumbnail_url, display_order, is_active } = body;

        await pool.query<ResultSetHeader>(
            `UPDATE activities SET 
                url = ?, 
                platform = ?, 
                description = ?, 
                thumbnail_url = ?,
                display_order = ?, 
                is_active = ?
             WHERE id = ?`,
            [url, platform || 'tiktok', description || '', thumbnail_url || '', display_order || 0, is_active ?? 1, id]
        );

        return NextResponse.json({
            success: true,
            message: 'Activity updated successfully'
        });
    } catch (error) {
        console.error('Error updating activity:', error);
        return NextResponse.json({ error: 'Failed to update activity' }, { status: 500 });
    }
}

// DELETE - ลบ Activity
export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;
        await pool.query<ResultSetHeader>(
            'DELETE FROM activities WHERE id = ?',
            [id]
        );

        return NextResponse.json({
            success: true,
            message: 'Activity deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting activity:', error);
        return NextResponse.json({ error: 'Failed to delete activity' }, { status: 500 });
    }
}
