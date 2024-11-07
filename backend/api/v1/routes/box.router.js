const path = require('path');
const router = require('express').Router();

const {
    get_boxes,
    get_single_box,
    create_boxes,
    update_box
} = require(path.resolve("api/v1/controllers", "box.controller.js"));

router.get('/', get_boxes);
router.get('/:id', get_single_box);

router.post('/', create_boxes);

router.patch('/:id', update_box);

module.exports = router;