require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const os = require('os');

// ** Require Database ** //
const { connect_db } = require(path.resolve("db", "db.connect.js"));

// ** Require Routes ** //
const box_router = require(path.resolve("api/v1/routes", "box.router.js"));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'API Health Check',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        host: os.hostname(),
        process: {
            cpu: process.cpuUsage(),
            memory: process.memoryUsage()
        },
        nodeVersion: process.version
    });
});

// ** Routes ** //
app.use('/api/v1/IoT-boxes', box_router);

const port = process.env.PORT || 3000;

try {

    app.listen(port, async () => {
        await connect_db();

        console.log(`> [INFO] Node Environment: ${process.env.NODE_ENV}`);
        console.log(`> [INFO] Server Launching ... `);
        console.log(`> [INFO] IP: http://localhost:${port}`);
   
    });

} catch (e) {
    console.error(`> [ERROR] Failed to launch server cause:`, e.message);
    process.exit(1);
}