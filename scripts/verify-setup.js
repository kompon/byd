const mysql = require('mysql2/promise');

async function verifySetup() {
    console.log("--- Verifying Environment ---");

    // 1. Check Dependencies
    try {
        require('jose');
        console.log("✅ Dependency 'jose' is installed.");
    } catch (e) {
        console.error("❌ Dependency 'jose' is MISSING. Run: npm install jose");
    }

    try {
        require('bcryptjs');
        console.log("✅ Dependency 'bcryptjs' is installed.");
    } catch (e) {
        console.error("❌ Dependency 'bcryptjs' is MISSING. Run: npm install bcryptjs");
    }

    // 2. Check Database Tables
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || '127.0.0.1',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
        });

        console.log("✅ Database connection established.");

        // Create DB if not exists
        await connection.query(`CREATE DATABASE IF NOT EXISTS car_showroom`);
        await connection.changeUser({ database: 'car_showroom' });


        const [rows] = await connection.query("SHOW TABLES");
        const tables = rows.map(r => Object.values(r)[0]);
        console.log("Found Tables:", tables);

        const requiredTables = ['car_models', 'promotions', 'admins', 'settings', 'navbar_items'];
        const missing = requiredTables.filter(t => !tables.includes(t));

        if (missing.length > 0) {
            console.error("❌ Missing tables:", missing);
            console.log("   -> Run: node scripts/setup-db.js");
        } else {
            console.log("✅ All critical tables exist.");
        }

        await connection.end();

    } catch (e) {
        console.error("❌ Database Error:", e.message);
    }
}

verifySetup();
