'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Menu_Item extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Menu_Item.belongsTo(models.Menu, { foreignKey: 'menuId', as: 'Menu_Item' })

            Menu_Item.hasMany(models.Sub_Menu, { foreignKey: 'menuParentId' })

            Menu_Item.belongsTo(models.Text_Translation, { foreignKey: 'text', as: 'textDataMenu_Item' })
        }
    };
    Menu_Item.init({
        order: DataTypes.INTEGER,
        menuId: DataTypes.INTEGER,
        text: DataTypes.INTEGER,
        link: DataTypes.STRING,
        highlight: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Menu_Item',
    });
    return Menu_Item;
};