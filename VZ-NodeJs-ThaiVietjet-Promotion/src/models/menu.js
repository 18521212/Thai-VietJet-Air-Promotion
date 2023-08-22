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
            Menu.belongsTo(models.Header, {foreignKey: 'headerId'})

            Menu.hasMany(models.Menu_Item, {foreignKey: 'menuId'})
        }
    };
    Menu.init({
        headerId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Menu',
    });
    return Menu;
};