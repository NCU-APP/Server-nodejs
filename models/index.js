const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

let sequelize = new Sequelize({
  database: 'NCU_APP',
  username: 'ncuapp',
  password: 'ncuapp',
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
});

let models = {};

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach(file => {
    let model =  require(path.join(__dirname, file)).init(sequelize);
    models[model.name] = model;
  });

Object.values(models).filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = {...models, sequelize, Sequelize,};