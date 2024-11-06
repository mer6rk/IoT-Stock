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
        return console.error(`> [ERROR] Failed to connect database cause:`, e.message);
    }
};

module.exports = {
    pool,
    connect_db
}