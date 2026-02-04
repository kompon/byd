import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        // Try to get a connection from the pool
        const connection = await pool.getConnection();

        // Ping to ensure it's alive
        await connection.ping();

        // Release connection back to pool
        connection.release();

        return NextResponse.json({
            success: true,
            message: "Database connection successful! 🎉",
            config: {
                host: process.env.DB_HOST || '127.0.0.1 (default)',
                user: process.env.DB_USER || 'root (default)',
                database: process.env.DB_NAME || 'car_showroom (default)'
            }
        });
    } catch (error: any) {
        console.error("DB Connection Test Failed:", error);
        return NextResponse.json({
            success: false,
            error: error.message,
            code: error.code, // e.g., 'ER_ACCESS_DENIED_ERROR' or 'ER_BAD_DB_ERROR'
            suggestion: error.code === 'ER_ACCESS_DENIED_ERROR'
                ? "Check your DB_PASSWORD in .env.local"
                : error.code === 'ER_BAD_DB_ERROR'
                    ? "Database 'car_showroom' does not exist. Run the setup script."
                    : "Check if MySQL is running."
        }, { status: 500 });
    }
}
