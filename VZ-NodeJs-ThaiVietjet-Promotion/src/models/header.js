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
            Header.belongsTo(models.Menu, { foreignKey: 'menuId', as: 'Menu' })
        }
    };
    Header.init({
        imageLogo: DataTypes.STRING,
        imageBackground: DataTypes.STRING,
        menuId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Header',
    });
    return Header;
};