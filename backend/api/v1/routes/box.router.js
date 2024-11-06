const path = require('path');
const router = require('express').Router();

const {
    get_boxes
} = require(path.resolve("api/v1/controllers", "box.controller.js"));

router.get('/', get_boxes);

module.exports = router;