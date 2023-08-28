'use strict';
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
            Form_Detail.belongsTo(models.Form, { foreignKey: 'formId', as: 'Form_Detail' })

            Form_Detail.belongsTo(models.Input, { foreignKey: 'inputId' })
        }
    };
    Form_Detail.init({
        formId: DataTypes.INTEGER,
        inputId: DataTypes.INTEGER,
        order: DataTypes.INTEGER,
        widthXLScreen: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Form_Detail',
    });
    return Form_Detail;
};