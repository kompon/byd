const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function forceSetup() {
    console.log("🚀 STARTING FORCE SETUP...");

    // 1. Connect
    const config = {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        multipleStatements: true // Enable multiple statements for the SQL file
    };

    let connection;
    try {
        console.log("🔌 Connecting to MySQL at 127.0.0.1...");
        connection = await mysql.createConnection(config);
        console.log("✅ Connected!");
    } catch (e) {
        console.error("❌ Connection Failed:", e.message);
        return;
    }

    // 2. List DBs
    try {
        const [rows] = await connection.query("SHOW DATABASES");
        console.log("📂 Existing Databases:", rows.map(r => r.Database));
    } catch (e) {
        console.error("Warning: Could not list databases.");
    }

    // 3. Create DB
    try {
        console.log("🛠 Creating database 'car_showroom'...");
        await connection.query("CREATE DATABASE IF NOT EXISTS car_showroom");
        console.log("✅ Database created (or already exists).");
        await connection.changeUser({ database: 'car_showroom' });
        console.log("👉 Switched to 'car_showroom'.");
    } catch (e) {
        console.error("❌ Failed to create/switch DB:", e.message);
        return;
    }

    // 4. Run SQL
    try {
        const sqlPath = path.join(__dirname, '..', 'database', 'setup.sql');
        console.log("📖 Reading SQL from:", sqlPath);
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');

        console.log("🚀 Executing SQL setup...");
        await connection.query(sqlContent);
        console.log("✅ SQL Executed Successfully!");
    } catch (e) {
        console.error("❌ SQL Execution Failed:", e.message);
    }

    // 5. Verify Tables
    try {
        const [rows] = await connection.query("SHOW TABLES");
        const tables = rows.map(r => Object.values(r)[0]);
        console.log("📊 Tables in 'car_showroom':", tables);

        if (tables.includes('admins') && tables.includes('car_models')) {
            console.log("🎉 SUCCESS! Tables are present.");
        } else {
            console.error("⚠️ Tables are missing!");
        }
    } catch (e) {
        console.error("Error verifying tables:", e.message);
    }

    await connection.end();
}

forceSetup();
