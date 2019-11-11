// @ts-check
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = require('./routes');
const { User, sequelize, Sequelize } = require('./models');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    const { and } = Sequelize.Op;

    let user = await User.findOne({ where: { email } });

    return done(null);
  } catch(e) {
    return done(e);
  }
}));


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
  console.log(`http://localhost:${process.env.PORT}/`);

  User.addUser({ name: 'ncuapp', email: 'ncuapp', account: 'ncuapp', password: 'ncuapp' });
};

(async () => {
  await sequelize.sync({ force: true });

  StartServer();
})();
