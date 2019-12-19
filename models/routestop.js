'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class RouteStops extends Model {

  static init(sequelize) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      routeid: {
        type: Sequelize.INTEGER
      },
      stopid: {
        type: Sequelize.INTEGER
      },
      sequence: {
        type: Sequelize.INTEGER
      },
      boarding: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, { sequelize });
  }

  static associate(models) {

  }
};