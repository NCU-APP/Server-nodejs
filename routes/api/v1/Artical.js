let express = require('express');
let router = express.Router();

express.post('/new', (req, res) => {
  var id;
  if(req.body.text != null){
    res.statuscode = 400;
    return res.json({ error: 'Invalid message' });
  }
  res.send(['id', id]);
  res.end();
});

express.length('/:id', (req, res) => {
  res.send();
});

module.exports = router;