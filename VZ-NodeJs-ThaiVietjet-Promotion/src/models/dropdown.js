'use strict';
import { addHookRefQueryRedis } from '../utils';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Dropdown extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Dropdown.belongsTo(models.Input, { foreignKey: 'inputId' })

            Dropdown.hasMany(models.Row_Dataset_Dropdown, { foreignKey: 'dropdownId', as: 'dataDropdown' })

            Dropdown.belongsTo(models.Text_Translation, { foreignKey: 'title', as: 'titleDataDropdown' })
        }
    };
    Dropdown.init({
        title: DataTypes.INTEGER,
        inputId: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Dropdown',
    });
    let _hooks = ['afterUpdate', 'afterDestroy']
    let _refs = ['Form_Detail', 'Input']
    addHookRefQueryRedis(Dropdown, _hooks, _refs)
    return Dropdown;
};