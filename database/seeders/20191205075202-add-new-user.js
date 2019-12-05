const faker = require('faker');

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('users', [{
        name: faker.name.firstName(),
        uuid: '780f05b8-1735-11ea-8d71-362b9e155667'
      }])
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('users')
    ]);
  }
};