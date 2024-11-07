const path = require('path');
const mysql = require('mysql2/promise');
const db_config = require(path.resolve("db", "db.config.js"));

const pool = mysql.createPool(db_config);

const connect_db = async () => {
    
    try {
        
        const conn = await pool.getConnection();
        console.log(`> [INFO] Database connected successfully`);
        conn.release();
        
        return pool;

    } catch (e) {
        console.error(`> [ERROR] Failed to connect database cause:`, e.sqlMessage || e.code || e.message);
        process.exit(1);
    }
};

module.exports = {
    pool,
    connect_db
}