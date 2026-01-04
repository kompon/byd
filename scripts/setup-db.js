const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
    console.log("Starting Database Setup...");

    // 1. Connect to MySQL server (no specific DB)
    const config = {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
    };

    console.log("Connecting with config (password hidden):", { ...config, password: '***' });

    let connection;
    try {
        connection = await mysql.createConnection(config);
        console.log("Connected to MySQL server.");
    } catch (error) {
        console.error("FAILED to connect to MySQL server:", error.message);
        console.log("Please check your XAMPP/MySQL is running and the password is correct (default is empty).");
        process.exit(1);
    }

    // 2. Create Database
    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS car_showroom`);
        console.log("Database 'car_showroom' created/verified.");

        await connection.changeUser({ database: 'car_showroom' });
        console.log("Switched to 'car_showroom'.");
    } catch (error) {
        console.error("Error preventing DB creation:", error.message);
        process.exit(1);
    }

    // 3. Run Setup SQL
    try {
        const sqlPath = path.join(__dirname, '..', 'database', 'setup.sql');
        console.log("Reading SQL from:", sqlPath);
        const sqlContent = fs.readFileSync(sqlPath, 'utf8');

        // Remove comments and split by semicolon
        // Simple manual split might be fragile but works for simple dumps
        const statements = sqlContent
            .split(';')
            .map(s => s.trim())
            .filter(s => s.length > 0);

        for (const statement of statements) {
            // Skip comments if strictly needed, or just run. 
            // Most simple statements run fine.
            try {
                await connection.query(statement);
            } catch (err) {
                // Ignore "Table already exists" errors or similar
                if (err.code !== 'ER_TABLE_EXISTS_ERROR') {
                    console.log(`Warning running statement: ${statement.substring(0, 50)}... -> ${err.message}`);
                }
            }
        }
        console.log("Schema imported successfully.");

    } catch (error) {
        console.error("Error reading/running setup.sql:", error.message);
    }

    await connection.end();
    console.log("Setup Complete.");
}

setupDatabase();
