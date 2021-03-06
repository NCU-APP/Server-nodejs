const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class Version extends Model {

  static init(sequelize) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      version: {
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.ENUM,
        values: [ 'Board', 'BusRoute' ]
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