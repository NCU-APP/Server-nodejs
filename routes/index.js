let express = require('express');
let v1 = require('./api/v1');

let router = express.Router();

router.use('/api/v1', v1);

module.exports = router;