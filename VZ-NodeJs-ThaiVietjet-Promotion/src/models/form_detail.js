'use strict';
import { addHookRefQueryRedis } from '../utils'
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Form_Detail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Form_Detail.belongsTo(models.Form, { foreignKey: 'formId', as: 'form_detail' })
            Form_Detail.belongsTo(models.Input, { foreignKey: 'inputId', as: 'input' })
        }
    };
    Form_Detail.init({
        formId: DataTypes.INTEGER,
        inputId: DataTypes.INTEGER,
        order: DataTypes.INTEGER,
        widthMdScreen: DataTypes.INTEGER,
        required: DataTypes.BOOLEAN,
        nameApi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Form_Detail',
    });
    let _hooks = ['afterCreate', 'afterUpdate', 'afterDestroy']
    let _refs = ['Form']
    addHookRefQueryRedis(Form_Detail, _hooks, _refs)
    return Form_Detail;
};