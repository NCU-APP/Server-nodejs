const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class Board extends Model {

  static init(sequelize) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
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