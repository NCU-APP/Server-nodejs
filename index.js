require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes');
const Bus = require('./models/bus');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

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

const StartServer = async () => {
  await app.listen(process.env.PORT);
  await new Bus().Start();
  console.log(`http://localhost:${process.env.PORT}/`);
};

StartServer();