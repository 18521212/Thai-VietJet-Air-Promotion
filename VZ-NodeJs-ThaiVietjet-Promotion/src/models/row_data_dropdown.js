'use strict';
import { addHookRefQueryRedis } from '../utils'
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Row_Dataset_Dropdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Row_Dataset_Dropdown.belongsTo(models.Dropdown, { foreignKey: 'dropdownId', as: 'dataDropdown' })
        }
    };
    Row_Dataset_Dropdown.init({
        value: DataTypes.STRING,
        label: DataTypes.STRING,
        dropdownId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Row_Dataset_Dropdown',
    });
    let _hooks = ['afterCreate', 'afterUpdate', 'afterDestroy']
    let _refs = ['Dropdown']
    addHookRefQueryRedis(Row_Dataset_Dropdown, _hooks, _refs)
    return Row_Dataset_Dropdown;
};