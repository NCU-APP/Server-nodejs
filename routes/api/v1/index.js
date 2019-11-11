let express = require('express');
let board = require('./board');
let oauth2 = require('./oauth2');
let user = require('./user');

let router = express.Router();

router.use('/', user);
router.use('/board', board);
router.use('/oauth2', oauth2);

module.exports = router;