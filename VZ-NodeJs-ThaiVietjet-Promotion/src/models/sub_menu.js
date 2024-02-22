'use strict';
import { addHookRefQueryRedis } from '../utils'
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Sub_Menu extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Sub_Menu.belongsTo(models.Menu_Item, { foreignKey: 'menuParentId', as: 'sub_menu' })

            Sub_Menu.belongsTo(models.Text_Translation, { foreignKey: 'text', as: 'textDataSub_Menu' })
        }
    };
    Sub_Menu.init({
        menuParentId: DataTypes.INTEGER,
        order: DataTypes.INTEGER,
        text: DataTypes.INTEGER,
        link: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Sub_Menu',
    });
    let _hooks = ['afterCreate', 'afterUpdate', 'afterDestroy']
    let _refs = ['Menu', 'Menu_Item']
    addHookRefQueryRedis(Sub_Menu, _hooks, _refs)
    return Sub_Menu;
};