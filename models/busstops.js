const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class BusStops extends Model {

  static init(sequelize) {
    return super.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uid: DataTypes.STRING,
      zh_tw_name: DataTypes.STRING,
      en_name: DataTypes.STRING,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE
    }, { sequelize });
  }

  static associate(models) {
    models.BusStops.belongsToMany(models.BusRoute, {
      through: 'RouteStop',
      as: 'busroutes',
      foreignKey: 'stopid',
      otherKey: 'routeid'
    });
  }
};