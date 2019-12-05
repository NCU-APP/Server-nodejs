const faker = require('faker');

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('versions', [{ version: 1, table_name: 'boards' }] ),
      queryInterface.bulkInsert('boards', new Array(15).fill().map(el => ({ name: faker.commerce.product() }) ))
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('boards'),
      queryInterface.bulkDelete('versions')
    ]);
  }
};