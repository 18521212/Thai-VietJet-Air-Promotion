'use strict';
import { addHookRefQueryRedis } from '../utils'
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Form extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Form.hasMany(models.Form_Detail, { foreignKey: 'formId', as: 'form_detail' }) // many input
            Form.hasMany(models.Campaign, { foreignKey: 'formId' })
        }
    };
    Form.init({
        name: DataTypes.STRING,
        css: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Form',
    });
    let _hooks = ['afterDestroy']
    let _refs = ['Form_Detail']
    addHookRefQueryRedis(Form, _hooks, _refs)
    return Form;
};