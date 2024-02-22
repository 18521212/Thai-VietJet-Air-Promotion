'use strict';
import { addHookRefQueryRedis } from '../utils'
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Input extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Input.hasMany(models.Form_Detail, { foreignKey: 'inputId' })

            Input.hasOne(models.Text_Input, { foreignKey: 'inputId', as: 'text_input' })
            Input.hasOne(models.Dropdown, { foreignKey: 'inputId', as: 'dropdown' })
        }
    };
    Input.init({
        typeInput: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Input',
    });
    let _hooks = ['afterCreate', 'afterUpdate', 'afterDestroy']
    let _refs = ['Form_Detail', 'Text_Input', 'Dropdown']
    addHookRefQueryRedis(Input, _hooks, _refs)
    return Input;
};