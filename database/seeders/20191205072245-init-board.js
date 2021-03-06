const faker = require('faker');

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('Versions', [{ version: 1, name: 'Board', createdAt: new Date(), updatedAt: new Date() }] ),
      queryInterface.bulkInsert('Boards', new Array(15).fill().map(el => ({ name: faker.commerce.product(), createdAt: new Date(), updatedAt: new Date() }) ))
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Boards'),
      queryInterface.bulkDelete('Versions')
    ]);
  }
};