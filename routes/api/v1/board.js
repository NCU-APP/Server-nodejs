let express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
  res.send(['八卦', '資工']);
  res.end();
});

router.post('/', (req, res) => {
  res.send(req.body);
  res.end();
});

module.exports = router;