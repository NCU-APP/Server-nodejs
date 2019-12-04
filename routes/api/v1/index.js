let express = require('express');
let board = require('./board');

let router = express.Router();

router.use('/board', board);

module.exports = router;