const { Sequelize, Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = class User extends Model {
  static async addUser(user) {
    let { name, email, password } = user;
    let salt = await bcrypt.genSalt();

    password = await bcrypt.hash(user.password, salt);

    let [, exist] = await User.findOrCreate({
      where: { email },
      defaults: {name, email, password}
    });

    return exist;
  }

  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      uid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV1
      },
      name: DataTypes.STRING,
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