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

async function getSettingsMap() {
    const [rows] = await pool.query('SELECT * FROM settings');
    return (rows as any[]).reduce((acc, row) => {
        acc[row.key_name] = row.value;
        return acc;
    }, {});
}

export async function GET() {
    try {
        const settings = await getSettingsMap();

        // Map DB keys to Frontend keys
        const responseData = {
            is_active: parseInt(settings['popup_is_active'] || '0'),
            image_url: settings['popup_image_url'] || '',
            link_url: settings['popup_link_url'] || '',
            show_once_per_session: parseInt(settings['popup_show_once_per_session'] || '1')
        };

        return NextResponse.json(responseData);
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!(await isAuthenticated())) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();

        // Map Frontend keys to DB keys
        const dbMap: Record<string, any> = {
            'popup_is_active': body.is_active,
            'popup_image_url': body.image_url,
            'popup_link_url': body.link_url,
            'popup_show_once_per_session': body.show_once_per_session
        };

        const queries = Object.keys(dbMap).map(key => {
            return pool.query(
                'INSERT INTO settings (key_name, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = ?',
                [key, dbMap[key], dbMap[key]]
            );
        });

        await Promise.all(queries);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }
}
