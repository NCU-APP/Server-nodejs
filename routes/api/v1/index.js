const express = require('express');
const board = require('./board');
const bus = require('./bus');


let router = express.Router();

router.use('/board', board);
router.use('/traffic/bus', bus);

module.exports = router;