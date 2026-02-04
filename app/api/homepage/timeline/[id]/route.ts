import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

type RouteParams = {
    params: Promise<{ id: string }>;
};

// GET - ดึงข้อมูล Milestone ตาม ID
export async function GET(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;
        const [rows] = await pool.query<RowDataPacket[]>(
            'SELECT * FROM milestones WHERE id = ?',
            [id]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Milestone not found' }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error('Error fetching milestone:', error);
        return NextResponse.json({ error: 'Failed to fetch milestone' }, { status: 500 });
    }
}

// PUT - อัพเดท Milestone
export async function PUT(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { year, title, description, image_url, display_order, is_active } = body;

        await pool.query<ResultSetHeader>(
            `UPDATE milestones SET 
                year = ?, 
                title = ?, 
                description = ?, 
                image_url = ?, 
                display_order = ?, 
                is_active = ?
             WHERE id = ?`,
            [year, title, description || '', image_url || '', display_order || 0, is_active ?? 1, id]
        );

        return NextResponse.json({
            success: true,
            message: 'Milestone updated successfully'
        });
    } catch (error) {
        console.error('Error updating milestone:', error);
        return NextResponse.json({ error: 'Failed to update milestone' }, { status: 500 });
    }
}

// DELETE - ลบ Milestone
export async function DELETE(request: Request, { params }: RouteParams) {
    try {
        const { id } = await params;
        await pool.query<ResultSetHeader>(
            'DELETE FROM milestones WHERE id = ?',
            [id]
        );

        return NextResponse.json({
            success: true,
            message: 'Milestone deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting milestone:', error);
        return NextResponse.json({ error: 'Failed to delete milestone' }, { status: 500 });
    }
}
