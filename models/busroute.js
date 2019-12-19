
'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class BusRoute extends Model {

  static init(sequelize) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uid: DataTypes.STRING,
      direction: DataTypes.INTEGER,
      zh_tw_name: DataTypes.STRING,
      en_name: DataTypes.STRING
    }, { sequelize });
  }

  static associate(models) {
    models.BusRoute.belongsToMany(models.BusStops, {
      through: 'RouteStop',
      as: 'busstops',
      foreignKey: 'routeid',
      otherKey: 'stopid'
    });
  }
};