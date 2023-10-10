'use strict';
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
        }
    };
    Form.init({
        name: DataTypes.STRING,
        css: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Form',
    });
    return Form;
};