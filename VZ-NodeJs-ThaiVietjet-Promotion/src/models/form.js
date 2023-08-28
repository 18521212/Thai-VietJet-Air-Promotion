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
            Form.hasOne(models.Form_Section, { foreignKey: 'customer_form_id' })
            Form.hasMany(models.Form_Detail, { foreignKey: 'formId', as: 'Form_Detail' }) // many input
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