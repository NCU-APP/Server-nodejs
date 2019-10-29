let express = require('express');

let app = express();

/**
 * 取得Documentation
 * @api {GET} /docs getDocs
 * @apiDescription 取得APIDoc生成的Documentation
 * @apiName getDocs
 * @apiGroup docs
 * @apiVersion  0.1.0
 * @apiSampleRequest /docs
 * @apiSuccess (200) {html} index index page
 */
app.use('/docs', express.static('./views/apidoc'));
/**/

let server = app.listen(80, () => {
  console.log("Port: 80");
})