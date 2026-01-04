import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// GET all awards
export async function GET() {
    try {
        const [rows] = await pool.query<RowDataPacket[]>(
            "SELECT * FROM homepage_awards WHERE is_active = 1 ORDER BY display_order ASC"
        );
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Error fetching awards:", error);
        return NextResponse.json({ error: "Failed to fetch awards" }, { status: 500 });
    }
}

// POST new award
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, description, year, icon, image_url, display_order } = body;

        const [result] = await pool.query<ResultSetHeader>(
            `INSERT INTO homepage_awards (title, description, year, icon, image_url, display_order) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [title, description, year, icon || 'Trophy', image_url, display_order || 0]
        );

        return NextResponse.json({ id: result.insertId, message: "Award created successfully" });
    } catch (error) {
        console.error("Error creating award:", error);
        return NextResponse.json({ error: "Failed to create award" }, { status: 500 });
    }
}
