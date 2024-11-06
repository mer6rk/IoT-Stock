require('dotenv').config();

const db_env = {
    
    development: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '12345678',
        database: process.env.DB_NAME || 'iot_stock'
    },

    production: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }

};

const node_env = process.env.NODE_ENV || 'development';
const db_config = db_env[node_env];

if (!db_config) {
    return console.error(`Invalid Node Environment ${process.env.NODE_ENV}`);
}

module.exports = db_config;