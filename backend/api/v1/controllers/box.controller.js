const path = require('path');
const { pool } = require(path.resolve("db", "db.connect.js"));

const get_boxes = (async (req, res) => {

    try {

        const [data] = await pool.query("SELECT * FROM boxes");

        if (data.length === 0) {
            return res.status(204).json({
                message: 'Cannot find any IoT boxes.'
            });
        }

        return res.status(200).json(data);

    } catch (e) {
        console.error(`> [ERROR] Failed to fetch IoT boxes data cause:`, e.message);
        return res.status(500).json({
            error: 'Internal Server Error.'
        });
    }
});

module.exports = {
    get_boxes
};