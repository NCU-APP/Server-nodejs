const faker = require('faker');

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('Users', [{
        name: faker.name.firstName(),
        uid: '780f05b8-1735-11ea-8d71-362b9e155667',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('Users')
    ]);
  }
};