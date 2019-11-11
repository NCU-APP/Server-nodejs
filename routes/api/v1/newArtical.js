let express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
  title = req.query.title
  content = req.query.content
  res.send()
  res.end()
});
  
module.exports = router;