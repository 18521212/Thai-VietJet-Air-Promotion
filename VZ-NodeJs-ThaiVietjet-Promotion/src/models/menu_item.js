'use strict';
import { addHookRefQueryRedis } from '../utils'
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
            Menu_Item.belongsTo(models.Menu, { foreignKey: 'menuId', as: 'menu_item' })

            Menu_Item.hasMany(models.Sub_Menu, { foreignKey: 'menuParentId', as: 'sub_menu' })
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
    let _hooks = ['afterCreate', 'afterUpdate', 'afterDestroy']
    let _refs = ['Menu', 'Sub_Menu']
    addHookRefQueryRedis(Menu_Item, _hooks, _refs)
    return Menu_Item;
};