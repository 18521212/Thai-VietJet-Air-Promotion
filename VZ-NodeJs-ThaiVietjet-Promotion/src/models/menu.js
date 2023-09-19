'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Menu extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Menu.hasMany(models.Header, { foreignKey: 'menuId', as: 'Menu' })

            Menu.hasMany(models.Menu_Item, { foreignKey: 'menuId', as: 'Menu_Item'})
        }
    };
    Menu.init({
        name: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Menu',
    });
    return Menu;
};