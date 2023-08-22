'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Header extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Header.hasOne(models.Menu, {foreignKey: 'headerId'})
    }
  };
  Header.init({
    imageLogo: DataTypes.STRING,
    imageBackground: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Header',
  });
  return Header;
};