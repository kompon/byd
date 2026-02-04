const mysql = require('mysql2/promise');

async function checkSettings() {
    const connection = await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: process.env.DB_PASSWORD || '', // Using default from .env.example if not set, likely empty or 'prideauto2024' or '123456' based on history.
        // Wait, I should use the one from docker-compose or .env. 
        // The user reset it to '123456' for admin login, but DB_PASSWORD env for the app connection is usually in .env file.
        // Let's try 'prideauto2024' (from docker-compose default) first, then empty.
        password: 'prideauto2024',
        database: 'car_showroom'
    });

    try {
        const [rows] = await connection.execute("SELECT value FROM settings WHERE key_name = 'site_logo_url'");
        console.log('Current Logo URL:', rows[0]?.value);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await connection.end();
    }
}

checkSettings();
