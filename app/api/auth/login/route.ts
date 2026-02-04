import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const key = new TextEncoder().encode(JWT_SECRET);

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
        }

        console.log('Login attempt for:', username);

        const [rows] = await pool.query('SELECT * FROM admins WHERE username = ?', [username]);
        const admins = rows as any[];

        console.log('DB Search Result:', admins.length > 0 ? 'Found' : 'Not Found');

        if (admins.length === 0) {
            console.log('Login failed: User not found');
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const admin = admins[0];
        const isValid = await bcrypt.compare(password, admin.password_hash);

        console.log('Password Check:', isValid ? 'Pass' : 'Fail');

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Create JWT
        const token = await new SignJWT({ id: admin.id, username: admin.username })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(key);

        const response = NextResponse.json({ success: true, username: admin.username });

        // Set HttpOnly Cookie
        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: false, // Allow HTTP for Port 81 access
            sameSite: 'strict',
            maxAge: 60 * 60 * 24, // 1 day
            path: '/',
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
