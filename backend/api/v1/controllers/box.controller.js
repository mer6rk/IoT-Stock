const path = require('path');
const { pool } = require(path.resolve("db", "db.connect.js"));

const get_boxes = (async (req, res) => {

    try {

        const [data] = await pool.query(`SELECT * FROM boxes`);

        if (data.length === 0) {
            return res.status(204).json({
                message: `Cannot find any IoT boxes.`
            });
        }

        return res.status(200).json(data);

    } catch (e) {
        console.error(`> [ERROR] Failed to fetch IoT boxes data cause:`, e.message);
        return res.status(500).json({
            error: `Internal Server Error.`
        });
    }
});

const get_single_box = (async (req, res) => {

    try {

        const box_id = req.params.id;

        if (!Number.isInteger(Number(box_id))) {
            return res.status(400).json({
                error: `Invalid ID.`
            });
        }

        const [data] = await pool.query(`SELECT * FROM boxes WHERE id = ?`, [box_id]);

        if (data.length === 0) {
            return res.status(404).json({
                message: `IoT box with ID ${box_id} not found.`
            });
        }

        return res.status(200).json(data[0]);

    } catch (e) {
        console.error(`> [ERROR] Failed to fetch IoT box data cause:`, e.message);
        return res.status(500).json({
            error: `Internal Server Error.`
        });
    }
});

const create_boxes = (async (req, res) => {

    try {

        const boxes = Array.isArray(req.body) ? req.body : [req.body];

        await pool.query(`START TRANSACTION`);

        for (const box of boxes) {
            const { name, serial_number, location, status } = box;

            if (
                typeof name !== 'string' ||
                typeof serial_number !== 'string' ||
                typeof location !== 'string' ||
                typeof status !== 'string'
            ) {
                await pool.query(`ROLLBACK`);
                return res.status(400).json({
                    error: `Invalid IoT box data. All fields must be strings.`
                });
            }

            const [{ insertId }] = await pool.query(
                `
                    INSERT INTO boxes (name, serial_number, location, status)
                    VALUES (?, ?, ?, ?)
                `,
                [name, serial_number, location, status]
            );

            if (!insertId) {
                await pool.query(`ROLLBACK`);
                console.error(`> [ERROR] Failed to insert IoT box data.`);
                console.error(`> [ERROR] Re-check this:`, box);
                
                return res.status(500).json({
                    error: `Internal Server Error.`
                });
            }
        }

        await pool.query(`COMMIT`);

        const message = boxes.length > 1 ? `Multiple IoT boxes created.` : `IoT box created.`;
        return res.status(boxes.length > 1 ? 202 : 201).json({ message });

    } catch (e) {
        console.error(`> [ERROR] Failed to insert IoT box data cause:`, e.message);
        await pool.query(`ROLLBACK`);
        
        return res.status(500).json({
            error: `Internal Server Error.`
        });
    }
});

const update_box = (async (req, res) => {

    try {

        const box_id = req.params.id;
        const { name, serial_number, location, status} = req.body;

        if (!Number.isInteger(Number(box_id))) {
            return res.status(400).json({
                error: `Invalid ID.`
            });
        }

        if (
            typeof name !== 'string' ||
            typeof serial_number !== 'string' ||
            typeof location !== 'string' ||
            typeof status !== 'string'
        ) {
            return res.status(400).json({
                error: `Invalid IoT box data. All fields must be strings.`
            });
        }

        const [update] = await pool.query(
            `
               UPDATE boxes SET name = ?, serial_number = ?, location = ?, status = ?
               WHERE id = ? 
            `,
            [name, serial_number, location, status, box_id]
        );

        if (update.affectedRows === 0) {
            console.error(`> [ERROR] Failed to update data of IoT box with ID ${box_id} cause not found.`);
            return res.status(404).json({
                error: `IoT box with ID ${box_id} not found.`
            });
        }

        return res.status(200).json({
            message: `IoT box data with ID ${box_id} successfully updated.`
        });

    } catch (e) {
        console.error(`> [ERROR] Failed to update IoT box with ID ${box_id} data cause:`, e.message);        
        return res.status(500).json({
            error: `Internal Server Error.`
        });
    }
});

module.exports = {
    get_boxes,
    get_single_box,
    create_boxes,
    update_box
};