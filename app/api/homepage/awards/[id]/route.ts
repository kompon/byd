import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { ResultSetHeader } from "mysql2";

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        const { title, description, year, icon, image_url, display_order, is_active } = body;

        await pool.query<ResultSetHeader>(
            "UPDATE homepage_awards SET title = ?, description = ?, year = ?, icon = ?, image_url = ?, display_order = ?, is_active = ? WHERE id = ?",
            [title, description, year, icon, image_url, display_order, is_active, params.id]
        );

        return NextResponse.json({ message: "Award updated successfully" });
    } catch (error) {
        console.error("Error updating award:", error);
        return NextResponse.json({ error: "Failed to update award" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await pool.query<ResultSetHeader>(
            "DELETE FROM homepage_awards WHERE id = ?",
            [params.id]
        );

        return NextResponse.json({ message: "Award deleted successfully" });
    } catch (error) {
        console.error("Error deleting award:", error);
        return NextResponse.json({ error: "Failed to delete award" }, { status: 500 });
    }
}
